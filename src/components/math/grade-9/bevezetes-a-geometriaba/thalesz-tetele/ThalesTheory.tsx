// Updated ThalesTheory
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
  Triangle,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  Circle,
  HelpCircle,
  Move
} from 'lucide-react';
import {
  ThalesTheoremSVG,
  ThalesProofSVG,
  ThalesLocusSVG
} from './ThalesFigures';

interface ThalesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ThalesTheory: React.FC<ThalesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV THALÉSZ-KÖR ÉS LÁTÓSZÖG LABOR ÁLLAPOTOK ---
  const [angleDeg, setAngleDeg] = useState<number>(65); // C pont helyzete a körvonalon fokban
  const [radiusOffset, setRadiusOffset] = useState<number>(0); // 0 = pontosan a körön, < 0 belül, > 0 kívül

  // Számítások az interaktív diagramhoz:
  // Kör: O(180, 130), R = 80
  // A(100, 130), B(260, 130)
  const labData = useMemo(() => {
    const Ox = 180;
    const Oy = 130;
    const R = 80;
    const effectiveR = R + radiusOffset;

    const rad = (angleDeg * Math.PI) / 180;
    // Szög a felső félkörön: -180° és 0° között felfelé (SVG y lefelé nő)
    // angleDeg legyen 20° és 160° között
    const Cx = Ox - effectiveR * Math.cos(rad);
    const Cy = Oy - effectiveR * Math.sin(rad);

    const Ax = 100;
    const Ay = 130;
    const Bx = 260;
    const By = 130;

    // Vektorok C-ből A és B felé:
    const vCA_x = Ax - Cx;
    const vCA_y = Ay - Cy;
    const vCB_x = Bx - Cx;
    const vCB_y = By - Cy;

    // Skaláris szorzat és koszinusz a látószög pontos kiszámításához:
    const dot = vCA_x * vCB_x + vCA_y * vCB_y;
    const lenCA = Math.sqrt(vCA_x * vCA_x + vCA_y * vCA_y);
    const lenCB = Math.sqrt(vCB_x * vCB_x + vCB_y * vCB_y);
    const cosAngle = dot / (lenCA * lenCB);
    const currentAngle = (Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180) / Math.PI;

    let positionText = 'Pontosan a körvonalon fekszik (látószög = 90.0°)';
    let badgeColor = 'bg-indigo-100 text-indigo-900 border-indigo-300';
    if (radiusOffset < -2) {
      positionText = 'A körön BELÜL található (Tompaszög > 90°)';
      badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
    } else if (radiusOffset > 2) {
      positionText = 'A körön KÍVÜL található (Hegyesszög < 90°)';
      badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
    }

    return {
      Ax, Ay, Bx, By, Cx, Cy, Ox, Oy, R,
      currentAngle: Number(currentAngle.toFixed(1)),
      positionText,
      badgeColor,
      isRightAngle: Math.abs(radiusOffset) <= 2
    };
  }, [angleDeg, radiusOffset]);

  return (
    <TheoryTemplate
      title="10. Thalész tétele"
      subtitle="A geometria egyik legősibb alaptétele: az átmérőhöz tartozó kerületi szög derékszög, annak bizonyítása, megfordítása és a Thalész-kör"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-thalesz"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A Thalész-tétel és megfordítása egy pillantásra",
        formula: "C \\in k \\setminus \\{A, B\\} \\implies ACB\\angle = 90^\\circ \\quad \\Longleftrightarrow \\quad R = \\frac{c}{2}",
        rules: [
          "Thalész-tétel: Ha egy kör átmérőjének két végpontját (A és B) összekötjük a körvonal tetszőleges harmadik pontjával (C), akkor az ACB szög MINDIG derékszög (90°).",
          "Bizonyítás kulcsa: Az O körközéppont behúzásával a háromszög két egyenlő szárú háromszögre bomlik (OA = OB = OC = R). Így 2α + 2β = 180° => α + β = 90°.",
          "A tétel megfordítása: Minden derékszögű háromszög átfogója mint átmérő fölé rajzolt kör átmegy a derékszögű csúcson. A köré írt kör középpontja az átfogó felezőpontja (R = c / 2).",
          "Mértani hely: Azon pontok mértani helye a síkban, melyekből egy AB szakasz derékszögben látszik, az AB mint átmérő fölé rajzolt körvonal (az A és B pontok kivételével). A körön belül tompaszög, a körön kívül hegyesszög látható."
        ]
      }}
    >
      {/* 1. FEJEZET: A tétel kimondása */}
      <TheorySection
        title="1. A Thalész-tétel kimondása és története"
        badge="1. Alaptétel"
        color="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Milétoszi Thalész (i. e. 624 – 546) az ókori görög matematika és filozófia egyik első
              kiemelkedő alakja volt. A hagyomány szerint ő volt az első, aki nemcsak tapasztalati
              szabályként mondta ki, hanem logikai úton <strong>be is bizonyította</strong> a tételt.
            </p>

            <TheoryCard title="A Thalész-tétel kimondása" color="indigo">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                Ha egy kör átmérőjének két végpontját összekötjük a körvonal bármely más pontjával,
                akkor a kapott háromszögben az átmérővel szemközti szög derékszög ($90^\circ$).
              </p>
            </TheoryCard>

            <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <p className="font-bold text-indigo-900 dark:text-indigo-200">
                Modern megfogalmazás:
              </p>
              <p>A kör átmérőjéhez (félkörívéhez) tartozó kerületi szög mindig pontosan <strong>derékszög</strong>.</p>
              <p className="text-slate-500 dark:text-slate-400">
                (Feltétel: a $C$ pontnak a körvonalon kell lennie, de nem eshet egybe sem az $A$, sem a $B$ ponttal.)
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ThalesTheoremSVG />
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: A tétel elegáns bizonyítása */}
      <TheorySection
        title="2. A tétel szigorú bizonyítása két egyenlő szárú háromszöggel"
        badge="2. Bizonyítás"
        color="violet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <ThalesProofSVG />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A bizonyítás szépsége az egyszerűségében rejlik: egyetlen segédvonal behúzásával
              két olyan háromszöget kapunk, amelyek tulajdonságait már jól ismerjük.
            </p>

            <TheoryCard title="A bizonyítás lépései" color="violet">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>1. Lépés:</strong> Kössük össze a kör középpontját ($O$) a körvonalon lévő $C$ csúccsal!
                  Mivel $A, B$ és $C$ is a körvonalon van, az $OA, OB$ és $OC$ szakaszok mind a kör sugarai:
                  $|OA| = |OB| = |OC| = R$.
                </p>
                <p>
                  <strong>2. Lépés:</strong> Az $AOC$ háromszög egyenlő szárú ($OA = OC$), így az alapon fekvő
                  két szöge egyenlő: $OAC\angle = OCA\angle = \alpha$.
                </p>
                <p>
                  <strong>3. Lépés:</strong> A $BOC$ háromszög szintén egyenlő szárú ($OB = OC$), így az alapon fekvő
                  két szöge szintén egyenlő: $OBC\angle = OCB\angle = \beta$.
                </p>
                <p>
                  <strong>4. Lépés:</strong> Az egész $ABC$ háromszög belső szögeinek összege $180^\circ$:
                </p>
                <div className="p-2 bg-white dark:bg-slate-900 rounded border border-violet-300 dark:border-violet-700 text-center font-mono font-bold text-violet-900 dark:text-violet-200">
                  \alpha + \beta + (\alpha + \beta) = 180^\circ \implies 2(\alpha + \beta) = 180^\circ \implies \alpha + \beta = 90^\circ
                </div>
                <p className="font-semibold text-violet-800 dark:text-violet-300 text-center">
                  Mivel a $C$-nél lévő szög éppen $\gamma = \alpha + \beta$, ezért $\gamma = 90^\circ$. Ezzel a tételt bebizonyítottuk!
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: A tétel megfordítása és a körülírt kör sugara */}
      <TheorySection
        title="3. A tétel megfordítása és derékszögű háromszögek"
        badge="3. Megfordítás & Következmény"
        color="purple"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A matematikában egy tétel igazsága nem garantálja a megfordításának igazságát.
            A Thalész-tétel esetében azonban a <strong>megfordítás is kivétel nélkül igaz</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="A Thalész-tétel megfordítása" color="purple">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha egy háromszög derékszögű, akkor az átfogóját mint átmérőt körbe foglalva
                a derékszögű csúcs illeszkedik a körvonalra.
              </p>
            </TheoryCard>

            <TheoryCard title="Közvetlen következmények derékszögű háromszögre" color="indigo">
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <li>• <strong>Körülírt kör középpontja (O):</strong> Mindig az átfogó pontos felezőpontja.</li>
                <li>• <strong>Körülírt kör sugara (R):</strong> Mindig az átfogó fele: $R = c/2$.</li>
                <li>• <strong>Átfogóhoz tartozó súlyvonal:</strong> Hossza megegyezik a sugárral: $s_c = R = c/2$.</li>
              </ul>
            </TheoryCard>
          </div>

          <TheoryCallout type="tip" title="Gyakorlati alkalmazás derékszög szerkesztésére">
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Thalész tétele a legegyszerűbb módszert adja derékszögek szerkesztésére vonalzóval és körzővel:
              rajzolunk egy tetszőleges kört egy átmérővel, és az átmérő két végét összekötjük a kör bármely pontjával – a keletkezett szög garantáltan $90^\circ$!
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: Thalész-kör mint mértani hely és látószögek */}
      <TheorySection
        title="4. A Thalész-kör mint mértani hely és a látószögek"
        badge="4. Mértani hely"
        color="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy szakasz <strong>látószöge</strong> egy $P$ pontból az a szög, amelyet a szakasz
              végpontjait a $P$ ponttal összekötő félegyenesek zárnak be ($APB\angle$).
            </p>

            <TheoryCard title="Derékszögű látószög mértani helye" color="emerald">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A sík azon pontjainak mértani helye, amelyekből egy adott $AB$ szakasz <strong>derékszögben látszik</strong>,
                az $AB$ szakasz mint átmérő fölé rajzolt körvonal, kivéve magukat az $A$ és $B$ végpontokat.
              </p>
            </TheoryCard>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <p className="font-bold text-emerald-900 dark:text-emerald-200">
                A pont helyzete és a látószög nagysága:
              </p>
              <ul className="space-y-1">
                <li>• <strong>A körön rajta:</strong> A látószög pontosan $90^\circ$ (derékszög).</li>
                <li>• <strong>A körön belül:</strong> A látószög nagyobb $90^\circ$-nál ($&gt; 90^\circ$, tompaszög).</li>
                <li>• <strong>A körön kívül:</strong> A látószög kisebb $90^\circ$-nál ($&lt; 90^\circ$, hegyesszög).</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <ThalesLocusSVG />
          </div>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Interaktív Thalész-kör és Látószög Labor */}
      <TheorySection
        title="5. Interaktív Thalész-kör és Látószög Szimuláció"
        badge="Élő kísérleti labor"
        color="indigo"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                Dinamikus Thalész-kör Vizsgáló
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mozgasd a C csúcsot a köríven, vagy tologasd a körön kívülre/belülre a látószög megfigyeléséhez!
              </p>
            </div>

            {/* Állapotjelző jelvény */}
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${labData.badgeColor}`}>
              {labData.positionText}
            </div>
          </div>

          {/* Vezérlő csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-indigo-600" />
                  C csúcs körív-pozíciója:
                </span>
                <span className="font-mono text-indigo-700 dark:text-indigo-300">{angleDeg}°</span>
              </div>
              <input
                type="range"
                min="20"
                max="160"
                step="2"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Circle className="w-3.5 h-3.5 text-indigo-600" />
                  Helyzet a körhöz képest:
                </span>
                <span className="font-mono text-indigo-700 dark:text-indigo-300">
                  {radiusOffset === 0 ? 'Pontosan a körön' : radiusOffset > 0 ? `Kívül (+${radiusOffset} px)` : `Belül (${radiusOffset} px)`}
                </span>
              </div>
              <input
                type="range"
                min="-35"
                max="35"
                step="1"
                value={radiusOffset}
                onChange={(e) => setRadiusOffset(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* SVG vászon és számítási adatok rácsban */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG szimuláció */}
            <div className="lg:col-span-7 flex justify-center">
              <svg
                viewBox="0 0 360 250"
                className="w-full max-w-md h-auto bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 p-2 shadow-inner"
              >
                {/* Thalész-kör alapkontúr */}
                <circle
                  cx={labData.Ox}
                  cy={labData.Oy}
                  r={labData.R}
                  fill="rgba(99, 102, 241, 0.04)"
                  stroke="#6366f1"
                  strokeWidth="2"
                />

                {/* Átmérő AB */}
                <line
                  x1={labData.Ax}
                  y1={labData.Ay}
                  x2={labData.Bx}
                  y2={labData.By}
                  stroke="#1e1b4b"
                  strokeWidth="2.5"
                />

                {/* Háromszög szakaszai AC és BC */}
                <line
                  x1={labData.Ax}
                  y1={labData.Ay}
                  x2={labData.Cx}
                  y2={labData.Cy}
                  stroke={labData.isRightAngle ? '#4f46e5' : radiusOffset < 0 ? '#dc2626' : '#2563eb'}
                  strokeWidth="2"
                />
                <line
                  x1={labData.Bx}
                  y1={labData.By}
                  x2={labData.Cx}
                  y2={labData.Cy}
                  stroke={labData.isRightAngle ? '#4f46e5' : radiusOffset < 0 ? '#dc2626' : '#2563eb'}
                  strokeWidth="2"
                />

                {/* Ha derékszög, magyar derékszög-jelölés a C csúcsban, dinamikusan az AC és BC szárakhoz igazítva */}
                {labData.isRightAngle && (() => {
                  const dCA = Math.hypot(labData.Ax - labData.Cx, labData.Ay - labData.Cy) || 1;
                  const dCB = Math.hypot(labData.Bx - labData.Cx, labData.By - labData.Cy) || 1;
                  const uAx = (labData.Ax - labData.Cx) / dCA;
                  const uAy = (labData.Ay - labData.Cy) / dCA;
                  const uBx = (labData.Bx - labData.Cx) / dCB;
                  const uBy = (labData.By - labData.Cy) / dCB;
                  const r = 14;
                  const p1x = labData.Cx + uAx * r;
                  const p1y = labData.Cy + uAy * r;
                  const p2x = labData.Cx + uBx * r;
                  const p2y = labData.Cy + uBy * r;
                  const cp = uAx * uBy - uAy * uBx;
                  const sweep = cp > 0 ? 1 : 0;
                  const dotDist = r * 0.55;
                  const dotX = labData.Cx + (uAx + uBx) * dotDist * 0.7071;
                  const dotY = labData.Cy + (uAy + uBy) * dotDist * 0.7071;
                  return (
                    <g>
                      <path
                        d={`M ${p1x} ${p1y} A ${r} ${r} 0 0 ${sweep} ${p2x} ${p2y}`}
                        fill="none"
                        stroke="#4338ca"
                        strokeWidth="1.3"
                      />
                      <circle cx={dotX} cy={dotY} r="1.3" fill="#4338ca" />
                    </g>
                  );
                })()}

                {/* Pontok és feliratok */}
                <circle cx={labData.Ax} cy={labData.Ay} r="4" fill="#0f172a" />
                <text x={labData.Ax - 15} y={labData.Ay + 5} fontSize="11" fontWeight="bold" fill="#0f172a">A</text>

                <circle cx={labData.Bx} cy={labData.By} r="4" fill="#0f172a" />
                <text x={labData.Bx + 8} y={labData.Ay + 5} fontSize="11" fontWeight="bold" fill="#0f172a">B</text>

                <circle cx={labData.Ox} cy={labData.Oy} r="3.5" fill="#6366f1" />
                <text x={labData.Ox} y={labData.Oy + 15} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#6366f1">O</text>

                <circle
                  cx={labData.Cx}
                  cy={labData.Cy}
                  r="5"
                  fill={labData.isRightAngle ? '#4338ca' : radiusOffset < 0 ? '#dc2626' : '#2563eb'}
                />
                <text
                  x={labData.Cx}
                  y={labData.Cy - 10}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill={labData.isRightAngle ? '#4338ca' : radiusOffset < 0 ? '#dc2626' : '#2563eb'}
                >
                  C ({labData.currentAngle}°)
                </text>
              </svg>
            </div>

            {/* Információs kártyák */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3.5 bg-indigo-50/70 dark:bg-slate-800/80 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block mb-1">
                  Mért Látószög (ACB∠):
                </span>
                <p className="text-2xl font-mono font-bold text-indigo-700 dark:text-indigo-200">
                  {labData.currentAngle}°
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {labData.isRightAngle
                    ? 'A Thalész-tétel értelmében a szög szigorúan pontosan 90.0°!'
                    : radiusOffset < 0
                    ? 'Mivel C a körön belülre került, a szög tompaszöggé vált (> 90°).'
                    : 'Mivel C a körön kívülre került, a szög hegyesszöggé vált (< 90°).'}
                </p>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <strong className="text-slate-900 dark:text-white block">Tétel összefoglalása:</strong>
                <p>• Ha $C$ a körön van: $ACB\angle = 90^\circ$.</p>
                <p>• Ha $C$ a körön belül van: $ACB\angle &gt; 90^\circ$.</p>
                <p>• Ha $C$ a körön kívül van: $ACB\angle &lt; 90^\circ$.</p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* CSAPDÁK ÉS TIPUSHIBAK */}
      <TheoryTrapBox
        traps={[
          {
            title: "A Thalész-tétel csak a felső félkörre érvényes?",
            description: "NEM! A körvonal bármely pontjára érvényes, az alsó félkörön fekvő pontokra is! Mindkét félköríven pontosan 90 fokos szög keletkezik.",
            severity: "critical"
          },
          {
            title: "A tétel feltétele: AB-nek ÁTMÉRŐNEK kell lennie!",
            description: "Gyakori hiba tetszőleges húrra alkalmazni a tételt. Ha a körben felvett szakasz NEM megy át a középponton (tehát rövidebb az átmérőnél), akkor a hozzá tartozó kerületi szög NEM 90 fok lesz, hanem hegyesszög vagy tompaszög!",
            severity: "critical"
          },
          {
            title: "A végpontok (A és B) kizárása",
            description: "Mértani helyként a körvonalról ki kell zárni magukat az A és B pontokat, mert a végpontokban nem keletkezik háromszög (nem értelmezhető az ACB szög).",
            severity: "warning"
          },
          {
            title: "Körülírt kör sugara derékszögű háromszögben",
            description: "Ne felejtsd el: derékszögű háromszögben a körülírt kör sugara mindig az ÁTFOGÓ FELE (R = c/2), nem pedig valamelyik befogóé!",
            severity: "info"
          }
        ]}
      />

      {/* ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheoryTable
        title="A Thalész-tétel és a látószögek összefoglaló táblázata"
        headers={["C pont helyzete a síkban", "Látószög nagysága (ACB∠)", "Háromszög fajtája", "Főbb geometriai összefüggés"]}
        rows={[
          [
            "Pontosan a Thalész-körön (kivéve A, B)",
            "ACB∠ = 90°",
            "Derékszögű háromszög",
            "R = c / 2, a² + b² = c² (Pitagorasz-tétel)"
          ],
          [
            "A Thalész-körön belül",
            "ACB∠ > 90°",
            "Tompaszögű háromszög",
            "a² + b² < c² (a tompaszöggel szemközti oldalra)"
          ],
          [
            "A Thalész-körön kívül",
            "ACB∠ < 90°",
            "Hegyesszögű háromszög",
            "a² + b² > c² (ha c a leghosszabb oldal)"
          ],
          [
            "Egybeesik az A vagy B ponttal",
            "Nem értelmezhető",
            "Nem alkot háromszöget",
            "Kizárt pontok a mértani helyből"
          ]
        ]}
      />
    </TheoryTemplate>
  );
};
