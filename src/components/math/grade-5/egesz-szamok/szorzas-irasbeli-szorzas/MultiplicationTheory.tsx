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

export interface MultiplicationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function MultiplicationTheory({ onBack, onStartQuiz }: MultiplicationTheoryProps) {
  // Interactive Simulator State
  const [factorA, setFactorA] = useState<string>('36');
  const [factorB, setFactorB] = useState<string>('23');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'leftToRight' | 'rightToLeft'>('leftToRight');

  // Color mapping per multiplier digit
  const DIGIT_COLORS = [
    {
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-600 text-white',
      cellBg: 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-black',
      border: 'border-blue-400 dark:border-blue-600'
    },
    {
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-600 text-white',
      cellBg: 'bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-black',
      border: 'border-rose-400 dark:border-rose-600'
    },
    {
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-600 text-white',
      cellBg: 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-black',
      border: 'border-emerald-400 dark:border-emerald-600'
    },
    {
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-600 text-white',
      cellBg: 'bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-black',
      border: 'border-purple-400 dark:border-purple-600'
    }
  ];

  const getMultiplicationSteps = (aStr: string, bStr: string, dir: 'leftToRight' | 'rightToLeft') => {
    const a = parseInt(aStr.replace(/\s+/g, ''), 10);
    const b = parseInt(bStr.replace(/\s+/g, ''), 10);

    if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || a > 999999 || b > 9999) {
      return {
        error: 'Kérlek adj meg érvényes természetes számokat (első legfeljebb 6 jegyű, második legfeljebb 4 jegyű)!',
        steps: [],
        product: 0
      };
    }

    const bDigits = b.toString().split('').map((d) => parseInt(d, 10));
    const isSingleDigit = bDigits.length === 1;
    const steps: { title: string; desc: string; partialVal?: number }[] = [];

    steps.push({
      title: '1. Előkészítés és becslés',
      desc: `Felírjuk a műveletet: ${a} · ${b}. Előzetes becslés: ${Math.round(a / 10) * 10} · ${Math.round(b / 10) * 10 || b} ≈ ${a * b}.`
    });

    if (isSingleDigit) {
      steps.push({
        title: '2. Szorzás egyjegyű számmal',
        desc: `A(z) ${b}-vel jobbról balra végigszorozzuk a(z) ${a} számjegyeit, az átviteleket hozzáadjuk a következő helyiértékhez.`
      });
    } else {
      const iterDigits = dir === 'leftToRight' ? bDigits : [...bDigits].reverse();
      iterDigits.forEach((digit, idx) => {
        const placeVal = dir === 'leftToRight' ? Math.pow(10, bDigits.length - 1 - idx) : Math.pow(10, idx);
        steps.push({
          title: `${idx + 2}. Részszorzat: Szorzás ${digit}-val (${digit * placeVal} érték)`,
          desc: `A felső ${a}-t megszorozzuk ${digit}-val. Részeredmény: ${a * digit} (helyiértéke: ${a * digit * placeVal}).`,
          partialVal: a * digit
        });
      });

      steps.push({
        title: `${steps.length + 1}. Részszorzatok összeadása`,
        desc: `A helyiérték szerint eltolt részszorzatokat összeadjuk. Végeredmény: ${a * b}.`
      });
    }

    return {
      error: null,
      a,
      b,
      product: a * b,
      steps,
      isSingleDigit
    };
  };

  const simData = getMultiplicationSteps(factorA, factorB, direction);

  return (
    <TheoryTemplate
      title="Szorzás, írásbeli szorzás"
      subtitle="A szorzás fogalma, tényezők és szorzat, a szorzás tulajdonságai, szorzás 10-zel, 100-zal, egy- és többjegyű írásbeli szorzás"
      documentId="multiplication-theory-content"
      pdfFileName="Szorzas_Irasbeli_Szorzas_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badgeColor="emerald"
      quickRule={{
        title: "Szorzási Alapszabály",
        formula: "1. Tényező · 2. Tényező = Szorzat  ⟹  a · b = b · a (felcserélhető) és a · (b + c) = a·b + a·c (széttagolható)"
      }}
    >
      {/* 1. RÉSZ: A SZORZÁS FOGALMA ÉS TAGJAI */}
      <TheorySection
        number={1}
        title="A szorzás fogalma, tagjai és a 0, 1 szerepe"
        icon={<Zap className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="info" title="Mit jelent a szorzás?">
          A szorzás <strong>egyenlő tagok ismételt összeadásának</strong> rövidítése: <span className="font-mono font-bold">4 · 5 = 5 + 5 + 5 + 5 = 20</span>.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="1. Tényező (Szorzandó)" icon={<BookOpen className="w-4 h-4 text-blue-600" />} badge="Első tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, amelyet megszorzunk, vagy amely megmutatja az egyenlő csoportok számát.
            </p>
            <div className="mt-2 text-center py-1 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
              Példa: 24 · 5 ⟹ 24
            </div>
          </TheoryCard>

          <TheoryCard title="2. Tényező (Szorzó)" icon={<Zap className="w-4 h-4 text-emerald-600" />} badge="Második tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, amellyel szorzunk.
            </p>
            <div className="mt-2 text-center py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs">
              Példa: 24 · 5 ⟹ 5
            </div>
          </TheoryCard>

          <TheoryCard title="Szorzat (Eredmény)" icon={<CheckCircle2 className="w-4 h-4 text-purple-600" />} badge="Eredmény">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szorzás végeredménye.
            </p>
            <div className="mt-2 text-center py-1 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-700 dark:text-purple-300 font-mono font-bold text-xs">
              24 · 5 = 120 ⟹ 120
            </div>
          </TheoryCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A 0 és az 1 a szorzásban" icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <li>• <strong>Szorzás 1-gyel:</strong> bármely számot 1-gyel szorozva önmagát kapjuk (<span className="font-mono font-bold">a · 1 = a</span>). Az 1 a szorzás semleges eleme.</li>
              <li>• <strong>Szorzás 0-val:</strong> bármely számot 0-val szorozva az eredmény mindig 0 (<span className="font-mono font-bold">a · 0 = 0</span>).</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="A szorzás mint ismételt összeadás" icon={<Sparkles className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A szorzás valójában azonos tagok gyors összeadását jelenti:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs mt-1 text-center">
              4 · 6 = 6 + 6 + 6 + 6 = 24
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: A SZORZÁS TULAJDONSÁGAI */}
      <TheorySection
        number={2}
        title="A szorzás alapvető tulajdonságai és a széttagolás"
        icon={<Sparkles className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Felcserélhetőség" badge="Kommutativitás">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A tényezők sorrendje felcserélhető, a szorzat nem változik:
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-center font-mono font-bold text-xs text-blue-800 dark:text-blue-300">
              a · b = b · a <br />(4 · 7 = 7 · 4 = 28)
            </div>
          </TheoryCard>

          <TheoryCard title="2. Csoportosíthatóság" badge="Asszociativitás">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Több tényező szorzatakor a tagok tetszőlegesen párosíthatók:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-center font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">
              (a · b) · c = a · (b · c) <br />(2 · 5) · 9 = 10 · 9 = 90
            </div>
          </TheoryCard>

          <TheoryCard title="3. Széttagolhatóság (Disztributivitás)" badge="Kulcsszabály!">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Összeget vagy különbséget tagonként szorozhatunk:
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-center font-mono font-bold text-xs text-purple-800 dark:text-purple-300">
              a · (b + c) = a·b + a·c <br />6 · 23 = 6·20 + 6·3 = 138
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: SZORZÁS 10-ZEL, 100-ZAL, 1000-REL */}
      <TheorySection
        number={3}
        title="Gyors szorzás 10-zel, 100-zal, 1000-rel és kerek tízesekkel"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          title="Helyiérték-eltolás szabálya 10 hatványaival történő szorzáskor"
          headers={['Szorzó', 'Szabály', 'Példa', 'Eredmény']}
          rows={[
            ['· 10', 'A szám végére 1 nullát írunk (minden helyiérték 10x lesz)', '45 · 10', '450'],
            ['· 100', 'A szám végére 2 nullát írunk', '72 · 100', '7 200'],
            ['· 1 000', 'A szám végére 3 nullát írunk', '38 · 1 000', '38 000'],
            ['· Kerek tízes (pl. 30)', 'Szorozzuk a számmal (3), majd 1 nullát a végére', '14 · 30 = (14 · 3) · 10', '420']
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: AZ ÍRÁSBELI SZORZÁS LÉPÉSEI */}
      <TheorySection
        number={4}
        title="Az írásbeli szorzás menete (Egy- és többjegyű szorzóval)"
        icon={<Layers className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. Egyjegyű szorzóval (pl. 348 · 6)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>• <strong>Jobbról balra haladunk:</strong> egyesek, tízesek, százasok.</p>
              <p>• 6 · 8 = 48 ⟹ leírjuk a <strong>8</strong>-at, maradt a <strong>4</strong>.</p>
              <p>• 6 · 4 = 24 + 4 = 28 ⟹ leírjuk a <strong>8</strong>-at, maradt a <strong>2</strong>.</p>
              <p>• 6 · 3 = 18 + 2 = 20 ⟹ leírjuk a <strong>20</strong>-at.</p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-center">
                348 · 6 = 2 088
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Kétjegyű szorzóval (pl. 36 · 23)" icon={<Layers className="w-4 h-4 text-purple-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>• <strong>1. részszorzat (20-szal):</strong> 2 · 36 = 72 (tízes helyiértéken: 720).</p>
              <p>• <strong>2. részszorzat (3-mal):</strong> 3 · 36 = 108 (egyesek alá igazítva).</p>
              <p>• <strong>Összeadás:</strong> 720 + 108 = 828.</p>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-800 dark:text-purple-300 font-mono font-bold text-center">
                36 · 23 = 828
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="A 0 és az 1 szorzásának keverése az összeadással"
            wrong="7 · 0 = 7  vagy  7 · 1 = 1"
            correct="7 · 0 = 0 (bármi · 0 = 0)  és  7 · 1 = 7 (az 1 semleges elem)!"
            explanation="Nullával szorozva semmi sem marad (0), 1-gyel szorozva pedig az eredeti szám marad meg."
          />
          <TheoryTrapBox
            title="A 2. részszorzat eltolásának elfelejtése kétjegyű szorzónál"
            wrong="34 · 23 esetén a 2-vel (20-szal) vett szorzatot közvetlenül az egyesek alá írni"
            correct="A tízesekkel szorzott sort (2 · 34 = 68) 1 hellyel balra tolva, a tízesek alá kell írni (680)!"
            explanation="Mivel a szorzó tízes helyiértékével szorzunk, a részszorzat értéke tízesekben értendő."
          />
          <TheoryTrapBox
            title="Maradék (átvitel) hozzáadása a szorzás ELŐTT"
            wrong="36 · 4 esetén 4 · 6 = 24 (maradt 2), majd a tízesnél (3 + 2) · 4 = 20-at számolni"
            correct="Előbb szorzunk, utána adjuk hozzá az átvitelt: 4 · 3 = 12, és 12 + 2 = 14 (eredmény: 144)!"
            explanation="Az írásbeli algoritmusban a műveleti sorrend kötött: először szorzás, utána a maradék hozzáadása."
          />
          <TheoryTrapBox
            title="Szorzás 10-zel / 100-zal: felesleges írásbeli algoritmus"
            wrong="58 · 100-at hosszas írásbeli szorzással kiszámolni"
            correct="Csak írj 2 nullát a szám végére: 58 · 100 = 5 800!"
            explanation="10 hatványaival való szorzáskor a számjegyek balra lépnek, így annyi nullát teszünk mögé, ahány 0 a szorzóban van."
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: INTERAKTÍV ÍRÁSBELI SZORZÁS SZIMULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Lépésről Lépésre Írásbeli Szorzás Szimulátor"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
        className="no-pdf"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">1. Tényező (Szorzandó):</label>
              <input
                type="number"
                value={factorA}
                onChange={(e) => {
                  setFactorA(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">2. Tényező (Szorzó):</label>
              <input
                type="number"
                value={factorB}
                onChange={(e) => {
                  setFactorB(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>
          </div>

          {simData && !simData.error && (
            <div className="space-y-4 pt-2">
              <div className="flex justify-center">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center font-mono font-bold text-lg">
                  <div className="text-slate-800 dark:text-slate-200">
                    {simData.a} · {simData.b} = <span className="text-emerald-600 dark:text-emerald-400">{simData.product.toLocaleString('hu-HU')}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  {simData.steps[stepIndex]?.title}
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  {simData.steps[stepIndex]?.desc}
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
                  {stepIndex + 1} / {simData.steps.length} lépés
                </div>
                <Button
                  size="sm"
                  onClick={() => setStepIndex((prev) => Math.min(simData.steps.length - 1, prev + 1))}
                  disabled={stepIndex >= simData.steps.length - 1}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs"
                >
                  Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default MultiplicationTheory;
