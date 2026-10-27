import React, { useState } from 'react';
import {
  Binary,
  Sliders,
  Layers,
  ArrowRightLeft,
  AlertTriangle,
  Sparkles,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Divide,
  Compass,
  Scissors
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  SquareRootConceptSvg,
  SquareRootIdentitiesSvg,
  FactoringAndDenomSvg,
  SquareRootGeometrySvg
} from './SquareRootFigures';

interface SquareRootTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SquareRootTheory: React.FC<SquareRootTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR ÁLLAPOTOK ---
  const [labTab, setLabTab] = useState<'wizard' | 'identity'>('wizard');

  // Varázsló presetek
  const [wizardId, setWizardId] = useState<number>(0);

  // Azonosság ellenőrző állapotok
  const [testA, setTestA] = useState<number>(9);
  const [testB, setTestB] = useState<number>(16);

  const wizardPresets = [
    {
      id: 0,
      title: 'Kiemelés: √72',
      type: 'factor' as const,
      expression: '\\sqrt{72}',
      step1: 'Keresd meg a legnagyobb négyzetszám osztót: 72 = 36 · 2 (36 = 6² négyzetszám!)',
      step1Math: '= \\sqrt{36 \\cdot 2}',
      step2: 'Alkalmazd a szorzat gyökére vonatkozó azonosságot: √(a · b) = √a · √b',
      step2Math: '= \\sqrt{36} \\cdot \\sqrt{2}',
      step3: 'Vond ki a négyzetgyököt a négyzetszámból: √36 = 6',
      step3Math: '= 6\\sqrt{2}',
      result: '6√2'
    },
    {
      id: 1,
      title: 'Kiemelés: √300',
      type: 'factor' as const,
      expression: '\\sqrt{300}',
      step1: 'Keresd meg a legnagyobb négyzetszám osztót: 300 = 100 · 3 (100 = 10²)',
      step1Math: '= \\sqrt{100 \\cdot 3}',
      step2: 'Bontsd szét két gyök szorzatára: √100 · √3',
      step2Math: '= \\sqrt{100} \\cdot \\sqrt{3}',
      step3: 'Vond ki a négyzetgyököt a 100-ból: √100 = 10',
      step3Math: '= 10\\sqrt{3}',
      result: '10√3'
    },
    {
      id: 2,
      title: 'Gyöktelenítés: 6 / √3',
      type: 'rationalize' as const,
      expression: '\\frac{6}{\\sqrt{3}}',
      step1: 'Bővítsd a törtet a nevezőben lévő gyökkel (√3 / √3 = 1):',
      step1Math: '= \\frac{6 \\cdot \\sqrt{3}}{\\sqrt{3} \\cdot \\sqrt{3}}',
      step2: 'Számítsd ki a nevezőt: (√3)² = 3',
      step2Math: '= \\frac{6\\sqrt{3}}{3}',
      step3: 'Egyszerűsíts a számláló és nevező közötti egész számmal: 6 / 3 = 2',
      step3Math: '= 2\\sqrt{3}',
      result: '2√3'
    },
    {
      id: 3,
      title: 'Gyöktelenítés: 10 / √5',
      type: 'rationalize' as const,
      expression: '\\frac{10}{\\sqrt{5}}',
      step1: 'Bővítsd a törtet √5-tel számlálóban és nevezőben:',
      step1Math: '= \\frac{10 \\cdot \\sqrt{5}}{\\sqrt{5} \\cdot \\sqrt{5}}',
      step2: 'A nevező: (√5)² = 5',
      step2Math: '= \\frac{10\\sqrt{5}}{5}',
      step3: 'Egyszerűsítés 5-tel: 10 / 5 = 2',
      step3Math: '= 2\\sqrt{5}',
      result: '2√5'
    },
    {
      id: 4,
      title: 'Kiemelés: √48',
      type: 'factor' as const,
      expression: '\\sqrt{48}',
      step1: 'A legnagyobb négyzetszám osztó a 16: 48 = 16 · 3 (16 = 4²)',
      step1Math: '= \\sqrt{16 \\cdot 3}',
      step2: 'Bontás két gyökre: √16 · √3',
      step2Math: '= \\sqrt{16} \\cdot \\sqrt{3}',
      step3: 'Négyzetgyökvonás: √16 = 4',
      step3Math: '= 4\\sqrt{3}',
      result: '4√3'
    }
  ];

  const currentWizard = wizardPresets[wizardId];

  // Számítások a 2. fülhöz
  const multProduct = testA * testB;
  const sqrtA = Math.sqrt(testA);
  const sqrtB = Math.sqrt(testB);
  const sqrtMult = Math.sqrt(multProduct);
  const sumVal = testA + testB;
  const sqrtSum = Math.sqrt(sumVal);
  const sumOfSqrts = sqrtA + sqrtB;

  return (
    <TheoryTemplate
      title="A Négyzetgyök Értelmezése és Azonosságai"
      subtitle="Definíció nemnegatív számokra, √(x²) = |x|, szorzat és hányados gyöke, kiemelés és a nevező gyöktelenítése."
      badge="9. TÉMAKÖR"
      badgeColor="blue"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quizButtonText="Gyakorló Kvíz Indítása"
    >
      {/* 1. SZEKCIÓ: A NÉGYZETGYÖK FOGALMA */}
      <TheorySection
        number={1}
        title="A Négyzetgyök Értelmezése és az Abszolút Érték Szabálya"
        icon={<Binary className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Alapfogalmak"
        badgeColor="blue"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A mindennapi életben és a geometriában a négyzetgyök a négyzet területéből való oldalhossz-visszaszámolás:
            ha egy négyzet területe $T$, akkor az oldala $a = \sqrt{T}$.
            Mivel egy négyzet oldala nem lehet negatív, a négyzetgyöknek <strong>szigorú matematikai definíciója</strong> van.
          </p>

          <SquareRootConceptSvg />

          <TheoryCallout
            type="info"
            title="A Négyzetgyök Pontos Matematikai Definíciója"
          >
            <p className="text-sm leading-relaxed">
              Egy nemnegatív $a$ valós szám <strong>négyzetgyökén</strong> ($\sqrt{a}$) azt a <strong>nemnegatív számot</strong> értjük,
              amelynek négyzete $a$.
              $$\sqrt{a} \ge 0 \quad \text{és} \quad (\sqrt{a})^2 = a \quad (a \ge 0)$$
            </p>
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <TheoryCard
              title="A Nemnegativitás Két Feltétele"
              badge="Fontos!"
              badgeColor="amber"
            >
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• <strong>A gyökjel alatt csak nemnegatív szám állhat:</strong> $\sqrt{-16}$ nem létezik a valós számok körében!</li>
                <li>• <strong>A gyökvonás eredménye MINDIG nemnegatív:</strong> $\sqrt{25} = +5$ (nem $\pm 5$, mert a definíció szerint $\sqrt{a} \ge 0$).</li>
              </ul>
            </TheoryCard>

            <TheoryCard
              title="Az Abszolút Érték Aranyszabálya: √(x²) = |x|"
              badge="Érettségi Kedvenc"
              badgeColor="rose"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha egy ismeretlen szám négyzetéből vonunk gyököt, nem egyszerűen $x$-et kapunk, hanem <strong>$|x|$-et</strong>:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center font-mono text-xs my-2 font-bold text-rose-600">
                $\sqrt{x^2} = |x|$ minden $x \in \mathbb{R}$ esetén!
              </div>
              <p className="text-xs text-slate-500">
                Példa: $\sqrt{(-5)^2} = \sqrt{25} = +5 = |-5|$. Nem $-5$!
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A NÉGYZETGYÖKVONÁS AZONOSSÁGAI */}
      <TheorySection
        number={2}
        title="A Négyzetgyökvonás 2 Alapazonossága"
        icon={<Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Azonosságok"
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A négyzetgyökvonás tulajdonképpen a hatványozás fordított művelete (később látni fogjuk, hogy $\sqrt{a} = a^{1/2}$).
            Ezért a hatványozási azonosságok közvetlen megfelelői érvényesek rá, de <strong>kizárólag szorzásra és osztásra</strong>!
          </p>

          <SquareRootIdentitiesSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <TheoryCard
              title="1. Szorzat Négyzetgyöke"
              badge="√(a · b) = √a · √b"
              badgeColor="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Szorzatból tényezőnként vonhatunk négyzetgyököt, és fordítva: két gyök szorzata egyenlő a számok szorzatának gyökével.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded font-mono text-xs my-2 space-y-1">
                <p>• √50 · √2 = √(50 · 2) = √100 = 10</p>
                <p>• √(4 · 9) = √4 · √9 = 2 · 3 = 6</p>
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Hányados Négyzetgyöke"
              badge="√(a / b) = √a / √b"
              badgeColor="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Törtből úgy vonunk gyököt, hogy a számlálóból és nevezőből is külön gyököt vonunk:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded font-mono text-xs my-2 space-y-1">
                <p>• √(49 / 64) = √49 / √64 = 7 / 8</p>
                <p>• √75 / √3 = √(75 / 3) = √25 = 5</p>
              </div>
            </TheoryCard>
          </div>

          <SquareRootGeometrySvg />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: MŰVELETI FOGÁSOK: KIEMELÉS ÉS GYÖKTELENÍTÉS */}
      <TheorySection
        number={3}
        title="Alapvető Műveleti Fogások: Kiemelés és Nevező Gyöktelenítése"
        icon={<Scissors className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Mesterfogások"
        badgeColor="purple"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A matematika feladatokban és az érettségin az eredményt <strong>mindig a legegyszerűbb, legpontosabb alakban</strong> kell megadni.
            Két alapvető módszer teszi ezt lehetővé:
          </p>

          <FactoringAndDenomSvg />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            <TheoryCard
              title="1. Kiemelés a Gyökjel Alól"
              badge="Négyzetszám osztók"
              badgeColor="purple"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bontsd fel a számot egy négyzetszám ($4, 9, 16, 25, 36 \dots$) és egy maradék szorzatára:
              </p>
              <div className="font-mono text-xs text-purple-700 dark:text-purple-300 my-1 font-bold">
                √72 = √(36 · 2) = 6√2
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Bevitel a Gyökjel Alá"
              badge="Négyzetre emeléssel"
              badgeColor="indigo"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A gyökjel előtti pozitív szorzót a négyzeten visszük be a gyökjel alá:
              </p>
              <div className="font-mono text-xs text-indigo-700 dark:text-indigo-300 my-1 font-bold">
                3√5 = √(3² · 5) = √45
              </div>
            </TheoryCard>

            <TheoryCard
              title="3. Nevező Gyöktelenítése"
              badge="Bővítés a gyökkel"
              badgeColor="rose"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tört nevezőjében ne hagyjunk gyökös számot! Bővítsük a törtet a nevező gyökével:
              </p>
              <div className="font-mono text-xs text-rose-700 dark:text-rose-300 my-1 font-bold">
                6 / √3 = (6√3) / 3 = 2√3
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV NÉGYZETGYÖK LABOR */}
      <TheorySection
        number={4}
        title="Interaktív Négyzetgyök Labor"
        icon={<Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Interaktív Labor"
        badgeColor="blue"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Próbáld ki a laboratóriumot: elemezd a kiemelések és nevezőgyöktelenítések lépésről lépésre logikáját,
            vagy teszteld a szorzat vs összeg azonosságokat saját számokkal!
          </p>

          {/* Fülválasztó gombok */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setLabTab('wizard')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                labTab === 'wizard'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Kiemelő &amp; Gyöktelenítő Varázsló
            </button>
            <button
              onClick={() => setLabTab('identity')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                labTab === 'identity'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              2. Gyökazonosság &amp; Összeg-ellenőrző
            </button>
          </div>

          {/* 1. FÜL: VARÁZSLÓ */}
          {labTab === 'wizard' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Válassz egy érettségi mintapéldát:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {wizardPresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setWizardId(preset.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        wizardId === preset.id
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feladat címe és kifejezése */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Kiinduló Kifejezés:
                </span>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  ${currentWizard.expression}$
                </div>
              </div>

              {/* 3 lépéses levezetés */}
              <div className="space-y-2.5">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-indigo-500 shadow-xs">
                  <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    1. Lépés: {currentWizard.step1}
                  </div>
                  <div className="font-mono text-sm text-slate-800 dark:text-slate-200 mt-1 pl-2">
                    ${currentWizard.step1Math}$
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-blue-500 shadow-xs">
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
                    2. Lépés: {currentWizard.step2}
                  </div>
                  <div className="font-mono text-sm text-slate-800 dark:text-slate-200 mt-1 pl-2">
                    ${currentWizard.step2Math}$
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-xs">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    3. Lépés: {currentWizard.step3}
                  </div>
                  <div className="font-mono text-sm text-slate-800 dark:text-slate-200 mt-1 pl-2">
                    ${currentWizard.step3Math}$
                  </div>
                </div>
              </div>

              {/* Végeredmény */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider block">
                  Legegyszerűbb Pontos Alak:
                </span>
                <span className="text-xl font-black text-emerald-700 dark:text-emerald-200 font-mono">
                  {currentWizard.result}
                </span>
              </div>
            </div>
          )}

          {/* 2. FÜL: AZONOSSÁG & ÖSSZEG ELLENŐRZŐ */}
          {labTab === 'identity' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex justify-between mb-1">
                    <span>"a" értéke: {testA}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    value={testA}
                    onChange={e => setTestA(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex justify-between mb-1">
                    <span>"b" értéke: {testB}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    value={testB}
                    onChange={e => setTestB(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              {/* 1. Vizsgálat: Szorzat (Azonosság MŰKÖDIK) */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  SZORZÁS: Azonosság Igazolva! √(a · b) = √a · √b
                </div>
                <div className="font-mono text-sm text-emerald-900 dark:text-emerald-100 font-bold">
                  √({testA} · {testB}) = √{multProduct} = {sqrtMult.toFixed(3)}
                </div>
                <div className="font-mono text-xs text-emerald-700 dark:text-emerald-300">
                  √{testA} · √{testB} = {sqrtA.toFixed(3)} · {sqrtB.toFixed(3)} = {(sqrtA * sqrtB).toFixed(3)} ➔ Pontosan egyenlő!
                </div>
              </div>

              {/* 2. Vizsgálat: Összeg (Azonosság NEM LÉTEZIK) */}
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
                <div className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  ÖSSZEADÁS: NINCS azonosság! √(a + b) ≠ √a + √b !
                </div>
                <div className="font-mono text-sm text-rose-900 dark:text-rose-100 font-bold">
                  √({testA} + {testB}) = √{sumVal} = {sqrtSum.toFixed(3)}
                </div>
                <div className="font-mono text-xs text-rose-700 dark:text-rose-300">
                  √{testA} + √{testB} = {sqrtA.toFixed(3)} + {sqrtB.toFixed(3)} = {sumOfSqrts.toFixed(3)} ➔ {sqrtSum.toFixed(3)} ≠ {sumOfSqrts.toFixed(3)} (Nem egyenlő!)
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSÉGI CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Négyzetgyökös Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: √(a + b) = √a + √b ? (A leggyakoribb diákhiba!)"
            trap="Mennyi √(9 + 16) értéke? Lehet-e tagonként gyököt vonni?"
            wrong="√(9 + 16) = √9 + √16 = 3 + 4 = 7"
            wrongExplanation="Óriási hiba! Összeadásra nincs négyzetgyökvonási azonosság! Előbb el kell végezni a gyökjel alatti összeadást: 9 + 16 = 25, és √25 = 5! Az 5 és a 7 nagyon nem ugyanaz!"
            correct="√(9 + 16) = √25 = 5"
            correctExplanation="A gyökjel összekötő kapocsként (zárójelként) viselkedik: az alatta lévő teljes kifejezés összegét előbb ki kell számolni!"
            tip="Aranyszabály: Tagonként csak SZORZATBÓL és HÁNYADOSBÓL vonhatsz gyököt, összegből soha!"
          />

          <TheoryTrapBox
            title="2. Buktató: √(x²) = x vagy |x| ?"
            trap="Mennyi √((-7)²) pontos értéke?"
            wrong="√((-7)²) = -7 (mert a gyök és a négyzet kiejti egymást)"
            wrongExplanation="Súlyos definíciós hiba! A négyzetgyök értéke a definíció szerint SOHA NEM LEHET NEGATÍV! (-7)² = +49, és √49 = +7! Ezért az azonosság pontos alakja √(x²) = |x|!"
            correct="√((-7)²) = |-7| = +7"
            correctExplanation="A gyökvonás eredménye mindig nemnegatív, így a negatív szám négyzete alatt lévő előjel a négyzettel együtt pozitívvá válik."
            tip="Jegyezd meg: √(x²) mindig egyenlő |x|-szel!"
          />

          <TheoryTrapBox
            title="3. Buktató: Negatív szám négyzetgyöke"
            trap="Mennyi √(-25) értéke a valós számok körében?"
            wrong="√(-25) = -5 (mert -5 négyzete 25)"
            wrongExplanation="Gyakori tévedés! Semmilyen valós szám négyzete nem lehet negatív: (-5)² = +25 és (+5)² = +25. Nincs olyan valós szám, aminek a négyzete -25 lenne!"
            correct="√(-25) NEM ÉRTELMEZETT a valós számok halmazán!"
            correctExplanation="Valós számok körében negatív számnak nincs négyzetgyöke (kikötés: a ≥ 0)."
            tip="Érettségin: ha gyökjel alatt negatív szám áll, a feladatnak nincs valós megoldása!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SquareRootTheory;
