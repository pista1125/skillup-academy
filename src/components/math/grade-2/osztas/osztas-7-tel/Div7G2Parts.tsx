import React, { useState } from 'react';

export const DIV7_FONT = 'system-ui, Segoe UI, sans-serif';
export const GROUP_COLOR = '#0891b2';
export const REST_COLOR = '#f97316';
export const DAY_LABELS = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'];
export const PLATE_COLORS = ['#0891b2', '#f97316', '#8b5cf6', '#10b981', '#ec4899', '#eab308', '#3b82f6'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Tányér (ellipszis) rajta `count` gyümölccsel (soronként 5). */
export const PlatePart: React.FC<{ cx: number; cy: number; count?: number; w?: number; color?: string; question?: boolean }> = ({
  cx,
  cy,
  count = 0,
  w = 44,
  color = '#e11d48',
  question = false
}) => {
  const h = w * 0.62;
  const perRow = 5;
  const step = w * 0.16;
  const r = w * 0.065;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={Math.max(0.5, w / 2 - 4)} ry={Math.max(0.5, h / 2 - 4)} fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {question ? (
        <text x={cx} y={cy + w * 0.11} textAnchor="middle" fontSize={w * 0.32} fontWeight="bold" fill="#dc2626" fontFamily={DIV7_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: count }, (_, i) => {
          const row = Math.floor(i / perRow);
          const col = i % perRow;
          const inRow = Math.min(perRow, count - row * perRow);
          return (
            <circle
              key={i}
              cx={cx - ((inRow - 1) * step) / 2 + col * step}
              cy={cy - (count > perRow ? step / 2 : 0) + row * step}
              r={r}
              fill={color}
              stroke="#881337"
              strokeWidth="0.8"
            />
          );
        })
      )}
    </g>
  );
};

/**
 * Korongok hetes sorokban. Az első `groups` sor (7-7 korong) be van karikázva,
 * a többi korong narancs (maradék vagy még nem karikázott).
 */
export const DotRowsPart: React.FC<{
  x: number;
  y: number;
  n: number;
  gap?: number;
  r?: number;
  groups?: number;
  color?: string;
  restColor?: string;
}> = ({ x, y, n, gap = 22, r = 7, groups = 0, color = GROUP_COLOR, restColor = REST_COLOR }) => (
  <g>
    {Array.from({ length: groups }, (_, g) => (
      <rect
        key={`g${g}`}
        x={x - r - 4}
        y={y + g * gap - r - 3}
        width={6 * gap + 2 * r + 8}
        height={2 * r + 6}
        rx={r + 3}
        fill="#cffafe"
        stroke="#0e7490"
        strokeWidth="2"
      />
    ))}
    {Array.from({ length: n }, (_, i) => (
      <circle
        key={i}
        cx={x + (i % 7) * gap}
        cy={y + Math.floor(i / 7) * gap}
        r={r}
        fill={i < groups * 7 ? color : restColor}
        stroke="#1e293b"
        strokeWidth="1.2"
      />
    ))}
  </g>
);

/** Naptárrács: `n` nap, soronként 7 (egy sor = egy hét). */
export const DayGridPart: React.FC<{ x: number; y: number; n: number; cell?: number; labels?: boolean; restFrom?: number }> = ({
  x,
  y,
  n,
  cell = 22,
  labels = true,
  restFrom = 999
}) => (
  <g>
    {labels &&
      DAY_LABELS.map((d, i) => (
        <text key={`l${i}`} x={x + i * cell + cell / 2} y={y - 5} textAnchor="middle" fontSize={cell * 0.48} fontWeight="bold" fill="#475569" fontFamily={DIV7_FONT}>
          {d}
        </text>
      ))}
    {Array.from({ length: n }, (_, i) => (
      <rect
        key={i}
        x={x + (i % 7) * cell + 1}
        y={y + Math.floor(i / 7) * cell + 1}
        width={cell - 2}
        height={cell - 2}
        rx={Math.min(4, cell * 0.15)}
        fill={i >= restFrom ? '#fed7aa' : i % 7 >= 5 ? '#a5f3fc' : '#e0f2fe'}
        stroke={i >= restFrom ? '#c2410c' : '#0e7490'}
        strokeWidth="1.3"
      />
    ))}
  </g>
);

/** Számegyenes 0–70, 7-es ugrásokkal. */
export const JumpLinePart: React.FC<{ x?: number; y?: number; w?: number; jumps?: number; askJumps?: boolean; color?: string }> = ({
  x = 20,
  y = 70,
  w = 300,
  jumps = 0,
  askJumps = false,
  color = '#16a34a'
}) => {
  const u = w / 70;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {Array.from({ length: 71 }, (_, i) => (
        <line
          key={i}
          x1={x + i * u}
          y1={y - (i % 10 === 0 ? 7 : i % 5 === 0 ? 4.5 : 2.5)}
          x2={x + i * u}
          y2={y + (i % 10 === 0 ? 7 : i % 5 === 0 ? 4.5 : 2.5)}
          stroke="#334155"
          strokeWidth={i % 10 === 0 ? 2 : 0.9}
        />
      ))}
      {[0, 10, 20, 30, 40, 50, 60, 70].map((v) => (
        <text key={v} x={x + v * u} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={DIV7_FONT}>
          {v}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = x + i * 7 * u;
        const b = x + (i + 1) * 7 * u;
        return <path key={i} d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 34} ${b} ${y - 3}`} fill="none" stroke={color} strokeWidth="2.5" />;
      })}
      {askJumps && (
        <text x={x + jumps * 3.5 * u} y={y - 32} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#dc2626" fontFamily={DIV7_FONT}>
          ? ugrás
        </text>
      )}
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
// Labor I: Szétosztás 7 tányérra
// ---------------------------------------------------------------------------
export const ShareLab: React.FC = () => {
  const [total, setTotal] = useState<number>(21);
  const [plates, setPlates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const placed = plates.reduce((a, b) => a + b, 0);
  const pile = total - placed;

  const newTask = () => {
    let t = rnd(2, 10) * 7;
    while (t === total) t = rnd(2, 10) * 7;
    setTotal(t);
    setPlates([0, 0, 0, 0, 0, 0, 0]);
    setChosen(null);
    setMsg(null);
  };

  const give = (i: number) => {
    if (pile <= 0) return;
    setPlates((p) => p.map((v, j) => (j === i ? v + 1 : v)));
    setMsg(null);
  };

  const dealRound = () => {
    if (pile < 7) {
      setMsg({ ok: false, text: 'Nincs elég eper, hogy mind a 7 tányér kapjon!' });
      return;
    }
    setPlates((p) => p.map((v) => v + 1));
    setMsg(null);
  };

  const check = () => {
    const share = total / 7;
    if (pile > 0) {
      setMsg({ ok: false, text: `Még ${pile} eper van a kosárban. Oszd ki mindet!` });
      return;
    }
    if (plates.some((v) => v !== plates[0])) {
      setMsg({ ok: false, text: 'Nem jutott mindenkinek ugyanannyi! Kezdd újra, és adj mindenkinek egyet-egyet!' });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'Szép szétosztás! Most válaszd ki, mennyi jutott egy tányérra!' });
      return;
    }
    if (chosen !== share) {
      setMsg({ ok: false, text: 'Számold meg egy tányéron az epreket!' });
      return;
    }
    setMsg({ ok: true, text: `Ügyes! ${total} : 7 = ${share}. Ellenőrzés: ${share} · 7 = ${total}.` });
  };

  const cols = 14;
  const pileRows = Math.max(1, Math.ceil(pile / cols));

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-cyan-50 dark:bg-cyan-950/50 rounded-xl p-3 text-center text-cyan-950 dark:text-cyan-100">
        Oszd szét az epreket 7 tányérra! Mindegyikre ugyanannyi jusson.
        <div className="text-3xl font-black mt-1">{total} : 7 = ?</div>
      </div>

      <svg viewBox="0 0 330 200" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
        <rect x="1" y="1" width="328" height="198" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="20" y="10" width="290" height={pileRows * 18 + 12} rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        {pile === 0 && (
          <text x="165" y="30" textAnchor="middle" fontSize="13" fill="#92400e">
            Üres a kosár
          </text>
        )}
        {Array.from({ length: pile }, (_, i) => (
          <circle key={i} cx={42 + (i % cols) * 19} cy={22 + Math.floor(i / cols) * 18} r="6.5" fill="#e11d48" stroke="#881337" strokeWidth="1" />
        ))}
        {plates.map((c, i) => (
          <g key={i} onClick={() => give(i)} style={{ cursor: 'pointer' }}>
            <PlatePart cx={30 + i * 45} cy={150} count={c} w={42} />
            <text x={30 + i * 45} y={188} textAnchor="middle" fontSize="13" fontWeight="bold" fill={PLATE_COLORS[i]}>
              {i + 1}.
            </text>
          </g>
        ))}
      </svg>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">Koppints egy tányérra: kap 1 epret. Vagy adj mindenkinek egyszerre!</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={dealRound} className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-base min-h-[52px]">
          Mindenkinek 1-1
        </button>
        <button
          type="button"
          onClick={() => {
            setPlates([0, 0, 0, 0, 0, 0, 0]);
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[52px]"
        >
          Újrakezdem
        </button>
      </div>

      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Mennyi jutott egy tányérra?</p>
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
                ? 'bg-cyan-600 text-white border-cyan-800'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-base font-bold min-h-[52px]">
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
// Labor II: Maradékos osztás — karikázz be hetesével!
// ---------------------------------------------------------------------------
const makeRemainderTask = (prev: number): number => {
  for (;;) {
    const n = rnd(9, 69);
    if (n !== prev && n % 7 !== 0) return n;
  }
};

const Stepper: React.FC<{ label: string; value: number; onChange: (v: number) => void; max: number }> = ({ label, value, onChange, max }) => (
  <div className="flex items-center gap-2">
    <span className="font-bold text-slate-700 dark:text-slate-200">{label}</span>
    <button
      type="button"
      onClick={() => onChange(Math.max(0, value - 1))}
      className="w-12 h-12 rounded-xl bg-slate-200 text-slate-800 font-black text-xl"
    >
      −
    </button>
    <span className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center">{value}</span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-12 h-12 rounded-xl bg-cyan-600 text-white font-black text-xl"
    >
      +
    </button>
  </div>
);

export const RemainderLab: React.FC = () => {
  const [n, setN] = useState<number>(25);
  const [circled, setCircled] = useState<number>(0);
  const [groupsAns, setGroupsAns] = useState<number>(0);
  const [restAns, setRestAns] = useState<number>(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const maxGroups = Math.floor(n / 7);
  const rest = n - maxGroups * 7;

  const newTask = () => {
    setN(makeRemainderTask(n));
    setCircled(0);
    setGroupsAns(0);
    setRestAns(0);
    setMsg(null);
  };

  const addGroup = () => {
    if (n - (circled + 1) * 7 < 0) {
      setMsg({ ok: false, text: 'Már nincs 7 bekarikázatlan korong. Ez a maradék!' });
      return;
    }
    setCircled((c) => c + 1);
    setMsg(null);
  };

  const check = () => {
    if (circled < maxGroups) {
      setMsg({ ok: false, text: 'Van még legalább 7 narancs korong. Karikázz be még egy hetest!' });
      return;
    }
    if (restAns >= 7) {
      setMsg({ ok: false, text: 'A maradék mindig kevesebb, mint 7! Különben még egy csoport lenne.' });
      return;
    }
    if (groupsAns !== maxGroups) {
      setMsg({ ok: false, text: 'Számold meg a kék karikákat!' });
      return;
    }
    if (restAns !== rest) {
      setMsg({ ok: false, text: 'Számold meg a karikán kívüli korongokat!' });
      return;
    }
    setMsg({
      ok: true,
      text: `Remek! ${n} korongból ${maxGroups} hetes csoport lett, és maradt ${rest}. Ellenőrzés: ${maxGroups} · 7 + ${rest} = ${n}.`
    });
  };

  const gap = 32;
  const rows = Math.ceil(n / 7);
  const h = 30 + rows * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Karikázz be hetesével! Hány csoport lesz? Mennyi marad?
        <div className="text-3xl font-black mt-1">{n} korong</div>
      </div>

      <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
        <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotRowsPart x={34} y={30} n={n} gap={gap} r={10} groups={circled} />
      </svg>
      {circled === 0 && <p className="text-center text-sm text-slate-600 dark:text-slate-300">A narancs korongok még nincsenek bekarikázva.</p>}

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
        <button type="button" onClick={addGroup} className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-base min-h-[52px]">
          + Karikázz be 7-et!
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Stepper label="Ennyi csoport lett:" value={groupsAns} onChange={(v) => { setGroupsAns(v); setMsg(null); }} max={10} />
        <Stepper label="Ennyi maradt:" value={restAns} onChange={(v) => { setRestAns(v); setMsg(null); }} max={12} />
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
