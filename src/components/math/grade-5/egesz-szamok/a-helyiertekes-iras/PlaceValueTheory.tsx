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
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Calculator,
  RotateCcw,
  Binary,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlaceValueTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function PlaceValueTheory({ onBack, onStartQuiz }: PlaceValueTheoryProps) {
  // Interactive Tool State
  const [toolMode, setToolMode] = useState<'decompose' | 'builder'>('decompose');
  const [inputNum, setInputNum] = useState<string>('458203');

  // Builder mode state: counts for each place value
  const [builderCounts, setBuilderCounts] = useState<{ [key: string]: number }>({
    M: 0,
    Sze: 4,
    Te: 5,
    E: 8,
    Sz: 2,
    T: 0,
    e: 3
  });

  // Helper for decomposing a number
  const decomposeNumber = (valStr: string) => {
    const clean = valStr.replace(/\s+/g, '');
    const num = parseInt(clean, 10);
    if (isNaN(num) || num < 0 || num > 9999999) {
      return null;
    }

    const digits = num.toString().split('').map(Number);
    const len = digits.length;

    // Place value names and weights from right to left
    const placeDefs = [
      { name: 'egyes', short: 'e', weight: 1, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200' },
      { name: 'tízes', short: 'T', weight: 10, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' },
      { name: 'százas', short: 'Sz', weight: 100, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200' },
      { name: 'ezres', short: 'E', weight: 1000, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200' },
      { name: 'tízezres', short: 'Té', weight: 10000, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200' },
      { name: 'százezres', short: 'Sze', weight: 100000, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200' },
      { name: 'milliós', short: 'M', weight: 1000000, color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200' }
    ];

    const breakdown = digits.map((digit, idx) => {
      const power = len - 1 - idx;
      const def = placeDefs[power] || { name: 'helyiérték', short: '?', weight: Math.pow(10, power), color: '' };
      const realValue = digit * def.weight;
      return {
        digit,
        name: def.name,
        short: def.short,
        weight: def.weight,
        realValue,
        color: def.color,
        formattedWeight: def.weight.toLocaleString('hu-HU'),
        formattedRealValue: realValue.toLocaleString('hu-HU')
      };
    });

    const sumTerms = breakdown
      .filter((b) => b.realValue > 0)
      .map((b) => b.formattedRealValue);

    const productTerms = breakdown
      .filter((b) => b.digit > 0)
      .map((b) => `${b.digit} · ${b.formattedWeight}`);

    return {
      num,
      formattedNum: num.toLocaleString('hu-HU'),
      breakdown,
      sumFormula: sumTerms.length > 0 ? sumTerms.join(' + ') : '0',
      productFormula: productTerms.length > 0 ? productTerms.join(' + ') : '0'
    };
  };

  const decompResult = decomposeNumber(inputNum);

  // Compute built number from builder mode
  const placeWeights: { [key: string]: { name: string; weight: number; short: string } } = {
    M: { name: 'Milliós', weight: 1000000, short: 'M' },
    Sze: { name: 'Százezres', weight: 100000, short: 'Sze' },
    Te: { name: 'Tízezres', weight: 10000, short: 'Té' },
    E: { name: 'Ezres', weight: 1000, short: 'E' },
    Sz: { name: 'Százas', weight: 100, short: 'Sz' },
    T: { name: 'Tízes', weight: 10, short: 'T' },
    e: { name: 'Egyes', weight: 1, short: 'e' }
  };

  let builtTotal = 0;
  const builtFormulaParts: string[] = [];
  Object.keys(placeWeights).forEach((k) => {
    const count = builderCounts[k] || 0;
    const w = placeWeights[k].weight;
    if (count > 0) {
      builtTotal += count * w;
      builtFormulaParts.push(`${count} · ${w.toLocaleString('hu-HU')}`);
    }
  });

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="place-value-theory-content"
      pdfFilename="5_osztaly_helyiertekes_iras_tananyag.pdf"
      badgeText="🔢 5. Osztály • I. Az egész számok"
      title="A helyiértékes írás"
      subtitle="Alaki érték, helyiérték, valódi érték, helyiérték-táblázat és szorzatos felbontás"
      themeColor="blue"
      quickRule={{
        label: "Helyiértékes Alapszabály",
        formula: "Valódi érték = Alaki érték · Helyiérték"
      }}
      practiceTitle="Készen állsz a helyiértékes írás gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a kártyás párosítóban vagy a csoportosító játékban!"
    >
      {/* 1. Szakasz: A tízes számrendszer alapelve */}
      <TheorySection number={1} title="A tízes számrendszer alapelve" badgeColor="blue">
        <TheoryCard variant="default">
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            <p>
              A mindennapi életben és a matematikában használt számrendszerünk <strong>helyiértékes tízes számrendszer</strong> (decimális rendszer).
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong>Alapszáma a 10</strong>: 10 darab egyes ad 1 tízest, 10 tízes ad 1 százast, 10 százas ad 1 ezrest, és így tovább. Minden helyiérték a tőle jobbra lévő <strong>10-szerese</strong>.
              </li>
              <li>
                <strong>Számjegyek száma (10 db)</strong>: Összesen 10 darab alapszámjegyet használunk a számok leírására: <code className="font-bold text-blue-700 dark:text-blue-300">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</code>.
              </li>
              <li>
                <strong>A helyiérték elve</strong>: Ugyanaz a számjegy teljesen más mennyiséget képvisel attól függően, hogy <strong>melyik helyen áll</strong> a számban!
              </li>
            </ul>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: A 3 féle érték fogalma */}
      <TheorySection number={2} title="A 3 féle érték fogalma" badgeColor="blue">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
          Minden többjegyű számban minden egyes számjegy három különböző tulajdonsággal (értékkel) bír:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Alaki érték */}
          <TheoryCard
            variant="emerald"
            badge="1. Alaki érték"
            title="Maga a leírt számjegy"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A számjegy formája, kinézete, függetlenül attól, hogy hol áll a számban (0, 1, 2, ..., 9).
            </p>
            <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Példa a <strong>745</strong>-ben:<br />
              A 7 alaki értéke: <strong>7</strong><br />
              A 4 alaki értéke: <strong>4</strong><br />
              Az 5 alaki értéke: <strong>5</strong>
            </div>
          </TheoryCard>

          {/* Helyiérték */}
          <TheoryCard
            variant="blue"
            badge="2. Helyiérték"
            title="A pozíció súlya"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Azt adja meg, hogy az adott pozícióban lévő számjegy <strong>hányszorost</strong> ér (egyes, tízes, százas, ezres...).
            </p>
            <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-mono font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Példa a <strong>745</strong>-ben:<br />
              A 7 helyiértéke: <strong>100 (százas)</strong><br />
              A 4 helyiértéke: <strong>10 (tízes)</strong><br />
              Az 5 helyiértéke: <strong>1 (egyes)</strong>
            </div>
          </TheoryCard>

          {/* Valódi érték */}
          <TheoryCard
            variant="purple"
            badge="3. Valódi érték"
            title="Alaki érték · Helyiérték"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A tényleges mennyiség, amit az adott számjegy kifejez az adott pozícióban.
            </p>
            <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-mono font-bold text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Példa a <strong>745</strong>-ben:<br />
              A 7 valódi értéke: <strong>7 · 100 = 700</strong><br />
              A 4 valódi értéke: <strong>4 · 10 = 40</strong><br />
              Az 5 valódi értéke: <strong>5 · 1 = 5</strong>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szakasz: A helyiérték-táblázat és a számok felbontása */}
      <TheorySection number={3} title="A helyiérték-táblázat és a számok felbontása" badgeColor="blue">
        <TheoryTable
          title="Helyiérték-táblázat minta (458 203 felírása):"
          headers={["Milliós (M)", "Százezres (Sze)", "Tízezres (Té)", "Ezres (E)", "Százas (Sz)", "Tízes (T)", "Egyes (e)"]}
          rows={[
            ["1 000 000", "100 000", "10 000", "1 000", "100", "10", "1"],
            ["—", "4", "5", "8", "2", "0", "3"]
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <TheoryCard variant="blue" title="A) Helyiértékes összeg-alak">
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border">
              458 203 = 400 000 + 50 000 + 8 000 + 200 + 3
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              A számjegyek valódi értékeinek összegeként írjuk fel. A 0 értékű helyiértéket kihagyjuk.
            </p>
          </TheoryCard>

          <TheoryCard variant="indigo" title="B) Helyiértékes szorzatos alak">
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border">
              458 203 = 4·100 000 + 5·10 000 + 8·1 000 + 2·100 + 3·1
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Minden számjegyet megszorzunk a saját helyiértékével (alaki érték · helyiérték).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szakasz: A nulla szerepe és a helyiérték eltolódása */}
      <TheorySection number={4} title="A nulla (0) szerepe és a helyiérték eltolódása" badgeColor="blue">
        <TheoryCallout variant="tip" title="A nulla mint helykitöltő számjegy">
          A <strong>0 (nulla)</strong> alaki értéke 0, valódi értéke is 0, de elengedhetetlen <strong>helykitöltő szerepe</strong> van!
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <div className="p-2.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
              <strong>Nulla nélkül megváltozik az érték:</strong><br />
              503 (ötszázhárom) ≠ 53 (ötvenhárom). A nulla biztosítja, hogy az 5 a százas helyen maradjon!
            </div>
            <div className="p-2.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
              <strong>Szorzás 10-zel (eltolódás balra):</strong><br />
              Ha a szám végére egy 0-t írunk, minden számjegy egy hellyel balra lép, és értéke 10-szeresére nő (45 → 450).
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 5. Szakasz: Tipikus hibák és csapdák */}
      <TheorySection number={5} title="Tipikus hibák és csapdák" badgeColor="blue">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Alaki érték és valódi érték keverése"
            wrong="A 4 523 számban a 4-es értéke 4"
            correct="A 4-es alaki értéke 4, de valódi értéke 4 · 1000 = 4 000"
            explanation="Mindig figyelj a feladat kérdésére: az alaki értéket (számjegy formája) vagy a valódi értéket (mennyiség) kéri!"
          />

          <TheoryTrapBox
            title="Nulla elhagyása a szám leírásakor"
            wrong="Ötezer-ötven = 550 vagy 505"
            correct="Ötezer-ötven = 5 050 (5E + 0Sz + 5T + 0e)"
            explanation="A hiányzó helyiértékek (százasok és egyesek) helyére kötelező kitenni a nullát!"
          />
        </div>
      </TheorySection>

      {/* 6. Szakasz: Interaktív Helyiérték Elemző és Építő Eszköz (no-pdf) */}
      <TheorySection number={6} title="Interaktív Helyiérték Elemző és Építő" badgeColor="blue" className="no-pdf">
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <span>Válassz működési módot:</span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setToolMode('decompose')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'decompose'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🔍 Számból Helyiértékek</span>
              </button>
              <button
                type="button"
                onClick={() => setToolMode('builder')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'builder'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🏗️ Helyiértékekből Szám</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Decompose number into place values */}
          {toolMode === 'decompose' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Írj be egy tetszőleges számot (1 – 9 999 999), és nézd meg az alaki, helyi- és valódi értékek interaktív táblázatát:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-56">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Vizsgált szám:</label>
                  <input
                    type="number"
                    min="0"
                    max="9999999"
                    value={inputNum}
                    onChange={(e) => setInputNum(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-lg text-slate-900 dark:text-white text-center focus:border-blue-500 focus:outline-hidden"
                    placeholder="Pl. 458203"
                  />
                </div>

                {decompResult && (
                  <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-300 dark:border-blue-800/80 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tagolt alak:</span>
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                        {decompResult.formattedNum}
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      {decompResult.breakdown.length} számjegyű szám
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Minták:</span>
                {['508', '4050', '25840', '458203', '1004500', '7302094'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputNum(preset)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors',
                      inputNum === preset
                        ? 'bg-blue-100 border-blue-400 text-blue-900 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                    )}
                  >
                    {parseInt(preset, 10).toLocaleString('hu-HU')}
                  </button>
                ))}
              </div>

              {/* Dynamic Place Value Breakdown Table */}
              {decompResult && (
                <div className="space-y-3 pt-2">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-center text-xs">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                          <th className="p-2 border border-slate-300 dark:border-slate-700 text-left">Tulajdonság</th>
                          {decompResult.breakdown.map((item, idx) => (
                            <th key={idx} className="p-2 border border-slate-300 dark:border-slate-700">
                              {item.name} ({item.short})
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        <tr className="bg-white dark:bg-slate-900">
                          <td className="p-2 border border-slate-300 dark:border-slate-700 text-left font-bold text-slate-600 dark:text-slate-300">
                            Alaki érték:
                          </td>
                          {decompResult.breakdown.map((item, idx) => (
                            <td key={idx} className="p-2 border border-slate-300 dark:border-slate-700 font-black text-base text-blue-700 dark:text-blue-400">
                              {item.digit}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-slate-50/50 dark:bg-slate-850/50">
                          <td className="p-2 border border-slate-300 dark:border-slate-700 text-left font-bold text-slate-600 dark:text-slate-300">
                            Helyiérték:
                          </td>
                          {decompResult.breakdown.map((item, idx) => (
                            <td key={idx} className="p-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                              {item.formattedWeight}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-white dark:bg-slate-900">
                          <td className="p-2 border border-slate-300 dark:border-slate-700 text-left font-bold text-slate-600 dark:text-slate-300">
                            Valódi érték:
                          </td>
                          {decompResult.breakdown.map((item, idx) => (
                            <td key={idx} className="p-2 border border-slate-300 dark:border-slate-700 font-bold text-purple-700 dark:text-purple-300">
                              {item.formattedRealValue}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Formulas */}
                  <div className="p-3 bg-blue-50/70 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-1.5 text-xs font-mono">
                    <div>
                      <span className="font-bold text-blue-900 dark:text-blue-200">Összegalak: </span>
                      <span className="text-slate-800 dark:text-slate-200">{decompResult.formattedNum} = {decompResult.sumFormula}</span>
                    </div>
                    <div>
                      <span className="font-bold text-indigo-900 dark:text-indigo-200">Szorzatos alak: </span>
                      <span className="text-slate-800 dark:text-slate-200">{decompResult.formattedNum} = {decompResult.productFormula}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Place Value Builder */}
          {toolMode === 'builder' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Állítsd be az egyes helyiértékeken lévő darabszámokat, és nézd meg az összerakott számot:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Object.keys(placeWeights).map((key) => {
                  const info = placeWeights[key];
                  const count = builderCounts[key] || 0;
                  return (
                    <div key={key} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
                      <div className="text-[11px] font-bold text-slate-400">{info.name}</div>
                      <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">({info.short})</div>
                      <div className="flex items-center justify-center gap-1 pt-1">
                        <button
                          type="button"
                          onClick={() => setBuilderCounts((prev) => ({ ...prev, [key]: Math.max(0, count - 1) }))}
                          className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-black text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-black text-sm text-slate-900 dark:text-white font-mono">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBuilderCounts((prev) => ({ ...prev, [key]: Math.min(9, count + 1) }))}
                          className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-black text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reset button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setBuilderCounts({ M: 0, Sze: 0, Te: 0, E: 0, Sz: 0, T: 0, e: 0 })}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Nullázás
                </button>
              </div>

              {/* Result card */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Összeállított szám:</span>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {builtTotal.toLocaleString('hu-HU')}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 text-right">
                  {builtFormulaParts.length > 0 ? builtFormulaParts.join(' + ') : '0'}
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default PlaceValueTheory;
