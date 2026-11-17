import React from 'react';

// ---------------------------------------------------------------------------
// XIV. Ismerkedés a törtekkel – 3. Törtrész mennyiségekből
// Közös rajzelemek, szavak és labor-generátorok (a tudáspróba is használja).
// ---------------------------------------------------------------------------

export const FONT = 'Nunito, Arial, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const QCLS = 'w-full max-w-[280px] h-auto mx-auto';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** „a 12 …-e” – a könyv szóhasználata. */
export const PART_OF: Record<number, string> = {
  2: 'fele',
  3: 'harmada',
  4: 'negyede',
  5: 'ötöde',
  6: 'hatoda',
  8: 'nyolcada',
  10: 'tizede'
};
/** „a … -át/-ét használtuk fel” */
export const PART_ACC: Record<number, string> = {
  2: 'felét',
  3: 'harmadát',
  4: 'negyedét',
  5: 'ötödét',
  6: 'hatodát',
  8: 'nyolcadát',
  10: 'tizedét'
};
/** „1 negyed rész” */
export const PART_NAME: Record<number, string> = {
  2: 'ketted',
  3: 'harmad',
  4: 'negyed',
  5: 'ötöd',
  6: 'hatod',
  8: 'nyolcad',
  10: 'tized'
};

/** Kérdésábra-keret (240 széles). */
export const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={QCLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Nagy gomb a laborokhoz. */
export const OptButton: React.FC<{ v: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null; disabled?: boolean }> = ({ v, onClick, state, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${
      state === 'ok'
        ? 'bg-emerald-500 border-emerald-700 text-white'
        : state === 'bad'
        ? 'bg-rose-100 border-rose-400 text-rose-700'
        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

// ---------------------------------------------------------------------------
// Rajzelemek
// ---------------------------------------------------------------------------

/** Egy alma. */
export const Apple: React.FC<{ x: number; y: number; r?: number; color?: string; faded?: boolean }> = ({ x, y, r = 8, color = '#ef4444', faded }) => (
  <g opacity={faded ? 0.3 : 1}>
    <circle cx={x} cy={y} r={r} fill={color} stroke="#7f1d1d" strokeWidth={Math.max(1, r / 6)} />
    <line x1={x} y1={y - r} x2={x + r * 0.2} y2={y - r * 1.45} stroke="#78350f" strokeWidth={Math.max(1.2, r / 5)} strokeLinecap="round" />
    <ellipse cx={x + r * 0.55} cy={y - r * 1.2} rx={r * 0.38} ry={r * 0.2} fill="#22c55e" />
  </g>
);

/** Egy szem cukorka (kerek). */
export const Candy: React.FC<{ x: number; y: number; r?: number; color?: string; faded?: boolean }> = ({ x, y, r = 7, color = '#a855f7', faded }) => (
  <g opacity={faded ? 0.3 : 1}>
    <circle cx={x} cy={y} r={r} fill={color} stroke="#3b0764" strokeWidth={Math.max(1, r / 6)} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.25} fill="#ffffff" opacity="0.7" />
  </g>
);

/**
 * n tárgy k egyenlő sorban (egy sor = egy rész).
 * group: szaggatott keret minden sor körül; hl: ennyi sor kiemelve.
 */
export const ObjRows: React.FC<{
  x: number;
  y: number;
  n: number;
  k: number;
  gap?: number;
  rowGap?: number;
  r?: number;
  kind?: 'apple' | 'candy';
  group?: boolean;
  hl?: number;
  fadedRows?: number;
  color?: string;
}> = ({ x, y, n, k, gap = 22, rowGap = 26, r = 8, kind = 'apple', group = true, hl = 0, fadedRows = 0, color }) => {
  const m = n / k;
  return (
    <g>
      {Array.from({ length: k }, (_, row) => (
        <g key={row}>
          {group && (
            <rect
              x={x - r - 5}
              y={y + row * rowGap - r - 6}
              width={(m - 1) * gap + 2 * r + 10}
              height={2 * r + 10}
              rx="8"
              fill={row < hl ? '#fef9c3' : 'none'}
              stroke={row < hl ? '#ca8a04' : '#94a3b8'}
              strokeWidth="1.5"
              strokeDasharray={row < hl ? undefined : '4 3'}
            />
          )}
          {Array.from({ length: m }, (_, i) =>
            kind === 'apple' ? (
              <Apple key={i} x={x + i * gap} y={y + row * rowGap} r={r} color={color} faded={row >= k - fadedRows} />
            ) : (
              <Candy key={i} x={x + i * gap} y={y + row * rowGap} r={r} color={color} faded={row >= k - fadedRows} />
            )
          )}
        </g>
      ))}
    </g>
  );
};

/** Csík n egyenlő részre osztva, fölötte kapocs az egész nevével. */
export const Strip: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  n: number;
  fill?: number[];
  cross?: number[];
  labels?: (string | null)[];
  top?: string;
  color?: string;
  fs?: number;
  sw?: number;
}> = ({ x, y, w, h = 30, n, fill = [], cross = [], labels = [], top, color = '#38bdf8', fs = 13, sw = 1.8 }) => {
  const pw = w / n;
  return (
    <g>
      {top && (
        <g>
          <path d={`M ${x} ${y - 4} L ${x} ${y - 10} L ${x + w} ${y - 10} L ${x + w} ${y - 4}`} fill="none" stroke="#334155" strokeWidth="1.5" />
          <text x={x + w / 2} y={y - 15} textAnchor="middle" fontSize={fs + 1} fontWeight="bold" fill="#0f172a">{top}</text>
        </g>
      )}
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x + i * pw} y={y} width={pw} height={h} fill={fill.includes(i) ? color : '#ffffff'} stroke="#334155" strokeWidth={sw} />
          {cross.includes(i) && (
            <g stroke="#475569" strokeWidth="2">
              <line x1={x + i * pw + 3} y1={y + 3} x2={x + (i + 1) * pw - 3} y2={y + h - 3} />
              <line x1={x + (i + 1) * pw - 3} y1={y + 3} x2={x + i * pw + 3} y2={y + h - 3} />
            </g>
          )}
          {labels[i] && (
            <text
              x={x + i * pw + pw / 2}
              y={y + h / 2 + fs * 0.36}
              textAnchor="middle"
              fontSize={labels[i] === '?' ? fs + 3 : fs}
              fontWeight="bold"
              fill={labels[i] === '?' ? UNK : '#0f172a'}
            >
              {labels[i]}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

/** Körcikk 12-től az óramutató járása szerint, „min” percnyi. */
export const sectorPath = (cx: number, cy: number, r: number, min: number) => {
  if (min >= 60) return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  const [x1, y1] = polar(cx, cy, r, 0);
  const [x2, y2] = polar(cx, cy, r, min * 6);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${min > 30 ? 1 : 0} 1 ${x2} ${y2} Z`;
};

/** Óralap: „n” részre osztva (vonalakkal), „shade” perc színezve 12-től. */
export const ClockPie: React.FC<{ cx: number; cy: number; r: number; n?: number; shade?: number; color?: string; nums?: boolean; sw?: number; fs?: number }> = ({
  cx,
  cy,
  r,
  n = 0,
  shade = 0,
  color = '#fbbf24',
  nums = true,
  sw = 2.5,
  fs
}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#334155" strokeWidth={sw} />
    {shade > 0 && <path d={sectorPath(cx, cy, r, shade)} fill={color} stroke="#334155" strokeWidth={sw * 0.6} />}
    {Array.from({ length: 12 }, (_, i) => {
      const [a, b] = polar(cx, cy, r, i * 30);
      const [c, d] = polar(cx, cy, r * 0.86, i * 30);
      return <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#334155" strokeWidth={sw * 0.7} />;
    })}
    {n > 1 &&
      Array.from({ length: n }, (_, i) => {
        const [a, b] = polar(cx, cy, r, (360 * i) / n);
        return <line key={`p${i}`} x1={cx} y1={cy} x2={a} y2={b} stroke="#334155" strokeWidth={sw * 0.8} />;
      })}
    {nums &&
      [12, 3, 6, 9].map((v, i) => {
        const [a, b] = polar(cx, cy, r * 0.66, i * 90);
        const f = fs ?? Math.max(9, r * 0.28);
        return (
          <text key={v} x={a} y={b + f * 0.36} textAnchor="middle" fontSize={f} fontWeight="bold" fill="#334155">
            {v}
          </text>
        );
      })}
    <circle cx={cx} cy={cy} r={Math.max(2, r * 0.06)} fill="#334155" />
  </g>
);

/** Mérőhenger 10 beosztással (1 l = 10 dl), „level” dl víz. */
export const Jug: React.FC<{ x: number; y: number; w?: number; h?: number; level?: number; top?: string; nums?: boolean; sw?: number }> = ({
  x,
  y,
  w = 46,
  h = 110,
  level = 0,
  top = '1 l',
  nums = false,
  sw = 2
}) => {
  const step = h / 10;
  return (
    <g>
      {level > 0 && <rect x={x} y={y + h - level * step} width={w} height={level * step} fill="#7dd3fc" />}
      <path d={`M ${x} ${y - 6} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y - 6}`} fill="none" stroke="#334155" strokeWidth={sw} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x} y1={y + h - i * step} x2={x + (i % 5 === 0 ? w * 0.45 : w * 0.25)} y2={y + h - i * step} stroke="#334155" strokeWidth={sw * 0.7} />
      ))}
      {nums &&
        Array.from({ length: 11 }, (_, i) =>
          i % 5 === 0 ? (
            <text key={`t${i}`} x={x + w + 4} y={y + h - i * step + 4} fontSize="10" fill="#334155">
              {i} dl
            </text>
          ) : null
        )}
      {top && (
        <text x={x + w / 2} y={y - 11} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
          {top}
        </text>
      )}
    </g>
  );
};

/** Szakasz centiméteres vonalzóval alatta. */
export const SegmentRuler: React.FC<{ x: number; y: number; cm: number; u?: number; colorCm?: number; color?: string; nums?: boolean; label?: string; numStep?: number }> = ({
  x,
  y,
  cm,
  u = 16,
  colorCm = 0,
  color = '#16a34a',
  nums = true,
  label,
  numStep = 1
}) => (
  <g>
    <line x1={x} y1={y} x2={x + cm * u} y2={y} stroke="#1e293b" strokeWidth="3" />
    {colorCm > 0 && <line x1={x} y1={y} x2={x + colorCm * u} y2={y} stroke={color} strokeWidth="6" />}
    <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke="#1e293b" strokeWidth="2.5" />
    <line x1={x + cm * u} y1={y - 7} x2={x + cm * u} y2={y + 7} stroke="#1e293b" strokeWidth="2.5" />
    {label && (
      <text x={x + (cm * u) / 2} y={y - 12} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        {label}
      </text>
    )}
    {nums && (
      <g>
        <rect x={x - 6} y={y + 12} width={cm * u + 12} height="26" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
        {Array.from({ length: cm + 1 }, (_, i) => (
          <g key={i}>
            <line x1={x + i * u} y1={y + 12} x2={x + i * u} y2={y + 21} stroke="#78350f" strokeWidth="1.2" />
            {i % numStep === 0 && (
              <text x={x + i * u} y={y + 33} textAnchor="middle" fontSize="9" fill="#78350f">
                {i}
              </text>
            )}
          </g>
        ))}
      </g>
    )}
  </g>
);

/** Út két végéről egymás felé: bal a / n rész, jobb b / n rész. */
export const Road: React.FC<{ x: number; y: number; w: number; n: number; a: number; b: number; total: string; gapLabel?: string }> = ({ x, y, w, n, a, b, total, gapLabel = '?' }) => {
  const pw = w / n;
  const xa = x + a * pw;
  const xb = x + w - b * pw;
  return (
    <g>
      <path d={`M ${x} ${y + 14} L ${x} ${y + 20} L ${x + w} ${y + 20} L ${x + w} ${y + 14}`} fill="none" stroke="#334155" strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{total}</text>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n + 1 }, (_, i) => (
        <line key={i} x1={x + i * pw} y1={y - 6} x2={x + i * pw} y2={y + 6} stroke="#334155" strokeWidth="2" />
      ))}
      <path d={`M ${x} ${y - 6} Q ${(x + xa) / 2} ${y - 34} ${xa} ${y - 8}`} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d={`M ${xa - 8} ${y - 13} L ${xa} ${y - 7} L ${xa - 1} ${y - 17}`} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d={`M ${x + w} ${y - 6} Q ${(x + w + xb) / 2} ${y - 34} ${xb} ${y - 8}`} fill="none" stroke="#ea580c" strokeWidth="2.5" />
      <path d={`M ${xb + 8} ${y - 13} L ${xb} ${y - 7} L ${xb + 1} ${y - 17}`} fill="none" stroke="#ea580c" strokeWidth="2.5" />
      <circle cx={x} cy={y} r="6" fill="#2563eb" />
      <circle cx={x + w} cy={y} r="6" fill="#ea580c" />
      {xb - xa > 8 && (
        <g>
          <line x1={xa} y1={y + 2} x2={xb} y2={y + 2} stroke={UNK} strokeWidth="4" opacity="0.6" />
          <text x={(xa + xb) / 2} y={y - 12} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>{gapLabel}</text>
        </g>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Labor-generátorok
// ---------------------------------------------------------------------------

export interface ShareTask {
  total: number;
  k: number;
  kind: 'apple' | 'candy';
}

/** Labor I: n tárgy k tálba (k = 2…5, egy tálba 2…5 jut). */
export const makeShareTask = (prev?: ShareTask): ShareTask => {
  let t: ShareTask;
  do {
    const k = rnd(2, 5);
    const m = rnd(2, k === 5 ? 4 : 5);
    t = { total: k * m, k, kind: Math.random() < 0.5 ? 'apple' : 'candy' };
  } while (prev && prev.total === t.total && prev.k === t.k);
  return t;
};

export const shareOptions = (t: ShareTask): number[] => {
  const v = t.total / t.k;
  const cands = [t.k, t.total - v, v + 1, v - 1, t.total - t.k].filter((c) => c > 0 && c !== v);
  const uniq = Array.from(new Set(cands)).slice(0, 3);
  return shuffle([v, ...uniq]);
};

export interface UnitTask {
  whole: string; // „1 kg”
  small: string; // „dkg”
  total: number; // 100
  n: number;
  kind: 'kg' | 'm' | 'ora' | 'l' | 'dl' | 'cm';
}

const UNIT_POOL: { whole: string; small: string; total: number; ns: number[]; kind: UnitTask['kind'] }[] = [
  { whole: '1 kg', small: 'dkg', total: 100, ns: [2, 4, 5, 10], kind: 'kg' },
  { whole: '1 m', small: 'cm', total: 100, ns: [2, 4, 5, 10], kind: 'm' },
  { whole: '2 m', small: 'cm', total: 200, ns: [2, 4, 5, 10], kind: 'm' },
  { whole: '1 óra', small: 'perc', total: 60, ns: [2, 3, 4, 6, 10], kind: 'ora' },
  { whole: '2 óra', small: 'perc', total: 120, ns: [2, 3, 4, 6, 10], kind: 'ora' },
  { whole: '1 l', small: 'dl', total: 10, ns: [2, 5, 10], kind: 'l' },
  { whole: '1 dl', small: 'cl', total: 10, ns: [2, 5, 10], kind: 'dl' },
  { whole: '1 cm', small: 'mm', total: 10, ns: [2, 5, 10], kind: 'cm' }
];

export const makeUnitTask = (prev?: UnitTask): UnitTask => {
  let t: UnitTask;
  do {
    const p = pick(UNIT_POOL);
    t = { whole: p.whole, small: p.small, total: p.total, n: pick(p.ns), kind: p.kind };
  } while (prev && prev.whole === t.whole && prev.n === t.n);
  return t;
};

export const unitOptions = (t: UnitTask): number[] => {
  const v = t.total / t.n;
  const cands = [t.n, t.total - v, v * 2, t.total / (t.n === 2 ? 4 : 2), v + 5].filter((c) => c > 0 && Number.isInteger(c) && c !== v);
  return shuffle([v, ...Array.from(new Set(cands)).slice(0, 3)]);
};

export const unitHint = (t: UnitTask, chosen: number): string => {
  const v = t.total / t.n;
  if (chosen === t.n) return `Nem ${chosen} ${t.small}! Előbb váltsd át: ${t.whole} = ${t.total} ${t.small}. Aztán oszd el ${t.n} egyenlő részre!`;
  if (chosen === t.total - v) return `Ez a maradék ${t.n - 1} rész! Egyetlen ${PART_NAME[t.n]} rész kell.`;
  return `Oszd el: ${t.total} : ${t.n}. Számold meg a csíkon is!`;
};

/** Névelő a szám elé: „az 5”, „a 12”, „az 1 kg”. */
export const art = (s: number | string): string => {
  const t = String(s);
  const n = parseInt(t, 10);
  if (Number.isNaN(n)) return 'a';
  const vowel = n === 1 || n === 1000 || n === 5 || (n >= 50 && n <= 59) || (n >= 500 && n <= 599);
  return vowel ? 'az' : 'a';
};
/** Nagybetűs változat mondat elejére. */
export const Art = (s: number | string) => (art(s) === 'az' ? 'Az' : 'A');
