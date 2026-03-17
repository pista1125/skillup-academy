export interface WordProblem {
    id: string;
    question: string;
    answer: number;
    answerTemplate: string; // e.g. "Az eredmény: {x} Ft"
    suffix?: string;
    hint?: string;
}

export interface WordProblemSet {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    problems: WordProblem[];
}

export const wordProblems7: WordProblemSet[] = [
    {
        id: 'easy-1',
        title: 'Alapszintű egyenletek',
        description: 'Egyszerű, egylépéses egyenletek megoldása szöveges környezetben.',
        difficulty: 'easy',
        problems: [
            {
                id: 'e1-1',
                question: 'Béla megevett 3 csokit, Juli is megevett valamennyit, és összesen 12-t ettek meg. Hány csokit evett Juli?',
                answer: 9,
                answerTemplate: 'Juli {x} csokit evett meg.',
                suffix: 'csoki'
            },
            {
                id: 'e1-2',
                question: 'Három egyforma doboz bonbon összesen 1500 Ft-ba került. Mennyibe kerül egy doboz?',
                answer: 500,
                answerTemplate: 'Egy doboz {x} Ft-ba kerül.',
                suffix: 'Ft'
            },
            {
                id: 'e1-3',
                question: 'Gábor gondolt egy számot, hozzáadott 15-öt, és 40-et kapott. Melyik számra gondolt?',
                answer: 25,
                answerTemplate: 'A gondolt szám: {x}',
            },
            {
                id: 'e1-4',
                question: 'Egy tálban almák voltak. Miután kivettünk belőle 7-et, 15 maradt. Hány alma volt eredetileg a tálban?',
                answer: 22,
                answerTemplate: 'Eredetileg {x} alma volt a tálban.',
                suffix: 'alma'
            },
            {
                id: 'e1-5',
                question: 'Egy kerékpáros 4 óra alatt 60 km-t tett meg. Hány km-t tett meg átlagosan óránként?',
                answer: 15,
                answerTemplate: 'Óránként {x} km-t tett meg.',
                suffix: 'km'
            },
            {
                id: 'e1-6',
                question: 'Egy osztályban 32 tanuló van. 18-an lányok. Hány fiú jár az osztályba?',
                answer: 14,
                answerTemplate: 'Az osztályba {x} fiú jár.',
                suffix: 'fiú'
            },
            {
                id: 'e1-7',
                question: 'Kata ötször annyi pontot gyűjtött a versenyen, mint Peti. Ha Kata 45 pontot kapott, hány pontja lett Petinek?',
                answer: 9,
                answerTemplate: 'Petinek {x} pontja lett.',
                suffix: 'pont'
            },
            {
                id: 'e1-8',
                question: 'Egy kötélből levágtunk 12 métert, így 38 méter maradt. Milyen hosszú volt a kötél eredetileg?',
                answer: 50,
                answerTemplate: 'A kötél eredetileg {x} méter volt.',
                suffix: 'méter'
            },
            {
                id: 'e1-9',
                question: 'A boltban 4 kg alma 1200 Ft. Mennyibe kerül 1 kg alma?',
                answer: 300,
                answerTemplate: '1 kg alma {x} Ft.',
                suffix: 'Ft'
            },
            {
                id: 'e1-10',
                question: 'Egy szám negyede 15. Melyik ez a szám?',
                answer: 60,
                answerTemplate: 'A keresett szám a(z) {x}.',
            }
        ]
    },
    {
        id: 'medium-1',
        title: 'Középszintű feladatok',
        description: 'Összetettebb, kétlépéses egyenletek és összefüggések.',
        difficulty: 'medium',
        problems: [
            {
                id: 'm1-1',
                question: 'Gondoltam egy számot, megszoroztam 3-mal, hozzáadtam 5-öt és 26-ot kaptam. Melyik ez a szám?',
                answer: 7,
                answerTemplate: 'A gondolt szám: {x}',
            },
            {
                id: 'm1-2',
                question: 'Egy téglalap kerülete 30 cm. Az egyik oldala 6 cm. Hány cm a másik oldala?',
                answer: 9,
                answerTemplate: 'A másik oldal hossza {x} cm.',
                suffix: 'cm'
            },
            {
                id: 'm1-3',
                question: 'Három egymást követő egész szám összege 45. Melyik a legkisebb ezek közül?',
                answer: 14,
                answerTemplate: 'A legkisebb szám a(z) {x}.',
            },
            {
                id: 'm1-4',
                question: 'Zoli 2500 Ft-tal indult el. Vett 4 füzetet, és maradt 900 Ft-ja. Mennyibe került egy füzet?',
                answer: 400,
                answerTemplate: 'Egy füzet {x} Ft-ba került.',
                suffix: 'Ft'
            },
            {
                id: 'm1-5',
                question: 'Egy apa 32 éves, a fia 8 éves. Hány év múlva lesz az apa pontosan háromszor annyi idős, mint a fia?',
                answer: 4,
                answerTemplate: '{x} év múlva.',
                suffix: 'év'
            },
            {
                id: 'm1-6',
                question: 'Egy szám 5-tel nagyobb, mint egy másik szám. Az összegük 41. Melyik a kisebbik szám?',
                answer: 18,
                answerTemplate: 'A kisebbik szám a(z) {x}.',
            },
            {
                id: 'm1-7',
                question: 'A nagymama 72 szem cukorkát osztott szét az unokái között. Mindenki 9 szemet kapott. Hány unokája van?',
                answer: 8,
                answerTemplate: 'A nagymamának {x} unokája van.',
                suffix: 'unoka'
            },
            {
                id: 'm1-8',
                question: 'Egy szám fele 8-cal nagyobb, mint a szám negyede. Melyik ez a szám?',
                answer: 32,
                answerTemplate: 'A keresett szám a(z) {x}.',
            },
            {
                id: 'm1-9',
                question: 'Egy háromszög egyik szöge 40 fokos, a másik kétszer akkora, mint a harmadik. Hány fokos a legkisebb szöge?',
                answer: 40,
                answerTemplate: 'A legkisebb szög {x} fokos.',
                suffix: 'fok'
            },
            {
                id: 'm1-10',
                question: 'Egy könyv árának 20%-a 600 Ft. Mennyibe kerül a könyv?',
                answer: 3000,
                answerTemplate: 'A könyv {x} Ft-ba kerül.',
                suffix: 'Ft'
            }
        ]
    },
    {
        id: 'hard-1',
        title: 'Haladó szintű feladatok',
        description: 'Többlépéses egyenletek, zárójelek és változók (x, y, z) használata.',
        difficulty: 'hard',
        problems: [
            {
                id: 'h1-1',
                question: 'Egy kerékpáros és egy gyalogos egyszerre indul egymással szemben két városból, amelyek távolsága 60 km. A kerékpáros sebessége 15 km/h, a gyalogosé 5 km/h. Hány óra múlva találkoznak?',
                answer: 3,
                answerTemplate: '{x} óra múlva találkoznak.',
                suffix: 'óra'
            },
            {
                id: 'h1-2',
                question: 'Gondoltam egy számot, kivontam belőle 4-et, az eredményt megszoroztam 5-tel, és 35-öt kaptam. Melyik volt a gondolt szám?',
                answer: 11,
                answerTemplate: 'A gondolt szám a(z) {x}.',
            },
            {
                id: 'h1-3',
                question: 'Egy téglalap egyik oldala 3 cm-rel hosszabb a másiknál. A kerülete 34 cm. Hány cm hosszú a rövidebb oldala?',
                answer: 7,
                answerTemplate: 'A rövidebb oldal {x} cm.',
                suffix: 'cm'
            },
            {
                id: 'h1-4',
                question: 'Két szám összege 100. Ha az egyiket elosztjuk a másikkal, a hányados 4 lesz. Melyik a nagyobb szám?',
                answer: 80,
                answerTemplate: 'A nagyobb szám a(z) {x}.',
            },
            {
                id: 'h1-5',
                question: 'Egy udvaron csirkék és nyulak vannak. Összesen 20 fejük és 56 lábuk van. Hány nyúl van az udvaron?',
                answer: 8,
                answerTemplate: 'Az udvaron {x} nyúl van.',
                suffix: 'nyúl'
            },
            {
                id: 'h1-6',
                question: 'Van két számunk, x és y. Tudjuk, hogy x = y + 2. Ha x háromszorosához hozzáadjuk y kétszeresét, az eredmény 31. Mennyi az y értéke?',
                answer: 5,
                answerTemplate: 'Az y értéke: {x}',
            },
            {
                id: 'h1-7',
                question: 'Egy munkát A munkás 6 óra alatt, B munkás 3 óra alatt végez el. Hány óra alatt végzik el együtt?',
                answer: 2,
                answerTemplate: 'Együtt {x} óra alatt végzik el.',
                suffix: 'óra'
            },
            {
                id: 'h1-8',
                question: 'Egy szám 15%-a 10-zel kevesebb, mint a szám 20%-a. Melyik ez a szám?',
                answer: 200,
                answerTemplate: 'A keresett szám a(z) {x}.',
            },
            {
                id: 'h1-9',
                question: 'Három szám összege (x + y + z) = 90. A második szám (y) az első (x) kétszerese, a harmadik (z) pedig 10-zel több a másodiknál (y). Mennyi az x értéke?',
                answer: 16,
                answerTemplate: 'Az x értéke: {x}',
            },
            {
                id: 'h1-10',
                question: 'Egy vonat 80 km/h sebességgel halad. Mennyi idő alatt tesz meg 120 km-t?',
                answer: 1.5,
                answerTemplate: '{x} óra alatt.',
                suffix: 'óra'
            }
        ]
    }
];
