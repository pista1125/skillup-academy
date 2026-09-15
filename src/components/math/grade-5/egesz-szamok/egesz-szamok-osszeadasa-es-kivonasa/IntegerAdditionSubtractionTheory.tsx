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
  Plus,
  Minus,
  ArrowRightLeft,
  MoveHorizontal,
  Calculator,
  Sparkles,
  AlertTriangle,
  Layers,
  Info,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IntegerAdditionSubtractionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function IntegerAdditionSubtractionTheory({
  onBack,
  onStartQuiz
}: IntegerAdditionSubtractionTheoryProps) {
  // Interactive Number Line Simulator State
  const [startNum, setStartNum] = useState<number>(-3);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [secondNum, setSecondNum] = useState<number>(5);

  // Calculation for the simulator
  const resultNum = operation === '+' ? startNum + secondNum : startNum - secondNum;

  return (
    <TheoryTemplate
      title="Egész számok összeadása és kivonása"
      subtitle="Lépkedés a számegyenesen, előjelek és műveleti jelek összeolvadása, zárójelek felbontása és pénzügyi modellek"
      documentId="integer-addition-subtraction-theory-content"
      pdfFilename="5_osztaly_egesz_szamok_osszeadasa_kivonasa_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="blue"
      badgeText="➕➖ 5. Osztály • I. Az egész számok"
      quickRule={{
        label: "Aranyszabályok",
        formula: "a + (-b) = a - b | a - (-b) = a + b"
      }}
      practiceTitle="Készen állsz az egész számok műveleteinek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a kártyanyitogató párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: ARANYSZABÁLYOK */}
      <TheorySection
        number={1}
        title="Aranyszabályok: Az előjelek és műveleti jelek találkozása"
        icon={<Sparkles className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <TheoryCard title="1. Pozitív hozzáadása (+)" icon={<Plus className="w-4 h-4 text-blue-600" />} variant="blue">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-center font-mono font-black text-slate-900 dark:text-white text-base">
              a + (+b) = a + b
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              <strong>Jobbra lépünk</strong> a számegyenesen (megtakarítás nő, hőmérséklet emelkedik).
            </p>
          </TheoryCard>

          <TheoryCard title="2. Negatív hozzáadása (-)" icon={<Minus className="w-4 h-4 text-amber-600" />} variant="amber">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center font-mono font-black text-slate-900 dark:text-white text-base">
              a + (-b) = a - b
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              <strong>Balra lépünk</strong> a számegyenesen (tartozás nő, időjárás hűl).
            </p>
          </TheoryCard>

          <TheoryCard title="3. Pozitív elvétele (-)" icon={<Minus className="w-4 h-4 text-rose-600" />} variant="rose">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 text-center font-mono font-black text-slate-900 dark:text-white text-base">
              a - (+b) = a - b
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              <strong>Balra lépünk</strong> a számegyenesen (pénz elköltése, csökkenés).
            </p>
          </TheoryCard>

          <TheoryCard title="4. Negatív elvétele (+)" icon={<Plus className="w-4 h-4 text-emerald-600" />} variant="emerald">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center font-mono font-black text-slate-900 dark:text-white text-base">
              a - (-b) = a + b
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              <strong>Jobbra lépünk</strong> (adósság elengedése = tiszta nyereség!).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: ELŐJELES SZÁMOK ÖSSZEADÁSA */}
      <TheorySection
        number={2}
        title="Előjeles számok összeadása"
        icon={<Plus className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Azonos előjelűek */}
          <TheoryCard title="Azonos előjelű számok összeadása" icon={<Plus className="w-4 h-4 text-blue-600" />} variant="blue">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha mindkét szám előjele megegyezik, <strong>összeadjuk az abszolút értékeiket</strong>, és a végeredmény megkapja a <strong>közös előjelet</strong>:
            </p>
            <div className="space-y-2 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                (+4) + (+5) = +(4 + 5) = +9
              </div>
              <div className="text-rose-700 dark:text-rose-300 font-bold">
                (-3) + (-5) = -(3 + 5) = -8
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              💡 Pénzügyi példa: Ha 3 000 Ft tartozásod van, és csinálsz még 5 000 Ft új adósságot, összesen 8 000 Ft lesz a tartozásod (-8 000 Ft).
            </div>
          </TheoryCard>

          {/* Különböző előjelűek */}
          <TheoryCard title="Különböző előjelű számok összeadása" icon={<ArrowRightLeft className="w-4 h-4 text-amber-600" />} variant="amber">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha az egyik pozitív, a másik negatív, a <strong>nagyobb abszolút értékűből kivonjuk a kisebbet</strong>, és az eredmény a <strong>nagyobb abszolút értékű szám előjelét</strong> kapja:
            </p>
            <div className="space-y-2 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-blue-700 dark:text-blue-300 font-bold">
                (+7) + (-10) = -(10 - 7) = -3 &nbsp; <span className="text-xs font-sans text-slate-500">(10 &gt; 7 ➔ - előjel)</span>
              </div>
              <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                (-4) + (+9) = +(9 - 4) = +5 &nbsp; <span className="text-xs font-sans text-slate-500">(9 &gt; 4 ➔ + előjel)</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              💡 Pénzügyi példa: Ha van 7 000 Ft megtakarításod, de vásárolsz 10 000 Ft-ért, akkor 3 000 Ft mínuszba (tartozásba) kerülsz (-3 000 Ft).
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: KIVONÁS MINT AZ ELLENTETT HOZZÁADÁSA */}
      <TheorySection
        number={3}
        title="Egész számok kivonása mint ellentett hozzáadása"
        icon={<Minus className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCallout title="A kivonás alaptétele" variant="indigo">
          <p className="text-xs sm:text-sm">
            Egy számból kivonni egy másik számot pontosan ugyanazt jelenti, mint <strong>hozzáadni annak az ellentettjét</strong>:
          </p>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-indigo-200 dark:border-indigo-900/60 text-center font-mono font-black text-base sm:text-lg text-indigo-700 dark:text-indigo-300 shadow-xs mt-2">
            a - b = a + (-b)
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <TheoryCard title="1. Pozitív kivonása" icon={<Minus className="w-4 h-4 text-blue-600" />} variant="blue">
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
              8 - (+5) = 8 + (-5) = 3
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Egyszerűen: 8 - 5 = 3. A pozitív szám kivonása balra léptet.
            </div>
          </TheoryCard>

          <TheoryCard title="2. Negatívból kivonás" icon={<Minus className="w-4 h-4 text-rose-600" />} variant="rose">
            <div className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
              (-3) - (+4) = -3 + (-4) = -7
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Egyszerűen: -3 - 4 = -7. A negatív tartományban tovább távolodunk a nullától balra.
            </div>
          </TheoryCard>

          <TheoryCard title="3. Negatív kivonása (csapda!)" icon={<Plus className="w-4 h-4 text-emerald-600" />} variant="emerald">
            <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              (-6) - (-10) = -6 + (+10) = +4
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              A két mínusz egymás után pluszra vált! Adósság csökkentése nyereség.
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV SZÁMEGYENES SZIMULÁTOR */}
      <TheorySection
        number={4}
        title="Interaktív Számegyenes Szimulátor"
        icon={<Calculator className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
        className="no-pdf"
      >
        <div className="bg-slate-50 dark:bg-slate-850 p-5 sm:p-6 rounded-3xl border-2 border-blue-200 dark:border-blue-900/80 space-y-6 no-pdf">
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Állítsd be a kezdőértéket, a műveletet és a második számot, hogy lásd a lépést a számegyenesen!
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Start Number */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Kezdőérték (a):</span>
                <span className="font-mono text-sm text-blue-600 font-black">{startNum}</span>
              </div>
              <input
                type="range"
                min={-10}
                max={10}
                value={startNum}
                onChange={(e) => setStartNum(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Operation */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Művelet:</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOperation('+')}
                  className={cn(
                    'flex-1 py-1.5 rounded-xl font-bold text-xs transition-all border',
                    operation === '+'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  + Hozzáadás
                </button>
                <button
                  onClick={() => setOperation('-')}
                  className={cn(
                    'flex-1 py-1.5 rounded-xl font-bold text-xs transition-all border',
                    operation === '-'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  - Kivonás
                </button>
              </div>
            </div>

            {/* Second Number */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Második szám (b):</span>
                <span className="font-mono text-sm text-blue-600 font-black">
                  {secondNum >= 0 ? `+${secondNum}` : secondNum}
                </span>
              </div>
              <input
                type="range"
                min={-10}
                max={10}
                value={secondNum}
                onChange={(e) => setSecondNum(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Visual Formula Display */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-200 dark:border-blue-800 text-center space-y-1 shadow-sm">
            <div className="text-xs uppercase font-bold text-slate-400">Levezetés és eredmény:</div>
            <div className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
              <span>({startNum})</span>
              <span className="text-blue-600 mx-1.5">{operation}</span>
              <span>({secondNum >= 0 ? `+${secondNum}` : secondNum})</span>
              <span className="text-slate-400 mx-2">=</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black underline decoration-2">
                {resultNum}
              </span>
            </div>
            <div className="text-xs text-slate-500 font-medium pt-1">
              {operation === '+' && secondNum >= 0 && `Kezdőpont (${startNum}) ➔ Lépés JOBBRA ${secondNum} egységgel ➔ Érkezés: ${resultNum}`}
              {operation === '+' && secondNum < 0 && `Kezdőpont (${startNum}) ➔ Lépés BALRA ${Math.abs(secondNum)} egységgel ➔ Érkezés: ${resultNum}`}
              {operation === '-' && secondNum >= 0 && `Kezdőpont (${startNum}) ➔ Lépés BALRA ${secondNum} egységgel ➔ Érkezés: ${resultNum}`}
              {operation === '-' && secondNum < 0 && `Kezdőpont (${startNum}) ➔ Negatív kivonása ➔ Lépés JOBBRA ${Math.abs(secondNum)} egységgel ➔ Érkezés: ${resultNum}`}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: TIPIKUS CSAPDÁK ÉS TÉVHITEK */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="1. Csapda: „-5 - 3 = -2” (Hibás kivonás)"
            wrong="-5 - 3 = -2 (mert 5 - 3 = 2)"
            correct="-5 - 3 = -8"
            explanation="A -5-től BALRA lépünk 3 egységet. Két adósság vagy hideg összeadódik: -5 + (-3) = -8."
          />
          <TheoryTrapBox
            title="2. Csapda: „Két mínusz mindig pozitívat ad”"
            wrong="(-4) + (-3) = +7"
            correct="(-4) + (-3) = -7"
            explanation="Összeadásnál két negatív összege negatív marad! Csak a kivonás műveleti jele és a negatív előjel találkozásánál lesz plusz: 4 - (-3) = 4 + 3 = 7."
          />
          <TheoryTrapBox
            title="3. Csapda: Zárójel felbontása ellentétes előjelnél"
            wrong="7 + (-9) = 16 vagy +2"
            correct="7 + (-9) = 7 - 9 = -2"
            explanation="A plusz és mínusz jel találkozásából mindig mínusz lesz. 7 Ft-ból fizetsz 9 Ft-ot, így 2 Ft tartozásod marad."
          />
          <TheoryTrapBox
            title="4. Csapda: A nulla kivonása és nullából kivonás"
            wrong="0 - 8 = 8"
            correct="0 - 8 = -8 és 8 - 0 = 8"
            explanation="Ha nullából vonunk ki 8-at, balra lépünk 8 egységet a számegyenesen, így a -8-hoz jutunk."
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={6}
        title="Összefoglaló Műveleti Táblázat"
        icon={<Layers className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryTable
          title="Előjeles számok műveleti szabályai"
          headers={['Kifejezés', 'Zárójel nélkül', 'Számegyenes lépés', 'Példa', 'Végeredmény']}
          rows={[
            ['a + (+b)', 'a + b', 'Jobbra b egységet', '5 + (+3)', '8'],
            ['a + (-b)', 'a - b', 'Balra b egységet', '5 + (-3)', '2'],
            ['a - (+b)', 'a - b', 'Balra b egységet', '5 - (+8)', '-3'],
            ['a - (-b)', 'a + b', 'Jobbra b egységet', '5 - (-3)', '8'],
            ['-a - (+b)', '-a - b', 'Még tovább balra', '-5 - (+3)', '-8']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}

export default IntegerAdditionSubtractionTheory;
