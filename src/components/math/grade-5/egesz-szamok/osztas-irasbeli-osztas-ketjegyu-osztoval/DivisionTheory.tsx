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
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Layers,
  BookOpen,
  Zap,
  Target,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function DivisionTheory({ onBack, onStartQuiz }: DivisionTheoryProps) {
  // Interactive Simulator State
  const [dividendStr, setDividendStr] = useState<string>('842');
  const [divisorStr, setDivisorStr] = useState<string>('26');
  const [stepIndex, setStepIndex] = useState<number>(0);

  const computeDivisionData = (divStr: string, dvrStr: string) => {
    const dividend = parseInt(divStr.replace(/\s+/g, ''), 10);
    const divisor = parseInt(dvrStr.replace(/\s+/g, ''), 10);

    if (isNaN(dividend) || isNaN(divisor) || dividend < 0 || divisor <= 0 || dividend > 999999 || divisor > 999) {
      return {
        error: 'Kérlek adj meg érvényes számokat (osztandó legfeljebb 6 jegyű, osztó pozitív legfeljebb 3 jegyű)!',
        steps: [],
        finalQuotient: 0,
        finalRemainder: 0
      };
    }

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;

    const steps = [
      {
        title: '1. Előzetes becslés és kijelölés',
        desc: `Osztandó: ${dividend}, Osztó: ${divisor}. Becslés: ${dividend} : ${divisor} ≈ ${quotient}.`
      },
      {
        title: '2. Írásbeli osztás elvégzése',
        desc: `Hányados: ${quotient}, Maradék: ${remainder}.`
      },
      {
        title: '3. Ellenőrzés (Hányados · Osztó + Maradék)',
        desc: `${quotient} · ${divisor} + ${remainder} = ${quotient * divisor} + ${remainder} = ${dividend} ✓.`
      }
    ];

    return {
      error: null,
      dividend,
      divisor,
      finalQuotient: quotient,
      finalRemainder: remainder,
      steps
    };
  };

  const simData = computeDivisionData(dividendStr, divisorStr);

  return (
    <TheoryTemplate
      title="Osztás, írásbeli osztás kétjegyű osztóval"
      subtitle="Az osztás fogalma, tagjai, maradékos osztás alaptétele, osztás 10 hatványaival, egy- és kétjegyű írásbeli osztás és ellenőrzés"
      documentId="division-theory-content"
      pdfFileName="Osztas_Irasbeli_Osztas_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badgeColor="purple"
      quickRule={{
        title: "Maradékos Osztás Alaptétele",
        formula: "Osztandó = Hányados · Osztó + Maradék  (ahol: 0 ≤ Maradék < Osztó)  |  0-val osztani TILOS!"
      }}
    >
      {/* 1. RÉSZ: AZ OSZTÁS FOGALMA ÉS TAGJAI */}
      <TheorySection
        number={1}
        title="Az osztás fogalma, tagjai és a 0, 1 viselkedése"
        icon={<BookOpen className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <TheoryCallout variant="info" title="Mit jelent az osztás?">
          Az osztás a szorzás <strong>megfordított (inverz) művelete</strong>. Két alapvető értelmezése van:<br />
          • <strong>Részekre osztás:</strong> egy mennyiség felosztása adott számú egyenlő részre.<br />
          • <strong>Bennfoglalás:</strong> megmutatja, hogy egy mennyiségben hányszor van meg egy másik.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Osztandó (a)" icon={<BookOpen className="w-4 h-4 text-blue-600" />} badge="Első tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, <strong>amelyet elosztunk</strong> részekre.
            </p>
            <div className="mt-2 text-center py-1 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
              Példa: 84 : 4 ⟹ 84
            </div>
          </TheoryCard>

          <TheoryCard title="Osztó (b)" icon={<Zap className="w-4 h-4 text-purple-600" />} badge="Második tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, <strong>amellyel osztunk</strong>. Értéke soha nem lehet 0!
            </p>
            <div className="mt-2 text-center py-1 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-700 dark:text-purple-300 font-mono font-bold text-xs">
              Példa: 84 : 4 ⟹ 4
            </div>
          </TheoryCard>

          <TheoryCard title="Hányados (q)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} badge="Eredmény">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az osztás <strong>végeredménye</strong>.
            </p>
            <div className="mt-2 text-center py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs">
              84 : 4 = 21 ⟹ 21
            </div>
          </TheoryCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A 0 és az 1 az osztásban" icon={<ShieldCheck className="w-4 h-4 text-rose-600" />}>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <li>• <strong>Osztás 1-gyel:</strong> bármely számot 1-gyel osztva önmagát kapjuk (<span className="font-mono font-bold">a : 1 = a</span>).</li>
              <li>• <strong>Önmagával osztás:</strong> bármely nem-nulla szám önmagával osztva 1 (<span className="font-mono font-bold">a : a = 1</span>).</li>
              <li>• <strong>0 osztása:</strong> <span className="font-mono font-bold">0 : a = 0</span> (ha a ≠ 0).</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Az osztás és szorzás kapcsolata" icon={<Scale className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az osztás a szorzás megfordított művelete:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs mt-1 text-center">
              Ha a : b = c, akkor c · b = a (ha r = 0)
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: MARADÉKOS OSZTÁS */}
      <TheorySection
        number={2}
        title="A maradékos osztás és alaptétele"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="tip" title="A maradékos osztás alapszabálya">
          Ha az osztandó nem osztható maradék nélkül az osztóval, a megmaradt rész a <strong>maradék (r)</strong>.<br />
          <strong>Szigorú szabály:</strong> A maradék mindig <strong>kisebb</strong> kell legyen az osztónál (<span className="font-mono font-bold">0 ≤ r &lt; Osztó</span>)!
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Példa maradékos osztásra" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-center font-mono font-bold text-sm text-emerald-800 dark:text-emerald-300">
                29 : 6 = 4, maradék 5
              </div>
              <p>• A 29-ben a 6 megvan 4-szer (mert 4 · 6 = 24).</p>
              <p>• A 29 – 24 = <strong>5 a maradék</strong>.</p>
              <p>• Mivel 5 &lt; 6, a számolás helyes!</p>
            </div>
          </TheoryCard>

          <TheoryCard title="Ellenőrzés képlete" icon={<ShieldCheck className="w-4 h-4 text-blue-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A hányadost megszorozzuk az osztóval, és hozzáadjuk a maradékot:
            </p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-center font-mono font-bold text-xs text-blue-800 dark:text-blue-300">
              Hányados (4) · Osztó (6) + Maradék (5) = 24 + 5 = 29 ✓
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: OSZTÁS 10-ZEL, 100-ZAL, 1000-REL */}
      <TheorySection
        number={3}
        title="Gyors osztás 10-zel, 100-zal, 1000-rel"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          title="Nullák elhagyásának szabálya 10 hatványaival történő osztáskor"
          headers={['Osztó', 'Szabály', 'Példa', 'Hányados és Maradék']}
          rows={[
            [': 10', '1 nullát elhagyunk (utolsó számjegy a maradék)', '450 : 10 = 45', '458 : 10 = 45, m 8'],
            [': 100', '2 nullát elhagyunk (utolsó 2 számjegy a maradék)', '7 200 : 100 = 72', '7 245 : 100 = 72, m 45'],
            [': 1 000', '3 nullát elhagyunk (utolsó 3 számjegy a maradék)', '38 000 : 1 000 = 38', '38 650 : 1 000 = 38, m 650'],
            [': Kerek tízes (pl. 20)', 'Előbb osztunk 10-zel, majd a számmal (2)', '840 : 20', '(840 : 10) : 2 = 84 : 2 = 42']
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: ÍRÁSBELI OSZTÁS KÉTJEGYŰ OSZTÓVAL */}
      <TheorySection
        number={4}
        title="Az írásbeli osztás menete kétjegyű osztóval"
        icon={<Layers className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <TheoryCallout variant="tip" title="A 4 aranylépés kétjegyű osztásnál">
          1. <strong>Kijelölés:</strong> Balról kijelölünk annyi számjegyet, amiben az osztó már megvan legalább egyszer.<br />
          2. <strong>Becslés (Kerekítéssel):</strong> Kerekítjük az osztót kerek tízesre, és megbecsüljük a hányados következő jegyét.<br />
          3. <strong>Visszaszorzás és maradék:</strong> Visszaszorzunk, és pótlással kiírjuk a maradékot.<br />
          4. <strong>Következő számjegy lehozása:</strong> Lehozzuk a következő számjegyet a maradék mellé, és ismételjük a lépéseket.
        </TheoryCallout>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Nullával való osztás kísérlete"
            wrong="8 : 0 = 0  vagy  8 : 0 = 8"
            correct="Nullával való osztás ÉRTELMEZHETETLEN és TILOS a matematikában!"
            explanation="Nincs olyan szám, amit 0-val megszorozva 8-at kapnánk. Viszont 0 : 8 = 0 (a nullát eloszthatjuk)."
          />
          <TheoryTrapBox
            title="A maradék nagyobb vagy egyenlő az osztónál"
            wrong="23 : 4 = 4, maradék 7 (mert 4·4 + 7 = 23)"
            correct="23 : 4 = 5, maradék 3 (mert 0 ≤ r < 4)!"
            explanation="Ha a maradék eléri vagy meghaladja az osztót, a hányados értéke még tovább növelhető volt."
          />
          <TheoryTrapBox
            title="A 0 beírásának kihagyása a hányadosba (pl. 618 : 6)"
            wrong="618 : 6 = 13 (kihagyva a 0-t, amikor az 1-ben nincs meg a 6)"
            correct="618 : 6 = 103! Minden lehozott számjegy után kötelező egy jegyet írni a hányadosba!"
            explanation="Ha lehozunk egy jegyet és a rész nem osztható, a hányadosba 0 kerül, mielőtt a következő jegyet lehoznánk."
          />
          <TheoryTrapBox
            title="Az ellenőrzés elhagyása"
            wrong="Csak egyszer kiszámolni ellenőrzés nélkül"
            correct="Mindig ellenőrizzük: Hányados · Osztó + Maradék = Osztandó!"
            explanation="A visszaszorzásos ellenőrzés pillanatok alatt felfedi a számolási és maradékképzési hibákat."
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: INTERAKTÍV ÍRÁSBELI OSZTÁS SZIMULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Lépésről Lépésre Írásbeli Osztás Szimulátor"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
        className="no-pdf"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Osztandó:</label>
              <input
                type="number"
                value={dividendStr}
                onChange={(e) => {
                  setDividendStr(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Osztó:</label>
              <input
                type="number"
                value={divisorStr}
                onChange={(e) => {
                  setDivisorStr(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>
          </div>

          {simData && !simData.error && (
            <div className="space-y-4 pt-2">
              <div className="flex justify-center">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center font-mono font-bold text-lg">
                  <div className="text-slate-800 dark:text-slate-200">
                    {simData.dividend} : {simData.divisor} = <span className="text-purple-600 dark:text-purple-400">{simData.finalQuotient}</span>
                    {simData.finalRemainder > 0 && <span className="text-amber-600 dark:text-amber-400"> (m: {simData.finalRemainder})</span>}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/60 text-xs sm:text-sm">
                <div className="font-bold text-purple-800 dark:text-purple-300 mb-1">
                  {simData.steps[stepIndex]?.title}
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  {simData.steps[stepIndex]?.desc}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={stepIndex === 0}
                  className="rounded-xl text-xs"
                >
                  Előző lépés
                </Button>
                <div className="text-xs font-bold text-slate-500">
                  {stepIndex + 1} / {simData.steps.length} lépés
                </div>
                <Button
                  size="sm"
                  onClick={() => setStepIndex((prev) => Math.min(simData.steps.length - 1, prev + 1))}
                  disabled={stepIndex >= simData.steps.length - 1}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs"
                >
                  Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default DivisionTheory;
