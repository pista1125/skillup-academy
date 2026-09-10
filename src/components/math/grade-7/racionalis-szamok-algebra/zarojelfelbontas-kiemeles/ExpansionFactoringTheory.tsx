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
  Zap,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Divide,
  Calculator,
  Equal,
  ArrowRightLeft,
  Shapes,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpansionFactoringTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ExpansionFactoringTheory: React.FC<ExpansionFactoringTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Expansion & Factoring Lab State
  const [selectedMode, setSelectedMode] = useState<'expand' | 'factor'>('expand');
  const [selectedExampleIdx, setSelectedExampleIdx] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const expandExamples = [
    {
      id: 0,
      title: 'Példa 1: Pozitív számmal való beszorzás',
      startExpr: '3 · (4x + 5)',
      steps: [
        {
          desc: '1. Lépés: A szorzó elosztása a tagokra',
          math: '3 · (4x) + 3 · (5)',
          note: 'A zárójel minden belső tagját külön-külön megszorozzuk 3-mal.'
        },
        {
          desc: '2. Lépés: A szorzások elvégzése',
          math: '12x + 15',
          note: '3 · 4x = 12x, és 3 · 5 = 15.'
        }
      ],
      result: 'Kifejtett alak: 12x + 15',
      tip: 'A zárójelben lévő MINDEN tagot meg kell szorozni a külső számmal!'
    },
    {
      id: 1,
      title: 'Példa 2: Negatív számmal való beszorzás',
      startExpr: '-4 · (2a - 3b + 1)',
      steps: [
        {
          desc: '1. Lépés: Előjeles szorzások kijelölése',
          math: '(-4) · (2a) + (-4) · (-3b) + (-4) · (1)',
          note: 'A -4-gyel való szorzás megfordítja az összes belső tag előjelét!'
        },
        {
          desc: '2. Lépés: Szorzások kiszámítása',
          math: '-8a + 12b - 4',
          note: '(-4)·2a = -8a, (-4)·(-3b) = +12b, (-4)·1 = -4.'
        }
      ],
      result: 'Kifejtett alak: -8a + 12b - 4',
      tip: 'Negatív szorzónál a mínuszból plusz, a pluszból mínusz lesz!'
    },
    {
      id: 2,
      title: 'Példa 3: Betűs taggal (változóval) való szorzás',
      startExpr: '2x · (3x - 5)',
      steps: [
        {
          desc: '1. Lépés: Kifejtés tagonként',
          math: '(2x · 3x) - (2x · 5)',
          note: 'A 2x változós szorzóval szorozzuk mindkét tagot.'
        },
        {
          desc: '2. Lépés: Hatványok és számok összevonása',
          math: '6x² - 10x',
          note: '2 · 3 = 6 és x · x = x², valamint 2x · 5 = 10x.'
        }
      ],
      result: 'Kifejtett alak: 6x² - 10x',
      tip: 'x · x = x² (az azonos betűk szorzata négyzetre emelkedik)!'
    }
  ];

  const factorExamples = [
    {
      id: 0,
      title: 'Példa 1: Közös számtényező kiemelése',
      startExpr: '6x + 15',
      steps: [
        {
          desc: '1. Lépés: Legnagyobb közös osztó megkeresése',
          math: 'LKKT(6, 15) = 3 ⟹ 6x = 3 · 2x,  15 = 3 · 5',
          note: 'A 6 és 15 legnagyobb közös osztója a 3.'
        },
        {
          desc: '2. Lépés: A 3 kiírása a zárójel elé',
          math: '3 · (2x + 5)',
          note: 'A megmaradó tényezők (2x és +5) a zárójelbe kerülnek.'
        }
      ],
      result: 'Szorzattá alakított alak: 3(2x + 5)',
      tip: 'Ellenőrzés: 3 · 2x + 3 · 5 = 6x + 15. Helyes!'
    },
    {
      id: 1,
      title: 'Példa 2: Közös szám és betű kiemelése',
      startExpr: '8a² - 12ab',
      steps: [
        {
          desc: '1. Lépés: Közös szám és változó azonosítása',
          math: '8 és 12 közös osztója: 4; a² és ab közös betűje: a ⟹ Közös tényező: 4a',
          note: '8a² = 4a · 2a,  -12ab = 4a · (-3b).'
        },
        {
          desc: '2. Lépés: A 4a kiemelése',
          math: '4a · (2a - 3b)',
          note: 'A zárójelben a 2a és a -3b marad.'
        }
      ],
      result: 'Kiemelt alak: 4a(2a - 3b)',
      tip: 'Mindig a lehető legnagyobb számot és a közös betűk legalacsonyabb kitevőjét emeljük ki!'
    },
    {
      id: 2,
      title: 'Példa 3: A „rejtett 1-es” csapda kiemeléskor',
      startExpr: '5x + 5',
      steps: [
        {
          desc: '1. Lépés: A tagok felírása szorzatként',
          math: '5x = 5 · x,  5 = 5 · 1',
          note: 'Nagyon fontos: az 5 önmagában 5 · 1-ként írható!'
        },
        {
          desc: '2. Lépés: Az 5 kiemelése',
          math: '5 · (x + 1)',
          note: 'A második tag helyén kötelezően megmarad az 1-es!'
        }
      ],
      result: 'Helyes alak: 5(x + 1)  (Nem 5x!)',
      tip: 'Ha egy teljes tagot kiemelünk, a helyén MINDIG 1 vagy -1 marad!'
    }
  ];

  const currentList = selectedMode === 'expand' ? expandExamples : factorExamples;
  const currentEx = currentList[selectedExampleIdx];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-7-racionalis-szamok-algebra-zarojelfelbontas-kiemeles"
      pdfFilename="7_osztaly_zarojelfelbontas_kiemeles.pdf"
      title="8. Zárójelfelbontás, kiemelés"
      subtitle="Beszorzás (disztributivitás) és a közös szorzótényező kiemelése az algebrai kifejezésekben"
      badgeText="7. Osztály • Matematika II. Témakör"
      themeColor="orange"
      estimatedTime="25 perc"
      difficulty="Közepes"
      nextTopicTitle="9. Összefoglalás"
    >
      {/* SECTION 1: A disztributivitás és a zárójelfelbontás */}
      <TheorySection
        number={1}
        title="A zárójelfelbontás elve: A szorzás széttagolási szabálya"
        icon={<Zap className="w-5 h-5 text-orange-600" />}
        badgeColor="orange"
      >
        <TheoryCallout
          variant="info"
          title="A disztributív tulajdonság"
          icon={<Sparkles className="w-5 h-5 text-orange-600" />}
        >
          Egy összeget vagy különbséget úgy szorzunk meg egy számmal (vagy betűs kifejezéssel), hogy a zárójelben lévő <strong>minden egyes tagot külön-külön megszorozzuk</strong>:
          <div className="mt-2 font-mono font-black text-center text-sm sm:text-base text-orange-800 dark:text-orange-300">
            c · (a + b) = c · a + c · b &nbsp; | &nbsp; c · (a - b) = c · a - c · b
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="Geometriai szemléltetés: Téglalap területe" icon={<Shapes className="w-4 h-4 text-orange-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>Egy <em>c</em> magasságú téglalap alapja két részből áll: <em>a</em> és <em>b</em>:</p>
              <div className="p-2.5 bg-orange-50 dark:bg-orange-950/40 rounded-xl font-mono text-center font-bold text-orange-900 dark:text-orange-300">
                Teljes Terület = c · (a + b) = c · a + c · b
              </div>
              <p>A nagy téglalap területe a két kisebb téglalap területének összege!</p>
            </div>
          </TheoryCard>

          <TheoryCard title="Alapvető algebrai beszorzás" icon={<Calculator className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>Példa: <span className="font-mono font-bold">4 · (2x + 3)</span></p>
              <ul className="list-disc pl-4 space-y-1 font-mono">
                <li>1. tag szorzása: 4 · 2x = 8x</li>
                <li>2. tag szorzása: 4 · 3 = 12</li>
                <li><strong>Eredmény: 8x + 12</strong></li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Zárójelfelbontás negatív szorzóval és betűvel */}
      <TheorySection
        number={2}
        title="Zárójelfelbontás negatív számokkal és változókkal"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          Ha a zárójel előtti szorzótényező negatív szám vagy változót is tartalmaz, különös gondossággal kell eljárnunk az előjelek és hatványok kezelésekor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard title="Negatív szorzó ⟹ Minden előjel megfordul" icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg font-mono font-bold text-rose-800 dark:text-rose-300">
                -3 · (2x - 5) = -6x + 15
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                (-3) · 2x = -6x és (-3) · (-5) = +15. A mínuszból plusz lett!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="Változóval való beszorzás ⟹ Kitevők növekedése" icon={<Zap className="w-4 h-4 text-indigo-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg font-mono font-bold text-indigo-800 dark:text-indigo-300">
                2a · (3a + 4b) = 6a² + 8ab
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                2a · 3a = 6a² (mert a · a = a²), és 2a · 4b = 8ab.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 3: A közös tényező kiemelése a zárójel elé */}
      <TheorySection
        number={3}
        title="A közös tényező kiemelése a zárójel elé (Faktorizálás)"
        icon={<ArrowRightLeft className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout
          variant="success"
          title="A zárójelfelbontás megfordítása"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        >
          A kiemelés során a kifejezés tagjaiban szereplő <strong>közös osztót (számot vagy betűt) a zárójel elé írjuk</strong>, és a zárójelbe az osztás után megmaradt részek kerülnek:
          <div className="mt-2 font-mono font-black text-center text-sm text-emerald-800 dark:text-emerald-300">
            c · a + c · b = c · (a + b)
          </div>
        </TheoryCallout>

        <TheoryTable
          title="Kiemelési mintapéldák"
          headers={['Eredeti összeg alak', 'Közös tényező', 'Kiemelés utáni szorzat alak', 'Ellenőrzés beszorzással']}
          rows={[
            ['6x + 9', '3', '3(2x + 3)', '3·2x + 3·3 = 6x + 9'],
            ['10a - 15b', '5', '5(2a - 3b)', '5·2a - 5·3b = 10a - 15b'],
            ['4x² + 6x', '2x', '2x(2x + 3)', '2x·2x + 2x·3 = 4x² + 6x'],
            ['-4a - 8b', '-4', '-4(a + 2b)', '-4·a + (-4)·2b = -4a - 8b'],
            ['12xy - 18x', '6x', '6x(2y - 3)', '6x·2y - 6x·3 = 12xy - 18x'],
            ['7x + 7', '7', '7(x + 1)', '7·x + 7·1 = 7x + 7'],
          ]}
        />
      </TheorySection>

      {/* SECTION 4: Tipikus csapdák és hibák kiemelésnél */}
      <TheorySection
        number={4}
        title="Kritikus csapdák a kiemelésnél"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="A „hová tűnt az 1-es?” hiba">
            <div className="space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                Alakítsuk szorzattá a <span className="font-mono font-bold">4x + 4</span> kifejezést!
              </p>
              <div className="p-2 bg-rose-100/80 dark:bg-rose-900/40 rounded-lg text-rose-800 dark:text-rose-200">
                ❌ <strong>HIBÁS:</strong> 4(x) = 4x &nbsp; <em>(A 4-es helye eltűnt)</em>
              </div>
              <div className="p-2 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-200">
                ✅ <strong>HELYES:</strong> 4(x + 1) &nbsp; <em>(Mert 4 · 1 = 4)</em>
              </div>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="Nem a legnagyobb közös osztó kiemelése">
            <div className="space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                Alakítsuk szorzattá a <span className="font-mono font-bold">12x + 18</span> kifejezést!
              </p>
              <div className="p-2 bg-amber-100/80 dark:bg-amber-900/40 rounded-lg text-amber-900 dark:text-amber-200">
                ⚠️ <strong>NEM TELJES:</strong> 2(6x + 9) &nbsp; <em>(A 6 és 9 még tovább osztható 3-mal!)</em>
              </div>
              <div className="p-2 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-200">
                ✅ <strong>TELJES:</strong> 6(2x + 3) &nbsp; <em>(A 6 a legnagyobb közös osztó)</em>
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Zárójelfelbontó & Kiemelő Labor */}
      <TheorySection
        number={5}
        title="Interaktív Zárójelfelbontó és Kiemelő Műhely"
        icon={<Sparkles className="w-5 h-5 text-orange-600" />}
        badgeColor="orange"
      >
        <Card className="border-2 border-orange-200 dark:border-orange-850 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                Interaktív Zárójelfelbontás & Kiemelés Gyakorló
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Válaszd ki a kívánt műveletet (Beszorzás vagy Kiemelés), és kövesd végig lépésről lépésre a levezetést!
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant={selectedMode === 'expand' ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedMode('expand');
                  setSelectedExampleIdx(0);
                  setCurrentStep(0);
                }}
                className={cn(
                  "rounded-xl h-8 px-4 text-xs font-bold",
                  selectedMode === 'expand' ? "bg-orange-600 hover:bg-orange-700 text-white" : ""
                )}
              >
                1. Zárójelfelbontás (Beszorzás)
              </Button>

              <Button
                size="sm"
                variant={selectedMode === 'factor' ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedMode('factor');
                  setSelectedExampleIdx(0);
                  setCurrentStep(0);
                }}
                className={cn(
                  "rounded-xl h-8 px-4 text-xs font-bold",
                  selectedMode === 'factor' ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
                )}
              >
                2. Közös Tényező Kiemelése
              </Button>
            </div>

            {/* Example pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {currentList.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedExampleIdx(idx);
                    setCurrentStep(0);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                    selectedExampleIdx === idx
                      ? selectedMode === 'expand'
                        ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                        : "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  )}
                >
                  Példa {idx + 1}
                </button>
              ))}
            </div>

            {/* Lab card box */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-orange-200 dark:border-slate-750 shadow-inner max-w-xl mx-auto text-center space-y-3">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Kiinduló Kifejezés
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-orange-700 dark:text-orange-300">
                {currentEx.startExpr}
              </div>

              {/* Step info */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Lépés {currentStep + 1} / {currentEx.steps.length}</span>
                  <span className="text-orange-600 dark:text-orange-400">{currentEx.steps[currentStep].desc}</span>
                </div>

                <div className="p-3 bg-orange-50/70 dark:bg-orange-950/40 rounded-xl border border-orange-200/80 dark:border-orange-800/60 font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 text-center">
                  {currentEx.steps[currentStep].math}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  💡 {currentEx.steps[currentStep].note}
                </p>
              </div>

              {/* Step Navigation */}
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
                  disabled={currentStep >= currentEx.steps.length - 1}
                  onClick={() => setCurrentStep(prev => Math.min(currentEx.steps.length - 1, prev + 1))}
                  className={cn(
                    "rounded-xl h-8 px-3 text-xs text-white",
                    selectedMode === 'expand' ? "bg-orange-600 hover:bg-orange-700" : "bg-emerald-600 hover:bg-emerald-700"
                  )}
                >
                  Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>

              {/* Result Summary */}
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center">
                {currentEx.result}
              </div>

              {/* Tip callout */}
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-300 text-left flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Tipp:</strong> {currentEx.tip}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
