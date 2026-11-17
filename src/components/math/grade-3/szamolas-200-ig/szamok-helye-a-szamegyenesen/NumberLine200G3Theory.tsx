import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  NumberLine0to200Svg,
  ZoomLineSvg,
  ScaleStepsSvg,
  TapeMeasureSvg,
  GrasshopperSvg,
  MiddleSvg
} from './NumberLine200G3Figures';
import { FONT, NLine, UNK } from './NumberLine200G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ---------------------------------------------------------------------------
// Labor I – Tedd a helyére! (20 egységnyi részlet, egyes beosztás)
// ---------------------------------------------------------------------------
const makePlace = () => {
  const lo = rnd(0, 18) * 10; // 0 … 180
  let t = lo + rnd(1, 19);
  if (t % 10 === 0) t += 3;
  return { lo, target: t };
};

// ---------------------------------------------------------------------------
// Labor II – Mennyit ér egy osztás?
// ---------------------------------------------------------------------------
interface ScaleTask { lo: number; step: number; q: number; options: number[] }
const makeScale = (): ScaleTask => {
  const step = pick([2, 5, 10, 20]);
  const span = step * 10;
  const lo = step === 20 ? 0 : rnd(0, (200 - span) / 10) * 10;
  const q = pick([1, 2, 3, 4, 6, 7, 8, 9]);
  const correct = lo + q * step;
  const cand = [lo + q, lo + (q + 1) * step, lo + (q - 1) * step, correct + 10, correct - 10, correct + 2 * step, lo + q * 10];
  const opts = [correct];
  cand.forEach((c) => {
    if (opts.length < 4 && c >= 0 && c <= 200 && !opts.includes(c)) opts.push(c);
  });
  return { lo, step, q, options: opts.sort(() => Math.random() - 0.5) };
};

export const NumberLine200G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [place, setPlace] = useState<{ lo: number; target: number }>({ lo: 130, target: 146 });
  const [tapped, setTapped] = useState<number | null>(null);
  const placeOk = tapped === place.target;
  const newPlace = () => {
    setPlace(makePlace());
    setTapped(null);
  };
  const LX0 = 24;
  const LX1 = 404;
  const LX = (i: number) => LX0 + ((LX1 - LX0) * i) / 20;

  // Labor II
  const [scale, setScale] = useState<ScaleTask>({ lo: 100, step: 5, q: 7, options: [135, 107, 140, 130] });
  const [chosen, setChosen] = useState<number | null>(null);
  const scaleCorrect = scale.lo + scale.q * scale.step;
  const newScale = () => {
    setScale(makeScale());
    setChosen(null);
  };
  const scaleHint = (v: number) => {
    if (v === scale.lo + scale.q) return 'Egy osztás nem 1-et ér! Nézd meg a két felírt számot.';
    if (v === scale.lo + scale.q * 10 && scale.step !== 10) return 'Egy osztás itt nem 10-et ér. Számold ki újra!';
    if (Math.abs(v - scaleCorrect) === scale.step) return 'Majdnem! Egy vonással elcsúsztál. Számold meg újra a lépéseket!';
    return 'Nem ez. Előbb azt nézd meg, mennyit ér egy osztás!';
  };

  return (
    <TheoryTemplate
      topicId="g3-count-200"
      subtopicId="szamok-helye-a-szamegyenesen"
      grade={3}
      chapterId="szamolas-200-ig"
      title="2. Számok helye a számegyenesen"
      subtitle="Számegyenes 200-ig, mennyit ér egy osztás, mérőszalag, szöcskeugrások."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG"
      themeColor="teal"
      pdfFilename="3_osztaly_szamok_helye_a_szamegyenesen_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A SZÁMEGYENES',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-base font-black text-teal-900 dark:text-teal-200">
              balra kisebb ← 150 → jobbra nagyobb
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Először nézd meg: <strong>mennyit ér egy osztás?</strong></li>
              <li>Két felírt szám között számold meg a lépéseket!</li>
              <li>Ugrásnál a lépéseket számold, ne a vonásokat!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 32. o." badgeColor="teal">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A számegyenesen minden számnak megvan a <strong>saját helye</strong>.</p>
          <p>Most 200-ig keressük meg a számok helyét.</p>
          <p>Megtanuljuk leolvasni, mennyit ér egy osztás. Aztán mérőszalagon mérünk, és szöcskével ugrálunk!</p>
        </div>
      </TheorySection>

      {/* 2. A számegyenes */}
      <TheorySection title="2. A számegyenes 0-tól 200-ig" badge="Tízesével" badgeColor="emerald">
        <NumberLine0to200Svg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Jobbra nagyobb" badge="→" badgeColor="emerald">
            <p className="text-sm text-slate-700">Balról jobbra haladva a számok egyre nagyobbak. A 130 jobbra van a 90-től, mert 130 &gt; 90.</p>
          </TheoryCard>
          <TheoryCard title="A 100 a közepén" badge="0 · 100 · 200" badgeColor="sky">
            <p className="text-sm text-slate-700">A 0 és a 200 között pont középen a 100 van. A 100 és a 200 között középen a 150.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Mennyit ér egy osztás */}
      <TheorySection title="3. Mennyit ér egy osztás?" badge="Beosztás" badgeColor="purple">
        <ScaleStepsSvg />
        <TheoryCallout type="info" title="Így derítsd ki!">
          Keress két felírt számot. Számold meg, hány lépés van köztük. Például 100-tól 110-ig 2 lépés van, és 5 + 5 = 10. Tehát egy osztás <strong>5</strong>-öt ér.
        </TheoryCallout>
        <ZoomLineSvg />
        <p className="text-sm text-slate-700">Ha ránagyítunk a 140 és a 150 közötti részre, ott már minden szám látszik: 141, 142, … 149.</p>
      </TheorySection>

      {/* 4. Mérőszalag */}
      <TheorySection title="4. A mérőszalag is számegyenes" badge="cm" badgeColor="amber">
        <TapeMeasureSvg />
        <TheoryCallout type="tip" title="Távolugrás">
          A mérőszalag 0-nál kezdődik. A sarok nyománál olvassuk le, milyen messze ugrott valaki. Itt: <strong>165 cm</strong>. A 200 cm éppen 2 m.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Szöcske */}
      <TheorySection title="5. Ugráljunk a számegyenesen!" badge="Szöcske" badgeColor="emerald">
        <GrasshopperSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Jobbra ugrik" badge="több" badgeColor="emerald">
            <p className="text-sm text-slate-700">152-től 5-öt jobbra: 153, 154, 155, 156, <strong>157</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Balra ugrik" badge="kevesebb" badgeColor="rose">
            <p className="text-sm text-slate-700">152-től 4-et balra: 151, 150, 149, <strong>148</strong>.</p>
          </TheoryCard>
        </div>
        <MiddleSvg />
        <TheoryCallout type="info" title="Ugyanolyan messze">
          A 165 a 160-tól 5 lépésre van. A 170-től is 5 lépésre. Ezért a 165 <strong>pont középen</strong> van.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hol van a nyíl?" badge="ötösével" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Felírva: 100 és 150. Köztük 10 lépés van.</li>
              <li>10 darab 5 éppen 50. Egy osztás 5.</li>
              <li>A nyíl a 7. vonásnál van.</li>
              <li>100, 105, 110, 115, 120, 125, 130, <strong>135</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Szöcskeugrás" badge="balra" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A szöcske a 148-on ül.</li>
              <li>6-ot ugrik balra.</li>
              <li>147, 146, 145, 144, 143, <strong>142</strong>.</li>
              <li>A 142-re érkezik.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyik van közelebb?" badge="150" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>146 vagy 153 van közelebb a 150-hez?</li>
              <li>146-tól 150-ig 4 lépés.</li>
              <li>153-tól 150-ig 3 lépés.</li>
              <li>A <strong>153</strong> van közelebb.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <svg viewBox="0 0 360 90" className="w-full max-w-lg h-auto mx-auto" fontFamily={FONT}>
          <rect x="1" y="1" width="358" height="88" rx="12" fill="#fff1f2" stroke="#fecdd3" />
          <NLine x0={30} x1={320} y={50} lo={100} step={5} n={4} big={20} labels={[0, 4]} marks={[{ i: 3, text: '?' }]} fs={11} />
        </svg>
        <TheoryTrapBox
          title="Melyik szám van a „?” helyén?"
          wrong="103"
          wrongExplanation="Ez akkor lenne jó, ha egy osztás 1-et érne. De 100-tól 120-ig csak 4 lépés van!"
          correct="115"
          correctExplanation="5 + 5 + 5 + 5 = 20, tehát egy osztás 5. 100, 105, 110, 115."
          tip="Mielőtt leolvasod, mindig nézd meg, mennyit ér egy osztás!"
        />
        <TheoryCallout type="warning" title="Lépést számolj, ne vonást!">
          A 120-tól 3-at ugrasz jobbra: 121, 122, 123. A 120-at nem számolod bele, onnan indulsz!
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Tedd a helyére!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900">
            Koppints a vonásra, ahol ez a szám van: <span className="text-3xl font-black align-middle ml-2">{place.target}</span>
          </div>
          <svg viewBox="0 0 430 110" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200 select-none" fontFamily={FONT}>
            <NLine x0={LX0} x1={LX1} y={52} lo={place.lo} step={1} n={20} mid={5} labels={[0, 10, 20]} fs={13} />
            {tapped !== null && (
              <g>
                <circle cx={LX(tapped - place.lo)} cy={52} r="7" fill={placeOk ? '#16a34a' : UNK} />
                <text x={LX(tapped - place.lo)} y={30} textAnchor="middle" fontSize="13" fontWeight="bold" fill={placeOk ? '#15803d' : UNK}>
                  {tapped}
                </text>
              </g>
            )}
            {Array.from({ length: 21 }, (_, i) => (
              <rect
                key={i}
                x={LX(i) - 9.5}
                y={10}
                width={19}
                height={90}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onClick={() => !placeOk && setTapped(place.lo + i)}
              />
            ))}
          </svg>
          {tapped !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${placeOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {placeOk
                ? `Szuper! Megtaláltad: ${place.target}.`
                : `Ide koppintottál: ${tapped}. A keresett szám ${Math.abs(place.target - tapped)} lépéssel ${place.target > tapped ? 'jobbra' : 'balra'} van. Próbáld újra!`}
            </div>
          )}
          <button onClick={newPlace} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Mennyit ér egy osztás?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 rounded-xl p-3 text-sm text-purple-900 text-center">
            Melyik szám van a „?” helyén? Előbb nézd meg, mennyit ér egy osztás!
          </div>
          <svg viewBox="0 0 430 100" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <NLine
              x0={24}
              x1={404}
              y={58}
              lo={scale.lo}
              step={scale.step}
              n={10}
              big={100000}
              labels={[0, 5]}
              marks={[{ i: scale.q, text: '?' }]}
              fs={13}
            />
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scale.options.map((o) => {
              const isChosen = chosen === o;
              const ok = o === scaleCorrect;
              let cls = 'bg-white border-purple-300 text-purple-900';
              if (isChosen) cls = ok ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-rose-400 border-rose-600 text-white';
              return (
                <button
                  key={o}
                  onClick={() => chosen !== scaleCorrect && setChosen(o)}
                  className={`px-3 py-3 rounded-xl border-2 font-black text-lg min-h-[52px] ${cls}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${chosen === scaleCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {chosen === scaleCorrect
                ? `Ügyes! Egy osztás ennyit ér: ${scale.step}. Indulás: ${scale.lo}, ${scale.q} lépés, érkezés: ${scaleCorrect}.`
                : scaleHint(chosen)}
            </div>
          )}
          <button onClick={newScale} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumberLine200G3Theory;
