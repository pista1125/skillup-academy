import React, { useState, useMemo } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard } from '../TheoryTemplate';
import {
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Split,
  Binary,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Hash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DivisibilityCompositeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface CompositeRuleInfo {
  divisor: number;
  factors: [number, number];
  factorNames: string;
  ruleDescription: string;
  coprimeExplanation: string;
}

const COMPOSITE_RULES: Record<number, CompositeRuleInfo> = {
  6: {
    divisor: 6,
    factors: [2, 3],
    factorNames: '2 és 3',
    ruleDescription: 'A szám páros ÉS a számjegyeinek összege osztható 3-mal.',
    coprimeExplanation: 'LNKO(2, 3) = 1, mivel 2 és 3 relatív prímek.',
  },
  12: {
    divisor: 12,
    factors: [3, 4],
    factorNames: '3 és 4',
    ruleDescription: 'A számjegyek összege osztható 3-mal ÉS az utolsó két számjegy osztható 4-gyel.',
    coprimeExplanation: 'LNKO(3, 4) = 1 (relatív prímek). VIGYÁZAT: 2 · 6 nem jó, mert LNKO(2, 6) = 2 ≠ 1!',
  },
  15: {
    divisor: 15,
    factors: [3, 5],
    factorNames: '3 és 5',
    ruleDescription: 'A számjegyek összege osztható 3-mal ÉS az utolsó számjegy 0 vagy 5.',
    coprimeExplanation: 'LNKO(3, 5) = 1 (relatív prímek).',
  },
  18: {
    divisor: 18,
    factors: [2, 9],
    factorNames: '2 és 9',
    ruleDescription: 'A szám páros ÉS a számjegyeinek összege osztható 9-cel.',
    coprimeExplanation: 'LNKO(2, 9) = 1 (relatív prímek). VIGYÁZAT: 3 · 6 nem jó, mert LNKO(3, 6) = 3 ≠ 1!',
  },
  20: {
    divisor: 20,
    factors: [4, 5],
    factorNames: '4 és 5',
    ruleDescription: 'Az utolsó két számjegy osztható 4-gyel ÉS az utolsó számjegy 0 (így 5-tel is osztható, vagyis 00, 20, 40, 60, 80).',
    coprimeExplanation: 'LNKO(4, 5) = 1 (relatív prímek). VIGYÁZAT: 2 · 10 nem jó, mert LNKO(2, 10) = 2 ≠ 1!',
  },
  24: {
    divisor: 24,
    factors: [3, 8],
    factorNames: '3 és 8',
    ruleDescription: 'A számjegyek összege osztható 3-mal ÉS az utolsó három számjegy osztható 8-cal.',
    coprimeExplanation: 'LNKO(3, 8) = 1 (relatív prímek). VIGYÁZAT: 4 · 6 nem jó, mert LNKO(4, 6) = 2 ≠ 1!',
  },
  36: {
    divisor: 36,
    factors: [4, 9],
    factorNames: '4 és 9',
    ruleDescription: 'Az utolsó két számjegy osztható 4-gyel ÉS a számjegyek összege osztható 9-cel.',
    coprimeExplanation: 'LNKO(4, 9) = 1 (relatív prímek). VIGYÁZAT: 6 · 6 nem jó, mert LNKO(6, 6) = 6 ≠ 1!',
  },
  45: {
    divisor: 45,
    factors: [5, 9],
    factorNames: '5 és 9',
    ruleDescription: 'Az utolsó számjegy 0 vagy 5 ÉS a számjegyek összege osztható 9-cel.',
    coprimeExplanation: 'LNKO(5, 9) = 1 (relatív prímek).',
  },
};

function checkSubDivisibility(num: number, subDiv: number): { ok: boolean; reason: string } {
  const absNum = Math.abs(num);
  const numStr = absNum.toString();
  const lastDigit = absNum % 10;
  const last2Digits = absNum % 100;
  const last3Digits = absNum % 1000;
  const digitSum = numStr.split('').reduce((sum, d) => sum + parseInt(d, 10), 0);

  switch (subDiv) {
    case 2:
      return {
        ok: lastDigit % 2 === 0,
        reason: `Utolsó számjegy: ${lastDigit} (${lastDigit % 2 === 0 ? 'páros' : 'páratlan'})`,
      };
    case 3:
      return {
        ok: digitSum % 3 === 0,
        reason: `Számjegyösszeg: ${digitSum} (${digitSum % 3 === 0 ? 'osztható 3-mal' : `nem osztható 3-mal, maradék ${digitSum % 3}`})`,
      };
    case 4:
      return {
        ok: last2Digits % 4 === 0,
        reason: `Utolsó 2 számjegy: ${last2Digits.toString().padStart(2, '0')} (${last2Digits % 4 === 0 ? 'osztható 4-gyel' : `nem osztható 4-gyel, maradék ${last2Digits % 4}`})`,
      };
    case 5:
      return {
        ok: lastDigit === 0 || lastDigit === 5,
        reason: `Utolsó számjegy: ${lastDigit} (${lastDigit === 0 || lastDigit === 5 ? '0 vagy 5' : 'nem 0 és nem 5'})`,
      };
    case 8:
      return {
        ok: last3Digits % 8 === 0,
        reason: `Utolsó 3 számjegy: ${last3Digits.toString().padStart(3, '0')} (${last3Digits % 8 === 0 ? 'osztható 8-cal' : `nem osztható 8-cal, maradék ${last3Digits % 8}`})`,
      };
    case 9:
      return {
        ok: digitSum % 9 === 0,
        reason: `Számjegyösszeg: ${digitSum} (${digitSum % 9 === 0 ? 'osztható 9-cel' : `nem osztható 9-cel, maradék ${digitSum % 9}`})`,
      };
    default:
      return {
        ok: absNum % subDiv === 0,
        reason: `${absNum} ${absNum % subDiv === 0 ? 'osztható' : 'nem osztható'} ${subDiv}-vel`,
      };
  }
}

export function DivisibilityCompositeTheory({ onBack, onStartQuiz }: DivisibilityCompositeTheoryProps) {
  // Interactive Lab state
  const [testNumberInput, setTestNumberInput] = useState('4356');
  const [selectedDivisor, setSelectedDivisor] = useState<number>(12);

  const parsedNumber = useMemo(() => {
    const val = parseInt(testNumberInput.trim(), 10);
    return isNaN(val) ? 0 : Math.abs(val);
  }, [testNumberInput]);

  const activeRule = COMPOSITE_RULES[selectedDivisor] || COMPOSITE_RULES[12];
  const factor1 = activeRule.factors[0];
  const factor2 = activeRule.factors[1];

  const check1 = useMemo(() => checkSubDivisibility(parsedNumber, factor1), [parsedNumber, factor1]);
  const check2 = useMemo(() => checkSubDivisibility(parsedNumber, factor2), [parsedNumber, factor2]);
  const isFullyDivisible = check1.ok && check2.ok;
  const quotient = Math.floor(parsedNumber / selectedDivisor);
  const remainder = parsedNumber % selectedDivisor;

  const generateRandomTest = () => {
    const divisors = [6, 12, 15, 18, 20, 24, 36, 45];
    const chosenDiv = divisors[Math.floor(Math.random() * divisors.length)];
    setSelectedDivisor(chosenDiv);

    const makeDivisible = Math.random() > 0.4;
    if (makeDivisible) {
      const k = Math.floor(Math.random() * 200) + 10;
      setTestNumberInput((k * chosenDiv).toString());
    } else {
      const randNum = Math.floor(Math.random() * 9000) + 1000;
      setTestNumberInput(randNum.toString());
    }
  };

  return (
    <TheoryTemplate
      title="Összetett oszthatósági szabályok"
      description="Hogyan vizsgáljuk a 6, 12, 15, 18, 20, 24, 36 és 45 oszthatóságát relatív prím tényezőkkel?"
      badgeText="6. Osztály • Oszthatóság"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfElementId="composite-divisibility-theory-content"
      pdfFilename="Osszetett_Oszthatosag_Tananyag"
    >
      {/* 1. Szekció: Az összetett oszthatóság alapszabálya */}
      <TheorySection
        number={1}
        title="Az összetett oszthatóság aranyszabálya"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A relatív prím tényezők tétele"
            icon={<ShieldCheck className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy egész szám akkor és csak akkor osztható egy összetett számmal (pl. A · B), ha <strong>külön-külön osztható A-val és B-vel is</strong>, 
              feltéve, hogy <strong>A és B RELATÍV PRÍMEK</strong> (vagyis LNKO(A, B) = 1, nincs 1-nél nagyobb közös osztójuk).
            </p>
            <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 font-medium space-y-1">
              <div className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Matematikai megfogalmazás:
              </div>
              <div className="font-mono text-center py-1 text-sm text-indigo-700 dark:text-indigo-300 font-bold bg-white/70 dark:bg-slate-900/60 rounded-lg">
                Ha LNKO(A, B) = 1, akkor (A | N és B | N) ⟺ (A · B) | N
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Gyakori helyes felbontások"
            icon={<Split className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A leggyakoribb összetett osztók helyes relatív prím párjai:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">6-tal:</strong> 2 és 3
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">12-vel:</strong> 3 és 4
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">15-tel:</strong> 3 és 5
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">18-cal:</strong> 2 és 9
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">20-szal:</strong> 4 és 5
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">24-gyel:</strong> 3 és 8
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">36-tal:</strong> 4 és 9
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400">45-tel:</strong> 5 és 9
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Miért bukik el a NEM relatív prím felbontás? */}
      <TheorySection
        number={2}
        title="A legnagyobb csapda: Miért kötelező a relatív prím tulajdonság?"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A 12-es és a 18 ellenpéldája"
            icon={<XCircle className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Mi történik, ha valaki azt gondolja: <em>„A 12 = 2 · 6, tehát ami osztható 2-vel és 6-tal, az osztható 12-vel is”</em>?
            </p>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-950 dark:text-rose-200 space-y-2">
              <div className="font-bold text-rose-800 dark:text-rose-300">
                Nézzük a 18-as számot!
              </div>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-700 dark:text-slate-300">
                <li>18 osztható 2-vel (18 : 2 = 9) ✓</li>
                <li>18 osztható 6-tal (18 : 6 = 3) ✓</li>
                <li>DE: 18 <strong>NEM osztható 12-vel</strong> (18 : 12 = 1, maradék 6) ✗</li>
              </ul>
              <div className="text-[11px] text-rose-900 dark:text-rose-200 font-medium">
                <strong>Miért történt a hiba?</strong> Mert a 2 és a 6 NEM relatív prímek (LNKO(2, 6) = 2). Mindkettő tartalmazza a 2-es tényezőt, így a 12-höz szükséges második 2-es hiányzik!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="További tiltott (hibás) felbontások"
            icon={<Lightbulb className="w-4 h-4 text-amber-500" />}
          >
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 dark:text-rose-400">18 = 3 · 6 HIBÁS:</span> A 3 és 6 nem relatív prímek (LNKO = 3). Pl. a 12 osztható 3-mal és 6-tal is, de 18-cal nem! (Helyes: 18 = 2 · 9).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 dark:text-rose-400">20 = 2 · 10 HIBÁS:</span> A 2 és 10 nem relatív prímek (LNKO = 2). Pl. a 30 osztható 2-vel és 10-zel, de 20-szal nem! (Helyes: 20 = 4 · 5).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 dark:text-rose-400">24 = 4 · 6 HIBÁS:</span> A 4 és 6 nem relatív prímek (LNKO = 2). Pl. a 36 osztható 4-gyel és 6-tal, de 24-gyel nem! (Helyes: 24 = 3 · 8).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 dark:text-rose-400">36 = 6 · 6 HIBÁS:</span> LNKO(6, 6) = 6. (Helyes: 36 = 4 · 9).
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szekció: A leggyakoribb összetett szabályok részletesen */}
      <TheorySection
        number={3}
        title="A leggyakoribb összetett szabályok alkalmazása"
        icon={<Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Oszthatóság 6-tal (2 és 3)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Feltétel:</strong> Páros ÉS a számjegyösszeg osztható 3-mal.</p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-[11px]">
                <div>• $738 \to$ utolsó jegy 8 (páros) ✓</div>
                <div>• Számjegyösszeg: $7+3+8 = 18$ (osztható 3-mal) ✓</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">⟹ 738 osztható 6-tal ($738 : 6 = 123$)</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Oszthatóság 12-vel (3 és 4)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Feltétel:</strong> Számjegyösszeg osztható 3-mal ÉS utolsó 2 számjegy osztható 4-gyel.</p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-[11px]">
                <div>• $1524 \to$ utolsó két jegy: 24 ($24 : 4 = 6$) ✓</div>
                <div>• Számjegyösszeg: $1+5+2+4 = 12$ ($12 : 3 = 4$) ✓</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">⟹ 1524 osztható 12-vel ($1524 : 12 = 127$)</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Oszthatóság 15-tel (3 és 5)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Feltétel:</strong> Utolsó jegy 0 vagy 5 ÉS számjegyösszeg osztható 3-mal.</p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-[11px]">
                <div>• $2475 \to$ utolsó jegy 5 (osztható 5-tel) ✓</div>
                <div>• Számjegyösszeg: $2+4+7+5 = 18$ ($18 : 3 = 6$) ✓</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">⟹ 2475 osztható 15-tel ($2475 : 15 = 165$)</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Oszthatóság 18-cal (2 és 9)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Feltétel:</strong> Páros ÉS számjegyösszeg osztható 9-cel.</p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-[11px]">
                <div>• $3456 \to$ utolsó jegy 6 (páros) ✓</div>
                <div>• Számjegyösszeg: $3+4+5+6 = 18$ ($18 : 9 = 2$) ✓</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">⟹ 3456 osztható 18-cal ($3456 : 18 = 192$)</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Oszthatóság 36-tal (4 és 9)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Feltétel:</strong> Utolsó 2 számjegy osztható 4-gyel ÉS számjegyösszeg osztható 9-cel.</p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-[11px]">
                <div>• $4356 \to$ utolsó két jegy: 56 ($56 : 4 = 14$) ✓</div>
                <div>• Számjegyösszeg: $4+3+5+6 = 18$ ($18 : 9 = 2$) ✓</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">⟹ 4356 osztható 36-tal ($4356 : 36 = 121$)</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Oszthatóság 45-tel (5 és 9)"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Feltétel:</strong> Utolsó jegy 0 vagy 5 ÉS számjegyösszeg osztható 9-cel.</p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-[11px]">
                <div>• $5670 \to$ utolsó jegy 0 (osztható 5-tel) ✓</div>
                <div>• Számjegyösszeg: $5+6+7+0 = 18$ ($18 : 9 = 2$) ✓</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">⟹ 5670 osztható 45-tel ($5670 : 45 = 126$)</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív Összetett Oszthatósági Labor */}
      <TheorySection
        number={4}
        title="Interaktív Összetett Oszthatósági Labor"
        icon={<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Binary className="w-5 h-5 text-indigo-600" />
                Összetett Osztó Vizsgáló
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Írj be bármilyen számot, válaszd ki az összetett osztót, és nézd meg a lépésről lépésre levezetett ellenőrzést!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRandomTest}
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Véletlen Példa
            </Button>
          </div>

          {/* Selector & Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                1. Vizsgálandó szám (N):
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={testNumberInput}
                  onChange={(e) => setTestNumberInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="pl. 4356"
                  maxLength={9}
                  className="font-mono text-base font-bold text-indigo-950 dark:text-indigo-100 bg-white dark:bg-slate-800"
                />
                <Hash className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                2. Összetett osztó kiválasztása:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[6, 12, 15, 18, 20, 24, 36, 45].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDivisor(d)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedDivisor === d
                        ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rule Breakdown Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 font-mono font-bold text-sm">
                  {selectedDivisor} = {factor1} · {factor2}
                </Badge>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Relatív prím tényezők: <strong>{activeRule.factorNames}</strong>
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-mono">
                {activeRule.coprimeExplanation}
              </span>
            </div>

            {/* 2 sub-conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Factor 1 check */}
              <div className={`p-3 rounded-xl border transition-all ${
                check1.ok
                  ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800'
                  : 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/30 dark:border-rose-800'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    {check1.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    1. Részfeltétel: Oszthatóság {factor1}-gyel/val
                  </span>
                  <Badge className={check1.ok ? 'bg-emerald-600 text-white text-[10px]' : 'bg-rose-600 text-white text-[10px]'}>
                    {check1.ok ? 'TELJESÜL' : 'NEM TELJESÜL'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {check1.reason}
                </p>
              </div>

              {/* Factor 2 check */}
              <div className={`p-3 rounded-xl border transition-all ${
                check2.ok
                  ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800'
                  : 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/30 dark:border-rose-800'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    {check2.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    2. Részfeltétel: Oszthatóság {factor2}-vel/val
                  </span>
                  <Badge className={check2.ok ? 'bg-emerald-600 text-white text-[10px]' : 'bg-rose-600 text-white text-[10px]'}>
                    {check2.ok ? 'TELJESÜL' : 'NEM TELJESÜL'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {check2.reason}
                </p>
              </div>
            </div>

            {/* Final Verdict Banner */}
            <div className={`p-4 rounded-xl border text-center transition-all ${
              isFullyDivisible
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md'
                : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700'
            }`}>
              <div className="text-sm sm:text-base font-bold flex items-center justify-center gap-2">
                {isFullyDivisible ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                    A(z) {parsedNumber} OSZTHATÓ {selectedDivisor}-val/vel!
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-rose-400" />
                    A(z) {parsedNumber} NEM osztható {selectedDivisor}-val/vel!
                  </>
                )}
              </div>
              <div className="mt-1 text-xs opacity-90 font-mono">
                {isFullyDivisible ? (
                  <span>{parsedNumber} : {selectedDivisor} = <strong>{quotient}</strong> (maradék 0)</span>
                ) : (
                  <span>{parsedNumber} : {selectedDivisor} = {quotient}, <strong>maradék: {remainder}</strong></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Rejtvények és hiányzó számjegyek */}
      <TheorySection
        number={5}
        title="Hiányzó számjegyes feladványok és stratégia"
        icon={<HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Hogyan oldjunk meg hiányzó számjegyes feladatokat?"
            icon={<Sparkles className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Aranyszabály a sorrendre:</strong> Mindig a <em>helyiértékhez kötött</em> szabállyal kezdünk (pl. 2-es, 5-ös, 4-es, 10-es végződés), és csak ezután határozzuk meg a belső jegyeket a <em>számjegyösszegből</em> (3-as, 9-es)!
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] space-y-1">
                <div className="font-bold text-indigo-900 dark:text-indigo-200">
                  Példa: Határozzuk meg az $x$-et, ha a $43x2$ osztható 12-vel!
                </div>
                <div>1. <strong>Oszthatóság 4-gyel:</strong> Az utolsó két jegy <em>x2</em>. Lehetséges kétjegyűek: 12, 32, 52, 72, 92 ⟹ x értéke lehet: 1, 3, 5, 7, 9.</div>
                <div>2. <strong>Oszthatóság 3-mal:</strong> Számjegyösszeg: 4 + 3 + x + 2 = 9 + x. Mivel a 9 osztható 3-mal, x-nek is 3 többszörösének kell lennie (x értéke lehet: 0, 3, 6, 9).</div>
                <div>3. <strong>Közös megoldás:</strong> A két halmaz metszete: <strong className="text-indigo-700 dark:text-indigo-300">x = 3 vagy x = 9</strong>. (A számok: 4332 és 4392).</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Összefoglaló ellenőrző táblázat"
            icon={<ShieldCheck className="w-4 h-4 text-indigo-500" />}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 font-bold">
                    <th className="py-1 px-1.5">Osztó</th>
                    <th className="py-1 px-1.5">Felbontás</th>
                    <th className="py-1 px-1.5">Feltételek</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-1 px-1.5 font-bold">6</td>
                    <td className="py-1 px-1.5 font-mono">2 · 3</td>
                    <td className="py-1 px-1.5">Páros ÉS összeg osztható 3-mal</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold">12</td>
                    <td className="py-1 px-1.5 font-mono">3 · 4</td>
                    <td className="py-1 px-1.5">Összeg osztható 3-mal ÉS utolsó 2 jegy osztható 4-gyel</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold">15</td>
                    <td className="py-1 px-1.5 font-mono">3 · 5</td>
                    <td className="py-1 px-1.5">Utolsó jegy 0 vagy 5 ÉS összeg osztható 3-mal</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold">18</td>
                    <td className="py-1 px-1.5 font-mono">2 · 9</td>
                    <td className="py-1 px-1.5">Páros ÉS összeg osztható 9-cel</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold">20</td>
                    <td className="py-1 px-1.5 font-mono">4 · 5</td>
                    <td className="py-1 px-1.5">Utolsó 2 jegy osztható 4-gyel ÉS utolsó jegy 0</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold">36</td>
                    <td className="py-1 px-1.5 font-mono">4 · 9</td>
                    <td className="py-1 px-1.5">Utolsó 2 jegy osztható 4-gyel ÉS összeg osztható 9-cel</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 font-bold">45</td>
                    <td className="py-1 px-1.5 font-mono">5 · 9</td>
                    <td className="py-1 px-1.5">Utolsó jegy 0 vagy 5 ÉS összeg osztható 9-cel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}
