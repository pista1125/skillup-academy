// „A három” – a mese és a játék képei.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { sky } from '../a-ketto/AKettoG1Scenes';

/** Pötyi, Zümi és Csigusz együtt sétál – hárman vannak. */
export const FriendsScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <Potyi mood="cheer" dots={7} x={20} y={70} size={150} />
    {ICONS.meh({ x: 250, y: 90, s: 2.4 })}
    {ICONS.csiga({ x: 380, y: 178, s: 2.6 })}
  </svg>
);

/** n gomba a fűben. */
export const MushroomScene: React.FC<{ n?: number }> = ({ n = 3 }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {Array.from({ length: n }, (_, i) => ICONS.gomba({ x: 240 + (i - (n - 1) / 2) * 110, y: 168, s: 2.6, key: i }))}
  </svg>
);

/** Számlépcső: 0, 1, 2, 3 kocka egymás mellett, alattuk a szám. */
export const StairsScene: React.FC<{ max?: number }> = ({ max = 3 }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#fffbeb" />
    <path d="M30 196 H450" stroke="#92400e" strokeWidth="4" />
    {Array.from({ length: max + 1 }, (_, v) => {
      const x = 60 + v * 100;
      return (
        <g key={v}>
          {Array.from({ length: v }, (_, k) => (
            <rect key={k} x={x} y={196 - (k + 1) * 44} width="64" height="44" rx="6" fill={['#ef4444', '#f59e0b', '#22c55e'][k % 3]} stroke="#111827" strokeWidth="3" />
          ))}
          <text x={x + 32} y="228" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1f2937" fontFamily="system-ui, sans-serif">{v}</text>
        </g>
      );
    })}
    <Potyi mood="happy" dots={3} x={20} y={10} size={80} />
  </svg>
);
