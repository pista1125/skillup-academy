import React from 'react';
import { FONT, RLine, PriceTag } from './Rounding500G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** A 368 hat szomszédja egy létrán: százas, tízes, egyes. */
export const NeighboursLadderSvg: Fig = ({ className = DEF }) => {
  const cells = [
    { v: '300', t: 'kisebb', t2: 'százas', fill: '#fee2e2', stroke: '#b91c1c' },
    { v: '360', t: 'kisebb', t2: 'tízes', fill: '#dbeafe', stroke: '#1d4ed8' },
    { v: '367', t: 'kisebb', t2: 'egyes', fill: '#dcfce7', stroke: '#15803d' },
    { v: '368', t: 'a szám', t2: '', fill: '#fef08a', stroke: '#a16207' },
    { v: '369', t: 'nagyobb', t2: 'egyes', fill: '#dcfce7', stroke: '#15803d' },
    { v: '370', t: 'nagyobb', t2: 'tízes', fill: '#dbeafe', stroke: '#1d4ed8' },
    { v: '400', t: 'nagyobb', t2: 'százas', fill: '#fee2e2', stroke: '#b91c1c' }
  ];
  return (
    <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {cells.map((c, i) => {
        const x = 8 + i * 50;
        return (
          <g key={i}>
            <rect x={x} y="18" width="46" height="42" rx="8" fill={c.fill} stroke={c.stroke} strokeWidth={i === 3 ? 3 : 2} />
            <text x={x + 23} y="46" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">{c.v}</text>
            <text x={x + 23} y="80" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={c.stroke}>{c.t}</text>
            <text x={x + 23} y="94" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={c.stroke}>{c.t2}</text>
          </g>
        );
      })}
      <text x="180" y="112" textAnchor="middle" fontSize="10.5" fill="#475569">balra a kisebbek, jobbra a nagyobbak</text>
    </svg>
  );
};

/** A 368 helye a 300 és 400 között; a tízes és a százas szomszédok. */
export const HundredLineSvg: Fig = ({ className = DEF }) => (
  <RLine
    lo={300}
    hi={400}
    tickEvery={10}
    bigEvery={50}
    labels={[300, 360, 370, 400]}
    bands={[{ from: 360, to: 370, color: '#60a5fa' }]}
    marks={[{ v: 368, label: '368', color: '#a16207' }]}
    W={360}
    H={90}
    className={className}
  />
);

/** Kerekítés tízesre: 241–244 le, 245–249 fel. */
export const TenRuleSvg: Fig = ({ className = DEF }) => (
  <RLine
    lo={238}
    hi={252}
    tickEvery={1}
    bigEvery={10}
    labels={[240, 245, 250]}
    bands={[
      { from: 241, to: 244, color: '#60a5fa' },
      { from: 245, to: 249, color: '#fb923c' }
    ]}
    marks={[
      { v: 243, color: '#2563eb' },
      { v: 247, color: '#ea580c' }
    ]}
    arrows={[
      { from: 243, to: 240, color: '#2563eb' },
      { from: 247, to: 250, color: '#ea580c' }
    ]}
    W={360}
    H={100}
    className={className}
  />
);

/** Kerekítés százasra: 201–249 a 200-hoz, 250–299 a 300-hoz. */
export const HundredRuleSvg: Fig = ({ className = DEF }) => (
  <RLine
    lo={190}
    hi={310}
    tickEvery={10}
    bigEvery={50}
    labels={[200, 250, 300]}
    bands={[
      { from: 201, to: 249, color: '#60a5fa' },
      { from: 250, to: 299, color: '#fb923c' }
    ]}
    marks={[
      { v: 226, color: '#2563eb' },
      { v: 281, color: '#ea580c' }
    ]}
    arrows={[
      { from: 226, to: 200, color: '#2563eb' },
      { from: 281, to: 300, color: '#ea580c' }
    ]}
    W={360}
    H={100}
    className={className}
  />
);

/** Ugyanaz a szám kétféleképpen kerekítve: 374 ≈ 370 és 374 ≈ 400. */
export const TwoWaysSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <rect x="164" y="8" width="32" height="42" rx="6" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2.5" />
    <rect x="200" y="8" width="32" height="42" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
    {['3', '7', '4'].map((d, i) => (
      <text key={i} x={144 + i * 36} y="41" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#0f172a">{d}</text>
    ))}
    <text x="90" y="76" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">tízesre: nézd az egyest</text>
    <text x="90" y="110" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#1d4ed8">374 ≈ 370</text>
    <text x="270" y="76" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#b91c1c">százasra: nézd a tízest</text>
    <text x="270" y="110" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#b91c1c">374 ≈ 400</text>
    <text x="180" y="138" textAnchor="middle" fontSize="11" fill="#475569">ugyanaz a szám, kétféle kerekítés</text>
  </svg>
);

/** Pontosan vagy körülbelül? */
export const ExactOrNotSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {/* iskola */}
    <rect x="30" y="40" width="80" height="50" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
    <path d="M 24 42 L 70 14 L 116 42 Z" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
    <rect x="62" y="64" width="16" height="26" fill="#92400e" />
    <rect x="38" y="52" width="14" height="12" fill="#bae6fd" stroke="#0369a1" />
    <rect x="88" y="52" width="14" height="12" fill="#bae6fd" stroke="#0369a1" />
    <text x="70" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">kb. 400 tanuló</text>
    <text x="70" y="127" textAnchor="middle" fontSize="11" fill="#b45309">elég a körülbelül</text>
    {/* jegy */}
    <rect x="216" y="30" width="110" height="56" rx="8" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="0" />
    <line x1="250" y1="30" x2="250" y2="86" stroke="#0369a1" strokeDasharray="4 3" />
    <text x="288" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">JEGY</text>
    <text x="288" y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">460 Ft</text>
    <text x="271" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">pontosan 460 Ft</text>
    <text x="271" y="127" textAnchor="middle" fontSize="11" fill="#0369a1">itt a pontos szám kell</text>
  </svg>
);

/** Játékbolt: árak kerekítéssel. */
export const ToyShopSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {/* kisautó */}
    <rect x="40" y="52" width="80" height="24" rx="6" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
    <path d="M 56 52 L 66 34 L 96 34 L 106 52 Z" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="1.5" />
    <circle cx="60" cy="78" r="9" fill="#334155" />
    <circle cx="100" cy="78" r="9" fill="#334155" />
    <PriceTag x={46} y={100} text="289 Ft" />
    {/* labda */}
    <circle cx="180" cy="58" r="24" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" />
    <path d="M 156 58 Q 180 40 204 58" fill="none" stroke="#fff" strokeWidth="3" />
    <path d="M 156 58 Q 180 76 204 58" fill="none" stroke="#fff" strokeWidth="3" />
    <PriceTag x={150} y={100} text="345 Ft" />
    {/* radír */}
    <rect x="252" y="48" width="64" height="26" rx="4" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
    <rect x="252" y="48" width="24" height="26" rx="4" fill="#fbcfe8" stroke="#1e3a8a" strokeWidth="1.5" />
    <PriceTag x={254} y={100} text="108 Ft" />
  </svg>
);
