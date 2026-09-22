import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CountingMatcher } from './CountingMatcher';
import { CountingSorter } from './CountingSorter';
import { CountingSolverFigure } from './CountingDiagrams';
import {
  Boxes,
  Calculator,
  Layers,
  Network,
  Dices,
  Sparkles,
  Zap,
  Target,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';

interface CountingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Skatulya-elv (Dirichlet-elv)',
    icon: <Boxes className="w-4 h-4 text-purple-600" />,
    formula: '⌈N / K⌉',
    note: 'Ha N tárgyat K skatulyába osztunk szét, biztosan van olyan skatulya, amelyben legalább ⌈N / K⌉ darab tárgy van. (Pl. 13 ember → min. 2 azonos hónapban született).'
  },
  {
    id: 'c2',
    title: 'A Szorzási Szabály',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: 'Összes eset = n₁ · n₂ · ... · nₖ',
    note: 'Ha az 1. döntést p-féleképpen, a 2. független döntést q-féleképpen tehetjük meg, a kettőt együttesen p · q féleképpen valósíthatjuk meg.'
  },
  {
    id: 'c3',
    title: 'Két Halmaz Uniója (Szita-formula)',
    icon: <Layers className="w-4 h-4 text-emerald-600" />,
    formula: '|A ∪ B| = |A| + |B| - |A ∩ B|',
    note: 'Mivel a közös elemeket (metszetet) mindkét halmazban megszámoltuk, egyszer le kell vonni a duplikáció elkerülésére.'
  },
  {
    id: 'c4',
    title: 'Komplementer Módszer',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: 'Jó esetek = Összes eset - Tiltott esetek',
    note: 'Gyakran sokkal egyszerűbb a keresett tulajdonságú eseteket úgy megkapni, hogy az összesből kivonjuk a rosszakat (pl. páros kockaszorzat = 36 - páratlanok).'
  },
  {
    id: 'c5',
    title: 'Sorba rendezés (Permutáció)',
    icon: <Network className="w-4 h-4 text-indigo-600" />,
    formula: 'n! = n · (n - 1) · ... · 2 · 1',
    note: 'n különböző elem összes lehetséges sorrendjeinek száma n faktoriális (pl. 4 ember sorban = 4 · 3 · 2 · 1 = 24).'
  },
  {
    id: 'c6',
    title: 'Körmérkőzések / Párok száma',
    icon: <Dices className="w-4 h-4 text-cyan-600" />,
    formula: 'n · (n - 1) / 2',
    note: 'n résztvevő esetén mindenki n-1 másikkal játszik, de a párokat nem számoljuk kétszer, ezért osztunk 2-vel (pl. 8 csapat = 8 · 7 / 2 = 28 meccs).'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Elemi Leszámlálás',
    subtitle: 'Egyszerű skatulya-elv, szorzási szabály, diszjunkt halmazok és zoknihúzás',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak & Elemi esetek',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Egy 13 fős baráti társaságban hány ember született biztosan az év azonos hónapjában?',
        questionTypeBadge: 'Skatulya-elv',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: ['Legalább 2 ember', 'Pontosan 2 ember', 'Legalább 3 ember', 'Nem biztos, hogy van ilyen'],
        correctAnswer: 'Legalább 2 ember',
        explanation: 'Mivel az évben 12 hónap van (K = 12 skatulya) és 13 ember van (N = 13 tárgy), a Dirichlet-elv szerint legalább egy hónapra legalább ⌈13 / 12⌉ = 2 ember jut.',
        breakdown: [
          { label: 'Skatulyák (hónapok)', value: '12 db' },
          { label: 'Tárgyak (emberek)', value: '13 fő' },
          { label: 'Dirichlet garancia', value: '⌈13/12⌉ = legalább 2 fő' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Két megkülönböztethető (egy piros és egy kék) szabályos dobókockával dobunk egyszerre. Hányféle különböző kimenetel (számpár) lehetséges?',
        questionTypeBadge: 'Szorzási szabály',
        figure: <CountingSolverFigure type="dice" />,
        options: ['36', '12', '18', '24'],
        correctAnswer: '36',
        explanation: 'A piros kockával 6-féle, a kék kockával szintén 6-féle számot dobhatunk. A szorzási szabály szerint a kimenetelek száma 6 · 6 = 36.',
        breakdown: [
          { label: 'Piros kocka', value: '6 lehetőség (1..6)' },
          { label: 'Kék kocka', value: '6 lehetőség (1..6)' },
          { label: 'Összes számpár', value: '6 · 6 = 36' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Egy étteremben a menüben 3 féle leves és 4 féle főétel közül választhatunk. Hányféle különböző 2 fogásos ebéd állítható össze?',
        questionTypeBadge: 'Fa-diagram',
        figure: <CountingSolverFigure type="tree" />,
        options: ['12', '7', '14', '24'],
        correctAnswer: '12',
        explanation: 'Bármelyik levest választjuk a 3 közül, utána 4 féle főételt választhatunk. Ezért 3 · 4 = 12 különböző menü állítható össze.',
        breakdown: [
          { label: 'Levesek', value: '3 féle' },
          { label: 'Főételek', value: '4 féle' },
          { label: 'Összes menü', value: '3 · 4 = 12 féle' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Egy 28 fős osztályban 20 diák jár angol szakkörre, és 15 diák jár informatika szakkörre. Mindenki jár legalább az egyikre. Hány diák jár mindkét szakkörre?',
        questionTypeBadge: 'Szita-formula',
        figure: <CountingSolverFigure type="venn_2" />,
        options: ['7 diák', '5 diák', '8 diák', '10 diák'],
        correctAnswer: '7 diák',
        explanation: 'A szita-formula szerint: |A ∪ I| = |A| + |I| - |A ∩ I|. Behelyettesítve: 28 = 20 + 15 - |A ∩ I| => 28 = 35 - |A ∩ I| => |A ∩ I| = 35 - 28 = 7 diák.',
        breakdown: [
          { label: 'Összeg (|A| + |I|)', value: '20 + 15 = 35' },
          { label: 'Összes diák (|A ∪ I|)', value: '28 fő' },
          { label: 'Közös metszet', value: '35 - 28 = 7 fő' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Egy fiókban 10 pár fekete és 10 pár fehér zokni van ömlesztve (összesen 40 darab). A sötétben húzunk. Legalább hány darab zoknit kell kihúznunk, hogy BIZTOSAN legyen köztük legalább egy egyszínű pár?',
        questionTypeBadge: 'Zoknihúzás',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: ['3 darabot', '2 darabot', '11 darabot', '21 darabot'],
        correctAnswer: '3 darabot',
        explanation: 'Csak 2 skatulyánk van (Fekete és Fehér). A legrosszabb esetben az 1. fekete, a 2. fehér (2 különböző szín). A 3. zokni már biztosan valamelyikkel párt alkot. Tehát 2 + 1 = 3 zoknit kell kihúzni.',
        breakdown: [
          { label: 'Skatulyák (színek)', value: '2 db (fekete, fehér)' },
          { label: 'Legrosszabb eset', value: '1 fekete + 1 fehér' },
          { label: 'Biztos pár', value: '2 + 1 = 3 db zokni' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Hány különböző 3-jegyű szám készíthető az 1, 2, 3 számjegyekből, ha minden számjegyet pontosan egyszer használhatunk fel?',
        questionTypeBadge: 'Permutáció',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['6', '9', '3', '27'],
        correctAnswer: '6',
        explanation: 'Az első helyre 3 számjegy mehet, a másodikra 2, a harmadikra 1. Összesen: 3 · 2 · 1 = 3! = 6 szám készíthető (123, 132, 213, 231, 312, 321).',
        breakdown: [
          { label: '1. helyiérték (százasok)', value: '3 lehetőség' },
          { label: '2. helyiérték (tízesek)', value: '2 lehetőség' },
          { label: '3. helyiérték (egyesek)', value: '1 lehetőség' },
          { label: 'Összes szám', value: '3 · 2 · 1 = 6' }
        ]
      },
      {
        id: 'q7',
        prompt: 'Egy 4 fős asztalitenisz bajnokságon mindenki játszik mindenkivel pontosan egyszer (körmérkőzés). Összesen hány mérkőzést játszanak le?',
        questionTypeBadge: 'Körmérkőzés',
        figure: <CountingSolverFigure type="tournament" />,
        options: ['6', '12', '4', '8'],
        correctAnswer: '6',
        explanation: 'A körmérkőzések száma n résztvevő esetén: n · (n - 1) / 2. Négynél: 4 · 3 / 2 = 12 / 2 = 6 mérkőzés.',
        breakdown: [
          { label: 'Résztvevők száma (n)', value: '4 fő' },
          { label: 'Képlet', value: 'n · (n - 1) / 2' },
          { label: 'Mérkőzések', value: '4 · 3 / 2 = 6 meccs' }
        ]
      },
      {
        id: 'q8',
        prompt: '3 darab szabályos pénzérmét dobunk fel egyszerre. Hányféle különböző Fej/Írás kimenetelsorozat lehetséges?',
        questionTypeBadge: 'Szorzási szabály',
        figure: <CountingSolverFigure type="tree" />,
        options: ['8', '6', '9', '16'],
        correctAnswer: '8',
        explanation: 'Minden érmének 2 kimenetele lehet (F vagy Í). A szorzási szabály szerint a 3 független érmére: 2 · 2 · 2 = 2³ = 8 kimenetel van.',
        breakdown: [
          { label: '1. érme', value: '2 eset (F, Í)' },
          { label: '2. érme', value: '2 eset (F, Í)' },
          { label: '3. érme', value: '2 eset (F, Í)' },
          { label: 'Összes eset', value: '2 · 2 · 2 = 8' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Egy lakat 3 tárcsás számzárral működik. Minden tárcsán a 0, 1, 2, ..., 9 számjegyek állíthatók be. Hány különböző PIN kód lehetséges?',
        questionTypeBadge: 'Számkódok',
        figure: <CountingSolverFigure type="pins" />,
        options: ['1000', '900', '720', '30'],
        correctAnswer: '1000',
        explanation: 'Mindhárom tárcsán 10 féle számjegy (0-tól 9-ig) állítható be. A lehetőségek száma: 10 · 10 · 10 = 1000 (000-tól 999-ig).',
        breakdown: [
          { label: '1. tárcsa', value: '10 lehetőség' },
          { label: '2. tárcsa', value: '10 lehetőség' },
          { label: '3. tárcsa', value: '10 lehetőség' },
          { label: 'Összes kód', value: '10 · 10 · 10 = 1000' }
        ]
      },
      {
        id: 'q10',
        prompt: '8 dobozba elhelyezünk 9 színes ceruzát. Mit állíthatunk BIZTOSAN a dobozok tartalmáról?',
        questionTypeBadge: 'Skatulya-elv',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: [
          'Biztosan van legalább egy olyan doboz, amelybe legalább 2 ceruza kerül.',
          'Minden dobozba pontosan 1 ceruza kerül.',
          'Van egy doboz, amiben pontosan 2 ceruza van, a többiben 1.',
          'Nem tudunk semmi biztosat mondani, mert a ceruzák eloszlása véletlenszerű.'
        ],
        correctAnswer: 'Biztosan van legalább egy olyan doboz, amelybe legalább 2 ceruza kerül.',
        explanation: 'A Dirichlet-elv szerint, ha N = 9 tárgyat K = 8 skatulyába teszünk, mivel 9 > 8, biztosan lesz olyan doboz, amelybe legalább ⌈9/8⌉ = 2 ceruza kerül.',
        breakdown: [
          { label: 'Tárgyak', value: '9 ceruza' },
          { label: 'Skatulyák', value: '8 doboz' },
          { label: 'Garantált', value: 'Legalább egy dobozban ≥ 2 ceruza' }
        ]
      }
    ]
  },

  2: {
    level: 2,
    title: '2. Szint: Összetettebb Leszámlálás és Szorzási Szabály',
    subtitle: 'Számképzés 0-val, páros számok, célzott zoknihúzás, PIN kódok és szita-módszer',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Alkalmazás',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    iconBg: 'bg-blue-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Hány olyan 3-jegyű szám képezhető a 0, 3, 5, 8 számjegyekből, amelyben a számjegyek NEM ismétlődhetnek?',
        questionTypeBadge: 'Számképzés 0-val',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['18', '24', '12', '16'],
        correctAnswer: '18',
        explanation: '1. Első jegy (százasok): nem lehet 0, így 3 lehetőség van (3, 5, 8).\n2. Második jegy (tízesek): a megmaradt 3 jegy bármelyike (most már a 0 is) -> 3 lehetőség.\n3. Harmadik jegy (egyesek): a megmaradt 2 jegy -> 2 lehetőség.\nÖsszesen: 3 · 3 · 2 = 18 szám.',
        breakdown: [
          { label: '1. jegy (nem 0)', value: '3 lehetőség (3, 5, 8)' },
          { label: '2. jegy', value: '3 lehetőség' },
          { label: '3. jegy', value: '2 lehetőség' },
          { label: 'Szorzat', value: '3 · 3 · 2 = 18' }
        ]
      },
      {
        id: 'q12',
        prompt: 'Két szabályos dobókockával dobunk egyszerre. Hány olyan dobás lehetséges, amelyben a két dobott szám szorzata PÁROS?',
        questionTypeBadge: 'Komplementer módszer',
        figure: <CountingSolverFigure type="dice" />,
        options: ['27', '18', '9', '24'],
        correctAnswer: '27',
        explanation: 'Használjuk a komplementer (kizárásos) módszert:\n1. Összes kimenetel: 6 · 6 = 36.\n2. A szorzat CSAK akkor páratlan, ha mindkét kocka páratlan (1, 3, 5): 3 · 3 = 9 eset.\n3. Páros szorzatok: Összes - Páratlan = 36 - 9 = 27 eset.',
        breakdown: [
          { label: 'Összes dobás', value: '6 · 6 = 36' },
          { label: 'Páratlan szorzat (1,3,5 · 1,3,5)', value: '3 · 3 = 9' },
          { label: 'Páros szorzat', value: '36 - 9 = 27' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Egy fiókban 6 pár piros, 8 pár kék és 10 pár zöld zokni van ömlesztve. A sötétben húzunk. Legalább hány darab zoknit kell kivennünk, hogy BIZTOSAN legyen köztük legalább egy pár azonos színű zokni?',
        questionTypeBadge: 'Zoknihúzás 3 szín',
        figure: <CountingSolverFigure type="socks" />,
        options: ['4 darabot', '3 darabot', '7 darabot', '13 darabot'],
        correctAnswer: '4 darabot',
        explanation: '3 színünk (skatulyánk) van: piros, kék, zöld. A legrosszabb esetben kihúzunk 1 pirosat, 1 kéket és 1 zöldet (3 különböző színű zokni). A 4. zokni már biztosan az egyikkel párt fog alkotni. Tehát 3 + 1 = 4 zoknit kell kihúzni.',
        breakdown: [
          { label: 'Skatulyák száma', value: '3 szín' },
          { label: 'Legrosszabb eset', value: '1P + 1K + 1Z = 3 db' },
          { label: 'Biztos pár', value: '3 + 1 = 4 db' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Hány olyan 3-jegyű szám létezik, amelynek minden számjegye PÁROS (0, 2, 4, 6, 8), és a számjegyek ismétlődhetnek?',
        questionTypeBadge: 'Számképzés feltétellel',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['100', '125', '80', '60'],
        correctAnswer: '100',
        explanation: '1. Első jegy (nem lehet 0): 2, 4, 6, 8 -> 4 lehetőség.\n2. Második jegy: 0, 2, 4, 6, 8 -> 5 lehetőség.\n3. Harmadik jegy: 0, 2, 4, 6, 8 -> 5 lehetőség.\nÖsszesen: 4 · 5 · 5 = 100 szám.',
        breakdown: [
          { label: '1. jegy (2, 4, 6, 8)', value: '4 lehetőség' },
          { label: '2. jegy (0, 2, 4, 6, 8)', value: '5 lehetőség' },
          { label: '3. jegy (0, 2, 4, 6, 8)', value: '5 lehetőség' },
          { label: 'Összesen', value: '4 · 5 · 5 = 100' }
        ]
      },
      {
        id: 'q15',
        prompt: '5 diák (Anna, Balázs, Cili, Dániel, Eszter) moziba megy, és egy 5 székből álló sorban ülnek le. Hányféle különböző ülésrendjük lehetséges?',
        questionTypeBadge: 'Permutáció',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['120', '24', '60', '25'],
        correctAnswer: '120',
        explanation: '5 különböző elem sorbarendezése (permutációja): 5! = 5 · 4 · 3 · 2 · 1 = 120-féle ülésrend lehetséges.',
        breakdown: [
          { label: '1. szék', value: '5 diák' },
          { label: '2. szék', value: '4 diák' },
          { label: '3. szék', value: '3 diák' },
          { label: '4. szék', value: '2 diák' },
          { label: '5. szék', value: '1 diák' },
          { label: 'Összesen', value: '5! = 120' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Egy 4-jegyű bankkártya PIN kódot készítünk a 0-9 számjegyekből. Hány olyan PIN kód létezik, amelyben MINDEN számjegy különböző?',
        questionTypeBadge: 'PIN kód',
        figure: <CountingSolverFigure type="pins" />,
        options: ['5040', '10000', '4536', '6561'],
        correctAnswer: '5040',
        explanation: 'Egy PIN kód kezdődhet 0-val is!\n1. pozíció: 10 lehetőség (0-9).\n2. pozíció: 9 lehetőség.\n3. pozíció: 8 lehetőség.\n4. pozíció: 7 lehetőség.\nÖsszesen: 10 · 9 · 8 · 7 = 5040 kód.',
        breakdown: [
          { label: '1. számjegy', value: '10 lehetőség' },
          { label: '2. számjegy', value: '9 lehetőség' },
          { label: '3. számjegy', value: '8 lehetőség' },
          { label: '4. számjegy', value: '7 lehetőség' },
          { label: 'Szorzat', value: '10 · 9 · 8 · 7 = 5040' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Egy 6 fős baráti társaság tagjai mind kezet fognak egymással érkezéskor pontosan egyszer. Hány kézfogás történik összesen?',
        questionTypeBadge: 'Kézfogások száma',
        figure: <CountingSolverFigure type="tournament" />,
        options: ['15', '30', '36', '12'],
        correctAnswer: '15',
        explanation: 'A kézfogások száma az n elemű halmaz 2 elemű részhalmazainak száma: n · (n - 1) / 2. Nálunk: 6 · 5 / 2 = 30 / 2 = 15 kézfogás.',
        breakdown: [
          { label: 'Emberek száma', value: '6 fő' },
          { label: 'Képlet', value: 'n · (n - 1) / 2' },
          { label: 'Kézfogások', value: '6 · 5 / 2 = 15' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Egy 35 fős osztályban 22-en szeretnek pizzát enni, 18-an hamburgert, és 5-en egyiket sem szeretik. Hányan szeretik mindkettőt (pizzát és hamburgert is)?',
        questionTypeBadge: 'Szita-formula',
        figure: <CountingSolverFigure type="venn_2" />,
        options: ['10-en', '8-an', '12-en', '7-en'],
        correctAnswer: '10-en',
        explanation: '1. Azok száma, akik legalább az egyiket szeretik: 35 - 5 = 30 fő.\n2. A szita-formula: |P ∪ H| = |P| + |H| - |P ∩ H|.\n30 = 22 + 18 - |P ∩ H| => 30 = 40 - |P ∩ H| => |P ∩ H| = 40 - 30 = 10 fő.',
        breakdown: [
          { label: 'Gyorskaját evők', value: '35 - 5 = 30 fő' },
          { label: 'Pizza + Hamburger', value: '22 + 18 = 40' },
          { label: 'Mindkettőt szeretők', value: '40 - 30 = 10 fő' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Két kockával dobva hányféleképpen kaphatunk 7-es összeget?',
        questionTypeBadge: 'Esetek szétbontása',
        figure: <CountingSolverFigure type="dice" />,
        options: ['6-féleképpen', '5-féleképpen', '4-féleképpen', '7-féleképpen'],
        correctAnswer: '6-féleképpen',
        explanation: 'A 7-es összeg lehetséges (piros, kék) párjai: (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1). Ez összesen 6 különböző dobáspár.',
        breakdown: [
          { label: '1-es kezdéssel', value: '(1, 6)' },
          { label: '2-es, 3-as kezdéssel', value: '(2, 5), (3, 4)' },
          { label: '4-es, 5-ös, 6-os', value: '(4, 3), (5, 2), (6, 1)' },
          { label: 'Összesen', value: '6 eset' }
        ]
      },
      {
        id: 'q20',
        prompt: '17 darab labdát osztunk szét 4 dobozba. Mit állíthatunk biztosan a legtöbb labdát tartalmazó dobozról?',
        questionTypeBadge: 'Általános Dirichlet',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: [
          'Biztosan van legalább egy doboz, amelyben legalább 5 labda van.',
          'Biztosan van egy doboz, amiben pontosan 5 labda van.',
          'Minden dobozban legalább 4 labda van.',
          'A legtöbb labdát tartalmazó dobozban legalább 6 labda van.'
        ],
        correctAnswer: 'Biztosan van legalább egy doboz, amelyben legalább 5 labda van.',
        explanation: 'N = 17 labda és K = 4 doboz esetén: 17 = 4 · 4 + 1. Az általános Dirichlet-elv szerint legalább egy dobozban legalább ⌈17 / 4⌉ = ⌈4,25⌉ = 5 labdának kell lennie.',
        breakdown: [
          { label: 'Osztás', value: '17 / 4 = 4 maradék 1' },
          { label: 'Felső egészrész', value: '⌈17/4⌉ = 5' },
          { label: 'Garancia', value: 'Legalább egy dobozban ≥ 5 labda' }
        ]
      }
    ]
  },

  3: {
    level: 3,
    title: '3. Szint: Mesteri Szint és Logikai Kombinatorika',
    subtitle: 'Feltételes számképzés, kesztyűs szabály, körmérkőzések, komplementer módszer és geometriai skatulyák',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Hány olyan 4-jegyű szám van, amelynek minden számjegye KÜLÖNBÖZŐ, és a szám 5-tel osztható?',
        questionTypeBadge: 'Feltételes számképzés',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['952', '1008', '900', '1024'],
        correctAnswer: '952',
        explanation: 'Két esetet kell szétválasztani a végződés szerint:\n1. Eset: a szám 0-ra végződik (utolsó jegy 1 lehetőség):\n   - Első jegy: 9 lehetőség (1-9)\n   - Második jegy: 8 lehetőség\n   - Harmadik jegy: 7 lehetőség\n   -> 9 · 8 · 7 · 1 = 504 szám.\n2. Eset: a szám 5-re végződik (utolsó jegy 1 lehetőség):\n   - Első jegy: 8 lehetőség (nem lehet 0 és nem lehet 5)\n   - Második jegy: 8 lehetőség (most már lehet 0)\n   - Harmadik jegy: 7 lehetőség\n   -> 8 · 8 · 7 · 1 = 448 szám.\nÖsszesen: 504 + 448 = 952 szám.',
        breakdown: [
          { label: '0-ra végződők', value: '9 · 8 · 7 · 1 = 504' },
          { label: '5-re végződők', value: '8 · 8 · 7 · 1 = 448' },
          { label: 'Összesen', value: '504 + 448 = 952' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Egy szekrényben 10 pár fekete és 10 pár barna bőrkesztyű van ömlesztve (összesen 40 darab kesztyű: 10 bal fekete, 10 jobb fekete, 10 bal barna, 10 jobb barna). Legalább hány darab kesztyűt kell kihúznunk a sötétben, hogy BIZTOSAN legyen köztük egy hordható (egy balos és egy jobbos, azonos színű) kesztyűpár?',
        questionTypeBadge: 'Kesztyű-elv',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: ['21 darabot', '11 darabot', '3 darabot', '5 darabot'],
        correctAnswer: '21 darabot',
        explanation: 'A kesztyűknél a jobb és bal kéz nem felcserélhető!\nA legrosszabb eset az, amikor csupa balos kesztyűt húzunk: kihúzzuk az összes bal feketét (10 db) és az összes bal barnát (10 db). Ez eddig 20 darab kesztyű, de még nincs egyetlen hordható párunk sem! A 21. kihúzott kesztyű biztosan egy jobbkezes kesztyű lesz, és vagy a feketével, vagy a barnával hordható párt alkot. Tehát 20 + 1 = 21 kesztyű szükséges.',
        breakdown: [
          { label: 'Összes balkezes kesztyű', value: '10 fekete + 10 barna = 20 db' },
          { label: 'Legrosszabb eset', value: '20 db balkezes kihúzása' },
          { label: 'Biztos hordható pár', value: '20 + 1 = 21 db' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Egy labdarúgó bajnokságban 8 csapat vesz részt. Minden csapat minden másik csapattal kétszer játszik (egy hazai és egy idegenbeli meccs). Hány mérkőzést játszanak le összesen?',
        questionTypeBadge: 'Oda-visszavágós torna',
        figure: <CountingSolverFigure type="tournament" />,
        options: ['56', '28', '64', '32'],
        correctAnswer: '56',
        explanation: 'Minden csapat a maradék 7 csapattal játszik 1 hazai és 1 idegenbeli mérkőzést (tehát 7 · 2 = 14 meccset fejenként). Mivel 8 csapat van, és minden mérkőzésen 2 csapat játszik: 8 · 7 = 56 mérkőzés. (Vagy: az egyszeres körmérkőzés 8 · 7 / 2 = 28 meccsének a duplája: 28 · 2 = 56).',
        breakdown: [
          { label: 'Egyszeres körmérkőzés', value: '8 · 7 / 2 = 28 meccs' },
          { label: 'Oda-visszavágó (dupla)', value: '28 · 2 = 56 meccs' }
        ]
      },
      {
        id: 'q24',
        prompt: '3 darab szabályos dobókockával dobunk egyszerre. Hány olyan kimenetel van, amelyben LEGALÁBB EGY kockán 6-ost dobunk?',
        questionTypeBadge: 'Komplementer módszer',
        figure: <CountingSolverFigure type="dice" />,
        options: ['91', '125', '75', '108'],
        correctAnswer: '91',
        explanation: 'Alkalmazzuk a komplementer módszert:\n1. Összes kimenetel 3 kockával: 6 · 6 · 6 = 216.\n2. Rossz esetek (egyetlen kockán sincs 6-os, tehát csak 1-5 dobható): 5 · 5 · 5 = 125.\n3. Legalább egy 6-os: Összes - Rossz = 216 - 125 = 91 eset.',
        breakdown: [
          { label: 'Összes dobás (6³)', value: '216' },
          { label: 'Nincs benne 6-os (5³)', value: '125' },
          { label: 'Legalább egy 6-os', value: '216 - 125 = 91' }
        ]
      },
      {
        id: 'q25',
        prompt: 'Egy 1 méter oldalú négyzet belsejében elhelyezünk 5 pontot. Mit állíthatunk biztosan bármelyik elhelyezés esetén a pontok egymástól mért távolságáról?',
        questionTypeBadge: 'Geometriai skatulya',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: [
          'Biztosan van két pont, amelyek távolsága legfeljebb √2/2 méter (kb. 0,71 m).',
          'Biztosan van két pont, amelyek távolsága legalább 1 méter.',
          'Minden pont távolsága pontosan 0,5 méter a szomszédjától.',
          'Nem tehetünk semmilyen biztos állítást a pontok távolságára.'
        ],
        correctAnswer: 'Biztosan van két pont, amelyek távolsága legfeljebb √2/2 méter (kb. 0,71 m).',
        explanation: 'Osszuk fel az 1×1-es négyzetet 4 darab 0,5×0,5-ös kis négyzetre (ez a 4 skatulya). 5 pontot (tárgyat) helyezünk el bennük, így a Dirichlet-elv szerint legalább egy kis négyzetbe legalább 2 pont kerül. Egy 0,5×0,5-ös kis négyzetben lévő két pont maximális távolsága a kis négyzet átlója: d = √(0,5² + 0,5²) = √(0,25 + 0,25) = √0,5 = √2 / 2 ≈ 0,707 méter.',
        breakdown: [
          { label: 'Skatulyák', value: '4 db 0,5×0,5-ös kis négyzet' },
          { label: 'Dirichlet-elv', value: 'Egy kis négyzetbe legalább 2 pont kerül' },
          { label: 'Kis négyzet átlója', value: '√(0,5² + 0,5²) = √2/2' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Hány olyan 4-jegyű szám van, amelynek számjegyei BALRÓL JOBBRA SZIGORÚAN NÖVEKEDNEK (pl. 1348, 2579)?',
        questionTypeBadge: 'Kombináció / Kiválasztás',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['126', '210', '120', '84'],
        correctAnswer: '126',
        explanation: 'A 0 nem szerepelhet a számjegyek között (mivel ha lenne, legelöl kellene lennie, de 0-val nem kezdődhet szám). Így az 1, 2, 3, 4, 5, 6, 7, 8, 9 (9 darab) számjegyből kell kiválasztanunk 4 különbözőt. Bármelyik 4 jegyet választjuk ki, azokat pontosan EGYFÉLEKÉPPEN tudjuk növekvő sorrendbe rakni. Ezért a számok száma megegyezik 9 elemből 4 kiválasztásával: (9 · 8 · 7 · 6) / (4 · 3 · 2 · 1) = 3024 / 24 = 126 szám.',
        breakdown: [
          { label: 'Használható jegyek', value: '1-9 (9 db számjegy)' },
          { label: 'Sorrend', value: 'Egyértelmű (csak 1 sorrend növekvő)' },
          { label: 'Kiválasztások száma', value: '(9·8·7·6) / 24 = 126' }
        ]
      },
      {
        id: 'q27',
        prompt: '5 barát egy KEREK asztal köré ül le vacsorázni. Két ülésrendet azonosnak tekintünk, ha mindenki jobb és bal szomszédja megegyezik (az asztal elforgatása nem számít új ülésrendnek). Hány különböző körkörös ülésrend létezik?',
        questionTypeBadge: 'Ciklikus permutáció',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['24', '120', '60', '12'],
        correctAnswer: '24',
        explanation: 'Körkörös (ciklikus) permutáció esetén az első ember helyét rögzítjük (viszonyítási pontként), és a maradék (n - 1) embert rendezzük el sorban. Így (5 - 1)! = 4! = 4 · 3 · 2 · 1 = 24 különböző körkörös ülésrend lehetséges.',
        breakdown: [
          { label: 'Képlet', value: '(n - 1)!' },
          { label: 'Számítás', value: '(5 - 1)! = 4! = 24' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Egy szabályos 2×2 méteres négyzetben elszórunk 9 pontot. Mutassuk meg a Dirichlet-elvvel, hogy van köztük legalább 3 olyan pont, amelyek mind beleesnek egy 1×1 méteres kis négyzetbe!',
        questionTypeBadge: 'Általános Dirichlet',
        figure: <CountingSolverFigure type="pigeonhole" />,
        options: [
          'Igen, mert 9 pont 4 skatulyába osztva ⌈9/4⌉ = 3 pontot garantál egy skatulyában.',
          'Nem, mert a pontokat el lehet osztani úgy, hogy mindegyikben legfeljebb 2 legyen.',
          'Csak akkor igaz, ha a pontok a csúcsokban vannak.',
          'Nem skatulya-elv, hanem Pitagorasz-tétel kell hozzá.'
        ],
        correctAnswer: 'Igen, mert 9 pont 4 skatulyába osztva ⌈9/4⌉ = 3 pontot garantál egy skatulyában.',
        explanation: 'A 2×2-es négyzetet 4 darab 1×1-es kis négyzetre (skatulyára) osztjuk. N = 9 pontot teszünk K = 4 skatulyába. Mivel 9 = 2 · 4 + 1, az általánosított Dirichlet-elv szerint legalább egy kis négyzetbe legalább ⌈9 / 4⌉ = 3 pont kerül.',
        breakdown: [
          { label: 'Skatulyák (K)', value: '4 db 1x1-es négyzet' },
          { label: 'Pontok (N)', value: '9 db' },
          { label: 'Garancia', value: '⌈9/4⌉ = legalább 3 pont' }
        ]
      },
      {
        id: 'q29',
        prompt: '4 ember (Anna, Béla, Cili, Dénes) ül le egy padra egymás mellé. Hány olyan ülésrend van, amelyben Anna és Béla NEM ülnek közvetlenül egymás mellett?',
        questionTypeBadge: 'Korlátozott permutáció',
        figure: <CountingSolverFigure type="permutation" />,
        options: ['12', '18', '6', '16'],
        correctAnswer: '12',
        explanation: 'Használjuk a komplementer módszert!\n1. Összes ülésrend: 4! = 4 · 3 · 2 · 1 = 24.\n2. Rossz esetek (Anna és Béla egymás mellett ülnek): Tekintsük Annát és Bélát egyetlen "blokknak" (AB vagy BA: 2 lehetőség). Ekkor 3 blokkot rendezünk sorba: 3! = 6. Így 2 · 6 = 12 olyan eset van, amikor egymás mellett ülnek.\n3. Nem ülnek egymás mellett: 24 - 12 = 12 eset.',
        breakdown: [
          { label: 'Összes eset', value: '4! = 24' },
          { label: 'Egymás mellett ülnek (rossz)', value: '2 · 3! = 12' },
          { label: 'Külön ülnek', value: '24 - 12 = 12' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Egy 40 fős táborban 25-en úsznak, 20-an bicikliznek, 18-an túráznak. 12-en úsznak és bicikliznek, 10-en bicikliznek és túráznak, 8-an úsznak és túráznak, és 4-en mindhárom sportot űzik. Hányan nem űzik egyik sportot sem?',
        questionTypeBadge: '3 halmazos szita',
        figure: <CountingSolverFigure type="venn_3" />,
        options: ['3-an', '5-en', '0-an', '7-en'],
        correctAnswer: '3-an',
        explanation: 'A háromhalmazos szita-formula szerint:\n|Ú ∪ B ∪ T| = (|Ú| + |B| + |T|) - (|Ú ∩ B| + |B ∩ T| + |Ú ∩ T|) + |Ú ∩ B ∩ T|\n= (25 + 20 + 18) - (12 + 10 + 8) + 4 = 63 - 30 + 4 = 37 fő űz legalább egy sportot.\nNem sportolók száma: 40 - 37 = 3 fő.',
        breakdown: [
          { label: 'Egyes összegek', value: '25 + 20 + 18 = 63' },
          { label: 'Páros metszetek levonása', value: '- 30' },
          { label: 'Hármas metszet hozzáadása', value: '+ 4' },
          { label: 'Sportolók uniója', value: '37 fő' },
          { label: 'Nem sportolók', value: '40 - 37 = 3 fő' }
        ]
      }
    ]
  }
};

export const CountingQuiz: React.FC<CountingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="gondolkodjunk"
      subtopicId="szamold-ossze"
      topicId="g7-logic-count-it"
      topicTitle="1. Számold össze!"
      topicBadge="7. Osztály • Matematika I. Témakör"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="1. Számold össze! Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 nehézségi szinten: skatulya-elv, szorzási szabály, fa-diagramok és halmazok elemszáma"
      levels={quizLevels}
      cheatSheetTitle="Összeszámlálási Szabályok és Képletek"
      cheatSheetCards={cheatSheetCards}
      matcherComponent={<CountingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<CountingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="blue"
    />
  );
};
