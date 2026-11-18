import React, { useState } from 'react';
import {
  FONT,
  INK,
  UNK,
  QFig,
  az,
  Az,
  es,
  LabTask,
  LabBox,
  LabButton,
  Feedback,
  NumInput,
  useTaskTrainer,
} from '../../szorzas/gyakorlas-tudasproba/MultExamG2Parts';

// ---------------------------------------------------------------------------
// 10. Gyakorlás, tudáspróba (V. Osztás) – osztásos kérdésábrák, generátorok,
// laborok. Az általános elemeket a szorzásos tudáspróbából vesszük át.
// ---------------------------------------------------------------------------

/** „-ad / -ed része” alakok (2–10). */
export const RESZE: Record<number, string> = {
  2: 'fele',
  3: 'harmada',
  4: 'negyede',
  5: 'ötöde',
  6: 'hatoda',
  7: 'hetede',
  8: 'nyolcada',
  9: 'kilencede',
  10: 'tizede',
};

/** „-esével” alak: 4-esével, 3-asával, 5-ösével, 6-osával. */
export const esevel = (n: number): string => {
  const e = es(n);
  return e + (e === '-as' || e === '-os' ? 'ával' : 'ével');
};

const rint = (lo: number, hi: number, rnd: () => number) => lo + Math.floor(rnd() * (hi - lo + 1));

const cleanMistakes = (answer: number, list: { value: number; msg: string }[]) => {
  const seen = new Set<number>();
  return list.filter((m) => {
    if (m.value === answer || m.value < 0 || !Number.isInteger(m.value) || seen.has(m.value)) return false;
    seen.add(m.value);
    return true;
  });
};

// ---------------------------------------------------------------------------
// Szétosztás tányérokra. pile: ennyi süti vár a kosárban (szám), each: ennyi
// pötty van már minden tányéron.
// ---------------------------------------------------------------------------
export const QPlates: React.FC<{ plates: number; pile?: number; each?: number; caption?: string }> = ({
  plates,
  pile,
  each,
  caption,
}) => {
  const hasPile = pile !== undefined;
  const area = hasPile ? 186 : 240;
  const pw = Math.min(46, (area - (plates - 1) * 5) / plates);
  const gap = 5;
  const total = plates * pw + (plates - 1) * gap;
  const x0 = (hasPile ? 66 : 10) + (area - total) / 2;
  const H = 86 + (caption ? 22 : 0);
  const e = each ?? 0;
  const dc = e <= 3 ? Math.max(e, 1) : Math.ceil(e / 2);
  const dr = e <= 3 ? 1 : 2;
  const s = Math.min(9, (pw - 6) / dc);
  return (
    <QFig h={H}>
      {hasPile && (
        <g>
          <path d="M 14 40 H 64 L 58 72 H 20 Z" fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
          <path d="M 18 40 Q 39 14 60 40" fill="none" stroke="#a16207" strokeWidth="2.5" />
          <text x="39" y="64" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
            {pile}
          </text>
        </g>
      )}
      {Array.from({ length: plates }, (_, i) => {
        const x = x0 + i * (pw + gap);
        return (
          <g key={i}>
            <ellipse cx={x + pw / 2} cy={52} rx={pw / 2} ry={16} fill="#fff" stroke="#7c3aed" strokeWidth="2.2" />
            <ellipse cx={x + pw / 2} cy={52} rx={pw / 2 - 5} ry={10} fill="#f5f3ff" />
            {Array.from({ length: e }, (_, k) => (
              <circle
                key={k}
                cx={x + (pw - dc * s) / 2 + s * ((k % dc) + 0.5)}
                cy={52 - (dr * s) / 2 + s * (Math.floor(k / dc) + 0.5)}
                r={s * 0.36}
                fill="#ea580c"
              />
            ))}
            {!each && (
              <text x={x + pw / 2} y={57} textAnchor="middle" fontSize="13" fontWeight="900" fill={UNK}>
                ?
              </text>
            )}
          </g>
        );
      })}
      {caption && (
        <text x="130" y={H - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Maradékos csoportosítás: d-s csoportok bekarikázva, a maradék piros.
// ask: alul „Ennyi csoport: □  Ennyi maradt: □”.
// ---------------------------------------------------------------------------
export const QRemainder: React.FC<{ n: number; d: number; ask?: boolean; caption?: string }> = ({ n, d, ask = true, caption }) => {
  const q = Math.floor(n / d);
  const r = n % d;
  const s = n > 45 ? 7 : 9;
  const cols = Math.min(d, 5);
  const rowsIn = Math.ceil(d / 5);
  const bw = cols * s + 8;
  const bh = rowsIn * s + 8;
  const perRow = Math.max(1, Math.floor(244 / (bw + 6)));
  const blocks = q + (r > 0 ? 1 : 0);
  const blockRows = Math.ceil(blocks / perRow);
  const bottom = (ask ? 30 : 0) + (caption ? 22 : 0);
  const H = 12 + blockRows * (bh + 6) + bottom + 6;
  return (
    <QFig h={H}>
      {Array.from({ length: blocks }, (_, bi) => {
        const row = Math.floor(bi / perRow);
        const col = bi % perRow;
        const inRow = Math.min(perRow, blocks - row * perRow);
        const bx = (260 - (inRow * (bw + 6) - 6)) / 2 + col * (bw + 6);
        const by = 10 + row * (bh + 6);
        const isRest = bi === q;
        const cnt = isRest ? r : d;
        return (
          <g key={bi}>
            {!isRest && <rect x={bx} y={by} width={bw} height={bh} rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2" />}
            {Array.from({ length: cnt }, (_, k) => (
              <circle
                key={k}
                cx={bx + 4 + s * ((k % 5) + 0.5)}
                cy={by + 4 + s * (Math.floor(k / 5) + 0.5)}
                r={s * 0.36}
                fill={isRest ? UNK : '#7c3aed'}
              />
            ))}
          </g>
        );
      })}
      {ask && (
        <g>
          <text x="30" y={H - bottom + 18} fontSize="13" fontWeight="900" fill={INK}>
            Ennyi csoport:
          </text>
          <rect x="128" y={H - bottom + 3} width="22" height="20" rx="4" fill="#fff" stroke="#334155" strokeWidth="1.8" />
          <text x="158" y={H - bottom + 18} fontSize="13" fontWeight="900" fill={INK}>
            maradt:
          </text>
          <rect x="212" y={H - bottom + 3} width="22" height="20" rx="4" fill="#fff" stroke="#334155" strokeWidth="1.8" />
        </g>
      )}
      {caption && (
        <text x="130" y={H - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// „Hány kell?” – egy tároló a befogadóképességgel, és az összes darab.
// ---------------------------------------------------------------------------
export type Holder = 'boat' | 'box' | 'shelf' | 'bus' | 'bag';

const HOLDER_WORD: Record<Holder, string> = {
  boat: 'csónakba',
  box: 'dobozba',
  shelf: 'polcra',
  bus: 'kisbuszba',
  bag: 'zacskóba',
};

export const HolderIcon: React.FC<{ kind: Holder; x: number; y: number; w: number; h: number }> = ({ kind, x, y, w, h }) => {
  if (kind === 'boat')
    return <path d={`M ${x} ${y + h * 0.35} H ${x + w} L ${x + w * 0.82} ${y + h} H ${x + w * 0.18} Z`} fill="#bae6fd" stroke="#0369a1" strokeWidth="2.2" />;
  if (kind === 'bus')
    return (
      <g>
        <rect x={x} y={y} width={w} height={h * 0.8} rx="6" fill="#fde68a" stroke="#a16207" strokeWidth="2.2" />
        <circle cx={x + w * 0.25} cy={y + h * 0.85} r={h * 0.13} fill="#334155" />
        <circle cx={x + w * 0.75} cy={y + h * 0.85} r={h * 0.13} fill="#334155" />
      </g>
    );
  if (kind === 'shelf')
    return (
      <g>
        <rect x={x} y={y + h * 0.82} width={w} height={h * 0.14} fill="#b45309" />
        <rect x={x} y={y} width={w} height={h * 0.82} fill="#fff7ed" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 3" />
      </g>
    );
  if (kind === 'bag') return <path d={`M ${x + w * 0.1} ${y + h * 0.15} H ${x + w * 0.9} L ${x + w} ${y + h} H ${x} Z`} fill="#fbcfe8" stroke="#be185d" strokeWidth="2.2" />;
  return <rect x={x} y={y} width={w} height={h} rx="5" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2.2" />;
};

export const QBoxNeed: React.FC<{ total: number; each: number; kind: Holder; item?: string; ask?: string }> = ({ total, each, kind, item = 'darab', ask = 'Hány kell?' }) => {
  const w = 88;
  const h = 54;
  const dc = Math.min(each, 5);
  const s = Math.min(14, (w - 12) / dc);
  return (
    <QFig h={112}>
      <HolderIcon kind={kind} x={18} y={14} w={w} h={h} />
      {Array.from({ length: each }, (_, k) => (
        <circle key={k} cx={18 + (w - dc * s) / 2 + s * ((k % dc) + 0.5)} cy={14 + h * 0.5 + (Math.floor(k / dc) - 0.5) * s * 0.9} r={s * 0.32} fill="#7c3aed" />
      ))}
      <text x={62} y={90} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        1 {HOLDER_WORD[kind]} {each} fér
      </text>
      <text x={186} y={46} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        Összesen:
      </text>
      <text x={186} y={72} textAnchor="middle" fontSize="24" fontWeight="900" fill={INK}>
        {total} {item}
      </text>
      <text x={186} y={98} textAnchor="middle" fontSize="13" fontWeight="900" fill={UNK}>
        {ask}
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Műveletcsalád háromszögben: a · b = c
// ---------------------------------------------------------------------------
export const QFamily: React.FC<{ a: string | number; b: string | number; c: string | number }> = ({ a, b, c }) => {
  const node = (t: string | number, x: number, y: number, k: string) => {
    const u = t === '?';
    return (
      <g key={k}>
        <circle cx={x} cy={y} r="19" fill={u ? '#fee2e2' : '#f5f3ff'} stroke={u ? UNK : '#6d28d9'} strokeWidth="2.4" />
        <text x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={u ? UNK : INK}>
          {t}
        </text>
      </g>
    );
  };
  return (
    <QFig h={112}>
      <path d="M 130 26 L 82 88 L 178 88 Z" fill="#faf5ff" stroke="#a78bfa" strokeWidth="2.5" />
      {node(c, 130, 26, 'c')}
      {node(a, 82, 88, 'a')}
      {node(b, 178, 88, 'b')}
      <text x="226" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">
        ·  és  :
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Labor I: vegyes osztás-gyakorló
// ---------------------------------------------------------------------------
export type DivKind = 'bennfoglalas' | 'resze' | 'osztando' | 'oszto' | 'szoveg';

export const DIV_KINDS: { id: DivKind; label: string }[] = [
  { id: 'bennfoglalas', label: 'Osztás' },
  { id: 'resze', label: '-ad része' },
  { id: 'osztando', label: '□ : 6 = 7' },
  { id: 'oszto', label: '42 : □ = 7' },
  { id: 'szoveg', label: 'Szöveges' },
];

const WORDS: { make: (p: number, d: number, q: number) => string; unit: string }[] = [
  { make: (p, d) => `${p} süti, ${d} tányérra egyformán. Mennyi jut egy tányérra?`, unit: 'süti' },
  { make: (p, d) => `${p} ceruza, ${d}${esevel(d)} csomagoljuk. Hány csomag lesz?`, unit: 'csomag' },
  { make: (p, d) => `${p} matrica, ${d} gyerek kap egyformán. Mennyi jut egynek?`, unit: 'matrica' },
  { make: (p, d) => `${p} tojás, egy dobozba ${d} fér. Hány teli doboz lesz?`, unit: 'doboz' },
];

/** divisor = 0: vegyes (2–10). */
export function makeDivTask(kind: DivKind, divisor: number, rnd: () => number = Math.random): LabTask {
  const d = divisor >= 2 && divisor <= 10 ? divisor : rint(2, 10, rnd);
  const qn = rint(1, 10, rnd);
  const p = qn * d;
  const check = `Ellenőrizd szorzással: ${qn} · ${d} = ${p}.`;
  if (kind === 'bennfoglalas') {
    return {
      text: `${p} : ${d} = ?`,
      answer: qn,
      hint: `Hányszor van meg ${az(d)} ${d} ebben: ${p}? Gondolj ${az(d)} ${d}${es(d)} szorzótáblára!`,
      mistakes: cleanMistakes(qn, [
        { value: p - d, msg: `Nem kivonás! Azt keresd, hányszor van meg ${az(d)} ${d} ebben: ${p}.` },
        { value: qn + 1, msg: `Egy csoporttal több: ${qn + 1} · ${d} = ${(qn + 1) * d}, ez több, mint ${p}.` },
        { value: qn - 1, msg: `Egy csoporttal kevesebb: ${qn - 1} · ${d} = ${(qn - 1) * d}. Még marad!` },
        { value: d, msg: `Ezzel osztunk. Azt keresd: hány ${d}${es(d)} csoport lesz?` },
      ]),
    };
  }
  if (kind === 'resze') {
    return {
      text: `Mennyi ${az(p)} ${p} ${RESZE[d]}?`,
      answer: qn,
      hint: `${Az(p)} ${p} ${RESZE[d]}: ${p} : ${d}. ${check}`,
      mistakes: cleanMistakes(qn, [
        { value: p - d, msg: `Nem kivonás! ${Az(p)} ${p} ${RESZE[d]} = ${p} : ${d}.` },
        { value: p * d <= 100 ? p * d : -1, msg: `Ez szorzás lett! ${d === 5 ? 'Az' : 'A'} ${RESZE[d]} azt jelenti: ${d} egyenlő részre osztjuk.` },
        { value: qn + 1, msg: `Majdnem! Nézd: ${qn} · ${d} = ${p}.` },
      ]),
    };
  }
  if (kind === 'osztando') {
    return {
      text: `□ : ${d} = ${qn}`,
      answer: p,
      hint: `Szorozz: ${qn} · ${d} = □. Ellenőrzés: □ : ${d} = ${qn}.`,
      mistakes: cleanMistakes(p, [
        { value: qn + d, msg: `Nem összeadás! A □ = ${qn} · ${d}.` },
        { value: Math.abs(qn - d), msg: `Nem kivonás! A □ = ${qn} · ${d}.` },
      ]),
    };
  }
  if (kind === 'oszto') {
    return {
      text: `${p} : □ = ${qn}`,
      answer: d,
      hint: `Hányszor ${qn} lesz ${p}? Keresd: ${qn} · □ = ${p}.`,
      mistakes: cleanMistakes(d, [
        { value: p - qn, msg: `Nem kivonás! Keresd: ${qn} · □ = ${p}.` },
        { value: qn, msg: `${Az(qn)} ${qn} az eredmény. Azt keresd, mivel osztottunk!` },
      ]),
    };
  }
  const w = WORDS[rint(0, WORDS.length - 1, rnd)];
  return {
    text: w.make(p, d, qn),
    answer: qn,
    hint: `Ossz: ${p} : ${d}. Segít: □ · ${d} = ${p}.`,
    mistakes: cleanMistakes(qn, [
      { value: p - d, msg: `Nem kivonás! Ossz: ${p} : ${d}.` },
      { value: p + d <= 100 ? p + d : -1, msg: `Nem összeadás! Ossz: ${p} : ${d}.` },
      { value: qn + 1, msg: `Egy kicsit sok. ${check}` },
    ]),
  };
}

// ---------------------------------------------------------------------------
// Labor II: maradékos osztás és „Hány kell?”
// ---------------------------------------------------------------------------
export type RemMode = 'maradek' | 'hanykell';

export interface RemTask {
  n: number;
  d: number;
  q: number;
  r: number;
}

/** Maradékos feladat: n ≤ 60, a maradék 1 és d − 1 között. */
export function makeRemTask(prevN = 0, rnd: () => number = Math.random): RemTask {
  for (;;) {
    const d = rint(2, 9, rnd);
    const qMax = Math.min(9, Math.floor((60 - (d - 1)) / d));
    const q = rint(1, Math.max(1, qMax), rnd);
    const r = rint(1, d - 1, rnd);
    const n = q * d + r;
    if (n <= 60 && n !== prevN) return { n, d, q, r };
  }
}

export const DivMixLab: React.FC = () => {
  const [kind, setKind] = useState<DivKind>('bennfoglalas');
  const [divisor, setDivisor] = useState(0);
  const tr = useTaskTrainer(() => makeDivTask('bennfoglalas', 0));
  const pick = (k: DivKind, d: number) => {
    setKind(k);
    setDivisor(d);
    tr.next(makeDivTask(k, d));
  };
  return (
    <LabBox color="violet">
      <div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Mivel osztunk?</div>
        <div className="flex flex-wrap gap-2">
          {[0, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
            <LabButton key={d} kind={d === divisor ? 'picked' : 'pick'} onClick={() => pick(kind, d)}>
              {d === 0 ? 'Vegyes' : `: ${d}`}
            </LabButton>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Milyen feladat?</div>
        <div className="flex flex-wrap gap-2">
          {DIV_KINDS.map((k) => (
            <LabButton key={k.id} kind={k.id === kind ? 'picked' : 'pick'} onClick={() => pick(k.id, divisor)}>
              {k.label}
            </LabButton>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 p-4 text-center space-y-3">
        <div className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">{tr.task.text}</div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <NumInput value={tr.guess} onChange={tr.setGuess} onEnter={tr.check} label="A te válaszod" />
          <LabButton onClick={tr.check}>Ellenőrzés</LabButton>
          <LabButton kind="new" onClick={() => tr.next(makeDivTask(kind, divisor))}>
            Új feladat
          </LabButton>
        </div>
        <Feedback fb={tr.fb} />
        <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
          Pontjaid: {tr.score.ok} jó válasz / {tr.score.all} feladat
        </div>
      </div>
    </LabBox>
  );
};

export const RemainderLab: React.FC = () => {
  const [mode, setMode] = useState<RemMode>('maradek');
  const [task, setTask] = useState<RemTask>(() => makeRemTask());
  const [gIn, setGIn] = useState('');
  const [rIn, setRIn] = useState('');
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null);
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState(0);

  const next = (m: RemMode = mode) => {
    setMode(m);
    setTask((t) => makeRemTask(t.n));
    setGIn('');
    setRIn('');
    setFb(null);
    setSolved(false);
  };

  const { n, d, q, r } = task;

  const check = () => {
    if (mode === 'hanykell') {
      if (gIn === '') return;
      const v = Number(gIn);
      if (v === q + 1) {
        setFb({ ok: true, msg: `Így van! ${q} teli csónak, és a maradék ${r} gyereknek is kell egy: ${q} + 1 = ${q + 1}.` });
        if (!solved) setScore((s) => s + 1);
        setSolved(true);
      } else if (v === q) {
        setFb({ ok: false, msg: `Ekkor ${r} gyerek a parton marad! Nekik is kell még egy csónak.` });
      } else {
        setFb({ ok: false, msg: `Karikázz be ${d}${es(d)} csoportokat! Hány csoport lesz, és marad-e valaki?` });
      }
      return;
    }
    if (gIn === '' || rIn === '') {
      setFb({ ok: false, msg: 'Írd be mindkét számot: a csoportokat és a maradékot!' });
      return;
    }
    const g = Number(gIn);
    const m = Number(rIn);
    if (m >= d) {
      setFb({ ok: false, msg: `A maradék nem lehet ${d} vagy több! Abból még egy ${d}${es(d)} csoport kijön.` });
    } else if (g * d + m !== n) {
      setFb({ ok: false, msg: `Ellenőrizd: ${g} · ${d} + ${m} = ${g * d + m}, de ${n} korong van.` });
    } else {
      setFb({ ok: true, msg: `Hibátlan! Ennyi csoport: ${q}, ennyi maradt: ${r}. Ellenőrzés: ${q} · ${d} + ${r} = ${n}.` });
      if (!solved) setScore((s) => s + 1);
      setSolved(true);
    }
  };

  const perRow = 10;
  const s = 26;
  const rows = Math.ceil(n / perRow);
  const color = (i: number) => {
    if (!solved) return '#8b5cf6';
    const g = Math.floor(i / d);
    if (g >= q) return UNK;
    return ['#8b5cf6', '#0ea5e9', '#f97316', '#10b981', '#ec4899', '#eab308', '#6366f1', '#14b8a6', '#84cc16'][g % 9];
  };

  return (
    <LabBox color="amber">
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton kind={mode === 'maradek' ? 'picked' : 'pick'} onClick={() => next('maradek')}>
          Maradékos osztás
        </LabButton>
        <LabButton kind={mode === 'hanykell' ? 'picked' : 'pick'} onClick={() => next('hanykell')}>
          Hány csónak kell?
        </LabButton>
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-3 text-center text-base sm:text-lg font-bold text-amber-950 dark:text-amber-100">
        {mode === 'maradek'
          ? `${n} korong. Rakd ${d}${es(d)} csoportokba!`
          : `${n} gyerek csónakázik. Egy csónakba ${d} gyerek fér. Hány csónak kell?`}
      </div>
      <svg viewBox={`0 0 ${perRow * s + 8} ${rows * s + 8}`} className="w-full max-w-[300px] h-auto mx-auto" fontFamily={FONT}>
        {Array.from({ length: n }, (_, i) => (
          <circle key={i} cx={4 + s * ((i % perRow) + 0.5)} cy={4 + s * (Math.floor(i / perRow) + 0.5)} r={s * 0.36} fill={color(i)} />
        ))}
      </svg>
      <div className="flex flex-wrap items-end justify-center gap-4">
        <label className="flex flex-col items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-200">
          {mode === 'maradek' ? 'Ennyi csoport:' : 'Ennyi csónak kell:'}
          <NumInput value={gIn} onChange={(v) => { setGIn(v); setFb(null); }} onEnter={check} label="csoportok" width="w-20" />
        </label>
        {mode === 'maradek' && (
          <label className="flex flex-col items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-200">
            Ennyi maradt:
            <NumInput value={rIn} onChange={(v) => { setRIn(v); setFb(null); }} onEnter={check} label="maradék" width="w-20" />
          </label>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton onClick={check}>Ellenőrzés</LabButton>
        <LabButton kind="new" onClick={() => next()}>
          Új feladat
        </LabButton>
      </div>
      <Feedback fb={fb} />
      <div className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Megoldott feladatok: {score}</div>
    </LabBox>
  );
};
