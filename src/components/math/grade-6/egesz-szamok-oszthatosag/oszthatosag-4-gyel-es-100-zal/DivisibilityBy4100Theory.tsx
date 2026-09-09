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
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisibilityBy4100TheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function DivisibilityBy4100Theory({ onBack, onStartQuiz }: DivisibilityBy4100TheoryProps) {
  // Interactive Lab State
  const [labNumber, setLabNumber] = useState<number>(7524);

  const handleRandomNumber = () => {
    const randomVal = Math.floor(Math.random() * 90000) + 10;
    setLabNumber(randomVal);
  };

  const numStr = Math.abs(labNumber).toString();
  const lastTwoDigits = Math.abs(labNumber) % 100;
  const hundredsPart = Math.floor(Math.abs(labNumber) / 100);

  const isDiv4 = Math.abs(labNumber) % 4 === 0;
  const rem4 = Math.abs(labNumber) % 4;

  const isDiv100 = Math.abs(labNumber) % 100 === 0;
  const rem100 = Math.abs(labNumber) % 100;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="💯 6. Osztály • I. Egész számok, oszthatóság"
      title="Oszthatóság 4-gyel és 100-zal"
      subtitle="Az utolsó két számjegy alapú oszthatósági szabályok, a 100 = 4 · 25 összefüggés és villámgyors maradékszámítás"
      ruleTitle="Az utolsó két számjegy szabályai"
      ruleFormula="4-gyel: Utolsó 2 számjegy ∈ 4k (vagy 00) | 100-zal: Utolsó 2 számjegy = 00"
      themeColor="rose"
      pdfElementId="divisibility-4-100-theory-content"
      pdfFilename="Oszthatosag_4_100_Tananyag"
    >
      {/* 1. SZEKCIÓ: Oszthatóság 4-gyel */}
      <TheorySection
        number={1}
        title="Oszthatóság 4-gyel: Az utolsó két számjegy vizsgálata"
        icon={<Calculator className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A 4-gyel való oszthatóság szabálya"
            icon={<BookOpen className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy természetes szám <strong>akkor és csak akkor osztható 4-gyel</strong>, ha az <strong>utolsó két számjegyéből képzett szám osztható 4-gyel</strong> (vagy a szám 00-ra végződik):
            </p>
            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 font-mono text-center space-y-1">
              <div className="text-rose-900 dark:text-rose-200 font-black text-sm sm:text-base tracking-wider">
                Utolsó két számjegy: 00, 04, 08, 12, 16, 20... 96
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                Csak a tízes és egyes helyiértékeken álló jegyeket kell megnézned!
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div>• <em>Példa 1:</em> $5724 \to$ utolsó két számjegy <strong>24</strong>. Mivel $24 : 4 = 6$, a <strong>5724 osztható 4-gyel</strong> ($5724 : 4 = 1431$).</div>
              <div>• <em>Példa 2:</em> $3818 \to$ utolsó két számjegy <strong>18</strong>. Mivel 18 nem osztható 4-gyel (maradék 2), a <strong>3818 NEM osztható 4-gyel</strong>.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Miért NEM elég az utolsó egy számjegyet nézni?"
            icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Sokan azt hiszik, ha egy szám 4-re vagy 8-ra végződik, automatikusan osztható 4-gyel. Ez <strong>tévedés</strong>!
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1.5">
              <div className="text-rose-600 dark:text-rose-400 font-bold">
                • 14, 34, 54, 74, 94 $\to$ 4-re végződnek, de NEM oszthatók 4-gyel!
              </div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">
                • 18, 38, 58, 78, 98 $\to$ 8-ra végződnek, de NEM oszthatók 4-gyel!
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                • Mindig a kétjegyű végződést (pl. 24, 44, 64, 84, 04) kell nézni!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: Oszthatóság 100-zal és a 4 és 100 kapcsolata */}
      <TheorySection
        number={2}
        title="Oszthatóság 100-zal és a 4-gyel való kapcsolat"
        icon={<Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Oszthatóság 100-zal"
            icon={<Hash className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Egy természetes szám <strong>akkor és csak akkor osztható 100-zal</strong>, ha az utolsó két számjegye <strong>00</strong>.
            </p>
            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 font-mono text-center space-y-1">
              <div className="text-rose-900 dark:text-rose-200 font-black text-sm sm:text-base">
                Utolsó két jegy: 00
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                Általános alak: <code className="font-bold">100 · k</code>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>• $4500 \to 00$-ra végződik $\implies$ <strong>osztható 100-zal</strong> ($4500 : 100 = 45$).</li>
              <li>• $8250 \to 50$-re végződik $\implies$ <strong>NEM osztható 100-zal</strong> (maradék: 50).</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A 4 és a 100 kapcsolata: 100 = 4 · 25"
            icon={<ArrowRightLeft className="w-4 h-4 text-indigo-500" />}
            variant="indigo"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Mivel a $100$-nak a $4$ az egyik osztója ($100 = 4 \cdot 25$):
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <div className="font-bold text-indigo-900 dark:text-indigo-200">
                  ➡️ Ha egy szám osztható 100-zal (00 végű):
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  Akkor <strong>automatikusan osztható 4-gyel is</strong> (sőt 2-vel, 5-tel, 10-zel, 20-szal, 25-tel és 50-nel is!).
                </div>
                <div className="font-bold text-indigo-900 dark:text-indigo-200 pt-1">
                  ⬅️ Ha egy szám osztható 4-gyel:
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  <strong>NEM kötelező</strong>, hogy 100-zal is osztható legyen (pl. 24, 68, 116 osztható 4-gyel, de nem 100-zal).
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: Miért az utolsó KÉT számjegy dönt? Helyiértékes levezetés és maradékok */}
      <TheorySection
        number={3}
        title="Miért az utolsó KÉT számjegy dönt? (A százasok titka)"
        icon={<Lightbulb className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Helyiértékes felbontás százasokra és az utolsó két jegyre"
            icon={<Split className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Bármely természetes szám felbontható a százasok számára és az utolsó két számjegyére:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs space-y-1 shadow-md">
              <div className="text-rose-300 font-bold text-base">
                N = 100 · k + U₂
              </div>
              <div className="text-slate-300 text-[11px]">
                ahol <span className="text-rose-200 font-bold">U₂</span> az utolsó két számjegy ($0 \le U_2 \le 99$), <span className="text-slate-400 font-bold">100·k</span> pedig a százasok feletti rész.
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div><em>Példa:</em> $8736 = 8700 + 36 = 100 \cdot 87 + 36$</div>
              <div>Mivel $100 \cdot 87 = 4 \cdot 25 \cdot 87$ mindig osztható 4-gyel és 100-zal, a szám oszthatósága és maradéka <strong>kizárólag a 36-tól függ</strong>!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Maradékszámítás villámgyorsan az utolsó két jegyből"
            icon={<Zap className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Nem kell elvégezni a többjegyű osztást a maradék megállapításához:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-800 dark:text-rose-300">4-es maradék:</span> Az utolsó két számjegy 4-es osztási maradéka (lehet: 0, 1, 2, 3).
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Pl. $9518 \to 18 : 4 = 4$, maradék <strong className="text-rose-700 dark:text-rose-300">2</strong>.
                </div>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-800 dark:text-indigo-300">100-as maradék:</span> <strong>Pontosan maga az utolsó két számjegy!</strong>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Pl. $9518 : 100 = 95$, maradék <strong className="text-indigo-700 dark:text-indigo-300">18</strong>.
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: Interaktív Utolsó Két Jegy Labor */}
      <TheorySection
        number={4}
        title="Interaktív Utolsó Két Jegy Labor"
        icon={<Compass className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <Card className="border-2 border-rose-200 dark:border-rose-800/80 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-rose-600" />
                  Tesztelj bármilyen számot az utolsó 2 számjegye alapján!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Írj be egy számot vagy válassz az ajánlott példák közül!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRandomNumber}
                  className="gap-1.5 border-rose-300 text-rose-700 dark:text-rose-300 dark:border-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-xs"
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
                className="w-32 px-3 py-1.5 rounded-lg border-2 border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-center text-base focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[112, 348, 800, 1026, 4972, 9500].map((num) => (
                  <button
                    key={num}
                    onClick={() => setLabNumber(num)}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-mono text-xs transition-colors border",
                      labNumber === num
                        ? "bg-rose-600 text-white border-rose-600 font-bold"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Display */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center gap-3 shadow-inner">
              <div className="text-xs text-rose-300 font-mono tracking-widest uppercase">
                Szám és utolsó KÉT számjegy vizualizáció
              </div>

              <div className="flex items-center justify-center font-mono text-3xl sm:text-5xl font-black tracking-wider">
                <span className="text-slate-400">{hundredsPart > 0 ? hundredsPart : ''}</span>
                <span className="relative px-3 py-1 mx-1 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/50 animate-pulse">
                  {lastTwoDigits.toString().padStart(2, '0')}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] bg-rose-900/90 text-rose-200 px-1.5 py-0.5 rounded-full uppercase tracking-tighter whitespace-nowrap font-sans font-bold">
                    Utolsó 2 jegy
                  </span>
                </span>
              </div>

              <div className="text-xs text-slate-300 font-mono text-center">
                Helyiértékes felbontás: <span className="text-rose-400">{labNumber}</span> = 100 · {hundredsPart} + <span className="text-amber-400 font-bold">{lastTwoDigits}</span>
              </div>
            </div>

            {/* 2 Result Cards: 4 and 100 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* 4-gyel */}
              <div className={cn(
                "p-4 rounded-xl border transition-all flex flex-col justify-between",
                isDiv4
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 4-gyel</span>
                    {isDiv4 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv4 ? '✅ Osztható 4-gyel' : '❌ Nem osztható 4-gyel'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Utolsó két számjegy: <strong className="font-mono">{lastTwoDigits.toString().padStart(2, '0')}</strong> ({lastTwoDigits % 4 === 0 ? 'osztható 4-gyel' : 'nem osztható 4-gyel'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 4)}</div>
                  <div className="font-bold">4-es maradék: {rem4} ({lastTwoDigits} mod 4 = {rem4})</div>
                </div>
              </div>

              {/* 100-zal */}
              <div className={cn(
                "p-4 rounded-xl border transition-all flex flex-col justify-between",
                isDiv100
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">Oszthatóság 100-zal</span>
                    {isDiv100 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-base font-black mb-1">
                    {isDiv100 ? '✅ Osztható 100-zal' : '❌ Nem osztható 100-zal'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Utolsó két számjegy: <strong className="font-mono">{lastTwoDigits.toString().padStart(2, '0')}</strong> ({lastTwoDigits === 0 ? '00' : 'nem 00'}).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div>Hányados: {Math.floor(labNumber / 100)}</div>
                  <div className="font-bold">100-as maradék: {rem100}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* 5. SZEKCIÓ: Gyors fejszámolási trükkök és összefoglaló táblázat */}
      <TheorySection
        number={5}
        title="Gyors trükkök, csapdák és összefoglaló táblázat"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCallout type="tip" title="1. Fejszámolási trükk: A kétszeri felezés">
            <p className="text-xs sm:text-sm leading-relaxed">
              Egy szám akkor és csak akkor osztható 4-gyel, ha <strong>felezve páros számot kapunk</strong> (azaz kétszer egymás után el lehet felezni egész számként!).
              <br />
              <em>Példa:</em> $136 \to$ fele $68$ (páros) $\to$ fele $34$ (egész). Mivel kétszer felezhető, <strong>136 osztható 4-gyel</strong>!
            </p>
          </TheoryCallout>

          <TheoryCallout type="tip" title="2. Fejszámolási trükk: Tízesek paritása">
            <p className="text-xs sm:text-sm leading-relaxed">
              Nézd meg a tízesek helyén álló számjegyet:
              <br />
              • Ha a tízes <strong>páros</strong> (0, 2, 4, 6, 8), az egyeseknek <strong>0, 4 vagy 8</strong>-nak kell lenniük (pl. 20, 24, 28, 40, 44, 48...).
              <br />
              • Ha a tízes <strong>páratlan</strong> (1, 3, 5, 7, 9), az egyeseknek <strong>2 vagy 6</strong>-nak kell lenniük (pl. 12, 16, 32, 36, 52, 56...).
            </p>
          </TheoryCallout>
        </div>

        {/* Összefoglaló táblázat */}
        <TheoryTable
          headers={['Szám', 'Utolsó 2 jegy', 'Osztható 4-gyel?', 'Osztható 100-zal?', '4-es maradék', '100-as maradék']}
          rows={[
            ['324', '24', '✅ Igen (24 : 4 = 6)', '❌ Nem', '0', '24'],
            ['500', '00', '✅ Igen (00)', '✅ Igen (00)', '0', '0'],
            ['718', '18', '❌ Nem (18 : 4 = 4 mar. 2)', '❌ Nem', '2', '18'],
            ['1036', '36', '✅ Igen (36 : 4 = 9)', '❌ Nem', '0', '36'],
            ['4815', '15', '❌ Nem (15 : 4 = 3 mar. 3)', '❌ Nem', '3', '15'],
            ['9900', '00', '✅ Igen', '✅ Igen', '0', '0']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}
