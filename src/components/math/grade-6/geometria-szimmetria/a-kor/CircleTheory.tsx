import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  CircleElementsOverviewDiagram,
  CircleLineRelationshipsDiagram,
  CircleSectorsDiagram,
  CirclePartHighlightFigure
} from './CircleDiagrams';
import {
  Circle,
  Sparkles,
  Shapes,
  Calculator,
  Compass,
  Layers,
  Ruler,
  PieChart
} from 'lucide-react';

export interface CircleTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export function CircleTheory({
  onBack = () => {},
  onStartQuiz,
  onSwitchToQuiz
}: CircleTheoryProps) {
  const sections: TheorySection[] = [
    // 1. SZAKASZ: A KÖR ÉS KÖRVONAL FOGALMA
    {
      id: 'sec-circle-intro',
      title: '1. A kör és a körvonal fogalma, középpont és sugár',
      icon: <Circle className="w-5 h-5 text-purple-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A síkban egy rögzített <strong>O ponttól</strong> (a kör középpontjától) adott <strong>r távolságra</strong> lévő
            összes pont halmazát <strong>körvonalnak</strong> (vagy egyszerűen körnek) nevezzük.
          </p>

          <CircleElementsOverviewDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TheoryCard title="Középpont (O)" badge="Alappont" variant="purple">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A kör szimmetriaközéppontja. A körvonal minden egyes pontja pontosan azonos (r) távolságra van tőle.
              </p>
            </TheoryCard>

            <TheoryCard title="Sugár (r)" badge="Alapméret" variant="amber">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A középpontot a körvonal bármely pontjával összekötő szakasz, illetve ennek hossza (latinul: <em>radius</em>).
              </p>
            </TheoryCard>

            <TheoryCard title="Körlap vs. Körvonal" badge="Fontos különbség" variant="cyan">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A <strong>körvonal</strong> csak a határoló vonal (1D), míg a <strong>körlap</strong> a körvonal és az általa körülzárt belső pontok összessége (2D síkidom).
              </p>
            </TheoryCard>
          </div>

          <TheoryCallout title="Pontok elhelyezkedése a körhöz képest" variant="info">
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>Belső pont:</strong> ha a középponttól mért távolsága kisebb a sugárnál: d(O, P) &lt; r.</li>
              <li><strong>Körvonal pontja:</strong> ha a távolsága pontosan egyenlő a sugárral: d(O, P) = r.</li>
              <li><strong>Külső pont:</strong> ha a távolsága nagyobb a sugárnál: d(O, P) &gt; r.</li>
            </ul>
          </TheoryCallout>
        </div>
      )
    },

    // 2. SZAKASZ: A KÖR VONALAI ÉS SZAKASZAI
    {
      id: 'sec-circle-lines',
      title: '2. Átmérő, húr, körív és az egyenesek helyzete',
      icon: <Ruler className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A kör geometriájában megkülönböztetünk belső szakaszokat (átmérő, húr), íveket, valamint a kört érintő vagy metsző egyeneseket.
          </p>

          <CircleLineRelationshipsDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-700 dark:text-emerald-300">Átmérő (d = 2r)</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
                  d = 2 · r
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A kör <strong>leghosszabb húrja</strong>, amely áthalad a kör <strong>O középpontján</strong>.
                A sugár pontosan a felét teszi ki: <MathText>r = d / 2</MathText>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-orange-700 dark:text-orange-300">Húr és Körív</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200">
                  Húr &amp; ív
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A <strong>húr</strong> a körvonal két tetszőleges pontját összekötő szakasz.
                A <strong>körív</strong> a körvonal ezen két pont közé eső szakasza.
              </p>
            </div>
          </div>

          <TheoryCallout title="Az Érintő Érintési Tétele (e ⊥ r)" variant="tip">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az érintő egyenesnek <strong>egyetlen közös pontja</strong> van a körrel (az érintési pont: E).
              Az érintő <strong>mindig merőleges (90°)</strong> az érintési pontba húzott sugárra: <strong className="font-mono text-purple-700 dark:text-purple-300">e ⊥ OE</strong>.
            </p>
          </TheoryCallout>

          <TheoryTrapBox
            wrong="Az átmérő nem húr, mert átmegy a középponton."
            correct="Az átmérő a kör LEGHOSSZABB húrja! Minden átmérő húr, de nem minden húr átmérő."
            explanation="Mivel az átmérő két végpontja a körvonalon van, teljesíti a húr definícióját."
          />
        </div>
      )
    },

    // 3. SZAKASZ: KÖRVONALBÓL ÉS KÖRLAPBÓL SZÁRMAZÓ SÍKIDOMOK
    {
      id: 'sec-circle-sectors',
      title: '3. Síkrészek: Körcikk, körszelet, körgyűrű és félkör',
      icon: <PieChart className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A körlapot sugarakkal, húrokkal vagy koncentrikus körökkel különböző szabályos geometriai részekre bonthatjuk.
          </p>

          <CircleSectorsDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-amber-600">Körcikk (cikkely)</div>
              <p className="text-slate-600 dark:text-slate-300">Két sugár és az általuk közbezárt körív határolja (pizzaszelet).</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-pink-600">Körszelet</div>
              <p className="text-slate-600 dark:text-slate-300">Egy húr és a hozzátartozó körív által határolt síkrész.</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-purple-600">Körgyűrű</div>
              <p className="text-slate-600 dark:text-slate-300">Két azonos középpontú (koncentrikus) kör közötti sáv.</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-emerald-600">Félkör és Negyedkör</div>
              <p className="text-slate-600 dark:text-slate-300">180°-os (félkör) és 90°-os (negyedkör) középponti szögű körcikkek.</p>
            </div>
          </div>
        </div>
      )
    },

    // 4. SZAKASZ: KERÜLET, TERÜLET ÉS A PI SZÁM
    {
      id: 'sec-circle-formulas',
      title: '4. A kör kerülete, területe és a Ludolph-féle szám (π)',
      icon: <Calculator className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Minden kör esetén a kerület (K) és az átmérő (d) hányadosa egy állandó szám, amelyet a görög <strong>π (pí)</strong> betűvel jelölünk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TheoryCard title="A π (pí) szám" badge="Ludolph-féle szám" variant="purple">
              <div className="text-xl font-bold font-mono text-purple-900 dark:text-purple-200 mb-1">
                π ≈ 3.14159...
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Végtelen, nem szakaszos tizedestört. A feladatokban leggyakrabban a <strong>3.14</strong> kerekítéssel számolunk.
              </p>
            </TheoryCard>

            <TheoryCard title="Kör kerülete (K)" badge="Körvonal hossza" variant="emerald">
              <div className="text-lg font-bold font-mono text-emerald-900 dark:text-emerald-200 mb-1">
                K = 2 · r · π = d · π
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A körvonal teljes hossza, ha kiterítenénk egy egyenes szakasszá.
              </p>
            </TheoryCard>

            <TheoryCard title="Kör területe (T)" badge="Körlap nagysága" variant="indigo">
              <div className="text-lg font-bold font-mono text-indigo-900 dark:text-indigo-200 mb-1">
                T = r² · π
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A körlap által lefedett síkrész nagysága (a sugár négyzetének és π-nek a szorzata).
              </p>
            </TheoryCard>
          </div>
        </div>
      )
    },

    // 5. SZAKASZ: KIDOLGOZOTT MINTAPÉLDÁK
    {
      id: 'sec-examples',
      title: '5. Kidolgozott mintapéldák levezetéssel',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4">
          {/* 1. Példa */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200">
                1. Mintapélda: Sugár és átmérő átszámítása
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">d = 2r</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              Egy kör sugara r = 7 cm. Mekkora a kör átmérője (d), és mekkora a sugara egy d = 18 cm átmérőjű másik körnek?
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div>• Az átmérő a sugár kétszerese: d = 2 · r = 2 · 7 cm = <strong>14 cm</strong>.</div>
              <div>• A sugár az átmérő fele: r = d / 2 = 18 cm / 2 = <strong>9 cm</strong>.</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                Válasz: Az első kör átmérője 14 cm, a második kör sugara 9 cm.
              </div>
            </div>
          </div>

          {/* 2. Példa */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
                2. Mintapélda: Kerületszámítás (π ≈ 3.14)
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">K = 2 · r · π</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              Számítsd ki egy r = 5 cm sugarú kör kerületét! (π ≈ 3.14-gyel számolj)
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div>• Képlet: K = 2 · r · π = 2 · 5 cm · 3.14</div>
              <div>• Számolás: 10 · 3.14 = <strong>31.4 cm</strong>.</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                Válasz: Az 5 cm sugarú kör kerülete 31.4 cm.
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onSwitchToQuiz={onSwitchToQuiz}
      title="A kör"
      subtitle="A kör és körvonal fogalma, sugár, átmérő, húr, ív, érintő, körcikk és a kör kerülete/területe"
      badgeText="📐 6. Osztály • III. Geometria • 3. Fejezet"
      topicId="g6-circle-theory"
      documentId="g6-circle-theory-doc"
      pdfFilename="a-kor-tananyag.pdf"
      themeColor="purple"
      quickRule={{
        label: 'A kör alaptételei',
        formula: 'd = 2 · r    és    K = 2 · r · π    és    T = r² · π'
      }}
      practiceTitle="Készen állsz a kör kvízre és párosítóra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses geometriai kvízben és a képi párosítóban 3 nehézségi szinten!"
      sections={sections}
    />
  );
}
