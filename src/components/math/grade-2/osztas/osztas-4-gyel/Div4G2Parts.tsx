import React, { useState } from 'react';

export const DIV4_FONT = 'system-ui, Segoe UI, sans-serif';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const PLATE_COLORS = ['#8b5cf6', '#f97316', '#0ea5e9', '#10b981'];

/** Négyes doboz: 2 × 2 korong egy dobozban. */
export const FourBoxPart: React.FC<{ x: number; y: number; size?: number; color?: string }> = ({ x, y, size = 34, color = '#8b5cf6' }) => {
  const r = size * 0.17;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.18} fill="#ffffff" stroke="#475569" strokeWidth={Math.max(1.5, size * 0.06)} />
      {[
        [0.3, 0.3],
        [0.7, 0.3],
        [0.3, 0.7],
        [0.7, 0.7]
      ].map(([dx, dy], i) => (
        <circle key={i} cx={x + dx * size} cy={y + dy * size} r={r} fill={color} stroke="#1e293b" strokeWidth={Math.max(1, size * 0.03)} />
      ))}
    </g>
  );
};

/** Tányér (ellipszis) rajta `count` sütivel. */
export const PlatePart: React.FC<{ cx: number; cy: number; count?: number; w?: number; color?: string; question?: boolean }> = ({
  cx,
  cy,
  count = 0,
  w = 64,
  color = '#d97706',
  question = false
}) => {
  const h = w * 0.5;
  const perRow = 5;
  const step = w * 0.15;
  const r = w * 0.055;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={w / 2 - 6} ry={h / 2 - 5} fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {question ? (
        <text x={cx} y={cy + 7} textAnchor="middle" fontSize={w * 0.3} fontWeight="bold" fill="#dc2626" fontFamily={DIV4_FONT}>
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
              stroke="#78350f"
              strokeWidth="1"
            />
          );
        })
      )}
    </g>
  );
};

/** Korongok sorokban (`perRow` soronként). Az első `grouped` darab 4-esével bekarikázva. */
export const DotRowsPart: React.FC<{
  x: number;
  y: number;
  n: number;
  perRow?: number;
  gap?: number;
  r?: number;
  groups?: number;
  color?: string;
  restColor?: string;
}> = ({ x, y, n, perRow = 8, gap = 22, r = 7, groups = 0, color = '#8b5cf6', restColor = '#f97316' }) => (
  <g>
    {Array.from({ length: groups }, (_, g) => {
      const first = g * 4;
      const row = Math.floor(first / perRow);
      const col = first % perRow;
      return (
        <rect
          key={`g${g}`}
          x={x + col * gap - r - 4}
          y={y + row * gap - r - 4}
          width={3 * gap + 2 * r + 8}
          height={2 * r + 8}
          rx={r + 4}
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="2"
        />
      );
    })}
    {Array.from({ length: n }, (_, i) => (
      <circle
        key={i}
        cx={x + (i % perRow) * gap}
        cy={y + Math.floor(i / perRow) * gap}
        r={r}
        fill={i < groups * 4 ? color : restColor}
        stroke="#1e293b"
        strokeWidth="1.2"
      />
    ))}
  </g>
);

/** Számegyenes 0–40, 4-es ugrásokkal. */
export const JumpLinePart: React.FC<{ x?: number; y?: number; w?: number; jumps?: number; endQuestion?: boolean }> = ({
  x = 20,
  y = 70,
  w = 300,
  jumps = 0,
  endQuestion = false
}) => {
  const u = w / 40;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {Array.from({ length: 41 }, (_, i) => (
        <line
          key={i}
          x1={x + i * u}
          y1={y - (i % 10 === 0 ? 7 : i % 5 === 0 ? 5 : 3)}
          x2={x + i * u}
          y2={y + (i % 10 === 0 ? 7 : i % 5 === 0 ? 5 : 3)}
          stroke="#334155"
          strokeWidth={i % 10 === 0 ? 2 : 1}
        />
      ))}
      {[0, 10, 20, 30, 40].map((v) => (
        <text key={v} x={x + v * u} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={DIV4_FONT}>
          {v}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = x + i * 4 * u;
        const b = x + (i + 1) * 4 * u;
        return <path key={i} d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 38} ${b} ${y - 3}`} fill="none" stroke="#7c3aed" strokeWidth="2.5" />;
      })}
      {endQuestion && (
        <text x={x + jumps * 2 * u} y={y - 30} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626" fontFamily={DIV4_FONT}>
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
// Labor I: Szétosztás 4 tányérra
// ---------------------------------------------------------------------------
export const ShareLab: React.FC = () => {
  const [total, setTotal] = useState<number>(20);
  const [plates, setPlates] = useState<number[]>([0, 0, 0, 0]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const placed = plates.reduce((a, b) => a + b, 0);
  const pile = total - placed;

  const newTask = () => {
    let t = rnd(2, 10) * 4;
    while (t === total) t = rnd(2, 10) * 4;
    setTotal(t);
    setPlates([0, 0, 0, 0]);
    setChosen(null);
    setMsg(null);
  };

  const give = (i: number) => {
    if (pile <= 0) return;
    setPlates((p) => p.map((v, j) => (j === i ? v + 1 : v)));
    setMsg(null);
  };

  const dealRound = () => {
    if (pile < 4) return;
    setPlates((p) => p.map((v) => v + 1));
    setMsg(null);
  };

  const check = () => {
    const share = total / 4;
    if (pile > 0) {
      setMsg({ ok: false, text: `Még ${pile} süti van a kosárban. Oszd ki mindet!` });
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
      setMsg({ ok: false, text: 'Számold meg egy tányéron a sütiket!' });
      return;
    }
    setMsg({ ok: true, text: `Ügyes! ${total} : 4 = ${share}. Ellenőrzés: ${share} · 4 = ${total}.` });
  };

  const cols = 10;
  const pileRows = Math.max(1, Math.ceil(pile / cols));

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100">
        Oszd szét a sütiket 4 tányérra! Mindenkinek ugyanannyi jusson.
        <div className="text-3xl font-black mt-1">{total} : 4 = ?</div>
      </div>

      <svg viewBox="0 0 320 210" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
        <rect x="1" y="1" width="318" height="208" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="40" y="10" width="240" height={pileRows * 20 + 14} rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        {pile === 0 && (
          <text x="160" y="31" textAnchor="middle" fontSize="13" fill="#92400e">
            Üres a kosár
          </text>
        )}
        {Array.from({ length: pile }, (_, i) => (
          <circle key={i} cx={70 + (i % cols) * 20} cy={24 + Math.floor(i / cols) * 20} r="7" fill="#d97706" stroke="#78350f" strokeWidth="1" />
        ))}
        {plates.map((c, i) => (
          <g key={i} onClick={() => give(i)} style={{ cursor: 'pointer' }}>
            <PlatePart cx={45 + i * 77} cy={160} count={c} w={70} />
            <text x={45 + i * 77} y={202} textAnchor="middle" fontSize="13" fontWeight="bold" fill={PLATE_COLORS[i]}>
              {i + 1}. tányér
            </text>
          </g>
        ))}
      </svg>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">Koppints egy tányérra: kap 1 sütit.</p>
      <div className="flex flex-wrap justify-center gap-2">
        {plates.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => give(i)}
            className="px-3 py-2 rounded-xl bg-amber-100 text-amber-900 font-bold text-base min-h-[52px] border-2 border-amber-300"
          >
            +1 → {i + 1}.
          </button>
        ))}
        <button type="button" onClick={dealRound} className="px-3 py-2 rounded-xl bg-violet-600 text-white font-bold text-base min-h-[52px]">
          Mindenkinek 1-1
        </button>
        <button
          type="button"
          onClick={() => {
            setPlates([0, 0, 0, 0]);
            setMsg(null);
          }}
          className="px-3 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[52px]"
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
                ? 'bg-violet-600 text-white border-violet-800'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-base font-bold min-h-[52px]">
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
// Labor II: Maradékos osztás — karikázz be négyesével!
// ---------------------------------------------------------------------------
const makeRemainderTask = (prev: number): number => {
  for (;;) {
    const n = rnd(9, 39);
    if (n !== prev && n % 4 !== 0) return n;
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
      className="w-12 h-12 rounded-xl bg-violet-600 text-white font-black text-xl"
    >
      +
    </button>
  </div>
);

export const RemainderLab: React.FC = () => {
  const [n, setN] = useState<number>(23);
  const [circled, setCircled] = useState<number>(0);
  const [groupsAns, setGroupsAns] = useState<number>(0);
  const [restAns, setRestAns] = useState<number>(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const maxGroups = Math.floor(n / 4);
  const rest = n - maxGroups * 4;

  const newTask = () => {
    setN(makeRemainderTask(n));
    setCircled(0);
    setGroupsAns(0);
    setRestAns(0);
    setMsg(null);
  };

  const addGroup = () => {
    if (n - (circled + 1) * 4 < 0) {
      setMsg({ ok: false, text: 'Már nincs 4 bekarikázatlan korong. Ez a maradék!' });
      return;
    }
    setCircled((c) => c + 1);
    setMsg(null);
  };

  const check = () => {
    if (circled < maxGroups) {
      setMsg({ ok: false, text: 'Van még legalább 4 narancs korong. Karikázz be még egy négyest!' });
      return;
    }
    if (restAns >= 4) {
      setMsg({ ok: false, text: 'A maradék mindig kevesebb, mint 4! Különben még egy csoport lenne.' });
      return;
    }
    if (groupsAns !== maxGroups) {
      setMsg({ ok: false, text: 'Számold meg a lila karikákat!' });
      return;
    }
    if (restAns !== rest) {
      setMsg({ ok: false, text: 'Számold meg a karikán kívüli korongokat!' });
      return;
    }
    setMsg({
      ok: true,
      text: `Remek! ${n} korongból ${maxGroups} négyes csoport lett, és maradt ${rest}. Ellenőrzés: ${maxGroups} · 4 + ${rest} = ${n}.`
    });
  };

  const perRow = 8;
  const gap = 34;
  const rows = Math.ceil(n / perRow);
  const h = 30 + rows * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Karikázz be négyesével! Hány csoport lesz? Mennyi marad?
        <div className="text-3xl font-black mt-1">{n} korong</div>
      </div>

      <svg viewBox={`0 0 300 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
        <rect x="1" y="1" width="298" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotRowsPart x={31} y={30} n={n} perRow={perRow} gap={gap} r={10} groups={circled} color="#8b5cf6" restColor="#f97316" />
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
        <button type="button" onClick={addGroup} className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-base min-h-[52px]">
          + Karikázz be 4-et!
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Stepper label="Ennyi csoport lett:" value={groupsAns} onChange={(v) => { setGroupsAns(v); setMsg(null); }} max={10} />
        <Stepper label="Ennyi maradt:" value={restAns} onChange={(v) => { setRestAns(v); setMsg(null); }} max={9} />
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
