import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export const R_COLORS = {
  E: { fill: '#bbf7d0', head: '#16a34a', text: '#166534' },
  sz: { fill: '#fecaca', head: '#dc2626', text: '#991b1b' },
  t: { fill: '#bae6fd', head: '#0284c7', text: '#075985' },
  e: { fill: '#fef08a', head: '#ca8a04', text: '#854d0e' }
};

/** Kerekítés: a legközelebbi kerek szomszéd; ha pont középen van, a nagyobbik. */
export const roundTo = (n: number, place: number) => Math.floor((n + place / 2) / place) * place;

// 1. ábra: Számszomszédok táblázata az 5364-re (tankönyv 43. o., 1. feladat)
export const NeighboursTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const left: { k: keyof typeof R_COLORS; name: string; v: string }[] = [
    { k: 'E', name: 'ezres', v: '5000' },
    { k: 'sz', name: 'százas', v: '5300' },
    { k: 't', name: 'tízes', v: '5360' },
    { k: 'e', name: 'egyes', v: '5363' }
  ];
  const right: { k: keyof typeof R_COLORS; name: string; v: string }[] = [
    { k: 'e', name: 'egyes', v: '5365' },
    { k: 't', name: 'tízes', v: '5370' },
    { k: 'sz', name: 'százas', v: '5400' },
    { k: 'E', name: 'ezres', v: '6000' }
  ];
  const w = 48;
  const cell = (c: { k: keyof typeof R_COLORS; name: string; v: string }, x: number) => (
    <g key={`${c.name}-${x}`}>
      <rect x={x} y="44" width={w} height="24" fill={R_COLORS[c.k].head} stroke="#1e293b" />
      <text x={x + w / 2} y="60" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#fff">{c.name}</text>
      <rect x={x} y="68" width={w} height="28" fill={R_COLORS[c.k].fill} stroke="#1e293b" />
      <text x={x + w / 2} y="87" textAnchor="middle" fontSize="12" fontWeight="bold" fill={R_COLORS[c.k].text}>{c.v}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 460 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="116" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="12" y="20" width={4 * w} height="24" fill="#fff" stroke="#1e293b" />
      <text x={12 + 2 * w} y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">Kisebb számszomszédok</text>
      <rect x={12 + 4 * w + 52} y="20" width={4 * w} height="24" fill="#fff" stroke="#1e293b" />
      <text x={12 + 6 * w + 52} y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">Nagyobb számszomszédok</text>
      {left.map((c, i) => cell(c, 12 + i * w))}
      <rect x={12 + 4 * w} y="20" width="52" height="76" fill="#fff" stroke="#1e293b" />
      <text x={12 + 4 * w + 26} y="40" textAnchor="middle" fontSize="11" fill="#334155">Szám</text>
      <text x={12 + 4 * w + 26} y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">5364</text>
      {right.map((c, i) => cell(c, 12 + 4 * w + 52 + i * w))}
      <text x="230" y="112" textAnchor="middle" fontSize="10.5" fill="#475569">5363 &lt; 5364 &lt; 5365 • 5360 &lt; 5364 &lt; 5370 • 5300 &lt; 5364 &lt; 5400</text>
    </svg>
  );
};

// 2. ábra: Ezresre kerekítés a számegyenesen (4200 ≈ 4000, 3800 ≈ 4000, 3500 ≈ 4000)
export const RoundingNumberLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 30;
  const x1 = 430;
  const sx = (n: number) => x0 + ((x1 - x0) * (n - 3000)) / 2000;
  const pts = [
    { n: 3500, c: '#7c3aed', up: true },
    { n: 3800, c: '#dc2626', up: true },
    { n: 4200, c: '#2563eb', up: false }
  ];
  return (
    <svg viewBox="0 0 460 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="146" rx="14" fill="#fff7ed" stroke="#fdba74" />
      <text x="230" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#9a3412">Ezresre kerekítés: melyik ezreshez van közelebb?</text>
      <line x1={x0} y1="95" x2={x1} y2="95" stroke="#9a3412" strokeWidth="2.5" />
      {Array.from({ length: 21 }, (_, i) => 3000 + i * 100).map((n) => (
        <line key={n} x1={sx(n)} y1={n % 1000 === 0 ? 84 : n % 500 === 0 ? 88 : 91} x2={sx(n)} y2={n % 1000 === 0 ? 106 : n % 500 === 0 ? 102 : 99} stroke="#9a3412" strokeWidth={n % 1000 === 0 ? 2.2 : 1} />
      ))}
      {[3000, 4000, 5000].map((n) => (
        <g key={n}>
          <circle cx={sx(n)} cy="95" r="6" fill="#16a34a" />
          <text x={sx(n)} y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">{n}</text>
        </g>
      ))}
      <text x={sx(3500)} y="124" textAnchor="middle" fontSize="10" fill="#9a3412">3500</text>
      <text x={sx(4500)} y="124" textAnchor="middle" fontSize="10" fill="#9a3412">4500</text>
      {pts.map((p, i) => {
        const x = sx(p.n);
        const y = 76 - i * 14;
        const tx = sx(4000);
        return (
          <g key={p.n}>
            <circle cx={x} cy="95" r="4.5" fill={p.c} />
            <path d={`M ${x} 90 Q ${(x + tx) / 2} ${y - 10} ${tx + (p.up ? -4 : 4)} 88`} fill="none" stroke={p.c} strokeWidth="1.8" />
            <path d={`M ${tx + (p.up ? -4 : 4)} 88 l ${p.up ? -7 : 7} -3 l ${p.up ? -1 : 1} 6 z`} fill={p.c} />
            <text x={x} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill={p.c}>{p.n} ≈ 4000</text>
          </g>
        );
      })}
      <text x="230" y="142" textAnchor="middle" fontSize="10.5" fill="#7c2d12">Ha pont középen van (3500), a nagyobb ezresre kerekítünk.</text>
    </svg>
  );
};

// 3. ábra: Debrida hegyei (tankönyv 43. o., 3. feladat)
export const MountainsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const peaks = [
    { x: 55, h: 5725 },
    { x: 115, h: 2394 },
    { x: 175, h: 8500 },
    { x: 235, h: 4619 },
    { x: 300, h: 9963 },
    { x: 360, h: 3132 },
    { x: 415, h: 7047 }
  ];
  const base = 170;
  const yOf = (h: number) => base - (h / 10000) * 130;
  return (
    <svg viewBox="0 0 460 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="186" rx="14" fill="#e0f2fe" stroke="#7dd3fc" />
      {peaks.map((p) => (
        <g key={p.h}>
          <polygon points={`${p.x - 42},${base} ${p.x},${yOf(p.h)} ${p.x + 42},${base}`} fill="#94a3b8" stroke="#475569" strokeWidth="1.5" opacity="0.92" />
          <polygon points={`${p.x - 9},${yOf(p.h) + 14} ${p.x},${yOf(p.h)} ${p.x + 9},${yOf(p.h) + 14}`} fill="#fff" />
          <rect x={p.x - 24} y={yOf(p.h) - 20} width="48" height="16" rx="5" fill="#fff" stroke="#334155" />
          <text x={p.x} y={yOf(p.h) - 8} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f172a">{p.h} m</text>
        </g>
      ))}
      <rect x="2" y={base} width="456" height="18" fill="#4ade80" />
    </svg>
  );
};

// 4. ábra: Csillék kerekített értékekkel (tankönyv 44. o., 4. feladat)
export const MineCartsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const carts = [
    { label: 'ezresre ≈ 7000', nums: ['6449', '7500', '7449', '6333'] },
    { label: 'ezresre ≈ 9000', nums: ['9999', '9500', '8500', '8450'] },
    { label: 'százasra ≈ 6500', nums: ['6600', '6540', '5980', '6010'] },
    { label: 'százasra ≈ 2300', nums: ['2250', '2350', '2391', '2248'] }
  ];
  return (
    <svg viewBox="0 0 460 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="146" rx="14" fill="#fefce8" stroke="#fde047" />
      {carts.map((c, i) => {
        const x = 14 + i * 111;
        return (
          <g key={c.label}>
            <text x={x + 50} y="24" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#713f12">{c.label}</text>
            {[0, 1, 2, 3, 4].map((j) => (
              <circle key={j} cx={x + 18 + j * 16} cy="44" r="8" fill={['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'][j]} stroke="#1e293b" strokeWidth="0.6" />
            ))}
            <path d={`M ${x} 48 L ${x + 100} 48 L ${x + 92} 112 L ${x + 8} 112 Z`} fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
            <rect x={x + 12} y="56" width="76" height="46" rx="5" fill="#fff7ed" />
            <text x={x + 50} y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">{c.nums[0]}, {c.nums[1]}</text>
            <text x={x + 50} y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">{c.nums[2]}, {c.nums[3]}</text>
            <circle cx={x + 25} cy="122" r="10" fill="#7f1d1d" />
            <circle cx={x + 75} cy="122" r="10" fill="#7f1d1d" />
          </g>
        );
      })}
      <text x="230" y="144" textAnchor="middle" fontSize="10.5" fill="#713f12">Melyik szám kerekített értéke áll a csille fölött?</text>
    </svg>
  );
};

// 5. ábra: Nagyító a számegyenesen – a 4763 tízes, százas és ezres szomszédjai
export const ZoomNeighboursSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { lo: 4000, hi: 5000, label: 'ezres szomszédok', c: '#16a34a' },
    { lo: 4700, hi: 4800, label: 'százas szomszédok', c: '#dc2626' },
    { lo: 4760, hi: 4770, label: 'tízes szomszédok', c: '#0284c7' }
  ];
  const n = 4763;
  return (
    <svg viewBox="0 0 460 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="166" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="230" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">A 4763 számszomszédjai – egyre jobban ránagyítunk</text>
      {rows.map((r, i) => {
        const y = 52 + i * 44;
        const x0 = 40;
        const x1 = 420;
        const x = x0 + ((x1 - x0) * (n - r.lo)) / (r.hi - r.lo);
        return (
          <g key={r.label}>
            <text x={x0} y={y - 12} fontSize="10.5" fontWeight="bold" fill={r.c}>{r.label}</text>
            <line x1={x0} y1={y} x2={x1} y2={y} stroke={r.c} strokeWidth="2.5" />
            {Array.from({ length: 11 }, (_, j) => (
              <line key={j} x1={x0 + j * 38} y1={y - 4} x2={x0 + j * 38} y2={y + 4} stroke={r.c} strokeWidth="1" />
            ))}
            <circle cx={x0} cy={y} r="5" fill={r.c} />
            <circle cx={x1} cy={y} r="5" fill={r.c} />
            <text x={x0} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="bold" fill={r.c}>{r.lo}</text>
            <text x={x1} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="bold" fill={r.c}>{r.hi}</text>
            <circle cx={x} cy={y} r="5.5" fill="#f59e0b" stroke="#78350f" />
            <text x={x} y={y + 17} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#78350f">4763</text>
          </g>
        );
      })}
    </svg>
  );
};
