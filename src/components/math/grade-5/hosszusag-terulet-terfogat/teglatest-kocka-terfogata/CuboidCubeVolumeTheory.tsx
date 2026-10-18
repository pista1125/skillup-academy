import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Box,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  Grid,
  Layers,
  Droplets,
  RotateCcw,
  Calculator
} from 'lucide-react';

export interface CuboidCubeVolumeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const CuboidCubeVolumeTheory: React.FC<CuboidCubeVolumeTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív 3D Térfogat és Vízszint Laboratórium ---
  const [edgeA, setEdgeA] = useState<number>(5);
  const [edgeB, setEdgeB] = useState<number>(4);
  const [edgeC, setEdgeC] = useState<number>(3);
  const [waterHeight, setWaterHeight] = useState<number>(2);

  // Számítások
  const baseArea = edgeA * edgeB;
  const totalVolume = edgeA * edgeB * edgeC;
  const waterVolume = edgeA * edgeB * waterHeight;
  const waterPercent = Math.round((waterHeight / edgeC) * 100);

  return (
    <TheoryTemplate
      documentId="grade-5-cuboid-cube-volume-theory"
      pdfFilename="5_osztaly_IV_8_teglatest_kocka_terfogata.pdf"
      title="Téglatest és kocka térfogata"
      subtitle="A térfogat kiszámítása az élek szorzataként (V = a · b · c), az alapterület és magasság szorzata, hiányzó élek visszaszámolása és valós életbeli tartályok"
      themeColor="indigo"
      emoji="🧊"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 8. TANANYAG"
      quickRule={{
        label: 'A fejezet aranyszabálya',
        formula: '\\text{Kocka: } V = a^3 = a \\cdot a \\cdot a \\quad | \\quad \\text{Téglatest: } V = a \\cdot b \\cdot c = T_{\\text{alap}} \\cdot m'
      }}
      practiceTitle="Készen állsz a térfogatszámítás gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A TÉGLATEST TÉRFOGATÁNAK KÉPLETE */}
      <TheorySection
        id="teglatest-keplet"
        title="1. A téglatest térfogata: V = a · b · c"
        subtitle="Hogyan vezessük le a térfogatképletet egységkockák rétegeiből?"
        badge="ALAPKÉPLET"
      >
        <TheoryCard title="Miért az élek szorzata a térfogat?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Képzeld el, hogy egy dobozt szeretnél megtölteni 1 cm³-es kockacukrokkal (egységkockákkal)!
            A felépítés három logikus lépésben történik:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800">
              <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">
                1. LÉPÉS: EGYETLEN SOR
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Lerakunk egy sorba <strong>a darab</strong> kiskockát a doboz hossza mentén.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800">
              <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400 block mb-1">
                2. LÉPÉS: ALSÓ RÉTEG
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                A doboz szélességében <strong>b darab sort</strong> rakunk le. Az alsó rétegben összesen <strong>a · b darab</strong> kiskocka lesz (ez az alapterület!).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-800">
              <span className="text-xs uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400 block mb-1">
                3. LÉPÉS: RÉTEGEK EGYMÁSON
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Mivel a doboz magassága <strong>c</strong>, pontosan <strong>c réteget</strong> pakolunk egymásra: <strong>(a · b) · c</strong>.
              </p>
            </div>
          </div>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-sm h-40 mx-auto" viewBox="0 0 300 135">
              <g transform="translate(30, 15)">
                {/* Front faces (4x2) */}
                <rect x="0" y="25" width="80" height="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
                <line x1="20" y1="25" x2="20" y2="65" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="40" y1="25" x2="40" y2="65" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="60" y1="25" x2="60" y2="65" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="0" y1="45" x2="80" y2="45" stroke="#4338ca" strokeWidth="1.5" />

                {/* Top face */}
                <polygon points="0,25 25,10 105,10 80,25" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.5" />
                <line x1="20" y1="25" x2="45" y2="10" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="40" y1="25" x2="65" y2="10" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="60" y1="25" x2="85" y2="10" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" />

                {/* Side face */}
                <polygon points="80,25 105,10 105,50 80,65" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
                <line x1="80" y1="45" x2="105" y2="30" stroke="#4338ca" strokeWidth="1.5" />

                {/* Dimensions */}
                <text x="40" y="80" textAnchor="middle" className="text-[10px] font-black fill-indigo-900 dark:fill-indigo-200">a = 4 (hossz)</text>
                <text x="105" y="6" textAnchor="middle" className="text-[10px] font-black fill-indigo-900 dark:fill-indigo-200">b = 3</text>
                <text x="-10" y="47" textAnchor="middle" className="text-[10px] font-black fill-indigo-900 dark:fill-indigo-200" transform="rotate(-90 -10 47)">c = 2</text>
              </g>

              <g transform="translate(160, 30)">
                <text x="0" y="15" className="text-xs font-black fill-indigo-900 dark:fill-indigo-100">Alsó réteg: 4 · 3 = 12 db</text>
                <text x="0" y="35" className="text-xs font-black fill-purple-700 dark:fill-purple-300">2 réteg: 12 · 2 = 24 db</text>
                <text x="0" y="58" className="text-[11px] font-black fill-emerald-600 dark:fill-emerald-400">V = 4 · 3 · 2 = 24 kocka</text>
              </g>
            </svg>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-2 border-indigo-300 dark:border-indigo-700 text-center my-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-700 dark:text-indigo-300 block mb-1">
              A TÉGLATEST TÉRFOGATÁNAK KÉT ALAKJA
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white my-1">
              V = a · b · c = T_alap · m
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Ahol <strong>T_alap = a · b</strong> az alaplap területe, <strong>m = c</strong> pedig a téglatest magassága.
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A KOCKA TÉRFOGATA */}
      <TheorySection
        id="kocka-keplet"
        title="2. A kocka térfogata: V = a³ (a köbön)"
        subtitle="A kocka minden éle egyenlő hosszúságú"
        badge="KOCKA KÉPLET"
      >
        <TheoryCard title="Egyenlő élű test: a · a · a">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A kocka olyan szabályos téglatest, amelynek minden éle egyenlő hosszúságú (a = b = c).
            Ezért a térfogatképlete egyszerűbb:
          </p>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center my-2">
            <div className="text-3xl font-black text-indigo-950 dark:text-indigo-100 font-mono">
              V = a · a · a = a³
            </div>
            <span className="text-xs text-indigo-700 dark:text-indigo-300 mt-1 block">
              Kiejtése: „a a köbön” vagy „a harmadik hatványon”.
            </span>
          </div>

          <div className="my-3 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
            <svg className="w-56 h-40 mx-auto" viewBox="0 0 200 135">
              <g transform="translate(45, 12)">
                {/* Front face (3x3 grid) */}
                <rect x="0" y="25" width="60" height="60" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
                <line x1="20" y1="25" x2="20" y2="85" stroke="#6366f1" strokeWidth="1" />
                <line x1="40" y1="25" x2="40" y2="85" stroke="#6366f1" strokeWidth="1" />
                <line x1="0" y1="45" x2="60" y2="45" stroke="#6366f1" strokeWidth="1" />
                <line x1="0" y1="65" x2="60" y2="65" stroke="#6366f1" strokeWidth="1" />

                {/* Top face (3x3 grid) */}
                <polygon points="0,25 30,5 90,5 60,25" fill="#eef2ff" stroke="#4338ca" strokeWidth="1.5" />
                <line x1="20" y1="25" x2="50" y2="5" stroke="#6366f1" strokeWidth="1" />
                <line x1="40" y1="25" x2="70" y2="5" stroke="#6366f1" strokeWidth="1" />
                <line x1="10" y1="18.3" x2="70" y2="18.3" stroke="#6366f1" strokeWidth="1" />
                <line x1="20" y1="11.6" x2="80" y2="11.6" stroke="#6366f1" strokeWidth="1" />

                {/* Right side face (3x3 grid) */}
                <polygon points="60,25 90,5 90,65 60,85" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1.5" />
                <line x1="70" y1="18.3" x2="70" y2="78.3" stroke="#6366f1" strokeWidth="1" />
                <line x1="80" y1="11.6" x2="80" y2="71.6" stroke="#6366f1" strokeWidth="1" />
                <line x1="60" y1="45" x2="90" y2="25" stroke="#6366f1" strokeWidth="1" />
                <line x1="60" y1="65" x2="90" y2="45" stroke="#6366f1" strokeWidth="1" />

                {/* Side labels */}
                <text x="30" y="96" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900 dark:fill-indigo-200">a = 3 cm</text>
                <text x="-8" y="55" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900 dark:fill-indigo-200" transform="rotate(-90 -8 55)">a = 3 cm</text>
                <text x="88" y="10" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900 dark:fill-indigo-200">a = 3 cm</text>
              </g>
              <text x="100" y="125" textAnchor="middle" className="text-xs font-black fill-indigo-900 dark:fill-indigo-100">
                V = 3 · 3 · 3 = 27 cm³ (27 db 1 cm³-es kiskocka)
              </text>
            </svg>
          </div>

          <TheoryTable
            headers={['Kocka éle (a)', 'Számítás (a · a · a)', 'Térfogata (V)', 'Űrtartalma']}
            rows={[
              ['1 cm', '1 · 1 · 1', '1 cm³', '1 ml'],
              ['2 cm', '2 · 2 · 2', '8 cm³', '8 ml'],
              ['3 cm', '3 · 3 · 3', '27 cm³', '27 ml'],
              ['4 cm', '4 · 4 · 4', '64 cm³', '64 ml'],
              ['5 cm', '5 · 5 · 5', '125 cm³', '125 ml'],
              ['10 cm = 1 dm', '10 · 10 · 10', '1000 cm³ = 1 dm³', '1 liter (1 l)']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: MÉRTÉKEGYSÉG EGYEZTETÉS ÉS ARANYSZABÁLY */}
      <TheorySection
        id="mertekegyseg-egyeztetes"
        title="3. Aranyszabály: Mértékegységek egyeztetése szorzás előtt!"
        subtitle="A tartályos és akváriumi feladatok titkos fegyvere a deciméter"
        badge="STRATÉGIA"
      >
        <TheoryCard title="Hogyan számoljunk akváriumoknál és tartályoknál?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Gyakori hiba, hogy a feladat különböző mértékegységekben adja meg az éleket (pl. centiméter, deciméter, méter).
            <strong>Tilos összeszorozni az éleket, amíg nincsenek ugyanabban a mértékegységben kifejezve!</strong>
          </p>

          <TheoryCallout variant="tip" title="A Profi Trükk: Válts mindent deciméterre (dm)!">
            Ha folyadéktartályról, akváriumról vagy medencéről van szó, és a kérdés az, hogy <strong>hány liter víz fér bele</strong>:
            <br />
            <strong>1. lépés:</strong> Alakítsd át mindhárom élt <strong>deciméterbe (dm)</strong>!
            <br />
            <strong>2. lépés:</strong> Szorozd össze őket: a térfogat <strong>dm³-ben</strong> jön ki.
            <br />
            <strong>3. lépés:</strong> Mivel <strong>1 dm³ = 1 liter</strong>, a kapott szám közvetlenül a literek száma! Nem kell utána bonyolult nullákkal osztani-szorozni!
          </TheoryCallout>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mt-4 text-xs space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 text-sm block">Mintapélda akváriumra:</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Egy akvárium méretei: a = 50 cm, b = 30 cm, magassága m = 40 cm. Hány liter víz fér bele?
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-slate-200">
              <div>• dm-re váltva: a = 5 dm, b = 3 dm, m = 4 dm</div>
              <div>• V = 5 dm · 3 dm · 4 dm = 60 dm³</div>
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">• Mivel 1 dm³ = 1 liter, az akvárium 60 literes!</div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: HIÁNYZÓ ÉL VISSZASZÁMOLÁSA */}
      <TheorySection
        id="visszaszamolas"
        title="4. Hiányzó él visszaszámolása a térfogatból"
        subtitle="Ha a térfogatot és két élet ismerünk, hogyan találjuk meg a harmadikat?"
        badge="VISSZASZÁMOLÁS"
      >
        <TheoryCard title="A szorzás megfordítása: osztás">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Mivel a térfogat a három él szorzata (V = a · b · c), bármelyik ismeretlen élt úgy kapjuk meg, hogy 
            a térfogatot <strong>elosztjuk a másik két él szorzatával (az alapterülettel)</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">
                TÉGLATEST MAGASSÁGA
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-slate-100 font-mono">
                c = V : (a · b) = V : T_alap
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Magasság = Térfogat osztva az alapterülettel.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400 block mb-1">
                KOCKA ÉLE TÉRFOGATBÓL
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-slate-100 font-mono">
                a · a · a = V → a = ?
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Megkeressük azt a számot, amelynek harmadik hatványa (köbe) V.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <strong className="text-indigo-700 dark:text-indigo-400 block mb-1">Példa:</strong>
            Egy téglatest alakú doboz térfogata V = 72 cm³. Alapélei a = 4 cm és b = 3 cm. Milyen magas a doboz?
            <br />
            Alapterület: T_alap = 4 · 3 = 12 cm².
            <br />
            Magasság: c = 72 : 12 = <strong>6 cm</strong>.
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV 3D TÉRFOGAT ÉS VÍZSZINT LABOR */}
      <TheorySection
        id="labor"
        title="5. Interaktív Laboratórium: Tartályméretező és Vízszint Szimulátor"
        subtitle="Változtasd az éleket és a vízszintet, és lásd azonnal a térfogat és a literek változását!"
        badge="INTERAKTÍV"
      >
        <TheoryCard title="Tervezz akváriumot / tartályt!">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Hosszúság (a):</span>
                <span className="text-indigo-600 font-mono">{edgeA} dm</span>
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={edgeA}
                onChange={(e) => setEdgeA(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Szélesség (b):</span>
                <span className="text-indigo-600 font-mono">{edgeB} dm</span>
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={edgeB}
                onChange={(e) => setEdgeB(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Magasság (c):</span>
                <span className="text-indigo-600 font-mono">{edgeC} dm</span>
              </label>
              <input
                type="range"
                min="2"
                max="6"
                value={edgeC}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setEdgeC(val);
                  if (waterHeight > val) setWaterHeight(val);
                }}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Víz magassága:</span>
                <span className="text-cyan-600 font-mono">{waterHeight} dm</span>
              </label>
              <input
                type="range"
                min="0"
                max={edgeC}
                value={waterHeight}
                onChange={(e) => setWaterHeight(Number(e.target.value))}
                className="w-full accent-cyan-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Vizuális 3D tartály vízszinttel */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
              <svg className="w-56 h-44" viewBox="0 0 200 150">
                {/* Tartály külső élei */}
                <rect x="35" y="40" width="85" height="75" fill="none" stroke="#6366f1" strokeWidth="2" />
                <polygon points="35,40 65,15 150,15 120,40" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <polygon points="120,40 150,15 150,90 120,115" fill="none" stroke="#6366f1" strokeWidth="1.5" />

                {/* Víz kitöltés a tartályban */}
                {waterHeight > 0 && (
                  <>
                    {(() => {
                      const hRatio = waterHeight / edgeC;
                      const waterH = 75 * hRatio;
                      const waterY = 115 - waterH;
                      const waterTopY = 40 + (75 - waterH);
                      return (
                        <g opacity="0.75">
                          <rect x="35" y={waterTopY} width="85" height={waterH} fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                          <polygon points={`35,${waterTopY} 65,${waterTopY - 25} 150,${waterTopY - 25} 120,${waterTopY}`} fill="#7dd3fc" stroke="#0284c7" strokeWidth="1" />
                          <polygon points={`120,${waterTopY} 150,${waterTopY - 25} 150,${15 + (75 - waterH) + waterH} 120,115`} fill="#0284c7" stroke="#0284c7" strokeWidth="1" />
                        </g>
                      );
                    })()}
                  </>
                )}

                <text x="77" y="135" textAnchor="middle" className="text-[10px] font-bold fill-indigo-950">
                  {edgeA} dm × {edgeB} dm × {edgeC} dm
                </text>
              </svg>
              <span className="text-xs text-slate-500 mt-1">
                Akvárium telítettsége: <strong>{waterPercent}%</strong> ({waterVolume} liter víz)
              </span>
            </div>

            {/* Eredménykártyák */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="text-xs text-indigo-700 dark:text-indigo-400 block font-bold">MAXIMÁLIS TÉRFOGAT</span>
                <span className="text-2xl font-black text-indigo-950 dark:text-indigo-100">
                  {totalVolume} dm³ = {totalVolume} liter
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-300 block mt-0.5">
                  V = {edgeA} · {edgeB} · {edgeC} = {totalVolume} dm³
                </span>
              </div>

              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <span className="text-xs text-cyan-700 dark:text-cyan-400 block font-bold flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5" />
                  JELENLEGI VÍZMENNYISÉG
                </span>
                <span className="text-2xl font-black text-cyan-950 dark:text-cyan-100">
                  {waterVolume} liter ({waterPercent}%)
                </span>
                <span className="text-xs text-cyan-600 dark:text-cyan-300 block mt-0.5">
                  V_víz = {edgeA} · {edgeB} · {waterHeight} = {waterVolume} liter
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                Alapterület: <strong>{baseArea} dm²</strong> ({baseArea * 100} cm²).
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÍPUSHIBÁK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakori csapdák a térfogatszámításban"
        subtitle="Ezeket a típushibákat kerüld el a dolgozatban!"
        badge="FIGYELEM"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: Különböző mértékegységek összeszorzása',
              description: 'Ha a = 20 cm, b = 3 dm, c = 1 m, NEM szorozhatod össze közvetlenül (20 · 3 · 1 hibás!). Előbb mindent válts azonos egységre (pl. dm-re: 2 · 3 · 10 = 60 dm³).'
            },
            {
              title: '2. CSAPDA: A felszín és a térfogat összekeverése',
              description: 'A felszín a határoló lapok területe (négyzetes: cm²), a térfogat pedig a test által elfoglalt belső tér (köbös: cm³). Képletük és mértékegységük teljesen más!'
            },
            {
              title: '3. CSAPDA: Kocka éleinek duplázása 8-szorozza a térfogatot!',
              description: 'Ha a kocka élét 2-szeresére növeled, a térfogata NEM 2-szeres, hanem 2 · 2 · 2 = 8-szorosára nő! Háromszoros élnél pedig 3 · 3 · 3 = 27-szeresére!'
            },
            {
              title: '4. CSAPDA: Hiányzó él visszaszámolásánál a zárójel elhagyása',
              description: 'Ha számológéppel c = V : (a · b)-t számolsz, ne felejtsd el a zárójelet! V : a · b beírása esetén a gép előbb oszt, majd megszorozza b-vel, ami téves eredményt ad.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
