import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  CircleDot,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Binary,
  Sliders,
  Boxes,
  Variable,
  Filter
} from 'lucide-react';
import {
  NumberSetsVennSvg,
  SubsetVennSvg,
  ElementBelongingSvg,
  EmptySetSvg,
  PowerSetTreeSvg
} from './SetsFigures';

interface SetsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SetsTheory: React.FC<SetsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR 1: Halmazépítő & Szűrő Állapotok ---
  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [filterType, setFilterType] = useState<'all' | 'even' | 'odd' | 'prime' | 'div3' | 'square'>('prime');

  const filteredSet = useMemo(() => {
    switch (filterType) {
      case 'even':
        return allNumbers.filter(n => n % 2 === 0);
      case 'odd':
        return allNumbers.filter(n => n % 2 !== 0);
      case 'prime':
        return allNumbers.filter(n => [2, 3, 5, 7, 11].includes(n));
      case 'div3':
        return allNumbers.filter(n => n % 3 === 0);
      case 'square':
        return allNumbers.filter(n => [1, 4, 9].includes(n));
      default:
        return allNumbers;
    }
  }, [filterType]);

  const outsideSet = useMemo(() => {
    return allNumbers.filter(n => !filteredSet.includes(n));
  }, [filteredSet]);

  // --- INTERAKTÍV LABOR 2: Számhalmaz Detektor ---
  const sampleNumbers = [
    { label: '5', value: 5, sets: ['ℕ', 'ℤ', 'ℚ', 'ℝ'], note: 'Pozitív egész, természetes szám' },
    { label: '-8', value: -8, sets: ['ℤ', 'ℚ', 'ℝ'], note: 'Negatív egész (nem természetes)' },
    { label: '0', value: 0, sets: ['ℕ', 'ℤ', 'ℚ', 'ℝ'], note: 'Természetes szám és egész szám' },
    { label: '3/4', value: 0.75, sets: ['ℚ', 'ℝ'], note: 'Két egész hányadosa, racionális szám' },
    { label: '-2,5', value: -2.5, sets: ['ℚ', 'ℝ'], note: 'Véges tizedestört (-5/2)' },
    { label: '√2', value: 1.414, sets: ['ℚ*', 'ℝ'], note: 'Nem írható fel törtként, irracionális' },
    { label: 'π (pi)', value: 3.1415, sets: ['ℚ*', 'ℝ'], note: 'Transzcendens, irracionális szám' },
    { label: '√9 (=3)', value: 3, sets: ['ℕ', 'ℤ', 'ℚ', 'ℝ'], note: 'Becsapós: √9 pontosan 3, tehát ℕ-be tartozik!' }
  ];
  const [selectedNumIndex, setSelectedNumIndex] = useState<number>(0);
  const activeSample = sampleNumbers[selectedNumIndex];

  // --- INTERAKTÍV LABOR 3: Hatványhalmaz & Részhalmazok ---
  const [nElements, setNElements] = useState<number>(3);
  const baseElementLabels = ['a', 'b', 'c', 'd'];
  const currentBaseSet = baseElementLabels.slice(0, nElements);

  // Részhalmazok generálása bitmaszkkal
  const generatedSubsets = useMemo(() => {
    const total = Math.pow(2, nElements);
    const result: string[] = [];
    for (let mask = 0; mask < total; mask++) {
      const subset: string[] = [];
      for (let i = 0; i < nElements; i++) {
        if ((mask & (1 << i)) !== 0) {
          subset.push(currentBaseSet[i]);
        }
      }
      if (subset.length === 0) {
        result.push('∅ (üres halmaz)');
      } else {
        result.push(`{ ${subset.join(', ')} }`);
      }
    }
    return result;
  }, [nElements]);

  return (
    <TheoryTemplate
      title="A Halmaz Fogalma, Megadása és Részhalmazai"
      subtitle="9. Osztály • I. Kombinatorika és halmazok • 6. Altéma"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • ⭕ HALMAZOK"
      documentId="sets-concept-theory"
      pdfFilename="9_osztaly_halmazok_fogalma_reszhalmazok.pdf"
      themeColor="teal"
      quickRule={{
        label: 'A Halmazelmélet Legfontosabb Alaptételei',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-[11px]">
                Részhalmazok száma:
              </span>
              <span className="font-mono font-bold text-teal-900 dark:text-teal-200">
                2ⁿ darab (hatványhalmaz)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                | Valódi részhalmazok: 2ⁿ − 1
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-[11px]">
                Számhalmazok:
              </span>
              <span className="font-mono font-bold text-indigo-900 dark:text-indigo-200">
                ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                (és ℚ* irracionális számok)
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      practiceTitle="Készen állsz a halmazelméleti tudáspróbára?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és mind a 3 játékmódban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A HALMAZ FOGALMA ÉS JELÖLÉSE */}
      <TheorySection
        number={1}
        title="A Halmaz Fogalma, Jelölése és Megadási Módjai"
        icon={<CircleDot className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Halmaz Alapok"
        badgeColor="teal"
      >
        <TheoryCallout
          title="Mi a halmaz a modern matematikában?"
          type="info"
        >
          <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
            <p>
              A halmaz a matematika egyik legfontosabb <strong>alapfogalma</strong> (nem vezetjük vissza más fogalmakra).
              Olyan dolgok (számok, személyek, geometriai alakzatok) összessége, amelyekről <strong>egyértelműen és kétséget kizáróan eldönthető</strong>, hogy beletartoznak-e a halmazba vagy sem.
            </p>
            <p className="font-bold text-teal-900 dark:text-teal-200">
              Például: „A 10-nél kisebb prímszámok” halmazt alkotnak ({`{2, 3, 5, 7}`}), de a „Szép virágok” NEM halmaz, mert a szépség szubjektív!
            </p>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Eleme és Nem Eleme reláció"
            color="emerald"
            formula="x \in A \quad | \quad y \notin A"
          >
            <div className="flex flex-col items-center sm:items-start gap-2">
              <ElementBelongingSvg size={160} className="mx-auto" />
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 mt-2">
                <li>• <strong>x ∈ A:</strong> „x eleme az A halmaznak” (benne van a halmazban).</li>
                <li>• <strong>y ∉ A:</strong> „y nem eleme az A halmaznak” (kívül esik rajta).</li>
                <li>• <strong>|A| (elemszám):</strong> A halmazban lévő különböző elemek száma (kardinalitás).</li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. A halmaz 2 megadási módja"
            color="teal"
            formula="A = \\{1, 2, 3\\} \\quad \\text{vagy} \\quad A = \\{x \\in \\mathbb{N} \\mid x \\le 3\\}"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <strong className="text-teal-900 dark:text-teal-200 block mb-1">A) Elemek felsorolásával:</strong>
                Kapcsos zárójelben vesszővel elválasztva soroljuk fel az elemeket: {`A = {2, 4, 6, 8}`}.
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <strong className="text-indigo-900 dark:text-indigo-200 block mb-1">B) Közös tulajdonság megadásával:</strong>
                Megadjuk az alaphalmazt és a szűrőfeltételt: {`B = {x ∈ ℕ | x páros és x < 10}`}.
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Fontos: a halmazban az elemek <strong>sorrendje közömbös</strong> ({`{1, 2} = {2, 1}`}), és minden elem <strong>csak egyszer</strong> számít ({`{1, 1, 2} = {1, 2}`})!
              </p>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 1: Halmazépítő & Szűrő */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-teal-200 dark:border-teal-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
                <Filter className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 1: Halmazépítő és Tulajdonság Szűrő
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Válassz ki egy tulajdonságot az {`U = {1, 2, ..., 12}`} alaphalmazra!
                </p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs font-mono font-bold">
              Elemszám |A| = {filteredSet.length} db
            </div>
          </div>

          {/* Szűrő gombok */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'prime', label: 'Prímszámok' },
              { id: 'even', label: 'Páros számok' },
              { id: 'odd', label: 'Páratlan számok' },
              { id: 'div3', label: '3-mal oszthatóak' },
              { id: 'square', label: 'Négyzetszámok' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === f.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Vizualizáció: A halmaz doboza vs kívül rekedtek */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-teal-100/60 dark:bg-teal-950/40 border-2 border-teal-300 dark:border-teal-800 text-left">
              <span className="text-xs font-black text-teal-900 dark:text-teal-200 block mb-2">
                A Halmaz Belseje (x ∈ A):
              </span>
              <div className="flex flex-wrap gap-2">
                {filteredSet.map(num => (
                  <span
                    key={num}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white font-mono font-bold text-sm shadow-xs animate-in zoom-in-75 duration-200"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                Halmazon Kívül (y ∉ A):
              </span>
              <div className="flex flex-wrap gap-2">
                {outsideSet.map(num => (
                  <span
                    key={num}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: NEVEZETES SZÁMHALMAZOK HIERARCHIÁJA */}
      <TheorySection
        number={2}
        title="Nevezetes Számhalmazok és Egymásba Ágyazásuk"
        icon={<Variable className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badge="Számhalmazok"
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex flex-col justify-center items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-100 dark:border-cyan-900/60 shadow-xs">
            <NumberSetsVennSvg size={230} />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold mt-2">
              ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ  és  ℚ* ⊂ ℝ
            </span>
          </div>

          <TheoryCard
            title="A nevezetes számhalmazok definíciói"
            color="cyan"
          >
            <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong className="text-purple-600 dark:text-purple-400">ℕ (Természetes számok):</strong> 0, 1, 2, 3, ... (tárgyak számlálására használt nemnegatív egészek).
              </li>
              <li>
                <strong className="text-indigo-600 dark:text-indigo-400">ℤ (Egész számok):</strong> ... -3, -2, -1, 0, 1, 2, 3 ... (a természetes számok és ellentettjeik).
              </li>
              <li>
                <strong className="text-cyan-600 dark:text-cyan-400">ℚ (Racionális számok):</strong> Felírhatók két egész szám hányadosaként (a/b alakban, b ≠ 0). Véges vagy végtelen szakaszos tizedestörtek (pl. 3/4 = 0,75; 1/3 = 0,333...).
              </li>
              <li>
                <strong className="text-amber-600 dark:text-amber-400">ℚ* (Irracionális számok):</strong> Nem írhatók fel két egész hányadosaként! Végtelen nem szakaszos tizedestörtek (pl. √2, √3, π, e).
              </li>
              <li>
                <strong className="text-teal-600 dark:text-teal-400">ℝ (Valós számok):</strong> A számegyenes összes pontja: ℝ = ℚ ∪ ℚ*.
              </li>
            </ul>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 2: Számhalmaz Klasszifikátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-cyan-200 dark:border-cyan-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-600 text-white shadow-xs">
                <Variable className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 2: Számhalmaz Detektor és Besoroló
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kattints egy mintaszámra és nézd meg, mely számhalmazoknak eleme!
                </p>
              </div>
            </div>
          </div>

          {/* Választható számok */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sampleNumbers.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => setSelectedNumIndex(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  selectedNumIndex === idx
                    ? 'bg-cyan-600 text-white shadow-xs ring-2 ring-cyan-400'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Részletes státusz és halmazcsíkok */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-cyan-200 dark:border-cyan-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">
                Kiválasztott szám: <strong className="text-cyan-600 dark:text-cyan-400 text-base">{activeSample.label}</strong>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                {activeSample.note}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-center font-mono">
              {['ℕ', 'ℤ', 'ℚ', 'ℚ*', 'ℝ'].map(setName => {
                const isMember = activeSample.sets.includes(setName);
                return (
                  <div
                    key={setName}
                    className={`p-2 rounded-lg border font-bold text-xs transition-all ${
                      isMember
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="text-sm font-black">{setName}</div>
                    <div className="text-[10px] mt-0.5">{isMember ? 'ELEME (∈)' : 'NEM (∉)'}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: RÉSZHALMAZ ÉS VALÓDI RÉSZHALMAZ */}
      <TheorySection
        number={3}
        title="Részhalmaz, Valódi Részhalmaz és Halmazok Egyenlősége"
        icon={<Boxes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Részhalmazok"
        badgeColor="indigo"
      >
        <TheoryCallout
          title="A részhalmaz pontos matematikai definíciója"
          type="tip"
        >
          <div className="space-y-1.5 text-xs sm:text-sm">
            <p>
              Akkor mondjuk, hogy az <strong>A halmaz részhalmaza a B halmaznak</strong> (jelölése: <strong>A ⊆ B</strong>), ha az A halmaz <strong>minden eleme</strong> eleme a B halmaznak is.
            </p>
            <div className="p-2 rounded-lg bg-indigo-100/60 dark:bg-indigo-950/60 font-mono font-bold text-center text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm">
              A ⊆ B  ⟺  (ha x ∈ A, akkor x ∈ B)
            </div>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Valódi részhalmaz (A ⊂ B)"
            color="indigo"
            formula="A \subset B \iff A \subseteq B \text{ és } A \neq B"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <SubsetVennSvg size={160} highlightProper={true} className="mx-auto" />
              <p>
                Az A halmaz <strong>valódi részhalmaza</strong> a B-nek, ha A részhalmaza B-nek, de <strong>nem egyenlő vele</strong> (vagyis B tartalmaz legalább egy olyan elemet, ami A-ban nincs benne).
              </p>
              <div className="p-2 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-xs">
                Példa: {`{1, 2} ⊂ {1, 2, 3}`} valódi részhalmaz, de {`{1, 2} ⊂ {1, 2}`} NEM valódi!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Halmazok Egyenlősége (A = B)"
            color="purple"
            formula="A = B \iff A \subseteq B \text{ és } B \subseteq A"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Két halmaz akkor és csak akkor egyenlő, ha <strong>pontosan ugyanazokból az elemekből állnak</strong>.
              </p>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>• Kölcsönösen egymás részhalmazai: A ⊆ B és B ⊆ A.</li>
                <li>• Elemek ismétlődése nem számít: {`{3, 3, 5} = {3, 5}`}.</li>
                <li>• Elemek sorrendje nem számít: {`{a, b, c} = {c, b, a}`}.</li>
              </ul>
              <div className="p-2 rounded-md bg-purple-50 dark:bg-purple-950/40 text-xs font-bold text-purple-900 dark:text-purple-200">
                Minden halmaz részhalmaza önmagának: A ⊆ A (de nem valódi részhalmaza)!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: AZ ÜRES HALMAZ ÉS A 2^n RÉSZHALMAZ TÉTELE */}
      <TheorySection
        number={4}
        title="Az Üres Halmaz (∅) és a 2ⁿ Részhalmaz Tétele"
        icon={<Binary className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Hatványhalmaz"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Az Üres Halmaz (∅ vagy { }) tulajdonságai"
            color="purple"
            formula="|\emptyset| = 0 \quad | \quad \emptyset \subseteq A"
          >
            <EmptySetSvg size={160} className="mx-auto" />
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 mt-2">
              <li>• <strong>Nincs egyetlen eleme sem:</strong> |∅| = 0.</li>
              <li>• <strong>Minden halmaznak részhalmaza:</strong> Bármilyen A halmaz esetén <strong>∅ ⊆ A</strong> igaz!</li>
              <li>• <strong>Egyetlen üres halmaz van</strong> (nem létezik több különböző üres halmaz).</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A 2ⁿ Részhalmaz Tétele (Hatványhalmaz)"
            color="indigo"
            formula="\text{Részhalmazok száma} = 2^n"
          >
            <PowerSetTreeSvg size={180} className="mx-auto" />
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 mt-1">
              <p>
                <strong>Miért éppen 2ⁿ?</strong> Amikor kiválasztunk egy részhalmazt, minden egyes elemről <strong>2 döntést</strong> hozhatunk függetlenül: <em>beválogatjuk (IGEN) vagy kihagyjuk (NEM)</em>.
              </p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-[11px] font-bold text-center">
                2 · 2 · ... · 2 = 2ⁿ db részhalmaz
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 3: Hatványhalmaz Generátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-purple-200 dark:border-purple-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Boxes className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 3: Hatványhalmaz és Részhalmaz Generátor
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Válaszd ki a halmaz elemszámát (n) és nézd meg az összes generált részhalmazt!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setNElements(n)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all ${
                    nElements === n
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  n={n}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-100/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 mb-3 flex flex-wrap justify-between items-center text-xs font-bold text-purple-900 dark:text-purple-200">
            <span>Kiinduló halmaz: {`A = { ${currentBaseSet.join(', ')} }`} ({nElements} elem)</span>
            <span>Összes részhalmaz: 2^{nElements} = {Math.pow(2, nElements)} darab</span>
            <span>Valódi részhalmazok: 2^{nElements} − 1 = {Math.pow(2, nElements) - 1} darab</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {generatedSubsets.map((sub, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs"
              >
                {sub}
              </div>
            ))}
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI CSAPDÁK ÉS VIZSGATIPPEK */}
      <TheorySection
        number={5}
        title="Tipikus Halmazelméleti Buktatók és Vizsgatippek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: Az „eleme” (∈) és a „részhalmaza” (⊆) jelek összetévesztése"
            trap="Igaz-e, hogy 3 ⊆ {1, 2, 3} ?"
            wrong="Igen, hiszen a 3 benne van a halmazban!"
            wrongExplanation="Hiba! A 3 egy elem, nem halmaz. Elem és halmaz között CSAK az ∈ (eleme) jel állhat: 3 ∈ {1, 2, 3}."
            correct="{3} ⊆ {1, 2, 3}"
            correctExplanation="Helyes! A ⊆ jel KÉT HALMAZ közötti reláció. Ha a 3-ast kapcsos zárójelbe tesszük ({3}), akkor már egy 1 elemű részhalmazról beszélünk, ami ⊆ {1, 2, 3}!"
            tip="Szabály: Elem ∈ Halmaz, de Halmaz ⊆ Halmaz!"
          />

          <TheoryTrapBox
            title="2. Buktató: Az üres halmaz és az üres halmazt tartalmazó halmaz"
            trap="Egyenlő-e az üres halmaz (∅) és a { ∅ } halmaz?"
            wrong="Igen, mindkettő az üres halmazt jelenti."
            wrongExplanation="Hiba! Az ∅ halmaznak 0 eleme van (|∅| = 0), míg a { ∅ } egy OLYAN HALMAZ, AMINEK VAN 1 ELEME (maga az ∅ szimbólum, |{∅}| = 1)!"
            correct="∅ ≠ { ∅ }"
            correctExplanation="Helyes! Gondolj rá úgy, mint egy üres dobozra (∅) vs. egy olyan dobozra, amiben van egy másik üres doboz ({∅})."
            tip="Az ∅ elemszáma 0, a {∅} elemszáma 1!"
          />

          <TheoryTrapBox
            title="3. Buktató: Valódi részhalmazok száma"
            trap="Hány valódi részhalmaza van egy 4 elemű halmaznak?"
            wrong="2⁴ = 16 valódi részhalmaza van."
            wrongExplanation="Hiba! A 2⁴ = 16 az ÖSSZES részhalmaz száma. A valódi részhalmaz definíciója szerint maga a teljes halmaz NEM valódi részhalmaz!"
            correct="2⁴ - 1 = 15 valódi részhalmaz"
            correctExplanation="Helyes! Az összes részhalmazból le kell vonni 1-et (önmagát): 16 - 1 = 15."
            tip="Valódi részhalmazok száma = 2ⁿ - 1. Nem üres részhalmazok száma = 2ⁿ - 1."
          />

          <TheoryTrapBox
            title="4. Buktató: Gyökös számok azonnali irracionálisnak bélyegzése"
            trap="Melyik számhalmazba tartozik a √16 és a √25/4 ?"
            wrong="Gyökjel van rajta, tehát irracionális (ℚ*) számok."
            wrongExplanation="Hiba! A négyzetgyökök pontosan kiszámíthatók: √16 = 4, ami természetes szám (ℕ)! A √(25/4) = 5/2 = 2,5, ami racionális szám (ℚ)!"
            correct="√16 ∈ ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ"
            correctExplanation="Helyes! Mindig végezd el az egyszerűsítést és a gyökvonást, mielőtt besorolnád a számot!"
            tip="Csak a nem négyzetszámok négyzetgyöke irracionális (pl. √2, √3, √5)!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SetsTheory;
