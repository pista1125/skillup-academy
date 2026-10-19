import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Sparkles,
  Repeat,
  RotateCw,
  MoveHorizontal,
  FlipHorizontal,
  FlipVertical,
  Palette,
  Calculator,
  Compass,
  CheckCircle2,
  HelpCircle,
  Footprints
} from 'lucide-react';

export interface RhythmPatternsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const RhythmPatternsTheory: React.FC<RhythmPatternsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Díszítősor Tervező Állapot ---
  const MOTIFS = ['🔷', '⭐', '🔺', '🟡', '🌸', '🔶'];
  const [selectedMotifs, setSelectedMotifs] = useState<string[]>(['🔷', '⭐', '🔺']);
  const [transformType, setTransformType] = useState<'translate' | 'reflect' | 'rotate'>('translate');

  // --- 2. Interaktív N-edik Elem Kalkulátor Állapot ---
  const [targetIndex, setTargetIndex] = useState<number>(25);

  // Kiszámolt n-edik elem
  const period = selectedMotifs.length;
  const remainder = targetIndex % period === 0 ? period : targetIndex % period;
  const calculatedElement = selectedMotifs[remainder - 1];

  return (
    <TheoryTemplate
      documentId="grade-5-rhythm-patterns-theory"
      pdfFilename="5_osztaly_V_6_ritmusok_diszitesek.pdf"
      title="Ritmusok, díszítések és sorminták"
      subtitle="A ritmus matematikai alapjai, az alapszakasz (periódus), geometriai transzformációk (eltolás, tükrözés, forgatás), sorminták N-edik elemének meghatározása és népművészeti alkalmazások"
      themeColor="emerald"
      emoji="🎨"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 6. TANANYAG"
      quickRule={{
        label: 'Az N-edik elem kiszámításának aranyszabálya',
        formula: 'N : \\text{Periódushossz} = Q, \\quad \\text{Maradék } R \\quad \\Longrightarrow \\quad \\text{A minta } R\\text{-edik eleme! (Ha } R = 0, \\text{ az utolsó elem)}'
      }}
      practiceTitle="Készen állsz a sorminták és ritmusok feladványaira?"
      practiceSubtitle="Teszteld mintafelismerési tudásodat a 30 kérdéses kvízben és az interaktív játékokban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A RITMUS ÉS AZ ALAPSZAKASZ */}
      <TheorySection
        id="ritmus-es-alapszakasz"
        title="1. A ritmus és az alapszakasz (periódus)"
        subtitle="Mi tesz egy mintát szabályos ritmussá a matematikában és a művészetben?"
        badge="ALAPFOGALMAK"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="A ritmus fogalma"
            badge="ISÉTLŐDÉS"
            color="emerald"
            icon={<Repeat className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A ritmus elemek <strong>szabályos, kiszámítható, egymást követő ismétlődése</strong>.
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-xs text-emerald-900 dark:text-emerald-200">
              Megtalálható a szívverésben, az évszakok váltakozásában, a zenében és a díszítőművészetben is.
            </div>
          </TheoryCard>

          <TheoryCard
            title="Az alapszakasz (motívum)"
            badge="A MAG"
            color="blue"
            icon={<Sparkles className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A mintázatnak az a <strong>legkisebb önálló része</strong>, amelynek egymás után másolásával felépül a teljes sor.
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded text-xs text-blue-900 dark:text-blue-200 font-mono">
              Példa: [🔴 🔵 🟡] alapszakasz
            </div>
          </TheoryCard>

          <TheoryCard
            title="Periódushossz"
            badge="ELEMSZÁM"
            color="purple"
            icon={<Calculator className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Azt jelöli, hogy az alapszakasz hány darab elemből áll.
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded text-xs text-purple-900 dark:text-purple-200">
              Ha 3 különböző figura ismétlődik, a periódushossz 3. Minden 4. elem megegyezik az 1. elemmel!
            </div>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: SORMINTA ÉS DÍSZÍTŐSOR TERVEZŐ */}
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-600 text-white">
                  Interaktív Stúdió
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Díszítősor és Sorminta Tervező
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Állítsd össze a saját alapszakaszodat motívumokból, és nézd meg az ismétlődő díszítősort!
              </p>
            </div>

            {/* Transzformáció váltó */}
            <div className="flex gap-1.5 flex-wrap">
              {[
                { type: 'translate', label: 'Eltolás' },
                { type: 'reflect', label: 'Tükrözés' },
                { type: 'rotate', label: 'Forgatás' }
              ].map(t => (
                <button
                  key={t.type}
                  onClick={() => setTransformType(t.type as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    transformType === t.type
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Motívum választó sor */}
          <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Kattints az alapszakaszhoz adandó elemekre:
            </div>
            <div className="flex gap-2">
              {MOTIFS.map(m => (
                <button
                  key={m}
                  onClick={() => {
                    if (selectedMotifs.length < 5) {
                      setSelectedMotifs([...selectedMotifs, m]);
                    }
                  }}
                  className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 text-base flex items-center justify-center transition-all"
                  title="Hozzáadás"
                >
                  {m}
                </button>
              ))}
              <button
                onClick={() => setSelectedMotifs(['🔷', '⭐', '🔺'])}
                className="px-2 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 rounded"
              >
                Alaphelyzet
              </button>
            </div>
          </div>

          {/* Aktuális alapszakasz kijelző */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Alapszakasz:</span>
            <div className="flex gap-1.5 p-1.5 bg-emerald-100/70 dark:bg-emerald-950/60 rounded-lg border border-emerald-300 dark:border-emerald-700">
              {selectedMotifs.map((m, idx) => (
                <div key={idx} className="w-7 h-7 bg-white dark:bg-slate-800 rounded flex items-center justify-center shadow-sm text-sm">
                  {m}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              (Periódushossz: <strong>{selectedMotifs.length} elem</strong>)
            </span>
          </div>

          {/* Generált díszítősor */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-inner overflow-x-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Generált folyamatos díszítősor (első 15 elem):
            </div>
            <div className="flex gap-2 items-center min-w-[500px]">
              {Array.from({ length: 15 }).map((_, i) => {
                const baseElem = selectedMotifs[i % selectedMotifs.length];
                const blockNum = Math.floor(i / selectedMotifs.length);

                let transformStyle = '';
                if (transformType === 'reflect' && blockNum % 2 === 1) {
                  transformStyle = 'scale-x-[-1]';
                } else if (transformType === 'rotate') {
                  const deg = (i % 4) * 90;
                  transformStyle = `rotate-[${deg}deg]`;
                }

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm shadow-sm transition-transform ${transformStyle}`}>
                      {baseElem}
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-1">{i + 1}.</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: GEOMETRIAI TRANSZFORMÁCIÓK A DÍSZÍTŐSOROKBAN */}
      <TheorySection
        id="geometriai-transzformaciok"
        title="2. Díszítősorok típusai geometriai transzformációk szerint"
        subtitle="Milyen mozgásokkal és szimmetriákkal hozhatók létre a mintázatok?"
        badge="TRANSZFORMÁCIÓK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Eltolásos ritmus (transzláció)"
            badge="ELTOLÁS"
            color="blue"
            icon={<MoveHorizontal className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A motívumot <strong>egy adott állandó távolsággal folyamatosan eltoljuk</strong> ugyanabban az irányban. Az elemek formája és iránya nem változik.
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded text-xs text-blue-900 dark:text-blue-200 font-mono text-center">
              ▲ &nbsp; ▲ &nbsp; ▲ &nbsp; ▲ &nbsp; ▲ &nbsp; ▲
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tükrözéses ritmus (reflexió)"
            badge="SZIMMETRIA"
            color="purple"
            icon={<FlipHorizontal className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A motívumot váltakozva <strong>tengelyesen tükrözzük</strong>. Lehet függőleges tükörtengely (jobbra-balra néző formák) vagy vízszintes (fent-lent).
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded text-xs text-purple-900 dark:text-purple-200 font-mono text-center">
              ▲ &nbsp; ▼ &nbsp; ▲ &nbsp; ▼ &nbsp; ▲ &nbsp; ▼
            </div>
          </TheoryCard>

          <TheoryCard
            title="Forgatásos ritmus (rotáció)"
            badge="FORGATÁS"
            color="emerald"
            icon={<RotateCw className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A motívum lépésről lépésre <strong>egy rögzített szöggel elfordul</strong> egy pont körül (pl. 90°-kal órajárás szerint vagy 180°-kal).
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-xs text-emerald-900 dark:text-emerald-200 font-mono text-center">
              ⬆ &nbsp; ➡ &nbsp; ⬇ &nbsp; ⬅ &nbsp; ⬆ &nbsp; ➡
            </div>
          </TheoryCard>

          <TheoryCard
            title="Csúsztatva tükrözés (lépésritmus)"
            badge="KOMBINÁLT"
            color="amber"
            icon={<Footprints className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Az alakzatot <strong>eltoljuk, majd egy párhuzamos tengelyre tükrözzük</strong>. Pontosan úgy viselkedik, mint a lábnyomok lépkedés közben a hóban!
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded text-xs text-amber-900 dark:text-amber-200 font-mono text-center">
              👣 Jobb láb feljebb, bal láb lejjebb váltakozva
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: AZ N-EDIK ELEM KISZÁMÍTÁSA */}
      <TheorySection
        id="n-edik-elem-kiszamitasa"
        title="3. Az N-edik elem kiszámítása maradékos osztással"
        subtitle="Hogyan tudjuk meg egy sorminta 50., 100. vagy akár 1000. elemét rajzolgatás nélkül?"
        badge="MATEMATIKAI MÓDSZER"
      >
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A sorminták periodikussága miatt nem kell lerajzolnunk az egész sort a 100. elemig! A megoldás kulcsa a <strong>maradékos osztás a periódushosszal</strong>.
        </p>

        {/* 2. INTERAKTÍV ESZKÖZ: N-EDIK ELEM KALKULÁTOR */}
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-600 text-white">
                  Kalkulátor
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Hányadik elemre vagy kíváncsi?
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                A jelenlegi alapszakasz: {selectedMotifs.join(' ')} (hossz = {period})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">N értéke:</span>
              {[10, 25, 47, 100].map(val => (
                <button
                  key={val}
                  onClick={() => setTargetIndex(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    targetIndex === val
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {val}. elem
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Számolási levezetés doboz */}
            <div className="lg:col-span-8 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Számolási lépések a(z) {targetIndex}. elem megkeresésére:
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2 text-xs text-blue-950 dark:text-blue-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold">1. lépés (Osztás):</span>
                  <span className="font-mono font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-blue-200">
                    {targetIndex} : {period} = {Math.floor(targetIndex / period)}, maradék {targetIndex % period}
                  </span>
                </div>
                <div>
                  Ez azt jelenti, hogy a teljes <strong>{period} elemű alapszakasz pontosan {Math.floor(targetIndex / period)}-szor ismétlődik meg</strong> teljesen.
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-blue-200 dark:border-blue-800">
                  <span className="font-bold">2. lépés (Értelmezés):</span>
                  <span>
                    A maradék <strong>{targetIndex % period}</strong>.
                    {targetIndex % period === 0
                      ? ` Mivel nincs maradék (maradék 0), a sorozat pontosan az alapszakasz UTOLSÓ (${period}.) elemével zárul!`
                      : ` Ezért a(z) ${targetIndex}. elem pontosan az alapszakasz ${targetIndex % period}. eleme!`}
                  </span>
                </div>
              </div>
            </div>

            {/* Eredmény kártya */}
            <div className="lg:col-span-4 p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/60 dark:to-teal-950/60 rounded-xl border border-emerald-300 dark:border-emerald-700 text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                A(z) {targetIndex}. elem:
              </div>
              <div className="text-4xl py-1 animate-bounce">
                {calculatedElement}
              </div>
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                Alapszakasz {remainder}. eleme
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
