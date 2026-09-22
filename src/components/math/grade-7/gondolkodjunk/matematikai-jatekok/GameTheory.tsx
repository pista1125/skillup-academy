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
  NimGame21Diagram,
  SymmetryStrategyDiagram,
  KnightsKnavesDiagram
} from './GameDiagrams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Split,
  Layers,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Swords,
  User,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const GameTheory: React.FC<GameTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive 21-Stones Game State vs Computer
  const [stones, setStones] = useState<number>(21);
  const [turn, setTurn] = useState<'player' | 'bot'>('player');
  const [winner, setWinner] = useState<'player' | 'bot' | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([
    'A játék elkezdődött: 21 kavics van az asztalon. Te kezdesz!'
  ]);

  const handlePlayerMove = (take: number) => {
    if (winner || stones < take || turn !== 'player') return;

    const remaining = stones - take;
    const newLog = [...gameLog, `Te elvettél ${take} db kavicsot. (Maradt: ${remaining} db)`];

    if (remaining === 0) {
      setStones(0);
      setWinner('player');
      setGameLog([...newLog, '🏆 Gratulálunk, Te nyertél! Elvitted az utolsó kavicsot!']);
      return;
    }

    setStones(remaining);
    setTurn('bot');

    // Bot move: Optimal winning strategy (leave a multiple of 4 if possible, else take 1)
    setTimeout(() => {
      let botTake = remaining % 4;
      if (botTake === 0) {
        // If already in losing position, pick 1
        botTake = 1;
      }

      const botRemaining = remaining - botTake;
      const botLog = [...newLog, `🤖 A gép elvett ${botTake} db kavicsot. (Maradt: ${botRemaining} db)`];

      if (botRemaining === 0) {
        setStones(0);
        setWinner('bot');
        setGameLog([...botLog, '🤖 A gép nyert! Legközelebb próbáld a 4 többszöröseit hagyni!']);
      } else {
        setStones(botRemaining);
        setTurn('player');
        setGameLog(botLog);
      }
    }, 600);
  };

  const handleResetGame = () => {
    setStones(21);
    setTurn('player');
    setWinner(null);
    setGameLog(['Új játék indult: 21 kavics van az asztalon. Te kezdesz!']);
  };

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-games-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_matematikai_jatekok.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="6. Matematikai játékok"
      subtitle="Kétszemélyes játékok, nyerő stratégiák, szimmetria-elv, visszafelé gondolkodás és logikai fejtörők"
      quickRule={{
        label: 'Nyerő Stratégia Szabályai',
        formula: '21-es játék: cél a 4 többszöröse • Szimmetria: tükrözd az ellenfél lépését'
      }}
      themeColor="amber"
      practiceTitle="Készen állsz a nyerő stratégiák és logikai fejtörők gyakorlására?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten, kártyás párosítóval és csoportosító játékkal!"
    >
      {/* SECTION 1: Kétszemélyes Végső Játékok és Pozíciók */}
      <TheorySection
        number={1}
        title="Kétszemélyes Teljes Információjú Játékok"
        icon={<Gamepad2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A matematikában olyan <strong>kétszemélyes stratégiai játékokat</strong> vizsgálunk, amelyekben:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
            <TheoryCard title="1. Nincs Szerencse" variant="amber">
              <p className="text-slate-700 dark:text-slate-300">
                Nincs dobókocka vagy véletlenszerű kártyahúzás. A kimenetel kizárólag a játékosok döntésein múlik.
              </p>
            </TheoryCard>

            <TheoryCard title="2. Teljes Információ" variant="amber">
              <p className="text-slate-700 dark:text-slate-300">
                Mindkét játékos ismeri a tábla és a bábuk/kavicsok pontos helyzetét, nincsenek rejtett lapok.
              </p>
            </TheoryCard>

            <TheoryCard title="3. Véges Lépésszám" variant="amber">
              <p className="text-slate-700 dark:text-slate-300">
                A játék előbb-utóbb biztosan véget ér (nincs végtelen körforgás), és nem lehet döntetlen (vagy pontosan definiált).
              </p>
            </TheoryCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Nyerő Pozíció" variant="emerald">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Olyan állás, amelyből létezik <strong>legalább egy olyan lépés</strong>, amellyel a másik játékost vesztő pozícióba hozhatjuk.
              </p>
            </TheoryCard>

            <TheoryCard title="Vesztő Pozíció" variant="rose">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Olyan állás, amelyből <strong>bármit lép a soron következő játékos</strong>, a másik játékos nyerő pozícióba kerülhet.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 2: A Szimmetria Elve mint Nyerő Stratégia */}
      <TheorySection
        number={2}
        title="A Szimmetria Elve (Tükrözéses Nyerő Stratégia)"
        icon={<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Sok geometriai vagy elhelyezéses játékban a legelegánsabb nyerő stratégia a <strong>szimmetrikus válaszlépés</strong>. Ha egy állás szimmetrikus, akkor a szimmetria megőrzésével a kezdő vagy a második játékos biztosíthatja a győzelmet.
          </p>

          <SymmetryStrategyDiagram />

          <TheoryCallout variant="tip" title="Hogyan ismerjük fel a szimmetria-stratégiát?">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Középpontos szimmetria:</strong> Ha van kitüntetett középpont (pl. kerek asztal, négyzet közepe), a kezdő játékos elfoglalja a középpontot, majd a másik lépéseit a középpontra tükrözi.</li>
              <li><strong>Páros/Kétoldali szimmetria:</strong> Két egyforma kupac vagy két szimmetrikus térfél esetén a 2. játékos pontosan lemásolja az 1. játékos lépését a másik oldalon.</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SECTION 3: Visszafelé Gondolkodás és a 21-es Játék */}
      <TheorySection
        number={3}
        title="Visszafelé Gondolkodás: A 21-es Kavicslevételi Játék"
        icon={<Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor a játék célja az utolsó kavics elvétele (vagy egy adott szám elérése), a stratégiát a <strong>végcéltól visszafelé</strong> építjük fel (retrográd analízis).
          </p>

          <NimGame21Diagram />

          {/* INTERAKTÍV 21-ES JÁTÉK A GÉP ELLEN */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200 text-sm sm:text-base">
                <Gamepad2 className="w-5 h-5 text-amber-600" />
                <span>Interaktív Játéklabor: Játssz a 21-es Játékban a Gép Ellen!</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetGame}
                className="h-8 px-2.5 rounded-xl border-amber-300 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-950 text-xs font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Újraindítás
              </Button>
            </div>

            {/* Game Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-850 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              {/* Left: Table and Controls */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Kavicsok az asztalon:
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-amber-600 dark:text-amber-400">
                    {stones} db
                  </div>
                </div>

                {/* Stones Visual Display */}
                <div className="flex flex-wrap justify-center gap-1.5 max-w-xs p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 min-h-[70px] items-center">
                  {Array.from({ length: stones }).map((_, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-xs inline-block animate-in zoom-in-75 duration-150"
                    />
                  ))}
                  {stones === 0 && (
                    <span className="text-xs font-bold text-slate-400 italic">Nincs több kavics az asztalon</span>
                  )}
                </div>

                {/* Player Action Buttons */}
                <div className="w-full space-y-2">
                  <div className="text-xs font-bold text-center text-slate-700 dark:text-slate-300">
                    {winner ? (
                      <span className="text-sm font-black text-emerald-600">A játék véget ért!</span>
                    ) : turn === 'player' ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center gap-1">
                        <User className="w-3.5 h-3.5" /> Te következel! Hány kavicsot veszel el?
                      </span>
                    ) : (
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center gap-1">
                        <Bot className="w-3.5 h-3.5 animate-spin" /> A gép gondolkodik...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((num) => (
                      <Button
                        key={num}
                        disabled={turn !== 'player' || stones < num || winner !== null}
                        onClick={() => handlePlayerMove(num)}
                        className={cn(
                          "h-10 rounded-xl font-bold text-sm",
                          num === 1 ? "bg-amber-500 hover:bg-amber-600 text-white" : num === 2 ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                        )}
                      >
                        -{num} kavics
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Game Log Console */}
              <div className="flex flex-col h-full min-h-[220px]">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Lépéstörténet és Eseménynapló:
                </div>
                <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5 overflow-y-auto max-h-48">
                  {gameLog.map((log, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "leading-snug",
                        log.startsWith('🏆') ? "text-emerald-600 font-bold" : log.startsWith('🤖 A gép nyert') ? "text-rose-600 font-bold" : log.startsWith('Te') ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 4: Többkupacos Nim és Paritásos Játékok */}
      <TheorySection
        number={4}
        title="Nim-Játékok és a Paritás Szerepe"
        icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A <strong>Nim-játék</strong> a matematikai játékelmélet egyik leghíresebb mintapéldája. Több kavicskupacból veszünk el elemeket.
          </p>

          <TheoryTable
            headers={['Játéktípus', 'Kezdőállás', 'Szabály', 'Nyerő Stratégia']}
            rows={[
              ['Egykupacos Nim (m elvehető)', 'N kavics egy kupacban', '1, 2, ..., m vehető el', 'Az nyer, aki (m + 1) többszörösét hagyja az ellenfélnek.'],
              ['Két egyforma kupac', 'A és B kupacban n-n elem', 'Bármelyikből tetszőleges számú elvehető', 'A 2. játékos szimmetrikusan ugyanannyit vesz el a másik kupacból.'],
              ['100-as elvevős játék', '100 kavics, 1..9 vehető el', 'Elvehető max 9 db (osztó: 10)', 'A kezdő elvesz 100 mod 10 = 0 helyett a kezdő utáni lépés dönt (itt a 2. nyer).']
            ]}
          />
        </div>
      </TheorySection>

      {/* SECTION 5: Logikai Fejtörők: Igazmondók és Hazugok */}
      <TheorySection
        number={5}
        title="Logikai Fejtörők: Igazmondók és Hazugok Szigete"
        icon={<Swords className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Az igazmondók (lovagok) és hazugok (lókötők) szigetén minden lakos vagy <strong>mindig igazat mond</strong>, vagy <strong>mindig hazudik</strong>. A megoldás kulcsa az <strong>esetszétválasztás</strong>: feltesszük az egyik szereplőről, hogy igazmondó, és ellenőrizzük, kapunk-e ellentmondást.
          </p>

          <KnightsKnavesDiagram />

          <TheoryTrapBox title="Klasszikus fejtörő: Mit mondhat egy lakos magáról?">
            <p className="text-xs sm:text-sm">
              Egy lakos <strong>sosem mondhatja azt, hogy „Én hazug vagyok”</strong>!
              <br />
              - Ha igazmondó lenne, igazat kellene mondania, tehát nem mondhatja magát hazugnak.
              <br />
              - Ha hazug lenne, hazudnia kellene, tehát nem mondhatná az igazságot magáról, hogy hazug.
            </p>
          </TheoryTrapBox>

          <TheoryCallout variant="tip" title="Összefoglaló arany szabályok matematikai játékokhoz">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li><strong>21-es játék:</strong> mindig törekedj arra, hogy a lépésed után a kavicsok száma <strong>4 többszöröse</strong> legyen ($4, 8, 12, 16, 20$)!</li>
              <li><strong>Szimmetria:</strong> ha a tábla szimmetrikus, tükrözd az ellenfél lépéseit!</li>
              <li><strong>Visszafelé gondolkodás:</strong> az utolsó lépésből kiindulva keresd meg a vesztő és nyerő pozíciókat!</li>
              <li><strong>Igazmondók és hazugok:</strong> alkalmazz esetszétválasztást, és keresd az ellentmondásokat!</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
