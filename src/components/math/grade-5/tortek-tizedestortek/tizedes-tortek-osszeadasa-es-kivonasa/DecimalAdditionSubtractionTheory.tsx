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
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Plus,
  Minus,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  Sliders,
  AlignVerticalJustifyCenter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface DecimalAdditionSubtractionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DecimalAdditionSubtractionTheory: React.FC<DecimalAdditionSubtractionTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Column Math Lab State
  const [numA, setNumA] = useState<number>(14.65);
  const [numB, setNumB] = useState<number>(8.78);
  const [operation, setOperation] = useState<'+' | '-'>('+');

  const calcResult = operation === '+' ? numA + numB : numA - numB;

  // Sample presets for quick exploration
  const presets = [
    { a: 14.65, b: 8.78, op: '+' as const, label: '14,65 + 8,78 (Átlépéssel)' },
    { a: 12.4, b: 3.75, op: '-' as const, label: '12,4 - 3,75 (0 pótlása)' },
    { a: 5.0, b: 2.34, op: '-' as const, label: '5 - 2,34 (Egészből tizedes)' },
    { a: 0.85, b: 0.47, op: '+' as const, label: '0,85 + 0,47 (Törtek összege)' }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setNumA(p.a);
    setNumB(p.b);
    setOperation(p.op);
  };

  return (
    <TheoryTemplate
      title="Tizedes törtek összeadása és kivonása"
      subtitle="Tanuld meg az írásbeli összeadás és kivonás aranyszabályát: a tizedesvesszők pontosan egymás alá illesztését, a nullák pótlását és az átlépéseket!"
      badgeText="➕➖ 5. Osztály • II. Törtek, tizedes törtek"
      documentId="decimal-add-sub-theory-content"
      pdfFilename="5_osztaly_tizedes_tortek_osszeadasa_kivonasa_tananyag.pdf"
      quickRule={{
        label: 'ÍRÁSBELI MŰVELETEK ARANYSZABÁLYA',
        formula: 'Vessző a vessző alá! | 12,4 = 12,40 | 5 = 5,00'
      }}
      themeColor="cyan"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: AZ ÍRÁSBELI MŰVELETEK ARANYSZABÁLYA */}
      <TheorySection
        number={1}
        title="Az aranyszabály: Tizedesvessző a tizedesvessző alá!"
        icon={<AlignVerticalJustifyCenter className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <TheoryCard
          title="Miért kell a tizedesvesszőket egymás alá igazítani?"
          icon={<Lightbulb className="w-5 h-5 text-cyan-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A tizedes törtek összeadásakor és kivonásakor <strong>csak az azonos helyiértékű számjegyeket adhatjuk össze vagy vonhatjuk ki egymásból</strong>:
              tizedet a tizedhez, századot a századhoz, egészet az egészhez.
            </p>

            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-2">
              <div className="font-bold text-cyan-950 dark:text-cyan-200 text-sm flex items-center gap-2">
                <span>🔑 Az írásbeli művelet 4 egyszerű lépése:</span>
              </div>
              <ol className="list-decimal list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <li><strong>Egymás alá írás:</strong> A számokat úgy írjuk fel, hogy a <strong>tizedesvesszők pontosan egymás alá</strong> essenek!</li>
                <li><strong>Nullák pótlása:</strong> Ha az egyik szám rövidebb, a végére írt <strong>nullákkal egyenlő hosszúságúra</strong> egészítjük ki (pl. <MathText>12,4 = 12,40</MathText>).</li>
                <li><strong>Számolás:</strong> Úgy végezzük el a műveletet jobbról balra, mint a természetes számoknál (ügyelve az átvitelekre és a kölcsönzésekre).</li>
                <li><strong>A vessző letétele:</strong> Az eredményben a tizedesvesszőt <strong>pontosan a többi vessző alá</strong> tesszük le!</li>
              </ol>
            </div>

            {/* Vizuális oszlopos bemutató */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800 space-y-3">
                <div className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-600" />
                  <span>Írásbeli összeadás mintapélda</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl font-mono text-sm sm:text-base text-right space-y-1 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 text-xs tracking-widest pb-1 border-b border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                    <span className="w-6 text-center">T</span>
                    <span className="w-6 text-center">E</span>
                    <span className="w-3 text-center">,</span>
                    <span className="w-6 text-center">t</span>
                    <span className="w-6 text-center">sz</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 flex justify-end gap-2">
                    <span className="w-6 text-center">1</span>
                    <span className="w-6 text-center">4</span>
                    <span className="w-3 text-center text-rose-500 font-black">,</span>
                    <span className="w-6 text-center">6</span>
                    <span className="w-6 text-center">5</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 flex justify-end gap-2">
                    <span className="w-6 text-center text-cyan-600 font-bold">+</span>
                    <span className="w-6 text-center">8</span>
                    <span className="w-3 text-center text-rose-500 font-black">,</span>
                    <span className="w-6 text-center">7</span>
                    <span className="w-6 text-center">8</span>
                  </div>
                  <div className="border-t-2 border-slate-900 dark:border-slate-100 pt-1 text-cyan-600 dark:text-cyan-400 font-black flex justify-end gap-2 text-base sm:text-lg">
                    <span className="w-6 text-center">2</span>
                    <span className="w-6 text-center">3</span>
                    <span className="w-3 text-center text-rose-500 font-black">,</span>
                    <span className="w-6 text-center">4</span>
                    <span className="w-6 text-center">3</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  5 + 8 = 13 (leírom a 3-at, maradt 1); 6 + 7 + 1 = 14 (leírom a 4-et, maradt 1); leteszem a vesszőt; 4 + 8 + 1 = 13; 1 + 1 = 2.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 space-y-3">
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Minus className="w-4 h-4 text-indigo-600" />
                  <span>Írásbeli kivonás (0 pótlásával)</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl font-mono text-sm sm:text-base text-right space-y-1 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 text-xs tracking-widest pb-1 border-b border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                    <span className="w-6 text-center">T</span>
                    <span className="w-6 text-center">E</span>
                    <span className="w-3 text-center">,</span>
                    <span className="w-6 text-center">t</span>
                    <span className="w-6 text-center">sz</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 flex justify-end gap-2">
                    <span className="w-6 text-center">1</span>
                    <span className="w-6 text-center">2</span>
                    <span className="w-3 text-center text-rose-500 font-black">,</span>
                    <span className="w-6 text-center">4</span>
                    <span className="w-6 text-center text-amber-500 font-bold">0</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 flex justify-end gap-2">
                    <span className="w-6 text-center text-indigo-600 font-bold">-</span>
                    <span className="w-6 text-center">3</span>
                    <span className="w-3 text-center text-rose-500 font-black">,</span>
                    <span className="w-6 text-center">7</span>
                    <span className="w-6 text-center">5</span>
                  </div>
                  <div className="border-t-2 border-slate-900 dark:border-slate-100 pt-1 text-indigo-600 dark:text-indigo-400 font-black flex justify-end gap-2 text-base sm:text-lg">
                    <span className="w-6 text-center"></span>
                    <span className="w-6 text-center">8</span>
                    <span className="w-3 text-center text-rose-500 font-black">,</span>
                    <span className="w-6 text-center">6</span>
                    <span className="w-6 text-center">5</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  A 12,4 végére 0-t írunk (12,40). 5-höz hogy 10 legyen kell 5, maradt 1; 8-hoz hogy 14 legyen kell 6, maradt 1; vessző; 4-hez hogy 12 legyen kell 8.
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: INTERAKTÍV ÍRÁSBELI MŰVELETI LABOR */}
      <TheorySection
        number={2}
        title="Interaktív írásbeli műveleti laboratórium"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="Próbáld ki tetszőleges számokkal!"
          icon={<Lightbulb className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-4">
            {/* Minta gombok */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Gyors mintafeladatok:</div>
              <div className="flex flex-wrap gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-bold transition-all border',
                      numA === p.a && numB === p.b && operation === p.op
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow ring-2 ring-cyan-300'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-cyan-50'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Számbeállító vezérlők */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50/50 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/40 border border-cyan-200 dark:border-cyan-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">1. szám (A):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={numA}
                    onChange={(e) => setNumA(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Művelet:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOperation('+')}
                      className={cn(
                        'py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1 transition-all border',
                        operation === '+'
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      )}
                    >
                      <Plus className="w-4 h-4" /> Összeadás
                    </button>
                    <button
                      onClick={() => setOperation('-')}
                      className={cn(
                        'py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1 transition-all border',
                        operation === '-'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      )}
                    >
                      <Minus className="w-4 h-4" /> Kivonás
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">2. szám (B):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={numB}
                    onChange={(e) => setNumB(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm"
                  />
                </div>
              </div>

              {/* Számolási levezetés kártya */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-cyan-300 dark:border-cyan-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-slate-500 uppercase">Művelet felírása:</div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                    {numA.toString().replace('.', ',')} {operation} {numB.toString().replace('.', ',')}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase">Pontos végeredmény:</div>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-600 dark:text-cyan-400">
                      {parseFloat(calcResult.toFixed(4)).toString().replace('.', ',')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: BECSLÉS ÉS ELLENŐRZÉS */}
      <TheorySection
        number={3}
        title="Becslés kerekítéssel és ellenőrzés"
        icon={<Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="Hogyan kerülheted el a nagyságrendi hibákat?"
          icon={<Lightbulb className="w-5 h-5 text-emerald-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Mielőtt elvégeznéd a pontos írásbeli műveletet, <strong>mindig érdemes becslést végezni</strong> a számok egészre kerekítésével:
            </p>

            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">Példa: <MathText>19,8 + 31,4 = ?</MathText></div>
              <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <li><strong>Becslés egészre kerekítve:</strong> <MathText>19,8 ≈ 20</MathText> és <MathText>31,4 ≈ 31</MathText>. A becsült összeg: <MathText>20 + 31 = 51</MathText>.</li>
                <li><strong>Pontos számítás:</strong> <MathText>19,8 + 31,4 = 51,2</MathText>.</li>
                <li><strong>Összevetés:</strong> Az 51,2 nagyon közel van az 51-hez, így a számításunk nagy valószínűséggel helyes!</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Kivonás ellenőrzése összeadással:</strong> Ha <MathText>15,4 - 6,8 = 8,6</MathText>, akkor ellenőrizd: <MathText>8,6 + 6,8 = 15,4</MathText>.
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Tipikus hibák és csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Csapda: Jobbra igazítás a tizedesvesszők igazítása helyett"
            wrong="A számok jobb szélét illesztik egymás alá: pl. a 12,5 alá a 3,42-t úgy írják, hogy a 5 és 2 kerül egymás alá."
            correct="Hibás! A tizedesvesszőknek kell egymás alá kerülniük: 12,50 + 3,42 = 15,92 (és nem 15,92 helyett 4,67 vagy egyéb hibás érték)."
          />

          <TheoryTrapBox
            title="2. Csapda: A hiányzó tizedesjegy egyszerű 'lepottyantása' kivonáskor"
            wrong="Az 5 - 2,34 feladatnál a 34-et egyszerűen lemásolják a végére: 5 - 2,34 = 3,34."
            correct="Súlyos hiba! Az 5 egész az 5,00. A nullákból kell kivonni: 5,00 - 2,34 = 2,66."
          />

          <TheoryTrapBox
            title="3. Csapda: A tizedesvessző elfelejtése a végeredményben"
            wrong="3,5 + 4,2 = 77"
            correct="A tizedesvesszőt kötelező letenni ugyanabba az oszlopba: 3,5 + 4,2 = 7,7."
          />
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={5}
        title="Összefoglaló műveleti táblázat"
        icon={<BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <TheoryTable
          headers={['Művelet', 'Átalakítás (0 pótlása)', 'Írásbeli levezetés', 'Végeredmény', 'Becslés']}
          rows={[
            ['3,45 + 2,8', '3,45 + 2,80', '3,45 + 2,80 = 6,25', '6,25', '3 + 3 = 6'],
            ['12,5 - 4,38', '12,50 - 4,38', '12,50 - 4,38 = 8,12', '8,12', '13 - 4 = 9'],
            ['7 - 2,45', '7,00 - 2,45', '7,00 - 2,45 = 4,55', '4,55', '7 - 2 = 5'],
            ['0,78 + 0,65', '0,78 + 0,65', '0,78 + 0,65 = 1,43', '1,43', '1 + 1 = 2'],
            ['15,1 - 8,95', '15,10 - 8,95', '15,10 - 8,95 = 6,15', '6,15', '15 - 9 = 6']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DecimalAdditionSubtractionTheory;
