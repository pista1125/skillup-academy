import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Szögív path az (x, y) csúcsnál, a pozitív x tengelytől felfelé (képernyőn) `deg` fokig. */
const arcPath = (x: number, y: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  const ex = x + r * Math.cos(rad);
  const ey = y - r * Math.sin(rad);
  return `M ${x + r} ${y} A ${r} ${r} 0 0 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
};

const RightAngleMark: React.FC<{ x: number; y: number; size?: number; dir?: 'left-up' | 'right-up' }> = ({
  x,
  y,
  size = 12,
  dir = 'left-up'
}) => {
  // Magyar derékszög-jelölés: negyedkörív, benne ponttal
  const sign = dir === 'left-up' ? -1 : 1;
  const sweep = dir === 'left-up' ? 1 : 0;
  const d = 0.39 * size;
  return (
    <g>
      <path
        d={`M ${x + sign * size} ${y} A ${size} ${size} 0 0 ${sweep} ${x} ${y - size}`}
        fill="none"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <circle cx={x + sign * d} cy={y - d} r={Math.max(1.4, size / 7)} fill="#475569" />
    </g>
  );
};

// 1. ábra: A víztorony magassága 30 m távolságból, 38°-os emelkedési szögben
export const WaterTowerSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 70, y: 250 };
  const C = { x: 330, y: 250 };
  // méretarányos rajz: 260 px vízszintes ↔ 260 · tg 38° ≈ 203 px függőleges
  const h = 260 * Math.tan((38 * Math.PI) / 180);
  const B = { x: C.x, y: C.y - h };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Milyen magas a víztorony?
      </text>
      {/* talaj */}
      <line x1="30" y1={A.y} x2="530" y2={A.y} stroke="#94a3b8" strokeWidth="2" />
      {/* torony */}
      <rect x={C.x - 14} y={B.y + 34} width="28" height={h - 34} fill="#cbd5e1" stroke="#64748b" />
      <ellipse cx={C.x} cy={B.y + 20} rx="40" ry="22" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
      {/* háromszög */}
      <polygon
        points={`${A.x},${A.y} ${C.x},${C.y} ${B.x},${B.y}`}
        fill="rgba(59,130,246,0.08)"
        stroke="#2563eb"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <RightAngleMark x={C.x} y={C.y} />
      <path d={arcPath(A.x, A.y, 48, 38)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 58} y={A.y - 16} fontSize="13" fontWeight="bold" fill="#b91c1c">38°</text>
      <text x={(A.x + C.x) / 2} y={A.y + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">
        30 m
      </text>
      <text x={C.x + 52} y={(B.y + C.y) / 2} fontSize="15" fontWeight="bold" fill="#047857">h = ?</text>
      <circle cx={A.x} cy={A.y} r="4" fill="#0f172a" />
      <text x={A.x - 8} y={A.y + 22} fontSize="11" fill="#334155">megfigyelő</text>
      <text x="280" y="285" fontSize="11" textAnchor="middle" fill="#475569">
        h = 30 · tg 38° ≈ 30 · 0,78 ≈ 23,4 m
      </text>
    </svg>
  );
};

// 2. ábra: Hasonló derékszögű háromszögek közös α szöggel
export const SimilarRightTrianglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 60, y: 250 };
  const tg = Math.tan((32 * Math.PI) / 180);
  const b1 = 200;
  const b2 = 420;
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Azonos hegyesszög ⇒ hasonló derékszögű háromszögek
      </text>
      <polygon
        points={`${A.x},${A.y} ${A.x + b2},${A.y} ${A.x + b2},${A.y - b2 * tg}`}
        fill="rgba(16,185,129,0.10)"
        stroke="#059669"
        strokeWidth="2"
      />
      <polygon
        points={`${A.x},${A.y} ${A.x + b1},${A.y} ${A.x + b1},${A.y - b1 * tg}`}
        fill="rgba(59,130,246,0.15)"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <RightAngleMark x={A.x + b1} y={A.y} />
      <RightAngleMark x={A.x + b2} y={A.y} />
      <path d={arcPath(A.x, A.y, 40, 32)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 48} y={A.y - 8} fontSize="13" fontWeight="bold" fill="#b91c1c">α</text>
      <text x={A.x + b1 - 14} y={A.y - (b1 * tg) / 2} fontSize="14" fontWeight="bold" fill="#1d4ed8" textAnchor="end">a</text>
      <text x={A.x + b1 / 2} y={A.y + 20} fontSize="14" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">b</text>
      <text x={A.x + b2 + 12} y={A.y - (b2 * tg) / 2} fontSize="14" fontWeight="bold" fill="#047857">d</text>
      <text x={A.x + (b1 + b2) / 2 + 40} y={A.y + 20} fontSize="14" fontWeight="bold" fill="#047857" textAnchor="middle">e</text>
      <rect x="300" y="48" width="230" height="44" rx="10" fill="#ffffff" stroke="#a7f3d0" />
      <text x="415" y="76" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#065f46">
        a / b = d / e = tg α
      </text>
    </svg>
  );
};

// 3. ábra: A tangens definíciója – szemközti és szög melletti befogó
export const TangentDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 90, y: 240 };
  const C = { x: 420, y: 240 };
  const B = { x: 420, y: 70 };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A hegyesszög tangense
      </text>
      <polygon points={`${A.x},${A.y} ${C.x},${C.y} ${B.x},${B.y}`} fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke="#dc2626" strokeWidth="4" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#2563eb" strokeWidth="4" />
      <RightAngleMark x={C.x} y={C.y} size={14} />
      <path d={arcPath(A.x, A.y, 46, 27.3)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 56} y={A.y - 10} fontSize="15" fontWeight="bold" fill="#b91c1c">α</text>
      <text x={C.x + 12} y={(B.y + C.y) / 2} fontSize="12" fontWeight="bold" fill="#b91c1c">
        α-val szemközti
      </text>
      <text x={C.x + 12} y={(B.y + C.y) / 2 + 16} fontSize="12" fontWeight="bold" fill="#b91c1c">
        befogó (a)
      </text>
      <text x={(A.x + C.x) / 2} y={A.y + 22} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">
        α melletti befogó (b)
      </text>
      <text x={(A.x + B.x) / 2 - 30} y={(A.y + B.y) / 2 - 12} fontSize="12" fill="#475569" fontStyle="italic">
        átfogó
      </text>
      <rect x="120" y="48" width="170" height="40" rx="10" fill="#ffffff" stroke="#c7d2fe" />
      <text x="205" y="74" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#312e81">
        tg α = a / b
      </text>
    </svg>
  );
};

// 4. ábra: Tankönyvi „legyező” – 50 mm-es befogó, 5°, 15°, 25°, 35°, 45°
export const TangentFanSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 60, y: 260 };
  const base = 300; // 50 mm ≙ 300 px
  const angles = [5, 15, 25, 35, 45];
  const colors = ['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        50 mm-es szög melletti befogó – különböző szögek
      </text>
      <line x1={A.x} y1={A.y} x2={A.x + base} y2={A.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={A.x + base} y1={A.y} x2={A.x + base} y2={A.y - base - 4} stroke="#334155" strokeWidth="1.5" />
      {angles.map((deg, i) => {
        const opp = base * Math.tan((deg * Math.PI) / 180);
        return (
          <g key={deg}>
            <line x1={A.x} y1={A.y} x2={A.x + base} y2={A.y - opp} stroke={colors[i]} strokeWidth="2" />
            <circle cx={A.x + base} cy={A.y - opp} r="3.5" fill={colors[i]} />
            <text x={A.x + base + 10} y={A.y - opp + 4} fontSize="11" fontWeight="bold" fill={colors[i]}>
              {deg}° → {(50 * Math.tan((deg * Math.PI) / 180)).toFixed(1).replace('.', ',')} mm
            </text>
          </g>
        );
      })}
      <RightAngleMark x={A.x + base} y={A.y} />
      <text x={A.x + base / 2} y={A.y + 22} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">
        50 mm
      </text>
      <text x="470" y="270" fontSize="11" textAnchor="middle" fill="#475569">arány = szemközti : 50</text>
    </svg>
  );
};

// 5. ábra: Téglalap átlója (23,5 cm × 50 cm) – az átló és az oldal szöge
export const RectangleDiagonalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 80;
  const y0 = 220;
  const w = 400;
  const h = 188;
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="22" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Téglalap átlója: tg α = 23,5 / 50 = 0,47
      </text>
      <rect x={x0} y={y0 - h} width={w} height={h} fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0 - h} stroke="#0e7490" strokeWidth="2.5" />
      <path d={arcPath(x0, y0, 50, 25.2)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={x0 + 60} y={y0 - 8} fontSize="13" fontWeight="bold" fill="#b91c1c">α ≈ 25°</text>
      <text x={x0 + w / 2} y={y0 + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0e7490">50 cm</text>
      <text x={x0 + w + 10} y={y0 - h / 2} fontSize="13" fontWeight="bold" fill="#0e7490">23,5 cm</text>
      <text x={x0 + w - 70} y={y0 - h + 30} fontSize="12" fontWeight="bold" fill="#7c3aed">β ≈ 65°</text>
    </svg>
  );
};
