export interface VennSet {
    id: string;
    label: string;
    color: string;
    shape: 'circle' | 'rectangle' | 'ellipse' | 'heart';
}

export interface VennItem {
    id: string;
    label: string;
    // Which sets this item belongs to. Empty array means 'outside'.
    correctSetIds: string[];
}

export interface VennLevel {
    id: number;
    title: string;
    description: string;
    sets: VennSet[];
    items: VennItem[];
    icon: string;
    gradient: string;
}

export const VENN_LEVELS: VennLevel[] = [
    {
        id: 1,
        title: 'Piros dolgok és Gyümölcsök',
        description: 'Válogasd szét a dolgokat! Mi piros, mi gyümölcs, és mi mindkettő?',
        icon: '🍎',
        gradient: 'from-rose-500 to-red-600',
        sets: [
            { id: 'red', label: 'Piros színű', color: 'border-red-500 bg-red-500/10', shape: 'circle' },
            { id: 'fruit', label: 'Gyümölcs', color: 'border-emerald-500 bg-emerald-500/10', shape: 'rectangle' }
        ],
        items: [
            { id: 'v1_1', label: 'Alma', correctSetIds: ['red', 'fruit'] },
            { id: 'v1_2', label: 'Eper', correctSetIds: ['red', 'fruit'] },
            { id: 'v1_3', label: 'Paradicsom', correctSetIds: ['red'] },
            { id: 'v1_4', label: 'Banán', correctSetIds: ['fruit'] },
            { id: 'v1_5', label: 'Katicabogár', correctSetIds: ['red'] },
            { id: 'v1_6', label: 'Tűzoltóautó', correctSetIds: ['red'] },
            { id: 'v1_7', label: 'Szőlő', correctSetIds: ['fruit'] },
            { id: 'v1_8', label: 'Kék áfonya', correctSetIds: [] },
            { id: 'v1_9', label: 'Napocska', correctSetIds: [] },
            { id: 'v1_10', label: 'Cseresznye', correctSetIds: ['red', 'fruit'] }
        ]
    },
    {
        id: 2,
        title: 'Repülni tud és Élőlény',
        description: 'Válogasd szét az élőlényeket és a repülő dolgokat!',
        icon: '🦅',
        gradient: 'from-sky-500 to-blue-600',
        sets: [
            { id: 'fly', label: 'Repülni tud', color: 'border-blue-400 bg-blue-400/10', shape: 'ellipse' },
            { id: 'living', label: 'Élőlény', color: 'border-lime-500 bg-lime-500/10', shape: 'ellipse' }
        ],
        items: [
            { id: 'v2_1', label: 'Sas', correctSetIds: ['fly', 'living'] },
            { id: 'v2_2', label: 'Repülőgép', correctSetIds: ['fly'] },
            { id: 'v2_3', label: 'Kutya', correctSetIds: ['living'] },
            { id: 'v2_4', label: 'Denevér', correctSetIds: ['fly', 'living'] },
            { id: 'v2_5', label: 'Helikopter', correctSetIds: ['fly'] },
            { id: 'v2_6', label: 'Fa', correctSetIds: ['living'] },
            { id: 'v2_7', label: 'Légy', correctSetIds: ['fly', 'living'] },
            { id: 'v2_8', label: 'Autó', correctSetIds: [] },
            { id: 'v2_9', label: 'Szék', correctSetIds: [] },
            { id: 'v2_10', label: 'Szitakötő', correctSetIds: ['fly', 'living'] }
        ]
    },
    {
        id: 3,
        title: 'Konyhai eszközök (3 halmaz)',
        description: 'Válogasd szét a konyhai eszközöket anyaguk és formájuk szerint!',
        icon: '🍴',
        gradient: 'from-slate-500 to-slate-700',
        sets: [
            { id: 'metal', label: 'Fémből van', color: 'border-slate-400 bg-slate-400/10', shape: 'circle' },
            { id: 'kitchen', label: 'Konyhai eszköz', color: 'border-orange-400 bg-orange-400/10', shape: 'circle' },
            { id: 'sharp', label: 'Éles / Hegyes', color: 'border-teal-400 bg-teal-400/10', shape: 'circle' }
        ],
        items: [
            { id: 'v3_1', label: 'Kés', correctSetIds: ['metal', 'kitchen', 'sharp'] },
            { id: 'v3_2', label: 'Villa', correctSetIds: ['metal', 'kitchen', 'sharp'] },
            { id: 'v3_3', label: 'Kanál', correctSetIds: ['metal', 'kitchen'] },
            { id: 'v3_4', label: 'Fakanál', correctSetIds: ['kitchen'] },
            { id: 'v3_5', label: 'Szög', correctSetIds: ['metal', 'sharp'] },
            { id: 'v3_6', label: 'Fűrész', correctSetIds: ['metal', 'sharp'] },
            { id: 'v3_7', label: 'Lábos', correctSetIds: ['metal', 'kitchen'] },
            { id: 'v3_8', label: 'Tányér', correctSetIds: ['kitchen'] },
            { id: 'v3_9', label: 'Pohár', correctSetIds: ['kitchen'] },
            { id: 'v3_10', label: 'Olló', correctSetIds: ['metal', 'sharp'] }
        ]
    },
    {
        id: 4,
        title: 'Téli dolgok és Ruházat',
        description: 'Melyik ruha, melyik téli, és melyik mindkettő?',
        icon: '❄️',
        gradient: 'from-blue-400 to-cyan-500',
        sets: [
            { id: 'winter', label: 'Téli dolog', color: 'border-cyan-400 bg-cyan-400/10', shape: 'heart' },
            { id: 'clothing', label: 'Ruházati cikk', color: 'border-rose-400 bg-rose-400/10', shape: 'circle' }
        ],
        items: [
            { id: 'v4_1', label: 'Sál', correctSetIds: ['winter', 'clothing'] },
            { id: 'v4_2', label: 'Kesztyű', correctSetIds: ['winter', 'clothing'] },
            { id: 'v4_3', label: 'Hóember', correctSetIds: ['winter'] },
            { id: 'v4_4', label: 'Póló', correctSetIds: ['clothing'] },
            { id: 'v4_5', label: 'Zokni', correctSetIds: ['clothing'] },
            { id: 'v4_6', label: 'Szánkó', correctSetIds: ['winter'] },
            { id: 'v4_7', label: 'Kabát', correctSetIds: ['winter', 'clothing'] },
            { id: 'v4_8', label: 'Papucs', correctSetIds: ['clothing'] },
            { id: 'v4_9', label: 'Fürdőruha', correctSetIds: ['clothing'] },
            { id: 'v4_10', label: 'Jégkorcsolya', correctSetIds: ['winter'] }
        ]
    },
    {
        id: 5,
        title: 'Állatok csoportosítása (3 halmaz)',
        description: 'Osztályozd az állatokat tulajdonságaik szerint!',
        icon: '🦁',
        gradient: 'from-orange-500 to-amber-600',
        sets: [
            { id: 'fourlegs', label: 'Négylábú', color: 'border-amber-600 bg-amber-600/10', shape: 'ellipse' },
            { id: 'mammal', label: 'Emlős', color: 'border-red-400 bg-red-400/10', shape: 'ellipse' },
            { id: 'carnivore', label: 'Ragadozó', color: 'border-slate-600 bg-slate-600/10', shape: 'ellipse' }
        ],
        items: [
            { id: 'v5_1', label: 'Oroszlán', correctSetIds: ['fourlegs', 'mammal', 'carnivore'] },
            { id: 'v5_2', label: 'Farkas', correctSetIds: ['fourlegs', 'mammal', 'carnivore'] },
            { id: 'v5_3', label: 'Szarvasmarha', correctSetIds: ['fourlegs', 'mammal'] },
            { id: 'v5_4', label: 'Cápa', correctSetIds: ['carnivore'] },
            { id: 'v5_5', label: 'Ember', correctSetIds: ['mammal'] },
            { id: 'v5_6', label: 'Bálna', correctSetIds: ['mammal', 'carnivore'] },
            { id: 'v5_7', label: 'Macska', correctSetIds: ['fourlegs', 'mammal', 'carnivore'] },
            { id: 'v5_8', label: 'Kutya', correctSetIds: ['fourlegs', 'mammal', 'carnivore'] }, // Most domesticated are carnivores in simplified biological terms
            { id: 'v5_9', label: 'Krokodil', correctSetIds: ['fourlegs', 'carnivore'] },
            { id: 'v5_10', label: 'Ló', correctSetIds: ['fourlegs', 'mammal'] }
        ]
    },
    {
        id: 6,
        title: 'Iskolaszerek és Guruló dolgok',
        description: 'Válogasd szét a tanszereket és a járműveket!',
        icon: '🎒',
        gradient: 'from-indigo-500 to-purple-600',
        sets: [
            { id: 'school', label: 'Iskolaszer', color: 'border-indigo-400 bg-indigo-400/10', shape: 'rectangle' },
            { id: 'wheels', label: 'Guruló dolog', color: 'border-orange-500 bg-orange-500/10', shape: 'rectangle' }
        ],
        items: [
            { id: 'v6_1', label: 'Iskolatáska', correctSetIds: ['school'] },
            { id: 'v6_2', label: 'Toll', correctSetIds: ['school'] },
            { id: 'v6_3', label: 'Autó', correctSetIds: ['wheels'] },
            { id: 'v6_4', label: 'Bicikli', correctSetIds: ['wheels'] },
            { id: 'v6_5', label: 'Füzet', correctSetIds: ['school'] },
            { id: 'v6_6', label: 'Gördeszka', correctSetIds: ['wheels'] },
            { id: 'v6_7', label: 'Radír', correctSetIds: ['school'] },
            { id: 'v6_8', label: 'Roller', correctSetIds: ['wheels'] },
            { id: 'v6_9', label: 'Busz', correctSetIds: ['wheels'] },
            { id: 'v6_10', label: 'Vonalzó', correctSetIds: ['school'] }
        ]
    }
];
