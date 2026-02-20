import Dexie, { type Table } from 'dexie';

// ── Sync status type ──────────────────────────────────────────────────────────
export type SyncStatus = 'pending' | 'synced' | 'error';

// ── Élève local record ────────────────────────────────────────────────────────
export interface EleveLocal {
    localId?: number;  // Dexie auto-increment PK
    serverId?: number;  // ID from Neon (null until synced)
    syncStatus: SyncStatus;
    syncError?: string;
    syncedAt?: string;
    // All student fields
    nom: string;
    prenom: string;
    date_naissance?: string | null;
    lieu_naissance?: string | null;
    sexe: string;
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
    matricule?: string | null;
    matricule_ecole?: string | null;
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
    // Soft delete support
    isDeleted?: boolean;
    updatedAt: string;
}

// ── Dexie Database Class ──────────────────────────────────────────────────────
class KobsonDB extends Dexie {
    eleves!: Table<EleveLocal, number>;

    constructor() {
        super('KobsonSchoolPayDB');

        this.version(1).stores({
            // localId = auto PK, index other useful fields
            eleves: '++localId, syncStatus, serverId, nom, statut, isDeleted',
        });
    }
}

// Singleton export
export const db = new KobsonDB();
