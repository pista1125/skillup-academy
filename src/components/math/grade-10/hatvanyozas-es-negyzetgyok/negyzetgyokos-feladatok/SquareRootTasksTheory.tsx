import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  MathText
} from '../TheoryTemplate';
import {
  Zap,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calculator,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  Scale,
  Divide,
  Maximize2
} from 'lucide-react';
import {
  RootExtractionSvg,
  RootInsertionAndCompareSvg,
  MonomialRationalizationSvg,
  ConjugateRationalizationSvg
} from './SquareRootTasksFigures';

interface SquareRootTasksTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SquareRootTasksTheory: React.FC<SquareRootTasksTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Laboratórium fülei
  const [labTab, setLabTab] = useState<'mono' | 'compare'>('mono');

  // Egytagú gyöktelenítő állapota
  const [monoNumerator, setMonoNumerator] = useState<number>(6);
  const [monoRadicand, setMonoRadicand] = useState<number>(3);

  // Összehasonlító labor állapota: a√b vs c√d
  const [compA, setCompA] = useState<number>(3);
  const [compB, setCompB] = useState<number>(5);
  const [compC, setCompC] = useState<number>(5);
  const [compD, setCompD] = useState<number>(2);

  // Számítások az egytagú gyöktelenítéshez
  const monoDenomSquare = monoRadicand;
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const currentGcd = gcd(monoNumerator, monoDenomSquare);
  const simplifiedNum = monoNumerator / currentGcd;
  const simplifiedDen = monoDenomSquare / currentGcd;

  // Számítások az összehasonlításhoz
  const inside1 = compA * compA * compB;
  const inside2 = compC * compC * compD;
  const val1 = compA * Math.sqrt(compB);
  const val2 = compC * Math.sqrt(compD);

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="6. Négyzetgyökös feladatok"
      subtitle="Tényező kiemelése a gyökjel alól, bevitele gyökjel alá, egynemű gyökök összevonása és a nevező gyöktelenítése"
      themeColor="amber"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Kiemelés:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√(a² · b) = a · √b</MathText> &nbsp;(a ≥ 0, b ≥ 0; pl. <MathText>√72 = √(36 · 2) = 6√2</MathText>)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Bevitel gyök alá:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>a · √b = √(a² · b)</MathText> &nbsp;(a ≥ 0; pl. <MathText>3√5 = √(9 · 5) = √45</MathText>)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Egytagú nevező:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>c / √a = (c · √a) / a</MathText> &nbsp;(bővítés <MathText>√a</MathText>-val; pl. <MathText>6 / √3 = (6√3) / 3 = 2√3</MathText>)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">Kéttagú nevező:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>c / (√a + √b) = (c(√a - √b)) / (a - b)</MathText> &nbsp;(bővítés konjugálttal!)</span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: TÉNYEZŐ KIEMELÉSE */}
      <TheorySection
        number={1}
        title="Tényező kiemelése gyökjel alól (részleges gyökvonás)"
        icon={<Maximize2 className="w-5 h-5 text-amber-500" />}
        badge="ALAPELJÁRÁS"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A matematikában nagyon gyakran olyan négyzetgyökökkel találkozunk, amelyek alatt a szám nem négyzetszám, így a gyök értéke irracionális szám (pl. <MathText>√18</MathText>, <MathText>√72</MathText>, <MathText>√50</MathText>). Ilyenkor a feladatmegoldás során <strong>nem tizedestört közelítést</strong> használunk, hanem a kifejezést a lehető legegyszerűbb, pontos alakban hagyjuk.
            </p>
            <p>
              Erre szolgál a <strong>részleges gyökvonás</strong> (kiemelés a gyökjel alól). A lényege: a gyök alatti számot felbontjuk egy <strong>lehető legnagyobb négyzetszám</strong> és egy maradék szorzatára:
            </p>
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border-l-4 border-amber-500 text-center text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200">
              <MathText>√(a² · b) = √a² · √b = a · √b</MathText> &nbsp;(ha <MathText>a ≥ 0</MathText> és <MathText>b ≥ 0</MathText>)
            </div>
            <p>
              <strong>Hogyan találjuk meg a kiemelendő négyzetszámot?</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Kis számoknál:</strong> Fejben keressük a négyzetszám osztókat (4, 9, 16, 25, 36, 49, 64, 100 stb.). Pl. 72 osztható 36-tal (36 · 2), így <MathText>√72 = 6√2</MathText>.</li>
              <li><strong>Nagyobb számoknál (prímfelbontás módszere):</strong> A számot prímtényezőkre bontjuk, és a páros kitevőjű hatványokból felezett kitevővel vonunk gyököt. Pl. 108 = 2² · 3³ = 2² · 3² · 3, így <MathText>√108 = 2 · 3 · √3 = 6√3</MathText>.</li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <RootExtractionSvg />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <TheoryCard
            title="Gyakori kiemelések"
            badge="PÉLDATÁR"
            badgeColor="amber"
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
          >
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p>• <MathText>√8 = √(4 · 2) = 2√2</MathText></p>
              <p>• <MathText>√12 = √(4 · 3) = 2√3</MathText></p>
              <p>• <MathText>√18 = √(9 · 2) = 3√2</MathText></p>
              <p>• <MathText>√20 = √(4 · 5) = 2√5</MathText></p>
              <p>• <MathText>√27 = √(9 · 3) = 3√3</MathText></p>
              <p>• <MathText>√32 = √(16 · 2) = 4√2</MathText></p>
              <p>• <MathText>√50 = √(25 · 2) = 5√2</MathText></p>
              <p>• <MathText>√75 = √(25 · 3) = 5√3</MathText></p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Egynemű gyökök összevonása"
            badge="ALKALMAZÁS"
            badgeColor="emerald"
            icon={<Layers className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
              Két gyökös tag csak akkor vonható össze összeadásban vagy kivonásban, ha a kiemelés után <strong>ugyanaz a szám marad a gyökjel alatt</strong> (egynemű gyökök):
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200 space-y-1">
              <div><MathText>√8 + √18 = 2√2 + 3√2 = 5√2</MathText></div>
              <div><MathText>√75 - √12 = 5√3 - 2√3 = 3√3</MathText></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A nem maximális kiemelés csapdája"
            badge="GYAKORI HIBA"
            badgeColor="rose"
            icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-1.5">
              Ha nem a legnagyobb négyzetszámot vesszük észre, a kiemelés nem teljes!
            </p>
            <p className="text-xs text-rose-700 dark:text-rose-300">
              Pl. <MathText>√72 = √(4 · 18) = 2√18</MathText> ❌ (Nem egyszerű alak, mert 18-ból még kiemelhető a 9: <MathText>2 · 3√2 = 6√2</MathText> ✔)
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: TÉNYEZŐ BEVITELE ÉS ÖSSZEHASONLÍTÁS */}
      <TheorySection
        number={2}
        title="Tényező bevitele gyökjel alá és kifejezések összehasonlítása"
        icon={<Scale className="w-5 h-5 text-sky-500" />}
        badge="ÖSSZEHASONLÍTÁS"
        badgeColor="sky"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A részleges gyökvonás fordított művelete, amikor a gyök előtt álló szorzótényezőt szeretnénk <strong>bevinni a gyökjel alá</strong>.
            </p>
            <p>
              A szabály alapja az, hogy bármely nemnegatív valós szám felírható saját négyzete négyzetgyökeként (<MathText>a = √(a²)</MathText>), majd a szorzat azonosságával összevonható:
            </p>
            <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border-l-4 border-sky-500 text-center text-sm sm:text-base font-bold text-sky-900 dark:text-sky-200">
              <MathText>a · √b = √a² · √b = √(a² · b)</MathText> &nbsp;(<MathText>a ≥ 0</MathText>, <MathText>b ≥ 0</MathText>)
            </div>
            <p>
              <strong>Mikor hasznos a gyökjel alá vitel?</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Kifejezések pontos nagyságrendi összehasonlításakor:</strong> Ha el kell dönteni, hogy melyik szám a nagyobb (pl. <MathText>3√5</MathText> vagy <MathText>5√2</MathText>), zsebszámológép nélkül nehéz megmondani. De mindkettőt bevíve egyetlen gyökjel alá: <MathText>3√5 = √45</MathText> és <MathText>5√2 = √50</MathText>. Mivel <MathText>45 &lt; 50</MathText>, rögtön látható, hogy <strong><MathText>3√5 &lt; 5√2</MathText></strong>!
              </li>
              <li>
                <strong>Negatív előjel kezelése:</strong> Nagyon fontos szabály, hogy <strong>a negatív előjelet NEM visszük be a gyök alá</strong>, mert negatív számnak nincs valós négyzetgyöke! Az előjel a gyökjel előtt marad: <MathText>-3√2 = -(3√2) = -√(9 · 2) = -√18</MathText>.
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <RootInsertionAndCompareSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A NEVEZŐ GYÖKTELENÍTÉSE */}
      <TheorySection
        number={3}
        title="A nevező gyöktelenítése (racionalizálás)"
        icon={<Divide className="w-5 h-5 text-teal-500" />}
        badge="TECHNIKAI FOGÁS"
        badgeColor="teal"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            A matematikában és a természettudományokban íratlan szabály, hogy a végeredményben a tört nevezőjében <strong>ne szerepeljen négyzetgyök</strong> (irracionális szám). Egy tört értékét sokkal könnyebb megbecsülni, kerekíteni és további számításokba bevonni, ha a nevezője egész szám (racionális).
          </p>
          <p>
            A nevező gyöktelenítésének két fő esete van aszerint, hogy a nevező egyetlen gyökös tagot vagy két tag összegét/különbségét tartalmazza.
          </p>
        </div>

        {/* 1. Eset: Egytagú nevező */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-bold text-base sm:text-lg text-teal-800 dark:text-teal-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 inline-flex items-center justify-center text-xs font-black">A</span>
              Egytagú gyökös nevező gyöktelenítése
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Ha a nevezőben csak egyetlen gyökös tag áll (<MathText>c / √a</MathText>), a törtet <strong>önmagával a gyökkel bővítjük</strong> (számlálót és nevezőt is megszorozzuk <MathText>√a</MathText>-val):
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-300 dark:border-teal-800 text-center text-sm font-bold text-teal-900 dark:text-teal-200">
              <MathText>c / √a = (c · √a) / (√a · √a) = (c√a) / a</MathText> &nbsp;(<MathText>a &gt; 0</MathText>)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A nevezőben <MathText>(√a)² = a</MathText> keletkezik, ami már racionális egész szám. Végül a c és a együtthatókat, ha lehet, egyszerűsítjük.
            </p>
          </div>
          <div className="lg:col-span-6">
            <MonomialRationalizationSvg />
          </div>
        </div>

        {/* 2. Eset: Kéttagú nevező konjugálttal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-bold text-base sm:text-lg text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 inline-flex items-center justify-center text-xs font-black">B</span>
              Kéttagú gyökös nevező: Bővítés algebrai konjugálttal
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Ha a nevező kéttagú (pl. <MathText>√a + √b</MathText> vagy <MathText>√a - b</MathText>), nem elég sima gyökkel szorozni, mert a vegyes szorzatokban megmaradna a gyök!
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Megoldás: Használjuk a nevezetes szorzatot: <strong><MathText>(x + y)(x - y) = x² - y²</MathText></strong>! Ezzel a trükkel mindkét tag négyzetre emelődik, és a kereszt-szorzatok automatikusan kiejtik egymást.
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-300 dark:border-indigo-800 text-center text-xs sm:text-sm font-bold text-indigo-900 dark:text-indigo-200">
              <MathText>c / (√a + √b) = (c(√a - √b)) / ((√a + √b)(√a - √b)) = (c(√a - √b)) / (a - b)</MathText>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Az <MathText>√a + √b</MathText> és <MathText>√a - √b</MathText> kifejezéseket egymás <strong>algebrai konjugáltjának</strong> nevezzük.
            </p>
          </div>
          <div className="lg:col-span-6">
            <ConjugateRationalizationSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: NEVEZETES AZONOSSÁGOK ÉS ALGEBRAI FELADATOK */}
      <TheorySection
        number={4}
        title="Nevezetes azonosságok és összetett algebrai gyökös feladatok"
        icon={<Zap className="w-5 h-5 text-purple-500" />}
        badge="EMELT SZINTŰ STRATÉGIÁK"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Kéttagú gyökös összeg négyzetre emelése"
            badge="NEVEZETES NÉGYZET"
            badgeColor="purple"
            icon={<Sparkles className="w-4 h-4 text-purple-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
              Használjuk az (a ± b)² = a² ± 2ab + b² szabályt:
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded">
                <div><MathText>(√3 + √2)² = (√3)² + 2(√3 · √2) + (√2)²</MathText></div>
                <div className="mt-1"><MathText>= 3 + 2√6 + 2 = 5 + 2√6</MathText></div>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded">
                <div><MathText>(√5 - 1)² = (√5)² - 2(√5 · 1) + 1²</MathText></div>
                <div className="mt-1"><MathText>= 5 - 2√5 + 1 = 6 - 2√5</MathText></div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Teljes négyzetté alakítás a gyök alatt"
            badge="TRÜKKÖS FELADATOK"
            badgeColor="indigo"
            icon={<Lightbulb className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
              Gyakori verseny- és érettségi feladattípus az "emeletes" összetett gyökök kiszámítása:
            </p>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded text-xs sm:text-sm space-y-1">
              <p>Mennyi <strong><MathText>√(7 + 4√3)</MathText></strong> pontos értéke?</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Vegyük észre, hogy <MathText>7 + 4√3 = 4 + 4√3 + 3 = (2 + √3)²</MathText>!</p>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold"><MathText>√(7 + 4√3) = √((2 + √3)²) = |2 + √3| = 2 + √3</MathText></p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. INTERAKTÍV LABORATÓRIUM */}
      <TheorySection
        number={5}
        title="Interaktív Laboratórium: Gyöktelenítés és összehasonlítás"
        icon={<Calculator className="w-5 h-5 text-amber-500" />}
        badge="INTERAKTÍV"
        badgeColor="amber"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* Fülválasztó */}
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            <button
              onClick={() => setLabTab('mono')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labTab === 'mono'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
              }`}
            >
              1. Egytagú gyöktelenítő
            </button>
            <button
              onClick={() => setLabTab('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labTab === 'compare'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
              }`}
            >
              2. Gyökök nagyságrendi összehasonlítója
            </button>
          </div>

          {labTab === 'mono' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Számláló (c): {monoNumerator}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 6, 8, 10, 12, 14, 15].map((num) => (
                      <button
                        key={num}
                        onClick={() => setMonoNumerator(num)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                          monoNumerator === num
                            ? 'bg-amber-500 text-white border-amber-600'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Nevező gyöke (√a): <MathText>{`√${monoRadicand}`}</MathText>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[2, 3, 5, 6, 7].map((rad) => (
                      <button
                        key={rad}
                        onClick={() => setMonoRadicand(rad)}
                        className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                          monoRadicand === rad
                            ? 'bg-teal-500 text-white border-teal-600 shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <MathText>{`√${rad}`}</MathText>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Számítás lépésről lépésre kártya */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-2">
                <div className="text-xs text-slate-500 font-bold">Kiinduló tört:</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center">
                  <MathText>{`${monoNumerator} / √${monoRadicand}`}</MathText>
                </div>
                <div className="text-xs text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center gap-1">
                  <span>Bővítés</span>
                  <MathText>{`√${monoRadicand}`}</MathText>
                  <span>-vel:</span>
                </div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center flex-wrap gap-1">
                  <MathText>{`= (${monoNumerator} · √${monoRadicand}) / (√${monoRadicand} · √${monoRadicand}) = (${monoNumerator}√${monoRadicand}) / ${monoRadicand}`}</MathText>
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center flex-wrap gap-1.5">
                  <span>Egyszerűsített végeredmény:</span>
                  <MathText>
                    {simplifiedDen === 1
                      ? `${simplifiedNum === 1 ? '' : simplifiedNum}√${monoRadicand}`
                      : `(${simplifiedNum === 1 ? '' : simplifiedNum}√${monoRadicand}) / ${simplifiedDen}`}
                  </MathText>
                </div>
              </div>
            </div>
          )}

          {labTab === 'compare' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Kifejezés: a√b */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-sky-200 dark:border-sky-800">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-2">1. Kifejezés (A)</div>
                  <div className="text-center text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center justify-center gap-1">
                    <MathText>{`${compA}√${compB} = √(${compA}² · ${compB}) = `}</MathText>
                    <span className="text-sky-600 dark:text-sky-400"><MathText>{`√${inside1}`}</MathText></span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500">Szorzó (a): {compA}</span>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={compA}
                        onChange={(e) => setCompA(parseInt(e.target.value))}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div>
                      <span className="text-slate-500">Gyök alatti (b): {compB}</span>
                      <input
                        type="range"
                        min={2}
                        max={10}
                        value={compB}
                        onChange={(e) => setCompB(parseInt(e.target.value))}
                        className="w-full accent-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Kifejezés: c√d */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-800">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">2. Kifejezés (B)</div>
                  <div className="text-center text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center justify-center gap-1">
                    <MathText>{`${compC}√${compD} = √(${compC}² · ${compD}) = `}</MathText>
                    <span className="text-amber-600 dark:text-amber-400"><MathText>{`√${inside2}`}</MathText></span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500">Szorzó (c): {compC}</span>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={compC}
                        onChange={(e) => setCompC(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <span className="text-slate-500">Gyök alatti (d): {compD}</span>
                      <input
                        type="range"
                        min={2}
                        max={10}
                        value={compD}
                        onChange={(e) => setCompD(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Eredmény banner */}
              <div className="p-4 rounded-xl text-center font-bold text-base sm:text-lg bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center">
                {inside1 > inside2 ? (
                  <span className="text-sky-600 dark:text-sky-400">
                    <MathText>{`${compA}√${compB} (√${inside1}) > ${compC}√${compD} (√${inside2})`}</MathText>
                  </span>
                ) : inside1 < inside2 ? (
                  <span className="text-amber-600 dark:text-amber-400">
                    <MathText>{`${compA}√${compB} (√${inside1}) < ${compC}√${compD} (√${inside2})`}</MathText>
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    <MathText>{`${compA}√${compB} = ${compC}√${compD} (Mindkettő pontos értéke: √${inside1})`}</MathText>
                  </span>
                )}
                <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1">
                  Közelítő értékek: {val1.toFixed(3)} és {val2.toFixed(3)}
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SquareRootTasksTheory;
