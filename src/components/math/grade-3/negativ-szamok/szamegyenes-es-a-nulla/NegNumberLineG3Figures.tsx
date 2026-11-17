import React from 'react';
import { FONT, INK, RED, BLUE, NumberLine, nlX, VNumberLine, Thermo } from './NegNumberLineG3Parts';

/** A számegyenes két oldala: balra a negatív számok, jobbra a már ismert számok. */
export const TwoSidesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const p = { from: -6, to: 6, x0: 22, x1: 300 };
  const x = (v: number) => nlX(p, v);
  return (
    <svg viewBox="0 0 340 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <NumberLine {...p} y={62} labels="all" fs={14} sides />
      <text x={(x(-6) + x(-1)) / 2} y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLUE}>
        negatív számok
      </text>
      <path d={`M${x(-1)} 36 H${x(-6)}`} stroke={BLUE} strokeWidth="2.5" />
      <path d={`M${x(-6) - 8} 36 l9 -5 l0 10 Z`} fill={BLUE} />
      <text x={(x(1) + x(6)) / 2} y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={RED}>
        az eddig ismert számok
      </text>
      <path d={`M${x(1)} 36 H${x(6)}`} stroke={RED} strokeWidth="2.5" />
      <path d={`M${x(6) + 8} 36 l-9 -5 l0 10 Z`} fill={RED} />
      <text x={x(0)} y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill={BLUE}>
        a 0 a határ
      </text>
    </svg>
  );
};

/** Lépések a 0-tól: 3 lépés balra = –3, 3 lépés jobbra = 3. */
export const StepsFromZeroSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const p = { from: -5, to: 5, x0: 22, x1: 300 };
  const x = (v: number) => nlX(p, v);
  return (
    <svg viewBox="0 0 340 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <NumberLine {...p} y={70} labels="all" fs={14} hops={[{ from: 0, to: -3, color: BLUE }, { from: 0, to: 3, color: RED }]} points={[{ v: -3, color: BLUE }, { v: 3, color: RED }]} />
      <text x={x(-0.3)} y="30" textAnchor="end" fontSize="13" fontWeight="bold" fill={BLUE}>
        3 lépés balra
      </text>
      <text x={x(0.3)} y="30" textAnchor="start" fontSize="13" fontWeight="bold" fill={RED}>
        3 lépés jobbra
      </text>
      <text x={x(-3)} y="114" textAnchor="middle" fontSize="12" fill={BLUE}>
        (–3)
      </text>
      <text x={x(3)} y="114" textAnchor="middle" fontSize="12" fill={RED}>
        (3)
      </text>
    </svg>
  );
};

/** A hőmérő álló számegyenes: ugyanazok a számok, csak függőlegesen. */
export const ThermoIsLineSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const thermo = { yTop: 30, yBot: 190, min: -5, max: 5 };
  return (
    <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Thermo cx={60} {...thermo} value={-2} labelStep={1} fs={11} tw={10} />
      <VNumberLine from={-5} to={5} x={170} y0={190} y1={30} labels="all" fs={12} arrow={{ v: -2, text: '–2' }} />
      <text x="60" y="236" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
        hőmérő
      </text>
      <text x="170" y="236" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
        álló számegyenes
      </text>
      <text x="250" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill={RED}>
        fölfelé:
      </text>
      <text x="250" y="76" textAnchor="middle" fontSize="12" fill={RED}>
        melegebb
      </text>
      <text x="250" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill={BLUE}>
        lefelé:
      </text>
      <text x="250" y="176" textAnchor="middle" fontSize="12" fill={BLUE}>
        hidegebb
      </text>
    </svg>
  );
};

/** Ugyanolyan messze a 0-tól: a 4 és a –4. */
export const SameDistanceSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const p = { from: -6, to: 6, x0: 22, x1: 300 };
  const x = (v: number) => nlX(p, v);
  return (
    <svg viewBox="0 0 340 110" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <NumberLine {...p} y={64} labels="all" fs={14} points={[{ v: -4, color: BLUE }, { v: 4, color: RED }]} />
      <path d={`M${x(-4)} 40 v-8 H${x(0)} v8`} fill="none" stroke={BLUE} strokeWidth="2.5" />
      <path d={`M${x(0)} 40 v-8 H${x(4)} v8`} fill="none" stroke={RED} strokeWidth="2.5" />
      <text x={x(-2)} y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill={BLUE}>
        4 lépés
      </text>
      <text x={x(2)} y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill={RED}>
        4 lépés
      </text>
    </svg>
  );
};

/** Ha nincs minden szám kiírva: számolj a legközelebbi számtól. */
export const ReadBetweenSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const p = { from: -10, to: 10, x0: 22, x1: 300 };
  return (
    <svg viewBox="0 0 340 100" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <NumberLine {...p} y={56} labels={5} fs={14} points={[{ v: -7 }]} hops={[{ from: -5, to: -7, color: '#059669' }]} />
      <text x="170" y="96" textAnchor="middle" fontSize="12" fill="#047857">
        A –5-től még 2 lépés balra: –7.
      </text>
    </svg>
  );
};
