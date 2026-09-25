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
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Shapes,
  Maximize2,
  Sliders,
  Scale,
  GitBranch,
  Target,
  Compass,
  Check,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface ParallelogramDeltoidTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type QuadType = 'parallelogram' | 'rectangle' | 'rhombus' | 'square' | 'deltoid';

export const ParallelogramDeltoidTheory: React.FC<ParallelogramDeltoidTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [labTab, setLabTab] = useState<'family' | 'deltoid' | 'hierarchy'>('family');
  const [selectedQuad, setSelectedQuad] = useState<QuadType>('parallelogram');
  const [showDiagonals, setShowDiagonals] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);
  const [showIncircle, setShowIncircle] = useState<boolean>(false);

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="9. Paralelogramma és deltoid"
      subtitle="A paralelogramma család (paralelogramma, téglalap, rombusz, négyzet) és a deltoid szerkezete, átlói, szimmetriái, képletei és mintafeladatai"
      themeColor="purple"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_paralelogramma_es_deltoid.pdf"
      quickRule={{
        label: 'A legfontosabb alapszabályok egy pillantásra',
        formula: 'Paralelogramma: átlók kölcsönösen felezik egymást, α + β = 180° | Rombusz és Deltoid: e ⊥ f (átlók merőlegesek) | Deltoid: főátló szimmetriatengely és merőlegesen felezi a mellékátlót'
      }}
    >
      {/* 1. SZEKCIÓ: INTERAKTÍV NÉGYSZÖG LABORATÓRIUM */}
      <TheorySection
        number={1}
        title="Interaktív Négyszög Laboratórium"
        badgeColor="purple"
        icon={<Sliders className="w-5 h-5 text-purple-600" />}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-purple-950/30 border-2 border-purple-200 dark:border-purple-800 shadow-md mb-8 rounded-2xl">
          {/* Mode Switch Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            <Button
              variant={labTab === 'family' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('family')}
              className={labTab === 'family' ? 'bg-purple-600 hover:bg-purple-700 text-white font-bold' : ''}
            >
              <Shapes className="w-4 h-4 mr-1.5" />
              1. Paralelogramma család
            </Button>
            <Button
              variant={labTab === 'deltoid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('deltoid')}
              className={labTab === 'deltoid' ? 'bg-purple-600 hover:bg-purple-700 text-white font-bold' : ''}
            >
              <Target className="w-4 h-4 mr-1.5" />
              2. Deltoid vizsgáló
            </Button>
            <Button
              variant={labTab === 'hierarchy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('hierarchy')}
              className={labTab === 'hierarchy' ? 'bg-purple-600 hover:bg-purple-700 text-white font-bold' : ''}
            >
              <GitBranch className="w-4 h-4 mr-1.5" />
              3. Négyszögek rokonsági fája
            </Button>
          </div>

          {/* TAB 1: PARALELOGRAMMA CSALÁD */}
          {labTab === 'family' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Válaszd ki a paralelogramma család valamelyik tagját, kapcsold be az átlókat és szögeket, és figyeld meg a speciális tulajdonságait!
              </p>

              {/* Selection pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { id: 'parallelogram', label: 'Általános paralelogramma' },
                  { id: 'rectangle', label: 'Téglalap' },
                  { id: 'rhombus', label: 'Rombusz' },
                  { id: 'square', label: 'Négyzet' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedQuad(item.id as QuadType)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all ${
                      selectedQuad === item.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 mb-4 items-center">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showDiagonals}
                    onChange={(e) => setShowDiagonals(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  Átlók és felezőpont (O) mutatása
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAngles}
                    onChange={(e) => setShowAngles(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  Belső szögek mutatása
                </label>
              </div>

              {/* Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <svg viewBox="0 0 280 160" className="w-full max-w-[300px] h-48">
                    {selectedQuad === 'parallelogram' && (
                      <g>
                        <polygon points="40,120 180,120 230,40 90,40" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                        {showDiagonals && (
                          <>
                            <line x1="40" y1="120" x2="230" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                            <line x1="90" y1="40" x2="180" y2="120" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                            <circle cx="135" cy="80" r="4.5" fill="#d97706" />
                            <text x="142" y="77" className="text-[10px] font-bold fill-amber-800">O (felezi)</text>
                          </>
                        )}
                        {showAngles && (
                          <>
                            <text x="55" y="112" className="text-[9px] font-bold fill-amber-800">α = 60°</text>
                            <text x="155" y="112" className="text-[9px] font-bold fill-indigo-800">β = 120°</text>
                            <text x="195" y="52" className="text-[9px] font-bold fill-amber-800">α = 60°</text>
                            <text x="95" y="52" className="text-[9px] font-bold fill-indigo-800">β = 120°</text>
                          </>
                        )}
                        <text x="105" y="135" className="text-[9px] font-bold fill-slate-600">a oldal</text>
                        <text x="55" y="75" className="text-[9px] font-bold fill-slate-600">b</text>
                      </g>
                    )}

                    {selectedQuad === 'rectangle' && (
                      <g>
                        <rect x="50" y="45" width="180" height="80" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
                        {showDiagonals && (
                          <>
                            <line x1="50" y1="45" x2="230" y2="125" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                            <line x1="50" y1="125" x2="230" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                            <circle cx="140" cy="85" r="4.5" fill="#0284c7" />
                            <text x="148" y="82" className="text-[9px] font-bold fill-sky-800">e = f (egyenlők!)</text>
                          </>
                        )}
                        {showAngles && (
                          <>
                            <rect x="50" y="45" width="10" height="10" fill="none" stroke="#0284c7" strokeWidth="1" />
                            <rect x="220" y="45" width="10" height="10" fill="none" stroke="#0284c7" strokeWidth="1" />
                            <rect x="50" y="115" width="10" height="10" fill="none" stroke="#0284c7" strokeWidth="1" />
                            <rect x="220" y="115" width="10" height="10" fill="none" stroke="#0284c7" strokeWidth="1" />
                            <text x="120" y="38" className="text-[9px] font-bold fill-sky-700">Mind a 4 szög 90°</text>
                          </>
                        )}
                      </g>
                    )}

                    {selectedQuad === 'rhombus' && (
                      <g>
                        <polygon points="140,25 220,80 140,135 60,80" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2.5" />
                        {showDiagonals && (
                          <>
                            <line x1="140" y1="25" x2="140" y2="135" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                            <line x1="60" y1="80" x2="220" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                            <rect x="140" y="72" width="8" height="8" fill="none" stroke="#64748b" strokeWidth="1" />
                            <circle cx="140" cy="80" r="4" fill="#7c3aed" />
                            <text x="148" y="75" className="text-[9px] font-bold fill-purple-800">e ⊥ f (merőleges!)</text>
                          </>
                        )}
                        {showAngles && (
                          <text x="75" y="148" className="text-[8px] font-bold fill-purple-700">Átlók felezik a szögeket is!</text>
                        )}
                      </g>
                    )}

                    {selectedQuad === 'square' && (
                      <g>
                        <rect x="90" y="30" width="100" height="100" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
                        {showDiagonals && (
                          <>
                            <line x1="90" y1="30" x2="190" y2="130" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                            <line x1="90" y1="130" x2="190" y2="30" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                            <rect x="135" y="75" width="10" height="10" fill="none" stroke="#64748b" strokeWidth="1" />
                            <circle cx="140" cy="80" r="4" fill="#16a34a" />
                            <text x="80" y="145" className="text-[8px] font-bold fill-emerald-800">e = f és e ⊥ f (minden igaz!)</text>
                          </>
                        )}
                      </g>
                    )}
                  </svg>
                </div>

                <div className="md:col-span-5 space-y-2.5 text-xs">
                  <div className="p-3 bg-purple-100/70 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-xs uppercase font-extrabold text-purple-700 dark:text-purple-300 tracking-wider mb-0.5">
                      Kiválasztott alakzat
                    </div>
                    <div className="text-base font-black text-slate-900 dark:white">
                      {selectedQuad === 'parallelogram' && 'Általános paralelogramma'}
                      {selectedQuad === 'rectangle' && 'Téglalap'}
                      {selectedQuad === 'rhombus' && 'Rombusz'}
                      {selectedQuad === 'square' && 'Négyzet'}
                    </div>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedQuad === 'parallelogram' && (
                      <>
                        <p><strong>Oldalak:</strong> Szemközti oldalai párhuzamosak és egyenlők (<MathText>{'a = c, b = d'}</MathText>).</p>
                        <p><strong>Szögek:</strong> Szemközti szögei egyenlők (<MathText>{'α = γ, β = δ'}</MathText>), szomszédos szögek összege <MathText>{'180°'}</MathText>.</p>
                        <p><strong>Átlók:</strong> Felezik egymást az <MathText>{'O'}</MathText> pontban, de nem merőlegesek és nem egyenlők.</p>
                        <p><strong>Szimmetria:</strong> Csak középpontosan szimmetrikus (<MathText>{'O'}</MathText> centrum), nincs tengelye.</p>
                      </>
                    )}
                    {selectedQuad === 'rectangle' && (
                      <>
                        <p><strong>Oldalak:</strong> Szemközti oldalai párhuzamosak és egyenlők (<MathText>{'a = c, b = d'}</MathText>).</p>
                        <p><strong>Szögek:</strong> Mind a négy belső szöge pontosan <MathText>{'90°'}</MathText> (derékszög).</p>
                        <p><strong>Átlók:</strong> Egyenlő hosszúak (<MathText>{'e = f'}</MathText>) és felezik egymást.</p>
                        <p><strong>Szimmetria:</strong> 2 szimmetriatengely (oldalfelezők) és 1 szimmetriaközéppont (<MathText>{'O'}</MathText>).</p>
                      </>
                    )}
                    {selectedQuad === 'rhombus' && (
                      <>
                        <p><strong>Oldalak:</strong> Mind a 4 oldala egyenlő hosszúságú (<MathText>{'a = b = c = d'}</MathText>).</p>
                        <p><strong>Szögek:</strong> Szemközti szögei egyenlők, szomszédosak összege <MathText>{'180°'}</MathText>.</p>
                        <p><strong>Átlók:</strong> <strong>Merőlegesek egymásra</strong> (<MathText>{'e ⊥ f'}</MathText>), felezik egymást és felezik a szögeket is!</p>
                        <p><strong>Szimmetria:</strong> 2 szimmetriatengely (a két átlója) és 1 középpont (<MathText>{'O'}</MathText>).</p>
                      </>
                    )}
                    {selectedQuad === 'square' && (
                      <>
                        <p><strong>Oldalak:</strong> Mind a 4 oldala egyenlő (<MathText>{'a = b = c = d'}</MathText>).</p>
                        <p><strong>Szögek:</strong> Mind a négy belső szöge <MathText>{'90°'}</MathText>.</p>
                        <p><strong>Átlók:</strong> Egyenlők (<MathText>{'e = f'}</MathText>), merőlegesek (<MathText>{'e ⊥ f'}</MathText>), felezik egymást és a szögeket (<MathText>{'45°'}</MathText>).</p>
                        <p><strong>Szimmetria:</strong> 4 szimmetriatengely és 1 középpont (szabályos négyszög).</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DELTOID VIZSGÁLÓ */}
          {labTab === 'deltoid' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                A deltoid nem feltétlenül paralelogramma, mégis szoros kapcsolatban áll a rombusszal: két-két szomszédos oldala egyenlő és átlói merőlegesek!
              </p>

              <div className="flex flex-wrap gap-4 mb-4 items-center">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showIncircle}
                    onChange={(e) => setShowIncircle(e.target.checked)}
                    className="rounded text-pink-600 focus:ring-pink-500 w-4 h-4"
                  />
                  Beírt kör (érintőnégyszög tulajdonság)
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <svg viewBox="0 0 280 170" className="w-full max-w-[300px] h-48">
                    {/* Deltoid body */}
                    <polygon points="140,15 220,65 140,155 60,65" fill="#fce7f3" stroke="#db2777" strokeWidth="2.5" />
                    
                    {/* Diagonals */}
                    <line x1="140" y1="15" x2="140" y2="155" stroke="#e11d48" strokeWidth="2" />
                    <line x1="60" y1="65" x2="220" y2="65" stroke="#0284c7" strokeWidth="1.8" />
                    
                    {/* Right angle sign */}
                    <rect x="140" y="65" width="8" height="8" fill="none" stroke="#64748b" strokeWidth="1" />
                    
                    {/* Incircle */}
                    {showIncircle && (
                      <circle cx="140" cy="75" r="41" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                    )}

                    {/* Labels */}
                    <text x="85" y="35" className="text-[10px] font-bold fill-pink-700">a</text>
                    <text x="185" y="35" className="text-[10px] font-bold fill-pink-700">a</text>
                    <text x="85" y="125" className="text-[10px] font-bold fill-rose-800">b</text>
                    <text x="185" y="125" className="text-[10px] font-bold fill-rose-800">b</text>

                    <text x="146" y="30" className="text-[8.5px] font-bold fill-red-700">főátló (tengely)</text>
                    <text x="165" y="60" className="text-[8.5px] font-bold fill-sky-800">mellékátló</text>
                    <circle cx="60" cy="65" r="3.5" fill="#db2777" />
                    <circle cx="220" cy="65" r="3.5" fill="#db2777" />
                    <text x="42" y="68" className="text-[10px] font-bold fill-pink-800">β</text>
                    <text x="226" y="68" className="text-[10px] font-bold fill-pink-800">δ = β</text>
                  </svg>
                </div>

                <div className="md:col-span-5 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-pink-100/70 dark:bg-pink-950/60 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-xs uppercase font-extrabold text-pink-700 dark:text-pink-300 tracking-wider mb-0.5">
                      Deltoid Fő Jellemzői
                    </div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      Két-két szomszédos oldal egyenlő
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 leading-relaxed">
                    <p><strong>Főátló:</strong> A csúcsokon áthaladó szimmetriaátló felezi a mellékátlót és a csúcsszögeket.</p>
                    <p><strong>Mellékátló:</strong> Merőleges a főátlóra (<MathText>{'e ⊥ f'}</MathText>), végpontjaiban a szögek egyenlők (<MathText>{'β = δ'}</MathText>).</p>
                    <p><strong>Érintőnégyszög:</strong> Mindig rendelkezik beírt körrel, mivel a szemközti oldalak összege azonos: <MathText>{'a + b = a + b'}</MathText>.</p>
                    <p className="flex items-center gap-1.5 flex-wrap">
                      <strong>Terület:</strong>
                      <span>T = </span>
                      <Fraction num="e · f" den="2" size="md" />
                      <span>(mint a rombusznál!).</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROKONSÁGI FA */}
          {labTab === 'hierarchy' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                A négyszögek hierarchiája: hogyan származtathatók a speciális négyszögek az általánosabb fogalmakból?
              </p>

              <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">1. Alaphalmaz</span>
                    <h4 className="font-bold text-sm text-purple-900 dark:text-purple-200 mt-1">Paralelogramma</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      Két párhuzamos oldalpár, átlók felezik egymást.
                    </p>
                  </div>

                  <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">2. Szögek szerinti specializáció</span>
                    <h4 className="font-bold text-sm text-sky-900 dark:text-sky-200 mt-1">Téglalap</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      Minden szög <MathText>{'90°'}</MathText>, átlók egyenlők (<MathText>{'e = f'}</MathText>).
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">3. Oldalak szerinti specializáció</span>
                    <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mt-1">Rombusz</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      Minden oldal egyenlő, átlók merőlegesek (<MathText>{'e ⊥ f'}</MathText>).
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    A csúcspont: egyszerre téglalap és rombusz
                  </span>
                  <h3 className="font-extrabold text-base text-emerald-900 dark:text-emerald-100 mt-1">
                    NÉGYZET (Szabályos négyszög)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto mt-1">
                    A négyzet az összes fenti négyszög tulajdonságát birtokolja: egyenlő oldalak, derékszögek, egyenlő és merőleges átlók, 4 szimmetriatengely és szimmetriaközéppont.
                  </p>
                </div>

                <div className="p-3 bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                  <div className="font-bold text-pink-800 dark:text-pink-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    Deltoid és Rombusz rokonsága:
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Minden négyzet rombusz</strong> (mert minden oldala egyenlő).</li>
                    <li><strong>Minden rombusz paralelogramma</strong> és <strong>minden rombusz deltoid is</strong>!</li>
                    <li><em>De fordítva nem igaz:</em> nem minden téglalap négyzet, és nem minden deltoid rombusz!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Card>
      </TheorySection>

      {/* 2. SZEKCIÓ: A PARALELOGRAMMA CSALÁD RÉSZLETES ELEMZÉSE */}
      <TheorySection
        number={2}
        title="A Paralelogramma és Családja – Részletes Elemzés"
        badgeColor="indigo"
        icon={<Shapes className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Általános paralelogramma */}
          <TheoryCard
            title="1. Általános Paralelogramma"
            badge="Alapforma"
            badgeColor="amber"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
                <polygon points="35,70 145,70 165,22 55,22" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                <line x1="35" y1="70" x2="165" y2="22" stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="55" y1="22" x2="145" y2="70" stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="100" cy="46" r="3.5" fill="#d97706" />
                <text x="106" y="44" className="text-[9px] font-bold fill-amber-900">O</text>
                <text x="90" y="82" className="text-[10px] font-bold fill-amber-800">a</text>
                <text x="35" y="44" className="text-[10px] font-bold fill-amber-800">b</text>
              </svg>
            }
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Definíció:</strong> Olyan négyszög, amelynek mindkét szemközti oldalpárja párhuzamos (<MathText>{'a ∥ c'}</MathText> és <MathText>{'b ∥ d'}</MathText>).</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Szemközti oldalak:</strong> Egyenlő hosszúak (<MathText>{'a = c'}</MathText> és <MathText>{'b = d'}</MathText>).</li>
                <li><strong>Belső szögek:</strong> Szemközti szögei egyenlők (<MathText>{'α = γ, β = δ'}</MathText>), szomszédos szögei kiegészítő szögek: <MathText>{'α + β = 180°'}</MathText>.</li>
                <li><strong>Átlók:</strong> Kölcsönösen felezik egymást a szimmetriaközéppontban (<MathText>{'O'}</MathText>).</li>
                <li><strong>Szimmetria:</strong> <strong>Középpontosan szimmetrikus</strong> (<MathText>{'180°-os forgatás'}</MathText>), de általános esetben <strong>0 szimmetriatengelye van</strong>!</li>
              </ul>
            </div>
          </TheoryCard>

          {/* 2. Téglalap */}
          <TheoryCard
            title="2. Téglalap (Derékszögű Paralelogramma)"
            badge="Egyenlő szögű"
            badgeColor="blue"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
                <rect x="35" y="20" width="130" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                <line x1="35" y1="20" x2="165" y2="70" stroke="#0369a1" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="35" y1="70" x2="165" y2="20" stroke="#0369a1" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="100" cy="45" r="3.5" fill="#0284c7" />
                <text x="88" y="42" className="text-[9px] font-bold fill-sky-800">d₁ = d₂</text>
                <path d="M 35 30 L 45 30 L 45 20" fill="none" stroke="#0284c7" strokeWidth="1" />
              </svg>
            }
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Definíció:</strong> Olyan paralelogramma, amelynek minden belső szöge derékszög (<MathText>{'90°'}</MathText>).</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Átlók sajátossága:</strong> Átlói <strong>egyenlő hosszúságúak</strong> (<MathText>{'d_1 = d_2'}</MathText>) és felezik egymást.</li>
                <li><strong>Szimmetriák:</strong> <strong>2 szimmetriatengely</strong> (a szemközti oldalak felezőmerőlegesei) és <strong>1 szimmetriaközéppont</strong> (<MathText>{'O'}</MathText>).</li>
                <li><strong>Körülírt kör:</strong> Minden téglalap <strong>húrnégyszög</strong>, körülírt körének középpontja az átlók metszéspontja (<span className="inline-flex items-center gap-0.5">R = <Fraction num="d" den="2" size="sm" /></span>).</li>
                <li><strong>Átlók és szögek:</strong> Átlói általában <em>nem merőlegesek</em> és <em>nem szögfelezők</em> (csak ha négyzet!).</li>
              </ul>
            </div>
          </TheoryCard>

          {/* 3. Rombusz */}
          <TheoryCard
            title="3. Rombusz (Egyenlő Oldalú Paralelogramma)"
            badge="Egyenlő oldalú"
            badgeColor="purple"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
                <polygon points="100,10 160,45 100,80 40,45" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
                <line x1="100" y1="10" x2="100" y2="80" stroke="#7c3aed" strokeWidth="1.5" />
                <line x1="40" y1="45" x2="160" y2="45" stroke="#7c3aed" strokeWidth="1.5" />
                <rect x="100" y="39" width="6" height="6" fill="none" stroke="#64748b" strokeWidth="1" />
                <text x="65" y="24" className="text-[10px] font-bold fill-purple-700">a</text>
                <text x="130" y="24" className="text-[10px] font-bold fill-purple-700">a</text>
              </svg>
            }
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Definíció:</strong> Olyan paralelogramma, amelynek minden oldala egyenlő hosszú (<MathText>{'a = b = c = d'}</MathText>).</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Átlók sajátossága:</strong> Átlói <strong>merőlegesek egymásra</strong> (<MathText>{'e ⊥ f'}</MathText>), felezik egymást, és <strong>felezik a belső szögeket</strong>!</li>
                <li><strong>Háromszögek:</strong> Két átlója <strong>4 darab egybevágó derékszögű háromszögre</strong> bontja.</li>
                <li><strong>Szimmetriák:</strong> <strong>2 szimmetriatengely</strong> (a két átló egyenese) és <strong>1 szimmetriaközéppont</strong> (<MathText>{'O'}</MathText>).</li>
                <li className="flex items-center gap-1.5 flex-wrap">
                  <strong>Beírt kör:</strong> Minden rombusz <strong>érintőnégyszög</strong>, van beírt köre. Területe: T = a · m = <Fraction num="e · f" den="2" size="md" />.
                </li>
              </ul>
            </div>
          </TheoryCard>

          {/* 4. Négyzet */}
          <TheoryCard
            title="4. Négyzet (A Szabályos Négyszög)"
            badge="Szabályos"
            badgeColor="emerald"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
                <rect x="70" y="15" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                <line x1="70" y1="15" x2="130" y2="75" stroke="#16a34a" strokeWidth="1.2" />
                <line x1="70" y1="75" x2="130" y2="15" stroke="#16a34a" strokeWidth="1.2" />
                <circle cx="100" cy="45" r="3" fill="#16a34a" />
                <text x="96" y="83" className="text-[10px] font-bold fill-emerald-800">a</text>
              </svg>
            }
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Definíció:</strong> Szabályos négyszög: minden oldala egyenlő és minden szöge derékszög (<MathText>{'90°'}</MathText>).</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Kettős természet:</strong> A négyzet egyszerre téglalap, rombusz, paralelogramma és deltoid!</li>
                <li><strong>Átlók:</strong> <strong>Egyenlők</strong> (<MathText>{'e = f'}</MathText>), <strong>merőlegesek</strong> (<MathText>{'e ⊥ f'}</MathText>), felezik egymást és <MathText>{'45°'}</MathText>-os szögfelezők.</li>
                <li><strong>Szimmetriák:</strong> <strong>4 szimmetriatengely</strong> (2 oldalfelező + 2 átló) és <strong>1 szimmetriaközéppont</strong>.</li>
                <li><strong>Körök:</strong> Egyszerre húrnégyszög (körülírt kör) és érintőnégyszög (beírt kör).</li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A DELTOID SZERKEZETE ÉS SAJÁTOSSÁGAI */}
      <TheorySection
        number={3}
        title="A Deltoid Szerkezete és Különleges Tulajdonságai"
        badgeColor="rose"
        icon={<Target className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TheoryCard
            title="1. A Deltoid Alaptulajdonságai"
            badge="Tengelyes szimmetria"
            badgeColor="pink"
            figure={
              <svg viewBox="0 0 180 85" className="w-44 h-20 mx-auto">
                <polygon points="90,8 135,34 90,78 45,34" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
                <line x1="90" y1="2" x2="90" y2="84" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="45" y1="34" x2="135" y2="34" stroke="#0284c7" strokeWidth="1.5" />
                <text x="58" y="20" className="text-[9px] font-bold fill-pink-600">a</text>
                <text x="115" y="20" className="text-[9px] font-bold fill-pink-600">a</text>
                <text x="58" y="62" className="text-[9px] font-bold fill-rose-700">b</text>
                <text x="115" y="62" className="text-[9px] font-bold fill-rose-700">b</text>
              </svg>
            }
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Definíció:</strong> Olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszúságú.</p>
              <p><strong>Főátló:</strong> A két eltérő csúcsot köti össze, az idom <strong>egyetlen szimmetriatengelye</strong>. Merőlegesen felezi a mellékátlót és a két csúcsszöget.</p>
              <p><strong>Mellékátló:</strong> Merőleges a főátlóra (<MathText>{'e ⊥ f'}</MathText>), végpontjainál a szögek egyenlők: <MathText>{'β = δ'}</MathText>.</p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Konvex vs. Konkáv Deltoid"
            badge="Formák"
            badgeColor="rose"
            figure={
              <svg viewBox="0 0 180 85" className="w-44 h-20 mx-auto">
                <polygon points="90,8 145,75 90,50 35,75" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                <line x1="90" y1="2" x2="90" y2="82" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="35" y1="75" x2="145" y2="75" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 1" />
                <text x="95" y="62" className="text-[8px] font-bold fill-red-800">&gt;180°</text>
              </svg>
            }
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Konvex deltoid:</strong> Minden belső szöge kisebb, mint <MathText>{'180°'}</MathText>, mindkét átlója az idom belsejében metszi egymást.</p>
              <p><strong>Konkáv deltoid (nyílhegy):</strong> Az egyik belső szöge nagyobb, mint <MathText>{'180°'}</MathText> (konkáv szög).</p>
              <p><strong>Külső mellékátló:</strong> A mellékátló a konkáv deltoidon <strong>kívül fut</strong>, de a főátló továbbra is szimmetriatengely és <MathText>{'e ⊥ f'}</MathText> fennáll!</p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Érintőnégyszög és Terület"
            badge="Képlet"
            badgeColor="emerald"
            figure={
              <svg viewBox="0 0 180 85" className="w-44 h-20 mx-auto">
                <polygon points="90,8 135,34 90,78 45,34" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                <circle cx="90" cy="38" r="21" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <text x="82" y="42" className="text-[9px] font-bold fill-emerald-800">r</text>
              </svg>
            }
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Érintőnégyszög tétel:</strong> A szemközti oldalak összege mindig egyenlő: <MathText>{'a + b = a + b'}</MathText>, ezért minden konvex deltoidba <strong>beírt kör rajzolható</strong>.</p>
              <p><strong>Terület képlete:</strong></p>
              <div className="p-2 bg-emerald-100/70 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-1.5 text-sm my-1">
                <span className="font-serif italic text-base">T</span>
                <span>=</span>
                <Fraction num="e · f" den="2" size="md" />
              </div>
              <p className="text-[11px] text-slate-500">Mivel az átlók merőlegesek egymásra, a deltoid területe a köré írt <span className="font-semibold text-slate-700 dark:text-slate-300">e × f</span> méretű téglalap területének pontosan a fele.</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÁTLÓK ÉS TULAJDONSÁGOK TÁBLÁZATA ÉS KÉPLETTÁR */}
      <TheorySection
        number={4}
        title="Négyszögek Átfogó Összehasonlító Rendszere és Képlettára"
        badgeColor="purple"
        icon={<Scale className="w-5 h-5 text-purple-600" />}
      >
        <TheoryTable
          title="Négyszögek összehasonlító mátrixa"
          headers={['Négyszög', 'Átlók felezése', 'Átlók egyenlősége', 'Átlók merőlegessége', 'Szimmetriatengely', 'Szimmetriaközéppont', 'Körök']}
          rows={[
            ['Általános paralelogramma', 'Kölcsönösen felezik egymást', 'NEM egyenlők', 'NEM merőlegesek', '0 db (nincs tengelye)', 'IGEN (O pont)', 'Nincs se beírt, se körülírt'],
            ['Téglalap', 'Kölcsönösen felezik egymást', 'IGEN (e = f)', 'NEM (csak ha négyzet)', '2 db (oldalfelezők)', 'IGEN (O pont)', 'Húrnégyszög (van körülírt kör)'],
            ['Rombusz', 'Kölcsönösen felezik egymást', 'NEM (csak ha négyzet)', 'IGEN (e ⊥ f, szögfelezők)', '2 db (a két átló)', 'IGEN (O pont)', 'Érintőnégyszög (van beírt kör)'],
            ['Négyzet', 'Kölcsönösen felezik egymást', 'IGEN (e = f)', 'IGEN (e ⊥ f, szögfelezők)', '4 db (2 oldalfelező + 2 átló)', 'IGEN (O pont)', 'Húr- és érintőnégyszög is'],
            ['Konvex deltoid', 'Csak a főátló felezi a mellékátlót', 'NEM egyenlők', 'IGEN (e ⊥ f)', '1 db (a főátló egyenese)', 'NEM (nincs centruma)', 'Érintőnégyszög (van beírt kör)']
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TheoryCard
            title="Kerület- és Területképletek Összegzése"
            badge="Képlettár"
            badgeColor="indigo"
          >
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-700 dark:text-purple-300">Paralelogramma:</span>
                <div className="font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">
                  K = 2(a + b) &nbsp;|&nbsp; T = a · mₐ = b · m_b
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-700 dark:text-sky-300">Téglalap:</span>
                <div className="font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">
                  K = 2(a + b) &nbsp;|&nbsp; T = a · b
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-amber-700 dark:text-amber-300">Rombusz:</span>
                <div className="flex items-center gap-2 font-mono font-bold mt-1 text-slate-900 dark:text-slate-100 flex-wrap">
                  <span>K = 4a</span>
                  <span className="text-slate-400">|</span>
                  <span className="flex items-center gap-1">
                    <span>T = a · m = </span>
                    <Fraction num="e · f" den="2" size="md" />
                  </span>
                </div>
              </div>
              <div className="p-2.5 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-800">
                <span className="font-bold text-pink-700 dark:text-pink-300">Deltoid:</span>
                <div className="flex items-center gap-2 font-mono font-bold mt-1 text-pink-900 dark:text-pink-200 flex-wrap">
                  <span>K = 2(a + b)</span>
                  <span className="text-pink-300 dark:text-pink-700">|</span>
                  <span className="flex items-center gap-1">
                    <span>T = </span>
                    <Fraction num="e · f" den="2" size="md" />
                  </span>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A Négyszögek Rokonsági Szabályai"
            badge="Hierarchia"
            badgeColor="purple"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                <strong>„Minden négyzet rombusz és téglalap is.”</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Mert teljesíti a rombusz (egyenlő oldalak) és a téglalap (derékszögek) összes feltételét.</p>
              </div>
              <div className="p-2 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-800">
                <strong>„Minden rombusz deltoid is.”</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Mivel 4 egyenlő oldala van, ezért a szomszédos oldalai is egyenlők (két-két szomszédos oldal egyenlő).</p>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                <strong>„Nem minden deltoid rombusz!”</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Általános deltoidban csak két-két oldal egyenlő (<MathText>{'a ≠ b'}</MathText>), míg a rombuszban mind a 4 oldalnak egyenlőnek kell lennie.</p>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: KIDOLGOZOTT MINTAFELADATOK */}
      <TheorySection
        number={5}
        title="Kidolgozott Mintafeladatok Lépésről Lépésre"
        badgeColor="emerald"
        icon={<BookOpen className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mintafeladat 1 */}
          <TheoryCard
            title="1. Feladat: Paralelogramma területe és magassága"
            badge="Mintapélda"
            badgeColor="emerald"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Egy paralelogramma oldalai <MathText>{'a = 12 cm'}</MathText> és <MathText>{'b = 8 cm'}</MathText>. Az <MathText>{'a'}</MathText> oldalhoz tartozó magasság <MathText>{'m_a = 4 cm'}</MathText>. Számítsd ki a területét és a <MathText>{'b'}</MathText> oldalhoz tartozó <MathText>{'m_b'}</MathText> magasságot!
              </p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Terület):</strong></p>
                <p>T = a · m_a = 12 cm · 4 cm = <strong>48 cm²</strong></p>
                <p className="pt-1"><strong>2. Lépés (Másik magasság kiszámítása):</strong></p>
                <div className="flex items-center gap-1.5 flex-wrap font-mono">
                  <span>T = b · m_b ⟹ m_b = </span>
                  <Fraction num="T" den="b" size="md" />
                  <span> = </span>
                  <Fraction num="48 cm²" den="8 cm" size="md" />
                  <span> = </span>
                  <strong className="text-emerald-900 dark:text-emerald-200 font-bold text-xs">6 cm</strong>
                </div>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                Következtetés: A rövidebb oldalhoz mindig hosszabb magasság tartozik!
              </p>
            </div>
          </TheoryCard>

          {/* Mintafeladat 2 */}
          <TheoryCard
            title="2. Feladat: Deltoid belső szögeinek kiszámítása"
            badge="Mintapélda"
            badgeColor="pink"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Egy konvex deltoid főátlójának végpontjainál fekvő két belső szöge <MathText>{'α = 70°'}</MathText> és <MathText>{'γ = 50°'}</MathText>. Mekkorák a mellékátló végpontjainál fekvő szögek (<MathText>{'β'}</MathText> és <MathText>{'δ'}</MathText>)?
              </p>
              <div className="p-2.5 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Négyszög szögeinek összege):</strong></p>
                <p>α + β + γ + δ = 360°</p>
                <p className="pt-1"><strong>2. Lépés (Ismert szögek levonása):</strong></p>
                <p>70° + 50° + β + δ = 360° ⟹ β + δ = 360° - 120° = 240°</p>
                <p className="pt-1"><strong>3. Lépés (Szimmetria alkalmazása):</strong></p>
                <p>Mivel β = δ (deltoid szimmetrikus szögpárja):</p>
                <div className="flex items-center gap-1.5 flex-wrap font-bold font-mono">
                  <span>β = δ = </span>
                  <Fraction num="240°" den="2" size="md" />
                  <span> = </span>
                  <strong className="text-pink-900 dark:text-pink-200 font-bold text-xs">120°</strong>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Mintafeladat 3 */}
          <TheoryCard
            title="3. Feladat: 60°-os hegyesszögű rombusz"
            badge="Mintapélda"
            badgeColor="purple"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Egy rombusz oldala <MathText>{'a = 10 cm'}</MathText>, és egyik belső szöge <MathText>{'60°'}</MathText>. Mekkora a rövidebbik átlója és a többi belső szöge?
              </p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Szögek meghatározása):</strong></p>
                <p>A szomszédos szögek kiegészítő szögek: β = 180° - 60° = <strong>120°</strong>.</p>
                <p>A rombusz belső szögei: 60°, 120°, 60°, 120°.</p>
                <p className="pt-1"><strong>2. Lépés (Rövidebb átló kiszámítása):</strong></p>
                <p>A 60°-os szög csúcsait összekötő átlóval keletkező háromszög szárai 10 cm-esek.</p>
                <div className="flex items-center gap-1.5 flex-wrap font-mono">
                  <span>Alapszögek kiszámítása: </span>
                  <Fraction num="180° - 60°" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="120°" den="2" size="md" />
                  <span> = </span>
                  <strong className="text-purple-900 dark:text-purple-200 font-bold text-xs">60°</strong>
                  <span className="font-sans font-semibold text-purple-800 dark:text-purple-300">⟹ szabályos háromszög!</span>
                </div>
                <p className="pt-0.5">Ezért a rövidebb átló pontosan <strong>10 cm</strong> hosszú.</p>
              </div>
            </div>
          </TheoryCard>

          {/* Mintafeladat 4 */}
          <TheoryCard
            title="4. Feladat: Deltoid területe és kerülete"
            badge="Mintapélda"
            badgeColor="blue"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Egy deltoid átlói <MathText>{'e = 14 cm'}</MathText> és <MathText>{'f = 8 cm'}</MathText>. Két különböző oldala <MathText>{'a = 5 cm'}</MathText> és <MathText>{'b = 10 cm'}</MathText>. Mekkora a kerülete és területe?
              </p>
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Kerület):</strong></p>
                <p>K = 2 · (a + b) = 2 · (5 cm + 10 cm) = 2 · 15 cm = <strong>30 cm</strong></p>
                <p className="pt-1"><strong>2. Lépés (Terület):</strong></p>
                <div className="flex items-center gap-1.5 flex-wrap font-mono">
                  <span>T = </span>
                  <Fraction num="e · f" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="14 cm · 8 cm" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="112 cm²" den="2" size="md" />
                  <span> = </span>
                  <strong className="text-sky-900 dark:text-sky-200 font-bold text-xs">56 cm²</strong>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI TÉVHITEK ÉS CSAPDÁK */}
      <TheorySection
        number={6}
        title="Gyakori Tévhitek, Csapdák és Megjegyzések"
        badgeColor="rose"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryTrapBox
            title="Tipikus Geometriai Félreértések"
            traps={[
              {
                mistake: '„Minden paralelogramma átlói merőlegesek egymásra.”',
                correction: 'NEM! Az átlók általános paralelogrammában NEM merőlegesek. Csak a rombusznál és a négyzetnél (valamint a deltoidnál) merőlegesek egymásra!'
              },
              {
                mistake: '„A téglalap átlói szögfelezők.”',
                correction: 'NEM! A téglalap átlói nem felezik a 90°-os sarokszöget (általában pl. 30° és 60°-os részekre bontják). Az átlók csak a rombusznál és négyzetnél szögfelezők!'
              },
              {
                mistake: '„A deltoid mindkét átlója szimmetriatengely.”',
                correction: 'NEM! A deltoidnak pontosan 1 szimmetriatengelye van: a két eltérő csúcsot összekötő főátló. A mellékátló nem szimmetriatengely!'
              },
              {
                mistake: '„Az általános paralelogrammának vannak szimmetriatengelyei.”',
                correction: 'TÉVEDÉS! Az általános paralelogrammának 0 szimmetriatengelye van. Kizárólag középpontosan szimmetrikus az átlók metszéspontjára!'
              },
              {
                mistake: '„A négyzet nem deltoid, mert minden oldala egyforma.”',
                correction: 'HAMIS! A négyzet deltoid is, sőt rombusz és téglalap is egyszerre, mert minden meghatározó tulajdonságuknak megfelel.'
              }
            ]}
          />

          <TheoryCallout
            title="Összegzés és Emlékeztető"
            variant="purple"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Hogyan jegyezd meg az átlók tulajdonságait?</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-purple-700 dark:text-purple-300">Felezik egymást:</strong> minden paralelogramma (paralelogramma, téglalap, rombusz, négyzet).</li>
                <li><strong className="text-pink-700 dark:text-pink-300">Merőlegesek egymásra:</strong> minden rombusz, négyzet és deltoid.</li>
                <li><strong className="text-sky-700 dark:text-sky-300">Egyenlő hosszúak:</strong> minden téglalap és négyzet.</li>
                <li><strong className="text-emerald-700 dark:text-emerald-300">Szögfelezők:</strong> minden rombusz és négyzet (valamint a deltoid főátlója).</li>
              </ul>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ParallelogramDeltoidTheory;
