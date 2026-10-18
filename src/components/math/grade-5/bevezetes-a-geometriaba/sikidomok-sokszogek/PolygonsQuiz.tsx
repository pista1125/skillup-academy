import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { PolygonsMatcher } from './PolygonsMatcher';
import { PolygonsSorter } from './PolygonsSorter';

export interface PolygonsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const POLYGONS_QUESTIONS: Question[] = [
  // ==========================================
  // 1. SZINT: ALAPFOGALMAK (1-10)
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mi a sokszög (poligon) pontos geometriai definíciója?',
    options: [
      'Egyszerű zárt töröttvonal által határolt síkrész',
      'Bármilyen zárt vonallal határolt síkrész (pl. kör is)',
      'Három vagy több egymást metsző egyenes által alkotott ábra',
      'Olyan síkidom, amelynek minden oldala egyenlő hosszú'
    ],
    correctAnswer: 0,
    explanation: 'A sokszöget egyszerű (önmagát nem metsző) zárt töröttvonal határolja a síkban.',
    hint: 'A határvonal kizárólag egyenes szakaszokból áll, nem lehet benne görbe ív.',
    breakdown: [
      { label: 'Határoló vonal', value: 'Egyszerű zárt töröttvonal' },
      { label: 'Síkidom fajtája', value: 'Egyenes vonalakkal határolt síkrész' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Hány átlója van egy háromszögnek?',
    options: [
      '0 átlója van',
      '1 átlója van',
      '3 átlója van',
      '2 átlója van'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="27,6 8,30 46,30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <circle cx="27" cy="6" r="2" fill="#b45309" />
        <circle cx="8" cy="30" r="2" fill="#b45309" />
        <circle cx="46" cy="30" r="2" fill="#b45309" />
      </svg>
    ),
    explanation: 'Az átló definíció szerint két NEM szomszédos csúcsot köt össze. A háromszögben minden csúcs szomszédos az összes többivel, így a háromszögnek pontosan 0 átlója van (n - 3 = 3 - 3 = 0).',
    hint: 'Gondolj a képletre: n · (n - 3) : 2. Ha n = 3, akkor 3 · 0 : 2 = 0.',
    breakdown: [
      { label: 'Képlet', value: 'n - 3 = 3 - 3 = 0 átló egy csúcsból' },
      { label: 'Összes átló', value: '0 darab' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Mennyi BÁRMELY háromszög belső szögeinek összege?',
    options: [
      '180°',
      '360°',
      '90°',
      'A háromszög méretétől függ'
    ],
    correctAnswer: 0,
    explanation: 'A síkban minden háromszög három belső szögének összege pontosan 180°: α + β + γ = 180°.',
    hint: 'Egy egyenesszöggel (fél fordulattal) egyezik meg az összeg.',
    breakdown: [
      { label: 'Alapszabály', value: 'α + β + γ = 180°' },
      { label: 'Érvényesség', value: 'Minden síkbeli háromszögre kötelező' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Mi az összefüggés a kör sugara (r) és átmérője (d) között?',
    options: [
      'Az átmérő a sugár kétszerese: d = 2 · r',
      'A sugár az átmérő kétszerese: r = 2 · d',
      'Az átmérő a sugár négyzete: d = r · r',
      'A sugár és az átmérő mindig pontosan egyenlő'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-14 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="20" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4" />
        <line x1="5" y1="25" x2="45" y2="25" stroke="#2563eb" strokeWidth="2" />
        <circle cx="25" cy="25" r="2.5" fill="#ef4444" />
      </svg>
    ),
    explanation: 'Az átmérő a kör középpontján átmenő szakasz, amely két sugárból áll: d = 2 · r, illetve r = d / 2.',
    hint: 'Ha a körzőt 5 cm-re nyitod ki (ez az r), a kapott kör 10 cm széles lesz (ez a d).',
    breakdown: [
      { label: 'Átmérő képlete', value: 'd = 2 · r' },
      { label: 'Sugár képlete', value: 'r = d : 2' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Hány oldala és hány csúcsa van egy hatszögnek?',
    options: [
      '6 oldala és 6 csúcsa',
      '6 oldala és 5 csúcsa',
      '6 oldala és 9 csúcsa',
      '8 oldala és 6 csúcsa'
    ],
    correctAnswer: 0,
    explanation: 'Minden n-szögben az oldalak száma, a csúcsok száma és a belső szögek száma megegyezik: n = 6.',
    hint: 'A sokszög neve pontosan elárulja az oldalszámát és csúcsszámát.',
    breakdown: [
      { label: 'Oldalak száma', value: '6 oldal' },
      { label: 'Csúcsok száma', value: '6 csúcs' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Hogyan nevezzük azt a háromszöget, amelynek van egy 90°-os szöge?',
    options: [
      'Derékszögű háromszög',
      'Hegyesszögű háromszög',
      'Szabályos háromszög',
      'Tompaszögű háromszög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="12,6 12,30 44,30" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
        {/* Magyar derékszög sarokjelölés: negyedkörív + pont */}
        <path d="M 22 30 A 10 10 0 0 0 12 20" fill="none" stroke="#047857" strokeWidth="1.5" />
        <circle cx="17" cy="25" r="1.3" fill="#047857" />
      </svg>
    ),
    explanation: 'A pontosan egy 90°-os szöggel rendelkező háromszög a derékszögű háromszög. Szárai a befogók, szemközti oldala az átfogó.',
    hint: 'A derékszöget Magyarországon negyedkörívvel és benne egy ponttal jelöljük.',
    breakdown: [
      { label: 'Derékszög', value: 'α = 90° (negyedkörív + pont)' },
      { label: 'Elnevezés', value: 'Derékszögű háromszög' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Hány átlója van összesen egy négyszögnek?',
    options: [
      '2 átlója',
      '4 átlója',
      '1 átlója',
      '0 átlója'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="10,8 44,8 44,28 10,28" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <line x1="10" y1="8" x2="44" y2="28" stroke="#1d4ed8" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="44" y1="8" x2="10" y2="28" stroke="#1d4ed8" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    ),
    explanation: 'Egy négyszög 4 csúcsából összesen 2 átló húzható, amelyek a négyszög belsejében metszik egymást.',
    hint: 'Rajzolj egy téglalapot és kösd össze a szemközti sarkokat!',
    breakdown: [
      { label: 'Képlet', value: '4 · (4 - 3) : 2 = 4 · 1 : 2 = 2' },
      { label: 'Átlók száma', value: '2 darab' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Mi a körcikk a geometriában?',
    options: [
      'Két sugár és a közbezárt körív által határolt síkrész (pl. pizzaszelet)',
      'Egy húr és a hozzá tartozó körív által levágott rész',
      'A körvonal bármely két pontja közötti ívdarab',
      'A kör teljes kerületének a fele'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-14 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="20" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M 25 25 L 45 25 A 20 20 0 0 0 39 11 Z" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.8" />
        <circle cx="25" cy="25" r="2" fill="#ef4444" />
      </svg>
    ),
    explanation: 'A körcikket két sugár és a köztük lévő körív határolja (legszemléletesebb példája egy szelet pizza vagy torta).',
    hint: 'Gondolj a tortaszeletre, amit a közepétől vágunk ki.',
    breakdown: [
      { label: 'Határoló elemek', value: '2 sugár + 1 körív' },
      { label: 'Hétköznapi hasonlat', value: 'Pizzaszelet' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Mennyi bármely négyszög belső szögeinek összege?',
    options: [
      '360°',
      '180°',
      '720°',
      'Mindig 100°'
    ],
    correctAnswer: 0,
    explanation: 'Minden négyszög egy átlójával két háromszögre bontható szét, így belső szögeinek összege 2 × 180° = 360°.',
    hint: 'Gondolj a téglalapra: 4 darab 90°-os sarka van (4 × 90°).',
    breakdown: [
      { label: 'Felbontás', value: '2 darab háromszög' },
      { label: 'Összeg', value: '2 · 180° = 360°' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Milyen tulajdonságok tesznek egy sokszöget SZABÁLYOS SOKSZÖGGÉ?',
    options: [
      'Minden oldala EGYENLŐ ÉS minden belső szöge EGYENLŐ',
      'Csak az, hogy minden oldala egyenlő hosszú',
      'Csak az, hogy minden szöge derékszög',
      'Páros számú oldala van és van szimmetriatengelye'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos sokszög definíciója szerint egyszerre egyenlő oldalú és egyenlő szögű (pl. szabályos háromszög, négyzet).',
    hint: 'A rombusz minden oldala egyenlő, mégsem szabályos négyszög, mert a szögei nem egyenlők!',
    breakdown: [
      { label: '1. Feltétel', value: 'Minden oldala egyenlő (a = b = c...)' },
      { label: '2. Feltétel', value: 'Minden belső szöge egyenlő (α = β = γ...)' }
    ]
  },

  // ==========================================
  // 2. SZINT: ALKALMAZÁS & SZÁMÍTÁSOK (11-20)
  // ==========================================
  {
    id: 'l2-q11',
    level: 2,
    prompt: 'Egy háromszög két belső szöge 50° és 70°. Mekkora a harmadik szöge?',
    options: [
      '60°',
      '50°',
      '80°',
      '70°'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög belső szögeinek összege 180°. A két ismert szög összege: 50° + 70° = 120°. A harmadik szög: 180° - 120° = 60°.',
    hint: 'Vond ki a 180°-ból az ismert szögek összegét!',
    breakdown: [
      { label: 'Ismert szögek összege', value: '50° + 70° = 120°' },
      { label: 'Harmadik szög', value: '180° - 120° = 60°' }
    ]
  },
  {
    id: 'l2-q12',
    level: 2,
    prompt: 'Szerkeszthető-e háromszög 4 cm, 5 cm és 10 cm hosszúságú szakaszokból?',
    options: [
      'Nem, mert a két rövidebb oldal összege (4 + 5 = 9) kisebb a leghosszabbnál (10)',
      'Igen, mert mind a három szakasz pozitív hosszúságú',
      'Igen, mert 4 + 5 + 10 = 19, ami páratlan szám',
      'Nem, mert nincs benne derékszög'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség szerint bármely két oldal összegének nagyobbnak kell lennie a harmadiknál. Itt 4 + 5 = 9 < 10, így a két rövidebb szakasz nem érne össze!',
    hint: 'Két rövid botot próbálsz összekötni egy hosszú felett: ha összegük rövidebb a hosszú botnál, le sem érnek a végei.',
    breakdown: [
      { label: 'Két rövidebb oldal', value: '4 cm + 5 cm = 9 cm' },
      { label: 'Leghosszabb oldal', value: '10 cm' },
      { label: 'Összehasonlítás', value: '9 cm < 10 cm ✗ (Nem szerkeszthető)' }
    ]
  },
  {
    id: 'l2-q13',
    level: 2,
    prompt: 'Ha a rajzórán egy 14 cm átmérőjű (d = 14 cm) kört kell rajzolnod, hány cm-es körzőnyílást kell beállítanod?',
    options: [
      '7 cm-es nyílást, mert a sugár a körzőnyílás: r = 14 : 2 = 7 cm',
      '14 cm-es nyílást, mert akkora kört kértek',
      '28 cm-es nyílást, mert d = 2 · r',
      '3,5 cm-es nyílást'
    ],
    correctAnswer: 0,
    explanation: 'A körző hegye és a ceruza hegye közötti távolság a SUGÁR (r). Mivel d = 14 cm, ezért r = d / 2 = 7 cm.',
    hint: 'Gyakori csapda: a körzőbe mindig a sugarat kell venni, nem az átmérőt!',
    breakdown: [
      { label: 'Kért átmérő', value: 'd = 14 cm' },
      { label: 'Körzőnyílás (sugár)', value: 'r = d : 2 = 14 : 2 = 7 cm' }
    ]
  },
  {
    id: 'l2-q14',
    level: 2,
    prompt: 'Hány átló húzható EGYETLEN CSÚCSBÓL egy nyolcszögben (n = 8)?',
    options: [
      '5 átló (n - 3 = 8 - 3 = 5)',
      '8 átló',
      '20 átló',
      '4 átló'
    ],
    correctAnswer: 0,
    explanation: 'Egy csúcsból n - 3 átló húzható, mivel a csúcs önmagába nem húzhat átlót, és a 2 szomszédos csúcsba futó vonal oldal, nem átló. 8 - 3 = 5.',
    hint: 'Vonj le 3-at a csúcsok számából!',
    breakdown: [
      { label: 'Csúcsok száma', value: 'n = 8' },
      { label: 'Nem átló csúcsok', value: '3 (önmaga + 2 szomszéd)' },
      { label: '1 csúcsból induló átlók', value: '8 - 3 = 5 átló' }
    ]
  },
  {
    id: 'l2-q15',
    level: 2,
    prompt: 'Egy derékszögű háromszög egyik hegyesszöge 35°. Mekkora a másik hegyesszöge?',
    options: [
      '55° (mivel 90° - 35° = 55°)',
      '65°',
      '45°',
      '145°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="10,6 10,30 46,30" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
        {/* Magyar derékszög negyedkörív + pont */}
        <path d="M 20 30 A 10 10 0 0 0 10 20" fill="none" stroke="#047857" strokeWidth="1.5" />
        <circle cx="15" cy="25" r="1.3" fill="#047857" />
        <text x="36" y="27" className="text-[7.5px] font-bold fill-emerald-800">35°</text>
      </svg>
    ),
    explanation: 'A derékszögű háromszögben a derékszög 90°, így a két hegyesszög összege mindig pontosan 90° (pótszögek). 90° - 35° = 55°.',
    hint: 'A 180°-ból a derékszög 90°-ot elvisz, a maradék 90°-on osztozik a két hegyesszög.',
    breakdown: [
      { label: 'Derékszög', value: '90°' },
      { label: 'Hegyesszögek összege', value: '90°' },
      { label: 'Másik hegyesszög', value: '90° - 35° = 55°' }
    ]
  },
  {
    id: 'l2-q16',
    level: 2,
    prompt: 'Hány átlója van ÖSSZESEN egy ötszögnek (pentagonnak)?',
    options: [
      '5 átló',
      '10 átló',
      '2 átló',
      '8 átló'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="27,4 47,15 40,32 14,32 7,15" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.8" />
        <line x1="27" y1="4" x2="40" y2="32" stroke="#6366f1" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <line x1="27" y1="4" x2="14" y2="32" stroke="#6366f1" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <line x1="7" y1="15" x2="40" y2="32" stroke="#6366f1" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <line x1="7" y1="15" x2="47" y2="15" stroke="#6366f1" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <line x1="47" y1="15" x2="14" y2="32" stroke="#6366f1" strokeWidth="1" strokeDasharray="1.5 1.5" />
      </svg>
    ),
    explanation: 'Az összes átló képlete: n · (n - 3) : 2. Ötszögnél: 5 · (5 - 3) : 2 = 5 · 2 : 2 = 5 átló. Az ötszög az egyetlen sokszög, amelynek oldalszáma megegyezik az átlói számával!',
    hint: 'Az ötszög összes átlója egy szabályos ötágú csillagot rajzol ki a belsejében.',
    breakdown: [
      { label: 'Képlet', value: 'n · (n - 3) : 2' },
      { label: 'Számítás', value: '5 · 2 : 2 = 5 átló' }
    ]
  },
  {
    id: 'l2-q17',
    level: 2,
    prompt: 'Mennyi egy ötszög belső szögeinek összege?',
    options: [
      '540°',
      '360°',
      '720°',
      '500°'
    ],
    correctAnswer: 0,
    explanation: 'Az n-szög belső szögeinek összege: (n - 2) · 180°. Ötszögnél: (5 - 2) · 180° = 3 · 180° = 540°.',
    hint: 'Egy csúcsból húzott átlókkal 3 darab háromszögre vágható szét az ötszög.',
    breakdown: [
      { label: 'Háromszögek száma', value: '5 - 2 = 3 db' },
      { label: 'Szögek összege', value: '3 · 180° = 540°' }
    ]
  },
  {
    id: 'l2-q18',
    level: 2,
    prompt: 'Egy egyenlő szárú háromszög szárai 8 cm hosszúak, alapja 6 cm. Mekkora a háromszög kerülete (K)?',
    options: [
      '22 cm (8 + 8 + 6 = 22 cm)',
      '14 cm',
      '20 cm',
      '24 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú háromszögnek KÉT egyenlő szára van (mindkettő 8 cm), plusz az alap (6 cm). Kerülete: K = 2 · a + c = 8 + 8 + 6 = 22 cm.',
    hint: 'Ne felejtsd el, hogy a szár szóból kettő van: a bal és a jobb szár is 8 cm!',
    breakdown: [
      { label: 'Szárak', value: '8 cm és 8 cm' },
      { label: 'Alap', value: '6 cm' },
      { label: 'Kerület', value: '8 + 8 + 6 = 22 cm' }
    ]
  },
  {
    id: 'l2-q19',
    level: 2,
    prompt: 'Egy egyenlő szárú háromszög szárai közötti szöge (szárszöge) 40°. Mekkorák az alapon fekvő szögei?',
    options: [
      '70° és 70°',
      '60° és 60°',
      '40° és 40°',
      '80° és 80°'
    ],
    correctAnswer: 0,
    explanation: 'A belső szögek összege 180°. A szárszöget levonva: 180° - 40° = 140°. Mivel az alapon fekvő két szög egyenlő, ezért elosztjuk kettővel: 140° : 2 = 70° mindkettő.',
    hint: 'Az alapon fekvő két szög mindig pontosan egyenlő nagyságú az egyenlő szárú háromszögben.',
    breakdown: [
      { label: 'Maradék szögösszeg', value: '180° - 40° = 140°' },
      { label: 'Alapi szögek', value: '140° : 2 = 70° és 70°' }
    ]
  },
  {
    id: 'l2-q20',
    level: 2,
    prompt: 'Melyik tulajdonság IGAZ mind a négyzetre, mind a rombuszra?',
    options: [
      'Mindkettőnek mind a 4 oldala egyenlő hosszú',
      'Mindkettőnek minden szöge derékszög (90°)',
      'Mindkettőnek egyenlő hosszúak az átlói',
      'Mindkettőnek 4 szimmetriatengelye van'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet és a rombusz közös alapvető tulajdonsága, hogy mindkettő egyenlő oldalú négyszög (a = b = c = d). A négyzet sarkai ráadásul derékszögek is.',
    hint: 'A rombuszt „megdöntött négyzetnek” is szokták képzelni: oldalai egyformák, de szögei ferdék.',
    breakdown: [
      { label: 'Közös vonás', value: '4 egyenlő hosszúságú oldal' },
      { label: 'Különbség', value: 'A négyzet szögei derékszögek, a rombuszé ferdék' }
    ]
  },

  // ==========================================
  // 3. SZINT: MESTER & ÖSSZETETT (21-30)
  // ==========================================
  {
    id: 'l3-q21',
    level: 3,
    prompt: 'Mekkora egy SZABÁLYOS HATSZÖG egyetlen belső szöge?',
    options: [
      '120° (720° : 6 = 120°)',
      '108°',
      '60°',
      '135°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="18,4 36,4 46,18 36,32 18,32 8,18" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
        <text x="27" y="20" textAnchor="middle" className="text-[8.5px] font-black fill-emerald-800">120°</text>
      </svg>
    ),
    explanation: 'A hatszög belső szögeinek összege: (6 - 2) · 180° = 4 · 180° = 720°. Mivel szabályos hatszögről van szó, mind a 6 szöge egyenlő: 720° : 6 = 120°.',
    hint: 'Először számold ki a hatszög belső szögeinek összegét, majd oszd el 6-tal!',
    breakdown: [
      { label: 'Belső szögek összege', value: '(6 - 2) · 180° = 720°' },
      { label: 'Egy szög értéke', value: '720° : 6 = 120°' }
    ]
  },
  {
    id: 'l3-q22',
    level: 3,
    prompt: 'Hány átlója van összesen egy hétszögnek (n = 7)?',
    options: [
      '14 átló (7 · 4 : 2 = 14)',
      '21 átló',
      '7 átló',
      '28 átló'
    ],
    correctAnswer: 0,
    explanation: 'Képlet: n · (n - 3) : 2. Hétszögnél: 7 · (7 - 3) : 2 = 7 · 4 : 2 = 28 : 2 = 14 átló.',
    hint: '7 szorozva (7 - 3)-mal, majd osztva 2-vel.',
    breakdown: [
      { label: 'Képlet', value: '7 · (7 - 3) : 2' },
      { label: 'Számítás', value: '7 · 4 : 2 = 14 átló' }
    ]
  },
  {
    id: 'l3-q23',
    level: 3,
    prompt: 'Létezhet-e olyan háromszög, amelynek van egy derékszöge és egy tompaszöge is egyszerre?',
    options: [
      'Nem létezhet, mert már ez a két szög összege is meghaladná a 180°-ot',
      'Igen, ha a harmadik szög negatív',
      'Igen, a tompaszögű derékszögű háromszög ilyen',
      'Csak nagyon nagy méretű háromszögeknél lehetséges'
    ],
    correctAnswer: 0,
    explanation: 'A derékszög 90°, a tompaszög pedig szigorúan nagyobb mint 90°. A kettő összege már önmagában több mint 180°, így harmadik szög nem is létezhetne!',
    hint: 'Egy háromszögben legfeljebb 1 derékszög VAGY legfeljebb 1 tompaszög lehet.',
    breakdown: [
      { label: 'Derékszög', value: '90°' },
      { label: 'Tompaszög', value: '> 90°' },
      { label: 'Kettő összege', value: '> 180° ✗ (Lehetetlen a síkban)' }
    ]
  },
  {
    id: 'l3-q24',
    level: 3,
    prompt: 'Melyik négyszögre igaz, hogy átlói MERŐLEGESEK egymásra és FELEZIK egymást, de szögei nem feltétlenül derékszögek?',
    options: [
      'Rombusz',
      'Téglalap',
      'Paralelogramma',
      'Trapéz'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
        <polygon points="27,4 45,18 27,32 9,18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <line x1="27" y1="4" x2="27" y2="32" stroke="#b45309" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <line x1="9" y1="18" x2="45" y2="18" stroke="#b45309" strokeWidth="1" strokeDasharray="1.5 1.5" />
      </svg>
    ),
    explanation: 'A rombusz átlói merőlegesen metszik és felezik egymást, valamint szögfelezők is. A téglalap átlói nem merőlegesek.',
    hint: 'Képzelj el egy 4 egyenlő oldalú négyszöget, amelynek két hegyes és két tompa szöge van.',
    breakdown: [
      { label: 'Alakzat', value: 'Rombusz' },
      { label: 'Átlók tulajdonsága', value: 'Merőlegesen felezik egymást' }
    ]
  },
  {
    id: 'l3-q25',
    level: 3,
    prompt: 'Mennyi a nyolcszög (oktogon) belső szögeinek összege?',
    options: [
      '1080° (6 · 180° = 1080°)',
      '900°',
      '720°',
      '1440°'
    ],
    correctAnswer: 0,
    explanation: 'Képlet: (n - 2) · 180°. Nyolcszögnél: (8 - 2) · 180° = 6 · 180° = 1080°.',
    hint: 'Egy nyolcszög 6 darab háromszögre vágható szét egy csúcsból induló átlókkal.',
    breakdown: [
      { label: 'Háromszögek száma', value: '8 - 2 = 6 db' },
      { label: 'Összeg', value: '6 · 180° = 1080°' }
    ]
  },
  {
    id: 'l3-q26',
    level: 3,
    prompt: 'Egy szabályos (egyenlő oldalú) háromszög kerülete 24 cm. Mekkora egy oldala és mekkorák a belső szögei?',
    options: [
      'Oldala 8 cm (24 : 3 = 8), minden szöge 60°',
      'Oldala 6 cm, minden szöge 90°',
      'Oldala 8 cm, szögei 45°, 45°, 90°',
      'Oldala 12 cm, szögei 60°, 60°, 60°'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög 3 oldala egyenlő: 24 : 3 = 8 cm. Három szöge is egyenlő: 180° : 3 = 60°.',
    hint: 'Szabályos háromszög = egyenlő oldalak (K/3) és egyenlő szögek (180°/3).',
    breakdown: [
      { label: 'Egy oldal hossza', value: '24 cm : 3 = 8 cm' },
      { label: 'Egy szög nagysága', value: '180° : 3 = 60°' }
    ]
  },
  {
    id: 'l3-q27',
    level: 3,
    prompt: 'Hogyan nevezzük azt a szakaszt, amely a körvonal két tetszőleges pontját köti össze a kör belsejében?',
    options: [
      'Húr',
      'Sugár',
      'Érintő',
      'Körív'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-14 h-14 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="20" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4" />
        <line x1="10" y1="35" x2="40" y2="35" stroke="#9333ea" strokeWidth="2" />
        <circle cx="10" cy="35" r="2" fill="#7e22ce" />
        <circle cx="40" cy="35" r="2" fill="#7e22ce" />
      </svg>
    ),
    explanation: 'A körvonal bármely két pontját összekötő belső szakasz a húr. Ha átmegy a középponton, akkor átmérőnek nevezzük.',
    hint: 'Mint a hangszeren kifeszített húr a köríven.',
    breakdown: [
      { label: 'Definíció', value: 'Körvonal két pontját összekötő szakasz' },
      { label: 'Leghosszabb húr', value: 'Az átmérő (d)' }
    ]
  },
  {
    id: 'l3-q28',
    level: 3,
    prompt: 'Melyik állítás IGAZ MINDEN TRAPÉZRA kivétel nélkül?',
    options: [
      'Van legalább egy pár párhuzamos oldala (alapok)',
      'Minden oldala különböző hosszúságú',
      'Van legalább két derékszöge',
      'Az átlói egyenlő hosszúak'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz meghatározása: olyan négyszög, amelynek van legalább egy pár párhuzamos oldala. (Ezért a paralelogramma és a téglalap is trapéz!).',
    hint: 'Gondolj a definícióra: egy pár párhuzamos oldal elengedhetetlen feltétel.',
    breakdown: [
      { label: 'Definíció', value: 'Legalább 1 pár párhuzamos oldal' },
      { label: 'Párhuzamos oldalak neve', value: 'Alapok' }
    ]
  },
  {
    id: 'l3-q29',
    level: 3,
    prompt: 'Hány szimmetriatengelye van egy SZABÁLYOS ÖTSZÖGNEK?',
    options: [
      '5 szimmetriatengelye van',
      '1 szimmetriatengelye van',
      '10 szimmetriatengelye van',
      'Nincs szimmetriatengelye'
    ],
    correctAnswer: 0,
    explanation: 'Minden szabályos n-szögnek pontosan n darab szimmetriatengelye van. Szabályos ötszögnél mind az 5 csúcsból a szemközti oldal felezőpontjába húzott egyenes szimmetriatengely.',
    hint: 'Szabályos háromszögnek 3, négyzetnek 4, szabályos ötszögnek...',
    breakdown: [
      { label: 'Szabályos n-szög', value: 'n darab szimmetriatengely' },
      { label: 'Ötszögnél', value: '5 szimmetriatengely' }
    ]
  },
  {
    id: 'l3-q30',
    level: 3,
    prompt: 'Egy sokszög belső szögeinek összege 900°. Hány oldala van ennek a sokszögnek?',
    options: [
      '7 oldala (hétszög), mert (7 - 2) · 180° = 900°',
      '6 oldala (hatszög)',
      '8 oldala (nyolcszög)',
      '5 oldala (ötszög)'
    ],
    correctAnswer: 0,
    explanation: 'Képlet: (n - 2) · 180° = 900°. Mindkét oldalt elosztva 180-nal: n - 2 = 900 : 180 = 5. Hozzáadva 2-t: n = 5 + 2 = 7 oldalú sokszög (hétszög).',
    hint: 'Oszd el a 900-at 180-nal, majd adj hozzá 2-t!',
    breakdown: [
      { label: 'Egyenlet', value: '(n - 2) · 180° = 900°' },
      { label: 'n - 2 értéke', value: '900° : 180° = 5' },
      { label: 'Oldalszám (n)', value: '5 + 2 = 7 oldal (hétszög)' }
    ]
  }
];

export const PolygonsQuiz: React.FC<PolygonsQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="5. Síkidomok, sokszögek kvíz"
      subtitle="30 feladat 3 szinten: sokszögek, átlók száma, háromszögek kettős csoportosítása, négyszögek és a kör"
      topicId="g5-geom-triangles-quiz"
      questions={POLYGONS_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="teal"
      cheatSheetCards={[
        {
          title: "Sokszögek képletei (n-szög)",
          content: "1 csúcsból induló átlók: n - 3\nÖsszes átló száma: n · (n - 3) : 2\nBelső szögek összege: (n - 2) · 180°\nHáromszög: 0 átló, 180°\nNégyszög: 2 átló, 360°\nÖtszög: 5 átló, 540°"
        },
        {
          title: "Háromszögek csoportosítása",
          content: "Oldalak szerint: Szabályos (3 egyenlő), Egyenlő szárú (2 egyenlő), Általános (mind különböző).\nSzögek szerint: Hegyesszögű (mind < 90°), Derékszögű (1 db 90° [negyedkörív + pont]), Tompaszögű (1 db > 90°).\nHáromszög-egyenlőtlenség: a + b > c."
        },
        {
          title: "A kör képletei és részei",
          content: "Átmérő: d = 2 · r\nSugár: r = d : 2\nHúr: körvonal két pontját összekötő szakasz (leghosszabb húr: d).\nKörcikk: két sugár + körív határolja (pizzaszelet).\nKörszelet: egy húr + körív határolja."
        }
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó síkidomokat és sokszögeket!',
          description: 'Párosítsd a sokszögeket, háromszögeket, négyszögeket és kör-részeket ábráikkal 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <PolygonsMatcher
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
          subtitle: 'Válogasd szét a síkidomokat kategóriáik szerint!',
          description: 'Rendezd a síkidomokat sokszögek/görbék, háromszög-típusok és négyszögek szerint!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <PolygonsSorter
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

export default PolygonsQuiz;
