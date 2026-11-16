import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MassMeasureMatcher } from './MassMeasureMatcher';
import { MassMeasureSorter } from './MassMeasureSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Kétkarú mérleg egyensúlyban: bal és jobb felirat */
const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={130}>
    <polygon points="120,40 106,112 134,112" fill="#64748b" />
    <rect x="92" y="110" width="56" height="9" rx="4" fill="#334155" />
    <line x1="40" y1="40" x2="200" y2="40" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
    <circle cx="120" cy="40" r="5" fill="#f59e0b" />
    {[40, 200].map((x) => (
      <g key={x}>
        <line x1={x} y1="40" x2={x - 22} y2="82" stroke="#475569" />
        <line x1={x} y1="40" x2={x + 22} y2="82" stroke="#475569" />
        <path d={`M ${x - 34} 82 Q ${x} 100 ${x + 34} 82 Z`} fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      </g>
    ))}
    <rect x="16" y="56" width="48" height="24" rx="5" fill="#fde68a" stroke="#a16207" />
    <text x="40" y="73" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">{left}</text>
    <rect x="170" y="56" width="60" height="24" rx="5" fill="#dbeafe" stroke="#1e40af" />
    <text x="200" y="73" textAnchor="middle" fontSize="11" fontWeight="bold" fill={right.includes('?') ? UNK : '#1e3a8a'}>{right}</text>
    <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">egyensúlyban van</text>
  </QFig>
);

/** Digitális konyhai mérleg kijelzővel */
const ScaleFig: React.FC<{ item: string; display: string }> = ({ item, display }) => (
  <QFig h={130}>
    <ellipse cx="120" cy="88" rx="80" ry="18" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
    <ellipse cx="120" cy="80" rx="70" ry="13" fill="#e2e8f0" stroke="#475569" />
    <rect x="92" y="98" width="56" height="20" rx="4" fill="#0f172a" />
    <text x="120" y="113" textAnchor="middle" fontSize="12" fontWeight="bold" fill={display.includes('?') ? '#f87171' : '#4ade80'} fontFamily="monospace">
      {display}
    </text>
    <rect x="96" y="38" width="48" height="36" rx="6" fill="#fef3c7" stroke="#a16207" />
    <text x="120" y="61" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">{item}</text>
  </QFig>
);

const CHART = [
  { n: 'fokhagyma', v: 1000, c: '#eab308' },
  { n: 'vöröshagyma', v: 750, c: '#f97316' },
  { n: 'sütőtök', v: 300, c: '#22c55e' },
  { n: 'burgonya', v: 1000, c: '#3b82f6' },
  { n: 'sárgarépa', v: 600, c: '#f43f5e' }
];

const ChartFig: React.FC = () => {
  const x0 = 78;
  const sc = 0.145;
  return (
    <QFig h={150}>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * 200 * sc} y1="10" x2={x0 + i * 200 * sc} y2="122" stroke="#e2e8f0" />
          <text x={x0 + i * 200 * sc} y="134" textAnchor="middle" fontSize="7.5" fill="#475569">{i * 200}</text>
        </g>
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`m${i}`} x1={x0 + (i * 200 + 100) * sc} y1="10" x2={x0 + (i * 200 + 100) * sc} y2="122" stroke="#f1f5f9" />
      ))}
      {CHART.map((d, i) => (
        <g key={d.n}>
          <text x={x0 - 4} y={25 + i * 22} textAnchor="end" fontSize="9" fill="#334155">{d.n}</text>
          <rect x={x0} y={15 + i * 22} width={d.v * sc} height="13" rx="2" fill={d.c} />
        </g>
      ))}
      <line x1={x0} y1="122" x2={x0 + 1000 * sc + 4} y2="122" stroke="#334155" />
      <text x="120" y="146" textAnchor="middle" fontSize="8.5" fill="#475569">a családi gazdaság termése (kg)</text>
    </QFig>
  );
};

const ContainerFig: React.FC<{ load: string; what: string }> = ({ load, what }) => (
  <QFig h={130}>
    <rect x="40" y="20" width="160" height="70" rx="4" fill="#1e40af" />
    {Array.from({ length: 10 }, (_, k) => (
      <line key={k} x1={50 + k * 15} y1="24" x2={50 + k * 15} y2="86" stroke="#3b82f6" strokeWidth="3" />
    ))}
    <rect x="70" y="36" width="100" height="38" rx="5" fill="#1e3a8a" />
    <text x="120" y="53" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">{load}</text>
    <text x="120" y="68" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#bfdbfe">{what}</text>
    <text x="120" y="106" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">össztömeg legfeljebb 6000 kg</text>
    <text x="120" y="121" textAnchor="middle" fontSize="10" fill="#334155">üres konténer: 3800 kg</text>
  </QFig>
);

const TruckFig: React.FC = () => (
  <QFig h={130}>
    <rect x="30" y="40" width="120" height="50" rx="4" fill="#16a34a" />
    <rect x="150" y="55" width="50" height="35" rx="6" fill="#15803d" />
    <rect x="160" y="60" width="26" height="14" rx="2" fill="#bae6fd" />
    <circle cx="60" cy="94" r="11" fill="#1e293b" />
    <circle cx="175" cy="94" r="11" fill="#1e293b" />
    <text x="90" y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">autó: 1250 kg</text>
    <text x="90" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">sofőr: 90 kg</text>
    <text x="120" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">össztömeg legfeljebb 3500 kg</text>
    <text x="120" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>rakomány: ? kg</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const MASS_MEASURE_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'mm-q1',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány dekagramm 1 kilogramm?',
    options: ['100 dkg', '10 dkg', '1000 dkg', '50 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. Ezt mutatja a kétkarú mérleg is a tankönyvben.'
  },
  {
    id: 'mm-q2',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    figure: <ScaleFig item="1 dkg" display="? g" />,
    question: 'Az 1 dkg-os súly van a mérlegen. Hány grammot mutat a kijelző?',
    options: ['10 g', '100 g', '1 g', '1000 g'],
    correctAnswer: 0,
    explanation: '1 dkg = 10 g.'
  },
  {
    id: 'mm-q3',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    figure: <ScaleFig item="liszt 1 kg" display="? g" />,
    question: 'Egy 1 kg-os zacskó liszt van a mérlegen. Hány grammot mutat a kijelző?',
    options: ['1000 g', '100 g', '10 g', '10 000 g'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg, és 1 dkg = 10 g, tehát 1 kg = 100 · 10 g = 1000 g.'
  },
  {
    id: 'mm-q4',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="1 kg" right="? dkg" />,
    question: 'A mérleg egyensúlyban van. Hány dekagramm van a jobb serpenyőben?',
    options: ['100 dkg', '10 dkg', '1 dkg', '1000 dkg'],
    correctAnswer: 0,
    explanation: 'Egyensúlynál a két oldalon ugyanakkora a tömeg: 1 kg = 100 dkg.'
  },
  {
    id: 'mm-q5',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyiknek kisebb a tömege 1 dkg-nál?',
    options: ['egy gemkapocs', 'egy alma', 'egy kenyér', 'egy iskolatáska'],
    correctAnswer: 0,
    explanation: 'A gemkapocs nagyon könnyű, csak körülbelül 1 g. Az 1 dkg 10 g.'
  },
  {
    id: 'mm-q6',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Mennyi lehet egy alma tömege?',
    options: ['230 g', '230 kg', '230 dkg', '2 g'],
    correctAnswer: 0,
    explanation: 'Egy alma kb. 20–25 dkg, vagyis 230 g körül. A 230 dkg már több mint 2 kg lenne!'
  },
  {
    id: 'mm-q7',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Mennyi lehet egy darab sajt tömege a boltban?',
    options: ['25 dkg', '25 kg', '25 g', '250 kg'],
    correctAnswer: 0,
    explanation: 'Egy darab sajt 25 dkg körül van. A 25 kg egy zsák krumpli tömege lehetne, a 25 g pedig csak egy falatnyi.'
  },
  {
    id: 'mm-q8',
    level: 1,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig />,
    question: 'Hány kilogramm burgonya termett a diagram szerint?',
    options: ['1000 kg', '750 kg', '600 kg', '100 kg'],
    correctAnswer: 0,
    explanation: 'A kék oszlop a burgonya, a 1000-es vonalig ér: 1000 kg.'
  },
  {
    id: 'mm-q9',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Milyen mértékegységet írnak a fűszeres zacskókra, például a bazsalikomra (8 ...)?',
    options: ['g', 'kg', 'km', 'l'],
    correctAnswer: 0,
    explanation: 'A fűszerek nagyon könnyűek, ezért grammban (g) adják meg a tömegüket: 8 g.'
  },
  {
    id: 'mm-q10',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik fűszer tömege kevesebb 10 dkg-nál?',
    options: ['bazsalikom: 8 g', 'őrölt paprika: 250 g', 'kakaó: 150 g', 'mustár: 200 g'],
    correctAnswer: 0,
    explanation: '10 dkg = 100 g. Csak a 8 g kevesebb 100 g-nál.'
  },

  // ---------- 2. szint ----------
  {
    id: 'mm-q11',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik két egész kilogramm közé esik a 96 dkg?',
    options: ['0 kg és 1 kg közé', '9 kg és 10 kg közé', '1 kg és 2 kg közé', '96 kg és 97 kg közé'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. A 96 dkg kevesebb 100 dkg-nál, tehát 1 kg-nál kevesebb: 0 kg és 1 kg közé esik.'
  },
  {
    id: 'mm-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hogyan írhatod fel a 27 g-ot dekagrammal és grammal?',
    options: ['2 dkg 7 g', '27 dkg', '20 dkg 7 g', '2 dkg 70 g'],
    correctAnswer: 0,
    explanation: '10 g = 1 dkg, így 20 g = 2 dkg. Marad még 7 g: 27 g = 2 dkg 7 g.'
  },
  {
    id: 'mm-q13',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány dekagramm 200 g?',
    options: ['20 dkg', '2 dkg', '200 dkg', '2000 dkg'],
    correctAnswer: 0,
    explanation: '10 g = 1 dkg, ezért 200 g = 200 : 10 dkg = 20 dkg.'
  },
  {
    id: 'mm-q14',
    level: 2,
    questionTypeBadge: 'Sorrend',
    question: 'Melyik a helyes növekvő sorrend?',
    options: [
      '80 g < 10 dkg < 250 g < 1 kg',
      '1 kg < 10 dkg < 80 g < 250 g',
      '10 dkg < 80 g < 250 g < 1 kg',
      '80 g < 250 g < 10 dkg < 1 kg'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk grammra: 80 g, 10 dkg = 100 g, 250 g, 1 kg = 1000 g. Így 80 < 100 < 250 < 1000.'
  },
  {
    id: 'mm-q15',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="1 kg" right="? · 250 g" />,
    question: 'Hány darab 250 g-os vaj kell a jobb serpenyőbe, hogy a mérleg egyensúlyban legyen az 1 kg-mal?',
    options: ['4', '2', '5', '10'],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g. 250 + 250 + 250 + 250 = 1000, tehát 4 darab.'
  },
  {
    id: 'mm-q16',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="1 kg" right="? · 200 g" />,
    question: 'Hány darab 200 g-os csomag tart egyensúlyt 1 kg-mal?',
    options: ['5', '4', '2', '20'],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g, és 1000 : 200 = 5.'
  },
  {
    id: 'mm-q17',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig />,
    question: 'Mennyivel több burgonya termett, mint sárgarépa?',
    options: ['400 kg-mal', '600 kg-mal', '1600 kg-mal', '300 kg-mal'],
    correctAnswer: 0,
    explanation: 'Burgonya 1000 kg, sárgarépa 600 kg. 1000 − 600 = 400 kg.'
  },
  {
    id: 'mm-q18',
    level: 2,
    questionTypeBadge: 'Recept',
    question: 'Bianka receptjében 14 dkg kristálycukor szerepel. Hány gramm ez?',
    options: ['140 g', '14 g', '1400 g', '104 g'],
    correctAnswer: 0,
    explanation: '1 dkg = 10 g, ezért 14 dkg = 14 · 10 g = 140 g.'
  },
  {
    id: 'mm-q19',
    level: 2,
    questionTypeBadge: 'Recept',
    question: 'Nagyi receptjében „3 tojásnyi vaj” van, Biankáéban ugyanez 18 dkg. Hány dkg egy tojásnyi vaj?',
    options: ['6 dkg', '15 dkg', '54 dkg', '21 dkg'],
    correctAnswer: 0,
    explanation: '18 dkg : 3 = 6 dkg. (Az 54 a szorzás, a 15 és 21 kivonással és összeadással jönne ki.)'
  },
  {
    id: 'mm-q20',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány gramm 1 kg 30 dkg?',
    options: ['1300 g', '1030 g', '130 g', '13 000 g'],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g, 30 dkg = 300 g. 1000 g + 300 g = 1300 g.'
  },

  // ---------- 3. szint ----------
  {
    id: 'mm-q21',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig />,
    question: 'Hány kilogramm zöldség termett összesen a családi gazdaságban?',
    options: ['3650 kg', '3550 kg', '2650 kg', '3600 kg'],
    correctAnswer: 0,
    explanation: '1000 + 750 + 300 + 1000 + 600 = 3650 kg.'
  },
  {
    id: 'mm-q22',
    level: 3,
    questionTypeBadge: 'Össztömeg',
    figure: <TruckFig />,
    question: 'Legfeljebb hány kilogramm rakományt vihet az autó, ha a sofőr is benne ül?',
    options: ['2160 kg', '2250 kg', '2340 kg', '4840 kg'],
    correctAnswer: 0,
    explanation: 'Autó + sofőr: 1250 + 90 = 1340 kg. 3500 − 1340 = 2160 kg. (A 2250 kg-nál kimaradt a sofőr.)'
  },
  {
    id: 'mm-q23',
    level: 3,
    questionTypeBadge: 'Össztömeg',
    figure: <ContainerFig load="? kg" what="vöröshagyma" />,
    question: 'Legfeljebb hány kilogramm vöröshagymát tehetünk az üres konténerbe?',
    options: ['2200 kg', '9800 kg', '3200 kg', '3800 kg'],
    correctAnswer: 0,
    explanation: '6000 kg − 3800 kg = 2200 kg. Ennyi rakomány fér még a 6000 kg-os határig.'
  },
  {
    id: 'mm-q24',
    level: 3,
    questionTypeBadge: 'Össztömeg',
    figure: <ContainerFig load="1600 kg" what="sárgarépa" />,
    question: 'A konténerben már 1600 kg sárgarépa van. Hány kilogramm zöldség fér még bele legfeljebb?',
    options: ['600 kg', '4400 kg', '1400 kg', '2200 kg'],
    correctAnswer: 0,
    explanation: 'Összesen 2200 kg rakomány fér bele. 2200 − 1600 = 600 kg.'
  },
  {
    id: 'mm-q25',
    level: 3,
    questionTypeBadge: 'Össztömeg',
    figure: <ContainerFig load="2020 kg" what="hagyma" />,
    question: 'A konténerben 2020 kg hagyma van. Hány kilogramm fér még bele legfeljebb?',
    options: ['180 kg', '3980 kg', '280 kg', '220 kg'],
    correctAnswer: 0,
    explanation: '2200 − 2020 = 180 kg.'
  },
  {
    id: 'mm-q26',
    level: 3,
    questionTypeBadge: 'Recept',
    question: 'Kata tésztája: 50 dkg keksz, 20 dkg porcukor, 4 dkg kakaó, 10 g vaníliás cukor és 20 dkg tej. Mennyi a tészta tömege?',
    options: ['95 dkg', '104 dkg', '94 dkg', '85 dkg'],
    correctAnswer: 0,
    explanation: 'A 10 g = 1 dkg! 50 + 20 + 4 + 1 + 20 = 95 dkg. (A 104 dkg akkor jön ki, ha a 10 g-ot 10 dkg-nak veszed.)'
  },
  {
    id: 'mm-q27',
    level: 3,
    questionTypeBadge: 'Recept',
    question: 'A 95 dkg-os tésztára 35 dkg töltelék kerül. Mennyi lesz a keksztekercs tömege?',
    options: ['1 kg 30 dkg', '1 kg 3 dkg', '13 kg', '130 g'],
    correctAnswer: 0,
    explanation: '95 dkg + 35 dkg = 130 dkg. 100 dkg = 1 kg, így 130 dkg = 1 kg 30 dkg.'
  },
  {
    id: 'mm-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy alma körülbelül 20 dkg. Hány alma lehet egy 2 kg-os zacskóban?',
    options: ['10', '100', '1', '40'],
    correctAnswer: 0,
    explanation: '2 kg = 200 dkg. 200 dkg : 20 dkg = 10 alma.'
  },
  {
    id: 'mm-q29',
    level: 3,
    questionTypeBadge: 'Recept',
    question: 'Nagyi receptjében 5 púpozott evőkanál liszt van, Biankáéban 10 dkg. Hány gramm liszt fér egy púpozott evőkanálba?',
    options: ['20 g', '2 g', '50 g', '200 g'],
    correctAnswer: 0,
    explanation: '10 dkg = 100 g. 100 g : 5 = 20 g.'
  },
  {
    id: 'mm-q30',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig />,
    question: 'Melyik állítás IGAZ a diagram alapján?',
    options: [
      'Van olyan zöldség, amelyből 400 kg-nál kevesebb termett.',
      'Sárgarépából háromszor annyi termett, mint sütőtökből.',
      'Ugyanannyi burgonya termett, mint vöröshagyma.',
      'Sárgarépából és vöröshagymából összesen 1000 kg termett.'
    ],
    correctAnswer: 0,
    explanation: 'Sütőtökből 300 kg termett, ez kevesebb 400 kg-nál. A sárgarépa (600 kg) csak kétszerese a sütőtöknek, a burgonya 1000 kg, a vöröshagyma 750 kg, és 600 + 750 = 1350 kg.'
  }
];

export const MassMeasureQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="meresek"
      topicId="g4-meas-tomeg-quiz"
      subtopicId="a-tomeg-merese"
      title="4. A tömeg mérése – Kvíz"
      subtitle="30 feladat 3 szinten: kg, dkg, g, mérleg, becslés, diagram, receptek és rakomány."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={MASS_MEASURE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 kg = 100 dkg', '1 dkg = 10 g', '1 kg = 1000 g', 'A gramm jele: g']
        },
        {
          title: 'Átváltás',
          items: [
            'kg → dkg: · 100; dkg → g: · 10; kg → g: · 1000',
            '27 g = 2 dkg 7 g; 200 g = 20 dkg',
            '1 kg 30 dkg = 130 dkg = 1300 g',
            'Összeadás előtt válts azonos egységre!'
          ]
        },
        {
          title: 'Becslés és össztömeg',
          items: [
            'fűszer: néhány g; alma: kb. 20 dkg; sajt: 25 dkg',
            'kenyér: kb. 1 kg; zsák dió: 15 kg',
            'Rakomány = megengedett össztömeg − jármű (− sofőr)',
            'Egyensúlyban lévő mérleg: két oldal tömege egyenlő'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MassMeasureMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MassMeasureSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MassMeasureQuiz;
