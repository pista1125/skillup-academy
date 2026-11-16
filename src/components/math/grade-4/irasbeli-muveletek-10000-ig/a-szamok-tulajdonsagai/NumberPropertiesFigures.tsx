import React from 'react';

const FONT = 'system-ui, sans-serif';

/** Halmazábra: 2 többszörösei és 5 többszörösei a 10 000-nél kisebb számok között (tankönyv 101. o.). */
export const MultiplesVennSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="6" y="6" width="388" height="218" rx="16" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
    <rect x="116" y="6" width="168" height="22" rx="8" fill="#ea580c" />
    <text x="200" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">10 000-nél kisebb számok</text>
    <rect x="40" y="76" width="200" height="130" rx="14" fill="#c7d2fe" stroke="#3730a3" strokeWidth="2" opacity="0.95" />
    <rect x="170" y="40" width="200" height="130" rx="14" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" opacity="0.85" />
    <rect x="170" y="76" width="70" height="94" fill="#86efac" stroke="#15803d" strokeWidth="2" />
    <text x="78" y="96" fontSize="12" fontWeight="bold" fill="#3730a3">5 többszörösei</text>
    <text x="270" y="58" fontSize="12" fontWeight="bold" fill="#0369a1">2 többszörösei</text>
    <g fontSize="13" fontWeight="bold">
      <text x="62" y="128" fill="#1e1b4b">2965</text>
      <text x="110" y="156" fill="#1e1b4b">1175</text>
      <text x="62" y="184" fill="#1e1b4b">6755</text>
      <text x="180" y="104" fill="#14532d">4310</text>
      <text x="180" y="130" fill="#14532d">8420</text>
      <text x="180" y="156" fill="#14532d">4000</text>
      <text x="262" y="96" fill="#0c4a6e">7602</text>
      <text x="300" y="124" fill="#0c4a6e">7656</text>
      <text x="262" y="152" fill="#0c4a6e">4802</text>
      <text x="300" y="196" fill="#7c2d12">4561</text>
      <text x="318" y="80" fill="#0c4a6e">5552</text>
      <text x="260" y="214" fill="#7c2d12">2983</text>
    </g>
    <text x="205" y="89" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">10 többszörösei</text>
  </svg>
);

/** Az utolsó számjegy dönt: 2, 5 és 10 többszörösei. */
export const LastDigitRuleSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    { t: '2 többszöröse (páros)', ok: [0, 2, 4, 6, 8], c: '#0284c7' },
    { t: '5 többszöröse', ok: [0, 5], c: '#4338ca' },
    { t: '10 többszöröse', ok: [0], c: '#15803d' }
  ];
  return (
    <svg viewBox="0 0 400 180" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="200" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Mire végződik a szám?</text>
      {rows.map((r, i) => (
        <g key={r.t}>
          <text x="12" y={62 + i * 44} fontSize="12" fontWeight="bold" fill={r.c}>{r.t}</text>
          {Array.from({ length: 10 }).map((_, d) => {
            const on = r.ok.includes(d);
            return (
              <g key={d}>
                <rect x={170 + d * 22} y={44 + i * 44} width="19" height="26" rx="5" fill={on ? r.c : '#e2e8f0'} />
                <text x={179.5 + d * 22} y={62 + i * 44} textAnchor="middle" fontSize="13" fontWeight="bold" fill={on ? '#fff' : '#94a3b8'}>
                  {d}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
};

/** Számkártyák: 0, 5, 3, 4, 0 (tankönyv 101. o., 1. feladat). */
export const NumberCardsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const cards = [
    { d: '0', c: '#fef3c7' },
    { d: '5', c: '#dcfce7' },
    { d: '3', c: '#e0f2fe' },
    { d: '4', c: '#fce7f3' },
    { d: '0', c: '#fef3c7' }
  ];
  return (
    <svg viewBox="0 0 400 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="148" rx="12" fill="#fff" stroke="#e2e8f0" />
      {cards.map((k, i) => (
        <g key={i}>
          <rect x={28 + i * 72} y="22" width="56" height="64" rx="10" fill={k.c} stroke="#94a3b8" />
          <text x={56 + i * 72} y="66" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#1e293b">{k.d}</text>
        </g>
      ))}
      <text x="200" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        Pl. 5430 → 0-ra végződik: 2, 5 és 10 többszöröse is.
      </text>
      <text x="200" y="134" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        5400 → 00-ra végződik: még a 100-nak is többszöröse!
      </text>
    </svg>
  );
};

/** Számegyenes 0-tól 30-ig: 2-es és 5-ös ugrások, a közös pontok a 10 többszörösei. */
export const MultiplesLineSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 20;
  const step = 12;
  const sx = (v: number) => x0 + v * step;
  return (
    <svg viewBox="0 0 400 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="168" rx="12" fill="#f0f9ff" stroke="#bae6fd" />
      <text x="200" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">
        Ugrálj 2-esével (kék) és 5-ösével (lila)!
      </text>
      <line x1={x0 - 6} y1="100" x2={sx(30) + 10} y2="100" stroke="#0f172a" strokeWidth="2" />
      {Array.from({ length: 31 }).map((_, v) => (
        <g key={v}>
          <line x1={sx(v)} x2={sx(v)} y1={v % 5 === 0 ? 92 : 95} y2={v % 5 === 0 ? 108 : 105} stroke="#334155" strokeWidth={v % 5 === 0 ? 1.5 : 0.8} />
          {v % 5 === 0 && (
            <text x={sx(v)} y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{v}</text>
          )}
        </g>
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <path key={`a${i}`} d={`M ${sx(i * 2)} 96 Q ${sx(i * 2 + 1)} 76 ${sx(i * 2 + 2)} 96`} fill="none" stroke="#0284c7" strokeWidth="1.8" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={`b${i}`} d={`M ${sx(i * 5)} 104 Q ${sx(i * 5 + 2.5)} 136 ${sx(i * 5 + 5)} 104`} fill="none" stroke="#7c3aed" strokeWidth="1.8" />
      ))}
      {[0, 10, 20, 30].map((v) => (
        <circle key={v} cx={sx(v)} cy="100" r="6" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
      ))}
      <text x="200" y="158" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
        Ahol mindkét ugrás leér (0, 10, 20, 30): a 10 többszörösei
      </text>
    </svg>
  );
};

/** Ismétlődő sorozatok: léggömbök (2-es ismétlődés) és buszok (3-as ismétlődés) (tankönyv 102. o., 6. feladat). */
export const RepeatingPatternSvg: React.FC<{ className?: string }> = ({ className }) => {
  const balloon = (cx: number, color: string, key: string) => (
    <g key={key}>
      <ellipse cx={cx} cy="46" rx="11" ry="14" fill={color} stroke="#334155" strokeWidth="1" />
      <line x1={cx} y1="60" x2={cx} y2="72" stroke="#334155" />
      <rect x={cx - 4} y="72" width="8" height="6" fill="#92400e" />
    </g>
  );
  const bus = (x: number, color: string, key: string) => (
    <g key={key}>
      <rect x={x} y="108" width="34" height="18" rx="4" fill={color} stroke="#334155" />
      <rect x={x + 4} y="111" width="26" height="6" fill="#e0f2fe" />
      <circle cx={x + 8} cy="128" r="3" fill="#334155" />
      <circle cx={x + 26} cy="128" r="3" fill="#334155" />
    </g>
  );
  const bal = ['#ef4444', '#facc15'];
  const bs = ['#2563eb', '#dc2626', '#eab308'];
  return (
    <svg viewBox="0 0 400 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="168" rx="12" fill="#fefce8" stroke="#fde68a" />
      <text x="12" y="22" fontSize="12" fontWeight="bold" fill="#334155">a) 2 elem ismétlődik</text>
      {Array.from({ length: 8 }).map((_, i) => balloon(24 + i * 34, bal[i % 2], `b${i}`))}
      <text x="306" y="52" fontSize="13" fontWeight="bold" fill="#334155">… 11. ?</text>
      <text x="12" y="100" fontSize="12" fontWeight="bold" fill="#334155">b) 3 elem ismétlődik</text>
      {Array.from({ length: 6 }).map((_, i) => bus(10 + i * 44, bs[i % 3], `u${i}`))}
      <text x="282" y="122" fontSize="13" fontWeight="bold" fill="#334155">… 12. ?</text>
      <text x="200" y="156" textAnchor="middle" fontSize="11" fill="#475569">
        Tipp: oszd el a sorszámot az ismétlődő elemek számával, és figyeld a maradékot!
      </text>
    </svg>
  );
};
