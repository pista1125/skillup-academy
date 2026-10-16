import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Shapes,
  Ruler,
  Square,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Maximize2,
  Layers,
  Flame,
  Check,
  Zap
} from 'lucide-react';
import {
  PerimeterConceptSvg,
  TrianglePerimetersSvg,
  QuadrilateralPerimetersSvg,
  HalfPerimeterMissingSideSvg
} from './PolygonPerimeterDiagrams';

interface PolygonPerimeterTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PolygonPerimeterTheory: React.FC<PolygonPerimeterTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív demonstráció állapota
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'square' | 'triangle' | 'regularHexagon'>('rectangle');
  const [sideA, setSideA] = useState<number>(6);
  const [sideB, setSideB] = useState<number>(4);
  const [sideC, setSideC] = useState<number>(5);

  // Számított kerület
  let calculatedPerimeter = 0;
  let formulaText = '';
  let calculationDetails = '';

  if (selectedShape === 'rectangle') {
    calculatedPerimeter = 2 * (sideA + sideB);
    formulaText = 'K = 2 · (a + b)';
    calculationDetails = `K = 2 · (${sideA} cm + ${sideB} cm) = 2 · ${sideA + sideB} cm = ${calculatedPerimeter} cm`;
  } else if (selectedShape === 'square') {
    calculatedPerimeter = 4 * sideA;
    formulaText = 'K = 4 · a';
    calculationDetails = `K = 4 · ${sideA} cm = ${calculatedPerimeter} cm`;
  } else if (selectedShape === 'triangle') {
    calculatedPerimeter = sideA + sideB + sideC;
    formulaText = 'K = a + b + c';
    calculationDetails = `K = ${sideA} cm + ${sideB} cm + ${sideC} cm = ${calculatedPerimeter} cm`;
  } else if (selectedShape === 'regularHexagon') {
    calculatedPerimeter = 6 * sideA;
    formulaText = 'K = 6 · a';
    calculationDetails = `K = 6 · ${sideA} cm = ${calculatedPerimeter} cm`;
  }

  const sections: TheorySection[] = [
    {
      id: 'kerulet-fogalma',
      title: 'A kerület fogalma és alapelve',
      badge: 'Alapfogalom',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Egy síkidom (sokszög) <strong>kerülete</strong> a síkidomot határoló oldalak hosszának az összege.
            Képzeld el úgy, mintha körbejárnád a síkidom szélét egy mérőszalaggal: a teljes megtett távolság adja meg a kerületet!
          </p>

          {/* Kiemelt szabály kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-blue-300 dark:border-blue-800 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-sky-50 dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
              <Sparkles className="w-3 h-3 text-blue-600" /> A kerület általános definíciója
            </span>
            <div className="text-base sm:text-lg font-mono font-bold text-slate-800 dark:text-slate-100">
              K = a + b + c + ... + n (az összes határoló oldal összege)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              A kerület jele a nagy <strong>K</strong> (néha P a latin <em>perimeter</em> szóból). Mértékegysége megegyezik a hosszúság mértékegységeivel: mm, cm, dm, m, km.
            </p>
          </div>

          {/* Aranyszabály: Mértékegységek egységesítése */}
          <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h5 className="font-bold text-amber-900 dark:text-amber-200">1. számú aranyszabály: Előbb azonos mértékegység!</h5>
              <p className="text-slate-700 dark:text-slate-300">
                Összeadás előtt <strong>minden oldalhosszt azonos mértékegységre</strong> kell átváltani! Például ha egy téglalap oldalai <strong>a = 40 cm</strong> és <strong>b = 3 dm</strong>, akkor először a 3 dm-t átváltjuk 30 cm-re (vagy a 40 cm-t 4 dm-re), és csak ezután számolunk: K = 2 · (40 + 30) = 140 cm.
              </p>
            </div>
          </div>

          {/* SVG 1: Kerület fogalma sokszög körüljárással */}
          <PerimeterConceptSvg />
        </div>
      )
    },
    {
      id: 'haromszogek-kerulete',
      title: 'Háromszögek kerülete',
      badge: 'Háromszögek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Minden háromszögnek 3 oldala van. Az oldalak egyenlősége szerint három fő esetet különböztetünk meg:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Általános háromszög */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Általános háromszög</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">3 különböző oldal</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-mono font-bold text-center text-sm">
                K = a + b + c
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Példa: a = 5 cm, b = 7 cm, c = 8 cm<br />
                K = 5 + 7 + 8 = <strong>20 cm</strong>
              </p>
            </div>

            {/* Egyenlő szárú háromszög */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Egyenlő szárú háromszög</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">alap + 2 szár</span>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 font-mono font-bold text-center text-sm">
                K = a + 2 · b
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Példa: alap a = 6 cm, szár b = 10 cm<br />
                K = 6 + 2 · 10 = 6 + 20 = <strong>26 cm</strong>
              </p>
            </div>

            {/* Szabályos háromszög */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Szabályos (egyenlő oldalú)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">3 egyenlő oldal</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-center text-sm">
                K = 3 · a
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Példa: oldala a = 9 cm<br />
                K = 3 · 9 = <strong>27 cm</strong> (visszafelé: a = K : 3)
              </p>
            </div>
          </div>

          {/* SVG 2: Háromszögek kerülete ábra */}
          <TrianglePerimetersSvg />
        </div>
      )
    },
    {
      id: 'negyszogek-kerulete',
      title: 'Négyszögek kerülete (téglalap, négyzet, paralelogramma, rombusz)',
      badge: 'Négyszögek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            A négyszögek kerületénél a szemközti oldalak egyenlőségét kihasználva egyszerűsített, gyors számolási képleteket használunk:
          </p>

          {/* SVG 3: Négyszögek kerületképletei vizuális galéria */}
          <QuadrilateralPerimetersSvg />

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-2.5">Síkidom</th>
                  <th className="p-2.5">Képlet</th>
                  <th className="p-2.5">Miért így számoljuk?</th>
                  <th className="p-2.5">Példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Téglalap</td>
                  <td className="p-2.5 font-mono font-bold text-blue-600">K = 2 · (a + b)</td>
                  <td className="p-2.5">Két-két szemközti oldala egyenlő hosszú</td>
                  <td className="p-2.5 font-mono">a = 8, b = 5 → K = 2 · 13 = 26 cm</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Négyzet</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">K = 4 · a</td>
                  <td className="p-2.5">Mind a 4 oldala egyenlő hosszú</td>
                  <td className="p-2.5 font-mono">a = 7 cm → K = 4 · 7 = 28 cm</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Paralelogramma</td>
                  <td className="p-2.5 font-mono font-bold text-indigo-600">K = 2 · (a + b)</td>
                  <td className="p-2.5">A szemközti oldalai párhuzamosak és egyenlők</td>
                  <td className="p-2.5 font-mono">a = 6, b = 4 → K = 2 · 10 = 20 cm</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Rombusz</td>
                  <td className="p-2.5 font-mono font-bold text-teal-600">K = 4 · a</td>
                  <td className="p-2.5">Minden oldala egyenlő, mint a négyzetnél</td>
                  <td className="p-2.5 font-mono">a = 12 cm → K = 4 · 12 = 48 cm</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Deltoid</td>
                  <td className="p-2.5 font-mono font-bold text-purple-600">K = 2 · (a + b)</td>
                  <td className="p-2.5">Két-két szomszédos oldala egyenlő hosszú</td>
                  <td className="p-2.5 font-mono">a = 3, b = 9 → K = 2 · 12 = 24 cm</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Trapéz</td>
                  <td className="p-2.5 font-mono font-bold text-amber-600">K = a + b + c + d</td>
                  <td className="p-2.5">Általában mind a négy oldala különböző (egyenlő szárúnál: a + c + 2b)</td>
                  <td className="p-2.5 font-mono">a=10, c=6, b=d=5 → K = 26 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'visszafele-szamolas',
      title: 'Visszafelé számolások: Oldalhossz meghatározása a kerületből',
      badge: 'Fontos feladattípus',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Nagyon gyakori feladat dolgozatokban és felvételikben, hogy <strong>a kerület adott</strong>, és az egyik vagy mindkét <strong>oldalhosszt kell megkeresnünk</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Négyzet oldala */}
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
              <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Négyzet oldala a kerületből
              </h5>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900 font-mono font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                a = K : 4
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Példa: Ha egy négyzet alakú szoba kerülete 36 méter, mekkora egy oldala?<br />
                <strong>a = 36 : 4 = 9 méter</strong>.
              </p>
            </div>

            {/* Téglalap hiányzó oldala */}
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
              <h5 className="font-bold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" /> Téglalap hiányzó oldala (félkerület!)
              </h5>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900 font-mono font-bold text-blue-800 dark:text-blue-300 text-xs">
                a + b = K : 2 → b = (K : 2) - a
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Példa: A téglalap kerülete K = 40 cm, egyik oldala a = 12 cm. Mekkora a másik oldala?<br />
                Félkerület: 40 : 2 = 20 cm.<br />
                Másik oldal: <strong>b = 20 - 12 = 8 cm</strong>.
              </p>
            </div>
          </div>

          {/* SVG 4: Félkerület és hiányzó oldal ábra */}
          <HalfPerimeterMissingSideSvg />
        </div>
      )
    },
    {
      id: 'interaktiv-kalkulator',
      title: 'Interaktív Síkidom és Kerület Vizsgáló Műhely',
      badge: 'Interaktív labor',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Válassz ki egy síkidomot, állítsd az oldalhosszakat a csúszkákkal, és figyeld meg az alakzat alakulását és a kerület automatikus kiszámítását!
          </p>

          {/* Síkidom választó fülek */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedShape === 'rectangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedShape('rectangle')}
              className="text-xs"
            >
              Téglalap
            </Button>
            <Button
              variant={selectedShape === 'square' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedShape('square')}
              className="text-xs"
            >
              Négyzet
            </Button>
            <Button
              variant={selectedShape === 'triangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedShape('triangle')}
              className="text-xs"
            >
              Általános háromszög
            </Button>
            <Button
              variant={selectedShape === 'regularHexagon' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedShape('regularHexagon')}
              className="text-xs"
            >
              Szabályos hatszög
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {/* SVG Megjelenítő */}
            <div className="h-64 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <span className="absolute top-3 left-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" /> Geometriai Modell
              </span>

              <svg viewBox="0 0 280 180" className="w-full h-full max-h-[170px]">
                {selectedShape === 'rectangle' && (
                  <g transform="translate(140, 90)">
                    <rect
                      x={-(sideA * 12)}
                      y={-(sideB * 12)}
                      width={sideA * 24}
                      height={sideB * 24}
                      rx="4"
                      fill="#3b82f620"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                    {/* Oldaljelölések */}
                    <text x="0" y={-(sideB * 12) - 6} fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x={sideA * 12 + 10} y="4" fill="#60a5fa" fontSize="12" fontWeight="bold">
                      b = {sideB} cm
                    </text>
                  </g>
                )}

                {selectedShape === 'square' && (
                  <g transform="translate(140, 90)">
                    <rect
                      x={-(sideA * 12)}
                      y={-(sideA * 12)}
                      width={sideA * 24}
                      height={sideA * 24}
                      rx="4"
                      fill="#10b98120"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <text x="0" y={-(sideA * 12) - 6} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x={sideA * 12 + 10} y="4" fill="#34d399" fontSize="12" fontWeight="bold">
                      a = {sideA} cm
                    </text>
                  </g>
                )}

                {selectedShape === 'triangle' && (
                  <g transform="translate(40, 130)">
                    <polygon
                      points={`0,0 ${sideA * 20},0 ${sideA * 10},-${sideB * 16}`}
                      fill="#f59e0b20"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <text x={(sideA * 20) / 2} y="18" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x={(sideA * 10) / 2 - 12} y={-(sideB * 8)} fill="#fbbf24" fontSize="11" fontWeight="bold">
                      b = {sideB} cm
                    </text>
                    <text x={(sideA * 15) + 6} y={-(sideB * 8)} fill="#fbbf24" fontSize="11" fontWeight="bold">
                      c = {sideC} cm
                    </text>
                  </g>
                )}

                {selectedShape === 'regularHexagon' && (
                  <g transform="translate(140, 90)">
                    {/* Szabályos hatszög csúcsai */}
                    <polygon
                      points={Array.from({ length: 6 }).map((_, i) => {
                        const angle = (i * 60 * Math.PI) / 180;
                        const r = sideA * 10;
                        return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
                      }).join(' ')}
                      fill="#8b5cf620"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                    />
                    <text x="0" y="4" fill="#c4b5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                      6 · a ({sideA} cm)
                    </text>
                  </g>
                )}
              </svg>

              <div className="text-center font-mono font-bold text-xs text-slate-300">
                {formulaText}
              </div>
            </div>

            {/* Vezérlők és eredmény */}
            <div className="space-y-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{selectedShape === 'square' || selectedShape === 'regularHexagon' ? 'Oldalhossz (a):' : 'a oldal hossza:'}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{sideA} cm</span>
                  </div>
                  <Slider
                    min={2}
                    max={12}
                    step={1}
                    value={[sideA]}
                    onValueChange={(val) => setSideA(val[0])}
                  />
                </div>

                {(selectedShape === 'rectangle' || selectedShape === 'triangle') && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>b oldal hossza:</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{sideB} cm</span>
                    </div>
                    <Slider
                      min={2}
                      max={10}
                      step={1}
                      value={[sideB]}
                      onValueChange={(val) => setSideB(val[0])}
                    />
                  </div>
                )}

                {selectedShape === 'triangle' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>c oldal hossza:</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400">{sideC} cm</span>
                    </div>
                    <Slider
                      min={2}
                      max={12}
                      step={1}
                      value={[sideC]}
                      onValueChange={(val) => setSideC(val[0])}
                    />
                  </div>
                )}
              </div>

              {/* Számított eredmény kártya */}
              <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/40 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Kiszámított kerület (K):
                </span>
                <div className="text-xl font-mono font-black text-blue-800 dark:text-blue-200">
                  {calculatedPerimeter} cm
                </div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  {calculationDetails}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="A sokszögek kerülete"
      subtitle="A határoló vonalak összhossza, háromszögek, négyszögek és szabályos sokszögek kerületszámítása"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="blue"
      pdfFilename="6_osztaly_V_a_sokszogek_kerulete_tananyag.pdf"
      ruleTitle="Kiemelt kerületképletek"
      ruleFormula="K = a + b + c + \dots \quad • \quad K_{\text{téglalap}} = 2(a + b) \quad • \quad K_{\text{szabályos}} = n \cdot a"
      quickRule={{
        label: 'Kiemelt kerületképletek',
        formula: 'K = a + b + c + \\dots \\quad • \\quad K_{\\text{téglalap}} = 2(a + b) \\quad • \\quad K_{\\text{szabályos}} = n \\cdot a'
      }}
      practiceTitle="Készen állsz a sokszögek kerületének gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod az interaktív feladatokban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};

export default PolygonPerimeterTheory;
