import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** 1. ábra: a hosszúság mértékegységeinek lépcsője (km → m → dm → cm → mm) */
export const LengthUnitLadderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const units = [
    { u: 'km', name: 'kilométer', color: '#7c3aed' },
    { u: 'm', name: 'méter', color: '#dc2626' },
    { u: 'dm', name: 'deciméter', color: '#0284c7' },
    { u: 'cm', name: 'centiméter', color: '#ea580c' },
    { u: 'mm', name: 'milliméter', color: '#16a34a' }
  ];
  const factors = ['· 1000', '· 10', '· 10', '· 10'];
  return (
    <svg viewBox="0 0 520 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="186" rx="16" fill="#fff7ed" stroke="#fdba74" />
      <text x="260" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
        Nagyobb egységről kisebbre: szorzunk
      </text>
      {units.map((it, i) => {
        const x = 20 + i * 102;
        const y = 70 + i * 18;
        return (
          <g key={it.u}>
            <rect x={x} y={y} width="78" height="48" rx="12" fill="#ffffff" stroke={it.color} strokeWidth="3" />
            <text x={x + 39} y={y + 25} textAnchor="middle" fontSize="20" fontWeight="bold" fill={it.color}>
              {it.u}
            </text>
            <text x={x + 39} y={y + 41} textAnchor="middle" fontSize="9.5" fill="#475569">
              {it.name}
            </text>
          </g>
        );
      })}
      {factors.map((f, i) => {
        const x1 = 20 + i * 102 + 60;
        const x2 = 20 + (i + 1) * 102 + 18;
        const y1 = 70 + i * 18;
        const y2 = 70 + (i + 1) * 18;
        const mx = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path d={`M ${x1} ${y1 - 2} Q ${mx} ${y1 - 34} ${x2} ${y2 - 4}`} fill="none" stroke="#f97316" strokeWidth="2.5" />
            <polygon points={`${x2},${y2 - 2} ${x2 - 9},${y2 - 9} ${x2 - 2},${y2 - 12}`} fill="#f97316" />
            <text x={mx} y={y1 - 26} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">
              {f}
            </text>
          </g>
        );
      })}
      <text x="260" y="178" textAnchor="middle" fontSize="12" fill="#475569">
        1 km = 1000 m • 1 m = 10 dm = 100 cm = 1000 mm
      </text>
    </svg>
  );
};

/** 2. ábra: vonalzó, rajta egy 6 cm 4 mm-es szakasz */
export const RulerReadingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 40;
  const mm = 5;
  const len = 64;
  return (
    <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="166" rx="16" fill="#f0f9ff" stroke="#7dd3fc" />
      <line x1={x0} y1="40" x2={x0 + len * mm} y2="40" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
      <circle cx={x0} cy="40" r="5" fill="#dc2626" />
      <circle cx={x0 + len * mm} cy="40" r="5" fill="#dc2626" />
      <text x={x0 + (len * mm) / 2} y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">
        6 cm 4 mm = 64 mm
      </text>
      <rect x="25" y="60" width="470" height="70" rx="6" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
      {Array.from({ length: 91 }, (_, i) => {
        const x = x0 + i * mm;
        const h = i % 10 === 0 ? 22 : i % 5 === 0 ? 15 : 9;
        return <line key={i} x1={x} y1="60" x2={x} y2={60 + h} stroke="#78350f" strokeWidth={i % 10 === 0 ? 2 : 1} />;
      })}
      {Array.from({ length: 10 }, (_, i) => (
        <text key={i} x={x0 + i * 50} y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">
          {i}
        </text>
      ))}
      <text x="470" y="122" fontSize="11" fill="#92400e" textAnchor="end">cm</text>
      <line x1={x0 + len * mm} y1="45" x2={x0 + len * mm} y2="60" stroke="#dc2626" strokeDasharray="3 2" />
      <line x1={x0} y1="45" x2={x0} y2="60" stroke="#dc2626" strokeDasharray="3 2" />
      <text x="260" y="152" textAnchor="middle" fontSize="12" fill="#0369a1">
        A szakasz eleje a 0-nál legyen! 1 nagy osztás = 1 cm, 1 kis osztás = 1 mm.
      </text>
    </svg>
  );
};

/** 3. ábra: Rozi útja – a tankönyvi térkép (550 m, 340 m, 800 m, 480 m) */
export const RoziMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const H = { x: 70, y: 70 };
  const N = { x: 230, y: 45 };
  const Z = { x: 230, y: 175 };
  const S = { x: 450, y: 175 };
  const place = (p: { x: number; y: number }, label: string, color: string, emoji: string) => (
    <g>
      <circle cx={p.x} cy={p.y} r="22" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={p.x} y={p.y + 7} textAnchor="middle" fontSize="20">
        {emoji}
      </text>
      <rect x={p.x - 48} y={p.y + 25} width="96" height="18" rx="9" fill={color} />
      <text x={p.x} y={p.y + 38} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
        {label}
      </text>
    </g>
  );
  const road = (a: { x: number; y: number }, b: { x: number; y: number }, t: string, dx = 0, dy = -8) => (
    <g>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#b45309" strokeWidth="7" strokeLinecap="round" opacity="0.35" />
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#b45309" strokeWidth="2" strokeDasharray="6 4" />
      <text x={(a.x + b.x) / 2 + dx} y={(a.y + b.y) / 2 + dy} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">
        {t}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 240" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="236" rx="16" fill="#ecfccb" stroke="#84cc16" />
      {road(H, N, '550 m', -6, -6)}
      {road(N, Z, '340 m', 26, 0)}
      {road(N, S, '800 m', 26, -10)}
      {road(Z, S, '480 m', 0, -8)}
      {place(H, 'Rozi háza', '#2563eb', '🏠')}
      {place(N, 'Nagymama', '#db2777', '🏡')}
      {place(Z, 'Zöldséges', '#16a34a', '🍎')}
      {place(S, 'Iskola', '#7c3aed', '🏫')}
    </svg>
  );
};

/** 4. ábra: Benedek és Bendegúz a 20 m-es út két végéről indul egymás felé */
export const WalkingTwinsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const kid = (x: number, color: string, name: string) => (
    <g>
      <circle cx={x} cy="52" r="11" fill="#fcd9b6" stroke="#7c2d12" />
      <rect x={x - 9} y="64" width="18" height="26" rx="5" fill={color} />
      <line x1={x - 5} y1="90" x2={x - 8} y2="108" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1={x + 5} y1="90" x2={x + 8} y2="108" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <text x={x} y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        {name}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="176" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {kid(50, '#2563eb', 'Benedek')}
      {kid(470, '#16a34a', 'Bendegúz')}
      <line x1="70" y1="112" x2="450" y2="112" stroke="#b91c1c" strokeWidth="4" />
      <line x1="70" y1="102" x2="70" y2="122" stroke="#b91c1c" strokeWidth="3" />
      <line x1="450" y1="102" x2="450" y2="122" stroke="#b91c1c" strokeWidth="3" />
      {Array.from({ length: 21 }, (_, i) => (
        <line key={i} x1={70 + i * 19} y1="108" x2={70 + i * 19} y2="116" stroke="#b91c1c" strokeWidth="1.2" />
      ))}
      <path d="M 90 85 Q 140 60 190 85" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <polygon points="190,85 180,80 184,90" fill="#2563eb" />
      <path d="M 430 85 Q 380 60 330 85" fill="none" stroke="#16a34a" strokeWidth="2.5" />
      <polygon points="330,85 340,80 336,90" fill="#16a34a" />
      <text x="260" y="70" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626">
        ?
      </text>
      <text x="260" y="150" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">
        20 m
      </text>
      <text x="260" y="168" textAnchor="middle" fontSize="11" fill="#475569">
        Együtt teszik meg a 20 m-t – mindketten csak egy részét!
      </text>
    </svg>
  );
};

/** 5. ábra: repülési magasságok (MF I/47. 7. feladat) */
export const FlightAltitudeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const levels = [
    { h: 10000, t: 'utasszállító repülőgép – 10 km', c: '#7c3aed', e: '✈️' },
    { h: 5000, t: 'siklórepülő – 5 km', c: '#0284c7', e: '🛩️' },
    { h: 2900, t: 'sárkányrepülő – 2900 m', c: '#ea580c', e: '🪁' },
    { h: 1200, t: 'hőlégballon – 1200 m', c: '#dc2626', e: '🎈' }
  ];
  const yOf = (h: number) => 200 - h * 0.017;
  return (
    <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <defs>
        <linearGradient id="lmSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="516" height="226" rx="16" fill="url(#lmSky)" stroke="#93c5fd" />
      <line x1="60" y1="20" x2="60" y2="200" stroke="#1e3a8a" strokeWidth="2" />
      <rect x="20" y="200" width="480" height="20" fill="#60a5fa" opacity="0.6" />
      <text x="70" y="214" fontSize="11" fontWeight="bold" fill="#1e3a8a">tengerszint – 0 m</text>
      {levels.map((l) => (
        <g key={l.h}>
          <line x1="55" y1={yOf(l.h)} x2="480" y2={yOf(l.h)} stroke={l.c} strokeDasharray="5 4" strokeWidth="1.5" />
          <text x="78" y={yOf(l.h) + 6} fontSize="18">
            {l.e}
          </text>
          <text x="108" y={yOf(l.h) - 4} fontSize="12" fontWeight="bold" fill={l.c}>
            {l.t}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 6. ábra: 400 m-es atlétikai pálya A, B, C, D pontokkal */
export const RunningTrackSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="216" rx="16" fill="#f0fdf4" stroke="#86efac" />
    <rect x="100" y="40" width="320" height="140" rx="70" fill="#fb923c" />
    <rect x="125" y="62" width="270" height="96" rx="48" fill="#4ade80" />
    <rect x="100" y="40" width="320" height="140" rx="70" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 6" />
    {[
      { x: 395, y: 180, t: 'A' },
      { x: 395, y: 40, t: 'B' },
      { x: 125, y: 40, t: 'C' },
      { x: 125, y: 180, t: 'D' }
    ].map((p) => (
      <g key={p.t}>
        <circle cx={p.x} cy={p.y} r="12" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
          {p.t}
        </text>
      </g>
    ))}
    <text x="260" y="115" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">
      1 kör = 400 m
    </text>
    <text x="260" y="208" textAnchor="middle" fontSize="11" fill="#166534">
      A pontok 4 egyenlő részre osztják: két szomszédos pont között 100 m
    </text>
  </svg>
);
