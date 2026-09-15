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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Zap,
  Layers,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RationalOperationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const RationalOperationsTheory: React.FC<RationalOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive operation calculator state
  const [numA, setNumA] = useState<number>(-6);
  const [numB, setNumB] = useState<number>(2);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('*');

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const calculateResult = () => {
    if (op === '/' && numB === 0) {
      return { val: 'Nem értelmezhető', step: '0-val való osztás tiltott!' };
    }
    switch (op) {
      case '+': {
        const res = numA + numB;
        return {
          val: String(res),
          step: `${numA} + (${numB}) = ${res}`
        };
      }
      case '-': {
        const res = numA - numB;
        return {
          val: String(res),
          step: `${numA} - (${numB}) = ${numA} + (${-numB}) = ${res}`
        };
      }
      case '*': {
        const res = numA * numB;
        const signNote =
          (numA < 0 && numB < 0) || (numA > 0 && numB > 0)
            ? 'Azonos előjelek ⟹ pozitív (+)'
            : numA === 0 || numB === 0
            ? '0-val szorozva ⟹ 0'
            : 'Különböző előjelek ⟹ negatív (-)';
        return {
          val: String(res),
          step: `(${numA}) · (${numB}) = ${res} [${signNote}]`
        };
      }
      case '/': {
        const res = numA / numB;
        const signNote =
          (numA < 0 && numB < 0) || (numA > 0 && numB > 0)
            ? 'Azonos előjelek ⟹ pozitív (+)'
            : numA === 0
            ? '0-t osztva ⟹ 0'
            : 'Különböző előjelek ⟹ negatív (-)';
        return {
          val: String(Number(res.toFixed(4))),
          step: `(${numA}) : (${numB}) = ${Number(res.toFixed(4))} [${signNote}]`
        };
      }
    }
  };

  const calc = calculateResult();

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-racionalis-muveletek"
      pdfFilename="8_osztaly_mit_tudunk_a_racionalis_szamokrol_tananyag.pdf"
      title="5. Mit tudunk a racionális számokról?"
      subtitle="Műveleti tulajdonságok, előjelszabályok, műveleti sorrend, törtek alapműveletei és ésszerű számolási eljárások"
      quickRule={{
        label: "Műveleti sorrend (Z-H-SZO-ÖK)",
        formula: "1. ( )  ⟹  2. aⁿ  ⟹  3. · / :  ⟹  4. + / -"
      }}
      themeColor="cyan"
    >
      {/* 1. FEJEZET: MŰVELETI TULAJDONSÁGOK */}
      <TheorySection
        number={1}
        title="Műveleti tulajdonságok és azonosságok"
        icon={<Layers className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <TheoryCallout variant="info" title="A racionális számok (ℚ) műveleti struktúrája">
          A racionális számok halmaza zárt az összeadásra, kivonásra, szorzásra és a 0-val való osztást kivéve az osztásra is.
          Ez azt jelenti, hogy két racionális számmal végzett bármely alapművelet eredménye mindig racionális szám lesz.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard
            title="1. Felcserélhetőség (Kommutativitás)"
            badge="a + b = b + a | a · b = b · a"
            badgeColor="cyan"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az összeadás és a szorzás tagjai/tényezői tetszőlegesen felcserélhetők. A kivonásra és osztásra NEM érvényes!
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300">
              <div>• 3 + (-8) = -8 + 3 = -5</div>
              <div>• (-4) · 7 = 7 · (-4) = -28</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Csoportosíthatóság (Asszociativitás)"
            badge="(a + b) + c = a + (b + c)"
            badgeColor="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Több tag összeadásánál vagy tényező szorzásánál a műveletek tetszőlegesen zárójelezhetők és csoportosíthatók.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
              <div>• (2.5 · 17) · 4 = (2.5 · 4) · 17 = 170</div>
              <div>• (-12 + 19) + 1 = -12 + (19 + 1) = 8</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Széttagolhatóság (Disztributivitás)"
            badge="a · (b + c) = a·b + a·c"
            badgeColor="purple"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy összeget tagonként szorozhatunk egy számmal (zárójelfelbontás), illetve fordítva: a közös tényezőt kiemelhetjük.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-purple-800 dark:text-purple-300">
              <div>• 6 · (1/2 + 1/3) = 6/2 + 6/3 = 3 + 2 = 5</div>
              <div>• 3.7 · 8 + 6.3 · 8 = (3.7 + 6.3) · 8 = 80</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: ELŐJELSZABÁLYOK ÉS ZÁRÓJELEK */}
      <TheorySection
        number={2}
        title="Előjelszabályok és zárójelfelbontás"
        icon={<Calculator className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Szorzás és Osztás Előjelei"
            badge="Azonos ⟹ (+), Különböző ⟹ (-)"
            badgeColor="emerald"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                (+) · (+) = (+) és (-) · (-) = (+)  ⟹  Azonos előjel: POZITÍV
              </div>
              <div className="font-mono font-bold text-rose-700 dark:text-rose-300">
                (+) · (-) = (-) és (-) · (+) = (-)  ⟹  Különböző előjel: NEGATÍV
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-200 mt-2 font-semibold">
                Általános szabály: Páros sok negatív tényező szorzata <strong>pozitív</strong>, páratlan sok negatív tényező szorzata <strong>negatív</strong>.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Zárójelek és Előjelek Kapcsolata"
            badge="Zárójel előtti előjelek"
            badgeColor="indigo"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div>• <strong>+ jel a zárójel előtt:</strong> A zárójel elhagyható, a belső előjelek változatlanok: +(a - b) = a - b.</div>
              <div>• <strong>- jel a zárójel előtt:</strong> A zárójel felbontásakor a belső tagok előjele <strong>ellentétesre vált</strong>: -(a - b) = -a + b.</div>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-800 dark:text-indigo-200 mt-2 font-mono font-bold">
                Példa: 10 - (-4 + 7) = 10 + 4 - 7 = 7
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Előjel és Művelet Kalkulátor */}
        <div className="mt-5 p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-cyan-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            <Sparkles className="w-4 h-4" />
            Interaktív Előjeles Művelet-levezető
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Első szám (a):</label>
              <input
                type="number"
                value={numA}
                onChange={(e) => setNumA(parseFloat(e.target.value) || 0)}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {(['+', '-', '*', '/'] as const).map((operation) => (
                <button
                  key={operation}
                  onClick={() => setOp(operation)}
                  className={cn(
                    'w-8 h-7 text-xs font-black rounded-lg transition-all',
                    op === operation
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  {operation === '*' ? '·' : operation === '/' ? ':' : operation}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Második szám (b):</label>
              <input
                type="number"
                value={numB}
                onChange={(e) => setNumB(parseFloat(e.target.value) || 0)}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-slate-700 font-mono font-bold text-xs sm:text-sm text-cyan-700 dark:text-cyan-300">
              {calc.step} ⟹ <strong>{calc.val}</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: MŰVELETI SORREND ÉS TÖRTEK MŰVELETEI */}
      <TheorySection
        number={3}
        title="Műveleti sorrend és Törtek Alapműveletei"
        icon={<Scale className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <TheoryTable
          headers={['Törtművelet', 'Szabály és Képlet', 'Fontos Szabály', 'Példa']}
          rows={[
            ['Összeadás / Kivonás', 'a/b ± c/d = (a·d ± c·b) / (b·d)', 'Közös nevezőre kell hozni a törteket!', '3/4 + 1/6 = 9/12 + 2/12 = 11/12'],
            ['Szorzás', '(a/b) · (c/d) = (a·c) / (b·d)', 'Számlálót számlálóval, nevezőt nevezővel. Szorzás ELŐTT egyszerűsíts!', '(3/8) · (4/9) = (1·1)/(2·3) = 1/6'],
            ['Osztás', '(a/b) : (c/d) = (a/b) · (d/c)', 'Osztás = szorzás az osztó reciprokával (c ≠ 0)!', '(5/6) : (10/3) = (5/6) · (3/10) = 1/4'],
            ['Emeletes tört', '(a/b) / (c/d) = (a·d) / (b·c)', 'A fő törtvonal osztást jelent: számláló osztva nevezővel.', '(2/3) / (4/9) = (2/3) : (4/9) = 3/2 = 1.5']
          ]}
        />

        <TheoryTrapBox title="Gyakori Csapda: (-a)² és -a² különbsége">
          <p>
            Vigyázz a hatványozás és az előjel kapcsolatára!
            <br />
            • <strong>(-3)² = (-3) · (-3) = +9</strong> (a negatív előjel is a négyzetre van emelve, mert zárójelben van).
            <br />
            • <strong>-3² = -(3 · 3) = -9</strong> (csak a 3 van négyzetre emelve, az előtte álló mínusz utána érvényesül).
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. FEJEZET: ÉSSZERŰ SZÁMOLÁS */}
      <TheorySection
        number={4}
        title="Ésszerű számolási eljárások (Matematikai gyorsítótrükkök)"
        icon={<Zap className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Ügyes csoportosítás kerek számokhoz"
            badge="10, 100, 1000 készítése"
            badgeColor="emerald"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div>Keresd azokat a tényezőket, amelyek szorzata kerek számot (10, 100, 1000) ad:</div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg font-mono font-bold text-emerald-800 dark:text-emerald-300 space-y-1">
                <div>• 2.5 · 4 = 10  (pl. 2.5 · 19 · 4 = 10 · 19 = 190)</div>
                <div>• 125 · 8 = 1000 (pl. 125 · 0.8 · 7 = 100 · 7 = 700)</div>
                <div>• 0.5 · 2 = 1  (pl. 0.5 · 37 · 2 = 1 · 37 = 37)</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Kiemelés közös tényezővel"
            badge="a·b + a·c = a·(b+c)"
            badgeColor="purple"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div>Ha egy összegben vagy különbségben azonos szorzó szerepel, emeld ki a zárójel elé:</div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg font-mono font-bold text-purple-800 dark:text-purple-300 space-y-1">
                <div>• 7.8 · 64 + 7.8 · 36 = 7.8 · (64 + 36) = 7.8 · 100 = 780</div>
                <div>• 14 · (3/7) + 21 · (3/7) = (14 + 21) · (3/7) = 35 · (3/7) = 15</div>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Önellenőrző kérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-cyan-50/70 to-blue-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-cyan-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi a következő kifejezés értéke: -5 - 3 · (2 - 7)?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Kövesd a műveleti sorrendet: 1. Zárójel belseje ⟹ 2. Szorzás ⟹ 3. Kivonás!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '+10', value: 1 },
              { text: '-20', value: 2 },
              { text: '+40', value: 3 },
              { text: '-10', value: 4 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-cyan-400'
                )}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!quizSubmitted ? (
              <Button
                size="sm"
                disabled={quizAnswer === null}
                onClick={() => setQuizSubmitted(true)}
                className="rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 1 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! 1. (2 - 7) = -5; 2. 3 · (-5) = -15; 3. -5 - (-15) = -5 + 15 = +10.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! 1. (2-7) = -5, majd -5 - 3·(-5) = -5 - (-15) = +10.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RationalOperationsTheory;
