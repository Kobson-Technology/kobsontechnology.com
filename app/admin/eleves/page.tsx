'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Plus, Search, Edit2, Trash2, X, ChevronLeft, ChevronRight,
    User, Phone, BookOpen, Loader2, CheckCircle, CloudOff, Cloud, AlertCircle, RefreshCw
} from 'lucide-react';

import { db, type EleveLocal, type SyncStatus } from '../../../lib/db';
import {
    getElevesFromNeon, syncCreateEleve, syncUpdateEleve, syncDeleteEleve,
    EleveSchema, type EleveInput,
} from './actions';

// ── WPF exact colors ──────────────────────────────────────────────────────────
const C = {
    dark: '#1E1E1E', navy: '#2D2D2D', section: '#3D3D3D',
    orange: '#FFA500', green: '#059669', red: '#DC2626', blue: '#2563EB',
    textSec: '#D3D3D3',
};

const NIVEAUX = ['Toute Petite Section', 'Petite Section', 'Moyenne Section', 'Grande Section', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];
const STATUTS = ['Actif', 'Inactif', 'Transféré', 'Exclu'];
const REGIMES = ['Externe', 'Interne', 'Demi-pensionnaire'];
const QUALITES = ['Nouveau', 'Ancien', 'Redoublant'];
const PAGE_SIZE = 20;

// ── Sync Status Indicator ─────────────────────────────────────────────────────
function SyncBadge({ status, error }: { status: SyncStatus; error?: string }) {
    if (status === 'synced') return <Cloud size={14} title="Synchronisé" style={{ color: C.green }} />;
    if (status === 'error') return <AlertCircle size={14} title={error ?? 'Erreur de sync'} style={{ color: C.red }} />;
    return <CloudOff size={14} title="En attente de synchronisation" style={{ color: C.orange }} className="animate-pulse" />;
}

// ── Risk Badge ────────────────────────────────────────────────────────────────
function RiskBadge({ level }: { level?: string }) {
    const lvl = level ?? 'Faible';
    const map: Record<string, { bg: string; color: string }> = {
        'Faible': { bg: `${C.green}30`, color: C.green },
        'Moyen': { bg: '#F59E0B30', color: '#F59E0B' },
        'Élevé': { bg: `${C.red}30`, color: C.red },
    };
    const s = map[lvl] ?? { bg: '#ffffff15', color: C.textSec };
    return <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: s.bg, color: s.color }}>{lvl}</span>;
}

// ── Form Field ────────────────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: C.textSec }}>{label}</label>
            {children}
            {error && <span className="text-xs" style={{ color: C.red }}>{error}</span>}
        </div>
    );
}

const inputCls = `w-full rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500`;
const inputStyle = { background: C.section, border: `1px solid #ffffff18` };
const selectStyle = { background: C.section, border: `1px solid #ffffff18` };

// ── Modal Form ────────────────────────────────────────────────────────────────
function EleveModal({ eleve, onClose }: { eleve: EleveLocal | null; onClose: () => void }) {
    const qc = useQueryClient();
    const isEdit = !!eleve;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EleveInput>({
        resolver: zodResolver(EleveSchema),
        defaultValues: eleve ? {
            nom: eleve.nom, prenom: eleve.prenom, sexe: eleve.sexe as 'M' | 'F',
            date_naissance: eleve.date_naissance ?? undefined,
            lieu_naissance: eleve.lieu_naissance ?? undefined,
            nationalite: eleve.nationalite ?? undefined,
            adresse: eleve.adresse ?? undefined,
            email_adresse: eleve.email_adresse ?? undefined,
            niveau: eleve.niveau ?? undefined,
            statut: eleve.statut,
            regime: eleve.regime ?? undefined,
            qualite: eleve.qualite ?? undefined,
            annee_scolaire: eleve.annee_scolaire ?? undefined,
            telephone_sms: eleve.telephone_sms ?? undefined,
            matricule: eleve.matricule ?? undefined,
            nom_pere: eleve.nom_pere ?? undefined, prenom_pere: eleve.prenom_pere ?? undefined,
            telephone_pere: eleve.telephone_pere ?? undefined, adresse_pere: eleve.adresse_pere ?? undefined,
            nom_mere: eleve.nom_mere ?? undefined, prenom_mere: eleve.prenom_mere ?? undefined,
            telephone_mere: eleve.telephone_mere ?? undefined, adresse_mere: eleve.adresse_mere ?? undefined,
        } : { sexe: 'M', statut: 'Actif', qualite: 'Nouveau' },
    });

    const onSubmit = async (data: EleveInput) => {
        if (isEdit) {
            // ── 1. Sauvegarde locale immédiate (Dexie) ──────────────────────
            await db.eleves.update(eleve.localId!, {
                ...data, syncStatus: 'pending', updatedAt: new Date().toISOString(),
            });
            qc.invalidateQueries({ queryKey: ['eleves-local'] });
            onClose();

            // ── 2. Sync background vers Neon ────────────────────────────────
            if (eleve.serverId) {
                const res = await syncUpdateEleve(eleve.serverId, data);
                await db.eleves.update(eleve.localId!, {
                    syncStatus: res.success ? 'synced' : 'error',
                    syncError: res.success ? undefined : res.error,
                });
            } else {
                // Pas encore sur Neon → créer
                const res = await syncCreateEleve(data);
                await db.eleves.update(eleve.localId!, {
                    serverId: res.success ? res.data.id : undefined,
                    syncStatus: res.success ? 'synced' : 'error',
                    syncError: res.success ? undefined : res.error,
                });
            }
        } else {
            // ── 1. Sauvegarde locale immédiate ──────────────────────────────
            const localId = await db.eleves.add({
                ...data, syncStatus: 'pending',
                updatedAt: new Date().toISOString(),
                ai_risk_level: 'Faible', ai_risk_score: 0,
            });
            qc.invalidateQueries({ queryKey: ['eleves-local'] });
            onClose();

            // ── 2. Sync background vers Neon ────────────────────────────────
            const res = await syncCreateEleve(data);
            await db.eleves.update(localId, {
                serverId: res.success ? res.data.id : undefined,
                syncStatus: res.success ? 'synced' : 'error',
                syncError: res.success ? undefined : res.error,
            });
        }
        qc.invalidateQueries({ queryKey: ['eleves-local'] });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" style={{ background: C.navy }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#ffffff15' }}>
                    <h2 className="text-lg font-bold text-white">
                        {isEdit ? `✏️ Modifier — ${eleve.nom} ${eleve.prenom}` : '➕ Nouvel Élève'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Identité */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: C.orange }}>
                            <User size={13} /> Identité
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Nom *" error={errors.nom?.message}>
                                <input {...register('nom')} placeholder="NOM" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Prénom *" error={errors.prenom?.message}>
                                <input {...register('prenom')} placeholder="Prénom" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Date de naissance">
                                <input type="date" {...register('date_naissance')} className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Lieu de naissance">
                                <input {...register('lieu_naissance')} placeholder="Ville" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Sexe *" error={errors.sexe?.message}>
                                <select {...register('sexe')} className={inputCls} style={selectStyle}>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                            </Field>
                            <Field label="Nationalité">
                                <input {...register('nationalite')} placeholder="Ex: Camerounaise" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Adresse">
                                <input {...register('adresse')} placeholder="Adresse complète" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Email" error={errors.email_adresse?.message}>
                                <input type="email" {...register('email_adresse')} placeholder="email@exemple.com" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Téléphone SMS">
                                <input {...register('telephone_sms')} placeholder="+237 6xx xxx xxx" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Matricule">
                                <input {...register('matricule')} placeholder="Facultatif" className={inputCls} style={inputStyle} />
                            </Field>
                        </div>
                    </section>

                    {/* Scolarité */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: C.blue }}>
                            <BookOpen size={13} /> Scolarité
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Niveau">
                                <select {...register('niveau')} className={inputCls} style={selectStyle}>
                                    <option value="">— Choisir —</option>
                                    {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </Field>
                            <Field label="Statut">
                                <select {...register('statut')} className={inputCls} style={selectStyle}>
                                    {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </Field>
                            <Field label="Régime">
                                <select {...register('regime')} className={inputCls} style={selectStyle}>
                                    <option value="">— Choisir —</option>
                                    {REGIMES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </Field>
                            <Field label="Qualité">
                                <select {...register('qualite')} className={inputCls} style={selectStyle}>
                                    <option value="">— Choisir —</option>
                                    {QUALITES.map(q => <option key={q} value={q}>{q}</option>)}
                                </select>
                            </Field>
                            <Field label="Année scolaire">
                                <input {...register('annee_scolaire')} placeholder="Ex: 2024-2025" className={inputCls} style={inputStyle} />
                            </Field>
                            <Field label="Moyen de paiement">
                                <input {...register('moyen_paiement')} placeholder="Espèces / Mobile Money" className={inputCls} style={inputStyle} />
                            </Field>
                        </div>
                    </section>

                    {/* Parents */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: C.green }}>
                            <Phone size={13} /> Parents & Contact
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Nom du père"><input {...register('nom_pere')} placeholder="NOM" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Prénom du père"><input {...register('prenom_pere')} placeholder="Prénom" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Tél. père"><input {...register('telephone_pere')} placeholder="+237 6xx xxx xxx" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Adresse père"><input {...register('adresse_pere')} placeholder="Adresse" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Nom de la mère"><input {...register('nom_mere')} placeholder="NOM" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Prénom de la mère"><input {...register('prenom_mere')} placeholder="Prénom" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Tél. mère"><input {...register('telephone_mere')} placeholder="+237 6xx xxx xxx" className={inputCls} style={inputStyle} /></Field>
                            <Field label="Adresse mère"><input {...register('adresse_mere')} placeholder="Adresse" className={inputCls} style={inputStyle} /></Field>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-2 border-t" style={{ borderColor: '#ffffff15' }}>
                        <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-all" style={{ background: C.section, color: C.textSec }}>
                            Annuler
                        </button>
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition-all" style={{ background: C.orange }}>
                            {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle size={15} />}
                            {isEdit ? 'Enregistrer' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Background Sync Hook ──────────────────────────────────────────────────────
function useSyncPending() {
    const qc = useQueryClient();

    const syncPending = useCallback(async () => {
        const pending = await db.eleves.where('syncStatus').equals('pending').toArray();
        for (const eleve of pending) {
            if (!eleve.localId) continue;
            try {
                if (eleve.isDeleted && eleve.serverId) {
                    const res = await syncDeleteEleve(eleve.serverId);
                    if (res.success) {
                        await db.eleves.delete(eleve.localId);
                    } else {
                        await db.eleves.update(eleve.localId, { syncStatus: 'error', syncError: res.error });
                    }
                } else if (eleve.serverId) {
                    const res = await syncUpdateEleve(eleve.serverId, eleve as EleveInput);
                    await db.eleves.update(eleve.localId, {
                        syncStatus: res.success ? 'synced' : 'error',
                        syncError: res.success ? undefined : res.error,
                    });
                } else {
                    const res = await syncCreateEleve(eleve as EleveInput);
                    await db.eleves.update(eleve.localId, {
                        serverId: res.success ? res.data.id : undefined,
                        syncStatus: res.success ? 'synced' : 'error',
                        syncError: res.success ? undefined : res.error,
                    });
                }
            } catch {
                await db.eleves.update(eleve.localId, { syncStatus: 'error', syncError: 'Erreur réseau' });
            }
        }
        if (pending.length > 0) qc.invalidateQueries({ queryKey: ['eleves-local'] });
    }, [qc]);

    // Auto-retry on mount
    useEffect(() => { syncPending(); }, [syncPending]);

    return { syncPending };
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ElevesPage() {
    const qc = useQueryClient();
    const [modal, setModal] = useState<'add' | 'edit' | null>(null);
    const [selected, setSelected] = useState<EleveLocal | null>(null);
    const [search, setSearch] = useState('');
    const [searchInput, setSI] = useState('');
    const [page, setPage] = useState(1);
    const { syncPending } = useSyncPending();

    // ── Local Dexie query (primary source of truth) ───────────────────────────
    const { data: localData, isLoading } = useQuery({
        queryKey: ['eleves-local', page, search],
        queryFn: async () => {
            let query = db.eleves.where('isDeleted').notEqual(true);
            const all = await db.eleves.filter(e => !e.isDeleted).toArray();
            const filtered = search
                ? all.filter(e =>
                    e.nom.toLowerCase().includes(search.toLowerCase()) ||
                    e.prenom.toLowerCase().includes(search.toLowerCase()) ||
                    (e.matricule ?? '').toLowerCase().includes(search.toLowerCase())
                )
                : all;
            filtered.sort((a, b) => a.nom.localeCompare(b.nom));
            const total = filtered.length;
            const eleves = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
            return { eleves, total };
        },
        staleTime: 0,
    });

    // ── Bootstrap: if Dexie is empty, pull from Neon ─────────────────────────
    useEffect(() => {
        (async () => {
            const count = await db.eleves.count();
            if (count === 0) {
                try {
                    const { eleves } = await getElevesFromNeon({ page: 1, pageSize: 500 });
                    for (const e of eleves) {
                        await db.eleves.add({
                            ...e, localId: undefined,
                            serverId: e.id,
                            syncStatus: 'synced',
                            updatedAt: e.updated_at,
                        } as unknown as EleveLocal);
                    }
                    qc.invalidateQueries({ queryKey: ['eleves-local'] });
                } catch {
                    // Offline: start fresh, will sync when back online
                }
            }
        })();
    }, [qc]);

    const eleves = localData?.eleves ?? [];
    const total = localData?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const pendingCount = eleves.filter(e => e.syncStatus === 'pending').length;

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDelete = async (e: EleveLocal) => {
        if (!confirm(`Supprimer ${e.nom} ${e.prenom} ?`)) return;
        // 1. Marquer comme supprimé localement
        await db.eleves.update(e.localId!, { isDeleted: true, syncStatus: 'pending', updatedAt: new Date().toISOString() });
        qc.invalidateQueries({ queryKey: ['eleves-local'] });
        // 2. Supprimer sur Neon en background
        if (e.serverId) {
            const res = await syncDeleteEleve(e.serverId);
            if (res.success) await db.eleves.delete(e.localId!);
            else await db.eleves.update(e.localId!, { syncStatus: 'error', syncError: res.error });
        } else {
            await db.eleves.delete(e.localId!);
        }
        qc.invalidateQueries({ queryKey: ['eleves-local'] });
    };

    const handleSearch = () => { setSearch(searchInput); setPage(1); };

    return (
        <div className="max-w-7xl mx-auto space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">👨‍🎓 Élèves</h1>
                    <p className="text-sm mt-0.5" style={{ color: C.textSec }}>
                        {isLoading ? 'Chargement...' : `${total} élève(s)`}
                        {pendingCount > 0 && (
                            <span className="ml-3 text-xs animate-pulse" style={{ color: C.orange }}>
                                ☁ {pendingCount} en attente de sync
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={syncPending} title="Forcer la synchronisation" className="p-2 rounded-lg text-sm transition-all hover:opacity-80" style={{ background: C.section, color: C.textSec }}>
                        <RefreshCw size={15} />
                    </button>
                    <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold transition-all hover:opacity-80" style={{ background: C.orange }}>
                        <Plus size={16} /> Ajouter un élève
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textSec }} />
                    <input
                        type="text" value={searchInput}
                        onChange={e => setSI(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        placeholder="Rechercher par nom, prénom ou matricule..."
                        className="w-full rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        style={{ background: C.navy, border: `1px solid #ffffff18` }}
                    />
                </div>
                <button onClick={handleSearch} className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-80 transition-all" style={{ background: C.blue }}>
                    Chercher
                </button>
                {search && (
                    <button onClick={() => { setSearch(''); setSI(''); setPage(1); }} className="p-2 rounded-lg hover:opacity-80 transition-all" style={{ background: C.section, color: C.textSec }}>
                        <X size={15} />
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: C.navy }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs uppercase tracking-wider" style={{ background: C.section, color: C.textSec }}>
                                <th className="px-3 py-3 text-center w-8" title="Sync">☁</th>
                                <th className="px-4 py-3 text-left">Matricule</th>
                                <th className="px-4 py-3 text-left">Nom & Prénom</th>
                                <th className="px-4 py-3 text-left">Niveau</th>
                                <th className="px-4 py-3 text-left">Statut</th>
                                <th className="px-4 py-3 text-left">Tél. SMS</th>
                                <th className="px-4 py-3 text-left">Risque IA</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={8} className="py-20 text-center"><Loader2 size={28} className="animate-spin mx-auto" style={{ color: C.orange }} /></td></tr>
                            ) : eleves.length === 0 ? (
                                <tr><td colSpan={8} className="py-20 text-center" style={{ color: C.textSec }}>
                                    <div className="flex flex-col items-center gap-2"><span className="text-4xl">🎓</span><span>Aucun élève trouvé.</span></div>
                                </td></tr>
                            ) : eleves.map((e) => (
                                <tr key={e.localId} className="transition-colors border-t hover:bg-white/[0.03]" style={{ borderColor: '#ffffff0f' }}>
                                    <td className="px-3 py-3 text-center">
                                        <SyncBadge status={e.syncStatus} error={e.syncError} />
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs" style={{ color: C.textSec }}>
                                        {e.matricule || <span className="opacity-30">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-semibold text-white">{e.nom}</span>
                                        <span className="ml-1.5" style={{ color: C.textSec }}>{e.prenom}</span>
                                    </td>
                                    <td className="px-4 py-3 text-white">{e.niveau || '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{
                                            background: e.statut === 'Actif' ? `${C.green}30` : `${C.red}20`,
                                            color: e.statut === 'Actif' ? C.green : C.red,
                                        }}>{e.statut}</span>
                                    </td>
                                    <td className="px-4 py-3" style={{ color: C.textSec }}>{e.telephone_sms || '—'}</td>
                                    <td className="px-4 py-3"><RiskBadge level={e.ai_risk_level} /></td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => { setSelected(e); setModal('edit'); }}
                                                className="p-1.5 rounded-lg transition-all hover:opacity-80"
                                                style={{ background: `${C.blue}30`, color: C.blue }}>
                                                <Edit2 size={13} />
                                            </button>
                                            <button onClick={() => handleDelete(e)}
                                                className="p-1.5 rounded-lg transition-all hover:opacity-80"
                                                style={{ background: `${C.red}30`, color: C.red }}>
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#ffffff0f' }}>
                        <span className="text-xs" style={{ color: C.textSec }}>Page {page} / {totalPages} — {total} élève(s)</span>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                                className="p-2 rounded-lg disabled:opacity-30 hover:opacity-80" style={{ background: C.section, color: C.textSec }}>
                                <ChevronLeft size={15} />
                            </button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                                className="p-2 rounded-lg disabled:opacity-30 hover:opacity-80" style={{ background: C.section, color: C.textSec }}>
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {(modal === 'add' || modal === 'edit') && (
                <EleveModal eleve={modal === 'edit' ? selected : null} onClose={() => { setModal(null); setSelected(null); }} />
            )}
        </div>
    );
}
