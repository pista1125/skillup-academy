// Updated CircleTheory
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
  Circle,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileCode,
  Layers,
  Scale,
  Compass,
  PieChart
} from 'lucide-react';
import {
  CirclePartsSvg,
  LineCirclePositionsSvg,
  TangentSegmentsSvg
} from './CircleFigures';

interface CircleTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CircleTheory: React.FC<CircleTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV KÖR ÉS EGYENES LABOR ÁLLAPOTOK ---
  const [radius, setRadius] = useState<number>(6); // Kör sugara (r)
  const [lineDist, setLineDist] = useState<number>(4); // Egyenes távolsága a középponttól (d)

  // Pozíció és számítások
  const lineAnalysis = useMemo(() => {
    let positionName = '';
    let positionDesc = '';
    let pointsCount = 0;
    let chordLength = 0;
    let badgeColor = '';

    if (lineDist < radius) {
      positionName = 'Szelő egyenes (d < r)';
      positionDesc = 'Az egyenes két pontban metszi a kört, és egy húrt metsz ki belőle.';
      pointsCount = 2;
      chordLength = 2 * Math.sqrt(radius * radius - lineDist * lineDist);
      badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
    } else if (lineDist === radius) {
      positionName = 'Érintő egyenes (d = r)';
      positionDesc = 'Az egyenes pontosan egy pontban érinti a kört. Az érintési pontba húzott sugár merőleges az egyenesre!';
      pointsCount = 1;
      chordLength = 0;
      badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
    } else {
      positionName = 'Külső egyenes (d > r)';
      positionDesc = 'Az egyenes a körön kívül halad, nincs közös pontja a körvonallal.';
      pointsCount = 0;
      chordLength = 0;
      badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
    }

    return {
      positionName,
      positionDesc,
      pointsCount,
      chordLength: Number(chordLength.toFixed(2)),
      badgeColor
    };
  }, [radius, lineDist]);

  return (
    <TheoryTemplate
      title="6. A kör"
      subtitle="A kör részei (húr, ív, körcikk, körszelet), a kör és egyenes kölcsönös helyzete, valamint az érintőszakaszok tétele"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-kor"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • TANANYAG"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "FŐ SZABÁLYOK: A KÖR ÉS AZ ÉRINTŐ TÉTELEI",
        description: "A kör alapvető összefüggései és az érintő tulajdonságai:",
        formula: "d = 2r  |  OE ⊥ e  |  |PE_1| = |PE_2| = √(d² - r²)",
        details: (
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-rose-600 dark:text-rose-400 font-black">Húr és átmérő:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">leghosszabb húr az átmérő (2r). Húrtávolság: d = √(r² - (h/2)²)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-black">Érintő alaptétele:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">az érintési pontba húzott sugár MERŐLEGES az érintőre (OE ⊥ e)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Érintőszakaszok tétele:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">külső P pontból húzott két érintőszakasz egyenlő: |PE₁| = |PE₂|</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-black">Érintőnégyszög tétele:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">szemközti oldalak összege egyenlő: a + c = b + d</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: A KÖR DEFINÍCIÓJA ÉS RÉSZEI
      ========================================================================= */}
      <TheorySection
        title="1. A körvonal és a kör részei"
        icon={<Circle className="w-6 h-6 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A <strong>körvonal</strong> azon síkbeli pontok mértani helye, amelyek egy rögzített $O$ ponttól (a kör középpontjától) adott $r$ távolságra (a sugár) vannak. A körvonal által határolt síkrész a <strong>körlap</strong>.
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-900 block text-sm">Vonalas elemek:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Sugár ($r$):</strong> a középpontot a körvonal bármely pontjával összekötő szakasz hossza.</li>
                  <li><strong>Húr:</strong> a körvonal két tetszőleges pontját összekötő szakasz.</li>
                  <li><strong>Átmérő ($d = 2r$):</strong> a középponton átmenő húr, a kör <em>leghosszabb</em> húrja.</li>
                  <li><strong>Körív:</strong> a körvonal két pontja közé eső darabja.</li>
                </ul>
              </li>
              <li className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200">
                <strong className="text-indigo-900 block text-sm">Területi elemek (Gyakori keveredés!):</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Körcikk (pizza-szelet):</strong> két sugár és egy körív által határolt síkrész.</li>
                  <li><strong>Körszelet:</strong> egy húr és az általa levágott körív által határolt síkrész.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <CirclePartsSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: KÖR ÉS EGYENES KÖLCSÖNÖS HELYZETE
      ========================================================================= */}
      <TheorySection
        title="2. A kör és egyenes kölcsönös helyzete (szelő, érintő, külső egyenes)"
        icon={<Scale className="w-6 h-6 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Egy kör és egy egyenes kölcsönös helyzetét a kör $O$ középpontjának az egyenestől mért $d = d(O, e)$ távolsága és a kör $r$ sugarának viszonya dönti el:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block text-sm">1. Szelő egyenes ($d &lt; r$):</strong>
                Az egyenes a körvonalat pontosan <strong>két pontban</strong> metszi ($A$ és $B$). A kör belsejébe eső $AB$ szakasz a kimetszett <em>húr</em>. A húr hossza:
                <div className="font-mono mt-0.5 text-blue-800 font-bold">
                  {"$h = 2\\sqrt{r^2 - d^2} \\quad \\implies \\quad d = \\sqrt{r^2 - (h/2)^2}$"}
                </div>
              </li>
              <li className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-900 block text-sm">2. Érintő egyenes ($d = r$):</strong>
                Az egyenesnek pontosan <strong>egyetlen közös pontja</strong> van a körrel ($E$ érintési pont).
                <p className="mt-1 font-semibold text-rose-800">
                  ALAPTÉTEL: Az érintési pontba húzott sugár mindig merőleges az érintőre ($OE \perp e$)!
                </p>
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block text-sm">3. Külső egyenes ($d &gt; r$):</strong>
                Az egyenesnek <strong>nincs közös pontja</strong> a körvonallal.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <LineCirclePositionsSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: ÉRINTŐSZAKASZOK TÉTELE
      ========================================================================= */}
      <TheorySection
        title="3. Az érintőszakaszok tétele külső pontból"
        icon={<Compass className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Ha egy körön kívüli $P$ pontból érintőket húzunk a körhöz, pontosan <strong>két érintőegyenes</strong> szerkeszthető.
            </p>
            <TheoryCallout
              title="Az érintőszakaszok tétele"
              type="tip"
            >
              A külső $P$ pontból a körhöz húzott két érintőszakasz hossza egyenlő:
              <div className="font-mono text-center font-bold text-purple-800 dark:text-purple-300 py-1">
                {"$|PE_1| = |PE_2| = \\sqrt{d^2 - r^2}$"}
              </div>
              ahol $d = |OP|$ a pont és a kör középpontjának távolsága, $r$ a sugár.
            </TheoryCallout>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• Az $OPE_1$ és $OPE_2$ derékszögű háromszögek egybevágók (átfogójuk közös: $OP$, befogójuk $r$).</li>
              <li>• Az $OP$ egyenes szimmetriatengely: felezi a két érintő szögét ($E_1PE_2$) és a két sugár szögét ($E_1OE_2$) is!</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <TangentSegmentsSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: ÉRINTŐNÉGYSZÖGEK TÉTELE
      ========================================================================= */}
      <TheorySection
        title="4. Érintőnégyszögek alaptétele"
        icon={<Layers className="w-6 h-6 text-amber-600" />}
      >
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Egy négyszöget <strong>érintőnégyszögnek</strong> nevezünk, ha van olyan kör, amely mind a négy oldalát belülről érinti (beírt kör).
          </p>
          <TheoryCallout
            title="Tétel az érintőnégyszögek szemközti oldalairól"
            type="info"
          >
            Egy konvex négyszög pontosan akkor érintőnégyszög, ha a szemközti oldalainak összege egyenlő:
            <div className="font-mono text-center font-bold text-amber-800 dark:text-amber-300 py-1 text-base">
              $a + c = b + d$
            </div>
            <strong>Bizonyítás:</strong> A csúcsokból a beírt körhöz húzott érintőszakaszok páronként egyenlők. A csúcsokból induló szakaszok: $x, x, y, y, z, z, w, w$. Az $a + c$ és $b + d$ összegek mindegyike $x + y + z + w$-vel egyenlő!
          </TheoryCallout>
          <p className="text-xs text-slate-500 italic">
            <strong>Példák érintőnégyszögre:</strong> minden négyzet, minden rombusz, minden konvex deltoid automatikusan érintőnégyszög!
          </p>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV KÖR ÉS EGYENES LABOR (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Kör és Egyenes Laboratórium"
        icon={<Sliders className="w-6 h-6 text-rose-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Állítsd be a kör sugarát ($r$) és az egyenes középponttól vett távolságát ($d$)! Figyeld meg az egyenes típusát (szelő, érintő, külső egyenes), a kimetszett húr hosszát és a derékszögű kapcsolatokat valós időben!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Bal: Csúszkák és számítások */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-rose-700 dark:text-rose-400">Kör sugara (r):</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{radius} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-blue-700 dark:text-blue-400">Egyenes távolsága a középponttól (d):</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{lineDist} cm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="1"
                  value={lineDist}
                  onChange={(e) => setLineDist(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Eredménykártya */}
              <div className={`p-4 rounded-xl border ${lineAnalysis.badgeColor} space-y-2 text-xs`}>
                <div className="flex items-center justify-between font-bold">
                  <span>{lineAnalysis.positionName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 font-mono">
                    {lineAnalysis.pointsCount} közös pont
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {lineAnalysis.positionDesc}
                </p>
                {lineAnalysis.pointsCount === 2 && (
                  <div className="pt-1.5 border-t border-blue-200 font-mono">
                    Kimetszett húr hossza: <strong>h = 2 · √({radius}² - {lineDist}²) = {lineAnalysis.chordLength} cm</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Jobb: Dinamikus SVG illusztráció */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[200px]">
              <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto select-none">
                {(() => {
                  const scale = 7;
                  const cx = 120;
                  const cy = 90;
                  const rPx = radius * scale;
                  const dPx = lineDist * scale;
                  const lineY = cy + dPx;

                  return (
                    <g>
                      {/* Kör */}
                      <circle cx={cx} cy={cy} r={rPx} fill="rgba(244, 63, 94, 0.08)" stroke="#e11d48" strokeWidth="2" />
                      <circle cx={cx} cy={cy} r="3" fill="#be123c" />
                      <text x={cx - 10} y={cy - 4} fontSize="10" fontWeight="bold" fill="#be123c">O</text>

                      {/* Távolságvonal (merőleges szakasz) */}
                      <line x1={cx} y1={cy} x2={cx} y2={lineY} stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
                      <text x={cx + 6} y={cy + dPx / 2 + 4} fontSize="9" fontWeight="bold" fill="#0284c7">d = {lineDist}</text>

                      {/* Egyenes */}
                      <line x1="20" y1={lineY} x2="220" y2={lineY} stroke="#0284c7" strokeWidth="2" />
                      <text x="224" y={lineY + 4} fontSize="10" fontWeight="bold" fill="#0284c7">e</text>

                      {/* Magyar derékszög jelölés a talppontban */}
                      {lineDist > 0 && (
                        <>
                          <path d={`M ${cx} ${lineY - 10} A 10 10 0 0 1 ${cx + 10} ${lineY}`} fill="none" stroke="#0284c7" strokeWidth="1" />
                          <circle cx={cx + 4} cy={lineY - 4} r="1" fill="#0284c7" />
                        </>
                      )}

                      {/* Metszéspontok ha szelő */}
                      {lineDist < radius && (() => {
                        const halfChordPx = Math.sqrt(rPx * rPx - dPx * dPx);
                        return (
                          <>
                            <circle cx={cx - halfChordPx} cy={lineY} r="3.5" fill="#e11d48" />
                            <circle cx={cx + halfChordPx} cy={lineY} r="3.5" fill="#e11d48" />
                            <line x1={cx - halfChordPx} y1={lineY} x2={cx + halfChordPx} y2={lineY} stroke="#e11d48" strokeWidth="3" />
                          </>
                        );
                      })()}

                      {/* Érintési pont ha érintő */}
                      {lineDist === radius && (
                        <circle cx={cx} cy={lineY} r="4" fill="#059669" />
                      )}
                    </g>
                  );
                })()}
              </svg>
              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Magyar derékszög-jelölés a merőleges vetületnél
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS BUKTATÓK
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus buktatók a kör geometriájában"
        traps={[
          {
            trap: "Körcikk és körszelet összekeverése",
            correction: "A KÖRCIKKET sugarak határolják a középpontból (mint a tortaszelet), míg a KÖRSZELETET egy húr vágja le a kör peremén!",
            severity: "critical"
          },
          {
            trap: "Elfelejtik, hogy az érintési sugár merőleges az érintőre",
            correction: "Az érintési ponthoz húzott sugár mindig 90°-os szöget zár be az érintővel. Ezzel a derékszögű háromszöggel alkalmazható a Pitagorasz-tétel!",
            severity: "critical"
          },
          {
            trap: "Húrtávolság számításánál a teljes húrhosszal számolnak",
            correction: "A középpontból a húrra bocsátott merőleges FELEZI a húrt! A Pitagorasz-tételben a befogó hossza h / 2, nem pedig h: d = √(r² - (h/2)²)!",
            severity: "moderate"
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryTable
        title="A kör és egyenes helyzetei, összefüggései"
        headers={['Kölcsönös helyzet', 'Feltétel (d és r)', 'Közös pontok', 'Nevezetes összefüggés']}
        rows={[
          ['Szelő egyenes', 'd < r', '2 metszéspont', 'Húr hossza: h = 2 · √(r² - d²)'],
          ['Érintő egyenes', 'd = r', '1 érintési pont', 'OE ⊥ e (érintési sugár merőleges az érintőre)'],
          ['Külső egyenes', 'd > r', '0 pont', 'Nincs metszéspont'],
          ['Érintőszakaszok', 'Külső P pont', '2 érintési pont', '|PE₁| = |PE₂| = √(d² - r²)'],
          ['Érintőnégyszög', 'Beírt kör létezik', '4 érintési pont', 'Szemközti oldalak összege: a + c = b + d']
        ]}
      />
    </TheoryTemplate>
  );
};

