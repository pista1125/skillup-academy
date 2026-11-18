// „Az egy” – a mese és a játék képei.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';

const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 80} ${w / 2} ${h - 55} T${w} ${h - 60} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** 1. oldal: Pötyi a Számkert kapujában. */
export const GardenGateScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <rect x="300" y="70" width="12" height="150" fill="#92400e" />
    <rect x="420" y="70" width="12" height="150" fill="#92400e" />
    <path d="M296 70 Q366 20 436 70" fill="none" stroke="#92400e" strokeWidth="10" />
    <text x="366" y="104" textAnchor="middle" fontSize="20" fontWeight="900" fill="#7c2d12" fontFamily="system-ui, sans-serif">Számkert</text>
    {ICONS.virag({ x: 330, y: 220, s: 0.8 })}
    {ICONS.virag({ x: 400, y: 226, s: 0.8, color: '#a855f7' })}
    <Potyi mood="cheer" dots={7} x={40} y={50} size={200} />
  </svg>
);

/** Égbolt egyetlen nappal (vagy n nappal a kvízhez). */
export const SunSkyScene: React.FC<{ suns?: number }> = ({ suns = 1 }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {Array.from({ length: suns }, (_, i) => {
      const cx = 240 + (i - (suns - 1) / 2) * 120;
      return (
        <g key={i}>
          {Array.from({ length: 8 }, (_, k) => (
            <path key={k} d={`M${cx} 46 V26`} stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" transform={`rotate(${k * 45} ${cx} 90)`} />
          ))}
          <circle cx={cx} cy="90" r="38" fill="#facc15" stroke="#d97706" strokeWidth="5" />
          <circle cx={cx - 12} cy="84" r="4" fill="#78350f" />
          <circle cx={cx + 12} cy="84" r="4" fill="#78350f" />
          <path d={`M${cx - 14} 100 Q${cx} 112 ${cx + 14} 100`} stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    })}
  </svg>
);

/** Almafa n almával. */
export const AppleTreeScene: React.FC<{ apples?: number }> = ({ apples = 1 }) => {
  const spots: [number, number][] = [
    [240, 80],
    [190, 110],
    [290, 112],
    [215, 60],
    [268, 60],
  ];
  return (
    <svg viewBox="0 0 480 260">
      {sky(480, 260)}
      <rect x="226" y="140" width="28" height="100" rx="8" fill="#92400e" />
      <circle cx="240" cy="96" r="84" fill="#22c55e" stroke="#15803d" strokeWidth="5" />
      {spots.slice(0, apples).map(([x, y], i) => ICONS.alma({ x, y, s: 1.1, key: i }))}
    </svg>
  );
};

/** Csoportok kerettel: melyik csoportban van egy? */
export const GroupBox: React.FC<{ icon: IconName; n: number; color?: string; className?: string }> = ({ icon, n, color, className = 'w-28 h-24' }) => {
  const pos: Record<number, [number, number][]> = {
    1: [[60, 50]],
    2: [[38, 50], [82, 50]],
    3: [[30, 34], [90, 34], [60, 70]],
    4: [[36, 32], [84, 32], [36, 72], [84, 72]],
    5: [[30, 30], [90, 30], [60, 52], [30, 76], [90, 76]],
  };
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {(pos[n] || []).map(([x, y], i) => ICONS[icon]({ x, y, s: n === 1 ? 1.2 : 0.85, color, key: i }))}
    </svg>
  );
};

/** Arc: egy orr, egy száj, két szem (a „miből van egy?” beszélgetéshez). */
export const FaceScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
    <circle cx="240" cy="120" r="92" fill="#fcd9b6" stroke="#9a3412" strokeWidth="5" />
    <path d="M160 92 Q240 10 320 92" fill="#7c2d12" />
    <circle cx="205" cy="112" r="10" fill="#1f2937" />
    <circle cx="275" cy="112" r="10" fill="#1f2937" />
    <path d="M240 122 L230 150 H250" fill="none" stroke="#9a3412" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M210 172 Q240 196 270 172" fill="none" stroke="#be123c" strokeWidth="7" strokeLinecap="round" />
    <circle cx="240" cy="140" r="34" fill="none" stroke="#7c3aed" strokeWidth="5" strokeDasharray="8 6" />
  </svg>
);

/** Kártya-ikon (párosítóhoz, válogatóhoz): n darab tárgy kis keretben. */
export const MiniGroup: React.FC<{ icon: IconName; n: number; color?: string }> = ({ icon, n, color }) => <GroupBox icon={icon} n={n} color={color} className="w-24 h-20" />;
