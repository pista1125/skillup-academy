import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers100G3Matcher } from './Numbers100G3Matcher';
import { Numbers100G3Sorter } from './Numbers100G3Sorter';
import { CoinG } from './Numbers100G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const FONT = 'system-ui, Segoe UI, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Tízesrudak és egyeskockák. */
const BlocksFig: React.FC<{ t: number; e: number }> = ({ t, e }) => {
  const s = 9;
  const cubeCols = 5;
  const cx0 = 20 + t * 15 + 14;
  return (
    <QFig h={120}>
      {Array.from({ length: t }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => (
          <rect key={`${i}-${j}`} x={20 + i * 15} y={12 + j * s} width={s} height={s} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="0.6" />
        ))
      )}
      {Array.from({ length: e }, (_, i) => (
        <rect key={`c${i}`} x={cx0 + (i % cubeCols) * 13} y={12 + 90 - s - Math.floor(i / cubeCols) * 13} width={s + 1} height={s + 1} fill="#facc15" stroke="#854d0e" strokeWidth="0.6" />
      ))}
      <text x="120" y="114" textAnchor="middle" fontSize="10" fill="#475569">rúd = 10, kocka = 1</text>
    </QFig>
  );
};

/** Golyós számoló: kék = 10, sárga = 1. */
const AbacusFig: React.FC<{ t: number; e: number }> = ({ t, e }) => {
  const base = 118;
  return (
    <QFig h={150}>
      <line x1="90" y1={Math.max(6, base - 8 - Math.max(t, e, 9) * 10 - 6)} x2="90" y2={base} stroke="#334155" strokeWidth="2" />
      <line x1="150" y1={Math.max(6, base - 8 - Math.max(t, e, 9) * 10 - 6)} x2="150" y2={base} stroke="#334155" strokeWidth="2" />
      <rect x="60" y={base} width="120" height="6" fill="#1e3a8a" />
      {Array.from({ length: t }, (_, i) => (
        <circle key={`t${i}`} cx="90" cy={base - 5 - i * 9.5} r="4.6" fill="#38bdf8" stroke="#0369a1" />
      ))}
      {Array.from({ length: e }, (_, i) => (
        <circle key={`e${i}`} cx="150" cy={base - 5 - i * 9.5} r="4.6" fill="#facc15" stroke="#a16207" />
      ))}
      <circle cx="40" cy="138" r="4.6" fill="#38bdf8" stroke="#0369a1" />
      <text x="48" y="142" fontSize="10.5" fill="#334155">= 10</text>
      <circle cx="160" cy="138" r="4.6" fill="#facc15" stroke="#a16207" />
      <text x="168" y="142" fontSize="10.5" fill="#334155">= 1</text>
    </QFig>
  );
};

/** Számegyenes-részlet. */
const LineFig: React.FC<{
  lo: number;
  hi: number;
  tick: number;
  labels: number[];
  marks?: { v: number; text: string; color?: string; arrow?: boolean }[];
  h?: number;
}> = ({ lo, hi, tick, labels, marks = [], h = 90 }) => {
  const x0 = 18;
  const x1 = 222;
  const y = 50;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const n = Math.round((hi - lo) / tick);
  return (
    <QFig h={h}>
      <line x1={x0 - 6} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 16} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = lo + i * tick;
        const big = labels.includes(v) || v % 10 === 0;
        return <line key={i} x1={X(v)} y1={big ? y - 8 : y - 5} x2={X(v)} y2={big ? y + 8 : y + 5} stroke="#334155" strokeWidth={big ? 1.5 : 0.9} />;
      })}
      {labels.map((v) => (
        <text key={v} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{v}</text>
      ))}
      {marks.map((m, i) =>
        m.arrow ? (
          <g key={i}>
            <line x1={X(m.v)} y1={y - 30} x2={X(m.v)} y2={y - 11} stroke={m.color || UNK} strokeWidth="1.8" />
            <path d={`M ${X(m.v) - 4} ${y - 15} L ${X(m.v)} ${y - 9} L ${X(m.v) + 4} ${y - 15}`} fill="none" stroke={m.color || UNK} strokeWidth="1.8" />
            <text x={X(m.v)} y={y - 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill={m.color || UNK}>{m.text}</text>
          </g>
        ) : (
          <g key={i}>
            <circle cx={X(m.v)} cy={y} r="4" fill={m.color || UNK} />
            <text x={X(m.v)} y={y - 14} textAnchor="middle" fontSize="13" fontWeight="bold" fill={m.color || UNK}>{m.text}</text>
          </g>
        )
      )}
    </QFig>
  );
};

/** Százas tábla részlete: [sor, oszlop, szöveg, kiemelés]. */
const FragFig: React.FC<{ cells: [number, number, string, ('start' | 'q' | 'n')?][]; rows: number; cols: number; arrows?: string }> = ({ cells, rows, cols, arrows }) => {
  const S = Math.min(28, Math.floor(200 / cols), Math.floor(118 / rows));
  const w = cols * S;
  const x0 = (240 - w) / 2;
  const y0 = 12;
  const h = y0 + rows * S + (arrows ? 30 : 12);
  return (
    <QFig h={h}>
      {cells.map(([r, c, t, k], i) => (
        <g key={i}>
          <rect x={x0 + c * S} y={y0 + r * S} width={S} height={S} fill={k === 'start' ? '#fde68a' : k === 'q' ? '#fee2e2' : '#ffffff'} stroke="#64748b" strokeWidth="1" />
          <text x={x0 + c * S + S / 2} y={y0 + r * S + S / 2 + 4} textAnchor="middle" fontSize={S > 22 ? 11 : 9} fontWeight="bold" fill={k === 'q' ? UNK : '#1e293b'}>{t}</text>
        </g>
      ))}
      {arrows && (
        <text x="120" y={y0 + rows * S + 20} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">{arrows}</text>
      )}
    </QFig>
  );
};

/** A százas tábla néhány sora üresen: csak a kezdőszám és a sorok első száma látszik. */
const EmptyBoardFig: React.FC<{ start: number; note: string; rowFrom: number; rowTo: number }> = ({ start, note, rowFrom, rowTo }) => {
  const S = 21;
  const x0 = 15;
  const y0 = 10;
  const rows = rowTo - rowFrom + 1;
  return (
    <QFig h={y0 + rows * S + 30}>
      {Array.from({ length: rows * 10 }, (_, k) => {
        const r = Math.floor(k / 10);
        const c = k % 10;
        const n = (rowFrom + r) * 10 + c + 1;
        const show = n === start || c === 0;
        return (
          <g key={n}>
            <rect x={x0 + c * S} y={y0 + r * S} width={S} height={S} fill={n === start ? '#fde68a' : '#ffffff'} stroke="#94a3b8" strokeWidth="0.8" />
            {show && (
              <text x={x0 + c * S + S / 2} y={y0 + r * S + 14.5} textAnchor="middle" fontSize="10" fontWeight="bold" fill={n === start ? '#92400e' : '#64748b'}>{n}</text>
            )}
          </g>
        );
      })}
      <text x="120" y={y0 + rows * S + 20} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">{note}</text>
    </QFig>
  );
};

/** Pénztárca érmékkel. */
const PurseFig: React.FC<{ coins: number[] }> = ({ coins }) => {
  const perRow = coins.length > 4 ? 3 : coins.length;
  return (
    <QFig h={120}>
      <path d="M 40 30 Q 22 100 50 110 L 190 110 Q 218 100 200 30 Z" fill="#e9d5ff" stroke="#6b21a8" strokeWidth="2" />
      <path d="M 40 30 Q 120 16 200 30" fill="none" stroke="#6b21a8" strokeWidth="2" />
      {coins.map((v, i) => {
        const row = Math.floor(i / perRow);
        const inRow = Math.min(perRow, coins.length - row * perRow);
        const col = i % perRow;
        const cx = 120 + (col - (inRow - 1) / 2) * 42;
        const cy = coins.length > perRow ? 52 + row * 36 : 70;
        return <CoinG key={i} cx={cx} cy={cy} v={v} r={v >= 50 ? 18 : v >= 10 ? 16 : 13} />;
      })}
    </QFig>
  );
};

/** Korongok párokba rendezve. */
const DiscsFig: React.FC<{ n: number }> = ({ n }) => {
  const pairs = Math.floor(n / 2);
  const w = (pairs + (n % 2)) * 26;
  const x0 = 120 - w / 2 + 13;
  return (
    <QFig h={90}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + Math.floor(i / 2) * 26} cy={i % 2 === 0 ? 32 : 58} r="9" fill="#a78bfa" stroke="#5b21b6" />
      ))}
      <text x="120" y="82" textAnchor="middle" fontSize="10.5" fill="#475569">Párokba raktuk a korongokat.</text>
    </QFig>
  );
};

/** Számkártyák. */
const CardsFig: React.FC<{ digits: number[] }> = ({ digits }) => (
  <QFig h={80}>
    {digits.map((d, i) => {
      const x = 120 + (i - (digits.length - 1) / 2) * 50 - 18;
      return (
        <g key={i}>
          <rect x={x} y="16" width="36" height="48" rx="6" fill={['#fecaca', '#bbf7d0', '#bfdbfe', '#fbcfe8'][i % 4]} stroke="#475569" />
          <text x={x + 18} y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1e293b">{d}</text>
        </g>
      );
    })}
  </QFig>
);

/** Helyiérték-táblázat egy sorral. */
const PVFig: React.FC<{ s: string; t: string; e: string }> = ({ s, t, e }) => (
  <QFig h={84}>
    {[
      ['százas', '#ef4444', s, '#fee2e2'],
      ['tízes', '#3b82f6', t, '#dbeafe'],
      ['egyes', '#eab308', e, '#fef9c3']
    ].map(([name, col, v, bg], i) => (
      <g key={name}>
        <rect x={30 + i * 60} y="14" width="60" height="22" fill={col} />
        <text x={60 + i * 60} y="29" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{name}</text>
        <rect x={30 + i * 60} y="36" width="60" height="34" fill={bg} stroke="#94a3b8" />
        <text x={60 + i * 60} y="60" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">{v}</text>
      </g>
    ))}
  </QFig>
);

/** Érmék sorban (választék). */
const CoinRowFig: React.FC<{ coins: number[]; label?: string }> = ({ coins, label }) => (
  <QFig h={label ? 84 : 66}>
    {coins.map((v, i) => (
      <CoinG key={i} cx={120 + (i - (coins.length - 1) / 2) * 44} cy={33} v={v} r={17} />
    ))}
    {label && <text x="120" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">{label}</text>}
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBERS_100_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'n100g3-q1',
    level: 1,
    questionTypeBadge: 'Tízesek és egyesek',
    figure: <BlocksFig t={3} e={7} />,
    question: 'Melyik számot raktuk ki?',
    options: ['37', '73', '307', '36'],
    correctAnswer: 0,
    explanation: '3 rúd = 3 tízes, 7 kocka = 7 egyes. 3 t + 7 e = 37.'
  },
  {
    id: 'n100g3-q2',
    level: 1,
    questionTypeBadge: 'Bontás',
    question: 'Hogyan bontjuk fel a 64-et?',
    options: ['6 t + 4 e', '4 t + 6 e', '60 t + 4 e', '6 t + 40 e'],
    correctAnswer: 0,
    explanation: 'Az első jegy a tízes, a második az egyes: 64 = 6 t + 4 e = 60 + 4.'
  },
  {
    id: 'n100g3-q3',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Melyik szám a hetvenkettő?',
    options: ['72', '27', '702', '70'],
    correctAnswer: 0,
    explanation: 'Hetven = 7 tízes, kettő = 2 egyes. Így 72.'
  },
  {
    id: 'n100g3-q4',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={50} hi={60} tick={1} labels={[50, 55, 60]} marks={[{ v: 58, text: '?', arrow: true }]} />,
    question: 'Melyik számot mutatja a nyíl?',
    options: ['58', '57', '52', '59'],
    correctAnswer: 0,
    explanation: 'Az 55-től jobbra számolj: 56, 57, 58. A nyíl az 58-nál van.'
  },
  {
    id: 'n100g3-q5',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={54} hi={62} tick={1} labels={[54, 62]} marks={[{ v: 58, text: '58', color: '#2563eb' }, { v: 59, text: '?', arrow: true }]} />,
    question: 'Mi az 58 nagyobb egyes szomszédja?',
    options: ['59', '57', '60', '68'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszéd 1-gyel nagyobb: 58 + 1 = 59.'
  },
  {
    id: 'n100g3-q6',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    figure: <DiscsFig n={9} />,
    question: 'Itt 9 korong van. Páros vagy páratlan a 9?',
    options: ['páratlan', 'páros', 'páros is és páratlan is', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'Párokba rakva 1 korong kimarad. Ezért a 9 páratlan.'
  },
  {
    id: 'n100g3-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <PurseFig coins={[20, 20, 10]} />,
    question: 'Hány forint van a pénztárcában?',
    options: ['50 Ft', '40 Ft', '30 Ft', '52 Ft'],
    correctAnswer: 0,
    explanation: '20 + 20 = 40, és még 10: 40 + 10 = 50 Ft.'
  },
  {
    id: 'n100g3-q8',
    level: 1,
    questionTypeBadge: 'Százas tábla',
    figure: <FragFig rows={2} cols={3} cells={[[0, 0, '34'], [0, 1, '35'], [0, 2, '36'], [1, 0, '44'], [1, 1, '?', 'q'], [1, 2, '46']]} />,
    question: 'Ez a százas tábla egy darabja. Melyik szám kerül a ? helyére?',
    options: ['45', '55', '35', '54'],
    correctAnswer: 0,
    explanation: 'A 44 és a 46 között a 45 áll. A 35 alatt is 10-zel több van: 45.'
  },
  {
    id: 'n100g3-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legnagyobb szám?',
    options: ['74', '47', '70', '69'],
    correctAnswer: 0,
    explanation: 'Először a tízeseket nézd! A 74-ben 7 tízes van, ez a legtöbb. A 70-nél is 4-gyel nagyobb.'
  },
  {
    id: 'n100g3-q10',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <AbacusFig t={5} e={2} />,
    question: 'Melyik számot mutatja a golyós számoló?',
    options: ['52', '25', '7', '502'],
    correctAnswer: 0,
    explanation: '5 kék golyó = 5 tízes, 2 sárga = 2 egyes. Ez az 52.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'n100g3-q11',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <BlocksFig t={5} e={14} />,
    question: 'Itt 5 tízesrúd és 14 egyeskocka van. Melyik szám ez?',
    options: ['64', '514', '54', '19'],
    correctAnswer: 0,
    explanation: '14 kockából 10-et beváltunk 1 rúdra. Így 6 tízes és 4 egyes: 64.'
  },
  {
    id: 'n100g3-q12',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Mennyit ér? 16 e + 3 t',
    options: ['46', '163', '316', '19'],
    correctAnswer: 0,
    explanation: 'Vigyázz a sorrendre! 3 t = 30, 16 e = 16. 30 + 16 = 46.'
  },
  {
    id: 'n100g3-q13',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={0} hi={100} tick={5} labels={[0, 50, 100]} marks={[{ v: 65, text: '?', arrow: true }]} />,
    question: 'Itt 5-ösével vannak a vonalkák. Melyik számot mutatja a nyíl?',
    options: ['65', '60', '70', '75'],
    correctAnswer: 0,
    explanation: 'Az 50-től jobbra: 55, 60, 65. A nyíl a 65-nél van, félúton a 60 és a 70 között.'
  },
  {
    id: 'n100g3-q14',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={80} hi={90} tick={1} labels={[]} marks={[{ v: 83, text: '83', color: '#2563eb' }, { v: 80, text: '?', arrow: true }, { v: 90, text: '?', arrow: true }]} />,
    question: 'Mik a 83 tízes szomszédai?',
    options: ['80 és 90', '82 és 84', '70 és 80', '80 és 100'],
    correctAnswer: 0,
    explanation: 'A 83 a 80 és a 90 közé esik. Ez a két kerek tízes a tízes szomszédja.'
  },
  {
    id: 'n100g3-q15',
    level: 2,
    questionTypeBadge: 'Százas tábla',
    figure: <FragFig rows={3} cols={3} arrows="2-t lefelé" cells={[[0, 1, '47', 'start'], [1, 0, ''], [1, 1, ''], [1, 2, ''], [2, 1, '?', 'q']]} />,
    question: 'Indulj a 47-ről. Lépj 2-t lefelé! Melyik számhoz érsz?',
    options: ['67', '49', '27', '57'],
    correctAnswer: 0,
    explanation: 'Lefelé lépve 10-zel nő a szám: 47 → 57 → 67.'
  },
  {
    id: 'n100g3-q16',
    level: 2,
    questionTypeBadge: 'Százas tábla',
    figure: <FragFig rows={3} cols={3} cells={[[0, 1, '28'], [1, 0, '37'], [1, 1, '?', 'q'], [1, 2, '39'], [2, 1, '48']]} />,
    question: 'Melyik szám kerül a ? helyére?',
    options: ['38', '29', '47', '36'],
    correctAnswer: 0,
    explanation: 'A 37 és a 39 között a 38 áll. Ellenőrzés: 28 + 10 = 38, és alatta 48.'
  },
  {
    id: 'n100g3-q17',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <PurseFig coins={[50, 20, 10, 5, 5]} />,
    question: 'Hány forint van a pénztárcában?',
    options: ['90 Ft', '85 Ft', '80 Ft', '95 Ft'],
    correctAnswer: 0,
    explanation: '50 + 20 + 10 = 80. A két 5 Ft együtt 10 Ft. 80 + 10 = 90 Ft.'
  },
  {
    id: 'n100g3-q18',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    figure: <PVFig s="1" t="0" e="0" />,
    question: 'Hány tízes van a 100-ban összesen?',
    options: ['10', '1', '0', '100'],
    correctAnswer: 0,
    explanation: 'A 100 egy százas. Egy százas = 10 tízes. (A tízesek helyén 0 áll, de a százas 10 tízesből áll!)'
  },
  {
    id: 'n100g3-q19',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig digits={[4, 0, 7]} />,
    question: 'Mi a legnagyobb kétjegyű szám, amit 2 kártyából kirakhatsz?',
    options: ['74', '70', '47', '740'],
    correctAnswer: 0,
    explanation: 'A legnagyobb jegy, a 7 kerüljön a tízesek helyére, a 4 az egyesekhez: 74.'
  },
  {
    id: 'n100g3-q20',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik szám páros?',
    options: ['56', '65', '37', '91'],
    correctAnswer: 0,
    explanation: 'Nézd az utolsó jegyet! Az 56 végén 6 áll, ez páros. A többi végén 5, 7, 1 áll.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'n100g3-q21',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <LineFig lo={60} hi={70} tick={1} labels={[60, 70]} />,
    question: 'Gondoltam egy számra. A tízes szomszédai 60 és 70. Páros. Az egyesek helyén nagyobb jegy áll, mint a tízesek helyén. Melyik ez?',
    options: ['68', '66', '67', '86'],
    correctAnswer: 0,
    explanation: 'A szám 6-tal kezdődik. Az egyes jegy 6-nál nagyobb: 7, 8 vagy 9. Ebből páros csak a 8. A szám: 68.'
  },
  {
    id: 'n100g3-q22',
    level: 3,
    questionTypeBadge: 'Százas tábla',
    figure: <EmptyBoardFig start={63} rowFrom={3} rowTo={6} note="3-at jobbra, aztán 2-t felfelé" />,
    question: 'Indulj a 63-ról. Lépj 3-at jobbra, majd 2-t felfelé! Hová érsz?',
    options: ['46', '86', '43', '56'],
    correctAnswer: 0,
    explanation: 'Jobbra: 64, 65, 66. Felfelé 10-zel kisebb lesz: 56, 46.'
  },
  {
    id: 'n100g3-q23',
    level: 3,
    questionTypeBadge: 'Százas tábla',
    figure: <EmptyBoardFig start={75} rowFrom={4} rowTo={7} note="? → 2-t balra → 3-at lefelé → 75" />,
    question: 'Valahonnan 2-t léptél balra, aztán 3-at lefelé. A 75-höz értél. Honnan indultál?',
    options: ['47', '43', '45', '57'],
    correctAnswer: 0,
    explanation: 'Lépj visszafelé! 3-at felfelé: 65, 55, 45. Aztán 2-t jobbra: 46, 47.'
  },
  {
    id: 'n100g3-q24',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Melyik a legkisebb kétjegyű páratlan szám?',
    options: ['11', '10', '13', '1'],
    correctAnswer: 0,
    explanation: 'A legkisebb kétjegyű szám a 10, de az páros. A következő, a 11 páratlan.'
  },
  {
    id: 'n100g3-q25',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Melyik a legnagyobb kétjegyű páros szám?',
    options: ['98', '99', '100', '88'],
    correctAnswer: 0,
    explanation: 'A legnagyobb kétjegyű szám a 99, de az páratlan. Előtte a 98 páros. A 100 már háromjegyű.'
  },
  {
    id: 'n100g3-q26',
    level: 3,
    questionTypeBadge: 'Beváltás',
    question: 'Mennyit ér? 4 t + 37 e',
    options: ['77', '437', '47', '41'],
    correctAnswer: 0,
    explanation: '4 t = 40. 40 + 37 = 77. (A 37 egyesben 3 tízes van, így 7 tízes és 7 egyes lesz.)'
  },
  {
    id: 'n100g3-q27',
    level: 3,
    questionTypeBadge: 'Páros, páratlan',
    figure: <LineFig lo={20} hi={30} tick={1} labels={[20, 30]} />,
    question: 'Hány páros szám van a 20 és a 30 között? (A 20 és a 30 nem számít.)',
    options: ['4', '5', '6', '10'],
    correctAnswer: 0,
    explanation: 'A 20 és 30 között: 22, 24, 26, 28. Ez 4 szám.'
  },
  {
    id: 'n100g3-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <CoinRowFig coins={[5, 10, 20, 50]} label="Ilyen érméid vannak." />,
    question: 'Melyik érmékkel fizethetsz pontosan 65 Ft-ot?',
    options: ['50 + 10 + 5', '50 + 20 + 5', '20 + 20 + 20', '50 + 10 + 10'],
    correctAnswer: 0,
    explanation: '50 + 10 = 60, és még 5: 65 Ft. A többi: 75, 60 és 70 Ft.'
  },
  {
    id: 'n100g3-q29',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={70} hi={80} tick={1} labels={[70, 80]} marks={[{ v: 76, text: '76', color: '#2563eb' }]} />,
    question: 'Egy szám kisebb tízes szomszédja 70. A nagyobb egyes szomszédja 76. Melyik ez a szám?',
    options: ['75', '77', '76', '65'],
    correctAnswer: 0,
    explanation: 'A nagyobb egyes szomszéd 1-gyel több. Így a szám 76 − 1 = 75. A 75 a 70 és a 80 között van.'
  },
  {
    id: 'n100g3-q30',
    level: 3,
    questionTypeBadge: 'Beváltás',
    figure: <AbacusFig t={3} e={12} />,
    question: 'A golyós számolón 3 kék és 12 sárga golyó van. Melyik szám ez?',
    options: ['42', '312', '15', '32'],
    correctAnswer: 0,
    explanation: '3 kék = 30. 12 sárga = 12. 30 + 12 = 42.'
  }
];

export const Numbers100G3Quiz: React.FC<{
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
      topicId="g3-c100-szamok-quiz"
      subtopicId="szamok-100-ig"
      title="1. Számok 100-ig – Kvíz"
      subtitle="30 feladat 3 szinten: tízesek és egyesek, százas tábla, számegyenes, számszomszédok, páros és páratlan."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={NUMBERS_100_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesek és egyesek',
          items: ['46 = 4 t + 6 e = 40 + 6', '10 egyes = 1 tízes', '10 tízes = 1 százas = 100', '2 t + 15 e = 20 + 15 = 35']
        },
        {
          title: 'Százas tábla',
          items: ['jobbra: +1', 'balra: −1', 'lefelé: +10', 'felfelé: −10']
        },
        {
          title: 'Szomszédok, páros',
          items: ['63 egyes szomszédai: 62 és 64', '63 tízes szomszédai: 60 és 70', 'Páros szám vége: 0, 2, 4, 6, 8', 'Páratlan szám vége: 1, 3, 5, 7, 9']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers100G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers100G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers100G3Quiz;
