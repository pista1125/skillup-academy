import React from 'react';
import { Txt, FitBuilding, CubeBuilding } from '../a-testek/SolidsG3Parts';
import { Box, cuboidPlan, NetGrid, CuboidNet, CUBE_NETS_OK } from './CuboidG3Parts';

// ---------------------------------------------------------------------------
// 2. A téglatest és a kocka – ábrák (3. osztály)
// ---------------------------------------------------------------------------
const cls = 'w-full max-w-xl h-auto mx-auto';
const RED = '#fca5a5';
const BLUE = '#93c5fd';
const YEL = '#fde68a';

/** Téglatestek és a kocka: a kocka is téglatest. */
export const CuboidsAndCubeSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="472" height="192" rx="14" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <Txt x={170} y={28} s={15} c="#9a3412">téglatestek</Txt>
    <Box l={2} h={1} d={1} x={16} y={46} w={120} hh={100} color="#f97316" sw={2.4} />
    <Box l={1} h={2} d={0.8} x={140} y={40} w={70} hh={120} color="#22c55e" sw={2.4} />
    <Box l={1.6} h={0.6} d={1.2} x={214} y={60} w={110} hh={90} color="#a855f7" sw={2.4} />
    <rect x="336" y="38" width="130" height="128" rx="12" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="7 5" />
    <Txt x={401} y={60} s={15} c="#1d4ed8">kocka</Txt>
    <Box l={1} h={1} d={1} x={346} y={68} w={110} hh={90} color="#3b82f6" sw={2.4} />
    <Txt x={240} y={186} s={13} c="#475569" w="normal">A kocka is téglatest: minden lapja egyforma négyzet.</Txt>
  </svg>
);

/** A téglatest szemközti lapjai egyformák (azonos szín), és a hálója. */
export const OppositeFacesSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  // boxGeom lapsorrend: 0 elöl, 1 hátul, 2 alul, 3 fölül, 4 bal, 5 jobb
  const col = (i: number) => [RED, RED, BLUE, BLUE, YEL, YEL][i];
  return (
    <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="216" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <Box l={2} h={1.2} d={1} x={14} y={30} w={190} hh={140} faceFill={col} sw={2.4} />
      <Txt x={110} y={196} s={13} c="#475569" w="normal">3 pár egyforma lap</Txt>
      <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="212" y1="110" x2="244" y2="110" />
        <path d="M 236 102 L 245 110 L 236 118" />
      </g>
      <CuboidNet l={2} d={1} h={1.2} x={252} y={20} w={216} hh={170} colors={[RED, BLUE, YEL]} sw={2.2} />
      <Txt x={360} y={206} s={13} c="#475569" w="normal">a téglatest hálója</Txt>
    </svg>
  );
};

/** A kocka hálója: 6 egyforma négyzet. */
export const CubeNetSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="476" height="196" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Box l={1} h={1} d={1} x={30} y={40} w={140} hh={120} color="#3b82f6" sw={2.4} />
    <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round">
      <line x1="186" y1="100" x2="222" y2="100" />
      <path d="M 214 92 L 223 100 L 214 108" />
    </g>
    <NetGrid cells={CUBE_NETS_OK[0]} x={240} y={18} w={220} h={160} maxCell={46} fill="#bfdbfe" labels={['1', '2', '3', '4', '5', '6']} sw={2.4} fs={20} />
    <Txt x={330} y={192} s={13} c="#475569" w="normal">6 négyzet – kivágva és összehajtva kocka lesz</Txt>
  </svg>
);

/** Téglatest kis kockákból: rétegenként számolunk. */
export const LayersSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 210" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="476" height="206" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <FitBuilding plan={cuboidPlan(3, 2, 1)} x={16} y={70} w={130} h={80} maxU={34} color="#38bdf8" />
    <Txt x={80} y={176} s={13}>1 réteg: 3 · 2 = 6</Txt>
    <Txt x={170} y={120} s={22} c="#475569">+</Txt>
    <FitBuilding plan={cuboidPlan(3, 2, 1)} x={192} y={70} w={130} h={80} maxU={34} color="#a78bfa" />
    <Txt x={256} y={176} s={13}>még 1 réteg: 6</Txt>
    <Txt x={340} y={120} s={22} c="#475569">=</Txt>
    <CubeBuilding plan={cuboidPlan(3, 2, 2)} ox={362} oy={160} u={30} color="#f97316" />
    <Txt x={414} y={192} s={13}>6 + 6 = 12 kocka</Txt>
  </svg>
);

/** Kiegészítés kockává: a hiányzó kis kockák szaggatottan. */
export const CompleteCubeSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const u = 38;
  const ox = 260;
  const oy = 170;
  const ghost = (c: number, k: number, z: number) => {
    const p = (x: number, y: number, zz: number) => `${ox + u * (x + 0.42 * zz)},${oy - u * (y + 0.32 * zz)}`;
    return (
      <g key={`${c}${k}${z}`} fill="none" stroke="#64748b" strokeWidth="1.8" strokeDasharray="5 4">
        <polygon points={[p(c, k, z), p(c + 1, k, z), p(c + 1, k + 1, z), p(c, k + 1, z)].join(' ')} />
        <polygon points={[p(c, k + 1, z), p(c + 1, k + 1, z), p(c + 1, k + 1, z + 1), p(c, k + 1, z + 1)].join(' ')} />
        <polygon points={[p(c + 1, k, z), p(c + 1, k, z + 1), p(c + 1, k + 1, z + 1), p(c + 1, k + 1, z)].join(' ')} />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 480 210" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="206" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <FitBuilding plan={cuboidPlan(2, 2, 1)} x={20} y={60} w={150} h={100} maxU={38} color="#f97316" />
      <Txt x={95} y={188} s={13}>4 kocka</Txt>
      <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="186" y1="120" x2="226" y2="120" />
        <path d="M 218 112 L 227 120 L 218 128" />
      </g>
      <CubeBuilding plan={cuboidPlan(2, 2, 1)} ox={ox} oy={oy} u={u} color="#f97316" />
      {[ghost(0, 1, 1), ghost(1, 1, 1), ghost(0, 1, 0), ghost(1, 1, 0)]}
      <Txt x={425} y={90} s={14}>+ 4 kocka</Txt>
      <Txt x={425} y={112} s={13} c="#475569" w="normal">(szaggatott)</Txt>
      <Txt x={340} y={198} s={13}>4 + 4 = 8: kocka lett</Txt>
    </svg>
  );
};
