import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 1. Osztás 2-vel – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const DIV2_FONT = 'system-ui, Segoe UI, sans-serif';

export const DIV2_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

/**
 * `n` korong sorban (max. `perRow` egy sorban). Ha `pairs` > 0, az első `pairs` párt
 * ovális keret veszi körül (kettesével csomagolás).
 */
export const DotsPart: React.FC<{
  x?: number;
  y?: number;
  n: number;
  pairs?: number;
  perRow?: number;
  step?: number;
  r?: number;
  color?: string;
}> = ({ x = 20, y = 20, n, pairs = 0, perRow = 10, step = 22, r = 8, color = '#ef4444' }) => {
  const pr = perRow % 2 === 0 ? perRow : perRow - 1;
  const pos = (i: number) => ({ cx: x + (i % pr) * step, cy: y + Math.floor(i / pr) * (step + 8) });
  return (
    <g>
      {Array.from({ length: Math.min(pairs, Math.floor(n / 2)) }, (_, p) => {
        const a = pos(2 * p);
        return (
          <rect
            key={`p${p}`}
            x={a.cx - r - 4}
            y={a.cy - r - 4}
            width={step + 2 * r + 8}
            height={2 * r + 8}
            rx={r + 4}
            fill={`${DIV2_COLORS[p % DIV2_COLORS.length]}22`}
            stroke={DIV2_COLORS[p % DIV2_COLORS.length]}
            strokeWidth="2.2"
          />
        );
      })}
      {Array.from({ length: n }, (_, i) => {
        const { cx, cy } = pos(i);
        return <circle key={i} cx={cx} cy={cy} r={r} fill={color} stroke="#1e293b" strokeWidth="1.3" />;
      })}
    </g>
  );
};

/** Tányér `items` koronggal (vagy „?”). */
export const PlatePart: React.FC<{
  cx: number;
  cy: number;
  w?: number;
  items?: number;
  q?: boolean;
  plateColor?: string;
  color?: string;
}> = ({ cx, cy, w = 90, items = 0, q = false, plateColor = '#e0f2fe', color = '#f59e0b' }) => {
  const h = w * 0.42;
  const perRow = 5;
  const step = Math.min(14, (w - 20) / perRow);
  const rows = Math.ceil(items / perRow);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill={plateColor} stroke="#0369a1" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={w / 2 - 8} ry={h / 2 - 5} fill="#ffffff" stroke="#7dd3fc" strokeWidth="1.2" />
      {q ? (
        <text x={cx} y={cy + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626" fontFamily={DIV2_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: items }, (_, i) => {
          const r = Math.floor(i / perRow);
          const c = i % perRow;
          const inRow = Math.min(perRow, items - r * perRow);
          const px = cx - ((inRow - 1) * step) / 2 + c * step;
          const py = cy - ((rows - 1) * 11) / 2 + r * 11;
          return <circle key={i} cx={px} cy={py} r={Math.min(5.5, step * 0.4)} fill={color} stroke="#78350f" strokeWidth="1.1" />;
        })
      )}
    </g>
  );
};

/** Rácspontok: `rows` sor, `cols` oszlop. */
export const DivArrayPart: React.FC<{ x?: number; y?: number; rows: number; cols: number; step?: number; r?: number }> = ({
  x = 20,
  y = 20,
  rows,
  cols,
  step = 22,
  r = 8
}) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const c = i % cols;
      return <circle key={i} cx={x + c * step} cy={y + rr * step} r={r} fill={rr % 2 === 0 ? '#ef4444' : '#3b82f6'} stroke="#1e293b" strokeWidth="1.2" />;
    })}
  </g>
);

/** Fele / kétszerese nyíldiagram. */
export const HalfDoublePart: React.FC<{ x?: number; y?: number; big: string; small: string }> = ({ x = 40, y = 20, big, small }) => (
  <g fontFamily={DIV2_FONT}>
    <rect x={x} y={y + 22} width="54" height="40" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.2" />
    <text x={x + 27} y={y + 50} textAnchor="middle" fontSize="20" fontWeight="900" fill={big === '?' ? '#dc2626' : '#4c1d95'}>
      {big}
    </text>
    <rect x={x + 126} y={y + 22} width="54" height="40" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.2" />
    <text x={x + 153} y={y + 50} textAnchor="middle" fontSize="20" fontWeight="900" fill={small === '?' ? '#dc2626' : '#14532d'}>
      {small}
    </text>
    <path d={`M ${x + 58} ${y + 26} Q ${x + 90} ${y - 2} ${x + 122} ${y + 26}`} fill="none" stroke="#dc2626" strokeWidth="2.4" />
    <path d={`M ${x + 114} ${y + 22} L ${x + 122} ${y + 26} L ${x + 120} ${y + 17}`} fill="none" stroke="#dc2626" strokeWidth="2.4" />
    <text x={x + 90} y={y + 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
      fele
    </text>
    <path d={`M ${x + 122} ${y + 58} Q ${x + 90} ${y + 86} ${x + 58} ${y + 58}`} fill="none" stroke="#2563eb" strokeWidth="2.4" />
    <path d={`M ${x + 66} ${y + 62} L ${x + 58} ${y + 58} L ${x + 60} ${y + 67}`} fill="none" stroke="#2563eb" strokeWidth="2.4" />
    <text x={x + 90} y={y + 88} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">
      kétszerese
    </text>
  </g>
);

// ===========================================================================
// Interaktív laborok
// ===========================================================================
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pickNew = (old: number, a: number, b: number) => {
  for (;;) {
    const v = rnd(a, b);
    if (v !== old) return v;
  }
};

type Msg = { ok: boolean; text: string } | null;

const MsgBox: React.FC<{ msg: Msg }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const choiceCls = (on: boolean, color: string) =>
  `rounded-xl font-black border-2 transition-all w-12 h-12 text-lg ${
    on ? `${color} text-white scale-105` : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
  }`;

// ---------------------------------------------------------------------------
// Labor I: Szétosztás két tányérra (egyenlő részekre osztás, maradékkal)
// ---------------------------------------------------------------------------
export const ShareLab: React.FC = () => {
  const [n, setN] = useState(10);
  const [rounds, setRounds] = useState(0);
  const [each, setEach] = useState<number | null>(null);
  const [rest, setRest] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const left = n - 2 * rounds;
  const reset = () => {
    setN((o) => pickNew(o, 4, 20));
    setRounds(0);
    setEach(null);
    setRest(null);
    setMsg(null);
  };

  const check = () => {
    if (left >= 2) {
      setMsg({ ok: false, text: `Még ${left} süti vár a tálcán. Oszd tovább, amíg jut mindkét tányérra!` });
      return;
    }
    if (each === null || rest === null) {
      setMsg({ ok: false, text: 'Kész a szétosztás! Most válaszd ki, mennyi jutott egy tányérra, és mennyi maradt!' });
      return;
    }
    const e = Math.floor(n / 2);
    const m = n % 2;
    if (each !== e) {
      setMsg({ ok: false, text: each === n ? `Ennyi süti volt összesen. Számold meg, mennyi van egy tányéron!` : `Számold meg újra az egyik tányért!` });
      return;
    }
    if (rest !== m) {
      setMsg({ ok: false, text: m === 1 ? 'Nézd a tálcát! Maradt rajta 1 süti.' : 'Nézd a tálcát! Üres, nem maradt semmi.' });
      return;
    }
    setMsg({
      ok: true,
      text: m === 0 ? `Szuper! ${n} : 2 = ${e}, mert 2 · ${e} = ${n}. A ${n} fele ${e}.` : `Ügyes! Egy tányérra ${e} jutott, és maradt 1. A maradék kisebb, mint 2.`
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Oszd szét egyenlően 2 tányérra:{' '}
        <span className="text-3xl font-black align-middle ml-2">{n} süti</span>
      </div>
      <svg viewBox="0 0 300 150" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
        <rect x="1" y="1" width="298" height="148" rx="12" fill="#f0f9ff" stroke="#bae6fd" />
        <rect x="40" y="8" width="220" height="54" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
        <DotsPart x={58} y={21} n={left} perRow={10} step={20} r={7} color="#f59e0b" />
        <text x="150" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
          tálca: {left}
        </text>
        <PlatePart cx={80} cy={112} w={120} items={rounds} />
        <PlatePart cx={220} cy={112} w={120} items={rounds} plateColor="#fce7f3" />
      </svg>
      <div className="flex justify-center">
        <button
          type="button"
          disabled={left < 2}
          onClick={() => {
            setRounds((r) => r + 1);
            setMsg(null);
          }}
          className="px-5 py-2.5 rounded-xl bg-sky-600 disabled:bg-slate-300 text-white text-base font-bold min-h-[48px]"
        >
          Tegyél 1-1 sütit mindkét tányérra!
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Egy tányérra jutott:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <button key={v} type="button" onClick={() => { setEach(v); setMsg(null); }} className={choiceCls(each === v, 'bg-sky-600 border-sky-800')}>
            {v}
          </button>
        ))}
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Maradt a tálcán:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[0, 1].map((v) => (
          <button key={v} type="button" onClick={() => { setRest(v); setMsg(null); }} className={choiceCls(rest === v, 'bg-amber-500 border-amber-700')}>
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={reset} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Csomagolj kettesével! (bennfoglalás)
// ---------------------------------------------------------------------------
export const PackLab: React.FC = () => {
  const [n, setN] = useState(12);
  const [pairs, setPairs] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const full = Math.floor(n / 2);
  const reset = () => {
    setN((o) => pickNew(o, 4, 20));
    setPairs(0);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (pairs < full) {
      setMsg({ ok: false, text: `Még van mit csomagolni! ${n - 2 * pairs} korong nincs még csomagban.` });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'Kész a csomagolás! Hány csomag lett? Válaszd ki!' });
      return;
    }
    if (chosen !== full) {
      setMsg({
        ok: false,
        text: chosen === n ? 'Ennyi korong van. De hány csomag lett? Számold a keretes párokat!' : 'Számold meg újra a keretes párokat!'
      });
      return;
    }
    setMsg({
      ok: true,
      text:
        n % 2 === 0
          ? `Igen! ${n}-ben a 2 megvan ${full}-szor. ${n} : 2 = ${full}, mert ${full} · 2 = ${n}.`
          : `Igen! ${full} csomag lett, és 1 korong maradt. Ez a maradék.`
    });
  };

  const perRow = 10;
  const rows = Math.ceil(n / perRow);
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100">
        Csomagold kettesével:{' '}
        <span className="text-3xl font-black align-middle ml-2">{n} korong</span>
      </div>
      <svg viewBox={`0 0 260 ${20 + rows * 34}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
        <rect x="1" y="1" width="258" height={18 + rows * 34} rx="12" fill="#f0fdf4" stroke="#bbf7d0" />
        <DotsPart x={32} y={26} n={n} pairs={pairs} perRow={perRow} step={22} r={8} color="#3b82f6" />
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setPairs((p) => Math.max(0, p - 1));
            setMsg(null);
          }}
          className="px-4 rounded-xl bg-slate-100 text-slate-800 border-2 border-slate-300 font-black text-base min-h-[48px]"
        >
          Vissza
        </button>
        <button
          type="button"
          disabled={pairs >= full}
          onClick={() => {
            setPairs((p) => Math.min(full, p + 1));
            setMsg(null);
          }}
          className="px-4 rounded-xl bg-emerald-600 disabled:bg-slate-300 text-white border-2 border-emerald-800 font-black text-base min-h-[48px]"
        >
          Csomagolj be 2-t!
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány csomag lett?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <button key={v} type="button" onClick={() => { setChosen(v); setMsg(null); }} className={choiceCls(chosen === v, 'bg-emerald-600 border-emerald-800')}>
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={reset} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
