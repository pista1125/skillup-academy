import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  AddSub500CoinsSvg,
  AddSub500AnalogySvg,
  AddSub500BridgeSvg,
  AddSub500BridgeBackSvg,
  AddSub500SplitAddSvg,
  AddSub500SplitSubSvg,
  AddSub500ToFiveHundredSvg
} from './AddSub500G3Figures';
import { Coin, Note500, JumpLine, Jump } from './AddSub500G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** 4 különböző kerek tízes 0 és 500 között; az első a helyes. */
export const opts500 = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= 500 && w % 10 === 0 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? 10 * k : -10 * k);
    if (w >= 0 && w <= 500 && !out.includes(w)) out.push(w);
    k++;
  }
  return out;
};

// ---------------------------------------------------------------------------
// Labor I – Bonts és ugorj!
// ---------------------------------------------------------------------------
export interface SplitTask {
  plus: boolean;
  a: number;
  b: number;
  h: number; // a b százasai
  t: number; // a b tízesei
  mid: number;
  res: number;
  midOpts: number[];
  resOpts: number[];
}

export const makeSplitTask = (plus: boolean): SplitTask => {
  for (;;) {
    const h = rnd(1, 2) * 100;
    const t = rnd(1, 9) * 10;
    const b = h + t;
    const a = plus ? rnd(11, 33) * 10 : rnd(25, 50) * 10;
    const res = plus ? a + b : a - b;
    if (res < 30 || res > 500) continue;
    const mid = plus ? a + h : a - h;
    const crosses = Math.floor(mid / 100) !== Math.floor(res / 100) && res % 100 !== 0;
    const midWrong = plus ? [a + h / 10, a + b, a + 2 * h] : [a - h / 10, a - b, a + h];
    const resWrong = plus
      ? [crosses ? res - 100 : res + 100, res + 10, mid]
      : [crosses ? res + 100 : res - 100, res - 10, mid];
    return {
      plus,
      a,
      b,
      h,
      t,
      mid,
      res,
      midOpts: shuffle(opts500(mid, midWrong)),
      resOpts: shuffle(opts500(res, resWrong))
    };
  }
};

// ---------------------------------------------------------------------------
// Labor II – Visszajáró pénz
// ---------------------------------------------------------------------------
const CHANGE_COINS = [10, 20, 50, 100, 200];
const minCoins = (t: number) => {
  let rest = t;
  let n = 0;
  [200, 100, 50, 20, 10].forEach((c) => {
    n += Math.floor(rest / c);
    rest %= c;
  });
  return n;
};
const ITEMS = ['labda', 'társasjáték', 'kifestő', 'zsírkréta', 'virágcserép', 'színes ceruza', 'puzzle', 'vonalzókészlet'];

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[72px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const AddSub500G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [sp, setSp] = useState<SplitTask>(() => ({
    plus: true,
    a: 260,
    b: 180,
    h: 100,
    t: 80,
    mid: 360,
    res: 440,
    midOpts: [270, 360, 440, 460],
    resOpts: [340, 440, 360, 450]
  }));
  const [spStep, setSpStep] = useState<number>(0);
  const [spBad, setSpBad] = useState<number | null>(null);
  const [spMsg, setSpMsg] = useState<string>('');
  const op = sp.plus ? '+' : '−';
  const newSplit = (plus: boolean) => {
    setSp(makeSplitTask(plus));
    setSpStep(0);
    setSpBad(null);
    setSpMsg('');
  };
  const pickSplit = (v: number) => {
    if (spStep === 0) {
      if (v === sp.mid) {
        setSpStep(1);
        setSpBad(null);
        setSpMsg('');
        return;
      }
      setSpBad(v);
      if (v === (sp.plus ? sp.a + sp.b : sp.a - sp.b)) setSpMsg('Ez már a végeredmény lenne. Most csak a százasokat számold!');
      else if (v === (sp.plus ? sp.a + sp.h / 10 : sp.a - sp.h / 10)) setSpMsg(`Ez csak ${sp.h / 10} tízes volt. De ${sp.h} = ${sp.h / 100} százas!`);
      else setSpMsg(`A ${sp.b}-ban ${sp.h / 100} százas van. ${sp.a} ${op} ${sp.h} = ?`);
    } else if (spStep === 1) {
      if (v === sp.res) {
        setSpStep(2);
        setSpBad(null);
        setSpMsg('');
        return;
      }
      setSpBad(v);
      if (Math.abs(v - sp.res) === 100) setSpMsg(sp.plus ? 'Átléptél egy százast! Ugorj előbb a következő kerek százasig.' : 'Átléptél egy százast! Lépj vissza előbb a kerek százasig.');
      else if (v === sp.mid) setSpMsg(`Még ott van a ${sp.t}! ${sp.mid} ${op} ${sp.t} = ?`);
      else setSpMsg(`Számolj tízesekkel: ${sp.mid / 10} t ${op} ${sp.t / 10} t = ?`);
    }
  };
  const spJumps: Jump[] = [];
  if (spStep >= 1) spJumps.push({ to: sp.mid, label: `${op}${sp.h}` });
  if (spStep >= 2) spJumps.push({ to: sp.res, label: `${op}${sp.t}` });
  const spLo = Math.max(0, Math.floor(Math.min(sp.a, sp.res) / 50) * 50 - 20);
  const spHi = Math.min(500, Math.ceil(Math.max(sp.a, sp.res) / 50) * 50 + 20);

  // ---- Labor II ----
  const [price, setPrice] = useState<number>(270);
  const [item, setItem] = useState<string>('labda');
  const [coins, setCoins] = useState<number[]>([]);
  const change = coins.reduce((s, c) => s + c, 0);
  const total = price + change;
  const done = total === 500;
  const over = total > 500;
  const need = 500 - price;
  const newPrice = () => {
    let p = rnd(11, 48) * 10;
    while (p === price) p = rnd(11, 48) * 10;
    setPrice(p);
    setItem(ITEMS[rnd(0, ITEMS.length - 1)]);
    setCoins([]);
  };
  const addCoin = (v: number) => {
    if (done || coins.length >= 12) return;
    setCoins([...coins, v]);
  };
  const removeCoin = (i: number) => {
    if (done) return;
    setCoins(coins.filter((_, k) => k !== i));
  };
  const best = minCoins(need);

  return (
    <TheoryTemplate
      topicId="g3-count-500"
      subtopicId="osszeadas-es-kivonas"
      grade={3}
      chapterId="szamolas-500-ig"
      title="3. Összeadás és kivonás"
      subtitle="Kerek tízesek és százasok összeadása és kivonása 500-ig, átlépés a százason, bontás, pótlás, visszajáró pénz."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_osszeadas_es_kivonas_500_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Számoljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — BONTSD SZÉT!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              260 + 180 = 260 + 100 + 80 = 440
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Előbb a <strong>százasokat</strong>, aztán a <strong>tízeseket</strong>.</li>
              <li>Átlépésnél ugorj előbb a <strong>kerek százasig</strong>!</li>
              <li>Ellenőrizz: 440 − 180 = 260.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 58–60. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Kerek tízeseket és százasokat adunk össze és vonunk ki.</p>
          <p>Minden szám 500-ig tart.</p>
          <p>Megtanuljuk, hogyan lépünk át egy <strong>kerek százason</strong>.</p>
        </div>
      </TheorySection>

      {/* 2. Százasok és tízesek */}
      <TheorySection title="2. Százasok és tízesek külön" badge="Pénzzel" badgeColor="amber">
        <AddSub500CoinsSvg />
        <p className="text-sm text-slate-700">A százasokat a százasokhoz, a tízeseket a tízesekhez adod.</p>
        <TheoryTable
          headers={['Művelet', 'Így gondold', 'Eredmény']}
          rows={[
            ['200 + 300', '2 százas + 3 százas = 5 százas', '500'],
            ['400 + 60', '4 százas és 6 tízes', '460'],
            ['290 − 200', '2 százast elveszek, marad 9 tízes', '90'],
            ['360 − 120', '3 sz − 1 sz = 2 sz, 6 t − 2 t = 4 t', '240']
          ]}
        />
      </TheorySection>

      {/* 3. Tízesekkel */}
      <TheorySection title="3. Számolj tízesekkel!" badge="Kis számokkal" badgeColor="sky">
        <AddSub500AnalogySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összeadás" badge="19 t + 7 t" badgeColor="emerald">
            <p className="text-sm text-slate-700">19 + 7 = 26, ezért <strong>190 + 70 = 260</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Kivonás" badge="42 t − 6 t" badgeColor="orange">
            <p className="text-sm text-slate-700">42 − 6 = 36, ezért <strong>420 − 60 = 360</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Átlépés a százason */}
      <TheorySection title="4. Átlépés a kerek százason" badge="Ugrás" badgeColor="teal">
        <AddSub500BridgeSvg />
        <TheoryCard title="Összeadás: ugorj a 300-ig!" badge="280 + 50" badgeColor="teal">
          <p className="text-sm text-slate-700">280-tól a 300-ig 20 kell. Az 50-ből még 30 maradt. 300 + 30 = <strong>330</strong>.</p>
        </TheoryCard>
        <AddSub500BridgeBackSvg />
        <TheoryCard title="Kivonás: vissza a 400-ig!" badge="430 − 60" badgeColor="orange">
          <p className="text-sm text-slate-700">430-ból 30-at elveszel, és 400 lesz. A 60-ból még 30 maradt. 400 − 30 = <strong>370</strong>.</p>
        </TheoryCard>
      </TheorySection>

      {/* 5. Bontás */}
      <TheorySection title="5. Nagyobb számok: bontsd szét!" badge="Két lépés" badgeColor="purple">
        <AddSub500SplitAddSvg />
        <TheoryCard title="250 + 170" badge="+100, aztán +70" badgeColor="emerald">
          <p className="text-sm text-slate-700">A 170 = 100 + 70. Előbb 250 + 100 = 350. Aztán 350 + 70 = <strong>420</strong>.</p>
        </TheoryCard>
        <AddSub500SplitSubSvg />
        <TheoryCard title="430 − 160" badge="−100, aztán −60" badgeColor="orange">
          <p className="text-sm text-slate-700">A 160 = 100 + 60. Előbb 430 − 100 = 330. Aztán 330 − 60 = <strong>270</strong>.</p>
        </TheoryCard>
        <TheoryCallout type="tip" title="Más sorrendben is jó!">
          250 + 170 = 250 + 70 + 100 is 420. Ugyanaz jön ki.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Pótlás, ellenőrzés */}
      <TheorySection title="6. Pótlás és ellenőrzés" badge="□" badgeColor="sky">
        <AddSub500ToFiveHundredSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mennyi hiányzik az 500-hoz?" badge="360 + □ = 500" badgeColor="sky">
            <p className="text-sm text-slate-700">360-tól 400-ig 40. 400-tól 500-ig 100. Együtt <strong>□ = 140</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Ellenőrizd összeadással!" badge="430 − 160 = 270" badgeColor="purple">
            <p className="text-sm text-slate-700">Ami maradt, meg amit elvettél: 270 + 160 = 430. Jó volt!</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Nézzük meg együtt */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Biciklitúra" badge="Összeadás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az első szakasz 240 m. A második 190 m.</li>
              <li>Mennyi az út összesen?</li>
              <li>240 + 100 = 340, aztán 340 + 90 = 430.</li>
              <li><strong>Összesen 430 m.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A boltban" badge="Visszajáró" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A kifestő 320 Ft. 500 Ft-tal fizetsz.</li>
              <li>Mennyit kapsz vissza?</li>
              <li>320-tól 400-ig 80, onnan 500-ig 100.</li>
              <li><strong>180 Ft-ot kapsz vissza.</strong></li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Mennyivel több?" badge="Különbség" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Az iskolai vásáron hétfőn 260, kedden 410 süti fogyott.</li>
            <li>Mennyivel több fogyott kedden?</li>
            <li>410 − 260 = 410 − 200 − 60 = 210 − 60 = 150.</li>
            <li><strong>Kedden 150-nel több.</strong> Ellenőrzés: 260 + 150 = 410.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 8. Vigyázz */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett százas"
          wrong="350 + 80 = 330"
          wrongExplanation="5 tízes + 8 tízes = 13 tízes. Ebből 10 tízes egy új százas lett!"
          correct="350 + 80 = 350 + 50 + 30 = 430"
          correctExplanation="Előbb a 400-ig: 350 + 50 = 400. Aztán még 30: 430."
          tip="Ellenőrizz! 430 − 80 = 350, tehát jó."
        />
        <TheoryTrapBox
          title="A kisebbet a nagyobból?"
          wrong="420 − 50 = 430"
          wrongExplanation="Valaki itt 5 − 2-t számolt. De 2 tízesből nem vehetsz el 5 tízest!"
          correct="420 − 50 = 420 − 20 − 30 = 370"
          correctExplanation="Előbb vissza a 400-ig: 420 − 20 = 400. Aztán még 30: 370."
        />
        <TheoryCallout type="warning" title="Jó helyre írd a számjegyet!">
          300 + 70 nem 307! 3 százas és 7 <strong>tízes</strong>, vagyis 370.
        </TheoryCallout>
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Labor I: Bontsd és ugorj!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newSplit(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új összeadás</button>
            <button onClick={() => newSplit(false)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új kivonás</button>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {sp.a} {op} {sp.b} = {spStep >= 2 ? <span className="text-emerald-600">{sp.res}</span> : '?'}
          </div>
          <div className="text-center text-sm text-slate-600">
            {sp.b} = {sp.h} + {sp.t}
          </div>
          <JumpLine lo={spLo} hi={spHi} start={sp.a} jumps={spJumps} color={sp.plus ? '#16a34a' : '#ea580c'} />
          {spStep < 2 && (
            <div className="bg-teal-50 rounded-xl p-3 text-center text-teal-900 font-bold">
              {spStep === 0 && `1. lépés: Előbb a százasok. ${sp.a} ${op} ${sp.h} = ?`}
              {spStep === 1 && `2. lépés: Most a tízesek. ${sp.mid} ${op} ${sp.t} = ?`}
            </div>
          )}
          {spStep < 2 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {(spStep === 0 ? sp.midOpts : sp.resOpts).map((v) => (
                <OptButton key={`${spStep}-${v}`} v={v} onClick={() => pickSplit(v)} state={spBad === v ? 'bad' : null} />
              ))}
            </div>
          )}
          {spMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{spMsg}</div>}
          {spStep === 2 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {sp.a} {op} {sp.h} {op} {sp.t} = {sp.res}. Ellenőrzés: {sp.plus ? `${sp.res} − ${sp.b} = ${sp.a}` : `${sp.res} + ${sp.b} = ${sp.a}`}.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Labor II: Visszajáró pénz" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={newPrice} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 80 42" width="92" height="48" aria-label="500 forintos bankjegy">
                <Note500 x={3} y={3} w={74} h={36} />
              </svg>
              <div className="text-base font-black text-amber-900 bg-amber-50 rounded-xl px-3 py-2">
                A {item} ára: {price} Ft
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-700 text-center font-bold">Te vagy a pénztáros! A vevő 500 Ft-tal fizet. Add vissza a pénzt!</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {CHANGE_COINS.map((v) => (
              <button key={v} onClick={() => addCoin(v)} className="rounded-full hover:scale-105 transition-transform min-h-[56px]" aria-label={`${v} forintos`}>
                <svg viewBox="0 0 56 56" width="60" height="60">
                  <Coin cx={28} cy={28} v={v} r={25} />
                </svg>
              </button>
            ))}
          </div>
          <div className={`rounded-2xl border-4 border-dashed p-3 min-h-[84px] flex flex-wrap gap-1 items-center justify-center ${done ? 'border-emerald-400 bg-emerald-50' : over ? 'border-rose-400 bg-rose-50' : 'border-amber-300 bg-amber-50'}`}>
            {coins.length === 0 && <span className="text-amber-800 font-bold">Itt gyűlik a visszajáró pénz.</span>}
            {coins.map((c, i) => (
              <button key={i} onClick={() => removeCoin(i)} className="rounded-full" aria-label={`${c} forintos visszavétele`}>
                <svg viewBox="0 0 48 48" width="48" height="48">
                  <Coin cx={24} cy={24} v={c} r={21} />
                </svg>
              </button>
            ))}
          </div>
          <div className="text-center text-xl font-black text-slate-800">
            {price} + {change} = {total} Ft
          </div>
          {over && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">Ez túl sok! {total} − 500 = {total - 500} Ft-tal több. Vegyél vissza egy érmét!</div>}
          {!over && !done && coins.length > 0 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-50 text-amber-900">Még hiányzik az 500-hoz: 500 − {total} = {500 - total} Ft.</div>
          )}
          {!over && !done && coins.length === 0 && (
            <div className="rounded-xl p-3 text-center text-sm bg-sky-50 text-sky-900">Tipp: számolj a {price}-tól előre, előbb a következő kerek százasig!</div>
          )}
          {done && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! 500 − {price} = {need}. Pontosan {need} Ft-ot adtál vissza.
              {coins.length > best ? ` Kevesebb érmével is megy: ${best} érme is elég.` : ' Ennél kevesebb érmével nem is lehet!'}
            </div>
          )}
          {done && (
            <div className="flex justify-center">
              <button onClick={() => setCoins([])} className="px-4 py-2 rounded-xl bg-white border-2 border-emerald-400 text-emerald-700 text-sm font-bold min-h-[48px]">Újrakezdem</button>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AddSub500G3Theory;
