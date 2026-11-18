import React, { useState } from 'react';

export const MULT10_FONT = 'system-ui, Segoe UI, sans-serif';
export const MULT10_UNK = '#dc2626';

// ---------------------------------------------------------------------------
// Alap SVG-elemek
// ---------------------------------------------------------------------------

/** Tízesrúd: 10 egymás alatti kocka. c = egy kocka mérete. */
export const RodG: React.FC<{
  x: number;
  y: number;
  c?: number;
  fill?: string;
  stroke?: string;
  horizontal?: boolean;
}> = ({ x, y, c = 8, fill = '#5eead4', stroke = '#0f766e', horizontal = false }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={horizontal ? c * 10 : c}
      height={horizontal ? c : c * 10}
      rx={c * 0.25}
      fill={fill}
      stroke={stroke}
      strokeWidth={Math.max(1.2, c / 6)}
    />
    {Array.from({ length: 9 }, (_, i) =>
      horizontal ? (
        <line key={i} x1={x + (i + 1) * c} y1={y} x2={x + (i + 1) * c} y2={y + c} stroke={stroke} strokeWidth="1" />
      ) : (
        <line key={i} x1={x} y1={y + (i + 1) * c} x2={x + c} y2={y + (i + 1) * c} stroke={stroke} strokeWidth="1" />
      )
    )}
  </g>
);

/** Egyeskocka. */
export const CubeG: React.FC<{ x: number; y: number; c?: number; fill?: string; stroke?: string }> = ({
  x,
  y,
  c = 8,
  fill = '#fcd34d',
  stroke = '#b45309'
}) => <rect x={x} y={y} width={c} height={c} rx={c * 0.25} fill={fill} stroke={stroke} strokeWidth={Math.max(1.2, c / 6)} />;

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
  const st = COIN_STYLE[value] ?? COIN_STYLE[10];
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
        fontFamily={MULT10_FONT}
      >
        {value}
      </text>
      {showFt && (
        <text x={cx} y={cy + r * 0.62} textAnchor="middle" fontSize={r * 0.42} fontWeight="bold" fill={st.text} fontFamily={MULT10_FONT}>
          Ft
        </text>
      )}
    </g>
  );
};

/** Tojástartó 2 × 5 tojással. Mérete s = 1-nél 60 × 30. */
export const EggBoxG: React.FC<{ x: number; y: number; s?: number; eggs?: number }> = ({ x, y, s = 1, eggs = 10 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="0" y="0" width="60" height="30" rx="5" fill="#d6a76c" stroke="#7c4a1e" strokeWidth="1.8" />
    {Array.from({ length: 10 }, (_, i) => {
      const cx = 7 + (i % 5) * 11.5;
      const cy = 8.5 + Math.floor(i / 5) * 13;
      return i < eggs ? (
        <ellipse key={i} cx={cx} cy={cy} rx="4.6" ry="5.4" fill="#fffbeb" stroke="#a16207" strokeWidth="1" />
      ) : (
        <circle key={i} cx={cx} cy={cy} r="3.6" fill="#b88550" />
      );
    })}
  </g>
);

/** 10 kg-os gyümölcsláda. Mérete s = 1-nél 56 × 26. */
export const CrateG: React.FC<{ x: number; y: number; s?: number; label?: string }> = ({ x, y, s = 1, label = '10 kg' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[8, 18, 28, 38, 48].map((cx) => (
      <circle key={cx} cx={cx} cy="4" r="4.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
    ))}
    <rect x="0" y="4" width="56" height="22" rx="2" fill="#fbbf24" stroke="#92400e" strokeWidth="1.8" />
    <line x1="0" y1="11" x2="56" y2="11" stroke="#92400e" strokeWidth="1" />
    <rect x="14" y="13" width="28" height="11" rx="2" fill="#fff" stroke="#92400e" strokeWidth="0.8" />
    <text x="28" y="22" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#78350f" fontFamily={MULT10_FONT}>
      {label}
    </text>
  </g>
);

/** Egy kéz 5 ujjal. Kb. 26 × 28 egység s = 1-nél. */
export const HandG: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip = false }) => (
  <g transform={`translate(${x + (flip ? 26 * s : 0)} ${y}) scale(${flip ? -s : s} ${s})`}>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={6 + i * 4.8} y={i === 0 || i === 3 ? 3 : 0} width="4.2" height="15" rx="2.1" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.2" />
    ))}
    <rect x="-1" y="13" width="4.6" height="12" rx="2.3" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.2" transform="rotate(-35 2 24)" />
    <rect x="4" y="11" width="21" height="16" rx="6" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.2" />
  </g>
);

/** Malacpersely. Kb. 60 × 44 egység s = 1-nél. */
export const PiggyG: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="30" cy="24" rx="26" ry="17" fill="#f9a8d4" stroke="#be185d" strokeWidth="2" />
    <rect x="22" y="6" width="14" height="3.5" rx="1.5" fill="#831843" />
    <ellipse cx="56" cy="24" rx="5" ry="6" fill="#f472b6" stroke="#be185d" strokeWidth="1.5" />
    <circle cx="54.5" cy="22.5" r="1" fill="#831843" />
    <circle cx="57.5" cy="22.5" r="1" fill="#831843" />
    <circle cx="44" cy="18" r="2" fill="#1e293b" />
    <path d="M 40 9 L 45 3 L 47 11 Z" fill="#f472b6" stroke="#be185d" strokeWidth="1.2" />
    <rect x="12" y="37" width="7" height="7" rx="2" fill="#f472b6" stroke="#be185d" strokeWidth="1.2" />
    <rect x="40" y="37" width="7" height="7" rx="2" fill="#f472b6" stroke="#be185d" strokeWidth="1.2" />
    <path d="M 4 22 q -5 -4 -2 -8" fill="none" stroke="#be185d" strokeWidth="1.6" />
  </g>
);

/**
 * Számegyenes 0-tól `max`-ig (alapból 100), ugrásívekkel.
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
  max = 100,
  step = 10,
  jumps,
  color = '#0d9488',
  endLabel,
  labelEvery = 10,
  arcUp = true,
  fontSize = 10
}) => {
  const u = width / max;
  const X = (v: number) => x0 + v * u;
  const end = jumps * step;
  return (
    <g fontFamily={MULT10_FONT}>
      <line x1={X(0) - 3} y1={y} x2={X(max) + 8} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${X(max) + 8} ${y - 4} L ${X(max) + 14} ${y} L ${X(max) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: max / 5 + 1 }, (_, i) => i * 5).map((v) => (
        <g key={v}>
          <line
            x1={X(v)}
            y1={y - (v % 10 === 0 ? 6 : 3)}
            x2={X(v)}
            y2={y + (v % 10 === 0 ? 6 : 3)}
            stroke="#334155"
            strokeWidth={v % 10 === 0 ? 1.6 : 1}
          />
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
        return (
          <path
            key={i}
            d={`M ${a} ${y - (arcUp ? 2 : -2)} Q ${(a + b) / 2} ${cy - (arcUp ? 4 : -4)} ${b} ${y - (arcUp ? 2 : -2)}`}
            fill="none"
            stroke={color}
            strokeWidth="2.2"
          />
        );
      })}
      {endLabel && jumps > 0 && (
        <g>
          <circle cx={X(end)} cy={y} r="4" fill={MULT10_UNK} />
          <text x={X(end)} y={y + 11 + fontSize} textAnchor="middle" fontSize={fontSize + 3} fontWeight="900" fill={MULT10_UNK}>
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

/** Labor I: tízesrudak felrakása, majd a szorzat kiválasztása. */
export const RodsLab: React.FC = () => {
  const [n, setN] = useState(6);
  const [rods, setRods] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const newTask = () => {
    let next = n;
    while (next === n) next = rnd(2, 10);
    setN(next);
    setRods(0);
    setChoice(null);
    setMsg(null);
  };

  const check = () => {
    if (rods !== n) {
      setMsg({
        ok: false,
        text: rods < n ? `Most ${rods} rúd van fent. ${n} rúd kell! Tegyél fel még!` : `Most ${rods} rúd van fent. Csak ${n} rúd kell! Vegyél le!`
      });
      return;
    }
    if (choice === null) {
      setMsg({ ok: false, text: 'A rudak jók! Most számold meg tízesével, és válaszd ki a számot!' });
      return;
    }
    if (choice === n * 10) {
      setMsg({ ok: true, text: `Szuper! ${n} · 10 = ${n * 10}. ${n} tízes az ${n * 10}.` });
    } else if (choice === n + 10) {
      setMsg({ ok: false, text: `Ez ${n} + 10 lett! A · azt jelenti: ${n}-szor veszed a 10-et.` });
    } else if (Math.abs(choice - n * 10) === 10) {
      setMsg({ ok: false, text: 'Egy rúddal elszámoltad! Számolj tízesével: 10, 20, 30, …' });
    } else {
      setMsg({ ok: false, text: 'Nem ennyi. Minden rúd 10 kocka. Számolj tízesével!' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-teal-50 dark:bg-teal-950/50 rounded-xl p-3 text-center text-teal-950 dark:text-teal-100">
        Tegyél fel {n} tízesrudat!{' '}
        <span className="text-2xl sm:text-3xl font-black align-middle ml-2">{n} · 10 = ?</span>
      </div>
      <svg viewBox="0 0 330 130" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="328" height="128" rx="12" fill="#f0fdfa" stroke="#99f6e4" />
        {Array.from({ length: 10 }, (_, i) => {
          const x = 22 + i * 30;
          return i < rods ? (
            <RodG key={i} x={x} y={15} c={10} />
          ) : (
            <rect key={i} x={x} y={15} width="10" height="100" rx="3" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 3" />
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setRods((h) => Math.max(0, h - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-teal-100 text-teal-900 font-bold text-base min-h-[48px]"
        >
          − 1 rúd
        </button>
        <span className="px-3 py-2 font-black text-lg text-slate-700 dark:text-slate-200">{rods} rúd</span>
        <button
          type="button"
          onClick={() => {
            setRods((h) => Math.min(10, h + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-base min-h-[48px]"
        >
          + 1 rúd
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány kocka van összesen?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setChoice(v);
              setMsg(null);
            }}
            className={`w-14 h-12 rounded-xl font-black text-lg border-2 transition-all ${
              choice === v
                ? 'bg-teal-500 text-white border-teal-700 scale-105'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold min-h-[48px]">
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

/** Labor II: 10 Ft-osokat dobunk a perselybe, amíg meg nem lesz az összeg. */
export const PiggyLab: React.FC = () => {
  const [target, setTarget] = useState(70);
  const [coins, setCoins] = useState(0);
  const [msg, setMsg] = useState<Msg>(null);

  const newTask = () => {
    let next = target;
    while (next === target) next = rnd(2, 10) * 10;
    setTarget(next);
    setCoins(0);
    setMsg(null);
  };

  const check = () => {
    const sum = coins * 10;
    const k = target / 10;
    if (sum === target) {
      setMsg({ ok: true, text: `Ügyes! ${coins} · 10 = ${target}. ${coins} darab 10 Ft-os kell. □ = ${k}.` });
    } else if (sum < target) {
      setMsg({ ok: false, text: `${coins} · 10 = ${sum} Ft. Ez kevés! Még ${target - sum} Ft hiányzik.` });
    } else {
      setMsg({ ok: false, text: `${coins} · 10 = ${sum} Ft. Ez sok! Vegyél ki ${(sum - target) / 10} érmét.` });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-pink-200 dark:border-pink-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-pink-50 dark:bg-pink-950/50 rounded-xl p-3 text-center text-pink-950 dark:text-pink-100">
        Gyűjts a perselybe <span className="text-2xl sm:text-3xl font-black align-middle mx-1">{target} Ft</span>-ot!
        <div className="text-xl sm:text-2xl font-black mt-1">□ · 10 = {target}</div>
      </div>
      <svg viewBox="0 0 330 130" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
        <rect x="1" y="1" width="328" height="128" rx="12" fill="#fdf2f8" stroke="#fbcfe8" />
        <PiggyG x={14} y={34} s={1.4} />
        {Array.from({ length: coins }, (_, i) => (
          <CoinG key={i} cx={130 + (i % 5) * 40} cy={38 + Math.floor(i / 5) * 46} r={16} value={10} />
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setCoins((c) => Math.max(0, c - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-black text-lg min-h-[48px] min-w-[56px]"
        >
          − 1
        </button>
        <span className="px-3 py-2 font-black text-base text-slate-700 dark:text-slate-200 min-w-[130px] text-center">
          {coins} db 10 Ft-os
        </span>
        <button
          type="button"
          onClick={() => {
            setCoins((c) => Math.min(10, c + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-pink-500 text-white font-black text-lg min-h-[48px] min-w-[56px]"
        >
          + 1
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-pink-600 text-white font-bold min-h-[48px]">
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
