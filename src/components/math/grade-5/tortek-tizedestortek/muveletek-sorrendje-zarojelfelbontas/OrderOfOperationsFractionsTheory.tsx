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
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Layers,
  ArrowRight,
  Divide,
  HelpCircle,
  RefreshCw,
  PieChart,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface OrderOfOperationsFractionsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const OrderOfOperationsFractionsTheory: React.FC<OrderOfOperationsFractionsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Lab Preset Selector
  const [selectedExample, setSelectedExample] = useState<number>(1);

  const exampleData = [
    {
      id: 1,
      title: 'Szorzás és összeadás vegyesen',
      expression: '1/3 + 1/2 · 4/3',
      steps: [
        { label: '1. lépés (Szorzás prioritása)', detail: 'Először a szorzást végezzük el: 1/2 · 4/3 = 4/6 = 2/3.' },
        { label: '2. lépés (Közös nevező)', detail: 'Most összeadjuk: 1/3 + 2/3 (azonos a nevező!).' },
        { label: '3. lépés (Végeredmény)', detail: '1/3 + 2/3 = 3/3 = 1 egész.' }
      ],
      result: '1',
      rule: 'A szorzás megelőzi az összeadást!'
    },
    {
      id: 2,
      title: 'Zárójeles kivonás és osztás',
      expression: '(5/6 - 1/3) : 2',
      steps: [
        { label: '1. lépés (Zárójel feloldása)', detail: 'Először a zárójelben lévő kivonást végezzük el: 5/6 - 2/6 = 3/6 = 1/2.' },
        { label: '2. lépés (Osztás egész számmal)', detail: 'A kapott 1/2-et elosztjuk 2-vel (nevező szorzása): 1/(2 · 2) = 1/4.' },
        { label: '3. lépés (Végeredmény)', detail: 'Végeredmény: 1/4.' }
      ],
      result: '1/4',
      rule: 'A zárójelben lévő műveletnek MINDIG elsőbbsége van!'
    },
    {
      id: 3,
      title: 'Több műveletes kifejezés',
      expression: '2 - (1/4 + 3/8 · 2)',
      steps: [
        { label: '1. lépés (Zárójelen belüli szorzás)', detail: 'Zárójelen belül először a szorzás jön: 3/8 · 2 = 3/4.' },
        { label: '2. lépés (Zárójelen belüli összeadás)', detail: 'Zárójel értéke: 1/4 + 3/4 = 4/4 = 1.' },
        { label: '3. lépés (Kivonás az egészből)', detail: '2 - 1 = 1 egész.' }
      ],
      result: '1',
      rule: 'Zárójelen belül is érvényes a műveleti sorrend!'
    }
  ];

  const currentExample = exampleData.find(e => e.id === selectedExample) || exampleData[0];

  return (
    <TheoryTemplate
      title="Műveletek sorrendje, zárójelfelbontás törtekkel"
      subtitle="Sajátítsd el a törtekkel végzett összetett számítások hierarchiáját, a zárójelek felbontását és a disztributivitást!"
      badgeText="🍕 5. Osztály • II. Törtek, tizedes törtek"
      documentId="order-of-operations-fractions-theory-content"
      pdfFilename="5_osztaly_muveletek_sorrendje_tortekkel_tananyag.pdf"
      quickRule={{
        label: 'MŰVELETI SORREND PIRAMIS',
        formula: '1. (Zárójel) | 2. Szorzás, Osztás (· / :) | 3. Összeadás, Kivonás (+ / -)'
      }}
      themeColor="violet"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: A MŰVELETI SORREND PIRAMISA */}
      <TheorySection
        number={1}
        title="A műveleti sorrend piramisa"
        icon={<Binary className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <TheoryCard
          title="A műveletek hierarchiája törtek esetén is ugyanaz!"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A törtekkel végzett számításoknál <strong>pontosan ugyanazok a műveleti sorrendi szabályok érvényesek</strong>, mint az egész számoknál. Ha egy kifejezésben többféle művelet és zárójel is szerepel, szigorúan a következő sorrendben haladunk:
            </p>

            {/* Hierarchy Pyramid Visual */}
            <div className="space-y-2.5 my-3">
              {/* Level 1: Parentheses */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">1.</span>
                  <div>
                    <div className="font-black text-sm">ZÁRÓJELEK BELSŐ MŰVELETEI</div>
                    <div className="text-xs text-violet-100">Kerek zárójel <MathText>()</MathText>, szögletes zárójel <MathText>[]</MathText> — legbelülről kifelé!</div>
                  </div>
                </div>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg font-bold">Legmagasabb szint</span>
              </div>

              {/* Level 2: Mult & Div */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-indigo-900 dark:text-indigo-200">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center font-black text-sm text-indigo-900 dark:text-indigo-100">2.</span>
                  <div>
                    <div className="font-black text-sm">SZORZÁS ÉS OSZTÁS (Magasabb rendű műveletek)</div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-300">Szorzás <MathText>·</MathText> és Osztás <MathText>:</MathText> balról jobbra haladva</div>
                  </div>
                </div>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900 px-2.5 py-1 rounded-lg font-bold text-indigo-700 dark:text-indigo-300">Középső szint</span>
              </div>

              {/* Level 3: Add & Sub */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-sm text-slate-700 dark:text-slate-300">3.</span>
                  <div>
                    <div className="font-black text-sm">ÖSSZEADÁS ÉS KIVONÁS (Alacsonyabb rendű műveletek)</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Összeadás <MathText>+</MathText> és Kivonás <MathText>-</MathText> balról jobbra haladva</div>
                  </div>
                </div>
                <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-lg font-bold text-slate-600 dark:text-slate-300">Alapszint</span>
              </div>
            </div>

            <TheoryCallout variant="tip" title="Egyenrangú műveletek szabálya">
              Ha a kifejezésben csak szorzás és osztás, vagy csak összeadás és kivonás szerepel (azonos rangú műveletek), akkor <strong>szigorúan balról jobbra haladunk</strong>! Például: <MathText>3/4 : 2 · 4 = 3/8 · 4 = 12/8 = 3/2</MathText>.
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: ZÁRÓJELFELBONTÁS ÉS DISZTRÍBUTIVITÁS */}
      <TheorySection
        number={2}
        title="Zárójelfelbontás és a disztributivitás szabályai"
        icon={<Layers className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Beszorzás zárójelbe */}
          <TheoryCard
            title="1. Zárójel beszorzása számmal"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          >
            <div className="space-y-3">
              <p className="text-sm">
                Egy zárójelben lévő összeget úgy is megszorozhatunk, hogy <strong>minden tagot külön-külön megszorzunk</strong>:
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center font-mono">
                <MathText>n · (a/b + c/d) = n · a/b + n · c/d</MathText>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <div className="font-bold text-emerald-700 dark:text-emerald-300">Példa:</div>
                <div><MathText>6 · (1/2 + 1/3) = 6 · 1/2 + 6 · 1/3 = 3 + 2 = 5</MathText></div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  (Zárójelen belüli összeadással is: <MathText>6 · 5/6 = 5</MathText>!)
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Előjelváltás kivonáskor */}
          <TheoryCard
            title="2. Előjelváltás kivonáskor"
            icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
          >
            <div className="space-y-3">
              <p className="text-sm">
                Ha a zárójel előtt <strong>kivonásjel (<MathText>-</MathText>) áll</strong>, a zárójel felbontásakor a benne lévő műveleti jelek ellenkezőjükre változnak:
              </p>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border-2 border-rose-200 dark:border-rose-800 text-center font-mono">
                <MathText>x - (a/b + c/d) = x - a/b - c/d</MathText>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <div className="font-bold text-rose-700 dark:text-rose-300">Példa:</div>
                <div><MathText>2 - (1/2 + 1/4) = 2 - 1/2 - 1/4 = 1 1/2 - 1/4 = 1 1/4</MathText></div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: INTERAKTÍV MŰVELETI SORREND LABORATÓRIUM */}
      <TheorySection
        number={3}
        title="Interaktív Műveleti Sorrend Laboratórium"
        icon={<Calculator className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 border-2 border-violet-200 dark:border-violet-800">
          <div className="text-center mb-5">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Válassz egy mintafeladatot, és kövesd végig a kiértékelést!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Figyeld meg, hogy a szabályok betartásával hogyan jutunk el a helyes végeredményhez!
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {exampleData.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(ex.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 cursor-pointer",
                  selectedExample === ex.id
                    ? "bg-violet-600 border-violet-700 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-400"
                )}
              >
                {ex.id}. Feladat: {ex.title}
              </button>
            ))}
          </div>

          {/* Display Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-violet-200 dark:border-violet-800 shadow-xs space-y-5">
            <div className="text-center">
              <div className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
                Kiszámítandó kifejezés:
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
                <MathText>{currentExample.expression}</MathText>
              </div>
            </div>

            {/* Step-by-step breakdown */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Lépésről lépésre levezetés:
              </div>
              {currentExample.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900 flex items-start gap-3 text-left"
                >
                  <span className="w-6 h-6 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-xs text-violet-900 dark:text-violet-200">{st.label}</div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                      <MathText>{st.detail}</MathText>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Result Card */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">Végeredmény:</span>
                <span className="text-xl font-mono font-black text-emerald-900 dark:text-emerald-100">
                  <MathText>{currentExample.result}</MathText>
                </span>
              </div>
              <div className="text-right text-xs font-bold text-emerald-700 dark:text-emerald-300">
                💡 {currentExample.rule}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: GYAKORI HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Gyakori hibák és csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Összeadás elvégzése szorzás előtt"
            wrong="1/4 + 1/4 · 3 = 2/4 · 3 = 6/4 = 3/2"
            correct="1/4 + 1/4 · 3 = 1/4 + 3/4 = 4/4 = 1"
            explanation="A szorzás MINDIG megelőzi az összeadást! Először a szorzást kell kiszámolni: 1/4 · 3 = 3/4, majd ehhez adjuk az 1/4-et!"
          />

          <TheoryTrapBox
            title="2. Csapda: Balról jobbra szabály megsértése"
            wrong="1/2 : 2 · 4 = 1/2 : 8 = 1/16"
            correct="1/2 : 2 · 4 = 1/4 · 4 = 4/4 = 1"
            explanation="Az osztás és a szorzás azonos rangú! Ha nincs zárójel, mindig balról jobbra haladunk: előbb az osztást (1/2 : 2 = 1/4), majd a szorzást (1/4 · 4 = 1) végezzük el!"
          />

          <TheoryTrapBox
            title="3. Csapda: Zárójel figyelmen kívül hagyása"
            wrong="(1/3 + 1/6) · 2 = 1/3 + 1/6 · 2 = 1/3 + 2/6 = 2/3"
            correct="(1/3 + 1/6) · 2 = (2/6 + 1/6) · 2 = 3/6 · 2 = 1/2 · 2 = 1"
            explanation="A zárójelben lévő összeadásnak abszolút elsőbbsége van a külső szorzással szemben!"
          />

          <TheoryTrapBox
            title="4. Csapda: Zárójel előtti mínuszjel elrontása"
            wrong="1 - (1/3 + 1/3) = 1 - 1/3 + 1/3 = 1"
            correct="1 - (1/3 + 1/3) = 1 - 2/3 = 1/3"
            explanation="Ha felbontjuk a zárójelet: 1 - 1/3 - 1/3 = 1/3. A zárójelben lévő pluszjel mínuszra változik!"
          />
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={5}
        title="Összefoglaló táblázat: Műveleti sorrendi szabályok"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          title="Műveleti sorrend ellenőrző lista"
          headers={['Kifejezés típusa', 'Melyik műveletet végezzük el először?', 'Példa', 'Végeredmény']}
          rows={[
            ['Zárójeles kifejezés', 'Mindig a zárójel belsejét', '(1/2 + 1/4) · 4', '3/4 · 4 = 3'],
            ['Szorzás / Osztás és Összeadás', 'A szorzást vagy osztást', '1/3 + 2/3 : 2', '1/3 + 1/3 = 2/3'],
            ['Csak szorzás és osztás', 'Balról jobbra haladva', '3/5 · 2 : 3', '6/5 : 3 = 2/5'],
            ['Csak összeadás és kivonás', 'Balról jobbra haladva', '1/2 + 1/4 - 1/8', '3/4 - 1/8 = 5/8'],
            ['Többszörös zárójel', 'Legbelső zárójeltől kifelé', '1 - [1/2 · (1/3 + 1/3)]', '1 - [1/2 · 2/3] = 1 - 1/3 = 2/3']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OrderOfOperationsFractionsTheory;
