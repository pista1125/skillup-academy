import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulDiv100G3Matcher } from './MulDiv100G3Matcher';
import { MulDiv100G3Sorter } from './MulDiv100G3Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Korongrács: rows sor, cols oszlop. */
const DotsFig: React.FC<{ rows: number; cols: number; color?: string; crossed?: number }> = ({ rows, cols, color = '#ef4444', crossed = 0 }) => {
  const step = Math.min(22, 200 / cols, 120 / rows);
  const w = step * (cols - 1);
  const x0 = 120 - w / 2;
  const y0 = 20 + (120 - step * (rows - 1)) / 2 - 6;
  const h = 150;
  let k = 0;
  return (
    <QFig h={h}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const idx = k++;
          const x = x0 + c * step;
          const y = y0 + r * step;
          const isX = idx >= rows * cols - crossed;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={x} cy={y} r={step * 0.38} fill={isX ? '#e2e8f0' : color} stroke={isX ? '#94a3b8' : '#334155'} strokeWidth="0.8" />
              {isX && (
                <path d={`M ${x - 5} ${y - 5} L ${x + 5} ${y + 5} M ${x + 5} ${y - 5} L ${x - 5} ${y + 5}`} stroke="#64748b" strokeWidth="1.6" />
              )}
            </g>
          );
        })
      )}
    </QFig>
  );
};

/** Egyenlet nyíllal egy tagra: a megjelölt tag fölé "?" kerül. */
const NameFig: React.FC<{ parts: string[]; mark: number }> = ({ parts, mark }) => {
  const gap = 200 / parts.length;
  const X = (i: number) => 20 + gap * (i + 0.5);
  return (
    <QFig h={100}>
      {parts.map((p, i) => (
        <text key={i} x={X(i)} y="48" textAnchor="middle" fontSize="24" fontWeight="bold" fill={i === mark ? '#1d4ed8' : '#334155'}>
          {p}
        </text>
      ))}
      <path d={`M ${X(mark)} 56 L ${X(mark)} 74`} stroke={UNK} strokeWidth="2" />
      <path d={`M ${X(mark) - 5} 62 L ${X(mark)} 56 L ${X(mark) + 5} 62`} stroke={UNK} strokeWidth="2" fill="none" />
      <text x={X(mark)} y="92" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Csoportok: n csoport, mindegyikben k kör. */
const GroupsFig: React.FC<{ groups: number; size: number; label?: string; color?: string; circled?: boolean; loose?: number }> = ({
  groups,
  size,
  label,
  color = '#f59e0b',
  circled = true,
  loose = 0
}) => {
  const perRow = groups > 4 ? Math.ceil(groups / 2) : groups;
  const gw = 220 / perRow;
  const rowsN = Math.ceil(groups / perRow);
  const dotsPerLine = size > 4 ? Math.ceil(size / 2) : size;
  const ds = Math.min(11, (gw - 10) / dotsPerLine);
  return (
    <QFig h={rowsN > 1 ? 150 : 110}>
      {label && (
        <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {label}
        </text>
      )}
      {Array.from({ length: groups }, (_, g) => {
        const gx = 10 + (g % perRow) * gw;
        const gy = 30 + Math.floor(g / perRow) * 56;
        const lines = Math.ceil(size / dotsPerLine);
        return (
          <g key={g}>
            {circled && <rect x={gx + 2} y={gy} width={gw - 4} height={lines * ds + 12} rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />}
            {Array.from({ length: size }, (_, d) => {
              const row = Math.floor(d / dotsPerLine);
              const col = d % dotsPerLine;
              const inLine = Math.min(dotsPerLine, size - row * dotsPerLine);
              const cx = gx + gw / 2 - ((inLine - 1) * ds) / 2 + col * ds;
              return <circle key={d} cx={cx} cy={gy + 6 + ds / 2 + row * ds} r={ds * 0.4} fill={color} stroke="#334155" strokeWidth="0.6" />;
            })}
          </g>
        );
      })}
      {loose > 0 &&
        Array.from({ length: loose }, (_, i) => <circle key={`l${i}`} cx={200 + i * 12} cy={rowsN > 1 ? 136 : 96} r="4.5" fill={color} stroke="#334155" strokeWidth="0.6" />)}
    </QFig>
  );
};

/** Számok sorban, egy helyen "?". */
const SeqFig: React.FC<{ items: string[]; ops?: string[] }> = ({ items, ops }) => {
  const gap = 228 / items.length;
  const X = (i: number) => 6 + gap * (i + 0.5);
  return (
    <QFig h={ops ? 100 : 80}>
      {ops &&
        ops.map((o, i) => (
          <g key={`o${i}`}>
            <path d={`M ${X(i) + 6} 44 Q ${(X(i) + X(i + 1)) / 2} 22 ${X(i + 1) - 6} 44`} fill="none" stroke="#ea580c" strokeWidth="1.5" />
            <text x={(X(i) + X(i + 1)) / 2} y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c">
              {o}
            </text>
          </g>
        ))}
      {items.map((t, i) => (
        <g key={i}>
          <rect x={X(i) - gap / 2 + 4} y={ops ? 50 : 22} width={gap - 8} height="34" rx="8" fill={t === '?' ? '#fee2e2' : '#e0f2fe'} stroke={t === '?' ? UNK : '#0284c7'} />
          <text x={X(i)} y={ops ? 73 : 45} textAnchor="middle" fontSize="16" fontWeight="bold" fill={t === '?' ? UNK : '#0c4a6e'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Szorzótábla-részlet. */
const TableFig: React.FC<{ top: number[]; left: number[]; cells: (string | null)[][] }> = ({ top, left, cells }) => {
  const cw = 200 / (top.length + 1);
  const ch = 30;
  return (
    <QFig h={30 + ch * (left.length + 1)}>
      {[null, ...top].map((t, i) => (
        <g key={`t${i}`}>
          <rect x={20 + i * cw} y="14" width={cw} height={ch} fill={i === 0 ? '#fecaca' : '#dbeafe'} stroke="#64748b" />
          <text x={20 + i * cw + cw / 2} y={14 + 20} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
            {i === 0 ? '·' : t}
          </text>
        </g>
      ))}
      {left.map((l, r) => (
        <g key={`r${r}`}>
          <rect x="20" y={14 + ch * (r + 1)} width={cw} height={ch} fill="#dbeafe" stroke="#64748b" />
          <text x={20 + cw / 2} y={14 + ch * (r + 1) + 20} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
            {l}
          </text>
          {top.map((_, c) => {
            const v = cells[r][c];
            return (
              <g key={c}>
                <rect x={20 + (c + 1) * cw} y={14 + ch * (r + 1)} width={cw} height={ch} fill={v === '?' ? '#fee2e2' : '#fff'} stroke="#64748b" />
                {v && (
                  <text x={20 + (c + 1) * cw + cw / 2} y={14 + ch * (r + 1) + 20} textAnchor="middle" fontSize="14" fontWeight="bold" fill={v === '?' ? UNK : '#334155'}>
                    {v}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </QFig>
  );
};

/** Tojástartók. */
const EggBoxesFig: React.FC<{ boxes: number; per: number; broken: number }> = ({ boxes, per, broken }) => (
  <QFig h={120}>
    {Array.from({ length: boxes }, (_, b) => (
      <g key={b}>
        <rect x={12 + b * 56} y="26" width="50" height="40" rx="6" fill="#d6d3d1" stroke="#78716c" strokeWidth="1.5" />
        {Array.from({ length: per }, (_, e) => (
          <ellipse key={e} cx={22 + b * 56 + (e % 3) * 15} cy={38 + Math.floor(e / 3) * 16} rx="6" ry="7" fill="#fef3c7" stroke="#a16207" strokeWidth="0.8" />
        ))}
      </g>
    ))}
    <text x="120" y="88" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{`Összetört: ${broken} tojás`}</text>
    <text x="120" y="108" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>Ép tojás: ?</text>
  </QFig>
);

/** Kerekek: bicikli 2, tricikli 3. */
const WheelsFig: React.FC = () => (
  <QFig h={130}>
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">5 kerékpár és 4 tricikli</text>
    {Array.from({ length: 5 }, (_, i) => (
      <g key={`b${i}`}>
        <circle cx={22 + i * 46} cy="48" r="8" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
        <circle cx={44 + i * 46} cy="48" r="8" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
        <path d={`M ${22 + i * 46} 48 L ${33 + i * 46} 36 L ${44 + i * 46} 48`} fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
      </g>
    ))}
    {Array.from({ length: 4 }, (_, i) => (
      <g key={`t${i}`}>
        <circle cx={40 + i * 54} cy="96" r="9" fill="none" stroke="#16a34a" strokeWidth="2.5" />
        <circle cx={22 + i * 54} cy="108" r="6" fill="none" stroke="#16a34a" strokeWidth="2.5" />
        <circle cx={58 + i * 54} cy="108" r="6" fill="none" stroke="#16a34a" strokeWidth="2.5" />
        <path d={`M ${22 + i * 54} 108 L ${58 + i * 54} 108 M ${40 + i * 54} 96 L ${40 + i * 54} 108`} stroke="#16a34a" strokeWidth="1.5" />
      </g>
    ))}
  </QFig>
);

/** Szalagos ábra: Dóra 1 rész, Bence 3 rész. */
const BarsFig: React.FC = () => (
  <QFig h={110}>
    <text x="14" y="38" fontSize="12" fontWeight="bold" fill="#334155">Dóra</text>
    <rect x="62" y="22" width="50" height="24" rx="4" fill="#fde68a" stroke="#b45309" />
    <text x="87" y="39" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">9</text>
    <text x="14" y="80" fontSize="12" fontWeight="bold" fill="#334155">Bence</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={62 + i * 50} y="64" width="50" height="24" rx="4" fill="#bbf7d0" stroke="#15803d" />
        <text x={87 + i * 50} y="81" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">9</text>
      </g>
    ))}
    <text x="226" y="60" textAnchor="end" fontSize="13" fontWeight="bold" fill={UNK}>együtt: ?</text>
  </QFig>
);

/** Mérleg: két oldal egyenlő. */
const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={120}>
    <path d="M 120 30 L 120 100 M 90 104 L 150 104" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <path d="M 40 40 L 200 40" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <path d="M 120 24 L 112 36 L 128 36 Z" fill="#475569" />
    <path d="M 40 40 L 22 70 M 40 40 L 58 70 M 200 40 L 182 70 M 200 40 L 218 70" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="10" y="70" width="60" height="28" rx="6" fill="#e0f2fe" stroke="#0284c7" />
    <text x="40" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">{left}</text>
    <rect x="170" y="70" width="60" height="28" rx="6" fill="#fee2e2" stroke={UNK} />
    <text x="200" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7f1d1d">{right}</text>
  </QFig>
);

/** Számegyenes 40–50, két jelölt pont. */
const LineFig: React.FC = () => {
  const X = (v: number) => 20 + (v - 40) * 20;
  return (
    <QFig h={90}>
      <line x1="14" y1="50" x2="226" y2="50" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={X(40 + i)} y1={i % 5 ? 45 : 41} x2={X(40 + i)} y2={i % 5 ? 55 : 59} stroke="#334155" strokeWidth="1.2" />
          {i % 5 === 0 && (
            <text x={X(40 + i)} y="74" textAnchor="middle" fontSize="11" fill="#475569">
              {40 + i}
            </text>
          )}
        </g>
      ))}
      <circle cx={X(42)} cy="50" r="5" fill="#2563eb" />
      <text x={X(42)} y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">6 · 7</text>
      <circle cx={X(49)} cy="50" r="5" fill="#2563eb" />
      <text x={X(49)} y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">7 · 7</text>
    </QFig>
  );
};

/** Tízesrudak. */
const RodsFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={130}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i}>
        {Array.from({ length: 10 }, (_, j) => (
          <rect key={j} x={30 + i * 24} y={14 + j * 9} width="16" height="9" fill="#38bdf8" stroke="#0369a1" strokeWidth="0.8" />
        ))}
      </g>
    ))}
    <text x="120" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{`${n} tízesrúd`}</text>
  </QFig>
);

/** Gyerekek és cukorkák. */
const KidsFig: React.FC<{ kids: number; total: number }> = ({ kids, total }) => (
  <QFig h={110}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{`${total} szem cukor, ${kids} gyerek`}</text>
    {Array.from({ length: kids }, (_, i) => {
      const cx = 30 + i * (180 / (kids - 1));
      return (
        <g key={i}>
          <circle cx={cx} cy="50" r="12" fill="#fde68a" stroke="#b45309" />
          <circle cx={cx - 4} cy="47" r="1.6" fill="#334155" />
          <circle cx={cx + 4} cy="47" r="1.6" fill="#334155" />
          <path d={`M ${cx - 4} 54 Q ${cx} 58 ${cx + 4} 54`} fill="none" stroke="#334155" strokeWidth="1.2" />
          <rect x={cx - 10} y="64" width="20" height="18" rx="4" fill="#fce7f3" stroke="#db2777" />
          <text x={cx} y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>?</text>
        </g>
      );
    })}
    <text x="120" y="102" textAnchor="middle" fontSize="11" fill="#475569">mindenki megeszik 3 szemet</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MUL_DIV_100_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'md100-q1',
    level: 1,
    questionTypeBadge: 'Szorzás képről',
    figure: <DotsFig rows={3} cols={5} />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['3 · 5 = 15', '3 + 5 = 8', '3 · 6 = 18', '5 · 5 = 25'],
    correctAnswer: 0,
    explanation: '3 sor van, minden sorban 5 korong. 3 · 5 = 15.'
  },
  {
    id: 'md100-q2',
    level: 1,
    questionTypeBadge: 'Szorzás',
    figure: <GroupsFig groups={5} size={3} label="5 tál, mindegyikben 3 szilva" color="#7c3aed" />,
    question: 'Hány szilva van összesen?',
    options: ['15', '8', '18', '12'],
    correctAnswer: 0,
    explanation: '5 tálban 3-3 szilva: 5 · 3 = 15.'
  },
  {
    id: 'md100-q3',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 6 · 4?',
    options: ['24', '10', '20', '28'],
    correctAnswer: 0,
    explanation: '6 · 4 = 24. Négyesével: 4, 8, 12, 16, 20, 24.'
  },
  {
    id: 'md100-q4',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 35 : 5?',
    options: ['7', '6', '30', '8'],
    correctAnswer: 0,
    explanation: '35 : 5 = 7, mert 7 · 5 = 35.'
  },
  {
    id: 'md100-q5',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <NameFig parts={['7', '·', '8', '=', '56']} mark={4} />,
    question: 'Hogy hívjuk a nyíllal jelölt számot?',
    options: ['szorzat', 'tényező', 'hányados', 'osztandó'],
    correctAnswer: 0,
    explanation: 'A szorzás eredménye a szorzat. A 7 és a 8 a tényezők.'
  },
  {
    id: 'md100-q6',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <NameFig parts={['40', ':', '8', '=', '5']} mark={2} />,
    question: 'Hogy hívjuk a nyíllal jelölt számot?',
    options: ['osztó', 'osztandó', 'hányados', 'tényező'],
    correctAnswer: 0,
    explanation: '40 az osztandó, 8 az osztó, 5 a hányados.'
  },
  {
    id: 'md100-q7',
    level: 1,
    questionTypeBadge: 'Bennfoglalás',
    figure: <GroupsFig groups={3} size={4} label="12 csillag, négyesével" color="#facc15" />,
    question: 'Melyik osztás illik a képhez?',
    options: ['12 : 4 = 3', '12 − 4 = 8', '12 : 2 = 6', '4 · 4 = 16'],
    correctAnswer: 0,
    explanation: '12-ben a 4 megvan 3-szor. 3 csoport lett: 12 : 4 = 3.'
  },
  {
    id: 'md100-q8',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Melyik ugyanannyi, mint 9 · 3?',
    options: ['3 · 9', '9 + 3', '9 · 9', '3 + 3'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők: 9 · 3 = 3 · 9 = 27.'
  },
  {
    id: 'md100-q9',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    figure: (
      <QFig h={100}>
        <line x1="14" y1="64" x2="226" y2="64" stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <line x1={20 + i * 33} y1="58" x2={20 + i * 33} y2="70" stroke="#334155" />
          </g>
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} d={`M ${20 + i * 33} 60 Q ${36 + i * 33} 30 ${53 + i * 33} 60`} fill="none" stroke="#16a34a" strokeWidth="1.8" />
        ))}
        <text x="20" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">0</text>
        <text x="53" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">7</text>
        <text x="185" y="86" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>?</text>
        <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">5 ugrás, mindegyik 7</text>
      </QFig>
    ),
    question: 'A béka 0-ról indul, és 5-öt ugrik. Mindig 7-et ugrik. Hová érkezik?',
    options: ['35', '12', '30', '42'],
    correctAnswer: 0,
    explanation: '5 ugrás, mindegyik 7: 5 · 7 = 35.'
  },
  {
    id: 'md100-q10',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    figure: <RodsFig n={8} />,
    question: 'Hány kis kocka van a 8 tízesrúdban?',
    options: ['80', '18', '81', '70'],
    correctAnswer: 0,
    explanation: 'Egy rúdban 10 kocka van. 8 · 10 = 80.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'md100-q11',
    level: 2,
    questionTypeBadge: 'Szorzás képről',
    figure: <DotsFig rows={7} cols={8} color="#3b82f6" />,
    question: 'Hány pötty van a képen?',
    options: ['56', '54', '15', '63'],
    correctAnswer: 0,
    explanation: '7 sor, soronként 8 pötty: 7 · 8 = 56.'
  },
  {
    id: 'md100-q12',
    level: 2,
    questionTypeBadge: 'Részekre osztás',
    figure: (
      <QFig h={110}>
        <text x="120" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">24 keksz, 4 tányér</text>
        {[0, 1, 2, 3].map((p) => (
          <g key={p}>
            <ellipse cx={36 + p * 56} cy="66" rx="24" ry="10" fill="#e2e8f0" stroke="#64748b" />
            <text x={36 + p * 56} y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
          </g>
        ))}
        <text x="120" y="98" textAnchor="middle" fontSize="11" fill="#475569">mindegyikre ugyanannyi</text>
      </QFig>
    ),
    question: '24 kekszet 4 tányérra osztunk egyformán. Mennyi jut egy tányérra?',
    options: ['6', '20', '28', '8'],
    correctAnswer: 0,
    explanation: '24 : 4 = 6, mert 6 · 4 = 24.'
  },
  {
    id: 'md100-q13',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 63 : 9?',
    options: ['7', '6', '8', '54'],
    correctAnswer: 0,
    explanation: '63 : 9 = 7, mert 7 · 9 = 63.'
  },
  {
    id: 'md100-q14',
    level: 2,
    questionTypeBadge: 'Műveletcsalád',
    figure: (
      <QFig h={120}>
        <path d="M 120 18 L 60 104 L 180 104 Z" fill="#fce7f3" stroke="#db2777" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="120" cy="42" r="16" fill="#fff" stroke="#1d4ed8" strokeWidth="2" />
        <text x="120" y="48" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">54</text>
        <circle cx="86" cy="88" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="86" y="94" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">6</text>
        <circle cx="154" cy="88" r="14" fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text x="154" y="94" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">9</text>
      </QFig>
    ),
    question: 'Tudod, hogy 6 · 9 = 54. Mennyi 54 : 9?',
    options: ['6', '9', '45', '63'],
    correctAnswer: 0,
    explanation: 'Egy családba tartoznak: 6 · 9 = 54, ezért 54 : 9 = 6.'
  },
  {
    id: 'md100-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? □ · 7 = 42',
    options: ['6', '35', '49', '5'],
    correctAnswer: 0,
    explanation: '6 · 7 = 42. Ellenőrzés: 42 : 7 = 6.'
  },
  {
    id: 'md100-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb: 8 · 4 vagy 5 · 6?',
    options: ['8 · 4, mert 32 > 30', '5 · 6, mert 30 > 32', 'Egyformák', '5 · 6, mert 6 több, mint 4'],
    correctAnswer: 0,
    explanation: '8 · 4 = 32 és 5 · 6 = 30. A 32 a nagyobb.'
  },
  {
    id: 'md100-q17',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    figure: (
      <TableFig
        top={[4, 6, 9]}
        left={[3, 7]}
        cells={[
          ['12', '18', '27'],
          ['28', '?', '63']
        ]}
      />
    ),
    question: 'Mi kerül a ? helyére a szorzótáblában?',
    options: ['42', '13', '48', '36'],
    correctAnswer: 0,
    explanation: 'A sor eleje 7, az oszlop teteje 6: 7 · 6 = 42.'
  },
  {
    id: 'md100-q18',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik számot kell 8-cal szorozni, hogy 48 legyen?',
    options: ['6', '40', '56', '7'],
    correctAnswer: 0,
    explanation: '6 · 8 = 48. Osztással: 48 : 8 = 6.'
  },
  {
    id: 'md100-q19',
    level: 2,
    questionTypeBadge: 'Bennfoglalás',
    figure: <DotsFig rows={3} cols={10} color="#0ea5e9" />,
    question: '30 gyerek ötös csoportokba áll. Hány csoport lesz?',
    options: ['6', '25', '35', '5'],
    correctAnswer: 0,
    explanation: '30-ban az 5 megvan 6-szor: 30 : 5 = 6.'
  },
  {
    id: 'md100-q20',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={['7', '14', '21', '?', '35']} />,
    question: 'Melyik szám hiányzik a sorból?',
    options: ['28', '22', '27', '42'],
    correctAnswer: 0,
    explanation: 'Ez a 7-es szorzótábla: 7, 14, 21, 28, 35. Mindig 7-tel nő.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'md100-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <EggBoxesFig boxes={4} per={6} broken={5} />,
    question: 'Vettél 4 doboz tojást. Mindegyikben 6 tojás van. 5 összetört. Hány ép tojás maradt?',
    options: ['19', '24', '29', '15'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24 tojás volt. 24 − 5 = 19 maradt épen.'
  },
  {
    id: 'md100-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <WheelsFig />,
    question: 'A kerékpárnak 2, a triciklinek 3 kereke van. Hány kerék van összesen?',
    options: ['22', '14', '23', '20'],
    correctAnswer: 0,
    explanation: '5 · 2 = 10 és 4 · 3 = 12. Együtt 10 + 12 = 22 kerék.'
  },
  {
    id: 'md100-q23',
    level: 3,
    questionTypeBadge: 'Háromszor annyi',
    figure: <BarsFig />,
    question: 'Dórának 9 matricája van. Bencének háromszor annyi. Hány matricájuk van együtt?',
    options: ['36', '27', '12', '18'],
    correctAnswer: 0,
    explanation: 'Bencének 3 · 9 = 27 van. Együtt: 9 + 27 = 36.'
  },
  {
    id: 'md100-q24',
    level: 3,
    questionTypeBadge: 'Egyenlőség',
    figure: <BalanceFig left="6 · 4" right="□ · 8" />,
    question: 'A mérleg egyensúlyban van. Melyik szám kerül a □ helyére?',
    options: ['3', '24', '2', '4'],
    correctAnswer: 0,
    explanation: '6 · 4 = 24. Melyik szám · 8 = 24? 3 · 8 = 24, tehát 3.'
  },
  {
    id: 'md100-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? 42 : □ = 2 · 3',
    options: ['7', '6', '36', '8'],
    correctAnswer: 0,
    explanation: '2 · 3 = 6. Mivel osztva 6 a 42? 42 : 7 = 6, tehát 7.'
  },
  {
    id: 'md100-q26',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={['8', '4', '12', '6', '?']} ops={[': 2', '· 3', ': 2', '· 3']} />,
    question: 'Kövesd a nyilakat! Melyik szám van a végén?',
    options: ['18', '12', '9', '24'],
    correctAnswer: 0,
    explanation: '8 : 2 = 4, 4 · 3 = 12, 12 : 2 = 6, 6 · 3 = 18.'
  },
  {
    id: 'md100-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <LineFig />,
    question: 'Hány szám van a 6 · 7 és a 7 · 7 között?',
    options: ['6', '7', '5', '8'],
    correctAnswer: 0,
    explanation: '6 · 7 = 42 és 7 · 7 = 49. Köztük: 43, 44, 45, 46, 47, 48. Ez 6 szám.'
  },
  {
    id: 'md100-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <KidsFig kids={6} total={48} />,
    question: '48 szem cukrot 6 gyerek egyformán oszt el. Mindenki megeszik 3 szemet. Hány szem marad egy gyereknek?',
    options: ['5', '8', '11', '2'],
    correctAnswer: 0,
    explanation: '48 : 6 = 8 szem jut egy gyereknek. 8 − 3 = 5 marad.'
  },
  {
    id: 'md100-q29',
    level: 3,
    questionTypeBadge: 'Szorzat',
    question: 'Melyik szorzás eredménye NEM 24?',
    options: ['5 · 5', '3 · 8', '4 · 6', '8 · 3'],
    correctAnswer: 0,
    explanation: '5 · 5 = 25. A többi mind 24: 3 · 8 = 8 · 3 = 24 és 4 · 6 = 24.'
  },
  {
    id: 'md100-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <DotsFig rows={5} cols={8} color="#ec4899" crossed={6} />,
    question: 'Az ágyásban 5 sor tulipán van, minden sorban 8. Leszedtél 6 szálat. Hány tulipán maradt?',
    options: ['34', '40', '46', '35'],
    correctAnswer: 0,
    explanation: '5 · 8 = 40 tulipán volt. 40 − 6 = 34 maradt.'
  }
];

export const MulDiv100G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId="g3-c100-szorzas-quiz"
      subtopicId="szorzas-es-osztas"
      title="3. Szorzás és osztás – Kvíz"
      subtitle="30 feladat 3 szinten: szorzótábla, osztás, a műveletek részei, hiányzó számok, szöveges feladatok."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={MUL_DIV_100_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A számok neve',
          items: ['6 · 5 = 30: a 6 és az 5 tényező, a 30 szorzat', '30 : 6 = 5: osztandó : osztó = hányados']
        },
        {
          title: 'Szorzás és osztás',
          items: ['A tényezők felcserélhetők: 4 · 7 = 7 · 4', 'Osztásnál nem cserélhetsz!', 'Ellenőrzés: 28 : 7 = 4, mert 4 · 7 = 28']
        },
        {
          title: 'Kétféle osztás',
          items: ['Hány csoport lesz? 18 : 3 = 6 (hármasával)', 'Mennyi jut egyre? 12 : 3 = 4 (3 felé)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulDiv100G3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <MulDiv100G3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default MulDiv100G3Quiz;
