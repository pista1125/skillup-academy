import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  CircleCircumferenceDissectionSvg,
  CircularRingAreaSvg,
  ArchimedesPiApproximationSvg
} from './CircleCircumferenceAreaFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Sparkles,
  Maximize2,
  PieChart,
  CircleDot,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CircleCircumferenceAreaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CircleCircumferenceAreaTheory: React.FC<CircleCircumferenceAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State: Kör & Körgyűrű Kalkulátor ---
  const [radiusR, setRadiusR] = useState<number>(7); // Külső sugár R
  const [radiusSmallR, setRadiusSmallR] = useState<number>(4); // Belső sugár r
  const [mode, setMode] = useState<'single' | 'ring'>('ring');

  const PI = Math.PI;

  // Számítások
  const rSafe = Math.min(radiusSmallR, radiusR - 0.5);
  const circOuter = 2 * PI * radiusR;
  const areaOuter = PI * radiusR * radiusR;

  const circInner = 2 * PI * rSafe;
  const areaInner = PI * rSafe * rSafe;

  const ringArea = areaOuter - areaInner;
  const ringWidth = radiusR - rSafe;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="A kör kerülete és területe, a körgyűrű"
      subtitle="Hogyan vezette le Arkhimédész a π-t? A kerület és terület képlete, a körgyűrű gyakorlati alkalmazásai és a négyzetes növekedés törvénye."
      themeColor="cyan"
      pdfFilename="10_osztaly_kor_kerulete_es_terulete_tananyag.pdf"
      quickRule={{
        label: 'A KÖR KERÜLETE, TERÜLETE ÉS A KÖRGYŰRŰ',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-cyan-50/90 p-2.5 rounded-xl border border-cyan-200">
              <span className="font-black text-cyan-900 block mb-0.5">Alapképletek (r a sugár, d = 2r az átmérő):</span>
              <ul className="space-y-1 font-mono text-cyan-950 mt-1">
                <li>• <strong>Kerület:</strong> K = 2πr = πd</li>
                <li>• <strong>Terület:</strong> T = πr² = (πd²)/4</li>
                <li>• <strong>Körgyűrű területe:</strong> T_gyűrű = π(R² - r²)</li>
                <li>• <strong>Gyűrű szélessége:</strong> w = R - r</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-tight font-medium">
              <strong>💡 NÉGYZETES ARÁNY:</strong> Ha a sugár k-szorosára nő, a kerület k-szorosára, de a terület <strong>k²-szeresére</strong> nő!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a kör kerület és terület feladataira?"
      practiceSubtitle="Számítsd ki a kerületeket, területeket és körgyűrűket a 30 kérdéses kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-cyan-950 via-slate-900 to-teal-950 border-2 border-cyan-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500 text-slate-950 rounded-2xl shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-cyan-100">
                  Interaktív Kör &amp; Körgyűrű Metrika Labor
                </h3>
                <p className="text-xs text-cyan-300/80">
                  Állítsd a sugarakat, és kövesd valós időben a pontos (π-s) és kerekített értékeket!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${mode === 'single' ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setMode('single')}
              >
                Egyetlen Kör
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${mode === 'ring' ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setMode('ring')}
              >
                Körgyűrű (R és r)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vezérlők */}
            <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-cyan-800/40">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                Méretek beállítása
              </span>

              {/* R sugár */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span>{mode === 'ring' ? 'Külső sugár (R):' : 'Sugár (r):'}</span>
                  <span className="font-mono text-cyan-300 font-bold">{radiusR} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={radiusR}
                  onChange={(e) => setRadiusR(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* r sugár (ha körgyűrű mód) */}
              {mode === 'ring' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Belső sugár (r):</span>
                    <span className="font-mono text-amber-300 font-bold">{rSafe.toFixed(1)} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={Math.max(1, radiusR - 0.5)}
                    step="0.5"
                    value={rSafe}
                    onChange={(e) => setRadiusSmallR(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-400">
                    Gyűrű szélessége (w = R - r): <strong className="text-emerald-400">{ringWidth.toFixed(1)} cm</strong>
                  </div>
                </div>
              )}

              {/* Arányosság megfigyelő */}
              <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs space-y-1.5">
                <span className="font-bold text-amber-300 block">Gyors arányossági összehasonlítás:</span>
                <p className="text-slate-300 leading-snug">
                  Ha <MathText>{'R = ' + radiusR + '\\text{ cm}'}</MathText> helyett <MathText>{'2R = ' + (radiusR * 2) + '\\text{ cm}'}</MathText> lenne:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-700 text-cyan-300">
                    K kétszeres: {(circOuter * 2).toFixed(1)} cm
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-700 text-emerald-400 font-bold">
                    T NÉGYSZERES: {(areaOuter * 4).toFixed(1)} cm²
                  </div>
                </div>
              </div>
            </div>

            {/* Élő vizualizáció & Számított eredmények */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 space-y-1">
                  <span className="text-cyan-400 font-bold block">
                    {mode === 'ring' ? 'Külső kör (R):' : 'Kör kerülete és területe:'}
                  </span>
                  <p className="text-slate-300 font-mono">
                    K = 2 · {radiusR} · π = <strong className="text-cyan-300">{(2 * radiusR).toFixed(1)}π</strong> ≈ {circOuter.toFixed(2)} cm
                  </p>
                  <p className="text-slate-300 font-mono">
                    T = {radiusR}² · π = <strong className="text-cyan-300">{(radiusR * radiusR).toFixed(1)}π</strong> ≈ {areaOuter.toFixed(2)} cm²
                  </p>
                </div>

                {mode === 'ring' ? (
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-1">
                    <span className="text-amber-400 font-bold block">Körgyűrű nettó területe:</span>
                    <p className="text-slate-300 font-mono">
                      T_gy = π · ({radiusR}² - {rSafe.toFixed(1)}²)
                    </p>
                    <p className="text-emerald-400 font-mono font-bold text-sm">
                      = {(radiusR * radiusR - rSafe * rSafe).toFixed(1)}π ≈ {ringArea.toFixed(2)} cm²
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1">
                    <span className="text-emerald-400 font-bold block">Átmérő és félkör:</span>
                    <p className="text-slate-300 font-mono">Átmérő (d = 2r): {2 * radiusR} cm</p>
                    <p className="text-slate-300 font-mono">Félkör területe: {(areaOuter / 2).toFixed(2)} cm²</p>
                  </div>
                )}
              </div>

              {/* SVG Élő Körgyűrű Rajz */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg viewBox="0 0 320 200" className="w-full max-w-[340px] h-auto select-none">
                  {/* Skála: 1 cm = 8 px */}
                  {(() => {
                    const cx = 160;
                    const cy = 100;
                    const scale = 7.5;
                    const R_px = radiusR * scale;
                    const r_px = mode === 'ring' ? rSafe * scale : 0;

                    return (
                      <g>
                        {/* Külső kör */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={R_px}
                          fill="#06b6d4"
                          fillOpacity={mode === 'ring' ? 0.35 : 0.25}
                          stroke="#22d3ee"
                          strokeWidth="2.5"
                        />

                        {/* Belső kivágás (ha körgyűrű) */}
                        {mode === 'ring' && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={r_px}
                            fill="#020617"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                        )}

                        {/* Középpont O */}
                        <circle cx={cx} cy={cy} r="3.5" fill="#ffffff" />
                        <text x={cx - 14} y={cy - 6} fill="#ffffff" fontSize="10" fontWeight="bold">O</text>

                        {/* R sugár vonal */}
                        <line x1={cx} y1={cy} x2={cx + R_px * 0.866} y2={cy - R_px * 0.5} stroke="#22d3ee" strokeWidth="2" />
                        <text
                          x={cx + R_px * 0.45}
                          y={cy - R_px * 0.35}
                          fill="#67e8f9"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          R = {radiusR}
                        </text>

                        {/* r sugár vonal (ha gyűrű) */}
                        {mode === 'ring' && (
                          <g>
                            <line x1={cx} y1={cy} x2={cx + r_px} y2={cy} stroke="#f59e0b" strokeWidth="2" />
                            <text x={cx + r_px * 0.4} y={cy + 14} fill="#fcd34d" fontSize="10" fontWeight="bold">
                              r = {rSafe.toFixed(1)}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}
                </svg>
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  {mode === 'ring'
                    ? 'A türkiz sáv adja a körgyűrű területét: T = T_külső - T_belső.'
                    : 'A teljes kör területe T = πr², határoló vonala a kerület: K = 2πr.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* 1. Szakasz: A kör definíciója és a π száma */}
      <TheorySection
        id="kor-definíció-pi"
        number={1}
        title="A kör definíciója és a misztikus π száma"
        badge="FELFEDEZÉS"
        badgeColor="cyan"
      >
        <TheoryCard title="Mi a π, és hogyan határozta meg Arkhimédész?" color="cyan">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A síkban egy adott <MathText>{'O'}</MathText> ponttól (középponttól) egyenlő <MathText>{'r'}</MathText> távolságra lévő 
            pontok összességét <strong>körvonalnak</strong>, a körvonal által határolt síkrészt <strong>körnek</strong> nevezzük. 
            Már az ókorban felismerték, hogy bármekkora is a kör, a <strong>kerületének (<MathText>{'K'}</MathText>) és átmérőjének (<MathText>{'d'}</MathText>) 
            hányadosa mindig egy és ugyanaz a konstans szám</strong>! Ezt a viszonyszámot jelöljük a görög <MathText>{'\\pi'}</MathText> (pi) betűvel:
          </p>

          <div className="my-3 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 font-mono text-center text-cyan-950 dark:text-cyan-300 font-bold text-sm sm:text-base">
            <MathText>{'\\frac{K}{d} = \\frac{K}{2r} = \\pi \\approx 3{,}1415926535...'}</MathText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
            <div className="md:col-span-7 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block">Arkhimédész zseniális közelítő módszere:</span>
              <p>
                Arkhimédész szirakúzai matematikus (i. e. 250 körül) úgy határozta meg a <MathText>{'\\pi'}</MathText> értékét, 
                hogy a körbe és a kör köré szabályos 6, 12, 24, 48, végül <strong>96-szögeket</strong> szerkesztett.
              </p>
              <p>
                A beírt 96-szög kerülete alulról, a körülírt 96-szög kerülete felülről korlátozta a kör kerületét:
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                3 egész 10/71 &lt; π &lt; 3 egész 1/7 &nbsp; (vagyis 3,1408 &lt; π &lt; 3,1428)
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <ArchimedesPiApproximationSvg size={280} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: Kerület és Terület képlete */}
      <TheorySection
        id="kerulet-terulet-keplet"
        number={2}
        title="A kör kerülete és területe: Geometriai levezetés"
        badge="KÉPLETEK"
        badgeColor="teal"
      >
        <TheoryCard title="Hogyan lesz a körből téglalap? A területképlet bizonyítása" color="teal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A kerület képlete a <MathText>{'\\pi'}</MathText> definíciójából közvetlenül adódik:
          </p>
          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono text-teal-950 dark:text-teal-300 font-bold text-sm my-2">
            <MathText>{'K = 2\\pi r = \\pi d'}</MathText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
            <div className="md:col-span-6 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block">A terület levezetése szeleteléssel:</span>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>Vágjuk fel a kört gondolatban nagyon sok, egyenlő körcikkre (pl. 32 vagy 64 darabra)!</li>
                <li>Fűzzük össze a szeleteket felváltva: az egyik hegye lefelé, a másiké felfelé nézzen.</li>
                <li>
                  Az így kapott alakzat egyre pontosabban egy <strong>téglalaphoz közelít</strong>:
                  <ul className="list-disc list-inside ml-4 mt-1 font-mono text-xs">
                    <li>A téglalap magassága pontosan a kör sugara: <MathText>{'m = r'}</MathText>.</li>
                    <li>A téglalap alapja a félkörív hossza: <MathText>{'alap = \\frac{K}{2} = \\pi r'}</MathText>.</li>
                  </ul>
                </li>
                <li>
                  A téglalap területe: <MathText>{'T = alap \\cdot m = (\\pi r) \\cdot r = \\pi r^2'}</MathText>!
                </li>
              </ol>
            </div>
            <div className="md:col-span-6 flex justify-center">
              <CircleCircumferenceDissectionSvg size={340} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: A Körgyűrű */}
      <TheorySection
        id="korgyuru-geometria"
        number={3}
        title="A körgyűrű (annulus) számításai és gyakorlati képletei"
        badge="KÖRGYŰRŰ"
        badgeColor="cyan"
      >
        <TheoryCard title="Két koncentrikus kör közötti terület" color="cyan">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Ha két azonos középpontú (koncentrikus), de különböző sugarú (<MathText>{'R > r'}</MathText>) kört rajzolunk, 
                a két körvonal közötti síkrészt <strong>körgyűrűnek</strong> nevezzük.
              </p>
              <p>
                A körgyűrű területe a nagyobbik kör és a kisebbik belső kör területének különbsége:
              </p>
              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 font-mono text-cyan-950 dark:text-cyan-300 font-bold space-y-1">
                <div><MathText>{'T_{\\text{gyűrű}} = T_{\\text{külső}} - T_{\\text{belső}} = \\pi R^2 - \\pi r^2'}</MathText></div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <MathText>{'T_{\\text{gyűrű}} = \\pi (R^2 - r^2) = \\pi (R - r)(R + r)'}</MathText>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                A gyűrű szélessége (falvastagság): <MathText>{'w = R - r'}</MathText>.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <CircularRingAreaSvg size={280} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Kidolgozott mintapéldák */}
      <TheorySection
        id="kor-mintapeldak"
        number={4}
        title="Részletesen kidolgozott mintapéldák"
        badge="MINTAPÉLDÁK"
        badgeColor="emerald"
      >
        {/* 1. Mintapélda */}
        <TheoryCard title="1. Mintapélda: A nagy fa átmérőjének mérése mérőszalaggal" color="emerald">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy öreg tölgyfa törzsét 1,30 méter magasságban körbetekerjük egy mérőszalaggal. 
              A szalag pontosan 3,77 métert mutat (a törzs kerülete). Hány centiméter a fa átmérője, és mennyi a törzs keresztmetszetének területe?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Megoldás:</span>
              <ol className="list-decimal list-inside space-y-1.5">
                <li>
                  A kerület képletéből kifejezzük az átmérőt: <MathText>{'K = \\pi d \\implies d = \\frac{K}{\\pi}'}</MathText>.
                </li>
                <li>
                  Behelyettesítve: <MathText>{'d = \\frac{3{,}77\\text{ m}}{3{,}1416} \\approx 1{,}20\\text{ m} = 120\\text{ cm}'}</MathText>.
                </li>
                <li>
                  A sugár az átmérő fele: <MathText>{'r = \\frac{d}{2} = 60\\text{ cm} = 0{,}6\\text{ m}'}</MathText>.
                </li>
                <li>
                  A keresztmetszet területe: <MathText>{'T = \\pi r^2 = \\pi \\cdot 0{,}6^2 = 0{,}36\\pi \\approx 1{,}131\\text{ m}^2'}</MathText>.
                </li>
              </ol>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                Válasz: A tölgyfa átmérője kb. 120 cm, keresztmetszete pedig kb. 1,13 m².
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 2. Mintapélda: Pizza dilemma */}
        <TheoryCard title="2. Mintapélda: A pizza-dilemma (1 nagy vagy 2 közepes?)" color="teal">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy pizzériában egy 32 cm átmérőjű családi pizza 3600 Ft-ba kerül, míg egy 24 cm átmérőjű közepes pizza 2200 Ft. 
              Melyik választással kapunk több pizzát a pénzünkért: 1 nagy pizzával vagy 2 közepes pizzával?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Megoldás:</span>
              <p>Számítsuk ki a területeket a sugárral (<MathText>{'r = d/2'}</MathText>):</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                <li>1 db nagy pizza (<MathText>{'r_1 = 16\\text{ cm}'}</MathText>): <MathText>{'T_1 = \\pi \\cdot 16^2 = 256\\pi \\approx 804{,}2\\text{ cm}^2'}</MathText> (Ára: 3600 Ft).</li>
                <li>2 db közepes pizza (<MathText>{'r_2 = 12\\text{ cm}'}</MathText>): <MathText>{'T_2 = 2 \\cdot (\\pi \\cdot 12^2) = 2 \\cdot 144\\pi = 288\\pi \\approx 904{,}8\\text{ cm}^2'}</MathText> (Ára: 4400 Ft).</li>
              </ul>
              <p className="mt-1">Nézzük az 1 cm²-re jutó árat:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                <li>Nagy pizza: <MathText>{'3600 / 804{,}2 \\approx 4{,}48\\text{ Ft/cm}^2'}</MathText></li>
                <li>2 közepes pizza: <MathText>{'4400 / 904{,}8 \\approx 4{,}86\\text{ Ft/cm}^2'}</MathText></li>
              </ul>
              <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 font-bold text-xs">
                Válasz: Bár 2 közepes pizza területe picit nagyobb, az 1 db nagy pizza fajlagosan olcsóbb és gazdaságosabb választás!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szakasz: Csapdák és tipikus hibák */}
      <TheorySection
        id="kor-csapdak"
        number={5}
        title="Tipikus buktatók a kör számításainál"
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="Körgyűrű téves területképlete"
          trap="A körgyűrű területe: a szélesség négyzetének π-szerese: T = π · (R - r)²"
          wrong="T_gyűrű = π · (R - r)²"
          wrongExplanation="ÓRIÁSI HIBA! Algebrai azonosság: (R - r)² = R² - 2Rr + r², ami NEM egyenlő R² - r²-tel! Ezzel a hibás képlettel elveszíted a 2Rr nagyságú területet!"
          correct="T_gyűrű = π · R² - π · r² = π · (R² - r²)"
          correctExplanation="HELYES! A négyzeteket külön-külön kell képezni, és csak utána kivonni őket: R² - r² = (R - r)(R + r)!"
          tip="Mindig ellenőrizd, hogy a feladat átmérőt (d) vagy sugarat (r) adott-e meg! A képletekben mindig a sugár (r = d/2) szerepel!"
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
