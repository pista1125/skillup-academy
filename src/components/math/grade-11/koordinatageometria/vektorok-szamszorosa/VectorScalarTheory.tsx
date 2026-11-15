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
  ScalarMultiplesSvg,
  UnitVectorsGridSvg,
  HexagonDiagonalSvg,
  ParallelogramCenterSvg,
  CubeVectorsSvg,
  PerpendicularCombinationSvg,
  VectorScalarArrow,
  VectorScalarLabel
} from './VectorScalarFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};
/** Szám kiírása felesleges tizedesjegyek nélkül, magyar tizedesvesszővel. */
const num = (x: number) => {
  const r = Math.round(x * 100) / 100;
  return String(r).replace('.', ',').replace('-', '−');
};

type Vec = { x: number; y: number };

const COLS = 14;
const ROWS = 8;
const CELL = 26;
const PAD = 14;
const O: Vec = { x: 7, y: 4 };
const toPx = (p: Vec) => ({ x: PAD + p.x * CELL, y: PAD + (ROWS - p.y) * CELL });

const BASES: { name: string; v: Vec }[] = [
  { name: '2 jobbra, 1 fel', v: { x: 2, y: 1 } },
  { name: '1 jobbra, 1 fel', v: { x: 1, y: 1 } },
  { name: '2 jobbra', v: { x: 2, y: 0 } },
  { name: '1 balra, 1 fel', v: { x: -1, y: 1 } }
];

export const VectorScalarTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: λ-csúszka
  const [lambda, setLambda] = useState<number>(2);
  const [baseIdx, setBaseIdx] = useState<number>(0);
  // Labor II: p·u + q·v
  const [p, setP] = useState<number>(2);
  const [q, setQ] = useState<number>(1);

  const base = BASES[baseIdx].v;
  const baseLen = Math.hypot(base.x, base.y);
  const scaled = { x: lambda * base.x, y: lambda * base.y };
  const pO = toPx(O);
  const pBase = toPx({ x: O.x + base.x, y: O.y + base.y });
  const pScaled = toPx({ x: O.x + scaled.x, y: O.y + scaled.y });
  const direction =
    lambda > 0 ? 'egyirányú →a-val' : lambda < 0 ? 'ellentétes irányú →a-val' : 'nullvektor (iránya tetszőleges)';
  const sizeText =
    lambda === 0
      ? 'λ = 0: λ · →a = →0'
      : Math.abs(lambda) > 1
        ? '|λ| > 1: hosszabb, mint →a'
        : Math.abs(lambda) < 1
          ? '|λ| < 1: rövidebb, mint →a'
          : '|λ| = 1: ugyanolyan hosszú, mint →a';

  // Labor II: |→u| = 24 mm, |→v| = 32 mm, →u ⊥ →v
  const wx = 24 * p;
  const wy = 32 * q;
  const wLen = Math.hypot(wx, wy);
  const sc = 0.7;
  const C2 = { x: 170, y: 115 };
  const U2 = { x: C2.x + 24 * sc, y: C2.y };
  const V2 = { x: C2.x, y: C2.y - 32 * sc };
  const W2 = { x: C2.x + wx * sc, y: C2.y - wy * sc };

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="vektorok-szamszorosa"
      title="3. Vektorok számszorosa"
      subtitle="Hányszoros erő kell? A vektor valós számmal való szorzása: irány, hossz, előjel, ellentett és nullvektor; vektorok kifejezése rácsvektorokkal, hatszögben, paralelogrammában és kockában."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_vektorok_szamszorosa_tananyag.pdf"
      practiceTitle="Készen állsz a vektorok számszorosára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — λ · →a',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">|λ · →a| = |λ| · |→a|, és λ · →a ∥ →a</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>λ &gt; 0: <strong>egyirányú</strong> →a-val; λ &lt; 0: <strong>ellentétes irányú</strong>; λ = 0: 0 · →a = <strong>→0</strong>.</li>
              <li>|λ| &gt; 1 ⇒ hosszabb, |λ| &lt; 1 ⇒ rövidebb, |λ| = 1 ⇒ ugyanolyan hosszú; (−1) · →a = −→a.</li>
              <li>(−3)→a = 3(−→a) = −(3→a) = −3→a. Az eredmény mindig <strong>vektor</strong>, sohasem szám.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: gumikötelek és kötélhúzás" badge="Tankönyv 220. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az expander gumikötelei: sárga <strong>4,5 kg</strong>, kék <strong>7 kg</strong>, zöld <strong>9 kg</strong>, fekete <strong>11 kg</strong>, piros <strong>13,5 kg</strong> ellenállást hoznak létre (mind együtt 45 kg).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sárga + zöld: 4,5 + 9 = 13,5 = 3 · 4,5 ⇒ a sárgához szükséges erő <strong>3-szorosa</strong> kell (3→F).</li>
              <li>Kék + fekete: 7 + 11 = 18 = 4 · 4,5 ⇒ <strong>4-szeres</strong> erő (4→F).</li>
            </ul>
            <p>
              Kötélhúzásnál a csapattagok egyirányú, egyforma erői összeadódnak: →F + →F = 2→F, →F + →F + →F = 3→F. Döntetlennél az ellenfél ugyanekkora, de <strong>ellentétes irányú</strong> erőt fejt ki (pl. −3→F). Ha még 2 ugyanilyen tag beáll a 3 fős csapatba, a csapat ereje 5→F.
            </p>
          </div>
          <ScalarMultiplesSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladatok */}
      <TheorySection title="2. Kidolgozott feladatok" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Vektorok kifejezése →i és →j segítségével" badge="Rács" badgeColor="sky">
            <UnitVectorsGridSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>→a = →i + →i + →i = <strong>3→i</strong> (egyirányú →i-vel, 3-szor olyan hosszú)</li>
              <li>→b = (−→j) + (−→j) = <strong>−2→j</strong></li>
              <li>→c = →i + →j</li>
              <li>→d = →a + →b = <strong>3→i + (−2→j)</strong></li>
              <li>→e = (−→a) + →b = <strong>−3→i + (−2→j)</strong></li>
              <li>Ellenőrzés (1. feladat): →d + →e = −4→j és →d − →e = 6→i.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Szabályos hatszög: →AD és →b + →c" badge="Hatszög" badgeColor="purple">
            <HexagonDiagonalSvg className="w-full max-w-sm h-auto mx-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>→b és →c a hatszög A-ból induló két oldalvektora, K a középpont.</li>
              <li>A szabályos hatszög tulajdonságai miatt (ABKF rombusz) →b + →c = →AK.</li>
              <li>→AK egyirányú →AD-vel és fele olyan hosszú, ezért <strong>→AD = 2(→b + →c)</strong>, azaz →b + →c = ½ →AD.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Definíció */}
      <TheorySection title="3. A vektor számszorosa" badge="Definíció" badgeColor="indigo">
        <TheoryCallout type="tip" title="Definíció">
          A nullvektor bármely valós számszorosa nullvektor (λ · →0 = →0). Az →a vektornak egy λ valós számmal (skalárral) vett szorzatán azt a λ · →a vektort értjük, amely <strong>párhuzamos →a-val</strong>, hossza <strong>|→a| |λ|-szorosa</strong>, iránya →a irányával <strong>megegyezik, ha 0 &lt; λ</strong>, <strong>ellentétes, ha λ &lt; 0</strong>, és <strong>tetszőleges, ha λ = 0</strong> (ekkor 0 · →a = →0).
        </TheoryCallout>
        <TheoryTable
          headers={['λ értéke', 'Irány', 'Hossz (→a ≠ →0)', 'Példa']}
          rows={[
            ['λ > 1', 'egyirányú', 'hosszabb', '2→a, 3→i'],
            ['λ = 1', 'egyirányú', 'egyenlő', '1 · →a = →a'],
            ['0 < λ < 1', 'egyirányú', 'rövidebb', '½ →a'],
            ['λ = 0', 'tetszőleges', '0', '0 · →a = →0'],
            ['−1 < λ < 0', 'ellentétes', 'rövidebb', '−0,5→a'],
            ['λ = −1', 'ellentétes', 'egyenlő', '(−1)→a = −→a'],
            ['λ < −1', 'ellentétes', 'hosszabb', '−2→j']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCallout type="info" title="Új típusú művelet">
            Eddig mindig azonos jellegű mennyiségekkel dolgoztunk (szám + szám, vektor + vektor). Itt egy <strong>szám és egy vektor</strong> szorzata egy <strong>vektor</strong>. Ezért hibás a „0 · →a = 0” felírás: helyesen 0 · →a = →0, és k · →0 = →0 minden valós k-ra.
          </TheoryCallout>
          <TheoryCallout type="warning" title="A „−” jel háromféle jelentése">
            Valós szám előjele, két vektor kivonása, vektor ellentettje – ugyanaz a jel, más tartalom. Mégis: (−3)→a = 3(−→a) = −(3→a) = −3→a, és →a − (5→b) = →a + (−5)→b = →a + 5(−→b) = →a − 5→b.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Tankönyvi feladatok megoldással" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="3. feladat: paralelogramma és középpontja" badge="Paralelogramma" badgeColor="sky">
            <ParallelogramCenterSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az oldalvektorok →a és →b, a középpont (O) felezi az átlókat.</li>
              <li>A közös csúcsból O-ba: ½(→a + →b); O-ból a közös csúcsba: −½(→a + →b).</li>
              <li>→a végpontjából O-ba: ½(→b − →a); →b végpontjából O-ba: ½(→a − →b).</li>
              <li>Az oldalak mentén visszafelé: −→a és −→b.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. feladat: kocka élvektorai" badge="Térben is!" badgeColor="purple">
            <CubeVectorsSvg className="w-full max-w-sm h-auto mx-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>→a = →AB, →b = →AD, →c = →AE; Q a BF él felezőpontja.</li>
              <li>→BF = <strong>→c</strong></li>
              <li>→CH = →CD + →DH = <strong>−→a + →c</strong></li>
              <li>→BH = →BA + →AD + →DH = <strong>−→a + →b + →c</strong></li>
              <li>→DQ = →DA + →AB + →BQ = <strong>→a − →b + ½→c</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 1.: egyik vektor a másik számszorosaként" badge="Párhuzamos vektorok" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> egyirányúak, 24 mm és 6 mm: →a = <strong>4→b</strong>, →b = <strong>0,25→a</strong>.</li>
              <li><strong>b)</strong> ellentétes irányúak, 8 mm és 10 mm: →a = <strong>−0,8→b</strong>, →b = <strong>−1,25→a</strong>.</li>
              <li><strong>c)</strong> párhuzamosak, 16 mm és 40 mm: →a = ±0,4→b, →b = ±2,5→a – <strong>2 lehetőség</strong> (egy- vagy ellentétes irányúak).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 2.: |→u| = 24 mm, |→v| = 32 mm, →u ⊥ →v" badge="Hosszak" badgeColor="rose">
            <PerpendicularCombinationSvg className="w-full max-w-sm h-auto mx-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> |2→u| = 48 mm, |2→v| = 64 mm, |−1,5→v| = 48 mm.</li>
              <li><strong>b)</strong> |→u + →v| = √(24² + 32²) = 40 mm; |2→u + 2→v| = 80 mm; |2→u − 2→v| = 80 mm.</li>
              <li><strong>c)</strong> |4→u + 3→v| = |4→u − 3→v| = √(96² + 96²) ≈ 135,8 mm; |−→u − 2→v| = √(24² + 64²) ≈ 68,4 mm.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: negatív szorzó és hossz" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="|λ · →a| = |λ| · |→a| – a hossz sohasem negatív"
          wrong="|→a| = 10 mm ⇒ |−1,5→a| = −15 mm, és −1,5→a egyirányú →a-val"
          wrongExplanation="A negatív szorzó az irányt fordítja meg, a hossz a szorzó abszolút értékével szorzódik. Hossz nem lehet negatív."
          correct="|−1,5→a| = |−1,5| · 10 mm = 15 mm, iránya ellentétes →a-val"
          correctExplanation="A λ előjele dönti el az irányt (λ < 0 ⇒ ellentétes), |λ| pedig a hosszat."
          tip="Ellenőrzés: (−1,5)→a = 1,5(−→a): először vedd az ellentettet, aztán nyújtsd 1,5-szeresére."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: A λ-csúszka" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {BASES.map((b, i) => (
                  <button
                    key={b.name}
                    onClick={() => setBaseIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${baseIdx === i ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    →a: {b.name}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">λ = {num(lambda)}</label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.25"
                  value={lambda}
                  onChange={(e) => setLambda(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="lambda"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[-2, -1, -0.5, 0, 0.5, 1, 3].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLambda(l)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    λ = {num(l)}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>|→a| = {fmt(baseLen)}</div>
                <div>|λ · →a| = |{num(lambda)}| · {fmt(baseLen)} = <strong>{fmt(Math.abs(lambda) * baseLen)}</strong></div>
                <div>Irány: <strong>{direction}</strong></div>
                <div className="text-slate-500">{sizeText}</div>
              </div>
            </div>
            <svg viewBox={`0 0 ${COLS * CELL + 2 * PAD} ${ROWS * CELL + 2 * PAD}`} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {Array.from({ length: COLS + 1 }, (_, i) => (
                <line key={'gv' + i} x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={PAD + ROWS * CELL} stroke="#e2e8f0" />
              ))}
              {Array.from({ length: ROWS + 1 }, (_, j) => (
                <line key={'gh' + j} x1={PAD} y1={PAD + j * CELL} x2={PAD + COLS * CELL} y2={PAD + j * CELL} stroke="#e2e8f0" />
              ))}
              <line
                x1={toPx({ x: O.x - 3 * base.x, y: O.y - 3 * base.y }).x}
                y1={toPx({ x: O.x - 3 * base.x, y: O.y - 3 * base.y }).y}
                x2={toPx({ x: O.x + 3 * base.x, y: O.y + 3 * base.y }).x}
                y2={toPx({ x: O.x + 3 * base.x, y: O.y + 3 * base.y }).y}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
              />
              <VectorScalarArrow x1={pO.x} y1={pO.y} x2={pScaled.x} y2={pScaled.y} color="#dc2626" width={4} />
              <VectorScalarArrow x1={pO.x} y1={pO.y} x2={pBase.x} y2={pBase.y} color="#2563eb" width={2} />
              <VectorScalarLabel x={pBase.x + 4} y={pBase.y - 14} text="a" color="#2563eb" />
              <VectorScalarLabel x={pScaled.x} y={pScaled.y + 16} text="λa" color="#dc2626" />
              <circle cx={pO.x} cy={pO.y} r={3.5} fill="#0f172a" />
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: p · →u + q · →v merőleges vektorokkal" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-sm text-slate-700">|→u| = 24 mm, |→v| = 32 mm és →u ⊥ →v (HF 2.).</p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">p = {num(p)}</label>
                <input type="range" min="-4" max="4" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-blue-600" aria-label="p" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">q = {num(q)}</label>
                <input type="range" min="-4" max="4" step="0.5" value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="q" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: '→u + →v', v: [1, 1] },
                  { name: '2→u − 2→v', v: [2, -2] },
                  { name: '4→u + 3→v', v: [4, 3] },
                  { name: '−→u − 2→v', v: [-1, -2] },
                  { name: '−1,5→v', v: [0, -1.5] }
                ].map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setP(b.v[0]);
                      setQ(b.v[1]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>|p · →u| = {fmt(Math.abs(wx), 1)} mm, |q · →v| = {fmt(Math.abs(wy), 1)} mm</div>
                <div>Pitagorasz-tétellel: |p→u + q→v| = √({fmt(Math.abs(wx), 1)}² + {fmt(Math.abs(wy), 1)}²)</div>
                <div><strong>|p→u + q→v| ≈ {fmt(wLen, 2)} mm</strong></div>
              </div>
            </div>
            <svg viewBox="0 0 340 230" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1={10} y1={C2.y} x2={330} y2={C2.y} stroke="#e2e8f0" />
              <line x1={C2.x} y1={10} x2={C2.x} y2={220} stroke="#e2e8f0" />
              <line x1={C2.x + wx * sc} y1={C2.y} x2={W2.x} y2={W2.y} stroke="#94a3b8" strokeDasharray="4 3" />
              <line x1={C2.x} y1={C2.y - wy * sc} x2={W2.x} y2={W2.y} stroke="#94a3b8" strokeDasharray="4 3" />
              <VectorScalarArrow x1={C2.x} y1={C2.y} x2={W2.x} y2={W2.y} color="#dc2626" width={3} />
              <VectorScalarArrow x1={C2.x} y1={C2.y} x2={U2.x} y2={U2.y} color="#2563eb" width={2.4} head={7} />
              <VectorScalarArrow x1={C2.x} y1={C2.y} x2={V2.x} y2={V2.y} color="#059669" width={2.4} head={7} />
              <VectorScalarLabel x={U2.x - 6} y={C2.y + 14} text="u" color="#2563eb" />
              <VectorScalarLabel x={C2.x - 12} y={V2.y + 6} text="v" color="#059669" />
            </svg>
          </div>
          <TheoryCallout type="success" title="Figyeld meg!">
            2→u + 2→v = 2(→u + →v), ezért a hossza is kétszeres: 80 mm. A 2→u − 2→v ugyanilyen hosszú, mert merőleges →u és →v esetén az előjel csak az irányt változtatja.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default VectorScalarTheory;
