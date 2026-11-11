import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  CombinedRunningTrackSvg,
  SquareInscribedCircumscribedCircleSvg
} from './CirclePracticeFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Trophy,
  Sparkles,
  Maximize2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CirclePracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CirclePracticeTheory: React.FC<CirclePracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State: Stadion & Négyzet Modell ---
  const [activeTab, setActiveTab] = useState<'track' | 'square'>('track');

  // Stadion paraméterek:
  const [straightL, setStraightL] = useState<number>(84.39); // egyenes szakasz m
  const [innerR, setInnerR] = useState<number>(36.5); // belső kanyar sugár m
  const [laneWidth, setLaneWidth] = useState<number>(1.22); // sáv szélesség m

  // Négyzet paraméter:
  const [squareSideA, setSquareSideA] = useState<number>(10); // cm

  const PI = Math.PI;

  // Stadion számítások:
  // 1. sáv hossza (belső szegélytől 30 cm-re futnak a szabályok szerint, de elméletben 2L + 2*PI*r):
  const track1_perimeter = 2 * straightL + 2 * PI * innerR;
  const track1_area = 2 * innerR * straightL + PI * innerR * innerR;

  // 2. sáv sugara és hossza:
  const track2_R = innerR + laneWidth;
  const track2_perimeter = 2 * straightL + 2 * PI * track2_R;
  const stagger = track2_perimeter - track1_perimeter; // = 2 * PI * laneWidth

  // Négyzet számítások:
  const sqArea = squareSideA * squareSideA;
  const incircleR = squareSideA / 2;
  const incircleArea = PI * incircleR * incircleR;
  const circumcircleR = (squareSideA * Math.SQRT2) / 2;
  const circumcircleArea = PI * circumcircleR * circumcircleR;
  const wastePercent = ((sqArea - incircleArea) / sqArea) * 100;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Körszámítások és összetett síkidomok"
      subtitle="A futópálya (stadion) geometriája és a rajtelőny képlete, négyzetek és háromszögek beírt és körülírt körei, hulladékszámítás."
      themeColor="teal"
      pdfFilename="10_osztaly_osszetett_sikidomok_korok_gyakorlas_tananyag.pdf"
      quickRule={{
        label: 'ÖSSZETETT SÍKIDOMOK ÉS KÖRÖS ÖSSZEFÜGGÉSEK',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-teal-50/90 p-2.5 rounded-xl border border-teal-200">
              <span className="font-black text-teal-900 block mb-0.5">Kulcsképletek összetett alakzatokhoz:</span>
              <ul className="space-y-1 font-mono text-teal-950 mt-1">
                <li>• <strong>Futópálya kerülete:</strong> K = 2L + 2πr (2 egyenes + 1 teljes kör!)</li>
                <li>• <strong>Futópálya területe:</strong> T = 2rL + πr² (téglalap + 1 teljes kör!)</li>
                <li>• <strong>Rajtelőny sávonként:</strong> ΔK = 2π · w (csak a sávszélességtől függ!)</li>
                <li>• <strong>Négyzet beírt köre:</strong> r = a/2, <strong>körülírt köre:</strong> R = a√2 / 2</li>
                <li>• <strong>Derékszögű háromszög:</strong> r = (a + b - c)/2, R = c/2</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-tight font-medium">
              <strong>💡 FELBONTÁS ELVE:</strong> Bármely összetett síkidom területe kiszámítható egyszerű alapelemek (téglalapok, háromszögek, körcikkek) összegeként vagy különbségeként!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz az összetett körös feladatok megoldására?"
      practiceSubtitle="Teszteld a tudásodat a futópályák, beírt körök és összetett alakzatok kvízében!"
      interactiveSection={
        <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 border-2 border-teal-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500 text-slate-950 rounded-2xl shadow-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-teal-100">
                  Interaktív Összetett Geometriai Laboratórium
                </h3>
                <p className="text-xs text-teal-300/80">
                  Válassz modellt: elemezd az atlétikai pálya sávbeosztását, vagy a négyzet beírt és körülírt köreit!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'track' ? 'bg-teal-500 text-slate-950 font-bold border-teal-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('track')}
              >
                Atlétikai Pálya (Stadion)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'square' ? 'bg-teal-500 text-slate-950 font-bold border-teal-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('square')}
              >
                Négyzet &amp; Körök
              </Button>
            </div>
          </div>

          {activeTab === 'track' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Vezérlők */}
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-teal-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  Pálya méretei (hivatalos 400 m-es szabvány)
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Egyenes szakasz (L):</span>
                    <span className="font-mono text-cyan-300 font-bold">{straightL} m</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="110"
                    step="0.5"
                    value={straightL}
                    onChange={(e) => setStraightL(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Kanyar belső sugara (r):</span>
                    <span className="font-mono text-teal-300 font-bold">{innerR} m</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="50"
                    step="0.5"
                    value={innerR}
                    onChange={(e) => setInnerR(Number(e.target.value))}
                    className="w-full accent-teal-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Futósáv szélessége (w):</span>
                    <span className="font-mono text-amber-300 font-bold">{laneWidth} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="1.5"
                    step="0.02"
                    value={laneWidth}
                    onChange={(e) => setLaneWidth(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Számított eredmények és szemléltetés */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-800/60 space-y-1">
                    <span className="text-teal-400 font-bold block">1. Belső sáv kerülete:</span>
                    <p className="font-mono text-slate-200 text-base font-bold">
                      {track1_perimeter.toFixed(2)} m
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      2 · {straightL} + 2π · {innerR}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-1">
                    <span className="text-amber-400 font-bold block">2. Sáv hossza &amp; Rajtelőny:</span>
                    <p className="font-mono text-slate-200 text-base font-bold">
                      {track2_perimeter.toFixed(2)} m
                    </p>
                    <p className="text-[11px] text-emerald-400 font-bold">
                      Előny: +{stagger.toFixed(2)} m (2π · w)
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 block mb-1">A fizika és matematika csodája a stadionban:</strong>
                  A külső sávban futónak pontosan <span className="font-mono text-amber-300 font-bold">{stagger.toFixed(2)} méterrel</span> előrébb kell rajtolnia! 
                  Figyeld meg: a rajtelőny nagysága <strong>kizárólag a sáv szélességétől (w) függ</strong> (<MathText>{'\\Delta K = 2\\pi w'}</MathText>), 
                  az egyenesek hosszától teljesen független!
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Négyzet vezérlő */}
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-teal-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                  Négyzet mérete
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Oldalhossz (a):</span>
                    <span className="font-mono text-teal-300 font-bold">{squareSideA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    step="1"
                    value={squareSideA}
                    onChange={(e) => setSquareSideA(Number(e.target.value))}
                    className="w-full accent-teal-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Négyzet területe:</span>
                    <strong className="text-slate-100">{sqArea} cm²</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Beírt kör sugara (r = a/2):</span>
                    <strong className="text-cyan-300">{incircleR} cm</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Körülírt kör sugara (R = a√2/2):</span>
                    <strong className="text-purple-300">{circumcircleR.toFixed(2)} cm</strong>
                  </div>
                </div>
              </div>

              {/* Eredmények */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 space-y-1">
                    <span className="text-cyan-400 font-bold block">Beírt kör területe:</span>
                    <p className="font-mono text-slate-200 text-base font-bold">
                      {incircleArea.toFixed(2)} cm²
                    </p>
                    <p className="text-[11px] text-rose-300 font-bold">
                      Hulladék sarok: {wastePercent.toFixed(1)}%
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 space-y-1">
                    <span className="text-purple-400 font-bold block">Körülírt kör területe:</span>
                    <p className="font-mono text-slate-200 text-base font-bold">
                      {circumcircleArea.toFixed(2)} cm²
                    </p>
                    <p className="text-[11px] text-purple-300 font-bold">
                      Pontosan 2-szerese a beírt körnek!
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400 block mb-1">Aranyszabály:</strong>
                  A négyzet körülírt körének területe mindig <strong>pontosan a duplája</strong> a beírt kör területének, 
                  mivel a sugarak négyzeteinek aránya: <MathText>{'\\frac{R^2}{r^2} = \\frac{(a^2 \\cdot 2 / 4)}{(a^2 / 4)} = 2'}</MathText>!
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      {/* 1. Szakasz: Az összetett síkidomok felbontása */}
      <TheorySection
        id="osszetett-alakzatok-elve"
        number={1}
        title="Az összetett alakzatok felbontásának és kiegészítésének elve"
        badge="STRATÉGIA"
        badgeColor="teal"
      >
        <TheoryCard title="Hogyan számoljunk olyan alakzatokkal, amikre nincs közvetlen képlet?" color="teal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A való életben (építészet, gépészet, sportpályák) ritkán találkozunk szabályos körrel. Legtöbbször 
            <strong>egyenes szakaszok és körívek kombinációjából</strong> felépülő alakzatokkal dolgozunk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-900 dark:text-teal-200 block">1. Felbontás módszere:</span>
              <p className="text-slate-600 dark:text-slate-400">
                Az idomot darabokra vágjuk (téglalapok, háromszögek, félkörök), kiszámítjuk a darabok területét, majd összeadjuk őket.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <span className="font-bold text-cyan-900 dark:text-cyan-200 block">2. Kiegészítés módszere:</span>
              <p className="text-slate-600 dark:text-slate-400">
                Az idomot kiegészítjük egy nagyobb, egyszerű idommá (pl. befoglaló téglalap), és levonjuk belőle a "felesleges" sarkokat/lyukakat.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: A futópálya matematikája */}
      <TheorySection
        id="futopalya-matematika"
        number={2}
        title="Az atlétikai futópálya (stadion) geometriája"
        badge="STADION"
        badgeColor="emerald"
      >
        <TheoryCard title="Miért nem egy vonalban rajtolnak a 400 méteres futók?" color="emerald">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A standard futópálya két egyenesből (<MathText>{'L'}</MathText>) és két félkörívből (<MathText>{'r'}</MathText>) áll.
                A két félkörív együtt <strong>pontosan egy teljes körkerületet</strong> ad ki!
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-emerald-950 dark:text-emerald-300 font-bold space-y-1">
                <div>Kerület: <MathText>{'K = 2L + 2\\pi r'}</MathText></div>
                <div>Terület: <MathText>{'T = 2r \\cdot L + \\pi r^2'}</MathText></div>
              </div>
              <p>
                A 2. pályán futó versenyző kanyarsugara <MathText>{'r + w'}</MathText>, így az ő kerülete:
                <br />
                <MathText>{'K_2 = 2L + 2\\pi (r + w) = 2L + 2\\pi r + 2\\pi w = K_1 + 2\\pi w'}</MathText>.
              </p>
              <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 font-bold text-xs">
                A rajtelőny képlete: <MathText>{'\\Delta K = 2\\pi w'}</MathText>. Ha a sáv szélessége <MathText>{'w = 1{,}22\\text{ m}'}</MathText>, akkor <MathText>{'\\Delta K = 2 \\cdot \\pi \\cdot 1{,}22 \\approx 7{,}67\\text{ m}'}</MathText>!
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <CombinedRunningTrackSvg size={300} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Beírt és körülírt körök */}
      <TheorySection
        id="beirt-korulirt-korok"
        number={3}
        title="Négyzet és háromszögek beírt és körülírt körei"
        badge="SOKSZÖGEK KÖREI"
        badgeColor="indigo"
      >
        <TheoryCard title="A négyzet beírt és körülírt köre" color="indigo">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Egy <MathText>{'a'}</MathText> oldalú négyzetnél:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 font-mono text-xs">
                <li><strong>Beírt kör sugara:</strong> <MathText>{'r = \\frac{a}{2}'}</MathText> (érinti a 4 oldalt).</li>
                <li><strong>Körülírt kör sugara:</strong> Az átló fele! <MathText>{'R = \\frac{d}{2} = \\frac{a\\sqrt{2}}{2}'}</MathText> (átmegy a 4 csúcson).</li>
              </ul>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 block">Területek aránya:</span>
                <MathText>{'\\frac{T_{\\text{körül}}}{T_{\\text{be}}} = \\frac{\\pi R^2}{\\pi r^2} = \\frac{(a^2 \\cdot 2 / 4)}{(a^2 / 4)} = 2'}</MathText>!
                A körülírt kör területe pontosan a duplája a beírt kör területének!
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <SquareInscribedCircumscribedCircleSvg size={260} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Kidolgozott mintapélda */}
      <TheorySection
        id="gyakorlas-mintapeldak"
        number={4}
        title="Kidolgozott mintapéldák"
        badge="MINTAPÉLDÁK"
        badgeColor="teal"
      >
        <TheoryCard title="Mintapélda: Derékszögű háromszög beírt és körülírt köre" color="teal">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy derékszögű háromszög befogói <MathText>{'a = 6\\text{ cm}'}</MathText> és <MathText>{'b = 8\\text{ cm}'}</MathText>.
              Számítsuk ki a beírt kör és a körülírt kör sugarát!
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Megoldás:</span>
              <ol className="list-decimal list-inside space-y-1.5 font-mono text-xs">
                <li>
                  Átfogó kiszámítása Pitagorasz-tétellel: <MathText>{'c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = 10\\text{ cm}'}</MathText>.
                </li>
                <li>
                  Körülírt kör sugara Thálész-tétel miatt: az átfogó fele! <MathText>{'R = \\frac{c}{2} = \\frac{10}{2} = 5\\text{ cm}'}</MathText>.
                </li>
                <li>
                  Beírt kör sugara az elegáns képlettel:
                  <MathText>{'r = \\frac{a + b - c}{2} = \\frac{6 + 8 - 10}{2} = \\frac{4}{2} = 2\\text{ cm}'}</MathText>!
                </li>
              </ol>
              <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 font-bold text-xs">
                Válasz: A beírt kör sugara 2 cm, a körülírt kör sugara 5 cm.
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
