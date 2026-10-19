import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Trophy,
  Compass,
  Repeat,
  Cpu,
  TrendingUp,
  Brain,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  Layers,
  HelpCircle
} from 'lucide-react';

export interface LocationSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const LocationSummaryTheory: React.FC<LocationSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Mester Műszerfal Állapot ---
  const [activeTab, setActiveTab] = useState<'coord' | 'machine' | 'sequence'>('coord');

  // Koordináta pont állapot
  const [posX, setPosX] = useState<number>(3);
  const [posY, setPosY] = useState<number>(2);

  // Számgép állapot
  const [machineX, setMachineX] = useState<number>(5);

  // Sorozat n állapot
  const [seqN, setSeqN] = useState<number>(6);

  // Számítások
  const machineOutput = machineX * 3 - 2;
  const squareN = seqN * seqN;
  const triangleN = (seqN * (seqN + 1)) / 2;
  const fibSeries = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  const fibN = fibSeries[Math.min(seqN - 1, fibSeries.length - 1)];

  return (
    <TheoryTemplate
      documentId="grade-5-location-summary-theory"
      pdfFilename="5_osztaly_V_10_helymeghatarozas_sorozatok_osszefoglalas.pdf"
      title="V. Fejezet Összefoglalás: Helymeghatározás és Sorozatok"
      subtitle="A derékszögű koordináta-rendszer, tájékozódás a síkban, ritmusok és díszítősorok, számgépek és szabályok, valamint a számtani, mértani és nevezetes sorozatok átfogó szintézise"
      themeColor="slate"
      emoji="🏆"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 10. NAGYÖSSZEFOGLALÓ"
      quickRule={{
        label: 'A fejezet 3 legfőbb alapköve',
        formula: 'P(x; y) \\text{ koordinátapár} \\quad \\Longleftrightarrow \\quad y = a \\cdot x + b \\text{ számgép-szabály} \\quad \\Longleftrightarrow \\quad a_n = a_1 + (n - 1) \\cdot d \\text{ számsorozat}'
      }}
      practiceTitle="Készen állsz a nagy fejezeti megmérettetésre?"
      practiceSubtitle="Tedd próbára az egész fejezetben megszerzett tudásodat a 30 feladatos összefoglaló nagytesztben és játssz a záró párosító és csoportosító módban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A FEJEZET 4 FŐ PILLÉRE */}
      <TheorySection
        id="fejezeti-pillerek"
        title="1. A Fejezet 4 Alappillére"
        subtitle="Milyen kulcsterületeket sajátítottál el az V. fejezet során?"
        badge="ÁTTEKINTÉS"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TheoryCard
            title="1. Pillér: Koordináták"
            badge="P(x; y)"
            color="blue"
            icon={<Compass className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Vízszintes $x$ és függőleges $y$ tengely, origó $O(0; 0)$, a 4 síknegyed és tengelyponti szabályok.
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded text-[11px] font-mono text-blue-900 dark:text-blue-200">
              Sorrend: (vízszintes; függőleges)
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Pillér: Sorminták"
            badge="RITMUS ÉS PERIÓDUS"
            color="emerald"
            icon={<Repeat className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ismétlődő motívum (alapszakasz), eltolás, tükrözés, forgatás és az $n$-edik elem maradékos kiszámítása.
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-[11px] font-mono text-emerald-900 dark:text-emerald-200">
              Pozíció = n mod periódus
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Pillér: Számgépek"
            badge="BEMENET & KIMENET"
            color="amber"
            icon={<Cpu className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Számgép belső műveletsora ($y = a \cdot x + b$), értéktáblázatok lépésköze és fordított (inverz) működés.
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded text-[11px] font-mono text-amber-900 dark:text-amber-200">
              Inverz: ellentétes sorrendben!
            </div>
          </TheoryCard>

          <TheoryCard
            title="4. Pillér: Sorozatok"
            badge="SZÁMTANI & NEVEZETES"
            color="rose"
            icon={<TrendingUp className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Tagok (aₙ), lépésköz (d), számtani és mértani sorozatok, négyzetszámok, háromszögszámok és Fibonacci.
            </p>
            <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded text-[11px] font-mono text-rose-900 dark:text-rose-200">
              aₙ = a₁ + (n - 1) · d
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV MESTER LABORATÓRIUM */}
      <TheorySection
        id="mester-labor"
        title="2. Interaktív Fejezeti Műszerfal"
        subtitle="Próbáld ki és gyakorold az összes alapmechanizmust egyetlen interaktív eszközben!"
        badge="ÖSSZEFOGLALÓ ESZKÖZ"
      >
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          {/* Módválasztó gombok */}
          <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
            <button
              onClick={() => setActiveTab('coord')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'coord'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Koordináta-rendszer</span>
            </button>
            <button
              onClick={() => setActiveTab('machine')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'machine'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Számgép Labor</span>
            </button>
            <button
              onClick={() => setActiveTab('sequence')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sequence'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>3. Nevezetes Sorozatok</span>
            </button>
          </div>

          {/* TAB 1: KOORDINÁTA RENDSZER */}
          {activeTab === 'coord' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Állítsd be a pont helyét a tengelyeken:
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-blue-600">X tengely:</span>
                    {[-3, -1, 0, 2, 4].map(vx => (
                      <button
                        key={vx}
                        onClick={() => setPosX(vx)}
                        className={`w-7 h-7 rounded text-xs font-bold ${
                          posX === vx ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {vx}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-emerald-600">Y tengely:</span>
                    {[-3, -1, 0, 2, 3].map(vy => (
                      <button
                        key={vy}
                        onClick={() => setPosY(vy)}
                        className={`w-7 h-7 rounded text-xs font-bold ${
                          posY === vy ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {vy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vizuális koordináta sík */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center shadow-inner">
                  <svg viewBox="-90 -70 180 140" className="h-44 select-none">
                    {/* Rács */}
                    {[-4, -3, -2, -1, 1, 2, 3, 4].map(v => (
                      <React.Fragment key={v}>
                        <line x1={v * 18} y1="-65" x2={v * 18} y2="65" stroke="#e2e8f0" strokeWidth="0.8" className="dark:stroke-slate-800" />
                        <line x1="-85" y1={v * 18} x2="85" y2={v * 18} stroke="#e2e8f0" strokeWidth="0.8" className="dark:stroke-slate-800" />
                      </React.Fragment>
                    ))}
                    {/* Tengelyek */}
                    <line x1="-85" y1="0" x2="85" y2="0" stroke="#3b82f6" strokeWidth="1.8" />
                    <line x1="0" y1="65" x2="0" y2="-65" stroke="#10b981" strokeWidth="1.8" />
                    <text x="80" y="-4" className="text-[9px] font-bold fill-blue-600">x</text>
                    <text x="5" y="-58" className="text-[9px] font-bold fill-emerald-600">y</text>

                    {/* Pont kirajzolása */}
                    <circle cx={posX * 18} cy={-posY * 18} r="6" fill="#ef4444" className="animate-pulse" />
                    <text
                      x={posX * 18 + 8}
                      y={-posY * 18 - 6}
                      className="text-[10px] font-black fill-slate-800 dark:fill-white font-mono"
                    >
                      P({posX}; {posY})
                    </text>
                  </svg>
                </div>

                <div className="md:col-span-4 p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs space-y-2">
                  <div className="font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wider">
                    Pont Elemzése:
                  </div>
                  <div>&bull; Pont neve: <strong className="font-mono">P({posX}; {posY})</strong></div>
                  <div>&bull; Vízszintes lépés (x): <strong>{posX} egység</strong></div>
                  <div>&bull; Függőleges lépés (y): <strong>{posY} egység</strong></div>
                  <div>
                    &bull; Helyzet:{' '}
                    <strong>
                      {posX === 0 && posY === 0
                        ? 'Origó O(0;0)'
                        : posX === 0
                        ? 'Az Y-tengelyen fekszik'
                        : posY === 0
                        ? 'Az X-tengelyen fekszik'
                        : posX > 0 && posY > 0
                        ? 'I. Síknegyed (+; +)'
                        : posX < 0 && posY > 0
                        ? 'II. Síknegyed (-; +)'
                        : posX < 0 && posY < 0
                        ? 'III. Síknegyed (-; -)'
                        : 'IV. Síknegyed (+; -)'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SZÁMGÉP */}
          {activeTab === 'machine' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Válassz bemeneti értéket (x):
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 5, 10].map(v => (
                    <button
                      key={v}
                      onClick={() => setMachineX(v)}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        machineX === v ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      x = {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center justify-center gap-4 flex-wrap py-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-950/60 rounded-xl border border-blue-300 text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Bemenet (x)</span>
                  <span className="text-2xl font-black text-blue-900 dark:text-blue-200">{machineX}</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md text-xs">
                  <span>Szabály: · 3 majd - 2</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl border border-emerald-300 text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Kimenet (y)</span>
                  <span className="text-2xl font-black text-emerald-900 dark:text-emerald-200">{machineOutput}</span>
                </div>
              </div>

              <div className="text-xs text-center text-slate-600 dark:text-slate-300 font-mono">
                {machineX} · 3 - 2 = {machineX * 3} - 2 = <strong>{machineOutput}</strong> | Inverz ellenőrzés: ({machineOutput} + 2) : 3 = {machineX}
              </div>
            </div>
          )}

          {/* TAB 3: NEVEZETES SOROZATOK */}
          {activeTab === 'sequence' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Válassz sorszámot (n):
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map(v => (
                    <button
                      key={v}
                      onClick={() => setSeqN(v)}
                      className={`w-8 h-8 rounded text-xs font-bold ${
                        seqN === v ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {v}.
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase block">
                    {seqN}. Négyzetszám (n²)
                  </span>
                  <div className="text-3xl font-black text-purple-950 dark:text-purple-100 my-1">
                    {squareN}
                  </div>
                  <span className="text-xs font-mono text-purple-800 dark:text-purple-300">
                    {seqN} · {seqN} = {squareN}
                  </span>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-center">
                  <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase block">
                    {seqN}. Háromszögszám (Tₙ)
                  </span>
                  <div className="text-3xl font-black text-teal-950 dark:text-teal-100 my-1">
                    {triangleN}
                  </div>
                  <span className="text-xs font-mono text-teal-800 dark:text-teal-300">
                    1-től {seqN}-ig az összeg
                  </span>
                </div>

                <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-center">
                  <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase block">
                    {seqN}. Fibonacci-szám (Fₙ)
                  </span>
                  <div className="text-3xl font-black text-rose-950 dark:text-rose-100 my-1">
                    {fibN}
                  </div>
                  <span className="text-xs font-mono text-rose-800 dark:text-rose-300">
                    F_{seqN} = {fibN}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TIPUSCSAPDÁK ÉS GYAKORI HIBÁK */}
      <TheorySection
        id="gyakori-hibak"
        title="3. Tipikus Csapdák és Megelőzésük a Dolgozatban"
        subtitle="Mire figyelj kiemelten a felmérések és tesztek során?"
        badge="CSAPDÁK KIVÉDÉSE"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Tengelyek felcserélése"
            badge="KOORDINÁTA CSAPDA"
            color="rose"
            icon={<Target className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Gyakori hiba a (2; 5) és (5; 2) összekeverése. Mindig először a <strong>vízszintes ($x$)</strong> tengelyen lépünk, és csak utána fel vagy le ($y$)!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Inverz művelet sorrendje"
            badge="SZÁMGÉP CSAPDA"
            color="amber"
            icon={<Cpu className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha a gép szabálya: „szorozz 3-mal, majd adj hozzá 4-et”, a visszafelé számolásnál <strong>először le kell vonni a 4-et</strong>, és csak utána osztani 3-mal!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Sorszám vs Tag értéke"
            badge="SOROZAT CSAPDA"
            color="purple"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Az n sorszám azt mondja meg, hányadik elemről van szó (hely), míg az aₙ a mezőben lévő tényleges számértéket jelöli. Ne keverd össze őket!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
