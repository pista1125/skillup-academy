import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  MoveHorizontal,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Layers,
  ArrowRight,
  Divide,
  Plus,
  Minus,
  Maximize2,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText, Fraction } from '@/components/math/shared/MathText';

export interface FractionsNumberLineTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function FractionsNumberLineTheory({ onBack, onStartQuiz }: FractionsNumberLineTheoryProps) {
  // Interactive Number Line State
  const [activeDen, setActiveDen] = useState<number>(4);
  const [activeNum, setActiveNum] = useState<number>(7);

  // Conversion calculator 1: Improper to Mixed
  const [calcImpNum, setCalcImpNum] = useState<number>(17);
  const [calcImpDen, setCalcImpDen] = useState<number>(5);

  // Conversion calculator 2: Mixed to Improper
  const [calcMixWhole, setCalcMixWhole] = useState<number>(3);
  const [calcMixNum, setCalcMixNum] = useState<number>(2);
  const [calcMixDen, setCalcMixDen] = useState<number>(5);

  // Calculations for interactive line
  const wholePart = Math.floor(activeNum / activeDen);
  const remainderPart = activeNum % activeDen;
  const decimalValue = activeDen > 0 ? (activeNum / activeDen).toFixed(2).replace(/\.?0+$/, '') : '0';

  // Calculations for Calculator 1 (Improper -> Mixed)
  const calc1Whole = Math.floor(calcImpNum / calcImpDen);
  const calc1Rem = calcImpNum % calcImpDen;

  // Calculations for Calculator 2 (Mixed -> Improper)
  const calc2ImpNum = calcMixWhole * calcMixDen + calcMixNum;

  // Number line rendering bounds (0 to 4)
  const maxWhole = 4;
  const totalSubdivisions = maxWhole * activeDen;

  return (
    <TheoryTemplate
      title="Törtek ábrázolása számegyenesen, vegyes törtek"
      subtitle="Egységszakaszok beosztása, törtek leolvasása és elhelyezése, valamint az áltörtek és vegyes törtek oda-vissza átváltása"
      documentId="fractions-number-line-theory-content"
      pdfFilename="5_osztaly_tortek_szamegyenesen_vegyes_tortek_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="blue"
      badgeText="📏 5. Osztály • II. Törtek, tizedes törtek"
      quickRule={{
        label: "Vegyes tört átváltás",
        formula: "Áltört: a/b = egész + maradék/b | Vegyes tört: e a/b = (e · b + a)/b"
      }}
      practiceTitle="Készen állsz a számegyenes és a vegyes törtek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: A SZÁMEGYENES FELOSZTÁSA ÉS A TÖRTEK HELYE */}
      <TheorySection
        number={1}
        title="A számegyenes beosztása törtrészekre"
        icon={<MoveHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ahogyan az egész számokat, úgy a <strong>törteket is pontosan elhelyezhetjük a számegyenesen</strong>. A törtek ábrázolásának legelső és legfontosabb lépése a számegyenes <strong>egységszakaszának felosztása</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Egységszakasz (0 és 1 távolsága)" badge="Alaplépés" variant="blue">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A 0 és az 1 közötti távolság az <strong>1 egész egység</strong>. Ugyanekkora távolság van az 1 és 2, illetve a 2 és 3 között is.
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-center font-bold text-blue-800 dark:text-blue-300 text-xs">
              0-tól 1-ig = 1 egység
            </div>
          </TheoryCard>

          <TheoryCard title="2. A nevező szerepe a beosztásban" badge="Lépésköz" variant="blue">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A tört <strong>nevezője</strong> mutatja meg, hogy az 1 egész egységszakaszt <strong>hány egyenlő kis részre</strong> kell felosztanunk!
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-center font-bold text-blue-800 dark:text-blue-300 text-xs">
              pl. 4-es nevező = 4 egyenlő rész
            </div>
          </TheoryCard>

          <TheoryCard title="3. A számláló szerepe: Lépések száma" badge="Elmozdulás" variant="blue">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A 0 pontból kiindulva a <strong>számláló által jelzett számú</strong> beosztást kell jobbra lépkednünk az egységtörtekkel.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center gap-1.5">
              <span>pl. <MathText>3/4</MathText> = 3 lépés</span>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="info" title="Számegyenes beosztási útmutató">
          <ul className="list-disc list-inside space-y-1 mt-1 text-xs sm:text-sm">
            <li>Ha a tört nevezője <strong>2</strong> (fél), az egységet <strong>2 egyenlő részre</strong> osztjuk (felezőpont: <MathText>1/2</MathText>).</li>
            <li>Ha a tört nevezője <strong>3</strong> (harmad), az egységet <strong>3 egyenlő részre</strong> osztjuk (<MathText>1/3, 2/3, 3/3 = 1</MathText>).</li>
            <li>Ha a tört nevezője <strong>4</strong> (negyed), az egységet <strong>4 egyenlő részre</strong> osztjuk (<MathText>1/4, 2/4, 3/4, 4/4 = 1</MathText>).</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZAKASZ: VALÓDI TÖRTEK ÉS ÁLTÖRTEK A SZÁMEGYENESEN */}
      <TheorySection
        number={2}
        title="Törtek helye az egész számokhoz viszonyítva"
        icon={<Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A számegyenesen azonnal láthatóvá válik egy tört valódi nagysága és értéke:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
            <span className="font-black text-sm text-emerald-800 dark:text-emerald-300">
              1. Valódi törtek: 0 és 1 között
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mivel számlálójuk kisebb a nevezőnél, mindig a <strong>0 és az 1 egész közé</strong> esnek a számegyenesen.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <MathText>0 &lt; 1/4 &lt; 2/4 &lt; 3/4 &lt; 1</MathText>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
            <span className="font-black text-sm text-blue-800 dark:text-blue-300">
              2. Egész számot adó törtek
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ha a számláló a nevező többszöröse, a tört <strong>pontosan egy egész szám jelölésére</strong> esik.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-blue-700 dark:text-blue-400">
              <MathText>4/4 = 1, 8/4 = 2, 12/4 = 3</MathText>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
            <span className="font-black text-sm text-amber-800 dark:text-amber-300">
              3. Áltörtek: 1-nél nagyobbak
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Túlhaladnak az 1 egészen, ezért <strong>1-től jobbra</strong> helyezkednek el (pl. az 1 és 2 vagy a 2 és 3 között).
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-amber-700 dark:text-amber-400">
              <MathText>5/4 = 1 1/4 &gt; 1</MathText>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: A VEGYES TÖRT FOGALMA ÉS KÉTIRÁNYÚ ÁTVÁLTÁSA */}
      <TheorySection
        number={3}
        title="A vegyes tört fogalma és átváltási szabályai"
        icon={<RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Az 1-nél nagyobb törteket (áltörteket) nagyon gyakran <strong>vegyes szám</strong> (vagy <strong>vegyes tört</strong>) alakban írjuk fel. A vegyes tört egy <strong>egész számból és egy valódi törtből</strong> áll.
        </p>

        {/* Big Rule Box 1: Improper to Mixed */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>1. Szabály: Áltört átírása Vegyes tört alakba</span>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            1. Oszd el a <strong>számlálót a nevezővel</strong>!<br />
            2. Az <strong>egész hányados</strong> lesz a vegyes tört egész része.<br />
            3. Az <strong>osztás maradéka</strong> lesz az új számláló, a nevező változatlan marad.
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-sm sm:text-base tracking-wider border border-white/20">
            <MathText>7/4 = 7 : 4 = 1 (maradék 3) ⟹ 1 3/4</MathText>
          </div>
        </div>

        {/* Big Rule Box 2: Mixed to Improper */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>2. Szabály: Vegyes tört átírása Áltört alakba</span>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            1. Szorozd meg az <strong>egész részt a nevezővel</strong> (megkapod, hány szelet van az egészekben)!<br />
            2. <strong>Add hozzá a számlálót</strong> (összes szelet száma)!<br />
            3. Az így kapott szám lesz az áltört számlálója, a nevező változatlan marad.
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-sm sm:text-base tracking-wider border border-white/20">
            <MathText>2 3/5 = (2 · 5 + 3)/5 = (10 + 3)/5 = 13/5</MathText>
          </div>
        </div>

        {/* Step-by-step interactive conversion calculators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Calculator 1 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-blue-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-blue-800 dark:text-blue-300 uppercase">
                🔄 Áltört ➔ Vegyes tört
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                Osztás maradékkal
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Számláló</label>
                <input
                  type="number"
                  value={calcImpNum}
                  onChange={(e) => setCalcImpNum(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-2.5 py-1.5 rounded-xl border bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                />
              </div>
              <span className="font-bold text-slate-400 pt-4">/</span>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Nevező</label>
                <input
                  type="number"
                  value={calcImpDen}
                  onChange={(e) => setCalcImpDen(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-2.5 py-1.5 rounded-xl border bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                />
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5 text-center">
              <div>
                <MathText size="md">{calcImpNum}/{calcImpDen}</MathText> = {calcImpNum} : {calcImpDen} = <strong className="text-blue-600">{calc1Whole}</strong> (maradék: <strong className="text-orange-600">{calc1Rem}</strong>)
              </div>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Eredmény: {calc1Whole > 0 ? `${calc1Whole} ` : ''}
                {calc1Rem > 0 ? <MathText size="lg">{calc1Rem}/{calcImpDen}</MathText> : '(pontos egész)'}
              </div>
            </div>
          </div>

          {/* Calculator 2 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300 uppercase">
                🔄 Vegyes tört ➔ Áltört
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Szorzás + összeadás
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-16 space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Egész</label>
                <input
                  type="number"
                  value={calcMixWhole}
                  onChange={(e) => setCalcMixWhole(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-2 py-1.5 rounded-xl border bg-white dark:bg-slate-900 font-mono font-bold text-xs text-center"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Számláló</label>
                <input
                  type="number"
                  value={calcMixNum}
                  onChange={(e) => setCalcMixNum(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-2 py-1.5 rounded-xl border bg-white dark:bg-slate-900 font-mono font-bold text-xs text-center"
                />
              </div>
              <span className="font-bold text-slate-400 pt-4">/</span>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Nevező</label>
                <input
                  type="number"
                  value={calcMixDen}
                  onChange={(e) => setCalcMixDen(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-2 py-1.5 rounded-xl border bg-white dark:bg-slate-900 font-mono font-bold text-xs text-center"
                />
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5 text-center">
              <div>
                ({calcMixWhole} · {calcMixDen} + {calcMixNum}) / {calcMixDen} = ({calcMixWhole * calcMixDen} + {calcMixNum}) / {calcMixDen}
              </div>
              <div className="text-sm font-black text-blue-600 dark:text-blue-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Eredmény: <MathText size="lg">{calc2ImpNum}/{calcMixDen}</MathText>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV SZÁMEGYENES LABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív Számegyenes Műhely"
        icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Állítsd be az egység felosztását (nevező) és a lépések számát (számláló)! Figyeld meg valós időben a pont helyzetét a számegyenesen:
        </p>

        <div className="bg-slate-50 dark:bg-slate-850 p-5 sm:p-7 rounded-3xl border-2 border-blue-200 dark:border-slate-700 space-y-6">
          {/* Controllers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Denominator Selector */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                  Egység felosztása (Nevező)
                </span>
                <span className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">
                  {activeDen} részre
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[2, 3, 4, 5, 6, 8].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setActiveDen(d);
                      if (activeNum > maxWhole * d) setActiveNum(maxWhole * d);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border",
                      activeDen === d
                        ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {d}-edek
                  </button>
                ))}
              </div>
            </div>

            {/* Numerator Stepper */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                  Lépések a 0-tól (Számláló)
                </span>
                <span className="text-lg font-black font-mono text-orange-600 dark:text-orange-400">
                  {activeNum} lépés
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveNum(Math.max(0, activeNum - 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <input
                  type="range"
                  min="0"
                  max={maxWhole * activeDen}
                  value={activeNum}
                  onChange={(e) => setActiveNum(Number(e.target.value))}
                  className="flex-1 accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveNum(Math.min(maxWhole * activeDen, activeNum + 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive SVG Number Line */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 overflow-x-auto">
            <div className="min-w-[540px] py-4">
              <svg viewBox="0 0 600 120" className="w-full h-auto overflow-visible select-none">
                {/* Main Axis Line */}
                <line x1="30" y1="60" x2="570" y2="60" stroke="currentColor" strokeWidth="3" className="text-slate-400 dark:text-slate-600" />
                {/* Arrow head */}
                <polygon points="575,60 560,53 560,67" className="fill-slate-400 dark:fill-slate-600" />

                {/* Subdivisions and integer ticks */}
                {Array.from({ length: totalSubdivisions + 1 }).map((_, step) => {
                  const isInteger = step % activeDen === 0;
                  const intVal = step / activeDen;
                  const x = 40 + (step / totalSubdivisions) * 510;

                  return (
                    <g key={step}>
                      {/* Tick Line */}
                      <line
                        x1={x}
                        y1={isInteger ? 42 : 52}
                        x2={x}
                        y2={isInteger ? 78 : 68}
                        stroke="currentColor"
                        strokeWidth={isInteger ? 3 : 1.5}
                        className={isInteger ? "text-slate-800 dark:text-slate-200" : "text-slate-300 dark:text-slate-600"}
                      />
                      {/* Integer Label */}
                      {isInteger && (
                        <text
                          x={x}
                          y="100"
                          textAnchor="middle"
                          className="font-mono font-black text-sm fill-slate-800 dark:fill-slate-200"
                        >
                          {intVal}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Highlighted jump path */}
                {activeNum > 0 && (
                  <path
                    d={`M 40 60 Q ${(40 + (40 + (activeNum / totalSubdivisions) * 510)) / 2} 15 ${40 + (activeNum / totalSubdivisions) * 510} 55`}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                )}

                {/* Active Fraction Pointer */}
                {(() => {
                  const pointerX = 40 + (activeNum / totalSubdivisions) * 510;
                  return (
                    <g>
                      <circle cx={pointerX} cy="60" r="8" className="fill-blue-600 stroke-white dark:stroke-slate-900" strokeWidth="3" />
                      <circle cx={pointerX} cy="60" r="14" className="fill-blue-500/20 animate-ping" />
                      <line x1={pointerX} y1="38" x2={pointerX} y2="52" stroke="#2563eb" strokeWidth="2.5" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Value Readout Dashboard */}
            <div className="p-4 bg-blue-50/70 dark:bg-slate-800 rounded-xl flex flex-wrap items-center justify-around gap-4 text-center">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Áltört alak</div>
                <div className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                  <MathText size="xl">{activeNum}/{activeDen}</MathText>
                </div>
              </div>

              <div className="text-lg font-bold text-slate-300 dark:text-slate-600">=</div>

              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Vegyes tört alak</div>
                <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {wholePart > 0 ? (
                    <span>
                      {wholePart} {remainderPart > 0 ? <MathText size="xl">{remainderPart}/{activeDen}</MathText> : ''}
                    </span>
                  ) : (
                    <MathText size="xl">{activeNum}/{activeDen}</MathText>
                  )}
                </div>
              </div>

              <div className="text-lg font-bold text-slate-300 dark:text-slate-600">=</div>

              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Tizedes tört érték</div>
                <div className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
                  {decimalValue}
                </div>
              </div>

              <div className="text-lg font-bold text-slate-300 dark:text-slate-600">=</div>

              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Helyzete a számegyenesen</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                  {wholePart === activeNum / activeDen ? (
                    <span className="text-blue-600 font-black">Pontosan {wholePart} egész</span>
                  ) : (
                    <span><strong>{wholePart}</strong> és <strong>{wholePart + 1}</strong> egész között</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={5}
        title="Áltörtek és vegyes törtek átváltási táblázata"
        icon={<Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <TheoryTable
          title="Gyakori áltörtek és vegyes törtek átváltása"
          headers={['Áltört', 'Osztás művelete', 'Vegyes tört', 'Helye a számegyenesen', 'Tizedes tört']}
          rows={[
            ['3/2', '3 : 2 = 1, maradt 1', '1 1/2', '1 és 2 között pontosan félúton', '1,5'],
            ['5/4', '5 : 4 = 1, maradt 1', '1 1/4', '1 és 2 között az 1. negyednél', '1,25'],
            ['7/4', '7 : 4 = 1, maradt 3', '1 3/4', '1 és 2 között a 3. negyednél', '1,75'],
            ['7/3', '7 : 3 = 2, maradt 1', '2 1/3', '2 és 3 között az 1. harmadnál', '2,33...'],
            ['8/3', '8 : 3 = 2, maradt 2', '2 2/3', '2 és 3 között a 2. harmadnál', '2,66...'],
            ['11/4', '11 : 4 = 2, maradt 3', '2 3/4', '2 és 3 között a 3. negyednél', '2,75'],
            ['13/5', '13 : 5 = 2, maradt 3', '2 3/5', '2 és 3 között a 3. ötödnél', '2,6'],
            ['17/4', '17 : 4 = 4, maradt 1', '4 1/4', '4 és 5 között az 1. negyednél', '4,25'],
          ]}
        />
      </TheorySection>

      {/* 6. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDAHELYZETEK */}
      <TheorySection
        number={6}
        title="Tipikus csapdák és gyakori tévhitek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: A beosztási vonalak számlálása"
            wrong="Ha 4 beosztás van 0 és 1 között, akkor 5 részre van osztva az egység."
            correct="A részek (közök) számát számoljuk, nem a puszta vonalkákat!"
            explanation="Ha 4 egyenlő részre osztjuk az 1 egységet, a 0 és 1 között 3 belső vonás található, maga az 1 a 4. vonás."
          />

          <TheoryTrapBox
            title="2. Csapda: Vegyes tört felírása fordítva"
            wrong="A 7/3 vegyes törtként 1 4/3."
            correct="7/3 = 2 1/3 (7 : 3 = 2 egész, és a maradék 1)."
            explanation="A vegyes tört tört része MINDIG valódi tört kell legyen (a számláló kisebb, mint a nevező)!"
          />

          <TheoryTrapBox
            title="3. Csapda: Vegyes tört átírásakor a műveleti sorrend"
            wrong="A 3 1/2 átírása: 3 + 1 · 2 = 5/2."
            correct="3 1/2 = (3 · 2 + 1)/2 = 7/2."
            explanation="Először az egész részt SZOROZZUK a nevezővel, majd ehhez ADJUK HOZZÁ a számlálót!"
          />

          <TheoryTrapBox
            title="4. Csapda: A nevező megváltoztatása átváltáskor"
            wrong="A 9/4 vegyes tört alakban 2 1/2."
            correct="9/4 = 2 1/4 (a nevező 4 marad, nem változik meg!)."
            explanation="Átváltáskor a részek mérete és neve (a nevező) nem változhat meg!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default FractionsNumberLineTheory;
