import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  FourSimilarityCasesSvg,
  ThreeSailorsSvg,
  HourglassTrianglesSvg,
  RectangleQuarterPointSvg,
  TrapezoidRightTrianglesSvg,
  SkyscraperModelVibrationSvg
} from './TriangleSimilarityFigures';

export const TriangleSimilarityTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state: Triangle similarity case tester
  const [activeCase, setActiveCase] = useState<'sz-sz' | 'o-sz-o' | 'o-o-o' | 'o-o-sz'>('sz-sz');

  // Case 1: sz-sz
  const [angleA1, setAngleA1] = useState<number>(50);
  const [angleB1, setAngleB1] = useState<number>(70);
  const [angleA2, setAngleA2] = useState<number>(50);
  const [angleB2, setAngleB2] = useState<number>(70);

  // Case 2: o-sz-o
  const [sideA1, setSideA1] = useState<number>(6);
  const [sideB1, setSideB1] = useState<number>(9);
  const [gamma1, setGamma1] = useState<number>(60);
  const [simLambda, setSimLambda] = useState<number>(1.5);

  // Laboratory 2 state: Scenario tabs
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  // Derived calculations for Lab 1
  const angleC1 = 180 - angleA1 - angleB1;
  const angleC2 = 180 - angleA2 - angleB2;
  const isSzSzSimilar = angleA1 === angleA2 && angleB1 === angleB2 && angleC1 > 0 && angleC2 > 0;

  const sideA2 = Math.round(sideA1 * simLambda * 10) / 10;
  const sideB2 = Math.round(sideB1 * simLambda * 10) / 10;

  const scenarios = [
    {
      title: '1. A három matróz és a zátonyra futott hajó',
      subtitle: 'Három független szögmérés átlaga és távolságmeghatározás 1 : 1000 méretarányban.',
      badge: 'Matrózok Mérése',
      badgeColor: 'teal',
      details: [
        'A cél a zátonyra futott hajó parttól mért merőleges távolságának meghatározása.',
        '• 1. matróz adatai: α₁ = 72°, β₁ = 53°',
        '• 2. matróz adatai: α₂ = 73°, β₂ = 51°',
        '• 3. matróz adatai: α₃ = 77°, β₃ = 52°',
        '• Átlagos szögek: α = (72 + 73 + 77) / 3 = 74°; β = (53 + 51 + 52) / 3 = 52°.',
        '• Bázisszakasz a parton: AB = 100 m. Kicsinyített rajzon: 10 cm (λ = 1 : 1000).',
        '• A rajzon a hajó távolsága a parttól: kb. 9,2 cm (9–9,5 cm).',
        '• A valóságos távolság: d = 9,2 cm · 1000 = 9200 cm = 92 méter!',
        '• Mérési bizonytalanság: a három matróz egyedi adatai között 9,1 m eltérés mutatkozott.'
      ]
    },
    {
      title: '2. 280 méteres felhőkarcoló szélcsatorna-tesztje',
      subtitle: 'Modell kilengéséből a valós épület elmozdulásának meghatározása.',
      badge: 'Építészeti Modell',
      badgeColor: 'amber',
      details: [
        'Egy építész a 280 m magas épület 1,4 m magas modelljét tesztelte szélcsatornában.',
        '• Geometriai kicsinyítés méretaránya: λ = 280 m / 1,4 m = 200.',
        '• A modell tengelye a csúcsánál 1 cm-t lengett ki a függőlegeshez képest.',
        '• Mivel a szerkezet alakja hasonló, a deformációk és kilengések is a méretaránnyal skálázódnak:',
        '• Valódi kilengés: ΔX = 1 cm · 200 = 200 cm = 2 méter!',
        '• Következtetés: extrém szélben a felhőkarcoló teteje akár 2 méterrel is elmozdulhat!'
      ]
    },
    {
      title: '3. ABCD téglalap negyedelőponttal',
      subtitle: 'AB = 8 cm, BC = 10 cm; P a CD oldal negyedelőpontja, átló metszése.',
      badge: 'Téglalap & Átló',
      badgeColor: 'blue',
      details: [
        'Adott az ABCD téglalap: AB = CD = 8 cm, BC = AD = 10 cm.',
        '• A P pont a CD oldal C-hez közelebbi negyedelőpontja: CP = 8 / 4 = 2 cm, PD = 8 - 2 = 6 cm.',
        '• Az AC átlót és a BP egyenest metszéspontjuk, Q köti össze.',
        '• Hasonló háromszögek: ΔABQ ~ ΔCPQ (mivel AB || CD, a váltószögek egyenlők, Q-nál csúcsszögek vannak ⇒ I. eset).',
        '• Hasonlósági arány: λ = AB / CP = 8 / 2 = 4.',
        '• Szakaszok aránya: BQ = 4 · QP, valamint AQ = 4 · QC.',
        '• A teljes AC átló így 4 + 1 = 5 részre oszlik: QC = AC / 5 ≈ 3,33 cm!'
      ]
    },
    {
      title: '4. Derékszögű trapéz érettségi mintafeladat',
      subtitle: 'Két derékszögű háromszög összeillesztve derékszögű trapézzá (AB = 9, AC = 15).',
      badge: 'Érettségi Feladat',
      badgeColor: 'purple',
      details: [
        'Két derékszögű háromszöget illesztünk össze úgy, hogy az ABCD derékszögű trapézt alkossák.',
        '• ΔABC derékszögű a B csúcsnál: AB = 9 cm, AC = 15 cm.',
        '• Pitagorasz-tétellel a hiányzó befogó: BC = √(15² - 9²) = √(225 - 81) = √144 = 12 cm.',
        '• A feladat szerint ΔABC ~ ΔCAD. A megfelelő oldalak: AC (15 cm) felel meg AB-nek (9 cm).',
        '• Hasonlósági arány: λ = 15 / 9 = 5/3.',
        '• Trapéz ferde szára: AD = BC · λ = 12 · (5/3) = 20 cm.',
        '• Trapéz hosszabbik alapja: CD = AC · λ = 15 · (5/3) = 25 cm.',
        '• Kerület: K = 9 + 12 + 25 + 20 = 66 cm.',
        '• Terület: T = (a + c)/2 · m = (9 + 25)/2 · 12 = 17 · 12 = 204 cm²!'
      ]
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="haromszogek-hasonlosaga"
      title="8. Háromszögek hasonlósága"
      subtitle="A háromszögek hasonlóságának 4 alapesete, terepi mérések szögátlagolással, felhőkarcolók skálázása, valamint érettségi geometriai konfigurációk."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — A HÁROMSZÖGEK HASONLÓSÁGÁNAK 4 ALAPESETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80">
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 block mb-1">
                ✓ A négy szükséges és elégséges hasonlósági alapeset:
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-xs font-black text-emerald-900 dark:text-emerald-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  I. sz–sz (α₁=α₂, β₁=β₂)
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  II. o–sz–o (a₁/a₂=b₁/b₂, γ)
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  III. o–o–o (a₁/a₂=b₁/b₂=c₁/c₂)
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  IV. o–o–sz (nagyobbikkal szemben!)
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>IV. alapeset csapdája:</strong> Két oldal aránya és a <em>kisebbikkel</em> szemközti szög egyenlősége NEM garantál hasonlóságot!
              </li>
              <li>
                <strong>Trapéz átlói:</strong> A trapéz átlói az alapokkal két <em>hasonló</em> háromszöget ($\lambda = a / c$) alkotnak!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: A 4 HASONLÓSÁGI ALAPESET */}
      <TheorySection
        title="1. A háromszögek hasonlóságának négy alapesete"
        lead="Sok feladat megoldását elősegíti az alábbi négy szükséges és elégséges feltétel, melyek minimális adatokból garantálják két háromszög hasonlóságát."
      >
        <div className="mb-6">
          <FourSimilarityCasesSvg />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="I. alapeset: Két-két szög egyenlő (sz-sz)" badge="I. eset" badgeColor="emerald">
            <p className="text-slate-700 text-sm leading-relaxed mb-2">
              Ha két háromszögben <strong>két-két szög egyenlő nagyságú</strong> (α₁ = α₂ és β₁ = β₂), akkor a két háromszög hasonló.
            </p>
            <p className="text-xs text-slate-500 italic">
              Miért elég két szög? Mert a belső szögek összege 180°, így γ₁ = 180° - (α₁ + β₁) = γ₂ automatikusan teljesül.
            </p>
          </TheoryCard>

          <TheoryCard title="II. alapeset: Két oldal aránya + közbezárt szög (o-sz-o)" badge="II. eset" badgeColor="sky">
            <p className="text-slate-700 text-sm leading-relaxed mb-2">
              Ha két háromszögben <strong>két-két oldal hosszának aránya megegyezik</strong> (a₁/a₂ = b₁/b₂) és az általuk <strong>közbezárt szög egyenlő</strong> (γ₁ = γ₂), akkor a két háromszög hasonló.
            </p>
            <p className="text-xs text-slate-500 italic">
              Fontos: a szögnek pontosan a két arányos oldal között kell elhelyezkednie!
            </p>
          </TheoryCard>

          <TheoryCard title="III. alapeset: Három oldal aránya egyenlő (o-o-o)" badge="III. eset" badgeColor="purple">
            <p className="text-slate-700 text-sm leading-relaxed mb-2">
              Ha a két háromszögben <strong>mindhárom oldal hosszának aránya páronként egyenlő</strong>:
            </p>
            <div className="bg-purple-50 p-2 rounded text-center font-mono font-bold text-purple-900 text-xs mb-2">
              a₁ / a₂ = b₁ / b₂ = c₁ / c₂ = λ
            </div>
            <p className="text-xs text-slate-500 italic">
              Ekkor a szögek megmérése nélkül is biztosak lehetünk abban, hogy a megfelelő belső szögek egyenlők!
            </p>
          </TheoryCard>

          <TheoryCard title="IV. alapeset: Két oldal aránya + nagyobbikkal szemközti szög (o-o-sz)" badge="IV. eset" badgeColor="amber">
            <p className="text-slate-700 text-sm leading-relaxed mb-2">
              Ha két-két oldal hosszának aránya megegyezik és a <strong>nagyobbik oldallal szemben fekvő szög</strong> nagysága egyenlő (a &gt; b és α₁ = α₂), akkor a két háromszög hasonló.
            </p>
            <p className="text-xs text-slate-500 italic">
              A geometriai egyértelműség kulcsa: a szögnek mindig a hosszabbik oldalhoz kell tartoznia!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SECTION: A KISEBBIK OLDALLAL SZEMKÖZTI SZÖG CSAPDÁJA */}
      <TheorySection
        title="2. Miért NEM alapeset az 'oldal-oldal-szög a kisebbikkel szemben'?"
        lead="A geometriai bizonyítások egyik leggyakoribb buktatója az, amikor a szög nem a nagyobbik, hanem a rövidebbik oldallal néz szembe."
      >
        <TheoryTrapBox title="HALÁLOS CSAPDA: Két oldal aránya és a KISEBBIK oldallal szemközti szög!">
          <div className="space-y-2 text-sm leading-relaxed">
            <p>
              Ha megadunk két oldalt (pl. b = 6 cm, a = 4 cm, ahol a &lt; b) és az <span className="font-semibold">a</span> oldallal szemközti α szöget, akkor a szerkesztés során a körzővel húzott körív <strong>két különböző pontban</strong> is metszi a másik szögszárat!
            </p>
            <div className="bg-red-100/80 p-2.5 rounded border border-red-300 font-mono text-center text-red-900 font-bold">
              Két különböző háromszög keletkezik: egy hegyesszögű és egy tompaszögű!
            </div>
            <p>
              Mivel a két létrejövő háromszög egymásnak sem hasonló (egyiknek tompaszöge van, a másiknak nincs), a feltétel <strong>NEM garantálja a hasonlóságot</strong>! Emiatt a IV. alapesetben kötelező kikötés, hogy a szög a nagyobbik oldallal álljon szemben.
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. SECTION: TEREPI MÉRÉSEK ÉS GYAKORLATI ALKALMAZÁSOK */}
      <TheorySection
        title="3. Terepi szögmérések és a 3 matróz feladata"
        lead="A gyakorlatban a mérési pontatlanságokat átlagolással és kicsinyített geometriai szerkesztéssel ellensúlyozzák."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Három matróz a parttól való távolságot méri fel egy zátonyra futott hajó esetében. A parton kitűznek egy ismert <span className="font-semibold text-emerald-700">AB = 100 m</span>-es bázisszakaszt, és megmérik a hajó felé mutató irányszögeket (α és β).
            </p>
            <TheoryCallout variant="teal" title="A mérési adatok átlagolása">
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                A véletlen mérési hibák csökkentésére a szögek számtani közepét képezzük:
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-teal-200 text-center font-mono font-bold text-teal-800 text-xs mb-2">
                α_átlag = (72° + 73° + 77°) / 3 = 74° &nbsp;|&nbsp; β_átlag = (53° + 51° + 52°) / 3 = 52°
              </div>
              <p className="text-sm text-teal-900 leading-relaxed">
                A kicsinyített rajzon a 100 m-es távolságot 10 cm-nek tekintjük (<strong>λ = 1 : 1000</strong>). A rajzon a hajó parttól mért távolsága <strong>9,2 cm</strong>, ami a valóságban <strong>92 méternek</strong> felel meg!
              </p>
            </TheoryCallout>
          </div>
          <div>
            <ThreeSailorsSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. SECTION: ÉRETTSÉGI GEOMETRIAI ALAKZATOK */}
      <TheorySection
        title="4. Tipikus érettségi geometriai konfigurációk"
        lead="Ismerd fel a hasonló háromszögeket a leggyakoribb feladattípusokban!"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-2">A) Homokóra / Metsző egyenesek</h4>
            <HourglassTrianglesSvg className="w-full h-auto mb-3" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Ha két párhuzamos egyenest két metsző egyenes köt össze, a keletkező <strong>ΔABM és ΔCDM</strong> háromszögek az egyenlő csúcsszögek és párhuzamos szárak váltószögei miatt hasonlók (<strong>I. eset: sz-sz</strong>).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-2">B) Téglalap negyedelőponttal</h4>
            <RectangleQuarterPointSvg className="w-full h-auto mb-3" />
            <p className="text-xs text-slate-600 leading-relaxed">
              ABCD téglalapban (8×10 cm) a P pont negyedelő (CP=2, PD=6). A párhuzamos oldalak miatt <strong>ΔABQ ~ ΔCPQ</strong>, a hasonlósági arány <strong>λ = 8/2 = 4</strong>, így az átló 4 : 1 arányban oszlik (QC ≈ 3,33 cm).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-2">C) Derékszögű trapéz</h4>
            <TrapezoidRightTrianglesSvg className="w-full h-auto mb-3" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Két derékszögű háromszög összeillesztve trapézt alkot: <strong>ΔABC ~ ΔCAD</strong>. AB=9, AC=15 ⇒ BC=12 cm (Pitagorasz). λ = 15/9 = 5/3 ⇒ AD=20, CD=25 cm. <strong>K = 66 cm, T = 204 cm²</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. SECTION: INTERAKTÍV LABORATÓRIUM I */}
      <TheorySection
        title="5. Interaktív Laboratórium I: Hasonlósági Alapeset Tesztelő és Hányados Kalkulátor"
        lead="Állítsd be a szögeket és oldalakat, vizsgáld meg azonnal a hasonlóság feltételeit és a méretarány hatásait!"
      >
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          {/* Case Selector */}
          <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
            <button
              onClick={() => setActiveCase('sz-sz')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                activeCase === 'sz-sz' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📐 I. eset: sz-sz (Két szög)
            </button>
            <button
              onClick={() => setActiveCase('o-sz-o')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                activeCase === 'o-sz-o' ? 'bg-sky-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📏 II. eset: o-sz-o (Oldalak + Közbezárt)
            </button>
          </div>

          {activeCase === 'sz-sz' ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <h5 className="font-bold text-emerald-900 text-sm mb-3">1. Háromszög Szögei</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        α₁ szög: {angleA1}°
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={angleA1}
                        onChange={(e) => setAngleA1(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        β₁ szög: {angleB1}°
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={angleB1}
                        onChange={(e) => setAngleB1(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                    </div>
                    <div className="text-xs font-mono text-emerald-800 bg-white/70 p-2 rounded">
                      γ₁ = 180° - ({angleA1}° + {angleB1}°) = <strong>{angleC1}°</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                  <h5 className="font-bold text-sky-900 text-sm mb-3">2. Háromszög Szögei</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        α₂ szög: {angleA2}°
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={angleA2}
                        onChange={(e) => setAngleA2(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        β₂ szög: {angleB2}°
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={angleB2}
                        onChange={(e) => setAngleB2(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                    </div>
                    <div className="text-xs font-mono text-sky-800 bg-white/70 p-2 rounded">
                      γ₂ = 180° - ({angleA2}° + {angleB2}°) = <strong>{angleC2}°</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border text-center font-bold text-base ${
                isSzSzSimilar ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-rose-100 border-rose-300 text-rose-900'
              }`}>
                {isSzSzSimilar
                  ? '✅ A két háromszög HASONLÓ az I. alapeset (sz-sz) alapján!'
                  : '❌ A szögek nem egyeznek meg, a háromszögek NEM hasonlók!'}
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    a₁ oldal: {sideA1} cm
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={sideA1}
                    onChange={(e) => setSideA1(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    b₁ oldal: {sideB1} cm
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={sideB1}
                    onChange={(e) => setSideB1(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Közbezárt γ szög: {gamma1}°
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    value={gamma1}
                    onChange={(e) => setGamma1(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Hasonlósági arány (λ): {simLambda}×
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={simLambda}
                    onChange={(e) => setSimLambda(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl">
                  <div className="text-xs text-sky-700 font-semibold mb-1">2. Háromszög Oldalai</div>
                  <div className="text-base font-bold text-sky-900">
                    a₂ = {sideA2} cm &nbsp;|&nbsp; b₂ = {sideB2} cm
                  </div>
                  <div className="text-xs text-slate-500 mt-1">γ₂ = {gamma1}° (azonos szög)</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  <div className="text-xs text-emerald-700 font-semibold mb-1">Kerületek Aránya</div>
                  <div className="text-2xl font-black text-emerald-900">
                    K₂ / K₁ = {simLambda}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Megegyezik λ-val</div>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                  <div className="text-xs text-purple-700 font-semibold mb-1">Területek Aránya</div>
                  <div className="text-2xl font-black text-purple-900">
                    T₂ / T₁ = {(simLambda * simLambda).toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">λ² szerint skálázódik</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. SECTION: INTERAKTÍV LABORATÓRIUM II */}
      <TheorySection
        title="6. Interaktív Laboratórium II: Mintapéldák Lépésről Lépésre"
        lead="Tekintsd át a feladatok részletes levezetését és megoldási mechanizmusát!"
      >
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {scenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveScenarioIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeScenarioIdx === idx
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {sc.title.split(' ')[0]} {sc.title.split(' ')[1]} {sc.title.split(' ')[2]}
              </button>
            ))}
          </div>

          {/* Scenario Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-bold text-base text-slate-800">
                {scenarios[activeScenarioIdx].title}
              </h4>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                {scenarios[activeScenarioIdx].badge}
              </span>
            </div>
            <p className="text-sm text-slate-500 italic mb-4">
              {scenarios[activeScenarioIdx].subtitle}
            </p>

            {activeScenarioIdx === 1 && (
              <div className="mb-4">
                <SkyscraperModelVibrationSvg />
              </div>
            )}

            <div className="space-y-2 text-sm text-slate-700">
              {scenarios[activeScenarioIdx].details.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={`p-2 rounded ${
                    line.startsWith('•') ? 'bg-slate-50 font-mono text-xs' : ''
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
export default TriangleSimilarityTheory;
