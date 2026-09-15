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
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  Layers,
  Compass,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SquareRootsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SquareRootsTheory: React.FC<SquareRootsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive partial root extractor state
  const [extractNumber, setExtractNumber] = useState<number>(50);

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const factorRoot = (num: number) => {
    if (num <= 0) {
      return { factor: 1, remainder: 0, text: 'Csak pozitív egész számokra' };
    }
    let maxSquareFactor = 1;
    for (let i = Math.floor(Math.sqrt(num)); i >= 1; i--) {
      if (num % (i * i) === 0) {
        maxSquareFactor = i * i;
        break;
      }
    }
    const outside = Math.sqrt(maxSquareFactor);
    const inside = num / maxSquareFactor;

    if (inside === 1) {
      return { factor: outside, remainder: 1, text: `√${num} = ${outside} (Pontos négyzetszám)` };
    }
    if (outside === 1) {
      return { factor: 1, remainder: inside, text: `√${num} (Nem emelhető ki négyzetszám)` };
    }
    return {
      factor: outside,
      remainder: inside,
      text: `√${num} = √(${maxSquareFactor} · ${inside}) = √${maxSquareFactor} · √${inside} = ${outside}√${inside}`
    };
  };

  const extractionInfo = factorRoot(extractNumber);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-szamok-negyzetgyoke"
      pdfFilename="8_osztaly_szamok_negyzetgyoke_tananyag.pdf"
      title="8. Számok négyzetgyöke"
      subtitle="Négyzetszámok, a szorzat és hányados négyzetgyöke, kiemelés a gyökjel elé, bevitel a gyökjel alá és az irracionális számok"
      quickRule={{
        label: "Négyzetgyökvonás azonosságai",
        formula: "√(a · b) = √a · √b  |  √(a / b) = √a / √b  |  √(k² · a) = k√a  |  k√a = √(k² · a)"
      }}
      themeColor="pink"
    >
      {/* 1. FEJEZET: NÉGYZETSZÁMOK ÉS GYÖKVONÁS */}
      <TheorySection
        number={1}
        title="Négyzetszámok és alapvető gyökök (1–25 négyzetei)"
        icon={<Target className="w-5 h-5 text-pink-600" />}
        badgeColor="pink"
      >
        <TheoryCallout variant="info" title="Mit érdemes fejből tudni a gyors számoláshoz?">
          A 8. osztályos és középiskolai feladatokban a legfontosabb négyzetszámok (1-től 25-ig) azonnali felismerése elengedhetetlen!
        </TheoryCallout>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4 text-xs font-mono font-bold text-center">
          {[
            { n: 11, sq: 121 },
            { n: 12, sq: 144 },
            { n: 13, sq: 169 },
            { n: 14, sq: 196 },
            { n: 15, sq: 225 },
            { n: 16, sq: 256 },
            { n: 17, sq: 289 },
            { n: 18, sq: 324 },
            { n: 19, sq: 361 },
            { n: 20, sq: 400 },
            { n: 25, sq: 625 }
          ].map((item) => (
            <div key={item.n} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-pink-200 dark:border-slate-800 shadow-xs">
              <div className="text-slate-500 text-[11px]">{item.n}² = {item.sq}</div>
              <div className="text-pink-600 dark:text-pink-400 text-sm">√{item.sq} = {item.n}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="Törtek négyzetgyöke"
            badge="√(a / b) = √a / √b"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A számlálóból és a nevezőből külön-külön vonunk négyzetgyököt.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• √(25/81) = √25 / √81 = 5/9</div>
              <div>• √(1 és 9/16) = √(25/16) = 5/4 = 1.25</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tizedestörtek négyzetgyöke"
            badge="Tizedesjegyek száma feleződik"
            badgeColor="pink"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Gyökvonáskor a tizedesjegyek száma feleződik (2 tizedesjegy ⟶ 1 tizedesjegy).
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-pink-800 dark:text-pink-300">
              <div>• √0.09 = 0.3 (mert 0.3 · 0.3 = 0.09)</div>
              <div>• √0.0064 = 0.08 (mert 0.08² = 0.0064)</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: A NÉGYZETGYÖKVONÁS AZONOSSÁGAI */}
      <TheorySection
        number={2}
        title="A négyzetgyökvonás azonosságai (Szorzat és hányados gyöke)"
        icon={<Layers className="w-5 h-5 text-pink-600" />}
        badgeColor="pink"
      >
        <TheoryTable
          headers={['Azonosság', 'Képlet', 'Szöveges Szabály', 'Példa']}
          rows={[
            ['Szorzat négyzetgyöke', '√(a · b) = √a · √b (a ≥ 0, b ≥ 0)', 'Szorzatból tényezőnként lehet gyököt vonni, és fordítva.', '√3600 = √36 · √100 = 6 · 10 = 60\n√2 · √18 = √36 = 6'],
            ['Hányados / Tört négyzetgyöke', '√(a / b) = √a / √b (a ≥ 0, b > 0)', 'Törtből a számláló és nevező gyökének hányadosa lesz.', '√(64/25) = √64 / √25 = 8/5 = 1.6\n√50 / √2 = √(50/2) = √25 = 5']
          ]}
        />

        <TheoryTrapBox title="Csapdahelyzet: Összegből és különbségből tilos tagonként gyököt vonni!">
          <div className="space-y-1 text-xs">
            <p>
              • <strong>√(a + b) ≠ √a + √b</strong> és <strong>√(a - b) ≠ √a - √b!</strong>
              <br />
              <span className="text-rose-700 dark:text-rose-300 font-mono font-bold">
                Példa: √(100 - 64) = √36 = 6, míg √100 - √64 = 10 - 8 = 2 (6 ≠ 2!).
              </span>
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. FEJEZET: GYÖKTÉNYEZŐ KIEMELÉSE ÉS BEVITELE */}
      <TheorySection
        number={3}
        title="Gyöktényező kiemelése és bevitele a gyökjel alá"
        icon={<Scale className="w-5 h-5 text-pink-600" />}
        badgeColor="pink"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Kiemelés a gyökjel elé (Részleges gyökvonás)"
            badge="√(k² · a) = k√a"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Bontsuk fel a számot egy lehető legnagyobb négyzetszám és egy másik szám szorzatára:
            </p>
            <div className="mt-2 space-y-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• √50 = √(25 · 2) = √25 · √2 = <strong>5√2</strong></div>
              <div>• √72 = √(36 · 2) = √36 · √2 = <strong>6√2</strong></div>
              <div>• √48 = √(16 · 3) = √16 · √3 = <strong>4√3</strong></div>
              <div>• √20 = √(4 · 5) = √4 · √5 = <strong>2√5</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Bevitel a gyökjel alá (Összehasonlítás)"
            badge="k√a = √(k² · a)"
            badgeColor="pink"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A gyökjel előtti pozitív szorzót négyzetre emelve visszük be a gyök alá:
            </p>
            <div className="mt-2 space-y-1.5 text-xs font-mono font-bold text-pink-800 dark:text-pink-300">
              <div>• 3√5 = √(3² · 5) = √(9 · 5) = <strong>√45</strong></div>
              <div>• 4√3 = √(4² · 3) = √(16 · 3) = <strong>√48</strong></div>
              <div>• 5√2 = √(5² · 2) = √(25 · 2) = <strong>√50</strong></div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 font-normal">
                Összehasonlítás: Mivel 48 &gt; 45, ezért <strong>4√3 &gt; 3√5</strong>!
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Kiemelő kalkulátor */}
        <div className="mt-5 p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-pink-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-pink-700 dark:text-pink-300">
            <Sparkles className="w-4 h-4" />
            Interaktív Gyöktényező Kiemelő
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Írj be egy számot (pl. 50, 72, 108):</label>
              <input
                type="number"
                min="1"
                max="5000"
                value={extractNumber}
                onChange={(e) => setExtractNumber(parseInt(e.target.value) || 1)}
                className="w-24 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-700 font-mono font-bold text-xs sm:text-sm text-pink-800 dark:text-pink-300">
              {extractionInfo.text}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: AZ IRRACIONÁLIS SZÁMOK ÉS ÖSSZETETT MŰVELETEK */}
      <TheorySection
        number={4}
        title="Az irracionális számok és műveletek gyökös kifejezésekkel"
        icon={<Compass className="w-5 h-5 text-pink-600" />}
        badgeColor="pink"
      >
        <TheoryCallout variant="info" title="Mik az irracionális számok (ℚ*)?">
          Azok a számok, amelyek nem írhatók fel két egész szám hányadosaként (a/b alakban). Tizedestört alakjuk <strong>végtelen, nem szakaszos tizedestört</strong>.
          Ilyenek a nem négyzetszámok négyzetgyökei: <strong>√2, √3, √5, √7, √10, ...</strong> valamint a π szám.
          <br />
          A racionális és irracionális számok együtt alkotják a <strong>valós számok halmazát (ℝ)</strong>: ℝ = ℚ ∪ ℚ*.
        </TheoryCallout>

        <div className="mt-4 p-4 bg-pink-50/60 dark:bg-slate-850 rounded-2xl border border-pink-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-pink-800 dark:text-pink-300">
            Azonos gyöktényezők összevonása:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              3√2 + 5√2 = (3 + 5)√2 = <strong>8√2</strong>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              √50 + √18 = 5√2 + 3√2 = <strong>8√2</strong>
            </div>
          </div>
        </div>

        {/* Önellenőrző kérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-pink-50/70 to-rose-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-pink-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-pink-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi a √50 + √18 - √8 kifejezés pontos értéke legegyszerűbb alakban?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Emelj ki minden tagból a gyökjel elé (√50 = 5√2, √18 = 3√2, √8 = 2√2), majd vond össze az egynemű tagokat!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '6√2', value: 1 },
              { text: '10√2', value: 2 },
              { text: '√60', value: 3 },
              { text: '8√2', value: 4 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-pink-400'
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
                className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 1 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! √50 = 5√2, √18 = 3√2, √8 = 2√2. Ekkor 5√2 + 3√2 - 2√2 = 6√2.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! 5√2 + 3√2 - 2√2 = (5 + 3 - 2)√2 = 6√2.
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

export default SquareRootsTheory;
