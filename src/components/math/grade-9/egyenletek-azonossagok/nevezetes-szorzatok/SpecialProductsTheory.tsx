import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Calculator,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Scale,
  Equal,
  Zap,
  HelpCircle
} from 'lucide-react';
import {
  SumSquareSvg,
  DiffSquareSvg,
  SumDiffProductSvg,
  MentalMathSvg
} from './SpecialProductsFigures';

interface SpecialProductsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SpecialProductsTheory: React.FC<SpecialProductsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV AZONOSSÁG KALKULÁTOR ÁLLAPOTOK ---
  const [identType, setIdentType] = useState<'sum_sq' | 'diff_sq' | 'sum_diff'>('sum_sq');
  const [coeffA, setCoeffA] = useState<number>(2);
  const [constB, setConstB] = useState<number>(3);

  const calculation = useMemo(() => {
    const aSq = coeffA * coeffA;
    const bSq = constB * constB;
    const twoAB = 2 * coeffA * constB;

    if (identType === 'sum_sq') {
      // (ax + b)² = a²x² + 2abx + b²
      return {
        formula: `(${coeffA === 1 ? '' : coeffA}x + ${constB})²`,
        rule: '(a + b)² = a² + 2ab + b²',
        step1: `1. Első tag négyzete: (${coeffA === 1 ? '' : coeffA}x)² = ${aSq}x²`,
        step2: `2. Kétszeres szorzat: 2 · (${coeffA === 1 ? '' : coeffA}x) · (${constB}) = +${twoAB}x`,
        step3: `3. Második tag négyzete: (${constB})² = +${bSq}`,
        result: `${aSq}x² + ${twoAB}x + ${bSq}`
      };
    } else if (identType === 'diff_sq') {
      // (ax - b)² = a²x² - 2abx + b²
      return {
        formula: `(${coeffA === 1 ? '' : coeffA}x - ${constB})²`,
        rule: '(a - b)² = a² - 2ab + b²',
        step1: `1. Első tag négyzete: (${coeffA === 1 ? '' : coeffA}x)² = ${aSq}x²`,
        step2: `2. Kétszeres szorzat (negatív előjellel!): - 2 · (${coeffA === 1 ? '' : coeffA}x) · (${constB}) = -${twoAB}x`,
        step3: `3. Második tag négyzete (pozitív!): (-${constB})² = +${bSq}`,
        result: `${aSq}x² - ${twoAB}x + ${bSq}`
      };
    } else {
      // (ax + b)(ax - b) = a²x² - b²
      return {
        formula: `(${coeffA === 1 ? '' : coeffA}x + ${constB}) · (${coeffA === 1 ? '' : coeffA}x - ${constB})`,
        rule: '(a + b)(a - b) = a² - b²',
        step1: `1. Első tag négyzete: (${coeffA === 1 ? '' : coeffA}x)² = ${aSq}x²`,
        step2: `2. A vegyes tagok kiejtik egymást: +${coeffA * constB}x - ${coeffA * constB}x = 0`,
        step3: `3. Második tag négyzete kivonva: - (${constB})² = -${bSq}`,
        result: `${aSq}x² - ${bSq}`
      };
    }
  }, [identType, coeffA, constB]);

  return (
    <TheoryTemplate
      title="Nevezetes Szorzatok – A Három Alapvető Algebrai Azonosság"
      subtitle="Kéttagú összeg négyzete, kéttagú különbség négyzete és a négyzetek különbsége algebrai és geometriai szemléltetéssel"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 3. TÉMAKÖR"
      themeColor="purple"
      documentId="special-products-theory"
      pdfFilename="9_osztaly_nevezetes_szorzatok.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Három Legfontosabb Nevezetes Azonosság Képlete',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-purple-600 dark:text-purple-400 font-black">1. Összeg négyzete: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">(a + b)² = a² + 2ab + b²</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">2. Különbség négyzete: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">(a - b)² = a² - 2ab + b²</span>
            </div>
            <div>
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-black">3. Négyzetek különbsége: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">(a + b)(a - b) = a² - b²</span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: KÉTTAGÚ ÖSSZEG NÉGYZETE */}
      <TheorySection
        number={1}
        title="Kéttagú Összeg Négyzete: (a + b)² = a² + 2ab + b²"
        icon={<Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="1. Alapazonosság"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Ha egy kéttagú összeget önmagával szorzunk meg, akkor a zárójelfelbontás szabálya szerint:
          <span className="block my-2 text-center font-mono font-bold text-purple-700 dark:text-purple-300 text-base">
            (a + b)² = (a + b)(a + b) = a·a + a·b + b·a + b·b = a² + 2ab + b²
          </span>
        </p>

        {/* Összeg négyzete területmodell */}
        <div className="flex justify-center my-6">
          <SumSquareSvg size={380} />
        </div>

        <TheoryCard
          title="Geometriai Szemléltetés"
          icon={<Layers className="w-5 h-5 text-purple-600" />}
          color="purple"
        >
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Képzeljünk el egy olyan négyzetet, amelynek oldalhossza <code className="font-mono">a + b</code>.
            Ennek területe pontosan 4 részből tevődik össze: egy <code className="font-mono font-bold">a²</code> területű négyzetből,
            két darab <code className="font-mono font-bold">ab</code> területű téglalapból, és egy <code className="font-mono font-bold">b²</code> területű kis négyzetből!
          </p>
        </TheoryCard>

        <TheoryTrapBox
          title="A matematika leggyakoribb típushibája: (a + b)² ≠ a² + b²"
          trap="(x + 3)² = x² + 9  (VÉGZETES HIBA!)"
          correction="(x + 3)² = x² + 2·x·3 + 3² = x² + 6x + 9  (HELYES!)"
          explanation="Soha ne felejtsd el a középső kétszeres szorzatot (+2ab)! Helyettesíts be pl. x = 1: (1+3)² = 16, míg 1² + 9 csak 10 lenne!"
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: KÉTTAGÚ KÜLÖNBSÉG NÉGYZETE */}
      <TheorySection
        number={2}
        title="Kéttagú Különbség Négyzete: (a - b)² = a² - 2ab + b²"
        icon={<AlertTriangle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="2. Alapazonosság"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Különbség négyzetre emelésekor a levezetés:
          <span className="block my-2 text-center font-mono font-bold text-indigo-700 dark:text-indigo-300 text-base">
            (a - b)² = (a - b)(a - b) = a² - ab - ba + b² = a² - 2ab + b²
          </span>
        </p>

        {/* Különbség négyzete ábra */}
        <div className="flex justify-center my-6">
          <DiffSquareSvg size={380} />
        </div>

        <TheoryCallout
          type="tip"
          title="Figyeld meg a két előjelet!"
        >
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <p>
              A különbség négyzetében a középső tag előjele <strong>negatív</strong> (<code className="font-mono font-bold text-indigo-700 dark:text-indigo-300">-2ab</code>),
              de a harmadik tag négyzete <strong>mindig pozitív</strong> (<code className="font-mono font-bold text-indigo-700 dark:text-indigo-300">+b²</code>),
              mivel <code className="font-mono">(-b)² = +b²</code>!
            </p>
          </div>
        </TheoryCallout>

        <TheoryTable
          headers={['Kifejezés', 'a és b értéke', 'Kétszeres szorzat: 2ab', 'Kibontott alak']}
          rows={[
            ['(x - 5)²', 'a = x, b = 5', '2 · x · 5 = 10x', 'x² - 10x + 25'],
            ['(2x - 3)²', 'a = 2x, b = 3', '2 · 2x · 3 = 12x', '4x² - 12x + 9'],
            ['(3x - 4y)²', 'a = 3x, b = 4y', '2 · 3x · 4y = 24xy', '9x² - 24xy + 16y²'],
            ['(5 - x)²', 'a = 5, b = x', '2 · 5 · x = 10x', '25 - 10x + x²  (= x² - 10x + 25)']
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: KÉT TAG ÖSSZEGÉNEK ÉS KÜLÖNBSÉGÉNEK SZORZATA */}
      <TheorySection
        number={3}
        title="Összeg és Különbség Szorzata: (a + b)(a - b) = a² - b²"
        icon={<Equal className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />}
        badge="3. Alapazonosság"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Ha ugyanazt a két tagot egyszer összeadjuk, egyszer kivonjuk, és ezeket megszorozzuk,
          a vegyes tagok pontosan kiejtik egymást:
          <span className="block my-2 text-center font-mono font-bold text-fuchsia-700 dark:text-fuchsia-300 text-base">
            (a + b)(a - b) = a² - ab + ba - b² = a² - b²
          </span>
          Ezt az azonosságot gyakran <strong>négyzetek különbségének</strong> is nevezzük.
        </p>

        {/* Négyzetek különbsége ábra */}
        <div className="flex justify-center my-6">
          <SumDiffProductSvg size={380} />
        </div>

        {/* INTERAKTÍV AZONOSSÁG KALKULÁTOR */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50/50 dark:from-slate-900 dark:to-purple-950/30 border-2 border-purple-200 dark:border-purple-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-5 h-5 text-purple-600" />
            <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
              Interaktív Nevezetes Azonosság Kalkulátor
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Válaszd ki az azonosság típusát, állítsd be az együtthatókat, és figyeld a pontos levezetést!
          </p>

          {/* Azonosság típus gombok */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
            <button
              onClick={() => setIdentType('sum_sq')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                identType === 'sum_sq'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-400'
              }`}
            >
              (ax + b)²
            </button>
            <button
              onClick={() => setIdentType('diff_sq')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                identType === 'diff_sq'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-400'
              }`}
            >
              (ax - b)²
            </button>
            <button
              onClick={() => setIdentType('sum_diff')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                identType === 'sum_diff'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-400'
              }`}
            >
              (ax + b)(ax - b)
            </button>
          </div>

          {/* Paraméter választók */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-5 text-xs">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Együttható a: <span className="text-purple-600 font-black">{coeffA}</span>
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setCoeffA(v)}
                    className={`px-3 py-1 rounded text-xs font-bold ${coeffA === v ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Konstans b: <span className="text-indigo-600 font-black">{constB}</span>
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5, 7].map((v) => (
                  <button
                    key={v}
                    onClick={() => setConstB(v)}
                    className={`px-3 py-1 rounded text-xs font-bold ${constB === v ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Levezetés kártya */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-slate-400">Azonosság:</span>
              <span className="text-sm font-bold text-purple-300">{calculation.formula}</span>
            </div>
            <div className="text-slate-300 space-y-1 py-1">
              <div className="text-amber-300">{calculation.rule}</div>
              <div>{calculation.step1}</div>
              <div>{calculation.step2}</div>
              <div>{calculation.step3}</div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-700 pt-2 text-sm">
              <span className="text-slate-400 font-bold">Kifejtett alak:</span>
              <span className="text-emerald-400 font-black text-base">{calculation.result}</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: GYORS FEJSZÁMOLÁSI TRÜKKÖK */}
      <TheorySection
        number={4}
        title="Villámgyors Fejszámolás Nevezetes Azonosságokkal"
        icon={<Zap className="w-5 h-5 text-amber-500" />}
        badge="Gyakorlati Trükkök"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A nevezetes szorzatok nemcsak betűs kifejezéseknél, hanem nagy számok fejben való szorzásakor és négyzetre emelésekor is csodafegyverek!
        </p>

        {/* Fejszámolás ábra */}
        <div className="flex justify-center my-6">
          <MentalMathSvg size={380} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-purple-900 dark:text-purple-200 text-sm mb-2">
              1. Szimmetrikus szorzatok: (a + b)(a - b)
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>• <strong>51 · 49</strong> = (50 + 1)(50 - 1) = 50² - 1² = 2500 - 1 = <strong>2499</strong></div>
              <div>• <strong>32 · 28</strong> = (30 + 2)(30 - 2) = 30² - 2² = 900 - 4 = <strong>896</strong></div>
              <div>• <strong>105 · 95</strong> = (100 + 5)(100 - 5) = 100² - 5² = 10000 - 25 = <strong>9975</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-2">
              2. Kerek számokhoz közeli négyzetek:
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>• <strong>51²</strong> = (50 + 1)² = 50² + 2·50·1 + 1² = 2500 + 100 + 1 = <strong>2601</strong></div>
              <div>• <strong>49²</strong> = (50 - 1)² = 50² - 2·50·1 + 1² = 2500 - 100 + 1 = <strong>2401</strong></div>
              <div>• <strong>99²</strong> = (100 - 1)² = 10000 - 200 + 1 = <strong>9801</strong></div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TOVÁBBI AZONOSSÁGOK (EMELT SZINT ÉS KÖBÖS ALAKOK) */}
      <TheorySection
        number={5}
        title="Köbös Azonosságok és Érettségi Összefoglaló"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Emelt Szint & Kitekintés"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <p>
            A középiskolában a harmadik hatványra vonatkozó nevezetes azonosságokkal is találkozunk:
          </p>

          <TheoryTable
            headers={['Azonosság neve', 'Kifejezés', 'Kibontott alak']}
            rows={[
              ['Kéttagú összeg köbe', '(a + b)³', 'a³ + 3a²b + 3ab² + b³'],
              ['Kéttagú különbség köbe', '(a - b)³', 'a³ - 3a²b + 3ab² - b³'],
              ['Köbök összege', 'a³ + b³', '(a + b)(a² - ab + b²)'],
              ['Köbök különbsége', 'a³ - b³', '(a - b)(a² + ab + b²)']
            ]}
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
