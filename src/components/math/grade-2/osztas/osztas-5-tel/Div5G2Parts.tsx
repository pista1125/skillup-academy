import React, { useState } from 'react';
import { FiveDotsG } from '../../szorzas/szorzas-5-tel/Mult5G2Parts';

export { MULT5_FONT as DIV5_FONT, MULT5_UNK as DIV5_UNK, HandG, CoinG, TokenG, FiveDotsG, JumpLineG } from '../../szorzas/szorzas-5-tel/Mult5G2Parts';

// ---------------------------------------------------------------------------
// Alap SVG-elemek
// ---------------------------------------------------------------------------

/**
 * `total` darab pötty ötösével csoportosítva (dobókocka-elrendezés).
 * A teli ötösök bekarikázva, a maradék pöttyök pirosak, karika nélkül.
 */
export const GroupedDotsG: React.FC<{
  x: number;
  y: number;
  total: number;
  cols: number;
  cellW: number;
  cellH: number;
  d?: number;
  r?: number;
  ring?: boolean;
  fill?: string;
}> = ({ x, y, total, cols, cellW, cellH, d = 6, r = 2.6, ring = true, fill = '#f59e0b' }) => {
  const full = Math.floor(total / 5);
  const rest = total % 5;
  const slots = full + (rest > 0 ? 1 : 0);
  return (
    <g>
      {Array.from({ length: slots }, (_, i) => {
        const cx = x + (i % cols) * cellW + cellW / 2;
        const cy = y + Math.floor(i / cols) * cellH + cellH / 2;
        const isRest = i === full;
        return (
          <g key={i}>
            {ring && !isRest && (
              <circle cx={cx} cy={cy} r={Math.min(cellW, cellH) / 2 - 1} fill="#fff" stroke="#16a34a" strokeWidth="1.8" />
            )}
            <FiveDotsG
              cx={cx}
              cy={cy}
              d={d}
              r={r}
              count={isRest ? rest : 5}
              fill={isRest ? '#ef4444' : fill}
              stroke={isRest ? '#991b1b' : '#92400e'}
            />
          </g>
        );
      })}
    </g>
  );
};

/** Tányér felülnézetből. */
export const PlateG: React.FC<{ cx: number; cy: number; rx?: number; ry?: number }> = ({ cx, cy, rx = 24, ry = 10 }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.62} ry={ry * 0.6} fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />
  </g>
);

/** Kis keksz (barna korong). */
export const CookieG: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 4.5 }) => (
  <circle cx={cx} cy={cy} r={r} fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
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

const ChoiceRow: React.FC<{
  label: string;
  values: number[];
  value: number | null;
  onPick: (v: number) => void;
  color: string;
}> = ({ label, values, value, onPick, color }) => (
  <div className="space-y-1">
    <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">{label}</p>
    <div className="flex flex-wrap justify-center gap-1.5">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onPick(v)}
          className={`w-11 h-11 rounded-xl font-black text-lg border-2 transition-all ${
            value === v ? `${color} text-white scale-105` : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  </div>
);

/** Labor I: szétosztás 5 tányérra (részekre osztás, maradékkal). */
export const PlatesLab: React.FC = () => {
  const [total, setTotal] = useState(23);
  const [rounds, setRounds] = useState(0);
  const [each, setEach] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const pile = total - rounds * 5;
  const maxRounds = Math.floor(total / 5);

  const newTask = () => {
    let next = total;
    while (next === total) next = rnd(10, 49);
    setTotal(next);
    setRounds(0);
    setEach(null);
    setLeft(null);
    setMsg(null);
  };

  const deal = () => {
    if (pile >= 5) {
      setRounds((r) => r + 1);
      setMsg(null);
    } else {
      setMsg({ ok: false, text: `Már csak ${pile} keksz maradt. Ez nem elég, hogy mind az 5 tányérra jusson!` });
    }
  };

  const check = () => {
    if (rounds < maxRounds) {
      setMsg({ ok: false, text: `Még ${pile} keksz van fent. Ebből még mindegyik tányérra jut! Ossz tovább!` });
      return;
    }
    if (each === null || left === null) {
      setMsg({ ok: false, text: 'Kész a szétosztás! Most válaszd ki lent a két számot!' });
      return;
    }
    const rest = total % 5;
    if (each !== maxRounds) {
      setMsg({ ok: false, text: `Nézd meg egy tányért! Számold meg, hány keksz van rajta.` });
      return;
    }
    if (left !== rest) {
      setMsg({ ok: false, text: `Az egy tányérra jutó szám jó! A maradék: nézd meg, hány keksz maradt fent.` });
      return;
    }
    setMsg({
      ok: true,
      text:
        rest === 0
          ? `Szuper! ${total} : 5 = ${maxRounds}. Minden tányérra ${maxRounds} jutott, nem maradt semmi.`
          : `Szuper! Minden tányérra ${maxRounds} jutott, és ${rest} maradt. ${maxRounds} · 5 + ${rest} = ${total}.`
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Oszd szét igazságosan 5 tányérra!{' '}
        <span className="text-2xl sm:text-3xl font-black align-middle ml-2">{total} keksz</span>
      </div>
      <svg viewBox="0 0 340 190" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="338" height="188" rx="12" fill="#fffbeb" stroke="#fcd34d" />
        {/* kupac */}
        {Array.from({ length: pile }, (_, i) => (
          <CookieG key={i} cx={30 + (i % 17) * 17} cy={18 + Math.floor(i / 17) * 15} r={5.5} />
        ))}
        {Array.from({ length: 5 }, (_, p) => {
          const cx = 38 + p * 66;
          return (
            <g key={p}>
              <PlateG cx={cx} cy={160} rx={30} ry={13} />
              {Array.from({ length: rounds }, (_, k) => (
                <CookieG key={k} cx={cx - 7 + (k % 2) * 14} cy={146 - Math.floor(k / 2) * 13} r={5.5} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={deal} className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold min-h-[48px]">
          Mindegyik tányérra 1 keksz
        </button>
        <button
          type="button"
          onClick={() => {
            setRounds((r) => Math.max(0, r - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900 font-bold min-h-[48px]"
        >
          Vissza
        </button>
      </div>
      <ChoiceRow label="Egy tányérra jut:" values={[1, 2, 3, 4, 5, 6, 7, 8, 9]} value={each} onPick={(v) => { setEach(v); setMsg(null); }} color="bg-amber-500 border-amber-700" />
      <ChoiceRow label="Maradt:" values={[0, 1, 2, 3, 4, 5, 6]} value={left} onPick={(v) => { setLeft(v); setMsg(null); }} color="bg-rose-500 border-rose-700" />
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

/** Labor II: csomagolás ötösével (bennfoglalás, maradékkal), a könyv jelölésével. */
export const PackLab: React.FC = () => {
  const [total, setTotal] = useState(27);
  const [bags, setBags] = useState(0);
  const [sq, setSq] = useState<number | null>(null);
  const [circ, setCirc] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const loose = total - bags * 5;
  const full = Math.floor(total / 5);
  const rest = total % 5;

  const newTask = () => {
    let next = total;
    while (next === total) next = rnd(11, 49);
    setTotal(next);
    setBags(0);
    setSq(null);
    setCirc(null);
    setMsg(null);
  };

  const pack = () => {
    if (loose >= 5) {
      setBags((b) => b + 1);
      setMsg(null);
    } else {
      setMsg({ ok: false, text: `Már csak ${loose} golyó van kint. Ebből nem lesz teli zacskó!` });
    }
  };

  const check = () => {
    if (bags < full) {
      setMsg({ ok: false, text: `Még ${loose} golyó van kint. Ebből még lesz teli zacskó! Csomagolj tovább!` });
      return;
    }
    if (sq === null || circ === null) {
      setMsg({ ok: false, text: 'Kész a csomagolás! Most töltsd ki a □-et és a ○-t!' });
      return;
    }
    if (circ >= 5) {
      setMsg({ ok: false, text: 'A maradék nem lehet 5 vagy több! 5 golyóból még egy zacskó lesz.' });
      return;
    }
    if (sq !== full) {
      setMsg({ ok: false, text: 'A □ a teli zacskók száma. Számold meg a zacskókat!' });
      return;
    }
    if (circ !== rest) {
      setMsg({ ok: false, text: 'A ○ a kint maradt golyók száma. Számold meg őket!' });
      return;
    }
    setMsg({ ok: true, text: `Remek! ${full} · 5 + ${rest} = ${total}. ${full} teli zacskó lett, és ${rest} golyó maradt.` });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Tegyél 5 golyót minden zacskóba!{' '}
        <span className="text-2xl sm:text-3xl font-black align-middle ml-2">{total} golyó</span>
      </div>
      <svg viewBox="0 0 340 170" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="338" height="168" rx="12" fill="#f0f9ff" stroke="#bae6fd" />
        {Array.from({ length: loose }, (_, i) => (
          <circle key={i} cx={24 + (i % 17) * 17.5} cy={20 + Math.floor(i / 17) * 16} r="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
        ))}
        {Array.from({ length: bags }, (_, b) => {
          const x = 14 + (b % 5) * 64;
          const y = 74 + Math.floor(b / 5) * 46;
          return (
            <g key={b}>
              <path d={`M ${x + 6} ${y} L ${x + 52} ${y} L ${x + 56} ${y + 40} L ${x + 2} ${y + 40} Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
              <FiveDotsG cx={x + 29} cy={y + 21} d={9} r={4.2} fill="#3b82f6" stroke="#1e3a8a" />
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={pack} className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold min-h-[48px]">
          Csomagolj 5 golyót!
        </button>
        <button
          type="button"
          onClick={() => {
            setBags((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-sky-100 text-sky-900 font-bold min-h-[48px]"
        >
          Vissza
        </button>
      </div>
      <div className="text-center text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
        <span className="inline-block min-w-[44px] px-2 rounded-lg border-2 border-amber-500 bg-amber-50 dark:bg-amber-950">{sq ?? '□'}</span>
        {' · 5 + '}
        <span className="inline-block min-w-[44px] px-2 rounded-full border-2 border-rose-500 bg-rose-50 dark:bg-rose-950">{circ ?? '○'}</span>
        {` = ${total}`}
      </div>
      <ChoiceRow label="□ = teli zacskók" values={[1, 2, 3, 4, 5, 6, 7, 8, 9]} value={sq} onPick={(v) => { setSq(v); setMsg(null); }} color="bg-amber-500 border-amber-700" />
      <ChoiceRow label="○ = maradék" values={[0, 1, 2, 3, 4, 5, 6]} value={circ} onPick={(v) => { setCirc(v); setMsg(null); }} color="bg-rose-500 border-rose-700" />
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
