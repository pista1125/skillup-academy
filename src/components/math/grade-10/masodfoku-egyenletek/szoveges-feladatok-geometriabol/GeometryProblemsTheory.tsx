import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  RectangleAreaPerimeterSvg,
  RightTrianglePythagorasSvg,
  PolygonDiagonalsSvg,
  PathwayBorderProblemSvg
} from './GeometryProblemsFigures';
import {
  Ruler,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Compass,
  Square,
  Triangle,
  Maximize2,
  Check,
  X
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface GeometryProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

/**
 * Interaktív Geometriai Modell Laboratórium
 * 3 interaktív móddal: Téglalap kereső, Derékszögű háromszög és Sokszög átlói
 */
const GeometryModelLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rectangle' | 'triangle' | 'polygon'>('rectangle');

  // Téglalap állapotok
  const [perimeter, setPerimeter] = useState<number>(36); // K = 36 cm
  const [area, setArea] = useState<number>(80); // T = 80 cm²

  // Derékszögű háromszög állapotok
  const [hypotenuse, setHypotenuse] = useState<number>(15); // c = 15 cm
  const [diff, setDiff] = useState<number>(3); // d = 3 cm (a - b = 3)

  // Sokszög állapotok
  const [diagonals, setDiagonals] = useState<number>(35); // A = 35 db átló

  // --- 1. Téglalap számítások: x² - (K/2)x + T = 0 ---
  const halfK = perimeter / 2;
  const D_rect = halfK * halfK - 4 * 1 * area;
  let rectSideA: number | null = null;
  let rectSideB: number | null = null;
  if (D_rect >= 0) {
    const sqrtD = Math.sqrt(D_rect);
    const s1 = (halfK - sqrtD) / 2;
    const s2 = (halfK + sqrtD) / 2;
    if (s1 > 0 && s2 > 0) {
      rectSideA = Math.min(s1, s2);
      rectSideB = Math.max(s1, s2);
    }
  }

  // --- 2. Háromszög számítások: x² + (x + d)² = c² ⟹ 2x² + 2dx + (d² - c²) = 0 ---
  const A_tri = 2;
  const B_tri = 2 * diff;
  const C_tri = diff * diff - hypotenuse * hypotenuse;
  const D_tri = B_tri * B_tri - 4 * A_tri * C_tri;
  let triA: number | null = null;
  let triB: number | null = null;
  if (D_tri > 0) {
    const sqrtD = Math.sqrt(D_tri);
    const r1 = (-B_tri - sqrtD) / (2 * A_tri);
    const r2 = (-B_tri + sqrtD) / (2 * A_tri);
    const validRoot = r2 > 0 ? r2 : r1 > 0 ? r1 : null;
    if (validRoot !== null) {
      triA = validRoot;
      triB = validRoot + diff;
    }
  }

  // --- 3. Sokszög számítások: n² - 3n - 2A = 0 ---
  const D_poly = 9 - 4 * 1 * (-2 * diagonals);
  let polyN: number | null = null;
  if (D_poly > 0) {
    const sqrtD = Math.sqrt(D_poly);
    const n1 = (3 + sqrtD) / 2;
    if (Number.isInteger(n1) && n1 >= 3) {
      polyN = n1;
    }
  }

  return (
    <div className="p-5 sm:p-7 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl text-white shadow-2xl border border-emerald-800/40 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/20 rounded-xl text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-emerald-100">
              Interaktív Geometriai Modell Labor
            </h3>
          </div>
          <p className="text-xs text-emerald-300/80 mt-1">
            Válassz alakzatot, állítsd be a geometriai adatokat, és figyeld meg a másodfokú egyenlet létrejöttét és megoldását!
          </p>
        </div>

        {/* Módválasztó gombok */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`text-xs ${activeTab === 'rectangle' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'}`}
            onClick={() => setActiveTab('rectangle')}
          >
            <Square className="w-3.5 h-3.5 mr-1" /> Téglalap (K &amp; T)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`text-xs ${activeTab === 'triangle' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'}`}
            onClick={() => setActiveTab('triangle')}
          >
            <Triangle className="w-3.5 h-3.5 mr-1" /> Derékszögű háromszög
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`text-xs ${activeTab === 'polygon' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'}`}
            onClick={() => setActiveTab('polygon')}
          >
            <Maximize2 className="w-3.5 h-3.5 mr-1" /> Sokszög átlói
          </Button>
        </div>
      </div>

      {/* 1. Mód: Téglalap */}
      {activeTab === 'rectangle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4 bg-emerald-950/40 p-5 rounded-2xl border border-emerald-800/30">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              1. Bemenő adatok beállítása
            </span>

            {/* Kerület csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-200">
                <span>Kerület (K):</span>
                <span className="font-mono text-amber-300 font-bold">{perimeter} cm</span>
              </div>
              <Slider
                min={20}
                max={60}
                step={2}
                value={[perimeter]}
                onValueChange={([val]) => setPerimeter(val)}
              />
              <span className="text-[10px] text-emerald-400/80">Félkerület (a + b) = {halfK} cm</span>
            </div>

            {/* Terület csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-200">
                <span>Terület (T):</span>
                <span className="font-mono text-amber-300 font-bold">{area} cm²</span>
              </div>
              <Slider
                min={20}
                max={Math.floor((halfK * halfK) / 4) + 10}
                step={2}
                value={[area]}
                onValueChange={([val]) => setArea(val)}
              />
              <span className="text-[10px] text-emerald-400/80">
                Maximális terület (négyzet esetén): {(halfK / 2) * (halfK / 2)} cm²
              </span>
            </div>

            {/* Egyenlet panel */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-800/50 font-mono text-xs space-y-1.5">
              <div className="text-slate-400">Modellező egyenlet:</div>
              <div className="text-amber-300 font-bold text-sm">x² - {halfK}x + {area} = 0</div>
              <div className="text-slate-400 pt-1 border-t border-slate-800">
                D = ({halfK})² - 4 · 1 · {area} = <span className="text-white font-bold">{D_rect.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/50 flex flex-col items-center justify-center min-h-[220px]">
              {rectSideA !== null && rectSideB !== null ? (
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className="bg-emerald-500/20 border-2 border-emerald-400 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      width: `${Math.max(60, Math.min(280, rectSideB * 14))}px`,
                      height: `${Math.max(40, Math.min(180, rectSideA * 14))}px`
                    }}
                  >
                    <span className="font-mono text-xs text-emerald-200 font-bold">
                      T = {area} cm²
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-emerald-200">
                    <span>a = <strong className="text-white">{rectSideA.toFixed(1)} cm</strong></span>
                    <span>b = <strong className="text-white">{rectSideB.toFixed(1)} cm</strong></span>
                    <span>Átló d = <strong className="text-amber-300">{Math.sqrt(rectSideA * rectSideA + rectSideB * rectSideB).toFixed(1)} cm</strong></span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
                  <p className="text-xs text-rose-300 font-bold">
                    Ilyen méretű téglalap nem létezik (D &lt; 0)!
                  </p>
                  <p className="text-[11px] text-slate-400">
                    A megadott {perimeter} cm kerület mellett a maximális terület {((halfK / 2) * (halfK / 2)).toFixed(0)} cm² lehet (négyzet esetén).
                  </p>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-emerald-900/30 rounded-xl border border-emerald-700/40 text-xs text-emerald-200">
              💡 <strong>Geometriai tanulság:</strong> Egy adott kerületű téglalapok közül a <strong>négyzetnek van a legnagyobb területe</strong>. Ha $T &gt; (K/4)^2$, a diszkrimináns negatív, tehát az egyenletnek nincs valós megoldása!
            </div>
          </div>
        </div>
      )}

      {/* 2. Mód: Derékszögű háromszög */}
      {activeTab === 'triangle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4 bg-emerald-950/40 p-5 rounded-2xl border border-emerald-800/30">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              1. Bemenő adatok beállítása
            </span>

            {/* Átfogó csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-200">
                <span>Átfogó (c):</span>
                <span className="font-mono text-amber-300 font-bold">{hypotenuse} cm</span>
              </div>
              <Slider
                min={10}
                max={30}
                step={1}
                value={[hypotenuse]}
                onValueChange={([val]) => setHypotenuse(val)}
              />
            </div>

            {/* Befogók különbsége csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-200">
                <span>Befogók különbsége (d = b - a):</span>
                <span className="font-mono text-amber-300 font-bold">{diff} cm</span>
              </div>
              <Slider
                min={1}
                max={Math.floor(hypotenuse * 0.9)}
                step={1}
                value={[diff]}
                onValueChange={([val]) => setDiff(val)}
              />
            </div>

            {/* Egyenlet panel */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-800/50 font-mono text-xs space-y-1.5">
              <div className="text-slate-400">Pitagorasz-modell: a² + (a + {diff})² = {hypotenuse}²</div>
              <div className="text-amber-300 font-bold text-sm">
                2a² + {2 * diff}a - {hypotenuse * hypotenuse - diff * diff} = 0
              </div>
              <div className="text-slate-400 pt-1 border-t border-slate-800">
                D = {D_tri} &gt; 0 (mindig van pozitív valós gyök)
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/50 flex flex-col items-center justify-center min-h-[220px]">
              {triA !== null && triB !== null && (
                <div className="flex flex-col items-center space-y-3">
                  <svg viewBox="0 0 240 160" className="w-56 h-36">
                    <polygon
                      points="20,140 220,140 20,40"
                      fill="#064E3B"
                      stroke="#34D399"
                      strokeWidth="2.5"
                    />
                    <rect x="20" y="125" width="15" height="15" fill="none" stroke="#10B981" strokeWidth="1.5" />
                    <circle cx="27" cy="132" r="2" fill="#10B981" />
                    <text x="120" y="155" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">
                      b = {triB.toFixed(1)} cm
                    </text>
                    <text x="12" y="90" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="end">
                      a = {triA.toFixed(1)} cm
                    </text>
                    <text x="135" y="80" fill="#FBBF24" fontSize="11" fontWeight="900" transform="rotate(-28 135 80)">
                      c = {hypotenuse} cm
                    </text>
                  </svg>

                  <div className="flex items-center gap-4 text-xs font-mono text-emerald-200">
                    <span>Terület T = <strong className="text-white">{((triA * triB) / 2).toFixed(1)} cm²</strong></span>
                    <span>Kerület K = <strong className="text-white">{(triA + triB + hypotenuse).toFixed(1)} cm</strong></span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-emerald-900/30 rounded-xl border border-emerald-700/40 text-xs text-emerald-200">
              💡 <strong>Geometriai szűrés:</strong> A másodfokú egyenlet két gyöke közül az egyik mindig negatív szám. Mivel hosszúság nem lehet negatív, a negatív gyököt azonnal kizárjuk a geometriai feltételek miatt!
            </div>
          </div>
        </div>
      )}

      {/* 3. Mód: Sokszög átlói */}
      {activeTab === 'polygon' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4 bg-emerald-950/40 p-5 rounded-2xl border border-emerald-800/30">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              1. Bemenő adatok beállítása
            </span>

            {/* Átlók száma csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-200">
                <span>Átlók száma (A):</span>
                <span className="font-mono text-amber-300 font-bold">{diagonals} db</span>
              </div>
              <Slider
                min={2}
                max={90}
                step={1}
                value={[diagonals]}
                onValueChange={([val]) => setDiagonals(val)}
              />
              <span className="text-[10px] text-emerald-400/80">
                Példák: 5 (ötszög), 9 (hatszög), 14 (hétszög), 20 (nyolcszög), 35 (tízszög), 54 (tizenkétszög)
              </span>
            </div>

            {/* Egyenlet panel */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-800/50 font-mono text-xs space-y-1.5">
              <div className="text-slate-400">Képlet: n(n - 3) / 2 = {diagonals}</div>
              <div className="text-amber-300 font-bold text-sm">
                n² - 3n - {2 * diagonals} = 0
              </div>
              <div className="text-slate-400 pt-1 border-t border-slate-800">
                D = (-3)² - 4 · 1 · (-{2 * diagonals}) = 9 + {8 * diagonals} = <span className="text-white font-bold">{D_poly}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/50 flex flex-col items-center justify-center min-h-[220px]">
              {polyN !== null ? (
                <div className="text-center space-y-3">
                  <div className="inline-block p-3 bg-emerald-500/20 border border-emerald-400 rounded-2xl">
                    <span className="text-3xl font-black font-mono text-amber-300">{polyN}</span>
                    <span className="text-sm font-bold text-emerald-200 ml-2">oldalú sokszög</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    A {polyN} oldalú sokszögnek pontosan <strong className="text-emerald-300">{diagonals} db</strong> átlója van.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Egyetlen csúcsból {polyN - 3} db átló húzható. Negatív gyök (n₂ = {(3 - Math.sqrt(D_poly)) / 2}) elvetve.
                  </p>
                </div>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-xs text-amber-300 font-bold">
                    Nem létezik olyan sokszög, melynek pontosan {diagonals} átlója van!
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Az egyenlet gyöke nem egész szám: n = {((3 + Math.sqrt(D_poly)) / 2).toFixed(2)}. Mivel egy sokszög oldalszáma csak pozitív egész ($n \ge 3$) lehet, ilyen sokszög nincs.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-emerald-900/30 rounded-xl border border-emerald-700/40 text-xs text-emerald-200">
              💡 <strong>Geometriai szűrés sokszögeknél:</strong> A megoldásnak nemcsak pozitívnak kell lennie, hanem <strong>pozitív egész számnak és legalább 3-nak (n ≥ 3, n ∈ ℕ)</strong>! Ha √D nem egész szám, a feladatnak nincs geometriai megoldása.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const GeometryProblemsTheory: React.FC<GeometryProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const sections: TheorySection[] = [
    // 1. Fejezet
    {
      id: 'sec-rectangles',
      title: '1. Téglalapok és négyzetek: kerület, terület és oldalak kapcsolata',
      description: 'Hogyan alakul ki a másodfokú egyenlet, ha adott a kerület és a terület vagy az oldalak aránya?',
      color: 'emerald',
      badge: 'Téglalapok',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A téglalap kerületének és területének klasszikus modellje"
            color="emerald"
            icon={<Square className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A geometriai szöveges feladatok leggyakoribb típusa a téglalap oldalhosszainak megkeresése, amikor adott a kerület ($K$) és a terület ($T$), vagy a két oldal különbsége ($d$):
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <RectangleAreaPerimeterSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A félkerület és a terület összefüggése: x · (K/2 - x) = T
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="font-bold text-emerald-950 text-sm">1. Eset: Adott a Kerület és a Terület</span>
                  <p className="text-xs text-slate-600">
                    Mivel $K = 2(a + b)$, a két oldal összege a félkerület: $a + b = K/2$.
                    Ha az egyik oldal $x$, akkor a másik oldal $K/2 - x$.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100 font-mono text-xs text-emerald-900 space-y-1">
                    <p>T = x · (K/2 - x)</p>
                    <p className="font-bold text-emerald-700">x² - (K/2)x + T = 0</p>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Az egyenlet két gyöke ($x_1$ és $x_2$) pontosan a téglalap két oldalának hosszát adja meg!
                  </p>
                </div>

                <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl space-y-2">
                  <span className="font-bold text-teal-950 text-sm">2. Eset: Adott az Oldalak Különbsége</span>
                  <p className="text-xs text-slate-600">
                    Ha az egyik oldal $d$ cm-rel hosszabb a másiknál: legyen a rövidebb oldal $x$, a hosszabb $x + d$.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-teal-100 font-mono text-xs text-teal-900 space-y-1">
                    <p>T = x · (x + d)</p>
                    <p className="font-bold text-teal-700">x² + dx - T = 0</p>
                  </div>
                  <p className="text-[11px] text-teal-800">
                    A negatív gyököt elvetjük, mert szakasz hossza nem lehet negatív!
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Kidolgozott Mintapélda */}
          <TheoryCard
            title="Mintapélda: Kert körbekerítése és területe"
            color="emerald"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-emerald-950">
                Feladat: Egy téglalap alakú kert kerülete 48 méter, területe 135 m². Határozzuk meg a kert oldalainak hosszát és az átlóját!
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Modell felírása:</p>
                <p className="text-emerald-900">Félkerület: a + b = 48 / 2 = 24 m ⟹ b = 24 - a</p>
                <p className="text-emerald-900">Terület: a · (24 - a) = 135 ⟹ 24a - a² = 135 ⟹ a² - 24a + 135 = 0</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Megoldóképlet:</p>
                <p className="text-emerald-900">D = (-24)² - 4 · 1 · 135 = 576 - 540 = 36 = 6²</p>
                <p className="text-emerald-900">a₁,₂ = (24 ± 6) / 2 ⟹ a₁ = 9 m,  a₂ = 15 m</p>

                <p className="text-slate-500 font-sans font-bold pt-1">3. Lépés: Geometriai értelmezés és átló:</p>
                <p className="text-slate-800 font-sans">
                  A kert oldalai <strong className="text-emerald-800">9 m és 15 m</strong> (ellenőrzés: K = 2(9 + 15) = 48 m, T = 9 · 15 = 135 m²).
                  <br />
                  Átló: d = √(9² + 15²) = √(81 + 225) = √306 ≈ <strong className="text-emerald-800">17,49 m</strong>.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 2. Fejezet
    {
      id: 'sec-triangle',
      title: '2. A derékszögű háromszög és a Pitagorasz-tétel másodfokú modellje',
      description: 'Hogyan modellezzük az ismeretlen oldalakat az a² + b² = c² tétel segítségével?',
      color: 'emerald',
      badge: 'Derékszögű Háromszögek',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A Pitagorasz-tétel alkalmazása algebrai egyenletekben"
            color="emerald"
            icon={<Triangle className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Derékszögű háromszögek esetén az oldalak közötti alapvető kapcsolatot a <strong>Pitagorasz-tétel</strong> teremti meg ($a^2 + b^2 = c^2$). Ha az oldalak hossza egymásból kifejezhető, azonnal másodfokú egyenlethez jutunk:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <RightTrianglePythagorasSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  Derékszögű háromszög befogói és átfogója: x² + (x + d)² = c²
                </p>
              </div>

              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-2">
                <span className="font-bold text-blue-950 text-sm">Gyakori típusok:</span>
                <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
                  <li><strong>Befogók különbsége és az átfogó adott:</strong> $x^2 + (x + d)^2 = c^2 \implies 2x^2 + 2dx + (d^2 - c^2) = 0$.</li>
                  <li><strong>Egyik befogó és az átfogó kapcsolata adott:</strong> pl. az átfogó 4 cm-rel hosszabb a befogónál ($c = a + 4$).</li>
                  <li><strong>Szomszédos egész számok vagy számtani sorozat:</strong> az oldalak $x - d, x, x + d$ (pl. 3, 4, 5 arányú háromszög).</li>
                </ul>
              </div>
            </div>
          </TheoryCard>

          {/* Mintapélda */}
          <TheoryCard
            title="Mintapélda: Derékszögű háromszög befogói"
            color="emerald"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-emerald-950">
                Feladat: Egy derékszögű háromszög egyik befogója 7 cm-rel hosszabb a másiknál. Az átfogó hossza 13 cm. Mekkorák a befogók és a háromszög területe?
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Modell felírása:</p>
                <p className="text-emerald-900">Rövidebb befogó: a = x,  Hosszabb befogó: b = x + 7,  Átfogó: c = 13</p>
                <p className="text-emerald-900">Pitagorasz: x² + (x + 7)² = 13²</p>
                <p className="text-emerald-900">x² + x² + 14x + 49 = 169 ⟹ 2x² + 14x - 120 = 0</p>
                <p className="text-emerald-700 font-bold">Egyszerűsítve (÷ 2): x² + 7x - 60 = 0</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Megoldás:</p>
                <p className="text-emerald-900">D = 7² - 4 · 1 · (-60) = 49 + 240 = 289 = 17²</p>
                <p className="text-emerald-900">x₁,₂ = (-7 ± 17) / 2 ⟹ x₁ = 5,  x₂ = -12</p>

                <p className="text-slate-500 font-sans font-bold pt-1">3. Lépés: Geometriai szűrés és válasz:</p>
                <p className="text-slate-800 font-sans">
                  Mivel oldal nem lehet negatív, az x₂ = -12 nem megoldás.
                  <br />
                  A befogók: <strong className="text-emerald-800">a = 5 cm</strong> és <strong className="text-emerald-800">b = 5 + 7 = 12 cm</strong>.
                  <br />
                  Terület: T = (a · b) / 2 = (5 · 12) / 2 = <strong className="text-emerald-800">30 cm²</strong>.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 3. Fejezet
    {
      id: 'sec-pathway',
      title: '3. Szegélyek, ösvények és kerti sétányok területszámítása',
      description: 'Hogyan modellezzük az alakzatokat körülvevő egyenletes szélességű sávokat?',
      color: 'emerald',
      badge: 'Szegélyek & Ösvények',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="Az ösvény és a szegély területi modellje"
            color="emerald"
            icon={<Compass className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Tipikus feladat, amikor egy téglalap alakú virágágyás, medence vagy épület köré minden oldalon azonos $x$ szélességű járdát vagy szegélyt készítenek:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <PathwayBorderProblemSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A szegély szélessége mindkét irányban hozzáadódik: A = a + 2x, B = b + 2x
                </p>
              </div>

              <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl space-y-2">
                <span className="font-bold text-teal-950 text-sm">A legfontosabb buktató: Miért 2x?</span>
                <p className="text-xs text-slate-700">
                  Ha a medence hossza $a$, és körös-körül $x$ széles járda övezi, akkor az új teljes hosszúság <strong>nem $a + x$, hanem $a + 2x$</strong> (mivel bal oldalon is és jobb oldalon is $x$ széles sáv van)! Ugyanígy a szélesség $b + 2x$ lesz.
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-teal-100 font-mono text-xs text-teal-900 space-y-1">
                  <p>T_ösvény = T_külső - T_belső = (a + 2x)(b + 2x) - ab</p>
                  <p className="font-bold text-teal-700">T_ösvény = 4x² + 2(a + b)x</p>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 4. Fejezet
    {
      id: 'sec-polygon',
      title: '4. Konvex sokszögek átlói: az A = n(n-3)/2 formula és másodfokú egyenlete',
      description: 'Hány oldalú a sokszög, ha ismerjük az összes átlójának számát?',
      color: 'emerald',
      badge: 'Sokszögek Átlói',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="Az átlószám képlet levezetése és másodfokú alkalmazása"
            color="emerald"
            icon={<Maximize2 className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Egy $n$-oldalú konvex sokszögnek $n$ darab csúcsa van. Egy tetszőleges csúcsból önmagába és a két szomszédos csúcsba nem húzható átló (azok oldalak), így egyetlen csúcsból <strong>$n - 3$ darab átló</strong> húzható.
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <PolygonDiagonalsSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  Az összes átló száma: A = n(n - 3) / 2
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2">
                  <span className="font-bold text-purple-950 text-sm">Miért osztunk 2-vel?</span>
                  <p className="text-xs text-slate-600">
                    Mivel minden átlónak két végpontja van, az $n(n - 3)$ szorzatban minden átlót kétszer számoltunk (egyszer az egyik csúcsból, egyszer a másikból). Ezért felezzük:
                  </p>
                  <p className="font-mono text-xs text-purple-900 font-bold">A = n · (n - 3) / 2</p>
                </div>

                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="font-bold text-emerald-950 text-sm">Másodfokú egyenlet felírása</span>
                  <p className="text-xs text-slate-600">
                    Beszorozva 2-vel és 0-ra rendezve:
                  </p>
                  <p className="font-mono text-xs text-emerald-900 font-bold">n² - 3n - 2A = 0</p>
                  <p className="text-[11px] text-emerald-800">
                    Kikötés: n ∈ ℕ és n ≥ 3 (háromszögnek nincs átlója: A = 0).
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Mintapélda */}
          <TheoryCard
            title="Mintapélda: Sokszög oldalszámának meghatározása"
            color="emerald"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-emerald-950">
                Feladat: Hány oldalú az a konvex sokszög, amelynek 54 darab átlója van?
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Egyenlet felírása:</p>
                <p className="text-emerald-900">n(n - 3) / 2 = 54 ⟹ n(n - 3) = 108 ⟹ n² - 3n - 108 = 0</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Megoldás:</p>
                <p className="text-emerald-900">D = (-3)² - 4 · 1 · (-108) = 9 + 432 = 441 = 21²</p>
                <p className="text-emerald-900">n₁,₂ = (3 ± 21) / 2 ⟹ n₁ = 12,  n₂ = -9</p>

                <p className="text-slate-500 font-sans font-bold pt-1">3. Lépés: Geometriai szűrés:</p>
                <p className="text-slate-800 font-sans">
                  Oldalszám nem lehet negatív, így $n_2 = -9$ kiesik.
                  <br />
                  A megoldás: a sokszög <strong className="text-emerald-800">12 oldalú (tizenkétszög)</strong>.
                  <br />
                  Ellenőrzés: $12 \cdot (12 - 3) / 2 = 12 \cdot 9 / 2 = 54$.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 5. Fejezet
    {
      id: 'sec-check',
      title: '5. Geometriai szűrés és ellenőrzés',
      description: 'Mely gyökök fogadhatók el és hogyan zárjuk ki a hamis geometriai válaszokat?',
      color: 'emerald',
      badge: 'Szűrés & Ellenőrzés',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A geometriai feladatok ellenőrzésének 4 szabálya"
            color="emerald"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A másodfokú algebrai egyenleteknek gyakran két valós gyökük van. A geometriában azonban nem minden algebrai gyök bír valós fizikai jelentéssel:
              </p>

              <TheoryTable
                headers={['Geometriai feltétel', 'Matematikai korlát', 'Gyakori hiba']}
                rows={[
                  [
                    'Szakasz hossza, távolság',
                    'Mindig szigorúan pozitív: x > 0',
                    'Negatív gyök elfogadása (pl. x = -5 cm oldal)'
                  ],
                  [
                    'Háromszög-egyenlőtlenség',
                    'Bármely két oldal összege > harmadik oldal',
                    'Nem ellenőrzik, hogy valóban szerkeszthető-e a háromszög'
                  ],
                  [
                    'Sokszög oldalszáma (n)',
                    'n ∈ ℕ és n ≥ 3 (pozitív egész szám)',
                    'Tört vagy negatív oldalszám elfogadása'
                  ],
                  [
                    'Belső és külső méret aránya',
                    '0 < x < a/2 (szegély vagy kivágás esetén)',
                    'Túl nagy szegély szélesség, ami elnyeli a területet'
                  ]
                ]}
              />

              <TheoryTrapBox title="Vigyázat: Az algebrailag helyes gyök geometriailag lehet hamis!">
                <p className="text-xs text-rose-800">
                  Ha egy egyenlet megoldásai $x_1 = 8$ és $x_2 = -3$, nem elég automatikusan azt mondani, hogy "csak az 8 a jó". Mindig ellenőrizd, hogy az $x$-ből származtatott <strong>többi oldal</strong> (pl. $x - 5$ vagy $12 - 2x$) pozitív marad-e! Ha $x = 8$ mellett egy másik oldal negatívvá válna, az a gyök is érvénytelen.
                </p>
              </TheoryTrapBox>
            </div>
          </TheoryCard>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Szöveges Feladatok Geometriából"
      subtitle="Téglalapok, derékszögű háromszögek, ösvények és sokszögek másodfokú modellezése"
      badge="10. Osztály • V. Témakör • 35. Lecke"
      color="emerald"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={<GeometryModelLab />}
    />
  );
};

