// „Számolás 0-tól 6-ig” – a mese és a játék képei (a dobozok, sorok az a-hat/AHatG1Scenes.tsx-ből jönnek).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';
import { sky } from '../a-hat/AHatG1Scenes';

const FONT = 'system-ui, sans-serif';

/** 1. oldal: piknik a Számkertben – Pötyi, Zümi, Csigusz és a kosár. */
export const PicnicScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <path d="M150 230 L330 230 L360 260 L120 260 Z" fill="#fca5a5" stroke="#b91c1c" strokeWidth="3" />
    <path d="M200 176 Q240 120 280 176" fill="none" stroke="#92400e" strokeWidth="8" />
    <path d="M186 176 H294 L282 228 H198 Z" fill="#d97706" stroke="#78350f" strokeWidth="4" />
    <path d="M196 196 H284 M200 212 H280" stroke="#78350f" strokeWidth="3" />
    <Potyi mood="cheer" dots={6} x={10} y={70} size={150} />
    {ICONS.meh({ x: 350, y: 80, s: 2 })}
    {ICONS.csiga({ x: 410, y: 214, s: 2.2 })}
  </svg>
);

/** Vegyes sor: több csoport egymás után (pl. 1 alma, 2 eper, 3 gomba). */
export const MixRowScene: React.FC<{ groups: { icon: IconName; n: number; color?: string }[] }> = ({ groups }) => {
  const items = groups.flatMap((g) => Array.from({ length: g.n }, () => g));
  const step = items.length > 5 ? 70 : 84;
  const X = (i: number) => 240 + (i - (items.length - 1) / 2) * step;
  // csoporthatárok: kis függőleges elválasztó a csoportok között
  const bounds: number[] = [];
  let acc = 0;
  groups.slice(0, -1).forEach((g) => {
    acc += g.n;
    bounds.push(acc);
  });
  return (
    <svg viewBox="0 0 480 240">
      {sky(480, 240)}
      {bounds.map((b) => (
        <path key={b} d={`M${X(b) - step / 2} 132 V204`} stroke="#7c3aed" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />
      ))}
      {items.map((g, i) => ICONS[g.icon]({ x: X(i), y: 168, s: 1.4, color: g.color, key: i }))}
    </svg>
  );
};

/** Két műveletkártya, középen „?” – melyik jel kell? */
export const ExprCompare: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <svg viewBox="0 0 480 110" className="w-full max-w-[460px] h-auto mx-auto">
    {[
      { x: 10, t: left },
      { x: 290, t: right },
    ].map(({ x, t }) => (
      <g key={x}>
        <rect x={x} y="15" width="180" height="80" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="4" />
        <text x={x + 90} y="70" textAnchor="middle" fontSize="42" fontWeight="900" fill="#1e293b" fontFamily={FONT}>
          {t}
        </text>
      </g>
    ))}
    <rect x="205" y="15" width="70" height="80" rx="14" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="4" />
    <text x="240" y="72" textAnchor="middle" fontSize="48" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>
      ?
    </text>
  </svg>
);

/**
 * Nyílsor: kezdőszám, majd minden lépésnél nyíl a művelettel (pl. „+2”) és egy doboz.
 * `values`: a dobozok tartalma (szám, „?” vagy „” = üres doboz).
 */
export const ChainScene: React.FC<{ start: number; ops: string[]; values: (number | string)[] }> = ({ start, ops, values }) => {
  const boxW = 70;
  const arrowW = ops.length > 2 ? 70 : 100;
  const w = 20 + boxW + ops.length * (arrowW + boxW) + 20;
  const box = (x: number, t: number | string, key: string, isStart = false) => {
    const q = t === '?';
    return (
      <g key={key}>
        <rect x={x} y="40" width={boxW} height="70" rx="14" fill={isStart ? '#fef3c7' : q ? '#f5f3ff' : '#fff'} stroke={q ? '#7c3aed' : isStart ? '#d97706' : '#94a3b8'} strokeWidth="4" />
        <text x={x + boxW / 2} y="90" textAnchor="middle" fontSize="40" fontWeight="900" fill={q ? '#7c3aed' : '#1e293b'} fontFamily={FONT}>
          {t}
        </text>
      </g>
    );
  };
  return (
    <svg viewBox={`0 0 ${w} 130`} className="w-full max-w-[470px] h-auto mx-auto">
      <rect x="0" y="0" width={w} height="130" rx="18" fill="#f0fdf4" />
      {box(20, start, 's', true)}
      {ops.map((op, i) => {
        const ax = 20 + boxW + i * (arrowW + boxW);
        return (
          <g key={i}>
            <path d={`M${ax + 8} 75 H${ax + arrowW - 10}`} stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${ax + arrowW - 20} 65 L${ax + arrowW - 8} 75 L${ax + arrowW - 20} 85`} fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <text x={ax + arrowW / 2} y="32" textAnchor="middle" fontSize="30" fontWeight="900" fill="#dc2626" fontFamily={FONT}>
              {op}
            </text>
            {box(ax + arrowW, values[i] ?? '', `b${i}`)}
          </g>
        );
      })}
    </svg>
  );
};
