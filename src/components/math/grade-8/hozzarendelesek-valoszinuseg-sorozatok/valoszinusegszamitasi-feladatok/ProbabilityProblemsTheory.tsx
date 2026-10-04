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
  Brain,
  Dices,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Scale,
  ArrowRight,
  TrendingUp,
  GitBranch,
  CircleDot,
  Layers
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface ProbabilityProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ProbabilityProblemsTheory: React.FC<ProbabilityProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Labor tab: 'urn' (Két lépéses urnamodell) vagy 'dice' (Két kocka 36-os mátrixa)
  const [activeLabTab, setActiveLabTab] = useState<'urn' | 'dice'>('urn');

  // --- TAB 1: KÉT LÉPÉSES URNA ÁLLAPOT ---
  const [redCount, setRedCount] = useState<number>(4);
  const [whiteCount, setWhiteCount] = useState<number>(6);
  const [withReplacement, setWithReplacement] = useState<boolean>(false);

  // Kísérlet és húzás eredménye
  const [drawResult, setDrawResult] = useState<{ b1: 'P' | 'F'; b2: 'P' | 'F' } | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [totalTrials, setTotalTrials] = useState<number>(0);
  const [bothRedCount, setBothRedCount] = useState<number>(0);

  const totalBalls = redCount + whiteCount;

  // Elméleti valószínűségek számítása a fa-diagramhoz
  // 1. húzás esélyei
  const pR1 = totalBalls > 0 ? redCount / totalBalls : 0;
  const pW1 = totalBalls > 0 ? whiteCount / totalBalls : 0;

  // 2. húzás esélyei
  const pR2_given_R1 = withReplacement
    ? pR1
    : (totalBalls > 1 ? (redCount - 1) / (totalBalls - 1) : 0);

  const pW2_given_R1 = withReplacement
    ? pW1
    : (totalBalls > 1 ? whiteCount / (totalBalls - 1) : 0);

  const pR2_given_W1 = withReplacement
    ? pR1
    : (totalBalls > 1 ? redCount / (totalBalls - 1) : 0);

  const pW2_given_W1 = withReplacement
    ? pW1
    : (totalBalls > 1 ? (whiteCount - 1) / (totalBalls - 1) : 0);

  // Teljes útvonal-valószínűségek (Szorzási szabály)
  const pRR = pR1 * pR2_given_R1;
  const pRW = pR1 * pW2_given_R1;
  const pWR = pW1 * pR2_given_W1;
  const pWW = pW1 * pW2_given_W1;

  const handleSimulateDraw = () => {
    if (totalBalls < 2 && !withReplacement) return;
    if (totalBalls === 0) return;

    setIsDrawing(true);
    setDrawResult(null);

    setTimeout(() => {
      // 1. húzás
      const isR1 = Math.random() < pR1;
      const b1 = isR1 ? 'P' : 'F';

      // 2. húzás a feltételes esély alapján
      let isR2 = false;
      if (b1 === 'P') {
        isR2 = Math.random() < pR2_given_R1;
      } else {
        isR2 = Math.random() < pR2_given_W1;
      }
      const b2 = isR2 ? 'P' : 'F';

      setDrawResult({ b1, b2 });
      setIsDrawing(false);
      setTotalTrials(prev => prev + 1);

      if (b1 === 'P' && b2 === 'P') {
        setBothRedCount(prev => prev + 1);
      }
    }, 400);
  };

  const resetUrnStats = () => {
    setTotalTrials(0);
    setBothRedCount(0);
    setDrawResult(null);
  };

  // --- TAB 2: KÉT KOCKA MÁTRIX ÁLLAPOT ---
  const [selectedFilter, setSelectedFilter] = useState<'sum10' | 'sum7' | 'double' | 'sumPrime' | 'has6' | 'prodOdd'>('sum10');

  // Segédfüggvény annak ellenőrzésére, hogy a (d1, d2) kimenetel megfelel-e az aktuális szűrőnek
  const checkDiceCondition = (d1: number, d2: number) => {
    const sum = d1 + d2;
    const prod = d1 * d2;
    switch (selectedFilter) {
      case 'sum10':
        return sum >= 10;
      case 'sum7':
        return sum === 7;
      case 'double':
        return d1 === d2;
      case 'sumPrime':
        return [2, 3, 5, 7, 11].includes(sum);
      case 'has6':
        return d1 === 6 || d2 === 6;
      case 'prodOdd':
        return prod % 2 === 1; // csak ha mindkettő páratlan
      default:
        return false;
    }
  };

  let matchingDiceCombos = 0;
  for (let r = 1; r <= 6; r++) {
    for (let c = 1; c <= 6; c++) {
      if (checkDiceCondition(r, c)) matchingDiceCombos++;
    }
  }

  const diceProb = ((matchingDiceCombos / 36) * 100).toFixed(1);

  return (
    <TheoryTemplate
      title="Valószínűségszámítási Feladatok"
      subtitle="Összetett és több lépéses véletlen kísérletek, a két kocka 36 kimenetelének mátrixa, fa-diagramok és útvonal-szabályok, mintavétel visszatevéssel és visszatevés nélkül, valamint a komplementer módszer"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="probability-problems-theory-doc"
      pdfFilename="8_osztaly_valoszinuseg_feladatok_tananyag.pdf"
      estimatedReadTime="15 perc"
      quickRule={{
        label: 'Összetett Képletek',
        formula: 'P(A \\cap B) = P(A) \\cdot P(B|A), \\quad P(\\text{legalább egy}) = 1 - P(\\text{egyik sem})'
      }}
      themeColor="rose"
      practiceTitle="Készen állsz az összetett valószínűségi feladványokra?"
      practiceSubtitle="Gyakorold a két kocka 36 esetét, a fa-diagramokat, a visszatevéses és visszatevés nélküli mintavételt a 3 szintes kvízben!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* 1. SZAKASZ: KÉT KOCKA DOBÁSA ÉS A 36 ESET MÁTRIXA */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. A Két Kocka Dobása és a 36 Eset Mátrixa"
        subtitle="Miért nem egyforma esélyűek az összegek 2 és 12 között, és hogyan rendszerezzük a párokat táblázatban?"
        badge="Táblázatos Módszer"
        icon={<Dices className="w-5 h-5 text-rose-600" />}
      >
        <TheoryCallout
          title="Miért pontosan 36 kimenetel van?"
          icon={<Brain className="w-5 h-5 text-rose-600" />}
        >
          <div className="space-y-2">
            <p>
              Ha két megkülönböztethető kockával (pl. egy pirossal és egy kékkel) dobunk, az első kocka 6-féle, a második kocka szintén 6-féle eredményt mutathat. A lehetséges rendezett párok száma:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 text-center text-sm font-mono font-bold text-rose-900 dark:text-rose-200">
              összes eset: n = 6 · 6 = 36 elemi kimenetel
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Fontos: az (1; 6) és a (6; 1) két <strong>különböző</strong> elemi kimenetel, mert más-más kockán van az 1-es és a 6-os!
            </p>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Összeg Legalább 10"
            subtitle="Csak a legnagyobb értékek"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A „legalább 10” azt jelenti, hogy az összeg 10, 11 vagy 12.
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 font-mono space-y-0.5 text-rose-950 dark:text-rose-200">
              <div>Összeg 10: (4,6), (5,5), (6,4) → 3 db</div>
              <div>Összeg 11: (5,6), (6,5) → 2 db</div>
              <div>Összeg 12: (6,6) → 1 db</div>
              <div className="font-bold border-t border-rose-200 dark:border-rose-800 pt-1 mt-1">
                P = 6 / 36 = 1 / 6 ≈ 16,7%
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Dupla Dobása"
            subtitle="Azonos szám mindkét kockán"
            icon={<Sparkles className="w-4 h-4 text-rose-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A főátló menti párok: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6).
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 font-mono space-y-0.5 text-rose-950 dark:text-rose-200">
              <div>Kedvező párok: k = 6 db</div>
              <div>Összes eset: n = 36 db</div>
              <div className="font-bold border-t border-rose-200 dark:border-rose-800 pt-1 mt-1">
                P = 6 / 36 = 1 / 6 ≈ 16,7%
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Páratlan Szorzat"
            subtitle="Mikor lesz a szorzat páratlan?"
            icon={<Scale className="w-4 h-4 text-rose-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Két egész szám szorzata kizárólag akkor páratlan, ha <strong>mindkét</strong> tényező páratlan!
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 font-mono space-y-0.5 text-rose-950 dark:text-rose-200">
              <div>Páratlan számok: 1, 3, 5 (3 db)</div>
              <div>Kedvező párok: 3 · 3 = 9 db</div>
              <div className="font-bold border-t border-rose-200 dark:border-rose-800 pt-1 mt-1">
                P = 9 / 36 = 1 / 4 = 25%
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: FA-DIAGRAMOK ÉS AZ ÚTVONAL-SZABÁLYOK */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. Fa-diagramok és az Útvonal-Szabályok"
        subtitle="Hogyan vezetjük le logikusan az egymást követő véletlen lépések valószínűségét?"
        badge="Modellezés"
        icon={<GitBranch className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <span className="font-bold text-rose-800 dark:text-rose-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              1. Szorzási Szabály (Egy ágon haladva)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Egy adott kimeneteli sorozathoz (útvonalhoz) vezető ágon az egymást követő lépések valószínűségeit <strong>összeszorozzuk</strong>:
            </p>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 font-mono text-center font-bold text-rose-900 dark:text-rose-200 text-sm">
              P(A és B) = P(A) · P(B | A)
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Példa: Pénzfeldobásnál három fej egymás után: P(FFF) = 1/2 · 1/2 · 1/2 = 1/8 (12,5%).
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <span className="font-bold text-rose-800 dark:text-rose-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Layers className="w-4 h-4 text-rose-600" />
              2. Összeadási Szabály (Különböző ágak)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha egy esemény több különböző, egymást kizáró ágon (útvonalon) is bekövetkezhet, az egyes ágak valószínűségeit <strong>összeadjuk</strong>:
            </p>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 font-mono text-center font-bold text-rose-900 dark:text-rose-200 text-sm">
              P(Esemény) = P(1. ág) + P(2. ág) + ...
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Példa: Három érmével pontosan 2 fej: P(FFÍ) + P(FÍF) + P(ÍFF) = 1/8 + 1/8 + 1/8 = 3/8 (37,5%).
            </p>
          </div>
        </div>

        <TheoryTrapBox
          title="Gyakori Hiba: Szorzás vagy Összeadás?"
          trap="Sok tanuló összekeveri a lépéseket: ahelyett, hogy egy ágon szorozna, összeadja a valószínűségeket (pl. 1/2 + 1/2 = 1-et kap két fejre)."
          correction="Jegyezd meg az aranyszabályt: Lépésről lépésre, egymás után („ÉS”) → SZORZUNK! Alternatív ágak, különböző lehetőségek („VAGY”) → ÖSSZEADUNK!"
        />
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: VISSZATEVÉSES VS. VISSZATEVÉS NÉLKÜLI MINTAVÉTEL */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Visszatevéses vs. Visszatevés Nélküli Mintavétel"
        subtitle="Hogyan változik az esély a 2. lépésben, ha a kihúzott golyót nem tesszük vissza az urnába?"
        badge="Mintavételi Típusok"
        icon={<CircleDot className="w-5 h-5 text-rose-600" />}
      >
        <TheoryTable
          headers={['Szempont', 'Visszatevéssel (Független)', 'Visszatevés Nélkül (Függő)']}
          rows={[
            ['Golyók száma a 2. húzásnál', 'Változatlan marad: n darab', 'Eggyel csökken: (n - 1) darab'],
            ['A kihúzott színű golyók száma', 'Változatlan marad: k darab', 'Eggyel csökken: (k - 1) darab'],
            ['Események kapcsolata', 'Függetlenek (az 1. nem hat a 2.-ra)', 'Függő események (a feltétel változik)'],
            ['Példa (4 piros, 6 fehér): P(2 piros)', '(4/10) · (4/10) = 16/100 = 16%', '(4/10) · (3/9) = 12/90 = 2/15 ≈ 13,3%'],
            ['Példa a valóságból', 'Pénzérme, kockadobás, PIN-kód generálás', 'Lottósorsolás, kártyaosztás, felelőválasztás']
          ]}
        />
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: A KOMPLEMENTER („LEGALÁBB EGY”) MÓDSZER */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. A Komplementer („Legalább Egy”) Módszer"
        subtitle="Miért érdemes az ellentett eseményt kiszámolni, és mikor takarít meg rengeteg időt?"
        badge="Mesterfogás"
        icon={<Scale className="w-5 h-5 text-rose-600" />}
      >
        <div className="p-4 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-slate-900 dark:to-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 text-xs space-y-2">
          <div className="font-black text-rose-900 dark:text-rose-200 flex items-center gap-1.5 text-sm">
            <Sparkles className="w-4 h-4 text-rose-600" />
            A „Legalább egy” aranyszabálya
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha egy feladatban az a kérdés, hogy több kísérletből <em>„legalább egy”</em> sikerüljön, a közvetlen számolás sokszor túl sok ágból állna. Ehelyett számoljuk ki annak az esélyét, hogy <strong>egyetlenegy sem</strong> sikerül, és vonjuk ki 1-ből:
          </p>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl font-mono text-center font-bold text-rose-900 dark:text-rose-200 text-sm">
            P(Legalább egy sikeres) = 1 - P(Egyik sem sikeres)
          </div>
        </div>

        {/* Kidolgozott példák */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-rose-100 dark:border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-200">
              Két kockával dobva legalább egy 6-os:
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Ellentett: Egyik kockával sem dobunk 6-ost (mindkettővel 1, 2, 3, 4 vagy 5 jön).
            </p>
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 font-mono text-[11px]">
              P(Egyik sem 6) = (5/6) · (5/6) = 25 / 36<br />
              <strong>P(Legalább egy 6) = 1 - (25 / 36) = 11 / 36 ≈ 30,6%</strong>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-rose-100 dark:border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-200">
              Három kockával dobva legalább egy 6-os:
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Ellentett: Mind a 3 kockával nem 6-ost dobunk (5 lehetőség mindegyiknél).
            </p>
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 font-mono text-[11px]">
              P(Egyik sem 6) = (5/6) · (5/6) · (5/6) = 125 / 216<br />
              <strong>P(Legalább egy 6) = 1 - (125 / 216) = 91 / 216 ≈ 42,1%</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 5. SZAKASZ: INTERAKTÍV FA-DIAGRAM ÉS KOCKA-URNA LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="5. Interaktív Fa-diagram és Kocka-Urna Labor"
        subtitle="Tedd próbára a tanultakat a gyakorlatban: szimulálj kétlépéses húzásokat visszatevéssel vagy anélkül, és fedezd fel a két kocka 36 kimenetelének mátrixát!"
        badge="Interaktív Szimuláció"
        icon={<Brain className="w-5 h-5 text-rose-600" />}
      >
        <div className="bg-gradient-to-br from-rose-50/70 via-white to-pink-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/30 p-5 rounded-3xl border-2 border-rose-200/80 dark:border-rose-900/60 shadow-lg space-y-5">
          {/* Fülválasztó */}
          <div className="flex flex-wrap gap-2 border-b border-rose-100 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveLabTab('urn')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'urn'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              1. Két Lépéses Urnamodell & Fa-diagram
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('dice')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'dice'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              2. Két Kocka 36 Esetének Mátrixa
            </button>
          </div>

          {/* TAB 1: KÉT LÉPÉSES URNAMODELL */}
          {activeLabTab === 'urn' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Bal oszlop: Beállítások és szimuláció gomb */}
                <div className="lg:col-span-6 space-y-3.5">
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-200 block">
                      Golyók száma az urnában:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Piros */}
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex flex-col items-center">
                        <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Piros golyók
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setRedCount(Math.max(1, redCount - 1))}
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

                      {/* Fehér */}
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 inline-block" /> Fehér golyók
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setWhiteCount(Math.max(1, whiteCount - 1))}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-slate-200"
                          >-</button>
                          <span className="font-mono font-bold text-sm">{whiteCount}</span>
                          <button
                            type="button"
                            onClick={() => setWhiteCount(whiteCount + 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border font-bold text-xs hover:bg-slate-200"
                          >+</button>
                        </div>
                      </div>
                    </div>

                    {/* Mintavétel típusa kapcsoló */}
                    <div className="pt-2 border-t border-rose-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
                        Mintavétel módja:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setWithReplacement(false)}
                          className={`p-2 rounded-xl border transition-all ${
                            !withReplacement
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 hover:bg-rose-50'
                          }`}
                        >
                          Visszatevés NÉLKÜL (Függő)
                        </button>
                        <button
                          type="button"
                          onClick={() => setWithReplacement(true)}
                          className={`p-2 rounded-xl border transition-all ${
                            withReplacement
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 hover:bg-rose-50'
                          }`}
                        >
                          Visszatevéssel (Független)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Kísérlet gomb és húzott golyók megjelenítése */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSimulateDraw}
                        disabled={isDrawing || (totalBalls < 2 && !withReplacement)}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl px-4 py-2"
                      >
                        {isDrawing ? 'Húzás...' : '🎲 Húzz 2 golyót egymás után!'}
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

                    {drawResult && (
                      <div className="p-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs font-bold flex items-center gap-3 animate-bounce">
                        <span>Eredmény:</span>
                        <span className="flex items-center gap-1.5">
                          1. húzás: <strong className={drawResult.b1 === 'P' ? 'text-rose-600 font-black' : 'text-slate-700'}>{drawResult.b1 === 'P' ? 'Piros 🔴' : 'Fehér ⚪'}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          2. húzás: <strong className={drawResult.b2 === 'P' ? 'text-rose-600 font-black' : 'text-slate-700'}>{drawResult.b2 === 'P' ? 'Piros 🔴' : 'Fehér ⚪'}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Jobb oszlop: Elméleti Fa-diagram és Kísérleti Statisztika */}
                <div className="lg:col-span-6 space-y-3 text-xs">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-3 font-mono">
                    <span className="font-black uppercase tracking-wider text-rose-900 dark:text-rose-200 flex items-center gap-1.5 text-xs font-sans">
                      <GitBranch className="w-4 h-4 text-rose-600" />
                      Fa-diagram ágai és valószínűségei:
                    </span>

                    <div className="space-y-2 text-[11px]">
                      {/* PP ág */}
                      <div className="p-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 flex justify-between items-center">
                        <span className="font-bold text-rose-900 dark:text-rose-200">🔴 + 🔴 (Mindkettő Piros):</span>
                        <strong className="text-rose-700 dark:text-rose-300">
                          ({(pR1 * 100).toFixed(0)}%) · ({(pR2_given_R1 * 100).toFixed(0)}%) = {(pRR * 100).toFixed(1)}%
                        </strong>
                      </div>

                      {/* PF ág */}
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-700 dark:text-slate-300">🔴 + ⚪ (1. Piros, 2. Fehér):</span>
                        <strong>
                          ({(pR1 * 100).toFixed(0)}%) · ({(pW2_given_R1 * 100).toFixed(0)}%) = {(pRW * 100).toFixed(1)}%
                        </strong>
                      </div>

                      {/* FP ág */}
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-700 dark:text-slate-300">⚪ + 🔴 (1. Fehér, 2. Piros):</span>
                        <strong>
                          ({(pW1 * 100).toFixed(0)}%) · ({(pR2_given_W1 * 100).toFixed(0)}%) = {(pWR * 100).toFixed(1)}%
                        </strong>
                      </div>

                      {/* FF ág */}
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-700 dark:text-slate-300">⚪ + ⚪ (Mindkettő Fehér):</span>
                        <strong>
                          ({(pW1 * 100).toFixed(0)}%) · ({(pW2_given_W1 * 100).toFixed(0)}%) = {(pWW * 100).toFixed(1)}%
                        </strong>
                      </div>
                    </div>

                    {/* Statisztikai összehasonlító sáv */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs font-sans">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-mono">
                        <span>Összes kísérlet (N):</span>
                        <strong>{totalTrials} db</strong>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-mono">
                        <span>Mindkettő piros (PP):</span>
                        <strong>{bothRedCount} db</strong>
                      </div>
                      <div className="flex justify-between font-bold text-rose-700 dark:text-rose-300 border-t border-slate-200 dark:border-slate-700 pt-1 font-mono">
                        <span>PP Kísérleti Gyakoriság:</span>
                        <span>{totalTrials > 0 ? ((bothRedCount / totalTrials) * 100).toFixed(1) : 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KÉT KOCKA MÁTRIXA */}
          {activeLabTab === 'dice' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-3 text-xs">
                {/* Szűrő gombok */}
                <div>
                  <span className="font-bold text-slate-600 dark:text-slate-300 block mb-2">
                    Válassz vizsgálandó eseményt a 36 kimenetelre:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'sum10', label: 'Összeg ≥ 10' },
                      { id: 'sum7', label: 'Összeg = 7 (csúcs)' },
                      { id: 'double', label: 'Dupla dobás (1-1, 2-2...)' },
                      { id: 'sumPrime', label: 'Összeg prím (2, 3, 5, 7, 11)' },
                      { id: 'has6', label: 'Legalább egy 6-os' },
                      { id: 'prodOdd', label: 'Szorzat páratlan' }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFilter(f.id as any)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                          selectedFilter === f.id
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 hover:bg-rose-50'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6x6 Interaktív Mátrix táblázat */}
                <div className="flex flex-col items-center">
                  <div className="overflow-x-auto p-2">
                    <table className="border-collapse text-center font-mono text-[11px]">
                      <thead>
                        <tr>
                          <th className="p-1 text-slate-400 font-normal">K1 \ K2</th>
                          {[1, 2, 3, 4, 5, 6].map(c => (
                            <th key={`head-${c}`} className="p-1.5 font-bold text-rose-700 dark:text-rose-300">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 6].map(r => (
                          <tr key={`row-${r}`}>
                            <th className="p-1.5 font-bold text-rose-700 dark:text-rose-300">{r}</th>
                            {[1, 2, 3, 4, 5, 6].map(c => {
                              const isMatch = checkDiceCondition(r, c);
                              return (
                                <td
                                  key={`cell-${r}-${c}`}
                                  className={`p-1.5 sm:p-2 border border-slate-200 dark:border-slate-800 rounded transition-all duration-200 ${
                                    isMatch
                                      ? 'bg-rose-500 text-white font-black shadow-xs scale-105'
                                      : 'bg-slate-50 dark:bg-slate-900 text-slate-400'
                                  }`}
                                >
                                  ({r},{c})
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Eredmény kiértékelés sáv */}
                  <div className="w-full max-w-lg p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex justify-between items-center font-mono font-bold mt-2">
                    <span>Kedvező esetek: <strong className="text-rose-700 dark:text-rose-300">{matchingDiceCombos} / 36 db</strong></span>
                    <span className="text-sm text-rose-900 dark:text-rose-200">
                      P = {matchingDiceCombos}/36 = {diceProb}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProbabilityProblemsTheory;
