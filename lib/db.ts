import Dexie, { type Table } from 'dexie';

export type SyncStatus = 'pending' | 'synced' | 'error';

// ── Élève local (mirrors schema.sql exactly) ──────────────────────────────────
export interface EleveLocal {
    localId?: number;        // Dexie internal auto-key
    syncStatus: SyncStatus;
    syncError?: string;
    // PK from Neon (matricule)
    matricule: string;        // Required — PK on server
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
    statut: string;        // NAFF | AFF
    regime?: string | null; // BOURSIER | 1/2 BOURSIER | NON BOURSIER
    qualite?: string | null; // NON REDOUBLANT | REDOUBLANT
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

// ── Dexie DB ─────────────────────────────────────────────────────────────────
class KobsonDB extends Dexie {
    eleves!: Table<EleveLocal, number>;

    constructor() {
        super('KobsonSchoolPayDB');
        this.version(2).stores({
            // ++localId = auto PK, matricule indexed for fast lookup
            eleves: '++localId, syncStatus, matricule, nom, statut, isDeleted',
        });
    }
}

export const db = new KobsonDB();
