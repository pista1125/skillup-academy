import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  SlopeTriangleSvg,
  SlopeTypesSvg,
  ParallelPerpendicularSvg
} from './SlopeFigures';
import {
  TrendingUp,
  MoveHorizontal,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight,
  Calculator,
  Scale
} from 'lucide-react';

interface SlopeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SlopeTheory: React.FC<SlopeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV MEREDEKSÉG LABOR ---
  const [p1x, setP1x] = useState<number>(-2);
  const [p1y, setP1y] = useState<number>(-1);
  const [p2x, setP2x] = useState<number>(2);
  const [p2y, setP2y] = useState<number>(3);

  // Meredekség és különbségek számítása
  const deltaX = p2x - p1x;
  const deltaY = p2y - p1y;
  const isVertical = deltaX === 0;
  const slope = isVertical ? null : deltaY / deltaX;

  // Koordináta transzformáció: SVG 320 x 240, origó (160, 120), 1 egység = 22px
  const toSvgX = (x: number) => 160 + x * 22;
  const toSvgY = (y: number) => 120 - y * 22;

  return (
    <TheoryTemplate
      title="8. Egyenesek meredeksége"
      subtitle="A meredekség (iránymutató) fogalma, kiszámítása két pontból, emelkedő és süllyedő egyenesek, párhuzamosság és merőlegesség."
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: "A meredekség alapkészlete",
        formula: "m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁) | Párhuzamos: m₁ = m₂ | Merőleges: m₁ · m₂ = -1",
        align: "right"
      }}
    >
      {/* 1. SZEKCIÓ: A MEREDEKSÉG FOGALMA */}
      <TheorySection
        title="Mi a meredekség (m) fogalma?"
        subtitle="Hogyan méri a matematika egy egyenes hajlását vagy emelkedési ütemét?"
        icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed">
            <p>
              A meredekség (jele: <code className="font-mono font-bold text-emerald-600 text-sm">m</code>) azt fejezi ki,
              hogy a vízszintes tengely mentén <strong>1 egységet jobbra lépve</strong> hány egységgel változik (emelkedik vagy süllyed) az egyenes magassága.
            </p>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                A meredekség alapképelte két pontból:
              </span>
              <p className="font-mono text-base font-bold text-emerald-950 text-center py-1 bg-white/80 rounded border border-emerald-200">
                m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁) &nbsp;&nbsp;(x₁ ≠ x₂)
              </p>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Ahol <code className="font-semibold">Δy</code> a függőleges elmozdulás (magasságváltozás), míg <code className="font-semibold">Δx</code> a vízszintes elmozdulás.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <SlopeTriangleSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Az irányháromszög: m a magasságváltozás és a vízszintes lépés hányadosa
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV KÉTPONTOS MEREDEKSÉG LABOR */}
      <TheorySection
        title="Interaktív Kétpontos Meredekség Labor"
        subtitle="Mozgasd a P₁ és P₂ pontokat, és figyeld az egyenes hajlásszögét és a meredekség számítását!"
        icon={<Sliders className="w-6 h-6 text-emerald-500" />}
      >
        <div className="bg-gradient-to-br from-emerald-50/40 via-white to-blue-50/40 p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* P1 pont vezérlő */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  P₁ pont koordinátái:
                </label>
                <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  P₁({p1x}; {p1y})
                </span>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>x₁:</span>
                  <span className="font-bold font-mono">{p1x}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={p1x}
                  onChange={(e) => setP1x(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>y₁:</span>
                  <span className="font-bold font-mono">{p1y}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={p1y}
                  onChange={(e) => setP1y(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>
            </div>

            {/* P2 pont vezérlő */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  P₂ pont koordinátái:
                </label>
                <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  P₂({p2x}; {p2y})
                </span>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>x₂:</span>
                  <span className="font-bold font-mono">{p2x}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={p2x}
                  onChange={(e) => setP2x(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>y₂:</span>
                  <span className="font-bold font-mono">{p2y}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={p2y}
                  onChange={(e) => setP2y(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Vizualizáció + Számított Meredekség és Elemzés */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG koordinátasík */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-inner">
              <svg
                width={320}
                height={240}
                viewBox="0 0 320 240"
                className="select-none bg-slate-50 rounded-lg"
              >
                {/* Rács */}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`sx-${i}`}
                    x1={toSvgX(i)}
                    y1={10}
                    x2={toSvgX(i)}
                    y2={230}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`sy-${i}`}
                    x1={20}
                    y1={toSvgY(i)}
                    x2={300}
                    y2={toSvgY(i)}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}

                {/* Főtengelyek */}
                <line x1={20} y1={120} x2={300} y2={120} stroke="#475569" strokeWidth="2" />
                <line x1={160} y1={10} x2={160} y2={230} stroke="#475569" strokeWidth="2" />
                <text x={295} y={115} fill="#475569" fontSize="11" fontWeight="bold">x</text>
                <text x={166} y={20} fill="#475569" fontSize="11" fontWeight="bold">y</text>
                <text x={164} y={134} fill="#94a3b8" fontSize="10">0</text>

                {/* Egyenes */}
                {!isVertical && slope !== null ? (
                  <line
                    x1={toSvgX(-5)}
                    y1={toSvgY(p1y + slope * (-5 - p1x))}
                    x2={toSvgX(5)}
                    y2={toSvgY(p1y + slope * (5 - p1x))}
                    stroke="#2563eb"
                    strokeWidth="3"
                  />
                ) : (
                  <line
                    x1={toSvgX(p1x)}
                    y1={10}
                    x2={toSvgX(p1x)}
                    y2={230}
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                )}

                {/* Irányháromszög */}
                {!isVertical && (
                  <>
                    <line
                      x1={toSvgX(p1x)}
                      y1={toSvgY(p1y)}
                      x2={toSvgX(p2x)}
                      y2={toSvgY(p1y)}
                      stroke="#059669"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={toSvgX(p2x)}
                      y1={toSvgY(p1y)}
                      x2={toSvgX(p2x)}
                      y2={toSvgY(p2y)}
                      stroke="#d97706"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />
                  </>
                )}

                {/* P1 pont */}
                <circle cx={toSvgX(p1x)} cy={toSvgY(p1y)} r={6} fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x={toSvgX(p1x) + 7} y={toSvgY(p1y) - 6} fill="#b91c1c" fontSize="10" fontWeight="bold">
                  P₁
                </text>

                {/* P2 pont */}
                <circle cx={toSvgX(p2x)} cy={toSvgY(p2y)} r={6} fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x={toSvgX(p2x) + 7} y={toSvgY(p2y) - 6} fill="#1d4ed8" fontSize="10" fontWeight="bold">
                  P₂
                </text>
              </svg>
              <div className="flex items-center gap-4 text-xs mt-2 text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> Δx = {deltaX}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" /> Δy = {deltaY}
                </span>
              </div>
            </div>

            {/* Számított eredmények és levezetés */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-4 rounded-xl border ${
                isVertical
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1">
                  Meredekség Levezetése:
                </span>
                {isVertical ? (
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-rose-700">Függőleges egyenes (x = {p1x})</p>
                    <p className="font-mono">Δx = {p2x} - ({p1x}) = 0</p>
                    <p className="text-rose-800">
                      Mivel nullával nem oszthatunk, <strong>nincs meredeksége</strong>, és nem is alkot függvényt!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs font-mono">
                    <p>Δy = y₂ - y₁ = {p2y} - ({p1y}) = <span className="font-bold">{deltaY}</span></p>
                    <p>Δx = x₂ - x₁ = {p2x} - ({p1x}) = <span className="font-bold">{deltaX}</span></p>
                    <p className="text-sm font-bold pt-1 border-t border-emerald-200">
                      m = {deltaY} / {deltaX} = <span className="text-emerald-700 text-base">{slope?.toFixed(2)}</span>
                    </p>
                  </div>
                )}
              </div>

              {!isVertical && slope !== null && (
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block">
                    Egyenes jellege:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Irány:</span>
                    {slope > 0 ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Emelkedő egyenes (m &gt; 0)
                      </span>
                    ) : slope < 0 ? (
                      <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">
                        Süllyedő egyenes (m &lt; 0)
                      </span>
                    ) : (
                      <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                        Vízszintes egyenes (m = 0)
                      </span>
                    )}
                  </div>
                  {slope !== 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1 text-slate-600 font-mono text-[11px]">
                      <p>Párhuzamos meredeksége: m_párh = {slope.toFixed(2)}</p>
                      <p>Merőleges meredeksége: m_meről = {(-1 / slope).toFixed(2)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A 4 MEREDEKSÉG-TÍPUS */}
      <TheorySection
        title="A meredekség 4 alaptípusa"
        subtitle="Hogyan tükrözi az m előjele az egyenes térbeli állását?"
        icon={<MoveHorizontal className="w-6 h-6 text-emerald-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-slate-700 leading-relaxed text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <strong className="text-emerald-900 text-sm block mb-0.5">1. Emelkedő egyenes (m &gt; 0)</strong>
              Ha balról jobbra haladunk (x nő), a függvényérték nő (y emelkedik). Az egyenes hegyesszöget zár be az x tengely pozitív irányával.
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <strong className="text-rose-900 text-sm block mb-0.5">2. Süllyedő egyenes (m &lt; 0)</strong>
              Ha x nő, a magasság csökken. Az egyenes tompaszöget zár be az x tengely pozitív irányával.
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <strong className="text-blue-900 text-sm block mb-0.5">3. Vízszintes egyenes (m = 0)</strong>
              A magasság állandó (Δy = 0), párhuzamos az x tengellyel: konstans függvény (f(x) = c).
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <strong className="text-amber-900 text-sm block mb-0.5">4. Függőleges egyenes (nincs meredeksége)</strong>
              Δx = 0, nullával nem lehet osztani. Függőleges vonal (x = c), ami NEM függvény!
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <SlopeTypesSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Emelkedő, süllyedő, vízszintes és függőleges egyenesek összevetése
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: PÁRHUZAMOS ÉS MERŐLEGES EGYENESEK */}
      <TheorySection
        title="Párhuzamos és merőleges egyenesek feltétele"
        subtitle="Hogyan ismerhető fel az egyenesek geometriai viszonya pusztán a meredekségükből?"
        icon={<Scale className="w-6 h-6 text-emerald-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-xs">
            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
              <span className="font-black text-blue-900 uppercase tracking-wider block text-sm">
                Párhuzamos egyenesek (e₁ ∥ e₂)
              </span>
              <p className="font-mono font-bold text-blue-800 text-base">m₁ = m₂</p>
              <p>
                Két nem függőleges egyenes akkor és csak akkor párhuzamos, ha a meredekségük pontosan megegyezik.
                <br />
                <em>Példa:</em> f(x) = 3x - 1 és g(x) = 3x + 5 párhuzamosak, mert m₁ = m₂ = 3.
              </p>
            </div>
            <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl space-y-1">
              <span className="font-black text-purple-900 uppercase tracking-wider block text-sm">
                Merőleges egyenesek (e₁ ⊥ e₂)
              </span>
              <p className="font-mono font-bold text-purple-800 text-base">m₁ · m₂ = -1 &nbsp;➔&nbsp; m₂ = -1 / m₁</p>
              <p>
                Két nem tengelypárhuzamos egyenes akkor és csak akkor merőleges egymásra, ha meredekségeik szorzata -1 (egymás negatív reciprokai).
                <br />
                <em>Példa:</em> Ha m₁ = 2, akkor a rá merőleges egyenes meredeksége m₂ = -1/2 = -0.5.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <ParallelPerpendicularSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Párhuzamosság (m₁ = m₂) és merőlegesség (m₁ · m₂ = -1)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI TÉVEDÉSEK */}
      <TheorySection
        title="Gyakori tévedések és buktatók"
        subtitle="Ezekre ügyelj a meredekségszámítási feladatoknál!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. A tört felcserélése (Δx / Δy hiba)"
            trap="Sokan a vízszintes különbséget teszik a számlálóba: (x₂ - x₁) / (y₂ - y₁)."
            solution="A meredekség MINDIG a függőleges változás osztva a vízszintessel: m = Δy / Δx! A magasság van felül."
          />
          <TheoryTrapBox
            title="2. Koordináták sorrendjének felcserélése"
            trap="A számlálóban y₂ - y₁-et számolunk, a nevezőben viszont x₁ - x₂-t (megcseréljük a pontok sorrendjét)."
            solution="Mindig ugyanabból a pontból vonjuk ki a másikat! Ha fent P₂ - P₁, lent is kötelező P₂ - P₁ sorrendet tartani."
          />
          <TheoryTrapBox
            title="3. Negatív előjelek kivonása"
            trap="P₁(2; -3) és P₂(5; 1) esetén: Δy = 1 - 3 = -2."
            solution="Vigyázz a kettős negatívra: Δy = 1 - (-3) = 1 + 3 = +4!"
          />
          <TheoryTrapBox
            title="4. 'm = 0' és a 'nincs meredeksége' keverése"
            trap="A vízszintes és függőleges egyenesekre egyaránt azt mondjuk, hogy 'nincs meredekségük'."
            solution="A vízszintes egyenesnek VAN meredeksége, és az pontosan 0 (m = 0)! Csak a függőleges egyenesnek nincs meredeksége, mert ott a nevező 0."
          />
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        title="Meredekségi összefoglaló táblázat"
        subtitle="A meredekség minden geometriai és algebrai állapota"
        icon={<Lightbulb className="w-6 h-6 text-emerald-500" />}
      >
        <TheoryTable
          headers={['Egyenes típusa', 'Meredekség (m)', 'Irányháromszög', 'Függvénykapcsolat']}
          rows={[
            ['Erősen emelkedő', 'm > 1 (pl. m = 3)', 'Δy nagyobb, mint Δx', 'Meredeken felszaladó egyenes'],
            ['45°-os emelkedő', 'm = 1', 'Δy = Δx (egyenlő szárú)', 'f(x) = x (főátló felező)'],
            ['Lankásan emelkedő', '0 < m < 1 (pl. m = 0.5)', 'Δx nagyobb, mint Δy', 'Lassan növekvő egyenes'],
            ['Vízszintes', 'm = 0', 'Δy = 0', 'f(x) = c (konstans függvény)'],
            ['Süllyedő egyenes', 'm < 0 (pl. m = -2)', 'Δy negatív irányú', 'Jobbra haladva lejtős egyenes'],
            ['Függőleges', 'Nem létezik (Δx = 0)', 'Nincs vízszintes lépés', 'x = c (NEM függvény!)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

