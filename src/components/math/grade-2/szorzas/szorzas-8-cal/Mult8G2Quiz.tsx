import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult8G2Matcher } from './Mult8G2Matcher';
import { Mult8G2Sorter } from './Mult8G2Sorter';
import { BOX_COLORS, DotArrayPart, EightBoxPart, JumpLinePart, MULT8_FONT, OctopusPart, RodPart, SpiderPart } from './Mult8G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** n pók egy sorban (opcionálisan hangyák is). */
const SpidersFig: React.FC<{ n: number; ants?: number }> = ({ n, ants = 0 }) => {
  const total = n + ants;
  const gap = Math.min(58, 230 / total);
  const x0 = 130 - ((total - 1) * gap) / 2;
  const s = total > 4 ? 0.85 : 1.05;
  return (
    <QFig h={90}>
      {Array.from({ length: n }, (_, i) => (
        <SpiderPart key={i} cx={x0 + i * gap} cy={44} s={s} />
      ))}
      {Array.from({ length: ants }, (_, i) => {
        const cx = x0 + (n + i) * gap;
        return (
          <g key={`a${i}`} transform={`translate(${cx} 44) scale(${s})`}>
            {[-6, 0, 6].map((dy) => (
              <g key={dy}>
                <line x1="0" y1={dy} x2="-16" y2={dy + 6} stroke="#7c2d12" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="0" y1={dy} x2="16" y2={dy + 6} stroke="#7c2d12" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            ))}
            <circle cx="0" cy="-12" r="5" fill="#b45309" stroke="#7c2d12" strokeWidth="1.5" />
            <circle cx="0" cy="-2" r="4.5" fill="#b45309" stroke="#7c2d12" strokeWidth="1.5" />
            <ellipse cx="0" cy="10" rx="6" ry="8" fill="#b45309" stroke="#7c2d12" strokeWidth="1.5" />
          </g>
        );
      })}
    </QFig>
  );
};

/** n polip. */
const OctopusFig: React.FC<{ n: number }> = ({ n }) => {
  const gap = Math.min(60, 230 / n);
  const x0 = 130 - ((n - 1) * gap) / 2;
  return (
    <QFig h={96}>
      {Array.from({ length: n }, (_, i) => (
        <OctopusPart key={i} cx={x0 + i * gap} cy={42} s={n > 4 ? 0.95 : 1.1} color={['#ec4899', '#a855f7', '#f97316', '#0ea5e9', '#10b981'][i % 5]} />
      ))}
    </QFig>
  );
};

/** n nyolcas doboz; `crossLast`: az utolsó áthúzva (10 · 8 − 8). */
const BoxesFig: React.FC<{ n: number; crossLast?: boolean }> = ({ n, crossLast = false }) => {
  const perRow = Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const bh = 24;
  const bw = bh * 1.8;
  const gx = bw + 6;
  const x0 = 130 - ((perRow - 1) * gx + bw) / 2;
  const h = 22 + rows * 34;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + (i % perRow) * gx;
        const y = 12 + Math.floor(i / perRow) * 34;
        return (
          <g key={i}>
            <EightBoxPart x={x} y={y} h={bh} color={BOX_COLORS[i % BOX_COLORS.length]} />
            {crossLast && i === n - 1 && (
              <>
                <line x1={x - 2} y1={y - 2} x2={x + bw + 2} y2={y + bh + 2} stroke={UNK} strokeWidth="3.5" />
                <line x1={x + bw + 2} y1={y - 2} x2={x - 2} y2={y + bh + 2} stroke={UNK} strokeWidth="3.5" />
              </>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** ? · (doboz vagy pók) = total */
const HowManyFig: React.FC<{ total: number; spider?: boolean; unit?: string }> = ({ total, spider = false, unit = '' }) => (
  <QFig h={90}>
    <text x="46" y="56" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="72" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      ·
    </text>
    {spider ? <SpiderPart cx={110} cy={46} s={1.2} /> : <EightBoxPart x={86} y={30} h={30} color="#6366f1" />}
    <text x="196" y="56" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      = {total}
    </text>
    {unit && (
      <text x="196" y="78" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
        {unit}
      </text>
    )}
  </QFig>
);

/** Számegyenes 0–80 nyolcas ugrásokkal. `target`: csak az első ugrás és a célszám látszik. */
const JumpsFig: React.FC<{ jumps: number; endQuestion?: boolean; target?: number }> = ({ jumps, endQuestion = true, target }) => {
  const x = 16;
  const w = 222;
  const u = w / 80;
  return (
    <QFig h={110}>
      {target !== undefined ? (
        <>
          <JumpLinePart x={x} y={72} w={w} max={80} jumps={1} step={8} />
          <text x={x + 4 * u} y={40} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4f46e5">
            8
          </text>
          <circle cx={x + target * u} cy={72} r="5" fill={UNK} />
          <text x={x + target * u} y={52} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
            {target}
          </text>
        </>
      ) : (
        <JumpLinePart x={x} y={72} w={w} max={80} jumps={jumps} step={8} endQuestion={endQuestion} />
      )}
    </QFig>
  );
};

/** rows sor, soronként 8 korong. */
const ArrayFig: React.FC<{ rows: number; plain?: boolean }> = ({ rows, plain = false }) => {
  const gap = rows > 5 ? 12 : 16;
  const h = 26 + rows * gap;
  return (
    <QFig h={h}>
      <DotArrayPart
        x={130 - (7 * gap + 10) / 2}
        y={20}
        rows={rows}
        cols={8}
        gap={gap}
        r={gap * 0.36}
        colors={plain ? ['#0ea5e9', '#0ea5e9', '#0ea5e9'] : ['#6366f1', '#6366f1', '#f97316']}
        split={!plain}
      />
    </QFig>
  );
};

/** Láncolt duplázás: n · 2 → n · 4 → n · 8 (az ismert lépések kiírva). */
const DoubleFig: React.FC<{ n: number; showTwo?: boolean }> = ({ n, showTwo = false }) => (
  <QFig h={showTwo ? 120 : 92}>
    {showTwo && (
      <text x="130" y="34" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0369a1">
        {n} · 2 = {n * 2}
      </text>
    )}
    <text x="130" y={showTwo ? 66 : 38} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#c2410c">
      {n} · 4 = {n * 4}
    </text>
    <text x="130" y={showTwo ? 100 : 74} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#312e81">
      {n} · 8 = <tspan fill={UNK}>?</tspan>
    </text>
  </QFig>
);

/** n darab tárgy árcédulával. */
const PriceFig: React.FC<{ n: number; price: number; item: 'pencil' | 'eraser'; coin?: number }> = ({ n, price, item, coin }) => {
  const gap = 40;
  const startX = coin ? 22 : 130 - ((n - 1) * gap) / 2 - 14;
  return (
    <QFig h={104}>
      {Array.from({ length: n }, (_, i) => {
        const x = startX + i * gap;
        return item === 'pencil' ? (
          <g key={i}>
            <rect x={x + 8} y={20} width="12" height="48" fill="#facc15" stroke="#854d0e" strokeWidth="1.8" />
            <polygon points={`${x + 8},68 ${x + 20},68 ${x + 14},82`} fill="#fde68a" stroke="#854d0e" strokeWidth="1.8" />
            <rect x={x + 8} y={14} width="12" height="7" fill="#f472b6" stroke="#854d0e" strokeWidth="1.5" />
          </g>
        ) : (
          <g key={i}>
            <rect x={x} y={34} width="30" height="22" rx="4" fill="#fda4af" stroke="#9f1239" strokeWidth="2" />
            <rect x={x + 18} y={34} width="12" height="22" rx="3" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
          </g>
        );
      })}
      <g>
        <rect x={coin ? 22 : 92} y={coin ? 70 : 84} width="76" height="18" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
        <text x={coin ? 60 : 130} y={coin ? 84 : 98} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
          1 db: {price} Ft
        </text>
      </g>
      {coin && (
        <g>
          <circle cx="218" cy="52" r="28" fill="#fcd34d" stroke="#a16207" strokeWidth="3" />
          <circle cx="218" cy="52" r="22" fill="none" stroke="#a16207" strokeWidth="1.5" />
          <text x="218" y="51" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#713f12">
            {coin}
          </text>
          <text x="218" y="66" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">
            Ft
          </text>
        </g>
      )}
    </QFig>
  );
};

/** Bordó rúd, alatta 2 rózsaszín, alatta ? piros. */
const RodsFig: React.FC = () => (
  <QFig h={124}>
    <RodPart x={34} y={14} units={8} u={24} h={24} />
    <RodPart x={34} y={48} units={4} u={24} h={24} />
    <RodPart x={130} y={48} units={4} u={24} h={24} />
    <rect x={34} y={82} width={192} height={24} rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
    <text x="130" y="100" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ? piros (2)
    </text>
  </QFig>
);

/** 7 nap, naponta 8. */
const DaysFig: React.FC = () => {
  const days = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
  return (
    <QFig h={86}>
      {days.map((d, i) => (
        <g key={d}>
          <rect x={14 + i * 34} y={18} width="30" height="48" rx="6" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
          <text x={29 + i * 34} y={36} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3730a3">
            {d}
          </text>
          <text x={29 + i * 34} y={58} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#1e1b4b">
            8
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Szalagok: az egyik 1 egység, a másik `times` egység. */
const BarsFig: React.FC<{ unit: string; times: number; names: [string, string] }> = ({ unit, times, names }) => {
  const u = 22;
  return (
    <QFig h={100}>
      <text x="12" y="34" fontSize="13" fontWeight="bold" fill="#334155">
        {names[0]}
      </text>
      <rect x={64} y={18} width={u} height="22" rx="3" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1.8" />
      <text x={64 + u / 2} y={34} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e1b4b">
        {unit}
      </text>
      <text x="12" y="74" fontSize="13" fontWeight="bold" fill="#334155">
        {names[1]}
      </text>
      {Array.from({ length: times }, (_, i) => (
        <g key={i}>
          <rect x={64 + i * u} y={58} width={u} height="22" rx="3" fill="#fdba74" stroke="#9a3412" strokeWidth="1.8" />
          <text x={64 + i * u + u / 2} y={74} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#431407">
            {unit}
          </text>
        </g>
      ))}
      <text x={64 + times * u + 10} y={74} fontSize="18" fontWeight="bold" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

/** Két polc: fent 8 könyv, lent 4-szer annyi (4 köteg). */
const ShelvesFig: React.FC = () => (
  <QFig h={120}>
    {[0, 1].map((s) => (
      <rect key={s} x="14" y={s === 0 ? 46 : 104} width="232" height="6" fill="#92400e" />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={20 + i * 12} y={18} width="10" height="28" fill={BOX_COLORS[i % BOX_COLORS.length]} stroke="#1e293b" strokeWidth="1" />
    ))}
    <text x="130" y="38" fontSize="15" fontWeight="bold" fill="#334155">
      8 könyv
    </text>
    {[0, 1, 2, 3].map((g) => (
      <g key={g}>
        <rect x={20 + g * 56} y={76} width="48" height="28" rx="3" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.8" strokeDasharray="4 3" />
        <text x={44 + g * 56} y={95} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3730a3">
          8
        </text>
      </g>
    ))}
    <text x="130" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      lent 4-szer annyi
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT8_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'mult8g2-q1',
    level: 1,
    questionTypeBadge: 'Pókok',
    figure: <SpidersFig n={3} />,
    question: 'Egy póknak 8 lába van. Hány lába van 3 póknak?',
    options: ['24', '11', '16', '32'],
    correctAnswer: 0,
    explanation: '8 + 8 + 8 = 24. Szorzással: 3 · 8 = 24.'
  },
  {
    id: 'mult8g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <BoxesFig n={5} />,
    question: 'Melyik szorzás illik ehhez? 8 + 8 + 8 + 8 + 8',
    options: ['5 · 8', '8 · 8', '5 + 8', '4 · 8'],
    correctAnswer: 0,
    explanation: 'Öt darab nyolcas van. Ez 5 · 8. Az 5 + 8 rossz, mert az csak 13.'
  },
  {
    id: 'mult8g2-q3',
    level: 1,
    questionTypeBadge: 'Két nyolcas',
    figure: <ArrayFig rows={2} />,
    question: 'Mennyi 2 · 8?',
    options: ['16', '10', '18', '14'],
    correctAnswer: 0,
    explanation: '2 · 8 = 8 + 8 = 16. A 10 rossz: az a 2 + 8.'
  },
  {
    id: 'mult8g2-q4',
    level: 1,
    questionTypeBadge: 'Dobozok',
    figure: <BoxesFig n={4} />,
    question: 'Minden dobozban 8 golyó van. Hány golyó van összesen?',
    options: ['32', '12', '24', '40'],
    correctAnswer: 0,
    explanation: '4 doboz, mindegyikben 8: 8, 16, 24, 32. Tehát 4 · 8 = 32.'
  },
  {
    id: 'mult8g2-q5',
    level: 1,
    questionTypeBadge: 'Ugrások',
    figure: <JumpsFig jumps={6} />,
    question: 'A szöcske mindig 8-at ugrik. 0-tól 6-ot ugrik. Hová ér?',
    options: ['48', '14', '40', '56'],
    correctAnswer: 0,
    explanation: '8, 16, 24, 32, 40, 48. 6 · 8 = 48.'
  },
  {
    id: 'mult8g2-q6',
    level: 1,
    questionTypeBadge: 'Tízszer',
    question: 'Mennyi 10 · 8?',
    options: ['80', '18', '72', '70'],
    correctAnswer: 0,
    explanation: '10 darab nyolcas: 80. A 18 rossz, az a 10 + 8.'
  },
  {
    id: 'mult8g2-q7',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 · 8?',
    options: ['0', '8', '80', '1'],
    correctAnswer: 0,
    explanation: 'Egy nyolcas sincs. Ha nincs egy doboz sem, golyó sincs: 0 · 8 = 0.'
  },
  {
    id: 'mult8g2-q8',
    level: 1,
    questionTypeBadge: 'Sorozat',
    question: 'Mi jön ezután? 8, 16, 24, 32, □',
    options: ['40', '36', '34', '48'],
    correctAnswer: 0,
    explanation: 'Mindig 8-cal több: 32 + 8 = 40.'
  },
  {
    id: 'mult8g2-q9',
    level: 1,
    questionTypeBadge: 'Polipok',
    figure: <OctopusFig n={5} />,
    question: 'Egy polipnak 8 karja van. Hány karja van 5 polipnak?',
    options: ['40', '13', '35', '45'],
    correctAnswer: 0,
    explanation: '5 · 8 = 40. Nyolcasával: 8, 16, 24, 32, 40.'
  },
  {
    id: 'mult8g2-q10',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    figure: <ArrayFig rows={3} plain />,
    question: 'Melyik ugyanannyi, mint 3 · 8?',
    options: ['8 · 3', '3 + 8', '8 · 8', '3 · 3'],
    correctAnswer: 0,
    explanation: 'A tényezőket felcserélhetjük: 3 · 8 = 8 · 3 = 24.'
  },

  // ----- 2. szint -----
  {
    id: 'mult8g2-q11',
    level: 2,
    questionTypeBadge: 'Hány doboz?',
    figure: <HowManyFig total={56} />,
    question: 'Hány nyolcas doboz kell 56 golyóhoz?',
    options: ['7', '6', '8', '48'],
    correctAnswer: 0,
    explanation: 'Nyolcasával: 8, 16, 24, 32, 40, 48, 56. Ez 7 doboz. 7 · 8 = 56.'
  },
  {
    id: 'mult8g2-q12',
    level: 2,
    questionTypeBadge: 'Duplázás',
    figure: <DoubleFig n={7} />,
    question: '7 · 4 = 28. Mennyi 7 · 8?',
    options: ['56', '32', '36', '54'],
    correctAnswer: 0,
    explanation: 'A 8 a 4 duplája. Duplázd meg a 28-at: 28 + 28 = 56.'
  },
  {
    id: 'mult8g2-q13',
    level: 2,
    questionTypeBadge: 'Egy nyolcassal kevesebb',
    figure: <BoxesFig n={10} crossLast />,
    question: '10 · 8 = 80. Mennyi 9 · 8?',
    options: ['72', '80', '64', '71'],
    correctAnswer: 0,
    explanation: 'Egy nyolcassal kevesebb: 80 − 8 = 72. A 71 rossz: ott 9-et vettél el.'
  },
  {
    id: 'mult8g2-q14',
    level: 2,
    questionTypeBadge: 'Háromszor duplázás',
    figure: <DoubleFig n={6} showTwo />,
    question: '6 · 2 = 12 és 6 · 4 = 24. Mennyi 6 · 8?',
    options: ['48', '36', '26', '42'],
    correctAnswer: 0,
    explanation: 'Duplázd meg a 24-et: 24 + 24 = 48. Tehát 6 · 8 = 48.'
  },
  {
    id: 'mult8g2-q15',
    level: 2,
    questionTypeBadge: 'Melyik jel?',
    question: 'Melyik jel kerül a ○ helyére? 4 · 8 ○ 30',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '4 · 8 = 32. A 32 több, mint 30, ezért 4 · 8 > 30.'
  },
  {
    id: 'mult8g2-q16',
    level: 2,
    questionTypeBadge: 'A 8-as táblában',
    figure: <JumpsFig jumps={10} endQuestion={false} />,
    question: 'Melyik szám van benne a 8-as szorzótáblában?',
    options: ['64', '44', '60', '30'],
    correctAnswer: 0,
    explanation: '8 · 8 = 64. A 44, a 60 és a 30 nincs a nyolcas ugrások között.'
  },
  {
    id: 'mult8g2-q17',
    level: 2,
    questionTypeBadge: 'Vásárlás',
    figure: <PriceFig n={4} price={8} item="pencil" />,
    question: 'Egy ceruza 8 Ft. Mennyibe kerül 4 ceruza?',
    options: ['32 Ft', '12 Ft', '24 Ft', '36 Ft'],
    correctAnswer: 0,
    explanation: '4 · 8 = 32. A 4 ceruza 32 Ft.'
  },
  {
    id: 'mult8g2-q18',
    level: 2,
    questionTypeBadge: 'Színes rudak',
    figure: <RodsFig />,
    question: 'A bordó rúd 8 hosszú. Hány piros rúd (2 hosszú) ér fel vele?',
    options: ['4', '2', '8', '6'],
    correctAnswer: 0,
    explanation: '2 + 2 + 2 + 2 = 8. Tehát 4 piros rúd kell. 4 · 2 = 8.'
  },
  {
    id: 'mult8g2-q19',
    level: 2,
    questionTypeBadge: 'Nyolcszor nyolc',
    figure: <ArrayFig rows={8} />,
    question: 'Mennyi 8 · 8?',
    options: ['64', '16', '56', '72'],
    correctAnswer: 0,
    explanation: '8 · 4 = 32, és 32 + 32 = 64. A 16 rossz: az csak 8 + 8.'
  },
  {
    id: 'mult8g2-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <JumpsFig jumps={0} target={40} />,
    question: 'Mi kerül a □ helyére? 8 · □ = 40',
    options: ['5', '32', '4', '6'],
    correctAnswer: 0,
    explanation: '8 · 5 = 5 · 8 = 40. Nyolcasával 5 ugrás vezet a 40-hez.'
  },

  // ----- 3. szint -----
  {
    id: 'mult8g2-q21',
    level: 3,
    questionTypeBadge: 'Egy hét',
    figure: <DaysFig />,
    question: 'Bori minden nap 8 oldalt olvas. Hány oldalt olvas el egy hét alatt?',
    options: ['56', '15', '48', '64'],
    correctAnswer: 0,
    explanation: 'Egy hét 7 nap. 7 · 8 = 56 oldal.'
  },
  {
    id: 'mult8g2-q22',
    level: 3,
    questionTypeBadge: 'Lábak',
    figure: <SpidersFig n={4} ants={1} />,
    question: '4 pók és 1 hangya mászik a falon. A hangyának 6 lába van. Hány lábuk van összesen?',
    options: ['38', '32', '40', '34'],
    correctAnswer: 0,
    explanation: '4 póknak 4 · 8 = 32 lába van. Hozzá a hangya 6 lába: 32 + 6 = 38.'
  },
  {
    id: 'mult8g2-q23',
    level: 3,
    questionTypeBadge: 'Mennyi marad?',
    figure: <PriceFig n={5} price={8} item="eraser" coin={50} />,
    question: 'Anna 50 Ft-tal megy a boltba. 5 radírt vesz, egy radír 8 Ft. Mennyi pénze marad?',
    options: ['10 Ft', '40 Ft', '42 Ft', '18 Ft'],
    correctAnswer: 0,
    explanation: '5 radír: 5 · 8 = 40 Ft. 50 − 40 = 10 Ft marad.'
  },
  {
    id: 'mult8g2-q24',
    level: 3,
    questionTypeBadge: 'Nyolcszor annyi',
    figure: <BarsFig unit="9" times={8} names={['Zsófi', 'Ádám']} />,
    question: 'Zsófinak 9 matricája van. Ádámnak 8-szor annyi. Hány matricája van Ádámnak?',
    options: ['72', '17', '64', '80'],
    correctAnswer: 0,
    explanation: '8-szor 9 ugyanannyi, mint 9 · 8 = 72. A 17 rossz: az a 9 + 8.'
  },
  {
    id: 'mult8g2-q25',
    level: 3,
    questionTypeBadge: 'Két polc',
    figure: <ShelvesFig />,
    question: 'A felső polcon 8 könyv van. Az alsón 4-szer annyi. Hány könyv van a két polcon összesen?',
    options: ['40', '32', '12', '36'],
    correctAnswer: 0,
    explanation: 'Lent 4 · 8 = 32 könyv. Fent 8. Összesen 32 + 8 = 40.'
  },
  {
    id: 'mult8g2-q26',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? 6 · 8 + □ = 50',
    options: ['2', '8', '12', '3'],
    correctAnswer: 0,
    explanation: '6 · 8 = 48. 48 + 2 = 50, tehát □ = 2.'
  },
  {
    id: 'mult8g2-q27',
    level: 3,
    questionTypeBadge: 'Zsírkréták',
    question: 'Tomi 7 doboz zsírkrétát kap. Egy dobozban 8 kréta van. 6 krétát elveszít. Hány krétája marad?',
    options: ['50', '56', '62', '49'],
    correctAnswer: 0,
    explanation: '7 · 8 = 56 kréta. 56 − 6 = 50 marad.'
  },
  {
    id: 'mult8g2-q28',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Mi jön ezután? 80, 72, 64, 56, □',
    options: ['48', '50', '46', '52'],
    correctAnswer: 0,
    explanation: 'Mindig 8-cal kevesebb: 56 − 8 = 48.'
  },
  {
    id: 'mult8g2-q29',
    level: 3,
    questionTypeBadge: 'Melyik több?',
    question: 'Melyikben van több golyó? 5 doboz, mindegyikben 8 golyó, vagy 9 doboz, mindegyikben 4 golyó?',
    options: ['Az 5 nyolcas dobozban: 40', 'A 9 négyes dobozban: 36', 'Egyformán sok', 'A 9 négyes dobozban: 45'],
    correctAnswer: 0,
    explanation: '5 · 8 = 40 és 9 · 4 = 36. A 40 több, mint a 36.'
  },
  {
    id: 'mult8g2-q30',
    level: 3,
    questionTypeBadge: 'Hány pók?',
    figure: <HowManyFig total={48} spider unit="láb" />,
    question: 'Pókok ülnek a hálón. Összesen 48 lábuk van. Hány pók ül ott?',
    options: ['6', '5', '8', '40'],
    correctAnswer: 0,
    explanation: 'Számolj nyolcasával 48-ig: 8, 16, 24, 32, 40, 48. Ez 6 pók, mert 6 · 8 = 48.'
  }
];

export const Mult8G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-8-quiz"
    subtopicId="szorzas-8-cal"
    title="7. Szorzás 8-cal – Kvíz"
    subtitle="30 feladat 3 szinten: nyolcas csoportok, a 8-as szorzótábla, kapcsolat a 2-es és a 4-es táblával, szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT8_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 8-as szorzótábla',
        items: ['1 · 8 = 8, 2 · 8 = 16, 3 · 8 = 24', '4 · 8 = 32, 5 · 8 = 40, 6 · 8 = 48', '7 · 8 = 56, 8 · 8 = 64', '9 · 8 = 72, 10 · 8 = 80']
      },
      {
        title: 'Duplázás',
        items: ['8 = 4 + 4', 'Előbb · 4, aztán duplázd!', '7 · 4 = 28 → 7 · 8 = 56', '9 · 8 = 80 − 8 = 72']
      },
      {
        title: 'Jó tudni',
        items: ['0 · 8 = 0', '3 · 8 = 8 · 3', 'Nyolcasával: 8, 16, 24, 32, 40 …', 'Előbb szorozz, aztán adj hozzá!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Mult8G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Mult8G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Mult8G2Quiz;
