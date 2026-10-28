import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Scale,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Divide,
  Zap,
  ArrowRight,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw
} from 'lucide-react';
import {
  SolvingAlgorithmSvg,
  BracketExpansionSvg,
  CommonDenominatorSvg,
  EquivalenceChainSvg
} from './SolvingFigures';

interface SolvingTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SolvingTheory: React.FC<SolvingTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV EGYENLET LEVEZETŐ GÉP ÁLLAPOTOK ---
  const [activePreset, setActivePreset] = useState<'brackets' | 'fractions' | 'special'>('brackets');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const presets = {
    brackets: {
      title: 'Zárójeles Egyenlet',
      formula: '4(x - 3) + 5 = 2(x + 4) - 7',
      steps: [
        {
          eq: '4(x - 3) + 5 = 2(x + 4) - 7',
          op: 'Kiindulás',
          desc: 'Adott egyenlet. Mindkét oldalon zárójelek szerepelnek szorzókkal.'
        },
        {
          eq: '4x - 12 + 5 = 2x + 8 - 7',
          op: 'Zárójelbontás',
          desc: 'Felbontjuk a zárójeleket: 4·x - 4·3 = 4x - 12, illetve 2·x + 2·4 = 2x + 8.'
        },
        {
          eq: '4x - 7 = 2x + 1',
          op: 'Összevonás',
          desc: 'Összevonjuk az egynemű konstans tagokat: -12 + 5 = -7 a bal oldalon, 8 - 7 = 1 a jobb oldalon.'
        },
        {
          eq: '2x - 7 = 1',
          op: '/ - 2x',
          desc: 'Mérlegelv: a kisebb x-es tagot (2x) kivonjuk mindkét oldalból, így bal oldalon 4x - 2x = 2x marad.'
        },
        {
          eq: '2x = 8',
          op: '/ + 7',
          desc: 'Hozzáadunk 7-et mindkét oldalhoz, hogy az ismeretlenes tag egyedül maradjon: 1 + 7 = 8.'
        },
        {
          eq: 'x = 4',
          op: '/ : 2',
          desc: 'Elosztjuk mindkét oldalt x együtthatójával (2-vel): 8 / 2 = 4.'
        },
        {
          eq: 'M = {4}',
          op: 'Ellenőrzés: B(4) = J(4) = 9',
          desc: 'B(4) = 4(1) + 5 = 9. J(4) = 2(8) - 7 = 16 - 7 = 9. 9 = 9, valódi gyök!'
        }
      ]
    },
    fractions: {
      title: 'Törtes Egyenlet',
      formula: '(2x - 1)/3 - (x + 2)/4 = 1',
      steps: [
        {
          eq: '(2x - 1)/3 - (x + 2)/4 = 1',
          op: 'Kikötés & LKKT',
          desc: 'A nevezők 3 és 4 (konstansok, É.T. = ℝ). A legkisebb közös nevező: 12.'
        },
        {
          eq: '4 · (2x - 1) - 3 · (x + 2) = 12',
          op: '/ · 12',
          desc: 'Beszorozzuk mindkét oldalt 12-vel! FIGYELEM: a törtvonal zárójelet helyettesít, és 1 · 12 = 12 a jobb oldalon!'
        },
        {
          eq: '8x - 4 - 3x - 6 = 12',
          op: 'Zárójelbontás',
          desc: 'Vigyázat a -3-as szorzóval: -3 · x = -3x, és -3 · (+2) = -6!'
        },
        {
          eq: '5x - 10 = 12',
          op: 'Összevonás',
          desc: 'Egynemű tagok összevonása: 8x - 3x = 5x, valamint -4 - 6 = -10.'
        },
        {
          eq: '5x = 22',
          op: '/ + 10',
          desc: 'Hozzáadunk 10-et mindkét oldalhoz: 12 + 10 = 22.'
        },
        {
          eq: 'x = 22/5 = 4,4',
          op: '/ : 5',
          desc: 'Osztunk 5-tel: x = 22/5 = 4,4.'
        },
        {
          eq: 'M = {4,4}',
          op: 'Ellenőrzés: 2,6 - 1,6 = 1',
          desc: 'B(4,4) = (8,8 - 1)/3 - (4,4 + 2)/4 = 7,8/3 - 6,4/4 = 2,6 - 1,6 = 1 = J(4,4). Helyes!'
        }
      ]
    },
    special: {
      title: 'Speciális: Ellentmondás',
      formula: '3(2x + 1) = 6x + 5',
      steps: [
        {
          eq: '3(2x + 1) = 6x + 5',
          op: 'Kiindulás',
          desc: 'Adott egyenlet. Felbontjuk a bal oldali zárójelet.'
        },
        {
          eq: '6x + 3 = 6x + 5',
          op: 'Zárójelbontás',
          desc: '3 · 2x + 3 · 1 = 6x + 3.'
        },
        {
          eq: '3 = 5',
          op: '/ - 6x',
          desc: 'Mindkét oldalból kivonjuk a 6x-et: az ismeretlenek teljesen kiejtik egymást, és 3 = 5 marad!'
        },
        {
          eq: 'M = ∅ (Üres halmaz)',
          op: 'Ellentmondás',
          desc: 'A 3 sosem egyenlő 5-tel semmilyen valós x esetén sem. Az egyenletnek nincs megoldása.'
        }
      ]
    }
  };

  const currentConfig = presets[activePreset];

  return (
    <TheoryTemplate
      title="Egyenletek Megoldása és a Mérlegelv Mesterei"
      subtitle="Zárójeles és törtes egyenletek szisztematikus levezetése, ekvivalens átalakítási láncolatok és a mérlegelv"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 8. TÉMAKÖR"
      themeColor="teal"
      documentId="solving-theory"
      pdfFilename="9_osztaly_egyenletek_megoldasa.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Az 5 Lépéses Univerzális Megoldási Algoritmus',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-teal-700 dark:text-teal-400 font-black">1. Kikötés & Törtek: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                É.T. rögzítése, majd beszorzás a legkisebb közös nevezővel (LKN).
              </span>
            </div>
            <div>
              <span className="text-cyan-700 dark:text-cyan-400 font-black">2. Zárójelbontás & Összevonás: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Disztributivitás, figyelve a negatív előjelekre, majd egynemű tagok összevonása mindkét oldalon.
              </span>
            </div>
            <div>
              <span className="text-emerald-700 dark:text-emerald-400 font-black">3. Rendezz és Ellenőrizz: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Ismeretlenek balra, számok jobbra, majd osztás az együtthatóval és visszahelyettesítés az eredetibe!
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* ============================================================ */}
      {/* 1. FEJEZET: AZ EGYENLETMEGOLDÁS ALGORITMUSA                  */}
      {/* ============================================================ */}
      <TheorySection
        title="1. A 6 Lépéses Szisztematikus Megoldási Menet"
        badge="Módszertan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Az elsőfokú egyismeretlenes egyenletek megoldása egy <strong>szigorúan kötött, megbízható algoritmusra</strong> épül. Ha lépésről lépésre követed a menetrendet, még a legbonyolultabb egyenletekben sem veszhetsz el!
            </p>
            <TheoryCallout
              icon={<Scale className="w-5 h-5 text-teal-600" />}
              title="A Mérlegelv Ekvivalenciája"
              color="teal"
            >
              Bármit teszel a bal oldallal, ugyanazt a műveletet pontosan hajtsd végre a jobb oldallal is! Mindkét oldalt szorozhatod vagy oszthatod nemnulla számmal, hozzáadhatsz vagy kivonhatsz azonos tagokat.
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <SolvingAlgorithmSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 2. FEJEZET: ZÁRÓJELEK PRECIZ FELBONTÁSA                      */}
      {/* ============================================================ */}
      <TheorySection
        title="2. Zárójelek Felbontása és az Előjelszabályok"
        badge="Alapozás"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Zárójelbontáskor a zárójel előtti szorzótényezővel a zárójel <strong>minden egyes tagját</strong> meg kell szoroznunk a disztributivitási szabály szerint: <span className="font-mono font-bold">a(b + c) = ab + ac</span>.
            </p>
            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-teal-600" />
                A Zárójel Előtti Mínuszjel:
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Ha a zárójel előtt mínuszjel áll, az olyan, mintha <span className="font-mono font-bold">(-1)</span>-gyel szoroznánk: a zárójel elhagyásakor <strong>minden belső előjel az ellentétére változik</strong>!
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <BracketExpansionSvg size={340} />
          </div>
        </div>

        <TheoryTrapBox title="Tipikus Diákhiba Zárójelbontásnál!">
          <div className="text-xs sm:text-sm space-y-1">
            <div><strong>Hiba:</strong> <span className="font-mono text-rose-600 font-bold">3(2x - 5) = 6x - 5</span> (elfelejtik megszorozni a második tagot is!).</div>
            <div><strong>Helyes:</strong> <span className="font-mono text-emerald-600 font-bold">3(2x - 5) = 3 · 2x - 3 · 5 = 6x - 15</span>.</div>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* ============================================================ */}
      {/* 3. FEJEZET: TÖRTES EGYENLETEK ÉS KÖZÖS NEVEZŐ                */}
      {/* ============================================================ */}
      <TheorySection
        title="3. Törtes Egyenletek: Felszámolás Beszorzással"
        badge="Törtek eltüntetése"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Ha az egyenletben törtek szerepelnek, a legcélravezetőbb stratégia, ha az egyenlet mindkét oldalát <strong>megszorozzuk a nevezők legkisebb közös többszörösével (LKKT)</strong>. Ezzel egyetlen lépésben egész együtthatós egyenletet kapunk!
            </p>
            <TheoryCallout
              icon={<Divide className="w-5 h-5 text-teal-600" />}
              title="A Törtvonal Zárójelet Helyettesít!"
              color="teal"
            >
              Ha a tört előtt mínuszjel van, beszorzás után a számlálót <strong>kötelező zárójelbe tenni</strong>! Például: <span className="font-mono font-bold">- (x - 2)/2 · 6 = -3(x - 2) = -3x + 6</span>!
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <CommonDenominatorSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 4. FEJEZET: RENDEZÉS A MÉRLEGELVVEL                          */}
      {/* ============================================================ */}
      <TheorySection
        title="4. Rendezés és Izolálás a Mérlegelvvel"
        badge="Mérlegelv lánc"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Miután mindkét oldalon összevontuk az egynemű tagokat, az egyenlet az <span className="font-mono font-bold">ax + b = cx + d</span> alakra egyszerűsödik.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border">
                <strong>Profi tipp a negatív előjelek elkerülésére:</strong><br/>
                Mindig a <strong>kisebb együtthatójú x-es tagot</strong> vond ki mindkét oldalból! Ha például <span className="font-mono">5x</span> van a bal oldalon és <span className="font-mono">2x</span> a jobb oldalon, vonj ki <span className="font-mono">2x</span>-et, így bal oldalon <span className="font-mono">3x</span> marad (pozitív együttható!).
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <EquivalenceChainSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 5. FEJEZET: SPECIÁLIS KIMENETELEK                           */}
      {/* ============================================================ */}
      <TheorySection
        title="5. Speciális Kimenetelek: Azonosság és Ellentmondás"
        badge="Különleges esetek"
      >
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          Néha az ismeretlenek kiejtik egymást a levezetés során. Ilyenkor a visszamaradó számazonosság dönti el az egyenlet jellegét:
        </p>

        <TheoryTable
          headers={['Utolsó sor', 'Kimenetel', 'Megoldáshalmaz', 'Magyarázat']}
          rows={[
            ['ax = b (a ≠ 0)', 'Egyértelmű gyök', 'M = {b / a}', 'Pontosan 1 valós megoldás létezik.'],
            ['0 = 0 (vagy c = c)', 'Azonosság', 'M = ℝ (minden valós szám)', 'Az egyenlőség mindig, bármilyen x-re igaz.'],
            ['0 = 5 (vagy c₁ = c₂)', 'Ellentmondás', 'M = ∅ (üres halmaz)', 'A 0 sosem egyenlő 5-tel, nincs megoldás.']
          ]}
        />
      </TheorySection>
    
      {/* ============================================================ */}
      {/* 6. FEJEZET: GYAKORLATI INTERAKTÍV LEVEZETŐ GÉP               */}
      {/* ============================================================ */}
      <TheorySection
        title="6. Gyakorlati Interaktív Levezető Gép"
        badge="Interaktív Labor"
      >
        {/* ============================================================ */}
      {/* INTERAKTÍV EGYENLET LEVEZETŐ GÉP                             */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20 border-2 border-teal-200 dark:border-teal-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Interaktív Lépésről Lépésre Levezető Gép
              </h2>
              <p className="text-xs sm:text-sm text-teal-700 dark:text-teal-300 font-medium">
                Kövesd végig a zárójeles és törtes egyenletek teljes levezetési lépéseit indoklással!
              </p>
            </div>
          </div>

          {/* Módválasztó gombok */}
          <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-teal-200 dark:border-teal-700/50 shadow-sm">
            {(['brackets', 'fractions', 'special'] as const).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActivePreset(key);
                  setCurrentStep(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  activePreset === key
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
                }`}
              >
                {presets[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* Levezetés Kártya */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-teal-100 dark:border-teal-800/60 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Kiinduló egyenlet:</span>
              <div className="text-xl sm:text-2xl font-black font-mono text-teal-700 dark:text-teal-400">
                {currentConfig.formula}
              </div>
            </div>

            {/* Léptető gombok */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                title="Előző lépés"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-slate-100 dark:bg-slate-800">
                {currentStep + 1} / {currentConfig.steps.length} lépés
              </span>

              <button
                onClick={() => setCurrentStep((prev) => Math.min(currentConfig.steps.length - 1, prev + 1))}
                disabled={currentStep === currentConfig.steps.length - 1}
                className="p-2 rounded-lg bg-teal-500 text-white disabled:opacity-30 hover:bg-teal-600 transition-all shadow"
                title="Következő lépés"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentStep(0)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                title="Újrakezdés"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Aktuális állapot kijelző */}
          <div className="space-y-3">
            {currentConfig.steps.slice(0, currentStep + 1).map((step, idx) => {
              const isCurrent = idx === currentStep;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-400 shadow-md ring-2 ring-teal-400/20'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {step.eq}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-teal-700 dark:text-teal-300">
                      {step.op}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Magyarázó doboz az aktuális lépéshez */}
          <div className="p-4 rounded-xl bg-teal-500 text-white shadow-md flex items-start gap-3">
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm">
                Lépés magyarázata: {currentConfig.steps[currentStep].op}
              </div>
              <div className="text-xs opacity-95 mt-1 leading-relaxed">
                {currentConfig.steps[currentStep].desc}
              </div>
            </div>
          </div>
        </div>
      </div>
      </TheorySection>
    
    </TheoryTemplate>
  );
};

