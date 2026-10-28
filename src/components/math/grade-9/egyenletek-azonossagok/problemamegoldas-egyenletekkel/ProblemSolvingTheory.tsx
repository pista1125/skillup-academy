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
  BookOpen,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Users,
  Target,
  FlaskConical,
  Car,
  HelpCircle,
  Hash
} from 'lucide-react';
import {
  ProblemSolvingStepsSvg,
  AgeProblemTableSvg,
  MixtureProblemSvg,
  MotionProblemSvg
} from './ProblemSolvingFigures';

interface ProblemSolvingTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ProblemSolvingTheory: React.FC<ProblemSolvingTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV FELADAT LABOR ÁLLAPOTOK ---
  const [labMode, setLabMode] = useState<'age' | 'mixture' | 'motion'>('age');

  // 1. Életkoros állapotok
  const [sonCurrentAge, setSonCurrentAge] = useState<number>(10);
  const [fatherMultiplier, setFatherMultiplier] = useState<number>(4); // Apa most 4-szer annyi
  const [targetRatio, setTargetRatio] = useState<number>(2); // mikor lesz 2-szer annyi?

  // Életkor számítás: Apa kora = son * mult. Évek száma k: (Apa + k) = targetRatio * (son + k)
  // Apa + k = targetRatio * son + targetRatio * k
  // Apa - targetRatio * son = k * (targetRatio - 1)
  // k = (Apa - targetRatio * son) / (targetRatio - 1)
  const ageResult = useMemo(() => {
    const fatherAge = sonCurrentAge * fatherMultiplier;
    if (targetRatio <= 1) return null;
    const numerator = fatherAge - targetRatio * sonCurrentAge;
    const denominator = targetRatio - 1;
    const years = numerator / denominator;
    const futureSonAge = sonCurrentAge + years;
    const futureFatherAge = fatherAge + years;
    const isValid = years >= 0 && Number.isInteger(years);

    return {
      fatherAge,
      years,
      futureSonAge,
      futureFatherAge,
      isValid
    };
  }, [sonCurrentAge, fatherMultiplier, targetRatio]);

  // 2. Keverési állapotok
  const [mass1, setMass1] = useState<number>(200);
  const [percent1, setPercent1] = useState<number>(15);
  const [mass2, setMass2] = useState<number>(300);
  const [percent2, setPercent2] = useState<number>(30);

  const mixtureResult = useMemo(() => {
    const pure1 = (mass1 * percent1) / 100;
    const pure2 = (mass2 * percent2) / 100;
    const totalMass = mass1 + mass2;
    const totalPure = pure1 + pure2;
    const finalPercent = totalMass > 0 ? (totalPure / totalMass) * 100 : 0;

    return {
      pure1,
      pure2,
      totalMass,
      totalPure,
      finalPercent: finalPercent.toFixed(1)
    };
  }, [mass1, percent1, mass2, percent2]);

  // 3. Mozgásos állapotok
  const [speed1, setSpeed1] = useState<number>(60); // km/h
  const [speed2, setSpeed2] = useState<number>(90); // km/h
  const [totalDistance, setTotalDistance] = useState<number>(300); // km

  const motionResult = useMemo(() => {
    const relativeSpeed = speed1 + speed2;
    const timeHours = relativeSpeed > 0 ? totalDistance / relativeSpeed : 0;
    const dist1 = speed1 * timeHours;
    const dist2 = speed2 * timeHours;
    const minutes = Math.round(timeHours * 60);

    return {
      relativeSpeed,
      timeHours: timeHours.toFixed(2),
      dist1: dist1.toFixed(1),
      dist2: dist2.toFixed(1),
      minutes
    };
  }, [speed1, speed2, totalDistance]);

  return (
    <TheoryTemplate
      title="Problémamegoldás Egyenletekkel"
      subtitle="A szöveg lefordítása a matematika nyelvére, matematikai modellek felállítása, életkoros, keverési és mozgásos feladatok megoldása"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 6. TÉMAKÖR"
      themeColor="amber"
      documentId="problem-solving-theory"
      pdfFilename="9_osztaly_problemamegoldas_egyenletekkel.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Szöveges Feladatok 4 Aranyszabálya',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-amber-700 dark:text-amber-400 font-black">1. Ismeretlen kijelölése: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Nevezd meg pontosan az ismeretlent mértékegységgel (pl. x = apa jelenlegi életkora évben).
              </span>
            </div>
            <div>
              <span className="text-orange-700 dark:text-orange-400 font-black">2. Mozgás & Keverés: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                s = v · t és m₁ · p₁% + m₂ · p₂% = (m₁ + m₂) · p_új%. Az oldott anyag és a megtett út megmarad!
              </span>
            </div>
            <div>
              <span className="text-emerald-700 dark:text-emerald-400 font-black">3. Szöveges ellenőrzés: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Mindig az EREDETI szöveg összefüggései szerint ellenőrizz, ne csak az egyenletbe helyettesíts vissza!
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* ============================================================ */}
      {/* 1. FEJEZET: A SZÖVEGES FELADATOK ANATÓMIÁJA                  */}
      {/* ============================================================ */}
      <TheorySection
        title="1. A Szöveg Lefordítása a Matematika Nyelvére"
        badge="Modellalkotás"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              A szöveges feladatok lényege a <strong>valós élethelyzetek matematikai leírása (modellezése)</strong>. A siker kulcsa, hogy a mindennapi beszélt szövegben rejlő matematikai kapcsolatokat pontos algebrai kifejezésekké és egyenlőséggé fordítsuk le.
            </p>
            <TheoryCallout
              icon={<Target className="w-5 h-5 text-amber-600" />}
              title="A Modellalkotás Aranyszabálya"
              color="amber"
            >
              Mindig jelöld ki világosan az ismeretlent, és írd le mellé a <strong>mértékegységét</strong> is! Például: <span className="font-mono font-bold">Legyen x a füzet ára Ft-ban</span> (nem pedig csak „legyen x a füzet”).
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <ProblemSolvingStepsSvg size={340} />
          </div>
        </div>

        <TheoryTable
          headers={['Szöveges megfogalmazás', 'Matematikai művelet', 'Algebrai kifejezés']}
          rows={[
            ['Egy számnál 7-tel több', 'Összeadás (+)', 'x + 7'],
            ['Egy számnál 5-tel kevesebb', 'Kivonás (-)', 'x - 5'],
            ['Egy szám négyszerese', 'Szorzás (·)', '4 · x = 4x'],
            ['Egy szám harmada / harmadrésze', 'Osztás (/)', 'x / 3'],
            ['Egy szám 20%-a', 'Százalékszámítás', '0,20 · x'],
            ['Két szám összege 50, az egyik x', 'Kivonás az összegből', '50 - x'],
            ['3 egymást követő egész szám', 'Lépésenként +1', 'x, x + 1, x + 2']
          ]}
        />
      </TheorySection>

      {/* ============================================================ */}
      {/* 2. FEJEZET: ÉLETKOROS FELADATOK ÉS A TÁBLÁZAT               */}
      {/* ============================================================ */}
      <TheorySection
        title="2. Életkoros Feladatok: Az Idő Múlásának Kezelése"
        badge="Klasszikus típus"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Az életkoros feladatoknál a legfontosabb biológiai törvényszerűség: <strong>az idő mindenkinek egyformán telik</strong>. Ha eltelik 5 év, akkor a gyerek is 5 évvel lesz idősebb, és a szülő is pontosan 5 évvel lesz idősebb!
            </p>
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-orange-900 dark:text-orange-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                Miért érdemes táblázatot készíteni?
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                A táblázat oszlopaiba a vizsgált időpontokat írjuk (pl. „Most”, „5 évvel ezelőtt”, „10 év múlva”), a soraiba pedig a szereplőket. Így az egyenlet felírása már szinte magától adódik!
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <AgeProblemTableSvg size={340} />
          </div>
        </div>

        <TheoryTrapBox title="Gyakori Csapda az Életkoros Feladatoknál!">
          <p className="text-xs sm:text-sm">
            <strong>Hiba:</strong> Az egyenlet felírásakor elfelejtik kitenni a zárójelet a szorzásnál: pl. <span className="font-mono text-rose-600 font-bold">2 · x + 6</span> ahelyett, hogy <span className="font-mono text-emerald-600 font-bold">2 · (x + 6)</span> lenne! Mivel a teljes jövőbeli életkort szorozzuk, a zárójel kötelező!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* ============================================================ */}
      {/* 3. FEJEZET: KEVERÉSI FELADATOK ÉS HATÓANYAG-MÉRLEG          */}
      {/* ============================================================ */}
      <TheorySection
        title="3. Keverési Feladatok: Tömeg és Tiszta Anyag Mérlege"
        badge="Százalékszámítás"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Oldatok, ötvözetek összekeverésekor a <strong>tiszta hatóanyag megmaradásának törvényét</strong> alkalmazzuk. A keverékben lévő tiszta anyag tömege pontosan megegyezik a kiinduló összetevőkben lévő tiszta anyagok összegével!
            </p>
            <TheoryCallout
              icon={<FlaskConical className="w-5 h-5 text-amber-600" />}
              title="A Keverési Egyenlet Alapképlete"
              color="amber"
            >
              <div className="font-mono font-bold text-sm">
                m₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_új
              </div>
              <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">
                ahol <span className="font-mono">m</span> a tömeg, <span className="font-mono">p</span> a százalékláb tizedestörtként (pl. 20% = 0,20).
              </div>
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <MixtureProblemSvg size={340} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TheoryCard title="Tiszta Víz hozzáadása (Hígítás)" color="amber">
            Ha tiszta vizet adunk az oldathoz, annak a hatóanyag-tartalma <strong>0%</strong> (p = 0), de az össztömeget növeli!
          </TheoryCard>
          <TheoryCard title="Tiszta Só / Hatóanyag hozzáadása" color="orange">
            Ha kristályos tiszta sót oldunk fel, annak a hatóanyag-tartalma <strong>100%</strong> (p = 1,00)!
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 4. FEJEZET: MOZGÁSOS FELADATOK (s = v * t)                   */}
      {/* ============================================================ */}
      <TheorySection
        title="4. Mozgásos Feladatok: Út, Sebesség és Idő"
        badge="Fizikai modellek"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Egyenletes mozgás esetén a megtett út, a sebesség és az eltelt idő alapösszefüggése: <span className="font-mono font-bold text-amber-600">s = v · t</span>.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                <strong>1. Szembe haladó járművek (Találkozás):</strong><br/>
                Az általuk megtett utak összege adja a teljes távolságot:<br/>
                <span className="font-mono font-bold text-amber-600">s₁ + s₂ = s_össz → v₁ · t + v₂ · t = s_össz</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                <strong>2. Egyirányú mozgás (Utolérés):</strong><br/>
                Az utolérés pillanatában a két jármű által megtett út pontosan egyenlő:<br/>
                <span className="font-mono font-bold text-amber-600">s₁ = s₂ → v₁ · t₁ = v₂ · t₂</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <MotionProblemSvg size={340} />
          </div>
        </div>

        <TheoryTrapBox title="Mértékegység-egyeztetés Csapdája!">
          <p className="text-xs sm:text-sm">
            Ha a sebesség <strong>km/h</strong>-ban van megadva, az időt kötelező <strong>órára</strong> átváltani a szorzás előtt! Például: 45 perc = 45/60 óra = <strong>0,75 óra</strong> (nem szabad 45-tel szorozni!).
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* ============================================================ */}
      {/* 5. FEJEZET: SZÖVEGES ELLENŐRZÉS ÉS REALITÁSKONTROLL          */}
      {/* ============================================================ */}
      <TheorySection
        title="5. Szöveges Ellenőrzés és a Realitáskontroll"
        badge="Befejezés"
      >
        <div className="space-y-4 mb-6">
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            A szöveges feladatok lezárásakor nem elég megelégedni azzal, hogy az egyenletnek van egy algebrai gyöke. A gyököt <strong>a feladat eredeti szövegének valóságos viszonyaival</strong> kell összevetni!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Negatív értékek
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Életkor, sebesség, távolság, darabszám sosem lehet negatív! Ha x = -4 adódik, az a valóságban értelmetlen.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs space-y-1.5">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Hash className="w-4 h-4" />
                Tört darabszámok
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Emberek, könyvek, autók száma kizárólag nemnegatív egész szám lehet! 3,7 ember nem létezik.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs space-y-1.5">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Kerek mondatos válasz
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                A feladatot mindig a kérdésre felelő, mértékegységgel ellátott egész mondattal zárjuk le!
              </p>
            </div>
          </div>
        </div>
      </TheorySection>
    
      {/* ============================================================ */}
      {/* 6. FEJEZET: GYAKORLATI INTERAKTÍV FELADAT LABORATÓRIUM       */}
      {/* ============================================================ */}
      <TheorySection
        title="6. Gyakorlati Interaktív Szöveges Feladat Laboratórium"
        badge="Interaktív Labor"
      >
        {/* ============================================================ */}
      {/* INTERAKTÍV FELADAT LABORATÓRIUM                              */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Target className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Interaktív Szöveges Feladat Laboratórium
              </h2>
              <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium">
                Próbáld ki a klasszikus életkoros, keverési és mozgásos feladatok matematikai modelljét!
              </p>
            </div>
          </div>

          {/* Módválasztó gombok */}
          <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-700/50 shadow-sm">
            <button
              onClick={() => setLabMode('age')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                labMode === 'age'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              <Users className="w-4 h-4" />
              Életkoros Feladat
            </button>
            <button
              onClick={() => setLabMode('mixture')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                labMode === 'mixture'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              Keverési Feladat
            </button>
            <button
              onClick={() => setLabMode('motion')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                labMode === 'motion'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              <Car className="w-4 h-4" />
              Mozgásos Feladat
            </button>
          </div>
        </div>

        {/* 1. MÓD: ÉLETKOROS SZIMULÁTOR */}
        {labMode === 'age' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-100 dark:border-amber-800/60 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Sliders className="w-4 h-4" />
                <span>Feladat paraméterei:</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Fiú mostani életkora:</span>
                  <span className="font-mono text-amber-600">{sonCurrentAge} év</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={sonCurrentAge}
                  onChange={(e) => setSonCurrentAge(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Apa mostani hányszorosa:</span>
                  <span className="font-mono text-amber-600">{fatherMultiplier}-szerese ({sonCurrentAge * fatherMultiplier} év)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={fatherMultiplier}
                  onChange={(e) => setFatherMultiplier(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Keresett arány a jövőben:</span>
                  <span className="font-mono text-amber-600">{targetRatio}-szerese</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="4"
                  value={targetRatio}
                  onChange={(e) => setTargetRatio(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold">Felállított egyenlet (x év múlva):</span>
                <div className="font-mono mt-1 font-bold text-sm">
                  {sonCurrentAge * fatherMultiplier} + x = {targetRatio} · ({sonCurrentAge} + x)
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/60 shadow-md">
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Megoldási Táblázat és Szöveges Válasz:
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 font-bold text-slate-500">Személy</div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">Jelenleg</div>
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 font-bold text-amber-800 dark:text-amber-300">
                  {ageResult && ageResult.years >= 0 ? `${ageResult.years} év múlva` : 'x év múlva'}
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border font-bold">Fiú</div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border font-mono">{sonCurrentAge} év</div>
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 font-mono font-bold text-amber-700">
                  {ageResult ? `${ageResult.futureSonAge} év` : '-'}
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border font-bold">Apa</div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border font-mono">{sonCurrentAge * fatherMultiplier} év</div>
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 font-mono font-bold text-amber-700">
                  {ageResult ? `${ageResult.futureFatherAge} év` : '-'}
                </div>
              </div>

              {ageResult && ageResult.years >= 0 ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-900 dark:text-emerald-200">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Szöveges válasz:
                  </div>
                  <div>
                    Az apa pontosan <strong>{ageResult.years} év múlva</strong> lesz {targetRatio}-szer olyan idős, mint a fia (ekkor a fiú {ageResult.futureSonAge}, az apa {ageResult.futureFatherAge} éves lesz; és {ageResult.futureSonAge} · {targetRatio} = {ageResult.futureFatherAge}).
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-800">
                  Ez az arány a jövőben nem valósulhat meg (negatív év adódna, ami azt jelenti, hogy a múltban fordult elő).
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. MÓD: KEVERÉSI KALKULÁTOR */}
        {labMode === 'mixture' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-100 dark:border-amber-800/60 shadow-md space-y-4">
              <div className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                Oldatok beállítása:
              </div>

              {/* 1. edény */}
              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 space-y-2">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300">1. Oldat:</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Tömeg (g):</label>
                    <input
                      type="number"
                      value={mass1}
                      onChange={(e) => setMass1(Math.max(0, Number(e.target.value)))}
                      className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Töménység (%):</label>
                    <input
                      type="number"
                      value={percent1}
                      onChange={(e) => setPercent1(Math.max(0, Math.min(100, Number(e.target.value))))}
                      className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 2. edény */}
              <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/60 space-y-2">
                <div className="text-xs font-bold text-orange-900 dark:text-orange-300">2. Oldat:</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Tömeg (g):</label>
                    <input
                      type="number"
                      value={mass2}
                      onChange={(e) => setMass2(Math.max(0, Number(e.target.value)))}
                      className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Töménység (%):</label>
                    <input
                      type="number"
                      value={percent2}
                      onChange={(e) => setPercent2(Math.max(0, Math.min(100, Number(e.target.value))))}
                      className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/60 shadow-md space-y-4">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Keverék Hatóanyag-egyenlete:
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-mono space-y-1">
                <div>1. oldat tiszta anyaga: <span className="font-bold text-amber-600">{mass1} · {percent1/100} = {mixtureResult.pure1} g</span></div>
                <div>2. oldat tiszta anyaga: <span className="font-bold text-orange-600">{mass2} · {percent2/100} = {mixtureResult.pure2} g</span></div>
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700 font-bold">
                  Összes tiszta anyag: {mixtureResult.totalPure} g
                </div>
                <div>Összes oldat tömege: {mixtureResult.totalMass} g</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500 text-white shadow-md text-center">
                <div className="text-xs uppercase font-bold tracking-wider opacity-90">Keletkező keverék töménysége:</div>
                <div className="text-3xl font-black font-mono my-1">{mixtureResult.finalPercent}%</div>
                <div className="text-[11px] opacity-90">
                  {mixtureResult.totalPure} g tiszta anyag / {mixtureResult.totalMass} g össztömeg
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MÓD: MOZGÁSOS KALKULÁTOR */}
        {labMode === 'motion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-100 dark:border-amber-800/60 shadow-md space-y-4">
              <div className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Car className="w-4 h-4" />
                Mozgás paraméterei (szembejövő járművek):
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Teljes távolság (s_össz):</span>
                  <span className="font-mono text-amber-600">{totalDistance} km</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={totalDistance}
                  onChange={(e) => setTotalDistance(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">1. jármű (v₁):</label>
                  <input
                    type="number"
                    value={speed1}
                    onChange={(e) => setSpeed1(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                  />
                  <span className="text-[10px] text-slate-400 text-center block mt-0.5">km/h</span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">2. jármű (v₂):</label>
                  <input
                    type="number"
                    value={speed2}
                    onChange={(e) => setSpeed2(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                  />
                  <span className="text-[10px] text-slate-400 text-center block mt-0.5">km/h</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/60 shadow-md space-y-3">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Egyenlet és Találkozás:
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-mono space-y-1">
                <div>Relatív közeledési sebesség: {speed1} + {speed2} = {motionResult.relativeSpeed} km/h</div>
                <div>Egyenlet: <span className="font-bold text-amber-600">{speed1} · t + {speed2} · t = {totalDistance}</span></div>
                <div className="font-bold pt-1 border-t border-slate-200 dark:border-slate-700">
                  Idő: t = {totalDistance} / {motionResult.relativeSpeed} = {motionResult.timeHours} óra ({motionResult.minutes} perc)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-blue-900 dark:text-blue-200">
                  <span className="font-bold">1. jármű útja:</span>
                  <div className="font-mono text-base font-black">{motionResult.dist1} km</div>
                </div>
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-900 dark:text-red-200">
                  <span className="font-bold">2. jármű útja:</span>
                  <div className="font-mono text-base font-black">{motionResult.dist2} km</div>
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
