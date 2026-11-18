import React, { useState } from 'react';

export const DIV9_FONT = 'system-ui, Segoe UI, sans-serif';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const BOX_COLORS = ['#f97316', '#8b5cf6', '#0ea5e9', '#10b981', '#ec4899', '#eab308', '#6366f1', '#ef4444', '#14b8a6', '#a855f7'];

/** Kilences doboz: 3 × 3 korong egy dobozban. */
export const NineBoxPart: React.FC<{ x: number; y: number; size?: number; color?: string; question?: boolean }> = ({
  x,
  y,
  size = 36,
  color = '#f97316',
  question = false
}) => {
  const r = size * 0.12;
  const pos = [0.24, 0.5, 0.76];
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.18} fill="#ffffff" stroke="#475569" strokeWidth={Math.max(1.5, size * 0.06)} />
      {question ? (
        <text x={x + size / 2} y={y + size * 0.68} textAnchor="middle" fontSize={size * 0.55} fontWeight="bold" fill="#dc2626" fontFamily={DIV9_FONT}>
          ?
        </text>
      ) : (
        pos.flatMap((dy, row) =>
          pos.map((dx, col) => (
            <circle key={`${row}-${col}`} cx={x + dx * size} cy={y + dy * size} r={r} fill={color} stroke="#1e293b" strokeWidth={Math.max(0.8, size * 0.025)} />
          ))
        )
      )}
    </g>
  );
};

/** Tányér (ellipszis) rajta `count` gyümölccsel. */
export const PlatePart: React.FC<{ cx: number; cy: number; count?: number; w?: number; color?: string; question?: boolean }> = ({
  cx,
  cy,
  count = 0,
  w = 44,
  color = '#ef4444',
  question = false
}) => {
  const h = w * 0.55;
  const perRow = 3;
  const step = w * 0.22;
  const r = w * 0.085;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={w / 2 - 4} ry={h / 2 - 4} fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {question ? (
        <text x={cx} y={cy + 6} textAnchor="middle" fontSize={w * 0.38} fontWeight="bold" fill="#dc2626" fontFamily={DIV9_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: count }, (_, i) => {
          const row = Math.floor(i / perRow);
          const col = i % perRow;
          const inRow = Math.min(perRow, count - row * perRow);
          const rows = Math.ceil(count / perRow);
          return (
            <circle
              key={i}
              cx={cx - ((inRow - 1) * step) / 2 + col * step}
              cy={cy - ((rows - 1) * step) / 2 + row * step}
              r={r}
              fill={color}
              stroke="#7f1d1d"
              strokeWidth="1"
            />
          );
        })
      )}
    </g>
  );
};

/** Korongok 9-es sorokban. Az első `groups` sor bekarikázva (egy sor = egy kilences csoport). */
export const NineRowsPart: React.FC<{
  x: number;
  y: number;
  n: number;
  gap?: number;
  r?: number;
  groups?: number;
  color?: string;
  restColor?: string;
}> = ({ x, y, n, gap = 22, r = 7, groups = 0, color = '#f97316', restColor = '#0ea5e9' }) => (
  <g>
    {Array.from({ length: groups }, (_, g) => (
      <rect
        key={`g${g}`}
        x={x - r - 4}
        y={y + g * gap - r - 4}
        width={8 * gap + 2 * r + 8}
        height={2 * r + 8}
        rx={r + 4}
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="2"
      />
    ))}
    {Array.from({ length: n }, (_, i) => (
      <circle
        key={i}
        cx={x + (i % 9) * gap}
        cy={y + Math.floor(i / 9) * gap}
        r={r}
        fill={i < groups * 9 ? color : restColor}
        stroke="#1e293b"
        strokeWidth="1.2"
      />
    ))}
  </g>
);

/** Számegyenes 0–90 (tízesenként felirat), 9-es ugrásokkal. */
export const JumpLinePart: React.FC<{ x?: number; y?: number; w?: number; jumps?: number; color?: string; fontSize?: number }> = ({
  x = 20,
  y = 70,
  w = 300,
  jumps = 0,
  color = '#ea580c',
  fontSize = 12
}) => {
  const u = w / 90;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {Array.from({ length: 19 }, (_, k) => {
        const i = k * 5;
        const t = i % 10 === 0 ? 7 : 4;
        return <line key={i} x1={x + i * u} y1={y - t} x2={x + i * u} y2={y + t} stroke="#334155" strokeWidth={i % 10 === 0 ? 2 : 1} />;
      })}
      {Array.from({ length: 10 }, (_, k) => (
        <text key={k} x={x + k * 10 * u} y={y + 20} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#334155" fontFamily={DIV9_FONT}>
          {k * 10}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = x + i * 9 * u;
        const b = x + (i + 1) * 9 * u;
        return <path key={i} d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 34} ${b} ${y - 3}`} fill="none" stroke={color} strokeWidth="2.5" />;
      })}
    </g>
  );
};

const Feedback: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

// ---------------------------------------------------------------------------
// Labor I: Ugorj kilencesével! (bennfoglalás a számegyenesen)
// ---------------------------------------------------------------------------
export const JumpLab: React.FC = () => {
  const [target, setTarget] = useState<number>(54);
  const [jumps, setJumps] = useState<number>(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const good = target / 9;

  const newTask = () => {
    let t = rnd(2, 10) * 9;
    while (t === target) t = rnd(2, 10) * 9;
    setTarget(t);
    setJumps(0);
    setChosen(null);
    setMsg(null);
  };

  const jump = () => {
    if (jumps * 9 + 9 > 90) return;
    setJumps((j) => j + 1);
    setMsg(null);
  };

  const check = () => {
    const pos = jumps * 9;
    if (pos < target) {
      setMsg({ ok: false, text: 'Még nem értél a piros pontig. Ugorj még!' });
      return;
    }
    if (pos > target) {
      setMsg({ ok: false, text: 'Túlugrottál! Lépj vissza egyet.' });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'Odaértél! Most válaszd ki, hány ugrás volt!' });
      return;
    }
    if (chosen !== good) {
      setMsg({ ok: false, text: 'Számold meg a narancs íveket!' });
      return;
    }
    setMsg({ ok: true, text: `Ügyes! ${target} : 9 = ${good}, mert ${good} · 9 = ${target}.` });
  };

  const x = 20;
  const w = 280;
  const u = w / 90;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        A szöcske mindig 9-et ugrik. Hány ugrással ér a piros számra?
        <div className="text-3xl font-black mt-1">{target} : 9 = ?</div>
      </div>

      <svg viewBox="0 0 330 120" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
        <rect x="1" y="1" width="328" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <JumpLinePart x={x} y={80} w={w} jumps={jumps} fontSize={11} />
        <circle cx={x + target * u} cy={80} r="6" fill="#dc2626" />
        <text x={x + target * u} y={30} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">
          {target}
        </text>
        <circle cx={x + jumps * 9 * u} cy={74} r="7" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setJumps((j) => Math.max(0, j - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[52px]"
        >
          ← Vissza 9-et
        </button>
        <span className="font-black text-lg text-orange-900 dark:text-orange-200">Itt áll: {jumps * 9}</span>
        <button type="button" onClick={jump} className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-base min-h-[52px]">
          Ugorj 9-et! →
        </button>
      </div>

      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány ugrás volt?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setChosen(n);
              setMsg(null);
            }}
            className={`w-14 h-14 rounded-xl font-black text-lg border-2 ${
              chosen === n
                ? 'bg-orange-600 text-white border-orange-800'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Maradékos osztás 9-cel — karikázz be kilencesével!
// ---------------------------------------------------------------------------
const makeRemainderTask = (prev: number): number => {
  for (;;) {
    const n = rnd(11, 89);
    if (n !== prev && n % 9 !== 0) return n;
  }
};

const Stepper: React.FC<{ label: string; value: number; onChange: (v: number) => void; max: number }> = ({ label, value, onChange, max }) => (
  <div className="flex items-center gap-2">
    <span className="font-bold text-slate-700 dark:text-slate-200">{label}</span>
    <button type="button" onClick={() => onChange(Math.max(0, value - 1))} className="w-12 h-12 rounded-xl bg-slate-200 text-slate-800 font-black text-xl">
      −
    </button>
    <span className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center">{value}</span>
    <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-12 h-12 rounded-xl bg-orange-600 text-white font-black text-xl">
      +
    </button>
  </div>
);

export const RemainderLab: React.FC = () => {
  const [n, setN] = useState<number>(48);
  const [circled, setCircled] = useState<number>(0);
  const [groupsAns, setGroupsAns] = useState<number>(0);
  const [restAns, setRestAns] = useState<number>(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const maxGroups = Math.floor(n / 9);
  const rest = n - maxGroups * 9;

  const newTask = () => {
    setN(makeRemainderTask(n));
    setCircled(0);
    setGroupsAns(0);
    setRestAns(0);
    setMsg(null);
  };

  const addGroup = () => {
    if (n - (circled + 1) * 9 < 0) {
      setMsg({ ok: false, text: 'Már nincs 9 bekarikázatlan korong. Ez a maradék!' });
      return;
    }
    setCircled((c) => c + 1);
    setMsg(null);
  };

  const check = () => {
    if (circled < maxGroups) {
      setMsg({ ok: false, text: 'Van még egy teli kék sor. Karikázz be még egy kilencest!' });
      return;
    }
    if (restAns >= 9) {
      setMsg({ ok: false, text: 'A maradék mindig kevesebb, mint 9! Különben még egy csoport lenne.' });
      return;
    }
    if (groupsAns !== maxGroups) {
      setMsg({ ok: false, text: 'Számold meg a narancs karikákat!' });
      return;
    }
    if (restAns !== rest) {
      setMsg({ ok: false, text: 'Számold meg a karikán kívüli kék korongokat!' });
      return;
    }
    setMsg({
      ok: true,
      text: `Remek! ${n} korongból ${maxGroups} kilences csoport lett, és maradt ${rest}. Ellenőrzés: ${maxGroups} · 9 + ${rest} = ${n}.`
    });
  };

  const gap = 30;
  const rows = Math.ceil(n / 9);
  const h = 30 + rows * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Karikázz be kilencesével! Hány csoport lesz? Mennyi marad?
        <div className="text-3xl font-black mt-1">{n} korong</div>
      </div>

      <svg viewBox={`0 0 300 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
        <rect x="1" y="1" width="298" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <NineRowsPart x={30} y={28} n={n} gap={gap} r={10} groups={circled} />
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setCircled((c) => Math.max(0, c - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[52px]"
        >
          − 1 karika
        </button>
        <button type="button" onClick={addGroup} className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-base min-h-[52px]">
          + Karikázz be 9-et!
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Stepper label="Ennyi csoport:" value={groupsAns} onChange={(v) => { setGroupsAns(v); setMsg(null); }} max={10} />
        <Stepper label="Ennyi maradt:" value={restAns} onChange={(v) => { setRestAns(v); setMsg(null); }} max={12} />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};
