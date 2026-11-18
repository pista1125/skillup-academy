// „Nyitott mondatok” – a behavazott számok képei (a téli alapképek az a-nyolc leckéből jönnek).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { EqCard, snow, WINTER } from '../a-nyolc/ANyolcG1Scenes';

/** Igaz (zöld pipa) vagy hamis (piros kereszt) jel. */
export const TruthIcon: React.FC<{ ok: boolean; className?: string }> = ({ ok, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <circle cx="40" cy="40" r="36" fill={ok ? '#dcfce7' : '#ffe4e6'} stroke={ok ? '#16a34a' : '#e11d48'} strokeWidth="5" />
    {ok ? (
      <path d="M22 42 L35 55 L59 27" fill="none" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M26 26 L54 54 M54 26 L26 54" fill="none" stroke="#e11d48" strokeWidth="9" strokeLinecap="round" />
    )}
  </svg>
);

export const IGAZ = { figure: <TruthIcon ok />, say: 'igaz' };
export const HAMIS = { figure: <TruthIcon ok={false} />, say: 'hamis' };

/** Behavazott számkártyák: a hó betakart egy számot. */
export const SnowyCardsScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <Potyi mood="think" dots={8} x={10} y={110} size={120} />
    <svg x="130" y="40" width="340" height="80" viewBox="0 0 314 90">
      <EqCard text="3 + □ = 5" className="" />
    </svg>
    {/* hókupac a doboz fölött */}
    <path d="M268 62 Q282 34 300 50 Q318 30 334 62 Z" fill="#fff" stroke="#bfdbfe" strokeWidth="3" />
    {WINTER.hopehely({ x: 180, y: 160, s: 0.8 })}
    {WINTER.hopehely({ x: 300, y: 170, s: 0.7 })}
    {WINTER.hopehely({ x: 420, y: 150, s: 0.9 })}
  </svg>
);
