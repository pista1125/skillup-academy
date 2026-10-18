import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Shapes,
  Triangle,
  Circle,
  Square,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Ruler,
  Compass,
  Eye,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PolygonsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PolygonsTheory: React.FC<PolygonsTheoryProps> = ({ onBack, onStartQuiz }) => {
  // ========================================================
  // INTERAKTÍV SÍKIDOM MODELL ÁLLAPOTAI
  // ========================================================
  const [activeTab, setActiveTab] = useState<'polygon' | 'triangle' | 'circle'>('polygon');

  // 1. Sokszögépítő állapotai
  const [sides, setSides] = useState<number>(5); // n = 3..8
  const [showDiagonals, setShowDiagonals] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);

  // 2. Háromszög állapotai
  const [triangleType, setTriangleType] = useState<'equilateral' | 'isosceles' | 'right' | 'obtuse' | 'scalene'>('equilateral');

  // 3. Kör és részei állapotai
  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [showDiameter, setShowDiameter] = useState<boolean>(true);
  const [showChord, setShowChord] = useState<boolean>(false);
  const [showSector, setShowSector] = useState<boolean>(false);

  // Sokszög matematikai számításai
  const polyNames: Record<number, { name: string; sum: number; diags: number; regAngle: number }> = {
    3: { name: 'Háromszög', sum: 180, diags: 0, regAngle: 60 },
    4: { name: 'Négyszög', sum: 360, diags: 2, regAngle: 90 },
    5: { name: 'Ötszög', sum: 540, diags: 5, regAngle: 108 },
    6: { name: 'Hatszög', sum: 720, diags: 9, regAngle: 120 },
    7: { name: 'Hétszög', sum: 900, diags: 14, regAngle: 128.6 },
    8: { name: 'Nyolcszög', sum: 1080, diags: 20, regAngle: 135 }
  };

  const polyInfo = polyNames[sides] || polyNames[3];

  // Szabályos sokszög csúcsainak számítása (kör sugara: R=60, középpont: 120, 100)
  const pcx = 120;
  const pcy = 100;
  const pr = 60;
  const vertices = Array.from({ length: sides }, (_, i) => {
    const angleRad = (i * 2 * Math.PI) / sides - Math.PI / 2;
    return {
      x: pcx + pr * Math.cos(angleRad),
      y: pcy + pr * Math.sin(angleRad),
      name: String.fromCharCode(65 + i)
    };
  });

  const polygonPath = vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ') + ' Z';

  // Átlók listája
  const diagonals: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < sides; i++) {
    for (let j = i + 2; j < sides; j++) {
      if (i === 0 && j === sides - 1) continue; // szomszédos oldal kizárása
      diagonals.push({
        x1: vertices[i].x,
        y1: vertices[i].y,
        x2: vertices[j].x,
        y2: vertices[j].y
      });
    }
  }

  return (
    <TheoryTemplate
      title="5. Síkidomok, sokszögek"
      subtitle="Sokszögek fogalma, alkotóelemei, háromszögek kettős osztályozása, négyszögek és a kör geometriája"
      documentId="g5-geom-polygons-theory-content"
      pdfFilename="5_osztaly_III_geometria_5_sikidomok_sokszogek_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="teal"
      badgeText="📐 5. Osztály • III. Bevezetés a geometriába"
      quickRule={{
        label: "Síkidomok aranyszabályai",
        formula: "Oldalszám = Csúcsszám = Belső szögek száma • Háromszög belső szögei: 180° • Négyszög: 360° • Kör átmérője: d = 2 · r"
      }}
      practiceTitle="Készen állsz a síkidomok és sokszögek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: A SÍKIDOMOK ÉS SOKSZÖGEK FOGALMA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-polygons-basics"
        number={1}
        title="A síkidom és a sokszög fogalma, alkotóelemei"
        badge="Alapfogalmak"
        badgeColor="teal"
      >
        <TheoryCard
          title="Mi a síkidom és mi a sokszög a geometriában?"
          subtitle="Zárt vonal által határolt síkrész — egyenes vagy görbe határvonalakkal"
          themeColor="teal"
          icon={<Shapes className="w-5 h-5 text-teal-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-xs sm:text-sm">
            A sík egy tetszőleges zárt vonallal határolt részét <strong>síkidomnak</strong> nevezzük. Ha a határoló vonal kizárólag egyenes szakaszokból áll (egyszerű zárt töröttvonal), akkor a síkidomot <strong>sokszögnek (poligonnak)</strong> hívjuk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-1 rounded-full bg-teal-600 inline-block" />
                <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">Oldalak (a, b, c...)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A sokszöget határoló <strong>szakaszok</strong>. A csúcsok betűivel (<MathText>{'AB, BC'}</MathText>) vagy kisbetűkkel jelöljük.
              </p>
            </div>

            <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">Csúcsok (A, B, C...)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A szomszédos oldalak <strong>közös végpontjai</strong>. Mindig nyomtatott nagybetűvel jelöljük őket, általában az óramutatóval ellentétes irányban haladva.
              </p>
            </div>

            <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-1 rounded-full bg-indigo-500 inline-block border-b-2 border-dashed border-indigo-500" />
                <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">Átlók</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A sokszög <strong>két nem szomszédos csúcsát</strong> összekötő szakaszok. A háromszögnek nincs átlója, a négyszögnek 2 van.
              </p>
            </div>
          </div>

          {/* Szemléltető ábra: Sokszög részei */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 text-center">
              Egy ötszög (pentagon) csúcsai, oldalai, belső szögei és átlói
            </h4>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              <svg className="w-56 h-40 sm:w-64 sm:h-44 drop-shadow-sm select-none" viewBox="0 0 240 160" fill="none">
                {/* Belső terület kitöltése */}
                <polygon points="120,20 205,65 175,140 65,140 35,65" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />

                {/* Átlók (szaggatott kék vonalak) */}
                <line x1="120" y1="20" x2="175" y2="140" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="120" y1="20" x2="65" y2="140" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="35" y1="65" x2="175" y2="140" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="35" y1="65" x2="205" y2="65" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="205" y1="65" x2="65" y2="140" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Csúcspontok és feliratok */}
                <circle cx="120" cy="20" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="120" y="10" textAnchor="middle" className="text-[12px] font-black fill-rose-600">A (csúcs)</text>

                <circle cx="205" cy="65" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="215" y="68" className="text-[12px] font-black fill-rose-600">B</text>

                <circle cx="175" cy="140" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="185" y="145" className="text-[12px] font-black fill-rose-600">C</text>

                <circle cx="65" cy="140" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="50" y="145" className="text-[12px] font-black fill-rose-600">D</text>

                <circle cx="35" cy="65" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="20" y="68" className="text-[12px] font-black fill-rose-600">E</text>

                {/* Oldal felirat */}
                <text x="170" y="38" className="text-[11px] font-bold fill-teal-800">a oldal</text>
                <text x="120" y="154" textAnchor="middle" className="text-[11px] font-bold fill-teal-800">c oldal</text>

                {/* Belső szög ív A-nál */}
                <path d="M 112 30 A 15 15 0 0 0 128 30" stroke="#d97706" strokeWidth="2" fill="none" />
                <text x="120" y="44" textAnchor="middle" className="text-[10px] font-black fill-amber-700">α</text>
              </svg>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xs w-full">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-teal-700 dark:text-teal-400 block mb-0.5">Alapszabály (n-szög):</span>
                  <MathText>{'\\text{Oldalak száma} = \\text{Csúcsok száma} = n'}</MathText>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ötszögnél: 5 oldal, 5 csúcs, 5 belső szög.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">Egy csúcsból húzható átlók:</span>
                  <MathText>{'n - 3'}</MathText>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Mivel önmagába és a 2 szomszédos csúcsba nem húzható átló (azok oldalak!).
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">Belső szögek összege:</span>
                  <MathText>{'(n - 2) \\cdot 180^\\circ'}</MathText>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Minden sokszög <MathText>{'n - 2'}</MathText> darab háromszögre vágható szét!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: INTERAKTÍV SOKSZÖG-, HÁROMSZÖG- ÉS KÖRVIZSGÁLÓ */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-polygons-interactive"
        number={2}
        title="Interaktív Síkidom-, Háromszög- és Körlabor"
        badge="Interaktív Modell"
        badgeColor="teal"
      >
        <TheoryCard
          title="Próbáld ki a síkidomok dinamikus tulajdonságait!"
          subtitle="Válts a sokszögépítő, a háromszög-katalógus és a körvizsgáló között!"
          themeColor="teal"
          icon={<Sliders className="w-5 h-5 text-teal-600" />}
        >
          {/* Fő interaktív vezérlősáv */}
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900 border-2 border-teal-300 dark:border-teal-800 shadow-sm space-y-4">
            
            {/* Tab választó */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <Button
                size="sm"
                variant={activeTab === 'polygon' ? "default" : "outline"}
                onClick={() => setActiveTab('polygon')}
                className={cn("text-xs font-bold h-8 rounded-lg", activeTab === 'polygon' ? "bg-teal-600 hover:bg-teal-700 text-white" : "")}
              >
                <Shapes className="w-3.5 h-3.5 mr-1.5" />
                1. Sokszögépítő (n = 3..8)
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'triangle' ? "default" : "outline"}
                onClick={() => setActiveTab('triangle')}
                className={cn("text-xs font-bold h-8 rounded-lg", activeTab === 'triangle' ? "bg-teal-600 hover:bg-teal-700 text-white" : "")}
              >
                <Triangle className="w-3.5 h-3.5 mr-1.5" />
                2. Háromszögek
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'circle' ? "default" : "outline"}
                onClick={() => setActiveTab('circle')}
                className={cn("text-xs font-bold h-8 rounded-lg", activeTab === 'circle' ? "bg-teal-600 hover:bg-teal-700 text-white" : "")}
              >
                <Circle className="w-3.5 h-3.5 mr-1.5" />
                3. Kör és részei
              </Button>
            </div>

            {/* TAB 1: SOKSZÖGÉPÍTŐ */}
            {activeTab === 'polygon' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">{polyInfo.name}</span>
                    <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-300 font-bold text-[10px]">
                      {sides} oldal • {sides} csúcs
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={showDiagonals ? "default" : "outline"}
                      onClick={() => setShowDiagonals(!showDiagonals)}
                      className="text-xs h-7 font-bold"
                    >
                      Átlók: {showDiagonals ? 'BE' : 'KI'}
                    </Button>
                    <Button
                      size="sm"
                      variant={showAngles ? "default" : "outline"}
                      onClick={() => setShowAngles(!showAngles)}
                      className="text-xs h-7 font-bold"
                    >
                      Belső szögek: {showAngles ? 'BE' : 'KI'}
                    </Button>
                  </div>
                </div>

                {/* SVG canvas */}
                <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner overflow-hidden min-h-[210px]">
                  <svg className="w-full max-w-xs h-48 mx-auto select-none" viewBox="0 0 240 200" fill="none">
                    {/* Háttér kör */}
                    <circle cx={pcx} cy={pcy} r={pr} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                    {/* Sokszög kitöltése és kerete */}
                    <path d={polygonPath} fill="#ccfbf1" fillOpacity="0.7" stroke="#0f766e" strokeWidth="2.5" />

                    {/* Átlók kirajzolása */}
                    {showDiagonals && diagonals.map((d, idx) => (
                      <line
                        key={idx}
                        x1={d.x1}
                        y1={d.y1}
                        x2={d.x2}
                        y2={d.y2}
                        stroke="#6366f1"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                        opacity="0.8"
                      />
                    ))}

                    {/* Csúcsok és betűk */}
                    {vertices.map((v, idx) => (
                      <g key={idx}>
                        <circle cx={v.x} cy={v.y} r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                        <text
                          x={v.x + (v.x - pcx) * 0.22}
                          y={v.y + (v.y - pcy) * 0.22 + 4}
                          textAnchor="middle"
                          className="text-[11px] font-black fill-slate-800 dark:fill-slate-100"
                        >
                          {v.name}
                        </text>
                      </g>
                    ))}

                    {/* Középső felirat */}
                    <text x={pcx} y={pcy + 4} textAnchor="middle" className="text-[12px] font-black fill-teal-900 dark:fill-teal-200">
                      {polyInfo.name}
                    </text>
                  </svg>
                </div>

                {/* Oldalszám állító csúszka */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>3 (Háromszög)</span>
                    <span className="text-teal-700 dark:text-teal-400 font-black">
                      Oldalak száma (n): {sides}
                    </span>
                    <span>8 (Nyolcszög)</span>
                  </div>
                  <Slider
                    value={[sides]}
                    min={3}
                    max={8}
                    step={1}
                    onValueChange={(val) => setSides(val[0])}
                    className="py-1"
                  />
                </div>

                {/* Élő számítások kártyái */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Belső szögek összege</span>
                    <span className="text-base font-black text-teal-700 dark:text-teal-300 block mt-0.5">
                      {polyInfo.sum}°
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">({sides} - 2) × 180° = {polyInfo.sum}°</p>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Összes átló száma</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400 block mt-0.5">
                      {polyInfo.diags} darab
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">{sides} × ({sides} - 3) : 2 = {polyInfo.diags}</p>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Szabályos belső szög</span>
                    <span className="text-base font-black text-amber-600 dark:text-amber-400 block mt-0.5">
                      {polyInfo.regAngle.toFixed(1)}°
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">{polyInfo.sum}° : {sides} = {polyInfo.regAngle.toFixed(1)}°</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HÁROMSZÖGEK */}
            {activeTab === 'triangle' && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {[
                    { id: 'equilateral', label: 'Szabályos (egyenlő oldalú)' },
                    { id: 'isosceles', label: 'Egyenlő szárú' },
                    { id: 'right', label: 'Derékszögű' },
                    { id: 'obtuse', label: 'Tompaszögű' },
                    { id: 'scalene', label: 'Általános' }
                  ].map((t) => (
                    <Button
                      key={t.id}
                      size="sm"
                      variant={triangleType === t.id ? "default" : "outline"}
                      onClick={() => setTriangleType(t.id as any)}
                      className={cn("text-xs h-7 font-bold", triangleType === t.id ? "bg-teal-600 text-white" : "")}
                    >
                      {t.label}
                    </Button>
                  ))}
                </div>

                {/* SVG canvas */}
                <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner overflow-hidden min-h-[200px]">
                  {triangleType === 'equilateral' && (
                    <svg className="w-48 h-40 mx-auto select-none" viewBox="0 0 160 130">
                      <polygon points="80,18 25,110 135,110" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />
                      {/* Oldal egyenlőség jelzések (1 vonás mindegyiken) */}
                      <line x1="49" y1="61" x2="56" y2="67" stroke="#0f766e" strokeWidth="2" />
                      <line x1="104" y1="61" x2="111" y2="67" stroke="#0f766e" strokeWidth="2" />
                      <line x1="77" y1="106" x2="77" y2="114" stroke="#0f766e" strokeWidth="2" />
                      <text x="80" y="80" textAnchor="middle" className="text-[11px] font-black fill-teal-900">a = b = c</text>
                      <text x="80" y="96" textAnchor="middle" className="text-[10px] font-bold fill-teal-700">Minden szöge: 60°</text>
                    </svg>
                  )}

                  {triangleType === 'isosceles' && (
                    <svg className="w-48 h-40 mx-auto select-none" viewBox="0 0 160 130">
                      <polygon points="80,15 35,112 125,112" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2.5" />
                      {/* 2 szár jelölése */}
                      <line x1="54" y1="61" x2="61" y2="66" stroke="#4338ca" strokeWidth="2" />
                      <line x1="99" y1="61" x2="106" y2="66" stroke="#4338ca" strokeWidth="2" />
                      <text x="80" y="70" textAnchor="middle" className="text-[11px] font-black fill-indigo-950">a = b (szárak)</text>
                      <text x="80" y="86" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">Alapon fekvő szögek =</text>
                    </svg>
                  )}

                  {triangleType === 'right' && (
                    <svg className="w-48 h-40 mx-auto select-none" viewBox="0 0 160 130">
                      <polygon points="35,20 35,110 135,110" fill="#d1fae5" stroke="#059669" strokeWidth="2.5" />
                      {/* Magyar derékszög jelölés: negyedkörív + pont */}
                      <path d="M 47 110 A 12 12 0 0 0 35 98" fill="none" stroke="#047857" strokeWidth="1.8" />
                      <circle cx="41" cy="104" r="1.5" fill="#047857" />
                      <text x="42" y="65" className="text-[10px] font-bold fill-emerald-800">befogó (a)</text>
                      <text x="80" y="122" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">befogó (b)</text>
                      <text x="95" y="60" className="text-[10px] font-black fill-emerald-900">átfogó (c)</text>
                    </svg>
                  )}

                  {triangleType === 'obtuse' && (
                    <svg className="w-52 h-40 mx-auto select-none" viewBox="0 0 180 130">
                      <polygon points="50,45 20,110 160,110" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
                      {/* Tompaszög ív */}
                      <path d="M 33 95 A 20 20 0 0 0 42 110" stroke="#ea580c" strokeWidth="2" fill="none" />
                      <text x="80" y="85" textAnchor="middle" className="text-[11px] font-black fill-orange-950">1 tompaszög (&gt; 90°)</text>
                      <text x="80" y="100" textAnchor="middle" className="text-[10px] font-bold fill-orange-700">2 hegyesszög (&lt; 90°)</text>
                    </svg>
                  )}

                  {triangleType === 'scalene' && (
                    <svg className="w-52 h-40 mx-auto select-none" viewBox="0 0 180 130">
                      <polygon points="65,22 25,110 155,110" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
                      <text x="90" y="70" textAnchor="middle" className="text-[11px] font-black fill-amber-950">a ≠ b ≠ c</text>
                      <text x="90" y="86" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">Minden oldala és szöge különböző</text>
                    </svg>
                  )}
                </div>

                <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-teal-700 dark:text-teal-300">Belső szögek összege minden háromszögben: </strong>
                  <MathText>{'\\alpha + \\beta + \\gamma = 180^\\circ'}</MathText>. Nincs olyan háromszög, aminek 2 derékszöge vagy 2 tompaszöge lenne!
                </div>
              </div>
            )}

            {/* TAB 3: KÖR ÉS RÉSZEI */}
            {activeTab === 'circle' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant={showRadius ? "default" : "outline"}
                    onClick={() => setShowRadius(!showRadius)}
                    className="text-xs h-7 font-bold"
                  >
                    Sugár (r): {showRadius ? 'BE' : 'KI'}
                  </Button>
                  <Button
                    size="sm"
                    variant={showDiameter ? "default" : "outline"}
                    onClick={() => setShowDiameter(!showDiameter)}
                    className="text-xs h-7 font-bold"
                  >
                    Átmérő (d = 2r): {showDiameter ? 'BE' : 'KI'}
                  </Button>
                  <Button
                    size="sm"
                    variant={showChord ? "default" : "outline"}
                    onClick={() => setShowChord(!showChord)}
                    className="text-xs h-7 font-bold"
                  >
                    Húr: {showChord ? 'BE' : 'KI'}
                  </Button>
                  <Button
                    size="sm"
                    variant={showSector ? "default" : "outline"}
                    onClick={() => setShowSector(!showSector)}
                    className="text-xs h-7 font-bold"
                  >
                    Körcikk: {showSector ? 'BE' : 'KI'}
                  </Button>
                </div>

                {/* SVG canvas */}
                <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner overflow-hidden min-h-[210px]">
                  <svg className="w-full max-w-xs h-48 mx-auto select-none" viewBox="0 0 240 190" fill="none">
                    {/* Alap körlap */}
                    <circle cx="120" cy="95" r="70" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />

                    {/* Körcikk (ha be van kapcsolva) */}
                    {showSector && (
                      <path
                        d="M 120 95 L 190 95 A 70 70 0 0 0 169 45 Z"
                        fill="#bbf7d0"
                        stroke="#15803d"
                        strokeWidth="1.8"
                      />
                    )}

                    {/* Átmérő d (bal széltől jobb szélig át a középponton) */}
                    {showDiameter && (
                      <g>
                        <line x1="50" y1="95" x2="190" y2="95" stroke="#2563eb" strokeWidth="2.5" />
                        <circle cx="50" cy="95" r="3" fill="#1d4ed8" />
                        <circle cx="190" cy="95" r="3" fill="#1d4ed8" />
                        <text x="80" y="88" className="text-[11px] font-black fill-blue-700">d = 2r (átmérő)</text>
                      </g>
                    )}

                    {/* Sugár r (felfelé jobbra) */}
                    {showRadius && (
                      <g>
                        <line x1="120" y1="95" x2="169" y2="45" stroke="#ea580c" strokeWidth="2.5" />
                        <circle cx="169" cy="45" r="3" fill="#c2410c" />
                        <text x="146" y="65" className="text-[11px] font-black fill-orange-700">r (sugár)</text>
                      </g>
                    )}

                    {/* Húr (két pontot köt össze nem át a középponton) */}
                    {showChord && (
                      <g>
                        <line x1="65" y1="135" x2="160" y2="152" stroke="#9333ea" strokeWidth="2" strokeDasharray="3 2" />
                        <circle cx="65" cy="135" r="3" fill="#7e22ce" />
                        <circle cx="160" cy="152" r="3" fill="#7e22ce" />
                        <text x="110" y="142" textAnchor="middle" className="text-[11px] font-bold fill-purple-700">húr</text>
                      </g>
                    )}

                    {/* Középpont O */}
                    <circle cx="120" cy="95" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="120" y="112" textAnchor="middle" className="text-[12px] font-black fill-rose-600">O (középpont)</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-blue-700 block mb-0.5">Átmérő összefüggése:</strong>
                    <MathText>{'d = 2 \\cdot r \\quad \\Longleftrightarrow \\quad r = \\frac{d}{2}'}</MathText>
                    <p className="text-[11px] text-slate-500 mt-1">Az átmérő a kör leghosszabb húrja.</p>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-emerald-700 block mb-0.5">Körvonal vs. Körlap:</strong>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      A <strong>körvonal</strong> a határoló 1D görbe vonal. A <strong>körlap</strong> a körvonal által bezárt 2D síkrész!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: SOKSZÖGEK CSOPORTOSÍTÁSA ÉS ÁTLÓI */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-polygons-types"
        number={3}
        title="Sokszögek rendszerezése oldalszám szerint"
        badge="Sokszögtan"
        badgeColor="teal"
      >
        <TheoryCard
          title="A sokszögek elnevezése és matematikai képletei"
          subtitle="Háromszögtől a nyolcszögig: oldalak, csúcsok, átlók és belső szögek"
          themeColor="teal"
        >
          <GeometryFigureGrid columns={3}>
            {/* 1. Háromszög */}
            <GeometryFigureCard
              title="Háromszög (3-szög)"
              subtitle="A legkisebb oldalszámú sokszög"
              badge="3 oldal • 0 átló"
              badgeColor="amber"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="27,6 8,30 46,30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <circle cx="27" cy="6" r="2" fill="#b45309" />
                  <circle cx="8" cy="30" r="2" fill="#b45309" />
                  <circle cx="46" cy="30" r="2" fill="#b45309" />
                  <text x="27" y="24" textAnchor="middle" className="text-[8.5px] font-black fill-amber-800">180°</text>
                </svg>
              }
              properties={[
                { label: 'Oldalak / Csúcsok', value: '3 oldal, 3 csúcs' },
                { label: 'Átlók száma', value: '0 átló (nincs nem szomszédos csúcs)' },
                { label: 'Belső szögek összege', value: '180°' }
              ]}
              caption="A geometria legmerevebb, legstabilabb építőköve."
            />

            {/* 2. Négyszög */}
            <GeometryFigureCard
              title="Négyszög (4-szög)"
              subtitle="Két háromszögre bontható"
              badge="4 oldal • 2 átló"
              badgeColor="blue"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="12,8 44,6 40,30 10,28" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                  <line x1="12" y1="8" x2="40" y2="30" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="44" y1="6" x2="10" y2="28" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="27" y="21" textAnchor="middle" className="text-[8.5px] font-black fill-blue-800">360°</text>
                </svg>
              }
              properties={[
                { label: 'Oldalak / Csúcsok', value: '4 oldal, 4 csúcs' },
                { label: 'Átlók száma', value: '2 átló (metszik egymást)' },
                { label: 'Belső szögek összege', value: '360° (2 × 180°)' }
              ]}
              caption="Példa: négyzet, téglalap, trapéz, rombusz."
            />

            {/* 3. Ötszög */}
            <GeometryFigureCard
              title="Ötszög (Pentagon)"
              subtitle="5 oldalú sokszög"
              badge="5 oldal • 5 átló"
              badgeColor="teal"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="27,4 47,15 40,32 14,32 7,15" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
                  <line x1="27" y1="4" x2="40" y2="32" stroke="#6366f1" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                  <line x1="27" y1="4" x2="14" y2="32" stroke="#6366f1" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                  <text x="27" y="22" textAnchor="middle" className="text-[8.5px] font-black fill-teal-800">540°</text>
                </svg>
              }
              properties={[
                { label: 'Oldalak / Csúcsok', value: '5 oldal, 5 csúcs' },
                { label: 'Átlók száma', value: '5 átló (ötágú csillagot formálnak)' },
                { label: 'Belső szögek összege', value: '540° (3 × 180°)' }
              ]}
              caption="A Pentagon épülete, focilabda fekete foltjai."
            />

            {/* 4. Hatszög */}
            <GeometryFigureCard
              title="Hatszög (Hexagon)"
              subtitle="Természetben leggyakoribb"
              badge="6 oldal • 9 átló"
              badgeColor="emerald"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="18,4 36,4 46,18 36,32 18,32 8,18" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
                  <text x="27" y="20" textAnchor="middle" className="text-[8.5px] font-black fill-emerald-800">720°</text>
                </svg>
              }
              properties={[
                { label: 'Oldalak / Csúcsok', value: '6 oldal, 6 csúcs' },
                { label: 'Átlók száma', value: '9 átló' },
                { label: 'Belső szögek összege', value: '720° (4 × 180°)' }
              ]}
              caption="Méhsejtek formája, hópelyhek alapszerkezete."
            />

            {/* 5. Nyolcszög */}
            <GeometryFigureCard
              title="Nyolcszög (Oktogon)"
              subtitle="8 oldalú sokszög"
              badge="8 oldal • 20 átló"
              badgeColor="rose"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="17,4 37,4 47,14 47,22 37,32 17,32 7,22 7,14" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                  <text x="27" y="20" textAnchor="middle" className="text-[8.5px] font-black fill-rose-800">1080°</text>
                </svg>
              }
              properties={[
                { label: 'Oldalak / Csúcsok', value: '8 oldal, 8 csúcs' },
                { label: 'Átlók száma', value: '20 átló' },
                { label: 'Belső szögek összege', value: '1080° (6 × 180°)' }
              ]}
              caption="STOP közlekedési tábla alakja, budapesti Oktogon."
            />

            {/* 6. Szabályos sokszög */}
            <GeometryFigureCard
              title="Szabályos sokszögek"
              subtitle="Tökéletes szimmetria"
              badge="Egyenlő oldalak & szögek"
              badgeColor="purple"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <circle cx="27" cy="18" r="14" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                  <polygon points="27,4 41,18 27,32 13,18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
                </svg>
              }
              properties={[
                { label: 'Minden oldala', value: 'Egyenlő hosszú' },
                { label: 'Minden belső szöge', value: 'Egyenlő nagyságú' },
                { label: 'Szimmetria', value: 'n darab szimmetriatengelye van' }
              ]}
              caption="Körbe és köré is írható szabályos kör."
            />
          </GeometryFigureGrid>

          <TheoryTable
            title="Összefoglaló képlettár n-oldalú sokszögekre"
            columns={['Sokszög neve', 'Oldalak (n)', '1 csúcsból induló átlók (n-3)', 'Összes átló száma [n(n-3):2]', 'Belső szögek összege [(n-2)·180°]']}
            rows={[
              ['Háromszög', '3', '0', '0', '180°'],
              ['Négyszög', '4', '1', '2', '360°'],
              ['Ötszög', '5', '2', '5', '540°'],
              ['Hatszög', '6', '3', '9', '720°'],
              ['Hétszög', '7', '4', '14', '900°'],
              ['Nyolcszög', '8', '5', '20', '1080°'],
              ['n-szög általánosan', 'n', 'n - 3', 'n · (n - 3) : 2', '(n - 2) · 180°']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: HÁROMSZÖGEK KETTŐS OSZTÁLYOZÁSA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-triangles-classification"
        number={4}
        title="Háromszögek kettős osztályozása (Oldalak és szögek szerint)"
        badge="Háromszögek"
        badgeColor="amber"
      >
        <TheoryCard
          title="Hogyan csoportosítjuk a háromszögeket a geometriában?"
          subtitle="A háromszögeket mindig két független szempont szerint sorolhatjuk be!"
          themeColor="amber"
          icon={<Triangle className="w-5 h-5 text-amber-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* 1. Csoportosítás oldalak szerint */}
            <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-2 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-600" />
                1. Oldalaik hossza szerint
              </h4>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <li className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50">
                  <strong className="text-amber-800 dark:text-amber-300">Egyenlő oldalú (szabályos):</strong>
                  <br />Mindhárom oldala egyenlő (<MathText>{'a = b = c'}</MathText>). Minden szöge <MathText>{'60^\\circ'}</MathText>. 3 szimmetriatengely.
                </li>
                <li className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50">
                  <strong className="text-amber-800 dark:text-amber-300">Egyenlő szárú:</strong>
                  <br />Legalább két oldala egyenlő hosszúságú (szárak: <MathText>{'a = b'}</MathText>). Az alapon fekvő két szög egyenlő. 1 szimmetriatengely.
                </li>
                <li className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50">
                  <strong className="text-amber-800 dark:text-amber-300">Általános (különböző oldalú):</strong>
                  <br />Mindhárom oldala különböző hosszúságú (<MathText>{'a \\ne b \\ne c'}</MathText>). Nincs szimmetriatengelye.
                </li>
              </ul>
            </div>

            {/* 2. Csoportosítás szögek szerint */}
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                2. Belső szögeik nagysága szerint
              </h4>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <li className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50">
                  <strong className="text-emerald-800 dark:text-emerald-300">Hegyesszögű háromszög:</strong>
                  <br />Mindhárom belső szöge hegyesszög (<MathText>{'< 90^\\circ'}</MathText>). Pl. 60°-60°-60°, 40°-70°-70°.
                </li>
                <li className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50">
                  <strong className="text-emerald-800 dark:text-emerald-300">Derékszögű háromszög:</strong>
                  <br />Pontosan 1 derékszöge (<MathText>{'90^\\circ'}</MathText>) van. Oldalai: két befogó és a derékszöggel szemközti átfogó.
                </li>
                <li className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50">
                  <strong className="text-emerald-800 dark:text-emerald-300">Tompaszögű háromszög:</strong>
                  <br />Pontosan 1 tompaszöge (<MathText>{'> 90^\\circ'}</MathText>) van. A másik két szöge szükségképpen hegyesszög.
                </li>
              </ul>
            </div>
          </div>

          <TheoryCallout variant="tip" title="A háromszög-egyenlőtlenség: Mikor szerkeszthető egy háromszög?">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Három szakaszból csak akkor lehet háromszöget építeni, ha <strong>bármely két oldal összege nagyobb a harmadiknál</strong>:
              <br />
              <span className="font-bold text-teal-800 dark:text-teal-200 block my-1">
                <MathText>{'a + b > c, \\quad a + c > b, \\quad b + c > a'}</MathText>
              </span>
              <em>Gyakorlati trükk:</em> Elég a <strong>két rövidebb oldal összegét</strong> összehasonlítani a leghosszabb oldallal! Ha a két kisebb összege nagyobb a legnagyobbnál, a háromszög létezik (pl. 3 cm, 4 cm, 5 cm esetén <MathText>{'3 + 4 = 7 > 5'}</MathText> ✓). De 2 cm, 3 cm, 6 cm-ből nem lehet (<MathText>{'2 + 3 = 5 < 6'}</MathText> ✗, a két szakasz nem ér össze!).
            </p>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: NÉGYSZÖGEK VILÁGA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-polygons-quads"
        number={5}
        title="A nevezetes négyszögek tulajdonságai"
        badge="Négyszögek"
        badgeColor="blue"
      >
        <TheoryCard
          title="Négyzet, téglalap, rombusz, paralelogramma, trapéz és deltoid"
          subtitle="Párhuzamos és merőleges oldalak, belső szögek összege mindig 360°"
          themeColor="blue"
          icon={<Square className="w-5 h-5 text-blue-600" />}
        >
          <GeometryFigureGrid columns={3}>
            {/* Négyzet */}
            <GeometryFigureCard
              title="Négyzet"
              subtitle="Szabályos négyszög"
              badge="4 egyenlő oldal • 4 derékszög"
              badgeColor="emerald"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <rect x="14" y="5" width="26" height="26" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
                  {/* Magyar derékszög jelölés a sarokban: negyedkörív + pont */}
                  <path d="M 22 31 A 8 8 0 0 0 14 23" fill="none" stroke="#047857" strokeWidth="1.2" />
                  <circle cx="18" cy="27" r="1" fill="#047857" />
                </svg>
              }
              properties={[
                { label: 'Oldalak', value: '4 egyenlő oldal (a = a)' },
                { label: 'Szögek', value: '4 derékszög (mind 90°)' },
                { label: 'Átlók', value: 'Egyenlők, felezik egymást, merőlegesek' }
              ]}
              caption="4 szimmetriatengelye van (2 oldalfelező + 2 átló)."
            />

            {/* Téglalap */}
            <GeometryFigureCard
              title="Téglalap"
              subtitle="Derékszögű négyszög"
              badge="Szemközti oldalak egyenlők"
              badgeColor="blue"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <rect x="9" y="8" width="36" height="20" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                  {/* Magyar derékszög sarokjelölés */}
                  <path d="M 17 28 A 8 8 0 0 0 9 20" fill="none" stroke="#1d4ed8" strokeWidth="1.2" />
                  <circle cx="13" cy="24" r="1" fill="#1d4ed8" />
                </svg>
              }
              properties={[
                { label: 'Oldalak', value: 'Szemközti oldalak párhuzamosak és egyenlők' },
                { label: 'Szögek', value: '4 derékszög (mind 90°)' },
                { label: 'Átlók', value: 'Egyenlő hosszúak, felezik egymást' }
              ]}
              caption="2 szimmetriatengelye van (az oldalfelező merőlegesek)."
            />

            {/* Rombusz */}
            <GeometryFigureCard
              title="Rombusz"
              subtitle="Egyenlő oldalú ferde négyszög"
              badge="4 egyenlő oldal"
              badgeColor="amber"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="27,4 45,18 27,32 9,18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <line x1="27" y1="4" x2="27" y2="32" stroke="#b45309" strokeWidth="1" strokeDasharray="1.5 1.5" />
                  <line x1="9" y1="18" x2="45" y2="18" stroke="#b45309" strokeWidth="1" strokeDasharray="1.5 1.5" />
                </svg>
              }
              properties={[
                { label: 'Oldalak', value: 'Mind a 4 oldala egyenlő (a = b = c = d)' },
                { label: 'Szögek', value: 'Szemközti szögei egyenlők (2 hegyes, 2 tompa)' },
                { label: 'Átlók', value: 'Merőlegesen felezik egymást és szögfelezők' }
              ]}
              caption="2 szimmetriatengelye van (az átlói)."
            />

            {/* Paralelogramma */}
            <GeometryFigureCard
              title="Paralelogramma"
              subtitle="Két pár párhuzamos oldal"
              badge="Középpontosan szimmetrikus"
              badgeColor="teal"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="16,8 46,8 38,28 8,28" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
                </svg>
              }
              properties={[
                { label: 'Oldalak', value: 'Szemközti oldalai párhuzamosak és egyenlők' },
                { label: 'Szögek', value: 'Szemközti szögei egyenlők' },
                { label: 'Átlók', value: 'Felezik egymást' }
              ]}
              caption="Nincs szimmetriatengelye (kivéve speciális eseteit: téglalap, rombusz)."
            />

            {/* Trapéz */}
            <GeometryFigureCard
              title="Trapéz"
              subtitle="Egy pár párhuzamos oldal"
              badge="Alapok párhuzamosak"
              badgeColor="purple"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="16,8 38,8 46,28 8,28" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
                </svg>
              }
              properties={[
                { label: 'Oldalak', value: 'Legalább egy pár párhuzamos oldala van (alapok)' },
                { label: 'Szárak', value: 'A nem párhuzamos oldalak a szárak' },
                { label: 'Egyenlő szárú trapéz', value: 'Húrtrapéz: szárai egyenlők, tengelyesen szimmetrikus' }
              ]}
              caption="Példa: hegytető, virágcserép profilja."
            />

            {/* Deltoid */}
            <GeometryFigureCard
              title="Deltoid"
              subtitle="Papírsárkány alakzat"
              badge="2-2 szomszédos oldal egyenlő"
              badgeColor="rose"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <polygon points="27,4 42,14 27,32 12,14" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                  <line x1="27" y1="4" x2="27" y2="32" stroke="#be123c" strokeWidth="1" strokeDasharray="1.5 1.5" />
                  <line x1="12" y1="14" x2="42" y2="14" stroke="#be123c" strokeWidth="1" strokeDasharray="1.5 1.5" />
                </svg>
              }
              properties={[
                { label: 'Oldalak', value: 'Két-két szomszédos oldala egyenlő' },
                { label: 'Átlók', value: 'Merőlegesek egymásra, a szimmetriaátló felezi a másikat' },
                { label: 'Szimmetria', value: '1 szimmetriatengelye van (a hosszabbik átló)' }
              ]}
              caption="Példa: kerti papírsárkány."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 6. SZEKCIÓ: A KÖR ÉS RÉSZEI */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-polygons-circle"
        number={6}
        title="A kör és geometriai alkotóelemei"
        badge="A Kör"
        badgeColor="teal"
      >
        <TheoryCard
          title="A legtökéletesebb síkidom: A kör anatómiája"
          subtitle="Pontok halmaza, amelyek egyenlő távolságra vannak a középponttól"
          themeColor="teal"
          icon={<Circle className="w-5 h-5 text-teal-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 text-xs block mb-1">Középpont (O):</strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A kör szimmetriaközéppontja, ahová a körző hegyét szúrjuk.
              </p>
            </div>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 text-xs block mb-1">Sugár (r - rádiusz):</strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A középpontot a körvonal bármely pontjával összekötő szakasz.
              </p>
            </div>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 text-xs block mb-1">Átmérő (d = 2r):</strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A középponton átmenő szakasz. Pontosan a sugár kétszerese: <MathText>{'d = 2r'}</MathText>.
              </p>
            </div>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 text-xs block mb-1">Húr:</strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A körvonal két tetszőleges pontját összekötő belső szakasz. A leghosszabb húr az átmérő!
              </p>
            </div>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 text-xs block mb-1">Körcikk (Pizzaszelet):</strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Két sugár és az általuk közrefogott körív által határolt síkrész.
              </p>
            </div>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 text-xs block mb-1">Körszelet:</strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Egy húr és a hozzá tartozó körív által levágott síkrész.
              </p>
            </div>
          </div>

          <TheoryCallout variant="tip" title="Hogyan szerkesztünk pontos kört körzővel?">
            <ol className="text-xs space-y-1 list-decimal list-inside text-slate-700 dark:text-slate-300">
              <li>Jelöld ki ceruzával az <strong>O középpontot</strong> egy kis kereszttel vagy ponttal!</li>
              <li>Állítsd be a vonalzó segítségével a körzőnyílást a megadott <strong>sugárra (<MathText>{'r'}</MathText>)</strong>! <em>(Vigyázat: ha átmérő van megadva, előbb oszd el 2-vel!)</em></li>
              <li>Szúrd a körző hegyét szilárdan az <MathText>{'O'}</MathText> pontba, és a körző felső fogantyúját forgatva rajzold meg a sima, egyenletes körvonalat!</li>
            </ol>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 7. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-polygons-traps"
        number={7}
        title="Gyakori tévhitek és csapdák a síkidomoknál"
        badge="Mire figyelj nagyon?"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="Gyakori csapdák & tipikus vizsgahibák a síkidomok témakörében"
          traps={[
            {
              title: '1. Csapda: Körvonal és körlap összekeverése',
              wrong: 'Azt mondani, hogy a körnek van területe, a körlapnak pedig kerülete van csak.',
              correct: 'A KÖRVONAL egy 1 dimenziós vonal (hossza van: kerület), míg a KÖRLAP egy 2 dimenziós síkidom (kiterjedése van: terület)!',
              explanation: 'A hulahoppkarika a körvonal modellje, a kerek kistányér pedig a körlapé.'
            },
            {
              title: '2. Csapda: Sugár és átmérő összetévesztése',
              wrong: 'Ha a feladat 6 cm átmérőjű kört kér, 6 cm-es körzőnyílást venni.',
              correct: 'A körzőbe mindig a SUGARAT kell venni! Ha d = 6 cm, akkor r = 6 : 2 = 3 cm!',
              explanation: 'A 6 cm-es nyílással 12 cm átmérőjű, azaz kétszer akkora kör készülne.'
            },
            {
              title: '3. Csapda: A háromszög átlóinak a száma',
              wrong: 'Azt hinni, hogy a háromszögnek is van legalább 1 átlója.',
              correct: 'A háromszögnek PONTOSAN 0 ÁTLÓJA van! Minden csúcsa szomszédos az összes többi csúccsal, így nincs hová átlót húzni (n - 3 = 3 - 3 = 0).',
              explanation: 'Az átló definíció szerint két NEM szomszédos csúcsot köt össze.'
            },
            {
              title: '4. Csapda: „Minden rombusz négyzet” tévhit',
              wrong: 'Azt gondolni, hogy a rombusz és a négyzet ugyanaz.',
              correct: 'Minden négyzet rombusz (mert 4 egyenlő oldala van), DE NEM minden rombusz négyzet! A rombusznak csak akkor derékszögűek a sarkai, ha négyzet.',
              explanation: 'A négyzet egy speciális rombusz, amelynek szögei 90°-osak.'
            },
            {
              title: '5. Csapda: A háromszög belső szögeinek összege',
              wrong: 'Azt hinni, hogy egy nagy háromszög belső szögeinek összege nagyobb, mint egy kicsié.',
              correct: 'BÁRMILYEN méretű és alakú háromszög belső szögeinek összege PONTOSAN 180°!',
              explanation: 'Akár gombostűhegynyi, akár kontinensnyi méretű háromszögről van szó, α + β + γ = 180° mindig érvényes a síkban.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PolygonsTheory;
