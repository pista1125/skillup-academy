import React from 'react';
import { FONT, INK, BLUE, PURPLE, fmt, Thermo, thermoY } from './NegChangesG3Parts';

export { ThermoCard, BigTextCard } from '../negativ-szamok-a-mindennapokban/NegEverydayG3CardFigures';

// Kis, vastag vonalas kártyaábrák: Párosító 150 × 80, Csoportosító 80 × 80.

/**
 * Változás a hőmérőn: üres karika = előtte, teli karika = utána, lila nyíl a kettő között.
 * Párosítóban (150 × 80) fekvő skála (jobbra melegebb), csoportosítóban (80 × 80) álló hőmérő.
 */
export const ChangeCard: React.FC<{ from: number; to: number; min: number; max: number; small?: boolean }> = ({ from, to, min, max, small = false }) => {
  if (small) {
    const p = { yTop: 10, yBot: 58, min, max };
    const y = (v: number) => thermoY(p, v);
    const d = to > from ? -1 : 1;
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <Thermo cx={38} {...p} value={null} labelStep={5} tw={10} fs={13} unit={false} frame={false} tick={1.8} />
        <circle cx="38" cy={y(from)} r="4.5" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
        <circle cx="38" cy={y(to)} r="4.5" fill={INK} stroke={INK} strokeWidth="2" />
        <line x1="66" x2="66" y1={y(from)} y2={y(to) - d * 8} stroke={PURPLE} strokeWidth="3.5" />
        <path d={`M66 ${y(to)} l-6 ${-d * 9} l12 0 Z`} fill={PURPLE} />
      </svg>
    );
  }
  const x0 = 24;
  const x1 = 130;
  const x = (v: number) => x0 + ((v - min) / (max - min)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = min; v <= max; v++) ticks.push(v);
  const a = x(from);
  const b = x(to);
  // görbe nyíl a két pont fölött; a nyílhegy a görbe végének irányába mutat
  const mx = (a + b) / 2;
  const cy = 2;
  const ty = 31;
  const L = Math.hypot(b - mx, ty - cy);
  const ux = (b - mx) / L;
  const uy = (ty - cy) / L;
  const hx = b - ux * 11;
  const hy = ty - uy * 11;
  const ex = b - ux * 6;
  const ey = ty - uy * 6;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 6} x2={x1 + 6} y1="38" y2="38" stroke="#475569" strokeWidth="3" />
      {ticks.map((v) => {
        const big = v % 5 === 0;
        return <line key={v} x1={x(v)} x2={x(v)} y1={big ? 31 : 34} y2={big ? 45 : 42} stroke={v === 0 ? BLUE : '#334155'} strokeWidth={big ? 3 : 2} />;
      })}
      {ticks
        .filter((v) => v % 5 === 0)
        .map((v) => (
          <text key={`l${v}`} x={x(v)} y="68" textAnchor="middle" fontSize="18" fontWeight="bold" fill={v === 0 ? BLUE : INK}>
            {fmt(v)}
          </text>
        ))}
      <path d={`M${a} 30 Q ${mx} ${cy} ${ex} ${ey}`} fill="none" stroke={PURPLE} strokeWidth="3" />
      <path d={`M${b} ${ty} L${hx - uy * 6} ${hy + ux * 6} L${hx + uy * 6} ${hy - ux * 6} Z`} fill={PURPLE} />
      <circle cx={a} cy="38" r="5" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <circle cx={b} cy="38" r="5" fill={INK} />
    </svg>
  );
};

/**
 * Két kis hőmérő egymás mellett: bal = előtte, jobb = utána.
 * small = 80 × 80 (csoportosító, felirat csak a bal hőmérőn), egyébként 150 × 80.
 */
export const TwoThermoCard: React.FC<{ a: number; b: number; min: number; max: number; small?: boolean }> = ({ a, b, min, max, small = false }) =>
  small ? (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <Thermo cx={34} yTop={10} yBot={58} min={min} max={max} value={a} labelStep={5} tw={9} fs={12} unit={false} frame={false} tick={1.6} />
      <Thermo cx={62} yTop={10} yBot={58} min={min} max={max} value={b} labels={[]} tw={9} fs={12} unit={false} frame={false} tick={1.6} />
    </svg>
  ) : (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <Thermo cx={46} yTop={10} yBot={58} min={min} max={max} value={a} labelStep={5} tw={10} fs={13} unit={false} frame={false} tick={1.8} />
    <Thermo cx={118} yTop={10} yBot={58} min={min} max={max} value={b} labelStep={5} tw={10} fs={13} unit={false} frame={false} tick={1.8} />
  </svg>
);

/** A változás-kártya ablaka: 5-ös határokra kerekítve, legalább 10 fok. */
export const changeWindow = (from: number, to: number): [number, number] => {
  let lo = Math.floor(Math.min(from, to) / 5) * 5;
  let hi = Math.ceil(Math.max(from, to) / 5) * 5;
  if (hi - lo < 10) {
    if (lo > 0) lo = hi - 10;
    else hi = lo + 10;
  }
  return [lo, hi];
};
