import React from 'react';
import { FONT, INK, RED, fmt, Thermo, FeverThermoIcon, BathThermoIcon, WallThermoIcon, SnowIcon, SunIcon } from './NegEverydayG3Parts';

// Kis, vastag vonalas kártyaábrák: Párosító 150 × 80, Csoportosító 80 × 80.

/**
 * Hőmérő kártyán: 10 fokos ablak (min..max), feliratok 5-önként.
 * Csoportosítóban (80 × 80) álló, párosítóban (150 × 80) fekvő hőmérő (balra a gömb, jobbra melegebb).
 */
export const ThermoCard: React.FC<{ value: number; min: number; max: number; small?: boolean }> = ({ value, min, max, small = false }) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <Thermo cx={52} yTop={9} yBot={54} min={min} max={max} value={value} labelStep={5} tw={10} fs={14} unit={false} frame={false} tick={1.8} />
      </svg>
    );
  }
  const x0 = 34;
  const x1 = 138;
  const x = (v: number) => x0 + ((v - min) / (max - min)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = min; v <= max; v++) ticks.push(v);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="18" y="18" width={x1 - 18 + 8} height="14" rx="7" fill="#ffffff" stroke="#475569" strokeWidth="2" />
      <rect x="18" y="21.5" width={x(value) - 18} height="7" fill={RED} />
      <circle cx="15" cy="25" r="11" fill={RED} stroke="#475569" strokeWidth="2" />
      {ticks.map((v) => {
        const big = v % 5 === 0;
        return <line key={v} x1={x(v)} x2={x(v)} y1="34" y2={big ? 46 : 41} stroke={v === 0 ? '#2563eb' : '#334155'} strokeWidth={big ? 3 : 2} />;
      })}
      {ticks
        .filter((v) => v % 5 === 0)
        .map((v) => (
          <text key={`l${v}`} x={x(v)} y="66" textAnchor="middle" fontSize="18" fontWeight="bold" fill={v === 0 ? '#2563eb' : INK}>
            {fmt(v)}
          </text>
        ))}
    </svg>
  );
};

/** Liftgomb nagy számmal. */
export const LiftButtonCard: React.FC<{ n: number | string; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const s = typeof n === 'number' ? fmt(n) : n;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={W / 2 - 30} y="6" width="60" height="68" rx="8" fill="#e2e8f0" stroke="#475569" strokeWidth="3" />
      <circle cx={W / 2} cy="40" r="24" fill="#ffffff" stroke="#f59e0b" strokeWidth="4" />
      <text x={W / 2} y="49" textAnchor="middle" fontSize="26" fontWeight="bold" fill={INK}>
        {s}
      </text>
    </svg>
  );
};

/** Mini ház: 1 emelet, földszint, 2 szint lent; a kiemelt szint sárga, a gombja „?”. */
export const MiniHouseCard: React.FC<{ hl: number }> = ({ hl }) => {
  const floors = [1, 0, -1, -2];
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="0" y="0" width="150" height="40" fill="#e0f2fe" />
      <rect x="0" y="40" width="150" height="40" fill="#d6b48a" />
      {floors.map((n, i) => (
        <g key={n}>
          <rect x="22" y={2 + i * 19} width="64" height="19" fill={n === hl ? '#fde68a' : n < 0 ? '#e7e5e4' : '#ffffff'} stroke="#475569" strokeWidth="2.5" />
          <rect x="100" y={3.5 + i * 19} width="36" height="16" rx="8" fill={n === hl ? '#fee2e2' : '#ffffff'} stroke={n === hl ? RED : '#475569'} strokeWidth="2" />
          <text x="118" y={16.5 + i * 19} textAnchor="middle" fontSize="15" fontWeight="bold" fill={n === hl ? RED : INK}>
            {n === hl ? '?' : fmt(n)}
          </text>
        </g>
      ))}
      <line x1="0" x2="150" y1="40" y2="40" stroke="#78350f" strokeWidth="3" />
    </svg>
  );
};

/** Búvár a víz alatt: a vízfelszín 0, a vonalak méterenként (szám csak a 0-nál). */
export const DiverCard: React.FC<{ depth: 1 | 2 | 3; small?: boolean }> = ({ depth, small = false }) => {
  const W = small ? 80 : 150;
  const y0 = 16;
  const st = 19;
  const dy = y0 + depth * st;
  const k = small ? 0.8 : 1.1;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="0" y="0" width={W} height={y0} fill="#e0f2fe" />
      <rect x="0" y={y0} width={W} height={80 - y0} fill="#7dd3fc" />
      <line x1="0" x2={W} y1={y0} y2={y0} stroke="#0369a1" strokeWidth="3" />
      <text x="6" y={y0 - 2} fontSize="14" fontWeight="bold" fill="#1e3a8a">
        0
      </text>
      <line x1="24" x2="24" y1={y0} y2={y0 + 3 * st} stroke={INK} strokeWidth="3" />
      {[1, 2, 3].map((d) => (
        <line key={d} x1="17" x2="31" y1={y0 + d * st} y2={y0 + d * st} stroke={INK} strokeWidth="3" />
      ))}
      <line x1="32" x2={small ? 40 : 70} y1={dy} y2={dy} stroke={RED} strokeWidth="2.5" strokeDasharray="4 3" />
      <g transform={`translate(${small ? 53 : 102} ${dy}) scale(${k})`}>
        <ellipse cx="0" cy="0" rx="18" ry="6" fill={INK} />
        <circle cx="-20" cy="-1" r="6" fill="#fcd34d" stroke={INK} strokeWidth="2" />
        <path d="M18 0 l12 -6 l0 12 Z" fill="#16a34a" />
      </g>
    </svg>
  );
};

/** Szöveges „tábla” nagy betűkkel (pl. „–4 °C”). */
export const BigTextCard: React.FC<{ text: string; color?: string; small?: boolean }> = ({ text, color = INK, small = false }) => {
  const W = small ? 80 : 150;
  const fs = Math.min(26, (W - 14) / (text.length * 0.58));
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="4" y="18" width={W - 8} height="44" rx="10" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={W / 2} y={40 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={color}>
        {text}
      </text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Helyzet-ikonok (80 × 80 vagy 150 × 80)
// ---------------------------------------------------------------------------
type IconKind = 'fever' | 'sick' | 'bed' | 'doctor' | 'bathfish' | 'tub' | 'duck' | 'soap' | 'wall' | 'snowtree' | 'window' | 'snowman' | 'freezer' | 'fridge' | 'beach' | 'ice';

export const IconCard: React.FC<{ kind: IconKind; small?: boolean }> = ({ kind, small = true }) => {
  const W = small ? 80 : 150;
  const c = W / 2;
  const body = (() => {
    switch (kind) {
      case 'fever':
        return <FeverThermoIcon x={c} y={40} k={small ? 0.95 : 1.3} />;
      case 'sick':
        return (
          <g>
            <circle cx={c} cy="40" r="24" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
            <circle cx={c - 14} cy="46" r="5" fill="#fca5a5" />
            <circle cx={c + 14} cy="46" r="5" fill="#fca5a5" />
            <path d={`M${c - 11} 33 l6 2 M${c + 11} 33 l-6 2`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <path d={`M${c - 7} 52 q7 -5 14 0`} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <rect x={c + 4} y="50" width="26" height="6" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="2" transform={`rotate(20 ${c + 4} 53)`} />
          </g>
        );
      case 'bed':
        return (
          <g>
            <rect x={c - 32} y="44" width="64" height="16" rx="3" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="3" />
            <line x1={c - 32} x2={c - 32} y1="30" y2="68" stroke="#78350f" strokeWidth="4" />
            <line x1={c + 32} x2={c + 32} y1="44" y2="68" stroke="#78350f" strokeWidth="4" />
            <circle cx={c - 20} cy="38" r="9" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
            <rect x={c - 20} y="20" width="16" height="7" rx="2" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
          </g>
        );
      case 'doctor':
        return (
          <g>
            <rect x={c - 26} y="24" width="52" height="40" rx="6" fill="#ffffff" stroke="#475569" strokeWidth="3" />
            <path d={`M${c - 10} 24 v-6 h20 v6`} fill="none" stroke="#475569" strokeWidth="3" />
            <path d={`M${c - 4} 32 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 Z`} fill={RED} />
          </g>
        );
      case 'bathfish':
        return <BathThermoIcon x={c - 4} y={40} k={small ? 0.95 : 1.3} />;
      case 'tub':
        return (
          <g>
            <path d={`M${c - 32} 38 h64 v8 q0 18 -18 18 h-28 q-18 0 -18 -18 Z`} fill="#ffffff" stroke="#475569" strokeWidth="3" />
            <rect x={c - 30} y="38" width="60" height="8" fill="#7dd3fc" />
            <path d={`M${c + 22} 38 v-20 h-10`} fill="none" stroke="#64748b" strokeWidth="3" />
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={c - 18 + k * 9} cy={30 - k * 3} r="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
            ))}
          </g>
        );
      case 'duck':
        return (
          <g>
            <ellipse cx={c} cy="50" rx="24" ry="14" fill="#facc15" stroke="#a16207" strokeWidth="3" />
            <circle cx={c + 14} cy="30" r="11" fill="#facc15" stroke="#a16207" strokeWidth="3" />
            <path d={`M${c + 24} 30 l10 3 l-10 4 Z`} fill="#f97316" />
            <circle cx={c + 16} cy="27" r="2" fill={INK} />
            <path d={`M${c - 34} 64 q8 -5 16 0 t16 0 t16 0 t16 0`} fill="none" stroke="#38bdf8" strokeWidth="3" />
          </g>
        );
      case 'soap':
        return (
          <g>
            <rect x={c - 22} y="40" width="44" height="22" rx="8" fill="#f9a8d4" stroke="#9d174d" strokeWidth="3" />
            {[
              [c - 14, 30, 7],
              [c + 4, 22, 9],
              [c + 20, 32, 6]
            ].map(([x, y, r], k) => (
              <circle key={k} cx={x} cy={y} r={r} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
            ))}
          </g>
        );
      case 'wall':
        return <WallThermoIcon x={c} y={40} k={small ? 1.05 : 1.1} />;
      case 'snowtree':
        return (
          <g>
            <rect x={c - 4} y="54" width="8" height="16" fill="#78350f" />
            <path d={`M${c} 8 L${c + 24} 56 L${c - 24} 56 Z`} fill="#15803d" stroke="#14532d" strokeWidth="3" />
            <path d={`M${c - 11} 30 q11 6 22 0 M${c - 18} 46 q18 7 36 0`} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <SnowIcon x={c - 28} y={20} r={5} sw={2.5} />
          </g>
        );
      case 'window':
        return (
          <g>
            <rect x={c - 26} y="12" width="52" height="56" fill="#bae6fd" stroke="#78350f" strokeWidth="4" />
            <line x1={c} x2={c} y1="12" y2="68" stroke="#78350f" strokeWidth="3" />
            <line x1={c - 26} x2={c + 26} y1="40" y2="40" stroke="#78350f" strokeWidth="3" />
            <SnowIcon x={c - 13} y={26} r={6} sw={2.5} color="#ffffff" />
            <SnowIcon x={c + 13} y={54} r={6} sw={2.5} color="#ffffff" />
            <rect x={c + 28} y="22" width="7" height="34" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          </g>
        );
      case 'snowman':
        return (
          <g>
            <circle cx={c} cy="54" r="16" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
            <circle cx={c} cy="28" r="11" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
            <rect x={c - 9} y="10" width="18" height="8" fill={INK} />
            <path d={`M${c} 29 l10 2 l-10 2 Z`} fill="#f97316" />
            <circle cx={c - 4} cy="25" r="1.8" fill={INK} />
            <circle cx={c + 4} cy="25" r="1.8" fill={INK} />
          </g>
        );
      case 'freezer':
        return (
          <g>
            <rect x={c - 18} y="8" width="36" height="64" rx="4" fill="#e2e8f0" stroke="#475569" strokeWidth="3" />
            <line x1={c - 18} x2={c + 18} y1="30" y2="30" stroke="#475569" strokeWidth="3" />
            <SnowIcon x={c} y={51} r={10} sw={3} />
          </g>
        );
      case 'fridge':
        return (
          <g>
            <rect x={c - 18} y="8" width="36" height="64" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="3" />
            <line x1={c - 18} x2={c + 18} y1="30" y2="30" stroke="#475569" strokeWidth="3" />
            <rect x={c - 10} y="42" width="10" height="16" rx="2" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="1.5" />
            <circle cx={c + 7} cy="52" r="6" fill="#86efac" stroke="#166534" strokeWidth="1.5" />
          </g>
        );
      case 'beach':
        return (
          <g>
            <SunIcon x={c + 16} y={22} r={10} />
            <rect x="0" y="56" width={W} height="24" fill="#fde68a" />
            <path d={`M0 56 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0`} fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
            <path d={`M${c - 20} 60 L${c - 20} 30`} stroke="#78350f" strokeWidth="3" />
            <path d={`M${c - 38} 34 q18 -18 36 0 Z`} fill="#f87171" stroke="#7f1d1d" strokeWidth="2.5" />
          </g>
        );
      case 'ice':
        return (
          <g>
            <ellipse cx={c} cy="54" rx="32" ry="12" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
            <path d={`M${c - 18} 50 l12 6 M${c + 4} 48 l-6 10 M${c + 12} 54 l14 -3`} stroke="#ffffff" strokeWidth="3" />
            <SnowIcon x={c - 16} y={22} r={8} sw={3} />
            <SnowIcon x={c + 18} y={28} r={7} sw={3} />
          </g>
        );
    }
  })();
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {body}
    </svg>
  );
};


