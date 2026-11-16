import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { EpidemicBarsSvg, SumDerivationSvg, ChessboardWheatSvg, FamilyTreeSvg, ScarfGrowthSvg } from './GeometricSumFigures';
import { SeqBarChart, SText, fmtHu, S_BLUE, S_GREEN } from './seqKit';

const geoSum = (a1: number, q: number, n: number) => (q === 1 ? n * a1 : (a1 * (q ** n - 1)) / (q - 1));

export const GeometricSumTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: összegképlet vs. tagok összeadása
  const [a1, setA1] = useState<number>(3);
  const [q, setQ] = useState<number>(2);
  const [n, setN] = useState<number>(6);
  // Labor II: sakktábla
  const [k, setK] = useState<number>(10);

  const terms = useMemo(() => Array.from({ length: n }, (_, i) => a1 * q ** i), [a1, q, n]);
  const partial = useMemo(() => terms.map((_, i) => terms.slice(0, i + 1).reduce((s, t) => s + t, 0)), [terms]);
  const direct = partial[partial.length - 1] ?? 0;
  const formula = geoSum(a1, q, n);

  const grains = 2 ** k - 1;
  const onSquare = 2 ** (k - 1);
  const tons = (grains * 0.038) / 1e6; // ≈ 0,038 g egy búzaszem

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="a-mertani-sorozat-elso-n-tagjanak-osszege"
      title="6. A mértani sorozat első n tagjának összege"
      subtitle="Egy járvány lecsengésétől a sakktábla búzaszemeiig: az Sₙ összegképlet levezetése és alkalmazásai."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_mertani_sorozat_osszege_tananyag.pdf"
      practiceTitle="Készen állsz a mértani összegekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MÉRTANI SOROZAT ÖSSZEGE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                q ≠ 1: Sₙ = a₁ · (qⁿ − 1) / (q − 1) · q = 1: Sₙ = n · a₁
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Sₙ = a₁ + a₁q + a₁q² + … + a₁qⁿ⁻¹ – az utolsó tagban a kitevő n − 1, a képletben n.</li>
              <li>Levezetés: q · Sₙ − Sₙ = a₁qⁿ − a₁ (a közbülső tagok kiesnek).</li>
              <li>Ha n az ismeretlen, a qⁿ = … egyenletet logaritmussal oldjuk meg.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: egy járvány csökkenő fázisa" badge="Tankönyv 62. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy modell szerint az új megbetegedések száma mindennap az előző napi szám <strong>90%-a</strong>. A hónap első napján 600 új megbetegedés van. Összesen
              hányan betegednek meg az első 20 nap alatt?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mértani sorozat: a₁ = 600, q = 0,9. Keressük: S₂₀ = 600 + 0,9 · 600 + … + 0,9¹⁹ · 600.</li>
              <li>0,9 · S₂₀ = 0,9 · 600 + 0,9² · 600 + … + 0,9²⁰ · 600 – nagyon hasonló!</li>
              <li>A különbségben csak két tag marad: 0,9 · S₂₀ − S₂₀ = 0,9²⁰ · 600 − 600.</li>
              <li>
                S₂₀ · (0,9 − 1) = 600 · (0,9²⁰ − 1) ⇒ S₂₀ = 600 · (0,9²⁰ − 1) / (0,9 − 1) ≈ <strong>5271</strong>.
              </li>
            </ul>
            <p>Tehát a modell szerint 20 nap alatt összesen kb. 5271 megbetegedés történik.</p>
          </div>
          <EpidemicBarsSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Elmélet: a mértani sorozat első n tagjának összege" badge="Elmélet" badgeColor="violet">
        <SumDerivationSvg />
        <TheoryTable
          headers={['Eset', 'Összeg', 'Indoklás']}
          rows={[
            ['q = 1', 'Sₙ = n · a₁', 'minden tag egyenlő az első taggal'],
            ['q ≠ 1', 'Sₙ = a₁ · (qⁿ − 1) / (q − 1)', 'q · Sₙ − Sₙ = qⁿ · a₁ − a₁, majd osztunk (q − 1)-gyel'],
            ['0 < q < 1 (kényelmesebb alak)', 'Sₙ = a₁ · (1 − qⁿ) / (1 − q)', 'számlálót és nevezőt is −1-gyel szoroztuk']
          ]}
        />
        <TheoryCallout type="info" title="Bizonyítás lépésekben">
          Sₙ = a₁ + q·a₁ + q²·a₁ + … + qⁿ⁻¹·a₁ és q·Sₙ = q·a₁ + q²·a₁ + … + qⁿ·a₁. Kivonva: q·Sₙ − Sₙ = qⁿ·a₁ − a₁, azaz Sₙ(q − 1) = a₁(qⁿ − 1). Mivel q ≠ 1, oszthatunk
          (q − 1)-gyel: Sₙ = a₁ · (qⁿ − 1) / (q − 1).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Első tag 18, második tag 27" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>q = 27 / 18 = 1,5.</li>
              <li>S₄ = 18 · (1,5⁴ − 1) / 0,5 = 18 + 27 + 40,5 + 60,75 = <strong>146,25</strong>.</li>
              <li>S₁₀ = 18 · (1,5¹⁰ − 1) / 0,5 ≈ <strong>2039,94</strong>; S₂₅ ≈ <strong>909 006,06</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Első tag 49, kvóciens −1" badge="2. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A tagok: 49; −49; 49; −49; … – két szomszédos tag összege 0.</li>
              <li>S₅ = 49, S₁₀ = 0, S₇₉ = 49 (páratlan sok tagnál egy 49 „megmarad”).</li>
              <li>Képlettel: Sₙ = 49 · ((−1)ⁿ − 1) / (−2).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Családfakutatás 10 generációra" badge="3. feladat" badgeColor="emerald">
            <FamilyTreeSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>2 szülő, 4 nagyszülő, 8 dédszülő, … a 10. generációban 2¹⁰ = 1024 ős.</li>
              <li>
                Összesen: S₁₀ = 2 · (2¹⁰ − 1) / (2 − 1) = <strong>2046</strong> őst kellene felkutatni.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Ismeretlen tagszám és két megoldás" badge="4–5. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                a₁ = 2, q = 3, Sₙ = 177 146: 2 · (3ⁿ − 1) / 2 = 177 146 ⇒ 3ⁿ = 177 147 = 3¹¹ ⇒ <strong>n = 11</strong>.
              </li>
              <li>a₂ = 20, a₄ = 500 ⇒ q² = 25, q = 5 vagy q = −5.</li>
              <li>
                q = 5: a₁ = 4, S₆ = 4 · (5⁶ − 1) / 4 = <strong>15 624</strong>; q = −5: a₁ = −4, S₆ = −4 · (5⁶ − 1) / (−6) = <strong>10 416</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="E) Szabó nagymama sála (érettségi feladat, 2007)" badge="6. feladat" badgeColor="teal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <ScarfGrowthSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Az első nap 8 cm, utána mindennap 20%-kal több: a₁ = 8, q = 1,2. A sál 2 m = 200 cm.</li>
              <li>8 · (1,2ⁿ − 1) / 0,2 ≥ 200 ⇒ 1,2ⁿ ≥ 6 ⇒ n ≥ lg 6 / lg 1,2 ≈ 9,83.</li>
              <li>
                Ellenőrzés: S₉ ≈ 166,4 cm, S₁₀ ≈ 207,7 cm, tehát a sál a <strong>10. napon</strong> készült el.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCard title="F) Hiányzó adatok táblázata" badge="Házi feladat 1." badgeColor="sky">
          <TheoryTable
            headers={['', 'a₁', 'q', 'n', 'aₙ', 'Sₙ']}
            rows={[
              ['a)', '1', '2', '11', '1024', '2047'],
              ['b)', '2,4', '5', '4', '300', '374,4'],
              ['c)', '512', '0,5', '10', '1', '1023']
            ]}
          />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mt-2">
            <li>a) 2ⁿ⁻¹ = 1024 = 2¹⁰ ⇒ n = 11; S₁₁ = 2¹¹ − 1 = 2047.</li>
            <li>b) a₄ = a₁ · 5³ = 300 ⇒ a₁ = 2,4; S₄ = 2,4 · (5⁴ − 1)/4 = 374,4.</li>
            <li>c) 512 · (1 − 0,5ⁿ)/0,5 = 1023 ⇒ 0,5ⁿ = 1/1024 ⇒ n = 10, a₁₀ = 512 · 0,5⁹ = 1.</li>
          </ul>
        </TheoryCard>
        <TheoryCallout type="tip" title="Csökkenő folyamatok (házi feladatok)">
          120 kg-os ember hetente súlyának 1,5%-át adja le: 5 hét alatt 1,8 + 1,773 + … = 1,8 · (1 − 0,985⁵) / 0,015 ≈ 8,73 kg-ot fogy (ugyanennyi: 120 − 120 · 0,985⁵). 85
          kg-ra 120 · 0,985ⁿ ≤ 85 ⇒ n ≥ 22,8, azaz a 23. hét végén lesz.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Ráadás: egy megfizethetetlen játék" badge="Tankönyv 63. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ChessboardWheatSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A legenda szerint a sakkot feltaláló bölcs, Sissa ibn Dahir azt kérte jutalmul, hogy a sakktábla első mezőjére 1 búzaszemet tegyenek, a másodikra 2-t, a
              harmadikra 4-et, és így tovább, minden mezőre kétszer annyit, mint az előzőre.
            </p>
            <p>
              Az 1 + 2 + 4 + … + 2⁶³ összeg egy mértani sorozat első 64 tagjának összege: S₆₄ = 2⁶⁴ − 1 ≈ <strong>1,84 · 10¹⁹</strong> búzaszem. Ez kb. 700 milliárd tonna
              búza, nagyjából 1000-szerese az egész Föld éves búzatermésének.
            </p>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: n vagy n − 1 a kitevőben?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az összegképletben qⁿ áll, nem qⁿ⁻¹"
          wrong="S₅ = 3 · (2⁴ − 1) / (2 − 1) = 45, ha a₁ = 3, q = 2."
          wrongExplanation="Az n-edik tag képletéből (aₙ = a₁qⁿ⁻¹) átvett kitevő hibás: így csak az első 4 tag összegét kapjuk meg. Ellenőrzés: 3 + 6 + 12 + 24 + 48 = 93."
          correct="S₅ = 3 · (2⁵ − 1) / (2 − 1) = 3 · 31 = 93."
          correctExplanation="Sₙ képletében a kitevő a tagok száma (n). Ha a q < 1, a számláló és a nevező is negatív – ez nem hiba, a hányados pozitív."
          tip="q = 1 esetén a képlet nem használható (0-val osztanánk), ilyenkor Sₙ = n · a₁."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: tagonként vagy képlettel?" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Első tag: a₁ = {fmtHu(a1, 1)}</label>
                <input type="range" min="-5" max="10" step="1" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full accent-blue-600" aria-label="első tag" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kvóciens: q = {fmtHu(q, 2)}</label>
                <input type="range" min="-2" max="2" step="0.1" value={q} onChange={(e) => setQ(Math.round(Number(e.target.value) * 10) / 10 || 0.1)} className="w-full accent-emerald-600" aria-label="kvóciens" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tagok száma: n = {n}</label>
                <input type="range" min="1" max="15" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-amber-600" aria-label="tagszám" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">tagonként összeadva</div>
                  <div className="font-mono font-black text-blue-900">{fmtHu(direct, 3)}</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">{q === 1 ? 'Sₙ = n · a₁' : 'Sₙ = a₁(qⁿ − 1)/(q − 1)'}</div>
                  <div className="font-mono font-black text-emerald-900">{fmtHu(formula, 3)}</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-xs text-slate-700">
                Tagok: {terms.slice(0, 8).map((t) => fmtHu(t, 2)).join('; ')}
                {n > 8 ? '; …' : ''} · aₙ = {fmtHu(terms[n - 1] ?? 0, 3)}
              </div>
            </div>
            <svg viewBox="0 0 320 240" className="w-full h-auto" role="img" aria-label="a tagok és a részletösszegek grafikonja">
              <SeqBarChart values={terms} x={30} y={20} w={280} h={180} line={partial} color={S_BLUE} lineColor={S_GREEN} labelEvery={n > 10 ? 5 : 1} />
              <SText x={170} y={232} t="kék: aₖ  ·  zöld: Sₖ (részletösszeg)" s={10.5} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Sissa jutalma" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hány mezőt töltünk fel? k = {k}</label>
                <input type="range" min="1" max="64" value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-purple-600" aria-label="mezők száma" />
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                  A {k}. mezőn: 2<sup>{k - 1}</sup> = <strong>{k <= 40 ? fmtHu(onSquare, 0) : `≈ ${fmtHu(onSquare / 10 ** Math.floor(Math.log10(onSquare)), 2)} · 10^${Math.floor(Math.log10(onSquare))}`}</strong> szem
                </div>
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                  Összesen: S<sub>{k}</sub> = 2<sup>{k}</sup> − 1 ={' '}
                  <strong>{k <= 40 ? fmtHu(grains, 0) : `≈ ${fmtHu(grains / 10 ** Math.floor(Math.log10(grains)), 2)} · 10^${Math.floor(Math.log10(grains))}`}</strong> szem
                </div>
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                  Tömeg (≈ 0,038 g/szem): <strong>{tons < 1 ? `${fmtHu(tons * 1e6, 1)} g` : `${fmtHu(tons, tons < 100 ? 2 : 0)} tonna`}</strong>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Figyeld meg: a k-adik mezőn mindig eggyel több szem van, mint az összes előző mezőn együtt (2ᵏ⁻¹ = Sₖ₋₁ + 1).
              </p>
            </div>
            <svg viewBox="0 0 240 240" className="w-full max-w-xs h-auto mx-auto" role="img" aria-label="sakktábla a feltöltött mezőkkel">
              {Array.from({ length: 64 }, (_, i) => {
                const r = Math.floor(i / 8);
                const c = r % 2 === 0 ? i % 8 : 7 - (i % 8);
                const filled = i < k;
                return (
                  <rect
                    key={i}
                    x={10 + c * 27.5}
                    y={10 + (7 - r) * 27.5}
                    width={27.5}
                    height={27.5}
                    fill={filled ? (i === k - 1 ? '#d97706' : '#fbbf24') : (r + c) % 2 === 0 ? '#e2e8f0' : '#f8fafc'}
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometricSumTheory;
