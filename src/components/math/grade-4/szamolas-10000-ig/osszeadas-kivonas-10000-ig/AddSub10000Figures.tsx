import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Egy 100-as érme rajza. */
export const Coin100: React.FC<{ x: number; y: number; r?: number; faded?: boolean }> = ({ x, y, r = 13, faded }) => (
  <g opacity={faded ? 0.35 : 1}>
    <circle cx={x} cy={y} r={r} fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
    <circle cx={x} cy={y} r={r - 3} fill="none" stroke="#94a3b8" strokeWidth="0.8" />
    <text x={x} y={y + 3.5} textAnchor="middle" fontSize={r * 0.72} fontWeight="bold" fill="#1e293b">100</text>
  </g>
);

// 1. ábra: 11 százas + 12 százas = 23 százas (tankönyv 45. o., 4. feladat)
export const HundredsCoinsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 460 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="456" height="166" rx="14" fill="#fff7ed" stroke="#fdba74" />
    {Array.from({ length: 11 }, (_, i) => (
      <Coin100 key={`a${i}`} x={26 + (i % 6) * 30} y={30 + Math.floor(i / 6) * 30} />
    ))}
    <text x="210" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">+</text>
    {Array.from({ length: 12 }, (_, i) => (
      <Coin100 key={`b${i}`} x={250 + (i % 6) * 30} y={30 + Math.floor(i / 6) * 30} />
    ))}
    <g fontSize="13" fontWeight="bold" fill="#7c2d12">
      <text x="230" y="105" textAnchor="middle">11 + 12 = 23</text>
      <text x="230" y="127" textAnchor="middle">11 százas + 12 százas = 23 százas</text>
      <text x="230" y="149" textAnchor="middle">1100 + 1200 = 2300</text>
    </g>
  </svg>
);

// 2. ábra: Bence, Jancsi és Marci módszere (3400 + 5700)
export const ThreeWaysSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const kids = [
    { name: 'Bence', c: '#2563eb', l1: '34 sz + 57 sz', l2: '= 91 sz', l3: '= 9100' },
    { name: 'Jancsi', c: '#f59e0b', l1: '3400 + 5000 + 700', l2: '= 8400 + 700', l3: '= 9100' },
    { name: 'Marci', c: '#16a34a', l1: '3400 + 700 + 5000', l2: '= 4100 + 5000', l3: '= 9100' }
  ];
  return (
    <svg viewBox="0 0 460 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="166" rx="14" fill="#fdf2f8" stroke="#f9a8d4" />
      <rect x="160" y="10" width="140" height="26" rx="13" fill="#fed7aa" stroke="#ea580c" />
      <text x="230" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">3400 + 5700 = ?</text>
      {kids.map((k, i) => {
        const x = 12 + i * 150;
        return (
          <g key={k.name}>
            <rect x={x} y="46" width="138" height="88" rx="16" fill="#fff" stroke={k.c} strokeWidth="2" />
            <text x={x + 69} y="72" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{k.l1}</text>
            <text x={x + 69} y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{k.l2}</text>
            <text x={x + 69} y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill={k.c}>{k.l3}</text>
            <circle cx={x + 50} cy="150" r="9" fill={k.c} />
            <text x={x + 64} y="154" fontSize="11" fontWeight="bold" fill={k.c}>{k.name}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Ugrások a számegyenesen. */
export const JumpLine: React.FC<{ min: number; max: number; start: number; jumps: number[]; labelStep?: number; y?: number }> = ({
  min,
  max,
  start,
  jumps,
  labelStep = 1000,
  y = 90
}) => {
  const x0 = 24;
  const x1 = 436;
  const sx = (n: number) => x0 + ((x1 - x0) * (n - min)) / (max - min);
  const pts = [start];
  jumps.forEach((j) => pts.push(pts[pts.length - 1] + j));
  const colors = ['#2563eb', '#dc2626', '#16a34a', '#a855f7'];
  const ticks: number[] = [];
  for (let n = min; n <= max; n += labelStep / 10) ticks.push(n);
  return (
    <g>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="#334155" strokeWidth="2" />
      {ticks.map((n) => (
        <line key={n} x1={sx(n)} y1={(n - min) % labelStep === 0 ? y - 8 : y - 4} x2={sx(n)} y2={(n - min) % labelStep === 0 ? y + 8 : y + 4} stroke="#334155" strokeWidth={(n - min) % labelStep === 0 ? 1.6 : 0.7} />
      ))}
      {ticks
        .filter((n) => (n - min) % labelStep === 0)
        .map((n) => (
          <text key={n} x={sx(n)} y={y + 22} textAnchor="middle" fontSize="11" fill="#334155">{n === 10000 ? '10 000' : n}</text>
        ))}
      {jumps.map((j, i) => {
        const a = sx(pts[i]);
        const b = sx(pts[i + 1]);
        const h = Math.min(50, Math.abs(b - a) / 2 + 12);
        return (
          <g key={i}>
            <path d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - h * 1.6} ${b} ${y - 2}`} fill="none" stroke={colors[i % 4]} strokeWidth="2.2" />
            <path d={`M ${b} ${y - 2} l ${b > a ? -8 : 8} -5 l ${b > a ? 1 : -1} 8 z`} fill={colors[i % 4]} />
            <text x={(a + b) / 2} y={y - h * 0.8 - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill={colors[i % 4]}>
              {j > 0 ? `+${j}` : `−${-j}`}
            </text>
          </g>
        );
      })}
      {pts.map((p, i) => (
        <circle key={i} cx={sx(p)} cy={y} r="4.5" fill={i === 0 ? '#0f172a' : colors[(i - 1) % 4]} />
      ))}
    </g>
  );
};

// 3. ábra: Jancsi módszere a számegyenesen: 3400 + 5000 + 700 = 9100
export const AddJumpsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 460 142" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="456" height="138" rx="14" fill="#eff6ff" stroke="#93c5fd" />
    <text x="230" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">3400 + 5700: előbb +5000, aztán +700</text>
    <JumpLine min={3000} max={10000} start={3400} jumps={[5000, 700]} y={92} />
    <text x="40" y="60" fontSize="11" fontWeight="bold" fill="#0f172a">3400</text>
    <text x="350" y="134" fontSize="11" fontWeight="bold" fill="#16a34a">8400 → 9100</text>
  </svg>
);

// 4. ábra: Kivonás ugrásokkal: 8200 − 5000 − 300 = 2900
export const SubJumpsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 460 142" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="456" height="138" rx="14" fill="#fef2f2" stroke="#fca5a5" />
    <text x="230" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">8200 − 5300: előbb −5000, aztán −300</text>
    <JumpLine min={2000} max={9000} start={8200} jumps={[-5000, -300]} y={92} />
    <text x="380" y="60" fontSize="11" fontWeight="bold" fill="#0f172a">8200</text>
    <text x="40" y="134" fontSize="11" fontWeight="bold" fill="#16a34a">3200 → 2900</text>
  </svg>
);

// 5. ábra: A két vendéglő vendégei (tankönyv 45. o., 3. feladat)
export const GuestsChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const months = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.'];
  const blue = [1000, 1000, 3000, 4000, 5000];
  const red = [1000, 2000, 2000, 5000, 2000];
  const y0 = 160;
  const k = 120 / 6000;
  return (
    <svg viewBox="0 0 460 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="196" rx="14" fill="#fff" stroke="#cbd5e1" />
      <text x="20" y="22" fontSize="11" fontWeight="bold" fill="#334155">fő</text>
      {[0, 1000, 2000, 3000, 4000, 5000, 6000].map((v) => (
        <g key={v}>
          <line x1="60" y1={y0 - v * k} x2="340" y2={y0 - v * k} stroke="#e2e8f0" />
          <text x="54" y={y0 - v * k + 4} textAnchor="end" fontSize="10" fill="#475569">{v}</text>
        </g>
      ))}
      {months.map((m, i) => {
        const x = 78 + i * 54;
        return (
          <g key={m}>
            <rect x={x} y={y0 - blue[i] * k} width="16" height={blue[i] * k} fill="#0ea5e9" />
            <rect x={x + 18} y={y0 - red[i] * k} width="16" height={red[i] * k} fill="#e11d48" />
            <text x={x + 17} y={y0 + 16} textAnchor="middle" fontSize="10.5" fill="#334155">{m}</text>
          </g>
        );
      })}
      <line x1="60" y1={y0} x2="340" y2={y0} stroke="#334155" strokeWidth="1.5" />
      <rect x="352" y="70" width="12" height="12" fill="#0ea5e9" />
      <text x="370" y="80" fontSize="10.5" fill="#334155">Illatosrét</text>
      <rect x="352" y="95" width="12" height="12" fill="#e11d48" />
      <text x="370" y="105" fontSize="10.5" fill="#334155">Tavirózsa</text>
    </svg>
  );
};

/** Összegpiramis: rows[0] az alsó sor (4 elem), a felső sor egy elem. null = "?" */
export const PyramidDrawing: React.FC<{ rows: (number | string | null)[][]; w?: number }> = ({ rows, w = 54 }) => {
  const h = 26;
  const total = rows.length;
  return (
    <g>
      {rows.map((row, r) =>
        row.map((v, i) => {
          const rowW = row.length * w;
          const x = 120 - rowW / 2 + i * w;
          const y = 10 + (total - 1 - r) * h;
          const unknown = v === null || v === '?';
          return (
            <g key={`${r}-${i}`}>
              <rect x={x} y={y} width={w} height={h} fill={unknown ? '#fee2e2' : '#fef9c3'} stroke="#a16207" strokeWidth="1.2" />
              <text x={x + w / 2} y={y + 17.5} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={unknown ? '#dc2626' : '#713f12'}>
                {unknown ? '?' : v}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
};

// 6. ábra: Összegpiramis (tankönyv 47. o., 12. b) feladat)
export const SumPyramidSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 240 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="236" height="136" rx="12" fill="#fffbeb" stroke="#fcd34d" />
    <PyramidDrawing rows={[[200, 700, 1100, 500], [900, 1800, 1600], [2700, 3400], [6100]]} />
    <text x="120" y="131" textAnchor="middle" fontSize="10" fill="#713f12">Fent mindig az alatta lévő két szám összege áll.</text>
  </svg>
);
