// „Megálló” (8) – a szánkós kamra kulcsainak képei (a téli alapképek az a-nyolc leckéből jönnek).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { snow } from '../a-nyolc/ANyolcG1Scenes';

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ec4899'];

/** Egy kulcs számos címkével (cx, cy = a címke közepe). */
export const KeyPic: React.FC<{ n: number | string; cx: number; cy: number; color?: string; crossed?: boolean; open?: boolean }> = ({ n, cx, cy, color = '#ef4444', crossed = false, open = false }) => (
  <g opacity={crossed ? 0.4 : 1}>
    <path d={`M${cx} ${cy + 30} V${cy + 100} M${cx} ${cy + 78} H${cx + 16} M${cx} ${cy + 92} H${cx + 12}`} stroke="#6b7280" strokeWidth="8" strokeLinecap="round" />
    <circle cx={cx} cy={cy + 30} r="9" fill="none" stroke="#6b7280" strokeWidth="5" />
    <rect x={cx - 30} y={cy - 30} width="60" height="56" rx="16" fill={color} stroke="#111827" strokeWidth="3" />
    <circle cx={cx} cy={cy - 2} r="21" fill="#fff" />
    <text x={cx} y={cy + 10} textAnchor="middle" fontSize="32" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">{n}</text>
    {crossed && <path d={`M${cx - 34} ${cy - 34} L${cx + 34} ${cy + 100} M${cx + 34} ${cy - 34} L${cx - 34} ${cy + 100}`} stroke="#111827" strokeWidth="6" strokeLinecap="round" />}
    {open && <circle cx={cx} cy={cy + 30} r="66" fill="none" stroke="#16a34a" strokeWidth="6" />}
  </g>
);

/** Kulcssor: a `crossed` számokat áthúzzuk. */
export const KeysScene: React.FC<{ nums: number[]; crossed?: number[]; open?: number; friends?: boolean }> = ({ nums, crossed = [], open, friends = false }) => {
  const step = 440 / nums.length;
  return (
    <svg viewBox="0 0 480 240">
      {snow(480, 240)}
      {friends && (
        <>
          <Potyi mood="think" dots={8} x={4} y={150} size={80} />
          {ICONS.csiga({ x: 440, y: 214, s: 1.2 })}
        </>
      )}
      {nums.map((n, i) => (
        <KeyPic key={n} n={n} cx={20 + step * i + step / 2} cy={52} color={COLORS[i % COLORS.length]} crossed={crossed.includes(n)} open={open === n} />
      ))}
    </svg>
  );
};

/** A szánkós kamra (zárt ajtó, lakat). */
export const ShedScene: React.FC<{ open?: boolean }> = ({ open = false }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <path d="M170 86 L260 30 L350 86 Z" fill="#fff" stroke="#94a3b8" strokeWidth="4" strokeLinejoin="round" />
    <rect x="180" y="86" width="160" height="120" fill="#b45309" stroke="#78350f" strokeWidth="4" />
    {open ? (
      <>
        <rect x="222" y="120" width="76" height="86" fill="#1f2937" />
        <path d="M232 190 H290 M236 196 Q236 176 248 176 H286" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
      </>
    ) : (
      <>
        <rect x="222" y="120" width="76" height="86" fill="#92400e" stroke="#78350f" strokeWidth="3" />
        <path d="M250 150 V140 Q260 126 270 140 V150" fill="none" stroke="#6b7280" strokeWidth="5" />
        <rect x="244" y="150" width="32" height="26" rx="5" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
      </>
    )}
    <Potyi mood={open ? 'cheer' : 'think'} dots={8} x={20} y={90} size={130} />
    {ICONS.meh({ x: 400, y: 80, s: 1.8 })}
    {ICONS.csiga({ x: 410, y: 200, s: 1.8 })}
  </svg>
);
