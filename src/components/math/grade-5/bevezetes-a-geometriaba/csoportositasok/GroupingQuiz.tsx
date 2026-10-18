import React from 'react';
import { QuizTemplate, Question, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GroupingMatcher } from './GroupingMatcher';
import { GroupingSorter } from './GroupingSorter';
import { Shapes, Box, Layers, Filter, Sparkles, BookOpen } from 'lucide-react';

export interface GroupingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ========================================================
  // --- 1. SZINT: ALAPVETŐ TULAJDONSÁGOK ÉS KATEGÓRIÁK ---
  // ========================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mi a legfőbb különbség egy síkidom (2D) és egy térbeli test (3D) között?',
    options: [
      'A síkidom lapos és nincs térfogata, a test kiterjed a térben és térfogata van',
      'A síkidomnak mindig 4 oldala van, a testnek pedig 6 lapja',
      'A síkidomok mindig színesek, a testek mindig szürkék',
      'Nincs semmi különbség, mindkettő ugyanazt jelenti'
    ],
    correctAnswer: 0,
    explanation: 'A síkidomok két dimenziós (hosszúság, szélesség), a síkba simuló alakzatok (területük van). A testek háromdimenziósak (hosszúság, szélesség, magasság), teret töltenek be és térfogatuk van.',
    hint: 'Gondolj egy papírlapra rajzolt négyzetre (síkidom) és egy kézbe vehető dobókockára (test)!',
    breakdown: [
      { label: 'Síkidom (2D)', value: 'Csak hossza és szélessége van, síkban fekszik' },
      { label: 'Test (3D)', value: 'Hossza, szélessége és magassága is van, teret tölt be' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Az alábbi alakzatok közül melyik térbeli test (3D)?',
    options: [
      'Kocka',
      'Négyzet',
      'Kör',
      'Egyenlő oldalú háromszög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-24 mx-auto" viewBox="0 0 60 60" fill="none">
        <path d="M14 20 L32 8 L50 18 L32 30 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="2" />
        <path d="M14 20 L32 30 L32 50 L14 40 Z" className="fill-blue-400 stroke-blue-700" strokeWidth="2" />
        <path d="M32 30 L50 18 L50 38 L32 50 Z" className="fill-blue-300 stroke-blue-600" strokeWidth="2" />
      </svg>
    ),
    explanation: 'A kocka térbeli test, mert 6 négyzetlap zárja körül és teret tölt be. A négyzet, a kör és a háromszög mind lapos síkidomok.',
    hint: 'Melyiket tudod kézbe venni úgy, hogy van vastagsága és magassága is?',
    breakdown: [
      { label: 'Kocka', value: '3D test (6 lap, 12 él, 8 csúcs)' },
      { label: 'Négyzet, kör, háromszög', value: '2D síkidomok' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Melyik tulajdonság jellemző a sokszögekre?',
    options: [
      'Csak egyenes szakaszok határolják őket, amelyek csúcsokban találkoznak',
      'Legalább egy görbe ív mindig található a kerületükön',
      'Csak 4 csúcsuk lehet',
      'Nincsenek oldalaik, csak csúcspontjaik'
    ],
    correctAnswer: 0,
    explanation: 'A sokszögeket definíció szerint kizárólag egyenes szakaszok (oldalak) határolják, amelyek zárt láncot alkotnak.',
    hint: 'A háromszög, négyzet, ötszög mind sokszög. Milyen vonalak határolják őket?',
    breakdown: [
      { label: 'Sokszög határa', value: 'Kizárólag egyenes szakaszok' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Hány oldala és csúcsa van egy szabályos ötszögnek?',
    options: [
      '5 oldala és 5 csúcsa',
      '5 oldala és 10 csúcsa',
      '4 oldala és 5 csúcsa',
      '6 oldala és 5 csúcsa'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 60 60" fill="none">
        <polygon points="30,8 52,24 43,50 17,50 8,24" className="fill-purple-100 stroke-purple-600" strokeWidth="2.5" />
        <circle cx="30" cy="8" r="3" className="fill-purple-700" />
        <circle cx="52" cy="24" r="3" className="fill-purple-700" />
        <circle cx="43" cy="50" r="3" className="fill-purple-700" />
        <circle cx="17" cy="50" r="3" className="fill-purple-700" />
        <circle cx="8" cy="24" r="3" className="fill-purple-700" />
      </svg>
    ),
    explanation: 'Minden sokszögben az oldalak száma megegyezik a csúcsok számával. Az ötszögnek 5 oldala és 5 csúcsa van.',
    hint: 'Számold meg a pöttyökkel jelölt csúcsokat az ábrán!',
    breakdown: [
      { label: 'Oldalak száma', value: '5 oldal' },
      { label: 'Csúcsok száma', value: '5 csúcs' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Az alábbi alakzatok közül melyiket határolja görbe vonal?',
    options: [
      'Kör',
      'Háromszög',
      'Téglalap',
      'Rombusz'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="22" className="fill-rose-100 stroke-rose-600" strokeWidth="2.5" />
      </svg>
    ),
    explanation: 'A kört egyetlen zárt, folytonos görbe vonal határolja. Nincsenek egyenes oldalai és nincsenek csúcsai.',
    hint: 'Melyik alakzatnak nincsenek csúcsai és töréspontjai?',
    breakdown: [
      { label: 'Kör határa', value: 'Görbe vonal' },
      { label: 'Többi', value: 'Egyenes szakaszok' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Milyen test látható az alábbi ábrán?',
    options: [
      'Henger',
      'Kocka',
      'Gömb',
      'Téglatest'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 60 60" fill="none">
        <path d="M15 16 L15 42 C15 48 45 48 45 42 L45 16 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
        <ellipse cx="30" cy="42" rx="15" ry="5" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
        <ellipse cx="30" cy="16" rx="15" ry="5" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
      </svg>
    ),
    explanation: 'Ez egy henger: két párhuzamos, egybevágó körlap és egy palást határolja.',
    hint: 'Gondolj egy konzervdoboz vagy egy pohár formájára!',
    breakdown: [
      { label: 'Alaplapjai', value: 'Két körlap' },
      { label: 'Oldala', value: 'Görbült palást' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Melyik csoportosítási szempont alapján tartozik a négyzet és a téglalap egy csoportba?',
    options: [
      'Mindkettő 4 oldalú sokszög (négyszög), és mindkettőnek 4 derékszöge van',
      'Mindkettőnek minden oldala egyenlő hosszú',
      'Mindkettő térbeli test',
      'Mindkettőnek 3 csúcsa van'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet és a téglalap is négyszög (4 oldal, 4 csúcs), és mindkettőnek mind a négy belső szöge derékszög (90°). Az oldalhosszakban különböznek: a négyzet minden oldala egyenlő, a téglalapnak csak a szemköztiek.',
    hint: 'Hány oldala és milyen szögei vannak a két alakzatnak?',
    breakdown: [
      { label: 'Közös tulajdonság', value: '4 oldal, 4 derékszög' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Ha a ceruzatartónkban lévő tárgyakat csoportosítjuk, mi NEM tekinthető geometriai tulajdonságnak?',
    options: [
      'A ceruza ára vagy a márkája',
      'A ceruza hossza',
      'A ceruza keresztmetszetének alakja (hengeres, hatszögletű)',
      'A hegyének hegyesszöge'
    ],
    correctAnswer: 0,
    explanation: 'Az ár, a márka vagy a tulajdonos neve nem geometriai tulajdonság. A geometria a formát, kiterjedést, méretet, szögeket és határoló vonalakat vizsgálja.',
    hint: 'Melyik tulajdonság gazdasági/hétköznapi jellegű, és nem a térbeli formára vonatkozik?',
    breakdown: [
      { label: 'Geometriai', value: 'Hossz, alak, szög, forma' },
      { label: 'Nem geometriai', value: 'Ár, márka, tetszés' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Melyik alakzatnak pontosan 3 oldala és 3 csúcsa van?',
    options: [
      'Háromszög',
      'Négyszög',
      'Kör',
      'Kocka'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 60 60" fill="none">
        <polygon points="30,10 50,46 10,46" className="fill-blue-100 stroke-blue-600" strokeWidth="2.5" />
      </svg>
    ),
    explanation: 'A háromszög a legkisebb oldalszámú sokszög: pontosan 3 oldala, 3 csúcsa és 3 belső szöge van.',
    hint: 'Már a nevében is benne van: hány szöge van?',
    breakdown: [
      { label: 'Háromszög', value: '3 oldal, 3 csúcs, 3 szög' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Hány határoló lapja (oldallapja) van egy kockának?',
    options: [
      '6 egybevágó négyzetlapja',
      '4 téglalaplapja',
      '8 háromszöglapja',
      '12 körlapja'
    ],
    correctAnswer: 0,
    explanation: 'A kockát 6 egybevágó négyzetlap határolja. Emellett 12 éle és 8 csúcsa van.',
    hint: 'Gondolj egy dobókockára: 1-től hányig vannak rajta a pöttyök a lapjain?',
    breakdown: [
      { label: 'Lapok száma', value: '6 lap' },
      { label: 'Lapok alakja', value: 'Négyzet' }
    ]
  },

  // ========================================================
  // --- 2. SZINT: CSOPORTOSÍTÁSI SZEMPONTOK ÉS TÁBLÁZATOK ---
  // ========================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Melyik alakzat felel meg egyszerre mindkét feltételnek: „Síkidom” ÉS „Görbe vonal határolja”?',
    options: [
      'Kör',
      'Kocka',
      'Négyzet',
      'Gömb'
    ],
    correctAnswer: 0,
    explanation: 'A kör 2D síkidom ÉS görbe vonal határolja. A négyzet síkidom, de egyenesek határolják. A kocka és a gömb térbeli testek, nem síkidomok.',
    hint: 'Keresd azt az alakzatot, ami lapos (síkbeli), de nincsenek egyenes oldalai!',
    breakdown: [
      { label: 'Feltétel 1: Síkidom', value: 'Kör és négyzet teljesíti' },
      { label: 'Feltétel 2: Görbe határ', value: 'Kör és gömb teljesíti' },
      { label: 'Mindkettő', value: 'Kör' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Az alábbi sokszögeket oldalszám szerint növekvő sorrendbe rendezzük: [Hatszög, Háromszög, Ötszög, Négyzet]. Mi a helyes sorrend?',
    options: [
      'Háromszög (3) → Négyzet (4) → Ötszög (5) → Hatszög (6)',
      'Hatszög (6) → Ötszög (5) → Négyzet (4) → Háromszög (3)',
      'Négyzet (4) → Háromszög (3) → Hatszög (6) → Ötszög (5)',
      'Háromszög (3) → Ötszög (5) → Négyzet (4) → Hatszög (6)'
    ],
    correctAnswer: 0,
    explanation: 'A növekvő sorrend a legkisebb oldalszámtól a legnagyobbig halad: 3 oldalú (háromszög), 4 oldalú (négyzet), 5 oldalú (ötszög), 6 oldalú (hatszög).',
    hint: 'Számold meg az oldalak számát minden alakzatnál: 3, 4, 5, 6!',
    breakdown: [
      { label: 'Növekvő sorrend', value: '3 → 4 → 5 → 6' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Egy kétirányú táblázat sorai a „Síkidom” és „Test”, oszlopai a „Csak egyenes / síklap” és „Görbe is”. Melyik mezőbe (cellába) kerül a KOCKA?',
    options: [
      'Test sora, Csak egyenes / síklap oszlopa',
      'Síkidom sora, Csak egyenes / síklap oszlopa',
      'Test sora, Görbe is oszlopa',
      'Síkidom sora, Görbe is oszlopa'
    ],
    correctAnswer: 0,
    explanation: 'A kocka térbeli test (ez a sora), és csak sík négyzetlapok határolják, egyetlen görbe felülete sincs (ez az oszlopa).',
    hint: 'A kocka síkbeli vagy térbeli? És vannak-e görbe lapjai?',
    breakdown: [
      { label: 'Sor', value: 'Test (3D)' },
      { label: 'Oszlop', value: 'Csak egyenes szakaszok / síklapok' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Melyik alakzat tartozik a „Soklapú testek (Poliéderek)” csoportjába?',
    options: [
      'Téglatest',
      'Henger',
      'Kúp',
      'Gömb'
    ],
    correctAnswer: 0,
    explanation: 'A poliédereket (soklapú testeket) kizárólag sík sokszöglapok határolják. A téglatestet 6 téglalaplap határolja. A henger, kúp és gömb forgástestek, görbe felülettel rendelkeznek.',
    hint: 'Melyik testnek nincsenek görbe, ívelt felületei?',
    breakdown: [
      { label: 'Poliéder', value: 'Csak síklapok határolják (pl. téglatest)' },
      { label: 'Forgástest', value: 'Görbe felülete is van (henger, kúp, gömb)' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Miért NEM nevezhetünk egy kockát négyzetnek?',
    options: [
      'Mert a négyzet 2D síkidom, a kocka pedig 3D térbeli test',
      'Mert a kockának kerekített csúcsai vannak',
      'Mert a kockának 3 oldala van',
      'Nincs oka, a kockát nyugodtan hívhatjuk négyzetnek is'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet egy kétdimenziós síkidom, ami a papír síkjára simul. A kocka egy térbeli test, aminek térfogata van, és 6 darab négyzetlap határolja.',
    hint: 'Gondolj a dimenziókra: lapos vagy térkitöltő?',
    breakdown: [
      { label: 'Négyzet', value: '2D alakzat (terület)' },
      { label: 'Kocka', value: '3D test (térfogat)' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Alakzatok csoportosításakor a következő 4 alakzatot vizsgáljuk: [Egyenlő oldalú háromszög, Négyzet, Rombusz, Szabályos hatszög]. Mi a közös tulajdonságuk?',
    options: [
      'Minden alakzatnak minden oldala egyenlő hosszú',
      'Mindegyiknek 4 csúcsa van',
      'Mindegyiknek minden szöge derékszög',
      'Mindegyik térbeli test'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenlő oldalú háromszögnek 3 egyenlő oldala van, a négyzetnek és a rombusznak 4 egyenlő oldala, a szabályos hatszögnek 6 egyenlő oldala. Mind a négy alakzatban közös, hogy minden oldala azonos hosszúságú (egyenlő oldalú).',
    hint: 'Mérd össze képzeletben az oldalak hosszát egy-egy alakzaton belül!',
    breakdown: [
      { label: 'Közös vonás', value: 'Minden oldaluk egyenlő hosszú' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Melyik mezőbe kerül az ELLIPSZIS a kétirányú táblázatban?',
    options: [
      'Síkidom sora, Görbe vonal oszlopa',
      'Test sora, Görbe felület oszlopa',
      'Síkidom sora, Csak egyenes oszlopa',
      'Test sora, Csak egyenes oszlopa'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-14 mx-auto" viewBox="0 0 50 30" fill="none">
        <ellipse cx="25" cy="15" rx="20" ry="10" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
      </svg>
    ),
    explanation: 'Az ellipszis egy lapos síkbeli alakzat (síkidom), és zárt görbe vonal határolja (nincsenek egyenes oldalai).',
    hint: 'Gondolj egy elnyújtott körre!',
    breakdown: [
      { label: 'Dimenzió', value: 'Síkidom (2D)' },
      { label: 'Határvonal', value: 'Görbe vonal' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Milyen alakú határoló lapjai vannak egy négyzetes gúlának (piramisnak)?',
    options: [
      '1 négyzet alaplapja és 4 háromszög alakú oldallapja',
      '6 egybevágó négyzetlapja',
      '2 körlapja és 1 palástja',
      'Csak kör alakú lapjai'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 60 60" fill="none">
        <polygon points="30,8 10,48 50,48" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
        <line x1="30" y1="8" x2="32" y2="48" className="stroke-amber-700" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A négyzetes piramis alaplapja egy négyzet, az oldallapjai pedig háromszögek, amelyek egy közös csúcsban futnak össze.',
    hint: 'Képzeld el az egyiptomi piramisokat: mi van alul és mik futnak fel a csúcsba?',
    breakdown: [
      { label: 'Alaplap', value: '1 négyzet' },
      { label: 'Oldallapok', value: '4 háromszög' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Ha egy négyzetet 45 fokkal elfordítunk a csúcsára állítva, megszűnik négyzet lenni?',
    options: [
      'Nem, továbbra is négyzet marad, mert 4 egyenlő oldala és 4 derékszöge van',
      'Igen, elforgatva már rombusz lesz és nem négyzet',
      'Igen, elforgatva háromszöggé válik',
      'Igen, elforgatva térbeli test lesz belőle'
    ],
    correctAnswer: 0,
    explanation: 'Az alakzatok helyzetének megváltoztatása (elforgatás, eltolás, tükrözés) nem változtatja meg a geometriai tulajdonságaikat. A négyzet elforgatva is 4 egyenlő oldalú és 4 derékszögű marad, tehát négyzet.',
    hint: 'Megváltozik az oldalak hossza vagy a szögek nagysága attól, hogy elfordítod?',
    breakdown: [
      { label: 'Elforgatás hatása', value: 'Nem változtat a belső geometriai tulajdonságokon' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Melyik alakzat tartozik a „Négyszögek” csoportjába?',
    options: [
      'Trapéz',
      'Szabályos ötszög',
      'Derékszögű háromszög',
      'Kör'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz négyszög, mert pontosan 4 oldala és 4 csúcsa van (ebből 2 szemközti oldala párhuzamos). Az ötszögnek 5, a háromszögnek 3 oldala van, a kör pedig nem sokszög.',
    hint: 'Melyik alakzatnak van pontosan 4 oldala?',
    breakdown: [
      { label: 'Trapéz', value: 'Négyszög (4 oldal, 4 csúcs)' }
    ]
  },

  // ========================================================
  // --- 3. SZINT: LOGIKAI CSOPORTOSÍTÁS ÉS KAKUKKTOJÁS ---
  // ========================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Melyik a kakukktojás az alábbi 4 alakzat közül: [Kör, Négyzet, Téglalap, Háromszög]?',
    options: [
      'A Kör, mert görbe vonal határolja, míg a többi egyenes szakaszokkal határolt sokszög',
      'A Háromszög, mert annak van a legtöbb oldala',
      'A Négyzet, mert annak minden oldala egyenlő',
      'A Téglalap, mert van hosszabbik oldala'
    ],
    correctAnswer: 0,
    explanation: 'A kör a kakukktojás, mert azt egyetlen görbe vonal határolja és nincsenek csúcsai, míg a négyzet, téglalap és háromszög mind sokszögek, amelyeket egyenes szakaszok határolnak.',
    hint: 'Milyen vonalak határolják az alakzatokat?',
    breakdown: [
      { label: 'Kakukktojás', value: 'Kör' },
      { label: 'Indoklás', value: 'Görbe határvonalú, a többi sokszög' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Melyik a kakukktojás az alábbi csoportban: [Kocka, Téglatest, Gúla, Kör]?',
    options: [
      'A Kör, mert az egy 2D síkidom, míg a másik három 3D térbeli test',
      'A Kocka, mert annak minden lapja négyzet',
      'A Gúla, mert van csúcsa',
      'A Téglatest, mert téglalapok határolják'
    ],
    correctAnswer: 0,
    explanation: 'A kör egy lapos síkidom (2D), a kocka, a téglatest és a gúla viszont térkitöltő, térbeli testek (3D).',
    hint: 'Melyiket tudod rásimítani a síkra vastagság nélkül, és melyiknek van térfogata?',
    breakdown: [
      { label: 'Kakukktojás', value: 'Kör (2D síkidom)' },
      { label: 'Többiek', value: '3D térbeli testek' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik a kakukktojás az alábbi forgástestek és soklapúak között: [Kúp, Henger, Gömb, Kocka]?',
    options: [
      'A Kocka, mert csak síklapok határolják (poliéder), míg a másik három forgástest görbe felülettel',
      'A Gömb, mert nincs csúcsa',
      'A Kúp, mert hegyes a teteje',
      'A Henger, mert magasabb, mint széles'
    ],
    correctAnswer: 0,
    explanation: 'A kúp, a henger és a gömb mind forgástestek, amelyek rendelkeznek görbült felülettel. A kockát kizárólag sík négyzetlapok határolják, egyetlen görbe felülete sincs.',
    hint: 'Melyik testnek nincs semmilyen görbült része, csak sima síklapjai?',
    breakdown: [
      { label: 'Kakukktojás', value: 'Kocka' },
      { label: 'Indoklás', value: 'Soklapú test (poliéder), míg a többi forgástest' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Egy dobozban a következő tárgyak vannak: fémkanál, radír, dobókocka, teniszlabda. Melyik tárgy modellezhető GÖMBKÉNT?',
    options: [
      'A teniszlabda',
      'A dobókocka',
      'A fémkanál',
      'A radír'
    ],
    correctAnswer: 0,
    explanation: 'A teniszlabda alakja gömb, mivel minden pontja a felületén közel azonos távolságra van a középpontjától. A dobókocka kockát, a radír téglatestet modellez.',
    hint: 'Melyik tárgy teljesen kerek a térben minden irányból?',
    breakdown: [
      { label: 'Teniszlabda', value: 'Gömb modellje' },
      { label: 'Dobókocka', value: 'Kocka modellje' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Miért lehet az [Egyenlő oldalú háromszög, Négyzet, Rombusz, Általános téglalap] csoportban a téglalap a kakukktojás?',
    options: [
      'Mert a téglalap oldalai nem mind egyenlő hosszúak, míg a másik háromnak minden oldala egyenlő',
      'Mert a téglalapnak 4 szöge van',
      'Mert a téglalap nem síkidom',
      'Mert a téglalapnak nincsenek derékszögei'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenlő oldalú háromszög, a négyzet és a rombusz közös tulajdonsága, hogy minden oldaluk egyenlő hosszú. Az általános téglalapnak csak a szemközti oldalai egyenlők, de a szomszédosak nem, így kilóg a sorból.',
    hint: 'Hasonlítsd össze az alakzatok oldalainak hosszát!',
    breakdown: [
      { label: 'Téglalap', value: 'Nem minden oldala egyenlő' },
      { label: 'Másik három', value: 'Minden oldaluk azonos hosszú' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Peti azt állítja: „A négyzet egy speciális téglalap.” Igaza van Petinek?',
    options: [
      'Igen, mert a négyzet rendelkezik a téglalap minden tulajdonságával (4 szög, 4 derékszög, szemközti oldalak párhuzamosak és egyenlők), plusz még minden oldala is egyenlő',
      'Nem, mert a négyzet és a téglalap két teljesen különálló alakzat, semmi közük egymáshoz',
      'Nem, mert a téglalap a négyzet speciális esete, és nem fordítva',
      'Igen, de csak akkor, ha a négyzet kék színű'
    ],
    correctAnswer: 0,
    explanation: 'Peti állítása helyes! A téglalap definíciója: olyan négyszög, amelynek minden szöge derékszög. Mivel a négyzetnek is minden szöge derékszög, ezért a négyzet is téglalap, méghozzá egyenlő oldalú téglalap.',
    hint: 'Gondolj a tulajdonságok halmazára: a négyzet tud mindent, amit a téglalap tud?',
    breakdown: [
      { label: 'Téglalap feltétel', value: '4 derékszög' },
      { label: 'Négyzet', value: 'Teljesíti a feltételt + oldalai is egyenlők' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Melyik alakzat felel meg a következő leírásnak: „Sokszög, 4 oldala van, minden oldala egyenlő, de szögei nem derékszögek”?',
    options: [
      'Rombusz (nem négyzet)',
      'Téglalap',
      'Szabályos háromszög',
      'Trapéz'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 60 60" fill="none">
        <polygon points="30,8 52,30 30,52 8,30" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2.5" />
      </svg>
    ),
    explanation: 'A rombusz olyan négyszög, amelynek mind a 4 oldala egyenlő hosszú. Ha a szögei nem derékszögek, akkor ferde rombuszról beszélünk.',
    hint: 'Képzelj el egy meglökött, ferde négyzetet!',
    breakdown: [
      { label: '4 egyenlő oldal', value: 'Rombusz tulajdonsága' },
      { label: 'Nem derékszögű', value: 'Nem négyzet alakú rombusz' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Kati két csoportba válogatta a testeket: 1. csoport: Kocka, Téglatest, Piramis; 2. csoport: Henger, Kúp, Gömb. Mi volt Kati válogatási szempontja?',
    options: [
      '1. csoport: csak síklapok határolják (poliéderek); 2. csoport: görbe felületük is van (forgástestek)',
      '1. csoport: nehéz testek; 2. csoport: könnyű testek',
      '1. csoport: fa testek; 2. csoport: fém testek',
      '1. csoport: nincs csúcsuk; 2. csoport: sok csúcsuk van'
    ],
    correctAnswer: 0,
    explanation: 'A kockát, téglatestet és piramist kizárólag sík lapok határolják (soklapú testek). A hengert, kúpot és gömböt görbe felület (palást vagy gömbfelület) határolja (forgástestek).',
    hint: 'Nézd meg a lapok és határoló felületek egyenességét vagy íveltségét!',
    breakdown: [
      { label: '1. csoport', value: 'Soklapú testek (Poliéderek)' },
      { label: '2. csoport', value: 'Görbe felületű testek (Forgástestek)' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Melyik alakzat illik a kérdőjel helyére a sorozatban: Háromszög (3) → ? → Ötszög (5) → Hatszög (6)?',
    options: [
      'Négyszög (pl. négyzet vagy téglalap)',
      'Kör',
      'Kocka',
      'Nyolcszög'
    ],
    correctAnswer: 0,
    explanation: 'A sorozat az oldalak száma szerint növekvő sokszögeket tartalmaz: 3 oldalú (háromszög) után a 4 oldalú négyszög következik, majd az 5 oldalú ötszög és 6 oldalú hatszög.',
    hint: '3 után melyik egész szám jön 5 előtt?',
    breakdown: [
      { label: 'Hiányzó elem', value: '4 oldalú sokszög (négyszög)' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Miért tartozik a konzervdoboz és a ceruzatartó henger azonos geometriai csoportba egy labdával szemben?',
    options: [
      'Mert mindkettő henger alakú (két sík körlap és görbe palást), míg a labda gömb (egyetlen zárt gömbfelület)',
      'Mert a labdának vannak élei, a többinek nincsenek',
      'Mert a henger síkidom, a labda pedig test',
      'Semmi geometriai különbség nincs köztük'
    ],
    correctAnswer: 0,
    explanation: 'A konzervdoboz henger, amelynek van két sík kör alaplapja és egy görbe palástja (meg tud állni a talpán). A labda gömb, aminek nincsenek sík lapjai, minden irányban gömbfelület határolja.',
    hint: 'Tedd le őket az asztalra: melyik áll meg sík lapon, és melyik gurul el azonnal minden irányba?',
    breakdown: [
      { label: 'Henger', value: '2 sík körlap + görbe palást' },
      { label: 'Gömb', value: 'Nincs síklapja, csak folytonos görbült felület' }
    ]
  }
];

const levelConfigs: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapvető tulajdonságok',
    description: 'Síkidomok és testek, egyenes és görbe határvonalak felismerése',
    passingScore: 70
  },
  2: {
    title: '2. Szint: Csoportosítás és táblázatok',
    description: 'Egy és két szempont szerinti szétválogatás, kétirányú táblázat',
    passingScore: 70
  },
  3: {
    title: '3. Szint: Logika és kakukktojás',
    description: 'Összetett geometriai csoportok, kizárási elv, kakukktojás keresése',
    passingScore: 70
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'dim-diff',
    title: 'Síkidom vs. Test (2D vs. 3D)',
    icon: <Box className="w-5 h-5 text-blue-500" />,
    formula: '2D: Síkba simul • 3D: Teret tölt be',
    note: 'A síkidomnak csak területe van (pl. négyzet, kör), a testnek felülete és térfogata is van (pl. kocka, henger).'
  },
  {
    id: 'boundary-diff',
    title: 'Sokszögek vs. Görbék',
    icon: <Shapes className="w-5 h-5 text-emerald-500" />,
    formula: 'Sokszög: csak egyenes szakaszok',
    note: 'A sokszögeknél az oldalak száma = a csúcsok számával. A kört és ellipszist zárt görbe vonal határolja.'
  },
  {
    id: 'odd-one-out',
    title: 'Kakukktojás elv',
    icon: <Filter className="w-5 h-5 text-purple-500" />,
    formula: 'Közös tulajdonság + pontos indoklás',
    note: 'A kakukktojást mindig meg kell indokolni: miben különbözik az egy szem a csoport többi tagjától.'
  }
];

export const GroupingQuiz: React.FC<GroupingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-geom-grouping-quiz"
      title="Csoportosítások Kvíz és Gyakorlás"
      subtitle="Gyakorold az alakzatok csoportosítását, a tulajdonságok felismerését és a kakukktojás feladványokat 3 nehézségi szinten!"
      badge="📦 5. Osztály • III. Geometria"
      themeColor="blue"
      levels={levelConfigs}
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó kártyapárokat!',
          description: 'Párosítsd az alakzatokat, tulajdonságokat és kizárási indoklásokat 3 nehézségi szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <GroupingMatcher
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
          subtitle: 'Válogasd szét az alakzatokat kategóriák szerint!',
          description: 'Rendezd az alakzatokat síkidom/test, egyenes/görbe határ vagy oldalszám alapján!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <GroupingSorter
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

export default GroupingQuiz;
