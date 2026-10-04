import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Calculator,
  Compass,
  Award,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  Activity,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { FunctionsGraphsMatcher } from './FunctionsGraphsMatcher';
import { FunctionsGraphsSorter } from './FunctionsGraphsSorter';

interface FunctionsGraphsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Lineáris Függvény: f(x) = ax + b',
    icon: <LineChart className="w-4 h-4 text-blue-600" />,
    formula: 'f(x) = a \\cdot x + b \\quad (a = \\text{meredekség}, \\; b = y\\text{-metszet})',
    note: 'Grafikonja egyenes. Ha a > 0, emelkedik; ha a < 0, lejt; ha a = 0, vízszintes. Az y-tengelyt a (0; b) pontban metszi.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="15" y1="25" x2="85" y2="25" stroke="#94a3b8" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="45" stroke="#94a3b8" strokeWidth="1" />
        <line x1="20" y1="40" x2="80" y2="10" stroke="#2563eb" strokeWidth="1.8" />
        <circle cx="50" cy="25" r="2" fill="#475569" />
        <circle cx="50" cy="18" r="2.5" fill="#f59e0b" />
        <text x="56" y="19" className="text-[6px] font-bold fill-amber-700">(0; b)</text>
        <text x="120" y="22" className="text-[7px] font-bold fill-blue-800" textAnchor="middle">a: meredekség</text>
        <text x="120" y="34" className="text-[6.5px] fill-slate-500" textAnchor="middle">b: eltolás</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Zérushely Számítása: f(x) = 0',
    icon: <Compass className="w-4 h-4 text-emerald-600" />,
    formula: 'ax + b = 0 \\implies x_0 = -\\frac{b}{a} \\quad (a \\neq 0)',
    note: 'A zérushely az az x érték, ahol a függvény értéke 0. Geometriailag az x-tengellyel való metszéspont: (x₀; 0).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="15" y1="25" x2="85" y2="25" stroke="#94a3b8" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="45" stroke="#94a3b8" strokeWidth="1" />
        <line x1="20" y1="40" x2="80" y2="10" stroke="#10b981" strokeWidth="1.8" />
        <circle cx="35" cy="25" r="2.5" fill="#10b981" />
        <text x="35" y="34" className="text-[6px] font-black fill-emerald-800" textAnchor="middle">(x₀; 0)</text>
        <text x="120" y="24" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">f(x) = 0</text>
        <text x="120" y="35" className="text-[6.5px] fill-slate-500" textAnchor="middle">x-tengelymetszet</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Párhuzamos és Merőleges Egyenesek',
    icon: <TrendingUp className="w-4 h-4 text-indigo-600" />,
    formula: 'a_1 = a_2 \\iff \\text{Párhuzamosak} \\quad | \\quad a_1 \\cdot a_2 = -1 \\iff \\text{Merőlegesek}',
    note: 'Két egyenes párhuzamos, ha meredekségük azonos és b₁ ≠ b₂. Egymásra merőlegesek, ha meredekségeik szorzata -1.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="15" y1="35" x2="65" y2="10" stroke="#6366f1" strokeWidth="1.5" />
        <line x1="25" y1="42" x2="75" y2="17" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="118" y="22" className="text-[7px] font-bold fill-indigo-800" textAnchor="middle">a₁ = a₂</text>
        <text x="118" y="34" className="text-[6.5px] fill-slate-500" textAnchor="middle">ugyanaz a dőlés</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Nevezetes Görbék: x² és |x|',
    icon: <Layers className="w-4 h-4 text-violet-600" />,
    formula: 'f(x) = x^2 \\; (\\text{Parabola}) \\quad | \\quad f(x) = |x| \\; (\\text{„V” Alakzat})',
    note: 'Mindkét alapfüggvény értéke nemnegatív (y ≥ 0), és mindkettőnek a (0; 0) origóban van a tengely- vagy csúcspontja.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 15 10 Q 35 42 55 10" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M 65 12 L 80 38 L 95 12" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
        <text x="35" y="47" className="text-[5.5px] font-bold fill-violet-800" textAnchor="middle">x²</text>
        <text x="80" y="47" className="text-[5.5px] font-bold fill-cyan-800" textAnchor="middle">|x|</text>
        <text x="130" y="24" className="text-[7px] font-bold fill-slate-700" textAnchor="middle">Min: (0; 0)</text>
        <text x="130" y="35" className="text-[6.5px] fill-slate-500" textAnchor="middle">y ≥ 0</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak, Meredekség és Tengelymetszet',
    subtitle: 'Ismerd fel az f(x) = ax + b alak paramétereit, számold ki a behelyettesítési értékeket!',
    questions: [
      {
        id: 'g8-fg-l1-q1',
        question: 'Az f(x) = -3x + 5 függvény grafikonja hol metszi az y-tengelyt, és mennyi a meredeksége?',
        options: [
          'Az y-tengelyt a (0; 5) pontban metszi, meredeksége a = -3',
          'Az y-tengelyt a (0; -3) pontban metszi, meredeksége a = 5',
          'Az origóban metszi, meredeksége a = 2',
          'Az y-tengelyt az (5; 0) pontban metszi, meredeksége a = -3'
        ],
        correctAnswer: 0,
        hint: 'Az f(x) = ax + b alakban az x szorzója (a) adja a meredekséget, a konstans szám (b) pedig az y-metszetet: (0; b).',
        explanation: 'Az f(x) = ax + b egyenletben a = -3 a meredekség, és b = 5 az y-tengelymetszet, így az egyenes a (0; 5) pontban metszi a függőleges tengelyt.'
      },
      {
        id: 'g8-fg-l1-q2',
        question: 'Ha f(x) = 4x - 7, mennyi a függvény értéke az x = 3 helyen (f(3))?',
        options: ['5', '-5', '19', '1'],
        correctAnswer: 0,
        hint: 'Helyettesíts x helyére 3-at a képletbe!',
        explanation: 'f(3) = 4 · 3 - 7 = 12 - 7 = 5.'
      },
      {
        id: 'g8-fg-l1-q3',
        question: 'Melyik függvény grafikonja halad át biztosan az origón (0; 0)?',
        options: [
          'f(x) = -5x',
          'g(x) = 2x + 1',
          'h(x) = 3x - 3',
          'k(x) = 4'
        ],
        correctAnswer: 0,
        hint: 'Az egyenes akkor megy át az origón, ha x = 0 esetén y = 0, vagyis a b konstans tag értéke 0.',
        explanation: 'Az f(x) = -5x képletben b = 0, így f(0) = -5 · 0 = 0. Ez egyenes arányosság, amely átmegy az origón.'
      },
      {
        id: 'g8-fg-l1-q4',
        question: 'Melyik állítás igaz az f(x) = -2x + 1 függvény menetirányára?',
        options: [
          'Szigorúan monoton csökkenő (balról jobbra lejt), mert a = -2 < 0',
          'Szigorúan monoton növekvő (balról jobbra emelkedik), mert b = 1 > 0',
          'Vízszintes konstans egyenes',
          'Először csökken, majd a zérushely után növekszik'
        ],
        correctAnswer: 0,
        hint: 'A menetirányt kizárólag az x előtti meredekség (a) előjele dönti el!',
        explanation: 'Mivel a = -2 negatív szám, a függvény a teljes számegyenesen szigorúan monoton csökkenő.'
      },
      {
        id: 'g8-fg-l1-q5',
        question: 'Az alábbi egyenesek közül melyik metszi a legmagasabban az y-tengelyt?',
        options: [
          'f(x) = 2x + 8',
          'g(x) = 5x + 3',
          'h(x) = -x + 1',
          'k(x) = 3x - 4'
        ],
        correctAnswer: 0,
        hint: 'Hasonlítsd össze az egyenletek b konstans tagjait!',
        explanation: 'Az y-tengelymetszetek: f esetén 8, g esetén 3, h esetén 1, k esetén -4. A legnagyobb érték a b = 8.'
      },
      {
        id: 'g8-fg-l1-q6',
        question: 'Ha g(x) = 2 - 5x, mennyi a meredekség (a) és az y-metszet (b)?',
        options: [
          'a = -5 és b = 2',
          'a = 2 és b = -5',
          'a = 5 és b = 2',
          'a = -5 és b = 0'
        ],
        correctAnswer: 0,
        hint: 'A meredekség mindig az x szorzótényezője előjellel együtt, nem a sorrendben elöl álló szám!',
        explanation: 'Átrendezve: g(x) = -5x + 2. Az x szorzója a = -5 (meredekség), a konstans tag pedig b = 2 (y-metszet).'
      },
      {
        id: 'g8-fg-l1-q7',
        question: 'Milyen alakú a koordináta-rendszerben az f(x) = 4 konstans függvény grafikonja?',
        options: [
          'Vízszintes egyenes, amely párhuzamos az x-tengellyel és a (0; 4) ponton megy át',
          'Függőleges egyenes az x = 4 helyen',
          '45°-os ferde egyenes',
          'Parabola görbe'
        ],
        correctAnswer: 0,
        hint: 'Itt a = 0, így az egyenes meredeksége nulla, vagyis nem emelkedik és nem lejt.',
        explanation: 'Az f(x) = 4 konstans függvény grafikonja egy vízszintes egyenes, amely minden x esetén 4 magasságban halad.'
      },
      {
        id: 'g8-fg-l1-q8',
        question: 'Ha f(x) = 3x - 2, mennyi f(-2) helyettesítési értéke?',
        options: ['-8', '-4', '4', '-6'],
        correctAnswer: 0,
        hint: 'Számolj körültekintően az előjelekkel: 3 · (-2) - 2.',
        explanation: 'f(-2) = 3 · (-2) - 2 = -6 - 2 = -8.'
      },
      {
        id: 'g8-fg-l1-q9',
        question: 'Mit jelent a függvény értelmezési tartománya (D_f)?',
        options: [
          'Azon független x bemeneti értékek halmazát, amelyekre a szabály alkalmazható',
          'A függvény által felvett y értékek halmazát',
          'Csak a pozitív számokat',
          'A függvény zérushelyét'
        ],
        correctAnswer: 0,
        hint: 'D = Domain (alaphalmaz, bemenet), R = Range (értékkészlet, kimenet).',
        explanation: 'Az értelmezési tartomány (D_f) azoknak az x értékeknek az összessége, amelyekre a függvény hozzárendelése értelmezve van.'
      },
      {
        id: 'g8-fg-l1-q10',
        question: 'Mit jelent geometriailag a lépésháromszögben az a = 3 meredekség?',
        options: [
          'Ha az x tengelyen 1 egységet lépünk jobbra, az y értéke 3 egységet nő felfelé',
          'Ha az x tengelyen 3 egységet lépünk jobbra, az y 1-et nő',
          'Hogy az egyenes átmegy a (3; 3) ponton',
          'Hogy a zérushely x = 3'
        ],
        correctAnswer: 0,
        hint: 'Meredekség = függőleges elmozdulás / vízszintes elmozdulás: Δy / Δx = 3 / 1.',
        explanation: 'Az iránytényező definíciója szerint 1 egység jobbra lépéshez 3 egység függőleges emelkedés tartozik.'
      }
    ]
  },
  2: {
    title: '2. Szint: Zérushely, Párhuzamosság és Nevezetes Görbék',
    subtitle: 'Oldd meg a zérushely-egyenleteket, azonosítsd a párhuzamos egyeneseket és nevezetes függvényeket!',
    questions: [
      {
        id: 'g8-fg-l2-q1',
        question: 'Mennyi az f(x) = 2x - 8 lineáris függvény zérushelye?',
        options: ['x = 4', 'x = -4', 'x = 8', 'x = -8'],
        correctAnswer: 0,
        hint: 'A zérushelynél a függvény értéke 0: 2x - 8 = 0.',
        explanation: '2x - 8 = 0 => 2x = 8 => x = 4. A grafikon a (4; 0) pontban metszi az x-tengelyt.'
      },
      {
        id: 'g8-fg-l2-q2',
        question: 'Mennyi az f(x) = -3x + 15 függvény zérushelye?',
        options: ['x = 5', 'x = -5', 'x = 15', 'x = 3'],
        correctAnswer: 0,
        hint: 'Állítsd fel az egyenletet: -3x + 15 = 0, és adj hozzá mindkét oldalhoz 3x-et!',
        explanation: '-3x + 15 = 0 => 15 = 3x => x = 5.'
      },
      {
        id: 'g8-fg-l2-q3',
        question: 'Melyik egyenes PÁRHUZAMOS az y = 4x - 9 egyenessel?',
        options: [
          'y = 4x + 3',
          'y = -4x - 9',
          'y = 0,25x - 9',
          'y = -0,25x + 3'
        ],
        correctAnswer: 0,
        hint: 'Két egyenes pontosan akkor párhuzamos, ha meredekségük azonos (a₁ = a₂), de tengelymetszetük különbözik.',
        explanation: 'Az y = 4x + 3 egyenes meredeksége szintén a = 4, és b = 3 ≠ -9, így a két egyenes párhuzamos.'
      },
      {
        id: 'g8-fg-l2-q4',
        question: 'Milyen alakú az f(x) = |x| abszolútérték-függvény grafikonja?',
        options: [
          'Egy origóban (0; 0) törő „V” alakzat, amely sosem vesz fel negatív értéket',
          'Egyenes vonal',
          'Kör alakzat',
          'U alakú sima parabola'
        ],
        correctAnswer: 0,
        hint: '|x| mindig nemnegatív: x ≥ 0 esetén y = x, x < 0 esetén y = -x.',
        explanation: 'Az abszolútérték-függvény grafikonja két félegyenesből áll, amelyek a (0; 0) csúcspontban találkoznak, létrehozva a jellegzetes „V” alakot.'
      },
      {
        id: 'g8-fg-l2-q5',
        question: 'Hol található az f(x) = x² másodfokú alapfüggvény tengelypontja (minimuma)?',
        options: [
          'A (0; 0) origóban',
          'A (0; 1) pontban',
          'A (1; 1) pontban',
          'A (0; -1) pontban'
        ],
        correctAnswer: 0,
        hint: 'Bármely valós szám négyzete legalább 0: x² ≥ 0, és x = 0 esetén veszi fel a legkisebb értékét.',
        explanation: 'Az f(x) = x² parabola csúcspontja és minimuma az origóban (0; 0) van, innen mindkét irányban szimmetrikusan felfelé nyílik.'
      },
      {
        id: 'g8-fg-l2-q6',
        question: 'Mennyi az f(x) = 0,5x + 3 függvény zérushelye?',
        options: ['x = -6', 'x = 6', 'x = -1,5', 'x = 1,5'],
        correctAnswer: 0,
        hint: '0,5x + 3 = 0 => 0,5x = -3 => szorozd meg mindkét oldalt 2-vel!',
        explanation: '0,5x = -3 => x = -3 / 0,5 = -6.'
      },
      {
        id: 'g8-fg-l2-q7',
        question: 'Melyik pont illeszkedik az f(x) = 3x - 4 egyenesre?',
        options: [
          'P(2; 2)',
          'Q(1; 1)',
          'R(3; 4)',
          'S(0; 4)'
        ],
        correctAnswer: 0,
        hint: 'Helyettesítsd be az x értéket a pontból, és vizsgáld meg, hogy a kapott eredmény egyenlő-e az y értékkel!',
        explanation: 'P(2; 2) esetén: f(2) = 3 · 2 - 4 = 6 - 4 = 2. Mivel az eredmény 2, a pont illeszkedik az egyenesre.'
      },
      {
        id: 'g8-fg-l2-q8',
        question: 'Mikor mondjuk két lineáris egyenesről, hogy egymásra MERŐLEGESEK?',
        options: [
          'Ha a meredekségeik szorzata: a₁ · a₂ = -1',
          'Ha a meredekségeik megegyeznek: a₁ = a₂',
          'Ha az y-metszeteik egyenlők: b₁ = b₂',
          'Ha mindkettő átmegy az origón'
        ],
        correctAnswer: 0,
        hint: 'Például az a = 2 meredekségű egyenesre az a = -1/2 (-0,5) meredekségű egyenes merőleges.',
        explanation: 'Két egyenes pontosan akkor zár be derékszöget (90°), ha meredekségeik egymás negatív reciprokai: a₁ · a₂ = -1.'
      },
      {
        id: 'g8-fg-l2-q9',
        question: 'Melyik függvénynek NINCS zérushelye a valós számok halmazán?',
        options: [
          'f(x) = 5',
          'g(x) = 2x',
          'h(x) = -3x + 6',
          'k(x) = x² - 1'
        ],
        correctAnswer: 0,
        hint: 'Egy vízszintes egyenes, amely nem a koordinátatengelyen fekszik, sosem metszi az x-tengelyt.',
        explanation: 'Az f(x) = 5 konstans függvény minden x-re 5-öt ad, értéke soha nem lehet 0, így nincs zérushelye.'
      },
      {
        id: 'g8-fg-l2-q10',
        question: 'Ha f(x) = |x| - 4, mely x értékeknél lesz a függvény értéke 0?',
        options: [
          'x₁ = 4 és x₂ = -4',
          'Csak x = 4',
          'Csak x = -4',
          'x₁ = 2 és x₂ = -2'
        ],
        correctAnswer: 0,
        hint: '|x| - 4 = 0 => |x| = 4. Mely számoknak 4 az abszolútértéke?',
        explanation: 'Mivel |4| = 4 és |-4| = 4, a függvénynek két zérushelye van: x = 4 és x = -4.'
      }
    ]
  },
  3: {
    title: '3. Szint: Szabályfelírás Pontokból és Összetett Elemzés',
    subtitle: 'Határozd meg a hozzárendelést pontpárokból, számítsd ki a metszéspontokat és alkalmazd a tudásodat!',
    questions: [
      {
        id: 'g8-fg-l3-q1',
        question: 'Egy egyenes átmegy az A(0; -2) és a B(3; 7) pontokon. Mi a hozzárendelés szabálya?',
        options: [
          'f(x) = 3x - 2',
          'f(x) = 2x - 3',
          'f(x) = -2x + 7',
          'f(x) = 3x + 2'
        ],
        correctAnswer: 0,
        hint: 'Az A(0; -2) pontból b = -2. Ezután B-t behelyettesítve: 7 = a · 3 - 2.',
        explanation: 'Az A(0; -2) pont miatt b = -2. A B(3; 7) pontot behelyettesítve: 7 = 3a - 2 => 9 = 3a => a = 3. A képlet: f(x) = 3x - 2.'
      },
      {
        id: 'g8-fg-l3-q2',
        question: 'Írd fel annak az egyenesnek az egyenletét, amely párhuzamos az y = -2x + 5 egyenessel és átmegy a P(1; 4) ponton!',
        options: [
          'y = -2x + 6',
          'y = -2x + 4',
          'y = 2x + 2',
          'y = -2x - 6'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamosság miatt a = -2. Helyettesítsd be a P(1; 4) pontot az y = -2x + b egyenletbe!',
        explanation: 'Mivel párhuzamos, a = -2. Behelyettesítve: 4 = -2 · 1 + b => 4 = -2 + b => b = 6. Az egyenlet: y = -2x + 6.'
      },
      {
        id: 'g8-fg-l3-q3',
        question: 'Hol metszi egymást az f(x) = 2x - 1 és a g(x) = -x + 5 egyenes a síkban?',
        options: [
          'M(2; 3)',
          'M(3; 2)',
          'M(1; 1)',
          'M(4; -1)'
        ],
        correctAnswer: 0,
        hint: 'A metszéspontban a két függvényérték egyenlő: 2x - 1 = -x + 5.',
        explanation: '2x - 1 = -x + 5 => 3x = 6 => x = 2. Behelyettesítve: y = 2 · 2 - 1 = 3. A metszéspont: M(2; 3).'
      },
      {
        id: 'g8-fg-l3-q4',
        question: 'Egy egyenes átmegy a P(-2; 8) és a Q(4; -4) pontokon. Mennyi az egyenes meredeksége (a)?',
        options: ['a = -2', 'a = 2', 'a = -0,5', 'a = 3'],
        correctAnswer: 0,
        hint: 'Meredekség képlete: a = (y₂ - y₁) / (x₂ - x₁).',
        explanation: 'a = (-4 - 8) / (4 - (-2)) = -12 / 6 = -2.'
      },
      {
        id: 'g8-fg-l3-q5',
        question: 'Melyik k érték esetén lesz a P(k; 13) pont rajta az f(x) = 5x - 2 egyenesen?',
        options: ['k = 3', 'k = 2', 'k = 15', 'k = 2,5'],
        correctAnswer: 0,
        hint: 'Helyettesítsd be az y = 13 és x = k értékeket az egyenletbe: 13 = 5k - 2.',
        explanation: '13 = 5k - 2 => 15 = 5k => k = 3.'
      },
      {
        id: 'g8-fg-l3-q6',
        question: 'Mennyi az f(x) = x² - 9 függvény két zérushelyének összege?',
        options: ['0', '6', '-6', '9'],
        correctAnswer: 0,
        hint: 'x² - 9 = 0 => x² = 9 => x₁ = 3 és x₂ = -3. Mennyi az összegük?',
        explanation: 'A két zérushely x₁ = 3 és x₂ = -3. Ezek összege: 3 + (-3) = 0.'
      },
      {
        id: 'g8-fg-l3-q7',
        question: 'Egy autó tankjában 50 liter benzin van. 100 kilométerenként 6 litert fogyaszt (1 km-en 0,06 l). Mi a tankban maradó benzin (y) képlete a megtett x km függvényében?',
        options: [
          'y = 50 - 0,06x',
          'y = 50 + 0,06x',
          'y = 6x - 50',
          'y = 50 - 6x'
        ],
        correctAnswer: 0,
        hint: 'Kezdeti érték (b) = 50 l, minden megtett kilométerrel 0,06 literrel csökken az üzemanyag.',
        explanation: 'A kezdeti mennyiségből (50) kivonjuk a fogyasztást: y = 50 - 0,06x. Ez egy csökkenő lineáris függvény.'
      },
      {
        id: 'g8-fg-l3-q8',
        question: 'Mely pontokban metszi az f(x) = 4 - 2x egyenes az x- és az y-tengelyt?',
        options: [
          'X-metszet: (2; 0) és Y-metszet: (0; 4)',
          'X-metszet: (4; 0) és Y-metszet: (0; 2)',
          'X-metszet: (-2; 0) és Y-metszet: (0; 4)',
          'X-metszet: (0; 2) és Y-metszet: (4; 0)'
        ],
        correctAnswer: 0,
        hint: 'X-metszetnél y = 0 (4 - 2x = 0); Y-metszetnél x = 0 (f(0) = 4).',
        explanation: '4 - 2x = 0 => x = 2, így az X-metszet (2; 0). Ha x = 0, f(0) = 4, így az Y-metszet (0; 4).'
      },
      {
        id: 'g8-fg-l3-q9',
        question: 'Ha egy lineáris függvényre f(2) = 7 és f(4) = 11, mennyi az a (meredekség) és b (tengelymetszet) értéke?',
        options: [
          'a = 2 és b = 3',
          'a = 3 és b = 2',
          'a = 4 és b = -1',
          'a = 2 és b = 5'
        ],
        correctAnswer: 0,
        hint: 'Meredekség: a = (11 - 7) / (4 - 2) = 4 / 2 = 2. Ezután b = 7 - 2 · 2.',
        explanation: 'a = (11 - 7) / (4 - 2) = 2. Az f(2) = 2 · 2 + b = 7 egyenletből 4 + b = 7 => b = 3.'
      },
      {
        id: 'g8-fg-l3-q10',
        question: 'Melyik állítás IGAZ az f(x) = -(x - 2)² + 3 másodfokú függvényről?',
        options: [
          'Lefelé nyíló parabola, csúcspontja (maximuma) a (2; 3) pontban van',
          'Felfelé nyíló parabola, csúcspontja a (-2; 3) pontban van',
          'Origón átmenő egyenes vonal',
          'Minden értéke pozitív'
        ],
        correctAnswer: 0,
        hint: 'A negatív előjel a zárójel előtt lefelé fordítja a parabolát; a csúcspont koordinátái (u; v) a -(x - u)² + v alakból olvashatók le.',
        explanation: 'A -(x - 2)² + 3 alakú parabola a negatív szorzó miatt lefelé nyílik, így maximuma van, amelynek helye x = 2 és maximális értéke y = 3, csúcspontja: (2; 3).'
      }
    ]
  }
};

export const FunctionsGraphsQuiz: React.FC<FunctionsGraphsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Hozzárendelések és Grafikonjaik Kvíz"
      subtitle="Gyakorold a lineáris függvények, meredekség, tengelymetszet, zérushely és nevezetes görbék feladatait 3 nehézségi szinten!"
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicId="g8-func-graphs"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a hozzárendelési szabályokat, meredekségeket, zérushelyeket és nevezetes görbéket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-500" />,
          levels: {
            1: {
              title: '1. Szint: Képletek, Meredekség és Tengelymetszet',
              subtitle: 'Párosítsd a lineáris függvények hozzárendelési szabályát a megfelelő tulajdonságaikkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Meredekség & Metszet'
            },
            2: {
              title: '2. Szint: Zérushelyek Számítása',
              subtitle: 'Határozd meg, hol metszi a függvény grafikonja az x-tengelyt (f(x) = 0)!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Zérushelyek'
            },
            3: {
              title: '3. Szint: Párhuzamosság, Pontilleszkedés és Görbék',
              subtitle: 'Párosítsd az egyenespárok kapcsolatát, a pontok illeszkedését és a nevezetes görbéket!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Görbék & Párhuzamosak'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <FunctionsGraphsMatcher
              key={`fg-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a függvényeket menetirány, zérushely és görbetípus szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-blue-500" />,
          levels: {
            1: {
              title: '1. Szint: Függvények Monotonitása és Menetiránya',
              subtitle: 'Csoportosítsd a függvényeket a meredekségük előjele szerint: növekvő, csökkenő vagy konstans!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Monotonitás'
            },
            2: {
              title: '2. Szint: Zérushelyek és Metszéspontok',
              subtitle: 'Határozd meg, hogy az f(x) = 0 egyenlet megoldása pozitív, negatív vagy origó/nincs!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Zérushely előjele'
            },
            3: {
              title: '3. Szint: Grafikon- és Görbetípusok Besorolása',
              subtitle: 'Sorold be a függvényeket egyenes, parabola vagy abszolútérték alakzat szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Görbetípusok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <FunctionsGraphsSorter
              key={`fg-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default FunctionsGraphsQuiz;
