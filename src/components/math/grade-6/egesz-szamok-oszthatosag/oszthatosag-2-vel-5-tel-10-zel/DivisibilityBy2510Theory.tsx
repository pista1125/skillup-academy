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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  Dices,
  Zap,
  Split,
  Eye,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisibilityBy2510TheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function DivisibilityBy2510Theory({ onBack, onStartQuiz }: DivisibilityBy2510TheoryProps) {
  // Interactive Lab State
  const [labNumber, setLabNumber] = useState<number>(4785);

  const handleRandomNumber = () => {
    const randomVal = Math.floor(Math.random() * 90000) + 10;
    setLabNumber(randomVal);
  };

  const lastDigit = Math.abs(labNumber) % 10;
  const tensPart = Math.floor(Math.abs(labNumber) / 10);

  const isDiv2 = Math.abs(labNumber) % 2 === 0;
  const rem2 = Math.abs(labNumber) % 2;

  const isDiv5 = Math.abs(labNumber) % 5 === 0;
  const rem5 = Math.abs(labNumber) % 5;

  const isDiv10 = Math.abs(labNumber) % 10 === 0;
  const rem10 = Math.abs(labNumber) % 10;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="🔟 6. Osztály • I. Egész számok, oszthatóság"
      title="Oszthatóság 2-vel, 5-tel, 10-zel"
      subtitle="Az utolsó számjegy alapú oszthatósági szabályok, helyiértékes magyarázat a tízes számrendszerben és villámgyors maradékszámítás"
      ruleTitle="Az utolsó számjegy szabályai"
      ruleFormula="2-vel: 0, 2, 4, 6, 8 | 5-tel: 0, 5 | 10-zel: 0"
      themeColor="cyan"
      pdfElementId="divisibility-2-5-10-theory-content"
      pdfFilename="Oszthatosag_2_5_10_Tananyag"
    >
      {/* 1. SZEKCIÓ: Oszthatóság 2-vel */}
      <TheorySection
        number={1}
        title="Oszthatóság 2-vel: Páros és Páratlan számok"
        icon={<Calculator className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A 2-vel való oszthatóság szabálya"
            icon={<BookOpen className="w-4 h-4 text-cyan-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy egész szám <strong>akkor és csak akkor osztható 2-vel</strong>, ha az utolsó számjegye (az egyesek helyén álló jegy) páros:
            </p>
            <div className="p-3 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 font-mono text-center space-y-1">
              <div className="text-cyan-900 dark:text-cyan-200 font-black text-sm sm:text-base tracking-wider">
                Utolsó jegy: 0, 2, 4, 6 vagy 8
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                A 2-vel osztható számokat <strong>páros számoknak</strong> nevezzük.
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div>• <strong>Páros számok általános alakja:</strong> <code className="font-bold text-cyan-700 dark:text-cyan-300">2 · k</code> (ahol $k$ egész szám).</div>
              <div>• <em>Példák:</em> $0, 2, 14, 58, 376, 9510, -42$. Mind osztható 2-vel!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Páratlan számok és a 0 párossága"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Ha egy szám utolsó jegye <strong>1, 3, 5, 7 vagy 9</strong>, akkor a szám <strong>páratlan</strong>, és 2-vel osztva <strong>1 a maradék</strong>.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1.5">
              <div className="text-slate-800 dark:text-slate-200 font-bold">
                • Páratlan számok alakja: <span className="text-amber-600 dark:text-amber-400">2 · k + 1</span>
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                • A 0 PÁROS szám! ($0 = 2 \cdot 0$, maradék 0).
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                • A negatív számok is lehetnek párosak (pl. $-18$) vagy páratlanok (pl. $-31$).
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout type="tip" title="Gyors észrevétel: Két egymást követő egész szám">
          <p className="text-xs sm:text-sm leading-relaxed">
            Bármely két egymást követő egész szám közül <strong>pontosan az egyik páros, a másik páratlan</strong> (pl. 14 és 15, 99 és 100).
            Ezért két egymást követő egész szám szorzata (pl. $n \cdot (n+1)$) <strong>mindig páros</strong>!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: Oszthatóság 5-tel és 10-zel */}
      <TheorySection
        number={2}
        title="Oszthatóság 5-tel és 10-zel"
        icon={<Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Oszthatóság 5-tel"
            icon={<Layers className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Egy egész szám <strong>akkor és csak akkor osztható 5-tel</strong>, ha az utolsó számjegye <strong>0</strong> vagy <strong>5</strong>.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 font-mono text-center space-y-1">
              <div className="text-emerald-900 dark:text-emerald-200 font-black text-sm sm:text-base">
                Utolsó jegy: 0 vagy 5
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                Általános alak: <code className="font-bold">5 · k</code>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>• $435$ $\to$ utolsó jegye $5$ $\implies$ <strong>osztható 5-tel</strong> ($435 : 5 = 87$).</li>
              <li>• $1290$ $\to$ utolsó jegye $0$ $\implies$ <strong>osztható 5-tel</strong> ($1290 : 5 = 258$).</li>
              <li>• $784$ $\to$ utolsó jegye $4$ $\implies$ <strong>NEM osztható 5-tel</strong>.</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Oszthatóság 10-zel"
            icon={<Hash className="w-4 h-4 text-cyan-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Egy egész szám <strong>akkor és csak akkor osztható 10-zel</strong>, ha az utolsó számjegye <strong>0</strong>.
            </p>
            <div className="p-3 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 font-mono text-center space-y-1">
              <div className="text-cyan-900 dark:text-cyan-200 font-black text-sm sm:text-base">
                Utolsó jegy: kizárólag 0
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                Általános alak: <code className="font-bold">10 · k</code>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>• $520$ $\to$ utolsó jegye $0$ $\implies$ <strong>osztható 10-zel</strong> ($520 : 10 = 52$).</li>
              <li>• $1400$ $\to$ utolsó jegye $0$ $\implies$ <strong>osztható 10-zel</strong> ($1400 : 10 = 140$).</li>
              <li>• $365$ $\to$ utolsó jegye $5$ $\implies$ <strong>NEM osztható 10-zel</strong> (maradék: 5).</li>
            </ul>
          </TheoryCard>
        </div>

        <TheoryCard
          title="A 2, 5 és 10 kapcsolata: 10 = 2 · 5"
          icon={<ArrowRightLeft className="w-4 h-4 text-indigo-500" />}
          variant="indigo"
        >
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Mivel a $10$-nek a prímtényezői a $2$ és az $5$ ($10 = 2 \cdot 5$), a három szabály gyönyörű kapcsolatban áll egymással:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">➡️ Ha egy szám osztható 10-zel:</div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  Akkor <strong>automatikusan osztható 2-vel ÉS 5-tel is</strong>! (Pl. $70$ osztható 10-zel, így 2-vel és 5-tel is).
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">⬅️ Ha egy szám osztható 2-vel ÉS 5-tel is:</div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  Akkor <strong>biztosan osztható 10-zel is</strong>! (Mert páros is és 0 vagy 5 a vége $\to$ csak a 0 lehet a vége).
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: Miért az utolsó számjegy dönt? Helyiértékes bizonyítás és maradékok */}
      <TheorySection
        number={3}
        title="Miért az utolsó számjegy dönt? (A helyiértékek titka)"
        icon={<Lightbulb className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Helyiértékes felbontás a tízes számrendszerben"
            icon={<Split className="w-4 h-4 text-cyan-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A tízes számrendszerben minden szám felbontható tízesekre és az egyesek helyén álló utolsó számjegyre:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs sm:text-sm space-y-1 shadow-md">
              <div className="text-cyan-300 font-bold text-base">
                N = 10 · k + e
              </div>
              <div className="text-slate-300 text-[11px]">
                ahol <span className="text-amber-300 font-bold">e</span> az utolsó számjegy ($0 \le e \le 9$), <span className="text-cyan-200 font-bold">k</span> pedig az előtte lévő rész.
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div><em>Példa:</em> $4786 = 4780 + 6 = 10 \cdot 478 + 6$</div>
              <div>Mivel a $10 \cdot 478$ biztosan osztható $2$-vel, $5$-tel és $10$-zel is, a teljes szám oszthatósága <strong>kizárólag a 6-tól függ</strong>!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Maradékszámítás villámgyorsan az utolsó jegyből"
            icon={<Zap className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Nemcsak az oszthatóság, de a <strong>maradék is azonnal leolvasható</strong> az utolsó számjegyből:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-800 dark:text-cyan-300">2-es maradék:</span> Az utolsó jegy 2-es maradéka. Ha páros $\to 0$, ha páratlan $\to 1$.
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">5-ös maradék:</span> Az utolsó jegy 5-tel való osztási maradéka. (Pl. $738 \to 8 : 5 = 1$, maradék <strong className="text-emerald-600 dark:text-emerald-400">3</strong>).
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-800 dark:text-indigo-300">10-es maradék:</span> <strong>Pontosan maga az utolsó számjegy!</strong> (Pl. $738 : 10 = 73$, maradék <strong className="text-indigo-600 dark:text-indigo-400">8</strong>).
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: Interaktív Oszthatósági Labor */}
      <TheorySection
        number={4}
        title="Interaktív Oszthatósági Labor"
        icon={<Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <Card className="border-2 border-cyan-200 dark:border-cyan-800/80 bg-gradient-to-br from-cyan-50/50 via-white to-sky-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-cyan-950/20 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-600" />
                  Tesztelj bármilyen számot valós időben!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Írj be egy számot vagy kattints az ajánlott példákra, és figyeld az utolsó számjegy kiemelését!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRandomNumber}
                  className="gap-1.5 border-cyan-300 text-cyan-700 dark:text-cyan-300 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 text-xs"
                >
                  <Dices className="w-3.5 h-3.5" />
                  Véletlen szám
                </Button>
              </div>
            </div>

            {/* Input & Quick Pick Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Szám megadása:</span>
              <input
                type="number"
                value={labNumber}
                onChange={(e) => setLabNumber(parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-1.5 rounded-lg border-2 border-cyan-300 dark:border-cyan-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-center text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[124, 735, 950, 1048, 8881, 4050].map((num) => (
                  <button
                    key={num}
                    onClick={() => setLabNumber(num)}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-mono text-xs transition-colors border",
                      labNumber === num
                        ? "bg-cyan-600 text-white border-cyan-600 font-bold"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-cyan-50 dark:hover:bg-cyan-950/40"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Visual Breakdown Display */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center gap-3 shadow-inner">
              <div className="text-xs text-cyan-300 font-mono tracking-widest uppercase">
                Szám és utolsó számjegy vizualizáció
              </div>

              <div className="flex items-center justify-center font-mono text-3xl sm:text-5xl font-black tracking-wider">
                <span className="text-slate-400">{tensPart > 0 ? tensPart : ''}</span>
                <span className="relative px-2.5 py-1 mx-1 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 animate-pulse">
                  {lastDigit}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] bg-cyan-900/90 text-cyan-200 px-1.5 py-0.5 rounded-full uppercase tracking-tighter whitespace-nowrap font-sans font-bold">
                    Utolsó jegy
                  </span>
                </span>
              </div>

              <div className="text-xs text-slate-300 font-mono text-center">
                Helyiértékes felbontás: <span className="text-cyan-400">{labNumber}</span> = 10 · {tensPart} + <span className="text-amber-400 font-bold">{lastDigit}</span>
              </div>
            </div>

            {/* 3 Divisibility Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* 2-vel */}
              <div className={cn(
                "p-3.5 rounded-xl border transition-all flex flex-col justify-between",
                isDiv2
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 2-vel</span>
                    {isDiv2 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv2 ? '✅ Osztható 2-vel' : '❌ Nem osztható 2-vel'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Utolsó számjegy: <strong className="font-mono">{lastDigit}</strong> ({lastDigit % 2 === 0 ? 'páros' : 'páratlan'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 2)}</div>
                  <div className="font-bold">Maradék: {rem2}</div>
                </div>
              </div>

              {/* 5-tel */}
              <div className={cn(
                "p-3.5 rounded-xl border transition-all flex flex-col justify-between",
                isDiv5
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 5-tel</span>
                    {isDiv5 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv5 ? '✅ Osztható 5-tel' : '❌ Nem osztható 5-tel'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Utolsó számjegy: <strong className="font-mono">{lastDigit}</strong> ({lastDigit === 0 || lastDigit === 5 ? '0 vagy 5' : 'nem 0 és nem 5'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 5)}</div>
                  <div className="font-bold">Maradék: {rem5}</div>
                </div>
              </div>

              {/* 10-zel */}
              <div className={cn(
                "p-3.5 rounded-xl border transition-all flex flex-col justify-between",
                isDiv10
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 10-zel</span>
                    {isDiv10 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv10 ? '✅ Osztható 10-zel' : '❌ Nem osztható 10-zel'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Utolsó számjegy: <strong className="font-mono">{lastDigit}</strong> ({lastDigit === 0 ? 'nulla' : 'nem nulla'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 10)}</div>
                  <div className="font-bold">Maradék: {rem10}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* 5. SZEKCIÓ: Tipikus hibák, csapdák és összefoglaló táblázat */}
      <TheorySection
        number={5}
        title="Tipikus hibák, csapdák és összefoglaló táblázat"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Csapda: A számjegyek összeadása">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Sok diák hibásan összeadja a számjegyeket a 2, 5 és 10 oszthatóságának vizsgálatakor is.
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs space-y-1">
                <div className="text-rose-700 dark:text-rose-300 font-bold">❌ HIBÁS: „$125$ számjegyeinek összege $1+2+5=8$, és 8 nem osztható 5-tel, így 125 sem...”</div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold pt-1">
                  ✅ HELYES: 2, 5 és 10 esetén CSAK az utolsó számjegy számít! 125 utolsó jegye 5, tehát OSZTHATÓ 5-tel. (A számjegyösszeg a 3-nál és 9-nél dönt majd!).
                </div>
              </div>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Csapda: A szám hossza és a sok 0">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Mindegy, hogy a szám 2 jegyű vagy 20 jegyű: a vizsgálat pontosan ugyanannyi ideig tart!
              </p>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
                <div className="font-mono text-slate-800 dark:text-slate-200 font-bold">
                  9 999 999 999 990
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Bár a szám óriási, az utolsó számjegye <strong>0</strong>, így azonnal látjuk: osztható <strong>2-vel, 5-tel és 10-zel is</strong>!
                </div>
              </div>
            </div>
          </TheoryTrapBox>
        </div>

        {/* Összefoglaló táblázat */}
        <TheoryTable
          headers={['Szám', 'Utolsó jegy', 'Osztható 2-vel?', 'Osztható 5-tel?', 'Osztható 10-zel?', '5-ös maradék', '10-es maradék']}
          rows={[
            ['240', '0', '✅ Igen (páros)', '✅ Igen (0 végű)', '✅ Igen (0 végű)', '0', '0'],
            ['315', '5', '❌ Nem (páratlan)', '✅ Igen (5 végű)', '❌ Nem', '0', '5'],
            ['428', '8', '✅ Igen (páros)', '❌ Nem', '❌ Nem', '3 (8:5=1 mar. 3)', '8'],
            ['591', '1', '❌ Nem (páratlan)', '❌ Nem', '❌ Nem', '1', '1'],
            ['1000', '0', '✅ Igen', '✅ Igen', '✅ Igen', '0', '0'],
            ['774', '4', '✅ Igen', '❌ Nem', '❌ Nem', '4', '4']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}
