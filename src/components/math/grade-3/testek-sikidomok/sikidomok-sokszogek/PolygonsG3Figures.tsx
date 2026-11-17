import React from 'react';
import { SHAPES, ShapeG, INK, FONT, UNK, SHAPE_FILL } from './PolygonsG3Parts';

// ---------------------------------------------------------------------------
// 3. Síkidomok, sokszögek – ábrák (3. osztály)
// ---------------------------------------------------------------------------
const cls = 'w-full max-w-xl h-auto mx-auto';

const T: React.FC<{ x: number; y: number; s?: number; c?: string; w?: 'bold' | 'normal'; a?: 'start' | 'middle' | 'end'; children: React.ReactNode }> = ({ x, y, s = 13, c = INK, w = 'bold', a = 'middle', children }) => (
  <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} textAnchor={a} fontFamily={FONT}>
    {children}
  </text>
);

/** Egyenes és görbe vonalak. */
export const LinesSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 150" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="226" height="142" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
    <rect x="250" y="4" width="226" height="142" rx="12" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
    <T x={117} y={26} s={15} c="#1d4ed8">egyenes vonalak</T>
    <T x={363} y={26} s={15} c="#be185d">görbe vonalak</T>
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none">
      <line x1="24" y1="60" x2="120" y2="60" />
      <line x1="140" y1="50" x2="210" y2="120" />
      <line x1="30" y1="125" x2="110" y2="90" />
      <path d="M 270 70 Q 300 30 330 70 T 390 70 T 450 70" />
      <path d="M 280 125 C 310 90 350 140 380 105" />
      <path d="M 410 130 A 26 26 0 1 1 450 110" />
    </g>
  </svg>
);

/** A síkidomok és köztük a sokszögek (a sokszögeket csak egyenes vonalak határolják). */
export const PlaneShapesSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="472" height="242" rx="16" fill="#ecfccb" stroke="#65a30d" strokeWidth="2.5" />
    <T x={20} y={28} s={16} c="#3f6212" a="start">síkidomok</T>
    <rect x="232" y="20" width="232" height="214" rx="14" fill="#f7fee7" stroke="#16a34a" strokeWidth="2.5" />
    <T x={248} y={44} s={16} c="#166534" a="start">sokszögek</T>
    <ShapeG shape={SHAPES.circle} x={22} y={44} s={70} />
    <ShapeG shape={SHAPES.moon} x={116} y={44} s={70} />
    <ShapeG shape={SHAPES.half} x={22} y={130} s={80} />
    <ShapeG shape={SHAPES.stadium} x={116} y={136} s={92} />
    <ShapeG shape={SHAPES.tri1} x={250} y={56} s={64} />
    <ShapeG shape={SHAPES.square} x={330} y={56} s={64} />
    <ShapeG shape={SHAPES.pent} x={398} y={52} s={62} />
    <ShapeG shape={SHAPES.trap} x={246} y={140} s={74} />
    <ShapeG shape={SHAPES.dart} x={326} y={140} s={64} />
    <ShapeG shape={SHAPES.hex} x={396} y={144} s={62} />
  </svg>
);

/** Oldalak és csúcsok egy ötszögön. */
export const SidesVerticesSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const P = SHAPES.house.pts!.map(([x, y]) => [60 + x * 1.7, 18 + y * 1.7] as [number, number]);
  const col = ['#2563eb', '#16a34a', '#f59e0b', '#a855f7', '#0891b2'];
  return (
    <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="196" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <polygon points={P.map((p) => p.join(',')).join(' ')} fill="#dcfce7" />
      {P.map((p, i) => {
        const q = P[(i + 1) % P.length];
        return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={col[i]} strokeWidth="6" strokeLinecap="round" />;
      })}
      {P.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="7" fill={UNK} stroke="#ffffff" strokeWidth="2" />
      ))}
      <T x={250} y={70} s={16} c="#16a34a" a="start">5 oldal: a színes vonalak</T>
      <T x={250} y={100} s={16} c={UNK} a="start">5 csúcs: a piros pöttyök</T>
      <T x={250} y={140} s={16} a="start">a neve: ötszög</T>
    </svg>
  );
};

/** A sokszögek neve az oldalak (csúcsok) számából. */
export const PolygonNamesSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const items: [string, string, number][] = [
    ['tri1', 'háromszög', 3],
    ['quadOdd', 'négyszög', 4],
    ['pentOdd', 'ötszög', 5],
    ['hexL', 'hatszög', 6]
  ];
  return (
    <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="166" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {items.map(([id, name, n], i) => (
        <g key={id}>
          <ShapeG shape={SHAPES[id]} x={20 + i * 116} y={14} s={84} dots fill={SHAPE_FILL[n]} />
          <T x={62 + i * 116} y={126} s={15}>{name}</T>
          <T x={62 + i * 116} y={148} s={13} c="#475569" w="normal">{`${n} oldal, ${n} csúcs`}</T>
        </g>
      ))}
    </svg>
  );
};

/** Téglalap és négyzet: a sarkuk olyan, mint a füzetlap sarka. */
export const RectSquareSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="476" height="196" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {/* téglalap */}
    <rect x="30" y="50" width="170" height="90" fill="#bfdbfe" stroke={INK} strokeWidth="3" />
    <T x={115} y={36} s={15}>téglalap</T>
    <T x={115} y={166} s={12} c="#475569" w="normal">a szemközti oldalai egyenlők</T>
    {/* füzetlap sarka a téglalap bal alsó sarkán */}
    <polygon points="30,140 30,100 42,108 56,124 72,140" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" opacity="0.95" />
    <T x={115} y={186} s={12} c="#a16207" w="normal">a sarka: mint a füzetlap sarka</T>
    {/* négyzet */}
    <rect x="290" y="45" width="100" height="100" fill="#bbf7d0" stroke={INK} strokeWidth="3" />
    <T x={340} y={36} s={15}>négyzet</T>
    <T x={340} y={166} s={12} c="#475569" w="normal">mind a 4 oldala egyenlő</T>
    <T x={340} y={186} s={12} c="#15803d">Minden négyzet téglalap is!</T>
    {[0, 1, 2, 3].map((i) => {
      const pos = [
        [340, 45],
        [390, 95],
        [340, 145],
        [290, 95]
      ][i];
      const v = i % 2 === 0;
      return <line key={i} x1={pos[0] - (v ? 0 : 6)} y1={pos[1] - (v ? 6 : 0)} x2={pos[0] + (v ? 0 : 6)} y2={pos[1] + (v ? 6 : 0)} stroke={UNK} strokeWidth="3" />;
    })}
  </svg>
);
