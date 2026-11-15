import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// ---------------------------------------------------------------------------
// Közös rajzoló segédek (a lecke ábráihoz, a laborokhoz és a kvízábrákhoz)
// ---------------------------------------------------------------------------

export type VDPoint = [number, number];

export interface VDVec {
  from: VDPoint;
  to: VDPoint;
  /** Kisbetű / nagybetű ⇒ nyíl a betű fölött; „→AB” ⇒ közös nyíl; „_” után alsó index. */
  label?: string;
  color?: string;
  dashed?: boolean;
  /** A címke a haladási irány bal (1) vagy jobb (−1) oldalára kerüljön. */
  side?: 1 | -1;
  /** A címke helye a vektor mentén (0–1). */
  at?: number;
  offset?: number;
  width?: number;
  plain?: boolean;
}

export interface VDDot {
  at: VDPoint;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
}

export interface VDPoly {
  pts: VDPoint[];
  fill?: string;
  stroke?: string;
  dashed?: boolean;
}

export interface VDText {
  at: VDPoint;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
}

/** Vektorcímke SVG-ben: betűk fölött kis nyíl, „→AB” esetén közös nyíl, „_” után alsó index. */
export const VDLabel: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: number;
  plain?: boolean;
}> = ({ x, y, text, color = '#0f172a', size = 13, plain = false }) => {
  if (plain) {
    return (
      <text x={x} y={y + size * 0.35} fontSize={size} fontWeight="bold" textAnchor="middle" fill={color}>
        {text}
      </text>
    );
  }
  type Tok = { s: string; arrow: boolean; sub: boolean; w: number };
  const cw = (ch: string, sub: boolean) => {
    const f = sub ? size * 0.7 : size;
    if (ch === ' ') return f * 0.28;
    if ('+−-=·'.includes(ch)) return f * 0.72;
    if ('()|'.includes(ch)) return f * 0.36;
    if (/[A-Z]/.test(ch)) return f * 0.7;
    return f * 0.6;
  };
  const toks: Tok[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '→') {
      let j = i + 1;
      while (j < text.length && /[A-Z0-9']/.test(text[j])) j++;
      const s = text.slice(i + 1, j);
      toks.push({ s, arrow: true, sub: false, w: s.split('').reduce((acc, c) => acc + cw(c, false), 0) });
      i = j;
    } else if (ch === '_') {
      let j = i + 1;
      while (j < text.length && /[a-zA-Z0-9∥⊥]/.test(text[j])) j++;
      const s = text.slice(i + 1, j);
      toks.push({ s, arrow: false, sub: true, w: s.split('').reduce((acc, c) => acc + cw(c, true), 0) });
      i = j;
    } else {
      toks.push({ s: ch, arrow: /[a-zA-Z]/.test(ch), sub: false, w: cw(ch, false) });
      i++;
    }
  }
  const total = toks.reduce((acc, t) => acc + t.w, 0);
  let cx = x - total / 2;
  const base = y + size * 0.35;
  const top = base - size * 0.95;
  return (
    <g>
      {toks.map((t, k) => {
        const x0 = cx;
        cx += t.w;
        if (t.s === ' ') return null;
        const mid = x0 + t.w / 2;
        return (
          <g key={k}>
            <text
              x={mid}
              y={t.sub ? base + size * 0.25 : base}
              fontSize={t.sub ? size * 0.7 : size}
              fontWeight="bold"
              fontStyle={t.arrow && /^[a-z]$/.test(t.s) ? 'italic' : 'normal'}
              textAnchor="middle"
              fill={color}
            >
              {t.s}
            </text>
            {t.arrow && (
              <g stroke={color} strokeWidth={1} fill={color}>
                <line x1={x0 + t.w * 0.1} y1={top} x2={x0 + t.w * 0.9 - 2} y2={top} />
                <polygon
                  points={`${x0 + t.w * 0.9},${top} ${x0 + t.w * 0.9 - 3.2},${top - 1.8} ${x0 + t.w * 0.9 - 3.2},${top + 1.8}`}
                  stroke="none"
                />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Nyíl (vonal + kitöltött nyílhegy) képpont-koordinátákban. */
export const VDArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  dashed?: boolean;
  head?: number;
}> = ({ x1, y1, x2, y2, color = '#2563eb', width = 2.4, dashed = false, head = 9 }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 0.5) return <circle cx={x1} cy={y1} r={3} fill={color} />;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const h = Math.min(head, len * 0.6);
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  const px = -uy * h * 0.45;
  const py = ux * h * 0.45;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx + ux}
        y2={by + uy}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '5 4' : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
};

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. Képpont-koordinátákban. */
export const VDRightAngle: React.FC<{
  V: { x: number; y: number };
  P: { x: number; y: number };
  Q: { x: number; y: number };
  r?: number;
  color?: string;
}> = ({ V, P, Q, r = 13, color = '#475569' }) => {
  const l1 = Math.hypot(P.x - V.x, P.y - V.y) || 1;
  const l2 = Math.hypot(Q.x - V.x, Q.y - V.y) || 1;
  const u1 = { x: (P.x - V.x) / l1, y: (P.y - V.y) / l1 };
  const u2 = { x: (Q.x - V.x) / l2, y: (Q.y - V.y) / l2 };
  const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bl = Math.hypot(bx, by) || 1;
  const k = 0.55 * r;
  return (
    <g>
      <path
        d={`M ${(V.x + r * u1.x).toFixed(2)} ${(V.y + r * u1.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * u2.x).toFixed(2)} ${(V.y + r * u2.y).toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={V.x + (k * bx) / bl} cy={V.y + (k * by) / bl} r="1.8" fill={color} />
    </g>
  );
};

/**
 * Négyzetrácsos ábra rácsegységekben megadott adatokkal (y felfelé nő).
 * axes = true esetén a koordinátatengelyek is megjelennek (ha a 0 a tartományba esik).
 */
export const VDGrid: React.FC<{
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  cell?: number;
  pad?: number;
  axes?: boolean;
  grid?: boolean;
  vectors?: VDVec[];
  points?: VDDot[];
  polygons?: VDPoly[];
  rightAngles?: { at: VDPoint; p: VDPoint; q: VDPoint }[];
  texts?: VDText[];
  className?: string;
  children?: React.ReactNode;
}> = ({
  x0,
  x1,
  y0,
  y1,
  cell = 24,
  pad = 16,
  axes = false,
  grid = true,
  vectors = [],
  points = [],
  polygons = [],
  rightAngles = [],
  texts = [],
  className = 'w-full max-w-[280px] h-auto mx-auto',
  children
}) => {
  const W = (x1 - x0) * cell + 2 * pad;
  const H = (y1 - y0) * cell + 2 * pad;
  const X = (x: number) => pad + (x - x0) * cell;
  const Y = (y: number) => pad + (y1 - y) * cell;
  const P = (p: VDPoint) => ({ x: X(p[0]), y: Y(p[1]) });
  const lines: React.ReactNode[] = [];
  if (grid) {
    for (let x = x0; x <= x1; x++) {
      lines.push(<line key={`gx${x}`} x1={X(x)} y1={Y(y0)} x2={X(x)} y2={Y(y1)} stroke="#e2e8f0" strokeWidth="1" />);
    }
    for (let y = y0; y <= y1; y++) {
      lines.push(<line key={`gy${y}`} x1={X(x0)} y1={Y(y)} x2={X(x1)} y2={Y(y)} stroke="#e2e8f0" strokeWidth="1" />);
    }
  }
  const showAxes = axes && x0 <= 0 && x1 >= 0 && y0 <= 0 && y1 >= 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {lines}
      {showAxes && (
        <g>
          <VDArrow x1={X(x0)} y1={Y(0)} x2={X(x1) + 8} y2={Y(0)} color="#334155" width={1.4} head={7} />
          <VDArrow x1={X(0)} y1={Y(y0)} x2={X(0)} y2={Y(y1) - 8} color="#334155" width={1.4} head={7} />
          <text x={X(x1) + 4} y={Y(0) + 14} fontSize="11" fill="#334155" fontStyle="italic">x</text>
          <text x={X(0) + 6} y={Y(y1) - 2} fontSize="11" fill="#334155" fontStyle="italic">y</text>
          <text x={X(0) - 5} y={Y(0) + 12} fontSize="10" textAnchor="end" fill="#334155">O</text>
          {x1 >= 1 && (
            <text x={X(1)} y={Y(0) + 12} fontSize="9" textAnchor="middle" fill="#64748b">1</text>
          )}
          {y1 >= 1 && (
            <text x={X(0) - 5} y={Y(1) + 3} fontSize="9" textAnchor="end" fill="#64748b">1</text>
          )}
        </g>
      )}
      {polygons.map((pg, k) => (
        <polygon
          key={`pg${k}`}
          points={pg.pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(' ')}
          fill={pg.fill ?? 'rgba(59,130,246,0.10)'}
          stroke={pg.stroke ?? '#93c5fd'}
          strokeWidth="1.5"
          strokeDasharray={pg.dashed ? '5 4' : undefined}
        />
      ))}
      {rightAngles.map((ra, k) => (
        <VDRightAngle key={`ra${k}`} V={P(ra.at)} P={P(ra.p)} Q={P(ra.q)} r={11} />
      ))}
      {vectors.map((v, k) => {
        const a = P(v.from);
        const b = P(v.to);
        const color = v.color ?? '#2563eb';
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = (b.y - a.y) / len;
        const ny = -(b.x - a.x) / len;
        const s = v.side ?? 1;
        const t = v.at ?? 0.5;
        const off = v.offset ?? 12;
        const lx = a.x + (b.x - a.x) * t + s * nx * off;
        const ly = a.y + (b.y - a.y) * t + s * ny * off;
        return (
          <g key={`v${k}`}>
            <VDArrow x1={a.x} y1={a.y} x2={b.x} y2={b.y} color={color} dashed={v.dashed} width={v.width ?? 2.4} />
            {v.label && <VDLabel x={lx} y={ly} text={v.label} color={color} plain={v.plain} />}
          </g>
        );
      })}
      {points.map((p, k) => (
        <g key={`p${k}`}>
          <circle cx={X(p.at[0])} cy={Y(p.at[1])} r="3" fill={p.color ?? '#0f172a'} />
          {p.label && (
            <text
              x={X(p.at[0]) + (p.dx ?? 6)}
              y={Y(p.at[1]) + (p.dy ?? -6)}
              fontSize="11"
              fontWeight="bold"
              fill={p.color ?? '#0f172a'}
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
      {texts.map((t, k) => (
        <text
          key={`t${k}`}
          x={X(t.at[0]) + (t.dx ?? 0)}
          y={Y(t.at[1]) + (t.dy ?? 0)}
          fontSize={t.size ?? 11}
          fontWeight="bold"
          textAnchor={t.anchor ?? 'middle'}
          fill={t.color ?? '#0f172a'}
        >
          {t.text}
        </text>
      ))}
      {children}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// A lecke ábrái
// ---------------------------------------------------------------------------

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** 1. ábra: a katamarán a tó A partjáról indul, elmozdulásvektora 30°-os szöget zár be a parttal. */
export const CatamaranLakeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 420, y: 220 };
  const L = 150; // r hossza képpontban
  const R = { x: A.x - L * Math.cos(toRad(30)), y: A.y - L * Math.sin(toRad(30)) };
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
      <rect x="30" y="60" width="500" height="160" fill="rgba(56,189,248,0.18)" />
      <line x1="30" y1="60" x2="530" y2="60" stroke="#0369a1" strokeWidth="3" />
      <line x1="30" y1="220" x2="530" y2="220" stroke="#0369a1" strokeWidth="3" />
      <line x1={A.x} y1={A.y} x2={A.x - 160 / Math.tan(toRad(30))} y2={60} stroke="#f87171" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx={A.x - 160 / Math.tan(toRad(30))} cy={60} r="4" fill="#0f172a" />
      <text x={A.x - 160 / Math.tan(toRad(30)) - 4} y="50" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <circle cx={A.x} cy={60} r="4" fill="#0f172a" />
      <text x={A.x - 4} y="50" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x="40" y="80" fontSize="12" fill="#075985">túlsó part (BC egyenes)</text>
      <circle cx={A.x} cy={A.y} r="5" fill="#dc2626" />
      <text x={A.x + 8} y={A.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      {/* B pont: A-ból merőlegesen a túlpartra */}
      <line x1={A.x} y1={A.y} x2={A.x} y2={60} stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x={A.x + 8} y={145} fontSize="13" fontWeight="bold" fill="#0f172a">1,2 km</text>
      <VDArrow x1={A.x} y1={A.y} x2={R.x} y2={R.y} color="#dc2626" width={3} />
      <VDLabel x={(A.x + R.x) / 2 - 6} y={(A.y + R.y) / 2 - 14} text="r" color="#b91c1c" size={15} />
      <path
        d={`M ${A.x - 46} ${A.y} A 46 46 0 0 1 ${(A.x - 46 * Math.cos(toRad(30))).toFixed(1)} ${(A.y - 46 * Math.sin(toRad(30))).toFixed(1)}`}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="1.5"
      />
      <text x={A.x - 74} y={A.y - 6} fontSize="12" fontWeight="bold" fill="#b91c1c">30°</text>
      <text x="40" y="258" fontSize="12" fill="#0f172a">|→r| = 12 m (1 másodperc alatti elmozdulás)</text>
    </svg>
  );
};

/** 2. ábra: r felbontása a partra merőleges (r_m) és a parttal párhuzamos (r_p) összetevőre. */
export const CatamaranComponentsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 400, y: 230 };
  const L = 300;
  const tip = { x: A.x - L * Math.cos(toRad(30)), y: A.y - L * Math.sin(toRad(30)) };
  const foot = { x: A.x, y: tip.y }; // r_m vége (merőleges összetevő)
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="40" y1={A.y} x2="520" y2={A.y} stroke="#0369a1" strokeWidth="2" />
      <text x="470" y={A.y + 18} fontSize="11" fill="#075985">part</text>
      <VDArrow x1={A.x} y1={A.y} x2={foot.x} y2={foot.y} color="#059669" width={2.6} />
      <VDArrow x1={foot.x} y1={foot.y} x2={tip.x} y2={tip.y} color="#7c3aed" width={2.6} />
      <VDArrow x1={A.x} y1={A.y} x2={tip.x} y2={tip.y} color="#dc2626" width={3} />
      <VDRightAngle V={foot} P={A} Q={tip} r={14} />
      <VDLabel x={A.x + 22} y={(A.y + foot.y) / 2} text="r_m" color="#047857" size={15} />
      <VDLabel x={(foot.x + tip.x) / 2} y={foot.y - 16} text="r_p" color="#6d28d9" size={15} />
      <VDLabel x={(A.x + tip.x) / 2 - 10} y={(A.y + tip.y) / 2 + 22} text="r" color="#b91c1c" size={15} />
      <path
        d={`M ${A.x - 50} ${A.y} A 50 50 0 0 1 ${(A.x - 50 * Math.cos(toRad(30))).toFixed(1)} ${(A.y - 50 * Math.sin(toRad(30))).toFixed(1)}`}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="1.5"
      />
      <text x={A.x - 82} y={A.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">30°</text>
      <path
        d={`M ${A.x} ${A.y - 40} A 40 40 0 0 0 ${(A.x - 40 * Math.cos(toRad(60))).toFixed(1)} ${(A.y - 40 * Math.sin(toRad(60))).toFixed(1)}`}
        fill="none"
        stroke="#047857"
        strokeWidth="1.5"
      />
      <text x={A.x - 30} y={A.y - 46} fontSize="12" fontWeight="bold" fill="#047857">60°</text>
      <text x="40" y="40" fontSize="13" fontWeight="bold" fill="#0f172a">|→rₘ| = 12 · cos 60° = 6 m</text>
      <text x="40" y="60" fontSize="13" fontWeight="bold" fill="#0f172a">|→rₚ| = 12 · cos 30° = 6√3 ≈ 10,4 m</text>
    </svg>
  );
};

/** 3. ábra: a v vektor a és b irányú összetevőinek megszerkesztése (paralelogramma-módszer). */
export const DecompositionStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // rácsegységekben: a(2; 0) irány, b(1; 2) irány; v = 2a + 1,5b = (5,5; 3)
  const s = 34;
  const O = { x: 70, y: 220 };
  const pt = (x: number, y: number) => ({ x: O.x + x * s, y: O.y - y * s });
  const A1 = pt(2, 0);
  const B1 = pt(1, 2);
  const MA = pt(4, 0);
  const NB = pt(1.5, 3);
  const V = pt(5.5, 3);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* a és b egyenese a közös kezdőpontból */}
      <line x1={O.x - 30} y1={O.y} x2={pt(7, 0).x} y2={O.y} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="6 4" />
      <line x1={pt(-0.4, -0.8).x} y1={pt(-0.4, -0.8).y} x2={pt(2.4, 4.8).x} y2={pt(2.4, 4.8).y} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="6 4" />
      {/* paralelogramma */}
      <polygon
        points={`${O.x},${O.y} ${MA.x},${MA.y} ${V.x},${V.y} ${NB.x},${NB.y}`}
        fill="rgba(250,204,21,0.15)"
        stroke="#eab308"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <VDArrow x1={O.x} y1={O.y} x2={MA.x} y2={MA.y} color="#2563eb" width={4} />
      <VDArrow x1={O.x} y1={O.y} x2={NB.x} y2={NB.y} color="#059669" width={4} />
      <VDArrow x1={O.x} y1={O.y} x2={A1.x} y2={A1.y} color="#1e3a8a" width={2.2} />
      <VDArrow x1={O.x} y1={O.y} x2={B1.x} y2={B1.y} color="#065f46" width={2.2} />
      <VDArrow x1={O.x} y1={O.y} x2={V.x} y2={V.y} color="#dc2626" width={3} />
      <VDLabel x={(O.x + A1.x) / 2} y={O.y + 16} text="a" color="#1e3a8a" />
      <VDLabel x={(MA.x + A1.x) / 2 + 10} y={O.y + 16} text="m·a" color="#2563eb" />
      <VDLabel x={(O.x + B1.x) / 2 - 14} y={(O.y + B1.y) / 2} text="b" color="#065f46" />
      <VDLabel x={(B1.x + NB.x) / 2 - 22} y={(B1.y + NB.y) / 2} text="n·b" color="#059669" />
      <VDLabel x={(O.x + V.x) / 2 + 12} y={(O.y + V.y) / 2 - 14} text="v" color="#b91c1c" size={15} />
      <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
      <text x={O.x - 8} y={O.y + 20} fontSize="11" fill="#0f172a">közös kezdőpont</text>
      <g fontSize="12" fill="#0f172a">
        <text x="360" y="40" fontWeight="bold">A szerkesztés lépései</text>
        <text x="360" y="62">1. a, b, v közös kezdőpontból</text>
        <text x="360" y="82">2. meghúzzuk a és b egyenesét</text>
        <text x="360" y="102">3. v végpontján át párhuzamosok</text>
        <text x="372" y="118">a két egyenessel</text>
        <text x="360" y="138">4. a paralelogramma oldal-</text>
        <text x="372" y="154">vektorai az összetevők:</text>
        <text x="372" y="174" fontWeight="bold" fill="#b91c1c">→v = m·→a + n·→b</text>
        <text x="372" y="194" fill="#64748b">(itt m = 2, n = 1,5)</text>
      </g>
    </svg>
  );
};

/** 4. ábra: 20 N súlyú tárgy két fonáldarabon; G felbontása a fonalakkal párhuzamos összetevőkre. */
export const HangingWeightSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const K = { x: 280, y: 130 }; // a tárgy felfüggesztési pontja
  const left = { x: K.x - 100 / Math.tan(toRad(60)) * 1, y: K.y - 100 }; // 60°-os fonal (bal)
  const right = { x: K.x + 100 / Math.tan(toRad(30)), y: K.y - 100 }; // 30°-os fonal (jobb)
  const g = 120; // 20 N = 120 px
  const Gend = { x: K.x, y: K.y + g };
  // összetevők: a fonalakkal ellentétes irányban (lefelé), nagyságuk 20·sin60 és 20·sin30
  const uL = { x: -Math.cos(toRad(60)), y: -Math.sin(toRad(60)) }; // bal fonal iránya (felfelé)
  const uR = { x: Math.cos(toRad(30)), y: -Math.sin(toRad(30)) }; // jobb fonal iránya
  const cL = { x: K.x - uL.x * g * Math.sin(toRad(60)), y: K.y - uL.y * g * Math.sin(toRad(60)) };
  const cR = { x: K.x - uR.x * g * Math.sin(toRad(30)), y: K.y - uR.y * g * Math.sin(toRad(30)) };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#fefce8" stroke="#fde68a" strokeWidth="1.5" />
      <line x1="60" y1="30" x2="500" y2="30" stroke="#78350f" strokeWidth="4" />
      <line x1={K.x} y1={K.y} x2={left.x} y2={left.y} stroke="#78350f" strokeWidth="2" />
      <line x1={K.x} y1={K.y} x2={right.x} y2={right.y} stroke="#78350f" strokeWidth="2" />
      <line x1={left.x} y1={left.y} x2={left.x + 50} y2={left.y} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={right.x} y1={right.y} x2={right.x - 70} y2={right.y} stroke="#94a3b8" strokeDasharray="4 3" />
      <text x={left.x + 16} y={left.y + 26} fontSize="12" fontWeight="bold" fill="#92400e">60°</text>
      <text x={right.x - 66} y={right.y + 18} fontSize="12" fontWeight="bold" fill="#92400e">30°</text>
      <polygon
        points={`${K.x},${K.y} ${cL.x},${cL.y} ${Gend.x},${Gend.y} ${cR.x},${cR.y}`}
        fill="rgba(59,130,246,0.08)"
        stroke="#93c5fd"
        strokeDasharray="4 3"
      />
      <VDRightAngle V={K} P={cL} Q={cR} r={13} />
      <VDArrow x1={K.x} y1={K.y} x2={Gend.x} y2={Gend.y} color="#dc2626" width={3} />
      <VDArrow x1={K.x} y1={K.y} x2={cL.x} y2={cL.y} color="#2563eb" width={2.6} />
      <VDArrow x1={K.x} y1={K.y} x2={cR.x} y2={cR.y} color="#059669" width={2.6} />
      <rect x={K.x - 12} y={K.y - 4} width="24" height="16" rx="3" fill="#475569" />
      <VDLabel x={K.x + 16} y={Gend.y - 8} text="G" color="#b91c1c" size={15} />
      <VDLabel x={cR.x - 2} y={cR.y + 20} text="G_1" color="#047857" />
      <VDLabel x={cL.x + 4} y={cL.y + 22} text="G_2" color="#1d4ed8" />
      <g fontSize="12" fill="#0f172a">
        <text x="395" y="200">|→G| = 20 N</text>
        <text x="395" y="220">|→G₁| = 20 · sin 30° = 10 N</text>
        <text x="395" y="240">|→G₂| = 20 · sin 60° ≈ 17,3 N</text>
      </g>
    </svg>
  );
};

/** 5. ábra (kitekintés): lejtőn álló test súlyerejének felbontása lejtővel párhuzamos és arra merőleges összetevőre. */
export const InclineForcesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const alpha = 30;
  const B0 = { x: 60, y: 240 };
  const B1 = { x: 480, y: 240 };
  const T = { x: 480, y: 240 - 420 * Math.tan(toRad(alpha)) };
  const d = { x: Math.cos(toRad(alpha)), y: -Math.sin(toRad(alpha)) }; // lejtő iránya felfelé
  const nrm = { x: -Math.sin(toRad(alpha)), y: -Math.cos(toRad(alpha)) }; // kifelé mutató normális
  const C = { x: B0.x + d.x * 270 + nrm.x * 22, y: B0.y + d.y * 270 + nrm.y * 22 };
  const g = 110;
  const Gend = { x: C.x, y: C.y + g };
  const par = { x: C.x - d.x * g * Math.sin(toRad(alpha)), y: C.y - d.y * g * Math.sin(toRad(alpha)) };
  const perp = { x: C.x - nrm.x * g * Math.cos(toRad(alpha)), y: C.y - nrm.y * g * Math.cos(toRad(alpha)) };
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <polygon points={`${B0.x},${B0.y} ${B1.x},${B1.y} ${T.x},${T.y}`} fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
      <VDRightAngle V={B1} P={B0} Q={T} r={14} />
      <path
        d={`M ${B0.x + 50} ${B0.y} A 50 50 0 0 0 ${(B0.x + 50 * d.x).toFixed(1)} ${(B0.y + 50 * d.y).toFixed(1)}`}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="1.5"
      />
      <text x={B0.x + 58} y={B0.y - 8} fontSize="13" fontWeight="bold" fill="#b91c1c">α</text>
      <g transform={`rotate(${-alpha} ${C.x} ${C.y})`}>
        <rect x={C.x - 26} y={C.y - 22} width="52" height="44" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
      </g>
      <polygon
        points={`${C.x},${C.y} ${par.x},${par.y} ${Gend.x},${Gend.y} ${perp.x},${perp.y}`}
        fill="none"
        stroke="#94a3b8"
        strokeDasharray="4 3"
      />
      <VDRightAngle V={C} P={par} Q={perp} r={12} />
      <VDArrow x1={C.x} y1={C.y} x2={Gend.x} y2={Gend.y} color="#dc2626" width={3} />
      <VDArrow x1={C.x} y1={C.y} x2={par.x} y2={par.y} color="#2563eb" width={2.6} />
      <VDArrow x1={C.x} y1={C.y} x2={perp.x} y2={perp.y} color="#059669" width={2.6} />
      <VDLabel x={Gend.x + 14} y={Gend.y - 6} text="G" color="#b91c1c" size={15} />
      <VDLabel x={par.x - 18} y={par.y - 4} text="G_∥" color="#1d4ed8" />
      <VDLabel x={perp.x + 22} y={perp.y} text="G_⊥" color="#047857" />
      <g fontSize="12" fill="#0f172a">
        <text x="30" y="34" fontWeight="bold">Lejtőn álló test (α = 30°)</text>
        <text x="30" y="54">|→G∥| = G · sin α (lejtővel párhuzamos)</text>
        <text x="30" y="74">|→G⊥| = G · cos α (lejtőre merőleges)</text>
      </g>
    </svg>
  );
};

/** 6. ábra: felbontás négyzetrácson: v = 2a + b, ahol a(2; 1), b(1; 3). */
export const GridDecompositionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <VDGrid
    x0={0}
    x1={7}
    y0={0}
    y1={6}
    cell={34}
    className={className}
    polygons={[{ pts: [[1, 1], [5, 3], [6, 6], [2, 4]], fill: 'rgba(250,204,21,0.12)', stroke: '#eab308', dashed: true }]}
    vectors={[
      { from: [1, 1], to: [3, 2], label: 'a', color: '#1e3a8a', side: -1 },
      { from: [3, 2], to: [5, 3], label: 'a', color: '#1e3a8a', side: -1 },
      { from: [5, 3], to: [6, 6], label: 'b', color: '#059669', side: -1 },
      { from: [1, 1], to: [2, 4], label: 'b', color: '#059669', side: 1 },
      { from: [1, 1], to: [6, 6], label: 'v = 2a + b', color: '#dc2626', side: 1, at: 0.62, offset: 26 }
    ]}
  />
);
