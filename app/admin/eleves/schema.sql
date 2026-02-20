-- ============================================================
-- TABLE: eleves
-- Migrated from WPF Student.cs model
-- ============================================================

CREATE TABLE IF NOT EXISTS eleves (
    -- Identity
    matricule       VARCHAR(50)  PRIMARY KEY,      -- Matricule officiel (peut être null à la création)
    matricule_ecole VARCHAR(50) UNIQUE,
    code_ecole      VARCHAR(50),

    -- Personal Info
    nom             VARCHAR(100) NOT NULL,
    prenom          VARCHAR(150) NOT NULL,
    date_naissance  DATE,
    lieu_naissance  VARCHAR(150),
    sexe            VARCHAR(10),                  -- 'M' | 'F'
    nationalite     VARCHAR(100),
    adresse         VARCHAR(255),
    email_adresse   VARCHAR(255),

    -- School Info
    niveau          VARCHAR(50),                  -- Ex: 6ème, 5ème, Term...
    statut          VARCHAR(50)  DEFAULT 'NAFF', -- NAFF | AFF
    regime          VARCHAR(50),                  -- BOURSIER | 1/1BOURSIER | NON BOURSIER 
    qualite         VARCHAR(50),                  -- NOM REDOUBLANT | REDOUBLANT
    annee_scolaire  VARCHAR(20),                  -- Ex: 2025-2026
    -- Contact & Payment
    telephone_sms   VARCHAR(30),
    moyen_paiement  VARCHAR(50),

    -- Father Info
    nom_pere        VARCHAR(100),
    prenom_pere     VARCHAR(100),
    telephone_pere  VARCHAR(30),
    adresse_pere    VARCHAR(255),

    -- Mother Info
    nom_mere        VARCHAR(100),
    prenom_mere     VARCHAR(100),
    telephone_mere  VARCHAR(30),
    adresse_mere    VARCHAR(255),

    -- AI Fields
    ai_risk_score   DECIMAL(5,4) DEFAULT 0,
    ai_risk_level   VARCHAR(20)  DEFAULT 'Faible',

    -- Soft delete & Audit
    is_deleted      BOOLEAN      DEFAULT FALSE,
    deleted_at      TIMESTAMPTZ,
    deleted_by      VARCHAR(100),
    created_at      TIMESTAMPTZ  DEFAULT NOW(),
    created_by      VARCHAR(100),
    updated_at      TIMESTAMPTZ  DEFAULT NOW(),
    updated_by      VARCHAR(100)
);

-- Indexes for search performance
CREATE INDEX IF NOT EXISTS idx_eleves_nom       ON eleves(nom);
CREATE INDEX IF NOT EXISTS idx_eleves_prenom    ON eleves(prenom);
CREATE INDEX IF NOT EXISTS idx_eleves_matricule ON eleves(matricule);
CREATE INDEX IF NOT EXISTS idx_eleves_niveau    ON eleves(niveau);
CREATE INDEX IF NOT EXISTS idx_eleves_statut    ON eleves(statut);
CREATE INDEX IF NOT EXISTS idx_eleves_annee     ON eleves(annee_scolaire);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_updated_at_eleves ON eleves;
CREATE TRIGGER set_updated_at_eleves
    BEFORE UPDATE ON eleves
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
