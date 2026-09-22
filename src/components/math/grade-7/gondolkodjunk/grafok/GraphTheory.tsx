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
  DegreeSumTheoremDiagram,
  CompleteGraphKnDiagram,
  TreeGraphDiagram
} from './GraphDiagrams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Network,
  Share2,
  GitBranch,
  CircleDot,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GraphTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface Vertex {
  id: number;
  label: string;
  x: number;
  y: number;
}

export const GraphTheory: React.FC<GraphTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Graph Sandbox Preset state
  const [selectedPreset, setSelectedPreset] = useState<'k3' | 'c4' | 'k4' | 'tree' | 'k5'>('k4');

  // Custom graph active edges for 4-vertex sandbox
  const [activeEdges, setActiveEdges] = useState<[number, number][]>([
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 2]
  ]);

  const vertices4: Vertex[] = [
    { id: 0, label: 'A', x: 70, y: 40 },
    { id: 1, label: 'B', x: 210, y: 40 },
    { id: 2, label: 'C', x: 210, y: 160 },
    { id: 3, label: 'D', x: 70, y: 160 }
  ];

  // Toggle edge in sandbox
  const toggleEdge = (u: number, v: number) => {
    const min = Math.min(u, v);
    const max = Math.max(u, v);
    const exists = activeEdges.some(([a, b]) => a === min && b === max);
    if (exists) {
      setActiveEdges(activeEdges.filter(([a, b]) => !(a === min && b === max)));
    } else {
      setActiveEdges([...activeEdges, [min, max]]);
    }
  };

  const getDegree = (vId: number) => {
    return activeEdges.filter(([a, b]) => a === vId || b === vId).length;
  };

  const degrees = vertices4.map(v => getDegree(v.id));
  const degreeSum = degrees.reduce((acc, d) => acc + d, 0);
  const oddDegreesCount = degrees.filter(d => d % 2 !== 0).length;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-graphs-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_grafok.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="4. Gráfok"
      subtitle="Csúcsok, élek, fokszámok, a gráfelmélet alaptétele, teljes gráfok és fa gráfok"
      quickRule={{
        label: 'Gráfelmélet Alapszabályai',
        formula: 'Σ d(v) = 2 · |E|,   Teljes gráf: n(n-1)/2 él,   Fa gráf: n - 1 él'
      }}
      themeColor="emerald"
      practiceTitle="Készen állsz a gráfos és hálózati feladványok gyakorlására?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten, kártyás párosítóval és csoportosító játékkal!"
    >
      {/* SECTION 1: Gráf Alapfogalmak */}
      <TheorySection
        number={1}
        title="Gráf Alapfogalmak: Csúcsok, Élek és Fokszámok"
        icon={<Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A <strong>gráf</strong> olyan matematikai struktúra, amely <strong>pontokból (csúcsokból)</strong> és az azokat összekötő <strong>vonalakból (élekből)</strong> áll. Kiválóan alkalmas úthálózatok, baráti ismeretségek, számítógépes hálózatok és körmérkőzések modellezésére.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TheoryCard title="Csúcsok (V)" variant="emerald">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A gráf pontjai (pl. városok, személyek, számítógépek). Jele: $V$ (Vertices).
              </p>
            </TheoryCard>

            <TheoryCard title="Élek (E)" variant="emerald">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A csúcsokat összekötő szakaszok/görbék (pl. utak, ismeretségek, vezetékek). Jele: $E$ (Edges).
              </p>
            </TheoryCard>

            <TheoryCard title="Csúcs Fokszáma: d(v)" variant="emerald">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Az adott csúcsból <strong>kiinduló (oda befutó) élek száma</strong>. Ha $d(v) = 0$, akkor a csúcs <strong>izolált</strong>.
              </p>
            </TheoryCard>
          </div>

          <TheoryCallout variant="info" title="Mi az egyszerű gráf?">
            A 7. osztályos matematikában döntően <strong>egyszerű gráfokkal</strong> foglalkozunk:
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Nincs benne hurokél</strong> (egy csúcsot önmagával összekötő él).</li>
              <li><strong>Nincs benne többszörös él</strong> (két csúcs között legfeljebb 1 él futhat).</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SECTION 2: A Gráfelmélet Alaptétele és Kézfogási Tétel */}
      <TheorySection
        number={2}
        title="A Gráfelmélet Alaptétele és a Páratlan Csúcsok Szabálya"
        icon={<Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Mivel minden él pontosan <strong>két csúcshoz csatlakozik</strong>, egy új él megrajzolása mindkét végpontjának fokszámát pontosan 1-gyel (összesen 2-vel) növeli meg.
          </p>

          <DegreeSumTheoremDiagram />

          {/* INTERAKTÍV GRÁF HOMOKOZÓ ÉS FOKSZÁMSZÁMLÁLÓ */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm sm:text-base">
                <Network className="w-5 h-5 text-emerald-600" />
                <span>Interaktív Labor: Gráf- és Fokszámszerkesztő</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-200 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                Élek száma: {activeEdges.length} db
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Kattints az élekre a be- és kikapcsoláshoz, és figyeld meg a fokszámok összegének és a páratlan csúcsok számának változását!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* SVG Interactive Canvas */}
              <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 flex justify-center">
                <svg viewBox="0 0 280 200" className="w-64 h-48">
                  {/* All possible edges as clickable dashed/solid lines */}
                  {[
                    [0, 1],
                    [1, 2],
                    [2, 3],
                    [3, 0],
                    [0, 2],
                    [1, 3]
                  ].map(([u, v], idx) => {
                    const v1 = vertices4[u];
                    const v2 = vertices4[v];
                    const isActive = activeEdges.some(([a, b]) => a === Math.min(u, v) && b === Math.max(u, v));
                    return (
                      <g key={idx} className="cursor-pointer" onClick={() => toggleEdge(u, v)}>
                        {/* Hover hit area */}
                        <line x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y} stroke="transparent" strokeWidth="18" />
                        <line
                          x1={v1.x}
                          y1={v1.y}
                          x2={v2.x}
                          y2={v2.y}
                          stroke={isActive ? '#059669' : '#cbd5e1'}
                          strokeWidth={isActive ? '3.5' : '1.5'}
                          strokeDasharray={isActive ? 'none' : '4 4'}
                        />
                      </g>
                    );
                  })}

                  {/* Vertices */}
                  {vertices4.map((v) => {
                    const deg = getDegree(v.id);
                    const isOdd = deg % 2 !== 0;
                    return (
                      <g key={v.id}>
                        <circle
                          cx={v.x}
                          cy={v.y}
                          r="16"
                          fill={isOdd ? '#f59e0b' : '#10b981'}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          className="shadow-sm"
                        />
                        <text
                          x={v.x}
                          y={v.y + 4}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="black"
                          textAnchor="middle"
                        >
                          {v.label} ({deg})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Real-time Math Analysis */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-slate-500 dark:text-slate-400 text-xs">Csúcsok fokszámai:</div>
                  <div className="font-mono text-emerald-800 dark:text-emerald-200 font-black text-sm">
                    d(A)={degrees[0]}, d(B)={degrees[1]}, d(C)={degrees[2]}, d(D)={degrees[3]}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">
                    Fokszámösszeg = 2 · Élek száma:
                  </div>
                  <div className="font-mono font-black text-emerald-700 dark:text-emerald-300 text-base">
                    {degreeSum} = 2 · {activeEdges.length} ✓ (Mindig páros!)
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                  ⚡ <strong>Páratlan fokszámú csúcsok száma:</strong> {oddDegreesCount} db (Ez a szám mindig páros: 0, 2 vagy 4!).
                </div>
              </div>
            </div>
          </div>

          <TheoryTrapBox title="Tipikus hiba: Lehet-e 3 darab páratlan fokszámú csúcs?">
            <p className="text-xs sm:text-sm">
              <strong>NEM, semmilyen gráfban nem lehetséges!</strong> Ha páratlan darab páratlan számot adnánk össze, a fokszámok összege páratlan lenne, ami ellentmondana a $\sum d(v) = 2 \cdot |E|$ páros tételének. Ezért a páratlan fokszámú csúcsok száma <strong>mindig páros</strong> (0, 2, 4, 6...).
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 3: Teljes Gráfok és Nevezetes Családok */}
      <TheorySection
        number={3}
        title="Teljes Gráfok (K_n) és Nevezetes Gráftípusok"
        icon={<Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egy $n$ csúcsú egyszerű gráfban a maximális lehetséges élszámot a <strong>teljes gráf ($K_n$)</strong> éri el, ahol minden csúcsból $n - 1$ él indul ki a többi csúcs felé.
          </p>

          <CompleteGraphKnDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="A Teljes Gráf Képlete (Közvetlen levezetés)" variant="indigo">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Minden csúcs fokszáma $n - 1$. Mivel $n$ csúcs van:</p>
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 font-mono font-bold text-indigo-900 dark:text-indigo-200 text-center">
                  |E| = n · (n - 1) / 2
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Azért osztunk 2-vel, mert minden élt mindkét végpontjánál megszámoltunk.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Gyakori Példák Teljes Gráfokra" variant="indigo">
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li><strong>K₃ (3 csúcs)</strong>: $(3 \cdot 2)/2 = 3$ él (háromszög).</li>
                <li><strong>K₄ (4 csúcs)</strong>: $(4 \cdot 3)/2 = 6$ él.</li>
                <li><strong>K₅ (5 csúcs)</strong>: $(5 \cdot 4)/2 = 10$ él.</li>
                <li><strong>K₆ (6 fős társaság kézfogásai)</strong>: $(6 \cdot 5)/2 = 15$ kézfogás.</li>
              </ul>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 4: Összefüggőség és Fa Gráfok */}
      <TheorySection
        number={4}
        title="Összefüggő Gráfok és Fa Gráfok (Körmentes hálózatok)"
        icon={<GitBranch className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egy gráf <strong>összefüggő</strong>, ha bármely két csúcsa között vezet út (élek sorozata). Ha egy összefüggő gráfban <strong>nincs semmilyen zárt kör (hurokútvonal)</strong>, akkor azt <strong>fának (fa gráfnak)</strong> nevezzük.
          </p>

          <TreeGraphDiagram />

          <TheoryTable
            headers={['Tulajdonság', 'Teljes Gráf (Kₙ)', 'Fa Gráf (Tₙ)', 'Kör Gráf (Cₙ)']}
            rows={[
              ['Definíció', 'Minden csúcs mindennel össze van kötve', 'Összefüggő és körmentes', 'Egyetlen zárt körútvonal'],
              ['Élek száma (|E|)', 'n · (n - 1) / 2', 'n - 1 él', 'n él'],
              ['Csúcsok foka', 'Minden csúcs foka n - 1', 'Legalább 2 csúcs foka 1 (levelek)', 'Minden csúcs foka 2'],
              ['Körök létezése', 'Nagyon sok kört tartalmaz', '0 db kör (körmentes)', 'Pontosan 1 db kör']
            ]}
          />
        </div>
      </TheorySection>

      {/* SECTION 5: Gyakorlati Alkalmazások és Kézfogási Feladatok */}
      <TheorySection
        number={5}
        title="Gyakorlati Alkalmazások: Kézfogások és Bajnokságok"
        icon={<Layers className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A gráfelméleti tételekkel elegánsan és gyorsan oldhatunk meg olyan hétköznapi szöveges feladatokat, amelyek elsőre bonyolultnak tűnnek:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="1. Kézfogási és Koccintási Feladatok" variant="rose">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p>
                  Egy $n$ fős társaságban mindenki mindenkivel kezet fog pontosan egyszer. Hány kézfogás történik?
                </p>
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 font-mono font-bold text-rose-800 dark:text-rose-200 text-center">
                  Kézfogások = n · (n - 1) / 2
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Pl. 8 fős baráti társaság: $(8 \cdot 7) / 2 = 28$ kézfogás.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="2. Bajnokságok Körmérkőzései" variant="rose">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p>
                  Egy focitornán 6 csapat indul, mindenki játszik mindenkivel 1 mérkőzést. Hány meccset rendeznek meg?
                </p>
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 font-mono font-bold text-rose-800 dark:text-rose-200 text-center">
                  Mérkőzések = 6 · 5 / 2 = 15 meccs
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Ha oda-visszavágós rendszer van: $6 \cdot 5 = 30$ mérkőzés.
                </p>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout variant="tip" title="Összefoglaló arany szabályok gráfokhoz">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li><strong>Fokszámok összege:</strong> Σ d(v) = 2 · |E| = 2 · (élek száma) (mindig PÁROS!)</li>
              <li><strong>Páratlan fokszámú csúcsok:</strong> a darabszámuk mindig PÁROS!</li>
              <li><strong>Teljes gráf (K_n):</strong> éleinek száma = n · (n - 1) / 2</li>
              <li><strong>Fa gráf (n csúcsú):</strong> éleinek száma = n - 1 él</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
