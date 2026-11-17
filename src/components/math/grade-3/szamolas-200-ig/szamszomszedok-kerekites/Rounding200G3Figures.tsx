import React from 'react';
import { FONT, NumLine, PriceTag } from './Rounding200G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 147 szomszédai: egyes és tízes számszomszédok egy „vonaton”. */
export const NeighboursTrainSvg: Fig = ({ className = DEF }) => {
  const cars = [
    { v: '140', t: 'kisebb', t2: 'tízes', fill: '#dbeafe', stroke: '#1d4ed8' },
    { v: '146', t: 'kisebb', t2: 'egyes', fill: '#dcfce7', stroke: '#15803d' },
    { v: '147', t: 'a szám', t2: '', fill: '#fef08a', stroke: '#a16207' },
    { v: '148', t: 'nagyobb', t2: 'egyes', fill: '#dcfce7', stroke: '#15803d' },
    { v: '150', t: 'nagyobb', t2: 'tízes', fill: '#dbeafe', stroke: '#1d4ed8' }
  ];
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">A 147 szomszédai</text>
      <line x1="14" y1="98" x2="346" y2="98" stroke="#94a3b8" strokeWidth="3" />
      {cars.map((c, i) => {
        const x = 16 + i * 67;
        return (
          <g key={i}>
            <rect x={x} y="38" width="60" height="50" rx="9" fill={c.fill} stroke={c.stroke} strokeWidth={i === 2 ? 3 : 2} />
            <text x={x + 30} y="71" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{c.v}</text>
            <circle cx={x + 15} cy="93" r="6" fill="#334155" />
            <circle cx={x + 45} cy="93" r="6" fill="#334155" />
            {i < 4 && <line x1={x + 60} y1="66" x2={x + 67} y2="66" stroke="#334155" strokeWidth="2.5" />}
            <text x={x + 30} y="118" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={c.stroke}>{c.t}</text>
            <text x={x + 30} y="131" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={c.stroke}>{c.t2}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** A 140 és 150 közötti rész nagyítva: a 147 helye, a két tízes szomszéd. */
export const NeighboursLineSvg: Fig = ({ className = DEF }) => (
  <NumLine
    lo={139}
    hi={151}
    W={360}
    H={100}
    className={className}
    marks={[
      { v: 140, color: '#1d4ed8' },
      { v: 146, color: '#15803d' },
      { v: 147, color: '#a16207' },
      { v: 148, color: '#15803d' },
      { v: 150, color: '#1d4ed8' }
    ]}
  />
);

/** Napraforgók a magasságmérő mellett: csak azt látjuk, melyik két vonal között vannak. */
export const SunflowersSvg: Fig = ({ className = DEF }) => {
  const lines = [110, 120, 130, 140, 150];
  const Y = (cm: number) => 150 - (cm - 100) * 2.4;
  const flowers = [
    { x: 110, h: 124, name: 'A' },
    { x: 175, h: 146, name: 'B' },
    { x: 240, h: 133, name: 'C' },
    { x: 305, h: 116, name: 'D' }
  ];
  return (
    <svg viewBox="0 0 360 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="188" rx="14" fill="#f0f9ff" stroke="#cbd5e1" />
      <rect x="2" y="150" width="356" height="38" fill="#bbf7d0" />
      {lines.map((cm) => (
        <g key={cm}>
          <line x1="62" y1={Y(cm)} x2="348" y2={Y(cm)} stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" />
          <text x="56" y={Y(cm) + 4} textAnchor="end" fontSize="11" fill="#334155">{cm} cm</text>
        </g>
      ))}
      {flowers.map((f) => {
        const top = Y(f.h);
        return (
          <g key={f.name}>
            <line x1={f.x} y1="150" x2={f.x} y2={top + 8} stroke="#15803d" strokeWidth="4" />
            <path d={`M ${f.x} ${top + 40} q 14 -8 18 4 q -12 6 -18 -4`} fill="#22c55e" />
            {Array.from({ length: 10 }, (_, k) => {
              const a = (k * Math.PI) / 5;
              return <ellipse key={k} cx={f.x + Math.cos(a) * 10} cy={top + Math.sin(a) * 10} rx="6" ry="3.2" transform={`rotate(${(k * 36)} ${f.x + Math.cos(a) * 10} ${top + Math.sin(a) * 10})`} fill="#facc15" stroke="#ca8a04" strokeWidth="0.6" />;
            })}
            <circle cx={f.x} cy={top} r="7" fill="#78350f" />
            <text x={f.x} y="174" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">{f.name}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** A kerekítés szabálya: 131–134 a 130-hoz, 135–139 a 140-hez kerül. */
export const RoundingRuleSvg: Fig = ({ className = DEF }) => (
  <NumLine
    lo={129}
    hi={141}
    W={320}
    H={110}
    className={className}
    bands={[
      { from: 131, to: 134, color: '#60a5fa' },
      { from: 135, to: 139, color: '#fb923c' }
    ]}
    arrows={[
      { from: 133, to: 130, color: '#2563eb' },
      { from: 137, to: 140, color: '#ea580c' }
    ]}
    marks={[
      { v: 131, color: '#2563eb' },
      { v: 132, color: '#2563eb' },
      { v: 133, color: '#2563eb' },
      { v: 134, color: '#2563eb' },
      { v: 135, color: '#ea580c' },
      { v: 136, color: '#ea580c' },
      { v: 137, color: '#ea580c' },
      { v: 138, color: '#ea580c' },
      { v: 139, color: '#ea580c' }
    ]}
  />
);

/** A ≈ jel: körülbelül egyenlő. */
export const ApproxSignSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <text x="70" y="62" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#0f172a">163</text>
    <text x="150" y="64" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#d97706">≈</text>
    <text x="230" y="62" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#0f172a">160</text>
    <text x="70" y="96" textAnchor="middle" fontSize="12" fill="#475569">pontos szám</text>
    <text x="150" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">körülbelül</text>
    <text x="230" y="96" textAnchor="middle" fontSize="12" fill="#475569">kerekített érték</text>
    <text x="314" y="64" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b45309">kb.</text>
  </svg>
);

/** Árcédulák a boltban – becslés kerek tízesekkel. */
export const PriceTagsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {/* füzet */}
    <rect x="32" y="22" width="50" height="62" rx="4" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
    <rect x="40" y="34" width="34" height="10" rx="2" fill="#fff" />
    <PriceTag x={28} y={96} text="78 Ft" />
    {/* ragasztó */}
    <rect x="146" y="30" width="26" height="54" rx="5" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" />
    <rect x="149" y="18" width="20" height="14" rx="3" fill="#fde68a" stroke="#9d174d" strokeWidth="1.2" />
    <PriceTag x={131} y={96} text="134 Ft" />
    {/* zsírkréta doboz */}
    <rect x="236" y="36" width="86" height="48" rx="5" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
    {['#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f97316'].map((c, i) => (
      <rect key={c} x={244 + i * 15} y="24" width="9" height="22" rx="3" fill={c} stroke="#334155" strokeWidth="0.6" />
    ))}
    <PriceTag x={251} y={96} text="165 Ft" />
  </svg>
);
