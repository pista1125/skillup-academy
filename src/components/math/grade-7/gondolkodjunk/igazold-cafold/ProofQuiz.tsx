import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ProofMatcher } from './ProofMatcher';
import { ProofSorter } from './ProofSorter';
import { ProofSolverFigure } from './ProofDiagrams';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Boxes,
  Split,
  Layers
} from 'lucide-react';

interface ProofQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Kijelentés (Állítás)',
    icon: <Lightbulb className="w-4 h-4 text-cyan-600" />,
    formula: 'Egyértelműen IGAZ (I) vagy HAMIS (H)',
    note: 'Kérdés, felkiáltás, óhaj, felszólítás és nyitott mondat (pl. x + 3 = 7) NEM kijelentés.'
  },
  {
    id: 'c2',
    title: '„Minden...” Tagadása',
    icon: <Split className="w-4 h-4 text-indigo-600" />,
    formula: '„Van olyan, amelyik NEM...”',
    note: 'A „Mindenki...” tagadása NEM a „Senki...”, hanem: „Legalább egyvalaki nem...”.'
  },
  {
    id: 'c3',
    title: 'Cáfolat (Ellenpélda)',
    icon: <ShieldAlert className="w-4 h-4 text-rose-600" />,
    formula: 'Elég 1 db működő ellenpélda!',
    note: 'Egy általános állítás megdöntéséhez egyetlenegy ellenpélda felmutatása elegendő.'
  },
  {
    id: 'c4',
    title: 'Általános Igazolás',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    formula: 'Algebrai levezetés (pl. 2k+1, 3n)',
    note: 'Nem elég néhány számpélda; minden esetre érvényes bizonyítást kell adni betűs kifejezésekkel.'
  },
  {
    id: 'c5',
    title: 'Skatulya-elv (Dirichlet)',
    icon: <Boxes className="w-4 h-4 text-amber-600" />,
    formula: 'n + 1 elem → n doboz ⇒ legalább 1-ben ≥ 2',
    note: 'Ha az elemek száma meghaladja a kategóriák számát, biztosan lesz átfedés/duplázódás.'
  },
  {
    id: 'c6',
    title: 'Indirekt Bizonyítás',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: 'Ellentét feltevése → Ellentmondás',
    note: 'Feltesszük az állítás tagadását, majd logikai úton lehetetlen ellentmondásra jutunk.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // ==========================================
  // LEVEL 1: Kijelentések és Alapvető Igazságértékek
  // ==========================================
  1: {
    level: 1,
    title: '1. Szint: Kijelentések és Igazságértékek',
    description: 'Kijelentések felismerése, alapvető igazságértékek (I/H) és egyszerű állítások tagadása.',
    questions: [
      {
        id: 'q1-1',
        question: 'Az alábbi mondatok közül melyik számít logikai KIJELENTÉSNEK a matematikában?',
        options: [
          '„Hány óra van most?”',
          '„A 28 osztható 7-tel.”',
          '„Légy szíves, csukd be az ablakot!”',
          '„Bárcsak holnap szombat lenne!”'
        ],
        correctAnswer: '„A 28 osztható 7-tel.”',
        explanation: 'A kijelentés olyan kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz vagy hamis. A 28 osztható 7-tel egy IGAZ kijelentés.',
        figure: <ProofSolverFigure type="statement" />
      },
      {
        id: 'q1-2',
        question: 'Mi az igazságértéke a következő kijelentésnek: „Minden prímszám páratlan.”?',
        options: [
          'IGAZ, mert a prímek nem oszthatók 2-vel.',
          'HAMIS, mert a 2 páros szám és egyben prímszám is.',
          'Nem dönthető el, mert végtelen sok prím van.',
          'IGAZ, mert az 1 és a 3 is páratlan.'
        ],
        correctAnswer: 'HAMIS, mert a 2 páros szám és egyben prímszám is.',
        explanation: 'A 2 az egyetlen páros prímszám. Ez az egyetlen ellenpélda elegendő ahhoz, hogy a „minden prímszám páratlan” állítás HAMIS legyen.',
        figure: <ProofSolverFigure type="counterexample" />
      },
      {
        id: 'q1-3',
        question: 'Melyik mondat NEM kijelentés az alábbiak közül?',
        options: [
          '„A négyzet átlói egyenlő hosszúak.”',
          '„A 15 négyzetszám.”',
          '„x + 4 = 9”',
          '„A háromszög belső szögeinek összege 180°.”'
        ],
        correctAnswer: '„x + 4 = 9”',
        explanation: 'Az „x + 4 = 9” egy nyitott mondat (egyenlet változóval), amelynek értéke az x értékétől függ, önmagában nem rendelkezik fix igazságértékkel.',
        figure: <ProofSolverFigure type="statement" />
      },
      {
        id: 'q1-4',
        question: 'Mi a pontos logikai tagadása az alábbi kijelentésnek: „Ma esik az eső.”?',
        options: [
          '„Ma süt a nap.”',
          '„Ma havazik.”',
          '„Ma nem esik az eső.”',
          '„Tegnap esett az eső.”'
        ],
        correctAnswer: '„Ma nem esik az eső.”',
        explanation: 'Egy A állítás tagadása pontosan akkor igaz, ha A hamis. „Ma esik az eső” tagadása: „Ma nem esik az eső”.',
        figure: <ProofSolverFigure type="negation" />
      },
      {
        id: 'q1-5',
        question: 'Mi az igazságértéke: „Ha egy egész szám osztható 10-zel, akkor osztható 5-tel is.”?',
        options: [
          'IGAZ, mert 10 = 2 · 5, így a 10 minden többszöröse 5-nek is többszöröse.',
          'HAMIS, mert a 15 osztható 5-tel, de 10-zel nem.',
          'HAMIS, mert a 0-ra nem érvényes.',
          'Nem kijelentés.'
        ],
        correctAnswer: 'IGAZ, mert 10 = 2 · 5, így a 10 minden többszöröse 5-nek is többszöröse.',
        explanation: 'Ha egy szám 10 többszöröse ($n = 10k$), akkor $n = 5 \cdot (2k)$, ami garantáltan osztható 5-tel. Az állítás IGAZ.',
        figure: <ProofSolverFigure type="divisibility" />
      },
      {
        id: 'q1-6',
        question: 'Mi a helyes tagadása annak a mondatnak, hogy „Minden diák szereti a fagylaltot.”?',
        options: [
          '„Egyetlen diák sem szereti a fagylaltot.”',
          '„Van olyan diák, aki nem szereti a fagylaltot.”',
          '„Minden diák utálja a fagylaltot.”',
          '„Csak néhány diák szereti a fagylaltot.”'
        ],
        correctAnswer: '„Van olyan diák, aki nem szereti a fagylaltot.”',
        explanation: 'A „Minden...” kezdetű állítás cáfolatához és pontos tagadásához elég, ha létezik legalább egy olyan eset, amire nem igaz: „Van olyan diák, aki nem szereti a fagylaltot.”',
        figure: <ProofSolverFigure type="negation" />
      },
      {
        id: 'q1-7',
        question: 'Egy dobozban 5 piros és 5 kék golyó van. Legalább hány golyót kell vakon kihúzni, hogy BIZTOSAN legyen köztük legalább egy piros golyó?',
        options: [
          '2 darabot',
          '5 darabot',
          '6 darabot',
          '10 darabot'
        ],
        correctAnswer: '6 darabot',
        explanation: 'A legrosszabb esetben az első 5 húzás mind kék golyó. A 6. húzott golyó már garantáltan piros lesz (5 kék + 1 = 6 húzás).',
        figure: <ProofSolverFigure type="pigeonhole" data={{ items: 6, boxes: 5 }} />
      },
      {
        id: 'q1-8',
        question: 'Igaz vagy Hamis: „Bármely két páros szám összege páros szám.”?',
        options: [
          'IGAZ, mert páros + páros = páros (2k + 2m = 2(k+m)).',
          'HAMIS, mert 2 + 2 = 4.',
          'HAMIS, mert a 0-ra nem működik.',
          'Csak pozitív számokra igaz.'
        ],
        correctAnswer: 'IGAZ, mert páros + páros = páros (2k + 2m = 2(k+m)).',
        explanation: 'Két páros szám algebrai alakja $2k$ és $2m$. Összegük $2k + 2m = 2(k + m)$, ami a 2 többszöröse, tehát mindig páros.',
        figure: <ProofSolverFigure type="parity" />
      },
      {
        id: 'q1-9',
        question: 'Melyik szám szolgál ELLENPÉLDAKÉNT a következő állításra: „Minden páratlan szám prímszám.”?',
        options: [
          '7',
          '9',
          '11',
          '13'
        ],
        correctAnswer: '9',
        explanation: 'A 9 páratlan szám, de nem prím ($9 = 3 \cdot 3$), így tökéletes ellenpélda az állítás cáfolatára.',
        figure: <ProofSolverFigure type="counterexample" />
      },
      {
        id: 'q1-10',
        question: 'Mi a pontos logikai értéke: „A rombusz minden oldala egyenlő hosszú.”?',
        options: [
          'IGAZ (definíció szerint a rombusz egyenlő oldalú négyszög).',
          'HAMIS, mert csak a szemközti oldalai egyenlőek.',
          'HAMIS, mert az a négyzet.',
          'Nem eldönthető.'
        ],
        correctAnswer: 'IGAZ (definíció szerint a rombusz egyenlő oldalú négyszög).',
        explanation: 'A rombusz geometriai definíciója: olyan négyszög, amelynek minden oldala egyenlő hosszúságú.',
        figure: <ProofSolverFigure type="statement" />
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Kvantorok, Ellenpéldák és Skatulya-elv
  // ==========================================
  2: {
    level: 2,
    title: '2. Szint: Kvantorok, Ellenpéldák és a Skatulya-elv',
    description: '„Minden” és „Van olyan” tagadása, ellenpélda keresése oszthatósági és geometriai állításokhoz.',
    questions: [
      {
        id: 'q2-1',
        question: 'Állítás: „Ha egy egész szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel is.” Melyik szám cáfolja meg ezt az állítást (ellenpélda)?',
        options: [
          '12',
          '24',
          '48',
          '72'
        ],
        correctAnswer: '12',
        explanation: 'A 12 osztható 4-gyel ($12:4=3$) és 6-tal is ($12:6=2$), de 12 NEM osztható 24-gyel. A 12 tehát cáfoló ellenpélda.',
        figure: <ProofSolverFigure type="counterexample" />
      },
      {
        id: 'q2-2',
        question: 'Mi a pontos tagadása: „Van olyan négyszög, amelynek minden szöge hegyesszög.”?',
        options: [
          '„Minden négyszögnek minden szöge hegyesszög.”',
          '„Egyetlen négyszögnek sincs minden szöge hegyesszög (minden négyszögben van nem hegyesszög).”',
          '„Van olyan négyszög, amelynek minden szöge tompaszög.”',
          '„Egyik négyszög sem tartalmaz hegyesszöget.”'
        ],
        correctAnswer: '„Egyetlen négyszögnek sincs minden szöge hegyesszög (minden négyszögben van nem hegyesszög).”',
        explanation: 'A „Létezik/Van olyan...” állítás tagadása: „Egyetlen sincs...” vagy „Minden négyszögben van legalább egy olyan szög, amelyik nem hegyesszög”.',
        figure: <ProofSolverFigure type="negation" />
      },
      {
        id: 'q2-3',
        question: 'Egy fiókban 10 pár fekete és 10 pár barna zokni van összekeverve. Legalább hány darab zoknit kell kivenni sötétben, hogy BIZTOSAN legyen köztük 2 azonos színű (egy hordható pár)?',
        options: [
          '2 darabot',
          '3 darabot',
          '11 darabot',
          '21 darabot'
        ],
        correctAnswer: '3 darabot',
        explanation: '2 szín van (2 skatulya: fekete, barna). A skatulya-elv szerint $2 + 1 = 3$ darab zoknit kihúzva a skatulyák száma kevesebb, mint az elemek száma, így biztosan lesz legalább 2 azonos színű.',
        figure: <ProofSolverFigure type="pigeonhole" data={{ items: 3, boxes: 2 }} />
      },
      {
        id: 'q2-4',
        question: 'Miért HAMIS a következő állítás: „Ha egy négyszög átlói merőlegesek egymásra, akkor az rombusz.”?',
        options: [
          'Mert a téglalap átlói merőlegesek.',
          'Mert a deltoid átlói is merőlegesek, mégsem feltétlenül rombusz.',
          'Mert a rombusz átlói sosem merőlegesek.',
          'Mert a négyzet átlói nem merőlegesek.'
        ],
        correctAnswer: 'Mert a deltoid átlói is merőlegesek, mégsem feltétlenül rombusz.',
        explanation: 'A deltoid átlói merőlegesek egymásra, de nem minden oldala egyenlő, így nem rombusz. A deltoid cáfoló ellenpélda.',
        figure: <ProofSolverFigure type="counterexample" />
      },
      {
        id: 'q2-5',
        question: 'Hány embernek kell lennie egy teremben ahhoz, hogy BIZTOSAN legyen köztük legalább kettő, aki a hétnek UGYANAZON A NAPJÁN született?',
        options: [
          '7 embernek',
          '8 embernek',
          '14 embernek',
          '15 embernek'
        ],
        correctAnswer: '8 embernek',
        explanation: 'A hétnek 7 napja van (7 skatulya). A skatulya-elv alapján $7 + 1 = 8$ ember esetén biztosan lesz legalább két ember, akik azonos napon születtek.',
        figure: <ProofSolverFigure type="pigeonhole" data={{ items: 8, boxes: 7 }} />
      },
      {
        id: 'q2-6',
        question: 'Igaz vagy Hamis: „Két páratlan szám szorzata mindig páratlan.”?',
        options: [
          'IGAZ, mert (2k + 1)(2m + 1) = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1.',
          'HAMIS, mert 3 · 3 = 9.',
          'HAMIS, mert 5 · 5 = 25.',
          'Nem dönthető el.'
        ],
        correctAnswer: 'IGAZ, mert (2k + 1)(2m + 1) = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1.',
        explanation: 'A beszorzás után $2 \cdot (\text{egész szám}) + 1$ alakot kapunk, ami a páratlan számok definíciója. Az állítás mindig IGAZ.',
        figure: <ProofSolverFigure type="parity" />
      },
      {
        id: 'q2-7',
        question: 'Melyik szám szolgál ellenpéldaként az „$n^2 > n$ minden egész $n$ számra” állításra?',
        options: [
          'n = 2',
          'n = 3',
          'n = 1',
          'n = -2'
        ],
        correctAnswer: 'n = 1',
        explanation: 'Ha $n = 1$, akkor $1^2 = 1$, ami NEM nagyobb 1-nél ($1 > 1$ hamis). (Hasonlóan $n = 0$ is ellenpélda, mert $0^2 = 0$).',
        figure: <ProofSolverFigure type="counterexample" />
      },
      {
        id: 'q2-8',
        question: 'Mi a tagadása: „Minden páros szám osztható 4-gyel.”?',
        options: [
          '„Egyetlen páros szám sem osztható 4-gyel.”',
          '„Van olyan páros szám, amelyik nem osztható 4-gyel.”',
          '„Minden páratlan szám osztható 4-gyel.”',
          '„Van olyan páratlan szám, amelyik osztható 4-gyel.”'
        ],
        correctAnswer: '„Van olyan páros szám, amelyik nem osztható 4-gyel.”',
        explanation: '„Minden párosra igaz P” tagadása: „Van olyan páros, amelyre NEM igaz P”. Például a 6 páros, de nem osztható 4-gyel.',
        figure: <ProofSolverFigure type="negation" />
      },
      {
        id: 'q2-9',
        question: 'Egy kalapban 4 piros, 4 fehér és 4 zöld golyó van. Legalább hány golyót kell kihúzni, hogy BIZTOSAN legyen köztük legalább 2 azonos színű?',
        options: [
          '3 darabot',
          '4 darabot',
          '5 darabot',
          '7 darabot'
        ],
        correctAnswer: '4 darabot',
        explanation: '3 szín van (3 skatulya). Ha 3 golyót húzunk, lehet mindhárom különböző (1 piros, 1 fehér, 1 zöld). A 4. golyó kihúzásával már biztosan lesz legalább 2 azonos színű.',
        figure: <ProofSolverFigure type="pigeonhole" data={{ items: 4, boxes: 3 }} />
      },
      {
        id: 'q2-10',
        question: 'Igaz vagy Hamis: „Ha egy háromszög két oldala egyenlő, akkor a harmadik oldalon fekvő szögei is egyenlők.”?',
        options: [
          'IGAZ (egyenlő szárú háromszög alapon fekvő szögei egyenlők).',
          'HAMIS, csak szabályos háromszögre igaz.',
          'HAMIS, derékszögű háromszögre nem működik.',
          'Nem kijelentés.'
        ],
        correctAnswer: 'IGAZ (egyenlő szárú háromszög alapon fekvő szögei egyenlők).',
        explanation: 'Ez a geometria egyik alaptétele: az egyenlő szárú háromszög alapjához tartozó belső szögei mindig egyenlő nagyságúak.',
        figure: <ProofSolverFigure type="statement" />
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Összetett Bizonyítások és Haladó Logika
  // ==========================================
  3: {
    level: 3,
    title: '3. Szint: Általános Bizonyítások és Haladó Skatulya-elv',
    description: 'Algebrai bizonyítások, indirekt levezetések és többlépéses logikai következtetések.',
    questions: [
      {
        id: 'q3-1',
        question: 'Hogyan bizonyítható általánosan, hogy három egymást követő egész szám összege mindig osztható 3-mal?',
        options: [
          'Kipróbáljuk: 1+2+3=6, 2+3+4=9, 3+4+5=12, és mivel mind jó, kész a bizonyítás.',
          'A három számot felírjuk (n-1), n, (n+1) alakban, összegük (n-1)+n+(n+1) = 3n, ami a 3 többszöröse.',
          'Mivel a 3 páratlan szám, a szorzata is osztható 3-mal.',
          'Nem igaz, mert van olyan három szám, amire nem működik.'
        ],
        correctAnswer: 'A három számot felírjuk (n-1), n, (n+1) alakban, összegük (n-1)+n+(n+1) = 3n, ami a 3 többszöröse.',
        explanation: 'Egy általános állítást nem elég néhány példával igazolni. A betűs algebrai kifejezés: $(n - 1) + n + (n + 1) = 3n$, ami minden egész $n$ esetén garantálja a 3-mal való oszthatóságot.',
        breakdown: [
          { label: 'Számok', value: '(n-1), n, (n+1)' },
          { label: 'Összeg', value: '3n' },
          { label: 'Oszthatóság', value: '3n mindig osztható 3-mal' }
        ]
      },
      {
        id: 'q3-2',
        question: 'Egy 25 fős osztályban legalább hány diák született ugyanabban a hónapban?',
        options: [
          'Legalább 1 diák',
          'Legalább 2 diák',
          'Legalább 3 diák',
          'Legalább 4 diák'
        ],
        correctAnswer: 'Legalább 3 diák',
        explanation: '12 hónap van (12 skatulya). Ha minden hónapban legfeljebb 2 diák született volna, az legfeljebb $12 \cdot 2 = 24$ diák lenne. Mivel 25 diák van, a skatulya-elv szerint legalább egy hónapban legalább 3 diák született ($\lceil 25/12 \rceil = 3$).',
        breakdown: [
          { label: 'Diákok száma', value: '25 fő' },
          { label: 'Skatulyák (hónapok)', value: '12 db' },
          { label: 'Minimális zsúfoltság', value: '⌈25 / 12⌉ = 3 fő' }
        ]
      },
      {
        id: 'q3-3',
        question: 'Mi az INDIREKT BIZONYÍTÁS alapvető logikai menete?',
        options: [
          'Sok példát számolunk ki számológéppel.',
          'Feltesszük az állítás ellenkezőjét (tagadását), és ebből logikus lépésekkel ellentmondásra jutunk.',
          'Megkeressük a legkisebb és legnagyobb lehetséges értéket.',
          'A tétel megfordítását bizonyítjuk direkt módon.'
        ],
        correctAnswer: 'Feltesszük az állítás ellenkezőjét (tagadását), és ebből logikus lépésekkel ellentmondásra jutunk.',
        explanation: 'Az indirekt bizonyítás során feltételezzük, hogy az állítás hamis (azaz a tagadása igaz). Ha ebből ellentmondásra (lehetetlenségre) jutunk, akkor az eredeti állításnak feltétlenül igaznak kell lennie.',
        figure: <ProofSolverFigure type="statement" />
      },
      {
        id: 'q3-4',
        question: 'Bizonyítsuk be: Két egymást követő egész szám szorzata mindig páros! Melyik a helyes indoklás?',
        options: [
          'Két egymást követő szám közül pontosan az egyik mindig páros, és páros számmal szorozva a szorzat is páros: n(n+1) = páros.',
          'Mert az 1 · 2 = 2 és 2 · 3 = 6 mindkettő páros.',
          'Mert a szorzat összege páratlan szám.',
          'Csak akkor igaz, ha a kisebb szám páros.'
        ],
        correctAnswer: 'Két egymást követő szám közül pontosan az egyik mindig páros, és páros számmal szorozva a szorzat is páros: n(n+1) = páros.',
        explanation: 'Bármely két egymást követő egész ($n$ és $n+1$) közül az egyik biztosan $2k$ alakú páros szám. Bármilyen egész számot megszorozva egy páros számmal, a szorzat garantáltan páros.',
        breakdown: [
          { label: 'Számok paritása', value: 'Egyik páros, másik páratlan' },
          { label: 'Szorzat alakja', value: 'páros · páratlan = PÁROS' }
        ]
      },
      {
        id: 'q3-5',
        question: 'Egy dobozban 10 fekete, 10 fehér és 10 kék zokni van. Legalább hány zoknit kell kivenni a sötétben, hogy BIZTOSAN legyen köztük legalább KÉT KÜLÖNBÖZŐ SZÍNŰ pár (azaz legalább 2 fekete ÉS 2 fehér, vagy más 2-2 azonos szín)?',
        options: [
          '4 darabot',
          '12 darabot',
          '14 darabot',
          '22 darabot'
        ],
        correctAnswer: '14 darabot',
        explanation: 'A legkedvezőtlenebb esetben kihúzzuk az összes (10 db) fekete zoknit, majd 1 fehér és 1 kék zoknit (összesen 12 db zokni, de még csak 1 pár/egy szín van). A következő húzásokkal biztosan kiegészül a második szín is párrá: 14 húzás kell.',
        figure: <ProofSolverFigure type="pigeonhole" data={{ items: 14, boxes: 3 }} />
      },
      {
        id: 'q3-6',
        question: 'Miért lehetetlen olyan egyszerű gráfot rajzolni, amelynek csúcsainak fokszámai: 3, 3, 3, 2, 1?',
        options: [
          'Mert 5 csúcs van benne.',
          'Mert a páratlan fokszámú csúcsok száma 4 db (3, 3, 3, 1), ami páros, de a fokszámok összege 12.',
          'Mert a fokszámok összege 3 + 3 + 3 + 2 + 1 = 12 (páros), de 4 db páratlan csúcs van, a maximális élkorlát miatt.',
          'Mert a fokszámok összege páratlan kellene, hogy legyen.'
        ],
        correctAnswer: 'Mert a fokszámok összege 3 + 3 + 3 + 2 + 1 = 12 (páros), de 4 db páratlan csúcs van, a maximális élkorlát miatt.',
        explanation: 'A fokszámösszeg 12, ami 6 élnek felelne meg. 5 csúcson a K₅ teljes gráfban maximum 10 él lehet, de a 3-as fokszámú csúcsok és az 1-es fokszám elhelyezése összeférhetetlen (egyszerű gráfban nem valósítható meg).',
        breakdown: [
          { label: 'Fokszámok összege', value: '12' },
          { label: 'Élek száma', value: '6 él' }
        ]
      },
      {
        id: 'q3-7',
        question: 'Egy körmérkőzéses sakkbajnokságon mindenki játszik mindenkivel. Bizonyítsuk be, hogy a bajnokság bármely pillanatában mindig van legalább két olyan versenyző, aki addig PONTOSAN UGYANANNYI mérkőzést játszott le!',
        options: [
          'Mivel minden meccsen ketten vesznek részt, a mérkőzések száma páros.',
          'Ha n versenyző van, a lehetséges meccsszámok 0-tól (n-1)-ig terjedhetnek. De a 0 és az (n-1) egyszerre nem fordulhat elő, így legfeljebb (n-1) skatulya van n játékosra → skatulya-elv.',
          'Mert minden versenyző legfeljebb 5 meccset játszhat.',
          'Csak akkor igaz, ha a bajnokság már véget ért.'
        ],
        correctAnswer: 'Ha n versenyző van, a lehetséges meccsszámok 0-tól (n-1)-ig terjedhetnek. De a 0 és az (n-1) egyszerre nem fordulhat elő, így legfeljebb (n-1) skatulya van n játékosra → skatulya-elv.',
        explanation: 'Ha valaki már mindenkivel játszott ($n - 1$ meccs), akkor senki sem lehet, aki még senkivel sem játszott ($0$ meccs). Így a lejátszott meccsek lehetséges értékei legfeljebb $n - 1$ félék lehetnek. Mivel $n$ játékos van, a skatulya-elv miatt legalább kettőnek meg kell egyeznie!',
        figure: <ProofSolverFigure type="pigeonhole" data={{ items: 'n', boxes: 'n - 1' }} />
      },
      {
        id: 'q3-8',
        question: 'Mi a pontos tagadása a következő összetett állításnak: „A szám osztható 2-vel ÉS osztható 3-mal.” (De Morgan törvény)?',
        options: [
          '„A szám nem osztható 2-vel ÉS nem osztható 3-mal.”',
          '„A szám nem osztható 2-vel VAGY nem osztható 3-mal.”',
          '„A szám osztható 6-tal.”',
          '„A szám nem osztható 6-tal és nem osztható 5-tel.”'
        ],
        correctAnswer: '„A szám nem osztható 2-vel VAGY nem osztható 3-mal.”',
        explanation: 'De Morgan törvénye szerint az „A ÉS B” állítás pontos tagadása: „NEM A VAGY NEM B”. Tehát elég, ha a kettő közül legalább az egyik oszthatóság nem teljesül.',
        figure: <ProofSolverFigure type="negation" />
      },
      {
        id: 'q3-9',
        question: 'Bizonyítsuk be: Ha $a$ és $b$ páratlan egész számok, akkor $a^2 + b^2$ NEM lehet négyzetszám! Miért?',
        options: [
          'Mert páratlan négyzete páratlan ($8k+1$), két ilyen összege 4-gyel osztva 2 maradékot ad, de négyzetszám 4-gyel osztva csak 0 vagy 1 maradékot adhat.',
          'Mert két páratlan szám összege páratlan.',
          'Mert páratlan számok négyzete mindig negatív.',
          'Csak akkor igaz, ha a = b.'
        ],
        correctAnswer: 'Mert páratlan négyzete páratlan ($8k+1$), két ilyen összege 4-gyel osztva 2 maradékot ad, de négyzetszám 4-gyel osztva csak 0 vagy 1 maradékot adhat.',
        explanation: 'Bármely páratlan szám négyzete 4-gyel osztva 1 maradékot ad ($(2k+1)^2 = 4k^2+4k+1$). Két páratlan négyzetszám összege 4-gyel osztva $1 + 1 = 2$ maradékot ad. Egyetlen egész szám négyzete sem adhat 4-gyel osztva 2 maradékot!',
        breakdown: [
          { label: 'a² maradéka (mod 4)', value: '1' },
          { label: 'b² maradéka (mod 4)', value: '1' },
          { label: 'a² + b² maradéka (mod 4)', value: '2 (Lehetetlen négyzetszámnak lennie!)' }
        ]
      },
      {
        id: 'q3-10',
        question: 'Egy 1 méter oldalú szabályos háromszög belsejében elhelyezünk 5 pontot. Bizonyítsuk be, hogy van köztük legalább kettő, amelyek távolsága legfeljebb 0,5 méter!',
        options: [
          'A háromszöget középvonalakkal 4 darab 0,5 m oldalú kis szabályos háromszögre osztjuk. 5 pontot 4 kis háromszögbe helyezve a skatulya-elv szerint legalább egybe 2 pont kerül, távolságuk ≤ 0,5 m.',
          'Mivel a háromszög kerülete 3 méter, 3 / 5 = 0,6 méter az átlagos távolság.',
          'A háromszög magassága miatt minden pont távolsága pontosan 0,5 m.',
          'Csak derékszögű háromszögre igaz.'
        ],
        correctAnswer: 'A háromszöget középvonalakkal 4 darab 0,5 m oldalú kis szabályos háromszögre osztjuk. 5 pontot 4 kis háromszögbe helyezve a skatulya-elv szerint legalább egybe 2 pont kerül, távolságuk ≤ 0,5 m.',
        explanation: 'Az oldalfelező pontokat összekötve a háromszög 4 egybevágó, 0,5 m oldalú kis szabályos háromszögre bomlik (4 skatulya). 5 pont elhelyezésekor a skatulya-elv miatt legalább egy kis háromszögbe legalább 2 pont esik, amelyek távolsága legfeljebb a kis háromszög oldala (0,5 m).',
        breakdown: [
          { label: 'Skatulyák (kis háromszögek)', value: '4 db (oldaluk: 0,5 m)' },
          { label: 'Pontok száma', value: '5 db' },
          { label: 'Következtetés', value: 'Legalább 2 pont távolsága ≤ 0,5 m' }
        ]
      }
    ]
  }
};

export const ProofQuiz: React.FC<ProofQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="gondolkodjunk"
      subtopicId="igazold-cafold"
      topicId="g7-logic-proofs"
      topicTitle="5. Igazold! Cáfold!"
      topicBadge="7. Osztály • Matematika I. Témakör"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="5. Igazold! Cáfold! Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 nehézségi szinten: kijelentések, tagadás, általános bizonyítások, ellenpéldák és a skatulya-elv"
      cheatSheetTitle="Logikai és Bizonyítási Szabályok, Képletek"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<ProofMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ProofSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="cyan"
    />
  );
};
