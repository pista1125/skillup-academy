export interface Fraction {
    num: number;
    den: number;
}

export type QuestionType = 'multiple-choice' | 'number-line' | 'written-calculation' | 'matching' | 'word-problem';

export interface Question {
    id: string;
    type: QuestionType;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    options?: string[];
    correctOption?: number;
    correctAnswer?: any;
    targetValue?: number;
    pairs?: { left: string; right: string; id: string }[];
    hint?: string;
}

export const CLOSING_TEST_DATA: Question[] = [
    // --- EASY LEVEL (30 Questions) ---
    {
        id: 'e1',
        type: 'multiple-choice',
        question: 'Melyik ábra jelöli a 2/4-et?',
        difficulty: 'easy',
        points: 10,
        options: ['Egy kör fele', 'Egy kör negyede', 'Egy kör háromnegyede', 'Egy egész kör'],
        correctOption: 0,
        hint: 'Gondolj az egyszerűsítésre: 2/4 = 1/2'
    },
    {
        id: 'e2',
        type: 'written-calculation',
        question: 'Mennyi 1/5 + 2/5?',
        difficulty: 'easy',
        points: 10,
        correctAnswer: { num: 3, den: 5 }
    },
    {
        id: 'e3',
        type: 'number-line',
        question: 'Helyezd el a 0,5-öt (ami 1/2) a számegyenesen!',
        difficulty: 'easy',
        points: 10,
        targetValue: 0.5
    },
    {
        id: 'e4',
        type: 'matching',
        question: 'Párosítsd a törteket a nevükkel!',
        difficulty: 'easy',
        points: 15,
        pairs: [
            { id: 'p1', left: '1/2', right: 'fél' },
            { id: 'p2', left: '1/4', right: 'negyed' },
            { id: 'p3', left: '3/4', right: 'háromnegyed' }
        ]
    },
    {
        id: 'e5',
        type: 'word-problem',
        question: 'Peti megevett egy pizza 1/8-át, majd még 3/8-át. A pizza mekkora részét ette meg összesen?',
        difficulty: 'easy',
        points: 15,
        options: ['1/2', '4/8', '2/8', 'Mindent'],
        correctOption: 0,
        hint: '1/8 + 3/8 = 4/8, ami egyszerűsítve 1/2.'
    },
    {
        id: 'e6',
        type: 'multiple-choice',
        question: 'Melyik tört nagyobb: 1/3 vagy 1/5?',
        difficulty: 'easy',
        points: 10,
        options: ['1/3', '1/5', 'Egyenlőek', 'Nem összehasonlíthatóak'],
        correctOption: 0
    },
    {
        id: 'e7',
        type: 'written-calculation',
        question: 'Végezd el a kivonást: 7/9 - 4/9',
        difficulty: 'easy',
        points: 10,
        correctAnswer: { num: 3, den: 9 }
    },
    {
        id: 'e8',
        type: 'multiple-choice',
        question: 'Hány negyed alkot egy egészet?',
        difficulty: 'easy',
        points: 10,
        options: ['1', '2', '3', '4'],
        correctOption: 3
    },
    {
        id: 'e9',
        type: 'number-line',
        question: 'Jelöld be a 0,75-öt a számegyenesen!',
        difficulty: 'easy',
        points: 10,
        targetValue: 0.75
    },
    {
        id: 'e10',
        type: 'word-problem',
        question: 'Egy tálban 12 alma van. Mennyi a 12 alma 1/3 része?',
        difficulty: 'easy',
        points: 15,
        correctAnswer: 4
    },
    {
        id: 'e11',
        type: 'multiple-choice',
        question: 'Melyik tört egyenlő 1-gyel?',
        difficulty: 'easy',
        points: 10,
        options: ['1/2', '2/1', '5/5', '0/5'],
        correctOption: 2
    },
    {
        id: 'e12',
        type: 'written-calculation',
        question: 'Mennyi 3/10 + 4/10?',
        difficulty: 'easy',
        points: 10,
        correctAnswer: { num: 7, den: 10 }
    },
    {
        id: 'e13',
        type: 'number-line',
        question: 'Helyezd el az 1/4-et (0,25) a számegyenesen!',
        difficulty: 'easy',
        points: 10,
        targetValue: 0.25
    },
    {
        id: 'e14',
        type: 'matching',
        question: 'Párosítsd a törteket a tizedes alakjukkal!',
        difficulty: 'easy',
        points: 15,
        pairs: [
            { id: 'p4', left: '1/2', right: '0,5' },
            { id: 'p5', left: '1/10', right: '0,1' },
            { id: 'p6', left: '1/4', right: '0,25' }
        ]
    },
    {
        id: 'e15',
        type: 'word-problem',
        question: 'Egy csoki 10 kockából áll. Kati megevett 3 kockát. A csoki mekkora részét ette meg?',
        difficulty: 'easy',
        points: 15,
        options: ['1/3', '3/10', '10/3', '0,7'],
        correctOption: 1
    },
    {
        id: 'e16',
        type: 'multiple-choice',
        question: 'Mit jelent a törtvonal?',
        difficulty: 'easy',
        points: 10,
        options: ['Összeadást', 'Kivonást', 'Osztást', 'Szorzást'],
        correctOption: 2
    },
    {
        id: 'e17',
        type: 'written-calculation',
        question: 'Mennyi 1 - 2/5?',
        difficulty: 'easy',
        points: 10,
        correctAnswer: { num: 3, den: 5 }
    },
    {
        id: 'e18',
        type: 'number-line',
        question: 'Hova kerül az 1 egész a számegyenesen?',
        difficulty: 'easy',
        points: 10,
        targetValue: 1
    },
    {
        id: 'e19',
        type: 'matching',
        question: 'Melyik mennyi?',
        difficulty: 'easy',
        points: 15,
        pairs: [
            { id: 'p7', left: '2/2', right: '1' },
            { id: 'p8', left: '0/5', right: '0' },
            { id: 'p9', left: '4/2', right: '2' }
        ]
    },
    {
        id: 'e20',
        type: 'word-problem',
        question: 'Egy osztály 20 fős. Az osztály 1/4-e szemüveges. Hányan szemüvegesek?',
        difficulty: 'easy',
        points: 15,
        correctAnswer: 5
    },
    {
        id: 'e21',
        type: 'multiple-choice',
        question: 'Melyik a számláló a 3/4-ben?',
        difficulty: 'easy',
        points: 10,
        options: ['3', '4', 'törtvonal', 'Egyik sem'],
        correctOption: 0
    },
    {
        id: 'e22',
        type: 'written-calculation',
        question: 'Mennyi 2/7 + 5/7?',
        difficulty: 'easy',
        points: 10,
        correctAnswer: { num: 7, den: 7 }
    },
    {
        id: 'e23',
        type: 'number-line',
        question: 'Jelöld be a 0,2-t!',
        difficulty: 'easy',
        points: 10,
        targetValue: 0.2
    },
    {
        id: 'e24',
        type: 'matching',
        question: 'Törtek és tizedesek',
        difficulty: 'easy',
        points: 15,
        pairs: [
            { id: 'p10', left: '1/5', right: '0,2' },
            { id: 'p11', left: '2/5', right: '0,4' },
            { id: 'p12', left: '3/5', right: '0,6' }
        ]
    },
    {
        id: 'e25',
        type: 'word-problem',
        question: 'Emi 500 Ft-ot kapott. Elköltötte a pénze 1/5-ét. Hány forintot költött el?',
        difficulty: 'easy',
        points: 15,
        correctAnswer: 100
    },
    {
        id: 'e26',
        type: 'multiple-choice',
        question: 'Hány tized alkot egy egészet?',
        difficulty: 'easy',
        points: 10,
        options: ['1', '10', '100', '5'],
        correctOption: 1
    },
    {
        id: 'e27',
        type: 'written-calculation',
        question: 'Mennyi 0,3 + 0,4?',
        difficulty: 'easy',
        points: 10,
        correctAnswer: 0.7
    },
    {
        id: 'e28',
        type: 'number-line',
        question: 'Hova kerül a 1,5 a számegyenesen?',
        difficulty: 'easy',
        points: 10,
        targetValue: 1.5
    },
    {
        id: 'e29',
        type: 'matching',
        question: 'Párosíts!',
        difficulty: 'easy',
        points: 15,
        pairs: [
            { id: 'p13', left: 'fél kg', right: '50 dkg' },
            { id: 'p14', left: 'negyed kg', right: '25 dkg' },
            { id: 'p15', left: 'tized kg', right: '10 dkg' }
        ]
    },
    {
        id: 'e30',
        type: 'word-problem',
        question: 'Egy 2 méteres szalag 1/2 részét levágtuk. Hány méter maradt?',
        difficulty: 'easy',
        points: 15,
        correctAnswer: 1
    },

    // --- MEDIUM LEVEL (30 Questions) ---
    {
        id: 'm1',
        type: 'multiple-choice',
        question: 'Mennyi 1/2 + 1/4?',
        difficulty: 'medium',
        points: 15,
        options: ['2/6', '3/4', '1/6', '2/4'],
        correctOption: 1
    },
    {
        id: 'm2',
        type: 'written-calculation',
        question: 'Mennyi 2/3 + 1/6? (Add meg a legegyszerűbb alakban!)',
        difficulty: 'medium',
        points: 15,
        correctAnswer: { num: 5, den: 6 }
    },
    {
        id: 'm3',
        type: 'number-line',
        question: 'Jelöld be a 1/3-ot a számegyenesen!',
        difficulty: 'medium',
        points: 15,
        targetValue: 0.33
    },
    {
        id: 'm4',
        type: 'matching',
        question: 'Párosítsd a bővített alakokat!',
        difficulty: 'medium',
        points: 20,
        pairs: [
            { id: 'p16', left: '1/2', right: '5/10' },
            { id: 'p17', left: '2/3', right: '4/6' },
            { id: 'p18', left: '3/4', right: '9/12' }
        ]
    },
    {
        id: 'm5',
        type: 'word-problem',
        question: 'Egy könyv 120 oldalas. Anna elolvasta a könyv 3/4-ét. Hány oldal van még hátra?',
        difficulty: 'medium',
        points: 20,
        correctAnswer: 30
    },
    {
        id: 'm6',
        type: 'multiple-choice',
        question: 'Melyik tört felel meg a 0,8-nak?',
        difficulty: 'medium',
        points: 15,
        options: ['1/8', '8/10', '8/100', '4/5'],
        correctOption: 3
    },
    {
        id: 'm7',
        type: 'written-calculation',
        question: 'Mennyi 5/6 - 1/3?',
        difficulty: 'medium',
        points: 15,
        correctAnswer: { num: 1, den: 2 }
    },
    {
        id: 'm8',
        type: 'multiple-choice',
        question: 'Mennyi 2/5 tizedes alakban?',
        difficulty: 'medium',
        points: 15,
        options: ['0,2', '0,4', '0,5', '2,5'],
        correctOption: 1
    },
    {
        id: 'm9',
        type: 'number-line',
        question: 'Jelöld be a 2/5-öt (0,4) a számegyenesen!',
        difficulty: 'medium',
        points: 15,
        targetValue: 0.4
    },
    {
        id: 'm10',
        type: 'word-problem',
        question: 'Egy tálca sütemény 24 darabból áll. A vendégek megették a 5/8-át. Hány darab süti maradt?',
        difficulty: 'medium',
        points: 20,
        correctAnswer: 9
    },
    {
        id: 'm11',
        type: 'multiple-choice',
        question: 'Melyik tört a legkisebb?',
        difficulty: 'medium',
        points: 15,
        options: ['1/2', '2/3', '1/4', '3/4'],
        correctOption: 2
    },
    {
        id: 'm12',
        type: 'written-calculation',
        question: 'Mennyi 3/8 + 1/4?',
        difficulty: 'medium',
        points: 15,
        correctAnswer: { num: 5, den: 8 }
    },
    {
        id: 'm13',
        type: 'number-line',
        question: 'Jelöld be a 1,25-öt!',
        difficulty: 'medium',
        points: 15,
        targetValue: 1.25
    },
    {
        id: 'm14',
        type: 'matching',
        question: 'Törtek egyszerűsítése',
        difficulty: 'medium',
        points: 20,
        pairs: [
            { id: 'p19', left: '10/20', right: '1/2' },
            { id: 'p20', left: '6/9', right: '2/3' },
            { id: 'p21', left: '8/12', right: '2/3' }
        ]
    },
    {
        id: 'm15',
        type: 'word-problem',
        question: 'Egy 60 perces óra 2/3 része hány perc?',
        difficulty: 'medium',
        points: 20,
        correctAnswer: 40
    },
    {
        id: 'm16',
        type: 'multiple-choice',
        question: 'Mennyi 0,25 + 1/2?',
        difficulty: 'medium',
        points: 15,
        options: ['0,30', '0,75', '1/4', '0,50'],
        correctOption: 1
    },
    {
        id: 'm17',
        type: 'written-calculation',
        question: 'Mennyi 1,5 - 3/4?',
        difficulty: 'medium',
        points: 15,
        correctAnswer: 0.75
    },
    {
        id: 'm18',
        type: 'number-line',
        question: 'Hova kerül a 7/4 a számegyenesen?',
        difficulty: 'medium',
        points: 15,
        targetValue: 1.75
    },
    {
        id: 'm19',
        type: 'matching',
        question: 'Tizedesek és törtek',
        difficulty: 'medium',
        points: 20,
        pairs: [
            { id: 'p22', left: '0,125', right: '1/8' },
            { id: 'p23', left: '0,375', right: '3/8' },
            { id: 'p24', left: '0,625', right: '5/8' }
        ]
    },
    {
        id: 'm20',
        type: 'word-problem',
        question: 'Egy tartály 40 literes. A 3/5-éig van tele. Hány liter víz van benne?',
        difficulty: 'medium',
        points: 20,
        correctAnswer: 24
    },
    {
        id: 'm21',
        type: 'multiple-choice',
        question: 'Mennyi 3 * 1/4?',
        difficulty: 'medium',
        points: 15,
        options: ['3/4', '4/3', '1/12', '3/12'],
        correctOption: 0
    },
    {
        id: 'm22',
        type: 'written-calculation',
        question: 'Mennyi (1/2 + 1/3) * 6?',
        difficulty: 'medium',
        points: 15,
        correctAnswer: 5
    },
    {
        id: 'm23',
        type: 'number-line',
        question: 'Jelöld be a -0,5-öt!',
        difficulty: 'medium',
        points: 15,
        targetValue: -0.5
    },
    {
        id: 'm24',
        type: 'matching',
        question: 'Műveletek eredménye',
        difficulty: 'medium',
        points: 20,
        pairs: [
            { id: 'p25', left: '1/2 * 2', right: '1' },
            { id: 'p26', left: '1/4 * 4', right: '1' },
            { id: 'p27', left: '1/3 * 3', right: '1' }
        ]
    },
    {
        id: 'm25',
        type: 'word-problem',
        question: 'Hány óra 150 perc?',
        difficulty: 'medium',
        points: 20,
        options: ['1,5 óra', '2,5 óra', '2 óra 50 perc', '3 óra'],
        correctOption: 1
    },
    {
        id: 'm26',
        type: 'multiple-choice',
        question: 'Mennyi 1/5 osztva 2-vel?',
        difficulty: 'medium',
        points: 15,
        options: ['1/10', '2/5', '10/1', '1/2.5'],
        correctOption: 0
    },
    {
        id: 'm27',
        type: 'written-calculation',
        question: 'Végezd el: 0,8 : 4',
        difficulty: 'medium',
        points: 15,
        correctAnswer: 0.2
    },
    {
        id: 'm28',
        type: 'number-line',
        question: 'Jelöld be a 0,1-et!',
        difficulty: 'medium',
        points: 15,
        targetValue: 0.1
    },
    {
        id: 'm29',
        type: 'matching',
        question: 'Reciprok jellegű párok (szorzatuk 1)',
        difficulty: 'medium',
        points: 20,
        pairs: [
            { id: 'p28', left: '2', right: '0,5' },
            { id: 'p29', left: '4', right: '0,25' },
            { id: 'p30', left: '5', right: '0,2' }
        ]
    },
    {
        id: 'm30',
        type: 'word-problem',
        question: 'Egy autó 100 km-t tett meg, ami az út 2/5-e. Milyen hosszú a teljes út?',
        difficulty: 'medium',
        points: 20,
        correctAnswer: 250
    },

    // --- HARD LEVEL (30 Questions) ---
    {
        id: 'h1',
        type: 'multiple-choice',
        question: 'Mennyi 2/3 + 3/4 - 1/2?',
        difficulty: 'hard',
        points: 20,
        options: ['11/12', '7/12', '5/12', '1'],
        correctOption: 0
    },
    {
        id: 'h2',
        type: 'written-calculation',
        question: 'Mennyi (3/4 + 1/2) : 5?',
        difficulty: 'hard',
        points: 20,
        correctAnswer: { num: 1, den: 4 }
    },
    {
        id: 'h3',
        type: 'number-line',
        question: 'Jelöld be a 2/7-et (kb 0.286) a számegyenesen!',
        difficulty: 'hard',
        points: 20,
        targetValue: 0.29
    },
    {
        id: 'h4',
        type: 'matching',
        question: 'Tört alakok',
        difficulty: 'hard',
        points: 25,
        pairs: [
            { id: 'p31', left: '1 1/2', right: '3/2' },
            { id: 'p32', left: '2 3/4', right: '11/4' },
            { id: 'p33', left: '3 2/5', right: '17/5' }
        ]
    },
    {
        id: 'h5',
        type: 'word-problem',
        question: 'Egy hordóban lévő víz 2/9-e 10 liter. Hány liter víz van a hordó 5/9 részében?',
        difficulty: 'hard',
        points: 25,
        correctAnswer: 25
    },
    {
        id: 'h6',
        type: 'multiple-choice',
        question: 'Mennyi 0,12 * 0,5?',
        difficulty: 'hard',
        points: 20,
        options: ['0,6', '0,06', '0,006', '6'],
        correctOption: 1
    },
    {
        id: 'h7',
        type: 'written-calculation',
        question: 'Végezd el: (2/5 + 0,1) * 2',
        difficulty: 'hard',
        points: 20,
        correctAnswer: 1
    },
    {
        id: 'h8',
        type: 'multiple-choice',
        question: 'Melyik állítás igaz?',
        difficulty: 'hard',
        points: 20,
        options: ['1/2 < 1/3', '0,4 > 1/2', '2/3 < 3/4', '0,25 = 1/5'],
        correctOption: 2
    },
    {
        id: 'h9',
        type: 'number-line',
        question: 'Jelöld be a -1,75-öt!',
        difficulty: 'hard',
        points: 20,
        targetValue: -1.75
    },
    {
        id: 'h10',
        type: 'word-problem',
        question: 'Egy téglalap egyik oldala 4 cm, a másik oldal az első 3/4-e. Mennyi a téglalap kerülete?',
        difficulty: 'hard',
        points: 25,
        correctAnswer: 14
    },
    {
        id: 'h11',
        type: 'multiple-choice',
        question: 'Mennyi a 2/3 tizedes tört alakja kerekítve?',
        difficulty: 'hard',
        points: 20,
        options: ['0,6', '0,66', '0,67', '0,7'],
        correctOption: 2
    },
    {
        id: 'h12',
        type: 'written-calculation',
        question: 'Mennyi 5/8 - 0,25?',
        difficulty: 'hard',
        points: 20,
        correctAnswer: 0.375
    },
    {
        id: 'h13',
        type: 'number-line',
        question: 'Jelöld be a 13/4-et!',
        difficulty: 'hard',
        points: 20,
        targetValue: 3.25
    },
    {
        id: 'h14',
        type: 'matching',
        question: 'Mértékegységek',
        difficulty: 'hard',
        points: 25,
        pairs: [
            { id: 'p34', left: '3/4 óra', right: '45 perc' },
            { id: 'p35', left: '2/5 km', right: '400 m' },
            { id: 'p36', left: '7/10 l', right: '7 dl' }
        ]
    },
    {
        id: 'h15',
        type: 'word-problem',
        question: 'Egy vonatút 3/5 részét megtettük, még 80 km van hátra. Milyen hosszú a teljes út?',
        difficulty: 'hard',
        points: 25,
        correctAnswer: 200
    },
    {
        id: 'h16',
        type: 'multiple-choice',
        question: 'Mennyi 1,2 : 0,3?',
        difficulty: 'hard',
        points: 20,
        options: ['0,4', '4', '40', '0,04'],
        correctOption: 1
    },
    {
        id: 'h17',
        type: 'written-calculation',
        question: 'Végezd el: 3/4 * (1/2 + 1/6)',
        difficulty: 'hard',
        points: 20,
        correctAnswer: 0.5
    },
    {
        id: 'h18',
        type: 'number-line',
        question: 'Jelöld be a -2,2-t!',
        difficulty: 'hard',
        points: 20,
        targetValue: -2.2
    },
    {
        id: 'h19',
        type: 'matching',
        question: 'Összetett párok',
        difficulty: 'hard',
        points: 25,
        pairs: [
            { id: 'p37_v2', left: '2/3 * 3/2', right: '1' },
            { id: 'p38', left: '0,1 * 0,1', right: '0,01' },
            { id: 'p39', left: '1/2 : 1/2', right: '1' }
        ]
    },
    {
        id: 'h20',
        type: 'word-problem',
        question: 'Kati pénzének 2/3 része 600 Ft. Mennyi pénze van összesen?',
        difficulty: 'hard',
        points: 25,
        correctAnswer: 900
    },
    {
        id: 'h21',
        type: 'multiple-choice',
        question: 'Mennyi 15/4 vegyestört alakban?',
        difficulty: 'hard',
        points: 20,
        options: ['3 1/4', '3 3/4', '4 1/4', '3 2/4'],
        correctOption: 1
    },
    {
        id: 'h22',
        type: 'written-calculation',
        question: 'Mennyi (0,5 + 1/4) * (2 - 1/2)?',
        difficulty: 'hard',
        points: 20,
        correctAnswer: 1.125
    },
    {
        id: 'h23',
        type: 'number-line',
        question: 'Hova kerül a 0,05?',
        difficulty: 'hard',
        points: 20,
        targetValue: 0.05
    },
    {
        id: 'h24',
        type: 'matching',
        question: 'Kifejezések',
        difficulty: 'hard',
        points: 25,
        pairs: [
            { id: 'p40', left: 'a fele', right: 'a * 0,5' },
            { id: 'p41', left: 'a negyede', right: 'a : 4' },
            { id: 'p42', left: 'a tizede', right: 'a * 0,1' }
        ]
    },
    {
        id: 'h25',
        type: 'word-problem',
        question: 'Egy biciklis az út 1/4-ét megtette, majd a maradék 1/3-át. Az egész út mekkora része maradt még hátra?',
        difficulty: 'hard',
        points: 25,
        options: ['1/2', '1/4', '5/12', '1/3'],
        correctOption: 0,
        hint: '1/4 után marad 3/4. Ennek 1/3-a 1/4. Összesen 1/4 + 1/4 = 1/2 van meg.'
    },
    {
        id: 'h26',
        type: 'multiple-choice',
        question: 'Melyik szám van legközelebb a 0-hoz?',
        difficulty: 'hard',
        points: 20,
        options: ['-0,1', '0,05', '1/10', '-1/5'],
        correctOption: 1
    },
    {
        id: 'h27',
        type: 'written-calculation',
        question: 'Végezd el: 1,25 * 0,8',
        difficulty: 'hard',
        points: 20,
        correctAnswer: 1
    },
    {
        id: 'h28',
        type: 'number-line',
        question: 'Jelöld be a 0,99-et (közelítés)!',
        difficulty: 'hard',
        points: 20,
        targetValue: 0.99
    },
    {
        id: 'h29',
        type: 'matching',
        question: 'Számok és reciprokaik',
        difficulty: 'hard',
        points: 25,
        pairs: [
            { id: 'p43', left: '2/3', right: '1,5' },
            { id: 'p44', left: '4/5', right: '1,25' },
            { id: 'p45', left: '1/8', right: '8' }
        ]
    },
    {
        id: 'h30',
        type: 'word-problem',
        question: 'Egy 5 literes kannából kiöntöttünk 1,25 litert, majd a maradék 2/3 részét. Hány liter maradt a kannában?',
        difficulty: 'hard',
        points: 25,
        correctAnswer: 1.25
    }
];

export const getAllQuestions = () => {
    return CLOSING_TEST_DATA;
};
