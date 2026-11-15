import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  SimilarityCompositionSvg,
  RectanglePartitionSvg,
  PerimeterAreaScaleSvg,
  PyramidLayersSvg,
  ScaleMapBlueprintSvg
} from './SimilarityFigures';

export const SimilarityTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state: Scale factor and shape selector
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [selectedShape, setSelectedShape] = useState<'triangle' | 'rectangle' | 'circle' | 'cube'>('triangle');

  // Laboratory 2 state: Textbook scenario tab
  const [activeScenario, setActiveScenario] = useState<number>(0);

  // Shape metric computations
  const shapeConfigs = {
    triangle: { name: 'Derékszögű háromszög (a=3, b=4, c=5)', perimeter: 12, area: 6, hasVolume: false, volume: 0 },
    rectangle: { name: 'Téglalap (a=3, b=6)', perimeter: 18, area: 18, hasVolume: false, volume: 0 },
    circle: { name: 'Kör (r=2)', perimeter: Math.round(2 * Math.PI * 2 * 10) / 10, area: Math.round(Math.PI * 4 * 10) / 10, hasVolume: false, volume: 0 },
    cube: { name: 'Kocka (a=3)', perimeter: 36, area: 54, hasVolume: true, volume: 27 }
  };

  const currentConfig = shapeConfigs[selectedShape];
  const scaledPerimeter = Math.round(currentConfig.perimeter * scaleFactor * 100) / 100;
  const scaledArea = Math.round(currentConfig.area * Math.pow(scaleFactor, 2) * 100) / 100;
  const scaledVolume = currentConfig.hasVolume ? Math.round(currentConfig.volume * Math.pow(scaleFactor, 3) * 100) / 100 : 0;

  const scenarios = [
    {
      title: '1. Háromszög 3-féle oldalillesztése',
      subtitle: 'Oldalak: 12 cm, 15 cm, 16 cm. Egy hasonló háromszög egyik oldala 10 cm.',
      details: [
        'A 10 cm-es oldal a másik háromszög bármelyik oldalának megfelelhet, így 3 különböző megoldás létezik:',
        '• Ha a legrövidebb (12 cm) oldalnak felel meg: λ₁ = 10 / 12 = 5/6 ≈ 0,833. A többi oldal: b\' = 15 · 5/6 = 12,5 cm, c\' = 16 · 5/6 = 13,33 cm.',
        '• Ha a középső (15 cm) oldalnak felel meg: λ₂ = 10 / 15 = 2/3 ≈ 0,667. A többi oldal: a\' = 12 · 2/3 = 8 cm, c\' = 16 · 2/3 = 10,67 cm.',
        '• Ha a leghosszabb (16 cm) oldalnak felel meg: λ₃ = 10 / 16 = 5/8 = 0,625. A többi oldal: a\' = 12 · 5/8 = 7,5 cm, b\' = 15 · 5/8 = 9,375 cm.'
      ],
      badge: '3 Megoldás',
      badgeColor: 'blue'
    },
    {
      title: '2. Egyenlő szárú háromszög méretezése',
      subtitle: 'Oldalak: 10 cm, 10 cm, 12 cm. Alaphoz tartozó magasság: m = 8 cm. K = 32 cm, T = 48 cm².',
      details: [
        '• a) Kerület megadása: Ha a hasonló háromszög kerülete K\' = 16 dm = 160 cm, akkor a hasonlóság aránya:',
        '  λ = K\' / K = 160 / 32 = 5. Az új oldalak ötszörösek: 50 cm, 50 cm és 60 cm.',
        '• b) Terület megadása: Ha a hasonló háromszög területe T\' = 12 cm², akkor a területek aránya:',
        '  T\' / T = 12 / 48 = 1/4 = λ², amiből a hasonlóság aránya λ = √(1/4) = 1/2 = 0,5.',
        '  Az új oldalak az eredeti felét teszik ki: 5 cm, 5 cm és 6 cm (kerülete 16 cm, magassága 4 cm).'
      ],
      badge: 'Kerület vs. Terület',
      badgeColor: 'emerald'
    },
    {
      title: '3. Téglalap arányos darabolása',
      subtitle: 'Egy 3 cm × 12 cm-es téglalap felosztása hasonló résztéglalapra.',
      details: [
        'Az eredeti ABCD téglalap oldalaránya 12 : 3 = 4 : 1.',
        'Egy levágott résztéglalap akkor és csak akkor hasonló hozzá, ha annak oldalaránya is 4 : 1.',
        'Ha a felosztó egyenes a hosszabb oldallal párhuzamos lenne, az oldalarány torzulna. Ezért a rövidebb oldallal (3 cm) párhuzamosan vágunk:',
        'A levágott téglalap hosszabb oldala a közös 3 cm-es él. Rövidebb oldala x, amire: 3 / x = 4 / 1  ⇒  x = 3/4 = 0,75 cm.',
        'A levágott hasonló téglalap mérete: 3 cm × 0,75 cm (λ = 0,75 / 3 = 1/4). A fennmaradó rész: 3 cm × 11,25 cm.'
      ],
      badge: 'Aránytartó Vágás',
      badgeColor: 'amber'
    },
    {
      title: '4. Gúla szintezése és csonkarétegek',
      subtitle: 'Gúla 4 egyenlő magasságú szintre osztása párhuzamos síkokkal.',
      details: [
        'A csúcstól mért magasságok aránya: 1 : 2 : 3 : 4 (λ = 1, 2, 3, 4).',
        '• Alaplapok és palástok területei: λ² arányában nőnek: 1 : 4 : 9 : 16.',
        '  A 3. gúla alaplapja 9-szerese a legkisebbnek, a teljes gúla alaplapja 16-szorosa.',
        '• Gúlák teljes térfogatai a csúcstól: λ³ arányában nőnek: 1 : 8 : 27 : 64.',
        '• Rétegek (csonkagúlák) térfogata egymás alatt: V₁ = 1, V₂ - V₁ = 7, V₃ - V₂ = 19, V₄ - V₃ = 37.',
        '  A rétegek térfogatainak aránya: 1 : 7 : 19 : 37 !'
      ],
      badge: 'λ, λ², λ³ Szintek',
      badgeColor: 'purple'
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="hasonlosag"
      title="4. Hasonlóság"
      subtitle="A hasonlósági transzformáció axiomatikus felépítése, szög- és aránytartás, kerület-, terület- és térfogatarányok, valamint műszaki tervrajzok méretaránya."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="rose"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — A HASONLÓSÁG ARANYTÖRVÉNYEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80">
              <span className="text-xs font-black text-rose-900 dark:text-rose-200 block mb-1">
                ✓ Skálázódási törvények hasonló alakzatoknál (λ &gt; 0):
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs font-black text-rose-900 dark:text-rose-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-rose-300">
                  K&apos; / K = λ
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-rose-300">
                  T&apos; / T = λ²
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-rose-300">
                  V&apos; / V = λ³
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Definíció:</strong> Hasonlóság = középpontos hasonlóság és egybevágóság egymásutánja ($A \sim B$).
              </li>
              <li>
                <strong>Szög- és aránytartás:</strong> A megfelelő szögek egyenlők, a megfelelő szakaszok aránya állandó ($\lambda$).
              </li>
              <li>
                <strong>Méretarány ($1 : N$):</strong> A valós hossz $N$-szerese, a valós terület $N^2$-szerese a térképen mértnek!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: A HASONLÓSÁGI TRANSZFORMÁCIÓ ÉS DEFINÍCIÓK */}
      <TheorySection
        title="1. A hasonlósági transzformáció és hasonló alakzatok"
        lead="A középpontos hasonlóság általánosításaként a sík bármely két alakzata hasonlónak tekinthető, ha az egyik egy nagyítás/kicsinyítés és egy elmozgatás (egybevágóság) kompozíciójával átvihető a másikba."
      >
        <TheoryCard title="Axiomatikus definíciók és szigorú felépítés">
          <p className="mb-3 text-slate-700 leading-relaxed">
            A mindennapi életben gyakran mondjuk két tárgyra, hogy „hasonlítanak”. A matematikában a{' '}
            <strong>hasonlóság</strong> egy egzakt, geometriai transzformációkkal definiált reláció:
          </p>
          <div className="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-lg my-3 space-y-2 text-sm text-slate-800">
            <p>
              <strong>1. Hasonlósági transzformáció:</strong> Egy (vagy több) középpontos hasonlóság és egy
              (vagy több) egybevágósági transzformáció egymásutánját (kompozícióját) hasonlósági transzformációnak
              nevezzük.
            </p>
            <p>
              <strong>2. A hasonlóság aránya (λ vagy k):</strong> A kompozícióban szereplő középpontos hasonlóság
              arányát (vagy több középpontos hasonlóság esetén az arányok abszolút értékének szorzatát) nevezzük a
              hasonlóság arányának (<span className="font-mono">λ &gt; 0</span>).
            </p>
            <p>
              <strong>3. Hasonló alakzatok:</strong> Két alakzatot <em>hasonlónak</em> mondunk (jelölése:{' '}
              <span className="font-mono font-bold">A ~ B</span>), ha létezik olyan hasonlósági transzformáció, amely az
              egyiket a másikba viszi.
            </p>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <strong>Tétel:</strong> Minden hasonlóság előáll egy tetszőleges pontra vonatkozó középpontos hasonlóság és egy
            egybevágósági transzformáció (eltolás, forgatás vagy tengelyes tükrözés) egymásutánjaként.
          </p>
        </TheoryCard>

        <SimilarityCompositionSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Szögtartás és egyenestartás" color="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Mivel a középpontos hasonlóság és az egybevágósági transzformációk is szögtartók és egyenestartók:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-700 mt-2 space-y-1">
              <li>Egyenes képe egyenes, szakasz képe szakasz.</li>
              <li>Párhuzamos egyenesek képei párhuzamos egyenesek.</li>
              <li>
                <strong>A megfelelő szögek nagysága pontosan egyenlő:</strong>{' '}
                <span className="font-mono">α' = α, β' = β, γ' = γ</span>.
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Egybevágóság mint speciális hasonlóság" color="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha a hasonlósági arány <span className="font-mono font-bold">λ = 1</span>, akkor a távolságok nem
              változnak:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-700 mt-2 space-y-1">
              <li>A szakaszok hossza egyenlő marad: <span className="font-mono">a' = a</span>.</li>
              <li>Az egybevágóságok halmaza valódi részhalmaza a hasonlósági transzformációknak.</li>
              <li>Minden egybevágó alakzatpár egyben hasonló is, de fordítva ez nem igaz!</li>
            </ul>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Tévhit: A középpontos hasonlóság és a hasonlóság azonos fogalom?"
          trap="Azt gondolni, hogy két hasonló alakzat automatikusan középpontosan is hasonló, vagy hogy minden hasonlóságban a megfelelő oldalak párhuzamosak."
          correction="Nem! Két alakzat csak akkor középpontosan hasonló, ha megfelelő oldalaik páronként párhuzamosak. Ha az alakzatot elforgatjuk vagy tükrözzük, a párhuzamosság megszűnik, de a hasonlóság fennmarad. A középpontos hasonlóság a hasonlóságnak csupán egy speciális, iránytartó esete."
        />
      </TheorySection>

      {/* 2. SECTION: KERÜLET- ÉS TERÜLETARÁNYOK */}
      <TheorySection
        title="2. Kerület-, terület- és térfogatarányok"
        lead="A hasonlóság során a dimenzióváltás szigorú hatványkitevő-szabály szerint érvényesül: a lineáris méretek λ-val, a felületek λ²-tel, a térfogatok és tömegek λ³-nel skálázódnak."
      >
        <PerimeterAreaScaleSvg />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Lineáris méretek (λ¹)" color="indigo">
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-1">1D Skálázódás</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Bármely két megfelelő szakasz, oldal, magasságvonal, súlyvonal, szögfelező, beírt és körülírt kör sugara,
              valamint a síkidomok <strong>kerülete</strong> a hasonlóság arányával arányos:
            </p>
            <div className="bg-indigo-50 p-2 rounded text-center font-mono font-bold text-indigo-900 text-sm">
              a' / a = m' / m = r' / r = K' / K = λ
            </div>
          </TheoryCard>

          <TheoryCard title="Területek és Felszínek (λ²)" color="emerald">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">2D Skálázódás</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Mivel a síkidomok területe két lineáris dimenzió szorzataként számítható ki (alap × magasság), a területek
              és a testek felszínei a hasonlóság arányának <strong>négyzetével</strong> arányosak:
            </p>
            <div className="bg-emerald-50 p-2 rounded text-center font-mono font-bold text-emerald-900 text-sm">
              T' / T = A' / A = λ²
            </div>
          </TheoryCard>

          <TheoryCard title="Térfogatok és Tömegek (λ³)" color="amber">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">3D Skálázódás</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              A 3D testek térfogata három dimenzió szorzata. Így a hasonló testek térfogata, és homogén anyag esetén
              a tömege is a hasonlósági arány <strong>köbével</strong> arányos:
            </p>
            <div className="bg-amber-50 p-2 rounded text-center font-mono font-bold text-amber-900 text-sm">
              V' / V = m' / m = λ³
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout type="tip" title="Gyakorlati aranyszabály: Területből oldalméret visszaszámolása">
          Ha egy feladatban két hasonló síkidom területének aránya adott (pl.{' '}
          <span className="font-mono">T₂ / T₁ = 9</span>), akkor a hasonlóság aránya a területarány{' '}
          <strong>négyzetgyöke</strong>:{' '}
          <span className="font-mono">λ = √9 = 3</span>. Az oldalak és kerületek tehát 3-szorosak, nem 9-szeresek!
          Hasonlóan, ha a térfogatarány adott (pl. <span className="font-mono">V₂ / V₁ = 8</span>), a méretarány{' '}
          <span className="font-mono">λ = ∛8 = 2</span>.
        </TheoryCallout>

        <PyramidLayersSvg />

        <TheoryCard title="Térbeli szintezés: Gúla rétegekre bontása" color="slate">
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            Ha egy gúlát a magasságával párhuzamosan <span className="font-mono">n</span> egyenlő magasságú szintre
            vágunk (pl. <span className="font-mono">n = 4</span>), a csúcstól mért rész-gúlák rendre{' '}
            <span className="font-mono">λ = 1, 2, 3, 4</span> arányban hasonlóak a legkisebbhez:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 border border-slate-200">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-2 border">Szint (csúcstól)</th>
                  <th className="p-2 border">Hasonlósági arány (λ)</th>
                  <th className="p-2 border">Alaplap területe (λ²)</th>
                  <th className="p-2 border">Kumulatív térfogat (λ³)</th>
                  <th className="p-2 border">Csonkagúla szelet térfogata</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-semibold">1. szint (csúcsgúla)</td>
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">1 · T₁</td>
                  <td className="p-2 border">1 · V₁</td>
                  <td className="p-2 border font-bold text-red-600">1 · V₁</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">2. szintig érő gúla</td>
                  <td className="p-2 border">2</td>
                  <td className="p-2 border">4 · T₁</td>
                  <td className="p-2 border">8 · V₁</td>
                  <td className="p-2 border font-bold text-orange-600">8 - 1 = 7 · V₁</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">3. szintig érő gúla</td>
                  <td className="p-2 border">3</td>
                  <td className="p-2 border">9 · T₁</td>
                  <td className="p-2 border">27 · V₁</td>
                  <td className="p-2 border font-bold text-blue-600">27 - 8 = 19 · V₁</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">4. szint (teljes gúla)</td>
                  <td className="p-2 border">4</td>
                  <td className="p-2 border">16 · T₁</td>
                  <td className="p-2 border">64 · V₁</td>
                  <td className="p-2 border font-bold text-emerald-600">64 - 27 = 37 · V₁</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 mt-2 font-semibold">
            Következtetés: A gúlaszeletek térfogatai az egymást követő köbszámok különbségeként:{' '}
            <span className="font-mono text-indigo-700">1 : 7 : 19 : 37</span> arányban állnak egymással!
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 3. SECTION: I. INTERAKTÍV LABORATÓRIUM */}
      <TheorySection
        title="3. I. Laboratórium: Hasonlósági Skálázó & Metrikus Kalkulátor"
        lead="Válassz síkidomot vagy testet, állítsd a hasonlósági arányt (λ), és figyeld meg a lineáris, másodfokú és köbös méretváltozásokat valós időben!"
      >
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          {/* Controls bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Alakzat kiválasztása:</label>
              <div className="grid grid-cols-2 gap-2">
                {(['triangle', 'rectangle', 'circle', 'cube'] as const).map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => setSelectedShape(shape)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors ${selectedShape === shape
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    {shape === 'triangle' && '🔺 Háromszög'}
                    {shape === 'rectangle' && '▭ Téglalap'}
                    {shape === 'circle' && '⭕ Kör'}
                    {shape === 'cube' && '🧊 Kocka'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-600 uppercase">Hasonlósági arány (λ):</label>
                <span className="text-base font-bold text-indigo-600 font-mono">λ = {scaleFactor}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.5"
                step="0.25"
                value={scaleFactor}
                onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>0.5× (Kicsinyítés)</span>
                <span>1.0× (Egybevágó)</span>
                <span>2.0×</span>
                <span>3.5× (Nagyítás)</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Canvas */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[180px]">
            <svg viewBox="0 0 400 160" className="w-full max-w-md h-auto">
              <rect x="0" y="0" width="400" height="160" fill="transparent" />

              {/* Center divider line */}
              <line x1="200" y1="10" x2="200" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
              <text x="100" y="22" fontSize="10" textAnchor="middle" fill="#64748b" fontWeight="bold">Eredeti alakzat (λ = 1)</text>
              <text x="300" y="22" fontSize="10" textAnchor="middle" fill="#4338ca" fontWeight="bold">Hasonló alakzat (λ = {scaleFactor})</text>

              {/* Triangle preview */}
              {selectedShape === 'triangle' && (
                <>
                  <polygon points="60,130 140,130 60,70" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                  <path d="M 60 116 A 14 14 0 0 1 74 130" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                  <circle cx="65.5" cy="124.5" r="1.6" fill="#4f46e5" />
                  <g transform={`translate(${300 - 30 * scaleFactor}, ${130 - 30 * scaleFactor})`}>
                    <polygon
                      points={`0,${60 * scaleFactor} ${40 * scaleFactor},${60 * scaleFactor} 0,0`}
                      fill="#fed7aa"
                      stroke="#ea580c"
                      strokeWidth="2"
                    />
                    <path
                      d={`M 0 ${60 * scaleFactor - 14} A 14 14 0 0 1 14 ${60 * scaleFactor}`}
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                    />
                    <circle cx="5.5" cy={60 * scaleFactor - 5.5} r="1.6" fill="#ea580c" />
                  </g>
                </>
              )}

              {/* Rectangle preview */}
              {selectedShape === 'rectangle' && (
                <>
                  <rect x="70" y="70" width="60" height="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                  <g transform={`translate(${300 - (30 * scaleFactor) / 2}, ${100 - (30 * scaleFactor) / 2})`}>
                    <rect
                      x={-(25 * scaleFactor)}
                      y={-(15 * scaleFactor)}
                      width={50 * scaleFactor}
                      height={30 * scaleFactor}
                      fill="#bbf7d0"
                      stroke="#16a34a"
                      strokeWidth="2"
                    />
                  </g>
                </>
              )}

              {/* Circle preview */}
              {selectedShape === 'circle' && (
                <>
                  <circle cx="100" cy="95" r="28" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                  <circle cx="300" cy="95" r={Math.min(55, 20 * scaleFactor)} fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
                </>
              )}

              {/* Cube preview */}
              {selectedShape === 'cube' && (
                <>
                  <rect x="80" y="80" width="40" height="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
                  <polygon points="80,80 95,65 135,65 120,80" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
                  <polygon points="120,80 135,65 135,105 120,120" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1.5" />

                  <g transform={`translate(${290 - 15 * scaleFactor}, ${95 - 15 * scaleFactor})`}>
                    <rect x="0" y="0" width={25 * scaleFactor} height={25 * scaleFactor} fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                    <polygon
                      points={`0,0 ${10 * scaleFactor},${-10 * scaleFactor} ${35 * scaleFactor},${-10 * scaleFactor} ${25 * scaleFactor},0`}
                      fill="#ffedd5"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points={`${25 * scaleFactor},0 ${35 * scaleFactor},${-10 * scaleFactor} ${35 * scaleFactor},${15 * scaleFactor} ${25 * scaleFactor},${25 * scaleFactor}`}
                      fill="#fdba74"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                    />
                  </g>
                </>
              )}
            </svg>
          </div>

          {/* Metric calculations summary table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
              <p className="text-[11px] font-bold text-indigo-700 uppercase">Kerület / Kerületarány (λ¹)</p>
              <p className="text-xl font-mono font-bold text-indigo-900 mt-1">{scaledPerimeter}</p>
              <p className="text-xs text-indigo-700 mt-0.5 font-semibold">
                K' = {scaleFactor} × {currentConfig.perimeter}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <p className="text-[11px] font-bold text-emerald-700 uppercase">Területarány (λ² = {Math.round(Math.pow(scaleFactor, 2) * 100) / 100})</p>
              <p className="text-xl font-mono font-bold text-emerald-900 mt-1">{scaledArea}</p>
              <p className="text-xs text-emerald-700 mt-0.5 font-semibold">
                T' = {Math.round(Math.pow(scaleFactor, 2) * 100) / 100} × {currentConfig.area}
              </p>
            </div>

            <div className={`p-3 rounded-lg text-center border ${currentConfig.hasVolume ? 'bg-amber-50 border-amber-200' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
              <p className="text-[11px] font-bold text-amber-700 uppercase">
                Térfogatarány (λ³ = {Math.round(Math.pow(scaleFactor, 3) * 100) / 100})
              </p>
              <p className="text-xl font-mono font-bold text-amber-900 mt-1">
                {currentConfig.hasVolume ? scaledVolume : 'Csak testekre (3D)'}
              </p>
              <p className="text-xs text-amber-700 mt-0.5 font-semibold">
                {currentConfig.hasVolume ? `V' = ${Math.round(Math.pow(scaleFactor, 3) * 100) / 100} × ${currentConfig.volume}` : '—'}
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SECTION: II. LABORATÓRIUM - ESETTANULMÁNYOK */}
      <TheorySection
        title="4. II. Laboratórium: Esettanulmányok & Döntési Mátrix"
        lead="Vizsgáld meg a legfontosabb kidolgozott feladatokat és levezetéseket interaktív esettanulmányként!"
      >
        {/* Scenario selector tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.title}
              type="button"
              onClick={() => setActiveScenario(idx)}
              className={`p-2.5 rounded-lg text-left border text-xs transition-all ${activeScenario === idx
                ? 'bg-slate-900 text-white border-slate-900 shadow-md font-bold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-medium'
                }`}
            >
              <span className="block text-[10px] text-slate-400 font-normal">Esettanulmány #{idx + 1}</span>
              <span className="line-clamp-2">{sc.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected scenario display */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-base font-bold text-slate-900">{scenarios[activeScenario].title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{scenarios[activeScenario].subtitle}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {scenarios[activeScenario].badge}
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            {scenarios[activeScenario].details.map((line) => (
              <p key={line.slice(0, 30)} className={line.startsWith('•') ? 'pl-2 font-medium text-slate-800' : ''}>
                {line}
              </p>
            ))}
          </div>

          {activeScenario === 2 && <RectanglePartitionSvg className="w-full max-w-md mx-auto my-3" />}
        </div>
      </TheorySection>

      {/* 5. SECTION: MŰSZAKI TERVRAJZOK ÉS MÉRETARÁNY */}
      <TheorySection
        title="5. Műszaki tervrajzok és méretarányok"
        lead="A mérnöki gyakorlatban az épületek és gépelemek tervrajzai középpontos kicsinyítéssel vagy nagyítással készülnek. Ismerd meg az 1 : N méretarány használatát és az angolszász átváltásokat!"
      >
        <ScaleMapBlueprintSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A méretarány (M = 1 : N) jelentése" color="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              A méretarány megadja, hogy a tervrajzon vagy térképen mért <span className="font-mono font-bold">1 cm</span>{' '}
              hosszúság a valóságban hány centiméternek felel meg:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-700 mt-2 space-y-1">
              <li><strong>M = 1 : 100:</strong> 1 cm a rajzon = 100 cm = 1 m a valóságban.</li>
              <li><strong>M = 1 : 50:</strong> 1 cm a rajzon = 50 cm = 0,5 m a valóságban.</li>
              <li><strong>M = 1 : 25 000:</strong> 1 cm a térképen = 25 000 cm = 250 m a valóságban.</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Területi átszámítás térképeken" color="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ne feledd, hogy a területek a méretarány <strong>négyzetével</strong> skálázódnak!
            </p>
            <div className="bg-emerald-50 p-2.5 rounded text-xs font-mono text-emerald-900 mt-2 space-y-1">
              <p>T_valóság = T_rajz · N²</p>
              <p>Pl. 1 : 100 tervrajzon 4 cm² területű csempe:</p>
              <p>4 cm² · 100² = 40 000 cm² = 4 m² a valóságban!</p>
            </div>
          </TheoryCard>
        </div>

        <TheoryCard title="Angolszász mértékegységek a tervrajzokon" color="amber">
          <p className="text-sm text-slate-700 leading-relaxed">
            Nemzetközi tervezési projekteknél gyakran találkozunk a láb (angolul <em>foot</em>, jele: <strong>ft</strong>)
            mértékegységgel:
          </p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 my-2 text-sm text-amber-900 space-y-1">
            <p><strong>Hivatalos átváltás:</strong> 1 ft = 0,3048 m</p>
            <p><strong>Gyakorlati kerekítés:</strong> 1 ft ≈ 0,3 m = 30 cm</p>
            <p><strong>Példa:</strong> Egy 3 ft széles bejárati ajtó: 3 · 0,3 m = 0,9 m = 90 cm széles a valóságban.</p>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

