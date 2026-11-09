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
  NormalParabolaSvg,
  VerticalShiftSvg,
  HorizontalShiftSvg,
  ParabolaOddStepSvg
} from './ParabolaBasicsFigures';
import {
  TrendingUp,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Sparkles,
  Sliders,
  MoveVertical,
  MoveHorizontal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ParabolaBasicsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ParabolaBasicsTheory: React.FC<ParabolaBasicsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Parabola Transzformációs Szimulátor ---
  const [shiftU, setShiftU] = useState<number>(2); // x-tengely menti eltolás: (x - u)²
  const [shiftC, setShiftC] = useState<number>(-1); // y-tengely menti eltolás: + c

  // Számított tulajdonságok
  const vertexX = shiftU;
  const vertexY = shiftC;
  const minVal = shiftC;
  const rangeStr = `[${shiftC}; ∞[`;

  // Zérushelyek számítása: (x - u)² + c = 0  =>  (x - u)² = -c
  let zeroCrossings: string = 'Nincs zérushely (a görbe az x-tengely felett lebeg)';
  if (shiftC < 0) {
    const root = Math.sqrt(-shiftC);
    const z1 = (shiftU - root).toFixed(2);
    const z2 = (shiftU + root).toFixed(2);
    zeroCrossings = `2 zérushely: x₁ = ${z1}, x₂ = ${z2}`;
  } else if (shiftC === 0) {
    zeroCrossings = `1 zérushely (érinti az x-tengelyt): x = ${shiftU}`;
  }

  // --- Interactive Lab 2: Páratlan Lépések Szimulátor ---
  const [stepLevel, setStepLevel] = useState<number>(3); // 1, 2, 3, 4 lépés

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Parabolák a koordináta-rendszerben"
      subtitle="Az f(x) = x² normálparabola geometriai tulajdonságai, szimmetriája, tengelypontja és az első párhuzamos eltolások."
      themeColor="indigo"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Alapfüggvény:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x) = x²</MathText> &nbsp;|&nbsp; Csúcspont: <MathText>T(0; 0)</MathText> &nbsp;|&nbsp; É.K.: <MathText>[0; ∞[</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Függőleges eltolás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>x² + c</MathText> &nbsp;(<MathText>c &gt; 0</MathText>: fel, <MathText>c &lt; 0</MathText>: le) &nbsp;|&nbsp; Csúcs: <MathText>T(0; c)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Vízszintes eltolás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>(x - u)²</MathText> &nbsp;(<MathText>-u</MathText>: jobbra, <MathText>+u</MathText>: balra!) &nbsp;|&nbsp; Csúcs: <MathText>T(u; 0)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Zérushelyek száma:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>c &lt; 0 ⟹ 2</MathText> db (<MathText>±√(-c)</MathText>) &nbsp;|&nbsp; <MathText>c = 0 ⟹ 1</MathText> db &nbsp;|&nbsp; <MathText>c &gt; 0 ⟹ 0</MathText> db
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A NORMÁLPARABOLA TULAJDONSÁGAI */}
      <TheorySection
        number={1}
        title="Az f(x) = x² normálparabola felépítése és tulajdonságai"
        icon={<TrendingUp className="w-5 h-5 text-indigo-500" />}
        badge="ALAPFÜGGVÉNY"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A másodfokú függvények világának kiindulópontja az <strong>f(x) = x²</strong> hozzárendelési
          szabályú függvény. Grafikonja a síkban egy elegáns, felfelé nyíló, szimmetrikus U alakú görbe,
          amelyet <strong>normálparabolának</strong> nevezünk.
        </p>

        <div className="my-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <NormalParabolaSvg size={280} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <TheoryCard title="Szimmetria és Csúcspont (Tengelypont)">
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>Szimmetriatengely:</strong> Az y-tengely (az <code>x = 0</code> függőleges egyenes). Mivel <code>(-x)² = x²</code>, a függvény páros!</li>
              <li><strong>Tengelypont / Csúcspont:</strong> A szimmetriatengely és a parabola metszéspontja: az origó, <strong>T(0; 0)</strong>.</li>
              <li><strong>Görbület:</strong> Felfelé nyíló (konvex) görbe.</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Függvényjellemzés (D_f, R_f, Menet)">
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>Értelmezési tartomány (D_f):</strong> Minden valós szám: <strong>D_f = ℝ</strong>.</li>
              <li><strong>Értékkészlet (R_f):</strong> Csak nemnegatív számok: <strong>R_f = [0; ∞[ = ℝ₀⁺</strong>.</li>
              <li><strong>Szélsőérték:</strong> Minimuma van, értéke <strong>0</strong>, a minimum helye: <strong>x = 0</strong>. Maximuma nincs.</li>
              <li><strong>Monotonitás:</strong> A <code>]-∞; 0]</code> intervallumon szigorúan monoton csökken, a <code>[0; ∞[</code> intervallumon szigorúan monoton nő.</li>
            </ul>
          </TheoryCard>
        </div>

        <TheoryCallout title="A rajzolás trükkje: A páratlan lépések szabálya" variant="tip">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Hogyan rajzolhatsz gyorsan és pontosan parabolát füzetben vagy táblán?
            Indulj ki a csúcspontból <code>(0; 0)</code>! Lépj jobbra 1-et, és <strong>fel 1-et</strong> → (1; 1).
            Innen lépj tovább jobbra 1-et, és <strong>fel 3-at</strong> → (2; 4).
            Tovább jobbra 1-et, és <strong>fel 5-öt</strong> → (3; 9)!
            Ugyanezt ismételd meg balra is! Ez a páratlan számok összegének törvényéből fakad: <code>1 = 1², 1+3 = 4 = 2², 1+3+5 = 9 = 3²</code>.
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: FÜGGŐLEGES ELTOLÁSOK (y-tengely mentén) */}
      <TheorySection
        number={2}
        title="Függőleges eltolások az y-tengely mentén: f(x) = x² ± c"
        icon={<MoveVertical className="w-5 h-5 text-emerald-500" />}
        badge="FÜGGŐLEGES MOZGÁS"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ha a függvényértékhez hozzáadunk egy <strong>c</strong> konstanst, az összes y-koordináta
          megváltozik. A parabola alakja és szimmetriatengelye változatlan marad, de az egész görbe
          függőlegesen eltolódik.
        </p>

        <div className="my-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <VerticalShiftSvg size={300} />
        </div>

        <div className="space-y-3 mt-3">
          <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-1">
              Felfelé tolás: f(x) = x² + c (ahol c &gt; 0)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Példa: <code>f(x) = x² + 2</code>. A csúcspont a <strong>T(0; 2)</strong> pontba kerül.<br />
              Értékkészlet: <strong>R_f = [2; ∞[</strong>. A függvény értéke soha nem éri el a 0-t, így <strong>nincs zérushelye</strong>!
              A parabola a vízszintes x-tengely felett „lebeg”.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/60">
            <div className="font-bold text-sm text-amber-900 dark:text-amber-300 mb-1">
              Lefelé tolás: g(x) = x² - c (ahol c &gt; 0)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Példa: <code>g(x) = x² - 4</code>. A csúcspont a <strong>T(0; -4)</strong> pontba mozdul lefelé.<br />
              Értékkészlet: <strong>R_g = [-4; ∞[</strong>. Mivel a csúcs a negatív tartományban van, a parabola kétszer is metszi az x-tengelyt!<br />
              Zérushelyek: <code>x² - 4 = 0 ⟹ x² = 4 ⟹ x₁ = -2, x₂ = 2</code>.
            </p>
          </div>
        </div>

        <TheoryTrapBox title="Zérushelyek száma függőleges eltolásnál">
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li>Ha <code>c &lt; 0</code> (pl. x² - 9): <strong>2 zérushely</strong> van (x = ±√|c|).</li>
            <li>Ha <code>c = 0</code> (alapeset x²): <strong>1 zérushely</strong> van (x = 0, a csúcspont érinti a tengelyt).</li>
            <li>Ha <code>c &gt; 0</code> (pl. x² + 5): <strong>0 zérushely</strong> van (a görbe nem metszi az x-tengelyt).</li>
          </ul>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. SZEKCIÓ: VÍZSZINTES ELTOLÁSOK (x-tengely mentén) */}
      <TheorySection
        number={3}
        title="Vízszintes eltolások az x-tengely mentén: f(x) = (x ∓ u)²"
        icon={<MoveHorizontal className="w-5 h-5 text-blue-500" />}
        badge="VÍZSZINTES MOZGÁS"
        badgeColor="blue"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Amikor közvetlenül a független változót módosítjuk a zárójelen belül <strong>(x - u)²</strong> alakban,
          a parabola vízszintesen tolódik el az x-tengely mentén.
        </p>

        <div className="my-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <HorizontalShiftSvg size={300} />
        </div>

        <TheoryCallout title="Az ellentétes előjel szabálya: Miért mozdul jobbra a mínusz?" variant="warning">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Tekintsük a <code>g(x) = (x - 3)²</code> függvényt! Hol veszi fel a függvény a minimális 0 értéket?<br />
            <code>(x - 3)² = 0  ⟹  x - 3 = 0  ⟹  x = +3</code>!<br />
            Azért tolódik a görbe <strong>jobbra</strong> a pozitív irányba, mert minden x értékből először kivonunk 3-at,
            ezért a függvénynek <strong>3-mal nagyobb x értékre van szüksége</strong>, hogy ugyanazt az eredményt produkálja,
            mint az eredeti x² az origóban!
          </p>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard title="Eltolás jobbra: f(x) = (x - u)²">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              • Csúcspont: <strong>T(u; 0)</strong> (pozitív x tengelyen)<br />
              • Szimmetriatengely: az <code>x = u</code> függőleges egyenes<br />
              • Egyetlen zérushelye van: <strong>x = u</strong><br />
              • Értékkészlet: változatlanul <strong>[0; ∞[</strong>.
            </p>
          </TheoryCard>

          <TheoryCard title="Eltolás balra: g(x) = (x + u)²">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              • Mivel <code>(x + u)² = (x - (-u))²</code>, az eltolás mértéke -u:<br />
              • Csúcspont: <strong>T(-u; 0)</strong> (negatív x tengelyen)<br />
              • Szimmetriatengely: az <code>x = -u</code> függőleges egyenes<br />
              • Egyetlen zérushelye van: <strong>x = -u</strong><br />
              • Értékkészlet: változatlanul <strong>[0; ∞[</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KORLÁTOS TARTOMÁNY ÉS ABSZOLÚT ÉRTÉK */}
      <TheorySection
        number={4}
        title="Parabolák korlátos tartományon és az abszolút érték hatása"
        icon={<Scale className="w-5 h-5 text-purple-500" />}
        badge="HALADÓ VIZSGÁLAT"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Értelmezési tartomány levágása (D_f = [a; b])">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha a parabolát csak egy zárt intervallumon vizsgáljuk, az értékkészlet felső és alsó korlátot kap!<br />
              Példa: <code>f : [-2; 2] → ℝ, f(x) = x² - 1</code>.<br />
              • A csúcspont (0; -1) benne van az intervallumban, így a minimum <strong>-1</strong>.<br />
              • A végpontokban: <code>f(-2) = 3</code> és <code>f(2) = 3</code>. Ezért a maximum <strong>3</strong>.<br />
              • Értékkészlet: <strong>R_f = [-1; 3]</strong>!
            </p>
          </TheoryCard>

          <TheoryCard title="Az abszolút érték: g(x) = |x² - 4|">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az <code>x² - 4</code> parabola a [-2; 2] intervallumon az x-tengely alá merül (csúcsa (0; -4)).<br />
              Ha vesszük a teljes kifejezés abszolút értékét: <code>|x² - 4|</code>, akkor az x-tengely alatti ív
              <strong> tükröződik a tengelyre</strong>!<br />
              A csúcspont (0; -4)-ből <strong>(0; 4) helyi maximumponttá</strong> válik, a zérushelyeknél (-2 és 2)
              pedig hegyes töréspontok alakulnak ki („W” alak!).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV PARABOLA LABORATÓRIUM */}
      <TheorySection
        number={5}
        title="Interaktív Parabola Laboratórium – Kísérletezz az eltolásokkal!"
        icon={<Sliders className="w-5 h-5 text-indigo-500" />}
        badge="SZIMULÁCIÓ"
        badgeColor="indigo"
      >
        {/* LABOR 1: KETTŐS ELTOLÁS SZIMULÁTOR */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-700 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-sm text-indigo-300">
                1. Dinamikus Parabola Eltoló Szimulátor: f(x) = (x - u)² + c
              </h4>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
              Csúcs: T({vertexX}; {vertexY})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Vízszintes eltolás (u):</span>
                <span className="font-bold text-indigo-400">
                  u = {shiftU} ({shiftU > 0 ? `jobbra ${shiftU}` : shiftU < 0 ? `balra ${Math.abs(shiftU)}` : 'helyben'})
                </span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={shiftU}
                onChange={(e) => setShiftU(Number(e.target.value))}
                className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Függőleges eltolás (c):</span>
                <span className="font-bold text-emerald-400">
                  c = {shiftC} ({shiftC > 0 ? `felfelé ${shiftC}` : shiftC < 0 ? `lefelé ${Math.abs(shiftC)}` : 'helyben'})
                </span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={shiftC}
                onChange={(e) => setShiftC(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Mathematical Analysis Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <div className="text-[11px] text-slate-400">Hozzárendelési szabály</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                f(x) = {shiftU === 0 ? 'x²' : shiftU > 0 ? `(x - ${shiftU})²` : `(x + ${Math.abs(shiftU)})²`}
                {shiftC > 0 ? ` + ${shiftC}` : shiftC < 0 ? ` - ${Math.abs(shiftC)}` : ''}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-indigo-500/40 text-center">
              <div className="text-[11px] text-indigo-300">Csúcspont (T)</div>
              <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">
                T({vertexX}; {vertexY})
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/40 text-center">
              <div className="text-[11px] text-emerald-300">Értékkészlet (R_f)</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                {rangeStr}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/40 text-center">
              <div className="text-[11px] text-amber-300">Zérushelyek</div>
              <div className="text-[11px] font-bold text-amber-400 mt-1 leading-snug">
                {zeroCrossings}
              </div>
            </div>
          </div>
        </div>

        {/* LABOR 2: PÁRATLAN LÉPÉSEK SZIMULÁTOR */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-700 space-y-4 mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-emerald-300">
                2. A Páratlan Lépések Törvénye (Parabola rajzolás lépésről lépésre)
              </h4>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setStepLevel(step)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    stepLevel === step
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {step}. pont
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <ParabolaOddStepSvg size={260} />
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400">Kezdőpont (Csúcspont):</span> (0; 0)
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                stepLevel >= 1 ? 'bg-slate-800 border-indigo-500/50 text-white' : 'opacity-40 border-slate-800'
              }`}>
                <strong>1. lépés:</strong> jobbra 1, <strong>fel 1-et</strong> → (1; 1) [össz. fel: 1 = 1²]
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                stepLevel >= 2 ? 'bg-slate-800 border-indigo-500/50 text-white' : 'opacity-40 border-slate-800'
              }`}>
                <strong>2. lépés:</strong> jobbra 1, <strong>fel 3-at</strong> → (2; 4) [össz. fel: 1+3 = 4 = 2²]
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                stepLevel >= 3 ? 'bg-slate-800 border-indigo-500/50 text-white' : 'opacity-40 border-slate-800'
              }`}>
                <strong>3. lépés:</strong> jobbra 1, <strong>fel 5-öt</strong> → (3; 9) [össz. fel: 1+3+5 = 9 = 3²]
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                stepLevel >= 4 ? 'bg-slate-800 border-indigo-500/50 text-white' : 'opacity-40 border-slate-800'
              }`}>
                <strong>4. lépés:</strong> jobbra 1, <strong>fel 7-et</strong> → (4; 16) [össz. fel: 1+3+5+7 = 16 = 4²]
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORLATI TANÁCSOK ÉS VIZSGATIPPEK */}
      <TheorySection
        number={6}
        title="Gyakorlati tanácsok és érettségi stratégiák"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="STRATÉGIA"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Olvasd le azonnal a csúcspontot!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bármilyen <code>(x - u)² + c</code> alakú képletnél a csúcspont koordinátái azonnal leolvashatók:
              <strong> T(u; c)</strong>. Ne bontsd fel a zárójelet feleslegesen, mert a csúcs alakból látszanak a transzformációk legtisztábban!
            </p>
          </TheoryCard>

          <TheoryCard title="2. Figyelj az előjelcsapdára!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mindig emlékezz: a zárójelen <em>belüli</em> művelet az ellenkező irányba mozgat (x - 4 jobbra 4, x + 4 balra 4),
              míg a zárójelen <em>kívüli</em> konstans a saját előjelének megfelelően tol függőlegesen (+4 fel, -4 le)!
            </p>
          </TheoryCard>

          <TheoryCard title="3. Zérushely-keresés gyökvonással">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az <code>(x - 3)² - 9 = 0</code> típusú egyenleteknél ne használj megoldóképletet!
              Add hozzá a 9-et: <code>(x - 3)² = 9</code>, majd vonj gyököt mindkét oldalból: <code>x - 3 = ±3 ⟹ x₁ = 6, x₂ = 0</code>!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

