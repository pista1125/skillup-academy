import React from 'react';

// ---------------------------------------------------------------------------
// Közös segédek a római számos leckékhez (3. osztály, II. fejezet)
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const SERIF = 'Georgia, Times New Roman, serif';

const TABLE: [number, string][] = [
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

/** Arab szám → római szám (1–100). */
export const toRoman = (n: number): string => {
  let s = '';
  let r = n;
  for (const [v, sym] of TABLE) {
    while (r >= v) {
      s += sym;
      r -= v;
    }
  }
  return s;
};

/** Szabályos római szám → arab szám (1–100), szabálytalan alakra null. */
export const fromRoman = (s: string): number | null => {
  if (!/^[IVXLC]+$/.test(s)) return null;
  for (let n = 1; n <= 100; n++) if (toRoman(n) === s) return n;
  return null;
};

/** Pálcikák száma egy római számban (I = 1, V = 2, X = 2, L = 2). */
export const stickCount = (s: string): number =>
  s.split('').reduce((a, c) => a + (c === 'I' ? 1 : c === 'V' || c === 'X' || c === 'L' || c === '+' || c === '=' ? 2 : c === '-' ? 1 : 0), 0);

/** Pálcikás egyenlet kiértékelése ("VI+II=VIII"). Igaz, ha minden szám szabályos és az egyenlőség teljesül. */
export const evalStickEq = (eq: string): { ok: boolean; left?: number; right?: number; bad?: string; text: string } => {
  const parts = eq.split('=');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, text: 'Pontosan egy egyenlőségjel kell.' };
  const side = (e: string): { v: number | null; bad?: string; txt: string } => {
    const toks = e.split(/([+-])/);
    if (toks.some((t) => t === '')) return { v: null, txt: '', bad: 'jel' };
    let v: number | null = fromRoman(toks[0]);
    if (v === null) return { v: null, bad: toks[0], txt: '' };
    let txt = String(v);
    for (let i = 1; i < toks.length; i += 2) {
      const w = fromRoman(toks[i + 1]);
      if (w === null) return { v: null, bad: toks[i + 1], txt: '' };
      v = toks[i] === '+' ? v + w : v - w;
      txt += ` ${toks[i] === '+' ? '+' : '–'} ${w}`;
    }
    return { v, txt };
  };
  const a = side(parts[0]);
  const b = side(parts[1]);
  if (a.bad || b.bad) {
    const bad = a.bad || b.bad;
    return { ok: false, bad, text: bad === 'jel' ? 'Két műveleti jel nem állhat egymás mellett.' : `A ${bad} nem szabályos római szám.` };
  }
  const ok = a.v === b.v;
  return { ok, left: a.v!, right: b.v!, text: `${a.txt} = ${b.txt}` };
};

// ---------------------------------------------------------------------------
// Pálcikás rajzolás
// ---------------------------------------------------------------------------

export interface StickSeg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** a jel indexe a szövegben */
  glyph: number;
  /** 'I' teljes jel, '+v' a plusz függőleges pálcikája, '=t' az egyenlőségjel felső pálcikája */
  role?: 'I' | '+v' | '=t';
}

export interface GlyphBox {
  x: number;
  w: number;
  ch: string;
}

const glyphW = (ch: string, h: number) => (ch === 'I' ? 0.3 * h : ch === 'L' ? 0.5 * h : 0.62 * h);

/** Egy pálcikás karakterlánc elrendezése: pálcikák és jeldobozok. */
export const layoutSticks = (s: string, h: number, x0 = 0, y0 = 0, gap = 0.16 * h) => {
  const sticks: StickSeg[] = [];
  const boxes: GlyphBox[] = [];
  let x = x0;
  const top = y0;
  const bot = y0 + h;
  const mid = y0 + h / 2;
  s.split('').forEach((ch, i) => {
    const w = glyphW(ch, h);
    const cx = x + w / 2;
    if (ch === 'I') sticks.push({ x1: cx, y1: top, x2: cx, y2: bot, glyph: i, role: 'I' });
    if (ch === 'V') {
      sticks.push({ x1: x + 0.03 * h, y1: top, x2: cx, y2: bot, glyph: i });
      sticks.push({ x1: x + w - 0.03 * h, y1: top, x2: cx, y2: bot, glyph: i });
    }
    if (ch === 'X') {
      sticks.push({ x1: x + 0.03 * h, y1: top, x2: x + w - 0.03 * h, y2: bot, glyph: i });
      sticks.push({ x1: x + w - 0.03 * h, y1: top, x2: x + 0.03 * h, y2: bot, glyph: i });
    }
    if (ch === 'L') {
      sticks.push({ x1: x + 0.06 * h, y1: top, x2: x + 0.06 * h, y2: bot, glyph: i });
      sticks.push({ x1: x + w, y1: bot, x2: x + 0.06 * h, y2: bot, glyph: i });
    }
    if (ch === '+') {
      sticks.push({ x1: x + 0.04 * h, y1: mid, x2: x + w - 0.04 * h, y2: mid, glyph: i });
      sticks.push({ x1: cx, y1: mid - 0.29 * h, x2: cx, y2: mid + 0.29 * h, glyph: i, role: '+v' });
    }
    if (ch === '-') sticks.push({ x1: x + 0.04 * h, y1: mid, x2: x + w - 0.04 * h, y2: mid, glyph: i });
    if (ch === '=') {
      sticks.push({ x1: x + 0.04 * h, y1: mid - 0.13 * h, x2: x + w - 0.04 * h, y2: mid - 0.13 * h, glyph: i, role: '=t' });
      sticks.push({ x1: x + 0.04 * h, y1: mid + 0.13 * h, x2: x + w - 0.04 * h, y2: mid + 0.13 * h, glyph: i });
    }
    boxes.push({ x, w, ch });
    x += w + gap;
  });
  return { sticks, boxes, width: x - gap - x0 };
};

/** Egy gyufaszál: fa szár + piros fej a kezdőponton. */
export const Stick: React.FC<{ s: { x1: number; y1: number; x2: number; y2: number }; h: number; color?: string; head?: string; opacity?: number; dashed?: boolean }> = ({
  s,
  h,
  color = '#d9a35b',
  head = '#dc2626',
  opacity = 1,
  dashed
}) => (
  <g opacity={opacity}>
    <line
      x1={s.x1}
      y1={s.y1}
      x2={s.x2}
      y2={s.y2}
      stroke={dashed ? '#94a3b8' : color}
      strokeWidth={Math.max(2.4, 0.085 * h)}
      strokeLinecap="round"
      strokeDasharray={dashed ? `${0.08 * h} ${0.07 * h}` : undefined}
    />
    {!dashed && <circle cx={s.x1} cy={s.y1} r={Math.max(1.8, 0.065 * h)} fill={head} />}
  </g>
);

/** Pálcikás szöveg kirajzolása (pl. "VI-V=X"), vízszintesen középre igazítva cx köré. */
export const StickText: React.FC<{ text: string; cx: number; y: number; h: number; color?: string; maxW?: number }> = ({ text, cx, y, h: h0, color, maxW = 212 }) => {
  const h = Math.min(h0, maxW / layoutSticks(text, 1).width);
  const w = layoutSticks(text, h).width;
  const { sticks } = layoutSticks(text, h, cx - w / 2, y + (h0 - h) / 2);
  return (
    <g>
      {sticks.map((s, i) => (
        <Stick key={i} s={s} h={h} color={color} />
      ))}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Római számlapos óra
// ---------------------------------------------------------------------------

export const CLOCK_NUMS = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

/**
 * Római számlapos óra. hour 0–11 (12 = 0), minute 0–59. A kismutató pontosan a megfelelő helyre mutat.
 * hideIdx: ezen a helyen "?" áll a szám helyett. useIIII: a IV helyett IIII.
 */
export const RomanClock: React.FC<{
  cx: number;
  cy: number;
  r: number;
  hour?: number;
  minute?: number;
  hideHands?: boolean;
  hideIdx?: number;
  useIIII?: boolean;
  highlightIdx?: number;
}> = ({ cx, cy, r, hour = 0, minute = 0, hideHands, hideIdx, useIIII, highlightIdx }) => {
  const hAng = (((hour % 12) + minute / 60) * 30 - 90) * (Math.PI / 180);
  const mAng = (minute * 6 - 90) * (Math.PI / 180);
  return (
    <g fontFamily={SERIF}>
      <circle cx={cx} cy={cy} r={r} fill="#fef9c3" stroke="#78350f" strokeWidth={r * 0.06} />
      <circle cx={cx} cy={cy} r={r * 0.93} fill="none" stroke="#a16207" strokeWidth="0.8" />
      {Array.from({ length: 60 }, (_, k) => {
        const a = (k * 6 - 90) * (Math.PI / 180);
        const big = k % 5 === 0;
        const r1 = r * 0.93;
        const r2 = r * (big ? 0.82 : 0.88);
        return (
          <line
            key={k}
            x1={cx + r1 * Math.cos(a)}
            y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)}
            y2={cy + r2 * Math.sin(a)}
            stroke="#78350f"
            strokeWidth={big ? 1.6 : 0.7}
          />
        );
      })}
      {!hideHands && (
        <g>
          <line x1={cx} y1={cy} x2={cx + r * 0.78 * Math.cos(mAng)} y2={cy + r * 0.78 * Math.sin(mAng)} stroke="#1e3a8a" strokeWidth={r * 0.045} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={cx + r * 0.48 * Math.cos(hAng)} y2={cy + r * 0.48 * Math.sin(hAng)} stroke="#b91c1c" strokeWidth={r * 0.08} strokeLinecap="round" />
        </g>
      )}
      {CLOCK_NUMS.map((n, k) => {
        const a = (k * 30 - 90) * (Math.PI / 180);
        const rr = r * 0.66;
        const label = k === hideIdx ? '?' : useIIII && n === 'IV' ? 'IIII' : n;
        const hi = k === highlightIdx;
        return (
          <g key={k}>
            {hi && <circle cx={cx + rr * Math.cos(a)} cy={cy + rr * Math.sin(a)} r={r * 0.15} fill="#bbf7d0" stroke="#16a34a" />}
            <text
              x={cx + rr * Math.cos(a)}
              y={cy + rr * Math.sin(a) + r * 0.065}
              textAnchor="middle"
              fontSize={r * (label.length > 3 ? 0.15 : 0.19)}
              fontWeight="bold"
              fill={k === hideIdx ? '#dc2626' : '#3f2a14'}
              stroke={hi ? '#bbf7d0' : '#fef9c3'}
              strokeWidth={r * 0.035}
              paintOrder="stroke"
            >
              {label}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.06} fill="#1e293b" />
    </g>
  );
};

/** Könyv, a lapján fejezetcímmel. */
export const BookG: React.FC<{ x: number; y: number; w: number; label: string; color?: string }> = ({ x, y, w, label, color = '#2563eb' }) => {
  const h = w * 0.62;
  return (
    <g>
      <path d={`M ${x} ${y + 6} Q ${x + w / 4} ${y - 2} ${x + w / 2} ${y + 6} Q ${x + (3 * w) / 4} ${y - 2} ${x + w} ${y + 6} L ${x + w} ${y + h} Q ${x + (3 * w) / 4} ${y + h - 8} ${x + w / 2} ${y + h} Q ${x + w / 4} ${y + h - 8} ${x} ${y + h} Z`} fill="#fff" stroke={color} strokeWidth="2" />
      <line x1={x + w / 2} y1={y + 6} x2={x + w / 2} y2={y + h} stroke={color} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={x + w * 0.58} y1={y + h * (0.56 + k * 0.1)} x2={x + w * 0.92} y2={y + h * (0.56 + k * 0.1)} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={x + w * 0.08} y1={y + h * (0.56 + k * 0.1)} x2={x + w * 0.42} y2={y + h * (0.56 + k * 0.1)} stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      ))}
      <text x={x + w * 0.25} y={y + h * 0.3} textAnchor="middle" fontSize={Math.min(w * 0.11, (w * 0.42) / (label.length * 0.68))} fontWeight="bold" fill={color} fontFamily={SERIF}>
        {label}
      </text>
      <text x={x + w * 0.25} y={y + h * 0.3 + w * 0.075} textAnchor="middle" fontSize={w * 0.06} fill="#64748b" fontFamily={FONT}>
        fejezet
      </text>
    </g>
  );
};

/** Tábla (szobor talapzata, utcatábla, emléktábla) felirattal. */
export const PlaqueG: React.FC<{ x: number; y: number; w: number; h: number; text: string; sub?: string; fill?: string; stroke?: string; color?: string; fs?: number }> = ({
  x,
  y,
  w,
  h,
  text,
  sub,
  fill = '#f1f5f9',
  stroke = '#475569',
  color = '#0f172a',
  fs
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth="2" />
    <text x={x + w / 2} y={y + (sub ? h * 0.48 : h * 0.62)} textAnchor="middle" fontSize={fs ?? h * 0.36} fontWeight="bold" fill={color} fontFamily={SERIF}>
      {text}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h * 0.82} textAnchor="middle" fontSize={h * 0.22} fill={color} fontFamily={FONT}>
        {sub}
      </text>
    )}
  </g>
);

/** Naptárlap: fent az év, középen a dátum. */
export const CalendarG: React.FC<{ x: number; y: number; w: number; top: string; main: string; bottom?: string; mainColor?: string }> = ({ x, y, w, top, main, bottom, mainColor = '#0f172a' }) => {
  const h = w * 0.95;
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#fff" stroke="#64748b" strokeWidth="2" />
      <rect x={x} y={y} width={w} height={h * 0.28} rx={8} fill="#ef4444" />
      <rect x={x} y={y + h * 0.18} width={w} height={h * 0.1} fill="#ef4444" />
      <circle cx={x + w * 0.28} cy={y + 4} r={3.5} fill="#334155" />
      <circle cx={x + w * 0.72} cy={y + 4} r={3.5} fill="#334155" />
      <text x={x + w / 2} y={y + h * 0.2} textAnchor="middle" fontSize={h * 0.13} fontWeight="bold" fill="#fff">
        {top}
      </text>
      <text x={x + w / 2} y={y + h * 0.66} textAnchor="middle" fontSize={h * (main.length > 7 ? 0.17 : 0.22)} fontWeight="bold" fill={mainColor} fontFamily={SERIF}>
        {main}
      </text>
      {bottom && (
        <text x={x + w / 2} y={y + h * 0.88} textAnchor="middle" fontSize={h * 0.12} fill="#475569">
          {bottom}
        </text>
      )}
    </g>
  );
};

export const MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];

// ---------------------------------------------------------------------------
// Tükrözés: a jelek felső fele a piros tükörvonal fölött
// ---------------------------------------------------------------------------

/**
 * Félbe vágott pálcikás jelek a piros tükörvonalon (y = lineY).
 * Jelek: 'V' (a tükörképpel X lesz), 'I' (I marad), 'T' (⊥, tükörképpel +), '_' (vízszintes, tükörképpel =).
 * showMirror: a tükörképet halványan, szaggatottan is megrajzolja.
 */
export const MirrorHalf: React.FC<{ text: string; cx: number; lineY: number; hh: number; showMirror?: boolean; lineColor?: string }> = ({
  text,
  cx,
  lineY,
  hh,
  showMirror,
  lineColor = '#dc2626'
}) => {
  const wOf = (c: string) => (c === 'I' ? 0.5 * hh : 1.15 * hh);
  const gap = 0.3 * hh;
  const total = text.split('').reduce((a, c) => a + wOf(c), 0) + gap * (text.length - 1);
  let x = cx - total / 2;
  const segs: { x1: number; y1: number; x2: number; y2: number }[] = [];
  text.split('').forEach((c) => {
    const w = wOf(c);
    const m = x + w / 2;
    if (c === 'V') {
      segs.push({ x1: x + 0.05 * hh, y1: lineY - hh, x2: m, y2: lineY });
      segs.push({ x1: x + w - 0.05 * hh, y1: lineY - hh, x2: m, y2: lineY });
    }
    if (c === 'I') segs.push({ x1: m, y1: lineY - hh, x2: m, y2: lineY });
    if (c === 'T') {
      segs.push({ x1: m, y1: lineY - 0.55 * hh, x2: m, y2: lineY });
      segs.push({ x1: x + 0.1 * hh, y1: lineY - 0.02 * hh, x2: x + w - 0.1 * hh, y2: lineY - 0.02 * hh });
    }
    if (c === '_') segs.push({ x1: x + 0.1 * hh, y1: lineY - 0.2 * hh, x2: x + w - 0.1 * hh, y2: lineY - 0.2 * hh });
    x += w + gap;
  });
  const sw = Math.max(2.5, 0.13 * hh);
  return (
    <g>
      {showMirror &&
        segs.map((s, i) => (
          <line key={`m${i}`} x1={s.x1} y1={2 * lineY - s.y1} x2={s.x2} y2={2 * lineY - s.y2} stroke="#93c5fd" strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${0.12 * hh} ${0.1 * hh}`} />
        ))}
      <line x1={cx - total / 2 - 0.3 * hh} y1={lineY} x2={cx + total / 2 + 0.3 * hh} y2={lineY} stroke={lineColor} strokeWidth="2" />
      {segs.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#1e40af" strokeWidth={sw} strokeLinecap="round" />
      ))}
    </g>
  );
};
