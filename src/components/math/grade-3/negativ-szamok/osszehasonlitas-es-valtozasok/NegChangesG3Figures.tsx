import React from 'react';
import { FONT, INK, BLUE, Thermo, thermoY, ChangeThermoSvg, TempCardsSvg, COLD, WARM } from './NegChangesG3Parts';

/** Melyik a hidegebb? –6 °C és –1 °C két hőmérőn. */
export const ColderWarmerSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => {
  const p = { yTop: 36, yBot: 176, min: -10, max: 5 };
  const y = (v: number) => thermoY(p, v);
  return (
    <svg viewBox="0 0 300 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Thermo cx={70} {...p} value={-6} labelStep={5} fs={12} liquid={COLD} />
      <Thermo cx={210} {...p} value={-1} labelStep={5} fs={12} liquid={WARM} />
      <text x="62" y="228" textAnchor="middle" fontSize="15" fontWeight="bold" fill={COLD}>
        –6 °C: hidegebb
      </text>
      <text x="202" y="228" textAnchor="middle" fontSize="15" fontWeight="bold" fill={WARM}>
        –1 °C: melegebb
      </text>
      <line x1="96" x2="168" y1={y(-6)} y2={y(-6)} stroke={COLD} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="132" y={y(-6) + 18} textAnchor="middle" fontSize="12" fontWeight="bold" fill={COLD}>
        lejjebb
      </text>
      <text x="132" y={y(-1) - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill={WARM}>
        feljebb
      </text>
      <line x1="96" x2="168" y1={y(-1)} y2={y(-1)} stroke={WARM} strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="132" x2="132" y1={y(-6) - 4} y2={y(-1) + 12} stroke={INK} strokeWidth="2" />
      <path d={`M132 ${y(-1) + 4} l-5 9 l10 0 Z`} fill={INK} />
    </svg>
  );
};

/** Növekvő sorrend: a leghidegebbtől a legmelegebbig. */
export const OrderSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => <TempCardsSvg values={[-8, -3, 0, 2, 6]} arrow="növekvő sorrend: egyre melegebb" className={className} />;

/** Melegedés a 0 fölött: 3 °C → 8 °C. */
export const WarmUpSvg: React.FC<{ className?: string }> = ({ className }) => <ChangeThermoSvg from={3} to={8} min={-5} max={10} names={['reggel', 'délben']} arrowText="5 fok" className={className} />;

/** Melegedés a 0-n át: –4 °C → 5 °C, 4 fok a 0-ig, aztán még 5. */
export const AcrossZeroSvg: React.FC<{ className?: string }> = ({ className }) => <ChangeThermoSvg from={-4} to={5} min={-10} max={10} names={['reggel', 'délben']} split={['4 fok', '5 fok']} className={className} />;

/** Hűlés a 0-n át: 6 °C → –2 °C. */
export const CoolDownSvg: React.FC<{ className?: string }> = ({ className }) => <ChangeThermoSvg from={6} to={-2} min={-5} max={10} names={['délután', 'éjjel']} split={['6 fok', '2 fok']} className={className} />;

/** Mindkettő a 0 alatt: –8 °C → –3 °C. */
export const BothBelowSvg: React.FC<{ className?: string }> = ({ className }) => <ChangeThermoSvg from={-8} to={-3} min={-10} max={5} names={['hajnalban', 'délben']} arrowText="5 fok" className={className} />;

/** Melyik irány mit jelent? Fölfelé melegebb, lefelé hidegebb. */
export const UpDownSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[260px] h-auto mx-auto' }) => {
  const p = { yTop: 36, yBot: 176, min: -10, max: 10 };
  return (
    <svg viewBox="0 0 260 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Thermo cx={70} {...p} value={null} labelStep={5} fs={12} zeroLine />
      <line x1="130" x2="130" y1="110" y2="44" stroke={WARM} strokeWidth="4" />
      <path d="M130 32 l-8 14 l16 0 Z" fill={WARM} />
      <text x="146" y="58" fontSize="15" fontWeight="bold" fill={WARM}>
        fölfelé:
      </text>
      <text x="146" y="76" fontSize="15" fontWeight="bold" fill={WARM}>
        melegedik
      </text>
      <line x1="130" x2="130" y1="118" y2="184" stroke={COLD} strokeWidth="4" />
      <path d="M130 196 l-8 -14 l16 0 Z" fill={COLD} />
      <text x="146" y="164" fontSize="15" fontWeight="bold" fill={COLD}>
        lefelé:
      </text>
      <text x="146" y="182" fontSize="15" fontWeight="bold" fill={COLD}>
        hűl
      </text>
      <circle cx="130" cy="114" r="4" fill={BLUE} />
    </svg>
  );
};
