import React, { useState } from 'react';

export const GEO_FONT = 'system-ui, Segoe UI, sans-serif';

// ---------------------------------------------------------------------------
// Logikai lapok
// ---------------------------------------------------------------------------
export type PieceShape = 'kor' | 'haromszog' | 'negyzet' | 'teglalap';
export type PieceColor = 'piros' | 'sarga' | 'kek' | 'zold';

export interface LogicPiece {
  shape: PieceShape;
  color: PieceColor;
  big: boolean;
  holed: boolean;
}

export const PIECE_COLORS: Record<PieceColor, { fill: string; stroke: string; name: string }> = {
  piros: { fill: '#ef4444', stroke: '#991b1b', name: 'piros' },
  sarga: { fill: '#facc15', stroke: '#a16207', name: 'sárga' },
  kek: { fill: '#3b82f6', stroke: '#1e3a8a', name: 'kék' },
  zold: { fill: '#22c55e', stroke: '#166534', name: 'zöld' }
};

export const SHAPE_NAMES: Record<PieceShape, string> = {
  kor: 'kör',
  haromszog: 'háromszög',
  negyzet: 'négyzet',
  teglalap: 'téglalap'
};

export const describePiece = (p: LogicPiece): string =>
  `${p.big ? 'nagy' : 'kicsi'}, ${PIECE_COLORS[p.color].name}, ${p.holed ? 'lyukas' : 'sima'} ${SHAPE_NAMES[p.shape]}`;

export const pieceDiff = (a: LogicPiece, b: LogicPiece): string[] => {
  const d: string[] = [];
  if (a.shape !== b.shape) d.push('a formája');
  if (a.color !== b.color) d.push('a színe');
  if (a.big !== b.big) d.push('a mérete');
  if (a.holed !== b.holed) d.push('a lyuk');
  return d;
};

export const samePiece = (a: LogicPiece, b: LogicPiece) => pieceDiff(a, b).length === 0;

/** Rövid konstruktor: P('kor','piros',true,false) */
export const P = (shape: PieceShape, color: PieceColor, big = true, holed = false): LogicPiece => ({
  shape,
  color,
  big,
  holed
});

/** Egy logikai lap rajza (cx, cy középpel). `unit` a nagy lap fél-mérete. */
export const LogicPiecePart: React.FC<{ piece: LogicPiece; cx: number; cy: number; unit?: number }> = ({
  piece,
  cx,
  cy,
  unit = 20
}) => {
  const s = piece.big ? unit : unit * 0.6;
  const { fill, stroke } = PIECE_COLORS[piece.color];
  const sw = Math.max(1.5, unit / 10);
  let body: React.ReactNode;
  if (piece.shape === 'kor') {
    body = <circle cx={cx} cy={cy} r={s} fill={fill} stroke={stroke} strokeWidth={sw} />;
  } else if (piece.shape === 'negyzet') {
    body = <rect x={cx - s * 0.9} y={cy - s * 0.9} width={s * 1.8} height={s * 1.8} fill={fill} stroke={stroke} strokeWidth={sw} />;
  } else if (piece.shape === 'teglalap') {
    body = <rect x={cx - s * 1.15} y={cy - s * 0.6} width={s * 2.3} height={s * 1.2} fill={fill} stroke={stroke} strokeWidth={sw} />;
  } else {
    const h = s * 1.9;
    body = (
      <polygon
        points={`${cx},${cy - h * 0.6} ${cx + s * 1.1},${cy + h * 0.4} ${cx - s * 1.1},${cy + h * 0.4}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    );
  }
  const holeY = piece.shape === 'haromszog' ? cy + s * 0.12 : cy;
  return (
    <g>
      {body}
      {piece.holed && (
        <circle cx={cx} cy={holeY} r={Math.max(2.5, s * 0.22)} fill="#ffffff" stroke={stroke} strokeWidth={sw * 0.6} />
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Négyzetrács + nyilak
// ---------------------------------------------------------------------------
export type Dir = 'R' | 'L' | 'U' | 'D';
export const DIR_VEC: Record<Dir, [number, number]> = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] };
export const DIR_CHAR: Record<Dir, string> = { R: '→', L: '←', U: '↑', D: '↓' };
export const DIR_WORD: Record<Dir, string> = { R: 'jobbra', L: 'balra', U: 'föl', D: 'le' };
export const arrowsText = (ds: Dir[]) => ds.map((d) => DIR_CHAR[d]).join(' ');

export const walk = (start: [number, number], ds: Dir[]): [number, number][] => {
  const pts: [number, number][] = [start];
  let [c, r] = start;
  ds.forEach((d) => {
    c += DIR_VEC[d][0];
    r += DIR_VEC[d][1];
    pts.push([c, r]);
  });
  return pts;
};

/** Négyzetrács (cols × rows cellák) x,y bal felső sarokkal. */
export const GridPart: React.FC<{ x: number; y: number; cols: number; rows: number; cell: number; stroke?: string }> = ({
  x,
  y,
  cols,
  rows,
  cell,
  stroke = '#93c5fd'
}) => (
  <g>
    <rect x={x} y={y} width={cols * cell} height={rows * cell} fill="#ffffff" stroke={stroke} strokeWidth="1.5" />
    {Array.from({ length: cols - 1 }, (_, i) => (
      <line key={`c${i}`} x1={x + (i + 1) * cell} y1={y} x2={x + (i + 1) * cell} y2={y + rows * cell} stroke={stroke} strokeWidth="1" />
    ))}
    {Array.from({ length: rows - 1 }, (_, i) => (
      <line key={`r${i}`} x1={x} y1={y + (i + 1) * cell} x2={x + cols * cell} y2={y + (i + 1) * cell} stroke={stroke} strokeWidth="1" />
    ))}
  </g>
);

/** Kis nyíl-rajz (SVG-ben nem használunk nyíl-karaktert). */
export const ArrowPart: React.FC<{ dir: Dir; cx: number; cy: number; size?: number; color?: string }> = ({
  dir,
  cx,
  cy,
  size = 10,
  color = '#1d4ed8'
}) => {
  const rot = { R: 0, D: 90, L: 180, U: 270 }[dir];
  const s = size;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <line x1={-s} y1="0" x2={s * 0.35} y2="0" stroke={color} strokeWidth={s * 0.32} strokeLinecap="round" />
      <polygon points={`${s},0 ${s * 0.2},${-s * 0.6} ${s * 0.2},${s * 0.6}`} fill={color} />
    </g>
  );
};

/** Csillag (cél) rajza. */
export const StarPart: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 9 }) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  return <polygon points={pts} fill="#facc15" stroke="#a16207" strokeWidth="1.5" strokeLinejoin="round" />;
};

/** Robot (kiinduló pont) rajza. */
export const RobotPart: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <line x1="0" y1="-11" x2="0" y2="-7" stroke="#334155" strokeWidth="1.5" />
    <circle cx="0" cy="-12" r="1.8" fill="#ef4444" />
    <rect x="-8" y="-7" width="16" height="14" rx="3" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1.5" />
    <circle cx="-3.5" cy="-1" r="1.8" fill="#1e1b4b" />
    <circle cx="3.5" cy="-1" r="1.8" fill="#1e1b4b" />
    <line x1="-3" y1="4" x2="3" y2="4" stroke="#1e1b4b" strokeWidth="1.3" strokeLinecap="round" />
  </g>
);

// ---------------------------------------------------------------------------
// Tárgy-ikonok a helymeghatározáshoz
// ---------------------------------------------------------------------------
export type ThingKind = 'labda' | 'csillag' | 'haz' | 'fa' | 'alma' | 'hal' | 'auto' | 'virag';
export const THING_NAMES: Record<ThingKind, string> = {
  labda: 'labda',
  csillag: 'csillag',
  haz: 'ház',
  fa: 'fa',
  alma: 'alma',
  hal: 'hal',
  auto: 'autó',
  virag: 'virág'
};

export const ThingPart: React.FC<{ kind: ThingKind; cx: number; cy: number; s?: number }> = ({ kind, cx, cy, s = 1 }) => {
  let body: React.ReactNode = null;
  switch (kind) {
    case 'labda':
      body = (
        <g>
          <circle cx="0" cy="0" r="12" fill="#f97316" stroke="#9a3412" strokeWidth="1.8" />
          <path d="M -12 0 Q 0 -6 12 0 M 0 -12 Q -6 0 0 12" fill="none" stroke="#9a3412" strokeWidth="1.4" />
        </g>
      );
      break;
    case 'csillag':
      body = <StarPart cx={0} cy={0} r={13} />;
      break;
    case 'haz':
      body = (
        <g>
          <rect x="-10" y="-2" width="20" height="14" fill="#fde68a" stroke="#92400e" strokeWidth="1.6" />
          <polygon points="-13,-2 0,-14 13,-2" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="-3" y="4" width="6" height="8" fill="#92400e" />
        </g>
      );
      break;
    case 'fa':
      body = (
        <g>
          <rect x="-2.5" y="4" width="5" height="9" fill="#92400e" />
          <circle cx="0" cy="-3" r="10" fill="#22c55e" stroke="#166534" strokeWidth="1.6" />
        </g>
      );
      break;
    case 'alma':
      body = (
        <g>
          <circle cx="0" cy="2" r="10" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.6" />
          <line x1="0" y1="-8" x2="1" y2="-13" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="5" cy="-11" rx="4" ry="2" fill="#16a34a" />
        </g>
      );
      break;
    case 'hal':
      body = (
        <g>
          <ellipse cx="-2" cy="0" rx="10" ry="6.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.6" />
          <polygon points="7,0 14,-6 14,6" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="-7" cy="-1.5" r="1.5" fill="#0c4a6e" />
        </g>
      );
      break;
    case 'auto':
      body = (
        <g>
          <rect x="-13" y="-3" width="26" height="9" rx="3" fill="#8b5cf6" stroke="#4c1d95" strokeWidth="1.6" />
          <path d="M -7 -3 L -4 -10 L 5 -10 L 8 -3 Z" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="1.5" />
          <circle cx="-7" cy="7" r="3.5" fill="#1e293b" />
          <circle cx="7" cy="7" r="3.5" fill="#1e293b" />
        </g>
      );
      break;
    case 'virag':
      body = (
        <g>
          <line x1="0" y1="2" x2="0" y2="13" stroke="#16a34a" strokeWidth="2.2" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={6 * Math.cos((a * Math.PI) / 180)} cy={-4 + 6 * Math.sin((a * Math.PI) / 180)} r="4.5" fill="#f472b6" stroke="#9d174d" strokeWidth="1.2" />
          ))}
          <circle cx="0" cy="-4" r="3.5" fill="#facc15" />
        </g>
      );
      break;
  }
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>{body}</g>;
};

/** Gyerek-figura (előtte/mögötte sorhoz), arccal jobbra néz. */
export const KidPart: React.FC<{ cx: number; cy: number; color: string; name: string }> = ({ cx, cy, color, name }) => (
  <g>
    <circle cx={cx} cy={cy - 20} r="8" fill="#fcd9b6" stroke="#9a3412" strokeWidth="1.3" />
    <circle cx={cx + 4} cy={cy - 21} r="1.3" fill="#1e293b" />
    <rect x={cx - 8} y={cy - 11} width="16" height="20" rx="5" fill={color} stroke="#1e293b" strokeWidth="1.2" />
    <line x1={cx - 4} y1={cy + 9} x2={cx - 4} y2={cy + 18} stroke="#1e293b" strokeWidth="2.5" />
    <line x1={cx + 4} y1={cy + 9} x2={cx + 4} y2={cy + 18} stroke="#1e293b" strokeWidth="2.5" />
    <text x={cx} y={cy + 32} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a" fontFamily={GEO_FONT}>
      {name}
    </text>
  </g>
);

// ---------------------------------------------------------------------------
// Laborok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const MsgBox: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const LAB_COLS = 7;
const LAB_ROWS = 5;

interface WalkTask {
  start: [number, number];
  dirs: Dir[];
}

const makeWalkTask = (): WalkTask => {
  for (;;) {
    const start: [number, number] = [rnd(0, LAB_COLS - 1), rnd(0, LAB_ROWS - 1)];
    const n = rnd(3, 6);
    const dirs: Dir[] = [];
    let [c, r] = start;
    let ok = true;
    for (let i = 0; i < n; i++) {
      const opts = (['R', 'L', 'U', 'D'] as Dir[]).filter((d) => {
        const nc = c + DIR_VEC[d][0];
        const nr = r + DIR_VEC[d][1];
        const prev = dirs[dirs.length - 1];
        const back = prev !== undefined && DIR_VEC[prev][0] === -DIR_VEC[d][0] && DIR_VEC[prev][1] === -DIR_VEC[d][1];
        return nc >= 0 && nc < LAB_COLS && nr >= 0 && nr < LAB_ROWS && !back;
      });
      if (opts.length === 0) {
        ok = false;
        break;
      }
      const prev = dirs[dirs.length - 1];
      const d = prev !== undefined && Math.random() < 0.5 && opts.includes(prev) ? prev : pick(opts);
      dirs.push(d);
      c += DIR_VEC[d][0];
      r += DIR_VEC[d][1];
    }
    if (ok && (c !== start[0] || r !== start[1])) return { start, dirs };
  }
};

/** Labor I: Hova ér a robot? (koppints a mezőre) */
export const RobotWalkLab: React.FC = () => {
  const [task, setTask] = useState<WalkTask>({ start: [1, 3], dirs: ['R', 'R', 'U', 'R'] });
  const [chosen, setChosen] = useState<[number, number] | null>(null);
  const [showPath, setShowPath] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const cell = 40;
  const pts = walk(task.start, task.dirs);
  const end = pts[pts.length - 1];

  const next = () => {
    setTask(makeWalkTask());
    setChosen(null);
    setShowPath(false);
    setMsg(null);
  };

  const check = () => {
    if (!chosen) {
      setMsg({ ok: false, text: 'Koppints arra a mezőre, ahova szerinted a robot ér!' });
      return;
    }
    if (chosen[0] === end[0] && chosen[1] === end[1]) {
      setShowPath(true);
      setMsg({ ok: true, text: 'Szuper! Pontosan ide ért a robot. Nézd meg az útját!' });
      return;
    }
    const swapLR = walk(task.start, task.dirs.map((d): Dir => (d === 'R' ? 'L' : d === 'L' ? 'R' : d)));
    const swapUD = walk(task.start, task.dirs.map((d): Dir => (d === 'U' ? 'D' : d === 'D' ? 'U' : d)));
    const eq = (a: [number, number]) => a[0] === chosen[0] && a[1] === chosen[1];
    if (eq(swapLR[swapLR.length - 1])) {
      setMsg({ ok: false, text: 'Majdnem! Összekeverted a jobbra és a balra nyilat. A → jobbra mutat!' });
    } else if (eq(swapUD[swapUD.length - 1])) {
      setMsg({ ok: false, text: 'Majdnem! Összekeverted a föl és a le nyilat. A ↑ fölfelé mutat!' });
    } else {
      setMsg({ ok: false, text: 'Nem ide ért. Tedd az ujjad a robotra, és lépj nyilanként egy mezőt!' });
    }
  };

  const cx = (c: number) => 10 + c * cell + cell / 2;
  const cy = (r: number) => 10 + r * cell + cell / 2;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-3 text-center text-blue-950 dark:text-blue-100">
        <p className="text-sm font-bold">A robot ezeket a nyilakat követi. Hova ér?</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {task.dirs.map((d, i) => (
            <span key={i} className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border-2 border-blue-400 text-2xl font-black flex items-center justify-center">
              {DIR_CHAR[d]}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${LAB_COLS * cell + 20} ${LAB_ROWS * cell + 20}`} className="w-full max-w-[420px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: LAB_ROWS }, (_, r) =>
          Array.from({ length: LAB_COLS }, (_, c) => {
            const isChosen = chosen !== null && chosen[0] === c && chosen[1] === r;
            return (
              <rect
                key={`${c}-${r}`}
                x={10 + c * cell}
                y={10 + r * cell}
                width={cell}
                height={cell}
                fill={isChosen ? '#fde68a' : '#ffffff'}
                stroke="#93c5fd"
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setChosen([c, r]);
                  setMsg(null);
                }}
              />
            );
          })
        )}
        {showPath && (
          <polyline
            points={pts.map(([c, r]) => `${cx(c)},${cy(r)}`).join(' ')}
            fill="none"
            stroke="#f97316"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 6"
            pointerEvents="none"
          />
        )}
        <g pointerEvents="none">
          <RobotPart cx={cx(task.start[0])} cy={cy(task.start[1])} s={1.4} />
          {showPath && <StarPart cx={cx(end[0])} cy={cy(end[1])} r={13} />}
        </g>
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={next} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

const ALL_SHAPES: PieceShape[] = ['kor', 'haromszog', 'negyzet', 'teglalap'];
const ALL_COLORS: PieceColor[] = ['piros', 'sarga', 'kek', 'zold'];
type Prop = 'shape' | 'color' | 'big' | 'holed';

const changeProp = (p: LogicPiece, prop: Prop): LogicPiece => {
  if (prop === 'shape') return { ...p, shape: pick(ALL_SHAPES.filter((s) => s !== p.shape)) };
  if (prop === 'color') return { ...p, color: pick(ALL_COLORS.filter((s) => s !== p.color)) };
  if (prop === 'big') return { ...p, big: !p.big };
  return { ...p, holed: !p.holed };
};

const randomPiece = (): LogicPiece => ({
  shape: pick(ALL_SHAPES),
  color: pick(ALL_COLORS),
  big: Math.random() < 0.5,
  holed: Math.random() < 0.5
});

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const makeChoices = (cur: LogicPiece): LogicPiece[] => {
  for (;;) {
    const props = shuffle<Prop>(['shape', 'color', 'big', 'holed']);
    const good = changeProp(cur, props[0]);
    const two = changeProp(changeProp(cur, props[1]), props[2]);
    const three = changeProp(changeProp(changeProp(cur, props[0]), props[1]), props[3]);
    const twoB = changeProp(changeProp(cur, props[0]), props[3]);
    const list = [good, two, three, twoB];
    const distinct = list.every((a, i) => list.every((b, j) => i === j || !samePiece(a, b)));
    const counts = list.map((x) => pieceDiff(cur, x).length);
    if (distinct && counts[0] === 1 && counts.slice(1).every((n) => n >= 2)) return shuffle(list);
  }
};

/** Labor II: Logikai lánc – csak egy dologban térjen el! */
export const LogicChainLab: React.FC = () => {
  const [chain, setChain] = useState<LogicPiece[]>([P('kor', 'piros', true, false)]);
  const [choices, setChoices] = useState<LogicPiece[]>(() => makeChoices(P('kor', 'piros', true, false)));
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const cur = chain[chain.length - 1];

  const restart = () => {
    const p = randomPiece();
    setChain([p]);
    setChoices(makeChoices(p));
    setMsg(null);
  };

  const choose = (p: LogicPiece) => {
    const d = pieceDiff(cur, p);
    if (d.length === 1) {
      setChain([...chain, p].slice(-5));
      setChoices(makeChoices(p));
      setMsg({ ok: true, text: `Jó! Csak ${d[0]} más. Folytasd a láncot!` });
    } else {
      setMsg({ ok: false, text: `Ez ${d.length} dologban más: ${d.join(', ')}. Csak egy dologban térhet el!` });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100 text-sm font-bold">
        Építs láncot! A következő lap csak egy dologban térjen el az utolsótól.
      </div>
      <svg viewBox="0 0 360 80" className="w-full max-w-[420px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="358" height="78" rx="12" fill="#faf5ff" stroke="#ddd6fe" />
        {chain.map((p, i) => (
          <g key={i}>
            {i > 0 && <ArrowPart dir="R" cx={i * 70 + 5} cy={40} size={6} color="#94a3b8" />}
            <LogicPiecePart piece={p} cx={40 + i * 70} cy={40} unit={18} />
          </g>
        ))}
      </svg>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Melyik lap jöhet? Koppints rá!</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
        {choices.map((p, i) => (
          <button
            key={`${chain.length}-${i}`}
            type="button"
            onClick={() => choose(p)}
            className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-violet-400 min-h-[88px] flex items-center justify-center"
            aria-label={describePiece(p)}
          >
            <svg viewBox="0 0 80 80" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
              <LogicPiecePart piece={p} cx={40} cy={40} unit={22} />
            </svg>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={restart} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
