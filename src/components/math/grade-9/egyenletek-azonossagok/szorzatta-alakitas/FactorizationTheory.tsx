import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Scale,
  Equal,
  Puzzle,
  FolderTree,
  HelpCircle,
  Hash
} from 'lucide-react';
import {
  FactoringTreeSvg,
  CommonFactorSvg,
  GroupingSvg,
  TwoStepFactoringSvg
} from './FactorizationFigures';

interface FactorizationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const FactorizationTheory: React.FC<FactorizationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV SZORZATTÁ ALAKÍTÓ SZIMULÁTOR ÁLLAPOTOK ---
  const [method, setMethod] = useState<'common' | 'diff_sq' | 'perfect_sq' | 'two_step'>('common');
  const [paramA, setParamA] = useState<number>(3);
  const [paramB, setParamB] = useState<number>(6);

  const calculation = useMemo(() => {
    if (method === 'common') {
      // a·x² + b·x = x(a·x + b) vagy gcd-vel
      return {
        original: `${paramA}x² + ${paramB}x`,
        methodName: 'Közös tényező kiemelése',
        step1: `1. Keresd meg a számok és a betűk közös osztóját!`,
        step2: `Mindkét tag osztható x-szel (és a számok közös osztójával).`,
        step3: `Ha kiemeljük az x-et: ${paramA}x² / x = ${paramA}x, és ${paramB}x / x = ${paramB}`,
        result: `x · (${paramA}x + ${paramB})`
      };
    } else if (method === 'diff_sq') {
      // x² - b² = (x - b)(x + b)
      const bSq = paramB * paramB;
      return {
        original: `x² - ${bSq}`,
        methodName: 'Négyzetek különbsége: a² - b² = (a - b)(a + b)',
        step1: `1. Ismerd fel a két négyzetszámot: x² = (x)² és ${bSq} = (${paramB})²`,
        step2: `2. Alkalmazd az (a - b)(a + b) azonosságot a = x és b = ${paramB} értékekkel!`,
        step3: `3. Felírás szorzatként: (x - ${paramB})(x + ${paramB})`,
        result: `(x - ${paramB}) · (x + ${paramB})`
      };
    } else if (method === 'perfect_sq') {
      // x² + 2bx + b² = (x + b)²
      const twoB = 2 * paramB;
      const bSq = paramB * paramB;
      return {
        original: `x² + ${twoB}x + ${bSq}`,
        methodName: 'Teljes négyzetté alakítás: a² + 2ab + b² = (a + b)²',
        step1: `1. Első tag négyzete: x² → a = x`,
        step2: `2. Utolsó tag négyzete: ${bSq} = (${paramB})² → b = ${paramB}`,
        step3: `3. Ellenőrizd a középső tagot: 2 · x · ${paramB} = ${twoB}x  ✓ Stimmel!`,
        result: `(x + ${paramB})²`
      };
    } else {
      // 2x² - 2b² = 2(x² - b²) = 2(x - b)(x + b)
      const bSq = paramB * paramB;
      const origConst = 2 * bSq;
      return {
        original: `2x² - ${origConst}`,
        methodName: 'Kétszeres szorzattá alakítás (kiemelés + azonosság)',
        step1: `1. lépés: Emeld ki a közös számot (2-t): 2 · (x² - ${bSq})`,
        step2: `2. lépés: Ismerd fel a zárójelben a négyzetek különbségét: x² - ${paramB}²`,
        step3: `3. lépés: Alakítsd szorzattá a belső részt: (x - ${paramB})(x + ${paramB})`,
        result: `2 · (x - ${paramB}) · (x + ${paramB})`
      };
    }
  }, [method, paramA, paramB]);

  return (
    <TheoryTemplate
      title="Szorzattá Alakítás – Kiemelés, Nevezetes Azonosságok és Csoportosítás"
      subtitle="Összegből szorzat: a legnagyobb közös osztó kiemelése, a nevezetes azonosságok visszafelé alkalmazása és többtagú csoportosítás 9. osztályban"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 4. TÉMAKÖR"
      themeColor="violet"
      documentId="factorization-theory"
      pdfFilename="9_osztaly_szorzatta_alakitas.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Szorzattá Alakítás 3 Arany Főmódszere',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-violet-600 dark:text-violet-400 font-black">1. Kiemelés (Mindig ezzel kezdj!): </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">ab + ac = a · (b + c)</span>
            </div>
            <div>
              <span className="text-purple-600 dark:text-purple-400 font-black">2. Azonosságok visszafelé: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">a² - b² = (a - b)(a + b) &nbsp;|&nbsp; a² ± 2ab + b² = (a ± b)²</span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">3. Csoportosítás (4 tag esetén): </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">ax + ay + bx + by = (x + y)(a + b)</span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: MIÉRT ALAKÍTUNK SZORZATTÁ? */}
      <TheorySection
        number={1}
        title="Mi a Szorzattá Alakítás és Miért Nélkülözhetetlen?"
        icon={<FolderTree className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badge="Alapkoncepció"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A szorzattá alakítás azt jelenti, hogy egy összeget vagy különbséget (polinomot) <strong>tényezők szorzataként</strong> írunk fel.
          Ez a művelet a zárójelfelbontás pontos fordítottja.
        </p>

        {/* Miért szorzattá alakítunk ábra */}
        <div className="flex justify-center my-6">
          <FactoringTreeSvg size={380} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Szorzatos Egyenletek Megoldása"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Egy szorzat pontosan akkor egyenlő 0-val, ha <strong>legalább az egyik tényezője nulla</strong>!
              Például az <code className="font-mono font-bold text-emerald-700">x² - 9 = 0</code> egyenlet szorzattá alakítva:
              <code className="block font-mono font-bold my-1 text-emerald-800 dark:text-emerald-300">(x - 3)(x + 3) = 0  ⇒  x = 3 vagy x = -3</code>
              Így a bonyolult másodfokú egyenlet két egyszerű elsőfokú egyenletre esik szét!
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Algebrai Törtek Egyszerűsítése"
            icon={<Layers className="w-5 h-5 text-violet-600" />}
            color="violet"
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Törtből tagot egyszerűsíteni tilos, <strong>csak közös szorzótényezőt szabad egyszerűsíteni</strong>!
              Ezért a számlálót és nevezőt először szorzattá kell alakítani:
              <code className="block font-mono font-bold my-1 text-violet-800 dark:text-violet-300">(x² - 9) / (x - 3) = [(x - 3)(x + 3)] / (x - 3) = x + 3</code>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: KÖZÖS TÉNYEZŐ KIEMELÉSE */}
      <TheorySection
        number={2}
        title="Közös Tényező Kiemelése a Zárójel Elé"
        icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="1. Alapmódszer"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Mindig ezzel a lépéssel kezdünk! Megkeressük az összes tagban szereplő <strong>legnagyobb közös osztót (LNKO)</strong>,
          mind a számegyütthatók, mind a változók legkisebb kitevőjű hatványa tekintetében, és ezt a zárójel elé írjuk.
        </p>

        {/* Kiemelés ábra */}
        <div className="flex justify-center my-6">
          <CommonFactorSvg size={380} />
        </div>

        <TheoryTable
          headers={['Eredeti kifejezés', 'Közös tényező', 'Szorzattá alakított alak', 'Ellenőrzés visszaszorzással']}
          rows={[
            ['6x + 15', '3', '3 · (2x + 5)', '3·2x + 3·5 = 6x + 15  ✓'],
            ['x² - 7x', 'x', 'x · (x - 7)', 'x·x - x·7 = x² - 7x  ✓'],
            ['12x³ - 8x²', '4x²', '4x² · (3x - 2)', '4x²·3x - 4x²·2 = 12x³ - 8x²  ✓'],
            ['5a²b - 10ab²', '5ab', '5ab · (a - 2b)', '5ab·a - 5ab·2b = 5a²b - 10ab²  ✓'],
            ['-4x - 8', '-4', '-4 · (x + 2)', '-4·x + (-4)·2 = -4x - 8  ✓']
          ]}
        />

        <TheoryTrapBox
          title="Típushiba: Ha a teljes tagot kiemeljük, +1 marad utána, nem 0!"
          trap="5x + 5 = 5 · (x) = 5x  (HIBÁS!)"
          correction="5x + 5 = 5 · (x + 1)  (HELYES!)"
          explanation="Mivel 5 = 5 · 1, a kiemelés után a zárójelben ott kell maradnia a +1-nek, különben visszaszorzáskor eltűnne a második tag!"
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: NEVEZETES AZONOSSÁGOK ALKALMAZÁSA VISSZAFELÉ */}
      <TheorySection
        number={3}
        title="Nevezetes Azonosságok Alkalmazása Visszafelé"
        icon={<Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badge="2. Alapmódszer"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <p>
            Ha a kifejezés nem tartalmaz kiemelhető közös tényezőt, megvizsgáljuk, hogy felismerhető-e benne egy nevezetes szorzat kifejtett alakja.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800">
              <h4 className="font-bold text-violet-900 dark:text-violet-200 text-sm mb-2">
                A) Négyzetek Különbsége: a² - b² = (a - b)(a + b)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Két négyzetszám különbsége azonnal kéttagú szorzattá bomlik:
              </p>
              <ul className="space-y-1 text-xs font-mono text-violet-800 dark:text-violet-300 font-bold">
                <li>• x² - 36 = (x - 6)(x + 6)</li>
                <li>• 4x² - 25 = (2x - 5)(2x + 5)</li>
                <li>• 9a² - 49b² = (3a - 7b)(3a + 7b)</li>
                <li>• 1 - x² = (1 - x)(1 + x)</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <h4 className="font-bold text-purple-900 dark:text-purple-200 text-sm mb-2">
                B) Teljes Négyzetté Alakítás: a² ± 2ab + b² = (a ± b)²
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Háromtagú kifejezéseknél ellenőrizzük a szélső tagok négyzetét és a középső kétszeres szorzatot:
              </p>
              <ul className="space-y-1 text-xs font-mono text-purple-800 dark:text-purple-300 font-bold">
                <li>• x² + 6x + 9 = (x + 3)²</li>
                <li>• x² - 10x + 25 = (x - 5)²</li>
                <li>• 4x² + 12x + 9 = (2x + 3)²</li>
                <li>• 9x² - 24xy + 16y² = (3x - 4y)²</li>
              </ul>
            </div>
          </div>

          {/* INTERAKTÍV SZORZATTÁ ALAKÍTÓ SZIMULÁTOR */}
          <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-slate-900 dark:to-violet-950/30 border-2 border-violet-200 dark:border-violet-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-violet-600" />
              <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
                Interaktív Szorzattá Alakító Labor
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              Válaszd ki a szorzattá alakítási stratégiát, és kövesd a lépésről-lépésre levezetést!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              <button
                onClick={() => setMethod('common')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  method === 'common'
                    ? 'bg-violet-600 text-white shadow'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400'
                }`}
              >
                Kiemelés: ax² + bx
              </button>
              <button
                onClick={() => setMethod('diff_sq')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  method === 'diff_sq'
                    ? 'bg-violet-600 text-white shadow'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400'
                }`}
              >
                Négyzetek: x² - b²
              </button>
              <button
                onClick={() => setMethod('perfect_sq')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  method === 'perfect_sq'
                    ? 'bg-violet-600 text-white shadow'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400'
                }`}
              >
                Teljes négyzet: x² + 2bx + b²
              </button>
              <button
                onClick={() => setMethod('two_step')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  method === 'two_step'
                    ? 'bg-violet-600 text-white shadow'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400'
                }`}
              >
                Kétszeres: 2(x² - b²)
              </button>
            </div>

            {/* Paraméterek */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-5 text-xs flex flex-wrap gap-4 items-center">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 mr-2">
                  b paraméter: <span className="text-violet-600 font-black">{paramB}</span>
                </span>
                <div className="inline-flex gap-1">
                  {[2, 3, 4, 5, 6, 7].map((val) => (
                    <button
                      key={val}
                      onClick={() => setParamB(val)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${paramB === val ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Levezetés kártya */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-slate-400">Kiinduló kifejezés:</span>
                <span className="text-sm font-bold text-violet-300">{calculation.original}</span>
              </div>
              <div className="text-slate-300 space-y-1 py-1">
                <div className="text-amber-300 font-bold">{calculation.methodName}</div>
                <div>{calculation.step1}</div>
                <div>{calculation.step2}</div>
                <div>{calculation.step3}</div>
              </div>
              <div className="flex justify-between items-center border-t border-slate-700 pt-2 text-sm">
                <span className="text-slate-400 font-bold">Szorzattá alakított alak:</span>
                <span className="text-emerald-400 font-black text-base">{calculation.result}</span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: CSOPORTOSÍTÁSOS MÓDSZER */}
      <TheorySection
        number={4}
        title="Csoportosításos Szorzattá Alakítás (4 tag esetén)"
        icon={<Puzzle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="3. Alapmódszer"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Ha egy négytagú kifejezésben nincs olyan tényező, amely mind a négy tagban közös lenne,
          akkor <strong>párokba rendezzük (csoportosítjuk)</strong> a tagokat:
        </p>

        {/* Csoportosítás ábra */}
        <div className="flex justify-center my-6">
          <GroupingSvg size={380} />
        </div>

        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-2">
          <div className="font-bold text-indigo-700 dark:text-indigo-300">
            Mintafeladat: 3ax + 3ay + 2bx + 2by = ?
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            1. lépés: Kiemelünk az első két tagból (3a-t) és a második két tagból (2b-t):
          </div>
          <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
            = 3a(x + y) + 2b(x + y)
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            2. lépés: Észrevesszük a közös (x + y) zárójelet, és ezt emeljük ki:
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
            = (x + y) · (3a + 2b)
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TÖBBLÉPCSŐS SZORZATTÁ ALAKÍTÁS ÉS ARANYSZABÁLY */}
      <TheorySection
        number={5}
        title="Többlépcsős Szorzattá Alakítás: Előbb Kiemelünk, Utána Azonosság!"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Érettségi Stratégia"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <p>
            Az érettségi és felvételi feladatok leggyakoribb trükkje: a kifejezés nem azonnal nevezetes szorzat,
            hanem egy <strong>szám kiemelése után válik azzá</strong>!
          </p>

          {/* Kétszeres kiemelés ábra */}
          <div className="flex justify-center my-6">
            <TwoStepFactoringSvg size={380} />
          </div>

          <TheoryTable
            headers={['Feladat', '1. lépés (Kiemelés)', '2. lépés (Azonosság)', 'Végleges szorzatalak']}
            rows={[
              ['2x² - 18', '2 · (x² - 9)', 'x² - 9 = (x - 3)(x + 3)', '2 · (x - 3)(x + 3)'],
              ['3x² + 18x + 27', '3 · (x² + 6x + 9)', 'x² + 6x + 9 = (x + 3)²', '3 · (x + 3)²'],
              ['5x³ - 5x', '5x · (x² - 1)', 'x² - 1 = (x - 1)(x + 1)', '5x · (x - 1)(x + 1)'],
              ['a⁴ - 16', 'Nincs közös szám', '(a² - 4)(a² + 4)', '(a - 2)(a + 2)(a² + 4)']
            ]}
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
