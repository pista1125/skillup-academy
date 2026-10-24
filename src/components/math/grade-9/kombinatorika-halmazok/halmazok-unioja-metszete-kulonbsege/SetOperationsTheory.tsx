import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  GitMerge,
  Layers,
  Sparkles,
  AlertTriangle,
  Split,
  ToggleLeft,
  CircleDot,
  Boxes,
  HelpCircle,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import {
  IntersectionVennSvg,
  UnionVennSvg,
  DifferenceVennSvg,
  ComplementVennSvg,
  DisjointVennSvg,
  DeMorganUnionVennSvg,
  ThreeSetsVennSvg,
  SubsetOperationsVennSvg
} from './SetOperationsFigures';

interface SetOperationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SetOperationsTheory: React.FC<SetOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR 1: Két Halmaz Művelet Szimulátor ---
  const universeU = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const setA = [1, 2, 3, 4, 5, 6];
  const setB = [4, 5, 6, 7, 8, 9];

  type OperationType = 'intersection' | 'union' | 'diffAB' | 'diffBA' | 'compA' | 'compB';
  const [selectedOp, setSelectedOp] = useState<OperationType>('intersection');

  const operationResult = useMemo(() => {
    switch (selectedOp) {
      case 'intersection':
        return {
          title: 'A ∩ B (Metszet)',
          formula: 'A ∩ B = { x | x ∈ A és x ∈ B }',
          elements: setA.filter(x => setB.includes(x)),
          description: 'A mindkét halmazban KÖZÖSEN szereplő elemek halmaza.'
        };
      case 'union':
        return {
          title: 'A ∪ B (Unió)',
          formula: 'A ∪ B = { x | x ∈ A vagy x ∈ B }',
          elements: Array.from(new Set([...setA, ...setB])).sort((a, b) => a - b),
          description: 'Az összes olyan elem, amely a két halmaz legalább egyikében benne van.'
        };
      case 'diffAB':
        return {
          title: 'A \\ B (A és B különbsége)',
          formula: 'A \\ B = { x | x ∈ A és x ∉ B }',
          elements: setA.filter(x => !setB.includes(x)),
          description: 'Az A halmaz azon elemei, amelyek a B halmazban NINCSENEK benne.'
        };
      case 'diffBA':
        return {
          title: 'B \\ A (B és A különbsége)',
          formula: 'B \\ A = { x | x ∈ B és x ∉ A }',
          elements: setB.filter(x => !setA.includes(x)),
          description: 'A B halmaz azon elemei, amelyek az A halmazban NINCSENEK benne.'
        };
      case 'compA':
        return {
          title: 'Ā = U \\ A (A komplementere)',
          formula: 'Ā = { x ∈ U | x ∉ A }',
          elements: universeU.filter(x => !setA.includes(x)),
          description: 'Az U alaphalmaz összes eleme, amely NEM tartozik bele A-ba.'
        };
      case 'compB':
        return {
          title: 'B̄ = U \\ B (B komplementere)',
          formula: 'B̄ = { x ∈ U | x ∉ B }',
          elements: universeU.filter(x => !setB.includes(x)),
          description: 'Az U alaphalmaz összes eleme, amely NEM tartozik bele B-be.'
        };
    }
  }, [selectedOp]);

  // --- INTERAKTÍV LABOR 2: De Morgan Verifikátor ---
  const unionAB = useMemo(() => Array.from(new Set([...setA, ...setB])), [setA, setB]);
  const compUnionAB = useMemo(() => universeU.filter(x => !unionAB.includes(x)), [universeU, unionAB]);
  const compA = useMemo(() => universeU.filter(x => !setA.includes(x)), [universeU, setA]);
  const compB = useMemo(() => universeU.filter(x => !setB.includes(x)), [universeU, setB]);
  const interCompACompB = useMemo(() => compA.filter(x => compB.includes(x)), [compA, compB]);

  // --- INTERAKTÍV LABOR 3: 3 Halmazos Régiók ---
  const set3A = [1, 2, 4, 5];
  const set3B = [2, 3, 5, 6];
  const set3C = [4, 5, 6, 7];
  const [threeSetOp, setThreeSetOp] = useState<'all3' | 'onlyA' | 'unionABC' | 'interABminusC'>('all3');

  const threeSetResult = useMemo(() => {
    switch (threeSetOp) {
      case 'all3':
        return {
          name: 'A ∩ B ∩ C (Hármas metszet)',
          elements: set3A.filter(x => set3B.includes(x) && set3C.includes(x)),
          note: 'Mindhárom halmaz közös elemei.'
        };
      case 'onlyA':
        return {
          name: 'A \\ (B ∪ C) (Csak az A-ban)',
          elements: set3A.filter(x => !set3B.includes(x) && !set3C.includes(x)),
          note: 'Kizárólag A elemei, se B-ben, se C-ben nincsenek benne.'
        };
      case 'interABminusC':
        return {
          name: '(A ∩ B) \\ C (A és B közös, de C nem)',
          elements: set3A.filter(x => set3B.includes(x) && !set3C.includes(x)),
          note: 'A és B metszete C elemei nélkül.'
        };
      case 'unionABC':
        return {
          name: 'A ∪ B ∪ C (Hármas unió)',
          elements: Array.from(new Set([...set3A, ...set3B, ...set3C])).sort((a, b) => a - b),
          note: 'Minden elem, ami a 3 halmaz legalább egyikében benne van.'
        };
    }
  }, [threeSetOp]);

  return (
    <TheoryTemplate
      title="Halmazok Uniója, Metszete és Különbsége"
      subtitle="9. Osztály • I. Kombinatorika és halmazok • 7. Altéma"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • ⋂ HALMAZMŰVELETEK"
      documentId="set-operations-theory"
      pdfFilename="9_osztaly_halmazok_unioja_metszete_kulonbsege.pdf"
      themeColor="indigo"
      quickRule={{
        label: 'A 4 Fő Halmazművelet Gyorsszabálya',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                Metszet (∩):
              </span>
              <span className="font-mono text-emerald-900 dark:text-emerald-200">
                A ∩ B = {`{ x | x ∈ A és x ∈ B }`}
              </span>
              <span className="text-[11px] text-slate-500">(Közös elemek)</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-[11px]">
                Unió (∪):
              </span>
              <span className="font-mono text-teal-900 dark:text-teal-200">
                A ∪ B = {`{ x | x ∈ A vagy x ∈ B }`}
              </span>
              <span className="text-[11px] text-slate-500">(Egyesítés)</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-[11px]">
                Különbség (\):
              </span>
              <span className="font-mono text-indigo-900 dark:text-indigo-200">
                A \ B = {`{ x | x ∈ A és x ∉ B }`}
              </span>
              <span className="text-[11px] text-slate-500">(A-ból kivonva B)</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                Komplementer (Ā):
              </span>
              <span className="font-mono text-amber-900 dark:text-amber-200">
                Ā = U \ A
              </span>
              <span className="text-[11px] text-slate-500">(Alaphalmazbeli kiegészítés)</span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      practiceTitle="Készen állsz a halmazműveleti tudáspróbára?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és mind a 3 játékmódban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: METSZET ÉS UNIÓ */}
      <TheorySection
        number={1}
        title="Halmazok Metszete (A ∩ B) és Uniója (A ∪ B)"
        icon={<GitMerge className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Alapműveletek"
        badgeColor="indigo"
      >
        <TheoryCallout
          title="A halmazműveletek és a köznapi logika kapcsolata"
          type="info"
        >
          <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
            <p>
              A halmazműveletek szorosan összekapcsolódnak a matematikai logikával:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
              <li>
                <strong>A metszet (∩)</strong> az <strong>„ÉS”</strong> logikai műveletnek felel meg (mindkettőben egyszerre benne kell lennie).
              </li>
              <li>
                <strong>Az unió (∪)</strong> a <strong>„VAGY”</strong> műveletnek felel meg (megengedő értelemben: legalább az egyikben benne van, akár mindkettőben is).
              </li>
            </ul>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Metszet (A ∩ B) és Diszjunkt Halmazok"
            color="emerald"
            formula="A \\cap B = \\{ x \\mid x \\in A \\text{ és } x \\in B \\}"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <IntersectionVennSvg size={170} className="mx-auto" />
              <p>
                Az A és B halmaz <strong>metszete</strong> azon elemek halmaza, amelyek <strong>A-nak is ÉS B-nek is elemei</strong>.
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                <strong>Diszjunkt halmazok:</strong> Ha A-nak és B-nek egyetlen közös eleme sincs, akkor metszetük az üres halmaz: <strong>A ∩ B = ∅</strong>. (Például a páros és páratlan számok halmaza diszjunkt.)
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Unió (A ∪ B)"
            color="teal"
            formula="A \\cup B = \\{ x \\mid x \\in A \\text{ vagy } x \\in B \\}"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <UnionVennSvg size={170} className="mx-auto" />
              <p>
                Az A és B halmaz <strong>uniója (egyesítése)</strong> azon elemek halmaza, amelyek <strong>legalább az egyik halmaznak elemei</strong> (vagy A-nak, vagy B-nek, vagy mindkettőnek).
              </p>
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs">
                <strong>Elemszám összefüggés:</strong> Mivel a közös elemeket mindkét halmaz tartalmazza, az unió elemszáma: <strong>|A ∪ B| = |A| + |B| − |A ∩ B|</strong>!
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 1: Két Halmaz Művelet Szimulátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 1: Halmazműveleti Szimulátor
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {`U = {1..10}, A = {1, 2, 3, 4, 5, 6}, B = {4, 5, 6, 7, 8, 9}`}
                </p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-xs font-mono font-bold">
              Eredmény elemszáma: {operationResult.elements.length} db
            </div>
          </div>

          {/* Műveletválasztó gombok */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'intersection', label: 'A ∩ B (Metszet)' },
              { id: 'union', label: 'A ∪ B (Unió)' },
              { id: 'diffAB', label: 'A \\ B (Különbség)' },
              { id: 'diffBA', label: 'B \\ A (Különbség)' },
              { id: 'compA', label: 'Ā (A komplementere)' },
              { id: 'compB', label: 'B̄ (B komplementere)' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setSelectedOp(btn.id as OperationType)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedOp === btn.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Eredmény vizualizáció doboz */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="font-mono font-black text-sm text-indigo-700 dark:text-indigo-300">
                {operationResult.title}
              </span>
              <span className="text-xs text-slate-500 italic">
                {operationResult.description}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                Eredményhalmaz elemei:
              </span>
              <div className="flex flex-wrap gap-2">
                {operationResult.elements.length === 0 ? (
                  <span className="text-xs font-bold text-slate-400">∅ (üres halmaz)</span>
                ) : (
                  operationResult.elements.map(num => (
                    <span
                      key={num}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm shadow-xs animate-in zoom-in-75 duration-200"
                    >
                      {num}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              {operationResult.formula}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: KÜLÖNBSÉG ÉS KOMPLEMENTER */}
      <TheorySection
        number={2}
        title="Halmazok Különbsége (A \ B) és a Komplementer Halmaz (Ā)"
        icon={<Split className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Különbség & Tagadás"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Halmazok Különbsége (A \ B)"
            color="purple"
            formula="A \\setminus B = \\{ x \\mid x \\in A \\text{ és } x \\notin B \\}"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <DifferenceVennSvg size={170} className="mx-auto" />
              <p>
                Az A és B halmaz <strong>különbsége (A \ B)</strong> azon elemek halmaza, amelyek <strong>A-nak elemei, de B-nek NEM elemei</strong> (vagyis az A halmazból elhagyjuk a B-beli elemeket).
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs">
                <strong>NEM felcserélhető (nem kommutatív):</strong> Általában <strong>A \ B ≠ B \ A</strong>! Például ha {`A = {1, 2, 3}`} és {`B = {2, 3, 4}`}, akkor {`A \\ B = {1}`}, míg {`B \\ A = {4}`}.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Komplementer Halmaz (Ā = U \ A)"
            color="amber"
            formula="\\overline{A} = \\{ x \\in U \\mid x \\notin A \\}"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <ComplementVennSvg size={170} className="mx-auto" />
              <p>
                Ha rögzítettünk egy <strong>U alaphalmazt</strong>, akkor az A halmaz <strong>komplementere (kiegészítő halmaza, jele: Ā vagy A')</strong> az alaphalmaz azon elemeinek összessége, amelyek <strong>nem tartoznak bele A-ba</strong>.
              </p>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                <li>• <strong>A ∪ Ā = U</strong> (egy halmaz és a komplementere kiadja a teljes univerzumot).</li>
                <li>• <strong>A ∩ Ā = ∅</strong> (egy halmaz és komplementere mindig diszjunkt).</li>
                <li>• <strong>Ā̄ = A</strong> (a komplementer komplementere maga az eredeti halmaz).</li>
              </ul>
            </div>
          </TheoryCard>
        </div>

        {/* Speciális eset: Tartalmazási relációk hatása a műveletekre */}
        <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 my-4 flex flex-col sm:flex-row items-center gap-4">
          <SubsetOperationsVennSvg size={180} className="shrink-0" />
          <div className="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <h5 className="font-black text-teal-900 dark:text-teal-200 text-sm">
              Mi történik, ha az egyik halmaz részhalmaza a másiknak (A ⊆ B)?
            </h5>
            <p>
              Ilyenkor a műveletek leegyszerűsödnek:
            </p>
            <ul className="space-y-1 font-mono text-xs">
              <li>• <strong>A ∩ B = A</strong> (a metszet maga a szűkebb halmaz).</li>
              <li>• <strong>A ∪ B = B</strong> (az unió maga a tágabb halmaz).</li>
              <li>• <strong>A \ B = ∅</strong> (a szűkebb halmazból a tágabbat levonva semmi sem marad!).</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: MŰVELETI AZONOSSÁGOK ÉS DE MORGAN */}
      <TheorySection
        number={3}
        title="Műveleti Azonosságok és a De Morgan Szabályok"
        icon={<Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badge="Azonosságok"
        badgeColor="cyan"
      >
        <TheoryCallout
          title="A halmazműveletek algebrai törvényei"
          type="tip"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <strong className="block text-cyan-800 dark:text-cyan-300 mb-1">1. Kommutativitás (Felcserélhetőség):</strong>
              <div>A ∪ B = B ∪ A</div>
              <div>A ∩ B = B ∩ A</div>
              <span className="text-[10px] text-rose-500 font-bold block mt-1">(A \ B ≠ B \ A!)</span>
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <strong className="block text-cyan-800 dark:text-cyan-300 mb-1">2. Asszociativitás (Csoportosíthatóság):</strong>
              <div>(A ∪ B) ∪ C = A ∪ (B ∪ C)</div>
              <div>(A ∩ B) ∩ C = A ∩ (B ∩ C)</div>
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <strong className="block text-cyan-800 dark:text-cyan-300 mb-1">3. Disztributivitás (Széttagolhatóság):</strong>
              <div>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</div>
              <div>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</div>
            </div>
          </div>
        </TheoryCallout>

        {/* De Morgan bemutatás kártya */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="A De Morgan azonosságok"
            color="purple"
            formula="\overline{A \cup B} = \overline{A} \cap \overline{B} \quad | \quad \overline{A \cap B} = \overline{A} \cup \overline{B}"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <DeMorganUnionVennSvg size={170} className="mx-auto" />
              <p>
                Augustus De Morgan (1806–1871) törvényei kimondják, hogy a komplementerképzés „megfordítja” az uniót és a metszetet:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <li>• <strong>(A ∪ B) komplementere:</strong> Ā ∩ B̄ (nem eleme A-nak ÉS nem eleme B-nek).</li>
                <li>• <strong>(A ∩ B) komplementere:</strong> Ā ∪ B̄ (legalább az egyiknek nem eleme).</li>
              </ul>
            </div>
          </TheoryCard>

          {/* INTERAKTÍV LABOR 2: De Morgan Verifikátor */}
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex flex-col justify-between">
            <div>
              <span className="p-1.5 rounded-lg bg-purple-600 text-white inline-block mb-2 text-xs font-bold">
                Interaktív Labor 2: De Morgan Verifikáció
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Nézzük meg, hogy az {`A = {1, 2, 3, 4, 5, 6}`} és {`B = {4, 5, 6, 7, 8, 9}`} halmazokra a két oldal pontosan egyenlő-e az {`U = {1..10}`} alaphalmazon!
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-900">
                  <span className="text-purple-700 dark:text-purple-300 font-bold block">Bal oldal: (A ∪ B) komplementere</span>
                  <div className="text-[11px] text-slate-500">A ∪ B = {`{1, 2, 3, 4, 5, 6, 7, 8, 9}`}</div>
                  <div className="text-sm font-bold text-emerald-600">Ā ∪ B = {`{ ${compUnionAB.join(', ')} }`}</div>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-900">
                  <span className="text-purple-700 dark:text-purple-300 font-bold block">Jobb oldal: Ā ∩ B̄ (metszet)</span>
                  <div className="text-[11px] text-slate-500">Ā = {`{7, 8, 9, 10}`},  B̄ = {`{1, 2, 3, 10}`}</div>
                  <div className="text-sm font-bold text-emerald-600">Ā ∩ B̄ = {`{ ${interCompACompB.join(', ')} }`}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-center font-bold text-xs text-emerald-900 dark:text-emerald-200">
              ✓ Mindkét oldal eredménye pontosan a(z) {`{ ${compUnionAB.join(', ')} }`} halmaz!
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: 3 HALMAZOS VENN-DIAGRAMOK */}
      <TheorySection
        number={4}
        title="3 Halmazos Venn-Diagramok és a 8 Síkrész"
        icon={<Boxes className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="3 Halmazos Venn"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex flex-col justify-center items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/60 shadow-xs">
            <ThreeSetsVennSvg size={210} highlightCenter={true} />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold mt-2">
              Középen: A ∩ B ∩ C (Mindhárom halmaz közös elemei)
            </span>
          </div>

          <TheoryCard
            title="A sík 8 diszjunkt tartományra oszlása"
            color="teal"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>
                Három egymást metsző halmaz (A, B, C) egy alaphalmazon belül <strong>pontosan 8 diszjunkt régiót</strong> határoz meg:
              </p>
              <ul className="space-y-1 font-mono text-[11px]">
                <li>1. Csak A elemei: A \ (B ∪ C)</li>
                <li>2. Csak B elemei: B \ (A ∪ C)</li>
                <li>3. Csak C elemei: C \ (A ∪ B)</li>
                <li>4. Csak A és B közös (C nem): (A ∩ B) \ C</li>
                <li>5. Csak A és C közös (B nem): (A ∩ C) \ B</li>
                <li>6. Csak B és C közös (A nem): (B ∩ C) \ A</li>
                <li>7. Mindhárom közös: A ∩ B ∩ C</li>
                <li>8. Egyikbe sem tartozók az univerzumban: U \ (A ∪ B ∪ C)</li>
              </ul>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 3: 3 Halmazos Zóna Detektor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/50 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-teal-200 dark:border-teal-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
                <Boxes className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 3: 3 Halmazos Zóna és Régió Kalkulátor
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {`A = {1, 2, 4, 5}, B = {2, 3, 5, 6}, C = {4, 5, 6, 7}`}
                </p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs font-mono font-bold">
              Kiválasztott elemszám: {threeSetResult.elements.length} db
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'all3', label: 'A ∩ B ∩ C' },
              { id: 'onlyA', label: 'Csak A: A \\ (B ∪ C)' },
              { id: 'interABminusC', label: '(A ∩ B) \\ C' },
              { id: 'unionABC', label: 'A ∪ B ∪ C' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setThreeSetOp(btn.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  threeSetOp === btn.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-300 block mb-1">
              {threeSetResult.name} — {threeSetResult.note}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {threeSetResult.elements.length === 0 ? (
                <span className="text-xs font-bold text-slate-400">∅ (nincs ilyen elem)</span>
              ) : (
                threeSetResult.elements.map(num => (
                  <span
                    key={num}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white font-mono font-bold text-sm shadow-xs"
                  >
                    {num}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS CSAPDÁK ÉS VIZSGATIPPEK */}
      <TheorySection
        number={5}
        title="Tipikus Halmazműveleti Buktatók és Vizsgatippek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: A különbség felcserélhetőségének feltételezése"
            trap="Igaz-e, hogy A \ B = B \ A minden halmazra?"
            wrong="Igen, a kivonás műveletéhez hasonlóan ugyanazt kapjuk."
            wrongExplanation="Óriási hiba! Az A \ B az A-beli elemekből hagyja el a B-beli elemeket, míg a B \ A a B-ből hagyja el az A-belieket! Ezek egymással teljesen diszjunktak, kivéve ha A = B = ∅."
            correct="A \ B ≠ B \ A (nem kommutatív)"
            correctExplanation="Helyes! Például ha A = {1, 2} és B = {2, 3}, akkor A \ B = {1}, míg B \ A = {3}!"
            tip="Csak a metszet (∩) és az unió (∪) felcserélhető, a különbség (\) SOHA!"
          />

          <TheoryTrapBox
            title="2. Buktató: Az unió elemszámának egyszerű összeadása"
            trap="Ha |A| = 10 és |B| = 8, mennyi |A ∪ B|?"
            wrong="|A ∪ B| = 10 + 8 = 18."
            wrongExplanation="Hiba! Ez csak akkor igaz, ha A és B DISZJUNKT halmazok (A ∩ B = ∅). Ha vannak közös elemeik, azokat kétszer számolnánk!"
            correct="|A ∪ B| = |A| + |B| - |A ∩ B|"
            correctExplanation="Helyes! A közös elemeket (metszetet) egyszer le kell vonni az összegből."
            tip="Ha |A ∩ B| = 3, akkor |A ∪ B| = 10 + 8 - 3 = 15!"
          />

          <TheoryTrapBox
            title="3. Buktató: De Morgan azonosság hibás zárójelezése"
            trap="Mivel egyenlő az (A ∪ B) komplementere?"
            wrong="Ā ∪ B̄ (a komplementert csak rátesszük a halmazokra)."
            wrongExplanation="Hiba! A De Morgan szabály szerint a komplementer az uniót METSZETRE fordítja át: (A ∪ B)' = Ā ∩ B̄!"
            correct="(A ∪ B) komplementere = Ā ∩ B̄"
            correctExplanation="Helyes! Valami akkor nincs benne az unióban, ha A-ban sincs benne ÉS B-ben sincs benne."
            tip="Szabály: Komplementer képzéskor Unióból Metszet lesz, Metszetből Unió lesz!"
          />

          <TheoryTrapBox
            title="4. Buktató: A „vagy” szó értelmezése a halmazelméletben"
            trap="Ha x ∈ A ∪ B, akkor x lehet-e egyszerre eleme A-nak és B-nek is?"
            wrong="Nem, a „vagy” azt jelenti, hogy vagy az egyik, vagy a másik (kizáró vagy)."
            wrongExplanation="Hiba a hétköznapi nyelv és a matematika összekeveréséből! A matematikában a „vagy” MEGENGEDŐ vagy (vel, ∨): elegendő, ha legalább az egyik feltétel teljesül, de mindkettő is teljesülhet!"
            correct="Igen, a metszet elemei is az unió részei: (A ∩ B) ⊆ (A ∪ B)"
            correctExplanation="Helyes! Az unió azokat az elemeket is tartalmazza, amelyek mindkét halmazban benne vannak."
            tip="A matematikai unióban a közös elemek benne vannak, egyszeri számlálással!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SetOperationsTheory;
