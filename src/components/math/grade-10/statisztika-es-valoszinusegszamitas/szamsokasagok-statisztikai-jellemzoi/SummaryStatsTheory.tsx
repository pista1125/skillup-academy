import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  MeanMedianModeSalarySvg,
  MedianEvenOddSvg,
  RangeAndOutlierSvg,
  FrequencyHistogramStatsSvg
} from './SummaryStatsFigures';
import {
  BarChart3,
  Sliders,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Table
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SummaryStatsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SummaryStatsTheory: React.FC<SummaryStatsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Statisztikai Labor Állapot ---
  // Alapértelmezett adatsor (módosítható pontok)
  const [dataPoints, setDataPoints] = useState<number[]>([10, 12, 14, 15, 16, 17, 80]);

  // Számítások az aktív adatsorra
  const sortedData = [...dataPoints].sort((a, b) => a - b);
  const n = sortedData.length;
  const sum = sortedData.reduce((acc, val) => acc + val, 0);
  const mean = n > 0 ? sum / n : 0;

  // Medián
  let median = 0;
  if (n > 0) {
    if (n % 2 === 1) {
      median = sortedData[Math.floor(n / 2)];
    } else {
      median = (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2;
    }
  }

  // Módusz
  const freqMap: Record<number, number> = {};
  let maxFreq = 0;
  sortedData.forEach((val) => {
    freqMap[val] = (freqMap[val] || 0) + 1;
    if (freqMap[val] > maxFreq) {
      maxFreq = freqMap[val];
    }
  });

  const modes: number[] = [];
  if (maxFreq > 1) {
    Object.keys(freqMap).forEach((key) => {
      const numKey = Number(key);
      if (freqMap[numKey] === maxFreq) {
        modes.push(numKey);
      }
    });
  }

  // Terjedelem
  const minVal = n > 0 ? sortedData[0] : 0;
  const maxVal = n > 0 ? sortedData[n - 1] : 0;
  const range = n > 0 ? maxVal - minVal : 0;

  const handlePreset = (preset: 'salary' | 'grades' | 'outlier' | 'symmetric') => {
    if (preset === 'salary') {
      // 20 dolgozó (ezer Ft): 3 db 80, 6 db 120, 5 db 200, 5 db 250, 1 db 300
      setDataPoints([80, 80, 80, 120, 120, 120, 120, 120, 120, 200, 200, 200, 200, 200, 250, 250, 250, 250, 250, 300]);
    } else if (preset === 'grades') {
      // 10 diák kémia jegyei: 2 db 2-es, 4 db 3-as, 3 db 4-es, 1 db 5-ös
      setDataPoints([2, 2, 3, 3, 3, 3, 4, 4, 4, 5]);
    } else if (preset === 'outlier') {
      setDataPoints([10, 12, 14, 15, 16, 17, 80]);
    } else {
      setDataPoints([2, 4, 6, 8, 10]);
    }
  };

  const handleReset = () => {
    setDataPoints([10, 12, 14, 15, 16, 17, 80]);
  };

  // Interaktív labor panel JSX
  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-blue-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500 text-slate-950 rounded-2xl shadow-lg">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-blue-100">
              Interaktív Statisztikai Elemző Labor
            </h3>
            <p className="text-xs text-blue-300/80">
              Figyeld meg élőben, hogyan reagál az átlag, medián, módusz és terjedelem az adatokra!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-blue-900"
            onClick={() => handlePreset('outlier')}
          >
            Kiugró érték (outlier)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-blue-900"
            onClick={() => handlePreset('salary')}
          >
            Fizetések (20 fő)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-blue-900"
            onClick={() => handlePreset('grades')}
          >
            Jegyek (10 fő)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-blue-900"
            onClick={() => handlePreset('symmetric')}
          >
            Szimmetrikus
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-8 text-blue-300 hover:text-white"
            onClick={handleReset}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Alaphelyzet
          </Button>
        </div>
      </div>

      {/* Rendezett adatsor megjelenítése buborékokban */}
      <div className="bg-slate-800/60 p-4 rounded-2xl border border-blue-700/40 space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
          <span>Rendezett minta (n = {n} elem):</span>
          <span className="text-blue-400 font-mono">Min: {minVal} | Max: {maxVal}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
          {sortedData.map((val, idx) => {
            const isMedianElement =
              n % 2 === 1
                ? idx === Math.floor(n / 2)
                : idx === n / 2 - 1 || idx === n / 2;
            const isModeElement = modes.includes(val);

            return (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isMedianElement
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-105'
                    : isModeElement
                    ? 'bg-amber-600/90 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {val}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block"></span> Kék: Medián elem
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-amber-600 inline-block"></span> Borostyán: Módusz érték
          </span>
        </div>
      </div>

      {/* Számított mutatók kártyái */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Átlag */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-emerald-500/30">
          <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Átlag (x̄)</div>
          <div className="text-2xl font-black text-emerald-300 mt-1">{mean.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Összeg: {sum} / {n}</div>
        </div>

        {/* Medián */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-blue-500/30">
          <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">Medián (Me)</div>
          <div className="text-2xl font-black text-blue-300 mt-1">{median.toFixed(1)}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{n % 2 === 1 ? 'Páratlan: középső' : 'Páros: belső átlag'}</div>
        </div>

        {/* Módusz */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-amber-500/30">
          <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Módusz (Mo)</div>
          <div className="text-2xl font-black text-amber-300 mt-1">
            {modes.length > 0 ? modes.join(', ') : 'Nincs'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {maxFreq > 1 ? `Leggyakoribb (${maxFreq}×)` : 'Minden adat egyedi'}
          </div>
        </div>

        {/* Terjedelem */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-indigo-500/30">
          <div className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">Terjedelem (R)</div>
          <div className="text-2xl font-black text-indigo-300 mt-1">{range}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{maxVal} - {minVal}</div>
        </div>
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Számsokaságok statisztikai jellemzői"
      subtitle="Helyzeti mutatók (átlag, módusz, medián), a terjedelem és az extrém értékek hatása rendezett mintákban"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="blue"
      documentId="grade10-summary-stats-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK: STATISZTIKAI JELLEMZŐK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-blue-50/90 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200 dark:border-blue-800">
              <span className="font-black text-blue-900 dark:text-blue-300 block mb-1">
                A 4 alappillér képletei és definíciói:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Átlag (x̄):</strong> <MathText>{'$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}$'}</MathText> (érzékeny az outlierre!)</li>
                <li>• <strong>Módusz (Mo):</strong> a mintában leggyakrabban előforduló érték (lehet több is).</li>
                <li>• <strong>Medián (Me):</strong> rendezett mintában a felezőpont (páratlan: középső; páros: két belső átlaga).</li>
                <li>• <strong>Terjedelem (R):</strong> <MathText>{'$R = x_{\\max} - x_{\\min}$'}</MathText> (szélső értékek különbsége).</li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px] leading-tight">
              <strong>💡 ARANYSZABÁLY:</strong> A <u>módusz</u> (ha van) és a <u>páratlan elemszámú medián</u> MINDIG eleme az eredeti adathalmaznak! Az átlag és a páros medián viszont lehet olyan szám is, ami eredetileg nem szerepelt.
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Mélyítsd el a tudásodat a statisztikai jellemzőkből!"
      practiceSubtitle="Gyakorold a medián, módusz, átlag és terjedelem számítását 30 válogatott feladaton keresztül!"
      practiceButtonText="Statisztikai Kvíz indítása"
      tips={[
        {
          title: 'Mindig rendezd az adatokat!',
          content: 'A medián kiszámítása előtt kötelező lépés a növekvő nagyság szerinti sorbarendezés! Rendezetlen mintából kiválasztani a középsőt súlyos típushiba.'
        },
        {
          title: 'Robusztus vs. Érzékeny mutatók',
          content: 'A medián robusztus: egyetlen extrém nagy vagy kicsi adat (pl. milliárdos igazgató fizetése) alig mozdítja el. Ezzel szemben az átlag és a terjedelem drasztikusan eltorzul.'
        },
        {
          title: 'Több módusz és hiányzó módusz',
          content: 'Egy adathalmaznak lehet egyetlen módusza (unimodális), két módusza (bimodális), vagy akár több is. Ha viszont minden adat pontosan egyszer fordul elő, akkor nincs módusz.'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-sky-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-blue-300/80 dark:border-blue-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/80 dark:border-blue-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-blue-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a számsokaságok jellemzőihez
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/40 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
            5 aranyszabály minden érettségi feladathoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Módusz (Mo)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A mintában a <b>legtöbbször előforduló</b> elem (a legnagyobb gyakoriságú érték).
              </p>
              <div className="my-2 p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-center font-bold text-blue-800 dark:text-blue-300 text-xs sm:text-sm border border-blue-100 dark:border-blue-800">
                <MathText>{'Mo = \\text{legnagyobb gyakoriságú adat}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium mt-1">
              💡 Lehet több módusz is (pl. bimodális), vagy ha minden adat egyedi, nincs módusz.
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Medián (Me)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <b>Rendezett minta</b> esetén a felezőpont: páratlan elemszámnál a középső elem, párosnál a két középső átlaga:
              </p>
              <div className="my-2 p-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-center font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm border border-purple-100 dark:border-purple-800">
                <MathText>{'Me = x_{\\frac{n+1}{2}} \\quad \\text{vagy} \\quad \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium mt-1">
              💡 <b>Robusztus mutató:</b> az extrém kiugró értékek nem rántják el!
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Átlag (x̄) és Érzékenység</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az elemek összege osztva az elemszámmal. Az átlagtól vett eltérések összege mindig 0:
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'\\bar{x} = \\frac{\\sum x_i}{n} \\quad \\text{és} \\quad \\sum (x_i - \\bar{x}) = 0'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              ⚠️ <b>Érzékeny mutató:</b> egyetlen hatalmas adat erősen megváltoztatja!
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Terjedelem (R)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A szóródás legegyszerűbb mutatója: a legnagyobb és legkisebb adat kivonásos különbsége:
              </p>
              <div className="my-2 p-2 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-center font-bold text-amber-800 dark:text-amber-300 text-xs sm:text-sm border border-amber-100 dark:border-amber-800">
                <MathText>{'R = x_{\\max} - x_{\\min}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
              💡 Ha minden adatot megnövelünk c állandóval, a terjedelem nem változik!
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-rose-200 dark:border-rose-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Melyik mutató szerepel BIZTOSAN a mintában?</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Gyakori érettségi elméleti kérdés: a négy mutató közül melyik garantáltan eleme az adatsornak?
              </p>
              <div className="my-2 p-2.5 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-rose-900 dark:text-rose-200 text-xs space-y-1 border border-rose-200 dark:border-rose-800">
                <div>• <b>Módusz:</b> Ha létezik, <span className="font-bold text-rose-600 dark:text-rose-400">BIZTOSAN</span> szerepel a mintában (hiszen ott fordult elő a legtöbbször).</div>
                <div>• <b>Medián:</b> Páratlan elemszám esetén <span className="font-bold text-rose-600 dark:text-rose-400">BIZTOSAN</span> szerepel; párosnál viszont nem biztos (pl. {'{2, 4}'} mediánja 3, ami nincs a mintában).</div>
                <div>• <b>Átlag:</b> Nem biztos, hogy szerepel (pl. {'{1, 2}'} átlaga 1,5).</div>
                <div>• <b>Terjedelem:</b> Nem feltétlenül eleme a mintának (pl. {'{10, 14}'} terjedelme 4, ami nincs ott).</div>
              </div>
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold mt-1">
              🎯 30 elemű mintában a <b>MÓDUSZ</b> az az egyetlen mutató, amely garantáltan szerepel az elemek között!
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: A HELYZETI KÖZÉPÉRTÉKEK */}
      <TheorySection
        title="1. A helyzeti középértékek: Átlag, Módusz és Medián"
        subtitle="Hogyan jellemezhetünk egy teljes számsokaságot egyetlen reprezentatív számmal?"
        badge="ALAPFOGALMAK"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Amikor egy statisztikai felmérés során sok adatot gyűjtünk össze (például fizetéseket, vizsgapontszámokat vagy hőmérsékleteket), a nyers adatsor önmagában nehezen áttekinthető. Szükségünk van olyan mutatókra, amelyek egyetlen értékkel sűrítik össze az adathalmaz központi helyzetét. Ezeket nevezzük <b>helyzeti középértékeknek</b>.
            </p>

            <TheoryCard title="A tankönyvi fizetési példa (20 dolgozó)" accentColor="blue">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
                Egy cégnél 20 dolgozó 5-féle fizetést kap: az igazgató 300 ezer Ft-ot, 5 főmunkatárs 250 ezret, 5 tisztviselő 200 ezret, 6 adminisztrátor 120 ezret, 3 takarító 80 ezret.
              </p>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-blue-200 dark:border-blue-800">
                <div>• <b>Adatok nagyság szerint:</b> 80, 80, 80, 120, 120, 120, 120, 120, 120, 200, 200, 200, 200, 200, 250, 250, 250, 250, 250, 300</div>
                <div>• <b>Módusz (Mo):</b> <b className="text-amber-600 dark:text-amber-400">120 ezer Ft</b> (6-szor fordul elő, ez a leggyakoribb fizetés).</div>
                <div>• <b>Medián (Me):</b> A 10. és 11. helyen álló fizetés átlaga: <MathText>{'$\\frac{200 + 200}{2} = \\mathbf{200\\text{ ezer Ft}}$'}</MathText>.</div>
                <div>• <b>Átlag (x̄):</b> Súlyozott számtani közép: <MathText>{'$\\frac{300 + 5\\cdot 250 + 5\\cdot 200 + 6\\cdot 120 + 3\\cdot 80}{20} = \\frac{3510}{20} = \\mathbf{175,5\\text{ ezer Ft}}$'}</MathText>.</div>
                <div className="pt-1.5 border-t border-blue-200 text-blue-900 dark:text-blue-300 font-medium">
                  Megfigyelés: 11-en keresnek többet az átlagnál, és 9-en kevesebbet. Az átlag önmagában nem mutatja meg, mi a legtipikusabb kereset a cégnél!
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <MeanMedianModeSalarySvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              1. Ábra: Céges fizetések aszimmetrikus eloszlása a három középértékkel
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A MEDIÁN MEGHATÁROZÁSA */}
      <TheorySection
        title="2. A medián (Me) kiszámítása: Páros és Páratlan elemszám"
        subtitle="A felezőpont meghatározása rendezett mintában és a robusztusság ereje"
        badge="MÓDSZERTAN"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <MedianEvenOddSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              2. Ábra: Páratlan (n=5) vs. Páros (n=6) elemszámú medián meghatározása
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              A <b>medián</b> a nagyság szerint rendezett sokaság pontosan középen elhelyezkedő értéke. A medián kettéosztja az adatsort: az adatok fele kisebb vagy egyenlő nála, másik fele nagyobb vagy egyenlő nála.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300 block text-xs uppercase tracking-wide">
                  A) Páratlan elemszám (n páratlan)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Pontosan egyetlen középső elem létezik, ennek sorszáma:
                </p>
                <div className="text-center font-bold text-blue-700 dark:text-blue-300 py-1">
                  <MathText>{'k = \\frac{n+1}{2}'}</MathText>
                </div>
                <p className="text-[11px] text-slate-500">
                  Példa: <MathText>{'$n = 7$'}</MathText> esetén a <MathText>{'$(7+1)/2 = 4.$'}</MathText> elem a medián.
                </p>
              </div>

              <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-1">
                <span className="font-bold text-purple-900 dark:text-purple-300 block text-xs uppercase tracking-wide">
                  B) Páros elemszám (n páros)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Két középső elem van, az <MathText>{'$n/2$'}</MathText> és az <MathText>{'$n/2 + 1$'}</MathText>. A medián ezek átlaga:
                </p>
                <div className="text-center font-bold text-purple-700 dark:text-purple-300 py-1">
                  <MathText>{'Me = \\frac{x_{n/2} + x_{n/2+1}}{2}'}</MathText>
                </div>
                <p className="text-[11px] text-slate-500">
                  Példa: <MathText>{'$n = 8$'}</MathText> esetén a 4. és 5. elem számtani közepe.
                </p>
              </div>
            </div>

            <TheoryTrapBox title="TÍPUSHIBA: Rendezetlen minta közvetlen felezése!">
              Ha egy feladat így adja meg az adatokat: <MathText>{'\\{9, 2, 8, 1, 7\\}'}</MathText>, nem szabad a felírás szerinti 3. elemet (a 8-at) mediánnak kinevezni! Először kötelező növekvő sorba állítani: <MathText>{'\\{1, 2, \\mathbf{7}, 8, 9\\}'}</MathText>, így a helyes medián <MathText>{'Me = 7'}</MathText>.
            </TheoryTrapBox>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A TERJEDELEM ÉS AZ EXTRÉM ÉRTÉKEK */}
      <TheorySection
        title="3. A terjedelem (R) és a kiugró értékek (outlierek)"
        subtitle="Miért van szükségünk szóródási mutatókra, és hogyan viselkednek az extrém adatok?"
        badge="SZÓRÓDÁSI MUTATÓ"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Két számsokaságnak lehet teljesen azonos az átlaga, miközben a szerkezetük radikálisan eltér. Például az <MathText>{'\\{5, 5, 5\\}'}</MathText> és az <MathText>{'\\{0, 5, 10\\}'}</MathText> adathalmazok átlaga egyaránt 5, de az első halmazban nincsenek eltérések, míg a másodikban a számok szétszórtak. A szóródás legegyszerűbb mérőszáma a <b>terjedelem (Range)</b>.
            </p>

            <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-xs sm:text-sm mb-1">
                A terjedelem definíciója és tulajdonságai:
              </h4>
              <div className="text-center font-bold text-indigo-800 dark:text-indigo-200 my-1 text-sm sm:text-base">
                <MathText>{'R = x_{\\max} - x_{\\min}'}</MathText>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <li>• Mindig nemnegatív érték: <MathText>{'$R \\ge 0$'}</MathText> (ha minden adat egyenlő, <MathText>{'$R = 0$'}</MathText>).</li>
                <li>• Rendkívül érzékeny a szélső értékekre, mivel csak a két végpont határozza meg.</li>
                <li>• <b>Eltolási invariancia:</b> Ha minden adathoz hozzáadunk egy <MathText>{'$c$'}</MathText> konstanst, a terjedelem nem változik: <MathText>{'$R_{új} = (x_{\\max} + c) - (x_{\\min} + c) = R_{régi}$'}</MathText>.</li>
              </ul>
            </div>

            <TheoryCallout title="A medián robusztussága vs. Átlag elcsúszása" type="info">
              Ha egy 10 fős csoportban mindenki 100 ezer Ft-ot keres, az átlag és medián 100 ezer Ft. Ha csatlakozik egy milliárdos 100 millió Ft-os fizetéssel, az átlag felugrik több millió forintra, miközben a medián <b>továbbra is pontosan 100 ezer Ft marad</b>! A medián ezért a megbízhatóbb mutató jövedelmi elemzéseknél.
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <RangeAndOutlierSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              3. Ábra: Kiugró érték torzító hatása az átlagra és a terjedelemre
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: GYAKORISÁGI TÁBLÁZATOK ÉS DIAGRAMOK */}
      <TheorySection
        title="4. Gyakorisági eloszlások és hisztogramok leolvasása"
        subtitle="Hogyan olvassuk le a statisztikai jellemzőket oszlop- és kördiagramokról?"
        badge="GYAKORLATI ELEMZÉS"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <FrequencyHistogramStatsSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              4. Ábra: Félévi kémia osztályzatok gyakorisági hisztogramja
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Nagy adathalmazok esetén az értékeket nem egyenként soroljuk fel, hanem gyakorisági táblázatban vagy hisztogramon foglaljuk össze. Ilyenkor a statisztikai mutatókat a gyakoriságok segítségével határozzuk meg.
            </p>

            <TheoryCard title="Mintafeladat: Kémia osztályzatok (20 tanuló)" accentColor="blue">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>
                  Egy osztályban a félévi kémia érdemjegyek gyakorisága a következő: 1-es: 0 db, 2-es: 2 db, 3-as: 8 db, 4-es: 6 db, 5-ös: 4 db. Összesen: 20 tanuló.
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
                  <div>1. <b>Módusz:</b> A legmagasabb oszlop a 3-ashoz tartozik (8 tanuló), így <MathText>{'$\\mathbf{Mo = 3}$'}</MathText>.</div>
                  <div>2. <b>Terjedelem:</b> A legnagyobb jegy 5, a legkisebb megjelent jegy 2, tehát <MathText>{'$R = 5 - 2 = \\mathbf{3}$'}</MathText>.</div>
                  <div>3. <b>Medián:</b> <MathText>{'$n = 20$'}</MathText> páros, ezért a 10. és 11. diák jegyének átlaga kell.
                    <br />
                    • 1. és 2. diák: 2-es (összesen 2 diák).
                    <br />
                    • 3–10. diák: 3-as (összesen 10 diák, a 10. diák jegye 3-as!).
                    <br />
                    • 11–16. diák: 4-es (a 11. diák jegye már 4-es!).
                    <br />
                    A medián: <MathText>{'$Me = \\frac{3 + 4}{2} = \\mathbf{3,5}$'}</MathText>.
                  </div>
                  <div>4. <b>Átlag:</b> Súlyozott számtani közép:
                    <MathText>{'$\\bar{x} = \\frac{2\\cdot 2 + 8\\cdot 3 + 6\\cdot 4 + 4\\cdot 5}{20} = \\frac{4 + 24 + 24 + 20}{20} = \\frac{72}{20} = \\mathbf{3,60}$'}</MathText>.
                  </div>
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: VISSZAKÖVETÉSI FELADATOK ÉS ÉRETTSÉGI STRATÉGIÁK */}
      <TheorySection
        title="5. Adathalmaz rekonstrukciója a statisztikai mutatókból"
        subtitle="Érettségi feladatok: ismeretlen adatok meghatározása mediánból, átlagból és terjedelemből"
        badge="ÉRETTSÉGI TÍPUSOK"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            Az érettségi vizsgákon a leggyakoribb feladattípus az, amikor nem a mutatókat kell kiszámolni adott adatsorból, hanem <b>megadott mutatókból kell kitalálni a hiányzó számokat</b>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mintapélda 1: Hőmérsékletek */}
            <TheoryCard title="Érettségi példa 1: Márciusi hőmérsékletek" accentColor="emerald">
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Egy márciusi napon 5 alkalommal mérték a hőmérsékletet. Az adatok átlaga <MathText>{'$1^\\circ\\text{C}$'}</MathText>, mediánja <MathText>{'$0^\\circ\\text{C}$'}</MathText>. Adj meg öt ilyen lehetséges értéket!
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs space-y-1.5 border border-emerald-200 dark:border-emerald-800">
                <div>• <b>1. Lépés (Összeg):</b> Mivel <MathText>{'$n = 5$'}</MathText> és az átlag 1, az adatok összege: <MathText>{'$5 \\cdot 1 = 5$'}</MathText>.</div>
                <div>• <b>2. Lépés (Medián):</b> 5 adat közül a nagyság szerinti 3. adatnak kötelezően 0-nak kell lennie: <MathText>{'$x_3 = 0$'}</MathText>.</div>
                <div>• <b>3. Lépés (Keresés):</b> Rendezett minta: <MathText>{'$x_1 \\le x_2 \\le 0 \\le x_4 \\le x_5$'}</MathText>, összegük 5.</div>
                <div className="font-bold text-emerald-800 dark:text-emerald-300 pt-1 border-t border-emerald-200">
                  Példa megoldás: <MathText>{'\\{-3; -1; \\mathbf{0}; 4; 5\\}'}</MathText>.
                  <br />
                  Ellenőrzés: összeg = 5, átlag = 1, medián = 0. Megfelel!
                </div>
              </div>
            </TheoryCard>

            {/* Mintapélda 2: Röplabdacsapat csere */}
            <TheoryCard title="Érettségi példa 2: Röplabdacsapat átlagmagassága" accentColor="indigo">
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                A pályán lévő 6 játékos átlagmagassága 172 cm. Egy játékost lecserélnek, így az átlagmagasság 174 cm-re nő. Mennyivel magasabb az új játékos a réginél?
              </p>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs space-y-1.5 border border-indigo-200 dark:border-indigo-800">
                <div>• <b>Kezdeti összeg:</b> <MathText>{'$6 \\cdot 172\\text{ cm} = 1032\\text{ cm}$'}</MathText>.</div>
                <div>• <b>Új összeg csere után:</b> <MathText>{'$6 \\cdot 174\\text{ cm} = 1044\\text{ cm}$'}</MathText>.</div>
                <div>• <b>Összegbeli növekmény:</b> <MathText>{'$1044 - 1032 = 12\\text{ cm}$'}</MathText>.</div>
                <div className="font-bold text-indigo-800 dark:text-indigo-300 pt-1 border-t border-indigo-200">
                  Válasz: Az új játékos pontosan <b>12 cm-rel magasabb</b> annál, akit lecseréltek! (Mivel 6 játékosra jutott átlagosan +2 cm).
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

