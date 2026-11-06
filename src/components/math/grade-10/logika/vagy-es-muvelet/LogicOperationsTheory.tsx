import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard
} from '../TheoryTemplate';
import {
  DisjunctionVennSvg,
  ConjunctionVennSvg,
  OlympicLogicSvg,
  DivisibilityVennSvg
} from './LogicOperationsFigures';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  Brain,
  HelpCircle,
  Layers,
  GitFork,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogicOperationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface InteractiveScenario {
  id: string;
  name: string;
  statementA: string;
  statementB: string;
  defaultValA: boolean;
  defaultValB: boolean;
  contextDesc: string;
}

const INTERACTIVE_SCENARIOS: InteractiveScenario[] = [
  {
    id: 'sc-olympic',
    name: 'Kulcsár Győző Olimpiái (1972 és 1976)',
    statementA: 'Kulcsár Győző 1972-ben Münchenben aranyérmet nyert.',
    statementB: 'Kulcsár Győző 1976-ban Montrealban aranyérmet nyert.',
    defaultValA: true,
    defaultValB: false,
    contextDesc: 'Münchenben csapatban aranyat nyert (IGAZ), Montrealban bronzérmet szerzett (HAMIS).'
  },
  {
    id: 'sc-divisibility',
    name: 'A 24-es és 36-os szám oszthatósága',
    statementA: 'A 36 osztható 6-tal.',
    statementB: 'A 36 osztható 8-cal.',
    defaultValA: true,
    defaultValB: false,
    contextDesc: '36/6 = 6 (egész, IGAZ), de 36 nem osztható 8-cal (36/8 = 4,5, HAMIS).'
  },
  {
    id: 'sc-triangle',
    name: 'Derékszögű egyenlő szárú háromszög',
    statementA: 'A háromszög derékszögű (van 90°-os szöge).',
    statementB: 'A háromszög egyenlő szárú (két oldala azonos hosszúságú).',
    defaultValA: true,
    defaultValB: true,
    contextDesc: 'A 45°-45°-90°-os háromszög egyszerre derékszögű ÉS egyenlő szárú is.'
  },
  {
    id: 'sc-dominik',
    name: 'Dominik a futballpályán (Feladatgyűjtemény 1.1.3)',
    statementA: 'Dominik kitűnő pontrúgó.',
    statementB: 'Dominik sikeres a hosszú passzokban.',
    defaultValA: true,
    defaultValB: true,
    contextDesc: 'A feltétel szerint mindkét területen kiváló képességekkel rendelkezik.'
  }
];

export const LogicOperationsTheory: React.FC<LogicOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc-olympic');
  const activeScenario = INTERACTIVE_SCENARIOS.find((s) => s.id === selectedScenarioId) || INTERACTIVE_SCENARIOS[0];

  const [valA, setValA] = useState<boolean>(activeScenario.defaultValA);
  const [valB, setValB] = useState<boolean>(activeScenario.defaultValB);

  const handleSelectScenario = (sc: InteractiveScenario) => {
    setSelectedScenarioId(sc.id);
    setValA(sc.defaultValA);
    setValB(sc.defaultValB);
  };

  const orResult = valA || valB;
  const andResult = valA && valB;
  const notAAndB = !valA && valB;
  const aAndNotB = valA && !valB;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • I. LOGIKA"
      title="3. VAGY művelet, ÉS művelet"
      description="Összetett állítások, a diszjunkció (∨) és konjunkció (∧) művelete, igazságtáblázatok, halmazműveleti párhuzamok és nyelvi kifejezések"
      ruleFormula="A ∨ B (diszjunkció) ≡ A ∪ B   és   A ∧ B (konjunkció) ≡ A ∩ B"
      ruleDescription="A VAGY művelet akkor igaz, ha legalább az egyik állítás igaz. Az ÉS művelet akkor és csak akkor igaz, ha mindkét állítás egyszerre igaz!"
      ruleCard="A DISZJUNKCIÓ ÉS KONJUNKCIÓ ALAPTÖRVÉNYE"
      pdfFileName="10_osztaly_vagy_es_muvelet.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZAKASZ */}
      <TheorySection
        number={1}
        title="Összetett állítások és az olimpiai bajnokok rejtélye"
        badge="BEVEZETÉS"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Eddig különálló kijelentésekkel foglalkoztunk. A matematikában és a mindennapi életben azonban
            a mondatainkat gyakran kötőszavakkal (például <strong className="text-indigo-600 dark:text-indigo-400">„és”</strong>,{' '}
            <strong className="text-purple-600 dark:text-purple-400">„vagy”</strong>, <strong className="text-emerald-600 dark:text-emerald-400">„de”</strong>)
            kapcsoljuk össze. Az így létrejövő kijelentéseket{' '}
            <strong>összetett állításoknak</strong>, a kapcsolást pedig <strong>logikai műveleteknek</strong> nevezzük.
          </p>

          <TheoryCard
            title="Tankönyvi Történet: Miklós és Gyula emlékei"
            subtitle="Kulcsár Győző párbajtőrvívó olimpiai szereplése"
            color="indigo"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Két idős barát felidézi a 70-es évek legendás olimpikonját:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">Miklós emléke (VAGY):</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <em>„Kulcsár Győző a müncheni olimpián VAGY a montreali olimpián aranyérmet nyert.”</em>
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white">
                    IGAZ
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Mivel 1972-ben Münchenben aranyérmet nyert, a VAGY állítás máris teljesült!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <div className="font-bold text-purple-900 dark:text-purple-200 mb-1">Gyula emléke (ÉS):</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <em>„Kulcsár Győző a müncheni olimpián ÉS a montreali olimpián is aranyérmet nyert.”</em>
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-600 text-white">
                    HAMIS
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Montrealban nem nyert aranyat, így az ÉS állítás mindkét része nem áll fent!
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="A Két Emlék Logikai Kiértékelése"
            caption="Figyeld meg a különbséget: a VAGY-hoz elég egyetlen igaz rész, az ÉS-hez mindkettő szükséges!"
            badge="SZEMLÉLTETÉS"
          >
            <OlympicLogicSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ */}
      <TheorySection
        number={2}
        title="A VAGY művelet: Diszjunkció (A ∨ B)"
        badge="DISZJUNKCIÓ"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Két kijelentés VAGY műveletét idegen szóval <strong className="text-purple-600 dark:text-purple-400">diszjunkciónak</strong> nevezzük,
            jele a latin <em>vel</em> (vagy) szóból származó <strong className="text-purple-600 dark:text-purple-400">∨</strong> szimbólum.
          </p>

          <TheoryCard
            title="A Diszjunkció Szigorú Definíciója"
            subtitle="Megengedő vagy (latin: vel)"
            color="purple"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Legyen <span className="font-bold">A</span> és <span className="font-bold">B</span> két tetszőleges állítás.
                Az <strong className="text-purple-600 dark:text-purple-400">A ∨ B</strong> összetett állítás pontosan akkor
                <span className="text-emerald-600 font-bold"> IGAZ</span>, ha az A és B állítások közül{' '}
                <strong className="underline decoration-purple-500">legalább az egyik igaz</strong>.
                Csak abban az egyetlen esetben <span className="text-rose-600 font-bold">HAMIS</span>, ha mindkét állítás hamis!
              </p>
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
                <strong>Halmazműveleti párhuzam:</strong> A diszjunkció pontosan megegyezik a halmazok{' '}
                <strong>uniójával (A ∪ B)</strong>. Egy elem benne van az unióban, ha benne van az A-ban, vagy a B-ben, vagy mindkettőben.
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="A Diszjunkció Halmazelméleti Venn-diagramja"
            caption="A ∨ B területe lefedi az egész A halmazt, az egész B halmazt és a közös metszetet is!"
            badge="UNIÓ"
          >
            <DisjunctionVennSvg />
          </GeometryFigureCard>

          <TheoryTable
            title="A VAGY művelet (Diszjunkció) Igazságtáblázata"
            headers={['A értéke', 'B értéke', 'A ∨ B logikai értéke', 'Megjegyzés']}
            rows={[
              ['IGAZ (1)', 'IGAZ (1)', 'IGAZ (1)', 'Mindkettő teljesül (megengedő vagy!)'],
              ['IGAZ (1)', 'HAMIS (0)', 'IGAZ (1)', 'Az első tag igazolja'],
              ['HAMIS (0)', 'IGAZ (1)', 'IGAZ (1)', 'A második tag igazolja'],
              ['HAMIS (0)', 'HAMIS (0)', 'HAMIS (0)', 'Egyik sem teljesül: ez az egyetlen hamis eset']
            ]}
          />

          <TheoryTrapBox
            title="Fontos Különbség: Megengedő VAGY vs. Kizáró VAGY (XOR)!"
            description="A mindennapi nyelvben a 'vagy' szót olykor kizáró értelemben használjuk (pl. „Fizetsz készpénzzel vagy kártyával?” – itt a kettő közül pontosan egyet választhatsz).
            A matematikában és a formális logikában azonban a VAGY MINDIG MEGENGEDŐ: ha mindkét tag igaz, az egész állítás egyértelműen IGAZ! (Pl. Egerszegi Krisztina nyert a VB-n vagy az olimpián: mindkettőn nyert, így a mondat teljesen IGAZ)."
          />
        </div>
      </TheorySection>

      {/* 3. SZAKASZ */}
      <TheorySection
        number={3}
        title="Az ÉS művelet: Konjunkció (A ∧ B)"
        badge="KONJUNKCIÓ"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Két kijelentés ÉS műveletét idegen szóval <strong className="text-indigo-600 dark:text-indigo-400">konjunkciónak</strong> nevezzük,
            jele a fejjel lefelé fordított v betű: <strong className="text-indigo-600 dark:text-indigo-400">∧</strong>.
          </p>

          <TheoryCard
            title="A Konjunkció Szigorú Definíciója"
            subtitle="Egyidejű teljesülés (latin: coniunctio = összekapcsolás)"
            color="indigo"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Legyen <span className="font-bold">A</span> és <span className="font-bold">B</span> két tetszőleges állítás.
                Az <strong className="text-indigo-600 dark:text-indigo-400">A ∧ B</strong> összetett állítás kizárólag akkor
                <span className="text-emerald-600 font-bold"> IGAZ</span>, ha az A és B állítás{' '}
                <strong className="underline decoration-indigo-500">mindegyike egyszerre igaz</strong>.
                Minden más esetben az állítás <span className="text-rose-600 font-bold">HAMIS</span>!
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
                <strong>Halmazműveleti párhuzam:</strong> A konjunkció pontosan megegyezik a halmazok{' '}
                <strong>metszetével (A ∩ B)</strong>. Csak azok az elemek tartoznak ide, amelyek mindkét halmaznak egyszerre elemei.
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="A Konjunkció Halmazelméleti Venn-diagramja"
            caption="A ∧ B területe kizárólag a két halmaz közös átfedését (metszetét) jelenti!"
            badge="METSZET"
          >
            <ConjunctionVennSvg />
          </GeometryFigureCard>

          <TheoryTable
            title="Az ÉS művelet (Konjunkció) Igazságtáblázata"
            headers={['A értéke', 'B értéke', 'A ∧ B logikai értéke', 'Megjegyzés']}
            rows={[
              ['IGAZ (1)', 'IGAZ (1)', 'IGAZ (1)', 'Egyetlen igaz eset: mindkét feltétel teljesül'],
              ['IGAZ (1)', 'HAMIS (0)', 'HAMIS (0)', 'B nem teljesül, ezért elbukik'],
              ['HAMIS (0)', 'IGAZ (1)', 'HAMIS (0)', 'A nem teljesül, ezért elbukik'],
              ['HAMIS (0)', 'HAMIS (0)', 'HAMIS (0)', 'Egyik sem teljesül']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. SZAKASZ */}
      <TheorySection
        number={4}
        title="Nyelvi fordulatok: A „de” kötőszó rejtett ÉS művelete"
        badge="NYELVI BUKTATÓK"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A mindennapi magyar beszédben rengeteg olyan kötőszót használunk, amelyek logikailag pontosan
            az <strong className="text-indigo-600 dark:text-indigo-400">ÉS műveletnek</strong> felelnek meg.
            Ezek felismerése elengedhetetlen az érettségi és felvételi feladatokban!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                A „de” kötőszó ≡ ÉS művelet
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Példa a tankönyvből: <em>„Ez az állat ragadozó, de nem védett.”</em>
                <br />
                Logikai jelekkel: <strong className="text-indigo-600 dark:text-indigo-400">B ∧ ¬C</strong>
                <br />
                A mondat azt állítja, hogy az állat ragadozó ÉS ezzel egy időben nem védett.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                „valamint”, „illetve”, „ugyanakkor”, „továbbá”
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mindegyik azt követeli meg, hogy a kapcsolódó részek egyszerre teljesüljenek.
                <br />
                Példa: <em>„Dominik pontosan passzol, ugyanakkor jól lő.”</em> ≡ <strong className="text-indigo-600 dark:text-indigo-400">A ∧ B</strong>.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ */}
      <TheorySection
        number={5}
        title="Számelméleti és geometriai összetett állítások"
        badge="ALKALMAZÁSOK"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Gyakran találkozunk olyan matematikai tételekkel és feladatokkal, ahol oszthatósági szabályokat vagy
            geometriai tulajdonságokat kapcsolunk össze. Nézzük meg a hivatalos tankönyvi példákat!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">„24 osztható 3-mal vagy 4-gyel.”</div>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                24/3 = 8 (I) és 24/4 = 6 (I). Mivel mindkét rész igaz, az összetett diszjunkció: <strong className="text-emerald-600">IGAZ (I ∨ I = I)</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">„36 osztható 6-tal és 8-cal.”</div>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                36/6 = 6 (I), de 36/8 = 4,5 (H). Mivel az egyik feltétel elbukott: <strong className="text-rose-600">HAMIS (I ∧ H = H)</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">„48 osztható 12-vel vagy 15-tel.”</div>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                48/12 = 4 (I), 48/15 nem egész (H). A VAGY-nál elég egy igaz: <strong className="text-emerald-600">IGAZ (I ∨ H = I)</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">KLM háromszög (egyenlő szárú és derékszögű)</div>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                A = derékszögű, B = egyenlő szárú. Ha mindkettő teljesül, a háromszög 45°-45°-90°-os.
              </p>
            </div>
          </div>

          <GeometryFigureCard
            title="Tankönyvi Oszthatósági Halmazok Venn-diagramja"
            caption="A {12, 15, 21, 32, 35, 36} halmaz számainak besorolása a 2-vel, 3-mal és 5-tel oszthatóság metszeteibe!"
            badge="OSZTHATÓSÁG"
          >
            <DivisibilityVennSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ */}
      <TheorySection
        number={6}
        title="Logikai rejtvények: Igazmondók és hazugok"
        badge="REJTVÉNYEK"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A logikai műveletek igazi erejét az összetett következtetési feladatokban és versenyfeladványokban
            láthatjuk meg. Vizsgáljuk meg a tankönyv klasszikus 3 jóbarát feladványát!
          </p>

          <TheoryCard
            title="A Három Jóbarát Rejtvénye (Tankönyv 18. oldal)"
            subtitle="Tóni, Jakab és Samu megszólalásai"
            color="emerald"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
                <div>• <strong>Tóni:</strong> „Ne hallgass Jakabra, mert ő hazudik!”</div>
                <div>• <strong>Jakab:</strong> „Vigyázz Samuval, mert ő nem mond igazat!”</div>
                <div>• <strong>Samu:</strong> „Dehogy! Mind igazat beszélünk!”</div>
              </div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 pt-1">
                Ki mond igazat, és ki hazudik?
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                1. Samu kijelentése (<em>„Mind igazat beszélünk”</em>) lehetetlen, hiszen Tóni és Jakab egymást vádolják hazugsággal. Tehát <strong>Samu biztosan hazudik</strong>!
                <br />
                2. Mivel Samu hazudik, <strong>Jakab igazat mondott</strong>, amikor arra figyelmeztetett, hogy Samu nem mond igazat!
                <br />
                3. Mivel Jakab igazat mond, Tóni kijelentése (<em>„Jakab hazudik”</em>) hamis, tehát <strong>Tóni hazudik</strong>!
                <br />
                <strong>Összegzés:</strong> Kizárólag Jakab mond igazat, Tóni és Samu hazudik!
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: INTERAKTÍV LABOR A TANANYAG LEGÉGÉN */}
      <TheorySection
        number={7}
        title="Interaktív Logikai Művelet és Igazságérték Labor"
        badge="GYAKORLÓ LABOR"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Válassz egyet a tankönyvi és feladatgyűjteményi szituációk közül, vagy állítsd be szabadon az
            <strong> A</strong> és <strong>B</strong> állítások igazságértékét! Figyeld meg valós időben a
            diszjunkció (∨) és a konjunkció (∧) eredményét!
          </p>

          {/* Scenario selector tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {INTERACTIVE_SCENARIOS.map((sc) => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className={`text-left p-2.5 rounded-xl border transition-all text-xs font-medium ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.01]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-purple-400'
                  }`}
                >
                  <div className="font-semibold line-clamp-1">{sc.name}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                    Tankönyvi példa
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Playground Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/60 shadow-sm space-y-5">
            {/* Context description */}
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
              <span className="font-bold">Kontextus:</span> {activeScenario.contextDesc}
            </div>

            {/* Toggle Controls for A and B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Card A */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">
                    A állítás
                  </span>
                  <button
                    onClick={() => setValA(!valA)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                      valA ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {valA ? 'IGAZ (1)' : 'HAMIS (0)'}
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 italic">
                  „{activeScenario.statementA}”
                </div>
              </div>

              {/* Card B */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400">
                    B állítás
                  </span>
                  <button
                    onClick={() => setValB(!valB)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                      valB ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {valB ? 'IGAZ (1)' : 'HAMIS (0)'}
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 italic">
                  „{activeScenario.statementB}”
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* A or B */}
              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center space-y-1">
                <div className="text-xs font-bold text-purple-900 dark:text-purple-200">
                  A ∨ B (Diszjunkció)
                </div>
                <div className={`text-base font-black ${orResult ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {orResult ? 'IGAZ (1)' : 'HAMIS (0)'}
                </div>
                <p className="text-[10px] text-slate-500">
                  {orResult ? 'Legalább az egyik igaz' : 'Mindkét tag hamis'}
                </p>
              </div>

              {/* A and B */}
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
                <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  A ∧ B (Konjunkció)
                </div>
                <div className={`text-base font-black ${andResult ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {andResult ? 'IGAZ (1)' : 'HAMIS (0)'}
                </div>
                <p className="text-[10px] text-slate-500">
                  {andResult ? 'Mindkettő egyszerre igaz' : 'Legalább az egyik hamis'}
                </p>
              </div>

              {/* A and not B */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  A ∧ ¬B („A, de nem B”)
                </div>
                <div className={`text-base font-black ${aAndNotB ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {aAndNotB ? 'IGAZ (1)' : 'HAMIS (0)'}
                </div>
                <p className="text-[10px] text-slate-500">
                  A teljesül, de B nem
                </p>
              </div>

              {/* not A and B */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  ¬A ∧ B („Nem A, de B”)
                </div>
                <div className={`text-base font-black ${notAAndB ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {notAAndB ? 'IGAZ (1)' : 'HAMIS (0)'}
                </div>
                <p className="text-[10px] text-slate-500">
                  A nem teljesül, de B igen
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
