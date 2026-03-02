export interface PercentWordProblem {
    id: string;
    question: string;
    answerTemplate: string; // e.g. "Tehát {x} Ft volt a kedvezmény."
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

export const percentValueWordProblems: PercentWordProblemSet[] = [
    {
        id: 'easy',
        title: 'Kezdő szint',
        description: 'Egyszerű számok, kerek százalékok (10%, 20%, 25%, 50%)',
        difficulty: 'easy',
        color: 'emerald',
        problems: [
            {
                id: 'e1',
                question: 'Egy kabát ára 24 000 Ft. Akció során 50% kedvezményt adnak. Hány forint a kedvezmény összege?',
                answerTemplate: 'Tehát {x} Ft volt a kedvezmény.',
                answer: 12000,
                suffix: 'Ft',
            },
            {
                id: 'e2',
                question: 'Egy osztályba 40 diák jár. A diákok 25%-a kapott jeles bizonyítványt. Hány diák kapott jelest?',
                answerTemplate: 'Tehát {x} diák kapott jeles bizonyítványt.',
                answer: 10,
                suffix: 'fő',
            },
            {
                id: 'e3',
                question: 'Egy könyv ára 5 000 Ft. Az üzletben 10%-os kedvezményt adnak. Mennyi a kedvezmény összege?',
                answerTemplate: 'Tehát a kedvezmény {x} Ft.',
                answer: 500,
                suffix: 'Ft',
            },
            {
                id: 'e4',
                question: 'Egy farmon 200 állat van. Az állatok 20%-a tehén. Hány tehén van a farmon?',
                answerTemplate: 'Tehát {x} tehén van a farmon.',
                answer: 40,
                suffix: 'db',
            },
            {
                id: 'e5',
                question: 'Peti 1000 Ft-ot kapott zsebpénznek. Ennek 50%-át elköltötte. Hány forintot költött el?',
                answerTemplate: 'Tehát Peti {x} Ft-ot költött el.',
                answer: 500,
                suffix: 'Ft',
            },
            {
                id: 'e6',
                question: 'Egy iskola 300 diákjának 10%-a részt vett a matekversenyen. Hány diák versenyzett?',
                answerTemplate: 'Tehát {x} diák vett részt a versenyen.',
                answer: 30,
                suffix: 'fő',
            },
            {
                id: 'e7',
                question: 'Egy 400 literes tartály 25%-a tele van vízzel. Hány liter víz van a tartályban?',
                answerTemplate: 'Tehát {x} liter víz van benne.',
                answer: 100,
                suffix: 'liter',
            },
            {
                id: 'e8',
                question: 'Anyu 8 000 Ft-ért vett gyümölcsöt. Az összeg 50%-át almára költötte. Mennyit fizetett az almáért?',
                answerTemplate: 'Tehát az alma {x} Ft-ba került.',
                answer: 4000,
                suffix: 'Ft',
            },
            {
                id: 'e9',
                question: 'Egy futballmeccsen 500 szurkoló volt. A szurkolók 20%-a volt vendégszurkoló. Hány vendégszurkoló volt?',
                answerTemplate: 'Tehát {x} vendégszurkoló volt a meccsen.',
                answer: 100,
                suffix: 'fő',
            },
            {
                id: 'e10',
                question: 'Egy házi dolgozatban 20 feladat van. Zsófi a feladatok 50%-át oldotta meg helyesen. Hány feladatot oldott meg jól?',
                answerTemplate: 'Tehát Zsófi {x} feladatot oldott meg helyesen.',
                answer: 10,
                suffix: 'db',
            },
        ],
    },
    {
        id: 'medium',
        title: 'Haladó szint',
        description: 'Változatosabb számok és százalékok (5%, 15%, 30%, 40%, 75%)',
        difficulty: 'medium',
        color: 'amber',
        problems: [
            {
                id: 'm1',
                question: 'Egy laptop ára 180 000 Ft. A bolt 15% kedvezményt ad rá. Mekkora a kedvezmény összege?',
                answerTemplate: 'Tehát a kedvezmény {x} Ft.',
                answer: 27000,
                suffix: 'Ft',
            },
            {
                id: 'm2',
                question: 'Egy iskolában 360 diák tanul. A diákok 30%-a szakkörre jár. Hány diák jár szakkörre?',
                answerTemplate: 'Tehát {x} diák jár szakkörre.',
                answer: 108,
                suffix: 'fő',
            },
            {
                id: 'm3',
                question: 'Egy gyár 2 500 terméket állít elő naponta. Ebből 4% selejtes. Hány selejtes termék készül naponta?',
                answerTemplate: 'Tehát {x} selejtes termék készül naponta.',
                answer: 100,
                suffix: 'db',
            },
            {
                id: 'm4',
                question: 'Egy hónap alatt 240 mm eső esett. Ennek 75%-a júliusban hullott. Hány mm eső esett júliusban?',
                answerTemplate: 'Tehát júliusban {x} mm eső esett.',
                answer: 180,
                suffix: 'mm',
            },
            {
                id: 'm5',
                question: 'Egy város 45 000 lakójának 40%-a 18 év alatti. Hány fiatalkorú lakosa van a városnak?',
                answerTemplate: 'Tehát {x} fiatalkorú lakos van.',
                answer: 18000,
                suffix: 'fő',
            },
            {
                id: 'm6',
                question: 'Egy vonat 160 km/h sebességgel halad. Lassítás után a sebesség 35%-kal csökkent. Hány km/h-val csökkent a sebesség?',
                answerTemplate: 'Tehát {x} km/h-val csökkent a sebesség.',
                answer: 56,
                suffix: 'km/h',
            },
            {
                id: 'm7',
                question: 'Egy üzletben az 56 000 Ft-ot érő telefon árából 5% kedvezményt adnak diákigazolvánnyal. Mennyi a kedvezmény?',
                answerTemplate: 'Tehát a kedvezmény {x} Ft.',
                answer: 2800,
                suffix: 'Ft',
            },
            {
                id: 'm8',
                question: 'Egy kertben 80 fa áll. A fák 15%-a almafa. Hány almafa van a kertben?',
                answerTemplate: 'Tehát {x} almafa van a kertben.',
                answer: 12,
                suffix: 'db',
            },
            {
                id: 'm9',
                question: 'Egy étteremben a 12 500 Ft-os vacsora után 10% borravalót hagytak. Mennyi volt a borravaló?',
                answerTemplate: 'Tehát {x} Ft borravalót hagytak.',
                answer: 1250,
                suffix: 'Ft',
            },
            {
                id: 'm10',
                question: 'Egy tó területe 4 800 m². A tó 60%-a nádas. Mekkora területet borít nád?',
                answerTemplate: 'Tehát {x} m² területet borít nád.',
                answer: 2880,
                suffix: 'm²',
            },
        ],
    },
    {
        id: 'hard',
        title: 'Mester szint',
        description: 'Összetettebb problémák, bármilyen százalékkal',
        difficulty: 'hard',
        color: 'rose',
        problems: [
            {
                id: 'h1',
                question: 'Egy autó ára 4 750 000 Ft. Évente 12%-ot veszít az értékéből. Mennyivel csökken az értéke az első évben?',
                answerTemplate: 'Tehát az első évben {x} Ft-ot veszít az értékéből.',
                answer: 570000,
                suffix: 'Ft',
            },
            {
                id: 'h2',
                question: 'Egy város lakossága 125 000 fő. Az elmúlt évben a népesség 3,2%-kal nőtt. Hány új lakos költözött a városba?',
                answerTemplate: 'Tehát {x} új lakos költözött a városba.',
                answer: 4000,
                suffix: 'fő',
            },
            {
                id: 'h3',
                question: 'Egy cukrászda napi bevétele 385 000 Ft. Ebből 18% az alapanyagköltség. Mennyi az alapanyagra fordított összeg?',
                answerTemplate: 'Tehát {x} Ft megy alapanyagra.',
                answer: 69300,
                suffix: 'Ft',
            },
            {
                id: 'h4',
                question: 'Egy tanár havi fizetése 520 000 Ft. A bruttó bér 33,5%-a adó és járulékok. Mennyi az adó összege?',
                answerTemplate: 'Tehát {x} Ft az adó összege.',
                answer: 174200,
                suffix: 'Ft',
            },
            {
                id: 'h5',
                question: 'Egy erdőben 12 500 fa áll. A vihar a fák 8,4%-át kidöntötte. Hány fa dőlt ki?',
                answerTemplate: 'Tehát {x} fa dőlt ki a viharban.',
                answer: 1050,
                suffix: 'db',
            },
            {
                id: 'h6',
                question: 'Egy szálloda 250 szobájának 72%-a foglalt hétvégén. Hány szoba van foglalva?',
                answerTemplate: 'Tehát {x} szoba foglalt.',
                answer: 180,
                suffix: 'db',
            },
            {
                id: 'h7',
                question: 'Egy uszoda 1 250 000 liter vizet tartalmaz. A klórral kezelt víz a teljes mennyiség 0,8%-a. Hány liter a klóros víz?',
                answerTemplate: 'Tehát {x} liter klóros víz van.',
                answer: 10000,
                suffix: 'liter',
            },
            {
                id: 'h8',
                question: 'Egy cég éves bevétele 48 000 000 Ft. A bevétel 22,5%-át marketingre költik. Mennyi a marketing költségvetése?',
                answerTemplate: 'Tehát {x} Ft a marketing költségvetés.',
                answer: 10800000,
                suffix: 'Ft',
            },
            {
                id: 'h9',
                question: 'Egy focista 150 lövést adott le a szezonban. A lövései 14%-a volt gólt eredményező. Hány gólt szerzett?',
                answerTemplate: 'Tehát {x} gólt szerzett a szezonban.',
                answer: 21,
                suffix: 'db',
            },
            {
                id: 'h10',
                question: 'Egy bank 2 400 000 Ft-os betétre évi 6,5%-os kamatot fizet. Mekkora kamatot kap a betétes egy év után?',
                answerTemplate: 'Tehát {x} Ft kamatot kap egy év után.',
                answer: 156000,
                suffix: 'Ft',
            },
        ],
    },
];
