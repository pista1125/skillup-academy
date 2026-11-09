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
  ProjectileMotionSvg,
  OptimalAreaFencingSvg,
  GraphicalEquationSvg
} from './PracticeApplicationFigures';
import {
  Brain,
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
  Rocket,
  Building,
  DollarSign
} from 'lucide-react';

interface PracticeApplicationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeApplicationTheory: React.FC<PracticeApplicationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Kordon Optimalizáló Laboratórium ---
  const [fenceMode, setFenceMode] = useState<'4-sides' | '3-sides'>('4-sides');
  const [perimeter, setPerimeter] = useState<number>(20);
  const [sideX, setSideX] = useState<number>(5);

  // Számítások Lab 1:
  // 4 oldal: K = 2x + 2b => b = K/2 - x, T = x * (K/2 - x), x_opt = K/4
  // 3 oldal: K = 2x + b => b = K - 2x, T = x * (K - 2x), x_opt = K/4, b_opt = K/2
  const maxAllowedX = fenceMode === '4-sides' ? perimeter / 2 - 0.5 : perimeter / 2 - 0.5;
  const currentX = Math.min(sideX, maxAllowedX);

  const sideB = fenceMode === '4-sides' ? (perimeter / 2) - currentX : perimeter - 2 * currentX;
  const area = Math.max(0, currentX * sideB);

  const optX = perimeter / 4;
  const optB = fenceMode === '4-sides' ? perimeter / 4 : perimeter / 2;
  const optArea = optX * optB;

  // --- Interactive Lab 2: Hajítási Pályaszimulátor ---
  const [initHeight, setInitHeight] = useState<number>(40);
  const [initVelocity, setInitVelocity] = useState<number>(10);

  // h(t) = -5t² + v0*t + h0
  // t_apex = v0 / 10
  const tApex = initVelocity / 10;
  // h_max = h0 + v0² / 20
  const hMax = initHeight + (initVelocity * initVelocity) / 20;
  // Becsapódási idő: -5t² + v0*t + h0 = 0 => 5t² - v0*t - h0 = 0
  const discr = initVelocity * initVelocity + 4 * 5 * initHeight;
  const tImpact = (initVelocity + Math.sqrt(discr)) / 10;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Gyakorlás és alkalmazás"
      subtitle="A függvénytranszformációk és másodfokú összefüggések a valóságban: területoptimalizálás, hajítási parabolák, költségminimumok és grafikus egyenletmegoldás."
      themeColor="teal"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-teal-600 dark:text-teal-400 font-black">1. Szabad 4 oldalas kordon:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>{"T(x) = x(K/2 - x)"}</MathText> &nbsp;|&nbsp; Maximum mindig <strong>négyzetnél</strong>: <MathText>{"x = K/4"}</MathText>, <MathText>{"T_max = (K/4)²"}</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">2. Fal menti 3 oldalas kordon:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>{"T(x) = x(K - 2x)"}</MathText> &nbsp;|&nbsp; Maximum: <MathText>{"x = K/4"}</MathText>, <MathText>{"b = K/2"}</MathText> (dupla terület: <MathText>{"T_max = 2 · T_négyzet"}</MathText>)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">3. Függőleges hajítás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>{"h(t) ≈ -5t² + v₀t + h₀"}</MathText> &nbsp;|&nbsp; Tetőpont: <MathText>{"t_tető = v₀ / 10"}</MathText>, <MathText>{"h_max = h₀ + v₀² / 20"}</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">4. Grafikus megoldás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x) = g(x) ⟺</MathText> metszéspontok <MathText>x</MathText>-ei &nbsp;|&nbsp; <MathText>f(x) ≤ g(x) ⟺</MathText> ahol <MathText>f</MathText> a <MathText>g</MathText> alatt fut
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A BEKERÍTÉSI PARADOXON */}
      <TheorySection
        number={1}
        title="Geometriai szélsőértékek: A bekerítés és a területmaximum"
        icon={<Maximize2 className="w-5 h-5 text-teal-500" />}
        badge="GEOMETRIA"
        badgeColor="teal"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A másodfokú függvények egyik leggyakoribb gyakorlati alkalmazása az <strong>adott kerületű területek maximalizálása</strong>.
          Ha egy rögzített hosszúságú (<MathText>K</MathText>) dróthálóból vagy zsinórból téglalap alakú területet kell elkerítenünk,
          a terület nagysága az oldalhossz másodfokú függvénye lesz!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="1. Szabadon álló 4 oldalas kordon"
            icon={<Sparkles className="w-4 h-4 text-teal-500" />}
            badge="NÉGYZET OPTIMUM"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mivel a teljes kerület <MathText>K = 2x + 2b</MathText>, a félkerület <MathText>{"x + b = K/2"}</MathText>.
              Így a másik oldal hossza <MathText>{"b = K/2 - x"}</MathText>.
            </p>
            <div className="p-2.5 my-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-center font-bold text-teal-800 dark:text-teal-200 text-xs">
              <MathText>{"T(x) = x · (K/2 - x) = -x² + (K/2)x"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A parabola zérushelyei <MathText>0</MathText> és <MathText>{"K/2"}</MathText>.
              A csúcspont (maximum) a felezőpontban van:
            </p>
            <div className="font-mono text-center text-xs font-bold my-1 text-slate-800 dark:text-slate-100">
              <MathText>{"x_opt = K/4 ⟹ b_opt = K/4 (Négyzet!)"}</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Falhoz épített 3 oldalas kordon"
            icon={<Building className="w-4 h-4 text-indigo-500" />}
            badge="FAL STRATÉGIA"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha az egyik oldal egy meglévő fal vagy hurkapálca, akkor csak 3 oldalt kell bekeríteni:
              <MathText>{"K = 2x + b ⟹ b = K - 2x"}</MathText>.
            </p>
            <div className="p-2.5 my-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-center font-bold text-indigo-800 dark:text-indigo-200 text-xs">
              <MathText>{"T(x) = x · (K - 2x) = -2x² + Kx"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Zérushelyei <MathText>0</MathText> és <MathText>{"K/2"}</MathText>.
              A csúcspont szintén <MathText>{"x = K/4"}</MathText>, de ekkor a fal menti oldal:
            </p>
            <div className="font-mono text-center text-xs font-bold my-1 text-slate-800 dark:text-slate-100">
              <MathText>{"b = K - 2(K/4) = K/2 ⟹ T_max = K² / 8"}</MathText>
            </div>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold text-center">
              Pontosan a duplája a 4 oldalas négyzet területének!
            </p>
          </TheoryCard>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <OptimalAreaFencingSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            Ugyanabból a 20 méteres kerítésből 4 oldallal 25 m²-t (négyzet), míg a fal mellé építve 50 m²-t (5 × 10 m-es téglalap) tudunk maximálisan elkeríteni!
          </p>
        </div>

        {/* --- INTERAKTÍV KORDON LABORATÓRIUM --- */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-900 dark:to-teal-950/30 border border-teal-200 dark:border-teal-900/50">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Interaktív Kordon Területoptimalizáló Laboratórium
            </h4>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFenceMode('4-sides')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                fenceMode === '4-sides'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              4 Oldalú Kordon (Szabadon álló)
            </button>
            <button
              onClick={() => setFenceMode('3-sides')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                fenceMode === '3-sides'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              3 Oldalú Kordon (Fal mentén)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Rendelkezésre álló kerítés (K):</span>
                <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{perimeter} méter</span>
              </label>
              <input
                type="range"
                min="12"
                max="60"
                step="4"
                value={perimeter}
                onChange={(e) => setPerimeter(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Választott 'x' oldalhossz:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{currentX.toFixed(1)} méter</span>
              </label>
              <input
                type="range"
                min="1"
                max={maxAllowedX}
                step="0.5"
                value={currentX}
                onChange={(e) => setSideX(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-indigo-500"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="p-3.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Kialakult méretek:</span>
              <p className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-0.5">
                {currentX.toFixed(1)} m × {sideB.toFixed(1)} m
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Jelenlegi terület:</span>
              <p className="font-black text-teal-600 dark:text-teal-400 text-sm mt-0.5">
                {area.toFixed(1)} m²
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Elérhető maximum:</span>
              <p className="font-black text-rose-600 dark:text-rose-400 text-sm mt-0.5">
                {optArea.toFixed(1)} m² <span className="text-xs font-normal text-slate-500">({optX} × {optB} m)</span>
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: FIZIKAI FOLYAMATOK: HAJÍTÁSOK */}
      <TheorySection
        number={2}
        title="Fizikai folyamatok: Függőleges hajítás és repülési parabola"
        icon={<Rocket className="w-5 h-5 text-rose-500" />}
        badge="FIZIKA & KINEMATIKA"
        badgeColor="rose"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A gravitációs mezőben elhajított testek magassága az idő múlásával
          szintén másodfokú függvénnyel írható le.
          A Földön a nehézségi gyorsulás <MathText>{"g ≈ 10 m/s²"}</MathText>,
          így a másodfokú tag együtthatója <MathText>{"-g/2 ≈ -5"}</MathText>.
        </p>

        <div className="p-3 my-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-center font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm">
          <MathText>{"h(t) = -5t² + v₀t + h₀"}</MathText>
          <div className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-1">
            ahol <MathText>{"h₀"}</MathText> a kezdőmagasság, <MathText>{"v₀"}</MathText> a felfelé irányuló kezdősebesség, és <MathText>t</MathText> az eltelt idő másodpercben.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Tetőpont ideje</span>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 my-1">
              <MathText>{"t_tető = -b / (2a) = v₀ / 10"}</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Ekkor a test pillanatnyi sebessége 0-ra csökken.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Maximális magasság</span>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 my-1">
              <MathText>{"h_max = h₀ + v₀² / 20"}</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A parabola csúcsának <MathText>y</MathText>-koordinátája.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Földet érés ideje</span>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 my-1">
              <MathText>h(t) = 0</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A függvény pozitív zérushelye (másodfokú egyenlet megoldása).
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <ProjectileMotionSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            Példa egy toronyból felhajított labdára: <MathText>{"h(t) = -5t² + 10t + 40"}</MathText>.
            Tetőpont: 1 s múlva 45 m magasan, földet érés: 4 s múlva.
          </p>
        </div>

        {/* --- INTERAKTÍV HAJÍTÁS SZIMULÁTOR --- */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-900 dark:to-rose-950/30 border border-rose-200 dark:border-rose-900/50">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-rose-500" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Interaktív Hajítási Pályaszimulátor
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Kezdőmagasság (h₀):</span>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{initHeight} méter</span>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={initHeight}
                onChange={(e) => setInitHeight(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Kezdősebesség (v₀):</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{initVelocity} m/s</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={initVelocity}
                onChange={(e) => setInitVelocity(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-indigo-500"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Tetőpont ideje:</span>
              <p className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-0.5">
                {tApex.toFixed(1)} másodperc
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Csúcsmagasság:</span>
              <p className="font-black text-rose-600 dark:text-rose-400 text-sm mt-0.5">
                {hMax.toFixed(1)} méter
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Becsapódási idő:</span>
              <p className="font-black text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">
                {tImpact.toFixed(2)} másodperc
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: GAZDASÁGI ÉS MŰSZAKI MODELLEK */}
      <TheorySection
        number={3}
        title="Gazdasági modellek: Költségminimum és profitmaximum"
        icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
        badge="GAZDASÁGTAN"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A gazdasági életben a vállalatok költségei (<MathText>K(x)</MathText>) és bevételei (<MathText>B(x)</MathText>)
          gyakran nem lineárisak, hanem a méretgazdaságosság és kapacitáskorlátok miatt parabolikusan viselkednek.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="Költségminimalizálás"
            icon={<TrendingDown className="w-4 h-4 text-emerald-500" />}
            badge="MINIMUM"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha a költségfüggvény <MathText>a &gt; 0</MathText> főegyütthatójú:
              <MathText>K(x) = ax² - bx + c</MathText>, akkor a parabola felfelé nyílik, így létezik egy optimális gyártási volumen, ahol a költség a legkisebb:
            </p>
            <div className="font-mono text-center font-bold text-xs my-2 text-emerald-700 dark:text-emerald-300">
              <MathText>{"x_min = b / (2a), K_min = K(x_min)"}</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Bevétel- és profitmaximalizálás"
            icon={<TrendingUp className="w-4 h-4 text-blue-500" />}
            badge="MAXIMUM"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Amikor a termék árának emelése csökkenti az eladott darabszámot (keresleti görbe),
              a bevétel <MathText>{"B(x) = x · (ár - k · x) = -kx² + ár · x"}</MathText> alakú lesz.
              Mivel <MathText>a &lt; 0</MathText>, a csúcspont a maximális bevételt adja meg.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: GRAFIKUS EGYENLET- ÉS EGYENLŐTLENSÉG-MEGOLDÁS */}
      <TheorySection
        number={4}
        title="Grafikus egyenlet- és egyenlőtlenség-megoldás összetett függvényekkel"
        icon={<Split className="w-5 h-5 text-indigo-500" />}
        badge="GRAFIKUS MEGOLDÁS"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Gyakran találkozunk olyan egyenletekkel, ahol az algebrai megoldás bonyolult lenne,
          de a két oldal függvényként való ábrázolása azonnal feltárja a megoldások helyét és számát:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">
              Az f(x) = g(x) egyenlet
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              A két függvény grafikonjának közös pontjait (metszéspontjait) keressük.
              Az egyenlet megoldásai a <strong>metszéspontok x-koordinátái</strong>!
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">
              Az f(x) ≤ g(x) egyenlőtlenség
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Azon <MathText>x</MathText> intervallumok összessége, ahol az <MathText>f</MathText> grafikonja
              a <MathText>g</MathText> grafikonja <strong>alatt halad, vagy metszi azt</strong>.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <GraphicalEquationSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            Példa: <MathText>(x - 2)^2 - 1 = x - 1</MathText> megoldásai a metszéspontokból <MathText>x = 1</MathText> és <MathText>x = 4</MathText>.
            Az <MathText>f(x) \le g(x)</MathText> egyenlőtlenség megoldása pedig a zárt <MathText>[1; 4]</MathText> intervallum.
          </p>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: LESZŰKÍTETT ÉRTELMEZÉSI TARTOMÁNY */}
      <TheorySection
        number={5}
        title="Függvények leszűkített értelmezési tartományon"
        icon={<Layers className="w-5 h-5 text-amber-500" />}
        badge="INTERVALLUMOK"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Gyakori és kiemelt feladattípus, amikor egy függvény nem a teljes <MathText>ℝ</MathText> halmazon,
          hanem egy adott <MathText>[a; b]</MathText> vagy <MathText>]a; b]</MathText> intervallumon van csak értelmezve.
        </p>

        <TheoryTrapBox title="Vigyázat a szélsőérték meghatározásakor!">
          Ha a függvény értelmezési tartománya le van szűkítve, a csúcspont <strong>csak akkor lehet szélsőérték</strong>,
          ha a csúcs <MathText>u</MathText> koordinátája beletartozik az adott intervallumba!
          Ha <MathText>u \notin [a; b]</MathText>, akkor a szélsőértékeket a végpontok behelyettesítésével (<MathText>f(a)</MathText> és <MathText>f(b)</MathText>) kapjuk meg!
        </TheoryTrapBox>
      </TheorySection>
    </TheoryTemplate>
  );
};

