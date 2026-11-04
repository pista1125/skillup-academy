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
  AxialReflectionBasicsSvg,
  CoordinateAxialSvg,
  SymmetryAxesShapesSvg
} from './AxialFigures';
import {
  FlipHorizontal,
  Compass,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCw,
  Maximize2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AxialTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const AxialTheory: React.FC<AxialTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV TÜKRÖZÉSI LABOR ÁLLAPOTOK ---
  const [axisType, setAxisType] = useState<'yAxis' | 'xAxis' | 'diag'>('yAxis');
  const [px, setPx] = useState<number>(3);
  const [py, setPy] = useState<number>(2);

  // Számított tükörkép koordinátái
  const reflectedP = useMemo(() => {
    if (axisType === 'yAxis') {
      return { rx: -px, ry: py, label: 'y-tengely (x = 0)' };
    } else if (axisType === 'xAxis') {
      return { rx: px, ry: -py, label: 'x-tengely (y = 0)' };
    } else {
      return { rx: py, ry: px, label: 'y = x egyenes' };
    }
  }, [axisType, px, py]);

  return (
    <TheoryTemplate
      title="3. Tengelyes tükrözés"
      subtitle="A síkbeli tengelyes tükrözés geometriai definíciója, a körüljárási irány megfordulása, koordináta-szabályok és szimmetriatengelyek 9. osztályban"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 3. TENGELYES TÜKRÖZÉS"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a tengelyes tükrözés feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Tengelyes tükrözés geometriája",
        formula: "t ⊥ PP' és felezi PP'-t • |A'B'| = |AB| • Körüljárási irány megfordul!",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: A TENGELYES TÜKRÖZÉS FOGALMA ÉS ALAPTULAJDONSÁGAI
      ========================================================================= */}
      <TheorySection
        title="1. A tengelyes tükrözés fogalma és alaptulajdonságai"
        icon={<FlipHorizontal className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Pont tükrözése egyenesre és a merőleges felezés elve"
          icon={<Compass className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Legyen a síkon rögzítve egy <strong>t egyenes</strong>, amelyet <strong>tükörtengelynek</strong> nevezünk. A sík bármely P pontjához a P' képpontot az alábbi egyértelmű szabály szerint rendeljük hozzá:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <AxialReflectionBasicsSvg size={300} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200">1. Ha a pont a tengelyen van (P ∈ t):</span>
                <p className="mt-1">
                  A pont képe önmaga: P' = P. A tükörtengely minden pontja <strong>fixpont</strong>!
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-900 dark:text-blue-200">2. Ha a pont nincs a tengelyen (P ∉ t):</span>
                <p className="mt-1">
                  A képpont az a P' pont, amelyre a t egyenes a PP' szakasz <strong>felezőmerőlegese</strong> (t ⊥ PP' és t felezi a PP'-t).
                </p>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900">
                <span className="font-bold text-rose-900 dark:text-rose-200">3. Körüljárási irány megfordul:</span>
                <p className="mt-1">
                  Ha az ABC háromszög csúcsait pozitív (óramutatóval ellentétes) irányban járjuk körül, az A'B'C' tükörkép csúcsai negatív (óramutatóval megegyező) sorrendűvé válnak!
                </p>
              </div>
            </div>
          </div>

          <TheoryCallout
            title="A tengelyes tükrözés matematikai tulajdonságai"
            variant="info"
            icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
          >
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mt-1">
              <li><strong>Távolságtartó:</strong> Bármely két pont távolsága megegyezik képeik távolságával (|A'B'| = |AB|). Ezért <em>egybevágósági transzformáció</em>.</li>
              <li><strong>Szögtartó és aránytartó:</strong> Szögek nagysága változatlan marad (∠A'B'C' = ∠ABC).</li>
              <li><strong>Egyenestartó:</strong> Egyenes képe mindig egyenes.</li>
              <li><strong>Párhuzamos egyenesek:</strong> Ha e || t, akkor e' || t és d(e, t) = d(e', t).</li>
              <li><strong>Metsző egyenesek:</strong> Ha az e egyenes metszi a t tengelyt egy M pontban, akkor e' is átmegy M-en, és ugyanakkora szöget zár be t-vel.</li>
              <li><strong>Fixegyenesek:</strong> Maga a t tengely (pontonként fix), valamint <em>minden t-re merőleges egyenes</em> (önmagába megy át, n' = n).</li>
              <li><strong>Öninverz:</strong> Kétszer egymás után ugyanarra a tengelyre tükrözve minden pont visszakerül a helyére (identitás).</li>
            </ul>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: KOORDINÁTA-GEOMETRIAI SZABÁLYOK
      ========================================================================= */}
      <TheorySection
        title="2. Tengelyes tükrözés a derékszögű koordináta-rendszerben"
        icon={<Maximize2 className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Tükrözés az x-tengelyre, y-tengelyre és az y = x egyenesre"
          icon={<Maximize2 className="w-5 h-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-2">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <CoordinateAxialSvg size={300} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">1. Tükrözés az x-tengelyre:</span>
                <p className="mt-1">
                  Az x koordináta változatlan marad, az y az ellentettjére vált:
                </p>
                <div className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-center text-sm mt-1">
                  (x; y) ↦ (x; −y)
                </div>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900">
                <span className="font-bold text-purple-900 dark:text-purple-200">2. Tükrözés az y-tengelyre:</span>
                <p className="mt-1">
                  Az y koordináta változatlan, az x az ellentettjére vált:
                </p>
                <div className="font-mono font-bold text-purple-800 dark:text-purple-300 text-center text-sm mt-1">
                  (x; y) ↦ (−x; y)
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200">3. Tükrözés az y = x egyenesre:</span>
                <p className="mt-1">
                  A koordináták egyszerűen helyet cserélnek:
                </p>
                <div className="font-mono font-bold text-amber-800 dark:text-amber-300 text-center text-sm mt-1">
                  (x; y) ↦ (y; x)
                </div>
              </div>
            </div>
          </div>

          <TheoryTable
            headers={['Tükörtengely egyenlete', 'Koordináta-szabály', 'Példa: P(4; −3) képe']}
            rows={[
              ['x-tengely (y = 0)', '(x; y) ↦ (x; −y)', 'P\'(4; 3)'],
              ['y-tengely (x = 0)', '(x; y) ↦ (−x; y)', 'P\'(−4; −3)'],
              ['I. és III. síknegyed felezője (y = x)', '(x; y) ↦ (y; x)', 'P\'(−3; 4)'],
              ['II. és IV. síknegyed felezője (y = −x)', '(x; y) ↦ (−y; −x)', 'P\'(3; −4)']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: TENGELYESEN SZIMMETRIKUS ALAKZATOK
      ========================================================================= */}
      <TheorySection
        title="3. Tengelyesen szimmetrikus síkidomok és tengelyeik száma"
        icon={<Sparkles className="w-6 h-6 text-purple-600" />}
      >
        <TheoryCard
          title="Hány szimmetriatengellyel rendelkeznek a nevezetes sokszögek?"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy alakzat <strong>tengelyesen szimmetrikus</strong>, ha létezik olyan t egyenes a síkban, amelyre tükrözve az alakzat <em>önmagába megy át</em>.
          </p>

          <div className="flex justify-center my-4">
            <SymmetryAxesShapesSvg size={440} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 space-y-1.5">
              <span className="font-bold text-blue-900 dark:text-blue-200 block text-sm">1 szimmetriatengely:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>Egyenlő szárú háromszög:</strong> az alap felezőmerőlegese.</li>
                <li><strong>Húrtrapéz:</strong> a párhuzamos alapok közös felezőmerőlegese.</li>
                <li><strong>Deltoid:</strong> a szimmetriaátlója.</li>
                <li><strong>Szög:</strong> a szögfelező egyenese.</li>
              </ul>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 space-y-1.5">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 block text-sm">2 szimmetriatengely:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>Téglalap:</strong> a szemközti oldalak 2 oldalfelező merőlegese (átlói NEM tengelyek!).</li>
                <li><strong>Rombusz:</strong> a 2 átlója (oldalfelezői NEM tengelyek!).</li>
                <li><strong>Szakasz:</strong> a felezőmerőleges és maga a hordozó egyenes.</li>
              </ul>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-1.5">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block text-sm">3, 4 vagy több tengely:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>Szabályos 3-szög:</strong> 3 tengely.</li>
                <li><strong>Négyzet:</strong> 4 tengely (2 oldalfelező + 2 átló).</li>
                <li><strong>Szabályos n-szög:</strong> pontosan n tengely.</li>
                <li><strong>Kör:</strong> végtelen sok tengely (minden átmérője).</li>
              </ul>
            </div>
          </div>

          <TheoryCallout
            title="Két tengelyes tükrözés kompozíciójának alaptételei"
            variant="info"
            icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mt-1">
              <div>
                <strong>1. Párhuzamos tengelyek (t₁ || t₂):</strong> Két párhuzamos tengelyre vett egymást követő tükrözés egy <strong>ELTOLÁST</strong> eredményez, melynek iránya a tengelyekre merőleges, nagysága pedig a két tengely távolságának kétszerese (2d).
              </div>
              <div>
                <strong>2. Metsző tengelyek (t₁ ∩ t₂ = M, α hajlásszög):</strong> Két metsző tengelyre vett egymásutáni tükrözés egy <strong>FORGATÁST</strong> eredményez az M pont körül, <strong>2α</strong> szöggel!
              </div>
            </div>
          </TheoryCallout>
        </TheoryCard>

        {/* CSAPDÁK ÉS TÉVHITEK */}
        <TheoryTrapBox
          title="Típushibák és érettségi buktatók a tengelyes tükrözésnél"
          traps={[
            {
              trap: "A téglalap átlói szimmetriatengelyek, mert felezik a területét.",
              correction: "NEM! Bár az átló felezi a területet, ha az átlóra tükrözzük a téglalapot, a csúcsok kibillennek az eredeti alakzatból! A téglalapnak CSAK az oldalfelező merőlegesei szimmetriatengelyek (kivéve a négyzetet, amelynek az átlói is azok)."
            },
            {
              trap: "A paralelogramma tengelyesen szimmetrikus alakzat.",
              correction: "NEM! Egy általános paralelogrammának 0 szimmetriatengelye van! Csak középpontosan szimmetrikus (az átlók metszéspontjára nézve)."
            },
            {
              trap: "A tengelyes tükrözés nem fordítja meg a körüljárási irányt, mert az oldalak hossza azonos.",
              correction: "Bár a szakaszok hossza egyenlő (egybevágó), a síkban a körüljárási irány ELLENTÉTESRE változik! Ez az egyetlen alapvető egybevágóság, amely megfordítja a sík orientációját."
            },
            {
              trap: "A rombusz oldalfelező merőlegesei szimmetriatengelyek.",
              correction: "NEM! A rombusz szimmetriatengelyei az ÁTLÓI, az oldalfelezőkre tükrözve nem menne át önmagába (kivéve a négyzetnél)."
            }
          ]}
        />
      </TheorySection>

      {/* =========================================================================
          4. RÉSZ: INTERAKTÍV LABOR: TENGELYES TÜKRÖZÉS SZIMULÁTOR
      ========================================================================= */}
      <TheorySection
        title="4. Interaktív Labor: Tengelyes Tükrözés és Szimmetria Szimulátor"
        icon={<Sliders className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Kísérletezz a koordinátákkal és figyeld a képpont mozgását!"
          icon={<Compass className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Válassz tükörtengelyt, állítsd be a P pont koordinátáit, és figyeld meg, hogyan változnak a tükörkép koordinátái az előjeles szabályok szerint!
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            {/* Tengelyválasztó gombok */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Tükörtengely:</span>
              <Button
                variant={axisType === 'yAxis' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAxisType('yAxis')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                y-tengely (x = 0)
              </Button>
              <Button
                variant={axisType === 'xAxis' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAxisType('xAxis')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                x-tengely (y = 0)
              </Button>
              <Button
                variant={axisType === 'diag' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAxisType('diag')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Főtengely (y = x)
              </Button>
            </div>

            {/* Koordináta csúszkák */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-200">
                  <span>P kezdőpont X koordinátája</span>
                  <span className="font-mono text-base">{px}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={px}
                  onChange={(e) => setPx(Number(e.target.value))}
                  className="w-full h-1.5 bg-blue-200 rounded accent-blue-600"
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200">
                  <span>P kezdőpont Y koordinátája</span>
                  <span className="font-mono text-base">{py}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={py}
                  onChange={(e) => setPy(Number(e.target.value))}
                  className="w-full h-1.5 bg-emerald-200 rounded accent-emerald-600"
                />
              </div>
            </div>

            {/* Számított eredmény és vizuális visszajelzés */}
            <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Kezdőpont és Képpont:
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">
                  P({px}; {py}) ↦ <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">P'({reflectedP.rx}; {reflectedP.ry})</span>
                </div>
                <div className="text-xs text-slate-500">
                  Tükörtengely: <span className="font-bold">{reflectedP.label}</span>
                </div>
              </div>

              <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 font-mono">
                {axisType === 'yAxis' && `( ${px}; ${py} ) ↦ ( −(${px}); ${py} ) = (${reflectedP.rx}; ${reflectedP.ry})`}
                {axisType === 'xAxis' && `( ${px}; ${py} ) ↦ ( ${px}; −(${py}) ) = (${reflectedP.rx}; ${reflectedP.ry})`}
                {axisType === 'diag' && `( ${px}; ${py} ) ↦ ( ${py}; ${px} ) = (${reflectedP.rx}; ${reflectedP.ry})`}
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

