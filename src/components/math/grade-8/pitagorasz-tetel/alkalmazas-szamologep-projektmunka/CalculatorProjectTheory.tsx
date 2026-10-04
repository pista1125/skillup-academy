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
  Calculator,
  Sliders,
  BookOpen,
  Award,
  Sparkles,
  Maximize2,
  Compass,
  Scissors,
  CheckCircle2,
  RotateCcw,
  Layers,
  HelpCircle,
  Hash,
  Binary
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface CalculatorProjectTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CalculatorProjectTheory: React.FC<CalculatorProjectTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ÁLLAPOTOK ---
  const [activeTab, setActiveTab] = useState<'calc' | 'spiral' | 'estimate' | 'folding'>('calc');

  // 1. Zsebszámológép szimulátor
  const [inputA, setInputA] = useState<number>(4.2);
  const [inputB, setInputB] = useState<number>(7.5);
  const sumSq = inputA * inputA + inputB * inputB;
  const exactHyp = Math.sqrt(sumSq);

  // 2. Theodórosz spirál lépés
  const [spiralSteps, setSpiralSteps] = useState<number>(5);

  // 3. Becslés
  const [estimateNum, setEstimateNum] = useState<number>(50);
  const floorRoot = Math.floor(Math.sqrt(estimateNum));
  const ceilRoot = floorRoot + 1;
  const exactRoot = Math.sqrt(estimateNum);

  return (
    <TheoryTemplate
      title="Számológéphasználat és Projektmunka"
      subtitle="Zárójelezési szabályok, tizedesjegyek és kerekítés, gyökök becslése fejben, Theodórosz spirálja (gyökcsiga) és papírhajtogatásos modellezés"
      quickRule={{
        label: 'Alapvető Képletek',
        formula: 'c = \\sqrt{a^2 + b^2}, \\quad \\sqrt{n+1} = \\sqrt{(\\sqrt{n})^2 + 1^2}',
        note: 'Zárójelezés: √(a² + b²); Theodórosz spirálja: √(n+1) lépésenként'
      }}
      badge="8. Osztály • Pitagorasz-tétel"
      themeColor="cyan"
      pdfFilename="Szamologep_es_Projektmunka_8_osztaly.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Számológép & Projekt Kvíz Indítása"
      practiceSubtitle="30 feladat 3 szinten, párosító és csoportosító játékkal a számológéphasználatról és projektfeladatokról!"
    >
      {/* 1. RÉSZ: SZÁMOLÓGÉPHASZNÁLAT ÉS ZÁRÓJELEZÉS */}
      <TheorySection
        title="1. Számológéphasználati Szabályok és Trükkök"
        subtitle="Hogyan kerülheted el a leggyakoribb beírási és műveleti sorrendi hibákat?"
        icon={<Calculator className="w-5 h-5 text-cyan-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A való életben és a mérnöki feladatokban az oldalhosszak szinte soha nem egész számok (pl. <em>a = 4,2 cm</em>, <em>b = 7,5 cm</em>).
          Ilyenkor zsebszámológéppel számolunk, de a helyes eredményhez <strong>szigorú beírási szabályokat</strong> kell követnünk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          <TheoryCard
            title="A Gyökjel alatti Zárójelezés"
            badge="Műveleti Sorrend"
            badgeColor="cyan"
          >
            <div className="space-y-3">
              <div className="text-center font-bold text-lg p-2.5 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300">
                <MathText>c = √(a² + b²) ⟹ √( (a)² + (b)² )</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Sok hagyományos zsebszámológép a gyökvonás gomb megnyomásakor csak a közvetlenül utána következő számból von gyököt, ha nem teszel zárójelet!
              </p>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-[11px] text-rose-800 dark:text-rose-300 border border-rose-200">
                <MathText>❌ <strong>HIBÁS:</strong> √4.2² + 7.5² = 4.2 + 56.25 = 60.45 (rossz!)</MathText><br />
                <MathText>✅ <strong>HELYES:</strong> √(4.2² + 7.5²) = √(17.64 + 56.25) = √73.89 ≈ <strong>8,60 cm</strong>.</MathText>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Kerekítési Szabályok és Pontosság"
            badge="Tizedesjegyek"
            badgeColor="sky"
          >
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A gyökvonás eredménye a legtöbbször <strong>irracionális szám</strong> (végtelen nem szakaszos tizedestört). A feladat szövege szerint kell kerekítenünk:
              </p>
              <ul className="text-xs space-y-1.5 list-disc pl-5 text-slate-700 dark:text-slate-300">
                <li><strong>Egy tizedesjegyre:</strong> a századok helyét nézzük (0-4 lefelé, 5-9 felfelé).</li>
                <li><strong>Két tizedesjegyre:</strong> az ezredek helyét nézzük (pl. 8,595... ⟹ 8,60).</li>
                <li><strong>Köztes eredmények:</strong> Számítás közben ne kerekíts korán, használd a gép memóriáját (ANS vagy M+ gomb)!</li>
              </ul>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Végzetes hiba: Korai kerekítés a részszámításoknál!"
          traps={[
            {
              mistake: 'A köztes négyzetek vagy részeredmények 1 tizedesjegyre kerekítése a gyökvonás előtt',
              correction: 'A kerekítési hibák összeadódnak és megsokszorozódnak. Mindig hagyd a teljes számot a számológép kijelzőjén, és csak a legvégén, az átfogó vagy magasság kiszámítása után kerekíts!'
            }
          ]}
        />
      </TheorySection>

      {/* 2. RÉSZ: GYÖKÖK BECSLÉSE FEJBEN */}
      <TheorySection
        title="2. Gyökvonás Becslése Fejben"
        subtitle="Hogyan ellenőrizheted gyorsan fejben, hogy a számológép helyes eredményt adott-e?"
        icon={<Hash className="w-5 h-5 text-cyan-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A számológépbe könnyű félreütni egy számot vagy elfelejteni a zárójelet.
          Ezért a jó matematikus <strong>mindig becsül fejben</strong> a szomszédos négyzetszámok segítségével!
        </p>

        <TheoryCallout
          title="A szomszédos négyzetszámok módszere"
          type="info"
        >
          <div className="space-y-2 text-xs sm:text-sm">
            <p>
              <MathText>Ha meg kell határoznunk például a <strong>√50</strong> értékét:</MathText>
            </p>
            <div className="text-center font-bold text-base p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl text-cyan-800 dark:text-cyan-300 border border-cyan-200">
              <MathText>49 &lt; 50 &lt; 64 &nbsp;⟹&nbsp; √49 &lt; √50 &lt; √64 &nbsp;⟹&nbsp; 7 &lt; √50 &lt; 8</MathText>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              <MathText>Mivel 50 sokkal közelebb van a 49-hez, mint a 64-hez, a √50 értéke éppen csak meghaladja a 7-et: <strong>√50 ≈ 7,07</strong>. Ha a számológéped 14-et vagy 25-öt írna ki, azonnal tudod, hogy elgépelted!</MathText>
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 3. RÉSZ: THEODÓROSZ SPIRÁLJA (GYÖKCSIGA) */}
      <TheorySection
        title="3. Theodórosz Spirálja (A Híres Gyökcsiga)"
        subtitle="Hogyan szerkeszthető meg tetszőleges √n hosszúságú szakasz pontosan vonalzóval és körzővel?"
        icon={<Compass className="w-5 h-5 text-cyan-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center my-4">
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Az ókori görög matematikus, <strong>Kürénéi Theodórosz</strong> felfedezte, hogy bár a négyzetgyökök többsége irracionális (végtelen tizedestört, amit vonalzóval lemérni nem lehet pontosan),
              <strong>mértanilag mégis hajszálpontosan meg lehet őket szerkeszteni</strong>!
            </p>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-xs">
              <div><MathText><strong>1. lépés:</strong> 1 cm és 1 cm befogójú derékszögű háromszög ⟹ átfogó: <strong>√2</strong>.</MathText></div>
              <div><MathText><strong>2. lépés:</strong> A √2 átfogóra merőlegesen 1 cm-es befogót emelünk ⟹ új átfogó: √( (√2)² + 1² ) = <strong>√3</strong>.</MathText></div>
              <div><MathText><strong>3. lépés:</strong> A √3 átfogóra merőlegesen újabb 1 cm-es befogó ⟹ új átfogó: √( (√3)² + 1² ) = √4 = <strong>2 cm</strong>.</MathText></div>
              <div><MathText><strong>Általánosan:</strong> √( (√n)² + 1² ) = <strong>√(n + 1)</strong>.</MathText></div>
            </div>
            <p className="text-[11px] text-slate-500">
              Ezzel a spirállal eljuthatunk √2-től egészen √17-ig, ahol a spirál megtesz egy teljes fordulatot és önmagába záródna!
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-cyan-200 dark:border-cyan-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Gyökcsiga felépítése (lépések)
            </span>
            <svg viewBox="0 0 200 150" className="w-full max-w-[200px] h-auto select-none">
              {/* O középpont */}
              <circle cx="100" cy="85" r="2.5" fill="#0284c7" />
              <text x="92" y="94" className="text-[9px] font-bold fill-sky-800">O</text>
              {/* 1. szakasz: vízszintes 1 egység jobbra: (100,85) -> (140,85) */}
              <line x1="100" y1="85" x2="140" y2="85" stroke="#334155" strokeWidth="1.5" />
              <text x="120" y="95" className="text-[8px] font-bold fill-slate-600">1</text>
              {/* 1 egység fel: (140,85) -> (140,45) */}
              <line x1="140" y1="85" x2="140" y2="45" stroke="#0284c7" strokeWidth="1.5" />
              <text x="145" y="65" className="text-[8px] font-bold fill-sky-700">1</text>
              {/* √2 átfogó: (100,85) -> (140,45) */}
              <line x1="100" y1="85" x2="140" y2="45" stroke="#059669" strokeWidth="1.8" />
              <text x="110" y="62" className="text-[8.5px] font-bold fill-emerald-700">√2</text>
              {/* Merőleges 1 egység a √2-re: irány (-28, 28) kb -> (112, 17) */}
              <line x1="140" y1="45" x2="112" y2="17" stroke="#0284c7" strokeWidth="1.5" />
              <text x="132" y="27" className="text-[8px] font-bold fill-sky-700">1</text>
              {/* √3 átfogó: (100,85) -> (112,17) */}
              <line x1="100" y1="85" x2="112" y2="17" stroke="#d97706" strokeWidth="1.8" />
              <text x="96" y="48" className="text-[8.5px] font-bold fill-amber-700">√3</text>
              {/* Merőleges 1 egység a √3-ra -> (73, 24) */}
              <line x1="112" y1="17" x2="73" y2="24" stroke="#0284c7" strokeWidth="1.5" />
              {/* √4 = 2 átfogó: (100,85) -> (73,24) */}
              <line x1="100" y1="85" x2="73" y2="24" stroke="#7c3aed" strokeWidth="1.8" />
              <text x="75" y="58" className="text-[8.5px] font-bold fill-purple-700">√4=2</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: PROJEKTMUNKA - PAPÍRHAJTOGATÁS */}
      <TheorySection
        title="4. Projektmunka: Papírhajtogatásos Pitagorasz-modell"
        subtitle="Hogyan bizonyítható a tétel olló, körző és számolás nélkül, pusztán hajtogatással?"
        icon={<Scissors className="w-5 h-5 text-cyan-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <TheoryCard
            title="1. Lépés: Négyzet alap"
            badge="Előkészítés"
            badgeColor="cyan"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Vegyünk egy négyzet alakú papírlapot (pl. 20 cm × 20 cm). A sarkain jelöljünk ki egy-egy <em>a</em> és <em>b</em> hosszúságú szakaszt úgy, hogy a négyzet oldala <em>a + b</em> legyen.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Lépés: Sarkok behajtása"
            badge="4 Háromszög"
            badgeColor="sky"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Hajtsuk be a négy sarkot az <em>a</em> és <em>b</em> befogójú derékszögű háromszögek átfogója mentén. Középen pontosan egy <strong>c oldalú négyzet</strong> keletkezik!
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Lépés: Területegyenlőség"
            badge="Bizonyítás"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A nagy négyzetből a 4 háromszöget elvéve a megmaradt terület kétféleképpen csoportosítható: vagy <strong>c²</strong>, vagy <strong>a² + b²</strong>. Tehát <strong>a² + b² = c²</strong>!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: INTERAKTÍV KALKULÁTOR ÉS SPIRÁLSZIMULÁTOR */}
      <TheorySection
        title="5. Interaktív Számológép & Gyökcsiga Szimulátor"
        subtitle="Próbáld ki a tizedes törtes számításokat és a Theodórosz-spirál növekedését!"
        icon={<Sliders className="w-5 h-5 text-cyan-600" />}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-cyan-200 dark:border-cyan-900/60 p-5 shadow-sm my-4">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Button
              variant={activeTab === 'calc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('calc')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'calc'
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Calculator className="w-4 h-4" />
              1. Zsebszámológép Szimulátor
            </Button>

            <Button
              variant={activeTab === 'spiral' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('spiral')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'spiral'
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Compass className="w-4 h-4" />
              2. Theodórosz Spirál Szimulátor
            </Button>

            <Button
              variant={activeTab === 'estimate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('estimate')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'estimate'
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Hash className="w-4 h-4" />
              3. Gyökbecslő Fejben
            </Button>
          </div>

          {/* TAB 1: ZSEBSZÁMOLÓGÉP */}
          {activeTab === 'calc' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Első befogó (a):</span>
                    <span className="font-mono text-cyan-600">{inputA.toFixed(1)} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.1"
                    value={inputA}
                    onChange={(e) => setInputA(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Második befogó (b):</span>
                    <span className="font-mono text-cyan-600">{inputB.toFixed(1)} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.1"
                    value={inputB}
                    onChange={(e) => setInputB(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1.5">
                  <div className="text-xs font-bold text-cyan-900 dark:text-cyan-200">
                    Lépésről lépésre számológépes levezetés:
                  </div>
                  <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                    a² = {inputA.toFixed(1)}² = {(inputA * inputA).toFixed(2)}<br />
                    b² = {inputB.toFixed(1)}² = {(inputB * inputB).toFixed(2)}<br />
                    a² + b² = {sumSq.toFixed(2)}
                  </div>
                  <div className="text-base font-bold text-cyan-700 dark:text-cyan-300 pt-1">
                    <MathText>{`c = √(${sumSq.toFixed(2)}) ≈ ${exactHyp.toFixed(2)} cm`}</MathText>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Kerekítve: 1 tizedesjegyre: <strong>{exactHyp.toFixed(1)} cm</strong> • 2 tizedesjegyre: <strong>{exactHyp.toFixed(2)} cm</strong>.
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="w-full max-w-[220px] bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-700 text-white font-mono space-y-3">
                  <div className="text-[10px] text-cyan-400 text-right uppercase tracking-wider">TUDOMÁNYOS KIJELZŐ</div>
                  <div className="bg-slate-950 p-2.5 rounded-xl text-right text-lg font-black text-cyan-300 border border-cyan-900/50 overflow-x-auto">
                    {exactHyp.toFixed(4)}
                  </div>
                  <div className="text-[11px] text-slate-300 text-center font-sans">
                    <MathText>{`√(${inputA.toFixed(1)}² + ${inputB.toFixed(1)}²)`}</MathText>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THEODÓROSZ SPIRÁL */}
          {activeTab === 'spiral' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Spirál lépéseinek száma (n):</span>
                    <span className="font-mono text-cyan-600 font-bold">{spiralSteps} lépés</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={spiralSteps}
                    onChange={(e) => setSpiralSteps(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1.5">
                  <div className="text-xs font-bold text-cyan-900 dark:text-cyan-200">
                    Aktuális leghosszabb átfogó:
                  </div>
                  <div className="text-base font-bold text-cyan-700 dark:text-cyan-300">
                    <MathText>{`c = √${spiralSteps + 1} ≈ ${Math.sqrt(spiralSteps + 1).toFixed(3)} cm`}</MathText>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    <MathText>{`Minden lépésben 1 cm-es merőleges befogót illesztünk a meglévő átfogóra: (√${spiralSteps})² + 1² = ${spiralSteps} + 1 = ${spiralSteps + 1}.`}</MathText>
                  </p>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 220 180" className="w-full max-w-[210px] h-auto select-none">
                  {/* Dinamikus spirál rajzolás */}
                  {(() => {
                    const cx = 110;
                    const cy = 90;
                    const scale = 28;
                    const elements = [];
                    let currentAngle = 0;

                    for (let i = 1; i <= spiralSteps; i++) {
                      const rPrev = Math.sqrt(i) * scale;
                      const rNext = Math.sqrt(i + 1) * scale;
                      const dAngle = Math.atan(1 / Math.sqrt(i));
                      const nextAngle = currentAngle + dAngle;

                      const x1 = cx + rPrev * Math.cos(currentAngle);
                      const y1 = cy - rPrev * Math.sin(currentAngle);
                      const x2 = cx + rNext * Math.cos(nextAngle);
                      const y2 = cy - rNext * Math.sin(nextAngle);

                      elements.push(
                        <g key={i}>
                          <polygon points={`${cx},${cy} ${x1},${y1} ${x2},${y2}`} fill="#0284c7" fillOpacity={0.08 + (i * 0.03)} stroke="#0284c7" strokeWidth="1" />
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#dc2626" strokeWidth="1.4" />
                          <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#059669" strokeWidth="1.5" />
                        </g>
                      );
                      currentAngle = nextAngle;
                    }

                    return (
                      <g>
                        {elements}
                        <circle cx={cx} cy={cy} r="2.5" fill="#0f172a" />
                        <text x={cx} y={cy + 14} textAnchor="middle" className="text-[8px] font-bold fill-slate-700">O</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 3: GYÖKBECSLŐ */}
          {activeTab === 'estimate' && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Becsülendő szám (N):</span>
                  <span className="font-mono text-cyan-600 font-bold">{estimateNum}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="150"
                  value={estimateNum}
                  onChange={(e) => setEstimateNum(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-2 text-center">
                <div className="text-xs font-bold text-cyan-900 dark:text-cyan-200">
                  Szomszédos négyzetszámok határai:
                </div>
                <div className="font-mono text-lg font-black text-cyan-800 dark:text-cyan-300">
                  {floorRoot}² = {floorRoot * floorRoot} &nbsp;&lt;&nbsp; {estimateNum} &nbsp;&lt;&nbsp; {ceilRoot * ceilRoot} = {ceilRoot}²
                </div>
                <div className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                  <MathText>{`${floorRoot} < √${estimateNum} < ${ceilRoot}`}</MathText>
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 pt-1">
                  <MathText>{`Pontos számológépes érték: √${estimateNum} ≈ ${exactRoot.toFixed(4)}`}</MathText>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. RÉSZ: ÖSSZEFOGLALÓ KÉPLETTÁBLÁZAT */}
      <TheorySection
        title="6. Számológép & Projektmunka Gyors Áttekintője"
        subtitle="A fejezet legfontosabb fogalmai, képletei és tudnivalói"
        icon={<Award className="w-5 h-5 text-cyan-600" />}
      >
        <TheoryTable
          headers={['Témakör / Fogalom', 'Helyes Módszer', 'Példa', 'Gyakori Hiba']}
          rows={[
            ['Zárójelezés', '√(a² + b²)', '√(3.5² + 4.8²)', '√3.5² + 4.8² (zárójel nélkül)'],
            ['Kerekítés', 'A feladat szövege szerint a legvégén', '√50 ≈ 7,07 (két tizedesre)', 'Korai részeredmény kerekítés'],
            ['Becslés', 'Két négyzetszám közé zárás', '49 < 50 < 64 ⟹ 7 < √50 < 8', 'Számológépes elütés észrevétlensége'],
            ['Theodórosz spirál', '(√n)² + 1² = n + 1 ⟹ √(n+1)', '√2, √3, √4=2, √5, ...', 'Átfogók lineáris növekedésének hite'],
            ['Papírhajtogatás', 'Négyzetből 4 háromszög levonása', 'c² = (a+b)² - 4·(ab/2)', 'Csak díszítésnek tekinteni']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CalculatorProjectTheory;
