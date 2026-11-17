import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { AddHundredsSvg, RoundTensSvg, PlaceValueAddSvg, FairStallSvg, CoinPurseSvg } from './ThreeDigitAddG3Figures';
import { FONT, Flat, Rod, Cube, ItemIcon, ItemKind, PriceTag, rnd, shuffle, opts4 } from './ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Kirakó: két szám kirakva, összetoljuk, ha kell, beváltunk.
// ---------------------------------------------------------------------------
type LabKind = 'szazas' | 'tizes' | 'helyiertek';
interface BlockTask { a: number; b: number; kind: LabKind }

const digits = (n: number) => ({ sz: Math.floor(n / 100), t: Math.floor(n / 10) % 10, e: n % 10 });

const makeBlockTask = (kind: LabKind): BlockTask => {
  if (kind === 'szazas') {
    const b = rnd(1, 3) * 100;
    let a = rnd(101, 499 - b);
    while (a % 100 === 0) a = rnd(101, 499 - b);
    return shuffle([{ a, b, kind }, { a: b, b: a, kind }])[0];
  }
  if (kind === 'tizes') {
    // kerek tízesek, a tízesek összege legalább 10 (beváltás kell), összeg ≤ 500
    for (;;) {
      const a = rnd(11, 39) * 10;
      const b = rnd(11, 39) * 10;
      if (a % 100 === 0 || b % 100 === 0) continue;
      if (((a / 10) % 10) + ((b / 10) % 10) < 10) continue;
      if (a + b > 500) continue;
      return { a, b, kind };
    }
  }
  // helyi értékenként, beváltás nélkül
  for (;;) {
    const a = rnd(101, 399);
    const b = rnd(101, 399);
    const A = digits(a);
    const B = digits(b);
    if (A.t + B.t > 9 || A.e + B.e > 9 || a + b > 499) continue;
    if (A.e === 0 || B.e === 0 || A.t === 0 || B.t === 0) continue;
    return { a, b, kind };
  }
};

const wrongFor = (t: BlockTask): number[] => {
  const s = t.a + t.b;
  if (t.kind === 'szazas') {
    const H = t.a % 100 === 0 ? t.a : t.b;
    const N = H === t.a ? t.b : t.a;
    return [N + H / 100, N + H / 10, s + 100, s - 100];
  }
  if (t.kind === 'tizes') return [s - 100, s - 10, s + 10];
  return [s + 10, s - 10, s + 100];
};

/** Egy cellányi elem a laborban. */
const CellPieces: React.FC<{ x: number; y: number; kind: 'sz' | 't' | 'e'; n: number; newOne?: boolean; ring10?: boolean }> = ({ x, y, kind, n, newOne, ring10 }) => {
  const out: React.ReactNode[] = [];
  if (kind === 'sz') {
    for (let i = 0; i < n; i++) {
      const isNew = newOne && i === n - 1;
      out.push(
        <g key={i}>
          {isNew && <rect x={x + 4 + i * 23 - 2} y={y - 2} width="25" height="25" rx="4" fill="#16a34a" />}
          <Flat x={x + 4 + i * 23} y={y} s={21} thin />
        </g>
      );
    }
  } else if (kind === 't') {
    for (let i = 0; i < n; i++) out.push(<Rod key={i} x={x + 4 + i * 6.6} y={y} w={4.4} h={24} thin />);
    if (ring10 && n >= 10) out.push(<rect key="ring" x={x + 1} y={y - 3} width={10 * 6.6 + 1} height="30" rx="5" fill="none" stroke="#16a34a" strokeWidth="2.4" />);
  } else {
    for (let i = 0; i < n; i++) out.push(<Cube key={i} x={x + 5 + Math.floor(i / 3) * 8} y={y + 18 - (i % 3) * 8} s={6.5} />);
  }
  return <g>{out}</g>;
};

// ---------------------------------------------------------------------------
// Labor II – Iskolai vásár: két tárgy ára együtt
// ---------------------------------------------------------------------------
const SHOP: { kind: ItemKind; name: string }[] = [
  { kind: 'mug', name: 'bögre' },
  { kind: 'book', name: 'mesekönyv' },
  { kind: 'ball', name: 'labda' },
  { kind: 'kite', name: 'sárkány' },
  { kind: 'jar', name: 'lekvár' },
  { kind: 'plant', name: 'virág' },
  { kind: 'bear', name: 'maci' },
  { kind: 'cake', name: 'sütemény' },
  { kind: 'car', name: 'kisautó' },
  { kind: 'pencil', name: 'ceruza' }
];
interface ShopTask { items: { kind: ItemKind; name: string; price: number }[]; pick: [number, number]; opts: number[] }

const makeShop = (): ShopTask => {
  const names = shuffle(SHOP).slice(0, 4);
  for (;;) {
    const mode = rnd(0, 2);
    let p1: number;
    let p2: number;
    if (mode === 0) {
      // kerek tízesek beváltással
      p1 = rnd(11, 34) * 10;
      p2 = rnd(11, 34) * 10;
      if (((p1 / 10) % 10) + ((p2 / 10) % 10) < 10) continue;
    } else if (mode === 1) {
      // kerek százas + szám
      p1 = rnd(1, 3) * 100;
      p2 = rnd(21, 39) * 5;
    } else {
      // helyi értékenként, beváltás nélkül
      p1 = rnd(11, 30) * 10 + rnd(1, 4);
      p2 = rnd(11, 25) * 10 + rnd(1, 5);
      const A = digits(p1);
      const B = digits(p2);
      if (A.t + B.t > 9 || A.e + B.e > 9) continue;
    }
    if (p1 + p2 > 500 || p1 === p2) continue;
    const others = [rnd(9, 40) * 10, rnd(9, 40) * 10 + 5];
    const prices = shuffle([p1, p2, ...others]);
    const i1 = prices.indexOf(p1);
    const i2 = prices.indexOf(p2);
    if (new Set(prices).size < 4) continue;
    const s = p1 + p2;
    const wrong = mode === 0 ? [s - 100, s - 10, s + 10] : mode === 1 ? [s + 100, s - 100, s + 10] : [s + 10, s - 10, s + 100];
    return {
      items: names.map((n, k) => ({ ...n, price: prices[k] })),
      pick: [Math.min(i1, i2), Math.max(i1, i2)] as [number, number],
      opts: opts4(s, wrong)
    };
  }
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const ThreeDigitAddG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [kind, setKind] = useState<LabKind>('tizes');
  const [bt, setBt] = useState<BlockTask>({ a: 170, b: 260, kind: 'tizes' });
  const [stage, setStage] = useState<0 | 1 | 2>(0); // 0: két sor, 1: összetolva, 2: beváltva
  const [btOpts, setBtOpts] = useState<number[]>([430, 330, 420, 440]);
  const [btDone, setBtDone] = useState(false);
  const [btBad, setBtBad] = useState<number | null>(null);
  const [btMsg, setBtMsg] = useState('');
  const newBt = (k: LabKind = kind) => {
    const t = makeBlockTask(k);
    setKind(k);
    setBt(t);
    setStage(0);
    setBtOpts(opts4(t.a + t.b, wrongFor(t)));
    setBtDone(false);
    setBtBad(null);
    setBtMsg('');
  };
  const A = digits(bt.a);
  const B = digits(bt.b);
  const rawT = A.t + B.t;
  const needSwap = rawT >= 10;
  const sumSz = A.sz + B.sz + (stage === 2 ? 1 : 0);
  const sumT = stage === 2 ? rawT - 10 : rawT;
  const sumE = A.e + B.e;
  const ready = stage === 2 || (stage === 1 && !needSwap);
  const pickBt = (v: number) => {
    if (btDone || !ready) return;
    const s = bt.a + bt.b;
    if (v === s) {
      setBtDone(true);
      setBtBad(null);
      setBtMsg('');
      return;
    }
    setBtBad(v);
    if (v === s - 100) setBtMsg('Elfelejtetted a beváltott százast! A 10 tízesből lett 1 új százas.');
    else if (Math.abs(v - s) === 100) setBtMsg('Számold meg újra a piros százas lapokat!');
    else if (Math.abs(v - s) === 10) setBtMsg('Számold meg újra a kék tízesrudakat!');
    else setBtMsg('Nézd meg a „együtt” sort! Hány százas, hány tízes és hány egyes van ott?');
  };
  const rowY = [34, 74, 122];
  const cw = [118, 128, 62];
  const cx = [56, 174, 302];

  // ---- Labor II ----
  const [shop, setShop] = useState<ShopTask>({
    items: [
      { kind: 'mug', name: 'bögre', price: 230 },
      { kind: 'kite', name: 'sárkány', price: 185 },
      { kind: 'book', name: 'mesekönyv', price: 140 },
      { kind: 'bear', name: 'maci', price: 260 }
    ],
    pick: [0, 2],
    opts: [370, 360, 270, 470]
  });
  const [shDone, setShDone] = useState(false);
  const [shBad, setShBad] = useState<number | null>(null);
  const [shMsg, setShMsg] = useState('');
  const [streak, setStreak] = useState(0);
  const newShop = () => {
    setShop(makeShop());
    setShDone(false);
    setShBad(null);
    setShMsg('');
  };
  const i1 = shop.items[shop.pick[0]];
  const i2 = shop.items[shop.pick[1]];
  const shSum = i1.price + i2.price;
  const pickShop = (v: number) => {
    if (shDone) return;
    if (v === shSum) {
      setShDone(true);
      setShBad(null);
      setShMsg('');
      setStreak((s) => s + 1);
      return;
    }
    setShBad(v);
    setStreak(0);
    const P = digits(i1.price);
    const Q = digits(i2.price);
    if (v === shSum - 100 && P.t + Q.t >= 10) setShMsg(`A tízesek: ${P.t} + ${Q.t} = ${P.t + Q.t} tízes. Ebből 10 tízes = 1 százas. Ezt ne felejtsd el!`);
    else if (Math.abs(v - shSum) === 100) setShMsg(`Add össze külön a százasokat: ${P.sz * 100} + ${Q.sz * 100} = ?`);
    else if (Math.abs(v - shSum) === 10) setShMsg(`Add össze külön a tízeseket: ${P.t * 10} + ${Q.t * 10} = ?`);
    else setShMsg('Számolj helyi értékenként: százas a százashoz, tízes a tízeshez, egyes az egyeshez!');
  };

  return (
    <TheoryTemplate
      topicId="g3-written-addition"
      subtopicId="haromjegyu-szamok-osszeadasa"
      grade={3}
      chapterId="irasbeli-osszeadas"
      title="1. Háromjegyű számok összeadása"
      subtitle="Kerek százas és kerek tízesek hozzáadása, összeadás helyi értékenként – fejben, kirakással."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_haromjegyu_szamok_osszeadasa_tananyag.pdf"
      practiceTitle="Készen állsz? Adjunk össze!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HELYI ÉRTÉK SZERINT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              236 + 200 = 436 &nbsp; 170 + 260 = 430
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Százas a százashoz, tízes a tízeshez, egyes az egyeshez!</li>
              <li><strong>10 tízes = 1 százas.</strong> Ha 10 vagy több tízes lett, váltsd be!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 74–75. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Két háromjegyű számot adunk össze. Most még <strong>fejben</strong>, kirakással.</p>
          <p>Ez lesz a lépcső az <strong>írásbeli összeadáshoz</strong> (3. lecke).</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Kerek százast adunk hozzá" badge="Csak a százas változik" badgeColor="rose">
        <AddHundredsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="236 + 200" badge="+2 százas" badgeColor="rose">
            <p className="text-sm text-slate-700">2 százas + 2 százas = 4 százas. A tízes és az egyes marad: <strong>436</strong>.</p>
          </TheoryCard>
          <TheoryCard title="300 + 154" badge="+3 százas" badgeColor="rose">
            <p className="text-sm text-slate-700">1 százas + 3 százas = 4 százas: <strong>454</strong>.</p>
          </TheoryCard>
          <TheoryCard title="185 + 100" badge="+1 százas" badgeColor="rose">
            <p className="text-sm text-slate-700">Egy százassal több: <strong>285</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Kerek tízeseket adunk össze" badge="10 tízes = 1 százas" badgeColor="blue">
        <RoundTensSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>170 + 260</strong>: a százasok: 1 + 2 = 3 százas. A tízesek: 7 + 6 = 13 tízes.</p>
          <p>13 tízes = 1 százas és 3 tízes. A százast hozzátesszük a többihez: 4 százas, 3 tízes. <strong>430</strong>.</p>
        </div>
        <TheoryCallout type="tip" title="Másképp is lehet">
          170 + 260 = 170 + 200 + 60 = 370 + 60 = <strong>430</strong>. Előbb a százasokat adod hozzá, aztán a tízeseket.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Helyi értékenként" badge="Készülünk az írásbelire" badgeColor="amber">
        <PlaceValueAddSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Bontsd szét a számokat! Külön add össze a százasokat, a tízeseket és az egyeseket. A végén tedd össze a részeket.
        </p>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <FairStallSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Bögre és mesekönyv" badge="230 Ft + 140 Ft" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Százasok: 200 + 100 = 300.</li>
              <li>Tízesek: 30 + 40 = 70.</li>
              <li>Együtt: 300 + 70 = <strong>370 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Labda és sárkány" badge="180 Ft + 250 Ft" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Százasok: 100 + 200 = 300.</li>
              <li>Tízesek: 80 + 50 = 130. Ez 1 százas és 3 tízes!</li>
              <li>Együtt: 300 + 130 = <strong>430 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Lekvár és virág" badge="125 Ft + 320 Ft" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>100 + 300 = 400, 20 + 20 = 40, 5 + 0 = 5.</li>
              <li>Együtt: <strong>445 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Két persely" badge="pénzzel" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Piros: 200 + 50 + 20 = 270 Ft. Kék: 100 + 50 + 10 + 10 = 170 Ft.</li>
              <li>Százasok: 200 + 100 = 300. Tízesek: 70 + 70 = 140.</li>
              <li>Együtt: 300 + 140 = <strong>440 Ft</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <CoinPurseSvg />
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="180 + 250"
          wrong="180 + 250 = 330"
          wrongExplanation="A 13 tízesből csak a 3 tízest írtad le. Az 1 százas elveszett!"
          correct="180 + 250 = 430"
          correctExplanation="13 tízes = 1 százas és 3 tízes. A százast add a többi százashoz: 3 + 1 = 4 százas."
          tip="10 tízes = 1 százas. Ne hagyd el!"
        />
        <TheoryCallout type="warning" title="Jó helyre tedd!">
          236 + 200 nem 238! A 200 két <strong>százas</strong>, nem két egyes. A százasok helyén nő a szám: <strong>436</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Kirakó" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newBt(kind)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            {([
              ['szazas', 'Kerek százas'],
              ['tizes', 'Kerek tízesek'],
              ['helyiertek', 'Helyi értékenként']
            ] as [LabKind, string][]).map(([k, l]) => (
              <button key={k} onClick={() => newBt(k)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${kind === k ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}>{l}</button>
            ))}
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {bt.a} + {bt.b} = {btDone ? <span className="text-emerald-600">{bt.a + bt.b}</span> : '?'}
          </div>
          <svg viewBox="0 0 360 170" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="358" height="168" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={cx[i]} y={8} width={cw[i]} height={20} fill={['#f87171', '#60a5fa', '#facc15'][i]} stroke="#fff" />
                <text x={cx[i] + cw[i] / 2} y={23} textAnchor="middle" fontSize="13" fontWeight="bold" fill={['#7f1d1d', '#0c2d6b', '#713f12'][i]}>{['sz', 't', 'e'][i]}</text>
                <rect x={cx[i]} y={28} width={cw[i]} height={134} fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} opacity="0.6" />
              </g>
            ))}
            <text x="50" y={rowY[0] + 18} textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">{bt.a}</text>
            <text x="50" y={rowY[1] + 18} textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">+{bt.b}</text>
            <line x1="8" y1="112" x2="352" y2="112" stroke="#334155" strokeWidth="2" />
            <g opacity={stage === 0 ? 1 : 0.3}>
              <CellPieces x={cx[0]} y={rowY[0]} kind="sz" n={A.sz} />
              <CellPieces x={cx[1]} y={rowY[0]} kind="t" n={A.t} />
              <CellPieces x={cx[2]} y={rowY[0]} kind="e" n={A.e} />
              <CellPieces x={cx[0]} y={rowY[1]} kind="sz" n={B.sz} />
              <CellPieces x={cx[1]} y={rowY[1]} kind="t" n={B.t} />
              <CellPieces x={cx[2]} y={rowY[1]} kind="e" n={B.e} />
            </g>
            {stage === 0 ? (
              <text x="180" y={rowY[2] + 22} textAnchor="middle" fontSize="13" fill="#64748b">Itt lesz az összeg.</text>
            ) : (
              <>
                <CellPieces x={cx[0]} y={rowY[2]} kind="sz" n={sumSz} newOne={stage === 2} />
                <CellPieces x={cx[1]} y={rowY[2]} kind="t" n={sumT} ring10={stage === 1} />
                <CellPieces x={cx[2]} y={rowY[2]} kind="e" n={sumE} />
                <text x="50" y={rowY[2] + 18} textAnchor="end" fontSize="12" fontWeight="bold" fill="#475569">együtt</text>
              </>
            )}
          </svg>
          {stage === 0 && (
            <div className="text-center">
              <button onClick={() => setStage(1)} className="px-5 py-3 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[52px]">Tedd össze!</button>
            </div>
          )}
          {stage === 1 && needSwap && (
            <div className="text-center space-y-2">
              <div className="bg-sky-50 rounded-xl p-3 text-sky-900 font-bold">{rawT} tízes van! 10 tízes = 1 százas.</div>
              <button onClick={() => setStage(2)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[52px]">Beváltom: 10 tízes → 1 százas</button>
            </div>
          )}
          {ready && (
            <>
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                {sumSz} százas, {sumT} tízes, {sumE} egyes. Mennyi az összeg?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {btOpts.map((v) => (
                  <OptButton key={v} v={v} onClick={() => pickBt(v)} state={btDone && v === bt.a + bt.b ? 'ok' : btBad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {btMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{btMsg}</div>}
          {btDone && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Ügyes vagy! {bt.a} + {bt.b} = {bt.a + bt.b}. Kérj új feladatot!</div>}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Iskolai vásár" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newShop} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <svg viewBox="0 0 360 120" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="358" height="118" rx="12" fill="#fff7ed" stroke="#fdba74" />
            {shop.items.map((it, k) => {
              const x = 10 + k * 87;
              const picked = shop.pick.includes(k);
              return (
                <g key={k}>
                  <rect x={x} y="10" width="80" height="100" rx="10" fill={picked ? '#fef3c7' : '#fff'} stroke={picked ? '#ea580c' : '#e2e8f0'} strokeWidth={picked ? 3 : 1.5} />
                  <ItemIcon kind={it.kind} cx={x + 40} cy={42} />
                  <PriceTag x={x + 8} y={68} text={`${it.price} Ft`} w={64} fs={12.5} />
                  <text x={x + 40} y={104} textAnchor="middle" fontSize="10.5" fill="#475569">{it.name}</text>
                </g>
              );
            })}
          </svg>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
            Mennyibe kerül együtt a {i1.name} és a {i2.name}?
          </div>
          <div className="text-center text-2xl font-black text-slate-800">
            {i1.price} Ft + {i2.price} Ft = {shDone ? <span className="text-emerald-600">{shSum} Ft</span> : '?'}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {shop.opts.map((v) => (
              <OptButton key={v} v={`${v} Ft`} onClick={() => pickShop(v)} state={shDone && v === shSum ? 'ok' : shBad === v ? 'bad' : null} />
            ))}
          </div>
          {shMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{shMsg}</div>}
          {shDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {shSum} Ft. {shSum <= 500 ? `Ha 500 Ft-od van, ${shSum === 500 ? 'pont elég.' : 'elég, és marad is.'}` : ''} Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ThreeDigitAddG3Theory;
