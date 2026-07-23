-- ============================================================================
-- AGIR FinTech — Migration 002 : Catalogue des 10 fonds d'investissement
-- Base de données : Supabase / PostgreSQL
-- ============================================================================

-- Création du type d'énumération pour les niveaux de risque
DO $$ BEGIN
    CREATE TYPE risk_level_type AS ENUM ('aucun', 'faible', 'modere', 'dynamique', 'eleve');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================================
-- Table principale du catalogue des fonds AGIR
-- ============================================================================
CREATE TABLE IF NOT EXISTS agir_funds_catalog (
    id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name                 TEXT NOT NULL,
    tagline              TEXT NOT NULL,
    description          TEXT NOT NULL,
    use_case             TEXT NOT NULL,
    net_return_rate      TEXT NOT NULL,
    risk_level           risk_level_type NOT NULL,
    recommended_duration TEXT NOT NULL,
    entry_brokerage_fee  NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    exit_brokerage_fee   NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    annual_management_fee NUMERIC(5,2) NOT NULL DEFAULT 1.00,
    min_investment       NUMERIC(15,2) NOT NULL DEFAULT 1000.00,
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_funds_risk_level ON agir_funds_catalog(risk_level);
CREATE INDEX IF NOT EXISTS idx_funds_active ON agir_funds_catalog(is_active);

-- ============================================================================
-- Insertion des 10 fonds d'investissement AGIR
-- ============================================================================
INSERT INTO agir_funds_catalog
    (name, tagline, description, use_case, net_return_rate, risk_level, recommended_duration, entry_brokerage_fee, exit_brokerage_fee, annual_management_fee, min_investment)
VALUES
    (
        'AGIR Flex',
        'L''épargne libre et disponible 24 h/24',
        'Fonds monétaire sécurisé de très court terme.',
        'Placements de trésorerie sur des Bons du Trésor des États de la CEMAC. Idéal pour votre argent du quotidien.',
        '4,5 % à 5,5 % / an',
        'aucun',
        'Disponible en 24 h',
        0.00, 0.00, 1.00, 1000.00
    ),
    (
        'AGIR Sécurité',
        'Construisez vos projets avec sérénité',
        'Fonds obligataire souverain de court/moyen terme.',
        'Financement des infrastructures publiques via les Obligations du Trésor Assimilables (OTA) des États de la sous-région.',
        '6 % à 7 % / an',
        'faible',
        '6 mois minimum',
        1.00, 0.00, 1.20, 5000.00
    ),
    (
        'AGIR Croissance',
        'Captez la performance des grandes entreprises',
        'Fonds d''actions diversifié orienté sur la bourse régionale.',
        'Achat de parts de capital des fleurons industriels et bancaires cotés à la BVMAC (SOCAPALM, BGFI, BANGE).',
        'Dividendes + Plus-values',
        'dynamique',
        '24 mois minimum',
        1.50, 1.00, 1.50, 10000.00
    ),
    (
        'AGIR Immo',
        'Devenez copropriétaire immobilier dès 1 000 FCFA',
        'Fonds de placement collectif en immobilier (SCPI).',
        'Acquisition et construction de bâtiments logistiques et de bureaux professionnels à Douala et Libreville. Les loyers alimentent le fonds.',
        '7 % à 9 % / an',
        'modere',
        '12 mois minimum',
        2.00, 1.00, 1.50, 1000.00
    ),
    (
        'AGIR Affacturage',
        'Financez l''économie locale et boostez vos gains',
        'Fonds de titrisation de créances commerciales (dette privée).',
        'Rachat avec décote des factures certifiées des PME locales émises sur de grands donneurs d''ordres solvables de la CEMAC.',
        '8 % à 12 % / an',
        'modere',
        '3 à 6 mois',
        1.00, 0.50, 1.50, 5000.00
    ),
    (
        'AGIR Agricole',
        'Soutenez les campagnes agricoles d''Afrique Centrale',
        'Fonds de financement participatif agricole saisonnier.',
        'Achat d''intrants et financement des campagnes de collecte de coopératives agricoles majeures (café, cacao). Remboursement à l''exportation.',
        '9 % à 11 % / an',
        'eleve',
        '9 mois minimum',
        1.00, 0.50, 1.80, 5000.00
    ),
    (
        'AGIR Leasing',
        'Participez au financement des équipements des PME',
        'Fonds de crédit-bail mobilier et matériel.',
        'Achat de véhicules professionnels, taxis ou engins industriels mis en location-vente auprès d''entrepreneurs de la sous-région.',
        '8 % à 10 % / an',
        'modere',
        '12 mois minimum',
        1.50, 0.50, 1.50, 10000.00
    ),
    (
        'AGIR Green',
        'Investissez dans la transition énergétique régionale',
        'Fonds à fort impact environnemental et social.',
        'Déploiement de kits solaires résidentiels et de mini-centrales de distribution électrique hors-réseau dans les localités secondaires.',
        '7 % à 8,5 % / an',
        'faible',
        '18 mois minimum',
        1.00, 0.00, 1.20, 5000.00
    ),
    (
        'AGIR Éducation',
        'Assurez l''avenir universitaire de vos enfants',
        'Fonds de prévoyance éducatif bloqué avec option Auto-Save.',
        'Placement long terme sécurisé sur des instruments mixtes pour garantir le financement des grandes écoles ou des projets universitaires.',
        '6 % fixe / an',
        'faible',
        'Bloqué (objectif)',
        0.00, 0.00, 1.00, 1000.00
    ),
    (
        'AGIR Diaspora',
        'Co-développez la CEMAC en toute sécurité',
        'Fonds d''investissement direct pour les Africains de l''extérieur.',
        'Canal sécurisé permettant à la diaspora d''injecter des fonds par carte bancaire internationale dans des projets de micro-infrastructures vérifiés.',
        '5,5 % à 6,5 % / an',
        'modere',
        '12 mois minimum',
        2.00, 0.00, 1.50, 10000.00
    );

-- ============================================================================
-- Sécurité : Row Level Security (RLS)
-- ============================================================================
ALTER TABLE agir_funds_catalog ENABLE ROW LEVEL SECURITY;

-- Lecture publique (catalogue visible par tous les utilisateurs connectés)
CREATE POLICY "Lecture publique du catalogue des fonds"
    ON agir_funds_catalog
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

-- Seuls les administrateurs peuvent modifier le catalogue
CREATE POLICY "Écriture réservée aux administrateurs"
    ON agir_funds_catalog
    FOR ALL
    TO service_role
    USING (TRUE)
    WITH CHECK (TRUE);

-- Trigger de mise à jour automatique du champ updated_at
CREATE OR REPLACE FUNCTION update_funds_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_funds_updated_at
    BEFORE UPDATE ON agir_funds_catalog
    FOR EACH ROW
    EXECUTE FUNCTION update_funds_updated_at();
