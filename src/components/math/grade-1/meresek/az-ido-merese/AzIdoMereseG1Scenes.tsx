// „Az idő mérése” – a mese és a játék képei (Zümi szombati mézes uzsonnája: napszakok, a hét napjai, évszakok, óra).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

/* ------------------------------------------------------------------ alapok */

export const DAYS = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'] as const;
export const NAPSZAK = ['reggel', 'délelőtt', 'délben', 'délután', 'este', 'éjjel'] as const;
export const SEASONS = ['tavasz', 'nyár', 'ősz', 'tél'] as const;
export type Napszak = 0 | 1 | 2 | 3 | 4 | 5;
export type Season = 0 | 1 | 2 | 3;

const INK = '#1e293b';
const pt = (cx: number, cy: number, len: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [cx + len * Math.sin(a), cy - len * Math.cos(a)];
};

export const garden = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 60} Q${w / 3} ${h - 85} ${w / 2} ${h - 65} T${w} ${h - 70} V${h} H0 Z`} fill="#86efac" />
  </>
);

const qMark = (x: number, y: number, size = 34, key: React.Key = 'q') => (
  <text key={key} x={x} y={y + size * 0.35} textAnchor="middle" fontSize={size} fontWeight="900" fill="#7c3aed">
    ?
  </text>
);

/* ------------------------------------------------------------------ óra */

/**
 * Számlapos óra: a nagymutató (hosszú, kék) mindig a 12-esen áll, a kismutató (rövid, vastag, piros) az egész órát mutatja.
 * h = undefined: mutatók nélkül.
 */
export const clock = (cx: number, cy: number, r: number, h?: number, rim = '#0ea5e9', key: React.Key = 'c') => (
  <g key={key}>
    <circle cx={cx} cy={cy} r={r} fill="#fffbeb" stroke={rim} strokeWidth={Math.max(3, r * 0.09)} />
    {Array.from({ length: 12 }, (_, i) => {
      const [x1, y1] = pt(cx, cy, r * 0.9, i * 30);
      const [x2, y2] = pt(cx, cy, r * 0.82, i * 30);
      return <path key={`t${i}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={INK} strokeWidth={Math.max(1.5, r * 0.03)} strokeLinecap="round" />;
    })}
    {Array.from({ length: 12 }, (_, i) => {
      const n = i + 1;
      const [x, y] = pt(cx, cy, r * 0.66, n * 30);
      return (
        <text key={`n${n}`} x={x} y={y + r * 0.08} textAnchor="middle" fontSize={r * 0.22} fontWeight="800" fill={INK}>
          {n}
        </text>
      );
    })}
    {h !== undefined && (
      <>
        <path d={`M${cx} ${cy} L${pt(cx, cy, r * 0.74, 0).join(' ')}`} stroke="#2563eb" strokeWidth={Math.max(2.5, r * 0.05)} strokeLinecap="round" />
        <path d={`M${cx} ${cy} L${pt(cx, cy, r * 0.46, h * 30).join(' ')}`} stroke="#dc2626" strokeWidth={Math.max(4, r * 0.1)} strokeLinecap="round" />
      </>
    )}
    <circle cx={cx} cy={cy} r={Math.max(3, r * 0.07)} fill={INK} />
  </g>
);

export const CLOCK_RIMS = ['#0ea5e9', '#ef4444', '#22c55e', '#a855f7', '#f59e0b', '#ec4899'];
export const RIM_SAY = ['a kék óra', 'a piros óra', 'a zöld óra', 'a lila óra', 'a narancssárga óra', 'a rózsaszín óra'];

/** Egy óra kártyaként (válaszlehetőségnek). */
export const ClockFig: React.FC<{ h?: number; rim?: string; className?: string }> = ({ h, rim = '#0ea5e9', className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 120 120" className={className}>
    {clock(60, 60, 54, h, rim)}
  </svg>
);

/* ------------------------------------------------------------------ napszakok */

const SKY = ['#fbcfe8', '#bae6fd', '#7dd3fc', '#bae6fd', '#fdba74', '#1e3a8a'];
/** A nap útja balról jobbra: reggel felkel bal oldalt, délben legfelül, este lemegy jobb oldalt. */
const SUN: [number, number][] = [
  [0.16, 0.74],
  [0.3, 0.36],
  [0.5, 0.2],
  [0.7, 0.36],
  [0.84, 0.74],
];

/** Égbolt-kártya egy napszakhoz (x, y bal felső sarok). */
export const sky = (t: Napszak, x: number, y: number, w = 120, h = 90, key: React.Key = 's') => {
  const night = t === 5;
  const sr = Math.min(w, h) * 0.13;
  const clipId = `sky-${t}-${String(key)}-${Math.round(x)}-${Math.round(y)}`;
  return (
    <g key={key}>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={w} height={h} rx="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x={x} y={y} width={w} height={h} fill={SKY[t]} />
        {night ? (
          <>
            <circle cx={x + w * 0.72} cy={y + h * 0.28} r={sr * 1.1} fill="#fef08a" />
            <circle cx={x + w * 0.72 + sr * 0.55} cy={y + h * 0.28 - sr * 0.3} r={sr} fill={SKY[5]} />
            {[
              [0.18, 0.2],
              [0.38, 0.38],
              [0.5, 0.14],
              [0.9, 0.5],
            ].map(([a, b], i) => ICONS.csillag({ x: x + w * a, y: y + h * b, s: (w / 120) * 0.32, key: `st${i}` }))}
          </>
        ) : (
          <>
            <circle cx={x + w * SUN[t][0]} cy={y + h * SUN[t][1]} r={sr} fill={t === 0 || t === 4 ? '#f97316' : '#facc15'} stroke="#ea580c" strokeWidth="2" />
            {t >= 1 && t <= 3 &&
              Array.from({ length: 8 }, (_, i) => {
                const [x1, y1] = pt(x + w * SUN[t][0], y + h * SUN[t][1], sr * 1.35, i * 45);
                const [x2, y2] = pt(x + w * SUN[t][0], y + h * SUN[t][1], sr * 1.75, i * 45);
                return <path key={`r${i}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />;
              })}
          </>
        )}
        <path d={`M${x} ${y + h * 0.78} Q${x + w * 0.3} ${y + h * 0.66} ${x + w * 0.55} ${y + h * 0.76} T${x + w} ${y + h * 0.74} V${y + h} H${x} Z`} fill={night ? '#166534' : '#4ade80'} />
      </g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="none" stroke="#475569" strokeWidth="3" />
    </g>
  );
};

export const SkyFig: React.FC<{ t: Napszak; className?: string }> = ({ t, className = 'w-28 h-20' }) => (
  <svg viewBox="0 0 124 94" className={className}>
    {sky(t, 2, 2, 120, 90)}
  </svg>
);
export const skyOpt = (t: Napszak) => ({ figure: <SkyFig t={t} />, say: NAPSZAK[t] });

/** A napszakok sorban (felirattal), a `hide` helyén kérdőjel. */
export const NapszakScene: React.FC<{ show?: Napszak[]; hide?: number; labels?: boolean }> = ({ show = [0, 1, 2, 3, 4, 5], hide, labels = true }) => {
  const n = show.length;
  const w = Math.min(100, (464 - (n - 1) * 8) / n);
  const h = w * 0.75;
  const x0 = (480 - (n * w + (n - 1) * 8)) / 2;
  return (
    <svg viewBox="0 0 480 150" className="w-full h-auto">
      <rect x="0" y="0" width="480" height="150" rx="18" fill="#f8fafc" />
      {show.map((t, i) => {
        const x = x0 + i * (w + 8);
        const y = 20;
        if (i === hide)
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" strokeDasharray="7 5" />
              {qMark(x + w / 2, y + h / 2, 40)}
            </g>
          );
        return (
          <g key={i}>
            {sky(t, x, y, w, h, `k${i}`)}
            {labels && (
              <text x={x + w / 2} y={y + h + 24} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>
                {NAPSZAK[t]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ tevékenységek */

export type Activity = 'reggeli' | 'ebed' | 'alvas' | 'jatek' | 'iskola';
export const ACTIVITY_SAY: Record<Activity, string> = {
  reggeli: 'Pötyi reggelizik',
  ebed: 'Pötyi ebédel',
  alvas: 'Pötyi alszik',
  jatek: 'Pötyi labdázik',
  iskola: 'Pötyi iskolába megy',
};

/** Tevékenység-kép 120×100-as dobozban (égbolt nélkül, hogy ne árulja el a napszakot). */
export const activity = (k: Activity, x: number, y: number, key: React.Key = 'a') => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <rect x="0" y="0" width="120" height="100" rx="12" fill="#fff7ed" stroke="#cbd5e1" strokeWidth="3" />
    {k === 'reggeli' && (
      <>
        <rect x="18" y="40" width="34" height="38" rx="6" fill="#f472b6" stroke={INK} strokeWidth="2.5" />
        <path d="M52 48 q14 2 0 20" fill="none" stroke={INK} strokeWidth="3" />
        <path d="M26 34 q4 -8 0 -14 M40 34 q4 -8 0 -14" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M66 72 Q74 48 90 52 Q106 56 104 74 Q92 66 84 76 Q76 66 66 72 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M12 82 H108" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
      </>
    )}
    {k === 'ebed' && (
      <>
        <ellipse cx="60" cy="70" rx="44" ry="14" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <path d="M24 62 Q60 96 96 62 Z" fill="#fde68a" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <ellipse cx="60" cy="62" rx="36" ry="7" fill="#fb923c" stroke={INK} strokeWidth="2" />
        <path d="M46 48 q4 -8 0 -16 M60 48 q4 -8 0 -16 M74 48 q4 -8 0 -16" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M104 30 L96 64" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="105" cy="26" rx="6" ry="9" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      </>
    )}
    {k === 'alvas' && (
      <>
        <rect x="10" y="62" width="100" height="18" rx="4" fill="#60a5fa" stroke={INK} strokeWidth="2.5" />
        <path d="M14 80 V92 M106 80 V92 M10 40 V92" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
        <rect x="14" y="50" width="30" height="14" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
        <Potyi mood="sleep" dots={7} x={26} y={20} size={52} />
        <path d="M54 62 Q80 46 108 62" fill="#93c5fd" stroke={INK} strokeWidth="2.5" />
        <text x="96" y="30" fontSize="16" fontWeight="900" fill="#6366f1">z</text>
        <text x="104" y="18" fontSize="12" fontWeight="900" fill="#6366f1">z</text>
      </>
    )}
    {k === 'jatek' && (
      <>
        <Potyi mood="cheer" dots={7} x={8} y={22} size={64} />
        {ICONS.labda({ x: 90, y: 48, s: 0.9 })}
        <path d="M8 90 H112" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
      </>
    )}
    {k === 'iskola' && (
      <>
        <rect x="30" y="26" width="60" height="62" rx="10" fill="#3b82f6" stroke={INK} strokeWidth="3" />
        <path d="M44 26 Q60 6 76 26" fill="none" stroke={INK} strokeWidth="4" />
        <rect x="38" y="52" width="44" height="26" rx="5" fill="#93c5fd" stroke={INK} strokeWidth="2.5" />
        <circle cx="60" cy="44" r="4" fill="#facc15" stroke={INK} strokeWidth="2" />
        <path d="M94 88 L108 40 L114 42 L100 90 Z" fill="#22c55e" stroke={INK} strokeWidth="2" />
      </>
    )}
  </g>
);

export const ActivityFig: React.FC<{ k: Activity; className?: string }> = ({ k, className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 124 104" className={className}>
    {activity(k, 2, 2)}
  </svg>
);
export const actOpt = (k: Activity) => ({ figure: <ActivityFig k={k} />, say: ACTIVITY_SAY[k] });

/** Tevékenységek sorban, nyilakkal (előbb → később); a `hide` helyén kérdőjel. */
export const ActivityRowScene: React.FC<{ acts: Activity[]; hide?: number; arrows?: boolean }> = ({ acts, hide, arrows = true }) => {
  const n = acts.length;
  const gap = 34;
  const x0 = (480 - (n * 120 + (n - 1) * gap)) / 2;
  return (
    <svg viewBox="0 0 480 130" className="w-full h-auto">
      <rect x="0" y="0" width="480" height="130" rx="18" fill="#f8fafc" />
      {acts.map((k, i) => {
        const x = x0 + i * (120 + gap);
        return (
          <g key={i}>
            {i === hide ? (
              <g>
                <rect x={x} y="15" width="120" height="100" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" strokeDasharray="7 5" />
                {qMark(x + 60, 65, 44)}
              </g>
            ) : (
              activity(k, x, 15)
            )}
            {arrows && i < n - 1 && <path d={`M${x + 126} 65 h${gap - 14} m-8 -7 l8 7 l-8 7`} stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ a hét napjai */

/** Naptárlap egy naphoz (x, y bal felső sarok). A vasárnap piros, mint a naptárban. */
const dayCard = (d: number, x: number, y: number, w: number, h: number, opts: { num?: number; today?: boolean; key?: React.Key } = {}) => {
  const red = d === 6;
  return (
    <g key={opts.key ?? `d${d}`}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={opts.today ? '#dcfce7' : '#fffbeb'} stroke={opts.today ? '#16a34a' : '#a16207'} strokeWidth={opts.today ? 4 : 2.5} />
      {Array.from({ length: 3 }, (_, i) => (
        <circle key={i} cx={x + (w * (i + 1)) / 4} cy={y + 7} r="3" fill="#64748b" />
      ))}
      <text x={x + w / 2} y={y + 28} textAnchor="middle" fontSize={Math.min(13, w * 0.21)} fontWeight="900" fill={red ? '#dc2626' : INK} textLength={DAYS[d].length > 6 ? w - 8 : undefined} lengthAdjust="spacingAndGlyphs">
        {DAYS[d].toUpperCase()}
      </text>
      {opts.num !== undefined && (
        <text x={x + w / 2} y={y + h - 14} textAnchor="middle" fontSize={Math.min(28, w * 0.45)} fontWeight="900" fill={red ? '#dc2626' : '#475569'}>
          {opts.num}.
        </text>
      )}
    </g>
  );
};

/** Egy nap kártyaként (válaszlehetőségnek): naptárlap a nap nevével. */
export const DayFig: React.FC<{ d: number; className?: string }> = ({ d, className = 'w-28 h-16' }) => (
  <svg viewBox="0 0 124 64" className={className}>
    <rect x="2" y="2" width="120" height="60" rx="10" fill="#fffbeb" stroke="#a16207" strokeWidth="3" />
    <text x="62" y="41" textAnchor="middle" fontSize="18" fontWeight="900" fill={d === 6 ? '#dc2626' : INK} textLength={DAYS[d].length > 7 ? 108 : undefined} lengthAdjust="spacingAndGlyphs">
      {DAYS[d]}
    </text>
  </svg>
);
export const dayOpt = (d: number) => ({ figure: <DayFig d={d} />, say: DAYS[d] });

/**
 * A hét napjai naptárlapokon. days = a napok sorszáma (0 = hétfő), hide = a kérdőjeles lap HELYE a sorban,
 * nums = a hét hányadik napja (1.–7.), today/party = HELYEK a sorban, sleeps = holdacskák az alvások helyén today és party között.
 */
export const WeekScene: React.FC<{ days?: number[]; hide?: number; nums?: boolean; today?: number; party?: number; sleeps?: boolean }> = ({
  days = [0, 1, 2, 3, 4, 5, 6],
  hide,
  nums = false,
  today,
  party,
  sleeps = false,
}) => {
  const n = days.length;
  const gap = 6;
  const w = Math.min(84, (468 - (n - 1) * gap) / n);
  const h = nums ? 84 : 52;
  const x0 = (480 - (n * w + (n - 1) * gap)) / 2;
  const y = 52;
  const H = y + h + 26;
  return (
    <svg viewBox={`0 0 480 ${H}`} className="w-full h-auto">
      <rect x="0" y="0" width="480" height={H} rx="18" fill="#f8fafc" />
      {days.map((d, i) => {
        const x = x0 + i * (w + gap);
        if (i === hide)
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" strokeDasharray="6 4" />
              {qMark(x + w / 2, y + h / 2, 34, `q${i}`)}
            </g>
          );
        return dayCard(d, x, y, w, h, { num: nums ? d + 1 : undefined, today: i === today, key: i });
      })}
      {today !== undefined && (
        <g>
          <Potyi mood="happy" dots={7} x={x0 + today * (w + gap) + w / 2 - 22} y={4} size={44} />
          <text x={x0 + today * (w + gap) + w / 2} y={y + h + 20} textAnchor="middle" fontSize="15" fontWeight="900" fill="#16a34a">
            MA
          </text>
        </g>
      )}
      {party !== undefined && (
        <g transform={`translate(${x0 + party * (w + gap) + w / 2} 26)`}>
          <path d="M-14 -6 h28 v18 q0 10 -14 10 q-14 0 -14 -10 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="2.5" />
          <rect x="-16" y="-14" width="32" height="9" rx="3" fill="#f59e0b" stroke="#92400e" strokeWidth="2.5" />
          {ICONS.meh({ x: 20, y: -10, s: 0.45 })}
        </g>
      )}
      {sleeps &&
        today !== undefined &&
        party !== undefined &&
        Array.from({ length: party - today }, (_, k) => {
          const cx = x0 + (today + k) * (w + gap) + w + gap / 2;
          return (
            <g key={`m${k}`}>
              <circle cx={cx} cy={y + h + 14} r="9" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
              <circle cx={cx + 5} cy={y + h + 10} r="8" fill="#f8fafc" />
            </g>
          );
        })}
    </svg>
  );
};

/* ------------------------------------------------------------------ évszakok */

const SEASON_BG = ['#dcfce7', '#fef9c3', '#ffedd5', '#e0f2fe'];

/** Egy fa az évszaknak megfelelően (x, y bal felső sarok, 120×100-as doboz). */
export const season = (s: Season, x: number, y: number, key: React.Key = 'sz') => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <rect x="0" y="0" width="120" height="100" rx="12" fill={SEASON_BG[s]} stroke="#475569" strokeWidth="3" />
    <path d="M3 86 H117 V88 Q117 97 108 97 H12 Q3 97 3 88 Z" fill={s === 3 ? '#fff' : s === 2 ? '#d6a35c' : '#4ade80'} />
    <path d="M56 88 V52 h8 V88 Z" fill="#92400e" stroke="#451a03" strokeWidth="2" />
    {s === 3 ? (
      <>
        <path d="M60 56 L40 30 M60 52 L80 28 M60 60 L30 50 M60 58 L92 48 M48 40 L44 24 M72 38 L78 22" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
        <path d="M36 30 q4 -4 8 0 M76 28 q4 -4 8 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        {[
          [14, 20],
          [100, 16],
          [22, 60],
          [104, 64],
          [88, 36],
        ].map(([a, b], i) => (
          <g key={i} stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
            <path d={`M${a - 5} ${b} h10 M${a} ${b - 5} v10 M${a - 4} ${b - 4} l8 8 M${a + 4} ${b - 4} l-8 8`} />
          </g>
        ))}
      </>
    ) : (
      <>
        <circle cx="60" cy="36" r="30" fill={s === 0 ? '#86efac' : s === 1 ? '#16a34a' : '#f97316'} stroke={s === 2 ? '#9a3412' : '#14532d'} strokeWidth="3" />
        {s === 0 &&
          [
            [44, 26],
            [62, 18],
            [76, 32],
            [52, 44],
            [70, 48],
          ].map(([a, b], i) => <circle key={i} cx={a} cy={b} r="5" fill="#f9a8d4" stroke="#db2777" strokeWidth="1.5" />)}
        {s === 0 &&
          [18, 100].map((a) => (
            <g key={a}>
              <path d={`M${a} 88 V72`} stroke="#15803d" strokeWidth="3" />
              <path d={`M${a} 72 q-6 2 -5 10 q5 -2 5 -10 q6 2 5 10 q-5 -2 -5 -10`} fill="#fff" stroke="#64748b" strokeWidth="1.5" />
            </g>
          ))}
        {s === 1 && (
          <>
            {[
              [46, 30],
              [70, 24],
              [64, 46],
            ].map(([a, b], i) => <circle key={i} cx={a} cy={b} r="5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />)}
            <circle cx="104" cy="16" r="9" fill="#facc15" stroke="#ea580c" strokeWidth="2" />
          </>
        )}
        {s === 2 &&
          [
            [20, 60, '#ea580c'],
            [96, 52, '#b45309'],
            [86, 78, '#dc2626'],
            [28, 82, '#f59e0b'],
          ].map(([a, b, c], i) => ICONS.level({ x: a as number, y: b as number, s: 0.32, color: c as string, key: i }))}
      </>
    )}
  </g>
);

export const SeasonFig: React.FC<{ s: Season; className?: string }> = ({ s, className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 124 104" className={className}>
    {season(s, 2, 2)}
  </svg>
);
export const seasonOpt = (s: Season) => ({ figure: <SeasonFig s={s} />, say: SEASONS[s] });

/** Évszakok sorban, nyilakkal; months: mindegyik alatt 3 kis naptárlap (3 hónap); hide = kérdőjeles HELY. */
export const SeasonsScene: React.FC<{ order?: Season[]; hide?: number; months?: boolean; labels?: boolean }> = ({ order = [0, 1, 2, 3], hide, months = false, labels = true }) => {
  const n = order.length;
  const gap = n > 2 ? 4 : 60;
  const scale = n > 3 ? 0.9 : 1;
  const cw = 120 * scale;
  const x0 = (480 - (n * cw + (n - 1) * gap)) / 2;
  const H = months ? 170 : labels ? 150 : 130;
  return (
    <svg viewBox={`0 0 480 ${H}`} className="w-full h-auto">
      <rect x="0" y="0" width="480" height={H} rx="18" fill="#f8fafc" />
      {order.map((s, i) => {
        const x = x0 + i * (cw + gap);
        return (
          <g key={i}>
            <g transform={`translate(${x} 12) scale(${scale})`}>
              {i === hide ? (
                <g>
                  <rect x="0" y="0" width="120" height="100" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" strokeDasharray="7 5" />
                  {qMark(60, 50, 44)}
                </g>
              ) : (
                season(s, 0, 0)
              )}
            </g>
            {labels && i !== hide && (
              <text x={x + cw / 2} y={12 + 100 * scale + 22} textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
                {SEASONS[s]}
              </text>
            )}
            {months &&
              Array.from({ length: 3 }, (_, k) => (
                <g key={k}>
                  <rect x={x + cw / 2 - 40 + k * 28} y={12 + 100 * scale + 32} width="24" height="22" rx="3" fill="#fff" stroke="#a16207" strokeWidth="2" />
                  <path d={`M${x + cw / 2 - 36 + k * 28} ${12 + 100 * scale + 37} h16`} stroke="#dc2626" strokeWidth="3" />
                </g>
              ))}
            {n <= 2 && i < n - 1 && <path d={`M${x + cw + 10} 62 h${gap - 20} m-9 -8 l9 8 l-9 8`} stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ tárgyak */

export type ObjKind =
  | 'szanko'
  | 'hoember'
  | 'sapka'
  | 'napernyo'
  | 'uszogumi'
  | 'fagyi'
  | 'hovirag'
  | 'szolo'
  | 'vekker'
  | 'karora'
  | 'kakukkos'
  | 'napora'
  | 'rud'
  | 'meterrud'
  | 'meroszalag'
  | 'merleg';

export const OBJ_SAY: Record<ObjKind, string> = {
  szanko: 'szánkó',
  hoember: 'hóember',
  sapka: 'sapka és sál',
  napernyo: 'napernyő',
  uszogumi: 'úszógumi',
  fagyi: 'fagylalt',
  hovirag: 'hóvirág',
  szolo: 'szőlő',
  vekker: 'ébresztőóra',
  karora: 'karóra',
  kakukkos: 'kakukkos óra',
  napora: 'napóra',
  rud: 'narancssárga rúd',
  meterrud: 'méterrúd',
  meroszalag: 'mérőszalag',
  merleg: 'kétkarú mérleg',
};

/** Tárgy a (0..100 × 0..100) dobozban. */
const objBody = (k: ObjKind) => {
  switch (k) {
    case 'szanko':
      return (
        <>
          <rect x="20" y="40" width="60" height="12" rx="3" fill="#b45309" stroke={INK} strokeWidth="2.5" />
          <path d="M28 52 V66 M72 52 V66" stroke={INK} strokeWidth="4" />
          <path d="M10 66 H82 Q94 66 92 54" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case 'hoember':
      return (
        <>
          <circle cx="50" cy="70" r="22" fill="#fff" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="50" cy="36" r="15" fill="#fff" stroke="#64748b" strokeWidth="2.5" />
          <rect x="38" y="12" width="24" height="10" fill={INK} />
          <rect x="34" y="20" width="32" height="4" fill={INK} />
          <circle cx="45" cy="34" r="2" fill={INK} />
          <circle cx="55" cy="34" r="2" fill={INK} />
          <path d="M50 38 l10 3 l-10 2 Z" fill="#f97316" />
          <circle cx="50" cy="62" r="2.5" fill={INK} />
          <circle cx="50" cy="72" r="2.5" fill={INK} />
        </>
      );
    case 'sapka':
      return (
        <>
          <path d="M24 56 Q24 22 50 22 Q76 22 76 56 Z" fill="#ef4444" stroke={INK} strokeWidth="2.5" />
          <rect x="20" y="52" width="60" height="12" rx="5" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="50" cy="18" r="7" fill="#fff" stroke={INK} strokeWidth="2" />
          <path d="M30 70 H78 V80 H64 V94 H52 V80 H30 Z" fill="#3b82f6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        </>
      );
    case 'napernyo':
      return (
        <>
          <path d="M50 30 L56 92" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M12 42 Q50 0 88 42 Q78 34 69 40 Q60 32 50 38 Q40 32 31 40 Q22 34 12 42 Z" fill="#ef4444" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M50 14 Q44 26 50 38 M31 40 Q34 24 50 14 M69 40 Q66 24 50 14" fill="none" stroke="#fff" strokeWidth="3" />
          <path d="M8 92 H92" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
        </>
      );
    case 'uszogumi':
      return (
        <>
          <circle cx="50" cy="54" r="30" fill="#f472b6" stroke={INK} strokeWidth="2.5" />
          <circle cx="50" cy="54" r="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <path d="M50 24 v17 M50 67 v17 M20 54 h17 M63 54 h17" stroke="#fff" strokeWidth="6" />
        </>
      );
    case 'fagyi':
      return (
        <>
          <path d="M34 46 L50 94 L66 46 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M38 52 l20 16 M62 52 l-20 16" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="50" cy="34" r="16" fill="#f9a8d4" stroke={INK} strokeWidth="2.5" />
          <circle cx="40" cy="44" r="11" fill="#fef3c7" stroke={INK} strokeWidth="2.5" />
          <circle cx="60" cy="44" r="11" fill="#a16207" stroke={INK} strokeWidth="2.5" />
        </>
      );
    case 'hovirag':
      return (
        <>
          {[34, 66].map((a) => (
            <g key={a}>
              <path d={`M${a} 92 V40 q0 -8 6 -10`} stroke="#15803d" strokeWidth="4" fill="none" />
              <path d={`M${a + 6} 30 q-10 6 -6 20 q6 -6 6 -20 q10 6 6 20 q-6 -6 -6 -20`} fill="#fff" stroke="#64748b" strokeWidth="2" />
              <path d={`M${a} 92 Q${a - 14} 70 ${a - 6} 54`} stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </>
      );
    case 'szolo':
      return (
        <>
          <path d="M50 10 V22" stroke="#78350f" strokeWidth="4" />
          <path d="M52 16 q16 -10 22 4 q-14 4 -22 -4" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          {[
            [38, 28],
            [50, 28],
            [62, 28],
            [44, 40],
            [56, 40],
            [32, 40],
            [68, 40],
            [38, 52],
            [50, 52],
            [62, 52],
            [44, 64],
            [56, 64],
            [50, 76],
          ].map(([a, b], i) => (
            <circle key={i} cx={a} cy={b} r="7" fill="#7c3aed" stroke="#3b0764" strokeWidth="1.5" />
          ))}
        </>
      );
    case 'vekker':
      return (
        <>
          <circle cx="26" cy="22" r="10" fill="#94a3b8" stroke={INK} strokeWidth="2.5" />
          <circle cx="74" cy="22" r="10" fill="#94a3b8" stroke={INK} strokeWidth="2.5" />
          <path d="M30 84 L22 96 M70 84 L78 96" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          {clock(50, 56, 34, 7, '#22c55e', 'v')}
        </>
      );
    case 'karora':
      return (
        <>
          <rect x="38" y="4" width="24" height="92" rx="8" fill="#a855f7" stroke={INK} strokeWidth="2.5" />
          {clock(50, 50, 24, 3, '#64748b', 'k')}
        </>
      );
    case 'kakukkos':
      return (
        <>
          <path d="M14 34 L50 6 L86 34 Z" fill="#b91c1c" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="20" y="32" width="60" height="50" fill="#d97706" stroke={INK} strokeWidth="2.5" />
          {clock(50, 56, 20, 9, '#78350f', 'kk')}
          <path d="M44 82 V94 M56 82 V90" stroke="#64748b" strokeWidth="2.5" />
          <ellipse cx="44" cy="96" rx="4" ry="3" fill="#facc15" />
          <ellipse cx="56" cy="92" rx="4" ry="3" fill="#facc15" />
        </>
      );
    case 'napora':
      return (
        <>
          <ellipse cx="50" cy="70" rx="42" ry="18" fill="#e2e8f0" stroke={INK} strokeWidth="2.5" />
          <path d="M50 70 L50 30 L64 70 Z" fill="#64748b" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M50 70 L18 76" stroke="#475569" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          {[0, 1, 2, 3, 4].map((i) => {
            const [a, b] = pt(50, 70, 34, -90 + i * 45);
            return <circle key={i} cx={a} cy={70 + (b - 70) * 0.45} r="2.5" fill={INK} />;
          })}
          <circle cx="86" cy="18" r="9" fill="#facc15" stroke="#ea580c" strokeWidth="2" />
        </>
      );
    case 'rud':
      return <rect x="10" y="42" width="80" height="18" rx="3" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" />;
    case 'meterrud':
      return (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={4 + i * 9.2} y="44" width="9.2" height="14" fill={i % 2 ? '#fff' : '#ef4444'} stroke={INK} strokeWidth="1.5" />
          ))}
        </>
      );
    case 'meroszalag':
      return (
        <>
          <path d="M48 62 H96 V74 H48 Z" fill="#fde047" stroke={INK} strokeWidth="2" />
          {[56, 64, 72, 80, 88].map((a) => (
            <path key={a} d={`M${a} 62 v5`} stroke={INK} strokeWidth="1.5" />
          ))}
          <circle cx="36" cy="56" r="26" fill="#facc15" stroke={INK} strokeWidth="2.5" />
          <circle cx="36" cy="56" r="8" fill="#fff" stroke={INK} strokeWidth="2" />
        </>
      );
    case 'merleg':
    default:
      return (
        <>
          <path d="M40 92 H60 L50 36 Z" fill="#94a3b8" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M14 36 H86" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <path d="M18 36 L8 60 M18 36 L28 60 M82 36 L72 60 M82 36 L92 60" stroke="#64748b" strokeWidth="2" />
          <path d="M4 60 Q18 72 32 60 Z" fill="#fbbf24" stroke={INK} strokeWidth="2.5" />
          <path d="M68 60 Q82 72 96 60 Z" fill="#fbbf24" stroke={INK} strokeWidth="2.5" />
          <circle cx="50" cy="34" r="4" fill={INK} />
        </>
      );
  }
};

export const obj = (k: ObjKind, x: number, y: number, s = 1, key: React.Key = 'o') => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    {objBody(k)}
  </g>
);

export const ObjFig: React.FC<{ k: ObjKind; className?: string }> = ({ k, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {objBody(k)}
  </svg>
);
export const objOpt = (k: ObjKind) => ({ figure: <ObjFig k={k} />, say: OBJ_SAY[k] });

/* ------------------------------------------------------------------ mesés jelenetek */

/** Zümi meghívója: szombaton délután 4 órakor mézes uzsonna. */
export const HelloScene: React.FC = () => (
  <svg viewBox="0 0 480 240" className="w-full h-auto">
    {garden(480, 240)}
    <Potyi mood="cheer" dots={7} x={14} y={70} size={140} />
    {ICONS.meh({ x: 210, y: 70, s: 1.5 })}
    <g transform="translate(250 40)">
      <rect x="0" y="0" width="150" height="110" rx="12" fill="#fff" stroke="#f59e0b" strokeWidth="4" />
      <path d="M18 44 h36 v26 q0 14 -18 14 q-18 0 -18 -14 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="2.5" />
      <rect x="14" y="34" width="44" height="12" rx="4" fill="#f59e0b" stroke="#92400e" strokeWidth="2.5" />
      {clock(106, 58, 36, 4, '#f59e0b', 'inv')}
      <text x="75" y="102" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b45309">
        SZOMBAT
      </text>
    </g>
    {ICONS.csiga({ x: 420, y: 196, s: 1.8 })}
  </svg>
);

/** Mivel mérjük az időt? Különféle órák a kertben. */
export const ClocksScene: React.FC = () => (
  <svg viewBox="0 0 480 220" className="w-full h-auto">
    {garden(480, 220)}
    {obj('vekker', 20, 40, 1.05, 'a')}
    {obj('kakukkos', 140, 20, 1.15, 'b')}
    {obj('karora', 270, 50, 1, 'c')}
    {obj('napora', 360, 90, 1.1, 'd')}
  </svg>
);

/** Nagy óra a kismutató és a nagymutató megnevezésével. */
export const ClockScene: React.FC<{ h?: number; names?: boolean }> = ({ h, names = true }) => (
  <svg viewBox="0 0 480 240" className="w-full h-auto">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#f0f9ff" />
    {clock(240, 120, 104, h, '#0ea5e9', 'big')}
    {names && h !== undefined && (
      <>
        <text x="26" y="58" fontSize="18" fontWeight="900" fill="#dc2626">kismutató</text>
        <text x="26" y="80" fontSize="14" fontWeight="700" fill="#dc2626">(rövid)</text>
        <text x="370" y="40" fontSize="18" fontWeight="900" fill="#2563eb">nagymutató</text>
        <text x="370" y="62" fontSize="14" fontWeight="700" fill="#2563eb">(hosszú)</text>
      </>
    )}
    {!names && <Potyi mood="think" dots={7} x={386} y={150} size={84} />}
  </svg>
);

/** Ki, hány órakor? Két óra, fölöttük a szereplők; a második helyén lehet kérdőjel. */
export const TwoClocksScene: React.FC<{ a: { h: number; who: 'potyi' | 'meh' | 'csiga' }; b: { h?: number; who: 'potyi' | 'meh' | 'csiga' }; arrow?: string }> = ({ a, b, arrow }) => {
  const who = (w: 'potyi' | 'meh' | 'csiga', x: number) =>
    w === 'potyi' ? <Potyi mood="happy" dots={7} x={x - 28} y={4} size={56} /> : ICONS[w === 'meh' ? 'meh' : 'csiga']({ x, y: 32, s: 1.1 });
  return (
    <svg viewBox="0 0 480 240" className="w-full h-auto">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#f0f9ff" />
      {who(a.who, 120)}
      {who(b.who, 360)}
      {clock(120, 150, 78, a.h, '#22c55e', 'l')}
      {b.h !== undefined ? (
        clock(360, 150, 78, b.h, '#f59e0b', 'r')
      ) : (
        <g>
          {clock(360, 150, 78, undefined, '#a78bfa', 'r')}
          {qMark(360, 150, 54)}
        </g>
      )}
      {arrow !== undefined && (
        <g>
          <path d="M210 150 H262 m-10 -9 l10 9 l-10 9" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="238" y="132" textAnchor="middle" fontSize="18" fontWeight="900" fill="#475569">
            {arrow}
          </text>
        </g>
      )}
    </svg>
  );
};

/** A mézes uzsonna szombat délután 4 órakor. */
export const PartyScene: React.FC = () => (
  <svg viewBox="0 0 480 240" className="w-full h-auto">
    {garden(480, 240)}
    <rect x="150" y="150" width="190" height="14" rx="5" fill="#b45309" stroke="#78350f" strokeWidth="3" />
    <path d="M170 164 V214 M320 164 V214" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
    <path d="M222 118 h44 v24 q0 12 -22 12 q-22 0 -22 -12 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
    <rect x="218" y="108" width="52" height="12" rx="4" fill="#f59e0b" stroke="#92400e" strokeWidth="3" />
    {[180, 300].map((x) => (
      <ellipse key={x} cx={x} cy="146" rx="18" ry="5" fill="#fff" stroke={INK} strokeWidth="2" />
    ))}
    <rect x="378" y="10" width="10" height="70" fill="#92400e" />
    {clock(383, 58, 42, 4, '#f59e0b', 'p')}
    <Potyi mood="cheer" dots={7} x={60} y={92} size={110} />
    {ICONS.meh({ x: 250, y: 60, s: 1.4 })}
    {ICONS.csiga({ x: 400, y: 196, s: 1.7 })}
    {[40, 140, 330, 450].map((x, i) => ICONS.virag({ x, y: 206, s: 0.8, color: ['#ec4899', '#facc15', '#a855f7', '#ef4444'][i], key: `v${i}` }))}
  </svg>
);
