import React from 'react';

// ---------------------------------------------------------------------------
// Exportált segédek (a kvíz és a tananyag is használja)
// ---------------------------------------------------------------------------
export type XP = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;

/** Derékszög jele: negyedkörív ponttal (magyar jelölés), v csúcsnál, a1/a2 a szárak iránya fokban (képernyő-koordináta). */
export const ExamRightMark: React.FC<{ v: XP; a1: number; a2: number; r?: number; color?: string }> = ({ v, a1, a2, r = 13, color = '#0f172a' }) => {
  const u1: XP = [Math.cos(rad(a1)), Math.sin(rad(a1))];
  const u2: XP = [Math.cos(rad(a2)), Math.sin(rad(a2))];
  const p1: XP = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const p2: XP = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const sweep = cross > 0 ? 1 : 0;
  const bx = u1[0] + u2[0];
  const by = u1[1] + u2[1];
  const bl = Math.hypot(bx, by) || 1;
  return (
    <g>
      <path d={`M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={v[0] + (bx / bl) * r * 0.55} cy={v[1] + (by / bl) * r * 0.55} r="1.8" fill={color} />
    </g>
  );
};

/** Szög két sugárral; ha right, akkor derékszög-jel, különben kis ív. */
export const ExamAngle: React.FC<{ v: XP; a1: number; a2: number; len?: number; color?: string; right?: boolean; arc?: boolean }> = ({
  v,
  a1,
  a2,
  len = 40,
  color = '#2563eb',
  right,
  arc = true
}) => {
  const e1: XP = [v[0] + len * Math.cos(rad(a1)), v[1] + len * Math.sin(rad(a1))];
  const e2: XP = [v[0] + len * Math.cos(rad(a2)), v[1] + len * Math.sin(rad(a2))];
  const r = 12;
  const q1: XP = [v[0] + r * Math.cos(rad(a1)), v[1] + r * Math.sin(rad(a1))];
  const q2: XP = [v[0] + r * Math.cos(rad(a2)), v[1] + r * Math.sin(rad(a2))];
  let diff = a2 - a1;
  while (diff < 0) diff += 360;
  // mindig a belső (180°-nál kisebb) szöget jelöljük
  const sweepArc = diff <= 180 ? 1 : 0;
  return (
    <g>
      <line x1={v[0]} y1={v[1]} x2={e1[0]} y2={e1[1]} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={v[0]} y1={v[1]} x2={e2[0]} y2={e2[1]} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {right ? (
        <ExamRightMark v={v} a1={a1} a2={a2} />
      ) : (
        arc && <path d={`M${q1[0].toFixed(1)} ${q1[1].toFixed(1)} A ${r} ${r} 0 0 ${sweepArc} ${q2[0].toFixed(1)} ${q2[1].toFixed(1)}`} fill="none" stroke="#0f172a" strokeWidth="1.4" />
      )}
    </g>
  );
};

/** Téglatest ferde (kavalier) ábrázolásban, a takart élek szaggatottak. (x, y) = elülső lap bal alsó sarka. */
export const ExamCuboid: React.FC<{ x: number; y: number; w: number; h: number; d: number; fill?: string; stroke?: string }> = ({
  x,
  y,
  w,
  h,
  d,
  fill = '#bfdbfe',
  stroke = '#1d4ed8'
}) => {
  const dx = d * 0.55;
  const dy = d * 0.42;
  const s = { stroke, strokeWidth: 2, strokeLinejoin: 'round' as const };
  return (
    <g>
      <polygon points={`${x},${y - h} ${x + dx},${y - h - dy} ${x + w + dx},${y - h - dy} ${x + w},${y - h}`} fill={fill} {...s} opacity="0.95" />
      <polygon points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - h - dy} ${x + w},${y - h}`} fill={fill} {...s} />
      <rect x={x} y={y - h} width={w} height={h} fill={fill} {...s} />
      {/* takart élek */}
      <line x1={x + dx} y1={y - dy} x2={x + w + dx} y2={y - dy} stroke={stroke} strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={x + dx} y1={y - dy} x2={x + dx} y2={y - h - dy} stroke={stroke} strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={x + dx} y1={y - dy} x2={x} y2={y} stroke={stroke} strokeWidth="1.4" strokeDasharray="4 3" />
    </g>
  );
};

/** Gömb: kör, az egyenlítő hátsó fele szaggatott. */
export const ExamSphere: React.FC<{ cx: number; cy: number; r: number; fill?: string }> = ({ cx, cy, r, fill = '#fecaca' }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={fill} stroke="#b91c1c" strokeWidth="2" />
    <path d={`M${cx - r} ${cy} A ${r} ${r * 0.3} 0 0 0 ${cx + r} ${cy}`} fill="none" stroke="#b91c1c" strokeWidth="1.3" />
    <path d={`M${cx - r} ${cy} A ${r} ${r * 0.3} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#b91c1c" strokeWidth="1.3" strokeDasharray="4 3" />
  </g>
);

/** Négyzet alapú gúla: hátsó alapélek és a hátsó oldalél szaggatott. */
export const ExamPyramid: React.FC<{ x: number; y: number; w: number; h: number; fill?: string }> = ({ x, y, w, h, fill = '#fde68a' }) => {
  const dx = w * 0.45;
  const dy = w * 0.32;
  const A: XP = [x, y];
  const B: XP = [x + w, y];
  const C: XP = [x + w + dx, y - dy];
  const D: XP = [x + dx, y - dy];
  const S: XP = [x + w / 2 + dx / 2, y - h];
  const p = (pts: XP[]) => pts.map((q) => q.join(',')).join(' ');
  return (
    <g>
      <polygon points={p([A, B, S])} fill={fill} stroke="#a16207" strokeWidth="2" />
      <polygon points={p([B, C, S])} fill={fill} stroke="#a16207" strokeWidth="2" opacity="0.9" />
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} stroke="#a16207" strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} stroke="#a16207" strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={D[0]} y1={D[1]} x2={S[0]} y2={S[1]} stroke="#a16207" strokeWidth="1.4" strokeDasharray="4 3" />
    </g>
  );
};

/** Henger: a hátsó alapkör-ív szaggatott. */
export const ExamCylinder: React.FC<{ cx: number; by: number; r: number; h: number; fill?: string }> = ({ cx, by, r, h, fill = '#a7f3d0' }) => {
  const ry = r * 0.32;
  return (
    <g>
      <path d={`M${cx - r} ${by - h} L${cx - r} ${by} A ${r} ${ry} 0 0 0 ${cx + r} ${by} L${cx + r} ${by - h}`} fill={fill} stroke="#047857" strokeWidth="2" />
      <ellipse cx={cx} cy={by - h} rx={r} ry={ry} fill={fill} stroke="#047857" strokeWidth="2" />
      <path d={`M${cx - r} ${by} A ${r} ${ry} 0 0 1 ${cx + r} ${by}`} fill="none" stroke="#047857" strokeWidth="1.3" strokeDasharray="4 3" />
    </g>
  );
};

/** Kis kockákból álló építmény (ferde ábrázolás). heights[d][c]: d = 0 a hátsó sor. */
export const ExamBuilding: React.FC<{ heights: number[][]; x0: number; y0: number; u: number; color?: string }> = ({ heights, x0, y0, u, color = '#f9a8d4' }) => {
  const dx = u * 0.5;
  const dy = u * 0.4;
  const rows = heights.length;
  const cubes: React.ReactNode[] = [];
  heights.forEach((row, d) => {
    const depth = rows - 1 - d; // hátsó sor: legnagyobb mélység
    row.forEach((hgt, c) => {
      for (let z = 0; z < hgt; z++) {
        const X = x0 + c * u + depth * dx;
        const Y = y0 - z * u - depth * dy;
        cubes.push(
          <g key={`${d}-${c}-${z}`}>
            <rect x={X} y={Y - u} width={u} height={u} fill={color} stroke="#831843" strokeWidth="1.2" />
            <polygon points={`${X},${Y - u} ${X + dx},${Y - u - dy} ${X + u + dx},${Y - u - dy} ${X + u},${Y - u}`} fill="#fbcfe8" stroke="#831843" strokeWidth="1.2" />
            <polygon points={`${X + u},${Y} ${X + u + dx},${Y - dy} ${X + u + dx},${Y - u - dy} ${X + u},${Y - u}`} fill="#ec4899" stroke="#831843" strokeWidth="1.2" />
          </g>
        );
      }
    });
  });
  return <g>{cubes}</g>;
};

/** Zászló sokszög (a rúd alja a (0,0) pont), rácsegységben. */
export const EXAM_FLAG: XP[] = [[0, 0], [0, -3], [2, -3], [2, -2], [1, -2], [1, 0]];
export const examPoly = (pts: XP[], cx: number, cy: number, u: number) => pts.map(([x, y]) => `${cx + x * u},${cy + y * u}`).join(' ');
export const examRotQ = ([x, y]: XP, q: number): XP => {
  let p: XP = [x, y];
  for (let i = 0; i < ((q % 4) + 4) % 4; i++) p = [-p[1], p[0]];
  return p;
};

// ---------------------------------------------------------------------------
// 1. Szögek csoportosítása (MF 43/4.)
// ---------------------------------------------------------------------------
export const AngleGroupsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const items: { l: string; v: XP; a1: number; a2: number; right?: boolean; g: string }[] = [
    { l: 'A', v: [45, 85], a1: 0, a2: -140, g: 'nagyobb' },
    { l: 'B', v: [100, 45], a1: 0, a2: 90, right: true, g: 'derékszög' },
    { l: 'C', v: [175, 90], a1: -60, a2: -120, g: 'kisebb' },
    { l: 'D', v: [215, 90], a1: -35, a2: 0, g: 'kisebb' },
    { l: 'E', v: [270, 90], a1: -90, a2: 0, right: true, g: 'derékszög' },
    { l: 'F', v: [330, 90], a1: -180, a2: -55, g: 'nagyobb' }
  ];
  return (
    <svg viewBox="0 0 380 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="378" height="168" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {items.map((it) => (
        <g key={it.l}>
          <ExamAngle v={it.v} a1={it.a1} a2={it.a2} right={it.right} />
          <text x={it.v[0] + (it.l === 'B' ? 12 : 0)} y={it.l === 'B' ? 38 : 108} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
            {it.l}
          </text>
        </g>
      ))}
      <rect x="10" y="122" width="115" height="38" rx="10" fill="#f0fdf4" stroke="#22c55e" />
      <text x="67" y="138" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#166534">Derékszögnél kisebb</text>
      <text x="67" y="153" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">C, D</text>
      <rect x="133" y="122" width="115" height="38" rx="10" fill="#eff6ff" stroke="#3b82f6" />
      <text x="190" y="138" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1d4ed8">Derékszögű</text>
      <text x="190" y="153" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">B, E</text>
      <rect x="256" y="122" width="115" height="38" rx="10" fill="#fff7ed" stroke="#f97316" />
      <text x="313" y="138" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#c2410c">Derékszögnél nagyobb</text>
      <text x="313" y="153" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">A, F</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 2. Testek és síkidomok (MF 43/5.)
// ---------------------------------------------------------------------------
export const SolidsVsShapesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 380 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="378" height="148" rx="12" fill="#ffffff" stroke="#e2e8f0" />
    <ExamCuboid x={14} y={90} w={34} h={34} d={20} fill="#bfdbfe" />
    <ExamSphere cx={92} cy={70} r={22} />
    <rect x={128} y={52} width={36} height={36} fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <ExamCuboid x={180} y={90} w={50} h={28} d={22} fill="#bfdbfe" />
    <circle cx={270} cy={70} r={20} fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <polygon points="300,88 314,52 360,52 346,88" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    {[
      { x: 38, t: 'kocka', s: true },
      { x: 92, t: 'gömb', s: true },
      { x: 146, t: 'négyzet', s: false },
      { x: 215, t: 'téglatest', s: true },
      { x: 270, t: 'kör', s: false },
      { x: 330, t: 'ferde négyszög', s: false }
    ].map((it) => (
      <g key={it.t}>
        <text x={it.x} y={112} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f172a">
          {it.t}
        </text>
        <text x={it.x} y={130} textAnchor="middle" fontSize="10" fontWeight="bold" fill={it.s ? '#1d4ed8' : '#b91c1c'}>
          {it.s ? 'test' : 'síkidom'}
        </text>
      </g>
    ))}
    <text x="190" y="145" textAnchor="middle" fontSize="9.5" fill="#475569">A testek takart élei szaggatottak.</text>
  </svg>
);

// ---------------------------------------------------------------------------
// 3. Sokszögek halmazábrája (MF 43/6.)
// ---------------------------------------------------------------------------
export const PolygonVennSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 380 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="6" y="6" width="368" height="198" rx="6" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
    <rect x="6" y="6" width="96" height="22" fill="#15803d" />
    <text x="54" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">SOKSZÖGEK</text>
    <ellipse cx="145" cy="120" rx="105" ry="68" fill="#dcfce7" fillOpacity="0.5" stroke="#16a34a" strokeWidth="2" />
    <ellipse cx="245" cy="120" rx="105" ry="68" fill="#fee2e2" fillOpacity="0.5" stroke="#dc2626" strokeWidth="2" />
    <text x="105" y="48" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#166534">Vannak párhuzamos oldalai</text>
    <text x="290" y="48" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b91c1c">Négyszögek</text>
    {/* csak párhuzamos: hatszög */}
    <polygon points="70,110 82,92 106,92 118,110 106,128 82,128" fill="#86efac" stroke="#166534" />
    <text x="94" y="146" textAnchor="middle" fontSize="9" fill="#166534">hatszög</text>
    {/* közös rész: téglalap, négyzet, ferde négyszög */}
    <rect x="172" y="78" width="44" height="22" fill="#fde68a" stroke="#92400e" />
    <text x="194" y="112" textAnchor="middle" fontSize="9" fill="#78350f">téglalap</text>
    <rect x="160" y="124" width="24" height="24" fill="#fde68a" stroke="#92400e" />
    <text x="172" y="160" textAnchor="middle" fontSize="9" fill="#78350f">négyzet</text>
    <polygon points="196,148 206,124 232,124 222,148" fill="#fde68a" stroke="#92400e" />
    <text x="214" y="160" textAnchor="middle" fontSize="9" fill="#78350f">ferde n.</text>
    {/* csak négyszög: sárkány */}
    <polygon points="300,86 318,110 300,150 282,110" fill="#fca5a5" stroke="#991b1b" />
    <text x="300" y="164" textAnchor="middle" fontSize="9" fill="#991b1b">sárkány</text>
    {/* egyik sem */}
    <polygon points="30,190 46,166 62,190" fill="#c7d2fe" stroke="#3730a3" />
    <polygon points="335,192 323,180 328,165 343,165 348,180" fill="#c7d2fe" stroke="#3730a3" />
    <text x="80" y="190" fontSize="9" fill="#3730a3">háromszög</text>
    <text x="318" y="200" textAnchor="end" fontSize="9" fill="#3730a3">ötszög</text>
  </svg>
);

// ---------------------------------------------------------------------------
// 4. Síkidomok tulajdonságai (MF 47/10.)
// ---------------------------------------------------------------------------
export const ShapePropertiesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const rows: { n: string; draw: React.ReactNode; p: [boolean, boolean, boolean] }[] = [
    { n: 'négyzet', draw: <rect x={-11} y={-11} width={22} height={22} fill="#fde68a" stroke="#92400e" />, p: [true, true, true] },
    { n: 'téglalap', draw: <rect x={-16} y={-8} width={32} height={16} fill="#fde68a" stroke="#92400e" />, p: [true, true, true] },
    { n: 'kör', draw: <circle r={11} fill="#bbf7d0" stroke="#15803d" />, p: [false, false, true] },
    { n: 'egyenlő szárú háromszög', draw: <polygon points="0,-12 10,10 -10,10" fill="#fed7aa" stroke="#c2410c" />, p: [false, false, true] },
    { n: 'ferde négyszög', draw: <polygon points="-16,9 -8,-9 16,-9 8,9" fill="#fef9c3" stroke="#a16207" />, p: [false, true, false] },
    { n: 'derékszögű háromszög', draw: <polygon points="-12,10 -12,-10 14,10" fill="#bfdbfe" stroke="#1d4ed8" />, p: [true, false, false] }
  ];
  const head = ['Van derékszöge?', 'Van párhuzamos oldalpárja?', 'Van szimmetriatengelye?'];
  return (
    <svg viewBox="0 0 380 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="378" height="248" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {head.map((h, i) => (
        <text key={h} x={205 + i * 62} y={22} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#334155">
          {h.split(' ').slice(0, 2).join(' ')}
          <tspan x={205 + i * 62} dy="11">
            {h.split(' ').slice(2).join(' ')}
          </tspan>
        </text>
      ))}
      {rows.map((r, i) => {
        const y = 52 + i * 32;
        return (
          <g key={r.n}>
            <rect x="8" y={y - 14} width="364" height="30" rx="6" fill={i % 2 ? '#f8fafc' : '#ffffff'} />
            <g transform={`translate(30 ${y + 1})`}>{r.draw}</g>
            <text x="56" y={y + 5} fontSize="11" fontWeight="bold" fill="#0f172a">
              {r.n}
            </text>
            {r.p.map((ok, j) => (
              <text key={j} x={205 + j * 62} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="bold" fill={ok ? '#16a34a' : '#dc2626'}>
                {ok ? '✓' : '✗'}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 5. A négy mozgás egy ábrán: tükrözés, eltolás, elforgatás, nagyítás
// ---------------------------------------------------------------------------
export const MovesOverviewSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 10;
  const panel = (x: number, title: string, children: React.ReactNode) => (
    <g>
      <rect x={x} y={8} width={88} height={124} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x={x + 44} y={146} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {children}
    </g>
  );
  const orig = (cx: number, cy: number) => <polygon points={examPoly(EXAM_FLAG, cx, cy, u)} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />;
  return (
    <svg viewBox="0 0 380 156" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="378" height="154" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {panel(
        6,
        'tükrözés',
        <g>
          {orig(22, 90)}
          <line x1="50" y1="20" x2="50" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
          <polygon points={examPoly(EXAM_FLAG.map(([x, y]) => [-x, y] as XP), 78, 90, u)} fill="#c4b5fd" stroke="#6d28d9" strokeWidth="1.5" />
        </g>
      )}
      {panel(
        100,
        'eltolás',
        <g>
          {orig(110, 110)}
          <line x1="125" y1="95" x2="150" y2="70" stroke="#2563eb" strokeWidth="2" />
          <polygon points="154,66 145,69 151,75" fill="#2563eb" />
          <polygon points={examPoly(EXAM_FLAG, 150, 70, u)} fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
        </g>
      )}
      {panel(
        194,
        'elforgatás',
        <g>
          {orig(228, 80)}
          <polygon points={examPoly(EXAM_FLAG.map((p) => examRotQ(p, 1)), 228, 80, u)} fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
          <circle cx={228} cy={80} r="3.5" fill="#dc2626" />
          <ExamRightMark v={[228, 80]} a1={-90} a2={0} r={9} color="#ea580c" />
        </g>
      )}
      {panel(
        288,
        'nagyítás',
        <g>
          <polygon points={examPoly(EXAM_FLAG, 298, 120, 6)} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
          <polygon points={examPoly(EXAM_FLAG, 322, 120, 12)} fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 6. Építmény kis kockákból és alaprajza
// ---------------------------------------------------------------------------
export const BuildingPlanSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const heights = [
    [3, 2, 1],
    [2, 1, 1]
  ];
  const u = 26;
  return (
    <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="378" height="188" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <ExamBuilding heights={heights} x0={24} y0={160} u={u} />
      <text x="70" y="182" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">építmény</text>
      <g transform="translate(230 40)">
        {heights.map((row, r) =>
          row.map((h, c) => (
            <g key={`${r}-${c}`}>
              <rect x={c * 36} y={r * 36} width={36} height={36} fill="#fdf2f8" stroke="#831843" strokeWidth="1.5" />
              <text x={c * 36 + 18} y={r * 36 + 24} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#831843">
                {h}
              </text>
            </g>
          ))
        )}
        <text x="54" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">alaprajz (felülnézet)</text>
        <text x="54" y="114" textAnchor="middle" fontSize="11" fill="#334155">hátul: 3, 2, 1 – elöl: 2, 1, 1</text>
        <text x="54" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be185d">3 + 2 + 1 + 2 + 1 + 1 = 10 kocka</text>
      </g>
    </svg>
  );
};
