import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ChangesMatcher } from './ChangesMatcher';
import { ChangesSorter } from './ChangesSorter';
import {
  AbsoluteVsRelativeSvg,
  PercentVsPercentagePointSvg,
  BaseChainIndexSvg
} from './ChangesFigures';

interface ChangesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Abszolút és relatív változás',
    description: 'Abszolút változás: Δx = x₁ - x₀ (mértékegységgel). Relatív változás: Δx / x₀ = (x₁ - x₀) / x₀ (százalékban kifejezve). Bázis-eltolódás: +p% majd -p% mindig csökkenést eredményez!',
    note: 'Mindig figyelj, hogy mihez viszonyítasz: az osztó mindig a kiindulási bázisérték (x₀).',
    color: 'from-cyan-500 to-blue-600',
    figure: <AbsoluteVsRelativeSvg size={200} />
  },
  {
    title: 'Százalék vs. Százalékpont',
    description: 'Százalékos mutatók (infláció, kamat, arány) megváltozásakor a különbség százalékpont (sz.p.), az arányos változás pedig a kiindulási ráta szerinti relatív százalékos változás.',
    note: 'Például 4%-ról 5%-ra: különbség +1 százalékpont, relatív növekedés: +1 / 4 = +25%.',
    color: 'from-purple-500 to-indigo-600',
    figure: <PercentVsPercentagePointSvg size={200} />
  },
  {
    title: 'Bázis- és láncviszonyszámok',
    description: 'Bázisviszonyszám: Bᵢ = xᵢ / x₀ (állandó kezdeti bázishoz mért hányados). Láncviszonyszám: Lᵢ = xᵢ / xᵢ₋₁ (közvetlenül megelőző időszakhoz mért szorzó). Összefüggés: Bₙ = L₁ · L₂ ··· Lₙ.',
    note: 'Az átlagos növekedési ütem a láncviszonyszámok mértani közepe: L_átlag = ⁿ√(Bₙ).',
    color: 'from-teal-500 to-emerald-600',
    figure: <BaseChainIndexSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és viszonyszámok',
    subtitle: '10 alapozó feladat az abszolút és relatív változás, valamint az egyszerű viszonyszámok témaköréből',
    range: '1–10. kérdés',
    focus: 'Abszolút különbség (Δx), relatív százalékos változás és alapszintű bázis- és lánchányadosok',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-blue-600',
    questions: [
      {
        id: 'cq1-1',
        level: 1,
        question: 'Hogyan számítjuk ki két időpont (x₀ és x₁) közötti abszolút változást?',
        options: [
          'Δx = x₁ - x₀',
          'Δx = (x₁ - x₀) / x₀',
          'Δx = x₁ / x₀',
          'Δx = (x₀ + x₁) / 2'
        ],
        correctAnswer: 'Δx = x₁ - x₀',
        explanation: 'Az abszolút változás a végső érték és a kezdeti bázisérték kivonásos különbsége: Δx = x₁ - x₀. Mindig van mértékegysége (pl. Ft, km, kg, fő).',
        hint: 'Az új értékből vond ki a régit!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'cq1-2',
        level: 1,
        question: 'Hogyan számítjuk ki a relatív változást a kezdőértékhez (x₀) viszonyítva?',
        options: [
          '(x₁ - x₀) / x₀',
          'x₁ - x₀',
          'x₀ / x₁',
          'x₁ / (x₀ + x₁)'
        ],
        correctAnswer: '(x₁ - x₀) / x₀',
        explanation: 'A relatív változás az abszolút változás és a kezdeti bázisérték hányadosa: (x₁ - x₀) / x₀. Százalékban kifejezve: ((x₁ - x₀) / x₀) · 100%.',
        hint: 'Oszd el a növekményt a kiinduló bázissal!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'cq1-3',
        level: 1,
        question: 'Egy kerékpártúra 1. napján 80 km-t tettek meg a diákok, a 2. napon 96 km-t. Mennyi a megtett táv abszolút változása a 2. napon az 1. naphoz képest?',
        options: [
          '+16 km',
          '+20 km',
          '+12 km',
          '+8 km'
        ],
        correctAnswer: '+16 km',
        explanation: 'Az abszolút változás: Δx = x₁ - x₀ = 96 km - 80 km = +16 km.',
        hint: 'Vonj ki 80-at a 96-ból!',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'cq1-4',
        level: 1,
        question: 'A fenti kerékpártúrán (80 km-ről 96 km-re) mekkora volt a megtett távolság relatív növekedése?',
        options: [
          '+20%',
          '+16%',
          '+25%',
          '+120%'
        ],
        correctAnswer: '+20%',
        explanation: 'A relatív változás: Δx / x₀ = 16 km / 80 km = 0,2 = +20%.',
        hint: 'Oszd el a 16 km növekményt a kiinduló 80 km-rel!',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'cq1-5',
        level: 1,
        question: 'Egy iskolatáska ára 2000 Ft-ról 2500 Ft-ra drágult. Hány százalékos volt az áremelés?',
        options: [
          '+25%',
          '+20%',
          '+50%',
          '+125%'
        ],
        correctAnswer: '+25%',
        explanation: 'Az abszolút növekedés 2500 - 2000 = 500 Ft. Relatív növekedés: 500 / 2000 = 0,25, azaz +25%.',
        hint: '500 Ft a növekedés a 2000 Ft-os kiinduló árhoz képest.',
        questionTypeBadge: 'Százalékszámítás'
      },
      {
        id: 'cq1-6',
        level: 1,
        question: 'Egy télikabát árát 20 000 Ft-ról leértékelték 16 000 Ft-ra. Mennyi volt a relatív változás?',
        options: [
          '-20%',
          '-25%',
          '-4000%',
          '-15%'
        ],
        correctAnswer: '-20%',
        explanation: 'Az abszolút változás: 16 000 - 20 000 = -4000 Ft. Relatív változás: -4000 / 20 000 = -0,2 = -20%.',
        hint: 'A 4000 Ft-os árcsökkenést a kezdeti 20 000 Ft-hoz viszonyítsd!',
        questionTypeBadge: 'Százalékszámítás'
      },
      {
        id: 'cq1-7',
        level: 1,
        question: 'Hogyan definiáljuk a bázisviszonyszámot (Bᵢ)?',
        options: [
          'Az i-edik időszak adatának hányadosa a rögzített kezdő (x₀) bázisadathoz képest: Bᵢ = xᵢ / x₀',
          'Az i-edik adat hányadosa az előző adathoz képest: Bᵢ = xᵢ / xᵢ₋₁',
          'Az i-edik adat és a kezdőadat számtani közepe',
          'Az összes adat összege osztva a kezdőértékkel'
        ],
        correctAnswer: 'Az i-edik időszak adatának hányadosa a rögzített kezdő (x₀) bázisadathoz képest: Bᵢ = xᵢ / x₀',
        explanation: 'A bázisviszonyszám mindig egy rögzített kiindulási állapothoz (a 0. bázishoz) hasonlítja a mindenkori értéket: Bᵢ = xᵢ / x₀.',
        hint: 'A bázisviszonyszám nevezőjében mindig a fix legelső bázisérték áll.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'cq1-8',
        level: 1,
        question: 'Hogyan definiáljuk a láncviszonyszámot (Lᵢ)?',
        options: [
          'Az i-edik adat hányadosa a közvetlenül megelőző időszak adatához képest: Lᵢ = xᵢ / xᵢ₋₁',
          'Az i-edik adat hányadosa a legelső (bázis) adathoz képest',
          'A két szomszédos adat különbsége mértékegységgel',
          'A legnagyobb és legkisebb adat hányadosa'
        ],
        correctAnswer: 'Az i-edik adat hányadosa a közvetlenül megelőző időszak adatához képest: Lᵢ = xᵢ / xᵢ₋₁',
        explanation: 'A láncviszonyszám láncszerűen köti össze az egymást követő időszakokat: az aktuális értéket osztjuk az őt közvetlenül megelőző értékkel (xᵢ / xᵢ₋₁).',
        hint: 'Láncszemek egymás után: mindig az előzőhöz viszonyítunk.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'cq1-9',
        level: 1,
        question: 'Egy kistelepülés lakossága 1200 főről 1260 főre gyarapodott egy év alatt. Mennyi az abszolút és relatív változás?',
        options: [
          'Abszolút: +60 fő; Relatív: +5%',
          'Abszolút: +5 fő; Relatív: +60%',
          'Abszolút: +60 fő; Relatív: +50%',
          'Abszolút: +1260 fő; Relatív: +5%'
        ],
        correctAnswer: 'Abszolút: +60 fő; Relatív: +5%',
        explanation: 'Abszolút változás: 1260 - 1200 = +60 fő. Relatív változás: 60 / 1200 = 1/20 = 0,05 = +5%.',
        hint: 'A különbség 60 fő, a 60 / 1200 arány pedig 5%.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'cq1-10',
        level: 1,
        question: 'Egy mérnök havi bruttó fizetése 400 000 Ft-ról 440 000 Ft-ra nőtt. Hány százalékos bérfejlesztést kapott?',
        options: [
          '+10%',
          '+40%',
          '+4%',
          '+110%'
        ],
        correctAnswer: '+10%',
        explanation: 'A béremelés összege 440 000 - 400 000 = 40 000 Ft. Relatív növekmény: 40 000 / 400 000 = 0,10 = +10%.',
        hint: '40 000 / 400 000 = 1/10 = 10%.',
        questionTypeBadge: 'Számolás'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Százalékpont, kerékpártúra és amortizáció',
    subtitle: '10 összetettebb feladat a százalékpont fogalmáról, több egymást követő változásról és a bázis-eltolódásról',
    range: '11–20. kérdés',
    focus: 'Százalékpont vs. relatív százalék, egymást követő emelések/csökkentések, értékvesztés',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'cq2-1',
        level: 2,
        question: 'Egy bank a látra szóló betéti kamatát 4%-ról 5%-ra emeli. Mennyi a kamatláb változása százalékpontban kifejezve?',
        options: [
          '+1 százalékpont',
          '+25 százalékpont',
          '+20 százalékpont',
          '+0,25 százalékpont'
        ],
        correctAnswer: '+1 százalékpont',
        explanation: 'Százalékban megadott ráták megváltozásakor a közvetlen különbség a százalékpont: 5% - 4% = +1 százalékpont (sz.p.).',
        hint: 'Egyszerű kivonás a százalékos értékek között: 5 - 4.',
        questionTypeBadge: 'Százalékpont'
      },
      {
        id: 'cq2-2',
        level: 2,
        question: 'A fenti kamatemelésnél (4%-ról 5%-ra) mekkora volt a kamatláb relatív növekedése?',
        options: [
          '+25%',
          '+1%',
          '+20%',
          '+5%'
        ],
        correctAnswer: '+25%',
        explanation: 'A relatív változás a kiindulási kamatlábhoz képest számítandó: (5% - 4%) / 4% = 1/4 = +25%.',
        hint: 'A kiindulási 4%-hoz viszonyítsd az 1 százalékpontos növekedést: 1 / 4 = 25%.',
        questionTypeBadge: 'Százalékpont'
      },
      {
        id: 'cq2-3',
        level: 2,
        question: 'Egy áruházban egy televízió árát először felemelték 20%-kal, majd a megemelt árat akcióban csökkentették 20%-kal. Mi történt a TV árával az eredetihez képest?',
        options: [
          '4%-kal csökkent',
          'Változatlan maradt (0%)',
          '4%-kal nőtt',
          '2%-kal csökkent'
        ],
        correctAnswer: '4%-kal csökkent',
        explanation: 'A szorzók összeszorzódnak: 1,20 · 0,80 = 0,96 = 96%, azaz 100% - 96% = 4%-os csökkenés történt a bázis eltolódása miatt!',
        hint: 'Számold ki a szorzók szorzatát: 1,2 · 0,8.',
        questionTypeBadge: 'Bázis-eltolódás'
      },
      {
        id: 'cq2-4',
        level: 2,
        question: 'A tankönyv kerékpáros feladatában a diák 1. nap 62 km-t tekert. Másnap 15%-kal többet, harmadnap az előző napihoz képest 15%-kal kevesebbet. Hány km-t tekert a 3. napon?',
        options: [
          '60,605 km (kevesebb az 1. napinál)',
          '62 km (pontosan ugyanannyi)',
          '63,5 km (több az 1. napinál)',
          '58,2 km'
        ],
        correctAnswer: '60,605 km (kevesebb az 1. napinál)',
        explanation: '2. nap: 62 · 1,15 = 71,3 km. 3. nap: 71,3 · 0,85 = 60,605 km. Mivel 1,15 · 0,85 = 0,9775, így 62 · 0,9775 = 60,605 km.',
        hint: 'Szorozd meg 62-t: 62 · 1,15 · 0,85.',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'cq2-5',
        level: 2,
        question: 'Egy új autó ára 5 000 000 Ft. Az első évben 20%-ot, a második évben további 15%-ot veszít értékéből. Mennyi az autó piaci értéke 2 év után?',
        options: [
          '3 400 000 Ft',
          '3 250 000 Ft',
          '3 500 000 Ft',
          '4 000 000 Ft'
        ],
        correctAnswer: '3 400 000 Ft',
        explanation: '1. év után: 5M · 0,80 = 4 000 000 Ft. 2. év után: 4M · 0,85 = 3 400 000 Ft. Egy lépésben: 5M · (0,80 · 0,85) = 5M · 0,68 = 3,4M Ft.',
        hint: 'A szorzók: 0,80 és 0,85. 0,8 · 0,85 = 0,68.',
        questionTypeBadge: 'Amortizáció'
      },
      {
        id: 'cq2-6',
        level: 2,
        question: 'Egy gyár termelése két egymást követő évben is 10%-kal nőtt az előző évhez képest. Mennyi a két év alatti összesített növekedés a kiinduló évhez képest?',
        options: [
          '+21%',
          '+20%',
          '+100%',
          '+22%'
        ],
        correctAnswer: '+21%',
        explanation: 'Az összesített szorzó: 1,10 · 1,10 = 1,21, ami +21%-os növekedést jelent (a "kamatkamat-hatás" miatt nem 20%).',
        hint: '1,1 · 1,1 = 1,21, ez hány százalék növekedés 1-hez képest?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'cq2-7',
        level: 2,
        question: 'Egy régióban a munkanélküliségi ráta 8%-ról 6%-ra csökkent. Mennyi a változás százalékpontban és relatív százalékban?',
        options: [
          '-2 százalékpont és -25% relatív csökkenés',
          '-25 százalékpont és -2% relatív csökkenés',
          '-2 százalékpont és -20% relatív csökkenés',
          '-14 százalékpont és -25% relatív csökkenés'
        ],
        correctAnswer: '-2 százalékpont és -25% relatív csökkenés',
        explanation: 'Százalékpontban: 6% - 8% = -2 százalékpont. Relatív változás: -2 / 8 = -0,25 = -25%.',
        hint: 'Százalékpont: kivonás (6 - 8). Relatív: osztás a kiinduló 8-cal (-2 / 8).',
        questionTypeBadge: 'Százalékpont'
      },
      {
        id: 'cq2-8',
        level: 2,
        question: 'Egy országban az infláció 12%-ról 9%-ra mérséklődött. Hány százalékponttal esett az infláció?',
        options: [
          '3 százalékponttal',
          '25 százalékponttal',
          '3%-kal',
          '0,75 százalékponttal'
        ],
        correctAnswer: '3 százalékponttal',
        explanation: 'Két százalékos érték különbsége mértékegységként százalékpontban adandó meg: 12 - 9 = 3 százalékpont.',
        hint: '12% - 9% különbségét nem sima százalékban, hanem százalékpontban nevezzük meg.',
        questionTypeBadge: 'Százalékpont'
      },
      {
        id: 'cq2-9',
        level: 2,
        question: 'Egy kockázatos részvény ára először 50%-kal emelkedett, majd a következő héten 50%-ot zuhant. Hány százaléka maradt meg a részvény kezdeti értékének?',
        options: [
          '75%-a (25%-os veszteség)',
          '100%-a (nem változott)',
          '50%-a (felére esett)',
          '80%-a (20%-os veszteség)'
        ],
        correctAnswer: '75%-a (25%-os veszteség)',
        explanation: 'A szorzók szorzata: 1,50 · 0,50 = 0,75, tehát az eredeti ár 75%-a maradt meg, azaz a befektető 25%-ot veszített!',
        hint: '1,5 szorozva 0,5-tel = 0,75.',
        questionTypeBadge: 'Bázis-eltolódás'
      },
      {
        id: 'cq2-10',
        level: 2,
        question: 'Egy vállalkozás bevétele 2021-ben 100 millió Ft, 2022-ben 120 millió Ft, 2023-ban 150 millió Ft volt. Mennyi a 2023-as év láncviszonyszáma?',
        options: [
          '1,25 (azaz +25%)',
          '1,50 (azaz +50%)',
          '1,20 (azaz +20%)',
          '0,80 (azaz -20%)'
        ],
        correctAnswer: '1,25 (azaz +25%)',
        explanation: 'A láncviszonyszám a megelőző időszakhoz viszonyít: L₂₀₂₃ = x₂₀₂₃ / x₂₀₂₂ = 150 / 120 = 1,25 (azaz 25%-os növekedés 2022-höz képest).',
        hint: 'A 2023-as értéket a 2022-es értékkel kell elosztani: 150 / 120.',
        questionTypeBadge: 'Láncviszonyszám'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Gazdasági dinamika, lánc- és bázisösszefüggések',
    subtitle: '10 érettségi és emelt szintű feladat a viszonyszámok szorzatáról, átlagos ütemről és inverz változásokról',
    range: '21–30. kérdés',
    focus: 'Bₙ = L₁ · L₂ ··· Lₙ tétel, mértani átlagos növekedési ütem, visszadrágulási kalkuláció',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    questions: [
      {
        id: 'cq3-1',
        level: 3,
        question: 'Milyen matematikai összefüggés áll fenn a láncviszonyszámok és a bázisviszonyszám között?',
        options: [
          'A láncviszonyszámok szorzata megadja a periódus bázisviszonyszámát: Bₙ = L₁ · L₂ ··· Lₙ',
          'A láncviszonyszámok számtani közepe egyenlő a bázisviszonyszámmal',
          'A láncviszonyszámok összege egyenlő a bázisviszonyszámmal',
          'A bázisviszonyszám mindig nagyobb bármely láncviszonyszám összegénél'
        ],
        correctAnswer: 'A láncviszonyszámok szorzata megadja a periódus bázisviszonyszámát: Bₙ = L₁ · L₂ ··· Lₙ',
        explanation: 'Teleszkopikus egyszerűsítés miatt: (x₁/x₀) · (x₂/x₁) ··· (xₙ/xₙ₋₁) = xₙ/x₀ = Bₙ. A szomszédos nevezők és számlálók kiejtik egymást!',
        hint: 'Írd fel a törteket egymás mellé és egyszerűsíts!',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'cq3-2',
        level: 3,
        question: 'Három egymást követő év láncviszonyszámai rendre: L₁ = 1,10; L₂ = 1,20; L₃ = 0,90. Mennyi a 3. év végső bázisviszonyszáma a kiindulási állapothoz (x₀) képest?',
        options: [
          '1,188 (azaz +18,8%)',
          '1,200 (azaz +20,0%)',
          '1,067 (azaz +6,7%)',
          '3,200 (azaz +220%)'
        ],
        correctAnswer: '1,188 (azaz +18,8%)',
        explanation: 'B₃ = L₁ · L₂ · L₃ = 1,10 · 1,20 · 0,90 = 1,32 · 0,90 = 1,188, ami +18,8%-os teljes növekedést jelent.',
        hint: 'Szorozd össze a három számot: 1,1 · 1,2 · 0,9.',
        questionTypeBadge: 'Viszonyszámok'
      },
      {
        id: 'cq3-3',
        level: 3,
        question: 'Egy termék ára egymás után először +p%-kal nőtt, majd -p%-kal csökkent. Milyen általános formulával fejezhető ki a végső ár az eredeti x₀ árhoz képest?',
        options: [
          'x₂ = x₀ · (1 - p² / 10 000)',
          'x₂ = x₀ · (1 + p² / 10 000)',
          'x₂ = x₀ · (1 - p / 100)',
          'x₂ = x₀'
        ],
        correctAnswer: 'x₂ = x₀ · (1 - p² / 10 000)',
        explanation: 'A szorzók: (1 + p/100) · (1 - p/100) = 1 - p²/10 000 a nevezetes (a+b)(a-b) = a² - b² azonosság alapján. Mivel p > 0, ez a szorzó mindig szigorúan kisebb 1-nél!',
        hint: 'Használd a két tag összegének és különbségének szorzatára vonatkozó nevezetes azonosságot!',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'cq3-4',
        level: 3,
        question: 'Egy okostelefon árát leértékelték 20%-kal. Hány százalékkal kell felemelni az új akciós árat, hogy visszakapjuk a leértékelés előtti eredeti árat?',
        options: [
          '+25%',
          '+20%',
          '+24%',
          '+30%'
        ],
        correctAnswer: '+25%',
        explanation: 'Az akciós ár a réginek a 0,80-szorosa. A visszaállító szorzó a reciprok: 1 / 0,80 = 1,25, ami pontosan +25%-os áremelést követel meg!',
        hint: 'A 0,8 reciprokát keresed: 1 / 0,8 = 10 / 8 = 1,25.',
        questionTypeBadge: 'Inverz feladat'
      },
      {
        id: 'cq3-5',
        level: 3,
        question: 'Egy nagyváros külterületének lakossága 2 év alatt 10 000 főről 14 400 főre nőtt. Évente azonos százalékos ütemben gyarapodott. Mekkora volt az évenkénti növekedési szorzó?',
        options: [
          '1,20 (azaz évi +20%)',
          '1,22 (azaz évi +22%)',
          '1,44 (azaz évi +44%)',
          '1,15 (azaz évi +15%)'
        ],
        correctAnswer: '1,20 (azaz évi +20%)',
        explanation: 'A két év teljes szorzója B₂ = 14 400 / 10 000 = 1,44. Az egyenletes évi szorzó a mértani közép: q = √1,44 = 1,20, azaz évente 20%-os növekedés.',
        hint: 'Vonj négyzetgyököt az 1,44-ből: √1,44 = 1,2.',
        questionTypeBadge: 'Átlagos ütem'
      },
      {
        id: 'cq3-6',
        level: 3,
        question: 'Adottak a bázisviszonyszámok: B₁ = 1,10 és B₂ = 1,32. Mennyi a 2. időszak láncviszonyszáma (L₂)?',
        options: [
          '1,20',
          '1,22',
          '0,22',
          '1,452'
        ],
        correctAnswer: '1,20',
        explanation: 'Mivel B₂ = B₁ · L₂, ezért a láncviszonyszám a bázisok hányadosa: L₂ = B₂ / B₁ = 1,32 / 1,10 = 1,20 (azaz a 2. évben +20% volt a bővülés az 1. évhez képest).',
        hint: 'Oszd el a második évi bázisviszonyszámot az első évivel: 1,32 / 1,10.',
        questionTypeBadge: 'Viszonyszámok'
      },
      {
        id: 'cq3-7',
        level: 3,
        question: 'Egy ruházati üzletben egy kabát ára a leárazáson 40%-kal csökkent. Hány százalékkal kell megemelni ezt a leárazott árat, hogy újra az eredeti áron lehessen eladni?',
        options: [
          'kb. +66,7%',
          '+40%',
          '+50%',
          '+60%'
        ],
        correctAnswer: 'kb. +66,7%',
        explanation: 'A leárazott ár az eredetinek 0,60-szorosa (60%-a). A helyreállító szorzó: 1 / 0,60 = 5/3 ≈ 1,6667, ami kb. 66,7%-os emelést jelent!',
        hint: 'Számold ki az 1 / 0,60 értéket: 10 / 6 = 5 / 3 = 1,6667.',
        questionTypeBadge: 'Inverz feladat'
      },
      {
        id: 'cq3-8',
        level: 3,
        question: 'Egy kockázati tőkealap befektetése 3 év alatt nyolcszorosára nőtt (B₃ = 8,0). Mekkora volt az átlagos évenkénti növekedési láncszorzó (mértani átlag)?',
        options: [
          '2,0 (azaz átlagosan évi +100%)',
          '2,67 (azaz átlagosan évi +167%)',
          '1,5 (azaz átlagosan évi +50%)',
          '8,0'
        ],
        correctAnswer: '2,0 (azaz átlagosan évi +100%)',
        explanation: 'Három év alatt q · q · q = q³ = 8,0. Ebből a mértani átlag: q = ³√8 = 2,0. Ez azt jelenti, hogy a tőke átlagosan minden évben megduplázódott (+100%).',
        hint: 'Melyik pozitív szám harmadik hatványa egyenlő 8-cal? ³√8 = ?',
        questionTypeBadge: 'Átlagos ütem'
      },
      {
        id: 'cq3-9',
        level: 3,
        question: 'Egy gazdaság GDP-je 4 egymást követő évben a következő láncszorzókat mutatta: 1,02; 1,03; 0,98; 1,01. Melyik képlettel kapjuk meg a 4 éves teljes változást leíró B₄ bázisviszonyszámot?',
        options: [
          'B₄ = 1,02 · 1,03 · 0,98 · 1,01',
          'B₄ = (1,02 + 1,03 + 0,98 + 1,01) / 4',
          'B₄ = 1,02 + 1,03 + 0,98 + 1,01 - 3',
          'B₄ = (1,02 · 1,01) / (1,03 · 0,98)'
        ],
        correctAnswer: 'B₄ = 1,02 · 1,03 · 0,98 · 1,01',
        explanation: 'A láncviszonyszámok szorzatának tétele szerint B₄ = L₁ · L₂ · L₃ · L₄. Az egymást követő növekedési szorzók mindig összeszorzódnak.',
        hint: 'A periódusok láncszorzóit össze kell szorozni.',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'cq3-10',
        level: 3,
        question: 'Egy bank a fix kamatozású kötvény hozamát 5,0%-ról 6,25%-ra emeli. Melyik állítás IGAZ erre a hozamváltozásra?',
        options: [
          'A hozam 1,25 százalékponttal nőtt, ami 25%-os relatív emelkedést jelent',
          'A hozam 25 százalékponttal nőtt, ami 1,25%-os relatív emelkedést jelent',
          'A hozam 1,25%-kal nőtt mindkét értelemben',
          'A hozam relatív növekedése megegyezik az abszolút növekedésével'
        ],
        correctAnswer: 'A hozam 1,25 százalékponttal nőtt, ami 25%-os relatív emelkedést jelent',
        explanation: 'Különbség százalékpontban: 6,25% - 5,0% = 1,25 százalékpont. Relatív növekedés a bázishoz: 1,25 / 5,0 = 0,25 = +25%. Mindkét számítás helytálló és különböző információt hordoz!',
        hint: 'Százalékpont: 6,25 - 5,0 = 1,25. Relatív növekedés: 1,25 / 5,0 = 25%.',
        questionTypeBadge: 'Százalékpont'
      }
    ]
  }
};

export const ChangesQuiz: React.FC<ChangesQuizProps> = (props) => {
  const {
    onBack,
    onSwitchToTheory,
    onSwitchToMatcher,
    onSwitchToSorter,
    initialGameMode = 'quiz',
    ...restProps
  } = props;

  return (
    <QuizTemplate
      topicId="g10-stat-valtozasok-quiz"
      topicTitle="Változások"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ChangesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ChangesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      {...restProps}
    />
  );
};

