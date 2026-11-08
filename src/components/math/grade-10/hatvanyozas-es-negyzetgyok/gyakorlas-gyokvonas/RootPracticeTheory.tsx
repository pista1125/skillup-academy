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
  Brain,
  ShieldAlert,
  Search
} from 'lucide-react';
import {
  RootDomainAndConditionsSvg,
  RootIdentitiesApplicationSvg,
  RootUnderRootSvg,
  RootEquationTrapSvg
} from './RootPracticeFigures';

interface RootPracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RootPracticeTheory: React.FC<RootPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Laboratórium állapota
  const [labTab, setLabTab] = useState<'domain' | 'identity'>('domain');

  // Kikötés labor: √(a·x + b) ≥ 0
  const [domA, setDomA] = useState<number>(2);
  const [domB, setDomB] = useState<number>(-6);

  // Nevezetes azonosság labor: (u√a + v√b)²
  const [idU, setIdU] = useState<number>(1);
  const [idA, setIdA] = useState<number>(3);
  const [idSign, setIdSign] = useState<'+' | '-'>('+');
  const [idV, setIdV] = useState<number>(1);
  const [idB, setIdB] = useState<number>(2);

  // Kikötés számítás: a·x + b ≥ 0 ⇒ x ≥ -b/a (ha a > 0)
  const rootBound = domA !== 0 ? (-domB / domA) : 0;
  const isBoundInteger = Number.isInteger(rootBound);

  // Nevezetes azonosság számítás: (u√a ± v√b)² = u²a ± 2uv√(ab) + v²b = (u²a + v²b) ± 2uv√(ab)
  const firstTerm = idU * idU * idA;
  const thirdTerm = idV * idV * idB;
  const constantSum = firstTerm + thirdTerm;
  const middleCoeff = 2 * idU * idV;
  const insideRoot = idA * idB;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="7. Gyakorlás"
      subtitle="Kikötések és értelmezési tartomány, nevezetes azonosságok alkalmazása, teljes négyzetek a gyök alatt és bevezetés a gyökös egyenletekbe"
      themeColor="violet"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-violet-600 dark:text-violet-400 font-black">Kikötés (ÉT):</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√(f(x)) ⇒ f(x) ≥ 0</MathText> &nbsp;|&nbsp; <MathText>1 / √(g(x)) ⇒ g(x) &gt; 0</MathText> (nevezőben nem lehet 0!)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Nevezetes négyzet:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>(√a ± √b)² = a ± 2√(ab) + b</MathText> &nbsp;(vigyázat: a vegyes tag kötelező!)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Négyzetkülönbség:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>(√a + √b)(√a - √b) = (√a)² - (√b)² = a - b</MathText> &nbsp;(kiesnek a gyökök!)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">Gyökös egyenlet:</span>
              <span className="text-slate-800 dark:text-slate-100">A négyzetre emelés hamis gyököket hozhat létre ⇒ az ELLENŐRZÉS KÖTELEZŐ!</span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: ÉRTELMEZÉSI TARTOMÁNY ÉS KIKÖTÉSEK */}
      <TheorySection
        number={1}
        title="Értelmezési tartomány (kikötések) meghatározása"
        icon={<ShieldAlert className="w-5 h-5 text-violet-500" />}
        badge="KULCSFONTOSSÁGÚ"
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              Bármilyen gyökös feladat (kifejezés egyszerűsítése, egyenlet vagy függvény) megoldásának legelső lépése az <strong>értelmezési tartomány (kikötések)</strong> felírása. Ha egy kifejezésnek nincs értelme a valós számok körében, semmilyen algebrai átalakítás nem végezhető el rajta.
            </p>
            <p>
              A négyzetgyöknél két alapvető matematikai korlátot kell figyelembe vennünk:
            </p>
            <div className="p-3.5 bg-violet-50 dark:bg-violet-950/40 rounded-xl border-l-4 border-violet-500 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>1. A gyökjel alatti kifejezés nemnegatív:</strong><br />
                <MathText>√(f(x))</MathText> esetén: <span className="text-violet-700 dark:text-violet-300 font-bold"><MathText>f(x) ≥ 0</MathText></span>
              </p>
              <p>
                <strong>2. A tört nevezője nem lehet nulla:</strong><br />
                Ha a gyök a nevezőben áll (<MathText>1 / √(g(x))</MathText>), akkor nemcsak nemnegatív, hanem szigorúan pozitív kell legyen: <span className="text-rose-600 dark:text-rose-400 font-bold"><MathText>g(x) &gt; 0</MathText></span>!
              </p>
            </div>
            <p>
              <strong>Gyakori dolgozatbeli csapda:</strong> Az egyenlőségjelet sokan automatikusan kiteszik a nevezőben lévő gyöknél is. Ha a nevező 0 lenne, a nullával való osztás miatt a tört értelmetlenné válik!
            </p>
          </div>
          <div className="lg:col-span-6">
            <RootDomainAndConditionsSvg />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <TheoryCard
            title="Lineáris kifejezés a gyök alatt"
            badge="1. TÍPUS"
            badgeColor="violet"
            icon={<Search className="w-4 h-4 text-violet-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-1.5">
              <strong><MathText>√(3x - 12)</MathText>:</strong><br />
              <MathText>3x - 12 ≥ 0</MathText><br />
              <MathText>3x ≥ 12 ⇒ x ≥ 4</MathText><br />
              ÉT: <MathText>x ∈ [4; ∞[</MathText>
            </p>
          </TheoryCard>

          <TheoryCard
            title="Negatív x-együttható"
            badge="ELŐJELCSAPDA"
            badgeColor="amber"
            icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-1.5">
              <strong><MathText>√(10 - 2x)</MathText>:</strong><br />
              <MathText>10 - 2x ≥ 0</MathText><br />
              <MathText>10 ≥ 2x ⇒ x ≤ 5</MathText><br />
              ÉT: <MathText>x ∈ ]-∞; 5]</MathText>
            </p>
          </TheoryCard>

          <TheoryCard
            title="Gyök a nevezőben"
            badge="SZIGORÚAN > 0"
            badgeColor="rose"
            icon={<ShieldAlert className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-1.5">
              <strong><MathText>3 / √(x - 7)</MathText>:</strong><br />
              <MathText>x - 7 &gt; 0</MathText> (nem lehet 0!)<br />
              ⇒ <strong><MathText>x &gt; 7</MathText></strong><br />
              ÉT: <MathText>x ∈ ]7; ∞[</MathText>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: NEVEZETES AZONOSSÁGOK GYÖKÖKKEL */}
      <TheorySection
        number={2}
        title="Nevezetes azonosságok alkalmazása gyökös számokkal"
        icon={<Sparkles className="w-5 h-5 text-blue-500" />}
        badge="ALGEBRAI GYAKORLAT"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A 9. osztályban tanult nevezetes azonosságok a gyökös kifejezések átalakításának legerősebb eszközei. Amikor gyökös tagokat emelünk négyzetre vagy szorzunk össze, a négyzetre emelés "feloldja" az egyes gyököket, míg a vegyes szorzatok vagy megmaradnak, vagy kiejtik egymást.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs sm:text-sm">
                <p className="font-bold text-blue-800 dark:text-blue-300">1. Kéttagú összeg és különbség négyzete:</p>
                <p className="text-slate-800 dark:text-slate-100"><MathText>(√a + √b)² = (√a)² + 2√a√b + (√b)² = a + 2√(ab) + b</MathText></p>
                <p className="text-slate-800 dark:text-slate-100"><MathText>(√a - √b)² = (√a)² - 2√a√b + (√b)² = a - 2√(ab) + b</MathText></p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm">
                <p className="font-bold text-emerald-800 dark:text-emerald-300">2. Négyzetek különbsége (konjugált szorzat):</p>
                <p className="text-slate-800 dark:text-slate-100"><MathText>(√a + √b)(√a - √b) = (√a)² - (√b)² = a - b</MathText></p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Figyeld meg: a négyzetek különbségénél az eredmény mindig <strong>racionális szám</strong>, mivel a kereszt-szorzatok (+√ab és -√ab) pontosan kioltják egymást!
            </p>
          </div>
          <div className="lg:col-span-6">
            <RootIdentitiesApplicationSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TELJES NÉGYZET A GYÖK ALATT */}
      <TheorySection
        number={3}
        title="Gyök alatti teljes négyzetek felismerése (Emeletes gyökök)"
        icon={<Brain className="w-5 h-5 text-amber-500" />}
        badge="MESTERFOGÁS"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              Gyakori verseny- és érettségi feladattípus az olyan "emeletes" gyökös kifejezés, amelyben a külső négyzetgyök alatt egy gyökös összeg áll: például <strong><MathText>√(7 + 4√3)</MathText></strong> vagy <strong><MathText>√(6 - 2√5)</MathText></strong>.
            </p>
            <p>
              A feladat kulcsa a <strong>visszafelé gondolkodás</strong>: felismerni, hogy a gyök alatti kifejezés egy kéttagú összeg négyzete: <MathText>(u ± v)² = u² ± 2uv + v²</MathText>.
            </p>
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border-l-4 border-amber-500 text-xs sm:text-sm space-y-1.5">
              <p className="font-bold text-amber-900 dark:text-amber-200">A megoldás lépései <MathText>√(7 + 4√3)</MathText> esetén:</p>
              <p>1. A gyökös tag a vegyes szorzat: <MathText>2uv = 4√3 ⟹ uv = 2√3</MathText></p>
              <p>2. Két tényezőre bontjuk: legyen <MathText>u = 2</MathText> és <MathText>v = √3</MathText></p>
              <p>3. Ellenőrizzük az <MathText>u² + v²</MathText> összeget: <MathText>2² + (√3)² = 4 + 3 = 7</MathText>! (Pontosan stimmel!)</p>
              <p>4. Így: <MathText>√(7 + 4√3) = √((2 + √3)²) = |2 + √3| = 2 + √3</MathText></p>
            </div>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">
              Kivonásnál ügyelj az abszolútértékre: <MathText>√(6 - 2√5) = √((√5 - 1)²) = |√5 - 1| = √5 - 1</MathText> (mivel <MathText>√5 &gt; 1</MathText>, nem lehet <MathText>1 - √5</MathText>)!
            </p>
          </div>
          <div className="lg:col-span-6">
            <RootUnderRootSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: GYÖKÖS EGYENLETEK BEVEZETÉSE ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Bevezetés a gyökös egyenletekbe és a kötelező ellenőrzés"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="CSAPDAVESZÉLY"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              Gyökös egyenletnek nevezzük az olyan egyenleteket, amelyekben az ismeretlen legalább egyszer a gyökjel alatt szerepel.
            </p>
            <p>
              A gyök eltüntetésének legkézenfekvőbb eszköze mindkét oldal négyzetre emelése. Azonban a <strong>négyzetre emelés NEM ekvivalens átalakítás</strong>!
            </p>
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border-l-4 border-rose-500 text-xs sm:text-sm space-y-2">
              <p className="font-bold text-rose-800 dark:text-rose-300">Miért nem ekvivalens?</p>
              <p>Ha <MathText>a = b</MathText>, akkor persze <MathText>a² = b²</MathText> is igaz. De visszafelé: ha <MathText>a² = b²</MathText>, abból csak az következik, hogy <MathText>a = ±b</MathText>! Tehát az ellentett előjelű számok négyzete is azonos.</p>
              <p className="text-slate-700 dark:text-slate-300">
                Példa: <MathText>√x = -4</MathText>. Négyzetre emelve: <MathText>x = 16</MathText>. De visszahelyettesítve: <MathText>√16 = 4 ≠ -4</MathText>! Tehát az <MathText>x = 16</MathText> <strong>hamis gyök</strong>, az egyenletnek nincs valós megoldása!
              </p>
            </div>
            <p>
              Ezért gyökös egyenleteknél az <strong>eredeti egyenletbe történő visszahelyettesítéses ellenőrzés nem formai formalitás, hanem a megoldás elválaszthatatlan, kötelező lépése</strong>!
            </p>
          </div>
          <div className="lg:col-span-6">
            <RootEquationTrapSvg />
          </div>
        </div>
      </TheorySection>

      {/* 5. INTERAKTÍV LABORATÓRIUM */}
      <TheorySection
        number={5}
        title="Interaktív Laboratórium: Kikötések és Nevezetes azonosságok"
        icon={<Calculator className="w-5 h-5 text-violet-500" />}
        badge="INTERAKTÍV"
        badgeColor="violet"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            <button
              onClick={() => setLabTab('domain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labTab === 'domain'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
              }`}
            >
              1. Kikötés-kalkulátor és számegyenes
            </button>
            <button
              onClick={() => setLabTab('identity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                labTab === 'identity'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
              }`}
            >
              2. Nevezetes azonosság kibontó
            </button>
          </div>

          {labTab === 'domain' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    x együtthatója (a): {domA}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, -1, -2, -3].map((val) => (
                      <button
                        key={val}
                        onClick={() => setDomA(val)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                          domA === val
                            ? 'bg-violet-600 text-white border-violet-700'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Konstans tag (b): {domB}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[-12, -8, -6, -4, 0, 4, 6, 8, 12].map((val) => (
                      <button
                        key={val}
                        onClick={() => setDomB(val)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                          domB === val
                            ? 'bg-teal-600 text-white border-teal-700'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kikötés levezetése */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-2">
                <div className="text-xs text-slate-500 font-bold">Kifejezés:</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center">
                  <MathText>{`√(${domA}x ${domB >= 0 ? `+ ${domB}` : `- ${Math.abs(domB)}`})`}</MathText>
                </div>
                <div className="text-xs text-violet-600 dark:text-violet-400 font-bold flex items-center justify-center">
                  <MathText>{`Feltétel: ${domA}x ${domB >= 0 ? `+ ${domB}` : `- ${Math.abs(domB)}`} ≥ 0`}</MathText>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 font-bold">
                  <MathText>{`${domA}x ≥ ${-domB}`}</MathText>
                  {domA < 0 && <span className="text-xs text-rose-500 font-normal">(negatív számmal osztva a relációs jel megfordul!)</span>}
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center flex-wrap gap-1">
                  <span>Értelmezési tartomány:</span>
                  {domA > 0 ? (
                    <MathText>{`x ≥ ${isBoundInteger ? rootBound : rootBound.toFixed(2)}  (x ∈ [${isBoundInteger ? rootBound : rootBound.toFixed(2)}; ∞[)`}</MathText>
                  ) : (
                    <MathText>{`x ≤ ${isBoundInteger ? rootBound : rootBound.toFixed(2)}  (x ∈ ]-∞; ${isBoundInteger ? rootBound : rootBound.toFixed(2)}])`}</MathText>
                  )}
                </div>
              </div>
            </div>
          )}

          {labTab === 'identity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Tag */}
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <span>1. tag gyöke (√a):</span>
                    <MathText>{`√${idA}`}</MathText>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[2, 3, 5, 7].map((num) => (
                      <button
                        key={num}
                        onClick={() => setIdA(num)}
                        className={`px-2 py-1 rounded text-xs font-bold border transition-all ${
                          idA === num ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700'
                        }`}
                      >
                        <MathText>{`√${num}`}</MathText>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Előjel */}
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                  <div className="text-xs font-bold text-slate-500 mb-2">Művelet</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIdSign('+')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${
                        idSign === '+' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                    >
                      + (Összeg)
                    </button>
                    <button
                      onClick={() => setIdSign('-')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${
                        idSign === '-' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                    >
                      - (Különbség)
                    </button>
                  </div>
                </div>

                {/* 2. Tag */}
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <span>2. tag gyöke (√b):</span>
                    {idB === 1 ? '1' : <MathText>{`√${idB}`}</MathText>}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setIdB(num)}
                        className={`px-2 py-1 rounded text-xs font-bold border transition-all ${
                          idB === num ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700'
                        }`}
                      >
                        {num === 1 ? '1' : <MathText>{`√${num}`}</MathText>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kibontás lépései */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800 text-center space-y-2">
                <div className="text-xs text-slate-500 font-bold">Kifejezés négyzete:</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center">
                  <MathText>{`(√${idA} ${idSign} ${idB === 1 ? '1' : `√${idB}`})²`}</MathText>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center">
                  <MathText>{`= (√${idA})² ${idSign} 2 · √${idA} · ${idB === 1 ? '1' : `√${idB}`} + (${idB === 1 ? '1' : `√${idB}`})²`}</MathText>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center">
                  <MathText>{`= ${idA} ${idSign} ${insideRoot === 1 ? '2' : `2√${insideRoot}`} + ${idB}`}</MathText>
                </div>
                <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center flex-wrap gap-1.5">
                  <span>Összevont végeredmény:</span>
                  <MathText>{`${constantSum} ${idSign} ${insideRoot === 1 ? '2' : `2√${insideRoot}`}`}</MathText>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RootPracticeTheory;
