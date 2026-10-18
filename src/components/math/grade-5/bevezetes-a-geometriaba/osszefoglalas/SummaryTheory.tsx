import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureGrid,
  GeometryFigureCard,
  FormulaFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Sparkles,
  Trophy,
  Compass,
  Box,
  Shapes,
  MoveHorizontal,
  Layers,
  Ruler,
  CheckCircle2,
  Eye,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface SummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const SummaryTheory: React.FC<SummaryTheoryProps> = ({ onBack, onStartQuiz }) => {
  // --- Interaktív laboratórium állapota ---
  const [labTab, setLabTab] = useState<'angles' | 'solids' | 'quads'>('angles');
  const [testAngle, setTestAngle] = useState<number>(60);
  const [quadA, setQuadA] = useState<number>(5);
  const [quadB, setQuadB] = useState<number>(3);
  const [cubeCount, setCubeCount] = useState<number>(4);

  return (
    <TheoryTemplate
      title="9. Geometria nagy összefoglalás"
      subtitle="A teljes III. fejezet átfogó ismétlése, rendszerezése és felkészülés a témazáró dolgozatra"
      documentId="g5-geom-summary-theory-content"
      pdfFilename="5_osztaly_III_geometria_9_osszefoglalas_tananyag.pdf"
      badgeText="📐 5. Osztály • III. Geometria • Témazáró előtt"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: "A fejezet aranyszabályai",
        formula: "0D pont → 1D vonal → 2D síkidom → 3D test • Háromszög: 180°, Négyszög: 360° • Euler: C + L - É = 2 • K = 2(a+b), T = a·b"
      }}
      practiceTitle="Készen állsz a 90 kérdéses geometriai témazáró kvízre?"
      practiceSubtitle="Tedd próbára tudásodat a 3×30 feladatos mesterkvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: DIMENZIÓK ÉS HALMAZOK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-summary-dimensions"
        number={1}
        title="Dimenziók hierarchiája, alapelemek és a halmazok"
        badge="Alapelemek"
        badgeColor="indigo"
      >
        <TheoryCard title="Honnan indul a geometria? (0D → 3D hierarchia)">
          {/* Kiemelt szabálydoboz az elején */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Kiemelt összefoglaló alaptétel a geometriai dimenziókról:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A geometriai alakzatok dimenziók szerint épülnek egymásra: a <strong>0D pont</strong> mozgása <strong>1D vonalat</strong> (egyenest, szakaszt), a vonal mozgása <strong>2D felületet / síkidomot</strong>, a felület mozgása pedig <strong>3D testet</strong> hoz létre. Két test metszete felület, két felületé vonal, két vonalé pont.
            </p>
          </div>

          <GeometryFigureGrid columns={4}>
            <GeometryFigureCard
              title="0D: A Pont"
              figure={
                <svg className="w-16 h-14 mx-auto" viewBox="0 0 40 32" fill="none">
                  <circle cx="20" cy="16" r="3.5" fill="#4f46e5" />
                  <text x="26" y="16" className="text-[10px] font-black fill-indigo-700">P</text>
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Nincs kiterjedése (hosszúsága, szélessége 0).',
                'Helyet jelöl a térben.',
                'Nyomtatott nagybetűvel jelöljük: A, B, P.'
              ]}
              explanation="A geometria legkisebb, oszthatatlan alapeleme."
            />

            <GeometryFigureCard
              title="1D: Vonal, Egyenes, Szakasz"
              figure={
                <svg className="w-20 h-14 mx-auto" viewBox="0 0 50 32" fill="none">
                  <line x1="4" y1="16" x2="46" y2="16" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="14" cy="16" r="2.5" fill="#047857" />
                  <circle cx="36" cy="16" r="2.5" fill="#047857" />
                  <text x="12" y="27" className="text-[8px] font-bold fill-emerald-800">A</text>
                  <text x="34" y="27" className="text-[8px] font-bold fill-emerald-800">B</text>
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Egyetlen kiterjedése: a hosszúság.',
                'Egyenes: mindkét irányban végtelen (e).',
                'Szakasz: két pont közötti véges rész (AB).'
              ]}
              explanation="Félegyenes: egy kezdőpontból egy irányban végtelen."
            />

            <GeometryFigureCard
              title="2D: Felület, Síkidom"
              figure={
                <svg className="w-20 h-14 mx-auto" viewBox="0 0 50 32" fill="none">
                  <polygon points="10,26 40,26 30,8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Két kiterjedése: hosszúság és szélesség.',
                'Zárt vonal határolja.',
                'Van területe (T), egységnégyzettel mérhető.'
              ]}
              explanation="Példák: háromszög, téglalap, kör, sokszögek."
            />

            <GeometryFigureCard
              title="3D: Geometriai Test"
              figure={
                <svg className="w-16 h-14 mx-auto" viewBox="0 0 40 32" fill="none">
                  <rect x="8" y="10" width="16" height="16" stroke="#db2777" strokeWidth="1.2" fill="#fce7f3" />
                  <polygon points="8,10 16,3 32,3 24,10" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
                  <polygon points="24,10 32,3 32,19 24,26" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Három kiterjedése: hosszúság, szélesség, magasság.',
                'Zárt felület határolja a térben.',
                'Euler-formula: C + L - É = 2.'
              ]}
              explanation="Példák: kocka, téglatest, henger, gömb."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: SZÖGEK ÉS MÉRÉSÜK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-summary-angles"
        number={2}
        title="Szögek világa: fajtáik, mérésük és az óralap-szabály"
        badge="Szögek"
        badgeColor="orange"
      >
        <TheoryCard title="A szögek osztályozása 0°-tól 360°-ig">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A szög egy közös kezdőpontból kiinduló két félegyenes és az általuk bezárt síkrész. Nagyságuk alapján 6 alaptípusba soroljuk őket:
          </p>

          <TheoryTable
            columns={['Szögfajta', 'Szögtartomány', 'Jellemző példa', 'Óralapon']}
            rows={[
              ['Nullszög', 'α = 0°', 'A két szár pontosan egybeesik', '12:00 (egybeeső mutatók)'],
              ['Hegyesszög', '0° < α < 90°', 'Éles, szúró szög; derékszögnél kisebb', '1 óra (30°), 2 óra (60°)'],
              ['Derékszög (⊥)', 'α = 90°', 'Füzet sarka, falak találkozása (negyedkörív + pont)', '3:00 és 9:00 (pontosan 90°)'],
              ['Tompaszög', '90° < α < 180°', 'Derékszögnél nagyobb, de egyenesszögnél kisebb', '4 óra (120°), 5 óra (150°)'],
              ['Egyenesszög', 'α = 180°', 'A szárak egyenest alkotnak (félkör)', '6:00 (egymással szembe mutatók)'],
              ['Homorúszög', '180° < α < 360°', 'Kívülről nyíló, nagy szög', '7 óra (210° a nagyobb íven)'],
              ['Teljesszög', 'α = 360°', 'Egy teljes körbefordulás', '1 teljes kör (12 óraköz)']
            ]}
          />

          <div className="mt-4 p-3.5 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-bold text-orange-900 dark:text-orange-200">
              🕒 Óralap-szabály: 1 teljes kör = 360° = 12 óraköz → 1 óraköz = 360° : 12 = 30°
            </span>
            <Badge variant="outline" className="border-orange-400 text-orange-800 dark:text-orange-300 font-mono">
              k óraköz = k · 30°
            </Badge>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: SÍKIDOMOK, HÁROMSZÖGEK ÉS A KÖR */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-summary-polygons"
        number={3}
        title="Síkidomok, a háromszögek kettős osztályozása és a kör"
        badge="Sokszögek"
        badgeColor="emerald"
      >
        <TheoryCard title="Sokszögek és a kör legfontosabb összefüggései">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 block uppercase tracking-wide">
                1. Háromszögek aranyszabályai
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Belső szögek összege:</strong> mindig pontosan <MathText>180^\circ</MathText> (<MathText>\alpha + \beta + \gamma = 180^\circ</MathText>).</li>
                <li><strong>Háromszög-egyenlőtlenség:</strong> bármely két oldal összege nagyobb a harmadiknál (<MathText>a + b &gt; c</MathText>). Gyakorlatban: a két rövidebb összege &gt; leghosszabb oldal.</li>
                <li><strong>Oldalak szerint:</strong> általános (különböző oldalak), egyenlő szárú (2 egyenlő oldal és alapon fekvő szögek), egyenlő oldalú / szabályos (mind 3 oldal és szög 60°).</li>
                <li><strong>Szögek szerint:</strong> hegyesszögű (mind 3 szög &lt; 90°), derékszögű (1 db 90°), tompaszögű (1 db &gt; 90°).</li>
              </ul>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 space-y-2">
              <span className="text-xs font-black text-teal-900 dark:text-teal-200 block uppercase tracking-wide">
                2. A kör részei és képletei
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Középpont (O):</strong> a pont, amelytől a körvonal minden pontja azonos távolságra van.</li>
                <li><strong>Sugár (r):</strong> a középpontot a körvonal egy pontjával összekötő szakasz.</li>
                <li><strong>Átmérő (d):</strong> a középponton átmenő húr, a kör leghosszabb húrja: <MathText>d = 2 \cdot r</MathText>.</li>
                <li><strong>Húr:</strong> a körvonal bármely két pontját összekötő szakasz.</li>
                <li><strong>Körív:</strong> a körvonal egy darabja; <strong>Körcikk:</strong> két sugár és egy körív által határolt rész (torta-szelet).</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: EGYENESEK, TESTEK, TÉGLALAP ÉS NÉGYZET */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-summary-quads-lines"
        number={4}
        title="Egyenesek síkban és térben, testek és a téglalap-négyzet"
        badge="Összefüggések"
        badgeColor="rose"
      >
        <TheoryCard title="Térbeli geometria és négyszögek">
          <GeometryFigureGrid columns={3}>
            <GeometryFigureCard
              title="Egyenesek síkban és térben"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <line x1="5" y1="30" x2="55" y2="10" stroke="#4f46e5" strokeWidth="2" />
                  <line x1="15" y1="5" x2="45" y2="35" stroke="#9333ea" strokeWidth="2" />
                  <circle cx="30" cy="20" r="2.5" fill="#be123c" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Síkban: metsző (1 pont), merőleges (90°), párhuzamos (0 pont).',
                'Térben: KITÉRŐ egyenesek (külön síkban vannak, nem találkoznak és nem párhuzamosak).',
                'Távolság: MINDIG a merőleges szakasz hossza!'
              ]}
              explanation="Példa kitérő egyenesre: autópálya és felüljáró."
            />

            <GeometryFigureCard
              title="Kockaépítmények és nézetek"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <rect x="15" y="15" width="12" height="12" stroke="#0284c7" strokeWidth="1.2" fill="#e0f2fe" />
                  <rect x="27" y="15" width="12" height="12" stroke="#0284c7" strokeWidth="1.2" fill="#e0f2fe" />
                  <rect x="27" y="3" width="12" height="12" stroke="#0284c7" strokeWidth="1.2" fill="#bae6fd" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Számozott alaprajz: mutatja, hol hány kocka van egymáson.',
                '3 irányú nézet: elölnézet (szemből), felülnézet (fentről), oldalnézet (jobbról/balról).',
                'A nézet magassága mindig az adott oszlop/sor maximuma.'
              ]}
              explanation="11 különböző kockaháló létezik (pl. T-alakú 1-4-1)."
            />

            <GeometryFigureCard
              title="Téglalap és négyzet"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <rect x="10" y="8" width="40" height="24" stroke="#e11d48" strokeWidth="1.8" fill="#ffe4e6" />
                  <line x1="30" y1="4" x2="30" y2="36" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
                  <line x1="6" y1="20" x2="54" y2="20" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Téglalap: 2 szimmetriatengely (oldalfelezők). Átlói felezik egymást, de nem merőlegesek.',
                'Négyzet: 4 szimmetriatengely (2 oldalfelező + 2 átló!). Átlói merőlegesek (90°).',
                'K = 2(a + b), T = a · b | Négyzetnél: K = 4a, T = a².'
              ]}
              explanation="Minden négyzet téglalap, de nem minden téglalap négyzet!"
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* INTERAKTÍV GEOMETRIAI NAGY-LABORATÓRIUM */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border-2 border-amber-500/30 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-amber-200 dark:border-amber-900/50 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-600 text-white shadow-sm">
                <Sliders className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                Interaktív Geometriai Mesterlaboratórium
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Próbáld ki a fejezet 3 kulcsterületét: szögek és óralap, kockaépítmények és a kerület-terület kalkulátor!
            </p>
          </div>

          <div className="flex gap-1.5 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-xl self-stretch sm:self-auto">
            <Button
              size="sm"
              variant={labTab === 'angles' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", labTab === 'angles' && "bg-amber-600 text-white")}
              onClick={() => setLabTab('angles')}
            >
              <Compass className="w-3.5 h-3.5 mr-1" />
              Szögek
            </Button>
            <Button
              size="sm"
              variant={labTab === 'solids' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", labTab === 'solids' && "bg-amber-600 text-white")}
              onClick={() => setLabTab('solids')}
            >
              <Box className="w-3.5 h-3.5 mr-1" />
              Építmények
            </Button>
            <Button
              size="sm"
              variant={labTab === 'quads' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", labTab === 'quads' && "bg-amber-600 text-white")}
              onClick={() => setLabTab('quads')}
            >
              <Ruler className="w-3.5 h-3.5 mr-1" />
              K & T Kalkulátor
            </Button>
          </div>
        </div>

        {/* 1. FÜL: SZÖGEK */}
        {labTab === 'angles' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-amber-900 flex flex-col items-center justify-center min-h-[200px]">
              <svg className="w-48 h-40 mx-auto" viewBox="0 0 160 140" fill="none">
                <circle cx="80" cy="70" r="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="80" y1="70" x2="130" y2="70" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                {(() => {
                  const rad = (testAngle * Math.PI) / 180;
                  const x2 = 80 + 50 * Math.cos(-rad);
                  const y2 = 70 + 50 * Math.sin(-rad);
                  return (
                    <g>
                      <line x1="80" y1="70" x2={x2} y2={y2} stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="80" cy="70" r="4" fill="#4338ca" />
                    </g>
                  );
                })()}
                <text x="80" y="130" className="text-xs font-black fill-slate-800 dark:fill-slate-200" textAnchor="middle">
                  α = {testAngle}°
                </text>
              </svg>
            </div>
            <div className="md:col-span-5 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Szög beállítása:</span>
                <span className="font-mono font-bold text-amber-700">{testAngle}°</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[30, 45, 60, 90, 120, 150, 180].map(deg => (
                  <Button
                    key={deg}
                    size="sm"
                    variant={testAngle === deg ? 'default' : 'outline'}
                    className={cn("h-7 text-xs", testAngle === deg && "bg-amber-600 text-white")}
                    onClick={() => setTestAngle(deg)}
                  >
                    {deg}°
                  </Button>
                ))}
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 text-xs space-y-1">
                <div><strong>Besorolás:</strong>{' '}
                  <span className="font-bold text-amber-800 dark:text-amber-300">
                    {testAngle < 90 && 'Hegyesszög (< 90°)'}
                    {testAngle === 90 && 'Derékszög (pontosan 90°)'}
                    {testAngle > 90 && testAngle < 180 && 'Tompaszög (90°-180°)'}
                    {testAngle === 180 && 'Egyenesszög (180°)'}
                  </span>
                </div>
                <div><strong>Óralapon:</strong> {Math.round(testAngle / 30)} óraköz</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FÜL: TESTEK ÉS ÉPÍTMÉNYEK */}
        {labTab === 'solids' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-amber-900 flex flex-col items-center justify-center min-h-[200px]">
              <svg className="w-52 h-44 mx-auto" viewBox="0 0 160 140" fill="none">
                {/* 3 oszlopos lépcső építmény izometrikusan */}
                {Array.from({ length: cubeCount }).map((_, idx) => (
                  <rect
                    key={idx}
                    x={40 + (idx % 2) * 35}
                    y={90 - Math.floor(idx / 2) * 35}
                    width="30"
                    height="30"
                    fill="#bae6fd"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                    rx="2"
                  />
                ))}
                <text x="80" y="130" className="text-xs font-black fill-sky-800" textAnchor="middle">
                  Összes kocka száma: {cubeCount} db
                </text>
              </svg>
            </div>
            <div className="md:col-span-5 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Kockák száma az építményben:</span>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map(num => (
                  <Button
                    key={num}
                    size="sm"
                    variant={cubeCount === num ? 'default' : 'outline'}
                    className={cn("h-8 text-xs font-bold", cubeCount === num && "bg-sky-600 text-white")}
                    onClick={() => setCubeCount(num)}
                  >
                    {num} db
                  </Button>
                ))}
              </div>
              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 text-xs">
                <strong>Alapszabály:</strong> Az alaprajzon lévő számok összege mindig pontosan megadja az építményhez felhasznált kockák teljes darabszámát!
              </div>
            </div>
          </div>
        )}

        {/* 3. FÜL: KERÜLET ÉS TERÜLET */}
        {labTab === 'quads' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-amber-900 flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-center space-y-2">
                <div className="font-mono text-sm font-black text-rose-700 dark:text-rose-300">
                  K = 2 · ({quadA} + {quadB}) = {2 * (quadA + quadB)} cm
                </div>
                <div className="font-mono text-sm font-black text-emerald-700 dark:text-emerald-300">
                  T = {quadA} · {quadB} = {quadA * quadB} cm²
                </div>
                <div className="text-[11px] text-slate-500 italic">
                  {quadA === quadB ? 'Különleges eset: ez egy NÉGYZET (K = 4a, T = a²)' : 'Általános téglalap'}
                </div>
              </div>
            </div>
            <div className="md:col-span-5 space-y-3">
              <div className="space-y-1">
                <span className="text-xs text-slate-600">a oldal: {quadA} cm</span>
                <div className="flex gap-1.5">
                  {[2, 3, 4, 5, 6].map(a => (
                    <Button
                      key={a}
                      size="sm"
                      variant={quadA === a ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", quadA === a && "bg-rose-600 text-white")}
                      onClick={() => setQuadA(a)}
                    >
                      {a}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-600">b oldal: {quadB} cm</span>
                <div className="flex gap-1.5">
                  {[2, 3, 4, 5].map(b => (
                    <Button
                      key={b}
                      size="sm"
                      variant={quadB === b ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", quadB === b && "bg-rose-600 text-white")}
                      onClick={() => setQuadB(b)}
                    >
                      {b}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: GYAKORI HIBÁK ÉS BUKTATÓK A DOLGOZATBAN */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-summary-traps"
        number={5}
        title="Gyakori hibák és tévhitek a témazáró dolgozatban"
        badge="Csapdák"
        badgeColor="rose"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. Buktató: „Minden téglalap négyzet” tévhit',
              wrong: 'Összekeverni a szabály irányát.',
              correct: 'Minden négyzet téglalap, de NEM minden téglalap négyzet! A négyzet a téglalapok speciális része.',
              explanation: 'Gondolj a bogár és katicabogár hasonlatra: minden katica bogár, de nem minden bogár katica.'
            },
            {
              title: '2. Buktató: Háromszög-egyenlőtlenség felületes ellenőrzése',
              wrong: 'Csak két tetszőleges oldalt összeadni és megelégedni vele.',
              correct: 'MINDIG a két kisebb oldal összegét hasonlítsd a leghosszabbhoz! Ha 2 cm + 3 cm = 5 cm és a harmadik oldal 6 cm, a háromszög NEM létezik (5 < 6).',
              explanation: 'A két rövidebbnek szigorúan hosszabbnak kell lennie a legnagyobbnál.'
            },
            {
              title: '3. Buktató: A téglalap átlójának tükörtengelynek hivése',
              wrong: 'Azt írni a dolgozatban, hogy a téglalapnak 4 szimmetriatengelye van.',
              correct: 'A téglalapnak CSAK 2 szimmetriatengelye van: a két oldalfelező merőleges! Az átló mentén hajtva a csúcsok elcsúsznak. 4 tengelye csak a négyzetnek van.',
              explanation: 'Ez az egyik leggyakoribb dolgozathiba.'
            },
            {
              title: '4. Buktató: Nem metsző egyenesek a térben',
              wrong: 'Azt mondani, hogy ha két egyenes nem metszi egymást, akkor biztosan párhuzamosak.',
              correct: 'Ez CSAK SÍKBAN igaz! A 3D térben a nem metsző egyenesek lehetnek KITÉRŐK is, ha nincsenek egy síkban.',
              explanation: 'Példa: a híd és az alatta áthaladó folyó vagy autóút.'
            },
            {
              title: '5. Buktató: Mértékegységek összevisszasága',
              wrong: 'dm és cm méreteket közvetlenül összeszorozni.',
              correct: 'Számolás előtt MINDIG váltsd át az oldalakat azonos mértékegységre (pl. 3 dm = 30 cm)! Kerületnél cm, területnél cm² a mértékegység.',
              explanation: 'A felület mindig négyzetes kitevőjű (²).'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SummaryTheory;
