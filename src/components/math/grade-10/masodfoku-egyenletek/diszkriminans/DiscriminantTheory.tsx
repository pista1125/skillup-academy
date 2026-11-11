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
  DiscriminantCasesSvg,
  DiscriminantFormulaSvg,
  DiscriminantParabolaFamilySvg,
  SignOfQuadraticSvg
} from './DiscriminantFigures';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Compass,
  TrendingUp,
  Layers,
  HelpCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface DiscriminantTheoryProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

/**
 * Interaktív Diszkrimináns és Parabola Laboratórium
 * Valós idejű együttható-állító, diszkrimináns-kalkulátor és parabola-kirajzoló
 */
const DiscriminantVisualizerLab: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-4);
  const [c, setC] = useState<number>(3);

  // Számítások
  const safeA = a === 0 ? 0.001 : a;
  const D = b * b - 4 * safeA * c;
  const vertexX = -b / (2 * safeA);
  const vertexY = -D / (4 * safeA);

  let rootCountText = '';
  let rootCountBadge = '';
  let badgeColor = '';
  let x1: number | null = null;
  let x2: number | null = null;

  if (D > 0.0001) {
    const sqrtD = Math.sqrt(D);
    x1 = (-b - sqrtD) / (2 * safeA);
    x2 = (-b + sqrtD) / (2 * safeA);
    rootCountText = '2 különböző valós gyök létezik';
    rootCountBadge = 'D > 0 (Metsző parabola)';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (Math.abs(D) <= 0.0001) {
    x1 = -b / (2 * safeA);
    x2 = x1;
    rootCountText = '1 valós gyök létezik (két egybeeső valós gyök)';
    rootCountBadge = 'D = 0 (Érintő parabola)';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
  } else {
    rootCountText = 'Nincs valós gyök (D < 0)';
    rootCountBadge = 'D < 0 (Lebegő parabola)';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
  }

  // Koordináta leképezés az SVG-hez (középpont: 220, 130)
  // X: [-6; +6] -> [40; 400], skála: 30 px / egység
  // Y: [-6; +6] -> [220; 40], skála: 20 px / egység
  const originX = 220;
  const originY = 130;
  const scaleX = 28;
  const scaleY = 16;

  // Parabola görbe pontjainak generálása
  const points: string[] = [];
  for (let xCoord = -6; xCoord <= 6; xCoord += 0.25) {
    const yVal = safeA * xCoord * xCoord + b * xCoord + c;
    const svgX = originX + xCoord * scaleX;
    const svgY = originY - yVal * scaleY;
    if (svgY >= 10 && svgY <= 250) {
      points.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
    }
  }
  const pathD = points.length > 1 ? `M ${points.join(' L ')}` : '';

  const setPreset = (presetA: number, presetB: number, presetC: number) => {
    setA(presetA);
    setB(presetB);
    setC(presetC);
  };

  return (
    <div className="p-5 sm:p-7 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl text-white shadow-2xl border border-purple-800/40 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-500/20 rounded-xl text-purple-300 border border-purple-500/30">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-purple-100">
              Interaktív Diszkrimináns &amp; Parabola Labor
            </h3>
          </div>
          <p className="text-xs text-purple-300/80 mt-1">
            Mozgasd a csúszkákat és figyeld meg valós időben, hogyan alakul a diszkrimináns, a parabola alakja és a metszéspontok száma!
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs bg-purple-900/40 border-purple-700/60 text-purple-200 hover:bg-purple-800/50"
            onClick={() => setPreset(1, -4, 3)}
          >
            D &gt; 0 (2 gyök)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs bg-purple-900/40 border-purple-700/60 text-purple-200 hover:bg-purple-800/50"
            onClick={() => setPreset(1, -4, 4)}
          >
            D = 0 (1 gyök)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs bg-purple-900/40 border-purple-700/60 text-purple-200 hover:bg-purple-800/50"
            onClick={() => setPreset(1, -4, 5)}
          >
            D &lt; 0 (0 gyök)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs bg-purple-900/40 border-purple-700/60 text-purple-200 hover:bg-purple-800/50"
            onClick={() => setPreset(-1, 2, 3)}
          >
            a &lt; 0 (lefelé nyíló)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Bal oldal: Csúszkák és egyenlet */}
        <div className="lg:col-span-5 space-y-5 bg-purple-950/40 p-5 rounded-2xl border border-purple-800/30">
          <div className="text-center p-3 bg-purple-900/50 rounded-xl border border-purple-700/50">
            <span className="text-xs text-purple-300 block font-medium">Aktuális egyenlet:</span>
            <div className="font-mono text-lg sm:text-xl font-black text-amber-300 tracking-wider">
              {safeA === 1 ? '' : safeA === -1 ? '-' : `${safeA}`}x²{' '}
              {b >= 0 ? `+ ${b === 1 ? '' : b}` : `- ${Math.abs(b) === 1 ? '' : Math.abs(b)}`}x{' '}
              {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
            </div>
          </div>

          {/* a csúszka */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-purple-200">
              <span>Főegyüttható (a):</span>
              <span className="font-mono text-amber-300 font-bold">{safeA}</span>
            </div>
            <Slider
              min={-3}
              max={3}
              step={0.5}
              value={[a]}
              onValueChange={([val]) => setA(val === 0 ? (a < 0 ? 0.5 : -0.5) : val)}
              className="py-1"
            />
            <div className="flex justify-between text-[10px] text-purple-400">
              <span>-3 (lefelé nyíló)</span>
              <span>+3 (felfelé nyíló)</span>
            </div>
          </div>

          {/* b csúszka */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-purple-200">
              <span>Elsőfokú tag (b):</span>
              <span className="font-mono text-amber-300 font-bold">{b}</span>
            </div>
            <Slider
              min={-6}
              max={6}
              step={1}
              value={[b]}
              onValueChange={([val]) => setB(val)}
              className="py-1"
            />
            <div className="flex justify-between text-[10px] text-purple-400">
              <span>-6</span>
              <span>+6</span>
            </div>
          </div>

          {/* c csúszka */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-purple-200">
              <span>Konstans tag (c):</span>
              <span className="font-mono text-amber-300 font-bold">{c}</span>
            </div>
            <Slider
              min={-6}
              max={6}
              step={1}
              value={[c]}
              onValueChange={([val]) => setC(val)}
              className="py-1"
            />
            <div className="flex justify-between text-[10px] text-purple-400">
              <span>-6</span>
              <span>+6</span>
            </div>
          </div>

          {/* Kiszámított adatok panel */}
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-purple-800/60 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Diszkrimináns képlete:</span>
              <span className="font-mono text-purple-200 font-bold">D = b² - 4ac</span>
            </div>
            <div className="flex justify-between items-center text-slate-300 font-mono">
              <span>D levezetése:</span>
              <span>({b})² - 4 · ({safeA}) · ({c})</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-purple-900/60">
              <span className="font-bold text-slate-200">D értéke:</span>
              <span className={`font-mono font-black text-sm ${D > 0 ? 'text-emerald-400' : D === 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                D = {D.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Jobb oldal: SVG Koordinátarendszer & Eredmény kártya */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-slate-950 p-3 rounded-2xl border border-purple-900/50 shadow-inner flex flex-col items-center justify-center overflow-hidden">
            {/* SVG Grafikon */}
            <svg
              viewBox="0 0 440 260"
              className="w-full max-w-md h-auto select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rács */}
              <defs>
                <pattern id="labGrid" width="28" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 16" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.4" />
                </pattern>
              </defs>
              <rect width="440" height="260" fill="url(#labGrid)" />

              {/* Tengelyek */}
              {/* X tengely */}
              <line x1="20" y1={originY} x2="420" y2={originY} stroke="#94A3B8" strokeWidth="1.5" />
              <polygon points={`422,${originY} 414,${originY - 4} 414,${originY + 4}`} fill="#94A3B8" />
              <text x="415" y={originY - 8} fill="#CBD5E1" fontSize="10" fontWeight="bold">x</text>

              {/* Y tengely */}
              <line x1={originX} y1="245" x2={originX} y2="15" stroke="#94A3B8" strokeWidth="1.5" />
              <polygon points={`${originX},12 ${originX - 4},20 ${originX + 4},20`} fill="#94A3B8" />
              <text x={originX + 8} y="22" fill="#CBD5E1" fontSize="10" fontWeight="bold">y</text>

              {/* Skála jelölések */}
              {[-4, -2, 2, 4].map((num) => (
                <g key={`tick-x-${num}`}>
                  <line
                    x1={originX + num * scaleX}
                    y1={originY - 3}
                    x2={originX + num * scaleX}
                    y2={originY + 3}
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                  <text
                    x={originX + num * scaleX}
                    y={originY + 14}
                    fill="#94A3B8"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {num}
                  </text>
                </g>
              ))}

              {/* Parabola görbe */}
              {pathD && (
                <path
                  d={pathD}
                  stroke={D > 0 ? '#10B981' : D === 0 ? '#F59E0B' : '#F43F5E'}
                  strokeWidth="3"
                  fill="none"
                />
              )}

              {/* Metszéspontok az x-tengellyel */}
              {x1 !== null && Math.abs(x1) <= 6 && (
                <circle
                  cx={originX + x1 * scaleX}
                  cy={originY}
                  r="5"
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              )}
              {x2 !== null && x1 !== x2 && Math.abs(x2) <= 6 && (
                <circle
                  cx={originX + x2 * scaleX}
                  cy={originY}
                  r="5"
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              )}

              {/* Csúcspont jelölő */}
              {Math.abs(vertexX) <= 6 && Math.abs(vertexY) <= 8 && (
                <g>
                  <circle
                    cx={originX + vertexX * scaleX}
                    cy={originY - vertexY * scaleY}
                    r="4"
                    fill="#FBBF24"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>

            {/* Grafikon státusz badge */}
            <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">
                Csúcspont: ({vertexX.toFixed(1)}; {vertexY.toFixed(1)})
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold border ${badgeColor}`}>
                {rootCountBadge}
              </span>
            </div>
          </div>

          {/* Eredmény magyarázó kártya */}
          <div className="p-4 bg-purple-900/30 rounded-2xl border border-purple-700/40 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-bold text-sm text-purple-100">{rootCountText}</span>
            </div>
            <div className="text-xs text-purple-200/90 pl-6 space-y-1">
              {D > 0 && x1 !== null && x2 !== null && (
                <p>
                  Gyökök értéke:{' '}
                  <strong className="text-emerald-300">
                    x₁ = {Math.min(x1, x2).toFixed(2)}
                  </strong>{' '}
                  és{' '}
                  <strong className="text-emerald-300">
                    x₂ = {Math.max(x1, x2).toFixed(2)}
                  </strong>
                  . A parabola két különböző helyen metszi az x-tengelyt!
                </p>
              )}
              {D === 0 && x1 !== null && (
                <p>
                  Kettős gyök értéke:{' '}
                  <strong className="text-amber-300">x₁ = x₂ = {x1.toFixed(2)}</strong>. A parabola csúcspontja
                  pontosan az x-tengelyen helyezkedik el, azaz érinti azt!
                </p>
              )}
              {D < 0 && (
                <p>
                  Mivel negatív számból a valós számok körében nem vonhatunk gyököt ({'√D ∉ ℝ'}), az egyenletnek{' '}
                  <strong className="text-rose-300">nincs megoldása</strong> a valós számok halmazán. A parabola{' '}
                  {safeA > 0 ? 'teljesen az x-tengely felett halad' : 'teljesen az x-tengely alatt halad'}!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DiscriminantTheory: React.FC<DiscriminantTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const sections: TheorySection[] = [
    // 1. Fejezet
    {
      id: 'sec-intro',
      title: '1. A diszkrimináns fogalma és kiszámítása',
      description: 'Mi a diszkrimináns szerepe, honnan ered és hogyan számítjuk ki villámgyorsan?',
      color: 'purple',
      badge: 'Definíció & Képlet',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A diszkrimináns szerepe és jelentése"
            color="purple"
            icon={<Scale className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A másodfokú egyenlet megoldóképletében:{' '}
                <strong className="text-purple-700 font-mono">
                  x₁,₂ = (-b ± √(b² - 4ac)) / (2a)
                </strong>
                , a négyzetgyökjel alatti kifejezés a legfontosabb döntőbíró. Ezt a kifejezést nevezzük{' '}
                <strong>diszkriminánsnak</strong> (jele: <strong>D</strong>, a latin <em>discriminare</em> = megkülönböztetni szóból).
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <DiscriminantFormulaSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A diszkrimináns képlete és részeinek viselkedése a valós számok halmazán
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2">
                  <span className="font-bold text-purple-950 text-sm">Hogyan számítjuk ki?</span>
                  <p className="text-xs text-slate-600">
                    Mindig olvassuk le pontosan az $a$, $b$ és $c$ együtthatókat, ügyelve az előjelekre:
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-purple-100 font-mono text-xs text-purple-950 space-y-1">
                    <p className="font-bold text-purple-700">D = b² - 4ac</p>
                    <p className="text-slate-500">1. Lépés: b négyzetre emelése (mindig nemnegatív: b² ≥ 0)</p>
                    <p className="text-slate-500">2. Lépés: -4 · a · c kiszámítása</p>
                    <p className="text-slate-500">3. Lépés: a két érték összeadása</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="font-bold text-emerald-950 text-sm">💡 Aranyszabály: Mikor D biztosan pozitív?</span>
                  <p className="text-xs text-slate-600">
                    Ha az $a$ és a $c$ együtthatók <strong>ellentétes előjelűek</strong> (azaz $a \cdot c &lt; 0$):
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 font-mono text-xs text-emerald-950 space-y-1">
                    <p>Mivel b² ≥ 0 és a·c &lt; 0 ⟹ -4ac &gt; 0,</p>
                    <p className="text-emerald-700 font-bold">D = b² + (pozitív tag) &gt; 0!</p>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Tehát ha $a$ és $c$ különböző előjelűek, az egyenletnek <strong>garantáltan 2 különböző valós gyöke van</strong> anélkül, hogy számolnunk kellene!
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Mintapéldák a D kiszámítására */}
          <TheoryCard
            title="Mintapéldák: Diszkrimináns kiszámítása előjel-változatokkal"
            color="purple"
            variant="example"
          >
            <div className="space-y-4 text-sm text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Példa */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-xs text-indigo-700 block">1. x² - 5x + 6 = 0</span>
                  <p className="text-[11px] text-slate-600">a = 1, b = -5, c = 6</p>
                  <p className="font-mono text-xs text-slate-800">D = (-5)² - 4·1·6</p>
                  <p className="font-mono text-xs text-slate-800">D = 25 - 24 = <strong className="text-emerald-600">1 &gt; 0</strong></p>
                  <span className="text-[10px] text-emerald-700 font-bold block">⟹ 2 valós gyök</span>
                </div>

                {/* 2. Példa */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-xs text-indigo-700 block">2. x² - 6x + 9 = 0</span>
                  <p className="text-[11px] text-slate-600">a = 1, b = -6, c = 9</p>
                  <p className="font-mono text-xs text-slate-800">D = (-6)² - 4·1·9</p>
                  <p className="font-mono text-xs text-slate-800">D = 36 - 36 = <strong className="text-amber-600">0</strong></p>
                  <span className="text-[10px] text-amber-700 font-bold block">⟹ 1 valós gyök</span>
                </div>

                {/* 3. Példa */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-xs text-indigo-700 block">3. 2x² + 3x + 4 = 0</span>
                  <p className="text-[11px] text-slate-600">a = 2, b = 3, c = 4</p>
                  <p className="font-mono text-xs text-slate-800">D = 3² - 4·2·4</p>
                  <p className="font-mono text-xs text-slate-800">D = 9 - 32 = <strong className="text-rose-600">-23 &lt; 0</strong></p>
                  <span className="text-[10px] text-rose-700 font-bold block">⟹ 0 valós gyök</span>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryTrapBox title="Gyakori hiba: Zárójelezés elhagyása negatív b esetén!">
            <p className="text-xs text-rose-800">
              Ha $b$ negatív szám, például $b = -7$, a számológépbe írt <code className="bg-rose-100 px-1 py-0.5 rounded text-rose-900">-7²</code> eredménye <strong className="text-rose-900">-49</strong> lesz, ami hibás! Mindig tegyük zárójelbe:{' '}
              <strong className="text-rose-950 font-bold">(-7)² = +49</strong>. Egy valós szám négyzete soha nem lehet negatív!
            </p>
          </TheoryTrapBox>
        </div>
      )
    },

    // 2. Fejezet
    {
      id: 'sec-cases',
      title: '2. A gyökök száma a diszkrimináns előjele alapján',
      description: 'A 3 alapeset részletes vizsgálata: mikor van 2, 1 vagy 0 valós megoldás?',
      color: 'purple',
      badge: 'A 3 Eset',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A gyökök számának 3 alapesete"
            color="purple"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A valós számok körében a négyzetgyökvonás csak nemnegatív számokra értelmezett. Ezért a $D$ előjele szabja meg, hogy hány valós megoldása van az $ax^2 + bx + c = 0$ ($a \neq 0$) másodfokú egyenletnek:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <DiscriminantCasesSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  A diszkrimináns három esete: két metszéspont, érintés, vagy tengely feletti lebegés
                </p>
              </div>

              {/* Részletes összefoglaló táblázat */}
              <TheoryTable
                headers={['Diszkrimináns (D)', 'Gyökök száma (valós)', 'Megoldóképlet alakja', 'Geometriai jelentés']}
                rows={[
                  [
                    'D > 0 (Pozitív)',
                    '2 különböző valós gyök (x₁ ≠ x₂)',
                    'x₁,₂ = (-b ± √D) / (2a)',
                    'A parabola 2 pontban metszi az x-tengelyt (szelő)'
                  ],
                  [
                    'D = 0 (Nulla)',
                    '1 valós gyök (kettős / egybeeső gyök)',
                    'x₁ = x₂ = -b / (2a)',
                    'A parabola érinti az x-tengelyt a csúcspontjában'
                  ],
                  [
                    'D < 0 (Negatív)',
                    '0 valós gyök (üres halmaz: x ∈ ∅)',
                    'Nem vonható valós gyök (√D ∉ ℝ)',
                    'A parabola nem metszi és nem érinti az x-tengelyt'
                  ]
                ]}
              />

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                <span className="font-bold text-amber-950 text-sm">Mi történik pontosan, ha D = 0?</span>
                <p className="text-xs text-slate-700">
                  Ha $D = 0$, akkor a megoldóképletben {'$\\pm \\sqrt{0} = \\pm 0$'} szerepel, azaz a két gyök egybeesik:{' '}
                  <strong className="text-amber-900 font-mono">x₁ = x₂ = -b / (2a)</strong>.
                  Ilyenkor a másodfokú polinom mindig <strong>teljes négyzetté</strong> alakítható:{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-950">ax² + bx + c = a(x - x₁)² = 0</code>.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 3. Fejezet
    {
      id: 'sec-geometry',
      title: '3. Geometriai szemléltetés: a parabola és az x-tengely kapcsolata',
      description: 'Hogyan mozog a parabola a koordinátarendszerben, ha változtatjuk az együtthatókat?',
      color: 'purple',
      badge: 'Grafikus Elemzés',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="A másodfokú függvény grafikonja és a tengelymetszetek"
            color="purple"
            icon={<Compass className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Az $ax^2 + bx + c = 0$ egyenlet megoldásai grafikusan az $f(x) = ax^2 + bx + c$ másodfokú függvény grafikonjának (a parabolának) és az $x$-tengelynek ($y = 0$) a <strong>metszéspontjai</strong>.
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <DiscriminantParabolaFamilySvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  Az y = x² - 4x + c parabolacsalád eltolódása a c konstans növelésével
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="font-bold text-slate-900 text-sm">A csúcspont y-koordinátája és a D</span>
                  <p className="text-xs text-slate-600">
                    A parabola csúcspontjának koordinátái:{' '}
                    <span className="font-mono text-purple-700 font-bold">C(-b/(2a); -D/(4a))</span>.
                  </p>
                  <p className="text-xs text-slate-600">
                    Látható, hogy a csúcspont magassága közvetlenül a $-D/(4a)$ kifejezéstől függ!
                  </p>
                  <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
                    <li>Ha $a &gt; 0$ és $D &gt; 0$: a csúcs az $x$-tengely alatt van ($y_C &lt; 0$) ⟹ 2 metszéspont.</li>
                    <li>Ha $a &gt; 0$ és $D = 0$: a csúcs pontosan az $x$-tengelyre esik ($y_C = 0$) ⟹ 1 érintési pont.</li>
                    <li>Ha $a &gt; 0$ és $D &lt; 0$: a csúcs az $x$-tengely felett van ($y_C &gt; 0$) ⟹ 0 közös pont.</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2">
                  <span className="font-bold text-indigo-950 text-sm">Mit határoz meg a c állandó változtatása?</span>
                  <p className="text-xs text-slate-600">
                    Ha $a$-t és $b$-t rögzítjük és csak $c$-t növeljük, a parabola függőlegesen <strong>felfelé tolódik</strong> el:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-100 font-mono text-xs text-indigo-900 space-y-1">
                    <p>y = x² - 4x + c  (itt b² = 16, 4ac = 4c)</p>
                    <p className="text-emerald-700">c &lt; 4 ⟹ 4c &lt; 16 ⟹ D &gt; 0 (2 metszéspont)</p>
                    <p className="text-amber-700">c = 4 ⟹ 4c = 16 ⟹ D = 0 (1 érintési pont)</p>
                    <p className="text-rose-700">c &gt; 4 ⟹ 4c &gt; 16 ⟹ D &lt; 0 (0 metszéspont)</p>
                  </div>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      )
    },

    // 4. Fejezet
    {
      id: 'sec-parameters',
      title: '4. Paraméteres feladatok diszkriminánssal',
      description: 'Hogyan határozzuk meg egy paraméter értékét adott számú megoldás biztosításához?',
      color: 'purple',
      badge: 'Paraméteres Elemzés',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="Tipikus feladattípus: Paraméter meghatározása"
            color="purple"
            icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                A dolgozatok és az érettségi leggyakoribb feladatai közé tartozik, amikor az egyenlet együtthatói egy $p$ (vagy $k, m$) paramétertől függenek, és meg kell keresni azokat a paraméterértékeket, amelyekre a gyökök száma adott.
              </p>

              <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2">
                <span className="font-bold text-purple-950 text-sm">A feladatmegoldás 3 aranyszabálya:</span>
                <ol className="text-xs text-slate-700 list-decimal list-inside space-y-1.5 pl-1 font-medium">
                  <li><strong>0-ra rendezés:</strong> Hozzuk az egyenletet $Ax^2 + Bx + C = 0$ alakra.</li>
                  <li><strong>Diszkrimináns felírása paraméterrel:</strong> $D(p) = B^2 - 4AC$.</li>
                  <li><strong>A feltétel alkalmazása:</strong>
                    <ul className="list-disc list-inside pl-4 pt-1 space-y-0.5 text-slate-600 font-normal">
                      <li>2 különböző valós gyök esetén: <strong className="text-emerald-700">D(p) &gt; 0</strong> (egyenlőtlenség)</li>
                      <li>1 valós gyök esetén: <strong className="text-amber-700">D(p) = 0</strong> (egyenlet)</li>
                      <li>Nincs valós gyök esetén: <strong className="text-rose-700">D(p) &lt; 0</strong> (egyenlőtlenség)</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          </TheoryCard>

          {/* Részletesen levezetett mintapélda */}
          <TheoryCard
            title="Mintapélda: x² - 6x + p = 0 megoldásainak száma p függvényében"
            color="purple"
            variant="example"
          >
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-purple-950">
                Feladat: Határozzuk meg, hogy a $p$ valós paraméter mely értékei esetén van az $x^2 - 6x + p = 0$ egyenletnek: a) 2 különböző valós gyöke; b) 1 valós gyöke; c) nincs valós gyöke!
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <p className="text-slate-500 font-sans font-bold">1. Lépés: Együtthatók azonosítása:</p>
                <p className="text-purple-900">a = 1,  b = -6,  c = p</p>

                <p className="text-slate-500 font-sans font-bold pt-1">2. Lépés: Diszkrimináns felírása:</p>
                <p className="text-purple-900">D = b² - 4ac = (-6)² - 4 · 1 · p = 36 - 4p</p>

                <p className="text-slate-500 font-sans font-bold pt-1">3. Lépés: A három eset vizsgálata:</p>
                <div className="space-y-1.5 pl-2 font-sans text-xs">
                  <p>
                    <strong className="text-emerald-700">a) Két különböző gyök (D &gt; 0):</strong>
                    <br />
                    <span className="font-mono text-slate-800">36 - 4p &gt; 0 ⟹ 36 &gt; 4p ⟹ </span>
                    <strong className="text-emerald-800 font-mono">p &lt; 9</strong>.
                  </p>
                  <p>
                    <strong className="text-amber-700">b) Egyetlen valós gyök (D = 0):</strong>
                    <br />
                    <span className="font-mono text-slate-800">36 - 4p = 0 ⟹ 36 = 4p ⟹ </span>
                    <strong className="text-amber-800 font-mono">p = 9</strong> (ekkor x₁ = x₂ = 3).
                  </p>
                  <p>
                    <strong className="text-rose-700">c) Nincs valós gyök (D &lt; 0):</strong>
                    <br />
                    <span className="font-mono text-slate-800">36 - 4p &lt; 0 ⟹ 36 &lt; 4p ⟹ </span>
                    <strong className="text-rose-800 font-mono">p &gt; 9</strong>.
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryTrapBox title="Buktató: Mi történik, ha a főegyütthatóban is paraméter van?">
            <p className="text-xs text-rose-800">
              Ha az egyenlet például <strong className="text-rose-950 font-mono">(p - 1)x² + 4x + 2 = 0</strong>, akkor nem felejthetjük el a <strong className="text-rose-950 font-mono">p - 1 = 0 ⟹ p = 1</strong> esetet!
              Ekkor az egyenlet <strong>elsőfokúvá válik</strong>: $0x^2 + 4x + 2 = 0 \implies 4x = -2 \implies x = -0,5$ (tehát 1 megoldás van, noha nem másodfokú!). Mindig külön kell vizsgálni a főegyüttható nullává válását!
            </p>
          </TheoryTrapBox>
        </div>
      )
    },

    // 5. Fejezet
    {
      id: 'sec-sign',
      title: '5. Másodfokú kifejezések állandó előjele és alkalmazás egyenlőtlenségekben',
      description: 'Mikor mondhatjuk biztosan, hogy egy kifejezés minden x-re szigorúan pozitív?',
      color: 'purple',
      badge: 'Előjel & Alkalmazás',
      content: (
        <div className="space-y-6">
          <TheoryCard
            title="Állandó előjelű másodfokú polinomok"
            color="purple"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-4 text-slate-700 text-sm">
              <p>
                Gyakran találkozunk olyan kifejezésekkel, amelyeknek előjeléről kell döntenünk (például négyzetgyök alatti kifejezés értelmezési tartományánál, vagy törtes egyenlőtlenségek nevezőjénél). Ha $D &lt; 0$, a polinom <strong>soha nem veszi fel a 0 értéket</strong>, így előjelet sem válthat:
              </p>

              <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <SignOfQuadraticSvg size={480} className="w-full max-w-xl" />
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                  Ha a diszkrimináns negatív (D &lt; 0), a polinom előjele megegyezik a főegyüttható (a) előjelével
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="font-bold text-emerald-950 text-sm">MINDIG POZITÍV POLINOM</span>
                  <p className="text-xs text-slate-600">
                    Az $ax^2 + bx + c &gt; 0$ egyenlőtlenség akkor és csak akkor teljesül <strong>minden valós x-re</strong>, ha:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100 font-mono text-xs text-emerald-900 font-bold space-y-1">
                    <p>1) a &gt; 0  (felfelé nyíló parabola)</p>
                    <p>2) D &lt; 0  (nincs zérushely, a tengely felett lebeg)</p>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    💡 <strong>Példa:</strong> {'$x^2 + 2x + 5 > 0$'} minden {'$x \\in \\mathbb{R}$'}-re, mert $a = 1 &gt; 0$ és $D = 4 - 20 = -16 &lt; 0$.
                  </p>
                </div>

                <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-2">
                  <span className="font-bold text-rose-950 text-sm">MINDIG NEGATÍV POLINOM</span>
                  <p className="text-xs text-slate-600">
                    Az $ax^2 + bx + c &lt; 0$ egyenlőtlenség akkor és csak akkor teljesül <strong>minden valós x-re</strong>, ha:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-rose-100 font-mono text-xs text-rose-900 font-bold space-y-1">
                    <p>1) a &lt; 0  (lefelé nyíló parabola)</p>
                    <p>2) D &lt; 0  (a tengely alatt halad végig)</p>
                  </div>
                  <p className="text-[11px] text-rose-800">
                    💡 <strong>Példa:</strong> {'$-x^2 + 4x - 7 < 0$'} minden {'$x \\in \\mathbb{R}$'}-re, mert $a = -1 &lt; 0$ és $D = 16 - 28 = -12 &lt; 0$.
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCallout
            title="Összegzés és érettségi jótanács"
            variant="tip"
            color="purple"
          >
            <p className="text-xs text-purple-900">
              A diszkrimináns kiszámítása gyakran elegendő egy elméleti kérdés megválaszolásához anélkül, hogy a tényleges gyököket ki kellene számolni. Mindig ellenőrizd: a feladat a <strong>gyökök pontos értékét</strong> kéri, vagy csupán a <strong>gyökök számát / létezését</strong>? Ha csak a létezés a kérdés, a $D$ előjelvizsgálata a leggyorsabb és legbiztosabb út!
            </p>
          </TheoryCallout>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="A Másodfokú Egyenlet Diszkriminánsa"
      subtitle="A gyökök száma, geometriai jelentése és paraméteres vizsgálatok"
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TANANYAG"
      themeColor="purple"
      quickRule={{
        label: 'A Diszkrimináns Aranyszabálya',
        align: 'left',
        formula: (
          <div className="space-y-1.5 text-slate-800 dark:text-slate-100">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
              <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 block">D = b² - 4ac értéke dönt:</span>
              <div className="font-mono text-xs font-black text-purple-700 dark:text-purple-400 grid grid-cols-3 gap-1 mt-0.5 text-center">
                <span>D &gt; 0: 2 gyök</span>
                <span>D = 0: 1 gyök</span>
                <span>D &lt; 0: 0 gyök</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300">
              Ha a · c &lt; 0, akkor -4ac &gt; 0, így D biztosan pozitív (mindig van 2 valós gyök)!
            </div>
          </div>
        )
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={<DiscriminantVisualizerLab />}
    />
  );
};

