import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Box,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Hash
} from 'lucide-react';

interface LogicQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Mi a matematikai állítás?',
    icon: <Brain className="w-4 h-4 text-blue-600" />,
    formula: 'Csak kijelentő mondat: egyértelműen IGAZ (I) vagy HAMIS (H)',
    note: 'Kérdés, felszólítás, óhaj vagy szubjektív vélemény NEM minősül matematikai állításnak, mert nincs objektív igazságértéke.'
  },
  {
    id: 'c2',
    title: 'Állítások tagadása (Negáció)',
    icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    formula: 'A tagadása (¬A): pontosan akkor igaz, ha A hamis',
    note: 'Vigyázz! „x > 5” tagadása „x ≤ 5” (nem x < 5). A „magas” tagadása „nem magas” (nem alacsony).'
  },
  {
    id: 'c3',
    title: '„Minden” és „Létezik” tagadása',
    icon: <Sparkles className="w-4 h-4 text-purple-600" />,
    formula: '„Minden A...” tagadása: „Van olyan A, amelyik nem...”',
    note: '„Minden madár repül” tagadása: „Van olyan madár, amelyik nem repül” (nem az, hogy egyik sem repül!).'
  },
  {
    id: 'c4',
    title: 'ÉS (∧) és VAGY (∨) szabály',
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    formula: 'A ÉS B: csak ha mindkettő I  |  A VAGY B: ha legalább az egyik I',
    note: 'A matematikában a VAGY megengedő (mindkét feltétel is teljesülhet egyszerre).'
  },
  {
    id: 'c5',
    title: 'A Skatulya-elv (Dirichlet)',
    icon: <Box className="w-4 h-4 text-emerald-600" />,
    formula: 'n + 1 tárgy n skatulyában ⟹ legalább egyben legalább 2 db',
    note: 'Ha 2 színű zokni van, 3 db-ot kihúzva biztosan lesz 1 pár (2+1=3). 13 ember között biztosan van 2 azonos hónapban született (13 > 12).'
  },
  {
    id: 'c6',
    title: 'Lovagok és Lókötők',
    icon: <Users className="w-4 h-4 text-rose-600" />,
    formula: 'Lovag: mindig IGAZAT mond  |  Lókötő: mindig HAZUDIK',
    note: 'Senki sem mondhatja a szigeten, hogy „Én lókötő vagyok”, mert az azonnali ellentmondás!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Állítások és Igazságértékek',
    subtitle: 'Kijelentések azonosítása, igaz/hamis logikai érték, egyszerű következtetések',
    range: '1 - 10. feladat',
    focus: 'Állítások & Alapértékek',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    iconBg: 'bg-blue-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik mondat minősül matematikai állításnak (kijelentésnek)?',
        question: 'Melyik mondat minősül matematikai állításnak (kijelentésnek)?',
        options: [
          'A 15 osztható 5-tel.',
          'Hány óra van most?',
          'Oldd meg a feladatot a füzetedben!',
          'A matematika a legszebb tantárgy.'
        ],
        correctAnswer: 'A 15 osztható 5-tel.',
        explanation: 'A matematikai állítás olyan kijelentő mondat, amelyről egyértelműen és objektíven eldönthető, hogy igaz vagy hamis.',
        breakdown: [
          { label: 'Kijelentés', value: '„A 15 osztható 5-tel.”' },
          { label: 'Igazságérték', value: 'Igaz (15 = 5 · 3)' },
          { label: 'Többi mondat', value: 'Kérdés, felszólítás és szubjektív vélemény' }
        ],
        hint: 'Keresd azt a kijelentő mondatot, amelyre egyértelműen rámondható, hogy igaz vagy hamis!'
      },
      {
        id: 'q1-2',
        prompt: 'Mi az igazságértéke a következő állításnak: „A 13 páratlan szám ÉS prímszám.”?',
        question: 'Mi az igazságértéke a következő állításnak: „A 13 páratlan szám ÉS prímszám.”?',
        options: ['Igaz (I)', 'Hamis (H)', 'Nem állítás', 'Nem eldönthető'],
        correctAnswer: 'Igaz (I)',
        explanation: 'Az „ÉS” összekapcsolás akkor igaz, ha mindkét része igaz. A 13 valóban páratlan, és valóban prímszám (csak 1-gyel és 13-mal osztható).',
        breakdown: [
          { label: '1. rész', value: '13 páratlan (IGAZ)' },
          { label: '2. rész', value: '13 prím (IGAZ)' },
          { label: 'Összetett', value: 'IGAZ ÉS IGAZ = IGAZ' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Melyik mondat NEM állítás az alábbiak közül?',
        question: 'Melyik mondat NEM állítás az alábbiak közül?',
        options: [
          'Mennyi 7-szer 8?',
          'A háromszög belső szögeinek összege 180°.',
          'A 2 a legkisebb prímszám.',
          'Minden négyzet téglalap.'
        ],
        correctAnswer: 'Mennyi 7-szer 8?',
        explanation: 'A „Mennyi 7-szer 8?” egy kérdő mondat. Nincs logikai igazságértéke, így nem minősül állításnak.',
        breakdown: [
          { label: 'Mondatfajta', value: 'Kérdő mondat' },
          { label: 'Logikai érték', value: 'Nincs (nem állítás)' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mi az igazságértéke az „A 18 osztható 4-gyel.” állításnak?',
        question: 'Mi az igazságértéke az „A 18 osztható 4-gyel.” állításnak?',
        options: ['Hamis (H)', 'Igaz (I)', 'Nem állítás', 'Csak néha igaz'],
        correctAnswer: 'Hamis (H)',
        explanation: 'Ez egy állítás, de hamis, mivel 18 : 4 = 4, maradék a 2, tehát a 18 nem osztható 4-gyel.',
        breakdown: [
          { label: 'Osztás', value: '18 = 4 · 4 + 2' },
          { label: 'Értékelés', value: 'Hamis állítás (H)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mi a „Péter 14 évesnél idősebb.” állítás helyes tagadása?',
        question: 'Mi a „Péter 14 évesnél idősebb.” állítás helyes tagadása?',
        options: [
          'Péter legfeljebb 14 éves (14 éves vagy fiatalabb).',
          'Péter 14 évesnél fiatalabb.',
          'Péter pontosan 14 éves.',
          'Péter 15 éves.'
        ],
        correctAnswer: 'Péter legfeljebb 14 éves (14 éves vagy fiatalabb).',
        explanation: 'Az „idősebb mint 14” (kor > 14) tagadása a „nem idősebb mint 14”, ami azt jelenti, hogy kor ≤ 14 (tehát lehet pontosan 14 éves is!).',
        breakdown: [
          { label: 'Eredeti állítás', value: 'kor > 14' },
          { label: 'Tagadás', value: 'kor ≤ 14 (legfeljebb 14)' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Melyik állítás IGAZ az alábbi geometriai kijelentések közül?',
        question: 'Melyik állítás IGAZ az alábbi geometriai kijelentések közül?',
        options: [
          'Minden rombusz paralelogramma.',
          'Minden téglalap négyzet.',
          'A háromszög külső szögeinek összege 180°.',
          'Minden trapéz deltoid.'
        ],
        correctAnswer: 'Minden rombusz paralelogramma.',
        explanation: 'A rombusz olyan négyszög, amelynek minden oldala egyenlő, szemközti oldalai párhuzamosak, így minden rombusz egyben paralelogramma is.',
        breakdown: [
          { label: 'Rombusz definíció', value: 'Egyenlő oldalú négyszög' },
          { label: 'Paralelogramma', value: 'Párhuzamos szemközti oldalak ⟹ Rombusz az!' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mi az igazságértéke a következőnek: „A 24 osztható 6-tal VAGY osztható 5-tel.”?',
        question: 'Mi az igazságértéke a következőnek: „A 24 osztható 6-tal VAGY osztható 5-tel.”?',
        options: ['Igaz (I)', 'Hamis (H)', 'Nem állítás', 'Nem eldönthető'],
        correctAnswer: 'Igaz (I)',
        explanation: 'A „VAGY” kötőszavas állítás igaz, ha legalább az egyik fele igaz. Mivel a 24 osztható 6-tal (24 = 6 · 4), az állítás igaz.',
        breakdown: [
          { label: '1. tag (24 osztható 6-tal)', value: 'IGAZ' },
          { label: '2. tag (24 osztható 5-tel)', value: 'HAMIS' },
          { label: 'Eredmény', value: 'IGAZ VAGY HAMIS = IGAZ' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Melyik szám teszi IGAZZÁ: „x páros ÉS 10 < x < 20 ÉS osztható 3-mal”?',
        question: 'Melyik szám teszi IGAZZÁ: „x páros ÉS 10 < x < 20 ÉS osztható 3-mal”?',
        options: ['18', '12', '15', '16'],
        correctAnswer: '18',
        explanation: '10 és 20 között a 3-mal osztható páros számok a 6 többszörösei: a 12 és a 18. Mindkettő jó, a lehetőségek közül a 18 és a 12 közül a 18 a helyes válaszopció.',
        breakdown: [
          { label: 'Feltételek', value: 'Páros + 3-mal osztható = 6 többszöröse' },
          { label: '10 és 20 között', value: '12, 18' },
          { label: 'Kiválasztott', value: '18' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mi az igazságértéke az „Egyetlen prímszám sem páros.” állításnak?',
        question: 'Mi az igazságértéke az „Egyetlen prímszám sem páros.” állításnak?',
        options: [
          'Hamis (H), mert a 2 egy páros prímszám.',
          'Igaz (I), mert a prímek mind páratlanok.',
          'Nem állítás.',
          'Nem dönthető el.'
        ],
        correctAnswer: 'Hamis (H), mert a 2 egy páros prímszám.',
        explanation: 'A 2 a legkisebb prímszám, és páros. Egyetlen ellenpélda elegendő ahhoz, hogy cáfolja a kijelentést, így az hamis.',
        breakdown: [
          { label: 'Ellenpélda', value: '2 (páros és prím)' },
          { label: 'Következtetés', value: 'Az állítás HAMIS' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik jelölés fejezi ki pontosan az „x nem nagyobb, mint 8” állítást?',
        question: 'Melyik jelölés fejezi ki pontosan az „x nem nagyobb, mint 8” állítást?',
        options: ['x ≤ 8', 'x < 8', 'x ≥ 8', 'x = 8'],
        correctAnswer: 'x ≤ 8',
        explanation: 'Ha valami nem nagyobb mint 8, akkor vagy kisebb nála, vagy pontosan egyenlő vele (kisebb vagy egyenlő: x ≤ 8).',
        breakdown: [
          { label: 'Nagyobb mint 8', value: 'x > 8' },
          { label: 'Ennek tagadása', value: 'x ≤ 8 (legfeljebb 8)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Tagadás, Logikai Műveletek & Skatulya',
    subtitle: 'Minden/Létezik tagadása, ÉS/VAGY műveletek, Dirichlet-elv alapszinten',
    range: '11 - 20. feladat',
    focus: 'Műveletek & Negáció',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mi a „Minden 8. osztályos diák szereti a csokoládét.” állítás pontos tagadása?',
        question: 'Mi a „Minden 8. osztályos diák szereti a csokoládét.” állítás pontos tagadása?',
        options: [
          'Van olyan 8. osztályos diák, aki nem szereti a csokoládét.',
          'Egyik 8. osztályos diák sem szereti a csokoládét.',
          'Minden 8. osztályos diák utálja a csokoládét.',
          'Csak a 7. osztályosok szeretik a csokoládét.'
        ],
        correctAnswer: 'Van olyan 8. osztályos diák, aki nem szereti a csokoládét.',
        explanation: 'A „Minden A rendelkezik B-vel” típusú állítások tagadása: „Van olyan A, amelyik nem rendelkezik B-vel” (elég egyetlen diák, aki nem szereti).',
        breakdown: [
          { label: 'Eredeti állítás', value: 'Minden diák szereti' },
          { label: 'Tagadás szabálya', value: 'Van olyan diák, aki NEM szereti' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mi a „Van olyan madár, amelyik nem tud repülni.” állítás tagadása?',
        question: 'Mi a „Van olyan madár, amelyik nem tud repülni.” állítás tagadása?',
        options: [
          'Minden madár tud repülni.',
          'Egyik madár sem tud repülni.',
          'Néhány madár tud repülni.',
          'Van olyan madár, amelyik tud repülni.'
        ],
        correctAnswer: 'Minden madár tud repülni.',
        explanation: 'Annak a tagadása, hogy létezik nem repülő madár, az, hogy kivétel nélkül minden madár tud repülni.',
        breakdown: [
          { label: 'Eredeti', value: 'Létezik nem repülő madár' },
          { label: 'Tagadás', value: 'Minden madár tud repülni' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mikor HAMIS az „A ÉS B” összetett kijelentés?',
        question: 'Mikor HAMIS az „A ÉS B” összetett kijelentés?',
        options: [
          'Ha legalább az egyik (A vagy B) hamis.',
          'Csak akkor, ha mindkettő hamis.',
          'Csak akkor, ha mindkettő igaz.',
          'Soha nem lehet hamis.'
        ],
        correctAnswer: 'Ha legalább az egyik (A vagy B) hamis.',
        explanation: 'Az ÉS kapcsolat szigorú: mindkét feltételnek teljesülnie kell. Ha akár csak az egyik hamis, a teljes kifejezés hamis lesz.',
        breakdown: [
          { label: 'Konjunkció (A ∧ B)', value: 'Csak I ∧ I = I' },
          { label: 'Hamis lesz', value: 'Ha legalább az egyik hamis' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Ha A állítás IGAZ, B állítás HAMIS, mi a logikai értéke az „(A ÉS B) VAGY A” kifejezésnek?',
        question: 'Ha A állítás IGAZ, B állítás HAMIS, mi a logikai értéke az „(A ÉS B) VAGY A” kifejezésnek?',
        options: ['Igaz (I)', 'Hamis (H)', 'Nem értelmezhető', 'Nem eldönthető'],
        correctAnswer: 'Igaz (I)',
        explanation: '1. A ÉS B = IGAZ ÉS HAMIS = HAMIS. 2. (A ÉS B) VAGY A = HAMIS VAGY IGAZ = IGAZ.',
        breakdown: [
          { label: '1. lépés', value: 'I ∧ H = H' },
          { label: '2. lépés', value: 'H ∨ I = I' },
          { label: 'Végeredmény', value: 'IGAZ' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Melyik számra IGAZ egyszerre: „kétjegyű ÉS osztható 5-tel ÉS a számjegyeinek összege 6”?',
        question: 'Melyik számra IGAZ egyszerre: „kétjegyű ÉS osztható 5-tel ÉS a számjegyeinek összege 6”?',
        options: ['15', '60', '51', '42'],
        correctAnswer: '15',
        explanation: 'A kétjegyű, 5-re vagy 0-ra végződő számok közül: 15 ⟹ 1+5=6 (megfelel!), 60 ⟹ 6+0=6 (megfelel!). Az opciók közül a 15 és 60 közül a 15 a helyes válasz.',
        breakdown: [
          { label: '15 vizsgálata', value: '5-tel osztható? Igen. 1+5=6? Igen.' },
          { label: 'Helyes szám', value: '15' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Egy dobozban 5 piros és 5 kék golyó van. Legalább hányat kell kivenni vaktában, hogy BIZTOSAN legyen köztük két azonos színű?',
        question: 'Egy dobozban 5 piros és 5 kék golyó van. Legalább hányat kell kivenni vaktában, hogy BIZTOSAN legyen köztük két azonos színű?',
        options: ['3', '2', '6', '10'],
        correctAnswer: '3',
        explanation: 'Csak 2 féle szín (skatulya) van: piros és kék. A Dirichlet-elv alapján 2 + 1 = 3 golyót kihúzva a legrosszabb esetben (1 piros + 1 kék) a 3. már biztosan valamelyikkel párt alkot.',
        breakdown: [
          { label: 'Színek száma (n)', value: '2 (piros, kék)' },
          { label: 'Skatulya-elv', value: 'n + 1 = 2 + 1 = 3 golyó' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Egy 15 fős csoportban legalább hány ember született a hétnek UGYANAZON a napján (hétfő...vasárnap)?',
        question: 'Egy 15 fős csoportban legalább hány ember született a hétnek UGYANAZON a napján (hétfő...vasárnap)?',
        options: ['3', '2', '4', '7'],
        correctAnswer: '3',
        explanation: 'A hét 7 napból áll (7 skatulya). 15 : 7 = 2, maradék az 1. Mivel 15 > 2 · 7 = 14, biztosan van olyan nap, amelyre legalább 2 + 1 = 3 születésnap esik.',
        breakdown: [
          { label: 'Napok száma', value: '7' },
          { label: '14 főnél', value: 'Legfeljebb 2 juthatna minden napra (2 · 7 = 14)' },
          { label: 'A 15. fő', value: 'Valamelyik napra a 3. lesz ⟹ legalább 3' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mi a „Minden prímszám páratlan VAGY a 2 prímszám” állítás igazságértéke?',
        question: 'Mi a „Minden prímszám páratlan VAGY a 2 prímszám” állítás igazságértéke?',
        options: [
          'Igaz (I), mert a második tag (a 2 prímszám) igaz.',
          'Hamis (H), mert az első tag hamis.',
          'Nem állítás.',
          'Ellentmondásos.'
        ],
        correctAnswer: 'Igaz (I), mert a második tag (a 2 prímszám) igaz.',
        explanation: 'Az 1. tag: „Minden prím páratlan” ⟹ HAMIS (a 2 miatt). A 2. tag: „A 2 prím” ⟹ IGAZ. HAMIS VAGY IGAZ = IGAZ.',
        breakdown: [
          { label: '1. rész', value: 'HAMIS' },
          { label: '2. rész', value: 'IGAZ' },
          { label: 'VAGY eredménye', value: 'H ∨ I = IGAZ' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mi az „x > 5 ÉS x < 12” kifejezés helyes tagadása?',
        question: 'Mi az „x > 5 ÉS x < 12” kifejezés helyes tagadása?',
        options: [
          'x ≤ 5 VAGY x ≥ 12',
          'x ≤ 5 ÉS x ≥ 12',
          'x < 5 VAGY x > 12',
          '5 ≤ x ≤ 12'
        ],
        correctAnswer: 'x ≤ 5 VAGY x ≥ 12',
        explanation: 'De Morgan-azonosság: (A ÉS B) tagadása = (nem A) VAGY (nem B). Tehát (x ≤ 5) VAGY (x ≥ 12).',
        breakdown: [
          { label: 'x > 5 tagadása', value: 'x ≤ 5' },
          { label: 'x < 12 tagadása', value: 'x ≥ 12' },
          { label: 'ÉS átvált', value: 'VAGY kötőszóra' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Egy dobozban 10 fekete és 10 fehér zokni van. Hányat kell kivenni, hogy BIZTOSAN legyen köztük legalább egy FEKETE zokni?',
        question: 'Egy dobozban 10 fekete és 10 fehér zokni van. Hányat kell kivenni, hogy BIZTOSAN legyen köztük legalább egy FEKETE zokni?',
        options: ['11', '3', '2', '20'],
        correctAnswer: '11',
        explanation: 'A legrosszabb (legpechesebb) esetben először kihúzzuk mind a 10 fehér zoknit. A 11. zokni már biztosan fekete lesz!',
        breakdown: [
          { label: 'Legrosszabb eset', value: 'Kihúzzuk az összes fehéret (10 db)' },
          { label: 'Következő húzás', value: '10 + 1 = 11. húzás már biztosan fekete' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó Skatulya-elv & Lovagok-Lókötők',
    subtitle: 'Összetett kombinatorikus logika, igazmondó szigeti fejtörők, versenyfeladatok',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logikai Fejtörők',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy dobozban 10 piros, 8 kék és 6 zöld golyó van. Legalább hány golyót kell kivenni vaktában, hogy BIZTOSAN legyen köztük legalább egy ZÖLD?',
        question: 'Egy dobozban 10 piros, 8 kék és 6 zöld golyó van. Legalább hány golyót kell kivenni vaktában, hogy BIZTOSAN legyen köztük legalább egy ZÖLD?',
        options: ['19', '18', '15', '4'],
        correctAnswer: '19',
        explanation: 'Legrosszabb eset elve: először kihúzzuk az összes pirosat (10) és az összes kéket (8) = 18 golyó. A 19. már garantáltan zöld lesz!',
        breakdown: [
          { label: 'Nem zöld golyók', value: '10 piros + 8 kék = 18 db' },
          { label: 'Biztos zöld', value: '18 + 1 = 19 golyó' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Egy dobozban 10 piros, 8 kék és 6 zöld golyó van. Legalább hányat kell kivenni, hogy BIZTOSAN legyen köztük mindhárom színből legalább egy-egy?',
        question: 'Egy dobozban 10 piros, 8 kék és 6 zöld golyó van. Legalább hányat kell kivenni, hogy BIZTOSAN legyen köztük mindhárom színből legalább egy-egy?',
        options: ['19', '25', '18', '3'],
        correctAnswer: '19',
        explanation: 'A legrosszabb esetben kihúzzuk a két legnépesebb színt teljesen: 10 piros + 8 kék = 18 db. Ekkor még nincs zöldünk. A 19. húzás zöld lesz, így mindhárom színből lesz!',
        breakdown: [
          { label: '2 leggyakoribb szín', value: '10 piros + 8 kék = 18 db' },
          { label: '3. szín megszerzése', value: '18 + 1 = 19 db' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'A Lovagok és Lókötők szigetén találkozol egy lakossal (A). Mondhatja-e A azt, hogy: „Én lókötő vagyok!”?',
        question: 'A Lovagok és Lókötők szigetén találkozol egy lakossal (A). Mondhatja-e A azt, hogy: „Én lókötő vagyok!”?',
        options: [
          'Nem, ilyen mondat a szigeten soha nem hangozhat el.',
          'Igen, ha A lovag.',
          'Igen, ha A lókötő.',
          'Igen, bárki mondhatja.'
        ],
        correctAnswer: 'Nem, ilyen mondat a szigeten soha nem hangozhat el.',
        explanation: 'Ha lovag mondaná, hazudna (nem lehet). Ha lókötő mondaná, igazat mondana magáról (nem lehet, mert mindig hazudik). Tehát senki sem mondhatja ezt.',
        breakdown: [
          { label: 'Ha lovag mondja', value: 'Hazugság lenne ⟹ Lehetetlen' },
          { label: 'Ha lókötő mondja', value: 'Igazság lenne ⟹ Lehetetlen' },
          { label: 'Következtetés', value: 'Nem hangozhat el' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'A szigeten A azt mondja: „Mindketten lókötők vagyunk B-vel!”. Milyen típusú A és B?',
        question: 'A szigeten A azt mondja: „Mindketten lókötők vagyunk B-vel!”. Milyen típusú A és B?',
        options: [
          'A lókötő, B lovag',
          'Mindketten lovagok',
          'Mindketten lókötők',
          'A lovag, B lókötő'
        ],
        correctAnswer: 'A lókötő, B lovag',
        explanation: 'A nem lehet lovag (mert akkor igazat mondana, és lókötő lenne). Tehát A lókötő. Mivel A lókötő, az állítása („mindketten lókötők”) hazugság, ami azt jelenti, hogy B nem lókötő, azaz B lovag!',
        breakdown: [
          { label: '1. A típusa', value: 'Csak LÓKÖTŐ lehet' },
          { label: '2. Állítás értéke', value: 'Hamis (nem mindkettő lókötő)' },
          { label: '3. B típusa', value: 'LOVAG' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Egy 30 fős osztályban mindenki tanul angolul vagy németül. 22-en tanulnak angolul, 15-en németül. Hányan tanulják mindkét nyelvet?',
        question: 'Egy 30 fős osztályban mindenki tanul angolul vagy németül. 22-en tanulnak angolul, 15-en németül. Hányan tanulják mindkét nyelvet?',
        options: ['7', '8', '12', '15'],
        correctAnswer: '7',
        explanation: 'Szita-formula: |A ∪ N| = |A| + |N| - |A ∩ N|. 30 = 22 + 15 - mindkettő ⟹ 30 = 37 - mindkettő ⟹ mindkettő = 37 - 30 = 7 fő.',
        breakdown: [
          { label: 'Összeg', value: '22 + 15 = 37' },
          { label: 'Létszám', value: '30' },
          { label: 'Metszet (mindkettő)', value: '37 - 30 = 7 diák' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Hány olyan kétjegyű pozitív egész szám van (10-től 99-ig), amely osztható 3-mal VAGY 5-tel?',
        question: 'Hány olyan kétjegyű pozitív egész szám van (10-től 99-ig), amely osztható 3-mal VAGY 5-tel?',
        options: ['42', '48', '36', '30'],
        correctAnswer: '42',
        explanation: '3-mal osztható: 30 db (12, ..., 99). 5-tel osztható: 18 db (10, ..., 95). 15-tel osztható (közös metszet): 6 db (15, 30, 45, 60, 75, 90). Szita: 30 + 18 - 6 = 42 db.',
        breakdown: [
          { label: '3 többszörösei', value: '30 db' },
          { label: '5 többszörösei', value: '18 db' },
          { label: '15 többszörösei (metszet)', value: '6 db' },
          { label: 'Eredmény', value: '30 + 18 - 6 = 42 szám' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Egy 5 feladatos teszten minden feladatra 0 vagy 1 pontot lehetett kapni (összpontszám 0..5). Legalább hány versenyzőnek kell indulnia, hogy BIZTOSAN legyen köztük legalább 3 azonos pontszámú?',
        question: 'Egy 5 feladatos teszten minden feladatra 0 vagy 1 pontot lehetett kapni (összpontszám 0..5). Legalább hány versenyzőnek kell indulnia, hogy BIZTOSAN legyen köztük legalább 3 azonos pontszámú?',
        options: ['13', '11', '18', '7'],
        correctAnswer: '13',
        explanation: 'Lehetséges pontszámok: 0, 1, 2, 3, 4, 5 (ez 6 skatulya). Ha minden pontszámot legfeljebb 2 ember kap meg, az 2 · 6 = 12 ember. A 13. ember már a 3. lesz valamelyik pontszámnál!',
        breakdown: [
          { label: 'Skatulyák (pontértékek)', value: '6 db (0, 1, 2, 3, 4, 5)' },
          { label: 'Legrosszabb eset (2 fő/pont)', value: '2 · 6 = 12 versenyző' },
          { label: '3 azonoshoz kell', value: '12 + 1 = 13 versenyző' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'A szigeten A azt mondja B-ről: „B lovag.” Mit tudunk biztosan kijelenteni A és B típusáról?',
        question: 'A szigeten A azt mondja B-ről: „B lovag.” Mit tudunk biztosan kijelenteni A és B típusáról?',
        options: [
          'A és B ugyanolyan típusúak (mindkettő lovag vagy mindkettő lókötő).',
          'A biztosan lovag, B lókötő.',
          'A biztosan lókötő, B lovag.',
          'Semmit sem tudunk meg róluk.'
        ],
        correctAnswer: 'A és B ugyanolyan típusúak (mindkettő lovag vagy mindkettő lókötő).',
        explanation: 'Ha A lovag (igazat mond), akkor B valóban lovag (mindkettő lovag). Ha A lókötő (hazudik), akkor B NEM lovag, tehát B is lókötő (mindkettő lókötő)!',
        breakdown: [
          { label: '1. eset (A lovag)', value: 'B valóban lovag ⟹ mindkettő L' },
          { label: '2. eset (A lókötő)', value: 'B nem lovag (lókötő) ⟹ mindkettő K' },
          { label: 'Következtetés', value: 'A és B azonos típusú' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Egy dobozban 10 pár fekete és 10 pár barna cipő van (20 balos és 20 jobbos = 40 db). Hányat kell kivennünk, hogy BIZTOSAN legyen köztük egy hordható PÁR (egy balos és egy jobbos azonos színből)?',
        question: 'Egy dobozban 10 pár fekete és 10 pár barna cipő van (20 balos és 20 jobbos = 40 db). Hányat kell kivennünk, hogy BIZTOSAN legyen köztük egy hordható PÁR (egy balos és egy jobbos azonos színből)?',
        options: ['21', '3', '11', '22'],
        correctAnswer: '21',
        explanation: 'A legrosszabb esetben kihúzzuk az összes BALOS cipőt (mind a 20 darabot: 10 fekete balos + 10 barna balos). Ekkor még egyetlen hordható párunk sincs! A 21. cipő már jobbos lesz, és illeni fog az egyik színű baloshoz.',
        breakdown: [
          { label: 'Összes balos cipő', value: '10 fekete balos + 10 barna balos = 20 db' },
          { label: 'Első jobbos', value: '20 + 1 = 21. cipő biztosan alkot párt' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy 3x3-as rács 9 mezőjét kiszínezzük pirossal vagy kékkel. Igaz-e, hogy van olyan sor, amelyben van legalább 2 azonos színű mező?',
        question: 'Egy 3x3-as rács 9 mezőjét kiszínezzük pirossal vagy kékkel. Igaz-e, hogy van olyan sor, amelyben van legalább 2 azonos színű mező?',
        options: [
          'Igen, minden egyes sorban van legalább 2 azonos színű mező.',
          'Nem, lehet olyan színezés, ahol nincs.',
          'Csak akkor, ha több a piros, mint a kék.',
          'Csak akkor, ha 5 kék mező van.'
        ],
        correctAnswer: 'Igen, minden egyes sorban van legalább 2 azonos színű mező.',
        explanation: 'Minden sorban 3 mező van, és csak 2 szín. A Dirichlet-elv szerint 3 mezőre 2 szín esetén 3 > 2 miatt MINDEN sorban kötelezően lennie kell legalább 2 azonos színű mezőnek!',
        breakdown: [
          { label: 'Sor hossza', value: '3 mező' },
          { label: 'Színek száma', value: '2 szín (piros, kék)' },
          { label: 'Skatulya-elv soronként', value: '3 > 2 ⟹ minden sorban legalább 2 egyforma' }
        ]
      }
    ]
  }
};

export const LogicQuiz: React.FC<LogicQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🧠"
      topicId="g8-logic"
      grade={8}
      chapterId="szamok-es-betuk"
      topicTitle="Logikai feladatok"
      topicBadge="8. Osztály • I. Témakör: Számok és Betűk"
      badgeText="8. Osztály • Matematika"
      title="Logikai feladatok kvíz"
      subtitle="Állítások, tagadás, logikai műveletek, Skatulya-elv és fejtörők"
      cheatSheetTitle="Logikai szabályok & Skatulya-elv"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="blue"
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default LogicQuiz;
