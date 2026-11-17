import React from 'react';
import { Solid, SolidKind, SOLID_INFO, FitBuilding, PlanGrid, Txt, INK, CylinderShape, PolySolid, boxGeom, pyramid4Geom } from './SolidsG3Parts';

// ---------------------------------------------------------------------------
// 1. A testek – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const cls = 'w-full max-w-xl h-auto mx-auto';

/** Testek körülöttünk: minden test alatt egy hasonló tárgy neve. */
export const SolidsAroundUsSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const kinds: SolidKind[] = ['kocka', 'teglatest', 'gomb', 'henger', 'kup', 'piramis4', 'sator', 'felgomb'];
  return (
    <svg viewBox="0 0 480 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="296" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {kinds.map((k, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const cx = 60 + col * 120;
        const by = 112 + row * 142;
        return (
          <g key={k}>
            <Solid kind={k} cx={cx} by={by} s={70} sw={2.2} />
            <Txt x={cx} y={by + 26} s={14}>{SOLID_INFO[k].like === 'fejjel lefelé fordított tál' ? 'fordított tál' : SOLID_INFO[k].like}</Txt>
          </g>
        );
      })}
    </svg>
  );
};

/** A test lapja: ha papírra tesszük és körberajzoljuk, a lap alakját kapjuk. */
export const SolidFacesSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const arrow = (x: number, y: number) => (
    <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round">
      <line x1={x} y1={y} x2={x + 30} y2={y} />
      <path d={`M ${x + 22} ${y - 7} L ${x + 31} ${y} L ${x + 22} ${y + 7}`} />
    </g>
  );
  return (
    <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="196" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {/* kocka → négyzet */}
      <PolySolid {...boxGeom(1, 1, 1)} ox={18} oy={128} u={52} color="#3b82f6" sw={2.2} faceFill={(i) => (i === 0 ? '#fde047' : undefined)} />
      {arrow(100, 100)}
      <rect x={136} y={74} width={52} height={52} fill="#fef9c3" stroke={INK} strokeWidth="2.5" strokeDasharray="6 4" />
      <Txt x={162} y={152} s={14}>négyzet</Txt>
      {/* piramis → háromszög */}
      <PolySolid {...pyramid4Geom(1, 1.05)} ox={214} oy={128} u={52} color="#ef4444" sw={2.2} faceFill={(i) => (i === 1 ? '#fde047' : undefined)} />
      {arrow(292, 100)}
      <polygon points="326,128 380,128 353,72" fill="#fef9c3" stroke={INK} strokeWidth="2.5" strokeDasharray="6 4" />
      <Txt x={353} y={152} s={14}>háromszög</Txt>
      {/* konzervdoboz → kör */}
      <CylinderShape cx={420} by={62} r={22} h={34} color="#06b6d4" sw={2.2} />
      <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="420" y1="76" x2="420" y2="90" />
        <path d="M 414 84 L 420 92 L 426 84" />
      </g>
      <circle cx={420} cy={118} r={20} fill="#fef9c3" stroke={INK} strokeWidth="2.5" strokeDasharray="6 4" />
      <Txt x={420} y={160} s={14}>kör</Txt>
      <Txt x={240} y={186} s={13} c="#475569" w="normal">A lapot körberajzolod: megkapod az alakját.</Txt>
    </svg>
  );
};

/** Két csoport: csak lapok határolják – görbe része is van. */
export const FlatOrCurvedSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const left: SolidKind[] = ['kocka', 'teglatest', 'piramis4', 'sator'];
  const right: SolidKind[] = ['henger', 'kup', 'gomb', 'felgomb'];
  return (
    <svg viewBox="0 0 480 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="226" height="228" rx="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
      <rect x="248" y="6" width="226" height="228" rx="14" fill="#fdf2f8" stroke="#db2777" strokeWidth="2.5" />
      <Txt x={119} y={30} s={15} c="#1d4ed8">Csak lapok határolják</Txt>
      <Txt x={361} y={30} s={15} c="#be185d">Görbe része is van</Txt>
      {left.map((k, i) => (
        <Solid key={k} kind={k} cx={64 + (i % 2) * 110} by={112 + Math.floor(i / 2) * 104} s={62} sw={2.2} />
      ))}
      {right.map((k, i) => (
        <Solid key={k} kind={k} cx={306 + (i % 2) * 110} by={112 + Math.floor(i / 2) * 104} s={62} sw={2.2} />
      ))}
    </svg>
  );
};

/** Építmény kis kockákból és az alaprajza. */
export const BuildingPlanSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const plan = [
    [3, 2, 1],
    [2, 1, 1]
  ];
  return (
    <svg viewBox="0 0 480 210" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="476" height="206" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <FitBuilding plan={plan} x={20} y={20} w={200} h={160} maxU={44} />
      <g stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="236" y1="100" x2="290" y2="100" />
        <path d="M 280 92 L 291 100 L 280 108" />
      </g>
      <Txt x={262} y={86} s={12} c="#475569" w="normal">felülről</Txt>
      <PlanGrid plan={plan} x={316} y={58} cell={44} fs={24} sw={2.5} />
      <Txt x={382} y={44} s={13}>hátul</Txt>
      <Txt x={382} y={170} s={13}>elöl</Txt>
      <Txt x={240} y={198} s={13} c="#475569" w="normal">A szám megmutatja, hány kocka áll egymáson.</Txt>
    </svg>
  );
};
