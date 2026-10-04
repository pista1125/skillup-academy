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
  Compass,
  Sliders,
  BookOpen,
  Award,
  Sparkles,
  Maximize2,
  CheckCircle2,
  RotateCcw,
  Layers,
  HelpCircle,
  Hash,
  Scale,
  Triangle,
  Calculator,
  Square,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface SpecialRightTrianglesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SpecialRightTrianglesTheory: React.FC<SpecialRightTrianglesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ÁLLAPOTOK ---
  const [activeTab, setActiveTab] = useState<'45' | '30' | 'converter'>('45');

  // 1. 45-45-90 állapot
  const [side45, setSide45] = useState<number>(6);
  const [isHypotenuseInput45, setIsHypotenuseInput45] = useState<boolean>(false);
  const [hypotenuse45, setHypotenuse45] = useState<number>(10);

  // Számítás 45-45-90-hez
  const computedLeg45 = isHypotenuseInput45 ? hypotenuse45 / Math.SQRT2 : side45;
  const computedHyp45 = isHypotenuseInput45 ? hypotenuse45 : side45 * Math.SQRT2;
  const area45 = (computedLeg45 * computedLeg45) / 2;
  const perimeter45 = 2 * computedLeg45 + computedHyp45;

  // 2. 30-60-90 állapot
  const [inputMode30, setInputMode30] = useState<'short' | 'hypotenuse' | 'long'>('short');
  const [val30, setVal30] = useState<number>(5);

  let shortLeg30 = 5;
  let longLeg30 = 5 * Math.sqrt(3);
  let hyp30 = 10;

  if (inputMode30 === 'short') {
    shortLeg30 = val30;
    hyp30 = 2 * val30;
    longLeg30 = val30 * Math.sqrt(3);
  } else if (inputMode30 === 'hypotenuse') {
    hyp30 = val30;
    shortLeg30 = val30 / 2;
    longLeg30 = (val30 / 2) * Math.sqrt(3);
  } else {
    longLeg30 = val30;
    shortLeg30 = val30 / Math.sqrt(3);
    hyp30 = (2 * val30) / Math.sqrt(3);
  }
  const area30 = (shortLeg30 * longLeg30) / 2;
  const equilateralArea = shortLeg30 * longLeg30; // 2 db ilyen háromszög

  // 3. Gyorsátváltó kalkulátor
  const [calcTriangleType, setCalcTriangleType] = useState<'45' | '30'>('45');
  const [calcInputType, setCalcInputType] = useState<string>('leg');
  const [calcInputValue, setCalcInputValue] = useState<number>(8);

  // 4. Villám-önellenőrző kérdések állapota
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TheoryTemplate
      title="6. Nevezetes derékszögű háromszögek"
      subtitle="A 45°-45°-90°-os (négyzet átlója) és a 30°-60°-90°-os (félszabályos háromszög) arányai és azonnali számításai"
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 6. Lecke • Nevezetes Háromszögek"
      badgeText="8. Osztály • Pitagorasz-tétel"
      themeColor="indigo"
      grade="8. Osztály"
      difficulty="Haladó & Felvételi készségek"
      estimatedTime="25-30 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A KÉT LEGFONTOSABB ARÁNYSZABÁLY',
        formula: '45°-45°-90°: 1 : 1 : √2 (c = a · √2)  |  30°-60°-90°: 1 : √3 : 2 (c = 2a, b = a · √3)'
      }}
    >
      {/* KIEMELT ARANYSZABÁLYOK BANNER AZ ELEJÉN */}
      <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-slate-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-700 dark:text-indigo-300">
          <Sparkle className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <span className="font-extrabold uppercase tracking-wider text-xs sm:text-sm">
            Kiemelt Vizsgatétel • Ezt a Két Szabályt Kell Fejből Tudnod!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* 1. Kártya: 45-45-90 */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-indigo-200 dark:border-indigo-800/80 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                <Square className="w-3.5 h-3.5" />
                45° - 45° - 90°
              </span>
              <span className="text-[11px] font-semibold text-slate-500">Egyenlő szárú derékszögű</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              <MathText>c = a · √2</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <MathText>Oldalarány: <strong>1 : 1 : √2</strong>. A négyzet átlója mentén kettévágva keletkezik.</MathText>
              <br />
              <strong className="text-indigo-950 dark:text-indigo-200">Átfogóból oldal:</strong> <MathText>a = c / √2 = (c · √2) / 2</MathText>.
            </p>
          </div>

          {/* 2. Kártya: 30-60-90 */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-purple-200 dark:border-purple-800/80 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                <Triangle className="w-3.5 h-3.5" />
                30° - 60° - 90°
              </span>
              <span className="text-[11px] font-semibold text-slate-500">Félszabályos háromszög</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
              <MathText>a = c / 2 &nbsp;|&nbsp; b = a · √3</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <MathText>Oldalarány: <strong>1 : √3 : 2</strong>. A szabályos háromszög feléből keletkezik.</MathText>
              <br />
              <strong className="text-purple-950 dark:text-purple-200">Aranyszabály:</strong> a 30°-kal szemközti oldal <strong>pontosan a FELE az átfogónak</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* 1. RÉSZ: 45°-45°-90° HÁROMSZÖG */}
      <TheorySection
        title="1. Az Egyenlő Szárú Derékszögű Háromszög (45° - 45° - 90°)"
        subtitle="A négyzet fele, átlójának hossza és a √2 szorzó pontos szerepe"
        icon={<Square className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Származtatás és Oldalarányok"
            badge="Alapfogalom"
            badgeColor="indigo"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              Ha egy <em>a</em> oldalhosszúságú négyzetet az átlója mentén kettévágunk, két egybevágó <strong>egyenlő szárú derékszögű háromszöget</strong> kapunk.
            </p>
            <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span><strong>Belső szögek:</strong> 90°, 45°, 45° (a szimmetriaátló felezi a derékszögeket).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span><strong>Befogók:</strong> a = b (a két befogó egyenlő hosszú).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span><strong>Pitagorasz-tétel:</strong> c² = a² + a² = 2a² ⟹ <strong>c = a · √2</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span><strong>Oldalarány:</strong> a : b : c = 1 : 1 : √2.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span><strong>Terület:</strong> T = (a · a) / 2 = a² / 2. Az átlóból: T = c² / 4.</span>
              </li>
            </ul>
          </TheoryCard>

          <GeometryFigureCard
            title="45°-45°-90°-os Modell és Négyzet Átlója"
            caption="A négyzet átlója pontosan a√2, a befogók pedig a-val egyenlők"
          >
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] h-auto mx-auto select-none">
              {/* Négyzet másik fele szaggatva */}
              <polygon points="30,105 150,105 150,15 30,15" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
              {/* 45-45-90 Háromszög */}
              <polygon points="30,105 150,105 150,15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
              
              {/* Derékszög jelölése (150, 105) */}
              <rect x="138" y="93" width="12" height="12" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
              <circle cx="144" cy="99" r="1.5" fill="#4f46e5" />
              
              {/* 45 fokos ív a bal sarokban */}
              <path d="M 50,105 A 20,20 0 0,0 44,95" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              <text x="56" y="100" className="text-[7.5px] font-bold fill-indigo-800">45°</text>

              {/* 45 fokos ív a jobb felső sarokban */}
              <path d="M 150,35 A 20,20 0 0,1 140,25" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              <text x="130" y="32" className="text-[7.5px] font-bold fill-indigo-800">45°</text>

              {/* Feliratok */}
              <text x="90" y="117" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">a (befogó)</text>
              <text x="156" y="65" textAnchor="start" className="text-[9px] font-bold fill-indigo-900">a (befogó)</text>
              <text x="82" y="52" textAnchor="middle" className="text-[9.5px] font-extrabold fill-purple-700">c = a√2 (átfogó)</text>
            </svg>
          </GeometryFigureCard>
        </div>

        {/* Visszafelé számolás callout */}
        <TheoryCallout
          variant="indigo"
          title="Befogó Kiszámítása az Átfogóból (Nevező Gyöktelenítése)"
        >
          <div className="text-xs space-y-2 text-indigo-950 dark:text-indigo-200">
            <p>
              Gyakori felvételi feladat, hogy a négyzet átlóját (vagy a háromszög átfogóját) ismerjük (pl. <strong>c = 10 cm</strong>), és a négyzet oldalát keressük:
            </p>
            <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 text-xs border border-indigo-200 space-y-1">
              <MathText><div>a = c / √2 = (c · √2) / (√2 · √2) = (c · √2) / 2 = (c / 2) · √2</div></MathText>
            </div>
            <p>
              <MathText>
                <strong>Konkrét számolási példa:</strong> Ha az átló c = 10 cm, akkor az oldal:{' '}
                <strong>a = (10 / 2) · √2 = 5 · √2 cm ≈ 7,07 cm</strong>.
                <br />
                Ha az átló c = 8 cm, akkor a = 4 · √2 cm. Mindig felezd meg a számot és szorozd meg √2-vel!
              </MathText>
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 2. RÉSZ: 30°-60°-90° HÁROMSZÖG */}
      <TheorySection
        title="2. A Félszabályos Háromszög (30° - 60° - 90°)"
        subtitle="A szabályos háromszög fele, az átfogó felezése és a √3 szorzó levezetése"
        icon={<Triangle className="w-5 h-5 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Származtatás és Aranyszabály"
            badge="Kiemelt Tétel"
            badgeColor="purple"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              Egy <em>2a</em> oldalhosszúságú szabályos (egyenlő oldalú) háromszögben a magasságvonal szimmetriatengely. Ennek mentén félbevágva kapjuk a <strong>30°-60°-90°-os háromszöget</strong>.
            </p>
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 text-xs text-purple-950 dark:text-purple-200 mb-3 font-semibold">
              ⭐ Aranyszabály: A 30°-os szöggel szemközti befogó mindig pontosan FELE az átfogónak!
            </div>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• <strong>Rövid befogó (30°-kal szemben):</strong> a = c / 2</li>
              <li>• <strong>Átfogó (90°-kal szemben):</strong> c = 2a</li>
              <li>• <strong>Hosszú befogó (60°-kal szemben / magasság):</strong> b = m = a · √3</li>
              <li>• <strong>Oldalarány:</strong> a : b : c = 1 : √3 : 2</li>
              <li>• <strong>Terület:</strong> T = (a · b) / 2 = (a² · √3) / 2</li>
            </ul>
          </TheoryCard>

          <GeometryFigureCard
            title="30°-60°-90°-os Modell és Szabályos Háromszög"
            caption="A magasság felezi az alapot és a 60°-os szöget, így a magasság a√3 lesz"
          >
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px] h-auto mx-auto select-none">
              {/* Szabályos háromszög bal fele szaggatva */}
              <polygon points="100,15 20,110 100,110" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
              {/* Félszabályos háromszög (jobb fél) */}
              <polygon points="100,15 180,110 100,110" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />

              {/* Derékszög jelölése (100, 110) */}
              <rect x="100" y="98" width="12" height="12" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1" />
              <circle cx="106" cy="114" r="1.5" fill="#7e22ce" />

              {/* 30 fokos ív fent */}
              <path d="M 100,35 A 20,20 0 0,0 110,32" fill="none" stroke="#9333ea" strokeWidth="1.5" />
              <text x="106" y="44" className="text-[7.5px] font-bold fill-purple-900">30°</text>

              {/* 60 fokos ív lent jobbra */}
              <path d="M 160,110 A 20,20 0 0,1 170,98" fill="none" stroke="#9333ea" strokeWidth="1.5" />
              <text x="156" y="105" className="text-[7.5px] font-bold fill-purple-900">60°</text>

              {/* Feliratok */}
              <text x="140" y="122" textAnchor="middle" className="text-[8.5px] font-bold fill-purple-900">a (rövid)</text>
              <text x="82" y="65" textAnchor="end" className="text-[8.5px] font-bold fill-purple-900">b = a√3 (m)</text>
              <text x="152" y="60" textAnchor="start" className="text-[9px] font-extrabold fill-indigo-700">c = 2a</text>
            </svg>
          </GeometryFigureCard>
        </div>

        {/* Pitagorasz-levezetés callout */}
        <TheoryCallout
          variant="purple"
          title="Miért pont a√3 a hosszabbik befogó? (Pitagorasz-levezetés)"
        >
          <div className="text-xs space-y-1.5 text-purple-950 dark:text-purple-200">
            <p>
              Alkalmazzuk a Pitagorasz-tételt a félbevágott szabályos háromszögre: a² + m² = c², ahol c = 2a:
            </p>
            <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 text-xs border border-purple-200 space-y-1">
              <MathText>
                <div>a² + m² = (2a)² = 4a²</div>
                <div>m² = 4a² - a² = 3a²</div>
                <div>m = √(3a²) = a · √3 &nbsp; (mivel √3 ≈ 1,732)</div>
              </MathText>
            </div>
            <p>
              <MathText>
                Tehát ha a 30°-kal szemközti oldal <strong>a = 6 cm</strong>, akkor az átfogó <strong>c = 12 cm</strong>, a hosszabbik befogó pedig pontosan <strong>b = 6 · √3 cm ≈ 10,39 cm</strong>.
              </MathText>
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 3. RÉSZ: INTERAKTÍV LABOR ÉS SZIMULÁTOROK */}
      <TheorySection
        title="3. Interaktív Szimulátor és Aránylabor"
        subtitle="Mozgasd a csúszkákat és figyeld meg az oldalarányok azonnali összefüggéseit!"
        icon={<Sliders className="w-5 h-5 text-indigo-600" />}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === '45' ? 'default' : 'outline'}
            onClick={() => setActiveTab('45')}
            className={cn(
              "text-xs gap-1.5",
              activeTab === '45' && "bg-indigo-600 hover:bg-indigo-700 text-white"
            )}
          >
            <Square className="w-4 h-4" />
            45°-45°-90° Szimulátor (Négyzetátló)
          </Button>
          <Button
            variant={activeTab === '30' ? 'default' : 'outline'}
            onClick={() => setActiveTab('30')}
            className={cn(
              "text-xs gap-1.5",
              activeTab === '30' && "bg-purple-600 hover:bg-purple-700 text-white"
            )}
          >
            <Triangle className="w-4 h-4" />
            30°-60°-90° Szimulátor (Félszabályos)
          </Button>
          <Button
            variant={activeTab === 'converter' ? 'default' : 'outline'}
            onClick={() => setActiveTab('converter')}
            className={cn(
              "text-xs gap-1.5",
              activeTab === 'converter' && "bg-teal-600 hover:bg-teal-700 text-white"
            )}
          >
            <Calculator className="w-4 h-4" />
            Felvételi Gyors-Kalkulátor
          </Button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* TAB 1: 45-45-90 SZIMULÁTOR */}
          {activeTab === '45' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Számítás módja:</span>
                  <Button
                    size="sm"
                    variant={!isHypotenuseInput45 ? 'secondary' : 'ghost'}
                    onClick={() => setIsHypotenuseInput45(false)}
                    className="text-xs h-7"
                  >
                    Befogóból (a)
                  </Button>
                  <Button
                    size="sm"
                    variant={isHypotenuseInput45 ? 'secondary' : 'ghost'}
                    onClick={() => setIsHypotenuseInput45(true)}
                    className="text-xs h-7"
                  >
                    Átfogóból (c)
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Kezelőszervek és Eredmények */}
                <div className="space-y-4">
                  {!isHypotenuseInput45 ? (
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        <span>Befogó hossza (a = b):</span>
                        <span className="font-mono text-indigo-600 font-bold">{side45} cm</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="25"
                        step="0.5"
                        value={side45}
                        onChange={(e) => setSide45(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        <span>Átfogó hossza (c = d):</span>
                        <span className="font-mono text-purple-600 font-bold">{hypotenuse45} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="40"
                        step="0.5"
                        value={hypotenuse45}
                        onChange={(e) => setHypotenuse45(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>
                  )}

                  {/* Kiszámolt értékek kártyák */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]">Befogók (a = b):</span>
                      <span className="font-mono font-bold text-indigo-700 text-sm">
                        {computedLeg45.toFixed(2)} cm
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {!isHypotenuseInput45 ? `pontosan: ${side45}` : `pontosan: ${hypotenuse45}/√2`}
                      </span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]"><MathText>Átfogó (c = a · √2):</MathText></span>
                      <span className="font-mono font-bold text-purple-700 text-sm">
                        {computedHyp45.toFixed(2)} cm
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        <MathText>{!isHypotenuseInput45 ? `pontosan: ${side45} · √2` : `pontosan: ${hypotenuse45}`}</MathText>
                      </span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]">Terület (T = a²/2):</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">
                        {area45.toFixed(2)} cm²
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">Négyzet területe: {(area45 * 2).toFixed(1)} cm²</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-sky-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]">Kerület (K = 2a + c):</span>
                      <span className="font-mono font-bold text-sky-700 text-sm">
                        {perimeter45.toFixed(2)} cm
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5"><MathText>2 · a + a · √2</MathText></span>
                    </div>
                  </div>
                </div>

                {/* Dinamikus rajz */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 180 140" className="w-full max-w-[220px] h-auto select-none">
                    <polygon points="30,115 150,115 150,25 30,25" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="3,3" strokeWidth="1.2" />
                    <polygon points="30,115 150,115 150,25" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2.2" />
                    <rect x="138" y="103" width="12" height="12" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
                    <circle cx="144" cy="109" r="1.5" fill="#4f46e5" />
                    <text x="90" y="129" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900">
                      a = {computedLeg45.toFixed(1)} cm
                    </text>
                    <text x="157" y="70" textAnchor="start" className="text-[10px] font-bold fill-indigo-900">
                      a = {computedLeg45.toFixed(1)}
                    </text>
                    <text x="82" y="60" textAnchor="middle" className="text-[10px] font-extrabold fill-purple-700">
                      c = {computedHyp45.toFixed(1)} cm
                    </text>
                  </svg>
                  <p className="text-[11px] text-slate-500 mt-2 text-center">
                    <MathText>Arány: 1 : 1 : √2 ≈ 1 : 1 : 1,414</MathText>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 30-60-90 SZIMULÁTOR */}
          {activeTab === '30' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Megadott adat:</span>
                <Button
                  size="sm"
                  variant={inputMode30 === 'short' ? 'secondary' : 'ghost'}
                  onClick={() => { setInputMode30('short'); setVal30(5); }}
                  className="text-xs h-7"
                >
                  Rövid befogó (a)
                </Button>
                <Button
                  size="sm"
                  variant={inputMode30 === 'hypotenuse' ? 'secondary' : 'ghost'}
                  onClick={() => { setInputMode30('hypotenuse'); setVal30(10); }}
                  className="text-xs h-7"
                >
                  Átfogó (c = 2a)
                </Button>
                <Button
                  size="sm"
                  variant={inputMode30 === 'long' ? 'secondary' : 'ghost'}
                  onClick={() => { setInputMode30('long'); setVal30(8.66); }}
                  className="text-xs h-7"
                >
                  <MathText>Hosszú befogó (b = a · √3)</MathText>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>{inputMode30 === 'short' ? 'Rövid befogó (30°-kal szemben):' : inputMode30 === 'hypotenuse' ? 'Átfogó (c):' : 'Hosszú befogó (magasság):'}</span>
                      <span className="font-mono text-purple-600 font-bold">{val30} cm</span>
                    </div>
                    <input
                      type="range"
                      min={inputMode30 === 'hypotenuse' ? '2' : '1'}
                      max={inputMode30 === 'hypotenuse' ? '30' : '20'}
                      step="0.5"
                      value={val30}
                      onChange={(e) => setVal30(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]">Rövid befogó (a):</span>
                      <span className="font-mono font-bold text-indigo-700 text-sm">
                        {shortLeg30.toFixed(2)} cm
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">30°-kal szemben (= c/2)</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]">Átfogó (c = 2a):</span>
                      <span className="font-mono font-bold text-purple-700 text-sm">
                        {hyp30.toFixed(2)} cm
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">90°-kal szemben (= 2·a)</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-rose-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]"><MathText>Hosszú befogó (b = a · √3):</MathText></span>
                      <span className="font-mono font-bold text-rose-700 text-sm">
                        {longLeg30.toFixed(2)} cm
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">60°-kal szemben (magasság)</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 shadow-sm">
                      <span className="text-slate-500 block text-[11px]">Háromszög Terület:</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">
                        {area30.toFixed(2)} cm²
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">Szabályos 3szög: {equilateralArea.toFixed(1)} cm²</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 200 140" className="w-full max-w-[220px] h-auto select-none">
                    <polygon points="100,20 30,120 100,120" fill="none" stroke="#cbd5e1" strokeDasharray="3,3" strokeWidth="1.2" />
                    <polygon points="100,20 170,120 100,120" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2.2" />
                    <rect x="100" y="108" width="12" height="12" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1" />
                    <circle cx="106" cy="114" r="1.5" fill="#7e22ce" />
                    <text x="135" y="132" textAnchor="middle" className="text-[10px] font-bold fill-purple-900">
                      a = {shortLeg30.toFixed(1)} cm
                    </text>
                    <text x="82" y="70" textAnchor="end" className="text-[9.5px] font-bold fill-rose-700">
                      b = {longLeg30.toFixed(1)}
                    </text>
                    <text x="150" y="65" textAnchor="start" className="text-[10px] font-extrabold fill-indigo-700">
                      c = {hyp30.toFixed(1)} cm
                    </text>
                  </svg>
                  <p className="text-[11px] text-slate-500 mt-2 text-center">
                    Arány: 1 : √3 : 2 ≈ 1 : 1,732 : 2
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FELVÉTELI GYORS-KALKULÁTOR */}
          {activeTab === 'converter' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Válassz háromszög típust:
                  </label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={calcTriangleType === '45' ? 'default' : 'outline'}
                      onClick={() => { setCalcTriangleType('45'); setCalcInputType('leg'); }}
                      className={cn("text-xs flex-1", calcTriangleType === '45' && "bg-indigo-600")}
                    >
                      45°-45°-90° (Négyzet)
                    </Button>
                    <Button
                      size="sm"
                      variant={calcTriangleType === '30' ? 'default' : 'outline'}
                      onClick={() => { setCalcTriangleType('30'); setCalcInputType('short'); }}
                      className={cn("text-xs flex-1", calcTriangleType === '30' && "bg-purple-600")}
                    >
                      30°-60°-90° (Félszabályos)
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Ismert adat és értéke (cm):
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={calcInputType}
                      onChange={(e) => setCalcInputType(e.target.value)}
                      className="text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      {calcTriangleType === '45' ? (
                        <>
                          <option value="leg">Befogó (a)</option>
                          <option value="hyp">Átfogó / Átló (c = d)</option>
                        </>
                      ) : (
                        <>
                          <option value="short">Rövid befogó (30° szemben)</option>
                          <option value="hyp">Átfogó (c)</option>
                          <option value="long">Hosszú befogó / Magasság (60°)</option>
                        </>
                      )}
                    </select>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={calcInputValue}
                      onChange={(e) => setCalcInputValue(Math.max(0.1, parseFloat(e.target.value) || 1))}
                      className="w-24 text-xs p-1.5 font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Számított eredmények magyarázattal */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-3">
                  🔍 Lépésről-lépésre levezetés:
                </span>
                <MathText>
                  {calcTriangleType === '45' ? (
                    calcInputType === 'leg' ? (
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <div>1. Adott: a = {calcInputValue} cm.</div>
                        <div>2. Átfogó: c = a · √2 = {calcInputValue} · √2 cm ≈ <strong>{(calcInputValue * Math.SQRT2).toFixed(3)} cm</strong>.</div>
                        <div>3. Terület: T = a² / 2 = ({calcInputValue})² / 2 = <strong>{((calcInputValue * calcInputValue) / 2).toFixed(2)} cm²</strong>.</div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <div>1. Adott: c = {calcInputValue} cm (átló).</div>
                        <div>2. Befogó képlete: a = c / √2 = (c · √2) / 2.</div>
                        <div>3. Befogó értéke: a = ({calcInputValue}/2) · √2 = {(calcInputValue / 2).toFixed(2)} · √2 cm ≈ <strong>{(calcInputValue / Math.SQRT2).toFixed(3)} cm</strong>.</div>
                        <div>4. Terület: T = c² / 4 = ({calcInputValue})² / 4 = <strong>{((calcInputValue * calcInputValue) / 4).toFixed(2)} cm²</strong>.</div>
                      </div>
                    )
                  ) : (
                    calcInputType === 'short' ? (
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <div>1. Adott a rövid befogó (30°-kal szemben): a = {calcInputValue} cm.</div>
                        <div>2. Átfogó (kétszerese): c = 2 · a = 2 · {calcInputValue} = <strong>{(2 * calcInputValue).toFixed(2)} cm</strong>.</div>
                        <div>3. Hosszú befogó: b = a · √3 = {calcInputValue} · √3 cm ≈ <strong>{(calcInputValue * Math.sqrt(3)).toFixed(3)} cm</strong>.</div>
                        <div>4. Terület: T = (a · b) / 2 = <strong>{((calcInputValue * calcInputValue * Math.sqrt(3)) / 2).toFixed(2)} cm²</strong>.</div>
                      </div>
                    ) : calcInputType === 'hyp' ? (
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <div>1. Adott az átfogó: c = {calcInputValue} cm.</div>
                        <div>2. Rövid befogó (átfogó FELE): a = c / 2 = {calcInputValue} / 2 = <strong>{(calcInputValue / 2).toFixed(2)} cm</strong>.</div>
                        <div>3. Hosszú befogó: b = (c / 2) · √3 = {(calcInputValue / 2).toFixed(2)} · √3 cm ≈ <strong>{((calcInputValue / 2) * Math.sqrt(3)).toFixed(3)} cm</strong>.</div>
                        <div>4. Szabályos háromszög magassága: m = b ≈ <strong>{((calcInputValue / 2) * Math.sqrt(3)).toFixed(3)} cm</strong>.</div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <div>1. Adott a hosszú befogó (magasság): b = {calcInputValue} cm.</div>
                        <div>2. Rövid befogó: a = b / √3 = (b · √3) / 3 = <strong>{(calcInputValue / Math.sqrt(3)).toFixed(3)} cm</strong>.</div>
                        <div>3. Átfogó: c = 2 · a = <strong>{((2 * calcInputValue) / Math.sqrt(3)).toFixed(3)} cm</strong>.</div>
                      </div>
                    )
                  )}
                </MathText>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 4. RÉSZ: RÉSZLETESEN KIDOLGOZOTT MINTAPÉLDÁK */}
      <TheorySection
        title="4. Kidolgozott Mintapéldák a Felvételi Feladatokból"
        subtitle="8 reprezentatív típusfeladat részletes lépésről-lépésre magyarázattal"
        icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mintapélda 1 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              1. Feladat • Négyzet átlója és területe a kerületéből
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy négyzet kerülete K = 28 cm. Számítsd ki a négyzet oldalát, átlójának pontos és kerekített hosszát, valamint területét!
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. Oldalhossz: a = K / 4 = 28 / 4 = <strong>7 cm</strong>.</div>
                <div>2. Átló: d = a · √2 = <strong>7 · √2 cm ≈ 9,90 cm</strong>.</div>
                <div>3. Terület: T = a² = 7² = <strong>49 cm²</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 2 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              2. Feladat • Négyzet oldala az átlóból (Gyöktelenítés)
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy négyzet átlója d = 12 cm. Mekkora a négyzet oldala és a területe?
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. Oldal: a = d / √2 = (12 · √2) / 2 = <strong>6 · √2 cm ≈ 8,49 cm</strong>.</div>
                <div>2. Terület az oldalból: T = (6 · √2)² = 36 · 2 = <strong>72 cm²</strong>.</div>
                <div>3. Gyors ellenőrzés átlóból: T = d² / 2 = 144 / 2 = <strong>72 cm²</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 3 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
              3. Feladat • Szabályos háromszög magassága és területe
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy szabályos háromszög oldala a = 10 cm. Határozd meg a magasságát és területét!
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. Fél alap (30°-kal szemben): a/2 = 10 / 2 = <strong>5 cm</strong>.</div>
                <div>2. Magasság: m = (a/2) · √3 = <strong>5 · √3 cm ≈ 8,66 cm</strong>.</div>
                <div>3. Terület: T = (a · m) / 2 = (10 · 5 · √3) / 2 = <strong>25 · √3 cm² ≈ 43,30 cm²</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 4 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
              4. Feladat • Szabályos háromszög oldala a magasságából
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              <MathText>Egy szabályos háromszög magassága m = 6 · √3 cm. Mennyi a háromszög kerülete?</MathText>
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. Mivel m = (a/2) · √3 = 6 · √3, ezért az alap fele: a/2 = <strong>6 cm</strong>.</div>
                <div>2. A háromszög oldala: a = 2 · 6 = <strong>12 cm</strong>.</div>
                <div>3. Kerület: K = 3 · 12 = <strong>36 cm</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 5 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">
              5. Feladat • Szabályos hatszög átlói és területe
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy szabályos hatszög oldala a = 4 cm. Mennyi a leghosszabb átlója, a legrövidebb átlója és a területe?
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. Nagy átló (középponton át): d₁ = 2 · a = <strong>8 cm</strong>.</div>
                <div>2. Kis átló: d₂ = a · √3 = <strong>4 · √3 cm ≈ 6,93 cm</strong>.</div>
                <div>3. Terület (6 szabályos 3szög): T = 6 · ((16 · √3) / 4) = <strong>24 · √3 cm² ≈ 41,57 cm²</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 6 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">
              6. Feladat • 60°-os rombusz átlói
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy rombusz oldala 8 cm, egyik belső szöge 60°. Mekkorák az átlói és a területe?
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. A 60°-os csúcsok összekötése 2 szabályos 3szöget ad ⟹ <strong>e = 8 cm</strong>.</div>
                <div>2. Hosszabb átló: f = 2 · magasság = 2 · (4 · √3) = <strong>8 · √3 cm ≈ 13,86 cm</strong>.</div>
                <div>3. Terület: T = (e · f) / 2 = (8 · 8 · √3) / 2 = <strong>32 · √3 cm² ≈ 55,43 cm²</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 7 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
              7. Feladat • Szimmetrikus trapéz 45°-os alapszögekkel
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy szimmetrikus trapéz alapjai a = 18 cm és c = 10 cm, alapszögei 45°-osak. Mekkora a magassága és a szára?
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. Levágott alsó szakasz: x = (18 - 10) / 2 = <strong>4 cm</strong>.</div>
                <div>2. Mivel 45°-os szög van, a derékszögű 3szög egyenlő szárú: <strong>m = 4 cm</strong>.</div>
                <div>3. A szár az átfogó: b = x · √2 = <strong>4 · √2 cm ≈ 5,66 cm</strong>.</div>
              </MathText>
            </div>
          </div>

          {/* Mintapélda 8 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
              8. Feladat • Falnak támasztott létra (Szöveges feladat)
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Egy 5 m hosszú létra a fallal 30°-os szöget zár be. Milyen messze van a létra alja a faltól, és milyen magasan éri el a falat?
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              <MathText>
                <div>1. A létra az átfogó (c = 5 m). A fallal bezárt szög 30°.</div>
                <div>2. Faltól mért távolság (30° szemben): x = c / 2 = <strong>2,5 m</strong>.</div>
                <div>3. Magasság a falon: h = x · √3 = <strong>2,5 · √3 m ≈ 4,33 m</strong>.</div>
              </MathText>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: INTERAKTÍV GYORS-ÖNELLENŐRZŐ (PRÓBÁLD KI MAGAD!) */}
      <TheorySection
        title="5. Próbáld ki magad! Villám-önellenőrző"
        subtitle="Gondold át fejben a választ, majd kattints a megoldás felfedéséhez!"
        icon={<Award className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'self-1',
              question: 'Egy négyzet átlója 16 cm. Mennyi a területe szögfüggvények és gyökvonás nélkül?',
              hint: 'Gondolj a T = d² / 2 képletre!',
              answer: 'T = 16² / 2 = 256 / 2 = 128 cm². (Oldal: 8√2 cm).'
            },
            {
              id: 'self-2',
              question: 'Egy 30°-60°-90° háromszög átfogója 18 cm. Mekkora a 60°-os szöggel szemközti befogó?',
              hint: 'Először számold ki a rövid befogót (felezés), majd szorozd meg √3-mal!',
              answer: 'Rövid befogó: 9 cm. Hosszú befogó: 9√3 cm (≈ 15,59 cm).'
            },
            {
              id: 'self-3',
              question: 'Egy egyenlő szárú derékszögű háromszög átfogója 10 cm. Mekkora az átfogóhoz tartozó magasság?',
              hint: 'A szimmetria miatt a magasság két kisebb 45-45-90 háromszögre osztja az alakzatot.',
              answer: 'm = c / 2 = 10 / 2 = 5 cm.'
            },
            {
              id: 'self-4',
              question: 'Egy 30°-os emelkedésű sípályán 400 métert síelünk lefelé. Mekkora a függőleges szintkülönbség?',
              hint: 'A lejtő az átfogó, a szintkülönbség a 30°-os szöggel szemközti befogó.',
              answer: 'h = 400 / 2 = 200 méter szintkülönbség.'
            }
          ].map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {item.question}
              </div>
              <div className="text-[11px] text-slate-500 italic">
                Tipp: {item.hint}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSolution(item.id)}
                className="text-xs h-7 gap-1.5 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <Eye className="w-3.5 h-3.5" />
                {revealedSolutions[item.id] ? 'Megoldás elrejtése' : 'Megoldás mutatása'}
              </Button>
              {revealedSolutions[item.id] && (
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 text-xs font-semibold text-indigo-900 dark:text-indigo-200 animate-in fade-in duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </TheorySection>

      {/* 6. RÉSZ: KÖZÉPISKOLAI ELŐRETEKINTÉS (TRIGONOMETRIA ALAPJAI) */}
      <TheorySection
        title="6. Középiskolai Előretekintés: A Szögfüggvények Gyökerei"
        subtitle="Miért kell ezt minden 9-10. osztályos diáknak fejből tudnia?"
        icon={<Compass className="w-5 h-5 text-indigo-600" />}
      >
        <TheoryCallout
          variant="indigo"
          title="A Három Nevezetes Szög (30°, 45°, 60°) Szinusza és Koszinusza"
        >
          <div className="text-xs space-y-2 text-indigo-950 dark:text-indigo-200">
            <p>
              A 9. és 10. osztályos matematika egyik legfontosabb témaköre a <strong>szögfüggvények (sin, cos, tg)</strong>.
              Sokan azt hiszik, hogy a 30°, 45° és 60° értékeit be kell magolni. Pedig ezek <strong>pontosan ebből a két háromszögből olvashatók le</strong>!
            </p>
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left text-xs border border-indigo-200 rounded-lg overflow-hidden bg-white/70 dark:bg-slate-900/60">
                <thead className="bg-indigo-100/70 dark:bg-indigo-950 font-bold text-indigo-900 dark:text-indigo-200">
                  <tr>
                    <th className="p-2 border-b border-indigo-200">Szög (α)</th>
                    <th className="p-2 border-b border-indigo-200">sin(α) = szemközti / átfogó</th>
                    <th className="p-2 border-b border-indigo-200">cos(α) = melletti / átfogó</th>
                    <th className="p-2 border-b border-indigo-200">Geometriai forrás</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100 font-mono text-[11px]">
                  <tr>
                    <td className="p-2 font-bold">30°</td>
                    <td className="p-2">a / 2a = <strong>1/2 = 0,5</strong></td>
                    <td className="p-2">a√3 / 2a = <strong>√3 / 2 ≈ 0,866</strong></td>
                    <td className="p-2 text-slate-600 font-sans">30°-60°-90° (félszabályos)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">45°</td>
                    <td className="p-2">a / a√2 = <strong>√2 / 2 ≈ 0,707</strong></td>
                    <td className="p-2">a / a√2 = <strong>√2 / 2 ≈ 0,707</strong></td>
                    <td className="p-2 text-slate-600 font-sans">45°-45°-90° (négyzet fele)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">60°</td>
                    <td className="p-2">a√3 / 2a = <strong>√3 / 2 ≈ 0,866</strong></td>
                    <td className="p-2">a / 2a = <strong>1/2 = 0,5</strong></td>
                    <td className="p-2 text-slate-600 font-sans">30°-60°-90° (félszabályos)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="pt-1">
              Ha most alaposan elsajátítod ezt a leckét, a középiskolai geometriában és fizikában hatalmas előnyöd lesz!
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 7. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        title="7. Tipikus Hibák és Vizsgacsapdák"
        subtitle="Mire figyelj, hogy ne veszíts értékes pontokat a dolgozatban?"
        icon={<HelpCircle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-4">
          <TheoryTrapBox
            trap="A √2 és a √3 szorzók összekeverése a két háromszögben."
            why="A 45°-45°-90°-os háromszögben (négyzet fele) a szorzó √2. A 30°-60°-90°-osban (szabályos háromszög fele) a szorzó √3."
            correction="Jegyezd meg: 45° ⟹ KÉT egyenlő szög ⟹ √2. Szabályos háromszög ⟹ HÁROM egyenlő oldal ⟹ √3."
          />

          <TheoryTrapBox
            trap="Rossz befogó felezése a 30°-60°-90°-os háromszögben."
            why="Gyakori hiba, hogy a tanuló az átfogó helyett a másik befogót felezi, vagy a 60°-os szöggel szemközti befogóra gondolja, hogy a fele az átfogónak."
            correction="Mindig rajzold fel a szögeket! A 30°-os a legkisebb szög, ezért a vele szemközti oldal a legrövidebb: CSAK EZ a fele az átfogónak!"
          />

          <TheoryTrapBox
            trap="Átfogóból befogó számolásakor szorzás a gyökkel osztás helyett."
            why="Ha a négyzet átlója 10 cm, sokan 10√2-t írnak oldalnak. De az átló mindig HOSSZABB, mint a befogó, így az oldalnak kisebbnek kell lennie!"
            correction="Átfogóból befogó: OSZTUNK gyökkel (a = c / √2 = 5√2 ≈ 7,07 cm). Befogóból átfogó: SZORZUNK gyökkel."
          />
        </div>
      </TheorySection>

      {/* 8. RÉSZ: ÖSSZEFOGLALÓ KÉPLETTÁBLÁZAT */}
      <TheorySection
        title="8. Nevezetes Derékszögű Háromszögek Összefoglalása"
        subtitle="A legfontosabb képletek és arányok egyetlen áttekinthető táblázatban"
        icon={<Award className="w-5 h-5 text-indigo-600" />}
      >
        <TheoryTable
          headers={['Háromszög Típusa', 'Belső Szögek', 'Befogó 1 (rövid)', 'Befogó 2 (hosszú)', 'Átfogó (c)', 'Terület']}
          rows={[
            ['Egyenlő szárú derékszögű', '45°, 45°, 90°', 'a', 'a', 'a√2 ≈ 1,414 a', 'a² / 2 = c² / 4'],
            ['Félszabályos háromszög', '30°, 60°, 90°', 'a = c / 2', 'b = a√3 ≈ 1,732 a', 'c = 2a', 'a²√3 / 2'],
            ['Szabályos háromszög (teljes)', '60°, 60°, 60°', 'oldal: a', 'magasság: a√3 / 2', '-', 'a²√3 / 4'],
            ['Szabályos hatszög', '120° belső szögek', 'oldal: a', 'kis átló: a√3', 'nagy átló: 2a', '3a²√3 / 2']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SpecialRightTrianglesTheory;
