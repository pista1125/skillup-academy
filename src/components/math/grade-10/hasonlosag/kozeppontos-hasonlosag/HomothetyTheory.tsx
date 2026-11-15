import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  CircleHomothetySvg,
  CircleTouchingDilationSvg,
  InvariantLinesSvg,
  AngleInterceptThalesSvg,
  PyramidDilationSvg
} from './HomothetyFigures';
import {
  Compass,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Check,
  X,
  Maximize2,
  Layers,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomothetyTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface Scenario {
  id: string;
  pairName: string;
  isHomothetic: boolean;
  explanation: string;
  source: string;
  rule: string;
}

const scenarios: Scenario[] = [
  {
    id: 'sc1',
    pairName: 'Bármely két egy síkban fekvő kör',
    isHomothetic: true,
    explanation: 'A kör teljesen forgásszimmetrikus. A két kör középpontjait összekötő centrális egyenesen mindig létezik külső (H_k) és belső (H_b) hasonlósági pont (r₁ ≠ r₂ esetén).',
    source: 'Körök középpontos hasonlósága',
    rule: 'MINDIG KÖZÉPPONTOSAN HASONLÓK'
  },
  {
    id: 'sc2',
    pairName: 'Bármely két nem egybevágó négyzet',
    isHomothetic: false,
    explanation: 'Minden négyzet hasonló egymáshoz, de KÖZÉPPONTOSAN csak akkor, ha megfelelő oldalaik párhuzamosak! Ha az egyik négyzet el van forgatva, nincs közös centrum.',
    source: 'Sokszögek párhuzamossági feltétele',
    rule: 'CSAK PÁRHUZAMOS OLDALAK ESETÉN'
  },
  {
    id: 'sc3',
    pairName: 'Bármely két gömb a térben',
    isHomothetic: true,
    explanation: 'A gömbök minden irányban szimmetrikusak, így a középpontjaikat összekötő egyenesen lévő pontokból mindig középpontosan átvihetők egymásba.',
    source: 'Térbeli gömbök hasonlósága',
    rule: 'MINDIG KÖZÉPPONTOSAN HASONLÓK'
  },
  {
    id: 'sc4',
    pairName: 'Bármely két nem egybevágó kocka',
    isHomothetic: false,
    explanation: 'A négyzetekhez hasonlóan a kockák csak akkor középpontosan hasonlók a térben, ha az éleik iránya megegyezik (nincsenek térben elforgatva).',
    source: 'Térbeli poliéderek hasonlósága',
    rule: 'CSAK PÁRHUZAMOS ÉLEK ESETÉN'
  },
  {
    id: 'sc5',
    pairName: 'Szögszárakat metsző háromszögek (△OAD és △OBE)',
    isHomothetic: true,
    explanation: 'Az O csúcsú szög szárait párhuzamos szelők metszik. A háromszögek csúcsai O-ból induló sugarakon vannak, megfelelő oldalaik párhuzamosak, így középpontosan hasonlók.',
    source: 'Párhuzamos szelők és háromszögek',
    rule: 'KÖZÉPPONTOSAN HASONLÓK O-BÓL'
  },
  {
    id: 'sc6',
    pairName: 'Szögszárakat metsző trapézok (ABED és BCFE)',
    isHomothetic: false,
    explanation: 'Bár a trapézok alapjai párhuzamosak, az O csúcsból nézve a felső és alsó alap távolságaránya nem azonos. Egyetlen pontból nem vihetők át egymásba.',
    source: 'Szögszárakat metsző trapézok',
    rule: 'NEM KÖZÉPPONTOSAN HASONLÓK'
  }
];

export const HomothetyTheory: React.FC<HomothetyTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív modul 1 állapota (Kör konfiguráció választó)
  const [circlePreset, setCirclePreset] = useState<'separate' | 'touching' | 'concentric'>('separate');

  // Interaktív modul 2 állapota (Kiválasztott szcenárió)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc1');

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <TheoryTemplate
      title="2. Középpontos hasonlóság"
      subtitle="Fixpontok, fixegyenesek, invarianciák, körök és térbeli testek hasonlósága"
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="orange"
      pdfExportId="grade10-homothety-theory"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — KÖZÉPPONTOS HASONLÓSÁG ALAPTÉTELEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80">
              <span className="text-xs font-black text-orange-900 dark:text-orange-200 block mb-1">
                ✓ Fixelemek és egyenesek képe (λ ≠ 1 esetén):
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-black text-orange-900 dark:text-orange-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-orange-300">
                  Fixpont: csak O (O&apos; = O)
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-orange-300">
                  Fixegyenes: O ∈ e (e&apos; = e)
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Nem fixegyenesek:</strong> Ha $O \notin e$, akkor az egyenes képe vele párhuzamos egyenes ($e&apos; \parallel e$).
              </li>
              <li>
                <strong>Körök a síkon:</strong> Bármely két síkbeli kör ($r_1 \neq r_2$) középpontosan hasonló (külső $H_k$ és belső $H_b$ hasonlósági ponttal).
              </li>
              <li>
                <strong>Sokszögek feltétele:</strong> Két hasonló sokszög csak akkor <em>középpontosan</em> hasonló, ha megfelelő oldalaik párhuzamosak!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. FEJEZET */}
      <TheorySection
        title="1. Fixpontok és Fixegyenesek a Középpontos Hasonlóságban"
        icon={<Compass className="w-5 h-5 text-orange-500" />}
      >
        <TheoryCard title="Mely geometriai elemek maradnak helyben?" variant="normal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy geometriai transzformáció vizsgálatakor a legfontosabb kérdés: vannak-e olyan pontok vagy alakzatok,
            amelyeket a művelet helyben hagy? A középpontos hasonlóság esetében alapvető különbséget kell tennünk
            a <strong>fixpontok</strong> (pontok, amelyek nem mozdulnak el) és a <strong>fixegyenesek</strong> (egyenesek, amelyek önmagukba képződnek le) között.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                <h5 className="font-bold text-xs text-amber-900 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  A Centrum az Egyetlen Fixpont (λ ≠ 1)
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Ha <MathText text="\lambda \neq 1" />, a sík egyetlen pontja sem maradhat helyben, kivéve az <MathText text="O" /> centrumot.
                  Hiszen <MathText text="|OP'| = |\lambda| \cdot |OP|" />, és <MathText text="|OP| = |\lambda| \cdot |OP|" /> csak akkor lehetséges,
                  ha <MathText text="|OP| = 0" />, vagyis <MathText text="P = O" />!
                </p>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900">
                <h5 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Fixegyenesek vs. Pontonként Fix Egyenesek
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Bármely egyenes, amely átmegy az <MathText text="O" /> ponton, <strong>fixegyenes</strong>, mert minden pontjának képe is az egyenesen fekszik.
                  Azonban ez az egyenes <strong>nem pontonként fix</strong>: a pontok az egyenes mentén elmozdulnak (<MathText text="P \mapsto P'" />),
                  egyetlenegy pontot, az <MathText text="O" /> pontot kivéve.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <InvariantLinesSvg size={280} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. FEJEZET */}
      <TheorySection
        title="2. Körök Középpontos Hasonlósága és Közös Érintői"
        icon={<Sparkles className="w-5 h-5 text-orange-500" />}
      >
        <TheoryCard title="Miért hasonlít egymásra bármely két kör a síkban?" variant="highlight">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-xs sm:text-sm">
            Alapvető geometriai összefüggés, hogy bármely két, egymástól különböző sugarú síkbeli kör
            mindig középpontosan hasonló egymáshoz! A két kör középpontjait összekötő <strong>centrális egyenesen</strong> mindig megtalálható
            a két kitüntetett hasonlósági centrum:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <CircleHomothetySvg size={280} />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-amber-600 mb-1">
                  1. Külső Hasonlósági Pont (H_k)
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  A két kör külső közös érintőinek metszéspontja a centrálison. A hasonlósági arány <strong>pozitív</strong>:
                  <MathText text="\lambda = \frac{r_2}{r_1} > 0" />.
                  A két kör egyállású, a sugarak párhuzamosak és azonos irányúak.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-rose-600 mb-1">
                  2. Belső Hasonlósági Pont (H_b)
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  A két kör belső közös érintőinek metszéspontja az <MathText text="O_1 O_2" /> szakaszon. A hasonlósági arány <strong>negatív</strong>:
                  <MathText text="\lambda = -\frac{r_2}{r_1} < 0" />.
                  A körök egymáshoz képest átfordulnak.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-900 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 text-xs text-slate-700 dark:text-slate-300">
              <h5 className="font-bold text-sky-900 dark:text-sky-300 text-sm mb-1">
                Különleges eset: Centrum a körvonalon
              </h5>
              <p className="leading-relaxed">
                Ha a hasonlósági centrumot (<MathText text="O" />) a körvonalon vesszük fel, és <MathText text="\lambda = 0{,}5" /> aránnyal kicsinyítünk,
                akkor a képi kör sugara feleakkora lesz, és a két kör az <MathText text="O" /> pontban <strong>belülről érinti egymást</strong>,
                közös érintővel az <MathText text="O" /> pontban!
              </p>
            </div>
            <CircleTouchingDilationSvg size={200} />
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. FEJEZET */}
      <TheorySection
        title="3. Hasonlóság vs. Középpontos Hasonlóság (Párhuzamosság elve)"
        icon={<Maximize2 className="w-5 h-5 text-orange-500" />}
      >
        <TheoryCard title="Miért nem minden négyzet középpontosan hasonló?" variant="normal">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            Gyakori fogalmi tévedés, hogy összekeverjük az általános <strong>hasonlóságot</strong> és a szigorúbb <strong>középpontos hasonlóságot</strong>.
            Az alábbi alapvető ellenpéldák világosan megmutatják a különbséget:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-500" />
                Négyzetek és Kockák esete
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bár <em>minden négyzet hasonló</em> egymáshoz (arányaik azonosak), <strong>nem minden két négyzet középpontosan hasonló</strong>!
                Ha az egyik négyzet el van forgatva a másikhoz képest, az oldalaik nem párhuzamosak, így nincs olyan pont a síkban,
                amiből sugárirányban átvihetők lennének egymásba.
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Körök és Gömbök esete
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A körök és gömbök végtelen sok szimmetriatengellyel rendelkeznek, így náluk nem beszélhetünk „elforgatott” állásról:
                bármely két gömb vagy két kör <strong>mindig középpontosan hasonló</strong> a centrálisuk megfelelő pontjaiból!
              </p>
            </div>
          </div>

          <TheoryCallout
            title="A Szögszárakat Metsző Trapézok Cáfolata"
            variant="warning"
          >
            Az <MathText text="O" /> csúcsú szög szárait párhuzamosokkal metszve a keletkező <MathText text="\triangle OAD" /> és <MathText text="\triangle OBE" /> háromszögek
            középpontosan hasonlók az <MathText text="O" />-ból.
            Viszont az <MathText text="ABED" /> és <MathText text="BCFE" /> trapézok <strong>NEM középpontosan hasonlók az O-ból</strong>,
            mert az alapjaik és száraik nem a megfelelő arányban távolodnak az <MathText text="O" /> ponttól!
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* 4. FEJEZET */}
      <TheorySection
        title="4. Térbeli Testek és Gúlák Nagyítása"
        icon={<Scale className="w-5 h-5 text-orange-500" />}
      >
        <TheoryCard title="Szabályos gúla nagyítása az E csúcsból" variant="normal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-2.5">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha az <MathText text="ABCDE" /> szabályos négyoldalú gúlát az <MathText text="E" /> csúcsából középpontosan nagyítjuk,
                az alapterület a hasonlósági arány négyzetével (<MathText text="\lambda^2" />), az oldallapok kerülete pedig magával az aránnyal (<MathText text="\lambda" />) szorzódik:
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">λ = 2 nagyítás:</span>
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300">T' = 4 · T_alap (2²), K' = 2 · K</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">λ = 8 nagyítás:</span>
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300">T' = 64 · T_alap (8²), K' = 8 · K</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">λ = 100 nagyítás:</span>
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300">T' = 10 000 · T_alap, K' = 100 · K</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">λ = √2 nagyítás:</span>
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300">T' = 2 · T_alap, K' = √2 · K</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <PyramidDilationSvg size={280} scaleRatio={2} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. FEJEZET: INTERAKTÍV LABORATÓRIUMOK */}
      <TheorySection
        title="5. Interaktív Laboratóriumok és Példatár"
        icon={<Zap className="w-5 h-5 text-orange-500" />}
      >
        {/* INTERAKTÍV MODUL 1: KÖRÖK HASONLÓSÁGI PONTJAI */}
        <TheoryCard title="Laboratórium I: Körök Hasonlósági Centrum Kereső" variant="highlight">
          <p className="text-slate-700 dark:text-slate-300 mb-4 text-xs sm:text-sm">
            Válassz egy elrendezést az alábbi gombokkal, és vizsgáld meg, hol helyezkedik el a körök külső (<MathText text="H_k" />) és belső (<MathText text="H_b" />) hasonlósági pontja!
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              size="sm"
              variant={circlePreset === 'separate' ? 'default' : 'outline'}
              onClick={() => setCirclePreset('separate')}
              className={`text-xs font-bold h-8 rounded-xl ${
                circlePreset === 'separate'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Két Különálló Kör (H_k és H_b)
            </Button>
            <Button
              size="sm"
              variant={circlePreset === 'touching' ? 'default' : 'outline'}
              onClick={() => setCirclePreset('touching')}
              className={`text-xs font-bold h-8 rounded-xl ${
                circlePreset === 'touching'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Centrum a Körvonalon (Belső Érintés)
            </Button>
            <Button
              size="sm"
              variant={circlePreset === 'concentric' ? 'default' : 'outline'}
              onClick={() => setCirclePreset('concentric')}
              className={`text-xs font-bold h-8 rounded-xl ${
                circlePreset === 'concentric'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Invariáns Egyenesek & Fixpont
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              {circlePreset === 'separate' && <CircleHomothetySvg size={300} />}
              {circlePreset === 'touching' && <CircleTouchingDilationSvg size={300} />}
              {circlePreset === 'concentric' && <InvariantLinesSvg size={300} />}
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-orange-600 block mb-1">
                  {circlePreset === 'separate' && 'Két kör kettős hasonlósága:'}
                  {circlePreset === 'touching' && 'Körvonalra illeszkedő centrum:'}
                  {circlePreset === 'concentric' && 'Fixpont és egyenesek:'}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {circlePreset === 'separate' &&
                    'A külső érintők metszéspontja H_k (pozitív arány: azonos állású sugárirányok). A belső érintők metszéspontja H_b (negatív arány: a sugarak 180°-kal átfordulnak).'}
                  {circlePreset === 'touching' &&
                    'Mivel az O centrum a körvonalon van, O = O\' mindkét kör közös pontja. Az O-beli érintő közös érintő, így a két kör belülről érinti egymást.'}
                  {circlePreset === 'concentric' &&
                    'Az O-n átmenő egyenesek mind fixegyenesek (irányuk állandó). Bármely más egyenes képe párhuzamos az eredetivel.'}
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* INTERAKTÍV MODUL 2: PÉLDATÁR */}
        <div className="mt-6">
          <TheoryCard title="Laboratórium II: Geometriai Cáfolatok & Döntési Mátrix" variant="highlight">
            <p className="text-slate-700 dark:text-slate-300 mb-3 text-xs sm:text-sm">
              Kattints az alábbi geometriai alakzatpárokra a középpontos hasonlóság feltételeinek ellenőrzéséhez!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border ${
                    selectedScenarioId === sc.id
                      ? 'bg-orange-600 text-white border-orange-700 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-400'
                  }`}
                >
                  <div className="truncate font-semibold">{sc.pairName}</div>
                  <div
                    className={`text-[10px] truncate ${
                      selectedScenarioId === sc.id
                        ? 'text-orange-100'
                        : sc.isHomothetic
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-500'
                    }`}
                  >
                    {sc.isHomothetic ? '✓ Középpontosan hasonló' : '✗ Nem feltétlenül'}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Forrás: {activeScenario.source}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
                    activeScenario.isHomothetic
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {activeScenario.isHomothetic ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {activeScenario.rule}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Matematikai indoklás:</strong> {activeScenario.explanation}
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default HomothetyTheory;

