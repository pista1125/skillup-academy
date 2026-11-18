import React from 'react';
import { ADD10_FONT, BeadString10G, DiscGroupSvg, TenFrameG } from './Add10G2Parts';

// ---------------------------------------------------------------------------
// 2. Összeadás 10-es számkör – elméleti ábrák (2. osztály)
// ---------------------------------------------------------------------------

/** Két csoport egyesítése: 4 + 5 = 9, tag + tag = összeg. */
export const JoiningGroupsSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto',
}) => (
  <svg viewBox="0 0 340 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD10_FONT}>
    <rect x="1" y="1" width="338" height="163" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <rect x="20" y="18" width="124" height="58" rx="10" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5" />
    {Array.from({ length: 4 }, (_, i) => (
      <circle key={`r-${i}`} cx={43 + i * 26} cy={47} r={9} fill="#ef4444" stroke="#991b1b" strokeWidth="1.6" />
    ))}
    <text x="170" y="54" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">+</text>
    <rect x="196" y="18" width="128" height="58" rx="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
    {Array.from({ length: 5 }, (_, i) => (
      <circle key={`b-${i}`} cx={216 + i * 22} cy={47} r={8.5} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.6" />
    ))}
    <text x="82" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">4 (tag)</text>
    <text x="170" y="96" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">+</text>
    <text x="260" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">5 (tag)</text>
    <rect x="52" y="112" width="236" height="36" rx="10" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
    <text x="170" y="135" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#14532d">
      4 + 5 = 9 (összeg)
    </text>
  </svg>
);

/** A tagok felcserélhetősége (2 + 7 = 7 + 2 = 9) és a 0 hozzáadása (6 + 0 = 6). */
export const CommutativeAndZeroSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto',
}) => (
  <svg viewBox="0 0 340 185" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD10_FONT}>
    <rect x="1" y="1" width="338" height="183" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="170" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">
      A tagok sorrendje felcserélhető:
    </text>
    <DiscGroupSvg a={2} b={7} cx={136} cy={47} r={7.5} gap={19} />
    <text x="284" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">2 + 7 = 9</text>
    <DiscGroupSvg a={7} b={2} cx={136} cy={83} r={7.5} gap={19} colorA="#3b82f6" strokeA="#1e3a8a" colorB="#ef4444" strokeB="#991b1b" />
    <text x="284" y="88" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">7 + 2 = 9</text>
    <line x1="20" y1="108" x2="320" y2="108" stroke="#bae6fd" strokeWidth="1.5" />
    <text x="170" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">
      Ha 0-t adunk hozzá, a szám nem változik:
    </text>
    <DiscGroupSvg a={6} b={0} cx={126} cy={156} r={8} gap={20} colorA="#f97316" strokeA="#9a3412" />
    <text x="272" y="161" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">6 + 0 = 6</text>
  </svg>
);

/** A 10 bontása 10-es gyöngysoron: 3 + 7 = 10. */
export const TenBeadStringSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto',
}) => (
  <svg viewBox="0 0 340 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD10_FONT}>
    <rect x="1" y="1" width="338" height="163" rx="14" fill="#fefce8" stroke="#fde68a" />
    <text x="170" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">
      10 gyöngy egy soron: 3 zöld + 7 sárga = 10
    </text>
    <BeadString10G a={3} b={7} x0={44} y={62} step={28} r={11} />
    <path d="M 33 82 L 33 88 L 111 88 L 111 82" fill="none" stroke="#15803d" strokeWidth="1.8" />
    <text x="72" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">3</text>
    <path d="M 118 82 L 118 88 L 307 88 L 307 82" fill="none" stroke="#b45309" strokeWidth="1.8" />
    <text x="212" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">7</text>
    <rect x="38" y="120" width="264" height="30" rx="8" fill="#fef3c7" stroke="#fcd34d" />
    <text x="170" y="140" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#78350f">
      3 + 7 = 10   és   7 + 3 = 10
    </text>
  </svg>
);

/** Számház a 10 bontásához és a pótláshoz. */
export const TenBondHouseSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-sm h-auto mx-auto',
}) => {
  const rows: [string, string, boolean][] = [
    ['1', '9', false],
    ['2', '8', false],
    ['3', '?', true],
    ['4', '6', false],
    ['5', '5', false],
  ];
  return (
    <svg viewBox="0 0 300 225" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD10_FONT}>
      <rect x="1" y="1" width="298" height="223" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <polygon points="150,14 64,62 236,62" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      <text x="150" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ffffff">10</text>
      {rows.map(([left, right, isQ], i) => {
        const y = 64 + i * 28;
        return (
          <g key={i}>
            <rect x="76" y={y} width="74" height="28" fill="#ffffff" stroke="#fb923c" strokeWidth="1.5" />
            <rect x="150" y={y} width="74" height="28" fill={isQ ? '#fee2e2' : '#ffedd5'} stroke="#fb923c" strokeWidth="1.5" />
            <text x="113" y={y + 19} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">{left}</text>
            <text
              x="187"
              y={y + 19}
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
              fill={isQ ? '#dc2626' : '#1e293b'}
            >
              {right}
            </text>
          </g>
        );
      })}
      <text x="150" y="216" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
        Minden emelet összege 10! (3 + 7 = 10)
      </text>
    </svg>
  );
};

/** Előre ugrás a 0–10-es számegyenesen: 3 + 5 = 8. */
export const JumpNumberLine10Svg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-lg h-auto mx-auto',
}) => {
  const x0 = 26;
  const step = 28;
  const x = (v: number) => x0 + v * step;
  const y = 94;
  return (
    <svg viewBox="0 0 340 148" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD10_FONT}>
      <rect x="1" y="1" width="338" height="146" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        Indulj a 3-ról, és ugorj 5-öt jobbra: 3 + 5 = 8
      </text>
      <line x1={x(0) - 8} y1={y} x2={x(10) + 12} y2={y} stroke="#334155" strokeWidth="2.2" />
      <path d={`M ${x(10) + 12} ${y - 5} L ${x(10) + 20} ${y} L ${x(10) + 12} ${y + 5} Z`} fill="#334155" />
      {Array.from({ length: 11 }, (_, v) => (
        <g key={v}>
          <line
            x1={x(v)}
            y1={v % 5 === 0 ? y - 9 : y - 6}
            x2={x(v)}
            y2={v % 5 === 0 ? y + 9 : y + 6}
            stroke="#334155"
            strokeWidth={v % 5 === 0 ? 2 : 1.3}
          />
          <text
            x={x(v)}
            y={y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight={v === 3 || v === 8 || v % 5 === 0 ? 'bold' : 'normal'}
            fill={v === 3 ? '#2563eb' : v === 8 ? '#15803d' : '#334155'}
          >
            {v}
          </text>
        </g>
      ))}
      <circle cx={x(3)} cy={y} r="5" fill="#2563eb" />
      <path d={`M ${x(3)} ${y - 8} Q ${x(5.5)} 34 ${x(8) - 2} ${y - 12}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />
      <path d={`M ${x(8) - 8} ${y - 17} L ${x(8) - 1} ${y - 9} L ${x(8) + 4} ${y - 18}`} fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x={x(5.5)} y="48" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">+ 5</text>
      <circle cx={x(8)} cy={y} r="5.5" fill="#16a34a" />
    </svg>
  );
};

/** Kifejezések összehasonlítása (2 + 3 + 4 > 4 + 4) és tízes keret. */
export const ComparisonCardSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto',
}) => (
  <svg viewBox="0 0 340 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD10_FONT}>
    <rect x="1" y="1" width="338" height="163" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
    <text x="170" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#701a75">
      Előbb számold ki mindkét oldalt, aztán hasonlíts!
    </text>
    <rect x="20" y="38" width="124" height="72" rx="10" fill="#ffffff" stroke="#c084fc" strokeWidth="1.8" />
    <text x="82" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">2 + 3 + 4</text>
    <text x="82" y="94" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#7e22ce">= 9</text>
    <circle cx="170" cy="74" r="18" fill="#fae8ff" stroke="#a855f7" strokeWidth="2" />
    <text x="170" y="81" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#6b21a8">&gt;</text>
    <rect x="196" y="38" width="124" height="72" rx="10" fill="#ffffff" stroke="#c084fc" strokeWidth="1.8" />
    <text x="258" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">4 + 4</text>
    <text x="258" y="94" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#7e22ce">= 8</text>
    <TenFrameG a={5} b={4} x={108} y={118} cell={20} />
    <text x="242" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">9 &gt; 8</text>
  </svg>
);
