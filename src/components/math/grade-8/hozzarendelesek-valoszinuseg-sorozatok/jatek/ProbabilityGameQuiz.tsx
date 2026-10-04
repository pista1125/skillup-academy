import React from 'react';
import { QuizTemplate, LevelConfig, DifficultyLevel, CheatSheetCard } from '../QuizTemplate';
import { ProbabilityGameMatcher } from './ProbabilityGameMatcher';
import { ProbabilityGameSorter } from './ProbabilityGameSorter';
import { ArrowRightLeft, LayoutGrid, Gamepad2, Dices, Trophy, HelpCircle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProbabilityGameQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Játéktípusok & Fair Play',
    icon: <Gamepad2 className="w-4 h-4 text-indigo-600" />,
    formula: '\\text{Fair Play: } P(\\text{Győzelem}) = 50\\% \\iff \\text{Egyenlő esélyek}',
    note: 'Tiszta stratégia (sakk, Nim): nincs véletlen. Szerencsejáték (lottó, rulett): csak a véletlen dönt. Vegyes (póker, társasok): véletlen + taktika.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="42" height="34" rx="4" fill="#e0e7ff" stroke="#a5b4fc" />
        <text x="31" y="22" className="text-[6px] font-bold fill-indigo-900" textAnchor="middle">Stratégiai</text>
        <text x="31" y="32" className="text-[5px] fill-indigo-700" textAnchor="middle">Sakk, Nim</text>

        <rect x="59" y="8" width="42" height="34" rx="4" fill="#fef3c7" stroke="#fcd34d" />
        <text x="80" y="22" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">Szerencse</text>
        <text x="80" y="32" className="text-[5px] fill-amber-700" textAnchor="middle">Kocka, Lottó</text>

        <rect x="108" y="8" width="42" height="34" rx="4" fill="#d1fae5" stroke="#6ee7b7" />
        <text x="129" y="22" className="text-[6px] font-bold fill-emerald-900" textAnchor="middle">Vegyes</text>
        <text x="129" y="32" className="text-[5px] fill-emerald-700" textAnchor="middle">Póker, Társas</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Nim-játék & 4-es Modulus',
    icon: <Trophy className="w-4 h-4 text-indigo-600" />,
    formula: '\\text{Lépésösszeg} = 1 + 3 = 4 \\implies \\text{Cél: } 4k + 1 \\text{ gyufa}',
    note: 'Ha felváltva 1, 2 vagy 3 gyufát lehet elvenni és az utolsó veszít, az ellenfél lépését mindig 4-re egészítjük ki. Célok: 17, 13, 9, 5, végül 1 gyufa!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="130" height="30" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
        <text x="80" y="24" className="text-[7.5px] font-black fill-indigo-900" textAnchor="middle">21 → 17 → 13 → 9 → 5 → 1</text>
        <text x="80" y="34" className="text-[6px] font-bold fill-indigo-600" textAnchor="middle">Mindig 4 gyufát tüntetünk el körönként</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Két Kocka 36 Kimenetele',
    icon: <Dices className="w-4 h-4 text-indigo-600" />,
    formula: 'P(\\text{Összeg = 7}) = \\frac{6}{36} = \\frac{1}{6} \\quad (\\text{A leggyakoribb})',
    note: '6 · 6 = 36 egyenlő esélyű pár van. A 7 összeg a leggyakoribb (6 eset), míg a 2 és 12 a legritkább (1-1 eset). Páros összeg: 18/36 = 50%.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="28" width="16" height="14" rx="2" fill="#93c5fd" />
        <rect x="42" y="20" width="16" height="22" rx="2" fill="#60a5fa" />
        <rect x="64" y="12" width="16" height="30" rx="2" fill="#4f46e5" />
        <rect x="86" y="20" width="16" height="22" rx="2" fill="#60a5fa" />
        <rect x="108" y="28" width="16" height="14" rx="2" fill="#93c5fd" />
        <text x="72" y="9" className="text-[6.5px] font-bold fill-indigo-900" textAnchor="middle">7 (Csúcs: 6/36)</text>
        <text x="28" y="48" className="text-[5.5px] fill-slate-500" textAnchor="middle">2-5</text>
        <text x="72" y="48" className="text-[5.5px] font-bold fill-indigo-700" textAnchor="middle">7</text>
        <text x="116" y="48" className="text-[5.5px] fill-slate-500" textAnchor="middle">9-12</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Függetlenség & Monty Hall',
    icon: <ShieldAlert className="w-4 h-4 text-indigo-600" />,
    formula: 'P(A \\cap B) = P(A) \\cdot P(B), \\quad P(\\text{Váltás})=2/3',
    note: 'A kockának és érmének nincs memóriája: korábbi dobások nem hatnak a jövőbeliekre. A Monty Hallnál az ajtóváltással a nyerési esély 1/3-ról 2/3-ra duplázódik.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="36" height="30" rx="4" fill="#fee2e2" stroke="#fca5a5" />
        <text x="33" y="24" className="text-[6.5px] font-bold fill-rose-900" textAnchor="middle">Maradás</text>
        <text x="33" y="34" className="text-[6px] font-black fill-rose-700" textAnchor="middle">1 / 3 esély</text>

        <rect x="65" y="10" width="80" height="30" rx="4" fill="#dcfce7" stroke="#86efac" />
        <text x="105" y="24" className="text-[6.5px] font-bold fill-emerald-900" textAnchor="middle">Ajtóváltás</text>
        <text x="105" y="34" className="text-[6px] font-black fill-emerald-700" textAnchor="middle">2 / 3 nyerési esély!</text>
      </svg>
    )
  }
];

const level1Questions: LevelConfig['questions'] = [
  {
    id: 'g8-ch6-pg-q1',
    category: 'Játéktípusok',
    question: 'Melyik játék tartozik a TISZTA STRATÉGIAI játékok közé az alábbiak közül?',
    options: [
      'A sakk, mert a bábuk lépései teljesen ismertek, és nem szerepel benne kocka vagy keverés',
      'A kaszinói rulett, mert meg lehet jósolni a golyó gurulását',
      'Az ötöslottó, mert a számokat mi magunk választhatjuk ki',
      'A Monopoly, mert a házak építése stratégiai döntés'
    ],
    correctAnswer: 0,
    explanation: 'A sakkban, amőbában és a Nim-játékban semmiféle véletlen elem nincs, a felek teljes információval rendelkeznek a tábla állásáról, így tiszta stratégiai játékok.',
    hint: 'Gondold át: melyik játékban nem dönt soha a dobókocka vagy a lapkeverés?'
  },
  {
    id: 'g8-ch6-pg-q2',
    category: 'Kő-papír-olló',
    question: 'Két játékos kő-papír-ollót játszik. Hányféle különböző kimenetele lehet egyetlen menetnek?',
    options: ['3 · 3 = 9 kimenetel', '3 + 3 = 6 kimenetel', '3 kimenetel', '12 kimenetel'],
    correctAnswer: 0,
    explanation: 'Mindkét játékos függetlenül 3-féle jelet mutathat (Kő, Papír, Olló). Az összes lehetséges párosítás: 3 · 3 = 9 kimenetel.',
    hint: 'Az 1. játékosnak 3 választása van, és a 2. játékosnak is 3 választása van.'
  },
  {
    id: 'g8-ch6-pg-q3',
    category: 'Kő-papír-olló esélyek',
    question: 'Mekkora a valószínűsége annak, hogy kő-papír-ollóban egyetlen menetben DÖNTETLEN születik?',
    options: [
      '3 / 9 = 1 / 3 (kb. 33,3%)',
      '1 / 2 (50%)',
      '1 / 9 (kb. 11,1%)',
      '1 / 6 (kb. 16,7%)'
    ],
    correctAnswer: 0,
    explanation: 'A 9 lehetséges esetből pontosan 3 esetben mutatnak azonosat: (kő, kő), (papír, papír), (olló, olló). Így P = 3/9 = 1/3.',
    hint: 'Számold össze a döntetlen eseteket: kő-kő, papír-papír, olló-olló.'
  },
  {
    id: 'g8-ch6-pg-q4',
    category: 'Fair Play fogalma',
    question: 'Mikor mondjuk egy kétszemélyes szerencsejátékra, hogy IGAZSÁGOS (Fair Play)?',
    options: [
      'Ha mindkét játékos nyerési valószínűsége pontosan megegyezik (50% - 50%)',
      'Ha az a játékos nyer, aki hamarabb kezdi a játékot',
      'Ha nincs tétje a játéknak, és barátságos meccset játszanak',
      'Ha legalább 100 kört játszanak egymás után'
    ],
    correctAnswer: 0,
    explanation: 'Egy játék akkor igazságos matematikailag, ha egyik fél sincs előnyösebb helyzetben a szabályok miatt, azaz nyerési esélyeik azonosak (vagy várható nyereményük egyenlő).',
    hint: 'Gondolj az esélyek egyenlőségére!'
  },
  {
    id: 'g8-ch6-pg-q5',
    category: 'Érmefeldobás',
    question: 'Egy szabályos pénzérmét feldobva mekkora az esélye annak, hogy FEJET dobunk?',
    options: ['1 / 2 (50%)', '1 / 3 (33,3%)', '1 / 4 (25%)', '1 / 6 (16,7%)'],
    correctAnswer: 0,
    explanation: 'A szabályos érmének 2 egyenlően valószínű kimenetele van (Fej és Írás). A fej dobásának esélye 1 a 2-ből, azaz 1/2 = 50%.',
    hint: 'Összes kimenetel: 2, kedvező kimenetel: 1.'
  },
  {
    id: 'g8-ch6-pg-q6',
    category: 'Két érme dobása',
    question: 'Két szabályos pénzérmét dobunk fel egyszerre. Mekkora az esélye annak, hogy MINDKÉT érmén FEJ lesz?',
    options: ['1 / 4 (25%)', '1 / 2 (50%)', '1 / 3 (33,3%)', '3 / 4 (75%)'],
    correctAnswer: 0,
    explanation: 'A 4 lehetséges kimenetel: (F,F), (F,Í), (Í,F), (Í,Í). Csak 1 kedvező kimenetel van a 4-ből: P = 1/4 = 25%.',
    hint: 'Írd fel a négy lehetséges párt: FF, FÍ, ÍF, ÍÍ.'
  },
  {
    id: 'g8-ch6-pg-q7',
    category: 'Tiszta szerencsejáték',
    question: 'Melyik az alábbiak közül TISZTA SZERENCSEJÁTÉK?',
    options: [
      'A tombolahúzás, mert a nyertes szelvény kihúzása kizárólag a véletlenen múlik',
      'Az amőba (ötödölő), mert a kezdő játékos mindig nyer',
      'A sakk, mert a király lépései rögzítettek',
      'A dámajáték, mert kötelező az ütés'
    ],
    correctAnswer: 0,
    explanation: 'A tombolánál semmilyen játékosi tudás vagy taktika nem változtatja meg a kihúzott szelvény sorszámát; tiszta véletlen.',
    hint: 'Melyiknél nem számít semmilyen emberi döntés vagy ügyesség?'
  },
  {
    id: 'g8-ch6-pg-q8',
    category: 'Kockadobás esélye',
    question: 'Egy szabályos hatoldalú dobókockával dobva mekkora az esélye annak, hogy 5-nél nagyobb számot dobunk?',
    options: ['1 / 6 (kb. 16,7%)', '2 / 6 = 1 / 3', '5 / 6', '1 / 2'],
    correctAnswer: 0,
    explanation: 'Az 5-nél szigorúan nagyobb szám egyedül a 6-os (1 kedvező eset a 6 lehetséges kimenetelből: 1, 2, 3, 4, 5, 6). Így P = 1/6.',
    hint: 'Hány olyan szám van a dobókockán, ami szigorúan nagyobb 5-nél?'
  },
  {
    id: 'g8-ch6-pg-q9',
    category: 'Vegyes játékok',
    question: 'Miért nevezzük a pókert vagy a Monopoly-t VEGYES játéknak?',
    options: [
      'Mert a véletlen (lapok keverése, kockadobás) és a stratégiai döntések (taktika, vásárlás) egyszerre határozzák meg a kimenetelt',
      'Mert felnőttek és gyerekek is játszhatják együtt',
      'Mert mindkettőben csak papírpénzzel lehet fizetni',
      'Mert a játék végén nincs egyértelmű vesztes'
    ],
    correctAnswer: 0,
    explanation: 'A vegyes játékokban van véletlen elem (kockadobás, kártyahúzás), de a játékos okos döntéseivel jelentősen növelheti a hosszú távú nyerési esélyeit.',
    hint: 'Keresd a véletlen és a stratégiai döntések együttes jelenlétét!'
  },
  {
    id: 'g8-ch6-pg-q10',
    category: 'Biztos és lehetetlen esemény',
    question: 'Egy szabályos dobókockával dobva mekkora a valószínűsége annak, hogy 0 és 7 közötti egész számot kapunk?',
    options: ['1 (100%, biztos esemény)', '0 (lehetetlen esemény)', '6 / 7', '1 / 6'],
    correctAnswer: 0,
    explanation: 'A dobókocka lehetséges értékei: 1, 2, 3, 4, 5, 6. Mind a hat érték 0 és 7 közé esik, így ez egy biztos esemény, valószínűsége 6/6 = 1 (100%).',
    hint: 'A dobható számok: 1, 2, 3, 4, 5, 6. Mindegyik 0 és 7 között van?'
  }
];

const level2Questions: LevelConfig['questions'] = [
  {
    id: 'g8-ch6-pg-q11',
    category: 'Két kocka összege',
    question: 'Két szabályos dobókockával egyszerre dobunk. Melyik összeg kidobására van a LEGNAGYOBB esélyünk?',
    options: [
      'A 7-es összegre, mert 6 különböző dobáspárral is előállhat a 36-ból',
      'A 6-os összegre, mert 6 oldalú a kocka',
      'A 12-es összegre, mert a legnagyobb összeg a legértékesebb',
      'Bármelyik 2 és 12 közötti összegre pontosan ugyanakkora az esély'
    ],
    correctAnswer: 0,
    explanation: 'A 7-es összeg 6 párral dobható: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Valószínűsége 6/36 = 1/6 (kb. 16,7%), ami a legmagasabb.',
    hint: 'Írd fel, hányféleképpen jöhet ki a 7: (1,6), (2,5), (3,4)...'
  },
  {
    id: 'g8-ch6-pg-q12',
    category: 'Két kocka ritka összegei',
    question: 'Két kockával dobva melyik két összeg kidobásának valószínűsége a LEGKISEBB?',
    options: [
      'A 2 és a 12 (mindkettőre csupán 1-1 eset adódik a 36-ból: (1,1) és (6,6))',
      'A 3 és a 11',
      'A 6 és a 8',
      'A 7 és a 8'
    ],
    correctAnswer: 0,
    explanation: 'A 2-es összeg csak (1,1), a 12-es összeg csak (6,6) dobással érhető el. Így P(2) = 1/36 és P(12) = 1/36, ezek a legritkábbak.',
    hint: 'Melyik összegeket lehet csak egyetlenegy módon kidobni?'
  },
  {
    id: 'g8-ch6-pg-q13',
    category: 'Nim-játék 21 gyufával',
    question: 'A 21 gyufaszálas játékban a játékosok felváltva 1, 2 vagy 3 gyufát vehetnek el. Az veszít, aki az utolsót kénytelen elvenni. Hány gyufát vegyen el az 1. játékos a kezdéskor, hogy nyerő pozícióba kerüljön?',
    options: [
      'Nem tud nyerni, ha a 2. játékos jól játszik, mert 21 = 4 · 5 + 1 vesztes állás a kezdőnek!',
      '3 gyufát kell elvennie',
      '1 gyufát kell elvennie',
      'Mindig a felét, azaz 10 gyufát'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 + 3 = 4, a nyerő stratégia a 4k + 1 (1, 5, 9, 13, 17, 21) gyufák hagyása. Mivel a kezdőállás pontosan 21 (ami 4·5 + 1), a kezdő játékos vesztes pozícióban van: a 2. játékos mindig 4-re tudja kiegészíteni a lépést!',
    hint: 'Számold ki: 21 osztva 4-gyel mennyi maradékot ad?'
  },
  {
    id: 'g8-ch6-pg-q14',
    category: 'Nim-játék kiegészítés',
    question: 'A 21 gyufás Nim-játékban (1, 2 vagy 3 gyufa vehető) az ellenfeled 2 gyufát vett el az asztalról. Hány gyufát kell elvenned, hogy fenntartsd a 4-es modulusú kontrollt?',
    options: [
      'Pontosan 2 gyufát (mert 2 + 2 = 4)',
      '1 gyufát',
      '3 gyufát',
      'Attól függ, hány gyufa maradt még összesen'
    ],
    correctAnswer: 0,
    explanation: 'A nyerő stratégia alapja, hogy minden körben pontosan 4 gyufát tüntetünk el az ellenféllel együtt: ha ő 1-et vesz, mi 3-at; ha ő 2-t, mi 2-t; ha ő 3-at, mi 1-et.',
    hint: 'Egészítsd ki az ellenfél 2 gyufáját úgy, hogy a kettőtök lépése együtt 4 legyen!'
  },
  {
    id: 'g8-ch6-pg-q15',
    category: 'Két kocka páros összege',
    question: 'Két kockával dobva mekkora az esélye annak, hogy az összeg PÁROS szám lesz?',
    options: [
      '18 / 36 = 1 / 2 (pontosan 50%)',
      '12 / 36 = 1 / 3',
      '20 / 36',
      '1 / 6'
    ],
    correctAnswer: 0,
    explanation: 'A 36 lehetséges esetből pontosan a felében páros az összeg (18 eset: páros+páros=páros 9 eset, páratlan+páratlan=páros 9 eset). Valószínűsége 18/36 = 1/2 = 50%.',
    hint: 'Páros összeg jön ki: páros+páros és páratlan+páratlan dobásból is.'
  },
  {
    id: 'g8-ch6-pg-q16',
    category: 'Fair kockajáték',
    question: 'Anna és Béla kockajátékot játszanak egy kockával. Anna nyer, ha 1-est vagy 2-est dobnak; Béla nyer, ha 3, 4, 5 vagy 6-ost dobnak. Hogyan tehető ez a játék IGAZSÁGOSSÁ?',
    options: [
      'Ha Anna győzelem esetén 2 pontot (vagy kétszer akkora nyereményt) kap, Béla pedig 1 pontot',
      'Nem tehető igazságossá',
      'Ha Béla kétszer dobhat egymás után',
      'Ha 7-oldalú kockával játszanak'
    ],
    correctAnswer: 0,
    explanation: 'Anna esélye 2/6 = 1/3, Béla esélye 4/6 = 2/3. Mivel Béla esélye kétszer akkora, Anna győzelméért kétszer akkora jutalom (várható nyeremény kiegyenlítése) kell az igazságos játékhoz.',
    hint: 'Hányszor nagyobb esélye van Bélának nyerni, mint Annának?'
  },
  {
    id: 'g8-ch6-pg-q17',
    category: 'Két kocka: 7 vagy 11',
    question: 'Két kockával dobva mekkora a valószínűsége annak, hogy az összeg 7 VAGY 11 lesz?',
    options: [
      '(6 + 2) / 36 = 8 / 36 = 2 / 9 (kb. 22,2%)',
      '6 / 36',
      '7 / 36',
      '11 / 36'
    ],
    correctAnswer: 0,
    explanation: 'A 7-es összegre 6 eset van, a 11-es összegre 2 eset ((5,6) és (6,5)). Ezek egymást kizáró események, így 6 + 2 = 8 eset a 36-ból: P = 8/36 = 2/9.',
    hint: 'Add össze a 7-es összeg eseteit (6 db) és a 11-es összeg eseteit (2 db).'
  },
  {
    id: 'g8-ch6-pg-q18',
    category: 'Három érme feldobása',
    question: 'Három szabályos pénzérmét dobunk fel egyszerre. Mekkora az esélye annak, hogy MINDEGYIK érmén ugyanaz az oldal (mind fej VAGY mind írás) lesz?',
    options: [
      '2 / 8 = 1 / 4 (25%)',
      '1 / 8 (12,5%)',
      '1 / 2 (50%)',
      '3 / 8'
    ],
    correctAnswer: 0,
    explanation: 'Három érménél az összes eset: 2 · 2 · 2 = 8 eset. Ebből csupán kettőben egyezik mindhárom: (FFF) és (ÍÍÍ). P = 2/8 = 1/4.',
    hint: 'Összesen 2^3 = 8 kimenetel van. Hány esetben azonos mindhárom?'
  },
  {
    id: 'g8-ch6-pg-q19',
    category: 'Kocka dupla dobás',
    question: 'Két kockával dobva mekkora az esélye annak, hogy „duplát” dobunk (mindkét kockán ugyanaz a szám áll: 1-1, 2-2, 3-3, 4-4, 5-5, 6-6)?',
    options: [
      '6 / 36 = 1 / 6 (kb. 16,7%)',
      '1 / 36',
      '2 / 6 = 1 / 3',
      '12 / 36'
    ],
    correctAnswer: 0,
    explanation: 'Pontosan 6-féle dupla lehetséges a 36 kombinációból: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). Így P = 6/36 = 1/6.',
    hint: '6 különböző számból alkotható dupla dobás a 36 lehetőségből.'
  },
  {
    id: 'g8-ch6-pg-q20',
    category: 'Nim 15 gyufával',
    question: 'Egy Nim-játékban 15 gyufaszál van az asztalon, 1, 2 vagy 3 gyufa vehető el, és az veszít, aki az utolsót kénytelen elvenni. Hány gyufát vegyen el az 1. játékos, hogy nyerő állásba jusson?',
    options: [
      '2 gyufát (mert így 13 gyufát hagy az ellenfélnek, ami 4k + 1 alakú: 4 · 3 + 1 = 13)',
      '1 gyufát',
      '3 gyufát',
      'Nem tud nyerni'
    ],
    correctAnswer: 0,
    explanation: 'A legközelebbi 4k + 1 alakú célállás a 13 (mert 13 = 4·3 + 1). Ha 15-ből elvisz 2-t, pontosan 13-at hagy, amivel átveszi a biztos nyerő pozíciót!',
    hint: 'Melyik 4k + 1 alakú szám van legközelebb a 15 alatt? (1, 5, 9, 13, 17...)'
  }
];

const level3Questions: LevelConfig['questions'] = [
  {
    id: 'g8-ch6-pg-q21',
    category: 'Szerencsejátékosok tévedése',
    question: 'Egy szabályos érmével egymás után hétszer egymás után FEJET dobtunk. Mekkora a valószínűsége annak, hogy a 8. dobás ÍRÁS lesz?',
    options: [
      'Pontosan 1 / 2 (50%), mert a dobások függetlenek, az érmének nincs memóriája',
      'Sokkal nagyobb, mint 50%, mert a valószínűségnek „kiegyenlítődnie” kell',
      'Közel 100%, mert nyolc fej egymás után szinte lehetetlen',
      'Sokkal kisebb, mint 50%, mert a fejnek lendülete van'
    ],
    correctAnswer: 0,
    explanation: 'Ez a híres szerencsejátékosok tévedése (gambler\'s fallacy). A fizikai érmének nincsen memóriája, minden egyes újabb feldobás teljesen független a korábbiaktól: P(írás) = 1/2.',
    hint: 'Gondold át: befolyásolhatja-e a korábbi dobás a következő pörgést a levegőben?'
  },
  {
    id: 'g8-ch6-pg-q22',
    category: 'Monty Hall paradoxon',
    question: 'A Monty Hall játékban 3 zárt ajtó közül 1 mögött vadonatúj autó, 2 mögött kecske van. Kiválasztod az 1. ajtót. A műsorvezető (aki tudja, mi van mögöttük) kinyitja a 3. ajtót, ami mögött kecske áll, majd megkérdezi: Váltani akarsz a 2. ajtóra? Mit mond a matematika?',
    options: [
      'MINDIG érdemes váltani, mert ajtóváltással a nyerési esély 2/3-ra (kb. 66,7%) nő!',
      'Teljesen mindegy, mert a megmaradt 2 ajtónál 50-50% az esély',
      'Nem érdemes váltani, a megérzésre kell hallgatni',
      'Csak akkor érdemes váltani, ha a kecske fehér volt'
    ],
    correctAnswer: 0,
    explanation: 'Kezdéskor 1/3 eséllyel választottuk az autót és 2/3 eséllyel kecskét. Ha kecskét választottunk (amire 2/3 az esély), a műsorvezető kénytelen a másik kecskét megmutatni, így a megmaradt zárt ajtó mögött biztosan autó van! Váltással tehát 2/3 a nyerési esély.',
    hint: 'Mekkora volt az esélye a legelején annak, hogy rossz (kecskés) ajtót jelöltél meg?'
  },
  {
    id: 'g8-ch6-pg-q23',
    category: 'Szimmetria stratégia',
    question: 'Két játékos egy kör alakú asztalra felváltva azonos méretű ötforintos érméket helyez le úgy, hogy azok nem érhetnek egymásra és nem lóghatnak le az asztalról. Az veszít, aki nem tud új érmét letenni. Milyen nyerő stratégiája van az 1. játékosnak?',
    options: [
      'Első lépésként letesz egy érmét pontosan az asztal középpontjára, majd minden további lépésben az ellenfél érméjének középpontra vett tükörképét rakja le',
      'Mindig az asztal legszélére kell raknia az érméket',
      'Mindig a lehető legközelebb kell tennie az ellenfél érméjéhez',
      'Nincs nyerő stratégiája a kezdőnek'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetria elv alapján, ha a kezdő elfoglalja a szimmetriaközéppontot, a kör szimmetriája miatt bármilyen érvényes lépést tesz a 2. játékos, annak középpontos tükörképe garantáltan szabad és érvényes hely marad az 1. játékosnak!',
    hint: 'A körnek van egy egyedülálló pontja: a középpontja. Mi történik, ha azt elfoglalod, és utána mindent tükrözöl?'
  },
  {
    id: 'g8-ch6-pg-q24',
    category: 'Félbeszakadt játék igazságos osztozkodása',
    question: 'Péter és Pál érmefeldobásos játékot játszanak azonos téttel (összesen 16 aranyért): az nyeri az egész kasszát, aki előbb eléri a 3 győzelmet. A játék 2:1-es Péter-vezetésnél félbeszakad. Hogyan kell igazságosan elosztani a 16 aranyat?',
    options: [
      'Péternek 12 arany (3/4 rész), Pálnak 4 arany (1/4 rész) jár',
      'Fele-fele arányban: 8-8 arany',
      'Péternek 10 arany, Pálnak 6 arany (2:1 arányban)',
      'Péter kapja mind a 16 aranyat, mert ő vezetett'
    ],
    correctAnswer: 0,
    explanation: 'Ez Pascal és Fermat híres feladványa: legfeljebb 2 további dobás dönthetett volna (FF, FÍ, ÍF, ÍÍ). Pál csak akkor nyerhetett volna, ha mindkét következő dobás írás (ÍÍ: 1/4 esély). Péter a 4 esetből 3-ban nyert volna (3/4 esély). Így a 16 arany 3/4 része (12 arany) Pétert, 1/4 része (4 arany) Pált illeti!',
    hint: 'Hány dobás kellett volna még a végső győzelemhez Pálnak és Péternek?'
  },
  {
    id: 'g8-ch6-pg-q25',
    category: 'Visszalépéses elemzés',
    question: 'Mit nevezünk a játékelméletben VISSZALÉPÉSES ELEMZÉSNEK (retrográd analízisnek)?',
    options: [
      'A játék elemzését a lehetséges végállásokból (győzelem/vereség) indulva, lépésről lépésre visszafelé haladva a kezdőállásig végezzük',
      'Azt, amikor a vesztes fél visszakéri a megtett lépését',
      'Azt, amikor a dobókockát visszafelé pörgetik az asztalon',
      'Egy olyan számítógépes programot, ami visszavonja a hibás lépéseket'
    ],
    correctAnswer: 0,
    explanation: 'A véges, teljes információjú játékoknál (mint a Nim vagy amőba) a biztos végállásokból indulunk ki visszafelé: megjelöljük a nyerő és vesztes pozíciókat, így megkapjuk a hibátlan játékfát.',
    hint: 'A végcéltól visszafelé építkező logikai következtetés.'
  },
  {
    id: 'g8-ch6-pg-q26',
    category: 'Két kocka: Legalább egy 6-os',
    question: 'Két szabályos dobókockával dobva mekkora az esélye annak, hogy LEGALÁBB EGYIK kockával 6-ost dobunk?',
    options: [
      '11 / 36 (kb. 30,6%)',
      '12 / 36 = 1 / 3',
      '2 / 6 = 1 / 3',
      '1 / 36'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett eseménnyel a legegyszerűbb: Annak esélye, hogy egyik kockával sem dobunk 6-ost: (5/6) · (5/6) = 25/36. A komplementer esemény (legalább egy 6-os): 1 - 25/36 = 11/36.',
    hint: 'Számold ki az ellentétét: hány olyan dobáspár van a 36-ból, ahol egyetlen 6-os sincs? (5 · 5 = 25).'
  },
  {
    id: 'g8-ch6-pg-q27',
    category: 'Kombinált kártyajáték esély',
    question: 'Egy 32 lapos magyar kártyacsomagból egyetlen lapot húzunk. Mekkora az esélye annak, hogy PIROS színű lapot VAGY ÁSZ-t húzunk?',
    options: [
      '11 / 32 (mert 8 piros lap + 3 másik ász = 11 kedvező lap)',
      '12 / 32 (8 piros + 4 ász)',
      '8 / 32 = 1 / 4',
      '4 / 32 = 1 / 8'
    ],
    correctAnswer: 0,
    explanation: 'A pakliban 8 piros lap van (köztük a piros ász). A többi színben (tök, makk, zöld) van még 3 darab ász. A piros ászt nem szabad kétszer számolni: 8 + 3 = 11 lap a 32-ből. P = 11/32.',
    hint: 'Vigyázz! A piros ász mindkét csoportba beletartozik, ne számold kétszer!'
  },
  {
    id: 'g8-ch6-pg-q28',
    category: 'Születésnap-paradoxon logikája',
    question: 'Hány embernek kell tartózkodnia egy szobában ahhoz, hogy már TÖBB MINT 50% eséllyel legyen közöttük legalább kettő, akiknek ugyanarra a napra esik a születésnapjuk?',
    options: [
      'Csupán 23 ember elég hozzá!',
      'Legalább 183 ember (az év napjainak fele)',
      'Legalább 366 ember',
      'Pontosan 50 ember'
    ],
    correctAnswer: 0,
    explanation: 'Bár az év 365 napos, 23 embernél már 23 · 22 / 2 = 253 lehetséges párkapcsolatot vizsgálunk! Az ellentett esemény valószínűsége 23 embernél 50% alá esik, így a megegyezés esélye meghaladja az 50%-ot.',
    hint: 'Gondolj a párok számára: nem 1 ember születésnapját vetjük össze a többiekével, hanem bármelyik kettőét!'
  },
  {
    id: 'g8-ch6-pg-q29',
    category: 'Kockajáték várható érték',
    question: 'Egy játékban 100 Ft a belépő. Ha 6-ost dobsz a kockával, kapsz 600 Ft-ot, egyébként semmit. Igazságos ez a játék?',
    options: [
      'Igen, teljesen igazságos, mert a várható nyeremény: (1/6) · 600 = 100 Ft, ami pontosan megegyezik a belépési díjjal',
      'Nem, mert a játékosok 5/6 részben veszítenek',
      'Nem, mert a ház mindig veszít',
      'Csak akkor, ha 10-szer dobnak egymás után'
    ],
    correctAnswer: 0,
    explanation: 'A nyeremény várható értéke E = (1/6) · 600 Ft + (5/6) · 0 Ft = 100 Ft. Mivel a részvételi díj pontosan 100 Ft, a játékos várható nettó nyeresége 0 Ft: ez egy tisztességes, igazságos játék.',
    hint: 'Számold ki: 6 dobásból átlagosan hányszor nyersz és mennyit fizetsz be összesen?'
  },
  {
    id: 'g8-ch6-pg-q30',
    category: 'Nim-játék általánosítás',
    question: 'Ha a Nim-játékban egyszerre legfeljebb M darab gyufa vehető el és az utolsót elvevő veszít, mi az ellenfélnek hagyandó vesztes állások általános képlete?',
    options: [
      'Olyan n darabszámú gyufát kell hagyni, amelyre n ≡ 1 mod (M + 1), azaz n = (M + 1) · k + 1',
      'Mindig páros számú gyufát: 2k',
      'Mindig prímszámú gyufát',
      'Olyan számot, ami osztható M-mel'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a lépéspár során legfeljebb M + 1 gyufa tüntethető el biztosan (ha ő x-et vesz, mi M + 1 - x-et), a periódus hossza M + 1. Az utolsó gyufa miatt a vesztő pozíciók: (M + 1)k + 1.',
    hint: 'Ha M = 3 gyufa vehető, a periódus 3 + 1 = 4. Mi a periódus, ha M gyufa vehető?'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Játéktípusok',
    subtitle: 'Kő-papír-olló esélyei, érmefeldobások, Fair Play és tiszta szerencse vs. stratégiai játékok',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak & Esélyek',
    badgeText: '10 Feladat • Alapszint',
    questions: level1Questions
  },
  2: {
    level: 2,
    title: '2. Szint: Kockák, Érmék és a Nim-játék',
    subtitle: 'Két dobókocka 36 kimenetele, leggyakoribb összegek, páros esélyek és a 21 gyufás Nim-stratégia',
    range: '11 - 20. feladat',
    focus: 'Kockák & Nim-stratégia',
    badgeText: '10 Feladat • Középhaladó',
    questions: level2Questions
  },
  3: {
    level: 3,
    title: '3. Szint: Paradoxonok, Tévedések és Játékelmélet',
    subtitle: 'Monty Hall probléma, szerencsejátékosok tévedése, szimmetria elv és félbeszakadt játékok',
    range: '21 - 30. feladat',
    focus: 'Játékelmélet & Paradoxonok',
    badgeText: '10 Feladat • Mester szint',
    questions: level3Questions
  }
};

export const ProbabilityGameQuiz: React.FC<ProbabilityGameQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="probability-games"
      topicTitle="Játék: Stratégia és Szerencse"
      badge="VI. FEJEZET • 8. OSZTÁLY"
      documentId="probability-games-quiz-doc"
      pdfFilename="8_osztaly_jatek_strategia_szerencse_kviz.pdf"
      title="Játék: Stratégia és Szerencse Kvíz"
      subtitle="Kétszemélyes logikai játékok, nyerő stratégiák, Nim-játék, kocka- és érme-valószínűségek, Fair Play és döntéselmélet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Kösd össze a játékfajtákat, kockadobások esélyeit és a nyerő szabályokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Játéktípusok és Alapfogalmak',
              subtitle: 'Kösd össze a játékfajtákat, alapfogalmakat és a Fair Play szabályait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapfogalmak',
              focus: 'Fogalompárok'
            },
            2: {
              title: '2. Szint: Kockák, Érmék és a Nim-játék',
              subtitle: 'Találd meg a két kocka összegeinek és a Nim-stratégiának a párjait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Kockák és Nim',
              focus: 'Kombinációk'
            },
            3: {
              title: '3. Szint: Paradoxonok és Játékelmélet',
              subtitle: 'Párosítsd a haladó játékelméleti fogalmakat, Monty Hallt és a függetlenséget!',
              rangeLabel: 'Párok:',
              range: '8 pár • Játékelmélet',
              focus: 'Paradoxonok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <ProbabilityGameMatcher
              key={`pg-matcher-${level}`}
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
          subtitle: 'Kategorizáld a játékokat jellegük szerint, a két kocka összegeit és az állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Játékok Csoportosítása',
              subtitle: 'Válogasd szét: Tiszta stratégia, Tiszta szerencsejáték vagy Vegyes játék!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Játéktípusok'
            },
            2: {
              title: '2. Szint: Két Kocka Összegeinek Gyakorisága',
              subtitle: 'Csoportosítsd az összegeket: Ritka (1-2), Közepes (3-4) vagy Leggyakoribb (5-6 eset)!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: '36 eset összegei'
            },
            3: {
              title: '3. Szint: Játékhelyzetek és Állítások Megítélése',
              subtitle: 'Döntsd el: Helyes stratégia, Szerencsejátékosok tévedése vagy Fair Play helyzet!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Játékelméleti döntések'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <ProbabilityGameSorter
              key={`pg-sorter-${level}`}
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

export default ProbabilityGameQuiz;
