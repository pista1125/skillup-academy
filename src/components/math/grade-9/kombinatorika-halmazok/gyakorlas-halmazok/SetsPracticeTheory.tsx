import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  Brain,
  Layers,
  Split,
  PieChart,
  MoveHorizontal,
  Compass,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Info,
  BookOpen
} from 'lucide-react';
import {
  ThreeSetsVennRegionsSvg,
  SymmetricDifferenceSvg,
  NumberSetsHierarchySvg,
  SubsetInclusionVennSvg,
  DisjointSetsVennSvg,
  ComplexIntervalZIntersectionSvg,
  PowerSetTreeSvg
} from './SetsPracticeFigures';

interface SetsPracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SetsPracticeTheory: React.FC<SetsPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR: Halmazművelet és Szimmetrikus Differencia Szimulátor ---
  const [elementsA, setElementsA] = useState<string>('1, 2, 3, 4');
  const [elementsB, setElementsB] = useState<string>('3, 4, 5, 6');

  const parsedSets = useMemo(() => {
    const parse = (str: string) =>
      Array.from(
        new Set(
          str
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        )
      );

    const setA = parse(elementsA);
    const setB = parse(elementsB);

    // Metszet (∩)
    const inter = setA.filter((x) => setB.includes(x));
    // Unió (∪)
    const union = Array.from(new Set([...setA, ...setB]));
    // A \ B
    const diffAB = setA.filter((x) => !setB.includes(x));
    // B \ A
    const diffBA = setB.filter((x) => !setA.includes(x));
    // Szimmetrikus differencia: (A \ B) ∪ (B \ A)
    const symDiff = [...diffAB, ...diffBA];

    return {
      setA,
      setB,
      inter,
      union,
      diffAB,
      diffBA,
      symDiff
    };
  }, [elementsA, elementsB]);

  // Kinyitható feladatok állapota
  const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({});
  const toggleTask = (id: string) => {
    setOpenTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TheoryTemplate
      title="10. Témakör: Gyakorlás és Összefoglalás (Halmazok)"
      subtitle="Átfogó típusfeladatok, Venn-diagramos feladványok, De Morgan azonosságok és intervallumos szintézis"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎯 HALMAZOK GYAKORLÁSA"
      documentId="sets-practice-theory"
      pdfFilename="9_osztaly_halmazok_gyakorlas_osszefoglalas.pdf"
      themeColor="violet"
      quickRule={{
        label: 'A Halmazelméleti Gyakorlat Alapszabályai',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 font-bold text-[11px]">
                De Morgan:
              </span>
              <span className="font-mono text-violet-950 dark:text-violet-200">
                A ∪ B = Ā ∩ B̄  és  A ∩ B = Ā ∪ B̄
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold text-[11px]">
                Szimmetrikus diff:
              </span>
              <span className="font-mono text-purple-950 dark:text-purple-200">
                A Δ B = (A \ B) ∪ (B \ A) = (A ∪ B) \ (A ∩ B)
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                Számhalmazok:
              </span>
              <span className="font-mono text-emerald-950 dark:text-emerald-200">
                ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ  |  ℚ ∩ ℚ* = ∅
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a halmazelméleti feladványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és mind a 3 játékmódban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* 1. SZEKCIÓ: ÁTFOGÓ FOGALOMTÁR ÉS SZIMBÓLUMOK */}
      <TheorySection
        title="1. Halmazelméleti Fogalomtár és Szimbólumrendszer"
        icon={<BookOpen className="w-5 h-5" />}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A halmazelmélet a modern matematika alappillére: a geometriai alakzatoktól a valós függvényekig mindent halmazokként fogalmazunk meg.
          Nézzük át a legfontosabb jelöléseket és fogalmakat egyetlen áttekinthető térképen!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Alapvető Halmazelméleti Relációk"
            color="indigo"
          >
            <SubsetInclusionVennSvg size={180} className="my-2" />
            <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
              <li>
                <strong>x ∈ A:</strong> x <em>eleme</em> az A halmaznak (pl. 3 ∈ ℕ).
              </li>
              <li>
                <strong>x ∉ A:</strong> x <em>nem eleme</em> az A halmaznak (pl. -2 ∉ ℕ).
              </li>
              <li>
                <strong>A ⊆ B:</strong> A <em>részhalmaza</em> B-nek (A minden eleme B-nek is eleme).
              </li>
              <li>
                <strong>A ⊂ B:</strong> A <em>valódi részhalmaza</em> B-nek (A része B-nek, de $A \ne B$).
              </li>
              <li>
                <strong>∅:</strong> Az <em>üres halmaz</em>, amelynek egyetlen eleme sincs ($|\emptyset| = 0$). Az üres halmaz <strong>minden halmaznak részhalmaza</strong> ($\emptyset \subseteq A$).
              </li>
              <li>
                <strong>2ⁿ:</strong> Egy $n$-elemű halmaz összes részhalmazának száma (hatványhalmaz).
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Nevezetes Számhalmazok Hierarchiája"
            color="sky"
          >
            <NumberSetsHierarchySvg size={200} className="my-2" />
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono space-y-1">
              <div><strong className="text-emerald-700 dark:text-emerald-400">ℕ:</strong> Természetes számok: {`{0, 1, 2, 3, ...}`}</div>
              <div><strong className="text-indigo-700 dark:text-indigo-400">ℤ:</strong> Egész számok: {`{..., -2, -1, 0, 1, 2, ...}`}</div>
              <div><strong className="text-sky-700 dark:text-sky-400">ℚ:</strong> Racionális számok (felírhatók p/q törtként)</div>
              <div><strong className="text-rose-700 dark:text-rose-400">ℚ*:</strong> Irracionális számok (nem szakaszos végtelen tizedestörtek: √2, π, e)</div>
              <div><strong className="text-slate-900 dark:text-slate-100">ℝ:</strong> Valós számok: ℝ = ℚ ∪ ℚ*</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              Láncolat: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. A racionális és irracionális számok halmaza <strong>diszjunkt</strong>: ℚ ∩ ℚ* = ∅.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Hatványhalmaz: Miért éppen 2ⁿ?"
          type="tip"
        >
          Ha egy halmaznak $n$ eleme van, minden egyes elemről függetlenül eldönthetjük, hogy beválogatjuk-e az adott részhalmazba (2 lehetőség: benne van VAGY nincs benne).
          A kombinatorikai szorzási szabály szerint: $2 \cdot 2 \cdot \dots \cdot 2 = 2^n$ darab különböző részhalmaz képezhető!
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: MŰVELETI TÖRVÉNYEK ÉS DE MORGAN */}
      <TheorySection
        title="2. Halmazalgebrai Törvények és De Morgan Azonosságok"
        icon={<Split className="w-5 h-5" />}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A számok összeadásához és szorzásához hasonlóan a halmazműveletekre is szigorú algebrai szabályok vonatkoznak:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-4">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-indigo-200 dark:border-indigo-900 shadow-xs space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-400">1. Alaptulajdonságok</span>
            <div className="text-xs space-y-1.5 font-mono text-slate-700 dark:text-slate-300">
              <div>• <strong>Kommutativitás:</strong><br />$A \cup B = B \cup A$<br />$A \cap B = B \cap A$</div>
              <div>• <strong>Asszociativitás:</strong><br />$(A \cup B) \cup C = A \cup (B \cup C)$<br />$(A \cap B) \cap C = A \cap (B \cap C)$</div>
              <div>• <strong>Idempotencia:</strong><br />$A \cup A = A$, $A \cap A = A$</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-purple-200 dark:border-purple-900 shadow-xs space-y-2">
            <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-400">2. Disztributivitás</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A metszet és az unió kölcsönösen széttagolható:
            </p>
            <div className="text-xs space-y-2 font-mono text-slate-800 dark:text-slate-200 bg-purple-50 dark:bg-slate-900 p-2 rounded-xl">
              <div>$A \cap (B \cup C) =$ <br />$(A \cap B) \cup (A \cap C)$</div>
              <div>$A \cup (B \cap C) =$ <br />$(A \cup B) \cap (A \cup C)$</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-rose-200 dark:border-rose-900 shadow-xs space-y-2">
            <span className="text-xs font-black uppercase text-rose-700 dark:text-rose-400">3. De Morgan Szabályok</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A komplementer „megfordítja” a műveletet:
            </p>
            <div className="text-xs space-y-2 font-mono text-slate-800 dark:text-slate-200 bg-rose-50 dark:bg-slate-900 p-2 rounded-xl">
              <div>{"(A ∪ B) = Ā ∩ B̄"}</div>
              <div>{"(A ∩ B) = Ā ∪ B̄"}</div>
            </div>
            <p className="text-[10.5px] text-slate-500">
              „Nem igaz, hogy A vagy B” ⟺ „A sem igaz ÉS B sem igaz”.
            </p>
          </div>
        </div>

        {/* Szimmetrikus Differencia kiemelés */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:to-slate-850 border-2 border-purple-300 dark:border-purple-800 flex flex-col md:flex-row items-center gap-4 my-4">
          <SymmetricDifferenceSvg size={190} className="shrink-0" />
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <h4 className="text-sm sm:text-base font-black text-purple-950 dark:text-purple-200">
              A Szimmetrikus Differencia: $A \Delta B$ (Kizáró VAGY)
            </h4>
            <p>
              A szimmetrikus különbség azon elemek halmaza, amelyek <strong>pontosan az egyik halmazhoz</strong> tartoznak, de nem mindkettőhöz:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 font-mono text-xs font-bold text-purple-900 dark:text-purple-300">
              A Δ B = (A \ B) ∪ (B \ A) = (A ∪ B) \ (A ∩ B)
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ez a logikai XOR (kizáró vagy) megfelelője a halmazelméletben!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: VENN-DIAGRAMOK ÉS SZITAFORMULA MESTERFOGÁSAI */}
      <TheorySection
        title="3. A Szitaformula és Venn-Diagramok Mesterfogásai"
        icon={<PieChart className="w-5 h-5 text-amber-500" />}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Amikor szöveges halmazos feladatot oldunk meg (például nyelveket tanuló diákok, sportolók vagy tantárgyi felmérések),
          a legfontosabb módszer a <strong>belülről kifelé kitöltési stratégia</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Kitöltési Lépések Venn-Diagramnál
            </h4>
            <ol className="text-xs sm:text-sm space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>Legmélyebb metszet beírása:</strong> Először mindig a 3 halmaz közös metszetét írjuk be: $|A \cap B \cap C|$.
              </li>
              <li>
                <strong>Páros metszetek kitöltése:</strong> A kettes metszetekből le kell vonni a már beírt hármas metszetet!
              </li>
              <li>
                <strong>Csak egy halmazba tartozók:</strong> A teljes halmaz elemszámából kivonjuk az összes már beírt szomszédos metszetet.
              </li>
              <li>
                <strong>Alaphalmaz kívül rekedt része:</strong> A teljes létszámból ($|U|$) kivonjuk az unió összes részét: $|U \setminus (A \cup B \cup C)|$.
              </li>
            </ol>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center">
            <ThreeSetsVennRegionsSvg size={210} />
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2 text-center">
              A 3-halmazos Venn-diagram 8 diszjunkt tartományra osztja az alaphalmazt!
            </span>
          </div>
        </div>

        <TheoryCard
          title="Szitaformula Képletek Gyorsreferenciája"
          color="amber"
        >
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="p-2 rounded bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-bold">
              Két halmazra: |A ∪ B| = |A| + |B| − |A ∩ B|
            </div>
            <div className="p-2 rounded bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-bold">
              Három halmazra: |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV MŰVELETI LABOR */}
      <TheorySection
        title="4. Interaktív Halmazműveleti Szimulátor"
        icon={<SlidersHorizontal className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Próbáld ki a műveleteket tetszőleges elemekkel! Írj be vesszővel elválasztott számokat vagy szavakat az $A$ és $B$ halmazba:
        </p>

        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-violet-50/70 via-white to-purple-50/60 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-violet-200 dark:border-violet-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-violet-200 dark:border-violet-900 shadow-2xs space-y-1.5">
              <label className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase">
                A Halmaz elemei:
              </label>
              <input
                type="text"
                value={elementsA}
                onChange={(e) => setElementsA(e.target.value)}
                placeholder="pl. 1, 2, 3, 4"
                className="w-full px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <span className="text-[11px] text-slate-500 font-bold">
                Elemszám: |A| = {parsedSets.setA.length}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-purple-200 dark:border-purple-900 shadow-2xs space-y-1.5">
              <label className="text-xs font-black text-pink-700 dark:text-pink-300 uppercase">
                B Halmaz elemei:
              </label>
              <input
                type="text"
                value={elementsB}
                onChange={(e) => setElementsB(e.target.value)}
                placeholder="pl. 3, 4, 5, 6"
                className="w-full px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <span className="text-[11px] text-slate-500 font-bold">
                Elemszám: |B| = {parsedSets.setB.length}
              </span>
            </div>
          </div>

          {/* Eredmény Kártyák */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800">
              <span className="text-[10.5px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase">
                Metszet (A ∩ B)
              </span>
              <span className="text-xs font-mono font-black text-emerald-950 dark:text-emerald-200 mt-1 block">
                {parsedSets.inter.length > 0 ? `{ ${parsedSets.inter.join(', ')} }` : '∅ (üres)'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">({parsedSets.inter.length} elem)</span>
            </div>

            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800">
              <span className="text-[10.5px] font-bold text-amber-800 dark:text-amber-300 block uppercase">
                Unió (A ∪ B)
              </span>
              <span className="text-xs font-mono font-black text-amber-950 dark:text-amber-200 mt-1 block">
                {parsedSets.union.length > 0 ? `{ ${parsedSets.union.join(', ')} }` : '∅'}
              </span>
              <span className="text-[10px] text-amber-700 font-medium">({parsedSets.union.length} elem)</span>
            </div>

            <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-300 dark:border-sky-800">
              <span className="text-[10.5px] font-bold text-sky-800 dark:text-sky-300 block uppercase">
                Különbség (A \ B)
              </span>
              <span className="text-xs font-mono font-black text-sky-950 dark:text-sky-200 mt-1 block">
                {parsedSets.diffAB.length > 0 ? `{ ${parsedSets.diffAB.join(', ')} }` : '∅'}
              </span>
              <span className="text-[10px] text-sky-700 font-medium">({parsedSets.diffAB.length} elem)</span>
            </div>

            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-300 dark:border-purple-800">
              <span className="text-[10.5px] font-bold text-purple-800 dark:text-purple-300 block uppercase">
                Szimmetrikus (A Δ B)
              </span>
              <span className="text-xs font-mono font-black text-purple-950 dark:text-purple-200 mt-1 block">
                {parsedSets.symDiff.length > 0 ? `{ ${parsedSets.symDiff.join(', ')} }` : '∅'}
              </span>
              <span className="text-[10px] text-purple-700 font-medium">({parsedSets.symDiff.length} elem)</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: KIDOLGOZOTT MESTERFELADATOK */}
      <TheorySection
        title="5. Kidolgozott Mesterfeladatok és Érettségi Példák"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
          Kattints a feladatokra a részletes levezetés és a megoldás megtekintéséhez:
        </p>

        <div className="space-y-3">
          {/* 1. Mesterfeladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t1')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200 flex items-center justify-center text-xs font-black">
                  1
                </span>
                Intervallum és Számhalmaz Metszete: [-3, 4] ∩ ℤ
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t1'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t1'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <ComplexIntervalZIntersectionSvg size={220} className="my-1" />
                <p><strong>Megoldás:</strong></p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-xs space-y-1">
                  <div>A [-3, 4] valós intervallum végtelen sok pontot tartalmaz, de a ℤ-vel vett metszet kizárólag az egészeket tartja meg.</div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-300">[-3, 4] ∩ ℤ = {'{-3, -2, -1, 0, 1, 2, 3, 4}'} (pontosan 8 elem).</div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Mesterfeladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t2')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200 flex items-center justify-center text-xs font-black">
                  2
                </span>
                Hatványhalmaz Részhalmazai: Hány valódi részhalmaza van egy 5-elemű halmaznak?
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t2'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t2'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-xs space-y-1.5">
                  <div>• Összes részhalmaz száma: $2^n = 2^5 = 32$.</div>
                  <div>• A <em>valódi részhalmaz</em> definíciója szerint nem egyezhet meg magával az eredeti halmazzal (tehát az önmaga halmaz kiesik).</div>
                  <div className="font-bold text-purple-700 dark:text-purple-300">Valódi részhalmazok száma: 2⁵ − 1 = 32 − 1 = 31 db.</div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Mesterfeladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t3')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200 flex items-center justify-center text-xs font-black">
                  3
                </span>
                3-Halmazos Szöveges Felmérés (Klasszikus Érettségi)
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t3'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t3'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  Egy 30 fős osztályban mindenki tanul legalább egy nyelvet. Angolt 18-an, németet 15-en, franciát 10-en. Angolt és németet 8-an, angolt és franciát 5-en, németet és franciát 4-en tanulnak. Hányan tanulják mindhárom nyelvet?
                </p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-xs space-y-1">
                  <div>A 3 halmazos szitaformula szerint:</div>
                  <div>$|A \cup N \cup F| = |A| + |N| + |F| - |A \cap N| - |A \cap F| - |N \cap F| + |A \cap N \cap F|$</div>
                  <div>$30 = 18 + 15 + 10 - 8 - 5 - 4 + x$</div>
                  <div>$30 = 43 - 17 + x = 26 + x$</div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">x = 30 − 26 = 4 diák tanul mindhárom nyelvet!</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: MATEMATIKATÖRTÉNET ÉS PARADOXONOK */}
      <TheorySection
        title="6. Matematikai Kitekintő: A Russell-Paradoxon"
        icon={<Info className="w-5 h-5 text-purple-600" />}
      >
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:to-slate-850 border border-purple-200 dark:border-purple-900 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-2">
          <p>
            A 19. század végén Georg Cantor megalkotta a halmazelméletet, de hamarosan kiderült, hogy a naiv definíció („bármilyen tulajdonsággal definiálhatunk halmazt”) veszélyes ellentmondásokhoz vezethet.
          </p>
          <p>
            <strong>Bertrand Russell</strong> (1872–1970) brit filozófus és matematikus 1901-ben felvetette a híres kérdést:
            <em> „Legyen R azon halmazok halmaza, amelyek nem tartalmazzák önmagukat elemként. Eleme-e R önmagának?”</em>
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1 font-mono text-xs">
            <li>Ha $R \in R$, akkor a definíció szerint nem lehetne eleme önmagának (Ellentmondás!).</li>
            <li>Ha $R \notin R$, akkor a definíció szerint eleme kellene legyen önmagának (Ellentmondás!).</li>
          </ul>
          <p className="text-[11.5px] text-slate-600 dark:text-slate-400">
            Ez a borbély-paradoxon matematikai megfelelője: „A falusi borbély csak azokat borotválja, akik magukat nem borotválják. Borotválja-e magát a borbély?”
            A paradoxon feloldására született meg a modern axiomatikus halmazelmélet (Zermelo-Fraenkel axiómarendszer).
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SetsPracticeTheory;
