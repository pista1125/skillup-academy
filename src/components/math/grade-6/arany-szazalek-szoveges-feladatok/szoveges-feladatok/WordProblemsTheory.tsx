import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Calculator,
  UserCheck,
  CheckCheck,
  RotateCcw
} from 'lucide-react';

interface WordProblemsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const WordProblemsTheory: React.FC<WordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Szöveges feladat szimulátor lépés és minta állapota
  const [selectedSample, setSelectedSample] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const samples = [
    {
      title: '1. Életkoros feladat',
      problem: 'Egy anya most 36 éves, a lánya pedig 12 éves. Hány év múlva lesz az anya pontosan kétszer annyi idős, mint a lánya?',
      step1: 'Adatok kigyűjtése: Anya most = 36 év, lánya most = 12 év. Legyen x év múlva az állapot! Ekkor anya = 36 + x, lánya = 12 + x.',
      step2: 'Modell (egyenlet): Anya kora = 2 · lánya kora ⟹ 36 + x = 2 · (12 + x)',
      step3: 'Megoldás: 36 + x = 24 + 2x ⟹ 36 - 24 = 2x - x ⟹ x = 12 év',
      step4: 'Szöveges ellenőrzés: 12 év múlva az anya 36 + 12 = 48 éves lesz. A lánya 12 + 12 = 24 éves lesz. Valóban: 48 = 2 · 24!',
      step5: 'Válasz: Az anya 12 év múlva lesz pontosan kétszer annyi idős, mint a lánya.'
    },
    {
      title: '2. Téglalap kerülete feladat',
      problem: 'Egy téglalap kerülete 48 cm. A hossza 6 cm-rel hosszabb a szélességénél. Mekkorák az oldalai?',
      step1: 'Adatok kigyűjtése: Szélesség = b (vagy x). Hosszúság = x + 6. Kerület (K) = 48 cm.',
      step2: 'Modell (egyenlet): K = 2 · (a + b) ⟹ 2 · (x + x + 6) = 48 ⟹ 2 · (2x + 6) = 48 ⟹ 4x + 12 = 48',
      step3: 'Megoldás: 4x = 48 - 12 = 36 ⟹ x = 36 : 4 = 9 cm (szélesség), hosszúság = 9 + 6 = 15 cm.',
      step4: 'Szöveges ellenőrzés: Két oldal összege: 9 + 15 = 24 cm. Kerület = 2 · 24 = 48 cm. A hossz (15) valóban 6-tal több a szélességnél (9).',
      step5: 'Válasz: A téglalap szélessége 9 cm, hosszúsága pedig 15 cm.'
    },
    {
      title: '3. Zsebpénz és vásárlás',
      problem: 'Péter elköltötte a zsebpénze harmadát könyvre, a negyedét fagyira, és még 1000 Ft-ja maradt. Mennyi zsebpénze volt eredetileg?',
      step1: 'Adatok kigyűjtése: Legyen az eredeti zsebpénz = x Ft. Könyv = x/3, fagyi = x/4, maradék = 1000 Ft.',
      step2: 'Modell (egyenlet): x/3 + x/4 + 1000 = x (vagyis a részek összege kiadja az egészet).',
      step3: 'Megoldás: Szorzunk 12-vel: 4x + 3x + 12000 = 12x ⟹ 7x + 12000 = 12x ⟹ 5x = 12000 ⟹ x = 2400 Ft.',
      step4: 'Szöveges ellenőrzés: 2400 Ft harmada 800 Ft (könyv). Negyede 600 Ft (fagyi). 800 + 600 + 1000 = 2400 Ft. Stimmel!',
      step5: 'Válasz: Péternek eredetileg 2400 Ft zsebpénze volt.'
    }
  ];

  const currentSampleData = samples[selectedSample];

  const sections: TheorySection[] = [
    {
      id: 'ot-lepes-modszere',
      title: 'A szöveges feladatok megoldásának 5 aranyszabálya',
      badge: 'Biztos stratégia',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Sokan tartanak a szöveges feladatoktól, pedig ha következetesen követed az alábbi 
            <strong> 5 lépéses módszert</strong>, bármilyen nehéznek tűnő feladványt sikeresen megoldhatsz:
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/40 dark:bg-teal-950/20 flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div>
                <strong className="text-teal-900 dark:text-teal-200 block text-sm">A feladat értelmezése és adatok kigyűjtése</strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Olvasd el a feladatot legalább kétszer! Írd ki a pontos adatokat és válassz ismeretlent: jelöld betűvel (általában $x$) azt a mennyiséget, amit a legkönnyebben kifejezhetsz.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/40 dark:bg-sky-950/20 flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div>
                <strong className="text-sky-900 dark:text-sky-200 block text-sm">Összefüggések felírása (Modellalkotás)</strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Fordítsd le a szöveg mondatait algebrai kifejezésekké és írj fel egyenletet! Keresd meg, mely két mennyiség egyenlő egymással.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div>
                <strong className="text-indigo-900 dark:text-indigo-200 block text-sm">A matematikai modell megoldása</strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Oldd meg a felírt egyenletet a mérlegelv segítségével (bontsd fel a zárójeleket, vonj össze egynemű tagokat, majd fejezd ki $x$-et).
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </span>
              <div>
                <strong className="text-emerald-900 dark:text-emerald-200 block text-sm">Ellenőrzés az eredeti szöveg alapján</strong>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>FONTOS SZABÁLY:</strong> Soha ne csak a felírt egyenletbe helyettesíts vissza! Ha az egyenletet rosszul írtad fel, a hibás egyenletbe való behelyettesítés nem deríti ki a tévedést. Mindig az eredeti magyar szöveg minden feltételét vizsgáld meg!
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                5
              </span>
              <div>
                <strong className="text-amber-900 dark:text-amber-200 block text-sm">Szöveges válasz megfogalmazása</strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Válaszolj a feladat kérdésére kerek, értelmes mondatban, pontos mértékegységgel ellátva (pl. Ft, cm, év, kg).
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tipikus-feladattipusok',
      title: 'Gyakori szöveges feladattípusok 6. osztályban',
      badge: 'Feladattípusok',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5 uppercase text-[11px]">
              <HelpCircle className="w-4 h-4" /> 1. Számkeresős feladatok
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Két vagy több ismeretlen szám közötti kapcsolat (pl. „egyik 8-cal nagyobb a másiknál”, „háromszorosa”, „összegük 60”).
              <br /><strong className="text-slate-800 dark:text-slate-200">Kulcs:</strong> $x$ és $x + 8$, összegük $x + (x + 8) = 60$.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5 uppercase text-[11px]">
              <UserCheck className="w-4 h-4" /> 2. Életkoros feladványok
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Életkorok jelenben és évek múlva vagy ezelőtt.
              <br /><strong className="text-slate-800 dark:text-slate-200">Kulcs:</strong> Ha $x$ év telik el, <em>mindenki</em> pontosan $x$ évvel lesz idősebb! Készíts kis táblázatot!
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase text-[11px]">
              <Calculator className="w-4 h-4" /> 3. Geometriai szöveges feladatok
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Téglalap vagy háromszög kerülete, oldalarányok.
              <br /><strong className="text-slate-800 dark:text-slate-200">Kulcs:</strong> Kerületképletek felírása ismeretlennel: $K = 2(a + b)$, egyenlő szárú háromszög: $K = 2a + b$.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 uppercase text-[11px]">
              <CheckCheck className="w-4 h-4" /> 4. Zsebpénz és elosztás
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Törtrészek és maradékok összegzése (pl. harmada + negyede + 500 Ft = teljes összeg).
              <br /><strong className="text-slate-800 dark:text-slate-200">Kulcs:</strong> Közös nevezővel beszorzás a törtek eltüntetéséhez.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Szöveges feladatok megoldása"
      subtitle="Az 5 aranyszabály: szövegértés, modellalkotás, egyenletmegoldás, szöveges ellenőrzés és válaszadás"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="teal"
      pdfFilename="6_osztaly_IV_szoveges_feladatok_tananyag.pdf"
      quickRule={{
        label: 'Az 5 aranylépés',
        formula: '1. Értelmezés ➔ 2. Modell (egyenlet) ➔ 3. Megoldás ➔ 4. Szöveges ellenőrzés ➔ 5. Válasz'
      }}
      practiceTitle="Készen állsz a szöveges feladatok megoldására?"
      practiceSubtitle="Gyakorold az 5 lépés alkalmazását életkoros, geometriai és zsebpénzes feladatokon 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Szöveges Feladat Megoldó Labor */}
      <Card className="p-4 sm:p-5 border-teal-200 dark:border-teal-900/50 bg-gradient-to-br from-teal-50/50 via-white to-sky-50/30 dark:from-slate-900 dark:to-teal-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-200/60 dark:border-teal-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-teal-600 text-white shadow-xs">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Szöveges Feladat Vezető Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Lépj végig a feladatmegoldás 5 aranyszabályán interaktívan!
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveStep(0)}
              className="text-xs border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-300"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Vissza az elejére
            </Button>
          </div>

          {/* Mintafeladat választó fülek */}
          <div className="flex flex-wrap gap-2">
            {samples.map((sample, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={selectedSample === idx ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedSample(idx);
                  setActiveStep(0);
                }}
                className={`text-xs ${selectedSample === idx ? 'bg-teal-600 hover:bg-teal-700 text-white font-bold' : 'border-teal-200 text-teal-800 dark:border-slate-800 dark:text-slate-300'}`}
              >
                {sample.title}
              </Button>
            ))}
          </div>

          {/* Feladat szövege */}
          <div className="p-3.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
            <span className="text-[11px] font-bold uppercase text-teal-800 dark:text-teal-300 block mb-1">
              Feladat szövege:
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 italic">
              „{currentSampleData.problem}”
            </p>
          </div>

          {/* 5 lépéses folyamatsáv */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {['1. Adatok', '2. Modell', '3. Megoldás', '4. Ellenőrzés', '5. Válasz'].map((stepLabel, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-2 rounded-lg text-center text-xs font-bold transition-all border ${
                  activeStep === idx
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm ring-2 ring-teal-300 dark:ring-teal-700'
                    : idx < activeStep
                    ? 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
                    : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}
              >
                {stepLabel}
              </button>
            ))}
          </div>

          {/* Aktuális lépés részletező kártya */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                {activeStep === 0 && '1. Lépés: Adatok kigyűjtése és az ismeretlen kijelölése'}
                {activeStep === 1 && '2. Lépés: Matematikai modell (egyenlet) felállítása'}
                {activeStep === 2 && '3. Lépés: Az egyenlet levezetése és megoldása'}
                {activeStep === 3 && '4. Lépés: Szöveg szerinti ellenőrzés a valósággal'}
                {activeStep === 4 && '5. Lépés: Szöveges válaszadás mértékegységgel'}
              </span>
              <span className="text-xs text-slate-500 font-mono">Lépés: {activeStep + 1} / 5</span>
            </div>

            <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-mono bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              {activeStep === 0 && currentSampleData.step1}
              {activeStep === 1 && currentSampleData.step2}
              {activeStep === 2 && currentSampleData.step3}
              {activeStep === 3 && currentSampleData.step4}
              {activeStep === 4 && currentSampleData.step5}
            </p>

            <div className="flex justify-between items-center pt-1">
              <Button
                variant="outline"
                size="sm"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="text-xs"
              >
                Előző lépés
              </Button>

              <Button
                size="sm"
                disabled={activeStep === 4}
                onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
                className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold"
              >
                Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default WordProblemsTheory;
