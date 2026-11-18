import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers20G2Matcher } from './Numbers20G2Matcher';
import { Numbers20G2Sorter } from './Numbers20G2Sorter';
import { OneDisc, TenDisc, NumberLine0To20, NumberLineMark } from './Numbers20G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák (strictly 0–20, világos kártya háttér, sötét szöveg)
// ---------------------------------------------------------------------------
const FONT = 'system-ui, Segoe UI, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 130, w = 260 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Tálcán elrendezett csillagok számláláshoz (soronként 5). */
const TrayCountFig: React.FC<{ count: number }> = ({ count }) => (
  <QFig h={120}>
    <rect x="20" y="14" width="220" height="92" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.8" />
    {Array.from({ length: count }, (_, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const cx = 50 + col * 40;
      const cy = 34 + row * 26;
      return (
        <polygon
          key={i}
          points={`${cx},${cy - 9} ${cx + 2.8},${cy - 3} ${cx + 9},${cy - 2.5} ${cx + 4.2},${cy + 2} ${cx + 5.5},${cy + 8.5} ${cx},${cy + 5} ${cx - 5.5},${cy + 8.5} ${cx - 4.2},${cy + 2} ${cx - 9},${cy - 2.5} ${cx - 2.8},${cy - 3}`}
          fill="#facc15"
          stroke="#a16207"
          strokeWidth="1.2"
        />
      );
    })}
  </QFig>
);

/** 10-es és 1-es korongok ábrája. */
const DiscsFig: React.FC<{ t: number; e: number }> = ({ t, e }) => {
  const startX = 28;
  const tensEnd = startX + t * 34;
  return (
    <QFig h={104}>
      {Array.from({ length: t }, (_, i) => (
        <TenDisc key={`t${i}`} cx={startX + i * 34} cy={44} r={14} />
      ))}
      {Array.from({ length: e }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        return (
          <OneDisc
            key={`e${i}`}
            cx={tensEnd + 16 + col * 26}
            cy={e > 5 ? 30 + row * 28 : 44}
            r={10.5}
          />
        );
      })}
      <text x="130" y="92" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#475569">
        lila = 10, zöld = 1
      </text>
    </QFig>
  );
};

/** Számegyenes kvíz-ábra. */
const LineFig: React.FC<{
  lo: number;
  hi: number;
  labels: number[];
  marks?: NumberLineMark[];
}> = ({ lo, hi, labels, marks = [] }) => (
  <QFig h={104} w={280}>
    <NumberLine0To20 lo={lo} hi={hi} x0={20} x1={252} y={62} labels={labels} marks={marks} />
  </QFig>
);

/** Párokba rendezett korongok (páros / páratlan). */
const PairDiscsFig: React.FC<{ n: number }> = ({ n }) => {
  const cols = Math.ceil(n / 2);
  const w = cols * 30;
  const x0 = 130 - w / 2 + 15;
  return (
    <QFig h={96}>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={x0 + Math.floor(i / 2) * 30}
          cy={i % 2 === 0 ? 30 : 58}
          r="10"
          fill="#a78bfa"
          stroke="#5b21b6"
          strokeWidth="1.5"
        />
      ))}
      <text x="130" y="86" textAnchor="middle" fontSize="10.5" fill="#475569">
        Párokba állítottuk a korongokat.
      </text>
    </QFig>
  );
};

/** Sorban álló labdák sorszámhoz (szám nélkül). */
const BallsRowFig: React.FC<{ total: number; highlight: number; flagMode?: boolean }> = ({ total, highlight, flagMode }) => {
  const step = Math.min(28, Math.floor(220 / total));
  const x0 = 130 - ((total - 1) * step) / 2;
  return (
    <QFig h={92}>
      <line x1={x0 - 4} y1="22" x2={x0 + 36} y2="22" stroke="#1d4ed8" strokeWidth="2.2" />
      <path d={`M ${x0 + 30} 17 L ${x0 + 38} 22 L ${x0 + 30} 27`} fill="none" stroke="#1d4ed8" strokeWidth="2.2" />
      <text x={x0 + 44} y="26" fontSize="10.5" fontWeight="bold" fill="#1d4ed8">balról indulunk</text>
      {Array.from({ length: total }, (_, i) => {
        const cx = x0 + i * step;
        const hit = i + 1 === highlight;
        if (flagMode) {
          return (
            <g key={i}>
              <line x1={cx} y1="42" x2={cx} y2="76" stroke="#334155" strokeWidth="2" />
              <polygon
                points={`${cx},42 ${cx + 16},50 ${cx},58`}
                fill={hit ? '#ef4444' : '#e2e8f0'}
                stroke={hit ? '#991b1b' : '#475569'}
                strokeWidth="1.5"
              />
            </g>
          );
        }
        return (
          <circle
            key={i}
            cx={cx}
            cy="58"
            r="10"
            fill={hit ? '#ef4444' : '#e2e8f0'}
            stroke={hit ? '#991b1b' : '#475569'}
            strokeWidth="1.8"
          />
        );
      })}
    </QFig>
  );
};

/** Oszlopdiagram kvíz-ábra (0–12). */
const MiniBarFig: React.FC<{ data: { label: string; n: number; fill: string }[]; maxY?: number }> = ({ data, maxY = 10 }) => {
  const yBase = 108;
  const chartH = 82;
  const unitH = chartH / maxY;
  const stepTick = maxY > 10 ? 3 : 2;
  return (
    <QFig h={134}>
      <line x1="36" y1="18" x2="36" y2={yBase} stroke="#475569" strokeWidth="1.6" />
      <line x1="36" y1={yBase} x2="242" y2={yBase} stroke="#475569" strokeWidth="1.6" />
      {Array.from({ length: Math.floor(maxY / stepTick) + 1 }, (_, i) => {
        const v = i * stepTick;
        return (
          <g key={v}>
            <line x1="32" y1={yBase - v * unitH} x2="240" y2={yBase - v * unitH} stroke="#e2e8f0" strokeWidth="1" />
            <text x="28" y={yBase - v * unitH + 4} textAnchor="end" fontSize="10" fontWeight="bold" fill="#475569">{v}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const bx = 56 + i * 62;
        const bh = d.n * unitH;
        return (
          <g key={d.label}>
            <rect x={bx} y={yBase - bh} width="34" height={bh} fill={d.fill} stroke="#334155" strokeWidth="1.2" rx="3" />
            <text x={bx + 17} y={yBase - bh - 4} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f172a">{d.n}</text>
            <text x={bx + 17} y={yBase + 15} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{d.label}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** 4×5-ös 1–20 tábla egy elrejtett számmal. */
const GridFragFig: React.FC<{ hide: number }> = ({ hide }) => {
  const cellW = 38;
  const cellH = 24;
  const x0 = (260 - 5 * cellW) / 2;
  const y0 = 12;
  return (
    <QFig h={120}>
      {Array.from({ length: 20 }, (_, k) => {
        const n = k + 1;
        const r = Math.floor(k / 5);
        const c = k % 5;
        const isQ = n === hide;
        return (
          <g key={n}>
            <rect x={x0 + c * cellW} y={y0 + r * cellH} width={cellW} height={cellH} fill={isQ ? '#fee2e2' : '#ffffff'} stroke="#64748b" />
            <text x={x0 + c * cellW + cellW / 2} y={y0 + r * cellH + 16} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isQ ? '#dc2626' : '#1e293b'}>
              {isQ ? '?' : n}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Kiemelt szakasz a számegyenesen (10 < ? < 15). */
const LineRangeFig: React.FC = () => {
  const x0 = 20;
  const x1 = 252;
  const X = (v: number) => x0 + ((x1 - x0) * (v - 10)) / 10;
  return (
    <QFig h={96} w={280}>
      <rect x={X(10)} y="36" width={X(15) - X(10)} height="28" rx="6" fill="#dcfce7" opacity="0.85" />
      <NumberLine0To20 lo={10} hi={20} x0={x0} x1={x1} y={54} labels={[10, 15, 20]} />
      <text x={X(12.5)} y="26" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">10 &lt; □ &lt; 15</text>
    </QFig>
  );
};

/** Gyöngysor minta folytatása. */
const PatternFig: React.FC = () => {
  const colors = ['#ef4444', '#3b82f6', '#3b82f6', '#ef4444', '#3b82f6', '?', '#ef4444', '#3b82f6', '#3b82f6'];
  return (
    <QFig h={82}>
      <line x1="20" y1="41" x2="240" y2="41" stroke="#94a3b8" strokeWidth="2" />
      {colors.map((c, i) => {
        const cx = 32 + i * 24.5;
        return c === '?' ? (
          <g key={i}>
            <circle cx={cx} cy="41" r="10.5" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
            <text x={cx} y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">?</text>
          </g>
        ) : (
          <circle key={i} cx={cx} cy="41" r="9.5" fill={c} stroke="#1e293b" strokeWidth="1.4" />
        );
      })}
    </QFig>
  );
};

/** 3 × 5-ös ülőhely/dió rács sor- és oszlopszámokkal. */
const SeatGridFig: React.FC<{ starRow: number; starCol: number; note?: string }> = ({ starRow, starCol, note }) => {
  const cell = 28;
  const x0 = 86;
  const y0 = 24;
  return (
    <QFig h={note ? 136 : 118}>
      {[1, 2, 3, 4, 5].map((c) => (
        <text key={c} x={x0 + (c - 1) * cell + cell / 2} y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
          {c}.
        </text>
      ))}
      {[1, 2, 3].map((r) => (
        <g key={r}>
          <text x={x0 - 8} y={y0 + (r - 1) * cell + 18} textAnchor="end" fontSize="10.5" fontWeight="bold" fill="#1e293b">
            {r}. sor
          </text>
          {[1, 2, 3, 4, 5].map((c) => {
            const cx = x0 + (c - 1) * cell + cell / 2;
            const cy = y0 + (r - 1) * cell + cell / 2;
            const hit = r === starRow && c === starCol;
            return (
              <g key={c}>
                <rect
                  x={x0 + (c - 1) * cell}
                  y={y0 + (r - 1) * cell}
                  width={cell}
                  height={cell}
                  fill={hit ? '#fef08a' : '#ffffff'}
                  stroke="#64748b"
                />
                {hit && (
                  <polygon
                    points={`${cx},${cy - 8} ${cx + 2.4},${cy - 2.5} ${cx + 8},${cy - 2} ${cx + 3.8},${cy + 2} ${cx + 5},${cy + 7.5} ${cx},${cy + 4.5} ${cx - 5},${cy + 7.5} ${cx - 3.8},${cy + 2} ${cx - 8},${cy - 2} ${cx - 2.4},${cy - 2.5}`}
                    fill="#ef4444"
                    stroke="#991b1b"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}
        </g>
      ))}
      {note && (
        <text x="130" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">{note}</text>
      )}
    </QFig>
  );
};

/** 4 piros alma és 5 sárga körte tálcán. */
const BasketFruitsFig: React.FC = () => (
  <QFig h={104}>
    {Array.from({ length: 4 }, (_, i) => (
      <g key={`a${i}`}>
        <circle cx={46 + i * 38} cy={32} r="11" fill="#ef4444" stroke="#991b1b" strokeWidth="1.4" />
        <line x1={46 + i * 38} y1={21} x2={48 + i * 38} y2={16} stroke="#15803d" strokeWidth="2" />
      </g>
    ))}
    <text x="218" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">piros alma</text>
    {Array.from({ length: 5 }, (_, i) => (
      <g key={`k${i}`}>
        <ellipse cx={38 + i * 34} cy={74} rx="9" ry="12" fill="#facc15" stroke="#a16207" strokeWidth="1.4" />
        <line x1={38 + i * 34} y1={62} x2={38 + i * 34} y2={57} stroke="#15803d" strokeWidth="2" />
      </g>
    ))}
    <text x="224" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">sárga körte</text>
  </QFig>
);

/** Felhő kakukktojás feladat. */
const CloudFig: React.FC<{ nums: number[] }> = ({ nums }) => {
  const pos = [
    [60, 44],
    [130, 34],
    [198, 46],
    [94, 78],
    [168, 78],
  ];
  return (
    <QFig h={108}>
      <rect x="24" y="14" width="212" height="80" rx="36" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
      {nums.map((n, i) => (
        <text key={n} x={pos[i][0]} y={pos[i][1]} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
          {n}
        </text>
      ))}
    </QFig>
  );
};

/** 3 ízű fagyigombóc párosítása. */
const IceCreamFlavorsFig: React.FC = () => {
  const flavors = [
    { name: 'eper', fill: '#fb7185', stroke: '#be123c' },
    { name: 'csoki', fill: '#92400e', stroke: '#451a03' },
    { name: 'vanília', fill: '#fef08a', stroke: '#a16207' },
  ];
  return (
    <QFig h={96}>
      {flavors.map((f, i) => (
        <g key={f.name}>
          <circle cx={60 + i * 70} cy="38" r="18" fill={f.fill} stroke={f.stroke} strokeWidth="1.8" />
          <text x={60 + i * 70} y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
            {f.name}
          </text>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// 30 Kérdés (10 / szint)
// ---------------------------------------------------------------------------
export const NUMBERS20_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'n20g2-q1',
    level: 1,
    questionTypeBadge: 'Számlálás',
    figure: <TrayCountFig count={13} />,
    question: 'Hány csillag van a tálcán?',
    options: ['13', '12', '14', '15'],
    correctAnswer: 0,
    explanation: 'Az első két sorban 5 + 5 = 10 csillag van, az alsó sorban még 3. Összesen 13 csillag.',
  },
  {
    id: 'n20g2-q2',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <DiscsFig t={1} e={4} />,
    question: 'Melyik számot raktuk ki a korongokkal?',
    options: ['14', '15', '5', '13'],
    correctAnswer: 0,
    explanation: '1 darab 10-es és 4 darab 1-es korong együtt 10 + 4 = 14.',
  },
  {
    id: 'n20g2-q3',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Melyik számot olvassuk így: tizennyolc?',
    options: ['18', '8', '17', '19'],
    correctAnswer: 0,
    explanation: 'A tizennyolc 1 tízesből és 8 egyesből áll, vagyis 18.',
  },
  {
    id: 'n20g2-q4',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={0} hi={20} labels={[0, 5, 10, 15, 20]} marks={[{ value: 17, label: '?', arrow: true }]} />,
    question: 'Melyik számot mutatja a piros nyíl a számegyenesen?',
    options: ['17', '16', '18', '13'],
    correctAnswer: 0,
    explanation: 'A 15 után kettővel jobbra áll a nyíl: 16, 17.',
  },
  {
    id: 'n20g2-q5',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: (
      <LineFig
        lo={5}
        hi={13}
        labels={[5, 10]}
        marks={[
          { value: 8, label: '8', color: '#2563eb' },
          { value: 9, label: '?', arrow: true },
        ]}
      />
    ),
    question: 'Mi a 8 nagyobb egyes számszomszédja?',
    options: ['9', '7', '10', '6'],
    correctAnswer: 0,
    explanation: 'A nagyobb egyes szomszéd 1-gyel több: 8 + 1 = 9.',
  },
  {
    id: 'n20g2-q6',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    figure: <PairDiscsFig n={6} />,
    question: 'Itt 6 korong van párba állítva. Páros vagy páratlan a 6?',
    options: ['páros', 'páratlan', 'egyik sem', 'nem dönthető el'],
    correctAnswer: 0,
    explanation: 'Mind a 6 korongnak jutott párja, egyik sem maradt egyedül. A 6 páros szám.',
  },
  {
    id: 'n20g2-q7',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel hiányzik a két szám közül? 12 □ 9',
    options: ['>', '<', '=', '+'],
    correctAnswer: 0,
    explanation: 'A 12 nagyobb, mint a 9, ezért a nyitott száj a 12 felé fordul: 12 > 9.',
  },
  {
    id: 'n20g2-q8',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'Melyik szám egyjegyű az alábbiak közül?',
    options: ['7', '10', '14', '20'],
    correctAnswer: 0,
    explanation: 'A 7 egyetlen számjegyből áll, ezért egyjegyű. A 10, 14 és 20 kétjegyű szám.',
  },
  {
    id: 'n20g2-q9',
    level: 1,
    questionTypeBadge: 'Sorszám',
    figure: <BallsRowFig total={7} highlight={4} />,
    question: 'Hányadik a piros labda balról?',
    options: ['4.', '3.', '5.', '4 darab'],
    correctAnswer: 0,
    explanation: 'Számoljunk balról: 1., 2., 3., 4.! A piros labda a 4. helyen van.',
  },
  {
    id: 'n20g2-q10',
    level: 1,
    questionTypeBadge: 'Diagram',
    figure: (
      <MiniBarFig
        data={[
          { label: 'alma', n: 7, fill: '#fca5a5' },
          { label: 'körte', n: 5, fill: '#fde047' },
          { label: 'szilva', n: 9, fill: '#c4b5fd' },
        ]}
      />
    ),
    question: 'Melyik gyümölcsből van a legtöbb a diagramon?',
    options: ['szilva', 'alma', 'körte', 'mindből ugyanannyi'],
    correctAnswer: 0,
    explanation: 'A szilvából 9 darab van, ez több, mint a 7 alma és az 5 körte.',
  },

  // ---------------- 2. szint ----------------
  {
    id: 'n20g2-q11',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <DiscsFig t={1} e={10} />,
    question: 'Itt 1 darab 10-es és 10 darab 1-es korong van. Melyik szám ez?',
    options: ['20', '11', '19', '10'],
    correctAnswer: 0,
    explanation: 'A 10 darab 1-es korongból lesz még 1 darab 10-es. Így 2 tízes van: 20.',
  },
  {
    id: 'n20g2-q12',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számban van 1 tízes és 3 egyes?',
    options: ['13', '3', '14', '10'],
    correctAnswer: 0,
    explanation: '1 tízes = 10, és még 3 egyes = 3. Együtt 10 + 3 = 13.',
  },
  {
    id: 'n20g2-q13',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <GridFragFig hide={12} />,
    question: 'A 1-től 20-ig tartó számtáblában egy szám elbújt. Mi kerül a ? helyére?',
    options: ['12', '11', '13', '7'],
    correctAnswer: 0,
    explanation: 'A 11 és a 13 között pontosan a 12 áll.',
  },
  {
    id: 'n20g2-q14',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik szám kerül a négyzetbe? 18 < □ < 20',
    options: ['19', '17', '18', '20'],
    correctAnswer: 0,
    explanation: 'A 18-nál nagyobb, de a 20-nál kisebb egész szám a 19.',
  },
  {
    id: 'n20g2-q15',
    level: 2,
    questionTypeBadge: 'Sorrend',
    question: 'Melyik számsor van csökkenő sorrendben (a legnagyobbtól a legkisebbig)?',
    options: ['19, 15, 11, 6', '6, 11, 15, 19', '19, 11, 15, 6', '15, 19, 11, 6'],
    correctAnswer: 0,
    explanation: 'Csökkenő sorrendben minden szám kisebb az előzőnél: 19 > 15 > 11 > 6.',
  },
  {
    id: 'n20g2-q16',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Páros vagy páratlan szám a 0?',
    options: ['páros', 'páratlan', 'se nem páros, se nem páratlan', 'kétjegyű szám'],
    correctAnswer: 0,
    explanation: 'A 0 páros szám. A páros számok kettesével sorakoznak: 0, 2, 4, 6, ...',
  },
  {
    id: 'n20g2-q17',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineRangeFig />,
    question: 'Melyik számra igaz az alábbiak közül: 10 < □ < 15?',
    options: ['13', '10', '15', '18'],
    correctAnswer: 0,
    explanation: 'A 10 és a 15 közötti számot keressük: a 13 nagyobb 10-nél és kisebb 15-nél.',
  },
  {
    id: 'n20g2-q18',
    level: 2,
    questionTypeBadge: 'Szabály',
    figure: <PatternFig />,
    question: 'Folytasd a gyöngyfűzést a szabály szerint! Milyen színű a ? gyöngy?',
    options: ['kék', 'piros', 'zöld', 'sárga'],
    correctAnswer: 0,
    explanation: 'A minta ismétlődik: 1 piros, 2 kék. A piros és az első kék után még egy kék jön.',
  },
  {
    id: 'n20g2-q19',
    level: 2,
    questionTypeBadge: 'Rács',
    figure: <SeatGridFig starRow={2} starCol={4} />,
    question: 'Hányadik sor hányadik helyén van a piros csillag?',
    options: ['2. sor 4. helye', '4. sor 2. helye', '2. sor 3. helye', '3. sor 4. helye'],
    correctAnswer: 0,
    explanation: 'A csillag felülről a 2. sorban, balról a 4. oszlopban áll.',
  },
  {
    id: 'n20g2-q20',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis',
    figure: <BasketFruitsFig />,
    question: 'Igaz vagy hamis a kép alapján? „Több piros alma van, mint sárga körte.”',
    options: ['Hamis', 'Igaz', 'Ugyanannyi van', 'Nem lehet megszámolni'],
    correctAnswer: 0,
    explanation: 'A képen 4 piros alma és 5 sárga körte van. Mivel 4 < 5, az állítás hamis.',
  },

  // ---------------- 3. szint ----------------
  {
    id: 'n20g2-q21',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <LineFig lo={10} hi={20} labels={[10, 15, 20]} />,
    question: 'Gondoltam egy kétjegyű páratlan számra. Nagyobb 15-nél, és a nagyobb egyes szomszédja 18. Melyik ez a szám?',
    options: ['17', '19', '16', '15'],
    correctAnswer: 0,
    explanation: 'Ha a nagyobb egyes szomszédja 18, akkor a szám 18 − 1 = 17. A 17 nagyobb 15-nél és páratlan.',
  },
  {
    id: 'n20g2-q22',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik szám illik a négyzet helyére? 14 > □ > 12',
    options: ['13', '15', '12', '11'],
    correctAnswer: 0,
    explanation: 'A 14-nél kisebb, de a 12-nél nagyobb szám pontosan a 13.',
  },
  {
    id: 'n20g2-q23',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    figure: <CloudFig nums={[2, 8, 14, 15, 20]} />,
    question: 'Melyik szám nem illik a többi közé a felhőben?',
    options: ['15', '2', '14', '20'],
    correctAnswer: 0,
    explanation: 'A 2, 8, 14 és 20 mind páros szám. Egyedül a 15 páratlan, ezért az a kakukktojás.',
  },
  {
    id: 'n20g2-q24',
    level: 3,
    questionTypeBadge: 'Páros, páratlan',
    figure: <LineFig lo={9} hi={17} labels={[9, 10, 15, 17]} />,
    question: 'Hány páros szám van a 9 és a 17 között?',
    options: ['4', '3', '5', '8'],
    correctAnswer: 0,
    explanation: 'A 9 és 17 közötti páros számok: 10, 12, 14, 16. Ez 4 darab szám.',
  },
  {
    id: 'n20g2-q25',
    level: 3,
    questionTypeBadge: 'Sorszám',
    figure: <BallsRowFig total={9} highlight={3} flagMode />,
    question: '9 zászló áll egy sorban. Balról a 3. zászló piros. Hány zászló áll a piros zászló ELŐTT?',
    options: ['2', '3', '6', '4'],
    correctAnswer: 0,
    explanation: 'A 3. zászló előtt az 1. és a 2. zászló áll, vagyis 2 zászló.',
  },
  {
    id: 'n20g2-q26',
    level: 3,
    questionTypeBadge: 'Rács',
    figure: <SeatGridFig starRow={3} starCol={2} note="Indulj a csillagtól: 2-t jobbra!" />,
    question: 'A csillag a 3. sor 2. helyén áll. Ha 2 helyet jobbra lépsz ugyanebben a sorban, hová érsz?',
    options: ['3. sor 4. helyére', '3. sor 5. helyére', '1. sor 2. helyére', '2. sor 4. helyére'],
    correctAnswer: 0,
    explanation: 'A 3. sorban maradunk, és a 2. helyről 2-t jobbra lépünk: 2 + 2 = 4. Így a 3. sor 4. helyére érünk.',
  },
  {
    id: 'n20g2-q27',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: (
      <MiniBarFig
        maxY={12}
        data={[
          { label: 'dió', n: 12, fill: '#fdba74' },
          { label: 'mogyoró', n: 7, fill: '#bef264' },
          { label: 'mandula', n: 9, fill: '#93c5fd' },
        ]}
      />
    ),
    question: 'Hánnyal több dió van a diagramon, mint mogyoró?',
    options: ['5', '4', '6', '19'],
    correctAnswer: 0,
    explanation: '12 dió van és 7 mogyoró. A különbség: 12 − 7 = 5.',
  },
  {
    id: 'n20g2-q28',
    level: 3,
    questionTypeBadge: 'Számjegyek',
    question: 'Mi a legkisebb kétjegyű páros szám?',
    options: ['10', '12', '2', '0'],
    correctAnswer: 0,
    explanation: 'A legkisebb kétjegyű szám a 10, és mivel 0-ra végződik, páros is.',
  },
  {
    id: 'n20g2-q29',
    level: 3,
    questionTypeBadge: 'Válogatás',
    figure: <IceCreamFlavorsFig />,
    question: 'Háromféle fagyi kapható: eper, csoki és vanília. Hányféleképpen választhatsz 2 különböző gombócot? (A sorrend nem számít.)',
    options: ['3', '2', '4', '6'],
    correctAnswer: 0,
    explanation: 'Három párt állíthatsz össze: eper-csoki, eper-vanília, csoki-vanília. Ez 3 lehetőség.',
  },
  {
    id: 'n20g2-q30',
    level: 3,
    questionTypeBadge: 'Beváltás',
    question: 'Mennyit ér 0 tízes és 16 egyes összesen?',
    options: ['16', '6', '10', '20'],
    correctAnswer: 0,
    explanation: '16 egyesből 10-et beváltunk 1 tízesre, marad 6 egyes. Így 1 tízes és 6 egyes: 16.',
  },
];

export const Numbers20G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId="g2-c20-szamok-quiz"
      subtopicId="szamok-0-tol-20-ig"
      title="1. Számok 0-tól 20-ig – Kvíz"
      subtitle="30 feladat 3 szinten: számlálás, helyiérték, számegyenes, számszomszédok, páros és páratlan számok, sorszámok."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • KVÍZ"
      questions={NUMBERS20_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesek és egyesek',
          items: [
            '10 egyes = 1 tízes = 10',
            '20 egyes = 2 tízes = 20',
            '16 = 1 tízes + 6 egyes',
            'Egyjegyűek: 0–9, kétjegyűek 20-ig: 10–20',
          ],
        },
        {
          title: 'Számszomszédok és jelek',
          items: [
            '13 egyes szomszédai: 12 és 14',
            '12 < 13 < 14 (növekvő)',
            '14 > 13 > 12 (csökkenő)',
            'A nyitott száj a nagyobb felé néz!',
          ],
        },
        {
          title: 'Páros, páratlan, sorszám',
          items: [
            'Páros: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20',
            'Páratlan: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19',
            '5 zászló = darabszám',
            '5. zászló = sorszám (hányadik?)',
          ],
        },
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers20G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers20G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers20G2Quiz;
