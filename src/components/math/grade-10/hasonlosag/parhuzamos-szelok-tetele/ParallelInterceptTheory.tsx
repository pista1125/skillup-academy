import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  ParallelInterceptTheoremSvg,
  ParallelChordsTheoremSvg,
  SegmentPartitionSvg,
  RectangleFourPartsSvg,
  FourthProportionalSvg
} from './ParallelInterceptFigures';

export const ParallelInterceptTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1: Interactive Segment Partition & Fourth Proportional
  const [lab1Mode, setLab1Mode] = useState<'partition' | 'fourth'>('partition');
  const [totalLength, setTotalLength] = useState<number>(18); // cm
  const [ratioM, setRatioM] = useState<number>(2);
  const [ratioN, setRatioN] = useState<number>(4);
  const [ratioP, setRatioP] = useState<number>(3); // 3-part partition

  // Fourth proportional inputs: a / b = c / x => x = (b * c) / a
  const [valA, setValA] = useState<number>(3);
  const [valB, setValB] = useState<number>(5);
  const [valC, setValC] = useState<number>(6);

  // Computed values for Lab 1
  const sumParts = ratioM + ratioN + ratioP;
  const part1 = Math.round((totalLength * (ratioM / sumParts)) * 100) / 100;
  const part2 = Math.round((totalLength * (ratioN / sumParts)) * 100) / 100;
  const part3 = Math.round((totalLength * (ratioP / sumParts)) * 100) / 100;

  const fourthX = valA > 0 ? Math.round(((valB * valC) / valA) * 100) / 100 : 0;

  // Laboratory 2: Textbook Scenarios
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  const scenarios = [
    {
      title: '1. Lakás helyiségeinek arányos felosztása',
      subtitle: '54 m²-es lakás felosztása 18 m², 24 m² és 12 m² arányában.',
      badge: 'Alaprajz',
      badgeColor: 'teal',
      details: [
        'A megadott alapterületek: 18 m², 24 m², 12 m².',
        '• Egyszerűsített aránypár (közös osztó 6): 18 : 24 : 12 = 3 : 4 : 2.',
        '• Összes arányegység: 3 + 4 + 2 = 9 egység.',
        '• 1 arányegység valódi értéke: 54 m² / 9 = 6 m².',
        '• Helyiségek ellenőrzése: 3 · 6 = 18 m², 4 · 6 = 24 m², 2 · 6 = 12 m².',
        '• Párhuzamos szelőkkel: a lakás hosszanti falát segédfélegyenessel 9 egyenlő részre osztjuk, majd 3, 4 és 2 egységnél párhuzamosokat húzunk!'
      ]
    },
    {
      title: '2. Az 539 m²-es telek kettős 2 : 5 felosztása',
      subtitle: 'Téglalap alakú telek szétosztása mindkét oldalpár mentén 2 : 5 arányban.',
      badge: 'Telekosztás',
      badgeColor: 'blue',
      details: [
        'Egy 539 m²-es téglalap alakú telket a hosszabb oldal mentén 2 : 5 arányban osztunk ketté.',
        '• Összes rész: 2 + 5 = 7 rész. 1 rész = 539 / 7 = 77 m².',
        '• Két résztelület: T₁ = 2 · 77 = 154 m², T₂ = 5 · 77 = 385 m² (154 + 385 = 539 m²).',
        '• Ha a telek rövidebb oldalát is 2 : 5 arányban osztjuk, a telek 4 kisebb téglalapra esik szét!',
        '• A 4 parcellaterület aránya: (2·2) : (2·5) : (5·2) : (5·5) = 4 : 10 : 10 : 25 (összesen 49 egység).',
        '• 1 egység = 539 / 49 = 11 m².',
        '• A 4 parcellaterület: 4 · 11 = 44 m², 10 · 11 = 110 m², 10 · 11 = 110 m², 25 · 11 = 275 m²!',
        '• Ellenőrzés: 44 + 110 + 110 + 275 = 539 m²!'
      ]
    },
    {
      title: '3. Szabályos ötszög átlói és az aranymetszés',
      subtitle: 'Az átlók egymást metsző szakaszai és az aranymetszés aránya.',
      badge: 'Aranymetszés',
      badgeColor: 'amber',
      details: [
        'A szabályos ötszög minden belső szöge 108°. Bármely két metsző átló egyenlő szárú háromszögeket hoz létre.',
        '• Az átlók egymást párhuzamos szelők tétele és hasonló háromszögek alapján aranymetszés (Φ ≈ 1,618) szerint osztják.',
        '• Ha a hosszabb szakasz x, a rövidebb szakasz 1, akkor az egész átló hossza x + 1.',
        '• Aránypár: (x + 1) / x = x / 1  ⇒  x² - x - 1 = 0.',
        '• Pozitív gyöke: x = (1 + √5) / 2 ≈ 1,61803... (aranymetszés hányadosa).',
        '• Ez a geometria egyik legszebb alkalmazása a párhuzamos szelők tételére!'
      ]
    },
    {
      title: '4. Háromszög párhuzamos szelője',
      subtitle: 'Egy 11 cm kerületű háromszög oldalával párhuzamos szakasz.',
      badge: 'Hasonló Háromszög',
      badgeColor: 'purple',
      details: [
        'Adott egy K = 11 cm kerületű háromszög. Egyik oldalával párhuzamost húzunk, amely kimetsz egy kisebb háromszöget és egy trapézt.',
        '• A párhuzamos szelő a másik két oldalt azonos arányban osztja fel: OA₁ / A₁A₂ = OB₁ / B₁B₂.',
        '• A keletkező kis háromszög hasonló az eredeti nagy háromszöghöz, mert szögeik páronként egyenlők!',
        '• A szelő hossza a nagy oldalhoz úgy aránylik, mint a csúcstól mért távolság a teljes oldalhoz: c₁ / c = OA₁ / OA.',
        '• Ha a szárakat 1 : 2 arányban osztja (vagyis OA₁ / OA = 1/3), akkor a kis háromszög kerülete K_kis = 11 / 3 ≈ 3,67 cm!'
      ]
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="parhuzamos-szelok-tetele"
      title="7. Ráadás – Párhuzamos szelők tétele"
      subtitle="A párhuzamos szelők és szelőszakaszok tétele, szakaszok felosztása adott arányban, negyedik arányos szerkesztése és telekosztási feladatok."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — PÁRHUZAMOS SZELŐK ÉS SZELŐSZAKASZOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80">
              <span className="text-xs font-black text-teal-900 dark:text-teal-200 block mb-1">
                ✓ Szelők és szelőszakaszok aránypárjai (O csúcsú szögnél):
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-black text-teal-900 dark:text-teal-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-teal-300">
                  A₁A₂ / B₁B₂ = OA₁ / OB₁
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-teal-300">
                  c₁ / c₂ = OA₁ / OA₂ = OB₁ / OB₂
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Párhuzamos szelők:</strong> A szögszárakon a szomszédos szeletek aránya és a csúcstól mért távolságok aránya is megegyezik.
              </li>
              <li>
                <strong>Tipikus csapda ($c_1 / c_2$):</strong> A párhuzamos szelőszakaszok arányát <em>kizárólag az $O$ csúcstól mért teljes szakaszokkal</em> szabad felírni ($c_1 / c_2 \neq OA_1 / A_1A_2$)!
              </li>
              <li>
                <strong>Megfordítás:</strong> A szelőszakaszok tételének megfordítása nem igaz, a párhuzamos szelők tételéé viszont igaz!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: A PÁRHUZAMOS SZELŐK TÉTELE */}
      <TheorySection
        title="1. A párhuzamos szelők tétele"
        lead="Ha egy szög szárait párhuzamos egyenesekkel metsszük, a párhuzamosok a szög mindkét szárából arányos szakaszokat vágnak le."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Tekintsünk egy <span className="font-semibold text-teal-700">O</span> csúcsú szöget, melynek szárait jelöljük <span className="font-semibold text-teal-700">e</span>-vel és <span className="font-semibold text-teal-700">f</span>-fel.
              Metsszük el mindkét szárat a párhuzamos <span className="font-semibold text-sky-600">p₁</span>, <span className="font-semibold text-sky-600">p₂</span>, <span className="font-semibold text-sky-600">p₃</span> egyenesekkel!
              A metszéspontok az <span className="font-semibold text-rose-600">e</span> száron <span className="font-semibold text-rose-600">A₁, A₂, A₃</span>, az <span className="font-semibold text-blue-600">f</span> száron pedig <span className="font-semibold text-blue-600">B₁, B₂, B₃</span>.
            </p>
            <TheoryCallout variant="teal" title="A tétel állítása">
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                <strong>1. Szomszédos szárdarabok aránya:</strong> A párhuzamosok által levágott szomszédos szakaszok aránya mindkét száron azonos:
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-teal-200 text-center font-mono font-bold text-teal-800 text-sm mb-2">
                A₁A₂ / A₂A₃ = B₁B₂ / B₂B₃
              </div>
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                <strong>2. Csúcstól mért távolságok aránya:</strong> A csúcstól a megfelelő metszéspontokig terjedő szakaszok aránya is megegyezik:
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-teal-200 text-center font-mono font-bold text-teal-800 text-sm">
                OA₁ / OA₂ = OB₁ / OB₂ &nbsp;&nbsp;és&nbsp;&nbsp; OA₁ / A₁A₂ = OB₁ / B₁B₂
              </div>
            </TheoryCallout>
          </div>
          <div>
            <ParallelInterceptTheoremSvg />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TheoryCard title="A tétel megfordítása (Párhuzamosság bizonyítása)" badge="Megfordítás" badgeColor="sky">
            <p className="text-slate-600 text-sm leading-relaxed">
              Ha egy szög szárait két egyenes úgy metszi, hogy a szárakból a csúcstól kiindulva arányos szakaszokat vágnak le (azaz <strong>OA₁ / OA₂ = OB₁ / OB₂</strong>), akkor a két metsző egyenes <strong>szükségszerűen párhuzamos</strong> egymással (<span className="font-mono">p₁ || p₂</span>).
            </p>
          </TheoryCard>
          <TheoryCard title="Mikor alkalmazzuk a szelőtételt?" badge="Gyakorlat" badgeColor="emerald">
            <p className="text-slate-600 text-sm leading-relaxed">
              Főként olyan geometriai feladatoknál, ahol szakaszok aránya ismert és hiányzó szárrészt kell kiszámítani, valamint szerkesztéseknél: szakasz adott arányú felosztásakor és arányos szakaszok előállításakor.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SECTION: A PÁRHUZAMOS SZELŐSZAKASZOK TÉTELE & A CSAPDA */}
      <TheorySection
        title="2. A párhuzamos szelőszakaszok tétele & A Trapéz-szár csapda"
        lead="Mi történik, ha nemcsak a szárakon lévő darabokat, hanem magukat a párhuzamos egyenesek által bezárt szakaszokat vizsgáljuk?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Jelölje <span className="font-semibold text-rose-600">c₁ = A₁B₁</span> és <span className="font-semibold text-blue-600">c₂ = A₂B₂</span> a párhuzamos egyeneseknek a szög szárai közé eső szakaszait (szelőszakaszok).
              Mivel a párhuzamos szelők azonos szögű háromszögeket metszenek le, a <span className="font-semibold">ΔOA₁B₁</span> és <span className="font-semibold">ΔOA₂B₂</span> háromszögek <strong>hasonlóak</strong>!
            </p>
            <TheoryCallout variant="indigo" title="A párhuzamos szelőszakaszok tétele">
              <p className="text-sm text-indigo-900 leading-relaxed mb-2">
                A párhuzamos szelőszakaszok aránya megegyezik a szög csúcsától mért megfelelő szárszakaszok arányával:
              </p>
              <div className="bg-white/80 p-3 rounded border border-indigo-200 text-center font-mono font-bold text-indigo-900 text-base">
                c₁ / c₂ = OA₁ / OA₂ = OB₁ / OB₂
              </div>
            </TheoryCallout>
          </div>
          <div>
            <ParallelChordsTheoremSvg />
          </div>
        </div>

        <div className="mt-6">
          <TheoryTrapBox title="HALÁLOS CSAPDA: A szelőszakaszok és a trapéz szárának aránya!">
            <div className="space-y-2 text-sm leading-relaxed">
              <p>
                Gyakori és súlyos hiba a tanulók körében azt feltételezni, hogy a szelőszakaszok a szomszédos trapéz-szárakkal is arányosak lennének:
              </p>
              <div className="bg-red-100/80 p-2.5 rounded border border-red-300 font-mono text-center text-red-900 font-bold">
                HIBÁS FELÍRÁS: c₁ / c₂ = A₁A₂ / B₁B₂  (TILOS!)
              </div>
              <p>
                <strong>Miért hibás?</strong> Mert az <span className="font-semibold">A₁A₂</span> szakasz a levágott trapéz szára, ami <strong>NEM egy háromszögnek az oldala</strong>! A szelőszakaszok aránya kizárólag a csúcstól (<span className="font-semibold">O</span>-tól) mért teljes szakaszokkal (<span className="font-semibold">OA₁, OA₂</span>) egyenlő.
              </p>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* 3. SECTION: SZERKESZTÉSEK: SZAKASZFELOSZTÁS ÉS NEGYEDIK ARÁNYOS */}
      <TheorySection
        title="3. Szerkesztési eljárások: Szakaszfelosztás és Negyedik arányos"
        lead="A párhuzamos szelők tétele a szerkesztő geometriának az egyik legfontosabb eszköze, lehetővé teszi szakaszok tetszőleges arányú felosztását mérőszalag nélkül."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">A</span>
              Szakasz felosztása adott arányban (pl. 2 : 3)
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Adott egy <span className="font-semibold">AB</span> szakasz. Hogyan oszthatjuk fel <span className="font-semibold">2 : 3</span> arányban pusztán körzővel és vonalzóval?
            </p>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1.5 mb-4">
              <li>Húzzunk tetszőleges <span className="font-semibold">e</span> segédfélegyenest az <span className="font-semibold">A</span> csúcsból.</li>
              <li>Mérjünk fel rá körzővel <span className="font-semibold">2 + 3 = 5</span> darab egyenlő egységet: <span className="font-mono">P₁, P₂, P₃, P₄, P₅</span>.</li>
              <li>Kösd össze az utolsó osztópontot (<span className="font-semibold">P₅</span>) a szakasz másik végével (<span className="font-semibold">B</span>).</li>
              <li>A <span className="font-semibold">P₂</span> ponton keresztül húzzunk párhuzamost a <span className="font-semibold">P₅B</span> egyenessel!</li>
              <li>A párhuzamos az <span className="font-semibold">AB</span> szakaszt pontosan a kívánt <span className="font-bold text-teal-700">2 : 3</span> arányban metszi a <span className="font-semibold">C</span> pontban!</li>
            </ol>
            <SegmentPartitionSvg />
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">B</span>
              Negyedik arányos szerkesztése (a / b = c / x)
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Ha adott három szakasz (<span className="font-semibold">a, b, c</span>), szerkesszük meg azt az <span className="font-semibold">x</span> szakaszt, amelyre <span className="font-mono font-bold">a / b = c / x</span> (azaz <span className="font-mono">x = b · c / a</span>)!
            </p>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1.5 mb-4">
              <li>Vegyünk fel egy tetszőleges szöget <span className="font-semibold">O</span> csúccsal.</li>
              <li>Az egyik szárra mérjük fel egymás után az <span className="font-semibold text-rose-600">a</span> szakaszt (OA), majd az <span className="font-semibold text-teal-600">c</span> szakaszt (AC), vagy mérjük az egyik szárra <span className="font-semibold">a</span>-t és a másikra <span className="font-semibold">b</span>-t.</li>
              <li>A standard módszer: egyik szárra <span className="font-semibold">a</span> és <span className="font-semibold">b</span>, a másikra <span className="font-semibold">c</span> felmérése.</li>
              <li>A megfelelő végpontokat összekötjük, majd a harmadik pontból párhuzamost húzunk.</li>
              <li>A párhuzamos szelő a másik száron pontosan a keresett <span className="font-bold text-sky-700">x</span> szakaszt metszi ki!</li>
            </ol>
            <FourthProportionalSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. SECTION: INTERAKTÍV LABORATÓRIUM I */}
      <TheorySection
        title="4. Interaktív Laboratórium I: Szakaszfelosztó és Negyedik Arányos Szimulátor"
        lead="Próbáld ki interaktívan a szakaszok felosztását tetszőleges arányban vagy számítsd ki a negyedik arányos szakaszt!"
      >
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm">
          {/* Mode Switcher */}
          <div className="flex gap-2 mb-6 border-b pb-4">
            <button
              onClick={() => setLab1Mode('partition')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${lab1Mode === 'partition'
                  ? 'bg-teal-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              📐 Szakaszfelosztás (m : n : p)
            </button>
            <button
              onClick={() => setLab1Mode('fourth')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${lab1Mode === 'fourth'
                  ? 'bg-sky-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              ✖️ Negyedik Arányos (a / b = c / x)
            </button>
          </div>

          {lab1Mode === 'partition' ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Teljes szakasz hossza (L): {totalLength} cm
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="36"
                    step="1"
                    value={totalLength}
                    onChange={(e) => setTotalLength(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    1. rész arányszáma (m): {ratioM}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={ratioM}
                    onChange={(e) => setRatioM(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    2. rész arányszáma (n): {ratioN}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={ratioN}
                    onChange={(e) => setRatioN(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    3. rész arányszáma (p): {ratioP}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={ratioP}
                    onChange={(e) => setRatioP(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
              </div>

              {/* Visualization bar */}
              <div className="bg-slate-100 p-4 rounded-xl mb-4">
                <div className="text-xs font-semibold text-slate-600 mb-2">
                  A szakasz arányos darabjai (összesen {sumParts} arányegység, 1 egység = {(totalLength / sumParts).toFixed(2)} cm):
                </div>
                <div className="h-10 w-full flex rounded-lg overflow-hidden border border-slate-300">
                  <div
                    style={{ width: `${(part1 / totalLength) * 100}%` }}
                    className="bg-teal-500 text-white flex items-center justify-center font-bold text-xs"
                  >
                    {part1} cm ({ratioM}e)
                  </div>
                  <div
                    style={{ width: `${(part2 / totalLength) * 100}%` }}
                    className="bg-sky-500 text-white flex items-center justify-center font-bold text-xs"
                  >
                    {part2} cm ({ratioN}e)
                  </div>
                  {ratioP > 0 && (
                    <div
                      style={{ width: `${(part3 / totalLength) * 100}%` }}
                      className="bg-amber-500 text-white flex items-center justify-center font-bold text-xs"
                    >
                      {part3} cm ({ratioP}e)
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-teal-50 border border-teal-200 p-3 rounded-lg">
                  <div className="text-xs text-teal-700 font-semibold">1. szakaszrész</div>
                  <div className="text-xl font-black text-teal-800">{part1} cm</div>
                  <div className="text-xs text-teal-600">({((part1 / totalLength) * 100).toFixed(1)}%)</div>
                </div>
                <div className="bg-sky-50 border border-sky-200 p-3 rounded-lg">
                  <div className="text-xs text-sky-700 font-semibold">2. szakaszrész</div>
                  <div className="text-xl font-black text-sky-800">{part2} cm</div>
                  <div className="text-xs text-sky-600">({((part2 / totalLength) * 100).toFixed(1)}%)</div>
                </div>
                {ratioP > 0 ? (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <div className="text-xs text-amber-700 font-semibold">3. szakaszrész</div>
                    <div className="text-xl font-black text-amber-800">{part3} cm</div>
                    <div className="text-xs text-amber-600">({((part3 / totalLength) * 100).toFixed(1)}%)</div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-center text-xs text-slate-400">
                    Nincs 3. rész (p = 0)
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    a szakasz (1. szár 1. része): {valA} cm
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={valA}
                    onChange={(e) => setValA(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    b szakasz (1. szár 2. része): {valB} cm
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={valB}
                    onChange={(e) => setValB(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    c szakasz (2. szár 1. része): {valC} cm
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={valC}
                    onChange={(e) => setValC(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 p-5 rounded-xl text-center">
                <div className="text-xs text-sky-700 uppercase tracking-wider font-bold mb-1">
                  Aránypár és Eredmény
                </div>
                <div className="font-mono text-lg text-slate-700 mb-2">
                  <span className="font-bold text-sky-800">a / b = c / x</span> &nbsp;⇒&nbsp; {valA} / {valB} = {valC} / x
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  x = (b · c) / a = ({valB} · {valC}) / {valA} = {valB * valC} / {valA}
                </div>
                <div className="text-3xl font-black text-sky-900">
                  x = {fourthX} cm
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SECTION: INTERAKTÍV LABORATÓRIUM II */}
      <TheorySection
        title="5. Interaktív Laboratórium II: Esettanulmányok és Telekosztási Feladatok"
        lead="Nézd át lépésről lépésre a legfontosabb mintapéldákat és telekosztási feladatokat!"
      >
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          {/* Scenario tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {scenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveScenarioIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeScenarioIdx === idx
                    ? 'bg-teal-700 text-white shadow'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {sc.title.split(' ')[0]} {sc.title.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Active scenario card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-bold text-base text-slate-800">
                {scenarios[activeScenarioIdx].title}
              </h4>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-teal-100 text-teal-800">
                {scenarios[activeScenarioIdx].badge}
              </span>
            </div>
            <p className="text-sm text-slate-500 italic mb-4">
              {scenarios[activeScenarioIdx].subtitle}
            </p>

            {activeScenarioIdx === 1 && (
              <div className="mb-4">
                <RectangleFourPartsSvg />
              </div>
            )}

            <div className="space-y-2 text-sm text-slate-700">
              {scenarios[activeScenarioIdx].details.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={`p-2 rounded ${line.startsWith('•') ? 'bg-slate-50 font-mono text-xs' : ''
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
export default ParallelInterceptTheory;

