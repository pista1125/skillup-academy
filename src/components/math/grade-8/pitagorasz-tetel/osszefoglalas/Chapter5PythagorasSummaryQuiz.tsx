import React from 'react';
import {
  QuizTemplate,
  LevelConfig,
  CheatSheetCard
} from '../QuizTemplate';
import {
  Award,
  Box,
  Compass,
  Layers,
  Shapes,
  Triangle,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { Chapter5PythagorasSummaryMatcher } from './Chapter5PythagorasSummaryMatcher';
import { Chapter5PythagorasSummarySorter } from './Chapter5PythagorasSummarySorter';

interface Chapter5PythagorasSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Pitagorasz-tétel és Megfordítása',
    badge: 'Alaptörvények',
    badgeColor: 'amber',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
          <strong>Alaptétel:</strong> a² + b² = c² (derékszögű háromszögben).
        </div>
        <div className="p-2 rounded-lg bg-orange-50 text-orange-900 border border-orange-200">
          <strong>Megfordítás:</strong> c² = a² + b² ⟺ derékszögű, c² &lt; a²+b² ⟺ hegyesszögű, c² &gt; a²+b² ⟺ tompaszögű.
        </div>
      </div>
    )
  },
  {
    title: 'Síkbeli és Nevezetes Képletek',
    badge: 'Síkgeometria',
    badgeColor: 'orange',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-orange-50 text-orange-900 border border-orange-200">
          <strong>Négyzet átlója:</strong> d = a√2 &nbsp;|&nbsp; <strong>Szabályos 3szög magassága:</strong> m = a√3 / 2
        </div>
        <div className="p-2 rounded-lg bg-yellow-50 text-yellow-900 border border-yellow-200">
          <strong>30°-60°-90°:</strong> a = c / 2 (fele!), b = a√3 &nbsp;|&nbsp; <strong>45°-45°-90°:</strong> c = a√2
        </div>
      </div>
    )
  },
  {
    title: 'Térbeli Testátlók és Gúlák',
    badge: 'Térgeometria',
    badgeColor: 'rose',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
          <strong>Kocka testátlója:</strong> D = a√3 &nbsp;|&nbsp; Lapátlója: d = a√2
        </div>
        <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
          <strong>Téglatest testátlója:</strong> D = √(a² + b² + c²)
        </div>
      </div>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak, Alaptétel és Egyszerű Számítások',
    subtitle: '30 feladat a tétel alapegyenletéről, számhármasokról, megfordításról és alapvető síkidomokról',
    badgeText: '1. Szint • Alapozó',
    badgeColor: 'amber',
    icon: <Triangle className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'A Pitagorasz-tétel alapegyenlete',
        question: 'Melyik egyenlet fejezi ki helyesen a Pitagorasz-tételt, ha a és b a befogók, c pedig az átfogó?',
        options: ['a² + b² = c²', 'a + b = c', 'a² + c² = b²', 'a · b = c²'],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel szerint a befogók négyzetösszege egyenlő az átfogó négyzetével: a² + b² = c².'
      },
      {
        id: 'q1-2',
        title: 'Átfogó fogalma',
        question: 'Mi a derékszögű háromszög átfogója?',
        options: ['A derékszöggel szemközti, leghosszabb oldal', 'A derékszöget közrefogó két oldal egyike', 'A legrövidebb oldal', 'A magasságvonal'],
        correctAnswer: 0,
        explanation: 'Az átfogó a derékszögű háromszög derékszöggel szemközti, leghosszabb oldala (c).'
      },
      {
        id: 'q1-3',
        title: 'Befogók fogalma',
        question: 'Hogyan nevezzük a derékszögű háromszögben a derékszöget bezáró két oldalt?',
        options: ['Befogók', 'Átfogók', 'Középvonalak', 'Húrok'],
        correctAnswer: 0,
        explanation: 'A derékszöget közrefogó két oldalt befogóknak nevezzük (a és b).'
      },
      {
        id: 'q1-4',
        title: 'Átfogó kiszámítása (3 és 4)',
        question: 'Egy derékszögű háromszög befogói a = 3 cm és b = 4 cm. Mekkora az átfogó (c)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,65 110,65 30,20" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />
            <rect x="30" y="55" width="10" height="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <circle cx="35" cy="60" r="1" fill="#d97706" />
            <text x="70" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">4 cm</text>
            <text x="22" y="45" className="text-[8px] font-bold fill-slate-700">3</text>
            <text x="75" y="38" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-700">c = ?</text>
          </svg>
        ),
        options: ['5 cm', '7 cm', '6 cm', '25 cm'],
        correctAnswer: 0,
        explanation: 'c = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.'
      },
      {
        id: 'q1-5',
        title: 'Befogó kiszámítása (10 és 6)',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm, egyik befogója a = 6 cm. Mekkora a másik befogó (b)?',
        options: ['8 cm', '4 cm', '16 cm', '64 cm'],
        correctAnswer: 0,
        explanation: 'b = √(c² - a²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'q1-6',
        title: 'Pitagoraszi számhármas definíciója',
        question: 'Mit nevezünk pitagoraszi számhármasnak?',
        options: [
          'Három olyan pozitív egész számot, amelyekre a² + b² = c²',
          'Bármely három egymást követő egész számot',
          'Három prímszám összegét',
          'A háromszög belső szögeinek fokait'
        ],
        correctAnswer: 0,
        explanation: 'Pitagoraszi számhármasnak három olyan pozitív egész számot nevezünk, amelyek kielégítik az a² + b² = c² egyenlőséget.'
      },
      {
        id: 'q1-7',
        title: 'Pitagoraszi számhármas felismerése',
        question: 'Melyik számhármas pitagoraszi számhármas az alábbiak közül?',
        options: ['5, 12, 13', '4, 5, 6', '6, 7, 8', '2, 3, 4'],
        correctAnswer: 0,
        explanation: '5² + 12² = 25 + 144 = 169 = 13².'
      },
      {
        id: 'q1-8',
        title: 'Nem pitagoraszi számhármas',
        question: 'Melyik számhármas NEM pitagoraszi számhármas?',
        options: ['4, 5, 6', '3, 4, 5', '6, 8, 10', '5, 12, 13'],
        correctAnswer: 0,
        explanation: '4² + 5² = 16 + 25 = 41 ≠ 6² (36).'
      },
      {
        id: 'q1-9',
        title: 'Átfogó számítása (5 és 12)',
        question: 'Egy derékszögű háromszög befogói 5 cm és 12 cm. Mekkora az átfogó?',
        options: ['13 cm', '17 cm', '15 cm', '14 cm'],
        correctAnswer: 0,
        explanation: 'c = √(25 + 144) = √169 = 13 cm.'
      },
      {
        id: 'q1-10',
        title: 'Befogó számítása (15 és 9)',
        question: 'Egy derékszögű háromszög átfogója 15 cm, egyik befogója 9 cm. Mekkora a másik befogó?',
        options: ['12 cm', '6 cm', '10 cm', '14 cm'],
        correctAnswer: 0,
        explanation: 'a = √(15² - 9²) = √(225 - 81) = √144 = 12 cm.'
      },
      {
        id: 'q1-11',
        title: 'Négyzet átlója alapszabály',
        question: 'Egy a = 6 cm oldalú négyzet átlója pontosan mekkora?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="35,65 95,65 95,15 35,15" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
            <line x1="35" y1="65" x2="95" y2="15" stroke="#d97706" strokeWidth="1.8" />
            <text x="65" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">6 cm</text>
            <text x="60" y="36" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-700">d = ?</text>
          </svg>
        ),
        options: ['6√2 cm (≈ 8,49 cm)', '12 cm', '6√3 cm', '36 cm'],
        correctAnswer: 0,
        explanation: 'A négyzet átlója d = a√2 = 6√2 cm.'
      },
      {
        id: 'q1-12',
        title: 'Téglalap átlója (8 és 15)',
        question: 'Egy téglalap oldalai a = 8 cm és b = 15 cm. Milyen hosszú az átlója?',
        options: ['17 cm', '23 cm', '19 cm', '16 cm'],
        correctAnswer: 0,
        explanation: 'd = √(8² + 15²) = √(64 + 225) = √289 = 17 cm.'
      },
      {
        id: 'q1-13',
        title: 'Egyiptomi 12 csomós zsinór',
        question: 'Milyen arányban osztották fel a 12 csomós kötelet az ókori egyiptomiak a derékszög kiméréséhez?',
        options: ['3 : 4 : 5 arányban', '4 : 4 : 4 arányban', '2 : 4 : 6 arányban', '1 : 2 : 3 arányban'],
        correctAnswer: 0,
        explanation: '3 + 4 + 5 = 12 szakasz, és 3² + 4² = 5², így pontos derékszög keletkezett.'
      },
      {
        id: 'q1-14',
        title: 'A megfordítás lényege',
        question: 'Mit mond ki a Pitagorasz-tétel megfordítása?',
        options: [
          'Ha egy háromszög oldalaira a² + b² = c² teljesül, akkor a háromszög derékszögű',
          'Minden háromszög átfogója c = a + b',
          'A derékszögű háromszög szögei egyenlők',
          'Ha a háromszög derékszögű, akkor egyenlő szárú is'
        ],
        correctAnswer: 0,
        explanation: 'A megfordítás az oldalak négyzetösszegéből következtet a derékszög meglétére.'
      },
      {
        id: 'q1-15',
        title: 'Derékszögűség ellenőrzése (6, 8, 10)',
        question: 'Derékszögű-e az a háromszög, amelynek oldalai 6 cm, 8 cm és 10 cm?',
        options: [
          'Igen, mert 6² + 8² = 36 + 64 = 100 = 10²',
          'Nem, mert 6 + 8 ≠ 10',
          'Csak akkor, ha egyenlő szárú',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        explanation: 'A 6-8-10 a 3-4-5 kétszerese, pontosan teljesül az a² + b² = c².'
      },
      {
        id: 'q1-16',
        title: 'Hegyesszögűség ellenőrzése (5, 6, 7)',
        question: 'Egy háromszög oldalai 5 cm, 6 cm és 7 cm. Milyen típusú a háromszög?',
        options: [
          'Hegyesszögű, mert 7² = 49 < 5² + 6² = 61',
          'Derékszögű, mert 49 = 61',
          'Tompaszögű, mert 49 > 61',
          'Nem alkot háromszöget'
        ],
        correctAnswer: 0,
        explanation: 'Mivel c² < a² + b² (49 < 61), a háromszög hegyesszögű.'
      },
      {
        id: 'q1-17',
        title: 'Tompaszögűség ellenőrzése (3, 5, 7)',
        question: 'Egy háromszög oldalai 3 cm, 5 cm és 7 cm. Milyen típusú a háromszög?',
        options: [
          'Tompaszögű, mert 7² = 49 > 3² + 5² = 34',
          'Derékszögű, mert 3 + 5 > 7',
          'Hegyesszögű, mert 49 < 34',
          'Egyenlő szárú'
        ],
        correctAnswer: 0,
        explanation: 'Mivel c² > a² + b² (49 > 34), a háromszög tompaszögű.'
      },
      {
        id: 'q1-18',
        title: 'Zárójelezés számológépben',
        question: 'Miért kell zárójelbe tenni az összeget a számológépben: √(a² + b²)?',
        options: [
          'Különben a számológép csak az első tagból vonna gyököt (műveleti sorrend)',
          'Nem szükséges zárójel, a gép automatikusan tudja',
          'Mert a gyökvonás mindig megelőzi a négyzetre emelést',
          'Csak negatív számoknál kell zárójel'
        ],
        correctAnswer: 0,
        explanation: 'Zárójel nélkül a gép a √a² műveletet végezné el, majd hozzáadná b²-et.'
      },
      {
        id: 'q1-19',
        title: 'Négyzetre emelés billentyű',
        question: 'Melyik billentyű emeli négyzetre a számot a tudományos számológépen?',
        options: ['x²', '√x', 'EXP', 'log'],
        correctAnswer: 0,
        explanation: 'Az x² (vagy ^2) végzi a négyzetre emelést.'
      },
      {
        id: 'q1-20',
        title: '30°-os aranyszabály',
        question: 'Egy 30°-60°-90° háromszögben hogyan viszonyul a 30°-os szöggel szemközti befogó az átfogóhoz?',
        options: [
          'Pontosan a fele az átfogónak (a = c / 2)',
          'Egyenlő az átfogóval',
          '√3-szorosa az átfogónak',
          'Harmada az átfogónak'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög feléből következik: a = c / 2.'
      },
      {
        id: 'q1-21',
        title: 'Félszabályos oldal (c = 10)',
        question: 'Egy 30°-60°-90° háromszög átfogója c = 10 cm. Mekkora a 30°-kal szemközti befogó?',
        options: ['5 cm', '10√3 cm', '5√3 cm', '2,5 cm'],
        correctAnswer: 0,
        explanation: 'a = c / 2 = 10 / 2 = 5 cm.'
      },
      {
        id: 'q1-22',
        title: '45°-45°-90° átfogója',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói 7 cm hosszúak. Mekkora az átfogó?',
        options: ['7√2 cm (≈ 9,90 cm)', '14 cm', '7√3 cm', '10 cm'],
        correctAnswer: 0,
        explanation: 'c = a√2 = 7√2 cm.'
      },
      {
        id: 'q1-23',
        title: 'Négyzet területe átlóból',
        question: 'Egy négyzet átlója d = 8 cm. Mekkora a területe?',
        options: ['32 cm²', '64 cm²', '16 cm²', '16√2 cm²'],
        correctAnswer: 0,
        explanation: 'T = d² / 2 = 8² / 2 = 64 / 2 = 32 cm².'
      },
      {
        id: 'q1-24',
        title: 'Területi modell',
        question: 'A derékszögű háromszög befogóira emelt négyzetek területe 16 cm² és 9 cm². Mekkora az átfogóra emelt négyzet területe?',
        options: ['25 cm²', '7 cm²', '144 cm²', '50 cm²'],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel geometriai jelentése szerint T_c = T_a + T_b = 16 + 9 = 25 cm².'
      },
      {
        id: 'q1-25',
        title: 'Befogó számítása (25 és 7)',
        question: 'Egy derékszögű háromszög átfogója c = 25 cm, egyik befogója a = 7 cm. Mekkora a másik befogó?',
        options: ['24 cm', '18 cm', '20 cm', '22 cm'],
        correctAnswer: 0,
        explanation: 'b = √(25² - 7²) = √(625 - 49) = √576 = 24 cm.'
      },
      {
        id: 'q1-26',
        title: 'Thálész-tétel jelentősége',
        question: 'Mekkora a kör átmérője fölé írt kerületi szög nagysága Thálész tétele szerint?',
        options: ['Mindig pontosan 90° (derékszög)', 'Mindig 60°', 'Mindig 45°', 'Attól függ, mekkora a sugár'],
        correctAnswer: 0,
        explanation: 'A Thálész-tétel szerint a kör átmérőjének két végpontjából a körív bármely pontjához húzott szakaszok 90°-os szöget zárnak be.'
      },
      {
        id: 'q1-27',
        title: 'Leghosszabb oldal',
        question: 'Lehet-e a derékszögű háromszögben valamelyik befogó hosszabb, mint az átfogó?',
        options: [
          'Soha, az átfogó mindig szigorúan a leghosszabb oldal',
          'Igen, ha a háromszög tompaszögű',
          'Csak akkor, ha a befogó nagyobb mint 10 cm',
          'Igen, egyenlő szárú esetben'
        ],
        correctAnswer: 0,
        explanation: 'A háromszögben a legnagyobb szöggel (90°) szemben fekszik a leghosszabb oldal (az átfogó).'
      },
      {
        id: 'q1-28',
        title: 'Gyökbecslés négyzetszámokkal',
        question: 'Melyik két szomszédos egész szám közé esik a √50 értéke?',
        options: ['7 és 8 közé (mert 49 < 50 < 64)', '6 és 7 közé', '5 és 6 közé', '8 és 9 közé'],
        correctAnswer: 0,
        explanation: '49 < 50 < 64 ⟹ √49 < √50 < √64 ⟹ 7 < √50 < 8.'
      },
      {
        id: 'q1-29',
        title: 'Négyzetösszegből átfogó',
        question: 'Egy derékszögű háromszög befogóinak négyzete 36 és 64. Mekkora az átfogója?',
        options: ['10 cm', '100 cm', '14 cm', '50 cm'],
        correctAnswer: 0,
        explanation: 'c² = 36 + 64 = 100 ⟹ c = √100 = 10 cm.'
      },
      {
        id: 'q1-30',
        title: 'Egységnyi derékszögű háromszög',
        question: 'Egy derékszögű háromszög befogói 1 cm és 1 cm. Mekkora az átfogó pontos értéke?',
        options: ['√2 cm (≈ 1,414 cm)', '2 cm', '1 cm', '√3 cm'],
        correctAnswer: 0,
        explanation: 'c = √(1² + 1²) = √2 cm.'
      }
    ]
  },
  2: {
    title: '2. Szint: Síkgeometria, Nevezetes Háromszögek és Területszámítás',
    subtitle: '30 feladat szabályos és egyenlő szárú háromszögekről, rombuszról, trapézról, körről és koordinátákról',
    badgeText: '2. Szint • Haladó',
    badgeColor: 'orange',
    icon: <Shapes className="w-4 h-4 text-orange-600" />,
    questions: [
      {
        id: 'q2-1',
        title: 'Egyenlő szárú háromszög magassága',
        question: 'Egy egyenlő szárú háromszög alapja a = 12 cm, szárai b = 10 cm hosszúak. Mekkora az alaphoz tartozó magasság (m)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="80,15 30,68 130,68" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <line x1="80" y1="15" x2="80" y2="68" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="86" y="44" className="text-[8px] font-bold fill-orange-700">m = ?</text>
            <text x="48" y="38" className="text-[8px] font-bold fill-slate-700">10</text>
            <text x="80" y="77" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">12 cm</text>
          </svg>
        ),
        options: ['8 cm', '6 cm', '4 cm', '9 cm'],
        correctAnswer: 0,
        explanation: 'A magasság felezi az alapot: a/2 = 6 cm. m = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'q2-2',
        title: 'Egyenlő szárú háromszög területe',
        question: 'Egy egyenlő szárú háromszög alapja a = 16 cm, szárai b = 10 cm-esek. Mekkora a területe?',
        options: ['48 cm²', '96 cm²', '80 cm²', '64 cm²'],
        correctAnswer: 0,
        explanation: 'Fél alap = 8 cm. Magasság: m = √(100 - 64) = 6 cm. Terület: T = (16 · 6) / 2 = 48 cm².'
      },
      {
        id: 'q2-3',
        title: 'Szabályos háromszög magassága',
        question: 'Egy a = 8 cm oldalú szabályos (egyenlő oldalú) háromszög magassága pontosan mekkora?',
        options: ['4√3 cm (≈ 6,93 cm)', '4 cm', '8√3 cm', '4√2 cm'],
        correctAnswer: 0,
        explanation: 'm = (a/2) · √3 = 4√3 cm.'
      },
      {
        id: 'q2-4',
        title: 'Szabályos háromszög területe',
        question: 'Egy szabályos háromszög oldala a = 6 cm. Mennyi a pontos területe?',
        options: ['9√3 cm² (≈ 15,59 cm²)', '18 cm²', '18√3 cm²', '36 cm²'],
        correctAnswer: 0,
        explanation: 'T = a²√3 / 4 = 36√3 / 4 = 9√3 cm².'
      },
      {
        id: 'q2-5',
        title: 'Rombusz oldala az átlókból',
        question: 'Egy rombusz átlói e = 10 cm és f = 24 cm. Milyen hosszú a rombusz oldala (a)?',
        options: ['13 cm', '26 cm', '17 cm', '12 cm'],
        correctAnswer: 0,
        explanation: 'A rombusz átlói felezik egymást és merőlegesek. Félátlók: 5 cm és 12 cm. Oldal: a = √(5² + 12²) = 13 cm.'
      },
      {
        id: 'q2-6',
        title: 'Rombusz másik átlója és területe',
        question: 'Egy rombusz oldala a = 10 cm, egyik átlója e = 12 cm. Mekkora a területe?',
        options: ['96 cm²', '192 cm²', '60 cm²', '120 cm²'],
        correctAnswer: 0,
        explanation: 'Félátló: 6 cm. Másik félátló: √(100 - 36) = 8 cm ⟹ f = 16 cm. T = (12 · 16) / 2 = 96 cm².'
      },
      {
        id: 'q2-7',
        title: 'Szimmetrikus trapéz magassága',
        question: 'Egy szimmetrikus trapéz alapjai a = 14 cm és c = 6 cm, szárai b = 5 cm hosszúak. Mekkora a trapéz magassága (m)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,65 135,65 105,25 55,25" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <line x1="55" y1="25" x2="55" y2="65" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="59" y="47" className="text-[7.5px] font-bold fill-orange-700">m = ?</text>
            <text x="33" y="42" className="text-[7.5px] font-bold fill-slate-700">5</text>
            <text x="80" y="21" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">6 cm</text>
            <text x="80" y="75" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">14 cm</text>
          </svg>
        ),
        options: ['3 cm', '4 cm', '2 cm', '5 cm'],
        correctAnswer: 0,
        explanation: 'A levágott szakasz x = (14 - 6) / 2 = 4 cm. m = √(5² - 4²) = √(25 - 16) = √9 = 3 cm.'
      },
      {
        id: 'q2-8',
        title: 'Szimmetrikus trapéz területe',
        question: 'Egy szimmetrikus trapéz alapjai 20 cm és 8 cm, szárai 10 cm-esek. Mekkora a területe?',
        options: ['112 cm²', '224 cm²', '140 cm²', '96 cm²'],
        correctAnswer: 0,
        explanation: 'x = (20 - 8)/2 = 6 cm. m = √(100 - 36) = 8 cm. T = ((20 + 8) / 2) · 8 = 14 · 8 = 112 cm².'
      },
      {
        id: 'q2-9',
        title: 'Deltoid oldalainak keresése',
        question: 'Egy deltoid szimmetriaátlója a másik 16 cm-es átlót két egyenlő 8 cm-es részre osztja, a szimmetriaátló részei pedig 6 cm és 15 cm. Mekkorák a deltoid oldalai?',
        options: ['10 cm és 17 cm', '8 cm és 15 cm', '10 cm és 15 cm', '12 cm és 17 cm'],
        correctAnswer: 0,
        explanation: 'Rövidebb oldal: √(8² + 6²) = √100 = 10 cm. Hosszabb oldal: √(8² + 15²) = √289 = 17 cm.'
      },
      {
        id: 'q2-10',
        title: '45°-45°-90° átfogóból befogó',
        question: 'Egy 45°-45°-90° háromszög átfogója c = 12 cm. Mekkora a befogója (a)?',
        options: ['6√2 cm (≈ 8,49 cm)', '6 cm', '12√2 cm', '8 cm'],
        correctAnswer: 0,
        explanation: 'a = c / √2 = (12 · √2) / 2 = 6√2 cm.'
      },
      {
        id: 'q2-11',
        title: '30°-60°-90° oldalai (a = 6)',
        question: 'Egy 30°-60°-90° háromszög 30°-kal szemközti befogója a = 6 cm. Mekkora a hosszabbik befogó (b) és az átfogó (c)?',
        options: ['b = 6√3 cm és c = 12 cm', 'b = 12 cm és c = 6√3 cm', 'b = 6√2 cm és c = 12 cm', 'b = 9 cm és c = 12 cm'],
        correctAnswer: 0,
        explanation: 'c = 2a = 12 cm, b = a√3 = 6√3 cm.'
      },
      {
        id: 'q2-12',
        title: '30°-60°-90° visszafelé számolva',
        question: 'Egy 30°-60°-90° háromszög hosszabbik befogója b = 8√3 cm. Mekkora a rövid befogó és az átfogó?',
        options: ['a = 8 cm és c = 16 cm', 'a = 4 cm és c = 8 cm', 'a = 8 cm és c = 12 cm', 'a = 16 cm és c = 32 cm'],
        correctAnswer: 0,
        explanation: 'a = b / √3 = 8 cm, c = 2a = 16 cm.'
      },
      {
        id: 'q2-13',
        title: 'Szabályos háromszög oldala magasságból',
        question: 'Egy szabályos háromszög magassága m = 5√3 cm. Mennyi a háromszög oldala (a)?',
        options: ['10 cm', '5 cm', '15 cm', '20 cm'],
        correctAnswer: 0,
        explanation: 'm = (a/2)√3 = 5√3 ⟹ a/2 = 5 ⟹ a = 10 cm.'
      },
      {
        id: 'q2-14',
        title: 'Négyzet átlója és területe kerületből',
        question: 'Egy négyzet kerülete K = 40 cm. Mekkora az átlója és területe?',
        options: ['d = 10√2 cm és T = 100 cm²', 'd = 10 cm és T = 100 cm²', 'd = 20 cm és T = 200 cm²', 'd = 10√3 cm és T = 100 cm²'],
        correctAnswer: 0,
        explanation: 'Oldal a = 40 / 4 = 10 cm ⟹ d = 10√2 cm, T = 10² = 100 cm².'
      },
      {
        id: 'q2-15',
        title: 'Pontok távolsága a koordináta-rendszerben',
        question: 'Mekkora az A(1; 2) és B(4; 6) pontok távolsága a derékszögű koordináta-rendszerben?',
        options: ['5 egység', '7 egység', '25 egység', '√7 egység'],
        correctAnswer: 0,
        explanation: 'Δx = 4 - 1 = 3, Δy = 6 - 2 = 4. Távolság: d = √(3² + 4²) = √25 = 5.'
      },
      {
        id: 'q2-16',
        title: 'Szögvizsgálat (8, 15, 18)',
        question: 'Egy háromszög oldalai 8 cm, 15 cm és 18 cm. Milyen a háromszög a legnagyobb szöge szerint?',
        options: [
          'Tompaszögű, mert 18² = 324 > 8² + 15² = 289',
          'Derékszögű, mert 324 = 289',
          'Hegyesszögű, mert 324 < 289',
          'Nem háromszög'
        ],
        correctAnswer: 0,
        explanation: 'c² > a² + b² (324 > 289) ⟹ tompaszögű.'
      },
      {
        id: 'q2-17',
        title: 'Szögvizsgálat (11, 13, 16)',
        question: 'Egy háromszög oldalai 11 cm, 13 cm és 16 cm. Milyen a háromszög a legnagyobb szöge szerint?',
        options: [
          'Hegyesszögű, mert 16² = 256 < 11² + 13² = 290',
          'Tompaszögű, mert 256 > 290',
          'Derékszögű, mert 256 = 290',
          'Egyenlő szárú'
        ],
        correctAnswer: 0,
        explanation: 'c² < a² + b² (256 < 290) ⟹ hegyesszögű.'
      },
      {
        id: 'q2-18',
        title: 'Theodórosz-spirál átfogói',
        question: 'A Theodórosz-spirálban (1-1-es befogójú induló háromszögből) milyen hosszúságúak a háromszögek átfogói sorban?',
        options: ['√2, √3, √4 = 2, √5, √6, ...', '2, 3, 4, 5, 6, ...', '√2, √4, √6, √8, ...', '1, 2, 4, 8, 16, ...'],
        correctAnswer: 0,
        explanation: 'Minden lépésben c² = (√n)² + 1² = n + 1 ⟹ c = √(n + 1).'
      },
      {
        id: 'q2-19',
        title: 'Theodórosz-spirál egész átfogója',
        question: 'A Theodórosz-spirál hanyadik háromszögének átfogója lesz pontosan 3 egység hosszú?',
        options: ['A 8. háromszögé (mert √9 = 3)', 'A 3. háromszögé', 'A 9. háromszögé', 'A 6. háromszögé'],
        correctAnswer: 0,
        explanation: 'Az 1. háromszög átfogója √2, az n-edik háromszögé √(n+1). √(8+1) = √9 = 3.'
      },
      {
        id: 'q2-20',
        title: 'Kör húrjának távolsága a középponttól',
        question: 'Egy r = 13 cm sugarú körben egy húr hossza 24 cm. Milyen távol van a húr a kör középpontjától?',
        options: ['5 cm', '10 cm', '12 cm', '11 cm'],
        correctAnswer: 0,
        explanation: 'A középpontból a húrra bocsátott merőleges felezi a húrt: 24 / 2 = 12 cm. Távolság: d = √(13² - 12²) = √(169 - 144) = √25 = 5 cm.'
      },
      {
        id: 'q2-21',
        title: 'Kör érintőszakasza',
        question: 'Egy r = 8 cm sugarú kör középpontjától 17 cm távolságra lévő P pontból érintőt húzunk a körhöz. Milyen hosszú az érintőszakasz?',
        options: ['15 cm', '9 cm', '25 cm', '12 cm'],
        correctAnswer: 0,
        explanation: 'Az érintési pontba húzott sugár merőleges az érintőre: érintőszakasz = √(17² - 8²) = √(289 - 64) = √225 = 15 cm.'
      },
      {
        id: 'q2-22',
        title: 'Kocka lapátlója',
        question: 'Egy a = 7 cm élű kocka lapátlója (d) mekkora?',
        options: ['7√2 cm (≈ 9,90 cm)', '7√3 cm', '14 cm', '49 cm'],
        correctAnswer: 0,
        explanation: 'A lapátló a négyzet alakú határolólap átlója: d = a√2 = 7√2 cm.'
      },
      {
        id: 'q2-23',
        title: 'Kocka testátlója',
        question: 'Egy a = 4 cm élű kocka testátlója (D) pontosan mekkora?',
        options: ['4√3 cm (≈ 6,93 cm)', '4√2 cm', '8 cm', '12 cm'],
        correctAnswer: 0,
        explanation: 'A kocka testátlója D = a√3 = 4√3 cm.'
      },
      {
        id: 'q2-24',
        title: 'Téglatest testátlója (1, 2, 2)',
        question: 'Egy téglatest élei 1 cm, 2 cm és 2 cm. Mekkora a testátlója (D)?',
        options: ['3 cm', '5 cm', '9 cm', '√5 cm'],
        correctAnswer: 0,
        explanation: 'D = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3 cm.'
      },
      {
        id: 'q2-25',
        title: 'Téglatest testátlója (2, 3, 6)',
        question: 'Egy téglatest élei 2 cm, 3 cm és 6 cm. Mekkora a testátlója?',
        options: ['7 cm', '11 cm', '49 cm', '√11 cm'],
        correctAnswer: 0,
        explanation: 'D = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7 cm.'
      },
      {
        id: 'q2-26',
        title: 'Létrás feladat',
        question: 'Egy 5 m hosszú támasztólétra alja 3 m-re van a függőleges fal tövétől. Milyen magasan éri el a falat?',
        options: ['4 m', '2 m', '4,5 m', '3,5 m'],
        correctAnswer: 0,
        explanation: 'Magasság = √(5² - 3²) = √(25 - 9) = √16 = 4 m (3-4-5 háromszög).'
      },
      {
        id: 'q2-27',
        title: 'Számológépes beírás tizedesekkel',
        question: 'Ha a = 3,4 cm és b = 5,6 cm, hogyan kell helyesen kiszámolni az átfogót a számológépen?',
        options: ['√(3.4² + 5.6²)', '√3.4² + 5.6²', '3.4² + 5.6²', '(3.4 + 5.6) / 2'],
        correctAnswer: 0,
        explanation: 'Zárójelet kell tenni a gyökjel alatti összegre: √(3.4² + 5.6²).'
      },
      {
        id: 'q2-28',
        title: 'Gyökbecslés: √130',
        question: 'Melyik két szomszédos egész szám közé esik a √130?',
        options: ['11 és 12 közé (mert 121 < 130 < 144)', '12 és 13 közé', '10 és 11 közé', '13 és 14 közé'],
        correctAnswer: 0,
        explanation: '11² = 121 és 12² = 144. 121 < 130 < 144 ⟹ 11 < √130 < 12.'
      },
      {
        id: 'q2-29',
        title: 'Kerekítés két tizedesjegyre',
        question: 'A számológép kijelzőjén √75 = 8,660254... látható. Mennyi ez két tizedesjegyre kerekítve?',
        options: ['8,66', '8,67', '8,7', '8,660'],
        correctAnswer: 0,
        explanation: 'A harmadik tizedesjegy 0 (< 5), így lefelé kerekítünk: 8,66.'
      },
      {
        id: 'q2-30',
        title: 'Szabályos hatszög rövid átlója',
        question: 'Egy szabályos hatszög oldala a = 5 cm. Mennyi a rövidebb átlójának hossza?',
        options: ['5√3 cm (≈ 8,66 cm)', '10 cm', '5√2 cm', '15 cm'],
        correctAnswer: 0,
        explanation: 'A szabályos hatszög rövidebb átlója a szomszédos csúcsokat köti össze: d_rövid = a√3 = 5√3 cm.'
      }
    ]
  },
  3: {
    title: '3. Szint: Térbeli Alkalmazások, Összetett és Felvételi Feladványok',
    subtitle: '30 haladó feladat kockákról, gúlákról, trapézokról, körökről és életszerű szöveges modellekről',
    badgeText: '3. Szint • Mester',
    badgeColor: 'rose',
    icon: <Box className="w-4 h-4 text-rose-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'Kocka éle testátlóból',
        question: 'Egy kocka testátlója D = 6√3 cm. Mekkora a kocka éle (a)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="35,65 85,65 115,40 65,40" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="35,35 85,35 115,10 65,10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
            <line x1="35" y1="65" x2="35" y2="35" stroke="#94a3b8" strokeWidth="1" />
            <line x1="85" y1="65" x2="85" y2="35" stroke="#94a3b8" strokeWidth="1" />
            <line x1="115" y1="40" x2="115" y2="10" stroke="#94a3b8" strokeWidth="1" />
            <line x1="35" y1="65" x2="115" y2="10" stroke="#e11d48" strokeWidth="1.8" />
            <text x="60" y="75" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = ?</text>
            <text x="75" y="32" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">D = 6√3</text>
          </svg>
        ),
        options: ['6 cm', '18 cm', '6√2 cm', '2 cm'],
        correctAnswer: 0,
        explanation: 'Mivel D = a√3, ezért a = D / √3 = 6√3 / √3 = 6 cm.'
      },
      {
        id: 'q3-2',
        title: 'Kocka térfogata testátlóból',
        question: 'Egy kocka testátlója D = 4√3 cm. Mekkora a kocka térfogata (V)?',
        options: ['64 cm³', '16 cm³', '48 cm³', '192 cm³'],
        correctAnswer: 0,
        explanation: 'a = D / √3 = 4 cm. V = a³ = 4³ = 64 cm³.'
      },
      {
        id: 'q3-3',
        title: 'Kocka felszíne lapátlóból',
        question: 'Egy kocka lapátlója d = 6√2 cm. Mekkora a kocka teljes felszíne (A)?',
        options: ['216 cm²', '144 cm²', '36 cm²', '288 cm²'],
        correctAnswer: 0,
        explanation: 'd = a√2 ⟹ a = 6 cm. Felszín: A = 6 · a² = 6 · 36 = 216 cm².'
      },
      {
        id: 'q3-4',
        title: 'Téglatest élarányai',
        question: 'Egy téglatest éleinek aránya 1 : 2 : 2, testátlója D = 9 cm. Milyen hosszúak az élei?',
        options: ['3 cm, 6 cm és 6 cm', '1 cm, 2 cm és 2 cm', '2 cm, 4 cm és 4 cm', '4 cm, 8 cm és 8 cm'],
        correctAnswer: 0,
        explanation: 'Legyenek az élek x, 2x, 2x. D = √(x² + (2x)² + (2x)²) = √(9x²) = 3x = 9 ⟹ x = 3 cm. Élek: 3, 6, 6 cm.'
      },
      {
        id: 'q3-5',
        title: 'Téglatest hiányzó éle',
        question: 'Egy téglatest két éle a = 3 cm és b = 4 cm, testátlója D = 13 cm. Mekkora a harmadik él (c)?',
        options: ['12 cm', '6 cm', '10 cm', '144 cm'],
        correctAnswer: 0,
        explanation: 'D² = a² + b² + c² ⟹ 169 = 9 + 16 + c² ⟹ c² = 144 ⟹ c = 12 cm.'
      },
      {
        id: 'q3-6',
        title: 'Négyzetes gúla testmagassága',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 8 cm, oldaléle b = 9 cm. Mekkora a gúla testmagassága (M)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,65 95,65 125,45 60,45" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <line x1="77.5" y1="12" x2="77.5" y2="55" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="77.5" y1="12" x2="30" y2="65" stroke="#475569" strokeWidth="1.2" />
            <line x1="77.5" y1="12" x2="95" y2="65" stroke="#475569" strokeWidth="1.2" />
            <line x1="77.5" y1="12" x2="125" y2="45" stroke="#475569" strokeWidth="1.2" />
            <text x="82" y="36" className="text-[7.5px] font-bold fill-rose-700">M = ?</text>
            <text x="62" y="75" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = 8</text>
            <text x="50" y="32" className="text-[7.5px] font-bold fill-slate-700">b = 9</text>
          </svg>
        ),
        options: ['7 cm', '6 cm', '8 cm', '5 cm'],
        correctAnswer: 0,
        explanation: 'Az alap lapátlója d = 8√2 cm, fele: 4√2 cm. M = √(9² - (4√2)²) = √(81 - 32) = √49 = 7 cm.'
      },
      {
        id: 'q3-7',
        title: 'Négyzetes gúla oldallap magassága',
        question: 'Egy négyzet alapú gúla alapéle a = 12 cm, oldaléle b = 10 cm. Mekkora az oldallap magassága (m_oldal)?',
        options: ['8 cm', '6 cm', '4 cm', '9 cm'],
        correctAnswer: 0,
        explanation: 'Az oldallap egyenlő szárú háromszög: alapja 12 cm, fele 6 cm. m_oldal = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'q3-8',
        title: 'Gúla térfogatának kiszámítása',
        question: 'Egy négyzetes gúla alaplapjának területe 36 cm², testmagassága M = 4 cm. Mekkora a térfogata (V)?',
        options: ['48 cm³', '144 cm³', '72 cm³', '36 cm³'],
        correctAnswer: 0,
        explanation: 'V = (T_alap · M) / 3 = (36 · 4) / 3 = 48 cm³.'
      },
      {
        id: 'q3-9',
        title: 'Rombusz magassága',
        question: 'Egy rombusz átlói e = 12 cm és f = 16 cm. Mekkora a rombusz magassága (m)?',
        options: ['9,6 cm', '10 cm', '8 cm', '19,2 cm'],
        correctAnswer: 0,
        explanation: 'Rombusz oldala a = √(6² + 8²) = 10 cm. Területe T = (12 · 16)/2 = 96 cm². Mivel T = a · m, ezért m = 96 / 10 = 9,6 cm.'
      },
      {
        id: 'q3-10',
        title: 'Szimmetrikus trapéz átlója',
        question: 'Egy szimmetrikus trapéz alapjai 16 cm és 6 cm, magassága 12 cm. Milyen hosszú a trapéz átlója (d)?',
        options: ['√265 cm (≈ 16,28 cm)', '15 cm', '13 cm', '20 cm'],
        correctAnswer: 0,
        explanation: 'A magasságvonal által levágott nagyobbik alap-rész: x = (16 + 6) / 2 = 11 cm. d = √(11² + 12²) = √(121 + 144) = √265 cm.'
      },
      {
        id: 'q3-11',
        title: 'Derékszögű trapéz magassága',
        question: 'Egy derékszögű trapéz párhuzamos alapjai 11 cm és 7 cm, ferde szára 5 cm. Mekkora a trapéz magassága?',
        options: ['3 cm', '4 cm', '2 cm', '5 cm'],
        correctAnswer: 0,
        explanation: 'A ferde szár alatti szakasz: 11 - 7 = 4 cm. Magasság: m = √(5² - 4²) = √9 = 3 cm.'
      },
      {
        id: 'q3-12',
        title: 'Átfogóhoz tartozó magasság',
        question: 'Egy derékszögű háromszög befogói a = 15 cm és b = 20 cm. Mekkora az átfogóhoz tartozó magasság (m_c)?',
        options: ['12 cm', '10 cm', '14 cm', '25 cm'],
        correctAnswer: 0,
        explanation: 'Átfogó: c = √(15² + 20²) = 25 cm. Terület kétszerese: a · b = c · m_c ⟹ m_c = (15 · 20) / 25 = 300 / 25 = 12 cm.'
      },
      {
        id: 'q3-13',
        title: 'Magasságtétel derékszögű háromszögben',
        question: 'Egy derékszögű háromszög átfogóját a magasság 4 cm és 9 cm hosszúságú részekre (p és q) osztja. Mekkora a magasság (m)?',
        options: ['6 cm', '6,5 cm', '13 cm', '36 cm'],
        correctAnswer: 0,
        explanation: 'A magasságtétel szerint: m² = p · q = 4 · 9 = 36 ⟹ m = 6 cm.'
      },
      {
        id: 'q3-14',
        title: 'Befogótétel',
        question: 'Egy derékszögű háromszög átfogója c = 12 cm, a befogó átfogóra eső merőleges vetülete p = 3 cm. Mekkora a befogó (a)?',
        options: ['6 cm', '4 cm', '9 cm', '36 cm'],
        correctAnswer: 0,
        explanation: 'A befogótétel szerint: a² = c · p = 12 · 3 = 36 ⟹ a = 6 cm.'
      },
      {
        id: 'q3-15',
        title: 'Két párhuzamos húr távolsága',
        question: 'Egy r = 10 cm sugarú kör középpontjának két ellentétes oldalán fut két párhuzamos húr, hosszuk 16 cm és 12 cm. Milyen távol van egymástól a két húr?',
        options: ['14 cm', '2 cm', '10 cm', '15 cm'],
        correctAnswer: 0,
        explanation: '1. húr távolsága: √(10² - 8²) = 6 cm. 2. húr távolsága: √(10² - 6²) = 8 cm. Össztávolság: 6 + 8 = 14 cm.'
      },
      {
        id: 'q3-16',
        title: 'Szabályos hatszög területe',
        question: 'Egy szabályos hatszög oldala a = 8 cm. Mekkora a területe?',
        options: ['96√3 cm² (≈ 166,28 cm²)', '64√3 cm²', '192 cm²', '48√3 cm²'],
        correctAnswer: 0,
        explanation: 'A hatszög 6 szabályos háromszögből áll: T = 6 · (a²√3 / 4) = 6 · (64√3 / 4) = 6 · 16√3 = 96√3 cm².'
      },
      {
        id: 'q3-17',
        title: 'Elcsúszó támasztólétra feladat',
        question: 'Egy 10 m-es létra teteje 8 m magasan éri el a falat (talpa 6 m-re van). Ha a létra teteje lecsúszik 2 métert (6 m-re), mennyivel csúszik távolabb a talpa a faltól?',
        options: ['2 méterrel (8 méterre)', '1 méterrel', '4 méterrel', 'Nem csúszik el'],
        correctAnswer: 0,
        explanation: 'Új talptávolság: √(10² - 6²) = 8 m. Eredetileg 6 m volt, így 8 - 6 = 2 méterrel csúszott távolabb.'
      },
      {
        id: 'q3-18',
        title: 'Kidőlt fa feladat',
        question: 'Egy 16 méteres fa úgy tört el egy viharban, hogy a csúcsa a fa tövétől 8 méterre érte el a földet. Milyen magasan tört el a fa?',
        options: ['6 méter magasan', '8 méter magasan', '10 méter magasan', '4 méter magasan'],
        correctAnswer: 0,
        explanation: 'Ha a törés magassága x, akkor a kidőlt rész (átfogó) 16 - x. x² + 8² = (16 - x)² ⟹ x² + 64 = 256 - 32x + x² ⟹ 32x = 192 ⟹ x = 6 m.'
      },
      {
        id: 'q3-19',
        title: 'Két torony közötti kötél',
        question: 'Két torony magassága 20 m és 15 m, a két torony egymástól 12 m távolságra áll. Milyen hosszú a csúcsaik közé feszített egyenes kötél?',
        options: ['13 m', '17 m', '15 m', '25 m'],
        correctAnswer: 0,
        explanation: 'Magasságkülönbség: 20 - 15 = 5 m. Vízszintes távolság: 12 m. Kötél: √(12² + 5²) = √(144 + 25) = √169 = 13 m.'
      },
      {
        id: 'q3-20',
        title: 'Térképes távolság (Észak-Kelet)',
        question: 'Egy túrázó a táborból 8 km-t halad egyenesen Északra, majd 15 km-t Keletre. Milyen távol van légvonalban a tábortól?',
        options: ['17 km', '23 km', '19 km', '15 km'],
        correctAnswer: 0,
        explanation: 'Észak és Kelet derékszöget zár be: d = √(8² + 15²) = √(64 + 225) = √289 = 17 km.'
      },
      {
        id: 'q3-21',
        title: 'Kockába zárt leghosszabb pálca',
        question: 'Egy a = 10 cm élű kocka alakú dobozba milyen hosszú egyenes pálca fér el maximálisan?',
        options: ['10√3 cm (≈ 17,32 cm)', '10√2 cm', '10 cm', '20 cm'],
        correctAnswer: 0,
        explanation: 'A dobozban a leghosszabb távolság a testátló: D = a√3 = 10√3 cm ≈ 17,32 cm.'
      },
      {
        id: 'q3-22',
        title: 'Téglatest alakú csomagtartó',
        question: 'Egy csomagtartó méretei: 30 cm, 40 cm és 120 cm. Elfér-e benne egy 125 cm hosszú síléc egyenesen?',
        options: [
          'Igen, mert a testátló 130 cm (√(900 + 1600 + 14400) = √16900 = 130 cm)',
          'Nem, mert a leghosszabb él csak 120 cm',
          'Csak akkor, ha hajlítható',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        explanation: 'A testátló D = √(30² + 40² + 120²) = √16900 = 130 cm > 125 cm, így átlósan kényelmesen elfér.'
      },
      {
        id: 'q3-23',
        title: 'Szimmetrikus sátortető felülete',
        question: 'Egy 20 m hosszú épület szimmetrikus sátortetejének szélessége 12 m, a gerinc magassága 8 m. Mekkora a két tetősík együttes területe?',
        options: ['400 m²', '240 m²', '480 m²', '320 m²'],
        correctAnswer: 0,
        explanation: 'Fél szélesség: 6 m. Tetősík szélessége (átfogó): √(6² + 8²) = 10 m. Két téglalap területe: 2 · (10 · 20) = 400 m².'
      },
      {
        id: 'q3-24',
        title: '60°-os lejtő emelkedése',
        question: 'Egy 8 m hosszú rámpa 60°-os szöget zár be a vízszintes talajjal. Milyen magasra emelkedik a rámpa teteje?',
        options: ['4√3 m (≈ 6,93 m)', '4 m', '8√3 m', '6 m'],
        correctAnswer: 0,
        explanation: 'A 60°-os szöggel szemközti befogó: (8 / 2) · √3 = 4√3 m ≈ 6,93 m.'
      },
      {
        id: 'q3-25',
        title: '45°-os hegyoldal útja',
        question: 'Egy 45°-os lejtőn szeretnénk 100 méter függőleges szintkülönbséget leküzdeni. Milyen hosszú utat kell megtennünk a lejtőn?',
        options: ['100√2 m (≈ 141,42 m)', '100 m', '200 m', '100√3 m'],
        correctAnswer: 0,
        explanation: 'A lejtő az átfogó, a függőleges magasság a befogó: c = a√2 = 100√2 m ≈ 141,42 m.'
      },
      {
        id: 'q3-26',
        title: 'Derékszögű háromszög beírt köre',
        question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm (átfogója 10 cm). Mekkora a beírt kör sugara (r)?',
        options: ['2 cm', '3 cm', '4 cm', '1 cm'],
        correctAnswer: 0,
        explanation: 'Derékszögű háromszögben: r = (a + b - c) / 2 = (6 + 8 - 10) / 2 = 4 / 2 = 2 cm.'
      },
      {
        id: 'q3-27',
        title: 'Derékszögű háromszög körülírt köre',
        question: 'Egy derékszögű háromszög befogói 5 cm és 12 cm. Mekkora a körülírt kör sugara (R)?',
        options: ['6,5 cm', '13 cm', '5 cm', '8,5 cm'],
        correctAnswer: 0,
        explanation: 'Thálész tétele szerint az átfogó a kör átmérője: c = 13 cm ⟹ R = c / 2 = 6,5 cm.'
      },
      {
        id: 'q3-28',
        title: 'Két kör közös külső érintője',
        question: 'Két kör sugara r₁ = 8 cm és r₂ = 3 cm, középpontjaik távolsága d = 13 cm. Milyen hosszú a közös külső érintőszakasz?',
        options: ['12 cm', '10 cm', '15 cm', '11 cm'],
        correctAnswer: 0,
        explanation: 'A középpontok és az érintési sugarak derékszögű trapézt alkotnak. Érintőszakasz = √(13² - (8 - 3)²) = √(169 - 25) = √144 = 12 cm.'
      },
      {
        id: 'q3-29',
        title: 'Pitagorasz-egyenlet egymást követő számokkal',
        question: 'Egy derékszögű háromszög oldalai három egymást követő egész szám: x, x+1, x+2. Melyik számhármas ez?',
        options: ['3, 4, 5', '4, 5, 6', '5, 6, 7', '6, 7, 8'],
        correctAnswer: 0,
        explanation: 'x² + (x+1)² = (x+2)² ⟹ x² - 2x - 3 = 0 ⟹ (x-3)(x+1) = 0 ⟹ x = 3, így az oldalak: 3, 4, 5.'
      },
      {
        id: 'q3-30',
        title: 'A fejezet záró következtetése',
        question: 'Miért tekintik a Pitagorasz-tételt a geometria egyik legfontosabb összefüggésének?',
        options: [
          'Mert összekapcsolja a távolságot, a merőlegességet és a területet síkban és térben egyaránt',
          'Mert csak ezzel lehet háromszögeket rajzolni',
          'Mert minden sokszögre érvényes módosítás nélkül',
          'Mert kiváltja az összeadást'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel a távolságmérés, a merőlegesség és a térbeli koordináták abszolút matematikai alapköve.'
      }
    ]
  }
};

export const Chapter5PythagorasSummaryQuiz: React.FC<Chapter5PythagorasSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="V. Fejezet Témazáró Nagyteszt"
      subtitle="90 kérdéses átfogó vizsgateszt (3 szinten 30-30 feladat!), párosító és csoportosító játékkal"
      topicId="g8-pyth-summary"
      levels={levelsConfig}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapösszefüggések és Számítások',
              subtitle: 'Párosítsd a tételeket és számhármasokat a megoldásukkal!',
              rangeLabel: 'Párok száma:',
              range: '8 pár • Alapfogalmak',
              focus: 'Alaptételek és számhármasok'
            },
            2: {
              title: '2. Szint: Síkbeli és Nevezetes Háromszögek',
              subtitle: 'Párosítsd a síkgeometriai feladatokat az eredményükkel!',
              rangeLabel: 'Párok száma:',
              range: '8 pár • Síkgeometria',
              focus: 'Síkgeometria és arányok'
            },
            3: {
              title: '3. Szint: Térbeli Testátlók és Feladatok',
              subtitle: 'Párosítsd a térbeli és összetett feladatokat a pontos értékükkel!',
              rangeLabel: 'Párok száma:',
              range: '8 pár • Térbeli és felvételi',
              focus: 'Térbeli testek és alkalmazások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <Chapter5PythagorasSummaryMatcher
              key={`sum-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          label: 'Csoportosító',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Háromszögtípusok és Alaptételek',
              subtitle: 'Csoportosítsd: Derékszögű / Hegyesszögű / Tompaszögű!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Háromszögek szögtípusai'
            },
            2: {
              title: '2. Szint: Eredmények Számértéke és Típusa',
              subtitle: 'Döntsd el: Egész szám / √2-es érték / √3-as érték!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Számértékek formája'
            },
            3: {
              title: '3. Szint: Geometriai Állítások Igazságtartalma',
              subtitle: 'Csoportosítsd: Mindig igaz / Feltételes / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Tételek és állítások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <Chapter5PythagorasSummarySorter
              key={`sum-sorter-${level}`}
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
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default Chapter5PythagorasSummaryQuiz;
