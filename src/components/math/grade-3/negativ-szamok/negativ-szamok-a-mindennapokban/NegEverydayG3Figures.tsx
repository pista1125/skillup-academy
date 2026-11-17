import React from 'react';
import { FONT, INK, RED, BLUE, Thermo, thermoY, BuildingSvg, ForecastSvg, FeverThermoIcon, BathThermoIcon, WallThermoIcon, DiverSvg, SnowIcon, SunIcon } from './NegEverydayG3Parts';

/** A hőmérő részei: °C, skála, folyadékoszlop, fagypont. */
export const ThermoPartsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => {
  const p = { yTop: 40, yBot: 200, min: -10, max: 20 };
  const y = (v: number) => thermoY(p, v);
  return (
    <svg viewBox="0 0 310 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Thermo cx={90} {...p} value={-3} labelStep={5} fs={12} zeroLine />
      {/* magyarázó feliratok */}
      <line x1="112" y1={y(20) - 22} x2="150" y2={y(20) - 22} stroke="#64748b" strokeWidth="1.5" />
      <text x="154" y={y(20) - 18} fontSize="13" fontWeight="bold" fill={INK}>
        °C: Celsius-fok
      </text>
      <line x1="104" y1={y(10)} x2="150" y2={y(10)} stroke="#64748b" strokeWidth="1.5" />
      <text x="154" y={y(10) + 4} fontSize="13" fontWeight="bold" fill={INK}>
        skála: 1 vonal = 1 fok
      </text>
      <line x1="112" y1={y(0)} x2="150" y2={y(0)} stroke={BLUE} strokeWidth="1.5" />
      <text x="154" y={y(0) + 4} fontSize="13" fontWeight="bold" fill={BLUE}>
        0 °C: fagypont
      </text>
      <line x1="94" y1={y(-3)} x2="150" y2={y(-3) + 22} stroke={RED} strokeWidth="1.5" />
      <text x="154" y={y(-3) + 26} fontSize="13" fontWeight="bold" fill={RED}>
        az oszlop teteje:
      </text>
      <text x="154" y={y(-3) + 42} fontSize="13" fontWeight="bold" fill={RED}>
        –3 °C
      </text>
    </svg>
  );
};

/** Fagypont fölött – fagypont alatt: olvadó hóember és befagyott tócsa. */
export const AboveBelowZeroSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const p = { yTop: 36, yBot: 176, min: -10, max: 10 };
  return (
    <svg viewBox="0 0 320 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="0" y="0" width="320" height={thermoY(p, 0)} fill="#fff7ed" />
      <rect x="0" y={thermoY(p, 0)} width="320" height={210 - thermoY(p, 0)} fill="#e0f2fe" />
      <Thermo cx={160} {...p} value={null} labelStep={5} fs={12} frame={false} zeroLine />
      <text x="16" y="30" fontSize="14" fontWeight="bold" fill="#c2410c">
        fagypont fölött
      </text>
      <text x="16" y="48" fontSize="12" fill="#7c2d12">
        5 °C, 8 °C …
      </text>
      <text x="16" y="66" fontSize="12" fill="#7c2d12">
        olvad a hó
      </text>
      <text x="16" y="150" fontSize="14" fontWeight="bold" fill="#1d4ed8">
        fagypont alatt
      </text>
      <text x="16" y="168" fontSize="12" fill="#1e3a8a">
        –2 °C, –7 °C …
      </text>
      <text x="16" y="186" fontSize="12" fill="#1e3a8a">
        fagy van, jég lesz
      </text>
      {/* olvadó hóember */}
      <g>
        <SunIcon x={286} y={26} r={8} />
        <ellipse cx="254" cy="88" rx="30" ry="5" fill="#bae6fd" />
        <circle cx="254" cy="72" r="16" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
        <circle cx="254" cy="46" r="11" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
        <path d="M254 47 l10 2 l-10 2 Z" fill="#f97316" />
        <circle cx="250" cy="43" r="1.6" fill={INK} />
        <circle cx="258" cy="43" r="1.6" fill={INK} />
      </g>
      {/* befagyott tócsa */}
      <g>
        <ellipse cx="254" cy="170" rx="40" ry="11" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
        <path d="M232 166 l12 6 M258 164 l-6 9 M266 170 l12 -3" stroke="#ffffff" strokeWidth="2" />
        <SnowIcon x={226} y={130} r={7} />
        <SnowIcon x={282} y={138} r={6} />
      </g>
    </svg>
  );
};

/** Háromféle hőmérő és a használatuk. */
export const ThermoTypesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 330 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {[
      { x: 55, name: 'lázmérő', use: 'Lázas vagy?', val: 'kb. 36–39 °C' },
      { x: 165, name: 'fürdővíz-hőmérő', use: 'Jó a fürdővíz?', val: 'kb. 37 °C' },
      { x: 275, name: 'kinti hőmérő', use: 'Hideg van kint?', val: 'télen: –5 °C is' }
    ].map((t, i) => (
      <g key={i}>
        <rect x={t.x - 52} y="6" width="104" height="138" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {i === 0 && <FeverThermoIcon x={t.x} y={48} k={1.1} text="37,2" />}
        {i === 1 && <BathThermoIcon x={t.x - 4} y={48} k={1.1} />}
        {i === 2 && <WallThermoIcon x={t.x} y={50} k={1} />}
        <text x={t.x} y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
          {t.name}
        </text>
        <text x={t.x} y="118" textAnchor="middle" fontSize="11" fill="#475569">
          {t.use}
        </text>
        <text x={t.x} y="134" textAnchor="middle" fontSize="11" fontWeight="bold" fill={i === 2 ? BLUE : RED}>
          {t.val}
        </text>
      </g>
    ))}
  </svg>
);

/** Időjárás-jelentés egy hétre (saját adatok). */
export const WeekForecastSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <ForecastSvg
    className={className}
    days={[
      { day: 'hétfő', w: 'suncloud', hi: 4, lo: 1 },
      { day: 'kedd', w: 'cloud', hi: 3, lo: -2 },
      { day: 'szerda', w: 'snow', hi: 0, lo: -5 },
      { day: 'csüt.', w: 'snow', hi: -1, lo: -6 },
      { day: 'péntek', w: 'sun', hi: 2, lo: 0 }
    ]}
  />
);

/** Ház a lifttel: emeletek, földszint, pince, mélygarázs. */
export const LiftBuildingSvg: React.FC<{ className?: string }> = ({ className }) => <BuildingSvg className={className} car />;

/** Búvár 3 méterrel a vízfelszín alatt. */
export const DiverDepthSvg: React.FC<{ className?: string }> = ({ className }) => <DiverSvg depth={3} label="–3 m" className={className} />;
