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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shapes,
  Maximize2,
  Box,
  Target,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Ruler,
  Triangle,
  Square,
  Sparkles,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface TrianglesAndQuadrilateralsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const TrianglesAndQuadrilateralsTheory: React.FC<TrianglesAndQuadrilateralsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [labTab, setLabTab] = useState<'triangleAngles' | 'triangleInequality' | 'quadAngles'>('triangleAngles');

  // Triangle angles state
  const [angleA, setAngleA] = useState<number>(65);
  const [angleB, setAngleB] = useState<number>(55);
  const angleC = Math.max(0, 180 - angleA - angleB);
  const isTriangleAngleValid = angleA > 0 && angleB > 0 && angleA + angleB < 180;

  // Triangle inequality state
  const [sideA, setSideA] = useState<number>(6);
  const [sideB, setSideB] = useState<number>(8);
  const [sideC, setSideC] = useState<number>(10);
  const isTriangleInequalityValid =
    sideA > 0 &&
    sideB > 0 &&
    sideC > 0 &&
    sideA + sideB > sideC &&
    sideA + sideC > sideB &&
    sideB + sideC > sideA;

  // Quad angles state
  const [quadA, setQuadA] = useState<number>(80);
  const [quadB, setQuadB] = useState<number>(110);
  const [quadC, setQuadC] = useState<number>(85);
  const quadD = Math.max(0, 360 - quadA - quadB - quadC);
  const isQuadValid = quadA > 0 && quadB > 0 && quadC > 0 && quadA + quadB + quadC < 360;

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="3. Háromszögek és négyszögek"
      subtitle="Csoportosítás oldalak és szögek szerint, háromszög belső és külső szögei, háromszög-egyenlőtlenség, négyszögek tulajdonságai és családfája."
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_haromszogek_es_negyszogek.pdf"
      quickRule={{
        label: 'Szögek összege',
        rule: 'Háromszög belső szögei: 180° | Négyszög belső szögei: 360° | Bármely sokszög külső szögei: 360°'
      }}
    >
      {/* 1. FEJEZET: Háromszögek csoportosítása */}
      <TheorySection
        number="1"
        title="Háromszögek csoportosítása és fajtái"
        badge="Osztályozás"
        badgeColor="emerald"
      >
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          A háromszög a legkisebb oldalszámú síkbeli sokszög: 3 csúcsa, 3 oldala és 3 belső szöge van. A háromszögeket két független szempont szerint osztályozhatjuk: <strong>szögeik</strong> és <strong>oldalaik</strong> nagysága alapján.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* A) Szögek szerint */}
          <TheoryCard
            title="A) Csoportosítás belső szögek szerint"
            icon={<Triangle className="w-4 h-4 text-emerald-600" />}
            color="emerald"
          >
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
                <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                  <span>1. Hegyesszögű háromszög</span>
                  <span className="font-mono text-[11px] text-slate-500">Minden szög &lt; 90°</span>
                </div>
                <p>Mindhárom belső szöge hegyesszög. A magasságpont és a köré írt kör kp. a belső tartományban van.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
                <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center justify-between">
                  <span>2. Derékszögű háromszög</span>
                  <span className="font-mono text-[11px] text-slate-500">1 derékszög = 90°</span>
                </div>
                <p>
                  Pontosan egy 90°-os szöge van. A derékszöget bezáró oldalak a <strong>befogók</strong> (<MathText size="sm">a, b</MathText>), a derékszöggel szemközti leghosszabb oldal az <strong>átfogó</strong> (<MathText size="sm">c</MathText>). A két hegyesszög összege mindig <MathText size="sm">\alpha + \beta = 90^\circ</MathText>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
                <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center justify-between">
                  <span>3. Tompaszögű háromszög</span>
                  <span className="font-mono text-[11px] text-slate-500">1 szög &gt; 90°</span>
                </div>
                <p>Pontosan egy tompaszöge van (a másik kettő szükségképpen hegyesszög). A magasságpontja és a köré írt kör középpontja kívülre esik.</p>
              </div>
            </div>
          </TheoryCard>

          {/* B) Oldalak szerint */}
          <TheoryCard
            title="B) Csoportosítás oldalhosszak szerint"
            icon={<Shapes className="w-4 h-4 text-teal-600" />}
            color="teal"
          >
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>1. Általános (különböző oldalú)</span>
                  <span className="font-mono text-[11px] text-slate-500">a ≠ b ≠ c</span>
                </div>
                <p>Mindhárom oldala és mindhárom belső szöge különböző nagyságú. Nincs szimmetriatengelye.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
                <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
                  <span>2. Egyenlő szárú háromszög</span>
                  <span className="font-mono text-[11px] text-slate-500">a = b (szárak)</span>
                </div>
                <p>
                  Legalább 2 oldala egyenlő. A két egyenlő oldal a <strong>szár</strong>, a harmadik oldal az <strong>alap</strong>. Az alapon fekvő két szög egyenlő (<MathText size="sm">\alpha = \beta</MathText>). Pontosan 1 szimmetriatengellyel rendelkezik.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
                <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center justify-between">
                  <span>3. Szabályos (egyenlő oldalú)</span>
                  <span className="font-mono text-[11px] text-slate-500">a = b = c</span>
                </div>
                <p>
                  Mindhárom oldala egyenlő, és mindhárom belső szöge pontosan <MathText size="sm">60^\circ</MathText>. Pontosan 3 szimmetriatengelye van, a 4 nevezetes pontja (<MathText size="sm">O, K, M, S</MathText>) egybeesik.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Vizuális SVG ábrák a háromszögtípusokról */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-4">
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
            <div className="font-bold text-xs text-slate-700 dark:text-slate-300">Hegyesszögű</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="50,8 15,52 85,52" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-600 stroke-[2]" />
            </svg>
            <div className="text-[10px] text-slate-400">minden szög &lt; 90°</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
            <div className="font-bold text-xs text-blue-700 dark:text-blue-300">Derékszögű</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="20,10 20,52 85,52" className="fill-blue-50 dark:fill-blue-950/40 stroke-blue-600 stroke-[2]" />
              <rect x="20" y="42" width="10" height="10" fill="none" className="stroke-blue-500 stroke-[1.5]" />
            </svg>
            <div className="text-[10px] text-blue-500">1 db 90°-os szög</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
            <div className="font-bold text-xs text-amber-700 dark:text-amber-300">Tompaszögű</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="35,18 8,52 92,52" className="fill-amber-50 dark:fill-amber-950/40 stroke-amber-600 stroke-[2]" />
            </svg>
            <div className="text-[10px] text-amber-600">1 db &gt; 90°-os szög</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
            <div className="font-bold text-xs text-slate-700 dark:text-slate-300">Általános</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="40,12 10,52 88,52" className="fill-slate-50 dark:fill-slate-800 stroke-slate-500 stroke-[2]" />
            </svg>
            <div className="text-[10px] text-slate-400">a ≠ b ≠ c</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
            <div className="font-bold text-xs text-indigo-700 dark:text-indigo-300">Egyenlő szárú</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="50,8 18,52 82,52" className="fill-indigo-50 dark:fill-indigo-950/40 stroke-indigo-600 stroke-[2]" />
              <line x1="50" y1="8" x2="50" y2="52" className="stroke-indigo-400 stroke-[1.5]" strokeDasharray="2 2" />
            </svg>
            <div className="text-[10px] text-indigo-500">a = b, α = β</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
            <div className="font-bold text-xs text-purple-700 dark:text-purple-300">Szabályos</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="50,10 12,50 88,50" className="fill-purple-50 dark:fill-purple-950/40 stroke-purple-600 stroke-[2]" />
            </svg>
            <div className="text-[10px] text-purple-500">a = b = c, 60°</div>
          </div>
        </div>

        <TheoryTrapBox title="Gyakori Tévhit: Lehet-e egy háromszög egyszerre tompaszögű és szabályos?">
          <strong>NEM lehetséges!</strong> A szabályos háromszög minden belső szöge pontosan 60°, így az mindig hegyesszögű. Viszont egy háromszög lehet <em>derékszögű egyenlő szárú</em> (szögei: 90°, 45°, 45°) vagy <em>tompaszögű egyenlő szárú</em> (pl. 120°, 30°, 30°)!
        </TheoryTrapBox>
      </TheorySection>

      {/* 2. FEJEZET: Szögek összefüggései és háromszög-egyenlőtlenség */}
      <TheorySection
        number="2"
        title="Szögek összefüggései és a háromszög-egyenlőtlenség"
        badge="Tételek & Számítások"
        badgeColor="teal"
      >
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          A háromszög szögei és oldalai szigorú geometriai szabályoknak engedelmeskednek. Ezek ismeretében hiányzó szögeket és szerkeszthetőséget tudunk számítani.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          {/* Belső szögek összege */}
          <TheoryCard
            title="1. Belső szögek összege"
            icon={<Target className="w-4 h-4 text-emerald-600" />}
            color="emerald"
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono font-bold text-center text-emerald-800 dark:text-emerald-200">
                <MathText size="md">\alpha + \beta + \gamma = 180^\circ</MathText>
              </div>
              <p>
                Bármely síkbeli háromszög belső szögeinek összege pontosan <strong>180°</strong> (egyenesszög).
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded-lg border">
                <strong>Példa:</strong> Ha <MathText size="sm">\alpha = 50^\circ</MathText> és <MathText size="sm">\beta = 70^\circ</MathText>, akkor <MathText size="sm">\gamma = 180^\circ - (50^\circ + 70^\circ) = 60^\circ</MathText>.
              </div>
            </div>
          </TheoryCard>

          {/* Külső szög tétele */}
          <TheoryCard
            title="2. Külső szög tétele"
            icon={<Maximize2 className="w-4 h-4 text-teal-600" />}
            color="teal"
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono font-bold text-center text-teal-800 dark:text-teal-200">
                <MathText size="md">\alpha' = \beta + \gamma</MathText>
              </div>
              <p>
                A háromszög bármely külső szöge egyenlő a <strong>két nem mellette fekvő</strong> belső szög összegével.
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded-lg border">
                A belső és külső szög mellékszögek: <MathText size="sm">\alpha + \alpha' = 180^\circ</MathText>. A 3 külső szög összege mindig <MathText size="sm">360^\circ</MathText>.
              </div>
            </div>
          </TheoryCard>

          {/* Háromszög-egyenlőtlenség */}
          <TheoryCard
            title="3. Háromszög-egyenlőtlenség"
            icon={<Ruler className="w-4 h-4 text-blue-600" />}
            color="blue"
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 font-mono font-bold text-center text-blue-800 dark:text-blue-200">
                <MathText size="md">a + b &gt; c</MathText>
              </div>
              <p>
                Háromszög csak akkor szerkeszthető, ha <strong>bármely két oldal összege nagyobb a harmadiknál</strong>:
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded-lg border">
                Gyakorlatban elég ellenőrizni: <em>a két rövidebb oldal összege &gt; leghosszabb oldal</em>. Pl. 3 cm, 4 cm, 8 cm nem ad háromszöget, mert 3 + 4 = 7 &lt; 8!
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout title="Oldalak és Szögek kapcsolata">
          Egy háromszögben <strong>nagyobb oldallal szemben mindig nagyobb belső szög fekszik</strong>, és egyenlő oldalakkal szemben egyenlő szögek találhatók. Így például a derékszögű háromszög leghosszabb oldala mindig az átfogó (<MathText size="sm">c</MathText>), mert a 90°-os derékszöggel szemben fekszik!
        </TheoryCallout>
      </TheorySection>

      {/* 3. FEJEZET: Négyszögek világa és hierarchiája */}
      <TheorySection
        number="3"
        title="Négyszögek fajtái, tulajdonságai és családfája"
        badge="Négyszögek"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          A négyszög négy oldal által határolt zárt sokszög. Bármely konvex négyszögben a <strong>belső szögek összege 360°</strong> (mert egy átló behúzásával két 180°-os háromszögre bontható).
        </p>

        {/* Négyszögek Családfája & Kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {/* Trapéz */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border-2 border-slate-200 dark:border-slate-700/80 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">1. Trapéz</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600">a ∥ c</span>
            </div>
            <svg viewBox="0 0 120 55" className="w-full h-16 mx-auto">
              <polygon points="30,12 85,12 110,45 10,45" className="fill-slate-100 dark:fill-slate-800 stroke-slate-600 stroke-[2]" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Legalább 1 pár párhuzamos oldala van (alapok: <MathText size="sm">a \parallel c</MathText>). A szárakon fekvő szögek összege 180°.
            </p>
            <div className="text-[11px] text-slate-500">
              <strong>Húrtrapéz (szimmetrikus):</strong> Szárai egyenlők, alapon fekvő szögei egyenlők, átlói egyenlő hosszúak, köré kör írható.
            </div>
          </div>

          {/* Paralelogramma */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border-2 border-indigo-200 dark:border-indigo-900/60 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-700 dark:text-indigo-300">2. Paralelogramma</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600">2 pár párhuzamos</span>
            </div>
            <svg viewBox="0 0 120 55" className="w-full h-16 mx-auto">
              <polygon points="35,12 110,12 85,45 10,45" className="fill-indigo-50 dark:fill-indigo-950/40 stroke-indigo-600 stroke-[2]" />
              <line x1="35" y1="12" x2="85" y2="45" className="stroke-indigo-400 stroke-[1]" strokeDasharray="2 2" />
              <line x1="110" y1="12" x2="10" y2="45" className="stroke-indigo-400 stroke-[1]" strokeDasharray="2 2" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Két pár párhuzamos oldala van (<MathText size="sm">a \parallel c</MathText>, <MathText size="sm">b \parallel d</MathText>). Szemközti oldalai és szögei egyenlők.
            </p>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400">
              <strong>Átlók:</strong> Felezik egymást a metszéspontban! Középpontosan szimmetrikus alakzat.
            </div>
          </div>

          {/* Téglalap */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border-2 border-blue-200 dark:border-blue-900/60 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-blue-700 dark:text-blue-300">3. Téglalap</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600">minden szög 90°</span>
            </div>
            <svg viewBox="0 0 120 55" className="w-full h-16 mx-auto">
              <rect x="15" y="12" width="90" height="34" className="fill-blue-50 dark:fill-blue-950/40 stroke-blue-600 stroke-[2]" />
              <line x1="15" y1="12" x2="105" y2="46" className="stroke-blue-400 stroke-[1]" strokeDasharray="2 2" />
              <line x1="105" y1="12" x2="15" y2="46" className="stroke-blue-400 stroke-[1]" strokeDasharray="2 2" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Egyenlő szögű paralelogramma: mind a 4 szöge 90°. 2 tengelyes szimmetriával és 1 középpontos szimmetriával rendelkezik.
            </p>
            <div className="text-[11px] text-blue-600 dark:text-blue-400">
              <strong>Átlók:</strong> Egyenlő hosszúak (<MathText size="sm">e = f</MathText>) és felezik egymást.
            </div>
          </div>

          {/* Rombusz */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border-2 border-purple-200 dark:border-purple-900/60 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-purple-700 dark:text-purple-300">4. Rombusz</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-600">4 egyenlő oldal</span>
            </div>
            <svg viewBox="0 0 120 55" className="w-full h-16 mx-auto">
              <polygon points="60,8 105,28 60,48 15,28" className="fill-purple-50 dark:fill-purple-950/40 stroke-purple-600 stroke-[2]" />
              <line x1="60" y1="8" x2="60" y2="48" className="stroke-purple-500 stroke-[1.5]" />
              <line x1="15" y1="28" x2="105" y2="28" className="stroke-purple-500 stroke-[1.5]" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Egyenlő oldalú paralelogramma: mind a 4 oldala <MathText size="sm">a</MathText>. Szemközti szögei egyenlők, szomszédos szögek összege 180°.
            </p>
            <div className="text-[11px] text-purple-600 dark:text-purple-400">
              <strong>Átlók:</strong> Merőlegesen felezik egymást (<MathText size="sm">e \perp f</MathText>), és felezik a belső szögeket!
            </div>
          </div>

          {/* Négyzet */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border-2 border-emerald-300 dark:border-emerald-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-700 dark:text-emerald-300">5. Négyzet</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold">Szabályos négyszög</span>
            </div>
            <svg viewBox="0 0 120 55" className="w-full h-16 mx-auto">
              <rect x="40" y="8" width="40" height="40" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-600 stroke-[2]" />
              <line x1="40" y1="8" x2="80" y2="48" className="stroke-emerald-500 stroke-[1]" />
              <line x1="80" y1="8" x2="40" y2="48" className="stroke-emerald-500 stroke-[1]" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Egyszerre téglalap és rombusz! Minden oldala egyenlő, minden szöge 90°.
            </p>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
              <strong>Átlók:</strong> Egyenlő hosszúak, merőlegesen felezik egymást, 4 szimmetriatengely.
            </div>
          </div>

          {/* Deltoid */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border-2 border-rose-200 dark:border-rose-900/60 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-rose-700 dark:text-rose-300">6. Deltoid</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-600">2-2 szomszédos egyenlő</span>
            </div>
            <svg viewBox="0 0 120 55" className="w-full h-16 mx-auto">
              <polygon points="60,6 95,25 60,50 25,25" className="fill-rose-50 dark:fill-rose-950/40 stroke-rose-600 stroke-[2]" />
              <line x1="60" y1="6" x2="60" y2="50" className="stroke-rose-500 stroke-[1.5]" />
              <line x1="25" y1="25" x2="95" y2="25" className="stroke-rose-400 stroke-[1]" strokeDasharray="2 2" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Két-két szomszédos oldala egyenlő (<MathText size="sm">a = b</MathText> és <MathText size="sm">c = d</MathText>). A főátló a szimmetriatengely.
            </p>
            <div className="text-[11px] text-rose-600 dark:text-rose-400">
              <strong>Átlók:</strong> Merőlegesek egymásra (<MathText size="sm">e \perp f</MathText>), és a szimmetriaátló felezi a másikat.
            </div>
          </div>
        </div>

        {/* Összehasonlító táblázat */}
        <TheoryTable
          headers={['Négyszög', 'Oldalak', 'Szögek', 'Átlók tulajdonsága', 'Szimmetriatengelyek']}
          rows={[
            ['Trapéz', 'Legalább 1 pár párhuzamos', 'Szárakon összege 180°', 'Általában különböző', 'Húrtrapéz: 1 db'],
            ['Paralelogramma', '2 pár párhuzamos és egyenlő', 'Szemköztiek egyenlők', 'Felezik egymást', '0 (középpontosan szimm.)'],
            ['Téglalap', '2 pár párhuzamos és egyenlő', 'Mind a 4 derékszög (90°)', 'Egyenlők és felezik egymást', '2 db (oldalfelezők)'],
            ['Rombusz', 'Mind a 4 oldal egyenlő', 'Szemköztiek egyenlők', 'Merőlegesen felezik egymást', '2 db (az átlók)'],
            ['Négyzet', '4 egyenlő oldal', 'Mind a 4 derékszög (90°)', 'Egyenlők, merőlegesek, felezők', '4 db (2 oldalfelező + 2 átló)'],
            ['Deltoid', '2-2 szomszédos egyenlő', '1 pár szemközti szög egyenlő', 'Merőlegesek, főátló felez', '1 db (a főátló)']
          ]}
        />
      </TheorySection>

      {/* 4. FEJEZET: Interaktív Labor */}
      <TheorySection
        number="4"
        title="Interaktív Laboratórium: Szögkalkulátor és Szerkeszthetőség"
        badge="Interaktív Labor"
        badgeColor="purple"
      >
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          Próbáld ki a háromszögek és négyszögek számítási szabályait a gyakorlatban! Változtasd a szögek és oldalak értékeit, és figyeld az eredményt.
        </p>

        {/* Tab váltó gombok */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            size="sm"
            variant={labTab === 'triangleAngles' ? 'default' : 'outline'}
            onClick={() => setLabTab('triangleAngles')}
            className={cn('rounded-xl text-xs font-bold cursor-pointer', labTab === 'triangleAngles' && 'bg-emerald-600 hover:bg-emerald-700')}
          >
            <Triangle className="w-3.5 h-3.5 mr-1" />
            1. Háromszög Szögkalkulátor
          </Button>

          <Button
            size="sm"
            variant={labTab === 'triangleInequality' ? 'default' : 'outline'}
            onClick={() => setLabTab('triangleInequality')}
            className={cn('rounded-xl text-xs font-bold cursor-pointer', labTab === 'triangleInequality' && 'bg-teal-600 hover:bg-teal-700')}
          >
            <Ruler className="w-3.5 h-3.5 mr-1" />
            2. Háromszög-egyenlőtlenség Teszter
          </Button>

          <Button
            size="sm"
            variant={labTab === 'quadAngles' ? 'default' : 'outline'}
            onClick={() => setLabTab('quadAngles')}
            className={cn('rounded-xl text-xs font-bold cursor-pointer', labTab === 'quadAngles' && 'bg-indigo-600 hover:bg-indigo-700')}
          >
            <Square className="w-3.5 h-3.5 mr-1" />
            3. Négyszög 4. Szög Kalkulátor
          </Button>
        </div>

        {/* Labor tartalom */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          {/* TAB 1: Háromszög Szögkalkulátor */}
          {labTab === 'triangleAngles' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Adj meg két belső szöget a háromszögben:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>α (Alfa) szög:</span>
                    <span className="font-mono text-emerald-600 font-bold">{angleA}°</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="178"
                    value={angleA}
                    onChange={(e) => setAngleA(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>β (Béta) szög:</span>
                    <span className="font-mono text-teal-600 font-bold">{angleB}°</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="178"
                    value={angleB}
                    onChange={(e) => setAngleB(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>
              </div>

              {isTriangleAngleValid ? (
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                    <span className="text-xs font-bold text-slate-500">Számított harmadik szög (γ):</span>
                    <span className="text-base font-black font-mono text-emerald-600">
                      γ = 180° - ({angleA}° + {angleB}°) = {angleC}°
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                      <span className="text-slate-400 block text-[10px]">Típus szögek szerint:</span>
                      <strong className="text-emerald-700 dark:text-emerald-300">
                        {angleA < 90 && angleB < 90 && angleC < 90
                          ? 'Hegyesszögű háromszög'
                          : angleA === 90 || angleB === 90 || angleC === 90
                          ? 'Derékszögű háromszög'
                          : 'Tompaszögű háromszög'}
                      </strong>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                      <span className="text-slate-400 block text-[10px]">Típus oldalak szerint:</span>
                      <strong className="text-teal-700 dark:text-teal-300">
                        {angleA === 60 && angleB === 60 && angleC === 60
                          ? 'Szabályos (egyenlő oldalú)'
                          : angleA === angleB || angleA === angleC || angleB === angleC
                          ? 'Egyenlő szárú'
                          : 'Általános háromszög'}
                      </strong>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                      <span className="text-slate-400 block text-[10px]">γ melletti külső szög (γ'):</span>
                      <strong className="text-blue-700 dark:text-blue-300">
                        γ' = α + β = {angleA + angleB}°
                      </strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>A két szög összege eléri vagy meghaladja a 180°-ot ({angleA + angleB}°)! Ilyen háromszög nem létezhet a síkban.</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Háromszög-egyenlőtlenség Teszter */}
          {labTab === 'triangleInequality' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Adj meg 3 tetszőleges oldalhosszat (cm):
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">a oldal:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideA}
                    onChange={(e) => setSideA(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">b oldal:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideB}
                    onChange={(e) => setSideB(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">c oldal:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideC}
                    onChange={(e) => setSideC(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              <div className={cn(
                'p-4 rounded-xl border flex items-center justify-between gap-3',
                isTriangleInequalityValid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
              )}>
                <div className="space-y-1 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    {isTriangleInequalityValid ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>SZERKESZTHETŐ HÁROMSZÖG!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>NEM SZERKESZTHETŐ HÁROMSZÖG!</span>
                      </>
                    )}
                  </div>
                  <div className="font-mono text-[11px]">
                    Feltételek: {sideA} + {sideB} &gt; {sideC} ({sideA + sideB > sideC ? '✓' : '✗'}),{' '}
                    {sideA} + {sideC} &gt; {sideB} ({sideA + sideC > sideB ? '✓' : '✗'}),{' '}
                    {sideB} + {sideC} &gt; {sideA} ({sideB + sideC > sideA ? '✓' : '✗'})
                  </div>
                </div>

                {isTriangleInequalityValid && (
                  <div className="text-right text-xs">
                    <span className="text-slate-500 block text-[10px]">Kerület:</span>
                    <strong className="text-sm font-mono text-emerald-700">K = {sideA + sideB + sideC} cm</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Négyszög 4. Szög Kalkulátor */}
          {labTab === 'quadAngles' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Adj meg 3 belső szöget a négyszögben (összesen 360°):
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">α szög:</label>
                  <input
                    type="number"
                    min="1"
                    max="350"
                    value={quadA}
                    onChange={(e) => setQuadA(Number(e.target.value))}
                    className="w-full p-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">β szög:</label>
                  <input
                    type="number"
                    min="1"
                    max="350"
                    value={quadB}
                    onChange={(e) => setQuadB(Number(e.target.value))}
                    className="w-full p-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">γ szög:</label>
                  <input
                    type="number"
                    min="1"
                    max="350"
                    value={quadC}
                    onChange={(e) => setQuadC(Number(e.target.value))}
                    className="w-full p-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              {isQuadValid ? (
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">A négyszög hiányzó 4. szöge (δ):</span>
                    <span className="text-lg font-black font-mono text-indigo-600">
                      δ = 360° - ({quadA}° + {quadB}° + {quadC}°) = {quadD}°
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    Összesen: <span className="font-mono text-emerald-600">360°</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>A három szög összege eléri vagy meghaladja a 360°-ot ({quadA + quadB + quadC}°)!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TrianglesAndQuadrilateralsTheory;
