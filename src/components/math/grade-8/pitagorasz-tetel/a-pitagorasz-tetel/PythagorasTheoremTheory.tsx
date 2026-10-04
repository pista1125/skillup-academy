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
  Triangle,
  Shapes,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  Sliders,
  BookOpen,
  Award
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PythagorasTheoremTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PythagorasTheoremTheory: React.FC<PythagorasTheoremTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV GEOMETRIAI SZIMULÁTOR ÁLLAPOTOK ---
  const [activeTab, setActiveTab] = useState<'dynamic' | 'dissection' | 'garfield'>('dynamic');

  // 1. Dinamikus befogók
  const [legA, setLegA] = useState<number>(3);
  const [legB, setLegB] = useState<number>(4);

  // 2. Lépésről lépésre bizonyítás
  const [dissectionStep, setDissectionStep] = useState<number>(1);

  // Számítások a dinamikus háromszöghöz
  const sqA = legA * legA;
  const sqB = legB * legB;
  const sqC = sqA + sqB;
  const hypC = Math.sqrt(sqC);
  const isTriple = Number.isInteger(hypC);

  // SVG skálázás a dinamikus ábrához
  const maxLeg = Math.max(legA, legB);
  const scale = Math.min(18, 160 / (maxLeg * 1.5 + 4));
  const scaledA = legA * scale;
  const scaledB = legB * scale;
  const scaledC = hypC * scale;

  // Derékszögű csúcs C(x, y) a dinamikus rajzban
  const originX = 130;
  const originY = 170;
  const pC = { x: originX, y: originY };
  const pA = { x: originX, y: originY - scaledA }; // függőlegesen fel
  const pB = { x: originX + scaledB, y: originY }; // vízszintesen jobbra

  // c oldal dőlésszöge
  const angleRad = Math.atan2(scaledA, scaledB);
  const angleDeg = (angleRad * 180) / Math.PI;

  return (
    <TheoryTemplate
      title="A Pitagorasz-tétel és Geometriai Bizonyításai"
      subtitle="A síkgeometria leghíresebb tétele: a² + b² = c², szemléletes területi modellek és számítási eljárások"
      quickRule={{
        label: 'A Pitagorasz-tétel Képlete',
        formula: 'a² + b² = c²',
        note: 'Befogók négyzetösszege = átfogó négyzete'
      }}
      badge="8. Osztály • Pitagorasz-tétel"
      themeColor="orange"
      pdfFilename="A_Pitagorasz_tetel_8_osztaly.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz Indítása"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses, 3 szintű Pitagorasz-tétel kvízben és minijátékokban!"
    >
      {/* 1. RÉSZ: A TÉTEL TÖRTÉNETE ÉS ALAPALAKJA */}
      <TheorySection
        title="1. A Pitagorasz-tétel Kimondása és Alapjai"
        subtitle="A matematika történetének egyik legjelentősebb összefüggése"
        icon={<Triangle className="w-5 h-5 text-orange-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A Pitagorasz-tétel nevét az ókori görög filozófusról és matematikusról,{' '}
          <strong className="text-orange-600 dark:text-orange-400">szamoszi Pitagoraszról</strong> (i. e. 6. század) kapta,
          noha a tétel alapjául szolgáló összefüggést (pl. a 3-4-5 csomózott kötelet) már az ókori egyiptomiak
          és babiloniak is használták derékszögek kimérésére.
        </p>

        <TheoryCallout
          title="A Pitagorasz-tétel Szöveges Kimondása és Alapábrája"
          type="info"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 space-y-2.5">
              <p className="text-xs sm:text-sm">
                Bármely derékszögű háromszögben a két befogó hosszának négyzetösszege megegyezik az átfogó hosszának négyzetével:
              </p>
              <div className="text-center font-mono font-black text-xl my-2 text-orange-600 dark:text-orange-400 tracking-wider bg-white/70 dark:bg-slate-900/60 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800 shadow-2xs">
                a² + b² = c²
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Geometriai értelmezésben: <em>A két befogóra kifelé rajzolt négyzet területének összege (T<sub>a</sub> + T<sub>b</sub>) pontosan megegyezik az átfogóra kifelé emelt négyzet területével (T<sub>c</sub>).</em>
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-orange-200 dark:border-orange-800/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Derékszögű háromszög
              </span>
              <svg viewBox="0 0 220 150" className="w-full max-w-[200px] h-auto">
                {/* Sima derékszögű háromszög: C(45, 120), B(185, 120), A(45, 28) */}
                <polygon points="45,120 185,120 45,28" fill="#fef3c7" fillOpacity="0.75" stroke="#b45309" strokeWidth="2" />

                {/* Magyar derékszög jelölés a C csúcsban: negyedkörív és pont */}
                <path d="M 45 104 A 16 16 0 0 1 61 120" fill="none" stroke="#b45309" strokeWidth="1.8" />
                <circle cx="52" cy="113" r="1.8" fill="#b45309" />

                {/* Hegyesszögek jelölése (α és β) */}
                <path d="M 45 44 A 16 16 0 0 1 54 39" fill="none" stroke="#64748b" strokeWidth="1.2" />
                <path d="M 169 120 A 16 16 0 0 1 174 111" fill="none" stroke="#64748b" strokeWidth="1.2" />

                {/* Csúcsok címkéi */}
                <text x="32" y="26" className="text-[11px] font-black fill-slate-800 dark:fill-white">A</text>
                <text x="195" y="125" className="text-[11px] font-black fill-slate-800 dark:fill-white">B</text>
                <text x="30" y="132" className="text-[11px] font-black fill-amber-900 dark:fill-amber-300">C</text>

                {/* Szög feliratok */}
                <text x="54" y="50" className="text-[9px] font-bold fill-slate-600">α</text>
                <text x="162" y="116" className="text-[9px] font-bold fill-slate-600">β</text>
                <text x="68" y="112" className="text-[9px] font-bold fill-amber-700">90°</text>

                {/* Befogó b (függőleges: AC) */}
                <text x="18" y="72" className="text-[10px] font-bold fill-amber-800" textAnchor="middle">b</text>
                <text x="18" y="83" className="text-[7px] fill-amber-900/70" textAnchor="middle">(befogó)</text>

                {/* Befogó a (vízszintes: CB) */}
                <text x="115" y="134" className="text-[10px] font-bold fill-orange-800" textAnchor="middle">a</text>
                <text x="115" y="144" className="text-[7px] fill-orange-900/70" textAnchor="middle">(befogó)</text>

                {/* Átfogó c (AB) */}
                <text x="125" y="68" className="text-[11px] font-black fill-emerald-800" textAnchor="middle">c</text>
                <text x="125" y="78" className="text-[7.5px] font-bold fill-emerald-900/80" textAnchor="middle">(átfogó)</text>
              </svg>
              <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                c² = a² + b² &nbsp;•&nbsp; c &gt; a, c &gt; b
              </div>
            </div>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <TheoryCard
            title="Befogók (a, b)"
            badge="90°-ot bezáró oldalak"
            color="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A derékszöget közrefogó két rövidebb él. Mindig egymásra merőlegesek.
              Négyzeteik: <MathText>T_a = a^2</MathText> és <MathText>T_b = b^2</MathText>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Átfogó (c)"
            badge="Leghosszabb oldal"
            color="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A 90°-os szöggel szemközti leghosszabb él: <MathText>c &gt; a</MathText> és <MathText>c &gt; b</MathText>.
              Négyzete pontosan az összeg: <MathText>T_c = c^2 = a^2 + b^2</MathText>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Kizárólagos Érvényesség"
            badge="Csak 90°-nál!"
            color="rose"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A tétel <strong>kizárólag derékszögű háromszögekben</strong> érvényes! Tompaszögű és hegyesszögű
              háromszögekre az egyenlőség NEM teljesül.
            </p>
          </TheoryCard>
        </div>

        {/* 2 STATIKUS ÁBRA: 3-4-5 NÉGYZETEK ÉS SZÖGVIZSGÁLAT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <GeometryFigureCard
            title="A Klasszikus 3-4-5 Geometriai Négyzetmodell"
            badge="Alapmodell"
            color="amber"
            description="A 3 és 4 cm befogójú háromszög oldalaira emelt négyzetek területe 9 cm² és 16 cm². Összegük pontosan kiadja a 25 cm²-es átfogónégyzetet (9 + 16 = 25)."
            figure={
              <svg viewBox="0 0 320 280" className="w-full max-w-xs h-auto">
                {/* Derékszögű háromszög: C(110, 150), B(190, 150), A(110, 90) */}
                <polygon points="110,150 190,150 110,90" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
                {/* Magyar derékszög jelölés C-ben: negyedkörív és pont */}
                <path d="M 110 136 A 14 14 0 0 1 124 150" fill="none" stroke="#b45309" strokeWidth="1.8" />
                <circle cx="116" cy="144" r="1.8" fill="#b45309" />

                {/* a = 4 befogó négyzete (lent: [110, 190] x [150, 230]) */}
                <rect x="110" y="150" width="80" height="80" fill="#fed7aa" fillOpacity="0.7" stroke="#ea580c" strokeWidth="1.5" />
                <text x="150" y="195" className="text-[12px] font-black fill-orange-950" textAnchor="middle">Tb = 16</text>

                {/* b = 3 befogó négyzete (balra: [50, 110] x [90, 150]) */}
                <rect x="50" y="90" width="60" height="60" fill="#fde68a" fillOpacity="0.7" stroke="#d97706" strokeWidth="1.5" />
                <text x="80" y="125" className="text-[12px] font-black fill-amber-950" textAnchor="middle">Ta = 9</text>

                {/* c = 5 átfogó négyzete (AB átfogóra kifelé emelve) */}
                <g transform="translate(110, 90) rotate(36.87)" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5">
                  <rect x="0" y="-100" width="100" height="100" fill="#bbf7d0" fillOpacity="0.7" />
                  <text x="50" y="-45" className="text-[13px] font-black fill-emerald-950" textAnchor="middle">Tc = 25</text>
                </g>

                {/* Oldalcímkék */}
                <text x="40" y="120" className="text-[10px] font-bold fill-amber-800">b=3</text>
                <text x="150" y="245" className="text-[10px] font-bold fill-orange-800" textAnchor="middle">a=4</text>
                <text x="180" y="70" className="text-[11px] font-bold fill-emerald-800">c=5</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Mi történik nem derékszög esetén?"
            badge="Szögtípusok"
            color="rose"
            description="Ha a szög hegyesszög (< 90°), az átfogónégyzet kisebb lesz a befogónégyzetek összegénél. Ha tompaszög (> 90°), nagyobb lesz. Csak 90°-nál van egyenlőség!"
            figure={
              <svg viewBox="0 0 320 200" className="w-full max-w-sm h-auto">
                {/* 1. Hegyesszögű */}
                <g transform="translate(20, 20)">
                  <polygon points="10,80 70,80 50,20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.8" />
                  <text x="40" y="100" className="text-[9px] font-bold fill-indigo-900" textAnchor="middle">γ &lt; 90° (Hegyes)</text>
                  <text x="40" y="115" className="text-[10px] font-black fill-indigo-700" textAnchor="middle">a² + b² &gt; c²</text>
                </g>

                {/* 2. Derékszögű */}
                <g transform="translate(120, 20)">
                  <polygon points="10,80 70,80 10,20" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  {/* Magyar derékszög jelölés */}
                  <path d="M 10 70 A 10 10 0 0 1 20 80" fill="none" stroke="#d97706" strokeWidth="1.5" />
                  <circle cx="14" cy="76" r="1.2" fill="#d97706" />
                  <text x="40" y="100" className="text-[9px] font-bold fill-amber-900" textAnchor="middle">γ = 90° (Derékszög)</text>
                  <text x="40" y="115" className="text-[10px] font-black fill-amber-700" textAnchor="middle">a² + b² = c²</text>
                </g>

                {/* 3. Tompaszögű */}
                <g transform="translate(220, 20)">
                  <polygon points="30,80 90,80 5,30" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.8" />
                  <text x="45" y="100" className="text-[9px] font-bold fill-rose-900" textAnchor="middle">γ &gt; 90° (Tompa)</text>
                  <text x="45" y="115" className="text-[10px] font-black fill-rose-700" textAnchor="middle">a² + b² &lt; c²</text>
                </g>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 2. RÉSZ: INTERAKTÍV GEOMETRIAI PITAGORASZ-TÉTEL SZIMULÁTOR */}
      <TheorySection
        title="2. Interaktív Geometriai Pitagorasz-tétel Demonstráció"
        subtitle="Fedezd fel a tétel működését a csúszkák mozgatásával és a lépésről lépésre követhető bizonyításokkal!"
        icon={<Sliders className="w-5 h-5 text-orange-600" />}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-200 dark:border-orange-900/60 p-5 shadow-sm my-4">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Button
              variant={activeTab === 'dynamic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('dynamic')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'dynamic'
                  ? "bg-orange-600 hover:bg-orange-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Sliders className="w-4 h-4" />
              1. Dinamikus Háromszög és Négyzetek
            </Button>

            <Button
              variant={activeTab === 'dissection' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('dissection')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'dissection'
                  ? "bg-orange-600 hover:bg-orange-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Layers className="w-4 h-4" />
              2. Átrendezéses (Darabolásos) Bizonyítás
            </Button>

            <Button
              variant={activeTab === 'garfield' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('garfield')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'garfield'
                  ? "bg-orange-600 hover:bg-orange-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Award className="w-4 h-4" />
              3. Garfield Elnök Trapézos Bizonyítása
            </Button>
          </div>

          {/* 1. FÜL: DINAMIKUS NÉGYZETEK CSÚSZKÁKKAL */}
          {activeTab === 'dynamic' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Bal oldal: Csúszkák és számítási adatok */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 dark:text-orange-200 mb-3 flex items-center justify-between">
                    <span>Befogók Beállítása</span>
                    {isTriple && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ⭐ Pitagoraszi Számhármas!
                      </span>
                    )}
                  </h4>

                  {/* 'a' befogó csúszka */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-amber-800 dark:text-amber-300">Függőleges befogó (a):</span>
                      <span className="font-mono text-amber-900 dark:text-amber-200">{legA} cm</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      step={1}
                      value={legA}
                      onChange={(e) => setLegA(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  {/* 'b' befogó csúszka */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-orange-800 dark:text-orange-300">Vízszintes befogó (b):</span>
                      <span className="font-mono text-orange-900 dark:text-orange-200">{legB} cm</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      step={1}
                      value={legB}
                      onChange={(e) => setLegB(Number(e.target.value))}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                  </div>

                  {/* Gyorsgombok nevezetes hármasokhoz */}
                  <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    Gyakori arányok:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => { setLegA(3); setLegB(4); }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                        legA === 3 && legB === 4
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-orange-50"
                      )}
                    >
                      3 - 4 - 5
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLegA(6); setLegB(8); }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                        legA === 6 && legB === 8
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-orange-50"
                      )}
                    >
                      6 - 8 - 10
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLegA(4); setLegB(4); }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                        legA === 4 && legB === 4
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-orange-50"
                      )}
                    >
                      4 - 4 (√32)
                    </button>
                  </div>
                </div>

                {/* Területek összeadódása és átfogó kiszámítása */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Ta = a²:</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{legA}² = {sqA} cm²</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Tb = b²:</span>
                    <span className="font-mono font-bold text-orange-700 dark:text-orange-300">{legB}² = {sqB} cm²</span>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
                    <span>Tc = Ta + Tb:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{sqA} + {sqB} = {sqC} cm²</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Átfogó (c = √Tc):</span>
                    <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">
                      c = {isTriple ? `${hypC} cm` : `√${sqC} ≈ ${hypC.toFixed(2)} cm`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Jobb oldal: Valós idejű Geometriai SVG */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <svg viewBox="0 0 360 300" className="w-full max-w-md h-auto">
                  {/* Derékszögű háromszög */}
                  <polygon
                    points={`${pC.x},${pC.y} ${pB.x},${pB.y} ${pA.x},${pA.y}`}
                    fill="#fef3c7"
                    stroke="#b45309"
                    strokeWidth="2"
                  />

                  {/* Magyar derékszög jelölés a C csúcsban: negyedkörív és pont */}
                  <path
                    d={`M ${pC.x} ${pC.y - 14} A 14 14 0 0 1 ${pC.x + 14} ${pC.y}`}
                    fill="none"
                    stroke="#b45309"
                    strokeWidth="1.8"
                  />
                  <circle cx={pC.x + 6} cy={pC.y - 6} r="1.5" fill="#b45309" />

                  {/* 'a' befogó négyzete (balra kifelé): szélessége scaledA, magassága scaledA */}
                  <rect
                    x={pC.x - scaledA}
                    y={pA.y}
                    width={scaledA}
                    height={scaledA}
                    fill="#fde68a"
                    fillOpacity="0.65"
                    stroke="#d97706"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pC.x - scaledA / 2}
                    y={pA.y + scaledA / 2 + 4}
                    className="text-[11px] font-black fill-amber-950"
                    textAnchor="middle"
                  >
                    Ta = {sqA}
                  </text>

                  {/* 'b' befogó négyzete (lefelé kifelé): [pC.x, pB.x] x [pC.y, pC.y + scaledB] */}
                  <rect
                    x={pC.x}
                    y={pC.y}
                    width={scaledB}
                    height={scaledB}
                    fill="#fed7aa"
                    fillOpacity="0.65"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pC.x + scaledB / 2}
                    y={pC.y + scaledB / 2 + 4}
                    className="text-[11px] font-black fill-orange-950"
                    textAnchor="middle"
                  >
                    Tb = {sqB}
                  </text>

                  {/* 'c' átfogó négyzete (az AB átfogóra illesztve, kifelé építve) */}
                  <g
                    transform={`translate(${pA.x}, ${pA.y}) rotate(${angleDeg})`}
                    fill="#bbf7d0"
                    fillOpacity="0.7"
                    stroke="#16a34a"
                    strokeWidth="1.5"
                  >
                    <rect x="0" y={-scaledC} width={scaledC} height={scaledC} />
                    <text
                      x={scaledC / 2}
                      y={-scaledC / 2 + 4}
                      className="text-[12px] font-black fill-emerald-950"
                      textAnchor="middle"
                    >
                      Tc = {sqC}
                    </text>
                  </g>

                  {/* Címkék a háromszög csúcsainál */}
                  <text x={pC.x - 10} y={pC.y + 14} className="text-[10px] font-bold fill-slate-700">C</text>
                  <text x={pA.x - 10} y={pA.y - 4} className="text-[10px] font-bold fill-slate-700">A</text>
                  <text x={pB.x + 8} y={pB.y + 12} className="text-[10px] font-bold fill-slate-700">B</text>
                </svg>
                <div className="text-center text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-2">
                  <span className="text-amber-600">Ta ({sqA})</span> +{' '}
                  <span className="text-orange-600">Tb ({sqB})</span> ={' '}
                  <span className="text-emerald-600 font-extrabold">Tc ({sqC} cm²)</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. FÜL: LÉPÉSRŐL LÉPÉSRE ÁTRENDEZÉSES BIZONYÍTÁS */}
          {activeTab === 'dissection' && (
            <div className="space-y-4">
              {/* Lépésszabályzó */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={dissectionStep <= 1}
                  onClick={() => setDissectionStep((prev) => Math.max(1, prev - 1))}
                  className="rounded-xl h-8 px-3 text-xs font-bold cursor-pointer"
                >
                  Előző lépés
                </Button>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {dissectionStep}. Lépés / 5
                </span>
                <Button
                  variant="default"
                  size="sm"
                  disabled={dissectionStep >= 5}
                  onClick={() => setDissectionStep((prev) => Math.min(5, prev + 1))}
                  className="rounded-xl h-8 px-3 text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                >
                  Következő lépés
                </Button>
              </div>

              {/* Lépés leírása */}
              <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {dissectionStep === 1 && (
                  <p>
                    <strong>1. Lépés:</strong> Rajzoljunk fel két teljesen azonos méretű nagy négyzetet, melyek oldalhossza{' '}
                    <strong>(a + b)</strong>! Mindkét nagy négyzet teljes területe:{' '}
                    <span className="font-mono font-bold text-orange-600">T_össz = (a + b)²</span>.
                  </p>
                )}
                {dissectionStep === 2 && (
                  <p>
                    <strong>2. Lépés:</strong> Mindkét nagy négyzetbe elhelyezünk <strong>4 darab teljesen egybevágó</strong>{' '}
                    derékszögű háromszöget, amelyek befogói <em>a</em> és <em>b</em>, átfogójuk pedig <em>c</em>.
                  </p>
                )}
                {dissectionStep === 3 && (
                  <p>
                    <strong>3. Lépés (Bal oldali négyzet):</strong> A 4 háromszöget két darab <em>a × b</em> méretű téglalapba párosítjuk.
                    A nagy négyzetből megmaradó két kitöltetlen felület pontosan a két befogó négyzete:{' '}
                    <strong className="text-amber-600">Ta = a²</strong> és <strong className="text-orange-600">Tb = b²</strong>!
                  </p>
                )}
                {dissectionStep === 4 && (
                  <p>
                    <strong>4. Lépés (Jobb oldali négyzet):</strong> A 4 háromszöget a szélek mentén körbe forgatva helyezzük el.
                    A középen megmaradó belső felület egy <em>c</em> oldalú négyzet, területe:{' '}
                    <strong className="text-emerald-600">Tc = c²</strong>!
                  </p>
                )}
                {dissectionStep === 5 && (
                  <p>
                    <strong>5. Lépés (Következtetés):</strong> Mivel mindkét nagy négyzet azonos alapterületű, és mindkettőből 4 darab
                    azonos területű háromszöget vettünk el, a megmaradó területeknek egyenlőknek kell lenniük:{' '}
                    <strong className="text-orange-600 text-sm">a² + b² = c²</strong>! Ezzel a Pitagorasz-tételt bizonyítottuk.
                  </p>
                )}
              </div>

              {/* Grafikai illusztráció a két négyzetről */}
              <div className="flex justify-center p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <svg viewBox="0 0 340 180" className="w-full max-w-md h-auto">
                  {/* 1. Bal oldali nagy négyzet [20, 150] x [20, 150] */}
                  <rect x="20" y="20" width="130" height="130" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                  <text x="85" y="14" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">1. Négyzet: (a + b)²</text>

                  {/* Bal oldali háromszögek ha step >= 2 */}
                  {dissectionStep >= 2 && (
                    <g fill="#fed7aa" stroke="#ea580c" strokeWidth="1">
                      <polygon points="20,20 60,20 20,110" />
                      <polygon points="60,20 60,110 20,110" />
                      <polygon points="60,110 150,110 60,150" />
                      <polygon points="150,110 150,150 60,150" />
                    </g>
                  )}

                  {/* Maradék a² és b² ha step >= 3 */}
                  {dissectionStep >= 3 && (
                    <>
                      <rect x="60" y="20" width="90" height="90" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                      <text x="105" y="70" className="text-[13px] font-black fill-amber-900" textAnchor="middle">b²</text>
                      <rect x="20" y="110" width="40" height="40" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                      <text x="40" y="135" className="text-[11px] font-black fill-amber-900" textAnchor="middle">a²</text>
                      <text x="85" y="168" className="text-[10px] font-black fill-amber-800" textAnchor="middle">Maradék: a² + b²</text>
                    </>
                  )}

                  {/* 2. Jobb oldali nagy négyzet [190, 320] x [20, 150] */}
                  <rect x="190" y="20" width="130" height="130" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                  <text x="255" y="14" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">2. Négyzet: (a + b)²</text>

                  {/* Jobb oldali háromszögek ha step >= 2 */}
                  {dissectionStep >= 2 && (
                    <g fill="#fed7aa" stroke="#ea580c" strokeWidth="1">
                      <polygon points="190,60 280,20 190,20" />
                      <polygon points="280,20 320,20 320,110" />
                      <polygon points="320,110 320,150 230,150" />
                      <polygon points="230,150 190,150 190,60" />
                    </g>
                  )}

                  {/* Maradék c² ha step >= 4 */}
                  {dissectionStep >= 4 && (
                    <>
                      <polygon points="190,60 280,20 320,110 230,150" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
                      <text x="255" y="90" className="text-[14px] font-black fill-emerald-950" textAnchor="middle">c²</text>
                      <text x="255" y="168" className="text-[10px] font-black fill-emerald-800" textAnchor="middle">Maradék: c²</text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* 3. FÜL: GARFIELD ELNÖK TRAPÉZOS BIZONYÍTÁSA */}
          {activeTab === 'garfield' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>James A. Garfield</strong> (későbbi amerikai elnök) 1876-ban publikálta ezt a rendkívül elegáns
                  bizonyítást: két egybevágó derékszögű háromszögből és egy harmadik egyenlő szárú derékszögű háromszögből
                  egy <strong>derékszögű trapézt</strong> állított össze!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Trapéz SVG */}
                <div className="flex justify-center p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <svg viewBox="0 0 280 200" className="w-full max-w-xs h-auto">
                    {/* Alap egyenes (függőleges tengely mentén) */}
                    {/* Trapéz csúcsai: (40, 160), (160, 160), (160, 40), (40, 100) */}
                    <polygon points="40,160 180,160 180,40 40,100" fill="#fdf4ff" stroke="#7e22ce" strokeWidth="2" />

                    {/* 1. Háromszög: (40, 160) -> (180, 160) -> (40, 100) => a=60, b=140 */}
                    <polygon points="40,160 180,160 40,100" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                    {/* Derékszög jelölés */}
                    <path d="M 40 148 A 12 12 0 0 1 52 160" fill="none" stroke="#ea580c" strokeWidth="1.2" />
                    <circle cx="45" cy="155" r="1" fill="#ea580c" />
                    <text x="30" y="135" className="text-[9px] font-bold fill-orange-800">a</text>
                    <text x="110" y="175" className="text-[9px] font-bold fill-orange-800">b</text>
                    <text x="115" y="125" className="text-[10px] font-black fill-emerald-700">c</text>

                    {/* 2. Háromszög: (180, 160) -> (180, 40) -> (40, 100) */}
                    {/* Valójában két derékszögű háromszög van a trapézban: (40,160)-(40,100)-(180,100) és (40,100)-(180,40) */}
                    <text x="100" y="75" className="text-[11px] font-black fill-purple-900">c² / 2</text>
                    <text x="190" y="100" className="text-[9px] font-bold fill-orange-800">b</text>
                    <text x="110" y="32" className="text-[9px] font-bold fill-orange-800">a</text>
                  </svg>
                </div>

                {/* Matematikai levezetés */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 text-xs">
                  <h5 className="font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wide text-[11px]">
                    A Területek Egyenlősége:
                  </h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    A trapéz területe egyenlő a 3 alkotó háromszög területének összegével:
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border font-mono text-center text-indigo-700 dark:text-indigo-300">
                    T_trapéz = (a + b) · (a + b) / 2
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border font-mono text-center text-purple-700 dark:text-purple-300">
                    T_3háromszög = 2 · (a·b / 2) + c² / 2
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Beszorozva 2-vel és felbontva a zárójelet:
                  </p>
                  <div className="font-mono text-center font-bold text-orange-600">
                    a² + 2ab + b² = 2ab + c²  ⇒  a² + b² = c²!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 3. RÉSZ: SZÁMÍTÁSOK: ÁTFOGÓ ÉS BEFOGÓ KISZÁMÍTÁSA */}
      <TheorySection
        title="3. Számítási Módszerek: Átfogó és Befogó Keresése"
        subtitle="Hogyan alkalmazzuk az algebrai képletet a hiányzó oldalak kiszámítására?"
        icon={<Maximize2 className="w-5 h-5 text-orange-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Átfogó Kiszámítása (c = ?)"
            badge="Összeadás!"
            color="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Ha ismerjük a két befogót (<em>a</em> és <em>b</em>), a négyzetösszegükből vonunk négyzetgyököt:
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-bold text-xs text-emerald-800 dark:text-emerald-200 my-2">
              <MathText>c = √(a² + b²)</MathText>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 space-y-1">
              <div><strong>Példa:</strong> a = 6 cm, b = 8 cm</div>
              <div>c² = 6² + 8² = 36 + 64 = 100</div>
              <div className="font-bold text-emerald-600"><MathText>c = √100 = 10 cm</MathText></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Befogó Kiszámítása (a = ? vagy b = ?)"
            badge="Kivonás!"
            color="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Ha ismerjük az átfogót és az egyik befogót, az átfogó négyzetéből <strong>KIVONJUK</strong> az ismert befogó négyzetét:
            </p>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center font-bold text-xs text-amber-800 dark:text-amber-200 my-2">
              <MathText>a = √(c² - b²)  |  b = √(c² - a²)</MathText>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 space-y-1">
              <div><strong>Példa:</strong> c = 13 cm, a = 5 cm</div>
              <div>b² = 13² - 5² = 169 - 25 = 144</div>
              <div className="font-bold text-amber-600"><MathText>b = √144 = 12 cm</MathText></div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Gyakori Buktató: Befogó számításakor NEM összeadunk!"
          traps={[
            'A leggyakoribb hiba, hogy befogó keresésekor is összeadják a négyzeteket (pl. 13² + 5² = 194). Ekkor az eredmény hosszabb lenne az átfogónál, ami geometriai képtelenség!',
            'Mindig ellenőrizd az eredményt: az átfogónak (c) szigorúan a leghosszabb oldalnak kell lennie: c > a és c > b!',
            'Ha az eredmény nem négyzetszám, hagyjuk pontos gyökös alakban (pl. c = √50 = 5 · √2 cm), vagy kerekítsük két tizedesjegyre (≈ 7,07 cm).'
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: NEVEZETES PITAGORASZI SZÁMHÁRMASOK */}
      <TheorySection
        title="4. Nevezetes Pitagoraszi Számhármasok"
        subtitle="Olyan egész számok (a, b, c), amelyekre maradéktalanul teljesül az a² + b² = c² egyenlőség"
        icon={<Shapes className="w-5 h-5 text-orange-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Egy <strong className="text-orange-600 dark:text-orange-400">(a, b, c)</strong> pozitív egész számhármast{' '}
          <strong>pitagoraszi számhármasnak</strong> nevezünk, ha kielégíti a Pitagorasz-tételt. Ha <em>a, b, c</em> relatív prímek,
          akkor <strong>primitív pitagoraszi számhármasról</strong> beszélünk.
        </p>

        <div className="my-4">
          <TheoryTable
            headers={['Primitív Számhármas', 'Befogók (a, b)', 'Átfogó (c)', 'Ellenőrzés (a² + b² = c²)', '2-szeres többszörös']}
            rows={[
              ['(3, 4, 5)', '3 és 4', '5', '9 + 16 = 25', '(6, 8, 10)'],
              ['(5, 12, 13)', '5 és 12', '13', '25 + 144 = 169', '(10, 24, 26)'],
              ['(8, 15, 17)', '8 és 15', '17', '64 + 225 = 289', '(16, 30, 34)'],
              ['(7, 24, 25)', '7 és 24', '25', '49 + 576 = 625', '(14, 48, 50)'],
              ['(9, 40, 41)', '9 és 40', '41', '81 + 1600 = 1681', '(18, 80, 82)']
            ]}
          />
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 my-4 text-xs space-y-2">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            Többszörösök Szabálya:
          </h4>
          <p className="text-slate-700 dark:text-slate-300">
            Ha egy számhármas kielégíti a Pitagorasz-tételt, akkor annak bármely <strong>k-szorosa</strong>{' '}
            (<em>k · a, k · b, k · c</em>) is derékszögű háromszöget alkot! Például a (3, 4, 5) háromszorosára:{' '}
            <strong>(9, 12, 15)</strong>, tízszeresére: <strong>(30, 40, 50)</strong>.
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
