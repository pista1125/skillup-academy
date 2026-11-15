import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  AltitudeAndLegTheoremsSvg,
  ThreeSimilarTrianglesSvg,
  PythagorasFromLegsSvg,
  CliffMeasurementSvg,
  ArithmeticGeometricInequalitySvg
} from './AltitudeLegTheoremsFigures';

export const AltitudeLegTheoremsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state: Interactivity for p and q
  const [segP, setSegP] = useState<number>(16);
  const [segQ, setSegQ] = useState<number>(9);

  // Derived calculations for Lab 1
  const segC = segP + segQ;
  const heightM = Math.round(Math.sqrt(segP * segQ) * 100) / 100;
  const legA = Math.round(Math.sqrt(segP * segC) * 100) / 100;
  const legB = Math.round(Math.sqrt(segQ * segC) * 100) / 100;
  const radiusR = Math.round((segC / 2) * 100) / 100;
  const areaT = Math.round(((segC * heightM) / 2) * 100) / 100;

  // Laboratory 2 state: Scenario tabs
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  const scenarios = [
    {
      title: '1. A szikla magasságának meghatározása',
      subtitle: 'Nehezen megközelíthető sziklacsúcs magasságának mérése átfogószeletekkel.',
      badge: 'Terepi Mérés',
      badgeColor: 'teal',
      details: [
        'A megfigyelő a sík terepen kitűzi az A, C₁ és B pontokat, ahol C₁ a hegycsúcs merőleges vetülete a talajon.',
        '• A mért szakaszok: AC₁ = q = 15 m és BC₁ = p = 42 m.',
        '• A szögmérések szerint az AC és BC látóirányok derékszöget (90°) zárnak be.',
        '• A derékszögű háromszög magasságtétele alapján:',
        '  m² = p · q = 42 · 15 = 630',
        '• A szikla magassága:',
        '  m = √630 ≈ 25,1 méter!',
        '• Ezzel bonyolult hegymászás nélkül, puszta földi távolságméréssel pontos magasságértéket kaptunk!'
      ]
    },
    {
      title: '2. Szeletek: 2 cm és 3 cm',
      subtitle: 'p = 3 cm, q = 2 cm szeletek esetén az átfogó, magasság, befogók és terület.',
      badge: 'Alapszámítás',
      badgeColor: 'blue',
      details: [
        'Adott: q = 2 cm, p = 3 cm. Az átfogó teljes hossza: c = p + q = 3 + 2 = 5 cm.',
        '• a) Átfogóhoz tartozó magasság:',
        '  m = √(p · q) = √(3 · 2) = √6 ≈ 2,45 cm.',
        '• b) Hosszabbik befogó (a p szelethez tartozó):',
        '  a = √(p · c) = √(3 · 5) = √15 ≈ 3,87 cm.',
        '  (Rövidebbik befogó: b = √(q · c) = √(2 · 5) = √10 ≈ 3,16 cm).',
        '• c) Háromszög területe:',
        '  T = (c · m) / 2 = (5 · √6) / 2 ≈ 6,12 cm².',
        '• Ellenőrzés: T = (a · b) / 2 = (√15 · √10) / 2 = √150 / 2 = 5√6 / 2 ≈ 6,12 cm²!'
      ]
    },
    {
      title: '3. Befogó 30 cm, átfogó 45 cm',
      subtitle: 'Befogóból és átfogóból a vetület és a magasság visszaszámítása.',
      badge: 'Visszaszámolás',
      badgeColor: 'purple',
      details: [
        'Adott: a = 30 cm, c = 45 cm.',
        '• a) A 30 cm-es befogó vetülete az átfogón (befogótétel átrendezése):',
        '  a² = p · c  ⇒  p = a² / c = 30² / 45 = 900 / 45 = 20 cm!',
        '• A másik szelet: q = c - p = 45 - 20 = 25 cm.',
        '• b) Átfogóhoz tartozó magasság:',
        '  m = √(p · q) = √(20 · 25) = √500 = 10√5 ≈ 22,36 cm.',
        '• Másik befogó: b = √(q · c) = √(25 · 45) = √1125 = 15√5 ≈ 33,54 cm.',
        '• Pitagorasz ellenőrzése: a² + b² = 900 + 1125 = 2025 = 45² (c²)!'
      ]
    },
    {
      title: '4. Szeletek: 5,4 cm és 9,6 cm',
      subtitle: 'Klasszikus mintafeladat: magasság, befogók és a körülírt kör sugara.',
      badge: 'Érettségi Típus',
      badgeColor: 'amber',
      details: [
        'Adott: p = 5,4 cm és q = 9,6 cm. Átfogó: c = 5,4 + 9,6 = 15 cm.',
        '• a) Magasság a magasságtétellel:',
        '  m = √(5,4 · 9,6) = √51,84 = 7,2 cm.',
        '• Befogók a befogótétellel:',
        '  - a = √(p · c) = √(5,4 · 15) = √81 = 9 cm!',
        '  - b = √(q · c) = √(9,6 · 15) = √144 = 12 cm!',
        '• b) A háromszög körülírt körének sugara:',
        '  Thálész-tétel miatt az átfogó felezőpontja a kör középpontja:',
        '  R = c / 2 = 15 / 2 = 7,5 cm!',
        '• Érdekesség: a háromszög a 3 : 4 : 5 pitagoraszi hármas 3-szorosa (9 : 12 : 15)!'
      ]
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="magassagtetel-befogotetel"
      title="10. Ráadás – Magasságtétel, befogótétel"
      subtitle="A derékszögű háromszög metrikus tételei, a Pitagorasz-tétel alternatív bizonyítása, terepi sziklamagasság-mérés és a számtani-mértani közép egyenlőtlenségének geometriai bizonyítása."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — MAGASSÁGTÉTEL ÉS BEFOGÓTÉTEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80">
              <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 block mb-1">
                ✓ A derékszögű háromszög metrikus tételei (c = p + q):
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs font-black text-indigo-900 dark:text-indigo-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-indigo-300">
                  m² = p · q
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-indigo-300">
                  a² = p · c
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-indigo-300">
                  b² = q · c
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Magasságtétel:</strong> Az átfogóhoz tartozó magasság a két átfogószelet mértani közepe ($m = \sqrt&#123;p \cdot q&#125;$).
              </li>
              <li>
                <strong>Befogótétel:</strong> Bármely befogó az egész átfogó és a befogóhoz közelebbi szelet mértani közepe ($a = \sqrt&#123;p \cdot c&#125;$).
              </li>
              <li>
                <strong>Közepek egyenlőtlensége (Thálész-félkör):</strong> $\sqrt&#123;p \cdot q&#125; \le (p + q) / 2$, egyenlőség csak $p = q$ esetén!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: A DERÉKSZÖGŰ HÁROMSZÖG ÉS A HÁROM HASONLÓ HÁROMSZÖG */}
      <TheorySection
        title="1. A derékszögű háromszög felbontása"
        lead="Ha egy derékszögű háromszögben berajzoljuk az átfogóhoz tartozó magasságot, az az idomot két, az eredetihez hasonló kisebb háromszögre bontja."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Tekintsünk egy derékszögű <span className="font-semibold text-slate-800">ABC</span> háromszöget, melynek derékszöge a <span className="font-semibold text-slate-800">C</span> csúcsban található.
              Bocsássunk merőlegest a <span className="font-semibold text-slate-800">C</span> csúcsból az <span className="font-semibold text-slate-800">AB = c</span> átfogóra!
              A merőleges talppontját jelölje <span className="font-semibold text-rose-600">C₁</span>, a magasságot <span className="font-semibold text-rose-600">m</span>-mel.
            </p>
            <TheoryCallout variant="teal" title="A háromszögek hasonlósága">
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                A keletkező három derékszögű háromszög mindegyike tartalmazza a 90°-os szöget, valamint az α és β hegyesszögeket:
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-teal-200 text-center font-mono font-bold text-teal-800 text-sm mb-2">
                ΔABC ~ ΔC₁BC ~ ΔAC₁C  (I. alapeset: sz-sz)
              </div>
              <p className="text-xs text-teal-900 leading-relaxed">
                Mivel a szögeik páronként egyenlők, a megfelelő oldalak aránya megegyezik. Ebből vezethető le a geometria két legfontosabb metrikus tétele: a <strong>magasságtétel</strong> és a <strong>befogótétel</strong>!
              </p>
            </TheoryCallout>
          </div>
          <div>
            <AltitudeAndLegTheoremsSvg />
          </div>
        </div>

        <div className="mt-6">
          <ThreeSimilarTrianglesSvg />
        </div>
      </TheorySection>

      {/* 2. SECTION: A MAGASSÁGTÉTEL ÉS A BEFOGÓTÉTEL */}
      <TheorySection
        title="2. A Magasságtétel és a Befogótétel"
        lead="A hasonló háromszögek megfelelő oldalainak arányából közvetlenül megkapjuk a mértani közepeket megadó tételeket."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard title="A Magasságtétel" badge="m = √(p · q)" badgeColor="rose">
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              A derékszögű háromszögben az átfogóhoz tartozó magasság az átfogót két szakaszra (<strong>p</strong> és <strong>q</strong>) osztja, és a magasság hossza ezen két szelet hosszának <strong>mértani közepe</strong>.
            </p>
            <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center font-mono font-bold text-red-900 text-base mb-2">
              m² = p · q &nbsp;&nbsp;⇒&nbsp;&nbsp; m = √(p · q)
            </div>
            <p className="text-xs text-slate-500 italic">
              Levezetés a két kis háromszög hasonlóságából: m / p = q / m  ⇒  m² = p · q.
            </p>
          </TheoryCard>

          <TheoryCard title="A Befogótétel" badge="a = √(p · c)" badgeColor="emerald">
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              A derékszögű háromszög bármelyik befogójának hossza az átfogó (<strong>c</strong>) hosszának és a befogó átfogóra eső merőleges vetületének (<strong>p</strong> vagy <strong>q</strong>) <strong>mértani közepe</strong>.
            </p>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center font-mono font-bold text-emerald-900 text-base mb-2">
              a² = p · c &nbsp;&nbsp;és&nbsp;&nbsp; b² = q · c
            </div>
            <p className="text-xs text-slate-500 italic">
              Levezetés a kis és nagy háromszög hasonlóságából: a / c = p / a  ⇒  a² = p · c.
            </p>
          </TheoryCard>
        </div>

        <TheoryCard title="A Pitagorasz-tétel legelegánsabb bizonyítása" badge="Pitagorasz" badgeColor="sky">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Adjuk össze a két befogótétel egyenletét oldalanként!
              </p>
              <div className="bg-sky-50 p-3 rounded border border-sky-200 font-mono text-sm text-sky-900 mb-2">
                a² + b² = p · c + q · c = (p + q) · c
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Mivel az átfogó két szeletének összege pontosan maga a teljes átfogó (<strong>p + q = c</strong>), azt kapjuk, hogy:
              </p>
              <div className="bg-sky-100 p-2.5 rounded text-center font-mono font-bold text-sky-950 text-base">
                a² + b² = c · c = c²!
              </div>
            </div>
            <div>
              <PythagorasFromLegsSvg />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SECTION: TEREPI SZIKLAMAGASSÁG-MÉRÉS */}
      <TheorySection
        title="3. Terepi mérés: A szikla magasságának meghatározása"
        lead="Gyakorlati szituáció, ahol a hegycsúcs közvetlenül nem mászható meg, de a magasságtétellel pontos becslés adható."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Egy sziklacsúcs magasságát szeretnénk megmérni. A talajon kitűzött <span className="font-semibold">AC₁ = 15 m</span> és <span className="font-semibold">BC₁ = 42 m</span> szakaszok, valamint a derékszögű látóirányok segítségével:
            </p>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 space-y-2 text-sm text-purple-950 font-mono">
              <div>q = 15 m &nbsp;|&nbsp; p = 42 m</div>
              <div>m² = p · q = 42 · 15 = 630</div>
              <div className="text-base font-bold text-purple-900">m = √630 ≈ 25,1 méter!</div>
            </div>
            <p className="text-xs text-slate-500 italic mt-3">
              Ez a módszer az ókori és kora újkori földmérők egyik legkedveltebb szintező és magasságmérő eljárása volt.
            </p>
          </div>
          <div>
            <CliffMeasurementSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. SECTION: SZÁMTANI ÉS MÉRTANI KÖZÉP EGYENLŐTLENSÉGE */}
      <TheorySection
        title="4. Számtani és mértani közép összehasonlítása geometriai úton"
        lead="Tétel: Két nemnegatív valós szám mértani közepe legfeljebb akkora, mint a számtani közepe."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-slate-700 leading-relaxed mb-3">
              Rajzoljunk egy Thálész-félkört, melynek átmérője az <span className="font-semibold">AB = p + q</span> szakasz.
            </p>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-2 mb-4">
              <li>A kör sugara a fél átmérő: <strong>r = (p + q) / 2</strong> (ez a számtani közép!).</li>
              <li>A magasságtétel szerint a körív bármely C pontjához húzott magasság: <strong>m = √(p · q)</strong> (ez a mértani közép!).</li>
              <li>Mivel a körben bármely függőleges szakasz legfeljebb a kör sugara lehet (<strong>m ≤ r</strong>), közvetlenül adódik:</li>
            </ul>
            <div className="bg-amber-100 p-3 rounded-xl border border-amber-300 text-center font-mono font-bold text-amber-950 text-base mb-2">
              √(p · q) ≤ (p + q) / 2
            </div>
            <p className="text-xs text-slate-600">
              <strong>Egyenlőség esete:</strong> Pontos egyenlőség (m = r) akkor és csak akkor áll fenn, ha a talppont a kör középpontjában van, vagyis <strong>p = q</strong> (egyenlő szárú derékszögű háromszög).
            </p>
          </div>
          <div>
            <ArithmeticGeometricInequalitySvg />
          </div>
        </div>
      </TheorySection>

      {/* 5. SECTION: INTERAKTÍV LABORATÓRIUM I */}
      <TheorySection
        title="5. Interaktív Laboratórium I: Metrikus Tételek és AM-GM Szimulátor"
        lead="Változtasd az átfogószeletek (p és q) hosszát, és figyeld meg a magasságot, befogókat és a számtani-mértani egyenlőtlenséget!"
      >
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                p szelet hossza (a vetülete): {segP} cm
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={segP}
                onChange={(e) => setSegP(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                q szelet hossza (b vetülete): {segQ} cm
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={segQ}
                onChange={(e) => setSegQ(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
            <div className="bg-teal-50 border border-teal-200 p-3 rounded-lg">
              <div className="text-xs text-teal-700 font-semibold">Átfogó (c = p + q)</div>
              <div className="text-xl font-black text-teal-900">{segC} cm</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg">
              <div className="text-xs text-rose-700 font-semibold">Magasság m = √(pq)</div>
              <div className="text-xl font-black text-rose-900">{heightM} cm</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
              <div className="text-xs text-emerald-700 font-semibold">'a' befogó = √(pc)</div>
              <div className="text-xl font-black text-emerald-900">{legA} cm</div>
            </div>
            <div className="bg-sky-50 border border-sky-200 p-3 rounded-lg">
              <div className="text-xs text-sky-700 font-semibold">'b' befogó = √(qc)</div>
              <div className="text-xl font-black text-sky-900">{legB} cm</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              Számtani és Mértani Közép összevetése
            </div>
            <div className="text-lg font-bold text-slate-800 mb-1">
              Mértani közép (m): <span className="text-rose-700">{heightM} cm</span> &nbsp;≤&nbsp; Számtani közép (r): <span className="text-amber-800">{radiusR} cm</span>
            </div>
            <div className="text-xs text-slate-600">
              {segP === segQ ? (
                <span className="text-emerald-700 font-bold">✨ p = q: Pontos egyenlőség áll fenn (egyenlő szárú derékszögű háromszög)!</span>
              ) : (
                <span>A magasság szigorúan kisebb a sugárnál ({heightM} &lt; {radiusR}). Terület: T = {areaT} cm².</span>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SECTION: INTERAKTÍV LABORATÓRIUM II */}
      <TheorySection
        title="6. Interaktív Laboratórium II: Mintafeladatok Lépésről Lépésre"
        lead="Tekintsd át a részletes feladatokat és levezetéseiket!"
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
                    ? 'bg-teal-700 text-white shadow'
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
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-teal-100 text-teal-800">
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
                    line.startsWith('•') || line.startsWith('  -') || line.startsWith('  m') || line.startsWith('  a')
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
export default AltitudeLegTheoremsTheory;

