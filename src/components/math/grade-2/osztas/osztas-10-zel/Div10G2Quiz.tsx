import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div10G2Matcher } from './Div10G2Matcher';
import { Div10G2Sorter } from './Div10G2Sorter';
import { DIV10_FONT, DIV10_UNK, RodG, CoinG, EggBoxG, EggG, PlateG, RodsCubesG, CrateG, JumpLineG } from './Div10G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Caption: React.FC<{ y: number; children: React.ReactNode; color?: string }> = ({ y, children, color = '#334155' }) => (
  <text x="130" y={y} textAnchor="middle" fontSize="14" fontWeight="900" fill={color}>
    {children}
  </text>
);

/** n tízesrúd egy sorban. */
const RodsFig: React.FC<{ n: number; caption: string }> = ({ n, caption }) => {
  const gap = 20;
  const startX = 130 - ((n - 1) * gap) / 2 - 4;
  return (
    <QFig h={120}>
      {Array.from({ length: n }, (_, i) => (
        <RodG key={i} x={startX + i * gap} y={10} c={8} />
      ))}
      <Caption y={108}>{caption}</Caption>
    </QFig>
  );
};

/** „összeg = ? darab 10 Ft-os” */
const TargetCoinFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={84}>
    <text x="62" y="52" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0f172a">
      {total} Ft
    </text>
    <text x="122" y="52" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0f172a">
      =
    </text>
    <text x="160" y="53" textAnchor="middle" fontSize="28" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <text x="180" y="52" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      ·
    </text>
    <CoinG cx={212} cy={44} r={20} value={10} />
  </QFig>
);

/** 10 tányér vagy tolltartó „?”-lel, fölötte az összes. */
const TenSlotsFig: React.FC<{ caption: string; shape?: 'plate' | 'case' }> = ({ caption, shape = 'plate' }) => (
  <QFig h={120}>
    {Array.from({ length: 10 }, (_, i) => {
      const cx = 34 + (i % 5) * 48;
      const cy = 28 + Math.floor(i / 5) * 40;
      return shape === 'plate' ? (
        <PlateG key={i} cx={cx} cy={cy} r={16} label="?" labelColor={DIV10_UNK} />
      ) : (
        <g key={i}>
          <rect x={cx - 18} y={cy - 12} width="36" height="24" rx="8" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={DIV10_UNK}>
            ?
          </text>
        </g>
      );
    })}
    <Caption y={108}>{caption}</Caption>
  </QFig>
);

/** Számegyenes 0–100, tízes ugrásokkal. */
const JumpFig: React.FC<{ jumps: number; endLabel?: string }> = ({ jumps, endLabel = '?' }) => (
  <QFig h={90}>
    <JumpLineG x0={14} y={52} width={222} jumps={jumps} endLabel={endLabel} labelEvery={20} fontSize={11} />
  </QFig>
);

/** Nyíl: szám → művelet → ? */
const ArrowFig: React.FC<{ from: string; op: string }> = ({ from, op }) => (
  <QFig h={84}>
    <circle cx="50" cy="42" r="24" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
    <text x="50" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#134e4a">
      {from}
    </text>
    <line x1="80" y1="42" x2="172" y2="42" stroke="#0d9488" strokeWidth="3" />
    <path d="M 172 34 L 184 42 L 172 50 Z" fill="#0d9488" />
    <text x="128" y="32" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f766e">
      {op}
    </text>
    <circle cx="212" cy="42" r="24" fill="#fee2e2" stroke={DIV10_UNK} strokeWidth="2.5" />
    <text x="212" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
  </QFig>
);

/** Mérleg kijelzővel, a ládák letakarva. */
const ScaleFig: React.FC<{ kg: number }> = ({ kg }) => (
  <QFig h={140}>
    <rect x="70" y="104" width="150" height="8" rx="3" fill="#64748b" />
    <rect x="78" y="112" width="10" height="14" fill="#475569" />
    <rect x="202" y="112" width="10" height="14" fill="#475569" />
    <rect x="12" y="18" width="52" height="28" rx="4" fill="#1e293b" />
    <text x="38" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill="#4ade80">
      {kg} kg
    </text>
    <line x1="38" y1="46" x2="74" y2="104" stroke="#475569" strokeWidth="3" />
    <path d="M 96 104 Q 92 40 145 30 Q 198 40 194 104 Z" fill="#a7f3d0" stroke="#047857" strokeWidth="2" />
    <text x="145" y="80" textAnchor="middle" fontSize="30" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <CrateG x={198} y={40} s={0.9} />
    <text x="223" y="76" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
      1 láda
    </text>
  </QFig>
);

/** Rudak és kockák, opcionális felirat. */
const RodsCubesFig: React.FC<{ tens: number; ones: number; caption?: string }> = ({ tens, ones, caption }) => {
  const c = 8;
  const gap = 15;
  const w = tens * gap + (ones > 0 ? c * 0.6 + 2 * (c + 2) : 0);
  const h = caption ? 120 : 100;
  return (
    <QFig h={h}>
      <RodsCubesG x={130 - w / 2} y={10} tens={tens} ones={ones} c={c} gap={gap} />
      {caption && <Caption y={h - 10}>{caption}</Caption>}
    </QFig>
  );
};

/** Szám és két üres doboz („Ennyi csoport”, „Ennyi maradt”). */
const RemBoxFig: React.FC<{ n: number; unit: string }> = ({ n, unit }) => (
  <QFig h={104}>
    <rect x="14" y="20" width="86" height="64" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
    <text x="57" y="56" textAnchor="middle" fontSize="28" fontWeight="900" fill="#134e4a">
      {n}
    </text>
    <text x="57" y="76" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">
      {unit}
    </text>
    <text x="112" y="40" fontSize="12" fontWeight="900" fill="#334155">
      Ennyi csoport:
    </text>
    <rect x="206" y="22" width="34" height="26" rx="6" fill="#fee2e2" stroke={DIV10_UNK} strokeWidth="2" />
    <text x="223" y="41" textAnchor="middle" fontSize="16" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <text x="112" y="76" fontSize="12" fontWeight="900" fill="#334155">
      Ennyi maradt:
    </text>
    <rect x="206" y="58" width="34" height="26" rx="6" fill="#fee2e2" stroke={DIV10_UNK} strokeWidth="2" />
    <text x="223" y="77" textAnchor="middle" fontSize="16" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
  </QFig>
);

/** Két kártya összehasonlítása. */
const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="14" y="16" width="96" height="46" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
    <text x="62" y="46" textAnchor="middle" fontSize="18" fontWeight="900" fill="#134e4a">
      {left}
    </text>
    <circle cx="130" cy="39" r="15" fill="#fee2e2" stroke={DIV10_UNK} strokeWidth="2" />
    <text x="130" y="45" textAnchor="middle" fontSize="16" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <rect x="150" y="16" width="96" height="46" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="198" y="46" textAnchor="middle" fontSize="18" fontWeight="900" fill="#78350f">
      {right}
    </text>
  </QFig>
);

/** 1 db 50 Ft-os = ? db 10 Ft-os */
const CoinSwapFig: React.FC = () => (
  <QFig h={90}>
    <CoinG cx={56} cy={44} r={28} value={50} />
    <text x="112" y="54" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">
      =
    </text>
    <text x="152" y="56" textAnchor="middle" fontSize="28" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <text x="172" y="54" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      ·
    </text>
    <CoinG cx={208} cy={44} r={20} value={10} />
  </QFig>
);

/** Tele tartók és néhány külön tojás. */
const EggsFig: React.FC<{ boxes: number; loose: number }> = ({ boxes, loose }) => {
  const perRow = boxes > 4 ? Math.ceil(boxes / 2) : boxes;
  const rows = boxes > 4 ? 2 : 1;
  const bw = 46;
  const totalW = perRow * (bw + 6) + 14 + Math.ceil(loose / 2) * 13;
  const startX = 130 - totalW / 2;
  const h = rows * 32 + 22;
  return (
    <QFig h={h}>
      {Array.from({ length: boxes }, (_, i) => (
        <EggBoxG key={i} x={startX + (i % perRow) * (bw + 6)} y={12 + Math.floor(i / perRow) * 32} s={bw / 60} />
      ))}
      {Array.from({ length: loose }, (_, i) => (
        <EggG key={i} cx={startX + perRow * (bw + 6) + 14 + Math.floor(i / 2) * 13} cy={22 + (i % 2) * 14} s={1.05} />
      ))}
    </QFig>
  );
};

/** Táblázat: felső és alsó sor. */
const TableFig: React.FC<{ top: string; bottom: string; cols: [string, string][] }> = ({ top, bottom, cols }) => {
  const cw = 46;
  const lw = 66;
  const startX = 130 - (lw + cols.length * cw) / 2;
  return (
    <QFig h={100}>
      <rect x={startX} y="14" width={lw} height="34" fill="#ccfbf1" stroke="#0d9488" />
      <rect x={startX} y="48" width={lw} height="34" fill="#ccfbf1" stroke="#0d9488" />
      <text x={startX + lw / 2} y="36" textAnchor="middle" fontSize="12" fontWeight="900" fill="#134e4a">
        {top}
      </text>
      <text x={startX + lw / 2} y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#134e4a">
        {bottom}
      </text>
      {cols.map(([a, b], i) => (
        <g key={i}>
          <rect x={startX + lw + i * cw} y="14" width={cw} height="34" fill="#fff" stroke="#0d9488" />
          <rect x={startX + lw + i * cw} y="48" width={cw} height="34" fill="#fff" stroke="#0d9488" />
          <text x={startX + lw + i * cw + cw / 2} y="38" textAnchor="middle" fontSize="17" fontWeight="900" fill={a === '?' ? DIV10_UNK : '#0f172a'}>
            {a}
          </text>
          <text x={startX + lw + i * cw + cw / 2} y="72" textAnchor="middle" fontSize="17" fontWeight="900" fill={b === '?' ? DIV10_UNK : '#0f172a'}>
            {b}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** n pötty tízes sorokban; az első `groups` sor bekarikázva. */
const DotsGroupsFig: React.FC<{ n: number; groups: number }> = ({ n, groups }) => {
  const rows = Math.ceil(n / 10);
  const h = rows * 20 + 24;
  return (
    <QFig h={h}>
      {Array.from({ length: groups }, (_, r) => (
        <rect key={r} x="32" y={10 + r * 20} width="196" height="18" rx="9" fill="none" stroke="#0d9488" strokeWidth="2" />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const r = Math.floor(i / 10);
        return (
          <circle
            key={i}
            cx={44 + (i % 10) * 19}
            cy={19 + r * 20}
            r="6"
            fill={r < groups ? '#facc15' : '#fb923c'}
            stroke="#92400e"
            strokeWidth="1"
          />
        );
      })}
    </QFig>
  );
};

/** Számolólánc: start → op1 → op2 → ? */
const ChainFig: React.FC<{ start: string; ops: string[] }> = ({ start, ops }) => {
  const step = 208 / ops.length;
  return (
    <QFig h={90}>
      {Array.from({ length: ops.length + 1 }, (_, i) => {
        const cx = 26 + i * step;
        const label = i === 0 ? start : i === ops.length ? '?' : '';
        return (
          <g key={i}>
            <circle cx={cx} cy="50" r="20" fill={label === '?' ? '#fee2e2' : '#ccfbf1'} stroke={label === '?' ? DIV10_UNK : '#0d9488'} strokeWidth="2.5" />
            <text x={cx} y="57" textAnchor="middle" fontSize="18" fontWeight="900" fill={label === '?' ? DIV10_UNK : '#134e4a'}>
              {label}
            </text>
          </g>
        );
      })}
      {ops.map((op, i) => {
        const a = 26 + i * step + 22;
        const b = 26 + (i + 1) * step - 24;
        return (
          <g key={op + i}>
            <line x1={a} y1="50" x2={b - 6} y2="50" stroke="#0d9488" strokeWidth="2.5" />
            <path d={`M ${b - 6} 44 L ${b + 2} 50 L ${b - 6} 56 Z`} fill="#0d9488" />
            <text x={(a + b) / 2} y="36" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f766e">
              {op}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Két összeg két gyereknél. */
const TwoAmountsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={96}>
    <text x="70" y="26" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f766e">
      Anna
    </text>
    <rect x="22" y="34" width="96" height="44" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
    <text x="70" y="64" textAnchor="middle" fontSize="22" fontWeight="900" fill="#134e4a">
      {a} Ft
    </text>
    <text x="190" y="26" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b45309">
      Bence
    </text>
    <rect x="142" y="34" width="96" height="44" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="190" y="64" textAnchor="middle" fontSize="22" fontWeight="900" fill="#78350f">
      {b} Ft
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV10_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'div10g2-q1',
    level: 1,
    questionTypeBadge: 'Tízesrudak',
    figure: <RodsFig n={5} caption="50 kocka" />,
    question: '50 kockát tízesével rudakba kötöttünk. Hány rúd lett?',
    options: ['5', '40', '6', '50'],
    correctAnswer: 0,
    explanation: 'Számold meg a rudakat: 5. 50 : 10 = 5, mert 5 · 10 = 50.'
  },
  {
    id: 'div10g2-q2',
    level: 1,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 70 : 10?',
    options: ['7', '60', '8', '70'],
    correctAnswer: 0,
    explanation: 'A 70-ben 7 tízes van. 70 : 10 = 7, mert 7 · 10 = 70.'
  },
  {
    id: 'div10g2-q3',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <TargetCoinFig total={80} />,
    question: '80 Ft-ot 10 Ft-osokban kapsz. Hány érme lesz?',
    options: ['8', '80', '70', '10'],
    correctAnswer: 0,
    explanation: '80 : 10 = 8. Nyolc 10 Ft-os éppen 80 Ft.'
  },
  {
    id: 'div10g2-q4',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <TenSlotsFig caption="20 keksz, 10 tányér" />,
    question: '20 kekszet 10 tányérra teszünk egyformán. Mennyi jut egy tányérra?',
    options: ['2', '10', '18', '1'],
    correctAnswer: 0,
    explanation: '20 : 10 = 2, mert 2 · 10 = 20. Minden tányérra 2 keksz jut.'
  },
  {
    id: 'div10g2-q5',
    level: 1,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpFig jumps={6} endLabel="60" />,
    question: 'Tízesével ugrálsz. Hány ugrással érsz a 60-ra?',
    options: ['6', '60', '5', '50'],
    correctAnswer: 0,
    explanation: 'Számold meg az íveket: 6. 60 : 10 = 6.'
  },
  {
    id: 'div10g2-q6',
    level: 1,
    questionTypeBadge: 'Száz',
    figure: <RodsFig n={10} caption="100 kocka" />,
    question: 'Mennyi 100 : 10?',
    options: ['10', '90', '1', '100'],
    correctAnswer: 0,
    explanation: 'A 100-ban 10 tízes van. 100 : 10 = 10.'
  },
  {
    id: 'div10g2-q7',
    level: 1,
    questionTypeBadge: 'Tíz per tíz',
    question: 'Mennyi 10 : 10?',
    options: ['1', '0', '10', '20'],
    correctAnswer: 0,
    explanation: 'A 10-ben egyszer van meg a 10. 10 : 10 = 1.'
  },
  {
    id: 'div10g2-q8',
    level: 1,
    questionTypeBadge: 'Tizede',
    figure: <ArrowFig from="40" op=": 10" />,
    question: 'Mennyi a 40 tizede?',
    options: ['4', '30', '14', '40'],
    correctAnswer: 0,
    explanation: 'Tizede: oszd 10-zel. 40 : 10 = 4.'
  },
  {
    id: 'div10g2-q9',
    level: 1,
    questionTypeBadge: 'Szorzás segít',
    question: 'Melyik szorzás segít? 90 : 10 = ?',
    options: ['9 · 10 = 90', '90 − 10 = 80', '10 + 9 = 19', '8 · 10 = 80'],
    correctAnswer: 0,
    explanation: '9 · 10 = 90, ezért 90 : 10 = 9.'
  },
  {
    id: 'div10g2-q10',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: <ScaleFig kg={50} />,
    question: 'A mérleg 50 kg-ot mutat. Egy láda 10 kg. Hány láda van rajta?',
    options: ['5', '40', '50', '10'],
    correctAnswer: 0,
    explanation: '50 : 10 = 5, mert 5 · 10 = 50. 5 láda van a mérlegen.'
  },

  // ---------- 2. szint ----------
  {
    id: 'div10g2-q11',
    level: 2,
    questionTypeBadge: 'Csoport és maradék',
    figure: <RodsCubesFig tens={3} ones={4} />,
    question: '34 kockát kötöttünk össze tízesével. Hány csoport lett, és mennyi maradt?',
    options: ['3 csoport, maradt 4', '4 csoport, maradt 3', '3 csoport, maradt 0', '2 csoport, maradt 14'],
    correctAnswer: 0,
    explanation: '3 rúd = 30 kocka. 34 − 30 = 4 maradt. Ellenőrzés: 3 · 10 + 4 = 34.'
  },
  {
    id: 'div10g2-q12',
    level: 2,
    questionTypeBadge: 'Tojások tartóba',
    figure: <RemBoxFig n={58} unit="tojás" />,
    question: '58 tojást pakolunk tartókba, egybe 10 fér. Hány tartó lesz tele, és mennyi marad?',
    options: ['5 tartó, maradt 8', '8 tartó, maradt 5', '5 tartó, maradt 3', '4 tartó, maradt 18'],
    correctAnswer: 0,
    explanation: 'Az 58-ban 5 tízes és 8 egyes van. 5 tartó tele, 8 tojás marad: 5 · 10 + 8 = 58.'
  },
  {
    id: 'div10g2-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="60 : 10" right="5" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '60 : 10 = 6. A 6 nagyobb, mint 5, ezért 60 : 10 > 5.'
  },
  {
    id: 'div10g2-q14',
    level: 2,
    questionTypeBadge: 'Melyik igaz?',
    question: 'Melyik osztás igaz?',
    options: ['30 : 10 = 3', '40 : 10 = 3', '80 : 10 = 70', '50 : 10 = 6'],
    correctAnswer: 0,
    explanation: 'Ellenőrizd szorzással: 3 · 10 = 30. A többi rossz: 40 : 10 = 4, 80 : 10 = 8, 50 : 10 = 5.'
  },
  {
    id: 'div10g2-q15',
    level: 2,
    questionTypeBadge: 'Felváltás',
    figure: <CoinSwapFig />,
    question: 'Egy 50 Ft-ost felváltasz 10 Ft-osokra. Hányat kapsz?',
    options: ['5', '50', '10', '40'],
    correctAnswer: 0,
    explanation: '50 : 10 = 5. Öt 10 Ft-os ugyanannyi, mint egy 50 Ft-os.'
  },
  {
    id: 'div10g2-q16',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    figure: <EggsFig boxes={7} loose={2} />,
    question: '7 tartó lett tele, és 2 tojás maradt. Melyik a jó ellenőrzés?',
    options: ['7 · 10 + 2 = 72', '7 + 10 + 2 = 19', '2 · 10 + 7 = 27', '7 · 10 − 2 = 68'],
    correctAnswer: 0,
    explanation: '7 tartóban 7 · 10 = 70 tojás van. Meg a 2 maradék: 70 + 2 = 72.'
  },
  {
    id: 'div10g2-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? □ : 10 = 8',
    options: ['80', '18', '8', '90'],
    correctAnswer: 0,
    explanation: '8 · 10 = 80, ezért 80 : 10 = 8.'
  },
  {
    id: 'div10g2-q18',
    level: 2,
    questionTypeBadge: 'Tizede táblázat',
    figure: (
      <TableFig
        top="szám"
        bottom="tizede"
        cols={[
          ['20', '2'],
          ['50', '5'],
          ['90', '?']
        ]}
      />
    ),
    question: 'Mennyi a 90 tizede?',
    options: ['9', '80', '90', '1'],
    correctAnswer: 0,
    explanation: 'A szabály: : 10. 90 : 10 = 9.'
  },
  {
    id: 'div10g2-q19',
    level: 2,
    questionTypeBadge: 'Tolltartók',
    figure: <TenSlotsFig caption="30 ceruza, 10 tolltartó" shape="case" />,
    question: '30 ceruzát 10 tolltartóba teszünk egyformán. Hány jut egybe?',
    options: ['3', '20', '10', '4'],
    correctAnswer: 0,
    explanation: '30 : 10 = 3, mert 3 · 10 = 30.'
  },
  {
    id: 'div10g2-q20',
    level: 2,
    questionTypeBadge: 'Nincs maradék',
    question: 'Melyik számnál nem marad semmi, ha tízesével csoportosítunk?',
    options: ['40', '45', '14', '41'],
    correctAnswer: 0,
    explanation: 'A 40-ben 4 tízes van, és 0 egyes. Ezért nem marad semmi.'
  },

  // ---------- 3. szint ----------
  {
    id: 'div10g2-q21',
    level: 3,
    questionTypeBadge: 'Hány csónak?',
    figure: <DotsGroupsFig n={34} groups={3} />,
    question: '34 gyerek csónakázik. Egy csónakba 10 fér. Hány csónak kell?',
    options: ['4', '3', '30', '5'],
    correctAnswer: 0,
    explanation: '3 csónak tele lesz, 4 gyerek marad. Nekik is kell egy csónak: 4 csónak kell.'
  },
  {
    id: 'div10g2-q22',
    level: 3,
    questionTypeBadge: 'Tojások',
    question: '85 tojás van. Egy tartóba 10 fér. Hány tartó lesz tele, és mennyi marad?',
    options: ['8 tartó, maradt 5', '5 tartó, maradt 8', '8 tartó, maradt 0', '7 tartó, maradt 15'],
    correctAnswer: 0,
    explanation: 'A 85-ben 8 tízes és 5 egyes van. Ellenőrzés: 8 · 10 + 5 = 85.'
  },
  {
    id: 'div10g2-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <ChainFig start="40" ops={['+ 20', ': 10']} />,
    question: 'A tálban 40 dió volt. Tettünk bele még 20-at. 10 mókus osztozik rajta egyformán. Mennyi jut egynek?',
    options: ['6', '5', '2', '50'],
    correctAnswer: 0,
    explanation: 'Előbb add össze: 40 + 20 = 60 dió. Aztán ossz: 60 : 10 = 6.'
  },
  {
    id: 'div10g2-q24',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <RodsCubesFig tens={6} ones={3} caption="6 csoport, maradt 3" />,
    question: '6 tízes csoport lett, és maradt 3 kocka. Hány kocka volt?',
    options: ['63', '36', '9', '60'],
    correctAnswer: 0,
    explanation: '6 · 10 = 60 kocka van a csoportokban. 60 + 3 = 63.'
  },
  {
    id: 'div10g2-q25',
    level: 3,
    questionTypeBadge: 'Felváltás',
    figure: <TwoAmountsFig a={70} b={30} />,
    question: 'Anna és Bence 10 Ft-osokra váltja a pénzét. Hány 10 Ft-osuk lesz együtt?',
    options: ['10', '100', '4', '7'],
    correctAnswer: 0,
    explanation: 'Anna: 70 : 10 = 7. Bence: 30 : 10 = 3. Együtt 7 + 3 = 10 érme.'
  },
  {
    id: 'div10g2-q26',
    level: 3,
    questionTypeBadge: 'Számolólánc',
    figure: <ChainFig start="5" ops={['· 10', ': 10']} />,
    question: 'Kezdd az 5-tel! Szorozd 10-zel, aztán oszd 10-zel! Mit kapsz?',
    options: ['5', '50', '1', '10'],
    correctAnswer: 0,
    explanation: '5 · 10 = 50. 50 : 10 = 5. Visszaértél az 5-höz!'
  },
  {
    id: 'div10g2-q27',
    level: 3,
    questionTypeBadge: 'Javítsd ki!',
    figure: <DotsGroupsFig n={47} groups={3} />,
    question: 'Zoli ezt írta: 47 korong → 3 csoport, maradt 17. Mi a helyes?',
    options: ['4 csoport, maradt 7', '3 csoport, maradt 17', '7 csoport, maradt 4', '4 csoport, maradt 17'],
    correctAnswer: 0,
    explanation: 'A 17-ből még egy tízes kijön. A maradék mindig kevesebb, mint 10: 4 · 10 + 7 = 47.'
  },
  {
    id: 'div10g2-q28',
    level: 3,
    questionTypeBadge: 'Melyik több?',
    figure: <CompareFig left="80 : 10" right="3 · 3" />,
    question: 'Melyik a több?',
    options: ['A jobb oldali', 'A bal oldali', 'Ugyanannyi'],
    correctAnswer: 0,
    explanation: 'Bal: 80 : 10 = 8. Jobb: 3 · 3 = 9. A 9 a több.'
  },
  {
    id: 'div10g2-q29',
    level: 3,
    questionTypeBadge: 'Hány tartó kell?',
    question: '63 tojás van. Egy tartóba 10 fér. Hány tartó kell, hogy minden tojás beférjen?',
    options: ['7', '6', '3', '60'],
    correctAnswer: 0,
    explanation: '6 tartó tele lesz, 3 tojás marad. Nekik is kell egy tartó: 7 tartó.'
  },
  {
    id: 'div10g2-q30',
    level: 3,
    questionTypeBadge: 'Ceruzák',
    question: '9 doboz ceruzánk van, mindegyikben 10. A ceruzákat 10 gyerek kapja egyformán. Mennyi jut egynek?',
    options: ['9', '90', '10', '80'],
    correctAnswer: 0,
    explanation: 'Előbb: 9 · 10 = 90 ceruza. Aztán: 90 : 10 = 9 ceruza jut egy gyereknek.'
  }
];

export const Div10G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-10-quiz"
    subtopicId="osztas-10-zel"
    title="9. Osztás 10-zel – Kvíz"
    subtitle="30 feladat 3 szinten: tízesével csoportosítás és szétosztás, tizede, pénz, maradékos osztás 10-zel."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV10_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 10-es bennfoglaló tábla',
        items: ['10 : 10 = 1, 20 : 10 = 2, 30 : 10 = 3', '40 : 10 = 4, 50 : 10 = 5, 60 : 10 = 6', '70 : 10 = 7, 80 : 10 = 8', '90 : 10 = 9, 100 : 10 = 10']
      },
      {
        title: 'Trükkök',
        items: ['Hány tízes van benne?', 'Szorzás segít: 7 · 10 = 70 → 70 : 10 = 7', 'Tizede = 10 egyenlő rész', 'Ellenőrizz szorzással!']
      },
      {
        title: 'Maradékos osztás',
        items: ['Köss össze tízesével!', '47: 4 csoport, maradt 7', 'Ellenőrzés: 4 · 10 + 7 = 47', 'A maradék kevesebb, mint 10!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Div10G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Div10G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Div10G2Quiz;
