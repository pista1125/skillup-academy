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
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Calculator,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Scale,
  Binary,
  Compass,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegerPropertiesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const IntegerPropertiesTheory: React.FC<IntegerPropertiesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab State
  const [numA, setNumA] = useState<number>(-4);
  const [numB, setNumB] = useState<number>(3);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');

  const calculateResult = () => {
    switch (operation) {
      case '+':
        return numA + numB;
      case '-':
        return numA - numB;
      case '*':
        return numA * numB;
      case '/':
        if (numB === 0) return 'Értelmetlen (0-val nem osztunk!)';
        const res = numA / numB;
        return Number.isInteger(res) ? res : res.toFixed(2);
      default:
        return 0;
    }
  };

  const getExplanation = () => {
    if (operation === '+') {
      if ((numA >= 0 && numB >= 0) || (numA <= 0 && numB <= 0)) {
        return `Azonos előjelű számok összeadása: az abszolútértékeket összeadjuk (${Math.abs(numA)} + ${Math.abs(numB)} = ${Math.abs(numA) + Math.abs(numB)}), és a közös előjelet (${numA < 0 ? '-' : '+'}) megtartjuk.`;
      } else {
        const largerAbs = Math.abs(numA) >= Math.abs(numB) ? numA : numB;
        const smallerAbs = Math.abs(numA) >= Math.abs(numB) ? numB : numA;
        return `Különböző előjelű számok összeadása: a nagyobb abszolútértékű számból (${Math.abs(largerAbs)}) kivonjuk a kisebb abszolútértékűt (${Math.abs(smallerAbs)}), és a nagyobb abszolútértékű szám előjelét (${largerAbs < 0 ? 'negatív' : 'pozitív'}) kapja az eredmény.`;
      }
    } else if (operation === '-') {
      return `A kivonást visszavezetjük ellentett hozzáadására: (${numA}) - (${numB}) = (${numA}) + (${-numB}) = ${numA - numB}.`;
    } else if (operation === '*') {
      const sameSign = (numA >= 0 && numB >= 0) || (numA <= 0 && numB <= 0);
      return `Szorzás előjelszabálya: ${sameSign ? 'Azonos előjelű számok szorzata mindig POZITÍV (+)' : 'Különböző előjelű számok szorzata mindig NEGATÍV (-)'}. Abszolútértékek szorzata: ${Math.abs(numA)} · ${Math.abs(numB)} = ${Math.abs(numA * numB)}.`;
    } else {
      if (numB === 0) return 'Nullával való osztás a matematikában NEM ÉRTELMEZETT!';
      const sameSign = (numA >= 0 && numB > 0) || (numA <= 0 && numB < 0);
      return `Osztás előjelszabálya: ${sameSign ? 'Azonos előjelek hányadosa POZITÍV (+)' : 'Különböző előjelek hányadosa NEGATÍV (-)'}.`;
    }
  };

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-integer-properties-theory-doc"
      pdfFilename="7_osztaly_egesz_szamok_tulajdonsagai.pdf"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="1. Az egész számok tulajdonságainak áttekintése"
      subtitle="A számhalmazok rendszere (Z), ellentett és abszolútérték, alapműveletek előjelszabályai és a műveleti tulajdonságok"
      quickRule={{
        label: 'Előjelszabály szorzásnál/osztásnál',
        formula: '(+)·(+) = +,  (-)·(-) = +,  (+)·(-) = -'
      }}
      themeColor="purple"
      practiceTitle="Készen állsz az egész számok mesterszintű tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten részletes levezetésekkel, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: Számhalmazok és Számegyenes */}
      <TheorySection
        number={1}
        title="Az egész számok halmaza (Z) és a számegyenes"
        icon={<Binary className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A számhalmazok felépítése"
            badge="Alapfogalmak"
            variant="purple"
          >
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 min-w-[24px]">N:</span>
                <span><strong>Természetes számok halmaza:</strong> 0, 1, 2, 3, 4, 5, ... (megszámlálásra alkalmas nemnegatív egészek).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 min-w-[24px]">Z+:</span>
                <span><strong>Pozitív egész számok:</strong> 1, 2, 3, 4, 5, ... (nagyobbak 0-nál).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600 min-w-[24px]">Z-:</span>
                <span><strong>Negatív egész számok:</strong> -1, -2, -3, -4, -5, ... (kisebbek 0-nál).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-700 min-w-[24px]">Z:</span>
                <span><strong>Egész számok halmaza:</strong> a negatív egészek, a 0 és a pozitív egészek egyesítése: Z = Z- ∪ {'{0}'} ∪ Z+.</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Tájékozódás a számegyenesen és rendezés"
            badge="Szabályok"
            variant="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A számegyenesen a 0 a viszonyítási pont. Jobbra a pozitív számok növekednek, balra a negatív számok csökkennek.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-center space-y-1">
              <div className="text-purple-600 dark:text-purple-400">... &lt; -4 &lt; -3 &lt; -2 &lt; -1 &lt; 0 &lt; +1 &lt; +2 &lt; +3 &lt; +4 ...</div>
              <div className="text-[11px] text-slate-500 font-sans font-normal">A számegyenesen a jobbra lévő szám MINDIG nagyobb a balra lévőnél!</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Negatív számok összehasonlítása"
          variant="tip"
        >
          Két negatív szám közül az a <strong>nagyobb</strong>, amelyik közelebb van a 0-hoz a számegyenesen (tehát kisebb az abszolútértéke). Például: <strong>-3 &gt; -7</strong>, mert a -3 jobbra helyezkedik el a -7-hez képest.
        </TheoryCallout>
      </TheorySection>

      {/* SECTION 2: Ellentett és Abszolútérték */}
      <TheorySection
        number={2}
        title="Ellentett szám és abszolútérték"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Az ellentett szám fogalma"
            badge="Definíció"
            variant="blue"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy <strong>a</strong> szám <strong>ellentettje</strong> a számegyenesen a nullától azonos távolságra, de ellentétes irányban elhelyezkedő szám, jele: <strong>-a</strong>.
            </p>
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <div>• Bármely szám és ellentettjének összege mindig nulla: <strong>a + (-a) = 0</strong>.</div>
              <div>• Negatív szám ellentettje pozitív: <strong>-(-8) = +8 = 8</strong>.</div>
              <div>• A nulla ellentettje önmaga: <strong>-0 = 0</strong>.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Az abszolútérték (|a|)"
            badge="Geometriai távolság"
            variant="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy <strong>a</strong> szám <strong>abszolútértéke (|a|)</strong> a számnak a nullától mért távolsága a számegyenesen. Mivel a távolság soha nem lehet negatív:
            </p>
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-xs font-mono font-bold text-center space-y-1">
              <div className="text-indigo-700 dark:text-indigo-300">|5| = 5,  |-5| = 5,  |0| = 0</div>
              <div className="text-[11px] text-slate-500 font-sans font-normal">Minden 'a' valós számra: |a| ≥ 0 és |-a| = |a|</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Gyakori tévedés az abszolútértékkel és az ellentettel"
          wrong="|-9| = -9 (vagy: -a mindig negatív szám)"
          correct="|-9| = +9 és ha a = -5, akkor -a = -(-5) = +5 (pozitív szám!)"
          explanation="Az abszolútérték mindig nemnegatív (≥ 0). A '-a' kifejezés az 'a' szám ellentettjét jelöli, ami negatív 'a' esetén POZITÍV eredményt ad!"
        />
      </TheorySection>

      {/* SECTION 3: Összeadás és Kivonás */}
      <TheorySection
        number={3}
        title="Összeadás és kivonás az egész számok halmazán"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Összeadási szabályok"
            badge="Műveletek"
            variant="emerald"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div>
                <strong>1. Azonos előjelű számok:</strong> Az abszolútértékeket összeadjuk, és a közös előjelet megtartjuk.
                <div className="mt-1 font-mono font-bold text-emerald-700 dark:text-emerald-400 pl-2">
                  (+4) + (+6) = +10<br />
                  (-3) + (-5) = -8
                </div>
              </div>
              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <strong>2. Különböző előjelű számok:</strong> A nagyobb abszolútértékűből kivonjuk a kisebb abszolútértékűt, és a nagyobb abszolútértékű előjelét kapja.
                <div className="mt-1 font-mono font-bold text-emerald-700 dark:text-emerald-400 pl-2">
                  (+9) + (-4) = +5 (mivel |9| &gt; |-4|)<br />
                  (-12) + (+5) = -7 (mivel |-12| &gt; |5|)
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Kivonás és Zárójelfelbontás"
            badge="Kulcsszabály"
            variant="teal"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Kivonási alapszabály:</strong> Egy számból kivonni egy másikat annyit jelent, mint hozzáadni annak az ellentettjét: <strong>a - b = a + (-b)</strong>.
            </p>
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-slate-800 border border-teal-100 dark:border-slate-700 text-xs font-mono space-y-1">
              <div>7 - 12 = 7 + (-12) = -5</div>
              <div>(-4) - (+6) = (-4) + (-6) = -10</div>
              <div>(-3) - (-8) = (-3) + (+8) = +5</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          headers={['Zárójel előtti előjel', 'Zárójelen belüli előjel', 'Egyszerűsített alak', 'Konkrét példa']}
          rows={[
            ['+ (pozitív)', '+ (pozitív)', '+', '+(+5) = +5 = 5'],
            ['+ (pozitív)', '- (negatív)', '-', '+(-5) = -5'],
            ['- (negatív)', '+ (pozitív)', '-', '-(+5) = -5'],
            ['- (negatív)', '- (negatív)', '+', '-(-5) = +5 = 5']
          ]}
        />
      </TheorySection>

      {/* SECTION 4: Szorzás és Osztás Előjelszabályai */}
      <TheorySection
        number={4}
        title="Szorzás és osztás az egész számok körében"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Előjelszabály szorzásnál és osztásnál"
            badge="Szorzás & Osztás"
            variant="amber"
          >
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center justify-between p-1.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <span>(+) · (+) = <strong>(+)</strong> és (+) : (+) = <strong>(+)</strong></span>
                <span className="font-mono font-bold text-emerald-700">6 · 4 = +24</span>
              </li>
              <li className="flex items-center justify-between p-1.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <span>(-) · (-) = <strong>(+)</strong> és (-) : (-) = <strong>(+)</strong></span>
                <span className="font-mono font-bold text-emerald-700">(-6) · (-4) = +24</span>
              </li>
              <li className="flex items-center justify-between p-1.5 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
                <span>(+) · (-) = <strong>(-)</strong> és (+) : (-) = <strong>(-)</strong></span>
                <span className="font-mono font-bold text-rose-700">6 · (-4) = -24</span>
              </li>
              <li className="flex items-center justify-between p-1.5 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
                <span>(-) · (+) = <strong>(-)</strong> és (-) : (+) = <strong>(-)</strong></span>
                <span className="font-mono font-bold text-rose-700">(-6) · 4 = -24</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Többtényezős szorzatok & A nulla szerepe"
            badge="Speciális esetek"
            variant="rose"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Többtényezős szorzat előjele:</strong>
              </p>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono space-y-1">
                <div>• Páros számú negatív tényező → <strong>POZITÍV (+)</strong>: (-2)·(-3)·(-4)·(-1) = +24</div>
                <div>• Páratlan számú negatív tényező → <strong>NEGATÍV (-)</strong>: (-2)·(-3)·(-4) = -24</div>
              </div>
              <p className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <strong>A nulla a szorzásban és osztásban:</strong><br />
                • a · 0 = 0 és 0 : a = 0 (ha a ≠ 0)<br />
                • <strong>Nullával osztani NEM LEHET!</strong> (a : 0 értelmetlen kifejezés).
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Műveleti Tulajdonságok */}
      <TheorySection
        number={5}
        title="Műveleti tulajdonságok és azonosságok"
        icon={<Layers className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Kommutativitás"
            badge="Felcserélhetőség"
            variant="cyan"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A tagok és szorzótényezők sorrendje felcserélhető, az eredmény nem változik:
            </p>
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-slate-800 border border-cyan-100 dark:border-slate-700 text-xs font-mono font-bold space-y-1 text-center">
              <div className="text-cyan-800 dark:text-cyan-300">a + b = b + a</div>
              <div className="text-cyan-800 dark:text-cyan-300">a · b = b · a</div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              ⚠️ A kivonás és az osztás NEM kommutatív! (5 - 3 ≠ 3 - 5)
            </p>
          </TheoryCard>

          <TheoryCard
            title="Asszociativitás"
            badge="Csoportosíthatóság"
            variant="blue"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Az összeadások és szorzások tetszőlegesen csoportosíthatók zárójelekkel:
            </p>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-xs font-mono font-bold space-y-1 text-center">
              <div className="text-blue-800 dark:text-blue-300">(a + b) + c = a + (b + c)</div>
              <div className="text-blue-800 dark:text-blue-300">(a · b) · c = a · (b · c)</div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Pl. (-5 · 17) · (-2) = (-5 · -2) · 17 = 10 · 17 = 170.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Disztributivitás"
            badge="Széttagolhatóság"
            variant="purple"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A szorzás a zárójeles összeg minden tagjára tagonként elvégezhető:
            </p>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-xs font-mono font-bold space-y-1 text-center">
              <div className="text-purple-800 dark:text-purple-300">a · (b + c) = a·b + a·c</div>
              <div className="text-purple-800 dark:text-purple-300">(a + b) : c = a:c + b:c</div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Pl. 6 · (10 - 2) = 6 · 10 - 6 · 2 = 60 - 12 = 48.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* INTERACTIVE LAB: Egész Számok & Műveletvizsgáló Labor */}
      <div className="no-pdf p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-850 dark:via-purple-950/20 dark:to-slate-900 border-2 border-purple-200/80 dark:border-purple-900/60 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-100 dark:border-purple-900/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív Művelet- és Előjelvizsgáló Labor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Próbáld ki a különböző előjelű egész számok közötti alapműveleteket és figyeld meg az azonnali levezetést!
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
            Interaktív Eszköz
          </span>
        </div>

        {/* Input selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Operand A */}
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>'a' szám értéke:</span>
              <span className="font-mono text-purple-600 dark:text-purple-400 text-sm font-black">{numA}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[-10, -5, -4, -1, 0, 2, 5, 8].map((val) => (
                <button
                  key={val}
                  onClick={() => setNumA(val)}
                  className={cn(
                    "px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all border",
                    numA === val
                      ? "bg-purple-600 text-white border-purple-700 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-300"
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Operation Selector */}
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 text-center">
            <div className="text-xs font-bold text-slate-500">Művelet:</div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['+', '-', '*', '/'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  className={cn(
                    "py-2 rounded-xl text-base font-mono font-black transition-all border",
                    operation === op
                      ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-300"
                  )}
                >
                  {op === '*' ? '·' : op === '/' ? ':' : op}
                </button>
              ))}
            </div>
          </div>

          {/* Operand B */}
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>'b' szám értéke:</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm font-black">{numB}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[-8, -5, -3, -1, 0, 2, 3, 6].map((val) => (
                <button
                  key={val}
                  onClick={() => setNumB(val)}
                  className={cn(
                    "px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all border",
                    numB === val
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Calculation Display */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kifejezés és Eredmény:
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>({numA})</span>
              <span className="text-purple-600">{operation === '*' ? '·' : operation === '/' ? ':' : operation}</span>
              <span>({numB})</span>
              <span className="text-slate-400">=</span>
              <span className="text-purple-600 dark:text-purple-400 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
                {calculateResult()}
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-purple-50/50 dark:bg-slate-850 p-3 rounded-xl border border-purple-100 dark:border-slate-800">
            <strong>Módszertani magyarázat:</strong> {getExplanation()}
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};
