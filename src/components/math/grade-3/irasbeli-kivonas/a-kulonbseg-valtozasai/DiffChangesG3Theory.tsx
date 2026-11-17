import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  DiffChangesMinuendSvg,
  DiffChangesSubtrahendSvg,
  DiffChangesWalletSvg,
  DiffChangesAgeSvg,
  DiffChangesTableSvg,
  DiffChangesCleverSvg
} from './DiffChangesG3Figures';
import { FONT, INK, C_MIN, C_SUB, rnd, pick, ins, signed, changeText, DiffBarsG, diffBarsHeight, NumBox } from './DiffChangesG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Különbség-változtató
// ---------------------------------------------------------------------------
export interface GoalTask {
  /** kisebbítendő */
  m: number;
  /** kivonandó */
  s: number;
  /** Ennyivel változzon a különbség (0 = ne változzon). */
  delta: number;
}
export const GOAL_DELTAS = [100, -100, 10, -10, 1, -1, 0, 0, 20, -20, 110, -90];
export const goalText = (d: number) => (d === 0 ? 'ne változzon' : d > 0 ? `${ins(d)} nagyobb legyen` : `${ins(d)} kisebb legyen`);

export const makeGoalTask = (): GoalTask => {
  for (;;) {
    const m = rnd(220, 490);
    const s = rnd(60, m - 100);
    const delta = pick(GOAL_DELTAS);
    if (m - s + delta < 0 || m + Math.max(0, delta) > 500) continue;
    return { m, s, delta };
  }
};

/** Ellenőrzés: jó-e a kisebbítendő (dm) és a kivonandó (ds) változása? Ha nem, mit írjunk. */
export const checkGoal = (t: GoalTask, dm: number, ds: number): { ok: boolean; msg: string } => {
  const d = dm - ds;
  if (t.delta === 0 && dm === 0 && ds === 0)
    return { ok: false, msg: 'Még nem változtattál semmit. Változtasd meg a számokat úgy, hogy a különbség mégis ugyanannyi maradjon!' };
  if (d === t.delta) return { ok: true, msg: '' };
  const how = `A kisebbítendő: ${signed(dm)}, a kivonandó: ${signed(ds)}. Így a különbség ${changeText(d)}.`;
  if (t.delta === 0) return { ok: false, msg: `${how} Mindkettőt ugyanannyival változtasd, ugyanarra!` };
  if (d === -t.delta) return { ok: false, msg: `${how} Pont fordítva lett! Ha a kivonandó nő, a különbség csökken.` };
  return { ok: false, msg: `${how} Neked az kell, hogy a különbség ${changeText(t.delta)}.` };
};

// ---------------------------------------------------------------------------
// Labor II – Számolás nélkül!
// ---------------------------------------------------------------------------
export type Sign = '<' | '=' | '>';
export interface CompareTask {
  l: [number, number];
  r: [number, number];
  sign: Sign;
  /** Ezt a jelet adná, aki a kivonandó változását „összeadásként” kezeli (tipikus hiba). */
  naive: Sign;
  why: string;
}
const signOf = (l: number, r: number): Sign => (l < r ? '<' : l > r ? '>' : '=');
const more = (d: number) => (d > 0 ? 'nagyobb' : 'kisebb');

export const makeCompareTask = (): CompareTask => {
  for (;;) {
    const m = rnd(200, 480);
    const s = rnd(60, m - 60);
    const kind = pick(['min', 'sub', 'sub', 'same', 'same', 'opp']);
    const d = pick([1, 10, 100, 2, 20]) * pick([1, -1]);
    let r: [number, number] = [m, s];
    let why = '';
    if (kind === 'min') {
      r = [m + d, s];
      why = `A kivonandó ugyanaz. A kisebbítendő a jobb oldalon ${ins(d)} ${more(d)}, ezért a különbség is ${ins(d)} ${more(d)}.`;
    } else if (kind === 'sub') {
      r = [m, s + d];
      why = `A kisebbítendő ugyanaz. A kivonandó a jobb oldalon ${ins(d)} ${more(d)}, ezért a különbség ${ins(d)} ${more(-d)}. Fordítva!`;
    } else if (kind === 'same') {
      r = [m + d, s + d];
      why = `Mindkét szám ${signed(d)}. Ha mindkettő ugyanannyival változik, ugyanarra, a különbség nem változik.`;
    } else {
      r = [m + d, s - d];
      why = `A kisebbítendő ${signed(d)}, a kivonandó ${signed(-d)}. Mindkettő a különbséget ${d > 0 ? 'növeli' : 'csökkenti'}: ${ins(2 * d)} ${more(d)}.`;
    }
    if (r.some((v) => v < 10 || v > 500) || r[0] - r[1] < 0) continue;
    const sign = signOf(m - s, r[0] - r[1]);
    const naiveRight = r[0] - m + (r[1] - s);
    const naive: Sign = naiveRight > 0 ? '<' : naiveRight < 0 ? '>' : '=';
    return { l: [m, s], r, sign, naive, why };
  }
};

const STEPS = [-100, -10, -1, 1, 10, 100];

const StepButtons: React.FC<{ onStep: (s: number) => void; disabled?: boolean }> = ({ onStep, disabled }) => (
  <div className="grid grid-cols-3 gap-1.5">
    {STEPS.map((s) => (
      <button
        key={s}
        disabled={disabled}
        onClick={() => onStep(s)}
        className={`min-h-[48px] rounded-xl text-base font-black border-2 transition-colors disabled:opacity-40 ${
          s > 0 ? 'bg-emerald-50 border-emerald-400 text-emerald-800 hover:bg-emerald-100' : 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100'
        }`}
      >
        {signed(s)}
      </button>
    ))}
  </div>
);

export const DiffChangesG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [gt, setGt] = useState<GoalTask>({ m: 460, s: 230, delta: -10 });
  const [dm, setDm] = useState(0);
  const [ds, setDs] = useState(0);
  const [gDone, setGDone] = useState(false);
  const [gMsg, setGMsg] = useState('');
  const newGoal = () => {
    setGt(makeGoalTask());
    setDm(0);
    setDs(0);
    setGDone(false);
    setGMsg('');
  };
  const stepM = (k: number) => {
    const nm = gt.m + dm + k;
    if (nm > 500 || nm < gt.s + ds) {
      setGMsg('Ezt nem lehet: a kisebbítendő nem lehet kisebb a kivonandónál, és most nem lehet több 500-nál.');
      return;
    }
    setDm(dm + k);
    setGMsg('');
  };
  const stepS = (k: number) => {
    const ns = gt.s + ds + k;
    if (ns < 0 || ns > gt.m + dm) {
      setGMsg('Ezt nem lehet: a kivonandó nem lehet nagyobb a kisebbítendőnél.');
      return;
    }
    setDs(ds + k);
    setGMsg('');
  };
  const checkG = () => {
    const r = checkGoal(gt, dm, ds);
    setGDone(r.ok);
    setGMsg(r.msg);
  };
  const m1 = gt.m + dm;
  const s1 = gt.s + ds;
  const d0 = gt.m - gt.s;
  const d1 = m1 - s1;
  const barH = diffBarsHeight(24);

  // ---- Labor II ----
  const [ct, setCt] = useState<CompareTask>({
    l: [465, 230],
    r: [465, 250],
    sign: '>',
    naive: '<',
    why: 'A kisebbítendő ugyanaz. A kivonandó a jobb oldalon 20-szal nagyobb, ezért a különbség 20-szal kisebb. Fordítva!'
  });
  const [cPick, setCPick] = useState<Sign | null>(null);
  const [cScore, setCScore] = useState(0);
  const newCompare = () => {
    setCt(makeCompareTask());
    setCPick(null);
  };
  const pickSign = (s: Sign) => {
    if (cPick === ct.sign) return;
    setCPick(s);
    if (s === ct.sign) setCScore(cScore + 1);
  };
  const ld = ct.l[0] - ct.l[1];
  const rd = ct.r[0] - ct.r[1];

  return (
    <TheoryTemplate
      topicId="g3-written-subtraction"
      subtopicId="a-kulonbseg-valtozasai"
      grade={3}
      chapterId="irasbeli-kivonas"
      title="4. A különbség változásai"
      subtitle="Mi történik a különbséggel, ha a kisebbítendő vagy a kivonandó változik?"
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG"
      themeColor="teal"
      pdfFilename="3_osztaly_a_kulonbseg_valtozasai_tananyag.pdf"
      practiceTitle="Készen állsz? Változtassunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — KI VÁLTOZIK?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-base font-black text-teal-900 dark:text-teal-200">
              kisebbítendő − kivonandó = különbség
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A <strong>kisebbítendő</strong> nő → a különbség is <strong>nő</strong>.</li>
              <li>A <strong>kivonandó</strong> nő → a különbség <strong>csökken</strong>. Fordítva!</li>
              <li>Mindkettő ugyanannyival nő (vagy csökken) → a különbség <strong>nem változik</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 94. o." badgeColor="teal">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A kivonásban a számok neve: <strong>kisebbítendő − kivonandó = különbség</strong>.</p>
          <p>Például: 350 − 120 = 230. A 350 a kisebbítendő, a 120 a kivonandó, a 230 a különbség.</p>
          <p>Most azt nézzük: mi lesz a különbséggel, ha az egyik szám megváltozik? Sokszor nem is kell újra számolni!</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. A kisebbítendő változik" badge="Ugyanarra" badgeColor="blue">
        <DiffChangesMinuendSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A kisebbítendő nő" badge="+100" badgeColor="emerald">
            <p className="text-sm text-slate-700">350 helyett 450. Ez 100-zal több. A különbség is 100-zal több: 230 → <strong>330</strong>.</p>
          </TheoryCard>
          <TheoryCard title="A kisebbítendő csökken" badge="−10" badgeColor="rose">
            <p className="text-sm text-slate-700">450 helyett 440. Ez 10-zel kevesebb. A különbség is 10-zel kevesebb: 330 → <strong>320</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Gondolj a pénztárcára!">
          Ha 100 Ft-tal több pénzed van, és ugyanazt veszed meg, 100 Ft-tal több pénzed marad.
        </TheoryCallout>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. A kivonandó változik – fordítva!" badge="Fordítva" badgeColor="orange">
        <DiffChangesSubtrahendSvg />
        <p className="text-sm text-slate-700">
          A kivonandó 100-zal nőtt: többet veszünk el. Ezért a különbség <strong>100-zal csökken</strong>: 330 → 230. Ha a kivonandó 10-zel csökken, kevesebbet veszünk el: a különbség <strong>10-zel nő</strong>.
        </p>
        <DiffChangesWalletSvg />
        <TheoryTable
          headers={['kisebbítendő', 'kivonandó', 'a különbség']}
          rows={[
            ['+10', 'ugyanaz', '10-zel nő'],
            ['−10', 'ugyanaz', '10-zel csökken'],
            ['ugyanaz', '+10', '10-zel csökken'],
            ['ugyanaz', '−10', '10-zel nő']
          ]}
        />
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. A különbség nem változik" badge="Mindkettő" badgeColor="emerald">
        <DiffChangesAgeSvg />
        <p className="text-sm text-slate-700">
          Nóri 5 évvel idősebb Ádámnál. 5 év múlva mindketten 5 évvel idősebbek lesznek. A korkülönbség <strong>ugyanannyi marad</strong>: 5 év.
        </p>
        <DiffChangesTableSvg />
        <TheoryCallout type="info" title="A szabály">
          Ha a kisebbítendőt és a kivonandót is <strong>ugyanannyival növeled</strong> (vagy ugyanannyival csökkented), a különbség nem változik.
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Okos kivonás" badge="Kerek számmal" badgeColor="purple">
        <DiffChangesCleverSvg />
        <p className="text-sm text-slate-700">A 198-hoz 2 kell, hogy 200 legyen. A 435-höz is adok 2-t. 437 − 200 = <strong>237</strong>. Ez fejben is megy!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="324 − 199" badge="+1, +1" badgeColor="purple">
            <p className="text-sm text-slate-700">325 − 200 = <strong>125</strong>.</p>
          </TheoryCard>
          <TheoryCard title="460 − 290" badge="+10, +10" badgeColor="purple">
            <p className="text-sm text-slate-700">470 − 300 = <strong>170</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="warning" title="Nem úgy, mint az összeadásnál!">
          Az összeadásnál átteszünk: az egyik tag nő, a másik csökken. A kivonásnál <strong>mindkét számot ugyanarra</strong> változtatjuk!
        </TheoryCallout>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Melyik a nagyobb? Számolás nélkül!" badge="< > =" badgeColor="sky">
        <p className="text-sm text-slate-700">
          <strong>465 − 230 ○ 465 − 250.</strong> A kisebbítendő ugyanaz. A jobb oldalon 20-szal többet veszünk el. Ott 20-szal kevesebb marad. Ezért: <strong>465 − 230 &gt; 465 − 250</strong>.
        </p>
        <TheoryCallout type="tip" title="Így gondolkodj!">
          1. Mi egyforma? 2. Mi változott, és mennyivel? 3. A kisebbítendő vagy a kivonandó változott? A kivonandónál fordítva!
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Két könyv" badge="Kinek marad több?" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Pannának és Leventének is 450 Ft-ja van.</li>
              <li>Panna 140 Ft-os, Levente 240 Ft-os könyvet vesz.</li>
              <li>Levente 100 Ft-tal többet költ, ezért neki 100 Ft-tal kevesebb marad.</li>
              <li><strong>Pannának marad több, 100 Ft-tal.</strong> Ellenőrzés: 310 Ft és 210 Ft.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Testvérek" badge="Korkülönbség" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Luca 11 éves, az öccse, Olivér 7 éves.</li>
              <li>A korkülönbség: 11 − 7 = 4 év.</li>
              <li>10 év múlva Luca 21, Olivér 17 éves lesz.</li>
              <li>A korkülönbség <strong>ugyanúgy 4 év</strong>: 21 − 17 = 4.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Változtasd meg a számokat!" badge="386 − 143 = 243" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>10-zel nagyobb különbség: <strong>396 − 143</strong> vagy <strong>386 − 133</strong> (= 253).</li>
            <li>100-zal kisebb különbség: <strong>286 − 143</strong> vagy <strong>386 − 243</strong> (= 143).</li>
            <li>Ugyanannyi: <strong>396 − 153</strong> (= 243).</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Nő a kivonandó – nő a különbség?"
          wrong="378 − 125 → 378 − 135: a különbség 10-zel nő."
          wrongExplanation="Ha többet veszel el, kevesebb marad!"
          correct="A különbség 10-zel csökken: 253 → 243."
          correctExplanation="A kivonandó és a különbség fordítva változik."
        />
        <TheoryTrapBox
          title="+10 és +10"
          wrong="347 − 126 → 357 − 136: a különbség 20-szal nő."
          wrongExplanation="A kisebbítendő nőtt, de a kivonandó is ugyanannyival nőtt!"
          correct="A különbség nem változik: mindkettő 221."
          correctExplanation="Mindkét szám +10: a különbség marad."
          tip="Kivonásnál: ugyanarra, ugyanannyival → a különbség marad."
        />
        <TheoryTrapBox
          title="Okos kivonás, de rossz irányba"
          wrong="435 − 198 = 433 − 200"
          wrongExplanation="Ez az összeadás trükkje. A kivonásnál így 4-gyel kevesebb lesz az eredmény."
          correct="435 − 198 = 437 − 200 = 237"
          correctExplanation="Mindkét számhoz ugyanannyit adunk."
        />
      </TheorySection>

      {/* 9 – Labor I */}
      <TheorySection title="9. Labor I: Különbség-változtató" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={newGoal} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-base font-black text-teal-900 bg-teal-50 rounded-xl px-3 py-2">A különbség {goalText(gt.delta)}!</div>
          </div>
          <div className="text-center text-lg font-black text-slate-700">Eredetileg: {gt.m} − {gt.s} = {d0}</div>
          <svg viewBox={`0 0 240 ${barH + 60}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <NumBox cx={44} cy={20} v={m1} w={60} h={30} fs={18} fill={C_MIN.fill} stroke={C_MIN.stroke} />
            <text x="86" y="27" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>−</text>
            <NumBox cx={128} cy={20} v={s1} w={60} h={30} fs={18} fill={C_SUB.fill} stroke={C_SUB.stroke} />
            <text x="170" y="27" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>=</text>
            <NumBox cx={208} cy={20} v={gDone ? d1 : '?'} w={56} h={30} fs={18} fill="#dcfce7" stroke="#16a34a" />
            <DiffBarsG m={m1} s={s1} x={10} y={40} W={220} max={500} h={24} fs={13} dText={gDone ? String(d1) : '?'} />
            <text x="120" y={barH + 56} textAnchor="middle" fontSize="12" fill="#475569">{gDone ? '' : 'A zöld rész a különbség.'}</text>
          </svg>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-center text-sm font-bold text-blue-800 mb-1">kisebbítendő</div>
              <StepButtons onStep={stepM} disabled={gDone} />
            </div>
            <div>
              <div className="text-center text-sm font-bold text-orange-800 mb-1">kivonandó</div>
              <StepButtons onStep={stepS} disabled={gDone} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {!gDone && (
              <button onClick={checkG} className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px]">Ellenőrzöm</button>
            )}
            {!gDone && (dm !== 0 || ds !== 0) && (
              <button
                onClick={() => {
                  setDm(0);
                  setDs(0);
                  setGMsg('');
                }}
                className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold min-h-[48px]"
              >
                Visszaállítom
              </button>
            )}
          </div>
          {gMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{gMsg}</div>}
          {gDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {m1} − {s1} = {d1}. A különbség {changeText(d1 - d0)}
              {d1 - d0 === 0 ? '' : ` (${d0} → ${d1})`}.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10 – Labor II */}
      <TheorySection title="10. Labor II: Számolás nélkül!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={newCompare} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-sky-900 bg-sky-50 rounded-xl px-3 py-2">Jó válasz: {cScore}</div>
          </div>
          <div className="text-sm text-slate-700 text-center font-bold">Melyik jel illik a körbe? Ne számolj, csak figyeld a számokat!</div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-black text-slate-800">
            <span>
              <span className="text-blue-700">{ct.l[0]}</span> − <span className="text-orange-700">{ct.l[1]}</span>
            </span>
            <span
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                cPick === ct.sign ? 'border-emerald-500 text-emerald-600' : 'border-rose-400 text-rose-500'
              }`}
            >
              {cPick === ct.sign ? ct.sign : '?'}
            </span>
            <span>
              <span className="text-blue-700">{ct.r[0]}</span> − <span className="text-orange-700">{ct.r[1]}</span>
            </span>
          </div>
          <div className="flex gap-3 justify-center">
            {(['<', '=', '>'] as Sign[]).map((s) => (
              <button
                key={s}
                onClick={() => pickSign(s)}
                className={`w-16 h-16 rounded-2xl text-3xl font-black border-2 ${
                  cPick === s
                    ? s === ct.sign
                      ? 'bg-emerald-500 border-emerald-700 text-white'
                      : 'bg-rose-100 border-rose-400 text-rose-700'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {cPick && cPick !== ct.sign && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              {cPick === ct.naive
                ? 'Nem ez. Vigyázz a kivonandóval: ha többet veszel el, kevesebb marad! Próbáld újra!'
                : 'Nem ez. Nézd meg: mi egyforma a két oldalon? Mi változott a jobb oldalon? Próbáld újra!'}
            </div>
          )}
          {cPick === ct.sign && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Igen! {ct.why} Számolva: {ld} {ct.sign} {rd}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DiffChangesG3Theory;
