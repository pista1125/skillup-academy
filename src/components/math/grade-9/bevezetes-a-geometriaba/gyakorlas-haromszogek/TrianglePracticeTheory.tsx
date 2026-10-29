// Updated TrianglePracticeTheory
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
  Layers,
  Scale,
  Compass,
  Circle,
  HelpCircle,
  Calculator
} from 'lucide-react';
import {
  TriangleAnglesAndSidesSVG,
  PythagorasHeightSVG,
  MediansCalculationSVG,
  CircumIncircleSVG
} from './TrianglePracticeFigures';

interface TrianglePracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TrianglePracticeTheory: React.FC<TrianglePracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HÁROMSZÖG MEGOLDÓ ÉS SZÁMÍTÓ LABOR ÁLLAPOTOK ---
  const [calcMode, setCalcMode] = useState<'right' | 'isosceles' | 'equilateral'>('right');
  const [paramA, setParamA] = useState<number>(6); // pl. a befogó vagy alap
  const [paramB, setParamB] = useState<number>(8); // pl. b befogó vagy szár

  // Élő geometriai számítások
  const results = useMemo(() => {
    if (calcMode === 'right') {
      const a = paramA;
      const b = paramB;
      const c = Math.sqrt(a * a + b * b);
      const K = a + b + c;
      const T = (a * b) / 2;
      const m_c = (a * b) / c;
      const R = c / 2;
      const r = (a + b - c) / 2;
      const alphaDeg = (Math.asin(a / c) * 180) / Math.PI;
      const betaDeg = 90 - alphaDeg;

      return {
        a: a.toFixed(1),
        b: b.toFixed(1),
        c: c.toFixed(2),
        K: K.toFixed(2),
        T: T.toFixed(2),
        m: m_c.toFixed(2),
        R: R.toFixed(2),
        r: r.toFixed(2),
        alpha: alphaDeg.toFixed(1),
        beta: betaDeg.toFixed(1),
        gamma: '90.0'
      };
    } else if (calcMode === 'isosceles') {
      const a = paramA; // alap
      const b = Math.max(paramB, a / 2 + 0.5); // szárnak nagyobbnak kell lennie a félalapnál!
      const halfA = a / 2;
      const m = Math.sqrt(b * b - halfA * halfA);
      const K = a + 2 * b;
      const T = (a * m) / 2;
      const s = K / 2;
      const r = T / s;
      const R = (b * b * a) / (4 * T);
      const alphaDeg = (Math.acos(halfA / b) * 180) / Math.PI;
      const gammaDeg = 180 - 2 * alphaDeg;

      return {
        a: a.toFixed(1),
        b: b.toFixed(1),
        c: b.toFixed(1),
        K: K.toFixed(2),
        T: T.toFixed(2),
        m: m.toFixed(2),
        R: R.toFixed(2),
        r: r.toFixed(2),
        alpha: alphaDeg.toFixed(1),
        beta: alphaDeg.toFixed(1),
        gamma: gammaDeg.toFixed(1)
      };
    } else {
      // equilateral (szabályos)
      const a = paramA;
      const m = (a * Math.sqrt(3)) / 2;
      const K = 3 * a;
      const T = (a * a * Math.sqrt(3)) / 4;
      const R = (a * Math.sqrt(3)) / 3;
      const r = (a * Math.sqrt(3)) / 6;

      return {
        a: a.toFixed(1),
        b: a.toFixed(1),
        c: a.toFixed(1),
        K: K.toFixed(2),
        T: T.toFixed(2),
        m: m.toFixed(2),
        R: R.toFixed(2),
        r: r.toFixed(2),
        alpha: '60.0',
        beta: '60.0',
        gamma: '60.0'
      };
    }
  }, [calcMode, paramA, paramB]);

  return (
    <TheoryTemplate
      title="9. Gyakorlás (Háromszögek)"
      subtitle="Összefoglaló és feladatmegoldási stratégiák: szögek, Pitagorasz-tétel, súlypont-arányok és a nevezetes pontok számításai"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-gyakorlas"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A legfontosabb képletek és összefüggések egy helyen",
        formula: "\\alpha + \\beta + \\gamma = 180^\\circ \\quad | \\quad a^2 + b^2 = c^2 \\quad | \\quad |AS| : |SF| = 2 : 1",
        rules: [
          "Szögek összefüggései: Belső szögek összege mindig 180°. Bármely külső szög egyenlő a nem mellette fekvő két belső szög összegével (α' = β + γ).",
          "Háromszög-egyenlőtlenség: Bármely két oldal összege szigorúan nagyobb a harmadik oldalnál (a + b > c, a + c > b, b + c > a).",
          "Egyenlő szárú háromszög: Az alaphoz tartozó magasságvonal felezi az alapot és a szárszöget. Pitagorasz-tétellel: m_a² + (a/2)² = b².",
          "Nevezetes pontok arányai: A súlypont 2 : 1 arányban harmadol a csúcs felől (|AS| = 2/3 · s). Derékszögű háromszögben R = c/2 és r = (a+b-c)/2."
        ]
      }}
    >
      {/* 1. FEJEZET: Szögek és a háromszög-egyenlőtlenség */}
      <TheorySection
        title="1. Szögek, külső szögek és a szerkeszthetőség feltétele"
        badge="1. Alapismeretek"
        color="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A háromszögekkel kapcsolatos feladatok legelső lépése mindig a szögek és oldalak
              alapösszefüggéseinek tisztázása.
            </p>

            <TheoryCard title="Szögtételek a síkbeli háromszögben" color="amber">
              <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <li>• <strong>Belső szögek összege:</strong> $\alpha + \beta + \gamma = 180^\circ$.</li>
                <li>• <strong>Külső szög tétele:</strong> Egy csúcshoz tartozó külső szög nagysága egyenlő a másik két csúcsnál lévő belső szög összegével: $\beta' = \alpha + \gamma$.</li>
                <li>• <strong>Belső és külső szög összege:</strong> Egy csúcsnál a belső és külső szög egymás kiegészítő szögei: $\alpha + \alpha' = 180^\circ$.</li>
                <li>• <strong>Külső szögek összege:</strong> A háromszög három külső szögének összege: $\alpha' + \beta' + \gamma' = 360^\circ$.</li>
              </ul>
            </TheoryCard>

            <TheoryCallout type="warning" title="A háromszög-egyenlőtlenség (Szerkeszthetőség)">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Három szakaszból akkor és csak akkor szerkeszthető háromszög, ha a két rövidebb szakasz összege
                <strong> szigorúan nagyobb</strong> a leghosszabb szakasz hosszánál: $a + b &gt; c$.
                (Például 3 cm, 4 cm és 8 cm oldalakból <em>nem</em> alkotható háromszög, mert $3 + 4 = 7 &lt; 8$!)
              </p>
            </TheoryCallout>
          </div>

          <div className="flex justify-center">
            <TriangleAnglesAndSidesSVG />
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Pitagorasz-tétel alkalmazása egyenlő szárú és szabályos háromszögekben */}
      <TheorySection
        title="2. Pitagorasz-tétel egyenlő szárú és szabályos háromszögben"
        badge="2. Számítási alapok"
        color="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <PythagorasHeightSVG />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Egyenlő szárú és szabályos háromszögekben a szimmetriatengely behúzásával
              derékszögű háromszögek keletkeznek, melyekre közvetlenül alkalmazható a <strong>Pitagorasz-tétel</strong>.
            </p>

            <TheoryCard title="Egyenlő szárú háromszög magassága és szárai" color="emerald">
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Az alaphoz tartozó magasságvonal ($m_a$) a szimmetria miatt pontosan felezi az alapot ($a/2$).
                  Így a félszár-háromszögben:
                </p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-700 font-mono text-center font-bold text-xs text-emerald-900 dark:text-emerald-200">
                  m_a² + (a / 2)² = b²  →  m_a = √(b² - (a / 2)²)
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Szabályos háromszög alapképletei (a oldal ismeretében)" color="teal">
              <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <p>• <strong>Magasság:</strong> m = (a · √3) / 2</p>
                <p>• <strong>Terület:</strong> T = (a² · √3) / 4</p>
                <p>• <strong>Körülírt kör sugara:</strong> R = 2/3 · m = (a · √3) / 3</p>
                <p>• <strong>Beírt kör sugara:</strong> r = 1/3 · m = (a · √3) / 6 (így R = 2r!)</p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: Súlypont és Nevezetes Vonalak Gyakorlati Számításai */}
      <TheorySection
        title="3. Számítások a súlyponttal és a nevezetes sugarakkal"
        badge="3. Arányok & Sugarak"
        color="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A geometriai feladatsorokban gyakran szerepel a súlypont $2 : 1$ arányú szakaszosztása,
              valamint a derékszögű háromszög köré és beírt köreinek sugara.
            </p>

            <TheoryCard title="A súlypont 2 : 1 arányú számítási mintája" color="blue">
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>A súlypont a súlyvonalat <strong>3 egyenlő egységre</strong> osztja:</p>
                <p>• Csúcs felőli szakasz: $|AS| = (2/3) \cdot s_a$ (2 egység)</p>
                <p>• Oldal felőli szakasz: $|SF_a| = (1/3) \cdot s_a$ (1 egység)</p>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-semibold mt-1">
                  Példa: Ha a teljes súlyvonal $s = 21$ cm, akkor $|AS| = (2/3) \cdot 21 = 14$ cm, az oldalfelezőhöz tartozó rész pedig $|SF| = 7$ cm.
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Derékszögű háromszög nevezetes sugarai" color="purple">
              <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <p>• <strong>Körülírt kör sugara:</strong> $R = c/2$ (a derékszögű háromszög átfogójának fele)</p>
                <p>• <strong>Beírt kör sugara:</strong> $r = (a + b - c)/2$ (ahol $a, b$ a befogók, $c$ az átfogó)</p>
                <p>• <strong>Középvonalak:</strong> $k_c = c/2 = R$, $k_a = a/2$, $k_b = b/2$</p>
              </div>
            </TheoryCard>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <MediansCalculationSVG size={310} />
            <CircumIncircleSVG size={310} />
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: Rendszerező lépések és feladatmegoldási stratégiák */}
      <TheorySection
        title="4. Tipikus feladatmegoldási stratégiák lépésről lépésre"
        badge="4. Módszertan"
        color="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
              1.
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Készíts vázlatrajzot!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mindig rajzolj egy tetszőleges háromszöget, tüntesd fel a megadott oldalakat és szögeket!
              Jelöld be a derékszögeket és az egyenlő szakaszokat!
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
              2.
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Keress derékszögű háromszöget!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha nem derékszögű a háromszög, húzz be egy magasságvonalat! Egyenlő szárú háromszögben
              az alap felezőpontjába húzott magasság azonnal két azonos derékszögű háromszöget ad.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
              3.
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Használd a nevezetes arányokat!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Súlypont esetén azonnal gondolj a $2 : 1$ arányra ($2/3$ és $1/3$ részek). Középvonalaknál
              a párhuzamos oldal felére ($k = a/2$), Euler-egyenesnél pedig az $|MS| = 2 \cdot |SO|$ arányra.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Interaktív Háromszög Megoldó & Számítás Labor */}
      <TheorySection
        title="5. Interaktív Háromszög Kalkulátor & Szimulációs Labor"
        badge="Gyakorlati laboratórium"
        color="amber"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                Interaktív Háromszög Megoldó Labor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Állítsd be a háromszög típusát és paramétereit, az algoritmus élőben kiszámítja a szögeket, sugarakat és magasságokat!
              </p>
            </div>

            {/* Módválasztó gombok */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setCalcMode('right'); setParamA(6); setParamB(8); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  calcMode === 'right'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Derékszögű
              </button>
              <button
                onClick={() => { setCalcMode('isosceles'); setParamA(8); setParamB(7); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  calcMode === 'isosceles'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Egyenlő szárú
              </button>
              <button
                onClick={() => { setCalcMode('equilateral'); setParamA(6); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  calcMode === 'equilateral'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Szabályos (60°)
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>{calcMode === 'right' ? 'a befogó:' : calcMode === 'isosceles' ? 'Alap (a):' : 'Oldalhossz (a):'}</span>
                <span className="font-mono text-amber-700 dark:text-amber-300">{paramA} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            {calcMode !== 'equilateral' && (
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{calcMode === 'right' ? 'b befogó:' : 'Szár (b = c):'}</span>
                  <span className="font-mono text-amber-700 dark:text-amber-300">{paramB} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={paramB}
                  onChange={(e) => setParamB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
            )}
          </div>

          {/* Eredménykártyák élő adatokkal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-amber-50/70 dark:bg-slate-800/80 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block mb-0.5">Kerület (K)</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">{results.K} cm</strong>
            </div>

            <div className="p-3 bg-emerald-50/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">Terület (T)</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">{results.T} cm²</strong>
            </div>

            <div className="p-3 bg-blue-50/70 dark:bg-slate-800/80 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 block mb-0.5">Magasság (m)</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">{results.m} cm</strong>
            </div>

            <div className="p-3 bg-purple-50/70 dark:bg-slate-800/80 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 block mb-0.5">Körülírt R</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">{results.R} cm</strong>
            </div>

            <div className="p-3 bg-pink-50/70 dark:bg-slate-800/80 rounded-xl border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-[10px] uppercase font-bold text-pink-800 dark:text-pink-300 block mb-0.5">Beírt r</span>
              <strong className="text-sm font-mono text-slate-900 dark:text-white">{results.r} cm</strong>
            </div>

            <div className="p-3 bg-teal-50/70 dark:bg-slate-800/80 rounded-xl border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-[10px] uppercase font-bold text-teal-800 dark:text-teal-300 block mb-0.5">Szögek</span>
              <strong className="text-xs font-mono text-slate-900 dark:text-white">
                {results.alpha}° / {results.beta}°
              </strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* CSAPDÁK ÉS TIPUSHIBAK */}
      <TheoryTrapBox
        traps={[
          {
            title: "A háromszög-egyenlőtlenség figyelmen kívül hagyása",
            description: "Nem lehet tetszőleges 3 számból háromszöget építeni! Ha a + b ≤ c, a három szakasz nem találkozik vagy egymásra lapul (pl. 2, 3, 5 összeg 5, ami egy egyenes szakaszt ad, nem háromszöget).",
            severity: "critical"
          },
          {
            title: "A magasság talppontja mindig felezi az oldalt?",
            description: "NEM! A magasság talppontja CSAK egyenlő szárú háromszög alapjánál és szabályos háromszögben esik pontosan az oldal felezőpontjába! Általános háromszögben a magasság talppontja és az oldalfelező pont két teljesen különböző pont.",
            severity: "warning"
          },
          {
            title: "A külső szög összekeverése a belső szöggel",
            description: "A külső szög NEM a mellette fekvő szög kiegészítése a 360 fokra, hanem a 180 fokra való kiegészítése (egyenes szög mellékszöge): α' = 180° - α. A három külső szög összege pedig 360°.",
            severity: "warning"
          },
          {
            title: "Súlypont számítási arányok felcserélése",
            description: "A súlypont a csúcs felől nézve 2/3 részt, az oldalfelező felől nézve 1/3 részt jelent. Ha a súlypont és az oldal távolsága 4 cm, a teljes súlyvonal 12 cm (és nem 8 cm vagy 6 cm).",
            severity: "info"
          }
        ]}
      />

      {/* ÖSSZEFOGLALÓ KÉPLETTÁR TÁBLÁZAT */}
      <TheoryTable
        title="Háromszögek rendszerező képlettára (9. osztályos szint)"
        headers={["Háromszög fajtája", "Szögek tulajdonsága", "Magasság / Pitagorasz", "Körülírt kör sugara (R)", "Beírt kör sugara (r)"]}
        rows={[
          [
            "Általános háromszög",
            "α + β + γ = 180°, α' = β + γ",
            "T = (a · m_a) / 2",
            "R = (a · b · c) / (4T)",
            "r = T / s  (s = K / 2)"
          ],
          [
            "Derékszögű háromszög",
            "γ = 90°, α + β = 90°",
            "a² + b² = c²  (Pitagorasz)",
            "R = c / 2  (átfogó fele)",
            "r = (a + b - c) / 2"
          ],
          [
            "Egyenlő szárú háromszög",
            "α = β (alapon fekvők egyenlők)",
            "m_a² + (a/2)² = b²",
            "R = (b² · a) / (4T)",
            "r = T / s"
          ],
          [
            "Szabályos háromszög",
            "α = β = γ = 60°",
            "m = (a√3) / 2,  T = (a²√3) / 4",
            "R = (a√3) / 3  (R = 2/3 m)",
            "r = (a√3) / 6  (r = 1/3 m, R = 2r)"
          ]
        ]}
      />
    </TheoryTemplate>
  );
};

