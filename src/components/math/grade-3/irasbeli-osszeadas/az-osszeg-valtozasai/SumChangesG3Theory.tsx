import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  SumChangesOneTagSvg,
  SumChangesBothSvg,
  SumChangesMoveSvg,
  SumChangesTableSvg,
  SumChangesCleverSvg,
  SumChangesCompareSvg
} from './SumChangesG3Figures';
import { FONT, rnd, pick, ins, signed, changeText, ChangeRowsG, changeRowsHeight } from './SumChangesG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Tagváltoztató
// ---------------------------------------------------------------------------
export interface GoalTask {
  a: number;
  b: number;
  /** Ennyivel változzon az összeg (0 = ne változzon). */
  delta: number;
}
export const GOAL_DELTAS = [100, -100, 10, -10, 1, -1, 0, 0, 20, -20, 110, 200];
export const goalText = (d: number) => (d === 0 ? 'ne változzon' : d > 0 ? `${ins(d)} nagyobb legyen` : `${ins(d)} kisebb legyen`);

export const makeGoalTask = (): GoalTask => {
  for (;;) {
    const a = rnd(110, 480);
    const b = rnd(110, 480);
    const delta = pick(GOAL_DELTAS);
    if (a + b + delta > 1000 || a + b + delta < 0) continue;
    return { a, b, delta };
  }
};

/** Ellenőrzés: jó-e a két tag változása? Ha nem, mit írjunk. */
export const checkGoal = (t: GoalTask, da: number, db: number): { ok: boolean; msg: string } => {
  const d = da + db;
  if (t.delta === 0 && da === 0 && db === 0) return { ok: false, msg: 'Még nem változtattál semmit. Változtasd meg a tagokat úgy, hogy az összeg mégis ugyanannyi maradjon!' };
  if (d === t.delta) return { ok: true, msg: '' };
  const how = `Az 1. tag: ${signed(da)}, a 2. tag: ${signed(db)}. Így az összeg ${changeText(d)}.`;
  if (t.delta === 0) return { ok: false, msg: `${how} Ha az egyiket növeled, a másikat ugyanannyival csökkentsd!` };
  return { ok: false, msg: `${how} Neked az kell, hogy az összeg ${changeText(t.delta)}.` };
};

// ---------------------------------------------------------------------------
// Labor II – Számolás nélkül!
// ---------------------------------------------------------------------------
export type Sign = '<' | '=' | '>';
export interface CompareTask {
  l: [number, number];
  r: [number, number];
  sign: Sign;
  why: string;
}
const signOf = (l: number, r: number): Sign => (l < r ? '<' : l > r ? '>' : '=');
const whichTag = (k: number) => (k === 0 ? 'Az 1. tag' : 'A 2. tag');

export const makeCompareTask = (): CompareTask => {
  for (;;) {
    const a = rnd(105, 460);
    const b = rnd(105, 460);
    const kind = pick(['one', 'one', 'both', 'comp', 'swap', 'mixed']);
    const d = pick([1, 10, 100, 2, 20]) * pick([1, -1]);
    let r: [number, number] = [a, b];
    let why = '';
    if (kind === 'one') {
      const k = rnd(0, 1);
      r = k === 0 ? [a + d, b] : [a, b + d];
      why = `${whichTag(k)} a jobb oldalon ${ins(d)} ${d > 0 ? 'nagyobb' : 'kisebb'}, a másik tag ugyanaz. Ezért a jobb oldali összeg is ${ins(d)} ${d > 0 ? 'nagyobb' : 'kisebb'}.`;
    } else if (kind === 'both') {
      const e = pick([1, 10, 100]) * Math.sign(d);
      r = [a + d, b + e];
      const s = d + e;
      why = `A jobb oldalon mindkét tag ${s > 0 ? 'nagyobb' : 'kisebb'} (${signed(d)} és ${signed(e)}). Ezért a jobb oldali összeg ${ins(s)} ${s > 0 ? 'nagyobb' : 'kisebb'}.`;
    } else if (kind === 'comp') {
      r = [a + d, b - d];
      why = `Az 1. tag ${signed(d)}, a 2. tag ${signed(-d)}. Amennyit az egyik kapott, annyit a másik elvesztett: az összeg ugyanannyi.`;
    } else if (kind === 'swap') {
      r = [b, a];
      why = 'Ugyanazok a tagok, csak felcseréltük őket. Az összeg nem változik.';
    } else {
      const big = pick([100, -100]);
      const small = pick([10, -10, 20, -20]);
      r = [a + big, b + small];
      const s = big + small;
      why = `Az 1. tag ${signed(big)}, a 2. tag ${signed(small)}. Együtt ${signed(s)}, tehát a jobb oldali összeg ${ins(s)} ${s > 0 ? 'nagyobb' : 'kisebb'}.`;
    }
    if (r.some((v) => v < 10 || v > 999) || r[0] + r[1] > 1000 || a + b > 1000) continue;
    if (kind === 'swap' && a === b) continue;
    return { l: [a, b], r, sign: signOf(a + b, r[0] + r[1]), why };
  }
};

const STEPS = [-100, -10, -1, 1, 10, 100];

const StepButtons: React.FC<{ onStep: (s: number) => void; color: 'blue' | 'amber'; disabled?: boolean }> = ({ onStep, color, disabled }) => (
  <div className="grid grid-cols-3 gap-1.5">
    {STEPS.map((s) => (
      <button
        key={s}
        disabled={disabled}
        onClick={() => onStep(s)}
        className={`min-h-[48px] rounded-xl text-base font-black border-2 transition-colors disabled:opacity-40 ${
          s > 0
            ? 'bg-emerald-50 border-emerald-400 text-emerald-800 hover:bg-emerald-100'
            : 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100'
        } ${color === 'blue' ? 'ring-blue-200' : 'ring-amber-200'}`}
      >
        {signed(s)}
      </button>
    ))}
  </div>
);

export const SumChangesG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [gt, setGt] = useState<GoalTask>({ a: 236, b: 158, delta: 10 });
  const [da, setDa] = useState(0);
  const [db, setDb] = useState(0);
  const [gDone, setGDone] = useState(false);
  const [gMsg, setGMsg] = useState('');
  const newGoal = () => {
    setGt(makeGoalTask());
    setDa(0);
    setDb(0);
    setGDone(false);
    setGMsg('');
  };
  const stepA = (s: number) => {
    const na = gt.a + da + s;
    if (na < 0 || na > 999 || na + gt.b + db > 1000) return;
    setDa(da + s);
    setGMsg('');
  };
  const stepB = (s: number) => {
    const nb = gt.b + db + s;
    if (nb < 0 || nb > 999 || gt.a + da + nb > 1000) return;
    setDb(db + s);
    setGMsg('');
  };
  const checkG = () => {
    const r = checkGoal(gt, da, db);
    setGDone(r.ok);
    setGMsg(r.msg);
  };
  const s0 = gt.a + gt.b;
  const s1 = gt.a + da + gt.b + db;
  const labRowsH = changeRowsHeight(2);

  // ---- Labor II ----
  const [ct, setCt] = useState<CompareTask>({
    l: [236, 158],
    r: [246, 158],
    sign: '<',
    why: 'Az 1. tag a jobb oldalon 10-zel nagyobb, a másik tag ugyanaz. Ezért a jobb oldali összeg is 10-zel nagyobb.'
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
  const ls = ct.l[0] + ct.l[1];
  const rs = ct.r[0] + ct.r[1];

  return (
    <TheoryTemplate
      topicId="g3-written-addition"
      subtopicId="az-osszeg-valtozasai"
      grade={3}
      chapterId="irasbeli-osszeadas"
      title="4. Az összeg változásai"
      subtitle="Mi történik az összeggel, ha a tagok változnak? Nő, csökken vagy ugyanannyi marad."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG"
      themeColor="teal"
      pdfFilename="3_osztaly_az_osszeg_valtozasai_tananyag.pdf"
      practiceTitle="Készen állsz? Változtassunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — FIGYELD A TAGOKAT!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-base font-black text-teal-900 dark:text-teal-200">
              230 + 140 = 370 → 330 + 140 = 470
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ha egy tag <strong>nő</strong>, az összeg is <strong>ugyanannyival nő</strong>.</li>
              <li>Ha egy tag <strong>csökken</strong>, az összeg is <strong>ugyanannyival csökken</strong>.</li>
              <li>Ha az egyik nő, a másik ugyanannyival csökken: az összeg <strong>nem változik</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 81. o." badgeColor="teal">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az összeadásban a számok neve: <strong>tag + tag = összeg</strong>.</p>
          <p>Most azt nézzük: mi lesz az összeggel, ha egy tag megváltozik?</p>
          <p>Sokszor nem is kell újra számolni!</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Az egyik tag változik" badge="Egy tag" badgeColor="emerald">
        <SumChangesOneTagSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A tag nő" badge="+100" badgeColor="emerald">
            <p className="text-sm text-slate-700">230 helyett 330. Ez 100-zal több. Az összeg is 100-zal több: 370 → <strong>470</strong>.</p>
          </TheoryCard>
          <TheoryCard title="A tag csökken" badge="−10" badgeColor="rose">
            <p className="text-sm text-slate-700">140 helyett 130. Ez 10-zel kevesebb. Az összeg is 10-zel kevesebb: 470 → <strong>460</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Gondolj a perselyre!">
          Ha valaki 100 Ft-tal többet tesz a perselybe, a perselyben is 100 Ft-tal több pénz lesz.
        </TheoryCallout>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Mindkét tag változik" badge="Két tag" badgeColor="blue">
        <SumChangesBothSvg />
        <p className="text-sm text-slate-700">Mindkét tag 10-zel nő. Az összeg 10-zel és még 10-zel, vagyis <strong>20-szal nő</strong>: 347 → 367.</p>
        <TheoryTable
          headers={['1. tag', '2. tag', 'Az összeg']}
          rows={[
            ['+10', '+10', '20-szal nő'],
            ['+100', '+10', '110-zel nő'],
            ['−10', '−10', '20-szal csökken'],
            ['+100', '−10', '90-nel nő']
          ]}
        />
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Az összeg nem változik" badge="Átrakás" badgeColor="amber">
        <SumChangesMoveSvg />
        <p className="text-sm text-slate-700">Az egyik tagból 10-et átteszünk a másikba. Az egyik 10-zel kevesebb, a másik 10-zel több. Együtt <strong>ugyanannyi</strong>.</p>
        <SumChangesTableSvg />
        <TheoryCallout type="info" title="Felcserélés">
          Ha a két tagot felcseréled, az összeg sem változik: 146 + 238 = 238 + 146. Ezzel <strong>ellenőrizni</strong> is tudsz!
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Okos számolás" badge="Kerek számmal" badgeColor="purple">
        <SumChangesCleverSvg />
        <p className="text-sm text-slate-700">A 198-hoz 2 kell, hogy 200 legyen. Ezt a 2-t elveszem a 147-ből. 200 + 145 = <strong>345</strong>. Ez fejben is megy!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="299 + 136" badge="+1, −1" badgeColor="purple">
            <p className="text-sm text-slate-700">300 + 135 = <strong>435</strong>.</p>
          </TheoryCard>
          <TheoryCard title="390 + 245" badge="+10, −10" badgeColor="purple">
            <p className="text-sm text-slate-700">400 + 235 = <strong>635</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Melyik a nagyobb? Számolás nélkül!" badge="< > =" badgeColor="sky">
        <SumChangesCompareSvg />
        <p className="text-sm text-slate-700">A 2. tag mindkét oldalon 158. Az 1. tag a jobb oldalon 10-zel több. Ezért: <strong>236 + 158 &lt; 246 + 158</strong>.</p>
        <TheoryCallout type="tip" title="Így gondolkodj!">
          1. Mi egyforma? 2. Mi változott, és mennyivel? 3. Nőtt vagy csökkent az összeg?
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Két persely" badge="Mennyivel több?" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az egyik perselyben 140 Ft, a másikban 240 Ft van.</li>
              <li>Mindkettőbe 300 Ft-ot tesznek.</li>
              <li>A második még mindig <strong>100 Ft-tal több</strong>.</li>
              <li>Ellenőrzés: 440 Ft és 540 Ft. Igen, 100 a különbség.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Két nap a büfében" badge="Ki költött többet?" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hétfőn: 85 Ft + 320 Ft. Kedden: 185 Ft + 220 Ft.</li>
              <li>Kedden az 1. tag 100-zal több, a 2. tag 100-zal kevesebb.</li>
              <li><strong>Ugyanannyit költöttek</strong>: 405 Ft-ot.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Változtasd meg a tagokat!" badge="157 + 268 = 425" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>100-zal kisebb összeg: <strong>57 + 268</strong> (= 325).</li>
            <li>10-zel nagyobb összeg: <strong>167 + 268</strong> (= 435).</li>
            <li>Ugyanannyi: <strong>160 + 265</strong> (= 425).</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="+10 és −10"
          wrong="156 + 167 → 166 + 157: az összeg 20-szal nő"
          wrongExplanation="Az egyik tag nőtt, de a másik ugyanannyival csökkent!"
          correct="Az összeg nem változik: mindkettő 323."
          correctExplanation="+10 és −10 együtt 0."
        />
        <TheoryTrapBox
          title="Csökken a tag – nő az összeg?"
          wrong="Ha az egyik tagot 10-zel csökkentem, az összeg 10-zel nő."
          wrongExplanation="Ha kevesebbet adsz hozzá, kevesebb lesz az eredmény."
          correct="Az összeg is 10-zel csökken."
          correctExplanation="Például 240 + 130 = 370, de 240 + 120 = 360."
          tip="A tag és az összeg ugyanarra változik: nő-nő, csökken-csökken."
        />
      </TheorySection>

      {/* 9 – Labor I */}
      <TheorySection title="9. Labor I: Tagváltoztató" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={newGoal} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-base font-black text-teal-900 bg-teal-50 rounded-xl px-3 py-2">Az összeg {goalText(gt.delta)}!</div>
          </div>
          <svg viewBox={`0 0 240 ${labRowsH}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <ChangeRowsG
              rows={[
                [gt.a, gt.b, s0],
                [gt.a + da, gt.b + db, gDone ? s1 : '?']
              ]}
              changes={[[da !== 0 ? signed(da) : null, db !== 0 ? signed(db) : null, gDone ? signed(s1 - s0) : '?']]}
              y={10}
            />
          </svg>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-center text-sm font-bold text-blue-800 mb-1">1. tag</div>
              <StepButtons onStep={stepA} color="blue" disabled={gDone} />
            </div>
            <div>
              <div className="text-center text-sm font-bold text-amber-800 mb-1">2. tag</div>
              <StepButtons onStep={stepB} color="amber" disabled={gDone} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {!gDone && (
              <button onClick={checkG} className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px]">Ellenőrzöm</button>
            )}
            {!gDone && (da !== 0 || db !== 0) && (
              <button
                onClick={() => {
                  setDa(0);
                  setDb(0);
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
              Ügyes vagy! {gt.a + da} + {gt.b + db} = {s1}. Az összeg {changeText(s1 - s0)}{s1 - s0 === 0 ? '' : ` (${s0} → ${s1})`}.
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
          <div className="text-sm text-slate-700 text-center font-bold">Melyik jel illik a körbe? Ne számolj, csak figyeld a tagokat!</div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-black text-slate-800">
            <span>{ct.l[0]} + {ct.l[1]}</span>
            <span
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                cPick === ct.sign ? 'border-emerald-500 text-emerald-600' : 'border-rose-400 text-rose-500'
              }`}
            >
              {cPick === ct.sign ? ct.sign : '?'}
            </span>
            <span>{ct.r[0]} + {ct.r[1]}</span>
          </div>
          <div className="flex gap-3 justify-center">
            {(['<', '=', '>'] as Sign[]).map((s) => (
              <button
                key={s}
                onClick={() => pickSign(s)}
                className={`w-16 h-16 rounded-2xl text-3xl font-black border-2 ${
                  cPick === s ? (s === ct.sign ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-rose-100 border-rose-400 text-rose-700') : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {cPick && cPick !== ct.sign && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              Nem ez. Nézd meg: mi egyforma a két oldalon? Mi változott a jobb oldalon? Próbáld újra!
            </div>
          )}
          {cPick === ct.sign && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Igen! {ct.why} Számolva: {ls} {ct.sign} {rs}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SumChangesG3Theory;
