import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SeqPlot, fmt } from './seqKit';
import { NestedSquaresSvg, GeometricChainSvg, QuotientTypesSvg, TwoSolutionsSvg, ForestDeclineSvg, nestedSquares } from './GeometricSequenceFigures';

const SQ_FILL = ['#dbeafe', '#e0e7ff', '#ede9fe', '#fae8ff', '#fce7f3', '#ffe4e6', '#fef3c7', '#dcfce7', '#cffafe', '#f1f5f9'];

export const GeometricSequenceTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [a1, setA1] = useState<number>(1);
  const [q, setQ] = useState<number>(1.5);
  // Labor II
  const [side, setSide] = useState<number>(8);
  const [steps, setSteps] = useState<number>(4);

  const qq = Math.abs(q) < 1e-9 ? 0.1 : q;
  const terms = useMemo(() => Array.from({ length: 10 }, (_, i) => a1 * qq ** i), [a1, qq]);
  const kind =
    qq === 1
      ? 'konstans sorozat (q = 1)'
      : qq < 0
        ? 'váltakozó előjelű sorozat (q < 0)'
        : (qq > 1 && a1 > 0) || (qq < 1 && a1 < 0)
          ? 'szigorúan növő sorozat'
          : 'szigorúan csökkenő sorozat';

  const squares = useMemo(() => nestedSquares([[20, 220], [220, 220], [220, 20], [20, 20]], steps), [steps]);
  const rows = Array.from({ length: steps }, (_, i) => {
    const a = side * (1 / Math.SQRT2) ** i;
    return [String(i + 1), fmt(a, 3), fmt(4 * a, 3), fmt(a * a, 3)];
  });

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="mertani-sorozatok"
      title="5. Mértani sorozatok"
      subtitle="Egymásba írt négyzetektől a kamatos kamatig: a kvóciens, az n-edik tag képlete és a két megoldás esete."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_mertani_sorozatok_tananyag.pdf"
      practiceTitle="Készen állsz a mértani sorozatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MÉRTANI SOROZAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">aₙ = a₁ · qⁿ⁻¹</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Mértani sorozat:</strong> a második tagtól kezdve aₙ/aₙ₋₁ = q állandó és 0-tól különböző (kvóciens, hányados).
              </li>
              <li>Egyik tag és a kvóciens sem lehet 0.</li>
              <li>Két ismert tagból aₘ/aₖ = qᵐ⁻ᵏ – páros kitevőnél két megoldás is lehet (q és −q).</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: egymásba írt négyzetek" badge="Tankönyv 60. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy 8 cm oldalú négyzet oldalfelező pontjait sorban összekötjük; a kapott alakzat a középpont körüli 90°-os forgatással önmagába megy át, tehát négyzet. Az eljárást folytatjuk. Mennyi a 4., illetve az n-edik négyzet kerülete és területe?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                A sarokháromszög derékszögű, befogói a₁/2: Pitagorasz-tétellel a₂² = (a₁/2)² + (a₁/2)² = a₁²/2, így a₂ = a₁/√2. A hasonlóság aránya <strong>m = 1/√2</strong>.
              </li>
              <li>Bármely két egymás utáni négyzet aránya ugyanennyi: az oldalak egymás utáni hányadosa állandó.</li>
              <li>A kerületek aránya is m, a területeké m² = 1/2 (a beírt négyzet területe fele az eredetinek).</li>
              <li>a₁ = 8, K₁ = 32, T₁ = 64 (cm, cm²). Lépésenként: a₂ = m · a₁, a₃ = m² · a₁, a₄ = m³ · a₁; T₂ = m² · T₁, T₃ = m⁴ · T₁, T₄ = m⁶ · T₁.</li>
              <li>
                A 4. négyzet: a₄ = 8/(2√2) = 2√2 cm, K₄ = 8√2 ≈ <strong>11,31 cm</strong>, T₄ = 64/8 = <strong>8 cm²</strong>.
              </li>
              <li>
                Az n-edik négyzet: aₙ = mⁿ⁻¹ · a₁, Kₙ = mⁿ⁻¹ · K₁, Tₙ = (m²)ⁿ⁻¹ · T₁ = 64 · (1/2)ⁿ⁻¹.
              </li>
            </ol>
          </div>
          <NestedSquaresSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. A mértani sorozat" badge="Elmélet" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Definíció:</strong> az {'{aₙ}'} sorozat <strong>mértani sorozat</strong>, ha a második tagtól kezdve bármely tag és az előtte álló tag hányadosa 0-tól különböző állandó, vagyis n &gt; 1 esetén aₙ/aₙ₋₁ értéke állandó.
            </p>
            <p>
              Ez az állandó a sorozat <strong>kvóciense</strong> (hányadosa), jele: <strong>q</strong>.
            </p>
            <p>
              Az n-edik tagot megkapjuk, ha az előtte álló tagot q-val szorozzuk, vagy ha az első tagot a kvóciens (n − 1)-edik hatványával szorozzuk: <strong>aₙ = a₁ · qⁿ⁻¹</strong>.
            </p>
            <p>A mértani sorozatnak tehát semelyik tagja és a kvóciense sem lehet 0.</p>
          </div>
          <GeometricChainSvg />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TwoSolutionsSvg />
          <TheoryCallout type="warning" title="Két megoldás is lehet">
            Ha ismert két tag és a sorszámuk, lehetséges, hogy a feladatnak két megoldása van. Pl. a₁₂ = 10, a₁₄ = 40 ⇒ a₁₄/a₁₂ = q² = 4 ⇒ q = 2 vagy q = −2. (Páratlan kitevőnél, pl. q³ = 27, csak egy valós megoldás van: q = 3.)
          </TheoryCallout>
        </div>
        <QuotientTypesSvg />
      </TheorySection>

      <TheorySection title="3. Alkalmazások: kamatos kamat, fogyó erdő, értékcsökkenés" badge="Feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Zoltán betétje" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>3 millió Ft kamatos kamatra, évi 3,5%: minden évben 1,035-szörösére nő (q = 1,035).</li>
              <li>
                6 év múlva: 3 000 000 · 1,035⁶ ≈ <strong>3 687 766 Ft</strong>.
              </li>
              <li>
                Ha 6 év múlva 3 840 000 Ft lesz: q⁶ = 1,28 ⇒ q = ⁶√1,28 ≈ 1,0420, az éves kamat ≈ <strong>4,2%</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Az erdő faállománya" badge="2. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Évente 2%-kal csökken: q = 0,98; 2010-ben 12 000 m³.</li>
              <li>2005-ben: 12 000/0,98⁵ ≈ 13 275 m³; 2020-ban: 12 000 · 0,98¹⁰ ≈ 9805 m³.</li>
              <li>12 000 · 0,98ᵏ &lt; 10 500 először k = 7-re (≈ 10 418 m³): <strong>2017-ben</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <ForestDeclineSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Tagokból a kvóciens" badge="3–5. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁ = 7, a₄ = 189 ⇒ q³ = 27, q = 3, a₆ = 1701; a₄ = −0,875 ⇒ q³ = −0,125, q = −0,5, a₆ = −0,21875.</li>
              <li>a₂ = 1600, a₄ = 4 ⇒ q² = 1/400 ⇒ q = 1/20 vagy −1/20; a₁ = 32 000 vagy −32 000.</li>
              <li>a₁ = 8, a₂ + a₃ = 16 ⇒ 8q + 8q² = 16 ⇒ q² + q − 2 = 0 ⇒ q = 1 vagy −2 ⇒ a₄ = 8 vagy −64.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) A gép értékcsökkenése" badge="6. feladat, HF" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>21,5 millió Ft, évente 15%-kal csökken (q = 0,85); a₁ a 2021-es érték, így 3 év múlva a₄ = 21,5 · 0,85³ ≈ 13,2 millió Ft.</li>
              <li>Eladják, ha 0,85ⁿ &lt; 0,45: 0,85⁴ ≈ 0,522, 0,85⁵ ≈ 0,444 ⇒ 5 év múlva, <strong>2026-ban</strong> – ehhez a 21,5 millió nem is kell.</li>
              <li>HF: a₃ = 32, a₆ = 108 ⇒ q = 1,5; az 1 000 000-nál kisebb tagok száma 28.</li>
              <li>HF: a₁ = 10²³, q = 0,001 ⇒ aₙ = 10²⁶⁻³ⁿ; a 100 a 8. tag; 10¹⁰-nél nagyobb tag 5 van.</li>
              <li>HF: a₁ = 4, a₃ = −16 ⇒ q² = −4: nincs ilyen sorozat; a₂ = 9, a₄ = 81 ⇒ q = ±3: két megoldás.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: elveszett negatív kvóciens" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="q² = 4-ből nem csak q = 2 következik"
          wrong="a₁₂ = 10, a₁₄ = 40 ⇒ q = 2, tehát a₁₃ = 20."
          wrongExplanation="A q² = 4 egyenletnek a −2 is megoldása; ekkor a₁₃ = −20, és a₁₄ = (−20) · (−2) = 40 is teljesül."
          correct="q = 2 vagy q = −2 – két sorozat is megfelel a feltételeknek."
          correctExplanation="Páros kitevős egyenletnél mindig vizsgáld a negatív gyököt is; páratlan kitevőnél egy valós gyök van."
          tip="Másik gyakori hiba: aₙ = a₁ · qⁿ. Ellenőrizd n = 1-re: a₁ · q⁰ = a₁ ✓."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: q-csúszka" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Első tag: a₁ = {fmt(a1)}</label>
                <input type="range" min="-5" max="5" step="0.5" value={a1} onChange={(e) => setA1(Number(e.target.value) === 0 ? 0.5 : Number(e.target.value))} className="w-full accent-blue-600" aria-label="a1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kvóciens: q = {fmt(qq)}</label>
                <input type="range" min="-2" max="2" step="0.1" value={qq} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-rose-600" aria-label="q" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'növő (q = 1,5)', v: [1, 1.5] },
                  { t: 'csökkenő (q = 0,5)', v: [8, 0.5] },
                  { t: 'alternáló (q = −2)', v: [1, -2] },
                  { t: 'négyzetek (q ≈ 1/√2 ≈ 0,7)', v: [8, 0.7] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setA1(p.v[0]);
                      setQ(p.v[1]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900">
                <div className="font-bold">{kind}</div>
                <div className="text-xs mt-1">aₙ = {fmt(a1)} · {fmt(qq)}ⁿ⁻¹ · a₁₀ = {fmt(terms[9], 4)}</div>
                <div className="text-xs text-slate-600 mt-2 break-words">Tagok: {terms.map((v) => fmt(v, 3)).join('; ')}; …</div>
              </div>
              <p className="text-xs text-slate-500">A q = 0 nem megengedett – a csúszka ilyenkor 0,1-et használ.</p>
            </div>
            <SeqPlot values={terms} className="w-full max-w-md h-auto mx-auto" w={320} h={210} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: „Rajzolj bele még egyet!”" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Az első négyzet oldala: a₁ = {side} cm</label>
                <input type="range" min="2" max="20" value={side} onChange={(e) => setSide(Number(e.target.value))} className="w-full accent-purple-600" aria-label="oldal" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Négyzetek száma: {steps}</label>
                <input type="range" min="1" max="10" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="négyzetek" />
              </div>
              <TheoryTable headers={['n', 'aₙ (cm)', 'Kₙ (cm)', 'Tₙ (cm²)']} rows={rows} />
              <div className="text-xs text-slate-600">Oldal és kerület hányadosa: 1/√2 ≈ 0,707; a területeké: 1/2.</div>
            </div>
            <svg viewBox="0 0 240 240" className="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="238" height="238" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              {squares.map((s, i) => (
                <polygon key={i} points={s.map((p) => p.join(',')).join(' ')} fill={SQ_FILL[i]} stroke="#6d28d9" strokeWidth={i === 0 ? 2 : 1.2} />
              ))}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometricSequenceTheory;
