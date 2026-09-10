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
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Calculator,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Scale,
  Binary,
  Compass,
  ArrowRight,
  HelpCircle,
  Divide,
  Percent,
  Brackets,
  FolderTree
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComplexOperationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ComplexOperationsTheory: React.FC<ComplexOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Expression Evaluator State
  const [selectedExample, setSelectedExample] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const interactiveExamples = [
    {
      id: 0,
      title: 'Példa 1: Zárójeles kivonás és szorzás',
      expr: '15 - 3 · (4 - 7)',
      steps: [
        { desc: '1. Lépés: Zárójel belsejének kiszámítása', math: '4 - 7 = -3', currentExpr: '15 - 3 · (-3)' },
        { desc: '2. Lépés: Szorzás elvégzése az előjelek figyelembevételével', math: '3 · (-3) = -9  vagy  -3 · (-3) = +9', currentExpr: '15 - (-9) = 15 + 9' },
        { desc: '3. Lépés: Kivonás / Összeadás elvégzése', math: '15 + 9 = 24', currentExpr: '24' }
      ],
      result: '24',
      tip: 'Gyakori hiba: 15 - 3 = 12 kiszámítása először. A szorzás mindig megelőzi a kivonást!'
    },
    {
      id: 1,
      title: 'Példa 2: Többszörös zárójel (szögletes és kerek)',
      expr: '20 - [ 4 + 2 · (8 - 5) ]',
      steps: [
        { desc: '1. Lépés: A legbelső (kerek) zárójel kiszámítása', math: '8 - 5 = 3', currentExpr: '20 - [ 4 + 2 · 3 ]' },
        { desc: '2. Lépés: A szögletes zárójelen belüli szorzás', math: '2 · 3 = 6', currentExpr: '20 - [ 4 + 6 ]' },
        { desc: '3. Lépés: A szögletes zárójelen belüli összeadás', math: '4 + 6 = 10', currentExpr: '20 - 10' },
        { desc: '4. Lépés: Végső kivonás', math: '20 - 10 = 10', currentExpr: '10' }
      ],
      result: '10',
      tip: 'Mindig a legbelső zárójeltől haladunk a külsők felé!'
    },
    {
      id: 2,
      title: 'Példa 3: Törtes összetett művelet',
      expr: '3/4 - 1/2 · (2/3 + 1/6)',
      steps: [
        { desc: '1. Lépés: Zárójelben lévő törtek közös nevezőre hozása', math: '2/3 + 1/6 = 4/6 + 1/6 = 5/6', currentExpr: '3/4 - 1/2 · 5/6' },
        { desc: '2. Lépés: Szorzás elvégzése számlálóval és nevezővel', math: '1/2 · 5/6 = 5/12', currentExpr: '3/4 - 5/12' },
        { desc: '3. Lépés: Kivonás közös nevezőre (12) hozással', math: '9/12 - 5/12 = 4/12', currentExpr: '4/12' },
        { desc: '4. Lépés: Végeredmény egyszerűsítése 4-gyel', math: '4/12 = 1/3', currentExpr: '1/3' }
      ],
      result: '1/3',
      tip: 'Törtes feladatnál a zárójel után azonnal szorzunk, és csak a legvégén vonunk ki!'
    },
    {
      id: 3,
      title: 'Példa 4: Törtvonal alatti és feletti műveletek',
      expr: '(12 - 4 · 2) / (3 - 5)',
      steps: [
        { desc: '1. Lépés: Számlálóban lévő szorzás elvégzése', math: '4 · 2 = 8', currentExpr: '(12 - 8) / (3 - 5)' },
        { desc: '2. Lépés: Számláló és nevező kivonásai külön-külön', math: 'Számláló: 12 - 8 = 4,  Nevező: 3 - 5 = -2', currentExpr: '4 / (-2)' },
        { desc: '3. Lépés: Osztás elvégzése', math: '4 : (-2) = -2', currentExpr: '-2' }
      ],
      result: '-2',
      tip: 'A törtvonal zárójelbe foglalja a teljes számlálót és a teljes nevezőt!'
    }
  ];

  const ex = interactiveExamples[selectedExample];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-7-racionalis-szamok-algebra-osszetett-muveletek"
      pdfFilename="7_osztaly_osszetett_muveletek_zarojelfelbontas.pdf"
      title="5. Összetett műveletek, zárójelfelbontás"
      subtitle="Műveleti sorrend, zárójelek felbontása, előjelszabályok és törtvonalak a racionális számok körében"
      badgeText="7. Osztály • Matematika II. Témakör"
      themeColor="cyan"
      estimatedTime="25 perc"
      difficulty="Közepes"
      nextTopicTitle="6. Számok és betűk használata"
    >
      {/* SECTION 1: A műveletek szigorú sorrendje */}
      <TheorySection
        number={1}
        title="A műveleti sorrend alapszabályai (KÖSZO / PEMDAS)"
        icon={<Layers className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <TheoryCallout
          variant="info"
          title="A műveleti hierarchia alaptörvénye"
          icon={<Zap className="w-5 h-5 text-cyan-600" />}
        >
          Ha egy kifejezésben többféle művelet és zárójel szerepel, a műveleteket nem egyszerűen balról jobbra végezzük el, hanem szigorú prioritási sorrend szerint!
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="A 4 Műveleti Szint" icon={<FolderTree className="w-4 h-4 text-cyan-600" />}>
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-700 dark:text-cyan-300">1. Zárójelek:</span> Belülről kifelé haladva: kerek ( ), szögletes [ ], kapcsos {'{ }'}.
              </div>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">2. Magasabb rendű műveletek:</span> Hatványozás (aⁿ) és gyökvonás (√a).
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-700 dark:text-purple-300">3. Szorzás és Osztás:</span> Balról jobbra, a felbukkanás sorrendjében.
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">4. Összeadás és Kivonás:</span> Balról jobbra haladva.
              </div>
            </div>
          </TheoryCard>

          <TheoryTrapBox title="Tipikus Műveleti Sorrend Hiba!">
            <div className="space-y-2 text-xs">
              <p className="text-rose-900 dark:text-rose-200 font-medium">
                Példa: Mennyi a <span className="font-mono font-bold">10 - 2 · 3</span> értéke?
              </p>
              <div className="p-2 bg-rose-100/80 dark:bg-rose-900/40 rounded-lg text-rose-800 dark:text-rose-200">
                ❌ <strong>HIBÁS:</strong> (10 - 2) · 3 = 8 · 3 = 24 &nbsp; <em>(Kivonás előbb)</em>
              </div>
              <div className="p-2 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-200">
                ✅ <strong>HELYES:</strong> 10 - (2 · 3) = 10 - 6 = <strong>4</strong>
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 2: Zárójelek felbontása és az előjelszabályok */}
      <TheorySection
        number={2}
        title="Zárójelek elhagyása és felbontása racionális számoknál"
        icon={<Brackets className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          Ha egy zárójel előtt előjel áll, a zárójel elhagyásakor az alábbi szabályok szerint járunk el:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="+ (Pluszjel) a zárójel előtt"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>A zárójel egyszerűen elhagyható, a benne lévő tagok előjele <strong>változatlan marad</strong>:</p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl font-mono text-center font-bold text-emerald-800 dark:text-emerald-300">
                +(a - b + c) = a - b + c
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Példa: 12 + (5 - 8) = 12 + 5 - 8 = 17 - 8 = 9
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="- (Mínuszjel) a zárójel előtt"
            icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>A zárójel elhagyásakor a zárójelen belüli <strong>minden tag előjele az ellenkezőjére változik</strong>:</p>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl font-mono text-center font-bold text-rose-800 dark:text-rose-300">
                -(a - b + c) = -a + b - c
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Példa: 15 - (7 - 4 + 2) = 15 - 7 + 4 - 2 = 10
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          title="Zárójelfelbontási összefoglaló táblázat"
          headers={['Zárójel előtti művelet / előjel', 'Szabály', 'Példa kifejezés', 'Egyszerűsített alak']}
          rows={[
            ['+(a + b)', 'Változatlan előjelek', '8 + (3 + 5)', '8 + 3 + 5 = 16'],
            ['+(a - b)', 'Változatlan előjelek', '10 + (4 - 9)', '10 + 4 - 9 = 5'],
            ['-(a + b)', 'Minden előjel megfordul', '14 - (6 + 3)', '14 - 6 - 3 = 5'],
            ['-(a - b)', 'Minden előjel megfordul', '12 - (5 - 8)', '12 - 5 + 8 = 15'],
            ['-(-a - b)', 'Minden előjel megfordul', '20 - (-4 - 6)', '20 + 4 + 6 = 30'],
          ]}
        />
      </TheorySection>

      {/* SECTION 3: Zárójelfelbontás szorzással és osztással */}
      <TheorySection
        number={3}
        title="Zárójelfelbontás szorzással (Disztributivitás)"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <TheoryCallout
          variant="success"
          title="A szorzás disztributív tulajdonsága"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        >
          Egy összeget vagy különbséget úgy szorzunk meg egy számmal, hogy a zárójelben lévő <strong>minden egyes tagot</strong> megszorozzuk az adott számmal:
          <div className="mt-2 font-mono font-black text-center text-sm">
            c · (a ± b) = c · a ± c · b
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="Pozitív számmal való szorzás" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                3 · (2x - 5) = 3 · 2x - 3 · 5 = 6x - 15
              </div>
              <div className="font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                4 · (1/2 + 3/4) = 4 · 1/2 + 4 · 3/4 = 2 + 3 = 5
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Negatív számmal való szorzás" icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                -2 · (3x - 4) = (-2) · 3x - (-2) · 4 = -6x + 8
              </div>
              <div className="font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                -5 · (2 - 1/5) = -10 + 1 = -9
              </div>
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                ⚠️ Vigyázz: negatív szorzónál a zárójelen belüli minden tag előjele megfordul!
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 4: Törtvonal mint zárójel és Emeletes törtek */}
      <TheorySection
        number={4}
        title="A törtvonal mint zárójel és emeletes törtek"
        icon={<Divide className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
          A törtvonal két funkciót tölt be egyszerre: <strong>osztást jelöl</strong> és <strong>zárójelbe foglalja</strong> a teljes számlálót és nevezőt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Törtvonal feloldása osztásként" icon={<Divide className="w-4 h-4 text-amber-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg">
                (a + b) / (c + d) = (a + b) : (c + d)
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-sans">
                Példa: (18 - 6) / (2 + 4) = 12 / 6 = 2.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Emeletes törtek feloldása" icon={<Layers className="w-4 h-4 text-indigo-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg">
                (a/b) / (c/d) = (a/b) : (c/d) = (a/b) · (d/c)
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-sans">
                Példa: (2/3) / (4/5) = (2/3) : (4/5) = (2/3) · (5/4) = 10/12 = 5/6.
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Műveleti Sorrend & Lépéskövető Labor */}
      <TheorySection
        number={5}
        title="Interaktív Műveleti Sorrend és Kifejezés-értékelő Laboratórium"
        icon={<Sparkles className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <Card className="border-2 border-cyan-200 dark:border-cyan-850 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                Lépésről lépésre kifejezés levezető
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Válassz egy összetett kifejezést, és járd végig a műveleti sorrend egyes lépéseit interaktívan!
              </p>
            </div>

            {/* Example selector pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {interactiveExamples.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedExample(idx);
                    setCurrentStep(0);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                    selectedExample === idx
                      ? "bg-cyan-600 text-white border-cyan-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  )}
                >
                  {item.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Expression Box */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-cyan-200 dark:border-slate-750 shadow-inner max-w-xl mx-auto text-center space-y-3">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Kezdő Kifejezés
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-cyan-700 dark:text-cyan-300">
                {ex.expr}
              </div>

              {/* Step progression */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Lépés {currentStep + 1} / {ex.steps.length}</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{ex.steps[currentStep].desc}</span>
                </div>

                <div className="p-3 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-xl border border-cyan-200/80 dark:border-cyan-800/60 font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  {ex.steps[currentStep].math}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Aktuális állapot: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{ex.steps[currentStep].currentExpr}</span>
                </div>
              </div>

              {/* Step controls */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  className="rounded-xl h-8 px-3 text-xs"
                >
                  Előző lépés
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCurrentStep(0)}
                  className="rounded-xl h-8 px-2.5 text-xs text-slate-500"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újra
                </Button>

                <Button
                  size="sm"
                  disabled={currentStep >= ex.steps.length - 1}
                  onClick={() => setCurrentStep(prev => Math.min(ex.steps.length - 1, prev + 1))}
                  className="rounded-xl h-8 px-3 text-xs bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>

              {/* Pro Tip Callout */}
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-300 text-left flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Tipp:</strong> {ex.tip}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
