import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  RootsAndAxisSvg,
  FiveKeyPointsParabolaSvg,
  ParabolaCharacterizationSvg
} from './QuadraticGraphFigures';
import {
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  TrendingDown,
  TrendingUp,
  Target,
  Split,
  Eye
} from 'lucide-react';

interface QuadraticGraphTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const QuadraticGraphTheory: React.FC<QuadraticGraphTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: 5 Nevezetes Pont Szimulátor ---
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-4);
  const [coeffC, setCoeffC] = useState<number>(3);

  // Számítások:
  const uVal = -coeffB / (2 * coeffA);
  const vVal = coeffC - (coeffB * coeffB) / (4 * coeffA);
  const disc = coeffB * coeffB - 4 * coeffA * coeffC;
  const root1 = disc >= 0 ? (-coeffB - Math.sqrt(disc)) / (2 * coeffA) : null;
  const root2 = disc >= 0 ? (-coeffB + Math.sqrt(disc)) / (2 * coeffA) : null;
  const symX = 2 * uVal;

  // Segédfüggvény zérushelyei: g(x) = ax² + bx = x(ax + b)
  const gRoot1 = 0;
  const gRoot2 = -coeffB / coeffA;
  const gVertexY = - (coeffB * coeffB) / (4 * coeffA);

  // --- Interactive Lab 2: Függvényjellemző Preset Választó ---
  const [presetIndex, setPresetIndex] = useState<number>(0);
  const presets = [
    {
      name: 'f(x) = x² - 4x + 3',
      a: 1, b: -4, c: 3,
      u: 2, v: -1,
      roots: 'x₁ = 1, x₂ = 3',
      minMax: 'Minimuma van az x = 2 helyen, értéke: y = -1',
      domain: 'D_f = ℝ',
      range: 'R_f = [-1; ∞[',
      decreasing: ']-\\infty; 2]',
      increasing: '[2; \\infty[',
      positive: ']-\\infty; 1[ \\cup ]3; \\infty[',
      negative: ']1; 3['
    },
    {
      name: 'f(x) = -x² + 2x + 3',
      a: -1, b: 2, c: 3,
      u: 1, v: 4,
      roots: 'x₁ = -1, x₂ = 3',
      minMax: 'Maximuma van az x = 1 helyen, értéke: y = 4',
      domain: 'D_f = ℝ',
      range: 'R_f = ]-\\infty; 4]',
      decreasing: '[1; \\infty[',
      increasing: ']-\\infty; 1]',
      positive: ']-1; 3[',
      negative: ']-\\infty; -1[ \\cup ]3; \\infty['
    },
    {
      name: 'f(x) = 2x² - 8x + 6',
      a: 2, b: -8, c: 6,
      u: 2, v: -2,
      roots: 'x₁ = 1, x₂ = 3',
      minMax: 'Minimuma van az x = 2 helyen, értéke: y = -2',
      domain: 'D_f = ℝ',
      range: 'R_f = [-2; ∞[',
      decreasing: ']-\\infty; 2]',
      increasing: '[2; \\infty[',
      positive: ']-\\infty; 1[ \\cup ]3; \\infty[',
      negative: ']1; 3['
    },
    {
      name: 'f(x) = x² + 2x + 2',
      a: 1, b: 2, c: 2,
      u: -1, v: 1,
      roots: 'Nincs valós zérushely (lebeg az x-tengely felett)',
      minMax: 'Minimuma van az x = -1 helyen, értéke: y = 1',
      domain: 'D_f = ℝ',
      range: 'R_f = [1; ∞[',
      decreasing: ']-\\infty; -1]',
      increasing: '[-1; \\infty[',
      positive: 'ℝ (minden valós számra pozitív)',
      negative: '∅ (sehol sem negatív)'
    }
  ];

  const currentPreset = presets[presetIndex];

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Másodfokú függvények grafikonja"
      subtitle="A parabola precíz ábrázolása 5 kulcsponttal, szorzattá alakítás, szimmetriatengely a zérushelyek felezőjében és teljes körű függvényjellemzés."
      themeColor="rose"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">1. Segédfüggvény:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>g(x) = ax² + bx = x(ax + b)</MathText> &nbsp;|&nbsp; Zérushelyek: <MathText>x₁ = 0</MathText>, <MathText>{"x₂ = -b/a"}</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">2. Szimmetriatengely:</span>
              <span className="text-slate-800 dark:text-slate-100">
                A zérushelyek számtani közepe: <MathText>{"u = (x₁ + x₂) / 2 = -b / (2a)"}</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">3. Csúcspont & Eltolás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>V(u; f(u))</MathText> &nbsp;|&nbsp; Az <MathText>f(x) = g(x) + c</MathText> a <MathText>g(x)</MathText> grafikonjának függőleges eltolása <MathText>c</MathText>-vel!
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">4. Az 5 kulcspont:</span>
              <span className="text-slate-800 dark:text-slate-100">
                Csúcs <MathText>V(u; v)</MathText>, <MathText>y</MathText>-metszet <MathText>(0; c)</MathText>, tükörkép <MathText>(2u; c)</MathText>, és a zérushelyek <MathText>(x_1; 0)</MathText>, <MathText>(x_2; 0)</MathText>
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A SEGÉDFÜGGVÉNY MÓDSZERE */}
      <TheorySection
        number={1}
        title="A segédfüggvény módszere: g(x) = ax² + bx és eltolás c-vel"
        icon={<Layers className="w-5 h-5 text-rose-500" />}
        badge="KÖZPONTI MÓDSZER"
        badgeColor="rose"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A tankönyv egyik leghatékonyabb, legszemléletesebb eljárása a másodfokú függvény ábrázolására
          a <strong>konstans tag nélküli segédfüggvény</strong> vizsgálata.
          Amikor az <MathText>f(x) = ax^2 + bx + c</MathText> függvényből elhagyjuk a <MathText>c</MathText> konstans tagot,
          a kapott <MathText>g(x) = ax^2 + bx</MathText> függvényt rendkívül egyszerű megrajzolni!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="Miért egyszerű a g(x) = ax² + bx ábrázolása?"
            icon={<Sparkles className="w-4 h-4 text-rose-500" />}
            badge="1. LÉPÉS"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mivel nincs konstans tag, az <MathText>x</MathText> kiemelhető szorzótényezőként:
            </p>
            <div className="p-2.5 my-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-center font-bold text-rose-800 dark:text-rose-200 text-xs">
              <MathText>ax² + bx = x \cdot (ax + b) = 0</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Egy szorzat pontosan akkor nulla, ha legalább az egyik tényezője nulla:
            </p>
            <ul className="text-xs list-disc list-inside mt-1 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Első zérushely mindig az origó: <MathText>x₁ = 0</MathText></li>
              <li>Második zérushely: <MathText>{"ax + b = 0 ⟹ x₂ = -b/a"}</MathText></li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Áttérés az eredeti f(x) függvényre"
            icon={<ArrowRight className="w-4 h-4 text-indigo-500" />}
            badge="2. LÉPÉS"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mivel <MathText>f(x) = g(x) + c</MathText>, az <MathText>f</MathText> függvény grafikonja
              pontosan megegyezik a <MathText>g</MathText> grafikonjával, csupán
              az <MathText>y</MathText>-tengely mentén <strong>függőlegesen el van tolva <MathText>c</MathText> egységgel</strong>.
            </p>
            <div className="p-2.5 my-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-center font-bold text-indigo-800 dark:text-indigo-200 text-xs">
              <MathText>{"f(x) = g(x) + c ⟹ Pontok: (x; g(x)) → (x; g(x) + c)"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Elég a <MathText>g</MathText> parabola 3 fő pontját (a két zérushelyet és a csúcspontot) eltolni <MathText>c</MathText>-vel!
            </p>
          </TheoryCard>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <RootsAndAxisSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            <strong>Szemléltetés:</strong> A szürke szaggatott vonal a <MathText>g(x) = x^2 - 4x</MathText> segédfüggvény (zérushelyei 0 és 4).
            Függőlegesen <MathText>+3</MathText>-mal eltolva megkapjuk a piros <MathText>f(x) = x^2 - 4x + 3</MathText> parabolát.
          </p>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A SZIMMETRIATENGELY ÉS A CSÚCSPONT */}
      <TheorySection
        number={2}
        title="A szimmetriatengely és a csúcspont: A felezőpont elve"
        icon={<Compass className="w-5 h-5 text-indigo-500" />}
        badge="GEOMETRIA"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A parabola tengelyesen szimmetrikus alakzat.
          Ha ismerünk a parabolán két azonos magasságban lévő pontot — például a <MathText>g(x)</MathText> két zérushelyét —,
          akkor a szimmetriatengely <strong>pontosan a két pont között félúton</strong>, a számtani közepüknél helyezkedik el!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">Szimmetriatengely</span>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 my-1">
              <MathText>{"u = (0 + (-b/a)) / 2 = -b / (2a)"}</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A tengely egyenlete egy függőleges egyenes: <MathText>x = u</MathText>.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Csúcspont helye és magassága</span>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 my-1">
              <MathText>V(u; f(u))</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A csúcs <MathText>y</MathText>-koordinátáját úgy kapjuk meg, hogy behelyettesítjük <MathText>u</MathText>-t az eredeti függvénybe: <MathText>v = f(u)</MathText>.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Szélsőérték jellege</span>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 my-1">
              <MathText>a &gt; 0 \implies \min, \quad a &lt; 0 \implies \max</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Ha <MathText>a &gt; 0</MathText>, a parabola felfelé nyílik (minimum); ha <MathText>a &lt; 0</MathText>, lefelé nyílik (maximum).
            </p>
          </div>
        </div>

        <TheoryCallout
          title="Mi a teendő, ha a segédfüggvény b együtthatója nulla?"
          icon={<Lightbulb className="w-4 h-4 text-amber-500" />}
        >
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Ha <MathText>b = 0</MathText> (például <MathText>f(x) = 2x^2 - 8</MathText>),
            akkor a szimmetriatengely maga az <MathText>y</MathText>-tengely (<MathText>x = 0</MathText>),
            a csúcspont pedig azonnal az <MathText>y</MathText>-tengelyre esik: <MathText>V(0; c)</MathText>.
            Ilyenkor a függvény ráadásul <strong>páros</strong> (<MathText>f(-x) = f(x)</MathText>).
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: A PARABOLA 5 NEVEZETES PONTJA */}
      <TheorySection
        number={3}
        title="A másodfokú függvény megrajzolásának 5 pontos mesterszabálya"
        icon={<Target className="w-5 h-5 text-emerald-500" />}
        badge="PRECÍZ ÁBRÁZOLÁS"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Egy másodfokú függvény grafikonjának érettségi pontosságú megrajzolásához
          nem kell végtelen sok pontot kiszámolni értéktáblázattal.
          Az alábbi <strong>5 kulcspont</strong> azonnal és tökéletesen rögzíti a parabolát a síkban:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-3">
          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400">1. Kulcspont</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-0.5">Csúcspont</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                <MathText>V(u; v)</MathText>
              </p>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              <MathText>{"u = -b / (2a)"}</MathText>, <MathText>v = f(u)</MathText>. Ez a parabola orma vagy mélypontja.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">2. Kulcspont</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-0.5">y-tengelymetszet</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                <MathText>(0; c)</MathText>
              </p>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              A polinom konstans tagja adja meg az <MathText>x = 0</MathText> helyen felvett értéket.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">3. Kulcspont</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-0.5">Tükörkép az axisra</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                <MathText>(2u; c)</MathText>
              </p>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              A <MathText>(0; c)</MathText> tükörképe az <MathText>x = u</MathText> tengely túloldalán, azonos <MathText>c</MathText> magasságban!
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">4. Kulcspont</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-0.5">Bal zérushely</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                <MathText>(x_1; 0)</MathText>
              </p>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              Ha létezik valós gyök (<MathText>D \ge 0</MathText>), a bal oldali metszéspont az <MathText>x</MathText>-tengellyel.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">5. Kulcspont</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-0.5">Jobb zérushely</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                <MathText>(x_2; 0)</MathText>
              </p>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              A jobb oldali metszéspont az <MathText>x</MathText>-tengellyel. Távolsága a tengelytől azonos <MathText>x_1</MathText> távolságával.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <FiveKeyPointsParabolaSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            Az 5 nevezetes pont azonnal kijelöli a parabola szimmetriáját, magasságát és nyílását.
          </p>
        </div>

        {/* --- INTERAKTÍV SZIMULÁTOR: 5 PONT KALKULÁTOR --- */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-900 dark:to-rose-950/30 border border-rose-200 dark:border-rose-900/50">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-5 h-5 text-rose-500" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Interaktív 5 Kulcspont és Segédfüggvény Szimulátor
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Állítsd be az <MathText>a</MathText>, <MathText>b</MathText>, és <MathText>c</MathText> együtthatókat, és figyeld meg a segédfüggvény zérushelyeit,
            a szimmetriatengelyt, valamint az 5 nevezetes pont pontos koordinátáit!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Főegyüttható (a):</span>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{coeffA}</span>
              </label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={coeffA}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCoeffA(val === 0 ? 1 : val);
                }}
                className="w-full mt-1.5 accent-rose-500"
              />
              <span className="text-[10px] text-slate-400">({coeffA > 0 ? 'Felfelé nyílik, min' : 'Lefelé nyílik, max'})</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Elsőfokú tag (b):</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{coeffB}</span>
              </label>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={coeffB}
                onChange={(e) => setCoeffB(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Konstans eltolás (c):</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{coeffC}</span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={coeffC}
                onChange={(e) => setCoeffC(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-emerald-500"
              />
            </div>
          </div>

          {/* Számított eredmények kártyája */}
          <div className="p-3.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">
                1. Segédfüggvény: <MathText>g(x) = {coeffA !== 1 ? (coeffA === -1 ? '-' : coeffA) : ''}x² {coeffB >= 0 ? `+ ${coeffB}` : `- ${Math.abs(coeffB)}`}x</MathText>
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                <li>• Szorzatalak: <MathText>x · ({coeffA !== 1 ? coeffA : ''}x {coeffB >= 0 ? `+ ${coeffB}` : `- ${Math.abs(coeffB)}`}) = 0</MathText></li>
                <li>• Segédfüggvény zérushelyei: <MathText>x_1 = {gRoot1}</MathText> és <MathText>x_2 = {gRoot2.toFixed(1)}</MathText></li>
                <li>• Szimmetriatengely: <MathText>x = u = {uVal.toFixed(2)}</MathText></li>
                <li>• Segédfüggvény csúcspontja: <MathText>V_g({uVal.toFixed(2)}; {gVertexY.toFixed(2)})</MathText></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">
                2. Eredeti függvény: <MathText>f(x) = g(x) {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`}</MathText>
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                <li>• <strong>Csúcspont:</strong> <MathText>V({uVal.toFixed(2)}; {vVal.toFixed(2)})</MathText></li>
                <li>• <strong>y-metszet:</strong> <MathText>(0; {coeffC})</MathText></li>
                <li>• <strong>Tükörkép:</strong> <MathText>({symX.toFixed(2)}; {coeffC})</MathText></li>
                <li>
                  • <strong>Zérushelyek:</strong>{' '}
                  {disc > 0 ? (
                    <MathText>x_1 = {root1?.toFixed(2)}, \quad x_2 = {root2?.toFixed(2)}</MathText>
                  ) : disc === 0 ? (
                    <MathText>Egyetlen érintési pont: x = {root1?.toFixed(2)}</MathText>
                  ) : (
                    <span className="text-rose-500 font-semibold">Nincs valós zérushely (D &lt; 0)</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: TELJES KÖRŰ FÜGGVÉNYJELLEMZÉS */}
      <TheorySection
        number={4}
        title="A másodfokú függvény teljes körű jellemzése"
        icon={<Maximize2 className="w-5 h-5 text-blue-500" />}
        badge="ÉRETTSÉGI KÖVETELMÉNY"
        badgeColor="blue"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A grafikon elkészítése után a másodfokú függvény tulajdonságait
          egy egységes, 7 pontos szempontsor szerint jellemezzük:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">1. Értelmezési tartomány (D_f)</span>
            <p className="text-slate-600 dark:text-slate-400">
              Ha külön megszorítás nincs: <MathText>D_f = ℝ</MathText>. Minden valós számra értelmezett.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">2. Értékkészlet (R_f)</span>
            <p className="text-slate-600 dark:text-slate-400">
              A csúcs <MathText>v</MathText> értéke határolja:<br />
              • Ha <MathText>a &gt; 0</MathText>: <MathText>R_f = [v; \infty[</MathText><br />
              • Ha <MathText>a &lt; 0</MathText>: <MathText>R_f = ]-\infty; v]</MathText>
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">3. Szélsőérték</span>
            <p className="text-slate-600 dark:text-slate-400">
              Pontosan meg kell adni a helyét és az értékét:<br />
              • <MathText>a &gt; 0</MathText>: Minimum helye: <MathText>x = u</MathText>, értéke: <MathText>y = v</MathText><br />
              • <MathText>a &lt; 0</MathText>: Maximum helye: <MathText>x = u</MathText>, értéke: <MathText>y = v</MathText>
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">4. Monotonitás</span>
            <p className="text-slate-600 dark:text-slate-400">
              A csúcspont <MathText>u</MathText> értéke választja el a szakaszokat:<br />
              • <MathText>a &gt; 0</MathText>: <MathText>]-\infty; u]</MathText> szig. mon. csökken, <MathText>[u; \infty[</MathText> szig. mon. nő.<br />
              • <MathText>a &lt; 0</MathText>: <MathText>]-\infty; u]</MathText> szig. mon. nő, <MathText>[u; \infty[</MathText> szig. mon. csökken.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">5. Zérushelyek</span>
            <p className="text-slate-600 dark:text-slate-400">
              Azon <MathText>x</MathText> helyek, ahol <MathText>f(x) = 0</MathText>. Lehet 2 különböző, 1 darab vagy 0 valós gyök.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">6. Előjelvizsgálat</span>
            <p className="text-slate-600 dark:text-slate-400">
              Hol fekszik a grafikon az <MathText>x</MathText>-tengely felett (<MathText>f(x) &gt; 0</MathText>), és hol alatta (<MathText>f(x) &lt; 0</MathText>).
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <ParabolaCharacterizationSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            A függvény értékkészlete, monotonitása és előjele közvetlenül a csúcspont és a zérushelyek segítségével olvasható le.
          </p>
        </div>

        {/* --- INTERAKTÍV JELLEMZŐ PRESET VÁLASZTÓ --- */}
        <div className="mt-5 p-4 rounded-xl bg-indigo-50/70 dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/50">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-indigo-500" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Interaktív Teljes Függvényjellemző Vizsgáló
            </h4>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {presets.map((p, idx) => (
              <button
                key={p.name}
                onClick={() => setPresetIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  presetIndex === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Preset Data Sheet */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Értelmezési tartomány:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100"><MathText>{currentPreset.domain}</MathText></p>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Értékkészlet:</span>
                <p className="font-bold text-indigo-600 dark:text-indigo-400"><MathText>{currentPreset.range}</MathText></p>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Zérushelyek:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100"><MathText>{currentPreset.roots}</MathText></p>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Szélsőérték:</span>
                <p className="font-bold text-rose-600 dark:text-rose-400">{currentPreset.minMax}</p>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-700 my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Szigorúan monoton csökken:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100"><MathText>{currentPreset.decreasing}</MathText></p>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Szigorúan monoton nő:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100"><MathText>{currentPreset.increasing}</MathText></p>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Pozitív értéktartomány (<MathText>f(x) &gt; 0</MathText>):</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400"><MathText>{currentPreset.positive}</MathText></p>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">Negatív értéktartomány (<MathText>f(x) &lt; 0</MathText>):</span>
                <p className="font-bold text-rose-600 dark:text-rose-400"><MathText>{currentPreset.negative}</MathText></p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: MÁSODFOKÚ EGYENLETEK ÉS EGYENLŐTLENSÉGEK GRAFIKUS MEGOLDÁSA */}
      <TheorySection
        number={5}
        title="Másodfokú egyenletek és egyenlőtlenségek grafikus megoldása"
        icon={<Split className="w-5 h-5 text-amber-500" />}
        badge="ALKALMAZÁS"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A parabola grafikonja nem csupán elméleti ábra, hanem a másodfokú egyenletek és egyenlőtlenségek
          legmegbízhatóbb vizuális ellenőrző eszköze!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="ax² + bx + c = 0 grafikus megoldása"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            badge="EGYENLET"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az egyenlet gyökei geometriailag pontosan a parabola és az <MathText>x</MathText>-tengely metszéspontjainak első koordinátái:
            </p>
            <ul className="text-xs list-disc list-inside mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>2 gyök:</strong> A parabola metszi az <MathText>x</MathText>-tengelyt (2 metszéspont).</li>
              <li><strong>1 gyök:</strong> A parabola csúcspontja éppen a tengelyre esik (érinti a tengelyt).</li>
              <li><strong>0 valós gyök:</strong> A parabola "lebeg" a tengely felett vagy alatt (nincs közös pont).</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="ax² + bx + c > 0 vagy < 0 grafikus megoldása"
            icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
            badge="EGYENLŐTLENSÉG"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az egyenlőtlenség megoldása során azt keressük, hogy a parabola mely része esik
              az <MathText>x</MathText>-tengely <strong>fölé</strong> (<MathText>&gt; 0</MathText>) vagy <strong>alá</strong> (<MathText>&lt; 0</MathText>):
            </p>
            <ul className="text-xs list-disc list-inside mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Ha <MathText>a &gt; 0</MathText> és létezik 2 gyök: <MathText>f(x) &gt; 0</MathText> a külső tartományokon (<MathText>]-\infty; x_1[ \cup ]x_2; \infty[</MathText>), és <MathText>f(x) &lt; 0</MathText> a két gyök között (<MathText>]x_1; x_2[</MathText>).</li>
              <li>Ha <MathText>a &lt; 0</MathText> és létezik 2 gyök: pont fordítva! A két gyök között pozitív, kívül negatív.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: TIPIKUS HIBACSAPDÁK ÉS ELLENŐRZŐ LISTA */}
      <TheorySection
        number={6}
        title="Tipikus hibacsapdák és 30 másodperces ellenőrző lista"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <TheoryTrapBox title="1. Előjelhiba a csúcspont x-koordinátájánál!">
          A szimmetriatengely és a csúcs <MathText>x</MathText>-koordinátájának képletében egy <strong>negatív előjel</strong> szerepel:
          <div className="font-mono text-center font-bold my-1 text-rose-700 dark:text-rose-300">
            <MathText>{"u = -b / (2a)"}</MathText>
          </div>
          Ha például <MathText>f(x) = x^2 - 6x + 5</MathText>, akkor <MathText>b = -6</MathText>,
          így <MathText>{"u = -(-6) / 2 = +3"}</MathText>! Nagyon gyakori hiba a mínusz jelek összekeverése.
        </TheoryTrapBox>

        <div className="mt-3">
          <TheoryTrapBox title="2. Tükörkép x-koordinátájának eltévesztése!">
            A <MathText>(0; c)</MathText> pont távolsága a szimmetriatengelytől pontosan <MathText>|u|</MathText>.
            Ezért a túloldali tükörkép koordinátája mindig <MathText>(2u; c)</MathText>,
            <strong>nem pedig</strong> <MathText>(u; c)</MathText>!
          </TheoryTrapBox>
        </div>

        <div className="mt-3">
          <TheoryTrapBox title="3. Monotonitási szakaszok felírása: Nyílt vagy zárt intervallum?">
            A függvény monoton növekedési és csökkenési szakaszait <strong>mindig zárt zárójellel</strong> zárjuk le a szélsőérték helyénél:
            pl. <MathText>]-\infty; u]</MathText> és <MathText>[u; \infty[</MathText>.
            A csúcspont mindkét monotonitási intervallumhoz hozzátartozhat!
          </TheoryTrapBox>
        </div>

        <div className="mt-4 p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
          <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-200 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            30 Másodperces Rajzellenőrző Protokoll
          </h4>
          <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-decimal list-inside">
            <li>Nézd meg <MathText>a</MathText> előjelét: helyes irányba nyílik a parabola?</li>
            <li>Ellenőrizd az <MathText>y</MathText>-tengelymetszetet: valóban a <MathText>(0; c)</MathText> ponton halad át?</li>
            <li>Ellenőrizd a szimmetriát: a csúcsponttól balra és jobbra pontosan egyforma távolságra vannak a pontok?</li>
            <li>Ha vannak zérushelyek: a két gyök felezőpontja pontosan az <MathText>u</MathText> csúcskoordináta?</li>
          </ol>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

