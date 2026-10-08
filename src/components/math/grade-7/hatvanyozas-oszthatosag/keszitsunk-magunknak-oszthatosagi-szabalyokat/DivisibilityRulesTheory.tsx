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
import { Input } from '@/components/ui/input';
import {
  Wrench,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Hash,
  ShieldCheck,
  Binary,
  Layers,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface DivisibilityRulesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface CompositeRuleConfig {
  divisor: number;
  factorA: number;
  factorB: number;
  nameA: string;
  nameB: string;
  ruleA: string;
  ruleB: string;
  badFactors?: string;
  badExplanation?: string;
}

const COMPOSITE_RULES: CompositeRuleConfig[] = [
  {
    divisor: 6,
    factorA: 2,
    factorB: 3,
    nameA: 'Osztható 2-vel',
    nameB: 'Osztható 3-mal',
    ruleA: 'Páros szám (utolsó számjegye 0, 2, 4, 6 vagy 8)',
    ruleB: 'A számjegyek összege osztható 3-mal'
  },
  {
    divisor: 12,
    factorA: 3,
    factorB: 4,
    nameA: 'Osztható 3-mal',
    nameB: 'Osztható 4-gyel',
    ruleA: 'A számjegyek összege osztható 3-mal',
    ruleB: 'Az utolsó két számjegyéből álló szám osztható 4-gyel',
    badFactors: '2 · 6',
    badExplanation: 'A 2 és a 6 nem relatív prímek (LNKO = 2). Pl. a 18 osztható 2-vel és 6-tal is, de 12-vel NEM!'
  },
  {
    divisor: 15,
    factorA: 3,
    factorB: 5,
    nameA: 'Osztható 3-mal',
    nameB: 'Osztható 5-tel',
    ruleA: 'A számjegyek összege osztható 3-mal',
    ruleB: 'Az utolsó számjegye 0 vagy 5'
  },
  {
    divisor: 18,
    factorA: 2,
    factorB: 9,
    nameA: 'Osztható 2-vel',
    nameB: 'Osztható 9-cel',
    ruleA: 'Páros szám (utolsó jegy: 0, 2, 4, 6, 8)',
    ruleB: 'A számjegyek összege osztható 9-cel',
    badFactors: '3 · 6',
    badExplanation: 'A 3 és 6 nem relatív prímek (LNKO = 3). Pl. a 24 osztható 3-mal és 6-tal is, de 18-cal NEM!'
  },
  {
    divisor: 20,
    factorA: 4,
    factorB: 5,
    nameA: 'Osztható 4-gyel',
    nameB: 'Osztható 5-tel',
    ruleA: 'Az utolsó két számjegye osztható 4-gyel',
    ruleB: 'Az utolsó számjegye 0 vagy 5 (együtt: 00, 20, 40, 60, 80-ra végződik)'
  },
  {
    divisor: 24,
    factorA: 3,
    factorB: 8,
    nameA: 'Osztható 3-mal',
    nameB: 'Osztható 8-cal',
    ruleA: 'A számjegyek összege osztható 3-mal',
    ruleB: 'Az utolsó 3 számjegyéből álló szám osztható 8-cal',
    badFactors: '4 · 6',
    badExplanation: 'A 4 és 6 nem relatív prímek (LNKO = 2). Pl. a 36 osztható 4-gyel és 6-tal is, de 24-gyel NEM!'
  },
  {
    divisor: 36,
    factorA: 4,
    factorB: 9,
    nameA: 'Osztható 4-gyel',
    nameB: 'Osztható 9-cel',
    ruleA: 'Az utolsó két számjegye osztható 4-gyel',
    ruleB: 'A számjegyek összege osztható 9-cel',
    badFactors: '6 · 6',
    badExplanation: 'A 6 és 6 nem relatív prímek. Pl. a 12 osztható 6-tal, de 36-tal nyilván nem!'
  },
  {
    divisor: 45,
    factorA: 5,
    factorB: 9,
    nameA: 'Osztható 5-tel',
    nameB: 'Osztható 9-cel',
    ruleA: 'Az utolsó számjegye 0 vagy 5',
    ruleB: 'A számjegyek összege osztható 9-cel'
  },
  {
    divisor: 72,
    factorA: 8,
    factorB: 9,
    nameA: 'Osztható 8-cal',
    nameB: 'Osztható 9-cel',
    ruleA: 'Az utolsó 3 számjegyéből álló szám osztható 8-cal',
    ruleB: 'A számjegyek összege osztható 9-cel'
  }
];

export const DivisibilityRulesTheory: React.FC<DivisibilityRulesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State ---
  const [selectedDivisor, setSelectedDivisor] = useState<number>(12);
  const [inputNumStr, setInputNumStr] = useState<string>('348');

  const activeRule = useMemo(() => {
    return COMPOSITE_RULES.find(r => r.divisor === selectedDivisor) || COMPOSITE_RULES[1];
  }, [selectedDivisor]);

  const parsedNum = useMemo(() => {
    const val = parseInt(inputNumStr, 10);
    return isNaN(val) ? 0 : val;
  }, [inputNumStr]);

  // Check divisibility by factorA and factorB
  const labCheck = useMemo(() => {
    const n = parsedNum;
    const divA = n % activeRule.factorA === 0;
    const divB = n % activeRule.factorB === 0;
    const divTotal = n % activeRule.divisor === 0;

    // Digit sum
    const digits = Math.abs(n).toString().split('').map(d => parseInt(d, 10));
    const digitSum = digits.reduce((sum, d) => sum + d, 0);

    // Last 1, 2, 3 digits
    const absStr = Math.abs(n).toString();
    const last1 = absStr.slice(-1);
    const last2 = absStr.slice(-2);
    const last3 = absStr.slice(-3);

    return {
      n,
      divA,
      divB,
      divTotal,
      digitSum,
      last1,
      last2,
      last3
    };
  }, [parsedNum, activeRule]);

  return (
    <TheoryTemplate
      title="6. Készítsünk magunknak oszthatósági szabályokat!"
      subtitle="Összetett számokkal (6, 12, 15, 18, 20, 24, 36, 45, 72) való oszthatósági szabályok megalkotása relatív prím tényezőkkel, és hiányzó számjegyek kiszámítása."
      badgeText="7. Osztály • Matematika IV. Témakör • 6. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="🛠️"
      themeColor="teal"
      documentId="g7-powers-custom-rules-theory-doc"
      pdfFilename="7_osztaly_oszthatosagi_szabalyok_alkotasa.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Összetett Oszthatóságok',
        formula: 'LNKO(a, b) = 1 ⟹ (a|n és b|n ⟺ a·b|n)  |  6 = 2·3  |  12 = 3·4  |  15 = 3·5  |  18 = 2·9  |  36 = 4·9  |  45 = 5·9'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="16 perc"
    >
      {/* 1. SZEKCIÓ: A RELATÍV PRÍMEKRE ÉPÜLŐ ALAPTÉTEL */}
      <TheorySection
        number={1}
        title="1. A Relatív Prímekre Épülő Oszthatósági Alaptétel"
        badgeColor="teal"
        icon={<Wrench className="w-6 h-6 text-teal-600" />}
      >
        <TheoryCard title="Hogyan alkothatunk új oszthatósági szabályokat?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az 5. és 6. osztályban megismertük az egyszerű számokkal (2, 3, 4, 5, 8, 9, 10, 25, 100) való oszthatósági szabályokat. De mi a helyzet, ha egy számot <strong>6-tal, 12-vel, 15-tel, 36-tal vagy 45-tel</strong> szeretnénk vizsgálni? Nem kell új, bonyolult szabályokat magolnunk: a meglévő szabályokból <strong>magunk is készíthetünk újakat</strong>!
          </p>

          <div className="p-5 rounded-2xl bg-teal-500/10 border-2 border-teal-300 dark:border-teal-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
              A Szabályalkotás Aranyszabálya
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Ha egy szám osztható az <MathText>a</MathText> és <MathText>b</MathText> számokkal, ÉS az <MathText>a</MathText> és <MathText>b</MathText> <strong>relatív prímek</strong> (<MathText>LNKO(a, b) = 1</MathText>), <br />
              akkor a szám osztható az <strong className="text-teal-700 dark:text-teal-300"><MathText>a · b</MathText> szorzattal</strong> is!
            </div>
            <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 pt-1 border-t border-teal-200 dark:border-teal-800/80">
              a | n  ÉS  b | n  (ahol LNKO(a, b) = 1)  ⟺  (a · b) | n
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Relatív prímek fogalma */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Mit jelent, hogy két szám relatív prím?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Két természetes számot <strong>relatív prímnek</strong> nevezünk, ha <strong>a legnagyobb közös osztójuk pontosan 1</strong> (vagyis az 1-en kívül nincs közös osztójuk).<br />
                <em>Fontos:</em> Nem kell maguknak a számoknak prímszámnak lenniük! Például a <strong>8</strong> és a <strong>9</strong> összetett számok, de <MathText>LNKO(8, 9) = 1</MathText>, tehát <strong>egymáshoz képest relatív prímek</strong>!
              </p>
            </div>

            {/* Miért végzetes, ha nem relatív prímek? */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Miért kötelező a relatív prím feltétel?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Nézzük a <MathText>12 = 2 · 6</MathText> felbontást! A 2 és a 6 <strong>nem relatív prímek</strong> (<MathText>LNKO(2, 6) = 2</MathText>).<br />
                A <strong>18</strong> osztható 2-vel (páros), és osztható 6-tal is (<MathText>18 : 6 = 3</MathText>).<br />
                Mégsem osztható 12-vel, mert <MathText>18 : 12 = 1,5</MathText>! Ezért a 12-re a <strong>3 · 4</strong> felbontást kell használnunk!
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A LEGGYAKORIBB ÖSSZETETT OSZTHATÓSÁGI SZABÁLYOK TÁBLÁZATA */}
      <TheorySection
        number={2}
        title="2. Gyakori Összetett Oszthatósági Szabályok Gyűjteménye"
        badgeColor="teal"
        icon={<Layers className="w-6 h-6 text-teal-600" />}
      >
        <TheoryCard title="Hogyan bontsuk fel a legfontosabb osztókat relatív prímekre?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az alábbi táblázat tartalmazza a leggyakrabban előforduló összetett osztókat, a helyes relatív prím tényezőket, valamint az egyesített szabályt:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Osztó</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Relatív prím tényezők</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Oszthatósági szabály</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">6</td>
                  <td className="p-3 font-mono">2 · 3 (LNKO=1)</td>
                  <td className="p-3">Páros <strong>ÉS</strong> a számjegyek összege osztható 3-mal</td>
                  <td className="p-3 font-mono"><strong>342</strong> (páros, összeg: 9)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">12</td>
                  <td className="p-3 font-mono">3 · 4 (LNKO=1)</td>
                  <td className="p-3">Számjegyösszeg osztható 3-mal <strong>ÉS</strong> utolsó 2 jegy osztható 4-gyel</td>
                  <td className="p-3 font-mono"><strong>432</strong> (összeg: 9, 32:4=8)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">15</td>
                  <td className="p-3 font-mono">3 · 5 (LNKO=1)</td>
                  <td className="p-3">Számjegyösszeg osztható 3-mal <strong>ÉS</strong> utolsó jegye 0 vagy 5</td>
                  <td className="p-3 font-mono"><strong>735</strong> (összeg: 15, vége: 5)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">18</td>
                  <td className="p-3 font-mono">2 · 9 (LNKO=1)</td>
                  <td className="p-3">Páros <strong>ÉS</strong> a számjegyek összege osztható 9-cel</td>
                  <td className="p-3 font-mono"><strong>954</strong> (páros, összeg: 18)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">20</td>
                  <td className="p-3 font-mono">4 · 5 (LNKO=1)</td>
                  <td className="p-3">Utolsó jegy 0 <strong>ÉS</strong> a tízesek helyén páros jegy áll (00, 20, 40, 60, 80)</td>
                  <td className="p-3 font-mono"><strong>580</strong> (vége: 80)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">24</td>
                  <td className="p-3 font-mono">3 · 8 (LNKO=1)</td>
                  <td className="p-3">Számjegyösszeg osztható 3-mal <strong>ÉS</strong> utolsó 3 jegy osztható 8-cal</td>
                  <td className="p-3 font-mono"><strong>1 224</strong> (összeg: 9, 224:8=28)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">36</td>
                  <td className="p-3 font-mono">4 · 9 (LNKO=1)</td>
                  <td className="p-3">Utolsó 2 jegy osztható 4-gyel <strong>ÉS</strong> számjegyösszeg osztható 9-cel</td>
                  <td className="p-3 font-mono"><strong>1 548</strong> (48:4=12, összeg: 18)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold font-mono text-teal-700 dark:text-teal-300 text-sm">45</td>
                  <td className="p-3 font-mono">5 · 9 (LNKO=1)</td>
                  <td className="p-3">Utolsó jegye 0 vagy 5 <strong>ÉS</strong> számjegyösszeg osztható 9-cel</td>
                  <td className="p-3 font-mono"><strong>2 385</strong> (vége: 5, összeg: 18)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TheoryCard>

        {/* Hibás felbontások csapdadoboza */}
        <TheoryTrapBox
          title="Tilos és hibás felbontások szabálykészítéskor!"
          traps={[
            {
              wrong: '12-vel akkor osztható, ha 2-vel és 6-tal osztható.',
              correct: 'A 2 és a 6 nem relatív prímek! Pl. a 18 osztható 2-vel és 6-tal, de 12-vel nem. Helyesen: 3-mal és 4-gyel kell oszthatónak lennie!'
            },
            {
              wrong: '18-cal akkor osztható, ha 3-mal és 6-tal osztható.',
              correct: 'A 3 és a 6 nem relatív prímek! Pl. a 24 osztható 3-mal és 6-tal, de 18-cal nem. Helyesen: 2-vel és 9-cel kell oszthatónak lennie!'
            },
            {
              wrong: '36-tal akkor osztható, ha 6-tal és 6-tal osztható.',
              correct: 'Két azonos szám sosem relatív prím! Pl. a 12 osztható 6-tal, de 36-tal nem. Helyesen: 4-gyel és 9-cel kell oszthatónak lennie!'
            }
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: TÍPUSFELADATOK ÉS HIÁNYZÓ SZÁMJEGYEK MEGHATÁROZÁSA */}
      <TheorySection
        number={3}
        title="3. Mesterfogás: Hiányzó Számjegyek Kiszámítása Oszthatóságból"
        badgeColor="teal"
        icon={<Calculator className="w-6 h-6 text-teal-600" />}
      >
        <TheoryCard title="Hogyan oldjunk meg ismeretlen számjegyes feladatokat?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A felvételik és versenyek leggyakoribb feladattípusa: <em>„Milyen számjegyeket írhatunk a betűk helyére, hogy a szám osztható legyen egy adott összetett számmal?”</em> A kulcs a <strong>helyes vizsgálati sorrend</strong>!
          </p>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-3 mb-4">
            <span className="font-black text-xs uppercase tracking-wider text-teal-800 dark:text-teal-300">
              A Megoldás 3 Aranyszabálya:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-100 dark:border-teal-900">
                <strong className="text-teal-700 dark:text-teal-300 block mb-1">1. Lépés: Bontsd szét!</strong>
                Bontsd fel az összetett osztót két relatív prím tényezőre (pl. 36 = 4 · 9).
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-100 dark:border-teal-900">
                <strong className="text-teal-700 dark:text-teal-300 block mb-1">2. Lépés: Utolsó jegy előre!</strong>
                MINDIG az utolsó számjegyet meghatározó szabállyal kezdj (2, 4, 5, 8, 10, 25), mert ez azonnal leszűkíti a lehetséges értékeket!
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-100 dark:border-teal-900">
                <strong className="text-teal-700 dark:text-teal-300 block mb-1">3. Lépés: Számjegyösszeg!</strong>
                Minden kapott esetre külön vizsgáld meg a számjegyösszeges feltételt (3 vagy 9).
              </div>
            </div>
          </div>

          {/* Részletes levezetett mintapélda */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Részletesen kidolgozott mintapélda:
              </h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Határozzuk meg az <MathText>x</MathText> és <MathText>y</MathText> számjegyeket úgy, hogy az <MathText>54x2y</MathText> ötjegyű szám <strong>osztható legyen 36-tal</strong>!
            </p>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                <strong>1. Feltételbontás:</strong> <MathText>36 = 4 · 9</MathText>, és <MathText>LNKO(4, 9) = 1</MathText>. A számnak oszthatónak kell lennie 4-gyel ÉS 9-cel is.
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                <strong>2. Oszthatóság 4-gyel (utolsó 2 jegy: 2y):</strong><br />
                A 20-as számok közül a 4-gyel oszthatók: <strong>20, 24, 28</strong>.<br />
                Tehát <MathText>y</MathText> lehetséges értékei: <strong className="text-teal-700 dark:text-teal-300">y = 0, y = 4 vagy y = 8</strong>.
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <strong>3. Oszthatóság 9-cel (számjegyösszeg esetenként):</strong>
                <ul className="space-y-1.5 list-disc list-inside pl-2">
                  <li>
                    <strong>Ha y = 0:</strong> Szám: <MathText>54x20</MathText>. Összeg: <MathText>5 + 4 + x + 2 + 0 = 11 + x</MathText>.<br />
                    Mivel a 9 legközelebbi többszöröse a 18: <MathText>11 + x = 18 ⟹ x = 7</MathText>.<br />
                    ➜ <strong className="text-teal-700 dark:text-teal-300">Megoldás 1: 54 720</strong>
                  </li>
                  <li>
                    <strong>Ha y = 4:</strong> Szám: <MathText>54x24</MathText>. Összeg: <MathText>5 + 4 + x + 2 + 4 = 15 + x</MathText>.<br />
                    Mivel <MathText>15 + x = 18 ⟹ x = 3</MathText>.<br />
                    ➜ <strong className="text-teal-700 dark:text-teal-300">Megoldás 2: 54 324</strong>
                  </li>
                  <li>
                    <strong>Ha y = 8:</strong> Szám: <MathText>54x28</MathText>. Összeg: <MathText>5 + 4 + x + 2 + 8 = 19 + x</MathText>.<br />
                    Mivel 19 &gt; 18, a következő többszörös a 27: <MathText>19 + x = 27 ⟹ x = 8</MathText>.<br />
                    ➜ <strong className="text-teal-700 dark:text-teal-300">Megoldás 3: 54 828</strong>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-700 font-bold text-emerald-800 dark:text-emerald-300 text-center">
                ✓ A keresett számpárok (x, y): (7, 0), (3, 4), (8, 8). Mind a 3 szám pontosan osztható 36-tal!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* INTERAKTÍV LABORATÓRIUM A TANANYAG ALJÁN */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-600/10 border-2 border-teal-300 dark:border-teal-700/60 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-200 dark:border-teal-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív Oszthatósági Szabályalkotó és Vizsgáló Labor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Válaszd ki az összetett osztót, írj be tetszőleges számot, és vizsgáld meg a két relatív prím feltétel teljesülését!
              </p>
            </div>
          </div>
        </div>

        {/* Osztó választó gombok */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Válassz összetett osztót:
          </label>
          <div className="flex flex-wrap gap-2">
            {COMPOSITE_RULES.map(r => (
              <Button
                key={r.divisor}
                size="sm"
                variant={selectedDivisor === r.divisor ? 'default' : 'outline'}
                onClick={() => setSelectedDivisor(r.divisor)}
                className={cn(
                  'h-8 px-3 rounded-xl font-bold text-xs',
                  selectedDivisor === r.divisor && 'bg-teal-600 hover:bg-teal-700 text-white'
                )}
              >
                {r.divisor}-cal ({r.factorA} · {r.factorB})
              </Button>
            ))}
          </div>
        </div>

        {/* Bemeneti szám és minták */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-64">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Tesztelendő szám:
            </label>
            <Input
              type="number"
              value={inputNumStr}
              onChange={e => setInputNumStr(e.target.value)}
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-teal-300 dark:border-teal-700 rounded-xl"
              placeholder="pl. 348"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 sm:pt-4">
            <span className="text-[11px] text-slate-400 self-center mr-1">Minták:</span>
            {[72, 180, 348, 540, 735, 1224, 1548, 2385].map(sample => (
              <Button
                key={sample}
                size="sm"
                variant="ghost"
                onClick={() => setInputNumStr(sample.toString())}
                className="h-7 px-2 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 rounded-lg"
              >
                {sample}
              </Button>
            ))}
          </div>
        </div>

        {/* Értékelő panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. feltétel kártya */}
          <div className={cn(
            "p-4 rounded-2xl border-2 transition-all space-y-2",
            labCheck.divA
              ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700"
              : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700"
          )}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                1. Feltétel: {activeRule.nameA} ({activeRule.factorA})
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                labCheck.divA ? "bg-emerald-200 text-emerald-800" : "bg-rose-200 text-rose-800"
              )}>
                {labCheck.divA ? '✓ TELJESÜL' : '✗ NEM TELJESÜL'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {activeRule.ruleA}
            </p>
            <div className="pt-1 text-xs font-mono text-slate-700 dark:text-slate-300">
              {activeRule.factorA === 2 && `Utolsó jegy: ${labCheck.last1} → ${labCheck.divA ? 'páros' : 'páratlan'}`}
              {activeRule.factorA === 3 && `Számjegyösszeg: ${labCheck.digitSum} → ${labCheck.divA ? 'osztható 3-mal' : 'nem osztható 3-mal'}`}
              {activeRule.factorA === 4 && `Utolsó 2 jegy: ${labCheck.last2} → ${labCheck.divA ? 'osztható 4-gyel' : 'nem osztható 4-gyel'}`}
              {activeRule.factorA === 5 && `Utolsó jegy: ${labCheck.last1} → ${labCheck.divA ? '0 vagy 5' : 'nem 0 és nem 5'}`}
              {activeRule.factorA === 8 && `Utolsó 3 jegy: ${labCheck.last3} → ${labCheck.divA ? 'osztható 8-cal' : 'nem osztható 8-cal'}`}
            </div>
          </div>

          {/* 2. feltétel kártya */}
          <div className={cn(
            "p-4 rounded-2xl border-2 transition-all space-y-2",
            labCheck.divB
              ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700"
              : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700"
          )}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                2. Feltétel: {activeRule.nameB} ({activeRule.factorB})
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                labCheck.divB ? "bg-emerald-200 text-emerald-800" : "bg-rose-200 text-rose-800"
              )}>
                {labCheck.divB ? '✓ TELJESÜL' : '✗ NEM TELJESÜL'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {activeRule.ruleB}
            </p>
            <div className="pt-1 text-xs font-mono text-slate-700 dark:text-slate-300">
              {activeRule.factorB === 3 && `Számjegyösszeg: ${labCheck.digitSum} → ${labCheck.divB ? 'osztható 3-mal' : 'nem osztható 3-mal'}`}
              {activeRule.factorB === 4 && `Utolsó 2 jegy: ${labCheck.last2} → ${labCheck.divB ? 'osztható 4-gyel' : 'nem osztható 4-gyel'}`}
              {activeRule.factorB === 5 && `Utolsó jegy: ${labCheck.last1} → ${labCheck.divB ? '0 vagy 5' : 'nem 0 és nem 5'}`}
              {activeRule.factorB === 8 && `Utolsó 3 jegy: ${labCheck.last3} → ${labCheck.divB ? 'osztható 8-cal' : 'nem osztható 8-cal'}`}
              {activeRule.factorB === 9 && `Számjegyösszeg: ${labCheck.digitSum} → ${labCheck.divB ? 'osztható 9-cel' : 'nem osztható 9-cel'}`}
            </div>
          </div>
        </div>

        {/* Végső következtetés banner */}
        <div className={cn(
          "p-4 rounded-2xl border-2 text-center space-y-1 transition-all",
          labCheck.divTotal
            ? "bg-teal-500/10 border-teal-500 text-teal-900 dark:text-teal-100"
            : "bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
        )}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Végső következtetés {activeRule.divisor}-ra:
          </div>
          <div className="text-base sm:text-lg font-black">
            {labCheck.divTotal ? (
              <span className="text-teal-700 dark:text-teal-300">
                ✓ A {labCheck.n} szám OSZTHATÓ {activeRule.divisor}-tal, mert osztható {activeRule.factorA}-val és {activeRule.factorB}-tel is!
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400">
                ✗ A {labCheck.n} szám NEM osztható {activeRule.divisor}-tal, mert legalább az egyik feltétel nem teljesül!
              </span>
            )}
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default DivisibilityRulesTheory;
