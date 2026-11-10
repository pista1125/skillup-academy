import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheoryCard,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  TournamentBracketSvg,
  DetectiveErrorHuntSvg,
  SpeedDiscriminantGaugeSvg,
  TeamRelayStrategySvg
} from './GroupCompetitionFigures';
import {
  Trophy,
  Zap,
  Search,
  Users,
  CheckCircle2,
  Sliders,
  Award,
  ShieldAlert,
  Flame
} from 'lucide-react';

export interface GroupCompetitionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onStartPractice?: () => void;
  onSwitchToQuiz?: () => void;
}

export const GroupCompetitionTheory: React.FC<GroupCompetitionTheoryProps> = ({
  onBack,
  onStartQuiz,
  onStartPractice,
  onSwitchToQuiz
}) => {
  // Szimulátor 1: Villám Diszkrimináns Generátor
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-4);
  const [coeffC, setCoeffC] = useState<number>(3);

  // Szimulátor 2: Detektív Hibakereső Kártya
  const [activeDetectiveCard, setActiveDetectiveCard] = useState<number>(0);
  const [revealedSolution, setRevealedSolution] = useState<boolean>(false);

  // Szimulátor 3: Csapatverseny Eredménytábla
  const [teamScores, setTeamScores] = useState<Record<string, number>>({
    'Alpha Csapat': 45,
    'Béta Csapat': 55,
    'Gamma Csapat': 35,
    'Delta Csapat': 50
  });

  // Számítások 1-es:
  const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
  let rootCountText = '2 különböző valós gyök';
  let rootBadgeColor = 'text-emerald-700 bg-emerald-100 border-emerald-300';
  if (discriminant === 0) {
    rootCountText = '1 valós (kettős) gyök';
    rootBadgeColor = 'text-blue-700 bg-blue-100 border-blue-300';
  } else if (discriminant < 0) {
    rootCountText = '0 valós gyök (nincs valós megoldás)';
    rootBadgeColor = 'text-rose-700 bg-rose-100 border-rose-300';
  }

  const detectiveCases = [
    {
      title: '1. Eset: b = -6 esetén a diszkrimináns',
      badStep: 'D = -6² - 4 · 1 · 5 = -36 - 20 = -56  ⟹  Nincs megoldás!',
      correctExplanation: 'A negatív számot kötelező zárójelbe tenni: (-6)² = +36! Helyesen: D = 36 - 20 = 16 > 0, tehát KÉT valós gyök van (x₁ = 5, x₂ = 1)!'
    },
    {
      title: '2. Eset: 2x² - 8x = 0 megoldása leosztással',
      badStep: 'Osszunk le x-szel: 2x - 8 = 0  ⟹  2x = 8  ⟹  x = 4 az egyetlen gyök.',
      correctExplanation: 'Ismeretlennel (x-szel) TILOS leosztani, mert kiesik az x = 0 gyök! Helyes megoldás kiemeléssel: 2x(x - 4) = 0  ⟹  x₁ = 0 és x₂ = 4!'
    },
    {
      title: '3. Eset: 3x² + 5x - 2 = 0 megoldóképletének nevezője',
      badStep: 'x₁,₂ = (-5 ± √49) / 2 = (-5 ± 7) / 2  ⟹  x₁ = 1, x₂ = -6',
      correctExplanation: 'A nevezőben 2 · a szerepel! Mivel a = 3, a nevező 2 · 3 = 6! Helyesen: x₁,₂ = (-5 ± 7) / 6  ⟹  x₁ = 1/3, x₂ = -2!'
    },
    {
      title: '4. Eset: x² - 9 = 0 tiszta másodfokú egyenlet',
      badStep: 'x² = 9  ⟹  Gyökvonás után x = 3 az egyenlet egyetlen megoldása.',
      correctExplanation: 'A gyökvonáskor mind a pozitív, mind a negatív előjelet figyelembe kell venni: x₁,₂ = ±√9 = ±3! A -3 négyzete is 9!'
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-masodfoku-egyenletek"
      badge="10. OSZTÁLY • V. TÉMAKÖR"
      topicBadge="39. LECKE"
      title="Csoportverseny"
      subtitle="Kooperatív csapatfeladványok, villámkérdések, hibavadászat és stratégiai másodfokú bajnokság"
      themeColor="pink"
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onStartPractice={onStartPractice}
      quickRule={{
        label: 'A Csoportverseny 3 Arany Fegyvere',
        formula: '1. Ha a·c < 0 ⟹ D > 0 azonnal!  |  2. (-b)² = +b² mindig!  |  3. Nevező: 2·a!'
      }}
      sections={[
        {
          id: 'sec-tournament-structure',
          title: '1. A Csoportverseny szerkezete és a 4 forduló',
          description:
            'Hogyan épül fel az interaktív kooperatív verseny, és milyen pontozási rendszert alkalmazunk?',
          color: 'pink',
          badge: 'Bajnokság Menetrendje',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A 4 fordulós matematikai bajnokság állomásai"
                color="pink"
                icon={<Trophy className="w-5 h-5 text-pink-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A csoportverseny célja a másodfokú egyenletek teljes témakörének játékos, dinamikus elmélyítése. 3-4 fős csapatokban dolgozva nemcsak az egyéni számolási gyorsaság, hanem a hatékony együttműködés és az azonnali hibajavítás is döntő tényező:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-pink-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <TournamentBracketSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A bajnokság 4 állomása a villám diszkriminánstól a döntő szöveges váltófutamig
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-1.5">
                      <span className="font-bold text-pink-950 text-sm block">1. &amp; 2. Forduló: Tempó és Éberség</span>
                      <p className="text-xs text-slate-700">
                        • <strong>1. Forduló: Villámkvíz (10 pont):</strong> A diszkrimináns előjelének és a gyökök számának azonnali megállapítása fejben.
                        <br />
                        • <strong>2. Forduló: Detektív Hibakeresés (20 pont):</strong> Tipikus diákhubák felderítése kész levezetésekben.
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1.5">
                      <span className="font-bold text-amber-950 text-sm block">3. &amp; 4. Forduló: Stratégia és Csapatmunka</span>
                      <p className="text-xs text-slate-700">
                        • <strong>3. Forduló: Visszavezetési Stratégia (30 pont):</strong> Bikvadratikus, törtes és gyökös egyenletek helyettesítéseinek felismerése.
                        <br />
                        • <strong>4. Forduló: Döntő Szöveges Váltó (50 pont):</strong> Geometriai, pénzügyi és mozgásos feladatok modellezése időre.
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-speed-discriminant',
          title: '2. Villám diszkrimináns és fejben számolási trükkök',
          description:
            'Hogyan állapítható meg a gyökök száma 3 másodperc alatt anélkül, hogy a teljes képletet leírnánk?',
          color: 'rose',
          badge: 'Tempó & Gyorsaság',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A villámfejtés 3 szupertrükkje a versenyben"
                color="rose"
                icon={<Zap className="w-5 h-5 text-rose-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A verseny első fordulójában az a csapat szerez előnyt, amelyik papír és ceruza nélkül, azonnal látja a diszkrimináns természetét:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-rose-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <SpeedDiscriminantGaugeSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A diszkrimináns 3 kimenetele és villámgyors felismerési szabályai
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-950 block">1. Szupertrükk: a · c &lt; 0</span>
                      <p className="text-emerald-800">
                        Ha a másodfokú és a konstans tag <strong>különböző előjelű</strong>, akkor $-4ac &gt; 0$, így $D = b^2 - 4ac &gt; 0$ BIZTOSAN! <strong>Azonnal 2 valós gyök van!</strong>
                        <br />
                        <em>Példa:</em> $3x^2 + 10x - 7 = 0 \implies D &gt; 0$ azonnal!
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                      <span className="font-bold text-blue-950 block">2. Szupertrükk: Teljes négyzet</span>
                      <p className="text-blue-800">
                        Ha az egyenlet $(x \pm d)^2 = 0$ alakra hozható (pl. $x^2 - 6x + 9 = 0$), akkor $D = 0$, tehát <strong>pontosan 1 valós (kettős) gyök van!</strong>
                      </p>
                    </div>

                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                      <span className="font-bold text-rose-950 block">3. Szupertrükk: Tiszta pozitív</span>
                      <p className="text-rose-800">
                        Ha $ax^2 + c = 0$ és $a, c &gt; 0$ (pl. $x^2 + 16 = 0$), egy szám négyzete nem lehet negatív: <strong>azonnal 0 valós gyök (∅)!</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-detective-errors',
          title: '3. Detektív hibavadászat – A 6 leggyakoribb diákhuba',
          description:
            'Ismerd fel mások hibáit, hogy a saját csapatod soha ne veszítsen pontot apróságokon!',
          color: 'amber',
          badge: 'Hibaelhárítás',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A 6 leggyakoribb másodfokú buktató jegyzéke"
                color="amber"
                icon={<Search className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A versenyeken és a dolgozatokban a hibák 90%-a nem elméleti hiányosságból, hanem technikai elcsúszásból származik:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <DetectiveErrorHuntSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A 3 leggyakoribb vizsgacsapda: zárójelezés, nevezőbeli leosztás és előjelváltás
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">1. Hiba: Negatív szám négyzete zárójel nélkül.</strong>
                        <p className="text-slate-600">Ha b = -7, a számológépbe írt -7² = -49-et ad! Mindig zárójelben négyzetelj: (-7)² = +49!</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">2. Hiba: Osztás 2-vel 2a helyett.</strong>
                        <p className="text-slate-600">Ha a főegyüttható nem 1 (pl. 3x² + ...), a megoldóképlet nevezője 2 · 3 = 6, nem pedig 2!</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">3. Hiba: Nullával való tiltott osztás x-szel való leosztáskor.</strong>
                        <p className="text-slate-600">Az ax² + bx = 0 egyenletet soha ne oszd le x-szel! Ehelyett emelj ki: x(ax + b) = 0, így az x = 0 gyök megmarad!</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">4. Hiba: Hamis gyökök bent hagyása törtes és gyökös egyenleteknél.</strong>
                        <p className="text-slate-600">A nevezőt 0-vá tevő gyököt és a négyzetre emelésből származó hamis gyököket azonnal el kell vetni!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-team-roles',
          title: '4. Csapatstratégia, szerepek és a váltóverseny',
          description:
            'Hogyan osszuk meg a feladatokat a 4 csapattag között, hogy a leggyorsabban és legpontosabban oldjuk meg a feladványokat?',
          color: 'purple',
          badge: 'Csapatmunka & Szerepek',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A 4 fős váltócsapat ideális szereposztása"
                color="purple"
                icon={<Users className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A váltóversenyben minden csapattag egy-egy jól definiált részfeladatért felelős, így elkerülhető a párhuzamos felesleges számolás és a kapkodás:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <TeamRelayStrategySvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A stafétabot átadása: Elemző ⟶ Számoló ⟶ Megoldó ⟶ Ellenőr
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                      <span className="font-bold text-purple-950">1. Elemző:</span>
                      <p className="text-purple-800">
                        Felírja a szöveghez tartozó egyenletet, 0-ra rendezi, és rögzíti az a, b, c értékeket, valamint a kikötéseket (v &gt; 0, x ≠ 2).
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                      <span className="font-bold text-purple-950">2. Számoló:</span>
                      <p className="text-purple-800">
                        Kiszámolja a diszkriminánst ($D = b^2 - 4ac$), megállapítja a gyökök számát és kiszámítja a $\sqrt{D}$ értékét.
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                      <span className="font-bold text-purple-950">3. Megoldó:</span>
                      <p className="text-purple-800">
                        Alkalmazza a megoldóképletet vagy a szorzattá alakítást, és kiszámítja az $x_1$ és $x_2$ pontos számszerű értékeit.
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                      <span className="font-bold text-purple-950">4. Ellenőr:</span>
                      <p className="text-purple-800">
                        Viète-formulákkal ellenőriz ($x_1 + x_2 = -b/a$), kiszűri az értelmetlen negatív gyököket, és megfogalmazza a végső szöveges választ!
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-fair-play',
          title: '5. Pontozási rendszer és Fair Play szabályzat',
          description:
            'A verseny etikai kódexe, a bónuszpontok és a levonások rendszere.',
          color: 'pink',
          badge: 'Fair Play & Szabályzat',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A csoportverseny hivatalos értékelési rendszere"
                color="pink"
                icon={<Award className="w-5 h-5 text-pink-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-950 block">Helyes válasz:</span>
                      <p className="text-emerald-800">Minden helyesen megoldott feladat a forduló pontértékének 100%-át éri.</p>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-950 block">Gyorsasági bónusz:</span>
                      <p className="text-amber-800">A fordulóban elsőként hibátlan megoldást leadó csapat +5 bónuszpontot kap!</p>
                    </div>

                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                      <span className="font-bold text-rose-950 block">Elhamarkodott válasz:</span>
                      <p className="text-rose-800">Hamis gyök bennhagyása vagy elrontott mértékegység esetén a részpontszám levonásra kerül.</p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        }
      ]}
      interactiveSection={
        <div className="mt-10 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-pink-200 dark:border-pink-900/50 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 dark:border-pink-900/40 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/70 text-pink-800 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" /> Interaktív Verseny Edzőterem
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Gyakorolj a bajnokságra az interaktív szimulátorokkal!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Teszteld a villám diszkriminánst, vadássz hibákra és kövesd az élő csapatpontszámokat!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Szimulátor: Villám Diszkrimináns Generátor */}
            <div className="p-5 bg-gradient-to-b from-pink-50/60 to-rose-50/40 dark:bg-slate-800/60 rounded-2xl border border-pink-200 dark:border-pink-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-pink-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Villám Diszkrimináns</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Főegyüttható (a):</span>
                    <span className="font-bold text-pink-700">{coeffA}</span>
                  </div>
                  <input
                    type="range"
                    min={-4}
                    max={4}
                    step={1}
                    value={coeffA}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCoeffA(val === 0 ? 1 : val);
                    }}
                    className="w-full accent-pink-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Elsőfokú tag (b):</span>
                    <span className="font-bold text-pink-700">{coeffB}</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={coeffB}
                    onChange={(e) => setCoeffB(Number(e.target.value))}
                    className="w-full accent-pink-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Konstans tag (c):</span>
                    <span className="font-bold text-pink-700">{coeffC}</span>
                  </div>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={1}
                    value={coeffC}
                    onChange={(e) => setCoeffC(Number(e.target.value))}
                    className="w-full accent-pink-600 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-pink-100 dark:border-pink-900/40 space-y-1.5 font-mono">
                  <div className="text-center font-bold text-slate-800 dark:text-slate-200">
                    {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}x` : `- ${Math.abs(coeffB)}x`} {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`} = 0
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Diszkrimináns:</span>
                    <span className="font-black text-pink-700 dark:text-pink-400">D = {discriminant}</span>
                  </div>
                  <div className={`p-1.5 rounded-lg border text-[11px] font-sans font-bold text-center ${rootBadgeColor}`}>
                    {rootCountText}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Szimulátor: Detektív Hibakereső */}
            <div className="p-5 bg-gradient-to-b from-amber-50/60 to-orange-50/40 dark:bg-slate-800/60 rounded-2xl border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Hibavadász Kártyák</h4>
              </div>

              <div className="flex gap-1.5">
                {detectiveCases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveDetectiveCard(idx);
                      setRevealedSolution(false);
                    }}
                    className={`flex-1 py-1 rounded-md text-[11px] font-bold border ${
                      activeDetectiveCard === idx
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200'
                    }`}
                  >
                    #{idx + 1}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-900/40 space-y-2 text-xs">
                <span className="font-bold text-amber-950 dark:text-amber-300 block">
                  {detectiveCases[activeDetectiveCard].title}
                </span>
                <div className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 rounded-lg text-rose-900 dark:text-rose-300 font-mono text-[11px]">
                  ❌ {detectiveCases[activeDetectiveCard].badStep}
                </div>

                {revealedSolution ? (
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 rounded-lg text-emerald-900 dark:text-emerald-300 font-sans text-[11px]">
                    ✅ <strong>Detektív magyarázat:</strong> {detectiveCases[activeDetectiveCard].correctExplanation}
                  </div>
                ) : (
                  <button
                    onClick={() => setRevealedSolution(true)}
                    className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[11px] transition"
                  >
                    🔍 Hiba leleplezése
                  </button>
                )}
              </div>
            </div>

            {/* 3. Szimulátor: Élő Eredménytábla */}
            <div className="p-5 bg-gradient-to-b from-purple-50/60 to-indigo-50/40 dark:bg-slate-800/60 rounded-2xl border border-purple-200 dark:border-purple-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Csapat Eredménytábla</h4>
              </div>

              <div className="space-y-2 text-xs">
                {Object.entries(teamScores).map(([team, score]) => (
                  <div key={team} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{team}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-purple-700 dark:text-purple-400 text-sm">{score} pont</span>
                      <button
                        onClick={() =>
                          setTeamScores((prev) => ({
                            ...prev,
                            [team]: prev[team] + 5
                          }))
                        }
                        className="px-2 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-800 text-[10px] font-black rounded"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

