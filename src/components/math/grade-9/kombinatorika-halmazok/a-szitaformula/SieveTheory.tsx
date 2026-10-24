import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  Filter,
  Calculator,
  Layers,
  Sparkles,
  AlertTriangle,
  Boxes,
  HelpCircle,
  Binary,
  CheckCircle2,
  PieChart,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import {
  TwoSetsSieveSvg,
  DivisibilitySieveSvg,
  ThreeSetsSieveSvg,
  SurveyVennSvg,
  DisjointSieveSvg
} from './SieveFigures';

interface SieveTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SieveTheory: React.FC<SieveTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR 1: Két Halmaz Szita Szimulátor ---
  const [sizeA, setSizeA] = useState<number>(20);
  const [sizeB, setSizeB] = useState<number>(15);
  const [sizeInter, setSizeInter] = useState<number>(7);

  // Érvényes metszet maximum korlát
  const maxInter = Math.min(sizeA, sizeB);
  const safeInter = Math.min(sizeInter, maxInter);

  const onlyA = sizeA - safeInter;
  const onlyB = sizeB - safeInter;
  const unionTotal = sizeA + sizeB - safeInter;

  // --- INTERAKTÍV LABOR 2: Oszthatósági Szita (1..100) ---
  const [divisors, setDivisors] = useState<{ d1: number; d2: number; lcm: number; label: string }>({
    d1: 2,
    d2: 3,
    lcm: 6,
    label: '2 és 3 (lkkt = 6)'
  });

  const divisibilityData = useMemo(() => {
    const N = 100;
    const count1 = Math.floor(N / divisors.d1);
    const count2 = Math.floor(N / divisors.d2);
    const countBoth = Math.floor(N / divisors.lcm);
    const countUnion = count1 + count2 - countBoth;
    const countNeither = N - countUnion;

    return {
      count1,
      count2,
      countBoth,
      countUnion,
      countNeither,
      onlyD1: count1 - countBoth,
      onlyD2: count2 - countBoth
    };
  }, [divisors]);

  // --- INTERAKTÍV LABOR 3: Bentről Kifelé Kitöltési Stratégia Lépések ---
  const [stepIndex, setStepIndex] = useState<number>(0);
  const surveySteps = [
    {
      step: 1,
      title: '1. Lépés: Kezdj a legbelső metszettel!',
      explanation: 'A feladatban megadott „mindkét nyelvet tanulja” számot (6 fő) írd be a metszet közepébe.',
      activeZones: ['center']
    },
    {
      step: 2,
      title: '2. Lépés: Számold ki a „csak az egyik” területeket!',
      explanation: 'Csak angolosok: 18 − 6 = 12 fő. Csak németesek: 14 − 6 = 8 fő. Írd be a bal és jobb holdacskákba!',
      activeZones: ['left', 'right']
    },
    {
      step: 3,
      title: '3. Lépés: Készíts unió összeget!',
      explanation: 'Legalább egy nyelvet tanul: 12 + 6 + 8 = 26 fő (vagy képlettel: 18 + 14 − 6 = 26 fő).',
      activeZones: ['union']
    },
    {
      step: 4,
      title: '4. Lépés: Számold ki a külső univerzumi maradékot!',
      explanation: 'Az osztály 30 fős. Egyik nyelvet sem tanulja: 30 − 26 = 4 fő, ezt a körökön kívülre írjuk.',
      activeZones: ['outside']
    }
  ];
  const activeStep = surveySteps[stepIndex];

  return (
    <TheoryTemplate
      title="A Logikai Szitaformula és Alkalmazásai"
      subtitle="9. Osztály • I. Kombinatorika és halmazok • 8. Altéma"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 📊 A SZITAFORMULA"
      documentId="sieve-formula-theory"
      pdfFilename="9_osztaly_a_szitaformula_alkalmazasai.pdf"
      themeColor="amber"
      quickRule={{
        label: 'A Szitaformula Alaptételei',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                2 halmazra:
              </span>
              <span className="font-mono text-amber-950 dark:text-amber-200">
                |A ∪ B| = |A| + |B| − |A ∩ B|
              </span>
              <span className="text-[11px] text-slate-500">(Közös rész levonása)</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-[11px]">
                3 halmazra:
              </span>
              <span className="font-mono text-indigo-950 dark:text-indigo-200">
                |A ∪ B ∪ C| = Σ|egyediek| − Σ|páros metszetek| + |A ∩ B ∩ C|
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                Arany szabály:
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-xs font-normal">
                Szöveges feladatnál a Venn-diagramot mindig <strong>bentről kifelé</strong> töltjük ki!
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      practiceTitle="Készen állsz a szitaformula tudáspróbára?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és mind a 3 játékmódban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A KÉT HALMAZ SZITAFORMULÁJA */}
      <TheorySection
        number={1}
        title="A Két Halmaz Szitaformulája és a Duplán Számolás Elve"
        icon={<Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Alapformula"
        badgeColor="amber"
      >
        <TheoryCallout
          title="Miért nem elég egyszerűen összeadni a halmazok méretét?"
          type="info"
        >
          <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
            <p>
              Ha az A és B halmaz összes elemét meg akarjuk számlálni (|A ∪ B|), és egyszerűen összeadjuk |A| + |B|-t, akkor azokat az elemeket, amelyek <strong>mindkét halmazban benne vannak (A ∩ B), kétszer számoltuk meg</strong>!
            </p>
            <p className="font-bold text-amber-900 dark:text-amber-200">
              A helyes darabszám eléréséhez a duplán számolt közös metszetet pontosan egyszer le kell vonnunk: |A ∪ B| = |A| + |B| − |A ∩ B|!
            </p>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. A Logikai Szitaformula (Két Halmazra)"
            color="amber"
            formula="|A \cup B| = |A| + |B| - |A \cap B|"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <TwoSetsSieveSvg size={180} className="mx-auto" />
              <p>
                A képlet bármely két véges halmaz esetén érvényes, függetlenül attól, hogy van-e közös elemük vagy sem.
              </p>
              <div className="p-2 rounded-md bg-amber-50 dark:bg-amber-950/40 text-xs">
                Átrendezve a metszet kifejezésére: <strong>|A ∩ B| = |A| + |B| − |A ∪ B|</strong>.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Speciális Eset: Diszjunkt Halmazok"
            color="blue"
            formula="\text{Ha } A \cap B = \emptyset \implies |A \cup B| = |A| + |B|"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <DisjointSieveSvg size={170} className="mx-auto" />
              <p>
                Ha a két halmaznak nincs közös eleme (|A ∩ B| = 0), akkor nem számoltunk semmit duplán, így az unió elemszáma pontosan a két elemszám összege.
              </p>
              <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-950/40 text-xs">
                Példa: 8 fiú és 6 lány csoportjában |F ∪ L| = 8 + 6 = 14 fő.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 1: Két Halmaz Szita Szimulátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 1: Két Halmazos Szita Kalkulátor
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Állítsd be a halmazok méreteit és a metszetet!
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-mono font-black">
              Unió |A ∪ B| = {unionTotal} elem
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                |A| mérete: <span className="font-mono text-indigo-600">{sizeA}</span>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={sizeA}
                onChange={e => setSizeA(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                |B| mérete: <span className="font-mono text-teal-600">{sizeB}</span>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={sizeB}
                onChange={e => setSizeB(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Metszet |A ∩ B|: <span className="font-mono text-rose-600">{safeInter}</span>
              </label>
              <input
                type="range"
                min="0"
                max={maxInter}
                value={safeInter}
                onChange={e => setSizeInter(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          {/* Részletes zónabontás kártyák */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 block font-bold">Csak A (|A \ B|)</span>
              <span className="text-base font-black text-indigo-900 dark:text-indigo-100">{onlyA}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-bold">Közös (|A ∩ B|)</span>
              <span className="text-base font-black text-rose-900 dark:text-rose-100">{safeInter}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="text-[10px] text-teal-600 dark:text-teal-400 block font-bold">Csak B (|B \ A|)</span>
              <span className="text-base font-black text-teal-900 dark:text-teal-100">{onlyB}</span>
            </div>
          </div>

          <div className="mt-3 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            Számítás: {sizeA} + {sizeB} − {safeInter} = {unionTotal}  (vagy zónánként: {onlyA} + {safeInter} + {onlyB} = {unionTotal})
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: OSZTHATÓSÁGI FELADATOK */}
      <TheorySection
        number={2}
        title="Kombinatorikus Számelmélet: Oszthatósági Feladatok a Szitával"
        icon={<Binary className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Számelmélet"
        badgeColor="indigo"
      >
        <TheoryCallout
          title="Hány olyan szám van 1 és 100 között, amely osztható 2-vel vagy 3-mal?"
          type="tip"
        >
          <div className="space-y-1.5 text-xs sm:text-sm">
            <p>
              Ez az érettségi vizsgák egyik legkedveltebb típusfeladata. Lépései:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li><strong>2-vel oszthatók:</strong> [100 / 2] = 50 darab.</li>
              <li><strong>3-mal oszthatók:</strong> [100 / 3] = 33 darab (alsó egészrész).</li>
              <li><strong>Mindkettővel (2-vel és 3-mal is) oszthatók:</strong> 2 és 3 legkisebb közös többszöröse a 6! Így 6-tal osztható: [100 / 6] = 16 darab.</li>
              <li><strong>Alkalmazzuk a szitaformulát:</strong> 50 + 33 − 16 = <strong>67 darab szám</strong>!</li>
            </ol>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex flex-col justify-center items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
            <DivisibilitySieveSvg size={210} />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold mt-2">
              Középen: 6-tal oszthatóak (16 db) | Kívül: sem 2-vel, sem 3-mal nem osztható (33 db)
            </span>
          </div>

          <TheoryCard
            title="A legkisebb közös többszörös (lkkt) szerepe"
            color="indigo"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>
                <strong>VIGYÁZAT!</strong> Két szám metszetét (a közös osztókat) mindig a számok <strong>legkisebb közös többszörösével (lkkt)</strong> kell számolni!
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <strong className="text-rose-900 dark:text-rose-200 block mb-1">Tipikus hiba példa (4 és 6):</strong>
                A 4-gyel és 6-tal is osztható számok NEM a 4 · 6 = 24 többszörösei, hanem az <strong>lkkt(4, 6) = 12</strong> többszörösei! (Pl. a 12 és a 36 is osztható mindkettővel, de 24-gyel nem!)
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 2: Oszthatósági Szita */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Interaktív Labor 2: Oszthatósági Kalkulátor (1..100 tartományban)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Válassz ki egy osztópárt az 1..100 számok halmazára!
              </p>
            </div>

            <div className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 text-xs font-mono font-bold">
              Unió = {divisibilityData.countUnion} db szám
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { d1: 2, d2: 3, lcm: 6, label: '2 és 3 (lkkt = 6)' },
              { d1: 3, d2: 5, lcm: 15, label: '3 és 5 (lkkt = 15)' },
              { d1: 4, d2: 6, lcm: 12, label: '4 és 6 (lkkt = 12)' },
              { d1: 5, d2: 10, lcm: 10, label: '5 és 10 (lkkt = 10)' }
            ].map(pair => (
              <button
                key={pair.label}
                onClick={() => setDivisors(pair)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  divisors.label === pair.label
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 text-xs font-mono space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                <span className="text-[10px] text-slate-500 block">{divisors.d1}-gyel oszt.</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{divisibilityData.count1} db</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                <span className="text-[10px] text-slate-500 block">{divisors.d2}-vel oszt.</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{divisibilityData.count2} db</span>
              </div>
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
                <span className="text-[10px] block">Metszet ({divisors.lcm}-cal)</span>
                <span className="text-sm font-bold">{divisibilityData.countBoth} db</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                <span className="text-[10px] block">Unió (legalább 1)</span>
                <span className="text-sm font-bold">{divisibilityData.countUnion} db</span>
              </div>
            </div>

            <div className="text-center pt-1 text-[11px] text-slate-600 dark:text-slate-300">
              Képlet: {divisibilityData.count1} + {divisibilityData.count2} − {divisibilityData.countBoth} = <strong>{divisibilityData.countUnion} db</strong> | Egyikkel sem osztható: 100 − {divisibilityData.countUnion} = <strong>{divisibilityData.countNeither} db</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A HÁROM HALMAZ SZITAFORMULÁJA */}
      <TheorySection
        number={3}
        title="A Három Halmaz Szitaformulája (Poincaré-elv)"
        icon={<Boxes className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Poincaré-formula"
        badgeColor="purple"
      >
        <TheoryCallout
          title="A kompenzálás művészete 3 halmaz esetén"
          type="info"
        >
          <div className="space-y-1.5 text-xs sm:text-sm">
            <p>
              Három halmaz (A, B, C) uniójának kiszámításakor három rétegben kell korrigálnunk a darabszámokat:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li><strong>1. lépés (Hozzáadás):</strong> Összeadjuk az egyes halmazok méretét: +|A| + |B| + |C|. Ezzel a páros átfedéseket 2-szer, a középső hármas átfedést 3-szor számoltuk meg!</li>
              <li><strong>2. lépés (Kivonás):</strong> Levonjuk a 3 páros metszetet: −|A ∩ B| − |A ∩ C| − |B ∩ C|. Ezzel a páros átfedéseket helyreállítottuk (2 − 1 = 1-szer szerepelnek), viszont a középső hármas metszetet teljesen eltüntettük (3 − 3 = 0-szor szerepel)!</li>
              <li><strong>3. lépés (Visszapótlás):</strong> Egyszer vissza kell adnunk a középső hármas metszetet: <strong>+|A ∩ B ∩ C|</strong>!</li>
            </ol>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex flex-col justify-center items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/60 shadow-xs">
            <ThreeSetsSieveSvg size={210} />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold mt-2">
              A középső hármas metszetet a végén +1-szer visszaadjuk!
            </span>
          </div>

          <TheoryCard
            title="A 3 halmazos képlet szerkezete"
            color="purple"
            formula="|A \cup B \cup C| = |A| + |B| + |C| - \sum \text{páros} + |A \cap B \cap C|"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A képletet <strong>logikai szitaformulának</strong> vagy <strong>Sylvester–Poincaré-tételnek</strong> nevezzük.
              </p>
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 font-mono text-[11px]">
                |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Megjegyzés: A szitaformula tetszőleges n darab halmazra is általánosítható az előjelek váltakozásával (+, −, +, − ...).
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: BENTRŐL KIFELÉ STRATÉGIA */}
      <TheorySection
        number={4}
        title="Szöveges Feladatok Megoldása: A „Bentről Kifelé” Módszer"
        icon={<PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Feladatmegoldás"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex flex-col justify-center items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/60 shadow-xs">
            <SurveyVennSvg size={210} />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold mt-2">
              Középen: 6 fő | Csak angol: 12 fő | Csak német: 8 fő | Semelyik: 4 fő
            </span>
          </div>

          <TheoryCard
            title="Miért a legbelső résszel kezdünk?"
            color="teal"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p>
                Ha a szöveges feladatban azt látod, hogy „18 diák tanul angolul”, azt <strong>NEM szabad rögtön beírni</strong> a bal oldali karikába, mert a 18 diák egy része németül is tanul!
              </p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>1. Mindig a <strong>legbelső metszetet</strong> (mindkettő = 6) írjuk be először!</li>
                <li>2. Ezt levonva kapjuk meg a <strong>csak egy</strong> tantárgyat tanulókat (18 − 6 = 12).</li>
                <li>3. Az összes zónát összeadva kapjuk meg az <strong>uniót</strong> (12 + 6 + 8 = 26).</li>
                <li>4. Az alaphalmazból kivonva kapjuk a <strong>külső elemeket</strong> (30 − 26 = 4).</li>
              </ul>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 3: Bentről Kifelé Lépésről Lépésre */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/50 via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-teal-200 dark:border-teal-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div>
              <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Interaktív Labor 3: Venn Kitöltési Stratégia Lépésről Lépésre
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Példa: 30 fős osztály, 18 angolos, 14 németes, 6 mindkettőt tanulja.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map(idx => (
                <button
                  key={idx}
                  onClick={() => setStepIndex(idx)}
                  className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all ${
                    stepIndex === idx
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800">
            <span className="font-bold text-sm text-teal-800 dark:text-teal-200 block mb-1">
              {activeStep.title}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStep.explanation}
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: VIZSGATIPPEK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Szitaformula Buktatók és Vizsgatippek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: Oszthatóság nem relatív prím számoknál"
            trap="Hány 1 és 100 közötti szám osztható 4-gyel és 6-tal is?"
            wrong="4 · 6 = 24, tehát [100 / 24] = 4 szám."
            wrongExplanation="Hatalmas hiba! A 4 és a 6 nem relatív prímek! A közös többszöröseik a legkisebb közös többszörös (lkkt(4, 6) = 12) többszörösei!"
            correct="lkkt(4, 6) = 12, így [100 / 12] = 8 szám van!"
            correctExplanation="Helyes! A 12, 24, 36, 48, 60, 72, 84, 96 számok mind oszthatók 4-gyel is és 6-tal is (összesen 8 darab, nem 4!)."
            tip="Mindig ellenőrizd: ha a két osztó nem relatív prím, lkkt-t kell számolni!"
          />

          <TheoryTrapBox
            title="2. Buktató: A „csak az egyik” és a „legalább az egyik” keverése"
            trap="Ha egy osztályban 15-en sakkoznak és 10-en fociznak, 4-en mindkettőt: hányan űzik CSAK az egyik sportot?"
            wrong="15 + 10 - 4 = 21 diák."
            wrongExplanation="Hiba! A 21 diák a LEGALÁBB EGYET űzők száma (az unió). A „csak az egyiket” űzőkhöz a mindkettőt űzőket ki kell hagyni!"
            correct="Csak sakk: 11, Csak foci: 6 ➔ 11 + 6 = 17 diák"
            correctExplanation="Helyes! (15 - 4) + (10 - 4) = 11 + 6 = 17 diák űz pontosan egy sportot."
            tip="Figyeld a kulcsszót: „legalább egy” = Unió | „pontosan egy” = Szimmetrikus különbség!"
          />

          <TheoryTrapBox
            title="3. Buktató: 3 halmaznál a hármas metszet hozzáadásának elfelejtése"
            trap="|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| ?"
            wrong="Igen, levontuk a páros átfedéseket, így kész vagyunk."
            wrongExplanation="Hiba! A páros metszetek levonásakor a középső részt 3-szor vontuk le, így az teljesen kiesett a számításból!"
            correct="A végén + |A ∩ B ∩ C|-t hozzá KELL adni!"
            correctExplanation="Helyes! A Poincaré-formula záró tagja a hármas metszet visszapótlása."
            tip="Jegyezd meg a ritmust: + egyediek − párosak + hármas!"
          />

          <TheoryTrapBox
            title="4. Buktató: A negatív létszám eredmény a hibás adatokból"
            trap="Lehet-e |A ∩ B| nagyobb, mint |A| vagy |B|?"
            wrong="Igen, ha a két halmaz összege nagy."
            wrongExplanation="Logikai képtelenség! A közös rész nem tartalmazhat több elemet, mint maguk a kiinduló halmazok!"
            correct="|A ∩ B| ≤ min(|A|, |B|)"
            correctExplanation="Helyes! A metszet mindkét halmaznak részhalmaza, így elemszáma legfeljebb a kisebb halmaz elemszáma lehet."
            tip="Ha a számolásod során negatív létszám vagy túl nagy metszet jön ki, ellenőrizd az adataidat!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SieveTheory;
