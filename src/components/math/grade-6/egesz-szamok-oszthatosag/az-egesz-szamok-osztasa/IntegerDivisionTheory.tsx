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
  ArrowRight,
  Divide,
  Ban
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IntegerDivisionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function IntegerDivisionTheory({ onBack, onStartQuiz }: IntegerDivisionTheoryProps) {
  // Interactive Simulator State: dividend (-24..24), divisor (-12..12)
  const [dividend, setDividend] = useState<number>(-18);
  const [divisor, setDivisor] = useState<number>(3);

  // Calculations for Simulator
  const isZeroDivisor = divisor === 0;
  const isExactDivision = !isZeroDivisor && dividend % divisor === 0;
  const quotient = isZeroDivisor ? null : (dividend / divisor);
  const absA = Math.abs(dividend);
  const absB = Math.abs(divisor);
  const absQuotient = isZeroDivisor ? null : (absA / absB);

  let ruleExplanation = '';
  let ruleBadge = '';

  if (isZeroDivisor) {
    ruleBadge = '⚠️ Nullával nem osztunk!';
    ruleExplanation = 'Nullával (0) való osztás a matematikában NEM ÉRTELMEZHETŐ! Nincs olyan valós vagy egész szám, amellyel 0-t megszorozva a kiinduló számot kapnánk.';
  } else if (dividend === 0) {
    ruleBadge = '0 : b = 0';
    ruleExplanation = 'A nulla bármilyen nem nulla számmal osztva mindig pontosan nullát (0) ad eredményül.';
  } else if (dividend > 0 && divisor > 0) {
    ruleBadge = '(+) : (+) = (+)';
    ruleExplanation = 'Két pozitív egész szám hányadosa mindig pozitív. Az abszolút értékeket elosztjuk: ' + absA + ' : ' + absB + ' = ' + absQuotient + '.';
  } else if (dividend < 0 && divisor < 0) {
    ruleBadge = '(-) : (-) = (+)';
    ruleExplanation = 'Két negatív egész szám hányadosa MINDIG POZITÍV! A negatív előjelek kiejtik egymást: (' + dividend + ') : (' + divisor + ') = +' + absQuotient + '.';
  } else {
    ruleBadge = '(+) : (-) = (-) vagy (-) : (+) = (-)';
    ruleExplanation = 'Különböző előjelű egész számok hányadosa MINDIG NEGATÍV! Az abszolút értékek hányadosa elé mínusz jelet teszünk: -' + absQuotient + '.';
  }

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="➗ 6. Osztály • I. Egész számok"
      title="Az egész számok osztása"
      subtitle="Előjelszabályok, osztás nullával és eggyel, inverz kapcsolat a szorzással"
      ruleTitle="Alapszabály"
      ruleFormula="(+):(+)=+ | (-):(-)=+ | (+):(-)=- | a:0 TILOS!"
      themeColor="violet"
      pdfElementId="integer-div-theory-content"
      pdfFilename="Egesz_Szamok_Osztasa_Tananyag"
    >
      {/* 1. Szekció: Az osztás fogalma és kapcsolata a szorzással */}
      <TheorySection
        number={1}
        title="Az osztás mint a szorzás megfordítása (Inverz művelet)"
        icon={<Calculator className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Miért így működik az osztás?" icon={<Lightbulb className="w-4 h-4 text-amber-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Az osztás a szorzás megfordítása. Amikor kiszámoljuk, hogy <code className="font-bold">a : b = c</code>, azt a <code className="font-bold">c</code> számot keressük, amellyel a <code className="font-bold">b</code> osztót megszorozva visszakapjuk az <code className="font-bold">a</code> osztandót:
            </p>
            <div className="p-3 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900 font-mono text-xs space-y-1.5">
              <div className="text-violet-800 dark:text-violet-300 font-bold">(-18) : (+3) = -6 , mert (-6) · (+3) = -18</div>
              <div className="text-emerald-800 dark:text-emerald-300 font-bold">(-24) : (-4) = +6 , mert (+6) · (-4) = -24</div>
            </div>
          </TheoryCard>

          <TheoryCard title="A művelet tagjainak elnevezése" icon={<BookOpen className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ne feledkezzünk meg a helyes matematikai kifejezésekről:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Osztandó (a)</span>
                <span className="text-slate-500">A szám, amit elosztunk (-30)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Osztó (b ≠ 0)</span>
                <span className="text-slate-500">Amivel osztunk (+5)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Hányados (c)</span>
                <span className="text-slate-500">Az osztás eredménye (-6)</span>
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout type="tip" title="Tipp az előjel gyors megjegyzéséhez">
          <p className="text-xs sm:text-sm leading-relaxed">
            Az előjelszabályok az osztásnál <strong>pontosan megegyeznek</strong> a szorzásnál megismert szabályokkal!
            Ha a két szám előjele <strong>megegyezik</strong>, a hányados <strong>POZITÍV</strong> (+). Ha az előjelük <strong>különbözik</strong>, a hányados <strong>NEGATÍV</strong> (-).
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. Szekció: Előjelszabályok részletesen */}
      <TheorySection
        number={2}
        title="Az előjelszabályok a gyakorlatban"
        icon={<Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-center">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">(+) : (+) = (+)</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">+20 : +4 = +5</div>
            <p className="text-[11px] text-slate-500">Pozitív osztva pozitívval pozitív</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-center">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">(-) : (-) = (+)</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">-20 : -4 = +5</div>
            <p className="text-[11px] text-slate-500">Két negatív hányadosa MINDIG pozitív</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-center">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">(+) : (-) = (-)</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">+20 : -4 = -5</div>
            <p className="text-[11px] text-slate-500">Különböző előjel esetén negatív</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-center">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">(-) : (+) = (-)</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">-20 : +4 = -5</div>
            <p className="text-[11px] text-slate-500">Negatív osztva pozitívval negatív</p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-violet-300 font-bold uppercase tracking-wider">A törtvonal mint osztásjel</div>
            <div className="text-sm font-semibold">Törtek formájában is gyakran felírjuk az osztást:</div>
          </div>
          <div className="flex items-center gap-4 text-sm font-mono bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
            <span><span className="text-rose-400">-36</span> / <span className="text-rose-400">-9</span> = <span className="text-emerald-400 font-bold">+4</span></span>
            <span className="text-slate-600">|</span>
            <span><span className="text-emerald-400">+48</span> / <span className="text-rose-400">-6</span> = <span className="text-rose-400 font-bold">-8</span></span>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Különleges esetek és tipikus buktatók */}
      <TheorySection
        number={3}
        title="Különleges esetek és veszélyes csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Nullával való osztás (SZIGORÚAN TILOS!)">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Egy számot <strong>nullával elosztani értelmetlen és tilos</strong>!
              </p>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-mono text-xs font-bold">
                8 : 0 = ❌ NEM ÉRTELMEZHETŐ!
              </div>
              <p className="text-[11px] text-slate-500">
                Miért? Mert nincs olyan szám, amit 0-val megszorozva 8-at kapnánk (hiszen bármi · 0 = 0).
              </p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. A nulla osztása (0 : a = 0)">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Ha az <strong>osztandó nulla</strong>, és az osztó nem nulla, az eredmény mindig <strong>0</strong>:
              </p>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-mono text-xs font-bold">
                0 : (-7) = 0 &nbsp;&nbsp;|&nbsp;&nbsp; 0 : (+15) = 0
              </div>
              <p className="text-[11px] text-slate-500">
                Ellenőrzés: 0 · (-7) = 0, tehát a definíció tökéletesen működik!
              </p>
            </div>
          </TheoryTrapBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Osztás 1-gyel és (-1)-gyel" icon={<Zap className="w-4 h-4 text-amber-500" />}>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-violet-600">• 1-gyel osztva:</span>
                <span>A szám értéke és előjele változatlan marad: <code className="font-bold">(-45) : 1 = -45</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-violet-600">• (-1)-gyel osztva:</span>
                <span>A szám abszolút értéke megmarad, de az <strong>előjele az ellentettjére változik</strong>: <code className="font-bold">(+12) : (-1) = -12</code> és <code className="font-bold">(-33) : (-1) = +33</code>.</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Az osztás NEM felcserélhető és NEM csoportosítható!" icon={<XCircle className="w-4 h-4 text-rose-500" />}>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-500">• Nem kommutatív:</span>
                <span><code className="font-bold">(-20) : (+4) = -5</code>, de <code className="font-bold">(+4) : (-20) = -0,2</code>. A tagok sorrendje nem cserélhető fel!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-500">• Műveleti sorrend:</span>
                <span>Egymás utáni osztásoknál <strong>balról jobbra</strong> haladunk: <code className="font-bold">(-60) : (-6) : (+2) = (+10) : 2 = 5</code>.</span>
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív Egész Szám Osztó Szimulátor */}
      <TheorySection
        number={4}
        title="Interaktív Osztás Laboratórium és Előjelelemző"
        icon={<Compass className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 border-2 border-violet-200/60 dark:border-violet-800/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Control Column */}
            <div className="w-full md:w-1/2 space-y-5">
              {/* Dividend slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Osztandó (a):</span>
                  <span className={cn(
                    "text-sm font-mono font-black px-2.5 py-0.5 rounded-lg",
                    dividend > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                    dividend < 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" : "bg-slate-100 text-slate-700"
                  )}>
                    {dividend > 0 ? `+${dividend}` : dividend}
                  </span>
                </div>
                <input
                  type="range"
                  min="-24"
                  max="24"
                  step="1"
                  value={dividend}
                  onChange={(e) => setDividend(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>-24</span>
                  <span>0</span>
                  <span>+24</span>
                </div>
              </div>

              {/* Divisor slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Osztó (b):</span>
                  <span className={cn(
                    "text-sm font-mono font-black px-2.5 py-0.5 rounded-lg",
                    divisor === 0 ? "bg-red-500 text-white animate-pulse" :
                    divisor > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                    "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                  )}>
                    {divisor > 0 ? `+${divisor}` : divisor}
                  </span>
                </div>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="1"
                  value={divisor}
                  onChange={(e) => setDivisor(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>-12</span>
                  <span className="text-red-500 font-bold">0 (tilos)</span>
                  <span>+12</span>
                </div>
              </div>

              {/* Preset quick buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg" onClick={() => { setDividend(-20); setDivisor(-4); }}>
                  (-20) : (-4)
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg" onClick={() => { setDividend(36); setDivisor(-6); }}>
                  (+36) : (-6)
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg" onClick={() => { setDividend(-15); setDivisor(0); }}>
                  (-15) : 0 ⚠️
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg" onClick={() => { setDividend(0); setDivisor(-8); }}>
                  0 : (-8)
                </Button>
              </div>
            </div>

            {/* Visualizer Display Column */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
                {ruleBadge}
              </span>

              {/* Mathematical Equation Box */}
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-slate-100 my-3">
                <span className={dividend < 0 ? "text-rose-600" : dividend > 0 ? "text-emerald-600" : "text-slate-600"}>
                  {dividend < 0 ? `(${dividend})` : dividend}
                </span>
                <span className="text-violet-500 font-bold">:</span>
                <span className={divisor < 0 ? "text-rose-600" : divisor > 0 ? "text-emerald-600" : "text-red-500"}>
                  {divisor < 0 ? `(${divisor})` : divisor}
                </span>
                <span className="text-slate-400">=</span>
                {isZeroDivisor ? (
                  <span className="text-red-500 text-lg font-black underline decoration-wavy">NEM ÉRTELMEZHETŐ</span>
                ) : (
                  <span className={cn(
                    "px-3 py-1 rounded-xl text-2xl font-black",
                    quotient! > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                    quotient! < 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" :
                    "bg-slate-100 text-slate-700"
                  )}>
                    {Number.isInteger(quotient) ? (quotient! > 0 ? `+${quotient}` : quotient) : quotient!.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Step-by-step logic box */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mt-2">
                {ruleExplanation}
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Műveleti sorrend több művelet esetén */}
      <TheorySection
        number={5}
        title="Műveleti sorrend (Zárójelek és vegyes műveletek)"
        icon={<Layers className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Példa 1: Zárójel nélküli vegyes művelet" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200">12 - (-24) : (+6) + (-5) · 2</div>
              <div className="text-slate-500">1. lépés (szorzás, osztás elvégzése):</div>
              <div className="pl-3 text-violet-600">(-24) : (+6) = -4 &nbsp;|&nbsp; (-5) · 2 = -10</div>
              <div className="text-slate-500">2. lépés (behelyettesítés és összevonás):</div>
              <div className="pl-3 font-bold text-emerald-600">12 - (-4) + (-10) = 12 + 4 - 10 = +6</div>
            </div>
          </TheoryCard>

          <TheoryCard title="Példa 2: Zárójeles kifejezések" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200">[(-18) + (+6)] : [(-2) · (-2) - (+1)]</div>
              <div className="text-slate-500">1. lépés (bal oldali szögletes zárójel):</div>
              <div className="pl-3 text-violet-600">(-18) + 6 = -12</div>
              <div className="text-slate-500">2. lépés (jobb oldali szögletes zárójel):</div>
              <div className="pl-3 text-violet-600">(-2) · (-2) - 1 = +4 - 1 = +3</div>
              <div className="text-slate-500">3. lépés (végső osztás):</div>
              <div className="pl-3 font-bold text-emerald-600">(-12) : (+3) = -4</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* Összefoglaló táblázat */}
      <TheoryTable
        title="Egész számok osztása – Szabályok összefoglalása"
        headers={['Művelet típusa', 'Előjel szabály', 'Példa', 'Eredmény', 'Magyarázat']}
        rows={[
          ['Pozitív : Pozitív', '(+) : (+) = (+)', '36 : 6', '+6', 'Azonos előjelű pozitívak hányadosa pozitív.'],
          ['Negatív : Negatív', '(-) : (-) = (+)', '(-36) : (-6)', '+6', 'Két negatív szám hányadosa MINDIG pozitív.'],
          ['Pozitív : Negatív', '(+) : (-) = (-)', '36 : (-6)', '-6', 'Különböző előjelű számok hányadosa negatív.'],
          ['Negatív : Pozitív', '(-) : (+) = (-)', '(-36) : 6', '-6', 'Különböző előjelű számok hányadosa negatív.'],
          ['Nulla osztása', '0 : a = 0 (ha a ≠ 0)', '0 : (-9)', '0', 'Nulla osztva bármely nem nulla számmal mindig nulla.'],
          ['Nullával való osztás', 'a : 0 = TILOS!', '12 : 0', 'NEM ÉRTELMEZHETŐ', 'A nullával való osztás a matematikában nem értelmezhető!'],
          ['Osztás 1-gyel', 'a : 1 = a', '(-17) : 1', '-17', 'A szám értéke és előjele változatlan marad.'],
          ['Osztás (-1)-gyel', 'a : (-1) = -a', '(-17) : (-1)', '+17', 'A szám az ellentettjére változik.']
        ]}
      />
    </TheoryTemplate>
  );
}
