import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  Fraction
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Sparkles,
  Binary,
  Zap,
  Calculator,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Scale,
  Hash,
  Lightbulb,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface PowersApplicationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PowersApplicationTheory: React.FC<PowersApplicationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Law Explorer state
  const [activeLawTab, setActiveLawTab] = useState<'mult-same-base' | 'div-same-base' | 'power-of-power' | 'mult-same-exp' | 'div-same-exp'>('mult-same-base');
  const [baseA, setBaseA] = useState<number>(2);
  const [baseB, setBaseB] = useState<number>(5);
  const [expN, setExpN] = useState<number>(3);
  const [expK, setExpK] = useState<number>(2);

  return (
    <TheoryTemplate
      title="Hatványok alkalmazása & Azonosságok"
      subtitle="Fedezd fel a hatványozás 5 alapvető azonosságát, a szorzás, osztás és hatványozás gyorsító szabályait, valamint az előjeles és algebrai alkalmazásokat!"
      badgeText="7. Osztály • Matematika IV. Témakör • 2. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="⚡"
      themeColor="amber"
      documentId="g7-powers-application-theory-doc"
      pdfFilename="7_osztaly_hatvanyok_alkalmazasa_tananyag.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Hatványazonosságok',
        formula: 'aⁿ · aᵏ = aⁿ⁺ᵏ  |  aⁿ : aᵏ = aⁿ⁻ᵏ  |  (aⁿ)ᵏ = aⁿ·ᵏ  |  (a · b)ⁿ = aⁿ · bⁿ  |  (a : b)ⁿ = aⁿ : bⁿ'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="18 perc"
    >
      {/* 1. INTERACTIVE TOOL: Hatványazonosságok Interaktív Felfedezője */}
      <div className="mb-10 p-5 sm:p-7 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-600/10 rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Hatványazonosságok Interaktív Laboratóriuma
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Válaszd ki a szabályt, állítsd be az alapokat és kitevőket, és figyeld meg a tényezők kifejtését!
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          <button
            onClick={() => setActiveLawTab('mult-same-base')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer",
              activeLawTab === 'mult-same-base'
                ? "bg-amber-600 text-white border-amber-600 shadow-md"
                : "bg-white/80 dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50"
            )}
          >
            <div className="text-[10px] uppercase font-mono opacity-80">1. Szabály</div>
            <div>aⁿ · aᵏ = aⁿ⁺ᵏ</div>
          </button>

          <button
            onClick={() => setActiveLawTab('div-same-base')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer",
              activeLawTab === 'div-same-base'
                ? "bg-amber-600 text-white border-amber-600 shadow-md"
                : "bg-white/80 dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50"
            )}
          >
            <div className="text-[10px] uppercase font-mono opacity-80">2. Szabály</div>
            <div>aⁿ : aᵏ = aⁿ⁻ᵏ</div>
          </button>

          <button
            onClick={() => setActiveLawTab('power-of-power')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer",
              activeLawTab === 'power-of-power'
                ? "bg-amber-600 text-white border-amber-600 shadow-md"
                : "bg-white/80 dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50"
            )}
          >
            <div className="text-[10px] uppercase font-mono opacity-80">3. Szabály</div>
            <div>(aⁿ)ᵏ = aⁿ·ᵏ</div>
          </button>

          <button
            onClick={() => setActiveLawTab('mult-same-exp')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer",
              activeLawTab === 'mult-same-exp'
                ? "bg-amber-600 text-white border-amber-600 shadow-md"
                : "bg-white/80 dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50"
            )}
          >
            <div className="text-[10px] uppercase font-mono opacity-80">4. Szabály</div>
            <div>(a · b)ⁿ = aⁿ · bⁿ</div>
          </button>

          <button
            onClick={() => setActiveLawTab('div-same-exp')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer",
              activeLawTab === 'div-same-exp'
                ? "bg-amber-600 text-white border-amber-600 shadow-md"
                : "bg-white/80 dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50"
            )}
          >
            <div className="text-[10px] uppercase font-mono opacity-80">5. Szabály</div>
            <div>(a / b)ⁿ = aⁿ / bⁿ</div>
          </button>
        </div>

        {/* Sliders Area */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-white/70 dark:bg-slate-900/60 p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Alap (a):</span>
              <span className="font-mono text-amber-600 font-black text-sm">{baseA}</span>
            </div>
            <Slider
              value={[baseA]}
              onValueChange={([val]) => setBaseA(val)}
              min={2}
              max={6}
              step={1}
              className="py-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Első kitevő (n):</span>
              <span className="font-mono text-orange-600 font-black text-sm">{expN}</span>
            </div>
            <Slider
              value={[expN]}
              onValueChange={([val]) => setExpN(val)}
              min={1}
              max={5}
              step={1}
              className="py-1"
            />
          </div>

          {activeLawTab === 'mult-same-exp' || activeLawTab === 'div-same-exp' ? (
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Második alap (b):</span>
                <span className="font-mono text-indigo-600 font-black text-sm">{baseB}</span>
              </div>
              <Slider
                value={[baseB]}
                onValueChange={([val]) => setBaseB(val)}
                min={2}
                max={5}
                step={1}
                className="py-1"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Második kitevő (k):</span>
                <span className="font-mono text-purple-600 font-black text-sm">{expK}</span>
              </div>
              <Slider
                value={[expK]}
                onValueChange={([val]) => {
                  if (activeLawTab === 'div-same-base' && val > expN) {
                    setExpK(expN);
                  } else {
                    setExpK(val);
                  }
                }}
                min={1}
                max={activeLawTab === 'div-same-base' ? expN : 4}
                step={1}
                className="py-1"
              />
            </div>
          )}
        </div>

        {/* Display calculation breakdown based on selected tab */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-800 shadow-sm">
          {activeLawTab === 'mult-same-base' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-mono font-black text-slate-900 dark:text-white">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-lg text-amber-800 dark:text-amber-300">
                  {baseA}<sup>{expN}</sup> · {baseA}<sup>{expK}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-950/80 rounded-lg text-orange-800 dark:text-orange-300">
                  {baseA}<sup>{expN} + {expK}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-lg text-emerald-800 dark:text-emerald-300">
                  {baseA}<sup>{expN + expK}</sup> = {Math.pow(baseA, expN + expK).toLocaleString('hu-HU')}
                </span>
              </div>

              {/* Visual Factor Expansion */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Tényezőkre bontva (Miért igaz a szabály?):
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-mono">
                  <span className="text-amber-700 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded border border-amber-200">
                    ({Array(expN).fill(baseA).join(' · ')})
                  </span>
                  <span className="text-slate-400 font-bold">·</span>
                  <span className="text-purple-700 font-bold bg-purple-50 dark:bg-purple-950/40 px-2 py-1 rounded border border-purple-200">
                    ({Array(expK).fill(baseA).join(' · ')})
                  </span>
                  <span className="text-slate-400 font-bold">=</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded border border-emerald-200">
                    {Array(expN + expK).fill(baseA).join(' · ')}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Összesen: <span className="font-bold text-amber-600">{expN} db</span> + <span className="font-bold text-purple-600">{expK} db</span> = <span className="font-bold text-emerald-600">{expN + expK} darab</span> {baseA}-as tényező szorzata!
                </div>
              </div>
            </div>
          )}

          {activeLawTab === 'div-same-base' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-mono font-black text-slate-900 dark:text-white">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-lg text-amber-800 dark:text-amber-300">
                  {baseA}<sup>{expN}</sup> : {baseA}<sup>{expK}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-950/80 rounded-lg text-orange-800 dark:text-orange-300">
                  {baseA}<sup>{expN} - {expK}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-lg text-emerald-800 dark:text-emerald-300">
                  {baseA}<sup>{expN - expK}</sup> = {Math.pow(baseA, expN - expK).toLocaleString('hu-HU')}
                </span>
              </div>

              {/* Fraction view & simplification */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Törtként egyszerűsítve:
                </div>
                <div className="flex items-center justify-center gap-3 font-mono text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-amber-600 font-bold border-b border-slate-400 pb-1 px-2">
                      {Array(expN).fill(baseA).join(' · ')}
                    </span>
                    <span className="text-purple-600 font-bold pt-1 px-2">
                      {Array(expK).fill(baseA).join(' · ')}
                    </span>
                  </div>
                  <span className="text-slate-400">=</span>
                  <div className="text-emerald-600 font-bold">
                    {expN === expK ? '1 (minden kiesik)' : Array(expN - expK).fill(baseA).join(' · ')}
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  A nevező <span className="font-bold text-purple-600">{expK} darab</span> tényezője kiüti a számláló {expK} darab tényezőjét, így pontosan <span className="font-bold text-emerald-600">{expN - expK} darab</span> marad!
                </div>
              </div>
            </div>
          )}

          {activeLawTab === 'power-of-power' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-mono font-black text-slate-900 dark:text-white">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-lg text-amber-800 dark:text-amber-300">
                  ({baseA}<sup>{expN}</sup>)<sup>{expK}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-950/80 rounded-lg text-orange-800 dark:text-orange-300">
                  {baseA}<sup>{expN} · {expK}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-lg text-emerald-800 dark:text-emerald-300">
                  {baseA}<sup>{expN * expK}</sup> = {Math.pow(baseA, expN * expK).toLocaleString('hu-HU')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Miért szorzódnak a kitevők?
                </div>
                <div className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
                  {Array(expK).fill(`(${Array(expN).fill(baseA).join('·')})`).join(' · ')}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Pontosan <span className="font-bold text-purple-600">{expK} darab</span> olyan csoportot szorzunk össze, amelyben egyenként <span className="font-bold text-orange-600">{expN} darab</span> {baseA}-as van. Ezért összesen <span className="font-bold text-emerald-600">{expN} · {expK} = {expN * expK} darab</span> tényezőnk van!
                </div>
              </div>
            </div>
          )}

          {activeLawTab === 'mult-same-exp' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-mono font-black text-slate-900 dark:text-white">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-lg text-amber-800 dark:text-amber-300">
                  {baseA}<sup>{expN}</sup> · {baseB}<sup>{expN}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-950/80 rounded-lg text-orange-800 dark:text-orange-300">
                  ({baseA} · {baseB})<sup>{expN}</sup>
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-lg text-emerald-800 dark:text-emerald-300">
                  {baseA * baseB}<sup>{expN}</sup> = {Math.pow(baseA * baseB, expN).toLocaleString('hu-HU')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Tényezők párosítása:
                </div>
                <div className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
                  {Array(expN).fill(`(${baseA}·${baseB})`).join(' · ')} = {Array(expN).fill(baseA * baseB).join(' · ')}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Mivel a szorzótényezők sorrendje felcserélhető, a {baseA}-asokat és a {baseB}-ösöket páronként összeszorozhatjuk ({baseA} · {baseB} = {baseA * baseB}), és ezt {expN}-szer végezzük el!
                </div>
              </div>
            </div>
          )}

          {activeLawTab === 'div-same-exp' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-mono font-black text-slate-900 dark:text-white">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-lg text-amber-800 dark:text-amber-300 flex items-center">
                  <Fraction num={baseA} den={baseB} power={expN} size="lg" />
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-950/80 rounded-lg text-orange-800 dark:text-orange-300 flex items-center">
                  <Fraction num={`${baseA}<sup>${expN}</sup>`} den={`${baseB}<sup>${expN}</sup>`} size="lg" />
                </span>
                <span>=</span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-lg text-emerald-800 dark:text-emerald-300 flex items-center">
                  <Fraction num={Math.pow(baseA, expN)} den={Math.pow(baseB, expN)} size="lg" />
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Tört szorzása önmagával:
                </div>
                <div className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 flex-wrap">
                  {Array(expN).fill(null).map((_, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span>·</span>}
                      <Fraction num={baseA} den={baseB} />
                    </React.Fragment>
                  ))}
                  <span>=</span>
                  <Fraction num={Array(expN).fill(baseA).join(' · ')} den={Array(expN).fill(baseB).join(' · ')} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Törtek szorzásakor számlálót számlálóval ({baseA} · ... · {baseA} = {baseA}<sup>{expN}</sup>), nevezőt nevezővel ({baseB} · ... · {baseB} = {baseB}<sup>{expN}</sup>) szorozzuk!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 1. SZAKASZ: Azonos alapú hatványok szorzása és osztása */}
      <TheorySection
        title="1. Fejezet: Azonos alapú hatványok szorzása és osztása"
        subtitle="Amikor az alap megegyezik, a művelet a kitevők összeadásává vagy kivonásává egyszerűsödik"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Azonos alapú hatványok szorzása"
            badge="1. Alapszabály"
          >
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl font-mono text-center font-bold text-base text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 mb-3">
              aⁿ · aᵏ = aⁿ⁺ᵏ
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              <strong>Szabály:</strong> Azonos alapú hatványok szorzásakor az <strong>alapot változatlanul hagyjuk</strong>, és a <strong>kitevőket összeadjuk</strong>.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>• 2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128</div>
              <div>• 10² · 10⁵ = 10²⁺⁵ = 10⁷ (tízmillió)</div>
              <div>• x⁴ · x³ · x = x⁴⁺³⁺¹ = x⁸ <span className="text-amber-600 font-sans font-bold">(x = x¹!)</span></div>
              <div>• (-3)² · (-3)³ = (-3)⁵ = -243</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Azonos alapú hatványok osztása"
            badge="2. Alapszabály"
          >
            <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-xl text-center font-bold text-lg text-orange-900 dark:text-orange-200 border border-orange-200 dark:border-orange-800/60 mb-3 flex items-center justify-center gap-2 flex-wrap">
              <span>aⁿ : aᵏ = aⁿ⁻ᵏ</span>
              <span className="text-slate-400 text-sm font-normal">vagy</span>
              <Fraction num="aⁿ" den="aᵏ" size="lg" />
              <span>= aⁿ⁻ᵏ</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              <strong>Szabály:</strong> Azonos alapú hatványok osztásakor az <strong>alapot változatlanul hagyjuk</strong>, és a számláló kitevőjéből <strong>kivonjuk a nevező kitevőjét</strong> (ha a ≠ 0 és n ≥ k).
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5 flex-wrap">• 5⁷ : 5⁴ = 5⁷⁻⁴ = 5³ = 125</div>
              <div className="flex items-center gap-1.5 flex-wrap">• <Fraction num="10⁸" den="10⁵" /> = 10⁸⁻⁵ = 10³ = 1 000</div>
              <div className="flex items-center gap-1.5 flex-wrap">• y⁹ : y² = y⁷</div>
              <div className="flex items-center gap-1.5 flex-wrap">• <Fraction num="a⁵" den="a⁵" /> = a⁵⁻⁵ = a⁰ = 1 <span className="text-orange-600 font-bold ml-1">(ha a ≠ 0)</span></div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Tipikus Csapda: Összeadás vs. Szorzás!">
          <div className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <p>
              ❌ <strong>Súlyos hiba:</strong> <code>2³ + 2⁴ = 2⁷</code> (NEM igaz!).<br />
              Az azonosság csak <strong>szorzásra</strong> érvényes! Kiszámolva: <code>2³ + 2⁴ = 8 + 16 = 24</code>, míg <code>2⁷ = 128</code>!
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 font-bold">
              ✓ <strong>Mikor lehet mégis összevonni?</strong> Ha egyforma tagokat adunk össze:<br />
              <code>2⁴ + 2⁴ = 2 · 2⁴ = 2⁵ = 32</code>.<br />
              <code>3⁵ + 3⁵ + 3⁵ = 3 · 3⁵ = 3⁶</code>!
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 2. SZAKASZ: Hatvány hatványozása és a zárójelek */}
      <TheorySection
        title="2. Fejezet: Hatvány hatványozása"
        subtitle="Hogyan hatványozunk egy már meglévő hatványt, és mire kell vigyázni a zárójelezésnél?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="A hatványozás hatványozása"
            badge="3. Alapszabály"
          >
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl font-mono text-center font-bold text-base text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800/60 mb-3">
              (aⁿ)ᵏ = aⁿ · ᵏ
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              <strong>Szabály:</strong> Hatvány hatványozásakor az alapot megtartjuk, és a <strong>kitevőket összeszorozzuk</strong>.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>• (2³)² = 2³·² = 2⁶ = 64</div>
              <div>• (10²)⁴ = 10²·⁴ = 10⁸</div>
              <div>• (x⁴)⁵ = x⁴·⁵ = x²⁰</div>
              <div>• [(-1)³]² = (-1)⁶ = +1</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Zárójeles hatvány vs. Toronyhatvány"
            badge="Kritikus különbség"
          >
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl font-mono text-center font-bold text-sm text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800/60 mb-3">
              (2³)² ≠ 2<sup>(3²)</sup>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              A zárójel megváltoztatja a műveleti sorrendet:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>(2³)²:</strong> A 2³ = 8 szám van négyzetre emelve: <code>8² = 64 = 2⁶</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>2<sup>3²</sup>:</strong> Zárójel nélkül a kitevőben álló 3² értékelődik ki először: <code>3² = 9</code>, így <code>2⁹ = 512</code>!</span>
              </li>
            </ul>
          </TheoryCard>
        </div>

        <TheoryCallout title="Tudtad? Az alap átírása egy másik alap hatványára">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Gyakran találkozunk olyan feladattal, ahol az alapok látszólag különböznek, de átírhatók azonos alapra:<br />
            • <code>4³ = (2²)³ = 2⁶ = 64</code><br />
            • <code>8⁴ = (2³)⁴ = 2¹² = 4096</code><br />
            • <code>9⁵ = (3²)⁵ = 3¹⁰</code><br />
            • <code>27² = (3³)² = 3⁶ = 729</code><br />
            Ez a technika a legfontosabb fegyver a törtek egyszerűsítésénél és egyenleteknél!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZAKASZ: Szorzat és Hányados (Tört) hatványozása */}
      <TheorySection
        title="3. Fejezet: Szorzat és tört (hányados) hatványozása"
        subtitle="Azonos kitevőjű hatványok összevonása vagy szétbontása"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Szorzat hatványozása"
            badge="4. Alapszabály"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl font-mono text-center font-bold text-base text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800/60 mb-3">
              (a · b)ⁿ = aⁿ · bⁿ
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              <strong>Szabály:</strong> Egy szorzatot úgy hatványozunk, hogy <strong>minden tényezőt külön-külön</strong> a megadott kitevőre emelünk. Visszafelé is érvényes: azonos kitevő esetén az alapokat összeszorozhatjuk!
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>• (2 · 5)³ = 2³ · 5³ = 8 · 125 = 1 000</div>
              <div>• (3x)² = 3² · x² = 9x² <span className="text-rose-600 font-sans font-bold">(nem 3x²!)</span></div>
              <div>• 4⁵ · 25⁵ = (4 · 25)⁵ = 100⁵ = 10 000 000 000</div>
              <div>• (-2a)³ = (-2)³ · a³ = -8a³</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tört (hányados) hatványozása"
            badge="5. Alapszabály"
          >
            <div className="p-3.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-center font-bold text-lg text-teal-900 dark:text-teal-200 border border-teal-200 dark:border-teal-800/60 mb-3 flex items-center justify-center gap-2 flex-wrap">
              <Fraction num="a" den="b" power="n" size="lg" />
              <span>=</span>
              <Fraction num="aⁿ" den="bⁿ" size="lg" />
              <span className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">(b ≠ 0)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              <strong>Szabály:</strong> Törtet úgy hatványozunk, hogy a <strong>számlálót és a nevezőt is külön-külön</strong> a kitevőre emeljük.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>•</span>
                <Fraction num="2" den="3" power="4" />
                <span>=</span>
                <Fraction num="2⁴" den="3⁴" />
                <span>=</span>
                <Fraction num="16" den="81" />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>•</span>
                <Fraction num="3" den="5" power="2" />
                <span>=</span>
                <Fraction num="3²" den="5²" />
                <span>=</span>
                <Fraction num="9" den="25" />
                <span>= 0,36</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>•</span>
                <Fraction num="18³" den="6³" />
                <span>=</span>
                <Fraction num="18" den="6" power="3" />
                <span>= 3³ = 27</span>
                <span className="text-teal-600 font-bold ml-1">(visszafelé!)</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>•</span>
                <Fraction num="-1" den="2" power="4" paren />
                <span>=</span>
                <Fraction num="(-1)⁴" den="2⁴" />
                <span>=</span>
                <Fraction num="1" den="16" />
                <span>= +0,0625</span>
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Figyelem: Együttható hatványozása zárójelben!">
          <div className="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <p>
              • <code>(5a)² = 5² · a² = 25a²</code> — Mindkét tényező négyzetre emelődik!
            </p>
            <p>
              • <code>5a² = 5 · a²</code> — Zárójel nélkül a négyzet <strong>CSAK az a-ra</strong> vonatkozik!
            </p>
            <p>
              • <code>(-4x)² = (-4)² · x² = 16x²</code>, míg <code>-(4x)² = -(16x²) = -16x²</code>!
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. SZAKASZ: Összetett kifejezések egyszerűsítése és Előjelek */}
      <TheorySection
        title="4. Fejezet: Összetett kifejezések egyszerűsítése és példatár"
        subtitle="Lépésről lépésre végzett műveletek és azonosságok kombinációi"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-600" />
            Kidolgozott Mintapéldák Lépésről Lépésre
          </h4>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Példa 1 */}
            <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-900/40">
              <div className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                1. Példa: Számítsd ki a kifejezés értékét: (2⁵ · 2³) / 2⁴
              </div>
              <div className="text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                <div>• 1. Lépés (számláló összevonása): 2⁵ · 2³ = 2⁵⁺³ = 2⁸</div>
                <div>• 2. Lépés (osztás azonos alappal): 2⁸ / 2⁴ = 2⁸⁻⁴ = 2⁴</div>
                <div>• 3. Lépés (kiszámítás): 2⁴ = 16</div>
              </div>
            </div>

            {/* Példa 2 */}
            <div className="p-3.5 bg-orange-50/50 dark:bg-orange-950/20 rounded-xl border border-orange-200/80 dark:border-orange-900/40">
              <div className="font-bold text-orange-900 dark:text-orange-300 mb-1">
                2. Példa: Hozd egyszerűbb alakra: (3²)⁴ · 3 / (3³)³
              </div>
              <div className="text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                <div>• 1. Lépés (hatvány hatványozása): (3²)⁴ = 3⁸ és (3³)³ = 3⁹</div>
                <div>• 2. Lépés (számláló): 3⁸ · 3¹ = 3⁸⁺¹ = 3⁹</div>
                <div>• 3. Lépés (osztás): 3⁹ / 3⁹ = 3⁹⁻⁹ = 3⁰ = 1</div>
              </div>
            </div>

            {/* Példa 3 */}
            <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-200/80 dark:border-purple-900/40">
              <div className="font-bold text-purple-900 dark:text-purple-300 mb-1">
                3. Példa: Különböző alapok közös alapra hozása: (4³ · 8²) / 2¹⁰
              </div>
              <div className="text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                <div>• 1. Lépés (átírás 2-es alapra): 4 = 2², így 4³ = (2²)³ = 2⁶</div>
                <div>• 2. Lépés (átírás 2-es alapra): 8 = 2³, így 8² = (2³)² = 2⁶</div>
                <div>• 3. Lépés (számláló): 2⁶ · 2⁶ = 2¹²</div>
                <div>• 4. Lépés (egyszerűsítés): 2¹² / 2¹⁰ = 2¹²⁻¹⁰ = 2² = 4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Összefoglaló táblázat */}
        <div className="mt-6">
          <TheoryTable
            headers={['Azonosság neve', 'Képlet', 'Konkrét Példa', 'Gyakori Hiba']}
            rows={[
              [
                'Azonos alapúak szorzása',
                'aⁿ · aᵏ = aⁿ⁺ᵏ',
                '2³ · 2⁴ = 2⁷ = 128',
                '2³ · 2⁴ ≠ 4⁷ és 2³ + 2⁴ ≠ 2⁷'
              ],
              [
                'Azonos alapúak osztása',
                'aⁿ : aᵏ = aⁿ⁻ᵏ',
                '5⁶ : 5² = 5⁴ = 625',
                'Kivonás helyett osztják a kitevőt'
              ],
              [
                'Hatvány hatványozása',
                '(aⁿ)ᵏ = aⁿ·ᵏ',
                '(3²)³ = 3⁶ = 729',
                '(3²)³ ≠ 3²⁺³ = 3⁵'
              ],
              [
                'Szorzat hatványozása',
                '(a · b)ⁿ = aⁿ · bⁿ',
                '(2 · 5)³ = 10³ = 1000',
                '(3x)² ≠ 3x² (mindkettőt emelni kell!)'
              ],
              [
                'Tört hatványozása',
                '(a / b)ⁿ = aⁿ / bⁿ',
                '(2/3)³ = 8 / 27',
                'Csak a számlálót emelik négyzetre'
              ]
            ]}
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowersApplicationTheory;
