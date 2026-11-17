import React from 'react';
import { FONT, INK, RED, BLUE, MINUS, fmt, fmtC, Thermo, thermoY, ThermoSvg, ThermoRow, ForecastSvg } from '../negativ-szamok-a-mindennapokban/NegEverydayG3Parts';
import type { DayForecast } from '../negativ-szamok-a-mindennapokban/NegEverydayG3Parts';

// ---------------------------------------------------------------------------
// Közös rajzelemek a IX. témakör 3. leckéjéhez (összehasonlítás, változások).
// A hőmérő, a mínuszjel („–3 °C”) és az időjárás-jelentés az 1. leckéből jön.
// ---------------------------------------------------------------------------
export { FONT, INK, RED, BLUE, MINUS, fmt, fmtC, Thermo, thermoY, ThermoSvg, ThermoRow, ForecastSvg };
export type { DayForecast };

export const PURPLE = '#7c3aed';
export const WARM = '#ea580c';
export const COLD = '#0284c7';

/** Hány fokkal változott? (mindig pozitív) */
export const diff = (a: number, b: number) => Math.abs(a - b);
/** „melegedett 5 fokkal” / „hűlt 3 fokkal” / „nem változott” */
export const changeText = (a: number, b: number) => (b > a ? `melegedett ${b - a} fokkal` : b < a ? `hűlt ${a - b} fokkal` : 'nem változott');

/** Nyílhegy (x, y) pontba, felfelé (dir = -1) vagy lefelé (dir = 1). */
const Head: React.FC<{ x: number; y: number; dir: number; color: string; s?: number }> = ({ x, y, dir, color, s = 6 }) => <path d={`M${x} ${y} l${-s} ${-dir * s * 1.5} l${2 * s} 0 Z`} fill={color} />;

export interface ChangeThermoProps {
  from: number;
  to: number;
  min?: number;
  max?: number;
  labelStep?: number;
  /** a két leolvasás neve, pl. „reggel”, „délben” */
  names?: [string, string];
  /** ha true, a második érték helyén „?” áll */
  hideTo?: boolean;
  /** ha true, az első érték helyén „?” áll */
  hideFrom?: boolean;
  /** a nyíl melletti felirat; ha nincs, nincs felirat */
  arrowText?: string;
  /** a 0-nál kettéosztott nyíl (két felirattal) */
  split?: [string, string];
  h?: number;
  className?: string;
}

/**
 * Hőmérő két leolvasással: üres karika = első, teli karika = második érték,
 * a jobb oldali nyíl mutatja a változást (fölfelé melegedés, lefelé hűlés).
 */
export const ChangeThermoSvg: React.FC<ChangeThermoProps> = ({
  from,
  to,
  min = -10,
  max = 10,
  labelStep = 5,
  names = ['reggel', 'délben'],
  hideTo = false,
  hideFrom = false,
  arrowText,
  split,
  h = 170,
  className = 'w-full max-w-[290px] h-auto mx-auto'
}) => {
  const W = 270;
  const yTop = 34;
  const p = { yTop, yBot: yTop + h, min, max };
  const y = (v: number) => thermoY(p, v);
  const H = yTop + h + 40;
  const cx = 52;
  const ax = 92;
  const col = PURPLE;
  const tag = (v: number, name: string, hide: boolean, filled: boolean) => {
    const ty = y(v);
    const txt = `${name}: ${hide ? '?' : fmtC(v)}`;
    return (
      <g>
        <circle cx={cx} cy={ty} r="5.5" fill={filled ? INK : '#ffffff'} stroke={INK} strokeWidth="2.2" />
        <line x1={cx + 8} x2={150} y1={ty} y2={ty} stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="3 3" />
        <rect x={150} y={ty - 12} width={W - 154} height="24" rx="7" fill={hide ? '#fee2e2' : '#ffffff'} stroke={hide ? RED : INK} strokeWidth="1.8" />
        <text x={150 + (W - 154) / 2} y={ty + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={hide ? RED : INK}>
          {txt}
        </text>
      </g>
    );
  };
  const seg = (a: number, b: number, text?: string) => {
    const d = b > a ? -1 : 1;
    const y1 = y(a) + d * 3;
    const y2 = y(b);
    return (
      <g>
        <line x1={ax} x2={ax} y1={y1} y2={y2 - d * 8} stroke={col} strokeWidth="3" />
        <Head x={ax} y={y2} dir={d} color={col} />
        {text && (
          <text x={ax + 8} y={(y1 + y2) / 2 + 5} fontSize="14" fontWeight="bold" fill={col}>
            {text}
          </text>
        )}
      </g>
    );
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Thermo cx={cx} yTop={yTop} yBot={yTop + h} min={min} max={max} value={null} labelStep={labelStep} fs={12} />
      {split ? (
        <g>
          {seg(from, 0, split[0])}
          {seg(0, to, split[1])}
          <line x1={ax - 6} x2={ax + 6} y1={y(0)} y2={y(0)} stroke={BLUE} strokeWidth="2.5" />
        </g>
      ) : (
        seg(from, to, arrowText)
      )}
      {tag(from, names[0], hideFrom, false)}
      {tag(to, names[1], hideTo, true)}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Hőmérséklet-kártyák egy sorban (rendezéshez)
// ---------------------------------------------------------------------------
const CARD_COLORS = ['#dc2626', '#16a34a', '#1d4ed8', '#ea580c', '#db2777', '#7c3aed'];

export const TempCardsSvg: React.FC<{ values: (number | string)[]; className?: string; arrow?: string; unit?: boolean }> = ({ values, className = 'w-full max-w-[320px] h-auto mx-auto', arrow, unit = true }) => {
  const cw = 64;
  const W = values.length * cw + 8;
  const H = arrow ? 86 : 52;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {values.map((v, i) => {
        const t = typeof v === 'number' ? (unit ? fmtC(v) : fmt(v)) : v;
        const c = v === '?' ? RED : CARD_COLORS[i % CARD_COLORS.length];
        return (
          <g key={i}>
            <rect x={6 + i * cw} y="6" width={cw - 6} height="38" rx="12" fill={v === '?' ? '#fee2e2' : '#ffffff'} stroke={c} strokeWidth="2.5" />
            <text x={6 + i * cw + (cw - 6) / 2} y="31" textAnchor="middle" fontSize="15" fontWeight="bold" fill={v === '?' ? RED : INK}>
              {t}
            </text>
          </g>
        );
      })}
      {arrow && (
        <g>
          <line x1="12" x2={W - 18} y1="58" y2="58" stroke={WARM} strokeWidth="3" />
          <path d={`M${W - 8} 58 l-12 -6 l0 12 Z`} fill={WARM} />
          <text x={W / 2} y="78" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WARM}>
            {arrow}
          </text>
        </g>
      )}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Grafikon: reggeli hőmérsékletek napokra (pontok, összekötve)
// ---------------------------------------------------------------------------
export const WeekChartSvg: React.FC<{ days: { day: string; v: number }[]; min: number; max: number; step?: number; className?: string }> = ({ days, min, max, step = 2, className = 'w-full max-w-[330px] h-auto mx-auto' }) => {
  const x0 = 40;
  const cw = 46;
  const W = x0 + days.length * cw + 8;
  const yT = 16;
  const yB = 176;
  const y = (v: number) => yB - ((v - min) / (max - min)) * (yB - yT);
  const H = yB + 30;
  const xs = (i: number) => x0 + i * cw + cw / 2;
  const vals: number[] = [];
  for (let v = min; v <= max; v++) vals.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {days.map((d, i) => (
        <rect key={`c${i}`} x={x0 + i * cw + 4} y={yT - 6} width={cw - 8} height={yB - yT + 12} fill="#ecfccb" />
      ))}
      {vals.map((v) => (
        <g key={v}>
          <line x1={x0} x2={W - 6} y1={y(v)} y2={y(v)} stroke={v === 0 ? BLUE : '#94a3b8'} strokeWidth={v === 0 ? 2 : 0.8} />
          {v % step === 0 && (
            <text x={x0 - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fontWeight="bold" fill={v === 0 ? BLUE : INK}>
              {fmt(v)}
            </text>
          )}
        </g>
      ))}
      <text x="4" y="12" fontSize="10" fontWeight="bold" fill="#475569">
        °C
      </text>
      <polyline points={days.map((d, i) => `${xs(i)},${y(d.v)}`).join(' ')} fill="none" stroke={RED} strokeWidth="2.5" />
      {days.map((d, i) => (
        <g key={`p${i}`}>
          <rect x={xs(i) - 4.5} y={y(d.v) - 4.5} width="9" height="9" fill={RED} />
          <text x={xs(i)} y={yB + 22} textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
            {d.day}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Táblázat (pl. bent – kint, reggel – este)
// ---------------------------------------------------------------------------
export const TempTableSvg: React.FC<{ head: string[]; rows: { name: string; cells: (number | string)[] }[]; className?: string }> = ({ head, rows, className = 'w-full max-w-[330px] h-auto mx-auto' }) => {
  const c0 = 66;
  const cw = 58;
  const rh = 30;
  const W = c0 + head.length * cw + 4;
  const H = rh * (rows.length + 1) + 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height={rh} fill="#bbf7d0" />
      {head.map((t, i) => (
        <text key={i} x={c0 + i * cw + cw / 2} y={2 + rh / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
          {t}
        </text>
      ))}
      {rows.map((r, j) => (
        <g key={j}>
          <rect x="2" y={2 + rh * (j + 1)} width={c0 - 2} height={rh} fill="#dcfce7" />
          <text x="8" y={2 + rh * (j + 1.5) + 5} fontSize="13" fontWeight="bold" fill={INK}>
            {r.name}
          </text>
          {r.cells.map((c, i) => {
            const t = typeof c === 'number' ? fmtC(c) : c;
            return (
              <text key={i} x={c0 + i * cw + cw / 2} y={2 + rh * (j + 1.5) + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={c === '?' ? RED : INK}>
                {t}
              </text>
            );
          })}
        </g>
      ))}
      {Array.from({ length: rows.length + 2 }, (_, j) => (
        <line key={`h${j}`} x1="2" x2={W - 2} y1={2 + rh * j} y2={2 + rh * j} stroke="#64748b" strokeWidth="1.2" />
      ))}
      {Array.from({ length: head.length + 1 }, (_, i) => (
        <line key={`v${i}`} x1={c0 + i * cw} x2={c0 + i * cw} y1="2" y2={H - 2} stroke="#64748b" strokeWidth="1.2" />
      ))}
      <line x1="2" x2="2" y1="2" y2={H - 2} stroke="#64748b" strokeWidth="1.2" />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Két (vagy több) hőmérő betűvel – összehasonlításhoz (az 1. lecke ThermoRow-ja)
// ---------------------------------------------------------------------------
export const CompareThermosSvg: React.FC<{ values: number[]; min?: number; max?: number; letters?: string[]; className?: string }> = ({ values, min = -10, max = 10, letters = ['A', 'B', 'C', 'D'], className }) => (
  <ThermoRow items={values.map((v, i) => ({ value: v, caption: letters[i] }))} min={min} max={max} labelStep={5} h={120} className={className ?? `w-full ${values.length > 2 ? 'max-w-[300px]' : 'max-w-[200px]'} h-auto mx-auto`} />
);
