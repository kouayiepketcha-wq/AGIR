/* ==========================================================================
   AGIR FinTech - Core Application Engine & Simulation Logic (Phase 2)
   ========================================================================== */

// 1. Static Database for BVMAC listed Assets
const BVMAC_STOCKS = [
    {
        ticker: 'SOCA',
        name: 'SOCAPALM',
        fullName: 'SociÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© Camerounaise de Palmeraies',
        sector: 'Agro-industrie',
        sectorKey: 'agro',
        price: 48000,
        change: 1.8,
        prevPrice: 47150,
        history: [46200, 46500, 47000, 46800, 47150, 48000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '12.4x', status: 'good', desc: 'Valorisation attractive par rapport au secteur agro-industriel.' },
            roe: { label: 'ROE (Return on Equity)', value: '18.5%', status: 'good', desc: 'TrÃƒÆ’Ã‚Â¨s forte rentabilitÃƒÆ’Ã‚Â© des capitaux propres, supÃƒÆ’Ã‚Â©rieure ÃƒÆ’Ã‚Â  la moyenne.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '7.8%', status: 'good', desc: 'Excellent rendement de dividende distributif rÃƒÆ’Ã‚Â©gulier.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.35', status: 'good', desc: 'Structure financiÃƒÆ’Ã‚Â¨re saine avec un faible endettement.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 88,
            narrative: 'SOCAPALM prÃƒÆ’Ã‚Â©sente des fondamentaux robustes. La hausse des cours de l\'huile de palme brute soutient les marges opÃƒÆ’Ã‚Â©rationnelles. Sa politique de distribution de dividendes en fait une valeur dÃƒÆ’Ã‚Â©fensive incontournable en zone CEMAC.',
            strengths: ['Forte demande d\'huile de palme en zone CEMAC', 'TrÃƒÆ’Ã‚Â©sorerie nette robuste et dividendes ÃƒÆ’Ã‚Â©levÃƒÆ’Ã‚Â©s rÃƒÆ’Ã‚Â©currents'],
            risks: ['DÃƒÆ’Ã‚Â©pendance aux conditions mÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â©o', 'Fluctuation des prix des matiÃƒÆ’Ã‚Â¨res premiÃƒÆ’Ã‚Â¨res']
        },
        projections: [48000, 52000, 56500, 61000, 68000],
        documents: [
            { id: 'soca-doc-1', title: 'Rapport Annuel 2025 SOCAPALM.pdf', size: '2.8 Mo', text: 'SOCAPALM Exercice 2025. Chiffre d\'Affaires : 85.4 milliards FCFA (+12%). RÃƒÆ’Ã‚Â©sultat Net : 14.2 milliards FCFA. Proposition d\'un dividende brut de 2 500 FCFA par action le 12 Juillet 2026. L\'EBITDA progresse de 8.5% soutenu par la hausse des rendements ÃƒÆ’Ã‚Â  l\'hectare.' },
            { id: 'soca-doc-2', title: 'Prospectus d\'Introduction BVMAC.pdf', size: '4.2 Mo', text: 'Prospectus approuvÃƒÆ’Ã‚Â© par la COSUMAF sous le visa nÃƒâ€šÃ‚Â° BVMAC-2009-01. Analyse des risques sectoriels : dÃƒÆ’Ã‚Â©pendance climatique et logistique. Structure du capital : ÃƒÆ’Ã¢â‚¬Â°tat du Cameroun (15%), SOCFIN (65%), Public BVMAC (20%).' }
        ]
    },
    {
        ticker: 'SAFA',
        name: 'SAFACAM',
        fullName: 'SociÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© Africaine ForestiÃƒÆ’Ã‚Â¨re et Agricole du Cameroun',
        sector: 'Agro-industrie',
        sectorKey: 'agro',
        price: 24500,
        change: -0.4,
        prevPrice: 24600,
        history: [25100, 24900, 24800, 24700, 24600, 24500],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '9.8x', status: 'good', desc: 'Action sous-ÃƒÆ’Ã‚Â©valuÃƒÆ’Ã‚Â©e, opportunitÃƒÆ’Ã‚Â© d\'achat ÃƒÆ’Ã‚Â  bon compte.' },
            roe: { label: 'ROE (Return on Equity)', value: '14.2%', status: 'average', desc: 'RentabilitÃƒÆ’Ã‚Â© stable mais impactÃƒÆ’Ã‚Â©e par les coÃƒÆ’Ã‚Â»ts forestiers.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '8.2%', status: 'good', desc: 'Un des rendements les plus ÃƒÆ’Ã‚Â©levÃƒÆ’Ã‚Â©s de la cote.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.12', status: 'good', desc: 'Quasiment aucune dette financiÃƒÆ’Ã‚Â¨re.' }
        },
        aiOpinion: {
            rec: 'CONSERVER',
            confidence: 72,
            narrative: 'SAFACAM souffre d\'un ralentissement des exportations de caoutchouc, compensÃƒÆ’Ã‚Â© par l\'huile de palme. L\'absence de dette protÃƒÆ’Ã‚Â¨ge l\'entreprise. Nous recommandons de conserver pour le rendement.',
            strengths: ['Bilan sain sans dette financiÃƒÆ’Ã‚Â¨re', 'Rendement de dividende exceptionnel (>8%)'],
            risks: ['SensibilitÃƒÆ’Ã‚Â© de la demande globale de caoutchouc', 'CoÃƒÆ’Ã‚Â»ts de transport croissants']
        },
        projections: [24500, 25200, 26800, 28100, 30500],
        documents: [
            { id: 'safa-doc-1', title: 'Rapport Financier Semestriel 2025.pdf', size: '1.9 Mo', text: 'RÃƒÆ’Ã‚Â©sultats SAFACAM du 1er Semestre 2025. EBITDA en lÃƒÆ’Ã‚Â©ger repli de 2% ÃƒÆ’Ã‚Â  cause de la baisse des prix du caoutchouc. TrÃƒÆ’Ã‚Â©sorerie nette positive ÃƒÆ’Ã‚Â  4.2 milliards FCFA. Aucun endettement bancaire ÃƒÆ’Ã‚Â  long terme n\'est enregistrÃƒÆ’Ã‚Â©.' }
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
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '8.2x', status: 'good', desc: 'Valorisation boursiÃƒÆ’Ã‚Â¨re faible compte tenu du taux de croissance.' },
            roe: { label: 'ROE (Return on Equity)', value: '22.4%', status: 'good', desc: 'Excellente rentabilitÃƒÆ’Ã‚Â© financiÃƒÆ’Ã‚Â¨re portÃƒÆ’Ã‚Â©e par l\'expansion (Cameroun).' },
            yield: { label: 'Dividend Yield (Rendement)', value: '6.5%', status: 'good', desc: 'Dividende attractif avec un taux de distribution soutenu.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '1.45', status: 'average', desc: 'Normal pour une institution bancaire (levier de dÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´ts).' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 91,
            narrative: 'BANGE est un moteur financier de la zone CEMAC. Son entrÃƒÆ’Ã‚Â©e sur le marchÃƒÆ’Ã‚Â© camerounais et l\'obtention de licences d\'intermÃƒÆ’Ã‚Â©diation dynamisent son modÃƒÆ’Ã‚Â¨le d\'affaires. Valorisation basse par rapport ÃƒÆ’Ã‚Â  la croissance.',
            strengths: ['Expansion rÃƒÆ’Ã‚Â©gionale active (Cameroun, Gabon)', 'PremiÃƒÆ’Ã‚Â¨re banque de GuinÃƒÆ’Ã‚Â©e ÃƒÆ’Ã¢â‚¬Â°quatoriale', 'Excellente marge nette bancaire'],
            risks: ['Exposition aux risques de crÃƒÆ’Ã‚Â©dit de la zone CEMAC', 'ContrÃƒÆ’Ã‚Â´les rÃƒÆ’Ã‚Â©glementaires de la COBAC']
        },
        projections: [206000, 225000, 248000, 275000, 310000],
        documents: [
            { id: 'bang-doc-1', title: 'Bilan de Comptes Consolides BANGE 2025.pdf', size: '3.4 Mo', text: 'Comptes consolidÃƒÆ’Ã‚Â©s du Groupe BANGE 2025. Total bilan : 1 200 milliards FCFA. Produit Net Bancaire : 78 milliards FCFA (+14%). BÃƒÆ’Ã‚Â©nÃƒÆ’Ã‚Â©fice net consolidÃƒÆ’Ã‚Â© : 15.6 milliards FCFA. Progression forte des encours de crÃƒÆ’Ã‚Â©dit sur les PME camerounaises.' },
            { id: 'bang-doc-2', title: 'Note d\'Information COSUMAF BANGE.pdf', size: '2.5 Mo', text: 'Document d\'information officiel d\'introduction en bourse (BVMAC). RÃƒÆ’Ã‚Â©sumÃƒÆ’Ã‚Â© de la stratÃƒÆ’Ã‚Â©gie : devenir une banque universelle CEMAC. Augmentation de capital souscrite ÃƒÆ’Ã‚Â  hauteur de 100%.' }
        ]
    },
    {
        ticker: 'LARE',
        name: 'La RÃƒÆ’Ã‚Â©gionale',
        fullName: 'La RÃƒÆ’Ã‚Â©gionale d\'ÃƒÆ’Ã¢â‚¬Â°pargne et de CrÃƒÆ’Ã‚Â©dit',
        sector: 'Banques & Finance',
        sectorKey: 'finance',
        price: 42500,
        change: 1.1,
        prevPrice: 42040,
        history: [41500, 41700, 41900, 42100, 42040, 42500],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '15.2x', status: 'average', desc: 'Valorisation conforme ÃƒÆ’Ã‚Â  la moyenne du secteur bancaire rÃƒÆ’Ã‚Â©gional.' },
            roe: { label: 'ROE (Return on Equity)', value: '11.8%', status: 'average', desc: 'RentabilitÃƒÆ’Ã‚Â© correcte, s\'amÃƒÆ’Ã‚Â©liorant suite au statut de banque universelle.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '5.0%', status: 'average', desc: 'Rendement convenable pour un acteur en phase de croissance.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.50', status: 'good', desc: 'Endettement propre trÃƒÆ’Ã‚Â¨s bien maÃƒÆ’Ã‚Â®trisÃƒÆ’Ã‚Â©.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 80,
            narrative: 'La RÃƒÆ’Ã‚Â©gionale poursuit sa transformation en banque commerciale. L\'augmentation du rÃƒÆ’Ã‚Â©seau d\'agences et la digitalisation via Mobile Banking prÃƒÆ’Ã‚Â©sagent une hausse de la collecte des dÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´ts.',
            strengths: ['Licence de banque commerciale obtenue', 'Forte pÃƒÆ’Ã‚Â©nÃƒÆ’Ã‚Â©tration auprÃƒÆ’Ã‚Â¨s des PME et des particuliers'],
            risks: ['CoÃƒÆ’Ã‚Â»ts de restructuration initiaux', 'Forte concurrence bancaire locale']
        },
        projections: [42500, 46000, 50200, 55000, 62000],
        documents: [
            { id: 'lare-doc-1', title: 'Rapport de Gestion Annuel 2025.pdf', size: '2.2 Mo', text: 'Rapport d\'activitÃƒÆ’Ã‚Â© La RÃƒÆ’Ã‚Â©gionale 2025. Hausse des clients actifs de 25% grÃƒÆ’Ã‚Â¢ce au canal digital. Capital social portÃƒÆ’Ã‚Â© ÃƒÆ’Ã‚Â  15 milliards FCFA pour rÃƒÆ’Ã‚Â©pondre aux exigences rÃƒÆ’Ã‚Â©glementaires de la COBAC.' }
        ]
    },
    {
        ticker: 'SEMC',
        name: 'SEMC',
        fullName: 'SociÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© des Eaux MinÃƒÆ’Ã‚Â©rales du Cameroun',
        sector: 'Services Publics',
        sectorKey: 'utility',
        price: 47000,
        change: 0.0,
        prevPrice: 47000,
        history: [47000, 47000, 47000, 47000, 47000, 47000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '24.1x', status: 'poor', desc: 'Valorisation trÃƒÆ’Ã‚Â¨s ÃƒÆ’Ã‚Â©levÃƒÆ’Ã‚Â©e par rapport aux bÃƒÆ’Ã‚Â©nÃƒÆ’Ã‚Â©fices rÃƒÆ’Ã‚Â©els.' },
            roe: { label: 'ROE (Return on Equity)', value: '5.1%', status: 'poor', desc: 'RentabilitÃƒÆ’Ã‚Â© faible tÃƒÆ’Ã‚Â©moignant de la concurrence agressive.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '2.5%', status: 'poor', desc: 'Distribution de dividende peu attractive.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.85', status: 'average', desc: 'Niveau d\'endettement modÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â© sous surveillance.' }
        },
        aiOpinion: {
            rec: 'VENDRE',
            confidence: 65,
            narrative: 'La SEMC fait face ÃƒÆ’Ã‚Â  une concurrence rude sur l\'eau minÃƒÆ’Ã‚Â©rale. Les marges sont sous pression et la croissance reste atone. P/E ÃƒÆ’Ã‚Â©levÃƒÆ’Ã‚Â© et faible rendement, prÃƒÆ’Ã‚Â©fÃƒÆ’Ã‚Â©rez d\'autres titres BVMAC.',
            strengths: ['NotoriÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© historique de la marque Source Tangui', 'RÃƒÆ’Ã‚Â©seau de distribution ÃƒÆ’Ã‚Â©tendu'],
            risks: ['Forte guerre des prix sur le marchÃƒÆ’Ã‚Â© de l\'eau', 'Baisse continue des parts de marchÃƒÆ’Ã‚Â©']
        },
        projections: [47000, 46000, 45200, 44000, 43500],
        documents: [
            { id: 'semc-doc-1', title: 'Communique de Presse Resultats 2025.pdf', size: '0.8 Mo', text: 'Communique officiel SEMC. Le chiffre d\'affaires s\'ÃƒÆ’Ã‚Â©tablit ÃƒÆ’Ã‚Â  12 milliards FCFA. Le rÃƒÆ’Ã‚Â©sultat opÃƒÆ’Ã‚Â©rationnel recule de 14% dÃƒÆ’Ã‚Â» ÃƒÆ’Ã‚Â  la hausse des coÃƒÆ’Ã‚Â»ts du plastique importÃƒÆ’Ã‚Â© et aux remises consenties aux distributeurs.' }
        ]
    },
    {
        ticker: 'SCGR',
        name: 'SCG-RÃƒÆ’Ã‚Â©',
        fullName: 'SociÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© Commerciale Gabonaise de RÃƒÆ’Ã‚Â©assurance',
        sector: 'Banques & Finance',
        sectorKey: 'finance',
        price: 21000,
        change: -1.2,
        prevPrice: 21250,
        history: [21800, 21600, 21500, 21300, 21250, 21000],
        ratios: {
            pe: { label: 'P/E (Price-Earnings Ratio)', value: '11.1x', status: 'good', desc: 'Niveau d\'ÃƒÆ’Ã‚Â©valuation modÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â© offrant une marge de sÃƒÆ’Ã‚Â©curitÃƒÆ’Ã‚Â©.' },
            roe: { label: 'ROE (Return on Equity)', value: '12.5%', status: 'average', desc: 'RentabilitÃƒÆ’Ã‚Â© stable propre au secteur de la rÃƒÆ’Ã‚Â©assurance.' },
            yield: { label: 'Dividend Yield (Rendement)', value: '7.1%', status: 'good', desc: 'Rendement de dividende solide et distribution rÃƒÆ’Ã‚Â©guliÃƒÆ’Ã‚Â¨re.' },
            debt: { label: 'Ratio Dette/Capitaux Propres', value: '0.22', status: 'good', desc: 'Excellent bilan avec des rÃƒÆ’Ã‚Â©serves techniques robustes.' }
        },
        aiOpinion: {
            rec: 'CONSERVER',
            confidence: 76,
            narrative: 'SCG-RÃƒÆ’Ã‚Â© bÃƒÆ’Ã‚Â©nÃƒÆ’Ã‚Â©ficie d\'un cadre rÃƒÆ’Ã‚Â©glementaire favorable au Gabon (cession lÃƒÆ’Ã‚Â©gale obligatoire). Son expansion gÃƒÆ’Ã‚Â©ographique diversifie les risques. Recommandation Conserver pour le profil dÃƒÆ’Ã‚Â©fensif.',
            strengths: ['RÃƒÆ’Ã‚Â©glementation locale protectrice (cessions obligatoires)', 'RÃƒÆ’Ã‚Â©serves de solvabilitÃƒÆ’Ã‚Â© importantes'],
            risks: ['SensibilitÃƒÆ’Ã‚Â© aux sinistres industriels majeurs', 'Cycle mondial de rÃƒÆ’Ã‚Â©assurance serrÃƒÆ’Ã‚Â©']
        },
        projections: [21000, 22200, 23500, 24800, 26500],
        documents: [
            { id: 'scg-doc-1', title: 'Note d\'Information de Cotation SCG-Re.pdf', size: '2.1 Mo', text: 'PrÃƒÆ’Ã‚Â©sentation de SCG-RÃƒÆ’Ã‚Â© lors de son introduction en bourse. Leader de la rÃƒÆ’Ã‚Â©assurance en zone CEMAC. Primes ÃƒÆ’Ã‚Â©mises globales en croissance annuelle moyenne de 6.5% sur les 5 derniÃƒÆ’Ã‚Â¨res annÃƒÆ’Ã‚Â©es.' }
        ]
    }
];

// Obligations (Bonds) Database
const BVMAC_BONDS = [
    {
        ticker: 'ECMR',
        name: 'ECMR 6.25% 26-31',
        fullName: 'ÃƒÆ’Ã¢â‚¬Â°tat du Cameroun (ECMR 6.25% 2026-2031)',
        sector: 'Obligations d\'ÃƒÆ’Ã¢â‚¬Â°tat',
        sectorKey: 'sovereign',
        price: 10000,
        change: 0.0,
        prevPrice: 10000,
        history: [10000, 10000, 10000, 10000, 10000, 10000],
        ratios: {
            yield: { label: 'Yield to Maturity (Rendement)', value: '6.25% A.N.', status: 'good', desc: 'Taux fixe garanti par le TrÃƒÆ’Ã‚Â©sor Public du Cameroun.' },
            duration: { label: 'DurÃƒÆ’Ã‚Â©e de Placement', value: '5 ans', status: 'average', desc: 'ÃƒÆ’Ã¢â‚¬Â°chÃƒÆ’Ã‚Â©ance fixÃƒÆ’Ã‚Â©e au 31 dÃƒÆ’Ã‚Â©cembre 2031.' },
            rating: { label: 'Notation Souveraine', value: 'B (Stable)', status: 'average', desc: 'Risque de dÃƒÆ’Ã‚Â©faut modÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©, soutenu par la banque centrale BEAC.' },
            liquidity: { label: 'Indice de liquiditÃƒÆ’Ã‚Â©', value: 'Moyen-ÃƒÆ’Ã¢â‚¬Â°levÃƒÆ’Ã‚Â©', status: 'good', desc: 'Facilement nÃƒÆ’Ã‚Â©gociable auprÃƒÆ’Ã‚Â¨s des banques locales (SVT).' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 95,
            narrative: 'Cette obligation de l\'ÃƒÆ’Ã¢â‚¬Â°tat du Cameroun est l\'un des actifs les plus sÃƒÆ’Ã‚Â©curisÃƒÆ’Ã‚Â©s de la zone CEMAC. Elle offre un rendement supÃƒÆ’Ã‚Â©rieur aux comptes sur livret locaux tout en garantissant des coupons annuels exempts d\'impÃƒÆ’Ã‚Â´ts pour les rÃƒÆ’Ã‚Â©sidents fiscaux.',
            strengths: ['Remboursement garanti par l\'ÃƒÆ’Ã¢â‚¬Â°tat du Cameroun', 'FiscalitÃƒÆ’Ã‚Â© avantageuse sur les intÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Âªts (0% en zone CEMAC)'],
            risks: ['Risque d\'inflation locale supÃƒÆ’Ã‚Â©rieure au rendement', 'Blocage partiel ÃƒÆ’Ã‚Â  court terme']
        },
        projections: [10000, 10000, 10000, 10000, 10000],
        documents: [
            { id: 'ecmr-doc-1', title: 'Note d\'Information Emprunt ECMR.pdf', size: '1.7 Mo', text: 'CaractÃƒÆ’Ã‚Â©ristiques de l\'emprunt de l\'ÃƒÆ’Ã¢â‚¬Â°tat du Cameroun. Taux d\'intÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Âªt : 6.25% brut l\'an. Remboursement par amortissement constant ÃƒÆ’Ã‚Â  partir de la deuxiÃƒÆ’Ã‚Â¨me annÃƒÆ’Ã‚Â©e. TrÃƒÆ’Ã‚Â©sorerie affectÃƒÆ’Ã‚Â©e aux projets de dÃƒÆ’Ã‚Â©veloppement.' }
        ]
    },
    {
        ticker: 'EOTG',
        name: 'EOTG 6.5% 25-30',
        fullName: 'ÃƒÆ’Ã¢â‚¬Â°tat du Gabon (EOTG 6.5% 2025-2030)',
        sector: 'Obligations d\'ÃƒÆ’Ã¢â‚¬Â°tat',
        sectorKey: 'sovereign',
        price: 10000,
        change: 0.0,
        prevPrice: 10000,
        history: [10000, 10000, 10000, 10000, 10000, 10000],
        ratios: {
            yield: { label: 'Yield to Maturity (Rendement)', value: '6.50% A.N.', status: 'good', desc: 'Coupon annuel fixe ÃƒÆ’Ã‚Â©mis par la RÃƒÆ’Ã‚Â©publique Gabonaise.' },
            duration: { label: 'DurÃƒÆ’Ã‚Â©e de Placement', value: '4 ans', status: 'average', desc: 'ÃƒÆ’Ã¢â‚¬Â°chÃƒÆ’Ã‚Â©ance fixÃƒÆ’Ã‚Â©e en juin 2030.' },
            rating: { label: 'Notation Souveraine', value: 'B- (Stable)', status: 'average', desc: 'Notation reflÃƒÆ’Ã‚Â©tant l\'impact du cours du pÃƒÆ’Ã‚Â©trole sur le TrÃƒÆ’Ã‚Â©sor.' },
            liquidity: { label: 'Indice de liquiditÃƒÆ’Ã‚Â©', value: 'Moyen', status: 'average', desc: 'Volume de transaction infÃƒÆ’Ã‚Â©rieur ÃƒÆ’Ã‚Â  l\'emprunt camerounais.' }
        },
        aiOpinion: {
            rec: 'ACHETER',
            confidence: 89,
            narrative: 'Le Gabon offre un taux lÃƒÆ’Ã‚Â©gÃƒÆ’Ã‚Â¨rement supÃƒÆ’Ã‚Â©rieur pour compenser le risque souverain. Le remboursement reste trÃƒÆ’Ã‚Â¨s probable grÃƒÆ’Ã‚Â¢ce ÃƒÆ’Ã‚Â  la restructuration de la dette pÃƒÆ’Ã‚Â©troliÃƒÆ’Ã‚Â¨re gabonaise et l\'appui BEAC.',
            strengths: ['Rendement ÃƒÆ’Ã‚Â©levÃƒÆ’Ã‚Â© de 6.5%', 'Garantie de remboursement BEAC'],
            risks: ['Exposition de l\'ÃƒÆ’Ã‚Â©conomie gabonaise au marchÃƒÆ’Ã‚Â© pÃƒÆ’Ã‚Â©trolier', 'LiquiditÃƒÆ’Ã‚Â© secondaire parfois lente']
        },
        projections: [10000, 10000, 10000, 10000, 10000],
        documents: [
            { id: 'eotg-doc-1', title: 'Fiche d\'Emission Obligataire Gabon.pdf', size: '1.4 Mo', text: 'Fiche de souscription EOTG. Taux nominal : 6.50%. Paiement annuel des coupons ÃƒÆ’Ã‚Â  date anniversaire. Les fonds collectÃƒÆ’Ã‚Â©s sont destinÃƒÆ’Ã‚Â©s ÃƒÆ’Ã‚Â  financer le plan d\'accÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©ration de la transition infrastructures.' }
        ]
    }
];

// Fonds Communs de Placement (FCP) Database
const BVMAC_FCP = [
    {
        ticker: 'AGFL', name: 'AGIR Flex', fullName: 'AGIR Flex (Fonds MonÃ©taire Liquide)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 1000, change: 0.1, prevPrice: 999,
        history: [988, 990, 992, 995, 999, 1000],
        tagline: "L'Ã©pargne libre et disponible 24 h/24",
        useCase: "Placements de trÃ©sorerie sur des Bons du TrÃ©sor des Ã‰tats de la CEMAC. IdÃ©al pour votre argent du quotidien.",
        riskLevel: 'aucun', recommendedDuration: 'Disponible en 24 h',
        entryFee: 0.00, exitFee: 0.00, managementFee: 1.00, minInvestment: 1000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '4,5 % Ã  5,5 % / an', status: 'good', desc: 'Rendement net cible de frais de gestion.' },
            risk: { label: 'Profil de risque', value: 'Aucun (1/7)', status: 'good', desc: 'Risque en capital quasi nul. Actifs investis en Bons du TrÃ©sor BEAC.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '1 000 FCFA', status: 'good', desc: 'Montant ultra accessible pour encourager la participation.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'InstantanÃ©e (T+0)', status: 'good', desc: 'Retrait disponible Ã  tout moment sans pÃ©nalitÃ©s.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 97, narrative: "AGIR Flex est l'outil idÃ©al pour les utilisateurs qui souhaitent valoriser leur Ã©pargne quotidienne sans risque. RÃ©investissement continu en dette souveraine de court terme.", strengths: ['Retraits instantanÃ©s vers Mobile Money', 'RentabilitÃ© stable et prÃ©visible', 'Aucuns frais d\'entrÃ©e ni de sortie'], risks: ['Rendement plus modÃ©rÃ© que les actions'] },
        projections: [1000, 1055, 1113, 1174, 1239],
        documents: [{ id: 'agfl-doc-1', title: 'RÃ¨glement FCP AGIR Flex.pdf', size: '1,2 Mo', text: 'RÃ¨glement gÃ©nÃ©ral approuvÃ© par la COSUMAF. StratÃ©gie : investissements en Bons et Obligations du TrÃ©sor de la zone CEMAC.' }]
    },
    {
        ticker: 'AGSC', name: 'AGIR SÃ©curitÃ©', fullName: 'AGIR SÃ©curitÃ© (Fonds Obligataire Souverain)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 5200, change: 0.3, prevPrice: 5184,
        history: [5020, 5060, 5100, 5140, 5184, 5200],
        tagline: "Construisez vos projets avec sÃ©rÃ©nitÃ©",
        useCase: "Financement des infrastructures publiques via les Obligations du TrÃ©sor Assimilables (OTA) des Ã‰tats de la sous-rÃ©gion.",
        riskLevel: 'faible', recommendedDuration: '6 mois minimum',
        entryFee: 1.00, exitFee: 0.00, managementFee: 1.20, minInvestment: 5000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '6 % Ã  7 % / an', status: 'good', desc: 'Rendement rÃ©gulier sur les coupons obligataires souverains.' },
            risk: { label: 'Profil de risque', value: 'Faible (2/7)', status: 'good', desc: 'Obligation d\'Ã‰tat â€” risque de dÃ©faut trÃ¨s limitÃ© en zone CEMAC.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '5 000 FCFA', status: 'good', desc: 'Investissement accessible.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Hebdomadaire (T+3)', status: 'average', desc: 'Rachat traitÃ© sous 3 jours ouvrables.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 92, narrative: "AGIR SÃ©curitÃ© offre un rendement stable adossÃ© Ã  la dette publique rÃ©gionale. IdÃ©al pour sÃ©curiser un objectif Ã  moyen terme.", strengths: ['Garantie souveraine', 'Rendement prÃ©visible', 'Faible volatilitÃ©'], risks: ['PÃ©nalitÃ© de 0,5 % en cas de rachat avant 6 mois'] },
        projections: [5200, 5512, 5843, 6194, 6566],
        documents: [{ id: 'agsc-doc-1', title: 'DIC AGIR SÃ©curitÃ©.pdf', size: '1,4 Mo', text: 'Document d\'information clÃ©. Allocation cible : 100 % obligations souveraines CEMAC.' }]
    },
    {
        ticker: 'AGCR', name: 'AGIR Croissance', fullName: 'AGIR Croissance (Fonds Actions DiversifiÃ©)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 10500, change: 1.4, prevPrice: 10355,
        history: [9800, 9950, 10100, 10200, 10355, 10500],
        tagline: "Captez la performance des grandes entreprises",
        useCase: "Achat de parts de capital des fleurons industriels et bancaires cotÃ©s Ã  la BVMAC (SOCAPALM, BGFI, BANGE).",
        riskLevel: 'dynamique', recommendedDuration: '24 mois minimum',
        entryFee: 1.50, exitFee: 1.00, managementFee: 1.50, minInvestment: 10000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: 'Dividendes + Plus-values', status: 'good', desc: 'Performance liÃ©e aux dividendes et Ã  la valorisation des actions.' },
            risk: { label: 'Profil de risque', value: 'Dynamique (5/7)', status: 'poor', desc: 'Risque de perte en capital liÃ© aux fluctuations boursiÃ¨res.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '10 000 FCFA', status: 'average', desc: 'NÃ©cessite une Ã©pargne constituÃ©e.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Mensuelle', status: 'poor', desc: 'Frais de sortie anticipÃ©e de 1 % si retrait avant 24 mois.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 85, narrative: "AGIR Croissance rÃ©plique et optimise la performance globale des actions de la BVMAC. Support de choix pour un horizon long terme.", strengths: ['Exposition diversifiÃ©e aux leaders rÃ©gionaux', 'Potentiel de plus-value important'], risks: ['Forte volatilitÃ© des cours boursiers', 'LiquiditÃ© restreinte en cas de rachat anticipÃ©'] },
        projections: [10500, 11550, 12705, 13976, 15373],
        documents: [{ id: 'agcr-doc-1', title: 'Fiche AGIR Croissance.pdf', size: '2,0 Mo', text: 'FCP Actions diversifiÃ© BVMAC. Performance cumulÃ©e simulÃ©e de +46 % sur 5 ans.' }]
    },
    {
        ticker: 'AGIM', name: 'AGIR Immo', fullName: 'AGIR Immo (SCPI â€” Immobilier Collectif)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 1250, change: 0.6, prevPrice: 1243,
        history: [1180, 1200, 1215, 1230, 1243, 1250],
        tagline: "Devenez copropriÃ©taire immobilier dÃ¨s 1 000 FCFA",
        useCase: "Acquisition et construction de bÃ¢timents logistiques et de bureaux professionnels Ã  Douala et Libreville. Les loyers alimentent le fonds.",
        riskLevel: 'modere', recommendedDuration: '12 mois minimum',
        entryFee: 2.00, exitFee: 1.00, managementFee: 1.50, minInvestment: 1000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '7 % Ã  9 % / an', status: 'good', desc: 'Revenus locatifs rÃ©guliers + valorisation du patrimoine.' },
            risk: { label: 'Profil de risque', value: 'ModÃ©rÃ© (3/7)', status: 'average', desc: 'Risque immobilier limitÃ© par la diversification gÃ©ographique.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '1 000 FCFA', status: 'good', desc: 'Ultra accessible : devenez co-propriÃ©taire.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Trimestrielle', status: 'average', desc: 'Rachat possible chaque trimestre.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 88, narrative: "AGIR Immo permet d'accÃ©der Ã  l'immobilier professionnel dÃ¨s 1 000 FCFA, une innovation majeure dans la sous-rÃ©gion.", strengths: ['Revenus locatifs stables', 'Accessible dÃ¨s 1 000 FCFA', 'Diversification hors-marchÃ©s financiers'], risks: ['IlliquiditÃ© relative de l\'immobilier', 'Risque de vacance locative'] },
        projections: [1250, 1350, 1458, 1575, 1701],
        documents: [{ id: 'agim-doc-1', title: 'Prospectus AGIR Immo.pdf', size: '2,5 Mo', text: 'SCPI gÃ©rÃ©e par AGIR Gestion d\'Actifs. Actifs : bureaux Douala, entrepÃ´ts Libreville.' }]
    },
    {
        ticker: 'AGAF', name: 'AGIR Affacturage', fullName: 'AGIR Affacturage (Titrisation de CrÃ©ances)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 5500, change: 0.8, prevPrice: 5456,
        history: [5200, 5280, 5340, 5400, 5456, 5500],
        tagline: "Financez l'Ã©conomie locale et boostez vos gains",
        useCase: "Rachat avec dÃ©cote des factures certifiÃ©es des PME locales Ã©mises sur de grands donneurs d'ordres solvables de la CEMAC.",
        riskLevel: 'modere', recommendedDuration: '3 Ã  6 mois',
        entryFee: 1.00, exitFee: 0.50, managementFee: 1.50, minInvestment: 5000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '8 % Ã  12 % / an', status: 'good', desc: 'Rendement Ã©levÃ© liÃ© Ã  la dÃ©cote sur les crÃ©ances rachetÃ©es.' },
            risk: { label: 'Profil de risque', value: 'ModÃ©rÃ© (4/7)', status: 'average', desc: 'Risque de non-paiement attÃ©nuÃ© par la solvabilitÃ© des donneurs d\'ordres.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '5 000 FCFA', status: 'good', desc: 'Accessible.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Ã€ Ã©chÃ©ance (3 Ã  6 mois)', status: 'average', desc: 'Fonds bloquÃ©s jusqu\'Ã  l\'Ã©chÃ©ance des factures.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 83, narrative: "AGIR Affacturage offre un rendement trÃ¨s attractif en finanÃ§ant le BFR des PME locales. Risque maÃ®trisÃ© via la qualitÃ© des dÃ©biteurs.", strengths: ['Rendement parmi les plus Ã©levÃ©s', 'Impact direct sur l\'Ã©conomie locale', 'Cycle court de 3 Ã  6 mois'], risks: ['Risque de dÃ©faut des PME cÃ©dantes', 'IlliquiditÃ© pendant la durÃ©e du cycle'] },
        projections: [5500, 6050, 6655, 7321, 8053],
        documents: [{ id: 'agaf-doc-1', title: 'RÃ¨glement AGIR Affacturage.pdf', size: '1,8 Mo', text: 'Fonds de titrisation de crÃ©ances commerciales. Portefeuille de factures de PME CEMAC.' }]
    },
    {
        ticker: 'AGAG', name: 'AGIR Agricole', fullName: 'AGIR Agricole (Financement Participatif Agricole)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 5000, change: -0.4, prevPrice: 5020,
        history: [4850, 4900, 4940, 4980, 5020, 5000],
        tagline: "Soutenez les campagnes agricoles d'Afrique Centrale",
        useCase: "Achat d'intrants et financement des campagnes de collecte de coopÃ©ratives agricoles majeures (cafÃ©, cacao). Remboursement Ã  l'exportation.",
        riskLevel: 'eleve', recommendedDuration: '9 mois minimum',
        entryFee: 1.00, exitFee: 0.50, managementFee: 1.80, minInvestment: 5000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '9 % Ã  11 % / an', status: 'good', desc: 'Rendement Ã©levÃ© liÃ© au cycle de rÃ©colte et d\'exportation.' },
            risk: { label: 'Profil de risque', value: 'Ã‰levÃ© (6/7)', status: 'poor', desc: 'Risque climatique, risque de cours des matiÃ¨res premiÃ¨res.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '5 000 FCFA', status: 'good', desc: 'Accessible.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Ã€ maturitÃ© (9 mois)', status: 'poor', desc: 'Fonds bloquÃ©s durant tout le cycle agricole.' }
        },
        aiOpinion: { rec: 'CONSERVER', confidence: 75, narrative: "AGIR Agricole est un investissement Ã  impact. Rendement Ã©levÃ© mais risque significatif liÃ© au climat et aux prix des matiÃ¨res premiÃ¨res.", strengths: ['Fort impact social et environnemental', 'Rendement parmi les plus Ã©levÃ©s du catalogue'], risks: ['Risque climatique (sÃ©cheresse, inondations)', 'VolatilitÃ© des cours du cacao et du cafÃ©'] },
        projections: [5000, 5500, 6050, 6655, 7321],
        documents: [{ id: 'agag-doc-1', title: 'DIC AGIR Agricole.pdf', size: '1,6 Mo', text: 'Fonds de financement participatif agricole. Partenaires : coopÃ©ratives certifiÃ©es de la zone CEMAC.' }]
    },
    {
        ticker: 'AGLE', name: 'AGIR Leasing', fullName: 'AGIR Leasing (CrÃ©dit-bail Mobilier)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 10200, change: 0.5, prevPrice: 10149,
        history: [9800, 9900, 10000, 10060, 10149, 10200],
        tagline: "Participez au financement des Ã©quipements des PME",
        useCase: "Achat de vÃ©hicules professionnels, taxis ou engins industriels mis en location-vente auprÃ¨s d'entrepreneurs de la sous-rÃ©gion.",
        riskLevel: 'modere', recommendedDuration: '12 mois minimum',
        entryFee: 1.50, exitFee: 0.50, managementFee: 1.50, minInvestment: 10000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '8 % Ã  10 % / an', status: 'good', desc: 'Revenu rÃ©gulier des loyers de crÃ©dit-bail.' },
            risk: { label: 'Profil de risque', value: 'ModÃ©rÃ© (3/7)', status: 'average', desc: 'Risque limitÃ© par la dÃ©tention physique des actifs louÃ©s.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '10 000 FCFA', status: 'average', desc: 'Ticket d\'entrÃ©e modÃ©rÃ©.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Semestrielle', status: 'average', desc: 'Rachat possible tous les 6 mois.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 86, narrative: "AGIR Leasing combine rendement et sÃ©curitÃ© grÃ¢ce au sous-jacent physique (vÃ©hicules, matÃ©riel). Impact direct sur l'entrepreneuriat local.", strengths: ['Actifs tangibles en garantie', 'Rendement rÃ©gulier', 'Impact sur les PME'], risks: ['Risque de dÃ©faut des locataires', 'DÃ©prÃ©ciation des actifs physiques'] },
        projections: [10200, 11118, 12119, 13210, 14399],
        documents: [{ id: 'agle-doc-1', title: 'Prospectus AGIR Leasing.pdf', size: '2,1 Mo', text: 'Fonds de crÃ©dit-bail. Actifs sous-jacents : flotte automobile et engins industriels.' }]
    },
    {
        ticker: 'AGGR', name: 'AGIR Green', fullName: 'AGIR Green (Fonds Impact ESG)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 5100, change: 0.2, prevPrice: 5090,
        history: [4950, 4980, 5010, 5040, 5090, 5100],
        tagline: "Investissez dans la transition Ã©nergÃ©tique rÃ©gionale",
        useCase: "DÃ©ploiement de kits solaires rÃ©sidentiels et de mini-centrales de distribution Ã©lectrique hors-rÃ©seau dans les localitÃ©s secondaires.",
        riskLevel: 'faible', recommendedDuration: '18 mois minimum',
        entryFee: 1.00, exitFee: 0.00, managementFee: 1.20, minInvestment: 5000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '7 % Ã  8,5 % / an', status: 'good', desc: 'Revenus stables des abonnements Ã©nergie.' },
            risk: { label: 'Profil de risque', value: 'Faible (2/7)', status: 'good', desc: 'Revenus rÃ©currents des abonnements solaires.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '5 000 FCFA', status: 'good', desc: 'Accessible.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Trimestrielle', status: 'average', desc: 'Rachat possible chaque trimestre aprÃ¨s 18 mois.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 90, narrative: "AGIR Green allie rendement et impact climatique positif. Les revenus des abonnements solaires offrent une visibilitÃ© forte.", strengths: ['Impact environnemental majeur', 'Revenus rÃ©currents (abonnements)', 'Aucuns frais de sortie'], risks: ['Risque technique (pannes solaires)', 'ImpayÃ©s des mÃ©nages ruraux'] },
        projections: [5100, 5508, 5949, 6424, 6938],
        documents: [{ id: 'aggr-doc-1', title: 'Rapport d\'impact AGIR Green.pdf', size: '3,0 Mo', text: 'Fonds labellisÃ© ESG. DÃ©ploiement de 12 000 kits solaires en zone CEMAC.' }]
    },
    {
        ticker: 'AGED', name: 'AGIR Ã‰ducation', fullName: 'AGIR Ã‰ducation (Fonds de PrÃ©voyance)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 1100, change: 0.1, prevPrice: 1099,
        history: [1060, 1070, 1078, 1088, 1099, 1100],
        tagline: "Assurez l'avenir universitaire de vos enfants",
        useCase: "Placement long terme sÃ©curisÃ© sur des instruments mixtes pour garantir le financement des grandes Ã©coles ou des projets universitaires.",
        riskLevel: 'faible', recommendedDuration: 'BloquÃ© (objectif)',
        entryFee: 0.00, exitFee: 0.00, managementFee: 1.00, minInvestment: 1000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '6 % fixe / an', status: 'good', desc: 'Taux fixe garanti sur la durÃ©e du placement.' },
            risk: { label: 'Profil de risque', value: 'Faible (2/7)', status: 'good', desc: 'Placement garanti Ã  taux fixe, risque minimal.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '1 000 FCFA', status: 'good', desc: 'IdÃ©al pour commencer tÃ´t.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'BloquÃ© (objectif atteint)', status: 'poor', desc: 'Fonds dÃ©bloquÃ©s Ã  l\'atteinte de l\'objectif ou Ã  la date prÃ©vue.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 95, narrative: "AGIR Ã‰ducation est le fonds de prÃ©voyance idÃ©al pour prÃ©parer les Ã©tudes supÃ©rieures de vos enfants. Taux fixe, aucuns frais, auto-save compatible.", strengths: ['Taux fixe garanti de 6 % / an', 'Aucuns frais d\'entrÃ©e ni de sortie', 'Compatible Auto-Save'], risks: ['Capital bloquÃ© jusqu\'Ã  l\'objectif'] },
        projections: [1100, 1166, 1236, 1310, 1389],
        documents: [{ id: 'aged-doc-1', title: 'Brochure AGIR Ã‰ducation.pdf', size: '1,0 Mo', text: 'Fonds de prÃ©voyance Ã©ducatif. Option Auto-Save : prÃ©lÃ¨vement automatique mensuel depuis Mobile Money.' }]
    },
    {
        ticker: 'AGDI', name: 'AGIR Diaspora', fullName: 'AGIR Diaspora (Fonds Diaspora)',
        sector: 'Produits AGIR', sectorKey: 'fcp-agir', price: 10000, change: 0.3, prevPrice: 9970,
        history: [9700, 9780, 9840, 9900, 9970, 10000],
        tagline: "Co-dÃ©veloppez la CEMAC en toute sÃ©curitÃ©",
        useCase: "Canal sÃ©curisÃ© permettant Ã  la diaspora d'injecter des fonds par carte bancaire internationale dans des projets de micro-infrastructures vÃ©rifiÃ©s.",
        riskLevel: 'modere', recommendedDuration: '12 mois minimum',
        entryFee: 2.00, exitFee: 0.00, managementFee: 1.50, minInvestment: 10000,
        ratios: {
            yield: { label: 'Performance estimÃ©e (an)', value: '5,5 % Ã  6,5 % / an', status: 'good', desc: 'Rendement stable sur des projets vÃ©rifiÃ©s et auditables.' },
            risk: { label: 'Profil de risque', value: 'ModÃ©rÃ© (3/7)', status: 'average', desc: 'Risque de projet attÃ©nuÃ© par l\'audit et le suivi continu.' },
            minInv: { label: "Minimum d'entrÃ©e", value: '10 000 FCFA', status: 'average', desc: 'Ticket d\'entrÃ©e adaptÃ© Ã  la diaspora.' },
            liquidity: { label: 'DisponibilitÃ© des fonds', value: 'Semestrielle', status: 'average', desc: 'Rachat possible tous les 6 mois.' }
        },
        aiOpinion: { rec: 'ACHETER', confidence: 87, narrative: "AGIR Diaspora est un vÃ©hicule unique permettant aux Africains de l'Ã©tranger de contribuer au dÃ©veloppement de leur rÃ©gion d'origine de maniÃ¨re sÃ©curisÃ©e et rÃ©munÃ©rÃ©e.", strengths: ['Paiement par carte bancaire internationale', 'Impact direct sur le dÃ©veloppement local', 'Projets auditÃ©s et transparents'], risks: ['Risque de change EUR/USD vers XAF', 'Frais d\'entrÃ©e de 2 %'] },
        projections: [10000, 10600, 11236, 11910, 12625],
        documents: [{ id: 'agdi-doc-1', title: 'Guide AGIR Diaspora.pdf', size: '2,3 Mo', text: 'Guide d\'investissement pour la diaspora. Canal sÃ©curisÃ© Stripe + CEMAC. Projets vÃ©rifiÃ©s en temps rÃ©el.' }]
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
        { id: 'v3', name: 'PIP ÃƒÆ’Ã¢â‚¬Â°pargne Libre - AGIR Flex', balance: 100000, target: 200000, rate: '5.8%', asset: 'AGIR Flex', type: 'flexible' }
    ],
    transactions: [
        { type: 'buy', ticker: 'SOCA', qty: 10, price: 47150, date: '2026-07-05 14:22', amount: 471500 },
        { type: 'deposit', method: 'MTN MoMo', date: '2026-07-02 09:15', amount: 500000 },
        { type: 'sell', ticker: 'SAFA', qty: 15, price: 24900, date: '2026-06-28 11:40', amount: 373500 },
        { type: 'withdraw', method: 'Orange Money', date: '2026-06-15 16:04', amount: 150000 }
    ],
    notifications: [
        { id: 1, type: 'market-alert', title: 'DÃƒÆ’Ã‚Â©tachement dividende SOCAPALM', date: 'Aujourd\'hui 10:15', body: 'L\'assemblÃƒÆ’Ã‚Â©e gÃƒÆ’Ã‚Â©nÃƒÆ’Ã‚Â©rale de SOCAPALM a validÃƒÆ’Ã‚Â© un dividende brut de 2 500 FCFA par action pour l\'exercice 2025. DÃƒÆ’Ã‚Â©tachement officiel le 12 Juillet 2026.', unread: true },
        { id: 2, type: 'trade-alert', title: 'Achat automatique exÃƒÆ’Ã‚Â©cutÃƒÆ’Ã‚Â©', date: 'Hier 14:22', body: 'Votre plan PIP a achetÃƒÆ’Ã‚Â© automatiquement 5 unitÃƒÆ’Ã‚Â©s du FCP AGIR Flex ÃƒÆ’Ã‚Â  1 000 FCFA. Votre capital travaille.', unread: true },
        { id: 3, type: 'security-alert', title: 'Connexion Shield active', date: '06 Juil 09:30', body: 'Nouvel appareil dÃƒÆ’Ã‚Â©tectÃƒÆ’Ã‚Â© pour votre compte AGIR (IP: 197.244.180.42) ÃƒÆ’Ã‚Â  Douala, Cameroun. Authentification par empreinte sÃƒÆ’Ã‚Â©curisÃƒÆ’Ã‚Â©e.', unread: true },
        { id: 4, type: 'market-alert', title: 'Nouvel emprunt ECMR 6.25%', date: '04 Juil 11:00', body: 'L\'ÃƒÆ’Ã¢â‚¬Â°tat du Cameroun lance l\'emprunt ECMR 2026-2031 ÃƒÆ’Ã‚Â  6.25% sur la BVMAC. Souscription sans frais disponible sur AGIR.', unread: false }
    ],
    securityLogs: [
        { date: '2026-07-08 12:20', event: 'Connexion authentifiÃƒÆ’Ã‚Â©e', ip: '197.244.180.42 (Mac OS X)', loc: 'Douala, Cameroun', status: 'Success' },
        { date: '2026-07-08 11:02', event: 'NÃƒÆ’Ã‚Â©gociation TLS 1.3 Shield', ip: '197.244.180.42 (AGIR App)', loc: 'Douala, Cameroun', status: 'Success' },
        { date: '2026-07-07 18:40', event: 'VÃƒÆ’Ã‚Â©rification intÃƒÆ’Ã‚Â©gritÃƒÆ’Ã‚Â© base de donnÃƒÆ’Ã‚Â©es (Chiffrement AES-256)', ip: 'SystÃƒÆ’Ã‚Â¨me Interne', loc: 'Serveur Cloud Douala', status: 'Success' },
        { date: '2026-07-05 14:22', event: 'Double validation OTP approuvÃƒÆ’Ã‚Â©e (Achat SOCA)', ip: '197.244.180.42 (Mobile)', loc: 'Douala, Cameroun', status: 'Success' }
    ],
    transactionPin: '0000', 
    selectedStockDetail: 'SOCA', 
    activeFrequency: 'daily',
    activeMarketCategory: 'actions', // 'actions', 'obligations', 'fcp'
    activeChartPeriod: '6M',
    investorRiskProfile: 'Non DÃƒÆ’Ã‚Â©fini',
    kycStatus: 'unverified',
    limitDailyXaf: 1000000,
    limitMonthlyXaf: 10000000,
    isAuthenticated: false,
    profileType: 'physique',
    selectedLanguage: 'fr',
    userProfile: {
        fullName: 'Saunya Compta',
        email: 'compta.saunya@agir.cm',
        phone: '+237 677 89 01 23',
        bankAccount: ''
    },
    kycDocuments: {
        // Personne Physique
        cniPassportRecto: '',
        cniPassportVerso: '',
        selfieVerification: '',
        planLocalisationDomicile: '',
        // Personne Morale
        statutsEntreprise: '',
        registreCommerce: '',
        attestationImmatriculation: '',
        documentNonRedevance: '',
        planLocalisationEntreprise: ''
    },
    kycSubmittedAt: null,
    kycVerifiedAt: null
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
        } else if (target === 'portfolio') {
            renderPortfolioView();
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

    // Expose routeToTarget globally so footer/widget shortcuts can navigate views
    window.routeToTarget = routeToTarget;

    // Navigate directly to a specific market category tab (actions, obligations, fcp)
    function navigateToMarketCategory(category) {
        appState.activeMarketCategory = category;
        routeToTarget('market');

        // Update category tab UI
        const categoryTabs = document.querySelectorAll('.category-tab-btn');
        categoryTabs.forEach(t => t.classList.remove('active'));
        const matchingTab = document.querySelector(`.category-tab-btn[data-category="${category}"]`);
        if (matchingTab) matchingTab.classList.add('active');

        // Show/hide sector filters (only relevant for 'actions')
        const filtersBox = document.getElementById('market-sector-filters-container');
        if (filtersBox) {
            filtersBox.style.display = (category === 'actions') ? 'flex' : 'none';
        }

        // Reset sector filter to 'all'
        const sectorFilters = document.querySelectorAll('.btn-market-filter');
        sectorFilters.forEach(f => f.classList.remove('active'));
        const allBtn = document.querySelector('.btn-market-filter[data-sector="all"]');
        if (allBtn) allBtn.classList.add('active');

        // Select default stock to avoid UI breaks
        const sourceList = getAssetsListByCategory(category);
        appState.selectedStockDetail = sourceList.length > 0 ? sourceList[0].ticker : null;

        renderMarketStocksList('all', '');
        renderStockDetailPane();
    }
    window.navigateToMarketCategory = navigateToMarketCategory;

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
        container.innerHTML = '<p class="text-muted text-center" style="font-size:12px;padding:20px;">Aucune transaction rÃƒÆ’Ã‚Â©cente.</p>';
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
            title = `DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t via ${t.method}`;
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
        labels = ['FÃƒÆ’Ã‚Â©v', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
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
            labels: ['Actions', 'LiquiditÃƒÆ’Ã‚Â©s XAF', 'Fonds GÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©s'],
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
                <span class="legend-label">LiquiditÃƒÆ’Ã‚Â©s</span>
            </div>
            <span class="legend-val">${sharesCash}% (${(cashValue / 1000).toFixed(0)}k)</span>
        </div>
        <div class="legend-item">
            <div class="legend-left">
                <span class="legend-dot" style="background-color:#fbbf24;"></span>
                <span class="legend-label">Fonds GÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©s</span>
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
// 7. MarchÃƒÆ’Ã‚Â© BVMAC (Actions / Obligations / FCP)
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

        const isFcp = appState.activeMarketCategory === 'fcp';
        const taglineHtml = isFcp && asset.tagline ? `<span style="font-size:10px;color:#3b82f6;font-style:italic;display:block;margin-top:2px;">${asset.tagline}</span>` : '';
        const detailBtnHtml = isFcp ? `<button class="btn-fund-details" data-ticker="${asset.ticker}" style="margin-top:6px;background:rgba(0,74,173,0.12);color:#60a5fa;border:1px solid rgba(0,74,173,0.25);padding:4px 10px;border-radius:6px;font-size:10px;font-weight:600;cursor:pointer;transition:all 0.2s;">Voir les détails</button>` : '';

        card.innerHTML = `
            <div class="stock-card-left">
                <span class="stock-card-symbol">${asset.name} <span style="font-size:10px;color:var(--text-muted);">(${asset.ticker})</span></span>
                <span class="stock-card-name">${asset.fullName}</span>
                ${taglineHtml}
            </div>
            <div class="stock-card-right" style="text-align:right;">
                <span class="stock-card-price">${formatXAF(asset.price)}</span>
                <span class="${changeClass}">${changeSign}${asset.change}%</span>
                ${detailBtnHtml}
            </div>
        `;

        card.addEventListener('click', (e) => {
            // Don't trigger detail pane if user clicked the fund details button
            if (e.target.classList.contains('btn-fund-details')) return;
            appState.selectedStockDetail = asset.ticker;
            renderMarketStocksList(sectorFilter, searchQuery);
            renderStockDetailPane();
        });

        // Wire up fund details button
        const detailBtn = card.querySelector('.btn-fund-details');
        if (detailBtn) {
            detailBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openFundDetailsModal(asset.ticker);
            });
        }

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
                <h4>SÃƒÆ’Ã‚Â©lectionnez une valeur</h4>
                <p>Cliquez sur l'une des valeurs listÃƒÆ’Ã‚Â©es ÃƒÆ’Ã‚Â  gauche pour afficher son graphique dÃƒÆ’Ã‚Â©taillÃƒÆ’Ã‚Â©, ses documents et passer un ordre.</p>
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
        tradingPanelCtaText = "Souscrivez ÃƒÆ’Ã‚Â  cet emprunt";
        detailMetricsHtml = `
            <div class="detail-stat-box">
                <span class="detail-stat-label">Coupon Nominal</span>
                <span class="detail-stat-value">${asset.ratios.yield.value}</span>
            </div>
            <div class="detail-stat-box">
                <span class="detail-stat-label">MaturitÃƒÆ’Ã‚Â©</span>
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
                <span class="detail-stat-label">DisponibilitÃƒÆ’Ã‚Â©</span>
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
                <h4>Documents officiels ÃƒÆ’Ã‚Â  disposition</h4>
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
                <span class="detail-sector">${asset.sector} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ MarchÃƒÆ’Ã‚Â© BVMAC</span>
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
                    <p class="trading-desc">${tradingPanelCtaText} instantanÃƒÆ’Ã‚Â©ment en utilisant votre solde XAF.</p>
                    
                    <div class="user-position-widget" style="background:rgba(255,255,255,0.01);border:1px solid var(--border-color);border-radius:8px;padding:12px;margin-bottom:16px;">
                        <span style="font-size:10px;color:var(--text-muted);display:block;text-transform:uppercase;">Votre encours</span>
                        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;">
                            <span>UnitÃƒÆ’Ã‚Â©s dÃƒÆ’Ã‚Â©tenues: <strong style="color:var(--text-primary);">${ownedQty}</strong></span>
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
        alert(`TÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©chargement du fichier "${doc.title}" initiÃƒÆ’Ã‚Â©.\nCe document a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© cryptÃƒÆ’Ã‚Â© par AGIR Shield.`);
        modal.classList.remove('active');
        logSecurityEvent(`TÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©chargement de document: ${doc.title}`, 'Success');
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
    groupFCP.label = 'Fonds GÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©s';
    BVMAC_FCP.forEach(fcp => {
        const option = document.createElement('option');
        option.value = fcp.ticker;
        option.innerText = `${fcp.name} (Fonds GÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©s - ${fcp.ratios.yield.value})`;
        groupFCP.appendChild(option);
    });
    select.appendChild(groupFCP);

    // Load Bonds
    const groupBonds = document.createElement('optgroup');
    groupBonds.label = 'Obligations d\'ÃƒÆ’Ã¢â‚¬Â°tat';
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
// 9. Plans ProgrammÃƒÆ’Ã‚Â©s (PIP) Controllers
// ==========================================================================
function renderSavingsVaults() {
    const container = document.getElementById('active-vaults-container');
    container.innerHTML = '';

    appState.vaults.forEach(vault => {
        const card = document.createElement('div');
        card.className = 'vault-card glass-card';

        const percent = ((vault.balance / vault.target) * 100).toFixed(0);
        const isLocked = vault.type === 'locked';
        const statusLabel = isLocked ? 'BloquÃƒÆ’Ã‚Â©' : 'Flexible';
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
                    <span class="vault-bal-label">Solde AllouÃƒÆ’Ã‚Â©</span>
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
                alert("SÃƒÆ’Ã‚Â©curitÃƒÆ’Ã‚Â© Shield : Code PIN incorrect.");
                return;
            }

            if (amount < 1000) {
                alert("Le montant minimum d'investissement automatique est de 1 000 FCFA.");
                return;
            }

            logSecurityEvent(`Plan PIP activÃƒÆ’Ã‚Â© (${amount} FCFA vers ${assetData.name})`, 'Success');
            triggerNotification('trade-alert', 'Plan PIP activÃƒÆ’Ã‚Â©', `Un prÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â¨vement pÃƒÆ’Ã‚Â©riodique de ${formatXAF(amount)} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© configurÃƒÆ’Ã‚Â© avec succÃƒÆ’Ã‚Â¨s vers ${assetData.fullName}.`);
            alert(`Votre Plan d'Investissement ProgrammÃƒÆ’Ã‚Â© (PIP) a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© configurÃƒÆ’Ã‚Â© avec succÃƒÆ’Ã‚Â¨s !\nMontant : ${formatXAF(amount)}\nCible : ${assetData.name}\nFrÃƒÆ’Ã‚Â©quence : ${appState.activeFrequency}.`);
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

            logSecurityEvent(`Plan PIP crÃƒÆ’Ã‚Â©ÃƒÆ’Ã‚Â©: ${name}`, 'Success');
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
    else if (appState.investorRiskProfile === 'ÃƒÆ’Ã¢â‚¬Â°QUILIBRÃƒÆ’Ã¢â‚¬Â°') riskBadge.classList.add('equilibre');
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
            desc = 'Vous privilÃƒÆ’Ã‚Â©giez la protection de votre capital et la stabilitÃƒÆ’Ã‚Â©. Les fluctuations vous rendent mal ÃƒÆ’Ã‚Â  l\'aise.';
            linksHtml = `
                <a href="#" class="recommend-link link-redirect-market" data-ticker="ECMR">ECMR 6.25% (Obligation)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="AGFL">AGIR Flex (FCP Liquide - 5.8%)</a>
            `;
        } else if (totalScore <= 7) {
            profile = 'ÃƒÆ’Ã¢â‚¬Â°QUILIBRÃƒÆ’Ã¢â‚¬Â°';
            desc = 'Vous recherchez un juste milieu entre croissance ÃƒÆ’Ã‚Â  moyen terme et volatilitÃƒÆ’Ã‚Â© modÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©e.';
            linksHtml = `
                <a href="#" class="recommend-link link-redirect-market" data-ticker="AGTE">AGIR Team (FCP - 7.2%)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="EOTG">EOTG 6.5% (Obligation)</a>
            `;
        } else {
            profile = 'DYNAMIQUE';
            desc = 'Vous recherchez une performance ÃƒÆ’Ã‚Â©levÃƒÆ’Ã‚Â©e et comprenez les cycles financiers. Les actions et les FCP diversifiÃƒÆ’Ã‚Â©s sont faits pour vous.';
            linksHtml = `
                <a href="#" class="recommend-link link-redirect-market" data-ticker="BANG">BANGE (Banque - P/E 8.2x)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="SOCA">SOCAPALM (Agro - Yield 7.8%)</a>
                <a href="#" class="recommend-link link-redirect-market" data-ticker="AGOB">AGIR Objectif (FCP Actions - 8.5%)</a>
            `;
        }

        appState.investorRiskProfile = profile;
        
        // Show result box
        document.getElementById('result-profile-title').innerText = `Profil DÃƒÆ’Ã‚Â©terminÃƒÆ’Ã‚Â© : ${profile}`;
        document.getElementById('result-profile-desc').innerText = desc;
        
        const linksBox = document.getElementById('result-recommended-assets');
        linksBox.innerHTML = linksHtml;
        document.getElementById('quiz-result-display').style.display = 'block';

        // Update profile header badge
        renderProfileView();

        // Log audit event
        logSecurityEvent(`Calcul profil d'investisseur: ${profile}`, 'Success');
        triggerNotification('market-alert', 'Profil investisseur mis ÃƒÆ’Ã‚Â  jour', `Votre questionnaire a classifiÃƒÆ’Ã‚Â© votre profil en : ${profile}. Vos recommandations ont ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© recalibrÃƒÆ’Ã‚Â©es.`);

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
        container.innerHTML = '<p class="text-muted text-center" style="font-size:12px;padding:40px;">Aucune notification reÃƒÆ’Ã‚Â§ue.</p>';
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
            logSecurityEvent("Notifications marquÃƒÆ’Ã‚Â©es comme lues", "Success");
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
            '<span class="subscription-badge pro" style="font-size:9px;box-shadow:none;">SÃƒÆ’Ã‚Â©curisÃƒÆ’Ã‚Â©</span>' : 
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
                logSecurityEvent("PIN de transaction mis ÃƒÆ’Ã‚Â  jour", "Success");
                alert("Votre PIN de transaction a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© mis ÃƒÆ’Ã‚Â  jour avec succÃƒÆ’Ã‚Â¨s.");
            } else {
                alert("Erreur: Le code PIN doit ÃƒÆ’Ã‚Âªtre composÃƒÆ’Ã‚Â© d'exactement 4 chiffres.");
            }
        });
    }

    const refreshLogsBtn = document.getElementById('btn-refresh-audit-logs');
    if (refreshLogsBtn) {
        refreshLogsBtn.addEventListener('click', () => {
            logSecurityEvent("Audit Shield rafraÃƒÆ’Ã‚Â®chi", "Success");
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
            document.getElementById('cash-modal-title').innerText = "DÃƒÆ’Ã‚Â©poser des fonds";
            document.getElementById('btn-submit-cash-action').innerText = "Confirmer le dÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t";
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
        'XAF': { rate: 1.0, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¨ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â²', name: 'Franc CFA (CEMAC)' },
        'XOF': { rate: 1.0, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¸ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â³', name: 'Franc CFA (UEMOA)' },
        'EUR': { rate: 655.9570, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚ÂªÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Âº', name: 'Euro' },
        'USD': { rate: 605.5000, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚ÂºÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¸', name: 'Dollar AmÃƒÆ’Ã‚Â©ricain' },
        'GBP': { rate: 770.2000, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¬ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â§', name: 'Livre Sterling' },
        'NGN': { rate: 0.4000, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â³ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¬', name: 'Naira NigÃƒÆ’Ã‚Â©rian' },
        'ZAR': { rate: 32.5000, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¿ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¦', name: 'Rand Sud-Africain' },
        'KES': { rate: 4.7000, flag: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â°ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Âª', name: 'Shilling Kenyan' }
    };

    const currencySelect = document.getElementById('cash-modal-currency');
    const fxRateDisplay = document.getElementById('cash-modal-fx-display');
    const conversionBox = document.getElementById('cash-modal-conversion-box');
    const amountLabel = document.getElementById('amount-input-label');
    const amountSuffix = document.getElementById('cash-modal-suffix');
    const cardField = document.getElementById('card-form-field');
    const amountInput = document.getElementById('cash-modal-amount');
    const pinField = document.getElementById('cash-modal-pin');
    const gatewaySection = document.getElementById('cash-modal-gateway-section');

    function updateFXDepositMetrics() {
        if (!currencySelect || !amountInput) return;
        
        const currency = currencySelect.value;
        const rateInfo = clientRates[currency];
        if (!rateInfo) return;

        const rate = rateInfo.rate;
        const amount = parseFloat(amountInput.value) || 0;

        if (currency === 'XAF' || currency === 'XOF') {
            if (fxRateDisplay) fxRateDisplay.style.display = 'none';
            if (conversionBox) conversionBox.style.display = 'none';
            if (phoneField) phoneField.style.display = 'block';
            if (cardField) cardField.style.display = 'none';
            if (gatewaySection) gatewaySection.style.display = 'block';
            if (amountLabel) amountLabel.innerText = `Montant (${currency})`;
            if (amountSuffix) amountSuffix.innerText = currency === 'XAF' ? 'FCFA' : 'F.CFA';
        } else {
            if (fxRateDisplay) {
                fxRateDisplay.style.display = 'block';
                fxRateDisplay.innerText = `1 ${currency} = ${rate.toFixed(2)} FCFA (Taux en direct)`;
            }
            if (conversionBox) conversionBox.style.display = 'block';
            if (phoneField) phoneField.style.display = 'none';
            if (cardField) cardField.style.display = 'block';
            if (gatewaySection) gatewaySection.style.display = 'none';
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

    // Reorganised Currency Flag Cards grid handler
    const currencyFlagCards = document.querySelectorAll('#deposit-currency-grid .currency-flag-card');
    const countryPrefixSelect = document.getElementById('cash-modal-country-prefix');
    
    currencyFlagCards.forEach(card => {
        card.addEventListener('click', () => {
            currencyFlagCards.forEach(c => {
                c.classList.remove('active');
                c.style.background = 'rgba(255, 255, 255, 0.02)';
                c.style.borderColor = 'var(--border-color)';
                const tag = c.querySelector('.currency-tag');
                if (tag) tag.style.color = 'var(--text-secondary)';
            });

            card.classList.add('active');
            card.style.background = 'rgba(212, 175, 55, 0.08)';
            card.style.borderColor = 'var(--primary)';
            const tag = card.querySelector('.currency-tag');
            if (tag) tag.style.color = 'var(--primary)';

            const selectedCurrency = card.getAttribute('data-currency');
            if (currencySelect) {
                currencySelect.value = selectedCurrency;
                currencySelect.dispatchEvent(new Event('change'));
            }

            // Automatically set default country prefixes based on selected currency
            if (countryPrefixSelect) {
                if (selectedCurrency === 'XAF') {
                    countryPrefixSelect.value = '+237'; // Cameroon
                } else if (selectedCurrency === 'XOF') {
                    countryPrefixSelect.value = '+221'; // Senegal
                } else if (selectedCurrency === 'NGN') {
                    countryPrefixSelect.value = '+234'; // Nigeria
                } else if (selectedCurrency === 'ZAR') {
                    countryPrefixSelect.value = '+27';  // South Africa
                } else if (selectedCurrency === 'KES') {
                    countryPrefixSelect.value = '+254'; // Kenya
                } else if (selectedCurrency === 'USD') {
                    countryPrefixSelect.value = '+1';   // US
                } else if (selectedCurrency === 'GBP') {
                    countryPrefixSelect.value = '+44';  // UK
                } else if (selectedCurrency === 'EUR') {
                    countryPrefixSelect.value = '+33';  // France
                }
            }
        });
    });

    // USSD SIM Push Dialog controllers
    const ussdDialog = document.getElementById('ussd-push-dialog');
    const btnUssdCancel = document.getElementById('btn-ussd-cancel');
    const btnUssdConfirm = document.getElementById('btn-ussd-confirm');
    const ussdPinInput = document.getElementById('ussd-pin-input');
    let pendingDepositData = null;

    if (btnUssdCancel) {
        btnUssdCancel.addEventListener('click', () => {
            if (ussdDialog) ussdDialog.style.display = 'none';
            pendingDepositData = null;
        });
    }

    if (btnUssdConfirm) {
        btnUssdConfirm.addEventListener('click', () => {
            const ussdPin = ussdPinInput ? ussdPinInput.value : '';
            if (!ussdPin || ussdPin.length < 4) {
                alert("Erreur: Veuillez saisir votre code PIN opÃƒÆ’Ã‚Â©rateur (4 ÃƒÆ’Ã‚Â  6 chiffres).");
                return;
            }

            if (ussdDialog) ussdDialog.style.display = 'none';

            if (pendingDepositData) {
                const { amountXaf, amountLocal, currency, gateway } = pendingDepositData;
                appState.cashBalance += amountXaf;
                appState.transactions.unshift({
                    type: 'deposit',
                    method: gateway,
                    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    amount: amountXaf
                });

                logSecurityEvent(`DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t de ${amountLocal} ${currency} (${formatXAF(amountXaf)} net) validÃƒÆ’Ã‚Â© via USSD Push [PIN vÃƒÆ’Ã‚Â©rifiÃƒÆ’Ã‚Â©]`, "Success");
                triggerNotification('trade-alert', 'DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t validÃƒÆ’Ã‚Â©', `Votre recharge de ${amountLocal} ${currency} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© crÃƒÆ’Ã‚Â©ditÃƒÆ’Ã‚Â©e en ${formatXAF(amountXaf)} via ${gateway}.`);
                alert(`Recharge Mobile Money rÃƒÆ’Ã‚Â©ussie !\nVotre compte a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© crÃƒÆ’Ã‚Â©ditÃƒÆ’Ã‚Â© de ${formatXAF(amountXaf)}.`);

                updateUIBalances();
                renderRecentTransactions();
                renderDashboardCharts();

                pendingDepositData = null;
                closeModal('cash-modal');
            }
        });
    }

    const submitBtn = document.getElementById('btn-submit-cash-action');
    submitBtn.addEventListener('click', () => {
        const currency = currencySelect ? currencySelect.value : 'XAF';
        const rateInfo = clientRates[currency];
        const rate = rateInfo ? rateInfo.rate : 1.0;
        const amountLocal = parseFloat(amountInput.value) || 0;
        
        const pin = pinField ? pinField.value : '';
        if (pin !== '0000') {
            alert("SÃƒÆ’Ã‚Â©curitÃƒÆ’Ã‚Â© Shield: Code PIN de transaction incorrect.");
            return;
        }

        if (amountLocal <= 0) {
            alert("Erreur: Veuillez saisir un montant supÃƒÆ’Ã‚Â©rieur ÃƒÆ’Ã‚Â  0.");
            return;
        }

        const amountXaf = amountLocal * rate;
        const feesXaf = (currency === 'XAF' || currency === 'XOF') ? 0 : Math.round(amountXaf * 0.005);
        const netCreditedXaf = amountXaf - feesXaf;

        // Route Payment Gateway description
        const activeMethodCard = document.querySelector('.payment-method-card.active');
        const method = activeMethodCard ? activeMethodCard.getAttribute('data-method') : 'momo';
        const methodLabels = {
            'momo': 'MTN MoMo',
            'om': 'Orange Money',
            'airtel': 'Airtel Money',
            'moov': 'Moov Money',
            'wave': 'Wave',
            'eu': 'Express Union'
        };
        
        let gateway = methodLabels[method] || 'MTN MoMo';
        if (currency !== 'XAF' && currency !== 'XOF') {
            gateway = (currency === 'USD' || currency === 'EUR') ? 'Stripe Gateway' : 'Flutterwave Hub';
        }

        // 1. Calculate spent amounts in the last 24h and 30 days from logs
        const nowMs = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        const thirtyDaysMs = 30 * oneDayMs;

        let spentToday = 0;
        let spentMonth = 0;

        appState.transactions.forEach(tx => {
            if (tx.type === 'deposit' || tx.type === 'withdraw') {
                const txTime = new Date(tx.date).getTime();
                const diff = nowMs - txTime;
                if (!isNaN(diff)) {
                    if (diff <= oneDayMs) {
                        spentToday += tx.amount;
                    }
                    if (diff <= thirtyDaysMs) {
                        spentMonth += tx.amount;
                    }
                }
            }
        });

        // 2. KYC Compliance & Limits checking
        if (appState.kycStatus === 'unverified') {
            alert("ConformitÃƒÆ’Ã‚Â© LCB-FT: Votre compte n'est pas vÃƒÆ’Ã‚Â©rifiÃƒÆ’Ã‚Â©. Veuillez soumettre vos justificatifs d'identitÃƒÆ’Ã‚Â© (CNI / Passeport) dans votre profil avant tout dÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t.");
            return;
        }

        const txValueXaf = activeCashType === 'deposit' ? netCreditedXaf : amountXaf;

        if (appState.kycStatus === 'pending') {
            if (activeCashType === 'withdraw') {
                alert("ConformitÃƒÆ’Ã‚Â© COBAC: Les retraits sont suspendus tant que vos documents de sÃƒÆ’Ã‚Â©curitÃƒÆ’Ã‚Â© sont en cours de validation.");
                return;
            }
            if (activeCashType === 'deposit' && (spentToday + txValueXaf) > 50000) {
                alert(`DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t bloquÃƒÆ’Ã‚Â© ! En statut KYC en attente, le montant total cumulÃƒÆ’Ã‚Â© de vos dÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´ts ne peut excÃƒÆ’Ã‚Â©der 50 000 FCFA.\nActuellement dÃƒÆ’Ã‚Â©posÃƒÆ’Ã‚Â© sur 24h : ${formatXAF(spentToday)}.`);
                return;
            }
        }

        // Standard caps validation
        if ((spentToday + txValueXaf) > appState.limitDailyXaf) {
            alert(`Alerte de conformitÃƒÆ’Ã‚Â©: Limite quotidienne de transaction dÃƒÆ’Ã‚Â©passÃƒÆ’Ã‚Â©e. Maximum autorisÃƒÆ’Ã‚Â©: ${formatXAF(appState.limitDailyXaf)}.`);
            return;
        }
        if ((spentMonth + txValueXaf) > appState.limitMonthlyXaf) {
            alert(`Alerte de conformitÃƒÆ’Ã‚Â©: Limite mensuelle de transaction dÃƒÆ’Ã‚Â©passÃƒÆ’Ã‚Â©e. Maximum autorisÃƒÆ’Ã‚Â©: ${formatXAF(appState.limitMonthlyXaf)}.`);
            return;
        }

        if (activeCashType === 'deposit') {
            if (currency === 'XAF' || currency === 'XOF') {
                // Initiates dynamic USSD Push dialogue simulation
                const prefixSelect = document.getElementById('cash-modal-country-prefix');
                const prefix = prefixSelect ? prefixSelect.value : '+237';
                const phone = document.getElementById('cash-modal-phone').value || '677890123';
                const fullPhone = prefix + ' ' + phone;

                pendingDepositData = {
                    amountXaf: netCreditedXaf,
                    amountLocal: amountLocal,
                    currency: currency,
                    gateway: gateway
                };

                if (ussdDialog) {
                    document.getElementById('ussd-operator-name').innerText = gateway;
                    const formattedAmountText = currency === 'XAF' ? formatXAF(amountLocal) : `${amountLocal} ${currency}`;
                    document.getElementById('ussd-push-message').innerText = `Autoriser le dÃƒÆ’Ã‚Â©bit de ${formattedAmountText} initiÃƒÆ’Ã‚Â© par AGIR FinTech vers le numÃƒÆ’Ã‚Â©ro ${fullPhone} ?`;
                    if (ussdPinInput) ussdPinInput.value = '';
                    ussdDialog.style.display = 'flex';
                }
                return; // Early return, wait for operator USSD PIN verification!
            } else {
                // Card / Stripe deposits execute directly
                appState.cashBalance += netCreditedXaf;
                appState.transactions.unshift({
                    type: 'deposit',
                    method: gateway,
                    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    amount: netCreditedXaf
                });
                logSecurityEvent(`DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t de ${amountLocal} ${currency} (${formatXAF(netCreditedXaf)} net) via ${gateway}`, "Success");
                triggerNotification('trade-alert', 'DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t validÃƒÆ’Ã‚Â©', `Votre recharge de ${amountLocal} ${currency} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© crÃƒÆ’Ã‚Â©ditÃƒÆ’Ã‚Â©e en ${formatXAF(netCreditedXaf)} via ${gateway}.`);
                alert(`DÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t rÃƒÆ’Ã‚Â©ussi !\nVotre solde a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© crÃƒÆ’Ã‚Â©ditÃƒÆ’Ã‚Â© de ${formatXAF(netCreditedXaf)}.`);
            }
        } else {
            if (appState.cashBalance < amountXaf) {
                alert("Solde insuffisant.");
                return;
            }

            // High withdrawal trigger Double-Factor (2FA) SMS confirmation
            if (amountXaf > 100000) {
                const modal2FA = document.getElementById('withdrawal-2fa-modal');
                const otpInput2FA = document.getElementById('withdrawal-2fa-code');
                if (otpInput2FA) otpInput2FA.value = '';
                
                pendingWithdrawalData = {
                    amountLocal: amountLocal,
                    currency: currency,
                    amountXaf: amountXaf,
                    gateway: gateway,
                    destination: document.getElementById('cash-modal-phone').value || 'RIB Bancaire'
                };

                if (modal2FA) modal2FA.style.display = 'flex';
                return; // Wait for 2FA validation!
            }

            // Standard low withdrawal executes directly
            appState.cashBalance -= amountXaf;
            appState.transactions.unshift({
                type: 'withdraw',
                method: gateway,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                amount: amountXaf
            });
            logSecurityEvent(`Retrait de ${amountLocal} ${currency} (${formatXAF(amountXaf)}) vers ${gateway}`, "Success");
            triggerNotification('trade-alert', 'Retrait validÃƒÆ’Ã‚Â©', `Un retrait de ${amountLocal} ${currency} (${formatXAF(amountXaf)}) a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© dÃƒÆ’Ã‚Â©bitÃƒÆ’Ã‚Â© vers ${gateway}.`);
            alert(`Retrait rÃƒÆ’Ã‚Â©ussi !\nUn montant de ${formatXAF(amountXaf)} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© dÃƒÆ’Ã‚Â©bitÃƒÆ’Ã‚Â©.`);
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
        document.getElementById('trade-qty-label').innerText = "Nombre d'unitÃƒÆ’Ã‚Â©s / Parts";
    }

    const amountInput = document.getElementById('trade-amount-input');
    const qtyInput = document.getElementById('trade-quantity');

    if (type === 'buy') {
        buyBtn.classList.add('active');
        sellBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Souscription / Achat d'actifs";
        submitBtn.innerText = "Confirmer l'investissement";
        document.getElementById('trade-total-label').innerText = "Montant Total EstimÃƒÆ’Ã‚Â©";
        if (amountInput) amountInput.value = asset.price;
        if (qtyInput) qtyInput.value = "1.0000";
    } else {
        sellBtn.classList.add('active');
        buyBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Vente / Retrait d'actifs";
        submitBtn.innerText = "Confirmer la cession";
        document.getElementById('trade-total-label').innerText = "CrÃƒÆ’Ã‚Â©dit EstimÃƒÆ’Ã‚Â© (net de frais)";
        const holding = appState.portfolio.find(p => p.ticker === ticker);
        const holdQty = holding ? holding.qty : 0;
        if (qtyInput) qtyInput.value = holdQty.toFixed(4);
        if (amountInput) amountInput.value = Math.round(holdQty * asset.price);
    }

    updateTradeCalculations();
    openModal('trade-modal');
}

function updateTradeCalculations() {
    const asset = findAssetInDB(activeTradeTicker);
    if (!asset) return;

    const qtyInput = document.getElementById('trade-quantity');
    let qty = parseFloat(qtyInput.value) || 0;
    if (qty < 0.0001) {
        qty = 0.0001;
        qtyInput.value = "0.0001";
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
            fxRateDisplay.innerText = `1 ${currency} = ${rate.toFixed(2)} FCFA (Taux BVMAC BloquÃƒÆ’Ã‚Â©)`;
            localCostRow.style.display = 'flex';
            
            const costLocal = total / rate;
            localCostValue.innerText = `${costLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${currency}`;
        }
    }
}

function setupTradeModal() {
    const qtyInput = document.getElementById('trade-quantity');
    const amountInput = document.getElementById('trade-amount-input');

    if (qtyInput && amountInput) {
        qtyInput.addEventListener('input', () => {
            const asset = findAssetInDB(activeTradeTicker);
            if (!asset) return;
            const qty = parseFloat(qtyInput.value) || 0;
            amountInput.value = Math.round(qty * asset.price);
            updateTradeCalculations();
        });

        amountInput.addEventListener('input', () => {
            const asset = findAssetInDB(activeTradeTicker);
            if (!asset) return;
            const amt = parseFloat(amountInput.value) || 0;
            const qty = amt / asset.price;
            qtyInput.value = qty.toFixed(4);
            updateTradeCalculations();
        });
    }

    const currencySelect = document.getElementById('trade-currency');
    if (currencySelect) {
        currencySelect.addEventListener('change', updateTradeCalculations);
    }

    const buyBtn = document.getElementById('trade-type-buy');
    const sellBtn = document.getElementById('trade-type-sell');

    buyBtn.addEventListener('click', () => {
        const asset = findAssetInDB(activeTradeTicker);
        if (!asset) return;
        activeTradeType = 'buy';
        buyBtn.classList.add('active');
        sellBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Souscription / Achat d'actifs";
        document.getElementById('btn-submit-trade').innerText = "Confirmer l'investissement";
        document.getElementById('trade-total-label').innerText = "Montant Total EstimÃƒÆ’Ã‚Â©";
        if (amountInput) amountInput.value = asset.price;
        if (qtyInput) qtyInput.value = "1.0000";
        updateTradeCalculations();
    });

    sellBtn.addEventListener('click', () => {
        const holding = appState.portfolio.find(p => p.ticker === activeTradeTicker);
        if (!holding || holding.qty <= 0) {
            alert("Erreur: Vous ne dÃƒÆ’Ã‚Â©tenez pas cet actif.");
            return;
        }
        const asset = findAssetInDB(activeTradeTicker);
        if (!asset) return;
        
        activeTradeType = 'sell';
        sellBtn.classList.add('active');
        buyBtn.classList.remove('active');
        document.getElementById('trade-modal-title').innerText = "Vente / Retrait d'actifs";
        document.getElementById('btn-submit-trade').innerText = "Confirmer la cession";
        document.getElementById('trade-total-label').innerText = "CrÃƒÆ’Ã‚Â©dit EstimÃƒÆ’Ã‚Â© (net de frais)";
        if (qtyInput) qtyInput.value = holding.qty.toFixed(4);
        if (amountInput) amountInput.value = Math.round(holding.qty * asset.price);
        updateTradeCalculations();
    });

    const submitBtn = document.getElementById('btn-submit-trade');
    submitBtn.addEventListener('click', () => {
        const asset = findAssetInDB(activeTradeTicker);
        const qty = parseFloat(document.getElementById('trade-quantity').value) || 0;
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
            logSecurityEvent(`ÃƒÆ’Ã¢â‚¬Â°chec d'ordre: PIN incorrect`, "Failure");
            alert("SÃƒÆ’Ã‚Â©curitÃƒÆ’Ã‚Â© Shield : Code PIN incorrect.");
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
            triggerNotification('trade-alert', 'Investissement validÃƒÆ’Ã‚Â©', `Votre souscription pour ${qty} unitÃƒÆ’Ã‚Â©s de ${asset.name} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© enregistrÃƒÆ’Ã‚Â©e.`);
            alert(`Investissement exÃƒÆ’Ã‚Â©cutÃƒÆ’Ã‚Â© avec succÃƒÆ’Ã‚Â¨s !\nMontant dÃƒÆ’Ã‚Â©bitÃƒÆ’Ã‚Â© : ${costLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${currency} (ÃƒÆ’Ã‚Â©quivalent ${formatXAF(total)}).\nVous dÃƒÆ’Ã‚Â©tenez dÃƒÆ’Ã‚Â©sormais des parts de ${asset.fullName}.`);

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
            triggerNotification('trade-alert', 'Retrait / Vente validÃƒÆ’Ã‚Â©', `La revente de ${qty} unitÃƒÆ’Ã‚Â©s de ${asset.name} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© exÃƒÆ’Ã‚Â©cutÃƒÆ’Ã‚Â©e. Votre solde a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© crÃƒÆ’Ã‚Â©ditÃƒÆ’Ã‚Â©.`);
            alert(`Ordre de cession exÃƒÆ’Ã‚Â©cutÃƒÆ’Ã‚Â© !\nVos liquiditÃƒÆ’Ã‚Â©s ont ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© crÃƒÆ’Ã‚Â©ditÃƒÆ’Ã‚Â©es de ${formatXAF(total)} (soit ${costLocal.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${currency}).`);
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
            alert("Veuillez saisir votre numÃƒÆ’Ã‚Â©ro.");
            return;
        }

        checkoutForm.style.display = 'none';
        productDetails.style.display = 'none';
        modalFooter.style.display = 'none';
        processingScreen.style.display = 'flex';

        statusTitle.innerText = "Initialisation de l'API de Routage CEMAC...";
        statusDesc.innerText = "Connexion sÃƒÆ’Ã‚Â©curisÃƒÆ’Ã‚Â©e aux serveurs opÃƒÆ’Ã‚Â©rateurs locaux...";

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
            statusDesc.innerText = "Enregistrement de la clÃƒÆ’Ã‚Â© de licence AGIR Shield...";

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

                logSecurityEvent("Abonnement AGIR Pro AI activÃƒÆ’Ã‚Â©", "Success");
                triggerNotification('security-alert', 'Licence Pro AI dÃƒÆ’Ã‚Â©bloquÃƒÆ’Ã‚Â©e', 'Votre accÃƒÆ’Ã‚Â¨s aux fonctionnalitÃƒÆ’Ã‚Â©s prÃƒÆ’Ã‚Â©dictives d\'AGIR Pro est maintenant validÃƒÆ’Ã‚Â©.');
                alert("Souscription rÃƒÆ’Ã‚Â©ussie ! Bienvenue sur AGIR Pro AI.");

                closeModal('subscription-checkout-modal');
                resetCheckoutScreen();
                
                checkAISubscriptionState();
                updateUIBalances();
                renderRecentTransactions();
                renderDashboardCharts();
            }, 1200);

        } else {
            alert("Code incorrect. Utilisez '1234' pour simuler la rÃƒÆ’Ã‚Â©ussite.");
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

// KYC compliance state variables and 2FA withdrawal buffers
let pendingWithdrawalData = null;

function updateKycUI() {
    const kycBadge = document.getElementById('profile-kyc-badge');
    const uploadPanel = document.getElementById('kyc-upload-panel');
    if (!kycBadge) return;

    if (appState.kycStatus === 'unverified') {
        kycBadge.className = "kyc-badge unverified";
        kycBadge.style.background = "rgba(239, 68, 68, 0.1)";
        kycBadge.style.color = "#ef4444";
        kycBadge.innerHTML = `<i data-lucide="shield-alert" style="width: 12px; height: 12px; margin-right: 4px;"></i> Non VÃƒÆ’Ã‚Â©rifiÃƒÆ’Ã‚Â©`;
        if (uploadPanel) uploadPanel.style.display = "block";
    } else if (appState.kycStatus === 'pending') {
        kycBadge.className = "kyc-badge pending";
        kycBadge.style.background = "rgba(245, 158, 11, 0.1)";
        kycBadge.style.color = "#f59e0b";
        kycBadge.innerHTML = `<i data-lucide="clock" style="width: 12px; height: 12px; margin-right: 4px;"></i> En Attente`;
        if (uploadPanel) uploadPanel.style.display = "block";
    } else if (appState.kycStatus === 'verified') {
        kycBadge.className = "kyc-badge verified";
        kycBadge.style.background = "rgba(16, 185, 129, 0.1)";
        kycBadge.style.color = "#10b981";
        kycBadge.innerHTML = `<i data-lucide="shield-check" style="width: 12px; height: 12px; margin-right: 4px;"></i> VÃƒÆ’Ã‚Â©rifiÃƒÆ’Ã‚Â© (CEMAC)`;
        if (uploadPanel) uploadPanel.style.display = "none";
    }
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

function setupKycAnd2FA() {
    // 1. KYC Submission
    const btnSubmitKyc = document.getElementById('btn-submit-kyc-docs');
    const kycDocInput = document.getElementById('kyc-doc-name');

    if (btnSubmitKyc) {
        btnSubmitKyc.addEventListener('click', () => {
            const docName = kycDocInput ? kycDocInput.value.trim() : '';
            if (!docName) {
                alert("Erreur: Veuillez saisir le numÃƒÆ’Ã‚Â©ro de votre piÃƒÆ’Ã‚Â¨ce d'identitÃƒÆ’Ã‚Â©.");
                return;
            }

            // Simulate submission
            appState.kycStatus = 'pending';
            updateKycUI();

            logSecurityEvent(`Soumission documents KYC: ${docName}`, "Success");
            triggerNotification('security-alert', 'Documents KYC reÃƒÆ’Ã‚Â§us', `Votre document ${docName} est en cours de rÃƒÆ’Ã‚Â©vision par l'administrateur. Limite d'essai de 50 000 FCFA activÃƒÆ’Ã‚Â©e.`);
            alert("VÃƒÆ’Ã‚Â©rification KYC initiÃƒÆ’Ã‚Â©e !\nVotre piÃƒÆ’Ã‚Â¨ce d'identitÃƒÆ’Ã‚Â© est en cours de validation par nos analystes conformitÃƒÆ’Ã‚Â© (dÃƒÆ’Ã‚Â©lai de traitement estimÃƒÆ’Ã‚Â© : 2 heures).\nUne limite d'essai de 50 000 FCFA de dÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â´t est temporairement disponible.");
            
            if (kycDocInput) kycDocInput.value = '';
        });
    }

    // 1.5. KYC Admin Approval Simulator
    const btnApproveKyc = document.getElementById('btn-approve-kyc-simulation');
    if (btnApproveKyc) {
        btnApproveKyc.addEventListener('click', () => {
            appState.kycStatus = 'verified';
            updateKycUI();

            logSecurityEvent("Approbation administrative du KYC", "Success");
            triggerNotification('security-alert', 'Compte KYC validÃƒÆ’Ã‚Â©', "FÃƒÆ’Ã‚Â©licitations, vos documents ont ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© approuvÃƒÆ’Ã‚Â©s par l'administrateur. Vos limites standard CEMAC sont maintenant actives.");
            alert("Compte vÃƒÆ’Ã‚Â©rifiÃƒÆ’Ã‚Â© avec succÃƒÆ’Ã‚Â¨s !\nVotre profil KYC a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© validÃƒÆ’Ã‚Â© par l'administration d'AGIR.\nVous pouvez dÃƒÆ’Ã‚Â©sormais dÃƒÆ’Ã‚Â©poser sans limite d'essai et effectuer des retraits.");
        });
    }

    // 2. Withdrawal 2FA Modal Close
    const btnCancel2FA = document.getElementById('btn-cancel-withdrawal-2fa');
    if (btnCancel2FA) {
        btnCancel2FA.addEventListener('click', () => {
            document.getElementById('withdrawal-2fa-modal').style.display = 'none';
            pendingWithdrawalData = null;
        });
    }

    // 3. Withdrawal 2FA Modal Confirm
    const btnConfirm2FA = document.getElementById('btn-confirm-withdrawal-2fa');
    const input2FACode = document.getElementById('withdrawal-2fa-code');

    if (btnConfirm2FA) {
        btnConfirm2FA.addEventListener('click', () => {
            const code = input2FACode ? input2FACode.value.trim() : '';
            if (code !== '123456') {
                alert("Code de vÃƒÆ’Ã‚Â©rification double-facteur (2FA) incorrect. Utilisez '123456' pour la simulation.");
                return;
            }

            // 2FA approved
            document.getElementById('withdrawal-2fa-modal').style.display = 'none';

            if (pendingWithdrawalData) {
                const { amountLocal, currency, amountXaf, gateway, destination } = pendingWithdrawalData;

                appState.cashBalance -= amountXaf;
                appState.transactions.unshift({
                    type: 'withdraw',
                    method: gateway,
                    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    amount: amountXaf
                });

                logSecurityEvent(`Retrait de ${amountLocal} ${currency} (${formatXAF(amountXaf)}) vers ${gateway} [2FA validÃƒÆ’Ã‚Â©]`, "Success");
                triggerNotification('trade-alert', 'Retrait validÃƒÆ’Ã‚Â© (2FA)', `Le retrait de ${amountLocal} ${currency} (${formatXAF(amountXaf)}) vers le compte ${destination} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© validÃƒÆ’Ã‚Â© aprÃƒÆ’Ã‚Â¨s double authentification.`);
                alert(`Retrait rÃƒÆ’Ã‚Â©ussi !\nUn virement de ${formatXAF(amountXaf)} a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© initiÃƒÆ’Ã‚Â© avec succÃƒÆ’Ã‚Â¨s vers ${gateway}.`);

                updateUIBalances();
                renderRecentTransactions();
                renderDashboardCharts();

                pendingWithdrawalData = null;
                closeModal('cash-modal');
            }
        });
    }
}

function setupAuthForm() {
    const authScreen = document.getElementById('auth-screen');
    const appLayout = document.querySelector('.app-layout');
    if (!authScreen) return;

    // Default visibility
    if (!appState.isAuthenticated) {
        authScreen.style.display = 'flex';
        if (appLayout) appLayout.style.display = 'none';
    } else {
        authScreen.style.display = 'none';
        if (appLayout) appLayout.style.display = 'flex';
    }

    // ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ DOM References ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
    const tabLogin = document.getElementById('auth-tab-login');
    const tabRegister = document.getElementById('auth-tab-register');
    const tabsContainer = document.getElementById('auth-tabs-container');
    const progressBar = document.getElementById('auth-progress-bar');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');

    const loginForm = document.getElementById('auth-login-form');
    const step1 = document.getElementById('auth-register-step1');
    const step2 = document.getElementById('auth-register-step2');
    const step3 = document.getElementById('auth-register-step3');

    const registerProfileType = document.getElementById('register-profile-type');
    const kycDocsPhysique = document.getElementById('kyc-docs-physique');
    const kycDocsMorale = document.getElementById('kyc-docs-morale');
    const kycStepTitle = document.getElementById('kyc-step-title');

    // ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Helper: show a specific auth step ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
    function showAuthStep(stepName) {
        if (loginForm) loginForm.style.display = 'none';
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'none';
        if (step3) step3.style.display = 'none';

        const dots = authScreen.querySelectorAll('.auth-step-dot');
        const lines = authScreen.querySelectorAll('.auth-step-line');
        dots.forEach(d => { d.style.background = 'rgba(212,175,55,0.15)'; });
        lines.forEach(l => { l.style.background = 'rgba(212,175,55,0.15)'; });

        if (stepName === 'login') {
            if (loginForm) loginForm.style.display = 'flex';
            if (tabsContainer) tabsContainer.style.display = 'block';
            if (progressBar) progressBar.style.display = 'none';
            if (authTitle) authTitle.textContent = 'Bienvenue sur AGIR';
            if (authSubtitle) authSubtitle.textContent = "Votre passerelle financiÃƒÆ’Ã‚Â¨re pour l'Afrique Centrale et le monde.";
        } else if (stepName === 'step1') {
            if (step1) step1.style.display = 'flex';
            if (tabsContainer) tabsContainer.style.display = 'block';
            if (progressBar) progressBar.style.display = 'flex';
            if (authTitle) authTitle.textContent = 'CrÃƒÆ’Ã‚Â©er votre compte';
            if (authSubtitle) authSubtitle.textContent = "ÃƒÆ’Ã¢â‚¬Â°tape 1/3 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Informations de base";
            if (dots[0]) dots[0].style.background = 'var(--primary)';
        } else if (stepName === 'step2') {
            if (step2) step2.style.display = 'flex';
            if (tabsContainer) tabsContainer.style.display = 'none';
            if (progressBar) progressBar.style.display = 'flex';
            if (authTitle) authTitle.textContent = "VÃƒÆ’Ã‚Â©rification d'identitÃƒÆ’Ã‚Â©";
            if (authSubtitle) authSubtitle.textContent = "ÃƒÆ’Ã¢â‚¬Â°tape 2/3 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Documents justificatifs";
            if (dots[0]) dots[0].style.background = 'var(--primary)';
            if (dots[1]) dots[1].style.background = 'var(--primary)';
            if (lines[0]) lines[0].style.background = 'var(--primary)';
        } else if (stepName === 'step3') {
            if (step3) step3.style.display = 'flex';
            if (tabsContainer) tabsContainer.style.display = 'none';
            if (progressBar) progressBar.style.display = 'flex';
            if (authTitle) authTitle.textContent = 'Dossier en cours de vÃƒÆ’Ã‚Â©rification';
            if (authSubtitle) authSubtitle.textContent = "ÃƒÆ’Ã¢â‚¬Â°tape 3/3 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Confirmation sous 24 heures";
            dots.forEach(d => { d.style.background = 'var(--primary)'; });
            lines.forEach(l => { l.style.background = 'var(--primary)'; });
        }

        if (window.lucide) lucide.createIcons();
    }

    // ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Tab Switchers ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            showAuthStep('login');
        });
        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            showAuthStep('step1');
        });
    }

    // ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Profile type toggle on Step 1 ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
    if (registerProfileType) {
        const lblRegisterName = document.getElementById('lbl-register-name');
        const registerName = document.getElementById('register-name');
        registerProfileType.addEventListener('change', () => {
            if (registerProfileType.value === 'physique') {
                if (lblRegisterName) lblRegisterName.textContent = 'Nom Complet';
                if (registerName) registerName.placeholder = 'Ex: Saunya Compta';
            } else {
                if (lblRegisterName) lblRegisterName.textContent = 'DÃƒÆ’Ã‚Â©nomination Sociale';
                if (registerName) registerName.placeholder = 'Ex: AGIR Fintech SA';
            }
        });
    }

    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    //  LOGIN BUTTON
    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    const btnLogin = document.getElementById('btn-auth-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            const identifier = document.getElementById('login-identifier')?.value.trim();
            const pass = document.getElementById('login-password')?.value;
            if (!identifier || !pass) { alert("Veuillez saisir votre email et votre mot de passe."); return; }

            appState.isAuthenticated = true;
            appState.userProfile.email = identifier;
            appState.userProfile.fullName = identifier.includes('@') ? identifier.split('@')[0].replace(/[._]/g, ' ') : identifier;
            appState.profileType = 'physique';
            if (appState.kycStatus === 'unverified') appState.kycStatus = 'verified';

            authScreen.style.display = 'none';
            if (appLayout) appLayout.style.display = 'flex';

            updateUIBalances();
            renderRecentTransactions();
            renderDashboardCharts();
            updateKycUI();
            if (typeof renderProfileView === 'function') renderProfileView();

            logSecurityEvent("Connexion utilisateur rÃƒÆ’Ã‚Â©ussie", "Success");
            triggerNotification('security-alert', 'Connexion sÃƒÆ’Ã‚Â©curisÃƒÆ’Ã‚Â©e', 'Nouvelle session ouverte avec succÃƒÆ’Ã‚Â¨s.');
            alert("Connexion rÃƒÆ’Ã‚Â©ussie ! Bienvenue sur AGIR.");
        });
    }

    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    //  STEP 1 ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ STEP 2
    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    const btnNextStep2 = document.getElementById('btn-register-next-step2');
    if (btnNextStep2) {
        btnNextStep2.addEventListener('click', () => {
            const name = document.getElementById('register-name')?.value.trim();
            const email = document.getElementById('register-email')?.value.trim();
            const pass = document.getElementById('register-password')?.value;
            const passConfirm = document.getElementById('register-password-confirm')?.value;
            const profileType = registerProfileType ? registerProfileType.value : 'physique';

            if (!name || !email || !pass) { alert("Veuillez remplir tous les champs obligatoires."); return; }
            if (pass.length < 8) { alert("Le mot de passe doit contenir au moins 8 caractÃƒÆ’Ã‚Â¨res."); return; }
            if (pass !== passConfirm) { alert("Les mots de passe ne correspondent pas."); return; }
            if (!email.includes('@') || !email.includes('.')) { alert("Adresse email invalide."); return; }

            appState.userProfile.fullName = name;
            appState.userProfile.email = email;
            appState.profileType = profileType;

            if (kycDocsPhysique && kycDocsMorale && kycStepTitle) {
                if (profileType === 'physique') {
                    kycDocsPhysique.style.display = 'flex';
                    kycDocsMorale.style.display = 'none';
                    kycStepTitle.textContent = "VÃƒÆ’Ã‚Â©rification d'identitÃƒÆ’Ã‚Â© ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Personne Physique";
                } else {
                    kycDocsPhysique.style.display = 'none';
                    kycDocsMorale.style.display = 'flex';
                    kycStepTitle.textContent = "VÃƒÆ’Ã‚Â©rification d'identitÃƒÆ’Ã‚Â© ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Personne Morale";
                }
            }

            showAuthStep('step2');
        });
    }

    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    //  STEP 2 ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ BACK TO STEP 1
    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    const btnBackStep1 = document.getElementById('btn-kyc-back-step1');
    if (btnBackStep1) {
        btnBackStep1.addEventListener('click', () => {
            showAuthStep('step1');
            if (tabsContainer) tabsContainer.style.display = 'block';
            if (tabRegister) tabRegister.classList.add('active');
            if (tabLogin) tabLogin.classList.remove('active');
        });
    }

    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    //  STEP 2 ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ SUBMIT KYC DOCUMENTS
    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    const btnKycSubmit = document.getElementById('btn-kyc-submit');
    if (btnKycSubmit) {
        btnKycSubmit.addEventListener('click', () => {
            const phone = document.getElementById('kyc-phone')?.value.trim();
            const bankAccount = document.getElementById('kyc-bank-account')?.value.trim();
            const profileType = appState.profileType;

            if (!phone) { alert("Veuillez saisir votre numÃƒÆ’Ã‚Â©ro de tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©phone."); return; }
            if (!bankAccount) { alert("Veuillez saisir votre numÃƒÆ’Ã‚Â©ro de compte bancaire."); return; }

            if (profileType === 'physique') {
                const cniRecto = document.getElementById('kyc-cni-recto');
                const planDomicile = document.getElementById('kyc-plan-domicile');
                const selfie = document.getElementById('kyc-selfie');

                if (!cniRecto?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser le scan de votre Passeport ou CNI (recto)."); return; }
                if (!planDomicile?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser votre plan de localisation (domicile)."); return; }
                if (!selfie?.files?.length) { alert("Veuillez prendre un selfie pour la vÃƒÆ’Ã‚Â©rification faciale."); return; }

                appState.kycDocuments.cniPassportRecto = cniRecto.files[0].name;
                const cniVerso = document.getElementById('kyc-cni-verso');
                appState.kycDocuments.cniPassportVerso = cniVerso?.files?.length ? cniVerso.files[0].name : '';
                appState.kycDocuments.planLocalisationDomicile = planDomicile.files[0].name;
                appState.kycDocuments.selfieVerification = selfie.files[0].name;
            } else {
                const statuts = document.getElementById('kyc-statuts');
                const rccm = document.getElementById('kyc-rccm');
                const attestation = document.getElementById('kyc-attestation');
                const nonRedevance = document.getElementById('kyc-non-redevance');
                const planEntreprise = document.getElementById('kyc-plan-entreprise');

                if (!statuts?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser les Statuts de l'Entreprise."); return; }
                if (!rccm?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser le Registre de Commerce (RCCM)."); return; }
                if (!attestation?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser l'Attestation d'Immatriculation."); return; }
                if (!nonRedevance?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser le Document de Non Redevance."); return; }
                if (!planEntreprise?.files?.length) { alert("Veuillez tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser le Plan de Localisation."); return; }

                appState.kycDocuments.statutsEntreprise = statuts.files[0].name;
                appState.kycDocuments.registreCommerce = rccm.files[0].name;
                appState.kycDocuments.attestationImmatriculation = attestation.files[0].name;
                appState.kycDocuments.documentNonRedevance = nonRedevance.files[0].name;
                appState.kycDocuments.planLocalisationEntreprise = planEntreprise.files[0].name;
            }

            appState.userProfile.phone = phone;
            appState.userProfile.bankAccount = bankAccount;
            appState.isAuthenticated = true;
            appState.kycStatus = 'pending';
            appState.kycSubmittedAt = new Date().toISOString();

            logSecurityEvent(`Inscription (${profileType === 'physique' ? 'Personne Physique' : 'Personne Morale'}) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â documents KYC soumis`, "Success");
            triggerNotification('security-alert', 'Dossier soumis', `Documents KYC transmis pour vÃƒÆ’Ã‚Â©rification. DÃƒÆ’Ã‚Â©lai estimÃƒÆ’Ã‚Â© : 24h.`);

            showAuthStep('step3');
        });
    }

    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    //  STEP 3 ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Enter App in Pending Mode
    // ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â
    const btnEnterPending = document.getElementById('btn-enter-app-pending');
    if (btnEnterPending) {
        btnEnterPending.addEventListener('click', () => {
            authScreen.style.display = 'none';
            if (appLayout) appLayout.style.display = 'flex';

            updateUIBalances();
            renderRecentTransactions();
            renderDashboardCharts();
            updateKycUI();
            if (typeof renderProfileView === 'function') renderProfileView();

            showKycPendingBanner();
        });
    }
}

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ KYC Pending Banner (bottom bar) ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
function showKycPendingBanner() {
    const existing = document.getElementById('kyc-pending-banner');
    if (existing) existing.remove();
    if (appState.kycStatus !== 'pending') return;

    const banner = document.createElement('div');
    banner.id = 'kyc-pending-banner';
    banner.style.cssText = `
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
        background: linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06));
        border-top: 1.5px solid rgba(212,175,55,0.25);
        backdrop-filter: blur(12px);
        padding: 12px 24px;
        display: flex; align-items: center; justify-content: space-between;
        gap: 16px; font-size: 12px; color: var(--text-secondary);
    `;
    banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; animation: pulse 2s ease-in-out infinite;">
                <i data-lucide="hourglass" style="width: 16px; height: 16px; color: var(--primary);"></i>
            </div>
            <div>
                <strong style="color: var(--primary); display: block; font-size: 13px;">ÃƒÂ¢Ã‚ÂÃ‚Â³ VÃƒÆ’Ã‚Â©rification KYC en cours</strong>
                <span>Les transactions sont bloquÃƒÆ’Ã‚Â©es jusqu'ÃƒÆ’Ã‚Â  la validation par notre ÃƒÆ’Ã‚Â©quipe (ÃƒÂ¢Ã¢â‚¬Â°Ã‹â€  24h).</span>
            </div>
        </div>
        <button id="btn-simulate-kyc-approval" class="btn btn-sm btn-outline-primary" style="white-space: nowrap; padding: 6px 14px; font-size: 11px; border-radius: 8px; border-color: var(--primary); color: var(--primary);">
            ÃƒÂ¢Ã…Â¡Ã‚Â¡ Simuler la validation
        </button>
    `;
    document.body.appendChild(banner);
    if (window.lucide) lucide.createIcons();

    document.getElementById('btn-simulate-kyc-approval')?.addEventListener('click', () => {
        appState.kycStatus = 'verified';
        appState.kycVerifiedAt = new Date().toISOString();
        banner.remove();
        logSecurityEvent("VÃƒÆ’Ã‚Â©rification KYC approuvÃƒÆ’Ã‚Â©e (simulation)", "Success");
        triggerNotification('security-alert', 'KYC ValidÃƒÆ’Ã‚Â© ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦', 'Votre identitÃƒÆ’Ã‚Â© a ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© vÃƒÆ’Ã‚Â©rifiÃƒÆ’Ã‚Â©e. Vous pouvez effectuer des transactions.');
        updateKycUI();
        if (typeof renderProfileView === 'function') renderProfileView();
        alert("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ VÃƒÆ’Ã‚Â©rification KYC approuvÃƒÆ’Ã‚Â©e !\\nVotre compte est pleinement opÃƒÆ’Ã‚Â©rationnel.");
    });
}

function renderProfileView() {
    // Fill dynamic fields
    const fullNameVal = document.getElementById('profile-full-name');
    const nameLabel = document.getElementById('profile-name-label');
    const phoneVal = document.getElementById('profile-phone');
    const emailVal = document.getElementById('profile-email');
    const docCniVal = document.getElementById('profile-doc-cni');
    const docCniGroup = document.getElementById('profile-group-cni');
    const corporateSection = document.getElementById('profile-corporate-section');

    if (fullNameVal) fullNameVal.innerText = appState.userProfile.fullName;
    if (phoneVal) phoneVal.innerText = appState.userProfile.phone;
    if (emailVal) emailVal.innerText = appState.userProfile.email;

    if (appState.profileType === 'physique') {
        if (nameLabel) nameLabel.innerText = "Nom Complet";
        if (docCniGroup) docCniGroup.style.display = 'flex';
        if (docCniVal) docCniVal.innerText = appState.kycDocuments.cniPassportRecto || "CNI/Passeport (non soumis)";
        if (corporateSection) corporateSection.style.display = 'none';
    } else {
        if (nameLabel) nameLabel.innerText = "DÃƒÂ©nomination Sociale";
        if (docCniGroup) docCniGroup.style.display = 'none';
        if (corporateSection) {
            corporateSection.style.display = 'flex';
            const rccmEl = document.getElementById('profile-doc-rccm');
            const statutsEl = document.getElementById('profile-doc-statuts');
            const planEl = document.getElementById('profile-doc-plan');
            if (rccmEl) rccmEl.innerText = appState.kycDocuments.registreCommerce || "RCCM (non soumis)";
            if (statutsEl) statutsEl.innerText = appState.kycDocuments.statutsEntreprise || "Statuts (non soumis)";
            if (planEl) planEl.innerText = appState.kycDocuments.planLocalisationEntreprise || "Plan de localisation (non soumis)";
        }
    }

    // Dynamic KYC Upload box styling based on type of profile
    const kycPanelTitle = document.getElementById('kyc-panel-title');
    const kycPanelDesc = document.getElementById('kyc-panel-desc');
    const kycDocInput = document.getElementById('kyc-doc-name');

    if (kycPanelTitle && kycPanelDesc && kycDocInput) {
        if (appState.profileType === 'physique') {
            kycPanelTitle.innerHTML = `<i data-lucide="upload-cloud"></i> Soumettre vos piÃƒÂ¨ces d'identitÃƒÂ© (KYC)`;
            kycPanelDesc.innerText = "Requis par la rÃƒÂ©glementation COBAC/LCB-FT avant tout dÃƒÂ©pÃƒÂ´t.";
            kycDocInput.placeholder = "NumÃƒÂ©ro de piÃƒÂ¨ce (ex: CNI NÃ‚Â°1290382)";
        } else {
            kycPanelTitle.innerHTML = `<i data-lucide="upload-cloud"></i> Soumettre vos documents d'entreprise (KYC)`;
            kycPanelDesc.innerText = "Requis par la rÃƒÂ©glementation COBAC (RCCM, statuts, plan localisation).";
            kycDocInput.placeholder = "NumÃƒÂ©ro de RCCM (ex: RC/DLA/...)";
        }
    }

    updateKycUI();
    if (window.lucide) lucide.createIcons();
}


function renderPortfolioView() {
    const tableBody = document.getElementById('portfolio-holdings-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (appState.portfolio.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">
                    <i data-lucide="info" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>
                    Aucun actif dÃƒÆ’Ã‚Â©tenu dans votre portefeuille actuellement.
                </td>
            </tr>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    appState.portfolio.forEach(holding => {
        const asset = findAssetInDB(holding.ticker);
        if (!asset) return;

        const currentVal = holding.qty * asset.price;
        const buyCost = holding.qty * holding.avgBuyPrice;
        const performanceXaf = currentVal - buyCost;
        const performancePercent = buyCost > 0 ? (performanceXaf / buyCost) * 100 : 0;

        const perfClass = performanceXaf >= 0 ? 'positive' : 'negative';
        const perfSign = performanceXaf >= 0 ? '+' : '';
        const perfIcon = performanceXaf >= 0 ? 'arrow-up-right' : 'arrow-down-right';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="logo-icon" style="width: 24px; height: 24px; font-size: 11px; font-weight: bold; border-radius: 6px; display: flex; align-items: center; justify-content: center; background: rgba(212, 175, 55, 0.08); color: var(--primary);">${holding.ticker[0]}</div>
                    <div>
                        <strong style="color: #fff; font-size: 13px; display: block;">${asset.name}</strong>
                        <span style="font-size: 10px; color: var(--text-muted); font-family: monospace;">${holding.ticker}</span>
                    </div>
                </div>
            </td>
            <td style="font-size: 12px; color: var(--text-secondary);">${asset.sector}</td>
            <td style="font-weight: 700; color: #fff; font-size: 13px;">${holding.qty.toFixed(4)}</td>
            <td style="font-size: 12px; color: var(--text-secondary);">${formatXAF(holding.avgBuyPrice)}</td>
            <td style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">${formatXAF(asset.price)}</td>
            <td style="font-weight: 700; color: #fff; font-size: 13px;">${formatXAF(currentVal)}</td>
            <td>
                <span class="stat-change ${perfClass}" style="font-size: 12px; font-weight: 600; padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 2px;">
                    <i data-lucide="${perfIcon}" style="width: 12px; height: 12px;"></i>
                    ${perfSign}${performancePercent.toFixed(2)}%
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary btn-sell-portfolio-holding" data-ticker="${holding.ticker}" style="border-color: var(--danger) !important; color: var(--danger) !important; padding: 4px 10px; font-size: 11px; border-radius: 6px;">
                    Vendre
                </button>
            </td>
        `;

        // Wire click listener to the sell button
        const sellBtn = row.querySelector('.btn-sell-portfolio-holding');
        if (sellBtn) {
            sellBtn.addEventListener('click', () => {
                openTradeModal(holding.ticker, 'sell');
            });
        }

        tableBody.appendChild(row);
    });

    if (window.lucide) lucide.createIcons();
}


// ==========================================================================
// 13. Language Switcher
// ==========================================================================
function setupLanguageSwitcher() {
    const btn = document.getElementById('btn-lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');
    const currentLabel = document.getElementById('current-lang-label');
    if (!btn || !dropdown) return;

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display === 'block';
        dropdown.style.display = isOpen ? 'none' : 'block';
    });

    // Close on outside click
    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    // Language option selection
    const options = dropdown.querySelectorAll('.lang-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.dataset.lang;
            const labels = { fr: 'FR', en: 'EN', es: 'ES' };
            if (currentLabel) currentLabel.textContent = labels[lang] || lang.toUpperCase();

            // Update active state
            options.forEach(o => {
                o.classList.remove('active');
                o.style.background = 'none';
            });
            opt.classList.add('active');
            opt.style.background = 'rgba(212,175,55,0.08)';

            dropdown.style.display = 'none';

            // Store selected language
            appState.selectedLanguage = lang;
            logSecurityEvent(`Langue modifiÃ©e : ${labels[lang]}`, "Success");
        });

        // Hover effect
        opt.addEventListener('mouseenter', () => { opt.style.background = 'rgba(212,175,55,0.08)'; });
        opt.addEventListener('mouseleave', () => {
            if (!opt.classList.contains('active')) opt.style.background = 'none';
        });
    });
}

// ==========================================================================
// 14. Fund Details Modal
// ==========================================================================
function openFundDetailsModal(ticker) {
    const fund = BVMAC_FCP.find(f => f.ticker === ticker);
    if (!fund) return;

    // Populate modal fields
    document.getElementById('fund-modal-name').textContent = fund.name;
    document.getElementById('fund-modal-tagline').textContent = fund.tagline || '';
    document.getElementById('fund-modal-usecase').textContent = fund.useCase || '';
    document.getElementById('fund-modal-description').textContent = fund.fullName;
    document.getElementById('fund-modal-return').textContent = fund.ratios.yield.value;
    document.getElementById('fund-modal-duration').textContent = fund.recommendedDuration || '';
    document.getElementById('fund-modal-risk-label').textContent = fund.riskLevel || '';

    // Format fees
    const fmtFee = (v) => v === 0 ? 'Gratuit' : v.toFixed(2).replace('.', ',') + ' %';
    document.getElementById('fund-modal-entry-fee').textContent = fmtFee(fund.entryFee);
    document.getElementById('fund-modal-exit-fee').textContent = fmtFee(fund.exitFee);
    document.getElementById('fund-modal-mgmt-fee').textContent = fmtFee(fund.managementFee);

    // Min investment
    document.getElementById('fund-modal-min-invest').textContent = formatXAF(fund.minInvestment);

    // Risk badge color
    const badge = document.getElementById('fund-modal-risk-badge');
    const riskColors = {
        'aucun':     { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#34d399' },
        'faible':    { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.25)', color: '#60a5fa' },
        'modere':    { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)', color: '#fbbf24' },
        'dynamique': { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.25)', color: '#fb923c' },
        'eleve':     { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',  color: '#f87171' }
    };
    const rc = riskColors[fund.riskLevel] || riskColors['modere'];
    badge.style.background = rc.bg;
    badge.style.borderColor = rc.border;
    badge.style.color = rc.color;

    // Invest button
    const btnInvest = document.getElementById('btn-fund-invest');
    btnInvest.onclick = () => {
        // Close fund modal, open trade modal
        document.getElementById('fund-details-modal').classList.remove('active');
        openTradeModal(ticker, 'buy');
    };

    // Show modal
    const modal = document.getElementById('fund-details-modal');
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
}

// ==========================================================================
// 15. Banking Hub Interactions
// ==========================================================================
function setupBankingView() {
    // Sync card holder name from user profile
    const cardHolderEl = document.getElementById('card-holder-name');
    if (cardHolderEl && appState.userProfile.fullName) {
        cardHolderEl.textContent = appState.userProfile.fullName.toUpperCase();
    }

    // Request card button
    const btnRequestCard = document.getElementById('btn-request-card');
    if (btnRequestCard) {
        btnRequestCard.addEventListener('click', () => {
            alert("ðŸ¦ Demande de carte envoyÃ©e !\n\nVotre demande de carte AGIR Visa sera traitÃ©e sous 48h. Vous recevrez un email de confirmation avec les dÃ©tails de livraison.");
            logSecurityEvent("Demande de nouvelle carte bancaire virtuelle", "Success");
            triggerNotification('trade-alert', 'Carte demandÃ©e', 'Votre demande de carte AGIR Visa Gold a Ã©tÃ© transmise. Traitement sous 48h.');
        });
    }

    // Add hover effect to banking tiles and partner cards
    const tiles = document.querySelectorAll('.banking-service-tile');
    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => { tile.style.transform = 'translateY(-3px)'; tile.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'; });
        tile.addEventListener('mouseleave', () => { tile.style.transform = 'translateY(0)'; tile.style.boxShadow = 'none'; });
    });

    const partners = document.querySelectorAll('.partner-card');
    partners.forEach(card => {
        card.addEventListener('mouseenter', () => { card.style.borderColor = 'rgba(212,175,55,0.3)'; card.style.transform = 'translateY(-2px)'; });
        card.addEventListener('mouseleave', () => { card.style.borderColor = 'var(--border-color)'; card.style.transform = 'translateY(0)'; });
    });
}

// ==========================================================================
// 15. App Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupAuthForm();


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
    setupKycAnd2FA();
    updateKycUI();
    
    // Modals
    setupModalClosers();
    setupCashModal();
    setupTradeModal();
    setupSubscriptionCheckout();

    // Header & New Views
    setupLanguageSwitcher();
    setupBankingView();

    // Sidebar Invest Shortcut redirect
    const sidebarInvestShortcut = document.getElementById('btn-sidebar-invest-shortcut');
    if (sidebarInvestShortcut) {
        sidebarInvestShortcut.addEventListener('click', () => {
            if (window.routeToTarget) {
                window.routeToTarget('market');
            }
        });
    }

    // Dates
    const dateDiv = document.getElementById('live-date');
    if (dateDiv) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDiv.innerText = today.toLocaleDateString('fr-FR', options);
    }
});
