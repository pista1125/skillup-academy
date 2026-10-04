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
  Gamepad2,
  Trophy,
  Dices,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Flame,
  Percent
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface ProbabilityGameTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ProbabilityGameTheory: React.FC<ProbabilityGameTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Labor tab választó: 'nim' vagy 'dice'
  const [activeLabTab, setActiveLabTab] = useState<'nim' | 'dice'>('nim');

  // --- Nim-játék állapot ---
  const [totalMatches, setTotalMatches] = useState<number>(21);
  const [matchesLeft, setMatchesLeft] = useState<number>(21);
  const [turn, setTurn] = useState<'player' | 'ai'>('player');
  const [lastMoveText, setLastMoveText] = useState<string>('Te kezdesz! Válassz 1, 2 vagy 3 gyufát!');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null);
  const [showHelper, setShowHelper] = useState<boolean>(true);

  // Nim-játék újraindítása
  const resetNim = (initialCount: number = 21, starter: 'player' | 'ai' = 'player') => {
    setTotalMatches(initialCount);
    setMatchesLeft(initialCount);
    setGameOver(false);
    setWinner(null);
    setTurn(starter);

    if (starter === 'player') {
      setLastMoveText(`Új játék ${initialCount} gyufával. Te kezdesz!`);
    } else {
      setLastMoveText(`Új játék ${initialCount} gyufával. A gép kezd...`);
      setTimeout(() => aiStep(initialCount), 600);
    }
  };

  // Játékos lépése
  const handlePlayerMove = (take: number) => {
    if (gameOver || turn !== 'player' || take > matchesLeft) return;

    const remaining = matchesLeft - take;
    setMatchesLeft(remaining);

    // Ha elfogyott (utolsót vette el), a játékos vesztett!
    if (remaining === 0) {
      setGameOver(true);
      setWinner('ai');
      setLastMoveText(`Elvetted az utolsó ${take} gyufát, így sajnos vesztettél! A gép nyert.`);
      return;
    }

    setTurn('ai');
    setLastMoveText(`Elvettél ${take} gyufát. Maradt: ${remaining} db. Most a gép gondolkodik...`);

    // Gép lépése késleltetéssel
    setTimeout(() => {
      aiStep(remaining);
    }, 700);
  };

  // Okos AI lépés (4k + 1 célzása)
  const aiStep = (currentLeft: number) => {
    let take = 1;
    const rem = (currentLeft - 1) % 4;
    if (rem > 0 && rem <= 3 && rem < currentLeft) {
      take = rem;
    } else {
      // Ha már vesztő pozícióban van a gép, minimálisat vesz el reménykedve a játékos hibájában
      take = 1;
    }

    const nextMatches = currentLeft - take;
    setMatchesLeft(nextMatches);

    if (nextMatches === 0) {
      setGameOver(true);
      setWinner('player');
      setLastMoveText(`A gép kénytelen volt elvenni az utolsó gyufát! Gratulálunk, Te nyertél! 🎉`);
    } else {
      setTurn('player');
      setLastMoveText(`A gép elvett ${take} gyufát. Maradt: ${nextMatches} db. Te következel!`);
    }
  };

  // --- Két kocka összege kalkulátor állapot ---
  const [selectedSum, setSelectedSum] = useState<number>(7);

  // Két kocka kombinációk mátrixa (1-6 x 1-6)
  const diceCombinations: { d1: number; d2: number; sum: number }[] = [];
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      diceCombinations.push({ d1, d2, sum: d1 + d2 });
    }
  }

  const matchingCombos = diceCombinations.filter((c) => c.sum === selectedSum);
  const sumProbability = ((matchingCombos.length / 36) * 100).toFixed(1);

  return (
    <TheoryTemplate
      title="Játék: Stratégia és Szerencse"
      subtitle="Logikai és stratégiai játékok, nyerő stratégiák, a 21 gyufás Nim-játék, esélylatolgatás kockákkal és érmékkel, valamint a Fair Play"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="probability-game-theory-doc"
      pdfFilename="8_osztaly_jatek_strategia_tananyag.pdf"
      estimatedReadTime="15 perc"
      quickRule={{
        label: 'Alapelvek',
        formula: 'Fair Play: P(Győzelem) = 50% • Nim célállás: 4k + 1 gyufa'
      }}
      themeColor="indigo"
      practiceTitle="Készen állsz a stratégiai játékok és esélyek feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat nyerő stratégiákkal, a Nim-játékkal, tisztességes játékokkal és valószínűségi döntésekkel!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* INTERAKTÍV JÁTÉK ÉS ESÉLY LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="Interaktív Játék és Esély Labor"
        subtitle="Próbáld ki a klasszikus 21 gyufás Nim-játékot a gép ellen, vagy vizsgáld meg a két dobókocka összegének 36 kimenetelét!"
        badge="Interaktív Szimuláció"
        icon={<Gamepad2 className="w-5 h-5 text-indigo-600" />}
      >
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 p-5 rounded-3xl border-2 border-indigo-200/80 dark:border-indigo-900/60 shadow-lg space-y-5">
          {/* Labor fülek */}
          <div className="flex flex-wrap gap-2 border-b border-indigo-100 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveLabTab('nim')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'nim'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              1. 21 Gyufás Nim-Játék (Ember vs. Gép)
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('dice')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'dice'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              2. Két Dobókocka Összegei (36 Eset)
            </button>
          </div>

          {/* 1. FÜL: NIM-JÁTÉK */}
          {activeLabTab === 'nim' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/90 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Szabály:</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    Felváltva 1, 2 vagy 3 gyufa vehető el. <strong>Aki az utolsót kénytelen elvenni, az veszít!</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetNim(21, 'player')}
                    className="text-xs h-7 rounded-lg"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" /> Újra (Én kezdek, 21)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetNim(15, 'player')}
                    className="text-xs h-7 rounded-lg"
                  >
                    15 gyufa (Én kezdek)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetNim(21, 'ai')}
                    className="text-xs h-7 rounded-lg"
                  >
                    Gép kezd (21)
                  </Button>
                </div>
              </div>

              {/* Játéktér: Gyufaszálak grafikája */}
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-inner flex flex-col items-center gap-4">
                <div className="flex items-center justify-between w-full text-xs font-mono font-bold">
                  <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300">
                    <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                    Asztalon lévő gyufák: <span className="text-sm px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 rounded">{matchesLeft} / {totalMatches} db</span>
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    gameOver
                      ? winner === 'player'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : turn === 'player'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  }`}>
                    {gameOver
                      ? winner === 'player' ? 'Győztél! 🏆' : 'A gép nyert! 🤖'
                      : turn === 'player' ? 'Te következel 👤' : 'Gép gondolkodik... 🤖'}
                  </span>
                </div>

                {/* Gyufák kirajzolása flex-wrap-ban */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-3 max-w-xl min-h-[90px] items-center">
                  {Array.from({ length: totalMatches }).map((_, idx) => {
                    const isPresent = idx < matchesLeft;
                    return (
                      <div
                        key={`match-${idx}`}
                        className={`flex flex-col items-center transition-all duration-300 ${
                          isPresent ? 'opacity-100 scale-100' : 'opacity-10 scale-75 blur-[0.5px]'
                        }`}
                      >
                        {/* Gyufafej (piros/sárga lánggal) */}
                        <div className={`w-2.5 h-3.5 rounded-t-full ${
                          isPresent ? 'bg-gradient-to-t from-red-600 to-amber-400 shadow-xs' : 'bg-slate-400'
                        }`} />
                        {/* Gyufaszál fa része */}
                        <div className={`w-1.5 h-12 rounded-b-xs ${
                          isPresent ? 'bg-amber-200 dark:bg-amber-700 border border-amber-300 dark:border-amber-600' : 'bg-slate-300 dark:bg-slate-800'
                        }`} />
                        <span className="text-[8px] font-mono text-slate-400 mt-1">{idx + 1}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Információs sáv */}
                <div className="text-xs text-center font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 w-full max-w-lg">
                  {lastMoveText}
                </div>

                {/* Játékos gombjai */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Lépésed:</span>
                  {[1, 2, 3].map((num) => (
                    <Button
                      key={`btn-take-${num}`}
                      variant="default"
                      size="sm"
                      onClick={() => handlePlayerMove(num)}
                      disabled={gameOver || turn !== 'player' || num > matchesLeft}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8 px-4 rounded-xl shadow-sm disabled:opacity-30"
                    >
                      -{num} gyufa
                    </Button>
                  ))}
                </div>

                {/* Matematikai Stratégia Tipp Doboz */}
                <div className="w-full max-w-lg p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold text-indigo-900 dark:text-indigo-200">
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Matematikai Elemzés (4k + 1 Szabály):
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowHelper(!showHelper)}
                      className="text-[10px] underline text-indigo-600 hover:text-indigo-800"
                    >
                      {showHelper ? 'Elrejtés' : 'Megjelenítés'}
                    </button>
                  </div>
                  {showHelper && (
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      Jelenlegi darabszám: <strong>{matchesLeft} db</strong>. 
                      Osztási maradék 4-gyel: <strong>{matchesLeft % 4}</strong>.<br />
                      {matchesLeft % 4 === 1 ? (
                        <span className="text-rose-600 dark:text-rose-400 font-bold">
                          ⚠️ Vesztes pozícióban áll az, aki éppen lép! (1, 5, 9, 13, 17, 21 mind vesztes állás, ha a másik fél nem hibázik).
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          ✅ Nyerő pozíció! Végy el <strong>{(matchesLeft - 1) % 4} gyufát</strong>, hogy az ellenfélnek 4k + 1 gyufa maradjon!
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. FÜL: KÉT KOCKA ÖSSZEGE */}
          {activeLabTab === 'dice' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/90 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Válassz ki egy kockaösszeget (2-től 12-ig):</span>
                <div className="flex flex-wrap gap-1.5">
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => (
                    <button
                      key={`sum-btn-${s}`}
                      type="button"
                      onClick={() => setSelectedSum(s)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        selectedSum === s
                          ? 'bg-indigo-600 text-white shadow-sm scale-105'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 36 kimenetel mátrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-7 p-4 bg-white dark:bg-slate-950 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-inner flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-500 mb-2">
                    A 36 lehetséges dobáspár (Kocka 1 lefelé, Kocka 2 jobbra)
                  </span>

                  <div className="grid grid-cols-6 gap-1.5 text-center text-xs font-mono">
                    {diceCombinations.map((c) => {
                      const isMatch = c.sum === selectedSum;
                      return (
                        <div
                          key={`c-${c.d1}-${c.d2}`}
                          className={`p-1.5 rounded-lg border transition-all duration-200 ${
                            isMatch
                              ? 'bg-indigo-600 text-white border-indigo-700 font-black shadow-md scale-105'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] opacity-75">{c.d1}+{c.d2}</div>
                          <div className="font-bold">{c.sum}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mutatók és magyarázat */}
                <div className="lg:col-span-5 space-y-3 text-xs">
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-sm space-y-2">
                    <span className="font-black uppercase text-indigo-800 dark:text-indigo-200 flex items-center gap-1.5">
                      <Dices className="w-3.5 h-3.5 text-indigo-600" />
                      Kiválasztott összeg: {selectedSum}
                    </span>

                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between p-2 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40">
                        <span>Kedvező kimenetelek:</span>
                        <strong className="text-indigo-900 dark:text-indigo-200">{matchingCombos.length} db a 36-ból</strong>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40">
                        <span>Klasszikus valószínűség:</span>
                        <strong className="text-indigo-900 dark:text-indigo-200">{matchingCombos.length}/36 = {sumProbability}%</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                        Párok: {matchingCombos.map((c) => `(${c.d1}, ${c.d2})`).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50/70 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 text-purple-900 dark:text-purple-200 leading-relaxed">
                    <strong>Miért a 7 a leggyakoribb?</strong><br />
                    Mert a 7-es összeg pontosan 6 különböző módon állhat elő: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Ezzel szemben a 2 és a 12 csak 1-1 módon dobható meg.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 1. SZAKASZ: JÁTÉKOK OSZTÁLYOZÁSA */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. Játékok Osztályozása a Matematikában"
        subtitle="Hogyan különböztetjük meg a tiszta stratégiai, a szerencse- és a vegyes játékokat?"
        badge="Alapfogalmak"
        icon={<Gamepad2 className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Tiszta Stratégiai Játékok"
            subtitle="Nincs véletlen, teljes információ"
            icon={<Trophy className="w-4 h-4 text-indigo-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Nem szerepel bennük dobókocka vagy laphúzás. A játékosok minden pillanatban látják a tábla teljes állását.
              <br /><br />
              <strong>Példák:</strong> sakk, dáma, malom, amőba (ötödölő), Nim-játék.
              <br /><br />
              <strong>Matematikai sajátosság:</strong> Létezik egy <em>hibátlan nyerő stratégia</em> az egyik fél számára (vagy garantált döntetlen).
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Tiszta Szerencsejátékok"
            subtitle="Kizárólag a véletlen dönt"
            icon={<Dices className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A kimenetel teljesen független a játékos tudásától vagy logikájától, a véletlen fizikai folyamatok határozzák meg.
              <br /><br />
              <strong>Példák:</strong> lottó, rulett, tombolahúzás, fej vagy írás.
              <br /><br />
              <strong>Matematikai sajátosság:</strong> Hosszú távon a valószínűségi törvények érvényesülnek. A háznak általában matematikai előnye van.
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Vegyes Játékok"
            subtitle="Véletlen + Játékosi Döntések"
            icon={<Sparkles className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A kezdőfeltételeket vagy a lehetőségeket a véletlen adja (kártyaleosztás, kockadobás), de az eredményt a taktikai döntések alakítják.
              <br /><br />
              <strong>Példák:</strong> Monopoly, Catan telepesei, póker, snapszer, Gazdálkodj okosan.
              <br /><br />
              <strong>Matematikai sajátosság:</strong> A jó játékos valószínűségi kockázatelemzéssel hosszú távon felülmúlja a véletlent.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: A NIM-JÁTÉK ÉS A NYERŐ STRATÉGIÁK */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. Kétszemélyes Stratégiai Játékok és a Nim-játék"
        subtitle="Hogyan elemezzük a játékot a céltól visszafelé, és miért a 4-es modulus a kulcs?"
        badge="Nyerő Stratégiák"
        icon={<Trophy className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            A kétszemélyes stratégiai játékokat gyakran <strong>visszalépéses elemzéssel (retrográd analízis)</strong> fejtjük meg: a végállapotból indulunk el visszafelé!
          </p>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 space-y-3">
            <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300">
              A 21 Gyufás Játék Elemzése (1, 2 vagy 3 vehető, az utolsó veszít)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                <span className="font-bold text-rose-800 dark:text-rose-200 block mb-1">1 gyufa marad</span>
                Aki soron következik, kénytelen elvenni, így azonnal <strong>veszít</strong>! (Célunk 1 gyufát hagyni a másiknak).
              </div>

              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 block mb-1">2, 3 vagy 4 gyufa</span>
                Nyerő helyzet! Elveszünk 1, 2 vagy 3 gyufát úgy, hogy <strong>pontosan 1 gyufát hagyunk</strong> az ellenfélnek.
              </div>

              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                <span className="font-bold text-rose-800 dark:text-rose-200 block mb-1">5 gyufa marad</span>
                Bármit veszünk el (1-et, 2-t vagy 3-at), az ellenfél a 2, 3 vagy 4-es nyerő mezőre léphet! Így az 5 <strong>vesztes pozíció</strong>.
              </div>

              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900">
                <span className="font-bold text-indigo-800 dark:text-indigo-200 block mb-1">A 4-es Lépéspár</span>
                Mivel 1 + 3 = 4, az ellenfél lépését mindig ki tudjuk egészíteni 4-re. Vesztő állások: <strong>1, 5, 9, 13, 17, 21</strong>!
              </div>
            </div>
          </div>

          <TheoryCallout title="A Szimmetria Elv Táblás Játékokban" variant="success">
            <p className="text-xs leading-relaxed">
              Számos kétszemélyes játékban a <strong>szimmetrikus válaszlépések</strong> adják a biztos győzelmet.
              Például ha egy kör alakú asztalra felváltva érméket helyezünk el:
              <br />
              1. Az első játékos leteszi az érméjét <strong>pontosan a kör középpontjába</strong>.
              <br />
              2. Ezután a második játékos bármelyik lépésére az első játékos <strong>a középpontra vett tükörképpel</strong> válaszol.
              <br />
              Mivel a pálya szimmetrikus, a tükörkép garantáltan szabad lesz, így a második játékos fogy ki előbb a helyből!
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: ESÉLYEK ÉS AZ IGAZSÁGOS JÁTÉK (FAIR PLAY) */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Esélyek és az Igazságos Játék (Fair Play)"
        subtitle="Mikor igazságos egy játék, és hogyan határozzuk meg a pontos nyerési esélyeket?"
        badge="Esélylatolgatás"
        icon={<Dices className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Egy kétszemélyes szerencsejáték akkor <strong>igazságos (Fair Play)</strong>, ha a játékszabályok egyik félnek sem biztosítanak rejtett matematikai előnyt.
          </p>

          <TheoryTable
            headers={['Játék Szituáció', 'Lehetséges Esetek Száma', 'Kimenetelek Esélye', 'Igazságos?']}
            rows={[
              ['Kő-Papír-Olló (1 menet)', '3 · 3 = 9 eset', '3 győzelem (33,3%), 3 vereség (33,3%), 3 döntetlen (33,3%)', '✅ Teljesen igazságos'],
              ['Két érme: Anna (FF) vs. Béla (FÍ, ÍF, ÍÍ)', '2 · 2 = 4 eset', 'Anna esélye 1/4 (25%), Béla esélye 3/4 (75%)', '❌ Nem igazságos (Béla 3x előnyben)'],
              ['Két kocka: Anna (páros összeg) vs. Béla (páratlan)', '6 · 6 = 36 eset', 'Anna: 18 eset (50%), Béla: 18 eset (50%)', '✅ Teljesen igazságos'],
              ['Két kocka: Anna (7-es összeg) vs. Béla (2-es vagy 12-es)', '6 · 6 = 36 eset', 'Anna: 6 eset (16,7%), Béla: 2 eset (5,6%)', '❌ Nem igazságos (Anna 3x előnyben)']
            ]}
          />

          <TheoryCallout title="Hogyan tehető igazságossá egy nem egyenlő esélyű játék?" variant="warning">
            <p className="text-xs leading-relaxed">
              Ha a nyerési esélyek nem egyenlőek (pl. Anna esélye 1/3, Béla esélye 2/3), a játék akkor tehető igazságossá, ha a nyeremény arányát fordítottan arányosítjuk: Anna győzelme esetén <strong>kétszer akkora jutalmat kap</strong>, mint Béla. Így a várható nyeremény mindkét fél számára egyenlő lesz.
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: VALÓSZÍNŰSÉGI TÉVEDÉSEK ÉS A MONTY HALL PARADOXON */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Valószínűségi Tévedések és a Monty Hall Paradoxon"
        subtitle="Miért csal meg bennünket az emberi megérzés a véletlen eseményeknél?"
        badge="Döntéselmélet"
        icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-4">
          <TheoryTrapBox title="A Szerencsejátékosok Tévedése (Gambler's Fallacy):">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha egy szabályos érmével hétszer egymás után FEJET dobunk, az emberek többsége meg van győződve arról, hogy a 8. dobás már „biztosan írás lesz, mert a szerencsének kiegyenlítődnie kell”.
              <br /><br />
              <strong>A matematikai valóság:</strong> A fizikai érmének vagy kockának <strong>nincsen memóriája</strong>! A kísérletek egymástól teljesen <em>függetlenek</em>. A nyolcadik dobásnál a fej és az írás esélye pontosan ugyanúgy <strong>1/2 (50%)</strong> marad, mint az elsőnél volt!
            </p>
          </TheoryTrapBox>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 space-y-3">
            <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300">
              A Híres Monty Hall Paradoxon (3 Ajtó Probléma)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egy tévévetélkedőben 3 zárt ajtó van: 1 mögött autó, 2 mögött kecske áll. Kiválasztod az 1. ajtót. A műsorvezető kinyitja a 3. ajtót, ami mögött kecske van, majd felajánlja: <em>Akarod a 2. ajtóra cserélni a választásodat?</em>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                <strong className="text-rose-800 dark:text-rose-200 block mb-1">A téves megérzés:</strong>
                „Két ajtó maradt, tehát 50% - 50% az esély, mindegy, hogy váltok-e.”
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                <strong className="text-emerald-800 dark:text-emerald-200 block mb-1">A matematikai valóság:</strong>
                A kezdő választásnál <strong>2/3 eséllyel kecskét</strong> választottál! Mivel a műsorvezető kizárta a másik kecskét, ajtóváltással <strong>pontosan 2/3 (66,7%) eséllyel nyersz autót</strong>! Mindig megéri váltani!
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProbabilityGameTheory;
