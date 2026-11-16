import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { fmt, frac, Grid, Arrow, makePlane, PlaneCfg, numIn, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from './sumKit';
import {
  VectorOpsSvg,
  VectorCoordsSvg,
  LineSlopeSvg,
  TriangleMedianSvg,
  LinesThalesSvg,
  CircleEquationSvg
} from './VectorsCoordinatesSummaryFigures';

const LAB1: PlaneCfg = { xmin: -8, xmax: 8, ymin: -8, ymax: 8, x0: 10, y0: 10, w: 300, h: 300 };
const LAB2: PlaneCfg = { xmin: -10, xmax: 10, ymin: -10, ymax: 10, x0: 10, y0: 10, w: 300, h: 300 };

/** y = (p/q)x + (r/q) alakú egyenlet szövegként. */
const lineText = (dy: number, dx: number, x1: number, y1: number) => {
  if (dx === 0) return `x = ${frac(x1, 1)}`;
  const m = frac(dy, dx);
  const bNum = y1 * dx - dy * x1;
  const bStr = bNum === 0 ? '' : bNum * dx > 0 ? ` + ${frac(Math.abs(bNum), Math.abs(dx))}` : ` − ${frac(Math.abs(bNum), Math.abs(dx))}`;
  if (dy === 0) return `y = ${frac(bNum, dx)}`;
  const mStr = m === "1" ? "x" : m === "−1" ? "−x" : m.includes("/") ? `${m} · x` : `${m}x`;
  return `y = ${mStr}${bStr}`;
};

export const VectorsCoordinatesSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: vektorműveletek
  const [a1, setA1] = useState<number>(4);
  const [a2, setA2] = useState<number>(1);
  const [b1, setB1] = useState<number>(1);
  const [b2, setB2] = useState<number>(3);
  const [lam, setLam] = useState<number>(-1);
  const [op, setOp] = useState<'sum' | 'diff' | 'scale'>('sum');
  // Labor II: két pont
  const [P1, setP1] = useState<[number, number]>([-5, 3]);
  const [P2, setP2] = useState<[number, number]>([4, 12]);

  const pl1 = makePlane(LAB1);
  const pl2 = makePlane(LAB2);
  const res = op === 'sum' ? [a1 + b1, a2 + b2] : op === 'diff' ? [a1 - b1, a2 - b2] : [lam * a1, lam * a2];
  const len = (x: number, y: number) => Math.sqrt(x * x + y * y);

  const geo = useMemo(() => {
    const [x1, y1] = P1;
    const [x2, y2] = P2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const d = Math.sqrt(dx * dx + dy * dy);
    const same = dx === 0 && dy === 0;
    const line = same ? '–' : lineText(dy, dx, x1, y1);
    // felezőmerőleges: normálvektor (dx; dy), F-en át: dx·x + dy·y = dx·Fx + dy·Fy (kettővel szorozva egész)
    const rhs2 = dx * (x1 + x2) + dy * (y1 + y2); // = 2·(dx·Fx + dy·Fy)
    let bis = '–';
    if (!same) {
      if (dy === 0) bis = `x = ${frac(x1 + x2, 2)}`;
      else if (dx === 0) bis = `y = ${frac(y1 + y2, 2)}`;
      else {
        // y = −(dx/dy)x + rhs2/(2dy)
        const m = frac(-dx, dy);
        const mStr = m === "1" ? "x" : m === "−1" ? "−x" : m.includes("/") ? `${m} · x` : `${m}x`;
        const c = rhs2 / (2 * dy);
        bis = `y = ${mStr}${c === 0 ? '' : c > 0 ? ` + ${frac(Math.abs(rhs2), Math.abs(2 * dy))}` : ` − ${frac(Math.abs(rhs2), Math.abs(2 * dy))}`}`;
      }
    }
    const u2 = x1 + x2; // 2u
    const v2 = y1 + y2; // 2v
    const r2x4 = dx * dx + dy * dy; // 4r²
    const circ = same
      ? '–'
      : `(x ${u2 >= 0 ? '−' : '+'} ${frac(Math.abs(u2), 2)})² + (y ${v2 >= 0 ? '−' : '+'} ${frac(Math.abs(v2), 2)})² = ${frac(r2x4, 4)}`;
    return { dx, dy, d, line, bis, circ, F: [(x1 + x2) / 2, (y1 + y2) / 2] as [number, number], same };
  }, [P1, P2]);

  const ptInput = (v: [number, number], set: (p: [number, number]) => void, name: string) => (
    <div className="flex items-center gap-1">
      <span className="font-bold">{name}(</span>
      <input type="number" min="-10" max="10" value={v[0]} onChange={(e) => set([Math.max(-10, Math.min(10, Math.round(Number(e.target.value)))), v[1]])} className={`${numIn} w-16`} aria-label={`${name} x`} />
      <span>;</span>
      <input type="number" min="-10" max="10" value={v[1]} onChange={(e) => set([v[0], Math.max(-10, Math.min(10, Math.round(Number(e.target.value))))])} className={`${numIn} w-16`} aria-label={`${name} y`} />
      <span className="font-bold">)</span>
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="vektorok-koordinatageometria"
      title="9. Vektorok, koordinátageometria – rendszerező összefoglalás"
      subtitle="Vektorműveletek és koordináták, két pont távolsága, felezőpont, az egyenes és a kör egyenlete, párhuzamosság, merőlegesség, metszéspont."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="blue"
      pdfFilename="12_osztaly_osszefoglalas_vektorok_koordinatageometria_tananyag.pdf"
      practiceTitle="Készen állsz a koordinátageometriai érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'KÉPLETTÁR — VEKTOROK, KOORDINÁTAGEOMETRIA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
                <div className="text-[11px] font-bold text-blue-700">Távolság</div>
                <div className="font-mono text-xs font-black text-blue-900 dark:text-blue-200">AB = √((b₁ − a₁)² + (b₂ − a₂)²)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
                <div className="text-[11px] font-bold text-emerald-700">Egyenes</div>
                <div className="font-mono text-xs font-black text-emerald-900 dark:text-emerald-200">y = mx + b; m₁ · m₂ = −1</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
                <div className="text-[11px] font-bold text-purple-700">Kör</div>
                <div className="font-mono text-xs font-black text-purple-900 dark:text-purple-200">(x − u)² + (y − v)² = r²</div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>AB vektor: (b₁ − a₁; b₂ − a₂); felezőpont: F((a₁ + b₁)/2; (a₂ + b₂)/2).</li>
              <li>Párhuzamos egyenesek: egyenlő meredekség; merőlegesek: a meredekségek szorzata −1.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Vektorok" badge="Tankönyv 158. o." badgeColor="blue">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Irányított szakasz, vektor', 'A végpontokat megkülönböztetjük (kezdőpont, végpont). Azonos irányú és hosszúságú irányított szakaszok ugyanazt a vektort határozzák meg.'],
            ['D', 'Abszolút érték, egyenlőség, nullvektor', '|a| a vektor hossza; két vektor egyenlő, ha irányuk és hosszuk megegyezik; a nullvektor kezdő- és végpontja egybeesik, hossza 0, iránya tetszőleges.'],
            ['D', 'Összeg, különbség', 'a + b ugyanazt az eltolást hozza létre, mint az a és b eltolás egymásutánja; c = a − b, ha a = b + c.'],
            ['D', 'Számszoros, ellentett', 'λ · a párhuzamos a-val, hossza |λ| · |a|; λ > 0: azonos, λ < 0: ellentétes irányú; 0 · a = 0. Az ellentett: −a = (−1) · a.'],
            ['T', 'Koordináták', 'i(1; 0), j(0; 1) bázisvektorok; a = a₁i + a₂j egyértelmű, a(a₁; a₂).'],
            ['T', 'Műveletek koordinátákkal', 'a + b (a₁ + b₁; a₂ + b₂), a − b (a₁ − b₁; a₂ − b₂), c · a (c · a₁; c · a₂); |a| = √(a₁² + a₂²).'],
            ['D/T', 'Pont, AB vektor, távolság, felezőpont', 'A pont koordinátái = helyvektorának koordinátái. AB(b₁ − a₁; b₂ − a₂), AB = √((b₁ − a₁)² + (b₂ − a₂)²), F((a₁ + b₁)/2; (a₂ + b₂)/2).']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <VectorOpsSvg />
          <VectorCoordsSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Egyenes és kör a koordináta-rendszerben" badge="Tankönyv 159. o." badgeColor="emerald">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Alakzat egyenlete', 'Olyan x-et, y-t tartalmazó egyenlőség (egyenlőtlenség), amelyet pontosan az alakzat pontjainak koordinátái tesznek igazzá.'],
            ['T', 'Egyenes egyenlete', 'Az y tengellyel nem párhuzamos egyenes: y = mx + b (m meredekség/iránytangens, (0; b) az y tengellyel vett metszéspont); az y tengellyel párhuzamos: x = c.'],
            ['T', 'Párhuzamosság, merőlegesség', 'Párhuzamosak, ha meredekségük egyenlő (vagy mindkettő párhuzamos az y tengellyel). Merőlegesek, ha m₁ · m₂ = −1 (vagy az egyik az x, a másik az y tengellyel párhuzamos).'],
            ['T', 'A kör egyenlete', 'C(u; v) középpontú, r sugarú kör: (x − u)² + (y − v)² = r².'],
            ['M', 'Metszéspont', 'A két egyenes egyenletéből álló egyenletrendszer megoldása; ha nincs megoldás, nincs közös pont.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <LineSlopeSvg />
          <CircleEquationSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: ABC háromszög koordinátákkal" badge="Kidolgozott 6." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A(−5; 3), B(−1; 0), C(4; 12).</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> AB(4; −3), BC(5; 12), AC(9; 9) ⇒ AB = √(16 + 9) = <strong>5</strong>, BC = <strong>13</strong>, AC = √162 = <strong>9√2</strong>.
              </li>
              <li>
                <strong>b)</strong> Koszinusztétel: (9√2)² = 5² + 13² − 2 · 5 · 13 · cos β ⇒ −32 = −130 · cos β ⇒ cos β ≈ 0,2462 ⇒ β ≈ <strong>75,75°</strong>.
              </li>
              <li>
                <strong>c)</strong> BC felezőpontja F(1,5; 6); AF(6,5; 3) ⇒ m = 3/6,5 = 6/13. A-t behelyettesítve 3 = 6/13 · (−5) + b ⇒ b = 69/13: <strong>y = 6/13 · x + 69/13</strong>.
              </li>
            </ol>
          </div>
          <TriangleMedianSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladat: egyenesek és Thalész-kör" badge="Kidolgozott 7." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Az e egyenes meredeksége −3, és az y tengelyt a (0; 6) pontban metszi.</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> e: <strong>y = −3x + 6</strong>.
              </li>
              <li>
                <strong>b)</strong> f ⊥ e ⇒ m_f = 1/3; A(−5; 0) ∈ f ⇒ 0 = −5/3 + b ⇒ b = 5/3: <strong>y = x/3 + 5/3</strong>.
              </li>
              <li>
                <strong>c)</strong> −3x + 6 = 2x − 9 ⇒ x = 3, y = −3: <strong>B(3; −3)</strong>.
              </li>
              <li>
                <strong>d)</strong> Tengelymetszetek: P(2; 0), Q(0; 6) ⇒ T = 6 · 2/2 = <strong>6</strong>.
              </li>
              <li>
                <strong>e)</strong> A Thalész-kör átmérője PQ: C(1; 3), r = √40/2 = √10 ⇒ <strong>(x − 1)² + (y − 3)² = 10</strong>. Az origó: 1 + 9 = 10 ✓, rajta van.
              </li>
            </ol>
          </div>
          <LinesThalesSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Megoldott feladatok a feladatsorból" badge="I–II. rész" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Alapfeladatok" badge="C1–C12, D4, D6, D10, D12" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A(−3; 8), B(7; −2): F(2; 3). a(−3; 8), b(7; −2): 2a(−6; 16), a + b(4; 6), b − a(10; −10).</li>
              <li>C(−5; 4) középpontú, origón átmenő kör: (x + 5)² + (y − 4)² = 41. P(−6; 9), Q(−1; −3): PQ = 13.</li>
              <li>y = 4x − 3 az x tengelyt (0,75; 0)-ban metszi. y = 5x − 7 ⊥ y = kx + 3 ⇔ 5k = −1, k = −1/5.</li>
              <li>(x − 2)² + (y + 5)² = 9 és P(0; −3): 4 + 4 = 8 ≠ 9, P nincs a körön. Az x² + (y − 5)² = 100 kör középpontja az y tengelyen van.</li>
              <li>Négyzet, H a BC B-hez közelebbi harmadolópontja: AH = b + d/3.</li>
              <li>m = −2/3, P(4; −2): y = −2/3 · x + 2/3. Metszéspont: −2x − 4 = 3x + 1 ⇒ (−1; −2).</li>
              <li>A(−3; 5), B(4; 2): AB = √58 ≈ 7,62, F(0,5; 3,5). 9x − 9y = 9 ⇒ y = x − 1, m = 1. K(−12; 5), r = 13: (x + 12)² + (y − 5)² = 169.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Összetett feladatok" badge="Q1, Q2, Q4, Q5, R5, S1" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a(5; 4), b(−1; 2), c(−6; −3): |a + b| = √52 ≈ 7,21 &lt; |c − a| = √170 ≈ 13,04.</li>
              <li>A(−17; 9), B(12; 11), C(7; −1): CA · CB = (−24) · 5 + 10 · 12 = 0 ⇒ C-nél derékszög; a háromszög és a köré írt kör területaránya 169 : (845π/4) = 4/(5π) ≈ 0,255.</li>
              <li>y = 2x + 11 és y = −0,5x + 3,5: 2 · (−0,5) = −1 ⇒ merőlegesek, metszéspont M(−3; 5); 4 db 6 egységnyi négyzet, középpontjaik köre (x + 3)² + (y − 5)² = 18.</li>
              <li>Túra P(3; 2) → Q(11; 17): 17 km. Aladár: (19; 32), 17 km; Béla: a PQ-ra merőleges irányban a folyóig (42,875; 0), 36,125 km; Cecil: x² − 14x + 67 = 0-nak nincs megoldása, ilyen pont nincs.</li>
              <li>A(−3; 5), az AB felezőmerőlegese y = x/3 + 1 ⇒ AB: y = −3x − 4, felezőpont (−1,5; 0,5), B(0; −4).</li>
              <li>Négyzet A(−3; −2), C(3; 2): oldal √26, T = 26; beírt kör x² + y² = 6,5, köré írt kör x² + y² = 13.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Tipikus hiba: merőleges meredekség és a kör egyenlete" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A merőleges meredekség a negatív reciprok"
          wrong="e: y = −3x + 6-ra merőleges egyenes meredeksége 3 (vagy −1/3)."
          wrongExplanation="Az ellentett (3) vagy a reciprok (−1/3) önmagában nem jó: a szorzatnak −1-nek kell lennie."
          correct="m_e · m_f = −1 ⇒ m_f = 1/3."
          correctExplanation="Ellenőrzés: (−3) · 1/3 = −1 ✓."
          tip="A kör egyenletében előjelváltás van: (x + 5)² + (y − 4)² = 41 középpontja C(−5; 4), és a jobb oldal r², nem r!"
        />
        <TheoryCallout type="info" title="AB vektor iránya">
          Az AB vektor koordinátái: VÉGPONT − KEZDŐPONT, vagyis (b₁ − a₁; b₂ − a₂). Fordítva a BA = −AB vektort kapnánk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium I: vektorműveletek" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['sum', 'a + b'],
                    ['diff', 'a − b'],
                    ['scale', 'λ · a']
                  ] as ['sum' | 'diff' | 'scale', string][]
                ).map(([k, t]) => (
                  <button key={k} onClick={() => setOp(k)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${op === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-100'}`}>
                    {t}
                  </button>
                ))}
              </div>
              {[
                ['a₁', a1, setA1, 'accent-blue-600'],
                ['a₂', a2, setA2, 'accent-blue-600'],
                ['b₁', b1, setB1, 'accent-emerald-600'],
                ['b₂', b2, setB2, 'accent-emerald-600']
              ].map(([t, v, set, acc]) => (
                <div key={t as string}>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">
                    {t as string} = {v as number}
                  </label>
                  <input type="range" min="-4" max="4" value={v as number} onChange={(e) => (set as (n: number) => void)(Number(e.target.value))} className={`w-full ${acc as string}`} aria-label={t as string} />
                </div>
              ))}
              {op === 'scale' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">λ = {fmt(lam)}</label>
                  <input type="range" min="-2" max="2" step="0.5" value={lam} onChange={(e) => setLam(Number(e.target.value))} className="w-full accent-purple-600" aria-label="lambda" />
                </div>
              )}
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
                <div>
                  a({a1}; {a2}), |a| = {fmt(len(a1, a2), 2)}; b({b1}; {b2}), |b| = {fmt(len(b1, b2), 2)}
                </div>
                <div>
                  {op === 'sum' ? 'a + b' : op === 'diff' ? 'a − b' : `${fmt(lam)} · a`} = (<strong>{fmt(res[0])}</strong>; <strong>{fmt(res[1])}</strong>), hossza ≈ <strong>{fmt(len(res[0], res[1]), 2)}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  {op === 'sum'
                    ? len(res[0], res[1]) < Math.min(len(a1, a2), len(b1, b2))
                      ? 'Most az összeg rövidebb mindkét vektornál – ez is lehetséges!'
                      : 'Paralelogramma-szabály: az összeg a két vektor által kifeszített paralelogramma átlója.'
                    : op === 'diff'
                      ? 'a − b a b végpontjából az a végpontjába mutat.'
                      : `|λ · a| = |λ| · |a| = ${fmt(Math.abs(lam) * len(a1, a2), 2)}; ${lam < 0 ? 'ellentétes irányú.' : lam > 0 ? 'azonos irányú.' : 'nullvektor.'}`}
                </div>
              </div>
            </div>
            <svg viewBox="0 0 320 320" className="w-full max-w-sm h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
              <Grid c={LAB1} step={1} labelEvery={2} fontSize={8} />
              {op === 'sum' && (
                <>
                  <line x1={pl1.X(a1)} y1={pl1.Y(a2)} x2={pl1.X(a1 + b1)} y2={pl1.Y(a2 + b2)} stroke="#94a3b8" strokeDasharray="4 3" />
                  <line x1={pl1.X(b1)} y1={pl1.Y(b2)} x2={pl1.X(a1 + b1)} y2={pl1.Y(a2 + b2)} stroke="#94a3b8" strokeDasharray="4 3" />
                </>
              )}
              {op === 'diff' && (len(a1 - b1, a2 - b2) > 0) && <Arrow from={pl1.P(b1, b2)} to={pl1.P(a1, a2)} color={S_PURPLE} dashed />}
              {len(a1, a2) > 0 && <Arrow from={pl1.P(0, 0)} to={pl1.P(a1, a2)} color={S_BLUE} />}
              {op !== 'scale' && len(b1, b2) > 0 && <Arrow from={pl1.P(0, 0)} to={pl1.P(b1, b2)} color={S_GREEN} />}
              {len(res[0], res[1]) > 0 && <Arrow from={pl1.P(0, 0)} to={pl1.P(res[0], res[1])} color={S_RED} width={2.8} />}
              <text x={pl1.X(a1) + 4} y={pl1.Y(a2) - 4} fontSize="12" fontWeight="bold" fill={S_BLUE}>
                a
              </text>
              {op !== 'scale' && (
                <text x={pl1.X(b1) + 4} y={pl1.Y(b2) - 4} fontSize="12" fontWeight="bold" fill={S_GREEN}>
                  b
                </text>
              )}
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium II: két pontból minden" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-3">
                {ptInput(P1, setP1, 'A')}
                {ptInput(P2, setP2, 'B')}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'A(−5; 3), C(4; 12)', v: [[-5, 3], [4, 12]] },
                  { t: 'P(2; 0), Q(0; 6)', v: [[2, 0], [0, 6]] },
                  { t: 'A(−3; 8), B(7; −2)', v: [[-3, 8], [7, -2]] },
                  { t: 'A(−3; −2), C(3; 2)', v: [[-3, -2], [3, 2]] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setP1(p.v[0] as [number, number]);
                      setP2(p.v[1] as [number, number]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              {geo.same ? (
                <div className="text-rose-700 font-bold">Adj meg két különböző pontot!</div>
              ) : (
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                  <div>
                    AB vektor: ({geo.dx}; {geo.dy}), AB = √{geo.dx * geo.dx + geo.dy * geo.dy} ≈ <strong>{fmt(geo.d, 3)}</strong>
                  </div>
                  <div>
                    Felezőpont: <strong>F({fmt(geo.F[0])}; {fmt(geo.F[1])})</strong>
                  </div>
                  <div>
                    Meredekség: <strong>{geo.dx === 0 ? 'nincs (az y tengellyel párhuzamos)' : frac(geo.dy, geo.dx)}</strong>
                  </div>
                  <div>
                    Az AB egyenes: <strong>{geo.line}</strong>
                  </div>
                  <div>
                    Felezőmerőleges: <strong>{geo.bis}</strong>
                  </div>
                  <div>
                    Thalész-kör (AB átmérő): <strong>{geo.circ}</strong>
                  </div>
                </div>
              )}
            </div>
            <svg viewBox="0 0 320 320" className="w-full max-w-sm h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
              <Grid c={LAB2} step={1} labelEvery={5} fontSize={8} />
              {!geo.same && (
                <>
                  <circle cx={pl2.X(geo.F[0])} cy={pl2.Y(geo.F[1])} r={(geo.d / 2) * pl2.sx} fill="none" stroke={S_PURPLE} strokeWidth="1.3" strokeDasharray="5 4" />
                  {(() => {
                    // egyenes és felezőmerőleges kirajzolása a keretig
                    const ext = (px: number, py: number, vx: number, vy: number, color: string, dashed = false) => {
                      const L = 40;
                      return (
                        <line x1={pl2.X(px - L * vx)} y1={pl2.Y(py - L * vy)} x2={pl2.X(px + L * vx)} y2={pl2.Y(py + L * vy)} stroke={color} strokeWidth="1.6" strokeDasharray={dashed ? '6 4' : undefined} />
                      );
                    };
                    const l = geo.d;
                    return (
                      <>
                        {ext(P1[0], P1[1], geo.dx / l, geo.dy / l, S_BLUE)}
                        {ext(geo.F[0], geo.F[1], -geo.dy / l, geo.dx / l, S_AMBER, true)}
                      </>
                    );
                  })()}
                  <Arrow from={pl2.P(P1[0], P1[1])} to={pl2.P(P2[0], P2[1])} color={S_RED} width={2.4} />
                  <circle cx={pl2.X(geo.F[0])} cy={pl2.Y(geo.F[1])} r="3.5" fill={S_AMBER} />
                </>
              )}
              <circle cx={pl2.X(P1[0])} cy={pl2.Y(P1[1])} r="4" fill={S_INK} />
              <circle cx={pl2.X(P2[0])} cy={pl2.Y(P2[1])} r="4" fill={S_INK} />
              <text x={pl2.X(P1[0]) + 5} y={pl2.Y(P1[1]) - 5} fontSize="12" fontWeight="bold" fill={S_INK}>
                A
              </text>
              <text x={pl2.X(P2[0]) + 5} y={pl2.Y(P2[1]) - 5} fontSize="12" fontWeight="bold" fill={S_INK}>
                B
              </text>
              <rect x="0" y="0" width="320" height="10" fill="#f8fafc" />
              <rect x="0" y="310" width="320" height="10" fill="#f8fafc" />
              <rect x="0" y="0" width="10" height="320" fill="#f8fafc" />
              <rect x="310" y="0" width="10" height="320" fill="#f8fafc" />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default VectorsCoordinatesSummaryTheory;
