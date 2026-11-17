import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { TwoAddendsSvg, ThreeAddendsSvg, FourAddendsSvg, ThousandSumSvg, EstimateCheckSvg, TrainWordSvg } from './WrittenAdd1000G3Figures';
import { WrittenAddG3Column, placePlural } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import {
  FONT,
  rnd,
  shuffle,
  ItemIcon,
  ItemKind,
  PriceTag,
  Wallet,
  steps3,
  sumOf,
  colsFor,
  carryMarksAdd,
  partialSum,
  spokenAdd,
  THOUSAND_TEXT,
  addHint,
  forgotAll,
  onlyOne,
  opts4,
  makeAddTask,
  AddKind,
  ADD_KIND_LABEL
} from './WrittenAdd1000G3Parts';

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const KeyPad: React.FC<{ onKey: (d: number) => void; bad?: number | null }> = ({ onKey, bad }) => (
  <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
    {KEYS.map((d) => (
      <button
        key={d}
        onClick={() => onKey(d)}
        className={`min-h-[52px] rounded-xl text-2xl font-black border-2 transition-colors ${bad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'}`}
      >
        {d}
      </button>
    ))}
  </div>
);

const Btn: React.FC<{ children: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null; color?: string }> = ({ children, onClick, state, color = 'bg-white border-slate-300 text-slate-800' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-base font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : color}`}
  >
    {children}
  </button>
);

const round100 = (n: number) => Math.round(n / 100) * 100;

// ---------------------------------------------------------------------------
// Labor II – Elég a pénz?
// ---------------------------------------------------------------------------
const SHOP: { kind: ItemKind; name: string }[] = [
  { kind: 'mug', name: 'bögre' },
  { kind: 'book', name: 'mesekönyv' },
  { kind: 'ball', name: 'labda' },
  { kind: 'kite', name: 'sárkány' },
  { kind: 'jar', name: 'lekvár' },
  { kind: 'plant', name: 'virág' },
  { kind: 'bear', name: 'maci' },
  { kind: 'cake', name: 'torta' },
  { kind: 'car', name: 'kisautó' }
];
interface ShopTask { items: { kind: ItemKind; name: string; price: number }[]; wallet: number; opts: number[] }
const makeShop = (): ShopTask => {
  for (;;) {
    const prices = [rnd(21, 79) * 5, rnd(21, 69) * 5, rnd(21, 59) * 5];
    const s = sumOf(prices);
    if (s > 1000 || s < 520 || new Set(prices).size < 3) continue;
    if (prices.every((p) => p % 10 === 0)) continue;
    const enough = rnd(0, 1) === 1;
    const wallet = enough ? Math.min(1000, Math.ceil((s + 1) / 100) * 100) : Math.floor(s / 100) * 100;
    if (wallet < 500 || wallet === s) continue;
    const names = shuffle(SHOP).slice(0, 3);
    return {
      items: names.map((n, k) => ({ ...n, price: prices[k] })),
      wallet,
      opts: opts4(s, [forgotAll(prices), onlyOne(prices), s - 100, s + 100])
    };
  }
};

export const WrittenAdd1000G3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: lépésről lépésre ----
  const [kind, setKind] = useState<AddKind>('harom');
  const [xs, setXs] = useState<number[]>([248, 175, 396]);
  const [col, setCol] = useState(0);
  const [bad, setBad] = useState<number | null>(null);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [marks, setMarks] = useState(true);
  const [demo, setDemo] = useState(false);
  const st = steps3(xs);
  const sum = sumOf(xs);
  const cols = colsFor(xs);
  const total = cols === 4 ? 4 : 3;
  const done = col >= total;
  const reset = (n: number[]) => {
    setXs(n);
    setCol(0);
    setBad(null);
    setHint('');
    setLog([]);
  };
  const newTask = (k: AddKind = kind) => {
    setKind(k);
    setDemo(false);
    reset(makeAddTask(k));
  };
  const writeDigit = (c: number) => {
    const text = c < 3 ? `${c + 1}. lépés (${placePlural(c)}): ${spokenAdd(st[c])}` : `4. lépés (ezresek): ${THOUSAND_TEXT}`;
    setLog((l) => [...l, text]);
    setCol(c + 1);
    setBad(null);
    setHint('');
  };
  const press = (d: number) => {
    if (done || demo) return;
    const want = col < 3 ? st[col].write : 1;
    if (d === want) {
      writeDigit(col);
      return;
    }
    setBad(d);
    setHint(addHint(col < 3 ? st[col] : null, d));
  };
  useEffect(() => {
    if (!demo) return;
    if (col >= total) {
      setDemo(false);
      return;
    }
    const t = window.setTimeout(() => writeDigit(col), 1500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, col]);
  const startDemo = () => {
    reset(xs);
    setDemo(true);
  };
  const est = xs.map(round100);

  // ---- Labor II: Elég a pénz? ----
  const [shop, setShop] = useState<ShopTask>({
    items: [
      { kind: 'kite', name: 'sárkány', price: 365 },
      { kind: 'book', name: 'mesekönyv', price: 248 },
      { kind: 'bear', name: 'maci', price: 295 }
    ],
    wallet: 900,
    opts: [908, 798, 898, 808]
  });
  const [shStage, setShStage] = useState<'sum' | 'enough' | 'done'>('sum');
  const [shBad, setShBad] = useState<number | string | null>(null);
  const [shMsg, setShMsg] = useState('');
  const [streak, setStreak] = useState(0);
  const prices = shop.items.map((i) => i.price);
  const shSum = sumOf(prices);
  const newShop = () => {
    setShop(makeShop());
    setShStage('sum');
    setShBad(null);
    setShMsg('');
  };
  const pickSum = (v: number) => {
    if (shStage !== 'sum') return;
    if (v === shSum) {
      setShStage('enough');
      setShBad(null);
      setShMsg('');
      return;
    }
    setShBad(v);
    setStreak(0);
    if (v === forgotAll(prices)) setShMsg('Elfelejtetted a maradékot! Írd egymás alá a három árat, és számolj az egyesekkel kezdve.');
    else if (v === onlyOne(prices)) setShMsg('Valahol 2 maradt, de csak 1-et vittél tovább. Nézd meg újra az oszlopokat!');
    else if (Math.abs(v - shSum) === 100) setShMsg('A százasoknál tévedtél. Ne felejtsd el a maradékot!');
    else setShMsg('Számold ki írásban, oszloponként!');
  };
  const pickEnough = (yes: boolean) => {
    if (shStage !== 'enough') return;
    const ok = shSum <= shop.wallet;
    if (yes === ok) {
      setShStage('done');
      setShBad(null);
      setStreak((s) => s + 1);
      setShMsg(ok ? `Igen! ${shSum} Ft nem több, mint ${shop.wallet} Ft. Elég a pénz.` : `Így van, nem elég! ${shSum} Ft több, mint ${shop.wallet} Ft.`);
      return;
    }
    setShBad(yes ? 'igen' : 'nem');
    setStreak(0);
    setShMsg(`Hasonlítsd össze: ${shSum} és ${shop.wallet}. Melyik a nagyobb?`);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-ops-1000"
      subtopicId="irasbeli-osszeadas-1000-ig"
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      title="1. Írásbeli összeadás 1000-ig"
      subtitle="Több tag, kétszer is maradék, „maradt 2”, és ha az összeg pont 1000."
      badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_irasbeli_osszeadas_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Adjunk össze 1000-ig!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÍRÁSBELI ÖSSZEADÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              9 meg 6 meg 7 az 22. Leírom a 2-t, maradt 2.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Írd a tagokat helyi érték szerint <strong>egymás alá</strong>! Kezdd az <strong>egyesekkel</strong>!</li>
              <li>Az oszlop összegének <strong>utolsó jegyét</strong> írd le. A többi a <strong>maradék</strong> (1 vagy 2).</li>
              <li>A maradékot add hozzá a <strong>következő oszlophoz</strong>.</li>
              <li>Ha a százasoknál is marad 1, az az <strong>ezresek</strong> helyére kerül: 1000.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 118–121. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az írásbeli összeadást már ismered. Most <strong>nagyobb számokkal</strong> számolunk, egészen <strong>1000-ig</strong>.</p>
          <p>Újdonság: <strong>három-négy tag</strong>, a maradék lehet <strong>2</strong> is, és az összeg lehet <strong>pont 1000</strong>.</p>
          <p>Sorrend: <strong>becslés → számítás → ellenőrzés</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Ismétlés: kétszer is marad 1" badge="476 + 358" badgeColor="sky">
        <TwoAddendsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Az egyeseknél és a tízeseknél is <strong>maradt 1</strong>. A kis zöld szám a következő oszlop fölött segít, hogy ne felejtsd el. Az összeg <strong>834</strong>.
        </p>
      </TheorySection>

      <TheorySection title="3. Három tag" badge="248 + 175 + 396" badgeColor="purple">
        <ThreeAddendsSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li><strong>Egyesek:</strong> 8 meg 5 meg 6 az 19. Leírom a 9-et, maradt 1.</li>
          <li><strong>Tízesek:</strong> 4 meg 7 meg 9 az 20, meg 1 az 21. Leírom az 1-et, <strong>maradt 2</strong>.</li>
          <li><strong>Százasok:</strong> 2 meg 1 meg 3 az 6, meg 2 az 8. Leírom a 8-at. Az összeg <strong>819</strong>.</li>
        </ul>
        <TheoryCallout type="info" title="Mikor marad 2?">
          Ha az oszlop összege <strong>20 vagy több</strong>: 20, 21, 22 … Például 22 = 2 tízes és 2 egyes. Leírom a 2-t, maradt 2.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Négy tag" badge="125 + 238 + 146 + 327" badgeColor="amber">
        <FourAddendsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Négy tagnál is ugyanígy számolunk: fentről lefelé összeadjuk az oszlop jegyeit, aztán hozzáadjuk a maradékot. Az összeg <strong>836</strong>.
        </p>
      </TheorySection>

      <TheorySection title="5. Ha az összeg pont 1000" badge="563 + 437" badgeColor="rose">
        <ThousandSumSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Minden oszlopban 10 lett, ezért mindenhol <strong>0-t</strong> írunk, és <strong>maradt 1</strong>. A százasok után a maradék 1 az <strong>ezresek</strong> helyére kerül. Az összeg <strong>1000</strong>: egy ezres, 0 százas, 0 tízes, 0 egyes.
        </p>
      </TheorySection>

      <TheorySection title="6. Becslés és ellenőrzés" badge="Jól számoltam?" badgeColor="emerald">
        <EstimateCheckSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>Becslés:</strong> kerekítsd a tagokat százasra, és add össze őket. Az eredménynek közel kell lennie.</p>
          <p><strong>Ellenőrzés:</strong> add össze újra <strong>alulról felfelé</strong>! A tagok sorrendje nem számít, ugyanannak kell kijönnie.</p>
        </div>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Szöveges feladat" badgeColor="purple">
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>A kisvasúton hétfőn 238, kedden 305, szerdán 197 utas utazott. Hány utas utazott a három nap alatt?</strong>
        </p>
        <TrainWordSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Becslés és számítás" badge="238 + 305 + 197" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Becslés: 200 + 300 + 200 = 700.</li>
              <li>Egyesek: 8 meg 5 meg 7 az 20. Leírom a 0-t, maradt 2.</li>
              <li>Tízesek: 3 meg 0 meg 9 az 12, meg 2 az 14. Leírom a 4-et, maradt 1.</li>
              <li>Százasok: 2 meg 3 meg 1 az 6, meg 1 az 7. Eredmény: 740.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ellenőrzés és válasz" badge="alulról felfelé" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>197 + 305 + 238 = 740. Ugyanaz!</li>
              <li>A 740 közel van a becsült 700-hoz.</li>
              <li>Válasz: <strong>740 utas utazott.</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="248 + 175 + 396"
          wrong="248 + 175 + 396 = 719"
          wrongExplanation="A tízeseknél 21 lett, de csak 1-et vitt tovább. Pedig 2 maradt!"
          correct="248 + 175 + 396 = 819"
          correctExplanation="21-ből leírom az 1-et, maradt 2. A százasoknál: 6 meg 2 az 8."
          tip="Ha az oszlop összege 20 vagy több, 2 marad."
        />
        <TheoryCallout type="warning" title="Az 1000 négyjegyű!">
          563 + 437 nem 000 és nem 100! A százasok után maradt 1-et is le kell írni, az ezresek helyére: <strong>1000</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="9. Labor I: Lépésről lépésre" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTask(kind)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={startDemo} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">Mutasd meg!</button>
            <button onClick={() => setMarks((m) => !m)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${marks ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}>Maradék mutatása: {marks ? 'be' : 'ki'}</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ADD_KIND_LABEL) as AddKind[]).map((k) => (
              <button key={k} onClick={() => newTask(k)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${kind === k ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}>{ADD_KIND_LABEL[k]}</button>
            ))}
          </div>
          <WrittenAddG3Column
            addends={xs}
            result={partialSum(sum, col, cols)}
            cols={cols}
            carries={marks ? carryMarksAdd(st, col, cols) : []}
            carryRow
            highlight={done ? null : col}
            className="w-full max-w-[230px] h-auto mx-auto"
          />
          {!done && !demo && (
            <div className="space-y-2">
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                {col < 3
                  ? `${placePlural(col)[0].toUpperCase() + placePlural(col).slice(1)}: ${st[col].digits.join(' + ')}${st[col].carryIn ? ` + ${st[col].carryIn} (maradék)` : ''}. Melyik jegyet írod le?`
                  : 'A százasoknál maradt 1. Mit írsz az ezresek helyére?'}
              </div>
              <KeyPad onKey={press} bad={bad} />
            </div>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-100 text-amber-900">{hint}</div>}
          {log.length > 0 && (
            <ol className="space-y-1 text-sm text-slate-700 bg-slate-50 rounded-xl p-3">
              {log.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ol>
          )}
          {done && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Kész! {xs.join(' + ')} = {sum}. Becslés: {est.join(' + ')} = {sumOf(est)}, ez közel van. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="10. Labor II: Elég a pénz?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newShop} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <svg viewBox="0 0 360 124" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="358" height="122" rx="12" fill="#fff7ed" stroke="#fdba74" />
            {shop.items.map((it, k) => {
              const x = 8 + k * 82;
              return (
                <g key={k}>
                  <rect x={x} y="10" width="76" height="104" rx="10" fill="#fff" stroke="#ea580c" strokeWidth="2" />
                  <ItemIcon kind={it.kind} cx={x + 38} cy={40} />
                  <PriceTag x={x + 6} y={66} text={`${it.price} Ft`} w={64} fs={12.5} />
                  <text x={x + 38} y={106} textAnchor="middle" fontSize="11" fill="#475569">{it.name}</text>
                </g>
              );
            })}
            <Wallet x={258} y={40} text={`${shop.wallet} Ft`} w={94} />
            <text x="305" y="104" textAnchor="middle" fontSize="11" fill="#475569">ennyi pénzed van</text>
          </svg>
          {shStage === 'sum' && (
            <div className="space-y-2">
              <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">Mennyibe kerül a három dolog együtt?</div>
              <WrittenAddG3Column addends={prices} result="???" header={false} className="w-full max-w-[150px] h-auto mx-auto" />
              <div className="flex flex-wrap gap-2 justify-center">
                {shop.opts.map((v) => (
                  <Btn key={v} onClick={() => pickSum(v)} state={shBad === v ? 'bad' : null}>{v} Ft</Btn>
                ))}
              </div>
            </div>
          )}
          {shStage !== 'sum' && (
            <div className="space-y-2">
              <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
                Együtt {shSum} Ft. Elég a {shop.wallet} Ft?
              </div>
              {shStage === 'enough' && (
                <div className="flex flex-wrap gap-2 justify-center">
                  <Btn onClick={() => pickEnough(true)} state={shBad === 'igen' ? 'bad' : null} color="bg-emerald-50 border-emerald-400 text-emerald-900">Elég</Btn>
                  <Btn onClick={() => pickEnough(false)} state={shBad === 'nem' ? 'bad' : null} color="bg-rose-50 border-rose-400 text-rose-900">Nem elég</Btn>
                </div>
              )}
            </div>
          )}
          {shMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${shStage === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{shMsg}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenAdd1000G3Theory;
