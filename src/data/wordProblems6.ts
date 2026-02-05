export interface WordProblem {
    id: string;
    question: string;
    answer: number;
    suffix?: string; // e.g., "Ft", "kg", "db"
    hint?: string;
}

export interface ProblemSet {
    id: string;
    title: string;
    description: string;
    problems: WordProblem[];
}

export const wordProblems6: ProblemSet[] = [
    {
        id: 'set-1',
        title: '1. Természetes számok, műveletek',
        description: 'Gyakorold az alapműveleteket szöveges környezetben!',
        problems: [
            {
                id: '1-1',
                question: 'Egy iskola 6. osztályába 28 fiú és 32 lány jár. Hány tanuló jár összesen a 6. osztályba?',
                answer: 60,
                suffix: 'tanuló'
            },
            {
                id: '1-2',
                question: 'Peti 4500 Ft-ot gyűjtött, Sanyi pedig háromszor annyit. Mennyi pénze van Sanyinak?',
                answer: 13500,
                suffix: 'Ft'
            },
            {
                id: '1-3',
                question: 'Egy könyv 256 oldalas. Zsófi naponta 32 oldalt olvas el belőle. Hány nap alatt végez a könyvvel?',
                answer: 8,
                suffix: 'nap'
            },
            {
                id: '1-4',
                question: 'A boltban egy csomag füzet 850 Ft-ba kerül. Hány csomagot tudunk venni 5000 Ft-ból?',
                answer: 5,
                suffix: 'csomag'
            },
            {
                id: '1-5',
                question: 'Egy tartályban 500 liter víz van. Minden percben 25 liter folyik ki belőle. Hány perc alatt ürül ki a tartály?',
                answer: 20,
                suffix: 'perc'
            }
        ]
    },
    {
        id: 'set-2',
        title: '2. Oszthatóság, egész számok',
        description: 'Prímszámok, osztók, többszörösök világában.',
        problems: [
            {
                id: '2-1',
                question: 'Keresd meg a 24 összes osztóját! Hány darab osztója van a 24-nek?',
                answer: 8,
                suffix: 'db'
            },
            {
                id: '2-2',
                question: 'Mi a legkisebb közös többszöröse a 12 és 18 számoknak?',
                answer: 36
            },
            {
                id: '2-3',
                question: 'A hőmérséklet reggel -5 fok volt, délre emelkedett 12 fokot. Hány fok volt délben?',
                answer: 7,
                suffix: '°C'
            },
            {
                id: '2-4',
                question: 'Egy tengeralattjáró 200 méter mélyen van (-200m). Süllyed még 150 métert. Milyen mélyen lesz?',
                answer: 350,
                suffix: 'méter mélyen'
            },
            {
                id: '2-5',
                question: 'Mi a legnagyobb közös osztója a 48 és 72 számoknak?',
                answer: 24
            }
        ]
    },
    {
        id: 'set-3',
        title: '3. Törtek',
        description: 'Törtek összeadása, kivonása, szorzása, osztása.',
        problems: [
            {
                id: '3-1',
                question: 'Egy tortának megették az 1/4 részét, majd később a 3/8 részét. A tortának hány nyolcad része maradt meg?',
                answer: 3,
                suffix: '/8 rész'
            },
            {
                id: '3-2',
                question: 'Mennyi 5-nek a 3/5 része?',
                answer: 3
            },
            {
                id: '3-3',
                question: 'Egy osztály 30 tanulójának 2/3 része sportol rendszeresen. Hányan nem sportolnak?',
                answer: 10,
                suffix: 'tanuló'
            },
            {
                id: '3-4',
                question: 'Egy üveg szörp 3/4 literes. Hány liter szörp van 8 ilyen üvegben?',
                answer: 6,
                suffix: 'liter'
            },
            {
                id: '3-5',
                question: 'Mennyi a 20-nak a 4/5 része?',
                answer: 16
            }
        ]
    },
    {
        id: 'set-4',
        title: '4. Tizedestörtek',
        description: 'Számolás tizedesjegyekkel.',
        problems: [
            {
                id: '4-1',
                question: 'Peti 4.5 km-t futott hétfőn, kedden pedig 1.2 km-rel többet. Hány km-t futott összesen a két nap alatt?',
                answer: 10.2,
                suffix: 'km'
            },
            {
                id: '4-2',
                question: 'Egy kiló alma 350.5 Ft-ba kerül (átlagár). Mennyibe kerül 10 kg alma?',
                answer: 3505,
                suffix: 'Ft'
            },
            {
                id: '4-3',
                question: 'Egy téglalap oldalai 4.2 cm és 5 cm. Mennyi a területe?',
                answer: 21,
                suffix: 'cm²'
            },
            {
                id: '4-4',
                question: 'Mennyi a 12.4 és 3.6 összege?',
                answer: 16
            },
            {
                id: '4-5',
                question: '100 liter benzin 65000 Ft-ba kerül. Mennyibe kerül 1 liter benzin?',
                answer: 650,
                suffix: 'Ft'
            }
        ]
    },
    {
        id: 'set-5',
        title: '5. Geometria és mérések',
        description: 'Kerület, terület, szögek, átváltások.',
        problems: [
            {
                id: '5-1',
                question: 'Egy négyzet oldala 6 cm. Hány cm a kerülete?',
                answer: 24,
                suffix: 'cm'
            },
            {
                id: '5-2',
                question: 'Egy téglalap oldalai 8 méter és 5 méter. Hány négyzetméter a területe?',
                answer: 40,
                suffix: 'm²'
            },
            {
                id: '5-3',
                question: 'Hány fokos a derékszög?',
                answer: 90,
                suffix: 'fok'
            },
            {
                id: '5-4',
                question: 'Hány deciliter 2.5 liter?',
                answer: 25,
                suffix: 'dl'
            },
            {
                id: '5-5',
                question: 'A háromszög belső szögeinek összege 180 fok. Ha két szöge 60 és 50 fokos, hány fokos a harmadik szög?',
                answer: 70,
                suffix: 'fok'
            }
        ]
    }
];
