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

export const percentRateWordProblems: PercentWordProblemSet[] = [
    {
        id: 'easy',
        title: 'Kezdő szint',
        description: 'Egyszerű számok, gyakori százalékok (10%, 20%, 25%, 50%)',
        difficulty: 'easy',
        color: 'emerald',
        problems: [
            {
                id: 'r1',
                question: 'Egy 20 fős osztályból 10 diák szemüveges. A diákok hány százaléka szemüveges?',
                answerTemplate: 'Tehát a diákok {x}%-a szemüveges.',
                answer: 50,
                suffix: '%',
            },
            {
                id: 'r2',
                question: 'Peti 1000 Ft-ot kapott, amiből 250 Ft-ot félretett. Megtakarítása hány százaléka a kapott összegnek?',
                answerTemplate: 'Tehát {x}%-át tette félre.',
                answer: 25,
                suffix: '%',
            },
            {
                id: 'r3',
                question: 'Egy 50 oldalas könyvből 5 oldalt olvastál el. Hány százalékát olvastad el a könyvnek?',
                answerTemplate: 'Tehát {x}%-át olvastad el.',
                answer: 10,
                suffix: '%',
            },
            {
                id: 'r4',
                question: 'Egy 40 darabos készletből 8 darab piros. A készlet hány százaléka piros?',
                answerTemplate: 'Tehát a készlet {x}%-a piros.',
                answer: 20,
                suffix: '%',
            },
            {
                id: 'r5',
                question: 'Egy 60 perces órából 30 perc telt el. Az idő hány százaléka telt el?',
                answerTemplate: 'Tehát az idő {x}%-a telt el.',
                answer: 50,
                suffix: '%',
            },
            {
                id: 'r6',
                question: 'Egy 80 fős kiránduláson 20-an felnőttek. A résztvevők hány százaléka felnőtt?',
                answerTemplate: 'Tehát a résztvevők {x}%-a felnőtt.',
                answer: 25,
                suffix: '%',
            },
            {
                id: 'r7',
                question: 'Egy 500 Ft-os csoki árát 50 Ft-tal csökkentették. Hány százalékos volt az árcsökkentés?',
                answerTemplate: 'Tehát az árcsökkentés {x}%-os volt.',
                answer: 10,
                suffix: '%',
            },
            {
                id: 'r8',
                question: 'Egy 200 literes hordóban 40 liter víz van. A hordó hány százaléka van tele?',
                answerTemplate: 'Tehát a hordó {x}%-a van tele.',
                answer: 20,
                suffix: '%',
            },
            {
                id: 'r9',
                question: 'Egy 100 pontos dolgozatban 50 pontot értél el. Hány százalékos lett a dolgozatod?',
                answerTemplate: 'Tehát a dolgozat {x}%-os lett.',
                answer: 50,
                suffix: '%',
            },
            {
                id: 'r10',
                question: 'Egy 400 fős iskolában 100-an járnak sportkörre. A diákok hány százaléka sportol?',
                answerTemplate: 'Tehát a diákok {x}%-a sportol.',
                answer: 25,
                suffix: '%',
            },
        ],
    },
    {
        id: 'medium',
        title: 'Haladó szint',
        description: 'Változatosabb számok (5%, 15%, 30%, 40%, 75%)',
        difficulty: 'medium',
        color: 'amber',
        problems: [
            {
                id: 'r11',
                question: 'Egy 1200 Ft-os könyv ára 300 Ft-tal nőtt. Hány százalékos volt az áremelés?',
                answerTemplate: 'Tehát az áremelés {x}%-os volt.',
                answer: 25,
                suffix: '%',
            },
            {
                id: 'r12',
                question: 'Egy 80 fős moziteremben 12-en ülnek az első sorban. A nézők hány százaléka ül elöl?',
                answerTemplate: 'Tehát a nézők {x}%-a ül elöl.',
                answer: 15,
                suffix: '%',
            },
            {
                id: 'r13',
                question: 'Egy 400 grammos csoki 20 gramm mogyorót tartalmaz. Hány százaléka a csokinak mogyoró?',
                answerTemplate: 'Tehát a mogyoró a csoki {x}%-a.',
                answer: 5,
                suffix: '%',
            },
            {
                id: 'r14',
                question: 'Egy 5000 Ft-ért vett cipő árát 1500 Ft-tal szállították le. Hány százalékkal lett olcsóbb?',
                answerTemplate: 'Tehát a cipő {x}%-kal lett olcsóbb.',
                answer: 30,
                suffix: '%',
            },
            {
                id: 'r15',
                question: 'Egy 250 fős cégnél 100-an otthonról dolgoznak. A dolgozók hány százaléka home office-os?',
                answerTemplate: 'Tehát a dolgozók {x}%-a dolgozik otthonról.',
                answer: 40,
                suffix: '%',
            },
            {
                id: 'r16',
                question: 'Egy 80 kérdéses tesztből 60-at találtál el. Hány százalékos a teszted?',
                answerTemplate: 'Tehát a teszt {x}%-os lett.',
                answer: 75,
                suffix: '%',
            },
            {
                id: 'r17',
                question: 'Egy 200 literes tartályból 30 liter víz párolgott el. Hány százaléka telt el a víznek?',
                answerTemplate: 'Tehát a víz {x}%-a párolgott el.',
                answer: 15,
                suffix: '%',
            },
            {
                id: 'r18',
                question: 'Egy 600 fős faluban 180 ember nyugdíjas. A lakók hány százaléka nyugdíjas?',
                answerTemplate: 'Tehát a lakók {x}%-a nyugdíjas.',
                answer: 30,
                suffix: '%',
            },
            {
                id: 'r19',
                question: 'Egy 500 oldalas regényből 200 oldalt olvastál el. A könyv hány százalékával végeztél?',
                answerTemplate: 'Tehát a könyv {x}%-ával végeztél.',
                answer: 40,
                suffix: '%',
            },
            {
                id: 'r20',
                question: 'Egy 40 fős buszon 2-en állnak. Az utasok hány százaléka áll?',
                answerTemplate: 'Tehát az utasok {x}%-a áll.',
                answer: 5,
                suffix: '%',
            },
        ],
    },
    {
        id: 'hard',
        title: 'Mester szint',
        description: 'Bármilyen százalék, tizedesjegyekkel is',
        difficulty: 'hard',
        color: 'rose',
        problems: [
            {
                id: 'r21',
                question: 'Egy 48 500 Ft-os készülék árát 5 820 Ft-tal mérsékelték. Hány százalékos volt az engedmény?',
                answerTemplate: 'Tehát az engedmény {x}%-os volt.',
                answer: 12,
                suffix: '%',
            },
            {
                id: 'r22',
                question: 'Egy 125 000 lakosú városban 4 000-rel nőtt a népesség. Hány százalékos volt a növekedés?',
                answerTemplate: 'Tehát a népesség {x}%-kal nőtt.',
                answer: 3.2,
                suffix: '%',
            },
            {
                id: 'r23',
                question: 'Egy 385 000 Ft-os bevételből 69 300 Ft az alapanyagköltség. A bevétel hány százaléka megy alapanyagra?',
                answerTemplate: 'Tehát a bevétel {x}%-a megy alapanyagra.',
                answer: 18,
                suffix: '%',
            },
            {
                id: 'r24',
                question: 'Egy 520 000 Ft-os bruttó bérből 174 200 Ft az adó. A fizetés hány százaléka az adó?',
                answerTemplate: 'Tehát a fizetés {x}%-a az adó.',
                answer: 33.5,
                suffix: '%',
            },
            {
                id: 'r25',
                question: 'Egy erdőben 12 500 fából 1 050 dőlt ki a viharban. A fák hány százaléka dőlt ki?',
                answerTemplate: 'Tehát a fák {x}%-a dőlt ki.',
                answer: 8.4,
                suffix: '%',
            },
            {
                id: 'r26',
                question: 'Egy 250 szobás szállodában 180 szoba foglalt. Mennyi a telítettség százalékban?',
                answerTemplate: 'Tehát a telítettség {x}%-os.',
                answer: 72,
                suffix: '%',
            },
            {
                id: 'r27',
                question: 'Egy 1 250 000 literes uszodában 10 000 liter klóros víz van. Hány százaléka a víznek klóros?',
                answerTemplate: 'Tehát a víz {x}%-a klóros.',
                answer: 0.8,
                suffix: '%',
            },
            {
                id: 'r28',
                question: 'Egy 48 000 000 Ft-os éves büdzséből 10 800 000 Ft-ot költenek marketingre. A keret hány százaléka a marketing?',
                answerTemplate: 'Tehát a keret {x}%-a megy marketingre.',
                answer: 22.5,
                suffix: '%',
            },
            {
                id: 'r29',
                question: 'Egy csatár 150 lövéséből 21-ből lett gól. Hány százalékos a hatékonysága?',
                answerTemplate: 'Tehát a hatékonysága {x}%-os.',
                answer: 14,
                suffix: '%',
            },
            {
                id: 'r30',
                question: 'Egy 2 400 000 Ft-os betét után 156 000 Ft kamatot kaptál. Hány százalékos a kamatláb?',
                answerTemplate: 'Tehát a kamatláb {x}%-os.',
                answer: 6.5,
                suffix: '%',
            },
        ],
    },
];
