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
  Dices,
  Zap,
  Split,
  Eye,
  Hash,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisibilityBy39TheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function DivisibilityBy39Theory({ onBack, onStartQuiz }: DivisibilityBy39TheoryProps) {
  // Interactive Lab State
  const [labNumber, setLabNumber] = useState<number>(4872);

  const handleRandomNumber = () => {
    const randomVal = Math.floor(Math.random() * 90000) + 10;
    setLabNumber(randomVal);
  };

  const numStr = Math.abs(labNumber).toString();
  const digits = numStr.split('').map(Number);
  const digitSum = digits.reduce((acc, curr) => acc + curr, 0);

  const isDiv3 = Math.abs(labNumber) % 3 === 0;
  const rem3 = Math.abs(labNumber) % 3;

  const isDiv9 = Math.abs(labNumber) % 9 === 0;
  const rem9 = Math.abs(labNumber) % 9;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="🧮 6. Osztály • I. Egész számok, oszthatóság"
      title="Oszthatóság 3-mal és 9-cel"
      subtitle="A számjegyek összegén alapuló oszthatósági szabályok, algebrai bizonyítás a 9-es maradékokkal és villámgyors maradékszámítás"
      ruleTitle="A számjegyösszeg szabálya"
      ruleFormula="3-mal: Számjegyösszeg ∈ 3k | 9-cel: Számjegyösszeg ∈ 9k"
      themeColor="amber"
      pdfElementId="divisibility-3-9-theory-content"
      pdfFilename="Oszthatosag_3_9_Tananyag"
    >
      {/* 1. SZEKCIÓ: Oszthatóság 3-mal */}
      <TheorySection
        number={1}
        title="Oszthatóság 3-mal: A számjegyek összege"
        icon={<Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A 3-mal való oszthatóság szabálya"
            icon={<BookOpen className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy természetes szám <strong>akkor és csak akkor osztható 3-mal</strong>, ha a számjegyeinek összege osztható 3-mal:
            </p>
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 font-mono text-center space-y-1">
              <div className="text-amber-900 dark:text-amber-200 font-black text-sm sm:text-base tracking-wider">
                Számjegyösszeg = 3, 6, 9, 12, 15, 18, 21...
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                Ha a számjegyösszeg osztható 3-mal $\implies$ az egész szám osztható 3-mal!
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div>• <em>Példa 1:</em> $573 \to 5 + 7 + 3 = 15$. Mivel $15 : 3 = 5$, ezért a <strong>573 osztható 3-mal</strong> ($573 : 3 = 191$).</div>
              <div>• <em>Példa 2:</em> $418 \to 4 + 1 + 8 = 13$. Mivel 13 nem osztható 3-mal, ezért a <strong>418 NEM osztható 3-mal</strong>.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Miért NEM az utolsó számjegy dönt?"
            icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Gyakori tévedés azt hinni, hogy a 3-ra végződő számok oszthatók 3-mal. Nézzük meg a tényeket:
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1.5">
              <div className="text-rose-600 dark:text-rose-400 font-bold">
                • 13, 23, 43, 53 $\to$ 3-ra végződnek, mégsem oszthatók 3-mal!
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                • 114 $\to$ 4-re (párosra) végződik, de $1+1+4 = 6$, így OSZTHATÓ 3-mal ($114 : 3 = 38$).
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                Tehát 3-nál kizárólag a számjegyek összege határozza meg az oszthatóságot!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: Oszthatóság 9-cel és a 3-9 kapcsolat */}
      <TheorySection
        number={2}
        title="Oszthatóság 9-cel és a 3 és 9 kapcsolata"
        icon={<Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A 9-cel való oszthatóság szabálya"
            icon={<Layers className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Egy természetes szám <strong>akkor és csak akkor osztható 9-cel</strong>, ha a számjegyeinek összege osztható 9-cel:
            </p>
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 font-mono text-center space-y-1">
              <div className="text-amber-900 dark:text-amber-200 font-black text-sm sm:text-base">
                Számjegyösszeg = 9, 18, 27, 36, 45...
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                (A számjegyösszeg 9 többszöröse)
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>• $5823 \to 5 + 8 + 2 + 3 = 18$. Mivel $18 : 9 = 2$, ezért a <strong>5823 osztható 9-cel</strong> ($5823 : 9 = 647$).</li>
              <li>• $4752 \to 4 + 7 + 5 + 2 = 18 \implies$ <strong>osztható 9-cel</strong> ($4752 : 9 = 528$).</li>
              <li>• $123 \to 1 + 2 + 3 = 6 \implies$ 3-mal osztható, de <strong>9-cel NEM osztható</strong>!</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A 3 és 9 szoros kapcsolata: 9 = 3 · 3"
            icon={<ArrowRightLeft className="w-4 h-4 text-indigo-500" />}
            variant="indigo"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Mivel $9 = 3^2$, a 9 a 3 többszöröse. Ezért:
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <div className="font-bold text-indigo-900 dark:text-indigo-200">
                  ➡️ Ha egy szám osztható 9-cel:
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  Akkor <strong>biztosan osztható 3-mal is</strong>! (Pl. a 18, 45, 81 mindkettővel osztható).
                </div>
                <div className="font-bold text-indigo-900 dark:text-indigo-200 pt-1">
                  ⬅️ Ha egy szám osztható 3-mal:
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  <strong>NEM biztos</strong>, hogy 9-cel is osztható! (Pl. 6, 12, 15, 21, 24 osztható 3-mal, de 9-cel nem).
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: Miért a számjegyösszeg dönt? Helyiértékes levezetés és maradékok */}
      <TheorySection
        number={3}
        title="Miért a számjegyösszeg dönt? (Helyiértékes bizonyítás)"
        icon={<Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A helyiértékek és a 9-esek kapcsolata"
            icon={<Split className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Figyeld meg a tízes számrendszer helyiértékeit:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs space-y-1 shadow-md">
              <div className="text-amber-300 font-bold text-sm">
                10 = 9 + 1 | 100 = 99 + 1 | 1000 = 999 + 1
              </div>
              <div className="text-slate-300 text-[11px]">
                Minden helyiérték felbontható egy 9-cel osztható részre és 1-re!
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div>Egy 3-jegyű szám: <strong>N = 100a + 10b + c</strong></div>
              <div>Átrendezve: <strong>N = (99a + 9b) + (a + b + c)</strong></div>
              <div>Mivel a <em>99a + 9b</em> tag mindig osztható 9-cel (és 3-mal is), az egész szám oszthatósága és maradéka kizárólag az <strong>(a + b + c) számjegyösszegtől</strong> függ!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Maradékszámítás a számjegyösszegből"
            icon={<Zap className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Bármely szám 3-as és 9-es osztási maradéka <strong>megegyezik a számjegyei összegének maradékával</strong>:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-800 dark:text-amber-300">3-as maradék:</span> A számjegyösszeg 3-as maradéka (lehet: 0, 1, 2).
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Pl. $415 \to 4+1+5 = 10 \to 10 : 3 = 3$, maradék <strong className="text-amber-700 dark:text-amber-300">1</strong>.
                </div>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-800 dark:text-indigo-300">9-es maradék:</span> A számjegyösszeg 9-es maradéka (lehet: 0-tól 8-ig).
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Pl. $415 \to 10 : 9 = 1$, maradék <strong className="text-indigo-700 dark:text-indigo-300">1</strong>.
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: Interaktív Számjegyösszeg Labor */}
      <TheorySection
        number={4}
        title="Interaktív Számjegyösszeg Labor"
        icon={<Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <Card className="border-2 border-amber-200 dark:border-amber-800/80 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/20 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-600" />
                  Számjegyösszeg és Oszthatóság Kalkulátor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Írj be bármilyen számot, és figyeld a számjegyek összeadásának animált levezetését!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRandomNumber}
                  className="gap-1.5 border-amber-300 text-amber-700 dark:text-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-xs"
                >
                  <Dices className="w-3.5 h-3.5" />
                  Véletlen szám
                </Button>
              </div>
            </div>

            {/* Input & Quick Pick */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Szám megadása:</span>
              <input
                type="number"
                value={labNumber}
                onChange={(e) => setLabNumber(parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-1.5 rounded-lg border-2 border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-center text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[123, 417, 891, 1053, 5841, 9999].map((num) => (
                  <button
                    key={num}
                    onClick={() => setLabNumber(num)}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-mono text-xs transition-colors border",
                      labNumber === num
                        ? "bg-amber-600 text-white border-amber-600 font-bold"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Digit Sum Formula Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center gap-3 shadow-inner">
              <div className="text-xs text-amber-300 font-mono tracking-widest uppercase">
                Számjegyek összeadása lépésről lépésre
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-bold">
                {digits.map((digit, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-200">
                      {digit}
                    </span>
                    {idx < digits.length - 1 && <Plus className="w-4 h-4 text-slate-500" />}
                  </React.Fragment>
                ))}
                <span className="text-slate-400">=</span>
                <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-2xl sm:text-3xl shadow-lg shadow-amber-500/30">
                  {digitSum}
                </span>
              </div>

              <div className="text-xs text-slate-300 font-mono text-center">
                A számjegyek összege: <span className="text-amber-400 font-bold">{digitSum}</span>
                {digitSum >= 10 && (
                  <span> $\to$ tovább összeadva: {digitSum.toString().split('').join(' + ')} = <span className="text-orange-400 font-bold">{digitSum.toString().split('').map(Number).reduce((a, b) => a + b, 0)}</span></span>
                )}
              </div>
            </div>

            {/* 2 Result Cards: 3 and 9 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* 3-mal */}
              <div className={cn(
                "p-4 rounded-xl border transition-all flex flex-col justify-between",
                isDiv3
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 3-mal</span>
                    {isDiv3 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv3 ? '✅ Osztható 3-mal' : '❌ Nem osztható 3-mal'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Számjegyösszeg: <strong className="font-mono">{digitSum}</strong> ({digitSum % 3 === 0 ? 'osztható 3-mal' : 'nem osztható 3-mal'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 3)}</div>
                  <div className="font-bold">3-as maradék: {rem3} ({digitSum} mod 3 = {rem3})</div>
                </div>
              </div>

              {/* 9-cel */}
              <div className={cn(
                "p-4 rounded-xl border transition-all flex flex-col justify-between",
                isDiv9
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 9-cel</span>
                    {isDiv9 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv9 ? '✅ Osztható 9-cel' : '❌ Nem osztható 9-cel'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Számjegyösszeg: <strong className="font-mono">{digitSum}</strong> ({digitSum % 9 === 0 ? 'osztható 9-cel' : 'nem osztható 9-cel'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 9)}</div>
                  <div className="font-bold">9-es maradék: {rem9} ({digitSum} mod 9 = {rem9})</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* 5. SZEKCIÓ: Tipikus hibák és összefoglaló táblázat */}
      <TheorySection
        number={5}
        title="Tipikus hibák, csapdák és összefoglaló táblázat"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Csapda: A 9-re végződő számok tévhite">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Sokan azt hiszik, ha egy szám 9-re végződik, akkor osztható 9-cel. Ez <strong>HIBÁS</strong>!
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs space-y-1">
                <div className="text-rose-700 dark:text-rose-300 font-bold">❌ Téves példák:</div>
                <div className="text-slate-600 dark:text-slate-300">
                  $19 \to 1+9=10$, $29 \to 2+9=11$, $49 \to 4+9=13$. Egyik sem osztható 9-cel!
                </div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold pt-1">
                  ✅ Kizárólag a számjegyek összege számít! (Pl. $18 \to 1+8=9$ osztható, $72 \to 7+2=9$ osztható).
                </div>
              </div>
            </div>
          </TheoryTrapBox>

          <TheoryCallout type="tip" title="Gyors fejszámolási trükk: A 9-esek elhagyása (Kilences-próba)">
            <p className="text-xs sm:text-sm leading-relaxed">
              Összeadáskor a <strong>9-es számjegyeket és azokat a párokat, amelyek összege 9</strong> (pl. 1+8, 2+7, 3+6, 4+5), egyszerűen <strong>kihagyhatod</strong>!
              <br />
              <em>Példa:</em> $95493 \to$ a 9-eseket és az $5+4=9$ párt elhagyva csak a <strong>3</strong> marad. A szám 3-mal osztható (maradék 0), 9-cel osztva pedig a maradék 3!
            </p>
          </TheoryCallout>
        </div>

        {/* Összefoglaló táblázat */}
        <TheoryTable
          headers={['Szám', 'Számjegyösszeg', 'Osztható 3-mal?', 'Osztható 9-cel?', '3-as maradék', '9-es maradék']}
          rows={[
            ['312', '3 + 1 + 2 = 6', '✅ Igen (6 : 3 = 2)', '❌ Nem (6 nem osztható 9-cel)', '0', '6'],
            ['594', '5 + 9 + 4 = 18', '✅ Igen (18 : 3 = 6)', '✅ Igen (18 : 9 = 2)', '0', '0'],
            ['721', '7 + 2 + 1 = 10', '❌ Nem', '❌ Nem', '1 (10 : 3 mar. 1)', '1 (10 : 9 mar. 1)'],
            ['909', '9 + 0 + 9 = 18', '✅ Igen', '✅ Igen', '0', '0'],
            ['1245', '1 + 2 + 4 + 5 = 12', '✅ Igen (12 : 3 = 4)', '❌ Nem', '0', '3 (12 : 9 mar. 3)'],
            ['9999', '9 + 9 + 9 + 9 = 36', '✅ Igen', '✅ Igen', '0', '0']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}
