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
  CanonicalParabolaSvg,
  CompositeAbsSvg,
  AbsOutsideSvg,
  BouncingBallModelSvg
} from './CompositeTransformFigures';
import {
  GitFork,
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
  Activity
} from 'lucide-react';

interface CompositeTransformTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CompositeTransformTheory: React.FC<CompositeTransformTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Kanonikus Transzformátor ---
  const [paramU, setParamU] = useState<number>(2); // Vízszintes eltolás
  const [paramA, setParamA] = useState<number>(-1); // Skálázás és tükrözés
  const [paramV, setParamV] = useState<number>(3); // Függőleges eltolás
  const [baseType, setBaseType] = useState<'parabola' | 'abs' | 'sqrt'>('parabola');

  // Képletszöveg számítása
  const insideStr = paramU === 0 ? 'x' : paramU > 0 ? `x - ${paramU}` : `x + ${Math.abs(paramU)}`;
  let aPrefix = '';
  if (paramA === -1) aPrefix = '-';
  else if (paramA !== 1) aPrefix = `${paramA}`;

  let vPart = '';
  if (paramV > 0) vPart = ` + ${paramV}`;
  else if (paramV < 0) vPart = ` - ${Math.abs(paramV)}`;

  let fullFormula = '';
  if (baseType === 'parabola') {
    fullFormula = paramU === 0 ? `f(x) = ${aPrefix}x²${vPart}` : `f(x) = ${aPrefix}(${insideStr})²${vPart}`;
  } else if (baseType === 'abs') {
    fullFormula = `f(x) = ${aPrefix}|${insideStr}|${vPart}`;
  } else {
    fullFormula = `f(x) = ${aPrefix}√(${insideStr})${vPart}`;
  }

  // Zérushelyek parabolánál
  let zeroCountStr = '';
  if (baseType === 'parabola' || baseType === 'abs') {
    if (paramA * paramV > 0) {
      zeroCountStr = '0 db (a görbe nem metszi az x-tengelyt)';
    } else if (paramV === 0) {
      zeroCountStr = `1 db (a csúcspontban: x = ${paramU})`;
    } else {
      zeroCountStr = '2 db (metszi az x-tengelyt)';
    }
  } else {
    // sqrt
    if ((paramA > 0 && paramV <= 0) || (paramA < 0 && paramV >= 0)) {
      zeroCountStr = '1 db zérushely';
    } else {
      zeroCountStr = '0 db zérushely';
    }
  }

  // --- Interactive Lab 2: Felhajtás szimulátor ---
  const [isFlipped, setIsFlipped] = useState<boolean>(true);

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Összetett függvénytranszformációk"
      subtitle="A kanonikus alak g(x) = a · f(x - u) + v, a műveletek helyes sorrendje és az abszolútérték-függvények felhajtott grafikonjai."
      themeColor="purple"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-purple-600 dark:text-purple-400 font-black">Kanonikus alak:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>g(x) = a \cdot f(x - u) + v</MathText> &nbsp;|&nbsp; Kitüntetett pont: <MathText>T(u; v)</MathText> vagy <MathText>V(u; v)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Szigorú sorrend:</span>
              <span className="text-slate-800 dark:text-slate-100">
                1. Vízszintes eltolás (<MathText>u</MathText>) ⟶ 2. Nyújtás/tükrözés (<MathText>a</MathText>) ⟶ 3. Függőleges eltolás (<MathText>v</MathText>)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Szélsőérték és Értékkészlet:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>a &gt; 0 ⟹</MathText> Minimum <MathText>v</MathText>, <MathText>R_f = [v; \infty[</MathText> &nbsp;|&nbsp; <MathText>a &lt; 0 ⟹</MathText> Maximum <MathText>v</MathText>, <MathText>R_f = ]-\infty; v]</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">|f(x)| felhajtása:</span>
              <span className="text-slate-800 dark:text-slate-100">
                Az <MathText>x</MathText>-tengely alatti negatív tartományt felhajtjuk (tükrözzük az <MathText>x</MathText>-tengelyre)
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A KANONIKUS ALAK */}
      <TheorySection
        number={1}
        title="A transzformációk összegzése: A kanonikus alak g(x) = a · f(x - u) + v"
        icon={<GitFork className="w-5 h-5 text-purple-500" />}
        badge="KANONIKUS ALAK"
        badgeColor="purple"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Az előző altémákban megismert elemi transzformációkat (vízszintes eltolás, nyújtás/zsugorítás, tükrözés, függőleges eltolás)
          összekapcsolva jutunk el a függvények <strong>kanonikus alakjához</strong>.
          Ez a forma a középiskolai matematika egyik leghatékonyabb eszköze, mert <strong>számolás nélkül</strong>, ránézésre leolvashatóvá teszi a grafikon minden lényeges geometriai tulajdonságát!
        </p>

        <div className="my-3 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 text-center font-bold text-base text-purple-900 dark:text-purple-200">
          <MathText>g(x) = a \cdot f(x - u) + v</MathText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block">1. u paraméter</span>
            <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block">
              <strong>Vízszintes eltolás:</strong> Ellentétes előjellel adja meg a kitüntetett pont első koordinátáját: <code>x = u</code>!
            </span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase block">2. a paraméter</span>
            <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block">
              <strong>Meredekség & Tükrözés:</strong> <code>|a|</code> nyújt/zsugorít, előjele meghatározza a nyílás irányát (+ fel, - le).
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase block">3. v paraméter</span>
            <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block">
              <strong>Függőleges eltolás:</strong> Változatlan előjellel adja meg a csúcspont második koordinátáját és a szélsőértéket: <code>y = v</code>!
            </span>
          </div>
        </div>

        <TheoryCard title="A kitüntetett pont azonnali leolvasása">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Mivel az alapfüggvény origóbeli pontja <code>(0; 0)</code> volt, a transzformáció után:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mt-1.5">
            <li>Másodfokú függvénynél: <strong>Csúcspont T(u; v)</strong>, szimmetriatengely: <code>x = u</code> függőleges egyenes.</li>
            <li>Abszolútérték-függvénynél: <strong>Töréspont V(u; v)</strong>, szimmetriatengely: <code>x = u</code>.</li>
            <li>Négyzetgyökfüggvénynél: <strong>Kezdőpont K(u; v)</strong>, értelmezési tartomány: <code>Df = [u; ∞[</code>.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A HELYES SORREND */}
      <TheorySection
        number={2}
        title="A transzformációs lépések helyes végrehajtási sorrendje"
        icon={<Layers className="w-5 h-5 text-indigo-500" />}
        badge="LÉPÉSRŐL LÉPÉSRE"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Az összetett transzformációknál kritikus a műveletek sorrendje. Ha felcseréljük a lépéseket, teljesen hibás grafikonhoz jutunk!
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
          <CanonicalParabolaSvg size={300} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-purple-600 block mb-1">1. LÉPÉS: Vízszintes eltolás</span>
            <p className="text-slate-600 dark:text-slate-300">
              <code>f(x) ⟶ f(x - u)</code><br />
              Az origót eltoljuk <code>u</code> egységgel a megfelelő irányba.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-purple-600 block mb-1">2. LÉPÉS: Skálázás és tükrözés</span>
            <p className="text-slate-600 dark:text-slate-300">
              <code>f(x - u) ⟶ a · f(x - u)</code><br />
              A csúcspontból kiindulva megszorozzuk a lépéseket <code>a</code>-val. Ha <code>a &lt; 0</code>, lefelé nyitjuk!
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-purple-600 block mb-1">3. LÉPÉS: Függőleges eltolás</span>
            <p className="text-slate-600 dark:text-slate-300">
              <code>a · f(x - u) ⟶ a · f(x - u) + v</code><br />
              A teljes alakzatot függőlegesen fel- vagy lemozgatjuk <code>v</code> egységgel.
            </p>
          </div>
        </div>

        <TheoryTrapBox title="Miért a függőleges eltolás a legutolsó lépés?">
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            Ha előbb tolnád el függőlegesen <code>v</code>-vel, majd utána szoroznád meg <code>a</code>-val,
            akkor a zárójeles szabály szerint a konstans is megszorzódna: <code>a · (f(x - u) + v) = a · f(x - u) + a · v</code>!
            Ekkor a csúcspont magassága <code>a · v</code> lenne, nem pedig <code>v</code>! Ezért mindig a szorzás jön előbb, és a függőleges hozzáadás legutoljára.
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. SZEKCIÓ: FÜGGVÉNYJELLEMZÉS ÉS ZÉRUSHELYEK */}
      <TheorySection
        number={3}
        title="Függvényjellemzés és zérushelyek száma ránézésre"
        icon={<Activity className="w-5 h-5 text-emerald-500" />}
        badge="JELLEMZÉS"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szélsőérték és Értékkészlet meghatározása">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az <code>a</code> előjele és a <code>v</code> magasság azonnal megadja az értékkészletet:
            </p>
            <div className="my-2 p-2 bg-slate-50 dark:bg-slate-900/80 rounded-lg text-xs space-y-1 font-mono">
              <div>• Ha <strong>a &gt; 0</strong>: Minimum van x = u helyen, értéke: <strong>v</strong> ⟹ <strong>Rf = [v; ∞[</strong></div>
              <div>• Ha <strong>a &lt; 0</strong>: Maximum van x = u helyen, értéke: <strong>v</strong> ⟹ <strong>Rf = ]-∞; v]</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard title="Zérushelyek száma algebrai egyenletmegoldás nélkül">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Képzeld el a csúcspont helyzetét és a szárak nyílását:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
              <li><strong>2 zérushely:</strong> ha a csúcs az x-tengely alatt van és felfelé nyílik (<code>v &lt; 0, a &gt; 0</code>), vagy a tengely felett van és lefelé nyílik (<code>v &gt; 0, a &lt; 0</code>).</li>
              <li><strong>1 zérushely:</strong> ha a csúcs pontosan az x-tengelyen van (<code>v = 0</code>).</li>
              <li><strong>0 zérushely:</strong> ha a csúcs fent van és felfelé nyílik, vagy lent van és lefelé nyílik (nem éri el a tengelyt).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABOR 1: KANONIKUS TRANSZFORMÁTOR */}
      <TheorySection
        number={4}
        title="Interaktív Labor 1: Univerzális Kanonikus Transzformátor"
        icon={<Sliders className="w-5 h-5 text-purple-500" />}
        badge="INTERAKTÍV LABOR"
        badgeColor="purple"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Állítsd be az <code>u</code> (vízszintes), <code>a</code> (skálázó/tükröző) és <code>v</code> (függőleges) paramétereket!
          Figyeld meg a képlet változását, a kitüntetett pont helyzetét és a dinamikus grafikont!
        </p>

        {/* Modellválasztó */}
        <div className="flex flex-wrap gap-2 my-3">
          {[
            { id: 'parabola', label: 'Másodfokú: a(x - u)² + v', icon: '📈' },
            { id: 'abs', label: 'Abszolútérték: a|x - u| + v', icon: '✌️' },
            { id: 'sqrt', label: 'Négyzetgyök: a√(x - u) + v', icon: '🌱' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setBaseType(item.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                baseType === item.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3 Csúszka */}
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-amber-600 dark:text-amber-400">Vízszintes eltolás (u):</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 font-mono">
                    u = {paramU > 0 ? `+${paramU}` : paramU}
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="1"
                  value={paramU}
                  onChange={(e) => setParamU(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-indigo-600 dark:text-indigo-400">Skálázás & Tükrözés (a):</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 font-mono">
                    a = {paramA}
                  </span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="1"
                  value={paramA}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setParamA(val === 0 ? 1 : val);
                  }}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-emerald-600 dark:text-emerald-400">Függőleges eltolás (v):</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 font-mono">
                    v = {paramV > 0 ? `+${paramV}` : paramV}
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="1"
                  value={paramV}
                  onChange={(e) => setParamV(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Számított adatok */}
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kanonikus képlet:</span>
                  <span className="font-mono font-black text-purple-600 dark:text-purple-400 text-sm">
                    {fullFormula}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kitüntetett pont:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    T({paramU}; {paramV})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Zérushelyek száma:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {zeroCountStr}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Értékkészlet (Rf):</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {paramA > 0 ? `[${paramV}; ∞[` : `]-∞; ${paramV}]`}
                  </span>
                </div>
              </div>
            </div>

            {/* Dinamikus SVG nézet */}
            <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="-80 -80 160 160" width={220} height={220} className="overflow-visible select-none drop-shadow-sm">
                <line x1="-70" y1="0" x2="70" y2="0" stroke="#94a3b8" strokeWidth="1" />
                <line x1="0" y1="70" x2="0" y2="-70" stroke="#94a3b8" strokeWidth="1" />
                <text x="64" y="10" fill="#64748b" fontSize="8">x</text>
                <text x="-10" y="-62" fill="#64748b" fontSize="8">y</text>

                {(() => {
                  const pxU = paramU * 15;
                  const pxV = -paramV * 15;
                  const strokeColor = paramA > 0 ? '#7c3aed' : '#e11d48';

                  if (baseType === 'parabola') {
                    const spanY = -35 * paramA;
                    return (
                      <path
                        d={`M ${pxU - 40} ${pxV + spanY} Q ${pxU} ${pxV} ${pxU + 40} ${pxV + spanY}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                      />
                    );
                  } else if (baseType === 'abs') {
                    const spanY = -40 * paramA;
                    return (
                      <path
                        d={`M ${pxU - 40} ${pxV + spanY} L ${pxU} ${pxV} L ${pxU + 40} ${pxV + spanY}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                      />
                    );
                  } else {
                    const spanY = -35 * paramA;
                    return (
                      <path
                        d={`M ${pxU} ${pxV} Q ${pxU + 20} ${pxV + spanY * 0.6} ${pxU + 50} ${pxV + spanY}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                      />
                    );
                  }
                })()}

                {/* Kitüntetett pont */}
                <circle cx={paramU * 15} cy={-paramV * 15} r="3.5" fill="#0f172a" />
              </svg>
              <span className="text-[11px] text-slate-500 mt-2 font-mono">
                T({paramU}; {paramV})
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ABSZOLÚTÉRTÉK KÍVÜL ÉS BELÜL */}
      <TheorySection
        number={5}
        title="A külső abszolútérték felhajtási szabálya: g(x) = |f(x)|"
        icon={<Sparkles className="w-5 h-5 text-rose-500" />}
        badge="FELHAJTÁS"
        badgeColor="rose"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Az érettségik és versenyek egyik legkedveltebb feladata a <strong>külső abszolútérték</strong> vizsgálata: <code>g(x) = |f(x)|</code>.
          Mivel az abszolútérték semmilyen negatív számot nem hagy meg, a grafikon azon részeit, amelyek az <strong>x-tengely alá süllyednének</strong> (negatív függvényértékek),
          <strong>felhajtjuk az x-tengely fölé</strong> (tükrözzük az x-tengelyre)!
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
          <AbsOutsideSvg size={280} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <TheoryCard title="Példa: f(x) = |x² - 4|">
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>Megrajzoljuk a belső <code>x² - 4</code> parabolát: csúcspont <code>(0; -4)</code>, zérushelyek: <code>x = ±2</code>.</li>
              <li>Ahol a függvény nemnegatív (<code>x ≤ -2</code> és <code>x ≥ 2</code>), a grafikon változatlan marad.</li>
              <li>A <code>]-2; 2[</code> intervallumon a negatív hurok felhajlik: az eredeti <code>(0; -4)</code> csúcsból egy <strong>(0; 4) helyi maximum</strong> lesz!</li>
              <li>Egy jellegzetes <strong>W-alakú</strong> görbe keletkezik, melynek értékkészlete <code>[0; ∞[</code>.</li>
            </ol>
          </TheoryCard>

          <TheoryCard title="Mi a különbség: |f(x)| vs. f(|x|)?">
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>|f(x)| (Külső abszolútérték):</strong> Az x-tengely alatti részt hajtjuk fel függőlegesen. A görbe soha nem megy az x-tengely alá.</li>
              <li><strong>f(|x|) (Belső abszolútérték):</strong> A bal oldalt (x &lt; 0) letöröljük, és a jobb oldali képet (x ≥ 0) áttükrözzük az <strong>y-tengelyre</strong>. Mindig <em>páros függvény</em> keletkezik!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORLATI MODELLEZÉS */}
      <TheorySection
        number={6}
        title="Gyakorlati modellezés a tankönyvből: Pattogó labda és vályú keresztmetszet"
        icon={<Activity className="w-5 h-5 text-amber-500" />}
        badge="VALÓS ALKALMAZÁS"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A való világban az összetett másodfokú összefüggések a hajítások, ugrások és területi optimumok leírására szolgálnak:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-2 uppercase text-center">
              A pattogó labda pályája
            </h4>
            <BouncingBallModelSvg size={240} />
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Két talajérintés között a labda pályája egy lefelé nyíló parabola. Ha a labda 0-nál és 80 cm-nél érinti a talajt,
              akkor a parabola szimmetriája miatt a legmagasabb pont pontosan <strong>felezőnél, 40 cm-nél</strong> van!
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2 uppercase text-center">
              A vályú keresztmetszetének maximuma
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Egy 10 cm széles fémlemez két szélét felhajtva a keresztmetszet területe:
              <code>T(x) = x · (10 - 2x) = 10x - 2x² = -2(x - 2,5)² + 12,5</code>.
            </p>
            <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-xs font-mono text-emerald-900 dark:text-emerald-200">
              Csúcspont T(2,5; 12,5) ⟹ x = 2,5 cm felhajtásnál maximális a terület (12,5 cm²)!
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: TIPIKUS VIZSGATÉVESZTÉSEK */}
      <TheorySection
        number={7}
        title="Tipikus buktatók az összetett feladatoknál"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Buktató: f(x) = -(x - 3)² + 4 csúcspontja">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Sokan azt hiszik, hogy a zárójel előtti mínuszjel a csúcspont x-koordinátájára is hat.
              <strong>Nem!</strong> A csúcspont továbbra is <code>T(3; 4)</code>, a mínuszjel kizárólag a szárak lefelé nyílását jelenti!
            </p>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Buktató: f(x) = |x - 2| - 5 zérushelyei">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Nem elég a töréspontot nézni! <code>|x - 2| - 5 = 0 ⟹ |x - 2| = 5</code>, ebből két zérushely adódik: <code>x₁ = 7</code> és <code>x₂ = -3</code>!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

