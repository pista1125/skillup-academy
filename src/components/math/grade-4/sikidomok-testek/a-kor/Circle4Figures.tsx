import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Egyszerű körző rajza: tű a (cx, cy) pontban, ceruza a (px, py) pontban */
export const Circle4Compass: React.FC<{ cx: number; cy: number; px: number; py: number; lift?: number }> = ({ cx, cy, px, py, lift = 70 }) => {
  const mx = (cx + px) / 2;
  const my = (cy + py) / 2;
  const dx = px - cx;
  const dy = py - cy;
  const L = Math.hypot(dx, dy) || 1;
  // a csukló a két láb fölött, a szakaszra merőlegesen (mindig "felfelé")
  let nx = -dy / L;
  let ny = dx / L;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const hx = mx + nx * lift;
  const hy = my + ny * lift;
  return (
    <g>
      <line x1={hx} y1={hy} x2={cx} y2={cy} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <line x1={hx} y1={hy} x2={px} y2={py} stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
      <line x1={px} y1={py} x2={px + (hx - px) * 0.18} y2={py + (hy - py) * 0.18} stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r="6" fill="#334155" />
      <rect x={hx - 3} y={hy - 18} width="6" height="13" rx="2" fill="#334155" />
      <circle cx={cx} cy={cy} r="2.5" fill="#0f172a" />
    </g>
  );
};

/** 1. ábra: kör alakú tárgyak (Tankönyv 117. o. 1. feladat) */
export const RoundThingsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="162" rx="18" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
    {/* óra */}
    <circle cx="60" cy="75" r="38" fill="#86efac" stroke="#15803d" strokeWidth="4" />
    <circle cx="60" cy="75" r="30" fill="#fff" />
    <line x1="60" y1="75" x2="60" y2="52" stroke="#0f172a" strokeWidth="2.5" />
    <line x1="60" y1="75" x2="76" y2="82" stroke="#0f172a" strokeWidth="3" />
    <text x="60" y="140" textAnchor="middle" fontSize="12" fill="#334155">óra</text>
    {/* gomb */}
    <circle cx="150" cy="85" r="20" fill="#f87171" stroke="#b91c1c" strokeWidth="2" />
    {[
      [144, 79],
      [156, 79],
      [144, 91],
      [156, 91]
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="#7f1d1d" />
    ))}
    <text x="150" y="140" textAnchor="middle" fontSize="12" fill="#334155">gomb</text>
    {/* érem */}
    <rect x="226" y="22" width="18" height="26" fill="#3b82f6" />
    <circle cx="235" cy="80" r="30" fill="#fcd34d" stroke="#b45309" strokeWidth="3" />
    <text x="235" y="88" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#92400e">1</text>
    <text x="235" y="140" textAnchor="middle" fontSize="12" fill="#334155">érem</text>
    {/* kerék */}
    <circle cx="330" cy="78" r="36" fill="none" stroke="#1f2937" strokeWidth="7" />
    {Array.from({ length: 12 }, (_, i) => {
      const t = (i * Math.PI) / 6;
      return <line key={i} x1="330" y1="78" x2={330 + 32 * Math.cos(t)} y2={78 + 32 * Math.sin(t)} stroke="#9ca3af" strokeWidth="1" />;
    })}
    <circle cx="330" cy="78" r="4" fill="#1f2937" />
    <text x="330" y="140" textAnchor="middle" fontSize="12" fill="#334155">kerék</text>
    {/* pénzérme */}
    <circle cx="420" cy="88" r="22" fill="#d1d5db" stroke="#6b7280" strokeWidth="3" />
    <text x="420" y="94" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#4b5563">5</text>
    <text x="420" y="140" textAnchor="middle" fontSize="12" fill="#334155">pénzérme</text>
    <text x="260" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">Mindegyik kör alakú!</text>
  </svg>
);

/** 2. ábra: a hulahoppkarika közepén álló gyerek – minden pont ugyanolyan messze van (Tankönyv 117. o. 1. b) */
export const HulaHoopSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 160;
  const cy = 110;
  const r = 80;
  const angles = [0, 60, 135, 200, 270, 320];
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="212" rx="18" fill="#fdf4ff" stroke="#e879f9" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d946ef" strokeWidth="8" />
      {angles.map((a) => {
        const t = (a * Math.PI) / 180;
        return (
          <g key={a}>
            <line x1={cx} y1={cy} x2={cx + r * Math.cos(t)} y2={cy + r * Math.sin(t)} stroke="#0f172a" strokeWidth="1.5" strokeDasharray="5 4" />
            <circle cx={cx + r * Math.cos(t)} cy={cy + r * Math.sin(t)} r="4" fill="#0f172a" />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="11" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">O</text>
      <text x="270" y="70" fontSize="14" fontWeight="bold" fill="#86198f">A középen álló gyerek</text>
      <text x="270" y="88" fontSize="14" fontWeight="bold" fill="#86198f">a kör középpontja (O).</text>
      <text x="270" y="118" fontSize="13" fill="#334155">A karika minden pontja</text>
      <text x="270" y="138" fontSize="13" fill="#334155">ugyanolyan messze van tőle.</text>
      <text x="270" y="172" fontSize="13" fontWeight="bold" fill="#a21caf">Ettől lesz kör a kör!</text>
    </svg>
  );
};

/** 3. ábra: a körzőhasználat lépései (Tankönyv 117. o. 1. d) */
export const CompassStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="202" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={18 + i * 168} y="18" width="148" height="150" rx="12" fill="#ffffff" stroke="#fed7aa" />
    ))}
    {/* 1. pont */}
    <circle cx="92" cy="120" r="4" fill="#0f172a" />
    <text x="100" y="116" fontSize="13" fontWeight="bold" fill="#0f172a">O</text>
    {/* 2. beszúrás */}
    <Circle4Compass cx={240} cy={130} px={290} py={130} lift={70} />
    {/* 3. körbeforgatás */}
    <circle cx="428" cy="105" r="45" fill="none" stroke="#dc2626" strokeWidth="2.5" />
    <Circle4Compass cx={428} cy={105} px={466.97} py={127.5} lift={55} />
    <path d="M 470 65 A 50 50 0 0 1 482 95" fill="none" stroke="#ea580c" strokeWidth="2" />
    <polygon points="482,95 476,88 486,88" fill="#ea580c" />
    <text x="92" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">1. Jelölj ki egy pontot!</text>
    <text x="260" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">2. Nyisd ki, szúrd be!</text>
    <text x="428" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">3. Forgasd körbe!</text>
  </svg>
);

/** 4. ábra: körvonal és körlap; kör és nem kör (Munkafüzet 29. o. 2. feladat) */
export const CircleOrNotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="182" rx="18" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <circle cx="80" cy="85" r="48" fill="none" stroke="#1d4ed8" strokeWidth="4" />
    <text x="80" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">körvonal</text>
    <circle cx="210" cy="85" r="48" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />
    <text x="210" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">körlap</text>
    <line x1="290" y1="25" x2="290" y2="165" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />
    <ellipse cx="360" cy="85" rx="56" ry="34" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
    <text x="365" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">ovális: nem kör</text>
    <path d="M 462 40 C 492 40 497 130 462 130 C 427 130 432 40 462 40 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
    <text x="462" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">tojás: nem kör</text>
  </svg>
);

/** 5. ábra: körök közös középponttal, 1, 2 és 3 cm-es körzőnyílással (Munkafüzet 29–30. o.) */
export const ConcentricSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 26; // 1 cm
  const cx = 140;
  const cy = 110;
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="212" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={cx - 5 * u + i * u} y1={cy - 3.8 * u} x2={cx - 5 * u + i * u} y2={cy + 3.8 * u} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1={cx - 5 * u} y1={cy - 3.5 * u + i * u} x2={cx + 5 * u} y2={cy - 3.5 * u + i * u} stroke="#e2e8f0" />
      ))}
      {[
        [3, '#2563eb'],
        [2, '#16a34a'],
        [1, '#dc2626']
      ].map(([k, c]) => (
        <circle key={k as number} cx={cx} cy={cy} r={(k as number) * u} fill="none" stroke={c as string} strokeWidth="3" />
      ))}
      <line x1={cx} y1={cy} x2={cx + 3 * u} y2={cy} stroke="#0f172a" strokeWidth="1.5" />
      <text x={cx - 6} y={cy - 6} fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="end">O</text>
      <path d={`M ${cx - 4} ${cy - 4} L ${cx + 4} ${cy + 4} M ${cx - 4} ${cy + 4} L ${cx + 4} ${cy - 4}`} stroke="#0f172a" strokeWidth="2" />
      <text x="300" y="70" fontSize="13" fontWeight="bold" fill="#dc2626">1 cm-es körzőnyílás</text>
      <text x="300" y="100" fontSize="13" fontWeight="bold" fill="#16a34a">2 cm-es körzőnyílás</text>
      <text x="300" y="130" fontSize="13" fontWeight="bold" fill="#2563eb">3 cm-es körzőnyílás</text>
      <text x="300" y="170" fontSize="12" fill="#334155">Mindhárom kör középpontja: O.</text>
      <text x="300" y="188" fontSize="12" fill="#334155">Nagyobb körzőnyílás → nagyobb kör.</text>
    </svg>
  );
};

/** 6. ábra: érdekes formák körökből (Tankönyv 117. o. 2. feladat) */
export const CirclePatternsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="162" rx="18" fill="#fefce8" stroke="#fde047" strokeWidth="2" />
    {[
      [50, 65, '#3b82f6'],
      [100, 65, '#facc15'],
      [150, 65, '#1e3a8a'],
      [75, 95, '#ef4444'],
      [125, 95, '#22c55e']
    ].map(([x, y, c], i) => (
      <circle key={i} cx={x as number} cy={y as number} r="22" fill="none" stroke={c as string} strokeWidth="5" />
    ))}
    {/* malacka */}
    <circle cx="300" cy="85" r="50" fill="#f9a8d4" />
    <circle cx="268" cy="40" r="12" fill="#ec4899" />
    <circle cx="332" cy="40" r="12" fill="#ec4899" />
    <circle cx="282" cy="72" r="6" fill="#fff" />
    <circle cx="318" cy="72" r="6" fill="#fff" />
    <circle cx="282" cy="72" r="3" fill="#0f172a" />
    <circle cx="318" cy="72" r="3" fill="#0f172a" />
    <circle cx="300" cy="100" r="16" fill="#f472b6" />
    <circle cx="294" cy="100" r="3" fill="#9d174d" />
    <circle cx="306" cy="100" r="3" fill="#9d174d" />
    {/* virág */}
    {Array.from({ length: 6 }, (_, i) => {
      const t = (i * Math.PI) / 3;
      return <circle key={i} cx={440 + 22 * Math.cos(t)} cy={85 + 22 * Math.sin(t)} r="22" fill="none" stroke="#a855f7" strokeWidth="2.5" />;
    })}
    <circle cx="440" cy="85" r="44" fill="none" stroke="#7e22ce" strokeWidth="2.5" />
    <text x="260" y="158" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#854d0e">Körzővel szép képeket rajzolhatsz!</text>
  </svg>
);
