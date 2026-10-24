import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard
} from '../TheoryTemplate';

const InteractiveCard: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-red-200 dark:border-red-900/60 shadow-xs space-y-3">
    <div>
      <h3 className="text-base font-black text-slate-900 dark:text-white">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const StepByStep: React.FC<{ steps: string[] }> = ({ steps }) => (
  <div className="space-y-2 mt-2">
    {steps.map((step, idx) => (
      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
        <span>{step}</span>
      </div>
    ))}
  </div>
);
import {
  ChapterSummaryMindmapSvg,
  ExamVennSieveSvg,
  CompleteGraphKHandshakesSvg,
  IntervalSetIntersectionRulerSvg,
  CountingPermutationTreeSvg,
  DeMorganVennSvg,
  RussellParadoxScaleSvg
} from './KnowledgeTestFigures';
import {
  Sparkles,
  Trophy,
  Brain,
  Calculator,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Scale,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface KnowledgeTestTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const KnowledgeTestTheory: React.FC<KnowledgeTestTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Témazáró Szimulátor Állapot
  const [activeTopic, setActiveTopic] = useState<'kombi' | 'grafok' | 'halmazok' | 'szita' | 'intervallum'>('kombi');
  
  // Kombi kalkulátor állapot: n elem permutációja
  const [permN, setPermN] = useState<number>(5);

  // Gráf kalkulátor állapot: n csúcsú teljes gráf
  const [graphN, setGraphN] = useState<number>(6);

  // Szita kalkulátor állapot: |A|, |B|, |A ∩ B|
  const [setA, setSetA] = useState<number>(20);
  const [setB, setSetB] = useState<number>(15);
  const [setCap, setSetCap] = useState<number>(6);

  // Faktoriális segédfüggvény
  const factorial = (n: number): number => {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  return (
    <TheoryTemplate
      title="I. Fejezeti Összefoglalás & Témazáró Tudáspróba"
      subtitle="A Kombinatorika és Halmazelmélet teljes szintézise 9. osztályban, érettségi és témazáró mintapéldákkal"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🏆 FEJEZETI TÉMAZÁRÓ & TUDÁSPRÓBA"
      documentId="knowledge-test-theory"
      pdfFilename="9_osztaly_fejezeti_osszefoglalas_tudasproba.pdf"
      themeColor="rose"
      quickRule={{
        label: 'A Fejezet Legfontosabb Főképletei',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-[11px]">
                Kombinatorika:
              </span>
              <span className="font-mono text-rose-950 dark:text-rose-200">
                Pₙ = n!  |  Kₙ élek = n(n−1)/2  |  Körasztal: (n−1)!
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-[11px]">
                Halmazok & Szita:
              </span>
              <span className="font-mono text-indigo-950 dark:text-indigo-200">
                |A ∪ B| = |A| + |B| − |A ∩ B|  |  2ⁿ részhalmaz
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                Intervallumok:
              </span>
              <span className="font-mono text-emerald-950 dark:text-emerald-200">
                [a; b] zárt (●)  |  ]a; b[ nyílt (○)  |  ±∞ mellett mindig nyílt
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a 90 kérdéses fejezeti témazáróra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintű tudáspróbán és a memóriajátékokban!"
      practiceButtonText="Tudáspróba Indítása"
    >
      {/* 1. SZEKCIÓ: A Fejezet 6 Alappillére */}
      <TheorySection
        title="1. A Fejezet Hat Alappillérének Áttekintése"
        subtitle="A kombinatorikai és halmazelméleti eszközök egymásra épülése"
        badge="Átfogó Térkép"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Kombinatorikus Összeszámlálás"
            description="Szorzási és összeadási szabály, fadiagramok és a permutáció (n!). Sorrendek, kódok és ültetések modellezése."
            formula="P_n = n! = n \cdot (n-1) \dots 1"
            color="rose"
            icon={<Brain className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
          />

          <TheoryCard
            title="2. Gráfok és Kapcsolatok"
            description="Csúcsok, élek, fokszámok összege (∑ d(v) = 2e). A páratlan fokszámú csúcsok száma mindig páros, teljes gráf élei: n(n-1)/2."
            formula="\sum_{v \in V} d(v) = 2 \cdot e \quad | \quad \binom{n}{2} = \frac{n(n-1)}{2}"
            color="amber"
            icon={<Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          />

          <TheoryCard
            title="3. Halmazok és Műveletek"
            description="Unió (∪), metszet (∩), különbség (\), komplementer (Ā) és szimmetrikus differencia (A Δ B). De Morgan azonosságok."
            formula="A \Delta B = (A \setminus B) \cup (B \setminus A) = (A \cup B) \setminus (A \cap B)"
            color="purple"
            icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          />

          <TheoryCard
            title="4. A Szitaformula Modellek"
            description="Két és három halmaz uniójának elemszáma. Átfedések pontos korrigálása: hozzáadjuk az egyeseket, levonjuk a páros metszeteket, visszahozzuk a hármas metszetet."
            formula="|A \cup B \cup C| = \sum |A| - \sum |A \cap B| + |A \cap B \cap C|"
            color="red"
            icon={<Award className="w-5 h-5 text-red-600 dark:text-red-400" />}
          />

          <TheoryCard
            title="5. Intervallumok a Számegyenesen"
            description="Valós számok folytonos szakaszai: nyílt ]a; b[, zárt [a; b], végtelenek és metszetük a diszkrét egész számokkal ([a; b] ∩ ℤ)."
            formula="[a; b] = \\{x \\in \\mathbb{R} \\mid a \\le x \\le b\\}"
            color="sky"
            icon={<Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
          />

          <TheoryCard
            title="6. Dirichlet-elv és Logika"
            description="Ha n + 1 tárgyat teszünk n skatulyába, legalább egybe 2 kerül. Tartalmazás tagadása: A ⊆ B hamis, ha A \ B ≠ ∅."
            formula="N > k \implies \text{legalább egy dobozban} \ge 2"
            color="emerald"
            icon={<Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          />
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: Interaktív Fejezeti Szimulátor */}
      <TheorySection
        title="2. Interaktív Fejezeti Labor & Képletszámoló"
        subtitle="Kísérletezz a fejezet 5 kulcsfontosságú matematikai modelljével"
        badge="Interaktív Labor"
      >
        <InteractiveCard
          title="Témazáró Számítási Laboratórium"
          subtitle="Válassz témakört és változtasd a paramétereket az azonnali számoláshoz és képletelemzéshez!"
        >
          <div className="space-y-6">
            {/* Téma fülek */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTopic('kombi')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  activeTopic === 'kombi'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                1. Permutáció (n!)
              </button>
              <button
                onClick={() => setActiveTopic('grafok')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  activeTopic === 'grafok'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                2. Gráf & Kézfogások
              </button>
              <button
                onClick={() => setActiveTopic('szita')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  activeTopic === 'szita'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                3. Szitaformula Két Halmazra
              </button>
              <button
                onClick={() => setActiveTopic('halmazok')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  activeTopic === 'halmazok'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                4. Részhalmazok (2ⁿ)
              </button>
              <button
                onClick={() => setActiveTopic('intervallum')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  activeTopic === 'intervallum'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                5. Intervallum Egész Pontjai
              </button>
            </div>

            {/* Tartalom témánként */}
            {activeTopic === 'kombi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Elemek száma (n): <span className="text-rose-600 font-extrabold text-lg">{permN}</span>
                    </label>
                    <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-semibold">
                      n! kalkulátor
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={permN}
                    onChange={(e) => setPermN(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                    <div className="text-xs text-rose-700 dark:text-rose-300 font-semibold mb-1">
                      Kombinatorikai Permutációk Eredménye:
                    </div>
                    <div className="text-2xl font-black text-rose-900 dark:text-rose-100">
                      {permN}! = {factorial(permN).toLocaleString('hu-HU')} sorrend
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Körasztal körül: ({permN} - 1)! = {factorial(permN - 1).toLocaleString('hu-HU')} ülésrend.
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <CountingPermutationTreeSvg size={200} />
                </div>
              </div>
            )}

            {activeTopic === 'grafok' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Csúcsok száma (n): <span className="text-amber-600 font-extrabold text-lg">{graphN}</span>
                    </label>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                      Kézfogási Lemma
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={graphN}
                    onChange={(e) => setGraphN(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                    <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold mb-1">
                      Teljes gráf összes éle / Kézfogások:
                    </div>
                    <div className="text-2xl font-black text-amber-900 dark:text-amber-100">
                      e = ({graphN} · {graphN - 1}) / 2 = {(graphN * (graphN - 1)) / 2} él
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Fokszámok összege: ∑ d(v) = 2 · e = {graphN * (graphN - 1)}. Minden csúcs foka: d = {graphN - 1}.
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <CompleteGraphKHandshakesSvg size={190} />
                </div>
              </div>
            )}

            {activeTopic === 'szita' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      |A| elemszám: <span className="text-blue-600 font-bold">{setA}</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      value={setA}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSetA(val);
                        if (setCap > Math.min(val, setB)) setSetCap(Math.min(val, setB));
                      }}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      |B| elemszám: <span className="text-pink-600 font-bold">{setB}</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      value={setB}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSetB(val);
                        if (setCap > Math.min(setA, val)) setSetCap(Math.min(setA, val));
                      }}
                      className="w-full accent-pink-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Közös metszet |A ∩ B|: <span className="text-purple-600 font-bold">{setCap}</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={Math.min(setA, setB)}
                      value={setCap}
                      onChange={(e) => setSetCap(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                    <div className="text-lg font-black text-red-900 dark:text-red-100">
                      |A ∪ B| = {setA} + {setB} - {setCap} = {setA + setB - setCap}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Csak A: {setA - setCap} | Csak B: {setB - setCap} | Szimmetrikus diff: {(setA - setCap) + (setB - setCap)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ExamVennSieveSvg size={190} />
                </div>
              </div>
            )}

            {activeTopic === 'halmazok' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Halmaz elemszáma (n): <span className="text-purple-600 font-extrabold text-lg">{permN}</span>
                    </label>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-semibold">
                      Hatványhalmaz
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={permN}
                    onChange={(e) => setPermN(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                    <div className="text-xs text-purple-700 dark:text-purple-300 font-semibold mb-1">
                      Összes részhalmaz száma:
                    </div>
                    <div className="text-2xl font-black text-purple-900 dark:text-purple-100">
                      |𝒫(A)| = 2^{permN} = {Math.pow(2, permN).toLocaleString('hu-HU')}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Valódi részhalmazok száma: 2^{permN} - 1 = {Math.pow(2, permN) - 1}.
                      Nem üres valódiak: 2^{permN} - 2 = {Math.pow(2, permN) - 2}.
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <DeMorganVennSvg size={190} />
                </div>
              </div>
            )}

            {activeTopic === 'intervallum' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
                    <div className="text-sm font-black text-sky-900 dark:text-sky-100">
                      A = [-3; 2[ és B = [0; 5] Műveletei:
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      • <strong>Metszet (A ∩ B):</strong> [0; 2[ (közös valós szakasz)
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      • <strong>Egész pontok a metszetben:</strong> [0; 2[ ∩ ℤ = {'{0, 1}'} (2 db)
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      • <strong>Unió (A ∪ B):</strong> [-3; 5] (teljes lefedett szakasz)
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      • <strong>Különbség (A \ B):</strong> [-3; 0[ (a 0 benne volt B-ben, így nyílt lett!)
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <IntervalSetIntersectionRulerSvg size={210} />
                </div>
              </div>
            )}
          </div>
        </InteractiveCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: 6 Kidolgozott Témazáró Mesterfeladat Pontozással */}
      <TheorySection
        title="3. 100 Pontos Témazáró Mintadolgozat & Részletes Megoldások"
        subtitle="Tipikus reprezentatív feladatok a dolgozatokra és a felvételire készülve"
        badge="100 Pontos Dolgozat"
      >
        <div className="space-y-6">
          {/* 1. Feladat: 15 pont */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                1. Feladat: Számalkotás és PIN-kódok
              </span>
              <span className="text-xs font-bold text-slate-500">15 pont</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 font-semibold">
              a) Hány 4-jegyű bankkártya PIN kód készíthető a 0, 1, 2, 3 számjegyekből, ha a jegyek ismétlődhetnek?<br />
              b) Hány 4-jegyű valódi egész szám készíthető ugyanezen jegyekből ismétlés nélkül?
            </p>
            <StepByStep
              steps={[
                'a) PIN kód esetén az első jegy 0 is lehet. Mind a 4 helyiértékre 4 lehetőségünk van: 4 · 4 · 4 · 4 = 4⁴ = 256 PIN kód (7 pont).',
                'b) Valódi 4-jegyű szám nem kezdődhet 0-val, így az első helyre csak {1, 2, 3} mehet (3 lehetőség).',
                'A második helyre a megmaradt 3 jegyből választhatunk (beleértve a 0-t is), a harmadikra 2, a negyedikre 1 jegy marad.',
                'Összes szám: 3 · 3 · 2 · 1 = 18 különböző négyjegyű valódi szám készíthető (8 pont).'
              ]}
            />
          </div>

          {/* 2. Feladat: 15 pont */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                2. Feladat: Gráfelmélet és Körmérkőzések
              </span>
              <span className="text-xs font-bold text-slate-500">15 pont</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 font-semibold">
              Egy 7 fős asztalitenisz tornán mindenki mindenkivel pontosan egyszer játszik.<br />
              a) Hány mérkőzést játszanak le összesen?<br />
              b) Lehetséges-e olyan pillanat a verseny közben, amikor a játékosok lejátszott mérkőzéseinek számai rendre: 5, 5, 4, 3, 2, 1, 1?
            </p>
            <StepByStep
              steps={[
                'a) A mérkőzések száma egy 7 csúcsú teljes gráf éleinek száma: (7 · 6) / 2 = 42 / 2 = 21 mérkőzés (7 pont).',
                'b) Ellenőrizzük a fokszámok összegét és a páratlan fokú csúcsok tételét!',
                'A megadott fokszámok: 5, 5, 4, 3, 2, 1, 1. A páratlan fokszámú csúcsok: 5, 5, 3, 1, 1 (összesen 5 darab páratlan fokszámú csúcs van).',
                'Mivel a kézfogási lemma szerint minden egyszerű gráfban a páratlan fokú csúcsok száma PÁROS kell legyen, ez az állapot LEHETETLEN (8 pont).'
              ]}
            />
          </div>

          {/* 3. Feladat: 20 pont */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                3. Feladat: Három Halmazos Szitaformula Szöveges Feladvány
              </span>
              <span className="text-xs font-bold text-slate-500">20 pont</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 font-semibold">
              Egy 50 fős évfolyamon 30-an szeretik a matekot (M), 25-en a fizikát (F), és 22-en a kémiát (K).
              Tudjuk, hogy 14-en szeretik a matekot és fizikát, 11-en a matekot és kémiát, 10-en a fizikát és kémiát,
              és 6 diák mindhárom tárgyat szereti. Hányan nem szeretik egyik tárgyat sem?
            </p>
            <StepByStep
              steps={[
                'Alkalmazzuk a 3 halmazos szitaformulát a legalább egy tárgyat kedvelők uniójára:',
                '|M ∪ F ∪ K| = (|M| + |F| + |K|) - (|M ∩ F| + |M ∩ K| + |F ∩ K|) + |M ∩ F ∩ K|',
                '|M ∪ F ∪ K| = (30 + 25 + 22) - (14 + 11 + 10) + 6 = 77 - 35 + 6 = 48 fő.',
                'A teljes évfolyam létszáma 50 fő, így a semelyik tantárgyat sem kedvelők száma: 50 - 48 = 2 diák.'
              ]}
            />
          </div>

          {/* 4. Feladat: 15 pont */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                4. Feladat: Intervallumok és Számegyenes Műveletek
              </span>
              <span className="text-xs font-bold text-slate-500">15 pont</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 font-semibold">
              Adott a valós számegyenesen két intervallum: A = ]-4; 3] és B = [-1; 6[.<br />
              Határozd meg a következő halmazokat és számold meg a metszet egész elemeit!<br />
              a) A ∩ B<br />
              b) A ∪ B<br />
              c) A \ B<br />
              d) Hány egész szám tartozik az A ∩ B metszethez?
            </p>
            <StepByStep
              steps={[
                'a) Metszet (közös rész): a bal végpontok közül a nagyobbik (-1 zárt), a jobb végpontok közül a kisebbik (3 zárt): A ∩ B = [-1; 3] (4 pont).',
                'b) Unió (egyesített lefedés): ]-4; 6[ (4 pont).',
                'c) Különbség (A-ban van, de B-ben nincs): A-ból elvesszük a [-1; 6[ részt. Mivel a -1 benne van a levont B-ben, az új határ nyílt lesz: A \\ B = ]-4; -1[ (4 pont).',
                'd) Az A ∩ B = [-1; 3] intervallumba eső egész számok: {-1, 0, 1, 2, 3}, azaz pontosan 5 egész szám (3 pont).'
              ]}
            />
          </div>

          {/* 5. Feladat: 15 pont */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                5. Feladat: Részhalmazok és Szimmetrikus Differencia
              </span>
              <span className="text-xs font-bold text-slate-500">15 pont</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 font-semibold">
              a) Egy halmaznak 126 darab nem üres, valódi részhalmaza van. Hány eleme van a halmaznak?<br />
              b) Ha X = {'{1, 2, 3, 4}'} és Y = {'{3, 4, 5, 6}'}, határozd meg az X Δ Y szimmetrikus differenciát!
            </p>
            <StepByStep
              steps={[
                'a) Egy n elemű halmaz nem üres valódi részhalmazainak száma: 2ⁿ - 2 (kivonva az üres halmazt és magát az alaphalmazt).',
                '2ⁿ - 2 = 126  ⟹  2ⁿ = 128 = 2⁷  ⟹  A halmaz elemszáma n = 7 (8 pont).',
                'b) X \\ Y = {1, 2}, Y \\ X = {5, 6}.',
                'A szimmetrikus differencia e kettő uniója: X Δ Y = {1, 2, 5, 6} (7 pont).'
              ]}
            />
          </div>

          {/* 6. Feladat: 20 pont */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                6. Feladat: Dirichlet-elv és Logikai Bizonyítás
              </span>
              <span className="text-xs font-bold text-slate-500">20 pont</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 font-semibold">
              a) Egy iskolában 370 diák tanul. Bizonyítsd be a Dirichlet-skatulyaelvvel, hogy biztosan van legalább két olyan diák, akiknek a születésnapjuk az év ugyanazon napjára esik!<br />
              b) Mi a logikai tagadása annak az állításnak, hogy „Minden prímszám páratlan”? Írd fel a cáfolatát halmazelméletileg is!
            </p>
            <StepByStep
              steps={[
                'a) Egy évben legfeljebb 366 nap van (szökőév esetén). Tekintsük a 366 napot skatulyáknak (k = 366), a 370 diákot pedig tárgyaknak (N = 370).',
                'Mivel N = 370 > 366 = k, a Dirichlet-elv értelmében legalább egy skatulyába legalább 2 diák kell kerüljön, tehát van legalább 2 azonos napon született diák (10 pont).',
                'b) Egy „Minden x-re igaz P” egyetemes állítás tagadása: „Létezik legalább egy olyan x, amelyre P nem igaz”.',
                'Tagadás szövegesen: „Létezik legalább egy olyan prímszám, amely nem páratlan (azaz páros)”.',
                'Halmazelméletileg: Ha P a prímszámok és E a páros számok halmaza, akkor P ∩ E ≠ ∅. Az ellenpélda a 2-es szám, így az eredeti állítás hamis (10 pont).'
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: Történeti és Filozófiai Zárógondolat */}
      <TheorySection
        title="4. Kitekintés: A Modern Matematika Alapjai"
        subtitle="Hogyan formálta a halmazelmélet a 20. század teljes tudományát?"
        badge="Epilógus"
      >
        <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <RussellParadoxScaleSvg size={60} />
            <div>
              <h4 className="text-base font-bold text-red-400">Cantor, Russell és az Axiomatikus Rendszerek</h4>
              <p className="text-xs text-slate-400">Miért volt szükség a formális szabályokra?</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            A 9. osztályos kombinatorika és halmazelmélet nem csupán elszigetelt fejezet, hanem <strong>a teljes modern matematika közös nyelve</strong>.
            A számhalmazok egymásba ágyazottsága, az intervallumok kezelése a függvénytan alapja, míg a szitaformula és a permutációk a valószínűségszámítás
            és az informatika algoritmusainak fundamentumát képezik.
          </p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={onStartQuiz}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Tovább a 30 Feladatos Témazáró Kvízre!
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default KnowledgeTestTheory;
