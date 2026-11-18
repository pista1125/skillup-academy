// „Megálló” (III. témakör vége) – a téli kincskeresés képei: sorban álló barátok (sorszámnevek), kincsesláda.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { PIC, PicName } from '../a-nyolc/ANyolcG1Scenes';
import { snow } from '../a-tiz/ATizG1Scenes';

export type QueueItem = 'potyi' | PicName;

const drawItem = (it: QueueItem, x: number, y: number, key: React.Key) =>
  it === 'potyi' ? <Potyi key={key} dots={10} mood="happy" x={x - 30} y={y - 32} size={60} /> : <g key={key}>{PIC(it)({ x, y, s: it === 'meh' || it === 'csiga' ? 1.3 : 1.1 })}</g>;

/** Sor balról jobbra: a zászlónál van a sor eleje (1.), onnan számolunk. */
export const QueueScene: React.FC<{ items: QueueItem[]; question?: number }> = ({ items, question }) => {
  const st = Math.min(70, 380 / Math.max(1, items.length));
  return (
    <svg viewBox="0 0 480 200">
      {snow(480, 200)}
      <rect x="22" y="60" width="6" height="110" fill="#78350f" />
      <path d="M28 62 L70 76 L28 90 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
      <path d="M60 182 H450 M436 172 L452 182 L436 192" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {items.map((it, i) => {
        const x = 80 + i * st + st / 2 - 10;
        return (
          <g key={i}>
            {drawItem(it, x, 130, i)}
            {question === i + 1 && <text x={x} y="80" textAnchor="middle" fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>}
          </g>
        );
      })}
    </svg>
  );
};

/** Kincsesláda `gems` drágakővel (0–10), a barátokkal. */
export const TreasureScene: React.FC<{ gems?: number; open?: boolean }> = ({ gems = 10, open = true }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <Potyi dots={10} mood="cheer" x={10} y={60} size={150} />
    {ICONS.meh({ x: 410, y: 70, s: 1.7 })}
    {ICONS.csiga({ x: 420, y: 196, s: 1.8 })}
    <g transform="translate(170 90)">
      {open && <path d="M0 40 L10 0 H130 L140 40 Z" fill="#92400e" stroke="#451a03" strokeWidth="4" strokeLinejoin="round" />}
      <rect x="0" y="40" width="140" height="80" rx="8" fill="#b45309" stroke="#451a03" strokeWidth="4" />
      <rect x="62" y="56" width="16" height="20" rx="3" fill="#facc15" stroke="#a16207" strokeWidth="3" />
      {open &&
        Array.from({ length: Math.min(10, gems) }, (_, i) => (
          <path key={i} d={`M${16 + (i % 5) * 26} ${30 - Math.floor(i / 5) * 16} l9 -9 l9 9 l-9 11 Z`} fill={['#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#facc15'][i % 5]} stroke="#1f2937" strokeWidth="2" />
        ))}
    </g>
  </svg>
);
