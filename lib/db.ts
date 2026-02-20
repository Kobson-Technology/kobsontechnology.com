import type { Table } from 'dexie';

export type SyncStatus = 'pending' | 'synced' | 'error';

// ── Élève local (mirrors schema.sql exactly) ──────────────────────────────────
export interface EleveLocal {
    localId?: number;
    syncStatus: SyncStatus;
    syncError?: string;
    matricule: string;
    matricule_ecole?: string | null;
    code_ecole?: string | null;
    nom: string;
    prenom: string;
    sexe: string;
    date_naissance?: string | null;
    lieu_naissance?: string | null;
    nationalite?: string | null;
    adresse?: string | null;
    email_adresse?: string | null;
    niveau?: string | null;
    statut: string;
    regime?: string | null;
    qualite?: string | null;
    annee_scolaire?: string | null;
    telephone_sms?: string | null;
    moyen_paiement?: string | null;
    nom_pere?: string | null;
    prenom_pere?: string | null;
    telephone_pere?: string | null;
    adresse_pere?: string | null;
    nom_mere?: string | null;
    prenom_mere?: string | null;
    telephone_mere?: string | null;
    adresse_mere?: string | null;
    ai_risk_score?: number;
    ai_risk_level?: string;
    isDeleted?: boolean;
    updatedAt: string;
}

// ── Dexie DB (lazy singleton — only initialised in the browser) ───────────────
// We defer the import and instantiation so that Next.js SSR/build never
// tries to access IndexedDB (which doesn't exist on the server).
let _db: import('dexie').Dexie & { eleves: Table<EleveLocal, number> } | null = null;

export async function getDb() {
    if (typeof window === 'undefined') {
        // Server-side: return a no-op stub so the build never crashes
        throw new Error('getDb() must be called only in the browser');
    }
    if (_db) return _db;

    const { default: Dexie } = await import('dexie');

    class KobsonDB extends Dexie {
        eleves!: Table<EleveLocal, number>;
        constructor() {
            super('KobsonSchoolPayDB');
            this.version(2).stores({
                eleves: '++localId, syncStatus, matricule, nom, statut, isDeleted',
            });
        }
    }

    _db = new KobsonDB() as typeof _db;
    return _db!;
}

// ── Convenience re-export for components that already guard SSR ───────────────
// Usage: const db = await getDb();
export type { Table };
