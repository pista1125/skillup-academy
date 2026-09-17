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
  ArrowRightLeft,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  Sliders,
  PieChart,
  Layers,
  Repeat
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface FractionToDecimalTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const FractionToDecimalTheory: React.FC<FractionToDecimalTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Converter State
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(4);

  // Famous Benchmark Fractions Presets
  const presets = [
    { n: 1, d: 2, label: '1/2 = 0,5 (Fél)' },
    { n: 1, d: 4, label: '1/4 = 0,25 (Egynegyed)' },
    { n: 3, d: 4, label: '3/4 = 0,75 (Háromnegyed)' },
    { n: 1, d: 5, label: '1/5 = 0,2 (Egyötöd)' },
    { n: 3, d: 5, label: '3/5 = 0,6 (Háromötöd)' },
    { n: 1, d: 8, label: '1/8 = 0,125 (Egynyolcad)' },
    { n: 3, d: 8, label: '3/8 = 0,375 (Háromnyolcad)' },
    { n: 7, d: 20, label: '7/20 = 0,35 (Bővítés 100-ra)' }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setNum(p.n);
    setDen(p.d);
  };

  const decValue = Math.round((num / den) * 10000) / 10000;
  const decStr = decValue.toString().replace('.', ',');

  // Find expansion factor for 10, 100, 1000 if applicable
  let targetDen = 0;
  let mult = 0;
  if (10 % den === 0) {
    targetDen = 10;
    mult = 10 / den;
  } else if (100 % den === 0) {
    targetDen = 100;
    mult = 100 / den;
  } else if (1000 % den === 0) {
    targetDen = 1000;
    mult = 1000 / den;
  }

  return (
    <TheoryTemplate
      title="Közönséges törtek tizedes tört alakja"
      subtitle="Fedezd fel a közönséges törtek és a tizedes törtek közötti átjárást: bővítéssel 10, 100, 1000 nevezőre, írásbeli osztással és a nevezetes törtek memorizálásával!"
      badgeText="🔄 5. Osztály • II. Törtek, tizedes törtek"
      documentId="fraction-to-decimal-theory-content"
      pdfFilename="5_osztaly_kozonseges_tortek_tizedes_tort_alakja_tananyag.pdf"
      quickRule={{
        label: 'KÖZÖNSÉGES TÖRT TIZEDES ALAKJA',
        formula: '1/2 = 0,5 | 1/4 = 0,25 | 3/4 = 0,75 | 1/5 = 0,2 | 1/8 = 0,125'
      }}
      themeColor="purple"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: A TÖRT ÉS AZ OSZTÁS KAPCSOLATA */}
      <TheorySection
        number={1}
        title="A törtvonal mint osztásjel"
        icon={<ArrowRightLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="Miért alakítható át minden közönséges tört tizedes törtté?"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Már megtanultuk, hogy a <strong>törtvonal osztást jelent</strong>: a számlálót osztjuk a nevezővel (<MathText>a/b = a : b</MathText>).
              Mivel a természetes számok osztásakor tizedes hányadost is kaphatunk, 
              <strong>bármely közönséges tört átírható tizedes tört alakba</strong>, ha a számlálót elosztjuk a nevezővel!
            </p>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-around flex-wrap gap-4 text-center">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Közönséges tört</div>
                <div className="text-xl font-black text-purple-700 dark:text-purple-300 font-mono mt-1">
                  <MathText>3/4</MathText>
                </div>
              </div>

              <div className="text-purple-500 font-bold text-sm flex items-center gap-1">
                <span>osztás</span>
                <ArrowRight className="w-4 h-4" />
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Osztási alak</div>
                <div className="text-xl font-black text-indigo-700 dark:text-indigo-300 font-mono mt-1">
                  <MathText>3 : 4</MathText>
                </div>
              </div>

              <div className="text-purple-500 font-bold text-sm flex items-center gap-1">
                <span>eredmény</span>
                <ArrowRight className="w-4 h-4" />
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Tizedes tört</div>
                <div className="text-xl font-black text-emerald-700 dark:text-emerald-300 font-mono mt-1">
                  <MathText>0,75</MathText>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: ÁTVÁLTÁS BŐVÍTÉSSEL */}
      <TheorySection
        number={2}
        title="1. Módszer: Átváltás bővítéssel 10, 100, 1000 nevezőre"
        icon={<Repeat className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="A leggyorsabb fejben számolási technika"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Ha egy tört nevezője olyan szám, amelyet szorzással könnyen <MathText>10</MathText>-re, <MathText>100</MathText>-ra vagy <MathText>1000</MathText>-re tudunk bővíteni, 
              akkor a legegyszerűbb módszer a <strong>bővítés</strong>, majd a kapott tizedes nevezőjű tört tizedes törtként való felírása.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-2">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <div className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase">Nevező: 2 vagy 5</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Bővítés 10-re (·5 / ·2)</div>
                <div className="mt-2 text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-purple-800">
                  <MathText>1/2 = 5/10 = 0,5</MathText>
                  <div className="mt-1"><MathText>3/5 = 6/10 = 0,6</MathText></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase">Nevező: 4, 20, 25, 50</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Bővítés 100-ra</div>
                <div className="mt-2 text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <MathText>3/4 = 75/100 = 0,75</MathText>
                  <div className="mt-1"><MathText>7/20 = 35/100 = 0,35</MathText></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <div className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase">Nevező: 8, 125</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Bővítés 1000-re (·125 / ·8)</div>
                <div className="mt-2 text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-teal-100 dark:border-teal-800">
                  <MathText>1/8 = 125/1000 = 0,125</MathText>
                  <div className="mt-1"><MathText>3/8 = 375/1000 = 0,375</MathText></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">Vegyes tört</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Egész rész + Tört rész</div>
                <div className="mt-2 text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <MathText>2 1/4 = 2 25/100 = 2,25</MathText>
                  <div className="mt-1"><MathText>1 3/5 = 1 6/10 = 1,6</MathText></div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: ÁTVÁLTÁS ÍRÁSBELI OSZTÁSSAL */}
      <TheorySection
        number={3}
        title="2. Módszer: Átváltás írásbeli osztással"
        icon={<Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="Az univerzális eljárás minden törtre"
          icon={<Lightbulb className="w-5 h-5 text-purple-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Ha a nevező nem bővíthető könnyen 10-re vagy 100-ra (vagy ha bonyolultabb a szám), 
              <strong>egyszerűen elvégezzük a számláló osztását a nevezővel</strong>:
            </p>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 space-y-3">
              <div className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase">
                Kidolgozott példa: <MathText>5/8</MathText> átírása tizedes tört alakba
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800">
                  <div className="font-bold text-purple-900 dark:text-purple-200">1. Lépés: Egész rész</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    <MathText>5 : 8 = 0</MathText>, maradék az 5. Kitesszük a tizedesvesszőt: <strong className="font-mono">0,</strong>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">2. Lépés: Tizedek és századok</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    <MathText>50 : 8 = 6</MathText> (m: 2) → <MathText>20 : 8 = 2</MathText> (m: 4)
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">3. Lépés: Ezredek</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    <MathText>40 : 8 = 5</MathText> (m: 0). Végeredmény: <strong className="text-emerald-700 dark:text-emerald-300 font-mono">0,625</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZAKASZ: TIZEDES TÖRT VISSZAÍRÁSA KÖZÖNSÉGES TÖRTTÉ */}
      <TheorySection
        number={4}
        title="Tizedes tört visszaírása közönséges törtté és egyszerűsítés"
        icon={<ArrowRightLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="Hogyan alakítunk vissza tizedes törtet közönséges törtté?"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A tizedes törtet <strong>úgy írjuk fel közönséges törtként, ahogyan kiolvassuk</strong>, majd a kapott törtet <strong>egyszerűsítjük a legegyszerűbb alakjáig</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1.5">
                <div className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase">Tizedek: 1 tizedesjegy</div>
                <div className="text-xs text-slate-700 dark:text-slate-300">Nevezője mindig 10:</div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-bold text-xs border border-purple-100 dark:border-purple-800">
                  <MathText>0,4 = 4/10 = 2/5</MathText>
                  <div className="mt-1"><MathText>0,5 = 5/10 = 1/2</MathText></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <div className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase">Századok: 2 tizedesjegy</div>
                <div className="text-xs text-slate-700 dark:text-slate-300">Nevezője mindig 100:</div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-bold text-xs border border-indigo-100 dark:border-indigo-800">
                  <MathText>0,75 = 75/100 = 3/4</MathText>
                  <div className="mt-1"><MathText>0,08 = 8/100 = 2/25</MathText></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1.5">
                <div className="text-xs font-black text-teal-800 dark:text-teal-300 uppercase">Ezredek: 3 tizedesjegy</div>
                <div className="text-xs text-slate-700 dark:text-slate-300">Nevezője mindig 1000:</div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-bold text-xs border border-teal-100 dark:border-teal-800">
                  <MathText>0,125 = 125/1000 = 1/8</MathText>
                  <div className="mt-1"><MathText>0,375 = 375/1000 = 3/8</MathText></div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV TÖRT-TIZEDES LABORATÓRIUM */}
      <TheorySection
        number={5}
        title="Interaktív Tört-Tizedes Átváltó Laboratórium"
        icon={<Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="Próbáld ki bármelyik nevezetes tört átváltását!"
          icon={<Calculator className="w-5 h-5 text-purple-500" />}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Válassz a leggyakoribb nevezetes törtek közül, vagy állíts be tetszőleges számlálót és nevezőt a csúszkával:
            </p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((p, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(p)}
                  className={cn(
                    'text-xs font-mono transition-all',
                    num === p.n && den === p.d
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
                      : 'hover:bg-purple-50 dark:hover:bg-purple-950/50'
                  )}
                >
                  {p.label}
                </Button>
              ))}
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <div>
                <label className="text-xs font-bold text-purple-900 dark:text-purple-300 block mb-1">
                  Számláló: <span className="font-mono text-base font-black text-purple-700 dark:text-purple-300">{num}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-purple-900 dark:text-purple-300 block mb-1">
                  Nevező: <span className="font-mono text-base font-black text-purple-700 dark:text-purple-300">{den}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={den}
                  onChange={(e) => setDen(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Conversion Result Display */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-400">Átváltási folyamat</span>
                <span className="font-mono text-lg font-black text-purple-700 dark:text-purple-300">
                  <MathText>{`${num}/${den} = ${decStr}`}</MathText>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-700 dark:text-slate-300">1. Osztási alak:</div>
                  <div className="font-mono font-black text-indigo-600 dark:text-indigo-400 mt-1">
                    <MathText>{`${num} : ${den}`}</MathText>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-700 dark:text-slate-300">2. Bővítési lehetőség:</div>
                  <div className="font-mono font-black text-purple-600 dark:text-purple-400 mt-1">
                    {targetDen > 0 ? (
                      <MathText>{`· ${mult} = ${num * mult}/${targetDen}`}</MathText>
                    ) : (
                      'Írásbeli osztással'
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">3. Pontos tizedes tört:</div>
                  <div className="font-mono font-black text-emerald-700 dark:text-emerald-300 mt-1 text-sm">
                    <MathText>{decStr}</MathText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={6}
        title="Tipikus hibák és csapdák elkerülése"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Csapda: A számláló és nevező sima egymás mögé írása vesszővel"
            wrong="A 3/4-et sokan tévesen 3,4-nek vagy 0,34-nek írják le."
            correct="A 3/4 értéke 3 : 4 = 0,75! A törtvonal osztást jelent, nem egymás mellé írást!"
            explanation="Gondolj a negyedekre: 1/4 = 0,25, így háromnegyed = 3 · 0,25 = 0,75."
          />

          <TheoryTrapBox
            title="2. Csapda: Egyszerűsítés elfelejtése a tizedesből törtbe alakításkor"
            wrong="0,6 átírásakor csak a 6/10-et írják fel, és megállnak."
            correct="Mindig a legegyszerűbb alakot keressük: 0,6 = 6/10 = 3/5 (mindkettőt osztjuk 2-vel)!"
            explanation="A matematikában a végeredményt mindig egyszerűsített, tovább már nem egyszerűsíthető tört alakban adjuk meg."
          />

          <TheoryTrapBox
            title="3. Csapda: Századok és tizedek felcserélése (0,05 vs 0,5)"
            wrong="0,05 átírásakor tévesen 5/10 = 1/2-et írnak le."
            correct="0,05-ben 2 tizedesjegy van, tehát 5 századrész: 0,05 = 5/100 = 1/20."
            explanation="1 tizedesjegy = tized (nevező 10), 2 tizedesjegy = század (nevező 100), 3 tizedesjegy = ezred (nevező 1000)."
          />
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={7}
        title="A legfontosabb nevezetes törtek memorizáló táblázata"
        icon={<BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryTable
          headers={['Közönséges tört', 'Bővített tört alak', 'Tizedes tört alak', 'Kiolvasás']}
          rows={[
            ['1/2', '5/10', '0,5', '5 tized (fél)'],
            ['1/4', '25/100', '0,25', '25 század (egynegyed)'],
            ['3/4', '75/100', '0,75', '75 század (háromnegyed)'],
            ['1/5', '2/10', '0,2', '2 tized (egyötöd)'],
            ['2/5', '4/10', '0,4', '4 tized (kétötöd)'],
            ['3/5', '6/10', '0,6', '6 tized (háromötöd)'],
            ['4/5', '8/10', '0,8', '8 tized (négyötöd)'],
            ['1/8', '125/1000', '0,125', '125 ezred (egynyolcad)'],
            ['3/8', '375/1000', '0,375', '375 ezred (háromnyolcad)'],
            ['5/8', '625/1000', '0,625', '625 ezred (ötnyolcad)'],
            ['7/8', '875/1000', '0,875', '875 ezred (hétnyolcad)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
export default FractionToDecimalTheory;
