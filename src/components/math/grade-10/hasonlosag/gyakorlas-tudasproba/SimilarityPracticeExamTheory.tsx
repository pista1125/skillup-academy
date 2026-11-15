import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  SynthesisConceptMapSvg,
  HexagonTrianglesSimilaritySvg,
  MirrorReflectionMeasurementSvg,
  TruncatedPyramidSectionsSvg,
  PyraminxSimilaritySvg
} from './SimilarityPracticeExamFigures';

export const SimilarityPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state: Scale factor and base geometry
  const [lambda, setLambda] = useState<number>(2.0);
  const [baseA, setBaseA] = useState<number>(6);
  const [baseH, setBaseH] = useState<number>(4);

  // Derived calculations for Lab 1
  const origArea = (baseA * baseH) / 2;
  const scaledA = Math.round(baseA * lambda * 100) / 100;
  const scaledH = Math.round(baseH * lambda * 100) / 100;
  const lambdaSquared = Math.round(lambda * lambda * 100) / 100;
  const scaledArea = Math.round(origArea * lambdaSquared * 100) / 100;
  const lambdaCubed = Math.round(lambda * lambda * lambda * 100) / 100;

  // Laboratory 2 state: Scenario tabs
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  const scenarios = [
    {
      title: '1. Optikai tükörmódszeres lámpamérés',
      subtitle: 'Közlekedési lámpa magasságának meghatározása tükröző térkővel.',
      badge: 'Gyakorlati Optika',
      badgeColor: 'sky',
      details: [
        'A járókelő a talajon lévő sík felületű, tükröző kövön látja a lámpa legfelső pontjának képét.',
        '• Szemmagasság: h = 184 cm = 1,84 m.',
        '• Megfigyelő távolsága a tükörtől: d₁ = 1,6 m.',
        '• Lámpa távolsága a tükörtől: d₂ = 5,6 m.',
        '• A fényvisszaverődés törvénye (beesési szög = visszaverődési szög: α = β) és a két derékszög miatt a két derékszögű háromszög hasonló (I. alapeset: sz-sz).',
        '• Hasonlósági aránypár: M / h = d₂ / d₁',
        '• M / 184 = 5,6 / 1,6 = 3,5',
        '• M = 184 · 3,5 = 644 cm = 6,44 méter!',
        '• Így a közlekedési lámpa pontos magassága 6,44 méter a talajtól.'
      ]
    },
    {
      title: '2. Szabályos gúla síkmetszete & Csonkagúla',
      subtitle: 'Alappal párhuzamos metszet a magasság felső harmadában.',
      badge: 'Térbeli Geometria',
      badgeColor: 'purple',
      details: [
        'Adott egy szabályos gúla: alapéle a = 12 cm, teljes magassága M = 12 cm.',
        'A felső harmadolóponton átmenő párhuzamos sík a gúla csúcsától m₁ = 4 cm távolságra metszi a magasságot.',
        '• Hasonlósági arány a kis gúla és a nagy gúla között: λ = m₁ / M = 4 / 12 = 1/3.',
        '• a) Kis gúla alapéle: a_kis = λ · a = (1/3) · 12 = 4 cm.',
        '• b) Alapterületek aránya: A_kis / A_nagy = λ² = (1/3)² = 1/9.',
        '• c) Térfogatok aránya: V_kis / V_nagy = λ³ = (1/3)³ = 1/27.',
        '• A keletkező csonkagúla térfogata az eredeti gúla térfogatának 26/27-ed része!'
      ]
    },
    {
      title: '3. Pyraminx tetraéder felbontása',
      subtitle: 'Szabályos tetraéder lapjainak transzformációja és méretnövelése.',
      badge: 'Modellezés',
      badgeColor: 'rose',
      details: [
        'A Pyraminx minden oldallapja 9 egybevágó szabályos háromszögre van felosztva.',
        '• a) Az egymás melletti kis háromszögek forgatással és eltolással fedésbe hozhatók.',
        '• b) Az A₁A₃C₁ háromszög élhossza 2 egység, az A₁A₄D háromszög élhossza 3 egység. Középpontos nagyítással (O = A₁, λ = 1,5) képződik le.',
        '• c) Ha a teljes test élhosszát másfélszeresére (λ = 1,5) növeljük:',
        '  - Egy lap területe 1,5² = 2,25-szörösére változik.',
        '  - A test teljes felszíne szintén 1,5² = 2,25-szörösére nő.',
        '  - A test térfogata pedig 1,5³ = 3,375-szörösére emelkedik!'
      ]
    },
    {
      title: '4. Varignon-tétel és speciális négyszögek',
      subtitle: 'Bármely négyszög oldalfelező pontjai által bezárt paralelogramma.',
      badge: 'Klasszikus Tétel',
      badgeColor: 'emerald',
      details: [
        'Tétel: Tetszőleges síknégyszög oldalfelező pontjait sorra összekötve paralelogrammát kapunk.',
        '• Bizonyítás: A szakaszok a megfelelő háromszögek középvonalai, így párhuzamosak a négyszög átlóival és feleakkorák.',
        '• Területi összefüggés: A Varignon-paralelogramma területe pontosan a fele az eredeti négyszög területének: T_paralelogramma = T_négyszög / 2.',
        '• Speciális következmények:',
        '  - Ha az átlók merőlegesek (e ⊥ f, pl. deltoid): a felezőpontok TÉGLALAPOT alkotnak.',
        '  - Ha az átlók egyenlők (e = f, pl. téglalap, húrtrapéz): a felezőpontok ROMBUSZT alkotnak.',
        '  - Ha az átlók merőlegesek ÉS egyenlők (pl. négyzet): a felezőpontok NÉGYZETET alkotnak!'
      ]
    }
  ];

  const currentScenario = scenarios[activeScenarioIdx];

  return (
    <TheoryTemplate
      themeColor="violet"
      title="11. Gyakorlás, tudáspróba"
      subtitle="Fejezeti szintézis: alaptételek, kerület- és területarányok, metrikus tételek, optikai mérések és térbeli feladványok."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      estimatedTime="35 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — FEJEZETI TUDÁSPRÓBA ÖSSZEFOGLALÓ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80">
              <span className="text-xs font-black text-violet-900 dark:text-violet-200 block mb-1">
                ✓ A Hasonlóság Fejezet 4 Alappillére a Témazárón:
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs font-black text-violet-900 dark:text-violet-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-violet-300">
                  K&apos;/K = λ, T&apos;/T = λ²
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-violet-300">
                  V&apos;/V = λ³, CS:SF = 2:1
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-violet-300">
                  m²=pq, a²=pc, b²=qc
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Skálázódás:</strong> Hosszak és kerületek $|\lambda|$-val, területek és felszínek $\lambda^2$-tel, térfogatok $|\lambda|^3$-nel változnak!
              </li>
              <li>
                <strong>Párhuzamos szelőszakaszok:</strong> $c_1 / c_2 = OA_1 / OA_2$ — mindig a csúcstól mért <em>teljes</em> szakaszokkal arányosítunk!
              </li>
              <li>
                <strong>Középvonal és súlypont:</strong> $k = c / 2$, $T&apos; = T / 4$; a súlypont $2 : 1$ arányban oszt, a 3 súlyvonal 6 egyenlő ($T / 6$) területre bont.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Labor: Interaktív skálázási kalkulátor */}
      <TheoryCard title="1. Laboratórium: Hasonlósági Skálázási & Transzformációs Szimulátor" accentColor="violet">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Állítsd be a hasonlósági arányt (<span className="font-semibold text-violet-600">λ</span>) és vizsgáld meg,
          hogyan skálázódnak valós időben a lineáris méretek (oldal, magasság, kerület: <span className="font-semibold">λ</span>),
          a felületek és területek (<span className="font-semibold text-purple-600">λ²</span>), valamint a térfogatok (<span className="font-semibold text-indigo-600">λ³</span>)!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-violet-50/60 dark:bg-violet-950/30 rounded-xl border border-violet-100 dark:border-violet-900/40">
            <label className="text-xs font-bold text-violet-800 dark:text-violet-300 block mb-1">
              Hasonlósági arány (λ): {lambda.toFixed(1)}×
            </label>
            <input
              type="range"
              min="0.3"
              max="3.5"
              step="0.1"
              value={lambda}
              onChange={(e) => setLambda(parseFloat(e.target.value))}
              className="w-full accent-violet-600"
            />
            <span className="text-[11px] text-slate-500">
              {lambda < 1 ? 'Kicsinyítés (0 < λ < 1)' : lambda === 1 ? 'Egybevágóság (λ = 1)' : 'Nagyítás (λ > 1)'}
            </span>
          </div>

          <div className="p-3 bg-purple-50/60 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900/40">
            <label className="text-xs font-bold text-purple-800 dark:text-purple-300 block mb-1">
              Eredeti alap (a₀): {baseA} cm
            </label>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={baseA}
              onChange={(e) => setBaseA(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600"
            />
            <span className="text-[11px] text-slate-500">Háromszög alapjának hossza</span>
          </div>

          <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
            <label className="text-xs font-bold text-indigo-800 dark:text-indigo-300 block mb-1">
              Eredeti magasság (m₀): {baseH} cm
            </label>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={baseH}
              onChange={(e) => setBaseH(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
            <span className="text-[11px] text-slate-500">Háromszög magassága</span>
          </div>
        </div>

        {/* Eredményjelző kártyák */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
          <div>
            <div className="text-xs text-slate-500 font-medium">Hasonlósági arány (λ)</div>
            <div className="text-lg font-bold text-violet-600 dark:text-violet-400">{lambda.toFixed(1)}×</div>
            <div className="text-[11px] text-slate-400">Oldalak: a&apos; = {scaledA} cm</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Magasság aránya (λ)</div>
            <div className="text-lg font-bold text-violet-600 dark:text-violet-400">{lambda.toFixed(1)}×</div>
            <div className="text-[11px] text-slate-400">m&apos; = {scaledH} cm</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Területarány (λ²)</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{lambdaSquared.toFixed(2)}×</div>
            <div className="text-[11px] text-slate-400">T&apos; = {scaledArea} cm²</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Térfogatarány (λ³)</div>
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{lambdaCubed.toFixed(2)}×</div>
            <div className="text-[11px] text-slate-400">Testek esetén</div>
          </div>
        </div>
      </TheoryCard>

      {/* 2. Labor: Esettanulmányok Fülekkel */}
      <TheoryCard title="2. Laboratórium: Esettanulmányok és Témazáró Feladványok" accentColor="purple">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Kattints az esettanulmányok gombjaira a témazáró klasszikus feladatainak részletes levezetéséhez!
        </p>

        {/* Tab gombok */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScenarioIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeScenarioIdx === idx
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {sc.title.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Aktuális forgatókönyv kártya */}
        <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300">
              {currentScenario.badge}
            </span>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {currentScenario.title}
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic">
            {currentScenario.subtitle}
          </p>

          <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
            {currentScenario.details.map((line, lIdx) => (
              <div key={lIdx} className="leading-relaxed">
                {line}
              </div>
            ))}
          </div>
        </div>
      </TheoryCard>

      {/* 1. Szekció: Transzformációk & Hasonlóság alapjai */}
      <TheorySection title="I. Transzformációk, Hasonlósági Arány és Területarány">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              A <strong>hasonlósági transzformáció</strong> a geometriai alakzatok olyan hozzárendelése, amely
              megőrzi a szögek nagyságát, és bármely két pont távolságát egy pozitív állandó (<span className="font-semibold text-violet-600">λ</span>)
              aránnyal szorozza meg.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>λ &gt; 1:</strong> Valódi nagyítás (pl. mikroszkóp, tervrajz kivitelezése).</li>
              <li><strong>0 &lt; λ &lt; 1:</strong> Valódi kicsinyítés (pl. fényképezés, térképek).</li>
              <li><strong>|λ| = 1:</strong> Távolságtartó egybevágóság (eltolás, tengelyes és középpontos tükrözés, forgatás).</li>
              <li><strong>λ &lt; 0:</strong> Negatív hasonlósági arány, amely 180°-os elforgatással (középpontos tükrözéssel) kombinált skálázást jelent.</li>
            </ul>
            <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-200 dark:border-violet-800">
              <p className="text-xs font-bold text-violet-800 dark:text-violet-300 mb-1">
                A Méretarányos Skálázás Alaptörvénye:
              </p>
              <p className="text-xs text-violet-900 dark:text-violet-200">
                • Lineáris méretek (oldal, kerület, sugár, magasság): <strong>K&apos; / K = λ</strong><br />
                • Felületi méretek (terület, lapok felszíne): <strong>T&apos; / T = λ²</strong><br />
                • Térbeli méretek (testek térfogata): <strong>V&apos; / V = λ³</strong>
              </p>
            </div>
          </div>
          <div>
            <SynthesisConceptMapSvg />
          </div>
        </div>
      </TheorySection>

      {/* 2. Szekció: Párhuzamos szelők és háromszöghasonlóság */}
      <TheorySection title="II. Párhuzamos Szelők & A Háromszöghasonlóság 4 Alapesete">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <HexagonTrianglesSimilaritySvg />
          </div>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Két háromszög hasonlóságának igazolásához nem szükséges minden oldal és szög vizsgálata;
              elegendő a 4 alapeset egyikének teljesülése:
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-emerald-600">1. sz-sz:</span> Két-két belső szög páronként egyenlő.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600">2. o-o-o:</span> Mindhárom oldalpár aránya egyenlő: a&apos;/a = b&apos;/b = c&apos;/c.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-600">3. o-sz-o:</span> Két oldalpár aránya és a KÖZBEZÁRT szög egyenlő.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-rose-600">4. o-o-sz:</span> Két oldalpár aránya és a NAGYOBBIKKAL SZEMKÖZTI szög egyenlő.
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Gyakorlati mérések és térbeli geometriai szintézis */}
      <TheorySection title="III. Térbeli Arányok & Gyakorlati Geometriai Mérések">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              A hasonlóság az építészetben, a földmérésben és a térbeli testek analízisében is elengedhetetlen:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Tükröző felület módszere:</strong> Vízszintes tükör segítségével a közvetlenül elérhetetlen magasságok (pl. tornyok, kandeláberek, fák) pontosan megmérhetők a fénysugarak szimmetriája révén.</li>
              <li><strong>Gúla síkmetszete & Csonkagúla:</strong> Az alaplappal párhuzamos metszősík a gúlát egy hozzá hasonló kisebb gúlára és egy csonkagúlára bontja. A magasságok aránya megegyezik a megfelelő élhosszak arányával.</li>
              <li><strong>Pyraminx és fraktálok:</strong> A szabályos háromszöglapok λ = 1,5-szörös skálázásakor a területek 2,25-szörösükre nőnek, ami az önhasonló fraktálgeometria alapja.</li>
            </ul>
          </div>
          <div>
            <TruncatedPyramidSectionsSvg />
          </div>
        </div>
      </TheorySection>

      {/* Aranyszabály Callout */}
      <TheoryCallout title="Aranyszabály a Fejezeti Témazáróhoz" type="info">
        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <strong>A hasonlóság aranyszabálya:</strong> Minden arányfelírás előtt ellenőrizd a csúcsok pontos
          megfeleltetését és a mértékegységek azonosságát! Ha az oldalhossz λ-szorosára változik,
          a kerület <strong>λ-szoros</strong>, a terület <strong>λ²-szeres</strong>, a testek térfogata pedig <strong>λ³-szoros</strong> lesz!
        </p>
      </TheoryCallout>

      {/* Csapdák és típushibák */}
      <TheoryTrapBox title="Gyakori Típushibák a Témazáróban">
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <li>
            <strong>Lineáris arány vs. területarány keverése:</strong> Ha a hasonlósági arány λ = 3,
            a terület NEM 3-szorosára, hanem 3² = 9-szeresére nő!
          </li>
          <li>
            <strong>A IV. alapeset kritikus feltételének mellőzése:</strong> Két oldal és egy szög egyezése
            csak akkor garantál hasonlóságot, ha a szög a nagyobbik oldallal szemben fekszik!
          </li>
          <li>
            <strong>Trapéz átlói és szárai:</strong> A kiegészítő háromszög területe nem egyszerűen a trapéz területe,
            hanem a teljes háromszögből levont rész: T_trapéz = T_nagy - T_kiegészítő.
          </li>
        </ul>
      </TheoryTrapBox>
    </TheoryTemplate>
  );
};
