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
  Minus,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Scale,
  Layers,
  BookOpen,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SubtractionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function SubtractionTheory({ onBack, onStartQuiz }: SubtractionTheoryProps) {
  // Interactive Simulator State
  const [num1, setNum1] = useState<string>('7432');
  const [num2, setNum2] = useState<string>('2856');
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Helper for column subtraction steps using the Hungarian standard pótlási method
  const getSubtractionSteps = (val1Str: string, val2Str: string) => {
    const n1 = parseInt(val1Str, 10);
    const n2 = parseInt(val2Str, 10);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || n1 > 9999999 || n2 > 9999999) {
      return null;
    }
    if (n1 < n2) {
      return { error: 'A kisebbítendőnek legalább akkorának kell lennie, mint a kivonandó!' };
    }

    const s1 = n1.toString();
    const s2 = n2.toString();
    const maxLen = Math.max(s1.length, s2.length);

    const pad1 = s1.padStart(maxLen, '0');
    const pad2 = s2.padStart(maxLen, '0');

    let carry = 0;
    const steps = [];
    const diffDigits = [];
    const carries = [0];

    for (let i = maxLen - 1; i >= 0; i--) {
      const topDigit = parseInt(pad1[i], 10);
      const bottomDigit = parseInt(pad2[i], 10);
      const effectiveBottom = bottomDigit + carry;

      let resultDigit = 0;
      let nextCarry = 0;
      let explanation = '';

      if (topDigit >= effectiveBottom) {
        resultDigit = topDigit - effectiveBottom;
        nextCarry = 0;
        explanation = carry > 0
          ? `${bottomDigit} + ${carry} (maradék) = ${effectiveBottom}. ${effectiveBottom}-hoz hogy ${topDigit} legyen, kell adni ${resultDigit}-t. Maradék: 0.`
          : `${bottomDigit}-hoz hogy ${topDigit} legyen, kell adni ${resultDigit}-t. Maradék: 0.`;
      } else {
        const borrowedTop = topDigit + 10;
        resultDigit = borrowedTop - effectiveBottom;
        nextCarry = 1;
        explanation = carry > 0
          ? `${bottomDigit} + ${carry} (maradék) = ${effectiveBottom}. ${effectiveBottom}-hoz hogy ${borrowedTop} legyen, kell adni ${resultDigit}-t. Leírjuk a(z) ${resultDigit}-t, maradt az 1.`
          : `${bottomDigit}-hoz hogy ${borrowedTop} legyen, kell adni ${resultDigit}-t. Leírjuk a(z) ${resultDigit}-t, maradt az 1.`;
      }

      const placeNames = ['egyesek', 'tízesek', 'százasok', 'ezresek', 'tízezresek', 'százezresek', 'milliósok'];
      const placeName = placeNames[maxLen - 1 - i] || `${maxLen - i}. helyiérték`;

      diffDigits.unshift(resultDigit);
      carry = nextCarry;
      carries.push(carry);

      steps.push({
        colIndex: i,
        placeName,
        topDigit,
        bottomDigit,
        effectiveBottom,
        resultDigit,
        nextCarry,
        explanation,
        currentDiff: [...diffDigits]
      });
    }

    return {
      n1,
      n2,
      maxLen,
      pad1,
      pad2,
      diff: n1 - n2,
      steps,
      finalCarries: carries
    };
  };

  const simData = getSubtractionSteps(num1, num2);

  return (
    <TheoryTemplate
      title="Kivonás, írásbeli kivonás"
      subtitle="A kivonás fogalma, tagjai, a pótlásos írásbeli kivonás lépései, átváltások és az ellenőrzés módszerei"
      documentId="subtraction-theory-content"
      pdfFileName="Kivonas_Irasbeli_Kivonas_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badgeColor="rose"
      quickRule={{
        title: "Kivonási Alapszabály",
        formula: "Kisebbítendő – Kivonandó = Különbség  ⟹  Ellenőrzés: Különbség + Kivonandó = Kisebbítendő"
      }}
    >
      {/* 1. RÉSZ: A KIVONÁS FOGALMA ÉS TAGJAI */}
      <TheorySection
        number={1}
        title="A kivonás fogalma, tagjai és a 0 szerepe"
        icon={<Minus className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <TheoryCallout variant="info" title="Mit jelent a kivonás?">
          A kivonás az összeadás <strong>megfordított (inverz) művelete</strong>. Azt fejezi ki, hogy egy adott mennyiségből elvéve mekkora rész marad, vagy két mennyiség között mekkora a különbség.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Kisebbítendő (a)" icon={<BookOpen className="w-4 h-4 text-blue-600" />} badge="Első tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az a szám, <strong>amiből kivonunk</strong>. A természetes számok körében a kisebbítendőnek legalább akkorának kell lennie, mint a kivonandó.
            </p>
            <div className="mt-2 text-center py-1 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
              Példa: 85 - 32 ⟹ 85
            </div>
          </TheoryCard>

          <TheoryCard title="Kivonandó (b)" icon={<Minus className="w-4 h-4 text-rose-600" />} badge="Második tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az a szám, <strong>amennyit elveszünk</strong> vagy levonunk az első tagból.
            </p>
            <div className="mt-2 text-center py-1 bg-rose-50 dark:bg-rose-950/40 rounded-lg text-rose-700 dark:text-rose-300 font-mono font-bold text-xs">
              Példa: 85 - 32 ⟹ 32
            </div>
          </TheoryCard>

          <TheoryCard title="Különbség (c)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} badge="Eredmény">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A kivonás <strong>végeredménye</strong>, amely megmutatja a két szám közötti eltérést.
            </p>
            <div className="mt-2 text-center py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs">
              85 - 32 = 53 ⟹ 53
            </div>
          </TheoryCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A 0 viselkedése kivonáskor" icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <li>• <strong>Ha 0-t vonunk ki:</strong> a szám értéke nem változik (<span className="font-mono font-bold">a - 0 = a</span>).</li>
              <li>• <strong>Ha önmagából vonjuk ki:</strong> az eredmény mindig 0 (<span className="font-mono font-bold">a - a = 0</span>).</li>
              <li>• <strong>Figyelem:</strong> <span className="font-mono font-bold">0 - a</span> a természetes számok körében nem értelmezhető!</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Összefüggés az összeadással" icon={<Scale className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A kivonás az összeadás megfordított (inverz) művelete:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs mt-1 text-center">
              Ha a - b = c, akkor c + b = a
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: FEJSZÁMOLÁSI STRATÉGIÁK */}
      <TheorySection
        number={2}
        title="Fejszámolási technikák és trükkök"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          title="Hatékony kivonási stratégiák fejben"
          headers={['Módszer neve', 'Példa feladat', 'Lépések levezetése', 'Eredmény']}
          rows={[
            ['Kerek tízesre bontás', '74 - 28', '74 - 20 = 54 ⟹ 54 - 8 = 46', '46'],
            ['Kerek számhoz pótlás', '83 - 59', '59-hez +1 = 60, 83-hoz még +23 ⟹ 1 + 23 = 24', '24'],
            ['Azonos változtatás elve', '142 - 97', 'Mindkettőhöz +3: 145 - 100 = 45', '45'],
            ['Kerek százasok kivonása', '850 - 390', '850 - 400 = 450 ⟹ 450 + 10 = 460', '460']
          ]}
        />
      </TheorySection>

      {/* 3. RÉSZ: AZ ÍRÁSBELI KIVONÁS (PÓTLÁSI MÓDSZER) */}
      <TheorySection
        number={3}
        title="Az írásbeli kivonás menete (A magyar pótlási módszer)"
        icon={<Layers className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryCallout variant="tip" title="Hogyan számolunk írásban?">
          1. <strong>Helyiérték szerint egymás alá írjuk</strong> a számokat: egyes alá egyes, tízes alá tízes, százas alá százas.<br />
          2. <strong>Jobbról balra haladunk</strong> (egyesekkel kezdve).<br />
          3. <strong>Pótlással kérdezünk:</strong> „Az alsó számhoz (plusz az esetleges átvitelhez) mennyit kell adni, hogy a felső számot megkapjuk?”<br />
          4. <strong>Ha a felső számjegy kisebb:</strong> hozzáadunk 10-et, és a következő bal oldali helyiértékre <strong>1 maradékot (átvitelt)</strong> jegyzünk fel.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Példa 1: Átvitel nélkül (685 - 241)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-center font-bold text-sm">
                685 – 241 = 444
              </div>
              <p>• 1-hez hogy 5 legyen, kell <strong>4</strong>.</p>
              <p>• 4-hez hogy 8 legyen, kell <strong>4</strong>.</p>
              <p>• 2-höz hogy 6 legyen, kell <strong>4</strong>.</p>
            </div>
          </TheoryCard>

          <TheoryCard title="Példa 2: Többszörös átvitellel (7432 - 2856)" icon={<Layers className="w-4 h-4 text-rose-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg font-mono text-center font-bold text-sm text-rose-700 dark:text-rose-300">
                7432 – 2856 = 4576
              </div>
              <p>• 6-hoz hogy 12 legyen, kell <strong>6</strong>, maradt az 1.</p>
              <p>• 5 + 1 = 6-hoz hogy 13 legyen, kell <strong>7</strong>, maradt az 1.</p>
              <p>• 8 + 1 = 9-hez hogy 14 legyen, kell <strong>5</strong>, maradt az 1.</p>
              <p>• 2 + 1 = 3-hoz hogy 7 legyen, kell <strong>4</strong>.</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: ELLENŐRZÉS ÉS BECSLÉS */}
      <TheorySection
        number={4}
        title="A kivonás ellenőrzése és becslése"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. Ellenőrzés összeadással (Kötelező lépés!)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A kapott különbséghez adjuk hozzá a kivonandót. Ha pontosan a kisebbítendőt kapjuk vissza, a számolásunk hibátlan:
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl font-mono text-xs font-bold text-center text-emerald-800 dark:text-emerald-300">
              Különbség (4 576) + Kivonandó (2 856) = Kisebbítendő (7 432) ✓
            </div>
          </TheoryCard>

          <TheoryCard title="2. Előzetes becslés kerekítéssel" icon={<Target className="w-4 h-4 text-blue-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Írásbeli művelet előtt kerekítsük a tagokat a legmagasabb helyiértékre, hogy lássuk a nagyságrendet:
            </p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl font-mono text-xs font-bold text-center text-blue-800 dark:text-blue-300">
              7 432 ≈ 7 000 &nbsp;|&nbsp; 2 856 ≈ 3 000 ⟹ Becslés: 7 000 - 3 000 = 4 000
            </div>
          </TheoryCard>
        </div>
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
            title="A kivonás felcserélhetőségének tévhite"
            wrong="85 - 32 = 32 - 85"
            correct="85 - 32 = 53, míg 32 - 85 nem végezhető el a természetes számok körében!"
            explanation="A kivonás NEM felcserélhető és NEM csoportosítható: a kisebbítendő és kivonandó sorrendje szigorúan kötött."
          />
          <TheoryTrapBox
            title="Kisebb felső jegyből a nagyobb kivonása fordítva"
            wrong="42 - 17 esetén az egyeseknél 7 - 2 = 5-öt számolni (eredmény: 35)"
            correct="A felsőből (2) vonjuk ki az alsót (7) pótlással: 7-hez hogy 12 legyen kell 5, maradt az 1 (eredmény: 25)!"
            explanation="Írásbeli kivonásnál mindig az alsó számtól pótolunk a felsőhöz, sohasem felülről lefelé!"
          />
          <TheoryTrapBox
            title="Az átvitel (maradék 1) elfelejtése"
            wrong="Átlépés után a tízeseknél nem adjuk hozzá az 1-et a kivonandóhoz"
            correct="Ha a felső számjegyhez 10-et adtunk, a bal oldali szomszédos kivonandóhoz AZONNAL hozzá kell adni az 1 átvitelt!"
            explanation="Az átvitel elhagyása az egyik leggyakoribb hiba az írásbeli műveletek elvégzésekor."
          />
          <TheoryTrapBox
            title="Átlépés nullákon keresztül (pl. 5003 - 1247)"
            wrong="A köztes nullákat figyelmen kívül hagyni vagy 10-nek venni átvitel nélkül"
            correct="Minden felbontott 0 helyén 9 marad, és a lánc elején álló első nem nulla jegy (5) csökken 1-gyel (4)!"
            explanation="Nullán keresztüli pótláskor minden átlépett helyiértékre átvitel kerül a helyes pótlási láncban."
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: INTERAKTÍV ÍRÁSBELI KIVONÁS SZIMULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Lépésről Lépésre Írásbeli Kivonás Szimulátor"
        icon={<Calculator className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
        className="no-pdf"
      >
        <TheoryCallout variant="tip" title="Próbáld ki tetszőleges számokkal!">
          Írj be két számot, és léptesd végig az írásbeli kivonást oszlopról oszlopra a magyar pótlási módszer segítségével!
        </TheoryCallout>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kisebbítendő (felső szám):</label>
              <input
                type="number"
                value={num1}
                onChange={(e) => {
                  setNum1(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kivonandó (alsó szám):</label>
              <input
                type="number"
                value={num2}
                onChange={(e) => {
                  setNum2(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>
          </div>

          {simData && !simData.error && (
            <div className="space-y-4 pt-2">
              {/* Visual column layout */}
              <div className="flex justify-center">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm inline-block font-mono text-lg font-bold tracking-wider">
                  <div className="text-right text-slate-800 dark:text-slate-200 pr-2">
                    {simData.pad1}
                  </div>
                  <div className="text-right text-rose-600 dark:text-rose-400 border-b-2 border-slate-800 dark:border-slate-200 pr-2">
                    – {simData.pad2}
                  </div>
                  <div className="text-right text-emerald-600 dark:text-emerald-400 pt-1 pr-2">
                    {simData.steps.slice(0, stepIndex + 1).map((s) => s.resultDigit).reverse().join('').padStart(simData.maxLen, ' ')}
                  </div>
                </div>
              </div>

              {/* Step Explanations */}
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm">
                <div className="font-bold text-rose-800 dark:text-rose-300 mb-1">
                  {stepIndex + 1}. Lépés ({simData.steps[stepIndex]?.placeName}):
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  {simData.steps[stepIndex]?.explanation}
                </div>
              </div>

              {/* Controls */}
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
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs"
                >
                  Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {simData?.error && (
            <div className="p-3 bg-rose-100 dark:bg-rose-900/40 rounded-xl text-rose-800 dark:text-rose-200 text-xs font-bold">
              ⚠️ {simData.error}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default SubtractionTheory;
