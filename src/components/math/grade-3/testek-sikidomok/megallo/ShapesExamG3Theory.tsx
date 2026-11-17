import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { ExamSolidsSvg, ExamCuboidSvg, ExamPolygonsSvg, ExamSymmetrySvg } from './ShapesExamG3Figures';
import { Solid, FitBuilding, PlanGrid } from '../a-testek/SolidsG3Parts';
import { AxisLine, GridG } from '../tukrozesek-szimmetria/SymmetryG3Parts';
import { FONT, INK, PlaneShape, MixedTask, makeMixedTask, OddRound, makeOddRound, ODD_ROUNDS, OddArt } from './ShapesExamG3Parts';

const FIRST_MIXED: MixedTask = {
  kind: 'plan',
  plan: [
    [3, 2, 1],
    [2, 1, 1]
  ],
  prompt: 'Ez egy építmény alaprajza. Hány kis kocka kell hozzá?',
  answer: '10',
  options: ['6', '10', '9', '11'],
  hint: 'A szám azt mutatja, hány kocka áll ott egymáson. Add össze az összes számot!',
  why: '3 + 2 + 1 + 2 + 1 + 1 = 10.'
};

/** A vegyes feladat ábrája. */
const MixedFig: React.FC<{ t: MixedTask }> = ({ t }) => {
  if (t.kind === 'plan' && t.plan)
    return (
      <svg viewBox="0 0 260 120" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <text x="50" y="14" textAnchor="middle" fontSize="11" fill="#475569">hátul</text>
        <PlanGrid plan={t.plan} x={8} y={20} cell={28} />
        <text x="50" y="94" textAnchor="middle" fontSize="11" fill="#475569">elöl</text>
        <FitBuilding plan={t.plan} x={120} y={6} w={132} h={108} />
      </svg>
    );
  if ((t.kind === 'sides' || t.kind === 'axes') && t.poly)
    return (
      <svg viewBox="0 0 200 140" className="w-full max-w-[260px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <PlaneShape kind={t.poly} cx={100} cy={70} r={58} sw={3} />
      </svg>
    );
  if (t.kind === 'mirror' && t.d) {
    const s = 26;
    const x0 = 10;
    return (
      <svg viewBox="0 0 230 100" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <GridG x={x0} y={10} cols={8} rows={3} s={s} />
        <AxisLine x1={x0 + 4 * s} y1={2} x2={x0 + 4 * s} y2={96} />
        <circle cx={x0 + (4 - t.d) * s} cy={10 + 1.5 * s} r="8" fill="#ef4444" stroke={INK} strokeWidth="1.6" />
      </svg>
    );
  }
  if (t.kind === 'faces' && t.solid)
    return (
      <svg viewBox="0 0 160 130" className="w-full max-w-[220px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <Solid kind={t.solid} cx={80} by={118} s={92} />
      </svg>
    );
  return null;
};

export const ShapesExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [mt, setMt] = useState<MixedTask>(FIRST_MIXED);
  const [mPick, setMPick] = useState<string | null>(null);
  const [mScore, setMScore] = useState(0);
  const newMixed = () => {
    setMt(makeMixedTask());
    setMPick(null);
  };
  const pickMixed = (o: string) => {
    if (mPick === mt.answer) return;
    setMPick(o);
    if (o === mt.answer) setMScore(mScore + 1);
  };

  // ---- Labor II ----
  const [odd, setOdd] = useState<OddRound>(ODD_ROUNDS[0]);
  const [oPick, setOPick] = useState<number | null>(null);
  const [oScore, setOScore] = useState(0);
  const newOdd = () => {
    setOdd(makeOddRound(odd));
    setOPick(null);
  };
  const pickOdd = (i: number) => {
    if (oPick === odd.odd) return;
    setOPick(i);
    if (i === odd.odd) setOScore(oScore + 1);
  };

  return (
    <TheoryTemplate
      topicId="g3-shapes-solids"
      subtopicId="megallo"
      grade={3}
      chapterId="testek-sikidomok"
      title="5. Megálló – tudáspróba"
      subtitle="Testek, a téglatest és a kocka, síkidomok és sokszögek, tükrözés – minden egy helyen."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_testek_sikidomok_megallo_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten vár rád!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A <strong>test</strong> térbeli (megfoghatod), a <strong>síkidom</strong> lapos (lerajzolhatod).</li>
              <li>A kockát <strong>6 négyzet</strong>, a téglatestet <strong>6 téglalap</strong> határolja.</li>
              <li>A <strong>sokszögeket</strong> csak egyenes szakaszok határolják. A kör nem sokszög.</li>
              <li>A <strong>tükörtengely</strong> mentén félbehajtva a két fele pontosan fedi egymást.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Testek" badge="1. lecke" badgeColor="blue">
        <ExamSolidsSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A test lapos részei a <strong>lapok</strong>. A görbe rész nem lap.</li>
          <li>Csak lapok határolják: kocka, téglatest, piramis alakú test. Ezek nem gurulnak.</li>
          <li>Görbe része is van: konzervdoboz alakú test, tölcsér alakú test, gömb. Ezek gurulnak.</li>
          <li><strong>Alaprajz:</strong> a szám megmutatja, hány kis kocka áll ott egymáson.</li>
        </ul>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. A téglatest és a kocka" badge="2. lecke" badgeColor="amber">
        <ExamCuboidSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A téglatestnek és a kockának is <strong>6 lapja</strong> van.</li>
          <li>A kocka minden lapja ugyanakkora négyzet. A kocka is téglatest!</li>
          <li>A téglatest szemközti lapjai egyformák.</li>
          <li>A lapokat kiterítve kapjuk a <strong>testhálót</strong>.</li>
        </ul>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Síkidomok, sokszögek" badge="3. lecke" badgeColor="emerald">
        <ExamPolygonsSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A sokszög neve az oldalai számából jön: háromszög, négyszög, ötszög, hatszög.</li>
          <li>Ugyanannyi csúcsa van, mint oldala.</li>
          <li>A négyzet és a téglalap is négyszög. Minden négyzet téglalap is.</li>
        </ul>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Tükrözés, szimmetria" badge="4. lecke" badgeColor="rose">
        <ExamSymmetrySvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Téglalap: 2, négyzet: 4, egyforma oldalú háromszög: 3, kör: akárhány tükörtengely.</li>
          <li>Négyzetrácson: a tükörkép ugyanannyi kockányira van a tengelytől, a másik oldalon.</li>
        </ul>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hány kis kocka?" badge="alaprajz" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hátul: 3, 2, 1. Elöl: 2, 1, 1.</li>
              <li>3 + 2 + 1 = 6, és 2 + 1 + 1 = 4.</li>
              <li>6 + 4 = <strong>10</strong> kis kocka.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány oldal?" badge="sokszögek" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy háromszögnek 3, egy ötszögnek 5 oldala van.</li>
              <li>Együtt 3 + 5 = <strong>8</strong> oldal.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány lap?" badge="testek" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A kockának 6 lapja van.</li>
              <li>2 kockának 6 + 6 = <strong>12</strong> lapja van.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Vigyázz!" badge="Csapdák" badgeColor="rose">
        <TheoryTrapBox
          title="A görbe rész nem lap"
          wrong="A konzervdoboz alakú testnek 3 lapja van."
          wrongExplanation="A görbe oldalát nem számoljuk lapnak."
          correct="2 lapja van: alul és felül egy-egy kör."
        />
        <TheoryTrapBox
          title="Kör vagy gömb?"
          wrong="A labda kör alakú."
          wrongExplanation="A kör síkidom, lapos. A labdát megfoghatod: test."
          correct="A labda gömb alakú. Ha körberajzolod az árnyékát, kört kapsz."
        />
        <TheoryTrapBox
          title="Alaprajz"
          wrong="Az alaprajzon 6 négyzet van, tehát 6 kis kocka kell."
          wrongExplanation="Egy négyzeten több kocka is állhat egymáson."
          correct="Add össze a négyzetekbe írt számokat!"
        />
        <TheoryCallout type="tip" title="Ne felejtsd el!">
          A téglalap átlója nem tükörtengely. A kör nem sokszög, de síkidom.
        </TheoryCallout>
      </TheorySection>

      {/* 7 – Labor I */}
      <TheorySection title="7. Labor I: Vegyes feladatgép" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={newMixed} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-emerald-900 bg-emerald-50 rounded-xl px-3 py-2">Jó válasz: {mScore}</div>
          </div>
          <div className="text-base text-slate-800 text-center font-bold">{mt.prompt}</div>
          <MixedFig t={mt} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mt.options.map((o) => (
              <button
                key={o}
                onClick={() => pickMixed(o)}
                className={`min-h-[56px] rounded-2xl text-xl font-black border-2 ${
                  mPick === o ? (o === mt.answer ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-rose-100 border-rose-400 text-rose-700') : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          {mPick && mPick !== mt.answer && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">Nem ez. {mt.hint} Próbáld újra!</div>}
          {mPick === mt.answer && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Ügyes! {mt.why}</div>}
        </div>
      </TheorySection>

      {/* 8 – Labor II */}
      <TheorySection title="8. Labor II: Kakukktojás-kereső" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={newOdd} className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-amber-900 bg-amber-50 rounded-xl px-3 py-2">Megtalált kakukktojás: {oScore}</div>
          </div>
          <div className="text-base text-slate-800 text-center font-bold">Melyik nem illik a többi közé? Koppints rá!</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {odd.items.map((it, i) => (
              <button
                key={i}
                onClick={() => pickOdd(i)}
                aria-label={`${i + 1}. ábra`}
                className={`rounded-2xl border-4 p-2 ${
                  oPick === i ? (i === odd.odd ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <svg viewBox="0 0 80 80" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <OddArt item={it} SolidComp={Solid} />
                </svg>
              </button>
            ))}
          </div>
          {oPick !== null && oPick !== odd.odd && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              Ez illik a többihez. Nézd meg: mi közös hármukban? Lapok, oldalak, tükörtengely? Próbáld újra!
            </div>
          )}
          {oPick === odd.odd && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Megtaláltad! {odd.why}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ShapesExamG3Theory;
