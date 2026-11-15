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
  PerpendicularParallelPlane,
  PerpendicularParallelMeteorsSvg,
  PerpendicularParallelRotationSvg,
  PerpendicularParallelSlopeTrianglesSvg,
  PerpendicularParallelRhombusSvg,
  PerpendicularParallelDistanceSvg,
  PPPlaneLine,
  PPPlaneSeg,
  PPPlaneAngle,
  PPt
} from './PerpendicularParallelFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const n = Number(x.toFixed(d));
  return (n === 0 ? 0 : n).toString().replace('.', ',').replace('-', '−');
};

/** y = mx + b szöveges alakja. */
const lineStr = (m: number, b: number) => {
  const mm = Number(m.toFixed(3));
  const bb = Number(b.toFixed(3));
  const mPart = mm === 0 ? '' : mm === 1 ? 'x' : mm === -1 ? '−x' : `${fmt(mm, 3)}x`;
  if (!mPart) return `y = ${fmt(bb, 3)}`;
  if (bb === 0) return `y = ${mPart}`;
  return `y = ${mPart} ${bb > 0 ? '+' : '−'} ${fmt(Math.abs(bb), 3)}`;
};

export const PerpendicularParallelTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [m1, setM1] = useState<number>(0.5);
  const [showPar, setShowPar] = useState<boolean>(true);
  // Labor II
  const [lm, setLm] = useState<number>(-1);
  const [lb, setLb] = useState<number>(1);
  const [P, setP] = useState<PPt>([-3, 2]);

  // Labor I számítások
  const m2 = m1 !== 0 ? -1 / m1 : NaN;
  const lab1Lines: PPPlaneLine[] = [{ p: [0, 0], q: [1, m1], color: '#2563eb', label: 'e', labelAt: 0.95, width: 3 }];
  if (showPar) lab1Lines.push({ p: [0, 3], q: [1, 3 + m1], color: '#059669', label: 'e′', labelAt: 0.95, width: 2.2, dashed: true });
  lab1Lines.push(m1 !== 0 ? { p: [0, 0], q: [m1, -1], color: '#dc2626', label: 'f', labelAt: 0.06, labelDx: 8, labelDy: 6, width: 3 } : { p: [0, 0], q: [0, 1], color: '#dc2626', label: 'f', labelAt: 0.95, width: 3 });
  const lab1Segs: PPPlaneSeg[] = [
    { from: [0, 0], to: [1, 0], color: '#1d4ed8', width: 2.4 },
    { from: [1, 0], to: [1, m1], color: '#1d4ed8', width: 2.4 },
    { from: [0, 0], to: [0, -1], color: '#b91c1c', width: 2.4 },
    { from: [0, -1], to: [m1, -1], color: '#b91c1c', width: 2.4 }
  ];
  const lab1Angles: PPPlaneAngle[] = [{ at: [0, 0], p: [1, m1], q: m1 !== 0 ? [m1, -1] : [0, -1], right: true, r: 15, color: '#7c3aed' }];

  // Labor II számítások: m·x − y + b = 0
  const A = lm;
  const B = -1;
  const val = A * P[0] + B * P[1] + lb;
  const n2 = A * A + B * B;
  const T: PPt = [P[0] - (val * A) / n2, P[1] - (val * B) / n2];
  const dist = Math.abs(val) / Math.sqrt(n2);
  const onLine = Math.abs(val) < 1e-9;
  const perpSlope = lm !== 0 ? -1 / lm : NaN;
  const perpB = lm !== 0 ? P[1] - perpSlope * P[0] : NaN;
  const lab2Lines: PPPlaneLine[] = [{ p: [0, lb], q: [1, lb + lm], color: '#2563eb', label: 'e', labelAt: 0.94, width: 3 }];
  if (!onLine) lab2Lines.push(lm !== 0 ? { p: P, q: [P[0] + 1, P[1] + perpSlope], color: '#dc2626', dashed: true, width: 1.6 } : { p: P, q: [P[0], P[1] + 1], color: '#dc2626', dashed: true, width: 1.6 });

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="meroleges-parhuzamos-egyenesek"
      title="15. Merőleges, párhuzamos egyenesek"
      subtitle="Párhuzamos egyenesek meredeksége egyenlő, merőlegeseké egymás negatív reciproka (m₁ · m₂ = −1); alkalmazás: magasságvonal, felezőmerőleges, pont és egyenes távolsága."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_meroleges_parhuzamos_egyenesek_tananyag.pdf"
      practiceTitle="Készen állsz a merőleges és párhuzamos egyenesekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — PÁRHUZAMOSSÁG ÉS MERŐLEGESSÉG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-blue-900 dark:text-blue-200">e ∥ f ⇔ m₁ = m₂</div>
              <div className="font-mono text-base font-black text-rose-800 dark:text-rose-200">e ⊥ f ⇔ m₁ · m₂ = −1</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A két tétel olyan egyenesekre vonatkozik, amelyek <strong>nem párhuzamosak az y tengellyel</strong>.</li>
              <li>Az x = c alakú egyenesek egymással párhuzamosak, és merőlegesek minden y = b alakú egyenesre.</li>
              <li>Merőleges meredekség: <strong>m₂ = −1/m_{1}</strong> (a reciprok ellentettje), pl. 1/2 ⇒ −2.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: párhuzamosan száguldó hullócsillagok" badge="Tankönyv 254. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Minden év augusztusában a <strong>Perseidák</strong> meteorrajának köszönhetjük a sok hullócsillagot, amelyek gyakran párhuzamosan száguldva jelennek meg az égen. Hogyan dönthetjük el egy fotó alapján, hogy valóban párhuzamosan haladtak-e?
            </p>
            <p>
              Helyezzünk a fotóra koordináta-rendszert! Az egyenesek párhuzamosak, ha az x tengellyel <strong>ugyanakkora szöget</strong> zárnak be. Elegendő a <strong>meredekségüket</strong> vizsgálni, hiszen egyenlő irányszögek tangense (a meredekség) is egyenlő.
            </p>
            <p>
              Minden egyeneshez elég két pontot kiválasztani (pl. E₁, E₂), mert két pont az egyenest – így az irányát is – egyértelműen meghatározza: ha →E₁E₂ koordinátái (e₁; e₂), akkor az e meredeksége e₂/e₁.
            </p>
          </div>
          <PerpendicularParallelMeteorsSvg />
        </div>
      </TheorySection>

      {/* 2. Párhuzamosság */}
      <TheorySection title="2. Párhuzamos egyenesek iránytangense" badge="Elmélet" badgeColor="indigo">
        <TheoryCallout type="tip" title="Tétel">
          A koordinátasík két olyan egyenese, amely nem párhuzamos az y tengellyel, <strong>akkor és csak akkor párhuzamos</strong> egymással, ha iránytangenseik (meredekségeik) <strong>egyenlők</strong>. Ha az egyenesek az y tengellyel párhuzamosak – egyenletük x = c alakú –, akkor egymással is párhuzamosak.
        </TheoryCallout>
        <TheoryTable
          headers={['Egyenlet', 'y-ra rendezve', 'm', 'Kapcsolat az e: −4x + 20y = 12 egyenessel (m = 1/5)']}
          rows={[
            ['−x + 5y = 2', 'y = 1/5 x + 2/5', '1/5', 'párhuzamos (különböző egyenes)'],
            ['2x − 10y = −6', 'y = 1/5 x + 3/5', '1/5', 'egybeesik e-vel (e egyenletének −1/2-szerese)'],
            ['10x + 2y = −5', 'y = −5x − 5/2', '−5', 'merőleges: 1/5 · (−5) = −1'],
            ['−40x + 8y = 20', 'y = 5x + 5/2', '5', 'se nem párhuzamos, se nem merőleges'],
            ['−40x − 8y = 20', 'y = −5x − 5/2', '−5', 'merőleges (ugyanaz, mint 10x + 2y = −5)']
          ]}
        />
        <p className="text-sm text-slate-700">
          A tankönyv 1. c) kérdésére: a 6 egyenlet csak <strong>4 különböző egyenest</strong> határoz meg.
        </p>
      </TheorySection>

      {/* 3. Merőlegesség */}
      <TheorySection title="3. Kidolgozott feladat: a merőleges egyenes meredeksége" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Feladat.</strong> Az e egyenes meredeksége mₑ = 0,5. Határozzuk meg az e-re merőleges f egyenes meredekségét!
            </p>
            <p>
              <strong>Megoldás.</strong> Az e egyenes ugyanakkora szöget zár be az x tengely pozitív ágával, mint a vele párhuzamos <strong>→OP(2; 1)</strong> helyvektor. Az →OP vektor <strong>−90°-os elforgatottja →OP′(1; −2)</strong>, ez párhuzamos f-fel, így f meredeksége −2/1 = <strong>−2</strong>.
            </p>
            <p>
              Látjuk: e ⊥ f és mₑ = 1/2 esetén −2 adódik, vagyis <strong>(1/2) · (−2) = −1</strong>.
            </p>
            <p className="text-xs text-slate-500">
              Általában: az (1; m) irányú egyenes −90°-os elforgatottja (m; −1) irányú, ennek meredeksége −1/m. A két meredekség szorzata m · (−1/m) = −1.
            </p>
          </div>
          <PerpendicularParallelRotationSvg />
        </div>
        <TheoryCallout type="tip" title="Tétel: merőlegesség és az iránytangensek kapcsolata">
          A koordinátasík két olyan egyenese, melyek közül egyik sem párhuzamos az y tengellyel, <strong>akkor és csak akkor merőleges</strong> egymásra, ha iránytangenseik szorzata <strong>−1</strong>. Ha az egyenesek valamelyike az y tengellyel párhuzamos (x = c), akkor az x tengellyel párhuzamos (y = b) egyenesek bármelyikére merőleges.
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PerpendicularParallelSlopeTrianglesSvg />
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
            <li>Az e meredekségi háromszöge: 3 jobbra, 2 fel ⇒ mₑ = 2/3.</li>
            <li>A háromszöget a közös pont körül 90°-kal elforgatva: 2 le, 3 jobbra ⇒ m_f = −3/2.</li>
            <li>A befogók szerepet cserélnek, és az egyik előjelet vált: ezért lesz a merőleges meredekség a <strong>reciprok ellentettje</strong>.</li>
          </ul>
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Paraméter (2. feladat)" badge="e: 6x − 15y = 2" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>mₑ = 6/15 = 2/5; a 9x + py = 5 egyenes meredeksége −9/p (p ≠ 0).</li>
              <li><strong>a) Merőleges:</strong> 2/5 · (−9/p) = −1 ⇒ 18 = 5p ⇒ <strong>p = 3,6</strong>.</li>
              <li><strong>b) Párhuzamos:</strong> −9/p = 2/5 ⇒ <strong>p = −22,5</strong>. (9x − 22,5y = 5 nem egybeeső: e 1,5-szerese 9x − 22,5y = 3 lenne.)</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Egyenesek adott ponton át (3–4. feladat)" badge="P(5; 2), →v(5; −2)" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>3. a) Az y = −3-mal párhuzamos, P-n átmenő egyenes: <strong>y = 2</strong>; b) az x = 7-re merőleges is: <strong>y = 2</strong>.</li>
              <li>4. a) Az origón átmenő, →v(5; −2)-vel párhuzamos e iránytangense <strong>−2/5</strong>; b) e: y = −2/5 x (2x + 5y = 0).</li>
              <li>c) A P(0; 2)-n átmenő, e-vel párhuzamos f: <strong>y = −2/5 x + 2</strong>.</li>
              <li>d) Az origón átmenő, e-re merőleges g: <strong>y = 5/2 x</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Milyen négyszög? (HF 2.)" badge="A(−4; −2), B(4; 2), C(8; 10), D(0; 6)" badgeColor="emerald">
            <PerpendicularParallelRhombusSvg className="w-full max-w-[300px] h-auto mx-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>m_AB = 4/8 = 1/2 és m_DC = 4/8 = 1/2 ⇒ AB ∥ DC; m_BC = 8/4 = 2 és m_AD = 8/4 = 2 ⇒ BC ∥ AD.</li>
              <li>Átlók: m_AC = 12/12 = 1, m_BD = 4/(−4) = −1, szorzatuk −1 ⇒ <strong>az átlók merőlegesek</strong>.</li>
              <li>Paralelogramma merőleges átlókkal: <strong>rombusz</strong> (AB = BC = √80).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Magasságvonal és felezőmerőleges (HF 4.)" badge="A(−3; 2), B(5; −4), C(0; 1)" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> m_AC = −1/3, a B-ből induló magasságvonal erre merőleges: m = 3, y + 4 = 3(x − 5) ⇒ <strong>y = 3x − 19</strong>.</li>
              <li><strong>b)</strong> AB felezőpontja F(1; −1), m_AB = −6/8 = −3/4, a felezőmerőleges meredeksége 4/3: y + 1 = 4/3 (x − 1) ⇒ <strong>4x − 3y = 7</strong>.</li>
              <li>HF 1.: 2x + 5y = −1 (m = −2/5) és 0,8x = 1 − 2y (m = −2/5) párhuzamos; mindkettő merőleges az x − 0,4y = 0,6 (m = 5/2) egyenesre; 4x − 3y = 12 (m = 4/3) ⊥ 6x + 8y = 5 (m = −3/4).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Pont és egyenes távolsága */}
      <TheorySection title="5. Alkalmazás: pont és egyenes távolsága" badge="Kiegészítés" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy pont és egy egyenes távolsága a pontból az egyenesre bocsátott <strong>merőleges szakasz</strong> hossza. A tanult eszközökkel három lépésben számolható:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Felírjuk a ponton átmenő, az egyenesre <strong>merőleges</strong> egyenest (m₂ = −1/m_{1}).</li>
              <li>A két egyenes <strong>metszéspontja</strong> (egyenletrendszer) a T talppont.</li>
              <li>A keresett távolság a <strong>PT szakasz hossza</strong> (két pont távolsága).</li>
            </ol>
            <p>
              <strong>Példa:</strong> A(−3; 2) és a BC: x + y = 1 egyenes (HF 4. háromszöge). m_BC = −1, a merőleges A-n át: y = x + 5. Metszéspont: x + x + 5 = 1 ⇒ T(−2; 3). Távolság: AT = √(1² + 1²) = <strong>√2 ≈ 1,41</strong>.
            </p>
            <TheoryCallout type="info" title="Képlet (kiegészítés)">
              Ax + By = C egyenes és P(x₀; y₀) pont esetén ugyanez rövidebben: d = |Ax₀ + By₀ − C| / √(A² + B²). Példánkban |−3 + 2 − 1| / √2 = 2/√2 = √2.
            </TheoryCallout>
          </div>
          <PerpendicularParallelDistanceSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: csak reciprokot veszünk" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A merőleges meredekség a reciprok ELLENTETTJE"
          wrong="mₑ = 2/5 ⇒ a merőleges egyenes meredeksége 5/2"
          wrongExplanation="2/5 · 5/2 = 1, nem −1. Az 5/2 meredekségű egyenes nem merőleges e-re (csak a reciprokot vettük)."
          correct="mₑ = 2/5 ⇒ m_f = −5/2, mert 2/5 · (−5/2) = −1"
          correctExplanation="Merőlegességnél a meredekségi háromszög befogói szerepet cserélnek ÉS az egyik irány megfordul – ezért kell az előjelváltás is."
          tip="Párhuzamosságnál a meredekségek egyenlők; ha az egyenletek is arányosak, az egyenesek egybeesnek."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: m₁ · m₂ = −1 vizuálisan" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <PerpendicularParallelPlane
              xMin={-5}
              xMax={5}
              yMin={-5}
              yMax={5}
              unit={28}
              ticks="all"
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={lab1Lines}
              segs={lab1Segs}
              angles={lab1Angles}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">m₁ (az e meredeksége) = {fmt(m1)}</label>
                <input type="range" min="-4" max="4" step="0.25" value={m1} onChange={(e) => setM1(Number(e.target.value))} className="w-full accent-blue-600" aria-label="e meredeksége" />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <input type="checkbox" checked={showPar} onChange={(e) => setShowPar(e.target.checked)} className="accent-emerald-600" />
                Mutasd az e-vel párhuzamos e′ egyenest is (y = m₁x + 3)
              </label>
              <div className="flex flex-wrap gap-2">
                {[0.5, 2, 2 / 3, -1, 1, 0].map((v, i) => (
                  <button
                    key={v}
                    onClick={() => setM1(v)}
                    data-testid={`pp-m1-preset-${i}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    m₁ = {v === 2 / 3 ? '2/3' : fmt(v)}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1" data-testid="pp-product">
                <div><span className="text-blue-700 font-bold">e:</span> {lineStr(m1, 0)}, irányvektor (1; {fmt(m1)})</div>
                {showPar && <div><span className="text-emerald-700 font-bold">e′:</span> {lineStr(m1, 3)} – ugyanaz a meredekség ⇒ e′ ∥ e</div>}
                {m1 !== 0 ? (
                  <>
                    <div><span className="text-red-700 font-bold">f:</span> {lineStr(m2, 0)}, irányvektor ({fmt(m1)}; −1)</div>
                    <div>m₂ = −1/m_{1} ≈ {fmt(m2, 3)}</div>
                    <div><strong>m₁ · m₂ = {fmt(m1 * m2, 3)}</strong></div>
                  </>
                ) : (
                  <div><span className="text-red-700 font-bold">f:</span> x = 0 – függőleges, nincs meredeksége (az y = b egyenesekre az x = c egyenesek merőlegesek)</div>
                )}
              </div>
              <p className="text-xs text-slate-500 italic">
                A kék meredekségi háromszöget (1 jobbra, m₁ fel) a közös pont körül −90°-kal elforgatva kapjuk a piros háromszöget (1 le, m₁ jobbra): ez az f iránya.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Pont és egyenes távolsága" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Az e egyenes meredeksége: m = {fmt(lm)}</label>
                <input type="range" min="-3" max="3" step="0.5" value={lm} onChange={(e) => setLm(Number(e.target.value))} className="w-full accent-blue-600" aria-label="egyenes meredeksége" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tengelymetszet: b = {fmt(lb)}</label>
                <input type="range" min="-4" max="4" step="1" value={lb} onChange={(e) => setLb(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="tengelymetszet" />
              </div>
              <p className="text-xs text-slate-500 italic">Kattints a síkon egy rácspontra a P pont áthelyezéséhez!</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setLm(-1);
                    setLb(1);
                    setP([-3, 2]);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  A(−3; 2) és x + y = 1
                </button>
                <button
                  onClick={() => {
                    setLm(0.5);
                    setLb(-3);
                    setP([0, 0]);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  O és y = 0,5x − 3
                </button>
                <button
                  onClick={() => {
                    setLm(0);
                    setLb(-3);
                    setP([5, 2]);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  P(5; 2) és y = −3
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1" data-testid="pp-distance">
                <div>e: {lineStr(lm, lb)}, P({fmt(P[0])}; {fmt(P[1])})</div>
                {onLine ? (
                  <div className="text-emerald-700 font-bold">P rajta van az egyenesen: a távolság 0.</div>
                ) : (
                  <>
                    <div>
                      1) Merőleges P-n át: {lm !== 0 ? `${lineStr(perpSlope, perpB)} (m = ${fmt(perpSlope, 3)})` : `x = ${fmt(P[0])}`}
                    </div>
                    <div>2) Talppont: T({fmt(T[0], 3)}; {fmt(T[1], 3)})</div>
                    <div>
                      3) <strong>d = PT ≈ {fmt(dist, 3)}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>
            <PerpendicularParallelPlane
              xMin={-6}
              xMax={6}
              yMin={-6}
              yMax={6}
              unit={24}
              ticks="all"
              tickStep={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              onPointClick={(x, y) => setP([x, y])}
              lines={lab2Lines}
              segs={onLine ? [] : [{ from: P, to: T, color: '#7c3aed', width: 3 }]}
              angles={onLine ? [] : [{ at: T, p: P, q: [T[0] + 1, T[1] + lm], right: true, r: 11 }]}
              points={[
                { at: P, label: 'P', color: '#0f172a' },
                ...(onLine ? [] : [{ at: T, label: 'T', color: '#7c3aed' }])
              ]}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PerpendicularParallelTheory;
