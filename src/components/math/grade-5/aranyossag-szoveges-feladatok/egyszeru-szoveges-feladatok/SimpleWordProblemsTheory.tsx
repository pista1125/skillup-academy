import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  FileText,
  BookOpen,
  PieChart,
  Calculator,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export interface SimpleWordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

interface TapeDiagramProblem {
  id: string;
  title: string;
  category: string;
  text: string;
  question: string;
  actor1: { name: string; parts: number; fixedAdd: number };
  actor2: { name: string; parts: number; fixedAdd: number };
  total: number;
  unitValue: number;
  actor1Result: number;
  actor2Result: number;
  explanation: string;
}

export const SimpleWordProblemsTheory: React.FC<SimpleWordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // 5-step interactive wizard state
  const [activeStep, setActiveStep] = useState(1);

  // Tape Diagram Visualizer State
  const tapeProblems: TapeDiagramProblem[] = [
    {
      id: 'tape-1',
      title: '1. Típus: Többszörös és összeg',
      category: 'Többszöröse (Arányos részek)',
      text: 'Anna és Peti együtt 48 gesztenyét gyűjtöttek. Peti 3-szor annyit gyűjtött, mint Anna.',
      question: 'Hány gesztenyéje van Annának és Petinek külön-külön?',
      actor1: { name: 'Anna', parts: 1, fixedAdd: 0 },
      actor2: { name: 'Peti', parts: 3, fixedAdd: 0 },
      total: 48,
      unitValue: 12, // 48 / 4 = 12
      actor1Result: 12,
      actor2Result: 36,
      explanation: 'Összesen 1 + 3 = 4 egyenlő részünk van. 4 rész = 48 gesztenye → 1 rész = 48 : 4 = 12 gesztenye. Anna = 12, Peti = 3 · 12 = 36 gesztenye.'
    },
    {
      id: 'tape-2',
      title: '2. Típus: Különbség és összeg (Több / Kevesebb)',
      category: 'Ennyivel több / kevesebb',
      text: 'Dóri és Máté összesen 54 matricát ragasztottak be. Dórinak 14-gyel több matricája van, mint Máténak.',
      question: 'Hány matricájuk van fejenként?',
      actor1: { name: 'Máté', parts: 1, fixedAdd: 0 },
      actor2: { name: 'Dóri', parts: 1, fixedAdd: 14 },
      total: 54,
      unitValue: 20, // (54 - 14) / 2 = 20
      actor1Result: 20,
      actor2Result: 34,
      explanation: 'Ha Dóri 14 többletét félretesszük (54 − 14 = 40), a megmaradt 40 matricán 2 egyenlő rész osztozik. 1 rész = 40 : 2 = 20. Így Máténak 20, Dórinak 20 + 14 = 34 matricája van.'
    },
    {
      id: 'tape-3',
      title: '3. Típus: Visszafelé gondolkodás',
      category: 'Zsebpénz költés',
      text: 'Gergő a zsebpénze felét elköltötte a vidámparkban, majd a maradékból vett egy 600 Ft-os kürtőskalácsot. Ezután pontosan 1400 Ft-ja maradt.',
      question: 'Mennyi zsebpénze volt eredetileg Gergőnek?',
      actor1: { name: 'Elköltött rész (Fele)', parts: 1, fixedAdd: 0 },
      actor2: { name: 'Maradék fele (600 Ft + 1400 Ft)', parts: 1, fixedAdd: 0 },
      total: 4000,
      unitValue: 2000,
      actor1Result: 2000,
      actor2Result: 2000,
      explanation: 'Visszafelé lépkedünk: a kalács előtt 1400 + 600 = 2000 Ft-ja volt. Mivel ez a pénzének pont a fele volt, az eredeti összeg 2000 · 2 = 4000 Ft volt.'
    }
  ];

  const [selectedTapeIdx, setSelectedTapeIdx] = useState(0);
  const activeTape = tapeProblems[selectedTapeIdx];

  return (
    <TheoryTemplate
      title="Egyszerű szöveges feladatok"
      subtitle="A szöveges feladatmegoldás 5 aranylépése, szakasos ábrázolás, egyenletalkotás és a valóságos ellenőrzés"
      themeColor="teal"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR"
      topicNumber="VI.9"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      practiceTitle="Készen állsz a szöveges feladatok próbájára?"
      practiceSubtitle="Gyakorold a szakasos ábrázolást, az adatok felírását és az egyenletalkotást 30 izgalmas kérdéssel!"
      practiceButtonText="Szöveges feladatok kvíz indítása"
      quickRule={{
        label: 'A Szöveges Feladatmegoldás Aranyszabálya',
        formula: 'Értelmezés → Vázlat/Szakaszos ábra → Egyenlet és számolás → Szöveges ellenőrzés → Kerek mondatos válasz!'
      }}
    >
      {/* 1. SZEKCIÓ: AZ 5 ARANYLÉPÉS */}
      <TheorySection
        id="ot-aranylepes"
        number={1}
        title="A feladatmegoldás 5 aranyszabálya"
        icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="STRATÉGIA"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A szöveges feladatok nem nehezebbek a sima műveleteknél: egyszerűen <strong>lefordítjuk a mindennapi élet problémáit a matematika nyelvére</strong>.
          Kövesd az 5 lépéses folyamatot!
        </p>

        {/* Lépés választó fülek */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {[
            { num: 1, title: 'Értelmezés', icon: BookOpen },
            { num: 2, title: 'Terv & Modell', icon: PieChart },
            { num: 3, title: 'Számolás', icon: Calculator },
            { num: 4, title: 'Ellenőrzés', icon: CheckCircle2 },
            { num: 5, title: 'Válasz', icon: MessageSquare }
          ].map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                  isActive
                    ? 'border-teal-500 bg-teal-500 text-white shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`} />
                <span className="text-xs font-bold">{step.num}. {step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Kiválasztott lépés részletei */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          {activeStep === 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <BookOpen className="w-5 h-5" />
                <span>1. Lépés: Szövegértés és adatgyűjtés</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Olvasd el a feladatot legalább kétszer! Ne kapkodj a számok összeadogatásával.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40">
                  <strong className="text-teal-800 dark:text-teal-300 block mb-1">Mit tudunk? (Ismert adatok)</strong>
                  Írd ki vázlatosan a számokat mértékegységekkel együtt! (Pl. Összes gesztenye = 48 db).
                </div>
                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40">
                  <strong className="text-teal-800 dark:text-teal-300 block mb-1">Mit keresünk? (A kérdés)</strong>
                  Húzd alá a kérdő mondatot! Nevezd el az ismeretlent betűvel: legyen Annáé x.
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <PieChart className="w-5 h-5" />
                <span>2. Lépés: Tervkészítés és szakasos ábrázolás</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Rajzolj vázlatot vagy szakasos ábrát! Egy szakasz vagy téglalap jelentse az 1 egységnyi ismeretlent.
              </p>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                <strong>Példa:</strong> Ha Petinek 3-szor annyi van, mint Annának:
                <div className="flex items-center gap-3 mt-2 font-mono">
                  <span className="w-16 font-sans text-xs font-semibold">Anna:</span>
                  <div className="w-12 h-6 bg-teal-500 rounded text-white flex items-center justify-center text-xs font-bold">1 r.</div>
                </div>
                <div className="flex items-center gap-3 mt-1.5 font-mono">
                  <span className="w-16 font-sans text-xs font-semibold">Peti:</span>
                  <div className="flex gap-1">
                    <div className="w-12 h-6 bg-teal-600 rounded text-white flex items-center justify-center text-xs font-bold">1 r.</div>
                    <div className="w-12 h-6 bg-teal-600 rounded text-white flex items-center justify-center text-xs font-bold">1 r.</div>
                    <div className="w-12 h-6 bg-teal-600 rounded text-white flex items-center justify-center text-xs font-bold">1 r.</div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
                  Egyenlet: x + 3 · x = 48 → 4 · x = 48.
                </span>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <Calculator className="w-5 h-5" />
                <span>3. Lépés: A számolás elvégzése</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Oldd meg a felírt nyitott mondatot vagy számold ki az 1 egységre eső értéket!
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs sm:text-sm font-mono space-y-1">
                <div>1. Összes rész: 1 + 3 = 4 rész</div>
                <div>2. Egy rész értéke: 48 : 4 = 12 (Ez Anna része)</div>
                <div>3. Peti része: 3 · 12 = 36</div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>4. Lépés: Szöveges ellenőrzés a valóságban</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Vigyázat!</strong> Ne csak az egyenletbe helyettesíts vissza, mert ha az egyenlet felírása volt hibás, a számolás stimmel, a válasz mégis rossz!
              </p>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <div>• <strong>Valóban Petinek 3-szor annyi van?</strong> 36 : 12 = 3 → IGAZ.</div>
                <div>• <strong>Valóban 48 van nekik együtt?</strong> 12 + 36 = 48 → IGAZ.</div>
                <div>• <strong>Életszerű az eredmény?</strong> Pozitív egész gesztenyéket kaptunk → RENDBEN.</div>
              </div>
            </div>
          )}

          {activeStep === 5 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <MessageSquare className="w-5 h-5" />
                <span>5. Lépés: Kerek szöveges válasz</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A kérdésre egész, kerek magyar mondattal válaszolunk, kiírva a megfelelő mértékegységet.
              </p>
              <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-teal-950 dark:text-teal-200 font-medium text-sm">
                💬 <strong>Válasz:</strong> Annának 12 gesztenyéje, Petinek pedig 36 gesztenyéje van.
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Előző lépés
            </Button>
            <span className="text-xs text-slate-500 font-semibold">{activeStep} / 5 lépés</span>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              disabled={activeStep === 5}
              onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
            >
              Következő lépés <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: SZAKASZOS ÁBRA LABORATÓRIUM */}
      <TheorySection
        id="szakasos-abra"
        number={2}
        title="Szakaszos ábra laboratórium (Sávmodell)"
        icon={<PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="VIZUÁLIS MODELL"
        badgeColor="teal"
      >
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap gap-2">
            {tapeProblems.map((prob, idx) => (
              <button
                key={prob.id}
                onClick={() => setSelectedTapeIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedTapeIdx === idx
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {prob.title}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40 space-y-2">
            <span className="text-xs uppercase font-bold text-teal-700 dark:text-teal-300 tracking-wider">
              {activeTape.category}
            </span>
            <p className="text-base text-slate-900 dark:text-white font-medium">
              {activeTape.text}
            </p>
            <p className="text-sm text-teal-800 dark:text-teal-300 font-semibold italic">
              ❓ Kérdés: {activeTape.question}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-6 shadow-inner">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Szakaszos Ábrázolás Modell:
            </span>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-teal-300">{activeTape.actor1.name}:</span>
                <span className="font-mono text-slate-400">
                  {activeTape.actor1.parts} egység = <strong>{activeTape.actor1Result}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: activeTape.actor1.parts }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 max-w-[140px] rounded-lg bg-teal-500/80 border border-teal-400 text-white flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    {activeTape.unitValue}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-emerald-300">{activeTape.actor2.name}:</span>
                <span className="font-mono text-slate-400">
                  {activeTape.actor2.parts} egység {activeTape.actor2.fixedAdd > 0 ? `+ ${activeTape.actor2.fixedAdd}` : ''} = <strong>{activeTape.actor2Result}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {Array.from({ length: activeTape.actor2.parts }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 max-w-[140px] rounded-lg bg-emerald-500/80 border border-emerald-400 text-white flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    {activeTape.unitValue}
                  </div>
                ))}
                {activeTape.actor2.fixedAdd > 0 && (
                  <div className="h-10 px-4 rounded-lg bg-amber-500/80 border border-amber-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    + {activeTape.actor2.fixedAdd}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">Összesen:</span>
              <span className="text-xl font-bold font-mono text-teal-400">
                {activeTape.total}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm leading-relaxed space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>A megoldás logikai menete:</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
              {activeTape.explanation}
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: GYAKORI CSAPDÁK */}
      <TheorySection
        id="csapdak"
        number={3}
        title="Gyakori csapdák a szöveges feladatoknál"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badge="FIGYELMEZTETÉS"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: „3-szor annyi” vs. „3-mal több”"
            trap="Sokan összekeverik a szorzást és az összeadást a szövegben. A „3-szor több” kifejezésre összeadást végeznek."
            correct="A „-szor/-szer” mindig szorzást jelent (3 · x). A „-val/-vel több” jelent összeadást (x + 3)!"
          />

          <TheoryTrapBox
            title="2. Csapda: Félbemaradt feladatmegoldás"
            trap="Kiszámoljuk az x = 12 értéket, és rögtön azt írjuk be válaszként, miközben nem ezt kérdezték."
            correct="Mindig olvasd el újra a feladat kérdését! Lehet, hogy Peti gesztenyéit kérdezték (36 db), vagy kettejük különbségét (24 db)!"
          />
        </div>

        <div className="mt-4">
          <TheoryCallout
            type="tip"
            title="Tipp az ellenőrzéshez"
          >
            Mindig kérdezd meg magadtól: életszerű az eredmény? Lehet-e egy embernek negatív számú matricája, vagy egy buszon 14,5 utas? Ha nem egész szám jön ki emberekre vagy darabokra, azonnal nézd át a számolást!
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
export default SimpleWordProblemsTheory;
