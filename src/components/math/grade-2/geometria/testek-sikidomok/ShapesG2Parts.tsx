import React, { useState } from 'react';

export const SHAPES_FONT = 'system-ui, Segoe UI, sans-serif';

const HID = '4 3';

const shade = (hex: string, f: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(f >= 0 ? v + (255 - v) * f : v * (1 + f))));
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export type SolidKind = 'kocka' | 'teglatest' | 'gomb' | 'henger' | 'kup' | 'gula';
export const SOLID_NAMES: Record<SolidKind, string> = {
  kocka: 'kocka',
  teglatest: 'téglatest',
  gomb: 'gömb',
  henger: 'henger',
  kup: 'kúp',
  gula: 'gúla'
};

const SOLID_COLORS: Record<SolidKind, string> = {
  kocka: '#f59e0b',
  teglatest: '#22c55e',
  gomb: '#3b82f6',
  henger: '#a855f7',
  kup: '#ec4899',
  gula: '#ef4444'
};

/**
 * Test rajza (kb. 56 × 56 egység, középen 0,0), a nem látható élek szaggatottak.
 */
export const SolidPart: React.FC<{ kind: SolidKind; cx: number; cy: number; s?: number; color?: string }> = ({
  kind,
  cx,
  cy,
  s = 1,
  color
}) => {
  const c = color ?? SOLID_COLORS[kind];
  const st = shade(c, -0.55);
  const sw = 1.8 / Math.max(0.6, s) + 0.4;
  let body: React.ReactNode = null;
  if (kind === 'kocka') {
    body = (
      <g strokeLinejoin="round">
        <polygon points="-24,-12 -12,-24 24,-24 12,-12" fill={shade(c, 0.35)} stroke={st} strokeWidth={sw} />
        <polygon points="12,-12 24,-24 24,12 12,24" fill={shade(c, -0.2)} stroke={st} strokeWidth={sw} />
        <rect x="-24" y="-12" width="36" height="36" fill={c} stroke={st} strokeWidth={sw} />
        <g stroke={st} strokeWidth={sw * 0.8} strokeDasharray={HID} fill="none">
          <line x1="-12" y1="12" x2="-12" y2="-24" />
          <line x1="-12" y1="12" x2="24" y2="12" />
          <line x1="-12" y1="12" x2="-24" y2="24" />
        </g>
      </g>
    );
  } else if (kind === 'teglatest') {
    body = (
      <g strokeLinejoin="round">
        <polygon points="-30,-8 -18,-20 30,-20 18,-8" fill={shade(c, 0.35)} stroke={st} strokeWidth={sw} />
        <polygon points="18,-8 30,-20 30,8 18,20" fill={shade(c, -0.2)} stroke={st} strokeWidth={sw} />
        <rect x="-30" y="-8" width="48" height="28" fill={c} stroke={st} strokeWidth={sw} />
        <g stroke={st} strokeWidth={sw * 0.8} strokeDasharray={HID} fill="none">
          <line x1="-18" y1="8" x2="-18" y2="-20" />
          <line x1="-18" y1="8" x2="30" y2="8" />
          <line x1="-18" y1="8" x2="-30" y2="20" />
        </g>
      </g>
    );
  } else if (kind === 'gomb') {
    body = (
      <g>
        <circle cx="0" cy="0" r="25" fill={c} stroke={st} strokeWidth={sw} />
        <path d="M -25 0 A 25 8 0 0 0 25 0" fill="none" stroke={st} strokeWidth={sw * 0.7} />
        <path d="M -25 0 A 25 8 0 0 1 25 0" fill="none" stroke={st} strokeWidth={sw * 0.6} strokeDasharray={HID} />
        <ellipse cx="-9" cy="-11" rx="7" ry="4.5" fill="#ffffff" opacity="0.55" />
      </g>
    );
  } else if (kind === 'henger') {
    body = (
      <g>
        <path d="M -20 -18 L -20 18 A 20 7 0 0 0 20 18 L 20 -18 Z" fill={c} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M -20 18 A 20 7 0 0 1 20 18" fill="none" stroke={st} strokeWidth={sw * 0.8} strokeDasharray={HID} />
        <ellipse cx="0" cy="-18" rx="20" ry="7" fill={shade(c, 0.35)} stroke={st} strokeWidth={sw} />
      </g>
    );
  } else if (kind === 'kup') {
    body = (
      <g>
        <path d="M 0 -27 L -22 18 A 22 7 0 0 0 22 18 Z" fill={c} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M -22 18 A 22 7 0 0 1 22 18" fill="none" stroke={st} strokeWidth={sw * 0.8} strokeDasharray={HID} />
      </g>
    );
  } else {
    body = (
      <g strokeLinejoin="round">
        <polygon points="0,-27 -24,22 14,22" fill={c} stroke={st} strokeWidth={sw} />
        <polygon points="0,-27 14,22 26,10" fill={shade(c, -0.25)} stroke={st} strokeWidth={sw} />
        <g stroke={st} strokeWidth={sw * 0.8} strokeDasharray={HID} fill="none">
          <line x1="-12" y1="10" x2="-24" y2="22" />
          <line x1="-12" y1="10" x2="26" y2="10" />
          <line x1="-12" y1="10" x2="0" y2="-27" />
        </g>
      </g>
    );
  }
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>{body}</g>;
};

export type FlatKind = 'kor' | 'haromszog' | 'negyzet' | 'teglalap' | 'otszog' | 'hatszog' | 'nyolcszog' | 'negyszog' | 'felkor';
export const FLAT_NAMES: Record<FlatKind, string> = {
  kor: 'kör',
  haromszog: 'háromszög',
  negyzet: 'négyzet',
  teglalap: 'téglalap',
  otszog: 'ötszög',
  hatszog: 'hatszög',
  nyolcszog: 'nyolcszög',
  negyszog: 'négyszög',
  felkor: 'félkör'
};

const FLAT_COLORS: Record<FlatKind, string> = {
  kor: '#facc15',
  haromszog: '#38bdf8',
  negyzet: '#f87171',
  teglalap: '#4ade80',
  otszog: '#c084fc',
  hatszog: '#fb923c',
  nyolcszog: '#2dd4bf',
  negyszog: '#f472b6',
  felkor: '#fde047'
};

const regular = (n: number, r: number, rot = -90) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((rot + (360 / n) * i) * Math.PI) / 180;
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

export const flatPoints = (kind: FlatKind): string | null => {
  switch (kind) {
    case 'haromszog':
      return '0,-22 25,20 -25,20';
    case 'negyzet':
      return '-20,-20 20,-20 20,20 -20,20';
    case 'teglalap':
      return '-28,-15 28,-15 28,15 -28,15';
    case 'otszog':
      return regular(5, 24);
    case 'hatszog':
      return regular(6, 24, 0);
    case 'nyolcszog':
      return regular(8, 24, 22.5);
    case 'negyszog':
      return '-16,-18 22,-12 26,18 -26,16';
    default:
      return null;
  }
};

/** Síkidom (kitöltve), kb. 50 × 44 egység, középen 0,0. */
export const FlatPart: React.FC<{ kind: FlatKind; cx: number; cy: number; s?: number; color?: string; outline?: boolean }> = ({
  kind,
  cx,
  cy,
  s = 1,
  color,
  outline
}) => {
  const c = color ?? FLAT_COLORS[kind];
  const fill = outline ? 'none' : c;
  const stroke = outline ? '#334155' : shade(c, -0.5);
  const sw = 2.2 / Math.max(0.6, s) + 0.3;
  const dash = outline ? '5 4' : undefined;
  let body: React.ReactNode;
  if (kind === 'kor') {
    body = <circle cx="0" cy="0" r="22" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />;
  } else if (kind === 'felkor') {
    body = <path d="M -26 12 A 26 26 0 0 1 26 12 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />;
  } else {
    body = <polygon points={flatPoints(kind) ?? ''} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />;
  }
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>{body}</g>;
};

/** Síkidom számolópálcikákból: minden oldal más színű pálcika. */
export const SticksPart: React.FC<{ kind: FlatKind; cx: number; cy: number; s?: number }> = ({ kind, cx, cy, s = 1 }) => {
  const pts = (flatPoints(kind) ?? '').split(' ').map((p) => p.split(',').map(Number));
  const cols = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316', '#14b8a6', '#ec4899'];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      {pts.map((p, i) => {
        const q = pts[(i + 1) % pts.length];
        const dx = q[0] - p[0];
        const dy = q[1] - p[1];
        const k = 0.06;
        return (
          <line
            key={i}
            x1={p[0] + dx * k}
            y1={p[1] + dy * k}
            x2={q[0] - dx * k}
            y2={q[1] - dy * k}
            stroke={cols[i % cols.length]}
            strokeWidth={5 / s + 1}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

/**
 * Kockaépítmény: oszlopmagasságok (egy sor mélyen vagy `depth` sor mélyen).
 * x, y = az első oszlop alsó bal sarka (elöl).
 */
export const CubeBuildingPart: React.FC<{ heights: number[]; x: number; y: number; size?: number; depth?: number; color?: string }> = ({
  heights,
  x,
  y,
  size = 22,
  depth = 1,
  color = '#93c5fd'
}) => {
  const d = size * 0.45;
  const st = '#1e3a8a';
  const cubes: React.ReactNode[] = [];
  for (let z = depth - 1; z >= 0; z--) {
    heights.forEach((h, i) => {
      for (let l = 0; l < h; l++) {
        const fx = x + i * size + z * d;
        const fy = y - (l + 1) * size - z * d;
        cubes.push(
          <g key={`${z}-${i}-${l}`} strokeLinejoin="round">
            <polygon
              points={`${fx},${fy} ${fx + d},${fy - d} ${fx + size + d},${fy - d} ${fx + size},${fy}`}
              fill={shade(color, 0.5)}
              stroke={st}
              strokeWidth="1.4"
            />
            <polygon
              points={`${fx + size},${fy} ${fx + size + d},${fy - d} ${fx + size + d},${fy + size - d} ${fx + size},${fy + size}`}
              fill={shade(color, -0.25)}
              stroke={st}
              strokeWidth="1.4"
            />
            <rect x={fx} y={fy} width={size} height={size} fill={color} stroke={st} strokeWidth="1.4" />
          </g>
        );
      }
    });
  }
  return <g>{cubes}</g>;
};

// ---------------------------------------------------------------------------
// Laborok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const MsgBox: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const makeTarget = (): number[] => {
  const n = rnd(3, 5);
  return Array.from({ length: n }, () => rnd(1, 4));
};

/** Labor I: Kockaépítő – építsd meg ugyanazt! */
export const CubeBuilderLab: React.FC = () => {
  const [target, setTarget] = useState<number[]>([2, 3, 1, 2]);
  const [mine, setMine] = useState<number[]>([0, 0, 0, 0]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const next = () => {
    const t = makeTarget();
    setTarget(t);
    setMine(t.map(() => 0));
    setMsg(null);
  };

  const change = (i: number, delta: number) => {
    setMine((m) => m.map((v, j) => (j === i ? Math.max(0, Math.min(4, v + delta)) : v)));
    setMsg(null);
  };

  const check = () => {
    const wrong = target.map((h, i) => (mine[i] !== h ? i + 1 : 0)).filter(Boolean);
    const total = target.reduce((a, b) => a + b, 0);
    if (wrong.length === 0) {
      setMsg({ ok: true, text: `Pontosan ugyanaz! Ehhez az épülethez ${total} kocka kellett.` });
    } else {
      setMsg({ ok: false, text: `Ezek az oszlopok még nem jók: ${wrong.join('., ')}. Számold meg a kockákat alulról fölfelé!` });
    }
  };

  const size = 26;
  const w = target.length * size + 30;
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100 text-sm font-bold">
        Építsd meg ugyanezt kockákból! Nyomd a + gombot az oszlopok alatt.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div className="text-center">
          <p className="text-xs font-bold text-slate-500 mb-1">Ezt kell megépíteni:</p>
          <svg viewBox={`0 0 ${w} 140`} className="w-full max-w-[220px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="128" width={w} height="6" rx="3" fill="#a8a29e" />
            <CubeBuildingPart heights={target} x={8} y={128} size={size} color="#fca5a5" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-slate-500 mb-1">A te épületed:</p>
          <svg viewBox={`0 0 ${w} 140`} className="w-full max-w-[220px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="128" width={w} height="6" rx="3" fill="#a8a29e" />
            <CubeBuildingPart heights={mine} x={8} y={128} size={size} />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {mine.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 dark:bg-slate-800 p-1.5 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500">{i + 1}. oszlop</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => change(i, -1)} className="w-11 h-11 rounded-lg bg-slate-200 text-slate-800 font-black text-lg">
                −
              </button>
              <button type="button" onClick={() => change(i, 1)} className="w-11 h-11 rounded-lg bg-blue-600 text-white font-black text-lg">
                +
              </button>
            </div>
            <span className="text-sm font-black text-slate-700 dark:text-slate-200">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">
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

type PrintKind = 'kor' | 'negyzet' | 'teglalap' | 'haromszog';
const PRINT_SOLIDS: Record<PrintKind, SolidKind[]> = {
  kor: ['henger', 'kup'],
  negyzet: ['kocka', 'gula'],
  teglalap: ['teglatest'],
  haromszog: ['gula']
};
const ALL_SOLIDS: SolidKind[] = ['kocka', 'teglatest', 'gomb', 'henger', 'kup', 'gula'];
const PRINT_NAMES: Record<PrintKind, string> = { kor: 'kört', negyzet: 'négyzetet', teglalap: 'téglalapot', haromszog: 'háromszöget' };

/** Labor II: Lenyomat-nyomozó – melyik test hagyhatta ezt a nyomot? */
export const ImprintLab: React.FC = () => {
  const [print, setPrint] = useState<PrintKind>('kor');
  const [sel, setSel] = useState<SolidKind[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const next = () => {
    const opts = (['kor', 'negyzet', 'teglalap', 'haromszog'] as PrintKind[]).filter((p) => p !== print);
    setPrint(opts[rnd(0, opts.length - 1)]);
    setSel([]);
    setMsg(null);
  };

  const toggle = (k: SolidKind) => {
    setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
    setMsg(null);
  };

  const check = () => {
    const good = PRINT_SOLIDS[print];
    const missing = good.filter((g) => !sel.includes(g));
    const extra = sel.filter((x) => !good.includes(x));
    if (sel.length === 0) {
      setMsg({ ok: false, text: 'Koppints azokra a testekre, amelyek ilyen nyomot hagyhatnak!' });
    } else if (extra.length > 0) {
      const e = extra[0];
      setMsg({
        ok: false,
        text:
          e === 'gomb'
            ? 'A gömbnek nincs lapja, ezért nem tudod körberajzolni!'
            : `A ${SOLID_NAMES[e]} egyik lapja sem ilyen. Nézd meg a lapjait!`
      });
    } else if (missing.length > 0) {
      setMsg({ ok: false, text: `Jó, de van még egy test, amelyik ${PRINT_NAMES[print]} hagy. Keresd meg!` });
    } else {
      setMsg({
        ok: true,
        text:
          good.length === 2
            ? `Szuper! A ${SOLID_NAMES[good[0]]} és a ${SOLID_NAMES[good[1]]} is hagyhat ilyen nyomot.`
            : `Szuper! Csak a ${SOLID_NAMES[good[0]]} hagyhat ilyen nyomot.`
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100 text-sm font-bold">
        Valaki egy test lapját körberajzolta. Melyik test lehetett? Lehet, hogy több is jó!
      </div>
      <svg viewBox="0 0 160 90" className="w-full max-w-[220px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="158" height="88" rx="10" fill="#fffbeb" stroke="#fcd34d" />
        <FlatPart kind={print} cx={80} cy={46} s={1.35} outline />
      </svg>
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {ALL_SOLIDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => toggle(k)}
            className={`rounded-2xl border-2 min-h-[96px] flex flex-col items-center justify-center p-1 ${
              sel.includes(k) ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
            }`}
          >
            <svg viewBox="0 0 70 70" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
              <SolidPart kind={k} cx={35} cy={36} s={1} />
            </svg>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{SOLID_NAMES[k]}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">
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
