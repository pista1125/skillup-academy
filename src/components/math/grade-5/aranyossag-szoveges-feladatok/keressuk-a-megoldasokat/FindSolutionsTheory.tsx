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
  Search,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  Equal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathText } from '@/components/math/shared/MathText';

export interface FindSolutionsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

interface PeelingStep {
  description: string;
  expression: string;
  rightSide: string;
  action: string;
}

interface PeelingExample {
  id: string;
  title: string;
  equation: string;
  story: string;
  steps: PeelingStep[];
  solution: string;
  checkText: string;
}

export const FindSolutionsTheory: React.FC<FindSolutionsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // Peeling simulator states
  const peelingExamples: PeelingExample[] = [
    {
      id: 'ex-1',
      title: '1. Példa: Szorzás és összeadás lebontása',
      equation: '3 · x + 15 = 45',
      story: '„Gondoltam egy számot (x), megszoroztam 3-mal, majd hozzáadtam 15-öt. Az eredmény 45 lett.”',
      steps: [
        {
          description: 'Kiinduló állapot: az utolsó művelet a + 15 volt.',
          expression: '3 · x + 15',
          rightSide: '45',
          action: 'Kezdés'
        },
        {
          description: '1. Lépés: Utoljára hozzáadtunk 15-öt → mindkét oldalból kivonunk 15-öt!',
          expression: '3 · x',
          rightSide: '45 − 15 = 30',
          action: '− 15 mindkét oldalból'
        },
        {
          description: '2. Lépés: Először szoroztunk 3-mal → mindkét oldalt elosztjuk 3-mal!',
          expression: 'x',
          rightSide: '30 : 3 = 10',
          action: ': 3 mindkét oldalra'
        }
      ],
      solution: 'x = 10',
      checkText: 'Bal oldal: 3 · 10 + 15 = 30 + 15 = 45. Jobb oldal: 45. Egyenlőek, a megoldás helyes!'
    },
    {
      id: 'ex-2',
      title: '2. Példa: Zárójeles kifejezés és osztás',
      equation: '(y − 8) : 4 = 6',
      story: '„Gondoltam egy számot (y), kivontam belőle 8-at, majd a különbséget elosztottam 4-gyel. 6-ot kaptam.”',
      steps: [
        {
          description: 'Kiinduló állapot: a zárójel volt az első, utána osztottunk 4-gyel.',
          expression: '(y − 8) : 4',
          rightSide: '6',
          action: 'Kezdés'
        },
        {
          description: '1. Lépés: Utoljára osztottunk 4-gyel → megszorozzuk mindkét oldalt 4-gyel!',
          expression: 'y − 8',
          rightSide: '6 · 4 = 24',
          action: '· 4 mindkét oldalra'
        },
        {
          description: '2. Lépés: Kivontunk 8-at → hozzáadunk 8-at mindkét oldalhoz!',
          expression: 'y',
          rightSide: '24 + 8 = 32',
          action: '+ 8 mindkét oldalhoz'
        }
      ],
      solution: 'y = 32',
      checkText: 'Bal oldal: (32 − 8) : 4 = 24 : 4 = 6. Jobb oldal: 6. Egyenlőek, tökéletes!'
    },
    {
      id: 'ex-3',
      title: '3. Példa: Trükkös eset – Kivonandó keresése',
      equation: '50 − 4 · a = 18',
      story: '„50-ből elvettem egy ismeretlen szám (a) 4-szeresét, és 18 maradt.”',
      steps: [
        {
          description: 'Vigyázat! A kivonandó a (4 · a). Kisebbítendő − Kivonandó = Különbség.',
          expression: '50 − 4 · a',
          rightSide: '18',
          action: 'Kezdés'
        },
        {
          description: '1. Lépés: Mennyit vontunk ki az 50-ből, hogy 18 maradjon? 50 − 18 = 32!',
          expression: '4 · a',
          rightSide: '50 − 18 = 32',
          action: 'Kivonandó = 50 − 18'
        },
        {
          description: '2. Lépés: 4 · a = 32. Szorzótényezőt osztással kapunk: 32 : 4 = 8.',
          expression: 'a',
          rightSide: '32 : 4 = 8',
          action: ': 4 mindkét oldalra'
        }
      ],
      solution: 'a = 8',
      checkText: 'Bal oldal: 50 − 4 · 8 = 50 − 32 = 18. Jobb oldal: 18. Helyes!'
    }
  ];

  const [activeExIndex, setActiveExIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const activeEx = peelingExamples[activeExIndex];

  const handleSelectExample = (idx: number) => {
    setActiveExIndex(idx);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    const nextIdx = Math.min(activeEx.steps.length - 1, currentStepIndex + 1);
    setCurrentStepIndex(nextIdx);
    if (nextIdx === activeEx.steps.length - 1) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    }
  };

  // Trial & Error Interactive Table State
  const trialEquation = '3 · x + 4 = 25';
  const trialDomain = [5, 6, 7, 8, 9];
  const [testedValues, setTestedValues] = useState<number[]>([5, 7]);

  const toggleTestValue = (val: number) => {
    if (testedValues.includes(val)) {
      setTestedValues(testedValues.filter((v) => v !== val));
    } else {
      const nextTested = [...testedValues, val].sort((a, b) => a - b);
      setTestedValues(nextTested);
      if (3 * val + 4 === 25) {
        confetti({ particleCount: 40, spread: 65, origin: { y: 0.75 } });
      }
    }
  };

  return (
    <TheoryTemplate
      title="Keressük a megoldásokat!"
      subtitle="Egyenletek és nyitott mondatok megoldása lebontogatással, fordított műveletekkel, próbálgatással és kötelező ellenőrzéssel"
      badge="VI. Mérés, arányosság, szöveges feladatok"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR"
      topicNumber="VI.8"
      documentId="g5-sol-theory-doc"
      pdfFilename="5_osztaly_megoldasok_keresese_tananyag.pdf"
      themeColor="rose"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      practiceTitle="Készen állsz az egyenletmegoldás próbájára?"
      practiceSubtitle="Gyakorold a lebontogatást, a fordított műveleteket és a szöveges feladványokat 30 izgalmas kérdéssel!"
      practiceButtonText="Megoldáskeresés kvíz indítása"
      quickRule={{
        label: 'A Lebontogatás Aranyszabálya',
        formula: 'Az ismeretlennel végzett műveleteket fordított sorrendben, ellentétes műveletekkel fejtjük vissza!'
      }}
    >
      {/* BEVEZETŐ CALLOUT: HOGYAN TALÁLJUK MEG A TITKOS ISMERETLENT? */}
      <TheoryCallout
        variant="rose"
        title="Hogyan találjuk meg a titkos ismeretlent?"
        icon={<Lightbulb className="w-5 h-5 text-rose-500" />}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          Amikor egy nyitott mondatban (egyenletben) ismeretlen szerepel (<strong>x</strong>, <strong>y</strong>, <strong>□</strong>),
          olyan számértéket keresünk, amellyel a mondat <strong>igaz állítássá válik</strong>. 5. osztályban két fő módszert használunk:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-rose-200 dark:border-rose-800 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
            <strong className="text-rose-700 dark:text-rose-300 font-bold block mb-1 text-sm">
              1. Lebontogatási módszer (Hagymahámozás)
            </strong>
            Megnézzük, milyen műveletek történtek az ismeretlennel a műveleti sorrend szerint, és a végéről visszafelé haladva az ellentétes műveletekkel „lefejtjük” a számokat.
          </div>
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-rose-200 dark:border-rose-800 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
            <strong className="text-rose-700 dark:text-rose-300 font-bold block mb-1 text-sm">
              2. Próbálgatásos módszer és becslés
            </strong>
            Ha az alaphalmaz kevés elemből áll, szisztematikusan behelyettesítünk számokat, vagy becsléssel leszűkítjük a lehetséges értékek körét.
          </div>
        </div>
      </TheoryCallout>

      {/* 1. SZEKCIÓ: A LEBONTOGATÁSI MÓDSZER */}
      <TheorySection
        id="lebontogatas"
        number={1}
        title="A lebontogatási módszer (Hagymahámozás)"
        icon={<Layers className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="ALAPMÓDSZER"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Hogyan működik a lebontogatás?"
            badge="MÓDSZERTAN"
            color="rose"
            icon={<Search className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Képzeld el az egyenletet úgy, mint egy becsomagolt ajándékot vagy egy hagymát!
              Az ismeretlenre (<strong>x</strong>) rétegről rétegre műveleteket tettünk. A kibontáskor a <strong>legkülső csomagolást bontjuk le legelőször</strong>, az ellentétes művelettel.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 text-xs">Ellentétes műveletpárok:</div>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <div className="p-2 bg-white/80 dark:bg-slate-900/60 rounded-lg border border-rose-200 dark:border-rose-800">
                  Összeadás <strong>(+)</strong> ↔ Kivonás <strong>(−)</strong>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/60 rounded-lg border border-rose-200 dark:border-rose-800">
                  Szorzás <strong>(·)</strong> ↔ Osztás <strong>(:)</strong>
                </div>
              </div>
            </div>
          </TheoryCard>

          <FormulaBox
            title="A műveleti sorrend megfordítása"
            description="A számoláskor először a szorzást végeztük, utána az összeadást. A visszafejtésnél a legutolsó lépéstől haladunk visszafelé: először kivonunk 15-öt, majd elosztjuk 3-mal!"
            color="rose"
          >
            <div className="space-y-3 pt-1">
              {/* Odafelé irány: Műveletek elvégzése */}
              <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 shadow-2xs">
                <div className="text-[11px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                  <span>1. Számolás (Műveleti sorrend):</span>
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap font-mono font-bold text-sm">
                  <span className="px-3 py-1 bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-700 rounded-lg text-rose-700 dark:text-rose-300 shadow-2xs">
                    x
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 rounded-lg text-xs font-sans">
                    · 3
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200">
                    3 · x
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 rounded-lg text-xs font-sans">
                    + 15
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-3.5 py-1 bg-rose-600 text-white font-extrabold rounded-lg shadow-xs">
                    45
                  </span>
                </div>
              </div>

              {/* Visszafelé irány: Lebontogatás ellentétes műveletekkel */}
              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 shadow-2xs">
                <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. Visszafejtés (Ellentétes műveletekkel, hátulról):</span>
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap font-mono font-bold text-sm">
                  <span className="px-3.5 py-1 bg-white dark:bg-slate-900 border-2 border-emerald-400 dark:border-emerald-600 text-slate-900 dark:text-white font-extrabold rounded-lg shadow-2xs">
                    45
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs font-sans">
                    − 15
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200">
                    30
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs font-sans">
                    : 3
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-3.5 py-1 bg-emerald-600 text-white font-extrabold rounded-lg shadow-xs">
                    x = 10
                  </span>
                </div>
              </div>
            </div>
          </FormulaBox>
        </div>

        {/* INTERAKTÍV LEBONTOGATÓ GÉP */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-rose-50/70 to-pink-50/50 dark:from-slate-800/80 dark:to-rose-950/40 border-2 border-rose-200/80 dark:border-rose-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs">INTERAKTÍV</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  Lebontogató gép laboratórium
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Válassz ki egy egyenletet, és kattints a léptető gombokra a visszafejtés követéséhez!
              </p>
            </div>
          </div>

          {/* Példa választó gombok */}
          <div className="flex flex-wrap gap-2">
            {peelingExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => handleSelectExample(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeExIndex === idx
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>

          {/* Feladat keret */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Megoldandó egyenlet
              </span>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5">
                {activeEx.equation}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic mt-1">
                {activeEx.story}
              </p>
            </div>

            {/* Léptető gombok */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <Button
                variant="outline"
                size="sm"
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Előző
              </Button>
              <span className="text-xs font-semibold px-2 text-slate-500">
                {currentStepIndex + 1} / {activeEx.steps.length}
              </span>
              <Button
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white"
                disabled={currentStepIndex === activeEx.steps.length - 1}
                onClick={handleNextStep}
              >
                Következő
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Vizuális mérleg doboz */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-inner flex flex-col items-center justify-center space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Lépés {currentStepIndex}: {activeEx.steps[currentStepIndex].action}
            </span>

            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <div className="px-5 py-3 rounded-xl bg-rose-500/20 border-2 border-rose-500 text-xl sm:text-2xl font-mono font-bold text-rose-200">
                {activeEx.steps[currentStepIndex].expression}
              </div>
              <Equal className="w-8 h-8 text-rose-400 shrink-0" />
              <div className="px-5 py-3 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 text-xl sm:text-2xl font-mono font-bold text-emerald-200">
                {activeEx.steps[currentStepIndex].rightSide}
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-lg mt-2">
              {activeEx.steps[currentStepIndex].description}
            </p>

            {currentStepIndex === activeEx.steps.length - 1 && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 flex flex-col items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Kész megoldás: <span className="font-mono text-xl text-white">{activeEx.solution}</span>
                </div>
                <div className="text-xs text-emerald-300 text-center mt-1">
                  <strong>Ellenőrzés:</strong> {activeEx.checkText}
                </div>
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: KÜLÖNLEGES ESETEK ÉS CSAPDÁK */}
      <TheorySection
        id="kulonleges-esetek"
        number={2}
        title="Különleges esetek: Kivonandó és Osztó keresése"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badge="CSAPDÁK ELKERÜLÉSE"
        badgeColor="amber"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Az összeadás és a szorzás felcserélhető, így ott az ellentétes művelet mindig magától értetődő.
          A <strong>kivonásnál és az osztásnál</strong> azonban nagyon fontos figyelni, hogy a kifejezés <em>eleje</em> vagy a <em>második tagja</em> az ismeretlen!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Veszélyes művelet: Kivonandó keresése"
            trap="45 − x = 15 esetén sokan hozzáadják a 15-öt a 45-höz (x = 60), ami hibás, hiszen 45-ből nem lehet 60-at elvenni!"
            correct="Kisebbítendő − Kivonandó = Különbség → Kivonandó = Kisebbítendő − Különbség. Tehát: x = 45 − 15 = 30!"
          />

          <TheoryTrapBox
            title="2. Veszélyes művelet: Osztó keresése"
            trap="48 : y = 6 esetén sokan összeszorozzák a számokat (y = 48 · 6 = 288), ami hibás, hiszen 48-at nem lehet 288-cal osztani úgy, hogy 6 legyen!"
            correct="Osztandó : Osztó = Hányados → Osztó = Osztandó : Hányados. Tehát: y = 48 : 6 = 8!"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ExampleBox
            title="Zárójeles kifejezések kívülről befelé"
            problem="Oldjuk meg a 2 · (x + 7) = 36 egyenletet!"
            solution="1. Először a szorzást bontjuk le (a zárójel kívülről egyetlen blokk):
   x + 7 = 36 : 2 = 18
2. Ezután bontjuk le az összeadást:
   x = 18 − 7 = 11
Ellenőrzés: 2 · (11 + 7) = 2 · 18 = 36. Helyes!"
          />

          <ExampleBox
            title="Többlépéses összetett egyenlet"
            problem="Oldjuk meg a (50 − 3 · a) : 4 = 8 egyenletet!"
            solution="1. Osztás lebontása szorzással:
   50 − 3 · a = 8 · 4 = 32
2. Kivonandó keresése (50 − 32):
   3 · a = 50 − 32 = 18
3. Szorzótényező osztással:
   a = 18 : 3 = 6
Ellenőrzés: (50 − 3 · 6) : 4 = (50 − 18) : 4 = 32 : 4 = 8. Helyes!"
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: PRÓBÁLGATÁSOS MÓDSZER ÉS TÁBLÁZAT */}
      <TheorySection
        id="probalgatas"
        number={3}
        title="A próbálgatásos módszer és táblázatkészítés"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="STRATÉGIA"
        badgeColor="emerald"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Ha az alaphalmaz kevés elemből áll (pl. egyjegyű számok, prímszámok, vagy szűk tartomány), a <strong>szisztematikus próbálgatás</strong> gyors és biztos út a megoldáshoz.
        </p>

        {/* INTERAKTÍV PRÓBÁLGATÓ TÁBLÁZAT */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Teszteld az alaphalmaz elemeit a 3 · x + 4 = 25 egyenletben:
            </span>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-mono">
              Alaphalmaz: {'{5, 6, 7, 8, 9}'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {trialDomain.map((num) => {
              const isTested = testedValues.includes(num);
              const isCorrect = 3 * num + 4 === 25;
              return (
                <button
                  key={num}
                  onClick={() => toggleTestValue(num)}
                  className={`px-4 py-2 rounded-xl text-sm font-mono font-bold transition-all border ${
                    isTested
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                      : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  x = {num} {isTested && (isCorrect ? '✓' : '✗')}
                </button>
              );
            })}
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mt-2">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">x értéke</th>
                  <th className="p-3">Bal oldal: 3 · x + 4</th>
                  <th className="p-3">Számított érték</th>
                  <th className="p-3">Jobb oldal</th>
                  <th className="p-3 text-right">Igazságérték</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs sm:text-sm">
                {testedValues.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-400 italic">
                      Kattints a fenti gombokra legalább egy szám kipróbálásához!
                    </td>
                  </tr>
                ) : (
                  testedValues.map((num) => {
                    const calcVal = 3 * num + 4;
                    const isTrue = calcVal === 25;
                    return (
                      <tr
                        key={num}
                        className={
                          isTrue
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }
                      >
                        <td className="p-3 font-bold text-slate-900 dark:text-white">x = {num}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">
                          3 · {num} + 4
                        </td>
                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                          {calcVal}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">25</td>
                        <td className="p-3 text-right">
                          {isTrue ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5" /> IGAZ (Megoldás!)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                              HAMIS ({calcVal < 25 ? 'Túl kicsi' : 'Túl nagy'})
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A KÖTELEZŐ ELLENŐRZÉSI PROTOKOLL */}
      <TheorySection
        id="ellenorzes"
        number={4}
        title="A kötelező ellenőrzési protokoll"
        icon={<CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="3 ARANYSZABÁLY"
        badgeColor="purple"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Az egyenletmegoldás nem ér véget a számolás végén! Az ellenőrzés nem pluszmunka, hanem annak a biztosítása, hogy a kapott szám valóban helyes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Aranyszabály"
            badge="KIINDULÁS"
            color="purple"
          >
            <strong className="text-purple-700 dark:text-purple-300 block mb-1 text-sm">
              Mindig az EREDETI egyenletbe!
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A kapott értéket mindig a legelső felírt nyitott mondatba helyettesítjük be, sosem egy közbenső lépésbe, mert ott már elszámolhattuk magunkat.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Aranyszabály"
            badge="KÜLÖN SZÁMOLÁS"
            color="purple"
          >
            <strong className="text-purple-700 dark:text-purple-300 block mb-1 text-sm">
              Külön a két oldalt!
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Kiszámoljuk a Bal oldal pontos értékét, majd megnézzük a Jobb oldal értékét. Nem írunk közéjük előre egyenlőségjelet!
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Aranyszabály"
            badge="DÖNTÉS"
            color="purple"
          >
            <strong className="text-purple-700 dark:text-purple-300 block mb-1 text-sm">
              Bal oldal = Jobb oldal
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Ha a két oldal számszerű értéke megegyezik, az állítás IGAZ, így a kapott szám valóban megoldása az egyenletnek.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          variant="tip"
          title="Tipp a dolgozatban"
        >
          Ha az ellenőrzéskor a bal és a jobb oldal nem egyenlő, azonnal tudod, hogy valahol elszámolás történt. Nézd át a lebontogatás lépéseit és a műveletek megfordítását!
        </TheoryCallout>
      </TheorySection>
    </TheoryTemplate>
  );
};
export default FindSolutionsTheory;
