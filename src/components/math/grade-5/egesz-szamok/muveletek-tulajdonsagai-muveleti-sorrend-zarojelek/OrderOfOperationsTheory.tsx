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
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Layers,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OrderOfOperationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

const PRESET_EXPRESSIONS = [
  {
    label: '1. Szorzás és összeadás',
    expr: '18 + 4 · 5',
    steps: [
      { step: '1. Szorzás', sub: '4 · 5 = 20', res: '18 + 20' },
      { step: '2. Összeadás', sub: '18 + 20 = 38', res: '38' }
    ],
    finalResult: '38'
  },
  {
    label: '2. Zárójel megelőzi a szorzást',
    expr: '(18 + 4) · 5',
    steps: [
      { step: '1. Zárójel', sub: '18 + 4 = 22', res: '22 · 5' },
      { step: '2. Szorzás', sub: '22 · 5 = 110', res: '110' }
    ],
    finalResult: '110'
  },
  {
    label: '3. Osztás és kivonás',
    expr: '50 - 30 : 5',
    steps: [
      { step: '1. Osztás', sub: '30 : 5 = 6', res: '50 - 6' },
      { step: '2. Kivonás', sub: '50 - 6 = 44', res: '44' }
    ],
    finalResult: '44'
  },
  {
    label: '4. Egymásba ágyazott zárójelek',
    expr: '100 - [20 + (15 - 5) · 3]',
    steps: [
      { step: '1. Belső kerek zárójel', sub: '15 - 5 = 10', res: '100 - [20 + 10 · 3]' },
      { step: '2. Szorzás a szögletesben', sub: '10 · 3 = 30', res: '100 - [20 + 30]' },
      { step: '3. Összeadás a szögletesben', sub: '20 + 30 = 50', res: '100 - 50' },
      { step: '4. Kivonás', sub: '100 - 50 = 50', res: '50' }
    ],
    finalResult: '50'
  }
];

export function OrderOfOperationsTheory({ onBack, onStartQuiz }: OrderOfOperationsTheoryProps) {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const currentPreset = PRESET_EXPRESSIONS[selectedPresetIndex];

  return (
    <TheoryTemplate
      title="Műveletek tulajdonságai, műveleti sorrend, zárójelek"
      subtitle="A 3 szintű műveleti sorrend, balról jobbra szabály, zárójelek szerepe és okos fejszámolási azonosságok"
      documentId="order-of-operations-theory-content"
      pdfFileName="Muveleti_Sorrend_Zarojelek_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badgeColor="indigo"
      quickRule={{
        label: "Műveleti Sorrend",
        formula: "1. ( ) Zárójelek ⟹ 2. · , : Szorzás/Osztás ⟹ 3. + , - Összeadás/Kivonás",
        detail: "Azonos rangú műveleteknél mindig balról jobbra haladunk!"
      }}
    >
      {/* 1. RÉSZ: A 3 SZINTŰ MŰVELETI HIERARCHIA */}
      <TheorySection
        number={1}
        title="A műveleti hierarchia: A 3 kötelező szint"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCallout variant="info" title="Miért van szükség műveleti sorrendre?">
          Ha nem lenne egységes szabályrendszer, ugyanarra a számításra különböző emberek különböző eredményt kapnának! A matematika univerzális nyelve a műveleti hierarchián alapul.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="1. Szint: Zárójelek" icon={<Zap className="w-4 h-4 text-purple-600" />} badge="Legmagasabb rang">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A zárójel <strong>felülírja az összes többi szabályt</strong>! Mindig a legbelső kerek zárójellel <span className="font-mono font-bold">( )</span> kezdünk, majd a szögletessel <span className="font-mono font-bold">[ ]</span> haladunk kifelé.
            </p>
          </TheoryCard>

          <TheoryCard title="2. Szint: Szorzás és Osztás" icon={<Calculator className="w-4 h-4 text-blue-600" />} badge="Magasabb rendű">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A <strong>szorzás (·)</strong> és az <strong>osztás (:)</strong> azonos rangú műveletek. Megelőzik az összeadást és a kivonást, és <strong>balról jobbra</strong> végezzük őket.
            </p>
          </TheoryCard>

          <TheoryCard title="3. Szint: Összeadás és Kivonás" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} badge="Alapvető szint">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az <strong>összeadás (+)</strong> és a <strong>kivonás (–)</strong> azonos rangú. A zárójelek, szorzások és osztások után végezzük el őket <strong>balról jobbra</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: ZÁRÓJELEK ÉS MŰVELETI SZABÁLYOK */}
      <TheorySection
        number={2}
        title="A zárójelek ereje és típusai"
        icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kerek és szögletes zárójelek" icon={<Zap className="w-4 h-4 text-purple-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              Többszörös zárójeles kifejezésekben mindig a legbelső, <strong>kerek zárójeltől ( )</strong> indulunk kifelé a <strong>szögletes zárójelig [ ]</strong>:
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg font-mono font-bold text-xs text-purple-800 dark:text-purple-300 mt-2 text-center">
              5 · [20 - (3 + 7)] = 5 · [20 - 10] = 5 · 10 = 50
            </div>
          </TheoryCard>

          <TheoryCard title="Zárójel előtti műveleti jelek hatása" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              A zárójel elé írt kivonás jel a zárójel elhagyásakor megváltoztatja a belső tagok előjelét:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300 mt-2 text-center">
              30 - (10 + 5) = 30 - 15 = 15 &nbsp;(vagy 30 - 10 - 5 = 15)
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: AZONOSSÁGOK ÉS OKOS SZÁMOLÁS */}
      <TheorySection
        number={3}
        title="Okos számolás azonosságokkal (Csoportosítás, Széttagolás)"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          title="Fejszámolást segítő azonosságok"
          headers={['Szabály neve', 'Kifejezés', 'Okos átalakítás', 'Eredmény']}
          rows={[
            ['Kerek összegek csoportosítása', '37 + 89 + 63', '(37 + 63) + 89 = 100 + 89', '189'],
            ['Kerek szorzatok csoportosítása', '4 · 39 · 25', '(4 · 25) · 39 = 100 · 39', '3 900'],
            ['Közös szorzó kiemelése', '17 · 4 + 17 · 6', '17 · (4 + 6) = 17 · 10', '170'],
            ['Kivonás széttagolása', '18 · 49', '18 · (50 - 1) = 900 - 18', '882']
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="A műveleti sorrend figyelmen kívül hagyása"
            wrong="18 + 4 · 5 = 22 · 5 = 110 (balról jobbra számolva a szorzást megelőzve)"
            correct="18 + (4 · 5) = 18 + 20 = 38 (A szorzás MINDIG megelőzi az összeadást!)"
            explanation="A magasabb rendű műveleteket (szorzás, osztás) mindig el kell végezni az összeadás/kivonás előtt."
          />
          <TheoryTrapBox
            title="A balról jobbra szabály megsértése egyenrangú műveleteknél"
            wrong="24 : 6 · 2 = 24 : 12 = 2 (előbb a jobb oldali szorzást végezve)"
            correct="(24 : 6) · 2 = 4 · 2 = 8 (Egyenrangú műveleteknél BALRÓL JOBBRA haladunk!)"
            explanation="Mivel a szorzás és az osztás azonos szintű, ha nincs zárójel, a felírás sorrendjében számolunk."
          />
          <TheoryTrapBox
            title="Zárójel előtti mínusz jel helytelen felbontása"
            wrong="20 - (5 + 3) = 20 - 5 + 3 = 18"
            correct="20 - (5 + 3) = 20 - 8 = 12 (vagy 20 - 5 - 3 = 12)!"
            explanation="A zárójel előtti kivonás az egész zárójeles összegre vonatkozik, így mindkét tagot le kell vonni."
          />
          <TheoryTrapBox
            title="Széttagolásnál a második tag megszorzásának elfelejtése"
            wrong="4 · (10 + 2) = 4 · 10 + 2 = 42"
            correct="4 · (10 + 2) = 4 · 10 + 4 · 2 = 40 + 8 = 48 (MINDEN belső tagot megszorzunk)!"
            explanation="A disztributivitás szabálya szerint a szorzó a zárójel belsejében álló valamennyi tagra érvényes."
          />
        </div>
      </TheorySection>

      {/* 5. RÉSZ: INTERAKTÍV MŰVELETI SORREND LEVEZETŐ */}
      <TheorySection
        number={5}
        title="Interaktív Műveleti Sorrend Léptető Laboratórium"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
        className="no-pdf"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Válassz minta feladatot:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {PRESET_EXPRESSIONS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPresetIndex(idx);
                    setStepIndex(0);
                  }}
                  className={cn(
                    "p-2.5 rounded-xl text-left border text-xs font-bold transition-all",
                    selectedPresetIndex === idx
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  )}
                >
                  <div>{preset.label}</div>
                  <div className="font-mono text-[11px] opacity-80">{preset.expr}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-center">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center font-mono font-bold text-lg">
                <div className="text-slate-800 dark:text-slate-200">
                  {currentPreset.expr} = <span className="text-indigo-600 dark:text-indigo-400">{currentPreset.finalResult}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-xs sm:text-sm">
              <div className="font-bold text-indigo-800 dark:text-indigo-300 mb-1">
                {currentPreset.steps[stepIndex]?.step}
              </div>
              <div className="text-slate-700 dark:text-slate-300 space-y-1">
                <p>• Részszámolás: <strong className="font-mono text-indigo-700 dark:text-indigo-300">{currentPreset.steps[stepIndex]?.sub}</strong></p>
                <p>• Kifejezés alakja most: <strong className="font-mono">{currentPreset.steps[stepIndex]?.res}</strong></p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={stepIndex === 0}
                className="rounded-xl text-xs"
              >
                Előző lépés
              </Button>
              <div className="text-xs font-bold text-slate-500">
                {stepIndex + 1} / {currentPreset.steps.length} lépés
              </div>
              <Button
                size="sm"
                onClick={() => setStepIndex((prev) => Math.min(currentPreset.steps.length - 1, prev + 1))}
                disabled={stepIndex >= currentPreset.steps.length - 1}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs"
              >
                Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default OrderOfOperationsTheory;
