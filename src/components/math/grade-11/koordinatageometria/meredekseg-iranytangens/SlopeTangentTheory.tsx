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
  SlopeTangentPlane,
  SlopeTangentRoadSignSvg,
  SlopeTangentRiseRunSvg,
  SlopeTangentWorkedAngleSvg,
  SlopeTangentInclinationSvg,
  SlopeTangentSignsSvg,
  SlopeTangentLaddersSvg,
  SlopePlaneAngle,
  SlopePlaneSeg,
  SlopePlanePoint
} from './SlopeTangentFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  const n = Number(s);
  const t = (n === 0 ? 0 : n).toString();
  return t.replace('.', ',').replace('-', '−');
};

/** y = mx + b szöveges alakja. */
const lineStr = (m: number, b: number) => {
  const mPart = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '−x' : `${fmt(m)}x`;
  if (!mPart) return `y = ${fmt(b)}`;
  if (b === 0) return `y = ${mPart}`;
  return `y = ${mPart} ${b > 0 ? '+' : '−'} ${fmt(Math.abs(b))}`;
};

const deg = (r: number) => (r * 180) / Math.PI;

export const SlopeTangentTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [m, setM] = useState<number>(1.5);
  const [b, setB] = useState<number>(1);
  // Labor II
  const [x1, setX1] = useState<number>(-2);
  const [y1, setY1] = useState<number>(-1);
  const [x2, setX2] = useState<number>(2);
  const [y2, setY2] = useState<number>(2);
  const [alpha, setAlpha] = useState<number>(14);

  // Labor I számítások
  const alphaM = deg(Math.atan(m));
  const x0 = m !== 0 ? -b / m : NaN;
  const segs: SlopePlaneSeg[] = [
    { from: [0, b], to: [1, b], color: '#059669', width: 3 },
    { from: [1, b], to: [1, b + m], color: '#dc2626', width: 3 }
  ];
  const angles: SlopePlaneAngle[] = [];
  if (m !== 0) angles.push({ at: [1, b], p: [0, b], q: [1, b + m], right: true, r: 10 });
  if (m !== 0 && Number.isFinite(x0) && x0 > -5.5 && x0 < 5.5) {
    angles.push({ at: [x0, 0], p: [x0 + 1, 0], q: [x0 + 1, m], r: 26, color: '#7c3aed', label: 'α' });
  }
  const pts: SlopePlanePoint[] = [{ at: [0, b], label: `(0; ${fmt(b)})`, dx: -46, dy: -6, color: '#2563eb' }];

  // Labor II számítások
  const dx = x2 - x1;
  const dy = y2 - y1;
  const vertical = dx === 0;
  const same = dx === 0 && dy === 0;
  const m2 = vertical ? NaN : dy / dx;
  const b2 = vertical ? NaN : y1 - m2 * x1;
  const alpha2 = vertical ? 90 : deg(Math.atan(m2));
  const tgAlpha = Math.tan((alpha * Math.PI) / 180);

  const numInput = (label: string, v: number, set: (n: number) => void) => (
    <label className="flex items-center gap-1 text-xs font-semibold text-slate-600">
      {label}
      <input
        type="number"
        min={-6}
        max={6}
        step={1}
        value={v}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) set(Math.max(-6, Math.min(6, Math.round(n))));
        }}
        className="w-14 rounded-md border border-slate-300 px-1.5 py-1 text-sm font-mono"
        aria-label={label}
      />
    </label>
  );

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="meredekseg-iranytangens"
      title="13. Meredekség, iránytangens"
      subtitle="Az emelkedők százalékos meredekségétől az egyenes irányszögéig: m = tg α, az y = mx + b alak és a meredekség kiolvasása két pontból vagy az egyenletből."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_meredekseg_iranytangens_tananyag.pdf"
      practiceTitle="Készen állsz a meredekség kiszámítására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MEREDEKSÉG (IRÁNYTANGENS)',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">m = tg α = (y₂ − y₁) / (x₂ − x₁)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Meredekség:</strong> egységnyi első koordináta-növekedésre jutó második koordináta-változás. Az <strong>y = mx + b</strong> alakban az x együtthatója.
              </li>
              <li>
                <strong>Irányszög (α):</strong> az egyenes és az x tengely pozitív félegyenese által bezárt előjeles szög, −90° &lt; α &lt; 90°; az y tengellyel párhuzamos egyenesé 90°.
              </li>
              <li>
                Az <strong>x = c</strong> (függőleges) egyeneseknek <strong>nincs meredekségük</strong>, mert tg 90° nem értelmezett.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: mit jelent a 12%-os emelkedő?" badge="Tankönyv 248. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A hegyi utak veszélyt jelző tábláin lévő szám az emelkedés (lejtés) <strong>százalékos mértéke</strong>: a 12% azt jelenti, hogy az út <strong>100 m vízszintes</strong> szakaszon <strong>12 m-t emelkedik</strong>. Az emelkedő meredeksége tehát 12/100 = 0,12.
            </p>
            <p>
              <strong>a)</strong> A derékszögű háromszögben tg α = 12/100 = 0,12, ezért <strong>α ≈ 6,84°</strong>.
            </p>
            <p>
              <strong>b)</strong> A 10%-os lejtő 100 m alatt 10 m-t süllyed. A süllyedést negatív előjellel fejezzük ki, így a lejtő meredeksége <strong>−10/100 = −0,1</strong>. Mivel tg α = 0,1, α ≈ 5,71°: a lejtő 5,71°-os szöget zár be a vízszintessel, de a süllyedés miatt <strong>−5,71°</strong>-os szöggel jellemezzük.
            </p>
          </div>
          <SlopeTangentRoadSignSvg />
        </div>
      </TheorySection>

      {/* 2. A meredekség fogalma */}
      <TheorySection title="2. A meredekség két pontból" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SlopeTangentRiseRunSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az egyenes egyik pontjából egy másikba lépve megnézzük, <strong>hogyan</strong> (előjel) és <strong>mennyivel</strong> (számérték) változik a második koordináta, miközben az első koordináta nő. A kettő hányadosa a <strong>meredekség</strong>:
            </p>
            <p className="font-mono text-center text-blue-900 bg-blue-50 rounded-lg py-2">m = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)</p>
            <p>
              Az ábrán A(1; 1) és B(5; 4): Δx = 4, Δy = 3, így <strong>m = 3/4 = 0,75</strong>. A derékszögű háromszögben ugyanez az irányszög tangense: tg α = 3/4, α ≈ 36,87°.
            </p>
            <p>
              Ha x₁ = x₂, a nevező 0 – az egyenes függőleges, <strong>meredeksége nem értelmezhető</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat 1–2 */}
      <TheorySection title="3. Kidolgozott feladat: létrák meredeksége" badge="Kidolgozott feladat" badgeColor="amber">
        <SlopeTangentLaddersSvg className="w-full h-auto max-w-2xl mx-auto mb-4" />
        <TheoryTable
          headers={['Létra', 'Δy', 'Δx', 'Meredekség', 'Irányszög', 'Egyenlet']}
          rows={[
            ['A', '6', '2', '6/2 = 3', '71,6°', 'y = 3x − 6'],
            ['B', '5', '0', 'nem értelmezhető', '90°', 'x = 0'],
            ['C', '4', '0', 'nem értelmezhető', '90°', 'x = 2'],
            ['D', '0', '2,5', '0/2,5 = 0', '0°', 'y = 3'],
            ['E', '0', '4', '0/4 = 0', '0°', 'y = 0'],
            ['F', '−3', '0,8', '−3/0,8 = −3,75', '−75,1°', 'y = −3,75x + 3']
          ]}
        />
        <TheoryCallout type="info" title="Vegyük észre!">
          Az egyenes meredeksége megjelenik az egyenes egyenletének <strong>y-ra rendezett alakjában</strong> az x szorzótényezőjeként (y = <strong>m</strong>x + b).
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. feladat: a támasztólétra" badge="Tankönyv 249. o." badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Lépcsőfokos létránál az előírt hajlásszög 60–70°, létrafokosnál 65–75°.</li>
              <li>Az m meredekség az irányszög tangense, és nagyobb hegyesszögnek nagyobb a tangense.</li>
              <li>tg 60° ≤ m ≤ tg 70° ⇒ <strong>1,73 ≤ m ≤ 2,75</strong>;</li>
              <li>tg 65° ≤ m ≤ tg 75° ⇒ <strong>2,14 ≤ m ≤ 3,73</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCallout type="warning" title="Megjegyzés">
            A hétköznapokban (pl. falmászásnál) a függőleges fal a „legmeredekebb”. A matematikában viszont az y tengellyel párhuzamos egyeneseknek <strong>nem értelmezzük a meredekségét</strong>.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Kidolgozott feladat 3–4 */}
      <TheorySection title="4. Kidolgozott feladat: meredekség és szög az egyenletből" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>3. Mennyi a 3x − 2y = −6 egyenes meredeksége?</strong>
            </p>
            <p>
              Rendezzük y-ra: −2y = −3x − 6, azaz <strong>y = 3/2 x + 3</strong>. A meredekség tehát <strong>3/2</strong>, és az egyenes az y tengelyt a 3-nál metszi.
            </p>
            <p>
              <strong>4. Mekkora szöget alkot az x tengellyel?</strong>
            </p>
            <p>
              A PQR derékszögű háromszögben a PQ befogó 1 hosszú, a QR befogó éppen a meredekség (3/2). A P-nél lévő hegyesszög egyenlő az egyenes és az x tengely α szögével:
            </p>
            <p className="font-mono text-center text-blue-900 bg-blue-50 rounded-lg py-2">tg α = (3/2) / 1 = 1,5 ⇒ α ≈ 56,3°</p>
          </div>
          <SlopeTangentWorkedAngleSvg />
        </div>
      </TheorySection>

      {/* 5. Elmélet: irányszög */}
      <TheorySection title="5. Az irányszög és az iránytangens" badge="Elmélet" badgeColor="indigo">
        <TheoryCallout type="tip" title="Definíció">
          Ha egy egyenes nem merőleges az x tengelyre, akkor <strong>irányszögének</strong> nevezzük az egyenesnek az x tengely pozitív félegyenesével bezárt <strong>előjeles szögét</strong>, melynek nagysága −90°-nál nagyobb és 90°-nál kisebb. Az y tengellyel párhuzamos egyenesek irányszöge 90°, de ezeknek nincs meredekségük, így nem írható fel y = mx + b alakú egyenletük.
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SlopeTangentInclinationSvg />
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
            <li>Ha az egyenes egyenlete y = mx + b alakú, akkor <strong>m = tg α</strong>. Emiatt m-et az egyenes <strong>iránytangensének</strong> vagy <strong>iránytényezőjének</strong> is nevezik.</li>
            <li>Pozitív meredekség ⇔ 0° &lt; α &lt; 90° (emelkedő egyenes).</li>
            <li>Negatív meredekség ⇔ −90° &lt; α &lt; 0° (csökkenő egyenes; egy hegyesszög ellentettje).</li>
            <li>m = 0 ⇔ α = 0°: az egyenes párhuzamos az x tengellyel vagy egybeesik vele.</li>
          </ul>
        </div>
        <SlopeTangentSignsSvg className="w-full h-auto max-w-2xl mx-auto" />
        <TheoryTable
          headers={['Az egyenlet', 'y = mx + b alak', 'm (iránytangens)', 'Irányszög', 'Metszéspont az y tengellyel']}
          rows={[
            ['3x − 5y = 8', 'y = 3/5 x − 8/5', '0,6', '≈ 30,96°', '(0; −1,6)'],
            ['4x = y + 2', 'y = 4x − 2', '4', '≈ 75,96°', '(0; −2)'],
            ['x + 3y + 12 = 0', 'y = −1/3 x − 4', '−1/3', '≈ −18,43°', '(0; −4)']
          ]}
        />
      </TheorySection>

      {/* 6. További tankönyvi feladatok */}
      <TheorySection title="6. További tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Pont és iránytangens (4. feladat)" badge="E(6; 0), m = 2/3" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Egységnyi jobbra lépésre 2/3 emelkedés jut, 3 jobbra lépésre 2: további pontok pl. (9; 2), (12; 4), (3; −2), (0; −4).</li>
              <li>Egyenlet: y − 0 = 2/3 (x − 6), azaz <strong>y = 2/3 x − 4</strong>.</li>
              <li>Távolság az origótól: a tengelymetszetek 6 és 4, az átfogó √52; a derékszögű háromszög átfogóhoz tartozó magassága d = 6 · 4 / √52 ≈ <strong>3,33</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Közlekedési tábla (HF 4.)" badge="% ↔ fok" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> 14°-os emelkedő: tg 14° ≈ 0,2493, vagyis ≈ 24,93% – a táblára egész számmal <strong>25%</strong> kerül.</li>
              <li><strong>b)</strong> 14%-os lejtő: tg α = 0,14 ⇒ α ≈ <strong>7,97°</strong> (előjelesen −7,97°).</li>
              <li>Vigyázat: a 14% és a 14° nagyon különböző meredekségű!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Távolság az origótól (HF 2.)" badge="K(8; 0), m = 0,75" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>y = 0,75(x − 8) = 0,75x − 6, tehát a tengelymetszetek 8 és 6.</li>
              <li>Az átfogó √(8² + 6²) = 10, így a távolság d = 8 · 6 / 10 = <strong>4,8</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Pontok a meredekségből (HF 3.)" badge="P(0; −5), m = 2" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Minden egységnyi jobbra lépésnél 2-t lépünk fel: (1; −3), (2; −1), (3; 1), (−1; −7).</li>
              <li>m = −1/3, P(0; 3): 3-at jobbra, 1-et le: (3; 2), (6; 1), (9; 0), (−3; 4).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: rendezés nélkül leolvasott meredekség" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ax + By = C alakból NEM az x együtthatója a meredekség"
          wrong="3x − 2y = −6 ⇒ m = 3"
          wrongExplanation="A meredekség csak az y-ra rendezett (y = mx + b) alakban áll az x előtt. Itt y együtthatója −2, azzal még osztani kell."
          correct="3x − 2y = −6 ⇒ y = 3/2 x + 3 ⇒ m = 3/2"
          correctExplanation="Ax + By = C (B ≠ 0) esetén y = −A/B · x + C/B, tehát m = −A/B."
          tip="Hasonló hiba a százalék és a fok összekeverése: a 100%-os emelkedő 45°-os, nem 90°-os!"
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: m-csúszka és irányszög" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <SlopeTangentPlane
              xMin={-6}
              xMax={6}
              yMin={-6}
              yMax={6}
              unit={24}
              ticks="all"
              tickStep={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={[{ p: [0, b], q: [1, b + m], color: '#2563eb', width: 3 }]}
              segs={segs}
              angles={angles}
              points={pts}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">m (meredekség) = {fmt(m)}</label>
                <input type="range" min="-4" max="4" step="0.05" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-blue-600" aria-label="meredekség" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">b (tengelymetszet) = {fmt(b)}</label>
                <input type="range" min="-3" max="3" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="tengelymetszet" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: '12%-os emelkedő', m: 0.12, b: 0 },
                  { name: '10%-os lejtő', m: -0.1, b: 0 },
                  { name: '3x − 2y = −6', m: 1.5, b: 3 },
                  { name: 'A létra: y = 3x − 6', m: 3, b: -3 },
                  { name: '45°', m: 1, b: 0 },
                  { name: 'vízszintes', m: 0, b: 2 }
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setM(p.m);
                      setB(p.b);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>
                  Egyenlet: <strong>{lineStr(Math.round(m * 100) / 100, b)}</strong>
                </div>
                <div>
                  <span className="text-emerald-700 font-bold">1 jobbra</span> ⇒ <span className="text-red-700 font-bold">{fmt(m)} {m >= 0 ? 'fel' : 'le (előjelesen)'}</span>
                </div>
                <div>
                  Irányszög: α = arc tg m ≈ <strong>{fmt(alphaM, 1)}°</strong>
                </div>
                <div>Emelkedés: {fmt(m * 100, 0)}% {m > 0 ? '(emelkedő)' : m < 0 ? '(lejtő)' : '(vízszintes)'}</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                A zöld szakasz 1 egység jobbra, a piros éppen m egység függőlegesen: a kis derékszögű háromszög mutatja, hogy m = tg α. A b csúszka eltolja az egyenest, de a meredekséget (és az irányszöget) nem változtatja meg.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: Meredekség két pontból és szögből" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700">Add meg a két pont koordinátáit (−6 és 6 között)!</p>
              <div className="flex flex-wrap gap-3">
                <span className="text-sm font-bold text-blue-700">A</span>
                {numInput('x₁', x1, setX1)}
                {numInput('y₁', y1, setY1)}
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="text-sm font-bold text-rose-700">B</span>
                {numInput('x₂', x2, setX2)}
                {numInput('y₂', y2, setY2)}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1" data-testid="st-two-point-result">
                {same ? (
                  <div>A két pont egybeesik – nem határoznak meg egyenest.</div>
                ) : (
                  <>
                    <div>
                      Δx = {fmt(x2)} − ({fmt(x1)}) = {fmt(dx)}, Δy = {fmt(y2)} − ({fmt(y1)}) = {fmt(dy)}
                    </div>
                    {vertical ? (
                      <>
                        <div>Δx = 0 ⇒ <strong>nincs meredekség</strong> (függőleges egyenes)</div>
                        <div>Egyenlet: <strong>x = {fmt(x1)}</strong>, irányszög: 90°</div>
                      </>
                    ) : (
                      <>
                        <div>
                          m = Δy / Δx = {fmt(dy)} / {fmt(dx)} ≈ <strong>{fmt(m2, 3)}</strong>
                        </div>
                        <div>Irányszög: α ≈ <strong>{fmt(alpha2, 2)}°</strong></div>
                        <div>
                          Egyenlet: <strong>{lineStr(Math.round(m2 * 1000) / 1000, Math.round(b2 * 1000) / 1000)}</strong>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <SlopeTangentPlane
              xMin={-6}
              xMax={6}
              yMin={-6}
              yMax={6}
              unit={22}
              ticks="all"
              tickStep={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={same ? [] : [{ p: [x1, y1], q: [x2, y2], color: '#7c3aed', width: 2.6 }]}
              segs={
                same || vertical || dy === 0
                  ? []
                  : [
                      { from: [x1, y1], to: [x2, y1], color: '#059669', width: 2.4, dashed: true },
                      { from: [x2, y1], to: [x2, y2], color: '#dc2626', width: 2.4, dashed: true }
                    ]
              }
              angles={same || vertical || dy === 0 ? [] : [{ at: [x2, y1], p: [x1, y1], q: [x2, y2], right: true, r: 10 }]}
              points={[
                { at: [x1, y1], label: 'A', color: '#2563eb' },
                { at: [x2, y2], label: 'B', color: '#e11d48' }
              ]}
            />
          </div>
          <div className="border-t border-slate-200 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Irányszög: α = {alpha}°</label>
              <input type="range" min="-89" max="89" step="1" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full accent-purple-600" aria-label="irányszög" />
              <div className="flex flex-wrap gap-2 mt-2">
                {[14, 45, 60, 70, 75, -41].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAlpha(a)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {fmt(a, 0)}°
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-sm font-mono text-purple-900 space-y-1">
              <div>m = tg {fmt(alpha, 0)}° ≈ <strong>{fmt(tgAlpha, 4)}</strong></div>
              <div>Ez {fmt(tgAlpha * 100, 1)}%-os {alpha > 0 ? 'emelkedő' : alpha < 0 ? 'lejtő' : 'vízszintes út'}.</div>
              <div className="text-xs text-purple-700">Ha α → 90°, a meredekség minden határon túl nő – a 90°-nak nincs tangense.</div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SlopeTangentTheory;
