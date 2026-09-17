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
  PieChart,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Info,
  Layers,
  ArrowRight,
  Divide,
  HelpCircle,
  Shapes,
  Percent,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText, Fraction } from '@/components/math/shared/MathText';

export interface FractionsIntroTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function FractionsIntroTheory({ onBack, onStartQuiz }: FractionsIntroTheoryProps) {
  // Interactive Fraction Builder State
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(4);

  // Interactive Fraction Amount Calculator State
  const [calcTotal, setCalcTotal] = useState<number>(60);
  const [calcNum, setCalcNum] = useState<number>(3);
  const [calcDen, setCalcDen] = useState<number>(5);

  // Helper for fraction type classification
  const getFractionTypeInfo = (num: number, den: number) => {
    if (den === 0) {
      return {
        type: 'Értelmezhetetlen',
        badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300',
        desc: 'A nevező soha nem lehet nulla, mert nullával nem lehet osztani!'
      };
    }
    if (num === 0) {
      return {
        type: 'Nulla értékű tört (= 0)',
        badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300',
        desc: 'Ha 0 részt veszünk, a tört értéke pontosan 0.'
      };
    }
    if (num === 1) {
      return {
        type: 'Egységtört (Számláló = 1)',
        badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300',
        desc: 'Pontosan egy darab egyenlő részt veszünk az egészből.'
      };
    }
    if (num < den) {
      return {
        type: 'Valódi tört (< 1 egész)',
        badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
        desc: 'A számláló kisebb, mint a nevező, így értéke kisebb 1 egésznél.'
      };
    }
    if (num === den) {
      return {
        type: '1 egésszel egyenlő tört (= 1)',
        badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
        desc: 'Az összes részt kiválasztottuk, így megkaptuk a teljes 1 egészet.'
      };
    }
    const wholes = Math.floor(num / den);
    const rem = num % den;
    return {
      type: `Áltört (> 1 egész) = ${wholes}${rem > 0 ? ` ${rem}/${den}` : ''}`,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
      desc: 'A számláló nagyobb a nevezőnél, így értéke több, mint 1 egész.'
    };
  };

  // Helper for hungarian reading of fractions
  const getHungarianReading = (num: number, den: number): string => {
    if (den === 0) return 'Nem értelmezhető';
    if (num === 0) return 'nulla';

    const denNames: Record<number, { singular: string; stem: string }> = {
      1: { singular: 'egész', stem: 'egész' },
      2: { singular: 'fél', stem: 'ketted' },
      3: { singular: 'harmad', stem: 'harmad' },
      4: { singular: 'negyed', stem: 'negyed' },
      5: { singular: 'ötöd', stem: 'ötöd' },
      6: { singular: 'hatod', stem: 'hatod' },
      7: { singular: 'heted', stem: 'heted' },
      8: { singular: 'nyolcad', stem: 'nyolcad' },
      9: { singular: 'kilenced', stem: 'kilenced' },
      10: { singular: 'tized', stem: 'tized' },
      11: { singular: 'tizenegyed', stem: 'tizenegyed' },
      12: { singular: 'tizenketted', stem: 'tizenketted' }
    };

    const numNames: Record<number, string> = {
      1: 'egy',
      2: 'két',
      3: 'három',
      4: 'négy',
      5: 'öt',
      6: 'hat',
      7: 'hét',
      8: 'nyolc',
      9: 'kilenc',
      10: 'tíz',
      11: 'tizenegy',
      12: 'tizenkettő'
    };

    const denInfo = denNames[den] || { singular: `${den}-ed`, stem: `${den}-ed` };
    const numName = numNames[num] || `${num}`;

    if (num === 1) {
      if (den === 2) return 'egy ketted (fél)';
      return `egy${denInfo.singular}`;
    }
    if (num === 2 && den === 2) return 'két ketted (1 egész)';
    return `${numName} ${denInfo.stem}`;
  };

  const fractionInfo = getFractionTypeInfo(numerator, denominator);
  const fractionReading = getHungarianReading(numerator, denominator);

  // SVG Pie Generator
  const renderPieSvg = (num: number, den: number, size = 160) => {
    if (den <= 0) return null;
    const center = size / 2;
    const radius = size / 2 - 8;

    if (den === 1) {
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto drop-shadow-md">
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={num >= 1 ? "fill-orange-500 stroke-orange-600 dark:fill-orange-600 dark:stroke-orange-500" : "fill-slate-100 stroke-slate-300 dark:fill-slate-800 dark:stroke-slate-700"}
            strokeWidth="3"
          />
        </svg>
      );
    }

    const slices = [];
    const anglePerSlice = 360 / den;

    for (let i = 0; i < den; i++) {
      const startAngle = i * anglePerSlice - 90;
      const endAngle = (i + 1) * anglePerSlice - 90;
      const isSelected = i < num;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const largeArc = anglePerSlice > 180 ? 1 : 0;

      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      slices.push(
        <path
          key={i}
          d={pathData}
          className={cn(
            "transition-all duration-300 stroke-white dark:stroke-slate-900",
            isSelected
              ? "fill-orange-500 dark:fill-orange-600 hover:fill-orange-400"
              : "fill-slate-100 dark:fill-slate-800 hover:fill-slate-200"
          )}
          strokeWidth="2.5"
        />
      );
    }

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto drop-shadow-md">
        <circle cx={center} cy={center} r={radius} className="fill-transparent stroke-orange-200 dark:stroke-orange-950" strokeWidth="4" />
        {slices}
      </svg>
    );
  };

  // Calculate amount steps
  const unitValue = calcDen > 0 ? calcTotal / calcDen : 0;
  const resultValue = unitValue * calcNum;

  return (
    <TheoryTemplate
      title="Ismerkedés a törtekkel"
      subtitle="A tört fogalma, a számláló, nevező és törtvonal szerepe, valódi és áltörtek, valamint a törtrész kiszámítása"
      documentId="fractions-intro-theory-content"
      pdfFilename="5_osztaly_ismerkedes_a_tortekkel_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="amber"
      badgeText="🍕 5. Osztály • II. Törtek, tizedes törtek"
      quickRule={{
        label: "A Tört Értelmezése",
        formula: "(Számláló) / (Nevező) — (ahol a Nevező ≠ 0)"
      }}
      practiceTitle="Készen állsz a törtek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a vizuális párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: A TÖRT FOGALMA ÉS AZ EGYENLŐ RÉSZEK */}
      <TheorySection
        number={1}
        title="Mi a tört? Az egész felosztása egyenlő részekre"
        icon={<PieChart className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A mindennapi életben nagyon gyakran találkozunk olyan helyzetekkel, amikor egy egész dolgot (például egy pizzát, tortát, csokoládét, almát vagy időtartamot) <strong>egyenlő részekre</strong> kell osztanunk. Az így kapott részek leírására használjuk a <strong>törteket</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Az Egész (1 egész)" badge="Egység" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A kiindulási pont: a teljes pizza, egy egész tábla csoki vagy a teljes osztálylétszám.
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-center font-bold text-amber-800 dark:text-amber-300 text-sm">
              🍕 1 egész = <span className="font-mono text-base">1</span>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Egyenlő részekre osztás" badge="Feltétel" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Csak akkor beszélhetünk törtről, ha az egész alakzatot <strong>pontosan egyforma nagyságú</strong> szeletekre osztjuk!
            </p>
            <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-xl text-center font-bold text-orange-800 dark:text-orange-300 text-sm">
              ⚖️ Minden rész azonos méretű
            </div>
          </TheoryCard>

          <TheoryCard title="3. Részek kiválasztása" badge="Törtrész" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A felosztott egyenlő részekből tetszőleges számú részt vehetünk el, színezhetünk be vagy ehetünk meg.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-sm flex items-center justify-center gap-2">
              <span>🍰 pl. 4 egyenlő részből 3 rész =</span>
              <MathText size="lg">3/4</MathText>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="amber" title="Alapvető megnevezések a mindennapokban">
          <ul className="list-disc list-inside space-y-1.5 mt-1 text-xs sm:text-sm">
            <li><strong>Fél:</strong> 2 egyenlő részre osztott egészből 1 rész (<MathText>1/2</MathText>)</li>
            <li><strong>Harmad:</strong> 3 egyenlő részre osztott egészből 1 rész (<MathText>1/3</MathText>)</li>
            <li><strong>Negyed:</strong> 4 egyenlő részre osztott egészből 1 rész (<MathText>1/4</MathText>)</li>
            <li><strong>Háromnegyed:</strong> 4 egyenlő részre osztott egészből 3 rész (<MathText>3/4</MathText>)</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZAKASZ: A TÖRT RÉSZEI ÉS A TÖRTVONAL */}
      <TheorySection
        number={2}
        title="A tört felépítése: Számláló, Törtvonal, Nevező"
        icon={<Divide className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Minden közönséges tört három jól elkülöníthető részből épül fel. Mindegyik résznek pontos matematikai feladata és jelentése van:
        </p>

        {/* Big Fraction Anatomy Diagram */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-850 p-6 rounded-3xl border-2 border-orange-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Visual Fraction Graphic */}
            <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-orange-300 dark:border-orange-800 shadow-sm min-w-[140px]">
              <div className="text-4xl font-black text-orange-600 dark:text-orange-400 tracking-wider">
                3
              </div>
              <div className="w-24 h-1.5 bg-slate-900 dark:bg-white rounded-full my-2"></div>
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-wider">
                4
              </div>
            </div>

            {/* Explanation Boxes */}
            <div className="space-y-3.5 flex-1 max-w-xl">
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-orange-200 dark:border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  SZ
                </span>
                <div>
                  <div className="font-black text-xs sm:text-sm text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    SZÁMLÁLÓ (Felső szám)
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    <strong>Megszámlálja</strong>, hogy hány darab egyenlő részt vettünk az egészből (beszínezett/kijelölt részek száma).
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-800 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  —
                </span>
                <div>
                  <div className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    TÖRTVONAL (Középen)
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Az <strong>osztás műveletét (<span className="font-bold">:</span>)</strong> helyettesíti. A számlálót osztjuk a nevezővel: <MathText>a / b = a : b</MathText>.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-blue-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  N
                </span>
                <div>
                  <div className="font-black text-xs sm:text-sm text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    NEVEZŐ (Alsó szám)
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    <strong>Megnevezi</strong> a törtet; megmutatja, hány egyenlő részre osztottuk fel az 1 egészet. <span className="text-rose-600 dark:text-rose-400 font-bold">A nevező soha nem lehet 0!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tört mint osztás bemutatása */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Egész számot eredményező tört</span>
            <div className="text-base sm:text-lg font-mono font-black text-orange-600 dark:text-orange-400">
              <MathText size="lg">6 / 2 = 6 : 2 = 3</MathText>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">6 fél pizza pontosan 3 egész pizza</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">1 egésszel egyenlő tört</span>
            <div className="text-base sm:text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">
              <MathText size="lg">4 / 4 = 4 : 4 = 1</MathText>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Ha a számláló és nevező egyenlő</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">1-nél kisebb tört értéke</span>
            <div className="text-base sm:text-lg font-mono font-black text-blue-600 dark:text-blue-400">
              <MathText size="lg">1 / 4 = 1 : 4 = 0,25</MathText>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Egy negyed tizedes tört alakban</p>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: INTERAKTÍV TÖRT-ÉPÍTŐ ÉS VIZUÁLIS LABORATÓRIUM */}
      <TheorySection
        number={3}
        title="Interaktív Vizuális Tört-Építő"
        icon={<Shapes className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Kísérletezz a számláló és nevező gombjaival! Figyeld meg valós időben a körcikk-diagramot, a csokoládé-sávot és a tört tulajdonságait:
        </p>

        <div className="bg-slate-50/70 dark:bg-slate-850/60 p-5 sm:p-7 rounded-3xl border-2 border-orange-200/80 dark:border-slate-700 space-y-6">
          {/* Controllers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Numerator Controller */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-orange-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  Számláló (Vett részek száma)
                </span>
                <span className="text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                  {numerator}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNumerator(Math.max(0, numerator - 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1 text-center font-mono font-bold text-xs bg-orange-50 dark:bg-orange-950/40 py-1.5 rounded-lg text-orange-800 dark:text-orange-300">
                  {numerator} darab rész kiválasztva
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNumerator(Math.min(12, numerator + 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Denominator Controller */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Nevező (Egyenlő részek száma)
                </span>
                <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                  {denominator}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDenominator(Math.max(1, denominator - 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1 text-center font-mono font-bold text-xs bg-blue-50 dark:bg-blue-950/40 py-1.5 rounded-lg text-blue-800 dark:text-blue-300">
                  {denominator} egyenlő részre osztva
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDenominator(Math.min(12, denominator + 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Visual Pie Graphic */}
            <div className="text-center space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                🍕 Kördiagram (Pizza szeletek)
              </div>
              <div className="py-2">
                {renderPieSvg(numerator, denominator, 170)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {numerator <= denominator ? (
                  <span><strong>{numerator}</strong> szelet a(z) <strong>{denominator}</strong> egyenlő szeletből</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Több mint 1 egész pizza! (Áltört)</span>
                )}
              </div>
            </div>

            {/* Chocolate Bar / Strip View + Analysis Card */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  🍫 Téglalap sáv (Csokoládé tábla)
                </div>
                <div className="w-full h-10 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border-2 border-slate-300 dark:border-slate-700">
                  {Array.from({ length: denominator }).map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-full flex-1 border-r last:border-r-0 border-white dark:border-slate-900 transition-colors duration-300 flex items-center justify-center text-[10px] font-mono font-bold",
                        idx < numerator
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      )}
                    >
                      {idx < numerator ? '✓' : ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Properties Card */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <MathText size="xl">{numerator}/{denominator}</MathText>
                    <span className="text-xs font-normal text-slate-600 dark:text-slate-300">
                      ({fractionReading})
                    </span>
                  </div>
                  <span className={cn("text-[11px] font-black px-2.5 py-0.5 rounded-md border", fractionInfo.badgeColor)}>
                    {fractionInfo.type}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {fractionInfo.desc}
                </p>

                <div className="pt-2 border-t border-amber-200/60 dark:border-slate-700 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Osztásként felírva:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {numerator} : {denominator} = {(numerator / denominator).toFixed(2).replace(/\.?0+$/, '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: TÖRTEK CSOPORTOSÍTÁSA AZ 1 EGÉSZHEZ VISZONYÍTVA */}
      <TheorySection
        number={4}
        title="Törtek fajtái az 1 egészhez képest"
        icon={<Layers className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A törteket a számláló és a nevező nagyságviszonya alapján három nagy csoportba soroljuk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* 1. Valódi tört */}
          <div className="p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-emerald-800 dark:text-emerald-300">
                1. Valódi tört
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Értéke &lt; 1
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A számláló <strong>kisebb</strong> a nevezőnél. Nem éri el az 1 egész egységet.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-center text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-2">
              <MathText>1/2</MathText>
              <span>•</span>
              <MathText>3/4</MathText>
              <span>•</span>
              <MathText>5/8</MathText>
              <span>•</span>
              <MathText>9/10</MathText>
            </div>
          </div>

          {/* 2. 1 egésszel egyenlő tört */}
          <div className="p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-blue-800 dark:text-blue-300">
                2. Egész tört
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Értéke = 1
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A számláló <strong>pontosan megegyezik</strong> a nevezővel. Egy teljes egészet tesz ki.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-center text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
              <MathText>2/2</MathText>
              <span>•</span>
              <MathText>4/4</MathText>
              <span>•</span>
              <MathText>7/7</MathText>
              <span>•</span>
              <MathText>12/12</MathText>
            </div>
          </div>

          {/* 3. Áltört */}
          <div className="p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-amber-800 dark:text-amber-300">
                3. Áltört
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Értéke &gt; 1
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A számláló <strong>nagyobb</strong> a nevezőnél. Több, mint 1 teljes egységet jelent.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-center text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
              <MathText>5/4</MathText>
              <span>•</span>
              <MathText>7/3</MathText>
              <span>•</span>
              <MathText>9/2</MathText>
              <span>•</span>
              <MathText>11/5</MathText>
            </div>
          </div>
        </div>

        {/* Egységtört Különleges Kiemelés */}
        <TheoryCard title="🌟 Különleges eset: Az Egységtört (Számláló = 1)" badge="Fontos szabály" variant="cyan">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Azokat a törteket nevezzük <strong>egységtörtnek</strong>, amelyeknek a számlálója 1 (pl. <MathText>1/2, 1/3, 1/4, 1/8, 1/100</MathText>).
          </p>
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs sm:text-sm text-cyan-900 dark:text-cyan-200">
            <strong>Szabály az egységtörtek összehasonlítására:</strong> Minél <em>nagyobb</em> az egységtört nevezője, annál <em>kisebb</em> maga a tört!
            <div className="mt-2 font-mono font-bold text-center text-sm flex items-center justify-center flex-wrap gap-2">
              <MathText size="md">1/2 &gt; 1/3 &gt; 1/4 &gt; 1/8 &gt; 1/10 &gt; 1/100</MathText>
            </div>
            <span className="text-[11px] text-slate-500 block text-center mt-1">
              (Gondolj a tortára: ha 2 felé vágjátok, hatalmas szeletet kapsz; ha 100 felé, csak egy pici falatot!)
            </span>
          </div>
        </TheoryCard>

        {/* Törtek összefoglaló táblázata */}
        <TheoryTable
          title="Törtek összehasonlítása és összefoglalása"
          headers={['Tört neve', 'Számláló vs. Nevező', 'Értéke 1-hez képest', 'Példa', 'Szemléletes jelentés']}
          rows={[
            ['Egységtört', 'Számláló = 1', 'Kisebb, mint 1 (kivéve 1/1)', '1/4', 'Egyetlen szelet a 4-ből'],
            ['Valódi tört', 'Számláló < Nevező', 'Kisebb, mint 1 egész', '3/4', '3 szelet a 4-ből (nem éri el a teljes pizzát)'],
            ['Egész tört', 'Számláló = Nevező', 'Pontosan 1 egész', '4/4 = 1', 'Minden szelet megvan, kész a teljes pizza'],
            ['Áltört', 'Számláló > Nevező', 'Nagyobb, mint 1 egész', '5/4 = 1 1/4', 'Egy egész pizza és még egy negyed szelet'],
          ]}
        />
      </TheorySection>

      {/* 5. SZAKASZ: MENNYISÉG TÖRTRÉSZÉNEK KISZÁMÍTÁSA */}
      <TheorySection
        number={5}
        title="Mennyiség törtrészének kiszámítása"
        icon={<Calculator className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Gyakran kell kiszámolnunk, hogy egy adott mennyiségnek (pl. 24 fős osztálynak, 60 percnek vagy 1000 Ft-nak) mekkora része egy adott tört.
        </p>

        {/* Golden Rule Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>A Törtrész-számítás Aranyszabálya</span>
          </div>
          <div className="text-base sm:text-lg font-bold">
            1. Oszd el a mennyiséget a <span className="underline decoration-white">nevezővel</span> (megtudod 1 rész értékét)!
            <br />
            2. Szorozd meg az eredményt a <span className="underline decoration-white">számlálóval</span> (megtudod a vett részek értékét)!
          </div>
        </div>

        {/* Step-by-step Worked Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <TheoryCard title="1. Példa: 24 tanuló 3/4 része" badge="Lépésről lépésre" variant="amber">
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div><strong>1. lépés (1 negyed rész):</strong> 24 : 4 = <span className="font-mono font-bold text-orange-600">6 tanuló</span></div>
                <div><strong>2. lépés (3 negyed rész):</strong> 6 · 3 = <span className="font-mono font-bold text-emerald-600 text-sm">18 tanuló</span></div>
              </div>
              <p className="text-[11px] text-slate-500">
                Tehát a 24 fős osztályból 18 tanuló vett részt a versenyen.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Példa: 60 perc 2/3 része" badge="Időszámítás" variant="amber">
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div><strong>1. lépés (1 harmad rész):</strong> 60 : 3 = <span className="font-mono font-bold text-orange-600">20 perc</span></div>
                <div><strong>2. lépés (2 harmad rész):</strong> 20 · 2 = <span className="font-mono font-bold text-emerald-600 text-sm">40 perc</span></div>
              </div>
              <p className="text-[11px] text-slate-500">
                Egy tanóra és a szünet egy része összesen 40 percet tesz ki.
              </p>
            </div>
          </TheoryCard>
        </div>

        {/* Interactive Fraction Amount Calculator */}
        <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-3xl border-2 border-orange-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Calculator className="w-4 h-4 text-orange-500" />
              <span>Interaktív Törtrész-Kalkulátor</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
              Próbáld ki
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Összmennyiség</label>
              <input
                type="number"
                value={calcTotal}
                onChange={(e) => setCalcTotal(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Számláló</label>
              <input
                type="number"
                value={calcNum}
                onChange={(e) => setCalcNum(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-orange-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Nevező</label>
              <input
                type="number"
                value={calcDen}
                onChange={(e) => setCalcDen(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-blue-600"
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-orange-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
            <div className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
              <span>Kérdés: Mennyi a(z) <strong>{calcTotal}</strong>-nak a(z)</span>
              <MathText size="md">{calcNum}/{calcDen}</MathText>
              <span>része?</span>
            </div>
            <div className="p-3 bg-amber-50/70 dark:bg-slate-800 rounded-xl space-y-1 font-mono">
              <div>1. lépés (1 rész): {calcTotal} : {calcDen} = <strong>{unitValue.toFixed(2).replace(/\.?0+$/, '')}</strong></div>
              <div>2. lépés ({calcNum} rész): {unitValue.toFixed(2).replace(/\.?0+$/, '')} · {calcNum} = <strong className="text-base text-emerald-600 dark:text-emerald-400">{resultValue.toFixed(2).replace(/\.?0+$/, '')}</strong></div>
            </div>
          </div>
        </div>
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
            title="1. Csapda: Nagyobb nevező = nagyobb tört?"
            wrong="Az 1/8 nagyobb, mint az 1/2, mert a 8 nagyobb a 2-nél."
            correct="1/2 > 1/8 (A fél pizza sokkal nagyobb, mint a nyolcad szelet!)"
            explanation="Ha egy egészet több részre osztunk, egy szelet KISEBB lesz, nem nagyobb!"
          />

          <TheoryTrapBox
            title="2. Csapda: A tört értéke mindig 1-nél kisebb?"
            wrong="Tört csak 1-nél kisebb szám lehet, 5/4 nem is létezik."
            correct="Az 5/4 egy áltört, aminek értéke 1 egész és 1 negyed (1 1/4 > 1)."
            explanation="A számláló lehet nagyobb a nevezőnél is, ilyenkor a tört értéke 1-nél nagyobb."
          />

          <TheoryTrapBox
            title="3. Csapda: Lehet a nevező 0?"
            wrong="3/0 = 0 vagy 3/0 = 3."
            correct="A nevező SOHA nem lehet 0 (nullával való osztás tilos és értelmetlen)."
            explanation="Egy tortát nem oszthatunk fel 0 egyenlő részre!"
          />

          <TheoryTrapBox
            title="4. Csapda: Nem egyenlő részekre osztás"
            wrong="Ha egy kört két tetszőleges, különböző méretű darabra vágunk, az egyik darab 1/2 rész."
            correct="Csak akkor nevezhetjük 1/2-nek, ha a két rész PONTOSAN egyenlő nagyságú!"
            explanation="A tört alapfeltétele a részek szigorú és pontos egyenlősége."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default FractionsIntroTheory;
