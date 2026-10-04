import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Award,
  BookOpen,
  Box,
  Calculator,
  CheckCircle2,
  Compass,
  GitCompare,
  HelpCircle,
  Layers,
  Maximize2,
  RotateCcw,
  Scale,
  Shapes,
  Sliders,
  Sparkle,
  Sparkles,
  Square,
  Triangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface Chapter5PythagorasSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const Chapter5PythagorasSummaryTheory: React.FC<Chapter5PythagorasSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ÁLLAPOTOK ---
  const [activeTab, setActiveTab] = useState<'2d' | '3d' | 'classifier'>('2d');

  // 1. 2D Síkbeli alakzat kalkulátor
  const [shape2D, setShape2D] = useState<'rect' | 'square' | 'equilateral' | 'rhombus'>('rect');
  const [dimA, setDimA] = useState<number>(6);
  const [dimB, setDimB] = useState<number>(8);

  // Számítások 2D-hez
  const rectDiag = Math.sqrt(dimA * dimA + dimB * dimB);
  const squareDiag = dimA * Math.SQRT2;
  const equilateralHeight = (dimA * Math.sqrt(3)) / 2;
  const equilateralArea = (dimA * dimA * Math.sqrt(3)) / 4;
  const rhombusSide = Math.sqrt((dimA / 2) ** 2 + (dimB / 2) ** 2);

  // 2. 3D Térbeli test kalkulátor
  const [boxA, setBoxA] = useState<number>(3);
  const [boxB, setBoxB] = useState<number>(4);
  const [boxC, setBoxC] = useState<number>(12);

  const faceDiag = Math.sqrt(boxA * boxA + boxB * boxB);
  const spaceDiag = Math.sqrt(boxA * boxA + boxB * boxB + boxC * boxC);

  // 3. Háromszög Osztályozó a Megfordítással
  const [sideX, setSideX] = useState<number>(5);
  const [sideY, setSideY] = useState<number>(12);
  const [sideZ, setSideZ] = useState<number>(13);

  const sidesSorted = [sideX, sideY, sideZ].sort((m, n) => m - n);
  const s1 = sidesSorted[0];
  const s2 = sidesSorted[1];
  const s3 = sidesSorted[2];

  const isValidTriangle = s1 + s2 > s3;
  const sumSq = s1 * s1 + s2 * s2;
  const maxSq = s3 * s3;

  let classifiedType = 'Érvénytelen';
  if (!isValidTriangle) {
    classifiedType = 'Nem háromszög (háromszög-egyenlőtlenség sérül)';
  } else if (sumSq === maxSq) {
    classifiedType = 'Derékszögű háromszög (Pitagorasz-tétel teljesül)';
  } else if (sumSq > maxSq) {
    classifiedType = 'Hegyesszögű háromszög (c² < a² + b²)';
  } else {
    classifiedType = 'Tompaszögű háromszög (c² > a² + b²)';
  }

  return (
    <TheoryTemplate
      title="V. Fejezet Összefoglalás: A Pitagorasz-tétel és Alkalmazásai"
      subtitle="A sík- és térgeometria teljes modellkatalógusa: képletek, megfordítás, síkidomok, térbeli testátlók és felvételi módszerek"
      badge="8. Osztály • V. Fejezet Összefoglalás"
      topicBadge="🏆 V. Fejezet • Teljes Összefoglaló"
      badgeText="8. Osztály • Pitagorasz-tétel"
      themeColor="amber"
      grade="8. Osztály"
      difficulty="Átfogó Fejezeti Tudástár"
      estimatedTime="35-40 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A FEJEZET HÁROM ALAPTÖRVÉNYE',
        formula: '1. a² + b² = c²  |  2. Megfordítás: c² ? a² + b²  |  3. Nevezetes: c = a · √2, a = c/2'
      }}
    >
      {/* KIEMELT FEJEZETI ARANYSZABÁLYOK BANNER */}
      <div className="rounded-3xl border-2 border-amber-300 dark:border-amber-800 bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-yellow-50/80 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-slate-900 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300">
          <Sparkle className="w-5 h-5 flex-shrink-0 animate-pulse text-amber-600" />
          <span className="font-extrabold uppercase tracking-wider text-xs sm:text-sm">
            V. Fejezet Nagy Áttekintője • A Sík- és Térbeli Számítások Alapköve
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* 1. Kártya */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/80 shadow-2xs space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              <Triangle className="w-3 h-3" />
              Alaptétel & Megfordítás
            </span>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-400">
              <MathText>a² + b² = c²</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Derékszögű háromszögben a két befogó négyzetösszege az átfogó négyzete.
              Ha c² = a² + b² ⟹ derékszögű. Ha c² &lt; a²+b² ⟹ hegyesszögű. Ha c² &gt; a²+b² ⟹ tompaszögű.
            </p>
          </div>

          {/* 2. Kártya */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 border border-orange-200 dark:border-orange-800/80 shadow-2xs space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
              <Shapes className="w-3 h-3" />
              Síkgeometriai Modellek
            </span>
            <div className="text-lg font-bold text-orange-700 dark:text-orange-400">
              <MathText>d = a · √2 &nbsp;|&nbsp; m = (a · √3) / 2</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <MathText>Négyzet átlója: a · √2. Szabályos háromszög magassága: (a · √3) / 2, területe: (a² · √3) / 4.</MathText>
              Rombusz és trapéz derékszögű háromszögekre bontása.
            </p>
          </div>

          {/* 3. Kártya */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 border border-rose-200 dark:border-rose-800/80 shadow-2xs space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
              <Box className="w-3 h-3" />
              Térbeli Testátlók
            </span>
            <div className="text-lg font-bold text-rose-700 dark:text-rose-400">
              <MathText>D = √(a² + b² + c²)</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <MathText>Kocka lapátlója d = a · √2, testátlója D = a · √3.</MathText>
              Téglatest testátlója a három él négyzetösszegének gyöke.
            </p>
          </div>
        </div>
      </div>

      {/* 1. RÉSZ: ALAPTÉTEL ÉS MEGFORDÍTÁS */}
      <TheorySection
        title="1. A Pitagorasz-tétel és Megfordítása"
        subtitle="Az alapösszefüggés, pitagoraszi számhármasok és a háromszögek szög szerinti osztályozása"
        icon={<Triangle className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="A Pitagorasz-tétel Lényege"
            badge="Alaptétel"
            badgeColor="amber"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              Bármely derékszögű háromszögben a két befogó (a és b) négyzetének összege egyenlő az átfogó (c) négyzetével.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li><MathText>• Átfogó kiszámítása: c = √(a² + b²)</MathText></li>
              <li><MathText>• Befogó kiszámítása: a = √(c² - b²)</MathText></li>
              <li><MathText>• Két befogó szorzata: 2 · T = a · b = c · m_c</MathText></li>
            </ul>
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-950 dark:text-amber-200 border border-amber-200 font-sans">
              <strong>Fontos pitagoraszi számhármasok:</strong> (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), (20, 21, 29). Ezek többszörösei (pl. 6-8-10) is derékszögűek!
            </div>
          </TheoryCard>

          <TheoryCard
            title="A Tétel Megfordítása és Szögtípusok"
            badge="Megfordítás"
            badgeColor="orange"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              Ha egy háromszög három oldala a, b és c (ahol c a leghosszabb), akkor a c² és az (a² + b²) viszonyából meghatározható a háromszög legnagyobb szöge:
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <strong>c² = a² + b² ⟺ DERÉKSZÖGŰ (γ = 90°)</strong>
              </div>
              <div className="p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200">
                <strong>c² &lt; a² + b² ⟺ HEGYESSSZÖGŰ (minden szög &lt; 90°)</strong>
              </div>
              <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
                <strong>c² &gt; a² + b² ⟺ TOMPASZÖGŰ (γ &gt; 90°)</strong>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: SÍKGEOMETRIAI ALKALMAZÁSOK KATALÓGUSA */}
      <TheorySection
        title="2. Síkgeometriai Alkalmazások Katalógusa"
        subtitle="Hogyan bújik meg a derékszögű háromszög a különböző síkidomokban?"
        icon={<Shapes className="w-5 h-5 text-orange-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Négyzet és Téglalap"
            badge="Átlók"
            badgeColor="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Az átló derékszögű háromszögekre bontja az alakzatot:
            </p>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs space-y-1.5 text-amber-950 dark:text-amber-200">
              <MathText>
                <div>Négyzet átlója: d = a · √2</div>
                <div>Négyzet oldala átlóból: a = d / √2</div>
                <div>Téglalap átlója: d = √(a² + b²)</div>
              </MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Egyenlő Szárú & Szabályos 3szög"
            badge="Magasságok"
            badgeColor="orange"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A magasságvonal felezi az alapot:
            </p>
            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-xs space-y-1.5 text-orange-950 dark:text-orange-200">
              <MathText>
                <div>Egyenlő szárú: m² + (a/2)² = b²</div>
                <div>Szabályos magasság: m = (a · √3) / 2</div>
                <div>Szabályos terület: T = (a² · √3) / 4</div>
              </MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Rombusz, Trapéz és Kör"
            badge="Fejlettebb alakzatok"
            badgeColor="rose"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Belső derékszögű kapcsolatok:
            </p>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs space-y-1.5 text-rose-950 dark:text-rose-200">
              <MathText>
                <div>Rombusz: a² = (e/2)² + (f/2)²</div>
                <div>Húrtrapéz: m² + ((a-c)/2)² = b²</div>
                <div>Kör húrja: r² = d² + (húr/2)²</div>
              </MathText>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: TÉRBELI ALKALMAZÁSOK (ELŐRETEKINTÉS A TESTEKRE) */}
      <TheorySection
        title="3. Térbeli Alkalmazások: Lapátlók és Testátlók"
        subtitle="A Pitagorasz-tétel kétszeres alkalmazása kockákban, téglatestekben és gúlákban"
        icon={<Box className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Kocka és Téglatest Testátlója"
            badge="Térbeli Tétel"
            badgeColor="indigo"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              A térbeli testátló kiszámításához kétszer egymás után alkalmazzuk a Pitagorasz-tételt: először az alaplap lapátlójára (d), majd a függőleges éllel alkotott derékszögű háromszögre:
            </p>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-950 dark:text-indigo-200 space-y-1.5 border border-indigo-200">
              <MathText>
                <div>1. Lapátló négyzete: d² = a² + b²</div>
                <div>2. Testátló négyzete: D² = d² + c² = a² + b² + c²</div>
                <div><strong>Téglatest testátlója: D = √(a² + b² + c²)</strong></div>
                <div><strong>Kocka testátlója: D = √(3a²) = a · √3</strong></div>
              </MathText>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <MathText>Példa: a = 2, b = 3, c = 6 ⟹ D = √(4 + 9 + 36) = √49 = 7 cm.</MathText>
            </p>
          </TheoryCard>

          <GeometryFigureCard
            title="Téglatest Testátlója Modell"
            caption="Az alaplap lapátlója (d) és a magasság (c) derékszöget zár be egymással"
          >
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] h-auto mx-auto select-none">
              {/* Téglatest vázlat */}
              <polygon points="30,95 120,95 160,65 70,65" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
              <polygon points="30,45 120,45 160,15 70,15" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
              <line x1="30" y1="95" x2="30" y2="45" stroke="#94a3b8" strokeWidth="1" />
              <line x1="120" y1="95" x2="120" y2="45" stroke="#94a3b8" strokeWidth="1" />
              <line x1="160" y1="65" x2="160" y2="15" stroke="#94a3b8" strokeWidth="1" />
              <line x1="70" y1="65" x2="70" y2="15" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />

              {/* Lapátló az alapon d */}
              <line x1="30" y1="95" x2="160" y2="65" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,2" />
              <text x="85" y="88" className="text-[7.5px] font-bold fill-sky-700">d = √(a²+b²)</text>

              {/* Testátló D */}
              <line x1="30" y1="95" x2="160" y2="15" stroke="#e11d48" strokeWidth="2" />
              <text x="105" y="48" className="text-[9px] font-extrabold fill-rose-700">D = √(a²+b²+c²)</text>

              {/* Függőleges él c */}
              <line x1="160" y1="65" x2="160" y2="15" stroke="#4f46e5" strokeWidth="2" />
              <text x="166" y="42" className="text-[8px] font-bold fill-indigo-700">c</text>
            </svg>
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: INTERAKTÍV FEJEZETI VIZSGÁLÓ LABOR */}
      <TheorySection
        title="4. Interaktív Fejezeti Számítási Labor"
        subtitle="Teszteld az összefüggéseket síkban, térben és a háromszögek szög szerinti besorolásánál!"
        icon={<Sliders className="w-5 h-5 text-amber-600" />}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === '2d' ? 'default' : 'outline'}
            onClick={() => setActiveTab('2d')}
            className={cn("text-xs gap-1.5", activeTab === '2d' && "bg-amber-600 hover:bg-amber-700 text-white")}
          >
            <Shapes className="w-4 h-4" />
            2D Síkalakzat Kalkulátor
          </Button>
          <Button
            variant={activeTab === '3d' ? 'default' : 'outline'}
            onClick={() => setActiveTab('3d')}
            className={cn("text-xs gap-1.5", activeTab === '3d' && "bg-indigo-600 hover:bg-indigo-700 text-white")}
          >
            <Box className="w-4 h-4" />
            3D Testátló Kalkulátor
          </Button>
          <Button
            variant={activeTab === 'classifier' ? 'default' : 'outline'}
            onClick={() => setActiveTab('classifier')}
            className={cn("text-xs gap-1.5", activeTab === 'classifier' && "bg-rose-600 hover:bg-rose-700 text-white")}
          >
            <GitCompare className="w-4 h-4" />
            Háromszög Megfordítás Vizsgáló
          </Button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* TAB 1: 2D SÍKALAKZATOK */}
          {activeTab === '2d' && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Válassz alakzatot:</span>
                <Button
                  size="sm"
                  variant={shape2D === 'rect' ? 'secondary' : 'ghost'}
                  onClick={() => setShape2D('rect')}
                  className="text-xs h-7"
                >
                  Téglalap
                </Button>
                <Button
                  size="sm"
                  variant={shape2D === 'square' ? 'secondary' : 'ghost'}
                  onClick={() => setShape2D('square')}
                  className="text-xs h-7"
                >
                  Négyzet
                </Button>
                <Button
                  size="sm"
                  variant={shape2D === 'equilateral' ? 'secondary' : 'ghost'}
                  onClick={() => setShape2D('equilateral')}
                  className="text-xs h-7"
                >
                  Szabályos 3szög
                </Button>
                <Button
                  size="sm"
                  variant={shape2D === 'rhombus' ? 'secondary' : 'ghost'}
                  onClick={() => setShape2D('rhombus')}
                  className="text-xs h-7"
                >
                  Rombusz
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>{shape2D === 'square' || shape2D === 'equilateral' ? 'Oldal (a):' : shape2D === 'rhombus' ? 'Átló e:' : 'Oldal a:'}</span>
                    <span className="font-mono text-amber-700 font-bold">{dimA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="0.5"
                    value={dimA}
                    onChange={(e) => setDimA(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                {shape2D !== 'square' && shape2D !== 'equilateral' && (
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>{shape2D === 'rhombus' ? 'Átló f:' : 'Oldal b:'}</span>
                      <span className="font-mono text-orange-700 font-bold">{dimB} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      step="0.5"
                      value={dimB}
                      onChange={(e) => setDimB(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>
                )}
              </div>

              {/* Számított eredmények */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 text-xs space-y-1.5 text-slate-800 dark:text-slate-200">
                <MathText>
                  {shape2D === 'rect' && (
                    <>
                      <div>Téglalap oldalai: a = {dimA} cm, b = {dimB} cm</div>
                      <div>Átló képlete: d = √(a² + b²) = √({dimA}² + {dimB}²) = √{(dimA ** 2 + dimB ** 2).toFixed(1)}</div>
                      <div>Átló értéke: <strong>d = {rectDiag.toFixed(2)} cm</strong></div>
                      <div>Terület: T = {dimA} · {dimB} = <strong>{(dimA * dimB).toFixed(1)} cm²</strong></div>
                    </>
                  )}
                  {shape2D === 'square' && (
                    <>
                      <div>Négyzet oldala: a = {dimA} cm</div>
                      <div>Átló képlete: d = a · √2 = {dimA} · √2 cm</div>
                      <div>Átló értéke: <strong>d ≈ {squareDiag.toFixed(2)} cm</strong></div>
                      <div>Terület: T = a² = <strong>{(dimA * dimA).toFixed(1)} cm²</strong> (átlóból: d²/2)</div>
                    </>
                  )}
                  {shape2D === 'equilateral' && (
                    <>
                      <div>Szabályos háromszög oldala: a = {dimA} cm</div>
                      <div>Magasság: m = (a · √3) / 2 = ({dimA} · √3)/2 ≈ <strong>{equilateralHeight.toFixed(2)} cm</strong></div>
                      <div>Terület: T = (a² · √3) / 4 = ({dimA}² · √3)/4 ≈ <strong>{equilateralArea.toFixed(2)} cm²</strong></div>
                    </>
                  )}
                  {shape2D === 'rhombus' && (
                    <>
                      <div>Rombusz átlói: e = {dimA} cm, f = {dimB} cm</div>
                      <div>Félátlók: e/2 = {(dimA / 2).toFixed(1)} cm, f/2 = {(dimB / 2).toFixed(1)} cm</div>
                      <div>Oldalhossz: a = √((e/2)² + (f/2)²) = <strong>{rhombusSide.toFixed(2)} cm</strong></div>
                      <div>Terület: T = (e · f) / 2 = <strong>{((dimA * dimB) / 2).toFixed(1)} cm²</strong></div>
                    </>
                  )}
                </MathText>
              </div>
            </div>
          )}

          {/* TAB 2: 3D TESTÁTLÓ */}
          {activeTab === '3d' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Hossz (a):</span>
                    <span className="font-mono text-indigo-600 font-bold">{boxA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={boxA}
                    onChange={(e) => setBoxA(parseInt(e.target.value) || 1)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Szélesség (b):</span>
                    <span className="font-mono text-indigo-600 font-bold">{boxB} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={boxB}
                    onChange={(e) => setBoxB(parseInt(e.target.value) || 1)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Magasság (c):</span>
                    <span className="font-mono text-indigo-600 font-bold">{boxC} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={boxC}
                    onChange={(e) => setBoxC(parseInt(e.target.value) || 1)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 text-xs space-y-2 text-slate-800 dark:text-slate-200">
                <MathText>
                  <div>1. Alaplap lapátlója: d = √(a² + b²) = √({boxA}² + {boxB}²) = √{boxA ** 2 + boxB ** 2} ≈ <strong>{faceDiag.toFixed(2)} cm</strong></div>
                  <div>2. Testátló: D = √(a² + b² + c²) = √({boxA}² + {boxB}² + {boxC}²) = √{boxA ** 2 + boxB ** 2 + boxC ** 2} ≈ <strong>{spaceDiag.toFixed(2)} cm</strong></div>
                  {boxA === boxB && boxB === boxC && (
                    <div className="text-emerald-600 font-bold">Kocka esetén: D = a · √3 = {boxA} · √3 ≈ {(boxA * Math.sqrt(3)).toFixed(2)} cm!</div>
                  )}
                </MathText>
              </div>
            </div>
          )}

          {/* TAB 3: HÁROMSZÖG OSZTÁLYOZÓ */}
          {activeTab === 'classifier' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Oldal a:</label>
                  <input
                    type="number"
                    min="1"
                    value={sideX}
                    onChange={(e) => setSideX(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Oldal b:</label>
                  <input
                    type="number"
                    min="1"
                    value={sideY}
                    onChange={(e) => setSideY(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Oldal c:</label>
                  <input
                    type="number"
                    min="1"
                    value={sideZ}
                    onChange={(e) => setSideZ(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 space-y-2 text-xs">
                <div className="font-mono text-slate-600 dark:text-slate-300">
                  Rendezett oldalak: a = {s1}, b = {s2}, c = {s3} (leghosszabb).
                </div>
                <div className="font-mono text-slate-600 dark:text-slate-300">
                  a² + b² = {s1}² + {s2}² = {s1 * s1} + {s2 * s2} = <strong>{sumSq}</strong>
                  &nbsp;|&nbsp; c² = {s3}² = <strong>{maxSq}</strong>
                </div>
                <div className="text-sm font-bold text-amber-800 dark:text-amber-300 pt-1">
                  Eredmény: {classifiedType}
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS HIBÁK ÉS VIZSGACSAPDÁK */}
      <TheorySection
        title="5. Tipikus Fejezeti Hibák és Vizsgacsapdák"
        subtitle="Mire kell kiemelten figyelni a témazáró dolgozatban és a felvételin?"
        icon={<HelpCircle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-4">
          <TheoryTrapBox
            trap="A leghosszabb oldal (átfogó) figyelmen kívül hagyása megfordításkor."
            why="Ha valaki nem a leghosszabb oldalt jelöli ki c-nek, akkor egy derékszögű háromszögre is tévesen azt mondhatja, hogy nem az (pl. 3² + 5² ≠ 4²)."
            correction="Mielőtt négyzetre emelnél, mindig keresd meg a leghosszabb oldalt! CSAK ennek a négyzete állhat magában az egyenlőségjel túloldalán."
          />

          <TheoryTrapBox
            trap="Korai kerekítés a részeredményeknél számológép használatakor."
            why="Ha a gyökjel alatti tagokat vagy a részeredményeket azonnal 1 tizedesjegyre kerekítjük, a végeredmény több tizeddel is eltérhet a helyestől."
            correction="A számítási láncban használd a gép memóriáját vagy zárójelezd be egyetlen kifejezésbe: √(a² + b²). Kerekíteni CSAK a legutolsó lépésben szabad!"
          />

          <TheoryTrapBox
            trap="A trapéz vagy háromszög teljes alapjával számolni a levágott szakasz helyett."
            why="Szimmetrikus trapézban a magasság kiszámításához nem a teljes alap kell, hanem az alapon levágott kicsi szakasz: x = (a - c) / 2."
            correction="Mindig rajzold be a magasságvonalakat! Így tisztán látod, hogy a derékszögű háromszög vízszintes befogója (a - c) / 2."
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: NAGY FEJEZETI KÉPLETTÁBLÁZAT */}
      <TheorySection
        title="6. Nagy Fejezeti Képlettár és Csalólap"
        subtitle="Az V. fejezet összes kulcsképlete egyetlen helyen"
        icon={<Award className="w-5 h-5 text-amber-600" />}
      >
        <TheoryTable
          headers={['Alakzat / Fogalom', 'Alapösszefüggés', 'Keresett Érték', 'Képlet']}
          rows={[
            ['Derékszögű háromszög', 'a² + b² = c²', 'Átfogó (c)', 'c = √(a² + b²)'],
            ['Derékszögű háromszög', 'a² + b² = c²', 'Befogó (a)', 'a = √(c² - b²)'],
            ['Négyzet', 'c² = a² + a² = 2a²', 'Átló (d)', 'd = a · √2'],
            ['Téglalap', 'd² = a² + b²', 'Átló (d)', 'd = √(a² + b²)'],
            ['Szabályos háromszög', 'm² + (a/2)² = a²', 'Magasság (m)', 'm = a√3 / 2'],
            ['Szabályos háromszög', 'T = (a · m) / 2', 'Terület (T)', 'T = a²√3 / 4'],
            ['Rombusz', 'a² = (e/2)² + (f/2)²', 'Oldal (a)', 'a = √((e/2)² + (f/2)²)'],
            ['Szimmetrikus trapéz', 'm² + x² = b²', 'Magasság (m)', 'm = √(b² - ((a-c)/2)²)'],
            ['Kocka', 'D² = 2a² + a² = 3a²', 'Testátló (D)', 'D = a · √3'],
            ['Téglatest', 'D² = a² + b² + c²', 'Testátló (D)', 'D = √(a² + b² + c²)'],
            ['30°-60°-90° háromszög', 'a : b : c = 1 : √3 : 2', 'Rövid befogó (a)', 'a = c / 2 (átfogó fele!)'],
            ['45°-45°-90° háromszög', 'a : b : c = 1 : 1 : √2', 'Befogó (a)', 'a = (c · √2) / 2']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Chapter5PythagorasSummaryTheory;
