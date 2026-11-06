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
  ImplicationVennSvg,
  SufficientNecessarySvg,
  TruthTableImplicationSvg,
  EquivalenceParallelogramSvg
} from './ImplicationFigures';
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
  ArrowRightLeft,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImplicationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface ExampleCase {
  id: string;
  name: string;
  statementA: string;
  statementB: string;
  forwardTrue: boolean;
  forwardExplanation: string;
  reverseTrue: boolean;
  reverseExplanation: string;
  counterexample?: string;
  isEquivalence: boolean;
}

const exampleCases: ExampleCase[] = [
  {
    id: 'div6-3',
    name: 'Oszthatóság 6-tal és 3-mal (Tankönyv 24. o.)',
    statementA: 'Egy egész szám osztható 6-tal.',
    statementB: 'Egy egész szám osztható 3-mal.',
    forwardTrue: true,
    forwardExplanation: 'Mivel 6 = 2 · 3, minden 6-tal osztható szám szükségképpen 3-mal is osztható.',
    reverseTrue: false,
    reverseExplanation: 'Nem minden 3-mal osztható szám osztható 6-tal is.',
    counterexample: 'A 9, 15, 21 vagy 27 osztható 3-mal, de nem páros, így 6-tal nem osztható!',
    isEquivalence: false
  },
  {
    id: 'quad-para-trap',
    name: 'Paralelogramma és Trapéz (Tankönyv 24. o.)',
    statementA: 'Egy négyszög paralelogramma.',
    statementB: 'Egy négyszög trapéz.',
    forwardTrue: true,
    forwardExplanation: 'Minden paralelogramma rendelkezik legalább egy párhuzamos oldalpárral (sőt kettővel), így trapéz.',
    reverseTrue: false,
    reverseExplanation: 'Nem minden trapéz paralelogramma.',
    counterexample: 'Egy szimmetrikus húrtrapéznak vagy derékszögű trapéznak csak egyetlen párhuzamos oldalpárja van!',
    isEquivalence: false
  },
  {
    id: 'reg-triangle',
    name: 'Szabályos háromszög és 60°-os szögek',
    statementA: 'A háromszög szabályos (minden oldala egyenlő).',
    statementB: 'A háromszög minden belső szöge 60°-os.',
    forwardTrue: true,
    forwardExplanation: 'Szabályos háromszögben minden oldal és szög egyenlő: 180° / 3 = 60°.',
    reverseTrue: true,
    reverseExplanation: 'Ha minden szög 60°, a háromszög egyenlőszögű, következésképp egyenlő oldalú (szabályos).',
    counterexample: 'Nincs ellenpélda, a két állítás egymást kölcsönösen meghatározza!',
    isEquivalence: true
  },
  {
    id: 'sym-reg-triangle',
    name: 'Tengelyes szimmetria és Szabályos háromszög (Tankönyv 24. o.)',
    statementA: 'A háromszög tengelyesen szimmetrikus.',
    statementB: 'A háromszög szabályos.',
    forwardTrue: false,
    forwardExplanation: 'Attól, hogy egy háromszögnek van szimmetriatengelye, még nem kell szabályosnak lennie.',
    reverseTrue: true,
    reverseExplanation: 'Minden szabályos háromszögnek van szimmetriatengelye (pontosan három is).',
    counterexample: 'Egyenlő szárú, de nem szabályos háromszög (pl. 4 cm, 4 cm, 6 cm oldalak).',
    isEquivalence: false
  }
];

export const ImplicationTheory: React.FC<ImplicationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>('div6-3');
  const activeExample = exampleCases.find(e => e.id === selectedExampleId) || exampleCases[0];

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • I. LOGIKA"
      title="5. Állítás és megfordítása"
      description="A feltételes következtetés (implikáció), állítások megfordítása, szükséges és elégséges feltételek, valamint az ekvivalencia"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: A "Ha..., akkor..." Állítás (Implikáció) */}
      <TheorySection
        title="1. A feltételes állítás: Implikáció (A ⇒ B)"
        subtitle="A matematikai tételek és definíciók leggyakoribb megfogalmazási formája"
        badge="Alapfogalom"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              A mindennapi életben és a matematikában a következtetéseket leggyakrabban a{' '}
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">„Ha..., akkor...”</strong>{' '}
              szerkezettel fejezzük ki. Ha két egyszerű kijelentést ($A$ és $B$) ezzel a kötőszópárral
              kapcsolunk össze, egy új összetett állítást kapunk, amelyet{' '}
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">implikációnak</strong>{' '}
              nevezünk.
            </p>

            <TheoryCard title="Az implikáció szerkezete és jelölése" color="blue">
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 font-mono text-center text-sm font-bold text-blue-900 dark:text-blue-200">
                  A ⇒ B &nbsp;&nbsp;(vagy&nbsp;&nbsp;A → B)
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-blue-600 dark:text-blue-400">A (Előtag / Feltétel):</strong>
                    <br />Amiből kiindulunk („Ha A igaz...”)
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-indigo-600 dark:text-indigo-400">B (Utótag / Következmény):</strong>
                    <br />Amire következtetünk („...akkor B is igaz”)
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout title="Mikor igaz és mikor hamis az implikáció?" type="info">
              <p className="text-xs leading-relaxed">
                Az $A \Rightarrow B$ állítás <strong>egyetlen esetben HAMIS</strong>: ha az előtag (feltétel) teljesül, de a megígért következmény mégsem valósul meg ($I \Rightarrow H$). Minden egyéb esetben az állítás <strong>IGAZ</strong>!
              </p>
            </TheoryCallout>
          </div>

          <GeometryFigureCard
            title="Az Implikáció és az Ellenpélda Szemléltetése"
            caption="A ⊆ B: a 6-tal osztható számok halmaza részhalmaza a 3-mal osztható számoknak. A 9 ellenpélda a megfordításra!"
            color="blue"
          >
            <ImplicationVennSvg />
          </GeometryFigureCard>
        </div>

        {/* Ellenpélda szerepe */}
        <div className="mt-6">
          <TheoryTrapBox title="Az ellenpélda ereje: Egyetlen eset mindent megdönthet!">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy $A \Rightarrow B$ állítás megcáfolásához nincs szükség végtelen sok eset átvizsgálására: elegendő{' '}
              <strong>egyetlenegy olyan esetet mutatni</strong>, ahol a feltétel ($A$) teljesül, de a következmény ($B$) nem! Ezt az esetet nevezzük{' '}
              <strong className="text-rose-600 dark:text-rose-400">ellenpéldának</strong>.
              <br />
              <em>Példa:</em> „Ha egy szám prímszám, akkor páratlan.” → <strong>Ellenpélda: a 2</strong> (prímszám, de páros), ezért az állítás hamis!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* 2. Szekció: Az Állítás Megfordítása */}
      <TheorySection
        title="2. Az állítás megfordítása (B ⇒ A)"
        subtitle="Mi történik, ha felcseréljük a feltételt és a következményt?"
        badge="Kritikus Különbség"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha az $A \Rightarrow B$ („Ha $A$, akkor $B$”) állításban felcseréljük a két tag sorrendjét, a{' '}
            <strong className="text-purple-600 dark:text-purple-400 font-semibold">$B \Rightarrow A$</strong>{' '}
            („Ha $B$, akkor $A$”) kijelentést kapjuk. Ezt nevezzük az{' '}
            <strong>eredeti állítás megfordításának</strong>.
          </p>

          <TheoryTrapBox title="A logika egyik leggyakoribb tévedése: Az igazság nem öröklődik automatikusan!">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Egy állítás igazságából NEM következik, hogy a megfordítása is igaz!</strong>
              <br />
              Az $A \Rightarrow B$ és a $B \Rightarrow A$ két teljesen önálló logikai állítás. Az eredeti és megfordított állítások között 4 különböző eset fordulhat elő:
            </p>
          </TheoryTrapBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">1</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Mindkettő IGAZ</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Eredeti:</strong> „Ha egy háromszög szabályos, akkor minden szöge 60°-os.” (IGAZ)
                <br />
                <strong>Megfordítás:</strong> „Ha egy háromszög minden szöge 60°-os, akkor szabályos.” (IGAZ)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center">2</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Eredeti IGAZ, Megfordítás HAMIS</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Eredeti:</strong> „Ha egy négyszög paralelogramma, akkor trapéz.” (IGAZ)
                <br />
                <strong>Megfordítás:</strong> „Ha egy négyszög trapéz, akkor paralelogramma.” (HAMIS, pl. szimmetrikus trapéz)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center">3</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Eredeti HAMIS, Megfordítás IGAZ</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Eredeti:</strong> „Ha egy szám osztható 3-mal, akkor osztható 6-tal is.” (HAMIS, ellenpélda: 9)
                <br />
                <strong>Megfordítás:</strong> „Ha egy szám osztható 6-tal, akkor osztható 3-mal is.” (IGAZ)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center justify-center">4</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Mindkettő HAMIS</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Eredeti:</strong> „Ha egy háromszög derékszögű, akkor szabályos.” (HAMIS)
                <br />
                <strong>Megfordítás:</strong> „Ha egy háromszög szabályos, akkor derékszögű.” (HAMIS)
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Szükséges és Elégséges Feltételek */}
      <TheorySection
        title="3. Szükséges és Elégséges Feltételek"
        subtitle="Hogyan gondolkodnak a matematikusok a feltételek szigoráról?"
        badge="Gondolkodásmód"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Amikor egy $A \Rightarrow B$ következtetés igaz, a két állítás viszonyát a{' '}
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">szükséges</strong> és{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">elégséges</strong>{' '}
              fogalmakkal jellemezhetjük:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  A elégséges feltétele B-nek
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  Ha $A$ teljesül, az <strong>már önmagában bőségesen elég</strong> ahhoz, hogy $B$ is garantáltan igaz legyen. (Pl. négyzetnek lenni elég ahhoz, hogy téglalap legyen.)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  B szükséges feltétele A-nak
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  $B$ teljesülése <strong>nélkülözhetetlen követelmény</strong>: ha $B$ nem igaz, $A$ sem lehet igaz! (Pl. ha egy négyszög nem téglalap, akkor biztosan nem lehet négyzet sem.)
                </p>
              </div>
            </div>

            <TheoryCallout title="Hétköznapi példa a megértéshez" type="tip">
              <p className="text-xs leading-relaxed">
                „Ha valaki Budapesten van ($A$), akkor Magyarországon van ($B$).”
                <br />
                Budapesten lenni <em>elégséges</em> ahhoz, hogy Magyarországon legyél. De Magyarországon lenni még <em>nem elég</em> a budapesti léthez (lehetsz Debrecenben is), viszont <em>elengedhetetlenül szükséges</em>!
              </p>
            </TheoryCallout>
          </div>

          <GeometryFigureCard
            title="A Szükséges és Elégséges Feltétel Fogalma"
            caption="A nyíl iránya: A-ból következik B. Az A előtag az elégséges, a B utótag a szükséges feltétel."
            color="indigo"
          >
            <SufficientNecessarySvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Ekvivalencia (Akkor és csak akkor) */}
      <TheorySection
        title="4. Kétirányú következtetés: Ekvivalencia (A ⟺ B)"
        subtitle="Akkor és csak akkor – a tökéletes matematikai definíciók nyelve"
        badge="Ekvivalencia"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Ha két állítás között a következtetés mindkét irányban igaz ($A \Rightarrow B$ és $B \Rightarrow A$ is teljesül), akkor a két állítás{' '}
              <strong className="text-purple-600 dark:text-purple-400 font-semibold">logikailag ekvivalens</strong>{' '}
              (egyenértékű).
            </p>

            <TheoryCard title="Az ekvivalencia kifejezései" color="purple">
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 font-mono text-center text-sm font-bold text-purple-900 dark:text-purple-200">
                  A ⟺ B &nbsp;&nbsp;(vagy&nbsp;&nbsp;A ↔ B)
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pt-1">
                  <li>„$A$ <strong>akkor és csak akkor</strong>, ha $B$.”</li>
                  <li>„$A$ <strong>pontosan akkor</strong> teljesül, ha $B$.”</li>
                  <li>„$A$ <strong>szükséges és elégséges feltétele</strong> $B$-nek.”</li>
                </ul>
              </div>
            </TheoryCard>

            <TheoryCallout title="Paralelogramma ekvivalens definíciói (Tankönyv 25. o.)" type="info">
              <p className="text-xs leading-relaxed">
                Egy négyszög <strong>akkor és csak akkor</strong> paralelogramma, ha:
                <br />
                • szemközti oldalai párhuzamosak ⟺
                <br />
                • két szemközti oldala párhuzamos és egyenlő ⟺
                <br />
                • szemközti szögei egyenlők ⟺
                <br />
                • középpontosan szimmetrikus.
              </p>
            </TheoryCallout>
          </div>

          <GeometryFigureCard
            title="A Kölcsönös Implikáció Geometriai Példája"
            caption="Egy négyszög akkor és csak akkor paralelogramma, ha szemközti szögei egyenlők (kétirányú nyíl)."
            color="purple"
          >
            <EquivalenceParallelogramSvg />
          </GeometryFigureCard>
        </div>

        {/* Algebrai egyenletek szorzat és négyzetösszeg */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-600 font-mono text-xs font-bold">1</span>
              Szorzat egyenlősége nullával (VAGY kapcsolat)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az (x + 3)(5 - x) = 0 egyenlet <strong>akkor és csak akkor</strong> teljesül, ha:
              <br />
              (x + 3 = 0) ∨ (5 - x = 0), azaz x = -3 vagy x = 5.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 font-mono text-xs font-bold">2</span>
              Négyzetösszeg egyenlősége nullával (ÉS kapcsolat)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az (x + 3)² + (5 - y)² = 0 összeg valós számokra <strong>akkor és csak akkor</strong> 0, ha mindkét tag egyszerre 0:
              <br />
              (x + 3 = 0) ∧ (5 - y = 0), azaz x = -3 ÉS y = 5.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Az Implikáció Tagadása és Kontrapozíció */}
      <TheorySection
        title="5. Az Implikáció Tagadása és a Kontrapozíció Elve"
        subtitle="Hogyan cáfolunk egy ígéretet, és mi az indirekt bizonyítások alapja?"
        badge="Haladó Logika"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakori vizsgakérdés, hogy mi egy feltételes kijelentés helyes tagadása, illetve hogyan alakítható át logikailag egyenértékű formára.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="1. Az implikáció tagadása: ¬(A ⇒ B)" color="rose">
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 font-mono text-center font-bold text-rose-900 dark:text-rose-200">
                  ¬(A ⇒ B) ⟺ A ∧ ¬B
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Egy ígéretet („Ha vasárnap süt a nap, elmegyünk kirándulni”) csak úgy lehet megcáfolni, ha <strong>a feltétel teljesült, de a cselekvés elmaradt</strong>:
                  <br />
                  „Vasárnap süt a nap, <strong>DE</strong> nem megyünk kirándulni.”
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="2. A kontrapozíció elve: (A ⇒ B) ⟺ (¬B ⇒ ¬A)" color="emerald">
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-center font-bold text-emerald-900 dark:text-emerald-200">
                  (A ⇒ B) ⟺ (¬B ⇒ ¬A)
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ha megfordítjuk az állítást ÉS mindkét tagját tagadjuk, az új kijelentés <strong>pontosan egyenértékű</strong> az eredetivel!
                  <br />
                  „Ha egy szám osztható 6-tal, akkor 3-mal is” ⟺ „Ha egy szám nem osztható 3-mal, akkor 6-tal sem osztható.”
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 6. Szekció: Tankönyvi Logikai Fejtörők */}
      <TheorySection
        title="6. Tankönyvi Logikai Fejtörők és Következtetések"
        subtitle="A hazudós kalandor, 4 úszó kijelentései és a bűnös nyomozása"
        badge="Gyakorlati Elemzés"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              A kalandor rejtvénye (Tankönyv 26. o.)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egy kalandor hétfőn, szerdán, pénteken és vasárnap igazat mond, a többi napon hazudik.
              <br />
              Melyik napon mondhatja: <em>„Holnap hazudni fogok”</em>?
              <br />
              <strong>Megoldás:</strong> Ha igazat mond, holnap hazudnia kell (ez a vasárnap utáni hétfő, hiszen vasárnap igazmondó, hétfőn hazudik). Ha hazudik, holnap igazat kell mondania (ez a szombat utáni vasárnap). Így szombaton vagy vasárnap hangozhatott el!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-500" />
              Ki a bűnös? (Tankönyv 26. o.)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Aladár: „Béla a bűnös.” • Béla: „Aladár hazudik.” • Cecil: „Nem vagyok bűnös.” • Dezső: „Béla füllent.”
              <br />
              <strong>Kulcsgondolat:</strong> Aladár és Béla egymásnak ellentmondó kijelentést tesz (egyikük igaz, másikuk hazudik). Dezső ugyanazt állítja, mint Aladár! Ha pontosan egy állítás igaz, abból azonnal meghatározható a bűnös személye.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 7. Szekció: Interaktív Labor a tananyag legvégén! */}
      <TheorySection
        title="7. Interaktív Implikáció és Megfordítás Labor"
        subtitle="Válassz ki egy tankönyvi példát, és vizsgáld meg az oda-vissza következtetés és ekvivalencia értékeit!"
        badge="Interaktív Labor"
      >
        <div className="space-y-6">
          {/* Example Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {exampleCases.map(ex => (
              <button
                key={ex.id}
                onClick={() => setSelectedExampleId(ex.id)}
                className={`p-3 text-left rounded-xl text-xs font-semibold transition-all border ${
                  selectedExampleId === ex.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                {ex.name}
              </button>
            ))}
          </div>

          {/* Active Example Detailed Display */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {/* Statements header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <span className="font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[10px]">A állítás (Feltétel)</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{activeExample.statementA}</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider text-[10px]">B állítás (Következmény)</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{activeExample.statementB}</p>
              </div>
            </div>

            {/* Implication Cards Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Eredeti A => B */}
              <div className={`p-4 rounded-xl border ${
                activeExample.forwardTrue
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">Eredeti állítás (A ⇒ B)</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black ${
                    activeExample.forwardTrue
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                  }`}>
                    {activeExample.forwardTrue ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {activeExample.forwardTrue ? 'IGAZ' : 'HAMIS'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeExample.forwardExplanation}
                </p>
              </div>

              {/* Megfordítás B => A */}
              <div className={`p-4 rounded-xl border ${
                activeExample.reverseTrue
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">Megfordítás (B ⇒ A)</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black ${
                    activeExample.reverseTrue
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                  }`}>
                    {activeExample.reverseTrue ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {activeExample.reverseTrue ? 'IGAZ' : 'HAMIS'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeExample.reverseExplanation}
                </p>
                {activeExample.counterexample && (
                  <div className="mt-2 p-2 rounded bg-rose-100/60 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800 text-[11px] text-rose-900 dark:text-rose-200">
                    <strong>Ellenpélda:</strong> {activeExample.counterexample}
                  </div>
                )}
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              activeExample.isEquivalence
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-950 dark:text-purple-200'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}>
              <div className="text-xs">
                <span className="font-bold text-sm block">
                  {activeExample.isEquivalence
                    ? '🎉 Ekvivalencia: A ⟺ B teljesül!'
                    : 'ℹ️ Nem ekvivalens kifejezések (csak egyirányú következtetés)'}
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {activeExample.isEquivalence
                    ? 'A két állítás kölcsönösen feltételezi egymást, mindkét irányban igaz.'
                    : 'A megfordítás nem teljesül minden esetben, így a két fogalom nem cserélhető fel szabadon.'}
                </span>
              </div>
              <div className="text-xs font-mono font-bold whitespace-nowrap">
                {activeExample.isEquivalence ? 'A ⟺ B (IGAZ)' : 'A ⇎ B (HAMIS)'}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ImplicationTheory;

