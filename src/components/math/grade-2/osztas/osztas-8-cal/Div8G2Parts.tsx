import React, { useState } from 'react';

export const DIV8_FONT = 'system-ui, Segoe UI, sans-serif';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const PLATE_COLORS = ['#6366f1', '#f97316', '#0ea5e9', '#10b981', '#ec4899', '#eab308', '#8b5cf6', '#ef4444'];

/** Nyolcas doboz: 2 sor × 4 golyó egy fekvő dobozban (szélesség = 1.8 × magasság). */
export const EightBoxPart: React.FC<{ x: number; y: number; h?: number; color?: string; question?: boolean }> = ({
  x,
  y,
  h = 30,
  color = '#6366f1',
  question = false
}) => {
  const w = h * 1.8;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h * 0.2} fill="#ffffff" stroke="#475569" strokeWidth={Math.max(1.5, h * 0.07)} />
      {question ? (
        <text x={x + w / 2} y={y + h * 0.72} textAnchor="middle" fontSize={h * 0.62} fontWeight="bold" fill="#dc2626" fontFamily={DIV8_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: 8 }, (_, i) => (
          <circle
            key={i}
            cx={x + w * (0.16 + 0.227 * (i % 4))}
            cy={y + h * (i < 4 ? 0.3 : 0.7)}
            r={h * 0.15}
            fill={color}
            stroke="#1e293b"
            strokeWidth={Math.max(0.8, h * 0.03)}
          />
        ))
      )}
    </g>
  );
};

/** Tányér (ellipszis) rajta `count` sütivel (soronként 5). */
export const PlatePart: React.FC<{ cx: number; cy: number; count?: number; w?: number; color?: string; question?: boolean }> = ({
  cx,
  cy,
  count = 0,
  w = 64,
  color = '#d97706',
  question = false
}) => {
  const h = w * 0.55;
  const perRow = 5;
  const step = w * 0.15;
  const r = w * 0.055;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={w / 2 - 5} ry={h / 2 - 4} fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {question ? (
        <text x={cx} y={cy + w * 0.11} textAnchor="middle" fontSize={w * 0.32} fontWeight="bold" fill="#dc2626" fontFamily={DIV8_FONT}>
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

/** Korongok soronként 8-asával. Az első `groups` sor be van karikázva (egy sor = egy nyolcas csoport). */
export const DotRowsPart: React.FC<{
  x: number;
  y: number;
  n: number;
  gap?: number;
  r?: number;
  groups?: number;
  color?: string;
  restColor?: string;
}> = ({ x, y, n, gap = 22, r = 7, groups = 0, color = '#6366f1', restColor = '#f97316' }) => (
  <g>
    {Array.from({ length: groups }, (_, g) => (
      <rect
        key={`g${g}`}
        x={x - r - 4}
        y={y + g * gap - r - 4}
        width={7 * gap + 2 * r + 8}
        height={2 * r + 8}
        rx={r + 4}
        fill="#e0e7ff"
        stroke="#4f46e5"
        strokeWidth="2"
      />
    ))}
    {Array.from({ length: n }, (_, i) => (
      <circle
        key={i}
        cx={x + (i % 8) * gap}
        cy={y + Math.floor(i / 8) * gap}
        r={r}
        fill={i < groups * 8 ? color : restColor}
        stroke="#1e293b"
        strokeWidth="1.2"
      />
    ))}
  </g>
);

/** Számegyenes 0–80, tízesenként felirattal, 8-as ugrásokkal. */
export const JumpLinePart: React.FC<{ x?: number; y?: number; w?: number; jumps?: number; endQuestion?: boolean }> = ({
  x = 20,
  y = 70,
  w = 400,
  jumps = 0,
  endQuestion = false
}) => {
  const u = w / 80;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {Array.from({ length: 81 }, (_, i) => (
        <line
          key={i}
          x1={x + i * u}
          y1={y - (i % 10 === 0 ? 7 : i % 5 === 0 ? 4.5 : 2.5)}
          x2={x + i * u}
          y2={y + (i % 10 === 0 ? 7 : i % 5 === 0 ? 4.5 : 2.5)}
          stroke="#334155"
          strokeWidth={i % 10 === 0 ? 2 : 1}
        />
      ))}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((v) => (
        <text key={v} x={x + v * u} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={DIV8_FONT}>
          {v}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = x + i * 8 * u;
        const b = x + (i + 1) * 8 * u;
        return <path key={i} d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 36} ${b} ${y - 3}`} fill="none" stroke="#4f46e5" strokeWidth="2.5" />;
      })}
      {endQuestion && (
        <text x={x + jumps * 4 * u} y={y - 32} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626" fontFamily={DIV8_FONT}>
          ? ugrás
        </text>
      )}
    </g>
  );
};

/** Polip 8 karral. */
export const OctopusPart: React.FC<{ cx: number; cy: number; s?: number; color?: string }> = ({ cx, cy, s = 1, color = '#ec4899' }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    {Array.from({ length: 8 }, (_, i) => {
      const x = -14 + i * 4;
      const dir = i % 2 === 0 ? -1 : 1;
      return (
        <path
          key={i}
          d={`M ${x} 0 Q ${x + dir * 5} 10 ${x} 18 Q ${x - dir * 4} 24 ${x + dir * 2} 28`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    })}
    <path d="M -17 2 Q -18 -22 0 -22 Q 18 -22 17 2 Z" fill={color} stroke="#831843" strokeWidth="1.8" />
    <circle cx="-6" cy="-8" r="3" fill="#ffffff" />
    <circle cx="6" cy="-8" r="3" fill="#ffffff" />
    <circle cx="-6" cy="-8" r="1.4" fill="#1e293b" />
    <circle cx="6" cy="-8" r="1.4" fill="#1e293b" />
  </g>
);

const Feedback: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

// ---------------------------------------------------------------------------
// Labor I: Szétosztás 8 tányérra
// ---------------------------------------------------------------------------
export const ShareLab: React.FC = () => {
  const [total, setTotal] = useState<number>(24);
  const [plates, setPlates] = useState<number[]>(Array(8).fill(0));
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const placed = plates.reduce((a, b) => a + b, 0);
  const pile = total - placed;

  const newTask = () => {
    let t = rnd(2, 10) * 8;
    while (t === total) t = rnd(2, 10) * 8;
    setTotal(t);
    setPlates(Array(8).fill(0));
    setChosen(null);
    setMsg(null);
  };

  const give = (i: number) => {
    if (pile <= 0) return;
    setPlates((p) => p.map((v, j) => (j === i ? v + 1 : v)));
    setMsg(null);
  };

  const dealRound = () => {
    if (pile < 8) {
      if (pile > 0) setMsg({ ok: false, text: `Csak ${pile} süti maradt. Ez nem elég egy körre. Koppints a tányérokra!` });
      return;
    }
    setPlates((p) => p.map((v) => v + 1));
    setMsg(null);
  };

  const check = () => {
    const share = total / 8;
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
    setMsg({ ok: true, text: `Ügyes! ${total} : 8 = ${share}. Ellenőrzés: ${share} · 8 = ${total}.` });
  };

  const cols = 10;
  const pileRows = Math.max(1, Math.ceil(pile / cols));
  const basketH = pileRows * 16 + 14;
  const plateTop = basketH + 50;
  const h = plateTop + 150;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-indigo-50 dark:bg-indigo-950/50 rounded-xl p-3 text-center text-indigo-950 dark:text-indigo-100">
        Oszd szét a sütiket 8 tányérra! Mindenkinek ugyanannyi jusson.
        <div className="text-3xl font-black mt-1">{total} : 8 = ?</div>
      </div>

      <svg viewBox={`0 0 320 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
        <rect x="1" y="1" width="318" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="70" y="10" width="180" height={basketH} rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        {pile === 0 && (
          <text x="160" y="31" textAnchor="middle" fontSize="13" fill="#92400e">
            Üres a kosár
          </text>
        )}
        {Array.from({ length: pile }, (_, i) => (
          <circle key={i} cx={88 + (i % cols) * 16} cy={24 + Math.floor(i / cols) * 16} r="5.5" fill="#d97706" stroke="#78350f" strokeWidth="1" />
        ))}
        {plates.map((c, i) => {
          const cx = 42 + (i % 4) * 79;
          const cy = plateTop + Math.floor(i / 4) * 78;
          return (
            <g key={i} onClick={() => give(i)} style={{ cursor: 'pointer' }}>
              <PlatePart cx={cx} cy={cy} count={c} w={72} />
              <text x={cx} y={cy + 34} textAnchor="middle" fontSize="12" fontWeight="bold" fill={PLATE_COLORS[i]}>
                {i + 1}. tányér
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">Koppints egy tányérra: kap 1 sütit. Vagy adj mindenkinek egyszerre!</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={dealRound} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-base min-h-[52px]">
          Mindenkinek 1-1
        </button>
        <button
          type="button"
          onClick={() => {
            setPlates(Array(8).fill(0));
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
                ? 'bg-indigo-600 text-white border-indigo-800'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-base font-bold min-h-[52px]">
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
// Labor II: Maradékos osztás — karikázz be nyolcasával!
// ---------------------------------------------------------------------------
const makeRemainderTask = (prev: number): number => {
  for (;;) {
    const n = rnd(11, 79);
    if (n !== prev && n % 8 !== 0) return n;
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
      className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl"
    >
      +
    </button>
  </div>
);

export const RemainderLab: React.FC = () => {
  const [n, setN] = useState<number>(35);
  const [circled, setCircled] = useState<number>(0);
  const [groupsAns, setGroupsAns] = useState<number>(0);
  const [restAns, setRestAns] = useState<number>(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const maxGroups = Math.floor(n / 8);
  const rest = n - maxGroups * 8;

  const newTask = () => {
    setN(makeRemainderTask(n));
    setCircled(0);
    setGroupsAns(0);
    setRestAns(0);
    setMsg(null);
  };

  const addGroup = () => {
    if (n - (circled + 1) * 8 < 0) {
      setMsg({ ok: false, text: 'Már nincs 8 bekarikázatlan korong. Ez a maradék!' });
      return;
    }
    setCircled((c) => c + 1);
    setMsg(null);
  };

  const check = () => {
    if (circled < maxGroups) {
      setMsg({ ok: false, text: 'Van még legalább 8 narancs korong. Karikázz be még egy nyolcast!' });
      return;
    }
    if (restAns >= 8) {
      setMsg({ ok: false, text: 'A maradék mindig kevesebb, mint 8! Különben még egy csoport lenne.' });
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
      text: `Remek! ${n} korongból ${maxGroups} nyolcas csoport lett, és maradt ${rest}. Ellenőrzés: ${maxGroups} · 8 + ${rest} = ${n}.`
    });
  };

  const gap = 32;
  const rows = Math.ceil(n / 8);
  const h = 34 + rows * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Karikázz be nyolcasával! Hány csoport lesz? Mennyi marad?
        <div className="text-3xl font-black mt-1">{n} korong</div>
      </div>

      <svg viewBox={`0 0 300 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
        <rect x="1" y="1" width="298" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotRowsPart x={38} y={30} n={n} gap={gap} r={10} groups={circled} color="#6366f1" restColor="#f97316" />
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
        <button type="button" onClick={addGroup} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-base min-h-[52px]">
          + Karikázz be 8-at!
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Stepper label="Ennyi csoport:" value={groupsAns} onChange={(v) => { setGroupsAns(v); setMsg(null); }} max={10} />
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
