import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Triangle,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileCode,
  Layers,
  Scale,
  Compass,
  Square
} from 'lucide-react';
import {
  HalfEquilateralSvg,
  IsoscelesRightSvg,
  SpecialTrianglesComparisonSvg
} from './SpecialTrianglesFigures';

interface SpecialTrianglesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SpecialTrianglesTheory: React.FC<SpecialTrianglesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV KÜLÖNLEGES HÁROMSZÖG LABOR ÁLLAPOTOK ---
  const [triangleType, setTriangleType] = useState<'30-60-90' | '45-45-90'>('30-60-90');
  const [baseA, setBaseA] = useState<number>(4);

  // Számítások
  const calculatedData = useMemo(() => {
    if (triangleType === '30-60-90') {
      const a = baseA;
      const bExact = `${baseA}√3`;
      const bNum = baseA * Math.sqrt(3);
      const c = 2 * baseA;
      const perimeter = a + bNum + c;
      const areaExact = `${(baseA * baseA) / 2}√3`;
      const areaNum = (a * bNum) / 2;

      return {
        a,
        bText: bExact,
        bVal: Number(bNum.toFixed(2)),
        c,
        perimeter: Number(perimeter.toFixed(2)),
        areaText: areaExact,
        areaVal: Number(areaNum.toFixed(2)),
        ratio: '1 : √3 : 2'
      };
    } else {
      const a = baseA;
      const b = baseA;
      const cExact = `${baseA}√2`;
      const cNum = baseA * Math.sqrt(2);
      const perimeter = 2 * a + cNum;
      const areaVal = (a * a) / 2;

      return {
        a,
        bText: `${a}`,
        bVal: a,
        cExact,
        cVal: Number(cNum.toFixed(2)),
        perimeter: Number(perimeter.toFixed(2)),
        areaVal,
        ratio: '1 : 1 : √2'
      };
    }
  }, [triangleType, baseA]);

  return (
    <TheoryTemplate
      title="4. Különleges derékszögű háromszögek"
      subtitle="A 30°-60°-90°-os félszabályos és a 45°-45°-90°-os egyenlő szárú derékszögű háromszög oldalarányai és alkalmazásaik"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-kulonleges-derekszogu"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • TANANYAG"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "FŐ SZABÁLYOK: A KÉT KÜLÖNLEGES HÁROMSZÖG",
        description: "Ezekben a háromszögekben az oldalak aránya fix, trigonometria nélkül is pontosan számolható:",
        formula: "30°-60°-90°: 1 : √3 : 2  |  45°-45°-90°: 1 : 1 : √2",
        details: (
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-black">Félszabályos (30°-60°-90°):</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">átfogó = 2a (dupla), hosszabbik befogó = a√3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Egyenlő szárú derékszögű (45°-45°-90°):</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">befogók = a, átfogó = a√2 (négyzet átlója)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Alkalmazás:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">szabályos háromszög magassága ((a√3)/2) és négyzet átlója (a√2) azonnal adódik</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: A FÉLSZABÁLYOS HÁROMSZÖG (30°-60°-90°)
      ========================================================================= */}
      <TheorySection
        title="1. A félszabályos (30° - 60° - 90°) háromszög származtatása és oldalarányai"
        icon={<Triangle className="w-6 h-6 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A <strong>$30^\circ - 60^\circ - 90^\circ$-os háromszög</strong> a szabályos (egyenlő oldalú) háromszög egyik magasságvonalával történő kettévágásából származik. Emiatt <em>félszabályos háromszögnek</em> is nevezzük.
            </p>
            <TheoryCallout
              title="A félszabályos háromszög oldalarányai"
              type="tip"
            >
              Ha a $30^\circ$-os szöggel szemközti rövidebb befogó hossza $a$:
              <div className="font-mono text-center text-sm font-bold text-amber-800 dark:text-amber-300 py-1 space-y-0.5">
                <div>Átfogó: $c = 2a$ (kétszerese a rövidebb befogónak)</div>
                <div>Hosszabbik befogó: $b = a\sqrt{3}$</div>
                <div className="text-indigo-600 dark:text-indigo-400 text-xs mt-1">Oldalarány: $1 : \sqrt{3} : 2$</div>
              </div>
            </TheoryCallout>
            <ul className="space-y-2 text-xs">
              <li className="p-2 bg-amber-50 rounded border border-amber-200">
                <strong className="text-amber-900 block text-sm">Bizonyítás Pitagorasz-tétellel:</strong>
                A szabályos háromszög oldala $2a$, magassága felezi az alapot, így az egyik befogó $a$, az átfogó $2a$.
                <div className="font-mono mt-1 text-center font-bold text-amber-800">
                  b = √((2a)² - a²) = √(4a² - a²) = √(3a²) = a√3
                </div>
              </li>
              <li className="p-2 bg-blue-50 rounded border border-blue-200">
                <strong className="text-blue-900 block text-sm">Alapszabály:</strong>
                A derékszögű háromszögben a $30^\circ$-os szöggel szemközti befogó mindig fele az átfogónak!
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <HalfEquilateralSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: AZ EGYENLŐ SZÁRÚ DERÉKSZÖGŰ HÁROMSZÖG (45°-45°-90°)
      ========================================================================= */}
      <TheorySection
        title="2. Az egyenlő szárú derékszögű (45° - 45° - 90°) háromszög"
        icon={<Square className="w-6 h-6 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A <strong>$45^\circ - 45^\circ - 90^\circ$-os háromszög</strong> egy négyzet átló menti kettévágásával keletkezik. Mivel két szöge egyenlő ($45^\circ$), ezért egyenlő szárú háromszög.
            </p>
            <TheoryCallout
              title="A 45°-45°-90°-os háromszög összefüggései"
              type="info"
            >
              Ha a két egyenlő befogó hossza $a$:
              <div className="font-mono text-center text-sm font-bold text-indigo-800 dark:text-indigo-300 py-1 space-y-0.5">
                <div>Két befogó: $a = b$</div>
                <div>Átfogó (négyzet átlója): $c = a\sqrt{2}$</div>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs mt-1">Oldalarány: $1 : 1 : \sqrt{2}$</div>
              </div>
            </TheoryCallout>
            <ul className="space-y-2 text-xs">
              <li className="p-2 bg-indigo-50 rounded border border-indigo-200">
                <strong className="text-indigo-900 block text-sm">Bizonyítás Pitagorasz-tétellel:</strong>
                <div className="font-mono mt-1 text-center font-bold text-indigo-800">
                  c = √(a² + a²) = √(2a²) = a√2
                </div>
              </li>
              <li className="p-2 bg-emerald-50 rounded border border-emerald-200">
                <strong className="text-emerald-900 block text-sm">Befogó visszaszámolása az átfogóból:</strong>
                Ha az átfogó c adott, a befogók: a = c / √2 = (c√2) / 2.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <IsoscelesRightSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: GYORS SZÁMÍTÁSOK ÉS GYÖKTELENÍTÉS
      ========================================================================= */}
      <TheorySection
        title="3. Gyors számítási technikák trigonometria nélkül"
        icon={<Compass className="w-6 h-6 text-emerald-600" />}
      >
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Ezeknél a háromszögeknél nincs szükség szögfüggvényekre ($\sin, \cos, \tan$): az oldalak arányából közvetlenül, fejben kiszámítható bármelyik hiányzó oldal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                30°-60°-90° Lépései
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>Ha a rövid befogó ($a$) adott:</strong> szorozd 2-vel az átfogóhoz ($2a$), és $\sqrt{3}$-mal a hosszabbikhoz ($a\sqrt{3}$).</li>
                <li>• <strong>Ha az átfogó ($c$) adott:</strong> felezd el a rövid befogóhoz ($a = c/2$), majd szorozd $\sqrt{3}$-mal.</li>
                <li>• <strong>Ha a hosszabbik ($b$) adott:</strong> oszd el $\sqrt{3}$-mal a rövid befogóhoz ($a = b/\sqrt{3} = (b\sqrt{3})/3$).</li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 space-y-2">
              <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                45°-45°-90° Lépései
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>Ha a befogó ($a$) adott:</strong> szorozd $\sqrt{2}$-vel az átfogóhoz ($c = a\sqrt{2}$).</li>
                <li>• <strong>Ha az átfogó ($c$) adott:</strong> oszd el $\sqrt{2}$-vel a befogókhoz ($a = c/\sqrt{2} = (c\sqrt{2})/2$).</li>
                <li>• <strong>Példa:</strong> Ha az átfogó c = 10 cm, akkor a befogó a = 10 / √2 = 5√2 cm ≈ 7,07 cm.</li>
              </ul>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: ALKALMAZÁSOK SÍKBAN ÉS TÉRBEN
      ========================================================================= */}
      <TheorySection
        title="4. Geometriai alkalmazások sokszögekben és testekben"
        icon={<Layers className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block text-sm">Szabályos hatszög felbontása:</strong>
                A szabályos hatszög 6 egybevágó szabályos háromszögre bomlik. A csúcsait összekötő átlók félszabályos (30°-60°-90°) háromszögeket hoznak létre. A szemközti oldalak távolsága a magasság duplája: 2 · (a√3) / 2 = a√3.
              </li>
              <li className="p-2.5 bg-purple-50 rounded-lg border border-purple-200">
                <strong className="text-purple-900 block text-sm">Kocka lapátlója és testátlója:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Lapátló:</strong> négyzet átlója → d = a√2 (45°-45°-90° háromszög).</li>
                  <li><strong>Testátló:</strong> az alaplap átlója (a√2) és a magasság (a) derékszögű háromszöget alkot → D = √((a√2)² + a²) = a√3.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <SpecialTrianglesComparisonSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV KÜLÖNLEGES HÁROMSZÖG LABOR (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Különleges Háromszög Laboratórium"
        icon={<Sliders className="w-6 h-6 text-amber-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Válassz típust ($30^\circ-60^\circ-90^\circ$ vagy $45^\circ-45^\circ-90^\circ$), és állítsd be az $a$ bázisértéket a csúszkával! Figyeld meg az oldalak pontos gyökös és numerikus értékeit valós időben!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Bal: Beállítások és eredmények */}
            <div className="space-y-5">
              {/* Típusválasztó gombok */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTriangleType('30-60-90')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    triangleType === '30-60-90'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                  }`}
                >
                  30° - 60° - 90° (Félszabályos)
                </button>
                <button
                  type="button"
                  onClick={() => setTriangleType('45-45-90')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    triangleType === '45-45-90'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50'
                  }`}
                >
                  45° - 45° - 90° (Egyenlő szárú)
                </button>
              </div>

              {/* Bázis oldal csúszka */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">Bázis oldal (a) értéke:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{baseA} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Számított adatok kártya */}
              <div className="p-4 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 border-b pb-1 flex justify-between">
                  <span>Számított oldalhosszak:</span>
                  <span className="font-mono text-amber-600 font-black">{calculatedData.ratio}</span>
                </div>

                {triangleType === '30-60-90' ? (
                  <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                    <div>• Rövid befogó ($a$): <strong>{calculatedData.a} cm</strong> (szemben 30°-kal)</div>
                    <div>• Hosszú befogó ($b$): <strong>{calculatedData.bText} cm</strong> ≈ {calculatedData.bVal} cm</div>
                    <div>• Átfogó ($c$): <strong>{calculatedData.c} cm</strong> ($2 \cdot {calculatedData.a}$)</div>
                    <div className="pt-1.5 border-t border-slate-100 text-slate-500">
                      Kerület: {calculatedData.perimeter} cm | Terület: {calculatedData.areaText} cm² ≈ {calculatedData.areaVal} cm²
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                    <div>• Befogók ($a = b$): <strong>{calculatedData.a} cm</strong></div>
                    <div>• Átfogó ($c$): <strong>{calculatedData.cExact} cm</strong> ≈ {calculatedData.cVal} cm</div>
                    <div className="pt-1.5 border-t border-slate-100 text-slate-500">
                      Kerület: {calculatedData.perimeter} cm | Terület: {calculatedData.areaVal} cm²
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Jobb: Dinamikus SVG ábra */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[200px]">
              <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto select-none">
                {triangleType === '30-60-90' ? (
                  <g transform="translate(60, 20)">
                    {/* Félszabályos háromszög */}
                    <polygon points="0,130 70,130 0,10" fill="rgba(245, 158, 11, 0.15)" stroke="#d97706" strokeWidth="2.5" />
                    {/* Derékszög negyedkörív + pont */}
                    <path d="M 0 116 A 14 14 0 0 1 14 130" fill="none" stroke="#b45309" strokeWidth="1.3" />
                    <circle cx="5" cy="125" r="1.3" fill="#b45309" />

                    <text x="35" y="146" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b45309">
                      a = {baseA}
                    </text>
                    <text x="-10" y="75" fontSize="11" fontWeight="bold" textAnchor="end" fill="#b45309">
                      {baseA}√3
                    </text>
                    <text x="45" y="70" fontSize="11" fontWeight="bold" fill="#7c3aed">
                      2a = {2 * baseA}
                    </text>
                    <text x="48" y="124" fontSize="9" fontWeight="bold" fill="#2563eb">60°</text>
                    <text x="4" y="32" fontSize="9" fontWeight="bold" fill="#6d28d9">30°</text>
                  </g>
                ) : (
                  <g transform="translate(50, 25)">
                    {/* Egyenlő szárú derékszögű háromszög */}
                    <polygon points="0,125 110,125 0,15" fill="rgba(99, 102, 241, 0.15)" stroke="#4f46e5" strokeWidth="2.5" />
                    {/* Derékszög negyedkörív + pont */}
                    <path d="M 0 111 A 14 14 0 0 1 14 125" fill="none" stroke="#4338ca" strokeWidth="1.3" />
                    <circle cx="5" cy="120" r="1.3" fill="#4338ca" />

                    <text x="55" y="142" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#4338ca">
                      a = {baseA}
                    </text>
                    <text x="-10" y="75" fontSize="11" fontWeight="bold" textAnchor="end" fill="#4338ca">
                      a = {baseA}
                    </text>
                    <text x="65" y="68" fontSize="11" fontWeight="bold" fill="#7c3aed">
                      {baseA}√2
                    </text>
                    <text x="82" y="120" fontSize="9" fontWeight="bold" fill="#047857">45°</text>
                    <text x="4" y="38" fontSize="9" fontWeight="bold" fill="#047857">45°</text>
                  </g>
                )}
              </svg>
              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Magyar derékszög-jelölés (negyedkörív belső ponttal)
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS BUKTATÓK
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus buktatók a különleges háromszögeknél"
        traps={[
          {
            trap: "A 30°-os szöggel szemközti oldal helytelen azonosítása",
            correction: "Mindig a 30°-os szöggel szemben van a legkisebb oldal (a rövidebb befogó, ami az átfogó fele)! A 60°-kal szemben a nagyobbik befogó (a√3) áll.",
            severity: "critical"
          },
          {
            trap: "A gyökös szorzók (√2 és √3) felcserélése",
            correction: "A 45°-os háromszög a NÉGYZET fele, átfogója a√2. A 30°-60°-os a SZABÁLYOS HÁROMSZÖG fele, magassága a√3, átfogója pedig 2a (egész szám).",
            severity: "critical"
          },
          {
            trap: "Átfogóból befogó visszaszámolásakor szorzás osztás helyett",
            correction: "Ha az átfogó adott egy 45°-45°-90°-os háromszögben (pl. c = 10 cm), a befogóhoz OSZTANI kell √2-vel: a = 10 / √2 = 5√2 cm, nem szorozni!",
            severity: "moderate"
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryTable
        title="A két különleges derékszögű háromszög összehasonlítása"
        headers={['Tulajdonság', '30° - 60° - 90° (Félszabályos)', '45° - 45° - 90° (Egyenlő szárú)']}
        rows={[
          ['Eredeti alakzat', 'Szabályos háromszög fele', 'Négyzet fele'],
          ['Oldalarány', '1 : √3 : 2', '1 : 1 : √2'],
          ['Rövid befogó', 'a (átfogó fele)', 'a'],
          ['Hosszú befogó', 'b = a · √3', 'b = a (egyenlő a másikkal)'],
          ['Átfogó', 'c = 2a', 'c = a · √2'],
          ['Területképlet', 'T = (a² · √3) / 2', 'T = a² / 2'],
          ['Szimmetriatengely', 'Nincs szimmetriatengelye', '1 szimmetriatengely (átfogó magassága)']
        ]}
      />
    </TheoryTemplate>
  );
};

