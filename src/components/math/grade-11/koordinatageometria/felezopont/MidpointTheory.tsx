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
  EscalatorMidpointSvg,
  MidpointParallelogramSvg,
  MidpointFormulaSvg,
  QuarterPointsSvg,
  CentroidSvg,
  VerticesFromMidpointsSvg,
  MidpointPlane,
  CP
} from './MidpointFigures';

/** Magyar számformátum: tizedesvessző, valódi mínuszjel, felesleges nullák nélkül. */
const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', '−');
};
const pt = (p: CP) => `(${fmt(p[0])}; ${fmt(p[1])})`;

/** Ablak, amely az összes pontot (és az origót) tartalmazza. */
const fitWindow = (pts: CP[]): { x: [number, number]; y: [number, number]; unit: number } => {
  const xs = [0, ...pts.map((p) => p[0])];
  const ys = [0, ...pts.map((p) => p[1])];
  const x: [number, number] = [Math.floor(Math.min(...xs)) - 1, Math.ceil(Math.max(...xs)) + 1];
  const y: [number, number] = [Math.floor(Math.min(...ys)) - 1, Math.ceil(Math.max(...ys)) + 1];
  const unit = Math.max(6, Math.min(30, 300 / Math.max(x[1] - x[0], y[1] - y[0])));
  return { x, y, unit };
};

const DIV_PRESETS: { name: string; A: CP; B: CP; t: number }[] = [
  { name: 'Mozgólépcső', A: [0, -2], B: [12, 4], t: 0.5 },
  { name: 'Kidolgozott feladat', A: [-4, 3], B: [10, 7], t: 0.5 },
  { name: '2. feladat (meghosszabbítás)', A: [-2, 5], B: [-3, -1], t: 2 },
  { name: '3. feladat (tükrözés P-re)', A: [3, -1], B: [7, -4], t: 2 },
  { name: 'Harmadolópont', A: [0, 0], B: [6, 9], t: 1 / 3 }
];

export const MidpointTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: osztópont csúszkával
  const [ax, setAx] = useState(-4);
  const [ay, setAy] = useState(3);
  const [bx, setBx] = useState(10);
  const [by, setBy] = useState(7);
  const [t, setT] = useState(0.5);

  // Labor II: háromszög – oldalfelező pontok, súlypont
  const [mode, setMode] = useState<'fromVertices' | 'fromMidpoints'>('fromVertices');
  const [tri, setTri] = useState<CP[]>([
    [-6, 2],
    [2, 0],
    [1, 7]
  ]);

  const P: CP = [ax + t * (bx - ax), ay + t * (by - ay)];
  const F: CP = [(ax + bx) / 2, (ay + by) / 2];
  const lenAB = Math.hypot(bx - ax, by - ay);
  const inside = t > 1e-9 && t < 1 - 1e-9;
  const ratioText = inside ? `${fmt(t, 3)} : ${fmt(1 - t, 3)}` : t <= 1e-9 ? (t === 0 ? 'P = A' : 'A-n túl') : t >= 1 - 1e-9 && t <= 1 + 1e-9 ? 'P = B' : 'B-n túl';

  // Labor II számítások
  let A: CP, B: CP, C: CP;
  if (mode === 'fromVertices') {
    [A, B, C] = tri;
  } else {
    // tri = [P (AC), Q (AB), R (BC)] oldalfelező pontok
    const [Pm, Qm, Rm] = tri;
    A = [Pm[0] + Qm[0] - Rm[0], Pm[1] + Qm[1] - Rm[1]];
    B = [Qm[0] + Rm[0] - Pm[0], Qm[1] + Rm[1] - Pm[1]];
    C = [Pm[0] + Rm[0] - Qm[0], Pm[1] + Rm[1] - Qm[1]];
  }
  const mid = (U: CP, V: CP): CP => [(U[0] + V[0]) / 2, (U[1] + V[1]) / 2];
  const Fbc = mid(B, C);
  const Fac = mid(A, C);
  const Fab = mid(A, B);
  const S: CP = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  const area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / 2;
  const dist = (U: CP, V: CP) => Math.hypot(V[0] - U[0], V[1] - U[1]);
  const win = fitWindow([A, B, C]);
  const labels = ['A', 'B', 'C'];
  const midLabels = ['P (AC felezőpontja)', 'Q (AB felezőpontja)', 'R (BC felezőpontja)'];

  const slider = (label: string, val: number, set: (v: number) => void, accent: string) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}: {fmt(val)}
      </label>
      <input
        type="range"
        min="-12"
        max="12"
        step="1"
        value={val}
        onChange={(e) => set(Number(e.target.value))}
        className={`w-full ${accent}`}
        aria-label={label}
      />
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="felezopont"
      title="7. Felezőpont"
      subtitle="A szakasz felezőpontjának koordinátái a végpontok koordinátáinak átlaga. Negyedelőpontok, meghosszabbítás, tükrözés, nagyítás egy pontból és a háromszög súlypontja."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_felezopont_tananyag.pdf"
      practiceTitle="Készen állsz a felezőpontos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FELEZŐPONT KOORDINÁTÁI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                A(a₁; a₂), B(b₁; b₂) ⇒ F((a₁ + b₁)/2; (a₂ + b₂)/2)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Helyvektorokkal: <strong>→f = ½(→a + →b)</strong> – a felezőpont helyvektora a végpontok helyvektorainak „átlaga”.
              </li>
              <li>
                Visszafelé: ha F az AB felezőpontja, akkor <strong>B = 2F − A</strong> (koordinátánként) – így tükrözünk pontra, így hosszabbítunk meg szakaszt.
              </li>
              <li>
                A háromszög súlypontja: <strong>S((a₁ + b₁ + c₁)/3; (a₂ + b₂ + c₂)/3)</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: hol jár a mozgólépcső utasa?" badge="Tankönyv 232. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy áruház mozgólépcsője az utcaszint alatti 2 méteres mélységből, az <strong>A(0; −2)</strong> pontból indulva egyenletes sebességgel 30 másodperc alatt a <strong>B(12; 4)</strong> pontba viszi fel a vásárlókat. Hol lesz a vásárló 15 másodperccel azután, hogy rálépett a lépcsőre?
            </p>
            <p>
              15 másodperc az út fele, ezért a vásárló az AB szakasz <strong>F felezőpontjában</strong> lesz. Az ábráról leolvasható: <strong>F(6; 1)</strong>. Tehát 6 métert haladt előre vízszintesen, és az utcaszint felett 1 méter magasan van.
            </p>
            <p className="text-xs text-slate-500">
              Figyeld meg: 6 = (0 + 12)/2 és 1 = (−2 + 4)/2 – a felezőpont koordinátái a végpontok koordinátáinak átlagai.
            </p>
          </div>
          <EscalatorMidpointSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat + elmélet */}
      <TheorySection title="2. A felezőpont koordinátái – helyvektorokkal" badge="Kidolgozott feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <MidpointParallelogramSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Feladat:</strong> határozzuk meg az AB szakasz F felezőpontjának koordinátáit, ha A(−4; 3) és B(10; 7)!
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az →a(−4; 3) és →b(10; 7) helyvektorokkal megrajzoljuk az AOBP paralelogrammát.</li>
              <li>
                A paralelogramma <strong>átlói felezik egymást</strong>, ezért az OF helyvektor (jelölje →f) az →OP átlóvektor fele.
              </li>
              <li>→OP = →a + →b = (−4; 3) + (10; 7) = (6; 10).</li>
              <li>
                →f = ½ →OP = ½(→a + →b) = ½(6; 10) = <strong>(3; 5)</strong>.
              </li>
              <li>
                Mivel →f helyvektor, végpontjának koordinátái megegyeznek a vektor koordinátáival: <strong>F(3; 5)</strong>.
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryCard title="Felezőpont koordinátái" badge="Elmélet" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy szakasz két végpontja az A(a₁; a₂) és a B(b₁; b₂) pont, akkor a szakasz felezőpontja
              <strong> F((a₁ + b₁)/2; (a₂ + b₂)/2)</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>Koordinátánként külön-külön kell átlagolni: az első koordinátákat egymással, a másodikakat egymással.</li>
              <li>A sorrend mindegy: az AB és a BA szakasz felezőpontja ugyanaz.</li>
              <li>A képlet negatív koordinátákra is igaz – ügyelj az előjelekre!</li>
            </ul>
          </TheoryCard>
          <MidpointFormulaSvg />
        </div>
      </TheorySection>

      {/* 3. Továbbgondolás: osztópontok, tükrözés, nagyítás, súlypont */}
      <TheorySection title="3. A felezőpont-képlet továbbgondolása" badge="Elmélet" badgeColor="teal">
        <TheoryTable
          headers={['Feladat', 'Gondolat', 'Képlet (koordinátánként)']}
          rows={[
            ['AB felezőpontja', 'a végpontok átlaga', 'F = (A + B)/2'],
            ['AB negyedelőpontjai', 'a felezőpontok felezőpontjai', 'A + ¼(B − A), A + ½(B − A), A + ¾(B − A)'],
            ['B-n túli meghosszabbítás AB hosszával', 'B a keresett C és A felezőpontja', 'C = 2B − A'],
            ['F tükrözése a P pontra', 'P a tükörkép és F felezőpontja', 'F′ = 2P − F'],
            ['Paralelogramma szemközti csúcsa a K középpontból', 'az átlók felezik egymást', 'C = 2K − A'],
            ['Nagyítás/kicsinyítés O középpontból λ arányban', '→OX′ = λ · →OX', 'X′ = O + λ(X − O)'],
            ['Háromszög súlypontja', 'a súlyvonalak 2 : 1 arányú osztópontja', 'S = (A + B + C)/3']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CentroidSvg />
          <TheoryCallout type="tip" title="Súlypont = a csúcsok átlaga">
            Az A(−6; 2), B(2; 0), C(1; 7) háromszögben a BC oldal felezőpontja F(1,5; 3,5). Az AF súlyvonalon a csúcstól a hossz kétharmadánál van a súlypont: S = A + ⅔(F − A) = (−1; 3). Ugyanezt kapjuk a csúcsok átlagaként: S((−6 + 2 + 1)/3; (2 + 0 + 7)/3) = S(−1; 3).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Felezőpont és negyedelőpont" badge="1. feladat" badgeColor="sky">
            <QuarterPointsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>P(−4; 16), Q(20; −2): F((−4 + 20)/2; (16 − 2)/2) = <strong>F(8; 7)</strong>.</li>
              <li>A Q-hoz legközelebbi negyedelőpont az FQ szakasz felezőpontja: N((8 + 20)/2; (7 − 2)/2) = <strong>N(14; 2,5)</strong>.</li>
              <li>→FN = (6; −4,5), így FN = √(36 + 20,25) = √56,25 = <strong>7,5</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Meghosszabbítás és tükrözés" badge="2–3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>2.</strong> A(−2; 5), B(−3; −1). Az AB-t B-n túl az eredeti hosszal meghosszabbítva C-be jutunk; ekkor B az AC felezőpontja, így C = 2B − A = (−6 + 2; −2 − 5) = <strong>C(−4; −7)</strong>.
              </li>
              <li>
                <strong>3.</strong> P(7; −4), Q(−1; 2) ⇒ a felezőpont F(3; −1). Tükrözés P-re: F′ = 2P − F = <strong>(11; −7)</strong>; tükrözés Q-ra: F″ = 2Q − F = <strong>(−5; 5)</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Négyzet a középpontjából" badge="4. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>K(7; −8) a négyzet középpontja, A(−3; 16) egy csúcs. K az AC átló felezőpontja: C = 2K − A = <strong>C(17; −32)</strong>.</li>
              <li>Az átló: →AC = (20; −48), AC = √(400 + 2304) = √2704 = <strong>52</strong>.</li>
              <li>Terület: T = e²/2 = 2704/2 = <strong>1352</strong> területegység; oldal a = 52/√2 = 26√2 ≈ 36,77, kerület K = 104√2 ≈ <strong>147,08</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Ráadás: csúcsok az oldalfelező pontokból" badge="Ráadás" badgeColor="rose">
            <VerticesFromMidpointsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az oldalfelező pontok P(4; −4) (AC-n), Q(−1; −3) (AB-n), R(−2; −1) (BC-n).</li>
              <li>A középvonalak miatt APRQ paralelogramma, így A = P + Q − R = <strong>(5; −6)</strong>.</li>
              <li>Ugyanígy B = Q + R − P = <strong>(−7; 0)</strong>, C = P + R − Q = <strong>(3; −2)</strong>.</li>
              <li>Ellenőrzés: AC felezőpontja ((5 + 3)/2; (−6 − 2)/2) = (4; −4) = P. ✓</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>HF 1.</strong> A(−10; −7), B(10; 3), C(10; 13): oldalfelező pontok (0; −2), (10; 8), (0; 3); a középvonalak hossza √125 ≈ 11,18; 5; √200 ≈ 14,14; a terület 100.
              </li>
              <li>
                <strong>HF 2.</strong> A(−5; −6), B(16; 0), C(10; 6), kicsinyítés A-ból: ½ arányban B′(5,5; −3), C′(2,5; 0); ¾ arányban B′(10,75; −1,5), C′(6,25; 3).
              </li>
              <li>
                <strong>HF 3.</strong> A(−6; 2), B(2; 0), C(1; 7): F(1,5; 3,5); AF negyedelőpontjai (−4,125; 2,375), (−2,25; 2,75), (−0,375; 3,125).
              </li>
              <li>
                <strong>HF 4.</strong> Nagyítás P(1; 0)-ból 2-szeresére: A′(−7; 16), B′(3; −10), C′(13; 2).
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Nagyítás egy pontból – a módszer" badge="HF 2. és 4." badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>λ arányú nagyítás (kicsinyítés) O középpontból: →OX′ = λ · →OX.</li>
              <li>A(−3; 8), P(1; 0), λ = 2: →PA = (−4; 8), →PA′ = (−8; 16), így A′ = P + (−8; 16) = <strong>(−7; 16)</strong>.</li>
              <li>λ = ½ esetén a kép éppen a szakasz felezőpontja: az A-ból ½ arányban kicsinyített B pont az AB felezőpontja.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: különbség az összeg helyett" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A felezőpontnál a koordinátákat ÖSSZEADJUK, nem kivonjuk"
          wrong="F((b₁ − a₁)/2; (b₂ − a₂)/2) – például A(−4; 3), B(10; 7) esetén F(7; 2)"
          wrongExplanation="A (b₁ − a₁; b₂ − a₂) az →AB vektor koordinátái, ennek a fele ½ →AB = (7; 2) – ez egy vektor, nem a felezőpont helye. A felezőpontot az A pontból kell felmérni: A + ½ →AB."
          correct="F((a₁ + b₁)/2; (a₂ + b₂)/2) = F((−4 + 10)/2; (3 + 7)/2) = F(3; 5)"
          correctExplanation="A + ½ →AB = (−4; 3) + (7; 2) = (3; 5) – ugyanazt kapjuk, mint az átlagolással."
          tip="Ellenőrzés: a felezőpont koordinátái mindig a végpontok megfelelő koordinátái KÖZÉ esnek (−4 ≤ 3 ≤ 10 és 3 ≤ 5 ≤ 7)."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Osztópont csúszkával" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {slider('A első koordinátája', ax, setAx, 'accent-blue-600')}
                {slider('A második koordinátája', ay, setAy, 'accent-blue-600')}
                {slider('B első koordinátája', bx, setBx, 'accent-emerald-600')}
                {slider('B második koordinátája', by, setBy, 'accent-emerald-600')}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  t = AP / AB (előjelesen): {fmt(t, 2)}
                </label>
                <input
                  type="range"
                  min="-1"
                  max="2"
                  step="0.05"
                  value={t}
                  onChange={(e) => setT(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="osztási arány"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[0.25, 1 / 3, 0.5, 2 / 3, 0.75, 2].map((v) => (
                    <button
                      key={v}
                      onClick={() => setT(v)}
                      className="px-2 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 hover:bg-rose-100"
                    >
                      t = {v === 1 / 3 ? '1/3' : v === 2 / 3 ? '2/3' : fmt(v, 2)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {DIV_PRESETS.map((pr) => (
                  <button
                    key={pr.name}
                    onClick={() => {
                      setAx(pr.A[0]);
                      setAy(pr.A[1]);
                      setBx(pr.B[0]);
                      setBy(pr.B[1]);
                      setT(pr.t);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>
                  →AB = ({fmt(bx - ax)}; {fmt(by - ay)}), AB ≈ {fmt(lenAB, 2)}
                </div>
                <div>
                  P = A + t · →AB = <strong>P{pt(P)}</strong>
                </div>
                <div>
                  AP : PB = {ratioText}
                </div>
                <div className="text-rose-700">
                  Felezőpont (t = 0,5): F{pt(F)}
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                t = 0,5 a felezőpont, t = 0,25 és 0,75 a negyedelőpontok, t = 2 a B-n túli meghosszabbítás (C = 2B − A), t = −1 a B tükörképe A-ra.
              </p>
            </div>
            <MidpointPlane
              x={[-13, 13]}
              y={[-13, 13]}
              unit={11.5}
              grid={1}
              labels={5}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={[{ p: [ax, ay], d: [bx - ax || 1e-9, by - ay], color: '#cbd5e1', width: 1.2, dashed: true }]}
              segs={[{ from: [ax, ay], to: [bx, by], color: '#0f172a', width: 2.6 }]}
              points={[
                { at: [ax, ay], label: 'A', dx: -8, dy: -6, color: '#2563eb', r: 4 },
                { at: [bx, by], label: 'B', dx: 8, dy: -6, color: '#059669', r: 4 },
                { at: F, label: 'F', dx: -8, dy: 14, color: '#94a3b8', hollow: true },
                { at: P, label: 'P', dx: 9, dy: 14, color: '#dc2626', r: 4.5 }
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Oldalfelező pontok és súlypont" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setMode('fromVertices');
                setTri([
                  [-6, 2],
                  [2, 0],
                  [1, 7]
                ]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'fromVertices' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
            >
              Csúcsokból → oldalfelező pontok, súlypont
            </button>
            <button
              onClick={() => {
                setMode('fromMidpoints');
                setTri([
                  [4, -4],
                  [-1, -3],
                  [-2, -1]
                ]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'fromMidpoints' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
            >
              Oldalfelező pontokból → csúcsok (Ráadás)
            </button>
            {mode === 'fromVertices' && (
              <button
                onClick={() =>
                  setTri([
                    [-10, -7],
                    [10, 3],
                    [10, 13]
                  ])
                }
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                HF 1. háromszöge
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {tri.map((p, i) => (
                <div key={i} className="grid grid-cols-[1fr_5rem_5rem] gap-2 items-center">
                  <span className="text-xs font-semibold text-slate-600">
                    {mode === 'fromVertices' ? `${labels[i]} csúcs` : midLabels[i]}
                  </span>
                  {[0, 1].map((k) => (
                    <input
                      key={k}
                      type="number"
                      step="0.5"
                      value={p[k]}
                      onChange={(e) => {
                        const v = Number(e.target.value) || 0;
                        setTri((old) => old.map((q, j) => (j === i ? ((k === 0 ? [v, q[1]] : [q[0], v]) as CP) : q)));
                      }}
                      className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                      aria-label={`${i + 1}. pont ${k + 1}. koordinátája`}
                    />
                  ))}
                </div>
              ))}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                {mode === 'fromMidpoints' && (
                  <>
                    <div>A = P + Q − R = <strong>{pt(A)}</strong></div>
                    <div>B = Q + R − P = <strong>{pt(B)}</strong></div>
                    <div>C = P + R − Q = <strong>{pt(C)}</strong></div>
                  </>
                )}
                {mode === 'fromVertices' && (
                  <>
                    <div>BC felezőpontja: {pt(Fbc)}</div>
                    <div>AC felezőpontja: {pt(Fac)}</div>
                    <div>AB felezőpontja: {pt(Fab)}</div>
                  </>
                )}
                <div>
                  Középvonalak: {fmt(dist(Fab, Fac), 2)}; {fmt(dist(Fab, Fbc), 2)}; {fmt(dist(Fac, Fbc), 2)}
                </div>
                <div className="text-rose-700">
                  Súlypont: S = (A + B + C)/3 = <strong>{pt(S)}</strong>
                </div>
                <div>Terület: T = {fmt(area, 2)} (a középvonalak háromszögéé ennek negyede: {fmt(area / 4, 2)})</div>
              </div>
              <TheoryCallout type="success" title="Figyeld meg!">
                Minden középvonal a vele párhuzamos oldal fele, és a súlypont a csúcsok koordinátáinak átlaga. A középvonalak háromszögének ugyanaz a súlypontja, mint az eredeti háromszögnek!
              </TheoryCallout>
            </div>
            <MidpointPlane
              x={win.x}
              y={win.y}
              unit={win.unit}
              labels={win.x[1] - win.x[0] > 16 ? 5 : 2}
              grid={win.x[1] - win.x[0] > 16 ? 5 : 1}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              polys={[
                { pts: [A, B, C], fill: 'rgba(124,58,237,0.08)', stroke: '#7c3aed' },
                { pts: [Fab, Fbc, Fac], fill: 'rgba(220,38,38,0.05)', stroke: '#dc2626', dashed: true }
              ]}
              segs={[
                { from: A, to: Fbc, color: '#b45309', dashed: true, width: 1.3 },
                { from: B, to: Fac, color: '#b45309', dashed: true, width: 1.3 },
                { from: C, to: Fab, color: '#b45309', dashed: true, width: 1.3 }
              ]}
              points={[
                { at: A, label: 'A', dx: -8, dy: -6, color: '#7c3aed' },
                { at: B, label: 'B', dx: 8, dy: -6, color: '#7c3aed' },
                { at: C, label: 'C', dx: 8, dy: -6, color: '#7c3aed' },
                { at: Fac, label: mode === 'fromMidpoints' ? 'P' : '', color: '#dc2626', r: 2.6 },
                { at: Fab, label: mode === 'fromMidpoints' ? 'Q' : '', color: '#dc2626', r: 2.6 },
                { at: Fbc, label: mode === 'fromMidpoints' ? 'R' : '', color: '#dc2626', r: 2.6 },
                { at: S, label: 'S', dx: 8, dy: -6, color: '#0f172a', r: 4 }
              ]}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MidpointTheory;
