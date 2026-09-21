import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BasicElementsDiagram,
  LineRelationshipsDiagram,
  AngleTypesDiagram,
  ConvexConcaveDiagram,
  PolygonDiagonalsDiagram
} from './GeometryDiagrams';
import { cn } from '@/lib/utils';
import {
  Compass,
  Shapes,
  Maximize2,
  Minimize2,
  Divide,
  MoveHorizontal,
  Target,
  Sparkles,
  Layers,
  HelpCircle,
  Calculator,
  Plus,
  Minus
} from 'lucide-react';

export interface PlanarShapesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export function PlanarShapesTheory({
  onBack = () => {},
  onStartQuiz,
  onSwitchToQuiz
}: PlanarShapesTheoryProps) {
  // Workshop State: Interactive Polygon Explorer (n = 3..10)
  const [polygonN, setPolygonN] = useState<number>(5);

  // Computed values for n-gon
  const totalDiagonals = (polygonN * (polygonN - 3)) / 2;
  const diagonalsFromOneVertex = polygonN - 3;
  const trianglesCount = polygonN - 2;
  const internalAngleSum = (polygonN - 2) * 180;
  const regularInternalAngle = (internalAngleSum / polygonN).toFixed(1);

  // Generate regular polygon points for SVG
  const generatePolygonPoints = (n: number, radius: number = 55, cx: number = 80, cy: number = 75) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
      pts.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }
    return pts;
  };

  const polyPoints = generatePolygonPoints(polygonN);
  const polyPointsStr = polyPoints.map((p) => `${p.x},${p.y}`).join(' ');

  const sections: TheorySection[] = [
    // 1. SZAKASZ: ALAPFOGALMAK
    {
      id: 'sec-basic-elements',
      title: '1. Alapfogalmak a geometriában (Pont, egyenes, félegyenes, szakasz)',
      icon: <Compass className="w-5 h-5 text-cyan-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A síkgeometria a <strong>síkbeli alakzatokkal</strong>, pontokkal és vonalakkal foglalkozik.
            Ezek a legalapvetőbb építőkövei minden bonyolultabb alakzatnak (háromszögeknek, négyszögeknek, köröknek).
          </p>

          <BasicElementsDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <TheoryCard title="Pont" badge="Alapfogalom" variant="rose">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Kiterjedés (hosszúság, szélesség) nélküli geometriai alapelem.
                <strong> Nyomtatott nagybetűkkel</strong> jelöljük: A, B, C, P, Q.
              </p>
            </TheoryCard>

            <TheoryCard title="Egyenes" badge="Végtelen" variant="purple">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mindkét irányban <strong>végtelenül meghosszabbítható</strong> vonal.
                <strong> Kisbetűkkel</strong> vagy két pontjával jelöljük: e, f, g vagy AB.
              </p>
            </TheoryCard>

            <TheoryCard title="Félegyenes" badge="Félig zárt" variant="cyan">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Az egyenesnek egy pontja által elválasztott egyik része.
                <strong> Kezdőpontja van</strong>, de a másik irányban végtelen: [AB).
              </p>
            </TheoryCard>

            <TheoryCard title="Szakasz" badge="Véges" variant="emerald">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Az egyenes két pontja közötti véges darabja.
                <strong> Két végpontja van</strong>, hossza mérhető: AB vagy d(A, B).
              </p>
            </TheoryCard>
          </div>
        </div>
      )
    },

    // 2. SZAKASZ: EGYENESEK KÖLCSÖNÖS HELYZETE
    {
      id: 'sec-line-relationships',
      title: '2. Egyenesek kölcsönös helyzete a síkban',
      icon: <MoveHorizontal className="w-5 h-5 text-blue-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Egy síkban lévő két egyenes közös pontjainak száma alapján három alapvető kapcsolat létezik:
          </p>

          <LineRelationshipsDiagram />

          <div className="space-y-3">
            <TheoryCallout title="Fontos szabály az egyenesek távolságáról" variant="cyan">
              <strong>Párhuzamos egyenesek távolsága</strong> az a legrövidebb távolság, amit egy mindkettőre
              merőleges szakasszal mérhetünk. Ez a távolság a párhuzamos egyenesek mentén <strong>mindenhol azonos</strong>!
            </TheoryCallout>

            <TheoryCallout title="Merőlegesség és derékszög jelölése" variant="info">
              A merőleges egyenesek 90°-os (derékszögű) szöget zárnak be egymással. Jelölése: a ⊥ b.
              A geometriai rajzokon a derékszöget egy kis <strong>négyzettel és ponttal</strong> vagy szögívvel jelöljük.
            </TheoryCallout>
          </div>
        </div>
      )
    },

    // 3. SZAKASZ: SZÖGEK FAJTÁI
    {
      id: 'sec-angle-types',
      title: '3. Szögek fogalma, fajtái és nagysága',
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A sík egy pontjából (a szög csúcsából) kiinduló két félegyenes (a szög szárai) a síkot két tartományra osztja.
            A szögek nagyságát <strong>fokban (°)</strong> mérjük, 0°-tól 360°-ig terjednek.
          </p>

          <AngleTypesDiagram />

          <TheoryTable
            title="Szögtípusok gyors áttekintése és értéktartományai"
            headers={['Szögtípus', 'Foktartomány', 'Jellemző tulajdonság', 'Gyakori példa']}
            rows={[
              ['Nullszög', 'α = 0°', 'A két szögszár egybeesik, nincs nyílás', 'Összecsukott olló'],
              ['Hegyesszög', '0° < α < 90°', 'Kisebb, mint a derékszög', 'Egyenlő oldalú háromszög szögei (60°)'],
              ['Derékszög', 'α = 90°', 'Egymásra merőleges szárak', 'Négyzet, téglalap sarkai'],
              ['Tompaszög', '90° < α < 180°', 'Nagyobb a derékszögnél, de kisebb az egyenesszögnél', 'Szabályos hatszög belső szöge (120°)'],
              ['Egyenesszög', 'α = 180°', 'A szárak egymás meghosszabbításai (egyenes)', 'Kiterített vonalzó, félkör'],
              ['Homorúszög', '180° < α < 360°', 'Nagyobb az egyenesszögnél, "beharapó" szög', 'Pac-Man szája kívülről'],
              ['Teljesszög', 'α = 360°', 'Teljes körbefordulás (1 egész fordulat)', 'Óramutató 1 teljes köre']
            ]}
          />
        </div>
      )
    },

    // 4. SZAKASZ: SOKSZÖGEK ÉS KONVEX / KONKÁV ALAKZATOK
    {
      id: 'sec-polygons',
      title: '4. Sokszögek fogalma: Konvex és konkáv sokszögek',
      icon: <Shapes className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Sokszögnek (poligonnak)</strong> nevezzük azt a zárt töröttvonal által határolt síkrész,
            amelynek oldalai nem metszik egymást. Az oldalak és csúcsok száma mindig megegyezik (n).
          </p>

          <ConvexConcaveDiagram />

          <TheoryCallout title="Hogyan döntheted el gyorsan, hogy konvex vagy konkáv?" variant="tip">
            Képzeld el, hogy a sokszög bármely két belső pontját összekötöd egy egyenes szakasszal.
            Ha a szakasz <strong>bárhol kilép a sokszögből</strong> (a síkidomon kívül fut), akkor az alakzat <strong>konkáv</strong>.
            Ha a szakasz <strong>mindig teljesen belül marad</strong>, akkor <strong>konvex</strong>!
          </TheoryCallout>
        </div>
      )
    },

    // 5. SZAKASZ: ÁTLÓK ÉS BELSŐ SZÖGEK ÖSSZEGE
    {
      id: 'sec-diagonals-sum',
      title: '5. Sokszög átlói és a belső szögek összege',
      icon: <Calculator className="w-5 h-5 text-purple-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Bármely konvex n-szög esetén pontos matematikai összefüggés van a csúcsok száma, az átlók száma
            és a belső szögek összege között:
          </p>

          <PolygonDiagonalsDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-2 border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/30 dark:bg-cyan-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-cyan-700 dark:text-cyan-300">
                  Átlók száma képlet
                </div>
                <div className="text-xl font-bold font-mono text-cyan-950 dark:text-cyan-100">
                  <MathText>d = (n · (n - 3)) / 2</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Minden csúcsból n - 3 átló indul (nem köthető önmagához és a 2 szomszédos csúcshoz).
                  Mivel minden átlónak 2 végpontja van, elosztjuk 2-vel, hogy ne számoljuk duplán.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300">
                  Belső szögek összege képlet
                </div>
                <div className="text-xl font-bold font-mono text-indigo-950 dark:text-indigo-100">
                  <MathText>Sₙ = (n - 2) · 180°</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Egyetlen csúcsból húzott átlókkal a sokszög pontosan n - 2 darab háromszögre bontható fel.
                  Minden háromszög belső szögeinek összege 180°.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },

    // 6. SZAKASZ: INTERAKTÍV MŰHELY
    {
      id: 'sec-interactive-lab',
      title: '6. Interaktív Geometria Műhely: Sokszög vizsgáló labor',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Változtasd a sokszög oldalszámát (n), és figyeld meg valós időben a csúcsokat, átlókat,
            a belső háromszögekre bontást és a szögek pontos értékét!
          </p>

          <div className="p-5 sm:p-6 rounded-3xl border-2 border-cyan-200 dark:border-cyan-900/60 bg-gradient-to-br from-cyan-50/60 via-slate-50 to-indigo-50/40 dark:from-slate-900 dark:to-cyan-950/30 space-y-6">
            {/* Step controller */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-200">
                <span>Oldalszám kiválasztása:</span>
                <span className="font-mono text-lg font-black text-cyan-600 dark:text-cyan-400">
                  n = {polygonN} ({polygonN === 3 ? 'Háromszög' : polygonN === 4 ? 'Négyszög' : polygonN === 5 ? 'Ötszög' : polygonN === 6 ? 'Hatszög' : polygonN === 7 ? 'Hétszög' : polygonN === 8 ? 'Nyolcszög' : polygonN === 9 ? 'Kilencszög' : 'Tízszög'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={polygonN <= 3}
                  onClick={() => setPolygonN((prev) => Math.max(3, prev - 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex gap-1">
                  {[3, 4, 5, 6, 7, 8, 10].map((num) => (
                    <Button
                      key={num}
                      size="sm"
                      variant={polygonN === num ? 'default' : 'ghost'}
                      onClick={() => setPolygonN(num)}
                      className={cn(
                        'rounded-xl h-8 px-2.5 text-xs font-bold',
                        polygonN === num
                          ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                          : 'text-slate-600 dark:text-slate-400'
                      )}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={polygonN >= 10}
                  onClick={() => setPolygonN((prev) => Math.min(10, prev + 1))}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Polygon SVG & Live Info Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* SVG Canvas */}
              <div className="flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 min-h-[200px]">
                <svg viewBox="0 0 160 150" className="w-56 h-52 select-none">
                  {/* Polygon fill & outline */}
                  <polygon
                    points={polyPointsStr}
                    fill="rgba(6, 182, 212, 0.15)"
                    stroke="#0891b2"
                    strokeWidth="2.5"
                  />

                  {/* Diagonals from vertex 0 (red/amber) */}
                  {polyPoints.map((pt, i) => {
                    if (i > 1 && i < polygonN - 1) {
                      return (
                        <line
                          key={i}
                          x1={polyPoints[0].x}
                          y1={polyPoints[0].y}
                          x2={pt.x}
                          y2={pt.y}
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                      );
                    }
                    return null;
                  })}

                  {/* Other diagonals (light cyan) */}
                  {polyPoints.map((p1, i) =>
                    polyPoints.map((p2, j) => {
                      if (i !== 0 && j !== 0 && j > i + 1 && !(i === 0 && j === polygonN - 1)) {
                        return (
                          <line
                            key={`${i}-${j}`}
                            x1={p1.x}
                            y1={p1.y}
                            x2={p2.x}
                            y2={p2.y}
                            stroke="#0891b2"
                            strokeWidth="1"
                            strokeOpacity="0.4"
                          />
                        );
                      }
                      return null;
                    })
                  )}

                  {/* Vertices */}
                  {polyPoints.map((pt, i) => (
                    <g key={i}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={i === 0 ? 5 : 3.5}
                        fill={i === 0 ? '#ef4444' : '#0891b2'}
                      />
                      <text
                        x={pt.x + (pt.x > 80 ? 7 : pt.x < 80 ? -7 : 0)}
                        y={pt.y + (pt.y > 75 ? 10 : -7)}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300 font-sans"
                      >
                        {String.fromCharCode(65 + i)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Dynamic Live Computations */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">1 csúcsból induló átlók száma:</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
                    <MathText>{`n - 3 = ${polygonN} - 3 = ${diagonalsFromOneVertex} átló`}</MathText>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Összes átló száma a sokszögben:</div>
                  <div className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400">
                    <MathText>{`(${polygonN} · (${polygonN} - 3)) / 2 = ${polygonN * (polygonN - 3)} / 2 = ${totalDiagonals} átló`}</MathText>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Belső szögek összege:</div>
                  <div className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    <MathText>{`(${polygonN} - 2) · 180° = ${trianglesCount} · 180° = ${internalAngleSum}°`}</MathText>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Szabályos {polygonN}-szög 1 belső szöge:</div>
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    <MathText>{`${internalAngleSum}° / ${polygonN} = ${regularInternalAngle}°`}</MathText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 7. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDAHELYZETEK
    {
      id: 'sec-traps',
      title: '7. Gyakori csapdahelyzetek és tipikus geometriai hibák',
      icon: <HelpCircle className="w-5 h-5 text-rose-600" />,
      content: (
        <div className="space-y-4">
          <TheoryTrapBox
            title="Csapda 1: Egyenes vs. Szakasz hossza"
            wrong="Az 'e' egyenes hossza 8 cm."
            correct="Csak a szakasznak (AB) van mérhető véges hossza; az egyenes mindkét irányba végtelen!"
            explanation="A feladatokban gyakori hiba egyenes hosszáról beszélni. Ha hosszat mérünk, az mindig egy szakaszt jelent."
          />

          <TheoryTrapBox
            title="Csapda 2: Átlók száma háromszögben"
            wrong="A háromszögnek 3 átlója van."
            correct="A háromszögnek 0 átlója van! (Képlet: 3 · (3 - 3) / 2 = 0)"
            explanation="Minden csúcs a másik két csúccsal már oldallal van összekötve, így nincs nem szomszédos csúcs, ahová átló mehetne."
          />

          <TheoryTrapBox
            title="Csapda 3: Konkáv sokszög átlói"
            wrong="Minden sokszög minden átlója a síkidomon belül fut."
            correct="Csak a konvex sokszög átlói maradnak belül. A konkáv sokszögnek van olyan átlója, ami kívül halad!"
            explanation="A konkáv sokszög definíciójának egyik legfontosabb geometriai következménye a külső átló."
          />
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onSwitchToQuiz={onSwitchToQuiz}
      title="Síkbeli alakzatok"
      subtitle="Alapfogalmak, egyenesek helyzete, szögtípusok, konvex és konkáv sokszögek, átlók és belső szögek összege"
      badgeText="📐 6. Osztály • III. Geometria • 1. Fejezet"
      topicId="g6-planar-shapes-theory"
      documentId="g6-planar-shapes-theory-doc"
      pdfFilename="sikbeli-alakzatok-tananyag.pdf"
      themeColor="cyan"
      quickRule={{
        label: 'Sokszögek alapszabálya',
        formula: 'd = (n · (n - 3)) / 2    és    Sₙ = (n - 2) · 180°'
      }}
      practiceTitle="Készen állsz a síkbeli alakzatok kvízre?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses geometriai kvízben 3 nehézségi szinten, ábrákkal és azonnali levezetésekkel!"
      sections={sections}
    />
  );
}
