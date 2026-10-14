import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Equal,
  Minus,
  Plus,
  Divide,
  RotateCcw
} from 'lucide-react';

interface OpenSentencesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const OpenSentencesTheory: React.FC<OpenSentencesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Mérleg szimulátor állapot (ax + b = c)
  const [aCoeff, setACoeff] = useState<number>(2);
  const [bConst, setBConst] = useState<number>(6);
  const [cResult, setCResult] = useState<number>(20);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Számított értékek
  const step1Result = cResult - bConst;
  const xSolution = (cResult - bConst) / aCoeff;
  const isIntegerSolution = Number.isInteger(xSolution);

  const resetSimulator = () => {
    setCurrentStep(0);
  };

  const sections: TheorySection[] = [
    {
      id: 'nyitott-mondat-alapok',
      title: 'A nyitott mondat és az egyenlet fogalma',
      badge: 'Alapfogalmak',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A mindennapi nyelvben egy állításról egyértelműen el tudjuk dönteni, hogy igaz vagy hamis. 
            A matematikában azonban gyakran találkozunk olyan kifejezésekkel, amelyekben egy vagy több 
            <strong> ismeretlen változó</strong> (betű, pl. $x, y, a, \Box$) szerepel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/40 dark:bg-violet-950/20 space-y-2">
              <span className="font-bold text-violet-800 dark:text-violet-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <HelpCircle className="w-4 h-4 text-violet-600" /> Nyitott mondat
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Olyan állítás, amelynek az igazságtartalma attól függ, hogy mit helyettesítünk az ismeretlen helyére. 
                Például: $x + 4 = 10$. Ha $x = 6$, akkor <strong>igaz</strong>; ha $x = 3$, akkor <strong>hamis</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
              <span className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Equal className="w-4 h-4 text-indigo-600" /> Egyenlet és egyenlőtlenség
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha két kifejezést <strong>egyenlőségjel ($=$)</strong> köt össze, akkor <em>egyenletről</em> beszélünk. 
                Ha <strong>relációs jel (${'<, >, \\le, \\ge'})</strong> kapcsolja össze őket, akkor <em>egyenlőtlenségről</em>.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'merlegelw-szabaly',
      title: 'A kétkarú mérleg modellje és a mérlegelv',
      badge: 'Fő megoldási módszer',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Képzelj el egy tökéletesen egyensúlyban lévő kétkarú mérleget! Az egyensúly csak akkor marad fenn, 
            ha mindkét serpenyővel pontosan ugyanazt a változtatást végezzük el.
          </p>

          <div className="p-4 sm:p-5 rounded-2xl border-2 border-violet-300 dark:border-violet-800 bg-gradient-to-r from-violet-50 via-indigo-50/50 to-violet-50 dark:from-violet-950/40 dark:via-slate-900 dark:to-violet-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300 border border-violet-200 dark:border-violet-700">
              <Scale className="w-3 h-3 text-violet-600" /> A mérlegelv 2 alaptörvénye
            </span>
            <div className="text-base sm:text-lg font-mono font-bold text-violet-950 dark:text-violet-100">
              1. Mindkét oldalhoz ugyanazt a számot adjuk hozzá, vagy vonjuk ki.<br />
              2. Mindkét oldalt ugyanazzal a 0-tól különböző számmal szorozzuk, vagy osztjuk.
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              A célunk mindig az, hogy az ismeretlen ($x$) teljesen egyedül maradjon az egyik oldalon.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'lebontogatas-menete',
      title: 'A lebontogatás lépései és az ellenőrzés',
      badge: 'Lépésről lépésre',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A lebontogatás során a műveleti sorrendet fordítva „göngyölítjük fel”. Először a hozzáadott vagy 
            kivont tagokat tüntetjük el, majd az ismeretlen szorzóját.
          </p>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-3">
            <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wide">
              Mintapélda: Oldjuk meg a $3x + 5 = 26$ egyenletet!
            </span>
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span>$3x + 5 = 26$</span>
                <span className="text-violet-600 font-bold">/ - 5 (kivonunk 5-öt mindkét oldalból)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span>$3x = 21$</span>
                <span className="text-violet-600 font-bold">/ : 3 (elosztjuk mindkét oldalt 3-mal)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-violet-900 dark:text-violet-200 font-bold">
                <span>$x = 7$</span>
                <span className="text-emerald-600">Megoldás megtalálva!</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Kötelező ellenőrzés:
              </span>
              <p>
                Behelyettesítünk az <strong>eredeti bal oldalba</strong>: $3 \cdot 7 + 5 = 21 + 5 = 26$.<br />
                A jobb oldal értéke szintén $26$. Mivel Bal oldal = Jobb oldal, a megoldásunk helyes!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'szovegesbol-algebra',
      title: 'Szöveges feltételek átírása egyenletté',
      badge: 'Matematikai fordítás',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A szöveges feladatok megoldásának kulcsa, hogy a leírt kapcsolatokat pontos algebrai 
            kifejezéssé tudjuk formálni:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="font-sans text-slate-600 dark:text-slate-400">Egy szám 4-szeresénél 3-mal több:</span>
              <span className="font-bold text-violet-600">$4x + 3$</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="font-sans text-slate-600 dark:text-slate-400">Egy szám harmadánál 2-vel kevesebb:</span>
              <span className="font-bold text-violet-600">x / 3 − 2</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="font-sans text-slate-600 dark:text-slate-400">Két egymást követő egész szám:</span>
              <span className="font-bold text-violet-600">$x$ és $x + 1$</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="font-sans text-slate-600 dark:text-slate-400">Egy szám és 5 összegének kétszerese:</span>
              <span className="font-bold text-violet-600">$2 \cdot (x + 5)$</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Nyitott mondatok és egyenletek"
      subtitle="A mérlegelv, az ismeretlen fogalma, lebontogatás és ellenőrzés lépésről lépésre"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="violet"
      pdfFilename="6_osztaly_IV_nyitott_mondatok_tananyag.pdf"
      quickRule={{
        label: 'A mérlegelv aranyszabálya',
        formula: 'Amit az egyenlet bal oldalával teszel, pontosan ugyanazt tedd a jobb oldallal is!'
      }}
      practiceTitle="Készen állsz az egyenletek megoldására?"
      practiceSubtitle="Gyakorold a lebontogatást, a mérlegelvet és a szöveges átírásokat 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Kétkarú Mérleg és Egyenletmegoldó Szimulátor */}
      <Card className="p-4 sm:p-5 border-violet-200 dark:border-violet-900/50 bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/30 dark:from-slate-900 dark:to-violet-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-violet-200/60 dark:border-violet-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-violet-600 text-white shadow-xs">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Kétkarú Mérleg Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Oldd meg az egyenletet lépésről lépésre a mérlegelv segítségével!
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetSimulator}
              className="text-xs border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-300"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újraindítás
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Vizualizációs mérleg panel */}
            <div className="md:col-span-7 flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner">
              <div className="text-center font-mono font-bold text-base text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
                <span>{aCoeff}x + {bConst} = {cResult}</span>
              </div>

              {/* Vizuális kétkarú mérleg illusztráció */}
              <div className="py-6 px-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative">
                {/* Mérleg vízszintes rúdja */}
                <div className="w-48 sm:w-64 h-2 bg-slate-400 dark:bg-slate-600 rounded-full relative flex justify-between items-center">
                  {/* Bal serpenyő lógása */}
                  <div className="absolute left-2 -bottom-10 flex flex-col items-center">
                    <div className="w-0.5 h-10 bg-slate-400"></div>
                    <div className="px-3 py-2 rounded-xl bg-violet-100 dark:bg-violet-950/80 border-2 border-violet-400 dark:border-violet-600 shadow-sm text-center">
                      <span className="text-[10px] text-violet-700 dark:text-violet-300 font-bold block">Bal oldal</span>
                      <span className="font-mono text-xs font-black text-violet-900 dark:text-violet-100">
                        {currentStep === 0 && `${aCoeff}x + ${bConst}`}
                        {currentStep === 1 && `${aCoeff}x`}
                        {currentStep === 2 && `x`}
                      </span>
                    </div>
                  </div>

                  {/* Középső támasztópont */}
                  <div className="w-4 h-4 rounded-full bg-violet-600 border-2 border-white dark:border-slate-900 absolute left-1/2 -translate-x-1/2 -top-1"></div>

                  {/* Jobb serpenyő lógása */}
                  <div className="absolute right-2 -bottom-10 flex flex-col items-center">
                    <div className="w-0.5 h-10 bg-slate-400"></div>
                    <div className="px-3 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border-2 border-indigo-400 dark:border-indigo-600 shadow-sm text-center">
                      <span className="text-[10px] text-indigo-700 dark:text-indigo-300 font-bold block">Jobb oldal</span>
                      <span className="font-mono text-xs font-black text-indigo-900 dark:text-indigo-100">
                        {currentStep === 0 && `${cResult}`}
                        {currentStep === 1 && `${step1Result}`}
                        {currentStep === 2 && `${xSolution}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mérleg állványa */}
                <div className="w-2 h-14 bg-slate-400 dark:bg-slate-600 mt-2"></div>
                <div className="w-20 h-2 bg-slate-500 rounded-full"></div>
              </div>

              {/* Lépések levezetése */}
              <div className="space-y-1.5 pt-2 text-xs font-mono">
                <div className={`p-2 rounded-lg border transition-all ${currentStep === 0 ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-300 text-violet-950 font-bold' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-500'}`}>
                  0. Kiinduló egyenlet: {aCoeff}x + {bConst} = {cResult}
                </div>
                {currentStep >= 1 && (
                  <div className={`p-2 rounded-lg border transition-all ${currentStep === 1 ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-300 text-violet-950 font-bold' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-500'}`}>
                    1. Mindkét oldalból kivonunk {bConst}-t: {aCoeff}x = {step1Result}
                  </div>
                )}
                {currentStep >= 2 && (
                  <div className="p-2.5 rounded-lg border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-950 dark:text-emerald-200 font-bold flex items-center justify-between">
                    <span>2. Mindkét oldalt elosztjuk {aCoeff}-vel: x = {xSolution}</span>
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-4 h-4" /> Kész!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Vezérlő és lépésterelő panel */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">
                  Végezd el a mérlegműveleteket:
                </span>

                {currentStep === 0 && (
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-2 h-auto"
                  >
                    <Minus className="w-4 h-4 mr-1.5" /> Mindkét oldalból vonjunk ki {bConst}-t
                  </Button>
                )}

                {currentStep === 1 && (
                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 h-auto"
                  >
                    <Divide className="w-4 h-4 mr-1.5" /> Mindkét oldalt osszuk el {aCoeff}-vel
                  </Button>
                )}

                {currentStep === 2 && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                      Ellenőrzés behelyettesítéssel:
                    </span>
                    <p className="font-mono text-slate-700 dark:text-slate-300">
                      {aCoeff} · {xSolution} + {bConst} = {aCoeff * xSolution} + {bConst} = {cResult}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      A két oldal értéke megegyezik ({cResult} = {cResult})!
                    </p>
                  </div>
                )}
              </div>

              {/* Egyenlet paraméterek gyorsváltója */}
              <div className="p-3.5 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900/60 space-y-2 text-xs">
                <span className="font-bold text-violet-900 dark:text-violet-200 block uppercase tracking-wide">
                  Próbálj ki más egyenleteket is:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setACoeff(3);
                      setBConst(5);
                      setCResult(26);
                      setCurrentStep(0);
                    }}
                    className="text-xs h-8 border-violet-200 font-mono"
                  >
                    3x + 5 = 26
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setACoeff(4);
                      setBConst(8);
                      setCResult(32);
                      setCurrentStep(0);
                    }}
                    className="text-xs h-8 border-violet-200 font-mono"
                  >
                    4x + 8 = 32
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setACoeff(2);
                      setBConst(10);
                      setCResult(30);
                      setCurrentStep(0);
                    }}
                    className="text-xs h-8 border-violet-200 font-mono"
                  >
                    2x + 10 = 30
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setACoeff(5);
                      setBConst(15);
                      setCResult(40);
                      setCurrentStep(0);
                    }}
                    className="text-xs h-8 border-violet-200 font-mono"
                  >
                    5x + 15 = 40
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default OpenSentencesTheory;
