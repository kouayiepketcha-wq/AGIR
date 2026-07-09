/* ==========================================================================
   AGIR FinTech - Core Application Engine & Simulation Logic (Phase 2)
   ========================================================================== */

// 1. Static Database for BVMAC listed Assets
const BVMAC_STOCKS = [
    {
        ticker: 'SOCA',
        name: 'SOCAPALM',
        fullName: 'Société Camerounaise de Palmeraies',
        sector: 'Agro-industrie',
        sectorKey: 'agro',
        price: 48000,
        change: 1.8,
        prevPrice: 47150,
        history: [46200, 46500, 47000, 46800, 47150, 48000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '12.4x', status: 'good', desc: 'Valorisation attractive par rapport au secteur agro-industriel.' },
            roe: { label: 'ROE (Return on Equity)', value: '18.5%', status: 'good', desc: 'Très forte rentabilité des capitaux propres, supérieure à la moyenne.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '7.8%', status: 'good', desc: 'Excellent rendement de dividende distributif régulier.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.35', status: 'good', desc: 'Structure financière saine avec un faible endettement.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 88,
            narrative: 'SOCAPALM présente des fondamentaux robustes. La hausse des cours de l\'huile de palme brute soutient les marges opérationnelles. Sa politique de distribution de dividendes en fait une valeur défensive incontournable en zone CEMAC.',
            strengths: ['Forte demande d\'huile de palme en zone CEMAC', 'Trésorerie nette robuste et dividendes élevés récurrents'],
            risks: ['Dépendance aux conditions météo', 'Fluctuation des prix des matières premières']
        },
        projections: [48000, 52000, 56500, 61000, 68000],
        documents: [
            { id: 'soca-doc-1', title: 'Rapport Annuel 2025 SOCAPALM.pdf', size: '2.8 Mo', text: 'SOCAPALM Exercice 2025. Chiffre d\'Affaires : 85.4 milliards FCFA (+12%). Résultat Net : 14.2 milliards FCFA. Proposition d\'un dividende brut de 2 500 FCFA par action le 12 Juillet 2026. L\'EBITDA progresse de 8.5% soutenu par la hausse des rendements à l\'hectare.' },
            { id: 'soca-doc-2', title: 'Prospectus d\'Introduction BVMAC.pdf', size: '4.2 Mo', text: 'Prospectus approuvé par la COSUMAF sous le visa n° BVMAC-2009-01. Analyse des risques sectoriels : dépendance climatique et logistique. Structure du capital : État du Cameroun (15%), SOCFIN (65%), Public BVMAC (20%).' }
        ]
    },
    {
        ticker: 'SAFA',
        name: 'SAFACAM',
        fullName: 'Société Africaine Forestière et Agricole du Cameroun',
        sector: 'Agro-industrie',
        sectorKey: 'agro',
        price: 24500,
        change: -0.4,
        prevPrice: 24600,
        history: [25100, 24900, 24800, 24700, 24600, 24500],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '9.8x', status: 'good', desc: 'Action sous-évaluée, opportunité d\'achat à bon compte.' },
            roe: { label: 'ROE (Return on Equity)', value: '14.2%', status: 'average', desc: 'Rentabilité stable mais impactée par les coûts forestiers.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '8.2%', status: 'good', desc: 'Un des rendements les plus élevés de la cote.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.12', status: 'good', desc: 'Quasiment aucune dette financière.' }
        },
        aiOpinion: {
            rec: 'CONSERVER',
            confidence: 72,
            narrative: 'SAFACAM souffre d\'un ralentissement des exportations de caoutchouc, compensé par l\'huile de palme. L\'absence de dette protège l\'entreprise. Nous recommandons de conserver pour le rendement.',
            strengths: ['Bilan sain sans dette financière', 'Rendement de dividende exceptionnel (>8%)'],
            risks: ['Sensibilité de la demande globale de caoutchouc', 'Coûts de transport croissants']
        },
        projections: [24500, 25200, 26800, 28100, 30500],
        documents: [
            { id: 'safa-doc-1', title: 'Rapport Financier Semestriel 2025.pdf', size: '1.9 Mo', text: 'Résultats SAFACAM du 1er Semestre 2025. EBITDA en léger repli de 2% à cause de la baisse des prix du caoutchouc. Trésorerie nette positive à 4.2 milliards FCFA. Aucun endettement bancaire à long terme n\'est enregistré.' }
        ]
    },
    {
        ticker: 'BANG',
        name: 'BANGE',
        fullName: 'Banco Nacional de Guinea Ecuatorial',
        sector: 'Banques & Finance',
        sectorKey: 'finance',
        price: 206000,
        change: 3.2,
        prevPrice: 199600,
        history: [190000, 192000, 195000, 198000, 199600, 206000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '8.2x', status: 'good', desc: 'Valorisation boursière faible compte tenu du taux de croissance.' },
            roe: { label: 'ROE (Return on Equity)', value: '22.4%', status: 'good', desc: 'Excellente rentabilité financière portée par l\'expansion (Cameroun).' },
            yield: { label: 'Dividend Yield (Rendement)', value: '6.5%', status: 'good', desc: 'Dividende attractif avec un taux de distribution soutenu.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '1.45', status: 'average', desc: 'Normal pour une institution bancaire (levier de dépôts).' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 91,
            narrative: 'BANGE est un moteur financier de la zone CEMAC. Son entrée sur le marché camerounais et l\'obtention de licences d\'intermédiation dynamisent son modèle d\'affaires. Valorisation basse par rapport à la croissance.',
            strengths: ['Expansion régionale active (Cameroun, Gabon)', 'Première banque de Guinée Équatoriale', 'Excellente marge nette bancaire'],
            risks: ['Exposition aux risques de crédit de la zone CEMAC', 'Contrôles réglementaires de la COBAC']
        },
        projections: [206000, 225000, 248000, 275000, 310000],
        documents: [
            { id: 'bang-doc-1', title: 'Bilan de Comptes Consolides BANGE 2025.pdf', size: '3.4 Mo', text: 'Comptes consolidés du Groupe BANGE 2025. Total bilan : 1 200 milliards FCFA. Produit Net Bancaire : 78 milliards FCFA (+14%). Bénéfice net consolidé : 15.6 milliards FCFA. Progression forte des encours de crédit sur les PME camerounaises.' },
            { id: 'bang-doc-2', title: 'Note d\'Information COSUMAF BANGE.pdf', size: '2.5 Mo', text: 'Document d\'information officiel d\'introduction en bourse (BVMAC). Résumé de la stratégie : devenir une banque universelle CEMAC. Augmentation de capital souscrite à hauteur de 100%.' }
        ]
    },
    {
        ticker: 'LARE',
        name: 'La Régionale',
        fullName: 'La Régionale d\'Épargne et de Crédit',
        sector: 'Banques & Finance',
        sectorKey: 'finance',
        price: 42500,
        change: 1.1,
        prevPrice: 42040,
        history: [41500, 41700, 41900, 42100, 42040, 42500],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '15.2x', status: 'average', desc: 'Valorisation conforme à la moyenne du secteur bancaire régional.' },
            roe: { label: 'ROE (Return on Equity)', value: '11.8%', status: 'average', desc: 'Rentabilité correcte, s\'améliorant suite au statut de banque universelle.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '5.0%', status: 'average', desc: 'Rendement convenable pour un acteur en phase de croissance.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.50', status: 'good', desc: 'Endettement propre très bien maîtrisé.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 80,
            narrative: 'La Régionale poursuit sa transformation en banque commerciale. L\'augmentation du réseau d\'agences et la digitalisation via Mobile Banking présagent une hausse de la collecte des dépôts.',
            strengths: ['Licence de banque commerciale obtenue', 'Forte pénétration auprès des PME et des particuliers'],
            risks: ['Coûts de restructuration initiaux', 'Forte concurrence bancaire locale']
        },
        projections: [42500, 46000, 50200, 55000, 62000],
        documents: [
            { id: 'lare-doc-1', title: 'Rapport de Gestion Annuel 2025.pdf', size: '2.2 Mo', text: 'Rapport d\'activité La Régionale 2025. Hausse des clients actifs de 25% grâce au canal digital. Capital social porté à 15 milliards FCFA pour répondre aux exigences réglementaires de la COBAC.' }
        ]
    },
    {
        ticker: 'SEMC',
        name: 'SEMC',
        fullName: 'Société des Eaux Minérales du Cameroun',
        sector: 'Services Publics',
        sectorKey: 'utility',
        price: 47000,
        change: 0.0,
        prevPrice: 47000,
        history: [47000, 47000, 47000, 47000, 47000, 47000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '24.1x', status: 'poor', desc: 'Valorisation très élevée par rapport aux bénéfices réels.' },
            roe: { label: 'ROE (Return on Equity)', value: '5.1%', status: 'poor', desc: 'Rentabilité faible témoignant de la concurrence agressive.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '2.5%', status: 'poor', desc: 'Distribution de dividende peu attractive.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.85', status: 'average', desc: 'Niveau d\'endettement modéré sous surveillance.' }
        },
        aiOpinion: {
            rec: 'VENDRE',
            confidence: 65,
            narrative: 'La SEMC fait face à une concurrence rude sur l\'eau minérale. Les marges sont sous pression et la croissance reste atone. P/E élevé et faible rendement, préférez d\'autres titres BVMAC.',
            strengths: ['Notoriété historique de la marque Source Tangui', 'Réseau de distribution étendu'],
            risks: ['Forte guerre des prix sur le marché de l\'eau', 'Baisse continue des parts de marché']
        },
        projections: [47000, 46000, 45200, 44000, 43500],
        documents: [
            { id: 'semc-doc-1', title: 'Communique de Presse Resultats 2025.pdf', size: '0.8 Mo', text: 'Communique officiel SEMC. Le chiffre d\'affaires s\'établit à 12 milliards FCFA. Le résultat opérationnel recule de 14% dû à la hausse des coûts du plastique importé et aux remises consenties aux distributeurs.' }
        ]
    },
    {
        ticker: 'SCGR',
        name: 'SCG-Ré',
        fullName: 'Société Commerciale Gabonaise de Réassurance',
        sector: 'Banques & Finance',
        sectorKey: 'finance',
        price: 21000,
        change: -1.2,
        prevPrice: 21250,
        history: [21800, 21600, 21500, 21300, 21250, 21000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '11.1x', status: 'good', desc: 'Niveau d\'évaluation modéré offrant une marge de sécurité.' },
            roe: { label: 'ROE (Return on Equity)', value: '12.5%', status: 'average', desc: 'Rentabilité stable propre au secteur de la réassurance.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '7.1%', status: 'good', desc: 'Rendement de dividende solide et distribution régulière.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.22', status: 'good', desc: 'Excellent bilan avec des réserves techniques robustes.' }
        },
        aiOpinion: {
            rec: 'CONSERVER',
            confidence: 76,
            narrative: 'SCG-Ré bénéficie d\'un cadre réglementaire favorable au Gabon (cession légale obligatoire). Son expansion géographique diversifie les risques. Recommandation Conserver pour le profil défensif.',
            strengths: ['Réglementation locale protectrice (cessions obligatoires)', 'Réserves de solvabilité importantes'],
            risks: ['Sensibilité aux sinistres industriels majeurs', 'Cycle mondial de réassurance serré']
        },
        projections: [21000, 22200, 23500, 24800, 26500],
        documents: [
            { id: 'scg-doc-1', title: 'Note d\'Information de Cotation SCG-Re.pdf', size: '2.1 Mo', text: 'Présentation de SCG-Ré lors de son introduction en bourse. Leader de la réassurance en zone CEMAC. Primes émises globales en croissance annuelle moyenne de 6.5% sur les 5 dernières années.' }
        ]
    }
];

// Obligations (Bonds) Database
const BVMAC_BONDS = [
    {
        ticker: 'ECMR',
        name: 'ECMR 6.25% 26-31',
        fullName: 'État du Cameroun (ECMR 6.25% 2026-2031)',
        sector: 'Obligations d\'État',
        sectorKey: 'sovereign',
        price: 10000,
        change: 0.0,
        prevPrice: 10000,
        history: [10000, 10000, 10000, 10000, 10000, 10000],
        ratios: {
            yield: { label: 'Yield to Maturity (Rendement)', value: '6.25% A.N.', status: 'good', desc: 'Taux fixe garanti par le Trésor Public du Cameroun.' },
            duration: { label: 'Durée de Placement', value: '5 ans', status: 'average', desc: 'Échéance fixée au 31 décembre 2031.' },
            rating: { label: 'Notation Souveraine', value: 'B (Stable)', status: 'average', desc: 'Risque de défaut modéré, soutenu par la banque centrale BEAC.' },
            liquidity: { label: 'Indice de liquidité', value: 'Moyen-Élevé', status: 'good', desc: 'Facilement négociable auprès des banques locales (SVT).' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 95,
            narrative: 'Cette obligation de l\'État du Cameroun est l\'un des actifs les plus sécurisés de la zone CEMAC. Elle offre un rendement supérieur aux comptes sur livret locaux tout en garantissant des coupons annuels exempts d\'impôts pour les résidents fiscaux.',
            strengths: ['Remboursement garanti par l\'État du Cameroun', 'Fiscalité avantageuse sur les intérêts (0% en zone CEMAC)'],
            risks: ['Risque d\'inflation locale supérieure au rendement', 'Blocage partiel à court terme']
        },
        projections: [10000, 10000, 10000, 10000, 10000],
        documents: [
            { id: 'ecmr-doc-1', title: 'Note d\'Information Emprunt ECMR.pdf', size: '1.7 Mo', text: 'Caractéristiques de l\'emprunt de l\'État du Cameroun. Taux d\'intérêt : 6.25% brut l\'an. Remboursement par amortissement constant à partir de la deuxième année. Trésorerie affectée aux projets de développement.' }
        ]
    },
    {
        ticker: 'EOTG',
        name: 'EOTG 6.5% 25-30',
        fullName: 'État du Gabon (EOTG 6.5% 2025-2030)',
        sector: 'Obligations d\'État',
        sectorKey: 'sovereign',
        price: 10000,
        change: 0.0,
        prevPrice: 10000,
        history: [10000, 10000, 10000, 10000, 10000, 10000],
        ratios: {
            yield: { label: 'Yield to Maturity (Rendement)', value: '6.50% A.N.', status: 'good', desc: 'Coupon annuel fixe émis par la République Gabonaise.' },
            duration: { label: 'Durée de Placement', value: '4 ans', status: 'average', desc: 'Échéance fixée en juin 2030.' },
            rating: { label: 'Notation Souveraine', value: 'B- (Stable)', status: 'average', desc: 'Notation reflétant l\'impact du cours du pétrole sur le Trésor.' },
            liquidity: { label: 'Indice de liquidité', value: 'Moyen', status: 'average', desc: 'Volume de transaction inférieur à l\'emprunt camerounais.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 89,
            narrative: 'Le Gabon offre un taux légèrement supérieur pour compenser le risque souverain. Le remboursement reste très probable grâce à la restructuration de la dette pétrolière gabonaise et l\'appui BEAC.',
            strengths: ['Rendement élevé de 6.5%', 'Garantie de remboursement BEAC'],
            risks: ['Exposition de l\'économie gabonaise au marché pétrolier', 'Liquidité secondaire parfois lente']
        },
        projections: [10000, 10000, 10000, 10000, 10000],
        documents: [
            { id: 'eotg-doc-1', title: 'Fiche d\'Emission Obligataire Gabon.pdf', size: '1.4 Mo', text: 'Fiche de souscription EOTG. Taux nominal : 6.50%. Paiement annuel des coupons à date anniversaire. Les fonds collectés sont destinés à financer le plan d\'accélération de la transition infrastructures.' }
        ]
    }
];

// Fonds Communs de Placement (FCP) Database
const BVMAC_FCP = [
    {
        ticker: 'AGFL',
        name: 'AGIR Flex',
        fullName: 'AGIR Flex (Fonds Monétaire Liquide)',
        sector: 'Produits AGIR',
        sectorKey: 'fcp-agir',
        price: 1000,
        change: 0.1,
        prevPrice: 999,
        history: [988, 990, 992, 995, 999, 1000],
        ratios: {
            yield: { label: 'Performance Estimée (A.N.)', value: '5.8% A.N.', status: 'good', desc: 'Rendement net cible de frais de gestion.' },
            risk: { label: 'Profil de Risque', value: 'Trés Prudent (1/7)', status: 'good', desc: 'Risque en capital quasi-nul. Actifs investis en Bons du Trésor BEAC.' },
            minInv: { label: 'Minimum d\'Entrée', value: '5 000 FCFA', status: 'good', desc: 'Montant ultra-accessible pour encourager la participation.' },
            liquidity: { label: 'Disponibilité des Fonds', value: 'Instantannée (T+0)', status: 'good', desc: 'Retrait disponible à tout moment sans pénalités.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 97,
            narrative: 'AGIR Flex est l\'outil d\'innovation idéal pour les utilisateurs qui ne veulent pas investir sur des actions individuelles mais souhaitent valoriser leur épargne. Il réinvestit en continu dans la dette souveraine de court terme, maintenant une liquidité élevée.',
            strengths: ['Retraits instantanés vers Mobile Money', 'Rentabilité très stable et prévisible', 'Faible frais de gestion (0.75% / an)'],
            risks: ['Rendement plus modéré que les actions']
        },
        projections: [1000, 1058, 1120, 1185, 1253],
        documents: [
            { id: 'agfl-doc-1', title: 'Reglement de FCP AGIR Flex.pdf', size: '1.2 Mo', text: 'Règlement général approuvé par la COSUMAF. Fonds d\'allocation monétaire. Stratégie : investissements exclusifs dans les Bons et Obligations du Trésor Assimilables (BTA/OTA) de la zone CEMAC.' }
        ]
    },
    {
        ticker: 'AGTE',
        name: 'AGIR Team',
        fullName: 'AGIR Team (Fonds d\'Investissement Coopératif)',
        sector: 'Produits AGIR',
        sectorKey: 'fcp-agir',
        price: 1500,
        change: 0.4,
        prevPrice: 1494,
        history: [1420, 1440, 1455, 1475, 1494, 1500],
        ratios: {
            yield: { label: 'Performance Estimée (A.N.)', value: '7.2% A.N.', status: 'good', desc: 'Objectif de rendement à long terme.' },
            risk: { label: 'Profil de Risque', value: 'Modéré (3/7)', status: 'average', desc: 'Prise de risque équilibrée liée à un portefeuille mixte.' },
            minInv: { label: 'Minimum d\'Entrée', value: '25 000 FCFA', status: 'good', desc: 'Fonds accessible au grand public.' },
            liquidity: { label: 'Périodicité de Rachat', value: 'Hebdomadaire (T+3)', status: 'average', desc: 'Les demandes de rachat sont traitées le vendredi.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 85,
            narrative: 'Le fonds AGIR Team permet d\'investir collectivement dans l\'économie réelle régionale. Il alloue une partie du capital au co-financement de PME auditées à fort potentiel de croissance et une partie à la BVMAC, garantissant un dividende communautaire.',
            strengths: ['Soutient l\'économie locale et les PME d\'Afrique Centrale', 'Rendement équilibré combinant dette et actions'],
            risks: ['Risque lié aux défaillances des PME locales', 'Blocage temporaire des fonds de 48h']
        },
        projections: [1500, 1608, 1724, 1848, 1980],
        documents: [
            { id: 'agte-doc-1', title: 'DIC - Document d\'Information AGIR Team.pdf', size: '1.5 Mo', text: 'Document d\'information clé du FCP AGIR Team. Allocation cible : 40% obligations d\'état, 30% actions BVMAC de premier ordre, 30% prêts participatifs structurés à des PME locales de l\'agro-industrie.' }
        ]
    },
    {
        ticker: 'AGOB',
        name: 'AGIR Objectif',
        fullName: 'AGIR Objectif (Fonds Actions)',
        sector: 'Produits AGIR',
        sectorKey: 'fcp-agir',
        price: 2000,
        change: 1.2,
        prevPrice: 1976,
        history: [1810, 1850, 1890, 1930, 1976, 2000],
        ratios: {
            yield: { label: 'Performance Estimée (A.N.)', value: '8.5% A.N.', status: 'good', desc: 'Fort potentiel de gain sur horizon de placement long.' },
            risk: { label: 'Profil de Risque', value: 'Dynamique (5/7)', status: 'poor', desc: 'Risque de perte en capital lié aux fluctuations boursières.' },
            minInv: { label: 'Minimum d\'Entrée', value: '50 000 FCFA', status: 'average', desc: 'Nécessite une épargne constituée.' },
            liquidity: { label: 'Disponibilité des Fonds', value: 'Mensuelle (Bloqué 1A)', status: 'poor', desc: 'Frais de sortie anticipée de 2.5% si retrait avant 1 an.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 88,
            narrative: 'AGIR Objectif réplique et optimise la performance globale des actions de la BVMAC (BANGE, SOCAPALM, etc.). C\'est le support de choix pour les Plans d\'Investissement Programmé (PIP) de long terme comme la préparation d\'un achat immobilier ou la retraite.',
            strengths: ['Meilleur moyen d\'investir sur l\'ensemble des actions d\'Afrique Centrale', 'Gestion discrétionnaire par les meilleurs gérants régionaux'],
            risks: ['Forte volatilité des cours boursiers sous-jacents', 'Liquidité restreinte en cas de rachat anticipé']
        },
        projections: [2000, 2170, 2354, 2555, 2772],
        documents: [
            { id: 'agob-doc-1', title: 'Fiche Commerciale AGIR Objectif.pdf', size: '2.0 Mo', text: 'Fiche descriptive FCP AGIR Objectif. Performance cumulée simulée de +42% sur 5 ans. Investissement de conviction concentré sur les leaders de la distribution et les financières régionales.' }
        ]
    }
];

// 2. Initial Application State
let appState = {
    cashBalance: 1250000, // XAF
    isSubscribed: false, 
    portfolio: [
        { ticker: 'SOCA', qty: 50, avgBuyPrice: 46000, type: 'action' },  // Stock
        { ticker: 'SAFA', qty: 30, avgBuyPrice: 23000, type: 'action' },  // Stock
        { ticker: 'LARE', qty: 10, avgBuyPrice: 40000, type: 'action' }   // Stock
    ],
    vaults: [
        { id: 'v1', name: 'PIP Retraite - AGIR Objectif', balance: 500000, target: 1000000, rate: '8.5%', asset: 'AGIR Objectif', type: 'locked' },
        { id: 'v2', name: 'PIP Achat Bureau - ECMR 6.25%', balance: 250000, target: 500000, rate: '6.25%', asset: 'ECMR 6.25% 26-31', type: 'flexible' },
        { id: 'v3', name: 'PIP Épargne Libre - AGIR Flex', balance: 100000, target: 200000, rate: '5.8%', asset: 'AGIR Flex', type: 'flexible' }
    ],
    transactions: [
        { type: 'buy', ticker: 'SOCA', qty: 10, price: 47150, date: '2026-07-05 14:22', amount: 471500 },
        { type: 'deposit', method: 'MTN MoMo', date: '2026-07-02 09:15', amount: 500000 },
        { type: 'sell', ticker: 'SAFA', qty: 15, price: 24900, date: '2026-06-28 11:40', amount: 373500 },
        { type: 'withdraw', method: 'Orange Money', date: '2026-06-15 16:04', amount: 150000 }
    ],
    notifications: [
        { id: 1, type: 'market-alert', title: 'Détachement dividende SOCAPALM', date: 'Aujourd\'hui 10:15', body: 'L\'assemblée générale de SOCAPALM a validé un dividende brut de 2 500 FCFA par action pour l\'exercice 2025. Détachement officiel le 12 Juillet 2026.', unread: true },
        { id: 2, type: 'trade-alert', title: 'Achat automatique exécuté', date: 'Hier 14:22', body: 'Votre plan PIP a acheté automatiquement 5 unités du FCP AGIR Flex à 1 000 FCFA. Votre capital travaille.', unread: true },
        { id: 3, type: 'security-alert', title: 'Connexion Shield active', date: '06 Juil 09:30', body: 'Nouvel appareil détecté pour votre compte AGIR (IP: 197.244.180.42) à Douala, Cameroun. Authentification par empreinte sécurisée.', unread: true },
        { id: 4, type: 'market-alert', title: 'Nouvel emprunt ECMR 6.25%', date: '04 Juil 11:00', body: 'L\'État du Cameroun lance l\'emprunt ECMR 2026-2031 à 6.25% sur la BVMAC. Souscription sans frais disponible sur AGIR.', unread: false }
    ],
    securityLogs: [
        { date: '2026-07-08 12:20', event: 'Connexion authentifiée', ip: '197.244.180.42 (Mac OS X)', loc: 'Douala, Cameroun', status: 'Success' },
        { date: '2026-07-08 11:02', event: 'Négociation TLS 1.3 Shield', ip: '197.244.180.42 (AGIR App)', loc: 'Douala, Cameroun', status: 'Success' },
        { date: '2026-07-07 18:40', event: 'Vérification intégrité base de données (Chiffrement AES-256)', ip: 'Système Interne', loc: 'Serveur Cloud Douala', status: 'Success' },
        { date: '2026-07-05 14:22', event: 'Double validation OTP approuvée (Achat SOCA)', ip: '197.244.180.42 (Mobile)', loc: 'Douala, Cameroun', status: 'Success' }
    ],
    transactionPin: '0000', 
    selectedStockDetail: 'SOCA', 
    activeFrequency: 'daily',
    activeMarketCategory: 'actions', // 'actions', 'obligations', 'fcp'
    activeChartPeriod: '6M',
    investorRiskProfile: 'Non Défini'
};

// 3. UI Chart Instances
let portfolioChartInstance = null;
let allocationChartInstance = null;
let detailChartInstance = null;
let aiProjectionChartInstance = null;

// ==========================================================================
// 4. Utility Functions
// ==========================================================================
function formatXAF(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

function calculatePortfolioValue() {
    let stockValue = 0;
    appState.portfolio.forEach(holding => {
        const stockData = findAssetInDB(holding.ticker);
        if (stockData) {
            stockValue += holding.qty * stockData.price;
        }
    });
    return stockValue;
}

function calculateTotalSavings() {
    return appState.vaults.reduce((sum, v) => sum + v.balance, 0);
}

function calculateTotalAssets() {
    return appState.cashBalance + calculatePortfolioValue() + calculateTotalSavings();
}

function findAssetInDB(ticker) {
    let asset = BVMAC_STOCKS.find(s => s.ticker === ticker);
    if (!asset) asset = BVMAC_BONDS.find(b => b.ticker === ticker);
    if (!asset) asset = BVMAC_FCP.find(f => f.ticker === ticker);
    return asset;
}

function getAssetsListByCategory(category) {
    if (category === 'actions') return BVMAC_STOCKS;
    if (category === 'obligations') return BVMAC_BONDS;
    if (category === 'fcp') return BVMAC_FCP;
    return [];
}

function updateUIBalances() {
    const portfolioVal = calculatePortfolioValue();
    const cashVal = appState.cashBalance;
    const savingsVal = calculateTotalSavings();
    const totalAssets = cashVal + portfolioVal + savingsVal;

    document.getElementById('sidebar-balance').innerText = formatXAF(cashVal);
    document.getElementById('cash-value').innerText = formatXAF(cashVal);
    document.getElementById('portfolio-value').innerText = formatXAF(totalAssets);
    
    // Update Invested assets
    const investedDiv = document.getElementById('dashboard-invested-value');
    if (investedDiv) {
        investedDiv.innerText = formatXAF(portfolioVal);
    }
    
    document.getElementById('total-savings-value').innerText = formatXAF(savingsVal);
    
    const tradeCash = document.getElementById('trade-available-cash');
    if (tradeCash) {
        tradeCash.innerText = formatXAF(cashVal);
    }
}

function logSecurityEvent(event, status, location = 'Douala, Cameroun') {
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + 
                    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(now.getDate()).padStart(2, '0') + ' ' + 
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0');
    
    appState.securityLogs.unshift({
        date: dateStr,
        event: event,
        ip: '197.244.180.42 (App)',
        loc: location,
        status: status
    });
    
    if (appState.securityLogs.length > 20) appState.securityLogs.pop();
    renderSecurityLogs();
}

function triggerNotification(type, title, body) {
    const nowStr = 'Aujourd\'hui ' + String(new Date().getHours()).padStart(2, '0') + ':' + String(new Date().getMinutes()).padStart(2, '0');
    appState.notifications.unshift({
        id: appState.notifications.length + 1,
        type: type,
        title: title,
        date: nowStr,
        body: body,
        unread: true
    });
    updateNotificationsBadge();
    
    const activePane = document.querySelector('.view-pane.active');
    if (activePane && activePane.id === 'view-notifications') {
        renderNotificationsFeed();
    }
}

function updateNotificationsBadge() {
    const unreadCount = appState.notifications.filter(n => n.unread).length;
    const badge = document.getElementById('notif-count-badge');
    if (badge) {
        if (unreadCount > 0) {
            badge.innerText = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// ==========================================================================
// 5. Views & Navigation Router
// ==========================================================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
    const viewPanes = document.querySelectorAll('.view-pane');

    function routeToTarget(target) {
        // Handle views switching
        navItems.forEach(nav => nav.classList.remove('active'));
        mobileNavItems.forEach(nav => nav.classList.remove('active'));
        viewPanes.forEach(pane => pane.classList.remove('active'));

        // Activate sidebar item
        const sidebarActiveItem = document.querySelector(`.sidebar-nav .nav-item[data-target="${target}"]`);
        if (sidebarActiveItem) sidebarActiveItem.classList.add('active');

        // Activate mobile item
        const mobileActiveItem = document.querySelector(`.mobile-bottom-nav .mobile-nav-item[data-target="${target}"]`);
        if (mobileActiveItem) mobileActiveItem.classList.add('active');

        const targetPane = document.getElementById(`view-${target}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }

        // View Specifics
        if (target === 'dashboard') {
            renderDashboardCharts();
            renderDashboardMarketTable();
            renderRecentTransactions();
        } else if (target === 'market') {
            renderMarketStocksList();
            renderStockDetailPane();
        } else if (target === 'ai-analyst') {
            checkAISubscriptionState();
        } else if (target === 'savings') {
            renderSavingsVaults();
        } else if (target === 'notifications') {
            renderNotificationsFeed();
        } else if (target === 'profile') {
            renderProfileView();
        } else if (target === 'security') {
            renderSecurityLogs();
        }
    }

    // Sidebar items click
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            routeToTarget(target);
        });
    });

    // Mobile items click
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            routeToTarget(target);
        });
    });

    // Sidebar user profile card trigger
    const profileCard = document.getElementById('trigger-profile-card');
    if (profileCard) {
        profileCard.addEventListener('click', () => {
            routeToTarget('profile');
        });
    }

    // Header user profile avatar trigger
    const headerProfile = document.getElementById('header-profile-trigger');
    if (headerProfile) {
        headerProfile.addEventListener('click', () => {
            routeToTarget('profile');
        });
    }

    // Header notification bell trigger
    const notifBell = document.getElementById('header-notification-trigger');
    if (notifBell) {
        notifBell.addEventListener('click', () => {
            routeToTarget('notifications');
        });
    }

    // Header security indicator trigger
    const securityIndicator = document.querySelector('.security-status-indicator');
    if (securityIndicator) {
        securityIndicator.style.cursor = 'pointer';
        securityIndicator.addEventListener('click', () => {
            routeToTarget('security');
        });
    }

    // Special quick links & dashboard cards redirect
    const marketRedirectLink = document.getElementById('go-to-market-link');
    if (marketRedirectLink) {
        marketRedirectLink.addEventListener('click', (e) => {
            e.preventDefault();
            routeToTarget('market');
        });
    }

    const marketRedirectCard = document.getElementById('dashboard-market-redirect-card');
    if (marketRedirectCard) {
        marketRedirectCard.addEventListener('click', () => {
            routeToTarget('market');
        });
    }
}

function checkAISubscriptionState() {
    const paywall = document.getElementById('ai-paywall');
    const mainContent = document.getElementById('ai-main-content');

    if (appState.isSubscribed) {
        paywall.style.display = 'none';
        mainContent.style.display = 'block';
        
        populateAICompanySelector();
        updateAIAnalysisView();
    } else {
        paywall.style.display = 'flex';
        mainContent.style.display = 'none';
    }
}

// ==========================================================================
// 6. Tableau de bord Controllers & Periods Filters
// ==========================================================================
function renderDashboardMarketTable() {
    const tbody = document.getElementById('dashboard-market-table');
    tbody.innerHTML = '';

    // Take SOCAPALM (Actions), ECMR (Obligations) and AGIR Flex (FCP) to show diversified market overview
    const selectedOverview = [
        BVMAC_STOCKS[0], // SOCAPALM
        BVMAC_BONDS[0],  // ECMR
        BVMAC_FCP[0]     // AGIR Flex
    ];

    selectedOverview.forEach(asset => {
        const tr = document.createElement('tr');
        const changeClass = asset.change >= 0 ? 'stock-up' : 'stock-down';
        const changeSign = asset.change >= 0 ? '+' : '';
        const changeIcon = asset.change >= 0 ? 'trending-up' : 'trending-down';

        tr.innerHTML = `
            <td><span class="stock-symbol-badge">${asset.ticker}</span></td>
            <td style="font-weight:600;">${asset.name}</td>
            <td style="color:var(--text-secondary);">${asset.sector}</td>
            <td style="font-weight:700;font-family:var(--font-heading);">${formatXAF(asset.price)}</td>
            <td class="${changeClass}">
                <i data-lucide="${changeIcon}" style="width:12px;height:12px;display:inline;vertical-align:middle;margin-right:4px;"></i>
                <span style="vertical-align:middle;">${changeSign}${asset.change}%</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary btn-buy-stock" data-ticker="${asset.ticker}">Investir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    lucide.createIcons();

    tbody.querySelectorAll('.btn-buy-stock').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const ticker = btn.getAttribute('data-ticker');
            openTradeModal(ticker, 'buy');
        });
    });
}

function renderRecentTransactions() {
    const container = document.getElementById('dashboard-transactions-list');
    container.innerHTML = '';

    if (appState.transactions.length === 0) {
        container.innerHTML = '<p class="text-muted text-center" style="font-size:12px;padding:20px;">Aucune transaction récente.</p>';
        return;
    }

    const displayList = appState.transactions.slice(0, 4);

    displayList.forEach(t => {
        const item = document.createElement('div');
        item.className = 'transaction-item';

        let iconName = '';
        let iconClass = '';
        let title = '';
        let amountText = '';
        let amountClass = '';

        if (t.type === 'buy') {
            iconName = 'trending-up';
            iconClass = 'buy';
            title = `Achat ${t.qty} x ${t.ticker}`;
            amountText = `-${formatXAF(t.amount)}`;
            amountClass = 'minus';
        } else if (t.type === 'sell') {
            iconName = 'trending-down';
            iconClass = 'sell';
            title = `Vente ${t.qty} x ${t.ticker}`;
            amountText = `+${formatXAF(t.amount)}`;
            amountClass = 'plus';
        } else if (t.type === 'deposit') {
            iconName = 'download';
            iconClass = 'deposit';
            title = `Dépôt via ${t.method}`;
            amountText = `+${formatXAF(t.amount)}`;
            amountClass = 'plus';
        } else if (t.type === 'withdraw') {
            iconName = 'upload';
            iconClass = 'withdraw';
            title = `Retrait via ${t.method}`;
            amountText = `-${formatXAF(t.amount)}`;
            amountClass = 'minus';
        }

        item.innerHTML = `
            <div class="trans-icon-box ${iconClass}"><i data-lucide="${iconName}"></i></div>
            <div class="trans-details">
                <span class="trans-title">${title}</span>
                <span class="trans-date">${t.date}</span>
            </div>
            <div class="trans-amount ${amountClass}">${amountText}</div>
        `;
        container.appendChild(item);
    });

    lucide.createIcons();
}

function renderDashboardCharts() {
    const ctxLine = document.getElementById('portfolioChart').getContext('2d');
    if (portfolioChartInstance) portfolioChartInstance.destroy();
    
    const primaryGrad = ctxLine.createLinearGradient(0, 0, 0, 240);
    primaryGrad.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
    primaryGrad.addColorStop(1, 'rgba(212, 175, 55, 0.0)');

    // Period chart data switching
    let labels = [];
    let dataset = [];

    const totalAssets = calculateTotalAssets();

    if (appState.activeChartPeriod === '1M') {
        labels = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Aujourd\'hui'];
        dataset = [4750000, 4780000, 4800000, 4820000, totalAssets];
    } else if (appState.activeChartPeriod === '6M') {
        labels = ['Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
        dataset = [3600000, 3950000, 4200000, 4100000, 4500000, totalAssets];
    } else if (appState.activeChartPeriod === '1A') {
        labels = ['Juil 2025', 'Sep 2025', 'Nov 2025', 'Jan 2026', 'Mar 2026', 'Juil 2026'];
        dataset = [2500000, 2800000, 3100000, 3600000, 4200000, totalAssets];
    }

    portfolioChartInstance = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Actifs Globaux (FCFA)',
                data: dataset,
                borderColor: '#c5a028', // Gold border
                borderWidth: 3,
                backgroundColor: primaryGrad,
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: '#c5a028',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Plus Jakarta Sans', size: 10 },
                        callback: function(val) {
                            return (val / 1000000).toFixed(1) + 'M';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 10 } }
                }
            }
        }
    });

    // Donut allocation Chart
    const ctxDonut = document.getElementById('allocationChart').getContext('2d');
    if (allocationChartInstance) allocationChartInstance.destroy();

    const stockValue = calculatePortfolioValue();
    const cashValue = appState.cashBalance;
    const savingsValue = calculateTotalSavings();
    const total = stockValue + cashValue + savingsValue;

    const sharesStock = ((stockValue / total) * 100).toFixed(0);
    const sharesCash = ((cashValue / total) * 100).toFixed(0);
    const sharesSavings = ((savingsValue / total) * 100).toFixed(0);

    allocationChartInstance = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Actions', 'Liquidités XAF', 'Fonds Gérés'],
            datasets: [{
                data: [stockValue, cashValue, savingsValue],
                backgroundColor: ['#10b981', '#c5a028', '#fbbf24'], // Emerald, Gold, Warning
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            cutout: '72%'
        }
    });

    const legendList = document.getElementById('allocation-legend-list');
    legendList.innerHTML = `
        <div class="legend-item">
            <div class="legend-left">
                <span class="legend-dot" style="background-color:#10b981;"></span>
                <span class="legend-label">Actions</span>
            </div>
            <span class="legend-val">${sharesStock}% (${(stockValue / 1000).toFixed(0)}k)</span>
        </div>
        <div class="legend-item">
            <div class="legend-left">
                <span class="legend-dot" style="background-color:#c5a028;"></span>
                <span class="legend-label">Liquidités</span>
            </div>
            <span class="legend-val">${sharesCash}% (${(cashValue / 1000).toFixed(0)}k)</span>
        </div>
        <div class="legend-item">
            <div class="legend-left">
                <span class="legend-dot" style="background-color:#fbbf24;"></span>
                <span class="legend-label">Fonds Gérés</span>
            </div>
            <span class="legend-val">${sharesSavings}% (${(savingsValue / 1000).toFixed(0)}k)</span>
        </div>
    `;
}

function setupChartPeriodFilters() {
    const filters = document.querySelectorAll('.btn-filter');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            appState.activeChartPeriod = btn.getAttribute('data-period');
            renderDashboardCharts();
        });
    });
}

// ==========================================================================
// 7. Marché BVMAC (Actions / Obligations / FCP)
// ==========================================================================
function renderMarketStocksList(sectorFilter = 'all', searchQuery = '') {
    const container = document.getElementById('market-stocks-container');
    container.innerHTML = '';

    const listSource = getAssetsListByCategory(appState.activeMarketCategory);

    // Filter
    const filtered = listSource.filter(asset => {
        const matchesSector = sectorFilter === 'all' || asset.sectorKey === sectorFilter;
        const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              asset.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              asset.ticker.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSector && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div class="text-center text-muted" style="padding:40px;">Aucune valeur disponible.</div>';
        return;
    }

    filtered.forEach(asset => {
        const card = document.createElement('div');
        const isActive = appState.selectedStockDetail === asset.ticker;
        card.className = `market-stock-card ${isActive ? 'active' : ''}`;
        card.setAttribute('data-ticker', asset.ticker);

        const changeSign = asset.change >= 0 ? '+' : '';
        const changeClass = asset.change >= 0 ? 'stock-card-change up' : 'stock-card-change down';

        card.innerHTML = `
            <div class="stock-card-left">
                <span class="stock-card-symbol">${asset.name} <span style="font-size:10px;color:var(--text-muted);">(${asset.ticker})</span></span>
                <span class="stock-card-name">${asset.fullName}</span>
            </div>
            <div class="stock-card-right">
                <span class="stock-card-price">${formatXAF(asset.price)}</span>
                <span class="${changeClass}">${changeSign}${asset.change}%</span>
            </div>
        `;

        card.addEventListener('click', () => {
            appState.selectedStockDetail = asset.ticker;
            renderMarketStocksList(sectorFilter, searchQuery); // Refresh active
            renderStockDetailPane();
        });

        container.appendChild(card);
    });
}

function renderStockDetailPane() {
    const pane = document.getElementById('stock-detail-panel');
    const activeTicker = appState.selectedStockDetail;
    const asset = findAssetInDB(activeTicker);

    if (!asset) {
        pane.innerHTML = `
            <div class="detail-empty-state">
                <i data-lucide="mouse-pointer-click"></i>
                <h4>Sélectionnez une valeur</h4>
                <p>Cliquez sur l'une des valeurs listées à gauche pour afficher son graphique détaillé, ses documents et passer un ordre.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    const changeSign = asset.change >= 0 ? '+' : '';
    const changeClass = asset.change >= 0 ? 'detail-change up' : 'detail-change down';
    const changeIcon = asset.change >= 0 ? 'arrow-up-right' : 'arrow-down-right';

    // Calculate position
    const userHolding = appState.portfolio.find(p => p.ticker === asset.ticker);
    const ownedQty = userHolding ? userHolding.qty : 0;
    const ownedAvg = userHolding ? userHolding.avgBuyPrice : 0;

    let detailMetricsHtml = '';
    let tradingPanelCtaText = '';
    
    // Customize layout metrics depending on asset type
    if (appState.activeMarketCategory === 'actions') {
        tradingPanelCtaText = "Achetez ou vendez des actions";
        detailMetricsHtml = `
            <div class="detail-stat-box">
                <span class="detail-stat-label">Plus Haut (Jour)</span>
                <span class="detail-stat-value">${formatXAF(Math.round(asset.price * 1.02))}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">Plus Bas (Jour)</span>
                <span class="detail-stat-value">${formatXAF(Math.round(asset.price * 0.98))}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">Volume Journalier</span>
                <span class="detail-stat-value">1 240 Actions</span>
            </div>
        `;
    } else if (appState.activeMarketCategory === 'obligations') {
        tradingPanelCtaText = "Souscrivez à cet emprunt";
        detailMetricsHtml = `
            <div class="detail-stat-box">
                <span class="detail-stat-label">Coupon Nominal</span>
                <span class="detail-stat-value">${asset.ratios.yield.value}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">Maturité</span>
                <span class="detail-stat-value">${asset.maturity}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">Notation COSUMAF</span>
                <span class="detail-stat-value">${asset.ratios.rating.value}</span>
            </div>
        `;
    } else { // FCP
        tradingPanelCtaText = "Achetez ou rachetez des parts";
        detailMetricsHtml = `
            <div class="detail-stat-box">
                <span class="detail-stat-label">Rendement Cible</span>
                <span class="detail-stat-value" style="color:var(--secondary-glow);">${asset.ratios.yield.value}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">Risque Moyen</span>
                <span class="detail-stat-value">${asset.ratios.risk.value}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">Disponibilité</span>
                <span class="detail-stat-value">${asset.ratios.liquidity.value}</span>
            </div>
        `;
    }

    // Build documents block
    let documentsHtml = '';
    if (asset.documents && asset.documents.length > 0) {
        let docItems = '';
        asset.documents.forEach(doc => {
            docItems += `
                <a href="#" class="doc-item-link" data-doc-id="${doc.id}">
                    <i data-lucide="file-text"></i>
                    <div style="text-align:left;flex-grow:1;">
                        <div style="font-weight:600;color:var(--text-primary);">${doc.title}</div>
                        <div style="font-size:10px;color:var(--text-muted);">${doc.size}</div>
                    </div>
                    <i data-lucide="eye" style="color:var(--text-muted);width:14px;height:14px;"></i>
                </a>
            `;
        });
        
        documentsHtml = `
            <div class="documents-box">
                <h4>Documents officiels à disposition</h4>
                <div class="doc-list">
                    ${docItems}
                </div>
            </div>
        `;
    }

    pane.innerHTML = `
        <div class="detail-header">
            <div class="detail-title-area">
                <div class="detail-company-identity">
                    <h3 class="detail-company-name">${asset.fullName}</h3>
                    <span class="detail-ticker">${asset.ticker}</span>
                </div>
                <span class="detail-sector">${asset.sector} • Marché BVMAC</span>
            </div>
            <div class="detail-price-area">
                <div class="detail-price">${formatXAF(asset.price)}</div>
                <div class="${changeClass}">
                    <i data-lucide="${changeIcon}" style="width:14px;height:14px;display:inline;"></i>
                    <span>${changeSign}${asset.change}% aujourd'hui</span>
                </div>
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-left-col">
                <div class="detail-stat-row">
                    ${detailMetricsHtml}
                </div>

                <div class="chart-container" style="height: 220px;">
                    <canvas id="stockHistoryChart"></canvas>
                </div>
                
                ${documentsHtml}
            </div>

            <!-- Trading panel -->
            <div class="trading-panel">
                <div>
                    <h4 class="trading-title">Courtage AGIR Shield</h4>
                    <p class="trading-desc">${tradingPanelCtaText} instantanément en utilisant votre solde XAF.</p>
                    
                    <div class="user-position-widget" style="background:rgba(255,255,255,0.01);border:1px solid var(--border-color);border-radius:8px;padding:12px;margin-bottom:16px;">
                        <span style="font-size:10px;color:var(--text-muted);display:block;text-transform:uppercase;">Votre encours</span>
                        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;">
                            <span>Unités détenues: <strong style="color:var(--text-primary);">${ownedQty}</strong></span>
                            <span>Valeur Actuelle: <strong style="color:var(--text-gold);">${formatXAF(ownedQty * asset.price)}</strong></span>
                        </div>
                    </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:10px;">
                    <button class="btn btn-primary btn-block" id="btn-detail-buy">Investir</button>
                    <button class="btn btn-secondary btn-block" id="btn-detail-sell" ${ownedQty === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>Vendre / Retirer</button>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
    renderStockDetailChart(asset);

    // Document links simulation
    pane.querySelectorAll('.doc-item-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const docId = link.getAttribute('data-doc-id');
            openDocumentModal(asset.ticker, docId);
        });
    });

    // Trading triggers
    document.getElementById('btn-detail-buy').addEventListener('click', () => {
        openTradeModal(asset.ticker, 'buy');
    });

    const sellBtn = document.getElementById('btn-detail-sell');
    if (sellBtn && ownedQty > 0) {
        sellBtn.addEventListener('click', () => {
            openTradeModal(asset.ticker, 'sell');
        });
    }
}

function openDocumentModal(ticker, docId) {
    const asset = findAssetInDB(ticker);
    if (!asset || !asset.documents) return;
    
    const doc = asset.documents.find(d => d.id === docId);
    if (!doc) return;

    document.getElementById('document-modal-title').innerText = `Visionneuse : ${asset.name}`;
    document.getElementById('document-meta-file').innerText = `Fichier : ${doc.title}`;
    document.getElementById('document-meta-size').innerText = `Taille : ${doc.size}`;
    
    document.getElementById('document-preview-title').innerText = doc.title.replace('.pdf', '');
    document.getElementById('document-preview-text').innerText = doc.text;

    const modal = document.getElementById('document-modal');
    modal.classList.add('active');

    // Download simulated action
    const dlBtn = document.getElementById('btn-download-document-action');
    
    // Remove old listeners by cloning
    const newDlBtn = dlBtn.cloneNode(true);
    dlBtn.parentNode.replaceChild(newDlBtn, dlBtn);
    
    newDlBtn.addEventListener('click', () => {
        alert(`Téléchargement du fichier "${doc.title}" initié.\nCe document a été crypté par AGIR Shield.`);
        modal.classList.remove('active');
        logSecurityEvent(`Téléchargement de document: ${doc.title}`, 'Success');
    });
}

function setupMarketInteractions() {
    const searchInput = document.getElementById('market-search-input');
    const sectorFilters = document.querySelectorAll('.btn-market-filter');
    const categoryTabs = document.querySelectorAll('.category-tab-btn');
    
    let activeSector = 'all';
    let currentQuery = '';

    // Handle Actions / Obligations / FCP tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            appState.activeMarketCategory = tab.getAttribute('data-category');
            
            // Adjust sector filters visibility depending on tab
            const filtersBox = document.getElementById('market-sector-filters-container');
            if (appState.activeMarketCategory === 'actions') {
                filtersBox.style.display = 'flex';
            } else {
                filtersBox.style.display = 'none';
            }
            
            // Select default selected stock to avoid UI breaks
            const sourceList = getAssetsListByCategory(appState.activeMarketCategory);
            appState.selectedStockDetail = sourceList.length > 0 ? sourceList[0].ticker : null;
            
            activeSector = 'all';
            sectorFilters.forEach(f => f.classList.remove('active'));
            document.querySelector('.btn-market-filter[data-sector="all"]').classList.add('active');
            
            renderMarketStocksList('all', currentQuery);
            renderStockDetailPane();
        });
    });

    sectorFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            sectorFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeSector = btn.getAttribute('data-sector');
            renderMarketStocksList(activeSector, currentQuery);
        });
    });

    searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value;
        renderMarketStocksList(activeSector, currentQuery);
    });
}

// ==========================================================================
// 8. Outil Analyse IA Controllers
// ==========================================================================
function populateAICompanySelector() {
    const select = document.getElementById('ai-company-select');
    select.innerHTML = '';

    // Load Actions
    const groupActions = document.createElement('optgroup');
    groupActions.label = 'Actions';
    BVMAC_STOCKS.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock.ticker;
        option.innerText = `${stock.name} (${stock.ticker})`;
        groupActions.appendChild(option);
    });
    select.appendChild(groupActions);

    // Load FCP
    const groupFCP = document.createElement('optgroup');
    groupFCP.label = 'Fonds Gérés';
    BVMAC_FCP.forEach(fcp => {
        const option = document.createElement('option');
        option.value = fcp.ticker;
        option.innerText = `${fcp.name} (Fonds Gérés - ${fcp.ratios.yield.value})`;
        groupFCP.appendChild(option);
    });
    select.appendChild(groupFCP);

    // Load Bonds
    const groupBonds = document.createElement('optgroup');
    groupBonds.label = 'Obligations d\'État';
    BVMAC_BONDS.forEach(bond => {
        const option = document.createElement('option');
        option.value = bond.ticker;
        option.innerText = `${bond.name} (${bond.ratios.yield.value})`;
        groupBonds.appendChild(option);
    });
    select.appendChild(groupBonds);

    select.addEventListener('change', () => {
        updateAIAnalysisView();
    });
}

function updateAIAnalysisView() {
    const select = document.getElementById('ai-company-select');
    const activeTicker = select.value || 'SOCA';
    const asset = findAssetInDB(activeTicker);

    if (!asset) return;

    const recBadge = document.getElementById('ai-rec-badge');
    recBadge.innerText = asset.aiOpinion.rec;
    recBadge.className = 'rec-badge';
    if (asset.aiOpinion.rec === 'ACHETER') recBadge.classList.add('buy');
    else if (asset.aiOpinion.rec === 'CONSERVER') recBadge.classList.add('hold');
    else if (asset.aiOpinion.rec === 'VENDRE') recBadge.classList.add('sell');

    document.getElementById('ai-confidence-bar').style.width = `${asset.aiOpinion.confidence}%`;
    document.getElementById('ai-confidence-value').innerText = `${asset.aiOpinion.confidence}%`;
    document.getElementById('ai-narrative-text').innerText = asset.aiOpinion.narrative;

    const strengthsUl = document.getElementById('ai-strengths-list');
    strengthsUl.innerHTML = '';
    asset.aiOpinion.strengths.forEach(str => {
        const li = document.createElement('li');
        li.innerText = str;
        strengthsUl.appendChild(li);
    });

    const risksUl = document.getElementById('ai-risks-list');
    risksUl.innerHTML = '';
    asset.aiOpinion.risks.forEach(risk => {
        const li = document.createElement('li');
        li.innerText = risk;
        risksUl.appendChild(li);
    });

    const ratiosContainer = document.getElementById('ai-ratios-list');
    ratiosContainer.innerHTML = '';

    Object.keys(asset.ratios).forEach(key => {
        const ratio = asset.ratios[key];
        const item = document.createElement('div');
        item.className = 'ratio-item';
        item.innerHTML = `
            <div class="ratio-name-group">
                <span class="ratio-label">${ratio.label}</span>
                <span class="ratio-desc">${ratio.desc}</span>
            </div>
            <span class="ratio-value-badge ${ratio.status}">${ratio.value}</span>
        `;
        ratiosContainer.appendChild(item);
    });

    renderAIProjectionChart(asset);
}

// ==========================================================================
// 9. Plans Programmés (PIP) Controllers
// ==========================================================================
function renderSavingsVaults() {
    const container = document.getElementById('active-vaults-container');
    container.innerHTML = '';

    appState.vaults.forEach(vault => {
        const card = document.createElement('div');
        card.className = 'vault-card glass-card';

        const percent = ((vault.balance / vault.target) * 100).toFixed(0);
        const isLocked = vault.type === 'locked';
        const statusLabel = isLocked ? 'Bloqué' : 'Flexible';
        const statusClass = isLocked ? 'locked' : 'flexible';

        card.innerHTML = `
            <div class="vault-card-header">
                <div class="vault-card-icon"><i data-lucide="repeat"></i></div>
                <span class="vault-status-indicator ${statusClass}">${statusLabel}</span>
            </div>
            <div class="vault-info-middle">
                <h4 class="vault-name">${vault.name}</h4>
                <span class="vault-saving-target">Cible: ${formatXAF(vault.target)} (${percent}%)</span>
                
                <div class="progress-bar-bg" style="height:4px; margin-top:8px;">
                    <div class="progress-bar-fill" style="width: ${percent}%; background-color:var(--primary);"></div>
                </div>
            </div>
            <div class="vault-card-footer">
                <div class="vault-balance-stack">
                    <span class="vault-bal-label">Solde Alloué</span>
                    <span class="vault-bal-val">${formatXAF(vault.balance)}</span>
                </div>
                <span class="vault-yield-tag">${vault.rate} Rendement</span>
            </div>
        `;
        container.appendChild(card);
    });

    lucide.createIcons();
}

function setupSavingsInteractions() {
    const freqBtns = document.querySelectorAll('.segment-btn[data-freq]');
    freqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            freqBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.activeFrequency = btn.getAttribute('data-freq');
        });
    });

    // Save AutoSave configuration
    const saveBtn = document.getElementById('btn-save-autosave-settings');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const amount = parseInt(document.getElementById('autosave-amount').value) || 0;
            const targetTicker = document.getElementById('autosave-target-asset').value;
            const assetData = findAssetInDB(targetTicker);
            const pinVal = document.getElementById('autosave-pin').value;

            if (pinVal !== appState.transactionPin) {
                alert("Sécurité Shield : Code PIN incorrect.");
                return;
            }

            if (amount < 1000) {
                alert("Le montant minimum d'investissement automatique est de 1 000 FCFA.");
                return;
            }

            logSecurityEvent(`Plan PIP activé (${amount} FCFA vers ${assetData.name})`, 'Success');
            triggerNotification('trade-alert', 'Plan PIP activé', `Un prélèvement périodique de ${formatXAF(amount)} a été configuré avec succès vers ${assetData.fullName}.`);
            alert(`Votre Plan d'Investissement Programmé (PIP) a été configuré avec succès !\nMontant : ${formatXAF(amount)}\nCible : ${assetData.name}\nFréquence : ${appState.activeFrequency}.`);
        });
    }

    // Create New PIP Plan
    const createVaultBtn = document.getElementById('btn-create-vault');
    if (createVaultBtn) {
        createVaultBtn.addEventListener('click', () => {
            const name = prompt("Entrez le nom de ce plan PIP (ex: Projet Auto) :");
            if (!name) return;
            const target = parseInt(prompt("Entrez l'objectif financier total (FCFA) :")) || 500000;
            
            const targetAssetRaw = prompt("Saisissez le ticker de l'actif cible (AGFL, AGOB, ECMR) :");
            if (!targetAssetRaw) return;
            const targetAsset = targetAssetRaw.toUpperCase();
            const asset = findAssetInDB(targetAsset) || BVMAC_FCP[0];
            
            appState.vaults.push({
                id: 'v' + (appState.vaults.length + 1),
                name: name,
                balance: 0,
                target: target,
                rate: asset.ratios.yield ? asset.ratios.yield.value : '6.0%',
                asset: asset.fullName,
                type: 'flexible'
            });

            logSecurityEvent(`Plan PIP créé: ${name}`, 'Success');
            renderSavingsVaults();
            updateUIBalances();
            renderDashboardCharts(); // Redraw donut allocation
        });
    }
}

// ==========================================================================
// 10. Mon Profil & Investor Quiz [NEW]
// ==========================================================================
function renderProfileView() {
    // Dynamic risk profile check
    const riskBadge = document.getElementById('investor-risk-badge');
    riskBadge.innerText = appState.investorRiskProfile;
    riskBadge.className = 'badge-tag'; // reset
    if (appState.investorRiskProfile === 'PRUDENT') riskBadge.classList.add('prudent');
    else if (appState.investorRiskProfile === 'ÉQUILIBRÉ') riskBadge.classList.add('equilibre');
    else if (appState.investorRiskProfile === 'DYNAMIQUE') riskBadge.classList.add('dynamique');

    // Update premium badge status
    const subBadge = document.getElementById('profile-sub-badge');
    if (appState.isSubscribed) {
        subBadge.innerText = "Compte PRO AI";
        subBadge.className = "subscription-badge pro";
    } else {
        subBadge.innerText = "Standard (Gratuit)";
        subBadge.className = "subscription-badge free";
    }
}

function setupInvestorQuiz() {
    const calculateBtn = document.getElementById('btn-calculate-risk-profile');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const q1Val = parseInt(document.querySelector('input[name="q1"]:checked').value);
        const q2Val = parseInt(document.querySelector('input[name="q2"]:checked').value);
        const q3Val = parseInt(document.querySelector('input[name="q3"]:checked').value);

        const totalScore = q1Val + q2Val + q3Val;
        
        let profile = '';
        let desc = '';
        let linksHtml = '';

        if (totalScore <= 4) {
            profile = 'PRUDENT';
            desc = 'Vous privilégiez la protection de votre capital et la stabilité. Les fluctuations vous rendent mal à l\'aise.';
            linksHtml = `
                <a href="#" class="recommend-link link-redirect-market" data-ticker="ECMR">ECMR 6.25% (Obligation)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="AGFL">AGIR Flex (FCP Liquide - 5.8%)</a>
            `;
        } else if (totalScore <= 7) {
            profile = 'ÉQUILIBRÉ';
            desc = 'Vous recherchez un juste milieu entre croissance à moyen terme et volatilité modérée.';
            linksHtml = `
                <a href="#" class="recommend-link link-redirect-market" data-ticker="AGTE">AGIR Team (FCP - 7.2%)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="EOTG">EOTG 6.5% (Obligation)</a>
            `;
        } else {
            profile = 'DYNAMIQUE';
            desc = 'Vous recherchez une performance élevée et comprenez les cycles financiers. Les actions et les FCP diversifiés sont faits pour vous.';
            linksHtml = `
                <a href="#" class="recommend-link link-redirect-market" data-ticker="BANG">BANGE (Banque - P/E 8.2x)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="SOCA">SOCAPALM (Agro - Yield 7.8%)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="AGOB">AGIR Objectif (FCP Actions - 8.5%)</a>
            `;
        }

        appState.investorRiskProfile = profile;
        
        // Show result box
        document.getElementById('result-profile-title').innerText = `Profil Déterminé : ${profile}`;
        document.getElementById('result-profile-desc').innerText = desc;
        
        const linksBox = document.getElementById('result-recommended-assets');
        linksBox.innerHTML = linksHtml;
        document.getElementById('quiz-result-display').style.display = 'block';

        // Update profile header badge
        renderProfileView();

        // Log audit event
        logSecurityEvent(`Calcul profil d'investisseur: ${profile}`, 'Success');
        triggerNotification('market-alert', 'Profil investisseur mis à jour', `Votre questionnaire a classifié votre profil en : ${profile}. Vos recommandations ont été recalibrées.`);

        // Attach click handlers to recommendations links
        linksBox.querySelectorAll('.link-redirect-market').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const ticker = link.getAttribute('data-ticker');
                
                // Determine target tab in market depending on asset
                const targetAsset = findAssetInDB(ticker);
                if (targetAsset) {
                    if (targetAsset.sectorKey === 'sovereign') appState.activeMarketCategory = 'obligations';
                    else if (targetAsset.sectorKey === 'fcp-agir') appState.activeMarketCategory = 'fcp';
                    else appState.activeMarketCategory = 'actions';
                }
                
                appState.selectedStockDetail = ticker;

                // Route to market view
                document.querySelector('.sidebar-nav .nav-item[data-target="market"]').click();
            });
        });
    });
}

// ==========================================================================
// 11. Notifications View Controllers [NEW]
// ==========================================================================
function renderNotificationsFeed() {
    const container = document.getElementById('notifications-feed-list');
    if (!container) return;

    container.innerHTML = '';

    if (appState.notifications.length === 0) {
        container.innerHTML = '<p class="text-muted text-center" style="font-size:12px;padding:40px;">Aucune notification reçue.</p>';
        return;
    }

    appState.notifications.forEach(n => {
        const item = document.createElement('div');
        const unreadClass = n.unread ? 'unread' : '';
        item.className = `notification-item-card ${unreadClass}`;

        let iconName = 'bell';
        let classColor = 'market-alert';

        if (n.type === 'trade-alert') {
            iconName = 'repeat';
            classColor = 'trade-alert';
        } else if (n.type === 'security-alert') {
            iconName = 'shield-alert';
            classColor = 'security-alert';
        }

        item.innerHTML = `
            <div class="notif-icon-wrapper ${classColor}"><i data-lucide="${iconName}"></i></div>
            <div class="notif-content-area">
                <div class="notif-header-line">
                    <span class="notif-title">${n.title}</span>
                    <span class="notif-time">${n.date}</span>
                </div>
                <p class="notif-body">${n.body}</p>
            </div>
        `;
        container.appendChild(item);
    });

    lucide.createIcons();
}

function setupNotificationsInteractions() {
    const clearBtn = document.getElementById('btn-clear-notifications');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            appState.notifications.forEach(n => n.unread = false);
            updateNotificationsBadge();
            renderNotificationsFeed();
            logSecurityEvent("Notifications marquées comme lues", "Success");
        });
    }
}

// ==========================================================================
// 12. Transaction Pin, Charts Setup & Modals
// ==========================================================================
function renderSecurityLogs() {
    const tbody = document.getElementById('security-audit-logs');
    if (!tbody) return;
    tbody.innerHTML = '';

    appState.securityLogs.forEach(log => {
        const tr = document.createElement('tr');
        let statusBadge = log.status === 'Success' ? 
            '<span class="subscription-badge pro" style="font-size:9px;box-shadow:none;">Sécurisé</span>' : 
            '<span class="subscription-badge free" style="font-size:9px;background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#f87171;">Alerte</span>';

        tr.innerHTML = `
            <td>${log.date}</td>
            <td style="font-weight:600;"><i data-lucide="shield" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:6px;color:var(--primary);"></i>${log.event}</td>
            <td style="color:var(--text-secondary);font-family:monospace;font-size:11px;">${log.ip}</td>
            <td>${log.loc}</td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(tr);
    });
    lucide.createIcons();
}

function setupSecurityInteractions() {
    const savePinBtn = document.getElementById('btn-save-security-pin');
    if (savePinBtn) {
        savePinBtn.addEventListener('click', () => {
            const inputVal = document.getElementById('security-pin').value;
            if (inputVal.length === 4 && /^\d+$/.test(inputVal)) {
                appState.transactionPin = inputVal;
                document.getElementById('security-pin').value = '';
                logSecurityEvent("PIN de transaction mis à jour", "Success");
                alert("Votre PIN de transaction a été mis à jour avec succès.");
            } else {
                alert("Erreur: Le code PIN doit être composé d'exactement 4 chiffres.");
            }
        });
    }

    const refreshLogsBtn = document.getElementById('btn-refresh-audit-logs');
    if (refreshLogsBtn) {
        refreshLogsBtn.addEventListener('click', () => {
            logSecurityEvent("Audit Shield rafraîchi", "Success");
            renderSecurityLogs();
        });
    }
}

// Chart Renderings
function renderStockDetailChart(asset) {
    const ctx = document.getElementById('stockHistoryChart').getContext('2d');
    if (detailChartInstance) detailChartInstance.destroy();

    const isUp = asset.change >= 0;
    const borderCol = isUp ? '#10b981' : '#ef4444';
    const grad = ctx.createLinearGradient(0, 0, 0, 240);
    grad.addColorStop(0, isUp ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    detailChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Aujourd\'hui'],
            datasets: [{
                data: asset.history,
                borderColor: borderCol,
                borderWidth: 2.5,
                backgroundColor: grad,
                fill: true,
                tension: 0.2,
                pointRadius: 3,
                pointBackgroundColor: borderCol
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 9 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 9 } }
                }
            }
        }
    });
}

function renderAIProjectionChart(asset) {
    const ctx = document.getElementById('aiProjectionChart').getContext('2d');
    if (aiProjectionChartInstance) aiProjectionChartInstance.destroy();

    const primaryGrad = ctx.createLinearGradient(0, 0, 0, 280);
    primaryGrad.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
    primaryGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

    aiProjectionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2026 (Actuel)', '2027 Proj', '2028 Proj', '2029 Proj', '2030 Proj'],
            datasets: [{
                label: `Cours ${asset.name} (FCFA)`,
                data: asset.projections,
                borderColor: '#c5a028',
                borderWidth: 3,
                backgroundColor: primaryGrad,
                fill: true,
                tension: 0.25,
                pointRadius: 4,
                pointBackgroundColor: '#c5a028'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Plus Jakarta Sans', size: 9 },
                        callback: function(val) {
                            return formatXAF(val);
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 10 } }
                }
            }
        }
    });
}

// Modals setup
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function setupModalClosers() {
    const closeBtns = document.querySelectorAll('.btn-close-modal');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const openModal = btn.closest('.modal-backdrop');
            if (openModal) {
                openModal.classList.remove('active');
                if (openModal.id === 'subscription-checkout-modal') resetCheckoutScreen();
            }
        });
    });

    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(bg => {
        bg.addEventListener('click', (e) => {
            if (e.target === bg) {
                bg.classList.remove('active');
                if (bg.id === 'subscription-checkout-modal') resetCheckoutScreen();
            }
        });
    });
}

function setupCashModal() {
    const triggersDeposit = document.querySelectorAll('.btn-deposit-trigger');
    const triggersWithdraw = document.querySelectorAll('.btn-withdraw-trigger');
    let activeCashType = 'deposit';

    triggersDeposit.forEach(btn => {
        btn.addEventListener('click', () => {
            activeCashType = 'deposit';
            document.getElementById('cash-modal-title').innerText = "Déposer des fonds";
            document.getElementById('btn-submit-cash-action').innerText = "Confirmer le dépôt";
            openModal('cash-modal');
        });
    });

    triggersWithdraw.forEach(btn => {
        btn.addEventListener('click', () => {
            activeCashType = 'withdraw';
            document.getElementById('cash-modal-title').innerText = "Retirer des fonds";
            document.getElementById('btn-submit-cash-action').innerText = "Confirmer le retrait";
            openModal('cash-modal');
        });
    });

    const methodCards = document.querySelectorAll('.payment-method-card');
    const phoneField = document.getElementById('phone-number-field');
    const phoneInput = document.getElementById('cash-modal-phone');

    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            methodCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const method = card.getAttribute('data-method');
            if (method === 'card') {
                phoneField.style.display = 'none';
            } else {
                phoneField.style.display = 'flex';
                phoneInput.placeholder = method === 'momo' ? '67X XXX XXX' : '65X XXX XXX';
            }
        });
    });

    // FX rates database inside client
    const clientRates = {
        'XAF': { rate: 1.0, flag: '🇨🇲', name: 'Franc CFA (CEMAC)' },
        'EUR': { rate: 655.9570, flag: '🇪🇺', name: 'Euro' },
        'USD': { rate: 605.5000, flag: '🇺🇸', name: 'Dollar Américain' },
        'NGN': { rate: 0.4000, flag: '🇳🇬', name: 'Naira Nigérian' },
        'ZAR': { rate: 32.5000, flag: '🇿🇦', name: 'Rand Sud-Africain' },
        'KES': { rate: 4.7000, flag: '🇰🇪', name: 'Shilling Kenyan' }
    };

    const currencySelect = document.getElementById('cash-modal-currency');
    const fxRateDisplay = document.getElementById('cash-modal-fx-display');
    const conversionBox = document.getElementById('cash-modal-conversion-box');
    const amountLabel = document.getElementById('amount-input-label');
    const amountSuffix = document.getElementById('cash-modal-suffix');
    const phoneField = document.getElementById('phone-number-field');
    const cardField = document.getElementById('card-form-field');
    const amountInput = document.getElementById('cash-modal-amount');
    const pinField = document.getElementById('cash-modal-pin');

    function updateFXDepositMetrics() {
        if (!currencySelect || !amountInput) return;
        
        const currency = currencySelect.value;
        const rateInfo = clientRates[currency];
        if (!rateInfo) return;

        const rate = rateInfo.rate;
        const amount = parseFloat(amountInput.value) || 0;

        if (currency === 'XAF') {
            if (fxRateDisplay) fxRateDisplay.style.display = 'none';
            if (conversionBox) conversionBox.style.display = 'none';
            if (phoneField) phoneField.style.display = 'block';
            if (cardField) cardField.style.display = 'none';
            if (amountLabel) amountLabel.innerText = "Montant (XAF)";
            if (amountSuffix) amountSuffix.innerText = "FCFA";
        } else {
            if (fxRateDisplay) {
                fxRateDisplay.style.display = 'block';
                fxRateDisplay.innerText = `1 ${currency} = ${rate.toFixed(2)} FCFA (Taux en direct)`;
            }
            if (conversionBox) conversionBox.style.display = 'block';
            if (phoneField) phoneField.style.display = 'none';
            if (cardField) cardField.style.display = 'block';
            if (amountLabel) amountLabel.innerText = `Montant (${currency})`;
            if (amountSuffix) amountSuffix.innerText = currency;

            const totalXaf = amount * rate;
            const fees = Math.round(totalXaf * 0.005); // 0.5% FX Fee
            const netXaf = totalXaf - fees;

            const creditedText = document.getElementById('cash-modal-credited-display');
            if (creditedText) creditedText.innerText = formatXAF(netXaf);
            const feesText = document.getElementById('cash-modal-fees-display');
            if (feesText) feesText.innerText = formatXAF(fees);
        }
    }

    if (currencySelect) {
        currencySelect.addEventListener('change', updateFXDepositMetrics);
    }
    if (amountInput) {
        amountInput.addEventListener('input', updateFXDepositMetrics);
    }

    const submitBtn = document.getElementById('btn-submit-cash-action');
    submitBtn.addEventListener('click', () => {
        const currency = currencySelect ? currencySelect.value : 'XAF';
        const rateInfo = clientRates[currency];
        const rate = rateInfo ? rateInfo.rate : 1.0;
        const amountLocal = parseFloat(amountInput.value) || 0;
        
        const pin = pinField ? pinField.value : '';
        if (pin !== '0000') {
            alert("Sécurité Shield: Code PIN de transaction incorrect.");
            return;
        }

        if (amountLocal <= 0) {
            alert("Erreur: Veuillez saisir un montant supérieur à 0.");
            return;
        }

        const amountXaf = amountLocal * rate;
        const feesXaf = currency === 'XAF' ? 0 : Math.round(amountXaf * 0.005);
        const netCreditedXaf = amountXaf - feesXaf;

        // Route Payment Gateway description
        let gateway = 'GIMAC / CinetPay';
        if (currency !== 'XAF') {
            gateway = (currency === 'USD' || currency === 'EUR') ? 'Stripe Gateway' : 'Flutterwave Hub';
        }

        if (activeCashType === 'deposit') {
            appState.cashBalance += netCreditedXaf;
            appState.transactions.unshift({
                type: 'deposit',
                method: gateway,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                amount: netCreditedXaf
            });
            logSecurityEvent(`Dépôt de ${amountLocal} ${currency} (${formatXAF(netCreditedXaf)} net) via ${gateway}`, "Success");
            triggerNotification('trade-alert', 'Dépôt validé', `Votre recharge de ${amountLocal} ${currency} a été créditée en ${formatXAF(netCreditedXaf)} via ${gateway}.`);
            alert(`Dépôt réussi !\nVotre solde a été crédité de ${formatXAF(netCreditedXaf)}.`);
        } else {
            if (appState.cashBalance < amountXaf) {
                alert("Solde insuffisant.");
                return;
            }
            appState.cashBalance -= amountXaf;
            appState.transactions.unshift({
                type: 'withdraw',
                method: gateway,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                amount: amountXaf
            });
            logSecurityEvent(`Retrait de ${amountLocal} ${currency} (${formatXAF(amountXaf)}) vers ${gateway}`, "Success");
            triggerNotification('trade-alert', 'Retrait validé', `Un retrait de ${amountLocal} ${currency} (${formatXAF(amountXaf)}) a été débité vers ${gateway}.`);
            alert(`Retrait réussi !\nUn montant de ${formatXAF(amountXaf)} a été débité.`);
        }

        closeModal('cash-modal');
        updateUIBalances();
        renderRecentTransactions();
        renderDashboardCharts();
    });
}

// Broker Trading Modal (Buy / Sell Assets)
let activeTradeType = 'buy';
let activeTradeTicker = 'SOCA';

function openTradeModal(ticker, type) {
    const asset = findAssetInDB(ticker);
    if (!asset) return;

    activeTradeTicker = ticker;
    activeTradeType = type;

    document.getElementById('trade-company-name').innerText = asset.fullName;
    document.getElementById('trade-company-ticker').innerText = asset.ticker;
    document.getElementById('trade-company-sector').innerText = asset.sector;
    document.getElementById('trade-current-price').innerText = formatXAF(asset.price);
    document.getElementById('trade-pin').value = '';

    const buyBtn = document.getElementById('trade-type-buy');
    const sellBtn = document.getElementById('trade-type-sell');
    const submitBtn = document.getElementById('btn-submit-trade');
    const feesRow = document.getElementById('trade-brokerage-fees-row');

    // Remove fees visualizer if Bond/FCP (since they are direct deposits/mutual holdings on AGIR)
    const isAction = BVMAC_STOCKS.some(s => s.ticker === ticker);
    if (isAction) {
        feesRow.style.display = 'flex';
        document.getElementById('trade-qty-label').innerText = "Nombre d'actions";
    } else {
        feesRow.style.display = 'none';
        document.getElementById('trade-qty-label').innerText = "Nombre d'unités / Parts";
    }

    if (type === 'buy') {
        buyBtn.classList.add('active');
        sellBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Souscription / Achat d'actifs";
        submitBtn.innerText = "Confirmer l'investissement";
        document.getElementById('trade-total-label').innerText = "Montant Total Estimé";
    } else {
        sellBtn.classList.add('active');
        buyBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Vente / Retrait d'actifs";
        submitBtn.innerText = "Confirmer la cession";
        document.getElementById('trade-total-label').innerText = "Crédit Estimé (net de frais)";
    }

    updateTradeCalculations();
    openModal('trade-modal');
}

function updateTradeCalculations() {
    const asset = findAssetInDB(activeTradeTicker);
    if (!asset) return;

    const qtyInput = document.getElementById('trade-quantity');
    let qty = parseInt(qtyInput.value) || 0;
    if (qty < 1) {
        qty = 1;
        qtyInput.value = 1;
    }

    const subtotal = qty * asset.price;
    
    // Brokerage fee only on actions
    const isAction = BVMAC_STOCKS.some(s => s.ticker === activeTradeTicker);
    const fees = isAction ? Math.round(subtotal * 0.005) : 0;
    
    const total = activeTradeType === 'buy' ? (subtotal + fees) : (subtotal - fees);

    document.getElementById('trade-subtotal').innerText = formatXAF(subtotal);
    document.getElementById('trade-fees').innerText = formatXAF(fees);
    document.getElementById('trade-total').innerText = formatXAF(total);

    // Multi-currency FX conversion calculations inside Trade modal
    const currencySelect = document.getElementById('trade-currency');
    const fxRateDisplay = document.getElementById('trade-fx-rate-display');
    const localCostRow = document.getElementById('trade-local-cost-row');
    const localCostValue = document.getElementById('trade-local-cost-value');

    const rates = {
        'XAF': 1.0,
        'EUR': 655.9570,
        'USD': 605.5000,
        'NGN': 0.4000,
        'ZAR': 32.5000,
        'KES': 4.7000
    };

    if (currencySelect && fxRateDisplay && localCostRow && localCostValue) {
        const currency = currencySelect.value;
        const rate = rates[currency] || 1.0;

        if (currency === 'XAF') {
            fxRateDisplay.style.display = 'none';
            localCostRow.style.display = 'none';
        } else {
            fxRateDisplay.style.display = 'block';
            fxRateDisplay.innerText = `1 ${currency} = ${rate.toFixed(2)} FCFA (Taux BVMAC Bloqué)`;
            localCostRow.style.display = 'flex';
            
            const costLocal = total / rate;
            localCostValue.innerText = `${costLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${currency}`;
        }
    }
}

function setupTradeModal() {
    const qtyInput = document.getElementById('trade-quantity');
    qtyInput.addEventListener('input', updateTradeCalculations);

    const currencySelect = document.getElementById('trade-currency');
    if (currencySelect) {
        currencySelect.addEventListener('change', updateTradeCalculations);
    }

    const buyBtn = document.getElementById('trade-type-buy');
    const sellBtn = document.getElementById('trade-type-sell');

    buyBtn.addEventListener('click', () => {
        activeTradeType = 'buy';
        buyBtn.classList.add('active');
        sellBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Souscription / Achat d'actifs";
        document.getElementById('btn-submit-trade').innerText = "Confirmer l'investissement";
        document.getElementById('trade-total-label').innerText = "Montant Total Estimé";
        updateTradeCalculations();
    });

    sellBtn.addEventListener('click', () => {
        const holding = appState.portfolio.find(p => p.ticker === activeTradeTicker);
        if (!holding || holding.qty <= 0) {
            alert("Erreur: Vous ne détenez pas cet actif.");
            return;
        }
        
        activeTradeType = 'sell';
        sellBtn.classList.add('active');
        buyBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Vente / Retrait d'actifs";
        document.getElementById('btn-submit-trade').innerText = "Confirmer la cession";
        document.getElementById('trade-total-label').innerText = "Crédit Estimé (net de frais)";
        updateTradeCalculations();
    });

    const submitBtn = document.getElementById('btn-submit-trade');
    submitBtn.addEventListener('click', () => {
        const asset = findAssetInDB(activeTradeTicker);
        const qty = parseInt(document.getElementById('trade-quantity').value) || 0;
        const subtotal = qty * asset.price;
        
        const isAction = BVMAC_STOCKS.some(s => s.ticker === activeTradeTicker);
        const fees = isAction ? Math.round(subtotal * 0.005) : 0;
        const total = activeTradeType === 'buy' ? (subtotal + fees) : (subtotal - fees);
        
        const pin = document.getElementById('trade-pin').value;
        const currency = currencySelect ? currencySelect.value : 'XAF';
        const rates = {
            'XAF': 1.0,
            'EUR': 655.9570,
            'USD': 605.5000,
            'NGN': 0.4000,
            'ZAR': 32.5000,
            'KES': 4.7000
        };
        const rate = rates[currency] || 1.0;
        const costLocal = total / rate;

        if (pin !== appState.transactionPin) {
            logSecurityEvent(`Échec d'ordre: PIN incorrect`, "Failure");
            alert("Sécurité Shield : Code PIN incorrect.");
            return;
        }

        if (activeTradeType === 'buy') {
            if (appState.cashBalance < total) {
                alert("Fonds insuffisants.");
                return;
            }

            appState.cashBalance -= total;

            const holdingIndex = appState.portfolio.findIndex(p => p.ticker === asset.ticker);
            if (holdingIndex >= 0) {
                const existing = appState.portfolio[holdingIndex];
                const totalCost = (existing.qty * existing.avgBuyPrice) + subtotal;
                existing.qty += qty;
                existing.avgBuyPrice = Math.round(totalCost / existing.qty);
            } else {
                appState.portfolio.push({
                    ticker: asset.ticker,
                    qty: qty,
                    avgBuyPrice: asset.price
                });
            }

            appState.transactions.unshift({
                type: 'buy',
                ticker: asset.ticker,
                qty: qty,
                price: asset.price,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                amount: total
            });

            logSecurityEvent(`Achat actif: ${qty} ${asset.ticker} pour ${costLocal.toFixed(2)} ${currency} (Taux: ${rate.toFixed(4)})`, "Success");
            triggerNotification('trade-alert', 'Investissement validé', `Votre souscription pour ${qty} unités de ${asset.name} a été enregistrée.`);
            alert(`Investissement exécuté avec succès !\nMontant débité : ${costLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${currency} (équivalent ${formatXAF(total)}).\nVous détenez désormais des parts de ${asset.fullName}.`);

        } else {
            const holdingIndex = appState.portfolio.findIndex(p => p.ticker === asset.ticker);
            if (holdingIndex < 0 || appState.portfolio[holdingIndex].qty < qty) {
                alert("Erreur: Encours insuffisant.");
                return;
            }

            appState.cashBalance += total;
            appState.portfolio[holdingIndex].qty -= qty;
            if (appState.portfolio[holdingIndex].qty === 0) {
                appState.portfolio.splice(holdingIndex, 1);
            }

            appState.transactions.unshift({
                type: 'sell',
                ticker: asset.ticker,
                qty: qty,
                price: asset.price,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                amount: total
            });

            logSecurityEvent(`Cession actif: ${qty} ${asset.ticker} pour ${costLocal.toFixed(2)} ${currency} (Taux: ${rate.toFixed(4)})`, "Success");
            triggerNotification('trade-alert', 'Retrait / Vente validé', `La revente de ${qty} unités de ${asset.name} a été exécutée. Votre solde a été crédité.`);
            alert(`Ordre de cession exécuté !\nVos liquidités ont été créditées de ${formatXAF(total)} (soit ${costLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${currency}).`);
        }

        closeModal('trade-modal');
        updateUIBalances();
        renderRecentTransactions();
        
        const activePane = document.querySelector('.view-pane.active');
        if (activePane.id === 'view-dashboard') {
            renderDashboardCharts();
            renderDashboardMarketTable();
        } else if (activePane.id === 'view-market') {
            renderStockDetailPane();
            renderMarketStocksList();
        }
    });
}

// Checkout Modal
function setupSubscriptionCheckout() {
    const triggerBtn = document.querySelector('.btn-subscribe-now');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
            openModal('subscription-checkout-modal');
        });
    }

    const mtnCard = document.querySelector('[data-checkout-momo="momo"]');
    const omCard = document.querySelector('[data-checkout-momo="om"]');
    let chosenMomo = 'momo';

    mtnCard.addEventListener('click', () => {
        mtnCard.classList.add('active');
        omCard.classList.remove('active');
        chosenMomo = 'momo';
    });

    omCard.addEventListener('click', () => {
        omCard.classList.add('active');
        mtnCard.classList.remove('active');
        chosenMomo = 'om';
    });

    const payBtn = document.getElementById('btn-pay-now');
    const processingScreen = document.getElementById('checkout-processing-screen');
    const checkoutForm = document.querySelector('.checkout-form');
    const productDetails = document.querySelector('.checkout-product-details');
    const modalFooter = document.getElementById('checkout-modal-footer');
    const statusTitle = document.getElementById('processing-status-title');
    const statusDesc = document.getElementById('processing-status-desc');
    const phoneInput = document.getElementById('checkout-phone');

    payBtn.addEventListener('click', () => {
        const phone = phoneInput.value;
        if (!phone) {
            alert("Veuillez saisir votre numéro.");
            return;
        }

        checkoutForm.style.display = 'none';
        productDetails.style.display = 'none';
        modalFooter.style.display = 'none';
        processingScreen.style.display = 'flex';

        statusTitle.innerText = "Initialisation de l'API de Routage CEMAC...";
        statusDesc.innerText = "Connexion sécurisée aux serveurs opérateurs locaux...";

        setTimeout(() => {
            statusTitle.innerText = "Envoi de la demande d'OTP...";
            statusDesc.innerText = "Veuillez confirmer la transaction sur le simulateur ci-dessous.";
            
            const notification = document.getElementById('mock-otp-notification');
            const operatorName = chosenMomo === 'momo' ? 'MTN MoMo' : 'Orange Money';
            notification.querySelector('.notifier-name').innerText = operatorName;
            notification.querySelector('.notifier-body').innerHTML = `${operatorName}: Veuillez approuver l'abonnement mensuel <strong>AGIR Pro AI</strong> de 15 000 FCFA. Entrez le PIN de simulation **\`1234\`** pour valider.`;
            notification.style.display = 'block';
        }, 1500);
    });

    const valOtpBtn = document.getElementById('btn-submit-simulated-otp');
    valOtpBtn.addEventListener('click', () => {
        const otpInput = document.getElementById('checkout-simulated-otp');
        const otpCode = otpInput.value;

        if (otpCode === '1234') {
            document.getElementById('mock-otp-notification').style.display = 'none';
            statusTitle.innerText = "Finalisation cryptographique...";
            statusDesc.innerText = "Enregistrement de la clé de licence AGIR Shield...";

            setTimeout(() => {
                appState.isSubscribed = true;
                
                // Update interface badges
                const subBadge = document.getElementById('sub-badge-sidebar');
                subBadge.innerText = "Compte PRO AI";
                subBadge.className = "subscription-badge pro";

                // Update Profile view sub-badge
                const profBadge = document.getElementById('profile-sub-badge');
                if (profBadge) {
                    profBadge.innerText = "Compte PRO AI";
                    profBadge.className = "subscription-badge pro";
                }

                appState.transactions.unshift({
                    type: 'withdraw',
                    method: 'Souscription AGIR Pro AI',
                    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    amount: 15000
                });

                logSecurityEvent("Abonnement AGIR Pro AI activé", "Success");
                triggerNotification('security-alert', 'Licence Pro AI débloquée', 'Votre accès aux fonctionnalités prédictives d\'AGIR Pro est maintenant validé.');
                alert("Souscription réussie ! Bienvenue sur AGIR Pro AI.");

                closeModal('subscription-checkout-modal');
                resetCheckoutScreen();
                
                checkAISubscriptionState();
                updateUIBalances();
                renderRecentTransactions();
                renderDashboardCharts();
            }, 1200);

        } else {
            alert("Code incorrect. Utilisez '1234' pour simuler la réussite.");
        }
    });
}

function resetCheckoutScreen() {
    document.getElementById('checkout-processing-screen').style.display = 'none';
    document.getElementById('mock-otp-notification').style.display = 'none';
    document.querySelector('.checkout-form').style.display = 'block';
    document.querySelector('.checkout-product-details').style.display = 'flex';
    document.getElementById('checkout-modal-footer').style.display = 'flex';
    document.getElementById('checkout-simulated-otp').value = '';
}

// ==========================================================================
// 13. App Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();

    // Load initial states
    updateUIBalances();
    updateNotificationsBadge();
    renderDashboardCharts();
    renderDashboardMarketTable();
    renderRecentTransactions();

    // Setups
    setupMarketInteractions();
    setupChartPeriodFilters();
    setupSavingsInteractions();
    setupSecurityInteractions();
    setupNotificationsInteractions();
    setupInvestorQuiz();
    
    // Modals
    setupModalClosers();
    setupCashModal();
    setupTradeModal();
    setupSubscriptionCheckout();

    // Dates
    const dateDiv = document.getElementById('live-date');
    if (dateDiv) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDiv.innerText = today.toLocaleDateString('fr-FR', options);
    }
});
