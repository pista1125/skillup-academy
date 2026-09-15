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
  Binary,
  Cpu,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Sliders,
  RotateCcw,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NumberSystemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberSystemsTheory({ onBack, onStartQuiz }: NumberSystemsTheoryProps) {
  // Interactive Bit Switcher State (8 bits: 128, 64, 32, 16, 8, 4, 2, 1)
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 1, 1, 0, 1]); // default: 13 (8+4+1)

  // Two-way converter state
  const [inputDecimal, setInputDecimal] = useState<string>('42');
  const [inputBinary, setInputBinary] = useState<string>('101010');

  const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];

  const handleToggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);
  };

  const calculatedDecimalFromBits = bits.reduce(
    (acc, bit, idx) => acc + bit * bitValues[idx],
    0
  );

  // Convert decimal to binary with division steps
  const getDecimalToBinarySteps = (numStr: string) => {
    const num = parseInt(numStr, 10);
    if (isNaN(num) || num < 0 || num > 1024) return null;
    if (num === 0) {
      return {
        binary: '0',
        steps: [{ quotient: 0, remainder: 0 }]
      };
    }

    let temp = num;
    const steps = [];
    while (temp > 0) {
      const remainder = temp % 2;
      const nextQuotient = Math.floor(temp / 2);
      steps.push({ current: temp, quotient: nextQuotient, remainder });
      temp = nextQuotient;
    }

    const binary = steps
      .map((s) => s.remainder)
      .reverse()
      .join('');
    return { binary, steps };
  };

  // Convert binary to decimal with breakdown
  const getBinaryToDecimalSteps = (binStr: string) => {
    const cleaned = binStr.replace(/[^01]/g, '');
    if (!cleaned) return null;

    let decimal = 0;
    const terms: { bit: string; power: number; placeValue: number; subtotal: number }[] = [];
    const len = cleaned.length;

    for (let i = 0; i < len; i++) {
      const bit = cleaned[i];
      const power = len - 1 - i;
      const placeValue = Math.pow(2, power);
      const subtotal = parseInt(bit, 10) * placeValue;
      decimal += subtotal;
      terms.push({ bit, power, placeValue, subtotal });
    }

    return { decimal, terms, cleaned };
  };

  const decimalSteps = getDecimalToBinarySteps(inputDecimal);
  const binarySteps = getBinaryToDecimalSteps(inputBinary);

  return (
    <TheoryTemplate
      title="Számrendszerek"
      subtitle="Tízes és kettes (bináris) számrendszer, helyiértékek, átváltási technikák és informatikai alapok"
      topicBadge="5. Osztály • I. Az egész számok"
      topicNumber="5."
      documentId="number-systems-theory-content"
      pdfFileName="Szamrendszerek_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Kulcsfogalom',
        title: 'Kettes (Bináris) Alap',
        detail: 'Jegyek: 0, 1 • Helyiértékek: 1, 2, 4, 8, 16, 32, 64, 128 (duplázódnak)'
      }}
    >
      {/* 1. Szakasz: Mi a számrendszer? */}
      <TheorySection
        number={1}
        title="Mi a számrendszer? A számrendszer alapja"
        badge="Alapfogalmak"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A <strong>számrendszer</strong> olyan szabályok összessége, amelyek meghatározzák, hogy számjegyek segítségével hogyan fejezünk ki számokat. A modern matematikában és informatikában <strong>helyiértékes számrendszereket</strong> használunk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A számrendszer alapja (b)"
              badge="Alap b"
              color="cyan"
            >
              <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Megmutatja, hány darab alapszámjegyet használhatunk ($0$-tól $b-1$-ig).</li>
                <li>Hányszorosára nő a helyiérték jobbról balra haladva.</li>
                <li>Helyiértékek az alap növekvő hatványai: $b^0=1, b^1=b, b^2=b^2, \dots$</li>
              </ul>
            </TheoryCard>

            <TheoryCard
              title="Alaki, Helyi és Valódi érték"
              badge="Értéktípusok"
              color="blue"
            >
              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-mono font-bold text-blue-800 dark:text-blue-300 mb-2 text-center">
                Valódi érték = Alaki érték · Helyiérték
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ugyanaz az '1'-es számjegy mást jelent az egyesek ($1$), a tízesek ($10$), vagy kettes számrendszerben a nyolcasok ($8$) helyén!
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szakasz: Tízes vs Kettes */}
      <TheorySection
        number={2}
        title="Tízes (decimális) vs. Kettes (bináris) számrendszer"
        badge="Összehasonlítás"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="🔟 Tízes számrendszer (Decimális)"
              badge="Alap: 10"
              color="amber"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                <strong>Számjegyek (10 db):</strong> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 text-xs font-mono">
                <div className="text-[11px] text-slate-500 mb-1">Helyiértékek: 1000, 100, 10, 1</div>
                <div className="font-bold text-amber-800 dark:text-amber-300">
                  345 = 3·100 + 4·10 + 5·1
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="💻 Kettes számrendszer (Bináris)"
              badge="Alap: 2"
              color="cyan"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                <strong>Számjegyek (2 db):</strong> 0, 1 (a digitális világ bitjei)
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs font-mono">
                <div className="text-[11px] text-slate-500 mb-1">Helyiértékek: 8, 4, 2, 1 (duplázódnak)</div>
                <div className="font-bold text-cyan-800 dark:text-cyan-300">
                  1101₂ = 1·8 + 1·4 + 0·2 + 1·1 = 13
                </div>
              </div>
            </TheoryCard>
          </div>

          <TheoryTable
            headers={['Decimális (10-es)', 'Bináris (2-es)', 'Bontás helyiértékekre (8 + 4 + 2 + 1)', 'Bit minta']}
            rows={[
              ['0', '0₂', '0', '0000'],
              ['1', '1₂', '1', '0001'],
              ['2', '10₂', '2 + 0', '0010'],
              ['3', '11₂', '2 + 1', '0011'],
              ['4', '100₂', '4 + 0 + 0', '0100'],
              ['5', '101₂', '4 + 0 + 1', '0101'],
              ['6', '110₂', '4 + 2 + 0', '0110'],
              ['7', '111₂', '4 + 2 + 1', '0111'],
              ['8', '1000₂', '8 + 0 + 0 + 0', '1000'],
              ['10', '1010₂', '8 + 2', '1010'],
              ['15', '1111₂', '8 + 4 + 2 + 1', '1111']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Szakasz: Átváltások */}
      <TheorySection
        number={3}
        title="Átváltás a 2-es és a 10-es számrendszer között"
        badge="Számítási eljárások"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A) Kettesből ➔ Tízesbe"
              badge="Összeadás"
              color="teal"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Írd fel a helyiértékeket a bináris jegyek fölé, és add össze az 1-esekhez tartozó értékeket:
              </p>
              <div className="p-3 bg-teal-50/60 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 text-xs font-mono space-y-1">
                <div className="text-slate-500">Példa: 10110₂</div>
                <div className="font-bold text-teal-800 dark:text-teal-300">
                  = 1·16 + 0·8 + 1·4 + 1·2 + 0·1
                </div>
                <div className="font-black text-slate-900 dark:text-white">
                  = 16 + 4 + 2 = 22
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="B) Tízesből ➔ Kettesbe"
              badge="Osztás 2-vel"
              color="indigo"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Folyamatosan osztunk 2-vel, és a maradékokat lentről felfelé (visszafelé) olvassuk ki:
              </p>
              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-mono space-y-1">
                <div className="text-slate-500">Példa: 13 átváltása:</div>
                <div>13 : 2 = 6, maradék <strong>1</strong> (utolsó jegy)</div>
                <div>6 : 2 = 3, maradék <strong>0</strong></div>
                <div>3 : 2 = 1, maradék <strong>1</strong></div>
                <div>1 : 2 = 0, maradék <strong>1</strong> (első jegy)</div>
                <div className="font-black text-indigo-800 dark:text-indigo-300 pt-1">
                  Eredmény lentről: 1101₂
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szakasz: Informatikai Alapok - Bit és Bájt */}
      <TheorySection
        number={4}
        title="Informatikai kitekintés: Bit, Bájt és 2-hatványok"
        badge="Digitális világ"
      >
        <div className="space-y-4">
          <TheoryCallout
            title="1 Bájt = 8 Bit"
            type="tip"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              A számítógép memóriájában a legkisebb egység a <strong>bit</strong> (0 vagy 1). 8 bit alkot <strong>1 bájtot (byte)</strong>.<br />
              1 bájttal $2^8 = 256$ különböző állapotot tudunk ábrázolni, $0$-tól $255$-ig ($11111111_2 = 255$).
            </p>
          </TheoryCallout>

          <TheoryTable
            headers={['Hatvány', 'Érték (Decimális)', 'Bináris alak', 'Gyakorlati szerep']}
            rows={[
              ['2⁰', '1', '1₂', 'Legkisebb helyiérték (páros/páratlan bit)'],
              ['2¹', '2', '10₂', 'Kettesek helyiértéke'],
              ['2²', '4', '100₂', 'Négyesek'],
              ['2³', '8', '1000₂', 'Fél bájt (nibble) legfelső bitje'],
              ['2⁴', '16', '10000₂', 'Tizenhatosok'],
              ['2⁵', '32', '100000₂', 'Harminckettesek'],
              ['2⁶', '64', '1000000₂', 'Hatvannégyesek'],
              ['2⁷', '128', '10000000₂', '1 bájt legfelső bitje'],
              ['2⁸', '256', '100000000₂', 'Bájt állapotainak száma']
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. Szakasz: Egyéb számrendszerek a történelemben */}
      <TheorySection
        number={5}
        title="Egyéb számrendszerek: 5-ös, 12-es és 60-as alap"
        badge="Történelem és mindennapok"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TheoryCard
              title="5-ös számrendszer"
              badge="Alap: 5"
              color="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Jegyek: 0, 1, 2, 3, 4. Helyiértékek: 1, 5, 25, 125 ($5^n$).
              </p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                23₅ = 2·5 + 3·1 = 13
              </div>
            </TheoryCard>

            <TheoryCard
              title="12-es számrendszer"
              badge="Tucat & Grosz"
              color="violet"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                1 tucat = 12 db. 1 grosz (nagytucat) = 12 · 12 = 144 db.
              </p>
              <div className="p-2 bg-violet-50 dark:bg-violet-950/30 rounded-xl border border-violet-200 dark:border-violet-800 text-xs font-mono font-bold text-violet-800 dark:text-violet-300">
                Könnyen osztható: 2, 3, 4, 6
              </div>
            </TheoryCard>

            <TheoryCard
              title="60-as számrendszer"
              badge="Babilon & Időmérés"
              color="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Babiloni eredetű: 1 óra = 60 perc, 1 perc = 60 másodperc, kör = 360°.
              </p>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
                Szögmérés és időmérés
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 6. Szakasz: Tipikus Tévhitek */}
      <TheorySection
        number={6}
        title="Tipikus Tévhitek és Csapdák"
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="A kettes számrendszer alapszámjegyei"
            wrong="A 2-es számrendszerben van 2-es számjegy (pl. 102₂)"
            correct="Csak 0 és 1 számjegy létezik! A 2 decimális értéke: 10₂"
            explanation="A kettes alap miatt csak 0 és 1 használható, a 2 már helyiérték-váltást jelent."
          />
          <TheoryTrapBox
            title="Bináris számok tízesként való kiolvasása"
            wrong="A 101₂ szám „százegy”"
            correct="A 101₂ szám decimális értéke: 4 + 1 = 5 (egy-nulla-egy kettes alapban)"
            explanation="A kettes számrendszerben a helyiértékek 4, 2, 1, nem pedig 100, 10, 1!"
          />
          <TheoryTrapBox
            title="Osztási maradékok sorrendje"
            wrong="A maradékokat felülről lefelé (elsőből utolsóba) írjuk le"
            correct="A maradékokat lentről felfelé (visszafelé) olvassuk ki"
            explanation="A 2-vel való első osztás maradéka adja a legkisebb (egyes) helyiértéket!"
          />
          <TheoryTrapBox
            title="A bájt maximális értéke"
            wrong="1 bájt = 256 mint maximális számérték"
            correct="1 bájt maximális értéke: 255 (mert 0-tól 255-ig van 256 állapot)"
            explanation="11111111₂ = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 (2⁸ - 1 = 255)."
          />
        </div>
      </TheorySection>

      {/* 7. Szakasz: Interaktív Bit Kapcsoló és Átváltó Labor (no-pdf) */}
      <TheorySection
        number={7}
        title="Interaktív Bináris Labor & Bit Kapcsolótábla"
        badge="Interaktív modul"
      >
        <div className="space-y-6 no-pdf">
          {/* 8-bit Interactive Switcher */}
          <div className="p-5 bg-gradient-to-br from-cyan-50/60 to-teal-50/60 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border border-cyan-200/80 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-cyan-600" />
                  8 bites kapcsolótábla (1 Bájt)
                </h3>
                <p className="text-xs text-slate-500">
                  Kattints a bitekre (0 és 1) a helyiértékek be- és kikapcsolásához!
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBits([0, 0, 0, 0, 0, 0, 0, 0])}
                className="rounded-xl h-7 px-2 text-[11px] font-bold"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Nullázás
              </Button>
            </div>

            {/* Bit Buttons Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {bits.map((bit, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold font-mono text-slate-400">
                    2^{7 - idx} ({bitValues[idx]})
                  </span>
                  <button
                    onClick={() => handleToggleBit(idx)}
                    className={cn(
                      "w-full h-14 rounded-2xl font-mono text-xl font-black transition-all flex flex-col items-center justify-center border-2 shadow-xs",
                      bit === 1
                        ? "bg-gradient-to-b from-cyan-500 to-teal-600 text-white border-cyan-400 ring-2 ring-cyan-400/30 scale-102"
                        : "bg-white dark:bg-slate-850 text-slate-400 border-slate-200 dark:border-slate-700 hover:border-cyan-300"
                    )}
                  >
                    <span>{bit}</span>
                    <span className="text-[9px] uppercase font-sans tracking-tighter opacity-80">
                      {bit === 1 ? 'BE' : 'KI'}
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* Live Calculation Display */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Bináris alak:</div>
                <div className="text-xl font-black font-mono text-cyan-600 dark:text-cyan-400">
                  {bits.join('')}₂
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Decimális összeg (10-es):</div>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  {calculatedDecimalFromBits}
                </div>
              </div>
            </div>
          </div>

          {/* Two-way converter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dec -> Bin */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Decimális ➔ Bináris átváltás:
              </div>
              <input
                type="number"
                min="0"
                max="1024"
                value={inputDecimal}
                onChange={(e) => setInputDecimal(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono font-bold bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500"
              />
              {decimalSteps && (
                <div className="p-3 bg-cyan-50/50 dark:bg-cyan-950/30 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-cyan-800 dark:text-cyan-300">
                    Eredmény: {decimalSteps.binary}₂
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Osztási maradékok lentről felfelé: {decimalSteps.binary}
                  </div>
                </div>
              )}
            </div>

            {/* Bin -> Dec */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Bináris ➔ Decimális átváltás:
              </div>
              <input
                type="text"
                value={inputBinary}
                onChange={(e) => setInputBinary(e.target.value.replace(/[^01]/g, ''))}
                placeholder="Csak 0 és 1 jegyek"
                className="w-full px-3 py-2 text-sm font-mono font-bold bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500"
              />
              {binarySteps && (
                <div className="p-3 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-teal-800 dark:text-teal-300">
                    Eredmény: {binarySteps.decimal}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Bontás: {binarySteps.terms.filter(t => t.bit === '1').map(t => t.placeValue).join(' + ')} = {binarySteps.decimal}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default NumberSystemsTheory;
