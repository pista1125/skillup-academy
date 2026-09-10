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
  Target,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  ArrowRight,
  Divide,
  Calculator,
  Equal,
  Percent,
  Hash,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CombiningSubstitutionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CombiningSubstitutionTheory: React.FC<CombiningSubstitutionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Combining & Evaluation Lab State
  const [selectedLabIdx, setSelectedLabIdx] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const labExamples = [
    {
      id: 0,
      title: 'Példa 1: Egyszerű összevonás és behelyettesítés',
      expr: '5x - 3 + 2x + 7',
      varVal: 'x = 4',
      steps: [
        {
          desc: '1. Lépés: Egynemű tagok csoportosítása',
          math: '(5x + 2x) + (-3 + 7)',
          note: 'Az x-es tagokat és a konstans számokat külön rendezzük.'
        },
        {
          desc: '2. Lépés: Összevonás elvégzése',
          math: '7x + 4',
          note: '5 + 2 = 7, illetve -3 + 7 = +4.'
        },
        {
          desc: '3. Lépés: Behelyettesítés (x = 4)',
          math: '7 · (4) + 4 = 28 + 4 = 32',
          note: 'A változó helyére beírjuk a 4-et és elvégezzük a szorzást, majd összeadást.'
        }
      ],
      result: 'Összevont alak: 7x + 4  |  Helyettesítési érték: 32',
      tip: 'Mindig érdemes előbb összevonni az egynemű tagokat, és csak utána behelyettesíteni!'
    },
    {
      id: 1,
      title: 'Példa 2: Negatív szám behelyettesítése',
      expr: '3x² - 4x + 5',
      varVal: 'x = -2',
      steps: [
        {
          desc: '1. Lépés: Zárójeles behelyettesítés',
          math: '3 · (-2)² - 4 · (-2) + 5',
          note: 'Negatív számot MINDIG zárójelben helyettesítünk be!'
        },
        {
          desc: '2. Lépés: Hatványozás elvégzése',
          math: '(-2)² = (-2) · (-2) = +4 ⟹ 3 · 4 - 4 · (-2) + 5',
          note: 'A hatványozás megelőzi a szorzást.'
        },
        {
          desc: '3. Lépés: Szorzások elvégzése',
          math: '12 - (-8) + 5 = 12 + 8 + 5',
          note: '-4 · (-2) = +8 (két negatív szorzata pozitív).'
        },
        {
          desc: '4. Lépés: Végső összeadás',
          math: '12 + 8 + 5 = 25',
          note: 'A végső helyettesítési érték: 25.'
        }
      ],
      result: 'Helyettesítési érték: 25',
      tip: 'Vigyázat: (-2)² = +4, de -2² = -4!'
    },
    {
      id: 2,
      title: 'Példa 3: Kétváltozós kifejezés összevonása',
      expr: '4a + 3b - 2a + 5b - 8',
      varVal: 'a = 3, b = -1',
      steps: [
        {
          desc: '1. Lépés: Változók szerinti csoportosítás',
          math: '(4a - 2a) + (3b + 5b) - 8',
          note: 'Az a-s tagok, b-s tagok és a konstans tag elkülönítése.'
        },
        {
          desc: '2. Lépés: Összevonás',
          math: '2a + 8b - 8',
          note: '4 - 2 = 2a, és 3 + 5 = 8b.'
        },
        {
          desc: '3. Lépés: Behelyettesítés (a = 3, b = -1)',
          math: '2 · (3) + 8 · (-1) - 8 = 6 + (-8) - 8 = 6 - 8 - 8 = -10',
          note: '8 · (-1) = -8, így 6 - 8 - 8 = -10.'
        }
      ],
      result: 'Összevont alak: 2a + 8b - 8  |  Érték: -10',
      tip: 'Különböző betűket (pl. a és b) NEM szabad egybevonni!'
    },
    {
      id: 3,
      title: 'Példa 4: Zárójeles kifejezés felbontása és összevonása',
      expr: '2(3x - 4) - (5x - 6)',
      varVal: 'x = 5',
      steps: [
        {
          desc: '1. Lépés: Zárójelek felbontása',
          math: '6x - 8 - 5x + 6',
          note: '2 · 3x = 6x, 2 · (-4) = -8, a mínusz miatt: -5x + 6.'
        },
        {
          desc: '2. Lépés: Egynemű tagok összevonása',
          math: '(6x - 5x) + (-8 + 6) = 1x - 2 = x - 2',
          note: 'A bonyolult kifejezés leegyszerűsödött: x - 2.'
        },
        {
          desc: '3. Lépés: Behelyettesítés (x = 5)',
          math: '5 - 2 = 3',
          note: 'Az egyszerűsített alakba sokkal gyorsabb behelyettesíteni!'
        }
      ],
      result: 'Egyszerűsített alak: x - 2  |  Érték: 3',
      tip: 'A zárójelek felbontása után azonnal vonjuk össze az egynemű tagokat!'
    }
  ];

  const ex = labExamples[selectedLabIdx];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-7-racionalis-szamok-algebra-osszevonas-ertek"
      pdfFilename="7_osztaly_osszevonas_helyettesitesi_ertek.pdf"
      title="7. Összevonás, helyettesítési érték"
      subtitle="Egynemű algebrai tagok felismerése és összevonása, kifejezések egyszerűsítése és pontos helyettesítési értékének kiszámítása"
      badgeText="7. Osztály • Matematika II. Témakör"
      themeColor="amber"
      estimatedTime="25 perc"
      difficulty="Közepes"
      nextTopicTitle="8. Zárójelfelbontás, kiemelés"
    >
      {/* SECTION 1: Mik azok az egynemű kifejezések? */}
      <TheorySection
        number={1}
        title="Mik azok az egynemű kifejezések?"
        icon={<Layers className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryCallout
          variant="info"
          title="Az egyneműség aranyszabálya"
          icon={<Zap className="w-5 h-5 text-amber-600" />}
        >
          Két vagy több algebrai tagot akkor nevezünk <strong>egyneműnek</strong>, ha a <strong>betűrészük (változóik és azok hatványkitevői) teljesen megegyezik</strong>. 
          Csak az együtthatójukban (számszorzójukban) különbözhetnek!
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="✅ Egynemű kifejezések (Összevonhatók)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <ul className="list-disc pl-4 space-y-1 font-mono">
                <li><strong className="text-emerald-600">3x</strong> és <strong className="text-emerald-600">-7x</strong> &nbsp; (ugyanaz az x változó)</li>
                <li><strong className="text-emerald-600">5a²</strong> és <strong className="text-emerald-600">2a²</strong> &nbsp; (ugyanaz az a² hatvány)</li>
                <li><strong className="text-emerald-600">-4ab</strong> és <strong className="text-emerald-600">9ab</strong> &nbsp; (ugyanaz az ab szorzat)</li>
                <li><strong className="text-emerald-600">8</strong> és <strong className="text-emerald-600">-15</strong> &nbsp; (mindkettő konstans szám)</li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryCard title="❌ NEM egynemű kifejezések (NEM vonhatók össze!)" icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <ul className="list-disc pl-4 space-y-1 font-mono">
                <li><strong className="text-rose-600">3x</strong> és <strong className="text-rose-600">3x²</strong> &nbsp; (a kitevő különbözik: 1 vs 2!)</li>
                <li><strong className="text-rose-600">4a</strong> és <strong className="text-rose-600">4b</strong> &nbsp; (különböző betűk!)</li>
                <li><strong className="text-rose-600">5xy</strong> és <strong className="text-rose-600">5x</strong> &nbsp; (hiányzik az y változó!)</li>
                <li><strong className="text-rose-600">2a</strong> és <strong className="text-rose-600">2</strong> &nbsp; (változós tag vs puszta szám!)</li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Az egynemű tagok összevonásának szabálya */}
      <TheorySection
        number={2}
        title="Egynemű tagok összevonása lépésről lépésre"
        icon={<Calculator className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          Az összevonás során az <strong>egynemű tagok együtthatóit előjelesen összeadjuk</strong>, a közös <strong>betűrészt pedig változatlanul</strong> leírjuk melléjük.
        </p>

        {/* Visual Box */}
        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-2xl mb-4 text-center space-y-2">
          <div className="text-xs uppercase font-bold text-amber-800 dark:text-amber-300">
            Összevonási modell
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 dark:text-white">
            <span className="text-blue-600">5a</span> + <span className="text-emerald-600">3b</span> + <span className="text-blue-600">2a</span> - <span className="text-emerald-600">7b</span>
          </div>
          <div className="text-base sm:text-lg font-mono font-bold text-amber-700 dark:text-amber-400">
            = (5 + 2)a + (3 - 7)b = <span className="text-blue-600">7a</span> - <span className="text-emerald-600">4b</span>
          </div>
        </div>

        <TheoryTable
          title="Összevonási példák és típusok"
          headers={['Eredeti kifejezés', 'Egynemű tagok csoportosítása', 'Összevont legegyszerűbb alak']}
          rows={[
            ['4x + 3x - 2x', '(4 + 3 - 2)x', '5x'],
            ['8a - 5b - 3a + 9b', '(8 - 3)a + (-5 + 9)b', '5a + 4b'],
            ['3x² - 2x + 5x² + 7x', '(3 + 5)x² + (-2 + 7)x', '8x² + 5x'],
            ['7 - 4y + 3 + 9y', '(-4 + 9)y + (7 + 3)', '5y + 10'],
            ['x - 5x + 8x', '(1 - 5 + 8)x', '4x'],
            ['2a - 2a + 3', '(2 - 2)a + 3 = 0a + 3', '3'],
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryTrapBox title="Tipikus hiba: Különböző hatványok összevonása">
            <div className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200">
              <p>❌ <strong>HIBÁS:</strong> 3x + 2x² = 5x³ vagy 5x²</p>
              <p>✅ <strong>HELYES:</strong> 3x + 2x² nem vonható össze, változatlan marad!</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Gondolj rá úgy: 3 alma + 2 láda alma nem egyenlő 5 akármivel!
              </p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="Tipikus hiba: A változó elhagyása 0 esetén">
            <div className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200">
              <p>Ha az együtthatók összege 0: <span className="font-mono font-bold">5x - 5x = 0x = 0</span>.</p>
              <p>Ilyenkor a tag teljesen kiesik, nem marad utána x!</p>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 3: Helyettesítési érték számítása */}
      <TheorySection
        number={3}
        title="A helyettesítési érték kiszámítása"
        icon={<Target className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCallout
          variant="success"
          title="Hogyan számoljuk ki a helyettesítési értéket?"
          icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
        >
          A kifejezésben szereplő <strong>változók (betűk) helyére beírjuk</strong> a megadott konkrét számértékeket, majd a műveleti sorrend szabályait követve kiszámoljuk a végeredményt.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="1. Pozitív szám behelyettesítése" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>Kifejezés: <span className="font-mono font-bold">4x - 5</span>, ha <span className="font-mono font-bold">x = 3</span>:</p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl font-mono text-center font-bold text-emerald-800 dark:text-emerald-300">
                4 · (3) - 5 = 12 - 5 = 7
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Negatív szám behelyettesítése" icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>Kifejezés: <span className="font-mono font-bold">2x + 8</span>, ha <span className="font-mono font-bold">x = -5</span>:</p>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl font-mono text-center font-bold text-rose-800 dark:text-rose-300">
                2 · (-5) + 8 = -10 + 8 = -2
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 4: Kiemelt csapdák negatív számok és hatványok esetén */}
      <TheorySection
        number={4}
        title="Kritikus csapdák a behelyettesítésnél"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="A zárójel elhagyása negatív alapú hatványnál">
            <div className="space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                Számítsuk ki az <span className="font-mono font-bold">x²</span> értékét, ha <span className="font-mono font-bold">x = -3</span>:
              </p>
              <div className="p-2 bg-rose-100/80 dark:bg-rose-900/40 rounded-lg text-rose-800 dark:text-rose-200">
                ❌ <strong>HIBÁS:</strong> -3² = -9 &nbsp; <em>(Csak a 3 van négyzetre emelve)</em>
              </div>
              <div className="p-2 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-200">
                ✅ <strong>HELYES:</strong> (-3)² = (-3) · (-3) = <strong>+9</strong>
              </div>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="Negatív szám kivonása behelyettesítéskor">
            <div className="space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                Számítsuk ki a <span className="font-mono font-bold">10 - 2x</span> értékét, ha <span className="font-mono font-bold">x = -4</span>:
              </p>
              <div className="p-2 bg-rose-100/80 dark:bg-rose-900/40 rounded-lg text-rose-800 dark:text-rose-200">
                ❌ <strong>HIBÁS:</strong> 10 - 2 · (-4) = 10 - 8 = 2
              </div>
              <div className="p-2 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-200">
                ✅ <strong>HELYES:</strong> 10 - 2 · (-4) = 10 - (-8) = 10 + 8 = <strong>18</strong>
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Összevonó & Behelyettesítő Labor */}
      <TheorySection
        number={5}
        title="Interaktív Összevonó és Érték-Kiértékelő Laboratórium"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <Card className="border-2 border-amber-200 dark:border-amber-850 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Lépésről Lépésre Összevonás & Behelyettesítés
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Válassz ki egy kifejezést, és járd végig interaktívan az összevonás és behelyettesítés folyamatát!
              </p>
            </div>

            {/* Selector pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {labExamples.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedLabIdx(idx);
                    setCurrentStep(0);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                    selectedLabIdx === idx
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  )}
                >
                  {item.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Exercise Box */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-amber-200 dark:border-slate-750 shadow-inner max-w-xl mx-auto text-center space-y-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <span>Kifejezés:</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">{ex.varVal}</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-amber-700 dark:text-amber-300">
                {ex.expr}
              </div>

              {/* Step content */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Lépés {currentStep + 1} / {ex.steps.length}</span>
                  <span className="text-amber-600 dark:text-amber-400">{ex.steps[currentStep].desc}</span>
                </div>

                <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800/60 font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 text-center">
                  {ex.steps[currentStep].math}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  💡 {ex.steps[currentStep].note}
                </p>
              </div>

              {/* Navigation controls */}
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
                  className="rounded-xl h-8 px-3 text-xs bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>

              {/* Result Summary */}
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center">
                {ex.result}
              </div>

              {/* Tip box */}
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
