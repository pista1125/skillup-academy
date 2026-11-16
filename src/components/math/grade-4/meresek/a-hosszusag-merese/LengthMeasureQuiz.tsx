import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LengthMeasureMatcher } from './LengthMeasureMatcher';
import { LengthMeasureSorter } from './LengthMeasureSorter';

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

/** Vonalzó 0–10 cm, rajta egy lenMm hosszú szakasz, "?" felirattal. */
const RulerFig: React.FC<{ lenMm: number }> = ({ lenMm }) => {
  const x0 = 18;
  const s = 2;
  return (
    <QFig h={110}>
      <line x1={x0} y1="28" x2={x0 + lenMm * s} y2="28" stroke={UNK} strokeWidth="4" strokeLinecap="round" />
      <text x={x0 + (lenMm * s) / 2} y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
        ?
      </text>
      <rect x="10" y="42" width="220" height="50" rx="4" fill="#fde68a" stroke="#d97706" />
      {Array.from({ length: 101 }, (_, i) => {
        const h = i % 10 === 0 ? 14 : i % 5 === 0 ? 10 : 6;
        return <line key={i} x1={x0 + i * s} y1="42" x2={x0 + i * s} y2={42 + h} stroke="#78350f" strokeWidth={i % 10 === 0 ? 1.2 : 0.6} />;
      })}
      {Array.from({ length: 11 }, (_, i) => (
        <text key={i} x={x0 + i * 20} y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">
          {i}
        </text>
      ))}
      <text x="222" y="86" fontSize="8" textAnchor="end" fill="#92400e">cm</text>
    </QFig>
  );
};

/** Szalagok (sávok) egymás mögött, összhossz "?" */
const BarsFig: React.FC<{ parts: { label: string; w: number; color: string }[]; total: string }> = ({ parts, total }) => {
  let x = 20;
  const totalW = parts.reduce((a, p) => a + p.w, 0);
  return (
    <QFig h={110}>
      {parts.map((p, i) => {
        const el = (
          <g key={i}>
            <rect x={x} y="35" width={p.w} height="26" rx="5" fill={p.color} stroke="#334155" />
            <text x={x + p.w / 2} y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
              {p.label}
            </text>
          </g>
        );
        x += p.w;
        return el;
      })}
      <path d={`M 20 72 Q 20 80 28 80 L ${20 + totalW / 2 - 6} 80 L ${20 + totalW / 2} 88 L ${20 + totalW / 2 + 6} 80 L ${12 + totalW} 80 Q ${20 + totalW} 80 ${20 + totalW} 72`} fill="none" stroke="#475569" strokeWidth="1.5" />
      <text x={20 + totalW / 2} y="102" textAnchor="middle" fontSize="12" fontWeight="bold" fill={total.includes('?') ? UNK : '#0f172a'}>
        {total}
      </text>
    </QFig>
  );
};

const MapFig: React.FC = () => (
  <QFig h={150}>
    {[
      [40, 45, 115, 30],
      [115, 30, 115, 110],
      [115, 30, 205, 110],
      [115, 110, 205, 110]
    ].map((l, i) => (
      <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 3" />
    ))}
    <text x="72" y="30" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">550 m</text>
    <text x="100" y="75" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">340 m</text>
    <text x="178" y="64" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">800 m</text>
    <text x="160" y="104" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">480 m</text>
    {[
      [40, 45, 'Rozi', '#2563eb'],
      [115, 30, 'Nagymama', '#db2777'],
      [115, 110, 'Zöldséges', '#16a34a'],
      [205, 110, 'Iskola', '#7c3aed']
    ].map((p, i) => (
      <g key={i}>
        <circle cx={p[0] as number} cy={p[1] as number} r="7" fill={p[3] as string} />
        <text x={p[0] as number} y={(p[1] as number) + (i === 1 ? -11 : 20)} fontSize="9.5" fontWeight="bold" textAnchor="middle" fill="#334155">
          {p[2]}
        </text>
      </g>
    ))}
  </QFig>
);

const TrackFig: React.FC<{ note: string }> = ({ note }) => (
  <QFig h={140}>
    <rect x="45" y="20" width="150" height="80" rx="40" fill="#fb923c" />
    <rect x="60" y="33" width="120" height="54" rx="27" fill="#4ade80" />
    {[
      [180, 100, 'A'],
      [180, 20, 'B'],
      [60, 20, 'C'],
      [60, 100, 'D']
    ].map((p) => (
      <g key={p[2] as string}>
        <circle cx={p[0] as number} cy={p[1] as number} r="8" fill="#1e3a8a" />
        <text x={p[0] as number} y={(p[1] as number) + 3.5} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">
          {p[2]}
        </text>
      </g>
    ))}
    <text x="120" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">400 m</text>
    <text x="120" y="126" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{note}</text>
  </QFig>
);

const AltFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={140}>
    <rect x="2" y="2" width="236" height="136" rx="9" fill="#dbeafe" />
    <line x1="30" y1="120" x2="220" y2="120" stroke="#1e3a8a" strokeWidth="2" />
    <text x="34" y="132" fontSize="9" fill="#1e3a8a">tengerszint 0 m</text>
    <line x1="30" y1="30" x2="220" y2="30" stroke="#7c3aed" strokeDasharray="4 3" />
    <text x="36" y="25" fontSize="10" fontWeight="bold" fill="#6d28d9">{a}</text>
    <line x1="30" y1="85" x2="220" y2="85" stroke="#ea580c" strokeDasharray="4 3" />
    <text x="36" y="80" fontSize="10" fontWeight="bold" fill="#c2410c">{b}</text>
    <line x1="200" y1="32" x2="200" y2="83" stroke={UNK} strokeWidth="2" />
    <polygon points="200,32 196,40 204,40" fill={UNK} />
    <polygon points="200,83 196,75 204,75" fill={UNK} />
    <text x="186" y="62" fontSize="14" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

const CompareFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={80}>
    <rect x="20" y="22" width="80" height="36" rx="8" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
    <text x="60" y="46" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">{a}</text>
    <rect x="105" y="22" width="30" height="36" rx="8" fill="#fff" stroke={UNK} strokeWidth="2" />
    <text x="120" y="46" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    <rect x="140" y="22" width="80" height="36" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <text x="180" y="46" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">{b}</text>
  </QFig>
);

const SignFig: React.FC<{ text: string; note?: string }> = ({ text, note }) => (
  <QFig h={110}>
    <rect x="116" y="50" width="8" height="55" fill="#64748b" />
    <polygon points="40,20 190,20 210,40 190,60 40,60" fill="#facc15" stroke="#a16207" strokeWidth="2" />
    <text x="120" y="46" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#422006">{text}</text>
    {note && (
      <text x="120" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill={UNK}>{note}</text>
    )}
  </QFig>
);

const StatueFig: React.FC = () => (
  <QFig h={150}>
    <rect x="95" y="105" width="50" height="30" fill="#cbd5e1" stroke="#475569" />
    <ellipse cx="120" cy="62" rx="20" ry="42" fill="none" stroke="#94a3b8" strokeWidth="9" />
    <text x="120" y="124" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#334155">KM</text>
    <line x1="170" y1="20" x2="170" y2="104" stroke="#2563eb" strokeWidth="1.5" />
    <text x="176" y="66" fontSize="10" fontWeight="bold" fill="#1d4ed8">3 m</text>
    <line x1="170" y1="106" x2="170" y2="135" stroke="#16a34a" strokeWidth="1.5" />
    <text x="176" y="124" fontSize="10" fontWeight="bold" fill="#15803d">80 cm</text>
    <line x1="60" y1="20" x2="60" y2="135" stroke={UNK} strokeWidth="1.5" />
    <text x="30" y="80" fontSize="13" fontWeight="bold" fill={UNK}>? dm</text>
  </QFig>
);

const TwinsFig: React.FC = () => (
  <QFig h={110}>
    <circle cx="25" cy="40" r="8" fill="#2563eb" />
    <circle cx="215" cy="40" r="8" fill="#16a34a" />
    <text x="25" y="25" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">Benedek</text>
    <text x="215" y="25" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#15803d">Bendegúz</text>
    <line x1="25" y1="60" x2="215" y2="60" stroke="#991b1b" strokeWidth="3" />
    <rect x="25" y="55" width="81" height="10" fill="#93c5fd" opacity="0.8" />
    <rect x="125" y="55" width="90" height="10" fill="#86efac" opacity="0.8" />
    <text x="65" y="80" fontSize="9" textAnchor="middle" fill="#1d4ed8">10 · 90 cm</text>
    <text x="170" y="80" fontSize="9" textAnchor="middle" fill="#15803d">10 · 1 m</text>
    <text x="115" y="50" fontSize="13" textAnchor="middle" fontWeight="bold" fill={UNK}>?</text>
    <text x="120" y="100" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#991b1b">20 m</text>
  </QFig>
);

const TableFig: React.FC = () => (
  <QFig h={100}>
    {['', 'Pécs', 'Miskolc'].map((h, i) => (
      <text key={i} x={50 + i * 70} y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">{h}</text>
    ))}
    <line x1="15" y1="38" x2="225" y2="38" stroke="#f97316" />
    <text x="50" y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">Nyíregyháza</text>
    <text x="120" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">400 km</text>
    <text x="190" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">80 km</text>
    <text x="120" y="88" textAnchor="middle" fontSize="11" fill="#475569">távolság Nyíregyházától</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const LENGTH_MEASURE_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'lm-q1',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány centiméter 1 méter?',
    options: ['100 cm', '10 cm', '1000 cm', '50 cm'],
    correctAnswer: 0,
    explanation: 'A centiméter a méter század része, ezért 1 m = 100 cm.'
  },
  {
    id: 'lm-q2',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    figure: <SignFig text="Tó 1 km" note="1 km = ? m" />,
    question: 'A táblán ez áll: „Tó 1 km”. Hány méter ez?',
    options: ['1000 m', '100 m', '10 m', '10 000 m'],
    correctAnswer: 0,
    explanation: 'A kilométer jele km, és 1 km = 1000 m.'
  },
  {
    id: 'lm-q3',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány milliméter 1 centiméter?',
    options: ['10 mm', '100 mm', '1 mm', '1000 mm'],
    correctAnswer: 0,
    explanation: 'A vonalzón 1 cm-ben 10 kis vonás van: 1 cm = 10 mm.'
  },
  {
    id: 'lm-q4',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyik mértékegységgel adnád meg a matematikafüzeted vastagságát?',
    options: ['mm', 'm', 'km', 'dm'],
    correctAnswer: 0,
    explanation: 'A füzet nagyon vékony, csak néhány milliméter. Ezt mm-ben érdemes megadni.'
  },
  {
    id: 'lm-q5',
    level: 1,
    questionTypeBadge: 'Mérés vonalzóval',
    figure: <RulerFig lenMm={70} />,
    question: 'Milyen hosszú a piros szakasz?',
    options: ['7 cm', '6 cm', '8 cm', '70 cm'],
    correctAnswer: 0,
    explanation: 'A szakasz a 0-tól a 7-es számig ér, ezért 7 cm hosszú.'
  },
  {
    id: 'lm-q6',
    level: 1,
    questionTypeBadge: 'Mérés vonalzóval',
    figure: <RulerFig lenMm={45} />,
    question: 'Hány milliméter a piros szakasz?',
    options: ['45 mm', '4 mm', '54 mm', '405 mm'],
    correctAnswer: 0,
    explanation: 'A szakasz 4 egész centiméter után még 5 kis vonásig ér: 4 cm 5 mm = 40 mm + 5 mm = 45 mm.'
  },
  {
    id: 'lm-q7',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: 'A magasugró 158 cm-t ugrott. Hány centiméter az egy és fél méter?',
    options: ['150 cm', '15 cm', '105 cm', '1500 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm, a fél méter 50 cm. 100 cm + 50 cm = 150 cm. Ezt a 158 cm-t ugró versenyző át tudja ugrani.'
  },
  {
    id: 'lm-q8',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig a="6 m" b="60 cm" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '=', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '6 m = 600 cm, és 600 cm több, mint 60 cm. Ezért 6 m > 60 cm.'
  },
  {
    id: 'lm-q9',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyik mértékegységgel adnád meg Budapest és Pécs távolságát?',
    options: ['km', 'cm', 'mm', 'dm'],
    correctAnswer: 0,
    explanation: 'Két város között nagy a távolság (kb. 240 km), ezt kilométerben adjuk meg.'
  },
  {
    id: 'lm-q10',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány milliméter 1 méter?',
    options: ['1000 mm', '100 mm', '10 mm', '10 000 mm'],
    correctAnswer: 0,
    explanation: 'A milliméter a méter ezred része: 1 m = 1000 mm.'
  },

  // ---------- 2. szint ----------
  {
    id: 'lm-q11',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Marci 190 cm-t ugrott távolugrásban, 20 cm-rel kisebbet, mint Gergő. Hány centimétert ugrott Gergő?',
    options: ['210 cm', '170 cm', '200 cm', '192 cm'],
    correctAnswer: 0,
    explanation: 'Gergő ugrott többet, ezért hozzáadunk: 190 cm + 20 cm = 210 cm.'
  },
  {
    id: 'lm-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány deciméter 3 méter?',
    options: ['30 dm', '300 dm', '3 dm', '3000 dm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm, ezért 3 m = 3 · 10 dm = 30 dm.'
  },
  {
    id: 'lm-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig a="32 cm" b="230 mm" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '=', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '32 cm = 320 mm. 320 mm > 230 mm, tehát 32 cm > 230 mm. Nem elég a számokat nézni!'
  },
  {
    id: 'lm-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig a="54 cm" b="680 mm" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '54 cm = 540 mm. 540 mm < 680 mm, tehát 54 cm < 680 mm.'
  },
  {
    id: 'lm-q15',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány méter 2 km?',
    options: ['2000 m', '200 m', '20 m', '20 000 m'],
    correctAnswer: 0,
    explanation: '1 km = 1000 m, ezért 2 km = 2000 m.'
  },
  {
    id: 'lm-q16',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Melyik hosszúsággal egyenlő a 200 dm?',
    options: ['20 m', '2 m', '200 m', '2 km'],
    correctAnswer: 0,
    explanation: '10 dm = 1 m, ezért 200 dm = 200 : 10 m = 20 m.'
  },
  {
    id: 'lm-q17',
    level: 2,
    questionTypeBadge: 'Hosszúságok összeadása',
    figure: (
      <BarsFig
        parts={[
          { label: '40 mm', w: 80, color: '#2563eb' },
          { label: '60 mm', w: 120, color: '#ea580c' }
        ]}
        total="? cm"
      />
    ),
    question: 'Tomi az autót (40 mm) és a buszt (60 mm) szorosan egymás mögé állítja. Hány centiméter hosszú a sor?',
    options: ['10 cm', '100 cm', '1 cm', '20 cm'],
    correctAnswer: 0,
    explanation: '40 mm + 60 mm = 100 mm. 10 mm = 1 cm, ezért 100 mm = 10 cm (= 1 dm).'
  },
  {
    id: 'lm-q18',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány deciméter 1 m 5 dm?',
    options: ['15 dm', '6 dm', '105 dm', '51 dm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm, ehhez jön még 5 dm: 10 dm + 5 dm = 15 dm.'
  },
  {
    id: 'lm-q19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a leghosszabb?',
    options: ['7 dm', '77 mm', '13 cm', '45 cm'],
    correctAnswer: 0,
    explanation: 'Váltsuk mm-re: 7 dm = 700 mm, 77 mm, 13 cm = 130 mm, 45 cm = 450 mm. A leghosszabb a 7 dm, pedig a 7 a legkisebb szám!'
  },
  {
    id: 'lm-q20',
    level: 2,
    questionTypeBadge: 'Térkép',
    figure: <MapFig />,
    question: 'Rozi otthonról a nagymamán és a zöldségesen át megy az iskolába. Hány métert gyalogol?',
    options: ['1370 m', '1350 m', '820 m', '2170 m'],
    correctAnswer: 0,
    explanation: 'Rozi útja: 550 m + 340 m + 480 m = 1370 m. (Az 1350 m az az út, amikor a nagymamától egyenesen megy.)'
  },

  // ---------- 3. szint ----------
  {
    id: 'lm-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TwinsFig />,
    question: 'Benedek és Bendegúz a 20 m-es út két végéről indul egymás felé. Benedek 90 cm-eseket, Bendegúz 1 m-eseket lép. 10–10 lépés után milyen messze vannak egymástól?',
    options: ['1 m', '0 m, épp találkoznak', '10 cm', '2 m'],
    correctAnswer: 0,
    explanation: 'Benedek 10 · 90 cm = 900 cm = 9 m-t, Bendegúz 10 · 1 m = 10 m-t tesz meg. Együtt 19 m. 20 m − 19 m = 1 m van még köztük.'
  },
  {
    id: 'lm-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TrackFig note="Máté 2 km 400 m-t futott" />,
    question: 'Máté 2 km 400 m-t futott a 400 m-es pályán. Hány kört tett meg?',
    options: ['6 kört', '5 kört', '60 kört', '24 kört'],
    correctAnswer: 0,
    explanation: '2 km 400 m = 2400 m. 2400 : 400 = 6, tehát 6 kört futott.'
  },
  {
    id: 'lm-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TrackFig note="Indulás: A pont, táv: 2 km 600 m" />,
    question: 'Ha Máté az A pontból indulva 2 km 600 m-t futna, melyik pontnál fejezné be a futást?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: '2600 m = 6 kör (2400 m) + 200 m. Két szomszédos pont között 100 m van, így 200 m két szakasz: A-tól a szemközti C pontig jut.'
  },
  {
    id: 'lm-q24',
    level: 3,
    questionTypeBadge: 'Különbség',
    figure: <AltFig a="utasszállító: 10 km" b="sárkányrepülő: 2900 m" />,
    question: 'Hány méterrel repül magasabban az utasszállító repülőgép (10 km) a sárkányrepülőnél (2900 m)?',
    options: ['7100 m', '8100 m', '2890 m', '12 900 m'],
    correctAnswer: 0,
    explanation: '10 km = 10 000 m. 10 000 m − 2900 m = 7100 m.'
  },
  {
    id: 'lm-q25',
    level: 3,
    questionTypeBadge: 'Különbség',
    figure: <AltFig a="siklórepülő: 5 km" b="hőlégballon: 1200 m" />,
    question: 'Hány méterrel repül magasabban a siklórepülő (5 km) a hőlégballonnál (1200 m)?',
    options: ['3800 m', '6200 m', '4200 m', '2800 m'],
    correctAnswer: 0,
    explanation: '5 km = 5000 m. 5000 m − 1200 m = 3800 m.'
  },
  {
    id: 'lm-q26',
    level: 3,
    questionTypeBadge: 'Hiányzó rész',
    figure: (
      <BarsFig
        parts={[
          { label: '236 km', w: 64, color: '#2563eb' },
          { label: '284 km', w: 76, color: '#16a34a' },
          { label: '?', w: 64, color: '#dc2626' }
        ]}
        total="758 km"
      />
    ),
    question: 'Egy 758 km-es út első része 236 km, a második 284 km. Milyen hosszú a harmadik rész?',
    options: ['238 km', '520 km', '248 km', '1278 km'],
    correctAnswer: 0,
    explanation: '236 km + 284 km = 520 km. 758 km − 520 km = 238 km.'
  },
  {
    id: 'lm-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Luca 1500 m-re lakik az iskolától. Reggel elmegy az iskolába, délután haza. Mennyit gyalogol naponta?',
    options: ['3 km', '1 km 500 m', '15 km', '300 m'],
    correctAnswer: 0,
    explanation: 'Oda és vissza: 1500 m + 1500 m = 3000 m = 3 km.'
  },
  {
    id: 'lm-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SignFig text="Vasútállomás 2 km" />,
    question: 'Luca a „Vasútállomás 2 km” táblától már 1 km 300 m-t ment. Mennyi van még hátra?',
    options: ['700 m', '800 m', '1700 m', '300 m'],
    correctAnswer: 0,
    explanation: '2 km = 2000 m, 1 km 300 m = 1300 m. 2000 m − 1300 m = 700 m.'
  },
  {
    id: 'lm-q29',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: <StatueFig />,
    question: 'A 0 kilométerkő-szobor 3 m magas, és egy 80 cm-es talapzaton áll. Milyen magas együtt deciméterben?',
    options: ['38 dm', '83 dm', '11 dm', '380 dm'],
    correctAnswer: 0,
    explanation: '3 m = 30 dm, 80 cm = 8 dm. 30 dm + 8 dm = 38 dm.'
  },
  {
    id: 'lm-q30',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig />,
    question: 'Hányszorosa a Nyíregyháza–Pécs távolság a Nyíregyháza–Miskolc távolságnak?',
    options: ['5-szöröse', '4-szerese', '6-szorosa', '320-szorosa'],
    correctAnswer: 0,
    explanation: '400 km : 80 km = 5, tehát az 5-szöröse. (A 320 km a különbség, nem a „hányszoros”.)'
  }
];

export const LengthMeasureQuiz: React.FC<{
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
      topicId="g4-meas-hosszusag-quiz"
      subtopicId="a-hosszusag-merese"
      title="1. A hosszúság mérése – Kvíz"
      subtitle="30 feladat 3 szinten: mértékegységek, mérés vonalzóval, átváltás, összehasonlítás és szöveges feladatok."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={LENGTH_MEASURE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 km = 1000 m', '1 m = 10 dm = 100 cm = 1000 mm', '1 dm = 10 cm = 100 mm', '1 cm = 10 mm']
        },
        {
          title: 'Átváltás',
          items: [
            'Nagyobb egységről kisebbre: a szám nagyobb lesz (szorzunk).',
            '3 m 25 cm = 300 cm + 25 cm = 325 cm',
            '2 km 400 m = 2000 m + 400 m = 2400 m',
            'Összehasonlítás előtt válts azonos egységre!'
          ]
        },
        {
          title: 'Mérés és becslés',
          items: [
            'Vonalzónál a szakasz eleje a 0-nál legyen.',
            'mm: füzet vastagsága; cm: ceruza; m: szoba; km: városok távolsága',
            'Lépéssel mérni nem pontos – mindenki mást lép.',
            'Oda-vissza út = az út kétszerese.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LengthMeasureMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LengthMeasureSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LengthMeasureQuiz;
