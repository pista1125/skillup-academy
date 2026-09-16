import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetItem, DifficultyLevel } from '../QuizTemplate';
import { NegativeNumbersMatcher } from './NegativeNumbersMatcher';
import { NegativeNumbersSorter } from './NegativeNumbersSorter';

export interface NegativeNumbersQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const NEGATIVE_CHEAT_SHEET: CheatSheetItem[] = [
  { topic: 'Negatív számok (< 0)', formula: '-1, -2, -3, ...', note: 'A nullától balra találhatók a számegyenesen. A mínusz (-) előjel kötelező!' },
  { topic: 'A Nulla (= 0)', formula: 'Semleges origó', note: 'A nulla se nem pozitív, se nem negatív szám! Nincs előjele.' },
  { topic: 'Pozitív számok (> 0)', formula: '+1, +2, +3 (vagy 1, 2, 3)', note: 'A nullától jobbra találhatók. A plusz (+) előjel elhagyható.' },
  { topic: 'Összehasonlítás szabálya', formula: '-10 < -2', note: 'A számegyenesen a jobb oldalon lévő szám mindig a nagyobb. Minél hidegebb, annál kisebb a szám!' },
  { topic: 'Ellentett számok', formula: '-(+5) = -5, -(-5) = +5', note: 'A nullától azonos távolságra lévő, de ellentétes előjelű számpárok (pl. -7 és +7).' },
  { topic: 'Tengerszint / Hőmérő', formula: '0 m / 0 °C', note: 'A tengerszint alatti mélységet és a fagyos hőmérsékletet negatív számmal jelöljük.' },
  { topic: 'Pénzügyi egyenleg', formula: '+ Nyereség / - Tartozás', note: 'A pozitív egyenleg megtakarítást, a negatív egyenleg adósságot / hitelt jelent.' },
  { topic: 'Változások iránya', formula: 'Melegedés (+), Hűlés (-)', note: 'Ha -3 °C-ról melegszik 5 °C-ot, jobbra lépünk: -3 + 5 = +2 °C.' }
];

export const NEGATIVE_QUIZ_LEVELS: Record<1 | 2 | 3, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Hőmérséklet, adósság, tengerszint és alapfogalmak',
    range: 'Alapvető előjeles számok',
    focus: 'Előjelek értelmezése, nulla szerepe, fagy és meleg, számegyenes iránya',
    color: 'cyan',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Milyen számmal jelöljük a hőmérőt, ha télen 7 fokos fagyot mérünk a szabadban?',
        highlightValue: '7 fok fagy',
        questionTypeBadge: 'Hőmérséklet',
        options: ['-7 °C', '+7 °C', '0 °C', '14 °C'],
        correctAnswer: '-7 °C',
        explanation: 'A fagypont (0 °C) alatti hideget negatív előjellel jelöljük: -7 °C.',
        breakdown: [
          { label: 'Viszonyítási alap', value: '0 °C (fagypont)' },
          { label: 'Fagy értéke', value: '-7 °C' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Peti kölcsönkért a barátjától 3000 Ft-ot, amit még vissza kell fizetnie. Milyen előjeles számmal jelölhetjük Peti pénzügyi egyenlegét?',
        highlightValue: '3 000 Ft tartozás',
        questionTypeBadge: 'Pénzügyi egyenleg',
        options: ['-3 000 Ft', '+3 000 Ft', '0 Ft', '+6 000 Ft'],
        correctAnswer: '-3 000 Ft',
        explanation: 'A tartozást, hiányt és hitelt negatív számmal jelöljük: -3 000 Ft.',
        breakdown: [
          { label: 'Megtakarítás', value: '+ előjel' },
          { label: 'Tartozás / adósság', value: '- előjel (-3 000 Ft)' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Milyen előjelű szám a nulla (0)?',
        highlightValue: 'A Nulla (0)',
        questionTypeBadge: 'A nulla tulajdonsága',
        options: [
          'Se nem pozitív, se nem negatív',
          'Mindig pozitív szám',
          'Mindig negatív szám',
          'Egyszerre pozitív és negatív is'
        ],
        correctAnswer: 'Se nem pozitív, se nem negatív',
        explanation: 'A nulla a számegyenes semleges origója: se nem pozitív, se nem negatív szám, nincs előjele.',
        breakdown: [
          { label: 'Origó', value: '0' },
          { label: 'Tulajdonság', value: 'Semleges választóvonal' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Hol helyezkednek el a negatív számok a számegyenesen a nullához képest?',
        highlightValue: 'Számegyenes elhelyezkedés',
        questionTypeBadge: 'Számegyenes',
        options: [
          'A nullától balra',
          'A nullától jobbra',
          'Közvetlenül a nulla felett',
          'Tetszőleges helyen bárhol'
        ],
        correctAnswer: 'A nullától balra',
        explanation: 'A számegyenesen a negatív számok a nullától balra, a pozitív számok pedig a nullától jobbra helyezkednek el.',
        breakdown: [
          { label: 'Nullától balra', value: 'Negatív számok (< 0)' },
          { label: 'Nullától jobbra', value: 'Pozitív számok (> 0)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Melyik állítás IGAZ az előjelek kiírására vonatkozóan?',
        highlightValue: '+ és - előjelek',
        questionTypeBadge: 'Előjelek szabálya',
        options: [
          'A plusz (+) elhagyható, de a mínusz (-) kötelező',
          'A mínusz (-) elhagyható, de a plusz (+) kötelező',
          'Mindkét előjelet mindig kötelező kiírni',
          'Egyik előjelet sem szabad kiírni'
        ],
        correctAnswer: 'A plusz (+) elhagyható, de a mínusz (-) kötelező',
        explanation: 'A pozitív számoknál a + jel elhagyható (+5 = 5), de a negatív számoknál a - előjelet mindig kötelező kitenni (-5 ≠ 5).',
        breakdown: [
          { label: 'Pozitív', value: '+5 = 5 (elhagyható)' },
          { label: 'Negatív', value: '-5 (kötelező kiírni)' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Melyik a nullához legközelebbi negatív egész szám a számegyenesen?',
        highlightValue: 'Legnagyobb negatív egész',
        questionTypeBadge: 'Szomszédok',
        options: ['-1', '0', '-10', '+1'],
        correctAnswer: '-1',
        explanation: 'A 0 közvetlen bal szomszédja a -1, ez a legnagyobb negatív egész szám.',
        breakdown: [
          { label: 'Nulla bal szomszédja', value: '-1' },
          { label: 'Értéke', value: 'Legnagyobb negatív egész' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Egy búvár 15 méterrel úszik a tenger szintje alatt. Milyen számmal adható meg a tengerszinthez viszonyított helyzete?',
        highlightValue: '15 méterrel a tengerszint alatt',
        questionTypeBadge: 'Tengerszint',
        options: ['-15 m', '+15 m', '0 m', '30 m'],
        correctAnswer: '-15 m',
        explanation: 'A tengerszint a 0 m. A tengerszint alatti mélységet negatív számmal fejezzük ki: -15 m.',
        breakdown: [
          { label: 'Tengerszint', value: '0 m' },
          { label: 'Mélység', value: '-15 m' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'A bevásárlóközpont liftjében a 2. mélygarázs szintet szeretnénk kiválasztani. Melyik gombot kell megnyomni?',
        highlightValue: '2. mélygarázs szint',
        questionTypeBadge: 'Lift szintek',
        options: ['-2', '+2', '0', '20'],
        correctAnswer: '-2',
        explanation: 'A földszint alatti szinteket negatív előjellel jelölik a liftekben: -2. szint.',
        breakdown: [
          { label: 'Földszint', value: '0' },
          { label: 'Mélygarázs', value: '-2' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Két téli nap közül melyiken van HIDEGEBB?',
        highlightValue: 'A nap: -12 °C és B nap: -4 °C',
        questionTypeBadge: 'Összehasonlítás',
        options: [
          'Az A napon (-12 °C)',
          'A B napon (-4 °C)',
          'Mindkettőn egyformán hideg van',
          'Nem lehet eldönteni'
        ],
        correctAnswer: 'Az A napon (-12 °C)',
        explanation: 'A -12 °C 12 fokos fagyot jelent, míg a -4 °C csak 4 fokos fagyot, ezért -12 °C-on sokkal hidegebb van (-12 < -4).',
        breakdown: [
          { label: 'A nap', value: '-12 °C (keményebb fagy)' },
          { label: 'B nap', value: '-4 °C' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám 5-tel kisebb a nullánál a számegyenesen?',
        highlightValue: '0 - 5 = ?',
        questionTypeBadge: 'Nullánál kisebb',
        options: ['-5', '+5', '0', '-50'],
        correctAnswer: '-5',
        explanation: 'A nullától 5 egységgel balra lépve a -5-höz jutunk.',
        breakdown: [
          { label: 'Kiindulás', value: '0' },
          { label: '5 egység balra', value: '-5' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Összehasonlítás, ellentett számok, szomszédok és változások',
    range: '-50-től +50-ig',
    focus: 'Nagyságrendi összehasonlítás, ellentett pár, hőmérséklet-változás, távolság',
    color: 'blue',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Melyik relációs jel illik a két negatív szám közé?',
        highlightValue: '-8 ___ -3',
        questionTypeBadge: 'Összehasonlítás',
        options: ['< (kisebb)', '> (nagyobb)', '= (egyenlő)', '≤ (nem dönthető el)'],
        correctAnswer: '< (kisebb)',
        explanation: 'A számegyenesen a -8 balrább van, mint a -3, ezért -8 < -3. (A -8 hidegebb, mélyebb).',
        breakdown: [
          { label: '-8 helye', value: '8 egység balra a 0-tól' },
          { label: '-3 helye', value: '3 egység balra a 0-tól (jobbra van -8-hoz képest)' },
          { label: 'Eredmény', value: '-8 < -3' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a -6 szám ellentettje?',
        highlightValue: '-6 ellentettje',
        questionTypeBadge: 'Ellentett szám',
        options: ['+6 (6)', '-6', '0', '1/6'],
        correctAnswer: '+6 (6)',
        explanation: 'Egy szám ellentettje a számegyenesen a nullától azonos távolságra, de ellenkező irányban található szám: a -6 ellentettje a +6.',
        breakdown: [
          { label: 'Szám', value: '-6' },
          { label: 'Ellentettje', value: '+6' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Melyik szám a -4 közvetlen BAL és JOBB szomszédja a számegyenesen?',
        highlightValue: 'A -4 szomszédai',
        questionTypeBadge: 'Szomszédok',
        options: [
          'Bal: -5, Jobb: -3',
          'Bal: -3, Jobb: -5',
          'Bal: -4, Jobb: +4',
          'Bal: -6, Jobb: -2'
        ],
        correctAnswer: 'Bal: -5, Jobb: -3',
        explanation: 'Balra haladva a számok csökkennek (-5), jobbra haladva növekednek (-3), így -5 < -4 < -3.',
        breakdown: [
          { label: 'Kisebb szomszéd (bal)', value: '-5' },
          { label: 'Középső szám', value: '-4' },
          { label: 'Nagyobb szomszéd (jobb)', value: '-3' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hány fok lesz a hőmérséklet, ha +2 °C-ról lehűl az idő 5 °C-ot?',
        highlightValue: '+2 °C - 5 °C = ?',
        questionTypeBadge: 'Hőmérséklet-változás',
        options: ['-3 °C', '-7 °C', '+7 °C', '+3 °C'],
        correctAnswer: '-3 °C',
        explanation: '+2-ből 2-t levonva elérjük a 0 °C-ot, majd még 3-at hűlve a -3 °C-hoz jutunk.',
        breakdown: [
          { label: 'Kiindulás', value: '+2 °C' },
          { label: 'Fagypontig', value: '2 °C csökkenés ➔ 0 °C' },
          { label: 'Maradék hűlés', value: 'még 3 °C ➔ -3 °C' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Milyen távolságra van a -7 a nullától a számegyenesen?',
        highlightValue: 'Távolság az origótól (-7)',
        questionTypeBadge: 'Távolság a nullától',
        options: ['7 egység', '-7 egység', '0 egység', '14 egység'],
        correctAnswer: '7 egység',
        explanation: 'A távolság mindig nemnegatív mennyiség: a -7 pontosan 7 egységnyi távolságra van a nullától.',
        breakdown: [
          { label: 'Szám', value: '-7' },
          { label: 'Távolság a 0-tól', value: '7 egység' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Melyik sor tartalmazza NÖVEKVŐ (legkisebbtől a legnagyobbig) sorrendben a számokat?',
        highlightValue: '-9, +3, 0, -5',
        questionTypeBadge: 'Növekvő sorrend',
        options: [
          '-9 < -5 < 0 < +3',
          '-5 < -9 < 0 < +3',
          '+3 < 0 < -5 < -9',
          '0 < -5 < -9 < +3'
        ],
        correctAnswer: '-9 < -5 < 0 < +3',
        explanation: 'A legkisebb a leghidegebb/legbalrább lévő: -9, utána -5, majd a 0, és a legnagyobb a +3.',
        breakdown: [
          { label: 'Helyes sorrend', value: '-9 < -5 < 0 < +3' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Annának 5 000 Ft volt a bankszámláján, de kifizetett egy 8 000 Ft-os számlát. Mennyi lett az új egyenlege?',
        highlightValue: '5 000 Ft - 8 000 Ft',
        questionTypeBadge: 'Egyenlegszámítás',
        options: ['-3 000 Ft', '+3 000 Ft', '-13 000 Ft', '0 Ft'],
        correctAnswer: '-3 000 Ft',
        explanation: '5 000 Ft elfogyott, és még 3 000 Ft mínuszba (hitelbe) került az egyenlege: -3 000 Ft.',
        breakdown: [
          { label: 'Kezdő egyenleg', value: '+5 000 Ft' },
          { label: 'Kiadás', value: '8 000 Ft' },
          { label: 'Végső egyenleg', value: '-3 000 Ft' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Két negatív szám közül melyik van TÁVOLABB a nullától a számegyenesen?',
        highlightValue: '-15 és -8',
        questionTypeBadge: 'Távolság összehasonlítás',
        options: ['A -15', 'A -8', 'Egyforma távolságra vannak', 'Nem értelmezhető'],
        correctAnswer: 'A -15',
        explanation: 'A -15 távolsága a nullától 15 egység, míg a -8 távolsága csak 8 egység, tehát a -15 van távolabb.',
        breakdown: [
          { label: '-15 távolsága', value: '15 egység' },
          { label: '-8 távolsága', value: '8 egység' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Melyik szám található a -3 és a +2 KÖZÖTT a számegyenesen?',
        highlightValue: '-3 és +2 között',
        questionTypeBadge: 'Intervallum',
        options: ['-1', '-5', '+4', '-3'],
        correctAnswer: '-1',
        explanation: 'A -3 és +2 közé eső egész számok: -2, -1, 0, 1. Ezek közül a -1 szerepel az opciók között.',
        breakdown: [
          { label: 'Közé eső számok', value: '-2, -1, 0, +1' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Hány darab egész szám található szigorúan a -4 és a +3 között?',
        highlightValue: '-4 és +3 között',
        questionTypeBadge: 'Darabszám',
        options: ['6 darab', '7 darab', '5 darab', '8 darab'],
        correctAnswer: '6 darab',
        explanation: 'A számok: -3, -2, -1, 0, 1, 2. Ez pontosan 6 darab egész szám.',
        breakdown: [
          { label: 'Felsorolás', value: '-3, -2, -1, 0, 1, 2' },
          { label: 'Összesen', value: '6 db' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Összetett hőmérséklet-ingadozások, szintkülönbségek és szöveges feladványok',
    range: '-100-tól +100-ig',
    focus: 'Többlépéses változások, felezőpont, mélység-magasság különbség, állítások logikája',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-600 to-purple-700',
    iconBg: 'bg-indigo-700 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Hajnalban -6 °C volt. Délig melegedett 11 °C-ot, majd estig lehűlt 8 °C-ot. Mennyi volt az esti hőmérséklet?',
        highlightValue: '-6 + 11 - 8 = ?',
        questionTypeBadge: 'Összetett hőmérséklet',
        options: ['-3 °C', '+3 °C', '-5 °C', '+5 °C'],
        correctAnswer: '-3 °C',
        explanation: 'Déli hőmérséklet: -6 + 11 = +5 °C. Esti hőmérséklet: +5 - 8 = -3 °C.',
        breakdown: [
          { label: 'Hajnal', value: '-6 °C' },
          { label: 'Délben', value: '-6 + 11 = +5 °C' },
          { label: 'Este', value: '+5 - 8 = -3 °C' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Egy hegy csúcsa a tengerszint felett +150 méteren van, a közeli bányató legmélyebb pontja a tengerszint alatt -25 méteren található. Mekkora a szintkülönbség a csúcs és a tó mélye között?',
        highlightValue: '+150 m és -25 m szintkülönbsége',
        questionTypeBadge: 'Szintkülönbség',
        options: ['175 m', '125 m', '150 m', '100 m'],
        correctAnswer: '175 m',
        explanation: 'A hegycsúcstól a tengerszintig 150 m, a tengerszinttől a tó aljáig még 25 m, összesen: 150 + 25 = 175 m.',
        breakdown: [
          { label: 'Csúcstól 0-ig', value: '150 m' },
          { label: '0-tól a mélyig', value: '25 m' },
          { label: 'Teljes különbség', value: '150 + 25 = 175 m' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Melyik szám felezi a számegyenesen a -8 és a +4 közötti szakaszt (hol van a felezőpont)?',
        highlightValue: '-8 és +4 felezőpontja',
        questionTypeBadge: 'Felezőpont',
        options: ['-2', '-4', '0', '-6'],
        correctAnswer: '-2',
        explanation: 'A távolság -8 és +4 között 12 egység. A fele 6 egység. -8-tól 6-ot lépünk jobbra: -8 + 6 = -2.',
        breakdown: [
          { label: 'Teljes távolság', value: '4 - (-8) = 12 egység' },
          { label: 'Féltáv', value: '12 : 2 = 6 egység' },
          { label: 'Felezőpont', value: '-8 + 6 = -2' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Egy cég bankszámlájának egyenlege -2 500 Ft tartozás volt. Befizettek 10 000 Ft-ot, majd kifizettek 12 000 Ft rezsit. Mennyi lett a záró egyenleg?',
        highlightValue: '-2 500 + 10 000 - 12 000',
        questionTypeBadge: 'Pénzügyi műveletsor',
        options: ['-4 500 Ft', '+4 500 Ft', '-500 Ft', '+500 Ft'],
        correctAnswer: '-4 500 Ft',
        explanation: '-2 500 + 10 000 = +7 500 Ft. Ezután 7 500 - 12 000 = -4 500 Ft.',
        breakdown: [
          { label: '1. lépés (befizetés)', value: '-2 500 + 10 000 = +7 500 Ft' },
          { label: '2. lépés (kifizetés)', value: '7 500 - 12 000 = -4 500 Ft' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik a LEGNAGYOBB kétjegyű negatív egész szám?',
        highlightValue: 'Legnagyobb 2 jegyű negatív',
        questionTypeBadge: 'Számelmélet',
        options: ['-10', '-99', '-11', '-1'],
        correctAnswer: '-10',
        explanation: 'A kétjegyű negatív számok -10-től -99-ig tartanak. A számegyenesen a leginkább jobbra lévő (legnagyobb) a -10.',
        breakdown: [
          { label: 'Tartomány', value: '-99 ... -10' },
          { label: 'Legnagyobb', value: '-10 (legközelebb a 0-hoz)' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik a LEGKISEBB kétjegyű negatív egész szám?',
        highlightValue: 'Legkisebb 2 jegyű negatív',
        questionTypeBadge: 'Számelmélet',
        options: ['-99', '-10', '-90', '-100'],
        correctAnswer: '-99',
        explanation: 'A számegyenesen a leginkább balra lévő (legkisebb értékű) kétjegyű szám a -99.',
        breakdown: [
          { label: 'Tartomány', value: '-99 ... -10' },
          { label: 'Legkisebb', value: '-99 (legtávolabb a 0-tól balra)' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'A lift a +3. emeletről lement 5 szintet, majd felment 1 szintet. Melyik szinten állt meg a lift?',
        highlightValue: '+3 - 5 + 1 = ?',
        questionTypeBadge: 'Lift modellezés',
        options: ['-1. szint', '-2. szint', '0. földszint', '+1. emelet'],
        correctAnswer: '-1. szint',
        explanation: '+3 - 5 = -2. szint (2. alagsor), majd onnan +1 szint = -1. szint (1. alagsor).',
        breakdown: [
          { label: '1. mozgás', value: '+3 - 5 = -2. szint' },
          { label: '2. mozgás', value: '-2 + 1 = -1. szint' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a különbség a téli leghidegebb (-18 °C) és a nyári legmelegebb (+27 °C) hőmérséklet között?',
        highlightValue: '-18 °C és +27 °C különbsége',
        questionTypeBadge: 'Hőingás / Különbség',
        options: ['45 °C', '9 °C', '35 °C', '55 °C'],
        correctAnswer: '45 °C',
        explanation: '-18-tól a 0-ig 18 °C, 0-tól +27-ig még 27 °C, összesen: 18 + 27 = 45 °C a hőingás.',
        breakdown: [
          { label: '-18-tól 0-ig', value: '18 fok' },
          { label: '0-tól 27-ig', value: '27 fok' },
          { label: 'Összesen', value: '18 + 27 = 45 °C' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Melyik állítás HAMIS az alábbiak közül?',
        highlightValue: 'Logikai állítások',
        questionTypeBadge: 'Igaz-Hamis',
        options: [
          'Bármely negatív szám nagyobb, mint a 0',
          'Minden negatív szám kisebb, mint bármelyik pozitív szám',
          'A negatív számok ellentettje pozitív szám',
          'A -100 kisebb, mint a -1'
        ],
        correctAnswer: 'Bármely negatív szám nagyobb, mint a 0',
        explanation: 'A negatív számok definíció szerint KISEBBEK a nullánál (< 0), ezért az az állítás, hogy nagyobbak lennének, hamis.',
        breakdown: [
          { label: 'Szabály', value: 'Minden negatív szám < 0' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi az összeg értéke?',
        highlightValue: '(-15) + (+15)',
        questionTypeBadge: 'Ellentettek összege',
        options: ['0', '-30', '+30', '1'],
        correctAnswer: '0',
        explanation: 'Egy szám és ellentettjének összege mindig nulla, mert a számegyenesen ellentétes irányban egyenlő lépést teszünk meg.',
        breakdown: [
          { label: 'Szabály', value: 'a + (-a) = 0' },
          { label: 'Példa', value: '-15 + 15 = 0' }
        ]
      }
    ]
  }
};

export function NegativeNumbersQuiz({
  onBack,
  onSwitchToTheory
}: NegativeNumbersQuizProps) {
  return (
    <QuizTemplate
      topicId="g5-negative-numbers"
      topicTitle="Negatív számok"
      grade={5}
      chapterId="egesz-szamok"
      title="Negatív számok - Gyakorló Kvíz"
      topicBadge="❄️ 5. Osztály • I. Az egész számok"
      badgeText="❄️ 5. Osztály • I. Az egész számok"
      badgeColor="cyan"
      levels={NEGATIVE_QUIZ_LEVELS}
      cheatSheet={NEGATIVE_CHEAT_SHEET}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<NegativeNumbersMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<NegativeNumbersSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default NegativeNumbersQuiz;
