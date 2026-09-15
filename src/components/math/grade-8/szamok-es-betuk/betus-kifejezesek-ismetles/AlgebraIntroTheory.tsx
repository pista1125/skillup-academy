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
  Variable,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  Layers,
  Scale,
  Equal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlgebraIntroTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const AlgebraIntroTheory: React.FC<AlgebraIntroTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive substitution calculator state: A*x^2 + B*x + C
  const [coeffA, setCoeffA] = useState<number>(3);
  const [coeffB, setCoeffB] = useState<number>(-5);
  const [coeffC, setCoeffC] = useState<number>(4);
  const [xVal, setXVal] = useState<number>(-2);

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const calculatePoly = (a: number, b: number, c: number, x: number) => {
    const term1 = a * (x * x);
    const term2 = b * x;
    const total = term1 + term2 + c;
    return {
      term1,
      term2,
      total,
      breakdown: `${a} · (${x})² + (${b}) · (${x}) + (${c}) = ${a} · ${x * x} + (${term2}) + ${c} = ${term1} + (${term2}) + ${c} = ${total}`
    };
  };

  const polyInfo = calculatePoly(coeffA, coeffB, coeffC, xVal);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-betus-ismetles"
      pdfFilename="8_osztaly_betus_kifejezesek_tananyag.pdf"
      title="9. Betűs kifejezések (ismétlés)"
      subtitle="Változók, együtthatók, egynemű tagok felismerése és összevonása, valamint a helyettesítési érték kiszámítása"
      quickRule={{
        label: "Algebra alapszabályai",
        formula: "Egynemű tagok: azonos betűk & kitevők  |  Összevonás: együtthatók művelete  |  Helyettesítés: zárójeles behelyettesítés"
      }}
      themeColor="blue"
    >
      {/* 1. FEJEZET: VÁLTOZÓK ÉS EGYÜTTHATÓK */}
      <TheorySection
        number={1}
        title="Változók, együtthatók és algebrai kifejezések"
        icon={<Variable className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryCallout variant="info" title="Mik az algebrai kifejezések alapelemei?">
          Az algebrában a számok mellett betűket (változókat, ismeretleneket) használunk. A betűk tetszőleges valós számokat helyettesítenek.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard
            title="1. Egytagú kifejezés (Monom)"
            badge="Számok és betűk szorzata"
            badgeColor="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Számok és változók szorzatából áll (nincs benne összeadás vagy kivonás).
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
              <div>• 5x²y (együttható: 5, változók: x²y)</div>
              <div>• -7a³ (együttható: -7)</div>
              <div>• 12 (konstans egytagú)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Láthatatlan együtthatók"
            badge="1 és -1"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha nincs szám kiírva a betű előtt, az együttható pontosan 1 vagy -1:
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• x = 1 · x (együttható: +1)</div>
              <div>• -x = -1 · x (együttható: -1)</div>
              <div>• -a²b = -1 · a²b</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Többtagú kifejezés (Polinom)"
            badge="Tagok összege/különbsége"
            badgeColor="purple"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egytagú kifejezések összege vagy különbsége:
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-purple-800 dark:text-purple-300">
              <div>• 3x - 5 (kéttagú: binom)</div>
              <div>• 2x² - 4x + 7 (háromtagú: trinom)</div>
              <div>• Minden tag saját előjellel rendelkezik!</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: EGYNEMŰ TAGOK ÉS ÖSSZEVONÁS */}
      <TheorySection
        number={2}
        title="Egynemű kifejezések felismerése és összevonása"
        icon={<Layers className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryCallout variant="tip" title="Mikor nevezünk két tagot egyneműnek?">
          Két vagy több egytagú kifejezés akkor <strong>egynemű</strong>, ha a <strong>változós részük pontosan megegyezik</strong> (ugyanazok a betűk szerepelnek bennük, pontosan ugyanazokon a hatványkitevőkön).
        </TheoryCallout>

        <TheoryTable
          headers={['Kifejezéspár', 'Egyneműek?', 'Indoklás és Összevonás']}
          rows={[
            ['4x és -9x', 'IGEN', 'A változó mindkettőben x¹ ⟹ 4x - 9x = -5x'],
            ['5a²b és 3a²b', 'IGEN', 'A változós rész mindkettőben a²b ⟹ 5a²b + 3a²b = 8a²b'],
            ['3x és 3x²', 'NEM', 'A kitevők eltérnek (x¹ ≠ x²). NEM vonhatók össze!'],
            ['4ab és 4a²b', 'NEM', 'Az a kitevője eltér (a¹ ≠ a²). NEM vonhatók össze!'],
            ['6xy és -2yx', 'IGEN', 'A szorzás tényezői felcserélhetők (xy = yx) ⟹ 6xy - 2xy = 4xy']
          ]}
        />

        <div className="mt-4 p-4 bg-blue-50/70 dark:bg-slate-850 rounded-2xl border border-blue-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-blue-800 dark:text-blue-300">
            Összevonás több különböző változó esetén:
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Külön csoportosítjuk és vonjuk össze az azonos típusú tagokat:
          </p>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 space-y-1">
            <div>4x + 3y - 7x + 5y + 6 = (4 - 7)x + (3 + 5)y + 6 = <strong>-3x + 8y + 6</strong></div>
            <div>3a² - 4a + 5 - 2a² + 7a - 8 = (3 - 2)a² + (-4 + 7)a + (5 - 8) = <strong>a² + 3a - 3</strong></div>
          </div>
        </div>

        <TheoryTrapBox title="Gyakori hiba: Nem egynemű tagok összevonása">
          <div className="space-y-1 text-xs">
            <p>
              • <strong>VIGYÁZAT: 3x + 2x² ≠ 5x³!</strong> Az eltérő kitevőjű tagokat nem lehet összevonni, a kifejezés marad: 3x + 2x².
              <br />
              • <strong>VIGYÁZAT: 4a + 3b ≠ 7ab!</strong> Különböző változókat összeadáskor nem gyúrhatunk egybe szorzattá!
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. FEJEZET: HELYETTESÍTÉSI ÉRTÉK */}
      <TheorySection
        number={3}
        title="Helyettesítési érték kiszámítása"
        icon={<Calculator className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryCallout variant="info" title="Hogyan számoljuk ki a helyettesítési értéket?">
          1. <strong>Egyszerűsítés:</strong> Ha lehet, először vonjuk össze az egynemű tagokat!
          <br />
          2. <strong>Behelyettesítés:</strong> Írjuk be a változók helyére a megadott számokat (negatív számnál tegyük zárójelbe!).
          <br />
          3. <strong>Műveleti sorrend:</strong> Először a hatványozást, majd a szorzást/osztást, végül az összeadást/kivonást végezzük el.
        </TheoryCallout>

        {/* Interaktív helyettesítési érték kalkulátor */}
        <div className="mt-5 p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-blue-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <Sparkles className="w-4 h-4" />
            Interaktív Helyettesítési Érték Számoló: A · x² + B · x + C
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">A (x² együttható):</label>
              <input
                type="number"
                value={coeffA}
                onChange={(e) => setCoeffA(parseInt(e.target.value) || 0)}
                className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs bg-white dark:bg-slate-900 text-center"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">B (x együttható):</label>
              <input
                type="number"
                value={coeffB}
                onChange={(e) => setCoeffB(parseInt(e.target.value) || 0)}
                className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs bg-white dark:bg-slate-900 text-center"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">C (konstans):</label>
              <input
                type="number"
                value={coeffC}
                onChange={(e) => setCoeffC(parseInt(e.target.value) || 0)}
                className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs bg-white dark:bg-slate-900 text-center"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-blue-600 dark:text-blue-400">x értéke:</label>
              <input
                type="number"
                value={xVal}
                onChange={(e) => setXVal(parseInt(e.target.value) || 0)}
                className="w-full h-8 px-2 rounded-lg border border-blue-400 dark:border-blue-600 font-mono font-bold text-xs bg-blue-50/50 dark:bg-slate-900 text-center"
              />
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-800 font-mono text-xs text-blue-900 dark:text-blue-200 space-y-1">
            <div className="font-bold">Kifejezés: {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}x` : `- ${Math.abs(coeffB)}x`} {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`}</div>
            <div className="text-slate-600 dark:text-slate-400 text-[11px]">{polyInfo.breakdown}</div>
            <div className="text-sm font-black text-blue-700 dark:text-blue-300 pt-1">Helyettesítési érték = {polyInfo.total}</div>
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: ÖSSZETETT FELADATOK ÉS ÖNELLENŐRZÉS */}
      <TheorySection
        number={4}
        title="Összetett algebrai feladatok és önellenőrzés"
        icon={<Equal className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <TheoryCallout variant="tip" title="Zárójelfelbontás és előjelek">
          Ha a zárójel előtt <strong>mínusz jel</strong> áll, a zárójel elhagyásakor <strong>minden belső tag előjele megfordul</strong>:
          <br />
          <strong className="font-mono text-blue-800 dark:text-blue-300">-(2x - 3y + 5) = -2x + 3y - 5</strong>
        </TheoryCallout>

        {/* Önellenőrző kérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-blue-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi a 3(2x - 4) - 2(3x - 5) kifejezés pontos értéke?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Bontsd fel a zárójeleket (szorozd be a tagokat), majd vond össze az egynemű kifejezéseket!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '-2', value: 1 },
              { text: '12x - 22', value: 2 },
              { text: '+2', value: 3 },
              { text: '-22', value: 4 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400'
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
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 1 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! 1. lépés: 3(2x - 4) = 6x - 12. 2. lépés: -2(3x - 5) = -6x + 10. Összevonva: 6x - 12 - 6x + 10 = -2.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! 6x - 12 - 6x + 10 = (6x - 6x) + (-12 + 10) = -2.
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

export default AlgebraIntroTheory;
