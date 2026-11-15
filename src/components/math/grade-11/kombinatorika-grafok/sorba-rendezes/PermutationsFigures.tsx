import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const ANIMALS = [
  { id: 'T', name: 'tigris', color: '#f97316' },
  { id: 'O', name: 'oroszlán', color: '#eab308' },
  { id: 'P', name: 'párduc', color: '#0f172a' },
  { id: 'L', name: 'leopárd', color: '#a16207' },
  { id: 'E', name: 'elefánt', color: '#64748b' }
];

const Token: React.FC<{ x: number; y: number; id: string; color: string; label?: string; r?: number }> = ({
  x,
  y,
  id,
  color,
  label,
  r = 22
}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#ffffff" stroke={color} strokeWidth="3" />
    <text x={x} y={y + 7} fontSize="19" fontWeight="bold" textAnchor="middle" fill={color}>
      {id}
    </text>
    {label && (
      <text x={x} y={y + r + 16} fontSize="11" textAnchor="middle" fill="#475569">
        {label}
      </text>
    )}
  </g>
);

// 1. ábra: A cirkuszi felvonulás – 5! sorrend
export const CircusParadeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="220" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
    <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      5 vadállat vonul szorosan egymás után
    </text>
    {ANIMALS.map((a, i) => (
      <Token key={a.id} x={80 + i * 100} y={78} id={a.id} color={a.color} label={a.name} />
    ))}
    {[5, 4, 3, 2, 1].map((v, i) => (
      <g key={i}>
        <rect x={52 + i * 100} y={135} width="56" height="40" rx="8" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
        <text x={80 + i * 100} y={162} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#9a3412">
          {v}
        </text>
        {i < 4 && (
          <text x={130 + i * 100} y={162} fontSize="18" textAnchor="middle" fill="#0f172a">
            ·
          </text>
        )}
      </g>
    ))}
    <text x="280" y="206" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#c2410c">
      5 · 4 · 3 · 2 · 1 = 5! = 120 sorrend
    </text>
  </svg>
);

// 2. ábra: Két elem egymás mellett – egy „objektumnak” tekintjük
export const AdjacentBlockSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const row = (y: number, order: string[]) => (
    <g>
      <rect x="40" y={y - 30} width="150" height="60" rx="30" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" strokeDasharray="6 4" />
      <Token x={80} y={y} id={order[0]} color={ANIMALS.find((a) => a.id === order[0])!.color} />
      <Token x={150} y={y} id={order[1]} color={ANIMALS.find((a) => a.id === order[1])!.color} />
      {['P', 'L', 'E'].map((id, i) => (
        <Token key={id} x={250 + i * 70} y={y} id={id} color={ANIMALS.find((a) => a.id === id)!.color} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A tigris és az oroszlán közvetlenül egymás után
      </text>
      {row(75, ['T', 'O'])}
      {row(155, ['O', 'T'])}
      <text x="470" y="80" fontSize="13" fontWeight="bold" fill="#92400e">4! = 24</text>
      <text x="470" y="160" fontSize="13" fontWeight="bold" fill="#92400e">4! = 24</text>
      <text x="280" y="220" fontSize="13" textAnchor="middle" fill="#334155">
        4 „objektum” sorba rendezése, és a blokkon belül 2 sorrend
      </text>
      <text x="280" y="243" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#b45309">
        2 · 4! = 48;  nem egymás után: 5! − 2 · 4! = 72
      </text>
    </svg>
  );
};

// 3. ábra: Körbevonulás – az elforgatások ugyanazt a sorrendet adják
export const CircularParadeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 160;
  const cy = 140;
  const R = 85;
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
      <text x="20" y="28" fontSize="14" fontWeight="bold" fill="#0f172a">
        Körbevonulás: senki sem „első”
      </text>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5 5" />
      <path d={`M ${cx + 30} ${cy - R + 12} A ${R - 14} ${R - 14} 0 0 1 ${cx + R - 14} ${cy - 20}`} fill="none" stroke="#0d9488" strokeWidth="2" />
      <polygon points={`${cx + R - 14},${cy - 20} ${cx + R - 22},${cy - 30} ${cx + R - 8},${cy - 30}`} fill="#0d9488" />
      {ANIMALS.map((a, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        return <Token key={a.id} x={cx + R * Math.cos(ang)} y={cy + R * Math.sin(ang)} id={a.id} color={a.color} r={19} />;
      })}
      {['T-O-P-L-E', 'O-P-L-E-T', 'P-L-E-T-O', 'L-E-T-O-P', 'E-T-O-P-L'].map((s, i) => (
        <text key={s} x="300" y={70 + i * 24} fontSize="14" fontFamily="monospace" fill="#115e59">
          {s}
        </text>
      ))}
      <text x="420" y="120" fontSize="13" fill="#0f172a">← ugyanaz a</text>
      <text x="420" y="138" fontSize="13" fill="#0f172a">körsorrend</text>
      <text x="300" y="215" fontSize="15" fontWeight="bold" fill="#0f766e">120 : 5 = 24</text>
      <text x="300" y="238" fontSize="12" fill="#475569">minden esetet ötször számoltunk</text>
    </svg>
  );
};

// 4. ábra: Lány–fiú váltakozó ültetés
export const AlternatingSeatsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const seats = ['L', 'F', 'L', 'F', 'L', 'F'];
  const counts = ['3', '3', '2', '2', '1', '1'];
  return (
    <svg viewBox="0 0 560 210" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="200" rx="16" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        3 lány és 3 fiú: lány, fiú, lány, fiú, lány, fiú
      </text>
      {seats.map((s, i) => {
        const x = 50 + i * 82;
        const girl = s === 'L';
        return (
          <g key={i}>
            <rect x={x} y={60} width="64" height="50" rx="10" fill={girl ? '#fce7f3' : '#dbeafe'} stroke={girl ? '#db2777' : '#2563eb'} strokeWidth="2" />
            <text x={x + 32} y={92} fontSize="16" fontWeight="bold" textAnchor="middle" fill={girl ? '#9d174d' : '#1e40af'}>
              {girl ? 'lány' : 'fiú'}
            </text>
            <text x={x + 32} y={138} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#0f172a">
              {counts[i]}
            </text>
            <text x={x + 32} y={56} fontSize="10" textAnchor="middle" fill="#64748b">
              {i + 1}. hely
            </text>
          </g>
        );
      })}
      <text x="280" y="180" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#831843">
        3 · 3 · 2 · 2 · 1 · 1 = 3! · 3! = 36
      </text>
    </svg>
  );
};

// 5. ábra: A faktoriális gyors növekedése
export const FactorialGrowthSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];
  const maxLog = Math.log10(40320);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="20" y="28" fontSize="14" fontWeight="bold" fill="#0f172a">
        n! értékei (logaritmikus magasság)
      </text>
      <line x1="40" y1="215" x2="540" y2="215" stroke="#94a3b8" strokeWidth="1.5" />
      {vals.map((v, n) => {
        const h = v <= 1 ? 6 : 6 + (Math.log10(v) / maxLog) * 150;
        const x = 55 + n * 55;
        return (
          <g key={n}>
            <rect x={x} y={215 - h} width="36" height={h} rx="4" fill="#6366f1" opacity={0.35 + n * 0.07} />
            <text x={x + 18} y={210 - h} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#3730a3">
              {v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </text>
            <text x={x + 18} y={233} fontSize="12" textAnchor="middle" fill="#0f172a">
              {n}!
            </text>
          </g>
        );
      })}
      <text x="540" y="250" fontSize="11" textAnchor="end" fill="#475569">0! = 1 megállapodás szerint; 10! = 3 628 800</text>
    </svg>
  );
};
