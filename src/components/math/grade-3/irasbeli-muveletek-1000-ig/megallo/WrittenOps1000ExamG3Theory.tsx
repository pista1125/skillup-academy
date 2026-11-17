import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  WrittenOps1000ExamMapSvg,
  WrittenOps1000ExamAddSvg,
  WrittenOps1000ExamSubSvg,
  WrittenOps1000ExamOrderSvg,
  WrittenOps1000ExamPlanSvg
} from './WrittenOps1000ExamG3Figures';
import {
  AddFig,
  SubFig,
  genWritten,
  genCheck,
  addExplain,
  subExplain,
  addNoCarry,
  subNoCarry,
  subSwap,
  WKind,
  WTask,
  CheckTask
} from './WrittenOps1000ExamG3Parts';

const Fb: React.FC<{ ok: boolean; children: React.ReactNode }> = ({ ok, children }) => (
  <div className={`rounded-xl p-2 text-center text-sm font-bold ${ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{children}</div>
);

const KINDS: { k: WKind | 'mix'; label: string }[] = [
  { k: 'mix', label: 'Vegyes' },
  { k: 'add', label: 'Összeadás' },
  { k: 'add3', label: 'Három tag' },
  { k: 'sub', label: 'Kivonás' },
  { k: 'sub0', label: 'Kivonás nullákkal' }
];

export const WrittenOps1000ExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I – vegyes írásbeli gyakorló
  const [kind, setKind] = useState<WKind | 'mix'>('mix');
  const [wt, setWt] = useState<WTask>({ kind: 'add', nums: [467, 385], op: '+', answer: 852 });
  const [wv, setWv] = useState('');
  const [wres, setWres] = useState<null | 'ok' | 'carry' | 'swap' | 'bad'>(null);
  const [show, setShow] = useState(false);
  const newWritten = (k: WKind | 'mix' = kind) => {
    setWt(genWritten(k === 'mix' ? undefined : k));
    setWv('');
    setWres(null);
    setShow(false);
  };
  const checkWritten = () => {
    const v = Number(wv);
    if (v === wt.answer) setWres('ok');
    else if (wt.op === '+' && v === addNoCarry(wt.nums)) setWres('carry');
    else if (wt.op === '−' && v === subNoCarry(wt.nums[0], wt.nums[1])) setWres('carry');
    else if (wt.op === '−' && v === subSwap(wt.nums[0], wt.nums[1])) setWres('swap');
    else setWres('bad');
  };

  // Labor II – Jó vagy hibás?
  const [ct, setCt] = useState<CheckTask>({ nums: [563, 278], op: '+', shown: 731, correct: 841, err: 'carry' });
  const [judge, setJudge] = useState<null | boolean>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const answer = (saysOk: boolean) => {
    if (judge !== null) return;
    const right = saysOk === (ct.err === 'ok');
    setJudge(right);
    setScore((s) => ({ ok: s.ok + (right ? 1 : 0), all: s.all + 1 }));
  };
  const newCheck = () => {
    setCt(genCheck());
    setJudge(null);
  };
  const errText =
    ct.err === 'ok'
      ? 'Ez jó számolás!'
      : ct.err === 'carry'
        ? 'Elfelejtette a maradékot!'
        : 'Mindig a nagyobb jegyből vonta ki a kisebbet – pótolni kellett volna!';

  return (
    <TheoryTemplate
      topicId="g3-written-ops-1000"
      subtopicId="megallo"
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      title="5. Megálló – tudáspróba"
      subtitle="Ismételjük át a fejezetet: írásbeli összeadás és kivonás, sorrend, zárójel, szöveges feladatok 1000-ig."
      badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_irasbeli_muveletek_1000_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat vár rád 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Írásban az egyeseknél kezdünk.</li>
              <li>Kivonásnál pótolunk: „6-hoz 4, az 10, maradt 1.”</li>
              <li>Sorrend: zárójel → · és : → + és −.</li>
              <li>Becsülj, számolj, ellenőrizz!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 118–121. o." badgeColor="emerald">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Ebben a fejezetben négy dolgot tanultál. Most mindet együtt gyakorolod.</p>
        </div>
        <WrittenOps1000ExamMapSvg />
        <TheoryCallout type="tip" title="Hogyan készülj?">
          Nézd át a négy részt! Aztán próbáld ki a két labort. Végül jöhet a kvíz.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. Írásbeli összeadás" badge="Összeadás" badgeColor="emerald">
        <WrittenOps1000ExamAddSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A számokat helyi érték szerint írjuk egymás alá.</li>
          <li>Az egyeseknél kezdünk. Ha 10 vagy több jön ki, a maradékot továbbvisszük.</li>
          <li>Három tagnál is ugyanígy: „3 meg 5 meg 8 az 16”.</li>
        </ul>
      </TheorySection>

      <TheorySection title="3. Írásbeli kivonás pótlással" badge="Kivonás" badgeColor="sky">
        <WrittenOps1000ExamSubSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Alulról felfelé pótolunk: „6-hoz mennyi kell, hogy 10 legyen?”</li>
          <li>Ha 10-zel többig pótoltunk, maradt 1. Ezt a kivonandó következő jegyéhez adjuk.</li>
          <li>Ellenőrzés: különbség + kivonandó = kisebbítendő. 504 + 496 = 1000 ✓</li>
        </ul>
      </TheorySection>

      <TheorySection title="4. Sorrend és zárójel" badge="Sorrend" badgeColor="amber">
        <WrittenOps1000ExamOrderSvg />
        <TheoryTable
          headers={['Feladat', 'Mit számolsz előbb?', 'Eredmény']}
          rows={[
            ['750 − 280 + 135', '750 − 280 = 470 (balról)', '605'],
            ['380 + 6 · 70', '6 · 70 = 420 (szorzás)', '800'],
            ['(930 − 570) : 6', '930 − 570 = 360 (zárójel)', '60'],
            ['1000 − (365 + 248)', '365 + 248 = 613 (zárójel)', '387']
          ]}
        />
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt! Szöveges feladat" badge="Mintapélda" badgeColor="purple">
        <WrittenOps1000ExamPlanSvg />
        <TheoryCard title="Kirándulás" badge="két lépés" badgeColor="purple">
          <p className="text-sm text-slate-700">Az osztály 1000 Ft-ot gyűjtött. Vettek egy 465 Ft-os labdát és egy 280 Ft-os ugrókötelet. Mennyi pénz maradt?</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
            <li><strong>Mit tudunk?</strong> 1000 Ft volt, 465 Ft és 280 Ft fogyott.</li>
            <li><strong>Becslés:</strong> 500 + 300 = 800, marad kb. 200 Ft.</li>
            <li><strong>1. lépés:</strong> 465 + 280 = 745 Ft</li>
            <li><strong>2. lépés:</strong> 1000 − 745 = 255 Ft</li>
            <li><strong>Egy műveletsorral:</strong> 1000 − (465 + 280) = 255</li>
            <li><strong>Ellenőrzés:</strong> 255 + 745 = 1000 ✓</li>
          </ul>
          <p className="text-sm text-slate-700 mt-2"><strong>Válasz:</strong> 255 Ft maradt.</p>
        </TheoryCard>
        <TheoryTable
          headers={['Mi hiányzik?', 'Példa', 'Így számolj']}
          rows={[
            ['egy összeadandó', '□ + 458 = 913', '913 − 458 = 455'],
            ['a kivonandó', '742 − □ = 386', '742 − 386 = 356'],
            ['a kisebbítendő', '□ − 267 = 548', '548 + 267 = 815']
          ]}
        />
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett maradék"
          wrong="645 + 289 = 824"
          wrongExplanation="Az egyeseknél 14 lett, a tízeseknél 12 – de a maradékot egyszer sem vitte tovább."
          correct="645 + 289 = 934"
          correctExplanation="5 meg 9 az 14, maradt 1. 4 meg 8 az 12, meg 1 az 13, maradt 1. 6 meg 2 az 8, meg 1 az 9."
          tip="Becsülj előre! 600 + 300 = 900, így a 824 túl kevés."
        />
        <TheoryTrapBox
          title="Fordított pótlás"
          wrong="702 − 345 = 443"
          wrongExplanation="Mindig a nagyobb jegyből vonta ki a kisebbet (5 − 2, 4 − 0)."
          correct="702 − 345 = 357"
          correctExplanation="5-höz 7, az 12, maradt 1. 4 meg 1 az 5, 5-höz 5, az 10, maradt 1. 3 meg 1 az 4, 4-hez 3, az 7."
          tip="Mindig a kivonandótól pótolsz felfelé!"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Számolj írásban!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {KINDS.map((x) => (
              <button
                key={x.k}
                onClick={() => {
                  setKind(x.k);
                  newWritten(x.k);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${kind === x.k ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-800 border-emerald-300'}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <div className="max-w-[200px] mx-auto">
            {wt.op === '+' ? (
              <AddFig nums={wt.nums} result={wres === 'ok' ? wt.answer : '???'} carries={wres === 'ok'} className="w-full h-auto" />
            ) : (
              <SubFig a={wt.nums[0]} b={wt.nums[1]} result={wres === 'ok' ? wt.answer : '???'} carries={wres === 'ok'} className="w-full h-auto" />
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xl font-bold text-slate-700">{wt.nums.join(` ${wt.op} `)} =</span>
            <input
              value={wv}
              onChange={(e) => {
                setWv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4));
                setWres(null);
              }}
              inputMode="numeric"
              className="w-28 rounded-xl border-2 border-emerald-300 px-2 py-2 text-center text-2xl font-black"
              aria-label="eredmény"
            />
            <button onClick={checkWritten} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px]">Ellenőrzés</button>
          </div>
          {wres === 'ok' && <Fb ok>Szuper! {wt.nums.join(` ${wt.op} `)} = {wt.answer}.</Fb>}
          {wres === 'carry' && <Fb ok={false}>Majdnem! Elfelejtetted a maradékot. Ahol 10 vagy több lett, ott „maradt 1”.</Fb>}
          {wres === 'swap' && <Fb ok={false}>Vigyázz! A nagyobb jegyből vontad ki a kisebbet. Pótolj alulról felfelé, a kivonandó jegyétől!</Fb>}
          {wres === 'bad' && <Fb ok={false}>Még nem jó. Kezdd az egyeseknél, és számolj lassan!</Fb>}
          {show && (
            <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
              {wt.op === '+' ? addExplain(wt.nums) : subExplain(wt.nums[0], wt.nums[1])}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setShow((s) => !s)} className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-base font-bold min-h-[48px]">{show ? 'Elrejtem' : 'Mutasd meg!'}</button>
            <button onClick={() => newWritten()} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">Új feladat</button>
          </div>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Jó vagy hibás?" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-center text-base font-bold text-violet-900">Egy gyerek így számolt. Jól számolt?</p>
          <div className="max-w-[200px] mx-auto">
            {ct.op === '+' ? (
              <AddFig nums={ct.nums} result={ct.shown} className="w-full h-auto" />
            ) : (
              <SubFig a={ct.nums[0]} b={ct.nums[1]} result={ct.shown} className="w-full h-auto" />
            )}
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={() => answer(true)} className="px-5 py-3 rounded-xl bg-emerald-500 text-white text-lg font-black min-h-[52px] min-w-[110px]">Jó ✓</button>
            <button onClick={() => answer(false)} className="px-5 py-3 rounded-xl bg-rose-500 text-white text-lg font-black min-h-[52px] min-w-[110px]">Hibás ✗</button>
          </div>
          {judge !== null && (
            <div className="space-y-2">
              <Fb ok={judge}>{judge ? 'Ügyes vagy! ' : 'Nézd meg újra! '}{errText}</Fb>
              {ct.err !== 'ok' && (
                <div className="space-y-1">
                  <p className="text-center text-sm font-bold text-slate-700">A helyes eredmény: {ct.correct}</p>
                  <div className="max-w-[170px] mx-auto">
                    {ct.op === '+' ? (
                      <AddFig nums={ct.nums} result={ct.correct} carries className="w-full h-auto" />
                    ) : (
                      <SubFig a={ct.nums[0]} b={ct.nums[1]} result={ct.correct} carries className="w-full h-auto" />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <p className="text-center text-sm font-bold text-slate-500">Pontok: {score.ok} / {score.all}</p>
          <div className="flex justify-center">
            <button onClick={newCheck} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">Új feladat</button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenOps1000ExamG3Theory;
