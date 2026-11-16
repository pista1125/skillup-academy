import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CapacityMeasureMatcher } from './CapacityMeasureMatcher';
import { CapacityMeasureSorter } from './CapacityMeasureSorter';

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

/** Beosztásos mérőkancsó: ticks beosztás, fill (0..1), felső felirat, alsó felirat */
const JugFig: React.FC<{ ticks: number; fill: number; top?: string; tickLabel?: (i: number) => string; bottom: string }> = ({
  ticks,
  fill,
  top,
  tickLabel,
  bottom
}) => {
  const x = 85;
  const y = 22;
  const w = 70;
  const h = 96;
  const level = y + h - h * fill;
  return (
    <QFig h={150}>
      <rect x={x} y={level} width={w} height={y + h - level} fill="#38bdf8" opacity="0.75" />
      <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y}`} fill="none" stroke="#334155" strokeWidth="2.5" />
      <path d={`M ${x + w} ${y + 15} q 26 0 26 30 q 0 30 -26 30`} fill="none" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: ticks }, (_, i) => {
        const ty = y + h - (h * (i + 1)) / ticks;
        return (
          <g key={i}>
            <line x1={x} y1={ty} x2={x + 12} y2={ty} stroke="#0f172a" strokeWidth="1.5" />
            {tickLabel && (
              <text x={x - 4} y={ty + 3} textAnchor="end" fontSize="8" fill="#0f172a">{tickLabel(i + 1)}</text>
            )}
          </g>
        );
      })}
      {top && <text x={x + w / 2} y={top.length > 4 ? y - 7 : y + 12} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">{top}</text>}
      <text x="120" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill={bottom.includes('?') ? UNK : '#0f172a'}>{bottom}</text>
    </QFig>
  );
};

/** 1 cl-es merőke */
const LadleFig: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={130}>
    <rect x="104" y="64" width="32" height="40" fill="#38bdf8" opacity="0.75" />
    <path d="M 104 56 L 104 104 L 136 104 L 136 56" fill="none" stroke="#334155" strokeWidth="2.5" />
    <path d="M 134 56 L 134 22 q 0 -10 9 -10 q 9 0 9 9" fill="none" stroke="#334155" strokeWidth="2.5" />
    <text x="120" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">1 cl</text>
    <text x="120" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>{text}</text>
  </QFig>
);

/** Címkés edények sora (akvárium, flakon, …) */
const LabelsFig: React.FC<{ items: { name: string; v: string }[]; note?: string }> = ({ items, note }) => {
  const w = 220 / items.length;
  return (
    <QFig h={130}>
      {items.map((it, i) => {
        const cx = 10 + w * i + w / 2;
        return (
          <g key={i}>
            <rect x={cx - w / 2 + 6} y="22" width={w - 12} height="56" rx="6" fill="#bae6fd" stroke="#0e7490" strokeWidth="2" />
            <rect x={cx - w / 2 + 9} y="36" width={w - 18} height="39" rx="3" fill="#38bdf8" opacity="0.6" />
            <text x={cx} y="96" textAnchor="middle" fontSize={items.length > 3 ? 8 : 11} fill="#334155">{it.name}</text>
            <text x={cx} y="112" textAnchor="middle" fontSize={items.length > 3 ? 10 : 12} fontWeight="bold" fill={it.v.includes('?') ? UNK : '#0f172a'}>{it.v}</text>
          </g>
        );
      })}
      {note && <text x="120" y="125" textAnchor="middle" fontSize="9" fill="#475569">{note}</text>}
    </QFig>
  );
};

/** Két mennyiség összehasonlítása üres kerettel */
const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={100}>
    <rect x="18" y="30" width="80" height="40" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="58" y="56" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">{left}</text>
    <rect x="104" y="32" width="32" height="36" rx="5" fill="#ffffff" stroke={UNK} strokeWidth="2" />
    <text x="120" y="57" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <rect x="142" y="30" width="80" height="40" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="182" y="56" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">{right}</text>
  </QFig>
);

/** Dísztó-diagram (300 l percenként) */
const PumpFig: React.FC = () => {
  const x0 = 34;
  const sc = 0.075;
  return (
    <QFig h={150}>
      {[0, 500, 1000, 1500, 2000, 2500].map((v) => (
        <g key={v}>
          <line x1={x0 + v * sc} y1="12" x2={x0 + v * sc} y2="122" stroke="#e2e8f0" />
          <text x={x0 + v * sc} y="134" textAnchor="middle" fontSize="8" fill="#475569">{v}</text>
        </g>
      ))}
      {Array.from({ length: 9 }, (_, m) => (
        <text key={m} x={x0 - 6} y={122 - m * 12 + 3} textAnchor="end" fontSize="8" fill="#475569">{m}</text>
      ))}
      {[1, 2, 3].map((m) => (
        <rect key={m} x={x0} y={122 - m * 12 - 4} width={m * 300 * sc} height="8" rx="2" fill="#60a5fa" />
      ))}
      <line x1={x0 + 2100 * sc} y1="12" x2={x0 + 2100 * sc} y2="122" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={x0 + 2100 * sc - 2} y="22" textAnchor="end" fontSize="8" fontWeight="bold" fill="#15803d">tele: 2100 l</text>
      <line x1={x0} y1="122" x2={x0 + 2500 * sc + 6} y2="122" stroke="#334155" />
      <line x1={x0} y1="122" x2={x0} y2="8" stroke="#334155" />
      <text x={x0 + 4} y="12" fontSize="8" fontWeight="bold" fill="#334155">perc</text>
      <text x="232" y="134" textAnchor="end" fontSize="8" fill="#475569">l</text>
      <text x="120" y="146" textAnchor="middle" fontSize="8.5" fill="#475569">a dísztó feltöltése</text>
    </QFig>
  );
};

/** Tűzoltóautó víztartállyal */
const FireTruckFig: React.FC<{ inside: string }> = ({ inside }) => (
  <QFig h={130}>
    <rect x="30" y="34" width="130" height="56" rx="4" fill="#dc2626" />
    <rect x="160" y="50" width="50" height="40" rx="6" fill="#b91c1c" />
    <rect x="170" y="56" width="26" height="14" rx="2" fill="#bae6fd" />
    <circle cx="62" cy="94" r="11" fill="#1e293b" />
    <circle cx="184" cy="94" r="11" fill="#1e293b" />
    <rect x="44" y="44" width="102" height="34" rx="4" fill="#ffffff" />
    <text x="95" y="66" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{inside}</text>
    <text x="120" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">a tartályba összesen 4000 l fér</text>
    <text x="120" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Még ennyi fér bele: ? l</text>
  </QFig>
);

/** Üdítős üveg és három pohár */
const BottleGlassesFig: React.FC = () => (
  <QFig h={130}>
    <rect x="30" y="40" width="40" height="70" rx="8" fill="#fdba74" stroke="#9a3412" strokeWidth="2" />
    <rect x="40" y="22" width="20" height="20" rx="3" fill="#fdba74" stroke="#9a3412" strokeWidth="2" />
    <text x="50" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">1 l</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M ${100 + i * 46} 60 L ${106 + i * 46} 110 L ${130 + i * 46} 110 L ${136 + i * 46} 60`} fill="#fed7aa" stroke="#334155" strokeWidth="2" />
        <text x={118 + i * 46} y="84" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c2d12">2 dl</text>
        <text x={118 + i * 46} y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c2d12">5 cl</text>
      </g>
    ))}
    <text x="165" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Mennyi marad?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const CAPACITY_MEASURE_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'cm-q1',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány centiliter 1 deciliter?',
    options: ['10 cl', '100 cl', '1 cl', '1000 cl'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl. A szomszédos egységek között a váltószám 10.'
  },
  {
    id: 'cm-q2',
    level: 1,
    questionTypeBadge: 'Milliliter',
    figure: <LadleFig text="1 cl = ? ml" />,
    question: 'Hány milliliter fér az 1 centiliteres merőkébe?',
    options: ['10 ml', '100 ml', '1 ml', '1000 ml'],
    correctAnswer: 0,
    explanation: '1 cl = 10 ml. A milliliter a centiliternél kisebb egység.'
  },
  {
    id: 'cm-q3',
    level: 1,
    questionTypeBadge: 'Milliliter',
    figure: <JugFig ticks={10} fill={1} top="1 l" bottom="1 l = ? ml" />,
    question: 'A kancsó tele van, 1 liter víz van benne. Hány milliliter ez?',
    options: ['1000 ml', '100 ml', '10 ml', '10 000 ml'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl = 100 cl = 1000 ml.'
  },
  {
    id: 'cm-q4',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyik mértékegységgel adnád meg egy kis üveg szemcsepp mennyiségét?',
    options: ['milliliterrel (ml)', 'literrel (l)', 'kilogrammal (kg)', 'méterrel (m)'],
    correctAnswer: 0,
    explanation: 'A szemcsepp nagyon kevés folyadék, ezért milliliterben mérjük (pl. 10 ml). A kg tömeg, a m hosszúság.'
  },
  {
    id: 'cm-q5',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <JugFig ticks={10} fill={0.3} tickLabel={(i) => `${i} dl`} bottom="? dl" />,
    question: 'Mennyi víz van a mérőedényben?',
    options: ['3 dl', '4 dl', '30 dl', '2 dl'],
    correctAnswer: 0,
    explanation: 'A víz a 3. vonásig ér, és a beosztás deciliteres: 3 dl.'
  },
  {
    id: 'cm-q6',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '5 l = ? dl',
    options: ['50 dl', '500 dl', '5 dl', '5000 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl, ezért 5 l = 5 · 10 dl = 50 dl.'
  },
  {
    id: 'cm-q7',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik a legnagyobb űrtartalom-mértékegység?',
    options: ['liter (l)', 'deciliter (dl)', 'centiliter (cl)', 'milliliter (ml)'],
    correctAnswer: 0,
    explanation: 'A sorrend a legkisebbtől: ml → cl → dl → l. A liter a legnagyobb.'
  },
  {
    id: 'cm-q8',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '200 ml = ? dl',
    options: ['2 dl', '20 dl', '200 dl', '2000 dl'],
    correctAnswer: 0,
    explanation: '1 dl = 100 ml, ezért 200 ml = 2 dl.'
  },
  {
    id: 'cm-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="1 l" right="75 ml" />,
    question: 'Melyik jel kerül a keretbe?',
    options: ['1 l > 75 ml', '1 l < 75 ml', '1 l = 75 ml', 'Nem lehet összehasonlítani.'],
    correctAnswer: 0,
    explanation: '1 l = 1000 ml, és 1000 ml több, mint 75 ml. Ne a 1-et és a 75-öt hasonlítsd össze!'
  },
  {
    id: 'cm-q10',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyik edény űrtartalmát adjuk meg literben?',
    options: ['a felmosóvödörét', 'a gyűszűét', 'a kiskanálét', 'a szemcseppes üvegét'],
    correctAnswer: 0,
    explanation: 'A felmosóvödörbe sok víz fér (kb. 10 l). A többibe csak néhány ml.'
  },

  // ---------- 2. szint ----------
  {
    id: 'cm-q11',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <LabelsFig items={[{ name: 'akvárium', v: '3000 cl = ? l' }]} />,
    question: 'A kis akváriumba 3000 cl víz fér. Hány liter ez?',
    options: ['30 l', '300 l', '3 l', '3000 l'],
    correctAnswer: 0,
    explanation: '100 cl = 1 l, ezért 3000 cl = 3000 : 100 = 30 l.'
  },
  {
    id: 'cm-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'A harmadik akváriumba 700 dl víz fér. Hány liter ez?',
    options: ['70 l', '7 l', '700 l', '7000 l'],
    correctAnswer: 0,
    explanation: '10 dl = 1 l, ezért 700 dl = 700 : 10 = 70 l.'
  },
  {
    id: 'cm-q13',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '60 cl 45 ml = ? ml',
    options: ['645 ml', '105 ml', '6045 ml', '6450 ml'],
    correctAnswer: 0,
    explanation: '60 cl = 600 ml. 600 ml + 45 ml = 645 ml.'
  },
  {
    id: 'cm-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legtöbb? 170 dl, 707 dl, 71 l, 770 cl',
    options: ['71 l', '707 dl', '770 cl', '170 dl'],
    correctAnswer: 0,
    explanation: 'Váltsd át mindet deciliterre: 71 l = 710 dl, 770 cl = 77 dl. A 710 dl a legtöbb, tehát a 71 l.'
  },
  {
    id: 'cm-q15',
    level: 2,
    questionTypeBadge: 'Pótlás',
    figure: <JugFig ticks={4} fill={0.75} top="1 l" tickLabel={(i) => `${i * 250} ml`} bottom="750 ml + ? ml = 1 l" />,
    question: 'A literes kancsóban 750 ml víz van. Mennyi kell még, hogy tele legyen?',
    options: ['250 ml', '350 ml', '25 ml', '150 ml'],
    correctAnswer: 0,
    explanation: '1 l = 1000 ml. 1000 ml − 750 ml = 250 ml.'
  },
  {
    id: 'cm-q16',
    level: 2,
    questionTypeBadge: 'Pótlás',
    question: '78 ml + ? ml = 1 dl',
    options: ['22 ml', '32 ml', '922 ml', '2 ml'],
    correctAnswer: 0,
    explanation: '1 dl = 100 ml. 100 − 78 = 22, tehát 22 ml hiányzik.'
  },
  {
    id: 'cm-q17',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'A joghurthoz 17 dl tejet használtak fel. Hány centiliter ez?',
    options: ['170 cl', '1700 cl', '17 cl', '107 cl'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl, ezért 17 dl = 17 · 10 cl = 170 cl.'
  },
  {
    id: 'cm-q18',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'A vajhoz „2 és fél liter” tej kellett. Hány deciliter ez?',
    options: ['25 dl', '250 dl', '205 dl', '2500 dl'],
    correctAnswer: 0,
    explanation: '2 l = 20 dl, fél liter = 5 dl. 20 dl + 5 dl = 25 dl.'
  },
  {
    id: 'cm-q19',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <LabelsFig items={[{ name: "samponos flakon", v: "680 ml = ? cl" }]} />,
    question: 'A samponos flakonban 680 ml van. Hány centiliter ez?',
    options: ['68 cl', '680 cl', '6800 cl', '6 cl'],
    correctAnswer: 0,
    explanation: '10 ml = 1 cl, ezért 680 ml = 680 : 10 = 68 cl.'
  },
  {
    id: 'cm-q20',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik a legtöbb? 200 cl 8 ml, 2400 ml, 750 cl, 7 l 6 cl',
    options: ['750 cl', '7 l 6 cl', '2400 ml', '200 cl 8 ml'],
    correctAnswer: 0,
    explanation: 'Milliliterben: 200 cl 8 ml = 2008 ml, 2400 ml, 750 cl = 7500 ml, 7 l 6 cl = 7060 ml. A legtöbb a 7500 ml = 750 cl.'
  },

  // ---------- 3. szint ----------
  {
    id: 'cm-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <LabelsFig items={[{ name: 'nagy', v: '160 l' }, { name: 'kocka', v: '3000 cl' }, { name: 'kicsi', v: '700 dl' }]} note="Összesen: ? l" />,
    question: 'Hány liter víz van a három akváriumban összesen?',
    options: ['260 l', '3860 l', '230 l', '2600 l'],
    correctAnswer: 0,
    explanation: '3000 cl = 30 l, 700 dl = 70 l. 160 l + 30 l + 70 l = 260 l. A 3860 akkor jön ki, ha átváltás nélkül adod össze a számokat.'
  },
  {
    id: 'cm-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <JugFig ticks={0} fill={0.6} top="110 dl fér bele" bottom="Még ? l kell" />,
    question:
      'Matyi akváriumába 110 dl víz fér. Eddig 30 dl-rel többet töltött bele, mint amennyi még belefér. Hány liter vizet kell még beletöltenie?',
    options: ['4 l', '7 l', '8 l', '40 l'],
    correctAnswer: 0,
    explanation: '110 − 30 = 80, 80 : 2 = 40. Még 40 dl fér bele, ez 4 l. (Eddig 70 dl-t töltött bele, és 70 − 40 = 30.)'
  },
  {
    id: 'cm-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Anyu locsoláskor 2 perc alatt 1880 dl vizet használ. Mennyit használ 1 perc alatt?',
    options: ['940 dl', '3760 dl', '904 dl', '1878 dl'],
    correctAnswer: 0,
    explanation: '1 perc a 2 perc fele, ezért 1880 dl : 2 = 940 dl.'
  },
  {
    id: 'cm-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A permetező 1 másodperc alatt 12 dl csalánlevet juttat a növényekre. Mennyit 5 másodperc alatt?',
    options: ['60 dl', '17 dl', '50 dl', '600 dl'],
    correctAnswer: 0,
    explanation: '5 · 12 dl = 60 dl (ez 6 l).'
  },
  {
    id: 'cm-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Szüretkor Józsi bácsi 40-szer fordult a 30 literes puttonnyal. Hány liter szőlőt öntött a kádba?',
    options: ['1200 l', '120 l', '70 l', '12 000 l'],
    correctAnswer: 0,
    explanation: '40 · 30 l = 1200 l.'
  },
  {
    id: 'cm-q26',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <PumpFig />,
    question: 'A szivattyú minden percben ugyanannyi vizet tölt a 2100 literes dísztóba. Hányadik percben telik meg a tó?',
    options: ['a 7. percben', 'a 8. percben', 'a 6. percben', 'a 21. percben'],
    correctAnswer: 0,
    explanation: 'A diagramon 1 perc alatt 300 l folyik be. 2100 : 300 = 7, tehát a 7. percben telik meg.'
  },
  {
    id: 'cm-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <FireTruckFig inside="2700 liter" />,
    question: 'A tűzoltóautó 4000 literes tartályában már 2700 l víz van. Hány liter fér még bele?',
    options: ['1300 l', '2300 l', '1700 l', '6700 l'],
    correctAnswer: 0,
    explanation: '4000 l − 2700 l = 1300 l.'
  },
  {
    id: 'cm-q28',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis',
    figure: (
      <LabelsFig
        items={[
          { name: 'tejesdoboz', v: '1 l' },
          { name: 'cumisüveg', v: '5 dl' },
          { name: 'flakon', v: '2 l' },
          { name: 'vödör', v: '90 dl' },
          { name: 'hordó', v: '100 l' }
        ]}
      />
    ),
    question: 'Melyik állítás IGAZ?',
    options: [
      'A vödörbe több fér, mint az ásványvizes flakonba.',
      'A hordóba 10-szer annyi fér, mint az ásványvizes flakonba.',
      'A tejesdobozba feleannyi fér, mint a cumisüvegbe.',
      'A vödörbe kevesebb fér, mint a cumisüvegbe.'
    ],
    correctAnswer: 0,
    explanation: '90 dl = 9 l, ez több, mint 2 l. A hordó (100 l) 50-szer annyi, mint a flakon; a cumisüveg (5 dl) a tejesdoboz (10 dl) fele.'
  },
  {
    id: 'cm-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: '2 liter vizet töltünk szét egyszer 2 dl-es, máskor 5 dl-es poharakba. Hány pohárral kell több a 2 dl-esből?',
    options: ['6 pohárral', '10 pohárral', '4 pohárral', '3 pohárral'],
    correctAnswer: 0,
    explanation: '2 l = 20 dl. 20 : 2 = 10 kis pohár, 20 : 5 = 4 nagy pohár. 10 − 4 = 6.'
  },
  {
    id: 'cm-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BottleGlassesFig />,
    question: 'Az 1 literes üvegből 3 pohárba töltünk, mindegyikbe 2 dl 5 cl üdítőt. Mennyi marad az üvegben?',
    options: ['250 ml', '750 ml', '400 ml', '970 ml'],
    correctAnswer: 0,
    explanation: '2 dl 5 cl = 250 ml. 3 · 250 ml = 750 ml. 1000 ml − 750 ml = 250 ml.'
  }
];

export const CapacityMeasureQuiz: React.FC<{
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
      topicId="g4-meas-urtartalom-quiz"
      subtopicId="az-urtartalom-merese"
      title="5. Az űrtartalom mérése – Kvíz"
      subtitle="30 feladat 3 szinten: l, dl, cl, ml, mérőedények leolvasása, összehasonlítás és szöveges feladatok."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={CAPACITY_MEASURE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 l = 10 dl', '1 dl = 10 cl', '1 cl = 10 ml', '1 l = 100 cl = 1000 ml']
        },
        {
          title: 'Átváltás',
          items: [
            'l → dl → cl → ml: lépésenként · 10',
            'ml → cl → dl → l: lépésenként : 10',
            '3000 cl = 30 l; 700 dl = 70 l',
            '60 cl 45 ml = 645 ml'
          ]
        },
        {
          title: 'Becslés és összehasonlítás',
          items: [
            'szemcsepp: kb. 10 ml; pohár: kb. 2 dl',
            'tejesdoboz: 1 l; vödör: kb. 10 l',
            'Összehasonlítás előtt válts azonos egységre!',
            'Hiányzó rész = teljes űrtartalom − ami már benne van'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CapacityMeasureMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CapacityMeasureSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CapacityMeasureQuiz;
