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
  Calculator,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Scale,
  Equal,
  Shuffle,
  Split,
  PlusCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';
import {
  DistributiveLawSvg,
  DoubleBracketSvg,
  MinusBracketSvg,
  LikeTermsCombineSvg
} from './AlgebraicOperationsFigures';

interface AlgebraicOperationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const AlgebraicOperationsTheory: React.FC<AlgebraicOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV MŰVELETI ÉS ÖSSZEVONÁSI LABOR ---
  const [opMode, setOpMode] = useState<'monom_poly' | 'two_binomials' | 'minus_bracket'>('two_binomials');
  const [coeffA, setCoeffA] = useState<number>(2);
  const [constB, setConstB] = useState<number>(3);
  const [constC, setConstC] = useState<number>(-4);

  // Lépésről lépésre kibontás kalkuláció
  const calculation = useMemo(() => {
    if (opMode === 'monom_poly') {
      // a · x · (x + b)
      // pl. 2x · (x + 3) = 2x² + 6x
      const term1Coeff = coeffA;
      const term2Coeff = coeffA * constB;
      const sign = term2Coeff >= 0 ? `+ ${term2Coeff}x` : `- ${Math.abs(term2Coeff)}x`;
      return {
        formula: `${coeffA}x · (x ${constB >= 0 ? '+ ' + constB : '- ' + Math.abs(constB)})`,
        step1: `Minden tagot megszorzunk az egytagúval (${coeffA}x):`,
        step2: `(${coeffA}x · x) + (${coeffA}x · (${constB}))`,
        step3: `${term1Coeff}x² + (${term2Coeff}x)`,
        result: `${term1Coeff}x² ${sign}`
      };
    } else if (opMode === 'two_binomials') {
      // (x + b) · (x + c)
      // = x² + c·x + b·x + b·c = x² + (b + c)x + b·c
      const midCoeff = constB + constC;
      const constTerm = constB * constC;
      const midSign = midCoeff >= 0 ? `+ ${midCoeff}x` : `- ${Math.abs(midCoeff)}x`;
      const constSign = constTerm >= 0 ? `+ ${constTerm}` : `- ${Math.abs(constTerm)}`;
      return {
        formula: `(x ${constB >= 0 ? '+ ' + constB : '- ' + Math.abs(constB)}) · (x ${constC >= 0 ? '+ ' + constC : '- ' + Math.abs(constC)})`,
        step1: `Minden tagot minden taggal megszorzunk:`,
        step2: `x · x + x · (${constC}) + (${constB}) · x + (${constB}) · (${constC})`,
        step3: `x² ${constC >= 0 ? '+ ' + constC : '- ' + Math.abs(constC)}x ${constB >= 0 ? '+ ' + constB : '- ' + Math.abs(constB)}x ${constTerm >= 0 ? '+ ' + constTerm : '- ' + Math.abs(constTerm)}`,
        result: `x² ${midCoeff !== 0 ? midSign : ''} ${constSign}`
      };
    } else {
      // 5x - (a·x + b)
      // = 5x - a·x - b = (5 - a)x - b
      const newXCoeff = 5 - coeffA;
      const newConst = -constB;
      return {
        formula: `5x - (${coeffA}x ${constB >= 0 ? '+ ' + constB : '- ' + Math.abs(constB)})`,
        step1: `A zárójel előtti mínuszjel megfordítja a belső tagok előjelét:`,
        step2: `5x - (${coeffA}x) - (${constB}) = 5x - ${coeffA}x ${newConst >= 0 ? '+ ' + newConst : '- ' + Math.abs(newConst)}`,
        step3: `Egynemű tagok (5x és -${coeffA}x) összevonása: (5 - ${coeffA})x = ${newXCoeff}x`,
        result: `${newXCoeff}x ${newConst >= 0 ? '+ ' + newConst : '- ' + Math.abs(newConst)}`
      };
    }
  }, [opMode, coeffA, constB, constC]);

  return (
    <TheoryTemplate
      title="Számolás az Algebrában – Összevonás és Polinomok Szorzása"
      subtitle="Egynemű tagok összevonása, disztributív szorzás, polinomok szorzása és a negatív előjeles zárójelek biztos kezelése"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 2. TÉMAKÖR"
      themeColor="cyan"
      documentId="algebraic-operations-theory"
      pdfFilename="9_osztaly_szamolas_az_algebraban.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Két Legfontosabb Műveleti Aranyszabály',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-cyan-600 dark:text-cyan-400 font-black">Polinom szorzása polinommal: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                (a + b)(c + d) = ac + ad + bc + bd  („minden tagot minden taggal megszorzunk!”)
              </span>
            </div>
            <div>
              <span className="text-teal-600 dark:text-teal-400 font-black">Zárójel előtti mínuszjel: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                -(a - b + c) = -a + b - c  (a zárójel elhagyásakor MINDEN belső tag előjele az ellentettjére fordul!)
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: EGYNEMŰ TAGOK ÖSSZEVONÁSA */}
      <TheorySection
        number={1}
        title="Egynemű Kifejezések Összevonása és Polinomok Rendszerezése"
        icon={<Split className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badge="Összevonási Technika"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az algebrai kifejezések legegyszerűbb alakra hozásának alaplépése az <strong>egynemű tagok összevonása</strong>.
          Két tag akkor és csak akkor vonható össze, ha a betűs részük (változóik és azok kitevői) betűről betűre teljesen megegyezik.
        </p>

        {/* Színes összevonási ábra */}
        <div className="flex justify-center my-6">
          <LikeTermsCombineSvg size={400} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Az Összevonás Lépései"
            icon={<CheckCircle2 className="w-5 h-5 text-teal-600" />}
            color="teal"
          >
            <ol className="list-decimal pl-4 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li><strong>Keresd meg az egynemű tagokat:</strong> Érdemes az azonos betűrészű tagokat azonos színnel vagy aláhúzással (egy vonal, kettős vonal, hullámos) megjelölni.</li>
              <li><strong>Előjelek figyelembevétele:</strong> Mindig a tag előtt álló előjellel együtt vizsgáld a tagot! (Pl. a <code className="font-mono">5x² - 3x</code>-ben a második tag a <code className="font-mono">-3x</code>).</li>
              <li><strong>Együtthatók összeadása:</strong> A disztributivitás alapján csak az együtthatókat adjuk össze: <code className="font-mono">ax + bx = (a + b)x</code>.</li>
              <li><strong>Rendezés csökkenő fokszám szerint:</strong> A végeredményt szokás a legmagasabb kitevőtől a konstans tagig felírni (pl. <code className="font-mono">2x³ - 5x² + 7x - 4</code>).</li>
            </ol>
          </TheoryCard>

          <TheoryCard
            title="Mit NEM szabad összevonni?"
            icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
            color="rose"
          >
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <p>
                Gyakori hiba a különböző kitevőjű vagy különböző betűs tagok összevonása:
              </p>
              <ul className="list-disc pl-4 space-y-1 font-mono text-xs">
                <li><span className="text-rose-600 font-bold">3x + 2x²</span> ≠ 5x³ (nem vonható össze, kész!)</li>
                <li><span className="text-rose-600 font-bold">4ab + 3a</span> ≠ 7a²b (különböző betűs rész)</li>
                <li><span className="text-rose-600 font-bold">5x²y - 2xy²</span> ≠ 3x³y³ (más a kitevők eloszlása)</li>
              </ul>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Típushiba: Az x tag együtthatója"
          trap="5x² - x = 5x  (HIBÁS!)"
          correction="5x² - x  nem vonható össze! De: 5x - x = 5x - 1x = 4x  (HELYES!)"
          explanation="Ne feledd, hogy ha a változó előtt nincs szám, az együtthatója 1 (vagy -x esetén -1). Továbbá az x² és az x nem egyneműek, nem vonhatók össze!"
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: POLINOMOK ÖSSZEADÁSA ÉS KIVONÁSA (ZÁRÓJEL SZABÁLYOK) */}
      <TheorySection
        number={2}
        title="Polinomok Összeadása, Kivonása és az Előjelek Fordulása"
        icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Zárójelfelbontás"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Ha több polinom összegét vagy különbségét képezzük, a zárójelek felbontása határozza meg a tagok előjelét.
        </p>

        {/* Mínusz előjel ábra */}
        <div className="flex justify-center my-6">
          <MinusBracketSvg size={400} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
            <h4 className="font-bold text-teal-900 dark:text-teal-200 text-sm mb-2 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-teal-600" />
              1. Zárójel előtt POZITÍV (+) jel vagy nincs előjel:
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              A zárójelet egyszerűen elhagyhatjuk, a belső tagok előjele <strong>változatlan</strong> marad:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl font-mono text-xs text-teal-800 dark:text-teal-300 font-bold">
              (3x² - 2x + 5) + (2x² + 7x - 8) = 3x² - 2x + 5 + 2x² + 7x - 8 = 5x² + 5x - 3
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              2. Zárójel előtt NEGATÍV (-) jel:
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              A zárójel elhagyásakor a benne lévő <strong>minden egyes tag előjele az ellentettjére fordul</strong>:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl font-mono text-xs text-rose-800 dark:text-rose-300 font-bold">
              - (4x² - 5x + 3) = -4x² + 5x - 3
            </div>
          </div>
        </div>

        <TheoryTrapBox
          title="Gyakori vizsgahiba: Csak az első tag előjelét változtatják meg"
          trap="10x - (3x - 4) = 10x - 3x - 4 = 7x - 4  (HIBÁS!)"
          correction="10x - (3x - 4) = 10x - 3x + 4 = 7x + 4  (HELYES!)"
          explanation="A mínuszjel az egész zárójelre vonatkozik, így a -4 ellentettje +4 lesz! Ha ezt elhibázod, az egész egyenletmegoldás hibás lesz!"
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: EGYTAGÚ SZORZÁSA TÖBBTAGÚVAL (DISZTRUBUTIVITÁS) */}
      <TheorySection
        number={3}
        title="Egytagú Kifejezés Szorzása Többtagúval: A Disztributivitás"
        icon={<Shuffle className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Műveleti Szabály"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Egytagú kifejezéssel úgy szorzunk meg egy polinomot, hogy az egytagúval a polinom <strong>minden tagját megszorozzuk</strong>,
          majd a kapott szorzatokat az előjeleknek megfelelően összeadjuk (disztributív törvény).
        </p>

        {/* Disztributivitás területmodell ábra */}
        <div className="flex justify-center my-6">
          <DistributiveLawSvg size={380} />
        </div>

        <TheoryCallout
          type="tip"
          title="Hatványozás szorzás közben: kitevők összeadása!"
        >
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <p>
              Amikor azonos alapú hatványokat szorzunk össze, az alap változatlan marad, és a <strong>kitevőket összeadjuk</strong>:
              <span className="font-mono font-bold text-teal-700 dark:text-teal-300 ml-1">x · x = x²</span> és <span className="font-mono font-bold text-teal-700 dark:text-teal-300">x² · x³ = x⁵</span>.
            </p>
            <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg font-mono text-xs">
              Példa: 3x² · (2x³ - 5x + 4) = 3x²·2x³ - 3x²·5x + 3x²·4 = 6x⁵ - 15x³ + 12x²
            </div>
          </div>
        </TheoryCallout>

        <TheoryTable
          headers={['Szorzás', 'Részletszámítás lépései', 'Végeredmény']}
          rows={[
            ['4 · (2x - 3)', '4 · 2x + 4 · (-3)', '8x - 12'],
            ['-3 · (2x - 5)', '-3 · 2x + (-3) · (-5)', '-6x + 15'],
            ['2x · (3x + 4)', '2x · 3x + 2x · 4', '6x² + 8x'],
            ['-5x² · (x - 2)', '-5x² · x + (-5x²) · (-2)', '-5x³ + 10x²'],
            ['3ab · (2a - b)', '3ab · 2a - 3ab · b', '6a²b - 3ab²']
          ]}
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: TÖBBTAGÚ SZORZÁSA TÖBBTAGÚVAL */}
      <TheorySection
        number={4}
        title="Többtagú Kifejezés Szorzása Többtagúval és Területmodell"
        icon={<Calculator className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badge="Polinom Szorzás"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Két polinom szorzásakor az egyik polinom <strong>minden tagját megszorozzuk a másik polinom minden tagjával</strong>,
          majd az egynemű tagokat összevonjuk:
        </p>

        <div className="p-3 bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 rounded-2xl text-center font-mono font-black text-cyan-900 dark:text-cyan-200 text-sm sm:text-base my-3">
          (a + b) · (c + d) = ac + ad + bc + bd
        </div>

        {/* 2x2 területmodell ábra */}
        <div className="flex justify-center my-6">
          <DoubleBracketSvg size={400} />
        </div>

        {/* INTERAKTÍV MŰVELETI SZIMULÁTOR */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-cyan-50 to-teal-50/50 dark:from-slate-900 dark:to-cyan-950/30 border-2 border-cyan-200 dark:border-cyan-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-5 h-5 text-cyan-600" />
            <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
              Interaktív Algebrai Szorzó és Összevonó Labor
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Válassz művelettípust, állítsd az együtthatókat, és kövesd a szorzás és összevonás részletes lépéseit!
          </p>

          {/* Módválasztó gombok */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
            <button
              onClick={() => setOpMode('two_binomials')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                opMode === 'two_binomials'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400'
              }`}
            >
              (x + b) · (x + c)
            </button>
            <button
              onClick={() => setOpMode('monom_poly')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                opMode === 'monom_poly'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400'
              }`}
            >
              a·x · (x + b)
            </button>
            <button
              onClick={() => setOpMode('minus_bracket')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                opMode === 'minus_bracket'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400'
              }`}
            >
              5x - (ax + b)
            </button>
          </div>

          {/* Csúszkák / paraméter választók */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-5 text-xs">
            {opMode === 'monom_poly' && (
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Együttható a: <span className="text-cyan-600 font-black">{coeffA}</span>
                </span>
                <div className="flex gap-1">
                  {[-3, -2, 2, 3, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => setCoeffA(v)}
                      className={`px-2 py-1 rounded text-xs font-bold ${coeffA === v ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Konstans b: <span className="text-teal-600 font-black">{constB}</span>
              </span>
              <div className="flex gap-1">
                {[-5, -3, -1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => setConstB(v)}
                    className={`px-2 py-1 rounded text-xs font-bold ${constB === v ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {opMode === 'two_binomials' && (
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Konstans c: <span className="text-indigo-600 font-black">{constC}</span>
                </span>
                <div className="flex gap-1">
                  {[-5, -4, -2, 1, 3, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => setConstC(v)}
                      className={`px-2 py-1 rounded text-xs font-bold ${constC === v ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Eredmény levezetés */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-slate-400">Feladat:</span>
              <span className="text-sm font-bold text-cyan-300">{calculation.formula}</span>
            </div>
            <div className="text-slate-300 space-y-1 py-1">
              <div>{calculation.step1}</div>
              <div className="text-amber-300">{calculation.step2}</div>
              <div>{calculation.step3}</div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-700 pt-2 text-sm">
              <span className="text-slate-400 font-bold">Összevont végeredmény:</span>
              <span className="text-emerald-400 font-black text-base">{calculation.result}</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ÖSSZETETT KIFEJEZÉSEK ÉS ÉRETTSÉGI TÍPUSCSAPDÁK */}
      <TheorySection
        number={5}
        title="Összetett Kifejezések Egyszerűsítése és Vizsgatippek"
        icon={<CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Haladó Stratégiák"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <p>
            Gyakori feladattípus az érettségin, amikor két szorzat különbségét kell kiszámítani és legegyszerűbb alakra hozni.
            Ilyenkor a <strong>második szorzatot először szögletes zárójelben kell tartani</strong>, hogy a negatív előjel ne tévesszen meg!
          </p>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-2">
            <div className="font-bold text-cyan-700 dark:text-cyan-300">
              Mintafeladat: (x + 3)(x - 2) - (x - 1)(x + 4) = ?
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              1. lépés: Végezzük el a szorzásokat, a második szorzatot tartva zárójelben:
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
              = (x² - 2x + 3x - 6) - [ x² + 4x - x - 4 ]
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              2. lépés: Összevonunk a zárójeleken belül:
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
              = (x² + x - 6) - [ x² + 3x - 4 ]
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              3. lépés: Felbontjuk a mínuszos zárójelet (minden előjel fordul!):
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg">
              = x² + x - 6 - x² - 3x + 4
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              4. lépés: Egynemű tagok összevonása:
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
              = -2x - 2
            </div>
          </div>

          <TheoryCallout
            type="info"
            title="Összefoglaló ellenőrzési tipp: Helyettesítési próba"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Ha nem vagy biztos az összevonásban vagy a szorzásban, válassz egy egyszerű számot (pl. <code className="font-mono">x = 1</code> vagy <code className="font-mono">x = 0</code>),
              és számold ki a kifejezés értékét az eredeti feladatban és az összevont végeredményedben is! Ha megegyeznek, jó eséllyel helyes a megoldásod.
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

