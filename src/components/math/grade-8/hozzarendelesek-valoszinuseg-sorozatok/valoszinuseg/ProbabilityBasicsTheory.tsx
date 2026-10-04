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
  Percent,
  Dices,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Scale,
  ArrowRight,
  TrendingUp,
  CircleDot
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface ProbabilityBasicsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ProbabilityBasicsTheory: React.FC<ProbabilityBasicsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Labor fül: 'urn' (Golyóhúzó urna) vagy 'coin' (Érmedobás & Nagy számok törvénye)
  const [activeLabTab, setActiveLabTab] = useState<'urn' | 'coin'>('urn');

  // --- URNA SZIMULÁCIÓ ÁLLAPOTAI ---
  const [redCount, setRedCount] = useState<number>(4);
  const [blueCount, setBlueCount] = useState<number>(3);
  const [greenCount, setGreenCount] = useState<number>(2);
  const [yellowCount, setYellowCount] = useState<number>(1);

  // Kijelölt cél esemény: 'red' | 'blue' | 'green' | 'yellow' | 'red_blue' | 'not_red'
  const [targetEvent, setTargetEvent] = useState<string>('blue');

  // Húzási eredmény és statisztika
  const [drawnBall, setDrawnBall] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [totalDraws, setTotalDraws] = useState<number>(0);
  const [successfulDraws, setSuccessfulDraws] = useState<number>(0);

  const totalBalls = redCount + blueCount + greenCount + yellowCount;

  // Számoljuk ki az aktuális cél esemény kedvező eseteinek számát
  const getFavorableCount = (evt: string) => {
    switch (evt) {
      case 'red': return redCount;
      case 'blue': return blueCount;
      case 'green': return greenCount;
      case 'yellow': return yellowCount;
      case 'red_blue': return redCount + blueCount;
      case 'not_red': return blueCount + greenCount + yellowCount;
      default: return 0;
    }
  };

  const favorableCount = getFavorableCount(targetEvent);
  const theoreticalProb = totalBalls > 0 ? (favorableCount / totalBalls) : 0;
  const theoreticalPct = (theoreticalProb * 100).toFixed(1);

  // Golyóhúzás levezénylése
  const handleDrawBall = () => {
    if (totalBalls === 0 || isDrawing) return;
    setIsDrawing(true);
    setDrawnBall(null);

    // Véletlen választás súlyozva a színek szerint
    const rnd = Math.random() * totalBalls;
    let chosen = 'piros';
    if (rnd < redCount) {
      chosen = 'piros';
    } else if (rnd < redCount + blueCount) {
      chosen = 'kék';
    } else if (rnd < redCount + blueCount + greenCount) {
      chosen = 'zöld';
    } else {
      chosen = 'sárga';
    }

    setTimeout(() => {
      setDrawnBall(chosen);
      setIsDrawing(false);
      setTotalDraws(prev => prev + 1);

      // Ellenőrizzük, hogy kedvező volt-e a húzás az aktuális cél eseménynek
      let isSuccess = false;
      if (targetEvent === 'red' && chosen === 'piros') isSuccess = true;
      if (targetEvent === 'blue' && chosen === 'kék') isSuccess = true;
      if (targetEvent === 'green' && chosen === 'zöld') isSuccess = true;
      if (targetEvent === 'yellow' && chosen === 'sárga') isSuccess = true;
      if (targetEvent === 'red_blue' && (chosen === 'piros' || chosen === 'kék')) isSuccess = true;
      if (targetEvent === 'not_red' && chosen !== 'piros') isSuccess = true;

      if (isSuccess) {
        setSuccessfulDraws(prev => prev + 1);
      }
    }, 400);
  };

  const resetUrnStats = () => {
    setTotalDraws(0);
    setSuccessfulDraws(0);
    setDrawnBall(null);
  };

  // --- ÉRME ÉS NAGY SZÁMOK TÖRVÉNYE SZIMULÁCIÓ ---
  const [totalFlips, setTotalFlips] = useState<number>(0);
  const [headsCount, setHeadsCount] = useState<number>(0);
  const [lastFlips, setLastFlips] = useState<('F' | 'I')[]>([]);

  const handleFlipCoins = (n: number) => {
    let newHeads = 0;
    const batchFlips: ('F' | 'I')[] = [];
    for (let i = 0; i < n; i++) {
      const isHead = Math.random() < 0.5;
      if (isHead) newHeads++;
      if (i < 10) {
        batchFlips.push(isHead ? 'F' : 'I');
      }
    }
    setTotalFlips(prev => prev + n);
    setHeadsCount(prev => prev + newHeads);
    setLastFlips(batchFlips);
  };

  const resetCoinStats = () => {
    setTotalFlips(0);
    setHeadsCount(0);
    setLastFlips([]);
  };

  const tailsCount = totalFlips - headsCount;
  const headsRelativeFreq = totalFlips > 0 ? (headsCount / totalFlips) * 100 : 50;

  return (
    <TheoryTemplate
      title="Klasszikus Valószínűség"
      subtitle="Véletlen kísérlet, eseménytér, elemi események, a valószínűség klasszikus képlete (P = k/n), biztos és lehetetlen esemény, komplementer esemény, valamint a nagy számok törvénye"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="probability-basics-theory-doc"
      pdfFilename="8_osztaly_valoszinuseg_alapok_tananyag.pdf"
      estimatedReadTime="14 perc"
      quickRule={{
        label: 'Klasszikus Képlet',
        formula: 'P(A) = \\frac{k}{n} = \\frac{\\text{kedvező}}{\\text{összes}}, \\quad P(\\bar{A}) = 1 - P(A)'
      }}
      themeColor="amber"
      practiceTitle="Készen állsz a valószínűségszámítási alapokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott kvízben a kedvező/összes képlettel, eseményekkel és érmedobásokkal!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* 1. SZAKASZ: VÉLETLEN KÍSÉRLET ÉS ESEMÉNYTÉR */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. Véletlen Kísérlet és Eseménytér"
        subtitle="Hogyan írjuk le matematikailag a véletlen folyamatokat és lehetséges kimeneteleiket?"
        badge="Alapfogalmak"
        icon={<CircleDot className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Véletlen Kísérlet"
            subtitle="Ismételhető, de kiszámíthatatlan"
            icon={<Dices className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Olyan kísérlet vagy megfigyelés, amelyet azonos feltételek mellett akárhányszor megismételhetünk, de az egyes kimenetelek pontos eredményét előre nem tudjuk biztosan megjósolni.
            </p>
            <div className="mt-2 text-[11px] p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-medium">
              Példák: pénzfeldobás, kockadobás, lottóhúzás, kártyahúzás.
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Elemi Események"
            subtitle="Tovább nem bontható kimenetelek"
            icon={<Sparkles className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A kísérlet egyetlen konkrét, közvetlen kimenetele. Egymást páronként kizárják: egy kísérlet során pontosan egy elemi esemény következik be.
            </p>
            <div className="mt-2 text-[11px] p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-medium">
              Kockánál az elemi események: 1, 2, 3, 4, 5 vagy 6 pötty dobása.
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Eseménytér (Ω)"
            subtitle="Minden lehetséges eset halmaza"
            icon={<Scale className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az összes elemi esemény összessége. Jele a görög nagy omega (<MathText text="\Omega" />). Bármely vizsgált esemény (<MathText text="A" />) az eseménytér egy részhalmaza: <MathText text="A \subseteq \Omega" />.
            </p>
            <div className="mt-2 text-[11px] p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-medium">
              Páros dobás eseménye: A = &#123;2, 4, 6&#125; ⊆ &#123;1, 2, 3, 4, 5, 6&#125;.
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Tévhit: Hány kimenetele van két érme feldobásának?"
          trap="Sokan úgy gondolják, hogy két érme feldobásakor csak 3 eset van: két fej, két írás, vagy egy fej és egy írás."
          correction="Valójában 4 egyenlően valószínű kimenetel létezik: (Fej, Fej), (Fej, Írás), (Írás, Fej), (Írás, Írás)! A vegyes (Fej + Írás) eset kétszer olyan gyakori, mint a két fej, mert kétféle sorrendben is megvalósulhat!"
        />
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: A KLASSZIKUS VALÓSZÍNŰSÉG KÉPLETE */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. A Klasszikus Valószínűség Képlete (P = k / n)"
        subtitle="Mikor és hogyan számolhatjuk ki az események valószínűségét a kedvező és összes esetek hányadosaként?"
        badge="A Fő Képlet"
        icon={<Percent className="w-5 h-5 text-amber-600" />}
      >
        <TheoryCallout
          title="A Klasszikus Valószínűségi Mező Feltétele"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        >
          <div className="space-y-2">
            <p>
              A klasszikus képlet kizárólag akkor alkalmazható, ha a véletlen kísérletnek <strong>véges sok</strong> kimenetele van, és minden egyes elemi esemény <strong>egyformán valószínű</strong> (szimmetrikus, szabályos kocka, tökéletesen megkevert pakli).
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 text-center text-sm font-mono font-bold text-amber-900 dark:text-amber-200">
              P(A) = (kedvező esetek száma) / (összes lehetséges eset száma) = k / n
            </div>
          </div>
        </TheoryCallout>

        {/* 3 Kidolgozott Mintapélda */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <div className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Példa: Dobókocka & Prímszám
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Egy szabályos kockával dobunk. Mekkora az esélye, hogy prímszámot dobunk?
            </p>
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-mono text-[11px] space-y-1">
              <div>Összes eset: n = 6 (1, 2, 3, 4, 5, 6)</div>
              <div>Kedvező prímek: k = 3 (2, 3, 5)</div>
              <div className="font-bold text-amber-900 dark:text-amber-200">
                P = 3 / 6 = 1 / 2 = 0,5 = 50%
              </div>
            </div>
            <span className="text-[10px] text-slate-500 italic block">Figyelem: az 1-es szám se nem prím, se nem összetett!</span>
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <div className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Példa: Magyar Kártya & Ász
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Egy 32 lapos pakliból véletlenül kihúzunk egy lapot. Mekkora az esélye, hogy Ászt húzunk?
            </p>
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-mono text-[11px] space-y-1">
              <div>Összes eset: n = 32 lap</div>
              <div>Kedvező: k = 4 ász (piros, tök, zöld, makk)</div>
              <div className="font-bold text-amber-900 dark:text-amber-200">
                P = 4 / 32 = 1 / 8 = 0,125 = 12,5%
              </div>
            </div>
            <span className="text-[10px] text-slate-500 italic block">A 4 szín mindegyikében pontosan 1 db ász található.</span>
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <div className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Példa: Urna 10 Golyóval
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Urnában 5 piros, 3 zöld és 2 sárga golyó van. Mekkora az esélye, hogy NEM zöldet húzunk?
            </p>
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-mono text-[11px] space-y-1">
              <div>Összes golyó: n = 5 + 3 + 2 = 10 db</div>
              <div>Nem zöld golyók: k = 5 + 2 = 7 db</div>
              <div className="font-bold text-amber-900 dark:text-amber-200">
                P = 7 / 10 = 0,7 = 70%
              </div>
            </div>
            <span className="text-[10px] text-slate-500 italic block">Ellentettel is számolható: 1 - 3/10 = 7/10 (70%).</span>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: BIZTOS, LEHETETLEN ÉS ELLENTETT ESEMÉNY */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Biztos, Lehetetlen és Ellentett Esemény"
        subtitle="A valószínűség értéktartománya (0 ≤ P ≤ 1) és a komplementer események zseniális trükkje"
        badge="Tulajdonságok"
        icon={<Scale className="w-5 h-5 text-amber-600" />}
      >
        <TheoryTable
          headers={['Esemény Típusa', 'Matematikai Jelölés', 'Valószínűség (P)', 'Gyakorlati Példa']}
          rows={[
            ['Lehetetlen esemény', '∅ (üres halmaz)', 'P(∅) = 0 (0%)', 'Szabályos 6 oldalú kockával 7-est dobni'],
            ['Véletlen esemény', 'A (részhalmaz)', '0 < P(A) < 1', 'Kockával páros számot dobni (P = 0,5)'],
            ['Biztos esemény', 'I = Ω (teljes halmaz)', 'P(I) = 1 (100%)', 'Kockával 7-nél kisebb pozitív egészet dobni'],
            ['Ellentett esemény', 'Ā (komplementer)', 'P(Ā) = 1 - P(A)', 'Nem dobunk 6-ost: 1 - 1/6 = 5/6 (83,3%)']
          ]}
        />

        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs space-y-2">
          <div className="font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Miért olyan hasznos az ellentett esemény képlete?
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Sok feladatban a <em>„legalább egy”</em> esemény valószínűségét kérdezik (pl. két kockával dobva legalább az egyik 6-os). Ahelyett, hogy összeadnánk az (egyik 6-os) és a (mindkét 6-os) bonyolult eseteit, sokkal gyorsabb az ellentettet kiszámolni:
          </p>
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl font-mono text-center font-bold text-amber-800 dark:text-amber-200">
            P(Legalább egy 6-os) = 1 - P(Egyik sem 6-os) = 1 - (25 / 36) = 11 / 36 (30,6%)
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: NAGY SZÁMOK TÖRVÉNYE ÉS TÉVHITEK */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Relatív Gyakoriság és a Nagy Számok Törvénye"
        subtitle="Hogyan kapcsolódik a kísérleti statisztika az elméleti valószínűséghez, és miért nincs memóriája a kockának?"
        badge="Statisztika & Paradoxonok"
        icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2.5 text-xs">
            <span className="font-black uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              Jakob Bernoulli és a Nagy Számok Törvénye
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha egy véletlen kísérletet sokszor elvégzünk (<MathText text="N \to \infty" />), egy esemény megfigyelt <strong>relatív gyakorisága</strong> (<MathText text="f = k / N" />) kezdetben még ingadozhat, de a kísérletek számának növekedésével egyre közelebb kerül az elméleti valószínűséghez (<MathText text="P(A)" />).
            </p>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 font-mono text-[11px] text-amber-900 dark:text-amber-200">
              f = (kedvező kísérletek száma) / (összes kísérlet száma) ≈ P(A)
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-2.5 text-xs">
            <span className="font-black uppercase tracking-wider text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              A Játékosok Tévedése (Gambler's Fallacy)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Az egyik legelterjedtebb tévhit: <em>„Ha egy érmével már 6 fejet dobtam egymás után, a 7. dobásnál már szinte biztosan írás jön, mert ki kell egyenlítődnie!”</em>
            </p>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 font-bold text-[11px] text-rose-900 dark:text-rose-200 leading-normal">
              Ez tévedés! A fizikai érmének és a kockának nincs memóriája. A 7. dobásnál a fej és az írás esélye TOVÁBBRA IS pontosan 50% - 50%!
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 5. SZAKASZ: INTERAKTÍV VALÓSZÍNŰSÉGI LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="5. Interaktív Valószínűségi Labor"
        subtitle="Tedd próbára a tanultakat a gyakorlatban: kísérletezz egy golyókkal teli urnával, vagy teszteld a nagy számok törvényét akár ezer érmefeldobással!"
        badge="Interaktív Szimuláció"
        icon={<Percent className="w-5 h-5 text-amber-600" />}
      >
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/30 p-5 rounded-3xl border-2 border-amber-200/80 dark:border-amber-900/60 shadow-lg space-y-5">
          {/* Fülválasztó */}
          <div className="flex flex-wrap gap-2 border-b border-amber-100 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveLabTab('urn')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'urn'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              1. Golyóhúzó Urnamodell (P = k/n)
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('coin')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'coin'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              2. Nagy Számok Törvénye (Érmedobások)
            </button>
          </div>

          {/* TAB 1: URNAMODELL */}
          {activeLabTab === 'urn' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Bal oszlop: Golyók beállítása és Urna grafikája */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Golyószám állítók */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200 block mb-3">
                      Golyók darabszáma az urnában:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {/* Piros */}
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex flex-col items-center">
                        <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Piros
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setRedCount(Math.max(0, redCount - 1))}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-rose-100"
                          >-</button>
                          <span className="font-mono font-bold text-sm">{redCount}</span>
                          <button
                            type="button"
                            onClick={() => setRedCount(redCount + 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-rose-100"
                          >+</button>
                        </div>
                      </div>

                      {/* Kék */}
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col items-center">
                        <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Kék
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setBlueCount(Math.max(0, blueCount - 1))}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-blue-100"
                          >-</button>
                          <span className="font-mono font-bold text-sm">{blueCount}</span>
                          <button
                            type="button"
                            onClick={() => setBlueCount(blueCount + 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-blue-100"
                          >+</button>
                        </div>
                      </div>

                      {/* Zöld */}
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex flex-col items-center">
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Zöld
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setGreenCount(Math.max(0, greenCount - 1))}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-emerald-100"
                          >-</button>
                          <span className="font-mono font-bold text-sm">{greenCount}</span>
                          <button
                            type="button"
                            onClick={() => setGreenCount(greenCount + 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-emerald-100"
                          >+</button>
                        </div>
                      </div>

                      {/* Sárga */}
                      <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex flex-col items-center">
                        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Sárga
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setYellowCount(Math.max(0, yellowCount - 1))}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-amber-100"
                          >-</button>
                          <span className="font-mono font-bold text-sm">{yellowCount}</span>
                          <button
                            type="button"
                            onClick={() => setYellowCount(yellowCount + 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-amber-100"
                          >+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Urna kirajzolása */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-inner flex flex-col items-center gap-3">
                    <div className="flex justify-between w-full text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      <span>Összes golyó: <strong className="text-amber-700 dark:text-amber-300">{totalBalls} db</strong></span>
                      <span>Urnatartalom</span>
                    </div>

                    {/* Vizuális golyótartó doboz */}
                    <div className="w-full max-w-md min-h-[110px] p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border-2 border-dashed border-amber-300 dark:border-amber-800 flex flex-wrap items-center justify-center gap-2.5">
                      {Array.from({ length: redCount }).map((_, i) => (
                        <div key={`red-${i}`} className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-sm border border-rose-300 flex items-center justify-center text-[9px] font-bold text-white">P</div>
                      ))}
                      {Array.from({ length: blueCount }).map((_, i) => (
                        <div key={`blue-${i}`} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-sm border border-blue-300 flex items-center justify-center text-[9px] font-bold text-white">K</div>
                      ))}
                      {Array.from({ length: greenCount }).map((_, i) => (
                        <div key={`green-${i}`} className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm border border-emerald-300 flex items-center justify-center text-[9px] font-bold text-white">Z</div>
                      ))}
                      {Array.from({ length: yellowCount }).map((_, i) => (
                        <div key={`yellow-${i}`} className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-sm border border-amber-200 flex items-center justify-center text-[9px] font-bold text-amber-950">S</div>
                      ))}
                      {totalBalls === 0 && (
                        <span className="text-xs text-slate-400 italic">Az urna jelenleg üres! Adj hozzá golyókat!</span>
                      )}
                    </div>

                    {/* Húzás gomb és eredmény */}
                    <div className="flex items-center gap-3 mt-1">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleDrawBall}
                        disabled={totalBalls === 0 || isDrawing}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl px-4 py-2"
                      >
                        {isDrawing ? 'Húzás folyamatban...' : '🎲 Húzz 1 golyót véletlenszerűen!'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetUrnStats}
                        className="text-xs rounded-xl"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Statisztika törlése
                      </Button>
                    </div>

                    {/* Húzott golyó animált kijelzője */}
                    {drawnBall && (
                      <div className="p-2.5 px-4 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs font-bold flex items-center gap-2 animate-bounce">
                        <span>Kihúzott golyó:</span>
                        <span className="capitalize text-amber-900 dark:text-amber-200 font-black">{drawnBall}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Jobb oszlop: Cél esemény kiválasztása és Élő Valószínűségszámítás */}
                <div className="lg:col-span-5 space-y-3 text-xs">
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2.5">
                    <span className="font-black uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-amber-600" />
                      Válassz vizsgálandó eseményt:
                    </span>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTargetEvent('blue')}
                        className={`p-2 rounded-xl text-left font-bold transition-all border ${
                          targetEvent === 'blue'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 hover:bg-blue-50'
                        }`}
                      >
                        🔵 Kéket húzunk
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetEvent('red')}
                        className={`p-2 rounded-xl text-left font-bold transition-all border ${
                          targetEvent === 'red'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 hover:bg-rose-50'
                        }`}
                      >
                        🔴 Pirosat húzunk
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetEvent('red_blue')}
                        className={`p-2 rounded-xl text-left font-bold transition-all border ${
                          targetEvent === 'red_blue'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 hover:bg-amber-50'
                        }`}
                      >
                        🔴+🔵 Piros vagy Kék
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetEvent('not_red')}
                        className={`p-2 rounded-xl text-left font-bold transition-all border ${
                          targetEvent === 'not_red'
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 hover:bg-purple-50'
                        }`}
                      >
                        ⚪ NEM Piros (Ellentett)
                      </button>
                    </div>

                    {/* Elméleti valószínűség panel */}
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-mono space-y-1.5">
                      <div className="flex justify-between">
                        <span>Kedvező esetek (k):</span>
                        <strong className="text-amber-900 dark:text-amber-200">{favorableCount} db</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Összes eset (n):</span>
                        <strong className="text-amber-900 dark:text-amber-200">{totalBalls} db</strong>
                      </div>
                      <div className="flex justify-between border-t border-amber-200 dark:border-amber-800 pt-1.5 text-sm">
                        <span>Elméleti P(A) = k / n:</span>
                        <strong className="text-amber-900 dark:text-amber-200">
                          {favorableCount}/{totalBalls} = {theoreticalPct}%
                        </strong>
                      </div>
                    </div>

                    {/* Kísérleti statisztika összehasonlítás */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono space-y-1">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Eddigi húzások száma (N):</span>
                        <strong>{totalDraws} db</strong>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Kedvező húzások száma:</span>
                        <strong>{successfulDraws} db</strong>
                      </div>
                      <div className="flex justify-between text-slate-800 dark:text-slate-200 font-bold border-t border-slate-200 dark:border-slate-700 pt-1">
                        <span>Kísérleti relatív gyakoriság:</span>
                        <strong className="text-indigo-600 dark:text-indigo-400">
                          {totalDraws > 0 ? ((successfulDraws / totalDraws) * 100).toFixed(1) : 0}%
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ÉRME ÉS NAGY SZÁMOK TÖRVÉNYE */}
          {activeLabTab === 'coin' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200">
                    Végezz gyors tömeges kísérleteket:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleFlipCoins(1)}
                      className="text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                    >
                      +1 Dobás
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleFlipCoins(10)}
                      className="text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                    >
                      +10 Dobás
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleFlipCoins(100)}
                      className="text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                    >
                      +100 Dobás
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleFlipCoins(1000)}
                      className="text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                    >
                      +1 000 Dobás
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetCoinStats}
                      className="text-xs h-8 rounded-lg"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Nullázás
                    </Button>
                  </div>
                </div>

                {/* Dobási számlálók és csík */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">Összes feldobás (N)</span>
                    <span className="text-xl font-black font-mono mt-1 text-slate-800 dark:text-slate-100">{totalFlips}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300">Fejek száma (k)</span>
                    <span className="text-xl font-black font-mono mt-1 text-blue-700 dark:text-blue-300">
                      {headsCount} <span className="text-xs font-normal">({totalFlips > 0 ? (headsCount / totalFlips * 100).toFixed(1) : 0}%)</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300">Írások száma</span>
                    <span className="text-xl font-black font-mono mt-1 text-purple-700 dark:text-purple-300">
                      {tailsCount} <span className="text-xs font-normal">({totalFlips > 0 ? (tailsCount / totalFlips * 100).toFixed(1) : 0}%)</span>
                    </span>
                  </div>
                </div>

                {/* Grafikus relatív gyakoriság mérce az 50% felé */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span>Fej Relatív Gyakorisága:</span>
                    <span className="text-amber-600 dark:text-amber-400">
                      {totalFlips > 0 ? headsRelativeFreq.toFixed(2) : '50.00'}% (Elméleti célérték: 50.00%)
                    </span>
                  </div>

                  {/* Vizuális csík */}
                  <div className="relative w-full h-7 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex items-center">
                    {/* 50%-os referencia vonal */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-rose-500 z-10" />
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, headsRelativeFreq))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>0% (Csak írás)</span>
                    <span className="font-bold text-rose-500">50% (Elméleti egyensúly)</span>
                    <span>100% (Csak fej)</span>
                  </div>
                </div>

                {/* Magyarázat */}
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50/40 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/60">
                  <strong>A nagy számok törvénye a gyakorlatban:</strong> Kevés (pl. 5-10) dobás esetén a fej aránya még jelentősen eltérhet az 50%-tól (akár 70% vagy 30% is lehet). Ahogy azonban a kísérletek száma eléri a több százat vagy ezret, a relatív gyakoriság egyre szorosabban rásimul az elméleti 50,0%-ra!
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProbabilityBasicsTheory;
