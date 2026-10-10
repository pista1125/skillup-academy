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
  Calculator,
  Search,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Sparkles,
  Check,
  Scale,
  Zap,
  Box,
  Key,
  Layers,
  HelpCircle,
  Hash,
  Filter,
  CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface EquationMethodsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface UnwrapStep {
  currentForm: string;
  actionText: string;
  resultValue: string;
  explanation: string;
}

interface UnwrapPreset {
  id: string;
  title: string;
  source: string;
  originalEq: string;
  forwardChain: string[];
  steps: UnwrapStep[];
  finalX: number;
}

const UNWRAP_PRESETS: UnwrapPreset[] = [
  {
    id: 'p1',
    title: 'Munkafüzet 1/a feladat',
    source: 'Mf. 94. oldal 1/a',
    originalEq: '\\frac{5x - 4}{3} = 7',
    forwardChain: ['x', '\\cdot 5', '- 4', ': 3', '= 7'],
    steps: [
      {
        currentForm: '\\frac{5x - 4}{3} = 7',
        actionText: '\\cdot 3 \\text{ (az osztás ellentéte)}',
        resultValue: '5x - 4 = 21',
        explanation: 'Az utolsó elvégzett művelet az osztás volt 3-mal. Ezt szorzással bontjuk le: 7 \\cdot 3 = 21.'
      },
      {
        currentForm: '5x - 4 = 21',
        actionText: '+ 4 \\text{ (a kivonás ellentéte)}',
        resultValue: '5x = 25',
        explanation: 'A 4 kivonását ellentétes művelettel, 4 hozzáadásával szüntetjük meg: 21 + 4 = 25.'
      },
      {
        currentForm: '5x = 25',
        actionText: ': 5 \\text{ (a szorzás ellentéte)}',
        resultValue: 'x = 5',
        explanation: 'Az 5-tel való szorzást 5-tel való osztással bontjuk le: 25 : 5 = 5.'
      }
    ],
    finalX: 5
  },
  {
    id: 'p2',
    title: 'Tankönyv 1/a mintapélda',
    source: 'Tk. 154. oldal 1/a',
    originalEq: '(3x + 8) \\cdot 2 - 5 = 17',
    forwardChain: ['x', '\\cdot 3', '+ 8', '\\cdot 2', '- 5', '= 17'],
    steps: [
      {
        currentForm: '(3x + 8) \\cdot 2 - 5 = 17',
        actionText: '+ 5 \\text{ (kivonás ellentéte)}',
        resultValue: '(3x + 8) \\cdot 2 = 22',
        explanation: 'Utoljára az 5 kivonása történt. Hozzáadunk 5-öt mindkét oldalhoz: 17 + 5 = 22.'
      },
      {
        currentForm: '(3x + 8) \\cdot 2 = 22',
        actionText: ': 2 \\text{ (szorzás ellentéte)}',
        resultValue: '3x + 8 = 11',
        explanation: 'A zárójel 2-vel volt megszorozva. Osztunk 2-vel: 22 : 2 = 11.'
      },
      {
        currentForm: '3x + 8 = 11',
        actionText: '- 8 \\text{ (összeadás ellentéte)}',
        resultValue: '3x = 3',
        explanation: 'Kivonjuk a 8-at a jobb oldalból: 11 - 8 = 3.'
      },
      {
        currentForm: '3x = 3',
        actionText: ': 3 \\text{ (szorzás ellentéte)}',
        resultValue: 'x = 1',
        explanation: 'Osztunk 3-mal: 3 : 3 = 1.'
      }
    ],
    finalX: 1
  },
  {
    id: 'p3',
    title: 'Munkafüzet 2/b feladat (negatív előjel)',
    source: 'Mf. 94. oldal 2/b',
    originalEq: '\\frac{13 - 2x}{3} = 7',
    forwardChain: ['x', '\\cdot (-2)', '+ 13', ': 3', '= 7'],
    steps: [
      {
        currentForm: '\\frac{13 - 2x}{3} = 7',
        actionText: '\\cdot 3',
        resultValue: '13 - 2x = 21',
        explanation: 'Megszorozzuk 3-mal: 7 \\cdot 3 = 21.'
      },
      {
        currentForm: '13 - 2x = 21',
        actionText: '- 13',
        resultValue: '-2x = 8',
        explanation: 'Levonjuk a 13-at: 21 - 13 = 8.'
      },
      {
        currentForm: '-2x = 8',
        actionText: ': (-2)',
        resultValue: 'x = -4',
        explanation: 'Osztunk (-2)-vel: 8 : (-2) = -4. Ügyelj a negatív előjelre!'
      }
    ],
    finalX: -4
  }
];

interface GuessPreset {
  id: string;
  title: string;
  equationStr: string;
  domainName: string;
  domainElements?: number[];
  target: number;
  evalFn: (x: number) => number;
  explanation: string;
  solutions: number[];
}

const GUESS_PRESETS: GuessPreset[] = [
  {
    id: 'g1',
    title: 'Két szám szorzata (Mf. 4. feladat)',
    equationStr: 'x \\cdot (12 - x) = 32',
    domainName: 'Természetes számok (\\mathbb{N})',
    target: 32,
    evalFn: (x) => x * (12 - x),
    explanation: 'A 32 osztópárjai: 1·32, 2·16, 4·8. Csak a 4 és 8 összege 12, így két gyök is van: x = 4 vagy x = 8!',
    solutions: [4, 8]
  },
  {
    id: 'g2',
    title: '10-nél kisebb prímszámok (Tk. 1/b)',
    equationStr: 'x \\cdot (x - 1) = 6',
    domainName: '10-nél kisebb prímek: {2; 3; 5; 7}',
    domainElements: [2, 3, 5, 7],
    target: 6,
    evalFn: (x) => x * (x - 1),
    explanation: 'Behelyettesítve a négy prímértéket: 2·1 = 2, 3·2 = 6 (TALÁLAT!), 5·4 = 20, 7·6 = 42. Megoldás: x = 3.',
    solutions: [3]
  },
  {
    id: 'g3',
    title: 'Téglalap területe (Tk. 7. feladat)',
    equationStr: 'x \\cdot (x + 2) = 168',
    domainName: 'Pozitív egész számok (oldalhossz)',
    target: 168,
    evalFn: (x) => x * (x + 2),
    explanation: 'Két 2-vel eltérő szám szorzata 168. Mivel 10·12 = 120 (kicsi), 12·14 = 168 (PONTOS!). Az oldalak 12 cm és 14 cm.',
    solutions: [12]
  }
];

export const EquationMethodsTheory: React.FC<EquationMethodsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // 1. Unwrapping simulator state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p1');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const activePreset = UNWRAP_PRESETS.find((p) => p.id === selectedPresetId) || UNWRAP_PRESETS[0];

  const handleNextStep = () => {
    if (currentStepIndex < activePreset.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleResetUnwrap = () => {
    setCurrentStepIndex(0);
  };

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setCurrentStepIndex(0);
  };

  // 2. Guess & Check simulator state
  const [selectedGuessId, setSelectedGuessId] = useState<string>('g1');
  const [guessX, setGuessX] = useState<number>(5);

  const activeGuessPreset = GUESS_PRESETS.find((g) => g.id === selectedGuessId) || GUESS_PRESETS[0];
  const guessEval = activeGuessPreset.evalFn(guessX);
  const isMatch = activeGuessPreset.solutions.includes(guessX);
  const diff = guessEval - activeGuessPreset.target;

  return (
    <TheoryTemplate
      title="Egyenletmegoldási módszerek"
      subtitle="Próbálgatás és lebontogatás a 7. osztályos tananyag alapján (Tk. 153–155. o., Mf. 94–95. o.)"
      badgeText="7. OSZTÁLY • V. FEJEZET • 8. LECKE"
      documentId="g7-pct-eq-methods-theory-doc"
      pdfFilename="7_osztaly_egyenletmegoldasi_modszerek.pdf"
      quickRule={{
        label: 'Fontos szabály',
        formula: '(5x - 4) : 3 = 7  ⟹  5x - 4 = 21  ⟹  5x = 25  ⟹  x = 5  •  Bal = Jobb'
      }}
      themeColor="indigo"
      practiceTitle="Készen állsz az egyenletmegoldási feladatokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: ALAPFOGALMAK */}
      <TheorySection
        number={1}
        title="Az Egyenlet Alapfogalmai"
        subtitle="Egyenlet, alaphalmaz, megoldáshalmaz és az ellenőrzés aranyszabálya"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Mi az egyenlet és az ismeretlen?"
            color="indigo"
            icon={<Hash className="w-5 h-5" />}
          >
            <p className="text-sm text-slate-700 mb-2">
              Az <strong>egyenlet</strong> két algebrai kifejezés egyenlőségjellel összekötött kapcsolata, 
              amely legalább egy betűvel jelölt <strong>ismeretlent (változót)</strong> tartalmaz (pl. <MathText text="3x + 5 = 26" />).
            </p>
            <p className="text-sm text-slate-700">
              Az egyenlet megoldása során az ismeretlen azon értékeit keressük, amelyeket behelyettesítve 
              a bal és a jobb oldal értéke megegyezik, azaz <strong>igaz kijelentést</strong> kapunk.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Alaphalmaz és Igazsághalmaz"
            color="sky"
            icon={<Filter className="w-5 h-5" />}
          >
            <p className="text-sm text-slate-700 mb-2">
              • <strong>Alaphalmaz (<MathText text="U" />):</strong> Azon számok összessége, amelyek közül a megoldást kereshetjük 
              (pl. természetes számok <MathText text="\mathbb{N}" />, egészek <MathText text="\mathbb{Z}" />, vagy racionális számok <MathText text="\mathbb{Q}" />). 
              Ha a feladat nem adja meg, az alaphalmaz a tanult számok halmaza.
            </p>
            <p className="text-sm text-slate-700">
              • <strong>Igazsághalmaz / Megoldáshalmaz (<MathText text="M" />):</strong> Az alaphalmaz azon elemei, 
              amelyek kielégítik az egyenletet. Lehet <em>egyelemű</em> (<MathText text="M = \{5\}" />), 
              <em>többelemű</em>, <em>üres halmaz</em> (<MathText text="M = \emptyset" />), vagy akár végtelen sok elemű azonosság.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Az Ellenőrzés Aranyszabálya"
          variant="indigo"
          icon={<CheckCheck className="w-5 h-5 text-indigo-600" />}
        >
          <div className="text-sm space-y-1">
            <p>
              A kapott gyököt <strong>mindig ellenőrizni kell az eredeti egyenletbe való behelyettesítéssel</strong>!
            </p>
            <p className="font-mono text-xs bg-indigo-50 p-2 rounded border border-indigo-200">
              Bal oldal: számold ki a kifejezést x helyére behelyettesítve! &bull; Jobb oldal: számold ki külön! 
              Ha Bal = Jobb, a szám valóban gyök!
            </p>
            <p className="text-xs text-slate-600 italic">
              Szöveges feladat esetén az ellenőrzést mindig a <strong>feladat eredeti szövege</strong> alapján végezzük el!
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: BETŰS KIFEJEZÉSEK FORDÍTÓJA */}
      <TheorySection
        number={2}
        title="A Szöveg Lefordítása Betűs Kifejezésre"
        subtitle="Páros munka a tankönyvből (Tk. 153. oldal) – így válik a magyar mondat egyenletté"
        badgeColor="indigo"
      >
        <TheoryTable
          headers={['Magyar szöveg', 'Algebrai kifejezés', 'Műveleti magyarázat']}
          rows={[
            [
              'Egy szám kétszeresénél 5-tel nagyobb szám',
              '2x + 5',
              'Előbb szorzunk 2-vel, majd hozzáadunk 5-öt.'
            ],
            [
              'Egy számnál 12-vel nagyobb szám háromszorosa',
              '3(x + 12)',
              'Előbb növeljük 12-vel zárójelben, majd a teljes összeget szorozzuk 3-mal!'
            ],
            [
              'Egy szám háromnegyed részének és a számnak az összege',
              '\\frac{3}{4}x + x = \\frac{7}{4}x',
              'A tört részhez hozzáadjuk a teljes egész számot.'
            ],
            [
              'Egy szám ötszörösét elvesszük 100-ból, majd a különbséget megszorozzuk (-4)-gyel',
              '(100 - 5x) \\cdot (-4)',
              'A 100-ból vonjuk ki az 5x-et (nem fordítva!), és a zárójeles különbséget szorozzuk.'
            ],
            [
              'Egy szám 40%-ának 6-szorosához hozzáadjuk a számnál 15-tel kisebb számot',
              '6 \\cdot 0,4x + (x - 15) = 3,4x - 15',
              '0,4x a szám 40%-a, ennek hatszorosa 2,4x, amihez hozzáadjuk az x - 15-öt.'
            ]
          ]}
        />

        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-800 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Fordított irány: Mit jelentenek a kifejezések szavakban?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-indigo-700 text-sm block mb-1">3x + 20</span>
              Egy gondolt szám háromszorosánál 20-szal nagyobb szám.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-indigo-700 text-sm block mb-1">
                <MathText text="\frac{1}{2}x + 14" />
              </span>
              Egy gondolt szám felénél 14-gyel nagyobb szám.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-indigo-700 text-sm block mb-1">
                <MathText text="(60 - x) \cdot 5" />
              </span>
              A 60 és a szám különbségének az ötszöröse.
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A LEBONTOGATÁS MÓDSZERE ÉS INTERAKTÍV GÉP */}
      <TheorySection
        number={3}
        title="A Lebontogatás Módszere (Visszafelé Gondolkodás)"
        subtitle="Amikor az ismeretlen egy láncolt műveletsorban áll – fejtsük le a rétegeket!"
        badgeColor="indigo"
      >
        <p className="text-sm text-slate-700 mb-4">
          A lebontogatás akkor a leghatékonyabb, ha az egyenlet <strong>egyik oldalán az ismeretlen egyetlen kifejezésben</strong> áll, 
          a másik oldalon pedig egyetlen konkrét szám. Ilyenkor a műveleteket <strong>fordított sorrendben, ellenkező művelettel</strong> vonjuk vissza:
        </p>

        {/* INTERAKTÍV LEBONTOGATÓ LABOR */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-2 border-indigo-200 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Interaktív Lebontogató Gép</h4>
                <p className="text-xs text-slate-500">Nézd meg a műveletek oda- és visszairányát lépésről lépésre!</p>
              </div>
            </div>

            {/* Preset gombok */}
            <div className="flex flex-wrap gap-1.5">
              {UNWRAP_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    selectedPresetId === p.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  )}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Egyenlet fejléc */}
          <div className="text-center py-3 bg-white rounded-xl border border-indigo-100 mb-4 shadow-inner">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block mb-1">
              Megoldandó egyenlet ({activePreset.source}):
            </span>
            <span className="text-2xl font-mono font-bold text-indigo-900">
              <MathText text={activePreset.originalEq} />
            </span>
          </div>

          {/* Odafelé lánc vizualizáció */}
          <div className="mb-4 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <span className="text-xs font-semibold text-indigo-800 block mb-2">
              1. Hogyan keletkezett a kifejezés? (Odafelé folyamat):
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {activePreset.forwardChain.map((node, i) => (
                <React.Fragment key={i}>
                  <span className="px-2.5 py-1 bg-white rounded border border-indigo-200 font-bold text-indigo-900 shadow-2xs">
                    <MathText text={node} />
                  </span>
                  {i < activePreset.forwardChain.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Lépésről lépésre visszabontás */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              2. Lebontogatás (Visszafelé ellentétes műveletekkel):
            </span>
            <div className="space-y-2">
              {activePreset.steps.map((step, idx) => {
                const isRevealed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 rounded-xl border transition-all text-xs flex flex-col md:flex-row md:items-center justify-between gap-3',
                      isRevealed
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                        : isCurrent
                        ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200 text-indigo-950 font-medium'
                        : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0',
                          isRevealed
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        )}
                      >
                        {isRevealed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <div>
                        <div className="font-mono font-bold text-sm text-slate-900">
                          <MathText text={step.currentForm} />
                        </div>
                        {isRevealed && (
                          <p className="text-xs text-slate-600 mt-0.5">{step.explanation}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-800 font-mono font-semibold text-xs border border-indigo-200">
                        / <MathText text={step.actionText} />
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span
                        className={cn(
                          'px-3 py-1 rounded-lg font-mono font-bold text-xs',
                          isRevealed
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-slate-200 text-slate-400'
                        )}
                      >
                        {isRevealed ? <MathText text={step.resultValue} /> : '???'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gombok & Eredmény */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-100">
            <div className="flex items-center gap-2">
              {currentStepIndex < activePreset.steps.length ? (
                <Button
                  onClick={handleNextStep}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Következő lebontási lépés ({currentStepIndex + 1} / {activePreset.steps.length})
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  Lebontás kész! Végeredmény: <MathText text={`x = ${activePreset.finalX}`} />
                </div>
              )}

              <Button
                onClick={handleResetUnwrap}
                variant="outline"
                size="sm"
                className="text-xs gap-1 text-slate-600"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Újrakezdés
              </Button>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Ellenőrzés: bal oldal = jobb oldal ✓
            </div>
          </div>
        </div>

        {/* Zárójelfelbontás és összevonás a lebontogatás előtt */}
        <TheoryCard
          title="Zárójelfelbontás és összevonás a lebontogatás előtt (Tk. 154. oldal 2. példa)"
          color="indigo"
          icon={<Layers className="w-5 h-5" />}
        >
          <p className="text-sm text-slate-700 mb-2">
            Ha az ismeretlen több helyen szerepel, vagy zárójelekbe van zárva, előbb <strong>összevonást</strong> és <strong>zárójelfelbontást</strong> kell végeznünk!
          </p>
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 font-mono text-xs space-y-1.5 text-slate-800">
            <p className="font-bold text-indigo-900">
              <MathText text="3(x + 2) + 2(x - 1) - (5 - x) = 11" />
            </p>
            <p>1. Zárójelfelbontás: <MathText text="3x + 6 + 2x - 2 - 5 + x = 11" /> (ügyelj: <MathText text="-(5 - x) = -5 + x" />!)</p>
            <p>2. Összevonás: <MathText text="6x - 1 = 11" /></p>
            <p>3. Lebontogatás: <MathText text="6x = 12 \implies x = 2" />.</p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: A PRÓBÁLGATÁS MÓDSZERE ÉS INTERAKTÍV LABOR */}
      <TheorySection
        number={4}
        title="A Szisztematikus Próbálgatás Módszere"
        subtitle="Mikor és hogyan érdemes próbálgatni? Nem találomra tippelünk, hanem logikusan szűkítünk!"
        badgeColor="indigo"
      >
        <p className="text-sm text-slate-700 mb-4">
          A próbálgatást akkor használjuk, ha az egyenlet <strong>alaphalmaza kevés elemből áll</strong> (pl. 10-nél kisebb prímszámok), 
          vagy az egyenlet <strong>szorzat alakú</strong>, ahol a szorzat tényezőit egész számok osztópárjaiként kereshetjük meg.
        </p>

        {/* INTERAKTÍV PRÓBÁLGATÓ LABOR */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-2 border-indigo-200 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Interaktív Próbálgató Laboratórium</h4>
                <p className="text-xs text-slate-500">Változtasd x értékét és figyeld a bal oldal vs. jobb oldal egyensúlyát!</p>
              </div>
            </div>

            {/* Feladatválasztó */}
            <div className="flex flex-wrap gap-1.5">
              {GUESS_PRESETS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGuessId(g.id);
                    setGuessX(g.id === 'g2' ? 2 : 4);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    selectedGuessId === g.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  )}
                >
                  {g.title}
                </button>
              ))}
            </div>
          </div>

          {/* Egyenlet és Alaphalmaz */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-white rounded-xl border border-indigo-100 text-center">
              <span className="text-xs font-semibold text-slate-400 block mb-1">EGYENLET:</span>
              <span className="text-xl font-mono font-bold text-indigo-900">
                <MathText text={activeGuessPreset.equationStr} />
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-indigo-100 text-center">
              <span className="text-xs font-semibold text-slate-400 block mb-1">ALAPHALMAZ:</span>
              <span className="text-sm font-semibold text-slate-700">
                <MathText text={activeGuessPreset.domainName} />
              </span>
            </div>
          </div>

          {/* Slider az x értékéhez */}
          <div className="mb-5 p-4 bg-white rounded-xl border border-indigo-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-800">
                Próbálkozás értéke: <span className="font-mono text-indigo-700 text-lg">x = {guessX}</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Célérték: {activeGuessPreset.target}
              </span>
            </div>

            {activeGuessPreset.domainElements ? (
              <div className="flex gap-2">
                {activeGuessPreset.domainElements.map((elem) => (
                  <Button
                    key={elem}
                    size="sm"
                    variant={guessX === elem ? 'default' : 'outline'}
                    className={guessX === elem ? 'bg-indigo-600 text-white' : ''}
                    onClick={() => setGuessX(elem)}
                  >
                    x = {elem}
                  </Button>
                ))}
              </div>
            ) : (
              <Slider
                value={[guessX]}
                onValueChange={(vals) => setGuessX(vals[0])}
                min={1}
                max={selectedGuessId === 'g3' ? 20 : 15}
                step={1}
                className="py-2"
              />
            )}
          </div>

          {/* Kiértékelő mérleg doboz */}
          <div
            className={cn(
              'p-4 rounded-xl border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-4',
              isMatch
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50/70 border-amber-200 text-amber-950'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0',
                  isMatch ? 'bg-emerald-600' : 'bg-amber-500'
                )}
              >
                {isMatch ? <CheckCircle2 className="w-6 h-6" /> : <Scale className="w-6 h-6" />}
              </div>
              <div>
                <div className="font-mono text-base font-bold">
                  Bal oldal: {guessEval} &bull; Jobb oldal: {activeGuessPreset.target}
                </div>
                <div className="text-xs mt-0.5 font-medium">
                  {isMatch ? (
                    <span className="text-emerald-700 font-bold">
                      🎉 PONTOS TALÁLAT! Az x = {guessX} megoldása az egyenletnek!
                    </span>
                  ) : diff < 0 ? (
                    <span className="text-amber-800">
                      Túl kicsi a bal oldal ({diff}). Próbálj nagyobb x-et!
                    </span>
                  ) : (
                    <span className="text-amber-800">
                      Túl nagy a bal oldal (+{diff}). Próbálj kisebb x-et!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-xs bg-white/80 px-3 py-2 rounded-lg border border-slate-200/60 max-w-sm text-slate-700">
              <strong>Matematikai indoklás:</strong> {activeGuessPreset.explanation}
            </div>
          </div>
        </div>

        {/* 2jegyű számok és geometria próbálgatása */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Kétjegyű számok felcserélése (Mf. 103. oldal)"
            color="indigo"
            icon={<Hash className="w-5 h-5" />}
          >
            <p className="text-xs text-slate-700 mb-2">
              <em>„A számjegyek összege 11. Ha elvesszük a felcserélt számot, 45-öt kapunk.”</em>
            </p>
            <p className="text-xs text-slate-700">
              Szisztematikus próbálgatás a lehetséges kétjegyű számokkal: 
              <strong>92</strong> (92 - 29 = 63), 
              <strong>83</strong> (83 - 38 = 45 &rarr; <strong>MEGOLDÁS!</strong>), 
              <strong>74</strong> (74 - 47 = 27), 
              <strong>65</strong> (65 - 56 = 9).
            </p>
          </TheoryCard>

          <TheoryCard
            title="Geometriai területek szorzata (Tk. 155. oldal)"
            color="sky"
            icon={<Box className="w-5 h-5" />}
          >
            <p className="text-xs text-slate-700 mb-2">
              <em>„Téglalap területe 168 cm², egyik oldala 2 cm-rel rövidebb: <MathText text="x(x+2) = 168" />.”</em>
            </p>
            <p className="text-xs text-slate-700">
              Mivel a szomszédos négyzetszámok <MathText text="12^2 = 144" /> és <MathText text="13^2 = 169" />, 
              a számok a 12 körül vannak. <MathText text="12 \cdot 14 = 168" /> azonnal adja, hogy a rövidebb oldal 12 cm, a hosszabb 14 cm, a kerület pedig 52 cm!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPPEK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Gyakori Csapdák és Megoldási Útmutató"
        subtitle="Mire kell nagyon figyelni az egyenletek megoldásakor?"
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="Csapda: A műveleti sorrend megfordítása lebontogatáskor"
            bad="x : 3 - 4 = 7 esetén először szorzunk 3-mal, majd hozzáadunk 4-et"
            good="Először a legkülső műveletet vonjuk vissza: először + 4 (x : 3 = 11), majd utána · 3 (x = 33)!"
            explanation="A lebontogatás olyan, mint a hagyma pucolása: kívülről befelé haladunk. A legkésőbb elvégzett műveletet kell legelőször visszacsinálni!"
          />

          <TheoryTrapBox
            title="Csapda: Előjelhiba a zárójel előtt álló mínuszjelnél"
            bad="-(5 - x) = -5 - x"
            good="-(5 - x) = -5 + x"
            explanation="A zárójel előtti negatív előjel minden bent lévő tag előjelét megfordítja!"
          />

          <TheoryTrapBox
            title="Csapda: Megoldás elfogadása az alaphalmazon kívülről"
            bad="Az x = -4 gyököt elfogadjuk, noha a feladat természetes számok (N) halmazán kérte a megoldást"
            good="Megvizsgáljuk, hogy -4 eleme-e az alaphalmaznak: -4 ∉ N, ezért a megoldáshalmaz üres: M = ∅!"
            explanation="Az egyenlet gyöke csak olyan szám lehet, amely benne van a megadott alaphalmazban."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EquationMethodsTheory;
