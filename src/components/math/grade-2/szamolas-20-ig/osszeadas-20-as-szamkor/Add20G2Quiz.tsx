import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Add20G2Matcher } from './Add20G2Matcher';
import { Add20G2Sorter } from './Add20G2Sorter';
import { ADD20_FONT, TwentyFramePart, TwoRowBeadsPart } from './Add20G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 130 }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[300px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={ADD20_FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 2 × 10-es keret kérdéshez. */
const FrameFig: React.FC<{
  first: number;
  second: number;
  qSlots?: number;
  caption?: string;
}> = ({ first, second, qSlots = 0, caption }) => (
  <QFig h={caption ? 105 : 84}>
    <TwentyFramePart
      x={23}
      y={14}
      cell={21}
      firstCount={first}
      secondCount={second}
      highlightTenRow={first + second >= 10}
      questionMarkSlots={qSlots}
    />
    {caption && (
      <text x="130" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        {caption}
      </text>
    )}
  </QFig>
);

/** Kétsoros golyós számoló kérdéshez. */
const BeadsFig: React.FC<{ top: number; bottom: number }> = ({ top, bottom }) => (
  <QFig h={105}>
    <TwoRowBeadsPart x={24} y={32} w={212} topCount={top} bottomCount={bottom} />
    <text x="130" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
      {top} piros + {bottom} kék = ?
    </text>
  </QFig>
);

/** Analógia két korongsorral. */
const AnalogyFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const dx = 14;
  return (
    <QFig h={112}>
      <text x="16" y="34" fontSize="13" fontWeight="bold" fill="#0f172a">
        {a} + {b} = {a + b}
      </text>
      {Array.from({ length: a }, (_, i) => (
        <circle key={`a${i}`} cx={128 + i * dx} cy={29} r="5.2" fill="#f59e0b" stroke="#92400e" />
      ))}
      {Array.from({ length: b }, (_, i) => (
        <circle key={`b${i}`} cx={128 + a * dx + 6 + i * dx} cy={29} r="5.2" fill="#0d9488" stroke="#115e59" />
      ))}

      <line x1="14" y1="50" x2="246" y2="50" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="16" y="76" fontSize="13" fontWeight="bold" fill="#1d4ed8">
        1{a} + {b} = <tspan fill={UNK}>?</tspan>
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={`t${i}`} cx={128 + (i % 5) * 12} cy={65 + Math.floor(i / 5) * 14} r="4.5" fill="#ef4444" stroke="#991b1b" />
      ))}
      {Array.from({ length: a }, (_, i) => (
        <circle key={`c${i}`} cx={196 + i * 11} cy={66} r="4.5" fill="#f59e0b" stroke="#92400e" />
      ))}
      {Array.from({ length: b }, (_, i) => (
        <circle key={`d${i}`} cx={196 + i * 11} cy={80} r="4.5" fill="#0d9488" stroke="#115e59" />
      ))}
      <text x="130" y="102" textAnchor="middle" fontSize="10" fill="#475569">
        A 10-es marad, csak az egyesek változnak.
      </text>
    </QFig>
  );
};

/** 0–20 számegyenes kétugrásos ívvel vagy nyitott mondat jelöléssel. */
const NumberLineFig: React.FC<{
  start?: number;
  hop1?: number;
  hop2?: number;
  hop2Label?: string;
  endLabel?: string;
  rangeHighlight?: [number, number];
}> = ({ start, hop1, hop2, hop2Label, endLabel = '?', rangeHighlight }) => {
  const x0 = 16;
  const u = 11;
  const x = (v: number) => x0 + v * u;
  const y = 72;
  return (
    <QFig h={116}>
      <line x1={x(0) - 4} y1={y} x2={x(20) + 8} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x(20) + 8} ${y - 4} L ${x(20) + 14} ${y} L ${x(20) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: 21 }, (_, v) => (
        <line
          key={v}
          x1={x(v)}
          y1={v % 5 === 0 ? y - 7 : y - 4}
          x2={x(v)}
          y2={v % 5 === 0 ? y + 7 : y + 4}
          stroke={v === 10 ? '#16a34a' : '#334155'}
          strokeWidth={v % 10 === 0 ? 1.8 : 1}
        />
      ))}
      {[0, 5, 10, 15, 20].map((v) => (
        <text key={v} x={x(v)} y={y + 18} textAnchor="middle" fontSize="10" fontWeight="bold" fill={v === 10 ? '#15803d' : '#475569'}>
          {v}
        </text>
      ))}
      {start !== undefined && hop1 !== undefined && hop2 !== undefined && (
        <g>
          <circle cx={x(start)} cy={y} r="4" fill="#dc2626" />
          <text x={x(start)} y={y + 33} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#dc2626">{start}</text>
          <circle cx={x(start + hop1)} cy={y} r="4" fill="#16a34a" />
          <circle cx={x(start + hop1 + hop2)} cy={y} r="4.5" fill="#2563eb" />
          <path d={`M ${x(start)} ${y - 5} Q ${x(start + hop1 / 2)} ${y - 34} ${x(start + hop1)} ${y - 5}`} fill="none" stroke="#16a34a" strokeWidth="2" />
          <text x={x(start + hop1 / 2)} y={y - 26} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#15803d">
            +{hop1}
          </text>
          <path d={`M ${x(start + hop1)} ${y - 5} Q ${x(start + hop1 + hop2 / 2)} ${y - 38} ${x(start + hop1 + hop2)} ${y - 5}`} fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x={x(start + hop1 + hop2 / 2)} y={y - 28} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#1d4ed8">
            {hop2Label ?? `+${hop2}`}
          </text>
          <text x={x(start + hop1 + hop2)} y={y + 33} textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>
            {endLabel}
          </text>
        </g>
      )}
      {rangeHighlight && (
        <g>
          <line
            x1={x(rangeHighlight[0])}
            y1={y - 16}
            x2={x(rangeHighlight[1])}
            y2={y - 16}
            stroke="#9333ea"
            strokeWidth="3"
          />
          <circle cx={x(rangeHighlight[0])} cy={y} r="4" fill="#fff" stroke="#9333ea" strokeWidth="2" />
          <circle cx={x(rangeHighlight[1])} cy={y} r="4" fill="#fff" stroke="#9333ea" strokeWidth="2" />
          <text x={x(rangeHighlight[0])} y={y - 24} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">
            {rangeHighlight[0]}
          </text>
          <text x={x(rangeHighlight[1])} y={y - 24} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">
            {rangeHighlight[1]}
          </text>
          <text x={(x(rangeHighlight[0]) + x(rangeHighlight[1])) / 2} y={y - 26} textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>
            ●
          </text>
        </g>
      )}
    </QFig>
  );
};

/** Számpiramis 2 vagy 3 sorral. */
const PyramidFig: React.FC<{ rows: string[][] }> = ({ rows }) => {
  const bw = 54;
  const bh = 28;
  const gap = 6;
  const h = rows.length * (bh + 4) + 22;
  return (
    <QFig h={h}>
      {rows.map((row, r) => {
        const y = 12 + r * (bh + 4);
        const rowW = row.length * bw + (row.length - 1) * gap;
        const x0 = (260 - rowW) / 2;
        return row.map((val, c) => {
          const isQ = val === '?';
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x0 + c * (bw + gap)}
                y={y}
                width={bw}
                height={bh}
                rx="5"
                fill={isQ ? '#fee2e2' : r === 0 ? '#fef08a' : '#dbeafe'}
                stroke={isQ ? UNK : '#475569'}
                strokeWidth="1.5"
              />
              <text
                x={x0 + c * (bw + gap) + bw / 2}
                y={y + 20}
                textAnchor="middle"
                fontSize="15"
                fontWeight="bold"
                fill={isQ ? UNK : '#0f172a'}
              >
                {val}
              </text>
            </g>
          );
        });
      })}
    </QFig>
  );
};

/** Számkártyák. */
const CardsFig: React.FC<{ items: string[]; ops?: string[] }> = ({ items, ops }) => (
  <QFig h={76}>
    {items.map((txt, i) => {
      const total = items.length;
      const cx = 130 + (i - (total - 1) / 2) * 66;
      const isQ = txt === '?' || txt === '□';
      const opSymbol = ops ? ops[i] : '+';
      return (
        <g key={i}>
          <rect
            x={cx - 20}
            y="14"
            width="40"
            height="46"
            rx="7"
            fill={isQ ? '#fee2e2' : ['#fef3c7', '#dbeafe', '#dcfce7'][i % 3]}
            stroke={isQ ? UNK : '#475569'}
            strokeWidth="1.6"
          />
          <text x={cx} y="44" textAnchor="middle" fontSize="20" fontWeight="bold" fill={isQ ? UNK : '#0f172a'}>
            {txt}
          </text>
          {i < total - 1 && (
            <text x={cx + 33} y="43" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">
              {opSymbol}
            </text>
          )}
        </g>
      );
    })}
  </QFig>
);

/** Szabálytáblázat. */
const RuleTableFig: React.FC<{ top: string[]; bottom: string[]; ruleLabel: string }> = ({
  top,
  bottom,
  ruleLabel
}) => {
  const cw = 42;
  const x0 = 64;
  return (
    <QFig h={96}>
      <rect x="12" y="16" width="52" height="30" fill="#dbeafe" stroke="#64748b" />
      <text x="38" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">Be</text>
      <rect x="12" y="46" width="52" height="30" fill="#dcfce7" stroke="#64748b" />
      <text x="38" y="66" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">{ruleLabel}</text>
      {top.map((v, i) => {
        const isQ = bottom[i] === '?';
        return (
          <g key={i}>
            <rect x={x0 + i * cw} y="16" width={cw} height="30" fill="#ffffff" stroke="#64748b" />
            <text x={x0 + i * cw + cw / 2} y="36" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
              {v}
            </text>
            <rect x={x0 + i * cw} y="46" width={cw} height="30" fill={isQ ? '#fee2e2' : '#f8fafc'} stroke="#64748b" />
            <text
              x={x0 + i * cw + cw / 2}
              y="66"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={isQ ? UNK : '#15803d'}
            >
              {bottom[i]}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Mérleg kérdésábra. */
const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={102}>
    <polygon points="130,58 114,88 146,88" fill="#475569" />
    <line x1="36" y1="58" x2="224" y2="58" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" />
    <rect x="20" y="18" width="90" height="34" rx="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
    <text x="65" y="41" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">
      {left}
    </text>
    <rect x="150" y="18" width="90" height="34" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <text x="195" y="41" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
      {right}
    </text>
  </QFig>
);

/** 3×3 bűvös négyzet kérdéshez. */
const MagicFig: React.FC<{ grid: string[][]; sum: number }> = ({ grid, sum }) => {
  const S = 32;
  const X0 = 56;
  const Y0 = 14;
  return (
    <QFig h={124}>
      {grid.map((row, r) =>
        row.map((val, c) => {
          const isQ = val === '?';
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={X0 + c * S}
                y={Y0 + r * S}
                width={S}
                height={S}
                fill={isQ ? '#fee2e2' : '#ffffff'}
                stroke="#7e22ce"
                strokeWidth="1.4"
              />
              <text
                x={X0 + c * S + S / 2}
                y={Y0 + r * S + 22}
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill={isQ ? UNK : '#0f172a'}
              >
                {val}
              </text>
            </g>
          );
        })
      )}
      <circle cx="204" cy="62" r="24" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
      <text x="204" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b21a8">összeg</text>
      <text x="204" y="74" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#581c87">{sum}</text>
    </QFig>
  );
};

/** 3-tagú 20-as bontás oszlop. */
const Partition20Fig: React.FC<{ a: number; b: number; c: string }> = ({ a, b, c }) => (
  <QFig h={110}>
    {[
      ['Piros', String(a), '#fee2e2', '#991b1b'],
      ['Kék', String(b), '#dbeafe', '#1e3a8a'],
      ['Zöld', c, '#dcfce7', c === '?' ? UNK : '#14532d'],
      ['Összesen', '20', '#fef3c7', '#92400e']
    ].map(([lbl, val, bg, col], i) => (
      <g key={lbl}>
        <rect x={22 + i * 54} y="20" width="54" height="28" fill={bg} stroke="#64748b" />
        <text x={49 + i * 54} y="38" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">{lbl}</text>
        <rect x={22 + i * 54} y="48" width="54" height="36" fill="#ffffff" stroke="#64748b" />
        <text x={49 + i * 54} y="73" textAnchor="middle" fontSize="17" fontWeight="bold" fill={col}>{val}</text>
      </g>
    ))}
  </QFig>
);

// ---------------------------------------------------------------------------
// 30 kérdés (10 / szint)
// ---------------------------------------------------------------------------
export const ADD20_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'add20g2-q1',
    level: 1,
    questionTypeBadge: '10 + egyes',
    figure: <FrameFig first={10} second={4} caption="10 piros + 4 kék korong" />,
    question: 'Mennyi 10 + 4?',
    options: ['14', '41', '13', '15'],
    correctAnswer: 0,
    explanation: 'Az első sorban 10 korong van, a másodikban 4. Így 10 + 4 = 14.'
  },
  {
    id: 'add20g2-q2',
    level: 1,
    questionTypeBadge: 'Golyós számoló',
    figure: <BeadsFig top={10} bottom={8} />,
    question: 'Hány golyó van összesen a számolón?',
    options: ['18', '17', '19', '8'],
    correctAnswer: 0,
    explanation: 'Fent 10 piros, lent 8 kék golyó áll: 10 + 8 = 18.'
  },
  {
    id: 'add20g2-q3',
    level: 1,
    questionTypeBadge: 'Analógia',
    figure: <AnalogyFig a={3} b={5} />,
    question: 'Ha 3 + 5 = 8, mennyi 13 + 5?',
    options: ['18', '17', '19', '8'],
    correctAnswer: 0,
    explanation: 'A 10-es marad, csak az egyeseket adjuk össze: 3 + 5 = 8, így 13 + 5 = 18.'
  },
  {
    id: 'add20g2-q4',
    level: 1,
    questionTypeBadge: 'Tízesátlépés nélkül',
    question: 'Mennyi 12 + 6?',
    options: ['18', '16', '17', '19'],
    correctAnswer: 0,
    explanation: 'A 2 + 6 = 8 segít: 12 + 6 = 18.'
  },
  {
    id: 'add20g2-q5',
    level: 1,
    questionTypeBadge: 'Fordított egyenlet',
    figure: <CardsFig items={['□', '15', '4']} ops={['=', '+']} />,
    question: 'Melyik szám kerül a □ helyére? □ = 15 + 4',
    options: ['19', '11', '18', '20'],
    correctAnswer: 0,
    explanation: '15 + 4 = 19, mert 5 + 4 = 9. Tehát □ = 19.'
  },
  {
    id: 'add20g2-q6',
    level: 1,
    questionTypeBadge: 'Felcserélhetőség',
    question: 'Mennyi 2 + 17?',
    options: ['19', '18', '15', '20'],
    correctAnswer: 0,
    explanation: 'Cseréld fel a tagokat: 17 + 2 = 19.'
  },
  {
    id: 'add20g2-q7',
    level: 1,
    questionTypeBadge: '10-re pótlás',
    figure: <FrameFig first={9} second={4} caption="9 + 1 + 3 = ?" />,
    question: 'Nézd a 20-as keretet! Mennyi 9 + 1 + 3?',
    options: ['13', '12', '14', '11'],
    correctAnswer: 0,
    explanation: 'Előbb a 10-es sor telik meg: 9 + 1 = 10. Aztán 10 + 3 = 13.'
  },
  {
    id: 'add20g2-q8',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <NumberLineFig start={9} hop1={1} hop2={3} />,
    question: 'Hová érkezel, ha a 9-ről előbb 1-et, majd még 3-at ugrasz jobbra?',
    options: ['13', '12', '14', '10'],
    correctAnswer: 0,
    explanation: '9 + 1 = 10, majd 10 + 3 = 13. Tehát 9 + 4 = 13.'
  },
  {
    id: 'add20g2-q9',
    level: 1,
    questionTypeBadge: 'Hiányzó tag',
    question: 'Melyik szám hiányzik? 10 + □ = 17',
    options: ['7', '17', '6', '8'],
    correctAnswer: 0,
    explanation: 'A 17 egy tízesből és 7 egyesből áll: 10 + 7 = 17.'
  },
  {
    id: 'add20g2-q10',
    level: 1,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['?'], ['11', '5']]} />,
    question: 'Add össze a két alsó számot! Mi kerül felülre?',
    options: ['16', '15', '17', '6'],
    correctAnswer: 0,
    explanation: '11 + 5 = 16, mert 1 + 5 = 6.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'add20g2-q11',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    figure: <FrameFig first={7} second={5} caption="7 + 5 = 7 + 3 + 2" />,
    question: 'Számold ki 10-re pótlással: 7 + 5 = ?',
    options: ['12', '13', '11', '14'],
    correctAnswer: 0,
    explanation: '7 + 3 = 10, az 5-ből maradt 2. 10 + 2 = 12.'
  },
  {
    id: 'add20g2-q12',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <NumberLineFig start={8} hop1={2} hop2={4} hop2Label="+?" endLabel="14" />,
    question: 'A 8 + 6 összeadást így bontottuk: 8 + 2 + □ = 14. Mi kerül a □ helyére?',
    options: ['4', '6', '2', '5'],
    correctAnswer: 0,
    explanation: 'A 6-ból 2 kellett a 10-hez, így még 4 maradt: 8 + 2 + 4 = 14.'
  },
  {
    id: 'add20g2-q13',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    question: 'Mennyi 6 + 9?',
    options: ['15', '14', '16', '13'],
    correctAnswer: 0,
    explanation: 'Cseréld meg vagy pótold 10-re: 9 + 1 + 5 = 15 (vagy 6 + 4 + 5 = 15).'
  },
  {
    id: 'add20g2-q14',
    level: 2,
    questionTypeBadge: 'Hiányzó tag',
    figure: <FrameFig first={5} second={0} qSlots={8} caption="5 + ? = 13" />,
    question: 'A 20-as keretben 5 piros korong van. Hányat kell hozzátenni, hogy 13 legyen?',
    options: ['8', '7', '9', '5'],
    correctAnswer: 0,
    explanation: 'Az első sorba 5 kell a 10-hez, a másodikba még 3 a 13-hoz. 5 + 3 = 8.'
  },
  {
    id: 'add20g2-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó tag',
    question: 'Melyik szám kerül a □ helyére? □ + 7 = 16',
    options: ['9', '8', '7', '10'],
    correctAnswer: 0,
    explanation: '7 + 3 = 10, és 10 + 6 = 16. A hiányzó rész 3 + 6 = 9. Ellenőrzés: 9 + 7 = 16.'
  },
  {
    id: 'add20g2-q16',
    level: 2,
    questionTypeBadge: 'Három tag',
    figure: <CardsFig items={['4', '7', '6']} />,
    question: 'Add össze a három kártya számát! Mennyi 4 + 7 + 6?',
    options: ['17', '16', '18', '15'],
    correctAnswer: 0,
    explanation: 'Keresd a 10-es párt: 4 + 6 = 10, és 10 + 7 = 17.'
  },
  {
    id: 'add20g2-q17',
    level: 2,
    questionTypeBadge: 'Szabálytáblázat',
    figure: <RuleTableFig top={['6', '9', '12', '15']} bottom={['10', '13', '16', '?']} ruleLabel="+ 4" />,
    question: 'A táblázat szabálya: + 4. Melyik szám kerül a ? helyére?',
    options: ['19', '18', '20', '17'],
    correctAnswer: 0,
    explanation: 'A 15-höz 4-et adunk: 15 + 4 = 19.'
  },
  {
    id: 'add20g2-q18',
    level: 2,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['?'], ['7', '9'], ['3', '4', '5']]} />,
    question: 'Minden tégla az alatta lévő kettő összege. Mi kerül a csúcsba?',
    options: ['16', '15', '17', '14'],
    correctAnswer: 0,
    explanation: '3 + 4 = 7 és 4 + 5 = 9. A csúcsban: 7 + 9 = 16.'
  },
  {
    id: 'add20g2-q19',
    level: 2,
    questionTypeBadge: 'Műveletcsalád',
    question: 'A 8, a 7 és a 15 egy műveletcsaládba tartozik. Melyik állítás HAMIS?',
    options: ['8 + 7 = 16', '8 + 7 = 15', '7 + 8 = 15', '15 − 8 = 7'],
    correctAnswer: 0,
    explanation: '8 + 7 = 8 + 2 + 5 = 15, nem 16! A másik három igaz.'
  },
  {
    id: 'add20g2-q20',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Mennyi 7 + 6, és az összeg páros vagy páratlan?',
    options: ['13, páratlan', '13, páros', '14, páros', '12, páros'],
    correctAnswer: 0,
    explanation: '7 + 6 = 7 + 3 + 3 = 13. A 13 végén 3 áll, így páratlan.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'add20g2-q21',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    figure: <BalanceFig left="11 + 5" right="12 + ?" />,
    question: 'A mérleg egyensúlyban van. Mennyi a ? értéke?',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: 'A bal oldal: 11 + 5 = 16. A jobb oldal is 16 legyen: 12 + 4 = 16.'
  },
  {
    id: 'add20g2-q22',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Melyik szám teszi igazzá az egyenlőséget? 9 + 7 = 8 + □',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '9 + 7 = 16. A jobb oldalon 8 + 8 = 16, tehát □ = 8.'
  },
  {
    id: 'add20g2-q23',
    level: 3,
    questionTypeBadge: 'Bűvös négyzet',
    figure: (
      <MagicFig
        sum={15}
        grid={[
          ['8', '1', '6'],
          ['3', '5', '?'],
          ['4', '9', '2']
        ]}
      />
    ),
    question: 'Minden sorban, oszlopban és átlóban 15 az összeg. Mi hiányzik a ? helyéről?',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: 'A középső sor: 3 + 5 + ? = 15. Mivel 3 + 5 = 8, a ? helyére 7 kerül.'
  },
  {
    id: 'add20g2-q24',
    level: 3,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['19'], ['8', '11'], ['3', '5', '?']]} />,
    question: 'A téglák összeadásos piramist alkotnak. Melyik szám kerül a ? helyére?',
    options: ['6', '5', '7', '8'],
    correctAnswer: 0,
    explanation: 'A jobb oldali középső tégla 11, az alatta lévő bal tégla 5. 5 + 6 = 11, így ? = 6.'
  },
  {
    id: 'add20g2-q25',
    level: 3,
    questionTypeBadge: 'Sorozat',
    question: 'Folytasd a számsorozatot a szabály szerint: 2, 5, 8, 11, 14, □',
    options: ['17', '16', '18', '15'],
    correctAnswer: 0,
    explanation: 'A sorozat minden lépésben 3-mal nő: 14 + 3 = 17.'
  },
  {
    id: 'add20g2-q26',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <NumberLineFig rangeHighlight={[14, 17]} />,
    question: 'Melyik számok kerülhetnek a ● helyére? 8 + 6 < ● < 9 + 8',
    options: ['15 és 16', '14 és 15', '16 és 17', '14, 15, 16 és 17'],
    correctAnswer: 0,
    explanation: '8 + 6 = 14, és 9 + 8 = 17. A 14 és 17 közötti számok csak a 15 és a 16.'
  },
  {
    id: 'add20g2-q27',
    level: 3,
    questionTypeBadge: 'Húszas bontás',
    figure: <Partition20Fig a={6} b={9} c="?" />,
    question: 'Húsz darab színes golyónk van: 6 piros, 9 kék, a többi zöld. Hány zöld golyó van?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: '6 + 9 = 15 piros és kék golyó van. A 20-ig még 5 zöld golyó hiányzik.'
  },
  {
    id: 'add20g2-q28',
    level: 3,
    questionTypeBadge: 'Három tag',
    question: 'Melyik szám kerül a △ helyére? 6 + △ + 5 = 18',
    options: ['7', '6', '8', '9'],
    correctAnswer: 0,
    explanation: '6 + 5 = 11. Mivel 11 + 7 = 18, a △ = 7.'
  },
  {
    id: 'add20g2-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <CardsFig items={['6', '5', '4']} />,
    question: 'Nóri gyűjtött 6 piros, 5 kék és 4 sárga matricát. Hány matricája lett összesen?',
    options: ['15', '14', '16', '11'],
    correctAnswer: 0,
    explanation: 'Add össze ügyesen: 6 + 4 = 10, és 10 + 5 = 15 matrica.'
  },
  {
    id: 'add20g2-q30',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Két szám összege 17. Az egyik szám 9. Mennyi a másik szám?',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '9 + 1 = 10, és 10 + 7 = 17. Tehát 1 + 7 = 8 a másik szám (9 + 8 = 17).'
  }
];

export const Add20G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId="g2-c20-osszeadas20-quiz"
      subtopicId="osszeadas-20-as-szamkor"
      title="4. Összeadás 20-as számkör – Kvíz"
      subtitle="30 feladat 3 szinten: 10 + egyesek, kistesó-analógia, tízesátlépés, három tag és egyenletek."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • KVÍZ"
      questions={ADD20_G2_QUESTIONS}
      cheatSheets={[
        {
          title: '10 + egyes és kistesó',
          items: [
            '10 + 6 = 16, 6 + 10 = 16',
            '4 + 3 = 7 → 14 + 3 = 17',
            'A tagok felcserélhetők!',
            '□ = 15 + 4 ugyanaz, mint 15 + 4 = □'
          ]
        },
        {
          title: 'Tízesátlépés (10-re pótlás)',
          items: [
            '9 + 4 = 9 + 1 + 3 = 13',
            '8 + 5 = 8 + 2 + 3 = 13',
            '7 + 5 = 7 + 3 + 2 = 12',
            'Előbb töltsd fel a 10-et!'
          ]
        },
        {
          title: 'Három tag és mérleg',
          items: [
            'Keress 10-es párt: 4 + 7 + 6 = 10 + 7 = 17',
            'Mérlegnél a két oldal ugyanannyit ér',
            'Számpiramis: két alsó összege = felső',
            'Bűvös négyzet: sor = oszlop = átló'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Add20G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Add20G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Add20G2Quiz;
