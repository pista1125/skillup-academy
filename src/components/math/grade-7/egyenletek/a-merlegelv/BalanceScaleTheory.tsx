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
import { Slider } from '@/components/ui/slider';
import {
  Scale,
  Box,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Calculator,
  Layers,
  HelpCircle,
  Package,
  Weight,
  Apple,
  TrendingDown,
  Equal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface BalanceScaleTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface BalanceStep {
  equationText: string;
  opAnnotation: string;
  leftDesc: string;
  rightDesc: string;
  leftX: number;
  leftConst: number;
  rightX: number;
  rightConst: number;
  explanation: string;
}

interface BalanceScenario {
  id: string;
  title: string;
  subtitle: string;
  xValue: number;
  unit: string;
  steps: BalanceStep[];
}

const BALANCE_SCENARIOS: BalanceScenario[] = [
  {
    id: 's1',
    title: 'Tk. 1. példa: Ismeretlen tömegű dobozok',
    subtitle: 'A tankönyv nyitó feladata (Tk. 156. oldal): 2 doboz + 2 kg = 1 doboz + 5 kg',
    xValue: 3,
    unit: 'kg',
    steps: [
      {
        equationText: '2x + 2 = x + 5',
        opAnnotation: 'Kezdőállapot',
        leftDesc: '2 doboz (2x) + 2 kg',
        rightDesc: '1 doboz (x) + 5 kg',
        leftX: 2,
        leftConst: 2,
        rightX: 1,
        rightConst: 5,
        explanation: 'A kétkarú mérleg egyensúlyban van. A bal serpenyőben 2 doboz és egy 2 kg-os súly, a jobb serpenyőben 1 doboz és 5 kg található.'
      },
      {
        equationText: '2x = x + 3',
        opAnnotation: '/ - 2',
        leftDesc: '2 doboz (2x)',
        rightDesc: '1 doboz (x) + 3 kg',
        leftX: 2,
        leftConst: 0,
        rightX: 1,
        rightConst: 3,
        explanation: 'Mindkét serpenyőből levettünk 2 kg tömeget (/- 2). Mivel mindkét oldalt ugyanúgy változtattuk, a mérleg egyensúlyban maradt!'
      },
      {
        equationText: 'x = 3',
        opAnnotation: '/ - x',
        leftDesc: '1 doboz (x)',
        rightDesc: '3 kg súly',
        leftX: 1,
        leftConst: 0,
        rightX: 0,
        rightConst: 3,
        explanation: 'Mindkét serpenyőből levettünk 1 dobozt (/- x). A bal oldalon csak 1 doboz maradt, a jobb oldalon 3 kg. Egyetlen doboz tömege: 3 kg!'
      }
    ]
  },
  {
    id: 's2',
    title: 'Tk. 2. példa: 3x + 2 = x + 12',
    subtitle: 'Az első tisztán algebrai mérlegelves feladat (Tk. 157. oldal)',
    xValue: 5,
    unit: 'érték',
    steps: [
      {
        equationText: '3x + 2 = x + 12',
        opAnnotation: 'Kezdőállapot',
        leftDesc: '3x + 2',
        rightDesc: 'x + 12',
        leftX: 3,
        leftConst: 2,
        rightX: 1,
        rightConst: 12,
        explanation: 'Mindkét oldalon szerepel x és állandó szám is. Ezt az egyenletet lebontogatással nem lehetne megoldani, de mérlegelvvel igen!'
      },
      {
        equationText: '3x = x + 10',
        opAnnotation: '/ - 2',
        leftDesc: '3x',
        rightDesc: 'x + 10',
        leftX: 3,
        leftConst: 0,
        rightX: 1,
        rightConst: 10,
        explanation: 'Mindkét oldalból kivonunk 2-t (/- 2). A bal oldalról eltűnik a konstans szám.'
      },
      {
        equationText: '2x = 10',
        opAnnotation: '/ - x',
        leftDesc: '2x',
        rightDesc: '10',
        leftX: 2,
        leftConst: 0,
        rightX: 0,
        rightConst: 10,
        explanation: 'Mindkét oldalból kivonunk x-et (/- x). Így a jobb oldalon már nem marad ismeretlen!'
      },
      {
        equationText: 'x = 5',
        opAnnotation: '/ : 2',
        leftDesc: 'x',
        rightDesc: '5',
        leftX: 1,
        leftConst: 0,
        rightX: 0,
        rightConst: 5,
        explanation: 'Mindkét oldalt elosztjuk 2-vel (/: 2). Megkaptuk a megoldást: x = 5! Ellenőrzés: 3·5 + 2 = 17 és 5 + 12 = 17 ✓'
      }
    ]
  },
  {
    id: 's3',
    title: 'Tk. 3. példa: 4x - 7 = 2x + 5',
    subtitle: 'Kivonás megszüntetése összeadással (Tk. 158. oldal)',
    xValue: 6,
    unit: 'érték',
    steps: [
      {
        equationText: '4x - 7 = 2x + 5',
        opAnnotation: 'Kezdőállapot',
        leftDesc: '4x - 7',
        rightDesc: '2x + 5',
        leftX: 4,
        leftConst: -7,
        rightX: 2,
        rightConst: 5,
        explanation: 'A bal oldalon -7 szerepel. Hogy megszabaduljunk a -7-től, mindkét oldalhoz 7-et adunk hozzá.'
      },
      {
        equationText: '4x = 2x + 12',
        opAnnotation: '/ + 7',
        leftDesc: '4x',
        rightDesc: '2x + 12',
        leftX: 4,
        leftConst: 0,
        rightX: 2,
        rightConst: 12,
        explanation: 'Hozzáadtunk 7-et mindkét oldalhoz (/+ 7). -7 + 7 = 0, a jobb oldalon 5 + 7 = 12.'
      },
      {
        equationText: '2x = 12',
        opAnnotation: '/ - 2x',
        leftDesc: '2x',
        rightDesc: '12',
        leftX: 2,
        leftConst: 0,
        rightX: 0,
        rightConst: 12,
        explanation: 'Mindkét oldalból kivonunk 2x-et (/- 2x). 4x - 2x = 2x, a jobb oldalról pedig eltűnik az ismeretlen.'
      },
      {
        equationText: 'x = 6',
        opAnnotation: '/ : 2',
        leftDesc: 'x',
        rightDesc: '6',
        leftX: 1,
        leftConst: 0,
        rightX: 0,
        rightConst: 6,
        explanation: 'Mindkét oldalt elosztjuk 2-vel (/: 2). Megoldás: x = 6! Ellenőrzés: 4·6 - 7 = 17 és 2·6 + 5 = 17 ✓'
      }
    ]
  }
];

export const BalanceScaleTheory: React.FC<BalanceScaleTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Simulator state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('s1');
  const [stepIdx, setStepIdx] = useState<number>(0);

  const activeScenario = BALANCE_SCENARIOS.find((s) => s.id === selectedScenarioId) || BALANCE_SCENARIOS[0];
  const currentStep = activeScenario.steps[stepIdx];

  const handleNextStep = () => {
    if (stepIdx < activeScenario.steps.length - 1) {
      setStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (stepIdx > 0) {
      setStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStepIdx(0);
  };

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setStepIdx(0);
  };

  return (
    <TheoryTemplate
      title="A mérlegelv"
      subtitle="A kétkarú mérleg modellje, ekvivalens átalakítások és egyenletrendezés (Tk. 156–159. o., Mf. 96–97. o.)"
      badgeText="7. OSZTÁLY • V. FEJEZET • 9. LECKE"
      documentId="g7-pct-balance-theory-doc"
      pdfFilename="7_osztaly_a_merlegelv.pdf"
      quickRule={{
        label: 'Fontos szabály',
        formula: '2x + 2 = x + 5  / - x  ⟹  x + 2 = 5  / - 2  ⟹  x = 3  •  Bal = Jobb'
      }}
      themeColor="sky"
      practiceTitle="Készen állsz a mérlegelven alapuló egyenletmegoldásra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A KÉTKARÚ MÉRLEG ÉS AZ EGYENLŐSÉG */}
      <TheorySection
        number={1}
        title="A Kétkarú Mérleg Modellje"
        subtitle="Az algebra egyik legszebb szemléltetése: az egyenlőségjel = egyensúlyi állapot"
        badgeColor="sky"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Miért a kétkarú mérleg?"
            color="sky"
            icon={<Scale className="w-5 h-5" />}
          >
            <p className="text-sm text-slate-700 mb-2">
              A kétkarú mérleg akkor van <strong>egyensúlyban</strong>, ha a bal és a jobb serpenyőben 
              lévő nehezékek <strong>össztömege pontosan megegyezik</strong>.
            </p>
            <p className="text-sm text-slate-700">
              Az egyenletmegoldásban a két oldal pont olyan, mint a két serpenyő:
              az <strong>egyenlőségjel (<MathText text="=" />)</strong> az egyensúlyi helyzetet jelképezi.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Az egyensúly megőrzésének feltétele"
            color="emerald"
            icon={<CheckCircle2 className="w-5 h-5" />}
          >
            <p className="text-sm text-slate-700 mb-2">
              A mérleg egyensúlya <strong>nem borul fel</strong>, ha bármit teszünk a bal serpenyővel, 
              <strong>ugyanazt a műveletet végezzük el a jobb serpenyővel is</strong>!
            </p>
            <p className="text-sm text-slate-700">
              Ha mindkét oldalról elveszünk 2 kg-ot, vagy mindkét oldalt felezzük, az egyensúly 
              továbbra is fennmarad! Ezt nevezzük <strong>mérlegelvnek</strong>.
            </p>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV MÉRLEGELV SZIMULÁTOR */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50/70 via-white to-slate-50 border-2 border-sky-200 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-sky-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-sky-600 text-white shadow-xs">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Interaktív Mérleg Szimulátor</h4>
                <p className="text-xs text-slate-500">Kövesd az egyensúly megmaradását lépésről lépésre!</p>
              </div>
            </div>

            {/* Szcenárió választó gombok */}
            <div className="flex flex-wrap gap-1.5">
              {BALANCE_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectScenario(s.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    selectedScenarioId === s.id
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  )}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Dinamikus Kétkarú Mérleg Grafika (SVG) */}
          <div className="p-4 bg-white rounded-xl border border-sky-100 shadow-inner mb-4 flex flex-col items-center justify-center">
            <svg viewBox="0 0 400 160" className="w-full max-w-md h-40">
              {/* Állvány és talapzat */}
              <polygon points="185,150 215,150 200,60" fill="#64748b" />
              <rect x="170" y="145" width="60" height="10" rx="3" fill="#475569" />
              <circle cx="200" cy="55" r="8" fill="#0284c7" />

              {/* Vízszintes mérlegrúd (egyensúlyban) */}
              <line x1="60" y1="55" x2="340" y2="55" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />

              {/* Bal oldali függesztés és serpenyő */}
              <line x1="80" y1="55" x2="60" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <line x1="80" y1="55" x2="100" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 50 105 Q 80 120 110 105 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />

              {/* Jobb oldali függesztés és serpenyő */}
              <line x1="320" y1="55" x2="300" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <line x1="320" y1="55" x2="340" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 290 105 Q 320 120 350 105 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />

              {/* Bal serpenyő tartalma felirat */}
              <text x="80" y="135" textAnchor="middle" className="text-[11px] font-bold fill-sky-900 font-mono">
                {currentStep.leftDesc}
              </text>

              {/* Jobb serpenyő tartalma felirat */}
              <text x="320" y="135" textAnchor="middle" className="text-[11px] font-bold fill-sky-900 font-mono">
                {currentStep.rightDesc}
              </text>

              {/* Középső egyenlőségjel */}
              <text x="200" y="35" textAnchor="middle" className="text-xl font-bold fill-emerald-600 font-mono">
                = (EGYENSÚLY)
              </text>
            </svg>

            {/* Aktuális algebrai állapot */}
            <div className="flex items-center gap-3 mt-2 px-4 py-2 bg-sky-50 rounded-xl border border-sky-200">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Egyenlet:</span>
              <span className="font-mono text-xl font-bold text-sky-900">
                <MathText text={currentStep.equationText} />
              </span>
              <span className="px-2.5 py-0.5 rounded bg-sky-200/80 text-sky-900 font-mono font-bold text-xs">
                {currentStep.opAnnotation}
              </span>
            </div>
          </div>

          {/* Lépés magyarázata */}
          <div className="p-3 bg-white rounded-xl border border-sky-100 mb-4">
            <h5 className="font-semibold text-xs text-sky-800 uppercase tracking-wide mb-1">
              Mi történt ebben a lépésben?
            </h5>
            <p className="text-sm text-slate-700">{currentStep.explanation}</p>
          </div>

          {/* Navigációs gombok */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sky-100">
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePrevStep}
                disabled={stepIdx === 0}
                variant="outline"
                size="sm"
                className="text-xs text-slate-600"
              >
                Előző lépés
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={stepIdx === activeScenario.steps.length - 1}
                size="sm"
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs gap-1.5"
              >
                Következő mérlegelv lépés ({stepIdx + 1} / {activeScenario.steps.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                onClick={handleReset}
                variant="ghost"
                size="sm"
                className="text-xs text-slate-500"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újra
              </Button>
            </div>

            {stepIdx === activeScenario.steps.length - 1 && (
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
                <Check className="w-4 h-4 text-emerald-600" />
                Megoldva: <MathText text={`x = ${activeScenario.xValue}`} /> {activeScenario.unit}
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: AZ EKVIVALENS ÁTALAKÍTÁSOK NÉGY SZABÁLYA */}
      <TheorySection
        number={2}
        title="A Mérlegelv Ekvivalens Átalakításai"
        subtitle="Milyen műveleteket végezhetünk a két oldalon anélkül, hogy megváltozna az igazsághalmaz?"
        badgeColor="sky"
      >
        <TheoryTable
          headers={['Átalakítás fajtája', 'Matematikai szabály', 'Jelölés a vonal mögött', 'Példa']}
          rows={[
            [
              'Hozzáadás mindkét oldalhoz',
              'A = B \\iff A + c = B + c',
              '/ + c',
              '4x - 7 = 2x + 5 /+ 7 \\implies 4x = 2x + 12'
            ],
            [
              'Kivonás mindkét oldalból',
              'A = B \\iff A - c = B - c',
              '/ - c',
              '3x + 2 = x + 12 /- 2 \\implies 3x = x + 10'
            ],
            [
              'Ismeretlenes tag elvétele / hozzáadása',
              'A = B \\iff A - kx = B - kx',
              '/ - kx  \\text{ vagy } / + kx',
              '2x = x + 3 /- x \\implies x = 3'
            ],
            [
              'Osztás nullától különböző számmal',
              'A = B \\iff A : c = B : c \\quad (c \\neq 0)',
              '/: c',
              '2x = 10 /: 2 \\implies x = 5'
            ],
            [
              'Szorzás nullától különböző számmal',
              'A = B \\iff A \\cdot c = B \\cdot c \\quad (c \\neq 0)',
              '/ \\cdot c',
              '\\frac{x}{4} = 3 /\\cdot 4 \\implies x = 12'
            ]
          ]}
        />

        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            Miért univerzálisabb a mérlegelv, mint a lebontogatás?
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            A <strong>lebontogatás</strong> kizárólag olyan egyenleteknél működik, ahol az ismeretlen 
            csak az egyik oldalon láncolódik (pl. <MathText text="3x - 5 = 7" />). 
            Amint mindkét oldalon megjelenik az ismeretlen (pl. <MathText text="3x + 2 = x + 12" /> vagy <MathText text="6x + 14 = 9x - 10" />), 
            a lebontogatás csődöt mond! Ilyenkor a mérlegelv az <strong>egyetlen hatékony eszköz</strong>, 
            mert mindkét oldalról kivonva a kisebb együtthatójú ismeretlent, egy oldalra tereljük az <MathText text="x" />-eket!
          </p>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A STRATÉGIAI RENDEZÉSI ALGORITMUS */}
      <TheorySection
        number={3}
        title="A Rendezés Bevált Stratégiája"
        subtitle="Hogyan vezessük végig a számolást tévedés nélkül? (Tk. 158–159. oldal)"
        badgeColor="sky"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center mb-2">1</span>
            <h5 className="font-bold text-xs text-slate-900 mb-1">Előkészítés</h5>
            <p className="text-xs text-slate-600">
              Bontsd fel a zárójeleket, és végezd el az oldalankénti összevonást!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center mb-2">2</span>
            <h5 className="font-bold text-xs text-slate-900 mb-1">Ismeretlenek egy oldalra</h5>
            <p className="text-xs text-slate-600">
              Vonj ki annyi x-et mindkét oldalból, amennyi a kisebbik oldalon van (pl. <MathText text="/- 2x" />)!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center mb-2">3</span>
            <h5 className="font-bold text-xs text-slate-900 mb-1">Számok a másik oldalra</h5>
            <p className="text-xs text-slate-600">
              Tüntesd el a konstans számot az ismeretlen mellől ellentétes művelettel!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center mb-2">4</span>
            <h5 className="font-bold text-xs text-slate-900 mb-1">Osztás az együtthatóval</h5>
            <p className="text-xs text-slate-600">
              Oszd el mindkét oldalt az x előtt álló számmal (pl. <MathText text="/: 3" />), majd <strong>ellenőrizz</strong>!
            </p>
          </div>
        </div>

        <div className="mt-4">
          <TheoryCard
            title="Mintapélda negatív előjellel: 1 - 4x = 10 - x (Tk. 159. oldal 5. példa)"
            color="sky"
            icon={<Layers className="w-5 h-5" />}
          >
            <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 font-mono text-xs space-y-1.5 text-slate-800">
              <p className="font-bold text-sky-950">
                <MathText text="1 - 4x = 10 - x \quad /+ x" /> (adjunk hozzá x-et, hogy pozitívabbá tegyük a bal oldalt)
              </p>
              <p><MathText text="1 - 3x = 10 \quad /- 1" /> (vonjunk ki 1-et mindkét oldalból)</p>
              <p><MathText text="-3x = 9 \quad /: (-3)" /> (osszuk el a két oldalt (-3)-mal!)</p>
              <p className="font-bold text-emerald-700"><MathText text="x = -3" /></p>
              <p className="text-slate-600 font-sans text-xs pt-1 border-t border-sky-200">
                <strong>Ellenőrzés:</strong> Bal oldal: <MathText text="1 - 4 \cdot (-3) = 1 + 12 = 13" />. Jobb oldal: <MathText text="10 - (-3) = 13" />. Egyenlő! ✓
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: TIPPEK ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Gyakori Csapdák a Mérlegelv Alkalmazásakor"
        subtitle="Mire kell kiemelten figyelni a rendezési lépések során?"
        badgeColor="sky"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="Csapda: Nullával való szorzás vagy osztás"
            bad="Mindkét oldalt megszorozzuk 0-val: 0 · (2x + 5) = 0 · 15 -> 0 = 0"
            good="Nullával soha nem szorzunk és nem osztunk az egyenlet rendezésekor!"
            explanation="Nullával szorozva minden egyenlet 0 = 0 azonossággá válna, így elveszítenénk az eredeti egyenlet valódi megoldáshalmazát. Nullával osztani pedig matematikailag értelmetlen!"
          />

          <TheoryTrapBox
            title="Csapda: Csak az egyik oldalon végezzük el a műveletet"
            bad="3x + 4 = 19 /- 4 esetén felírjuk: 3x = 19"
            good="3x + 4 = 19 /- 4 esetén: 3x = 15 (mindkét oldalból kivontuk a 4-et!)"
            explanation="A mérleg serpenyője azonnal kibillen az egyensúlyból, ha a műveletet csak a bal oldalon hajtjuk végre! A ferde vonal mögötti utasítás mindig MINDKÉT OLDALRA vonatkozik."
          />

          <TheoryTrapBox
            title="Csapda: Előjelhiba negatív együtthatóval való osztáskor"
            bad="-2x = 8 /: (-2) esetén azt írjuk: x = 4"
            good="-2x = 8 /: (-2) esetén a helyes eredmény: x = -4!"
            explanation="Pozitív számot negatív számmal osztva negatív eredményt kapunk (+ : - = -)."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default BalanceScaleTheory;
