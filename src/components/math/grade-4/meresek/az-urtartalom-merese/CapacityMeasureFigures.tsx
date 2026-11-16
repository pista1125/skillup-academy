import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Beosztásos mérőedény (belső segéd): x, y = bal felső sarok */
const Jug: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill: number; // 0..1
  ticks: number;
  label?: string;
  color?: string;
}> = ({ x, y, w, h, fill, ticks, label, color = '#38bdf8' }) => {
  const level = y + h - h * fill;
  return (
    <g>
      <rect x={x} y={level} width={w} height={y + h - level} fill={color} opacity="0.75" />
      <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y}`} fill="none" stroke="#334155" strokeWidth="2.5" />
      <path d={`M ${x + w} ${y + h * 0.15} q ${w * 0.35} 0 ${w * 0.35} ${h * 0.3} q 0 ${h * 0.3} -${w * 0.35} ${h * 0.3}`} fill="none" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: ticks }, (_, i) => {
        const ty = y + h - (h * (i + 1)) / (ticks + 1);
        return <line key={i} x1={x + 4} y1={ty} x2={x + (i % 2 === 1 ? 16 : 11)} y2={ty} stroke="#1e293b" strokeWidth="1.5" />;
      })}
      {label && (
        <text x={x + w / 2} y={y + h - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{label}</text>
      )}
    </g>
  );
};

/** 1. ábra: a tanult mérőedények: 1 cl, 1 dl, 1 l */
export const MeasuringCupsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="226" rx="16" fill="#f0f9ff" stroke="#7dd3fc" />
    {/* 1 cl merőke */}
    <rect x="62" y="120" width="26" height="46" fill="#38bdf8" opacity="0.75" />
    <path d="M 62 112 L 62 166 L 88 166 L 88 112" fill="none" stroke="#334155" strokeWidth="2.5" />
    <path d="M 86 112 L 86 70 q 0 -10 8 -10 q 8 0 8 8" fill="none" stroke="#334155" strokeWidth="2.5" />
    <text x="75" y="190" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">1 cl</text>
    {/* 1 dl pohár */}
    <Jug x={190} y={90} w={44} h={76} fill={0.9} ticks={4} />
    <text x="212" y="190" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">1 dl</text>
    {/* 1 l kancsó */}
    <Jug x={340} y={50} w={90} h={116} fill={0.85} ticks={9} color="#fbbf24" />
    <text x="385" y="190" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">1 l</text>
    <rect x="40" y="200" width="180" height="22" rx="11" fill="#fed7aa" />
    <text x="130" y="216" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">1 dl = 10 cl</text>
    <rect x="290" y="200" width="200" height="22" rx="11" fill="#fed7aa" />
    <text x="390" y="216" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">1 l = 10 dl = 100 cl</text>
    <text x="260" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#075985">Mennyi fér bele? – a tanult mérőedények</text>
  </svg>
);

/** 2. ábra: az űrtartalom-mértékegységek lépcsője: l → dl → cl → ml */
export const CapacityUnitLadderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const units = [
    { u: 'l', n: 'liter', c: '#dc2626' },
    { u: 'dl', n: 'deciliter', c: '#ea580c' },
    { u: 'cl', n: 'centiliter', c: '#2563eb' },
    { u: 'ml', n: 'milliliter', c: '#16a34a' }
  ];
  return (
    <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="226" rx="16" fill="#fff7ed" stroke="#fdba74" />
      <text x="260" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
        1 l = 10 dl = 100 cl = 1000 ml
      </text>
      {units.map((d, i) => {
        const x = 20 + i * 126;
        const y = 60 + i * 26;
        return (
          <g key={d.u}>
            <rect x={x} y={y} width="96" height="54" rx="14" fill="#ffffff" stroke={d.c} strokeWidth="3" />
            <text x={x + 48} y={y + 28} textAnchor="middle" fontSize="22" fontWeight="bold" fill={d.c}>{d.u}</text>
            <text x={x + 48} y={y + 46} textAnchor="middle" fontSize="11" fill="#475569">{d.n}</text>
            {i < 3 && (
              <g>
                <path d={`M ${x + 80} ${y - 2} Q ${x + 113} ${y - 30} ${x + 140} ${y + 22}`} fill="none" stroke="#f97316" strokeWidth="3" />
                <polygon points={`${x + 140},${y + 24} ${x + 131},${y + 15} ${x + 141},${y + 12}`} fill="#f97316" />
                <text x={x + 112} y={y - 16} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">· 10</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="260" y="216" textAnchor="middle" fontSize="11" fill="#475569">
        Nagyobb egységről kisebbre váltva lépésenként 10-zel szorzunk. Visszafelé 10-zel osztunk.
      </text>
    </svg>
  );
};

/** 3. ábra: a három akvárium (Tankönyv 3. feladat) */
export const AquariumsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const tanks = [
    { x: 20, w: 200, h: 90, t: '160 l', fish: 4 },
    { x: 250, w: 90, h: 90, t: '3000 cl', fish: 3 },
    { x: 370, w: 130, h: 90, t: '700 dl', fish: 2 }
  ];
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="196" rx="16" fill="#ecfeff" stroke="#67e8f9" />
      {tanks.map((t) => (
        <g key={t.t}>
          <rect x={t.x} y={40} width={t.w} height={t.h} rx="4" fill="#bae6fd" stroke="#0e7490" strokeWidth="3" />
          <rect x={t.x + 3} y={52} width={t.w - 6} height={t.h - 15} fill="#38bdf8" opacity="0.6" />
          {Array.from({ length: t.fish }, (_, k) => {
            const fx = t.x + 22 + k * ((t.w - 40) / Math.max(1, t.fish - 1 || 1));
            const fy = 75 + (k % 2) * 25;
            return (
              <g key={k}>
                <ellipse cx={fx} cy={fy} rx="10" ry="6" fill="#f97316" />
                <polygon points={`${fx - 9},${fy} ${fx - 17},${fy - 6} ${fx - 17},${fy + 6}`} fill="#f97316" />
                <circle cx={fx + 5} cy={fy - 1} r="1.4" fill="#0f172a" />
              </g>
            );
          })}
          <path d={`M ${t.x + 12} ${40 + t.h} q 6 -22 0 -40`} fill="none" stroke="#16a34a" strokeWidth="3" />
          <text x={t.x + t.w / 2} y="160" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">{t.t}</text>
        </g>
      ))}
      <text x="260" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#155e75">Melyik akváriumba fér a legtöbb víz?</text>
      <text x="260" y="186" textAnchor="middle" fontSize="11" fill="#475569">Összehasonlítás előtt váltsd át mindet literre!</text>
    </svg>
  );
};

/** 4. ábra: mérőedények leolvasása (Tankönyv 9. feladat) */
export const MeasuringVesselsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="216" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    {/* a) mérőhenger 10 dl-ig, 3 dl víz */}
    <rect x="50" y="40" width="50" height="140" fill="#e0f2fe" stroke="#334155" strokeWidth="2.5" />
    <rect x="52" y={180 - 42} width="46" height="42" fill="#38bdf8" opacity="0.8" />
    {Array.from({ length: 10 }, (_, i) => (
      <g key={i}>
        <line x1="50" y1={180 - (i + 1) * 14} x2="62" y2={180 - (i + 1) * 14} stroke="#1e293b" strokeWidth="1.5" />
        <text x="66" y={184 - (i + 1) * 14} fontSize="8" fill="#1e293b">{i + 1}</text>
      </g>
    ))}
    <text x="88" y="36" fontSize="10" fontWeight="bold" fill="#1e293b">dl</text>
    <rect x="35" y="180" width="80" height="8" rx="3" fill="#94a3b8" />
    <text x="75" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">3 dl</text>
    {/* b) pohár 200 ml */}
    <Jug x={160} y={100} w={70} h={80} fill={0.8} ticks={3} label="200 ml" color="#a7f3d0" />
    <text x="195" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">200 ml = 2 dl</text>
    {/* c) 4 cl-es mérőke */}
    <rect x="300" y="140" width="26" height="40" fill="#93c5fd" opacity="0.8" />
    <path d="M 300 130 L 300 180 L 326 180 L 326 130" fill="none" stroke="#334155" strokeWidth="2.5" />
    <path d="M 324 130 L 324 92 q 0 -10 8 -10 q 8 0 8 8" fill="none" stroke="#334155" strokeWidth="2.5" />
    <text x="313" y="158" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">4 cl</text>
    <text x="313" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">4 cl = 40 ml</text>
    {/* d) 500 ml kancsó */}
    <Jug x={390} y={60} w={80} h={120} fill={0.85} ticks={5} color="#fdba74" />
    <text x="430" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">500 ml</text>
    <text x="430" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">500 ml = 5 dl</text>
    <text x="260" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Olvasd le, és mondd ki többféle mértékegységgel!</text>
  </svg>
);

/** 5. ábra: a dísztó feltöltése szivattyúval (Munkafüzet 9. feladat) */
export const PondPumpChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 70;
  const sc = 0.16; // px / l
  const rowY = (m: number) => 190 - m * 20;
  return (
    <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="226" rx="16" fill="#ffffff" stroke="#cbd5e1" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * 250 * sc} y1="20" x2={x0 + i * 250 * sc} y2="190" stroke={i % 2 === 0 ? '#cbd5e1' : '#f1f5f9'} />
          {i % 2 === 0 && (
            <text x={x0 + i * 250 * sc} y="206" textAnchor="middle" fontSize="10" fill="#475569">{i * 250}</text>
          )}
        </g>
      ))}
      {Array.from({ length: 9 }, (_, m) => (
        <text key={m} x={x0 - 10} y={rowY(m) + 4} textAnchor="end" fontSize="10" fill="#475569">{m}</text>
      ))}
      {[1, 2, 3].map((m) => (
        <rect key={m} x={x0} y={rowY(m) - 7} width={m * 300 * sc} height="14" rx="3" fill="#60a5fa" />
      ))}
      <line x1={x0 + 2100 * sc} y1="20" x2={x0 + 2100 * sc} y2="190" stroke="#16a34a" strokeWidth="2" strokeDasharray="5 4" />
      <text x={x0 + 2100 * sc + 4} y="34" fontSize="10" fontWeight="bold" fill="#15803d">tele: 2100 l</text>
      <line x1={x0} y1="190" x2={x0 + 2500 * sc + 12} y2="190" stroke="#334155" strokeWidth="1.5" />
      <line x1={x0} y1="190" x2={x0} y2="16" stroke="#334155" strokeWidth="1.5" />
      <text x={x0 - 8} y="16" textAnchor="end" fontSize="10" fontWeight="bold" fill="#334155">perc</text>
      <text x={x0 + 2500 * sc + 16} y="194" fontSize="10" fontWeight="bold" fill="#334155">l</text>
      <text x="300" y="222" textAnchor="middle" fontSize="11" fill="#475569">Mennyi víz van a dísztóban az 1., 2., 3. perc végén?</text>
    </svg>
  );
};
