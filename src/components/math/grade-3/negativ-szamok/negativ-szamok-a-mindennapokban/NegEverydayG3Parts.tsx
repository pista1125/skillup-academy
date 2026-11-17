import React from 'react';

// ---------------------------------------------------------------------------
// Közös rajzelemek a IX. témakör (negatív számok) 3. osztályos leckéihez.
// A mínuszjel a tankönyv szerint nagykötőjel: „–3 °C”.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const MINUS = '–';

/** Szám a könyv írásmódjával: –3, 0, 5. */
export const fmt = (n: number): string => (n < 0 ? `${MINUS}${-n}` : `${n}`);
/** Hőmérséklet: „–3 °C”. */
export const fmtC = (n: number): string => `${fmt(n)} °C`;

export const RED = '#dc2626';
export const BLUE = '#2563eb';
export const INK = '#0f172a';

export interface ThermoProps {
  /** a cső középvonala */
  cx: number;
  /** a skála legfelső értékének y-ja */
  yTop: number;
  /** a skála legalsó értékének y-ja */
  yBot: number;
  min: number;
  max: number;
  /** a folyadékoszlop teteje; null = üres hőmérő */
  value?: number | null;
  /** ilyen lépésenként van felirat (5 vagy 10) */
  labelStep?: number;
  /** csak ezek a feliratok (pl. [0]) */
  labels?: number[];
  /** a cső szélessége */
  tw?: number;
  fs?: number;
  /** „°C” felirat a cső tetején */
  unit?: boolean;
  /** kék, szaggatott vonal a 0-nál (fagypont) */
  zeroLine?: boolean;
  /** fehér keret a hőmérő körül */
  frame?: boolean;
  /** a folyadék színe */
  liquid?: string;
  /** a vonalkák vastagsága */
  tick?: number;
}

/** Az érték y-ja a hőmérőn. */
export const thermoY = (p: Pick<ThermoProps, 'yTop' | 'yBot' | 'min' | 'max'>, v: number) => p.yBot - ((v - p.min) / (p.max - p.min)) * (p.yBot - p.yTop);

/** Álló hőmérő: bal oldalt a feliratok, jobb oldalt a vonalkák (1 fokonként). */
export const Thermo: React.FC<ThermoProps> = (p) => {
  const { cx, yTop, yBot, min, max, value = null, labelStep = 5, labels, tw = 10, fs = 12, unit = true, zeroLine = false, frame = true, liquid = RED, tick = 1.2 } = p;
  const y = (v: number) => thermoY(p, v);
  const r = tw * 0.95;
  const bulbY = yBot + r + 4;
  const ticks: number[] = [];
  for (let v = min; v <= max; v++) ticks.push(v);
  const isLabel = (v: number) => (labels ? labels.includes(v) : v % labelStep === 0);
  const labelW = fs * 2.2;
  return (
    <g fontFamily={FONT}>
      {frame && <rect x={cx - tw / 2 - labelW - 8} y={yTop - fs - 12} width={labelW + tw + 30} height={bulbY + r + 6 - (yTop - fs - 12)} rx="6" fill="#fffdf5" stroke="#94a3b8" strokeWidth="1.5" />}
      {unit && (
        <text x={cx + tw / 2 + 4} y={yTop - 8} fontSize={fs} fontWeight="bold" fill={INK}>
          °C
        </text>
      )}
      {/* cső */}
      <rect x={cx - tw / 2} y={yTop - 6} width={tw} height={bulbY - (yTop - 6)} rx={tw / 2} fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
      {/* folyadék */}
      {value !== null && <rect x={cx - tw * 0.22} y={y(value)} width={tw * 0.44} height={bulbY - y(value)} fill={liquid} />}
      <circle cx={cx} cy={bulbY} r={r} fill={liquid} stroke="#475569" strokeWidth="1.5" />
      {/* vonalkák */}
      {ticks.map((v) => {
        const big = isLabel(v) || v % 5 === 0;
        return <line key={v} x1={cx + tw / 2} x2={cx + tw / 2 + (big ? 9 : 5)} y1={y(v)} y2={y(v)} stroke={v === 0 ? BLUE : '#334155'} strokeWidth={big ? tick * 1.4 : tick} />;
      })}
      {ticks.filter(isLabel).map((v) => (
        <g key={`l${v}`}>
          <line x1={cx - tw / 2 - 5} x2={cx - tw / 2} y1={y(v)} y2={y(v)} stroke={v === 0 ? BLUE : '#334155'} strokeWidth={tick * 1.4} />
          <text x={cx - tw / 2 - 7} y={y(v) + fs * 0.36} textAnchor="end" fontSize={fs} fontWeight="bold" fill={v === 0 ? BLUE : INK}>
            {fmt(v)}
          </text>
        </g>
      ))}
      {zeroLine && <line x1={cx - tw / 2 - labelW - 4} x2={cx + tw / 2 + 22} y1={y(0)} y2={y(0)} stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 3" />}
    </g>
  );
};

/** Önálló hőmérő-ábra (kvízhez, laborhoz). */
export const ThermoSvg: React.FC<{
  min?: number;
  max?: number;
  value?: number | null;
  labelStep?: number;
  labels?: number[];
  h?: number;
  zeroLine?: boolean;
  className?: string;
  caption?: string;
}> = ({ min = -10, max = 10, value = null, labelStep = 5, labels, h = 150, zeroLine = false, className = 'w-full max-w-[150px] h-auto mx-auto', caption }) => {
  const fs = 12;
  const W = 100;
  const yTop = fs + 22;
  const H = yTop + h + 36 + (caption ? 20 : 0);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <Thermo cx={58} yTop={yTop} yBot={yTop + h} min={min} max={max} value={value} labelStep={labelStep} labels={labels} fs={fs} zeroLine={zeroLine} />
      {caption && (
        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK} fontFamily={FONT}>
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Több hőmérő egymás mellett, betűvel vagy névvel alattuk. */
export const ThermoRow: React.FC<{
  items: { value: number | null; caption: string }[];
  min?: number;
  max?: number;
  labelStep?: number;
  h?: number;
  className?: string;
}> = ({ items, min = -10, max = 10, labelStep = 5, h = 120, className = 'w-full max-w-[300px] h-auto mx-auto' }) => {
  const step = 76;
  const W = items.length * step + 8;
  const yTop = 34;
  const H = yTop + h + 58;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {items.map((it, i) => (
        <g key={i}>
          <Thermo cx={i * step + 50} yTop={yTop} yBot={yTop + h} min={min} max={max} value={it.value} labelStep={labelStep} fs={11} />
          <text x={i * step + 42} y={H - 6} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
            {it.caption}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Ház metszetben: emeletek, földszint, pince, mélygarázs (a lift gombjainak számaival)
// ---------------------------------------------------------------------------
export interface Floor {
  n: number;
  name: string;
  /** a gomb felirata; ha nincs megadva, a szint száma */
  show?: string;
  hl?: boolean;
}

export const DEFAULT_FLOORS: Floor[] = [
  { n: 2, name: '2. emelet' },
  { n: 1, name: '1. emelet' },
  { n: 0, name: 'földszint' },
  { n: -1, name: 'pince' },
  { n: -2, name: 'mélygarázs' }
];

/** Ház-metszet a 240 széles lapon. A föld alatti szintek barna földben. */
export const BuildingSvg: React.FC<{ floors?: Floor[]; className?: string; car?: boolean }> = ({ floors = DEFAULT_FLOORS, className = 'w-full max-w-[300px] h-auto mx-auto', car = false }) => {
  const fh = 30;
  const top = 26;
  const above = floors.filter((f) => f.n >= 0).length;
  const groundY = top + above * fh;
  const H = top + floors.length * fh + 10;
  return (
    <svg viewBox={`0 0 240 ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="0" y="0" width="240" height={groundY} fill="#e0f2fe" />
      <rect x="0" y={groundY} width="240" height={H - groundY} fill="#d6b48a" />
      {/* tető */}
      <path d={`M24 ${top} L90 4 L156 ${top} Z`} fill="#f87171" stroke="#7f1d1d" strokeWidth="2" />
      {floors.map((f, i) => {
        const y = top + i * fh;
        const under = f.n < 0;
        return (
          <g key={f.n}>
            <rect x="30" y={y} width="120" height={fh} fill={f.hl ? '#fde68a' : under ? '#e7e5e4' : '#ffffff'} stroke="#475569" strokeWidth="2" />
            <text x={car && f.n === -2 ? 76 : 90} y={y + fh / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
              {f.name}
            </text>
            {/* liftgomb */}
            <circle cx="190" cy={y + fh / 2} r="12" fill={f.show === '?' ? '#fee2e2' : '#ffffff'} stroke={f.show === '?' ? RED : '#475569'} strokeWidth="2" />
            <text x="190" y={y + fh / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={f.show === '?' ? RED : INK}>
              {f.show ?? fmt(f.n)}
            </text>
          </g>
        );
      })}
      {car && (() => {
        const i = floors.findIndex((f) => f.n === -2);
        if (i < 0) return null;
        const y = top + i * fh + fh / 2;
        return (
          <g>
            <rect x="122" y={y - 3} width="22" height="9" rx="3" fill={BLUE} />
            <circle cx="127" cy={y + 7} r="3" fill={INK} />
            <circle cx="139" cy={y + 7} r="3" fill={INK} />
          </g>
        );
      })()}
      <line x1="0" x2="240" y1={groundY} y2={groundY} stroke="#78350f" strokeWidth="3" />
      <text x="236" y={groundY - 5} textAnchor="end" fontSize="10" fontWeight="bold" fill="#78350f">
        föld
      </text>
      <text x="190" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
        lift
      </text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Kis ikonok (hó, nap, felhő) az időjárás-jelentéshez
// ---------------------------------------------------------------------------
export const SunIcon: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 9 }) => (
  <g>
    {Array.from({ length: 8 }, (_, k) => {
      const a = (k * Math.PI) / 4;
      return <line key={k} x1={x + Math.cos(a) * (r + 2)} y1={y + Math.sin(a) * (r + 2)} x2={x + Math.cos(a) * (r + 6)} y2={y + Math.sin(a) * (r + 6)} stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />;
    })}
    <circle cx={x} cy={y} r={r} fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
  </g>
);

export const CloudIcon: React.FC<{ x: number; y: number; k?: number; fill?: string }> = ({ x, y, k = 1, fill = '#cbd5e1' }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d="M-14 6 a8 8 0 0 1 2 -14 a10 10 0 0 1 18 -2 a8 8 0 0 1 8 16 Z" fill={fill} stroke="#64748b" strokeWidth="1.5" />
  </g>
);

export const SnowIcon: React.FC<{ x: number; y: number; r?: number; color?: string; sw?: number }> = ({ x, y, r = 8, color = '#0ea5e9', sw = 2 }) => (
  <g stroke={color} strokeWidth={sw} strokeLinecap="round">
    {[0, 60, 120].map((d) => {
      const a = (d * Math.PI) / 180;
      return <line key={d} x1={x - Math.cos(a) * r} y1={y - Math.sin(a) * r} x2={x + Math.cos(a) * r} y2={y + Math.sin(a) * r} />;
    })}
  </g>
);

export type Weather = 'sun' | 'cloud' | 'snow' | 'suncloud';

export interface DayForecast {
  day: string;
  w: Weather;
  /** nappali legmagasabb */
  hi: number | string;
  /** éjszakai legalacsonyabb */
  lo: number | string;
}

/** Időjárás-jelentés napokra: piros kör = nappal, kék kör = éjjel. */
export const ForecastSvg: React.FC<{ days: DayForecast[]; className?: string }> = ({ days, className = 'w-full max-w-[300px] h-auto mx-auto' }) => {
  const cw = 56;
  const W = days.length * cw + 8;
  const H = 150;
  const show = (v: number | string) => (typeof v === 'number' ? fmt(v) : v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {days.map((d, i) => {
        const x = 4 + i * cw + cw / 2;
        return (
          <g key={i}>
            <rect x={4 + i * cw} y="4" width={cw} height={H - 8} fill={i % 2 ? '#f8fafc' : '#ffffff'} stroke="#94a3b8" strokeWidth="1.2" />
            <text x={x} y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
              {d.day}
            </text>
            {d.w === 'sun' && <SunIcon x={x} y={44} r={8} />}
            {d.w === 'cloud' && <CloudIcon x={x - 2} y={48} />}
            {d.w === 'suncloud' && (
              <g>
                <SunIcon x={x + 6} y={40} r={7} />
                <CloudIcon x={x - 4} y={52} k={0.85} fill="#e2e8f0" />
              </g>
            )}
            {d.w === 'snow' && (
              <g>
                <CloudIcon x={x - 2} y={42} k={0.9} />
                <SnowIcon x={x - 8} y={58} r={4} sw={1.6} />
                <SnowIcon x={x + 8} y={58} r={4} sw={1.6} />
              </g>
            )}
            <circle cx={x} cy="88" r="15" fill={typeof d.hi === 'string' ? '#ffffff' : RED} stroke={RED} strokeWidth="2" />
            <text x={x} y="93.5" textAnchor="middle" fontSize="14" fontWeight="bold" fill={typeof d.hi === 'string' ? RED : '#ffffff'}>
              {show(d.hi)}
            </text>
            <circle cx={x} cy="124" r="15" fill={typeof d.lo === 'string' ? '#ffffff' : BLUE} stroke={BLUE} strokeWidth="2" />
            <text x={x} y="129.5" textAnchor="middle" fontSize="14" fontWeight="bold" fill={typeof d.lo === 'string' ? BLUE : '#ffffff'}>
              {show(d.lo)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Hőmérőfajták ikonjai (lázmérő, fürdővíz-hőmérő, kinti hőmérő) – <g>-ként, (0,0) középponttal
// ---------------------------------------------------------------------------
/** Digitális lázmérő: ferde rúd kijelzővel. */
export const FeverThermoIcon: React.FC<{ x: number; y: number; k?: number; text?: string }> = ({ x, y, k = 1, text = '' }) => (
  <g transform={`translate(${x} ${y}) scale(${k}) rotate(-25)`}>
    <rect x="-34" y="-7" width="62" height="14" rx="7" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
    <rect x="-30" y="-4.5" width="26" height="9" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />
    {text && (
      <text x="-17" y="3" textAnchor="middle" fontSize="8" fontWeight="bold" fill={INK} fontFamily={FONT}>
        {text}
      </text>
    )}
    <rect x="28" y="-2.5" width="12" height="5" rx="2.5" fill="#94a3b8" />
  </g>
);

/** Fürdővíz-hőmérő: kis halacska hőmérővel. */
export const BathThermoIcon: React.FC<{ x: number; y: number; k?: number }> = ({ x, y, k = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d="M-26 0 C-14 -18 14 -18 22 0 C14 18 -14 18 -26 0 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
    <path d="M22 0 L36 -12 L36 12 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
    <circle cx="-15" cy="-4" r="2.6" fill={INK} />
    <rect x="-6" y="-3" width="22" height="6" rx="3" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.2" />
    <rect x="-4" y="-1" width="12" height="2" fill={RED} />
  </g>
);

/** Kinti (ablak-) hőmérő: lapos tábla csővel. */
export const WallThermoIcon: React.FC<{ x: number; y: number; k?: number }> = ({ x, y, k = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <rect x="-11" y="-32" width="22" height="64" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="3" />
    <rect x="-2.5" y="-26" width="5" height="44" rx="2.5" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
    <rect x="-1.2" y="-2" width="2.4" height="22" fill={BLUE} />
    <circle cx="0" cy="22" r="4.5" fill={BLUE} />
    {[-22, -14, -6, 2, 10].map((t) => (
      <line key={t} x1="4" x2="8" y1={t} y2={t} stroke="#475569" strokeWidth="1.2" />
    ))}
  </g>
);

/** Búvár a víz alatt, méterskálával (0 = vízfelszín). */
export const DiverSvg: React.FC<{ depth?: number; label?: string; className?: string }> = ({ depth = 3, label, className = 'w-full max-w-[280px] h-auto mx-auto' }) => {
  const y0 = 40;
  const step = 22;
  const y = (m: number) => y0 - m * step;
  return (
    <svg viewBox="0 0 240 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="0" y="0" width="240" height={y0} fill="#e0f2fe" />
      <rect x="0" y={y0} width="240" height={190 - y0} fill="#7dd3fc" />
      <path d={`M0 ${y0} q15 -5 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`} fill="none" stroke="#0369a1" strokeWidth="2" />
      {/* hajó */}
      <path d={`M150 ${y0 - 2} l40 0 l-8 -12 l-26 0 Z`} fill="#f97316" stroke="#7c2d12" strokeWidth="2" />
      {/* skála */}
      <line x1="40" x2="40" y1={y(1)} y2={y(-6)} stroke={INK} strokeWidth="2" />
      {[1, 0, -1, -2, -3, -4, -5, -6].map((m) => (
        <g key={m}>
          <line x1="34" x2="46" y1={y(m)} y2={y(m)} stroke={m === 0 ? BLUE : INK} strokeWidth={m === 0 ? 3 : 2} />
          <text x="30" y={y(m) + 4.5} textAnchor="end" fontSize="12" fontWeight="bold" fill={m === 0 ? '#1e3a8a' : INK}>
            {fmt(m)}
          </text>
        </g>
      ))}
      <text x="48" y="14" fontSize="11" fontWeight="bold" fill={INK}>
        méter
      </text>
      {/* búvár */}
      <g transform={`translate(120 ${y(-depth)})`}>
        <ellipse cx="0" cy="0" rx="22" ry="7" fill={INK} />
        <circle cx="-24" cy="-2" r="7" fill="#fcd34d" stroke={INK} strokeWidth="2" />
        <rect x="-29" y="-6" width="9" height="6" rx="2" fill="#bae6fd" stroke={INK} strokeWidth="1.2" />
        <rect x="-8" y="-13" width="18" height="7" rx="3" fill="#facc15" stroke={INK} strokeWidth="1.2" />
        <path d="M22 0 l14 -7 l0 14 Z" fill="#16a34a" />
      </g>
      <line x1="50" x2="92" y1={y(-depth)} y2={y(-depth)} stroke={RED} strokeWidth="2" strokeDasharray="4 3" />
      {label && (
        <text x="200" y={y(-depth) + 30} textAnchor="middle" fontSize="16" fontWeight="bold" fill={RED}>
          {label}
        </text>
      )}
    </svg>
  );
};

/** Liftkezelő: gombok egymás alatt (felül a legmagasabb szint). */
export const LiftPanelSvg: React.FC<{ buttons: number[]; hl?: number; className?: string }> = ({ buttons, hl, className = 'w-full max-w-[120px] h-auto mx-auto' }) => {
  const H = buttons.length * 36 + 16;
  return (
    <svg viewBox={`0 0 80 ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="6" y="4" width="68" height={H - 8} rx="10" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
      {buttons.map((b, i) => (
        <g key={b}>
          <circle cx="40" cy={26 + i * 36} r="14" fill={b === hl ? '#fde68a' : '#ffffff'} stroke="#f59e0b" strokeWidth="3" />
          <text x="40" y={31.5 + i * 36} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
            {fmt(b)}
          </text>
        </g>
      ))}
    </svg>
  );
};
