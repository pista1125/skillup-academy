import React from 'react';

const FONT = 'system-ui, sans-serif';
const UNK = '#dc2626';

/** A leggyorsabb vonat: 1 óra alatt 600 km (tankönyv 103. o., 1. feladat). */
export const SpeedTrainSvg: React.FC<{ className?: string }> = ({ className }) => {
  const hours = [1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 360 220" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="218" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      {/* sín */}
      <line x1="16" y1="104" x2="344" y2="104" stroke="#64748b" strokeWidth="3" />
      {Array.from({ length: 17 }).map((_, i) => (
        <rect key={i} x={20 + i * 20} y="104" width="8" height="5" fill="#94a3b8" />
      ))}
      {/* gyorsvonat */}
      <path d="M 40 96 L 40 62 Q 40 52 52 52 L 230 52 Q 290 52 312 92 L 312 96 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
      <path d="M 238 58 Q 280 60 298 86 L 238 86 Z" fill="#7dd3fc" stroke="#0f172a" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={54 + i * 36} y="62" width="26" height="18" rx="4" fill="#7dd3fc" stroke="#0f172a" strokeWidth="1" />
      ))}
      <rect x="40" y="84" width="272" height="6" fill="#2563eb" />
      <circle cx="80" cy="98" r="6" fill="#334155" />
      <circle cx="270" cy="98" r="6" fill="#334155" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={8} y1={62 + i * 10} x2={30} y2={62 + i * 10} stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      ))}
      <text x="180" y="34" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">
        1 óra alatt 600 km
      </text>
      {/* táblázat */}
      <g transform="translate(20 128)">
        <rect x="0" y="0" width="80" height="34" fill="#bae6fd" stroke="#0369a1" />
        <rect x="0" y="34" width="80" height="34" fill="#bae6fd" stroke="#0369a1" />
        <text x="40" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a6e">Idő (óra)</text>
        <text x="40" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a6e">Út (km)</text>
        {hours.map((h, i) => (
          <g key={h}>
            <rect x={80 + i * 40} y="0" width="40" height="34" fill="#ffffff" stroke="#0369a1" />
            <rect x={80 + i * 40} y="34" width="40" height="34" fill="#ffffff" stroke="#0369a1" />
            <text x={100 + i * 40} y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{h}</text>
            <text x={100 + i * 40} y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill={i < 2 ? '#0f172a' : UNK}>
              {i === 0 ? '600' : i === 1 ? '1200' : '?'}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

/** Egyenlő hányadosok: ha az osztandót és az osztót ugyanannyiszorosára változtatjuk (103. o., 2. feladat). */
export const EqualQuotientsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const groups = [
    { v: 3, c: '#dc2626', items: ['12 : 4', '120 : 40', '1200 : 400'] },
    { v: 4, c: '#16a34a', items: ['12 : 3', '120 : 30', '240 : 60'] },
    { v: 30, c: '#2563eb', items: ['120 : 4', '1200 : 40'] }
  ];
  const sx = (v: number) => 30 + v * 9.6;
  return (
    <svg viewBox="0 0 360 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="228" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      {groups.map((g, gi) => (
        <g key={g.v}>
          {g.items.map((t, i) => (
            <g key={t}>
              <rect x={14 + gi * 116} y={16 + i * 36} width="104" height="28" rx="14" fill={g.c} opacity="0.9" />
              <text x={66 + gi * 116} y={35 + i * 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">{t}</text>
            </g>
          ))}
          <text x={66 + gi * 116} y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill={g.c}>= {g.v}</text>
        </g>
      ))}
      {/* számegyenes 0-tól 32-ig */}
      <line x1="24" y1="190" x2="346" y2="190" stroke="#334155" strokeWidth="2" />
      <polygon points="346,190 338,185 338,195" fill="#334155" />
      {Array.from({ length: 33 }).map((_, i) => (
        <line key={i} x1={sx(i)} y1={i % 5 === 0 ? 182 : 186} x2={sx(i)} y2={i % 5 === 0 ? 198 : 194} stroke="#334155" strokeWidth={i % 5 === 0 ? 1.6 : 1} />
      ))}
      {[0, 10, 20, 30].map((v) => (
        <text key={v} x={sx(v)} y="214" textAnchor="middle" fontSize="11" fill="#334155">{v}</text>
      ))}
      {groups.map((g) => (
        <g key={g.v}>
          <circle cx={sx(g.v)} cy="190" r="6" fill={g.c} stroke="#ffffff" strokeWidth="1.5" />
          <text x={sx(g.v)} y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill={g.c}>{g.v}</text>
        </g>
      ))}
    </svg>
  );
};

/** Ha egy szám kétszerese 1500 … (103. o., 4. feladat) – nyíldiagram. */
export const DoublingChainSvg: React.FC<{ className?: string }> = ({ className }) => {
  const boxes = [
    { x: 14, t: '?', c: '#0ea5e9' },
    { x: 104, t: '1500', c: '#f97316' },
    { x: 194, t: '?', c: '#ef4444' },
    { x: 284, t: '?', c: '#ef4444' }
  ];
  return (
    <svg viewBox="0 0 360 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="rel4-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#dc2626" />
        </marker>
      </defs>
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="70" width="62" height="30" rx="15" fill={b.c} />
          <text x={b.x + 31} y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff">{b.t}</text>
          {i < 3 && (
            <g>
              <line x1={b.x + 64} y1="85" x2={b.x + 88} y2="85" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rel4-arr)" />
              <text x={b.x + 76} y="78" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">· 2</text>
            </g>
          )}
        </g>
      ))}
      {/* · 4 felül */}
      <path d="M 45 68 L 45 34 L 225 34 L 225 66" fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rel4-arr)" />
      <text x="135" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">· 4</text>
      {/* · 8 alul */}
      <path d="M 45 102 L 45 140 L 315 140 L 315 104" fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rel4-arr)" />
      <text x="180" y="158" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">· 8</text>
    </svg>
  );
};

/** 12 kiskanál → 768 Ft, felezve 6 kiskanál → ? Ft (104. o., 9. feladat). */
export const SpoonsHalvingSvg: React.FC<{ className?: string }> = ({ className }) => {
  const spoon = (x: number, y: number, k: string) => (
    <g key={k} transform={`translate(${x} ${y}) rotate(-15)`}>
      <ellipse cx="0" cy="0" rx="7" ry="5" fill="#d6d3d1" stroke="#78716c" />
      <rect x="6" y="-1.5" width="22" height="3" rx="1.5" fill="#a8a29e" stroke="#78716c" strokeWidth="0.6" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#ffedd5" stroke="#fdba74" />
      {Array.from({ length: 12 }).map((_, i) => spoon(30 + (i % 4) * 34, 34 + Math.floor(i / 4) * 18, `a${i}`))}
      {Array.from({ length: 6 }).map((_, i) => spoon(30 + (i % 3) * 34, 140 + Math.floor(i / 3) * 18, `b${i}`))}
      <path d="M 12 50 Q 0 110 14 160" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <polygon points="14,164 8,154 19,156" fill="#2563eb" />
      <text x="4" y="112" fontSize="12" fontWeight="bold" fill="#1e3a8a">: 2</text>
      <text x="220" y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">12 kiskanál → 768 Ft</text>
      <text x="220" y="160" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        6 kiskanál → <tspan fill={UNK}>? Ft</tspan>
      </text>
      <path d="M 300 72 Q 330 110 300 144" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <polygon points="298,148 296,137 306,141" fill="#2563eb" />
      <text x="322" y="112" fontSize="12" fontWeight="bold" fill="#1e3a8a">: 2</text>
    </svg>
  );
};

/** 240 palánta: több kertész → kevesebb palánta fejenként (104. o., 7. feladat). */
export const GardenersTableSvg: React.FC<{ className?: string }> = ({ className }) => {
  const cols = [
    { n: 2, p: '120' },
    { n: 3, p: '80' },
    { n: 4, p: '60' },
    { n: 5, p: '?' },
    { n: 6, p: '?' },
    { n: 10, p: '?' }
  ];
  return (
    <svg viewBox="0 0 360 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      {/* virágok */}
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} transform={`translate(${28 + i * 32} 30)`}>
          <line x1="0" y1="0" x2="0" y2="18" stroke="#16a34a" strokeWidth="2" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={6 * Math.cos((a * Math.PI) / 180)} cy={6 * Math.sin((a * Math.PI) / 180)} r="4" fill={i % 2 ? '#f472b6' : '#facc15'} />
          ))}
          <circle cx="0" cy="0" r="3" fill="#ea580c" />
        </g>
      ))}
      <text x="180" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">Összesen 240 palánta</text>
      <g transform="translate(12 84)">
        <rect x="0" y="0" width="114" height="34" fill="#bbf7d0" stroke="#15803d" />
        <rect x="0" y="34" width="114" height="34" fill="#bbf7d0" stroke="#15803d" />
        <text x="57" y="21" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">Kertészek (fő)</text>
        <text x="57" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">Palánta / fő</text>
        {cols.map((c, i) => (
          <g key={c.n}>
            <rect x={114 + i * 36} y="0" width="36" height="34" fill="#ffffff" stroke="#15803d" />
            <rect x={114 + i * 36} y="34" width="36" height="34" fill="#ffffff" stroke="#15803d" />
            <text x={132 + i * 36} y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{c.n}</text>
            <text x={132 + i * 36} y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill={c.p === '?' ? UNK : '#0f172a'}>{c.p}</text>
          </g>
        ))}
      </g>
      <text x="180" y="176" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
        Kétszer annyi kertész → feleannyi palánta fejenként
      </text>
      <text x="180" y="192" textAnchor="middle" fontSize="11" fill="#166534">(a szorzat mindig 240)</text>
    </svg>
  );
};
