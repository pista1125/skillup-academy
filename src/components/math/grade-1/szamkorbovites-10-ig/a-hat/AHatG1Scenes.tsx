// „A hat” – a mese és a játék képei (a III. fejezet 0–6-os leckéi – Számolás 0-tól 6-ig, Páros és páratlan, Megálló – is innen veszik a dobozokat).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { Hand, ICONS, IconName } from '../../shared/G1Pics';
import { sky } from '../../szamolas-5-ig/a-ketto/AKettoG1Scenes';

export { sky };

const DICE: Record<number, [number, number][]> = {
  0: [],
  1: [[60, 50]],
  2: [[38, 50], [82, 50]],
  3: [[30, 34], [90, 34], [60, 70]],
  4: [[36, 32], [84, 32], [36, 72], [84, 72]],
  5: [[30, 30], [90, 30], [60, 52], [30, 76], [90, 76]],
  6: [[24, 32], [60, 32], [96, 32], [24, 72], [60, 72], [96, 72]],
};
const GRID = DICE[6];

/**
 * Keretes doboz 0–6 tárggyal. Ha `n2` > 0, az első `n` tárgy után `n2` másik (`icon2` / `color2`) jön, sorban (3 + 3 hely).
 * `crossed`: az utolsó ennyi tárgy áthúzva.
 */
export const Box6: React.FC<{ icon: IconName; n: number; icon2?: IconName; n2?: number; color?: string; color2?: string; crossed?: number; className?: string }> = ({
  icon,
  n,
  icon2,
  n2 = 0,
  color,
  color2,
  crossed = 0,
  className = 'w-28 h-24',
}) => {
  const total = Math.max(0, Math.min(6, n + n2));
  const pos = n2 > 0 ? GRID.slice(0, total) : DICE[total] || [];
  const s = total === 1 ? 1.2 : total >= 5 ? 0.72 : 0.85;
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {pos.map(([x, y], i) => {
        const second = i >= n;
        const isX = i >= total - crossed;
        return (
          <g key={i} opacity={isX ? 0.45 : 1}>
            {ICONS[second ? icon2 ?? icon : icon]({ x, y, s, color: second ? color2 : color })}
            {isX && <path d={`M${x - 16} ${y - 16} L${x + 16} ${y + 16}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
};

/** Kis kártya (párosító, válogató). */
export const Mini6: React.FC<{ icon: IconName; n: number; icon2?: IconName; n2?: number; color?: string; color2?: string; crossed?: number }> = (p) => <Box6 {...p} className="w-24 h-20" />;

/** Korongos doboz: `a` piros és `b` kék korong (bontáshoz). */
export const Disks: React.FC<{ a: number; b: number; className?: string }> = ({ a, b, className }) => (
  <Box6 icon="korong" n={a} n2={b} color="#ef4444" color2="#3b82f6" className={className ?? 'w-24 h-20'} />
);

/** Ujjkép 0–6: hatnál két kéz (5 + 1). */
export const Fingers: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-28 h-24' }) =>
  n <= 5 ? (
    <Hand fingers={n} className={className} />
  ) : (
    <svg viewBox="0 0 210 110" className={className}>
      <svg x="0" y="0" width="100" height="110" viewBox="0 0 100 110">
        <Hand fingers={5} className="" />
      </svg>
      <svg x="110" y="0" width="100" height="110" viewBox="0 0 100 110">
        <Hand fingers={n - 5} className="" />
      </svg>
    </svg>
  );

/** Két doboz, középen „?” (melyik jel kell?) – vagy `noSign` esetén üres köz (mennyivel több?). */
export const Compare6: React.FC<{ icon: IconName; a: number; b: number; iconB?: IconName; noSign?: boolean }> = ({ icon, a, b, iconB, noSign }) => (
  <svg viewBox="0 0 320 110">
    <svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100">
      <Box6 icon={icon} n={a} className="" />
    </svg>
    {!noSign && (
      <text x="160" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
        ?
      </text>
    )}
    <svg x="200" y="5" width="120" height="100" viewBox="0 0 120 100">
      <Box6 icon={iconB ?? icon} n={b} className="" />
    </svg>
  </svg>
);

/** Nagy levél „?”-lel: alatta rejtőznek a tárgyak. */
export const HideLeaf: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-46 10 C-40 -40 30 -50 50 -20 C40 30 -10 44 -46 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="5" />
    <path d="M-40 6 Q0 -6 44 -18" fill="none" stroke="#15803d" strokeWidth="3" />
    <text x="2" y="12" textAnchor="middle" fontSize="40" fontWeight="900" fill="#fff" stroke="#581c87" strokeWidth="2" fontFamily="system-ui, sans-serif">
      ?
    </text>
  </g>
);

/**
 * Kerti sor: `n` tárgy, utána `n2` másik (gyűrűvel kiemelve, ha `ringSecond`), a végén opcionálisan egy rejtő levél „?”-lel.
 * `tag`: nagy szám a jobb felső sarokban (pl. „6” – ennyinek kell lennie).
 */
export const RowScene: React.FC<{ icon: IconName; n: number; icon2?: IconName; n2?: number; color?: string; color2?: string; ringSecond?: boolean; hidden?: boolean; tag?: string; crossed?: number }> = ({
  icon,
  n,
  icon2,
  n2 = 0,
  color,
  color2,
  ringSecond = false,
  hidden = false,
  tag,
  crossed = 0,
}) => {
  const items = n + n2;
  const slots = items + (hidden ? 1 : 0);
  const step = slots > 5 ? 70 : 84;
  const X = (i: number) => 240 + (i - (slots - 1) / 2) * step;
  return (
    <svg viewBox="0 0 480 240">
      {sky(480, 240)}
      {tag && (
        <g>
          <rect x="398" y="12" width="70" height="70" rx="16" fill="#fff" stroke="#7c3aed" strokeWidth="4" />
          <text x="433" y="64" textAnchor="middle" fontSize="48" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
            {tag}
          </text>
        </g>
      )}
      {Array.from({ length: items }, (_, i) => {
        const second = i >= n;
        const isX = i >= items - crossed;
        return (
          <g key={i} opacity={isX ? 0.45 : 1}>
            {second && ringSecond && <circle cx={X(i)} cy="168" r="34" fill="#fef9c3" stroke="#f59e0b" strokeWidth="4" strokeDasharray="7 5" />}
            {ICONS[second ? icon2 ?? icon : icon]({ x: X(i), y: 168, s: 1.4, color: second ? color2 : color })}
            {isX && <path d={`M${X(i) - 24} 144 L${X(i) + 24} 192`} stroke="#111827" strokeWidth="6" strokeLinecap="round" />}
          </g>
        );
      })}
      {hidden && <HideLeaf x={X(slots - 1)} y={168} s={0.9} />}
    </svg>
  );
};

/** 1. oldal: Pötyi hátán ma hat pötty ragyog; Zümi és Csigusz csodálkozik. */
export const SixMorningScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <circle cx="420" cy="50" r="28" fill="#facc15" stroke="#d97706" strokeWidth="4" />
    <Potyi mood="cheer" dots={6} x={130} y={36} size={210} />
    {ICONS.meh({ x: 70, y: 80, s: 2 })}
    {ICONS.csiga({ x: 410, y: 214, s: 2.2 })}
  </svg>
);

/** Pötyi nagyban, jól látszik a hat lába. */
export const LegsScene: React.FC<{ dots?: number }> = ({ dots = 6 }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef9c3" />
    <Potyi mood="happy" dots={dots} x={130} y={10} size={220} />
  </svg>
);

/** Pötyi a pöttyeivel (a kvízhez: hány pötty van a hátán?). */
export const PotyiDotsScene: React.FC<{ dots: number; mood?: 'happy' | 'wow' | 'think' | 'cheer' }> = ({ dots, mood = 'happy' }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#ffe4e6" />
    <Potyi mood={mood} dots={dots} x={140} y={10} size={210} />
  </svg>
);

/** Ujjkép és dominó egymás mellett (meseoldal). */
export const FingersDominoScene: React.FC<{ n: number }> = ({ n }) => {
  const P: Record<number, [number, number][]> = {
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  return (
    <svg viewBox="0 0 480 170">
      <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
      <svg x="20" y="25" width="240" height="126" viewBox="0 0 210 110">
        <Fingers n={n} className="" />
      </svg>
      <rect x="320" y="35" width="110" height="100" rx="14" fill="#fff" stroke="#111827" strokeWidth="5" />
      {(P[n] || []).map(([a, b], i) => (
        <circle key={i} cx={375 + a * 26} cy={85 + b * 28} r="11" fill="#111827" />
      ))}
    </svg>
  );
};

/** A hat bontásai korongsorokkal: soronként `a` piros és `b` kék korong, mellette a felirat (pl. „5 + 1”). */
export const SplitsScene: React.FC<{ rows: [number, number][]; showLabels?: boolean }> = ({ rows, showLabels = true }) => {
  const h = rows.length * 62 + 20;
  return (
    <svg viewBox={`0 0 480 ${h}`}>
      <rect x="0" y="0" width="480" height={h} rx="18" fill="#f0f9ff" />
      {rows.map(([a, b], r) => {
        const y = 41 + r * 62;
        return (
          <g key={r}>
            {Array.from({ length: a + b }, (_, i) => (
              <circle key={i} cx={40 + i * 44} cy={y} r="18" fill={i < a ? '#ef4444' : '#3b82f6'} stroke="#111827" strokeWidth="3" />
            ))}
            {showLabels && (
              <text x="300" y={y + 10} fontSize="28" fontWeight="900" fill="#1f2937" fontFamily="system-ui, sans-serif">
                {`6 = ${a} + ${b}`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Két szám / jel kártya egy sorban (pl. „6 ? 4”). */
export const SignRow: React.FC<{ items: (string | number)[] }> = ({ items }) => {
  const w = items.length * 90 + 20;
  return (
    <svg viewBox={`0 0 ${w} 110`} className="w-full max-w-[420px] h-auto mx-auto">
      {items.map((t, i) => {
        const x = 20 + i * 90;
        const q = t === '?' || t === '□';
        return (
          <g key={i}>
            <rect x={x} y="15" width="70" height="80" rx="14" fill={q ? '#f5f3ff' : '#fff'} stroke={q ? '#7c3aed' : '#94a3b8'} strokeWidth="4" />
            <text x={x + 35} y="72" textAnchor="middle" fontSize="44" fontWeight="900" fill={q ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">
              {t}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
