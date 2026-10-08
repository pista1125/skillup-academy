import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import {
  Gamepad2,
  Trophy,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  RotateCcw,
  Bot,
  User,
  Layers,
  ArrowRight,
  HelpCircle,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MathGamesTheoryProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

export const MathGamesTheory: React.FC<MathGamesTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  // Interactive Game Simulator State
  // Game: Race to Target (Nim variant): players take 1..maxStep. Target is typically 21 or 30.
  const [target, setTarget] = useState<number>(21);
  const [maxStep, setMaxStep] = useState<number>(3);
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [history, setHistory] = useState<{ player: 'Játékos' | 'Gép'; added: number; total: number }[]>([]);
  const [isAiTurn, setIsAiTurn] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<'player' | 'ai' | null>(null);

  // Cycle length: maxStep + 1
  const cycle = maxStep + 1;

  // Key winning numbers: numbers where (target - k) % cycle === 0
  const keyPositions = useMemo(() => {
    const list: number[] = [];
    for (let i = target; i >= 0; i -= cycle) {
      list.push(i);
    }
    return list.sort((a, b) => a - b);
  }, [target, cycle]);

  const resetGame = (newTarget = target, newMaxStep = maxStep) => {
    setTarget(newTarget);
    setMaxStep(newMaxStep);
    setCurrentNumber(0);
    setHistory([]);
    setIsAiTurn(false);
    setGameResult(null);
  };

  // Player makes a move
  const handlePlayerMove = (added: number) => {
    if (gameResult !== null || isAiTurn) return;
    const nextVal = currentNumber + added;
    if (nextVal > target) return;

    const newHistory = [...history, { player: 'Játékos' as const, added, total: nextVal }];
    setCurrentNumber(nextVal);
    setHistory(newHistory);

    if (nextVal === target) {
      setGameResult('player');
      return;
    }

    // AI turn
    setIsAiTurn(true);
    setTimeout(() => {
      // AI perfect strategy: try to reach the next key position
      const neededRemainder = target % cycle;
      let aiAdd = 1;

      // Find the smallest key position > nextVal
      const nextKey = keyPositions.find(kp => kp > nextVal);
      if (nextKey && nextKey - nextVal >= 1 && nextKey - nextVal <= maxStep) {
        aiAdd = nextKey - nextVal;
      } else {
        // If already on a key position or forced, pick 1 or random
        aiAdd = Math.floor(Math.random() * maxStep) + 1;
        if (nextVal + aiAdd > target) aiAdd = target - nextVal;
      }

      const aiTotal = nextVal + aiAdd;
      setHistory([...newHistory, { player: 'Gép' as const, added: aiAdd, total: aiTotal }]);
      setCurrentNumber(aiTotal);
      setIsAiTurn(false);

      if (aiTotal === target) {
        setGameResult('ai');
      }
    }, 600);
  };

  return (
    <TheoryTemplate
      title="10. Matematikai játékok"
      subtitle="Kétszemélyes logikai játékok, nyerő stratégiák, a visszafelé gondolkodás művészete, paritás, szimmetria és az oszthatóság a játékok világában."
      badgeText="7. Osztály • Matematika IV. Témakör • 10. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="🎮"
      themeColor="rose"
      documentId="g7-powers-games-theory-doc"
      pdfFilename="7_osztaly_matematikai_jatekok.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Nyerő Stratégiák és Kulcspozíciók',
        formula: 'Visszafelé gondolkodás | Kulcsszámok: n - k(lépés + 1) | Paritás & szimmetria megőrzése'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="18 perc"
    >
      {/* 1. SZEKCIÓ: A VISSZAFELÉ GONDOLKODÁS ÉS NYERŐ POZÍCIÓK */}
      <TheorySection
        number={1}
        title="1. Kétszemélyes Játékok és a Visszafelé Gondolkodás Elve"
        badgeColor="rose"
        icon={<Gamepad2 className="w-6 h-6 text-rose-600" />}
      >
        <TheoryCard title="Mitől matematikai egy játék és mi a biztos győzelem titka?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A mindennapi játékokban gyakran a szerencse (pl. dobókocka) vagy a gyorsaság dönt. A <strong>matematikai játékokban</strong> azonban nincs szerencse: a szabályok teljesen ismertek, nincs rejtett információ, és a lépések felváltva történnek. Az ilyen játékok csodája, hogy szinte mindig létezik egy <strong>nyerő stratégia</strong>!
          </p>

          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-800 space-y-2 mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 dark:text-rose-300">
              A Visszafelé Gondolkodás Aranyszabálya
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Ne az elejéről próbálkozz vakon! Indulj ki a <strong>végállapotból</strong> (a célból), és lépésről lépésre fejtsd vissza, milyen állásból kényszeríthető ki a győzelem!
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-rose-700 dark:text-rose-300">
              Cél ➔ Nyerő mezők ➔ Vesztő mezők ➔ Kezdőpozíció
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nyerő vs Vesztő pozíciók */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Nyerő és Vesztő Pozíciók</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Nyerő pozíció (N):</strong> Olyan állás, amelyből létezik legalább EGY olyan lépés, amellyel az ellenfelet vesztő pozícióba juttathatjuk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Vesztő pozíció (V):</strong> Olyan állás, amelyből BÁRMIT lépünk, az ellenfél utána nyerő pozícióba kerül. (Aki ide kerül, az vesztésre van ítélve, ha a másik nem hibázik!)</span>
                </li>
              </ul>
            </div>

            {/* Invariáns tulajdonságok */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                Az Invariáns Fogalma (Változatlan Szabály)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sok játékban egy olyan tulajdonságot kell keresnünk, amely a lépések során <strong>állandó marad (invariáns)</strong> vagy ciklikusan ismétlődik.
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-rose-700 dark:text-rose-300">
                Példa: "Egy lépéspár után az összeg mindig 4-gyel nő."
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A 21-ES ÉS 100-AS SZÁMVERSENY */}
      <TheorySection
        number={2}
        title="2. A 21-es és 100-as Számverseny (A kiegészítő stratégia)"
        badgeColor="rose"
        icon={<Trophy className="w-6 h-6 text-rose-600" />}
      >
        <TheoryCard title="Hogyan győzhetünk a számversenyekben a moduláris számtan segítségével?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A legismertebb számelméleti játék: 0-tól indulva a játékosok felváltva adnak hozzá <strong>1-et, 2-t vagy 3-at</strong> az összeghez. Az nyer, aki pontosan eléri a <strong>21-et</strong> (vagy a 100-at).
          </p>

          <div className="p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-300 dark:border-rose-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 dark:text-rose-300">
              A Kiegészítő Stratégia Titka
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Mivel a legnagyobb megengedett lépés 3, egy lépéspár (a mi lépésünk + az ellenfél lépése) <br />
              <strong className="text-rose-700 dark:text-rose-300">MINDIG pontosan 4-re egészíthető ki</strong>! (1+3 = 4, 2+2 = 4, 3+1 = 4).
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Általánosan: ha a lépésköz legfeljebb <em>k</em>, a ciklus hossza mindig <strong>k + 1</strong>!
            </p>
          </div>

          <div className="space-y-4">
            {/* Kulcsszámok levezetése */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="font-bold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                Visszafejtés: A 21-es játék kulcsszámai
              </span>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">5. Cél: 21</div>
                  <div className="text-slate-500 text-[11px]">Aki eléri a 21-et, nyer.</div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">4. Kulcs: 17</div>
                  <div className="text-slate-500 text-[11px]">21 - 4 = 17 (17-ről ellenfél 18-20-at ad).</div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">3. Kulcs: 13</div>
                  <div className="text-slate-500 text-[11px]">17 - 4 = 13.</div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">2. Kulcs: 9 & 5</div>
                  <div className="text-slate-500 text-[11px]">13 - 4 = 9, 9 - 4 = 5.</div>
                </div>
                <div className="p-2.5 bg-rose-100 dark:bg-rose-950/60 rounded-xl border border-rose-300 dark:border-rose-700 font-bold">
                  <div className="text-rose-900 dark:text-rose-200">1. Kezdő lépés: 1!</div>
                  <div className="text-rose-700 dark:text-rose-300 text-[11px]">5 - 4 = 1 (21 mod 4 = 1).</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                <strong>A győztes stratégia:</strong> A kezdő játékos az <strong>1-et mondja</strong>, utána pedig bármit mond a második játékos, a kezdő mindig úgy válaszol, hogy a két lépés összege 4 legyen. Így sorban eléri az <strong>5, 9, 13, 17, 21</strong> kulcsszámokat, és megnyeri a játékot!
              </p>
            </div>

            {/* 100-as játék különbsége */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-200 dark:border-rose-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Mi a helyzet a 100-as játéknál? Ki nyer?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mivel <MathText>100 = 4 · 25</MathText> (maradék 0!), a kulcsszámok a 4 többszörösei: <strong>4, 8, 12, ..., 96, 100</strong>. <br />
                Mivel 0-ról indulva a kezdő csak 1, 2 vagy 3-at tud lépni, <strong>a MÁSODIK játékos nyerhet biztosan</strong>! Bármit lép a kezdő (pl. <em>x</em>), a második <em>4 - x</em>-et lép, így mindig eléri a 4 többszöröseit!
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: PARITÁS, SZIMMETRIA ÉS OSZTÓKIVONÁS */}
      <TheorySection
        number={3}
        title="3. Paritás, Szimmetria és Oszthatósági Játékok"
        badgeColor="rose"
        icon={<Sparkles className="w-6 h-6 text-rose-600" />}
      >
        <TheoryCard title="Szimmetrikus stratégia és paritási trükkök">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A számelméletben nem minden játék moduláris összeadás. A <strong>szimmetria</strong> és a <strong>párosság (paritás)</strong> két olyan alapvető fegyver, amellyel ránézésre megoldhatók bonyolult játékok is:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Szimmetria elv */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                1. A Szimmetrikus Másolás Stratégiája
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a játéktábla szimmetrikus (pl. kör alakú asztalra helyezünk felváltva érméket úgy, hogy ne fedjék egymást):
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <strong>A kezdő lép a szimmetriaközéppontba!</strong> (Az asztal mértani közepére teszi az első érmét).
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  Ezután bármit lép a második játékos, a kezdő <strong>pontosan a középpontra vett tükörképét</strong> lépi! Mivel a tükörkép mindig szabad, a kezdőnek garantáltan lesz lépése ➔ <strong>a kezdő nyer</strong>!
                </li>
              </ul>
            </div>

            {/* 2. Az Osztókivonós Játék */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                2. Paritás és Osztókivonás
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Szabály: Egy N számból felváltva kivonhatunk egy tetszőleges valódi osztóját (<MathText>1 ≤ d &lt; n</MathText>). Az veszít, aki nem tud lépni (ha eléri az 1-et).
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div>• Páratlan számnak CSAK páratlan osztói vannak.</div>
                <div>• Páratlan - páratlan = <strong>PÁROS szám</strong>!</div>
                <div>• Páros számból mindig kivonható az 1 (ami páratlan) ➔ <strong>PÁRATLAN szám</strong>!</div>
                <div className="text-rose-700 dark:text-rose-300 font-bold pt-1">
                  Nyerő taktika: mindig adjunk PÁRATLAN számot az ellenfélnek!
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* Tipikus tévhitek */}
        <TheoryTrapBox
          title="Gyakori buktatók a matematikai játékok elemzésekor"
          traps={[
            {
              wrong: 'A kezdő játékosnak mindig van nyerő stratégiája.',
              correct: 'Nem igaz! Ha a kezdőállapot maga egy vesztő pozíció (pl. a 100-as játék 0-ról indulva, mert 100 osztható 4-gyel), akkor a második játékos rendelkezik biztos nyerő stratégiával!'
            },
            {
              wrong: 'A játékot előrefele, lépésről lépésre próbálgatva a legkönnyebb megoldani.',
              correct: 'A kombinációk száma előrefelé exponenciálisan nő. A hatékony matematikai módszer mindig a VISSZAFELÉ GONDOLKODÁS a célból indulva!'
            },
            {
              wrong: 'Ha valaki a legnagyobb megengedett számot lépi minden körben, az a leggyorsabb út a győzelemhez.',
              correct: 'A cél nem a kapkodás, hanem a KULCSPONT MEGSZERZÉSE! Néha a legkisebb lépés (pl. csak 1 hozzáadása) biztosítja a győzelmet.'
            }
          ]}
        />
      </TheorySection>

      {/* INTERAKTÍV JÁTÉK ÉS STRATÉGIA LABORATÓRIUM */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-600/10 border-2 border-rose-300 dark:border-rose-700/60 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200 dark:border-rose-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív Számverseny Játéklabor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Játssz a mesterséges intelligencia ellen a 21-es vagy 100-as számversenyben! Képes vagy legyőzni a tökéletes stratégiát?
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => resetGame()}
            className="gap-2 rounded-xl border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Újraindítás
          </Button>
        </div>

        {/* Gyors játékmód választó */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Játékmód választása:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { t: 21, m: 3, label: 'Klasszikus 21-es (1–3 lépés)' },
              { t: 30, m: 4, label: 'Bábu-verseny 30-ra (1–4 lépés)' },
              { t: 15, m: 2, label: 'Gyors 15-ös (1–2 lépés)' },
              { t: 20, m: 3, label: '20-as párbaj (második játékos nyer)' }
            ].map(preset => (
              <Button
                key={preset.label}
                size="sm"
                variant={target === preset.t && maxStep === preset.m ? 'default' : 'outline'}
                onClick={() => resetGame(preset.t, preset.m)}
                className={cn(
                  'h-8 px-3 rounded-xl font-bold text-xs',
                  target === preset.t && maxStep === preset.m && 'bg-rose-600 hover:bg-rose-700 text-white'
                )}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Játéktér */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Aktuális szám és lépések */}
          <div className="md:col-span-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 shadow-sm space-y-4 text-center">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Jelenlegi állás:</span>
              <div className="text-5xl font-mono font-black text-rose-600 dark:text-rose-400">
                {currentNumber} <span className="text-2xl text-slate-400">/ {target}</span>
              </div>
              <div className="text-xs text-slate-500">
                Ciklus hossza: {maxStep} + 1 = <strong>{cycle}</strong> • Cél: <strong>{target}</strong>
              </div>
            </div>

            {/* Állapotjelző */}
            {gameResult ? (
              <div className={cn(
                "p-3 rounded-xl font-bold text-sm",
                gameResult === 'player'
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                  : "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200"
              )}>
                {gameResult === 'player' ? '🎉 Gratulálunk, Te nyertél!' : '🤖 A gép érte el a célt, a gép nyert!'}
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                {isAiTurn ? (
                  <>
                    <Bot className="w-4 h-4 text-rose-600 animate-spin" />
                    <span>A gép gondolkodik a nyerő lépésen...</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>Te következel! Válassz mennyit adsz hozzá:</span>
                  </>
                )}
              </div>
            )}

            {/* Lépésgombok a játékosnak */}
            <div className="flex justify-center gap-3 pt-2">
              {Array.from({ length: maxStep }, (_, i) => i + 1).map(step => {
                const disabled = gameResult !== null || isAiTurn || currentNumber + step > target;
                return (
                  <Button
                    key={step}
                    size="lg"
                    disabled={disabled}
                    onClick={() => handlePlayerMove(step)}
                    className="h-12 w-16 text-lg font-black rounded-2xl bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40"
                  >
                    +{step}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Stratégiai elemzés és lépéstörténet */}
          <div className="md:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                  Nyerő Kulcspozíciók ({target} mod {cycle} = {target % cycle}):
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {keyPositions.length} kulcsszám
                </span>
              </div>

              {/* Kulcsszámok sora */}
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {keyPositions.map(kp => (
                  <span
                    key={kp}
                    className={cn(
                      "px-2 py-1 rounded-lg border font-bold",
                      kp === currentNumber
                        ? "bg-rose-600 text-white border-rose-700 shadow-sm"
                        : kp < currentNumber
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 line-through"
                          : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border-rose-300"
                    )}
                  >
                    {kp}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                Aki a fenti kulcsszámok valamelyikére lép, a következő körben mindig vissza tud lépni a következő kulcsszámra, így biztosan eléri a {target}-at!
              </p>
            </div>

            {/* Lépésnapló */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Lépéstörténet:
              </span>
              <div className="max-h-36 overflow-y-auto space-y-1 font-mono text-xs">
                {history.length === 0 ? (
                  <div className="text-slate-400 italic text-[11px]">Még nem történt lépés. Indíts egy lépéssel!</div>
                ) : (
                  history.map((h, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-1.5 rounded-lg flex justify-between items-center text-[11px]",
                        h.player === 'Játékos'
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200"
                          : "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200"
                      )}
                    >
                      <span>{h.player === 'Játékos' ? '👤 Te:' : '🤖 Gép:'} +{h.added}</span>
                      <span className="font-bold">Összeg: {h.total}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default MathGamesTheory;
