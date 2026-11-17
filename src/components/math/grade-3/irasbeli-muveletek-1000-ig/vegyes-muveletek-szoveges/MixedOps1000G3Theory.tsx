import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { MixedOps1000MapSvg, MixedOps1000TableSvg, MixedOps1000MissingSvg, MixedOps1000TwoStepSvg, MixedOps1000ReverseSvg } from './MixedOps1000G3Figures';
import { RouteFig, genRoute, RouteTask, genMissing, MissingTask } from './MixedOps1000G3Parts';
import { ColStep } from '../muveleti-sorrend/OrderOps1000G3Parts';

const Fb: React.FC<{ ok: boolean; children: React.ReactNode }> = ({ ok, children }) => (
  <div className={`rounded-xl p-2 text-center text-sm font-bold ${ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{children}</div>
);

export const MixedOps1000G3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I – útvonaltervező
  const [rt, setRt] = useState<RouteTask>({ places: ['Otthon', 'Pékség', 'Iskola', 'Park'], dists: [275, 348, 186], kind: 'sum2', ask: [1, 3], question: 'Milyen messze van egymástól: Pékség és Park?', answer: 534 });
  const [rv, setRv] = useState('');
  const [rres, setRres] = useState<null | 'ok' | 'one' | 'sum' | 'all' | 'bad'>(null);
  const checkRoute = () => {
    const v = Number(rv);
    if (v === rt.answer) setRres('ok');
    else if (rt.dists.includes(v)) setRres('one');
    else if (rt.kind === 'diff' && v === rt.dists[0] + rt.dists[2]) setRres('sum');
    else if (rt.kind === 'sum2' && v === rt.dists[0] + rt.dists[1] + rt.dists[2]) setRres('all');
    else setRres('bad');
  };
  const newRoute = () => {
    setRt(genRoute());
    setRv('');
    setRres(null);
  };

  // Labor II – hiányzó szám
  const [mt, setMt] = useState<MissingTask>({ kind: 'x+b', a: 526, b: 386, c: 912, answer: 526, text: '□ + 386 = 912', hint: 'Az egyik összeadandó hiányzik. Vond ki az összegből a másikat: 912 − 386.', check: { a: 526, op: '+', b: 386, r: 912 } });
  const [mv, setMv] = useState('');
  const [mres, setMres] = useState<null | boolean>(null);
  const newMissing = () => {
    setMt(genMissing());
    setMv('');
    setMres(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-ops-1000"
      subtopicId="vegyes-muveletek-szoveges"
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      title="4. Vegyes műveletek és szöveges feladatok"
      subtitle="Táblázatok, útvonalak, hiányzó számok és kétlépéses szöveges feladatok 1000-ig."
      badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_vegyes_muveletek_1000_tananyag.pdf"
      practiceTitle="Készen állsz a vegyes feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A TERV',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <ol className="list-decimal pl-4 space-y-1 text-xs">
              <li>Olvasd el! Mit tudunk? Mit kérdeznek?</li>
              <li>Rajzolj: szakasz, térkép vagy táblázat.</li>
              <li>Számolj írásban! Előbb becsülj.</li>
              <li>Ellenőrizd, aztán írd le a választ!</li>
            </ol>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 118–121. o." badgeColor="emerald">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Most mindent együtt használsz: <strong>írásbeli összeadást</strong>, <strong>írásbeli kivonást</strong> és a <strong>műveletek sorrendjét</strong>.</p>
          <p>Olvasol <strong>táblázatból</strong> és <strong>térképről</strong>, keresel <strong>hiányzó számot</strong>, és megoldasz <strong>két lépéses</strong> feladatokat.</p>
        </div>
        <MixedOps1000MapSvg />
        <p className="text-sm text-slate-700">Az utcán egymás után vannak a helyek. Két távolságot <strong>összeadsz</strong>, ha tovább mész. Kivonsz, ha azt kérdezik, <strong>mennyivel hosszabb</strong>.</p>
      </TheorySection>

      <TheorySection title="2. Olvass a táblázatból!" badge="Táblázat" badgeColor="sky">
        <MixedOps1000TableSvg />
        <TheoryTable
          headers={['Kérdés', 'Számolás', 'Válasz']}
          rows={[
            ['Hány gyerek van a sporttáborban?', '186 + 147 = 333', '333 gyerek'],
            ['Hány fiú van a két táborban?', '186 + 128 = 314', '314 fiú'],
            ['Mennyivel több lány van a rajztáborban, mint fiú?', '209 − 128 = 81', '81-gyel'],
            ['Hány gyerek van összesen?', '333 + 337 = 670', '670 gyerek']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Hiányzó szám" badge="□" badgeColor="teal">
        <MixedOps1000MissingSvg />
        <TheoryTable
          headers={['Mi hiányzik?', 'Példa', 'Így számolj', 'Ellenőrzés']}
          rows={[
            ['egy összeadandó', '□ + 386 = 912', '912 − 386 = 526', '526 + 386 = 912'],
            ['a kivonandó', '803 − □ = 357', '803 − 357 = 446', '803 − 446 = 357'],
            ['a kisebbítendő', '□ − 462 = 237', '237 + 462 = 699', '699 − 462 = 237']
          ]}
        />
        <TheoryCallout type="tip" title="Mindig ellenőrizz!">
          Írd be a talált számot a □ helyére, és számold ki! Ha igaz lett, jó a megoldás.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Nézzük meg együtt! Két lépés" badge="Mintapélda" badgeColor="amber">
        <MixedOps1000TwoStepSvg />
        <TheoryCard title="Fagyizó" badge="345 és 128-cal több" badgeColor="amber">
          <p className="text-sm text-slate-700">A fagyizó délelőtt 345 gombócot adott el. Délután 128-cal többet. Hány gombócot adott el egész nap?</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
            <li><strong>Mit tudunk?</strong> délelőtt 345, délután 128-cal több</li>
            <li><strong>1. lépés:</strong> délután: 345 + 128 = 473</li>
            <li><strong>2. lépés:</strong> egész nap: 345 + 473 = 818</li>
            <li><strong>Becslés:</strong> 300 + 500 = 800, ez közel van. ✓</li>
          </ul>
          <p className="text-sm text-slate-700 mt-2"><strong>Válasz:</strong> 818 gombócot adott el.</p>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="5. Visszafelé gondolkodunk" badge="Gondolkodj!" badgeColor="purple">
        <MixedOps1000ReverseSvg />
        <p className="text-sm text-slate-700">Panna egy számhoz hozzá akarta adni a 236-ot, de véletlenül kivonta. 418 lett. Melyik volt a szám? Mi lett volna a jó eredmény?</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A szám: 418 + 236 = 654 (a kivonás fordítottja az összeadás)</li>
          <li>A jó eredmény: 654 + 236 = 890</li>
        </ul>
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="„Több” – mégis kivonás?"
          wrong="Az első dobozban 520 gyöngy van, 135-tel több, mint a másodikban. 520 + 135 = 655"
          wrongExplanation="A „több” szó miatt összeadott. De a második dobozban kevesebb van!"
          correct="520 − 135 = 385"
          correctExplanation="Az első doboz a nagyobb. A második 135-tel kevesebb: 385 gyöngy."
          tip="Rajzold le két szalaggal! Melyik a hosszabb?"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Útvonaltervező" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <RouteFig places={rt.places} dists={rt.dists} ask={rt.ask} className="w-full max-w-xl h-auto mx-auto" />
          <p className="text-base font-bold text-emerald-900 bg-emerald-50 rounded-xl p-3 text-center">{rt.question}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <input
              value={rv}
              onChange={(e) => {
                setRv(e.target.value.replace(/[^0-9]/g, ''));
                setRres(null);
              }}
              inputMode="numeric"
              className="w-28 rounded-xl border-2 border-emerald-300 px-2 py-2 text-center text-2xl font-black"
              aria-label="távolság méterben"
            />
            <span className="text-xl font-bold text-slate-600">m</span>
            <button onClick={checkRoute} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px]">Ellenőrzés</button>
          </div>
          {rres === 'ok' && <Fb ok>Szuper! {rt.answer} m.</Fb>}
          {rres === 'one' && <Fb ok={false}>Ez csak egy szakasz. Nézd meg a piros ívet: mettől meddig tart?</Fb>}
          {rres === 'sum' && <Fb ok={false}>Itt nem összeadunk: azt kérdezzük, mennyivel hosszabb. Vonj ki!</Fb>}
          {rres === 'all' && <Fb ok={false}>Ez az egész utca. A piros ív csak két szakaszt fog át.</Fb>}
          {rres === 'bad' && <Fb ok={false}>Még nem jó. Írd fel a műveletet, és számolj írásban!</Fb>}
          {rres === 'ok' && (
            <div className="max-w-[160px] mx-auto">
              {rt.kind === 'diff' ? (
                <ColStep a={Math.max(rt.dists[0], rt.dists[2])} op="−" b={Math.min(rt.dists[0], rt.dists[2])} result={rt.answer} />
              ) : rt.kind === 'sum2' ? (
                <ColStep a={rt.dists[rt.ask[0]]} op="+" b={rt.dists[rt.ask[0] + 1]} result={rt.answer} />
              ) : null}
            </div>
          )}
          <button onClick={newRoute} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">Új feladat</button>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Melyik szám hiányzik?" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center text-3xl font-black text-slate-800">{mt.text}</div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-2xl font-black text-rose-600">□ =</span>
            <input
              value={mv}
              onChange={(e) => {
                setMv(e.target.value.replace(/[^0-9]/g, ''));
                setMres(null);
              }}
              inputMode="numeric"
              className="w-28 rounded-xl border-2 border-blue-300 px-2 py-2 text-center text-2xl font-black"
              aria-label="hiányzó szám"
            />
            <button onClick={() => setMres(Number(mv) === mt.answer)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-base font-bold min-h-[48px]">Ellenőrzés</button>
          </div>
          {mres === true && (
            <div className="space-y-2">
              <Fb ok>Igen! □ = {mt.answer}. Ellenőrzés:</Fb>
              <div className="max-w-[160px] mx-auto">
                <ColStep a={mt.check.a} op={mt.check.op} b={mt.check.b} result={mt.check.r} />
              </div>
            </div>
          )}
          {mres === false && <Fb ok={false}>Még nem jó. Tipp: {mt.hint}</Fb>}
          <button onClick={newMissing} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">Új feladat</button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MixedOps1000G3Theory;
