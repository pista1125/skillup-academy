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
  RoundTensCoinsSvg,
  TermsNamesSvg,
  BridgeTenJumpSvg,
  BridgeTenBackSvg,
  TwoDigitAddJumpSvg,
  TwoDigitSubJumpSvg,
  ToHundredBarSvg
} from './AddSub100G3Figures';
import { JumpLine, Jump } from './AddSub100G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const uniqOpts = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= 100 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? k : -k);
    if (w >= 0 && w <= 100 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – tízesátlépés két lépésben (egyjegyű szám)
// ---------------------------------------------------------------------------
interface Bridge { plus: boolean; a: number; b: number; first: number; rest: number; mid: number; res: number; resOpts: number[] }
const makeBridge = (plus: boolean): Bridge => {
  let a: number;
  let b: number;
  if (plus) {
    const o = rnd(2, 9);
    a = rnd(1, 8) * 10 + o;
    b = rnd(11 - o, 9);
  } else {
    const o = rnd(1, 8);
    a = rnd(1, 9) * 10 + o;
    b = rnd(o + 1, 9);
  }
  const o = a % 10;
  const first = plus ? 10 - o : o;
  const rest = b - first;
  const mid = plus ? a + first : a - first;
  const res = plus ? mid + rest : mid - rest;
  return { plus, a, b, first, rest, mid, res, resOpts: uniqOpts(res, [plus ? res - 10 : res + 10, res + 1, res - 1]) };
};

// ---------------------------------------------------------------------------
// Labor II – kétjegyű számok: előbb a tízesek, aztán az egyesek
// ---------------------------------------------------------------------------
interface TwoStep { plus: boolean; a: number; b: number; T: number; E: number; m: number; res: number; mOpts: number[]; resOpts: number[] }
const makeTwoStep = (plus: boolean): TwoStep => {
  let a = 0;
  let b = 0;
  const wantCarry = Math.random() < 0.75;
  for (let guard = 0; guard < 200; guard++) {
    if (plus) {
      a = rnd(12, 78);
      b = rnd(12, 99 - a);
    } else {
      a = rnd(31, 98);
      b = rnd(12, a - 5);
    }
    if (b % 10 === 0 || a % 10 === 0) continue;
    const carry = plus ? a % 10 + b % 10 >= 10 : b % 10 > a % 10;
    if (carry === wantCarry) break;
  }
  const T = Math.floor(b / 10) * 10;
  const E = b % 10;
  const m = plus ? a + T : a - T;
  const res = plus ? m + E : m - E;
  const tensDigit = T / 10;
  const mOpts = uniqOpts(m, [plus ? a + tensDigit : a - tensDigit, plus ? m + 10 : m - 10, plus ? m - 10 : m + 10]);
  const resOpts = uniqOpts(res, [plus ? res - 10 : res + 10, res + 1, res - 1]);
  return { plus, a, b, T, E, m, res, mOpts, resOpts };
};

const lineRange = (vals: number[]) => {
  const lo = Math.max(0, Math.floor((Math.min(...vals) - 2) / 5) * 5);
  const hi = Math.min(100, Math.ceil((Math.max(...vals) + 2) / 5) * 5);
  return { lo, hi: hi - lo < 10 ? lo + 10 : hi };
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[64px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const AddSub100G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [br, setBr] = useState<Bridge>(() => ({ plus: true, a: 28, b: 6, first: 2, rest: 4, mid: 30, res: 34, resOpts: [24, 34, 33, 35] }));
  const [brStep, setBrStep] = useState<number>(0);
  const [brMsg, setBrMsg] = useState<string>('');
  const [brBad, setBrBad] = useState<number | null>(null);
  const newBridge = (plus: boolean) => {
    setBr(makeBridge(plus));
    setBrStep(0);
    setBrMsg('');
    setBrBad(null);
  };
  const op1 = br.plus ? '+' : '−';
  const pickBridge = (v: number) => {
    if (brStep === 0) {
      if (v === br.first) {
        setBrStep(1);
        setBrMsg('');
        setBrBad(null);
      } else {
        setBrBad(v);
        setBrMsg(br.plus ? `A következő kerek tízes: ${br.mid}. Számold meg, hány lépés odáig!` : `Az előző kerek tízes: ${br.mid}. Számold meg, hány lépés visszafelé!`);
      }
    } else if (brStep === 1) {
      if (v === br.rest) {
        setBrStep(2);
        setBrMsg('');
        setBrBad(null);
      } else {
        setBrBad(v);
        setBrMsg(`Összesen ${br.b} lépés kell. Ebből ${br.first} már megvolt. ${br.b} − ${br.first} = ?`);
      }
    } else if (brStep === 2) {
      if (v === br.res) {
        setBrStep(3);
        setBrMsg('');
        setBrBad(null);
      } else {
        setBrBad(v);
        setBrMsg(`Most itt tartasz: ${br.mid}. Nézd meg a számegyenest: ${br.mid} ${op1} ${br.rest} = ?`);
      }
    }
  };
  const brJumps: Jump[] = [];
  if (brStep >= 1) brJumps.push({ to: br.mid, label: `${op1}${br.first}` });
  if (brStep >= 2) brJumps.push({ to: br.res, label: `${op1}${br.rest}` });
  const brRange = lineRange([br.a, br.res, br.mid]);

  // Labor II
  const [ts, setTs] = useState<TwoStep>(() => ({ plus: false, a: 73, b: 27, T: 20, E: 7, m: 53, res: 46, mOpts: [53, 71, 43, 63], resOpts: [46, 56, 47, 45] }));
  const [tsStep, setTsStep] = useState<number>(0);
  const [tsMsg, setTsMsg] = useState<string>('');
  const [tsBad, setTsBad] = useState<number | null>(null);
  const op2 = ts.plus ? '+' : '−';
  const newTwoStep = (plus: boolean) => {
    setTs(makeTwoStep(plus));
    setTsStep(0);
    setTsMsg('');
    setTsBad(null);
  };
  const pickTwoStep = (v: number) => {
    if (tsStep === 0) {
      if (v === ts.m) {
        setTsStep(1);
        setTsMsg('');
        setTsBad(null);
      } else {
        setTsBad(v);
        setTsMsg(
          v === (ts.plus ? ts.a + ts.T / 10 : ts.a - ts.T / 10)
            ? `Vigyázz! ${ts.b}: az első jegy tízeseket jelent. ${ts.T / 10} tízes = ${ts.T}. ${ts.a} ${op2} ${ts.T} = ?`
            : `Most csak a tízeseket ${ts.plus ? 'adod hozzá' : 'veszed el'}: ${ts.a} ${op2} ${ts.T} = ?`
        );
      }
    } else if (tsStep === 1) {
      if (v === ts.res) {
        setTsStep(2);
        setTsMsg('');
        setTsBad(null);
      } else {
        setTsBad(v);
        setTsMsg(
          ts.plus
            ? `${ts.m} + ${ts.E}: ha átléped a kerek tízest, a tízesek száma eggyel nő!`
            : `${ts.m} − ${ts.E}: ha átléped a kerek tízest, a tízesek száma eggyel csökken!`
        );
      }
    }
  };
  const tsJumps: Jump[] = [];
  if (tsStep >= 1) tsJumps.push({ to: ts.m, label: `${op2}${ts.T}` });
  if (tsStep >= 2) tsJumps.push({ to: ts.res, label: `${op2}${ts.E}` });
  const tsRange = lineRange([ts.a, ts.m, ts.res]);

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="osszeadas-es-kivonas"
      grade={3}
      chapterId="szamolas-100-ig"
      title="2. Összeadás és kivonás"
      subtitle="Kerek tízesek, tízesátlépés, kétjegyű számok összeadása és kivonása, ellenőrzés, pótlás 100-ra."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_osszeadas_es_kivonas_100_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Számoljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — LÉPÉSENKÉNT SZÁMOLUNK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              47 + 25 = 47 + 20 + 5 = 72
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Előbb a <strong>tízeseket</strong>, aztán az <strong>egyeseket</strong> adod hozzá vagy veszed el.</li>
              <li>Tízesátlépésnél lépj először a <strong>kerek tízesig</strong>!</li>
              <li>Ellenőrizz: a kivonást összeadással, az összeadást kivonással.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 8–10. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Összeadunk és kivonunk 100-ig. Fejben számolunk, lépésről lépésre.</p>
          <p>A számegyenesen ugrálva jól látszik minden lépés.</p>
          <p>A végén mindig <strong>ellenőrizünk</strong>!</p>
        </div>
      </TheorySection>

      {/* 2. Kerek tízesek */}
      <TheorySection title="2. Kerek tízesek" badge="Pénzzel" badgeColor="amber">
        <RoundTensCoinsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összeadás" badge="3 t + 4 t" badgeColor="emerald">
            <p className="text-sm text-slate-700">Úgy számolsz, mint 10-ig: 3 + 4 = 7. Csak most tízesek vannak: <strong>30 + 40 = 70</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Kivonás" badge="9 t − 5 t" badgeColor="orange">
            <p className="text-sm text-slate-700">9 − 5 = 4, ezért <strong>90 − 50 = 40</strong>. És 100 − 30 = 70, mert 10 tízesből 3-at elveszel.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Részek neve, ellenőrzés */}
      <TheorySection title="3. A műveletek részei és az ellenőrzés" badge="Nevek" badgeColor="orange">
        <TermsNamesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A tagok felcserélhetők" badge="35 + 24 = 24 + 35" badgeColor="emerald">
            <p className="text-sm text-slate-700">Az összeadásban mindegy, melyik tag van elöl. A kivonásban <strong>nem</strong> cserélhetsz!</p>
          </TheoryCard>
          <TheoryCard title="Így ellenőrizz!" badge="Ellenőrzés" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>59 − 24 = 35, mert 35 + 24 = 59.</li>
              <li>35 + 24 = 59, mert 59 − 24 = 35.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Tízesátlépés egyjegyűvel */}
      <TheorySection title="4. Tízesátlépés: ugorj a kerek tízesig!" badge="Két lépésben" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BridgeTenJumpSvg />
          <BridgeTenBackSvg />
        </div>
        <TheoryTable
          headers={['Művelet', '1. lépés (kerek tízesig)', '2. lépés (a maradék)', 'Eredmény']}
          rows={[
            ['28 + 6', '28 + 2 = 30', '30 + 4 = 34', '34'],
            ['57 + 8', '57 + 3 = 60', '60 + 5 = 65', '65'],
            ['43 − 5', '43 − 3 = 40', '40 − 2 = 38', '38'],
            ['71 − 9', '71 − 1 = 70', '70 − 8 = 62', '62']
          ]}
        />
      </TheorySection>

      {/* 5. Kétjegyű számok */}
      <TheorySection title="5. Kétjegyű számok összeadása és kivonása" badge="Tízesek, aztán egyesek" badgeColor="emerald">
        <TwoDigitAddJumpSvg />
        <TwoDigitSubJumpSvg />
        <TheoryCallout type="tip" title="Más úton is lehet!">
          47 + 25: a tízeseket és az egyeseket külön is összeadhatod. 40 + 20 = 60 és 7 + 5 = 12. Aztán 60 + 12 = <strong>72</strong>. Válaszd azt az utat, amelyik neked könnyebb!
        </TheoryCallout>
      </TheorySection>

      {/* 6. Pótlás 100-ra */}
      <TheorySection title="6. Pótlás 100-ra és a hiányzó szám" badge="□" badgeColor="sky">
        <ToHundredBarSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mennyi hiányzik a 100-hoz?" badge="63 + □ = 100" badgeColor="sky">
            <p className="text-sm text-slate-700">Előbb a kerek tízesig: 63 + 7 = 70. Aztán 70 + 30 = 100. Összesen 7 + 30 = <strong>37</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Hiányzó tag" badge="□ + 18 = 45" badgeColor="purple">
            <p className="text-sm text-slate-700">Az összegből vedd el az ismert tagot: 45 − 18 = 27. Ellenőrzés: 27 + 18 = 45. Tehát <strong>□ = 27</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Nézzük meg együtt */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) A könyvtárban" badge="Szöveges feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A polcon 52 mesekönyv volt. 17-et kikölcsönöztek. Hány maradt?</li>
              <li>Elvétel: 52 − 17.</li>
              <li>52 − 10 = 42, aztán 42 − 2 = 40, 40 − 5 = 35.</li>
              <li>Ellenőrzés: 35 + 17 = 52. <strong>35 könyv maradt.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mi a szabály?" badge="Sorozat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>13, 21, 29, 37, …</li>
              <li>21 − 13 = 8, 29 − 21 = 8. A szabály: <strong>+8</strong>.</li>
              <li>A következő: 37 + 8 = 37 + 3 + 5 = <strong>45</strong>, aztán 53.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8. Vigyázz */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="64 − 28 – a kisebbet a nagyobból?"
          wrong="64 − 28 = 44"
          wrongExplanation="Itt az egyeseknél 8 − 4-et számolt valaki. De a 64-ben csak 4 egyes van, abból nem lehet 8-at elvenni!"
          correct="64 − 28 = 64 − 20 − 8 = 44 − 8 = 36"
          correctExplanation="Előbb a tízeseket veszed el: 64 − 20 = 44. Aztán 44 − 4 = 40 és 40 − 4 = 36."
          tip="Ellenőrizz! 36 + 28 = 64, tehát jó."
        />
        <TheoryCallout type="warning" title="Ne felejtsd el az átlépést!">
          47 + 25 nem 62! Az egyesek: 7 + 5 = 12, ebben 1 tízes is van. Ezért 72.
        </TheoryCallout>
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Labor I: Ugorj a kerek tízesig!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newBridge(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új összeadás</button>
            <button onClick={() => newBridge(false)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új kivonás</button>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {br.a} {op1} {br.b} = {brStep >= 3 ? <span className="text-emerald-600">{br.res}</span> : '?'}
          </div>
          <JumpLine lo={brRange.lo} hi={brRange.hi} start={br.a} jumps={brJumps} color={br.plus ? '#16a34a' : '#ea580c'} />
          {brStep < 3 && (
            <div className="bg-teal-50 rounded-xl p-3 text-center text-teal-900 font-bold">
              {brStep === 0 && (br.plus ? `1. lépés: Hányat lépsz előre a következő kerek tízesig?` : `1. lépés: Hányat lépsz vissza az előző kerek tízesig?`)}
              {brStep === 1 && `2. lépés: Ennyit léptél: ${br.first}. Összesen ${br.b} kell. Mennyi van még hátra?`}
              {brStep === 2 && `3. lépés: ${br.mid} ${op1} ${br.rest} = ?`}
            </div>
          )}
          {brStep < 2 && (
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
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
              Ügyes vagy! {br.a} {op1} {br.first} {op1} {br.rest} = {br.res}. Ellenőrzés: {br.plus ? `${br.res} − ${br.b} = ${br.a}` : `${br.res} + ${br.b} = ${br.a}`}.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Labor II: Előbb a tízesek, aztán az egyesek!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTwoStep(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új összeadás</button>
            <button onClick={() => newTwoStep(false)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új kivonás</button>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {ts.a} {op2} {ts.b} = {tsStep >= 2 ? <span className="text-emerald-600">{ts.res}</span> : '?'}
          </div>
          <div className="text-center text-sm text-slate-600">
            {ts.b} = {ts.T} + {ts.E}
          </div>
          <JumpLine lo={tsRange.lo} hi={tsRange.hi} start={ts.a} jumps={tsJumps} color={ts.plus ? '#16a34a' : '#ea580c'} />
          {tsStep < 2 && (
            <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
              {tsStep === 0 ? `1. lépés – a tízesek: ${ts.a} ${op2} ${ts.T} = ?` : `2. lépés – az egyesek: ${ts.m} ${op2} ${ts.E} = ?`}
            </div>
          )}
          {tsStep < 2 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {(tsStep === 0 ? ts.mOpts : ts.resOpts).map((v) => (
                <OptButton key={`${tsStep}-${v}`} v={v} onClick={() => pickTwoStep(v)} state={tsBad === v ? 'bad' : null} />
              ))}
            </div>
          )}
          {tsMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{tsMsg}</div>}
          {tsStep === 2 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {ts.a} {op2} {ts.T} {op2} {ts.E} = {ts.res}. Ellenőrzés: {ts.plus ? `${ts.res} − ${ts.b} = ${ts.a}` : `${ts.res} + ${ts.b} = ${ts.a}`}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AddSub100G3Theory;
