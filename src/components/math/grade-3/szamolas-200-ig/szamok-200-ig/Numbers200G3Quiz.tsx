import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers200G3Matcher } from './Numbers200G3Matcher';
import { Numbers200G3Sorter } from './Numbers200G3Sorter';
import { FONT, HundredFlat, TenRod, OneCube, Coin, Abacus } from './Numbers200G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Százas lapok, tízesrudak, egyeskockák. */
const BlocksFig: React.FC<{ h: number; t: number; e: number }> = ({ h, t, e }) => {
  const s = 6;
  const rodX = 14 + h * 68;
  const cubeX = rodX + t * 10 + 8;
  return (
    <QFig h={100}>
      {Array.from({ length: h }, (_, i) => (
        <HundredFlat key={`h${i}`} x={14 + i * 68} y={12} s={s} />
      ))}
      {Array.from({ length: t }, (_, i) => (
        <TenRod key={`t${i}`} x={rodX + i * 10} y={12} s={s} />
      ))}
      {Array.from({ length: e }, (_, i) => (
        <OneCube key={`e${i}`} x={cubeX + (i % 4) * 11} y={63 - Math.floor(i / 4) * 11} s={8} />
      ))}
      <text x="120" y="90" textAnchor="middle" fontSize="10.5" fill="#475569">lap = 100, rúd = 10, kocka = 1</text>
    </QFig>
  );
};

/** Golyós számoló: piros = 100, kék = 10, sárga = 1. */
const AbacusFig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const m = Math.max(sz, t, e, 9);
  const beadH = m * 9.8 + 12;
  const top = 10;
  const H = top + beadH + 36;
  return (
    <QFig h={H}>
      <Abacus x={80} y={top} h={beadH} sz={sz} t={t} e={e} gap={40} />
      <g>
        <circle cx="196" cy={top + 14} r="4.6" fill="#ef4444" stroke="#991b1b" />
        <text x="204" y={top + 18} fontSize="10.5" fill="#334155">= 100</text>
        <circle cx="196" cy={top + 32} r="4.6" fill="#38bdf8" stroke="#0369a1" />
        <text x="204" y={top + 36} fontSize="10.5" fill="#334155">= 10</text>
        <circle cx="196" cy={top + 50} r="4.6" fill="#facc15" stroke="#a16207" />
        <text x="204" y={top + 54} fontSize="10.5" fill="#334155">= 1</text>
      </g>
      <text x="80" y={H - 10} textAnchor="middle" fontSize="10" fill="#991b1b">százas</text>
      <text x="120" y={H - 10} textAnchor="middle" fontSize="10" fill="#0369a1">tízes</text>
      <text x="160" y={H - 10} textAnchor="middle" fontSize="10" fill="#a16207">egyes</text>
    </QFig>
  );
};

/** Táblarészlet: [sor, oszlop, szöveg, kiemelés]. */
const FragFig: React.FC<{ cells: [number, number, string, ('start' | 'q' | 'n')?][]; rows: number; cols: number; note?: string }> = ({ cells, rows, cols, note }) => {
  const S = 30;
  const w = cols * S;
  const x0 = (240 - w) / 2;
  const y0 = 12;
  const h = y0 + rows * S + (note ? 30 : 12);
  const map = new Map(cells.map((c) => [`${c[0]}-${c[1]}`, c]));
  return (
    <QFig h={h}>
      {Array.from({ length: rows * cols }, (_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        const cell = map.get(`${r}-${c}`);
        const kind = cell?.[3];
        return (
          <g key={k}>
            <rect x={x0 + c * S} y={y0 + r * S} width={S} height={S} fill={kind === 'start' ? '#fde68a' : kind === 'q' ? '#fee2e2' : '#ffffff'} stroke="#64748b" strokeWidth="1" />
            {cell && (
              <text x={x0 + c * S + S / 2} y={y0 + r * S + S / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={kind === 'q' ? UNK : '#1e293b'}>{cell[2]}</text>
            )}
          </g>
        );
      })}
      {note && <text x="120" y={h - 12} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">{note}</text>}
    </QFig>
  );
};

/** Számkártyák sorban. A „?” piros. */
const CardsFig: React.FC<{ cards: string[]; sep?: string }> = ({ cards, sep = ',' }) => {
  const W = 46;
  const G = sep === ',' ? 10 : 22;
  const total = cards.length * W + (cards.length - 1) * G;
  const x0 = (240 - total) / 2;
  return (
    <QFig h={80}>
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * (W + G)} y="20" width={W} height="40" rx="7" fill={c === '?' ? '#fee2e2' : '#ecfdf5'} stroke={c === '?' ? UNK : '#059669'} strokeWidth="1.5" />
          <text x={x0 + i * (W + G) + W / 2} y="46" textAnchor="middle" fontSize="16" fontWeight="bold" fill={c === '?' ? UNK : '#064e3b'}>{c}</text>
          {i < cards.length - 1 && sep !== ',' && (
            <text x={x0 + i * (W + G) + W + G / 2} y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>{sep}</text>
          )}
        </g>
      ))}
    </QFig>
  );
};

/** Helyiérték-korongok: piros 100, kék 10, sárga 1. */
const ChipsFig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const chip = (cx: number, cy: number, v: string, fill: string, stroke: string, key: string) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r="10" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize={v === '100' ? 7.5 : 9} fontWeight="bold" fill="#1e293b">{v}</text>
    </g>
  );
  const items: React.ReactNode[] = [];
  Array.from({ length: sz }, (_, i) => items.push(chip(24, 26 + i * 24, '100', '#fca5a5', '#b91c1c', `s${i}`)));
  Array.from({ length: t }, (_, i) => items.push(chip(60 + (i % 4) * 22, 26 + Math.floor(i / 4) * 24, '10', '#7dd3fc', '#0369a1', `t${i}`)));
  Array.from({ length: e }, (_, i) => items.push(chip(160 + (i % 3) * 22, 26 + Math.floor(i / 3) * 24, '1', '#fde047', '#a16207', `e${i}`)));
  const rows = Math.max(sz, Math.ceil(t / 4), Math.ceil(e / 3), 1);
  return <QFig h={rows * 24 + 30}>{items}</QFig>;
};

/** Érmék sorban. */
const CoinsFig: React.FC<{ coins: number[] }> = ({ coins }) => {
  const step = Math.min(48, 210 / coins.length);
  const x0 = 120 - ((coins.length - 1) * step) / 2;
  return (
    <QFig h={80}>
      {coins.map((v, i) => (
        <Coin key={i} cx={x0 + i * step} cy={40} v={v} r={Math.min(v >= 100 ? 21 : v >= 50 ? 19 : v >= 20 ? 17 : 15, step / 2 - 1)} />
      ))}
    </QFig>
  );
};

/** Két pénztárca A és B jellel. */
const PursesFig: React.FC<{ a: number[]; b: number[] }> = ({ a, b }) => {
  const purse = (x: number, coins: number[], label: string) => (
    <g>
      <rect x={x} y="24" width="108" height="72" rx="16" fill="#f5d0fe" stroke="#86198f" strokeWidth="1.5" />
      <text x={x + 54} y="17" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#86198f">{label}</text>
      {coins.map((v, i) => (
        <Coin key={i} cx={x + 28 + (i % 2) * 52} cy={44 + Math.floor(i / 2) * 32} v={v} r={14} />
      ))}
    </g>
  );
  return (
    <QFig h={106}>
      {purse(8, a, 'A')}
      {purse(124, b, 'B')}
    </QFig>
  );
};

/** Helyiérték-táblázat egy sorral. */
const PlaceTableFig: React.FC<{ digits: [string, string, string] }> = ({ digits }) => {
  const W = 64;
  const X = 24;
  const heads: [string, string, string][] = [
    ['százas', '#ef4444', '#fee2e2'],
    ['tízes', '#3b82f6', '#dbeafe'],
    ['egyes', '#eab308', '#fef9c3']
  ];
  return (
    <QFig h={88}>
      {heads.map(([t, col, light], i) => (
        <g key={t}>
          <rect x={X + i * W} y="14" width={W} height="24" fill={col} />
          <text x={X + i * W + W / 2} y="31" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{t}</text>
          <rect x={X + i * W} y="38" width={W} height="36" fill={light} stroke="#94a3b8" />
          <text x={X + i * W + W / 2} y="63" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e293b">{digits[i]}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Szám, amelynek egy jegye be van keretezve. */
const DigitFig: React.FC<{ num: string; idx: number }> = ({ num, idx }) => {
  const W = 40;
  const x0 = 120 - (num.length * W) / 2;
  return (
    <QFig h={80}>
      {num.split('').map((d, i) => (
        <g key={i}>
          {i === idx && <rect x={x0 + i * W + 3} y="14" width={W - 6} height="50" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />}
          <text x={x0 + i * W + W / 2} y="53" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#1e293b">{d}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Számegyenes-részlet egyes beosztással. */
const LineFig: React.FC<{ lo: number; hi: number; labels: number[]; seg?: [number, number]; mark?: { v: number; text: string } }> = ({ lo, hi, labels, seg, mark }) => {
  const x0 = 20;
  const x1 = 214;
  const y = 46;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  return (
    <QFig h={82}>
      <line x1={x0 - 8} y1={y} x2={x1 + 12} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 12} ${y - 4} L ${x1 + 18} ${y} L ${x1 + 12} ${y + 4} Z`} fill="#334155" />
      {seg && <line x1={X(seg[0])} y1={y} x2={X(seg[1])} y2={y} stroke="#f97316" strokeWidth="6" strokeLinecap="butt" />}
      {Array.from({ length: hi - lo + 1 }, (_, i) => {
        const v = lo + i;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        return <line key={v} x1={X(v)} y1={big ? y - 9 : mid ? y - 7 : y - 5} x2={X(v)} y2={big ? y + 9 : mid ? y + 7 : y + 5} stroke="#334155" strokeWidth={big ? 1.6 : 1} />;
      })}
      {labels.map((v) => (
        <text key={v} x={X(v)} y={y + 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{v}</text>
      ))}
      {mark && (
        <g>
          <circle cx={X(mark.v)} cy={y} r="4" fill={UNK} />
          <text x={X(mark.v)} y={y - 14} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>{mark.text}</text>
        </g>
      )}
    </QFig>
  );
};

/** Lépéslánc: start → (első lépés) → □ → (második lépés) → ? */
const ChainFig: React.FC<{ start: string; a: string; b: string }> = ({ start, a, b }) => {
  const box = (x: number, text: string, q?: boolean) => (
    <g>
      <rect x={x} y="28" width="46" height="34" rx="7" fill={q ? '#fee2e2' : '#ecfdf5'} stroke={q ? UNK : '#059669'} strokeWidth="1.5" />
      <text x={x + 23} y="51" textAnchor="middle" fontSize="15" fontWeight="bold" fill={q ? UNK : '#064e3b'}>{text}</text>
    </g>
  );
  const arrow = (x: number, text: string) => (
    <g>
      <line x1={x} y1="45" x2={x + 30} y2="45" stroke="#334155" strokeWidth="1.6" />
      <path d={`M ${x + 26} 41 L ${x + 31} 45 L ${x + 26} 49`} fill="none" stroke="#334155" strokeWidth="1.6" />
      <text x={x + 15} y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">{text}</text>
    </g>
  );
  return (
    <QFig h={80}>
      {box(8, start)}
      {arrow(58, a)}
      {box(93, '')}
      {arrow(143, b)}
      {box(178, '?', true)}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBERS_200_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'n200g3-q1',
    level: 1,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig h={1} t={2} e={5} />,
    question: 'Melyik számot raktuk ki?',
    options: ['125', '152', '1025', '8'],
    correctAnswer: 0,
    explanation: '1 lap = 100, 2 rúd = 20, 5 kocka = 5. 100 + 20 + 5 = 125.'
  },
  {
    id: 'n200g3-q2',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Hogyan írjuk számjegyekkel: százhetvenhárom?',
    options: ['173', '137', '1073', '703'],
    correctAnswer: 0,
    explanation: 'Száz = 1 százas, hetven = 7 tízes, három = 3 egyes. Így: 173.'
  },
  {
    id: 'n200g3-q3',
    level: 1,
    questionTypeBadge: 'Százas tábla',
    figure: (
      <FragFig
        rows={2}
        cols={3}
        cells={[
          [0, 0, '145'],
          [0, 1, '146'],
          [0, 2, '147'],
          [1, 0, '155'],
          [1, 1, '?', 'q'],
          [1, 2, '157']
        ]}
      />
    ),
    question: 'Melyik szám bújt el a „?” mögé?',
    options: ['156', '166', '146', '165'],
    correctAnswer: 0,
    explanation: 'A 146 alatt 10-zel nagyobb szám áll: 146 + 10 = 156. A sorban is jó: 155, 156, 157.'
  },
  {
    id: 'n200g3-q4',
    level: 1,
    questionTypeBadge: 'Golyós számoló',
    figure: <AbacusFig sz={1} t={0} e={6} />,
    question: 'Melyik számot mutatja a golyós számoló?',
    options: ['106', '160', '16', '7'],
    correctAnswer: 0,
    explanation: '1 piros = 100, kék nincs, 6 sárga = 6. A tízesek helyére 0 kerül: 106.'
  },
  {
    id: 'n200g3-q5',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <CardsFig cards={['120', '130', '140', '?']} />,
    question: 'Melyik szám jön a sorban?',
    options: ['150', '141', '160', '104'],
    correctAnswer: 0,
    explanation: 'A sor tízesével nő: 120, 130, 140, 150.'
  },
  {
    id: 'n200g3-q6',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <PlaceTableFig digits={['1', '8', '3']} />,
    question: 'Melyik szám áll a táblázatban?',
    options: ['183', '138', '1083', '12'],
    correctAnswer: 0,
    explanation: '1 százas, 8 tízes, 3 egyes: 100 + 80 + 3 = 183.'
  },
  {
    id: 'n200g3-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[100, 20, 10]} />,
    question: 'Mennyi pénz van itt összesen?',
    options: ['130 Ft', '3 Ft', '120 Ft', '150 Ft'],
    correctAnswer: 0,
    explanation: '100 Ft + 20 Ft = 120 Ft. Még 10 Ft: 130 Ft.'
  },
  {
    id: 'n200g3-q8',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CardsFig cards={['158', '185']} sep="?" />,
    question: 'Melyik jel kerül a „?” helyére?',
    options: ['<', '>', '='],
    correctAnswer: 0,
    explanation: 'Mindkettőben 1 százas van. Tízesek: 5 kevesebb, mint 8. Ezért 158 < 185.'
  },
  {
    id: 'n200g3-q9',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <CardsFig cards={['197', '198', '199', '?']} />,
    question: 'Melyik szám jön a 199 után?',
    options: ['200', '1910', '190', '100'],
    correctAnswer: 0,
    explanation: '199 + 1 = 200. A 199 után a kétszáz jön. Ez 2 százas.'
  },
  {
    id: 'n200g3-q10',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <ChipsFig sz={1} t={4} e={7} />,
    question: 'Melyik számot raktuk ki korongokkal?',
    options: ['147', '1047', '174', '12'],
    correctAnswer: 0,
    explanation: '1 darab 100-as, 4 darab 10-es, 7 darab 1-es: 100 + 40 + 7 = 147.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'n200g3-q11',
    level: 2,
    questionTypeBadge: 'Valódi érték',
    figure: <DigitFig num="164" idx={1} />,
    question: 'Mennyit ér a bekeretezett 6-os a 164-ben?',
    options: ['60', '6', '600', '16'],
    correctAnswer: 0,
    explanation: 'A 6 a tízesek helyén áll. 6 tízes = 60. Ez a valódi értéke.'
  },
  {
    id: 'n200g3-q12',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: '172 = 100 + 70 + □. Mi kerül a □ helyére?',
    options: ['2', '20', '7', '12'],
    correctAnswer: 0,
    explanation: 'A 172-ben 1 százas, 7 tízes és 2 egyes van. 100 + 70 + 2 = 172.'
  },
  {
    id: 'n200g3-q13',
    level: 2,
    questionTypeBadge: 'Százas tábla',
    figure: (
      <FragFig
        rows={3}
        cols={3}
        cells={[
          [0, 1, '134', 'start'],
          [2, 1, '?', 'q']
        ]}
        note="lépj 2-t lefelé"
      />
    ),
    question: 'A 134-ről 2-t lépsz lefelé. Hová érkezel?',
    options: ['154', '136', '144', '164'],
    correctAnswer: 0,
    explanation: 'Egy lépés lefelé 10-zel több. 134 → 144 → 154.'
  },
  {
    id: 'n200g3-q14',
    level: 2,
    questionTypeBadge: 'Golyós számoló',
    figure: <AbacusFig sz={1} t={9} e={4} />,
    question: 'Melyik számot mutatja a golyós számoló?',
    options: ['194', '149', '14', '104'],
    correctAnswer: 0,
    explanation: '1 piros = 100, 9 kék = 90, 4 sárga = 4. 100 + 90 + 4 = 194.'
  },
  {
    id: 'n200g3-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <LineFig lo={148} hi={162} labels={[150, 160]} seg={[150, 160]} />,
    question: '150 < □ < 160. Melyik szám kerülhet a □ helyére?',
    options: ['157', '165', '150', '106'],
    correctAnswer: 0,
    explanation: 'A □ nagyobb, mint 150, és kisebb, mint 160. A 157 jó. A 150 nem, mert nem nagyobb önmagánál.'
  },
  {
    id: 'n200g3-q16',
    level: 2,
    questionTypeBadge: 'Számírás',
    question: 'Hogyan írjuk számjegyekkel: száznyolcvanöt?',
    options: ['185', '158', '1085', '10085'],
    correctAnswer: 0,
    explanation: 'Száz = 100, nyolcvan = 80, öt = 5. 100 + 80 + 5 = 185.'
  },
  {
    id: 'n200g3-q17',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[100, 50, 20, 20, 5]} />,
    question: 'Mennyi pénz van itt összesen?',
    options: ['195 Ft', '175 Ft', '5 Ft', '185 Ft'],
    correctAnswer: 0,
    explanation: '100 + 50 = 150. 150 + 20 + 20 = 190. 190 + 5 = 195 Ft.'
  },
  {
    id: 'n200g3-q18',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legnagyobb szám?',
    options: ['198', '189', '99', '181'],
    correctAnswer: 0,
    explanation: 'A 99 kétjegyű, ez a legkisebb. A többiben 1 százas van. A 198-ban 9 tízes van, ez a legtöbb.'
  },
  {
    id: 'n200g3-q19',
    level: 2,
    questionTypeBadge: 'Számsor',
    figure: <CardsFig cards={['165', '155', '145', '?']} />,
    question: 'Melyik szám jön a sorban?',
    options: ['135', '144', '125', '155'],
    correctAnswer: 0,
    explanation: 'A sor tízesével csökken: 165, 155, 145, 135.'
  },
  {
    id: 'n200g3-q20',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <BlocksFig h={1} t={3} e={0} />,
    question: 'A százas lapot rudakra váltod. Hány rudad lesz összesen?',
    options: ['13', '3', '4', '130'],
    correctAnswer: 0,
    explanation: 'A lapból 10 rúd lesz. 10 + 3 = 13 rúd. A 130 éppen 13 tízes.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'n200g3-q21',
    level: 3,
    questionTypeBadge: 'Beváltás',
    figure: <ChipsFig sz={1} t={6} e={14} />,
    question: 'Melyik számot raktuk ki? Sok az egyes, válts be!',
    options: ['174', '1614', '164', '184'],
    correctAnswer: 0,
    explanation: '14 egyes = 1 tízes + 4 egyes. Így 1 százas, 7 tízes, 4 egyes: 174.'
  },
  {
    id: 'n200g3-q22',
    level: 3,
    questionTypeBadge: 'Százas tábla',
    figure: (
      <FragFig
        rows={3}
        cols={4}
        cells={[
          [0, 0, '?', 'q'],
          [2, 3, '178', 'start']
        ]}
        note="3-at jobbra, majd 2-t lefelé"
      />
    ),
    question: '3-at léptél jobbra, majd 2-t lefelé. A 178-ra értél. Honnan indultál?',
    options: ['155', '158', '175', '135'],
    correctAnswer: 0,
    explanation: 'Lépj vissza! 2-t felfelé: 178 → 168 → 158. 3-at balra: 157, 156, 155.'
  },
  {
    id: 'n200g3-q23',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <LineFig lo={158} hi={172} labels={[160, 170]} seg={[160, 170]} />,
    question: 'A szám 160 és 170 között van. Páratlan. Az egyesek helyén 7-nél nagyobb jegy áll. Melyik ez?',
    options: ['169', '168', '167', '179'],
    correctAnswer: 0,
    explanation: '7-nél nagyobb jegy: 8 vagy 9. Páratlan csak a 9. Így a szám 169.'
  },
  {
    id: 'n200g3-q24',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <PursesFig a={[100, 50, 5]} b={[50, 50, 50, 20]} />,
    question: 'Melyik tárcában van több pénz? Mennyi van benne?',
    options: ['B, 170 Ft', 'A, 155 Ft', 'B, 150 Ft', 'A, 175 Ft'],
    correctAnswer: 0,
    explanation: 'A: 100 + 50 + 5 = 155 Ft. B: 50 + 50 + 50 + 20 = 170 Ft. A B-ben van több.'
  },
  {
    id: 'n200g3-q25',
    level: 3,
    questionTypeBadge: 'Valódi érték',
    question: 'Melyik számban ér a 4-es 40-et, és páratlan a szám?',
    options: ['143', '146', '134', '194'],
    correctAnswer: 0,
    explanation: 'A 4-es akkor ér 40-et, ha a tízesek helyén áll: 143 vagy 146. A 146 páros, a 143 páratlan.'
  },
  {
    id: 'n200g3-q26',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik sor van növekvő sorrendben?',
    options: ['109, 119, 190, 191', '119, 109, 190, 191', '109, 190, 119, 191', '191, 190, 119, 109'],
    correctAnswer: 0,
    explanation: 'Mind 1 százas. A tízesek: 0, 1, 9, 9. A két 9 tízes közül a 190 a kisebb. Így: 109, 119, 190, 191.'
  },
  {
    id: 'n200g3-q27',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig cards={['1', '7', '5']} />,
    question: 'Rakj ki a 3 kártyából 200-nál kisebb számot! Melyik a legnagyobb ilyen szám?',
    options: ['175', '157', '150', '105'],
    correctAnswer: 0,
    explanation: '200-nál kisebb háromjegyű szám elején 1 áll. Utána a nagyobb jegy jön: 7, majd 5. Így 175.'
  },
  {
    id: 'n200g3-q28',
    level: 3,
    questionTypeBadge: 'Százas tábla',
    question: 'A 101–200 táblán hány szám végződik 0-ra?',
    options: ['10', '9', '11', '20'],
    correctAnswer: 0,
    explanation: '110, 120, 130, 140, 150, 160, 170, 180, 190, 200. Ez 10 szám, minden sor végén egy.'
  },
  {
    id: 'n200g3-q29',
    level: 3,
    questionTypeBadge: 'Lépegetés',
    figure: <ChainFig start="128" a="+ 40" b="− 1" />,
    question: 'Indulj a 128-ról! Lépj 4 tízest előre, majd 1 egyest vissza! Hová érsz?',
    options: ['167', '169', '132', '131'],
    correctAnswer: 0,
    explanation: '4 tízes előre: 128 → 168. 1 egyes vissza: 168 → 167.'
  },
  {
    id: 'n200g3-q30',
    level: 3,
    questionTypeBadge: 'Golyós számoló',
    figure: <AbacusFig sz={0} t={13} e={5} />,
    question: 'Nincs piros golyó. 13 kék és 5 sárga van. Melyik szám ez?',
    options: ['135', '1305', '18', '315'],
    correctAnswer: 0,
    explanation: '13 kék = 13 tízes = 130. 130 + 5 = 135. A 10 tízes 1 százas, ezért 1 százas, 3 tízes, 5 egyes.'
  }
];

export const Numbers200G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId="g3-c200-szamok-quiz"
      subtopicId="szamok-200-ig"
      title="1. Számok 200-ig – Kvíz"
      subtitle="30 feladat 3 szinten: százasok, tízesek, egyesek, a második százas tábla, valódi érték, számok betűvel."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • KVÍZ"
      questions={NUMBERS_200_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Százas, tízes, egyes',
          items: ['136 = 1 sz + 3 t + 6 e', '136 = 100 + 30 + 6', '10 egyes = 1 tízes', '10 tízes = 1 százas']
        },
        {
          title: 'Valódi érték',
          items: ['158: az 1 ér 100-at', '158: az 5 ér 50-et', '158: a 8 ér 8-at', 'százhét = 107 (0 tízes)']
        },
        {
          title: 'Százas tábla 101–200',
          items: ['jobbra: +1', 'balra: −1', 'lefelé: +10', 'felfelé: −10']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers200G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers200G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers200G3Quiz;
