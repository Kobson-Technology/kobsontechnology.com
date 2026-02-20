'use client';

import Link from 'next/link';
import { Bot, BarChart2, Settings } from 'lucide-react';

// --- Static placeholder data (will be replaced by real DB queries later) ---
const stats = {
    totalStudents: 0,
    totalInscriptions: 0,
    totalRecettes: 0,
    recetteJour: 0,
    recetteSemaine: 0,
    recetteSemainePassee: 0,
    recetteMois: 0,
    recetteMoisPasse: 0,
    insPart: 33.3,
    scoPart: 50.0,
    annPart: 16.7,
};

function fmt(n: number) {
    return n.toLocaleString('fr-FR') + ' FCFA';
}

export default function AdminDashboard() {
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
    const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="max-w-6xl mx-auto space-y-6">

            {/* ── HEADER ────────────────────────────── */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{greeting} 👋</h1>
                <p className="text-[#FFA500] opacity-80 text-base mt-1 capitalize">{dateStr}</p>
            </div>

            {/* ── KPI CARDS ─────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/admin/eleves">
                    <div className="bg-[#1e1e38] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-[#FFA500]/40 transition-all hover:-translate-y-0.5 group">
                        <p className="text-gray-400 text-sm mb-1">Élèves</p>
                        <p className="text-3xl font-bold text-white group-hover:text-[#FFA500] transition-colors">
                            {stats.totalStudents.toLocaleString('fr-FR')}
                        </p>
                    </div>
                </Link>

                <Link href="/admin/inscriptions">
                    <div className="bg-[#1e1e38] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-[#FFA500]/40 transition-all hover:-translate-y-0.5 group">
                        <p className="text-gray-400 text-sm mb-1">Inscrits</p>
                        <p className="text-3xl font-bold text-white group-hover:text-[#FFA500] transition-colors">
                            {stats.totalInscriptions.toLocaleString('fr-FR')}
                        </p>
                    </div>
                </Link>

                <Link href="/admin/versements">
                    <div className="bg-[#1e1e38] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-[#FFA500]/40 transition-all hover:-translate-y-0.5 group">
                        <p className="text-gray-400 text-sm mb-1">Recette Globale</p>
                        <p className="text-2xl font-bold text-white group-hover:text-[#FFA500] transition-colors">
                            {fmt(stats.totalRecettes)}
                        </p>
                    </div>
                </Link>
            </div>

            {/* ── AI INSIGHTS ───────────────────────── */}
            <div className="bg-[#1a1a30] border border-violet-500/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xl">✨</span>
                    <div>
                        <p className="text-white font-bold text-sm">Insights IA</p>
                        <p className="text-[#FFA500] text-xs opacity-80">En ligne</p>
                    </div>
                </div>

                <div className="flex-1 md:text-center">
                    <p className="text-white text-sm font-medium">Aucune donnée suffisante pour l'analyse — commencez à enregistrer vos élèves et paiements.</p>
                    <p className="text-red-400 text-xs mt-1">Aucune alerte de risque détectée pour le moment.</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <Link href="/admin/assistant-ia">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold transition-all hover:opacity-90" style={{ background: '#5b4fcf' }}>
                            <Bot size={14} /> Ouvrir Assistant
                        </button>
                    </Link>
                    <Link href="/admin/etats-financiers">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold bg-blue-600 hover:bg-blue-700 transition-all">
                            <BarChart2 size={14} /> Analytique
                        </button>
                    </Link>
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                        <Settings size={14} />
                    </button>
                </div>
            </div>

            {/* ── BOTTOM: ANALYSES + RÉPARTITION ───── */}
            <div className="grid md:grid-cols-5 gap-4">

                {/* Analyses Périodiques (40%) */}
                <div className="md:col-span-2 bg-[#1e1e38] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-[#FFA500] font-bold text-base mb-4">Analyses Périodiques</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Aujourd'hui", value: stats.recetteJour },
                            { label: 'Semaine actuelle', value: stats.recetteSemaine },
                            { label: 'Semaine dernière', value: stats.recetteSemainePassee },
                            { label: 'Mois en cours', value: stats.recetteMois },
                            { label: 'Mois passé', value: stats.recetteMoisPasse },
                        ].map((row) => (
                            <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span className="text-gray-400 text-sm">{row.label}</span>
                                <span className="text-white font-bold text-sm">{fmt(row.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Répartition des Recettes (60%) */}
                <div className="md:col-span-3 bg-[#1e1e38] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-[#FFA500] font-bold text-base mb-6">Répartition des Recettes</h3>

                    {/* Stacked progress bar */}
                    <div className="h-10 rounded-full overflow-hidden bg-[#141428] flex my-6">
                        <div className="h-full transition-all" style={{ width: `${stats.insPart}%`, background: '#FFA500' }} title="Inscriptions" />
                        <div className="h-full transition-all" style={{ width: `${stats.scoPart}%`, background: '#3b82f6' }} title="Scolarités" />
                        <div className="h-full transition-all" style={{ width: `${stats.annPart}%`, background: '#22c55e' }} title="Annexes" />
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {[
                            { label: 'Inscriptions', value: stats.insPart, color: '#FFA500' },
                            { label: 'Scolarités', value: stats.scoPart, color: '#3b82f6' },
                            { label: 'Frais Annexes', value: stats.annPart, color: '#22c55e' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                                <div>
                                    <p className="text-gray-400 text-xs">{item.label}</p>
                                    <p className="text-white font-bold text-base">{item.value.toFixed(1)}%</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-600 text-xs italic mt-6 text-right">
                        * Basé sur les transactions de l'année scolaire en cours.
                    </p>
                </div>
            </div>
        </div>
    );
}
