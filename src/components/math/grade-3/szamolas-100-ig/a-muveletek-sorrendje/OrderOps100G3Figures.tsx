import React from 'react';

type FigProps = { className?: string };

const FONT = 'system-ui, Segoe UI, sans-serif';

/** Vonat: csak összeadás és kivonás – balról jobbra. 25 + 16 − 9 + 12 = 44 */
export const TrainChainSvg: React.FC<FigProps> = ({ className }) => {
  const cars = [
    { v: '25', c: '#38bdf8' },
    { v: '41', c: '#f87171' },
    { v: '32', c: '#4ade80' },
    { v: '44', c: '#c084fc' }
  ];
  const ops = ['+ 16', '− 9', '+ 12'];
  return (
    <svg viewBox="0 0 520 190" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="10" y1="118" x2="510" y2="118" stroke="#94a3b8" strokeWidth="3" />
      {cars.map((car, i) => {
        const x = 20 + i * 128;
        return (
          <g key={i}>
            <rect x={x} y="50" width="80" height="56" rx="8" fill={car.c} stroke="#1e293b" strokeWidth="2" />
            <rect x={x + 14} y="62" width="52" height="32" rx="6" fill="#fff" stroke="#1e293b" />
            <text x={x + 40} y="85" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{car.v}</text>
            <circle cx={x + 18} cy="110" r="8" fill="#334155" />
            <circle cx={x + 62} cy="110" r="8" fill="#334155" />
          </g>
        );
      })}
      {ops.map((o, i) => {
        const x = 100 + i * 128;
        return (
          <g key={o}>
            <line x1={x} y1="78" x2={x + 48} y2="78" stroke="#dc2626" strokeWidth="2.5" />
            <polygon points={`${x + 48},78 ${x + 40},73 ${x + 40},83`} fill="#dc2626" />
            <text x={x + 24} y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">{o}</text>
          </g>
        );
      })}
      <line x1="60" y1="150" x2="460" y2="150" stroke="#7c3aed" strokeWidth="2" />
      <polygon points="460,150 450,145 450,155" fill="#7c3aed" />
      <text x="260" y="176" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#5b21b6">25 + 16 − 9 + 12 = 44</text>
      <text x="260" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">balról jobbra haladunk</text>
    </svg>
  );
};

/** Békaugrás tavirózsákon: csak szorzás és osztás – balról jobbra. 6 · 4 : 3 · 5 = 40 */
export const FrogChainSvg: React.FC<FigProps> = ({ className }) => {
  const pads = ['6', '24', '8', '40'];
  const ops = ['· 4', ': 3', '· 5'];
  return (
    <svg viewBox="0 0 520 180" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="178" rx="16" fill="#e0f2fe" stroke="#7dd3fc" />
      {pads.map((p, i) => {
        const cx = 60 + i * 133;
        return (
          <g key={i}>
            <ellipse cx={cx} cy="100" rx="42" ry="22" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
            <path d={`M ${cx + 22} 100 L ${cx + 42} 93 L ${cx + 42} 107 Z`} fill="#e0f2fe" />
            <text x={cx - 4} y="107" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">{p}</text>
          </g>
        );
      })}
      {ops.map((o, i) => {
        const x0 = 80 + i * 133;
        const x1 = x0 + 93;
        return (
          <g key={o}>
            <path d={`M ${x0} 76 Q ${(x0 + x1) / 2} 26 ${x1} 76`} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4" />
            <polygon points={`${x1},76 ${x1 - 3},64 ${x1 - 11},70`} fill="#7c3aed" />
            <text x={(x0 + x1) / 2} y="44" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#5b21b6">{o}</text>
          </g>
        );
      })}
      <text x="260" y="160" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">6 · 4 : 3 · 5 = 40</text>
    </svg>
  );
};

/** A szabály plakátja. */
export const OrderRuleSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 480 182" className={className ?? 'w-full max-w-lg h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="478" height="180" rx="16" fill="#fff7ed" stroke="#fdba74" />
    <rect x="20" y="20" width="440" height="66" rx="12" fill="#fb923c" />
    <circle cx="56" cy="53" r="22" fill="#fff" />
    <text x="56" y="61" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#c2410c">1.</text>
    <text x="96" y="50" fontSize="18" fontWeight="bold" fill="#fff">Először:  szorzás ·  és  osztás :</text>
    <text x="96" y="74" fontSize="13" fill="#fff">balról jobbra, ahogy következnek</text>
    <rect x="20" y="100" width="440" height="66" rx="12" fill="#38bdf8" />
    <circle cx="56" cy="133" r="22" fill="#fff" />
    <text x="56" y="141" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0369a1">2.</text>
    <text x="96" y="130" fontSize="18" fontWeight="bold" fill="#fff">Utána:  összeadás +  és  kivonás −</text>
    <text x="96" y="154" fontSize="13" fill="#fff">balról jobbra, ahogy következnek</text>
  </svg>
);

/** Sorszámok a műveletek fölött: 30 − 4 · 6 */
export const OrderBubblesSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 440 200" className={className ?? 'w-full max-w-md h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="438" height="198" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    {/* buborékok */}
    <circle cx="180" cy="34" r="17" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="180" y="40" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">2.</text>
    <circle cx="256" cy="34" r="17" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
    <text x="256" y="40" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">1.</text>
    {[
      { t: '30', x: 140 },
      { t: '−', x: 180 },
      { t: '4', x: 220 },
      { t: '·', x: 256 },
      { t: '6', x: 292 }
    ].map((k) => (
      <text key={k.x} x={k.x} y="88" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#0f172a">{k.t}</text>
    ))}
    <rect x="202" y="58" width="108" height="40" rx="10" fill="none" stroke="#ea580c" strokeWidth="2.5" />
    <text x="220" y="134" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#c2410c">30 − 24</text>
    <text x="220" y="176" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0369a1">= 6</text>
    <text x="370" y="134" fontSize="12" fill="#c2410c">4 · 6 = 24</text>
    <text x="370" y="174" fontSize="12" fill="#0369a1">30 − 24 = 6</text>
  </svg>
);

/** Csapda: 10 + 2 · 5 */
export const OrderTrapSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 480 190" className={className ?? 'w-full max-w-lg h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="478" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="240" y="40" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#0f172a">10 + 2 · 5 = ?</text>
    <rect x="20" y="62" width="208" height="110" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
    <text x="124" y="90" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">Rossz sorrend</text>
    <text x="124" y="120" textAnchor="middle" fontSize="18" fill="#7f1d1d">10 + 2 = 12</text>
    <text x="124" y="148" textAnchor="middle" fontSize="18" fill="#7f1d1d">12 · 5 = 60</text>
    <line x1="60" y1="160" x2="190" y2="74" stroke="#ef4444" strokeWidth="3" opacity="0.6" />
    <rect x="252" y="62" width="208" height="110" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
    <text x="356" y="90" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">Jó sorrend</text>
    <text x="356" y="120" textAnchor="middle" fontSize="18" fill="#14532d">2 · 5 = 10</text>
    <text x="356" y="148" textAnchor="middle" fontSize="18" fill="#14532d">10 + 10 = 20</text>
  </svg>
);

/** Történet: 3 zacskóban 6-6 alma, és még 4 alma. 3 · 6 + 4 = 22 */
export const BagsStorySvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 480 190" className={className ?? 'w-full max-w-lg h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="478" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    {[0, 1, 2].map((b) => {
      const x = 24 + b * 108;
      return (
        <g key={b}>
          <path d={`M ${x} 40 L ${x + 92} 40 L ${x + 84} 130 L ${x + 8} 130 Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
          {Array.from({ length: 6 }, (_, j) => (
            <circle key={j} cx={x + 24 + (j % 3) * 22} cy={68 + Math.floor(j / 3) * 30} r="10" fill="#ef4444" stroke="#7f1d1d" />
          ))}
        </g>
      );
    })}
    {Array.from({ length: 4 }, (_, j) => (
      <circle key={j} cx={366 + (j % 2) * 26} cy={70 + Math.floor(j / 2) * 30} r="10" fill="#22c55e" stroke="#14532d" />
    ))}
    <text x="380" y="140" textAnchor="middle" fontSize="12" fill="#475569">még 4 alma</text>
    <text x="240" y="172" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">3 · 6 + 4 = 18 + 4 = 22</text>
  </svg>
);
