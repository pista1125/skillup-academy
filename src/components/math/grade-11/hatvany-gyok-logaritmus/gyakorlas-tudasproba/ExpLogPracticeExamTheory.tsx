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
  ChapterMapSvg,
  TownGrowthSvg,
  IsotopeRaceSvg,
  EcoliCylinderSvg,
  InvestmentCompareSvg
} from './ExpLogPracticeExamFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  if (Math.abs(x) >= 1e9 || (Math.abs(x) < 1e-4 && x !== 0)) return x.toExponential(3).replace('.', ',');
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
const parseNum = (s: string) => Number(s.trim().replace(/\s/g, '').replace(',', '.').replace('−', '-'));

type LogTask = { base: string; arg: string; answer: number; answerText: string; why: string };
const LOG_TASKS: LogTask[] = [
  { base: '3', arg: '1', answer: 0, answerText: '0', why: '3⁰ = 1' },
  { base: '4', arg: '1/2', answer: -0.5, answerText: '−1/2', why: '4^(−1/2) = 1/√4 = 1/2' },
  { base: '2', arg: '0,5', answer: -1, answerText: '−1', why: '2⁻¹ = 0,5' },
  { base: '7', arg: '³√7', answer: 1 / 3, answerText: '1/3', why: '7^(1/3) = ³√7' },
  { base: '0,5', arg: '4', answer: -2, answerText: '−2', why: '0,5⁻² = 2² = 4' },
  { base: '0,5', arg: '8', answer: -3, answerText: '−3', why: '0,5⁻³ = 2³ = 8' },
  { base: '8', arg: '16', answer: 4 / 3, answerText: '4/3', why: '8^(4/3) = (∛8)⁴ = 2⁴ = 16' },
  { base: '27', arg: '9', answer: 2 / 3, answerText: '2/3', why: '27^(2/3) = (∛27)² = 9' },
  { base: '3', arg: '243', answer: 5, answerText: '5', why: '3⁵ = 243' },
  { base: '2', arg: '128', answer: 7, answerText: '7', why: '2⁷ = 128' }
];

const parseAnswer = (s: string): number => {
  const t = s.trim().replace('−', '-').replace(',', '.');
  if (t.includes('/')) {
    const [p, q] = t.split('/').map(Number);
    return q === 0 ? NaN : p / q;
  }
  return Number(t);
};

export const ExpLogPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: exponenciális folyamat két mérésből
  const [n0Text, setN0Text] = useState<string>('130300');
  const [n1Text, setN1Text] = useState<string>('132000');
  const [dt, setDt] = useState<number>(4);
  const [tAsk, setTAsk] = useState<number>(13);
  const [targetText, setTargetText] = useState<string>('140000');
  const n0 = parseNum(n0Text);
  const n1 = parseNum(n1Text);
  const target = parseNum(targetText);
  const validModel = Number.isFinite(n0) && Number.isFinite(n1) && n0 > 0 && n1 > 0 && n0 !== n1;
  const q = validModel ? Math.pow(n1 / n0, 1 / dt) : NaN;
  const nAt = validModel ? n0 * Math.pow(q, tAsk) : NaN;
  const growing = q > 1;
  const tTarget = validModel && target > 0 ? Math.log10(target / n0) / Math.log10(q) : NaN;
  const special = validModel ? (growing ? Math.log10(2) / Math.log10(q) : Math.log10(0.5) / Math.log10(q)) : NaN;

  // Labor II: logaritmus-gyakorló
  const [taskIdx, setTaskIdx] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const task = LOG_TASKS[taskIdx];
  const g = parseAnswer(guess);
  const correct = Number.isFinite(g) && Math.abs(g - task.answer) < 1e-9;
  const [score, setScore] = useState<number>(0);

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="gyakorlas-tudasproba"
      title="16. Gyakorlás, tudáspróba"
      subtitle="A III. fejezet összefoglalása: hatvány, gyök, törtkitevő, exponenciális függvények és folyamatok, logaritmus – érettségi típusú feladatokkal és két tudáspróbával."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_hatvany_gyok_logaritmus_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
      practiceSubtitle="90 kérdés 3 szinten a teljes III. fejezetből – teszteld a tudásod!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A FEJEZET LEGFONTOSABB ÖSSZEFÜGGÉSEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              a<sup>p/q</sup> = (q-adik gyök a)<sup>p</sup>   |   N(t) = N₀ · kᵗ   |   aˣ = b ⇔ x = logₐ b = lg b / lg a
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Azonosságok</strong> (a, b &gt; 0, racionális kitevők): aᵐ · aⁿ = aᵐ⁺ⁿ, aᵐ : aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ, (ab)ⁿ = aⁿbⁿ.
              </li>
              <li>
                <strong>Kamatos kamat:</strong> Aₙ = A · (1 + p/100)ⁿ; <strong>felezési idő:</strong> N(t) = N₀ · (1/2)^(t/T).
              </li>
              <li>
                <strong>Egyenlőtlenség:</strong> a &gt; 1 esetén megmarad, 0 &lt; a &lt; 1 esetén megfordul a reláció a kitevők között.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Fejezeti összefoglaló */}
      <TheorySection title="1. Fejezeti összefoglaló" badge="Áttekintés" badgeColor="indigo">
        <ChapterMapSvg className="w-full h-auto max-w-2xl mx-auto mb-4" />
        <TheoryTable
          headers={['Lecke', 'Lényeg', 'Példa']}
          rows={[
            ['1–2. Hatvány, n-edik gyök', 'a⁻ⁿ = 1/aⁿ; páros n esetén ⁿ√a csak a ≥ 0-ra', '2⁻³ = 1/8; ∛−8 = −2; ⁴√81 = 3'],
            ['3–5. Törtkitevő', 'a^(1/n) = ⁿ√a; a^(−p/q) = 1/a^(p/q)', '32^(3/5) = 8; 81^(−1/2) = 1/9'],
            ['6. Pénzügyi számítások', 'Aₙ = A · (1 + p/100)ⁿ', '200 000 · 1,1² = 242 000 Ft'],
            ['7–8. Exp. függvény, folyamat', 'x ↦ aˣ: értékkészlet ]0; ∞[; N₀ · kᵗ', 'k > 1 növekedés, 0 < k < 1 csökkenés'],
            ['9. Felezési idő', 'N₀ · (1/2)^(t/T)', '3 felezési idő után 1/8 marad'],
            ['10–13. Logaritmus', 'logₐ b = lg b / lg a', 'log₂ 8 = 3; 1,056ᵗ = 6 ⇒ t ≈ 32,9'],
            ['14–15. Egyenlőtlenség, gyakorlás', 'monotonitás alapján', '(2/3)ˣ ≤ 4/9 ⇔ x ≥ 2']
          ]}
        />
      </TheorySection>

      {/* 2. Feladat 1 */}
      <TheorySection title="2. Kidolgozott feladat: a város lakossága (1. feladat)" badge="Tankönyv 116. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              1997. január 1-jén 130 300, 2001. január 1-jén 132 000 lakosa volt a városnak; a növekedés exponenciális.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> 4 év alatt 132 000 / 130 300 ≈ 1,01305-szörös, így egy év alatt q = ⁴√(132 000 / 130 300) ≈ <strong>1,00325-szörös</strong> (évi ≈ 0,325%).
              </li>
              <li>
                <strong>b)</strong> L(t) = 130 300 · 1,00325ᵗ, pontosabban L(t) = 130 300 · (132 000 / 130 300)<sup>t/4</sup>.
              </li>
              <li>
                <strong>c)</strong> 2010. január 1-jén t = 13: L(13) ≈ <strong>135 900 lakos</strong>.
              </li>
            </ul>
          </div>
          <TownGrowthSvg />
        </div>
      </TheorySection>

      {/* 3. Feladat 2 */}
      <TheorySection title="3. Kidolgozott feladat: ólom és bizmut (2. feladat)" badge="Tankönyv 116. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> 3 mol = 3 · 6 · 10²³ = 1,8 · 10²⁴ részecske, a felezési idő 27 perc: <strong>N(t) = 1,8 · 10²⁴ · (1/2)<sup>t/27</sup></strong>.
              </li>
              <li>
                <strong>b)</strong> Kezdetben ugyanannyi (N₀) bizmut és ólom van. Az ólom tízszerese a bizmutnak, ha
                N₀ · (1/2)<sup>t/27</sup> = 10 · N₀ · (1/2)<sup>t/19,7</sup>.
              </li>
              <li>
                Átrendezve 2<sup>t/19,7 − t/27</sup> = 10, vagyis t · (1/19,7 − 1/27) = log₂ 10 ≈ 3,322, ahonnan <strong>t ≈ 242 perc</strong> (kb. 4 óra).
              </li>
            </ul>
          </div>
          <IsotopeRaceSvg />
        </div>
      </TheorySection>

      {/* 4. Feladat 3 */}
      <TheorySection title="4. Kidolgozott feladat: kólibaktériumok (3. feladat, érettségi 2013)" badge="Tankönyv 116. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> r = 2,5 · 10⁻⁷ m, m = 2 · 10⁻⁶ m. V = r²π · m ≈ <strong>3,93 · 10⁻¹⁹ m³</strong>; A = 2r²π + 2rπ · m ≈ <strong>3,53 · 10⁻¹² m²</strong>.
              </li>
              <li>
                <strong>b)</strong> 1,5 óra = 90 perc = 6 · 15 perc: B(90) = 3 000 000 · 2⁶ = <strong>192 millió</strong> baktérium.
              </li>
              <li>
                <strong>c)</strong> 3 000 000 · 2<sup>t/15</sup> = 600 000 000 ⇒ 2<sup>t/15</sup> = 200 ⇒ t = 15 · log₂ 200 = 15 · lg 200 / lg 2 ≈ 114,66, tehát kb. <strong>115 perc</strong>.
              </li>
            </ul>
          </div>
          <EcoliCylinderSvg />
        </div>
      </TheorySection>

      {/* 5. Tudáspróba I. */}
      <TheorySection title="5. Tudáspróba I. – megoldások" badge="Tudáspróba" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1–4. feladat" badge="I." badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2⁻⁴ · 4<sup>0,5</sup> = 2⁻⁴ · 2 = 2⁻³; (3<sup>1,5</sup>)² = 3³.</li>
              <li>log₃ 1 = 0; log₄ (1/2) = −1/2; 6<sup>log₆ 5</sup> = 5; 3<sup>log₃ 4</sup> = 4.</li>
              <li>log₈ k = 4/3 ⇒ k = 8<sup>4/3</sup> = 16; log₀,₅ 4 = m ⇒ m = −2; logₐ 243 = 5 ⇒ a = 3.</li>
              <li>(2/3)ˣ ≤ 4/9 = (2/3)²; az alap 1-nél kisebb ⇒ <strong>x ≥ 2</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Polónium" badge="I." badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Havonta 5,16 · 10²³ / 6 · 10²³ = 0,86-szorosára csökken.</li>
              <li>a) Fél év: 0,86⁶ ≈ 0,405, tehát kb. <strong>40,5%-ára</strong>.</li>
              <li>b) 0,86ᵗ &lt; 0,2 ⇒ t &gt; lg 0,2 / lg 0,86 ≈ 10,67 hónap.</li>
              <li>c) Felezési idő: lg 0,5 / lg 0,86 ≈ <strong>4,6 hónap</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="6. A Kovács gyerekek befektetése" badge="I." badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hajni: 50 000 · 1,08³ ≈ <strong>62 986 Ft</strong>.</li>
              <li>Csilla: 50 000 · 1,007³⁴ ≈ <strong>63 383 Ft</strong>.</li>
              <li>Csilla befektetése éri meg jobban (≈ 397 Ft-tal többet kap, rövidebb idő alatt).</li>
            </ul>
            <InvestmentCompareSvg className="w-full h-auto mt-3" />
          </TheoryCard>
          <TheoryCard title="Tudáspróba II. – megoldások" badge="II." badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3⁻⁴ · 3⁷ = 3³; (2<sup>0,5</sup>)⁸ = 2⁴; (⁴√5)³ = 5<sup>3/4</sup>.</li>
              <li>log₂ 0,5 = −1; log₇ ³√7 = 1/3; 7<sup>log₇ 4</sup> = 4; (1/3)<sup>log₃ 12</sup> = 1/12.</li>
              <li>log₂₇ k = 2/3 ⇒ k = 9; log₀,₅ 8 = −3; logₐ 128 = 7 ⇒ a = 2.</li>
              <li>0,64 &lt; 0,8ˣ ⇔ 0,8² &lt; 0,8ˣ ⇔ <strong>x &lt; 2</strong>.</li>
              <li>350 000 · 1,045ⁿ ≥ 1,3 · 350 000 ⇒ n ≥ lg 1,3 / lg 1,045 ≈ 5,96 ⇒ <strong>6 év</strong>.</li>
              <li>N(t) = 4,2 · 10²⁴ · 0,97ᵗ: N(0) = 4,2 · 10²⁴; 1 mol: 0,97ᵗ = 1/7 ⇒ t ≈ 63,9 perc; felezési idő ≈ 22,8 perc.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hibák a tudáspróbán" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="(2/3)ˣ ≤ 4/9 – merre áll a reláció?"
          wrong="(2/3)ˣ ≤ (2/3)² ⇒ x ≤ 2"
          wrongExplanation="Az x ↦ (2/3)ˣ függvény szigorúan csökkenő, ezért nagyobb kitevőhöz kisebb érték tartozik. Ellenpélda: x = 0 esetén (2/3)⁰ = 1 > 4/9."
          correct="(2/3)ˣ ≤ (2/3)² ⇔ x ≥ 2"
          correctExplanation="0 < a < 1 alap esetén a kitevők között megfordul a reláció. Ugyanígy 0,64 < 0,8ˣ ⇔ x < 2."
          tip="Más tipikus hibák: 81^(−1/2) nem −9, hanem 1/9; a „teljes évek” száma felfelé kerekítendő (5,96 → 6 év)."
        />
        <TheoryCallout type="warning" title="Kerekítés szöveges feladatban">
          Ha a kérdés „hány teljes év”, „hányadik napon”, „legalább hány perc”, akkor a logaritmussal kapott tört értéket mindig a szöveg értelmének megfelelően kerekítsd, és ellenőrizd behelyettesítéssel!
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: exponenciális modell két mérésből" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kezdeti érték N(0)</label>
              <input type="text" value={n0Text} onChange={(e) => setN0Text(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono" aria-label="kezdeti érték" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">mért érték N(Δt)</label>
              <input type="text" value={n1Text} onChange={(e) => setN1Text(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono" aria-label="mért érték" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">eltelt idő Δt = {dt}</label>
              <input type="range" min="1" max="12" value={dt} onChange={(e) => setDt(Number(e.target.value))} className="w-full accent-violet-600" aria-label="eltelt idő" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kérdezett időpont t = {tAsk}</label>
              <input type="range" min="0" max="60" value={tAsk} onChange={(e) => setTAsk(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="kérdezett időpont" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">célérték</label>
              <input type="text" value={targetText} onChange={(e) => setTargetText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono" aria-label="célérték" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { lab: 'Város (1. feladat)', a: '130300', b: '132000', d: 4, t: 13, g: '140000' },
              { lab: 'Polónium (TP I. 5.)', a: '6', b: '5,16', d: 1, t: 6, g: '1,2' },
              { lab: 'Kólibaktérium (15 perc)', a: '3000000', b: '6000000', d: 1, t: 6, g: '600000000' }
            ].map((p) => (
              <button
                key={p.lab}
                onClick={() => {
                  setN0Text(p.a);
                  setN1Text(p.b);
                  setDt(p.d);
                  setTAsk(p.t);
                  setTargetText(p.g);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
              >
                {p.lab}
              </button>
            ))}
          </div>
          {!validModel ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">
              Adj meg két különböző pozitív mérési eredményt!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
                <div className="font-bold text-violet-800">A modell</div>
                <div>
                  q = (N(Δt) / N(0))<sup>1/{dt}</sup> ≈ <strong>{fmt(q, 5)}</strong> ({growing ? 'növekedés' : 'csökkenés'})
                </div>
                <div>
                  N(t) = {fmt(n0, 4)} · {fmt(q, 5)}ᵗ
                </div>
                <div>
                  N({tAsk}) ≈ <strong>{fmt(nAt, 2)}</strong>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-1">
                <div className="font-bold text-amber-800">Logaritmussal</div>
                <div>
                  {growing ? 'duplázódási' : 'felezési'} idő: {growing ? 'lg 2' : 'lg 0,5'} / lg {fmt(q, 5)} ≈ <strong>{fmt(special, 2)}</strong>
                </div>
                <div>
                  N(t) = {targetText} ⇒ t = lg({targetText} / {n0Text}) / lg {fmt(q, 5)} ≈ <strong>{fmt(tTarget, 2)}</strong>
                </div>
                {Number.isFinite(tTarget) && tTarget < 0 && <div className="text-xs text-amber-700">Negatív idő: a célértéket a modell szerint a kezdés előtt érte el.</div>}
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: logaritmus-gyakorló (tudáspróba 2–3. feladat)" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-emerald-800">
              {taskIdx + 1}. feladat / {LOG_TASKS.length}
            </span>
            <span className="text-slate-600">Helyes válaszok: {score}</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono text-center">
            log<sub>{task.base}</sub> {task.arg} = ?
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <input
              type="text"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                setChecked(false);
              }}
              placeholder="pl. −1/2 vagy 3"
              className="px-3 py-2 rounded-lg border border-emerald-200 font-mono w-40"
              aria-label="válasz"
            />
            <button
              onClick={() => {
                if (!checked && correct) setScore((s) => s + 1);
                setChecked(true);
              }}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white"
            >
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setTaskIdx((i) => (i + 1) % LOG_TASKS.length);
                setGuess('');
                setChecked(false);
              }}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-100 text-emerald-800"
            >
              Következő feladat
            </button>
          </div>
          {checked && (
            <div className={`rounded-xl border p-4 text-sm ${correct ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
              {correct ? 'Helyes! ' : `Nem jó. A helyes érték: ${task.answerText}. `}
              Indoklás: {task.why}.
            </div>
          )}
          <TheoryCallout type="tip" title="Hogyan gondolkodj?">
            logₐ b az a kitevő, amelyre a-t emelve b-t kapunk. Írd fel a-t és b-t ugyanannak a számnak a hatványaként (pl. 8 = 2³, 16 = 2⁴ ⇒ log₈ 16 = 4/3).
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ExpLogPracticeExamTheory;
