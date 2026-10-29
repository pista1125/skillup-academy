// Updated DistancesTheory
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
  MoveHorizontal,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileCode,
  Layers,
  Scale,
  Compass,
  Circle,
  Minimize2
} from 'lucide-react';
import {
  PointLineDistanceSvg,
  ParallelDistanceSvg,
  LociSvg
} from './DistancesFigures';

interface DistancesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const DistancesTheory: React.FC<DistancesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV TÁVOLSÁG & PROJEKCIÓ LABOR ÁLLAPOTOK ---
  const [pointY, setPointY] = useState<number>(6); // P pont y koordinátája (távolság az x tengelytől)
  const [obliqueX, setObliqueX] = useState<number>(8); // Ferde szakasz vetületi hossza x tengelyen

  // Számítások
  const distanceData = useMemo(() => {
    const perpDist = Math.abs(pointY); // Merőleges távolság |PT|
    const obliqueDist = Math.sqrt(pointY * pointY + obliqueX * obliqueX); // Ferde távolság |PQ|
    const diff = obliqueDist - perpDist;

    return {
      perpDist,
      obliqueDist: Number(obliqueDist.toFixed(2)),
      diff: Number(diff.toFixed(2))
    };
  }, [pointY, obliqueX]);

  return (
    <TheoryTemplate
      title="5. Távolságok"
      subtitle="A távolság fogalma, pont és egyenes, párhuzamosok távolsága, és a nevezetes távolság-alapú mértani helyek a síkban"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-tavolsagok"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • TANANYAG"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "FŐ SZABÁLYOK: TÁVOLSÁGOK A GEOMETRIÁBAN",
        description: "A távolság a két alakzat közötti legrövidebb összekötő szakasz hossza:",
        formula: "d(P, e) = |PT|  (ahol PT ⊥ e)",
        details: (
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-black">Pont és egyenes távolsága:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a pontból az egyenesre bocsátott MERŐLEGES szakasz hossza</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Párhuzamosok távolsága:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">közös merőleges szakaszuk hossza (mindenütt állandó)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-black">Két ponttól egyenlő távolságra:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a szakaszfelező merőleges egyenes (f_AB) pontjai</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-black">Két metsző egyenestől egyenlő távolságra:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a szögfelező egyenesek párja (egymásra merőlegesek)</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: A TÁVOLSÁG FOGALMA ÉS A LEGRÖVIDEBB ÚT ELVE
      ========================================================================= */}
      <TheorySection
        title="1. A távolság fogalma és matematikai tulajdonságai"
        icon={<MoveHorizontal className="w-6 h-6 text-cyan-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A geometriában két alakzat <strong>távolságán</strong> az egyik alakzat egy tetszőleges pontját a másik alakzat egy pontjával összekötő szakaszok közül a <strong>lehető legrövidebb</strong> szakasz hosszát értjük.
            </p>
            <TheoryCallout
              title="A távolság alaptulajdonságai (Axiómák)"
              type="info"
            >
              Bármely két $A$ és $B$ pont távolságára teljesül:
              <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs text-slate-700">
                <li><strong>Nemnegativitás:</strong> $d(A, B) \ge 0$, és $d(A, B) = 0 \iff A = B$.</li>
                <li><strong>Szimmetria:</strong> $d(A, B) = d(B, A)$.</li>
                <li><strong>Háromszög-egyenlőtlenség:</strong> $d(A, C) \le d(A, B) + d(B, C)$ (az egyenes út a legrövidebb!).</li>
              </ul>
            </TheoryCallout>
            <p className="text-xs text-slate-600">
              Két pont távolsága az őket összekötő szakasz hossza: $d(A, B) = |AB|$.
            </p>
          </div>
          <div className="flex justify-center">
            <PointLineDistanceSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: PONT ÉS EGYENES TÁVOLSÁGA
      ========================================================================= */}
      <TheorySection
        title="2. Pont és egyenes távolsága: a merőleges vetület"
        icon={<Minimize2 className="w-6 h-6 text-emerald-600" />}
      >
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Ha egy $P$ pont nincs rajta az $e$ egyenesen, végtelen sok ponttal köthető össze. Miért éppen a merőleges szakasz a távolság?
          </p>

          <TheoryCallout
            title="Tétel: A merőleges a legrövidebb szakasz"
            type="tip"
          >
            A $P$ pontból az $e$ egyenesre bocsátott merőleges egyenes talppontja legyen $T$. Az egyenes bármely más $Q \ne T$ pontjára:
            <div className="font-mono text-center font-bold text-emerald-800 dark:text-emerald-300 py-1">
              $|PT| &lt; |PQ|$
            </div>
            <strong>Bizonyítás:</strong> A $PTQ$ háromszög $T$-nél derékszögű. A derékszögű háromszögben a derékszöggel szemközti oldal az átfogó ($PQ$), amely mindig hosszabb a befogónál ($PT$): $|PQ|^2 = |PT|^2 + |TQ|^2 &gt; |PT|^2$.
          </TheoryCallout>

          <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200 text-xs text-slate-700">
            <strong>Definíció:</strong> Egy pont és egy egyenes távolsága a pontból az egyenesre bocsátott merőleges szakasz hossza: $d(P, e) = |PT|$. Ha $P \in e$, akkor $d(P, e) = 0$.
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: PÁRHUZAMOS EGYENESEK TÁVOLSÁGA
      ========================================================================= */}
      <TheorySection
        title="3. Párhuzamos egyenesek távolsága és a középpárhuzamos"
        icon={<Scale className="w-6 h-6 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Két párhuzamos egyenes ($e \parallel f$) egymástól vett távolsága az egyik egyenes tetszőleges pontjának a másik egyenestől mért távolsága.
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block text-sm">Állandó távolság elve:</strong>
                A párhuzamos egyenesek távolsága a sík minden pontjában ugyanakkora. A rájuk merőleges szakaszok téglalapokat alkotnak az egyenesekkel.
              </li>
              <li className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-900 block text-sm">A középpárhuzamos ($k$):</strong>
                Azon pontok halmaza a síkban, amelyek a két párhuzamos egyenestől egyenlő ($d/2$) távolságra vannak. Ez egy velük párhuzamos egyenes pontosan felező távolságban.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ParallelDistanceSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: ALAPVETŐ MÉRTANI HELYEK TÁVOLSÁGOK ALAPJÁN
      ========================================================================= */}
      <TheorySection
        title="4. Távolság-alapú mértani helyek a síkban"
        icon={<Compass className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A <strong>mértani hely</strong> azon pontok összessége (ponthalmaza), amelyek egy adott geometriai feltételt kielégítenek. A négy legfontosabb távolsági mértani hely:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2 bg-blue-50 rounded border border-blue-200">
                <strong>1. Ponttól $r$ távolságra lévő pontok:</strong> az $O$ középpontú, $r$ sugarú <em>körvonal</em> ($k(O, r)$).
              </li>
              <li className="p-2 bg-emerald-50 rounded border border-emerald-200">
                <strong>2. Két ponttól ($A, B$) egyenlő távolságra:</strong> az $AB$ szakasz <em>szakaszfelező merőleges egyenese</em> {"($f_{AB}$)"}.
              </li>
              <li className="p-2 bg-purple-50 rounded border border-purple-200">
                <strong>3. Két metsző egyenestől ($e, f$) egyenlő távolságra:</strong> a szögfelező egyenesek párja ($w_1, w_2$), melyek egymásra merőlegesek!
              </li>
              <li className="p-2 bg-amber-50 rounded border border-amber-200">
                <strong>4. Egyenestől ($e$) $d$ távolságra:</strong> két, $e$-vel párhuzamos egyenes a távolság mindkét oldalán.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <LociSvg size={350} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV TÁVOLSÁG & PROJEKCIÓ LABOR (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Távolság & Merőleges Szakasz Labor"
        icon={<Sliders className="w-6 h-6 text-cyan-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Állítsd be a $P$ pont magasságát (merőleges távolságát az egyenestől), és a ferde szakasz talpponttól mért eltolását! Figyeld meg a Pitagorasz-tétel segítségével, hogy a merőleges szakasz mindig szigorúan a legrövidebb!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Bal: Vezérlők és számítások */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-cyan-700 dark:text-cyan-400">Merőleges távolság (|PT| = d):</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{pointY} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={pointY}
                  onChange={(e) => setPointY(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-amber-700 dark:text-amber-400">Ferde pont eltolása (|TQ|):</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{obliqueX} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={obliqueX}
                  onChange={(e) => setObliqueX(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Kiértékelő kártya */}
              <div className="p-4 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 border-b pb-1">
                  Összehasonlítás a Pitagorasz-tétellel:
                </div>
                <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                  <div>• Merőleges távolság ($d = |PT|$): <strong className="text-emerald-600">{distanceData.perpDist} cm</strong></div>
                  <div>• Ferde szakasz hossza ($|PQ| = \sqrt{'{' + pointY + '^2 + ' + obliqueX + '^2}'}$): <strong className="text-amber-600">{distanceData.obliqueDist} cm</strong></div>
                  <div className="pt-1.5 border-t border-slate-100 text-slate-500">
                    A ferde szakasz <strong>{distanceData.diff} cm-rel hosszabb</strong> a merőlegesnél!
                  </div>
                </div>
              </div>
            </div>

            {/* Jobb: Dinamikus SVG illusztráció */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[200px]">
              <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto select-none">
                {(() => {
                  const scale = 8;
                  const originX = 60;
                  const originY = 140;
                  const py = originY - pointY * scale;
                  const qx = originX + obliqueX * scale;

                  return (
                    <g>
                      {/* Egyenes e */}
                      <line x1="20" y1={originY} x2="220" y2={originY} stroke="#0284c7" strokeWidth="2" />
                      <text x="225" y={originY + 4} fontSize="11" fontWeight="bold" fill="#0284c7">e</text>

                      {/* Merőleges szakasz PT */}
                      <line x1={originX} y1={py} x2={originX} y2={originY} stroke="#059669" strokeWidth="2.5" />
                      {/* Magyar derékszög jelölés negyedkörív + pont */}
                      <path d={`M ${originX} ${originY - 14} A 14 14 0 0 1 ${originX + 14} ${originY}`} fill="none" stroke="#059669" strokeWidth="1.2" />
                      <circle cx={originX + 5} cy={originY - 5} r="1.2" fill="#059669" />

                      {/* Ferde szakasz PQ */}
                      <line x1={originX} y1={py} x2={qx} y2={originY} stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 2" />

                      {/* Pontok */}
                      <circle cx={originX} cy={py} r="4" fill="#e11d48" />
                      <text x={originX - 10} y={py - 4} fontSize="11" fontWeight="bold" fill="#e11d48">P</text>

                      <circle cx={originX} cy={originY} r="3" fill="#059669" />
                      <text x={originX} y={originY + 16} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#059669">T (d = {pointY})</text>

                      <circle cx={qx} cy={originY} r="3" fill="#f59e0b" />
                      <text x={qx} y={originY + 16} fontSize="10" textAnchor="middle" fill="#d97706">Q</text>
                    </g>
                  );
                })()}
              </svg>
              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Magyar derékszög-jelölés a talppontban
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS BUKTATÓK
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák a távolságoknál és mértani helyeknél"
        traps={[
          {
            trap: "Nem merőleges szakaszt mérnek pont és egyenes távolságaként",
            correction: "A pont és egyenes távolsága definíció szerint a MERŐLEGES szakasz hossza! Bármely ferde szakasz hosszabb a valódi távolságnál.",
            severity: "critical"
          },
          {
            trap: "Két metsző egyenestől egyenlő távolságra csak 1 szögfelezőt rajzolnak",
            correction: "Két metsző egyenes négy szöget alkot, így KÉT egymásra merőleges szögfelező egyenes létezik (egy belső és egy külső szögfelező), mindkettő pontjai egyenlő távol vannak a két egyenestől!",
            severity: "moderate"
          },
          {
            trap: "Párhuzamos egyenes távolsága ferdén mérve",
            correction: "Két párhuzamos távolságát mindig a közös merőlegesük mentén kell mérni. A két egyenest metsző ferde egyenes darabja mindig hosszabb a távolságnál.",
            severity: "moderate"
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryTable
        title="Távolságok és mértani helyek összefoglalása"
        headers={['Geometriai objektumok', 'Távolság definíciója', 'Mértani hely (egyenlő távolságra lévők halmaza)']}
        rows={[
          ['Két pont (A és B)', '|AB| szakasz hossza', 'Szakaszfelező merőleges egyenes (f_AB)'],
          ['Pont (P) és egyenes (e)', 'Merőleges szakasz (|PT|, ahol PT ⊥ e)', 'Adott ponttól adott távolságra: körvonal'],
          ['Két párhuzamos egyenes (e ∥ f)', 'Közös merőleges szakasz hossza', 'Középpárhuzamos egyenes (felező távolságban)'],
          ['Két metsző egyenes (e és f)', 'Metszésponton kívül 0 távolság', 'Két egymásra merőleges szögfelező egyenes'],
          ['Egyenestől d távolság', 'd mérték', 'Két darab, az egyenessel párhuzamos egyenes']
        ]}
      />
    </TheoryTemplate>
  );
};
