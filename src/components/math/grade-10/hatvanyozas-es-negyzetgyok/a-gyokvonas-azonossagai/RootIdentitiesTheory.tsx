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
  Scale
} from 'lucide-react';
import {
  SquareRootDefinitionSvg,
  AbsoluteValueRootSvg,
  ProductAndQuotientRootSvg,
  RootSumTrapSvg
} from './RootIdentitiesFigures';

interface RootIdentitiesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RootIdentitiesTheory: React.FC<RootIdentitiesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Laboratórium állapota
  const [labTab, setLabTab] = useState<'geom' | 'abs'>('geom');

  // Geom state
  const [geomArea, setGeomArea] = useState<number>(36);

  // Abs state
  const [absVal, setAbsVal] = useState<number>(-5);

  const geomRoot = Math.sqrt(geomArea);
  const isPerfectSquare = Number.isInteger(geomRoot);

  const squaredVal = absVal * absVal;
  const sqrtOfSquared = Math.sqrt(squaredVal);

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="5. A gyökvonás azonosságai"
      subtitle="A négyzetgyök definíciója (a ≥ 0), a √(a²) = |a| szabály, szorzat és hányados négyzetgyöke, valamint az összeg gyökének csapdája"
      themeColor="teal"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-teal-600 dark:text-teal-400 font-black">Definíció:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√a ≥ 0</MathText> és <MathText>(√a)² = a</MathText> &nbsp;(kizárólag a ≥ 0 esetén!)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Abszolút érték:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√(a²) = |a|</MathText> &nbsp;(minden valós számra! Pl. <MathText>√((-5)²) = |-5| = 5</MathText>)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Szorzat / Hányados:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√(a · b) = √a · √b</MathText> &nbsp;|&nbsp; <MathText>√(a / b) = √a / √b</MathText> &nbsp;(a, b ≥ 0, b &gt; 0)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">TILOS tagonként:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√(a + b) ≠ √a + √b</MathText> &nbsp;(Pl. <MathText>√(9 + 16) = 5 ≠ 3 + 4 = 7</MathText>!)</span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A NÉGYZETGYÖK DEFINÍCIÓJA */}
      <TheorySection
        number={1}
        title="A négyzetgyök fogalma, definíciója és geometriai háttere"
        icon={<Compass className="w-5 h-5 text-teal-500" />}
        badge="ALAPFOGALOM"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A matematikában a négyzetre emelés és a négyzetgyökvonás kölcsönösen egymás megfordításai
              (inverz műveletei) a nemnegatív számok körében. Geometriai szempontból:{' '}
              <strong>egy „a” területű négyzet oldalhossza pontosan <MathText>√a</MathText></strong>.
            </p>

            <TheoryCard
              title="A négyzetgyök szabatos matematikai definíciója"
              icon={<BookOpen className="w-4 h-4 text-teal-500" />}
            >
              <div className="p-3 bg-teal-50/70 dark:bg-teal-950/30 rounded-lg border border-teal-200/60 dark:border-teal-900/40 text-center space-y-2">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Tetszőleges <strong className="text-teal-700 dark:text-teal-300">a ≥ 0</strong> nemnegatív valós szám{' '}
                  <strong>négyzetgyökén (<MathText>√a</MathText>)</strong> azt a{' '}
                  <strong className="text-teal-700 dark:text-teal-300">nemnegatív valós számot</strong> értjük,
                  amelynek négyzete éppen a:
                </div>
                <div className="text-xl sm:text-2xl font-black text-teal-700 dark:text-teal-300 tracking-wide">
                  <MathText>(√a)² = a</MathText> &nbsp; és &nbsp; <MathText>√a ≥ 0</MathText>
                </div>
              </div>

              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                <li>
                  <strong>A gyökjel alatti kifejezés (radikandus):</strong> Kizárólag nemnegatív valós szám lehet (a ≥ 0)!
                  Negatív számnak a valós számok körében nincs négyzetgyöke (pl. <MathText>√(-16)</MathText> nem értelmezett).
                </li>
                <li>
                  <strong>A négyzetgyök értéke sosem negatív:</strong> <MathText>√25 = +5</MathText> (és NEM -5 vagy ±5)!
                  Bár (-5)² is 25, a négyzetgyök <em>függvényként</em> egyértelmű művelet, és a definíció értelmében
                  kizárólag a nemnegatív értéket rendeli hozzá.
                </li>
              </ul>
            </TheoryCard>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <SquareRootDefinitionSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              1. ábra: A négyzetgyök geometriai jelentése: az „a” területű négyzet oldala
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A FUNDAMENTÁLIS √(a²) = |a| SZABÁLY */}
      <TheorySection
        number={2}
        title="A fundamentális √(a²) = |a| azonosság és az abszolút érték"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badge="ÉRETTSÉGI KULCS"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center w-full order-2 lg:order-1">
            <AbsoluteValueRootSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              2. ábra: Miért kötelező az abszolút érték a négyzet gyökénél?
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              A középiskolai algebra egyik legveszélyesebb tévedése az a felületes gondolat, hogy
              „a gyök és a négyzet mindig kiejti egymást, tehát <MathText>√(a²) = a</MathText>”. Ez{' '}
              <strong className="text-rose-600 dark:text-rose-400">CSAK AKKOR IGAZ, HA a ≥ 0</strong>!
            </p>

            <TheoryCard
              title="A két eset szétválasztása"
              icon={<Zap className="w-4 h-4 text-amber-500" />}
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p>
                  Bármilyen valós számot négyzetre emelünk, pozitív számot (vagy nullát) kapunk, amelyből
                  gyököt vonva ismét pozitív eredményt kapunk:
                </p>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 text-center">
                  <MathText>√(a²) = |a|</MathText> &nbsp;(ha <MathText>a ≥ 0</MathText>, akkor <MathText>+a</MathText>; ha <MathText>a &lt; 0</MathText>, akkor <MathText>-a</MathText>)
                </div>
                <div className="space-y-1 pt-1">
                  <div>• Ha a = 7: <MathText>√(7²) = √49 = 7 = |7|</MathText>.</div>
                  <div>• Ha a = -7: <MathText>√((-7)²) = √49 = 7 = |-7|</MathText> (és NEM -7!).</div>
                  <div>• Betűs kifejezésnél: ha <MathText>x ∈ ℝ</MathText>, akkor <strong><MathText>√(x²) = |x|</MathText></strong>!</div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout
              type="danger"
              title="Tipikus érettségi pontlevonás"
            >
              Ha egy algebrai feladatban szerepel a <MathText>√(x²)</MathText> kifejezés, és x előjeléről semmit nem tudunk,
              akkor a helyes válasz <strong><MathText>|x|</MathText></strong>. Ha simán x-et írsz, a vizsgáztató hibásnak tekinti a levezetést!
              Csak akkor hagyható el az abszolút érték, ha a feladat külön kiköti, hogy <MathText>x ≥ 0</MathText>.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: SZORZAT ÉS HÁNYADOS NÉGYZETGYÖKE */}
      <TheorySection
        number={3}
        title="A szorzat és a hányados négyzetgyöke"
        icon={<Layers className="w-5 h-5 text-sky-500" />}
        badge="MŰVELETI AZONOSSÁGOK"
        badgeColor="sky"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A négyzetgyökvonás művelete a hatványozás azonosságaihoz hasonlóan szorosan együttműködik a{' '}
              <strong>szorzással</strong> és az <strong>osztással</strong>:
            </p>

            <TheoryCard
              title="1. Szorzat négyzetgyöke"
              icon={<CheckCircle2 className="w-4 h-4 text-sky-500" />}
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p>
                  Nemnegatív számok szorzatának négyzetgyöke egyenlő a tényezők négyzetgyökének szorzatával:
                </p>
                <div className="p-2 bg-sky-50 dark:bg-sky-950/40 rounded border border-sky-200 dark:border-sky-800 font-bold text-sky-900 dark:text-sky-200 text-center text-sm sm:text-base">
                  <MathText>√(a · b) = √a · √b</MathText> &nbsp; (a, b ≥ 0)
                </div>
                <p className="text-xs">
                  • Alkalmazás odafelé (szétbontás): <MathText>√72 = √(36 · 2) = √36 · √2 = 6√2</MathText>.
                  <br />
                  • Alkalmazás visszafelé (összevonás): <MathText>√2 · √8 = √(2 · 8) = √16 = 4</MathText>.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Hányados (tört) négyzetgyöke"
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p>
                  Tört négyzetgyöke egyenlő a számláló és a nevező négyzetgyökének hányadosával:
                </p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-900 dark:text-emerald-200 text-center text-sm sm:text-base">
                  <MathText>√(a / b) = √a / √b</MathText> &nbsp; (a ≥ 0, b &gt; 0)
                </div>
                <p className="text-xs">
                  • Példa: <MathText>√(49 / 81) = √49 / √81 = 7 / 9</MathText>.
                  <br />
                  • Összevonás: <MathText>√50 / √2 = √(50 / 2) = √25 = 5</MathText>.
                </p>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <ProductAndQuotientRootSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              3. ábra: Szorzat és tört gyökének szétbontása és összevonása
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: AZ ÖSSZEG GYÖKÉNEK CSAPDÁJA */}
      <TheorySection
        number={4}
        title="A végzetes összeg- és különbségcsapda"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="FIGYELMEZTETÉS"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center w-full order-2 lg:order-1">
            <RootSumTrapSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              4. ábra: Numerikus bizonyíték: miért nem egyenlő az összeg gyöke a gyökök összegével
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              A matematika dolgozatok leggyakoribb és legsúlyosabb hibája:
              <strong className="text-rose-600 dark:text-rose-400">
                {' '}ÖSSZEGET ÉS KÜLÖNBSÉGET TAGONKÉNT GYÖK ALÁ VONNI SZIGORÚAN TILOS!
              </strong>
            </p>

            <TheoryCard
              title="A pitagoraszi ellenpélda"
              icon={<BookOpen className="w-4 h-4 text-rose-500" />}
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p>
                  Vegyük a 9-et és a 16-ot:
                </p>
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs sm:text-sm text-rose-900 dark:text-rose-200 space-y-1">
                  <div>• Helyes: <MathText>√(9 + 16) = √25 = 5</MathText>.</div>
                  <div>• Hibás: <MathText>√9 + √16 = 3 + 4 = 7</MathText>.</div>
                  <div className="font-bold text-rose-600 dark:text-rose-400">
                    Mivel 5 ≠ 7, ezért <MathText>√(a + b) ≠ √a + √b</MathText>!
                  </div>
                </div>
                <p>
                  Ugyanez érvényes algebrai kifejezésekre is:
                  <strong> <MathText>√(x² + y²) ≠ x + y</MathText>!</strong>
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABORATÓRIUM */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-teal-50/60 via-slate-50 to-emerald-50/60 dark:from-teal-950/20 dark:via-slate-900 dark:to-emerald-950/20 rounded-2xl border-2 border-teal-200/80 dark:border-teal-900/50 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-200/60 dark:border-teal-900/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              Interaktív Laboratórium
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Gyökvonás & Abszolút Érték Laboratórium
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setLabTab('geom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labTab === 'geom'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Geometriai Négyzet
            </button>
            <button
              onClick={() => setLabTab('abs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labTab === 'abs'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Abszolút Érték Labor
            </button>
          </div>
        </div>

        {labTab === 'geom' ? (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Állítsd be a négyzet területét (a), és figyeld meg az oldalhossz (<MathText>√a</MathText>) alakulását!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Terület (a): {geomArea}</span>
                  <span className="text-teal-600 dark:text-teal-400">
                    {isPerfectSquare ? 'Négyszetszám!' : 'Irracionális gyök'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={144}
                  value={geomArea}
                  onChange={(e) => setGeomArea(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex gap-1.5 flex-wrap">
                  {[4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144].map(v => (
                    <button
                      key={v}
                      onClick={() => setGeomArea(v)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all ${
                        geomArea === v ? 'bg-teal-600 text-white border-teal-700 font-bold' : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vizuális szimuláció */}
              <div className="p-4 bg-teal-900/10 dark:bg-teal-950/40 rounded-xl border border-teal-300/80 dark:border-teal-800 text-center space-y-2">
                <div className="text-xs text-teal-700 dark:text-teal-300 font-bold uppercase tracking-wider">
                  Négyzet oldalhossza:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-teal-700 dark:text-teal-300 flex items-center justify-center">
                  <MathText>{`√${geomArea} = ${isPerfectSquare ? geomRoot : geomRoot.toFixed(4)}`}</MathText>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                  <span>Ellenőrzés:</span>
                  <MathText>{`(${isPerfectSquare ? geomRoot : geomRoot.toFixed(4)})² ≈ ${geomArea}`}</MathText>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Állíts be egy pozitív vagy negatív számot (a), és vizsgáld meg, miért <MathText>√(a²) = |a|</MathText>!
            </p>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Alapszám (a): {absVal}</span>
                <span className={absVal < 0 ? 'text-rose-500' : 'text-emerald-500'}>
                  {absVal < 0 ? 'Negatív szám!' : 'Nemnegatív szám'}
                </span>
              </div>
              <input
                type="range"
                min={-10}
                max={10}
                value={absVal}
                onChange={(e) => setAbsVal(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex gap-1.5 flex-wrap">
                {[-10, -7, -5, -3, -1, 0, 1, 3, 5, 7, 10].map(v => (
                  <button
                    key={v}
                    onClick={() => setAbsVal(v)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all ${
                      absVal === v ? 'bg-teal-600 text-white border-teal-700 font-bold' : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Lépésről lépésre levezetés */}
            <div className="p-4 bg-teal-900/10 dark:bg-teal-950/40 rounded-xl border border-teal-300/80 dark:border-teal-800 text-center space-y-2">
              <div className="text-xs text-teal-700 dark:text-teal-300 font-bold uppercase tracking-wider font-sans">
                Számítás 2 lépésben:
              </div>
              <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5">
                <span>1. Négyzetre emelés:</span>
                <MathText>{`(${absVal})² = ${squaredVal}`}</MathText>
              </div>
              <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5">
                <span>2. Négyzetgyökvonás:</span>
                <MathText>{`√(${squaredVal}) = +${sqrtOfSquared}`}</MathText>
              </div>
              <div className="text-xl sm:text-2xl font-black text-teal-700 dark:text-teal-300 pt-1 flex items-center justify-center">
                <MathText>{`√(({absVal})²) = |${absVal}| = +${sqrtOfSquared}`}</MathText>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. SZEKCIÓ: KIDOLGOZOTT MINTAPÉLDÁK */}
      <TheorySection
        number={5}
        title="Kidolgozott érettségi mintapéldák"
        icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
        badge="MINTAPÉLDÁK"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Mintapélda 1 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-wide">
              1. Mintapélda: Gyöktényezők összevonása
            </span>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
              <span>Számítsd ki:</span>
              <MathText>√18 · √2 - √75 : √3</MathText>!
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
              <div>• 1. tag: <MathText>√18 · √2 = √(18 · 2) = √36 = 6</MathText></div>
              <div>• 2. tag: <MathText>√75 : √3 = √(75 / 3) = √25 = 5</MathText></div>
              <div className="text-teal-600 dark:text-teal-400 font-bold">
                Végeredmény: <MathText>6 - 5 = 1</MathText>
              </div>
            </div>
          </div>

          {/* Mintapélda 2 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-wide">
              2. Mintapélda: Kiemelés gyökjel alól
            </span>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
              <span>Hozd a legegyszerűbb alakra:</span>
              <MathText>√50 + √18 - √8</MathText>!
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
              <div>• <MathText>√50 = √(25 · 2) = 5√2</MathText></div>
              <div>• <MathText>√18 = √(9 · 2) = 3√2</MathText></div>
              <div>• <MathText>√8 = √(4 · 2) = 2√2</MathText></div>
              <div className="text-teal-600 dark:text-teal-400 font-bold">
                Végeredmény: <MathText>5√2 + 3√2 - 2√2 = 6√2</MathText>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
