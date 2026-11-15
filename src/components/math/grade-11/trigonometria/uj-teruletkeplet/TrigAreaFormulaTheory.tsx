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
  ReservoirParallelogramSvg,
  ParallelogramAreaSvg,
  TriangleAreaSvg,
  ChordSectorSvg,
  KiteAreaSvg
} from './TrigAreaFormulaFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
const fmtBig = (x: number) =>
  Number.isFinite(x) ? Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '–';

export const TrigAreaFormulaTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: területképlet
  const [shape, setShape] = useState<'triangle' | 'parallelogram'>('triangle');
  const [sideA, setSideA] = useState<number>(4.5);
  const [sideB, setSideB] = useState<number>(2.8);
  const [gamma, setGamma] = useState<number>(73);

  // Labor II: víztározó
  const [resA, setResA] = useState<number>(1.3);
  const [resB, setResB] = useState<number>(1.2);
  const [resAngle, setResAngle] = useState<number>(41);
  const [depth, setDepth] = useState<number>(2.5);

  const height = sideB * Math.sin(toRad(gamma));
  const paraArea = sideA * height;
  const area = shape === 'triangle' ? paraArea / 2 : paraArea;

  // Labor I rajz
  const sc = Math.min(250 / (sideA + sideB * Math.cos(toRad(gamma))), 150 / Math.max(height, 0.1));
  const P0 = { x: 30, y: 190 };
  const P1 = { x: P0.x + sideA * sc, y: P0.y };
  const P3 = { x: P0.x + sideB * sc * Math.cos(toRad(gamma)), y: P0.y - height * sc };
  const P2 = { x: P1.x + P3.x - P0.x, y: P3.y };
  const foot = { x: P3.x, y: P0.y };

  // Labor II számítások
  const resAreaKm2 = resA * resB * Math.sin(toRad(resAngle));
  const resAreaM2 = resAreaKm2 * 1e6;
  const volumeM3 = resAreaM2 * depth;
  const volumeHl = volumeM3 * 10;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="uj-teruletkeplet"
      title="6. Új területképlet"
      subtitle="Mennyi víz van a víztározóban? A paralelogramma és a háromszög területe két oldalból és a közbezárt szög szinuszából."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_uj_teruletkeplet_tananyag.pdf"
      practiceTitle="Készen állsz a területszámításra szinusszal?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TERÜLET KÉT OLDALBÓL ÉS A KÖZBEZÁRT SZÖGBŐL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                háromszög: T = a · b · sin γ / 2 &nbsp;•&nbsp; paralelogramma: T = a · b · sin γ
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                γ a két oldal által <strong>közrefogott</strong> szög; az a oldalhoz tartozó magasság <strong>mₐ = b · sin γ</strong>.
              </li>
              <li>A képlet a régi „alap · magasság” képletből jön: a magasságot a szinusz segítségével fejezzük ki.</li>
              <li>
                Ebben a leckében γ hegyesszög; a tompaszög szinuszával a 7. lecke foglalkozik. Figyelj az <strong>egyforma mértékegységekre</strong>!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: mennyi víz van a tározóban?" badge="Tankönyv 20. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A térképen a víztározó alakja egy paralelogrammával közelíthető, amelynek oldalai <strong>1,2 km</strong> és <strong>1,3 km</strong>, hegyesszöge <strong>41°</strong>. A víz átlagos mélysége <strong>2,5 m</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A víz mennyiségét egy hasáb térfogatával becsüljük: alaplap a paralelogramma, magasság 2,5 m.</li>
              <li>A paralelogramma területe T = 1,3 · m, ahol m az 1,3 km-es oldalhoz tartozó magasság.</li>
              <li>A magasság egy derékszögű háromszög befogója: m / 1,2 = sin 41° ⇒ m = 1,2 · sin 41° ≈ 0,79 km.</li>
              <li>T = 1,3 · 1,2 · sin 41° ≈ <strong>1 km²</strong> = 10⁶ m².</li>
              <li>V ≈ 2,5 · 10⁶ m³ (két és fél millió köbméter), ez <strong>25 millió hektoliter</strong>.</li>
            </ul>
          </div>
          <ReservoirParallelogramSvg />
        </div>
        <TheoryCallout type="warning" title="Mértékegységek!">
          A mélység méterben, az oldalak kilométerben vannak megadva. Mielőtt szorzunk, váltsunk át: 1 km² = 10⁶ m², 1 m³ = 10 hl.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: paralelogramma és háromszög területe" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Paralelogramma" badge="T = a · b · sin γ" badgeColor="indigo">
            <ParallelogramAreaSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy paralelogramma két szomszédos oldala a és b, az általuk közrefogott hegyesszög γ, akkor a magassága <strong>mₐ = b · sin γ</strong>, területe <strong>T = a · mₐ = a · b · sin γ</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Háromszög" badge="T = a · b · sin γ / 2" badgeColor="emerald">
            <TriangleAreaSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy háromszög két oldala a és b, az általuk közrefogott hegyesszög γ, akkor az a oldalhoz tartozó magasság <strong>mₐ = b · sin γ</strong>, a terület <strong>T = a · mₐ / 2 = a · b · sin γ / 2</strong>.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mt-2">
              <strong>Példa:</strong> a = 4,5 cm, b = 2,8 cm, γ = 73° ⇒ T = (4,5 · 2,8 · sin 73°) : 2 ≈ <strong>6,0 cm²</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok a tankönyv feladataiból" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Szög a területből (3. a)" badge="sin⁻¹" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy paralelogramma területe 45 cm², oldalai 8 cm és 7,5 cm. Mekkora a hegyesszöge?</li>
              <li>45 = 8 · 7,5 · sin γ ⇒ sin γ = 45 / 60 = 0,75</li>
              <li>Számológéppel: <strong>γ ≈ 48,6°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Oldalak a területből és a kerületből (3. b)" badge="egyenletrendszer" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hegyesszög 40°, terület 0,3214 m², kerület 3 m.</li>
              <li>a · b · sin 40° = 0,3214 ⇒ a · b ≈ 0,5; és 2(a + b) = 3 ⇒ a + b = 1,5.</li>
              <li>a és b az x² − 1,5x + 0,5 = 0 gyökei: <strong>a = 1 m, b = 0,5 m</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Húr, körcikk, háromszög (2. feladat)" badge="kör" badgeColor="amber">
            <ChordSectorSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>r = 18 cm, AB = 30 cm. A K-ból húzott merőleges felezi a húrt és az AKB∢-et: sin(AKB∢/2) = 15/18 ⇒ <strong>AKB∢ ≈ 112,9°</strong>.</li>
              <li>Ívek: 18 · 112,9° · π / 180° ≈ <strong>35,5 cm</strong>, a másik ≈ <strong>77,6 cm</strong>.</li>
              <li>Körcikkek: 18² · π · 112,9°/360° ≈ <strong>319,2 cm²</strong>, a másik ≈ <strong>698,7 cm²</strong>.</li>
              <li>Háromszög: a húr távolsága √(18² − 15²) = √99 ≈ 9,95 cm, T = 30 · 9,95 / 2 ≈ <strong>149,2 cm²</strong>.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              (Az AKB∢ tompaszög, ezért itt még a magassággal számolunk; a tompaszög szinuszát a 7. lecke vezeti be.)
            </p>
          </TheoryCard>
          <TheoryCard title="D) Mérési hiba hatása (1. b)" badge="hasonlóság" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha minden hosszúság legfeljebb ±1%-kal tér el, a valódi alaprajz a mért alaprajzhoz hasonló, a hasonlóság aránya 0,99 és 1,01 közé esik. A területek aránya a hasonlósági arány négyzete: 1,01² = 1,0201 és 0,99² = 0,9801, vagyis a terület bizonytalansága kb. <strong>±2%</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Házi feladatok */}
      <TheorySection title="4. Házi feladatok eredményei" badge="Házi feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <KiteAreaSvg />
          <TheoryTable
            headers={['Feladat', 'Ötlet', 'Eredmény']}
            rows={[
              ['1. a) Deltoid: 7 cm és 14 cm, köztük 82,2°', 'két egybevágó háromszög', 'T = 7 · 14 · sin 82,2° ≈ 97,1 cm²'],
              ['1. b) Deltoid: 7 cm, 14 cm, egyik átló 7 cm', 'a 7 cm-es oldalak szabályos háromszöget alkotnak', 'szögek 60°, ≈ 135,5°, ≈ 29,0°, ≈ 135,5°; másik átló ≈ 19,6 cm; T ≈ 68,7 cm²'],
              ['2. a) 132,6°-os középponti szöghöz 12 cm-es húr', 'sin 66,3° = 6 / r', 'r ≈ 6,55 cm'],
              ['2. b) A húr távolsága a középponttól', 'd = r · cos 66,3°', 'd ≈ 2,63 cm'],
              ['2. c) Egyenlő szárú háromszög (alap a húr, csúcs a középpont)', 'T = 12 · d / 2', 'T ≈ 15,8 cm²']
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: nem a közbezárt szög" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Melyik szög kerül a képletbe?"
          wrong="T = a · b · sin α / 2, ahol α az a oldallal szemközti szög"
          wrongExplanation="A képlet levezetésében a b oldal a magasság derékszögű háromszögének átfogója, és a magasság a két oldal által KÖZREFOGOTT szöggel szemben van. Más szöggel hamis eredményt kapunk."
          correct="T = a · b · sin γ / 2, ahol γ az a és b oldal által közrefogott szög"
          correctExplanation="Mindig a két ismert oldal között lévő szöget használd. Háromszögnél ne felejtsd el a 2-vel való osztást, paralelogrammánál viszont nincs osztás!"
          tip="Gyors ellenőrzés: a terület legfeljebb a · b / 2 (háromszög) vagy a · b (paralelogramma) lehet, mert sin γ ≤ 1."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Terület két oldalból és a közbezárt szögből" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShape('triangle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${shape === 'triangle' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              háromszög
            </button>
            <button
              onClick={() => setShape('parallelogram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${shape === 'parallelogram' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              paralelogramma
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a oldal: {fmt(sideA, 1)} cm</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="a oldal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">b oldal: {fmt(sideB, 1)} cm</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                  aria-label="b oldal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">közrefogott γ szög: {gamma}°</label>
                <input
                  type="range"
                  min="5"
                  max="89"
                  step="1"
                  value={gamma}
                  onChange={(e) => setGamma(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="gamma szög"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1 font-mono">
                <div>mₐ = b · sin γ = {fmt(sideB)} · {fmt(Math.sin(toRad(gamma)), 4)} ≈ {fmt(height)} cm</div>
                <div>
                  T = a · b · sin γ{shape === 'triangle' ? ' / 2' : ''} ≈ <strong>{fmt(area)} cm²</strong>
                </div>
                <div className="text-xs text-slate-500">
                  Felső korlát (sin γ ≤ 1): {fmt(shape === 'triangle' ? (sideA * sideB) / 2 : sideA * sideB)} cm²
                </div>
              </div>
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {shape === 'parallelogram' ? (
                <polygon
                  points={`${P0.x},${P0.y} ${P1.x},${P1.y} ${P2.x},${P2.y} ${P3.x},${P3.y}`}
                  fill="rgba(16,185,129,0.15)"
                  stroke="#059669"
                  strokeWidth="2"
                />
              ) : (
                <polygon
                  points={`${P0.x},${P0.y} ${P1.x},${P1.y} ${P3.x},${P3.y}`}
                  fill="rgba(16,185,129,0.15)"
                  stroke="#059669"
                  strokeWidth="2"
                />
              )}
              <line x1={P3.x} y1={P3.y} x2={foot.x} y2={foot.y} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
              {foot.x > P0.x + 12 && (
                <>
                  {/* derékszög: negyedkörív ponttal */}
                  <path d={`M ${foot.x + 12} ${foot.y} A 12 12 0 0 0 ${foot.x} ${foot.y - 12}`} fill="none" stroke="#dc2626" strokeWidth="1.5" />
                  <circle cx={foot.x + 4.7} cy={foot.y - 4.7} r="1.8" fill="#dc2626" />
                </>
              )}
              <text x={P0.x + 22} y={P0.y - 6} fontSize="11" fontWeight="bold" fill="#6d28d9">γ = {gamma}°</text>
              <text x={(P0.x + P1.x) / 2} y={P0.y + 16} fontSize="11" textAnchor="middle" fill="#047857">a</text>
              <text x={(P0.x + P3.x) / 2 - 8} y={(P0.y + P3.y) / 2} fontSize="11" textAnchor="end" fill="#4338ca">b</text>
              <text x={P3.x + 5} y={(P3.y + foot.y) / 2} fontSize="11" fill="#b91c1c">mₐ</text>
              <text x="320" y="212" fontSize="12" textAnchor="end" fontWeight="bold" fill="#065f46">T ≈ {fmt(area)} cm²</text>
            </svg>
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Rögzített oldalak mellett a terület a szög növelésével nő (mert hegyesszögre a szinusz növekvő). Az a = 4,5, b = 2,8, γ = 73° beállítás a tankönyvi példát adja (≈ 6,0 cm²).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Víztározó-becslő" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egyik oldal (km)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={resA}
                onChange={(e) => setResA(Math.max(0.1, Number(e.target.value) || 0.1))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="egyik oldal"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">másik oldal (km)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={resB}
                onChange={(e) => setResB(Math.max(0.1, Number(e.target.value) || 0.1))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="másik oldal"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">hegyesszög: {resAngle}°</label>
              <input
                type="range"
                min="5"
                max="89"
                value={resAngle}
                onChange={(e) => setResAngle(Number(e.target.value))}
                className="w-full accent-sky-600"
                aria-label="hegyesszög"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">átlagos mélység: {fmt(depth, 1)} m</label>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full accent-blue-600"
                aria-label="mélység"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="bg-sky-50 rounded-xl p-2 border border-sky-200">
              <div className="text-[11px] text-slate-500">alapterület (km²)</div>
              <div className="font-mono font-black text-sky-900">{fmt(resAreaKm2, 3)}</div>
            </div>
            <div className="bg-sky-50 rounded-xl p-2 border border-sky-200">
              <div className="text-[11px] text-slate-500">alapterület (m²)</div>
              <div className="font-mono font-black text-sky-900">{fmtBig(resAreaM2)}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
              <div className="text-[11px] text-slate-500">víz térfogata (m³)</div>
              <div className="font-mono font-black text-blue-900">{fmtBig(volumeM3)}</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
              <div className="text-[11px] text-slate-500">hektoliterben</div>
              <div className="font-mono font-black text-indigo-900">{fmtBig(volumeHl)}</div>
            </div>
          </div>
          <TheoryCallout type="info" title="Lépések">
            1. T = a · b · sin γ (km²) → 2. átváltás: · 10⁶ (m²) → 3. V = T · mélység (m³) → 4. · 10 (hl). A tankönyvi adatokkal (1,3 km, 1,2 km, 41°, 2,5 m) pontosan ≈ 2,56 millió m³ jön ki; a tankönyv a területet 1 km²-re kerekítve 2,5 millió m³-t, azaz 25 millió hl-t ad meg.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TrigAreaFormulaTheory;
