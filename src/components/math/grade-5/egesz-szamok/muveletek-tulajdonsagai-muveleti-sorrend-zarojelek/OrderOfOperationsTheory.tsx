import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText,
  Calculator,
  Info,
  Layers,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Zap,
  Check,
  ArrowRight,
  X,
  AlertTriangle,
  Play,
  Flame,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface OrderOfOperationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface StepDetail {
  stepNumber: number;
  beforeExpr: string;
  targetSubExpr: string;
  calcResult: string;
  afterExpr: string;
  ruleLabel: string;
  ruleDescription: string;
  colorType: 'paren' | 'multdiv' | 'addsub' | 'smart';
}

interface PresetExpression {
  label: string;
  category: 'basic' | 'paren' | 'advanced' | 'smart';
  expr: string;
  steps: StepDetail[];
  finalResult: string;
}

const PRESET_EXPRESSIONS: PresetExpression[] = [
  {
    label: '1. Szorzás és összeadás',
    category: 'basic',
    expr: '18 + 4 · 5',
    steps: [
      {
        stepNumber: 1,
        beforeExpr: '18 + 4 · 5',
        targetSubExpr: '4 · 5',
        calcResult: '20',
        afterExpr: '18 + 20',
        ruleLabel: 'Magasabb rendű művelet',
        ruleDescription: 'A szorzás megelőzi az összeadást: 4 · 5 = 20.',
        colorType: 'multdiv'
      },
      {
        stepNumber: 2,
        beforeExpr: '18 + 20',
        targetSubExpr: '18 + 20',
        calcResult: '38',
        afterExpr: '38',
        ruleLabel: 'Alacsonyabb rendű művelet',
        ruleDescription: 'Elvégezzük az összeadást: 18 + 20 = 38.',
        colorType: 'addsub'
      }
    ],
    finalResult: '38'
  },
  {
    label: '2. Zárójel megelőzi a szorzást',
    category: 'basic',
    expr: '(18 + 4) · 5',
    steps: [
      {
        stepNumber: 1,
        beforeExpr: '(18 + 4) · 5',
        targetSubExpr: '18 + 4',
        calcResult: '22',
        afterExpr: '22 · 5',
        ruleLabel: 'Zárójel elsőbbsége ( )',
        ruleDescription: 'A zárójelen belüli összeadás a legelső: 18 + 4 = 22.',
        colorType: 'paren'
      },
      {
        stepNumber: 2,
        beforeExpr: '22 · 5',
        targetSubExpr: '22 · 5',
        calcResult: '110',
        afterExpr: '110',
        ruleLabel: 'Szorzás',
        ruleDescription: 'Elvégezzük a szorzást: 22 · 5 = 110.',
        colorType: 'multdiv'
      }
    ],
    finalResult: '110'
  },
  {
    label: '3. Osztás és szorzás láncolat (balról jobbra)',
    category: 'basic',
    expr: '60 : 3 · 2',
    steps: [
      {
        stepNumber: 1,
        beforeExpr: '60 : 3 · 2',
        targetSubExpr: '60 : 3',
        calcResult: '20',
        afterExpr: '20 · 2',
        ruleLabel: 'Azonos rang (balról jobbra)',
        ruleDescription: 'Az osztás és szorzás azonos rangú, balról jobbra haladunk: 60 : 3 = 20.',
        colorType: 'multdiv'
      },
      {
        stepNumber: 2,
        beforeExpr: '20 · 2',
        targetSubExpr: '20 · 2',
        calcResult: '40',
        afterExpr: '40',
        ruleLabel: 'Szorzás',
        ruleDescription: 'Elvégezzük a szorzást: 20 · 2 = 40 (NEM 60 : 6 = 10!).',
        colorType: 'multdiv'
      }
    ],
    finalResult: '40'
  },
  {
    label: '4. Többszintű zárójel: kerek és szögletes',
    category: 'paren',
    expr: '100 - 2 · [15 + (18 - 3 · 4)]',
    steps: [
      {
        stepNumber: 1,
        beforeExpr: '100 - 2 · [15 + (18 - 3 · 4)]',
        targetSubExpr: '3 · 4',
        calcResult: '12',
        afterExpr: '100 - 2 · [15 + (18 - 12)]',
        ruleLabel: 'Legbelső zárójelen belüli szorzás',
        ruleDescription: 'A kerek zárójelben a szorzás az első: 3 · 4 = 12.',
        colorType: 'paren'
      },
      {
        stepNumber: 2,
        beforeExpr: '100 - 2 · [15 + (18 - 12)]',
        targetSubExpr: '18 - 12',
        calcResult: '6',
        afterExpr: '100 - 2 · [15 + 6]',
        ruleLabel: 'Kerek zárójel felbontása ( )',
        ruleDescription: 'Kiszámoljuk a kerek zárójelet: 18 - 12 = 6.',
        colorType: 'paren'
      },
      {
        stepNumber: 3,
        beforeExpr: '100 - 2 · [15 + 6]',
        targetSubExpr: '15 + 6',
        calcResult: '21',
        afterExpr: '100 - 2 · 21',
        ruleLabel: 'Szögletes zárójel felbontása [ ]',
        ruleDescription: 'Kiszámoljuk a szögletes zárójelet: 15 + 6 = 21.',
        colorType: 'paren'
      },
      {
        stepNumber: 4,
        beforeExpr: '100 - 2 · 21',
        targetSubExpr: '2 · 21',
        calcResult: '42',
        afterExpr: '100 - 42',
        ruleLabel: 'Szorzás',
        ruleDescription: 'A szorzás megelőzi a kivonást: 2 · 21 = 42.',
        colorType: 'multdiv'
      },
      {
        stepNumber: 5,
        beforeExpr: '100 - 42',
        targetSubExpr: '100 - 42',
        calcResult: '58',
        afterExpr: '58',
        ruleLabel: 'Végső kivonás',
        ruleDescription: 'Elvégezzük a kivonást: 100 - 42 = 58.',
        colorType: 'addsub'
      }
    ],
    finalResult: '58'
  },
  {
    label: '5. Okos kiemelés (Disztributivitás)',
    category: 'smart',
    expr: '37 · 84 + 37 · 16',
    steps: [
      {
        stepNumber: 1,
        beforeExpr: '37 · 84 + 37 · 16',
        targetSubExpr: '37 · (84 + 16)',
        calcResult: '37 · (84 + 16)',
        afterExpr: '37 · (84 + 16)',
        ruleLabel: 'Közös tényező kiemelése',
        ruleDescription: 'A 37 mindkét szorzatban szerepel, kiemeljük a zárójel elé: 37 · (84 + 16).',
        colorType: 'smart'
      },
      {
        stepNumber: 2,
        beforeExpr: '37 · (84 + 16)',
        targetSubExpr: '84 + 16',
        calcResult: '100',
        afterExpr: '37 · 100',
        ruleLabel: 'Kerek összeg számolása',
        ruleDescription: 'A zárójelben lévő összeg pontosan 100: 84 + 16 = 100.',
        colorType: 'paren'
      },
      {
        stepNumber: 3,
        beforeExpr: '37 · 100',
        targetSubExpr: '37 · 100',
        calcResult: '3 700',
        afterExpr: '3 700',
        ruleLabel: 'Villámgyors szorzás 100-zal',
        ruleDescription: '37 · 100 = 3 700. Hosszú írásbeli számolás helyett fejben 2 másodperc alatt kész!',
        colorType: 'smart'
      }
    ],
    finalResult: '3 700'
  }
];

export function OrderOfOperationsTheory({ onBack, onStartQuiz }: OrderOfOperationsTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulator state
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const activePreset = PRESET_EXPRESSIONS[selectedPresetIndex];
  const totalSteps = activePreset.steps.length;
  const currentStep = activePreset.steps[Math.min(currentStepIndex, totalSteps - 1)];

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('order-of-operations-theory-content', 'Muveletek_Tulajdonsagai_Muveleti_Sorrend_Tananyag');
    setIsDownloading(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleResetStep = () => {
    setCurrentStepIndex(0);
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setCurrentStepIndex(0);
  };

  return (
    <div className="w-full px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-pdf">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {onStartQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-3 border-amber-300 bg-amber-50/60 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="order-of-operations-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-2 border border-amber-200 dark:border-amber-800">
              <span>🔢 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Műveletek tulajdonságai, műveleti sorrend, zárójelek
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Műveletek hierarchiája, zárójelek felbontása, kommutativitás, asszociativitás, disztributivitás és fejszámolási trükkök
            </p>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-slate-800/80 rounded-2xl border border-amber-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Szabály</div>
            <div className="text-base sm:text-lg font-mono font-black text-amber-700 dark:text-amber-300">
              ( ) ➔ · , : ➔ + , -
            </div>
          </div>
        </div>

        {/* Section 1: A műveletek prioritása és a zárójelek */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              1.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A műveletek hierarchiája és a zárójelek szerepe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. szint: Zárójelek */}
            <Card className="rounded-2xl border-purple-200 dark:border-purple-900/60 shadow-none bg-purple-50/40 dark:bg-purple-950/20">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    1.
                  </span>
                  <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                    Legmagasabb rang
                  </span>
                </div>
                <div className="text-sm font-black text-purple-950 dark:text-purple-200">
                  Zárójelek belseje
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Mindig a <strong>legbelső zárójellel</strong> kezdünk, és fokozatosan haladunk kifelé:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 font-mono text-xs text-center font-bold text-purple-700 dark:text-purple-300">
                  ( kerek ) ➔ [ szögletes ] ➔ {'{ kapcsos }'}
                </div>
              </CardContent>
            </Card>

            {/* 2. szint: Szorzás és osztás */}
            <Card className="rounded-2xl border-indigo-200 dark:border-indigo-900/60 shadow-none bg-indigo-50/40 dark:bg-indigo-950/20">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    2.
                  </span>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                    Magasabb rendű
                  </span>
                </div>
                <div className="text-sm font-black text-indigo-950 dark:text-indigo-200">
                  Szorzás és Osztás (· , :)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Megelőzik az összeadást és kivonást. Ha több van belőlük egymás mellett, <strong>balról jobbra</strong> haladunk!
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 font-mono text-xs text-center font-bold text-indigo-700 dark:text-indigo-300">
                  60 : 3 · 2 = 20 · 2 = 40
                </div>
              </CardContent>
            </Card>

            {/* 3. szint: Összeadás és kivonás */}
            <Card className="rounded-2xl border-amber-200 dark:border-amber-900/60 shadow-none bg-amber-50/40 dark:bg-amber-950/20">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                    3.
                  </span>
                  <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                    Alacsonyabb rendű
                  </span>
                </div>
                <div className="text-sm font-black text-amber-950 dark:text-amber-200">
                  Összeadás és Kivonás (+ , -)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A számolás utolsó lépései. Egymás között azonos rangúak, ezért <strong>balról jobbra</strong> haladunk:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 font-mono text-xs text-center font-bold text-amber-700 dark:text-amber-300">
                  25 - 10 + 5 = 15 + 5 = 20
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: Műveleti tulajdonságok */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              2.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A műveletek alaptulajdonságai és számolási szabályai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kommutativitás */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>1. Felcserélhetőség (Kommutativitás)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Az összeadásban és a szorzásban a tagok sorrendje szabadon felcserélhető, az eredmény változatlan marad:
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-emerald-600 dark:text-emerald-400">
                    a + b = b + a
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-emerald-600 dark:text-emerald-400">
                    a · b = b · a
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300">
                  <strong>Figyelem!</strong> A kivonás (5 - 2 ≠ 2 - 5) és az osztás (12 : 3 ≠ 3 : 12) <em>NEM</em> felcserélhető!
                </div>
              </CardContent>
            </Card>

            {/* Asszociativitás */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>2. Csoportosíthatóság (Asszociativitás)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Több összeadandó vagy tényező esetén a műveletek tetszés szerint csoportosíthatók a kényelmes számoláshoz:
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-indigo-600 dark:text-indigo-400">
                    (a + b) + c = a + (b + c)
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-indigo-600 dark:text-indigo-400">
                    (a · b) · c = a · (b · c)
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300">
                  <strong>Példa:</strong> (25 · 37) · 4 = (25 · 4) · 37 = 100 · 37 = <strong>3 700</strong>.
                </div>
              </CardContent>
            </Card>

            {/* Disztributivitás */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <Calculator className="w-4 h-4" />
                  <span>3. Széttagolhatóság (Disztributivitás)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Összeg és különbség szorzásakor a zárójel minden egyes tagját meg kell szorozni a szorzóval:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center font-bold text-amber-700 dark:text-amber-300">
                  c · (a + b) = c · a + c · b &nbsp;|&nbsp; c · (a - b) = c · a - c · b
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <strong>Példa:</strong> 6 · 48 = 6 · (50 - 2) = 300 - 12 = <strong>288</strong>.
                </p>
              </CardContent>
            </Card>

            {/* Kiemelés */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>4. Közös tényező kiemelése (Okos számolás)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A disztributivitás fordított iránya: ha több szorzatban közös tényező van, kiemelhetjük a zárójel elé:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center font-bold text-amber-700 dark:text-amber-300">
                  a · c + b · c = (a + b) · c
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <strong>Példa:</strong> 37 · 84 + 37 · 16 = 37 · (84 + 16) = 37 · 100 = <strong>3 700</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Interaktív Műveleti Sorrend Mester Szimulátor */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              3.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Interaktív Műveleti Sorrend Mester Szimulátor
            </h2>
          </div>

          <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/60 dark:bg-slate-850/60 overflow-hidden">
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Válassz mintafeladatot a levezetéshez:
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kövesd végig a műveletek lépésről lépésre történő kiértékelését!
                  </p>
                </div>
              </div>

              {/* Preset Selector Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {PRESET_EXPRESSIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(idx)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                      selectedPresetIndex === idx
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {idx + 1}. példa
                  </button>
                ))}
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Active Expression Display */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {activePreset.label}
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
                  {activePreset.expr}
                </div>
              </div>

              {/* Step Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                    {currentStepIndex + 1}. Lépés / {totalSteps} • {currentStep.ruleLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    Cél: {currentStep.targetSubExpr}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-center">
                  <div className="text-xs text-slate-400 mb-1">Művelet elvégzése:</div>
                  <div className="text-lg sm:text-xl font-mono font-black text-amber-700 dark:text-amber-300">
                    <span className="text-slate-400 line-through mr-2">{currentStep.beforeExpr}</span>
                    ➔
                    <span className="text-emerald-600 dark:text-emerald-400 ml-2">{currentStep.afterExpr}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {currentStep.ruleDescription}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="rounded-xl h-9 px-3 text-xs font-bold border-slate-200 dark:border-slate-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Előző lépés
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetStep}
                  className="rounded-xl h-9 px-3 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Elölről
                </Button>

                <Button
                  size="sm"
                  onClick={handleNextStep}
                  disabled={currentStepIndex === totalSteps - 1}
                  className="rounded-xl h-9 px-4 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Következő lépés
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Tipikus csapdák és buktatók */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-sm">
              4.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Gyakori hibák és tipikus csapdák
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>1. Csapda: Balról jobbra mindent kiszámolni</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> 10 + 2 · 5 = 12 · 5 = 60.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> A szorzást végezzük el előbb: 10 + 10 = <strong>20</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>2. Csapda: Osztás és szorzás sorrendjének felcserélése</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> 60 : 3 · 2 = 60 : 6 = 10.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> Balról jobbra: 60 : 3 = 20, majd 20 · 2 = <strong>40</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>3. Csapda: Zárójel felbontása csak az 1. tagra</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> 4 · (25 + 7) = 100 + 7 = 107.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> Mindkét tagot szorozzuk: 4 · 25 + 4 · 7 = 100 + 28 = <strong>128</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>4. Csapda: Mínuszjel zárójel előtt</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> 100 - (30 + 20) = 100 - 30 + 20 = 90.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> 100 - 50 = <strong>50</strong> (vagy 100 - 30 - 20 = 50).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Összefoglaló táblázat */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              5.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Összefoglaló táblázat
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Művelet / Szabály</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Rangsor</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Képlet</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Mintapélda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-purple-700 dark:text-purple-300">Zárójelek</td>
                  <td className="p-3 font-mono font-bold text-purple-600">1. (Legmagasabb)</td>
                  <td className="p-3 font-mono">( ) ➔ [ ] ➔ {'{ }'}</td>
                  <td className="p-3 font-mono">3 · (4 + 6) = 3 · 10 = 30</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-indigo-700 dark:text-indigo-300">Szorzás és Osztás</td>
                  <td className="p-3 font-mono font-bold text-indigo-600">2. (Magasabb)</td>
                  <td className="p-3 font-mono">· és : (balról jobbra)</td>
                  <td className="p-3 font-mono">15 + 3 · 4 = 15 + 12 = 27</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-amber-700 dark:text-amber-300">Összeadás és Kivonás</td>
                  <td className="p-3 font-mono font-bold text-amber-600">3. (Alacsonyabb)</td>
                  <td className="p-3 font-mono">+ és - (balról jobbra)</td>
                  <td className="p-3 font-mono">20 - 8 + 2 = 12 + 2 = 14</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-300">Kiemelés</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">Okos átalakítás</td>
                  <td className="p-3 font-mono">a·c + b·c = (a+b)·c</td>
                  <td className="p-3 font-mono">45 · 92 + 45 · 8 = 45 · 100 = 4 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practice Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/20">
          <div>
            <h3 className="text-lg font-black">Készen állsz a gyakorlásra?</h3>
            <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
              Tedd próbára tudásod a 3 szintű kvízben, a kártyanyitogató párosítóban vagy a csoportosítóban!
            </p>
          </div>
          {onStartQuiz && (
            <Button
              onClick={onStartQuiz}
              className="bg-white text-amber-900 hover:bg-amber-50 font-black rounded-xl h-10 px-5 shadow-sm text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-600" />
              Kvíz indítása
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
