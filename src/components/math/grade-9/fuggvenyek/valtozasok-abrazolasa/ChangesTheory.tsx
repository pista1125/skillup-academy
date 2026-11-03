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
  CoordinateSystemSvg,
  ProcessGraphSvg,
  RateOfChangeSvg
} from './ChangesFigures';
import {
  Activity,
  Sliders,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  ArrowRight,
  Hash,
  Clock
} from 'lucide-react';

interface ChangesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ChangesTheory: React.FC<ChangesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV VÁLTOZÁSI SEBESSÉG LABOR ÁLLAPOTOK ---
  const [t1, setT1] = useState<number>(1);
  const [y1, setY1] = useState<number>(20);
  const [t2, setT2] = useState<number>(5);
  const [y2, setY2] = useState<number>(80);

  const stats = useMemo(() => {
    const dt = t2 - t1;
    const dy = y2 - y1;
    const rate = dt !== 0 ? (dy / dt).toFixed(2) : '0';

    let behavior = '';
    let behaviorColor = '';

    if (dy > 0) {
      behavior = 'Növekvő folyamat (pozitív változás)';
      behaviorColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    } else if (dy < 0) {
      behavior = 'Csökkenő folyamat (negatív változás)';
      behaviorColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200';
    } else {
      behavior = 'Állandó / Stagnáló folyamat (nincs változás)';
      behaviorColor = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200';
    }

    return {
      dt,
      dy,
      rate,
      behavior,
      behaviorColor
    };
  }, [t1, y1, t2, y2]);

  return (
    <TheoryTemplate
      title="3. Változások ábrázolása"
      subtitle="Folyamatok modellezése a derékszögű koordináta-rendszerben, grafikonok szakaszai és az átlagos változási sebesség"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 3. VÁLTOZÁSOK ÁBRÁZOLÁSA"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a változások feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Átlagos változási sebesség képlete",
        formula: "v_átl = Δy / Δt = (y₂ - y₁) / (t₂ - t₁)",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: A DERÉKSZÖGŰ KOORDINÁTA-RENDSZER
      ========================================================================= */}
      <TheorySection
        title="1. A Descartes-féle koordináta-rendszer"
        icon={<Compass className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Tengelyek, pontok megadása és a négy síknegyed"
          icon={<Compass className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A síkbeli pontok helyzetét két egymásra merőleges számegyenessel határozzuk meg. A vízszintes tengely az <strong>$x$-tengely (abszcissza)</strong>, a függőleges tengely az <strong>$y$-tengely (ordináta)</strong>. Metszéspontjuk az <strong>origó: $O(0; 0)$</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <CoordinateSystemSvg size={260} />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-800 dark:text-blue-300">I. Síknegyed (+; +):</span> $x &gt; 0$ és $y &gt; 0$ (jobb felső).
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">II. Síknegyed (-; +):</span> $x &lt; 0$ és $y &gt; 0$ (bal felső).
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-800 dark:text-amber-300">III. Síknegyed (-; -):</span> $x &lt; 0$ és $y &lt; 0$ (bal alsó).
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900">
                <span className="font-bold text-purple-800 dark:text-purple-300">IV. Síknegyed (+; -):</span> $x &gt; 0$ és $y &lt; 0$ (jobb alsó).
              </div>
            </div>
          </div>

          <TheoryCallout
            title="Sorrend szabály"
            variant="warning"
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          >
            A koordinátapárban a sorrend KÖTÖTT: mindig az <strong>$x$-koordináta áll elöl</strong>, és az <strong>$y$-koordináta hátul</strong>: $P(x; y)$. A $P(2; 5)$ és a $Q(5; 2)$ két teljesen különböző pont a síkban!
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: FOLYAMATOK ÉS SZAKASZOK
      ========================================================================= */}
      <TheorySection
        title="2. Folyamatok szakaszai és grafikus olvasás"
        icon={<Activity className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard
          title="Növekedés, állandóság, csökkenés és szélsőértékek"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Amikor egy folyamat lefolyását vizsgáljuk az idő függvényében, a vízszintes tengelyre mindig az időt ($t$), a függőleges tengelyre pedig a vizsgált mennyiséget (pl. magasság, hőmérséklet, sebesség, megtett út) helyezzük.
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <ProcessGraphSvg size={300} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs my-4">
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                <TrendingUp className="w-4 h-4" /> Növekvő szakasz
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Balról jobbra haladva a görbe emelkedik. Ahogy múlik az idő, a mennyiség egyre nagyobb lesz ($\Delta y &gt; 0$).
              </p>
            </div>
            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300 mb-1">
                <Minus className="w-4 h-4" /> Vízszintes szakasz
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                A mennyiség nem változik, állandó marad ($\Delta y = 0$). Például pihenő egy túrán, álló jármű.
              </p>
            </div>
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300 mb-1">
                <TrendingDown className="w-4 h-4" /> Csökkenő szakasz
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Balról jobbra haladva a görbe lefelé tart. Ahogy múlik az idő, a mennyiség fogyatkozik ($\Delta y &lt; 0$).
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: ÁTLAGOS VÁLTOZÁSI SEBESSÉG
      ========================================================================= */}
      <TheorySection
        title="3. Átlagos változási sebesség és meredekség"
        icon={<Clock className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Mennyire gyorsan változik az érték az idő múlásával?"
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az átlagos változási sebesség megmutatja, hogy egységnyi idő alatt átlagosan mekkora a mennyiség megváltozása. Geometriailag ez a két pontot összekötő szakasz <strong>meredekségének ($m$)</strong> felel meg:
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <RateOfChangeSvg size={280} />
          </div>

          {/* =========================================================================
              INTERAKTÍV VÁLTOZÁSI SEBESSÉG LABOR
          ========================================================================= */}
          <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Interaktív Változási Sebesség Laboratórium
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Állítsd be a kezdőpont ($t_1; y_1$) és végpont ($t_2; y_2$) értékeit, és figyeld meg az átlagos sebesség alakulását!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Kezdőpont: t₁ = {t1} s, y₁ = {y1} m</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={t1}
                      onChange={(e) => setT1(Math.min(t2 - 1, parseInt(e.target.value)))}
                      className="w-1/2 accent-blue-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={y1}
                      onChange={(e) => setY1(parseInt(e.target.value))}
                      className="w-1/2 accent-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Végpont: t₂ = {t2} s, y₂ = {y2} m</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min={t1 + 1}
                      max="15"
                      value={t2}
                      onChange={(e) => setT2(Math.max(t1 + 1, parseInt(e.target.value)))}
                      className="w-1/2 accent-blue-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={y2}
                      onChange={(e) => setY2(parseInt(e.target.value))}
                      className="w-1/2 accent-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* Eredmény kártya */}
              <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Időtartam (Δt):</span>
                  <span className="font-mono font-bold">{stats.dt} másodperc</span>
                </div>
                <div className="flex justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Mennyiség változása (Δy):</span>
                  <span className="font-mono font-bold">{stats.dy} méter</span>
                </div>
                <div className="flex justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Átlagos változási sebesség:</span>
                  <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {stats.rate} m/s
                  </span>
                </div>
                <div className={`p-2 rounded-lg text-xs font-bold border text-center mt-2 ${stats.behaviorColor}`}>
                  {stats.behavior}
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák a folyamatok és koordináták ábrázolásakor"
        traps={[
          {
            wrong: 'Az x és y koordináták felcserélése (pl. P(2; 5) pontot az x=5, y=2 helyre rajzoljuk).',
            correct: 'Az első szám mindig az x (vízszintes jobbra-balra), a második az y (függőleges fel-le).',
            explanation: 'Gondolj a házszámra és emeletre: először odalépsz a házhoz (x), aztán felmész az emeletre (y).'
          },
          {
            wrong: 'Út-idő grafikonon a vízszintes szakaszt úgy értelmezzük, hogy „a jármű egyenes úton halad”.',
            correct: 'Út-idő grafikonon a vízszintes szakasz azt jelenti, hogy a megtett út NEM nő: a jármű ÁLL (sebessége 0)!',
            explanation: 'A grafikon nem a földrajzi útvonal térképe, hanem a fizikai mennyiségek időbeli függvénye.'
          },
          {
            wrong: 'Átlagsebesség számításakor a sebességek egyszerű számtani közepét vesszük két különböző idejű szakaszon.',
            correct: 'Az átlagsebesség mindig a TELJES megtett út osztva a TELJES eltelt idővel: v = s_összes / t_összes.',
            explanation: 'Az egyszerű átlag csak akkor egyezne meg, ha mindkét sebességgel pontosan ugyanannyi ideig haladtunk volna.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Szakasztípusok és Meredekség Gyors Áttekintője"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Görbe jellege', 'Meredekség (m)', 'Mennyiség változása (Δy)', 'Gyakorlati jelentés']}
          rows={[
            ['Erősen emelkedő', 'm > 0 (nagy)', 'Δy > 0 (gyors növekedés)', 'Intenzív gyorsulás, hirtelen áremelkedés'],
            ['Lassan emelkedő', 'm > 0 (kicsi)', 'Δy > 0 (lassú növekedés)', 'Fokozatos melegedés, gyaloglás'],
            ['Vízszintes (lapos)', 'm = 0', 'Δy = 0 (nincs változás)', 'Álló jármű, pihenőidő, változatlan árszint'],
            ['Süllyedő (lejtő)', 'm < 0', 'Δy < 0 (csökkenés)', 'Fékezés, kihűlés, folyadékszint fogyása'],
            ['Függőleges ugrás', 'Nem értelmezett', 'Egy időpillanatban több érték', 'Fizikailag nem lehetséges egyetlen testnél']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};

