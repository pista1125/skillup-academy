import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Compass,
  ArrowRightLeft,
  MoveHorizontal,
  Plus,
  Minus,
  Check,
  Zap,
  TrendingDown,
  TrendingUp,
  Layers,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IntegerMultiplicationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function IntegerMultiplicationTheory({ onBack, onStartQuiz }: IntegerMultiplicationTheoryProps) {
  // Interactive Simulator State: numA (-10..10), numB (-10..10)
  const [numA, setNumA] = useState<number>(-4);
  const [numB, setNumB] = useState<number>(6);

  // Calculations for Simulator
  const product = numA * numB;
  const absA = Math.abs(numA);
  const absB = Math.abs(numB);
  const absProduct = absA * absB;

  let ruleExplanation = '';
  let ruleBadge = '';

  if (numA === 0 || numB === 0) {
    ruleBadge = '0-val való szorzás';
    ruleExplanation = 'Ha egy szorzat bármelyik tényezője nulla (0), a szorzat értéke mindig pontosan 0.';
  } else if (numA > 0 && numB > 0) {
    ruleBadge = '(+) · (+) = (+)';
    ruleExplanation = 'Két pozitív szám szorzata mindig pozitív szám. Az abszolút értékeket összeszorozzuk: ' + absA + ' · ' + absB + ' = ' + absProduct + '.';
  } else if (numA < 0 && numB < 0) {
    ruleBadge = '(-) · (-) = (+)';
    ruleExplanation = 'Két negatív szám szorzata MINDIG POZITÍV! Két mínusz jel egymást kiejtve pluszra vált: -(' + numA + ') · -(' + numB + ') = +' + absProduct + '.';
  } else {
    ruleBadge = '(+) · (-) = (-) vagy (-) · (+) = (-)';
    ruleExplanation = 'Különböző előjelű számok szorzata MINDIG NEGATÍV! Egy negatív és egy pozitív szám szorzata: -' + absProduct + '.';
  }

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="✖️ 6. Osztály • I. Egész számok"
      title="Az egész számok szorzása"
      subtitle="Előjelszabályok, szorzás nullával, disztributivitás és többtagú szorzatok"
      ruleTitle="Alapszabály"
      ruleFormula="(+)·(+)=+ | (-)·(-)=+ | (+)·(-)=-"
      themeColor="indigo"
      pdfElementId="integer-mult-theory-content"
      pdfFilename="Egesz_Szamok_Szorzasa_Tananyag"
    >
      {/* 1. Szekció: Mi az egész számok szorzása? */}
      <TheorySection
        number={1}
        title="A szorzás értelmezése (Ismételt összeadás és előjel)"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Pozitív szorozva negatívval" icon={<TrendingDown className="w-4 h-4 text-rose-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A természetes számokkal való szorzás analógiájára a <code className="font-bold">3 · (-5)</code> szorzat nem más, mint a <code className="font-bold">-5</code> háromszori összeadása:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs space-y-1">
              <div>3 · (-5) = (-5) + (-5) + (-5) = <strong>-15</strong></div>
              <div className="text-[11px] text-slate-500">💡 3-szor 5000 Ft adósság = 15 000 Ft adósság.</div>
            </div>
          </TheoryCard>

          <TheoryCard title="Negatív szorozva negatívval" icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A szorzandó ellentettjére váltása megfordítja a szorzat előjelét: a <code className="font-bold">(-3) · (-5)</code> a <code className="font-bold">3 · (-5)</code> ellentettje!
            </p>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs space-y-1">
              <div>(-3) · (-5) = - [ 3 · (-5) ] = - [ -15 ] = <strong>+15</strong></div>
              <div className="text-[11px] text-slate-500">💡 "Az adósság elengedése nyereség": Két negatív szorzata pozitív!</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: A 4 Aranyszabály */}
      <TheorySection
        number={2}
        title="A szorzás 4 alapvető előjelszabálya"
        icon={<Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <TheoryCallout
          title="ARANYSZABÁLY: Azonos előjelek szorzata +, Különböző előjelek szorzata -"
          description="Nem számít, mekkora a számok abszolút értéke, a szorzat előjelét kizárólag a tényezők előjele határozza meg!"
          color="indigo"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800/80 text-center space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-black text-xs font-mono">
              (+) · (+) = (+)
            </span>
            <div className="font-mono font-bold text-sm text-emerald-800 dark:text-emerald-200 pt-1">
              (+7) · (+4) = +28
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
              Azonos pozitív előjelek $\to$ pozitív eredmény.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800/80 text-center space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-black text-xs font-mono">
              (-) · (-) = (+)
            </span>
            <div className="font-mono font-bold text-sm text-emerald-800 dark:text-emerald-200 pt-1">
              (-6) · (-5) = +30
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
              Azonos negatív előjelek $\to$ pozitív eredmény!
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-800/80 text-center space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 font-black text-xs font-mono">
              (+) · (-) = (-)
            </span>
            <div className="font-mono font-bold text-sm text-rose-800 dark:text-rose-200 pt-1">
              (+8) · (-3) = -24
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-300">
              Különböző előjelek $\to$ negatív eredmény.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-800/80 text-center space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 font-black text-xs font-mono">
              (-) · (+) = (-)
            </span>
            <div className="font-mono font-bold text-sm text-rose-800 dark:text-rose-200 pt-1">
              (-9) · (+2) = -18
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-300">
              Különböző előjelek $\to$ negatív eredmény.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Interaktív Szorzás Szimulátor */}
      <TheorySection
        number={3}
        title="Interaktív Egész Szám Szorzás Laboratórium"
        icon={<Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <Card className="border-2 border-indigo-200 dark:border-indigo-900/60 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-sm overflow-hidden">
          <CardContent className="p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Stepper A */}
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">1. Tényező (a)</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setNumA((v) => Math.max(-12, v - 1))}
                    className="h-9 w-9 rounded-xl font-mono font-bold"
                  >
                    -
                  </Button>
                  <span className={cn(
                    "w-16 h-10 rounded-xl flex items-center justify-center font-mono font-black text-lg border-2 shadow-inner",
                    numA > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300" : numA < 0 ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300" : "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300"
                  )}>
                    {numA > 0 ? `+${numA}` : numA}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setNumA((v) => Math.min(12, v + 1))}
                    className="h-9 w-9 rounded-xl font-mono font-bold"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Multiplication Operator Badge */}
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                ·
              </div>

              {/* Stepper B */}
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">2. Tényező (b)</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setNumB((v) => Math.max(-12, v - 1))}
                    className="h-9 w-9 rounded-xl font-mono font-bold"
                  >
                    -
                  </Button>
                  <span className={cn(
                    "w-16 h-10 rounded-xl flex items-center justify-center font-mono font-black text-lg border-2 shadow-inner",
                    numB > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300" : numB < 0 ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300" : "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300"
                  )}>
                    {numB > 0 ? `+${numB}` : numB}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setNumB((v) => Math.min(12, v + 1))}
                    className="h-9 w-9 rounded-xl font-mono font-bold"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Quick Reset */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setNumA(-4); setNumB(6); }}
                className="text-xs text-slate-500 hover:text-slate-900"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Alaphelyzet
              </Button>
            </div>

            {/* Live Calculation Display Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 text-center space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                Számítás és Eredmény
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 flex-wrap">
                <span>({numA > 0 ? `+${numA}` : numA})</span>
                <span className="text-indigo-600 dark:text-indigo-400">·</span>
                <span>({numB > 0 ? `+${numB}` : numB})</span>
                <span className="text-slate-400">=</span>
                <span className={cn(
                  "px-4 py-1 rounded-xl shadow-xs border-2",
                  product > 0
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : product < 0
                    ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300"
                    : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200"
                )}>
                  {product > 0 ? `+${product}` : product}
                </span>
              </div>

              {/* Step by step rule explanation */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-left space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono font-bold text-xs">
                    {ruleBadge}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Magyarázat:</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {ruleExplanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* 4. Szekció: Műveleti Tulajdonságok */}
      <TheorySection
        number={4}
        title="A szorzás műveleti tulajdonságai"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Felcserélhetőség (Kommutativitás)" icon={<ArrowRightLeft className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A tényezők sorrendje tetszőlegesen felcserélhető, a szorzat értéke nem változik:
            </p>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-center font-bold text-indigo-700 dark:text-indigo-300">
              a · b = b · a
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Pl. (-4) · 7 = 7 · (-4) = -28</div>
          </TheoryCard>

          <TheoryCard title="2. Csoportosíthatóság (Asszociativitás)" icon={<Layers className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Több tényező esetén a szorzások tetszőlegesen csoportosíthatók:
            </p>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-center font-bold text-indigo-700 dark:text-indigo-300">
              (a · b) · c = a · (b · c)
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Pl. [(-2) · 5] · (-3) = (-10) · (-3) = +30</div>
          </TheoryCard>

          <TheoryCard title="3. Széttagolhatóság (Disztributivitás)" icon={<Sparkles className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A szorzás tagonként elvégezhető az összeadásra és kivonásra nézve is:
            </p>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-center font-bold text-indigo-700 dark:text-indigo-300">
              a · (b + c) = a·b + a·c
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Pl. -3 · (10 - 2) = -30 - (-6) = -24</div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Szekció: Többtagú szorzatok előjele */}
      <TheorySection
        number={5}
        title="Többtagú szorzatok és a negatív tényezők száma"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PÁROS számú negatív tényező $\to$ POZITÍV (+)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mivel minden negatív számpár szorzata pozitív, a páros számú mínusz kiejti egymást:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 font-mono text-xs">
                (-2) · (-3) · (-4) · (-5) = <strong>+120</strong> (4 db negatív $\to$ pozitív)
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2 border-rose-200 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-sm">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>PÁRATLAN számú negatív tényező $\to$ NEGATÍV (-)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egy negatív tényező mindig pár nélkül marad, így a végeredmény negatív lesz:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 font-mono text-xs">
                (-2) · (-3) · (-4) = <strong>-24</strong> (3 db negatív $\to$ negatív)
              </div>
            </CardContent>
          </Card>
        </div>
      </TheorySection>

      {/* 6. Szekció: Tipikus Csapdák és Hibák */}
      <TheorySection
        number={6}
        title="Gyakori hibák és csapdák a szorzásnál"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Összetévesztés az összeadással"
            wrong="(-3) · (-4) = -7 (vagy -12)"
            correct="(-3) · (-4) = +12"
            explanation="Szorzásnál a két mínusz pozitívra vált! Az összeadás lenne: (-3) + (-4) = -7."
          />

          <TheoryTrapBox
            title="2. Csapda: Szorzás nullával"
            wrong="(-18) · 0 = -18"
            correct="(-18) · 0 = 0"
            explanation="Bármely számot nullával szorozva a szorzat mindig pontosan 0 (nem maga a szám!)."
          />

          <TheoryTrapBox
            title="3. Csapda: Zárójel nélküli előjel és négyzet"
            wrong="-5² = +25"
            correct="-5² = -(5 · 5) = -25  |  (-5)² = (-5)·(-5) = +25"
            explanation="Ha nincs zárójelben a negatív szám, a hatványozás előbb történik meg, mint az előjel hozzárendelése!"
          />

          <TheoryTrapBox
            title="4. Csapda: Disztributivitás előjelhibája"
            wrong="-4 · (x - 3) = -4x - 12"
            correct="-4 · (x - 3) = -4x + 12"
            explanation="A -4-et mindkét taggal megszorozzuk: -4 · (-3) = +12 (két mínusz plusz!)."
          />
        </div>
      </TheorySection>

      {/* 7. Szekció: Összefoglaló Szabálytáblázat */}
      <TheorySection
        number={7}
        title="Összefoglaló szorzási szabálytáblázat"
        icon={<BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
        badgeColor="slate"
      >
        <TheoryTable
          headers={['Tényezők előjele', 'Szorzat előjele', 'Mintafeladat', 'Szabály']}
          rows={[
            [
              <strong className="text-emerald-700 dark:text-emerald-400">Pozitív · Pozitív</strong>,
              <span className="font-bold text-emerald-600">+ (Pozitív)</span>,
              <span className="font-mono">(+6) · (+8) = +48</span>,
              <span>Azonos előjelek szorzata pozitív.</span>
            ],
            [
              <strong className="text-emerald-700 dark:text-emerald-400">Negatív · Negatív</strong>,
              <span className="font-bold text-emerald-600">+ (Pozitív)</span>,
              <span className="font-mono">(-7) · (-9) = +63</span>,
              <span>Két mínusz szorzata mindig plusz!</span>
            ],
            [
              <strong className="text-rose-700 dark:text-rose-400">Pozitív · Negatív</strong>,
              <span className="font-bold text-rose-600">- (Negatív)</span>,
              <span className="font-mono">(+5) · (-12) = -60</span>,
              <span>Különböző előjelek szorzata negatív.</span>
            ],
            [
              <strong className="text-rose-700 dark:text-rose-400">Negatív · Pozitív</strong>,
              <span className="font-bold text-rose-600">- (Negatív)</span>,
              <span className="font-mono">(-11) · (+4) = -44</span>,
              <span>Különböző előjelek szorzata negatív.</span>
            ],
            [
              <strong className="text-slate-700 dark:text-slate-300">Bármely szám · 0</strong>,
              <span className="font-bold text-slate-600">0 (Nulla)</span>,
              <span className="font-mono">(-250) · 0 = 0</span>,
              <span>A nulla elnyeli a szorzást.</span>
            ]
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}
