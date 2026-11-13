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
  BalanceScaleSvg,
  ExtraneousRootsSvg,
  LostRootsSvg,
  DomainRestrictionSvg,
  FlowchartStepSvg
} from './EquivalentEquationsFigures';
import {
  Scale,
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
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EquivalentEquationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface StepScenario {
  id: string;
  originalEq: string;
  operation: string;
  resultingEq: string;
  isEquivalent: boolean;
  trapType: 'none' | 'extraneous' | 'lost' | 'domain';
  origRoots: string;
  newRoots: string;
  explanation: string;
}

const scenarios: StepScenario[] = [
  {
    id: 'sc1',
    originalEq: '2x + 6 = 14',
    operation: 'Mindkét oldalból kivonunk 6-ot (-6)',
    resultingEq: '2x = 8',
    isEquivalent: true,
    trapType: 'none',
    origRoots: '{4}',
    newRoots: '{4}',
    explanation: 'Ugyanazon valós szám kivonása mindkét oldalból ekvivalens átalakítás. A megoldáshalmaz nem változik.'
  },
  {
    id: 'sc2',
    originalEq: '2x = 8',
    operation: 'Mindkét oldalt elosztjuk 2-vel (: 2)',
    resultingEq: 'x = 4',
    isEquivalent: true,
    trapType: 'none',
    origRoots: '{4}',
    newRoots: '{4}',
    explanation: 'Nullától különböző valós számmal való osztás ekvivalens átalakítás.'
  },
  {
    id: 'sc3',
    originalEq: 'x = 3',
    operation: 'Mindkét oldalt négyzetre emeljük: ( )²',
    resultingEq: 'x² = 9',
    isEquivalent: false,
    trapType: 'extraneous',
    origRoots: '{3}',
    newRoots: '{-3; 3}',
    explanation: 'Páros kitevőre emeléskor belép a hamis gyök (x = -3), mert (-3)² = 9 is igaz. Kötelező az ellenőrzés!'
  },
  {
    id: 'sc4',
    originalEq: 'x² = 4x',
    operation: 'Mindkét oldalt elosztjuk x-szel (: x)',
    resultingEq: 'x = 4',
    isEquivalent: false,
    trapType: 'lost',
    origRoots: '{0; 4}',
    newRoots: '{4}',
    explanation: 'Gyökvesztés történt! Mivel x = 0 is megoldása az eredeti egyenletnek, a 0-val való tiltott osztás miatt elveszítettük ezt a gyököt.'
  },
  {
    id: 'sc5',
    originalEq: '(x² - 4)/(x - 2) = 0',
    operation: 'Mindkét oldalt megszorozzuk (x - 2)-vel',
    resultingEq: 'x² - 4 = 0',
    isEquivalent: false,
    trapType: 'domain',
    origRoots: '{-2}',
    newRoots: '{-2; 2}',
    explanation: 'A szorzás után a 2 is gyökként jelenik meg, pedig az eredeti egyenletben a nevező miatt x ≠ 2 volt a kikötés!'
  },
  {
    id: 'sc6',
    originalEq: '3x - 1 = 11',
    operation: 'Mindkét oldalt megszorozzuk 0-val (· 0)',
    resultingEq: '0 = 0',
    isEquivalent: false,
    trapType: 'extraneous',
    origRoots: '{4}',
    newRoots: 'ℝ (minden valós szám)',
    explanation: 'Nullával szorozva azonosságot kapunk, a megoldáshalmaz az egész ℝ-re bővül. Szigorúan tilos!'
  }
];

export const EquivalentEquationsTheory: React.FC<EquivalentEquationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Scenárió Elemző State ---
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc1');
  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  // --- Egyenlet Mérleg Kísérleti State ---
  const [leftBalance, setLeftBalance] = useState<number>(10);
  const [rightBalance, setRightBalance] = useState<number>(10);
  const [balanceHistory, setBalanceHistory] = useState<string[]>(['Kezdőállapot: 10 = 10 (Egyensúlyban)']);

  const applyBalanceOp = (opName: string, leftDelta: number, rightDelta: number) => {
    setLeftBalance((prev) => prev + leftDelta);
    setRightBalance((prev) => prev + rightDelta);
    const isNowEqual = leftBalance + leftDelta === rightBalance + rightDelta;
    setBalanceHistory((prev) => [
      `${opName}: Bal = ${leftBalance + leftDelta}, Jobb = ${rightBalance + rightDelta} ${isNowEqual ? '✓ (Egyensúly)' : '✗ (Elbillent!)'}`,
      ...prev.slice(0, 4)
    ]);
  };

  const resetBalance = () => {
    setLeftBalance(10);
    setRightBalance(10);
    setBalanceHistory(['Visszaállítva: 10 = 10 (Egyensúlyban)']);
  };

  return (
    <TheoryTemplate
      title="Ekvivalens egyenletek és átalakítások"
      subtitle="10. osztály • VIII. Témakör • 60. lecke: Az egyenletmegoldás algebrai és logikai megalapozása, mérlegelv, hamis gyökök és gyökvesztés"
      topicId="g10-eq-ekvivalens-egyenletek-theory"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="teal"
      quickRule={{
        label: 'A MÉRLEGELV ÉS EKVIVALENCIA FONTOS SZABÁLYAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80">
              <span className="text-xs font-black text-teal-900 dark:text-teal-200 block mb-1">
                ✓ Garantáltan ekvivalens átalakítások:
              </span>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none">
                <li>• Mindkét oldalhoz ugyanazt a kifejezést hozzáadni / kivonni: $f(x) = g(x) \iff f(x) \pm c = g(x) \pm c$.</li>
                <li>• Mindkét oldalt <strong>nullától különböző konstanssal</strong> ($c \neq 0$) szorozni vagy osztani.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200">
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-0.5">✗ Gyökvesztés veszélye:</span>
                <span>Ismeretlennel osztani <strong>tilos</strong>! (Pl. $x^2 = 4x$ esetén $:x$ tilos, mert elvész az $x = 0$).</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">⚠ Hamis gyökök:</span>
                <span>Négyzetre emeléskor vagy ismeretlennel szorzáskor az <strong>ellenőrzés kötelező</strong>!</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: ALAPFOGALMAK ÉS FONTOS SZABÁLYOK (2 OSZLOPOS ELRENDEZÉS A TANANYAG ELEJÉN)
      ========================================== */}
      <TheorySection
        title="1. Az egyenlet fogalma és a legfontosabb alapszabályok"
        subtitle="Mikor ekvivalens két egyenlet, és melyek a biztonságos mérlegelv alapszabályai?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Bal oldal: Alapfogalmak és definíció */}
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard title="Alaphalmaz, Értelmezési tartomány és Megoldáshalmaz">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                A középiskolai matematikában az egyenlet egy olyan kijelentés (nyitott mondat), amelyben két algebrai kifejezés
                között az egyenlőség jele ($=$) szerepel.
              </p>
              <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 mb-4 list-disc list-inside">
                <li>
                  <strong>Alaphalmaz ($A$ vagy $U$):</strong> Az a számhalmaz, amelyen a feladat megoldásait keressük (pl. ℝ, ℤ, ℕ).
                </li>
                <li>
                  <strong>Értelmezési tartomány ($D \subseteq A$):</strong> Az alaphalmaz azon legbővebb részhalmaza, ahol az egyenletben szereplő műveletek elvégezhetők (pl. nem osztunk nullával, páros gyök alatt nemnegatív szám áll).
                </li>
                <li>
                  <strong>Megoldáshalmaz ($M \subseteq D$):</strong> Azon számok összessége, amelyeket az ismeretlen helyére behelyettesítve igaz állítást kapunk.
                </li>
              </ul>

              <TheoryCallout type="definition" title="Ekvivalens egyenletek definíciója">
                Két egyenletet akkor és csak akkor nevezünk <strong>ekvivalensnek</strong> (egyenértékűnek) egy adott alaphalmazon,
                ha a <strong>megoldáshalmazuk pontosan megegyezik</strong> ($M_1 = M_2$).
              </TheoryCallout>

              <p className="text-xs text-slate-500 mt-2 italic">
                Megjegyzés: Az ekvivalencia függ az alaphalmaztól! Például az $x^2 = 9$ és az $x = 3$ egyenlet a valós számok (ℝ)
                halmazán nem ekvivalens (mert &#123;-3; 3&#125; &#8800; &#123;3&#125;), de a természetes számok (ℕ) halmazán ekvivalens, mert ott mindkettőnek &#123;3&#125; a megoldása!
              </p>
            </TheoryCard>
          </div>

          {/* Jobb oldal: Kétkarú mérleg modell és a mérlegelv kódexe */}
          <div className="lg:col-span-5 space-y-4">
            <TheoryCard title="A kétkarú mérleg modellje" variant="highlight">
              <div className="w-full flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-200/80 dark:border-teal-900/40 mb-3 shadow-xs">
                <BalanceScaleSvg size={230} balanced={true} operation="+c mindkét oldalhoz" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                  Ha mindkét serpenyőre ugyanazt a súlyt helyezzük fel vagy vesszük le, a mérleg egyensúlyban marad.
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <strong>✓ Ekvivalens művelet:</strong> Olyan átalakítás, amely nem változtatja meg az egyenlet igazsághalmazát.
                </div>
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg">
                  <strong>✗ Nem ekvivalens művelet:</strong> Megváltoztathatja a gyökök számát (gyökvesztés vagy hamis gyökök!).
                </div>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <strong>⚠ Kötelező ellenőrzés:</strong> Minden nem ekvivalens lépés után az eredeti egyenletbe való behelyettesítés kötelező!
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: EKVIVALENS ÁTALAKÍTÁSOK ÉS FOLYAMATÁBRA
      ========================================== */}
      <TheorySection
        title="2. A mérlegelv és az ekvivalens átalakítások folyamata"
        subtitle="Milyen műveletek esetén garantált, hogy nem változik meg a megoldáshalmaz?"
      >
        <TheoryCard title="Döntési folyamatábra: Ekvivalens vagy Veszélyes lépés?" variant="highlight">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
            Minden egyenletrendezési lépés előtt érdemes ellenőrizni, hogy a végrehajtani kívánt művelet nullától különböző
            konstans számmal történik-e, vagy ismeretlent érint:
          </p>
          <div className="w-full flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <FlowchartStepSvg size={250} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              A folyamatábra segít eldönteni, hogy szükség van-e kötelező behelyettesítéses ellenőrzésre és kikötésvizsgálatra.
            </span>
          </div>
        </TheoryCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Biztonságos (ekvivalens) lépések" variant="definition">
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Azonos szám hozzáadása / kivonása:</strong>
                  <br />
                  $f(x) = g(x) \iff f(x) \pm c = g(x) \pm c$, ahol c valós szám ($c \in \mathbb&#123;R&#125;$).
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Szorzás / osztás nemnulla valós számmal:</strong>
                  <br />
                  $f(x) = g(x) \iff c \cdot f(x) = c \cdot g(x)$, ha $c \neq 0$.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Azonos átalakítások az egyik oldalon:</strong>
                  <br />
                  Zárójelek felbontása, összevonás, szorzattá alakítás anélkül, hogy az értelmezési tartomány szűkülne.
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Páratlan kitevőre emelés és gyökvonás" variant="example">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Míg a négyzetre emelés és a négyzetgyökvonás nem ekvivalens, a <strong>páratlan kitevőjű</strong> műveletek (pl. köbre emelés, köbgyökvonás)
              a teljes valós számhalmazon ekvivalensek!
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-900 dark:text-teal-200 space-y-1">
              <div>$x^3 = 8 \iff x = 2$ (kölcsönösen egyértelmű)</div>
              <div>$x^3 = -27 \iff x = -3$ (megőrzi a negatív előjelet!)</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              A páratlan hatványfüggvények ($y = x^3, y = x^5$) szigorúan monoton növekvőek, ezért minden valós értéket pontosan egyszer vesznek fel.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: NEM EKVIVALENS LÉPÉSEK ÉS VESZÉLYEK
      ========================================== */}
      <TheorySection
        title="3. A két nagy veszedelem: Hamis gyökök és gyökvesztés"
        subtitle="Mikor és hogyan sérül az egyenértékűség? Miért nem látszik az eredmény hibája ellenőrzés nélkül?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hamis gyökök */}
          <TheoryCard title="A) Hamis gyökök keletkezése" variant="warning">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed">
              Ha olyan műveletet végzünk, amely a bal és jobb oldal előjelét elmossa (páros kitevőre emelés) vagy nullává
              válhat (ismeretlennel való szorzás), akkor olyan értékek jelenhetnek meg, amelyek az eredeti egyenletnek nem megoldásai.
            </p>
            <div className="w-full flex justify-center my-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-rose-200 dark:border-rose-900/40">
              <ExtraneousRootsSvg size={230} />
            </div>
            <TheoryTrapBox title="Miért keletkezik hamis gyök a négyzetre emeléskor?">
              Ha $A = B$, akkor $A^2 = B^2$ valóban igaz. Viszont fordítva: $A^2 = B^2$-ből csak az következik, hogy $A = B$
              <strong> vagy $A = -B$</strong>! Így a $-B$-ből származó megoldások hamisak az eredeti egyenletre nézve.
            </TheoryTrapBox>
          </TheoryCard>

          {/* Gyökvesztés */}
          <TheoryCard title="B) A gyökvesztés csapdája" variant="warning">
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed">
              A leggyakoribb érettségi hiba: mindkét oldal leosztása ismeretlennel. Ha az osztó kifejezés értéke nulla is lehet,
              akkor az azt nullává tevő gyököt örökre elveszítjük!
            </p>
            <div className="w-full flex justify-center my-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-amber-200 dark:border-amber-900/40">
              <LostRootsSvg size={230} />
            </div>
            <TheoryTrapBox title="Hogyan kerülhető el a gyökvesztés?">
              <strong>Soha ne ossz ismeretlennel!</strong> Ehelyett mindig rendezz nullára egy oldalra, és emeld ki a közös ismeretlent:
              $$x^2 = 4x \implies x^2 - 4x = 0 \implies x(x - 4) = 0 \implies x_1 = 0,\ x_2 = 4$$
            </TheoryTrapBox>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: ÉRTELMEZÉSI TARTOMÁNY ÉS KIKÖTÉSEK
      ========================================== */}
      <TheorySection
        title="4. Az értelmezési tartomány (kikötések) és a behelyettesítéses ellenőrzés"
        subtitle="A biztonságos egyenletmegoldás két kötelező tartópillére"
      >
        <TheoryCard title="Törtes kifejezések, nevező kikötése és kizárt pontok">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-4">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Amikor az egyenletben tört szerepel, a nevező nem lehet nulla. Ha átbeszorzunk a nevezővel, a kapott egyenlet
                megoldáshalmaza bővülhet a nevező zérushelyével!
              </p>
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Aranyszabály törtes egyenleteknél:
                </div>
                <div><strong>1. Lépés:</strong> Mindig írd fel először a kikötést: a nevező nem lehet nulla ($Q(x) \neq 0$)!</div>
                <div><strong>2. Lépés:</strong> Oldd meg a kapott számlálóegyenletet ($P(x) = 0$).</div>
                <div><strong>3. Lépés:</strong> Vesd össze a kapott gyököket a kikötéssel: a kizárt értékeket kötelező eldobni!</div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] flex justify-center bg-white dark:bg-slate-900 p-2 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 shadow-sm">
                <DomainRestrictionSvg size={240} />
              </div>
            </div>
          </div>

          <TheoryTable
            headers={['Művelet fajtája', 'Ekvivalens?', 'Következmény', 'Szükséges teendő']}
            rows={[
              ['Szám hozzáadása / kivonása', 'IGEN', 'Nincs változás a gyökökben', 'Szabadon alkalmazható'],
              ['Nemnulla számmal szorzás / osztás', 'IGEN', 'Nincs változás a gyökökben', 'Szabadon alkalmazható'],
              ['Ismeretlennel való szorzás', 'NEM', 'Hamis gyökök keletkezhetnek', 'Kötelező ellenőrzés'],
              ['Ismeretlennel való osztás', 'NEM', 'Gyökvesztés történhet!', 'TILOS! Nullára rendezés és szorzattá alakítás'],
              ['Páros kitevőre emelés (( )²)', 'NEM', 'Hamis gyökök keletkezhetnek', 'Kötelező ellenőrzés az eredetibe'],
              ['Páratlan kitevőre emelés (( )³)', 'IGEN ℝ-en', 'Kölcsönösen egyértelmű művelet', 'Ekvivalens ℝ-en']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          5. SZEKCIÓ: ÉRETTSÉGI MINTAPÉLDÁK
      ========================================== */}
      <TheorySection
        title="5. Érettségi mintapéldák részletes levezetéssel"
        subtitle="Hogyan pontozzák az érettségin az ekvivalens átalakításokat és az ellenőrzést?"
      >
        <TheoryCard title="Mintapélda 1: Hibakeresés lépéssorozatban (Tipikus érettségi feladat)" variant="example">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
            Egy diák az alábbi levezetéssel oldotta meg az egyenletet:
          </p>
          <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl font-mono text-xs space-y-1 mb-3">
            <div>1. lépés: $x^2 - 5x = 0$</div>
            <div>2. lépés: $x^2 = 5x$ (mindkét oldalhoz +5x)</div>
            <div>3. lépés: $x = 5$ (mindkét oldalt elosztotta x-szel)</div>
            <div>Válasz: A megoldás x = 5.</div>
          </div>
          <p className="text-xs text-rose-600 dark:text-rose-400 font-bold mb-1">
            Hibás lépés azonosítása és indoklása:
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            A 3. lépés nem ekvivalens átalakítás, mert a diák ismeretlennel osztott anélkül, hogy megvizsgálta volna az $x = 0$ esetet.
            Mivel $0^2 - 5 \cdot 0 = 0$ teljesül, az $x = 0$ is valós gyöke az egyenletnek, amely a 3. lépésben elveszett.
            <br />
            <strong>Helyes megoldás:</strong> $x(x - 5) = 0 \implies x_1 = 0,\ x_2 = 5$. A megoldáshalmaz: M = &#123;0; 5&#125;.
          </p>
        </TheoryCard>

        <TheoryCard title="Mintapélda 2: Ekvivalens-e az alaphalmazon?" variant="example">
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>Feladat:</strong> Döntsd el, hogy az alábbi két egyenlet ekvivalens-e a valós számok (ℝ), illetve az egész számok (ℤ) halmazán!
              <div className="my-2 p-2 bg-teal-50 dark:bg-teal-950/30 rounded-lg font-mono text-xs text-teal-900 dark:text-teal-200">
                (A) egyenlet: $2x + 1 = 2$ &nbsp;&nbsp;&nbsp;&nbsp; (B) egyenlet: $x^2 + 1 = 0$
              </div>
            </div>
            <div>
              <strong>Megoldás:</strong>
              <ul className="list-disc list-inside space-y-1 text-xs mt-1">
                <li>
                  Az (A) egyenlet megoldása: $2x = 1 \implies x = \frac{1}{2}$.
                </li>
                <li>
                  A (B) egyenlet megoldása: $x^2 = -1$, aminek valós gyöke nincs.
                </li>
                <li>
                  <strong>A valós számok halmazán (ℝ):</strong> $M_A$ = &#123;1/2&#125;, míg $M_B = \emptyset$. Mivel a két megoldáshalmaz nem egyezik meg, az egyenletek <u>nem ekvivalensek</u> ℝ-en.
                </li>
                <li>
                  <strong>Az egész számok halmazán (ℤ):</strong> Mivel az $\frac{1}{2} \notin \mathbb&#123;Z&#125;$, az (A) egyenletnek nincs egész gyöke: $M_A = \emptyset$. A (B) egyenletnek sincs egész gyöke: $M_B = \emptyset$. Mindkét egyenlet megoldáshalmaza $\emptyset$, ezért az egész számok halmazán <u>ekvivalensek</u>!
                </li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          INTERAKTÍV LABORATÓRIUMOK (A TANANYAG VÉGÉN)
      ========================================== */}
      <TheorySection
        title="6. Interaktív Gyakorló Laboratórium"
        subtitle="Próbáld ki a mérlegelvet és teszteld az egyenletátalakítási lépéseket dinamikus szimulációkkal!"
      >
        {/* INTERAKTÍV MODUL 1: VIRTUÁLIS MÉRLEG */}
        <TheoryCard title="Laboratórium I: A Kétkarú Mérleg és a Mérlegelv szimulációja" variant="highlight">
          <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">
            Az egyenletet egy tökéletesen egyensúlyban álló kétkarú mérleghez hasonlíthatjuk. Amíg mindkét oldalhoz ugyanazt a
            mennyiséget adjuk hozzá vagy vonjuk ki, az egyensúly fennmarad. Próbáld ki az alábbi gombokkal!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center justify-center p-3 bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl border border-teal-200/60 dark:border-teal-800">
              <BalanceScaleSvg
                size={230}
                balanced={leftBalance === rightBalance}
                operation={leftBalance === rightBalance ? 'Egyensúlyban' : 'Elbillent!'}
              />
              <div className="flex gap-4 mt-2 text-sm font-bold">
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 rounded-lg">
                  Bal oldal: {leftBalance}
                </span>
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 rounded-lg">
                  Jobb oldal: {rightBalance}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Válassz átalakítási műveletet:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => applyBalanceOp('+5 mindkét oldalhoz', 5, 5)}
                  className="text-xs font-bold border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-teal-700 dark:text-teal-300"
                >
                  +5 mindkét oldalhoz ✓
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => applyBalanceOp('-3 mindkét oldalból', -3, -3)}
                  className="text-xs font-bold border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-teal-700 dark:text-teal-300"
                >
                  -3 mindkét oldalból ✓
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => applyBalanceOp('Csak a balhoz +4 (HIBA)', 4, 0)}
                  className="text-xs font-bold border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                >
                  Csak a balhoz +4 ✗
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => applyBalanceOp('Csak a jobbhoz -5 (HIBA)', 0, -5)}
                  className="text-xs font-bold border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                >
                  Csak a jobbhoz -5 ✗
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetBalance}
                className="w-full text-xs text-slate-500 hover:text-teal-600 gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Alaphelyzetbe állítás
              </Button>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs space-y-1">
                <div className="font-semibold text-slate-600 dark:text-slate-400">Műveleti napló:</div>
                {balanceHistory.map((h, i) => (
                  <div
                    key={i}
                    className={`truncate ${h.includes('✓') ? 'text-teal-700 dark:text-teal-400' : h.includes('✗') ? 'text-rose-600 font-semibold' : 'text-slate-500'}`}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* INTERAKTÍV MODUL 2: BUKTATÓ DETEKTOR */}
        <div className="mt-6">
          <TheoryCard title="Laboratórium II: Ekvivalens Lépés Elemző & Buktató Detektor" variant="highlight">
            <p className="text-slate-700 dark:text-slate-300 mb-3 text-sm">
              Kattints az alábbi tipikus átalakítási lépésekre, és vizsgáld meg, hogyan változik meg a megoldáshalmaz!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border ${
                    selectedScenarioId === sc.id
                      ? 'bg-teal-600 text-white border-teal-700 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                  }`}
                >
                  <div className="truncate font-mono">{sc.originalEq}</div>
                  <div className={`text-[10px] truncate ${selectedScenarioId === sc.id ? 'text-teal-100' : sc.isEquivalent ? 'text-teal-600 dark:text-teal-400' : 'text-rose-500'}`}>
                    {sc.isEquivalent ? '✓ Ekvivalens' : '✗ Nem ekvivalens'}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Vizsgált átalakítás:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
                    activeScenario.isEquivalent
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {activeScenario.isEquivalent ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {activeScenario.isEquivalent ? 'EKVIVALENS LÉPÉS' : 'VESZÉLYES / NEM EKVIVALENS!'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-center">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-semibold mb-1">Eredeti egyenlet</div>
                  <div className="font-mono text-base font-bold text-slate-800 dark:text-slate-200">
                    {activeScenario.originalEq}
                  </div>
                  <div className="text-xs text-teal-600 dark:text-teal-400 mt-1 font-semibold">
                    Gyökök: {activeScenario.origRoots}
                  </div>
                </div>

                <div className="p-3 bg-teal-50/60 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 flex flex-col justify-center">
                  <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mb-1">Elvégzett művelet</div>
                  <div className="font-bold text-xs text-teal-900 dark:text-teal-200">
                    {activeScenario.operation}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-semibold mb-1">Átalakított egyenlet</div>
                  <div className="font-mono text-base font-bold text-slate-800 dark:text-slate-200">
                    {activeScenario.resultingEq}
                  </div>
                  <div className={`text-xs mt-1 font-semibold ${activeScenario.origRoots === activeScenario.newRoots ? 'text-teal-600 dark:text-teal-400' : 'text-rose-500 font-bold'}`}>
                    Gyökök: {activeScenario.newRoots}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Matematikai magyarázat:</strong> {activeScenario.explanation}
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EquivalentEquationsTheory;
