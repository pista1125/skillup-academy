import React, { useState } from 'react';

export const DIV10_FONT = 'system-ui, Segoe UI, sans-serif';
export const DIV10_UNK = '#dc2626';

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
        fontFamily={DIV10_FONT}
      >
        {value}
      </text>
      {showFt && (
        <text x={cx} y={cy + r * 0.62} textAnchor="middle" fontSize={r * 0.42} fontWeight="bold" fill={st.text} fontFamily={DIV10_FONT}>
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
    <text x="28" y="22" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#78350f" fontFamily={DIV10_FONT}>
      {label}
    </text>
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
    <g fontFamily={DIV10_FONT}>
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
          <circle cx={X(end)} cy={y} r="4" fill={DIV10_UNK} />
          <text x={X(end)} y={y + 11 + fontSize} textAnchor="middle" fontSize={fontSize + 3} fontWeight="900" fill={DIV10_UNK}>
            {endLabel}
          </text>
        </g>
      )}
    </g>
  );
};


/** Különálló tojás. */
export const EggG: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1 }) => (
  <ellipse cx={cx} cy={cy} rx={4.6 * s} ry={5.4 * s} fill="#fffbeb" stroke="#a16207" strokeWidth="1.1" />
);

/** Tányér (kör), közepén opcionális felirat. */
export const PlateG: React.FC<{ cx: number; cy: number; r?: number; label?: string; labelColor?: string }> = ({
  cx,
  cy,
  r = 14,
  label,
  labelColor = '#0f172a'
}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#fff" stroke="#94a3b8" strokeWidth="2" />
    <circle cx={cx} cy={cy} r={r * 0.68} fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
    {label && (
      <text x={cx} y={cy + r * 0.38} textAnchor="middle" fontSize={r * 1.05} fontWeight="900" fill={labelColor} fontFamily={DIV10_FONT}>
        {label}
      </text>
    )}
  </g>
);

/** `tens` tízesrúd és mellettük `ones` egyeskocka (2 oszlopban, alulról). */
export const RodsCubesG: React.FC<{ x: number; y: number; tens: number; ones: number; c?: number; gap?: number }> = ({
  x,
  y,
  tens,
  ones,
  c = 8,
  gap
}) => {
  const g = gap ?? c * 1.7;
  const ox = x + tens * g + (tens > 0 ? c * 0.6 : 0);
  const bottom = y + c * 10;
  return (
    <g>
      {Array.from({ length: tens }, (_, i) => (
        <RodG key={i} x={x + i * g} y={y} c={c} />
      ))}
      {Array.from({ length: ones }, (_, i) => (
        <CubeG key={i} x={ox + (i % 2) * (c + 2)} y={bottom - (Math.floor(i / 2) + 1) * (c + 2) + 2} c={c} />
      ))}
    </g>
  );
};

/** Csónak (kb. 70 × 26 s = 1-nél). */
export const BoatG: React.FC<{ x: number; y: number; s?: number; label?: string }> = ({ x, y, s = 1, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 8 L 70 8 L 60 26 L 10 26 Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
    <line x1="4" y1="8" x2="66" y2="8" stroke="#0369a1" strokeWidth="3" />
    {label && (
      <text x="35" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff" fontFamily={DIV10_FONT}>
        {label}
      </text>
    )}
  </g>
);

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

/** Labor I: tojások tartókba pakolása tízesével, majd az osztás eredménye. */
export const EggPackLab: React.FC = () => {
  const [n, setN] = useState(60);
  const [boxes, setBoxes] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const loose = n - boxes * 10;
  const k = n / 10;

  const newTask = () => {
    let next = n;
    while (next === n) next = rnd(2, 9) * 10;
    setN(next);
    setBoxes(0);
    setChoice(null);
    setMsg(null);
  };

  const pack = () => {
    if (loose < 10) {
      setMsg({ ok: false, text: 'Már nincs kint tojás. Minden tojás tartóban van!' });
      return;
    }
    setBoxes((b) => b + 1);
    setMsg(null);
  };

  const check = () => {
    if (loose > 0) {
      setMsg({ ok: false, text: `Még ${loose} tojás van kint. Pakolj tovább!` });
      return;
    }
    if (choice === null) {
      setMsg({ ok: false, text: 'Kész a pakolás! Hány tartó lett? Válaszd ki a számot!' });
      return;
    }
    if (choice === k) {
      setMsg({ ok: true, text: `Szuper! ${n} : 10 = ${k}, mert ${k} · 10 = ${n}.` });
    } else {
      setMsg({ ok: false, text: 'Nem ennyi. Számold meg a teli tartókat!' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Egy tartóba 10 tojás fér. Pakold el mind!
        <div className="text-2xl sm:text-3xl font-black mt-1">{n} : 10 = ?</div>
      </div>
      <svg viewBox="0 0 330 170" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
        <rect x="1" y="1" width="328" height="168" rx="12" fill="#fffbeb" stroke="#fcd34d" />
        <line x1="150" y1="10" x2="150" y2="160" stroke="#fde68a" strokeWidth="2" />
        {Array.from({ length: loose }, (_, i) => (
          <EggG key={i} cx={22 + (i % 10) * 12.5} cy={20 + Math.floor(i / 10) * 15} />
        ))}
        {Array.from({ length: boxes }, (_, i) => (
          <EggBoxG key={i} x={162 + (i % 3) * 55} y={14 + Math.floor(i / 3) * 34} s={0.85} />
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[48px]"
        >
          − 1 tartó
        </button>
        <button type="button" onClick={pack} className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-base min-h-[48px]">
          + Tegyél 10 tojást egy tartóba!
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány tartó lett tele?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setChoice(v);
              setMsg(null);
            }}
            className={`w-12 h-12 rounded-xl font-black text-lg border-2 ${
              choice === v
                ? 'bg-amber-500 text-white border-amber-700'
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

const Stepper: React.FC<{ label: string; value: number; onChange: (v: number) => void; max: number }> = ({ label, value, onChange, max }) => (
  <div className="flex items-center gap-2">
    <span className="font-bold text-slate-700 dark:text-slate-200 min-w-[130px] text-right">{label}</span>
    <button type="button" onClick={() => onChange(Math.max(0, value - 1))} className="w-12 h-12 rounded-xl bg-slate-200 text-slate-800 font-black text-xl">
      −
    </button>
    <span className="w-12 h-12 rounded-xl bg-teal-100 border-2 border-teal-400 text-teal-950 font-black text-2xl flex items-center justify-center">{value}</span>
    <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-12 h-12 rounded-xl bg-teal-600 text-white font-black text-xl">
      +
    </button>
  </div>
);

const makeBundleTask = (prev: number): number => {
  for (;;) {
    const v = rnd(11, 99);
    if (v !== prev && v % 10 !== 0) return v;
  }
};

/** Labor II: maradékos osztás 10-zel – köss össze 10 kockát egy rúddá! */
export const BundleLab: React.FC = () => {
  const [n, setN] = useState(47);
  const [bundled, setBundled] = useState(0);
  const [groupsAns, setGroupsAns] = useState(0);
  const [restAns, setRestAns] = useState(0);
  const [msg, setMsg] = useState<Msg>(null);

  const loose = n - bundled * 10;
  const tens = Math.floor(n / 10);
  const ones = n % 10;

  const newTask = () => {
    setN(makeBundleTask(n));
    setBundled(0);
    setGroupsAns(0);
    setRestAns(0);
    setMsg(null);
  };

  const bundle = () => {
    if (loose < 10) {
      setMsg({ ok: false, text: `Csak ${loose} kocka van kint. Ebből nem lesz rúd. Ez a maradék!` });
      return;
    }
    setBundled((b) => b + 1);
    setMsg(null);
  };

  const check = () => {
    if (loose >= 10) {
      setMsg({ ok: false, text: 'Van még legalább 10 kocka kint. Köss össze még egy rudat!' });
      return;
    }
    if (restAns >= 10) {
      setMsg({ ok: false, text: 'A maradék mindig kevesebb, mint 10! Különben még egy rúd lenne.' });
      return;
    }
    if (groupsAns !== tens) {
      setMsg({ ok: false, text: 'Számold meg a rudakat! Ennyi tízes csoport lett.' });
      return;
    }
    if (restAns !== ones) {
      setMsg({ ok: false, text: 'Számold meg a kint maradt kockákat!' });
      return;
    }
    setMsg({
      ok: true,
      text: `Remek! ${n} kockából ${tens} tízes csoport lett, és maradt ${ones}. Ellenőrzés: ${tens} · 10 + ${ones} = ${n}.`
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-teal-50 dark:bg-teal-950/50 rounded-xl p-3 text-center text-teal-950 dark:text-teal-100">
        Köss össze tízesével! Hány csoport lesz? Mennyi marad?
        <div className="text-3xl font-black mt-1">{n} kocka</div>
      </div>
      <svg viewBox="0 0 330 170" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="328" height="168" rx="12" fill="#f0fdfa" stroke="#99f6e4" />
        <line x1="160" y1="10" x2="160" y2="160" stroke="#99f6e4" strokeWidth="2" />
        {Array.from({ length: bundled }, (_, i) => (
          <RodG key={i} x={14 + i * 16} y={24} c={12} />
        ))}
        {Array.from({ length: loose }, (_, i) => (
          <CubeG key={i} x={170 + (i % 10) * 15} y={12 + Math.floor(i / 10) * 15} c={12} />
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setBundled((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[48px]"
        >
          − 1 rúd
        </button>
        <button type="button" onClick={bundle} className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-base min-h-[48px]">
          + Köss össze 10 kockát!
        </button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Stepper
          label="Ennyi csoport:"
          value={groupsAns}
          onChange={(v) => {
            setGroupsAns(v);
            setMsg(null);
          }}
          max={9}
        />
        <Stepper
          label="Ennyi maradt:"
          value={restAns}
          onChange={(v) => {
            setRestAns(v);
            setMsg(null);
          }}
          max={19}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold min-h-[48px]">
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
