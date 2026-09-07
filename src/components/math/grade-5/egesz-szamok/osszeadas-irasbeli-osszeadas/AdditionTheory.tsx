import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  BookOpen,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText,
  Calculator,
  Info,
  ArrowRightLeft,
  AlertCircle,
  Layers,
  Target,
  ArrowRight,
  RotateCcw,
  Zap,
  Plus,
  Equal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface AdditionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function AdditionTheory({ onBack, onStartQuiz }: AdditionTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Simulator State
  const [num1, setNum1] = useState<string>('4785');
  const [num2, setNum2] = useState<string>('3648');
  const [stepIndex, setStepIndex] = useState<number>(0);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('addition-theory-content', 'Osszeadas_Irasbeli_Osszeadas_Tananyag');
    setIsDownloading(false);
  };

  // Helper for column addition steps
  const getAdditionSteps = (val1Str: string, val2Str: string) => {
    const n1 = parseInt(val1Str, 10);
    const n2 = parseInt(val2Str, 10);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || n1 > 9999999 || n2 > 9999999) {
      return null;
    }

    const s1 = n1.toString();
    const s2 = n2.toString();
    const maxLen = Math.max(s1.length, s2.length);

    const pad1 = s1.padStart(maxLen, '0');
    const pad2 = s2.padStart(maxLen, '0');

    let carry = 0;
    const steps = [];
    const sumDigits = [];
    const carries = [0]; // carries above each column from right to left

    // Step by step from right to left
    for (let i = maxLen - 1; i >= 0; i--) {
      const d1 = parseInt(pad1[i], 10);
      const d2 = parseInt(pad2[i], 10);
      const colSum = d1 + d2 + carry;
      const resultDigit = colSum % 10;
      const nextCarry = Math.floor(colSum / 10);

      const placeName =
        maxLen - 1 - i === 0
          ? 'egyesek'
          : maxLen - 1 - i === 1
          ? 'tízesek'
          : maxLen - 1 - i === 2
          ? 'százasok'
          : maxLen - 1 - i === 3
          ? 'ezresek'
          : maxLen - 1 - i === 4
          ? 'tízezresek'
          : 'százezresek';

      steps.push({
        colIndex: maxLen - 1 - i,
        placeName,
        d1,
        d2,
        prevCarry: carry,
        colSum,
        resultDigit,
        nextCarry,
        explanation: `${d1} + ${d2}${carry > 0 ? ` + ${carry} (maradék)` : ''} = ${colSum}. Leírjuk a(z) ${resultDigit}-t, maradt a(z) ${nextCarry}.`
      });

      sumDigits.unshift(resultDigit);
      carry = nextCarry;
      carries.push(carry);
    }

    if (carry > 0) {
      sumDigits.unshift(carry);
      steps.push({
        colIndex: maxLen,
        placeName: 'legmagasabb helyiérték',
        d1: 0,
        d2: 0,
        prevCarry: carry,
        colSum: carry,
        resultDigit: carry,
        nextCarry: 0,
        explanation: `Az utolsó átlépés miatt a ${carry}-t leírjuk a bal szélre.`
      });
    }

    const exactSum = n1 + n2;
    const est1 = Math.round(n1 / 100) * 100;
    const est2 = Math.round(n2 / 100) * 100;
    const estSum = est1 + est2;

    return {
      n1,
      n2,
      exactSum,
      estSum,
      maxLen,
      pad1,
      pad2,
      steps,
      totalSteps: steps.length
    };
  };

  const calcData = getAdditionSteps(num1, num2);

  return (
    <div className="w-full px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {onStartQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-3 border-blue-300 bg-blue-50/60 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="addition-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <span>➕ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Összeadás, írásbeli összeadás
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fogalmak, műveleti tulajdonságok, fejszámolás, az írásbeli összeadás lépései, átlépések és interaktív kalkulátor
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-slate-850 rounded-2xl border border-blue-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Számkör</div>
            <div className="text-lg font-black text-blue-700 dark:text-blue-300">1 – 10 000 000</div>
          </div>
        </div>

        {/* SECTION 1: AZ ÖSSZEADÁS FOGALMA ÉS TAGJAI */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>Az összeadás fogalma és tagjai</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              Az <strong>összeadás</strong> az egyik legalapvetőbb matematikai művelet, amellyel két vagy több mennyiséget egyetlen közös értékké egyesítünk.
            </p>
            <p>
              Az összeadásban részt vevő számokat <strong>összeadandóknak (vagy tagoknak)</strong>, az összeadás eredményét pedig <strong>összegnek</strong> nevezzük.
            </p>
          </div>

          {/* Term formula visual */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-blue-200/80 dark:border-slate-700 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center font-mono">
            <div>
              <div className="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-200">450</div>
              <div className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400">1. összeadandó</div>
            </div>
            <Plus className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-200">230</div>
              <div className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400">2. összeadandó</div>
            </div>
            <Equal className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">680</div>
              <div className="text-[11px] font-sans font-bold text-emerald-700 dark:text-emerald-300">Összeg</div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 dark:bg-slate-850 rounded-xl border border-amber-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>A 0 mint semleges elem:</strong> Bármely számhoz nullát adva az érték nem változik: <em>a + 0 = a</em> (pl. <em>345 + 0 = 345</em>).
            </div>
          </div>
        </section>

        {/* SECTION 2: AZ ÖSSZEADÁS TULAJDONSÁGAI */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>Az összeadás tulajdonságai és fejszámolási trükkök</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Felcserélhetőség */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50/60 dark:from-slate-850 dark:to-slate-800 border-2 border-blue-200/80 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-black text-sm">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                <span>Felcserélhetőség (Kommutativitás)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az összeadandók sorrendje tetszőlegesen felcserélhető, az összeg nem változik: <strong>a + b = b + a</strong>.
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-slate-700">
                Példa: 28 + 56 = 56 + 28 = <strong>84</strong>
              </div>
            </div>

            {/* Csoportosíthatóság */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/60 dark:from-slate-850 dark:to-slate-800 border-2 border-indigo-200/80 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-black text-sm">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Csoportosíthatóság (Asszociativitás)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Három vagy több tag összeadásakor a tagok tetszőlegesen csoportosíthatók: <strong>(a + b) + c = a + (b + c)</strong>.
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-slate-700">
                Példa: (17 + 83) + 45 = 100 + 45 = <strong>145</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-blue-50/60 dark:bg-slate-850 rounded-xl border border-blue-100 dark:border-slate-700 text-xs">
              <strong className="text-blue-800 dark:text-blue-300 block mb-1">🎯 Kerek tízesre/százasra kiegészítés</strong>
              Érdemes azokat a számokat párosítani, amelyek összege kerek szám (pl. 37 + 63 = 100).
            </div>
            <div className="p-3 bg-blue-50/60 dark:bg-slate-850 rounded-xl border border-blue-100 dark:border-slate-700 text-xs">
              <strong className="text-blue-800 dark:text-blue-300 block mb-1">🧩 Helyiértékes felbontás</strong>
              Fejben külön adjuk össze a százasokat, tízeseket és egyeseket: 240 + 135 = (200+100) + (40+30) + 5 = 375.
            </div>
            <div className="p-3 bg-blue-50/60 dark:bg-slate-850 rounded-xl border border-blue-100 dark:border-slate-700 text-xs">
              <strong className="text-blue-800 dark:text-blue-300 block mb-1">⚡ Kiegyenlítés</strong>
              Egyik taghoz hozzáadunk, a másikból levonunk: 398 + 245 = (398 + 2) + (245 - 2) = 400 + 243 = 643.
            </div>
          </div>
        </section>

        {/* SECTION 3: AZ ÍRÁSBELI ÖSSZEADÁS SZABÁLYAI */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>Az írásbeli összeadás aranyszabályai és lépései</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Nagyobb számok összeadásakor a fejszámolás nehézkessé válik, ezért <strong>írásbeli műveletet</strong> végzünk egymás alá írással.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block">1. Lépés: Helyiértékek</span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Pontos egymás alá írás</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A számokat jobbra igazítva írjuk fel: egyes az egyes alá, tízes a tízes alá, százas a százas alá.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block">2. Lépés: Haladási irány</span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Jobbról balra haladás</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mindig a legkisebb helyiértéknél (az <strong>egyeseknél</strong>) kezdjük az összeadást, és balra haladunk.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block">3. Lépés: Átlépés</span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Maradék továbbvitele</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Ha az oszlop összege 10 vagy annál több, az egyest leírjuk, a tízest átvisszük a következő oszlopba.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: ELŐZETES BECSLÉS ÉS ELLENŐRZÉS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              4.
            </div>
            <h2>Előzetes becslés és ellenőrzés</h2>
          </div>

          <div className="p-4 bg-emerald-50/70 dark:bg-slate-850 rounded-2xl border-2 border-emerald-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-black">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Miért fontos a becslés az összeadás előtt?</span>
            </div>
            <p>
              Az írásbeli összeadás elvégzése előtt <strong>kerekített értékekkel becslést (B)</strong> végzünk. Ha a pontos összeg (Ö) nagyon eltér a becsült értéktől, azonnal észrevesszük a hibát (pl. elcsúszott helyiérték vagy elfelejtett maradék).
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-slate-900 dark:text-white border border-emerald-200 dark:border-slate-700">
              Példa: 4 785 + 3 648 ➔ Becslés százasokra: 4 800 + 3 600 = <strong>8 400</strong> (Pontos érték: <strong>8 433</strong> ✓)
            </div>
          </div>
        </section>

        {/* SECTION 5: INTERAKTÍV ÍRÁSBELI ÖSSZEADÁS SZIMULÁTOR */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              5.
            </div>
            <h2>Interaktív Írásbeli Összeadás Szimulátor és Helyiértékes Rács</h2>
          </div>

          <Card className="border-2 border-blue-200 dark:border-blue-900 shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Input row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      1. Összeadandó:
                    </label>
                    <input
                      type="number"
                      value={num1}
                      onChange={(e) => {
                        setNum1(e.target.value);
                        setStepIndex(0);
                      }}
                      className="w-32 px-3 py-2 rounded-xl border-2 border-blue-300 dark:border-blue-700 font-mono text-lg font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 shadow-inner"
                      min="0"
                      max="999999"
                    />
                  </div>

                  <span className="text-2xl font-black text-blue-600 self-end mb-2">+</span>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      2. Összeadandó:
                    </label>
                    <input
                      type="number"
                      value={num2}
                      onChange={(e) => {
                        setNum2(e.target.value);
                        setStepIndex(0);
                      }}
                      className="w-32 px-3 py-2 rounded-xl border-2 border-blue-300 dark:border-blue-700 font-mono text-lg font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 shadow-inner"
                      min="0"
                      max="999999"
                    />
                  </div>
                </div>

                {/* Presets */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Gyors minták kipróbálása:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { a: '4785', b: '3648' },
                      { a: '528', b: '374' },
                      { a: '19450', b: '8790' },
                      { a: '98450', b: '12860' }
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setNum1(p.a);
                          setNum2(p.b);
                          setStepIndex(0);
                        }}
                        className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        {p.a} + {p.b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {calcData ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Math Grid / Notebook Column Format */}
                  <div className="md:col-span-6 bg-amber-50/40 dark:bg-slate-850 p-6 rounded-2xl border-2 border-amber-200/70 dark:border-slate-700 font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex flex-col items-center justify-center select-none shadow-inner">
                    <div className="w-fit text-right space-y-1">
                      {/* Carry row */}
                      <div className="text-xs text-rose-500 font-bold h-4 tracking-widest text-right pr-2">
                        {calcData.steps.map((st, i) => (
                          <span key={i} className="inline-block w-8 sm:w-10 text-center">
                            {i <= stepIndex && st.nextCarry > 0 ? `+${st.nextCarry}` : ''}
                          </span>
                        ))}
                      </div>

                      {/* Number 1 row */}
                      <div className="tracking-widest flex items-center justify-end">
                        <span className="w-8 sm:w-10 text-center inline-block"> </span>
                        {calcData.pad1.split('').map((char, i) => (
                          <span key={i} className="w-8 sm:w-10 text-center inline-block">
                            {char}
                          </span>
                        ))}
                      </div>

                      {/* Number 2 row */}
                      <div className="tracking-widest flex items-center justify-end border-b-4 border-slate-900 dark:border-white pb-1">
                        <span className="w-8 sm:w-10 text-center text-blue-600 inline-block">+</span>
                        {calcData.pad2.split('').map((char, i) => (
                          <span key={i} className="w-8 sm:w-10 text-center inline-block">
                            {char}
                          </span>
                        ))}
                      </div>

                      {/* Result row */}
                      <div className="tracking-widest flex items-center justify-end pt-1 text-emerald-600 dark:text-emerald-400">
                        <span className="w-8 sm:w-10 text-center inline-block"> </span>
                        {calcData.exactSum.toString().padStart(calcData.maxLen + (calcData.steps[calcData.steps.length - 1]?.colIndex === calcData.maxLen ? 1 : 0), ' ').split('').map((char, i) => (
                          <span key={i} className="w-8 sm:w-10 text-center inline-block">
                            {stepIndex >= calcData.steps.length - 1 ? char : i >= calcData.maxLen - stepIndex - 1 ? char : '_'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Step Explanation & Controls */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {stepIndex + 1}. Lépés / {calcData.totalSteps} (
                        {calcData.steps[stepIndex]?.placeName})
                      </span>

                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                          disabled={stepIndex === 0}
                          className="h-8 px-2.5 rounded-xl text-xs"
                        >
                          Előző
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setStepIndex((prev) => Math.min(calcData.totalSteps - 1, prev + 1))}
                          disabled={stepIndex === calcData.totalSteps - 1}
                          className="h-8 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Következő lépés
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-blue-600" />
                        <span>{calcData.steps[stepIndex]?.placeName} összeadása:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed font-bold">
                        {calcData.steps[stepIndex]?.explanation}
                      </p>
                    </div>

                    {/* Summary row */}
                    <div className="p-3 bg-blue-50/60 dark:bg-slate-850 rounded-xl border border-blue-200/60 dark:border-slate-700 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block">Előzetes becslés (százasra):</span>
                        <strong className="text-blue-700 dark:text-blue-300 font-mono text-sm">{calcData.estSum}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 dark:text-slate-400 block">Pontos összeg:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{calcData.exactSum}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-rose-500 text-xs font-bold">
                  Kérlek adj meg érvényes pozitív egész számokat!
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
