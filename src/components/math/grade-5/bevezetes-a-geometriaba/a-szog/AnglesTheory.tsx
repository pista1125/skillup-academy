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
  Compass,
  Clock,
  Shapes,
  CircleDot,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  ArrowRight,
  Sparkles,
  Ruler,
  Sliders,
  RotateCcw,
  Eye,
  EyeOff,
  Dices
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AnglesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const AnglesTheory: React.FC<AnglesTheoryProps> = ({ onBack, onStartQuiz }) => {
  // ========================================================
  // INTERAKTÍV SZÖG MODELL ÁLLAPOTAI
  // ========================================================
  const [angle, setAngle] = useState<number>(60);
  const [showProtractor, setShowProtractor] = useState<boolean>(true);
  const [showClockEquivalent, setShowClockEquivalent] = useState<boolean>(false);

  // Szög geometriai számításai (középpont: 160, 150)
  const cx = 160;
  const cy = 150;
  const rayLength = 120;
  const rad = (angle * Math.PI) / 180;
  const ray2X = cx + rayLength * Math.cos(rad);
  const ray2Y = cy - rayLength * Math.sin(rad);

  // Szögív pontjai
  const arcRadius = 45;
  const arcEndX = cx + arcRadius * Math.cos(rad);
  const arcEndY = cy - arcRadius * Math.sin(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;

  // Szögfajta megállapítása
  let angleType = '';
  let angleTheme = 'amber';
  let badgeColorClass = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700';
  let strokeColor = '#f59e0b';
  let fillColor = '#fef3c7';
  let angleDescription = '';

  if (angle === 0) {
    angleType = 'Nullszög';
    angleTheme = 'slate';
    badgeColorClass = 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200';
    strokeColor = '#64748b';
    fillColor = '#f1f5f9';
    angleDescription = 'A két szögszár pontosan fedi egymást, nincs nyílás közöttük (0°).';
  } else if (angle < 90) {
    angleType = 'Hegyesszög';
    angleTheme = 'amber';
    badgeColorClass = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700';
    strokeColor = '#f59e0b';
    fillColor = '#fef3c7';
    angleDescription = `Kisebb a derékszögnél (${angle}° < 90°). Hegyben végződő, szűk szögtartomány.`;
  } else if (angle === 90) {
    angleType = 'Derékszög';
    angleTheme = 'emerald';
    badgeColorClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700';
    strokeColor = '#10b981';
    fillColor = '#d1fae5';
    angleDescription = 'Pontosan 90°-os szög. A két szögszár merőleges egymásra (a ⊥ b).';
  } else if (angle < 180) {
    angleType = 'Tompaszög';
    angleTheme = 'blue';
    badgeColorClass = 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-700';
    strokeColor = '#3b82f6';
    fillColor = '#dbeafe';
    angleDescription = `Nagyobb a derékszögnél, de kisebb az egyenesszögnél (90° < ${angle}° < 180°).`;
  } else if (angle === 180) {
    angleType = 'Egyenesszög';
    angleTheme = 'purple';
    badgeColorClass = 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-700';
    strokeColor = '#8b5cf6';
    fillColor = '#ede9fe';
    angleDescription = 'Pontosan 180°-os szög. A két szár egyetlen egyenes két ellentétes félegyenese (fél fordulat).';
  } else if (angle < 360) {
    angleType = 'Homorúszög';
    angleTheme = 'rose';
    badgeColorClass = 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-700';
    strokeColor = '#ec4899';
    fillColor = '#ffe4e6';
    angleDescription = `Nagyobb az egyenesszögnél (180° < ${angle}° < 360°). Kívülről öleli körbe a szárakat.`;
  } else {
    angleType = 'Teljesszög';
    angleTheme = 'teal';
    badgeColorClass = 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/70 dark:text-teal-300 dark:border-teal-700';
    strokeColor = '#06b6d4';
    fillColor = '#cffafe';
    angleDescription = 'Pontosan 360°-os szög. Egy teljes körbefordulás a szögcsúcs körül.';
  }

  // Nevezetes gyorsbeállító gombok
  const PRESETS = [
    { label: '0°', val: 0, tip: 'Nullszög' },
    { label: '30°', val: 30, tip: '1 óraköz' },
    { label: '45°', val: 45, tip: 'Fél derékszög' },
    { label: '60°', val: 60, tip: 'Szabályos 3-szög' },
    { label: '90°', val: 90, tip: 'Derékszög' },
    { label: '120°', val: 120, tip: 'Tompaszög' },
    { label: '135°', val: 135, tip: 'Tompaszög' },
    { label: '150°', val: 150, tip: '5 óraköz' },
    { label: '180°', val: 180, tip: 'Egyenesszög' },
    { label: '270°', val: 270, tip: '3/4 fordulat' },
    { label: '360°', val: 360, tip: 'Teljesszög' }
  ];

  const handleRandomAngle = () => {
    const randomVals = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 210, 240, 270, 300, 315, 330];
    const picked = randomVals[Math.floor(Math.random() * randomVals.length)];
    setAngle(picked);
  };

  return (
    <TheoryTemplate
      title="4. A szög"
      subtitle="A szög fogalma, alkotóelemei, szögfajták 0°-tól 360°-ig, szögmérés szögmérővel, óralap-feladatok és szögpárok"
      documentId="g5-geom-angles-theory-content"
      pdfFilename="5_osztaly_III_geometria_4_a_szog_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="amber"
      badgeText="📐 5. Osztály • III. Bevezetés a geometriába"
      quickRule={{
        label: "Szögek alapszabályai",
        formula: "Hegyesszög (< 90°) • Derékszög (90°) • Tompaszög (90°-180°) • Egyenesszög (180°) • Óraköz = 30°"
      }}
      practiceTitle="Készen állsz a szögek és a szögmérés gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: A SZÖG FOGALMA, RÉSZEI ÉS JELÖLÉSE */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-basics"
        number={1}
        title="A szög fogalma, alkotóelemei és jelölése"
        badge="Alapfogalmak"
        badgeColor="amber"
      >
        <TheoryCard
          title="Mi a szög a geometriában?"
          subtitle="Egy közös kezdőpontból kiinduló két félegyenes és az általuk határolt szögtartomány"
          themeColor="amber"
          icon={<Compass className="w-5 h-5 text-amber-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-xs sm:text-sm">
            Ha a síkon egy pontból kiindítunk két különböző félegyenest, azok a síkot <strong>két részre (szögtartományra)</strong> osztják. Magát a két félegyenest és az általuk közrefogott szögtartományt együttesen <strong>szögnek</strong> nevezzük.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">Szögcsúcs (O vagy V)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A két határoló félegyenes <strong>közös kezdőpontja</strong>. Mindig nyomtatott nagybetűvel jelöljük (<MathText>{'O, V, P'}</MathText>).
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-1 rounded-full bg-amber-600 inline-block" />
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">Szögszárak (a, b)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A szögcsúcsból kiinduló <strong>két félegyenes</strong>. Kisbetűvel (<MathText>{'a, b'}</MathText>) vagy a szárak pontjaival (<MathText>{'OA, OB'}</MathText>) jelöljük.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">Szögtartomány</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A sík szárak közé eső része. A két szár egy kisebb (<strong>domború</strong>, <MathText>{'\\le 180^\\circ'}</MathText>) és egy nagyobb (<strong>homorú</strong>, <MathText>{'> 180^\\circ'}</MathText>) tartományt határol el.
              </p>
            </div>
          </div>

          {/* Szemléltető ábra a szög részeiről */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 text-center">
              A szög részei és íves jelölése a síkban
            </h4>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              <svg className="w-56 h-36 sm:w-64 sm:h-40 drop-shadow-sm select-none" viewBox="0 0 250 130" fill="none">
                {/* Belső domború tartomány színezése */}
                <path d="M 55 90 L 195 90 A 140 140 0 0 0 172 32 Z" fill="#fef3c7" fillOpacity="0.55" />

                {/* Vízszintes szár: 'a' szár */}
                <line x1="55" y1="90" x2="200" y2="90" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="155" cy="90" r="3.5" fill="#2563eb" />
                <text x="155" y="106" textAnchor="middle" className="text-[11px] font-black fill-blue-700">A</text>
                <text x="206" y="94" className="text-[12px] font-bold fill-amber-700">a szár</text>

                {/* Ferde szár: 'b' szár */}
                <line x1="55" y1="90" x2="180" y2="28" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="140" cy="46" r="3.5" fill="#2563eb" />
                <text x="133" y="38" textAnchor="end" className="text-[11px] font-black fill-blue-700">B</text>
                <text x="186" y="26" className="text-[12px] font-bold fill-amber-700">b szár</text>

                {/* Belső szögív (alfa) */}
                <path d="M 95 90 A 40 40 0 0 0 88 71" stroke="#b45309" strokeWidth="2" fill="none" />
                <text x="98" y="80" className="text-[14px] font-black fill-amber-900">α</text>

                {/* Szögcsúcs: a felirat a csúcspont bal oldalán áll, sosem fedi el a piros pontot */}
                <circle cx="55" cy="90" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="44" y="94" textAnchor="end" className="text-[12px] font-black fill-rose-600">O (csúcs)</text>
              </svg>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xs w-full">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">1. Görög betűkkel:</span>
                  <MathText>{'\\alpha \\text{ (alfa)}, \\beta \\text{ (béta)}, \\gamma \\text{ (gamma)}, \\delta \\text{ (delta)}'}</MathText>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-700 dark:text-blue-400 block mb-0.5">2. Három ponttal:</span>
                  <MathText>{'\\angle AOB \\text{ vagy } A\\hat{O}B \\text{ szög}'}</MathText>
                  <p className="text-[11px] text-slate-500 mt-1">
                    A középső betű (<strong>O</strong>) mindig a szög csúcsa!
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">3. Szárak betűjelével:</span>
                  <MathText>{'\\angle(a, b)'}</MathText> (az <MathText>{'a'}</MathText> és <MathText>{'b'}</MathText> szárak által bezárt szög).
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: INTERAKTÍV SZÖGVIZSGÁLÓ & VIRTUÁLIS SZÖGMÉRŐ */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-interactive"
        number={2}
        title="Interaktív Szögvizsgáló & Virtuális Szögmérő"
        badge="Interaktív Modell"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Próbáld ki a szögállítást és szögmérést valós időben!"
          subtitle="Mozgasd a csúszkát vagy válassz gyorsértéket, kapcsold be a szögmérőt, és figyeld az élő összefüggéseket!"
          themeColor="emerald"
          icon={<Sliders className="w-5 h-5 text-emerald-600" />}
        >
          {/* Fő interaktív vezérlőpult */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm space-y-4">
            
            {/* Fejléc: fokszám kijelző és típus */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center">
                  <span>{angle}°</span>
                </div>
                <Badge variant="outline" className={cn("text-xs px-2.5 py-1 font-black", badgeColorClass)}>
                  {angleType}
                </Badge>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={showProtractor ? "default" : "outline"}
                  onClick={() => setShowProtractor(!showProtractor)}
                  className="text-xs h-8 rounded-lg font-bold"
                >
                  <Compass className="w-3.5 h-3.5 mr-1" />
                  {showProtractor ? 'Szögmérő: BE' : 'Szögmérő: KI'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRandomAngle}
                  className="text-xs h-8 rounded-lg font-bold border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                  title="Véletlenszerű szög beállítása"
                >
                  <Dices className="w-3.5 h-3.5 mr-1" />
                  Véletlen szög
                </Button>
              </div>
            </div>

            {/* SVG Megjelenítő Keret */}
            <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner overflow-hidden min-h-[220px]">
              <svg className="w-full max-w-sm h-52 mx-auto select-none" viewBox="0 0 320 280">
                {/* Háttér háló */}
                <line x1="20" y1="150" x2="300" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <line x1="160" y1="20" x2="160" y2="260" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* Virtuális Szögmérő Réteg (ha be van kapcsolva) */}
                {showProtractor && (
                  <g className="transition-opacity duration-300">
                    {/* Félkör alakú szögmérő test */}
                    <path
                      d="M 40 150 A 120 120 0 0 1 280 150 Z"
                      fill="#0284c7"
                      fillOpacity="0.08"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                    />
                    {/* Belső kivágás / alsó sáv */}
                    <path
                      d="M 120 150 A 40 40 0 0 1 200 150 Z"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />

                    {/* Fokosztások minden 10° és 30°-nál */}
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180].map((deg) => {
                      const dRad = (deg * Math.PI) / 180;
                      const isMajor = deg % 30 === 0;
                      const tickLen = isMajor ? 12 : 6;
                      const x1 = cx + 120 * Math.cos(dRad);
                      const y1 = cy - 120 * Math.sin(dRad);
                      const x2 = cx + (120 - tickLen) * Math.cos(dRad);
                      const y2 = cy - (120 - tickLen) * Math.sin(dRad);
                      const textX = cx + 98 * Math.cos(dRad);
                      const textY = cy - 98 * Math.sin(dRad) + 3;

                      return (
                        <g key={deg}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#0284c7"
                            strokeWidth={isMajor ? 1.5 : 0.8}
                          />
                          {isMajor && (
                            <text
                              x={textX}
                              y={textY}
                              textAnchor="middle"
                              className="text-[8px] font-bold fill-sky-800 dark:fill-sky-300"
                            >
                              {deg}°
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Szögmérő alappont / középpont jelölés */}
                    <circle cx={cx} cy={cy} r="2.5" fill="#0284c7" />
                  </g>
                )}

                {/* Szög tartomány kitöltése (színes szektor) */}
                {angle > 0 && angle < 360 && (
                  <path
                    d={`M ${cx} ${cy} L ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY} Z`}
                    fill={fillColor}
                    fillOpacity="0.8"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                  />
                )}
                {angle === 360 && (
                  <circle cx={cx} cy={cy} r={arcRadius} fill={fillColor} stroke={strokeColor} strokeWidth="1.5" fillOpacity="0.8" />
                )}

                {/* Magyar szabvány szerinti derékszög jelölés: negyedkör ív benne ponttal (ha pontosan 90°) */}
                {angle === 90 && (
                  <g>
                    <path
                      d={`M ${cx + 26} ${cy} A 26 26 0 0 0 ${cx} ${cy - 26}`}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2"
                    />
                    <circle cx={cx + 10} cy={cy - 10} r="2.5" fill="#047857" />
                  </g>
                )}

                {/* 1. Szár: Vízszintes fix 'a' szár (jobbra) */}
                <line x1={cx} y1={cy} x2={cx + rayLength} y2={cy} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                <circle cx={cx + rayLength} cy={cy} r="3" fill="#b45309" />
                <text x={cx + rayLength + 10} y={cy + 4} className="text-[11px] font-bold fill-amber-700">a (0°)</text>

                {/* 2. Szár: Forgó 'b' szár */}
                <line x1={cx} y1={cy} x2={ray2X} y2={ray2Y} stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
                <circle cx={ray2X} cy={ray2Y} r="4" fill={strokeColor} />
                <text
                  x={ray2X + (Math.cos(rad) * 16)}
                  y={ray2Y - (Math.sin(rad) * 16) + 4}
                  textAnchor="middle"
                  className="text-[12px] font-black"
                  fill={strokeColor}
                >
                  b ({angle}°)
                </text>

                {/* Szögcsúcs (O) */}
                <circle cx={cx} cy={cy} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x={cx - 15} y={cy + 15} className="text-[12px] font-black fill-rose-600">O</text>
              </svg>
            </div>

            {/* Csúszka és finombeállító sáv */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>0° (Nullszög)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">
                  Aktuális szög: {angle}°
                </span>
                <span>360° (Teljesszög)</span>
              </div>

              <Slider
                value={[angle]}
                min={0}
                max={360}
                step={1}
                onValueChange={(val) => setAngle(val[0])}
                className="py-1"
              />

              {/* Finomhangoló gombok (-10°, -1°, +1°, +10°) */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAngle(Math.max(0, angle - 10))}
                  className="h-7 px-2 text-xs font-bold"
                >
                  -10°
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAngle(Math.max(0, angle - 1))}
                  className="h-7 px-2 text-xs font-bold"
                >
                  -1°
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAngle(Math.min(360, angle + 1))}
                  className="h-7 px-2 text-xs font-bold"
                >
                  +1°
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAngle(Math.min(360, angle + 10))}
                  className="h-7 px-2 text-xs font-bold"
                >
                  +10°
                </Button>
              </div>
            </div>

            {/* Nevezetes szögek gyorsválasztó gombjai */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 block mb-2 text-center uppercase tracking-wider">
                Gyakori nevezetes szögek (kattints a kipróbáláshoz):
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {PRESETS.map((p) => (
                  <Button
                    key={p.val}
                    size="sm"
                    variant={angle === p.val ? "default" : "outline"}
                    onClick={() => setAngle(p.val)}
                    className={cn(
                      "text-xs h-7 px-2.5 rounded-lg font-bold transition-all",
                      angle === p.val
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                    )}
                    title={p.tip}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Dinamikus Valós idejű Elemző Kártyák */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
              {/* 1. Típus meghatározás */}
              <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Szögfajta</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 block mt-0.5">
                  {angleType}
                </span>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {angleDescription}
                </p>
              </div>

              {/* 2. Pótszög */}
              <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Pótszög (90°-ra)</span>
                {angle <= 90 ? (
                  <>
                    <span className="text-sm font-black text-emerald-600 block mt-0.5">
                      {90 - angle}°
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      90° - {angle}° = {90 - angle}°
                    </p>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic block mt-1">
                    Csak hegyesszögeknek van pótszögük!
                  </span>
                )}
              </div>

              {/* 3. Kiegészítő szög (Mellékszög) */}
              <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Kiegészítő szög (180°-ra)</span>
                {angle <= 180 ? (
                  <>
                    <span className="text-sm font-black text-indigo-600 block mt-0.5">
                      {180 - angle}°
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      180° - {angle}° = {180 - angle}°
                    </p>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic block mt-1">
                    180°-nál nagyobb szögnek nincs 180°-os kiegészítője!
                  </span>
                )}
              </div>

              {/* 4. Óralap megfelelés */}
              <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Óralap kapcsolat</span>
                <span className="text-sm font-black text-amber-600 block mt-0.5">
                  {(angle / 30).toFixed(1)} óraköz
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  {angle % 30 === 0
                    ? `Pontosan ${angle / 30} óraszám távolság az órán.`
                    : `${(angle / 6).toFixed(0)} percnyi percmutató-fordulás.`}
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: SZÖGFAJTÁK NAGYSÁGUK SZERINT */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-types"
        number={3}
        title="Szögfajták nagyságuk szerint (0°-tól 360°-ig)"
        badge="Szögfajták"
        badgeColor="amber"
      >
        <TheoryCard
          title="A szögek osztályozása méretük (fokaik) alapján"
          subtitle="Hegyesszög, derékszög, tompaszög, egyenesszög, homorúszög és teljesszög"
          themeColor="amber"
        >
          <GeometryFigureGrid columns={3}>
            {/* 1. Hegyesszög */}
            <GeometryFigureCard
              title="Hegyesszög"
              subtitle="Kisebb a derékszögnél"
              badge="0° < α < 90°"
              badgeColor="amber"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <line x1="8" y1="28" x2="48" y2="28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="28" x2="38" y2="8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 8 28 L 24 28 A 16 16 0 0 0 19 17 Z" fill="#fef3c7" fillOpacity="0.7" />
                  <path d="M 24 28 A 16 16 0 0 0 19 17" stroke="#d97706" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="28" r="2.5" fill="#b45309" />
                  <text x="27" y="21" className="text-[9px] font-black fill-amber-800">45°</text>
                </svg>
              }
              properties={[
                { label: 'Foktartomány', value: '0° és 90° között' },
                { label: 'Jellemző', value: 'Hegyben végződik, szűk nyílás' },
                { label: 'Gyakori példák', value: '30°, 45°, 60°, 75°, 89°' }
              ]}
              caption="Példa: olló kis nyílása, háztető csúcsa."
            />

            {/* 2. Derékszög */}
            <GeometryFigureCard
              title="Derékszög"
              subtitle="Merőleges szárak"
              badge="α = 90°"
              badgeColor="emerald"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <line x1="10" y1="28" x2="46" y2="28" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  <line x1="10" y1="28" x2="10" y2="6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  {/* Magyar derékszög jelölés: negyedkör ív benne ponttal */}
                  <path d="M 10 28 L 22 28 A 12 12 0 0 0 10 16 Z" fill="#d1fae5" fillOpacity="0.7" />
                  <path d="M 22 28 A 12 12 0 0 0 10 16" stroke="#059669" strokeWidth="1.5" fill="none" />
                  <circle cx="15" cy="23" r="1.5" fill="#047857" />
                  <circle cx="10" cy="28" r="2.5" fill="#047857" />
                  <text x="27" y="18" className="text-[9px] font-black fill-emerald-800">90°</text>
                </svg>
              }
              properties={[
                { label: 'Fokérték', value: 'Pontosan 90°' },
                { label: 'Jelölése', value: 'Negyedkör ív benne ponttal' },
                { label: 'Szárak viszonya', value: 'a ⊥ b (merőlegesek)' }
              ]}
              caption="Példa: papírlap, könyv vagy szoba sarka."
            />

            {/* 3. Tompaszög */}
            <GeometryFigureCard
              title="Tompaszög"
              subtitle="Nagyobb a derékszögnél"
              badge="90° < α < 180°"
              badgeColor="blue"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <line x1="22" y1="28" x2="48" y2="28" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                  <line x1="22" y1="28" x2="6" y2="12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 22 28 L 36 28 A 14 14 0 0 0 12 18 Z" fill="#dbeafe" fillOpacity="0.7" />
                  <path d="M 36 28 A 14 14 0 0 0 12 18" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                  <circle cx="22" cy="28" r="2.5" fill="#1d4ed8" />
                  <text x="25" y="16" className="text-[9px] font-black fill-blue-800">135°</text>
                </svg>
              }
              properties={[
                { label: 'Foktartomány', value: '90° és 180° között' },
                { label: 'Jellemző', value: 'Széles nyílás, laposabb' },
                { label: 'Gyakori példák', value: '95°, 120°, 135°, 150°' }
              ]}
              caption="Példa: kinyitott laptop képernyője."
            />

            {/* 4. Egyenesszög */}
            <GeometryFigureCard
              title="Egyenesszög"
              subtitle="Fél fordulat"
              badge="α = 180°"
              badgeColor="purple"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <line x1="6" y1="22" x2="48" y2="22" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 36 22 A 13 13 0 0 0 10 22 Z" fill="#ede9fe" fillOpacity="0.7" />
                  <path d="M 36 22 A 13 13 0 0 0 10 22" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
                  <circle cx="23" cy="22" r="2.5" fill="#6d28d9" />
                  <text x="23" y="14" textAnchor="middle" className="text-[9px] font-black fill-purple-900">180°</text>
                </svg>
              }
              properties={[
                { label: 'Fokérték', value: 'Pontosan 180°' },
                { label: 'Jellemző', value: 'A két szár egyetlen egyenest alkot' },
                { label: 'Aránya', value: 'A teljesszög (kör) pontos fele' }
              ]}
              caption="Példa: egyenesen kinyújtott karok, 6:00 óraállás."
            />

            {/* 5. Homorúszög */}
            <GeometryFigureCard
              title="Homorúszög"
              subtitle="Nagyobb az egyenesnél"
              badge="180° < α < 360°"
              badgeColor="rose"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <line x1="22" y1="16" x2="46" y2="16" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                  <line x1="22" y1="16" x2="10" y2="28" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 12 26 A 14 14 0 1 0 36 16" stroke="#db2777" strokeWidth="1.5" fill="none" strokeDasharray="2.5 1.5" />
                  <circle cx="22" cy="16" r="2.5" fill="#be185d" />
                  <text x="32" y="30" className="text-[9px] font-black fill-rose-800">240°</text>
                </svg>
              }
              properties={[
                { label: 'Foktartomány', value: '180° és 360° között' },
                { label: 'Jellemző', value: '„Kívülről” öleli körbe a szárakat' },
                { label: 'Gyakori példák', value: '200°, 240°, 270°, 300°' }
              ]}
              caption="Példa: háromnegyed pizza (270°)."
            />

            {/* 6. Teljesszög és Nullszög */}
            <GeometryFigureCard
              title="Teljesszög & Nullszög"
              subtitle="Határesetek"
              badge="360° és 0°"
              badgeColor="sky"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-14 h-11 mx-auto" viewBox="0 0 54 36" fill="none">
                  <line x1="20" y1="18" x2="46" y2="18" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="20" cy="18" r="11" stroke="#0ea5e9" strokeWidth="1.4" fill="#cffafe" fillOpacity="0.4" />
                  <circle cx="20" cy="18" r="2.5" fill="#0369a1" />
                  <text x="20" y="21" textAnchor="middle" className="text-[8.5px] font-black fill-sky-800">360°</text>
                </svg>
              }
              properties={[
                { label: 'Teljesszög', value: 'α = 360° (teljes körfordulat)' },
                { label: 'Nullszög', value: 'α = 0° (a két szár fedi egymást)' },
                { label: 'Különbség', value: 'A szögív iránya és kiterjedése' }
              ]}
              caption="Példa: a mutatók fedése 12:00-kor."
            />
          </GeometryFigureGrid>

          <TheoryTable
            title="Összegző táblázat a szögfajtákról"
            columns={['Szögfajta', 'Foktartomány', 'Jellegzetes példák', 'Geometriai tulajdonság']}
            rows={[
              ['Nullszög', 'α = 0°', '0°', 'A két szögszár pontosan egybeesik'],
              ['Hegyesszög', '0° < α < 90°', '30°, 45°, 60°, 85°', 'Kisebb mint a derékszög'],
              ['Derékszög', 'α = 90°', '90°', 'A szárak egymásra merőlegesek'],
              ['Tompaszög', '90° < α < 180°', '100°, 120°, 135°, 150°', 'Nagyobb a derékszögnél, kisebb az egyenesnél'],
              ['Egyenesszög', 'α = 180°', '180°', 'A két szár egy egyenes két ellentétes része'],
              ['Homorúszög', '180° < α < 360°', '210°, 270°, 315°', 'Nagyobb az egyenesszögnél'],
              ['Teljesszög', 'α = 360°', '360°', 'Pontosan egy teljes körbefordulás']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: SZÖGMÉRÉS ÉS A SZÖGMÉRŐ HASZNÁLATA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-measuring"
        number={4}
        title="Szögmérés és a szögmérő használata lépésről lépésre"
        badge="Mérés & Eszközök"
        badgeColor="teal"
      >
        <TheoryCard
          title="Hogyan mérünk szöget helyesen szögmérővel?"
          subtitle="A szögmérő felépítése, a 0°-os alapvonal és a két skála titka"
          themeColor="teal"
          icon={<Ruler className="w-5 h-5 text-teal-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-teal-50/60 dark:bg-teal-950/20 rounded-2xl border border-teal-200 dark:border-teal-800">
              <h4 className="font-bold text-teal-900 dark:text-teal-200 text-sm mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                A szögmérő anatómiája
              </h4>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>
                  <strong>Középpont (alappont):</strong> A félkör alakú szögmérő egyenes aljának a pontos közepe (gyakran egy kis lyuk vagy kereszt). Ezt kell a szög csúcsára tenni!
                </li>
                <li>
                  <strong>Alapvonal:</strong> A középpontból jobbra és balra futó egyenes alsó vonal, amely a <MathText>{'0^\\circ'}</MathText>-os és <MathText>{'180^\\circ'}</MathText>-os jelzésekhez vezet.
                </li>
                <li>
                  <strong>Kétféle skála:</strong> Egyik skála balról jobbra (<MathText>{'0^\\circ \\to 180^\\circ'}</MathText>), a másik jobbról balra fut.
                </li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                A szögmérés 3 aranyszabálya
              </h4>
              <ol className="text-xs space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside">
                <li>
                  <strong>Illeszd a középpontot:</strong> Tedd a szögmérő alappontját pontosan a szög csúcsára!
                </li>
                <li>
                  <strong>Fektesd az alapvonalat:</strong> Forgasd el a szögmérőt úgy, hogy az alapvonala pontosan ráilleszkedjen az egyik szögszárra!
                </li>
                <li>
                  <strong>Olvasd le a helyes skáláról:</strong> Keresd meg, hogy azon a száron, amelyikre ráfektetted az alapot, MELYIK skálán áll a <MathText>{'0^\\circ'}</MathText>! Arról a skáláról olvasd le a másik szár állását!
                </li>
              </ol>
            </div>
          </div>

          <TheoryCallout variant="tip" title="Hogyan ellenőrizheted gyorsan a leolvasott értéket?">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Mielőtt leolvasod a számot, <strong>mindig nézz rá szemmel a szögre!</strong> Ha hegyesszöget látsz (keskeny szájú), akkor az értéknek <MathText>{'< 90^\\circ'}</MathText>-nak kell lennie (pl. <MathText>{'50^\\circ'}</MathText> és NEM <MathText>{'130^\\circ'}</MathText>!). Ha tág tompaszöget látsz, akkor <MathText>{'> 90^\\circ'}</MathText>-nak kell lennie. Ez a gyors szemrevételezés megvéd a rossz skála leolvasásától!
            </p>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: NEVEZETES SZÖGEK ÉS AZ ÓRALAP */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-clock"
        number={5}
        title="Szögek az óralapon: A mutatók titkai"
        badge="Óralap"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Miért a legjobb szögmodell a hagyományos óralap?"
          subtitle="Az óralap 12 egyenlő körcikkre osztja a 360°-os teljes kört"
          themeColor="emerald"
          icon={<Clock className="w-5 h-5 text-emerald-600" />}
        >
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-300 dark:border-emerald-800 text-center mb-4">
            <span className="text-xs uppercase font-black text-emerald-700 dark:text-emerald-400 tracking-wider">
              Az óralap aranyszámai
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200">
                <span className="text-xs text-slate-500 block">1 teljes kör</span>
                <span className="text-lg font-black text-slate-800 dark:text-slate-100">360°</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200">
                <span className="text-xs text-slate-500 block">1 óraköz (360° : 12)</span>
                <span className="text-lg font-black text-amber-600">30°</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200">
                <span className="text-xs text-slate-500 block">1 percköz (360° : 60)</span>
                <span className="text-lg font-black text-teal-600">6°</span>
              </div>
            </div>
          </div>

          <GeometryFigureGrid columns={4}>
            {/* 3:00 */}
            <GeometryFigureCard
              title="3:00 és 9:00"
              subtitle="3 óraköz távolság"
              badge="90° Derékszög"
              badgeColor="emerald"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-12 h-12 sm:w-14 sm:h-14 mx-auto" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.6" fill="#fffbeb" />
                  <circle cx="20" cy="5" r="0.8" fill="#b45309" />
                  <circle cx="35" cy="20" r="0.8" fill="#b45309" />
                  <circle cx="20" cy="35" r="0.8" fill="#b45309" />
                  <circle cx="5" cy="20" r="0.8" fill="#b45309" />
                  <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <line x1="20" y1="20" x2="31" y2="20" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Magyar derékszög jelölés: negyedkör ív benne ponttal */}
                  <path d="M 26 20 A 6 6 0 0 0 20 14" stroke="#d97706" strokeWidth="1.2" fill="none" />
                  <circle cx="22.5" cy="17.5" r="0.8" fill="#b45309" />
                  <circle cx="20" cy="20" r="2" fill="#78350f" />
                </svg>
              }
              properties={[
                { label: 'Óraközök', value: '3 óraköz' },
                { label: 'Számítás', value: '3 × 30° = 90°' },
                { label: 'Szögfajta', value: 'Derékszög' }
              ]}
              caption="A negyed órás mutatóállás pontos derékszög."
            />

            {/* 6:00 */}
            <GeometryFigureCard
              title="6:00 állás"
              subtitle="6 óraköz távolság"
              badge="180° Egyenesszög"
              badgeColor="purple"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-12 h-12 sm:w-14 sm:h-14 mx-auto" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.6" fill="#fffbeb" />
                  <circle cx="20" cy="5" r="0.8" fill="#b45309" />
                  <circle cx="35" cy="20" r="0.8" fill="#b45309" />
                  <circle cx="20" cy="35" r="0.8" fill="#b45309" />
                  <circle cx="5" cy="20" r="0.8" fill="#b45309" />
                  <line x1="20" y1="20" x2="20" y2="7" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <line x1="20" y1="20" x2="20" y2="33" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="2" fill="#78350f" />
                </svg>
              }
              properties={[
                { label: 'Óraközök', value: '6 óraköz' },
                { label: 'Számítás', value: '6 × 30° = 180°' },
                { label: 'Szögfajta', value: 'Egyenesszög' }
              ]}
              caption="A mutatók egyenes vonalat alkotnak."
            />

            {/* 1:00 és 2:00 */}
            <GeometryFigureCard
              title="1:00 és 2:00"
              subtitle="1 vagy 2 óraköz"
              badge="30° és 60° Hegyesszög"
              badgeColor="amber"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-12 h-12 sm:w-14 sm:h-14 mx-auto" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.6" fill="#fffbeb" />
                  <circle cx="20" cy="5" r="0.8" fill="#b45309" />
                  <circle cx="35" cy="20" r="0.8" fill="#b45309" />
                  <circle cx="20" cy="35" r="0.8" fill="#b45309" />
                  <circle cx="5" cy="20" r="0.8" fill="#b45309" />
                  <line x1="20" y1="20" x2="20" y2="7" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <line x1="20" y1="20" x2="25.5" y2="10.5" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="2" fill="#78350f" />
                </svg>
              }
              properties={[
                { label: '1:00 órakor', value: '1 × 30° = 30° (hegyesszög)' },
                { label: '2:00 órakor', value: '2 × 30° = 60° (hegyesszög)' }
              ]}
              caption="Mindkettő kisebb mint 90°."
            />

            {/* 4:00 és 5:00 */}
            <GeometryFigureCard
              title="4:00 és 5:00"
              subtitle="4 vagy 5 óraköz"
              badge="120° és 150° Tompaszög"
              badgeColor="blue"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-12 h-12 sm:w-14 sm:h-14 mx-auto" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.6" fill="#fffbeb" />
                  <circle cx="20" cy="5" r="0.8" fill="#b45309" />
                  <circle cx="35" cy="20" r="0.8" fill="#b45309" />
                  <circle cx="20" cy="35" r="0.8" fill="#b45309" />
                  <circle cx="5" cy="20" r="0.8" fill="#b45309" />
                  <line x1="20" y1="20" x2="20" y2="7" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <line x1="20" y1="20" x2="29.5" y2="25.5" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="2" fill="#78350f" />
                </svg>
              }
              properties={[
                { label: '4:00 órakor', value: '4 × 30° = 120° (tompaszög)' },
                { label: '5:00 órakor', value: '5 × 30° = 150° (tompaszög)' }
              ]}
              caption="Mindkettő nagyobb mint 90°, de kisebb mint 180°."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 6. SZEKCIÓ: SZÖGPÁROK ÉS MŰVELETEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-pairs"
        number={6}
        title="Szögpárok, szögfelezés és síkidomok belső szögei"
        badge="Összefüggések"
        badgeColor="purple"
      >
        <TheoryCard
          title="Nevezetes szögpárok és szögösszefüggések"
          subtitle="Pótszögek, kiegészítő szögek (mellékszögek) és csúcsszögek"
          themeColor="purple"
          icon={<Shapes className="w-5 h-5 text-purple-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">
                Pótszögek (összeg = 90°)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Két hegyesszög, amelyek összege pontosan derékszöget (<MathText>{'90^\\circ'}</MathText>) alkot.
              </p>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <MathText>{'\\alpha + \\beta = 90^\\circ \\implies \\beta = 90^\\circ - \\alpha'}</MathText>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Példa: 30° és 60°, 40° és 50°.</p>
            </div>

            <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-1">
                Kiegészítő szögek (összeg = 180°)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Két szög, amelyek összege pontosan egyenesszöget (<MathText>{'180^\\circ'}</MathText>) ad. Ha egymás mellett fekszenek: mellékszögek.
              </p>
              <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <MathText>{'\\alpha + \\beta = 180^\\circ \\implies \\beta = 180^\\circ - \\alpha'}</MathText>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Példa: 70° és 110°, 45° és 135°.</p>
            </div>

            <div className="p-3.5 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm mb-1">
                Csúcsszögek (egyenlők)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Két egymást metsző egyenes által alkotott, egymással szemben fekvő szögpár.
              </p>
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                <MathText>{'\\alpha = \\alpha\''}</MathText> (mindig egyenlő nagyságúak!)
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Példa: kinyitott olló szemközti szárai.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                A szögfelező félegyenes
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                A szög csúcsából kiinduló félegyenes, amely a szögtartományt <strong>két egyenlő nagyságú részre osztja</strong>.
              </p>
              <div className="p-2 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
                <MathText>{'\\text{Fél szög} = \\frac{\\alpha}{2}'}</MathText> (pl. 80° felezve: 40° és 40°)
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Sokszögek nevezetes szögei
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>
                  <strong>Háromszög:</strong> A 3 belső szög összege mindig <MathText>{'180^\\circ'}</MathText>.
                </li>
                <li>
                  <strong>Szabályos háromszög:</strong> Mindhárom szöge egyenlő: <MathText>{'180^\\circ : 3 = 60^\\circ'}</MathText>.
                </li>
                <li>
                  <strong>Négyzet és téglalap:</strong> Mind a 4 szöge pontosan <MathText>{'90^\\circ'}</MathText> (összegük <MathText>{'360^\\circ'}</MathText>).
                </li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 7. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-angles-traps"
        number={7}
        title="Gyakori tévhitek és csapdák a szögeknél"
        badge="Mire figyelj nagyon?"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="Gyakori csapdák & tipikus tévhitek a szögek témakörében"
          traps={[
            {
              title: '1. Csapda: „A hosszabb szárú szög nagyobb” tévhit',
              wrong: 'Azt hinni, hogy ha a füzetben hosszabb vonallal rajzoljuk le a szögszárat, akkor a szög értéke is nagyobb lett.',
              correct: 'A szög nagysága kizárólag a két szár nyílásától (elfordulásától) függ, nem a rajzolt vonalak hosszától! A szárak félegyenesek, a végtelenbe nyúlnak.',
              explanation: 'Egy 30°-os szög kicsi ceruzával rajzolva és a ház falára vetítve is pontosan 30°-os marad.'
            },
            {
              title: '2. Csapda: A szögmérő rossz skálájának leolvasása',
              wrong: 'Egy hegyesszögre 130°-ot, vagy egy tompaszögre 50°-ot mondani.',
              correct: 'A szögmérőn mindig arról a skáláról kell indulni, amelyiknél a fekvő szár 0°-on áll. Ha ránézésre hegyesszög, az értéke kötelezően < 90°!',
              explanation: 'A két skála összege minden vonásnál 180°: 130° helyett a helyes érték 180° - 130° = 50° volt.'
            },
            {
              title: '3. Csapda: A derékszög és egyenesszög besorolása',
              wrong: 'A 90°-ot hegyesszögnek vagy tompaszögnek mondani, a 180°-ot tompaszögnek nevezni.',
              correct: 'A határok szigorúak: a hegyesszög szigorúan < 90°, a tompaszög szigorúan 90° és 180° KÖZÖTTI! A 90° derékszög, a 180° pedig egyenesszög.',
              explanation: 'A 90° és 180° önálló, kitüntetett kategóriák, nem tartoznak a hegyes vagy tompa tartományokba.'
            },
            {
              title: '4. Csapda: A szögcsúcs eltévesztése a hárombetűs jelölésben',
              wrong: 'Azt hinni, hogy az ∠ABC szög csúcsa az A vagy a C pont.',
              correct: 'A hárombetűs szögjelölésnél a KÖZÉPSŐ BETŰ mindig a szög csúcspontja (itt a B pont)!',
              explanation: 'A két szélső betű (A és C) a két száron lévő pontot jelöli, míg a középső betű a találkozási sarkot.'
            },
            {
              title: '5. Csapda: 1 óraköz nagyságának elfelejtése',
              wrong: 'Azt mondani, hogy az óralapon 1 óraköz 10 fok, mert 12 óra van.',
              correct: 'A teljes kör 360°, amit 12 egyenlő részre osztunk: 360° : 12 = 30°! Minden óraköz pontosan 30°.',
              explanation: 'Így 3:00-kor 3 × 30° = 90°, 4:00-kor 4 × 30° = 120°, 6:00-kor 6 × 30° = 180°.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AnglesTheory;
