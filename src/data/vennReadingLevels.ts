export interface VennReadingItem {
    id: string;
    text: string;
    region: 'A' | 'B' | 'AB' | 'outside';
}

export interface VennReadingLevel {
    id: number;
    title: string;
    setALabel: string;
    setBLabel: string;
    universalSetLabel?: string;
    items: VennReadingItem[];
}

export const VENN_READING_OBJECTS: VennReadingLevel[] = [
    {
        id: 1,
        title: "Gyümölcsök és színek",
        setALabel: "Piros dolgok",
        setBLabel: "Gyümölcsök",
        items: [
            { id: '1', text: "Alma", region: 'AB' },
            { id: '2', text: "Eper", region: 'AB' },
            { id: '3', text: "Autó", region: 'A' },
            { id: '4', text: "Lufi", region: 'A' },
            { id: '5', text: "Banán", region: 'B' },
            { id: '6', text: "Körte", region: 'B' },
            { id: '7', text: "Béka", region: 'outside' }
        ]
    },
    {
        id: 2,
        title: "Állatok világa",
        setALabel: "Tud repülni",
        setBLabel: "Madarak",
        items: [
            { id: '1', text: "Bagoly", region: 'AB' },
            { id: '2', text: "Sas", region: 'AB' },
            { id: '3', text: "Lepke", region: 'A' },
            { id: '4', text: "Repülő", region: 'A' },
            { id: '5', text: "Pingvin", region: 'B' },
            { id: '6', text: "Elefánt", region: 'outside' },
            { id: '7', text: "Ponty", region: 'outside' }
        ]
    },
    {
        id: 3,
        title: "Iskolai felszerelés",
        setALabel: "Fából készült",
        setBLabel: "Íróeszköz",
        items: [
            { id: '1', text: "Ceruza", region: 'AB' },
            { id: '2', text: "Vonalzó", region: 'A' },
            { id: '3', text: "Szék", region: 'A' },
            { id: '4', text: "Toll", region: 'B' },
            { id: '5', text: "Ecset", region: 'B' },
            { id: '6', text: "Táska", region: 'outside' }
        ]
    },
    {
        id: 4,
        title: "Ételek és egészség",
        setALabel: "Zöldség",
        setBLabel: "Zöld színű",
        items: [
            { id: '1', text: "Brokkoli", region: 'AB' },
            { id: '2', text: "Uborka", region: 'AB' },
            { id: '3', text: "Répa", region: 'A' },
            { id: '4', text: "Krumpli", region: 'A' },
            { id: '5', text: "Saláta", region: 'outside' },
            { id: '6', text: "Labda", region: 'outside' }
        ]
    },
    {
        id: 5,
        title: "Szórakozás",
        setALabel: "Elektromos",
        setBLabel: "Játék",
        items: [
            { id: '1', text: "Konzol", region: 'AB' },
            { id: '2', text: "Laptop", region: 'A' },
            { id: '3', text: "Lámpa", region: 'A' },
            { id: '4', text: "Mackó", region: 'B' },
            { id: '5', text: "Labda", region: 'B' },
            { id: '6', text: "Szendvics", region: 'outside' }
        ]
    },
    {
        id: 6,
        title: "Környezetünk",
        setALabel: "Vízben él",
        setBLabel: "Emlős",
        items: [
            { id: '1', text: "Bálna", region: 'AB' },
            { id: '2', text: "Delfin", region: 'AB' },
            { id: '3', text: "Ponty", region: 'A' },
            { id: '4', text: "Polip", region: 'A' },
            { id: '5', text: "Kutya", region: 'B' },
            { id: '6', text: "Cica", region: 'B' },
            { id: '7', text: "Fenyő", region: 'outside' }
        ]
    }
];

export const VENN_READING_NUMBERS: VennReadingLevel[] = [
    {
        id: 1,
        title: "Számok tulajdonságai",
        setALabel: "Páros számok",
        setBLabel: "5-tel osztható",
        universalSetLabel: "Alaphalmaz: {1-30}",
        items: [
            { id: '1', text: "10", region: 'AB' },
            { id: '2', text: "20", region: 'AB' },
            { id: '3', text: "4", region: 'A' },
            { id: '4', text: "12", region: 'A' },
            { id: '5', text: "5", region: 'B' },
            { id: '6', text: "15", region: 'B' },
            { id: '7', text: "7", region: 'outside' }
        ]
    },
    {
        id: 2,
        title: "Osztók és prímek",
        setALabel: "Prímszám",
        setBLabel: "Páratlan",
        universalSetLabel: "Alaphalmaz: {1-20}",
        items: [
            { id: '1', text: "3", region: 'AB' },
            { id: '2', text: "5", region: 'AB' },
            { id: '3', text: "7", region: 'AB' },
            { id: '4', text: "2", region: 'A' },
            { id: '5', text: "9", region: 'B' },
            { id: '6', text: "15", region: 'B' },
            { id: '7', text: "4", region: 'outside' },
            { id: '8', text: "10", region: 'outside' }
        ]
    },
    {
        id: 3,
        title: "Oszthatóság: 3 és 4",
        setALabel: "3-mal osztható",
        setBLabel: "4-gyel osztható",
        universalSetLabel: "Alaphalmaz: {1-50}",
        items: [
            { id: '1', text: "12", region: 'AB' },
            { id: '2', text: "24", region: 'AB' },
            { id: '3', text: "9", region: 'A' },
            { id: '4', text: "15", region: 'A' },
            { id: '5', text: "8", region: 'B' },
            { id: '6', text: "16", region: 'B' },
            { id: '7', text: "5", region: 'outside' }
        ]
    },
    {
        id: 4,
        title: "Számtartományok",
        setALabel: "> 30",
        setBLabel: "Páros",
        universalSetLabel: "Alaphalmaz: {1-50}",
        items: [
            { id: '1', text: "32", region: 'AB' },
            { id: '2', text: "40", region: 'AB' },
            { id: '3', text: "31", region: 'A' },
            { id: '4', text: "45", region: 'A' },
            { id: '5', text: "10", region: 'B' },
            { id: '6', text: "22", region: 'B' },
            { id: '7', text: "5", region: 'outside' }
        ]
    },
    {
        id: 5,
        title: "Négyzetszámok",
        setALabel: "Négyzetszám",
        setBLabel: "Páros",
        universalSetLabel: "Alaphalmaz: {1-100}",
        items: [
            { id: '1', text: "4", region: 'AB' },
            { id: '2', text: "16", region: 'AB' },
            { id: '3', text: "9", region: 'A' },
            { id: '4', text: "25", region: 'A' },
            { id: '5', text: "10", region: 'B' },
            { id: '6', text: "12", region: 'B' },
            { id: '7', text: "7", region: 'outside' }
        ]
    },
    {
        id: 6,
        title: "Kétjegyű számok",
        setALabel: "Kétjegyű",
        setBLabel: "11 többszöröse",
        universalSetLabel: "Alaphalmaz: {1-100}",
        items: [
            { id: '1', text: "22", region: 'AB' },
            { id: '2', text: "55", region: 'AB' },
            { id: '3', text: "10", region: 'A' },
            { id: '4', text: "40", region: 'A' },
            { id: '5', text: "110", region: 'B' },
            { id: '6', text: "5", region: 'outside' }
        ]
    }
];
