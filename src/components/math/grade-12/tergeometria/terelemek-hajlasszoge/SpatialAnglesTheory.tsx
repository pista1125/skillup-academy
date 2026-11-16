import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeBox, Vec3, Solid3DExtraSegment } from '../shared/Solid3DViewer';
import {
  CrateDiagonalsSvg,
  DiagonalBaseAngleSvg,
  LineLineAngleSvg,
  LinePlaneAngleSvg,
  PlanePlaneAngleSvg,
  SquarePrismPlaneSvg
} from './SpatialAnglesFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
const deg = (rad: number) => (rad * 180) / Math.PI;

type Pair = 'diag-base' | 'diag-edge' | 'two-diags' | 'plane-base';

const PAIR_LABEL: Record<Pair, string> = {
  'diag-base': 'AG testátló – ABCD alaplap',
  'diag-edge': 'AG testátló – AE él',
  'two-diags': 'AG és CE testátló',
  'plane-base': 'BDG sík – ABCD alaplap'
};

export const SpatialAnglesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: forgatható téglatest, választható térelem-pár
  const [ab, setAb] = useState<number>(6);
  const [bc, setBc] = useState<number>(6);
  const [ae, setAe] = useState<number>(6);
  const [pair, setPair] = useState<Pair>('diag-base');

  const solid = useMemo(() => makeBox(ab, ae, bc), [ab, ae, bc]);
  const V = solid.vertices;
  const [A, B, C, D, , , G] = V;
  const E = V[4];

  const ac = Math.hypot(ab, bc);
  const ag = Math.hypot(ab, bc, ae);
  const bd = ac;
  // BDG sík: a C csúcs távolsága a BD egyenestől
  const cDist = (ab * bc) / bd;

  let angle = 0;
  let steps: string[] = [];
  let extras: Solid3DExtraSegment[] = [];
  let polygons: { points: Vec3[]; fill?: string; opacity?: number }[] = [];
  if (pair === 'diag-base') {
    angle = deg(Math.atan(ae / ac));
    steps = [
      `AC = √(AB² + BC²) = √(${fmt(ab * ab, 0)} + ${fmt(bc * bc, 0)}) ≈ ${fmt(ac)}`,
      'AG vetülete az alaplapon AC; a GCA háromszög C-nél derékszögű.',
      `tg β = CG / AC = ${fmt(ae)} / ${fmt(ac)} ⇒ β ≈ ${fmt(angle, 1)}°`
    ];
    extras = [
      { from: A, to: G, color: '#dc2626', width: 3 },
      { from: A, to: C, color: '#059669', width: 3, dashed: true },
      { from: C, to: G, color: '#2563eb', width: 2.5 }
    ];
    polygons = [{ points: [A, B, C, D], fill: '#10b981', opacity: 0.15 }];
  } else if (pair === 'diag-edge') {
    angle = deg(Math.acos(ae / ag));
    steps = [
      `AG = √(AB² + BC² + AE²) ≈ ${fmt(ag)}`,
      'Az AEG háromszög E-nél derékszögű (AE ⟂ EFGH).',
      `cos γ = AE / AG = ${fmt(ae)} / ${fmt(ag)} ⇒ γ ≈ ${fmt(angle, 1)}°`
    ];
    extras = [
      { from: A, to: G, color: '#dc2626', width: 3 },
      { from: A, to: E, color: '#2563eb', width: 3 },
      { from: E, to: G, color: '#059669', width: 2.5, dashed: true }
    ];
  } else if (pair === 'two-diags') {
    const half = deg(Math.atan(ac / ae));
    const full = 2 * half;
    angle = full > 90 ? 180 - full : full;
    steps = [
      'AG és CE az ACGE téglalap átlói, felezik egymást.',
      `A téglalap oldalai: AC ≈ ${fmt(ac)}, AE = ${fmt(ae)}.`,
      `Az átlók szögei: 2 · arctg(AC / AE) ≈ ${fmt(full, 1)}° és ${fmt(180 - full, 1)}° ⇒ hajlásszög ≈ ${fmt(angle, 1)}°`
    ];
    extras = [
      { from: A, to: G, color: '#dc2626', width: 3 },
      { from: C, to: E, color: '#2563eb', width: 3 }
    ];
    polygons = [{ points: [A, C, G, E], fill: '#6366f1', opacity: 0.15 }];
  } else {
    angle = deg(Math.atan(ae / cDist));
    const t = (bc * bc) / (bd * bd);
    const P: Vec3 = [B[0] + (D[0] - B[0]) * t, 0, B[2] + (D[2] - B[2]) * t];
    steps = [
      'A két sík metszésvonala BD. A C és a G pontból BD-re bocsátott merőlegesek talppontja ugyanaz a P pont.',
      `CP = AB · BC / BD ≈ ${fmt(cDist)} (a BCD derékszögű háromszög magassága)`,
      `tg δ = CG / CP = ${fmt(ae)} / ${fmt(cDist)} ⇒ δ ≈ ${fmt(angle, 1)}°`
    ];
    extras = [
      { from: B, to: D, color: '#0f172a', width: 2.5 },
      { from: P, to: C, color: '#059669', width: 3, dashed: true },
      { from: P, to: G, color: '#dc2626', width: 3 },
      { from: C, to: G, color: '#2563eb', width: 2.5 }
    ];
    polygons = [
      { points: [B, D, G], fill: '#f59e0b', opacity: 0.25 },
      { points: [A, B, C, D], fill: '#10b981', opacity: 0.12 }
    ];
  }

  // Labor II: lejtő / létra – egyenes és sík hajlásszöge
  const [len, setLen] = useState<number>(5);
  const [height, setHeight] = useState<number>(4.5);
  const h = Math.min(height, len);
  const proj = Math.sqrt(Math.max(0, len * len - h * h));
  const slope = deg(Math.asin(h / len));
  const scale = 200 / Math.max(len, 1);
  const X0 = 50;
  const Y0 = 210;
  const top: [number, number] = [X0 + proj * scale, Y0 - h * scale];

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="terelemek-hajlasszoge"
      title="9. Térelemek hajlásszöge"
      subtitle="Elfér-e két 31 cm-es pálca egy 30 × 6 × 5 cm-es ládában, és mekkora szöget zárnak be? Két egyenes, egyenes és sík, két sík hajlásszöge."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="amber"
      pdfFilename="12_osztaly_terelemek_hajlasszoge_tananyag.pdf"
      practiceTitle="Készen állsz a hajlásszögekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÉRELEMEK HAJLÁSSZÖGE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">0° ≤ hajlásszög ≤ 90°</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Két egyenes:</strong> a keletkező szögek közül a nem nagyobbik; párhuzamosaké 0°.
              </li>
              <li>
                <strong>Egyenes és sík:</strong> az egyenes és a síkra eső merőleges vetületének szöge.
              </li>
              <li>
                <strong>Két sík:</strong> a metszésvonal egy pontjában, a metszésvonalra merőlegesen a két síkban állított egyenesek szöge.
              </li>
              <li>A számolás egy alkalmas derékszögű háromszögben, a szögfüggvényekkel történik.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Kidolgozott feladat: pálcák a tárolóládában" badge="Tankönyv 24. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy téglatest alakú tárolóláda magassága <strong>5 cm</strong>, alaplapjának oldalai <strong>6 cm</strong> és <strong>30 cm</strong>.
              Elfér-e benne két <strong>31 cm</strong> hosszú vékony fémpálca? Mekkora szöget zárnak be egymással és a legnagyobb lappal?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                A pálca nem lehet hosszabb a testátlónál: e² = 5² + 6² + 30² = 961 ⇒ <strong>e = 31 cm</strong>, tehát a testátlók mentén elférnek.
              </li>
              <li>Ugyanazon testátló mentén a hajlásszög 0°.</li>
              <li>
                Két különböző testátló (pl. AG és HB) felezi egymást: HK = AK = 15,5 cm. A szög a HAK egyenlő szárú háromszög szárszöge.
              </li>
              <li>
                AH = √(5² + 6²) = √61 ≈ 7,81 cm. A szögfelező az AH alapot P-ben felezi: sin(α/2) = HP / HK = 3,905 / 15,5 ≈ 0,2519 ⇒ α/2 ≈ 14,6°,{' '}
                <strong>α ≈ 29,2°</strong>.
              </li>
            </ul>
          </div>
          <CrateDiagonalsSvg />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DiagonalBaseAngleSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A legnagyobb területű lap az ABCD téglalap. Az AG pálca ezzel akkora szöget zár be, mint a pálca és merőleges vetülete („árnyéka”),
              az AC szakasz: a GAC∢ = β-t keressük.
            </p>
            <p>A GAC háromszög C-nél derékszögű, mert a CG él merőleges az ABCD lapra, így annak AC egyenesére is:</p>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center font-mono font-bold text-amber-900">
              sin β = CG / AG = 5 / 31 ≈ 0,1613 ⇒ β ≈ 9,3°
            </div>
            <p>Az egybevágóság miatt bármelyik másik testátlóval ugyanezt a hajlásszöget kapjuk.</p>
          </div>
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: a hajlásszögek definíciói" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <LineLineAngleSvg />
          <LinePlaneAngleSvg />
          <PlanePlaneAngleSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Két egyenes" badge="e, f" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Két metsző egyenes hajlásszöge a két egyenes által meghatározott két-két egyenlő szög közül a <strong>nem nagyobbik</strong>{' '}
              (legfeljebb 90°). Két párhuzamos egyenes szöge 0°. (Kitérő egyeneseknél egy ponton át húzott párhuzamosaik szögét vesszük.)
            </p>
          </TheoryCard>
          <TheoryCard title="2. Egyenes és sík" badge="e, S" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Egy egyenes <strong>merőleges</strong> egy síkra, ha a sík minden egyenesére merőleges – ehhez elég, ha a döféspontban két síkbeli
              egyenesre merőleges. Egy (nem merőleges) egyenes és a sík hajlásszöge az egyenes és a síkra eső <strong>merőleges vetületének</strong>{' '}
              szöge. Párhuzamos egyenes és sík szöge 0°.
            </p>
          </TheoryCard>
          <TheoryCard title="3. Két sík" badge="S₁, S₂" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Két metsző sík hajlásszöge az a szög, amelyet a metszésvonal tetszőleges pontjában a metszésvonalra <strong>merőlegesen</strong>{' '}
              állított, az egyik, illetve a másik síkra illeszkedő egyenesek határoznak meg. Párhuzamos síkok szöge 0°.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Megjegyzés">
          Két egyenes, egyenes és sík, illetve két sík hajlásszöge sem lehet nagyobb 90°-nál. A hajlásszög meghatározásához a szöget tartalmazó,
          alkalmas <strong>derékszögű háromszögben</strong> számolunk a hegyesszögek szögfüggvényeivel.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Négyzetes oszlop síkmetszetei" badge="1. feladat" badgeColor="purple">
            <SquarePrismPlaneSvg className="w-full h-auto mb-3" />
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Az ABCDEFGH négyzetes oszlop alapéle 5 cm, magassága 9 cm.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>a) ABGH és ACGE is téglalap.</li>
                <li>
                  b) T(ABGH) = 5 · √(5² + 9²) = 5√106 ≈ <strong>51,48 cm²</strong>; T(ACGE) = 5√2 · 9 ≈ <strong>63,64 cm²</strong>.
                </li>
                <li>
                  c) ABGH és az alaplap: tg φ = 9/5 ⇒ <strong>φ ≈ 60,9°</strong>; az ABFE (és DCGH) oldallappal ≈ 29,1°, a BCGF és ADHE
                  oldallapra merőleges (90°).
                </li>
                <li>ACGE merőleges az alaplapra (90°), az oldallapokkal 45°-ot zár be.</li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) A 6 cm élű kocka" badge="2. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                a) Az AG egyenes vetülete a BCGF síkon BG, az ABG háromszög B-nél derékszögű: tg α = AB / BG = 6 / (6√2) ⇒ <strong>α ≈ 35,3°</strong>.
              </li>
              <li>
                b) A BDG és ABCD sík metszésvonala BD. A BD felezőpontjából (O) a két síkban merőleges: OC és OG. tg β = CG / OC = 6 / (3√2) = √2 ⇒{' '}
                <strong>β ≈ 54,7°</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Szabályos hatszög alapú hasáb" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A leghosszabb testátló 14 cm, és 60°-ot zár be az alaplappal.</li>
              <li>
                Vetülete a leghosszabb alaplap-átló: 14 · cos 60° = 7 = 2a ⇒ <strong>a = 3,5 cm</strong>; magasság m = 14 · sin 60° ≈{' '}
                <strong>12,12 cm</strong>.
              </li>
              <li>
                A rövidebb alaplap-átló a√3 ≈ 6,06 cm, a rövidebb testátló √(6,06² + 12,12²) ≈ <strong>13,56 cm</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok" badge="HF 1–2." badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                HF 1. Téglatest 5,18 × 3,75 × 9,92 cm: AG és alaplap ≈ 57,2°; AG és AE ≈ 32,8°; AG és CE ≈ 65,6° – valóban 2 · EAG∢.
              </li>
              <li>
                HF 2. Négyzetes oszlop, T_alap = 1 dm², palást 280 cm² ⇒ a = 10 cm, m = 7 cm. AK = √(50 + 49) ≈ 9,95 cm; AK és AB ≈ 59,83°; AK és
                alaplap ≈ 44,71°.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Térelemek', 'Melyik derékszögű háromszög?', 'Szögfüggvény']}
          rows={[
            ['testátló – alaplap', 'testátló, alaplap-átló, oldalél', 'tg = él / alaplap-átló'],
            ['testátló – oldalél', 'testátló, oldalél, fedőlap-átló', 'cos = él / testátló'],
            ['lapátló – alapél', 'lapátló, két él', 'tg = magasság / alapél'],
            ['átlós sík – alaplap', 'él, a metszésvonalra merőleges szakasz', 'tg = él / távolság']
          ]}
        />
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: nem a vetülettel mért szög" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Egyenes és sík szöge ≠ egyenes és tetszőleges síkbeli egyenes szöge"
          wrong="Az AG testátló és az alaplap szöge = az AG és az AB él szöge."
          wrongExplanation="Az AB csak egy síkbeli egyenes; a sík szögéhez a merőleges vetületet (AC) kell venni. A ládánál AG és AB szöge ≈ 14,6°, az alaplappal bezárt szög viszont ≈ 9,3°."
          correct="Az egyenes és a sík szöge az egyenes és merőleges vetületének szöge: GAC∢."
          correctExplanation="A vetület a legkisebb szöget adja az összes síkbeli egyenes közül. Két síknál is a metszésvonalra merőleges egyeneseket kell venni."
          tip="Ha 90°-nál nagyobb szöget kapsz (pl. két testátló között), a hajlásszög a kiegészítő szöge: 180° − φ."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Forgatható téglatest – válassz térelem-párt!" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    ['AB', ab, setAb],
                    ['BC', bc, setBc],
                    ['AE', ae, setAe]
                  ] as [string, number, (v: number) => void][]
                ).map(([lbl, val, set]) => (
                  <div key={lbl}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {lbl} = {fmt(val, 1)}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="0.5"
                      value={val}
                      onChange={(e) => set(Number(e.target.value))}
                      className="w-full accent-amber-600"
                      aria-label={`${lbl} él`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(PAIR_LABEL) as Pair[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPair(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${pair === p ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {PAIR_LABEL[p]}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                {steps.map((s, i) => (
                  <div key={i}>
                    {i + 1}. {s}
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-center">
                <div className="text-[11px] text-slate-500">hajlásszög</div>
                <div className="font-mono text-xl font-black text-amber-900">{fmt(angle, 1)}°</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Próbáld ki: AB = BC = AE = 6 (kocka) ⇒ testátló–alaplap ≈ 35,3°, BDG–alaplap ≈ 54,7°, két testátló ≈ 70,5°.
              </p>
            </div>
            <Solid3DViewer solid={solid} extras={extras} polygons={polygons} />
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Létra a falnak – egyenes és sík szöge" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A létra (szakasz) hossza: {fmt(len, 1)} m</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={len}
                  onChange={(e) => setLen(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="létra hossza"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A felső vég magassága: {fmt(h, 1)} m</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="magasság"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>1. vetület (árnyék) a talajon: √({fmt(len * len)} − {fmt(h * h)}) ≈ <strong>{fmt(proj)} m</strong></div>
                <div>2. sin α = magasság / hossz = {fmt(h)} / {fmt(len)} ≈ {fmt(h / len, 4)}</div>
                <div>
                  3. a létra és a talaj (sík) hajlásszöge: <strong>α ≈ {fmt(slope, 1)}°</strong>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  {h >= len - 1e-9 ? 'A létra függőleges: merőleges a síkra (90°).' : h <= 1e-9 ? 'A létra a talajon fekszik: a síkban van (0°).' : 'A létra és a fal szöge: 90° − α ≈ ' + fmt(90 - slope, 1) + '°'}
                </div>
              </div>
              <TheoryCallout type="success" title="Gondold végig!">
                A talaj síkjában a létra vetülete adja a legkisebb szöget. Ha a létra talppontjából egy másik síkbeli egyenest veszel, azzal a létra
                nagyobb szöget zár be.
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 320 240" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="20" y1={Y0} x2="300" y2={Y0} stroke="#059669" strokeWidth="2.5" />
              <line x1={top[0]} y1={Y0} x2={top[0]} y2={Math.min(Y0 - 4, top[1] - 10)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1={X0} y1={Y0} x2={top[0]} y2={top[1]} stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
              <line x1={X0} y1={Y0} x2={top[0]} y2={Y0} stroke="#059669" strokeWidth="3" strokeDasharray="7 4" />
              {h > 0.05 && h < len - 0.05 && (
                <>
                  <path
                    d={`M ${top[0] - 12} ${Y0} A 12 12 0 0 1 ${top[0]} ${Y0 - 12}`}
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="1.3"
                  />
                  <circle cx={top[0] - 4.7} cy={Y0 - 4.7} r="1.7" fill="#0f172a" />
                  <path
                    d={`M ${X0 + 34} ${Y0} A 34 34 0 0 0 ${X0 + 34 * Math.cos((slope * Math.PI) / 180)} ${Y0 - 34 * Math.sin((slope * Math.PI) / 180)}`}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  <text x={X0 + 46} y={Y0 - 10} fontSize="12" fontWeight="bold" fill="#b45309">α</text>
                </>
              )}
              <text x={(X0 + top[0]) / 2} y={Y0 + 18} fontSize="11" fill="#047857" textAnchor="middle">vetület</text>
              <text x="290" y={Y0 + 18} fontSize="11" fill="#047857" textAnchor="end">talaj (sík)</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SpatialAnglesTheory;
