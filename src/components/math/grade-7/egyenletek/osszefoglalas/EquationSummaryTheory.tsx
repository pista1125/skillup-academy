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
import {
  BookOpen,
  Calculator,
  Scale,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Equal,
  RotateCcw,
  Check,
  Users,
  Target,
  Trophy,
  ArrowUpDown
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { cn } from '@/lib/utils';

interface EquationSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface StepItem {
  stepNum: number;
  title: string;
  action: string;
  example: string;
}

const sevenSteps: StepItem[] = [
  {
    stepNum: 1,
    title: 'Értelmezés & Alaphalmaz',
    action: 'Rögzítjük az alaphalmazt (A = Q, Z vagy N), és megvizsgáljuk az egyenlet felépítését.',
    example: 'A = \\mathbb{Q}'
  },
  {
    stepNum: 2,
    title: 'Törtek kiküszöbölése',
    action: 'Mindkét oldalt megszorozzuk a nevezők legkisebb közös többszörösével.',
    example: '\\frac{2x - 1}{3} = \\frac{x + 4}{2} \\implies \\cdot 6'
  },
  {
    stepNum: 3,
    title: 'Zárójelek bontása',
    action: 'Felbontjuk a zárójeleket a disztributivitás és az előjelszabályok betartásával.',
    example: '2(2x - 1) = 3(x + 4) \\implies 4x - 2 = 3x + 12'
  },
  {
    stepNum: 4,
    title: 'Oldalankénti összevonás',
    action: 'Mindkét oldalon külön-külön összevonjuk az egynemű algebrai tagokat és számokat.',
    example: '4x - 2 = 3x + 12 \\quad \\text{(már rendezett oldalanként)}'
  },
  {
    stepNum: 5,
    title: 'Rendezés mérlegelvvel',
    action: 'Az ismeretlenes tagokat az egyik oldalra, a puszta számokat a másik oldalra gyűjtjük.',
    example: '4x - 2 = 3x + 12 \\xrightarrow{-3x} x - 2 = 12 \\xrightarrow{+2} x = 14'
  },
  {
    stepNum: 6,
    title: 'Együtthatóval való osztás',
    action: 'Ha az ismeretlen szorzója nem 1, osztunk vele: a \\cdot x = b \\implies x = b / a.',
    example: '1 \\cdot x = 14 \\implies x = 14'
  },
  {
    stepNum: 7,
    title: 'Kötelező ellenőrzés',
    action: 'A kapott gyököt behelyettesítjük az EREDETI egyenlet bal és jobb oldalába külön-külön.',
    example: 'B(14) = \\frac{28 - 1}{3} = 9; \\quad J(14) = \\frac{14 + 4}{2} = 9 \\implies B = J \\quad \\checkmark'
  }
];

export const EquationSummaryTheory: React.FC<EquationSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <TheoryTemplate
      title="VI. Egyenletek – Fejezeti Összefoglalás"
      subtitle="A 7. osztályos egyenletek, mérlegelv, egyenlőtlenségek és szöveges feladatok teljes elméleti és módszertani rendszerezése"
      themeColor="indigo"
      badge="7. OSZTÁLY • MATEMATIKA VI. TÉMAKÖR"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: Alapfogalmak és a Megoldáshalmaz Kimenetelei */}
      <TheorySection
        number={1}
        title="Alapfogalmak és a Megoldáshalmaz Lehetséges Kimenetelei"
        subtitle="Nyitott mondat, alaphalmaz, megoldáshalmaz és a 3 matematikai eset"
        badgeColor="indigo"
        icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <TheoryCard
            title="Nyitott Mondat és Egyenlet"
            icon={<Equal className="w-5 h-5 text-indigo-600" />}
            badge="FOGALOM"
            variant="indigo"
            properties={[
              { label: 'Nyitott mondat', value: 'Változót (ismeretlent) tartalmazó állítás, amelynek igazsága a behelyettesített értéktől függ.' },
              { label: 'Egyenlet', value: 'Két algebrai kifejezés egyenlőségét állító nyitott mondat: Bal oldal = Jobb oldal.' },
              { label: 'Gyök (megoldás)', value: 'Olyan alaphalmazbeli érték, amelyet beírva az egyenlőség igazzá válik.' }
            ]}
          />

          <TheoryCard
            title="Alaphalmaz és Megoldáshalmaz"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
            badge="HALMAZOK"
            variant="purple"
            properties={[
              { label: 'Alaphalmaz (A)', value: 'Azon számok összessége, amelyek közül a megoldást egyáltalán kereshetjük (pl. N, Z, Q).' },
              { label: 'Megoldáshalmaz (M)', value: 'Az alaphalmaz azon részhalmaza, amelynek elemei kielégítik az egyenletet: M ⊆ A.' },
              { label: 'Függés az alaphalmaztól', value: '2x = 7 esetén: ha A = Z, akkor M = ∅; ha A = Q, akkor M = {3,5}.' }
            ]}
          />

          <TheoryCard
            title="A Megoldáshalmaz 3 Esete"
            icon={<Target className="w-5 h-5 text-emerald-600" />}
            badge="KIMENETELEK"
            variant="emerald"
            properties={[
              { label: '1. Egyértelmű gyök', value: 'Pontosan 1 megoldás van az alaphalmazon: M = {x₀}.' },
              { label: '2. Nincs megoldás', value: 'Ellentmondás (pl. 0x = 5): M = ∅ (üres halmaz).' },
              { label: '3. Azonosság', value: 'Végtelen sok megoldás (pl. 0x = 0): M = A (minden alaphalmazbeli elem kielégíti).' }
            ]}
          />
        </div>

        {/* Összehasonlító táblázat */}
        <TheoryTable
          title="A 3 Matematikai Kimenetel Összehasonlítása"
          headers={['Kimenetel típusa', 'Rendezett alak', 'Geometriai / Mérleg modell', 'Megoldáshalmaz (M)']}
          rows={[
            [
              'Egyértelmű megoldás (1 gyök)',
              'a \\cdot x = b \\quad (a \\neq 0)',
              'A mérleg pontosan 1 adott súlynál van egyensúlyban',
              'M = \\left\\{ \\frac{b}{a} \\right\\}'
            ],
            [
              'Ellentmondás (Nincs megoldás)',
              '0 \\cdot x = b \\quad (b \\neq 0) \\implies 0 = b',
              'A mérleg semmilyen x súly mellett sem egyenlíthető ki',
              'M = \\emptyset'
            ],
            [
              'Azonosság (Végtelen sok gyök)',
              '0 \\cdot x = 0 \\implies 0 = 0',
              'A két serpenyő eleve teljesen azonos, bármit teszünk rá',
              'M = A \\quad (\\text{minden szám jó})'
            ]
          ]}
        />
      </TheorySection>

      {/* 2. Szekció: Megoldási Módszerek Fegyvertára */}
      <TheorySection
        number={2}
        title="Megoldási Módszerek Fegyvertára"
        subtitle="Szisztematikus próbálgatás, lebontogatás és a mérlegelv"
        badgeColor="indigo"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <TheoryCard
            title="1. Szisztematikus Próbálgatás"
            icon={<Calculator className="w-5 h-5 text-blue-600" />}
            badge="TÁBLÁZAT"
            variant="blue"
            properties={[
              { label: 'Mikor hasznos?', value: 'Kis egész számok, diszkrét feladványok vagy sejtés megfogalmazásakor.' },
              { label: 'Hogyan csináljuk?', value: 'Értéktáblázatot készítünk: x értékeit növelve vizsgáljuk a bal és jobb oldal eltérését.' },
              { label: 'Korlátja', value: 'Tört vagy nagy szám gyökök esetén lassú, és nem bizonyítja, hogy nincs több megoldás.' }
            ]}
          />

          <TheoryCard
            title="2. Lebontogatás Módszere"
            icon={<RotateCcw className="w-5 h-5 text-amber-600" />}
            badge="FORDÍTOTT MŰVELET"
            variant="amber"
            properties={[
              { label: 'Mikor hasznos?', value: 'Ha az ismeretlen csak a bal oldalon, egyetlen kifejezésben szerepel (pl. 2(3x - 1) + 4 = 22).' },
              { label: 'Hogyan csináljuk?', value: 'A műveleti sorrendet hátulról előre visszacsináljuk: legkülső rétegtől befelé ellentétes művelettel.' },
              { label: 'Előnye', value: 'Nem igényel algebrai zárójelfelbontást vagy törtek közös nevezőre hozását.' }
            ]}
          />

          <TheoryCard
            title="3. A Mérlegelv (Általános)"
            icon={<Scale className="w-5 h-5 text-emerald-600" />}
            badge="UNIVERZÁLIS"
            variant="emerald"
            properties={[
              { label: 'Mikor kötelező?', value: 'Bármilyen elsőfokú egyenletnél, különösen ha az ismeretlen mindkét oldalon szerepel.' },
              { label: 'Ekvivalens átalakítás', value: 'Mindkét oldalhoz ugyanazt adjuk, vonjuk ki, szorozzuk vagy osztjuk (nemnulla számmal).' },
              { label: 'Cél', value: 'A gyökök halmaza nem változik, az egyenlet egyre egyszerűbb alakra jut.' }
            ]}
          />
        </div>

        <TheoryCallout
          variant="indigo"
          title="Mi az az Ekvivalens Átalakítás?"
          icon={<Sparkles className="w-5 h-5" />}
        >
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Egy átalakítás akkor <strong>ekvivalens</strong> (egyenértékű), ha az egyenlet megoldáshalmaza a lépés után pontosan megegyezik az eredetivel: nem veszítünk el meglévő gyököt, és nem hozunk létre hamis (idegen) gyököt sem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
              <span className="font-bold">✓ Ekvivalens lépések:</span> Mindkét oldalhoz ugyanazt a számot/algebrai tagot hozzáadni vagy kivonni; mindkét oldalt ugyanazzal a <strong>nem nulla</strong> számmal megszorozni vagy elosztani.
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300">
              <span className="font-bold">✗ Tilos / Nem ekvivalens:</span> Nullával osztani vagy szorozni; mindkét oldalt ismeretlennel osztani (gyökvesztés veszélye!); páros kitevőre emelni ellenőrzés nélkül.
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szekció: A Mérlegelv 7 Lépéses Algoritmusa (Interaktív léptető) */}
      <TheorySection
        number={3}
        title="A Mérlegelv 7 Lépéses Univerzális Algoritmusa"
        subtitle="A legbonyolultabb törtes-zárójeles egyenletek biztos megoldási receptje"
        badgeColor="indigo"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
      >
        {/* Interaktív Stepper */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Lépésről lépésre: Mintapélda vezetés
            </h4>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              {activeStep + 1} / {sevenSteps.length}. Lépés
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-7 gap-1.5 mb-5">
            {sevenSteps.map((s, idx) => (
              <button
                key={s.stepNum}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  'py-2 px-1 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center gap-0.5',
                  activeStep === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : idx < activeStep
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                <span>{s.stepNum}.</span>
                <span className="text-[9px] hidden sm:inline truncate max-w-full">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {sevenSteps[activeStep].stepNum}. Lépés:
                </span>
                <h5 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">
                  {sevenSteps[activeStep].title}
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {sevenSteps[activeStep].action}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Példa:</span>
              <div className="text-sm sm:text-base font-bold text-indigo-900 dark:text-indigo-200 font-mono">
                <MathText text={sevenSteps[activeStep].example} />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
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
              disabled={activeStep === sevenSteps.length - 1}
              onClick={() => setActiveStep(prev => Math.min(sevenSteps.length - 1, prev + 1))}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
            >
              Következő lépés
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szekció: Szöveges Feladatok 5 Lépéses Modellje */}
      <TheorySection
        number={4}
        title="Szöveges Feladatok 5 Lépéses Modellje"
        subtitle="A valós életbeli problémák lefordítása a matematika nyelvére"
        badgeColor="indigo"
        icon={<Users className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1.5">1</span>
            <h5 className="font-bold text-xs text-amber-950 dark:text-amber-200">Szövegértés</h5>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1">Mit tudunk? Mit keresünk? Adatok és mértékegységek kigyűjtése.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1.5">2</span>
            <h5 className="font-bold text-xs text-indigo-950 dark:text-indigo-200">Ismeretlen (x)</h5>
            <p className="text-[11px] text-indigo-800 dark:text-indigo-300 mt-1">Legkisebb vagy alapul szolgáló adat jelölése x-szel.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1.5">3</span>
            <h5 className="font-bold text-xs text-purple-950 dark:text-purple-200">Egyenletalkotás</h5>
            <p className="text-[11px] text-purple-800 dark:text-purple-300 mt-1">Minden adat kifejezése x-szel, majd egyenlőség felállítása.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1.5">4</span>
            <h5 className="font-bold text-xs text-blue-950 dark:text-blue-200">Mérlegelv</h5>
            <p className="text-[11px] text-blue-800 dark:text-blue-300 mt-1">Az egyenlet formális megoldása a gyök megkeresésére.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1.5">5</span>
            <h5 className="font-bold text-xs text-emerald-950 dark:text-emerald-200">Szöveges Válasz</h5>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">Eredmény behelyettesítése az EREDETI szövegbe + válaszmondat.</p>
          </div>
        </div>

        <TheoryTable
          title="Fő Feladattípusok Modellezési Képletei"
          headers={['Feladattípus', 'Kulcskifejezés a szövegben', 'Algebrai egyenlet minta']}
          rows={[
            [
              'Gondolt számos feladványok',
              'Gondoltam egy számot, növeltem k-val, szoroztam c-vel',
              'c \\cdot (x + k) = E \\implies x = \\frac{E}{c} - k'
            ],
            [
              'Életkoros problémák (táblázat)',
              'K évvel ezelőtt / K év múlva az egyik n-szer annyi idős',
              '(x + K) = n \\cdot (y + K)'
            ],
            [
              'Átrakásos / Kétcsoportos',
              'Egyikből átrakunk k-t a másikba, így egyenlő / arányos lesz',
              '(A - k) = (B + k) \\quad \\text{vagy} \\quad (A - k) = n(B + k)'
            ],
            [
              'Számelméleti (egymást követő)',
              'Három egymást követő egész szám összege S',
              'x + (x + 1) + (x + 2) = 3x + 3 = S'
            ]
          ]}
        />
      </TheorySection>

      {/* 5. Szekció: Egyenlőtlenségek és az Aranyszabály */}
      <TheorySection
        number={5}
        title="Egyenlőtlenségek és a Kritikus Relációjel-Fordítási Szabály"
        subtitle="Mérlegelv relációs jelekkel és a negatív számmal való szorzás/osztás veszélye"
        badgeColor="indigo"
        icon={<ArrowUpDown className="w-5 h-5 text-indigo-600" />}
      >
        <TheoryCallout
          variant="amber"
          title="AZ EGYENLŐTLENSÉGEK ARANYSZABÁLYA"
          icon={<ShieldAlert className="w-5 h-5" />}
        >
          <div className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
            <p>
              Ha egy egyenlőtlenség mindkét oldalát <strong>negatív számmal szorozzuk vagy osztjuk</strong>, a <strong>relációs jel iránya kötelezően megfordul</strong>!
            </p>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 font-mono text-center text-sm">
              <MathText text="-2x < 8 \\quad /:(-2) \\implies x > -4" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic">
              Magyarázat: A számegyenesen a negatív előjellel szorzás tükrözést jelent a 0 körül. Mivel 2 &lt; 5, de -2 &gt; -5, a sorrend automatikusan felcserélődik.
            </p>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="Relációs Jelek és Számegyenes"
            icon={<ArrowRight className="w-5 h-5 text-indigo-600" />}
            badge="JELÖLÉSEK"
            variant="indigo"
            properties={[
              { label: 'Szigorú egyenlőtlenség (<, >)', value: 'A határpont NEM része a megoldásnak: üres karika ◯ a számegyenesen.' },
              { label: 'Megengedő egyenlőtlenség (≤, ≥)', value: 'A határpont RÉSZE a megoldásnak: teli karika ⬤ a számegyenesen.' },
              { label: 'Alaphalmaz szűrő', value: 'x < 3,5 esetén: ha A = N, akkor M = {0, 1, 2, 3}; ha A = Z, végtelen sok negatív szám is megoldás.' }
            ]}
          />

          <TheoryCard
            title="Ekvivalens és Nem Megengedett Lépések"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            badge="ÖSSZEFOGLALÓ"
            variant="emerald"
            properties={[
              { label: 'Szabad lépések', value: 'Mindkét oldalhoz azonos szám hozzáadása, kivonása: relációjel változatlan.' },
              { label: 'Pozitív számmal szorzás/osztás', value: 'Mérlegelv érvényes, a relációs jel NEM fordul meg.' },
              { label: 'Negatív számmal szorzás/osztás', value: 'Mérlegelv érvényes, de a relációs jel KÖTELEZŐEN MEGFORDUL (< ↔ >).' }
            ]}
          />
        </div>
      </TheorySection>

      {/* 6. Szekció: Tipikus Csapdák és Hogyan Kerüld El Őket */}
      <TheorySection
        number={6}
        title="Tipikus Csapdák és Hogyan Kerüld El Őket"
        subtitle="A dolgozatokban leggyakrabban előforduló hibák és elkerülési stratégiájuk"
        badgeColor="indigo"
        icon={<AlertTriangle className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Zárójel előtti negatív előjel elrontása"
            wrong="5 - 2(x - 3) = 5 - 2x - 6 = -1 - 2x"
            correct="5 - 2(x - 3) = 5 - 2x + 6 = 11 - 2x"
            explanation="A -2-vel való beszorzáskor a zárójelben lévő mindkét tag előjele megfordul: (-2) * (-3) = +6!"
          />

          <TheoryTrapBox
            title="2. Csapda: Törtes egyenletnél a törtvonal zárójel hatása"
            wrong="x - \frac{2x - 5}{3} = 4 \implies 3x - 2x - 5 = 12"
            correct="3x - (2x - 5) = 12 \implies 3x - 2x + 5 = 12 \implies x = 7"
            explanation="A törtvonal zárójelként funkcionál! Ha mínusz van a tört előtt, a számláló minden tagjának megfordul az előjele."
          />

          <TheoryTrapBox
            title="3. Csapda: Relációjel megfordításának elmulasztása"
            wrong="-4x \le 12 \implies x \le -3"
            correct="-4x \le 12 \implies x \ge -3"
            explanation="Negatív együtthatóval való osztáskor a ≤ jelből kötelezően ≥ lesz."
          />

          <TheoryTrapBox
            title="4. Csapda: Az ellenőrzés kihagyása vagy a hibás egyenletbe helyettesítés"
            wrong="A kapott x értéket a saját rendezett sorunkba helyettesítjük be."
            correct="A kapott x értéket az EREDETI legelső feladat szövegébe/egyenletébe kell beírni bal és jobb oldalon külön!"
            explanation="Ha a rendezéskor hibáztunk, a rendezett egyenletben a hibás gyök is stimmelne. Csak az eredeti egyenlet buktatja le a hibát!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EquationSummaryTheory;
