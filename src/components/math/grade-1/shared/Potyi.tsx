// Pötyi, a katica – az 1. osztályos mesék főszereplője.
// A hátán lévő pöttyök mutatják a számokat: bal szárnyon 5, jobb szárnyon 5 hely (mint egy tízes keret).
import React from 'react';

export type PotyiMood = 'happy' | 'wow' | 'think' | 'sad' | 'cheer' | 'sleep';

export interface PotyiProps {
  /** Hány pötty legyen a hátán (0–10). Alapból 7, mert Pötyi 7 pöttyös. */
  dots?: number;
  mood?: PotyiMood;
  className?: string;
  /** Pöttyök színe (alap: fekete). */
  dotColor?: string;
  /** Számjegy a pöttyök helyett (pl. 15) – nagy fehér körben a hátán. */
  number?: number | string;
  title?: string;
  /** Beágyazáshoz egy másik SVG-be: <Potyi x={40} y={60} size={180} className="" /> */
  x?: number;
  y?: number;
  size?: number;
}

const LEFT: [number, number][] = [
  [72, 96],
  [52, 116],
  [76, 128],
  [54, 148],
  [78, 160],
];
const RIGHT: [number, number][] = LEFT.map(([x, y]) => [200 - x, y]);

export const Potyi: React.FC<PotyiProps> = ({ dots = 7, mood = 'happy', className = 'w-28 h-28', dotColor = '#111827', number, title = 'Pötyi, a katica', x, y, size }) => {
  const n = Math.max(0, Math.min(10, Math.round(dots)));
  const spots = [...LEFT, ...RIGHT].slice(0, n);
  const eyeY = mood === 'think' ? 46 : 50;
  return (
    <svg viewBox="0 0 200 200" className={size ? undefined : className} x={x} y={y} width={size} height={size} role="img" aria-label={title}>
      {/* lábak */}
      <g stroke="#111827" strokeWidth="6" strokeLinecap="round">
        <path d="M40 110 L18 100" />
        <path d="M36 135 L14 140" />
        <path d="M44 160 L24 178" />
        <path d="M160 110 L182 100" />
        <path d="M164 135 L186 140" />
        <path d="M156 160 L176 178" />
      </g>
      {/* csápok */}
      <g stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d={mood === 'cheer' ? 'M86 30 Q74 10 62 6' : 'M88 30 Q80 14 66 12'} />
        <path d={mood === 'cheer' ? 'M114 30 Q126 10 138 6' : 'M112 30 Q120 14 134 12'} />
      </g>
      <circle cx={mood === 'cheer' ? 62 : 66} cy={mood === 'cheer' ? 6 : 12} r="7" fill="#111827" />
      <circle cx={mood === 'cheer' ? 138 : 134} cy={mood === 'cheer' ? 6 : 12} r="7" fill="#111827" />
      {/* test */}
      <ellipse cx="100" cy="128" rx="66" ry="62" fill="#ef4444" stroke="#991b1b" strokeWidth="5" />
      <path d="M100 70 L100 189" stroke="#991b1b" strokeWidth="5" />
      <ellipse cx="72" cy="104" rx="16" ry="9" fill="#fff" opacity="0.35" transform="rotate(-30 72 104)" />
      {/* pöttyök vagy szám */}
      {number !== undefined ? (
        <g>
          <circle cx="100" cy="136" r="34" fill="#fff" stroke="#991b1b" strokeWidth="4" />
          <text x="100" y="150" textAnchor="middle" fontSize={String(number).length > 1 ? 38 : 44} fontWeight="900" fill="#111827" fontFamily="system-ui, sans-serif">
            {number}
          </text>
        </g>
      ) : (
        spots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill={dotColor} />)
      )}
      {/* fej */}
      <path d="M62 66 A38 36 0 0 1 138 66 Q100 84 62 66 Z" fill="#111827" />
      <circle cx="100" cy="56" r="34" fill="#111827" />
      {/* szemek */}
      {mood === 'sleep' ? (
        <g stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M80 52 Q87 58 94 52" />
          <path d="M106 52 Q113 58 120 52" />
        </g>
      ) : (
        <g>
          <circle cx="87" cy={eyeY} r={mood === 'wow' ? 11 : 10} fill="#fff" />
          <circle cx="113" cy={eyeY} r={mood === 'wow' ? 11 : 10} fill="#fff" />
          <circle cx={mood === 'think' ? 90 : 88} cy={mood === 'think' ? eyeY - 3 : eyeY + 1} r="5" fill="#111827" />
          <circle cx={mood === 'think' ? 116 : 114} cy={mood === 'think' ? eyeY - 3 : eyeY + 1} r="5" fill="#111827" />
          <circle cx="90" cy={eyeY - 3} r="1.8" fill="#fff" />
          <circle cx="116" cy={eyeY - 3} r="1.8" fill="#fff" />
        </g>
      )}
      {mood === 'sad' && (
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <path d="M78 36 L94 40" />
          <path d="M122 36 L106 40" />
        </g>
      )}
      {/* pofi */}
      <circle cx="74" cy="66" r="6" fill="#f472b6" opacity="0.8" />
      <circle cx="126" cy="66" r="6" fill="#f472b6" opacity="0.8" />
      {/* száj */}
      {mood === 'wow' ? (
        <ellipse cx="100" cy="72" rx="6" ry="7" fill="#fff" />
      ) : mood === 'sad' ? (
        <path d="M90 76 Q100 68 110 76" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : mood === 'think' ? (
        <path d="M92 73 L108 71" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d={mood === 'cheer' ? 'M86 66 Q100 84 114 66 Z' : 'M88 68 Q100 80 112 68'} stroke="#fff" strokeWidth="4" fill={mood === 'cheer' ? '#fff' : 'none'} strokeLinecap="round" />
      )}
      {mood === 'cheer' && (
        <g fill="#facc15">
          <path d="M22 40 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 z" />
          <path d="M172 34 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1 z" />
        </g>
      )}
      {mood === 'think' && (
        <text x="160" y="40" fontSize="34" fontWeight="900" fill="#6366f1" fontFamily="system-ui, sans-serif">
          ?
        </text>
      )}
      {mood === 'sleep' && (
        <text x="150" y="36" fontSize="24" fontWeight="900" fill="#6366f1" fontFamily="system-ui, sans-serif">
          z z
        </text>
      )}
    </svg>
  );
};

export default Potyi;
