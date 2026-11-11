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
  ArcAndSectorGeometrySvg,
  CircularSegmentDissectionSvg
} from './CentralAngleArcSectorFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  PieChart,
  Sparkles,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CentralAngleArcSectorTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CentralAngleArcSectorTheory: React.FC<CentralAngleArcSectorTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State ---
  const [alphaDeg, setAlphaDeg] = useState<number>(80);
  const [radiusR, setRadiusR] = useState<number>(6);

  const PI = Math.PI;
  const betaDeg = alphaDeg / 2;
  const arcLength = (2 * PI * radiusR * alphaDeg) / 360;
  const sectorArea = (PI * radiusR * radiusR * alphaDeg) / 360;

  // Háromszög területe: 0.5 * r * r * sin(alpha)
  const alphaRad = (alphaDeg * PI) / 180;
  const triangleArea = 0.5 * radiusR * radiusR * Math.sin(alphaRad);
  const segmentArea = Math.max(0, sectorArea - triangleArea);

  const applyPreset = (preset: 'thales' | 'quadrant' | 'hexagon') => {
    if (preset === 'thales') {
      setAlphaDeg(180);
      setRadiusR(6);
    } else if (preset === 'quadrant') {
      setAlphaDeg(90);
      setRadiusR(6);
    } else if (preset === 'hexagon') {
      setAlphaDeg(60);
      setRadiusR(6);
    }
  };

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Középponti és kerületi szög, körív és körcikk"
      subtitle="A kerületi és középponti szögek tétele (α = 2β), a Thálész-tétel, a körív hossza és a körcikk területe (T = i·r / 2)."
      themeColor="blue"
      pdfFilename="10_osztaly_kozepponti_es_keruleti_szogek_tananyag.pdf"
      quickRule={{
        label: 'A KÖRÍV, KÖRCIKK ÉS SZÖGEK ARANYSZABÁLYAI',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-blue-50/90 p-2.5 rounded-xl border border-blue-200">
              <span className="font-black text-blue-900 block mb-0.5">Alapösszefüggések:</span>
              <ul className="space-y-1 font-mono text-blue-950 mt-1">
                <li>• <strong>Szögtétel:</strong> α = 2β (ugyanazon az íven a középponti szög a kerületi szög 2-szerese!)</li>
                <li>• <strong>Thálész-tétel:</strong> Átmérőhöz tartozó kerületi szög mindig 90°!</li>
                <li>• <strong>Körív hossza:</strong> i = (2πr · α) / 360° = (πrα) / 180°</li>
                <li>• <strong>Körcikk területe:</strong> T_c = (πr² · α) / 360° = (i · r) / 2</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] leading-tight font-medium">
              <strong>💡 ELEGÁNS KAPCSOLAT:</strong> A körcikk területe pontosan úgy számítható ki, mint a háromszögé: <MathText>{'T = \\frac{\\text{alap} \\cdot \\text{magasság}}{2} = \\frac{i \\cdot r}{2}'}</MathText>!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a középponti és kerületi szögek feladataira?"
      practiceSubtitle="Számíts ívhosszat, körcikket és körszeletet a 30 kérdéses kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border-2 border-blue-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-blue-100">
                  Interaktív Középponti &amp; Kerületi Szög és Körcikk Labor
                </h3>
                <p className="text-xs text-blue-300/80">
                  Változtasd a középponti szöget (α) és a sugarat (r)! Figyeld a kerületi szög felét és az ívhosszat!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${alphaDeg === 180 ? 'bg-blue-500 text-white font-bold border-blue-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => applyPreset('thales')}
              >
                Thálész (180° / 90°)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${alphaDeg === 90 ? 'bg-blue-500 text-white font-bold border-blue-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => applyPreset('quadrant')}
              >
                Negyedkör (90°)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${alphaDeg === 60 ? 'bg-blue-500 text-white font-bold border-blue-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => applyPreset('hexagon')}
              >
                Hatszög (60°)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vezérlők */}
            <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-blue-800/40">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                Szög és sugár beállítása
              </span>

              {/* alpha szög */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span>Középponti szög (α):</span>
                  <span className="font-mono text-amber-300 font-bold">{alphaDeg}°</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="240"
                  step="5"
                  value={alphaDeg}
                  onChange={(e) => setAlphaDeg(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* sugár */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span>Sugár (r):</span>
                  <span className="font-mono text-cyan-300 font-bold">{radiusR} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={radiusR}
                  onChange={(e) => setRadiusR(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Számított eredmények gyors doboza */}
              <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Kerületi szög (β = α/2):</span>
                  <strong className="text-emerald-400 font-bold">{betaDeg.toFixed(1)}°</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Körív hossza (i):</span>
                  <strong className="text-cyan-300">{arcLength.toFixed(2)} cm</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Körcikk területe (T_c):</span>
                  <strong className="text-amber-300">{sectorArea.toFixed(2)} cm²</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Körszelet területe (T_sz):</span>
                  <strong className="text-rose-300">{segmentArea.toFixed(2)} cm²</strong>
                </div>
              </div>
            </div>

            {/* Dinamikus SVG megjelenítő */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg viewBox="0 0 340 240" className="w-full max-w-[360px] h-auto select-none">
                  {(() => {
                    const cx = 170;
                    const cy = 130;
                    const r_px = 80;

                    // Szögek radiánban (jobbra 0 foktól indulva felfelé)
                    const halfAlpha = (alphaDeg / 2) * (Math.PI / 180);
                    const p1x = cx + r_px * Math.cos(-halfAlpha);
                    const p1y = cy + r_px * Math.sin(-halfAlpha);
                    const p2x = cx + r_px * Math.cos(halfAlpha);
                    const p2y = cy + r_px * Math.sin(halfAlpha);

                    // Kerületi szög csúcsa P a kör bal oldalán: (-1, 0) irányban
                    const px = cx - r_px;
                    const py = cy;

                    const largeArcFlag = alphaDeg > 180 ? 1 : 0;

                    return (
                      <g>
                        {/* Alapkör */}
                        <circle cx={cx} cy={cy} r={r_px} fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

                        {/* Körcikk területe (kitöltve) */}
                        <path
                          d={`M ${cx} ${cy} L ${p1x} ${p1y} A ${r_px} ${r_px} 0 ${largeArcFlag} 1 ${p2x} ${p2y} Z`}
                          fill="#3b82f6"
                          fillOpacity="0.25"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />

                        {/* Ív hossza (vastag piros) */}
                        <path
                          d={`M ${p1x} ${p1y} A ${r_px} ${r_px} 0 ${largeArcFlag} 1 ${p2x} ${p2y}`}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />

                        {/* Kerületi szög szárai P pontból */}
                        <line x1={px} y1={py} x2={p1x} y2={p1y} stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 2" />
                        <line x1={px} y1={py} x2={p2x} y2={p2y} stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 2" />

                        {/* Középpont O */}
                        <circle cx={cx} cy={cy} r="3.5" fill="#f8fafc" />
                        <text x={cx - 15} y={cy + 15} fill="#f8fafc" fontSize="10" fontWeight="bold">O</text>

                        {/* P pont (kerületi csúcs) */}
                        <circle cx={px} cy={py} r="4" fill="#10b981" />
                        <text x={px - 14} y={py + 4} fill="#34d399" fontSize="11" fontWeight="bold">P</text>
                        <text x={px + 8} y={py + 4} fill="#34d399" fontSize="10" fontWeight="bold">β={betaDeg.toFixed(1)}°</text>

                        {/* Középponti szög címke */}
                        <text x={cx + 12} y={cy + 4} fill="#f59e0b" fontSize="11" fontWeight="bold">α={alphaDeg}°</text>

                        {/* Ív címke */}
                        <text x={cx + r_px + 8} y={cy} fill="#ef4444" fontSize="11" fontWeight="bold">i</text>
                      </g>
                    );
                  })()}
                </svg>
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  <span className="text-amber-400 font-bold">Középponti szög α = {alphaDeg}°</span> &bull;{' '}
                  <span className="text-emerald-400 font-bold">Kerületi szög β = {betaDeg.toFixed(1)}°</span> (pontosan a fele!).
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* 1. Szakasz: Középponti és kerületi szögek tétele */}
      <TheorySection
        id="kozepponti-keruleti-szogek"
        number={1}
        title="A középponti és kerületi szögek tétele"
        badge="FŐTÉTEL"
        badgeColor="blue"
      >
        <TheoryCard title="Mi a kapcsolat az íven fekvő szögek között?" color="blue">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Egy körben egy adott ívhez kétféle nevezetes szög rendelhető:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 my-2 text-xs sm:text-sm">
            <li><strong>Középponti szög (<MathText>{'\\alpha'}</MathText>):</strong> Csúcsa a kör középpontjában (<MathText>{'O'}</MathText>) van, szárai a kör sugarai.</li>
            <li><strong>Kerületi szög (<MathText>{'\\beta'}</MathText>):</strong> Csúcsa a körvonalon helyezkedik el, szárai a kör húrjai.</li>
          </ul>

          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 space-y-1 text-xs sm:text-sm my-3 font-semibold">
            <span>A kerületi és középponti szögek alaptétele:</span>
            <p className="font-mono text-base font-bold text-blue-900 dark:text-blue-300">
              <MathText>{'\\alpha = 2\\beta \\iff \\beta = \\frac{\\alpha}{2}'}</MathText>
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400 font-normal">
              Egy körben az ugyanazon ívhez tartozó középponti szög mindig kétszerese a kerületi szögnek!
            </p>
          </div>

          <TheoryCallout type="info" title="A tétel közvetlen következménye">
            Mivel az <MathText>{'\\alpha'}</MathText> középponti szög fix, az adott ívhez tartozó <strong>bármelyik kerületi szög egyenlő</strong>, 
            függetlenül attól, hogy a körvonal melyik pontjában van a csúcsa!
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: A Thálész-tétel mint speciális eset */}
      <TheorySection
        id="thalesz-tetel-kapcsolat"
        number={2}
        title="A Thálész-tétel mint a kerületi szög tétel speciális esete"
        badge="THÁLÉSZ"
        badgeColor="indigo"
      >
        <TheoryCard title="Mi történik, ha a középponti szög egyenes szög (180°)?" color="indigo">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha a körben az ív egy félkör, akkor a hozzá tartozó középponti szög <MathText>{'\\alpha = 180^\\circ'}</MathText> (egyenes).
            A kerületi szög tételét alkalmazva:
          </p>
          <div className="my-2 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-indigo-950 dark:text-indigo-300 font-bold text-center">
            <MathText>{'\\beta = \\frac{\\alpha}{2} = \\frac{180^\\circ}{2} = 90^\\circ'}</MathText>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
            Ez pontosan <strong>Thálész tétele</strong>: A kör átmérőjének két végpontjából a körvonal bármely más pontja 
            derékszög (<MathText>{'90^\\circ'}</MathText>) alatt látszik!
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Körív és Körcikk */}
      <TheorySection
        id="koriv-korcikk-kepletek"
        number={3}
        title="A körív hossza és a körcikk területe"
        badge="KÉPLETEK"
        badgeColor="teal"
      >
        <TheoryCard title="Arányossági levezetés a 360 fokos teljes körből" color="teal">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A <MathText>{'360^\\circ'}</MathText>-os teljes kör kerülete <MathText>{'2\\pi r'}</MathText>, területe pedig <MathText>{'\\pi r^2'}</MathText>.
                Egy <MathText>{'\\alpha'}</MathText> középponti szögű körcikk a teljes körnek pontosan az <MathText>{'\\frac{\\alpha}{360^\\circ}'}</MathText> részét képezi:
              </p>
              <div className="space-y-2 font-mono">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800">
                  <span className="text-teal-700 dark:text-teal-400 font-bold block">1. Körív hossza:</span>
                  <MathText>{'i = 2\\pi r \\cdot \\frac{\\alpha}{360^\\circ} = \\frac{\\pi r \\alpha}{180^\\circ}'}</MathText>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800">
                  <span className="text-teal-700 dark:text-teal-400 font-bold block">2. Körcikk területe:</span>
                  <MathText>{'T_c = \\pi r^2 \\cdot \\frac{\\alpha}{360^\\circ} = \\frac{i \\cdot r}{2}'}</MathText>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <ArcAndSectorGeometrySvg size={300} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Körszelet */}
      <TheorySection
        id="korszelet-geometria"
        number={4}
        title="A körszelet területe: cikk mínusz háromszög"
        badge="KÖRSZELET"
        badgeColor="amber"
      >
        <TheoryCard title="Hogyan határozzuk meg a húr által levágott darabot?" color="amber">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A körszeletet egy körív és az ív végpontjait összekötő húr határolja. Területét úgy kapjuk meg, 
                hogy a megfelelő <strong>körcikk területéből kivonjuk a két sugár és a húr alkotta egyenlő szárú háromszög területét</strong>:
              </p>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-mono text-amber-950 dark:text-amber-300 font-bold">
                <MathText>{'T_{\\text{szelet}} = T_{\\text{körcikk}} - T_{\\Delta} = \\frac{\\pi r^2 \\alpha}{360^\\circ} - \\frac{r^2 \\sin\\alpha}{2}'}</MathText>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <CircularSegmentDissectionSvg size={300} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szakasz: Mintapéldák */}
      <TheorySection
        id="szog-mintapeldak"
        number={5}
        title="Kidolgozott érettségi mintapéldák"
        badge="MINTAPÉLDÁK"
        badgeColor="blue"
      >
        <TheoryCard title="Mintapélda: Körcikk és körszelet egy 90 fokos negyedkörben" color="blue">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy <MathText>{'r = 10\\text{ cm}'}</MathText> sugarú körben egy <MathText>{'\\alpha = 90^\\circ'}</MathText>-os középponti szög tartozik egy ívhez.
              Számítsuk ki: a) az ív hosszát, b) a körcikk területét, c) a hozzá tartozó körszelet területét!
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Megoldás:</span>
              <ol className="list-decimal list-inside space-y-1.5 font-mono text-xs">
                <li>
                  <strong>Ívhossz:</strong> <MathText>{'i = \\frac{\\pi \\cdot 10 \\cdot 90^\\circ}{180^\\circ} = 5\\pi \\approx 15{,}71\\text{ cm}'}</MathText>.
                </li>
                <li>
                  <strong>Körcikk területe:</strong> <MathText>{'T_c = \\frac{\\pi \\cdot 10^2 \\cdot 90^\\circ}{360^\\circ} = \\frac{100\\pi}{4} = 25\\pi \\approx 78{,}54\\text{ cm}^2'}</MathText>.
                  <br />(Ellenőrzés: <MathText>{'T_c = \\frac{i \\cdot r}{2} = \\frac{5\\pi \\cdot 10}{2} = 25\\pi'}</MathText> ✓)
                </li>
                <li>
                  <strong>Háromszög területe:</strong> Mivel a szög <MathText>{'90^\\circ'}</MathText>, a két sugár egymásra merőleges, így derékszögű háromszöget alkotnak:
                  <MathText>{'T_\\Delta = \\frac{r \\cdot r}{2} = \\frac{10 \\cdot 10}{2} = 50\\text{ cm}^2'}</MathText>.
                </li>
                <li>
                  <strong>Körszelet területe:</strong> <MathText>{'T_{sz} = T_c - T_\\Delta = 78{,}54 - 50 = 28{,}54\\text{ cm}^2'}</MathText>.
                </li>
              </ol>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. Szakasz: Csapdák */}
      <TheorySection
        id="szog-csapdak"
        number={6}
        title="Tipikus buktatók a szögek és ívek számításánál"
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="Osztás 180° vs 360°"
          trap="A körív képletében 360°-kal, a körcikkében pedig 180°-kal kell osztani."
          wrong="i = (πr · α) / 360°  vagy  T_c = (πr² · α) / 180°"
          wrongExplanation="HIBA! A teljes kör 360°, a teljes kerület 2πr. Ha 2-vel egyszerűsítesz, az ívnél marad 180° a nevezőben (πrα / 180°). A területnél nincs kettes szorzó, ott mindig 360° van a nevezőben: (πr²α / 360°)!"
          correct="Mindig gondolj a teljes körre: arány = α / 360°. Ezt szorzod a kerülettel (2πr) vagy területtel (πr²)!"
          correctExplanation="Így sosem rontod el: i = 2πr · (α/360°) és T_c = πr² · (α/360°)."
          tip="Jegyezd meg a T_c = (i · r) / 2 képletet! Ha az ívhossz már megvan, a körcikk területe egyetlen egyszerű szorzással adódik!"
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
