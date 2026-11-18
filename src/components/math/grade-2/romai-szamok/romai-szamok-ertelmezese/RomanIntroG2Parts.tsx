import React from 'react';

/**
 * Közös római szám segédek a VI. témakörhöz (2. osztály, 1–20, csak I, V, X).
 * A 2–4. lecke is innen importál.
 */

export const ROMAN_FONT = 'Georgia, "Times New Roman", serif';
export const UI_FONT = 'system-ui, Segoe UI, sans-serif';

const ROMAN_TABLE: string[] = [
  '',
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'
];

/** 1–20 → római szám (I, V, X). Más értékre üres szöveg (nincs 0!). */
export const toRoman = (n: number): string => (Number.isInteger(n) && n >= 1 && n <= 20 ? ROMAN_TABLE[n] : '');

const SIGN_VALUE: Record<string, number> = { I: 1, V: 5, X: 10 };

/** Jelekből számolt érték (jobbra ad, balra elvesz). Szabálytalan írásra is ad értéket. */
export const rawRomanValue = (s: string): number => {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const v = SIGN_VALUE[s[i]] ?? 0;
    const next = SIGN_VALUE[s[i + 1]] ?? 0;
    total += v < next ? -v : v;
  }
  return total;
};

/** Szabályos-e a római szám 1 és 20 között. */
export const isValidRoman = (s: string): boolean => {
  if (!s) return false;
  const v = rawRomanValue(s);
  return v >= 1 && v <= 20 && toRoman(v) === s;
};

/** Szabályos római szám értéke, különben null. */
export const fromRoman = (s: string): number | null => (isValidRoman(s) ? rawRomanValue(s) : null);

/** Miért hibás egy jelsor? Rövid, gyerekbarát mondat. */
export const romanProblem = (s: string): string | null => {
  if (!s) return 'Még nem raktál le jelet.';
  if (isValidRoman(s)) return null;
  if (/IIII|XXXX/.test(s)) return 'Egymás mellé legfeljebb 3 egyforma jel kerülhet!';
  if (/V.*V/.test(s)) return 'A V jel csak egyszer szerepelhet!';
  if (/II[VX]/.test(s)) return 'Balra csak egy I állhat a V vagy az X előtt!';
  if (/V[X]/.test(s)) return 'A V nem állhat az X előtt!';
  if (rawRomanValue(s) > 20) return 'Ez több, mint 20! Mi most csak 20-ig írunk.';
  return 'Ez így nem szabályos római szám.';
};

/** Egy-egy pálcika magassága/szélessége a jelekhez. */
const signWidth = (c: string, h: number) => (c === 'I' ? h * 0.22 : h * 0.62);
const GAP = 0.16;

/** Pálcikákkal kirakott római szám teljes szélessége. */
export const stickRomanWidth = (s: string, h: number): number =>
  s.split('').reduce((acc, c, i) => acc + signWidth(c, h) + (i > 0 ? h * GAP : 0), 0);

const Stick: React.FC<{ x1: number; y1: number; x2: number; y2: number; w: number; color: string; head: string }> = ({
  x1,
  y1,
  x2,
  y2,
  w,
  color,
  head
}) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#78350f" strokeWidth={w + 1.6} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
    <circle cx={x1} cy={y1} r={w * 0.9} fill={head} stroke="#7f1d1d" strokeWidth="1" />
  </g>
);

/**
 * Pálcikákból kirakott római szám. (x, y) = bal felső sarok, h = magasság.
 * I = 1 pálcika, V = 2 ferde pálcika, X = 2 keresztbe tett pálcika.
 */
export const StickRomanPart: React.FC<{
  value: string;
  x: number;
  y: number;
  h: number;
  color?: string;
  head?: string;
  highlightIndex?: number;
}> = ({ value, x, y, h, color = '#f59e0b', head = '#dc2626', highlightIndex }) => {
  const w = Math.max(3, h * 0.09);
  let cx = x;
  return (
    <g>
      {value.split('').map((c, i) => {
        const sw = signWidth(c, h);
        const left = cx + (i > 0 ? h * GAP : 0);
        cx = left + sw;
        const hl = highlightIndex === i;
        const col = hl ? '#38bdf8' : color;
        if (c === 'I') {
          const mx = left + sw / 2;
          return <Stick key={i} x1={mx} y1={y} x2={mx} y2={y + h} w={w} color={col} head={head} />;
        }
        if (c === 'V') {
          return (
            <g key={i}>
              <Stick x1={left} y1={y} x2={left + sw / 2} y2={y + h} w={w} color={col} head={head} />
              <Stick x1={left + sw} y1={y} x2={left + sw / 2} y2={y + h} w={w} color={col} head={head} />
            </g>
          );
        }
        return (
          <g key={i}>
            <Stick x1={left} y1={y} x2={left + sw} y2={y + h} w={w} color={col} head={head} />
            <Stick x1={left + sw} y1={y} x2={left} y2={y + h} w={w} color={col} head={head} />
          </g>
        );
      })}
    </g>
  );
};

/** Önálló SVG pálcikás római számmal (laborokhoz, kártyákhoz). */
export const StickRomanSvg: React.FC<{ value: string; h?: number; className?: string; pad?: number }> = ({
  value,
  h = 60,
  className,
  pad = 12
}) => {
  const w = Math.max(stickRomanWidth(value, h), h * 0.3);
  return (
    <svg
      viewBox={`0 0 ${w + pad * 2} ${h + pad * 2}`}
      className={className ?? 'h-20 w-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <StickRomanPart value={value} x={pad} y={pad} h={h} />
    </svg>
  );
};

/**
 * Római számlapos óra. hour = 1–12 (egész óra). A nagymutató a XII-re mutat.
 * hideNumbers: mely számok helyén legyen „?”.
 */
export const RomanClockPart: React.FC<{
  cx: number;
  cy: number;
  r: number;
  hour?: number | null;
  questionAt?: number[];
  hideAll?: boolean;
  frame?: string;
}> = ({ cx, cy, r, hour = null, questionAt = [], hideAll = false, frame = '#1d4ed8' }) => {
  const fs = Math.max(8, r * 0.2);
  return (
    <g fontFamily={ROMAN_FONT}>
      <circle cx={cx} cy={cy} r={r + r * 0.08} fill={frame} />
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const h = i + 1;
        const ang = (h * 30 - 90) * (Math.PI / 180);
        const tx = cx + Math.cos(ang) * r * 0.76;
        const ty = cy + Math.sin(ang) * r * 0.76 + fs * 0.35;
        const t1x = cx + Math.cos(ang) * r * 0.93;
        const t1y = cy + Math.sin(ang) * r * 0.93;
        const t2x = cx + Math.cos(ang) * r;
        const t2y = cy + Math.sin(ang) * r;
        const q = questionAt.includes(h);
        return (
          <g key={h}>
            <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke="#334155" strokeWidth="2" />
            {!hideAll && (
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                fontSize={q ? fs * 1.15 : fs}
                fontWeight="bold"
                fill={q ? '#dc2626' : '#0f172a'}
                fontFamily={q ? UI_FONT : ROMAN_FONT}
              >
                {q ? '?' : toRoman(h)}
              </text>
            )}
          </g>
        );
      })}
      {hour !== null && (
        <g strokeLinecap="round">
          {/* nagymutató a XII-n */}
          <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.72} stroke="#0f172a" strokeWidth={Math.max(2.5, r * 0.05)} />
          {/* kismutató */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(((hour % 12) * 30 - 90) * (Math.PI / 180)) * r * 0.46}
            y2={cy + Math.sin(((hour % 12) * 30 - 90) * (Math.PI / 180)) * r * 0.46}
            stroke="#dc2626"
            strokeWidth={Math.max(4, r * 0.09)}
          />
        </g>
      )}
      <circle cx={cx} cy={cy} r={Math.max(3, r * 0.06)} fill="#0f172a" />
    </g>
  );
};

/**
 * Vízszintes számegyenes from–to között. marks: pontok, ahová címkét teszünk felülre.
 */
export const NumberLinePart: React.FC<{
  x: number;
  y: number;
  w: number;
  from?: number;
  to?: number;
  labelEvery?: number;
  marks?: { value: number; label: string; color?: string }[];
  showNumbers?: boolean;
}> = ({ x, y, w, from = 0, to = 20, labelEvery = 1, marks = [], showNumbers = true }) => {
  const n = to - from;
  const step = w / n;
  const px = (v: number) => x + (v - from) * step;
  const fs = Math.min(12, step * 0.75);
  return (
    <g fontFamily={UI_FONT}>
      <line x1={x - 6} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x + w + 10} ${y - 4} L ${x + w + 17} ${y} L ${x + w + 10} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = from + i;
        const big = v % 5 === 0;
        return (
          <g key={v}>
            <line x1={px(v)} y1={y - (big ? 7 : 4)} x2={px(v)} y2={y + (big ? 7 : 4)} stroke="#334155" strokeWidth={big ? 2 : 1.2} />
            {showNumbers && (v - from) % labelEvery === 0 && (
              <text x={px(v)} y={y + 20} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#334155">
                {v}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={px(m.value)} y1={y - 26} x2={px(m.value)} y2={y - 8} stroke={m.color ?? '#dc2626'} strokeWidth="2" />
          <circle cx={px(m.value)} cy={y} r="4.5" fill={m.color ?? '#dc2626'} />
          <text
            x={px(m.value)}
            y={y - 30}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={m.color ?? '#dc2626'}
            fontFamily={/^[IVX]+$/.test(m.label) ? ROMAN_FONT : UI_FONT}
          >
            {m.label}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Pajzs római számmal. */
export const ShieldPart: React.FC<{ x: number; y: number; w: number; label: string; fill?: string }> = ({
  x,
  y,
  w,
  label,
  fill = '#dc2626'
}) => {
  const h = w * 1.2;
  return (
    <g>
      <path
        d={`M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h * 0.55} Q ${x + w} ${y + h * 0.85} ${x + w / 2} ${y + h} Q ${x} ${y + h * 0.85} ${x} ${y + h * 0.55} Z`}
        fill={fill}
        stroke="#7f1d1d"
        strokeWidth="2.5"
      />
      <path
        d={`M ${x + w * 0.12} ${y + h * 0.08} L ${x + w * 0.88} ${y + h * 0.08} L ${x + w * 0.88} ${y + h * 0.52} Q ${x + w * 0.88} ${y + h * 0.78} ${x + w / 2} ${y + h * 0.9} Q ${x + w * 0.12} ${y + h * 0.78} ${x + w * 0.12} ${y + h * 0.52} Z`}
        fill="#fef3c7"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <text
        x={x + w / 2}
        y={y + h * 0.5}
        textAnchor="middle"
        fontSize={label.length > 3 ? w * 0.26 : w * 0.34}
        fontWeight="bold"
        fill="#7f1d1d"
        fontFamily={label === '?' ? UI_FONT : ROMAN_FONT}
      >
        {label}
      </text>
    </g>
  );
};

/** Lekerekített kártya római (vagy arab) számmal. */
export const NumberTilePart: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  fill?: string;
  stroke?: string;
  color?: string;
  fontSize?: number;
}> = ({ x, y, w, h, label, fill = '#ede9fe', stroke = '#7c3aed', color = '#3b0764', fontSize }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={Math.min(10, h * 0.25)} fill={fill} stroke={stroke} strokeWidth="2.5" />
    <text
      x={x + w / 2}
      y={y + h / 2 + (fontSize ?? h * 0.45) * 0.36}
      textAnchor="middle"
      fontSize={fontSize ?? h * 0.45}
      fontWeight="bold"
      fill={label === '?' ? '#dc2626' : color}
      fontFamily={/^[IVX]+$/.test(label) ? ROMAN_FONT : UI_FONT}
    >
      {label}
    </text>
  </g>
);

/** Kérdésábra-keret (260 széles). */
export const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 120, w = 260 }) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={UI_FONT}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Kérdésábra: pálcikás római szám középen. */
export const StickQFig: React.FC<{ value: string; caption?: string }> = ({ value, caption }) => {
  const h = 62;
  const w = stickRomanWidth(value, h);
  return (
    <QFig h={caption ? 118 : 96}>
      <StickRomanPart value={value} x={130 - w / 2} y={16} h={h} />
      {caption && (
        <text x="130" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** Kérdésábra: római óra. */
export const ClockQFig: React.FC<{ hour?: number | null; questionAt?: number[] }> = ({ hour = null, questionAt = [] }) => (
  <QFig h={150}>
    <RomanClockPart cx={130} cy={75} r={60} hour={hour} questionAt={questionAt} />
  </QFig>
);

/** Kérdésábra: nagy római szám egy táblán. */
export const RomanBoardQFig: React.FC<{ label: string; caption?: string }> = ({ label, caption }) => (
  <QFig h={caption ? 112 : 92}>
    <NumberTilePart
      x={label.length > 5 ? 20 : 60}
      y={14}
      w={label.length > 5 ? 220 : 140}
      h={62}
      label={label}
      fill="#fef3c7"
      stroke="#d97706"
      color="#78350f"
      fontSize={label.length > 8 ? 22 : label.length > 4 ? 28 : 34}
    />
    {caption && (
      <text x="130" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        {caption}
      </text>
    )}
  </QFig>
);

/** Kérdésábra: két szám összehasonlítása (? középen). */
export const CompareQFig: React.FC<{ left: string; right: string; mid?: string }> = ({ left, right, mid = '?' }) => (
  <QFig h={92}>
    <NumberTilePart x={18} y={16} w={92} h={58} label={left} fontSize={left.length > 3 ? 24 : 30} />
    <circle cx="130" cy="45" r="17" fill="#fee2e2" stroke="#dc2626" strokeWidth="2.5" />
    <text x="130" y="53" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">
      {mid}
    </text>
    <NumberTilePart x={150} y={16} w={92} h={58} label={right} fontSize={right.length > 3 ? 24 : 30} />
  </QFig>
);

/** Kérdésábra: számegyenes jelöléssel. */
export const LineQFig: React.FC<{
  from?: number;
  to?: number;
  marks: { value: number; label: string; color?: string }[];
}> = ({ from = 0, to = 20, marks }) => (
  <QFig h={100}>
    <NumberLinePart x={18} y={58} w={216} from={from} to={to} marks={marks} labelEvery={to - from > 12 ? 5 : 1} />
  </QFig>
);

/** Kérdésábra: sorozat kártyákon. */
export const RowQFig: React.FC<{ labels: string[] }> = ({ labels }) => {
  const n = labels.length;
  const gap = 6;
  const w = Math.min(56, (240 - gap * (n - 1)) / n);
  const total = n * w + (n - 1) * gap;
  const x0 = 130 - total / 2;
  return (
    <QFig h={82}>
      {labels.map((l, i) => (
        <NumberTilePart
          key={i}
          x={x0 + i * (w + gap)}
          y={18}
          w={w}
          h={46}
          label={l}
          fontSize={l.length > 3 ? 15 : l.length > 2 ? 18 : 22}
          fill={l === '?' ? '#fee2e2' : '#ede9fe'}
          stroke={l === '?' ? '#dc2626' : '#7c3aed'}
        />
      ))}
    </QFig>
  );
};

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Gyakori hibás római írások egy számhoz (disztraktorok). Mindig hibás vagy más érték. */
export const romanDistractors = (n: number): string[] => {
  const right = toRoman(n);
  const cands = new Set<string>();
  // tükrözött (balra-jobbra csere)
  if (right.length === 2 && right[0] !== right[1]) cands.add(right[1] + right[0]);
  if (right.endsWith('IV')) cands.add(right.slice(0, -2) + 'VI');
  if (right.endsWith('IX')) cands.add(right.slice(0, -2) + 'XI');
  if (right.endsWith('VI')) cands.add(right.slice(0, -2) + 'IV');
  // szomszédok
  if (n > 1) cands.add(toRoman(n - 1));
  if (n < 20) cands.add(toRoman(n + 1));
  if (n + 10 <= 20) cands.add(toRoman(n + 10));
  if (n - 10 >= 1) cands.add(toRoman(n - 10));
  if (n === 4 || n === 14) cands.add(right.replace('IV', 'IIII'));
  if (n === 9 || n === 19) cands.add(right.replace('IX', 'VIIII'));
  cands.delete(right);
  return Array.from(cands);
};

// ---------------------------------------------------------------------------
// Labor-segédek
// ---------------------------------------------------------------------------

export type LabMsg = { ok: boolean; text: string } | null;

export const MsgBox: React.FC<{ msg: LabMsg }> = ({ msg }) =>
  msg ? (
    <div
      className={`rounded-xl p-3 text-center text-base font-bold ${
        msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
      }`}
    >
      {msg.text}
    </div>
  ) : null;

export const LabButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  tone?: 'main' | 'soft' | 'blue' | 'green' | 'red';
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, tone = 'main', className = '', disabled }) => {
  const tones: Record<string, string> = {
    main: 'bg-amber-600 text-white',
    soft: 'bg-slate-200 text-slate-800',
    blue: 'bg-blue-600 text-white',
    green: 'bg-emerald-600 text-white',
    red: 'bg-rose-600 text-white'
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-xl text-base font-bold min-h-[48px] disabled:opacity-40 ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
};

/** Nagy választógomb (szám vagy római szám). */
export const ChoiceButton: React.FC<{
  label: string;
  onClick: () => void;
  state?: 'idle' | 'chosen' | 'right' | 'wrong';
  roman?: boolean;
}> = ({ label, onClick, state = 'idle', roman }) => {
  const cls: Record<string, string> = {
    idle: 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600',
    chosen: 'bg-amber-500 text-white border-amber-700',
    right: 'bg-emerald-500 text-white border-emerald-700',
    wrong: 'bg-rose-500 text-white border-rose-700'
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[64px] h-14 px-3 rounded-xl font-black text-2xl border-2 transition-all ${cls[state]}`}
      style={roman ? { fontFamily: ROMAN_FONT } : undefined}
    >
      {label}
    </button>
  );
};

// ---------------------------------------------------------------------------
// Laborok (1. lecke)
// ---------------------------------------------------------------------------

/** Labor: pálcika-építő. Rakd ki a kért számot I, V, X pálcikákkal! */
export const StickBuilderLab: React.FC<{ min?: number; max?: number; first?: number }> = ({ min = 1, max = 20, first = 7 }) => {
  const [target, setTarget] = React.useState<number>(first);
  const [built, setBuilt] = React.useState<string>('');
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const add = (c: string) => {
    if (built.length >= 6) return;
    setBuilt((b) => b + c);
    setMsg(null);
  };
  const newTask = () => {
    let t = target;
    while (t === target) t = rnd(min, max);
    setTarget(t);
    setBuilt('');
    setMsg(null);
  };
  const check = () => {
    const want = toRoman(target);
    if (built === want) {
      setMsg({ ok: true, text: `Szuper! ${want} = ${target}.` });
      return;
    }
    const problem = romanProblem(built);
    if (problem) {
      setMsg({ ok: false, text: problem });
      return;
    }
    const v = rawRomanValue(built);
    setMsg({
      ok: false,
      text: v < target ? `Ez ${v}. Ez kevesebb, mint ${target}. Tegyél hozzá!` : `Ez ${v}. Ez több, mint ${target}. Vegyél el!`
    });
  };

  const h = 64;
  const w = Math.max(stickRomanWidth(built, h), 40);
  const live = built ? fromRoman(built) : null;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100 text-lg">
        Rakd ki pálcikákkal: <span className="text-3xl font-black align-middle ml-2">{target}</span>
      </div>
      <svg viewBox={`0 0 ${w + 40} ${h + 30}`} className="w-full max-w-[360px] h-28 mx-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width={w + 38} height={h + 28} rx="12" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
        {built ? (
          <StickRomanPart value={built} x={20} y={15} h={h} />
        ) : (
          <text x={(w + 40) / 2} y={h / 2 + 20} textAnchor="middle" fontSize="12" fill="#92400e" fontFamily={UI_FONT}>
            ide
          </text>
        )}
      </svg>
      <div className="text-center text-base font-bold text-slate-700 dark:text-slate-200 min-h-[28px]">
        {built ? (
          <>
            <span className="text-2xl font-black" style={{ fontFamily: ROMAN_FONT }}>
              {built}
            </span>
            {live !== null ? <span className="ml-3">= {live}</span> : <span className="ml-3 text-rose-600">nem szabályos</span>}
          </>
        ) : (
          'Koppints egy jelre!'
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {['I', 'V', 'X'].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => add(c)}
            className="w-20 h-16 rounded-2xl bg-amber-100 border-4 border-amber-500 text-amber-900 text-3xl font-black"
            style={{ fontFamily: ROMAN_FONT }}
            aria-label={`${c} jel hozzáadása`}
          >
            {c}
          </button>
        ))}
        <LabButton
          tone="soft"
          onClick={() => {
            setBuilt((b) => b.slice(0, -1));
            setMsg(null);
          }}
        >
          ← Vissza
        </LabButton>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton onClick={check}>Ellenőrzés</LabButton>
        <LabButton tone="soft" onClick={newTask}>
          Új feladat
        </LabButton>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

export interface LeftRightTask {
  prefix: string;
  last: 'V' | 'X';
  target: number;
}

const LEFT_RIGHT_BASES: { prefix: string; last: 'V' | 'X' }[] = [
  { prefix: '', last: 'V' },
  { prefix: '', last: 'X' },
  { prefix: 'X', last: 'V' }
];

export const makeLeftRightTask = (): LeftRightTask => {
  const b = LEFT_RIGHT_BASES[rnd(0, LEFT_RIGHT_BASES.length - 1)];
  const base = rawRomanValue(b.prefix + b.last);
  const target = Math.random() < 0.5 ? base - 1 : base + 1;
  return { ...b, target };
};

/** Labor: Balra vagy jobbra tegyem az I-t? */
export const LeftRightLab: React.FC = () => {
  const [task, setTask] = React.useState<LeftRightTask>({ prefix: '', last: 'X', target: 9 });
  const [side, setSide] = React.useState<'left' | 'right' | null>(null);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const base = task.prefix + task.last;
  const baseVal = rawRomanValue(base);
  const result = side === 'left' ? task.prefix + 'I' + task.last : side === 'right' ? base + 'I' : base;

  const choose = (s: 'left' | 'right') => {
    setSide(s);
    const r = s === 'left' ? task.prefix + 'I' + task.last : base + 'I';
    const v = rawRomanValue(r);
    if (v === task.target) {
      setMsg({
        ok: true,
        text: s === 'left' ? `Igen! ${r} = ${baseVal} − 1 = ${v}.` : `Igen! ${r} = ${baseVal} + 1 = ${v}.`
      });
    } else {
      setMsg({
        ok: false,
        text:
          s === 'left'
            ? `${r} = ${baseVal} − 1 = ${v}. Balra elveszünk! Neked ${task.target} kell.`
            : `${r} = ${baseVal} + 1 = ${v}. Jobbra hozzáadunk! Neked ${task.target} kell.`
      });
    }
  };
  const newTask = () => {
    let t = makeLeftRightTask();
    while (t.target === task.target) t = makeLeftRightTask();
    setTask(t);
    setSide(null);
    setMsg(null);
  };

  const h = 60;
  const w = stickRomanWidth(result, h);

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100 text-lg">
        Itt van:{' '}
        <span className="text-2xl font-black mx-1" style={{ fontFamily: ROMAN_FONT }}>
          {base}
        </span>{' '}
        ({baseVal}). Tegyél mellé egy I-t, hogy <span className="text-3xl font-black align-middle mx-1">{task.target}</span> legyen!
      </div>
      <svg viewBox={`0 0 ${w + 40} ${h + 30}`} className="w-full max-w-[300px] h-28 mx-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width={w + 38} height={h + 28} rx="12" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="2" />
        <StickRomanPart
          value={result}
          x={20}
          y={15}
          h={h}
          highlightIndex={side === 'left' ? task.prefix.length : side === 'right' ? result.length - 1 : undefined}
        />
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        <LabButton tone="red" onClick={() => choose('left')}>
          I balra ←
        </LabButton>
        <LabButton tone="green" onClick={() => choose('right')}>
          → I jobbra
        </LabButton>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton tone="soft" onClick={newTask}>
          Új feladat
        </LabButton>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
