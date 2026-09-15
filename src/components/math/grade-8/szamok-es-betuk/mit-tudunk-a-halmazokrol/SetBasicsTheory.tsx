import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Layers,
  Binary,
  Calculator,
  Compass,
  ArrowRight,
  HelpCircle,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetBasicsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SetBasicsTheory: React.FC<SetBasicsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive State for Subset counter (2^n)
  const [elementCount, setElementCount] = useState<number>(3);
  const [selectedElementSample, setSelectedElementSample] = useState<number>(0);

  const sampleSets = [
    {
      name: "A",
      def: "A 10-nél kisebb prímszámok",
      elements: "{2, 3, 5, 7}",
      count: 4,
      isFinite: true,
      explanation: "Véges halmaz, pontosan 4 darab prím van 10 alatt: 2, 3, 5 és 7."
    },
    {
      name: "B",
      def: "A 3-mal osztható természetes számok",
      elements: "{0, 3, 6, 9, 12, 15, ...}",
      count: "Végtelen (∞)",
      isFinite: false,
      explanation: "Végtelen halmaz, tetszőlegesen sok 3-mal osztható szám létezik."
    },
    {
      name: "C",
      def: "A negatív természetes számok",
      elements: "∅ (üres halmaz)",
      count: 0,
      isFinite: true,
      explanation: "Üres halmaz, mert a természetes számok (0, 1, 2, ...) között nincsen negatív szám."
    },
    {
      name: "D",
      def: "A „MATEMATIKA” szó különböző betűi",
      elements: "{M, A, T, E, I, K}",
      count: 6,
      isFinite: true,
      explanation: "A halmazban minden elem csak egyszer számít! Bár a szó 10 betűs, csak 6 különböző betűt tartalmaz."
    }
  ];

  const currentSample = sampleSets[selectedElementSample];

  // Helper calculation for 2^n
  const subsetCount = Math.pow(2, elementCount);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-halmazok-alap"
      pdfFilename="8_osztaly_mit_tudunk_a_halmazokrol.pdf"
      title="2. Mit tudunk a halmazokról?"
      subtitle="Halmazok fogalma, megadási módjai, jelölések (∈, ∉), üres halmaz, részhalmazok száma (2ⁿ), alaphalmaz és egyenlőség"
      quickRule={{
        label: "Részhalmazok száma képlet",
        formula: "n elemű halmaz  ⟹  2ⁿ darab részhalmaz (mindig benne van az ∅ és önmaga!)"
      }}
      themeColor="violet"
    >
      {/* 1. FEJEZET: A halmaz fogalma és megadási módjai */}
      <TheorySection
        number={1}
        title="A halmaz fogalma és megadási módjai"
        icon={<Target className="w-5 h-5 text-violet-600" />}
        badgeColor="violet"
      >
        <TheoryCallout variant="info" title="Mi a halmaz a matematikában?">
          A <strong>halmaz</strong> bizonyos dolgok (elemek) összessége, amelyről minden dologra <strong>egyértelműen és objektíven megmondható</strong>, hogy bele tartozik-e vagy sem.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Halmazok helyes megadása"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            variant="emerald"
            badge="Egyértelmű"
          >
            <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-600">1.</span>
                <span><strong>Elemek felsorolásával:</strong> <em>A</em> = {'{'}2, 3, 5, 7{'}'}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-600">2.</span>
                <span><strong>Közös tulajdonsággal (utasítással):</strong> „A páros egyjegyű pozitív számok halmaza”</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-600">3.</span>
                <span><strong>Venn-diagrammal:</strong> Síkbeli zárt vonallal határolt területen belül ábrázolt elemekkel.</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A 2 legfontosabb halmaz-alapszabály"
            icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}
            variant="amber"
            badge="Nem számít"
          >
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                <strong>1. A sorrend NEM számít:</strong><br />
                {'{'}1, 2, 3{'}'} = {'{'}3, 1, 2{'}'} = {'{'}2, 3, 1{'}'}
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                <strong>2. Az ismétlődés NEM számít:</strong><br />
                {'{'}1, 2, 2, 3, 3, 3{'}'} = {'{'}1, 2, 3{'}'} (minden elem csak egyszer számít!)
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interactive Set Explorer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-violet-600 dark:text-violet-400">
              Interaktív Halmazvizsgáló
            </span>
            <span className="text-[11px] text-slate-400">
              {selectedElementSample + 1} / {sampleSets.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {sampleSets.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedElementSample(idx)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                  selectedElementSample === idx
                    ? "bg-violet-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-300"
                )}
              >
                {s.name} Halmaz
              </button>
            ))}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                <em>{currentSample.name}</em> = {currentSample.def}
              </span>
              <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300">
                Elemszám |{currentSample.name}| = {currentSample.count}
              </span>
            </div>
            <div className="font-mono text-sm text-violet-700 dark:text-violet-300 bg-violet-50/50 dark:bg-slate-800 p-2 rounded-lg border border-violet-100 dark:border-slate-700">
              {currentSample.name} = {currentSample.elements}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentSample.explanation}
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Jelölések és relációk */}
      <TheorySection
        number={2}
        title="Jelölések, elemi relációk (∈, ∉) és elemszám"
        icon={<Binary className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryTable
          headers={['Jelölés', 'Elnevezés / Olvasat', 'Matematikai jelentés', 'Példa']}
          rows={[
            ['x ∈ A', 'Eleme', 'Az x elem beletartozik az A halmazba', '5 ∈ {prímszámok}'],
            ['y ∉ A', 'Nem eleme', 'Az y elem nem tartozik az A halmazba', '6 ∉ {prímszámok}'],
            ['|A| (vagy n(A))', 'Elemszám (kardinalitás)', 'A halmazban található különböző elemek száma', '|{a, b, c}| = 3'],
            ['∅ vagy {}', 'Üres halmaz', 'Olyan halmaz, amelynek egyetlen eleme sincs', '|∅| = 0']
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="Gyakori hiba: Az üres halmaz jelölése"
            wrong="Az üres halmazt úgy jelöljük: {∅} ❌"
            correct="Jelölése: ∅ vagy {} ✔"
            explanation="A {∅} egy olyan 1 elemű halmaz, amelynek az egyetlen eleme maga az üres halmaz! Az üres halmaznak nincs eleme, tehát helyesen: ∅ vagy üres kapcsos zárójel {}."
          />

          <TheoryTrapBox
            title="Gyakori hiba: Elem és részhalmaz keverése"
            wrong="„3 ⊆ {1, 2, 3}” ❌"
            correct="„3 ∈ {1, 2, 3}” és „{3} ⊆ {1, 2, 3}” ✔"
            explanation="A 3 egy önálló elem (ezért ∈ tartozás), míg a {3} egy egyelemű halmaz (ezért ⊆ részhalmaz)!"
          />
        </div>
      </TheorySection>

      {/* 3. FEJEZET: Speciális halmazok és Számhalmazok */}
      <TheorySection
        number={3}
        title="Speciális halmazok és a Nevezetes Számhalmazok"
        icon={<Compass className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Alaphalmaz (U vagy Ω)"
            icon={<Box className="w-4 h-4 text-cyan-600" />}
            variant="cyan"
            badge="Univerzum"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az az átfogó halmaz, amelyből az adott feladat vagy téma során az összes elemet kiválasztjuk. Minden vizsgált halmaz része az alaphalmaznak (<em>A</em> ⊆ <em>U</em>).
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Üres halmaz (∅)"
            icon={<Layers className="w-4 h-4 text-rose-600" />}
            variant="rose"
            badge="|∅| = 0"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egyetlen eleme sincs. Fontos alaptulajdonság: <strong>az üres halmaz minden halmaznak részhalmaza</strong> (∅ ⊆ <em>A</em> tetszőleges <em>A</em> halmazra)!
            </p>
          </TheoryCard>
        </div>

        <TheoryCard
          title="Nevezetes számhalmazok egymásba ágyazódása"
          icon={<Calculator className="w-4 h-4 text-purple-600" />}
          variant="purple"
          badge="ℕ ⊂ ℤ ⊂ ℚ"
        >
          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="text-emerald-700 dark:text-emerald-400">ℕ = Természetes számok: {'{'}0, 1, 2, 3, ...{'}'}</span>
              </div>
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="text-blue-700 dark:text-blue-400">ℤ = Egész számok: {'{'}..., -3, -2, -1, 0, 1, 2, 3, ...{'}'}</span>
              </div>
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="text-purple-700 dark:text-purple-400">ℚ = Racionális számok: felírhatók két egész szám hányadosaként (a/b, b ≠ 0)</span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-center font-bold text-purple-900 dark:text-purple-200">
              Láncolat: ℕ ⊂ ℤ ⊂ ℚ (Minden természetes szám egész szám, és minden egész szám racionális szám!)
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. FEJEZET: Részhalmazok és a 2^n képlet */}
      <TheorySection
        number={4}
        title="Részhalmaz (⊆), Valódi részhalmaz (⊂) és a 2ⁿ képlet"
        icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="tip" title="A részhalmaz pontos definíciója:">
          Az <em>A</em> halmaz <strong>részhalmaza</strong> a <em>B</em> halmaznak (jelölése: <em>A</em> ⊆ <em>B</em>), ha <em>A</em> <strong>minden eleme</strong> eleme <em>B</em>-nek is.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Részhalmaz alaptulajdonságai" variant="emerald">
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• Minden halmaz részhalmaza önmagának: <em>A</em> ⊆ <em>A</em>.</li>
              <li>• Az üres halmaz minden halmaznak részhalmaza: ∅ ⊆ <em>A</em>.</li>
              <li>• Ha <em>A</em> ⊆ <em>B</em> és <em>B</em> ⊆ <em>C</em>, akkor <em>A</em> ⊆ <em>C</em> (tranzitivitás).</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Valódi részhalmaz (⊂)" variant="violet">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az <em>A</em> <strong>valódi részhalmaza</strong> <em>B</em>-nek (<em>A</em> ⊂ <em>B</em>), ha <em>A</em> ⊆ <em>B</em>, de <em>A</em> ≠ <em>B</em> (azaz <em>B</em>-ben van legalább egy olyan elem, ami nincs <em>A</em>-ban).
            </p>
          </TheoryCard>
        </div>

        {/* Interactive 2^n Calculator */}
        <div className="p-4 bg-emerald-50/50 dark:bg-slate-850 rounded-2xl border border-emerald-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300">
              Interaktív Részhalmaz-Számláló Szimulátor (2ⁿ szabály)
            </span>
            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
              n = {elementCount} elem ⟹ 2^{elementCount} = {subsetCount} részhalmaz
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Válassz elemszámot (n):</span>
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setElementCount(num)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                  elementCount === num
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                )}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-slate-800 text-xs space-y-2">
            <div className="text-slate-700 dark:text-slate-300">
              <strong>Miért 2ⁿ?</strong> Mert a halmaz felépítésekor minden egyes elemről <strong>2 döntést</strong> hozhatunk függetlenül: beletesszük a részhalmazba (IGEN), vagy kihagyjuk (NEM). Ez n elemre: 2 · 2 · ... · 2 = <strong>2ⁿ lehetőség</strong>.
            </div>

            {elementCount === 3 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 pb-1">Példa az A = {'{'}1, 2, 3{'}'} halmaz mind a 8 részhalmazára:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">0 elemű: ∅</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">1 elemű: {'{'}1{'}'}</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">1 elemű: {'{'}2{'}'}</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">1 elemű: {'{'}3{'}'}</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">2 elemű: {'{'}1, 2{'}'}</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">2 elemű: {'{'}1, 3{'}'}</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">2 elemű: {'{'}2, 3{'}'}</span>
                  <span className="bg-emerald-50 dark:bg-slate-800 p-1 rounded">3 elemű: {'{'}1, 2, 3{'}'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SetBasicsTheory;
