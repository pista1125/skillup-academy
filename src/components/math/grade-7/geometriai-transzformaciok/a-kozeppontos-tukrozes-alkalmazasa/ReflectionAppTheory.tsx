import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  RotateCcw,
  Target,
  Sparkles,
  Compass,
  Move,
  Info,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Sliders,
  Shapes,
  Maximize2,
  Layers,
  Square
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface ReflectionAppTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ReflectionAppTheory: React.FC<ReflectionAppTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [labMode, setLabMode] = useState<'midline' | 'parallelogram' | 'midpointReflect'>('midline');
  const [midlineStep, setMidlineStep] = useState<number>(1);
  const [diagEqual, setDiagEqual] = useState<boolean>(true);
  const [pointPos, setPointPos] = useState<number>(50); // slider 20..80

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="6. A középpontos tükrözés alkalmazása"
      subtitle="Szakaszfelezők, háromszög középvonala, paralelogramma alaptételek és feladatmegoldási stratégiák"
      themeColor="sky"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_kozeppontos_tukrozes_alkalmazasa.pdf"
      quickRule={{
        label: 'A középvonal és a paralelogramma alaptétele',
        formula: 'k ∥ c  és  k = c / 2;  átlók felezik egymást ⟺ paralelogramma'
      }}
      topicId="g7-geom-reflection-app"
    >
      {/* 1. SZEKCIÓ: SZAKASZ FELEZŐPONTJÁRA VALÓ TÜKRÖZÉS */}
      <TheorySection
        number={1}
        title="Szakasz felezőpontjára való tükrözés (Az F felezőpont ereje)"
        badgeColor="sky"
        icon={<Target className="w-5 h-5 text-sky-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Mi történik a szakasszal a saját felezőpontjára tükrözve?"
            badge="Alapelv"
            badgeColor="sky"
          >
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
              Legyen adott egy tetszőleges <MathText>{'AB'}</MathText> szakasz és annak felezőpontja, <MathText>{'F'}</MathText>. 
              Ha az alakzatot a szakasz <MathText>{'F'}</MathText> felezőpontjára tükrözzük:
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 mb-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                <span>Az <MathText>{'A'}</MathText> pont képe pontosan a <MathText>{'B'}</MathText> pont: <MathText>{'A\' = B'}</MathText>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                <span>A <MathText>{'B'}</MathText> pont képe pontosan az <MathText>{'A'}</MathText> pont: <MathText>{'B\' = A'}</MathText>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                <span>Az <MathText>{'AB'}</MathText> szakasz képe önmaga (<MathText>{'A\'B\' = BA'}</MathText>), csak a végpontok cserélnek helyet!</span>
              </li>
            </ul>
            <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 font-medium">
              💡 <strong>Stratégia:</strong> Ha egy feladatban szakaszfelező pont szerepel, szinte mindig érdemes megvizsgálni a felezőpontra vonatkozó középpontos tükrözést!
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Külső P pont tükrözése AB felezőpontjára"
            note="Bármely P pontot tükrözve az F felezőpontra, az APBP' négyszög mindig paralelogramma lesz!"
            figure={
              <svg viewBox="0 0 280 140" className="w-full h-36 mx-auto">
                {/* Parallelogram APBP' */}
                <polygon points="50,90 140,25 230,50 140,115" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                {/* Diagonals AB and PP' */}
                <line x1="50" y1="90" x2="230" y2="50" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
                <line x1="140" y1="25" x2="140" y2="115" stroke="#0284c7" strokeDasharray="3 3" strokeWidth="1.5" />
                {/* Midpoint F */}
                <circle cx="140" cy="70" r="4" fill="#f59e0b" />
                {/* Vertices */}
                <circle cx="50" cy="90" r="3.5" fill="#0369a1" />
                <circle cx="230" cy="50" r="3.5" fill="#0369a1" />
                <circle cx="140" cy="25" r="3.5" fill="#0d9488" />
                <circle cx="140" cy="115" r="3.5" fill="#0d9488" />
                {/* Labels */}
                <text x="35" y="100" className="text-[10px] font-bold fill-sky-800">A</text>
                <text x="238" y="55" className="text-[10px] font-bold fill-sky-800">B</text>
                <text x="145" y="22" className="text-[10px] font-bold fill-teal-800">P</text>
                <text x="145" y="128" className="text-[10px] font-bold fill-teal-800">P'</text>
                <text x="146" y="73" className="text-[10px] font-bold fill-amber-700">F</text>
              </svg>
            }
          />
        </div>

        <TheoryCallout
          type="tip"
          title="Miért keletkezik azonnal paralelogramma?"
        >
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            Mivel <MathText>{'F'}</MathText> felezi az <MathText>{'AB'}</MathText> szakaszt és a tükrözés miatt <MathText>{'F'}</MathText> felezi a <MathText>{'PP\''}</MathText> szakaszt is, 
            az <MathText>{'APBP\''}</MathText> négyszög átlói kölcsönösen felezik egymást az <MathText>{'F'}</MathText> pontban. 
            Ez a tény <strong>garantálja</strong>, hogy az <MathText>{'APBP\''}</MathText> négyszög szemközti oldalai párhuzamosak és egyenlő hosszúak, azaz a négyszög <strong>paralelogramma</strong>!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: A HÁROMSZÖG KÖZÉPVONAL-TÉTELE */}
      <TheorySection
        number={2}
        title="A háromszög középvonal-tétele és elegáns bizonyítása"
        badgeColor="sky"
        icon={<Sparkles className="w-5 h-5 text-sky-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="A középvonal fogalma és tétele"
            badge="Tétel"
            badgeColor="sky"
          >
            <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 mb-3">
              <p className="text-sm font-bold text-sky-900 dark:text-sky-200">
                A háromszög bármely két oldalának felezőpontját összekötő szakaszt <strong>középvonalnak</strong> nevezzük.
              </p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              <strong>A tétel kimondása:</strong> A háromszög középvonala párhuzamos a harmadik oldallal, és hossza pontosan annak a fele:
            </p>
            <div className="text-center py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono font-bold text-sky-700 dark:text-sky-300 text-sm mb-3 flex items-center justify-center gap-3">
              <span>k ∥ c</span>
              <span>és</span>
              <span className="inline-flex items-center gap-1">
                k = <Fraction num="c" den="2" size="md" />
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Minden háromszögnek pontosan <strong>3 középvonala</strong> van, amelyek mindegyike a szemközti oldallal párhuzamos és feleakkora hosszúságú.
            </p>
          </TheoryCard>

          <GeometryFigureCard
            title="A középvonal-tétel ábrája"
            note="F_a és F_b felezőpontok. k = F_a F_b párhuzamos c-vel és k = c / 2."
            figure={
              <svg viewBox="0 0 280 140" className="w-full h-36 mx-auto">
                {/* Triangle ABC */}
                <polygon points="40,115 240,115 150,25" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
                {/* Midline */}
                <line x1="95" y1="70" x2="195" y2="70" stroke="#0284c7" strokeWidth="2.5" />
                {/* Midpoints */}
                <circle cx="95" cy="70" r="3.5" fill="#0284c7" />
                <circle cx="195" cy="70" r="3.5" fill="#0284c7" />
                {/* Vertices */}
                <circle cx="40" cy="115" r="3" fill="#16a34a" />
                <circle cx="240" cy="115" r="3" fill="#16a34a" />
                <circle cx="150" cy="25" r="3" fill="#16a34a" />
                {/* Tick marks */}
                <line x1="65" y1="90" x2="70" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="120" y1="45" x2="125" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="215" y1="90" x2="220" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="170" y1="45" x2="175" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Labels */}
                <text x="25" y="125" className="text-[10px] font-bold fill-emerald-800">A</text>
                <text x="248" y="125" className="text-[10px] font-bold fill-emerald-800">B</text>
                <text x="147" y="18" className="text-[10px] font-bold fill-emerald-800">C</text>
                <text x="73" y="68" className="text-[9px] font-bold fill-sky-700">F_b</text>
                <text x="202" y="68" className="text-[9px] font-bold fill-sky-700">F_a</text>
                <text x="140" y="64" className="text-[9px] font-bold fill-sky-800">k = c/2</text>
                <text x="135" y="130" className="text-[10px] font-bold fill-emerald-800">c (alap)</text>
              </svg>
            }
          />
        </div>

        {/* BIZONYÍTÁS LÉPÉSRŐL LÉPÉSRE */}
        <TheoryCard
          title="A középvonal-tétel bizonyítása középpontos tükrözéssel"
          badge="Bizonyítás lépései"
          badgeColor="sky"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Tükrözés a felezőpontra</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tükrözzük az <MathText>{'A'}</MathText> csúcsot a <MathText>{'BC'}</MathText> oldal <MathText>{'F_{BC}'}</MathText> felezőpontjára! Képe legyen <MathText>{'A\''}</MathText>.
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Paralelogramma képződik</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mivel az <MathText>{'AA\''}</MathText> és <MathText>{'BC'}</MathText> átlók felezik egymást, az <MathText>{'ABA\'C'}</MathText> négyszög paralelogramma, így <MathText>{'A\'B ∥ AC'}</MathText> és <MathText>{'|A\'B| = |AC|'}</MathText>.
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Középvonal tulajdonság</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Az <MathText>{'F_{AC}F_{BC}'}</MathText> szakasz az <MathText>{'ABA\'C'}</MathText> paralelogrammában felezi a távolságot, így párhuzamos az alappal, és hossza pontosan <span className="inline-flex items-center gap-0.5"><Fraction num="c" den="2" size="sm" /></span>.
              </p>
            </div>
          </div>
        </TheoryCard>

        {/* 4 EGYBEVÁGÓ KIS HÁROMSZÖG */}
        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Fontos következmény: A három középvonal 4 egybevágó háromszögre bont!</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            Ha behúzzuk mindhárom középvonalat, a háromszöget <strong>4 darab egymással egybevágó</strong>, az eredetihez hasonló kis háromszögre osztjuk fel:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 font-mono">
              <strong>Terület:</strong> <MathText>{'T_{\\text{kis}} = \\frac{T}{4}'}</MathText> (egyenként negyed akkora terület)
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 font-mono">
              <strong>Kerület:</strong> <MathText>{'K_{\\text{kis}} = \\frac{K}{2}'}</MathText> (egyenként fele akkora kerület)
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A PARALELOGRAMMA ÁTLÓINAK TÉTELE */}
      <TheorySection
        number={3}
        title="A paralelogramma átlóinak tétele és megfordítása"
        badgeColor="sky"
        icon={<Square className="w-5 h-5 text-sky-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="A paralelogramma alaptétele (Oda-vissza érvényes!)"
            badge="Ekvivalencia"
            badgeColor="sky"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Egy négyszög akkor és csak akkor paralelogramma, ha az átlói felezik egymást.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-800">
                <strong>1. Irány (⇒):</strong> Ha a négyszög paralelogramma, akkor átlói szükségképpen felezik egymást, és metszéspontjuk a szimmetriaközéppont (<MathText>{'O'}</MathText>).
              </div>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <strong>2. Irány (⇐):</strong> Ha egy tetszőleges négyszög átlói felezik egymást, akkor az átlómetszéspontra vett tükrözés miatt a négyszög biztosan paralelogramma!
              </div>
            </div>
          </TheoryCard>

          <TheoryTable
            title="Négyszögek átlóinak tulajdonságai összefoglalva"
            headers={['Négyszög', 'Felezik egymást?', 'Merőlegesek?', 'Egyenlő hosszúak?']}
            rows={[
              ['Paralelogramma', '✅ Igen (O)', '❌ Nem feltétlenül', '❌ Nem feltétlenül'],
              ['Rombusz', '✅ Igen (O)', '✅ Igen (e ⊥ f)', '❌ Nem feltétlenül'],
              ['Téglalap', '✅ Igen (O)', '❌ Nem feltétlenül', '✅ Igen (|e| = |f|)'],
              ['Négyzet', '✅ Igen (O)', '✅ Igen (e ⊥ f)', '✅ Igen (|e| = |f|)'],
              ['Deltoid', '❌ Csak az egyik felezi a másikat', '✅ Igen (e ⊥ f)', '❌ Nem egyenlők'],
              ['Húrtrapéz', '❌ Nem felezik egymást', '❌ Nem feltétlenül', '✅ Igen (|e| = |f|)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV LABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív Laboratórium: Fedezd fel a tételeket dinamikusan!"
        badgeColor="sky"
        icon={<Sliders className="w-5 h-5 text-sky-600" />}
      >
        <Card className="p-5 bg-gradient-to-br from-sky-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl shadow-sm">
          {/* Lab Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kísérlet kiválasztása:</span>
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <Button
                  size="sm"
                  variant={labMode === 'midline' ? 'default' : 'ghost'}
                  onClick={() => setLabMode('midline')}
                  className="text-xs h-7 rounded-lg"
                >
                  Háromszög középvonal
                </Button>
                <Button
                  size="sm"
                  variant={labMode === 'parallelogram' ? 'default' : 'ghost'}
                  onClick={() => setLabMode('parallelogram')}
                  className="text-xs h-7 rounded-lg"
                >
                  Paralelogramma átlók
                </Button>
                <Button
                  size="sm"
                  variant={labMode === 'midpointReflect' ? 'default' : 'ghost'}
                  onClick={() => setLabMode('midpointReflect')}
                  className="text-xs h-7 rounded-lg"
                >
                  Felezőpontra tükrözés
                </Button>
              </div>
            </div>

            {/* Sub-controls based on mode */}
            {labMode === 'midline' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">Bizonyítás fázisa:</span>
                <div className="inline-flex gap-1">
                  {[1, 2, 3].map((step) => (
                    <Button
                      key={step}
                      size="sm"
                      variant={midlineStep === step ? 'default' : 'outline'}
                      onClick={() => setMidlineStep(step)}
                      className="text-xs h-7 px-2.5"
                    >
                      {step}. lépés
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {labMode === 'parallelogram' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDiagEqual(!diagEqual)}
                className="text-xs h-7"
              >
                {diagEqual ? 'Átlók felezik egymást: IGEN' : 'Átlók felezik egymást: NEM'}
              </Button>
            )}

            {labMode === 'midpointReflect' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">P pont helyzete:</span>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={pointPos}
                  onChange={(e) => setPointPos(Number(e.target.value))}
                  className="w-24 accent-sky-600"
                />
              </div>
            )}
          </div>

          {/* SVG Canvas Area */}
          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col items-center">
            {labMode === 'midline' && (
              <svg viewBox="0 0 360 180" className="w-full max-w-lg h-48 select-none">
                {/* Base Triangle ABC */}
                <polygon points="60,140 300,140 180,30" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
                
                {/* Midpoints */}
                {/* AC midpoint */}
                <circle cx="120" cy="85" r="4" fill="#0284c7" />
                <text x="96" y="85" className="text-[10px] font-bold fill-sky-800">F_b</text>
                
                {/* BC midpoint */}
                <circle cx="240" cy="85" r="4" fill="#0284c7" />
                <text x="248" y="85" className="text-[10px] font-bold fill-sky-800">F_a</text>

                {/* Midline */}
                <line x1="120" y1="85" x2="240" y2="85" stroke="#0284c7" strokeWidth="2.5" />
                <text x="165" y="78" className="text-[10px] font-bold fill-sky-700">k = c/2 = 120</text>

                {/* Step 2: Mirrored triangle / point A' */}
                {midlineStep >= 2 && (
                  <>
                    {/* Mirror A across F_a -> A' (300, 30) */}
                    <line x1="60" y1="140" x2="420" y2="30" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.2" />
                    {/* A'B and A'C */}
                    <line x1="300" y1="140" x2="300" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="180" y1="30" x2="300" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                    <circle cx="300" cy="30" r="4" fill="#10b981" />
                    <text x="306" y="28" className="text-[10px] font-bold fill-emerald-700">A'</text>
                  </>
                )}

                {/* Step 3: Highlight Parallelism */}
                {midlineStep === 3 && (
                  <>
                    <line x1="50" y1="148" x2="310" y2="148" stroke="#10b981" strokeWidth="2" />
                    <text x="160" y="165" className="text-[10px] font-bold fill-emerald-700">c (alap) = 240</text>
                  </>
                )}

                {/* Vertices */}
                <circle cx="60" cy="140" r="3.5" fill="#0369a1" />
                <circle cx="300" cy="140" r="3.5" fill="#0369a1" />
                <circle cx="180" cy="30" r="3.5" fill="#0369a1" />
                <text x="45" y="150" className="text-[11px] font-bold fill-sky-900">A</text>
                <text x="306" y="150" className="text-[11px] font-bold fill-sky-900">B</text>
                <text x="176" y="20" className="text-[11px] font-bold fill-sky-900">C</text>
              </svg>
            )}

            {labMode === 'parallelogram' && (
              <svg viewBox="0 0 360 180" className="w-full max-w-lg h-48 select-none">
                {/* 4 vertices based on diagEqual */}
                {/* Center O at (180, 90) */}
                {/* AC diagonal */}
                <line x1="70" y1="130" x2="290" y2="50" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
                {/* BD diagonal */}
                <line
                  x1={diagEqual ? 110 : 80}
                  y1={diagEqual ? 40 : 30}
                  x2={diagEqual ? 250 : 260}
                  y2={diagEqual ? 140 : 160}
                  stroke="#94a3b8"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                
                {/* Polygon ABCD */}
                <polygon
                  points={`70,130 ${diagEqual ? 110 : 80},${diagEqual ? 40 : 30} 290,50 ${diagEqual ? 250 : 260},${diagEqual ? 140 : 160}`}
                  fill={diagEqual ? '#e0f2fe' : '#ffe4e6'}
                  stroke={diagEqual ? '#0284c7' : '#e11d48'}
                  strokeWidth="2"
                />

                {/* Center O */}
                <circle cx="180" cy="90" r="4" fill="#f59e0b" />
                <text x="185" y="94" className="text-[10px] font-bold fill-amber-700">O</text>

                {/* Labels */}
                <text x="50" y="140" className="text-[10px] font-bold fill-slate-800">A</text>
                <text x={diagEqual ? 100 : 70} y="32" className="text-[10px] font-bold fill-slate-800">B</text>
                <text x="298" y="52" className="text-[10px] font-bold fill-slate-800">C</text>
                <text x={diagEqual ? 256 : 266} y="150" className="text-[10px] font-bold fill-slate-800">D</text>

                <text x="110" y="172" className={`text-[11px] font-bold ${diagEqual ? 'fill-sky-700' : 'fill-rose-700'}`}>
                  {diagEqual ? '✅ Paralelogramma! Átlók felezik egymást O-ban.' : '❌ Nem paralelogramma! Az átlók nem felezik egymást.'}
                </text>
              </svg>
            )}

            {labMode === 'midpointReflect' && (
              <svg viewBox="0 0 360 180" className="w-full max-w-lg h-48 select-none">
                {/* Segment AB */}
                <line x1="60" y1="120" x2="300" y2="120" stroke="#0369a1" strokeWidth="2.5" />
                <circle cx="60" cy="120" r="3.5" fill="#0369a1" />
                <circle cx="300" cy="120" r="3.5" fill="#0369a1" />
                <text x="45" y="125" className="text-[10px] font-bold fill-sky-900">A</text>
                <text x="308" y="125" className="text-[10px] font-bold fill-sky-900">B</text>

                {/* Midpoint F at (180, 120) */}
                <circle cx="180" cy="120" r="4.5" fill="#f59e0b" />
                <text x="175" y="138" className="text-[10px] font-bold fill-amber-700">F (felezőpont)</text>

                {/* Point P dynamically placed */}
                {/* P x = 120 + pointPos, y = 40 */}
                {(() => {
                  const px = 100 + pointPos * 1.6;
                  const py = 45;
                  const pPrimex = 180 + (180 - px);
                  const pPrimey = 120 + (120 - py);
                  return (
                    <>
                      {/* Parallelogram APBP' */}
                      <polygon points={`60,120 ${px},${py} 300,120 ${pPrimex},${pPrimey}`} fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.8" />
                      {/* Connecting line PP' through F */}
                      <line x1={px} y1={py} x2={pPrimex} y2={pPrimey} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.2" />
                      {/* Point P */}
                      <circle cx={px} cy={py} r="4" fill="#0d9488" />
                      <text x={px - 5} y={py - 8} className="text-[10px] font-bold fill-teal-800">P</text>
                      {/* Point P' */}
                      <circle cx={pPrimex} cy={pPrimey} r="4" fill="#0d9488" />
                      <text x={pPrimex - 5} y={pPrimey + 16} className="text-[10px] font-bold fill-teal-800">P'</text>
                      <text x="110" y="170" className="text-[10px] font-bold fill-teal-800">
                        APBP' mindig paralelogramma (|AP| = |P'B|, AP ∥ P'B)
                      </text>
                    </>
                  );
                })()}
              </svg>
            )}

            {/* Interactive explanation box */}
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-full text-center">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {labMode === 'midline' && midlineStep === 1 && '1. Lépés: Adott a háromszög és a két oldalfelező pont (F_a, F_b).'}
                {labMode === 'midline' && midlineStep === 2 && '2. Lépés: A-t F_a-ra tükrözve létrejön A\', amellyel ABA\'C paralelogrammát alkot!'}
                {labMode === 'midline' && midlineStep === 3 && '3. Lépés: Így F_b F_a pontosan párhuzamos az alappal és hossza c / 2!'}
                {labMode === 'parallelogram' && diagEqual && 'Az átlók metszéspontja szimmetriaközéppont. A szemközti oldalak egyenlők és párhuzamosak.'}
                {labMode === 'parallelogram' && !diagEqual && 'Ha az átlók nem felezik egymást, a szemközti oldalak nem lehetnek egyenlők és párhuzamosak!'}
                {labMode === 'midpointReflect' && 'Mozgasd a csúszkát: a P pont helyzetétől függetlenül APBP\' mindig paralelogramma marad!'}
              </span>
            </div>
          </div>
        </Card>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI TÉVHITEK ÉS BUKTATÓK */}
      <TheorySection
        number={5}
        title="Tipikus buktatók és tévhitek a feladatokban"
        badgeColor="sky"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Tévhit: A középvonal a csúcsból indul"
            correction="A középvonal SOSEM csúcsból indul! Két oldal FELEZŐPONTJÁT köti össze. A csúcsból a szemközti oldal felezőpontjába tartó vonal a SÚLYVONAL."
          />
          <TheoryTrapBox
            title="2. Tévhit: A középvonal harmadolja a háromszög területét"
            correction={
              <span>
                Nem harmadolja, hanem negyedeli! A három középvonal 4 DARAB EGYBEVÁGÓ kis háromszögre osztja fel az eredetit (
                <span className="inline-flex items-center gap-0.5 font-bold">
                  T_kis = <Fraction num="T" den="4" size="sm" />
                </span>
                ).
              </span>
            }
          />
          <TheoryTrapBox
            title="3. Tévhit: Minden négyszög átlói felezik egymást"
            correction="Kizárólag a paralelogrammák (és speciális alakjaik: téglalap, rombusz, négyzet) átlói felezik egymást. A deltoidnak csak az egyik átlója felezi a másikat!"
          />
          <TheoryTrapBox
            title="4. Tévhit: A trapéz középvonala c / 2"
            correction={
              <span>
                A trapéz középvonala a két párhuzamos alap SZÁMTANI KÖZEPE:{' '}
                <span className="inline-flex items-center gap-0.5 font-bold">
                  k = <Fraction num="a + c" den="2" size="sm" />
                </span>
                . Csak akkor lenne{' '}
                <span className="inline-flex items-center gap-0.5 font-bold">
                  <Fraction num="c" den="2" size="sm" />
                </span>
                , ha a felső alap hossza 0 lenne (azaz háromszöggé fajulna).
              </span>
            }
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ReflectionAppTheory;
