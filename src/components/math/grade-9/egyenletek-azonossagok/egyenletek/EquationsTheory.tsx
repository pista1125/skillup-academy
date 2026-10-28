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
  Scale,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Equal,
  HelpCircle,
  Hash,
  XCircle
} from 'lucide-react';
import {
  EquationBalanceSvg,
  EquationVsIdentitySvg,
  RootVerificationSvg,
  GraphicalSolutionSvg
} from './EquationsFigures';

interface EquationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const EquationsTheory: React.FC<EquationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV MÉRLEG & GYÖK-ELLENŐRZŐ LABOR ÁLLAPOTOK ---
  const [labMode, setLabMode] = useState<'balance' | 'checker'>('balance');

  // Mérleg szimulátor állapotai: a*x + b = c
  const [coeffA, setCoeffA] = useState<number>(2);
  const [constB, setConstB] = useState<number>(3);
  const [targetC, setTargetC] = useState<number>(11);
  const [guessX, setGuessX] = useState<number>(4);

  // Checker állapotai: egyenlet sablonok
  const [presetIndex, setPresetIndex] = useState<number>(0);
  const [testInputX, setTestInputX] = useState<number>(3);

  const presets = useMemo(() => [
    {
      title: '1. Lineáris egyenlet',
      equation: '3x - 5 = 7',
      leftFn: (x: number) => 3 * x - 5,
      rightFn: () => 7,
      type: 'Egyenlet (1 megoldás)',
      correctRoots: [4]
    },
    {
      title: '2. Azonosság',
      equation: '2(x + 3) = 2x + 6',
      leftFn: (x: number) => 2 * (x + 3),
      rightFn: (x: number) => 2 * x + 6,
      type: 'Azonosság (végtelen sok)',
      correctRoots: 'Minden valós szám (ℝ)'
    },
    {
      title: '3. Ellentmondás',
      equation: 'x + 4 = x + 9',
      leftFn: (x: number) => x + 4,
      rightFn: (x: number) => x + 9,
      type: 'Ellentmondás (0 megoldás)',
      correctRoots: 'Nincs megoldás (∅)'
    },
    {
      title: '4. Törtes alapú egyenlet',
      equation: '4x / 2 + 1 = 9',
      leftFn: (x: number) => (4 * x) / 2 + 1,
      rightFn: () => 9,
      type: 'Egyenlet (1 megoldás)',
      correctRoots: [4]
    }
  ], []);

  // Számítás a mérleg szimulátorhoz
  const balanceState = useMemo(() => {
    const leftWeight = coeffA * guessX + constB;
    const rightWeight = targetC;
    const diff = leftWeight - rightWeight;
    // Dőlésszög korlátozása -15 és +15 fok közé
    const angle = Math.max(-15, Math.min(15, diff * 2));
    const exactSolution = coeffA !== 0 ? (targetC - constB) / coeffA : null;
    const isBalanced = Math.abs(diff) < 0.0001;

    return {
      leftWeight,
      rightWeight,
      diff,
      angle,
      exactSolution,
      isBalanced
    };
  }, [coeffA, constB, targetC, guessX]);

  // Checker számítás
  const currentPreset = presets[presetIndex];
  const leftValue = currentPreset.leftFn(testInputX);
  const rightValue = currentPreset.rightFn(testInputX);
  const isMatch = Math.abs(leftValue - rightValue) < 0.0001;

  return (
    <TheoryTemplate
      title="Egyenletek, Azonosságok és a Gyök Fogalma"
      subtitle="A mérlegelv logikája, az egyenlet és azonosság különbsége, a gyök meghatározása és szigorú ellenőrzése"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 5. TÉMAKÖR"
      themeColor="emerald"
      documentId="equations-theory"
      pdfFilename="9_osztaly_egyenletek_azonossagok_gyok.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Mérlegelv és az Egyenletmegoldás Alapszabályai',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-emerald-700 dark:text-emerald-400 font-black">1. A Mérlegelv Alapelve: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Amit az egyenlet bal oldalával teszünk, pontosan ugyanazt kell végeznünk a jobb oldalával is!
              </span>
            </div>
            <div>
              <span className="text-teal-700 dark:text-teal-400 font-black">2. Biztonságos ekvivalens lépések: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Mindkét oldalhoz ugyanazt a számot hozzáadhatjuk/kivonhatjuk, illetve mindkét oldalt szorozhatjuk/oszthatjuk c ≠ 0 számmal.
              </span>
            </div>
            <div>
              <span className="text-rose-700 dark:text-rose-400 font-black">3. Szigorú ellenőrzés: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                A kiszámolt gyököt mindig az EREDETI egyenlet mindkét oldalába külön-külön helyettesítjük be!
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* ============================================================ */}
      {/* 1. FEJEZET: MI AZ EGYENLET? ÉS A MÉRLEGELV                   */}
      {/* ============================================================ */}
      <TheorySection
        title="1. Az Egyenlet Fogalma és a Mérlegelv"
        badge="Alapfogalmak"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              A matematikában <strong>egyenletnek</strong> nevezünk két olyan algebrai kifejezést, amelyeket az <span className="font-mono font-bold">=</span> (egyenlőségjel) köt össze, és legalább az egyik oldalán szerepel egy vagy több ismeretlen (változó, leggyakrabban <span className="font-mono text-emerald-600 font-bold">x</span>).
            </p>
            <TheoryCallout
              icon={<Scale className="w-5 h-5 text-emerald-600" />}
              title="A Mérlegelv Aranyszabálya"
              color="emerald"
            >
              Az egyenletet egy kétkarú mérlegként képzelhetjük el. Ha a mérleg serpenyői egyensúlyban vannak, az egyensúly megmarad, ha <strong>mindkét oldalhoz ugyanazt a számot adjuk hozzá, vonjuk ki, szorozzuk meg vagy osztjuk el</strong> (kivéve a 0-val való szorzást és osztást!).
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <EquationBalanceSvg size={340} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TheoryCard title="Alaphalmaz (A)" color="emerald">
            A számok azon összessége, amelyből az ismeretlen lehetséges értékei kikerülhetnek (pl. <span className="font-mono">A = ℝ</span>, <span className="font-mono">A = ℤ</span>). Ha nincs megadva, alapértelmezésben a valós számok halmaza (<span className="font-mono">ℝ</span>).
          </TheoryCard>
          <TheoryCard title="Megoldáshalmaz (M)" color="teal">
            Az alaphalmaz azon elemeinek halmaza, amelyeket az ismeretlen helyére helyettesítve az egyenlet <strong>igaz állítássá</strong> válik. Jelölése: <span className="font-mono font-bold">M = &#123;gyökök&#125;</span>.
          </TheoryCard>
          <TheoryCard title="Ekvivalens Átalakítás" color="green">
            Olyan művelet, amely során az egyenlet megoldáshalmaza <strong>nem változik</strong> (nem veszítünk gyököt, és nem kapunk hamis gyököt).
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 2. FEJEZET: EGYENLET, AZONOSSÁG ÉS ELLENTMONDÁS             */}
      {/* ============================================================ */}
      <TheorySection
        title="2. Egyenlet, Azonosság és Ellentmondás"
        badge="Megkülönböztetés"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
          Nem minden egyenlőségjellel összekötött kifejezéspár viselkedik egyformán. A megoldások száma alapján három alapvető kategóriát különböztetünk meg:
        </p>

        <div className="flex justify-center mb-6">
          <EquationVsIdentitySvg size={360} />
        </div>

        <TheoryTable
          headers={['Kategória', 'Definíció', 'Példa', 'Megoldáshalmaz']}
          rows={[
            [
              'Egyenlet',
              'Csak az ismeretlen bizonyos (véges sok) értékeire igaz.',
              '3x - 4 = 11',
              'M = {5}'
            ],
            [
              'Azonosság',
              'Az alaphalmaz MINDEN megengedett elemére azonosan igaz.',
              '2(x + 5) = 2x + 10',
              'M = ℝ (minden valós szám)'
            ],
            [
              'Ellentmondás',
              'Egyetlen alaphalmazbeli értékre sem teljesül (lehetetlen).',
              'x + 3 = x + 7 → 0 = 4',
              'M = ∅ (üres halmaz)'
            ]
          ]}
        />
      </TheorySection>

      {/* ============================================================ */}
      {/* 3. FEJEZET: A GYÖK ÉS AZ ELLENŐRZÉS MŰVÉSZETE                */}
      {/* ============================================================ */}
      <TheorySection
        title="3. A Megoldás (Gyök) és az Ellenőrzés Lépései"
        badge="Szigorú módszertan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Az egyenlet <strong>gyöke</strong> (megoldása) az a konkrét számérték, amelyet az ismeretlen helyére beírva az egyenlőség teljesül.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              A 9. osztályban az ellenőrzés már <strong>szerves része a feladatmegoldásnak</strong>. Nem csupán formaság, hanem a matematikai bizonyítás alapköve!
            </p>
            <TheoryCallout
              icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
              title="Hogyan ellenőrzünk szabályosan?"
              color="amber"
            >
              1. Behelyettesítjük a kapott számot az <strong>EREDETI egyenlet BAL oldalába</strong>, és kiszámoljuk az értékét: <span className="font-mono">B(x₀)</span>.<br/>
              2. Külön behelyettesítjük az <strong>EREDETI egyenlet JOBB oldalába</strong>: <span className="font-mono">J(x₀)</span>.<br/>
              3. Összehasonlítjuk a két számot: ha <span className="font-mono">B(x₀) = J(x₀)</span>, a megoldás helyes!
            </TheoryCallout>
          </div>

          <div className="flex justify-center">
            <RootVerificationSvg size={340} />
          </div>
        </div>

        <TheoryTrapBox title="Tipikus Diákhiba az Ellenőrzésnél!">
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong>Hiba:</strong> A levezetés utolsó előtti sorába helyettesítenek be. Ha maga a levezetés hibás volt, a téves egyenletbe való behelyettesítés elrejti a hibát!
            </li>
            <li>
              <strong>Helyes eljárás:</strong> Mindig a legelső, feladatban megadott formába írd be a kapott értéket!
            </li>
          </ul>
        </TheoryTrapBox>
      </TheorySection>

      {/* ============================================================ */}
      {/* 4. FEJEZET: GRAFIKUS EGYENLETMEGOLDÁS                       */}
      {/* ============================================================ */}
      <TheorySection
        title="4. Grafikus Egyenletmegoldás Alapjai"
        badge="Szemléltetés"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Egy egyenletet függvénytani megközelítésben is értelmezhetünk: a bal oldal egy <span className="font-mono text-blue-600 font-bold">f(x)</span> függvény, a jobb oldal pedig egy <span className="font-mono text-orange-600 font-bold">g(x)</span> függvény.
            </p>
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-sm space-y-2">
              <div className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                A grafikus megoldás lépései:
              </div>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                <li>Közös koordináta-rendszerben megrajzoljuk mindkét oldal grafikonját.</li>
                <li>Megkeressük a grafikonok <strong>metszéspontját</strong>: <span className="font-mono">M(x; y)</span>.</li>
                <li>Az egyenlet megoldása a metszéspont <strong>első koordinátája (x)</strong>!</li>
              </ol>
            </div>
            <p className="text-xs text-slate-500 italic">
              Megjegyzés: A grafikus megoldás kiváló becslésre és a megoldások számának ellenőrzésére, de az algebrai levezetés és behelyettesítés adja meg a hajszálpontos értéket.
            </p>
          </div>

          <div className="flex justify-center">
            <GraphicalSolutionSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 5. FEJEZET: ALAPHALMAZ, KIKÖTÉSEK ÉS CSAPDÁK                */}
      {/* ============================================================ */}
      <TheorySection
        title="5. Alaphalmaz, Kikötések és Veszélyes Műveletek"
        badge="Mesterfogások"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <Hash className="w-4 h-4 text-emerald-600" />
              Alaphalmaz vizsgálata
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Tegyük fel, hogy az egyenlet levezetése során <span className="font-mono font-bold">x = 3.5</span> adódik.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1 font-mono">
              <div>Ha A = ℝ: M = &#123;3.5&#125; (Valós szám, van megoldás)</div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">Ha A = ℤ: M = ∅ (A 3.5 nem egész szám, nincs megoldás!)</div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">Ha A = ℕ: M = ∅ (Nem természetes szám!)</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Nullával való osztás tilalma
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Ha az egyenletben tört van, amelynek a nevezőjében ismeretlen szerepel (pl. <span className="font-mono">1 / (x - 2)</span>), a feladat legelején <strong>kikötést</strong> kell tenni: <span className="font-mono font-bold">x ≠ 2</span>, mert nullával nem osztunk!
            </p>
          </div>
        </div>

        <TheoryTrapBox title="VESZÉLY: Ismeretlennel való osztás tilalma!">
          <div className="space-y-2 text-xs sm:text-sm">
            <p>
              Tekintsük az <span className="font-mono font-bold">x² = 5x</span> egyenletet!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-900 dark:text-rose-200">
                <span className="font-bold text-rose-600">HIBÁS ÚT:</span> Osztunk x-szel mindkét oldalon:<br/>
                <span className="font-mono font-bold">x = 5</span><br/>
                (Elvesztettük az <span className="font-mono font-bold">x = 0</span> gyököt, mert 0-val nem szabad osztani!)
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-200">
                <span className="font-bold text-emerald-600">HELYES ÚT:</span> Nullára rendezünk és kiemelünk:<br/>
                <span className="font-mono font-bold">x² - 5x = 0 → x(x - 5) = 0</span><br/>
                Szorzat akkor 0, ha valamelyik tényezője 0: <span className="font-mono font-bold">x₁ = 0, x₂ = 5</span>.
              </div>
            </div>
          </div>
        </TheoryTrapBox>
      </TheorySection>
    
      {/* ============================================================ */}
      {/* 6. FEJEZET: GYAKORLATI INTERAKTÍV MÉRLEG & ELLENŐRZŐ LABOR   */}
      {/* ============================================================ */}
      <TheorySection
        title="6. Gyakorlati Interaktív Mérleg & Ellenőrző Labor"
        badge="Interaktív Labor"
      >
        {/* ============================================================ */}
      {/* INTERAKTÍV MÉRLEG & ELLENŐRZŐ LABOR                          */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Scale className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Interaktív Mérleg & Egyenlet Labor
              </h2>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                Kísérletezz a kétkarú mérleg egyensúlyával és teszteld a gyökök helyességét valós időben!
              </p>
            </div>
          </div>

          {/* Módválasztó gombok */}
          <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-700/50 shadow-sm">
            <button
              onClick={() => setLabMode('balance')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                labMode === 'balance'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <Scale className="w-4 h-4" />
              Mérleg Szimulátor
            </button>
            <button
              onClick={() => setLabMode('checker')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                labMode === 'checker'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Gyök Ellenőrző Gép
            </button>
          </div>
        </div>

        {/* 1. MÓD: MÉRLEG SZIMULÁTOR */}
        {labMode === 'balance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vezérlők */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-800/60 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Sliders className="w-4 h-4" />
                <span>Egyenlet beállítása: <span className="font-mono text-base">{coeffA}x + {constB} = {targetC}</span></span>
              </div>

              {/* Együtthatók */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    x együttható (a)
                  </label>
                  <input
                    type="number"
                    value={coeffA}
                    onChange={(e) => setCoeffA(Number(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-center"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Konstans (b)
                  </label>
                  <input
                    type="number"
                    value={constB}
                    onChange={(e) => setConstB(Number(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-center"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Jobb oldal (c)
                  </label>
                  <input
                    type="number"
                    value={targetC}
                    onChange={(e) => setTargetC(Number(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-center"
                  />
                </div>
              </div>

              {/* Próbált x érték csúszka */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kipróbált érték (x tippelése):
                  </span>
                  <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    x = {guessX}
                  </span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="15"
                  step="1"
                  value={guessX}
                  onChange={(e) => setGuessX(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>-10</span>
                  <span>0</span>
                  <span>+15</span>
                </div>
              </div>

              {/* Elméleti megoldás doboz */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-3 border border-emerald-200 dark:border-emerald-800/80 text-xs text-slate-700 dark:text-slate-300">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Mérlegelvi levezetés:
                </div>
                <div className="font-mono space-y-0.5 text-[11px]">
                  <div>1. Mindkét oldalból {constB >= 0 ? `-${constB}` : `+${Math.abs(constB)}`}: <span className="font-bold">{coeffA}x = {targetC - constB}</span></div>
                  <div>2. Osztás {coeffA}-val: <span className="font-bold text-emerald-600 dark:text-emerald-400">x = {balanceState.exactSolution !== null ? balanceState.exactSolution : 'Nincs'}</span></div>
                </div>
              </div>
            </div>

            {/* Vizuális Mérleg Render */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/60 shadow-md flex flex-col items-center">
              <div className="w-full text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
                  style={{
                    backgroundColor: balanceState.isBalanced ? '#dcfce7' : '#fee2e2',
                    color: balanceState.isBalanced ? '#166534' : '#991b1b'
                  }}
                >
                  {balanceState.isBalanced ? '✓ Tökéletes egyensúly (Gyök!)' : balanceState.diff > 0 ? 'Balra dől (Bal oldal nehezebb)' : 'Jobbra dől (Jobb oldal nehezebb)'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Bal oldal: <strong className="font-mono text-slate-800 dark:text-slate-200">{coeffA}·({guessX}) + {constB} = {balanceState.leftWeight}</strong> | Jobb oldal: <strong className="font-mono text-slate-800 dark:text-slate-200">{balanceState.rightWeight}</strong>
                </div>
              </div>

              {/* Dinamikusan forgó mérleg SVG */}
              <div className="w-full max-w-sm relative flex justify-center py-4">
                <svg viewBox="0 0 320 180" className="w-full max-w-xs h-auto select-none">
                  {/* Talp és oszlop */}
                  <polygon points="160,110 148,155 172,155" fill="#047857" />
                  <rect x="135" y="153" width="50" height="8" rx="3" fill="#064e3b" />
                  <circle cx="160" cy="110" r="6" fill="#064e3b" />

                  {/* Elforduló mérlegkar */}
                  <g transform={`rotate(${balanceState.angle}, 160, 110)`} className="transition-transform duration-300 ease-out">
                    <line x1="30" y1="110" x2="290" y2="110" stroke="#059669" strokeWidth="6" strokeLinecap="round" />

                    {/* Bal serpenyő függeszték & tálca */}
                    <g transform="translate(50, 110)">
                      <line x1="0" y1="0" x2="-20" y2="35" stroke="#10b981" strokeWidth="1.5" />
                      <line x1="0" y1="0" x2="20" y2="35" stroke="#10b981" strokeWidth="1.5" />
                      <path d="M -30 35 Q 0 45 30 35 Z" fill="#34d399" stroke="#047857" strokeWidth="2" />
                      {/* Súly jelölő */}
                      <rect x="-20" y="15" width="40" height="18" rx="4" fill="#059669" />
                      <text x="0" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                        {balanceState.leftWeight}
                      </text>
                    </g>

                    {/* Jobb serpenyő függeszték & tálca */}
                    <g transform="translate(270, 110)">
                      <line x1="0" y1="0" x2="-20" y2="35" stroke="#10b981" strokeWidth="1.5" />
                      <line x1="0" y1="0" x2="20" y2="35" stroke="#10b981" strokeWidth="1.5" />
                      <path d="M -30 35 Q 0 45 30 35 Z" fill="#34d399" stroke="#047857" strokeWidth="2" />
                      {/* Súly jelölő */}
                      <rect x="-20" y="15" width="40" height="18" rx="4" fill="#d97706" />
                      <text x="0" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                        {balanceState.rightWeight}
                      </text>
                    </g>
                  </g>
                </svg>
              </div>

              {balanceState.isBalanced ? (
                <div className="w-full text-center p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  🎉 Gratulálunk! Az <span className="font-mono">x = {guessX}</span> érték kielégíti az egyenletet, tehát gyök!
                </div>
              ) : (
                <div className="w-full text-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
                  A mérleg még kibillent! Állítsd az x csúszkát <span className="font-mono font-bold text-emerald-600">{balanceState.exactSolution}</span>-re a kiegyenlítéshez!
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. MÓD: GYÖK ELLENŐRZŐ GÉP */}
        {labMode === 'checker' && (
          <div className="space-y-6">
            {/* Sablon választó gombok */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPresetIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    presetIndex === idx
                      ? 'border-emerald-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-400/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-[11px] font-bold text-slate-500 uppercase">{p.title}</div>
                  <div className="font-mono text-sm font-black text-slate-900 dark:text-white my-1">{p.equation}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{p.type}</div>
                </button>
              ))}
            </div>

            {/* Tesztelő felület */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/60 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Vizsgált egyenlet:</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                    {currentPreset.equation}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Próbáld ki erre az x-re:</span>
                  <div className="flex items-center gap-1">
                    {[-2, 0, 1, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => setTestInputX(val)}
                        className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                          testInputX === val
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={testInputX}
                    onChange={(e) => setTestInputX(Number(e.target.value) || 0)}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-center text-sm font-bold"
                  />
                </div>
              </div>

              {/* Bal és Jobb oldal számítás összevetése */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80">
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">
                    Bal oldal helyettesítési értéke (B)
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-mono">
                    x = {testInputX} behelyettesítve a bal oldalba
                  </div>
                  <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                    B({testInputX}) = {leftValue}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80">
                  <div className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-1">
                    Jobb oldal helyettesítési értéke (J)
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-mono">
                    x = {testInputX} behelyettesítve a jobb oldalba
                  </div>
                  <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">
                    J({testInputX}) = {rightValue}
                  </div>
                </div>
              </div>

              {/* Ellenőrzés eredménykártya */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isMatch
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-3">
                  {isMatch ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-sm">
                      {isMatch ? 'Bal oldal = Jobb oldal (MEGEGYEZIK!)' : 'Bal oldal ≠ Jobb oldal (NEM EGYEZIK MEG!)'}
                    </div>
                    <div className="text-xs opacity-80 font-mono">
                      {leftValue} {isMatch ? '===' : '≠'} {rightValue} → {isMatch ? `x = ${testInputX} VALÓDI MEGOLDÁS!` : `x = ${testInputX} NEM megoldás.`}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold px-3 py-1 rounded-md bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700">
                  Helyes gyök(ök): <span className="text-emerald-600 font-mono">{Array.isArray(currentPreset.correctRoots) ? currentPreset.correctRoots.join(', ') : currentPreset.correctRoots}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </TheorySection>
    
    </TheoryTemplate>
  );
};

