'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Plus, Search, Edit2, Trash2, X, ChevronLeft, ChevronRight,
    User, Phone, BookOpen, Loader2, CheckCircle, CloudOff, Cloud,
    AlertCircle, RefreshCw
} from 'lucide-react';

import { type EleveLocal, type SyncStatus, getDb } from '../../../lib/db';
import {
    getElevesFromNeon, syncCreateEleve, syncUpdateEleve, syncDeleteEleve,
    EleveSchema, type EleveInput,
    STATUTS, REGIMES, QUALITES, NIVEAUX,
} from './actions';

const C = {
    dark: '#1E1E1E', navy: '#2D2D2D', section: '#3D3D3D',
    orange: '#FFA500', green: '#059669', red: '#DC2626', blue: '#2563EB',
    textSec: '#D3D3D3',
};

const PAGE_SIZE = 20;

function SyncIcon({ status, error }: { status: SyncStatus; error?: string }) {
    if (status === 'synced') return <Cloud size={14} title="Synchronisé" style={{ color: C.green }} />;
    if (status === 'error') return <AlertCircle size={14} title={error ?? 'Erreur'} style={{ color: C.red }} />;
    return <CloudOff size={14} title="En attente" style={{ color: C.orange }} className="animate-pulse" />;
}

function RiskBadge({ level }: { level?: string }) {
    const l = level ?? 'Faible';
    const s = l === 'Élevé' ? { bg: `${C.red}30`, color: C.red } : l === 'Moyen' ? { bg: '#F59E0B30', color: '#F59E0B' } : { bg: `${C.green}30`, color: C.green };
    return <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: s.bg, color: s.color }}>{l}</span>;
}

function StatutBadge({ statut }: { statut: string }) {
    const isAff = statut === 'AFF';
    return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold"
            style={{ background: isAff ? `${C.green}30` : `${C.orange}30`, color: isAff ? C.green : C.orange }}>
            {statut}
        </span>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: C.textSec }}>{label}</label>
            {children}
            {error && <span className="text-xs" style={{ color: C.red }}>{error}</span>}
        </div>
    );
}
const iCls = `w-full rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500`;
const iSty = { background: C.section, border: `1px solid #ffffff18` } as const;

// ── Modal ──────────────────────────────────────────────────────────────────────
function EleveModal({ eleve, onClose }: { eleve: EleveLocal | null; onClose: () => void }) {
    const qc = useQueryClient();
    const isEdit = !!eleve;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EleveInput>({
        resolver: zodResolver(EleveSchema),
        defaultValues: eleve ? {
            matricule: eleve.matricule, matricule_ecole: eleve.matricule_ecole ?? undefined,
            code_ecole: eleve.code_ecole ?? undefined,
            nom: eleve.nom, prenom: eleve.prenom,
            sexe: eleve.sexe as 'M' | 'F',
            date_naissance: eleve.date_naissance ?? undefined,
            lieu_naissance: eleve.lieu_naissance ?? undefined,
            nationalite: eleve.nationalite ?? undefined, adresse: eleve.adresse ?? undefined,
            email_adresse: eleve.email_adresse ?? undefined, niveau: eleve.niveau ?? undefined,
            statut: (eleve.statut as typeof STATUTS[number]) ?? 'NAFF',
            regime: (eleve.regime as typeof REGIMES[number]) ?? undefined,
            qualite: (eleve.qualite as typeof QUALITES[number]) ?? undefined,
            annee_scolaire: eleve.annee_scolaire ?? undefined,
            telephone_sms: eleve.telephone_sms ?? undefined,
            moyen_paiement: eleve.moyen_paiement ?? undefined,
            nom_pere: eleve.nom_pere ?? undefined, prenom_pere: eleve.prenom_pere ?? undefined,
            telephone_pere: eleve.telephone_pere ?? undefined, adresse_pere: eleve.adresse_pere ?? undefined,
            nom_mere: eleve.nom_mere ?? undefined, prenom_mere: eleve.prenom_mere ?? undefined,
            telephone_mere: eleve.telephone_mere ?? undefined, adresse_mere: eleve.adresse_mere ?? undefined,
        } : { sexe: 'M', statut: 'NAFF', qualite: 'NON REDOUBLANT', annee_scolaire: '2025-2026' },
    });

    const onSubmit = async (data: EleveInput) => {
        const db = await getDb();
        if (isEdit) {
            await db.eleves.where('matricule').equals(eleve.matricule).modify({ ...data, syncStatus: 'pending', updatedAt: new Date().toISOString() });
            qc.invalidateQueries({ queryKey: ['eleves-local'] });
            onClose();
            const res = await syncUpdateEleve(eleve.matricule, data);
            await db.eleves.where('matricule').equals(eleve.matricule).modify({ syncStatus: res.success ? 'synced' : 'error', syncError: res.success ? undefined : res.error });
        } else {
            await db.eleves.add({ ...data, syncStatus: 'pending', updatedAt: new Date().toISOString(), ai_risk_level: 'Faible', ai_risk_score: 0 });
            qc.invalidateQueries({ queryKey: ['eleves-local'] });
            onClose();
            const res = await syncCreateEleve(data);
            await db.eleves.where('matricule').equals(data.matricule).modify({ syncStatus: res.success ? 'synced' : 'error', syncError: res.success ? undefined : res.error });
        }
        qc.invalidateQueries({ queryKey: ['eleves-local'] });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" style={{ background: C.navy }}>
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#ffffff15' }}>
                    <h2 className="text-lg font-bold text-white">{isEdit ? `✏️ Modifier — ${eleve.nom} ${eleve.prenom}` : '➕ Nouvel Élève'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Identité */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: C.orange }}><User size={13} /> Identité</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Matricule *" error={errors.matricule?.message}>
                                <input {...register('matricule')} placeholder="Ex: MAT-2025-001" className={iCls} style={iSty} readOnly={isEdit} />
                            </Field>
                            <Field label="Matricule École">
                                <input {...register('matricule_ecole')} placeholder="Matricule officiel école" className={iCls} style={iSty} />
                            </Field>
                            <Field label="Nom *" error={errors.nom?.message}>
                                <input {...register('nom')} placeholder="NOM" className={iCls} style={iSty} />
                            </Field>
                            <Field label="Prénom *" error={errors.prenom?.message}>
                                <input {...register('prenom')} placeholder="Prénom" className={iCls} style={iSty} />
                            </Field>
                            <Field label="Date de naissance">
                                <input type="date" {...register('date_naissance')} className={iCls} style={iSty} />
                            </Field>
                            <Field label="Lieu de naissance">
                                <input {...register('lieu_naissance')} placeholder="Ville" className={iCls} style={iSty} />
                            </Field>
                            <Field label="Sexe *" error={errors.sexe?.message}>
                                <select {...register('sexe')} className={iCls} style={iSty}>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                            </Field>
                            <Field label="Nationalité">
                                <input {...register('nationalite')} placeholder="Ex: Camerounaise" className={iCls} style={iSty} />
                            </Field>
                            <Field label="Adresse">
                                <input {...register('adresse')} className={iCls} style={iSty} />
                            </Field>
                            <Field label="Téléphone SMS">
                                <input {...register('telephone_sms')} placeholder="+237 6xx xxx xxx" className={iCls} style={iSty} />
                            </Field>
                        </div>
                    </section>
                    {/* Scolarité */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: C.blue }}><BookOpen size={13} /> Scolarité</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Niveau">
                                <select {...register('niveau')} className={iCls} style={iSty}>
                                    <option value="">— Choisir —</option>
                                    {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </Field>
                            <Field label="Statut" error={errors.statut?.message}>
                                <select {...register('statut')} className={iCls} style={iSty}>
                                    {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </Field>
                            <Field label="Régime">
                                <select {...register('regime')} className={iCls} style={iSty}>
                                    <option value="">— Choisir —</option>
                                    {REGIMES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </Field>
                            <Field label="Qualité">
                                <select {...register('qualite')} className={iCls} style={iSty}>
                                    <option value="">— Choisir —</option>
                                    {QUALITES.map(q => <option key={q} value={q}>{q}</option>)}
                                </select>
                            </Field>
                            <Field label="Année scolaire">
                                <input {...register('annee_scolaire')} placeholder="2025-2026" className={iCls} style={iSty} />
                            </Field>
                            <Field label="Moyen de paiement">
                                <input {...register('moyen_paiement')} className={iCls} style={iSty} />
                            </Field>
                        </div>
                    </section>
                    {/* Parents */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: C.green }}><Phone size={13} /> Parents</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Nom du père"><input {...register('nom_pere')} placeholder="NOM" className={iCls} style={iSty} /></Field>
                            <Field label="Prénom du père"><input {...register('prenom_pere')} className={iCls} style={iSty} /></Field>
                            <Field label="Tél. père"><input {...register('telephone_pere')} placeholder="+237 6xx xxx xxx" className={iCls} style={iSty} /></Field>
                            <Field label="Adresse père"><input {...register('adresse_pere')} className={iCls} style={iSty} /></Field>
                            <Field label="Nom de la mère"><input {...register('nom_mere')} placeholder="NOM" className={iCls} style={iSty} /></Field>
                            <Field label="Prénom de la mère"><input {...register('prenom_mere')} className={iCls} style={iSty} /></Field>
                            <Field label="Tél. mère"><input {...register('telephone_mere')} placeholder="+237 6xx xxx xxx" className={iCls} style={iSty} /></Field>
                            <Field label="Adresse mère"><input {...register('adresse_mere')} className={iCls} style={iSty} /></Field>
                        </div>
                    </section>
                    <div className="flex gap-3 justify-end pt-2 border-t" style={{ borderColor: '#ffffff15' }}>
                        <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-80" style={{ background: C.section, color: C.textSec }}>Annuler</button>
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 disabled:opacity-50" style={{ background: C.orange }}>
                            {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle size={15} />}
                            {isEdit ? 'Enregistrer' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Background sync ───────────────────────────────────────────────────────────
function useSyncPending() {
    const qc = useQueryClient();
    const syncPending = useCallback(async () => {
        const db = await getDb();
        const pending = await db.eleves.where('syncStatus').equals('pending').toArray();
        for (const e of pending) {
            if (!e.localId) continue;
            try {
                if (e.isDeleted) {
                    const res = await syncDeleteEleve(e.matricule);
                    if (res.success) await db.eleves.delete(e.localId);
                    else await db.eleves.update(e.localId, { syncStatus: 'error', syncError: res.error });
                } else {
                    let res = await syncUpdateEleve(e.matricule, e as unknown as EleveInput);
                    if (!res.success) res = await syncCreateEleve(e as unknown as EleveInput);
                    await db.eleves.update(e.localId, { syncStatus: res.success ? 'synced' : 'error', syncError: res.success ? undefined : res.error });
                }
            } catch {
                if (e.localId) await db.eleves.update(e.localId, { syncStatus: 'error', syncError: 'Erreur réseau' });
            }
        }
        if (pending.length > 0) qc.invalidateQueries({ queryKey: ['eleves-local'] });
    }, [qc]);

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

    const { data, isLoading } = useQuery({
        queryKey: ['eleves-local', page, search],
        queryFn: async () => {
            const db = await getDb();
            const all = await db.eleves.filter(e => !e.isDeleted).toArray();
            const filtered = search
                ? all.filter(e => e.nom.toLowerCase().includes(search.toLowerCase()) || e.prenom.toLowerCase().includes(search.toLowerCase()) || e.matricule.toLowerCase().includes(search.toLowerCase()))
                : all;
            filtered.sort((a, b) => a.nom.localeCompare(b.nom));
            return { eleves: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: filtered.length };
        },
        staleTime: 0,
    });

    // Bootstrap from Neon if Dexie empty
    useEffect(() => {
        (async () => {
            const db = await getDb();
            const count = await db.eleves.count();
            if (count === 0) {
                try {
                    const { eleves } = await getElevesFromNeon({ pageSize: 1000 });
                    for (const e of eleves) {
                        await db.eleves.add({ ...e as unknown as EleveLocal, syncStatus: 'synced', updatedAt: e.updated_at });
                    }
                    qc.invalidateQueries({ queryKey: ['eleves-local'] });
                } catch { /* offline */ }
            }
        })();
    }, [qc]);

    const eleves = data?.eleves ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const pendingCnt = eleves.filter(e => e.syncStatus === 'pending').length;

    const handleDelete = async (e: EleveLocal) => {
        if (!confirm(`Supprimer ${e.nom} ${e.prenom} (${e.matricule}) ?`)) return;
        const db = await getDb();
        await db.eleves.where('matricule').equals(e.matricule).modify({ isDeleted: true, syncStatus: 'pending', updatedAt: new Date().toISOString() });
        qc.invalidateQueries({ queryKey: ['eleves-local'] });
        const res = await syncDeleteEleve(e.matricule);
        if (res.success && e.localId) await db.eleves.delete(e.localId);
        qc.invalidateQueries({ queryKey: ['eleves-local'] });
    };

    const handleSearch = () => { setSearch(searchInput); setPage(1); };

    return (
        <div className="max-w-7xl mx-auto space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">👨‍🎓 Gestion des Élèves</h1>
                    <p className="text-sm mt-0.5" style={{ color: C.textSec }}>
                        {isLoading ? 'Chargement...' : `${total} élève(s)`}
                        {pendingCnt > 0 && <span className="ml-3 text-xs animate-pulse" style={{ color: C.orange }}>☁ {pendingCnt} en attente</span>}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button onClick={syncPending} title="Synchroniser" className="p-2 rounded-lg hover:opacity-80" style={{ background: C.section, color: C.textSec }}><RefreshCw size={15} /></button>
                    <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold hover:opacity-80" style={{ background: C.orange }}>
                        <Plus size={16} /> Ajouter un élève
                    </button>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textSec }} />
                    <input type="text" value={searchInput} onChange={e => setSI(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        placeholder="Rechercher par matricule, nom ou prénom..."
                        className="w-full rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        style={{ background: C.navy, border: `1px solid #ffffff18` }} />
                </div>
                <button onClick={handleSearch} className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-80" style={{ background: C.blue }}>Chercher</button>
                {search && <button onClick={() => { setSearch(''); setSI(''); setPage(1); }} className="p-2 rounded-lg hover:opacity-80" style={{ background: C.section, color: C.textSec }}><X size={15} /></button>}
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: C.navy }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs uppercase tracking-wider" style={{ background: C.section, color: C.textSec }}>
                                <th className="px-3 py-3 text-center w-8">☁</th>
                                <th className="px-4 py-3 text-left">Matricule</th>
                                <th className="px-4 py-3 text-left">Nom & Prénom</th>
                                <th className="px-4 py-3 text-left">Niveau</th>
                                <th className="px-4 py-3 text-left">Statut</th>
                                <th className="px-4 py-3 text-left">Régime</th>
                                <th className="px-4 py-3 text-left">Tél. SMS</th>
                                <th className="px-4 py-3 text-left">Risque IA</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={9} className="py-20 text-center"><Loader2 size={28} className="animate-spin mx-auto" style={{ color: C.orange }} /></td></tr>
                            ) : eleves.length === 0 ? (
                                <tr><td colSpan={9} className="py-20 text-center" style={{ color: C.textSec }}>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-4xl">🎓</span><span>Aucun élève trouvé.</span>
                                        <button onClick={() => setModal('add')} className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-80" style={{ background: C.orange }}>Ajouter le premier élève</button>
                                    </div>
                                </td></tr>
                            ) : eleves.map((e) => (
                                <tr key={e.localId} className="border-t transition-colors hover:bg-white/[0.03]" style={{ borderColor: '#ffffff0f' }}>
                                    <td className="px-3 py-3 text-center"><SyncIcon status={e.syncStatus} error={e.syncError} /></td>
                                    <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: C.orange }}>{e.matricule}</td>
                                    <td className="px-4 py-3"><span className="font-semibold text-white">{e.nom}</span><span className="ml-1.5" style={{ color: C.textSec }}>{e.prenom}</span></td>
                                    <td className="px-4 py-3 text-white">{e.niveau || '—'}</td>
                                    <td className="px-4 py-3"><StatutBadge statut={e.statut} /></td>
                                    <td className="px-4 py-3 text-xs" style={{ color: C.textSec }}>{e.regime || '—'}</td>
                                    <td className="px-4 py-3" style={{ color: C.textSec }}>{e.telephone_sms || '—'}</td>
                                    <td className="px-4 py-3"><RiskBadge level={e.ai_risk_level} /></td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => { setSelected(e); setModal('edit'); }} className="p-1.5 rounded-lg hover:opacity-80" style={{ background: `${C.blue}30`, color: C.blue }}><Edit2 size={13} /></button>
                                            <button onClick={() => handleDelete(e)} className="p-1.5 rounded-lg hover:opacity-80" style={{ background: `${C.red}30`, color: C.red }}><Trash2 size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#ffffff0f' }}>
                        <span className="text-xs" style={{ color: C.textSec }}>Page {page} / {totalPages} — {total} élève(s)</span>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="p-2 rounded-lg disabled:opacity-30 hover:opacity-80" style={{ background: C.section, color: C.textSec }}><ChevronLeft size={15} /></button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-2 rounded-lg disabled:opacity-30 hover:opacity-80" style={{ background: C.section, color: C.textSec }}><ChevronRight size={15} /></button>
                        </div>
                    </div>
                )}
            </div>

            {(modal === 'add' || modal === 'edit') && (
                <EleveModal eleve={modal === 'edit' ? selected : null} onClose={() => { setModal(null); setSelected(null); }} />
            )}
        </div>
    );
}
