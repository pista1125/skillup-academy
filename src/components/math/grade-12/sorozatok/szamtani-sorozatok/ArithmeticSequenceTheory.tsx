import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SeqPlot, fmt } from './seqKit';
import { GrainTrendSvg, ArithmeticChainSvg, PiggyBankSvg, HexRingsSvg, TwoTermsSvg } from './ArithmeticSequenceFigures';

const numIn = 'w-20 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';

export const ArithmeticSequenceTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [a1, setA1] = useState<number>(5);
  const [d, setD] = useState<number>(3);
  const [n, setN] = useState<number>(10);
  const [target, setTarget] = useState<number>(50);
  // Labor II
  const [k, setK] = useState<number>(28);
  const [ak, setAk] = useState<number>(96);
  const [m, setM] = useState<number>(32);
  const [am, setAm] = useState<number>(112);

  const terms = useMemo(() => Array.from({ length: 12 }, (_, i) => a1 + i * d), [a1, d]);
  const an = a1 + (n - 1) * d;
  const idx = d === 0 ? NaN : (target - a1) / d + 1;
  const idxOk = d === 0 ? target === a1 : Number.isInteger(Math.round(idx * 1e9) / 1e9) && idx >= 1;

  const valid = Number.isFinite(k) && Number.isFinite(m) && k >= 1 && m >= 1 && k !== m;
  const dd = valid ? (am - ak) / (m - k) : NaN;
  const a1b = valid ? ak - (k - 1) * dd : NaN;
  const two = useMemo(() => (valid ? Array.from({ length: 8 }, (_, i) => a1b + i * dd) : []), [valid, a1b, dd]);

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="szamtani-sorozatok"
      title="3. Számtani sorozatok"
      subtitle="A gabonatermelés trendjétől a hatszöges burkolásig: a differencia, az n-edik tag képlete és a szimmetrikus jelölés."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_szamtani_sorozatok_tananyag.pdf"
      practiceTitle="Készen állsz a számtani sorozatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZÁMTANI SOROZAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">aₙ = a₁ + (n − 1)d</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Számtani sorozat:</strong> a második tagtól kezdve aₙ − aₙ₋₁ = d állandó (differencia).
              </li>
              <li>Két tag (a sorszámukkal együtt) egyértelműen meghatározza a sorozatot: aₘ − aₖ = (m − k)d.</li>
              <li>Három egymást követő tag szimmetrikusan: a − d; a; a + d (összegük 3a).</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a világ gabonatermelése" badge="Tankönyv 56. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A világ gabonatermelése 1960 és 2010 között évente átlagosan körülbelül <strong>27 millió tonnával</strong> nőtt; 1960-ban kb. <strong>824 millió tonna</strong> volt.
            </p>
            <p>
              A folyamatot egy olyan sorozattal modellezhetjük, amelynek első tagja 824, és minden tag 27-tel nagyobb az előzőnél: 824; 851; 878; … Az ilyen sorozatokban az egymás utáni tagok különbsége, aₙ − aₙ₋₁, állandó.
            </p>
            <p>A valódi termelési adatok kissé eltérnek ettől a trendtől – a modell csak a „számtanisorozat-szerű” növekedést írja le.</p>
          </div>
          <GrainTrendSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. A számtani sorozat" badge="Elmélet" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Definíció:</strong> az {'{aₙ}'} sorozat <strong>számtani sorozat</strong>, ha a második tagtól kezdve bármely tag és az előtte álló tag különbsége állandó, vagyis n &gt; 1 esetén aₙ − aₙ₋₁ értéke állandó.
            </p>
            <p>
              Ez az állandó a sorozat <strong>differenciája</strong> (különbsége), jele: <strong>d</strong>.
            </p>
            <p>
              Az n-edik tagot megkapjuk, ha az előtte álló taghoz d-t adunk, vagy ha az első taghoz (n − 1)-szer adjuk hozzá d-t: <strong>aₙ = a₁ + (n − 1)d</strong>.
            </p>
            <TheoryCallout type="info" title="Két tag elég">
              Ha ismert két tag és a sorszámuk, a sorozat egyértelmű. Pl. a₁₂ = 40, a₁₅ = 46 ⇒ a₁₅ − a₁₂ = 3d ⇒ 46 − 40 = 3d ⇒ d = 2.
            </TheoryCallout>
          </div>
          <ArithmeticChainSvg />
        </div>
        <TheoryCallout type="tip" title="Szimmetrikus jelölés">
          Ha egy feladatban egy számtani sorozat három egymást követő tagja szerepel, érdemes így jelölni őket: a − d; a; a + d. Összegük 3a, és a középső tag a két szomszéd számtani közepe: a = ((a − d) + (a + d))/2.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: Tibor perselye" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Tibor január 1-jétől minden hónapban 100 Ft-tal többet tesz a perselyébe, mint az előző hónapban. Április–június között összesen 8100 Ft-ot tett be. Mennyit tett be januárban?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Legyen a májusi összeg c Ft. Ekkor az áprilisi c − 100, a júniusi c + 100 (szimmetrikus jelölés).</li>
              <li>(c − 100) + c + (c + 100) = 3c = 8100 ⇒ c = 2700.</li>
              <li>A januári összeg 4 hónappal korábbi: 2700 − 4 · 100 = <strong>2300 Ft</strong>.</li>
              <li>Ellenőrzés: 2300; 2400; 2500; 2600; 2700; 2800 – az utolsó három összege 8100 Ft ✓.</li>
            </ol>
          </div>
          <PiggyBankSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Megoldott feladatok a leckéből" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A 33-nál nagyobb páros számok" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁ = 34, d = 2.</li>
              <li>a₇₇ = 34 + 76 · 2 = <strong>186</strong>.</li>
              <li>1948 = 34 + (n − 1) · 2 ⇒ n − 1 = 957 ⇒ <strong>n = 958</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Három szomszédos tag" badge="2–3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁₀ + a₁₁ + a₁₂ = 63 ⇒ 3a₁₁ = 63 ⇒ a₁₁ = 21; d = 5 esetén a₁ = 21 − 10 · 5 = −29; d = 7 esetén a₁₀ = 14, a₁₂ = 28.</li>
              <li>a₁₁ = (a₁₀ + a₁₂)/2 bármely d-re, mert a₁₀ = a₁₁ − d és a₁₂ = a₁₁ + d.</li>
              <li>b₇ − b₁ = 6d = 24 ⇒ d = 4; b₇ + b₁ = 4 ⇒ b₁ = −10, b₇ = 14, b₄ = 2.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Hatszöglapos főtér" badge="4. feladat" badgeColor="emerald">
            <HexRingsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A körök lapszáma 6; 12; 18; … számtani sorozat, a₁ = 6, d = 6, aₖ = 6k.</li>
              <li>A 12. körben 72 lap van; a 20. körben 6 · 5 = 30-cal több, mint a 15.-ben.</li>
              <li>6k &lt; 100 ⇒ k ≤ 16: 16 szín kell 100-nál kevesebb lapból.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Két tagból, összegekből" badge="5–6. feladat, HF" badgeColor="rose">
            <TwoTermsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₂₈ = 96, a₃₂ = 112 ⇒ d = 4, a₁ = −12; 192 = −12 + (n − 1) · 4 ⇒ n = 52.</li>
              <li>(Érettségi, 2022) a₁ + a₂ + a₃ = 18 ⇒ a₂ = 6; (a₃ + a₄) − (a₁ + a₂) = 4d = 28 ⇒ d = 7, a₁ = −1.</li>
              <li>(Érettségi, 2017) Strand: 165 liter az első 3 napon ⇒ a₂ = 55; a₁₅ = 198 ⇒ 13d = 143, d = 11; a₃₁ = 44 + 30 · 11 = 374 liter.</li>
              <li>HF: 5 és 8 közé 4 szám: 5d = 3, d = 0,6 (5,6; 6,2; 6,8; 7,4). 37k + 3 alakú négyjegyűek: 1002-től 9993-ig, 244 darab. a₅ + a₆ = 60, a₈ + a₉ + a₁₀ = 69 ⇒ a₁ = 39, d = −2.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: n vagy n − 1?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az első tagtól az n-edikig n − 1 lépés van"
          wrong="aₙ = a₁ + n · d, tehát a 33-nál nagyobb párosok 77. tagja 34 + 77 · 2 = 188."
          wrongExplanation="Az a₁-hez még nem adtunk hozzá d-t; a₂-ig 1 lépés, a₇₇-ig 76 lépés van."
          correct="aₙ = a₁ + (n − 1)d: a₇₇ = 34 + 76 · 2 = 186."
          correctExplanation="Ugyanígy két tag között: aₘ − aₖ = (m − k)d, pl. a₁₅ − a₁₂ = 3d (nem 15d vagy 12d)."
          tip="Ellenőrizd a képletet n = 1-re: a₁ + 0 · d = a₁ ✓."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: a₁ és d csúszka" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Első tag: a₁ = {fmt(a1)}</label>
                <input type="range" min="-20" max="20" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full accent-blue-600" aria-label="a1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Differencia: d = {fmt(d)}</label>
                <input type="range" min="-6" max="6" step="0.5" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="d" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sorszám: n = {n}</label>
                <input type="range" min="1" max="100" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-rose-600" aria-label="n" />
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900">
                <div className="font-mono">
                  aₙ = {fmt(a1)} + ({n} − 1) · {fmt(d)} = <strong>{fmt(an)}</strong>
                </div>
                <div className="text-xs mt-1 text-slate-600">
                  {d > 0 ? 'd > 0: a sorozat (szigorúan) növő' : d < 0 ? 'd < 0: a sorozat (szigorúan) csökkenő' : 'd = 0: konstans sorozat'}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Hányadik tag a</span>
                <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className={numIn} aria-label="keresett érték" />
                <span>?</span>
              </div>
              <div className="text-sm font-bold text-purple-800">
                {d === 0
                  ? idxOk
                    ? 'Minden tag ennyi.'
                    : 'Nem tagja a sorozatnak.'
                  : idxOk
                    ? `(${fmt(target)} − ${fmt(a1)}) / ${fmt(d)} + 1 = ${fmt(idx)}: a ${fmt(idx)}. tag.`
                    : `(${fmt(target)} − ${fmt(a1)}) / ${fmt(d)} + 1 = ${fmt(idx, 3)} – nem pozitív egész, tehát nem tagja.`}
              </div>
            </div>
            <SeqPlot values={terms} highlight={n <= 12 ? [n - 1] : []} className="w-full max-w-md h-auto mx-auto" w={320} h={210} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Két tagból a sorozat" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span>a</span>
                <input type="number" min="1" value={k} onChange={(e) => setK(Math.round(Number(e.target.value)))} className={numIn} aria-label="k" />
                <span>=</span>
                <input type="number" value={ak} onChange={(e) => setAk(Number(e.target.value))} className={numIn} aria-label="ak" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>a</span>
                <input type="number" min="1" value={m} onChange={(e) => setM(Math.round(Number(e.target.value)))} className={numIn} aria-label="m" />
                <span>=</span>
                <input type="number" value={am} onChange={(e) => setAm(Number(e.target.value))} className={numIn} aria-label="am" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'a₁₂ = 40, a₁₅ = 46', v: [12, 40, 15, 46] },
                  { t: 'a₂₈ = 96, a₃₂ = 112', v: [28, 96, 32, 112] },
                  { t: 'Strand: a₂ = 55, a₁₅ = 198', v: [2, 55, 15, 198] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setK(p.v[0]);
                      setAk(p.v[1]);
                      setM(p.v[2]);
                      setAm(p.v[3]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              {valid ? (
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                  <div>
                    aₘ − aₖ = (m − k)d ⇒ {fmt(am)} − {fmt(ak)} = {m - k} · d ⇒ <strong>d = {fmt(dd, 4)}</strong>
                  </div>
                  <div>
                    a₁ = aₖ − (k − 1)d = <strong>{fmt(a1b, 4)}</strong>
                  </div>
                  <div className="text-xs text-slate-600 break-words">Első tagok: {two.map((v) => fmt(v, 3)).join('; ')}; …</div>
                </div>
              ) : (
                <div className="text-rose-700 font-bold">Adj meg két különböző, pozitív egész sorszámot!</div>
              )}
            </div>
            {valid && <SeqPlot values={two} className="w-full max-w-md h-auto mx-auto" w={320} h={210} />}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ArithmeticSequenceTheory;
