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
  Variable,
  Calculator,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileCode,
  Sliders,
  Scale,
  Equal,
  HelpCircle,
  Hash
} from 'lucide-react';
import {
  MonomialStructureSvg,
  EvaluationMachineSvg,
  LikeTermsBalanceSvg,
  TextToFormulaSvg
} from './VariablesFigures';

interface VariablesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const VariablesTheory: React.FC<VariablesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HELYETTESÍTÉSI ÉRTÉK LABOR ÁLLAPOTOK ---
  const [exprType, setExprType] = useState<'linear' | 'quadratic' | 'poly2' | 'fraction'>('quadratic');
  const [valX, setValX] = useState<number>(-2);
  const [valY, setValY] = useState<number>(3);

  // Számítások és levezetések lépésről lépésre
  const evaluation = useMemo(() => {
    if (exprType === 'linear') {
      // Kifejezés: 3x - 5
      const term1 = 3 * valX;
      const res = term1 - 5;
      return {
        formula: '3x - 5',
        subst: `3 · (${valX}) - 5`,
        steps: [
          `1. lépés (Behelyettesítés): 3 · (${valX}) - 5`,
          `2. lépés (Szorzás elvégzése): ${term1} - 5`,
          `3. lépés (Kivonás): ${res}`
        ],
        result: res,
        isUndefined: false
      };
    } else if (exprType === 'quadratic') {
      // Kifejezés: 2x² - 3x + 4
      const xSq = valX * valX;
      const term1 = 2 * xSq;
      const term2 = -3 * valX;
      const res = term1 + term2 + 4;
      return {
        formula: '2x² - 3x + 4',
        subst: `2 · (${valX})² - 3 · (${valX}) + 4`,
        steps: [
          `1. lépés (Hatványozás): (${valX})² = ${xSq}`,
          `2. lépés (Szorzások): 2 · ${xSq} = ${term1}, és -3 · (${valX}) = ${term2 >= 0 ? '+' + term2 : term2}`,
          `3. lépés (Összeadás): ${term1} + (${term2}) + 4 = ${res}`
        ],
        result: res,
        isUndefined: false
      };
    } else if (exprType === 'poly2') {
      // Kifejezés: 2x² - 3xy + y²
      const xSq = valX * valX;
      const term1 = 2 * xSq;
      const xy = valX * valY;
      const term2 = -3 * xy;
      const ySq = valY * valY;
      const res = term1 + term2 + ySq;
      return {
        formula: '2x² - 3xy + y²',
        subst: `2 · (${valX})² - 3 · (${valX}) · (${valY}) + (${valY})²`,
        steps: [
          `1. lépés (Négyzetek): x² = (${valX})² = ${xSq}, y² = (${valY})² = ${ySq}`,
          `2. lépés (Szorzatok): 2 · ${xSq} = ${term1}, és -3 · (${valX}) · (${valY}) = ${term2 >= 0 ? '+' + term2 : term2}`,
          `3. lépés (Összegzés): ${term1} + (${term2}) + ${ySq} = ${res}`
        ],
        result: res,
        isUndefined: false
      };
    } else {
      // Kifejezés: (3x + 6) / (x - 2)
      const num = 3 * valX + 6;
      const den = valX - 2;
      if (den === 0) {
        return {
          formula: '(3x + 6) / (x - 2)',
          subst: `(3 · (${valX}) + 6) / ((${valX}) - 2)`,
          steps: [
            `Számláló értéke: 3 · (${valX}) + 6 = ${num}`,
            `Nevező értéke: ${valX} - 2 = 0`,
            `FIGYELEM: Nullával nem osztunk! A kifejezés nem értelmezhető az x = 2 helyen!`
          ],
          result: 'NEM ÉRTELMEZHETŐ (0 a nevező)',
          isUndefined: true
        };
      }
      const res = num / den;
      return {
        formula: '(3x + 6) / (x - 2)',
        subst: `(3 · (${valX}) + 6) / ((${valX}) - 2)`,
        steps: [
          `1. lépés (Számláló): 3 · (${valX}) + 6 = ${num}`,
          `2. lépés (Nevező): (${valX}) - 2 = ${den}`,
          `3. lépés (Osztás): ${num} / ${den} = ${Number.isInteger(res) ? res : res.toFixed(3)}`
        ],
        result: Number.isInteger(res) ? res : res.toFixed(3),
        isUndefined: false
      };
    }
  }, [exprType, valX, valY]);

  return (
    <TheoryTemplate
      title="A Betűk Szerepe a Számolásban – Változók és Helyettesítési Érték"
      subtitle="Monomok, polinomok, együtthatók, kitevők, egynemű tagok és a precíz helyettesítési érték számítása 9. osztályban"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 1. TÉMAKÖR"
      themeColor="blue"
      documentId="variables-theory"
      pdfFilename="9_osztaly_a_betuk_szerepe_a_szamolasban.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Két Legfontosabb Alapszabály az Algebrában',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-black">Helyettesítési érték aranyszabálya: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                A betű helyére beírt negatív számot vagy törtet mindig zárójelbe tesszük! Pl. (-3)² = 9, de -3² = -9!
              </span>
            </div>
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Egynemű kifejezések összevonása: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Csak azok a tagok vonhatók össze, amelyek betűs része (változók és azok kitevői) betűről betűre megegyezik! (Pl. 3a²b + 5a²b = 8a²b)
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: MIÉRT HASZNÁLUNK BETŰKET? VÁLTOZÓK ÉS KONSTANSOK */}
      <TheorySection
        number={1}
        title="Miért használunk betűket a matematikában?"
        icon={<Variable className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Fogalmi Alapok"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az alsóbb évfolyamokon a számolás túlnyomórészt konkrét számokkal történt (pl. <code className="font-mono">5 + 7 = 12</code>).
          A középiskolai matematikában a betűk használata nélkülözhetetlen, mert lehetővé teszi az általános törvényszerűségek
          és kapcsolatok leírását.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <TheoryCard
            title="1. Általánosítás (Képletek)"
            icon={<FileCode className="w-5 h-5 text-blue-500" />}
            color="blue"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Minden számra érvényes összefüggések felírása: pl. az összeadás felcserélhetősége:
              <span className="block font-mono font-bold text-blue-700 dark:text-blue-300 mt-1">a + b = b + a</span>
              vagy egy téglalap területe: <span className="font-mono font-bold">T = a · b</span>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Változó mennyiségek"
            icon={<Sliders className="w-5 h-5 text-indigo-500" />}
            color="indigo"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Olyan mennyiségek leírása, amelyek értéke változhat egy folyamat során (pl. egy autó által megtett út
              az idő függvényében: <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300">s = v · t</span>).
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Ismeretlen mennyiségek"
            icon={<HelpCircle className="w-5 h-5 text-emerald-500" />}
            color="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Egyenletekben és szöveges feladatokban a még meg nem határozott keresett számot jelöljük betűvel
              (leggyakrabban <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">x, y, z</span>).
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          type="tip"
          title="Változó vagy konstans? (Paraméterek)"
        >
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <p>
              A matematikában <strong>változónak</strong> nevezzük a tetszőleges számértéket felvevő betűket (általában az ábécé végi betűk: <code className="font-mono">x, y, z, t</code>).
            </p>
            <p>
              <strong>Konstansnak</strong> vagy <strong>paraméternek</strong> nevezzük a rögzített, adott értéket jelölő betűket (gyakran az ábécé elejéről: <code className="font-mono">a, b, c, k</code>).
              Például a lineáris függvény általános alakjában: <code className="font-mono font-bold text-blue-600">f(x) = ax + b</code> az <code className="font-mono">x</code> a változó, míg az <code className="font-mono">a</code> és <code className="font-mono">b</code> rögzített paraméterek.
            </p>
          </div>
        </TheoryCallout>

        {/* Szövegből képlet ábra */}
        <div className="flex justify-center my-6">
          <TextToFormulaSvg size={380} />
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: ALGEBRAI KIFEJEZÉSEK FELÉPÍTÉSE (MONOMOK ÉS POLINOMOK) */}
      <TheorySection
        number={2}
        title="Algebrai kifejezések felépítése: Monomok és Polinomok"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Struktúra & Anatómia"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az algebrai kifejezés olyan matematikai formula, amely számokból, betűkből (változókból), valamint a rájuk vonatkozó
          műveleti jelekből és zárójelekből épül fel.
        </p>

        {/* Monom anatómiai ábra */}
        <div className="flex justify-center my-6">
          <MonomialStructureSvg size={400} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          <TheoryCard
            title="Egytagú kifejezés (Monom)"
            icon={<Hash className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <p>
                Számok és változók szorzata, valamint hatványai. Benne összeadás és kivonás nem szerepel (legfeljebb az együttható előjeleként).
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl font-mono text-xs">
                <div>Példák: <span className="text-blue-600 font-bold">5x</span>, <span className="text-blue-600 font-bold">-7a²b³</span>, <span className="text-blue-600 font-bold">42</span>, <span className="text-blue-600 font-bold">x</span></div>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li><strong>Együttható:</strong> A monom numerikus szorzótényezője (pl. <code className="font-mono">-7a²b³</code> esetén <code className="font-mono text-red-600 font-bold">-7</code>; ha nincs kiírva szám, akkor <code className="font-mono">x = 1·x</code> miatt <code className="font-mono font-bold">1</code>; <code className="font-mono">-x = -1·x</code> miatt <code className="font-mono font-bold">-1</code>).</li>
                <li><strong>Fokszám:</strong> A változók kitevőinek összege (pl. <code className="font-mono">-7a²b³</code> foka: <code className="font-mono">2 + 3 = 5</code>; egy konstans szám foka <code className="font-mono">0</code>).</li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Többtagú kifejezés (Polinom)"
            icon={<Layers className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <p>
                Egytagú kifejezések (monomok) algebrai összege vagy különbsége.
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl font-mono text-xs">
                <div>Kéttagú (Binom): <span className="text-indigo-600 font-bold">3x - 5</span></div>
                <div>Háromtagú (Trinom): <span className="text-indigo-600 font-bold">2x² - 4x + 7</span></div>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li><strong>Polinom foka:</strong> A polinomot alkotó tagok fokszámai közül a <em>legnagyobb</em> (pl. a <code className="font-mono">4x³ - 5x² + 2</code> polinom foka <code className="font-mono font-bold">3</code>, mert a legmagasabb kitevő 3).</li>
                <li><strong>Konstans tag:</strong> Az a tag, amely nem tartalmaz változót (pl. a fenti polinomban a <code className="font-mono font-bold">+2</code>).</li>
              </ul>
            </div>
          </TheoryCard>
        </div>

        {/* Monom és Polinom összefoglaló táblázat */}
        <TheoryTable
          headers={['Kifejezés', 'Típus', 'Tagok száma', 'Együttható(k)', 'Fokszám']}
          rows={[
            ['7x³', 'Monom (egytagú)', '1', '7', '3'],
            ['-2a²b⁴', 'Monom (egytagú)', '1', '-2', '2 + 4 = 6'],
            ['-x', 'Monom (egytagú)', '1', '-1', '1'],
            ['5', 'Monom (konstans)', '1', '5', '0'],
            ['3x² - 5x + 8', 'Polinom (trinom)', '3', '3; -5; 8', '2 (legnagyobb fok)'],
            ['4a³b - 2ab⁴ + 9', 'Polinom', '3', '4; -2; 9', '5 (mert 1+4 = 5)']
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: EGYNEMŰ KIFEJEZÉSEK ÉS ÖSSZEVONÁS */}
      <TheorySection
        number={3}
        title="Egynemű kifejezések felismerése és összevonása"
        icon={<Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Műveleti Alapszabály"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az algebrai kifejezések egyszerűsítésének leggyakoribb lépése az <strong>egynemű tagok összevonása</strong>.
          De mikor egynemű két kifejezés?
        </p>

        <TheoryCallout
          type="info"
          title="Egynemű kifejezések definíciója"
        >
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Két vagy több egytagú kifejezést <strong>egyneműnek</strong> nevezünk, ha a betűs részük (változóik és azok kitevői)
            teljesen megegyezik, legfeljebb csak az együtthatójukban különböznek.
          </p>
        </TheoryCallout>

        <div className="flex justify-center my-6">
          <LikeTermsBalanceSvg size={380} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-200 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Egynemű párok (Összevonhatók):
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <li>• <span className="font-bold">4x</span> és <span className="font-bold">-9x</span> → (4 - 9)x = -5x</li>
              <li>• <span className="font-bold">3a²b</span> és <span className="font-bold">7a²b</span> → (3 + 7)a²b = 10a²b</li>
              <li>• <span className="font-bold">5xy</span> és <span className="font-bold">2yx</span> → a szorzás felcserélhető, így 7xy!</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-200 text-sm mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Különnemű tagok (NEM vonhatók össze):
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <li>• <span className="font-bold">3x</span> és <span className="font-bold">3x²</span> (más a kitevő! Nem lesz 6x³!)</li>
              <li>• <span className="font-bold">5a²b</span> és <span className="font-bold">5ab²</span> (az a és b kitevői fel vannak cserélve)</li>
              <li>• <span className="font-bold">4x</span> és <span className="font-bold">4</span> (az egyik változós, a másik konstans)</li>
            </ul>
          </div>
        </div>

        <TheoryTrapBox
          title="Típushiba: Összeadásnál ne változtasd meg a kitevőt!"
          trap="3x² + 4x² = 7x⁴  (HIBÁS!)"
          correction="3x² + 4x² = (3 + 4)x² = 7x²  (HELYES!)"
          explanation="Összevonáskor csak az együtthatókat adjuk össze vagy vonjuk ki a disztributivitás alapján (kiemelés elve), a betűs rész és a kitevő teljesen változatlan marad!"
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: HELYETTESÍTÉSI ÉRTÉK SZÁMÍTÁSA ÉS INTERAKTÍV LABOR */}
      <TheorySection
        number={4}
        title="A Helyettesítési Érték Számítása és Interaktív Szimulátor"
        icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Gyakorlati Számítások"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Egy algebrai kifejezés <strong>helyettesítési értékét</strong> úgy kapjuk meg, hogy a változók helyére konkrét
          számokat írunk, majd a megadott műveleti sorrend szerint elvégezzük a kijelölt műveleteket.
        </p>

        {/* Helyettesítési gép ábra */}
        <div className="flex justify-center my-6">
          <EvaluationMachineSvg size={400} />
        </div>

        {/* INTERAKTÍV HELYETTESÍTÉSI LABOR KÁRTYA */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900 dark:to-blue-950/30 border-2 border-blue-200 dark:border-blue-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
              Interaktív Helyettesítési Érték Szimulátor
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Válassz ki egy kifejezést, állítsd be a változók értékét a gombokkal, és figyeld meg a lépésről-lépésre történő levezetést!
          </p>

          {/* Kifejezés választó gombok */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            <button
              onClick={() => setExprType('linear')}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                exprType === 'linear'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              3x - 5
            </button>
            <button
              onClick={() => setExprType('quadratic')}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                exprType === 'quadratic'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              2x² - 3x + 4
            </button>
            <button
              onClick={() => setExprType('poly2')}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                exprType === 'poly2'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              2x² - 3xy + y²
            </button>
            <button
              onClick={() => setExprType('fraction')}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                exprType === 'fraction'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              (3x + 6) / (x - 2)
            </button>
          </div>

          {/* Változó beállító gombok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  x értéke: <span className="font-mono text-blue-600 font-black text-sm">{valX}</span>
                </span>
                <span className="text-[10px] text-slate-400">Válassz értéket:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[-3, -2, -1, 0, 1, 2, 3, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setValX(val)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      valX === val
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {exprType === 'poly2' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    y értéke: <span className="font-mono text-purple-600 font-black text-sm">{valY}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Válassz értéket:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => setValY(val)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        valY === val
                          ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Levezetés és Végeredmény panel */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono space-y-2">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-xs text-slate-400">Kifejezés:</span>
              <span className="text-sm font-bold text-cyan-300">{evaluation.formula}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-700 pb-2 text-xs">
              <span className="text-slate-400">Behelyettesítés:</span>
              <span className="text-amber-300">{evaluation.subst}</span>
            </div>
            <div className="text-xs space-y-1 py-1 text-slate-300">
              {evaluation.steps.map((st, i) => (
                <div key={i}>{st}</div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-slate-700 pt-2">
              <span className="text-xs font-bold text-slate-300">Helyettesítési érték:</span>
              <span
                className={`text-lg font-black ${
                  evaluation.isUndefined ? 'text-rose-400 text-sm' : 'text-emerald-400'
                }`}
              >
                {evaluation.result}
              </span>
            </div>
          </div>
        </div>

        {/* Előjelcsapdák részletesen */}
        <TheoryTrapBox
          title="A legnagyobb előjel- és hatványozási csapda: (-x)² vs -x²"
          trap="Ha x = -3, akkor -x² = -(-3)² = 9  (HIBÁS!)"
          correction="Ha x = -3, akkor -x² = - ( (-3)² ) = -9  (HELYES!)"
          explanation="A hatványozás magasabb rendű művelet, mint az előjelváltás (szorzás -1-gyel). Ezért -x² azt jelenti: -(x²). Ha x = -3, akkor (-3)² = 9, és annak az ellentettje -9!"
        />
      </TheorySection>

      {/* 5. SZEKCIÓ: ÉRTELMEZÉSI TARTOMÁNY ÉS SZÖVEGES MODELLEZÉS */}
      <TheorySection
        number={5}
        title="Értelmezési Tartomány és Szövegből Algebrai Kifejezés"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Alkalmazások & Kikötések"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <p>
            Minden algebrai kifejezésnél tisztázni kell, hogy a változók helyére milyen számokat szabad behelyettesíteni.
            Ezt a halmazt nevezzük a kifejezés <strong>értelmezési tartományának (É.T.)</strong>.
          </p>

          <TheoryCallout
            type="warning"
            title="A nullával való osztás tilalma"
          >
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <p>
                A valós számok halmazán a <strong>nullával való osztás nem értelmezett</strong>. Ezért, ha egy kifejezés nevezőjében változó szerepel,
                meg kell követelnünk, hogy a nevező értéke ne legyen egyenlő 0-val:
              </p>
              <div className="bg-amber-100 dark:bg-amber-950/50 p-2 rounded-xl font-mono font-bold text-amber-900 dark:text-amber-200">
                Példa: (2x + 1) / (x - 4)  →  Kikötés: x - 4 ≠ 0  ⇒  x ≠ 4.  (É.T.: R \ {'{4}'})
              </div>
            </div>
          </TheoryCallout>

          <h4 className="font-bold text-slate-800 dark:text-slate-100 pt-2">
            Gyakori szöveges megfogalmazások átírása algebrai kifejezéssé:
          </h4>

          <TheoryTable
            headers={['Szöveges feltétel', 'Algebrai kifejezés', 'Megjegyzés']}
            rows={[
              ['Egy szám x-szel jelölve, a háromszorosa', '3x', 'A szám és a szorzó közé nem kötelező szorzópont'],
              ['Egy szám kétszeresénél 5-tel nagyobb', '2x + 5', 'Először a szorzás (2x), majd a hozzáadás (+5)'],
              ['Egy számnál 5-tel nagyobb szám kétszerese', '2 · (x + 5)', 'A zárójel kötelező! (2x + 10)'],
              ['Két egymást követő egész szám', 'n  és  n + 1', 'n ∈ Z'],
              ['Két egymást követő páros szám', '2k  és  2k + 2', 'k ∈ Z'],
              ['Két szám (a és b) összegének négyzete', '(a + b)²', 'Előbb összeadunk, majd négyzetre emelünk'],
              ['Két szám négyzetének összege', 'a² + b²', 'Előbb négyzetre emelünk, majd összeadunk']
            ]}
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

