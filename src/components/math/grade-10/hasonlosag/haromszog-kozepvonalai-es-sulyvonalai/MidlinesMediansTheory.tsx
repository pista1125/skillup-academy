import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  MidlineTheoremSvg,
  FourMidlineTrianglesSvg,
  MediansCentroidRatioSvg,
  SixEqualAreaTrianglesSvg,
  RightTriangleMedianSvg
} from './MidlinesMediansFigures';

export const MidlinesMediansTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state
  const [lab1Mode, setLab1Mode] = useState<'midline' | 'median'>('midline');

  // Midline inputs: a, b, c
  const [sideA, setSideA] = useState<number>(6);
  const [sideB, setSideB] = useState<number>(8);
  const [sideC, setSideC] = useState<number>(10);

  // Median inputs: right triangle legs
  const [legA, setLegA] = useState<number>(14);
  const [legB, setLegB] = useState<number>(33.6);

  // Laboratory 2 state: Scenario tabs
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  // Computed values for Lab 1 - Midlines
  const midA = sideA / 2;
  const midB = sideB / 2;
  const midC = sideC / 2;
  const perimOrig = sideA + sideB + sideC;
  const perimMid = perimOrig / 2;

  // Semi-perimeter and Heron's formula for area
  const s = perimOrig / 2;
  const areaOrigSquared = s * (s - sideA) * (s - sideB) * (s - sideC);
  const areaOrig = areaOrigSquared > 0 ? Math.round(Math.sqrt(areaOrigSquared) * 10) / 10 : 0;
  const areaMid = Math.round((areaOrig / 4) * 10) / 10;

  // Computed values for Lab 1 - Medians
  const hypotenuseC = Math.round(Math.sqrt(legA * legA + legB * legB) * 10) / 10;
  const medianC = Math.round((hypotenuseC / 2) * 10) / 10; // s_c = c / 2
  const centroidDistC = Math.round(((2 / 3) * medianC) * 10) / 10;
  const centroidDistBase = Math.round(((1 / 3) * medianC) * 10) / 10;

  const scenarios = [
    {
      title: '1. A 2 : 8 : 9 arányú háromszög',
      subtitle: 'Oldalak aránya 2 : 8 : 9, legrövidebb középvonala 17 mm.',
      badge: 'Középvonal-számítás',
      badgeColor: 'teal',
      details: [
        'A legrövidebb középvonal (k_a = 17 mm) a legrövidebb oldalhoz (a) tartozik.',
        '• A középvonal fele az oldalnak: a = 2 · k_a = 2 · 17 = 34 mm.',
        '• Mivel a : b : c = 2 : 8 : 9, a 2 egység felel meg 34 mm-nek.',
        '• 1 arányegység értéke: 34 mm / 2 = 17 mm.',
        '• A háromszög három oldala:',
        '  - a = 2 · 17 = 34 mm',
        '  - b = 8 · 17 = 136 mm',
        '  - c = 9 · 17 = 153 mm.',
        '• Háromszög-egyenlőtlenség ellenőrzése: 34 + 136 = 170 > 153 (szerkeszthető!).'
      ]
    },
    {
      title: '2. Az 5 : 12 : 13 arányú háromszög',
      subtitle: 'A középvonalak által alkotott háromszög kerülete 255 dm, oldalai 5 : 12 : 13.',
      badge: 'Pitagoraszi Hármas',
      badgeColor: 'blue',
      details: [
        'A középvonal-háromszög kerülete K_közép = 255 dm.',
        '• Az eredeti háromszög kerülete a duplája: K_eredeti = 2 · 255 = 510 dm.',
        '• Oldalak aránya mindkét háromszögben 5 : 12 : 13 (összesen 5 + 12 + 13 = 30 arányegység).',
        '• 1 arányegység értéke az eredeti háromszögben: 510 dm / 30 = 17 dm.',
        '• Az eredeti háromszög oldalai:',
        '  - a = 5 · 17 = 85 dm',
        '  - b = 12 · 17 = 204 dm',
        '  - c = 13 · 17 = 221 dm.',
        '• Szögei szerinti osztályozás (Pitagorasz-tétel megfordítása):',
        '  85² + 204² = 7225 + 41616 = 48841.',
        '  221² = 48841.',
        '  Mivel a² + b² = c², a háromszög DERÉKSZÖGŰ!'
      ]
    },
    {
      title: '3. Derékszögű háromszög súlyvonalai',
      subtitle: 'Befogók: 14 cm és 33,6 cm. Középvonalak, súlyvonalak és súlypont távolságai.',
      badge: 'Derékszög & Súlyvonal',
      badgeColor: 'emerald',
      details: [
        'Pitagorasz-tétellel az átfogó: c = √(14² + 33,6²) = √(196 + 1128,96) = √1324,96 = 36,4 cm.',
        '• a) Középvonalak hossza: k_a = 7 cm, k_b = 16,8 cm, k_c = 18,2 cm.',
        '• b) Átfogóhoz tartozó súlyvonal (Thálész-tétel miatt R = c/2): s_c = 36,4 / 2 = 18,2 cm!',
        '• c) Befogókhoz tartozó súlyvonalak (Pitagorasz a féldarabokkal):',
        '  - s_a = √(33,6² + 7²) = √(1128,96 + 49) = √1177,96 ≈ 34,32 cm',
        '  - s_b = √(14² + 16,8²) = √(196 + 282,24) = √478,24 ≈ 21,87 cm.',
        '• d) Súlypont távolsága a csúcsoktól (a 2/3 részek):',
        '  - Derékszögű csúcstól: (2/3) · 18,2 ≈ 12,13 cm',
        '  - Másik két csúcstól: (2/3) · 21,87 ≈ 14,58 cm és (2/3) · 34,32 ≈ 22,88 cm.'
      ]
    },
    {
      title: '4. Egyenlő szárú háromszög terület- és súlypontja',
      subtitle: 'Alap: 42 mm, szár: 29 mm. Középvonalak, magasság és felosztott területek.',
      badge: 'Szimmetrikus Idom',
      badgeColor: 'purple',
      details: [
        'A háromszög szimmetrikus, így az alaphoz tartozó magasság egybeesik a súlyvonallal.',
        '• Magasság felezi az alapot (21 mm): m = √(29² - 21²) = √(841 - 441) = √400 = 20 mm.',
        '• a) Középvonalak: k_alap = 21 mm, k_szár = 14,5 mm (kettő darab).',
        '• b) Súlypont távolsága az alaptól: a súlyvonal 1/3 része: 20 mm / 3 ≈ 6,67 mm.',
        '• Teljes háromszög területe: T = (42 · 20) / 2 = 420 mm².',
        '• c) Súlypont által a csúcsokkal alkotott 3 háromszög mindegyikének területe: T / 3 = 140 mm²!',
        '• d) Középvonal-háromszög területe: T / 4 = 420 / 4 = 105 mm².'
      ]
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="haromszog-kozepvonalai-es-sulyvonalai"
      title="9. Háromszög középvonalai és súlyvonalai"
      subtitle="A középvonal tétele és hasonlósági bizonyítása, a súlypont 2 : 1 arányú metszése, területfelezési törvények és a derékszögű háromszög átfogó-súlyvonala."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — KÖZÉPVONALAK, SÚLYVONALAK ÉS SÚLYPONT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80">
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 block mb-1">
                ✓ Középvonal és súlypont alapösszefüggései:
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs font-black text-emerald-900 dark:text-emerald-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  k = c / 2 (k ∥ c)
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  CS : SF = 2 : 1
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-emerald-300">
                  s_c = c / 2 = R (90°)
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>3 középvonal:</strong> 4 egybevágó kis háromszögre bont ($K&apos; = K / 2$, $T&apos; = T / 4$).
              </li>
              <li>
                <strong>Súlypont ($S$):</strong> A csúcshoz esik közelebb (2/3 rész), az oldalfelezőhöz távolabb (1/3 rész).
              </li>
              <li>
                <strong>Területfelezés:</strong> Egy súlyvonal felezi a területet ($T / 2$), a 3 súlyvonal 6 egyenlő területű ($T / 6$) részre bontja!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: A HÁROMSZÖG KÖZÉPVONALAI */}
      <TheorySection
        title="1. A háromszög középvonalai és a középvonal-tétel"
        lead="Ha összekötjük egy háromszög két oldalának felezőpontját, akkor a háromszög egyik középvonalát kapjuk meg."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Egy háromszög bármely két oldalának <span className="font-semibold text-rose-600">D</span> és <span className="font-semibold text-rose-600">E</span> felezőpontját összekötő <span className="font-semibold text-rose-600">DE</span> szakaszt a háromszög <strong>középvonalának</strong> nevezzük.
            </p>
            <TheoryCallout variant="teal" title="A középvonal tétele">
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                A háromszög középvonala <strong>párhuzamos</strong> a harmadik oldallal, és hossza pontosan <strong>fele</strong> a harmadik oldal hosszának:
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-teal-200 text-center font-mono font-bold text-teal-800 text-sm mb-2">
                k_c || c &nbsp;&nbsp;és&nbsp;&nbsp; k_c = c / 2
              </div>
              <p className="text-xs text-teal-900 leading-relaxed">
                <strong>Bizonyítás hasonlósággal:</strong> A levágott felső <span className="font-semibold">ΔEDC</span> és az eredeti <span className="font-semibold">ΔABC</span> hasonló a <strong>II. alapeset (o-sz-o)</strong> szerint, mert a γ szög közös, és az oldalak felezési aránya állandó: CD/CA = CE/CB = 1/2. Ebből következik, hogy DE/AB = 1/2, valamint az egyállású szögek egyenlősége miatt DE || AB.
              </p>
            </TheoryCallout>
          </div>
          <div>
            <MidlineTheoremSvg />
          </div>
        </div>
      </TheorySection>

      {/* 2. SECTION: A KÖZÉPVONAL-HÁROMSZÖG ÉS A 4 EGYBEVÁGÓ HÁROMSZÖG */}
      <TheorySection
        title="2. A 3 középvonal felosztása: 4 egybevágó háromszög"
        lead="Minden háromszögnek pontosan 3 középvonala van, melyek együttesen egy különleges belső fraktál-szerkezetet alkotnak."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Ha megrajzoljuk mindhárom középvonalat (<span className="font-semibold text-blue-700">k_a, k_b, k_c</span>), azok az eredeti háromszöget <strong>négy darab egymással egybevágó</strong>, az eredetihez képest felére kicsinyített háromszögre osztják.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center">
                <div className="text-xs text-blue-700 font-semibold">Kerület aránya</div>
                <div className="text-lg font-black text-blue-900">K_közép = K / 2</div>
                <div className="text-xs text-blue-600">λ = 1/2 lineáris arány</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-center">
                <div className="text-xs text-amber-700 font-semibold">Terület aránya</div>
                <div className="text-lg font-black text-amber-900">T_közép = T / 4</div>
                <div className="text-xs text-amber-600">λ² = (1/2)² = 1/4 négyzetes arány</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">
              Ez magyarázza, miért pontosan negyedakkora a belső háromszög területe: 4 egybevágó darab fedi le hézagmentesen az eredeti területet!
            </p>
          </div>
          <div>
            <FourMidlineTrianglesSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. SECTION: A SÚLYVONALAK ÉS A SÚLYPONT 2:1 OSZTÁSA */}
      <TheorySection
        title="3. A háromszög súlyvonalai és a súlypont 2 : 1 arányú metszése"
        lead="A súlyvonal a csúcsot a szemközti oldal felezőpontjával köti össze. A 3 súlyvonal egyetlen közös pontban metszi egymást."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-3">
              Jelölje az oldalak felezőpontjait <span className="font-semibold text-purple-700">F_a, F_b, F_c</span>. Az <span className="font-semibold text-purple-700">AF_a, BF_b, CF_c</span> szakaszok a háromszög <strong>súlyvonalai</strong> (<span className="font-mono">s_a, s_b, s_c</span>).
            </p>
            <TheoryCallout variant="indigo" title="A súlypont tétele">
              <p className="text-sm text-indigo-900 leading-relaxed mb-2">
                1. A három súlyvonal egyetlen közös pontban, a <strong>súlypontban (S)</strong> metszi egymást.
              </p>
              <p className="text-sm text-indigo-900 leading-relaxed mb-2">
                2. A súlypont minden súlyvonalat <strong>2 : 1 arányban oszt</strong>, úgy, hogy a hosszabb szakasz csatlakozik a csúcshoz:
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-indigo-200 text-center font-mono font-bold text-indigo-950 text-sm mb-2">
                AS = (2/3) · s_a &nbsp;&nbsp;és&nbsp;&nbsp; SF_a = (1/3) · s_a
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                <strong>Bizonyítás homokóra-hasonlósággal:</strong> Húzzuk be a DE középvonalat! Mivel DE || AB és DE = AB / 2, a <span className="font-semibold">ΔABS ~ ΔDES</span> (I. alapeset: sz-sz a váltószögek és csúcsszögek miatt). A hasonlóság aránya <span className="font-bold">λ = AB / DE = 2</span>, amiből közvetlenül adódik: <span className="font-bold">AS / SD = 2</span> és <span className="font-bold">BS / SE = 2</span>!
              </p>
            </TheoryCallout>
          </div>
          <div>
            <MediansCentroidRatioSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. SECTION: TERÜLETFELOSZTÁSI TÖRVÉNYEK */}
      <TheorySection
        title="4. Területfelosztási törvények: Fél, Harmad és Hatod"
        lead="A súlyvonalak nemcsak szakaszokat feleznek, hanem a területek egyenlő arányú elosztásának geometriai garanciái."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="space-y-3">
              <TheoryCard title="1. Egy súlyvonal felezi a területet" badge="T / 2" badgeColor="amber">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mivel a szemközti oldal felezőpontjába fut, a két keletkező háromszög alapja azonos (a/2), a közös csúcshoz tartozó magasságuk pedig megegyezik: <strong>T₁ = T₂ = T / 2</strong>.
                </p>
              </TheoryCard>

              <TheoryCard title="2. A 3 súlyvonal 6 egyenlő területű részre vág" badge="T / 6" badgeColor="emerald">
                <p className="text-xs text-slate-600 leading-relaxed">
                  A három súlyvonal által meghatározott mind a 6 kis háromszög területe pontosan egyenlő: <strong>T_kis = T / 6</strong>.
                </p>
              </TheoryCard>

              <TheoryCard title="3. A súlypontot a csúcsokkal összekötő 3 háromszög" badge="T / 3" badgeColor="sky">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ha az S súlypontot összekötjük az A, B, C csúcsokkal, a háromszög 3 egyenlő darabra esik: <strong>T_ABS = T_BCS = T_CAS = T / 3</strong> (mindegyik két darab T/6-os részből áll).
                </p>
              </TheoryCard>
            </div>
          </div>
          <div>
            <SixEqualAreaTrianglesSvg />
          </div>
        </div>
      </TheorySection>

      {/* 5. SECTION: DERÉKSZÖGŰ HÁROMSZÖG ÁTFOGÓ-SÚLYVONALA */}
      <TheorySection
        title="5. A derékszögű háromszög aranyszabálya: s_c = c / 2 = R"
        lead="Derékszögű háromszög esetén az átfogóhoz tartozó súlyvonal speciális kapcsolatban áll a körülírt körrel."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Thálész tétele szerint a derékszögű háromszög köré írt körének átmérője pontosan az <span className="font-semibold text-teal-800">átfogó (c)</span>. Ezért a kör középpontja az átfogó <span className="font-semibold text-rose-600">F_c</span> felezőpontja!
            </p>
            <TheoryCallout variant="teal" title="Átfogó-súlyvonal és sugár azonossága">
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                Mivel a derékszögű C csúcs is a körvonalon fekszik, a távolsága a felezőponttól (a súlyvonal hossza) pontosan megegyezik a kör sugarával:
              </p>
              <div className="bg-white/80 p-3 rounded border border-teal-200 text-center font-mono font-bold text-teal-900 text-base mb-2">
                s_c = c / 2 = R
              </div>
              <p className="text-xs text-teal-900 leading-relaxed">
                <strong>Mintapélda (14 cm és 33,6 cm befogók):</strong><br />
                Átfogó: c = √(14² + 33,6²) = 36,4 cm.<br />
                Átfogóhoz tartozó súlyvonal: <strong>s_c = 36,4 / 2 = 18,2 cm</strong>.<br />
                Súlypont távolsága a derékszögű csúcstól: <strong>d = (2/3) · 18,2 ≈ 12,13 cm</strong>!
              </p>
            </TheoryCallout>
          </div>
          <div>
            <RightTriangleMedianSvg />
          </div>
        </div>
      </TheorySection>

      {/* 6. SECTION: INTERAKTÍV LABORATÓRIUM I */}
      <TheorySection
        title="6. Interaktív Laboratórium I: Középvonal- és Súlypont-kalkulátor"
        lead="Változtasd a háromszög oldalait és figyeld meg azonnal a középvonalak, súlyvonalak és területek pontos értékeit!"
      >
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          {/* Mode selector */}
          <div className="flex gap-2 mb-6 border-b pb-4">
            <button
              onClick={() => setLab1Mode('midline')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                lab1Mode === 'midline'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📐 Középvonalak és Terület (k = c / 2)
            </button>
            <button
              onClick={() => setLab1Mode('median')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                lab1Mode === 'median'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ⚖️ Súlyvonalak és Derékszög (s_c = c / 2)
            </button>
          </div>

          {lab1Mode === 'midline' ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    a oldal hossza: {sideA} cm
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={sideA}
                    onChange={(e) => setSideA(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    b oldal hossza: {sideB} cm
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={sideB}
                    onChange={(e) => setSideB(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    c oldal hossza: {sideC} cm
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={sideC}
                    onChange={(e) => setSideC(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  <div className="text-xs text-emerald-700 font-semibold mb-1">3 Középvonal Hossza</div>
                  <div className="text-base font-bold text-emerald-900">
                    k_a = {midA} cm &nbsp;|&nbsp; k_b = {midB} cm &nbsp;|&nbsp; k_c = {midC} cm
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Pontosan a megfelelő oldalak fele</div>
                </div>

                <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl">
                  <div className="text-xs text-sky-700 font-semibold mb-1">Kerületek Aránya</div>
                  <div className="text-base font-bold text-sky-900">
                    K_orig = {perimOrig} cm &nbsp;⇒&nbsp; K_közép = {perimMid} cm
                  </div>
                  <div className="text-xs text-slate-500 mt-1">K_közép = K / 2</div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                  <div className="text-xs text-amber-700 font-semibold mb-1">Területek Aránya</div>
                  <div className="text-base font-bold text-amber-900">
                    {areaOrig > 0 ? (
                      <>T_orig ≈ {areaOrig} cm² &nbsp;⇒&nbsp; T_közép ≈ {areaMid} cm²</>
                    ) : (
                      'Nem szerkeszthető háromszög!'
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">T_közép = T / 4 (λ² = 1/4)</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    a befogó hossza: {legA} cm
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="0.5"
                    value={legA}
                    onChange={(e) => setLegA(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    b befogó hossza: {legB} cm
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="0.5"
                    value={legB}
                    onChange={(e) => setLegB(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                  <div className="text-xs text-blue-700 font-semibold mb-1">Átfogó (c) és Átfogó-súlyvonal (s_c)</div>
                  <div className="text-base font-bold text-blue-900">
                    c = {hypotenuseC} cm &nbsp;⇒&nbsp; s_c = {medianC} cm
                  </div>
                  <div className="text-xs text-slate-500 mt-1">s_c = c / 2 = R (Thálész)</div>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                  <div className="text-xs text-purple-700 font-semibold mb-1">Súlypont távolsága a derékszögtől</div>
                  <div className="text-2xl font-black text-purple-900">
                    {centroidDistC} cm
                  </div>
                  <div className="text-xs text-slate-500 mt-1">A súlyvonal 2/3 része</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  <div className="text-xs text-emerald-700 font-semibold mb-1">Súlypont távolsága az átfogótól</div>
                  <div className="text-2xl font-black text-emerald-900">
                    {centroidDistBase} cm
                  </div>
                  <div className="text-xs text-slate-500 mt-1">A súlyvonal 1/3 része</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 7. SECTION: INTERAKTÍV LABORATÓRIUM II */}
      <TheorySection
        title="7. Interaktív Laboratórium II: Esettanulmányok Lépésről Lépésre"
        lead="Tekintsd át a legfontosabb mintapéldákat és megoldási lépéseket!"
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

          {/* Details */}
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

            <div className="space-y-2 text-sm text-slate-700">
              {scenarios[activeScenarioIdx].details.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={`p-2 rounded ${
                    line.startsWith('•') || line.startsWith('  -')
                      ? 'bg-slate-50 font-mono text-xs'
                      : ''
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
export default MidlinesMediansTheory;
