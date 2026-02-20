'use server';

import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const sql = neon(process.env.DATABASE_URL!);

// ── Zod Schema ────────────────────────────────────────────────────────────────
export const EleveSchema = z.object({
    nom: z.string().min(1, 'Le nom est requis'),
    prenom: z.string().min(1, 'Le prénom est requis'),
    sexe: z.enum(['M', 'F']),
    date_naissance: z.string().nullable().optional(),
    lieu_naissance: z.string().nullable().optional(),
    nationalite: z.string().nullable().optional(),
    adresse: z.string().nullable().optional(),
    email_adresse: z.string().email().nullable().optional().or(z.literal('')),
    niveau: z.string().nullable().optional(),
    statut: z.string().default('Actif'),
    regime: z.string().nullable().optional(),
    qualite: z.string().nullable().optional(),
    annee_scolaire: z.string().nullable().optional(),
    telephone_sms: z.string().nullable().optional(),
    moyen_paiement: z.string().nullable().optional(),
    matricule: z.string().nullable().optional(),
    matricule_ecole: z.string().nullable().optional(),
    nom_pere: z.string().nullable().optional(),
    prenom_pere: z.string().nullable().optional(),
    telephone_pere: z.string().nullable().optional(),
    adresse_pere: z.string().nullable().optional(),
    nom_mere: z.string().nullable().optional(),
    prenom_mere: z.string().nullable().optional(),
    telephone_mere: z.string().nullable().optional(),
    adresse_mere: z.string().nullable().optional(),
});

export type EleveInput = z.infer<typeof EleveSchema>;
export type Eleve = EleveInput & { id: number; ai_risk_score: number; ai_risk_level: string; created_at: string; updated_at: string; };
export type ActionResult<T = void> = { success: true; data: T } | { success: false; error: string };

// ── READ ──────────────────────────────────────────────────────────────────────
export async function getElevesFromNeon(opts: { page?: number; pageSize?: number; search?: string }) {
    const { page = 1, pageSize = 50, search = '' } = opts;
    const offset = (page - 1) * pageSize;
    if (search.trim()) {
        const q = `%${search.trim()}%`;
        const [rows, countRows] = await Promise.all([
            sql`SELECT * FROM eleves WHERE is_deleted = FALSE AND (nom ILIKE ${q} OR prenom ILIKE ${q} OR matricule ILIKE ${q}) ORDER BY nom, prenom LIMIT ${pageSize} OFFSET ${offset}`,
            sql`SELECT COUNT(*) as total FROM eleves WHERE is_deleted = FALSE AND (nom ILIKE ${q} OR prenom ILIKE ${q} OR matricule ILIKE ${q})`,
        ]);
        return { eleves: rows as Eleve[], total: Number(countRows[0].total) };
    }
    const [rows, countRows] = await Promise.all([
        sql`SELECT * FROM eleves WHERE is_deleted = FALSE ORDER BY nom, prenom LIMIT ${pageSize} OFFSET ${offset}`,
        sql`SELECT COUNT(*) as total FROM eleves WHERE is_deleted = FALSE`,
    ]);
    return { eleves: rows as Eleve[], total: Number(countRows[0].total) };
}

// ── CREATE ────────────────────────────────────────────────────────────────────
export async function syncCreateEleve(data: EleveInput): Promise<ActionResult<{ id: number }>> {
    const parsed = EleveSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.errors.map(e => e.message).join(', ') };
    const d = parsed.data;
    try {
        const rows = await sql`
            INSERT INTO eleves (nom, prenom, date_naissance, lieu_naissance, sexe, nationalite, adresse, email_adresse,
                niveau, statut, regime, qualite, annee_scolaire, telephone_sms, moyen_paiement, matricule, matricule_ecole,
                nom_pere, prenom_pere, telephone_pere, adresse_pere, nom_mere, prenom_mere, telephone_mere, adresse_mere)
            VALUES (${d.nom}, ${d.prenom}, ${d.date_naissance ?? null}, ${d.lieu_naissance ?? null}, ${d.sexe},
                ${d.nationalite ?? null}, ${d.adresse ?? null}, ${d.email_adresse || null},
                ${d.niveau ?? null}, ${d.statut}, ${d.regime ?? null}, ${d.qualite ?? null}, ${d.annee_scolaire ?? null},
                ${d.telephone_sms ?? null}, ${d.moyen_paiement ?? null}, ${d.matricule ?? null}, ${d.matricule_ecole ?? null},
                ${d.nom_pere ?? null}, ${d.prenom_pere ?? null}, ${d.telephone_pere ?? null}, ${d.adresse_pere ?? null},
                ${d.nom_mere ?? null}, ${d.prenom_mere ?? null}, ${d.telephone_mere ?? null}, ${d.adresse_mere ?? null})
            RETURNING id
        `;
        revalidatePath('/admin/eleves');
        return { success: true, data: { id: rows[0].id as number } };
    } catch (e) { return { success: false, error: (e as Error).message }; }
}

// ── UPDATE ────────────────────────────────────────────────────────────────────
export async function syncUpdateEleve(id: number, data: EleveInput): Promise<ActionResult<void>> {
    const parsed = EleveSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.errors.map(e => e.message).join(', ') };
    const d = parsed.data;
    try {
        await sql`
            UPDATE eleves SET nom=${d.nom}, prenom=${d.prenom}, date_naissance=${d.date_naissance ?? null},
                lieu_naissance=${d.lieu_naissance ?? null}, sexe=${d.sexe}, nationalite=${d.nationalite ?? null},
                adresse=${d.adresse ?? null}, email_adresse=${d.email_adresse || null}, niveau=${d.niveau ?? null},
                statut=${d.statut}, regime=${d.regime ?? null}, qualite=${d.qualite ?? null},
                annee_scolaire=${d.annee_scolaire ?? null}, telephone_sms=${d.telephone_sms ?? null},
                moyen_paiement=${d.moyen_paiement ?? null}, matricule=${d.matricule ?? null},
                nom_pere=${d.nom_pere ?? null}, prenom_pere=${d.prenom_pere ?? null},
                telephone_pere=${d.telephone_pere ?? null}, adresse_pere=${d.adresse_pere ?? null},
                nom_mere=${d.nom_mere ?? null}, prenom_mere=${d.prenom_mere ?? null},
                telephone_mere=${d.telephone_mere ?? null}, adresse_mere=${d.adresse_mere ?? null}
            WHERE id = ${id} AND is_deleted = FALSE
        `;
        revalidatePath('/admin/eleves');
        return { success: true, data: undefined };
    } catch (e) { return { success: false, error: (e as Error).message }; }
}

// ── DELETE (soft) ─────────────────────────────────────────────────────────────
export async function syncDeleteEleve(id: number): Promise<ActionResult<void>> {
    try {
        await sql`UPDATE eleves SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ${id}`;
        revalidatePath('/admin/eleves');
        return { success: true, data: undefined };
    } catch (e) { return { success: false, error: (e as Error).message }; }
}
