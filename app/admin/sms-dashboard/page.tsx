'use client';

import { useState, useMemo } from 'react';
import { RefreshCw, Search } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
type SmsStatut = 'Succès' | 'Échec' | 'En attente';
type SmsEntry = {
    id: number;
    dateEnvoi: string;
    destinataire: string;
    message: string;
    statut: SmsStatut;
    typeMessage: string;
};

// ── Placeholder data (will come from DB later) ────────────────────────────────
const SAMPLE_HISTORY: SmsEntry[] = [];

const FILTER_OPTIONS = ['Tous', 'Succès', 'Échec', 'En attente'];

// ── KPI card component ────────────────────────────────────────────────────────
function KpiCard({
    emoji, value, label, color,
}: { emoji: string; value: string | number; label: string; color: string }) {
    return (
        <div className="bg-[#1e1e38] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">{emoji}</span>
            <span className="text-4xl font-bold" style={{ color }}>{value}</span>
            <span className="text-xs mt-2" style={{ color }}>{label}</span>
        </div>
    );
}

// ── Status badge component ────────────────────────────────────────────────────
function StatusBadge({ statut }: { statut: SmsStatut }) {
    const styles: Record<SmsStatut, { bg: string; text: string }> = {
        'Succès': { bg: 'rgba(5,150,105,0.2)', text: '#10b981' },
        'Échec': { bg: 'rgba(220,38,38,0.2)', text: '#ef4444' },
        'En attente': { bg: 'rgba(234,179,8,0.2)', text: '#f59e0b' },
    };
    const s = styles[statut];
    return (
        <span
            className="px-3 py-1 rounded text-xs font-semibold"
            style={{ background: s.bg, color: s.text }}
        >
            {statut}
        </span>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SmsDashboardPage() {
    const [selectedFilter, setSelectedFilter] = useState('Tous');
    const [searchText, setSearchText] = useState('');
    const [history] = useState<SmsEntry[]>(SAMPLE_HISTORY);

    // Computed KPIs
    const totalSent = history.length;
    const successCount = history.filter(s => s.statut === 'Succès').length;
    const failureCount = history.filter(s => s.statut === 'Échec').length;
    const remainingQuota = 500; // placeholder
    const successRate = totalSent > 0 ? ((successCount / totalSent) * 100).toFixed(1) : '0.0';

    // Filtered rows
    const filtered = useMemo(() => {
        return history.filter(sms => {
            const matchFilter = selectedFilter === 'Tous' || sms.statut === selectedFilter;
            const q = searchText.toLowerCase();
            const matchSearch = !q || sms.destinataire.toLowerCase().includes(q) || sms.message.toLowerCase().includes(q);
            return matchFilter && matchSearch;
        });
    }, [history, selectedFilter, searchText]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* ── HEADER ─────────────────────────────── */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">📊 Tableau de Bord SMS</h1>
                    <p className="text-gray-500 text-sm mt-1">Vue d'ensemble des communications SMS</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-80 shrink-0"
                    style={{ background: '#FFA500' }}
                >
                    <RefreshCw size={15} />
                    Actualiser
                </button>
            </div>

            {/* ── KPI CARDS ──────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <KpiCard emoji="📤" value={totalSent} label="Total Envoyés" color="#ffffff" />
                <KpiCard emoji="✅" value={successCount} label="Succès" color="#10b981" />
                <KpiCard emoji="❌" value={failureCount} label="Échecs" color="#ef4444" />
                <KpiCard emoji="💳" value={remainingQuota} label="Quota Restant" color="#3b82f6" />
                <KpiCard emoji="📊" value={`${successRate}%`} label="Taux de Réussite" color="#FFA500" />
            </div>

            {/* ── HISTORY TABLE ───────────────────────── */}
            <div className="bg-[#1e1e38] border border-white/5 rounded-2xl p-6">
                <h2 className="text-[#FFA500] font-bold text-base mb-4">📋 Historique des Messages</h2>

                {/* Filters row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5 items-start sm:items-center">
                    {/* Status filter */}
                    <div className="flex items-center gap-2 shrink-0">
                        <label className="text-white text-sm font-semibold">Statut :</label>
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="bg-[#141428] text-white text-sm border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FFA500]"
                        >
                            {FILTER_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="🔍 Rechercher par numéro ou message..."
                            className="w-full bg-[#141428] text-white text-sm border border-white/10 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-[#FFA500] placeholder-gray-600"
                        />
                    </div>

                    {/* Count */}
                    <span className="text-gray-500 text-sm shrink-0">{filtered.length} message(s)</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#141428] text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3 text-left font-semibold">Date</th>
                                <th className="px-4 py-3 text-left font-semibold">Destinataire</th>
                                <th className="px-4 py-3 text-left font-semibold">Message</th>
                                <th className="px-4 py-3 text-left font-semibold">Statut</th>
                                <th className="px-4 py-3 text-left font-semibold">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-16 text-center text-gray-600">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📭</span>
                                            <span>Aucun message SMS trouvé.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((sms) => (
                                    <tr key={sms.id} className="border-t border-white/5 hover:bg-white/3 transition-colors">
                                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{sms.dateEnvoi}</td>
                                        <td className="px-4 py-3 text-white font-medium">{sms.destinataire}</td>
                                        <td className="px-4 py-3 text-gray-400 max-w-xs truncate">{sms.message}</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge statut={sms.statut} />
                                        </td>
                                        <td className="px-4 py-3 text-gray-400">{sms.typeMessage}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
