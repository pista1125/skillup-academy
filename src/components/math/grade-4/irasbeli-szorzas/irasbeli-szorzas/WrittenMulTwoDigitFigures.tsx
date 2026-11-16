import React from 'react';

const FONT = 'system-ui, sans-serif';
export const WM2_COLORS = {
  factor: '#0f172a',
  p1: '#ea580c',
  p2: '#2563eb',
  zero: '#94a3b8',
  product: '#16a34a',
  unknown: '#dc2626'
};

export interface WrittenMul2LayoutProps {
  a: number;
  b: number;
  /** 'ones': az egyesekkel kezdünk (a 2. részletszorzat balra tolva); 'tens': a tízesekkel kezdünk (a 2. jobbra tolva). */
  mode?: 'ones' | 'tens';
  /** Az egyesekkel kezdve a 2. részletszorzat végére halvány 0 kerül. */
  showZero?: boolean;
  /** Rövidebb írásmód: ha a szorzó egyik számjegye 1, a szorzandó maga az első részletszorzat. */
  shortcut?: boolean;
  /** Ezeket a sorokat „?” jelzi. */
  hide?: ('p1' | 'p2' | 'product')[];
  /** Nevek a sorok mellett (tényezők, részletszorzatok, szorzat). */
  labels?: boolean;
  title?: string;
  className?: string;
  /** Beágyazáshoz egy másik <svg>-be: hely és szélesség. */
  nest?: { x: number; y: number; w: number };
}

/**
 * Kétjegyű szorzóval végzett írásbeli szorzás elrendezése négyzethálós papíron,
 * a tankönyv (138–141. o.) mintájára: a · b, alatta a részletszorzatok, vonal, a szorzat.
 */
export const WrittenMul2Layout: React.FC<WrittenMul2LayoutProps> = ({
  a,
  b,
  mode = 'ones',
  showZero = false,
  shortcut = false,
  hide = [],
  labels = false,
  title,
  className,
  nest
}) => {
  const W = 26;
  const t = Math.floor(b / 10);
  const e = b % 10;
  const left = labels ? 150 : 40;
  const R = 5; // a szorzandó egyeseinek oszlopa
  const cols = 10;
  const top = title ? 36 : 14;
  const colX = (c: number) => left + c * W + W / 2;
  const rowY = (r: number) => top + r * W + W / 2 + 6;

  // részletszorzatok: [szám, jobb szélső oszlop, szín, kulcs]
  const firstVal = mode === 'ones' ? a * e : a * t;
  const secondVal = mode === 'ones' ? a * t : a * e;
  const firstRight = R;
  const secondRight = mode === 'ones' ? R - 1 : R + 1;
  const productRight = mode === 'ones' ? R : R + 1;
  const product = a * b;
  const rows: { val: number; right: number; color: string; key: 'p1' | 'p2'; plus: boolean; zero: boolean }[] = [];
  if (!shortcut) rows.push({ val: firstVal, right: firstRight, color: WM2_COLORS.p1, key: 'p1', plus: false, zero: false });
  rows.push({
    val: secondVal,
    right: secondRight,
    color: WM2_COLORS.p2,
    key: 'p2',
    plus: true,
    zero: mode === 'ones' && showZero
  });
  const productRow = 1 + rows.length;
  const height = top + (productRow + 1) * W + 16;
  const width = left + cols * W + 14;

  const digitsAt = (val: number, right: number, y: number, color: string, key: string) =>
    String(val)
      .split('')
      .map((d, i, arr) => (
        <text key={`${key}${i}`} x={colX(right - (arr.length - 1 - i))} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill={color}>
          {d}
        </text>
      ));
  const qMark = (right: number, len: number, y: number, key: string) => (
    <text key={key} x={colX(right - (len - 1) / 2)} y={y} textAnchor="middle" fontSize="19" fontWeight="bold" fill={WM2_COLORS.unknown}>
      ?
    </text>
  );
  const aLen = String(a).length;
  const minCol = Math.min(R - aLen + 1, productRight - String(product).length + 1, ...rows.map((r) => r.right - String(r.val).length + 1));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={nest ? undefined : className ?? 'w-full h-auto'}
      fontFamily={FONT}
      {...(nest ? { x: nest.x, y: nest.y, width: nest.w, height: (nest.w * height) / width } : {})}
    >
      <rect x="1" y="1" width={width - 2} height={height - 2} rx="12" fill="#ffffff" stroke="#cbd5e1" />
      {title && (
        <text x={width / 2} y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
          {title}
        </text>
      )}
      {/* négyzetháló */}
      {Array.from({ length: cols + 1 }).map((_, c) => (
        <line key={`v${c}`} x1={left + c * W} y1={top} x2={left + c * W} y2={top + (productRow + 1) * W} stroke="#dbeafe" strokeWidth="1" />
      ))}
      {Array.from({ length: productRow + 2 }).map((_, r) => (
        <line key={`h${r}`} x1={left} y1={top + r * W} x2={left + cols * W} y2={top + r * W} stroke="#dbeafe" strokeWidth="1" />
      ))}
      {/* tényezők */}
      {digitsAt(a, R, rowY(0), WM2_COLORS.factor, 'a')}
      <text x={colX(R + 1)} y={rowY(0)} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7c3aed">
        ·
      </text>
      {digitsAt(b, R + 3, rowY(0), '#7c3aed', 'b')}
      <line x1={colX(minCol) - W / 2} y1={top + W} x2={colX(R) + W / 2} y2={top + W} stroke="#0f172a" strokeWidth="2" />
      {/* részletszorzatok */}
      {rows.map((row, i) => {
        const y = rowY(1 + i);
        const len = String(row.val).length;
        return (
          <g key={row.key}>
            {row.plus && (
              <text x={colX(minCol - 1)} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
                +
              </text>
            )}
            {hide.includes(row.key) ? qMark(row.right, len, y, `q${row.key}`) : digitsAt(row.val, row.right, y, row.color, row.key)}
            {row.zero && !hide.includes(row.key) && (
              <text x={colX(R)} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill={WM2_COLORS.zero}>
                0
              </text>
            )}
          </g>
        );
      })}
      <line
        x1={colX(minCol - 1) - W / 2}
        y1={top + productRow * W}
        x2={colX(productRight) + W / 2}
        y2={top + productRow * W}
        stroke="#0f172a"
        strokeWidth="2"
      />
      {hide.includes('product')
        ? qMark(productRight, String(product).length, rowY(productRow), 'qprod')
        : digitsAt(product, productRight, rowY(productRow), WM2_COLORS.product, 'prod')}
      {labels && (
        <g fontSize="12" fontWeight="bold" fill="#475569">
          <text x="12" y={rowY(0) - 2}>tényezők →</text>
          <text x="12" y={rowY(rows.length === 2 ? 1.5 : 1) - 2}>részletszorzatok →</text>
          <text x="12" y={rowY(productRow) - 2}>szorzat →</text>
        </g>
      )}
    </svg>
  );
};

/** Mona olvasása: 12 · 14 = 168, az egyesekkel kezdve (tankönyv 138. o., 1. feladat). */
export const MonaReadingSvg: React.FC<{ className?: string }> = ({ className }) => (
  <WrittenMul2Layout a={12} b={14} showZero labels title="12 · 14: előbb az egyesekkel, aztán a tízesekkel" className={className} />
);

/** Ellenőrzés a tényezők felcserélésével: 14 · 12 = 168. */
export const SwapCheckSvg: React.FC<{ className?: string }> = ({ className }) => (
  <WrittenMul2Layout a={14} b={12} showZero title="Ellenőrzés: 14 · 12 = 168" className={className} />
);

/** 24 · 26 kétféleképpen (tankönyv 140. o., 8. feladat). */
export const TwoWaysSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 420 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="418" height="168" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="108" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">
      Kezdhetjük az egyesekkel…
    </text>
    <text x="312" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
      …vagy a tízesekkel.
    </text>
    <WrittenMul2Layout a={24} b={26} mode="ones" nest={{ x: 8, y: 34, w: 200 }} />
    <WrittenMul2Layout a={24} b={26} mode="tens" nest={{ x: 212, y: 34, w: 200 }} />
    <text x="210" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      Mindkét úton 624 jön ki. Becslés: 30 · 20 = 600.
    </text>
  </svg>
);

/** Rövidebb írásmód: 85 · 16, a szorzandó az első részletszorzat (tankönyv 141. o., 11. feladat). */
export const ShortcutSvg: React.FC<{ className?: string }> = ({ className }) => (
  <WrittenMul2Layout a={85} b={16} mode="tens" shortcut title="85 · 16 rövidebben: a 85 az első részletszorzat" className={className} />
);

/** Becslés tízesre kerekítéssel: 26 ≈ 30, 24 ≈ 20, 30 · 20 = 600. */
export const EstimateSvg: React.FC<{ className?: string }> = ({ className }) => {
  const line = (y: number, from: number, n: number, to: number, label: string) => {
    const x = (v: number) => 40 + ((v - from) / 10) * 300;
    return (
      <g key={label}>
        <line x1="40" y1={y} x2="340" y2={y} stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={40 + i * 30} y1={y - (i % 5 === 0 ? 8 : 5)} x2={40 + i * 30} y2={y + (i % 5 === 0 ? 8 : 5)} stroke="#334155" strokeWidth="1.5" />
        ))}
        <text x="40" y={y + 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {from}
        </text>
        <text x="340" y={y + 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {from + 10}
        </text>
        <circle cx={x(n)} cy={y} r="6" fill="#f97316" />
        <text x={x(n)} y={y - 12} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">
          {n}
        </text>
        <path
          d={`M${x(n)} ${y + 8} Q${(x(n) + x(to)) / 2} ${y + 30} ${x(to)} ${y + 10}`}
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          markerEnd="url(#esArr)"
        />
        <text x="372" y={y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">
          ≈ {to}
        </text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="esArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#16a34a" />
        </marker>
      </defs>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#f0fdf4" stroke="#86efac" />
      <text x="200" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
        Becslés: kerekítsd mindkét tényezőt tízesre!
      </text>
      {line(60, 20, 26, 30, 'a')}
      {line(125, 20, 24, 20, 'b')}
      <text x="200" y="186" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
        26 · 24 ≈ 30 · 20 = 600
      </text>
    </svg>
  );
};

/** A hortobágyi Kilenclyukú híd nyílásai a számokkal (munkafüzet II. 53. o., 2. feladat). */
export const BRIDGE_NUMBERS = [4930, 2775, 4897, 1827, 2812, 4278, 1764, 4416, 1833];
export const BridgeSvg: React.FC<{ className?: string; marked?: number[] }> = ({ className, marked = [] }) => (
  <svg viewBox="0 0 420 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="418" height="148" rx="12" fill="#e0f2fe" stroke="#7dd3fc" />
    <rect x="10" y="98" width="400" height="44" fill="#7dd3fc" opacity="0.6" />
    <rect x="14" y="34" width="392" height="16" fill="#d6d3d1" stroke="#78716c" />
    <rect x="14" y="50" width="392" height="48" fill="#e7e5e4" stroke="#78716c" />
    {BRIDGE_NUMBERS.map((n, i) => {
      const cx = 36 + i * 43.5;
      const on = marked.includes(n);
      return (
        <g key={n}>
          <path d={`M${cx - 19} 98 L${cx - 19} 76 A19 19 0 0 1 ${cx + 19} 76 L${cx + 19} 98 Z`} fill={on ? '#bbf7d0' : '#f8fafc'} stroke="#78716c" />
          <text x={cx} y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill={on ? '#166534' : '#1e293b'}>
            {n}
          </text>
        </g>
      );
    })}
    <text x="210" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">
      Kilenclyukú híd (Hortobágy)
    </text>
  </svg>
);
