// Updated ThalesAppsTheory
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
  Move,
  Calculator
} from 'lucide-react';
import {
  TangentConstructionSVG,
  TangentLengthPythagorasSVG,
  RightTriangleConstructionSVG
} from './ThalesAppsFigures';

interface ThalesAppsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ThalesAppsTheory: React.FC<ThalesAppsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ÉRINTŐSZERKESZTŐ ÉS THALÉSZ LABOR ÁLLAPOTOK ---
  const [distD, setDistD] = useState<number>(10); // OP távolság (cm)
  const [radiusR, setRadiusR] = useState<number>(6); // kör sugara r (cm)

  // Élő számítások az érintőhöz
  const calcData = useMemo(() => {
    const d = distD;
    const r = Math.min(radiusR, d - 0.5); // r-nek kisebbnek kell lennie d-nél, hogy P külső pont legyen!
    const e = Math.sqrt(d * d - r * r); // érintőszakasz hossza
    const thalesRadius = d / 2;
    const alphaRad = Math.asin(r / d);
    const alphaDeg = (alphaRad * 180) / Math.PI; // fél-nyílásszög
    const fullAngle = 2 * alphaDeg; // a két érintő közötti szög P-nél
    const areaDeltoid = r * e; // deltoid területe = 2 * (r * e / 2)

    return {
      d: d.toFixed(1),
      r: r.toFixed(1),
      e: e.toFixed(2),
      thalesRadius: thalesRadius.toFixed(1),
      halfAngle: alphaDeg.toFixed(1),
      fullAngle: fullAngle.toFixed(1),
      areaDeltoid: areaDeltoid.toFixed(2)
    };
  }, [distD, radiusR]);

  return (
    <TheoryTemplate
      title="11. A Thalész-tétel alkalmazásai"
      subtitle="Körhöz külső pontból húzott érintők megszerkesztése, érintőszakaszok tétele, derékszögű háromszögek konstrukciója"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-thalesz-alkalmazas"
      themeColor="blue"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A legfontosabb szerkesztési és számítási szabályok",
        formula: "|PE_1| = |PE_2| = \\sqrt{d^2 - r^2} \\quad \\text{és} \\quad OE_1 \\perp PE_1",
        rules: [
          "Érintő szerkesztése külső pontból: Az OP szakasz mint átmérő fölé rajzolt Thalész-kör metszi az eredeti k(O, r) kört az E_1 és E_2 érintési pontokban. Mivel az érintő merőleges az érintési sugárra, a Thalész-tétel garantálja a derékszöget!",
          "Érintőszakaszok egyenlősége: Külső pontból egy körhöz húzott két érintőszakasz hossza mindig egyenlő: |PE_1| = |PE_2|.",
          "Pitagorasz-tétel az érintőre: Az O - E_1 - P derékszögű háromszögben: r² + e² = d² => e = √(d² - r²).",
          "Derékszögű háromszög szerkesztése átfogóból és magasságból: Csak akkor szerkeszthető meg, ha a magasság nem haladja meg a Thalész-kör sugarát: m_c ≤ c / 2."
        ]
      }}
    >
      {/* 1. FEJEZET: Érintők szerkesztése külső pontból */}
      <TheorySection
        title="1. Érintők szerkesztése külső pontból Thalész-körrel"
        badge="1. Fő szerkesztés"
        color="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy körhöz a körön kívül fekvő $P$ pontból pontosan <strong>két érintő egyenes</strong> húzható.
              Az érintési pontok pontos helyét nem lehet puszta szemrevételezéssel megállapítani;
              a szerkesztés kulcsa a <strong>Thalész-tétel</strong>!
            </p>

            <TheoryCard title="Az 5 lépéses érintőszerkesztési algoritmus" color="blue">
              <ol className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-decimal list-inside">
                <li><strong>Összekötés:</strong> Kössük össze a külső $P$ pontot a kör $O$ középpontjával ($OP$ szakasz).</li>
                <li><strong>Felezés:</strong> Szerkesszük meg az $OP$ szakasz $F$ felezőpontját!</li>
                <li><strong>Thalész-kör rajzolása:</strong> Rajzoljunk kört $F$ középponttal, $|FO| = |FP| = d/2$ sugárral!</li>
                <li><strong>Érintési pontok kijelölése:</strong> A Thalész-kör és az eredeti kör metszéspontjai adják az $E_1$ és $E_2$ érintési pontokat.</li>
                <li><strong>Érintők meghúzása:</strong> A $PE_1$ és $PE_2$ egyenesek a keresett érintők.</li>
              </ol>
            </TheoryCard>

            <TheoryCallout type="info" title="Miért működik a szerkesztés?">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                A kör érintője az érintési pontban <strong>merőleges</strong> az érintési sugárra ($OE_1 \perp PE_1$).
                Ez azt jelenti, hogy az $OE_1P$ szögnek pontosan $90^\circ$-nak kell lennie.
                A Thalész-tétel szerint pedig az $OP$ átmérő fölé rajzolt kör minden pontjából derékszög látszik!
              </p>
            </TheoryCallout>
          </div>

          <div className="flex justify-center">
            <TangentConstructionSVG />
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Érintőszakaszok egyenlősége és a deltoid */}
      <TheorySection
        title="2. Az érintőszakaszok tétele és az O-E1-P-E2 deltoid"
        badge="2. Alaptétel"
        color="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <TangentLengthPythagorasSVG />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Az érintési pont és a külső pont közötti szakaszt <strong>érintőszakasznak</strong> ($e$) nevezzük.
            </p>

            <TheoryCard title="Az érintőszakaszok tétele" color="emerald">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Egy külső pontból a körhöz húzott két érintőszakasz hossza megegyezik:
                </p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-700 font-mono text-center font-bold text-sm text-emerald-800 dark:text-emerald-200">
                  |PE₁| = |PE₂| = e = √(d² - r²)
                </div>
                <p>
                  ahol $d = |OP|$ a pont és a középpont távolsága, $r$ pedig a kör sugara.
                </p>
              </div>
            </TheoryCard>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Az érintőnégyszög (deltoid) szimmetriája:</p>
              <p>• Az $OE_1PE_2$ négyszög egy tengelyesen szimmetrikus <strong>deltoid</strong>, melynek szimmetriatengelye az $OP$ egyenes.</p>
              <p>• Az $OP$ egyenes egyben a két érintő által bezárt szög <strong>szögfelezője</strong>!</p>
              <p>• A deltoid területe: T = 2 · (r · e) / 2 = r · e.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: Derékszögű háromszögek szerkesztése */}
      <TheorySection
        title="3. Derékszögű háromszögek szerkesztési feladatai"
        badge="3. Geometriai konstrukciók"
        color="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Mivel a derékszögű háromszög $C$ csúcsa mindig rajta van az átfogó fölé rajzolt Thalész-körön,
              számos összetett szerkesztés visszavezethető a Thalész-kör és egy másik alakzat metszésére.
            </p>

            <TheoryCard title="Szerkesztés: Adott c átfogó és m_c magasság" color="amber">
              <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <p>1. Felvesszük a $c = AB$ átfogót, és megrajzoljuk fölé a Thalész-félkört ($R = c/2$).</p>
                <p>2. Az $AB$-vel párhuzamos egyenest húzunk tőle $m_c$ távolságra.</p>
                <p>3. A párhuzamos és a Thalész-kör metszéspontja adja a $C$ csúcsot.</p>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-700 font-bold text-amber-900 dark:text-amber-200 mt-1">
                  Megoldhatóság feltétele: $m_c \le c/2$ (ha $m_c &gt; c/2$, nincs megoldás!).
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Szerkesztés: Adott c átfogó és a befogó" color="teal">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Felvesszük a $c = AB$ átfogót és a Thalész-kört. A $B$ csúcsból $a$ sugarú körívet húzunk.
                Ahol a körív metszi a Thalész-kört, ott van a $C$ csúcs!
              </p>
            </TheoryCard>
          </div>

          <div className="flex justify-center">
            <RightTriangleConstructionSVG />
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: Gyakorlati és látószöges alkalmazások */}
      <TheorySection
        title="4. Gyakorlati alkalmazások: Látószögek és navigáció"
        badge="4. Életbeli példák"
        color="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
              🚢
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tengeri navigáció</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Két világítótorony ($A$ és $B$) közötti szög mérésével a hajó meghatározhatja pozícióját.
              Ha a szög pontosan $90^\circ$, a hajó biztosan a két világítótorony mint átmérő fölé rajzolt Thalész-körön halad.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
              📷
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Kamera látószöge</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egy $90^\circ$-os nagylátószögű kamera egy színpadi előteret ($AB$) pontosan akkor lát be teljes
              szélességében, ha a kamera a színpad mint átmérő fölé rajzolt körön helyezkedik el.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
              ⚽
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Gólhelyzet vizsgálata</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A kapufa két sarka ($A$ és $B$) közötti kapura lövési szög a Thalész-körön belül tompaszög (&gt; 90°),
              a körön derékszög (90°), a körön kívül pedig egyre kisebb hegyesszög.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Interaktív Érintőszerkesztő és Thalész Labor */}
      <TheorySection
        title="5. Interaktív Érintőszakasz és Thalész Labor"
        badge="Élő szimuláció"
        color="blue"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Dinamikus Érintőszakasz Kalkulátor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Állítsd be az O középpont és a külső P pont távolságát, valamint a kör sugarát, és figyeld az érintőszakasz alakulását!
              </p>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>P pont távolsága a középponttól (d = |OP|):</span>
                <span className="font-mono text-blue-700 dark:text-blue-300">{distD} cm</span>
              </div>
              <input
                type="range"
                min="7"
                max="25"
                step="0.5"
                value={distD}
                onChange={(e) => setDistD(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Kör sugara (r):</span>
                <span className="font-mono text-blue-700 dark:text-blue-300">{radiusR} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="0.5"
                value={radiusR}
                onChange={(e) => setRadiusR(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Eredménykártyák élő adatokkal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 bg-blue-50/70 dark:bg-slate-800/80 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 block mb-0.5">Érintőszakasz (e)</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{calcData.e} cm</strong>
            </div>

            <div className="p-3 bg-violet-50/70 dark:bg-slate-800/80 rounded-xl border border-violet-200 dark:border-violet-800 text-center">
              <span className="text-[10px] uppercase font-bold text-violet-800 dark:text-violet-300 block mb-0.5">Thalész-sugár</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{calcData.thalesRadius} cm</strong>
            </div>

            <div className="p-3 bg-emerald-50/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">Fél-nyílásszög</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{calcData.halfAngle}°</strong>
            </div>

            <div className="p-3 bg-amber-50/70 dark:bg-slate-800/80 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block mb-0.5">Teljes Érintőszög</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{calcData.fullAngle}°</strong>
            </div>

            <div className="p-3 bg-pink-50/70 dark:bg-slate-800/80 rounded-xl border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-[10px] uppercase font-bold text-pink-800 dark:text-pink-300 block mb-0.5">Deltoid területe</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{calcData.areaDeltoid} cm²</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* CSAPDÁK ÉS TIPUSHIBAK */}
      <TheoryTrapBox
        traps={[
          {
            title: "Pont a körvonalon vagy a körön belül?",
            description: "Ha a P pont a körvonalon van, csak 1 érintő húzható hozzá (amely merőleges a sugárra a P-ben). Ha P a KÖRÖN BELÜL van, akkor egyáltalán NEM húzható érintő a körhöz!",
            severity: "critical"
          },
          {
            title: "Derékszögű háromszög magassági korlátja",
            description: "Ha adott a c átfogó és az m_c magasság, a feladatnak csak akkor van megoldása, ha m_c ≤ c / 2. Ha a magasság nagyobb a Thalész-kör sugaránál, a párhuzamos egyenes elkerüli a kört, nincs metszéspont!",
            severity: "critical"
          },
          {
            title: "Az átfogó és a befogó felcserélése a Pitagorasz-tételben",
            description: "Az érintős háromszögben (OEP) az átfogó a d = OP szakasz (nem az érintő és nem a sugár!). Ezért: e² + r² = d², vagyis e = √(d² - r²).",
            severity: "warning"
          },
          {
            title: "Melyik szakasz fölé kell rajzolni a Thalész-kört?",
            description: "Gyakori tévedés magának a körnek az átmérője fölé Thalész-kört rajzolni. Az érintőszerkesztésnél az OP szakasz (középpont és külső pont) fölé kell rajzolni a Thalész-kört!",
            severity: "warning"
          }
        ]}
      />

      {/* ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheoryTable
        title="A Thalész-tétel alkalmazásainak összefoglalása"
        headers={["Alkalmazási feladat", "Melyik szakasz az átmérő?", "Metsző alakzat", "Főbb matematikai összefüggés"]}
        rows={[
          [
            "Érintők szerkesztése külső P pontból",
            "d = OP szakasz (középpont és külső pont)",
            "Eredeti k(O, r) körvonal",
            "|PE_1| = |PE_2| = √(d² - r²),  OE ⟂ PE"
          ],
          [
            "Derékszögű háromszög szerkesztése (c és m_c)",
            "c = AB átfogó",
            "c-vel párhuzamos, m_c távolságú egyenes",
            "Megoldhatóság: m_c ≤ c / 2"
          ],
          [
            "Derékszögű háromszög szerkesztése (c és a)",
            "c = AB átfogó",
            "B csúcs körüli a sugarú körív",
            "a² + b² = c² (Pitagorasz-tétel)"
          ],
          [
            "Derékszögű látószög mértani helye",
            "Adott AB szakasz",
            "Maga a Thalész-körvonal",
            "A és B pontok kivételével minden pontból 90°"
          ]
        ]}
      />
    </TheoryTemplate>
  );
};

