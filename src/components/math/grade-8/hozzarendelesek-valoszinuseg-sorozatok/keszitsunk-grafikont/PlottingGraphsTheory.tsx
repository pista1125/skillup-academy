import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Pencil,
  Activity,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Layers,
  ArrowRight,
  Maximize2,
  Table,
  Check,
  X
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface PlottingGraphsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PlottingGraphsTheory: React.FC<PlottingGraphsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Grafikonrajzoló Labor állapot: f(x) = a*x + b
  const [slopeA, setSlopeA] = useState<number>(1.5);
  const [interceptB, setInterceptB] = useState<number>(-1);
  const [isDiscrete, setIsDiscrete] = useState<boolean>(false);
  const [showSlopeTriangle, setShowSlopeTriangle] = useState<boolean>(true);

  // SVG koordináta-rendszer paraméterek (-5-től +5-ig mindkét tengelyen)
  const svgWidth = 320;
  const svgHeight = 320;
  const originX = 160;
  const originY = 160;
  const scale = 26; // 1 egység = 26 px

  const mapX = (x: number) => originX + x * scale;
  const mapY = (y: number) => originY - y * scale;

  // Mintapontok értéktáblázathoz
  const sampleXValues = [-2, -1, 0, 1, 2];
  const tablePoints = sampleXValues.map((x) => ({
    x,
    y: Math.round((slopeA * x + interceptB) * 100) / 100
  }));

  // Zérushely kiszámítása (ax + b = 0 -> x = -b/a)
  const zeroRoot = slopeA !== 0 ? Math.round((-interceptB / slopeA) * 100) / 100 : null;

  return (
    <TheoryTemplate
      title="Készítsünk grafikont!"
      subtitle="Értéktáblázat készítése, tengelyek skálázása, a meredekség lépésháromszöge, valamint folytonos és diszkrét grafikonok"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="plotting-graphs-theory-doc"
      pdfFilename="8_osztaly_keszitsunk_grafikont_tananyag.pdf"
      estimatedReadTime="14 perc"
      quickRule={{
        label: 'Alapösszefüggések',
        formula: 'Meredekség: a = Δy / Δx • Tengelymetszet: P(0; b)'
      }}
      themeColor="blue"
      practiceTitle="Készen állsz a grafikonkészítési feladványokra?"
      practiceSubtitle="Gyakorold az értéktáblázatok készítését, a tengelybeosztást, a pontok ábrázolását és a lépésháromszöget a kvízben!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* INTERAKTÍV GRAFIKONRAJZOLÓ LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="Interaktív Grafikonrajzoló Labor"
        subtitle="Állítsd be a meredekséget (a) és a tengelymetszetet (b)! Figyeld meg a pontok ábrázolását, a lépésháromszöget és a táblázatot!"
        badge="Interaktív Szimuláció"
        icon={<Activity className="w-5 h-5 text-blue-600" />}
      >
        <div className="bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 p-5 rounded-3xl border-2 border-blue-200/80 dark:border-blue-900/60 shadow-lg space-y-6">
          {/* Vezérlők */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* a (meredekség) csúszka */}
            <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Meredekség (a):
                </span>
                <span className="font-mono text-sm px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg">
                  a = {slopeA}
                </span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={slopeA}
                onChange={(e) => setSlopeA(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-3 (meredek le)</span>
                <span>0 (vízszintes)</span>
                <span>+3 (meredek fel)</span>
              </div>
            </div>

            {/* b (tengelymetszet) csúszka */}
            <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  y-tengelymetszet (b):
                </span>
                <span className="font-mono text-sm px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-lg">
                  b = {interceptB} (0; {interceptB})
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={interceptB}
                onChange={(e) => setInterceptB(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-4</span>
                <span>0 (origó)</span>
                <span>+4</span>
              </div>
            </div>
          </div>

          {/* Opciók: Folytonos vs Diszkrét és Lépésháromszög kapcsoló */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/80 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Grafikon típusa:</span>
              <button
                type="button"
                onClick={() => setIsDiscrete(false)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  !isDiscrete
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Folytonos egyenes
              </button>
              <button
                type="button"
                onClick={() => setIsDiscrete(true)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  isDiscrete
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Diszkrét pontok (pl. db)
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={showSlopeTriangle}
                onChange={(e) => setShowSlopeTriangle(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
              Lépésháromszög megjelenítése
            </label>
          </div>

          {/* SVG Koordináta-rendszer és Értéktáblázat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG Grafikon (7 col) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 rounded-2xl border-2 border-blue-100 dark:border-slate-800 shadow-inner">
              <svg viewBox="0 0 320 320" className="w-full max-w-[320px] h-auto select-none">
                {/* Rácsvonalak */}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((u) => (
                  <g key={`grid-${u}`}>
                    <line
                      x1={mapX(u)}
                      y1="10"
                      x2={mapX(u)}
                      y2="310"
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    <line
                      x1="10"
                      y1={mapY(u)}
                      x2="310"
                      y2={mapY(u)}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    {/* Számfeliratok */}
                    <text
                      x={mapX(u)}
                      y={mapY(0) + 12}
                      className="text-[8px] font-mono fill-slate-400"
                      textAnchor="middle"
                    >
                      {u}
                    </text>
                    <text
                      x={mapX(0) - 6}
                      y={mapY(u) + 3}
                      className="text-[8px] font-mono fill-slate-400"
                      textAnchor="end"
                    >
                      {u}
                    </text>
                  </g>
                ))}

                {/* Főtengelyek */}
                <line x1="10" y1={mapY(0)} x2="310" y2={mapY(0)} stroke="#334155" strokeWidth="1.6" />
                <line x1={mapX(0)} y1="310" x2={mapX(0)} y2="10" stroke="#334155" strokeWidth="1.6" />
                <polygon points="310,160 302,156 302,164" fill="#334155" />
                <polygon points="160,10 156,18 164,18" fill="#334155" />

                <text x="306" y="152" className="text-[10px] font-bold fill-slate-700" textAnchor="end">x</text>
                <text x="170" y="18" className="text-[10px] font-bold fill-slate-700">y</text>
                <text x="153" y="172" className="text-[8px] font-bold fill-slate-400">0</text>

                {/* Ha FOLYTONOS: Egyenes berajzolása */}
                {!isDiscrete && (
                  <line
                    x1={mapX(-5)}
                    y1={mapY(slopeA * -5 + interceptB)}
                    x2={mapX(5)}
                    y2={mapY(slopeA * 5 + interceptB)}
                    stroke="#2563eb"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                )}

                {/* Lépésháromszög a (0; b) pontból: 1 jobbra, a fel/le */}
                {showSlopeTriangle && !isDiscrete && (
                  <g>
                    {/* Vízszintes lépés: (0; b) -> (1; b) */}
                    <line
                      x1={mapX(0)}
                      y1={mapY(interceptB)}
                      x2={mapX(1)}
                      y2={mapY(interceptB)}
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    {/* Függőleges lépés: (1; b) -> (1; b + a) */}
                    <line
                      x1={mapX(1)}
                      y1={mapY(interceptB)}
                      x2={mapX(1)}
                      y2={mapY(interceptB + slopeA)}
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <text
                      x={mapX(0.5)}
                      y={mapY(interceptB) + (slopeA >= 0 ? 10 : -4)}
                      className="text-[8px] font-black fill-emerald-700"
                      textAnchor="middle"
                    >
                      +1 lépés
                    </text>
                    {slopeA !== 0 && (
                      <text
                        x={mapX(1) + 6}
                        y={mapY(interceptB + slopeA / 2) + 3}
                        className="text-[8px] font-black fill-purple-700"
                      >
                        {slopeA > 0 ? `+${slopeA}` : `${slopeA}`}
                      </text>
                    )}
                  </g>
                )}

                {/* Értéktáblázatbeli pontok ábrázolása */}
                {tablePoints.map((pt, idx) => {
                  const isVisible = pt.y >= -5 && pt.y <= 5;
                  if (!isVisible) return null;
                  return (
                    <circle
                      key={`pt-${idx}`}
                      cx={mapX(pt.x)}
                      cy={mapY(pt.y)}
                      r={pt.x === 0 ? "5" : "4"}
                      fill={pt.x === 0 ? "#10b981" : isDiscrete ? "#d97706" : "#2563eb"}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* y-tengelymetszet kiemelő címke */}
                {interceptB >= -5 && interceptB <= 5 && (
                  <g transform={`translate(${mapX(0) + 8}, ${mapY(interceptB) - 6})`}>
                    <rect width="52" height="15" rx="4" fill="#10b981" fillOpacity="0.9" />
                    <text x="26" y="10" className="text-[7.5px] font-mono font-black fill-white" textAnchor="middle">
                      (0; {interceptB})
                    </text>
                  </g>
                )}
              </svg>

              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> y-metszet: (0; b)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Rácspontok
                </span>
                {isDiscrete && (
                  <span className="flex items-center gap-1 text-amber-700 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Diszkrét pontok
                  </span>
                )}
              </div>
            </div>

            {/* Értéktáblázat és Képletelemzés (5 col) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5" />
                    Értéktáblázat:
                  </span>
                  <span className="font-mono font-black text-xs text-indigo-700 dark:text-indigo-300 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 rounded border border-indigo-200">
                    f(x) = {slopeA !== 0 ? `${slopeA}x` : ''} {interceptB > 0 ? `+ ${interceptB}` : interceptB < 0 ? `- ${Math.abs(interceptB)}` : slopeA === 0 ? '0' : ''}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-center border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <th className="p-1 border border-slate-200 dark:border-slate-700">x</th>
                        {tablePoints.map((p) => (
                          <th key={`th-${p.x}`} className="p-1 border border-slate-200 dark:border-slate-700 font-bold">
                            {p.x}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200">
                        <td className="p-1 border border-slate-200 dark:border-slate-700 font-bold">y</td>
                        {tablePoints.map((p) => (
                          <td
                            key={`td-${p.x}`}
                            className={`p-1 border border-slate-200 dark:border-slate-700 font-semibold ${
                              p.x === 0 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-black' : ''
                            }`}
                          >
                            {p.y}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">y-tengelymetszet:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">(0; {interceptB})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Zérushely (f(x) = 0):</span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">
                      {zeroRoot !== null ? `x = ${zeroRoot}` : 'Nincs (párhuzamos az x-tengellyel)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monotonitás:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {slopeA > 0 ? 'Szigorúan monoton növekvő' : slopeA < 0 ? 'Szigorúan monoton csökkenő' : 'Állandó (konstans)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hasznos tipp kártya */}
              <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <span className="font-black flex items-center gap-1 text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5" /> Rajzolási aranyszabály:
                </span>
                <p className="leading-relaxed">
                  Lineáris függvény ábrázolásához <strong>legalább 3 pontot</strong> számolj ki! Két pont kijelöli az egyenest, a harmadik pedig ellenőrzi, hogy nem történt-e számolási hiba.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 1. SZAKASZ: AZ ÉRTÉKTÁBLÁZATTÓL A GRAFIKONIG */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. A Grafikonkészítés 5 Lépése"
        subtitle="Hogyan jutunk el a matematikai hozzárendelési szabálytól a precíz grafikonig?"
        badge="Alapfogalmak"
        icon={<Compass className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Értelmezési Tartomány"
            subtitle="Milyen x értékek megengedettek?"
            icon={<CheckCircle2 className="w-4 h-4 text-blue-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tisztázzuk, hogy az x független változó milyen számokat vehet fel! Hétköznapi feladatban pl. darabszám (egész számok), míg függvénytanban általában a valós számok halmaza (minden szám).
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Értéktáblázat Készítése"
            subtitle="Számoljunk ki 3-5 pontot!"
            icon={<Table className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Válasszunk kényelmes x értékeket (pl. x = 0, egy pozitív és egy negatív egész szám, vagy tört meredekségnél a nevező többszöröseit). Helyettesítsük be a képletbe a megfelelő y értékekért.
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Tengelyek és Skálázás"
            subtitle="Határozzuk meg a beosztást!"
            icon={<Pencil className="w-4 h-4 text-purple-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Rajzoljunk egymásra merőleges tengelyeket. Nyíl jelzi a növekvő irányt, feliratozzuk az x és y változókat vagy a mértékegységeket. A beosztásnak egy tengelyen belül egyenletesnek kell lennie!
            </p>
          </TheoryCard>

          <TheoryCard
            title="4. Pontok Bejelölése"
            subtitle="Koordináták rögzítése"
            icon={<Layers className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Minden (x; y) számpárnak egy pont felel meg a síkban. Először vízszintesen lépünk az x értékig, majd onnan függőlegesen fel vagy le az y értékig. Pontos, hegyes ceruzát használjunk!
            </p>
          </TheoryCard>

          <TheoryCard
            title="5. Összekötés vagy sem?"
            subtitle="Folytonos vs. diszkrét eldöntése"
            icon={<TrendingUp className="w-4 h-4 text-rose-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha az értelmezési tartomány folytonos (pl. idő, hossz, tömeg), a pontokat egyenes vonallal vagy sima görbével kötjük össze. Ha darabszám, személyek, dobások száma szerepel, <strong>tilos összekötni</strong>!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Ellenőrző 3. Pont"
            subtitle="A hibák azonnali kiszűrése"
            icon={<Sparkles className="w-4 h-4 text-teal-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Lineáris függvény esetén a pontoknak egy egyenesre kell esniük! Ha a vonalzó nem fekszik rá mindhárom pontra egyszerre, valamelyik koordináta kiszámításánál hiba történt.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout title="Példa: f(x) = -2x + 3 értéktáblázata" variant="info">
          <div className="space-y-2 text-xs">
            <p>Válasszuk az x = -1, 0, 2 értékeket:</p>
            <ul className="list-disc list-inside space-y-1 font-mono">
              <li>x = -1 esetén: f(-1) = -2 · (-1) + 3 = 2 + 3 = 5 pont: (-1; 5)</li>
              <li>x = 0 esetén: f(0) = -2 · 0 + 3 = 3 pont: (0; 3) (y-tengelymetszet)</li>
              <li>x = 2 esetén: f(2) = -2 · 2 + 3 = -4 + 3 = -1 pont: (2; -1)</li>
            </ul>
            <p>Mindhárom pont egy egyenesre illeszkedik, és lefelé lejt, mert a meredekség negatív (a = -2).</p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: TENGELYEK HELYES SKÁLÁZÁSA */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. A Tengelyek Skálázása és Beosztása"
        subtitle="Mikor és miért lehet eltérő a két tengely skálája?"
        badge="Gyakorlati Tudnivalók"
        icon={<Maximize2 className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-4">
          <TheoryCallout title="Aranyszabály: A két tengely skálája ELTÉRHET egymástól!" variant="success">
            <p className="text-xs leading-relaxed">
              Sokan tévesen azt hiszik, hogy az x és az y tengelyen kötelező pontosan ugyanakkora egységet választani (pl. 1 rács = 1 egység).
              Valós életbeli alkalmazásokban azonban a két mennyiség nagyságrendje drámaian eltérhet!
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-800 dark:text-emerald-200">Példa: Autó útja</span>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  x tengely: idő (0 - 4 óra) -&gt; 1 rács = 0,5 óra<br />
                  y tengely: út (0 - 300 km) -&gt; 1 rács = 50 km
                </p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-800 dark:text-emerald-200">Példa: Vásárlás összege</span>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  x tengely: alma tömege (0 - 5 kg) -&gt; 1 rács = 0,5 kg<br />
                  y tengely: fizetendő (0 - 3000 Ft) -&gt; 1 rács = 500 Ft
                </p>
              </div>
            </div>
          </TheoryCallout>

          <TheoryTrapBox title="Tipikus hibák a skálázás során">
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li><strong>Nem egyenletes lépésköz egy tengelyen belül:</strong> Súlyos hiba pl. 1, 2, 5, 10-et írni egyenlő rácsközönként! Egy adott tengelyen minden beosztási egységnek pontosan ugyanannyit kell érnie.</li>
              <li><strong>Hiányzó mértékegységek és tengelynevek:</strong> Ha nincs odaírva az x mellé a (perc) vagy (kg), az y mellé a (°C) vagy (Ft), a grafikon elveszíti értelmét.</li>
              <li><strong>Túl apró grafikon rajzolása a füzet sarkába:</strong> Használjuk ki a rendelkezésre álló helyet! A túl kicsi ábrán a pontok leolvasása pontatlanná válik.</li>
            </ul>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: GYORS ÁBRÁZOLÁS A LÉPÉSHÁROMSZÖGGEL */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Gyors Ábrázolás: A Lépésháromszög Technika"
        subtitle="Hogyan rajzoljunk meg egy egyenest 5 másodperc alatt az a és b paraméterekből?"
        badge="Gyors módszer"
        icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Nem feltétlenül szükséges hosszú értéktáblázatot számolni, ha ismerjük az f(x) = ax + b függvény két kulcsfontosságú geometriai jelentését:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> 1. Lépés: A kiinduló pont (b)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A b konstans érték mindig az <strong>y-tengelymetszet</strong>. Jelöljük be a függőleges y-tengelyen a (0; b) pontot! Ez a biztos kezdőpontunk.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-purple-200 dark:border-purple-900 space-y-2">
              <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4" /> 2. Lépés: Lépésháromszög (a)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A (0; b) pontból lépjünk <strong>1 egységet jobbra</strong> az x mentén, majd:
                <br />• ha a &gt; 0: lépjünk <strong>a egységet fel</strong>
                <br />• ha a &lt; 0: lépjünk <strong>|a| egységet le</strong>
              </p>
            </div>
          </div>

          <TheoryCallout title="Mi a teendő, ha a meredekség egy közönséges tört?" variant="info">
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Példa: f(x) = (3/4)x - 2
              </p>
              <p className="leading-relaxed">
                Ha 1 egységet lépnénk jobbra, akkor 3/4 egységet kellene felfelé lépnünk, ami a négyzethálón nehezen mérhető pontosan. Helyette használjuk a tört értelmezését:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 font-mono text-center space-y-1">
                <span className="text-blue-800 dark:text-blue-300 font-bold">
                  Meredekség = delta y / delta x = 3 (fel) / 4 (jobbra)
                </span>
                <p className="text-[11px] text-slate-500">
                  A (0; -2) pontból <strong>4 rácsot lépünk jobbra</strong> és <strong>3 rácsot fel</strong> -&gt; megkapjuk a pontos (4; 1) rácspontot!
                </p>
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: FOLYTONOS VAGY DISZKRÉT? */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Folytonos vagy Diszkrét Grafikon?"
        subtitle="Mikor szabad és mikor tilos összekötni a pontokat folytonos vonallal?"
        badge="Modellezés"
        icon={<Layers className="w-5 h-5 text-amber-600" />}
      >
        <TheoryTable
          headers={['Jellemző', 'Folytonos Grafikon (Folytonos vonal)', 'Diszkrét Grafikon (Pontok halmaza)']}
          rows={[
            [
              'Értelmezési tartomány',
              'Valós számok, intervallum (pl. idő, hossz, tömeg, hőmérséklet)',
              'Egész számok, darabszámok, megszámlálható dolgok'
            ],
            [
              'Két pont közötti érték',
              'Létezik és értelmezhető (pl. 2,5 másodperc, 1,7 liter víz)',
              'Nincs értelme a valóságban (pl. 2,4 mozijegy, 1,5 személy)'
            ],
            [
              'Hétköznapi példák',
              'Futó mozgása, hűlő tea hőmérséklete, kád vízszintje',
              'Fagylaltgombócok ára, buszon utazók száma, dobókocka dobások'
            ],
            [
              'Megjelenítés a füzetben',
              'Folytonos egyenes vonal vagy görbe',
              'Csak a különálló pontok (esetleg vékony függőleges szaggatott vonalak)'
            ]
          ]}
        />

        <TheoryTrapBox title="Gyakori témazáró csapdafeladat:">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            „Egy füzet ára 250 Ft. Ábrázold a vásárolt füzetek száma és az értük fizetendő összeg közötti összefüggést!”<br />
            Ha a diák összeköti a (0; 0), (1; 250), (2; 500), (3; 750) pontokat egyenes vonallal, a tanár <strong>hibapontot ad</strong>, mert a boltban nem vehetünk 1,3 darab füzetet 325 Ft-ért. A helyes megoldás: <strong>csak a különálló pontok megjelölése</strong>!
          </p>
        </TheoryTrapBox>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PlottingGraphsTheory;
