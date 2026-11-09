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
  ParabolaStretchSvg,
  ParabolaReflectionSvg,
  AbsFunctionStretchSvg,
  ParabolaFocusDirectrixSvg
} from './StretchTransformFigures';
import {
  Maximize2,
  TrendingDown,
  TrendingUp,
  Sliders,
  Scale,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Layers,
  ArrowRight,
  Focus
} from 'lucide-react';

interface StretchTransformTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const StretchTransformTheory: React.FC<StretchTransformTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Merőleges Affinitás & Tükrözés Szimulátor ---
  const [factorA, setFactorA] = useState<number>(1.5);
  const [modelType, setModelType] = useState<'parabola' | 'abs' | 'sqrt'>('parabola');

  // Számított állapotok
  const absA = Math.abs(factorA);
  const isReflected = factorA < 0;
  const isStretched = absA > 1;
  const isCompressed = absA > 0 && absA < 1;
  const isZero = factorA === 0;

  let shapeDescription = 'normál meredekségű';
  if (isStretched) shapeDescription = '„soványabb” (nyújtott, meredekebb)';
  else if (isCompressed) shapeDescription = '„kövérebb” (zsugorított, laposabb)';
  else if (isZero) shapeDescription = 'nullafüggvény (egybeesik az x-tengellyel)';

  let extremeType = factorA >= 0 ? 'Minimuma van' : 'Maximuma van';
  let rangeStr = factorA > 0 ? '[0; ∞[' : factorA < 0 ? ']-∞; 0]' : '{0}';

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="„Soványabb”, „kövérebb”"
      subtitle="A függvénygrafikonok függőleges nyújtása, zsugorítása és tükrözése az x-tengelyre: a g(x) = a · f(x) transzformáció geometriai és algebrai jelentése."
      themeColor="emerald"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Merőleges affinitás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>g(x) = a \cdot f(x)</MathText> &nbsp;|&nbsp; Minden pont: <MathText>(x; y) \longmapsto (x; a \cdot y)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">|a| &gt; 1 (Nyújtás):</span>
              <span className="text-slate-800 dark:text-slate-100">
                „Soványabb”, keskenyebb, meredekebb görbe (pl. <MathText>2x²</MathText>, <MathText>3|x|</MathText>)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-teal-600 dark:text-teal-400 font-black">0 &lt; |a| &lt; 1 (Zsugorítás):</span>
              <span className="text-slate-800 dark:text-slate-100">
                „Kövérebb”, szélesebb, laposabb görbe (pl. <MathText>0,5x²</MathText>, <MathText>{"(1/3)|x|"}</MathText>)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">a &lt; 0 (Tükrözés az x-tengelyre):</span>
              <span className="text-slate-800 dark:text-slate-100">
                Szárai lefelé nyílnak, a minimumból maximum lesz, <MathText>R_f = ]-\infty; 0]</MathText>!
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A SZORZÓTÉNYEZŐ SZEREPE */}
      <TheorySection
        number={1}
        title="A szorzótényező szerepe: Merőleges affinitás az x-tengelyre"
        icon={<Maximize2 className="w-5 h-5 text-emerald-500" />}
        badge="ALAPFOGALOM"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Amikor egy függvény hozzárendelési szabályát megszorozzuk egy <strong>a ≠ 0</strong> valós számmal:
          <code>g(x) = a · f(x)</code>, a függvény grafikonja geometriailag <strong>merőleges affinitáson</strong> megy keresztül.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <TheoryCard title="Pontok koordinátáinak viselkedése">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Minden egyes <code>P(x; y)</code> pont átkerül a <code>P'(x; a · y)</code> pontba:
            </p>
            <div className="my-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center font-bold text-xs text-emerald-900 dark:text-emerald-200">
              <MathText>P(x; y) \longmapsto P'(x; a \cdot y)</MathText>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>Az <strong>x-koordináta változatlan</strong> marad.</li>
              <li>Az <strong>y-koordináta a-szorosára</strong> változik.</li>
              <li>Ahol a függvény értéke 0 volt (zérushelyek), ott <code>a · 0 = 0</code>, így a <strong>zérushelyek helye nem változik</strong>!</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="A csúcspont stabilitása">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha az alapfüggvény csúcspontja vagy töréspontja az origóban volt: <code>T(0; 0)</code>,
              akkor az <code>a · f(x)</code> szorzás után a pont az <code>(0; a · 0) = (0; 0)</code> helyen marad!
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              A szorzás tehát <strong>nem tolja el</strong> a tengelypontot, csupán a szárak meredekségét (nyílását) és irányát változtatja meg!
            </p>
          </TheoryCard>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-2">
          <ParabolaStretchSvg size={280} />
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: NYÚJTÁS ÉS ZSUGORÍTÁS */}
      <TheorySection
        number={2}
        title="Nyújtás és zsugorítás: |a| > 1 („soványabb”) vs. |a| < 1 („kövérebb”)"
        icon={<Scale className="w-5 h-5 text-indigo-500" />}
        badge="SKÁLÁZÁS"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A grafikon „alakját” az együttható abszolút értéke, azaz a <strong>|a|</strong> határozza meg:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
            <h4 className="text-sm font-black text-indigo-900 dark:text-indigo-300 mb-1.5 flex items-center gap-1.5">
              <span>1. |a| &gt; 1: Nyújtás („soványabb” parabola)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Példák: <code>f(x) = 2x²</code>, <code>f(x) = 3x²</code>, <code>f(x) = -4x²</code>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Mivel a függőleges értékek nagyobbak, a parabola szárai sokkal meredekebben emelkednek. A görbe optikailag összeszűkül, „sovánnyá” válik.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800">
            <h4 className="text-sm font-black text-teal-900 dark:text-teal-300 mb-1.5 flex items-center gap-1.5">
              <span>2. 0 &lt; |a| &lt; 1: Zsugorítás („kövérebb” parabola)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Példák: <code>f(x) = 0,5x² = 1/2 x²</code>, <code>f(x) = 0,2x²</code>, <code>f(x) = -0,25x²</code>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              A függvényértékek a töredékükre csökkennek, így a görbe ellaposodik, kitárul, „kövér”, öblös formát vesz fel.
            </p>
          </div>
        </div>

        <TheoryCallout title="A szorzás hatása a páratlan lépések szabályára" variant="tip">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Az <code>f(x) = x²</code> normálparabola esetén a csúcspontból indulva vízszintesen 1-et lépve sorban <strong>1, 3, 5, 7</strong> egységet léptünk fel.
            Az <code>f(x) = a · x²</code> esetén ezek a lépések <strong>a-szorosukra módosulnak</strong>:
          </p>
          <div className="mt-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
            • <code>a = 2</code> esetén: <strong>2, 6, 10, 14</strong> egységet lépünk fel!<br />
            • <code>a = 0,5</code> esetén: <strong>0,5; 1,5; 2,5; 3,5</strong> egységet lépünk fel!
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÜKRÖZÉS AZ X-TENGELYRE */}
      <TheorySection
        number={3}
        title="Tükrözés az x-tengelyre: a < 0 és a szélsőérték átfordulása"
        icon={<TrendingDown className="w-5 h-5 text-rose-500" />}
        badge="TÜKRÖZÉS"
        badgeColor="rose"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ha az <code>a</code> együttható negatív (pl. <code>-x²</code>, <code>-2x²</code>, <code>-0,5|x|</code>), akkor az abszolút érték szerinti
          nyújtás mellett egy <strong>tükrözés történik az x-tengelyre</strong>!
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
          <ParabolaReflectionSvg size={280} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <TheoryCard title="Mi történik a szélsőértékkel?">
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>a &gt; 0:</strong> A parabola felfelé nyílik ⟹ <strong>Globális minimuma</strong> van az origóban (értéke: 0). Értékkészlet: <code>[0; ∞[</code>.</li>
              <li><strong>a &lt; 0:</strong> A parabola lefelé nyílik ⟹ <strong>Globális maximuma</strong> lesz az origóban (értéke: 0)! Értékkészlet: <code>]-∞; 0]</code>.</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Mi történik a monotonitással?">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A tükrözés miatt a növekedési viszonyok teljesen megfordulnak:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mt-1.5">
              <li>A <code>]-∞; 0]</code> intervallumon a függvény most <strong>szigorúan monoton nő</strong> (a negatív mélységből felér a csúcsra).</li>
              <li>A <code>[0; ∞[</code> intervallumon pedig <strong>szigorúan monoton csökken</strong>!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABOR 1: SKÁLÁZÁS ÉS TÜKRÖZÉS CSÚSZKA */}
      <TheorySection
        number={4}
        title="Interaktív Labor 1: Merőleges Affinitás és Tükrözés Szimulátor"
        icon={<Sliders className="w-5 h-5 text-emerald-500" />}
        badge="INTERAKTÍV SZIMULÁCIÓ"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Mozgasd az <code>a</code> együttható csúszkáját a negatív és pozitív tartományban!
          Figyeld meg a görbe formáját, a meredekségét, a szárak nyílását és az értékkészlet változását!
        </p>

        {/* Modellválasztó */}
        <div className="flex flex-wrap gap-2 my-3">
          {[
            { id: 'parabola', label: 'Másodfokú: a · x²', icon: '📈' },
            { id: 'abs', label: 'Abszolútérték: a · |x|', icon: '✌️' },
            { id: 'sqrt', label: 'Négyzetgyök: a · √x', icon: '🌱' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setModelType(item.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                modelType === item.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-105'
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
            {/* Csúszka és infók */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Szorzótényező (a):</span>
                  <span className={`px-2.5 py-0.5 rounded font-mono font-black ${
                    factorA > 0
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                      : factorA < 0
                      ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    a = {factorA.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.25"
                  value={factorA}
                  onChange={(e) => setFactorA(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>-3.0 (nyújtott, lefelé)</span>
                  <span>0.0</span>
                  <span>+3.0 (nyújtott, felfelé)</span>
                </div>
              </div>

              {/* Jellemzők kártya */}
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Alak jellemzése:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {shapeDescription}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nyílás iránya:</span>
                  <span className={`font-black ${factorA >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {factorA > 0 ? 'Felfelé nyíló (konvex)' : factorA < 0 ? 'Lefelé nyíló (konkáv)' : 'Vízszintes egyenes'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Szélsőérték:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {extremeType} (értéke: 0)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Értékkészlet (Rf):</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {rangeStr}
                  </span>
                </div>
              </div>
            </div>

            {/* Dinamikus SVG grafikon */}
            <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="-80 -80 160 160" width={220} height={220} className="overflow-visible select-none drop-shadow-sm">
                <line x1="-70" y1="0" x2="70" y2="0" stroke="#94a3b8" strokeWidth="1" />
                <line x1="0" y1="70" x2="0" y2="-70" stroke="#94a3b8" strokeWidth="1" />
                <text x="64" y="10" fill="#64748b" fontSize="8">x</text>
                <text x="-10" y="-62" fill="#64748b" fontSize="8">y</text>

                {/* Referencia görbe (normál x², |x|, vagy √x) */}
                {modelType === 'parabola' && (
                  <path d="M -40 -32 Q 0 0 40 -32" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
                )}
                {modelType === 'abs' && (
                  <path d="M -40 -40 L 0 0 L 40 -40" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
                )}

                {/* Dinamikusan transzformált görbe */}
                {(() => {
                  const strokeColor = factorA >= 0 ? '#059669' : '#e11d48';

                  if (modelType === 'parabola') {
                    // Pontok: x=40, normál y = 32px fel (-32). FactorA-val: -32 * (factorA / 2)
                    const endY = -35 * factorA;
                    return (
                      <path
                        d={`M -45 ${endY} Q 0 0 45 ${endY}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                      />
                    );
                  } else if (modelType === 'abs') {
                    const endY = -45 * factorA;
                    return (
                      <path
                        d={`M -45 ${endY} L 0 0 L 45 ${endY}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                      />
                    );
                  } else {
                    // sqrt
                    const endY = -35 * factorA;
                    return (
                      <path
                        d={`M 0 0 Q 20 ${endY * 0.6} 55 ${endY}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                      />
                    );
                  }
                })()}

                <circle cx="0" cy="0" r="3.5" fill="#0f172a" />
              </svg>
              <span className="text-[11px] text-slate-500 mt-2 font-mono">
                {modelType === 'parabola' ? `${factorA.toFixed(2)}x²` : modelType === 'abs' ? `${factorA.toFixed(2)}|x|` : `${factorA.toFixed(2)}√x`}
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: MÁS FÜGGVÉNYCSALÁDOK NYÚJTÁSA */}
      <TheorySection
        number={5}
        title="Nyújtás és tükrözés más függvénycsaládokon: Abszolútérték és Négyzetgyök"
        icon={<Layers className="w-5 h-5 text-purple-500" />}
        badge="FÜGGVÉNYCSALÁDOK"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2 uppercase text-center">
              Abszolútérték-függvény skálázása: f(x) = a · |x|
            </h4>
            <AbsFunctionStretchSvg size={240} />
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p>• A grafikon szárainak <strong>meredeksége</strong> pontosan <code>±a</code> lesz.</p>
              <p>• <code>2|x|</code> esetén a szár kétszer olyan meredek (1 egység jobbra ⟶ 2 egység fel).</p>
              <p>• <code>-0,5|x|</code> esetén a szár lefelé néz és feleolyan meredek.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2 uppercase text-center">
              Négyzetgyökfüggvény skálázása: f(x) = a · √x
            </h4>
            <div className="p-2 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p>• Ha <code>a &gt; 0</code>: a gyökív az I. síknegyedben fut, értékkészlete <code>Rf = [0; ∞[</code>.</p>
              <p>• Ha <code>a &lt; 0</code>: a gyökív tükröződik a IV. síknegyedbe! Értékkészlete <code>Rf = ]-∞; 0]</code> lesz.</p>
              <p>• <em>Fontos:</em> Az értelmezési tartomány ekkor is <code>Df = [0; ∞[</code> marad, mert a gyök alatt változatlanul pozitív <code>x</code> áll!</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: A PARABOLA GEOMETRIAI DEFINÍCIÓJA */}
      <TheorySection
        number={6}
        title="Ráadás a tankönyvből: Mi a parabola valójában?"
        icon={<Focus className="w-5 h-5 text-blue-500" />}
        badge="GEOMETRIAI HÁTTÉR"
        badgeColor="blue"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A geometriában a parabola nem pusztán egy másodfokú algebrai kifejezés grafikonja, hanem egy ősi, elegáns mértani hely:
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
          <ParabolaFocusDirectrixSvg size={280} />
        </div>

        <TheoryCard title="A parabola mértani definíciója">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Vegyünk fel a síkban egy <strong>F</strong> pontot (a <em>fókuszt</em>) és egy rá nem illeszkedő <strong>v</strong> egyenest (a <em>vezéregyenest</em>).
          </p>
          <div className="my-2 p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-bold text-xs text-blue-900 dark:text-blue-200">
            A sík azon pontjainak halmaza, amelyek a fókusztól és a vezéregyenestől egyenlő távolságra vannak: d(P, F) = d(P, v).
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Ezért működnek a parabolaantennák és a reflektorok: a fókuszból induló fénysugarakat a parabola párhuzamos nyalábbá veri vissza!
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 7. SZEKCIÓ: TIPIKUS CSAPDÁK */}
      <TheorySection
        number={7}
        title="Tipikus buktatók az előjelekkel és zárójelekkel"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Csapda: -x² vs. (-x)²">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Óriási különbség!
            </p>
            <div className="my-1.5 p-2 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <div><strong className="text-rose-600">-x² = -(x²)</strong>: Tükrözött, lefelé nyíló parabola!</div>
              <div><strong className="text-emerald-600">(-x)² = x²</strong>: Negatív szám négyzete pozitív, ez megegyezik a normálparabolával!</div>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Csapda: -2x² vs. -(2x)²">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Figyeld a hatványozás és szorzás sorrendjét:
            </p>
            <div className="my-1.5 p-2 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <div>• <code>-2x² = -2 · (x²)</code>: Kétszeresen nyújtott, lefelé nyíló.</div>
              <div>• <code>-(2x)² = -(4x²) = -4x²</code>: Négyszeresen nyújtott, lefelé nyíló!</div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

