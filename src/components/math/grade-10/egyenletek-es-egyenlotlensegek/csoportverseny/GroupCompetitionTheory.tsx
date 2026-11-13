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
  TeamChallengeRelaySvg,
  ErrorHuntStepAnalysisSvg,
  SpeedVieteDuelSvg,
  SignChartSprintSvg,
  ScoreboardTournamentSvg
} from './GroupCompetitionFigures';
import {
  Users,
  Trophy,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  RotateCcw,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GroupCompetitionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const GroupCompetitionTheory: React.FC<GroupCompetitionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 6. SZEKCIÓ: Interaktív Csoportverseny Szimulátor állapota ---
  const [station, setStation] = useState<'viete' | 'detective' | 'sign'>('viete');

  // 1. Állomás (Viète)
  const [vieteIndex, setVieteIndex] = useState<number>(0);
  const [vieteUserGuess, setVieteUserGuess] = useState<string>('');
  const [vieteFeedback, setVieteFeedback] = useState<string | null>(null);
  const [vieteScore, setVieteScore] = useState<number>(0);

  const vieteChallenges = [
    { eq: 'x² - 9x + 20 = 0', p: -9, q: 20, r1: 4, r2: 5, hint: 'Szorzat 20 (4·5), összeg 9.' },
    { eq: 'x² + 2x - 15 = 0', p: 2, q: -15, r1: -5, r2: 3, hint: 'Szorzat -15, összeg -2.' },
    { eq: 'x² - 12x + 35 = 0', p: -12, q: 35, r1: 5, r2: 7, hint: 'Szorzat 35 (5·7), összeg 12.' },
    { eq: 'x² + 8x + 12 = 0', p: 8, q: 12, r1: -6, r2: -2, hint: 'Szorzat 12, összeg -8.' }
  ];

  const handleVieteCheck = () => {
    const curr = vieteChallenges[vieteIndex];
    const parts = vieteUserGuess.split(/[,;\s]+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (parts.length === 2) {
      const sorted = [...parts].sort((a, b) => a - b);
      const expected = [curr.r1, curr.r2].sort((a, b) => a - b);
      if (sorted[0] === expected[0] && sorted[1] === expected[1]) {
        setVieteFeedback('Helyes! +10 pont a csapatnak!');
        setVieteScore(prev => prev + 10);
      } else {
        setVieteFeedback(`Nem pontos. A helyes gyökök: ${expected[0]} és ${expected[1]}.`);
      }
    } else {
      setVieteFeedback('Adj meg két egész számot (pl: 4, 5)!');
    }
  };

  // 2. Állomás (Detektív hibakeresés)
  const [detectiveSelected, setDetectiveSelected] = useState<number | null>(null);
  const [detectiveFeedback, setDetectiveFeedback] = useState<string | null>(null);

  const detectiveSteps = [
    { stepNum: 1, text: 'Kikötés: √(3x + 1) = x - 1 esetén 3x + 1 ≥ 0 (x ≥ -1/3) és x - 1 ≥ 0 (x ≥ 1)', isError: false },
    { stepNum: 2, text: 'Mindkét oldal négyzetre emelése: 3x + 1 = (x - 1)² = x² - 2x + 1', isError: false },
    { stepNum: 3, text: 'Nullára rendezés: x² - 5x = 0  ⇒  x(x - 5) = 0  ⇒  x₁ = 0 vagy x₂ = 5', isError: false },
    { stepNum: 4, text: 'Megoldáshalmaz felírása ellenőrzés nélkül: M = {0; 5}', isError: true, explanation: 'Az x = 0 hamis gyök! Nem teljesíti az x ≥ 1 feltételt: √(1) = 1 ≠ -1! A helyes megoldás csak az M = {5}.' }
  ];

  const handleDetectiveCheck = (idx: number) => {
    setDetectiveSelected(idx);
    if (detectiveSteps[idx].isError) {
      setDetectiveFeedback(`Bravó, detektív! Leleplezted a hibát! ${detectiveSteps[idx].explanation} (+15 pont)`);
    } else {
      setDetectiveFeedback('Ez a lépés matematikailag teljesen korrekt. Keresd tovább a hibát!');
    }
  };

  // 3. Állomás (Előjel gyorsválasz)
  const [signChoice, setSignChoice] = useState<string | null>(null);
  const [signFeedback, setSignFeedback] = useState<string | null>(null);

  const handleSignCheck = (choice: string) => {
    setSignChoice(choice);
    if (choice === 'belso') {
      setSignFeedback('Tökéletes! Mivel a = 1 > 0 (felfelé nyíló parabola) és ≤ 0-t keresünk, a megoldás a gyökök közötti zárt intervallum: [-3; 4]! (+10 pont)');
    } else {
      setSignFeedback('Hibás! A gyökökön kívül a parabola a tengely felett jár, ott a kifejezés pozitív!');
    }
  };

  return (
    <TheoryTemplate
      title="8. Csoportverseny"
      subtitle="10. osztály • VIII. Témakör • 65. lecke: Kooperatív csapatverseny, gyorsasági algebrai kihívások és hibakereső detektív feladatok"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="pink"
      topicId="g10-eq-csoportverseny-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="font-semibold text-pink-700 dark:text-pink-300">
              A Csoportverseny 4 Aranyszabálya:
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Felelősségmegosztás:</strong> Minden csapatban legyen <em>Levezető</em>, <em>Kikötésfelelős</em>, <em>Előjelelemző</em> és <em>Időgazda</em>!
              </li>
              <li>
                <strong>Detektív aranyszabály:</strong> Ha egy levezetésben négyzetre emeltek vagy ismeretlennel osztottak, ott <strong>kötelező gyanakodni</strong>!
              </li>
              <li>
                <strong>Gyorsasági Viète:</strong> Szorzat felbontása $\rightarrow$ összeg ellentettjének keresése.
              </li>
              <li>
                <strong>Pontlevonás kivédése:</strong> A hibásan bent hagyott hamis gyök több pontlevonást jelent (-10p), mint egy kihagyott részfeladat!
              </li>
            </ul>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A csoportverseny felépítése és versenystratégiák */}
      <TheorySection
        title="1. A csoportverseny felépítése és kooperatív szerepek"
        badge="STRATÉGIA ÉS SZERVEZÉS"
      >
        <TheoryCard
          title="A kooperatív tanulás ereje a matematikában"
          icon={<Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              A 10. osztályos algebrai egyenletek és egyenlőtlenségek fejezetének összefoglalásaként a
              <strong> csoportverseny</strong> célja nem a mechanikus sablonfeladatok gépies megoldása,
              hanem a <strong>kritikai gondolkodás</strong>, az <strong>azonnali algebrai reflexek</strong> és a
              <strong> hibakereső készségek</strong> elmélyítése versenyhelyzetben.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950/40 p-4 rounded-xl border border-pink-200 dark:border-pink-800">
                <div className="font-bold text-pink-800 dark:text-pink-300 mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> 4 Fő Csapatszerepkör
                </div>
                <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong className="text-pink-700 dark:text-pink-300">1. Levezető (Algebra mester):</strong> Végzi az átalakításokat, összevonásokat, szorzattá bontást.
                  </li>
                  <li>
                    <strong className="text-pink-700 dark:text-pink-300">2. Kikötés- &amp; Hamisgyök-vadász:</strong> Felügyeli az alaphalmazt (√(f(x)) ≥ 0, nevező ≠ 0), a végén behelyettesít.
                  </li>
                  <li>
                    <strong className="text-pink-700 dark:text-pink-300">3. Előjelelemző (Grafikonos):</strong> Felfelé/lefelé álló parabolát vázol vagy előjeltáblázatot rajzol.
                  </li>
                  <li>
                    <strong className="text-pink-700 dark:text-pink-300">4. Időfelelős (Stratéga):</strong> Ügyel a visszaszámlálóra, priorizálja a könnyű pontokat, bemondja a döntést.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <TeamChallengeRelaySvg size={240} />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">
                  A 4 állomásos kooperatív staféta struktúrája
                </span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A hiba-detektív: Leggyakoribb bakik és leleplezésük */}
      <TheorySection
        title="2. A hiba-detektív: Tipikus algebrai csapdák leleplezése"
        badge="HIBAKERESÉS ÉS KRITIKAI ELEMZÉS"
      >
        <TheoryCard
          title="A 3 klasszikus levezetési hiba, amire a pontozók utaznak"
          icon={<Search className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              A csoportverseny legértékesebb feladataiban egy diák kész levezetését kapjátok kézhez,
              amiben szándékosan elrejtettek egy súlyos logikai vagy algebrai hibát. Az alábbi táblázat
              összefoglalja a leggyakoribb „fekete öves” bakikat:
            </p>

            <TheoryTable
              headers={['Hiba Típusa', 'Példa Levezetés', 'Következmény', 'Detektív Szabály']}
              rows={[
                [
                  'Négyzetre emelés kikötés nélkül',
                  '√(x+3) = -2 ⇒ x+3 = 4 ⇒ x=1',
                  'Hamis gyök bekerülése (√4 = 2 ≠ -2)',
                  'Négyzetgyök értéke nemnegatív: a jobb oldalnak is ≥ 0-nak kell lennie!'
                ],
                [
                  'Ismeretlennel való osztás',
                  'x² - 6x = 0  ⇒ (:x) ⇒ x - 6 = 0 ⇒ x=6',
                  'Gyökvesztés: az x = 0 eltűnt!',
                  'Ismeretlennel SOHA nem osztunk, helyette kiemelünk: x(x - 6) = 0!'
                ],
                [
                  'Egyenlőtlenség megsértése negatívval',
                  '-3x < 12  ⇒ (: -3) ⇒ x < -4',
                  'Fordított megoldáshalmaz!',
                  'Negatív számmal szorozva/osztva a relációjel kötelezően megfordul: x > -4!'
                ],
                [
                  'Átbeszorzás ismeretlen nevezővel',
                  '(x+1)/(x-2) > 0 ⇒ (·(x-2)) ⇒ x+1 > 0',
                  'Elnézett intervallum!',
                  'Törtnél előjeltáblázatot vagy szorzattá alakítást használunk: (x+1)(x-2) > 0!'
                ]
              ]}
            />

            <div className="flex flex-col items-center justify-center p-3 bg-pink-50/50 dark:bg-pink-950/20 rounded-xl border border-pink-100 dark:border-pink-900 mt-4">
              <ErrorHuntStepAnalysisSvg size={250} />
              <span className="text-[11px] text-pink-800 dark:text-pink-300 mt-2 font-medium">
                Példa detektív feladvány: az utolsó lépésben bent hagyott hamis gyök leleplezése
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: Villámkérdések és fejben megoldható feladványok */}
      <TheorySection
        title="3. Villámkérdések és gyorsasági algebrai reflexek"
        badge="GYORSASÁG ÉS FEJBEN SZÁMOLÁS"
      >
        <TheoryCard
          title="Hogyan nyerjünk másodperceket a gyorsasági fordulóban?"
          icon={<Zap className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              A villámfordulóban minden feladatra mindössze 10–15 másodperc áll rendelkezésre.
              Ilyenkor nincs idő megoldóképletet körmölni – <strong>algebrai trükkökkel és mintafelismeréssel</strong> kell dolgozni!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TheoryCallout variant="tip" title="1. Villám Viète-stratégia">
                <p className="text-xs">
                  Ha az egyenlet normált ($x^2 + px + q = 0$):
                </p>
                <ol className="text-xs list-decimal pl-4 mt-2 space-y-1">
                  <li>Nézd meg a konstans $q$ szorzatot: milyen egész számpárok szorzata?</li>
                  <li>Keresd meg azt a párt, amelynek összege pontosan $-p$!</li>
                  <li>
                    Példa: $x^2 - 11x + 24 = 0 \implies 24 = 3 \cdot 8$ és $3 + 8 = 11$, a gyökök azonnal: <strong>3 és 8</strong>!
                  </li>
                </ol>
              </TheoryCallout>

              <TheoryCallout variant="warning" title="2. Hiányos egyenlet reflexek">
                <ul className="text-xs space-y-2">
                  <li>
                    <strong>Ha c = 0 ($ax^2 + bx = 0$):</strong> Az egyik gyök mindig <strong>0</strong>, a másik pedig $-b/a$. (Kiemelés: $x(ax+b)=0$).
                  </li>
                  <li>
                    <strong>Ha b = 0 ($ax^2 + c = 0$):</strong> $x^2 = -c/a$. Ha $-c/a &lt; 0$, nincs valós gyök; ha pozitív, akkor $x = \pm\sqrt(-c/a)$.
                  </li>
                </ul>
              </TheoryCallout>
            </div>

            <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl mt-2">
              <SpeedVieteDuelSvg size={250} />
              <span className="text-[11px] text-pink-300 mt-2 font-medium">
                Párbajhelyzet: a szorzat felbontása és az összeg ellenőrzése azonnali gyököket ad
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: Kidolgozott csapatfeladatok pontozási útmutatóval */}
      <TheorySection
        title="4. Kidolgozott csapatfeladatok mintalevezetéssel"
        badge="VERSENYFELADATOK"
      >
        <TheoryCard
          title="1. Versenyfeladat: Törtes egyenlőtlenség staféta (20 pont)"
          icon={<Trophy className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        >
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
              <strong className="text-pink-700 dark:text-pink-300">Feladat:</strong> Oldjátok meg a valós számok halmazán az alábbi egyenlőtlenséget:
              <div className="my-2 text-center text-base font-bold font-mono text-slate-800 dark:text-slate-100">
                <MathText text="\frac{x - 2}{x + 5} \le 0" />
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-pink-600 dark:text-pink-400">1. Állomás (Kikötés mester - 5 pont):</span>
                <p className="mt-1">
                  A nevező nem lehet 0: \(x + 5 \neq 0 \implies x \neq -5\). Tehát \(-5\) semmilyen körülmények között nem tartozhat a megoldáshalmazhoz!
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-pink-600 dark:text-pink-400">2. Állomás (Előjelelemző - 10 pont):</span>
                <p className="mt-1">
                  Egy tört előjele megegyezik a számláló és nevező szorzatának előjelével: \((x - 2)(x + 5) \le 0\).
                  A gyökök: \(x_1 = -5\) és \(x_2 = 2\). Felfelé nyíló parabola tengely alatti része: \(-5 &lt; x \le 2\).
                </p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-300 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">3. Állomás (Végső szűrő - 5 pont):</span>
                <div className="mt-1 font-semibold text-emerald-900 dark:text-emerald-200">
                  Összefésülés a kikötéssel: A -5-nél nyílt (kerek zárójel), a 2-nél zárt (szögletes zárójel):
                  <div className="mt-2 text-center text-sm font-bold font-mono text-emerald-800 dark:text-emerald-200">
                    <MathText text="M = \; ]-5; 2] \quad \text{vagy} \quad -5 < x \le 2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 mt-2">
              <SignChartSprintSvg size={240} />
              <span className="text-[11px] text-slate-500 mt-2 font-medium">
                Az előjeltáblázat sprint levezetése és a nyílt/zárt határok ellenőrzése
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: Tipikus versenytaktikai csapdák és elkerülésük */}
      <TheorySection
        title="5. Tipikus versenytaktikai csapdák és pontozási stratégia"
        badge="TAKTIKA ÉS CSAPATMUNKA"
      >
        <TheoryCard
          title="Hogyan maximalizálja a csapat az összpontszámot?"
          icon={<ShieldAlert className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TheoryTrapBox
                title="1. Csapda: A gyorsaság a pontosság rovására megy"
                trap="A csapat kapkod, nem csinál próbát vagy nem nézi meg a kikötést, és bemondja az összes algebrailag kapott értéket."
                correction="Egy hamis gyök miatti büntetés (-10 pont) többet ront a mérlegen, mint amit a 2 másodperces időbónusz hoz! Az Ellenőr mindig csináljon ellenőrzést az eredeti egyenletbe!"
              />

              <TheoryTrapBox
                title="2. Csapda: Egyetlen ember dolgozik, a többiek nézik"
                trap="Az algebrailag leggyorsabb tag magára vállalja az összes levezetést, a csapat többi tagja passzív marad."
                correction="A feladatok párhuzamosíthatók: amíg az egyik a Viète-gyököket keresi, a másik írja a kikötéseket, a harmadik vázolja az előjeltáblázatot!"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-3 bg-pink-50 dark:bg-pink-950/30 rounded-xl border border-pink-200 dark:border-pink-800 mt-2">
              <ScoreboardTournamentSvg size={250} />
              <span className="text-[11px] text-pink-800 dark:text-pink-300 mt-2 font-medium">
                Eredményjelző tábla: a gyorsaság és a hamis gyökök szűrésének pontozási egyensúlya
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: Interaktív Csoportverseny Szimulátor és Aréna */}
      <TheorySection
        title="6. Interaktív Csoportverseny Aréna és Szimulátor"
        badge="INTERAKTÍV GYAKORLÓTÉR"
      >
        <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-slate-900 border border-pink-200 dark:border-pink-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                Csapatverseny Aréna – Válassz Állomást!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Tedd próbára a reflexeidet 3 versenyszituációban!
              </p>
            </div>

            {/* Állomás fülek */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={station === 'viete' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStation('viete')}
                className={station === 'viete' ? 'bg-pink-600 hover:bg-pink-700 text-white' : ''}
              >
                1. Viète Sprint
              </Button>
              <Button
                variant={station === 'detective' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStation('detective')}
                className={station === 'detective' ? 'bg-pink-600 hover:bg-pink-700 text-white' : ''}
              >
                2. Detektív Hiba
              </Button>
              <Button
                variant={station === 'sign' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStation('sign')}
                className={station === 'sign' ? 'bg-pink-600 hover:bg-pink-700 text-white' : ''}
              >
                3. Előjel Aréna
              </Button>
            </div>
          </div>

          {/* 1. ÁLLOMÁS: Viète Sprint */}
          {station === 'viete' && (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-pink-200 dark:border-pink-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
                  Gyorsasági Viète Gyökkeresés (Feladvány {vieteIndex + 1} / {vieteChallenges.length})
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-200">
                  Pontszám: {vieteScore} pont
                </span>
              </div>

              <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Melyek a másodfokú egyenlet egész gyökei?</div>
                <div className="text-2xl font-black font-mono text-pink-600 dark:text-pink-400">
                  {vieteChallenges[vieteIndex].eq}
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Tipp: {vieteChallenges[vieteIndex].hint}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Két gyök (pl: 4, 5 vagy -5, 3)"
                  value={vieteUserGuess}
                  onChange={(e) => setVieteUserGuess(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-mono"
                />
                <Button onClick={handleVieteCheck} className="bg-pink-600 hover:bg-pink-700 text-white">
                  Gyökök bemondása!
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVieteIndex((prev) => (prev + 1) % vieteChallenges.length);
                    setVieteUserGuess('');
                    setVieteFeedback(null);
                  }}
                >
                  Következő feladvány
                </Button>
              </div>

              {vieteFeedback && (
                <div className={`p-3 rounded-lg text-xs font-semibold ${
                  vieteFeedback.includes('Helyes')
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-300'
                }`}>
                  {vieteFeedback}
                </div>
              )}
            </div>
          )}

          {/* 2. ÁLLOMÁS: Detektív Hibakeresés */}
          {station === 'detective' && (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-pink-200 dark:border-pink-800 space-y-4">
              <div className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
                Detektív feladat: Melyik lépésben történt a végzetes hiba?
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                Egy diák az alábbi irracionális egyenletet oldotta meg: <span className="font-mono font-bold text-pink-600 dark:text-pink-400">√(3x + 1) = x - 1</span>.
                Kattints arra a lépésre, ahol a levezetés elcsúszott!
              </div>

              <div className="space-y-2">
                {detectiveSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDetectiveCheck(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start justify-between gap-3 ${
                      detectiveSelected === idx
                        ? step.isError
                          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:bg-pink-50/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <strong className="text-pink-700 dark:text-pink-300 font-mono mr-2">{step.stepNum}. Lépés:</strong>
                      {step.text}
                    </div>
                    {detectiveSelected === idx && (
                      <span>{step.isError ? '🚨 HIBA!' : '✓ KORREKT'}</span>
                    )}
                  </button>
                ))}
              </div>

              {detectiveFeedback && (
                <div className={`p-3 rounded-lg text-xs font-semibold ${
                  detectiveFeedback.includes('Bravó')
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-300'
                }`}>
                  {detectiveFeedback}
                </div>
              )}
            </div>
          )}

          {/* 3. ÁLLOMÁS: Előjel Aréna */}
          {station === 'sign' && (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-pink-200 dark:border-pink-800 space-y-4">
              <div className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
                Előjeles Villámkérdés: (x + 3)(x - 4) ≤ 0
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300">
                A másodfokú kifejezés gyökei: <span className="font-mono font-bold">-3</span> és <span className="font-mono font-bold">4</span>.
                Főegyüttható: \(a = 1 &gt; 0\). Milyen intervallumon veszi fel a kifejezés a <strong>nempozitív (≤ 0)</strong> értékeket?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSignCheck('belso')}
                  className={`p-4 h-auto text-xs justify-start border ${
                    signChoice === 'belso'
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-900 dark:text-pink-200'
                      : ''
                  }`}
                >
                  <div>
                    <div className="font-bold">A gyökök KÖZÖTTI zárt intervallumon:</div>
                    <div className="font-mono text-pink-600 dark:text-pink-400 mt-1">x ∈ [-3; 4]</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSignCheck('kulso')}
                  className={`p-4 h-auto text-xs justify-start border ${
                    signChoice === 'kulso'
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-900 dark:text-pink-200'
                      : ''
                  }`}
                >
                  <div>
                    <div className="font-bold">A gyökökön KÍVÜLI két félegyenesen:</div>
                    <div className="font-mono text-pink-600 dark:text-pink-400 mt-1">x ≤ -3  vagy  x ≥ 4</div>
                  </div>
                </Button>
              </div>

              {signFeedback && (
                <div className={`p-3 rounded-lg text-xs font-semibold ${
                  signFeedback.includes('Tökéletes')
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-300'
                }`}>
                  {signFeedback}
                </div>
              )}
            </div>
          )}

          {/* Kvíz indító gomb */}
          <div className="pt-2 flex justify-end">
            <Button
              onClick={onStartQuiz}
              className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-2 font-bold px-5 py-2.5 shadow-md"
            >
              Tovább a Csoportverseny Kvízre!
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
