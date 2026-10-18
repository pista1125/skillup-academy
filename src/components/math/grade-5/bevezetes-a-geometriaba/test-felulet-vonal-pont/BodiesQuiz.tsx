import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { BodiesMatcher } from './BodiesMatcher';
import { BodiesSorter } from './BodiesSorter';
import { Box, Layers, Shapes, CircleDot, Sparkles, BookOpen } from 'lucide-react';

export interface BodiesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ========================================================
  // --- 1. SZINT: DIMENZIÓK ÉS A NÉGY ALAPFOGALOM ---
  // ========================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Hány dimenziója (kiterjedése) van egy térbeli testnek (pl. kockának vagy gömbnek)?',
    options: [
      '3 dimenziója (hosszúság, szélesség, magasság)',
      '2 dimenziója (csak hosszúság és szélesség)',
      '1 dimenziója (csak hosszúság)',
      '0 dimenziója (nincs kiterjedése)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <path d="M10 16 L25 8 L40 16 L25 24 Z" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
        <path d="M10 16 L25 24 L25 40 L10 32 Z" className="fill-emerald-400 stroke-emerald-700" strokeWidth="1.5" />
        <path d="M25 24 L40 16 L40 32 L25 40 Z" className="fill-emerald-300 stroke-emerald-600" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A testek 3 dimenziós alakzatok (3D): van hosszuk, szélességük és magasságuk, teret töltenek be és térfogatuk (űrtartalmuk) van.',
    hint: 'Gondolj egy kézbe vehető dobozra: 3 irányban is mérhető a mérete!',
    breakdown: [
      { label: '3 dimenzió', value: 'Hosszúság, szélesség, magasság' },
      { label: 'Jellemző', value: 'Teret tölt be, térfogata van' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Melyik geometriai alakzatnak NINCS SEMMILYEN kiterjedése (0 dimenziós), csupán egy hely a térben?',
    options: [
      'A pont (csúcs)',
      'A szakasz',
      'A négyzet',
      'A kocka'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="4.5" className="fill-blue-600" />
        <text x="20" y="11" textAnchor="middle" className="text-[12px] font-black fill-blue-800">P</text>
      </svg>
    ),
    explanation: 'A pont 0 dimenziós geometriai alapfogalom: nincs hossza, szélessége sem vastagsága, kizárólag egy pontos helyet jelöl ki a térben vagy a síkon.',
    hint: 'A ceruzád hegyével rajzolt apró pötty a pont modellje.',
    breakdown: [
      { label: 'Pont dimenziója', value: '0D (kiterjedés nélküli)' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hány dimenziója van egy vonalnak (pl. szakasznak vagy egyenesnek)?',
    options: [
      '1 dimenziója (egyetlen mérhető mérete a hosszúság)',
      '2 dimenziója (hossza és szélessége is van)',
      '3 dimenziója',
      '0 dimenziója'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-10 mx-auto" viewBox="0 0 60 30" fill="none">
        <line x1="5" y1="15" x2="55" y2="15" className="stroke-indigo-600" strokeWidth="3" />
        <circle cx="10" cy="15" r="3" className="fill-indigo-700" />
        <circle cx="50" cy="15" r="3" className="fill-indigo-700" />
      </svg>
    ),
    explanation: 'A vonalak (egyenesek, szakaszok, élek) 1 dimenziósak: csak hosszúságuk van, szélességük és vastagságuk nincsen.',
    hint: 'Gondolj egy vékony cérnaszálra: csak azt tudod lemérni, milyen hosszú!',
    breakdown: [
      { label: 'Vonal dimenziója', value: '1D (csak hosszúság)' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Mi határolja a térbeli testeket a külvilágtól?',
    options: [
      'Határfelületek (lapok)',
      'Csak és kizárólag pontok',
      'Gondolatban meghúzott vonalak',
      'Semmi, a testeknek nincsen határuk'
    ],
    correctAnswer: 0,
    explanation: 'A testeket felületek (lapok) zárják körül. Ezek a felületek lehetnek sík felületek (pl. a kocka négyzetlapjai) vagy görbe felületek (pl. a gömbfelület, a henger palástja).',
    hint: 'Amikor kézbe veszel egy dobozt vagy egy almát, a felületét érinted meg.',
    breakdown: [
      { label: 'Test határa', value: 'Felület (lapok összessége)' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Hogyan keletkezik egy test ÉLE?',
    options: [
      'Két szomszédos határoló lap metszésvonalaként',
      'Három csúcs összekötésével a levegőben',
      'A test belsejében lévő pontokból',
      'Egyenesek forgatásával a gömb körül'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <path d="M10 16 L25 8 L40 16 L25 24 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
        <path d="M10 16 L25 24 L25 40 L10 32 Z" className="fill-blue-100 stroke-blue-400" strokeWidth="1" />
        <path d="M25 24 L40 16 L40 32 L25 40 Z" className="fill-emerald-100 stroke-emerald-400" strokeWidth="1" />
        <line x1="25" y1="24" x2="25" y2="40" className="stroke-rose-600" strokeWidth="3" />
      </svg>
    ),
    explanation: 'A testen két határoló felület (lap) találkozásánál, metszésvonalánál jön létre az él. Az él egy egyenes vagy görbe szakasz (1 dimenziós).',
    hint: 'Nézd meg a kocka függőleges piros vonalát a rajzon: a kék és zöld lap határán fekszik!',
    breakdown: [
      { label: 'Él meghatározása', value: 'Két szomszédos lap közös metszésvonala' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Hogyan jön létre egy test CSÚCSA?',
    options: [
      'Három vagy több él (és lap) találkozási pontjaként',
      'Két pont felezőpontjaként',
      'A lapok átlóinak töréspontjaként',
      'Csak kerek testeken keletkezhet'
    ],
    correctAnswer: 0,
    explanation: 'Egy testen három vagy több határoló él és lap közös metszéspontja a csúcs. A csúcs 0 dimenziós pont.',
    hint: 'A kocka sarkai a csúcsok, ahol 3 lap és 3 él találkozik!',
    breakdown: [
      { label: 'Csúcs meghatározása', value: 'Három vagy több él találkozási pontja' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Van-e vastagsága egy papírra rajzolt négyzetnek vagy körnek a matematikában?',
    options: [
      'Nincs: a síkidomok vastagság nélküli 2D alakzatok',
      'Igen, minden síkidom pontosan 1 milliméter vastag',
      'Csak a négyzetnek van, a körnek nincs',
      'Attól függ, milyen ceruzával rajzoltuk'
    ],
    correctAnswer: 0,
    explanation: 'A geometriában a síkidomok tisztán kétdimenziósak: csak hosszuk és szélességük van (területük van), de vastagságuk szigorúan 0!',
    hint: 'A vastagság már a 3. dimenzió (magasság) lenne, ami a testek sajátja.',
    breakdown: [
      { label: 'Síkidom méretei', value: 'Hosszúság és szélesség (terület)' },
      { label: 'Vastagság', value: '0 (nincs)' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Milyen felületek határolnak egy hengert?',
    options: [
      '2 sík körlap és 1 görbe palást',
      '6 egyforma négyzetlap',
      '1 körlap és 4 háromszöglap',
      'Csak 1 darab görbe gömbfelület'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <path d="M10 12 L10 28 C10 33 30 33 30 28 L30 12 Z" className="fill-teal-100 stroke-teal-600" strokeWidth="1.5" />
        <ellipse cx="20" cy="28" rx="10" ry="4" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
        <ellipse cx="20" cy="12" rx="10" ry="4" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A hengert 3 lap határolja: az alsó és felső párhuzamos, egybevágó sík körlap, valamint az ezeket összekötő görbe hengerpalást.',
    hint: 'Gondolj egy konzervdobozra: van alja, teteje és oldala!',
    breakdown: [
      { label: 'Alap- és fedőlap', value: '2 sík körlap' },
      { label: 'Oldalfelület', value: '1 görbe palást' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Hány éle és hány csúcsa van egy GÖMBNEK?',
    options: [
      '0 éle és 0 csúcsa van',
      '1 éle és 1 csúcsa van',
      '2 éle és 0 csúcsa van',
      'Végtelen sok éle és csúcsa van'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
        <ellipse cx="20" cy="20" rx="14" ry="4" className="stroke-rose-400" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
    explanation: 'A gömböt egyetlen zárt görbe felület (gömbfelület) határolja. Nincsenek rajta találkozó lapok vagy élek, így 0 éle és 0 csúcsa van.',
    hint: 'A labdán sehol sem találsz szúrós sarkot (csúcsot) vagy éles peremet (élt).',
    breakdown: [
      { label: 'Lapok száma', value: '1 zárt gömbfelület' },
      { label: 'Élek és csúcsok', value: '0 él, 0 csúcs' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Melyik fogalom a geometriai dimenziók helyes sorrendje a legkisebbtől a legnagyobbig?',
    options: [
      'Pont (0D) ⟶ Vonal (1D) ⟶ Felület (2D) ⟶ Test (3D)',
      'Test (3D) ⟶ Felület (2D) ⟶ Pont (0D) ⟶ Vonal (1D)',
      'Vonal (1D) ⟶ Pont (0D) ⟶ Test (3D) ⟶ Felület (2D)',
      'Felület (2D) ⟶ Vonal (1D) ⟶ Pont (0D) ⟶ Test (3D)'
    ],
    correctAnswer: 0,
    explanation: 'A pontnak nincs mérete (0D), a vonalnak hossza van (1D), a felületnek hossza és szélessége van (2D), a testnek hossza, szélessége és magassága van (3D).',
    hint: 'Számold a dimenziókat: 0, 1, 2, 3!',
    breakdown: [
      { label: '0D', value: 'Pont' },
      { label: '1D', value: 'Vonal' },
      { label: '2D', value: 'Felület' },
      { label: '3D', value: 'Test' }
    ]
  },

  // ========================================================
  // --- 2. SZINT: TESTEK FELÉPÍTÉSE (LAPOK, ÉLEK, CSÚCSOK) ---
  // ========================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Hány lapja, éle és csúcsa van egy KOCKÁNAK?',
    options: [
      '6 lapja, 12 éle és 8 csúcsa',
      '8 lapja, 12 éle és 6 csúcsa',
      '6 lapja, 8 éle és 12 csúcsa',
      '4 lapja, 8 éle és 4 csúcsa'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <path d="M12 16 L25 8 L38 16 L25 24 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
        <path d="M12 16 L25 24 L25 38 L12 30 Z" className="fill-blue-400 stroke-blue-700" strokeWidth="1.5" />
        <path d="M25 24 L38 16 L38 30 L25 38 Z" className="fill-blue-300 stroke-blue-600" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A kockának 6 négyzetlapja, 12 egyenlő hosszúságú éle és 8 csúcsa van. Ugyanez érvényes a téglatestre is!',
    hint: 'Gondolj egy dobókockára: 1-től 6-ig vannak rajta a pöttyök (6 lap)!',
    breakdown: [
      { label: 'Lapok (L)', value: '6 lap' },
      { label: 'Élek (É)', value: '12 él' },
      { label: 'Csúcsok (C)', value: '8 csúcs' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Hány csúcsa van egy HENGERNEK?',
    options: [
      '0 csúcsa',
      '2 csúcsa',
      '1 csúcsa',
      'Végtelen sok csúcsa'
    ],
    correctAnswer: 0,
    explanation: 'A hengernek nincsenek találkozó egyenes élei vagy sarkai: 2 kör alakú sík lapja és egy görbe palástja van, így a csúcsainak száma 0.',
    hint: 'Hol találkozik 3 él egy hengeren? Sehol!',
    breakdown: [
      { label: 'Henger csúcsai', value: '0 csúcs' },
      { label: 'Henger élei', value: '2 görbe kör él' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Hány csúcsa és hány lapja van egy KÚPNAK?',
    options: [
      '1 csúcsa és 2 lapja (1 körlap + 1 palást)',
      '2 csúcsa és 2 lapja',
      '0 csúcsa és 1 lapja',
      '1 csúcsa és 3 lapja'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <polygon points="20,6 8,28 32,28" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
        <ellipse cx="20" cy="28" rx="12" ry="4" className="fill-amber-300 stroke-amber-700" strokeWidth="1.5" />
        <circle cx="20" cy="6" r="2.5" className="fill-amber-900" />
      </svg>
    ),
    explanation: 'A kúpnak 1 csúcsa van (a tetején a csúcspont), és 2 határoló felülete: a sík kör alakú alaplapja és a görbe kúppalástja.',
    hint: 'Gondolj egy fagylaltos tölcsérre fejjel lefelé állítva!',
    breakdown: [
      { label: 'Csúcsok száma', value: '1 csúcs' },
      { label: 'Lapok száma', value: '2 lap' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Hány lapja, éle és csúcsa van egy NÉGYOLDALÚ GÚLÁNAK (piramisnak)?',
    options: [
      '5 lapja, 8 éle és 5 csúcsa',
      '4 lapja, 6 éle és 4 csúcsa',
      '6 lapja, 12 éle és 8 csúcsa',
      '5 lapja, 10 éle és 6 csúcsa'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <polygon points="8,35 25,40 42,33 25,28" className="stroke-purple-600 fill-purple-100" strokeWidth="1" />
        <polygon points="25,8 8,35 25,40" className="fill-purple-300 stroke-purple-700" strokeWidth="1.5" />
        <polygon points="25,8 25,40 42,33" className="fill-purple-400 stroke-purple-800" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A négyoldalú gúlának 1 négyzet alakú alaplapja és 4 háromszög alakú oldallapja van (összesen 5 lap). 4 alapél + 4 oldalél = 8 él, és 4 alapcsúcs + 1 felső csúcs = 5 csúcs.',
    hint: 'Gondolj az egyiptomi piramisokra: négyzet alakú aljzat és 4 felfelé futó háromszög!',
    breakdown: [
      { label: 'Lapok száma', value: '1 négyzet + 4 háromszög = 5 lap' },
      { label: 'Élek száma', value: '4 + 4 = 8 él' },
      { label: 'Csúcsok száma', value: '4 + 1 = 5 csúcs' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Hány éle van egy HÁROMOLDALÚ PRIZMÁNAK (háromszög alapú hasábnak)?',
    options: [
      '9 éle (3 alapél alul + 3 alapél felül + 3 oldalél)',
      '6 éle',
      '12 éle',
      '8 éle'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <polygon points="12,14 36,8 42,20" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
        <path d="M12 14 L12 36 L42 42 L42 20 Z" className="fill-teal-300 stroke-teal-700" strokeWidth="1.5" />
        <polygon points="12,36 36,30 42,42" className="stroke-teal-600" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
    explanation: 'A háromoldalú prizmának az alsó háromszögén 3 él, a felső háromszögén 3 él, és a két alapot összekötő 3 függőleges oldaléle van: 3 + 3 + 3 = 9 él.',
    hint: 'Gondolj a Toblerone csokoládé dobozára: két háromszög vég és 3 hosszú lap köztük!',
    breakdown: [
      { label: 'Alapélek', value: '3 alul + 3 felül = 6 él' },
      { label: 'Oldalélek', value: '3 függőleges él' },
      { label: 'Összesen', value: '9 él' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Milyen alakúak a KOCKA határoló lapjai?',
    options: [
      'Mind a 6 lapja egybevágó (egyforma méretű) négyzet',
      '4 téglalap és 2 négyzet',
      'Mind a 6 lapja különböző téglalap',
      '3 párhuzamos körlap'
    ],
    correctAnswer: 0,
    explanation: 'A kocka szabályos test: mind a 6 lapja pontosan egybevágó négyzet, és mind a 12 éle egyenlő hosszúságú.',
    hint: 'A dobókocka minden oldalról pontosan egyforma négyzetet mutat.',
    breakdown: [
      { label: 'Kocka lapjai', value: '6 egybevágó négyzet' },
      { label: 'Kocka élei', value: 'Mind a 12 egyforma hosszú' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Hány lapja és csúcsa van egy TETRAÉDERNEK (szabályos háromoldalú gúlának)?',
    options: [
      '4 lapja és 4 csúcsa (mind a 4 lapja egyenlő oldalú háromszög)',
      '5 lapja és 6 csúcsa',
      '6 lapja és 8 csúcsa',
      '3 lapja és 3 csúcsa'
    ],
    correctAnswer: 0,
    explanation: 'A tetraéder a legegyszerűbb poliéder (gúla): 1 háromszög alaplapja és 3 háromszög oldallapja van (4 lap), éleinek száma 6, csúcsainak száma 4.',
    hint: 'A görög „tetra” előtag négyet jelent (négy lapú test).',
    breakdown: [
      { label: 'Lapok', value: '4 háromszög' },
      { label: 'Élek', value: '6 él' },
      { label: 'Csúcsok', value: '4 csúcs' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Mit mond ki az EULER-FÉLE POLIÉDERTÉTEL a síklapú testek csúcsaira (C), lapjaira (L) és éleire (É)?',
    options: [
      'C + L - É = 2 (Csúcsok + Lapok - Élek mindig 2-vel egyenlő)',
      'C + L + É = 20',
      'C · L = É',
      'C - L + É = 0'
    ],
    correctAnswer: 0,
    explanation: 'Leonhard Euler híres összefüggése: minden egyszerű síklapú testre igaz, hogy a csúcsok és lapok számának összege 2-vel több az élek számánál: C + L = É + 2, vagyis C + L - É = 2.',
    hint: 'Próbáld ki a kockára: 8 csúcs + 6 lap - 12 él = 14 - 12 = 2!',
    breakdown: [
      { label: 'Képlet', value: 'C + L - É = 2' },
      { label: 'Kockára', value: '8 + 6 - 12 = 2 (stimmel!)' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Milyen alakúak a TÉGLATEST határoló lapjai?',
    options: [
      '6 darab téglalap, amelyek közül a szemköztiek egybevágók',
      'Mindig mind a 6 lapja egyenlő négyzet',
      '3 háromszög és 3 kör',
      '4 trapéz és 2 rombusz'
    ],
    correctAnswer: 0,
    explanation: 'A téglatestet 6 téglalap határolja. A szemközti lapok párhuzamosak és egymással egybevágók (összesen 3 egybevágó lap-pár van).',
    hint: 'Gondolj egy cipősdobozra vagy gyufásdobozra!',
    breakdown: [
      { label: 'Téglatest lapjai', value: '6 téglalap (3 egybevágó pár)' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Igaz-e, hogy minden KOCKA egyben TÉGLATEST is?',
    options: [
      'Igen, a kocka egy speciális téglatest, amelynek minden éle egyenlő',
      'Nem, a kockának és a téglatestnek semmi köze egymáshoz',
      'Csak akkor, ha a kocka kék színű',
      'Fordítva igaz: minden téglatest kocka'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a négyzet egy speciális téglalap, így a 6 négyzetlap határolta kocka is egy speciális téglatest, amelynek az élei mind egyenlő hosszúak!',
    hint: 'Ahogyan a négyzet téglalap, úgy a kocka is téglatest.',
    breakdown: [
      { label: 'Négyzet ⊆ Téglalap', value: 'Ezért Kocka ⊆ Téglatest' }
    ]
  },

  // ========================================================
  // --- 3. SZINT: VONALAK, EGYENESEK, RELÁCIÓK ÉS ÖSSZEFÜGGÉSEK ---
  // ========================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Mi a legfőbb különbség az EGYENES és a SZAKASZ között?',
    options: [
      'Az egyenes mindkét irányban végtelen, a szakaszt két végpont határolja és mérhető a hossza',
      'Az egyenes mindig görbe, a szakasz mindig egyenes',
      'A szakasz végtelen hosszú, az egyenes pedig véges',
      'Nincs különbség, a két szó szinonima'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-14 mx-auto" viewBox="0 0 80 40" fill="none">
        <line x1="4" y1="12" x2="76" y2="12" className="stroke-indigo-600" strokeWidth="2" />
        <text x="72" y="8" className="text-[9px] font-bold fill-indigo-700">e</text>
        <line x1="16" y1="28" x2="64" y2="28" className="stroke-emerald-600" strokeWidth="2.5" />
        <circle cx="16" cy="28" r="3" className="fill-emerald-700" />
        <circle cx="64" cy="28" r="3" className="fill-emerald-700" />
        <text x="16" y="38" textAnchor="middle" className="text-[8px] font-bold fill-emerald-800">A</text>
        <text x="64" y="38" textAnchor="middle" className="text-[8px] font-bold fill-emerald-800">B</text>
      </svg>
    ),
    explanation: 'Az egyenes mindkét irányban korlátlanul (végtelenbe) nyúlik. A szakasz az egyenesnek egy darabja, amelyet két pont (a végpontjai) határol, így hossza van.',
    hint: 'A vonalzón lemérheted a szakasz hosszát, de egy végtelen egyenest sosem érsz végig!',
    breakdown: [
      { label: 'Egyenes', value: 'Nincs végpontja, mindkét irányban végtelen' },
      { label: 'Szakasz', value: 'Két végpontja van, hossza mérhető' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Mi az a FÉLEGYENES?',
    options: [
      'Olyan vonal, amelyet egyik irányban egy kezdőpont határol, a másik irányban végtelenbe nyúlik',
      'Egy olyan egyenes, amelyik pontosan félúton elhajlik',
      'Egy 5 cm-nél rövidebb szakasz',
      'Két párhuzamos egyenes fele'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-10 mx-auto" viewBox="0 0 70 30" fill="none">
        <line x1="15" y1="15" x2="65" y2="15" className="stroke-purple-600" strokeWidth="2.5" />
        <circle cx="15" cy="15" r="3.5" className="fill-purple-700" />
        <text x="15" y="10" textAnchor="middle" className="text-[9px] font-bold fill-purple-900">Kezdőpont</text>
      </svg>
    ),
    explanation: 'A félegyenes egy egyenes része: van egy kezdőpontja, és ebből a pontból kiindulva egyetlen irányban korlátlanul (a végtelenbe) tart.',
    hint: 'Gondolj egy lézersugárra vagy a Nap sugaraira: a fényforrásból indulnak, és egyenesen mennek a végtelenbe!',
    breakdown: [
      { label: 'Kezdőpont', value: '1 darab végpontja van' },
      { label: 'Másik irány', value: 'Végtelenbe nyúlik' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Hány egyenes fektethető át KÉT KÜLÖNBÖZŐ ponton a síkban?',
    options: [
      'Pontosan egy egyenes',
      'Két egyenes',
      'Végtelen sok egyenes',
      'Egy sem'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-12 mx-auto" viewBox="0 0 70 35" fill="none">
        <line x1="5" y1="18" x2="65" y2="18" className="stroke-blue-600" strokeWidth="2" />
        <circle cx="20" cy="18" r="3.5" className="fill-blue-700" />
        <circle cx="50" cy="18" r="3.5" className="fill-blue-700" />
        <text x="20" y="11" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">A</text>
        <text x="50" y="11" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">B</text>
      </svg>
    ),
    explanation: 'A geometria egyik alaptétele: bármely két különböző ponton keresztül pontosan egyetlen egyenes húzható. Két pont egyértelműen meghatározza az egyenest.',
    hint: 'Tegyél le két pontot a füzetedbe, és illeszd hozzá a vonalzót: csak egyféleképpen tudod meghúzni!',
    breakdown: [
      { label: 'Alaptétel', value: 'Két pont pontosan egy egyenest határoz meg' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Hány egyenes húzható át EGYETLEN ponton a síkban?',
    options: [
      'Végtelen sok egyenes',
      'Pontosan egy',
      'Pontosan négy',
      'Csak kettő (függőleges és vízszintes)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <line x1="5" y1="20" x2="35" y2="20" className="stroke-amber-500" strokeWidth="1.5" />
        <line x1="20" y1="5" x2="20" y2="35" className="stroke-amber-500" strokeWidth="1.5" />
        <line x1="8" y1="8" x2="32" y2="32" className="stroke-amber-500" strokeWidth="1.5" />
        <line x1="8" y1="32" x2="32" y2="8" className="stroke-amber-500" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" className="fill-amber-700" />
      </svg>
    ),
    explanation: 'Egyetlen ponton át bármilyen irányban húzhatunk egyenest, így végtelen sok különböző egyenes haladhat át rajta (egyenes-nyaláb).',
    hint: 'Gondolj a kerék küllőire: mind a tengely középpontjából indulnak ki tetszőleges szögben!',
    breakdown: [
      { label: '1 ponton át', value: 'Végtelen sok egyenes húzható' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Mit jelent a geometriai „P ∈ e” jelölés?',
    options: [
      'A P pont illeszkedik az „e” egyenesre (rajta van az egyenesen)',
      'A P pont az egyenes végpontja',
      'A P pont és az „e” egyenes távolsága 1 cm',
      'Az egyenes metszi a pontot két részre'
    ],
    correctAnswer: 0,
    explanation: 'A halmazelméletből ismert „∈” (eleme) jelölést használjuk: az egyenes pontok halmaza, így a P ∈ e azt fejezi ki, hogy a P pont rajta fekszik az „e” egyenesen.',
    hint: 'A P pont eleme az egyenes pontjainak.',
    breakdown: [
      { label: 'P ∈ e', value: 'P illeszkedik az e egyenesre' },
      { label: 'Q ∉ e', value: 'Q nem illeszkedik az e egyenesre' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Ha egy gúlának 6 csúcsa van, hány LAPJA van ennek a gúlának?',
    options: [
      '6 lapja (1 ötszög alaplap + 5 háromszög oldallap)',
      '5 lapja',
      '7 lapja',
      '12 lapja'
    ],
    correctAnswer: 0,
    explanation: 'A gúlának van 1 felső csúcsa és az alaplap csúcsai. Ha 6 csúcsa van összesen, akkor az alaplapnak 6 - 1 = 5 csúcsa (ötszög) van. Ezért van 1 ötszög alaplapja és 5 háromszög oldallapja: 1 + 5 = 6 lap!',
    hint: 'Gúla esetén: Csúcsok száma = Lapok száma! Mindkettő az alaplap oldalszáma + 1.',
    breakdown: [
      { label: 'Alaplap csúcsai', value: '6 - 1 = 5 csúcs (ötszög)' },
      { label: 'Lapok száma', value: '1 alaplap + 5 oldallap = 6 lap' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Hány metszéspontja lehet legfeljebb KÉT KÜLÖNBÖZŐ EGYENESNEK a síkban?',
    options: [
      'Legfeljebb 1 metszéspontja (vagy 0, ha párhuzamosak)',
      'Pontosan 2 metszéspontja',
      'Végtelen sok metszéspontja',
      'Mindig pontosan 1'
    ],
    correctAnswer: 0,
    explanation: 'Két különböző egyenes a síkban vagy metszi egymást pontosan 1 pontban, vagy párhuzamosak egymással, és ekkor 0 közös pontjuk van.',
    hint: 'Két egyenes vonal sosem tud „visszakanyarodni”, hogy másodszor is keresztezze egymást!',
    breakdown: [
      { label: 'Metsző egyenesek', value: '1 közös pont' },
      { label: 'Párhuzamos egyenesek', value: '0 közös pont' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Mi az a TÖRÖTTVONAL a geometriában?',
    options: [
      'Olyan vonal, amely egymáshoz csatlakozó szakaszokból áll',
      'Egy olyan vonal, amit véletlenül eltört a radír',
      'Csak olyan egyenes, amelyik ferdén áll',
      'A gömb felületén futó kör'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-12 mx-auto" viewBox="0 0 60 30" fill="none">
        <polyline points="5,22 18,8 34,24 55,10" className="stroke-teal-600" strokeWidth="2.5" fill="none" />
      </svg>
    ),
    explanation: 'A töröttvonal olyan vonal, amely véges sok egymáshoz csatlakozó egyenes szakaszból áll. Lehet nyílt vagy zárt (a zárt töröttvonal sokszöget határolhat).',
    hint: 'Gondolj a villám vonalára: egyenes szakaszok kapcsolódnak egymáshoz csúcspontokban!',
    breakdown: [
      { label: 'Töröttvonal elemei', value: 'Szakaszok láncolata' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Egy síklapú testnek 6 csúcsa és 8 lapja van. Hány ÉLE van ennek a testnek az Euler-tétel (C + L - É = 2) alapján?',
    options: [
      '12 éle (6 + 8 - 2 = 12)',
      '10 éle',
      '14 éle',
      '8 éle'
    ],
    correctAnswer: 0,
    explanation: 'Az Euler-képlet szerint: C + L - É = 2. Behelyettesítve: 6 + 8 - É = 2 ⟹ 14 - É = 2 ⟹ É = 12. Ennek a testnek (oktaéder) 12 éle van!',
    hint: 'Add össze a csúcsokat és lapokat: 6 + 8 = 14. Ebből vonj ki 2-t, és megkapod az élek számát!',
    breakdown: [
      { label: 'C + L', value: '6 + 8 = 14' },
      { label: 'Élek száma (É)', value: '14 - 2 = 12 él' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Mi a különbség a SÍK FELÜLET és a GÖRBE FELÜLET között?',
    options: [
      'A sík felületre bármely két pontja között ráfektethető az összekötő egyenes szakasz, a görbe felületre nem',
      'A sík felület mindig kék, a görbe felület mindig zöld',
      'A sík felületnek nincs területe, a görbe felületnek van',
      'Nincs köztük különbség'
    ],
    correctAnswer: 0,
    explanation: 'A sík lapos: ha két pontját összekötjük egy szakasszal, az egész szakasz teljes hosszában a felületen fekszik. A gömb vagy henger görbe felületén az egyenes szakasz bemegy a test belsejébe.',
    hint: 'Tegyél egy egyenes vonalzót egy asztalra (sík) és egy labdára (görbe felület)!',
    breakdown: [
      { label: 'Sík felület', value: 'A vonalzó teljes élével ráfekszik' },
      { label: 'Görbe felület', value: 'A vonalzó csak egy pontban érinti' }
    ]
  }
];

const levelConfigs: Record<1 | 2 | 3, any> = {
  1: {
    title: '1. Szint: A négy alapfogalom és dimenzióik',
    description: '0D pont, 1D vonal, 2D felület, 3D test fogalma és jellemzői',
    passingScore: 70
  },
  2: {
    title: '2. Szint: Testek lapjai, élei és csúcsai',
    description: 'Kocka, téglatest, henger, gúla, prizma és az Euler-összefüggés (C + L - É = 2)',
    passingScore: 70
  },
  3: {
    title: '3. Szint: Vonalak, egyenesek és relációk',
    description: 'Egyenes, félegyenes, szakasz, pont illeszkedése (P ∈ e), töröttvonalak és metszéspontok',
    passingScore: 70
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'dimensions',
    title: 'A geometriai dimenziók hierarchiája',
    color: 'border-emerald-500',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>0D • Pont (P):</strong> nincs mérete, kiterjedése, csak helye a térben.</p>
        <p><strong>1D • Vonal (szakasz, él, egyenes):</strong> egyetlen mérete a hosszúság.</p>
        <p><strong>2D • Felület (lap, síkidom):</strong> hossza és szélessége van (terület).</p>
        <p><strong>3D • Test:</strong> teret tölt be, hossza, szélessége és magassága van (térfogat).</p>
      </div>
    )
  },
  {
    id: 'euler',
    title: 'Euler-féle poliédertétel',
    color: 'border-blue-500',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p className="font-bold text-blue-700 dark:text-blue-300">C + L - É = 2</p>
        <p><strong>Csúcsok (C) + Lapok (L) - Élek (É) = 2</strong></p>
        <p><strong>Kocka / Téglatest:</strong> 8 csúcs + 6 lap - 12 él = 2</p>
        <p><strong>Négyoldalú gúla:</strong> 5 csúcs + 5 lap - 8 él = 2</p>
        <p><strong>Háromoldalú prizma:</strong> 6 csúcs + 5 lap - 9 él = 2</p>
      </div>
    )
  },
  {
    id: 'lines',
    title: 'Egyenes, Félegyenes, Szakasz',
    color: 'border-purple-500',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>Egyenes (e):</strong> mindkét irányban végtelenbe nyúlik (nincs végpontja).</p>
        <p><strong>Félegyenes:</strong> egyik irányban 1 kezdőpontja van, másikban végtelen.</p>
        <p><strong>Szakasz (AB):</strong> két végpontja van, mérhető a hossza.</p>
        <p><strong>Két ponton át</strong> pontosan egy egyenes húzható.</p>
      </div>
    )
  }
];

export const BodiesQuiz: React.FC<BodiesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-geom-bodies-quiz"
      title="Test, Felület, Vonal, Pont Kvíz és Gyakorlás"
      subtitle="Teszteld tudásodat a geometriai alapfogalmakról, dimenziókról és térbeli testekről 3 szinten!"
      badge="🧊 5. Osztály • III. Geometria"
      themeColor="emerald"
      levels={levelConfigs}
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó geometriai kártyapárokat!',
          description: 'Párosítsd a testeket a lapjaikkal, éleikkel, csúcsaikkal és dimenzióikkal 3 nehézségi szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <BodiesMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét a geometriai elemeket tulajdonságaik szerint!',
          description: 'Rendezd a formákat dimenziók (0D/1D, 2D, 3D), lapszám vagy testtípus szerint!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <BodiesSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default BodiesQuiz;
