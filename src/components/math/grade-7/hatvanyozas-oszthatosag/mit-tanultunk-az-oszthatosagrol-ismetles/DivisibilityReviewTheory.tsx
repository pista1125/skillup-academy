import React, { useState, useMemo } from 'react';
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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Hash,
  Sparkles,
  Layers,
  HelpCircle,
  RotateCcw,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface DivisibilityReviewTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface DivisorCheckResult {
  divisor: number;
  isDivisible: boolean;
  ruleName: string;
  ruleExplanation: string;
  stepDetails: string;
}

export const DivisibilityReviewTheory: React.FC<DivisibilityReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Divisibility Lab state
  const [testNumberInput, setTestNumberInput] = useState<string>('2520');
  const [selectedDivisor, setSelectedDivisor] = useState<number | null>(6);

  const parsedNumber = useMemo(() => {
    const cleaned = testNumberInput.replace(/\s+/g, '');
    const num = parseInt(cleaned, 10);
    return isNaN(num) || num <= 0 ? 0 : Math.min(num, 999999999);
  }, [testNumberInput]);

  // Compute divisibility results for interactive lab
  const divisorResults: DivisorCheckResult[] = useMemo(() => {
    if (parsedNumber <= 0) return [];

    const numStr = parsedNumber.toString();
    const last1 = parseInt(numStr.slice(-1), 10);
    const last2 = parseInt(numStr.slice(-2), 10);
    const last3 = parseInt(numStr.slice(-3), 10);
    const digits = numStr.split('').map(d => parseInt(d, 10));
    const digitSum = digits.reduce((acc, curr) => acc + curr, 0);

    const rules: { divisor: number; ruleName: string; check: () => { isDiv: boolean; rule: string; step: string } }[] = [
      {
        divisor: 2,
        ruleName: 'Utolsó számjegy páros',
        check: () => {
          const isDiv = parsedNumber % 2 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 2-vel, ha az utolsó számjegye páros (0, 2, 4, 6, 8).',
            step: `Utolsó számjegy: ${last1} → ${isDiv ? 'páros, így osztható 2-vel.' : 'páratlan, így NEM osztható 2-vel.'}`
          };
        }
      },
      {
        divisor: 3,
        ruleName: 'Számjegyek összege osztható 3-mal',
        check: () => {
          const isDiv = parsedNumber % 3 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 3-mal, ha a számjegyeinek összege osztható 3-mal.',
            step: `Számjegyek összege: ${digits.join(' + ')} = ${digitSum} → ${digitSum} ${isDiv ? 'osztható 3-mal (mert ' + digitSum + ' : 3 = ' + (digitSum / 3) + ').' : 'NEM osztható 3-mal.'}`
          };
        }
      },
      {
        divisor: 4,
        ruleName: 'Utolsó két számjegy osztható 4-gyel',
        check: () => {
          const isDiv = parsedNumber % 4 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 4-gyel, ha az utolsó két számjegyéből álló szám osztható 4-gyel (vagy 00).',
            step: `Utolsó két számjegy: ${numStr.length === 1 ? numStr : numStr.slice(-2)} → ${last2} ${isDiv ? 'osztható 4-gyel (mert ' + last2 + ' : 4 = ' + (last2 / 4) + ').' : 'NEM osztható 4-gyel.'}`
          };
        }
      },
      {
        divisor: 5,
        ruleName: 'Utolsó számjegy 0 vagy 5',
        check: () => {
          const isDiv = parsedNumber % 5 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 5-tel, ha az utolsó számjegye 0 vagy 5.',
            step: `Utolsó számjegy: ${last1} → ${isDiv ? '0 vagy 5, így osztható 5-tel.' : 'nem 0 és nem 5, így NEM osztható 5-tel.'}`
          };
        }
      },
      {
        divisor: 6,
        ruleName: 'Osztható 2-vel ÉS 3-mal',
        check: () => {
          const div2 = parsedNumber % 2 === 0;
          const div3 = parsedNumber % 3 === 0;
          const isDiv = div2 && div3;
          return {
            isDiv,
            rule: 'Mivel 6 = 2 · 3 és a 2, 3 relatív prímek, a szám akkor osztható 6-tal, ha 2-vel és 3-mal is osztható.',
            step: `2-vel való oszthatóság: ${div2 ? 'TELJESÜL' : 'NEM'} (páros). 3-mal való oszthatóság: ${div3 ? 'TELJESÜL' : 'NEM'} (összeg = ${digitSum}). → Összesítve: ${isDiv ? 'Osztható 6-tal.' : 'NEM osztható 6-tal.'}`
          };
        }
      },
      {
        divisor: 8,
        ruleName: 'Utolsó 3 számjegy osztható 8-cal',
        check: () => {
          const isDiv = parsedNumber % 8 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 8-cal, ha az utolsó három számjegyéből képzett szám osztható 8-cal (vagy 000).',
            step: `Utolsó három számjegy: ${numStr.length < 3 ? numStr : numStr.slice(-3)} → ${last3} ${isDiv ? 'osztható 8-cal (mert ' + last3 + ' : 8 = ' + (last3 / 8) + ').' : 'NEM osztható 8-cal.'}`
          };
        }
      },
      {
        divisor: 9,
        ruleName: 'Számjegyek összege osztható 9-cel',
        check: () => {
          const isDiv = parsedNumber % 9 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 9-cel, ha a számjegyeinek összege osztható 9-cel.',
            step: `Számjegyek összege: ${digits.join(' + ')} = ${digitSum} → ${digitSum} ${isDiv ? 'osztható 9-cel (mert ' + digitSum + ' : 9 = ' + (digitSum / 9) + ').' : 'NEM osztható 9-cel.'}`
          };
        }
      },
      {
        divisor: 10,
        ruleName: 'Utolsó számjegy 0',
        check: () => {
          const isDiv = parsedNumber % 10 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 10-zel, ha az utolsó számjegye 0.',
            step: `Utolsó számjegy: ${last1} → ${isDiv ? '0, így osztható 10-zel.' : 'nem 0, így NEM osztható 10-zel.'}`
          };
        }
      },
      {
        divisor: 12,
        ruleName: 'Osztható 3-mal ÉS 4-gyel',
        check: () => {
          const div3 = parsedNumber % 3 === 0;
          const div4 = parsedNumber % 4 === 0;
          const isDiv = div3 && div4;
          return {
            isDiv,
            rule: 'Mivel 12 = 3 · 4 és a 3, 4 relatív prímek, a szám akkor osztható 12-vel, ha 3-mal és 4-gyel is osztható.',
            step: `3-mal: ${div3 ? 'IGEN' : 'NEM'} (összeg = ${digitSum}). 4-gyel: ${div4 ? 'IGEN' : 'NEM'} (utolsó 2 jegy: ${last2}). → Összesítve: ${isDiv ? 'Osztható 12-vel.' : 'NEM osztható 12-vel.'}`
          };
        }
      },
      {
        divisor: 15,
        ruleName: 'Osztható 3-mal ÉS 5-tel',
        check: () => {
          const div3 = parsedNumber % 3 === 0;
          const div5 = parsedNumber % 5 === 0;
          const isDiv = div3 && div5;
          return {
            isDiv,
            rule: 'Mivel 15 = 3 · 5 és a 3, 5 relatív prímek, a szám akkor osztható 15-tel, ha 3-mal és 5-tel is osztható.',
            step: `3-mal: ${div3 ? 'IGEN' : 'NEM'} (összeg = ${digitSum}). 5-tel: ${div5 ? 'IGEN' : 'NEM'} (utolsó jegy: ${last1}). → Összesítve: ${isDiv ? 'Osztható 15-tel.' : 'NEM osztható 15-tel.'}`
          };
        }
      },
      {
        divisor: 25,
        ruleName: 'Utolsó 2 számjegy 00, 25, 50 vagy 75',
        check: () => {
          const isDiv = parsedNumber % 25 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 25-tel, ha az utolsó két számjegyéből álló szám osztható 25-tel (00, 25, 50, 75).',
            step: `Utolsó két számjegy: ${numStr.length === 1 ? numStr : numStr.slice(-2)} → ${isDiv ? 'osztható 25-tel.' : 'NEM 00, 25, 50 vagy 75, így nem osztható 25-tel.'}`
          };
        }
      },
      {
        divisor: 100,
        ruleName: 'Utolsó 2 számjegy 00',
        check: () => {
          const isDiv = parsedNumber % 100 === 0;
          return {
            isDiv,
            rule: 'Egy szám akkor osztható 100-zal, ha az utolsó két számjegye 00.',
            step: `Utolsó két számjegy: ${numStr.length === 1 ? numStr : numStr.slice(-2)} → ${isDiv ? '00, így osztható 100-zal.' : 'nem 00, így NEM osztható 100-zal.'}`
          };
        }
      }
    ];

    return rules.map(r => {
      const res = r.check();
      return {
        divisor: r.divisor,
        isDivisible: res.isDiv,
        ruleName: r.ruleName,
        ruleExplanation: res.rule,
        stepDetails: res.step
      };
    });
  }, [parsedNumber]);

  const activeResult = useMemo(() => {
    if (!selectedDivisor) return null;
    return divisorResults.find(r => r.divisor === selectedDivisor) || null;
  }, [selectedDivisor, divisorResults]);

  return (
    <TheoryTemplate
      title="Mit tanultunk az oszthatóságról? (Ismétlés)"
      subtitle="Elevenítsük fel az oszthatóság fogalmát, a tízes számrendszerbeli gyors osztási szabályokat (2, 3, 4, 5, 8, 9, 10, 25, 100), az összetett oszthatóságokat, valamint az összegek és szorzatok oszthatósági törvényszerűségeit!"
      badgeText="7. Osztály • Matematika IV. Témakör • 3. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="🔄"
      themeColor="blue"
      documentId="g7-powers-divisibility-review-theory-doc"
      pdfFilename="7_osztaly_oszthatosag_ismetles_tananyag.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Oszthatósági Alaptörvények',
        formula: '2, 5, 10 (utolsó 1)  |  4, 25, 100 (utolsó 2)  |  8 (utolsó 3)  |  3, 9 (számjegyösszeg)  |  c|a és c|b ⟹ c|(a ± b)  |  c|a ⟹ c|(a · b)'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="16 perc"
    >
      {/* 1. SZEKCIÓ: AZ OSZTHATÓSÁG ALAPFOGALMAI */}
      <TheorySection
        title="1. Az Oszthatóság Fogalma és Jelölése"
        subtitle="Mikor mondjuk, hogy egy szám osztója egy másiknak? Hogyan jelöljük precízen?"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard title="Pontos matematikai definíció">
          <p className="mb-3">
            Egy <em>a</em> egész számot akkor nevezünk egy <em>b</em> egész szám <strong>osztójának</strong>, ha létezik olyan <em>k</em> egész szám, amelyre:
          </p>
          <div className="p-3 my-2 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-bold text-base text-blue-900 dark:text-blue-200">
            b = a · k &nbsp;&nbsp; <span className="text-sm font-normal text-slate-600 dark:text-slate-400">(vagyis az osztás maradék nélkül elvégezhető)</span>
          </div>
          <p className="mt-3">
            <strong>Jelölés:</strong> <span className="font-bold text-blue-700 dark:text-blue-300">a | b</span> (olvasd: <em>„a osztója b-nek”</em>, vagy <em>„b osztható a-val”</em>).<br />
            Ha nem osztója: <span className="font-bold text-rose-600 dark:text-rose-400">a ∤ b</span> (pl. <strong>3 ∤ 10</strong>).
          </p>
        </TheoryCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-1">1. Alapszabály: Az 1-es</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az <strong>1 minden egész számnak osztója</strong>, hiszen <strong>b = 1 · b</strong>.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-1">2. Alapszabály: Önmagunk</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Minden nemnulla szám <strong>önmagának osztója</strong> (<strong>a | a</strong>), mert <strong>a = a · 1</strong>.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-1">3. Alapszabály: A Nulla</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A 0-nak <strong>minden nemnulla szám osztója</strong> (<strong>a | 0</strong>, mert <strong>0 = a · 0</strong>). Viszont <strong>0-val nem osztunk</strong>!
            </p>
          </div>
        </div>

        <TheoryTrapBox title="Gyakori Csapda: Ki oszt kit? (a | b vs. b / a)">
          <p className="text-xs mb-2">
            A függőleges vonal (<strong>|</strong>) <strong>reláció</strong> (állítás), nem művelet!
          </p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li><strong>3 | 12</strong> jelentése: „3 osztója a 12-nek” (<strong>IGAZ</strong>).</li>
            <li><strong>12 | 3</strong> jelentése: „12 osztója a 3-nak” (<strong>HAMIS!</strong>).</li>
            <li>A törtvonal (<strong>12 / 3 = 4</strong>) a művelet (hányados), míg az osztási jel (<strong>3 | 12</strong>) egy logikai állítás.</li>
          </ul>
        </TheoryTrapBox>
      </TheorySection>

      {/* 2. SZEKCIÓ: UTOLSÓ SZÁMJEGYEK ALAPJÁN */}
      <TheorySection
        title="2. Oszthatóság az Utolsó Számjegyek Alapján"
        subtitle="Miért elég csak az utolsó egy, kettő vagy három számjegyet megnézni?"
        icon={<Sparkles className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCallout variant="info" title="Miért működik a helyiértékes szabály?">
          <p className="text-xs">
            Bármely többjegyű szám felírható tízes helyiértékek összegeként:
            <br />
            <span className="font-semibold text-indigo-900 dark:text-indigo-200">
              N = a<sub>n</sub> · 10<sup>n</sup> + … + a<sub>2</sub> · 100 + a<sub>1</sub> · 10 + a<sub>0</sub>
            </span>
            <br />
            Mivel a <strong>10</strong> osztható 2-vel és 5-tel, a tízes, százas, ezres tagok mind oszthatók 2-vel és 5-tel! Így az egész szám oszthatósága <strong>kizárólag az utolsó jegytől (a<sub>0</sub>) függ</strong>!
          </p>
        </TheoryCallout>

        <TheoryTable
          headers={['Osztó', 'Szabály leírása', 'Mit kell vizsgálni?', 'Példák']}
          rows={[
            [
              '2',
              'Az utolsó számjegy páros: 0, 2, 4, 6, 8',
              'Utolsó 1 számjegy',
              '538 (8 páros ✓), 1 405 (5 páratlan ✗)'
            ],
            [
              '5',
              'Az utolsó számjegy 0 vagy 5',
              'Utolsó 1 számjegy',
              '785 (5 ✓), 1 230 (0 ✓), 452 (2 ✗)'
            ],
            [
              '10',
              'Az utolsó számjegy 0',
              'Utolsó 1 számjegy',
              '4 590 (0 ✓), 305 (nem 0 ✗)'
            ],
            [
              '4',
              'Az utolsó 2 számjegyből álló szám osztható 4-gyel (vagy 00)',
              'Utolsó 2 számjegy (mert 100 osztható 4-gyel)',
              '3 524 (24 : 4 = 6 ✓), 7 118 (18 : 4 = 4,5 ✗)'
            ],
            [
              '25',
              'Az utolsó 2 számjegy: 00, 25, 50 vagy 75',
              'Utolsó 2 számjegy (mert 100 osztható 25-tel)',
              '1 875 (75 ✓), 4 500 (00 ✓), 920 (20 ✗)'
            ],
            [
              '100',
              'Az utolsó 2 számjegy 00',
              'Utolsó 2 számjegy',
              '7 600 (00 ✓), 7 060 (nem 00 ✗)'
            ],
            [
              '8',
              'Az utolsó 3 számjegyből álló szám osztható 8-cal (vagy 000)',
              'Utolsó 3 számjegy (mert 1000 osztható 8-cal)',
              '12 168 (168 : 8 = 21 ✓), 5 012 (12 nem ✗)'
            ],
            [
              '125',
              'Az utolsó 3 számjegy: 000, 125, 250, 375, 500, 625, 750, 875',
              'Utolsó 3 számjegy (mert 1000 = 8 · 125)',
              '4 375 (375 ✓), 2 550 (550 ✗)'
            ]
          ]}
        />
      </TheorySection>
      {/* 3. SZEKCIÓ: SZÁMJEGYEK ÖSSZEGE */}
      <TheorySection
        title="3. Oszthatóság a Számjegyek Összege Alapján (3 és 9)"
        subtitle="A számjegyek helyétől független mágikus szabályok"
        icon={<Binary className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          <TheoryCard title="3-mal való oszthatóság">
            <p className="text-xs mb-2">
              Egy természetes szám akkor és csak akkor osztható <strong>3-mal</strong>, ha a <strong>számjegyeinek összege osztható 3-mal</strong>.
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-xs space-y-1">
              <div><strong>Példa:</strong> 4 518</div>
              <div><strong>Összeg:</strong> 4 + 5 + 1 + 8 = 18</div>
              <div className="text-purple-700 dark:text-purple-300 font-semibold">18 : 3 = 6 (maradék 0) → <strong>4 518 osztható 3-mal!</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard title="9-cel való oszthatóság">
            <p className="text-xs mb-2">
              Egy természetes szám akkor és csak akkor osztható <strong>9-cel</strong>, ha a <strong>számjegyeinek összege osztható 9-cel</strong>.
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-xs space-y-1">
              <div><strong>Példa:</strong> 7 362</div>
              <div><strong>Összeg:</strong> 7 + 3 + 6 + 2 = 18</div>
              <div className="text-indigo-700 dark:text-indigo-300 font-semibold">18 : 9 = 2 (maradék 0) → <strong>7 362 osztható 9-cel!</strong></div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="tip" title="Fontos Logikai Kapcsolat 3 és 9 között">
          <ul className="text-xs space-y-1.5 list-disc list-inside">
            <li><strong>Ha egy szám osztható 9-cel, akkor BIZTOSAN osztható 3-mal is!</strong> (Hiszen 9 többszöröse 3-nak).</li>
            <li><strong>Fordítva NEM igaz:</strong> Ha egy szám osztható 3-mal, <em>nem biztos</em>, hogy 9-cel is osztható! (Például 12 és 15 osztható 3-mal, de nem osztható 9-cel).</li>
          </ul>
        </TheoryCallout>

        <TheoryCard title="Miért működik a számjegyösszeg? (A 9-esek trükkje)">
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>Nézzük meg a tízes helyiértékeket:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 font-bold border border-purple-200 dark:border-purple-800">
                10 = 9 + 1
              </div>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 font-bold border border-purple-200 dark:border-purple-800">
                100 = 99 + 1
              </div>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 font-bold border border-purple-200 dark:border-purple-800">
                1 000 = 999 + 1
              </div>
            </div>
            <p className="mt-2">
              Mivel a <strong>9, 99, 999, …</strong> mind oszthatók 9-cel (és így 3-mal is), bármely szám felbontásakor a 9-cel osztható részek után pontosan a <strong>számjegyek összege marad meg maradéknak</strong>!
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÖSSZEG ÉS SZORZAT OSZTHATÓSÁGA */}
      <TheorySection
        title="4. Összeg, Különbség és Szorzat Oszthatósága"
        subtitle="Hogyan viselkedik az oszthatóság az alapműveletek során?"
        icon={<Layers className="w-6 h-6 text-emerald-600" />}
      >
        <div className="space-y-4">
          <TheoryCard title="Összeg és Különbség Oszthatósági Szabályai">
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">1. Ha minden tag osztható:</span>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  Ha egy szám osztója az összeg minden tagjának, akkor osztója az összegnek és a különbségnek is:
                </p>
                <div className="mt-1.5 p-2 bg-white/80 dark:bg-slate-900/60 rounded font-semibold text-emerald-900 dark:text-emerald-200">
                  Ha c | a és c | b ⟹ c | (a + b) és c | (a - b).
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  <em>Példa:</em> 5 | 25 és 5 | 40 ⟹ 5 | (25 + 40 = 65).
                </p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-800 dark:text-amber-300">2. Ha pontosan egy tag NEM osztható:</span>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  Ha az összeg egyik tagja nem osztható a számmal, de a többi igen, akkor az összeg <strong>BIZTOSAN NEM OSZTHATÓ</strong>!
                </p>
                <div className="mt-1.5 p-2 bg-white/80 dark:bg-slate-900/60 rounded font-semibold text-amber-900 dark:text-amber-200">
                  Ha c | a, de c ∤ b ⟹ c ∤ (a + b) és c ∤ (a - b).
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  <em>Példa:</em> 4 | 20, de 4 ∤ 7 ⟹ 4 ∤ (20 + 7 = 27).
                </p>
              </div>
            </div>
          </TheoryCard>

          <TheoryTrapBox title="A Legveszélyesebb Csapda: Ha két tag NEM osztható!">
            <p className="text-xs mb-2">
              Ha az összeg mindkét tagja nem osztható egy számmal, abból <strong>NEM KÖVETKEZIK</strong>, hogy az összeg sem osztható! Az összeg lehet osztható is!
            </p>
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <div><strong>Példa 1:</strong> 3 ∤ 4 és 3 ∤ 5, DE 4 + 5 = 9, és <strong>3 | 9</strong>!</div>
              <div><strong>Példa 2:</strong> 5 ∤ 12 és 5 ∤ 13, DE 12 + 13 = 25, és <strong>5 | 25</strong>!</div>
            </div>
          </TheoryTrapBox>

          <TheoryCard title="Szorzat Oszthatósága">
            <p className="text-xs mb-2 text-slate-600 dark:text-slate-300">
              Egy szorzat akkor is osztható egy számmal, ha <strong>legalább az egyik tényezője osztható vele</strong>:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Ha <strong className="text-emerald-700 dark:text-emerald-300">c | a</strong>, akkor <strong className="text-emerald-700 dark:text-emerald-300">c | (a · b)</strong> minden egész b-re.</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-emerald-400">
                <strong>Példa:</strong> Mivel <strong>7 | 14</strong>, ezért <strong>7 | (14 · 893 · 125)</strong> a szorzat kiszámítása nélkül is azonnal tudható!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ÖSSZETETT OSZTHATÓSÁGI SZABÁLYOK */}
      <TheorySection
        title="5. Összetett Oszthatósági Szabályok (Relatív Prímek)"
        subtitle="Hogyan vizsgálunk oszthatóságot 6-tal, 12-vel, 15-tel, 18-cal, 36-tal vagy 45-tel?"
        icon={<Lightbulb className="w-6 h-6 text-amber-600" />}
      >
        <TheoryCallout variant="warning" title="Alapszabály: Csak Relatív Prím Tényezők Szorzatára bontható!">
          <p className="text-xs">
            Egy szám akkor osztható <strong>a · b</strong>-vel, ha osztható <em>a</em>-val és <em>b</em>-vel is, <strong>FELTÉVE, HOGY <em>a</em> és <em>b</em> relatív prímek</strong> (vagyis a legnagyobb közös osztójuk 1: lnko(a, b) = 1).
          </p>
        </TheoryCallout>

        <TheoryTable
          headers={['Összetett osztó', 'Felbontás (Relatív prímek)', 'Szabály', 'Példa']}
          rows={[
            [
              '6',
              '2 · 3',
              'Páros (2-vel osztható) ÉS számjegyösszege osztható 3-mal',
              '534 (páros, összeg=12 ✓)'
            ],
            [
              '12',
              '3 · 4 (relatív prímek!)',
              'Számjegyösszege osztható 3-mal ÉS utolsó 2 jegye osztható 4-gyel',
              '432 (összeg=9 ✓, 32:4=8 ✓)'
            ],
            [
              '15',
              '3 · 5',
              'Utolsó jegy 0 vagy 5 ÉS számjegyösszege osztható 3-mal',
              '645 (5-re végződik ✓, összeg=15 ✓)'
            ],
            [
              '18',
              '2 · 9',
              'Páros szám ÉS a számjegyeinek összege osztható 9-cel',
              '792 (páros ✓, összeg=18 ✓)'
            ],
            [
              '36',
              '4 · 9',
              'Utolsó 2 jegye osztható 4-gyel ÉS számjegyösszege osztható 9-cel',
              '1 476 (76:4=19 ✓, összeg=18 ✓)'
            ],
            [
              '45',
              '5 · 9',
              'Utolsó jegy 0 vagy 5 ÉS számjegyösszege osztható 9-cel',
              '2 835 (5-re végződik ✓, összeg=18 ✓)'
            ]
          ]}
        />

        <TheoryTrapBox title="Miért Tilos a 12-t 2 · 6-ra bontani?">
          <p className="text-xs leading-relaxed">
            A 2 és a 6 <strong>nem relatív prímek</strong>, mert mindkettő osztható 2-vel (lnko(2, 6) = 2).
            <br />
            <strong>Ellenpélda:</strong> A <strong>18</strong> osztható 2-vel (páros) és osztható 6-tal is (18 : 6 = 3), <strong>DE NEM osztható 12-vel</strong> (18 : 12 = 1,5)!
            <br />
            Ezért a 12-t kötelezően a <strong>3 és 4</strong> relatív prím párral kell vizsgálni!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* INTERAKTÍV OSZTHATÓSÁG-VIZSGÁLÓ LABOR */}
      <div className="my-10 p-5 sm:p-7 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 rounded-2xl border-2 border-blue-300 dark:border-blue-700/60 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Interaktív Oszthatóság-Vizsgáló Labor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Írj be tetszőleges számot (vagy válassz a mintákból), és vizsgáld meg azonnal az oszthatóságát lépésről lépésre!
              </p>
            </div>
          </div>
        </div>

        {/* Input bar and Presets */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">Szám:</span>
            <input
              type="number"
              min="1"
              max="999999999"
              value={testNumberInput}
              onChange={(e) => setTestNumberInput(e.target.value)}
              className="w-full pl-16 pr-4 py-2.5 rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="pl. 2520"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Gyors minták:</span>
            {['360', '1440', '2520', '3750', '9855', '12345'].map((sample) => (
              <button
                key={sample}
                onClick={() => setTestNumberInput(sample)}
                className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 transition-colors cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Divisors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 mb-6">
          {divisorResults.map((r) => {
            const isSelected = selectedDivisor === r.divisor;
            return (
              <button
                key={r.divisor}
                onClick={() => setSelectedDivisor(r.divisor)}
                className={cn(
                  "p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative",
                  isSelected
                    ? "ring-2 ring-blue-500 scale-102 shadow-md z-10"
                    : "hover:scale-101 hover:shadow-xs",
                  r.isDivisible
                    ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200"
                    : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-lg font-black font-mono">:{r.divisor}</span>
                  {r.isDivisible ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {r.isDivisible ? 'Osztható' : 'Nem osztható'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected divisor detail card */}
        {activeResult && (
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-850 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-black font-mono",
                  activeResult.isDivisible ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
                )}>
                  {parsedNumber} : {activeResult.divisor}
                </span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Szabály: {activeResult.ruleName}
                </span>
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                activeResult.isDivisible ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "text-rose-600 bg-rose-50 dark:bg-rose-950"
              )}>
                {activeResult.isDivisible ? '✓ Igen, osztható!' : '✗ Nem osztható!'}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              {activeResult.ruleExplanation}
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Lépésről lépésre ellenőrzés:
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {activeResult.stepDetails}
              </div>
              {activeResult.isDivisible && (
                <div className="mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                  Pontos hányados: {parsedNumber} : {activeResult.divisor} = {parsedNumber / activeResult.divisor}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </TheoryTemplate>
  );
};

export default DivisibilityReviewTheory;
