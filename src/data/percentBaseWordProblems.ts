export interface PercentWordProblem {
    id: string;
    question: string;
    answerTemplate: string;
    answer: number;
    suffix?: string;
    hint?: string;
}

export interface PercentWordProblemSet {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    color: string;
    problems: PercentWordProblem[];
}

export const percentBaseWordProblems: PercentWordProblemSet[] = [
    {
        id: 'easy',
        title: 'Kezdő szint',
        description: 'Kerek számok, egyszerű százalékok (10%, 20%, 25%, 50%)',
        difficulty: 'easy',
        color: 'emerald',
        problems: [
            {
                id: 'b1',
                question: 'Egy kabát 50%-os árengedménnyel 12 000 Ft-ba kerül. Mennyi volt az eredeti ára?',
                answerTemplate: 'Tehát az eredeti ár {x} Ft volt.',
                answer: 24000,
                suffix: 'Ft',
            },
            {
                id: 'b2',
                question: 'Egy osztályban 10 diák szemüveges, ami a teljes létszám 25%-a. Hányan járnak az osztályba?',
                answerTemplate: 'Tehát az osztályba {x} diák jár.',
                answer: 40,
                suffix: 'fő',
            },
            {
                id: 'b3',
                question: 'Egy könyv 10%-át, azaz 5 oldalt elolvastál. Hány oldalas a könyv?',
                answerTemplate: 'Tehát a könyv {x} oldalas.',
                answer: 50,
                suffix: 'oldal',
            },
            {
                id: 'b4',
                question: 'Egy készlet 20%-a, vagyis 8 darab piros. Hány darabos a teljes készlet?',
                answerTemplate: 'Tehát a készlet {x} darabból áll.',
                answer: 40,
                suffix: 'db',
            },
            {
                id: 'b5',
                question: 'Egy edzésen 30 perc telt el, ami a teljes idő 50%-a. Hány perces az edzés?',
                answerTemplate: 'Tehát az edzés {x} perces.',
                answer: 60,
                suffix: 'perc',
            },
            {
                id: 'b6',
                question: 'Egy kiránduláson 20 felnőtt vett részt, ami a csoport 25%-a. Hányan vettek részt összesen?',
                answerTemplate: 'Tehát összesen {x}-an vettek részt.',
                answer: 80,
                suffix: 'fő',
            },
            {
                id: 'b7',
                question: 'Egy csoki árát 10%-kal, azaz 50 Ft-tal csökkentették. Mennyi volt az eredeti ára?',
                answerTemplate: 'Tehát az eredeti ár {x} Ft volt.',
                answer: 500,
                suffix: 'Ft',
            },
            {
                id: 'b8',
                question: 'Egy hordóban 40 liter víz van, és ez a 20%-a a térfogatának. Hány literes a hordó?',
                answerTemplate: 'Tehát a hordó {x} literes.',
                answer: 200,
                suffix: 'liter',
            },
            {
                id: 'b9',
                question: 'Egy dolgozatban 50 pontot kaptál, ami 50%-os teljesítmény. Mennyi a maximális pontszám?',
                answerTemplate: 'Tehát a maximális pontszám {x} volt.',
                answer: 100,
                suffix: 'pont',
            },
            {
                id: 'b10',
                question: 'Egy iskolában 100 diák sportol, ami a létszám 25%-a. Hányan járnak az iskolába?',
                answerTemplate: 'Tehát {x} diák jár az iskolába.',
                answer: 400,
                suffix: 'fő',
            },
        ],
    },
    {
        id: 'medium',
        title: 'Haladó szint',
        description: 'Változatosabb százalékok (5%, 15%, 30%, 40%, 75%)',
        difficulty: 'medium',
        color: 'amber',
        problems: [
            {
                id: 'b11',
                question: 'Egy könyv ára 300 Ft-tal nőtt, ami 25%-os emelésnek felel meg. Mennyi volt az eredeti ár?',
                answerTemplate: 'Tehát az eredeti ár {x} Ft volt.',
                answer: 1200,
                suffix: 'Ft',
            },
            {
                id: 'b12',
                question: 'Egy moziteremben 12-en ülnek az első sorban, ami 15%-a a nézőknek. Hány néző van összesen?',
                answerTemplate: 'Tehát összesen {x} néző van.',
                answer: 80,
                suffix: 'fő',
            },
            {
                id: 'b13',
                question: 'Egy csokiban 20 gramm mogyoró van, ami az egész termék 5%-a. Hány grammos a csoki?',
                answerTemplate: 'Tehát a csoki {x} grammos.',
                answer: 400,
                suffix: 'gramm',
            },
            {
                id: 'b14',
                question: 'Egy cipő árából 1 500 Ft-ot engedtek, ami 30%-os árleszállítás. Mennyi volt az eredeti ár?',
                answerTemplate: 'Tehát az eredeti ár {x} Ft volt.',
                answer: 5000,
                suffix: 'Ft',
            },
            {
                id: 'b15',
                question: 'Egy cégnél 100-an dolgoznak otthonról, ami a dolgozók 40%-a. Hányan dolgoznak a cégnél?',
                answerTemplate: 'Tehát {x}-an dolgoznak a cégnél.',
                answer: 250,
                suffix: 'fő',
            },
            {
                id: 'b16',
                question: 'Egy teszten 60 kérdést találtál el, ami 75%-os eredmény. Hány kérdéses volt a teszt?',
                answerTemplate: 'Tehát a teszt {x} kérdésből állt.',
                answer: 80,
                suffix: 'kérdés',
            },
            {
                id: 'b17',
                question: 'Egy tartályból 30 liter víz párolgott el, ami 15%-os veszteség. Mennyi víz volt eredetileg?',
                answerTemplate: 'Tehát eredetileg {x} liter víz volt.',
                answer: 200,
                suffix: 'liter',
            },
            {
                id: 'b18',
                question: 'Egy faluban 180 nyugdíjas él, ami a lakosság 30%-a. Hányan laknak a faluban?',
                answerTemplate: 'Tehát a lakosság {x} fő.',
                answer: 600,
                suffix: 'fő',
            },
            {
                id: 'b19',
                question: 'Egy regényből 200 oldalt elolvastál, ami a könyv 40%-a. Hány oldalas a regény?',
                answerTemplate: 'Tehát a regény {x} oldalas.',
                answer: 500,
                suffix: 'oldal',
            },
            {
                id: 'b20',
                question: 'Egy buszon 2-en állnak, ami az utasok 5%-a. Hányan utaznak a buszon?',
                answerTemplate: 'Tehát összesen {x} utas van.',
                answer: 40,
                suffix: 'fő',
            },
        ],
    },
    {
        id: 'hard',
        title: 'Mester szint',
        description: 'Összetettebb számítások, tizedesjegyekkel is',
        difficulty: 'hard',
        color: 'rose',
        problems: [
            {
                id: 'b21',
                question: 'Egy elektromos gép árából 5 820 Ft-ot engedtek, ami 12%-os kedvezmény. Mennyi volt az eredeti ár?',
                answerTemplate: 'Tehát az eredeti ár {x} Ft volt.',
                answer: 48500,
                suffix: 'Ft',
            },
            {
                id: 'b22',
                question: 'Egy városban lakossága 4 000 fővel nőtt, ami 3,2%-os növekedés. Hányan laktak ott eredetileg?',
                answerTemplate: 'Tehát eredetileg {x} lakos volt.',
                answer: 125000,
                suffix: 'fő',
            },
            {
                id: 'b23',
                question: 'Egy üzletben 69 300 Ft-ot költöttek alapanyagra, ami a havi bevétel 18%-a. Mennyi a havi bevétel?',
                answerTemplate: 'Tehát a bevétel {x} Ft volt.',
                answer: 385000,
                suffix: 'Ft',
            },
            {
                id: 'b24',
                question: 'Egy munkavállaló havi adója 174 200 Ft, ami a bruttó bérének 33,5%-a. Mennyi a bruttó bér?',
                answerTemplate: 'Tehát a bruttó bér {x} Ft.',
                answer: 520000,
                suffix: 'Ft',
            },
            {
                id: 'b25',
                question: 'Egy erdőben a vihar kidöntött 1 050 fát, ami az állomány 8,4%-a. Hány fa volt az erdőben?',
                answerTemplate: 'Tehát összesen {x} fa volt.',
                answer: 12500,
                suffix: 'db',
            },
            {
                id: 'b26',
                question: 'Egy szállodában 180 szoba van foglalva, ami 72%-os telítettséget jelent. Hány szoba van összesen?',
                answerTemplate: 'Tehát a szállodában {x} szoba van.',
                answer: 250,
                suffix: 'db',
            },
            {
                id: 'b27',
                question: 'Egy uszodában a klóros víz mennyisége 10 000 liter, ami a teljes tartalom 0,8%-a. Mennyi az uszoda térfogata?',
                answerTemplate: 'Tehát az uszoda {x} literes.',
                answer: 1250000,
                suffix: 'liter',
            },
            {
                id: 'b28',
                question: 'Egy cég 10 800 000 Ft-ot költ marketingre, ami az éves büdzsé 22,5%-a. Mennyi az éves büdzsé?',
                answerTemplate: 'Tehát az éves büdzsé {x} Ft.',
                answer: 48000000,
                suffix: 'Ft',
            },
            {
                id: 'b29',
                question: 'Egy focista 21 gólt szerzett a szezonban, ami lövéseinek 14%-a. Hányat lőtt kapura ebben az idényben?',
                answerTemplate: 'Tehát {x} lövést adott le.',
                answer: 150,
                suffix: 'db',
            },
            {
                id: 'b30',
                question: 'Egy év alatt 156 000 Ft kamatot kaptál 6,5%-os kamatláb mellett. Mekkora volt a lekötött tőkéd?',
                answerTemplate: 'Tehát a tőkéd {x} Ft volt.',
                answer: 2400000,
                suffix: 'Ft',
            },
        ],
    },
];
