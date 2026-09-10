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
  Variable,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  ArrowRight,
  Divide,
  Percent,
  BookOpen,
  Calculator,
  Shapes,
  Hash,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumbersLettersTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const NumbersLettersTheory: React.FC<NumbersLettersTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Expression Builder State
  const [selectedBuilderIdx, setSelectedBuilderIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'translate' | 'anatomy'>('translate');

  const builderExamples = [
    {
      id: 0,
      statement: 'Egy szám 4-szeresénél 7-tel nagyobb mennyiség',
      variable: 'x (az ismeretlen szám)',
      step1: 'A szám 4-szerese: 4 · x = 4x',
      step2: 'Nagyobb 7-tel (+ 7 hozzáadása): 4x + 7',
      result: '4x + 7',
      type: 'Kéttagú kifejezés (összeg)',
      coefficient: '4 (az x együtthatója)',
      constant: '7 (állandó/konstans tag)'
    },
    {
      id: 1,
      statement: 'Két szám összegének a háromszorosa',
      variable: 'a és b (a két szám)',
      step1: 'A két szám összege zárójelben: (a + b)',
      step2: 'Az összeg 3-szorosa: 3 · (a + b) = 3(a + b)',
      result: '3(a + b)',
      type: 'Szorzat alakú kifejezés',
      coefficient: '3 (a zárójeles összeg szorzója)',
      constant: 'Nincs külön konstans tag'
    },
    {
      id: 2,
      statement: 'Egy szám felének és 5-nek a különbsége',
      variable: 'y (az ismeretlen szám)',
      step1: 'A szám fele: y / 2 vagy (1/2)y',
      step2: 'Különbség 5-tel (kivonás): y/2 - 5',
      result: 'y/2 - 5',
      type: 'Kéttagú kifejezés (különbség)',
      coefficient: '1/2 (az y együtthatója)',
      constant: '-5'
    },
    {
      id: 3,
      statement: 'Egy szám 6-tal csökkentett értékének a negyedrésze',
      variable: 'k (az ismeretlen szám)',
      step1: 'A szám 6-tal csökkentve: (k - 6)',
      step2: 'Ennek a negyedrésze: (k - 6) / 4',
      result: '(k - 6) / 4',
      type: 'Hányados / Tört alakú kifejezés',
      coefficient: '1/4',
      constant: '-6/4 = -1.5'
    }
  ];

  const currentItem = builderExamples[selectedBuilderIdx];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-7-racionalis-szamok-algebra-szamok-es-betuk"
      pdfFilename="7_osztaly_szamok_es_betuk_hasznalata.pdf"
      title="6. Számok és betűk használata"
      subtitle="Változók, betűs algebrai kifejezések felírása, együtthatók, konstansok és az algebranyelv alapszabályai"
      badgeText="7. Osztály • Matematika II. Témakör"
      themeColor="purple"
      estimatedTime="25 perc"
      difficulty="Közepes"
      nextTopicTitle="7. Összevonás, helyettesítési érték"
    >
      {/* SECTION 1: Miért használunk betűket a matematikában? */}
      <TheorySection
        number={1}
        title="Miért használunk betűket a matematikában?"
        icon={<Variable className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <TheoryCallout
          variant="info"
          title="A betűk két fő szerepe"
          icon={<Zap className="w-5 h-5 text-purple-600" />}
        >
          A matematikában a betűket (pl. <em>x, y, a, b, n, k</em>) két alapvető célra használjuk:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Általánosítás:</strong> Olyan összefüggések, képletek leírására, amelyek minden számra igazak (pl. kerület, terület, műveleti azonosságok).</li>
            <li><strong>Ismeretlen mennyiség jelölése:</strong> Egy konkrét, de még ismeretlen számérték felírására egyenletekben és szöveges feladatokban.</li>
          </ul>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard title="1. Általános képletek és szabályok" icon={<Shapes className="w-4 h-4 text-purple-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>A téglalap kerületét nem kell minden méretre külön szabályként megjegyezni:</p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl font-mono text-center font-bold text-purple-800 dark:text-purple-300">
                K = 2 · (a + b) = 2a + 2b
              </div>
              <p>Ez bármilyen valós oldalhosszúságú téglalapra automatikusan érvényes!</p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Ismeretlen mennyiség megadása" icon={<Hash className="w-4 h-4 text-indigo-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>Ha egy füzet ára <em>x</em> forint, akkor 5 füzet ára és egy 200 Ft-os ceruza együtt:</p>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl font-mono text-center font-bold text-indigo-800 dark:text-indigo-300">
                Összköltség = 5x + 200
              </div>
              <p>Így az összeg azonnal kiszámolható tetszőleges füzetár esetén!</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Az algebrai kifejezés felépítése: tagok, együtthatók, változók */}
      <TheorySection
        number={2}
        title="Az algebrai kifejezések anatómiája: együttható és változó"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          Az algebrai kifejezés számokból, betűkből (változókból) és a köztük lévő műveleti jelekből áll.
        </p>

        {/* Big Anatomy Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 rounded-2xl mb-4 text-center">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
            Egy algebrai kifejezés részei
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-purple-700 dark:text-purple-300 flex items-center justify-center gap-3">
            <span className="text-emerald-600 dark:text-emerald-400">5x²</span>
            <span>-</span>
            <span className="text-indigo-600 dark:text-indigo-400">3x</span>
            <span>+</span>
            <span className="text-amber-600 dark:text-amber-400">8</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] font-medium text-slate-600 dark:text-slate-400 border-t pt-3 border-slate-200 dark:border-slate-800">
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400 block">5x²</strong>
              Együttható: 5, Változó: x²
            </div>
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block">-3x</strong>
              Együttható: -3, Változó: x
            </div>
            <div>
              <strong className="text-amber-600 dark:text-amber-400 block">+8</strong>
              Konstans (szám) tag
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A láthatatlan 1-es és -1-es együttható" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>Ha a betű előtt nem látunk kiírt számot, ott <strong>mindig 1 vagy -1 áll</strong>:</p>
              <ul className="list-disc pl-4 space-y-1 font-mono">
                <li>x = 1 · x = 1x &nbsp; <em>(együttható: +1)</em></li>
                <li>-x = -1 · x = -1x &nbsp; <em>(együttható: -1)</em></li>
                <li>ab = 1 · ab &nbsp; <em>(együttható: +1)</em></li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryTrapBox title="A szorzáspont elhagyásának szabálya">
            <div className="space-y-2 text-xs">
              <p className="text-rose-900 dark:text-rose-200">
                Szám és betű, illetve két betű között a szorzásjelet el szoktuk hagyni: <span className="font-mono font-bold">3 · x = 3x</span>, <span className="font-mono font-bold">a · b = ab</span>.
              </p>
              <div className="p-2 bg-rose-100/80 dark:bg-rose-900/40 rounded-lg text-rose-800 dark:text-rose-200 font-bold">
                ⚠️ Két konkrét szám között a szorzáspontot SOHA nem szabad elhagyni! (2 · 3 ≠ 23, hanem 6!)
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 3: Algebranyelv: Szöveges kifejezések lefordítása */}
      <TheorySection
        number={3}
        title="Algebranyelv: Szöveges feladatok átírása betűs kifejezéssé"
        icon={<BookOpen className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          A magyar nyelvű matematikai megfogalmazásokat pontos szabályok szerint fordítjuk algebrai kifejezésekké.
        </p>

        <TheoryTable
          title="Alapvető nyelvi fordítások az algebra nyelvére"
          headers={['Szöveges megfogalmazás', 'Művelet típusa', 'Algebrai kifejezés']}
          rows={[
            ['Egy szám 8-cal nagyobb', 'Összeadás (+)', 'x + 8'],
            ['Egy szám 5-tel kisebb', 'Kivonás (-)', 'x - 5'],
            ['Egy szám 4-szerese', 'Szorzás (·)', '4x vagy 4 · x'],
            ['Egy szám harmadrésze (harmada)', 'Osztás (:) vagy Tört', 'x / 3 vagy (1/3)x'],
            ['Egy szám kétszeresénél 3-mal több', 'Szorzás majd összeadás', '2x + 3'],
            ['Egy szám 3-mal növelt értékének kétszerese', 'Zárójeles szorzás', '2(x + 3) = 2 · (x + 3)'],
            ['Két szám összegének négyzete', 'Zárójel négyzete', '(a + b)²'],
            ['Két szám négyzetének összege', 'Négyzetek összeadása', 'a² + b²'],
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryTrapBox title="Finom nyelvi csapda: Zárójel vagy nem zárójel?">
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg text-slate-800 dark:text-slate-200">
                <strong>„Egy szám 5-szörösénél 2-vel több”:</strong> Előbb szorzunk, aztán adunk hozzá ⟹ <span className="font-mono font-bold text-rose-600">5x + 2</span>
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-slate-800 dark:text-slate-200">
                <strong>„Egy szám 2-vel megnövelt értékének 5-szöröse”:</strong> Előbb hozzáadunk (zárójelben!), majd szorzunk ⟹ <span className="font-mono font-bold text-emerald-600">5(x + 2)</span>
              </div>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="Különbség képzésének iránya">
            <div className="space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>„Vonjunk ki 8-ból egy számot”:</strong> <span className="font-mono font-bold text-emerald-600">8 - x</span>
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>„Vonjunk ki egy számból 8-at”:</strong> <span className="font-mono font-bold text-emerald-600">x - 8</span>
              </p>
              <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                ⚠️ A kivonás nem felcserélhető, ezért a sorrend kulcsfontosságú!
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 4: Geometriai képletek algebrai alapon */}
      <TheorySection
        number={4}
        title="Gyakorlati és geometriai képletek mint betűs kifejezések"
        icon={<Shapes className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
          A geometriában a kerület ($K$) és terület ($T$) képletek valójában mind algebrai kifejezések.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Négyzet (a oldal)" icon={<Shapes className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>Kerület: <strong>K = 4a</strong></div>
              <div>Terület: <strong>T = a²</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard title="Téglalap (a, b oldalak)" icon={<Shapes className="w-4 h-4 text-indigo-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>Kerület: <strong>K = 2(a + b)</strong></div>
              <div>Terület: <strong>T = a · b = ab</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard title="Háromszög (a, b, c oldalak)" icon={<Shapes className="w-4 h-4 text-purple-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>Kerület: <strong>K = a + b + c</strong></div>
              <div>Terület: <strong>T = (a · mₐ) / 2</strong></div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Algebranyelv & Kifejezés Építő Labor */}
      <TheorySection
        number={5}
        title="Interaktív Algebranyelv és Kifejezés-Építő Laboratórium"
        icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <Card className="border-2 border-purple-200 dark:border-purple-850 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Interaktív Algebranyelv Fordító & Elemző
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Válassz ki egy hétköznapi szöveges állítást, és nézd meg, hogyan épül fel lépésről lépésre a betűs algebrai kifejezés!
              </p>
            </div>

            {/* Example selector pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {builderExamples.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedBuilderIdx(idx)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                    selectedBuilderIdx === idx
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  )}
                >
                  Példa {idx + 1}
                </button>
              ))}
            </div>

            {/* Statement card */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-purple-200 dark:border-slate-750 shadow-inner max-w-xl mx-auto space-y-4">
              <div className="text-center space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  Szöveges Feladat / Állítás
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  „{currentItem.statement}”
                </div>
              </div>

              {/* Step by step translation */}
              <div className="space-y-2.5 text-xs border-t border-b border-slate-100 dark:border-slate-800 py-3">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-purple-600">Változó kiválasztása:</span>
                  <span className="font-mono font-medium">{currentItem.variable}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-indigo-600">1. Részművelet:</span>
                  <span className="font-mono font-medium">{currentItem.step1}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-emerald-600">2. Részművelet:</span>
                  <span className="font-mono font-medium">{currentItem.step2}</span>
                </div>
              </div>

              {/* Final Result Card */}
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-bold text-purple-600 dark:text-purple-400">
                  Kész Algebrai Kifejezés
                </div>
                <div className="text-2xl font-mono font-black text-purple-700 dark:text-purple-300">
                  {currentItem.result}
                </div>
              </div>

              {/* Anatomy details */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">Kifejezés jellege:</strong>
                  {currentItem.type}
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">Fő együttható:</strong>
                  {currentItem.coefficient}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
