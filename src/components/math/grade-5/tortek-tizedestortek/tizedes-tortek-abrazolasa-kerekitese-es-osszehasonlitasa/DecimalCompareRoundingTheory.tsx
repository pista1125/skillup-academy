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
  ArrowRight,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Sliders,
  Scale,
  Target,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface DecimalCompareRoundingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DecimalCompareRoundingTheory: React.FC<DecimalCompareRoundingTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // 1. Interactive Comparison State
  const [compNumA, setCompNumA] = useState<number>(3.4);
  const [compNumB, setCompNumB] = useState<number>(3.38);

  const getCompResult = (a: number, b: number) => {
    if (Math.abs(a - b) < 0.0001) return '=';
    return a > b ? '>' : '<';
  };

  // 2. Interactive Rounding Lab State
  const [inputVal, setInputVal] = useState<number>(4.738);
  const [roundingTarget, setRoundingTarget] = useState<'ones' | 'tenths' | 'hundredths'>('tenths');

  const getDecisiveInfo = (val: number, target: 'ones' | 'tenths' | 'hundredths') => {
    const fixed3 = val.toFixed(3);
    const [whole, dec] = fixed3.split('.');
    const d1 = parseInt(dec[0] || '0', 10);
    const d2 = parseInt(dec[1] || '0', 10);
    const d3 = parseInt(dec[2] || '0', 10);

    if (target === 'ones') {
      const decisive = d1;
      const rounded = Math.round(val);
      const isUp = decisive >= 5;
      return {
        targetName: 'egészre',
        targetPlace: 'egyesek helyiértéke',
        decisiveDigit: decisive,
        decisivePlace: 'tizedek (első tizedesjegy)',
        isUp,
        roundedStr: `${rounded}`,
        reason: `${decisive} ${isUp ? '>= 5, ezért felfelé kerekítünk' : '< 5, ezért lefelé kerekítünk'}`
      };
    } else if (target === 'tenths') {
      const decisive = d2;
      const rounded = (Math.round(val * 10) / 10).toFixed(1).replace('.', ',');
      const isUp = decisive >= 5;
      return {
        targetName: 'tizedre',
        targetPlace: 'tizedek helyiértéke',
        decisiveDigit: decisive,
        decisivePlace: 'századok (második tizedesjegy)',
        isUp,
        roundedStr: rounded,
        reason: `${decisive} ${isUp ? '>= 5, ezért a tizedekhez hozzáadunk 1-et' : '< 5, ezért a tizedek értéke marad'}`
      };
    } else {
      const decisive = d3;
      const rounded = (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
      const isUp = decisive >= 5;
      return {
        targetName: 'századra',
        targetPlace: 'századok helyiértéke',
        decisiveDigit: decisive,
        decisivePlace: 'ezredek (harmadik tizedesjegy)',
        isUp,
        roundedStr: rounded,
        reason: `${decisive} ${isUp ? '>= 5, ezért a századokhoz hozzáadunk 1-et' : '< 5, ezért a századok értéke marad'}`
      };
    }
  };

  const decisiveInfo = getDecisiveInfo(inputVal, roundingTarget);

  return (
    <TheoryTemplate
      title="Tizedes törtek ábrázolása, kerekítése és összehasonlítása"
      subtitle="Sajátítsd el a számegyenesen való tájékozódást, a tizedes törtek balról jobbra történő precíz összehasonlítását és a szabályos kerekítést!"
      badgeText="📏 5. Osztály • II. Törtek, tizedes törtek"
      documentId="decimal-compare-rounding-theory-content"
      pdfFilename="5_osztaly_tizedes_tortek_abrazolasa_kerekitese_osszehasonlitasa_tananyag.pdf"
      quickRule={{
        label: 'KEREKÍTÉS ÉS ÖSSZEHASONLÍTÁS',
        formula: '0, 1, 2, 3, 4 → lefelé | 5, 6, 7, 8, 9 → felfelé | 3,40 > 3,38'
      }}
      themeColor="blue"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: ÁBRÁZOLÁS A SZÁMEGYENESEN */}
      <TheorySection
        number={1}
        title="Tizedes törtek ábrázolása a számegyenesen"
        icon={<Maximize2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <TheoryCard
          title="Tized- és századbeosztás a számegyenesen"
          icon={<Lightbulb className="w-5 h-5 text-blue-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Ahogy a természetes számokat, úgy a <strong>tizedes törteket is pontosan elhelyezhetjük a számegyenesen</strong>.
              Két egész szám közötti 1 egységnyi szakaszt:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1.5">
                <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">10</span>
                  <span>10 egyenlő részre osztva:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Minden egyes kis osztásköz <strong>1 tized (<MathText>0,1 = 1/10</MathText>)</strong> értékű.
                  Például a <MathText>0</MathText> és <MathText>1</MathText> között: <MathText>0,1; 0,2; ...; 0,9; 1,0</MathText>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">100</span>
                  <span>100 egyenlő részre osztva:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Minden egyes mikroszakasz <strong>1 század (<MathText>0,01 = 1/100</MathText>)</strong> értékű.
                  Például a <MathText>0,3</MathText> és <MathText>0,4</MathText> között: <MathText>0,31; 0,35; 0,39</MathText>.
                </p>
              </div>
            </div>

            {/* Vizuális számegyenes grafika */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-inner space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-blue-400">Számegyenes részlet: 2 és 3 között (tizedes felosztás)</span>
                <span>Lépésköz = 0,1</span>
              </div>

              <div className="relative pt-6 pb-2">
                {/* Vízszintes tengely */}
                <div className="h-1.5 bg-blue-500/80 rounded-full w-full relative">
                  {/* Nyíl a végén */}
                  <div className="absolute right-0 -top-1 border-solid border-l-slate-200 border-l-8 border-y-transparent border-y-4 border-r-0" />
                </div>

                {/* Osztások */}
                <div className="relative flex justify-between items-start mt-[-7px]">
                  {[
                    { val: '2,0', isMain: true, highlight: false },
                    { val: '2,1', isMain: false, highlight: false },
                    { val: '2,2', isMain: false, highlight: false },
                    { val: '2,3', isMain: false, highlight: false },
                    { val: '2,4', isMain: false, highlight: true, note: '2,4' },
                    { val: '2,5', isMain: false, highlight: false },
                    { val: '2,6', isMain: false, highlight: false },
                    { val: '2,7', isMain: false, highlight: true, note: '2,7' },
                    { val: '2,8', isMain: false, highlight: false },
                    { val: '2,9', isMain: false, highlight: false },
                    { val: '3,0', isMain: true, highlight: false }
                  ].map((tick, idx) => (
                    <div key={idx} className="flex flex-col items-center relative group">
                      <div className={cn(
                        'rounded-full',
                        tick.isMain ? 'w-1 h-5 bg-white' : 'w-0.5 h-3 bg-slate-400',
                        tick.highlight && 'w-1.5 h-6 bg-amber-400 ring-4 ring-amber-400/30'
                      )} />
                      <span className={cn(
                        'text-[11px] font-mono mt-2',
                        tick.isMain ? 'font-bold text-white text-xs' : 'text-slate-400',
                        tick.highlight && 'font-black text-amber-300 text-sm'
                      )}>
                        {tick.val}
                      </span>
                      {tick.highlight && (
                        <span className="absolute -top-7 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px] shadow">
                          {tick.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Szabály:</strong> A számegyenesen <strong>jobbra haladva a számok növekednek</strong>. Mivel a <MathText>2,7</MathText> jobbra van a <MathText>2,4</MathText>-től, ezért <MathText>{'2,7 > 2,4'}</MathText>.
                </span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: TIZEDES TÖRTEK ÖSSZEHASONLÍTÁSA */}
      <TheorySection
        number={2}
        title="Tizedes törtek összehasonlítása lépésről lépésre"
        icon={<Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="A balról jobbra haladás aranyszabálya"
          icon={<Lightbulb className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A tizedes törtek összehasonlításakor <strong>mindig a legnagyobb helyiértéktől (balról) haladunk jobbra</strong>:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1.
                </div>
                <div>
                  <div className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">Egész részek összehasonlítása</div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                    Ha az egész rész nagyobb, akkor az egész szám nagyobb, a tört rész nem számít! 
                    Például: <MathText>{'5,1 > 4,99'}</MathText> (mert <MathText>{'5 > 4'}</MathText>).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2.
                </div>
                <div>
                  <div className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">Ha az egész részek egyenlők: Tizedek vizsgálata</div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                    Az a szám a nagyobb, amelyiknek a tized helyiértékén nagyobb számjegy áll.
                    Például: <MathText>{'3,72 > 3,68'}</MathText> (mert a tizedeknél <MathText>{'7 > 6'}</MathText>).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3.
                </div>
                <div>
                  <div className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">Szükség esetén nullák pótlása a szám végére!</div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                    Ha eltérő a tizedesjegyek száma, írj nullákat a rövidebb szám végére azonos hosszúságig!
                    Például: <MathText>3,4 = 3,40</MathText>, és mivel <MathText>{'3,40 > 3,38'}</MathText>, ezért <MathText>{'3,4 > 3,38'}</MathText>.
                  </p>
                </div>
              </div>
            </div>

            {/* Interaktív összehasonlító labor */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Interaktív Összehasonlító Labor</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Válassz két számot!</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-indigo-600">
                    <span>'A' szám:</span>
                    <span className="font-mono text-base">{compNumA.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.05"
                    value={compNumA}
                    onChange={(e) => setCompNumA(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-purple-600">
                    <span>'B' szám:</span>
                    <span className="font-mono text-base">{compNumB.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.05"
                    value={compNumB}
                    onChange={(e) => setCompNumB(parseFloat(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-600 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider flex items-center justify-center gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400">{compNumA.toFixed(2).replace('.', ',')}</span>
                  <span className="px-3 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {getCompResult(compNumA, compNumB)}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400">{compNumB.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {compNumA > compNumB ? (
                    <span>Az <strong>{compNumA.toFixed(2).replace('.', ',')}</strong> nagyobb, mint az <strong>{compNumB.toFixed(2).replace('.', ',')}</strong>.</span>
                  ) : compNumA < compNumB ? (
                    <span>Az <strong>{compNumA.toFixed(2).replace('.', ',')}</strong> kisebb, mint az <strong>{compNumB.toFixed(2).replace('.', ',')}</strong>.</span>
                  ) : (
                    <span>A két tizedes tört értéke <strong>pontosan megegyezik</strong>.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: TIZEDES TÖRTEK KEREKÍTÉSE */}
      <TheorySection
        number={3}
        title="Tizedes törtek kerekítése (Egészre, tizedre, századra)"
        icon={<Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="A döntő számjegy és a kerekítési szabály"
          icon={<Lightbulb className="w-5 h-5 text-emerald-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A tizedes törtek kerekítése <strong>ugyanazon a szabályon alapul</strong>, mint a természetes számoké.
              Mindig megkeressük a <strong>kerekítendő helyiértéket</strong>, és megnézzük a közvetlenül <strong>utána álló (tőle jobbra lévő) döntő számjegyet</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
                <div className="font-bold text-rose-900 dark:text-rose-200 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black">⬇️</span>
                  <span>0, 1, 2, 3, 4 → LEFELÉ kerekítünk</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  A kerekítendő helyiértéken álló számjegy <strong>változatlan marad</strong>, a mögötte lévő számjegyeket pedig elhagyjuk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">⬆️</span>
                  <span>5, 6, 7, 8, 9 → FELFELÉ kerekítünk</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  A kerekítendő helyiértéken álló számjegyhez <strong>1-et hozzáadunk</strong>, a mögötte lévő számjegyeket pedig elhagyjuk.
                </p>
              </div>
            </div>

            {/* Interaktív Kerekítő Labor */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Interaktív Kerekítő Laboratórium</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Próbáld ki a különböző pontosságokat!</span>
              </div>

              {/* Számválasztó gyorsgombok */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Válassz minta számot:</div>
                <div className="flex flex-wrap gap-2">
                  {[4.738, 3.421, 6.895, 2.964, 0.452, 9.987].map((num) => (
                    <button
                      key={num}
                      onClick={() => setInputVal(num)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all',
                        inputVal === num
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-emerald-200 dark:border-slate-700'
                      )}
                    >
                      {num.toFixed(3).replace('.', ',')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kerekítési szint kiválasztó */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Kerekítés célja:</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ones', label: 'Egészre (1)', sub: 'tizedet nézzük' },
                    { id: 'tenths', label: 'Tizedre (0,1)', sub: 'századot nézzük' },
                    { id: 'hundredths', label: 'Századra (0,01)', sub: 'ezredet nézzük' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setRoundingTarget(btn.id as any)}
                      className={cn(
                        'p-2.5 rounded-xl text-center border transition-all',
                        roundingTarget === btn.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
                      )}
                    >
                      <div className="text-xs font-bold">{btn.label}</div>
                      <div className={cn(
                        'text-[10px]',
                        roundingTarget === btn.id ? 'text-emerald-100' : 'text-slate-500'
                      )}>
                        {btn.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eredmény levezetés kártya */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-700 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 font-medium">
                    Kiinduló szám: <span className="text-base font-black font-mono text-slate-900 dark:text-white">{inputVal.toFixed(3).replace('.', ',')}</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Kerekítés: <span className="underline">{decisiveInfo.targetName}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">1. Döntő számjegy:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 font-mono font-black text-amber-800 dark:text-amber-300">
                      {decisiveInfo.decisiveDigit}
                    </span>
                    <span className="text-slate-500">({decisiveInfo.decisivePlace})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">2. Kerekítési döntés:</span>
                    <span className={cn(
                      'px-2 py-0.5 rounded font-bold text-[11px]',
                      decisiveInfo.isUp
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    )}>
                      {decisiveInfo.reason}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Kerekített érték:</span>
                  <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <span>{inputVal.toFixed(3).replace('.', ',')}</span>
                    <span className="text-slate-400">≈</span>
                    <span className="px-3 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700">
                      {decisiveInfo.roundedStr}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Tipikus hibák és csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Csapda: A hosszabb tizedes tört mindig nagyobb?"
            wrong="Sokan úgy gondolják, hogy a 0,489 nagyobb mint a 0,5, mert a 489 ránézésre jóval több, mint az 5."
            correct="A tizedesvessző utáni első számjegy (a tized) a legfontosabb: 0,5 = 0,500, míg 0,500 > 0,489. Mindig pótold a nullákat gondolatban!"
          />

          <TheoryTrapBox
            title="2. Csapda: Elhagyható-e a záró 0 kerekítéskor?"
            wrong="Például a 4,98 tizedre kerekítve 5,0. Sokan egyszerűen 5-öt írnak le."
            correct="Bár 5,0 = 5, ha a feladat kifejezetten TIZEDRE kerekítést kér, a 0 tizedet kötelező kiírni (5,0), mert ez jelzi a kerekítés pontosságát!"
          />

          <TheoryTrapBox
            title="3. Csapda: Kerekítéskor az összes korábbi számjegyet is át kell írni?"
            wrong="Például 7,384 századra kerekítésekor a 3-as tizedet is megváltoztatják."
            correct="Csak a kerekítendő helyiérték (a század) módosulhat, az előtte lévő helyiértékek (egész és tized) változatlanok maradnak (kivéve ha 9-ről 10-re átfordulunk)."
          />
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={5}
        title="Összefoglaló kerekítési és összehasonlítási útmutató"
        icon={<BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <TheoryTable
          headers={['Szám', 'Egészre kerekítve', 'Tizedre kerekítve', 'Századra kerekítve', 'Magyarázat']}
          rows={[
            ['3,426', '3', '3,4', '3,43', 'Tizednél 2 < 5 (lefelé), századnál 6 >= 5 (felfelé)'],
            ['7,851', '8', '7,9', '7,85', 'Egésznél 8 >= 5 (felfelé), tizednél 5 >= 5 (felfelé)'],
            ['0,496', '0', '0,5', '0,50', 'Századnál a 6 miatt 9+1 = 10 -> 0,50 kötelező 0-val'],
            ['12,049', '12', '12,0', '12,05', 'Tizednél 0 után 4 < 5 -> 12,0 marad'],
            ['9,963', '10', '10,0', '9,96', 'Tizednél 6 miatt 9+1 átfordul 10,0-ra']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DecimalCompareRoundingTheory;
