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
  GroupParallelogramSvg,
  RotatedVectorsSquareSvg,
  SquareFromCenterSvg,
  ParallelogramThreeCasesSvg,
  VarignonSvg,
  OctagonWellSvg
} from './CoordGroupPracticeFigures';
import { MidpointPlane, MidpointArrow, CP } from '../felezopont/MidpointFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', '−');
};
const pt = (p: CP) => `(${fmt(p[0])}; ${fmt(p[1])})`;
const sub = (P: CP, Q: CP): CP => [P[0] - Q[0], P[1] - Q[1]];
const add = (P: CP, Q: CP): CP => [P[0] + Q[0], P[1] + Q[1]];
const len = (v: CP) => Math.hypot(v[0], v[1]);

const fitWindow = (pts: CP[]): { x: [number, number]; y: [number, number]; unit: number } => {
  const xs = [0, ...pts.map((p) => p[0])];
  const ys = [0, ...pts.map((p) => p[1])];
  const x: [number, number] = [Math.floor(Math.min(...xs)) - 1, Math.ceil(Math.max(...xs)) + 1];
  const y: [number, number] = [Math.floor(Math.min(...ys)) - 1, Math.ceil(Math.max(...ys)) + 1];
  const unit = Math.max(5, Math.min(30, 300 / Math.max(x[1] - x[0], y[1] - y[0])));
  return { x, y, unit };
};

const PointInputs: React.FC<{ label: string; p: CP; set: (p: CP) => void }> = ({ label, p, set }) => (
  <div className="grid grid-cols-[4.5rem_1fr_1fr] gap-2 items-center">
    <span className="text-xs font-semibold text-slate-600">{label}</span>
    {[0, 1].map((k) => (
      <input
        key={k}
        type="number"
        step="0.5"
        value={p[k]}
        onChange={(e) => {
          const v = Number(e.target.value) || 0;
          set(k === 0 ? [v, p[1]] : [p[0], v]);
        }}
        className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
        aria-label={`${label} ${k + 1}. koordinátája`}
      />
    ))}
  </div>
);

export const CoordGroupPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: paralelogramma negyedik csúcsa
  const [pA, setPA] = useState<CP>([3, -10]);
  const [pB, setPB] = useState<CP>([-3, -6]);
  const [pC, setPC] = useState<CP>([1, 4]);
  const [caseIdx, setCaseIdx] = useState(0);

  // Labor II: négyzet a középpontból és egy csúcsból
  const [sK, setSK] = useState<CP>([-4, -2.5]);
  const [sA, setSA] = useState<CP>([-3, -5.5]);

  // Labor III: |u + v| és |u − v|
  const [uLen, setULen] = useState(3);
  const [vLen, setVLen] = useState(4);
  const [phi, setPhi] = useState(90);

  // Labor I számítások
  const D1 = sub(add(pA, pC), pB);
  const D2 = sub(add(pA, pB), pC);
  const D3 = sub(add(pB, pC), pA);
  const cases = [
    { name: 'ABCD₁', D: D1, poly: [pA, pB, pC, D1], diag: [len(sub(pC, pA)), len(sub(D1, pB))], diagNames: ['AC', 'BD₁'], color: '#2563eb' },
    { name: 'ACBD₂', D: D2, poly: [pA, pC, pB, D2], diag: [len(sub(pB, pA)), len(sub(D2, pC))], diagNames: ['AB', 'CD₂'], color: '#059669' },
    { name: 'ABD₃C', D: D3, poly: [pA, pB, D3, pC], diag: [len(sub(pC, pB)), len(sub(D3, pA))], diagNames: ['BC', 'AD₃'], color: '#7c3aed' }
  ];
  const cross = (pB[0] - pA[0]) * (pC[1] - pA[1]) - (pC[0] - pA[0]) * (pB[1] - pA[1]);
  const collinear = Math.abs(cross) < 1e-9;
  const win1 = fitWindow([pA, pB, pC, D1, D2, D3]);
  const act = cases[caseIdx];

  // Labor II számítások
  const KA = sub(sA, sK);
  const KB: CP = [-KA[1], KA[0]]; // +90°
  const sB = add(sK, KB);
  const sC = sub(sK, KA);
  const sD = sub(sK, KB);
  const diag = 2 * len(KA);
  const side = diag / Math.SQRT2;
  const win2 = fitWindow([sA, sB, sC, sD, sK]);

  // Labor III számítások
  const rad = (phi * Math.PI) / 180;
  const u: CP = [uLen, 0];
  const v: CP = [vLen * Math.cos(rad), vLen * Math.sin(rad)];
  const sum = len(add(u, v));
  const diff = len(sub(u, v));
  const S3 = 15;
  const O3 = { x: 105, y: 150 };
  const P3 = (w: CP) => ({ x: O3.x + w[0] * S3, y: O3.y - w[1] * S3 });

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="gyakorlas-csoportban"
      title="8. Gyakorlás csoportban"
      subtitle="Csoportmunka a vektorok és a koordináták témaköréből: paralelogramma és négyzet csúcsai, vektorok hossza és elforgatása, |→u + →v| és |→u − →v|, oldalfelező pontok."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_koordinatageometria_gyakorlas_csoportban_tananyag.pdf"
      practiceTitle="Készen állsz a vegyes koordinátageometriai feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'ÖSSZEFOGLALÓ — AMIT EDDIG TANULTUNK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                →AB = (b₁ − a₁; b₂ − a₂), |→v| = √(v₁² + v₂²), F = ((a₁ + b₁)/2; (a₂ + b₂)/2)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Elforgatás:</strong> (v₁; v₂) +90°-os elforgatottja (−v₂; v₁), −90°-os elforgatottja (v₂; −v₁).
              </li>
              <li>
                <strong>Paralelogramma, négyzet:</strong> az átlók felezik egymást ⇒ a K középpont minden átló felezőpontja; D = A + C − B.
              </li>
              <li>
                <strong>Hosszak:</strong> |→u + →v| és |→u − →v| a vektorok szögétől függ: merőlegesnél Pitagorasz-tétel, párhuzamosnál összeg vagy különbség.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Összefoglaló: vektorok és koordináták" badge="Ismétlés" badgeColor="blue">
        <TheoryTable
          headers={['Fogalom', 'Koordinátákkal', 'Példa']}
          rows={[
            ['vektor bázisvektorokkal', '→a = a₁→i + a₂→j ⇔ →a(a₁; a₂)', '→a = 6→i − 8→j ⇒ →a(6; −8)'],
            ['összeg, különbség', '(a₁ ± b₁; a₂ ± b₂)', '(6; −8) + (12; 5) = (18; −3)'],
            ['számszoros', 'λ→a = (λa₁; λa₂)', '2 · (−3; 4) = (−6; 8)'],
            ['két pont által meghatározott vektor', '→AB = (b₁ − a₁; b₂ − a₂) (végpont − kezdőpont)', 'A(−4; −3), B(3; −1) ⇒ →AB = (7; 2)'],
            ['vektor hossza, két pont távolsága', '|→v| = √(v₁² + v₂²)', '|(6; −8)| = 10, AB = √53 ≈ 7,28'],
            ['+90°, −90°-os elforgatás', '(−v₂; v₁), (v₂; −v₁)', '(6; −8) ↦ (8; 6), illetve (−8; −6)'],
            ['felezőpont', 'F((a₁ + b₁)/2; (a₂ + b₂)/2)', 'A(−4; 3), B(10; 7) ⇒ F(3; 5)'],
            ['szemközti csúcs a középpontból', 'C = 2K − A', 'K(−1; 2), A(−4; −3) ⇒ C(2; 7)']
          ]}
        />
        <TheoryCallout type="info" title="A csoportmunka szabályai">
          2–3 fős csoportokban dolgozzatok! Minden feladatnál először készítsetek vázlatot a koordináta-rendszerben, utána számoljatok, végül ellenőrizzétek egymás eredményét (például a felezőpont visszaszámolásával vagy a hosszak összevetésével).
        </TheoryCallout>
      </TheorySection>

      {/* 2. I. feladatsorozat */}
      <TheorySection title="2. I. feladatsorozat – kidolgozott megoldások" badge="Tankönyv 234. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Paralelogramma a középpontjából" badge="I/1." badgeColor="sky">
            <GroupParallelogramSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−4; −3), B(3; −1), K(−1; 2). K az átlók felezőpontja: C = 2K − A = <strong>(2; 7)</strong>, D = 2K − B = <strong>(−5; 5)</strong>.</li>
              <li>→AB = (7; 2) ⇒ AB = √53 ≈ <strong>7,28</strong>; →AD = (−1; 8) ⇒ AD = √65 ≈ <strong>8,06</strong>.</li>
              <li>Átlóvektorok: →AC = <strong>(6; 10)</strong>, →BD = <strong>(−8; 6)</strong> (hosszuk √136 ≈ 11,66 és 10).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Vektorok a bázisvektorokkal" badge="I/2." badgeColor="purple">
            <RotatedVectorsSquareSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>→a = 6→i − 8→j ⇒ <strong>→a(6; −8)</strong>, →b = 12→i + 5→j ⇒ <strong>→b(12; 5)</strong>.</li>
              <li>|→a| = √(36 + 64) = <strong>10</strong>, |→b| = √(144 + 25) = <strong>13</strong>.</li>
              <li>Közös kezdőpontból a végpontok távolsága |→a − →b| = |(−6; −13)| = √205 ≈ <strong>14,32</strong>.</li>
              <li>→a, a +90°-os (8; 6), a −90°-os (−8; −6) elforgatottja és −→a(−6; 8) végpontjai egy <strong>négyzet</strong> csúcsai (az átlók egyenlők, merőlegesek és felezik egymást).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Négyzet két szemközti csúcsából" badge="I/3." badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−3; 1), C(0; 6): →AC = (3; 5), az átló √34.</li>
              <li>Terület: T = e²/2 = 34/2 = <strong>17</strong>; oldal √17, kerület 4√17 ≈ <strong>16,49</strong>.</li>
              <li>A középpont K(−1,5; 3,5), →KA = (−1,5; −2,5). Ennek +90°-os elforgatottja (2,5; −1,5), így <strong>B(1; 2)</strong> és <strong>D(−4; 5)</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. |→u| = 3, |→v| = 4" badge="I/4." badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> |→u + →v| = 5 = √(3² + 4²) ⇒ a két vektor <strong>merőleges</strong>, pl. →u(3; 0), →v(0; 4).</li>
              <li><strong>b)</strong> |→u − →v| = 7 = 3 + 4 ⇒ →u és →v <strong>ellentétes irányú</strong>, pl. →u(3; 0), →v(−4; 0).</li>
              <li>Sok jó megoldás van: bármely ilyen vektorpár elforgatottja is megfelel.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. II. feladatsorozat */}
      <TheorySection title="3. II. feladatsorozat – kidolgozott megoldások" badge="Tankönyv 234. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Négyzet a középpontból és egy csúcsból" badge="II/1." badgeColor="sky">
            <SquareFromCenterSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>K(−4; −2,5), A(−3; −5,5): →KA = (1; −3), |→KA| = √10, az átló 2√10.</li>
              <li>T = (2√10)²/2 = <strong>20</strong>, az oldal √20 = 2√5, K = 8√5 ≈ <strong>17,89</strong>.</li>
              <li>→KB = →KA +90°-os elforgatottja = (3; 1) ⇒ <strong>B(−1; −1,5)</strong>; C = 2K − A = <strong>(−5; 0,5)</strong>; D = K − (3; 1) = <strong>(−7; −3,5)</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Paralelogramma három csúcsából" badge="II/2." badgeColor="purple">
            <ParallelogramThreeCasesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(3; −10), B(−3; −6), C(1; 4). <strong>Három eset van</strong>, aszerint, hogy melyik adott csúccsal szemközti a negyedik.</li>
              <li>D₁ = A + C − B = <strong>(7; 0)</strong>: átlók AC ≈ 14,14 és BD₁ ≈ 11,66.</li>
              <li>D₂ = A + B − C = <strong>(−1; −20)</strong>: átlók AB ≈ 7,21 és CD₂ ≈ 24,08.</li>
              <li>D₃ = B + C − A = <strong>(−5; 8)</strong>: átlók BC ≈ 10,77 és AD₃ ≈ 19,70.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. |→u| = 3, |→v| = 4 – másik változat" badge="II/3." badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> |→u − →v| = 5 ⇒ merőlegesek: →u(3; 0), →v(0; 4) ⇒ →u − →v = (3; −4), hossza 5.</li>
              <li><strong>b)</strong> |→u + →v| = 1 = 4 − 3 ⇒ ellentétes irányúak: →u(3; 0), →v(−4; 0).</li>
              <li><strong>HF 3.</strong> |→u − →v| = 1 és |→u + →v| = 7 ⇒ egyirányúak: →u(3; 0), →v(4; 0).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Az oldalfelező pontok négyszöge" badge="II/4." badgeColor="orange">
            <VarignonSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(0; 0), B(6; 0), C(1; 8), D(−4; 4): <strong>E(3; 0), F(3,5; 4), G(−1,5; 6), H(−2; 2)</strong>.</li>
              <li>→HE = (5; −2) és →GF = (5; −2), tehát <strong>→HE = →GF</strong>.</li>
              <li>Az EFGH négyszög <strong>paralelogramma</strong>: HE és GF párhuzamos és egyenlő hosszú, mert mindkettő a BD átló felével egyenlő vektor (középvonalak az ABD és CBD háromszögben).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Házi feladat és Ráadás */}
      <TheorySection title="4. Házi feladatok és Ráadás" badge="Ellenőrzés" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Házi feladatok eredményei" badge="HF" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> A(5; −12), B(−6; 8), K(−1; −4): C = 2K − A = (−7; 4), D = 2K − B = (4; −16); átlók AC = 20, BD = 26.</li>
              <li><strong>HF 2.</strong> Középpont az origó, A(5; −12): C(−5; 12), B(12; 5), D(−12; −5) (±90°-os elforgatás); átló 26, terület 26²/2 = 338.</li>
              <li><strong>HF 3.</strong> |→u − →v| = 1 és |→u + →v| = 7 ⇒ egyirányú vektorok, pl. →u(3; 0), →v(4; 0).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ráadás: a kút nyolcszög alakú kávája" badge="Ráadás" badgeColor="rose">
            <OctagonWellSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>O(1; 3), A(4; −1): →OA = (3; −4), |→OA| = 5. A C csúcs 90°-kal elforgatva: →OC = (4; 3) ⇒ <strong>C(5; 6)</strong>.</li>
              <li>OABC deltoid, ezért OB felezi az AC átlót: F(4,5; 2,5), →OF = (3,5; −0,5), |→OF| = √12,5 ≈ 3,54.</li>
              <li>→OB párhuzamos →OF-fel és 5 hosszú: →OB = (5/√12,5) · (3,5; −0,5) = √2 · (3,5; −0,5) ≈ (4,95; −0,71).</li>
              <li>Így <strong>B ≈ (5,95; 2,29)</strong>, pontosan B(1 + 3,5√2; 3 − 0,5√2).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: csak egy paralelogrammát keresünk" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Három csúcsból a negyedik csúcs NEM egyértelmű"
          wrong="„A(3; −10), B(−3; −6), C(1; 4) ⇒ D(7; 0), és kész.”"
          wrongExplanation="Ha nincs megadva a betűzés sorrendje, a negyedik csúcs bármelyik adott csúccsal szemben lehet. A D(7; 0) csak az ABCD sorrendhez tartozik."
          correct="Három eset: D₁ = A + C − B = (7; 0), D₂ = A + B − C = (−1; −20), D₃ = B + C − A = (−5; 8)"
          correctExplanation="Mindhárom esetben a szemközti csúcsok összege egyenlő (az átlók felezőpontja közös). Az átlók hossza esetenként más."
          tip="Az elforgatásnál is figyelj az előjelre: (v₁; v₂) +90°-kal (−v₂; v₁), −90°-kal (v₂; −v₁) lesz – a két eset a négyzet két különböző csúcsát adja."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: A paralelogramma negyedik csúcsa" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <PointInputs label="A csúcs" p={pA} set={setPA} />
              <PointInputs label="B csúcs" p={pB} set={setPB} />
              <PointInputs label="C csúcs" p={pC} set={setPC} />
              <div className="flex flex-wrap gap-2">
                {cases.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setCaseIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${i === caseIdx ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    {c.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setPA([3, -10]);
                    setPB([-3, -6]);
                    setPC([1, 4]);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  II/2. adatai
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                {collinear ? (
                  <div className="font-sans text-rose-700 font-bold">A három pont egy egyenesen van – nincs ilyen paralelogramma.</div>
                ) : (
                  <>
                    <div>D₁ = A + C − B = {pt(D1)}</div>
                    <div>D₂ = A + B − C = {pt(D2)}</div>
                    <div>D₃ = B + C − A = {pt(D3)}</div>
                    <div className="pt-1" style={{ color: act.color }}>
                      {act.name}: átlók {act.diagNames[0]} ≈ {fmt(act.diag[0])}, {act.diagNames[1]} ≈ {fmt(act.diag[1])}
                    </div>
                  </>
                )}
              </div>
            </div>
            <MidpointPlane
              x={win1.x}
              y={win1.y}
              unit={win1.unit}
              grid={win1.x[1] - win1.x[0] > 20 || win1.y[1] - win1.y[0] > 20 ? 5 : 1}
              labels={5}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              polys={collinear ? [] : [{ pts: act.poly, fill: 'rgba(37,99,235,0.08)', stroke: act.color }]}
              segs={
                collinear
                  ? []
                  : [
                      { from: act.poly[0], to: act.poly[2], color: '#b45309', dashed: true, width: 1.3 },
                      { from: act.poly[1], to: act.poly[3], color: '#b45309', dashed: true, width: 1.3 }
                    ]
              }
              points={[
                { at: pA, label: 'A', dx: -8, dy: -6 },
                { at: pB, label: 'B', dx: -8, dy: -6 },
                { at: pC, label: 'C', dx: -8, dy: -6 },
                ...(collinear
                  ? []
                  : cases.map((c, i) => ({
                      at: c.D,
                      label: `D${'₁₂₃'[i]}`,
                      dx: 10,
                      dy: -6,
                      color: c.color,
                      hollow: i !== caseIdx
                    })))
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Négyzet a középpontból és egy csúcsból" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <PointInputs label="K középpont" p={sK} set={setSK} />
              <PointInputs label="A csúcs" p={sA} set={setSA} />
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'II/1.', K: [-4, -2.5] as CP, A: [-3, -5.5] as CP },
                  { name: 'HF 2.', K: [0, 0] as CP, A: [5, -12] as CP },
                  { name: 'Ráadás (90°-os lépés)', K: [1, 3] as CP, A: [4, -1] as CP }
                ].map((pr) => (
                  <button
                    key={pr.name}
                    onClick={() => {
                      setSK(pr.K);
                      setSA(pr.A);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>→KA = {pt(KA)}, +90°-kal: →KB = {pt(KB)}</div>
                <div>B = K + →KB = <strong>{pt(sB)}</strong></div>
                <div>C = 2K − A = <strong>{pt(sC)}</strong></div>
                <div>D = K − →KB = <strong>{pt(sD)}</strong></div>
                <div>átló = 2 · |→KA| ≈ {fmt(diag)}, oldal ≈ {fmt(side)}</div>
                <div>T = átló²/2 = {fmt((diag * diag) / 2)}, K ≈ {fmt(4 * side)}</div>
              </div>
            </div>
            <MidpointPlane
              x={win2.x}
              y={win2.y}
              unit={win2.unit}
              grid={win2.x[1] - win2.x[0] > 20 || win2.y[1] - win2.y[0] > 20 ? 5 : 1}
              labels={win2.x[1] - win2.x[0] > 20 ? 5 : 2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              polys={len(KA) > 0 ? [{ pts: [sA, sB, sC, sD], fill: 'rgba(124,58,237,0.08)', stroke: '#7c3aed' }] : []}
              vecs={[
                { from: sK, to: sA, color: '#2563eb', width: 2 },
                { from: sK, to: sB, color: '#dc2626', width: 2 }
              ]}
              rightAngles={len(KA) > 0 ? [{ at: sK, p: sA, q: sB, color: '#dc2626' }] : []}
              points={[
                { at: sK, label: 'K', dx: -9, dy: -5, color: '#dc2626' },
                { at: sA, label: 'A', dx: 9, dy: 4, color: '#2563eb' },
                { at: sB, label: 'B', dx: 9, dy: 4 },
                { at: sC, label: 'C', dx: 9, dy: 4 },
                { at: sD, label: 'D', dx: 9, dy: 4 }
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor III */}
      <TheorySection title="8. Interaktív Laboratórium III: |→u + →v| és |→u − →v|" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">|→u| = {uLen}</label>
                <input type="range" min="1" max="6" step="1" value={uLen} onChange={(e) => setULen(Number(e.target.value))} className="w-full accent-blue-600" aria-label="u hossza" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">|→v| = {vLen}</label>
                <input type="range" min="1" max="6" step="1" value={vLen} onChange={(e) => setVLen(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="v hossza" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a két vektor szöge: {phi}°</label>
                <input type="range" min="0" max="180" step="5" value={phi} onChange={(e) => setPhi(Number(e.target.value))} className="w-full accent-rose-600" aria-label="szög" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 90, 180].map((a) => (
                  <button key={a} onClick={() => setPhi(a)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    {a}°
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>→u = {pt(u)}, →v ≈ {pt(v)}</div>
                <div className="text-violet-700">|→u + →v| ≈ <strong>{fmt(sum)}</strong></div>
                <div className="text-rose-700">|→u − →v| ≈ <strong>{fmt(diff)}</strong></div>
                <div className="text-xs text-slate-500">
                  {phi === 90
                    ? 'Merőlegesek: mindkettő √(|u|² + |v|²).'
                    : phi === 0
                      ? 'Egyirányúak: |u + v| = |u| + |v|, |u − v| = ||u| − |v||.'
                      : phi === 180
                        ? 'Ellentétes irányúak: |u + v| = ||u| − |v||, |u − v| = |u| + |v|.'
                        : 'Az értékek ||u| − |v|| és |u| + |v| közé esnek.'}
                </div>
              </div>
            </div>
            <svg viewBox="0 0 300 200" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {(() => {
                const O = O3;
                const U = P3(u);
                const V = P3(v);
                const SUM = P3(add(u, v));
                return (
                  <g>
                    <line x1={U.x} y1={U.y} x2={SUM.x} y2={SUM.y} stroke="#94a3b8" strokeDasharray="4 3" />
                    <line x1={V.x} y1={V.y} x2={SUM.x} y2={SUM.y} stroke="#94a3b8" strokeDasharray="4 3" />
                    <MidpointArrow x1={O.x} y1={O.y} x2={SUM.x} y2={SUM.y} color="#7c3aed" width={2.2} />
                    <MidpointArrow x1={V.x} y1={V.y} x2={U.x} y2={U.y} color="#dc2626" width={2.2} dashed />
                    <MidpointArrow x1={O.x} y1={O.y} x2={U.x} y2={U.y} color="#2563eb" width={2.6} />
                    <MidpointArrow x1={O.x} y1={O.y} x2={V.x} y2={V.y} color="#059669" width={2.6} />
                    <text x={U.x + 4} y={U.y + 14} fontSize="11" fontWeight="bold" fill="#2563eb">u</text>
                    <text x={V.x - 12} y={V.y - 4} fontSize="11" fontWeight="bold" fill="#059669">v</text>
                    <text x={SUM.x + 4} y={SUM.y - 4} fontSize="11" fontWeight="bold" fill="#7c3aed">u + v</text>
                    <text x={(U.x + V.x) / 2 + 6} y={(U.y + V.y) / 2 + 12} fontSize="11" fontWeight="bold" fill="#dc2626">u − v</text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CoordGroupPracticeTheory;
