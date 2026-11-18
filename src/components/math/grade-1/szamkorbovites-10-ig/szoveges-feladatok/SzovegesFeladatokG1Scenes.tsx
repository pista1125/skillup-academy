// „Szöveges feladatok” – Pötyi mesedélutánjának képei: két kupac, több/kevesebb, mesekártyák.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { PIC, PicName, WINTER } from '../a-nyolc/ANyolcG1Scenes';
import { snow } from '../a-tiz/ATizG1Scenes';

export type Who = 'potyi' | 'meh' | 'csiga';

const whoAt = (who: Who, x: number, y: number, s = 1) =>
  who === 'potyi' ? <Potyi dots={7} mood="happy" x={x - 40 * s} y={y - 40 * s} size={80 * s} /> : who === 'meh' ? ICONS.meh({ x, y, s: 1.9 * s }) : ICONS.csiga({ x, y, s: 1.9 * s });

/** n tárgy kupacban / sorban egy területen (max 5 egy sorban). */
const pile = (icon: PicName, n: number, cx: number, cy: number, color?: string, s = 0.8) =>
  Array.from({ length: n }, (_, i) => {
    const per = 5;
    const row = Math.floor(i / per);
    const inRow = Math.min(per, n - row * per);
    const col = i % per;
    return PIC(icon)({ x: cx + (col - (inRow - 1) / 2) * 34, y: cy + row * 36, s, color, key: `${cx}-${i}` });
  });

/** Négy lépés: hallgasd meg – nézd meg – melyik művelet? – válaszolj! */
export const StoryStepsScene: React.FC = () => {
  const box = (x: number, n: number, body: React.ReactNode) => (
    <g key={n}>
      <rect x={x} y="40" width="100" height="130" rx="18" fill="#fff" stroke="#c4b5fd" strokeWidth="4" />
      <circle cx={x + 18} cy="40" r="15" fill="#7c3aed" />
      <text x={x + 18} y="46" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">{n}</text>
      {body}
    </g>
  );
  return (
    <svg viewBox="0 0 480 210">
      <rect x="0" y="0" width="480" height="210" rx="18" fill="#f5f3ff" />
      {box(14, 1, (
        <g>
          <path d="M44 92 H56 L74 76 V144 L56 128 H44 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="3" strokeLinejoin="round" />
          <path d="M82 92 Q92 110 82 128 M88 82 Q104 110 88 138" fill="none" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      ))}
      {box(130, 2, (
        <g>
          <ellipse cx="180" cy="110" rx="36" ry="22" fill="#fff" stroke="#1f2937" strokeWidth="4" />
          <circle cx="180" cy="110" r="12" fill="#2563eb" />
          <circle cx="184" cy="106" r="4" fill="#fff" />
        </g>
      ))}
      {box(246, 3, (
        <g>
          <text x="296" y="128" textAnchor="middle" fontSize="54" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">+ −</text>
        </g>
      ))}
      {box(362, 4, (
        <g>
          <circle cx="412" cy="108" r="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" />
          <path d="M396 108 L408 120 L430 94" fill="none" stroke="#16a34a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
};

/**
 * Két szereplő, mindegyik előtt egy kupac: `a` és `b` darab (b-nél „?” is lehet).
 */
export const TwoPilesScene: React.FC<{ a: number; b: number | '?'; icon?: PicName; whoA?: Who; whoB?: Who; colorB?: string }> = ({ a, b, icon = 'hogolyo', whoA = 'potyi', whoB = 'meh', colorB }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    {whoAt(whoA, 70, 70)}
    {whoAt(whoB, 300, 70)}
    {pile(icon, a, 120, 170)}
    {b === '?' ? (
      <text x="360" y="196" textAnchor="middle" fontSize="60" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
    ) : (
      pile(icon, b, 360, 170, colorB)
    )}
  </svg>
);

/**
 * „Több / kevesebb” mese: fent A szereplő `a` tárggyal, lent B szereplő „?”-lel és egy jelzőkártyával
 * (pl. „2-vel több”). A kép nem árulja el B számát.
 */
export const MoreLessScene: React.FC<{ a: number; diff: number; more: boolean; icon?: PicName; whoA?: Who; whoB?: Who }> = ({ a, diff, more, icon = 'virag', whoA = 'meh', whoB = 'csiga' }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#f0f9ff" />
    {whoAt(whoA, 50, 60, 0.8)}
    {pile(icon, a, 270, 60)}
    <path d="M30 120 H450" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8 6" />
    {whoAt(whoB, 50, 180, 0.8)}
    <rect x="120" y="150" width="150" height="60" rx="16" fill={more ? '#dcfce7' : '#ffe4e6'} stroke={more ? '#16a34a' : '#e11d48'} strokeWidth="3" />
    <text x="195" y="190" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
      {WITH[diff] ?? diff} {more ? 'több' : 'kevesebb'}
    </text>
    <text x="360" y="202" textAnchor="middle" fontSize="64" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
  </svg>
);

const WITH: Record<number, string> = { 1: '1-gyel', 2: '2-vel', 3: '3-mal', 4: '4-gyel', 5: '5-tel', 6: '6-tal', 7: '7-tel', 8: '8-cal', 9: '9-cel', 10: '10-zel' };

/** Kis mesekártya: n tárgy, nyíl befelé (jön, hozzáadunk) vagy kifelé (elmegy, elveszünk). */
export const ArrowCard: React.FC<{ icon: PicName; n: number; dir: 'in' | 'out'; className?: string }> = ({ icon, n, dir, className = 'w-28 h-20' }) => (
  <svg viewBox="0 0 160 100" className={className}>
    <rect x="3" y="3" width="154" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <path d="M96 40 H150 V88 H96 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
    {dir === 'in' ? (
      <path d="M58 64 H88 M78 54 L90 64 L78 74" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M90 64 H60 M70 54 L58 64 L70 74" fill="none" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    )}
    {Array.from({ length: n }, (_, i) => PIC(icon)({ x: 26 + (i % 2) * 22, y: 30 + Math.floor(i / 2) * 30, s: 0.55, key: i }))}
  </svg>
);

/** Hangszóró-kártya: koppintásra a mese hallható (a Válogatóban). */
export const SpeakerFig: React.FC<{ icon?: PicName }> = ({ icon }) => (
  <svg viewBox="0 0 120 80" className="w-24 h-16">
    <rect x="3" y="3" width="114" height="74" rx="14" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
    <path d="M18 32 H28 L42 20 V60 L28 48 H18 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M48 30 Q55 40 48 50" fill="none" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
    {icon && PIC(icon)({ x: 88, y: 40, s: 0.9 })}
  </svg>
);

/** Hóember `left` gombbal, a földön `down` leesett gomb (hány volt?). */
export const FallenButtonsExtra: React.FC<{ down: number }> = ({ down }) => (
  <g>
    {Array.from({ length: down }, (_, i) => WINTER.gomb({ x: 60 + i * 30, y: 222 - (i % 2) * 6, s: 0.8, key: i }))}
  </g>
);
