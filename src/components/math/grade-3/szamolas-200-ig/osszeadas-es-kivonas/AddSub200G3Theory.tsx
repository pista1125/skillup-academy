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
  TensCoinsAddSvg,
  AnalogyRodsSvg,
  BridgeHundredSvg,
  BridgeBackSvg,
  ToTwoHundredSvg,
  PointsChartSvg
} from './AddSub200G3Figures';
import { Coin, TensJumpLine, Jump } from './AddSub200G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const opts4 = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= 200 && w % 10 === 0 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? 10 * k : -10 * k);
    if (w >= 0 && w <= 200 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – Ugorj a 100-ig!
// ---------------------------------------------------------------------------
interface Bridge { plus: boolean; a: number; b: number; first: number; rest: number; res: number; resOpts: number[] }
const makeBridge = (plus: boolean): Bridge => {
  let a: number;
  let b: number;
  if (plus) {
    a = rnd(2, 9) * 10;
    b = rnd((110 - a) / 10, Math.min(90, 200 - a) / 10) * 10;
  } else {
    a = rnd(11, 18) * 10;
    b = rnd((a - 90) / 10, 9) * 10;
  }
  const first = plus ? 100 - a : a - 100;
  const rest = b - first;
  const res = plus ? a + b : a - b;
  const wrong = plus ? [res - 100, res + 10, res - 10] : [res + 100 <= 200 ? res + 100 : res + 20, res + 10, res - 10];
  return { plus, a, b, first, rest, res, resOpts: opts4(res, wrong) };
};

// ---------------------------------------------------------------------------
// Labor II – Töltsd meg a perselyt!
// ---------------------------------------------------------------------------
const COIN_VALUES = [10, 20, 50, 100];
const minCoins = (t: number) => {
  let rest = t;
  let n = 0;
  [100, 50, 20, 10].forEach((c) => {
    n += Math.floor(rest / c);
    rest %= c;
  });
  return n;
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-3 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[60px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const AddSub200G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [br, setBr] = useState<Bridge>(() => ({ plus: true, a: 70, b: 50, first: 30, rest: 20, res: 120, resOpts: [120, 20, 110, 130] }));
  const [brStep, setBrStep] = useState<number>(0);
  const [brMsg, setBrMsg] = useState<string>('');
  const [brBad, setBrBad] = useState<number | null>(null);
  const op = br.plus ? '+' : '−';
  const newBridge = (plus: boolean) => {
    setBr(makeBridge(plus));
    setBrStep(0);
    setBrMsg('');
    setBrBad(null);
  };
  const pickBridge = (v: number) => {
    if (brStep === 0) {
      if (v === br.first) {
        setBrStep(1);
        setBrBad(null);
        setBrMsg('');
      } else {
        setBrBad(v);
        setBrMsg(br.plus ? `Számold a tízeseket! Most ${br.a / 10} tízes van, a 100 pedig 10 tízes. Hány tízes hiányzik?` : `Számold a tízeseket! Most ${br.a / 10} tízes van, a 100 pedig 10 tízes. Hány tízest kell visszalépni?`);
      }
    } else if (brStep === 1) {
      if (v === br.rest) {
        setBrStep(2);
        setBrBad(null);
        setBrMsg('');
      } else {
        setBrBad(v);
        setBrMsg(`Összesen ${br.b} kell. Ebből ${br.first} már megvolt. ${br.b} − ${br.first} = ?`);
      }
    } else if (brStep === 2) {
      if (v === br.res) {
        setBrStep(3);
        setBrBad(null);
        setBrMsg('');
      } else {
        setBrBad(v);
        setBrMsg(
          br.plus && v === br.res - 100
            ? 'Ne felejtsd el a 100-at! Már túl vagy rajta.'
            : `Most a 100-nál tartasz. 100 ${op} ${br.rest} = ?`
        );
      }
    }
  };
  const brJumps: Jump[] = [];
  if (brStep >= 1) brJumps.push({ to: 100, label: `${op}${br.first}` });
  if (brStep >= 2) brJumps.push({ to: br.res, label: `${op}${br.rest}` });
  const brLo = Math.max(0, Math.min(br.a, br.res) - 20);
  const brHi = Math.min(200, Math.max(br.a, br.res) + 20);

  // ---- Labor II ----
  const [target, setTarget] = useState<number>(170);
  const [coins, setCoins] = useState<number[]>([]);
  const sum = coins.reduce((s, c) => s + c, 0);
  const done = sum === target;
  const over = sum > target;
  const newTarget = () => {
    let t = rnd(3, 20) * 10;
    while (t === target) t = rnd(3, 20) * 10;
    setTarget(t);
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
  const best = minCoins(target);

  return (
    <TheoryTemplate
      topicId="g3-count-200"
      subtopicId="osszeadas-es-kivonas"
      grade={3}
      chapterId="szamolas-200-ig"
      title="4. Összeadás és kivonás"
      subtitle="Kerek tízesek összeadása és kivonása 200-ig, átlépés a 100-on, pótlás, szöveges feladatok."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_osszeadas_es_kivonas_200_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Számoljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — TÍZESEKKEL SZÁMOLUNK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              60 + 50 = 60 + 40 + 10 = 110
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Számolj <strong>tízesekkel</strong>: 6 t + 5 t = 11 t = 110.</li>
              <li>Átlépésnél ugorj először a <strong>100-ig</strong>!</li>
              <li>Ellenőrizz: 110 − 50 = 60.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 35–37. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Kerek tízeseket adunk össze és vonunk ki 200-ig.</p>
          <p>Megtanuljuk, hogyan lépünk át a <strong>100-on</strong>.</p>
          <p>Pénzzel és számegyenessel is számolunk.</p>
        </div>
      </TheorySection>

      {/* 2. Kerek tízesek */}
      <TheorySection title="2. Úgy számolsz, mint a kis számokkal" badge="Tízesek" badgeColor="amber">
        <TensCoinsAddSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összeadás" badge="12 t + 3 t" badgeColor="emerald">
            <p className="text-sm text-slate-700">12 + 3 = 15, ezért <strong>120 + 30 = 150</strong>. És 140 + 50 = 190.</p>
          </TheoryCard>
          <TheoryCard title="Kivonás" badge="17 t − 4 t" badgeColor="orange">
            <p className="text-sm text-slate-700">17 − 4 = 13, ezért <strong>170 − 40 = 130</strong>. És 200 − 50 = 150.</p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Művelet', 'Tízesekkel', 'Eredmény']}
          rows={[
            ['100 + 60', '10 t + 6 t = 16 t', '160'],
            ['130 + 50', '13 t + 5 t = 18 t', '180'],
            ['180 − 100', '18 t − 10 t = 8 t', '80'],
            ['190 − 60', '19 t − 6 t = 13 t', '130']
          ]}
        />
      </TheorySection>

      {/* 3. Átlépés a 100-on */}
      <TheorySection title="3. Átlépés a 100-on: összeadás" badge="Két úton" badgeColor="teal">
        <AnalogyRodsSvg />
        <BridgeHundredSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. út: tízesekkel" badge="6 + 5 = 11" badgeColor="sky">
            <p className="text-sm text-slate-700">6 tízes + 5 tízes = 11 tízes. <strong>60 + 50 = 110</strong>.</p>
          </TheoryCard>
          <TheoryCard title="2. út: ugorj a 100-ig!" badge="60 + 40 + 10" badgeColor="teal">
            <p className="text-sm text-slate-700">A 60-tól 40 kell a 100-ig. Az 50-ből még 10 maradt. 100 + 10 = <strong>110</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Kivonás a 100-on át */}
      <TheorySection title="4. Átlépés a 100-on: kivonás" badge="Visszafelé" badgeColor="orange">
        <BridgeBackSvg />
        <TheoryTable
          headers={['Művelet', 'Előbb a 100-ig', 'Aztán a maradék', 'Eredmény']}
          rows={[
            ['130 − 50', '130 − 30 = 100', '100 − 20 = 80', '80'],
            ['150 − 80', '150 − 50 = 100', '100 − 30 = 70', '70'],
            ['180 − 90', '180 − 80 = 100', '100 − 10 = 90', '90']
          ]}
        />
        <TheoryCallout type="tip" title="Tízesekkel is megy!">
          18 − 9 = 9, ezért 18 tízes − 9 tízes = 9 tízes. <strong>180 − 90 = 90</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Pótlás 200-ra */}
      <TheorySection title="5. Pótlás és a hiányzó szám" badge="□" badgeColor="sky">
        <ToTwoHundredSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mennyi hiányzik a 200-hoz?" badge="140 + □ = 200" badgeColor="sky">
            <p className="text-sm text-slate-700">14 tízes van, 20 tízes kell. Hiányzik 6 tízes. <strong>□ = 60</strong>. Ellenőrzés: 140 + 60 = 200.</p>
          </TheoryCard>
          <TheoryCard title="Hiányzó kisebbítendő" badge="□ − 70 = 90" badgeColor="purple">
            <p className="text-sm text-slate-700">Ami maradt, meg amit elvettél, együtt adja az egészet: 90 + 70 = 160. <strong>□ = 160</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Az úton" badge="Szöveges feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Otthonról a pékségig 80 m. A pékségtől az iskoláig 70 m.</li>
              <li>Mekkora az út összesen?</li>
              <li>80 + 70 = 80 + 20 + 50 = 150.</li>
              <li><strong>Összesen 150 m.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Műveletsor" badge="Ugyanaz?" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>200 − 60 − 40 = 140 − 40 = 100.</li>
              <li>200 − 100 = 100.</li>
              <li>Ugyanaz! Ha előbb 60-at, aztán 40-et veszel el, az összesen 100.</li>
            </ul>
          </TheoryCard>
        </div>
        <PointsChartSvg />
        <TheoryCard title="C) Olvasd le a diagramról!" badge="Diagram" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>3.a: 90 pont, 3.b: 120 pont, 3.c: 70 pont.</li>
            <li>Mennyivel több a 3.b pontja, mint a 3.a-é? 120 − 90 = <strong>30</strong>.</li>
            <li>A 3.a és a 3.c együtt: 90 + 70 = <strong>160</strong> pont.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="150 − 70 – a kisebbet a nagyobból?"
          wrong="150 − 70 = 120"
          wrongExplanation="Valaki itt 7 − 5-öt számolt. De 150-ben 15 tízes van, nem 5!"
          correct="150 − 70 = 150 − 50 − 20 = 80"
          correctExplanation="Előbb vissza a 100-ig: 150 − 50 = 100. Aztán még 20: 100 − 20 = 80."
          tip="Ellenőrizz! 80 + 70 = 150, tehát jó."
        />
        <TheoryCallout type="warning" title="Ne hagyd le a nullát!">
          60 + 50 nem 11! 6 tízes + 5 tízes = 11 <strong>tízes</strong>, vagyis 110.
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Ugorj a 100-ig!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newBridge(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új összeadás</button>
            <button onClick={() => newBridge(false)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új kivonás</button>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {br.a} {op} {br.b} = {brStep >= 3 ? <span className="text-emerald-600">{br.res}</span> : '?'}
          </div>
          <TensJumpLine lo={brLo} hi={brHi} start={br.a} jumps={brJumps} color={br.plus ? '#16a34a' : '#ea580c'} />
          {brStep < 3 && (
            <div className="bg-teal-50 rounded-xl p-3 text-center text-teal-900 font-bold">
              {brStep === 0 && (br.plus ? `1. lépés: Mennyit lépsz előre a 100-ig?` : `1. lépés: Mennyit lépsz vissza a 100-ig?`)}
              {brStep === 1 && `2. lépés: Az első ugrás ${br.first} volt. Összesen ${br.b} kell. Mennyi van még hátra?`}
              {brStep === 2 && `3. lépés: 100 ${op} ${br.rest} = ?`}
            </div>
          )}
          {brStep < 2 && (
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
                <OptButton key={v} v={v} onClick={() => pickBridge(v)} state={brBad === v ? 'bad' : null} />
              ))}
            </div>
          )}
          {brStep === 2 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {br.resOpts.map((v) => (
                <OptButton key={v} v={v} onClick={() => pickBridge(v)} state={brBad === v ? 'bad' : null} />
              ))}
            </div>
          )}
          {brMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{brMsg}</div>}
          {brStep === 3 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {br.a} {op} {br.first} {op} {br.rest} = {br.res}. Ellenőrzés: {br.plus ? `${br.res} − ${br.b} = ${br.a}` : `${br.res} + ${br.b} = ${br.a}`}.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Töltsd meg a perselyt!" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newTarget} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-lg font-black text-amber-900 bg-amber-50 rounded-xl px-4 py-2">Tegyél bele pontosan {target} Ft-ot!</div>
          </div>
          <div className="text-sm text-slate-600 text-center">Kattints egy érmére, és a perselybe kerül. A perselyből kattintással ki is veheted.</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {COIN_VALUES.map((v) => (
              <button key={v} onClick={() => addCoin(v)} className="rounded-full hover:scale-105 transition-transform min-h-[56px]" aria-label={`${v} forintos`}>
                <svg viewBox="0 0 56 56" width="60" height="60">
                  <Coin cx={28} cy={28} v={v} r={25} />
                </svg>
              </button>
            ))}
          </div>
          <div className={`rounded-2xl border-4 border-dashed p-3 min-h-[84px] flex flex-wrap gap-1 items-center justify-center ${done ? 'border-emerald-400 bg-emerald-50' : over ? 'border-rose-400 bg-rose-50' : 'border-pink-300 bg-pink-50'}`}>
            {coins.length === 0 && <span className="text-pink-700 font-bold">A persely még üres.</span>}
            {coins.map((c, i) => (
              <button key={i} onClick={() => removeCoin(i)} className="rounded-full" aria-label={`${c} forintos kivétele`}>
                <svg viewBox="0 0 48 48" width="48" height="48">
                  <Coin cx={24} cy={24} v={c} r={21} />
                </svg>
              </button>
            ))}
          </div>
          <div className="text-center text-xl font-black text-slate-800">
            {coins.length ? `${coins.join(' + ')} = ${sum} Ft` : '0 Ft'}
          </div>
          {over && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">Ez túl sok! {sum} − {target} = {sum - target} Ft-tal több. Vegyél ki egy érmét!</div>}
          {!over && !done && coins.length > 0 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-50 text-amber-900">Még hiányzik: {target} − {sum} = {target - sum} Ft.</div>
          )}
          {done && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! Pontosan {target} Ft van a perselyben.
              {coins.length > best ? ` Próbáld ki kevesebb érmével is! ${best} érme is elég.` : ' Ennél kevesebb érmével nem is lehet!'}
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

export default AddSub200G3Theory;
