import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeBox, makeCylinder, makeSphere, Solid3DExtraSegment } from '../shared/Solid3DViewer';
import {
  RubikCubesSvg,
  RatioPowersSvg,
  CylinderScaleSvg,
  ConcreteCubeSvg,
  BonbonSvg,
  MinyonSvg
} from './SimilarSolidsFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
const fmtS = (x: number) => (Number.isFinite(x) ? String(Number(x.toPrecision(4))).replace('.', ',') : '–');

type SolidKind = 'kocka' | 'henger' | 'gomb';
type RatioKind = 'hossz' | 'felszin' | 'terfogat';

const BASE: Record<SolidKind, { name: string; data: string; A: number; V: number }> = {
  kocka: { name: 'kocka', data: 'a = 1 cm', A: 6, V: 1 },
  henger: { name: 'henger', data: 'r = 1 cm, M = 2 cm', A: 6 * Math.PI, V: 2 * Math.PI },
  gomb: { name: 'gömb', data: 'r = 1 cm', A: 4 * Math.PI, V: (4 * Math.PI) / 3 }
};

export const SimilarSolidsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: λ-csúszka
  const [kind, setKind] = useState<SolidKind>('kocka');
  const [lambda, setLambda] = useState<number>(2);
  const solid = useMemo(() => {
    if (kind === 'kocka') return makeBox(lambda, lambda, lambda);
    if (kind === 'henger') return makeCylinder(0.6 * lambda, 1.2 * lambda);
    return makeSphere(0.7 * lambda, 6, 6);
  }, [kind, lambda]);
  const ghost = useMemo<Solid3DExtraSegment[]>(() => {
    if (kind !== 'kocka') return [];
    const b = makeBox(1, 1, 1);
    return b.edges.map(([i, j]) => ({ from: b.vertices[i], to: b.vertices[j], color: '#dc2626', width: 2 }));
  }, [kind]);
  const base = BASE[kind];

  // Labor II: arányfordító
  const [ratioKind, setRatioKind] = useState<RatioKind>('terfogat');
  const [ratioValue, setRatioValue] = useState<number>(4);
  const k =
    ratioKind === 'hossz' ? ratioValue : ratioKind === 'felszin' ? Math.sqrt(ratioValue) : Math.cbrt(ratioValue);

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="hasonlo-testek-felszine-terfogata"
      title="8. Hasonló testek felszíne, térfogata"
      subtitle="Hány kis kocka kell egy 4 × 4 × 4-es Rubik-kockához? Ha a test k-szorosára nagyul, a felszíne k²-szeresére, a térfogata k³-szorosára nő."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="emerald"
      pdfFilename="12_osztaly_hasonlo_testek_tananyag.pdf"
      practiceTitle="Készen állsz a hasonló testekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HASONLÓ TESTEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">A′ / A = k² &nbsp;&nbsp;|&nbsp;&nbsp; V′ / V = k³</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                k a hasonlóság aránya: a megfelelő <strong>szakaszok</strong> (élek, sugarak, magasságok) aránya.
              </li>
              <li>
                Síkidomoknál: kerületek aránya k, területek aránya k². Testeknél: felszínek aránya <strong>k²</strong>, térfogatok aránya{' '}
                <strong>k³</strong>.
              </li>
              <li>Visszafelé: térfogatarányból k = ∛(V′/V), felszínarányból k = √(A′/A).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a Rubik-kockák" badge="Tankönyv 22. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A Rubik-kockát (bűvös kocka) ifjabb Rubik Ernő alkotta meg 1974-ben. Az eredeti 3 × 3 × 3-as változat mellett létezik 2 × 2 × 2-es,
              4 × 4 × 4-es („Rubik bosszúja”), 5 × 5 × 5-ös („Professzor kockája”), sőt 25 × 25 × 25-ös kocka is.
            </p>
            <p>
              <strong>1. kidolgozott feladat:</strong> építsük fel ezeket 1 × 1 × 1-es kis kockákból! A 2 × 2 × 2-es kocka 6 lapján 6 · 2 · 2
              négyzetlap van, így felszíne <strong>4-szerese</strong> a kis kockáénak; 2 sorban 2 · 2 kis kockából áll, így térfogata{' '}
              <strong>8-szorosa</strong>.
            </p>
          </div>
          <RubikCubesSvg />
        </div>
        <TheoryTable
          headers={['A kocka mérete', 'Egy lap területe', 'Felszín', 'Kis kockák száma', 'k', 'A / A₁ = k²', 'V / V₁ = k³']}
          rows={[
            ['1 × 1 × 1', '1', '6', '1', '1', '1', '1'],
            ['2 × 2 × 2', '4', '24', '8', '2', '4', '8'],
            ['3 × 3 × 3', '9', '54', '27', '3', '9', '27'],
            ['4 × 4 × 4', '16', '96', '64', '4', '16', '64'],
            ['25 × 25 × 25', '625', '3750', '15 625', '25', '625', '15 625']
          ]}
        />
        <TheoryCallout type="info" title="Észrevétel">
          A nagyobb kockákat az 1 × 1 × 1-es kocka középpontos nagyításával kapjuk. A felszínek aránya a hasonlósági arány{' '}
          <strong>négyzete</strong>, a térfogatok aránya a hasonlósági arány <strong>köbe</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Henger */}
      <TheorySection title="2. Nem csak kockákra igaz: a henger nagyítása" badge="2. kidolgozott feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CylinderScaleSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Az r sugarú, M magasságú hengert k-szorosára nagyítjuk: r′ = k · r, M′ = k · M.</p>
            <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 font-mono text-sm text-sky-900 space-y-1">
              <div>A′ / A = (2(kr)²π + 2krπ · kM) / (2r²π + 2rπM) = k²</div>
              <div>V′ / V = (kr)²π · kM / (r²π · M) = k³</div>
            </div>
            <p>A henger felszíne tehát k²-szeresére, térfogata k³-szorosára nő.</p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. Elmélet: hasonló alakzatok arányai" badge="Elmélet" badgeColor="indigo">
        <RatioPowersSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. Emlékeztető: síkidomok" badge="k, k²" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha két síkidom hasonló, és a hasonlóság arányszáma k, akkor a <strong>kerületek aránya k</strong>, a{' '}
              <strong>területek aránya k²</strong>: K′/K = k, T′/T = k².
            </p>
          </TheoryCard>
          <TheoryCard title="2. Testek" badge="k², k³" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha két test hasonló, és a hasonlóság arányszáma k, akkor a <strong>felszínek aránya k²</strong>, a{' '}
              <strong>térfogatok aránya k³</strong>: A′/A = k², V′/V = k³.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Mikor hasonló két test?">
          Minden kocka hasonló egymáshoz, és minden gömb is. Két téglatest, két henger vagy két kúp csak akkor hasonló, ha <strong>minden</strong>{' '}
          megfelelő méretük ugyanannyiszoros (pl. a henger sugara ÉS magassága is k-szoros).
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Üreg a betonkockában" badge="1. feladat" badgeColor="slate">
            <ConcreteCubeSvg className="w-full h-auto mb-3" />
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Egy 1,26 m élű betonkockából kocka alakú üreget vájtak ki. Hányad része az üreg térfogata a megmaradt betonénak?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>a) 21 cm: k = 1/6, V_üreg = V/216 ⇒ az üreg a maradék <strong>1/215</strong> része.</li>
                <li>b) 42 cm: k = 1/3, V_üreg = V/27 ⇒ <strong>1/26</strong> része.</li>
                <li>c) 63 cm: k = 1/2, V_üreg = V/8 ⇒ <strong>1/7</strong> része.</li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Marcipánból bonbon" badge="2. feladat" badgeColor="amber">
            <BonbonSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) 340 db 22 mm-es golyó: 340 · 4 · 11³ · π / 3 ≈ 1 895 600 mm³ ≈ <strong>1,90 dm³</strong>.</li>
              <li>b) k = 30/22, a térfogatarány k³ ≈ <strong>2,54</strong>.</li>
              <li>c) máz: 340 · 4π(15³ − 11³)/3 ≈ <strong>2,91 dm³</strong>.</li>
              <li>d) 5,2 dm³ csokoládéval egy bonbon átmérője ≈ <strong>34,2 mm</strong> lett volna.</li>
              <li>e) felszínek: ≈ 1520,5 mm² (22 mm), ≈ 2827,4 mm² (30 mm), ≈ 3665,7 mm² (34,2 mm).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Óriás minyon" badge="Házi feladat 2." badgeColor="rose">
            <MinyonSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) A 4 cm × 3 cm × 2,5 cm-es minyon 3-szoros nagyításának élei: 12 cm, 9 cm, 7,5 cm.</li>
              <li>b) A kis minyon felszíne 2(12 + 10 + 7,5) = 59 cm², a nagyé 9 · 59 = <strong>531 cm²</strong>.</li>
              <li>c) A térfogat 30 cm³ → 27 · 30 = <strong>810 cm³</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Visszafelé: ismert térfogatarány" badge="Házi feladat 3." badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Egy forgáshenger térfogata nagyítás során 4-szeresére nőtt: k³ = 4 ⇒ k = ∛4 ≈ 1,587.</li>
              <li>
                a) A felszín k² = ∛16 ≈ <strong>2,52-szeresére</strong> nőtt.
              </li>
              <li>
                b) A nagyított henger r = 7 cm, M = 3 cm ⇒ az eredeti r = 7 / ∛4 ≈ <strong>4,4 cm</strong>, M = 3 / ∛4 ≈ <strong>1,9 cm</strong>.
              </li>
              <li>
                HF 1. (sörétek): k = 20 mm / 1 mm = 20 ⇒ k³ = <strong>8000</strong> sörét; felszín: 8000 · (1/20)² = <strong>20-szoros</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: kétszer akkora ≠ kétszer annyi anyag" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A térfogat is k-szorosára nő?"
          wrong="A 3-szoros minyonhoz 3-szor annyi tészta kell (90 cm³)."
          wrongExplanation="Mindhárom él 3-szoros, ezért a térfogat 3 · 3 · 3 = 27-szeres: 810 cm³. A bevonó csokoládé (felszín) 9-szeres."
          correct="Élek: k = 3; felszín: k² = 9; térfogat: k³ = 27."
          correctExplanation="Először mindig a hasonlóság arányát (k) határozd meg a szakaszokból, és csak utána emeld négyzetre vagy köbre."
          tip="Visszafelé is figyelj: ha a térfogat 8-szoros, a szakaszok csak 2-szeresek (∛8), a felszín 4-szeres."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: λ-csúszka – k, k², k³ együtt" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {(['kocka', 'henger', 'gomb'] as SolidKind[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setKind(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === s ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {BASE[s].name}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hasonlósági arány k: {fmt(lambda, 2)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.25"
                  value={lambda}
                  onChange={(e) => setLambda(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="hasonlósági arány"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-sky-50 rounded-xl p-2 border border-sky-200">
                  <div className="text-[11px] text-slate-500">szakaszok: k</div>
                  <div className="font-mono font-black text-sky-900">{fmt(lambda)}</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">felszín: k²</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(lambda ** 2)}</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">térfogat: k³</div>
                  <div className="font-mono font-black text-amber-900">{fmt(lambda ** 3)}</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-700 space-y-1">
                <div>
                  Eredeti {base.name} ({base.data}): A = {fmt(base.A)} cm², V = {fmt(base.V)} cm³
                </div>
                <div>
                  Nagyított: A′ = {fmt(lambda ** 2)} · {fmt(base.A)} = <strong>{fmt(lambda ** 2 * base.A)} cm²</strong>
                </div>
                <div>
                  V′ = {fmt(lambda ** 3)} · {fmt(base.V)} = <strong>{fmt(lambda ** 3 * base.V)} cm³</strong>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                {kind === 'kocka'
                  ? 'A piros élek az 1 egységnyi élű kiinduló kockát mutatják: a nagyított kocka ennek középpontos nagyítása a közös csúcsból.'
                  : 'A néző rögzített nagyítású: a test valóban k-szorosára nő, ahogy a csúszkát mozgatod.'}
              </p>
            </div>
            <Solid3DViewer solid={solid} extras={ghost} scale={45} edgeColor="#047857" />
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Arányfordító" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">Melyik arányt ismerjük?</span>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    ['hossz', 'szakaszok (k)'],
                    ['felszin', 'felszínek (k²)'],
                    ['terfogat', 'térfogatok (k³)']
                  ] as [RatioKind, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setRatioKind(id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ratioKind === id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Az arány értéke</label>
              <input
                type="number"
                min="0.001"
                step="0.1"
                value={ratioValue}
                onChange={(e) => setRatioValue(Math.max(0.001, Number(e.target.value) || 0.001))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="arány értéke"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            <div>
              1. hasonlósági arány: k ={' '}
              {ratioKind === 'hossz' ? fmt(ratioValue, 3) : ratioKind === 'felszin' ? `√${fmt(ratioValue, 3)}` : `∛${fmt(ratioValue, 3)}`} ≈{' '}
              <strong>{fmtS(k)}</strong>
            </div>
            <div>
              2. felszínek aránya: k² ≈ <strong>{fmtS(k * k)}</strong>
            </div>
            <div>
              3. térfogatok (tömegek) aránya: k³ ≈ <strong>{fmtS(k ** 3)}</strong>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setRatioKind('terfogat'); setRatioValue(4); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
              Henger: V 4-szeres
            </button>
            <button onClick={() => { setRatioKind('hossz'); setRatioValue(20); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
              Golyó / sörét: k = 20
            </button>
            <button onClick={() => { setRatioKind('hossz'); setRatioValue(0.02); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
              Makett 1 : 50
            </button>
          </div>
          <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
            V-arány 4 ⇒ k ≈ 1,587, A-arány ≈ 2,520. k = 20 ⇒ 8000 sörét, 400-szoros egyedi felszín. 1 : 50-es makett ⇒ felszín 1/2500, térfogat
            1/125 000.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SimilarSolidsTheory;
