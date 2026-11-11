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
  BiquadraticSubstitutionSvg,
  FractionalCheckTreeSvg,
  SquareRootEquationCheckSvg,
  PolynomialFactoringSvg
} from './ReducibleFigures';
import {
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Compass,
  Layers,
  Split,
  Eye,
  Check,
  X
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface ReducibleTheoryProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

/**
 * Interaktív Visszavezethető Egyenlet Laboratórium
 * 2 interaktív mód: Bikvadratikus szimulátor és Négyzetgyökös egyenlet szimulátor
 */
const ReducibleEquationLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'biquadratic' | 'root'>('biquadratic');

  // Bikvadratikus állapotok: x⁴ + Bx² + C = 0 (a = 1)
  const [biqB, setBiqB] = useState<number>(-5);
  const [biqC, setBiqC] = useState<number>(4);

  // u-ra számítás: u² + Bu + C = 0
  const D_u = biqB * biqB - 4 * 1 * biqC;
  let u1: number | null = null;
  let u2: number | null = null;
  const xRoots: number[] = [];

  if (D_u >= 0) {
    const sqrtD = Math.sqrt(D_u);
    u1 = (-biqB - sqrtD) / 2;
    u2 = (-biqB + sqrtD) / 2;

    if (u1 > 0.0001) {
      const r = Math.sqrt(u1);
      xRoots.push(-r, r);
    } else if (Math.abs(u1) <= 0.0001) {
      xRoots.push(0);
    }

    if (u2 !== u1) {
      if (u2 > 0.0001) {
        const r = Math.sqrt(u2);
        xRoots.push(-r, r);
      } else if (Math.abs(u2) <= 0.0001) {
        if (!xRoots.includes(0)) xRoots.push(0);
      }
    }
    xRoots.sort((a, b) => a - b);
  }

  // Gyökös állapotok: √(x + A) = x - B
  const [rootA, setRootA] = useState<number>(5);
  const [rootB, setRootB] = useState<number>(1);

  // x + A = (x - B)² = x² - 2Bx + B² ⟹ x² - (2B + 1)x + (B² - A) = 0
  const quadB = -(2 * rootB + 1);
  const quadC = rootB * rootB - rootA;
  const D_root = quadB * quadB - 4 * 1 * quadC;
  let cand1: number | null = null;
  let cand2: number | null = null;
  let valid1 = false;
  let valid2 = false;

  if (D_root >= 0) {
    const sqrtD = Math.sqrt(D_root);
    cand1 = (-quadB - sqrtD) / 2;
    cand2 = (-quadB + sqrtD) / 2;

    // Ellenőrzés: bal oldal = √(cand + A), jobb oldal = cand - B
    if (cand1 + rootA >= 0 && cand1 - rootB >= 0 && Math.abs(Math.sqrt(cand1 + rootA) - (cand1 - rootB)) < 0.001) {
      valid1 = true;
    }
    if (cand2 + rootA >= 0 && cand2 - rootB >= 0 && Math.abs(Math.sqrt(cand2 + rootA) - (cand2 - rootB)) < 0.001) {
      valid2 = true;
    }
  }

  return (
    <div className="p-5 sm:p-7 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 rounded-3xl text-white shadow-2xl border border-cyan-800/40 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-800/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-cyan-500/20 rounded-xl text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-cyan-100">
              Interaktív Visszavezethető Egyenlet Labor
            </h3>
          </div>
          <p className="text-xs text-cyan-300/80 mt-1">
            Válassz típust, módosítsd a paramétereket, és figyeld meg az új ismeretlen bevezetését, a gyökvonást és a hamis gyökök szűrését!
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`text-xs ${activeTab === 'biquadratic' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-cyan-950/40 border-cyan-800 text-cyan-200'}`}
            onClick={() => setActiveTab('biquadratic')}
          >
            <Layers className="w-3.5 h-3.5 mr-1" /> Bikvadratikus (u = x²)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`text-xs ${activeTab === 'root' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-cyan-950/40 border-cyan-800 text-cyan-200'}`}
            onClick={() => setActiveTab('root')}
          >
            <Split className="w-3.5 h-3.5 mr-1" /> Gyökös egyenlet &amp; Hamis gyökök
          </Button>
        </div>
      </div>

      {/* 1. Mód: Bikvadratikus */}
      {activeTab === 'biquadratic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4 bg-cyan-950/40 p-5 rounded-2xl border border-cyan-800/30">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              1. Egyenlet beállítása: x⁴ + Bx² + C = 0
            </span>

            {/* B csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-cyan-200">
                <span>Másodfokú tag együtthatója (B):</span>
                <span className="font-mono text-amber-300 font-bold">{biqB}</span>
              </div>
              <Slider
                min={-10}
                max={10}
                step={1}
                value={[biqB]}
                onValueChange={([val]) => setBiqB(val)}
              />
            </div>

            {/* C csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-cyan-200">
                <span>Konstans tag (C):</span>
                <span className="font-mono text-amber-300 font-bold">{biqC}</span>
              </div>
              <Slider
                min={-16}
                max={16}
                step={1}
                value={[biqC]}
                onValueChange={([val]) => setBiqC(val)}
              />
            </div>

            {/* Egyenlet kiírás */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-cyan-800/50 font-mono text-xs space-y-1.5">
              <div className="text-slate-400">Eredeti negyedfokú:</div>
              <div className="text-amber-300 font-bold text-sm">
                x⁴ {biqB >= 0 ? `+ ${biqB}` : `- ${Math.abs(biqB)}`}x² {biqC >= 0 ? `+ ${biqC}` : `- ${Math.abs(biqC)}`} = 0
              </div>
              <div className="text-slate-400 pt-1 border-t border-slate-800">
                Helyettesítés: <strong className="text-cyan-300">u = x² (u ≥ 0)</strong> ⟹ u² {biqB >= 0 ? `+ ${biqB}` : `- ${Math.abs(biqB)}`}u {biqC >= 0 ? `+ ${biqC}` : `- ${Math.abs(biqC)}`} = 0
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-900/50 space-y-4">
              <div className="text-xs text-slate-300 border-b border-slate-800 pb-2">
                <strong>Másodfokú egyenlet megoldása u-ra:</strong>
                <p className="font-mono text-cyan-300 mt-1">
                  D_u = ({biqB})² - 4 · 1 · ({biqC}) = {D_u}
                </p>
                {D_u >= 0 && u1 !== null && u2 !== null ? (
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-mono font-bold ${u1 >= 0 ? 'bg-emerald-900/70 text-emerald-200 border border-emerald-700' : 'bg-rose-900/70 text-rose-200 border border-rose-700'}`}>
                      u₁ = {u1.toFixed(2)} {u1 >= 0 ? '✓ (≥ 0)' : '✗ (< 0 kiesik)'}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-xs font-mono font-bold ${u2 >= 0 ? 'bg-emerald-900/70 text-emerald-200 border border-emerald-700' : 'bg-rose-900/70 text-rose-200 border border-rose-700'}`}>
                      u₂ = {u2.toFixed(2)} {u2 >= 0 ? '✓ (≥ 0)' : '✗ (< 0 kiesik)'}
                    </span>
                  </div>
                ) : (
                  <p className="text-rose-400 font-bold mt-1">D_u &lt; 0 ⟹ Nincs valós u gyök!</p>
                )}
              </div>

              {/* Visszatérés x-hez */}
              <div className="p-4 bg-cyan-950/40 rounded-xl border border-cyan-800/40 space-y-2">
                <span className="text-xs font-bold text-cyan-200 block">
                  Visszatérés az eredeti ismeretlenhez (x = ±√u):
                </span>
                {xRoots.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {xRoots.map((r, i) => (
                        <span key={i} className="px-3 py-1 bg-emerald-500/20 border border-emerald-400 rounded-lg font-mono text-sm font-bold text-emerald-200">
                          x_{i + 1} = {r.toFixed(2)}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-300">
                      Összesen <strong className="text-amber-300">{xRoots.length} db valós gyök</strong> van.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-rose-300 font-bold">
                    Az egyenletnek nincs valós gyöke (sem u₁-ből, sem u₂-ből nem vonható valós négyzetgyök).
                  </p>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-cyan-900/30 rounded-xl border border-cyan-700/40 text-xs text-cyan-200">
              💡 <strong>Aranyszabály:</strong> Egy negyedfokú bikvadratikus egyenletnek <strong>0, 1, 2, 3 vagy 4 darab valós gyöke</strong> lehet, attól függően, hogy a kapott $u$ értékek közül hány darab pozitív, nulla, vagy negatív!
            </div>
          </div>
        </div>
      )}

      {/* 2. Mód: Gyökös egyenlet */}
      {activeTab === 'root' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4 bg-cyan-950/40 p-5 rounded-2xl border border-cyan-800/30">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              1. Gyökös egyenlet: √(x + A) = x - B
            </span>

            {/* A csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-cyan-200">
                <span>Gyök alatti konstans (A):</span>
                <span className="font-mono text-amber-300 font-bold">{rootA}</span>
              </div>
              <Slider
                min={1}
                max={15}
                step={1}
                value={[rootA]}
                onValueChange={([val]) => setRootA(val)}
              />
            </div>

            {/* B csúszka */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-cyan-200">
                <span>Jobb oldali kivonandó (B):</span>
                <span className="font-mono text-amber-300 font-bold">{rootB}</span>
              </div>
              <Slider
                min={0}
                max={6}
                step={1}
                value={[rootB]}
                onValueChange={([val]) => setRootB(val)}
              />
            </div>

            {/* Egyenlet kiírás */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-cyan-800/50 font-mono text-xs space-y-1.5">
              <div className="text-slate-400">Eredeti gyökös egyenlet:</div>
              <div className="text-amber-300 font-bold text-sm">
                √(x + {rootA}) = x - {rootB}
              </div>
              <div className="text-slate-400 pt-1 border-t border-slate-800 text-[11px]">
                Kikötés: x + {rootA} ≥ 0 ⟹ x ≥ -{rootA}, és x - {rootB} ≥ 0 ⟹ <strong className="text-cyan-300">x ≥ {rootB}</strong>!
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-900/50 space-y-3">
              <div className="text-xs text-slate-300 border-b border-slate-800 pb-2">
                <strong>Négyzetre emelt másodfokú egyenlet:</strong>
                <p className="font-mono text-cyan-300 mt-1">
                  x + {rootA} = (x - {rootB})² ⟹ x² {quadB >= 0 ? `+ ${quadB}` : `- ${Math.abs(quadB)}`}x {quadC >= 0 ? `+ ${quadC}` : `- ${Math.abs(quadC)}`} = 0
                </p>
              </div>

              {/* Gyökök ellenőrzése */}
              <div className="space-y-2">
                {cand1 !== null && cand2 !== null && (
                  <div className="space-y-2 text-xs font-mono">
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${valid1 ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-rose-950/60 border-rose-700 text-rose-200'}`}>
                      <span>x₁ = {cand1.toFixed(2)}</span>
                      <span>
                        {valid1 ? '✓ VALÓS GYÖK' : '✗ HAMIS GYÖK (jobb oldal negatív lenne)'}
                      </span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${valid2 ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-rose-950/60 border-rose-700 text-rose-200'}`}>
                      <span>x₂ = {cand2.toFixed(2)}</span>
                      <span>
                        {valid2 ? '✓ VALÓS GYÖK' : '✗ HAMIS GYÖK (jobb oldal negatív lenne)'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-cyan-900/30 rounded-xl border border-cyan-700/40 text-xs text-cyan-200">
              💡 <strong>Miért keletkezik hamis gyök?</strong> A négyzetre emelés nem ekvivalens átalakítás, mert $(-3)^2 = (+3)^2 = 9$. Ezért a négyzetre emelt egyenletnek megoldása lehet olyan szám is, ami az eredeti gyökös kifejezésben negatív értéket adna! <strong>Az ellenőrzés kötelező!</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ReducibleTheory: React.FC<ReducibleTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const sections: TheorySection[] = [
    // 1. Fejezet
    {
      id: 'sec-biquadratic',
      title: '1. Bikvadratikus egyenletek (ax⁴ + bx² + c = 0)',
      description: 'Hogyan alakítjuk a negyedfokú páros kitevős egyenletet másodfokúvá az u = x² helyettesítéssel?',
      color: 'cyan',
      badge: 'Bikvadratikus',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A bikvadratikus egyenlet elmélete és megoldásának 3 lépése"
            color="cyan"
            icon={<Layers className="w-5 h-5 text-cyan-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A <strong>bikvadratikus egyenlet</strong> (latin: <em>bi-quadratus</em> = kétszer-másodfokú) olyan negyedfokú algebrai egyenlet, amelyben kizárólag páros hatványok szerepelnek: $ax^4 + bx^2 + c = 0$ ($a \neq 0$). Mivel $x^4 = (x^2)^2$, új ismeretlen bevezetésével azonnal másodfokúvá egyszerűsíthető:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-cyan-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <BiquadraticSubstitutionSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A bikvadratikus egyenlet megoldásának folyamata az u = x² helyettesítéssel
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-cyan-50/80 border border-cyan-200 rounded-xl space-y-1">
                  <span className="font-bold text-xs text-cyan-900 block">1. Új ismeretlen</span>
                  <p className="font-mono text-xs text-cyan-700 font-bold">Legyen u = x²</p>
                  <p className="text-[11px] text-slate-600">Fontos kikötés: valós szám négyzete nemnegatív, így u ≥ 0!</p>
                </div>

                <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-1">
                  <span className="font-bold text-xs text-indigo-900 block">2. Megoldás u-ra</span>
                  <p className="font-mono text-xs text-indigo-700 font-bold">au² + bu + c = 0</p>
                  <p className="text-[11px] text-slate-600">Megoldóképlettel meghatározzuk u₁ és u₂ értékét.</p>
                </div>

                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                  <span className="font-bold text-xs text-emerald-900 block">3. Visszatérés x-hez</span>
                  <p className="font-mono text-xs text-emerald-700 font-bold">x = ±√u</p>
                  <p className="text-[11px] text-slate-600">Csak az u ≥ 0 gyökökből vonhatunk valós négyzetgyököt!</p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Kidolgozott Mintapélda */}
          <TheoryCard
            title="Mintapélda: x⁴ - 5x² + 4 = 0 részletes levezetése"
            color="cyan"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-cyan-950">
                Oldjuk meg a valós számok halmazán az $x^4 - 5x^2 + 4 = 0$ egyenletet!
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Helyettesítés:</p>
                <p className="text-cyan-900">Legyen u = x² (u ≥ 0). Ekkor: u² - 5u + 4 = 0</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Megoldás u-ra:</p>
                <p className="text-cyan-900">D = (-5)² - 4 · 1 · 4 = 25 - 16 = 9 = 3²</p>
                <p className="text-cyan-900">u₁,₂ = (5 ± 3) / 2 ⟹ u₁ = 1,  u₂ = 4 (mindkettő pozitív, u ≥ 0 teljesül!)</p>

                <p className="text-slate-500 font-sans font-bold pt-1">3. Lépés: Visszatérés x-hez:</p>
                <p className="text-slate-800 font-sans">
                  • 1. ág: $x^2 = 1 \implies$ <strong className="text-cyan-950 font-mono">x₁ = 1, x₂ = -1</strong>
                  <br />
                  • 2. ág: $x^2 = 4 \implies$ <strong className="text-cyan-950 font-mono">x₃ = 2, x₄ = -2</strong>
                  <br />
                  Az egyenletnek <strong>4 valós megoldása van</strong>: M = {'{ -2; -1; 1; 2 }'}.
                </p>
              </div>
            </div>
          </TheoryCard>

          <TheoryTrapBox title="Buktató: Mi történik, ha az egyik u negatív?">
            <p className="text-xs text-rose-800">
              Ha például az $x^4 - 3x^2 - 4 = 0$ egyenletet oldjuk meg, akkor $u_1 = 4$ és $u_2 = -1$. Az $u_1 = 4$-ből megkapjuk az $x = \pm 2$ gyököket. Az $u_2 = -1$-ből viszont $x^2 = -1$ lenne, aminek <strong>a valós számok körében nincs megoldása</strong>! Ezt az ágat egyszerűen elvetjük, és a végső válasz csak $x_1 = 2$ és $x_2 = -2$ lesz (2 valós gyök).
            </p>
          </TheoryTrapBox>
        </div>
      )
    },

    // 2. Fejezet
    {
      id: 'sec-compound',
      title: '2. Összetettebb algebrai kifejezések helyettesítése',
      description: 'Hogyan vezetünk be új ismeretlent, ha az egyenletben egy összetett zárójeles kifejezés ismétlődik?',
      color: 'cyan',
      badge: 'Kifejezés-helyettesítés',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A zárójeles blokk helyettesítésének módszere"
            color="cyan"
            icon={<ArrowRightLeft className="w-5 h-5 text-cyan-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Gyakran találkozunk olyan egyenletekkel, amelyek alakja $a \cdot [f(x)]^2 + b \cdot [f(x)] + c = 0$. Ha felbontanánk a zárójeleket, egy nehezen kezelhető harmad- vagy negyedfokú egyenletet kapnánk. Ehelyett a teljes ismétlődő kifejezést nevezzük el új ismeretlennek: <strong className="text-cyan-700 font-mono">u = f(x)</strong>.
              </p>

              <div className="p-4 bg-cyan-50/80 border border-cyan-200 rounded-2xl space-y-2">
                <span className="font-bold text-cyan-950 text-sm">Tipikus példák az iskolai feladatokból:</span>
                <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
                  <li>$(x^2 - 3x)^2 - 2(x^2 - 3x) - 8 = 0 \implies u = x^2 - 3x$</li>
                  <li>$(2x + 1/x)^2 - 5(2x + 1/x) + 6 = 0 \implies u = 2x + 1/x$</li>
                  <li>$(x^2 + x - 1)(x^2 + x + 2) = 40 \implies u = x^2 + x$</li>
                </ul>
              </div>
            </div>
          </TheoryCard>

          {/* Mintapélda */}
          <TheoryCard
            title="Mintapélda: (x² - 2x)² - 2(x² - 2x) - 3 = 0 megoldása"
            color="cyan"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Új ismeretlen bevezetése:</p>
                <p className="text-cyan-900">Legyen u = x² - 2x. Ekkor: u² - 2u - 3 = 0</p>
                <p className="text-cyan-900">Gyökök u-ra: u₁ = 3,  u₂ = -1</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Két külön másodfokú egyenlet x-re:</p>
                <p className="text-slate-800 font-sans">
                  • 1. Eset ($u_1 = 3$): $x^2 - 2x = 3 \implies x^2 - 2x - 3 = 0 \implies$ <strong className="text-cyan-950 font-mono">x₁ = 3, x₂ = -1</strong>
                  <br />
                  • 2. Eset ($u_2 = -1$): $x^2 - 2x = -1 \implies x^2 - 2x + 1 = 0 \implies (x - 1)^2 = 0 \implies$ <strong className="text-cyan-950 font-mono">x₃ = 1</strong> (kettős gyök)
                  <br />
                  A teljes megoldáshalmaz: M = {'{ -1; 1; 3 }'}.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 3. Fejezet
    {
      id: 'sec-fractional',
      title: '3. Ismeretlent a nevezőben tartalmazó (törtes) egyenletek',
      description: 'Hogyan szűrjük ki a hamis gyököket közös nevezővel való beszorzás után?',
      color: 'cyan',
      badge: 'Törtes Egyenletek',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A törtes egyenletek megoldásának 4 szigorú lépése"
            color="cyan"
            icon={<AlertTriangle className="w-5 h-5 text-cyan-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Ha az egyenletben a nevező tartalmazza az ismeretlent, a feladat legfontosabb lépése a <strong>kikötés rögzítése</strong>. Mivel nullával nem lehet osztani, a nevezőket nullává tevő értékeket azonnal ki kell zárni:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-cyan-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <FractionalCheckTreeSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A törtes egyenlet megoldásának és a hamis gyökök kizárásának döntési fája
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-slate-900 text-sm">A 4 kötelező lépés:</span>
                <ol className="text-xs text-slate-700 list-decimal list-inside space-y-1">
                  <li><strong>Kikötés felírása:</strong> Nevező ≠ 0 (még a beszorzás előtt!).</li>
                  <li><strong>Közös nevező meghatározása és beszorzás:</strong> a törtek eltüntetése.</li>
                  <li><strong>Másodfokú egyenlet 0-ra rendezése és megoldása.</strong></li>
                  <li><strong>Összevetés a kikötéssel:</strong> a tiltott gyökök azonnali kizárása.</li>
                </ol>
              </div>
            </div>
          </TheoryCard>

          {/* Mintapélda */}
          <TheoryCard
            title="Mintapélda: 6/(x - 2) - 1 = x/(x - 2) megoldása"
            color="cyan"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Kikötés:</p>
                <p className="text-rose-700 font-bold">x - 2 ≠ 0 ⟹ x ≠ 2</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Beszorzás (x - 2)-vel:</p>
                <p className="text-cyan-900">6 - 1 · (x - 2) = x ⟹ 6 - x + 2 = x ⟹ 8 = 2x ⟹ x = 4</p>

                <p className="text-slate-500 font-sans font-bold pt-1">3. Lépés: Ellenőrzés a kikötéssel:</p>
                <p className="text-slate-800 font-sans">
                  Az $x = 4$ nem ütközik az $x \neq 2$ kikötéssel, így a megoldás érvényes: <strong className="text-emerald-800">x = 4</strong>.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 4. Fejezet
    {
      id: 'sec-root-eq',
      title: '4. Négyzetgyökös egyenletek másodfokúvá alakítása',
      description: 'Miért nem ekvivalens a négyzetre emelés és hogyan zárjuk ki a hamis gyököket?',
      color: 'cyan',
      badge: 'Gyökös Egyenletek',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A négyzetre emelés csapdája és a hamis gyökök keletkezése"
            color="cyan"
            icon={<Compass className="w-5 h-5 text-cyan-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A négyzetgyökös egyenletek megoldásának alapmódszere a gyökös kifejezés izolálása (egyik oldalra rendezése), majd mindkét oldal négyzetre emelése. Azonban a négyzetre emelés <strong>nem ekvivalens átalakítás</strong>: kibővíti a megoldáshalmazt, mert $(-A)^2 = (+A)^2$.
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-cyan-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <SquareRootEquationCheckSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A négyzetre emelés során keletkező hamis gyökök behelyettesítéses szűrése
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                  <span className="font-bold text-amber-950 text-sm">Értelmezési feltételek</span>
                  <p className="text-xs text-slate-600">
                    A √(A) = B egyenletnél két dolgot kell szem előtt tartani:
                  </p>
                  <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
                    <li>$A \ge 0$ (gyök alatt nem állhat negatív szám).</li>
                    <li>$B \ge 0$ (a négyzetgyök értéke definíció szerint nemnegatív, így a jobb oldal sem lehet negatív!).</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="font-bold text-emerald-950 text-sm">Az ellenőrzés kötelező!</span>
                  <p className="text-xs text-slate-600">
                    Mivel a négyzetre emelés hamis gyököket hozhat létre, a kapott gyököket <strong>mindig be kell helyettesíteni az eredeti egyenletbe</strong>. Ha valamelyik gyök nem teljesíti az egyenlőséget, elvetjük.
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 5. Fejezet
    {
      id: 'sec-factoring',
      title: '5. Szorzattá alakítással megoldható magasabb fokú egyenletek',
      description: 'Kiemelés és csoportosítás: hogyan bontjuk a kifejezést első- és másodfokú szorzótényezőkre?',
      color: 'cyan',
      badge: 'Szorzattá Alakítás',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A szorzat-nulla tétel magasabb fokú egyenleteknél"
            color="cyan"
            icon={<Split className="w-5 h-5 text-cyan-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Egy szorzat akkor és csak akkor nulla, ha valamelyik tényezője nulla: {'$A \\cdot B = 0 \\iff A = 0 \\text{ vagy } B = 0$'}. Ha egy harmad- vagy negyedfokú polinomot szorzattá tudunk alakítani, a megoldása visszavezethető első- és másodfokú egyenletekre:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-cyan-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <PolynomialFactoringSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  Szorzattá alakítás kiemeléssel és páronkénti csoportosítással
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2">
                  <span className="font-bold text-purple-950 text-sm">1. Ismeretlen (x) kiemelése</span>
                  <p className="text-xs text-slate-600">
                    Ha az egyenletben nincs konstans tag (pl. $x^3 - 4x = 0$):
                  </p>
                  <p className="font-mono text-xs text-purple-900 font-bold">x · (x² - 4) = 0</p>
                  <p className="text-[11px] text-purple-800">
                    Gyökök: $x_1 = 0$, $x_{2, 3} = \pm 2$. Sose osszunk $x$-szel, mert elveszítjük a nullagyököt!
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="font-bold text-slate-900 text-sm">2. Páronkénti csoportosítás</span>
                  <p className="text-xs text-slate-600">
                    Négytagú kifejezéseknél (pl. $x^3 - 3x^2 - 4x + 12 = 0$):
                  </p>
                  <p className="font-mono text-xs text-slate-900 font-bold">x²(x - 3) - 4(x - 3) = (x - 3)(x² - 4) = 0</p>
                  <p className="text-[11px] text-slate-700">
                    Gyökök: $x_1 = 3$, $x_{2, 3} = \pm 2$.
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Másodfokú Egyenletre Visszavezethető Feladatok"
      subtitle="Bikvadratikus egyenletek, új ismeretlen bevezetése, törtes és gyökös egyenletek"
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TANANYAG"
      themeColor="cyan"
      quickRule={{
        label: 'Új Ismeretlen Bevezetése (u-helyettesítés)',
        align: 'left',
        formula: (
          <div className="space-y-1.5 text-slate-800 dark:text-slate-100">
            <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50">
              <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 block">Bikvadratikus: ax⁴ + bx² + c = 0</span>
              <span className="font-mono text-xs font-bold text-cyan-700 dark:text-cyan-400 block mt-0.5">
                u = x² &nbsp;(u ≥ 0) ⟹ au² + bu + c = 0
              </span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300">
              Visszahelyettesítés kötelező: x = ±√u (negatív u nem ad valós x gyököt!).
            </div>
          </div>
        )
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={<ReducibleEquationLab />}
    />
  );
};

