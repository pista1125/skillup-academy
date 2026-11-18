import React, { useState } from 'react';

export const MULT5_FONT = 'system-ui, Segoe UI, sans-serif';
export const MULT5_UNK = '#dc2626';

// ---------------------------------------------------------------------------
// Alap SVG-elemek
// ---------------------------------------------------------------------------

/** Egy kéz 5 ujjal (4 ujj + hüvelykujj). Kb. 26 × 28 egység s = 1-nél. */
export const HandG: React.FC<{
  x: number;
  y: number;
  s?: number;
  fill?: string;
  stroke?: string;
}> = ({ x, y, s = 1, fill = '#fed7aa', stroke = '#c2410c' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={6 + i * 4.8}
        y={i === 0 || i === 3 ? 3 : 0}
        width="4.2"
        height="15"
        rx="2.1"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.2"
      />
    ))}
    <rect
      x="-1"
      y="13"
      width="4.6"
      height="12"
      rx="2.3"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.2"
      transform="rotate(-35 2 24)"
    />
    <rect x="4" y="11" width="21" height="16" rx="6" fill={fill} stroke={stroke} strokeWidth="1.2" />
  </g>
);

const COIN_STYLE: Record<number, { fill: string; stroke: string; text: string }> = {
  5: { fill: '#fcd34d', stroke: '#b45309', text: '#78350f' },
  10: { fill: '#e2e8f0', stroke: '#64748b', text: '#1e293b' },
  20: { fill: '#fde68a', stroke: '#a16207', text: '#713f12' },
  50: { fill: '#cbd5e1', stroke: '#475569', text: '#0f172a' }
};

/** Forint-érme (5, 10, 20, 50 Ft). */
export const CoinG: React.FC<{ cx: number; cy: number; r?: number; value: number; showFt?: boolean }> = ({
  cx,
  cy,
  r = 14,
  value,
  showFt = false
}) => {
  const st = COIN_STYLE[value] ?? COIN_STYLE[5];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={st.fill} stroke={st.stroke} strokeWidth={Math.max(1.5, r / 7)} />
      <circle cx={cx} cy={cy} r={r * 0.78} fill="none" stroke={st.stroke} strokeWidth="1" opacity="0.6" />
      <text
        x={cx}
        y={showFt ? cy + r * 0.12 : cy + r * 0.36}
        textAnchor="middle"
        fontSize={r * (value >= 10 ? 0.95 : 1.05)}
        fontWeight="900"
        fill={st.text}
        fontFamily={MULT5_FONT}
      >
        {value}
      </text>
      {showFt && (
        <text x={cx} y={cy + r * 0.62} textAnchor="middle" fontSize={r * 0.42} fontWeight="bold" fill={st.text} fontFamily={MULT5_FONT}>
          Ft
        </text>
      )}
    </g>
  );
};

/** Vásári zseton (lila korong számmal). */
export const TokenG: React.FC<{ cx: number; cy: number; r?: number; value: number | string }> = ({ cx, cy, r = 12, value }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#ddd6fe" stroke="#6d28d9" strokeWidth={Math.max(1.5, r / 7)} />
    <circle cx={cx} cy={cy} r={r * 0.75} fill="none" stroke="#6d28d9" strokeWidth="1" strokeDasharray="2 2" />
    <text x={cx} y={cy + r * 0.36} textAnchor="middle" fontSize={r * 0.95} fontWeight="900" fill="#4c1d95" fontFamily={MULT5_FONT}>
      {value}
    </text>
  </g>
);

/** Perec, lufi, nyalóka – egyszerű vásári rajzok (kb. 30 × 34). */
export const PretzelG: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round">
    <path d="M 15 26 C 2 22 2 6 10 6 C 16 6 16 16 15 26 C 14 16 14 6 20 6 C 28 6 28 22 15 26 Z" />
    <path d="M 6 22 L 24 22" strokeWidth="3" />
  </g>
);

export const BalloonG: React.FC<{ x: number; y: number; s?: number; fill?: string }> = ({ x, y, s = 1, fill = '#ef4444' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="15" cy="12" rx="10" ry="12" fill={fill} stroke="#7f1d1d" strokeWidth="1.5" />
    <path d="M 13 24 L 17 24 L 15 27 Z" fill={fill} />
    <path d="M 15 27 Q 11 31 15 34" fill="none" stroke="#475569" strokeWidth="1.3" />
  </g>
);

export const LollipopG: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1="15" y1="20" x2="15" y2="34" stroke="#a8a29e" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="15" cy="12" r="10" fill="#f9a8d4" stroke="#be185d" strokeWidth="1.5" />
    <path d="M 15 12 m -6 0 a 6 6 0 1 1 6 6 a 3.5 3.5 0 1 1 -3.5 -3.5" fill="none" stroke="#be185d" strokeWidth="1.6" />
  </g>
);

/** Öt pötty dobókocka-elrendezésben (cx, cy közép, d = fél-távolság). */
export const FiveDotsG: React.FC<{
  cx: number;
  cy: number;
  d?: number;
  r?: number;
  count?: number;
  fill?: string;
  stroke?: string;
}> = ({ cx, cy, d = 7, r = 3, count = 5, fill = '#f59e0b', stroke = '#92400e' }) => {
  const pos: [number, number][] = [
    [-d, -d],
    [d, -d],
    [0, 0],
    [-d, d],
    [d, d]
  ];
  return (
    <g>
      {pos.slice(0, count).map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r={r} fill={fill} stroke={stroke} strokeWidth="1" />
      ))}
    </g>
  );
};

/**
 * Számegyenes 0-tól `max`-ig, ugrásívekkel.
 * `jumps` darab `step` nagyságú ív a 0-tól, a végén `endLabel` (pl. „?”).
 */
export const JumpLineG: React.FC<{
  x0: number;
  y: number;
  width: number;
  max?: number;
  step?: number;
  jumps: number;
  color?: string;
  endLabel?: string;
  labelEvery?: number;
  arcUp?: boolean;
  fontSize?: number;
}> = ({
  x0,
  y,
  width,
  max = 50,
  step = 5,
  jumps,
  color = '#ea580c',
  endLabel,
  labelEvery = 10,
  arcUp = true,
  fontSize = 10
}) => {
  const u = width / max;
  const X = (v: number) => x0 + v * u;
  const end = jumps * step;
  return (
    <g fontFamily={MULT5_FONT}>
      <line x1={X(0) - 3} y1={y} x2={X(max) + 8} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${X(max) + 8} ${y - 4} L ${X(max) + 14} ${y} L ${X(max) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: max / 5 + 1 }, (_, i) => i * 5).map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={y - (v % 10 === 0 ? 6 : 4)} x2={X(v)} y2={y + (v % 10 === 0 ? 6 : 4)} stroke="#334155" strokeWidth={v % 10 === 0 ? 1.6 : 1.1} />
          {labelEvery > 0 && v % labelEvery === 0 && !(endLabel && v === end) && (
            <text x={X(v)} y={y + 9 + fontSize} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#334155">
              {v}
            </text>
          )}
        </g>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = X(i * step);
        const b = X((i + 1) * step);
        const h = Math.min(22, (b - a) * 0.7);
        const cy = arcUp ? y - h : y + h;
        return <path key={i} d={`M ${a} ${y - (arcUp ? 2 : -2)} Q ${(a + b) / 2} ${cy - (arcUp ? 4 : -4)} ${b} ${y - (arcUp ? 2 : -2)}`} fill="none" stroke={color} strokeWidth="2.2" />;
      })}
      {endLabel && jumps > 0 && (
        <g>
          <circle cx={X(end)} cy={y} r="4" fill={MULT5_UNK} />
          <text x={X(end)} y={y + 11 + fontSize} textAnchor="middle" fontSize={fontSize + 3} fontWeight="900" fill={MULT5_UNK}>
            {endLabel}
          </text>
        </g>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Laborok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

type Msg = { ok: boolean; text: string } | null;

const MsgBox: React.FC<{ msg: Msg }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

/** Labor I: kezek felrakása, majd a szorzat kiválasztása. */
export const HandsLab: React.FC = () => {
  const [n, setN] = useState(4);
  const [hands, setHands] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const newTask = () => {
    let next = n;
    while (next === n) next = rnd(2, 10);
    setN(next);
    setHands(0);
    setChoice(null);
    setMsg(null);
  };

  const check = () => {
    if (hands !== n) {
      setMsg({
        ok: false,
        text: hands < n ? `Most ${hands} kéz van fent. ${n} kéz kell! Tegyél fel még!` : `Most ${hands} kéz van fent. Csak ${n} kéz kell! Vegyél le!`
      });
      return;
    }
    if (choice === null) {
      setMsg({ ok: false, text: 'A kezek jók! Most számold meg az ujjakat, és válaszd ki a számot!' });
      return;
    }
    if (choice === n * 5) {
      setMsg({ ok: true, text: `Szuper! ${n} · 5 = ${n * 5}. ${n} kézen ${n * 5} ujj van.` });
    } else if (choice === n + 5) {
      setMsg({ ok: false, text: `Ez ${n} + 5 lett! A · azt jelenti: ${n}-szer veszed az 5-öt.` });
    } else if (Math.abs(choice - n * 5) === 5) {
      setMsg({ ok: false, text: 'Egy kézzel elszámoltad! Számolj ötösével: 5, 10, 15, …' });
    } else {
      setMsg({ ok: false, text: 'Nem ennyi. Számolj ötösével, kezenként!' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Tegyél fel {n} kezet!{' '}
        <span className="text-2xl sm:text-3xl font-black align-middle ml-2">{n} · 5 = ?</span>
      </div>
      <svg viewBox="0 0 330 120" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="328" height="118" rx="12" fill="#fffbeb" stroke="#fcd34d" />
        {Array.from({ length: 10 }, (_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const x = 22 + col * 62;
          const y = 10 + row * 54;
          return i < hands ? (
            <HandG key={i} x={x} y={y} s={1.6} />
          ) : (
            <rect key={i} x={x + 4} y={y + 6} width="38" height="38" rx="8" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 3" />
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setHands((h) => Math.max(0, h - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900 font-bold text-base min-h-[48px]"
        >
          − 1 kéz
        </button>
        <span className="px-3 py-2 font-black text-lg text-slate-700 dark:text-slate-200">{hands} kéz</span>
        <button
          type="button"
          onClick={() => {
            setHands((h) => Math.min(10, h + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-base min-h-[48px]"
        >
          + 1 kéz
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány ujj van összesen?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setChoice(v);
              setMsg(null);
            }}
            className={`w-14 h-12 rounded-xl font-black text-lg border-2 transition-all ${
              choice === v
                ? 'bg-amber-500 text-white border-amber-700 scale-105'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

/** Labor II: ugyanazt az árat kifizetni 5 Ft-osokkal és 10 Ft-osokkal. */
export const CoinsLab: React.FC = () => {
  const [price, setPrice] = useState(30);
  const [c5, setC5] = useState(0);
  const [c10, setC10] = useState(0);
  const [msg, setMsg] = useState<Msg>(null);

  const newTask = () => {
    let next = price;
    while (next === price) next = rnd(1, 5) * 10;
    setPrice(next);
    setC5(0);
    setC10(0);
    setMsg(null);
  };

  const check = () => {
    const s5 = c5 * 5;
    const s10 = c10 * 10;
    if (s5 !== price) {
      setMsg({
        ok: false,
        text: `Az 5 Ft-osok: ${c5} · 5 = ${s5} Ft. ${s5 < price ? 'Ez kevés!' : 'Ez sok!'} ${price} Ft kell.`
      });
      return;
    }
    if (s10 !== price) {
      setMsg({
        ok: false,
        text: `Az 5 Ft-osok jók! A 10 Ft-osok: ${c10} · 10 = ${s10} Ft. ${s10 < price ? 'Ez kevés!' : 'Ez sok!'}`
      });
      return;
    }
    setMsg({
      ok: true,
      text: `Ügyes! ${c5} · 5 = ${price} és ${c10} · 10 = ${price}. 5 Ft-osból kétszer annyi kell!`
    });
  };

  const Stepper: React.FC<{ value: number; set: (f: (v: number) => number) => void; max: number; label: string }> = ({
    value,
    set,
    max,
    label
  }) => (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => {
          set((v) => Math.max(0, v - 1));
          setMsg(null);
        }}
        className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-black text-lg min-h-[48px] min-w-[56px]"
      >
        − 1
      </button>
      <span className="px-3 py-2 font-black text-base text-slate-700 dark:text-slate-200 min-w-[120px] text-center">
        {value} db {label}
      </span>
      <button
        type="button"
        onClick={() => {
          set((v) => Math.min(max, v + 1));
          setMsg(null);
        }}
        className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black text-lg min-h-[48px] min-w-[56px]"
      >
        + 1
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Fizess ki <span className="text-2xl sm:text-3xl font-black align-middle mx-1">{price} Ft</span>-ot
        <br className="sm:hidden" /> kétféleképpen!
      </div>
      <svg viewBox="0 0 330 120" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
        <rect x="1" y="1" width="328" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="12" y="36" fontSize="12" fontWeight="bold" fill="#92400e">5 Ft</text>
        {Array.from({ length: c5 }, (_, i) => (
          <CoinG key={i} cx={58 + i * 27} cy={32} r={12} value={5} />
        ))}
        <line x1="10" y1="60" x2="320" y2="60" stroke="#e2e8f0" strokeWidth="2" />
        <text x="12" y="92" fontSize="12" fontWeight="bold" fill="#334155">10 Ft</text>
        {Array.from({ length: c10 }, (_, i) => (
          <CoinG key={i} cx={62 + i * 34} cy={88} r={15} value={10} />
        ))}
      </svg>
      <div className="space-y-2">
        <Stepper value={c5} set={setC5} max={10} label="5 Ft-os" />
        <Stepper value={c10} set={setC10} max={5} label="10 Ft-os" />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
