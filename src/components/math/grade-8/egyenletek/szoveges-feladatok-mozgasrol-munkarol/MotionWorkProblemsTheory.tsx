import React, { useState, useEffect, useRef } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Timer,
  Car,
  Gauge,
  Clock,
  Waves,
  Hammer,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  RotateCcw,
  Zap,
  ArrowRightLeft,
  Ship,
  Bike,
  Play,
  Pause,
  Droplets
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface MotionWorkProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const MotionWorkProblemsTheory: React.FC<MotionWorkProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Labor Állapotok ---
  const [activeTab, setActiveTab] = useState<'motion' | 'work'>('motion');

  // TAB 1: Mozgás Labor (Találkozás / Utolérés)
  const [motionType, setMotionType] = useState<'meet' | 'catch'>('meet');
  const [v1, setV1] = useState<number>(60); // km/h (1. jármű / autó)
  const [v2, setV2] = useState<number>(40); // km/h (2. jármű / teherautó vagy gyalogos)
  const [initialDistance, setInitialDistance] = useState<number>(200); // km

  // Mozgás szimuláció vezérlés
  const [simTime, setSimTime] = useState<number>(0); // eltelt szimulációs óra
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x, 2x, 4x

  // Mozgás számítások
  let meetTime = 0;
  let dist1Total = 0;
  let dist2Total = 0;

  if (motionType === 'meet') {
    const vSum = v1 + v2;
    meetTime = vSum > 0 ? initialDistance / vSum : 0;
    dist1Total = v1 * meetTime;
    dist2Total = v2 * meetTime;
  } else {
    // Utolérés: v1 > v2 szükséges
    const vDiff = Math.max(1, v1 - v2);
    meetTime = initialDistance / vDiff;
    dist1Total = v1 * meetTime;
    dist2Total = v2 * meetTime;
  }

  // Pillanatnyi értékek az adott simTime pillanatban
  const currentSimTime = Math.min(simTime, meetTime);
  let curPos1 = 0;
  let curPos2 = 0;
  let remainingDist = 0;

  // SVG Pálya skálázás (X koordináták: 80-tól 720-ig, szélesség: 640px)
  const trackLeftX = 80;
  const trackRightX = 720;
  const trackWidthPx = trackRightX - trackLeftX; // 640px

  let x1 = trackLeftX;
  let x2 = trackRightX;
  let xMeet = trackLeftX;
  let trackMaxKm = initialDistance;

  if (motionType === 'meet') {
    curPos1 = v1 * currentSimTime;
    curPos2 = initialDistance - (v2 * currentSimTime);
    remainingDist = Math.max(0, curPos2 - curPos1);

    trackMaxKm = Math.max(10, initialDistance);
    x1 = trackLeftX + (trackMaxKm > 0 ? (curPos1 / trackMaxKm) * trackWidthPx : 0);
    x2 = trackRightX - (trackMaxKm > 0 ? ((v2 * currentSimTime) / trackMaxKm) * trackWidthPx : 0);
    xMeet = trackLeftX + (trackMaxKm > 0 ? (dist1Total / trackMaxKm) * trackWidthPx : 0);
  } else {
    // Utolérés:
    // 1. Jármű 0-tól indul, 2. jármű initialDistance-től indul.
    // Találkozási pont a rajttól: dist1Total.
    // A látható pálya úgy skálázódik, hogy a találkozási pont kényelmesen a pálya vége felé legyen látható.
    trackMaxKm = Math.max(initialDistance * 1.25, dist1Total * 1.15, 30);
    curPos1 = v1 * currentSimTime;
    curPos2 = initialDistance + (v2 * currentSimTime);
    remainingDist = Math.max(0, curPos2 - curPos1);

    x1 = trackLeftX + (trackMaxKm > 0 ? (curPos1 / trackMaxKm) * trackWidthPx : 0);
    x2 = trackLeftX + (trackMaxKm > 0 ? (curPos2 / trackMaxKm) * trackWidthPx : 0);
    xMeet = trackLeftX + (trackMaxKm > 0 ? (dist1Total / trackMaxKm) * trackWidthPx : 0);
  }

  const isMeetReached = meetTime > 0 && currentSimTime >= meetTime - 0.001;

  // Refs a zökkenőmentes 60fps animációhoz (megszünteti a React state késést)
  const simTimeRef = useRef(simTime);
  simTimeRef.current = simTime;

  // Mozgás szimuláció időzítő
  useEffect(() => {
    let animFrame: number;
    let lastTime: number | null = null;

    if (isSimPlaying) {
      const step = (timestamp: number) => {
        if (lastTime === null) lastTime = timestamp;
        const deltaSeconds = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        // Kb. 4 másodperc alatt fut le 1x sebességen
        const simSpeedFactor = Math.max(0.15, (meetTime || 2) / 4);
        const simDelta = deltaSeconds * simSpeedFactor * simSpeed;
        const nextTime = simTimeRef.current + simDelta;

        if (meetTime > 0 && nextTime >= meetTime) {
          simTimeRef.current = meetTime;
          setSimTime(meetTime);
          setIsSimPlaying(false);
          return;
        }

        simTimeRef.current = nextTime;
        setSimTime(nextTime);
        animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    }

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isSimPlaying, meetTime, simSpeed]);

  // TAB 2: Munka és Medencetöltő Labor
  const [t1, setT1] = useState<number>(6); // óra (1. munkás / csap)
  const [t2, setT2] = useState<number>(4); // óra (2. munkás / csap)
  const [hasDrain, setHasDrain] = useState<boolean>(false);
  const [tDrain, setTDrain] = useState<number>(12); // óra (lefolyó)

  // Medence szimuláció vezérlés
  const [poolSimTime, setPoolSimTime] = useState<number>(0);
  const [isPoolPlaying, setIsPoolPlaying] = useState<boolean>(false);
  const [poolSpeed, setPoolSpeed] = useState<number>(1);

  // Együttes teljesítmény 1 óra alatt
  let jointRate = (1 / t1) + (1 / t2);
  if (hasDrain) {
    jointRate -= (1 / tDrain);
  }
  const jointTime = jointRate > 0 ? 1 / jointRate : 0;

  // Medence pillanatnyi értékei
  const currentPoolTime = jointTime > 0 ? Math.min(poolSimTime, jointTime) : poolSimTime;
  const currentFillFraction = jointRate > 0 ? Math.min(1, Math.max(0, jointRate * currentPoolTime)) : 0;
  const currentFillPercent = currentFillFraction * 100;
  const isPoolFull = currentFillPercent >= 99.9;
  const waterHeight = 190 * currentFillFraction;
  const waterY = 270 - waterHeight;

  // Csapok és lefolyó hozzájárulása (százalékban kifejezve a telemetriához)
  const tap1Contributed = t1 > 0 ? ((1 / t1) * currentPoolTime) * 100 : 0;
  const tap2Contributed = t2 > 0 ? ((1 / t2) * currentPoolTime) * 100 : 0;
  const drainLoss = hasDrain && tDrain > 0 ? ((1 / tDrain) * currentPoolTime) * 100 : 0;

  const poolTimeRef = useRef(poolSimTime);
  poolTimeRef.current = poolSimTime;

  // Medence szimuláció időzítő
  useEffect(() => {
    let animFrame: number;
    let lastTime: number | null = null;

    if (isPoolPlaying) {
      const step = (timestamp: number) => {
        if (lastTime === null) lastTime = timestamp;
        const deltaSeconds = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        // Kb. 4 másodperc alatt fut le 1x sebességen
        const simSpeedFactor = Math.max(0.15, (jointTime || 2) / 4);
        const simDelta = deltaSeconds * simSpeedFactor * poolSpeed;
        const nextTime = poolTimeRef.current + simDelta;

        if (jointTime > 0 && nextTime >= jointTime) {
          poolTimeRef.current = jointTime;
          setPoolSimTime(jointTime);
          setIsPoolPlaying(false);
          return;
        }

        poolTimeRef.current = nextTime;
        setPoolSimTime(nextTime);
        animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    }

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isPoolPlaying, jointTime, poolSpeed]);

  return (
    <TheoryTemplate
      title="Szöveges Feladatok: Mozgás és Munka"
      subtitle="Egyenletes mozgások (s = v · t), találkozás, utolérés, folyóvíz, valamint az együttes munkavégzés és tartálytöltés mesterfogásai a 8. osztályban"
      pdfFilename="8_osztaly_mozgas_munka_szoveges_feladatok.pdf"
      themeColor="blue"
      quickRule={{
        label: "A Mozgás és Munka Két Alaptörvénye",
        formula: (
          <span className="inline-flex items-center gap-2 flex-wrap">
            <span>Út: s = v · t</span>
            <span className="text-slate-400">és</span>
            <span className="inline-flex items-center gap-1">
              <span>Munka:</span>
              <Fraction num="1" den="t₁" size="sm" />
              <span>+</span>
              <Fraction num="1" den="t₂" size="sm" />
              <span>=</span>
              <Fraction num="1" den="t_együtt" size="sm" />
            </span>
          </span>
        )
      }}
      practiceTitle="Készen állsz a mozgásos és munkavégzési feladatok megoldására?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses kvízben, és sajátítsd el a típusokat a beépített párosítóval és csoportosítóval!"
      practiceButtonText="Mozgás és Munka Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: Az Egyenletes Mozgás Alaptörvénye */}
      <TheorySection
        number={1}
        title="Az Egyenletes Mozgás Matematikai Modellje"
        icon={<Gauge className="w-5 h-5 text-blue-600" />}
        badge="Alapfogalmak"
        badgeColor="blue"
      >
        <TheoryCard
          title="A Három Alapmennyiség: Út (s), Sebesség (v) és Idő (t)"
          badge="s = v · t"
          badgeColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A 8. osztályos mozgásos feladatok az <strong>egyenletes mozgást</strong> modellezik, vagyis feltételezzük, hogy a járművek vagy gyalogosok sebessége a vizsgált időtartam alatt állandó.
              Ekkor a megtett út egyenesen arányos a mozgás idejével:
            </p>

            {/* A Mozgási Háromszög */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 text-center">
                <div className="text-xs uppercase font-bold text-blue-700 dark:text-blue-400 mb-1">Út kiszámítása (s)</div>
                <div className="text-xl font-black text-blue-900 dark:text-blue-100 font-mono my-1">
                  s = v · t
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Út = Sebesség × Idő (pl. 70 km/h · 3 h = 210 km)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 text-center flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-indigo-700 dark:text-indigo-400 mb-1">Sebesség kiszámítása (v)</div>
                  <div className="text-2xl font-black text-indigo-900 dark:text-indigo-100 font-mono my-2 flex items-center justify-center gap-1.5">
                    <span>v =</span>
                    <Fraction num="s" den="t" size="lg" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1 flex-wrap">
                  <span>Sebesség =</span>
                  <Fraction num="Út" den="Idő" size="sm" />
                  <span>(pl. <Fraction num="150 km" den="2 h" size="sm" /> = 75 km/h)</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/60 text-center flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-sky-700 dark:text-sky-400 mb-1">Idő kiszámítása (t)</div>
                  <div className="text-2xl font-black text-sky-900 dark:text-sky-100 font-mono my-2 flex items-center justify-center gap-1.5">
                    <span>t =</span>
                    <Fraction num="s" den="v" size="lg" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1 flex-wrap">
                  <span>Idő =</span>
                  <Fraction num="Út" den="Sebesség" size="sm" />
                  <span>(pl. <Fraction num="240 km" den="80 km/h" size="sm" /> = 3 h)</span>
                </p>
              </div>
            </div>

            {/* Mértékegység Egyeztetés */}
            <TheoryCallout
              variant="blue"
              title="A Mértékegységek Szigorú Egyeztetése (Km/h és Idő Átváltás)"
              icon={<Clock className="w-5 h-5 text-blue-600" />}
            >
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1 flex-wrap">
                  <strong>A leggyakoribb hiba:</strong> a percek tizedestörtként való felírása! 45 perc <strong>NEM 0,45 óra</strong>, hanem <Fraction num="45" den="60" size="sm" /> = <Fraction num="3" den="4" size="sm" /> = 0,75 óra!
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-center">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1">
                    <span className="text-blue-700 dark:text-blue-300 font-bold">15 perc =</span>
                    <Fraction num="1" den="4" size="sm" />
                    <span>h = 0,25 h</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1">
                    <span className="text-blue-700 dark:text-blue-300 font-bold">30 perc =</span>
                    <Fraction num="1" den="2" size="sm" />
                    <span>h = 0,5 h</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1">
                    <span className="text-blue-700 dark:text-blue-300 font-bold">45 perc =</span>
                    <Fraction num="3" den="4" size="sm" />
                    <span>h = 0,75 h</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1">
                    <span className="text-blue-700 dark:text-blue-300 font-bold">20 perc =</span>
                    <Fraction num="1" den="3" size="sm" />
                    <span>h ≈ 0,33 h</span>
                  </div>
                </div>
              </div>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Találkozási Feladatok (Egymással szembe haladás) */}
      <TheorySection
        number={2}
        title="Találkozási Feladatok: Egymással Szembe Haladó Mozgások"
        icon={<Car className="w-5 h-5 text-blue-600" />}
        badge="Találkozás"
        badgeColor="blue"
      >
        <TheoryCard
          title="Hogyan írjuk fel az egyenletet, ha két jármű egymás felé közeledik?"
          badge="Összeadódó Utak"
          badgeColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Amikor két jármű két különböző pontból (pl. két városból, amelyek távolsága <MathText>s_ö</MathText>) egyszerre indul egymással szembe, mindkettő megtesz egy útszakaszt.
              A találkozás pillanatában <strong className="text-blue-700 dark:text-blue-300">a két jármű által megtett út összege pontosan megegyezik a kezdeti teljes távolsággal</strong>:
            </p>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 text-center">
              <div className="text-xs uppercase font-bold text-blue-700 dark:text-blue-400">A Találkozás Alapegyenlete</div>
              <div className="text-lg font-black text-blue-900 dark:text-blue-100 font-mono my-1">
                s₁ + s₂ = s_összes  →  v₁ · t + v₂ · t = s_összes
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 flex items-center justify-center gap-2 flex-wrap">
                <span>Kiemelve az időt:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-300">(v₁ + v₂) · t = s_összes</span>
                <span>→</span>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-blue-800 dark:text-blue-200">
                  <span>t =</span>
                  <Fraction num="s_összes" den="v₁ + v₂" size="sm" />
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-100">Mi történik, ha nem egyszerre indulnak?</strong>
              <br />
              Ha az 1. jármű már <MathText>t_0</MathText> ideje úton van, mielőtt a 2. elindulna:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Vagy kiszámoljuk az 1. jármű előnyét (<MathText>s_előny = v_1 · t_0</MathText>), és a maradék távolságra írjuk fel az együttes mozgást: <MathText>(v_1 + v_2) · t_közös = s_összes - s_előny</MathText>.</li>
                <li>Vagy az időkkel dolgozunk: az 1. jármű ideje <MathText>t + t_0</MathText>, a 2. járműé <MathText>t</MathText>, így: <MathText>v_1 · (t + t_0) + v_2 · t = s_összes</MathText>.</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szekció: Utolérési Feladatok (Azonos irányú mozgás) */}
      <TheorySection
        number={3}
        title="Utolérési Feladatok: Egyirányú Haladás és Előny Ledolgozása"
        icon={<Bike className="w-5 h-5 text-blue-600" />}
        badge="Utolérés"
        badgeColor="blue"
      >
        <TheoryCard
          title="Mikor és hol éri utol a gyorsabb jármű a lassabbat?"
          badge="s₁ = s₂ vagy s_gyors - s_lassú = s₀"
          badgeColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Utolérési feladatoknál a járművek azonos irányba haladnak. Tipikusan a lassabb jármű (gyalogos, traktor, biciklis) korábban indul, vagy előnyből indul.
              A gyorsabb jármű óránként <span className="font-bold text-blue-700 dark:text-blue-300">(v_gyors - v_lassú)</span> kilométerrel csökkenti a távolságot.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60">
                <div className="text-xs font-black text-indigo-800 dark:text-indigo-300 mb-1">
                  1. Eset: Ugyanabból a pontból, későbbi indulással
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A találkozás pillanatában mindketten <strong>pontosan ugyanakkora utat tesznek meg</strong> a kiindulási helytől:
                  <br />
                  <span className="font-mono text-indigo-700 dark:text-indigo-300 font-bold block my-1">
                    s_gyors = s_lassú  →  v_gyors · t = v_lassú · (t + t_előny)
                  </span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/60">
                <div className="text-xs font-black text-sky-800 dark:text-sky-300 mb-1">
                  2. Eset: Előny ledolgozása (Relatív sebesség)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ha a lassabb előnye <MathText>s_0</MathText> km, akkor a gyorsabbnak ezt a távolságot kell beérnie a sebességkülönbséggel:
                  <br />
                  <span className="font-mono text-sky-700 dark:text-sky-300 font-bold inline-flex items-center gap-1.5 my-1">
                    <span>t_utolérés =</span>
                    <Fraction num="s_előny" den="v_gyors - v_lassú" size="md" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: Folyóvízi Mozgások és Szembeszél */}
      <TheorySection
        number={4}
        title="Folyóvízi Mozgások és Szembeszél"
        icon={<Waves className="w-5 h-5 text-blue-600" />}
        badge="Folyó & Szél"
        badgeColor="blue"
      >
        <TheoryCard
          title="Hogyan módosítja a folyó sodrása vagy a szél a saját sebességet?"
          badge="Összeadódó / Kivonódó Sebesség"
          badgeColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ha egy hajó vagy úszó folyóvízben mozog, a víz sodrása hozzáadódik vagy levonódik a hajó saját (állóvízi) sebességéből (<MathText>v_s</MathText>):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60">
                <div className="flex items-center gap-1.5 font-bold text-xs text-teal-800 dark:text-teal-300 mb-1">
                  <Ship className="w-4 h-4 text-teal-600" />
                  Folyásirányban lefelé (hátszél)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A víz sodrása segíti a mozgást, a sebességek összeadódnak:
                  <br />
                  <span className="font-mono text-teal-700 dark:text-teal-300 font-black block mt-1">
                    v_le = v_saját + v_folyó
                  </span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
                <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800 dark:text-rose-300 mb-1">
                  <Ship className="w-4 h-4 text-rose-600" />
                  Folyásiránnyal szemben (szembeszél)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A víz sodrása fékezi a mozgást, a sebességek kivonódnak:
                  <br />
                  <span className="font-mono text-rose-700 dark:text-rose-300 font-black block mt-1">
                    v_fel = v_saját - v_folyó
                  </span>
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
              <strong>Fontos észrevétel:</strong> Egy motorcsónak saját sebessége 20 km/h, a folyó 4 km/h. Lefelé <MathText>v = 24</MathText> km/h, felfelé <MathText>v = 16</MathText> km/h. Ha egy oda-vissza utat tesz meg, az átlagsebessége <strong>nem 20 km/h lesz</strong>, mert a lassabb szakaszon több ideig tart az út!
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szekció: Együttes Munkavégzés és Tartálytöltés */}
      <TheorySection
        number={5}
        title="Együttes Munkavégzés és Tartálytöltés"
        icon={<Hammer className="w-5 h-5 text-blue-600" />}
        badge="Munkavégzés"
        badgeColor="blue"
      >
        <TheoryCard
          title="A Reciprok Szabály: Miért 1/t-vel számolunk az együttes munkánál?"
          badge="1/t₁ + 1/t₂ = 1/t_együtt"
          badgeColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ha Tamás egy munkát 6 óra alatt végez el, akkor 1 óra alatt a teljes munka <span className="font-bold text-blue-700 dark:text-blue-300 inline-flex items-center gap-0.5"><Fraction num="1" den="6" size="sm" />&nbsp;részét</span> végzi el.
              Ha Péter ugyanezt a munkát 3 óra alatt csinálja meg, akkor 1 óra alatt a munka <span className="font-bold text-blue-700 dark:text-blue-300 inline-flex items-center gap-0.5"><Fraction num="1" den="3" size="sm" />&nbsp;részét</span> végzi el.
              Amikor együtt dolgoznak, a teljesítményeik (az 1 óra alatt elvégzett munkarészek) <strong>összeadódnak</strong>:
            </p>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 text-center">
              <div className="text-xs uppercase font-bold text-blue-700 dark:text-blue-400">Az Együttes Munka Reciprok-Egyenlete</div>
              <div className="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-100 font-mono my-2 flex items-center justify-center gap-2 flex-wrap">
                <Fraction num="1" den="t₁" size="lg" />
                <span>+</span>
                <Fraction num="1" den="t₂" size="lg" />
                <span>=</span>
                <Fraction num="1" den="t_együtt" size="lg" />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
                <span>Két munkás esetén az együtt töltött idő:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-300 inline-flex items-center gap-1">
                  <span>t_együtt =</span>
                  <Fraction num="t₁ · t₂" den="t₁ + t₂" size="sm" />
                </span>
              </div>
            </div>

            <TheoryTable
              headers={['Szereplő', 'Egyedüli idő', '1 óra alatt végzett rész', 't idő alatt végzett rész']}
              rows={[
                ['1. munkás / csap', 't₁ óra', <Fraction key="r1-1" num="1" den="t₁" size="sm" />, <Fraction key="r1-t" num="t" den="t₁" size="sm" />],
                ['2. munkás / csap', 't₂ óra', <Fraction key="r2-1" num="1" den="t₂" size="sm" />, <Fraction key="r2-t" num="t" den="t₂" size="sm" />],
                [
                  'Közösen (együtt)',
                  't_együtt',
                  <span key="r3-sum" className="inline-flex items-center gap-1">
                    <Fraction num="1" den="t₁" size="sm" />
                    <span>+</span>
                    <Fraction num="1" den="t₂" size="sm" />
                  </span>,
                  '1 (a teljes munka kész!)'
                ]
              ]}
            />

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-amber-800 dark:text-amber-300">Medencetöltés lefolyóval (ürítő csap):</strong>
              <br />
              Ha az egyik csap tölti a medencét (<MathText>t_1</MathText> óra alatt), de a leeresztő csap közben nyitva van és üríti (<MathText>t_le</MathText> óra alatt), a lefolyó csökkenti a vízmennyiséget, ezért kivonjuk:
              <div className="my-1.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 font-mono text-center font-bold text-amber-900 dark:text-amber-200 flex items-center justify-center gap-2 flex-wrap">
                <Fraction num="1" den="t_töltő" size="md" />
                <span>-</span>
                <Fraction num="1" den="t_lefolyó" size="md" />
                <span>=</span>
                <Fraction num="1" den="t_eredő" size="md" />
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. Szekció: Interaktív Mozgás és Munka Labor Szimulátor (Az elmélet után!) */}
      <TheorySection
        number={6}
        title="Interaktív Mozgás és Munka Labor Szimulátor"
        icon={<Gauge className="w-5 h-5 text-blue-600" />}
        badge="Szimulátor"
        badgeColor="blue"
      >
        <TheoryCard
          title="Modellezd valós időben a találkozást, utolérést és az együttes munkavégzést!"
          badge="Interaktív Labor"
          badgeColor="blue"
        >
          {/* Fülváltó */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Válaszd ki a kísérleti témát:
            </span>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'motion' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('motion')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeTab === 'motion'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                    : 'border-blue-200 text-blue-700 dark:text-blue-300'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                Mozgás: Találkozás & Utolérés
              </Button>
              <Button
                variant={activeTab === 'work' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('work')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeTab === 'work'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                    : 'border-blue-200 text-blue-700 dark:text-blue-300'
                }`}
              >
                <Hammer className="w-3.5 h-3.5" />
                Munka & Medencetöltés
              </Button>
            </div>
          </div>

          {/* TAB 1: Mozgás Labor */}
          {activeTab === 'motion' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 space-y-4">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mozgás típusa:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMotionType('meet');
                        setV1(60);
                        setV2(40);
                        setInitialDistance(200);
                        setIsSimPlaying(false);
                        setSimTime(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        motionType === 'meet'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 border-slate-300'
                      }`}
                    >
                      🤝 Találkozás (Szembe haladás)
                    </button>
                    <button
                      onClick={() => {
                        setMotionType('catch');
                        setV1(80);
                        setV2(30);
                        setInitialDistance(100);
                        setIsSimPlaying(false);
                        setSimTime(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        motionType === 'catch'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 border-slate-300'
                      }`}
                    >
                      🏎️ Utolérés (Egyirányú mozgás)
                    </button>
                  </div>
                </div>

                {/* Paraméter Csúszkák */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 1. Jármű sebessége */}
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-blue-800 dark:text-blue-300">1. Jármű sebessége (v₁):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-blue-600 text-white font-black">{v1} km/h</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="130"
                      step="5"
                      value={v1}
                      onChange={(e) => {
                        setV1(parseInt(e.target.value));
                        setIsSimPlaying(false);
                        setSimTime(0);
                      }}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* 2. Jármű sebessége */}
                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-indigo-800 dark:text-indigo-300">2. Jármű sebessége (v₂):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-black">{v2} km/h</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max={motionType === 'catch' ? Math.max(10, v1 - 5) : 130}
                      step="5"
                      value={v2}
                      onChange={(e) => {
                        setV2(parseInt(e.target.value));
                        setIsSimPlaying(false);
                        setSimTime(0);
                      }}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* Kezdeti távolság */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">
                        {motionType === 'meet' ? 'Kezdeti távolság:' : 'Lassabb jármű előnye:'}
                      </span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-slate-700 text-white font-black">{initialDistance} km</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="500"
                      step="10"
                      value={initialDistance}
                      onChange={(e) => {
                        setInitialDistance(parseInt(e.target.value));
                        setIsSimPlaying(false);
                        setSimTime(0);
                      }}
                      className="w-full accent-slate-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {/* SZIMULÁCIÓ VEZÉRLŐ PULT (Indítás, Megállítás, Visszaállítás, Sebesség, Időcsúszka) */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        if (isSimPlaying) {
                          setIsSimPlaying(false);
                        } else {
                          if (isMeetReached) {
                            setSimTime(0);
                          }
                          setIsSimPlaying(true);
                        }
                      }}
                      className={`rounded-xl font-bold text-xs gap-1.5 px-4 shadow-sm transition-all ${
                        isSimPlaying
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {isSimPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isSimPlaying ? 'Megállítás' : isMeetReached ? 'Újraindítás' : 'Szimuláció indítása'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsSimPlaying(false);
                        setSimTime(0);
                      }}
                      className="rounded-xl font-bold text-xs gap-1.5 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Visszaállítás
                    </Button>
                  </div>

                  {/* Sebességválasztó */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Sebesség:</span>
                    {[1, 2, 4].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setSimSpeed(spd)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                          simSpeed === spd
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {spd}×
                      </button>
                    ))}
                  </div>

                  {/* Időcsúszka (Scrubber) */}
                  <div className="flex items-center gap-2 flex-1 min-w-[220px] justify-end">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-mono font-bold text-blue-900 dark:text-blue-200 shrink-0">
                      t = {currentSimTime.toFixed(2)} h / {meetTime.toFixed(2)} h
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={meetTime || 1}
                      step={0.01}
                      value={currentSimTime}
                      onChange={(e) => {
                        setIsSimPlaying(false);
                        setSimTime(parseFloat(e.target.value));
                      }}
                      className="w-28 sm:w-36 accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {/* Vizuális Útszakasz és Animált Pálya Grafika - SVG Útpálya Szimulátor */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-sky-500/10 border border-blue-200 dark:border-blue-900/60 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-black">
                      <Car className="w-4 h-4" />
                      {motionType === 'meet' ? 'Szembehaladó mozgás valós idejű pályája:' : 'Utolérés és üldözés valós idejű pályája:'}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      isMeetReached
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                        : isSimPlaying
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {isMeetReached
                        ? (motionType === 'meet' ? '🎉 Találkoztak!' : '🎉 Utolérte!')
                        : isSimPlaying
                        ? '🚗 Szimuláció fut...'
                        : '⏸️ Szüneteltetve'}
                    </span>
                  </div>

                  {/* SVG ÚTPÁLYA */}
                  <svg
                    viewBox="0 0 800 230"
                    className="w-full h-auto select-none drop-shadow-md rounded-2xl bg-slate-900 border border-slate-700 shadow-inner"
                  >
                    <defs>
                      {/* Út aszfalt gradiens */}
                      <linearGradient id="roadAsphalt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e293b" />
                      </linearGradient>

                      {/* Kék autó gradiens */}
                      <linearGradient id="carGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1d4ed8" />
                        <stop offset="60%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>

                      {/* Teherautó / 2. jármű gradiens */}
                      <linearGradient id="truckGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4338ca" />
                        <stop offset="60%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>

                      {/* Fényszóró fénycsóva (jobbra) */}
                      <linearGradient id="headlightRight" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                      </linearGradient>

                      {/* Fényszóró fénycsóva (balra) */}
                      <linearGradient id="headlightLeft" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Felső zöld padka */}
                    <rect x="0" y="38" width="800" height="12" fill="#14532d" opacity="0.6" />
                    
                    {/* Aszfalt úttest (Kétsávos) */}
                    <rect x="0" y="50" width="800" height="130" fill="url(#roadAsphalt)" />
                    
                    {/* Alsó zöld padka */}
                    <rect x="0" y="180" width="800" height="12" fill="#14532d" opacity="0.6" />

                    {/* Fehér szegélyvonalak */}
                    <line x1="0" y1="52" x2="800" y2="52" stroke="#e2e8f0" strokeWidth="2" opacity="0.9" />
                    <line x1="0" y1="178" x2="800" y2="178" stroke="#e2e8f0" strokeWidth="2" opacity="0.9" />

                    {/* Szaggatott felezővonal (Két különálló sáv) */}
                    <line x1="0" y1="115" x2="800" y2="115" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="16 12" opacity="0.7" />

                    {/* Kilométer beosztások és vonások az alsó padkán */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                      const kmVal = Math.round(trackMaxKm * ratio);
                      const xPos = trackLeftX + (ratio * trackWidthPx);
                      return (
                        <g key={ratio} opacity="0.85">
                          <line x1={xPos} y1="174" x2={xPos} y2="182" stroke="#cbd5e1" strokeWidth="1.5" />
                          <text x={xPos} y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#94a3b8" fontFamily="monospace">
                            {kmVal} km
                          </text>
                        </g>
                      );
                    })}

                    {/* Város A (0 km) jelölő tábla a bal szélen */}
                    <g transform={`translate(${trackLeftX}, 34)`}>
                      <rect x="-42" y="-18" width="84" height="20" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="0" y="-4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
                        🏙️ A Város (0)
                      </text>
                      <line x1="0" y1="2" x2="0" y2="18" stroke="#38bdf8" strokeWidth="2" />
                    </g>

                    {/* Cél / Város B jelölő tábla a jobb szélen */}
                    <g transform={`translate(${motionType === 'meet' ? trackRightX : xMeet}, 34)`}>
                      <rect x="-46" y="-18" width="92" height="20" rx="6" fill="#4f46e5" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="0" y="-4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
                        {motionType === 'meet' ? `🏙️ B (${initialDistance} km)` : `🏁 Cél (${dist1Total.toFixed(0)} km)`}
                      </text>
                      <line x1="0" y1="2" x2="0" y2="18" stroke="#818cf8" strokeWidth="2" />
                    </g>

                    {/* Találkozási pont / Utolérési vonal (Piros szaggatott vonal és zászló) */}
                    <g>
                      <line x1={xMeet} y1="52" x2={xMeet} y2="178" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
                      <g transform={`translate(${xMeet}, 40)`}>
                        <rect x="-44" y="-18" width="88" height="19" rx="6" fill="#e11d48" stroke="#fda4af" strokeWidth="1.5" />
                        <text x="0" y="-5" textAnchor="middle" fontSize="10" fontWeight="black" fill="#ffffff" fontFamily="monospace">
                          📍 {dist1Total.toFixed(1)} km
                        </text>
                      </g>
                    </g>

                    {/* Dinamikus távolságjelző sáv a két jármű között (Valós időben látványosan csökken!) */}
                    {!isMeetReached && remainingDist > 0.5 && (
                      <g>
                        <line
                          x1={Math.min(x1, x2) + 24}
                          y1="22"
                          x2={Math.max(x1, x2) - 24}
                          y2="22"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                          strokeDasharray="5 3"
                        />
                        <line x1={Math.min(x1, x2) + 24} y1="16" x2={Math.min(x1, x2) + 24} y2="28" stroke="#f59e0b" strokeWidth="2" />
                        <line x1={Math.max(x1, x2) - 24} y1="16" x2={Math.max(x1, x2) - 24} y2="28" stroke="#f59e0b" strokeWidth="2" />
                        <g transform={`translate(${(x1 + x2) / 2}, 22)`}>
                          <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                          <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="black" fill="#b45309" fontFamily="monospace">
                            📏 {remainingDist.toFixed(1)} km {motionType === 'catch' ? 'előny' : 'távolság'}
                          </text>
                        </g>
                      </g>
                    )}

                    {/* SIKERES TALÁLKOZÁS BANNER */}
                    {isMeetReached && (
                      <g transform={`translate(${xMeet}, 115)`}>
                        <rect x="-110" y="-18" width="220" height="36" rx="18" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
                        <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="black" fill="#ffffff">
                          {motionType === 'meet' ? '🎉 SIKERES TALÁLKOZÁS!' : '🎉 UTOLÉRTE A GYORSABB!'}
                        </text>
                      </g>
                    )}

                    {/* 1. JÁRMŰ: Felső sáv (Y = 82) - Jobbra halad */}
                    <g transform={`translate(${x1}, 82)`}>
                      {/* Fénycsóva */}
                      <polygon points="22,-4 58,-12 58,12 22,4" fill="url(#headlightRight)" />
                      {/* Autó árnyék */}
                      <ellipse cx="0" cy="14" rx="22" ry="4" fill="#000000" opacity="0.4" />
                      {/* Autó karosszéria */}
                      <rect x="-20" y="-8" width="40" height="18" rx="5" fill="url(#carGrad)" stroke="#60a5fa" strokeWidth="1.5" />
                      {/* Szélvédők */}
                      <rect x="-6" y="-12" width="16" height="8" rx="3" fill="#1e293b" stroke="#93c5fd" strokeWidth="1" />
                      {/* Kerekek */}
                      <circle cx="-12" cy="10" r="4.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                      <circle cx="12" cy="10" r="4.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Fényszóró pont */}
                      <circle cx="20" cy="0" r="2" fill="#fef08a" />
                      {/* Jelvény az autó felett */}
                      <g transform="translate(0, -22)">
                        <rect x="-44" y="-14" width="88" height="18" rx="6" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.2" />
                        <text x="0" y="-2" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                          🚗 1. autó: {curPos1.toFixed(1)} km
                        </text>
                      </g>
                    </g>

                    {/* 2. JÁRMŰ: Alsó sáv (Y = 148) */}
                    <g transform={`translate(${x2}, 148)`}>
                      {motionType === 'meet' ? (
                        /* Szembe haladó teherautó: Balra néz és balra halad */
                        <>
                          {/* Fénycsóva balra */}
                          <polygon points="-22,-4 -58,-12 -58,12 -22,4" fill="url(#headlightLeft)" />
                          {/* Árnyék */}
                          <ellipse cx="0" cy="14" rx="24" ry="4" fill="#000000" opacity="0.4" />
                          {/* Raktér */}
                          <rect x="-6" y="-16" width="30" height="24" rx="3" fill="url(#truckGrad)" stroke="#a5b4fc" strokeWidth="1.5" />
                          {/* Vezetőfülke */}
                          <rect x="-24" y="-8" width="18" height="16" rx="4" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
                          {/* Szélvédő */}
                          <rect x="-22" y="-6" width="8" height="7" rx="2" fill="#1e293b" />
                          {/* Kerekek */}
                          <circle cx="-16" cy="10" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                          <circle cx="6" cy="10" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                          <circle cx="18" cy="10" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                          {/* Fényszóró pont */}
                          <circle cx="-24" cy="0" r="2" fill="#fef08a" />
                        </>
                      ) : (
                        /* Utolérés: Lassabb jármű (kerékpár / moped / jármű), jobbra néz és jobbra halad */
                        <>
                          <polygon points="18,-4 46,-10 46,10 18,4" fill="url(#headlightRight)" opacity="0.6" />
                          <ellipse cx="0" cy="14" rx="18" ry="3.5" fill="#000000" opacity="0.4" />
                          <rect x="-16" y="-8" width="32" height="16" rx="4" fill="url(#truckGrad)" stroke="#a5b4fc" strokeWidth="1.5" />
                          <rect x="-4" y="-12" width="12" height="8" rx="2" fill="#1e293b" stroke="#c7d2fe" strokeWidth="1" />
                          <circle cx="-10" cy="9" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
                          <circle cx="10" cy="9" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
                          <circle cx="16" cy="0" r="1.8" fill="#fef08a" />
                        </>
                      )}

                      {/* Jelvény a 2. jármű alatt */}
                      <g transform="translate(0, 24)">
                        <rect x="-44" y="-4" width="88" height="18" rx="6" fill="#4338ca" stroke="#c7d2fe" strokeWidth="1.2" />
                        <text x="0" y="8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                          {motionType === 'meet' ? '🚚' : '🚴'} 2. jármű: {curPos2.toFixed(1)} km
                        </text>
                      </g>
                    </g>
                  </svg>

                  {/* Kiszámolt Eredmények és Telemetria */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
                    {/* 1. Kártya: Eltelt Idő */}
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 shadow-2xs">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Szimulált Eltelt Idő:</div>
                      <div className="text-base font-black text-blue-600 font-mono my-0.5">
                        {currentSimTime.toFixed(2)} óra / {meetTime.toFixed(2)} óra
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        ({Math.floor(currentSimTime)} óra {Math.round((currentSimTime % 1) * 60)} perc)
                      </div>
                      <div className="text-[10px] text-blue-600/80 dark:text-blue-400 mt-1 font-mono">
                        {motionType === 'meet'
                          ? `t = s / (v₁ + v₂) = ${initialDistance} / ${v1 + v2}`
                          : `t = előny / (v₁ - v₂) = ${initialDistance} / ${Math.max(1, v1 - v2)}`}
                      </div>
                    </div>

                    {/* 2. Kártya: 1. Gyors Autó Útja */}
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 shadow-2xs">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        1. Autó ({v1} km/h) Útja:
                      </div>
                      <div className="text-base font-black text-blue-700 dark:text-blue-300 font-mono my-0.5">
                        {curPos1.toFixed(1)} km / {dist1Total.toFixed(1)} km
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                        s₁ = {v1} km/h · {currentSimTime.toFixed(2)} h
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Pillanatnyi helyzet a rajttól: <strong>{curPos1.toFixed(1)} km</strong>
                      </div>
                    </div>

                    {/* 3. Kártya: 2. Jármű Útja / Helyzete */}
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        2. Jármű ({v2} km/h) {motionType === 'catch' ? 'Előnye és Útja:' : 'Útja:'}
                      </div>
                      <div className="text-base font-black text-indigo-700 dark:text-indigo-300 font-mono my-0.5">
                        {motionType === 'meet'
                          ? `${(v2 * currentSimTime).toFixed(1)} km / ${dist2Total.toFixed(1)} km`
                          : `${curPos2.toFixed(1)} km (rajttól)`}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                        {motionType === 'meet'
                          ? `s₂ = ${v2} km/h · ${currentSimTime.toFixed(2)} h`
                          : `s₂ = ${initialDistance} km + (${v2} · ${currentSimTime.toFixed(2)})`}
                      </div>
                      <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-1">
                        {motionType === 'meet'
                          ? `Hátralévő távolság: ${remainingDist.toFixed(1)} km`
                          : `Hátralévő előny: ${remainingDist.toFixed(1)} km`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Munka & Medence Labor */}
          {activeTab === 'work' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 space-y-4">
                {/* Paraméter Csúszkák */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Csap / Munkás */}
                  <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-blue-800 dark:text-blue-300">1. Csap ideje egyedül (t₁):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-blue-600 text-white font-black">{t1} óra</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      step="1"
                      value={t1}
                      onChange={(e) => {
                        setT1(parseInt(e.target.value));
                        setIsPoolPlaying(false);
                        setPoolSimTime(0);
                      }}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <span>1 óra alatt megtölt:</span>
                      <Fraction num="1" den={t1} size="sm" />
                      <span>részt ({((1 / t1) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>

                  {/* 2. Csap / Munkás */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-indigo-800 dark:text-indigo-300">2. Csap ideje egyedül (t₂):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-black">{t2} óra</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      step="1"
                      value={t2}
                      onChange={(e) => {
                        setT2(parseInt(e.target.value));
                        setIsPoolPlaying(false);
                        setPoolSimTime(0);
                      }}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <span>1 óra alatt megtölt:</span>
                      <Fraction num="1" den={t2} size="sm" />
                      <span>részt ({((1 / t2) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Lefolyó kapcsoló */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="drainToggle"
                      checked={hasDrain}
                      onChange={(e) => {
                        setHasDrain(e.target.checked);
                        setIsPoolPlaying(false);
                        setPoolSimTime(0);
                      }}
                      className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                    />
                    <label htmlFor="drainToggle" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                      Nyitva van a leeresztő csap (lefolyó) is?
                    </label>
                  </div>

                  {hasDrain && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">Lefolyó ideje:</span>
                      <input
                        type="number"
                        min="2"
                        max="48"
                        value={tDrain}
                        onChange={(e) => {
                          setTDrain(Math.max(2, parseInt(e.target.value) || 2));
                          setIsPoolPlaying(false);
                          setPoolSimTime(0);
                        }}
                        className="w-16 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-center font-bold"
                      />
                      <span className="text-slate-500">óra</span>
                    </div>
                  )}
                </div>

                {/* SZIMULÁCIÓ VEZÉRLŐ PULT (Töltés Indítása, Megállítás, Ürítés, Sebesség, Időcsúszka) */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        if (isPoolPlaying) {
                          setIsPoolPlaying(false);
                        } else {
                          if (isPoolFull) {
                            setPoolSimTime(0);
                          }
                          setIsPoolPlaying(true);
                        }
                      }}
                      className={`rounded-xl font-bold text-xs gap-1.5 px-4 shadow-sm transition-all ${
                        isPoolPlaying
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isPoolPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPoolPlaying ? 'Megállítás' : isPoolFull ? 'Újratöltés' : 'Töltés indítása'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsPoolPlaying(false);
                        setPoolSimTime(0);
                      }}
                      className="rounded-xl font-bold text-xs gap-1.5 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Medence leürítése
                    </Button>
                  </div>

                  {/* Sebességválasztó */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Sebesség:</span>
                    {[1, 2, 4].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPoolSpeed(spd)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                          poolSpeed === spd
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {spd}×
                      </button>
                    ))}
                  </div>

                  {/* Időcsúszka (Scrubber) */}
                  <div className="flex items-center gap-2 flex-1 min-w-[220px] justify-end">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-mono font-bold text-blue-900 dark:text-blue-200 shrink-0">
                      t = {currentPoolTime.toFixed(2)} h / {jointTime.toFixed(2)} h
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={jointTime || 1}
                      step={0.01}
                      value={currentPoolTime}
                      onChange={(e) => {
                        setIsPoolPlaying(false);
                        setPoolSimTime(parseFloat(e.target.value));
                      }}
                      className="w-28 sm:w-36 accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {/* GYÖNYÖRŰ INTERAKTÍV SVG MEDENCE KÉP ÉS VÍZSZINT ÁBRÁZOLÁS */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-sky-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-950 border border-blue-200 dark:border-blue-900/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      Medence valós idejű feltöltése és vízszintje:
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      isPoolFull
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                        : isPoolPlaying
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {isPoolFull ? '🎉 Medence tele (100%)' : isPoolPlaying ? '🌊 Töltés folyamatban...' : '⏸️ Szüneteltetve'}
                    </span>
                  </div>

                  {/* SVG MEDENCE */}
                  <svg
                    viewBox="0 0 600 320"
                    className="w-full max-w-xl mx-auto h-auto select-none drop-shadow-md rounded-2xl bg-gradient-to-b from-sky-100/40 to-blue-100/20 dark:from-slate-800/80 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60"
                  >
                    <defs>
                      {/* Víz mélykék gradiens - telt, élénk és ragyogó kék már a töltés kezdetétől */}
                      <linearGradient id="poolWaterGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.96" />
                        <stop offset="30%" stopColor="#0284c7" stopOpacity="0.98" />
                        <stop offset="100%" stopColor="#0369a1" stopOpacity="1" />
                      </linearGradient>

                      {/* Csempe minta */}
                      <pattern id="poolTilePattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="20" height="20" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="0.8" />
                      </pattern>

                      {/* Fém cső gradiens */}
                      <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="40%" stopColor="#cbd5e1" />
                        <stop offset="70%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#64748b" />
                      </linearGradient>

                      {/* 1. Csap vízsugár gradiens (Kék) */}
                      <linearGradient id="waterStream1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>

                      {/* 2. Csap vízsugár gradiens (Indigó) */}
                      <linearGradient id="waterStream2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="50%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#4338ca" />
                      </linearGradient>

                      {/* Levágó keret a medence belsejéhez */}
                      <clipPath id="basinClip">
                        <rect x="70" y="80" width="460" height="190" rx="8" />
                      </clipPath>
                    </defs>

                    {/* Medence perem (Coping rim) */}
                    <rect x="60" y="70" width="480" height="210" rx="14" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="4" />
                    
                    {/* Medence csempézett belseje */}
                    <rect x="70" y="80" width="460" height="190" rx="8" fill="url(#poolTilePattern)" />

                    {/* Víz a medencében (levágva) */}
                    <g clipPath="url(#basinClip)">
                      {currentFillFraction > 0.005 && (
                        <>
                          {/* Szilárd mélykék alapréteg - hogy sose legyen halvány vagy színtelen! */}
                          <rect
                            x="70"
                            y={waterY}
                            width="460"
                            height={waterHeight}
                            fill="#0284c7"
                          />
                          {/* Emelkedő vízoszlop gyönyörű mélykék gradienssel */}
                          <rect
                            x="70"
                            y={waterY}
                            width="460"
                            height={waterHeight}
                            fill="url(#poolWaterGrad)"
                          />

                          {/* Víz alatti fénytörések / csillogás vonalak */}
                          {waterHeight > 20 && (
                            <g opacity="0.45">
                              <line x1="90" y1={waterY + 14} x2="510" y2={waterY + 14} stroke="#7dd3fc" strokeWidth="2.5" strokeDasharray="40 25" />
                              <line x1="120" y1={waterY + 32} x2="480" y2={waterY + 32} stroke="#38bdf8" strokeWidth="2" strokeDasharray="30 35" />
                              {waterHeight > 60 && (
                                <line x1="100" y1={waterY + 54} x2="450" y2={waterY + 54} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="25 40" />
                              )}
                            </g>
                          )}

                          {/* Felszíni hullámzó vízvonal - ragyogó ciánkék / fehér tarajjal */}
                          <path
                            d={`M 70 ${waterY} Q 185 ${waterY - (isPoolPlaying ? 3 : 1)} 300 ${waterY} T 530 ${waterY}`}
                            fill="none"
                            stroke="#e0f2fe"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                          <path
                            d={`M 70 ${waterY + 2} Q 185 ${waterY + (isPoolPlaying ? 2 : 0.5)} 300 ${waterY + 2} T 530 ${waterY + 2}`}
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="2"
                            opacity="0.8"
                            strokeLinecap="round"
                          />

                          {/* Felszálló buborékok animáció közben */}
                          {isPoolPlaying && currentFillFraction < 0.99 && (
                            <g opacity="0.75">
                              <circle cx="160" cy={Math.min(260, waterY + 25)} r="3.5" fill="#ffffff" />
                              <circle cx="250" cy={Math.min(260, waterY + 45)} r="4" fill="#ffffff" />
                              <circle cx="350" cy={Math.min(260, waterY + 35)} r="3" fill="#ffffff" />
                              <circle cx="440" cy={Math.min(260, waterY + 20)} r="3.5" fill="#ffffff" />
                            </g>
                          )}
                        </>
                      )}

                      {/* Medence létra a bal oldali falon */}
                      <g opacity="0.8">
                        <line x1="90" y1="70" x2="90" y2="250" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                        <line x1="110" y1="70" x2="110" y2="250" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                        <line x1="90" y1="120" x2="110" y2="120" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="90" y1="160" x2="110" y2="160" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="90" y1="200" x2="110" y2="200" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="90" y1="240" x2="110" y2="240" stroke="#94a3b8" strokeWidth="3" />
                      </g>

                      {/* Mélységmérő vonalzó a jobb oldali falon */}
                      <g opacity="0.9">
                        <line x1="510" y1="80" x2="530" y2="80" stroke="#0284c7" strokeWidth="2" />
                        <text x="502" y="84" textAnchor="end" fontSize="10" fontWeight="bold" fill="#0369a1">100%</text>

                        <line x1="515" y1="127.5" x2="530" y2="127.5" stroke="#64748b" strokeWidth="1.5" />
                        <text x="507" y="131" textAnchor="end" fontSize="9" fontWeight="bold" fill="#64748b">75%</text>

                        <line x1="510" y1="175" x2="530" y2="175" stroke="#0284c7" strokeWidth="2" />
                        <text x="502" y="179" textAnchor="end" fontSize="10" fontWeight="bold" fill="#0369a1">50%</text>

                        <line x1="515" y1="222.5" x2="530" y2="222.5" stroke="#64748b" strokeWidth="1.5" />
                        <text x="507" y="226" textAnchor="end" fontSize="9" fontWeight="bold" fill="#64748b">25%</text>

                        <line x1="510" y1="270" x2="530" y2="270" stroke="#64748b" strokeWidth="2" />
                        <text x="502" y="268" textAnchor="end" fontSize="9" fontWeight="bold" fill="#64748b">0%</text>
                      </g>
                    </g>

                    {/* Lefolyónyílás és cső a medence alján */}
                    <g transform="translate(300, 270)">
                      <rect x="-20" y="-3" width="40" height="6" rx="2" fill="#475569" />
                      <line x1="-12" y1="-3" x2="-12" y2="3" stroke="#1e293b" strokeWidth="1.5" />
                      <line x1="-4" y1="-3" x2="-4" y2="3" stroke="#1e293b" strokeWidth="1.5" />
                      <line x1="4" y1="-3" x2="4" y2="3" stroke="#1e293b" strokeWidth="1.5" />
                      <line x1="12" y1="-3" x2="12" y2="3" stroke="#1e293b" strokeWidth="1.5" />

                      {/* Lefolyó cső */}
                      <rect x="-10" y="3" width="20" height="28" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="1.5" />

                      {/* Ha a lefolyó be van kapcsolva */}
                      {hasDrain && (
                        <>
                          <circle cx="16" cy="18" r="6" fill="#e11d48" stroke="#9f1239" strokeWidth="1.5" />
                          <text x="26" y="22" fontSize="9" fontWeight="bold" fill="#e11d48">Lefolyó ({tDrain} h)</text>
                          {isPoolPlaying && currentFillFraction > 0.01 && (
                            <rect x="-6" y="31" width="12" height="18" rx="3" fill="#38bdf8" opacity="0.9" />
                          )}
                        </>
                      )}
                    </g>

                    {/* 1. Csap (Bal felső - Kék) */}
                    <g>
                      <path d="M 50 35 L 140 35 L 140 68" fill="none" stroke="url(#metalGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="131" y="66" width="18" height="6" rx="2" fill="#475569" />
                      <circle cx="95" cy="35" r="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
                      <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="black" fill="#1d4ed8">1. CSAP ({t1} óra)</text>

                      {/* Látványos, vastag, lezúduló vízsugár töltés közben */}
                      {isPoolPlaying && currentFillFraction < 0.999 && (
                        <g>
                          <rect
                            x="132"
                            y="68"
                            width="16"
                            height={Math.max(0, waterY - 68)}
                            fill="url(#waterStream1)"
                            rx="3"
                          />
                          <line
                            x1="136"
                            y1="68"
                            x2="136"
                            y2={waterY}
                            stroke="#ffffff"
                            strokeWidth="2"
                            opacity="0.85"
                            strokeDasharray="10 5"
                          />
                          {/* Becsapódási hab és csobbanás a vízfelszínen */}
                          {waterHeight > 2 && (
                            <g transform={`translate(140, ${waterY})`}>
                              <ellipse cx="0" cy="0" rx="16" ry="4.5" fill="#ffffff" opacity="0.9" />
                              <ellipse cx="0" cy="0" rx="9" ry="2.5" fill="#bae6fd" opacity="0.95" />
                            </g>
                          )}
                        </g>
                      )}
                    </g>

                    {/* 2. Csap (Jobb felső - Indigó) */}
                    <g>
                      <path d="M 550 35 L 460 35 L 460 68" fill="none" stroke="url(#metalGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="451" y="66" width="18" height="6" rx="2" fill="#475569" />
                      <circle cx="505" cy="35" r="8" fill="#6366f1" stroke="#4338ca" strokeWidth="2" />
                      <text x="460" y="20" textAnchor="middle" fontSize="11" fontWeight="black" fill="#4f46e5">2. CSAP ({t2} óra)</text>

                      {/* Látványos, vastag, lezúduló vízsugár töltés közben */}
                      {isPoolPlaying && currentFillFraction < 0.999 && (
                        <g>
                          <rect
                            x="452"
                            y="68"
                            width="16"
                            height={Math.max(0, waterY - 68)}
                            fill="url(#waterStream2)"
                            rx="3"
                          />
                          <line
                            x1="456"
                            y1="68"
                            x2="456"
                            y2={waterY}
                            stroke="#ffffff"
                            strokeWidth="2"
                            opacity="0.85"
                            strokeDasharray="10 5"
                          />
                          {/* Becsapódási hab és csobbanás a vízfelszínen */}
                          {waterHeight > 2 && (
                            <g transform={`translate(460, ${waterY})`}>
                              <ellipse cx="0" cy="0" rx="16" ry="4.5" fill="#ffffff" opacity="0.9" />
                              <ellipse cx="0" cy="0" rx="9" ry="2.5" fill="#bae6fd" opacity="0.95" />
                            </g>
                          )}
                        </g>
                      )}
                    </g>

                    {/* Központi Vízszint Kijelző Jelvény a medence felső peremén (Nem takarja ki a vizet!) */}
                    <g transform="translate(300, 44)">
                      <rect
                        x="-90"
                        y="-16"
                        width="180"
                        height="32"
                        rx="16"
                        fill="rgba(255, 255, 255, 0.96)"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="black" fill="#0369a1" fontFamily="monospace">
                        💧 {currentFillPercent.toFixed(1)}% feltöltve
                      </text>
                    </g>
                  </svg>

                  {/* Medence Eredményjelző Telemetria */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Eltelt Idő:</div>
                      <div className="text-base font-black text-blue-600 font-mono my-0.5">
                        {currentPoolTime.toFixed(2)} óra / {jointTime.toFixed(2)} óra
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        ({Math.floor(currentPoolTime)} óra {Math.round((currentPoolTime % 1) * 60)} perc)
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Csapok Teljesítménye:</div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-mono my-1 space-y-0.5">
                        <div>1. csap: <span className="font-bold text-blue-600">{tap1Contributed.toFixed(1)}%</span></div>
                        <div>2. csap: <span className="font-bold text-indigo-600">{tap2Contributed.toFixed(1)}%</span></div>
                        {hasDrain && (
                          <div className="text-rose-500 font-bold">Lefolyó: -{drainLoss.toFixed(1)}%</div>
                        )}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nettó Vízgyarapodás:</div>
                      <div className="text-base font-black text-blue-700 dark:text-blue-300 font-mono my-0.5">
                        {(jointRate * 100).toFixed(1)}% / óra
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono inline-flex items-center justify-center gap-1">
                        <Fraction num="1" den="t_együtt" size="sm" />
                        <span>=</span>
                        <Fraction num="1" den={t1} size="sm" />
                        <span>+</span>
                        <Fraction num="1" den={t2} size="sm" />
                        {hasDrain && (
                          <>
                            <span>-</span>
                            <Fraction num="1" den={tDrain} size="sm" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TheoryCard>
      </TheorySection>

      {/* 7. Szekció: Részletesen Kidolgozott Mintapéldák */}
      <TheorySection
        number={7}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Calculator className="w-5 h-5 text-blue-600" />}
        badge="Mintapéldák"
        badgeColor="blue"
      >
        <TheoryCard
          title="1. Mintapélda: Szembehaladó autók eltérő indulással"
          badge="Találkozás"
          badgeColor="blue"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 font-medium text-slate-800 dark:text-slate-200">
              <strong>Feladat:</strong> Budapest és Szeged távolsága kb. 170 km. Reggel 8:00-kor elindul egy autó Budapestről Szeged felé 70 km/h sebességgel. Fél órával később (8:30-kor) Szegedről elindul egy másik autó Budapest felé 90 km/h sebességgel. Hány órakor és mekkora távolságra Budapesttől találkoznak?
            </div>

            <div className="space-y-2">
              <div>
                <strong>1. Első autó előnye 8:30-ig:</strong>
                Fél óra (0,5 h) alatt az 1. autó megtesz: <MathText>s_előny = 70 · 0,5 = 35</MathText> km-t.
                A maradék távolság 8:30-kor: <MathText>170 - 35 = 135</MathText> km.
              </div>

              <div>
                <strong>2. Együttes mozgás egyenlete 8:30 után:</strong>
                Legyen a találkozásig hátralévő idő <MathText>t</MathText> óra.
                <div className="p-2.5 my-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center gap-2 flex-wrap">
                  <span>70 · t + 90 · t = 135</span>
                  <span>→</span>
                  <span>160 · t = 135</span>
                  <span>→</span>
                  <span>t =</span>
                  <Fraction num="135" den="160" size="md" />
                  <span>= 0,84375 h (kb. 50,6 perc)</span>
                </div>
              </div>

              <div>
                <strong>Válasz:</strong> 8:30 + 51 perc = kb. 9 óra 21 perckor találkoznak. Az 1. autó összesen 35 + 70 · 0,84375 = kb. 94 km-re lesz Budapesttől.
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="2. Mintapélda: Kerékpáros utoléri a gyalogost"
          badge="Utolérés"
          badgeColor="blue"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 font-medium text-slate-800 dark:text-slate-200">
              <strong>Feladat:</strong> Egy gyalogos 5 km/h sebességgel elindul egy faluból a városba. 2 órával később ugyaninnen egy kerékpáros indul utána 15 km/h sebességgel. Hány óra múlva és a falutól mekkora távolságra éri utol a kerékpáros a gyalogost?
            </div>

            <div className="space-y-2">
              <div>
                <strong>1. Előny kiszámítása:</strong> 2 óra alatt a gyalogos megtesz: <MathText>5 · 2 = 10</MathText> km-t.
              </div>

              <div>
                <strong>2. Egyenlet felírása:</strong>
                Legyen a kerékpáros menetideje <MathText>t</MathText> óra.
                <div className="p-2.5 my-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center text-indigo-700 dark:text-indigo-300 font-bold">
                  15 · t = 5 · (t + 2)  →  15t = 5t + 10  →  10t = 10  →  t = 1 óra
                </div>
              </div>

              <div>
                <strong>Válasz:</strong> A kerékpáros indulásától számítva pontosan 1 óra múlva éri utol a gyalogost, a falutól <MathText>15 · 1 = 15</MathText> km távolságra!
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="3. Mintapélda: Két csap feltölt egy medencét"
          badge="Együttes Munka"
          badgeColor="blue"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/60 font-medium text-slate-800 dark:text-slate-200">
              <strong>Feladat:</strong> Egy strandmedencét az 1. csap egyedül 12 óra alatt, a 2. csap egyedül 8 óra alatt tölt fel teljesen. Hány óra alatt telik meg a medence, ha mindkét csapot egyszerre megnyitjuk?
            </div>

            <div className="space-y-2">
              <div>
                <strong>1. Egy óra alatti teljesítmények:</strong>
                <div className="inline-flex items-center gap-2 mt-1">
                  <span>1. csap:</span>
                  <Fraction num="1" den="12" size="sm" />
                  <span>rész,</span>
                  <span>2. csap:</span>
                  <Fraction num="1" den="8" size="sm" />
                  <span>rész.</span>
                </div>
              </div>

              <div>
                <strong>2. Együttes egyenlet:</strong>
                <div className="p-2.5 my-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center gap-2 flex-wrap">
                  <Fraction num="1" den="12" size="md" />
                  <span>+</span>
                  <Fraction num="1" den="8" size="md" />
                  <span>=</span>
                  <Fraction num="1" den="t" size="md" />
                  <span>→</span>
                  <Fraction num="2" den="24" size="md" />
                  <span>+</span>
                  <Fraction num="3" den="24" size="md" />
                  <span>=</span>
                  <Fraction num="5" den="24" size="md" />
                  <span>=</span>
                  <Fraction num="1" den="t" size="md" />
                  <span>→</span>
                  <span>t =</span>
                  <Fraction num="24" den="5" size="md" />
                  <span>= 4,8 óra</span>
                </div>
              </div>

              <div>
                <strong>Válasz:</strong> 4,8 óra alatt telik meg. 0,8 óra = 0,8 · 60 perc = 48 perc, tehát <strong>4 óra 48 perc</strong> szükséges.
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 8. Szekció: Gyakori Csapdahelyzetek */}
      <TheorySection
        number={8}
        title="Gyakori Csapdahelyzetek és Típustévesztések"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badge="Csapdák & Tévhitek"
        badgeColor="amber"
      >
        <TheoryTrapBox
          wrongExample="Ha egy autós 60 km/h-val megy oda, és 40 km/h-val jön vissza, az átlagsebessége (60 + 40) / 2 = 50 km/h."
          correctExample="Az átlagsebesség: v_átlag = Összes út / Összes idő! Mivel visszafelé több ideig ment, az átlagsebesség csak 48 km/h!"
          explanation="A sebességek számtani átlaga csak akkor lenne helyes, ha mindkét sebességgel pontosan ugyanannyi ideig haladt volna. Mivel az utak egyenlők, harmonikus átlagot kell számolni: 2·60·40 / (60 + 40) = 4800 / 100 = 48 km/h!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              1. Csapda: A percek és tizedesórák keverése
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha 1 óra 30 perc jön ki, azt képletbe <span className="font-bold text-blue-600">1,5</span>-ként kell beírni, nem 1,3-ként!
              Ha a végeredmény 2,2 óra, az 2 óra és 0,2 · 60 = <strong>12 perc</strong>, nem 2 óra 20 perc!
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Csapda: Munkavégzési idők összeadása
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha ketten együtt dolgoznak, a munkaidejük <strong>mindig rövidebb</strong>, mint bármelyikük egyedüli ideje! Sose add össze az órákat (6 óra + 4 óra ≠ 10 óra, hanem reciprok összeadás után 2,4 óra!).
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 9. Szekció: Szöveges Ellenőrzés és Mértékegység Egyeztetés */}
      <TheorySection
        number={9}
        title="Szöveges Ellenőrzés és Mértékegység Egyeztetés"
        icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
        badge="Összegzés"
        badgeColor="blue"
      >
        <TheoryCard
          title="A 3 Lépéses Ellenőrző Lista"
          badge="Checklist"
          badgeColor="blue"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Mértékegység koherencia:</strong> Ha a sebesség km/h-ban van megadva, az időt kötelező órában, az utat kilométerben tartani! Ha a sebesség m/s, az időnek másodpercben kell lennie (1 m/s = 3,6 km/h).
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Józansági próba:</strong> A találkozási idő nem lehet negatív. Az utolérésnél a gyorsabb nem érheti utol a lassabbat, ha a sebessége kisebb. Közös munkánál a közös időnek kisebbnek kell lennie a leggyorsabb egyedüli idejénél.
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Visszahelyettesítés az eredeti feladatszövegbe:</strong> Számold ki mindkét fél útját a kapott idővel, és add össze őket: kiadja a megadott távolságot?
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MotionWorkProblemsTheory;
