import React from 'react';
import {
  QuizTemplate,
  LevelConfig,
  CheatSheetCard
} from '../QuizTemplate';
import {
  Calculator,
  Compass,
  Scissors,
  Award,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { CalculatorProjectMatcher } from './CalculatorProjectMatcher';
import { CalculatorProjectSorter } from './CalculatorProjectSorter';

interface CalculatorProjectQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Számológépes Beírás',
    badge: 'Műveleti sorrend',
    badgeColor: 'cyan',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-cyan-50 text-cyan-900 border border-cyan-200">
          <strong>Gyökjel alatti összeg:</strong> mindig tegyél zárójelet: <strong>√(a² + b²)</strong>
        </div>
        <div className="p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200">
          <strong>Befogó kivonása:</strong> b = <strong>√(c² - a²)</strong>
        </div>
      </div>
    )
  },
  {
    title: 'Kerekítés és Becslés',
    badge: 'Pontosság',
    badgeColor: 'sky',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200">
          <strong>Szomszédos négyzetszámok:</strong> pl. 49 &lt; 50 &lt; 64 ⟹ <strong>7 &lt; √50 &lt; 8</strong>
        </div>
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
          <strong>Kerekítés:</strong> csak a legvégén kerekíts, ne a részeredményeknél!
        </div>
      </div>
    )
  },
  {
    title: 'Theodórosz Spirálja',
    badge: 'Gyökcsiga',
    badgeColor: 'amber',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
          <strong>Lépésről lépésre:</strong> (√n)² + 1² = n + 1 ⟹ <strong>új átfogó = √(n+1)</strong>
        </div>
        <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
          <strong>Átfogók:</strong> √2, √3, √4=2, √5, √6, ..., √16=4, √17.
        </div>
      </div>
    )
  },
  {
    title: 'Projektmunka & Modellek',
    badge: 'Hajtogatás',
    badgeColor: 'rose',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
          <strong>Papírhajtogatás:</strong> (a+b)² nagy négyzetből 4 derékszögű háromszöget elvéve c² marad: <strong>a² + b² = c²</strong>.
        </div>
        <div className="p-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
          <strong>Közvetlen szerkesztés:</strong> √13 = √(2² + 3²), √17 = √(4² + 1²).
        </div>
      </div>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Számológép Használat és Műveleti Sorrend',
    subtitle: '10 alapfeladat a helyes beírásról, zárójelezésről és alapvető tizedes törtekről',
    badgeText: '1. Szint • Kezdő',
    badgeColor: 'cyan',
    icon: <Calculator className="w-4 h-4 text-cyan-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'Helyes zárójelezés gyökvonáskor',
        question: 'Hogyan kell helyesen beírni a számológépbe egy a = 4,2 cm és b = 7,5 cm befogójú háromszög átfogójának kiszámítását?',
        options: [
          '√(4.2² + 7.5²)',
          '√4.2² + 7.5²',
          '4.2 + 7.5 / 2',
          '√(4.2 + 7.5)²'
        ],
        correctAnswer: 0,
        explanation: 'A gyökjel alatt zárójelet kell tenni a teljes összegre: √(4.2² + 7.5²), különben a gép csak az első tagból vonna gyököt.'
      },
      {
        id: 'q1-2',
        title: 'Átfogó kiszámítása tizedes adatokból',
        question: 'Egy derékszögű háromszög befogói a = 2,4 cm és b = 3,2 cm. Mekkora az átfogó (c)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,65 135,65 25,20" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">3,2 cm</text>
            <text x="18" y="45" className="text-[8px] font-bold fill-slate-700">2,4</text>
            <text x="85" y="38" textAnchor="middle" className="text-[8.5px] font-bold fill-cyan-700">c = ?</text>
          </svg>
        ),
        options: [
          '4,0 cm',
          '5,6 cm',
          '3,8 cm',
          '4,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'c = √(2.4² + 3.2²) = √(5.76 + 10.24) = √16 = 4,0 cm.'
      },
      {
        id: 'q1-3',
        title: 'Befogó számológépes képlete',
        question: 'Ha az átfogó c és az egyik befogó a ismert, melyik képlettel számoljuk ki a másik befogót (b)?',
        options: [
          'b = √(c² - a²)',
          'b = √(c² + a²)',
          'b = c - a',
          'b = √(a² - c²)'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel átrendezéséből b² = c² - a², így b = √(c² - a²).'
      },
      {
        id: 'q1-4',
        title: 'Négyzetre emelés gomb funkciója',
        question: 'Melyik billentyűt használjuk a tudományos számológépen egy szám négyzetre emeléséhez?',
        options: [
          'x² (vagy ^2)',
          '√x',
          '+ / -',
          '1/x'
        ],
        correctAnswer: 0,
        explanation: 'Az x² gomb emeli négyzetre a beírt számot.'
      },
      {
        id: 'q1-5',
        title: 'Befogó kiszámítása tizedesekkel',
        question: 'Egy derékszögű háromszög átfogója c = 6,5 cm, egyik befogója a = 3,9 cm. Mekkora a másik befogó (b)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,65 135,65 25,20" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">b = ?</text>
            <text x="18" y="45" className="text-[8px] font-bold fill-slate-700">3,9</text>
            <text x="85" y="38" textAnchor="middle" className="text-[8.5px] font-bold fill-cyan-700">c = 6,5</text>
          </svg>
        ),
        options: [
          '5,2 cm',
          '5,0 cm',
          '4,8 cm',
          '5,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'b = √(6.5² - 3.9²) = √(42.25 - 15.21) = √27.04 = 5,2 cm.'
      },
      {
        id: 'q1-6',
        title: 'Zárójel nélküli beírás következménye',
        question: 'Mi történik, ha a számológépbe zárójel nélkül írjuk be: √9 + 16 ?',
        options: [
          'A gép 19-et ad eredményül (3 + 16), mert csak a 9-ből von gyököt.',
          'A gép 5-öt ad eredményül.',
          'Hibaüzenetet (ERROR) ad.',
          'Automatikusan kiteszi a zárójelet.'
        ],
        correctAnswer: 0,
        explanation: 'Zárójel hiányában a műveleti sorrend szerint először √9 = 3 számítódik ki, majd hozzáadódik 16, ami 19.'
      },
      {
        id: 'q1-7',
        title: 'Kerekítés egy tizedesjegyre',
        question: 'A számológép kijelzőjén √18 = 4,24264... látható. Mennyi ez az érték egy tizedesjegyre kerekítve?',
        options: [
          '4,2 cm',
          '4,3 cm',
          '4,24 cm',
          '4,0 cm'
        ],
        correctAnswer: 0,
        explanation: 'A tizedek után 4 áll, ezért lefelé kerekítünk: 4,2.'
      },
      {
        id: 'q1-8',
        title: 'Kerekítés két tizedesjegyre',
        question: 'A számológép kijelzőjén √50 = 7,07106... látható. Mennyi ez két tizedesjegyre kerekítve?',
        options: [
          '7,07 cm',
          '7,08 cm',
          '7,1 cm',
          '7,00 cm'
        ],
        correctAnswer: 0,
        explanation: 'A századok (7) után 1 áll, így lefelé kerekítünk: 7,07.'
      },
      {
        id: 'q1-9',
        title: 'Számológép memóriájának szerepe',
        question: 'Miért célszerű a számítási részeredményeket a számológép memóriájában (ANS / M+) tárolni?',
        options: [
          'Mert így elkerülhető a korai kerekítésből adódó pontatlanság halmozódása.',
          'Mert a gép gyorsabban számol tőle.',
          'Mert másképp nem lehet gyököt vonni.',
          'Csak azért, hogy ne kelljen leírni a füzetbe.'
        ],
        correctAnswer: 0,
        explanation: 'A teljes pontosságú köztes érték tárolásával megelőzhető a kerekítési hibák felhalmozódása.'
      },
      {
        id: 'q1-10',
        title: 'Gyökjel és négyzet kapcsolata',
        question: 'Mennyi a (√7)² kifejezés pontos értéke számológép használata nélkül?',
        options: [
          '7',
          '49',
          '14',
          '2,64'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetgyökvonás és a négyzetre emelés egymás inverz műveletei pozitív számoknál: (√7)² = 7.'
      }
    ]
  },
  2: {
    title: '2. Szint: Becslés, Kerekítés és Irracionális Szakaszok',
    subtitle: '10 feladat négyzetszámok közé zárásról, tizedesjegyekről és szerkeszthetőségről',
    badgeText: '2. Szint • Haladó',
    badgeColor: 'sky',
    icon: <Compass className="w-4 h-4 text-sky-600" />,
    questions: [
      {
        id: 'q2-1',
        title: '√80 becslése két egész szám közé',
        question: 'Melyik két szomszédos egész szám közé esik a √80 értéke?',
        options: [
          '8 és 9 közé (közelebb a 9-hez, ≈ 8,94)',
          '7 és 8 közé',
          '9 és 10 közé',
          '40 és 41 közé'
        ],
        correctAnswer: 0,
        explanation: '64 < 80 < 81, ezért √64 < √80 < √81 ⟹ 8 < √80 < 9.'
      },
      {
        id: 'q2-2',
        title: '√98 becslése négyzetszámokból',
        question: 'Melyik egész számhoz van a legközelebb a √98 értéke?',
        options: [
          '10-hez (mivel 10² = 100, √98 ≈ 9,90)',
          '9-hez',
          '7-hez',
          '49-hez'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 98 közvetlenül a 100 mellett van (9² = 81, 10² = 100), ezért értéke szinte pontosan 10 (≈ 9,899).'
      },
      {
        id: 'q2-3',
        title: '√13 cm szerkesztése derékszögű háromszögből',
        question: 'Mekkora egész hosszúságú befogókból lehet egyetlen lépésben pontosan √13 cm átfogójú derékszögű háromszöget szerkeszteni?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="35,65 125,65 35,25" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">3 cm</text>
            <text x="25" y="48" className="text-[8px] font-bold fill-slate-700">2</text>
            <text x="85" y="40" textAnchor="middle" className="text-[8.5px] font-bold fill-sky-700">c = ?</text>
          </svg>
        ),
        options: [
          '2 cm és 3 cm (2² + 3² = 4 + 9 = 13)',
          '1 cm és 12 cm',
          '3 cm és 4 cm',
          'Nem szerkeszthető meg'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 13 = 4 + 9 = 2² + 3², a 2 és 3 cm befogójú háromszög átfogója pontosan √13 cm.'
      },
      {
        id: 'q2-4',
        title: '√20 cm szakasz előállítása',
        question: 'Hogyan szerkeszthető meg pontosan egy √20 cm hosszúságú szakasz?',
        options: [
          '2 cm és 4 cm befogójú derékszögű háromszög átfogójaként (2² + 4² = 4 + 16 = 20)',
          '10 cm és 10 cm befogókból',
          '4 cm és 5 cm befogókból',
          'Csak 20 lépéses spirállal lehetséges'
        ],
        correctAnswer: 0,
        explanation: '20 felbontható két négyzetszám összegére: 20 = 4 + 16 = 2² + 4².'
      },
      {
        id: 'q2-5',
        title: 'Kerekítés két tizedesjegyre számolás után',
        question: 'a = 5,3 cm és b = 8,1 cm. Számológéppel: 5.3² + 8.1² = 93,7. Mennyi az átfogó két tizedesjegyre kerekítve?',
        options: [
          '9,68 cm',
          '9,67 cm',
          '9,70 cm',
          '9,60 cm'
        ],
        correctAnswer: 0,
        explanation: '√93.7 = 9,67987... Az ezredek helyén 9 áll, ezért felfelé kerekítünk: 9,68 cm.'
      },
      {
        id: 'q2-6',
        title: '√17 cm szerkesztése',
        question: 'Mekkora befogókból szerkeszthető meg közvetlenül egy √17 cm hosszú szakasz?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,65 130,65 30,35" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">4 cm</text>
            <text x="20" y="52" className="text-[8px] font-bold fill-slate-700">1</text>
            <text x="85" y="45" textAnchor="middle" className="text-[8.5px] font-bold fill-sky-700">c = ?</text>
          </svg>
        ),
        options: [
          '4 cm és 1 cm (4² + 1² = 16 + 1 = 17)',
          '2 cm és 5 cm',
          '3 cm és 3 cm',
          '8 cm és 9 cm'
        ],
        correctAnswer: 0,
        explanation: '17 = 16 + 1 = 4² + 1², így a 4 cm és 1 cm befogójú derékszögű háromszög átfogója √17 cm.'
      },
      {
        id: 'q2-7',
        title: 'Kerekítés kényes esete (5-ös jegy)',
        question: 'Egy átfogó pontos értéke 8,5953 cm. Mennyi ez két tizedesjegyre kerekítve?',
        options: [
          '8,60 cm',
          '8,59 cm',
          '8,50 cm',
          '8,65 cm'
        ],
        correctAnswer: 0,
        explanation: 'A második tizedesjegy után 5 áll, így felfelé kerekítünk: 8,59 + 0,01 = 8,60 cm.'
      },
      {
        id: 'q2-8',
        title: 'Mérési pontosság a gyakorlatban',
        question: 'Ha egy építészeti terven milliméter pontossággal kérik a centiméterben számolt átlót, hány tizedesjegyre kell kerekítenünk?',
        options: [
          '1 tizedesjegyre (mert 0,1 cm = 1 mm)',
          '2 tizedesjegyre',
          '0 tizedesjegyre (egészre)',
          '3 tizedesjegyre'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 1 mm = 0,1 cm, a milliméteres pontosság centiméterben pontosan egy tizedesjegyet jelent.'
      },
      {
        id: 'q2-9',
        title: '√150 becslése négyzetszámok közé',
        question: 'Melyik két egész szám közé esik a √150 értéke?',
        options: [
          '12 és 13 közé (12² = 144, 13² = 169)',
          '11 és 12 közé',
          '13 és 14 közé',
          '14 és 15 közé'
        ],
        correctAnswer: 0,
        explanation: '144 < 150 < 169, amiből √144 < √150 < √169 ⟹ 12 < √150 < 13 (kb. 12,25).'
      },
      {
        id: 'q2-10',
        title: 'Irracionális szám fogalma',
        question: 'Mit jelent pontosan, hogy a √2 irracionális szám?',
        options: [
          'Nem írható fel két egész szám hányadosaként (tizedestört alakja végtelen és nem szakaszos).',
          'Nem létezik a számegyenesen.',
          'Csak negatív számmal szorozva kapunk eredményt.',
          'Hogy a számológép nem tudja kiszámolni.'
        ],
        correctAnswer: 0,
        explanation: 'Az irracionális számok nem írhatók fel p/q tört alakban; tizedestört alakjuk végtelen és soha nem ismétlődik periodikusan.'
      }
    ]
  },
  3: {
    title: '3. Szint: Theodórosz Spirálja és Projektfeladatok',
    subtitle: '10 mélyreható feladat a gyökcsiga felépítéséről, papírhajtogatásról és kísérleti modellekről',
    badgeText: '3. Szint • Mester',
    badgeColor: 'amber',
    icon: <Award className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'Theodórosz-spirál képzési törvénye',
        question: 'Mi a Theodórosz-spirál (gyökcsiga) matematikai lépésszabálya?',
        options: [
          'Minden lépésben az előző átfogóra (√n) merőlegesen 1 egységnyi befogót állítunk, így az új átfogó √(n+1) lesz.',
          'Minden lépésben megduplázzuk a befogók hosszát.',
          'Minden lépésben 10°-kal növeljük a szöget.',
          'Az átfogók 1 cm-enként egyenletesen nőnek (1, 2, 3, 4, ...).'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel szerint (√n)² + 1² = n + 1, amiből az új átfogó hossza √(n+1).'
      },
      {
        id: 'q3-2',
        title: 'A spirál 3. lépésének átfogója',
        question: 'A Theodórosz-spirálban a √3 cm hosszúságú átfogóra 1 cm-es merőleges befogót illesztünk. Mekkora az új átfogó hossza?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,65 125,65 100,20" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <line x1="125" y1="65" x2="100" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <text x="80" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">√3 cm</text>
            <text x="122" y="40" className="text-[8px] font-bold fill-sky-700">1 cm</text>
            <text x="60" y="38" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-700">c = ?</text>
          </svg>
        ),
        options: [
          '2 cm (egész szám: √4 = 2)',
          '√5 cm',
          '3 cm',
          '√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'c = √( (√3)² + 1² ) = √(3 + 1) = √4 = 2 cm.'
      },
      {
        id: 'q3-3',
        title: 'Egész számú átfogók a spirálban',
        question: 'Mely átfogók hossza lesz pontos egész szám a Theodórosz-spirálban?',
        options: [
          'Ahol a gyökjel alatti szám négyzetszám: √4 = 2, √9 = 3, √16 = 4, ...',
          'Minden második átfogó',
          'Csak a legelső',
          'Egyik sem, minden átfogó irracionális'
        ],
        correctAnswer: 0,
        explanation: '√(n+1) pontosan akkor egész szám, ha n+1 négyzetszám (4, 9, 16, 25...).'
      },
      {
        id: 'q3-4',
        title: 'Miért áll meg a Theodórosz-spirál a 16. lépés után?',
        question: 'A történeti hagyomány szerint miért állt meg Theodórosz a √17 átfogónál?',
        options: [
          'Mert a 17. háromszög átfogója már átfedné a legelső, kiinduló szakaszt (a spirál bejár egy teljes kört).',
          'Mert elfogyott a papírja.',
          'Mert 17 után nem érvényes a Pitagorasz-tétel.',
          'Mert a √17 nem létezik.'
        ],
        correctAnswer: 0,
        explanation: 'A háromszögek csúcsszögeinek összege √17-nél eléri a 360°-ot (kb. 351° a 16. lépésnél), így a következő háromszög már rálógna a kezdeti szakaszra.'
      },
      {
        id: 'q3-5',
        title: 'Papírhajtogatásos Pitagorasz-modell',
        question: 'Egy (a + b) oldalú négyzet sarkait behajtva középen egy négyzet keletkezik. Mekkora ennek a belső négyzetnek az oldala és területe?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="45" y="8" width="70" height="64" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <polygon points="45,48 85,72 115,32 75,8" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="1.8" />
            <text x="80" y="44" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">c²</text>
          </svg>
        ),
        options: [
          'Oldala c, területe c² = a² + b²',
          'Oldala a, területe a²',
          'Oldala a + b, területe (a + b)²',
          'Területe ab / 2'
        ],
        correctAnswer: 0,
        explanation: 'A behajtott 4 derékszögű háromszög átfogói alkotják a belső négyzet oldalát (c), területe pedig c² = a² + b².'
      },
      {
        id: 'q3-6',
        title: 'Kerekítési hiba halmozódása összetett feladatban',
        question: 'Miért okozhat súlyos hibát, ha egy több lépésből álló számításnál minden köztes lépést 1 tizedesjegyre kerekítünk?',
        options: [
          'Mert a levágott tizedesek hibája a szorzások és gyökvonások során megsokszorozódik, így a végeredmény jelentősen eltérhet a valóstól.',
          'Mert a számológép leáll hibával.',
          'Nem okoz hibát, teljesen mindegy.',
          'Csak akkor, ha páratlan számokkal dolgozunk.'
        ],
        correctAnswer: 0,
        explanation: 'A köztes kerekítési hibák összeadódnak és felerősödnek a további műveletek során.'
      },
      {
        id: 'q3-7',
        title: 'Gyökcsiga szerkesztéséhez szükséges eszközök',
        question: 'Milyen minimális rajzeszközök szükségesek a Theodórosz-spirál pontos papírra rajzolásához?',
        options: [
          'Vonalzó (egység mérésére), derékszögű vonalzó (merőleges állítására) és körző.',
          'Csak szögmérő és számológép.',
          'Csak körző.',
          'Csak szabadkézi rajz lehetséges.'
        ],
        correctAnswer: 0,
        explanation: 'A merőleges állításához derékszögű vonalzó, a távolságok pontos felméréséhez vonalzó és körző szükséges.'
      },
      {
        id: 'q3-8',
        title: 'Spirállal előállítható szakaszok köre',
        question: 'Milyen számok hosszúsága állítható elő elméletileg a Theodórosz-spirál folytatásával?',
        options: [
          'Minden √n alakú szám, ahol n tetszőleges pozitív egész szám.',
          'Csak a prímszámok gyökei.',
          'Csak a páros számok gyökei.',
          'Csak a racionális számok.'
        ],
        correctAnswer: 0,
        explanation: 'A spirál indukciós lépése (√(n+1) = √((√n)² + 1)) tetszőleges pozitív egész n-re működik.'
      },
      {
        id: 'q3-9',
        title: '√5 gyors szerkesztése 4 lépés helyett',
        question: 'Hogyan szerkeszthető meg a √5 cm hosszúságú szakasz egyetlen derékszögű háromszögből a spirál 4 lépése helyett?',
        options: [
          '1 cm és 2 cm befogójú derékszögű háromszög átfogójaként (1² + 2² = 1 + 4 = 5).',
          '5 cm átmérőjű félkörrel.',
          '2 cm és 3 cm befogókból.',
          'Nem lehet egy lépésben megszerkeszteni.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 5 = 1² + 2², a közvetlen 1 és 2 cm-es befogójú háromszög átfogója azonnal √5 cm.'
      },
      {
        id: 'q3-10',
        title: 'Hajtogatásos modell algebrai egyenlete',
        question: 'Ha a nagy négyzet területe (a + b)², és levonjuk belőle a 4 sarokháromszög területét (4 · ab/2), milyen algebrai azonosság bizonyítja a tételt?',
        options: [
          '(a + b)² - 2ab = a² + 2ab + b² - 2ab = a² + b² = c²',
          '(a + b)² = a² + b²',
          'a² - b² = c²',
          '2(a + b) = c²'
        ],
        correctAnswer: 0,
        explanation: '(a+b)² = a² + 2ab + b². Ebből levonva a 4 háromszög 2ab területét, pontosan a² + b² marad, ami a belső négyzet területe (c²).'
      }
    ]
  }
};

export const CalculatorProjectQuiz: React.FC<CalculatorProjectQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Számológép & Projektmunka Kvíz"
      subtitle="Zárójelezési szabályok, becslés és kerekítés, Theodórosz spirálja és papírhajtogatás"
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="🧮 5. Lecke • Számológép & Projekt"
      topicTitle="Számológép és Projektmunka"
      topicId="g8-pyth-calculator"
      chapterId="pitagorasz-tetel"
      grade={8}
      documentId="calculator-project-quiz-doc"
      pdfFilename="8_osztaly_szamologep_es_projektmunka_kviz.pdf"
      emoji="🧮"
      cheatSheetTitle="Számológépes és Projekt Segédlet"
      cheatSheetCards={cheatSheetCards}
      levelsConfig={levelsConfig}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a számításokat és gyököket a megoldásukkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-500" />,
          levels: {
            1: {
              title: '1. Szint: Számológépes Műveletek és Négyzetek',
              subtitle: 'Párosítsd a kifejezéseket a kiszámított értékükkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Műveletek'
            },
            2: {
              title: '2. Szint: Gyökök Becslése és Kerekítése',
              subtitle: 'Párosítsd a gyököket az egész határokkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Becslés'
            },
            3: {
              title: '3. Szint: Theodórosz Spirálja és Szakaszok',
              subtitle: 'Kösd össze a spirál lépéseit a kapott átfogókkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Gyökcsiga'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <CalculatorProjectMatcher
              key={`cpj-matcher-${level}`}
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
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a kifejezéseket, gyököket és állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-cyan-500" />,
          levels: {
            1: {
              title: '1. Szint: Számok Típusa a Gyökvonás Után',
              subtitle: 'Csoportosítsd: Egész szám / Véges tizedes / Végtelen nem szakaszos!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Számok típusa'
            },
            2: {
              title: '2. Szint: Gyökök Becslése és Nagyságrendje',
              subtitle: 'Döntsd el fejben: Kisebb mint 5 / 5 és 10 között / Nagyobb mint 10!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Gyökök becslése'
            },
            3: {
              title: '3. Szint: Számológépes és Geometriai Állítások',
              subtitle: 'Csoportosítsd: Mindig igaz / Csak kerekítéskor / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Állítások igazsága'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <CalculatorProjectSorter
              key={`cpj-sorter-${level}`}
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

export default CalculatorProjectQuiz;
