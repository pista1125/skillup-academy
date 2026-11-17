import React from 'react';
import { FONT, INK, RED, BLUE, Thermo, thermoY, NumberLine, BuildingSvg, ChangeThermoSvg, TempCardsSvg } from './NegExamG3Parts';

/** Amit a hőmérőről tudsz: fagypont, 0 fölött, 0 alatt. */
export const ExamThermoSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => {
  const p = { yTop: 36, yBot: 196, min: -10, max: 10 };
  const y = (v: number) => thermoY(p, v);
  return (
    <svg viewBox="0 0 300 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="0" y="0" width="300" height={y(0)} fill="#fff7ed" />
      <rect x="0" y={y(0)} width="300" height={236 - y(0)} fill="#e0f2fe" />
      <Thermo cx={80} {...p} value={-6} labelStep={5} fs={12} zeroLine />
      <text x="128" y={y(7) + 4} fontSize="14" fontWeight="bold" fill="#c2410c">
        0 fölött: 3 °C, 8 °C …
      </text>
      <text x="128" y={y(0) + 5} fontSize="14" fontWeight="bold" fill={BLUE}>
        0 °C: fagypont
      </text>
      <line x1="104" x2="122" y1={y(-6)} y2={y(-6)} stroke={RED} strokeWidth="2" />
      <text x="128" y={y(-6) + 5} fontSize="14" fontWeight="bold" fill={RED}>
        –6 °C: mínusz hat
      </text>
      <text x="128" y={y(-6) + 23} fontSize="13" fill="#1e3a8a">
        celziusz-fok
      </text>
    </svg>
  );
};

/** A számegyenes két oldala. */
export const ExamLineSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 330 96" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <NumberLine from={-6} to={6} x0={20} x1={300} y={52} labels="all" fs={13} sides />
    <text x="20" y="20" fontSize="13" fontWeight="bold" fill={BLUE}>
      ← balra: –1, –2, –3 …
    </text>
    <text x="310" y="20" textAnchor="end" fontSize="13" fontWeight="bold" fill={RED}>
      jobbra: 1, 2, 3 … →
    </text>
  </svg>
);

/** A ház szintjei: a földszint a 0. */
export const ExamBuildingSvg: React.FC<{ className?: string }> = ({ className }) => <BuildingSvg className={className} />;

/** Sorrend: a leghidegebbtől a legmelegebbig. */
export const ExamOrderSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => <TempCardsSvg values={[-9, -4, -1, 0, 5]} arrow="növekvő: egyre melegebb" className={className} />;

/** Változás a 0-n át: –3 °C → 6 °C. */
export const ExamChangeSvg: React.FC<{ className?: string }> = ({ className }) => <ChangeThermoSvg from={-3} to={6} min={-5} max={10} names={['reggel', 'délben']} split={['3 fok', '6 fok']} className={className} />;

/** Tipp-ábra: lépj a 0-ig, aztán tovább. */
export const ExamTwoPartsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 330 100" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <NumberLine from={-6} to={6} x0={20} x1={300} y={70} labels="all" fs={12} hops={[{ from: -4, to: 0, color: BLUE }, { from: 0, to: 5, color: RED }]} />
    <text x="113" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill={BLUE}>
      4 lépés
    </text>
    <text x="218" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill={RED}>
      5 lépés
    </text>
    <text x="165" y="18" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>
      4 + 5 = 9
    </text>
  </svg>
);
