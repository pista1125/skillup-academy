import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { PlotBox, Axes, curvePath, mapX, mapY, L_BLUE, L_RED, L_GREEN } from './plotKit';
import { SquareIdentitySvg, FactoringSvg, ParabolaSignSvg, RootEquationSvg, LinearSystemSvg } from './AlgebraSummaryFigures';

const numIn = 'w-20 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';

const fmt = (x: number, d = 3): string => {
  if (!Number.isFinite(x)) return '–';
  const r = Math.round(x * 10 ** d) / 10 ** d;
  let s = r.toFixed(d);
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return (s === '-0' ? '0' : s).replace('.', ',').replace('-', '−');
};
/** x − r alakú tényező szövegesen. */
const factor = (r: number) => (Math.abs(r) < 1e-12 ? 'x' : r > 0 ? `(x − ${fmt(r)})` : `(x + ${fmt(-r)})`);

type Rel = '<' | '≤' | '>' | '≥';

export const AlgebraSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – másodfokú egyenlet és egyenlőtlenség
  const [qa, setQa] = useState<number>(3);
  const [qb, setQb] = useState<number>(-8);
  const [qc, setQc] = useState<number>(-35);
  const [rel, setRel] = useState<Rel>('<');
  // Labor II – egyenletrendszer
  const [s, setS] = useState<number[]>([4, -3, -10, 2, 6, 10]);

  const quad = useMemo(() => {
    if (qa === 0) return null;
    const D = qb * qb - 4 * qa * qc;
    const roots = D > 0 ? [(-qb - Math.sqrt(D)) / (2 * qa), (-qb + Math.sqrt(D)) / (2 * qa)].sort((x, y) => x - y) : D === 0 ? [-qb / (2 * qa)] : [];
    const neg = rel === '<' || rel === '≤';
    const strict = rel === '<' || rel === '>';
    const wantNeg = qa > 0 ? neg : !neg; // a parabola "belseje" a gyökök között az ellenkező előjelű, mint a
    let sol = '';
    if (roots.length === 2) {
      const [r1, r2] = roots;
      const L = strict ? ']' : '[';
      const R = strict ? '[' : ']';
      sol = wantNeg ? `${L}${fmt(r1)}; ${fmt(r2)}${R}` : `]−∞; ${fmt(r1)}${R} ∪ ${L}${fmt(r2)}; ∞[`;
    } else if (roots.length === 1) {
      const r = roots[0];
      if (wantNeg) sol = strict ? '∅' : `{${fmt(r)}}`;
      else sol = strict ? `ℝ ∖ {${fmt(r)}}` : 'ℝ';
    } else {
      sol = wantNeg ? '∅' : 'ℝ';
    }
    return { D, roots, sol };
  }, [qa, qb, qc, rel]);

  const sys = useMemo(() => {
    const [a1, b1, c1, a2, b2, c2] = s;
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-12) {
      const prop = Math.abs(a1 * c2 - a2 * c1) < 1e-12 && Math.abs(b1 * c2 - b2 * c1) < 1e-12;
      return { det, x: NaN, y: NaN, kind: prop ? 'végtelen sok megoldás (a két egyenes egybeesik)' : 'nincs megoldás (párhuzamos egyenesek)' };
    }
    return { det, x: (c1 * b2 - c2 * b1) / det, y: (a1 * c2 - a2 * c1) / det, kind: 'egyetlen megoldás' };
  }, [s]);

  const qbox: PlotBox = useMemo(() => {
    const vx = qa !== 0 ? -qb / (2 * qa) : 0;
    const vy = qa !== 0 ? qc - (qb * qb) / (4 * qa) : 0;
    const span = quad && quad.roots.length === 2 ? Math.max(3, (quad.roots[1] - quad.roots[0]) * 0.9) : 4;
    const xmin = Math.floor(vx - span);
    const xmax = Math.ceil(vx + span);
    const ys = [qc, vy, 0, qa * xmin * xmin + qb * xmin + qc, qa * xmax * xmax + qb * xmax + qc];
    let ymin = Math.min(...ys);
    let ymax = Math.max(...ys);
    const pad = Math.max(1, (ymax - ymin) * 0.08);
    ymin -= pad;
    ymax += pad;
    return { x0: 30, y0: 15, w: 280, h: 210, xmin, xmax, ymin, ymax };
  }, [qa, qb, qc, quad]);
  const ystep = (() => {
    const r = qbox.ymax - qbox.ymin;
    const raw = r / 8;
    const p = 10 ** Math.floor(Math.log10(raw));
    return [1, 2, 5, 10].map((m) => m * p).find((v) => v >= raw) ?? 10 * p;
  })();
  const xstep = qbox.xmax - qbox.xmin > 16 ? 2 : 1;

  const sbox: PlotBox = useMemo(() => {
    const R = Number.isFinite(sys.x) ? Math.max(6, Math.ceil(1.4 * Math.max(Math.abs(sys.x), Math.abs(sys.y)))) : 6;
    return { x0: 30, y0: 15, w: 230, h: 210, xmin: -R, xmax: R, ymin: -R, ymax: R };
  }, [sys]);
  const sstep = (() => {
    const raw = (2 * sbox.xmax) / 8;
    const p = 10 ** Math.floor(Math.log10(raw));
    return [1, 2, 5, 10].map((m) => m * p).find((v) => v >= raw) ?? 10 * p;
  })();
  const line = (a: number, b: number, c: number) => (b !== 0 ? curvePath(sbox, (x) => (c - a * x) / b) : `M${mapX(sbox, c / a)},${sbox.y0} L${mapX(sbox, c / a)},${sbox.y0 + sbox.h}`);

  const setSi = (i: number, v: number) => setS((cur) => cur.map((x, j) => (j === i ? v : x)));

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="algebra"
      title="4. Algebra – összefoglalás"
      subtitle="Nevezetes azonosságok, szorzattá alakítás, egyenletek és egyenlőtlenségek, másodfokú megoldóképlet, gyökös, exponenciális és logaritmusos egyenletek, egyenletrendszerek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_algebra_osszefoglalas_tananyag.pdf"
      practiceTitle="Készen állsz az algebrai érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MÁSODFOKÚ EGYENLET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">x₁,₂ = (−b ± √(b² − 4ac)) / (2a)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>D = b² − 4ac: D &gt; 0 két, D = 0 egy (kettős), D &lt; 0 nincs valós gyök.</li>
              <li>Gyöktényezős alak: ax² + bx + c = a(x − x₁)(x − x₂).</li>
              <li>Nem ekvivalens átalakítás (négyzetre emelés, ismeretlennel szorzás) után ellenőrizz behelyettesítéssel!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Fogalmak, tételek, módszerek" badge="Tankönyv 118. o." badgeColor="indigo">
        <TheoryTable
          headers={['', 'Fogalom', 'Lényeg']}
          rows={[
            ['T', 'Nevezetes azonosságok', '(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; (a + b)(a − b) = a² − b²'],
            ['D', 'Egyenlet alaphalmaza', 'a valós számok azon részhalmaza, amelyben a megoldásokat keressük'],
            ['D', 'Megoldáshalmaz', 'az alaphalmaz azon elemei, amelyek igazzá teszik az egyenletet'],
            ['M', 'Mérlegelv', 'a két oldalt ugyanazzal növeljük, csökkentjük, illetve ugyanazzal a nem nulla számmal (kifejezéssel) szorozzuk, osztjuk'],
            ['M', 'Ekvivalens átalakítás', 'nincs gyökvesztés és nem keletkezik hamis gyök; nem ekvivalens lehet pl. ismeretlennel szorzás/osztás, hatványozás, gyökvonás'],
            ['D', 'Másodfokú egyenlet', 'ax² + bx + c = 0 (a ≠ 0)'],
            ['T', 'Megoldóképlet', 'x₁,₂ = (−b ± √(b² − 4ac)) / (2a)'],
            ['D', 'Diszkrimináns', 'D = b² − 4ac: D > 0 két különböző, D = 0 egy (két egyenlő), D < 0 nincs valós gyök'],
            ['T', 'Gyöktényezős alak', 'ax² + bx + c = a(x − x₁)(x − x₂); pl. 3x² − 2x − 1 = 3(x − 1)(x + 1/3)']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SquareIdentitySvg />
          <FactoringSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Kidolgozott feladat: szorzattá alakítás és egyenletek" badge="Mintapélda" badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Alakítsd szorzattá: 3x² − 12x; 3x² − 12; 3x² − 12x + 12, majd oldd meg a kifejezés = 0 egyenleteket!</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Mindháromban kiemelünk 3-at (az elsőben 3x-et): 3x(x − 4); 3(x² − 4) = 3(x − 2)(x + 2); 3(x² − 4x + 4) = 3(x − 2)².</li>
            <li>Egy szorzat pontosan akkor 0, ha valamelyik tényezője 0.</li>
            <li>
              Megoldáshalmazok: <strong>{'{0; 4}'}</strong>, <strong>{'{2; −2}'}</strong>, <strong>{'{2}'}</strong> – ekvivalens átalakításokat végeztünk, ezért nem kell ellenőrizni.
            </li>
          </ol>
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: másodfokú egyenlőtlenség" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>a) Alakítsd szorzattá a 3x² − 8x − 35 kifejezést! b) Oldd meg a 3x² − 8x − 35 &lt; 0 egyenlőtlenséget az egész számok halmazán!</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>x₁,₂ = (8 ± √(64 + 420)) / 6 = (8 ± 22) / 6 ⇒ x₁ = −7/3, x₂ = 5; így 3x² − 8x − 35 = 3(x + 7/3)(x − 5).</li>
              <li>Grafikusan: felfelé nyitott parabola, a zérushelyek között negatív.</li>
              <li>Algebrailag (előjeltáblázat): a szorzat akkor negatív, ha a két tényező ellentétes előjelű, azaz −7/3 &lt; x &lt; 5.</li>
              <li>
                Az egészek közül: <strong>M = {'{−2; −1; 0; 1; 2; 3; 4}'}</strong>.
              </li>
            </ol>
          </div>
          <ParabolaSignSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladatok: gyökös egyenlet, egyenletrendszer" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> √(3 − 7x) = −2: a négyzetgyök értéke nemnegatív, ezért <strong>nincs megoldás</strong>.
            </p>
            <p>
              <strong>b)</strong> √(4x − 3) = x − 6: feltételek 4x − 3 ≥ 0 és x − 6 ≥ 0 ⇒ x ≥ 6. Négyzetre emelve 4x − 3 = x² − 12x + 36 ⇒ x² − 16x + 39 = 0 ⇒ x = 3 vagy x = 13. A 3 nem teljesíti a feltételt, így <strong>M = {'{13}'}</strong>.
            </p>
            <RootEquationSvg />
          </div>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Két kft. (5. feladat):</strong> az Egyik Kft. eredeti vállalása x, a Másiké y darab.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>I.: (4/5)x + 1,1y = 4300; II.: (5/6)x + 1,05y = 4230.</li>
              <li>I. · 5/4: x + 1,375y = 5375; II. · 6/5: x + 1,26y = 5076. Kivonva: 0,115y = 299 ⇒ y = 2600, x = 1800.</li>
              <li>Ellenőrzés: 1440 + 2860 = 4300 ✓; 1500 + 2730 = 4230 ✓.</li>
            </ul>
            <LinearSystemSvg />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="5. Exponenciális és logaritmusos egyenlőtlenségek (Ráadás)" badge="Mintapélda" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="a) lg(5 − 6x) ≤ −2" badge="Ráadás 1. a)" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Értelmezés: 5 − 6x &gt; 0 ⇒ x &lt; 5/6.</li>
              <li>−2 = lg 10⁻²; az lg szigorúan nő, a reláció marad: 5 − 6x ≤ 0,01.</li>
              <li>499/600 ≤ x, tehát M = [499/600; 5/6[ (pl. 499/600 és 999/1200 is jó).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="b) 0,3⁴ˣ⁻¹ < 0,09⁻³" badge="Ráadás 1. b)" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>0,09 = 0,3², így a jobb oldal 0,3⁻⁶.</li>
              <li>A 0,3 alapú exponenciális függvény szigorúan csökken: a reláció megfordul: 4x − 1 &gt; −6.</li>
              <li>x &gt; −5/4, M = ]−5/4; ∞[ (pl. −1 és 3).</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Ráadás 2.: xˣ⁺³ = x⁷">
          Esetszétválasztás: x &gt; 0 esetén x = 1 vagy a kitevők egyenlők (x + 3 = 7 ⇒ x = 4); x = 0: 0³ = 0⁷ = 0 ✓; x &lt; 0 csak egész lehet, xˣ⁻⁴ = 1 ⇒ x = −1 esetén (−1)² = 1 ≠ (−1)⁷ = −1. A gyökök: <strong>0; 1; 4</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Megoldott feladatok a blokkból" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Kifejezések, másodfokú egyenletek" badge="A5., A8., A10., B6." badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>(2x − 1)² − 3x(2x − 4) = −2x² + 8x + 1; x = −1/2 esetén −3,5.</li>
              <li>−2x² + 4x − 3 = 0: D = 16 − 24 = −8 &lt; 0, nincs valós gyök.</li>
              <li>6ab² − 9b = 3b(2ab − 3); 3x² − 12x + 12 = 3(x − 2)².</li>
              <li>(2x − 1)(2x + 1) = 8 ⇒ 4x² = 9 ⇒ x = ±3/2.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Szöveges feladatok" badge="B3., P2. c), P4., Q5. a)" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Antal: (3,5a + 8) / (a + 8) = 2,5 ⇒ a = 12 év.</li>
              <li>Kapitány + kormányos = 92; 46 év múlva az összeg 184, a kapitány 96 ⇒ most 50 és 42 évesek.</li>
              <li>Kirándulás: 12 000n + 4000 = 13 000n − 4000 ⇒ n = 8 fő; a hajóút 23 000 · 1,2 · 1,3 = 35 880 Ft (56%-os drágulás).</li>
              <li>Konzervek: 5m + 3k = 2250 és 4m + 3,3k = 2250 ⇒ m = 150 Ft, k = 500 Ft.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Egyenlőtlenségek, értelmezési tartomány" badge="B8., P1." badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>lg(7 − 3x) értelmezett, ha 7 − 3x &gt; 0 ⇒ x &lt; 7/3.</li>
              <li>{'3ˣ · 9⁻ˣ = 27 · (1/3)²ˣ'} ⇒ 3⁻ˣ = 3³⁻²ˣ ⇒ x = 3.</li>
              <li>(x − 1)² + (x − 3)(x + 3) ≤ 4 ⇒ x² − x − 6 ≤ 0 ⇒ −2 ≤ x ≤ 3: hat egész szám.</li>
              <li>√(x − 6) + (x + 6)² = 0: mindkét tag ≥ 0, egyszerre csak x = 6 és x = −6 esetén lennének 0 – nincs megoldás.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Mozgás, exponenciális egyenlet" badge="P2. b), P3. b), Q3." badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Hajók: 35 · 0,75 = 26,25 km előny, 10 km/h közeledés ⇒ 2,625 óra múlva, 118,125 km-nél éri utol.</li>
              <li>0,9 = {'2,718^{-0,1275h}'} ⇒ h = lg(1/0,9) / (0,1275 · lg 2,718) ≈ 0,83 km.</li>
              <li>A negatív számok halmazán: 2x² − x − 1 = 0 ⇒ x = −1/2; √(2x + 11) = x + 4 ⇒ x = −1 (a −5 hamis gyök).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: hamis gyök és relációjel" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Négyzetre emelés után ellenőrizni kell"
          wrong="√(4x − 3) = x − 6 megoldásai: x = 3 és x = 13."
          wrongExplanation="A négyzetre emelés nem ekvivalens átalakítás: x = 3-nál a bal oldal 3, a jobb oldal −3."
          correct="M = {13} (x ≥ 6 feltétel vagy behelyettesítés)."
          correctExplanation="Egyenlőtlenségnél negatív számmal szorozva, illetve 1-nél kisebb alapú exponenciális vagy logaritmusos lépésnél a relációjel megfordul."
          tip="Szorzattá alakítás előtt mindig nézd meg, lehet-e kiemelni!"
        />
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: másodfokú egyenlet és egyenlőtlenség" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <input type="number" value={qa} onChange={(e) => setQa(Number(e.target.value))} className={numIn} aria-label="a" />
                <span>x² +</span>
                <input type="number" value={qb} onChange={(e) => setQb(Number(e.target.value))} className={numIn} aria-label="b" />
                <span>x +</span>
                <input type="number" value={qc} onChange={(e) => setQc(Number(e.target.value))} className={numIn} aria-label="c" />
                <select value={rel} onChange={(e) => setRel(e.target.value as Rel)} className="px-2 py-1 rounded-lg border border-slate-300 text-sm" aria-label="reláció">
                  {(['<', '≤', '>', '≥'] as Rel[]).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <span>0</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: '3x² − 8x − 35 < 0', v: [3, -8, -35] },
                  { t: '−2x² + 4x − 3', v: [-2, 4, -3] },
                  { t: '3x² − 12x + 12', v: [3, -12, 12] },
                  { t: 'x² − 16x + 39', v: [1, -16, 39] },
                  { t: '2x² − x − 1', v: [2, -1, -1] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setQa(p.v[0]);
                      setQb(p.v[1]);
                      setQc(p.v[2]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              {quad ? (
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
                  <div>
                    D = {fmt(qb)}² − 4 · {fmt(qa)} · {fmt(qc)} = <strong>{fmt(quad.D)}</strong>
                  </div>
                  <div>
                    {quad.roots.length === 2
                      ? `Két gyök: x₁ = ${fmt(quad.roots[0])}, x₂ = ${fmt(quad.roots[1])}`
                      : quad.roots.length === 1
                        ? `Egy (kettős) gyök: x = ${fmt(quad.roots[0])}`
                        : 'Nincs valós gyök (D < 0).'}
                  </div>
                  {quad.roots.length > 0 && (
                    <div className="font-mono text-xs">
                      Gyöktényezős alak: {fmt(qa)} · {quad.roots.length === 2 ? `${factor(quad.roots[0])}${factor(quad.roots[1])}` : `${factor(quad.roots[0])}²`}
                    </div>
                  )}
                  <div>
                    Az egyenlőtlenség megoldása: <strong>{quad.sol}</strong>
                  </div>
                </div>
              ) : (
                <div className="text-rose-700 font-bold">a = 0 esetén nem másodfokú az egyenlet!</div>
              )}
            </div>
            <svg viewBox="0 0 320 245" className="w-full max-w-md h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <rect x="1" y="1" width="318" height="243" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <Axes b={qbox} stepX={xstep} stepY={ystep} />
              {quad && <path d={curvePath(qbox, (x) => qa * x * x + qb * x + qc)} fill="none" stroke={L_BLUE} strokeWidth="2.2" />}
              {quad && quad.roots.map((r) => <circle key={r} cx={mapX(qbox, r)} cy={mapY(qbox, 0)} r="4.5" fill={L_RED} />)}
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: kétismeretlenes egyenletrendszer" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 text-sm">
              {[0, 1].map((r) => (
                <div key={r} className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{r === 0 ? 'I.' : 'II.'}</span>
                  <input type="number" value={s[3 * r]} onChange={(e) => setSi(3 * r, Number(e.target.value))} className={numIn} aria-label={`a${r + 1}`} />
                  <span>x +</span>
                  <input type="number" value={s[3 * r + 1]} onChange={(e) => setSi(3 * r + 1, Number(e.target.value))} className={numIn} aria-label={`b${r + 1}`} />
                  <span>y =</span>
                  <input type="number" value={s[3 * r + 2]} onChange={(e) => setSi(3 * r + 2, Number(e.target.value))} className={numIn} aria-label={`c${r + 1}`} />
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'A9. feladat', v: [4, -3, -10, 2, 6, 10] },
                  { t: 'Konzervek (Q5.)', v: [5, 3, 2250, 4, 3.3, 2250] },
                  { t: 'Párhuzamos', v: [1, 2, 3, 2, 4, 5] },
                  { t: 'Egybeeső', v: [1, 2, 3, 2, 4, 6] }
                ].map((p) => (
                  <button key={p.t} onClick={() => setS(p.v)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100">
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                <div className="text-xs text-slate-600">{sys.kind}</div>
                {Number.isFinite(sys.x) && (
                  <>
                    <div>
                      x = <strong>{fmt(sys.x)}</strong>, y = <strong>{fmt(sys.y)}</strong>
                    </div>
                    <div className="text-xs">
                      Ellenőrzés: {fmt(s[0] * sys.x + s[1] * sys.y)} = {fmt(s[2])} és {fmt(s[3] * sys.x + s[4] * sys.y)} = {fmt(s[5])} ✓
                    </div>
                  </>
                )}
              </div>
            </div>
            <svg viewBox="0 0 270 245" className="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <rect x="1" y="1" width="268" height="243" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <Axes b={sbox} stepX={sstep} stepY={sstep} />
              {(s[0] !== 0 || s[1] !== 0) && <path d={line(s[0], s[1], s[2])} fill="none" stroke={L_BLUE} strokeWidth="2.2" />}
              {(s[3] !== 0 || s[4] !== 0) && <path d={line(s[3], s[4], s[5])} fill="none" stroke={L_RED} strokeWidth="2.2" />}
              {Number.isFinite(sys.x) && <circle cx={mapX(sbox, sys.x)} cy={mapY(sbox, sys.y)} r="5" fill={L_GREEN} />}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AlgebraSummaryTheory;
