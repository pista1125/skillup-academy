import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Compass,
  Grid,
  MapPin,
  Move,
  Maximize2,
  Lightbulb,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Crosshair,
  ArrowRight,
  HelpCircle,
  Layers,
  Split,
  Eye
} from 'lucide-react';

export interface CoordinateSystemTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const CoordinateSystemTheory: React.FC<CoordinateSystemTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Koordináta-rendszer Állapot ---
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number }>({ x: 3, y: 2 });
  const [showReflection, setShowReflection] = useState<'none' | 'x' | 'y' | 'orig'>('none');

  // Segédfüggvény a pont helyzetének leírásához
  const getPointLocation = (x: number, y: number) => {
    if (x === 0 && y === 0) return { name: 'Origó', badge: 'bg-amber-500 text-white', desc: 'A két tengely metszéspontja' };
    if (y === 0) return { name: 'x-tengelyen fekszik', badge: 'bg-blue-600 text-white', desc: 'Második koordinátája 0' };
    if (x === 0) return { name: 'y-tengelyen fekszik', badge: 'bg-emerald-600 text-white', desc: 'Első koordinátája 0' };
    if (x > 0 && y > 0) return { name: 'I. síknegyed', badge: 'bg-indigo-600 text-white', desc: 'Jobbra fent (+; +)' };
    if (x < 0 && y > 0) return { name: 'II. síknegyed', badge: 'bg-purple-600 text-white', desc: 'Balra fent (-; +)' };
    if (x < 0 && y < 0) return { name: 'III. síknegyed', badge: 'bg-rose-600 text-white', desc: 'Balra lent (-; -)' };
    return { name: 'IV. síknegyed', badge: 'bg-amber-600 text-white', desc: 'Jobbra lent (+; -)' };
  };

  const pointLoc = getPointLocation(selectedPoint.x, selectedPoint.y);

  // Tükrözött koordináták kiszámítása
  const getReflectedPoint = () => {
    switch (showReflection) {
      case 'x':
        return { x: selectedPoint.x, y: -selectedPoint.y, label: "Tükörkép x-re: (" + selectedPoint.x + "; " + (-selectedPoint.y) + ")" };
      case 'y':
        return { x: -selectedPoint.x, y: selectedPoint.y, label: "Tükörkép y-ra: (" + (-selectedPoint.x) + "; " + selectedPoint.y + ")" };
      case 'orig':
        return { x: -selectedPoint.x, y: -selectedPoint.y, label: "Tükörkép origóra: (" + (-selectedPoint.x) + "; " + (-selectedPoint.y) + ")" };
      default:
        return null;
    }
  };

  const reflected = getReflectedPoint();

  // --- 2. Síknegyed Felfedező Állapot ---
  const [activeQuadrant, setActiveQuadrant] = useState<'all' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'axes'>('all');

  return (
    <TheoryTemplate
      documentId="grade-5-coordinate-system-theory"
      pdfFilename="5_osztaly_V_3_derekszogu_koordinata_rendszer.pdf"
      title="A derékszögű koordináta-rendszer"
      subtitle="Két egymásra merőleges számegyenes, az origó, a tengelyek (abszcissza és ordináta), a négy síknegyed (kvadráns) és a pontok helyzete a síkban"
      themeColor="purple"
      emoji="📈"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 3. TANANYAG"
      quickRule={{
        label: 'A koordináta-rendszer és a számpárok alapszabálya',
        formula: 'P(x; y) \\quad \\Longrightarrow \\quad \\text{Első: } x \\text{ (vízszintes)}, \\quad \\text{Második: } y \\text{ (függőleges)}'
      }}
      practiceTitle="Készen állsz a koordináta-rendszer feladataira?"
      practiceSubtitle="Gyakorold a pontok azonosítását és a síknegyedeket a 30 kérdéses kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A KOORDINÁTA-RENDSZER FELÉPÍTÉSE */}
      <TheorySection
        id="koordinata-rendszer-felepitese"
        title="1. A derékszögű koordináta-rendszer felépítése"
        subtitle="Hogyan alkot két egymásra merőleges számegyenes egyértelmű tájékozódási hálót a síkon?"
        badge="ALAPFOGALMAK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Mi a derékszögű koordináta-rendszer?"
            badge="FOGALOM"
            color="purple"
            icon={<Grid className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A <strong>derékszögű koordináta-rendszer</strong> (más néven <em>Descartes-féle</em> koordináta-rendszer, René Descartes francia matematikusról elnevezve) <strong>két egymásra merőleges számegyenesből</strong> áll, amelyek a 0 pontjukban metszik egymást.
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Miért zseniális találmány?
              </div>
              <p>
                Lehetővé teszi, hogy a geometriai pontokat és alakzatokat pontos számokkal írjuk le, és számolásokat végezzünk velük!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A koordináta-rendszer fő alkotóelemei"
            badge="FELÉPÍTÉS"
            color="indigo"
            icon={<Compass className="w-5 h-5 text-indigo-600" />}
          >
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-600 shrink-0">1. Origó (O):</span>
                <span>A két tengely metszéspontja, a mérések kiindulópontja. Koordinátája: <strong>(0; 0)</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 shrink-0">2. Első tengely (x-tengely):</span>
                <span>A <strong>vízszintes</strong> számegyenes (abszcissza). Jobbra a pozitív, balra a negatív számok nőnek. Nyíl jelzi a növekvő irányt (jobbra).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 shrink-0">3. Második tengely (y-tengely):</span>
                <span>A <strong>függőleges</strong> számegyenes (ordináta). Felfelé pozitív, lefelé negatív. Nyíl jelzi a növekvő irányt (felfelé).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 shrink-0">4. Egység:</span>
                <span>A tengelyeken bejelölt szakasz (pl. 1 rácsnégyzet = 1 egység). Mindkét tengelyen egyenletes beosztás szükséges!</span>
              </li>
            </ul>
          </TheoryCard>
        </div>

        {/* Vizuális ábra a koordináta-rendszerről */}
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-center">
            A koordináta-rendszer alapszerkezete tengelyekkel és az origóval
          </div>
          <div className="flex justify-center">
            <svg viewBox="-160 -140 320 280" className="w-full max-w-md h-64 select-none">
              {/* Rácsvonalak */}
              {[-120, -90, -60, -30, 30, 60, 90, 120].map((pos) => (
                <g key={pos}>
                  <line x1={pos} y1={-120} x2={pos} y2={120} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" />
                  <line x1={-140} y1={pos} x2={140} y2={pos} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" />
                </g>
              ))}

              {/* x-tengely */}
              <line x1={-145} y1={0} x2={145} y2={0} stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2.5" />
              <polygon points="145,0 135,-4 135,4" className="fill-blue-600 dark:fill-blue-400" />
              <text x={148} y={4} className="text-xs font-bold fill-blue-600 dark:fill-blue-400" dominantBaseline="middle">x</text>

              {/* y-tengely */}
              <line x1={0} y1={125} x2={0} y2={-125} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth="2.5" />
              <polygon points="0,-125 -4,-115 4,-115" className="fill-emerald-600 dark:fill-emerald-400" />
              <text x={-1} y={-132} className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">y</text>

              {/* Beosztások és számok x-tengelyen */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((num) => (
                <g key={`x-${num}`}>
                  <line x1={num * 30} y1={-4} x2={num * 30} y2={4} stroke="currentColor" className="text-blue-700 dark:text-blue-300" strokeWidth="1.5" />
                  <text x={num * 30} y={16} textAnchor="middle" className="text-[10px] font-semibold fill-slate-600 dark:fill-slate-400">{num}</text>
                </g>
              ))}

              {/* Beosztások és számok y-tengelyen */}
              {[-3, -2, -1, 1, 2, 3].map((num) => (
                <g key={`y-${num}`}>
                  <line x1={-4} y1={-num * 30} x2={4} y2={-num * 30} stroke="currentColor" className="text-emerald-700 dark:text-emerald-300" strokeWidth="1.5" />
                  <text x={-12} y={-num * 30 + 3} textAnchor="end" className="text-[10px] font-semibold fill-slate-600 dark:fill-slate-400">{num}</text>
                </g>
              ))}

              {/* Origó pont */}
              <circle cx={0} cy={0} r={4.5} className="fill-amber-500 stroke-white dark:stroke-slate-900" strokeWidth="2" />
              <text x={10} y={-8} className="text-xs font-black fill-amber-600 dark:fill-amber-400">O(0; 0)</text>

              {/* Példa pont: P(3; 2) */}
              <line x1={90} y1={0} x2={90} y2={-60} stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1={0} y1={-60} x2={90} y2={-60} stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={90} cy={-60} r={5} className="fill-purple-600 stroke-white dark:stroke-slate-900" strokeWidth="2" />
              <text x={96} y={-66} className="text-xs font-bold fill-purple-700 dark:fill-purple-300">P(3; 2)</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: RENDEZETT SZÁMPÁROK ÉS PONTOK LEOLVASÁSA */}
      <TheorySection
        id="pontok-rendezett-szampar"
        title="2. Pontok megadása rendezett számpárral és leolvasása"
        subtitle="Miért döntő a sorrend, és hogyan olvassuk le bármely pont helyzetét a síkon?"
        badge="SZABÁLYOK"
      >
        <FormulaBox
          title="A rendezett számpár szabálya"
          formula="P(x; y) \quad \text{ahol } x \text{ az első koordináta, } y \text{ a második koordináta}"
          explanation="A számpár tagjait pontosvesszővel (vagy vesszővel) választjuk el és kerek zárójelbe tesszük. A sorrend szigorúan kötött: MINDIG az x-tengelyen lépünk először!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="Hogyan olvassuk le egy pont koordinátáit?"
            badge="LEOLVASÁS LÉPÉSEI"
            color="purple"
            icon={<Eye className="w-5 h-5 text-purple-600" />}
          >
            <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>1. lépés (x leolvasása):</strong> A pontból merőlegesen vetítünk a vízszintes $x$-tengelyre. Ahol metszi a tengelyt, az lesz az <em>első koordináta</em> ($x$).
              </li>
              <li>
                <strong>2. lépés (y leolvasása):</strong> A pontból merőlegesen vetítünk a függőleges $y$-tengelyre. Ahol metszi a tengelyt, az lesz a <em>második koordináta</em> ($y$).
              </li>
              <li>
                <strong>3. lépés (felírás):</strong> Zárójelbe tesszük a kapott számokat: $P(x; y)$.
              </li>
            </ol>
            <div className="mt-3 p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200">
              ⚠️ <strong>Vigyázat: (2; 5) NEM ugyanaz, mint (5; 2)!</strong> A (2; 5) két lépés jobbra, 5 fel; míg az (5; 2) 5 lépés jobbra, 2 fel!
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tengelyeken fekvő pontok különlegességei"
            badge="FONTOS SZABÁLY"
            color="amber"
            icon={<Crosshair className="w-5 h-5 text-amber-600" />}
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-700 dark:text-blue-300">Az x-tengely pontjai:</span>
                <p className="mt-0.5">
                  Minden olyan pont, ami a vízszintes tengelyen van, sem felfelé, sem lefelé nem mozdult el, ezért a <strong>második koordinátája mindig 0</strong>:
                  <br />
                  <code className="font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-200">(x; 0)</code> &mdash; pl. $(4; 0)$, $(-3; 0)$.
                </p>
              </div>

              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">Az y-tengely pontjai:</span>
                <p className="mt-0.5">
                  Minden olyan pont, ami a függőleges tengelyen van, sem jobbra, sem balra nem mozdult el, ezért az <strong>első koordinátája mindig 0</strong>:
                  <br />
                  <code className="font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-emerald-800 dark:text-emerald-200">(0; y)</code> &mdash; pl. $(0; 5)$, $(0; -2)$.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: KOORDINÁTA PONT-VIZSGÁLÓ */}
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/30 rounded-2xl border-2 border-purple-300 dark:border-purple-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-purple-600 text-white">
                  Interaktív Eszköz
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Koordináta Felfedező és Tükrözés Szimulátor
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Kattints a rács bármely pontjára a koordináták azonnali elemzéséhez, vagy válassz tükrözést!
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Tükrözés:</span>
              <button
                onClick={() => setShowReflection(showReflection === 'x' ? 'none' : 'x')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  showReflection === 'x'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                x-tengelyre
              </button>
              <button
                onClick={() => setShowReflection(showReflection === 'y' ? 'none' : 'y')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  showReflection === 'y'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                y-tengelyre
              </button>
              <button
                onClick={() => setShowReflection(showReflection === 'orig' ? 'none' : 'orig')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  showReflection === 'orig'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Origóra
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Kattintható Sík */}
            <div className="lg:col-span-7 flex justify-center bg-white dark:bg-slate-900 p-3 rounded-xl border border-purple-200 dark:border-purple-800/60 shadow-inner">
              <svg
                viewBox="-165 -165 330 330"
                className="w-full max-w-[340px] h-72 select-none cursor-crosshair"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const clickY = e.clientY - rect.top;
                  // SVG mérete: 330x330, origó középen (165, 165), 1 egység = 30px
                  const svgX = ((clickX / rect.width) * 330) - 165;
                  const svgY = ((clickY / rect.height) * 330) - 165;
                  const unitX = Math.round(svgX / 30);
                  const unitY = Math.round(-svgY / 30);
                  const clampedX = Math.max(-5, Math.min(5, unitX));
                  const clampedY = Math.max(-5, Math.min(5, unitY));
                  setSelectedPoint({ x: clampedX, y: clampedY });
                }}
              >
                {/* Rácsháló */}
                {[-150, -120, -90, -60, -30, 30, 60, 90, 120, 150].map((coord) => (
                  <g key={`grid-${coord}`}>
                    <line x1={coord} y1={-150} x2={coord} y2={150} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                    <line x1={-150} y1={coord} x2={150} y2={coord} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                  </g>
                ))}

                {/* Síknegyed feliratok a háttérben */}
                <text x={75} y={-75} textAnchor="middle" className="text-xl font-black fill-slate-200 dark:fill-slate-800/80">I.</text>
                <text x={-75} y={-75} textAnchor="middle" className="text-xl font-black fill-slate-200 dark:fill-slate-800/80">II.</text>
                <text x={-75} y={75} textAnchor="middle" className="text-xl font-black fill-slate-200 dark:fill-slate-800/80">III.</text>
                <text x={75} y={75} textAnchor="middle" className="text-xl font-black fill-slate-200 dark:fill-slate-800/80">IV.</text>

                {/* x-tengely */}
                <line x1={-155} y1={0} x2={155} y2={0} stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2.5" />
                <polygon points="155,0 145,-4 145,4" className="fill-blue-600 dark:fill-blue-400" />
                <text x={158} y={3} className="text-[11px] font-bold fill-blue-600 dark:fill-blue-400" dominantBaseline="middle">x</text>

                {/* y-tengely */}
                <line x1={0} y1={155} x2={0} y2={-155} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth="2.5" />
                <polygon points="0,-155 -4,-145 4,-145" className="fill-emerald-600 dark:fill-emerald-400" />
                <text x={-1} y={-160} className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">y</text>

                {/* Beosztás és számok */}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((num) => (
                  <g key={`num-${num}`}>
                    <line x1={num * 30} y1={-3} x2={num * 30} y2={3} stroke="currentColor" className="text-blue-700 dark:text-blue-300" strokeWidth="1.5" />
                    <text x={num * 30} y={14} textAnchor="middle" className="text-[9px] font-medium fill-slate-500">{num}</text>
                    <line x1={-3} y1={-num * 30} x2={3} y2={-num * 30} stroke="currentColor" className="text-emerald-700 dark:text-emerald-300" strokeWidth="1.5" />
                    <text x={-9} y={-num * 30 + 3} textAnchor="end" className="text-[9px] font-medium fill-slate-500">{num}</text>
                  </g>
                ))}

                {/* Origó jelzés */}
                <circle cx={0} cy={0} r={4} className="fill-amber-500" />

                {/* Szaggatott vetítővonalak a kiválasztott ponthoz */}
                <line
                  x1={selectedPoint.x * 30}
                  y1={0}
                  x2={selectedPoint.x * 30}
                  y2={-selectedPoint.y * 30}
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <line
                  x1={0}
                  y1={-selectedPoint.y * 30}
                  x2={selectedPoint.x * 30}
                  y2={-selectedPoint.y * 30}
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Tükrözött pont, ha be van kapcsolva */}
                {reflected && (
                  <g>
                    <line
                      x1={selectedPoint.x * 30}
                      y1={-selectedPoint.y * 30}
                      x2={reflected.x * 30}
                      y2={-reflected.y * 30}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={reflected.x * 30}
                      cy={-reflected.y * 30}
                      r={5.5}
                      className="fill-amber-500 stroke-white dark:stroke-slate-900"
                      strokeWidth="2"
                    />
                    <text
                      x={reflected.x * 30 + (reflected.x >= 0 ? 8 : -8)}
                      y={-reflected.y * 30 - 8}
                      textAnchor={reflected.x >= 0 ? 'start' : 'end'}
                      className="text-[10px] font-black fill-amber-600 dark:fill-amber-400"
                    >
                      P'({reflected.x}; {reflected.y})
                    </text>
                  </g>
                )}

                {/* Kiválasztott pont */}
                <circle
                  cx={selectedPoint.x * 30}
                  cy={-selectedPoint.y * 30}
                  r={6.5}
                  className="fill-purple-600 stroke-white dark:stroke-slate-900 shadow-lg animate-pulse"
                  strokeWidth="2.5"
                />
                <text
                  x={selectedPoint.x * 30 + (selectedPoint.x >= 0 ? 8 : -8)}
                  y={-selectedPoint.y * 30 - 8}
                  textAnchor={selectedPoint.x >= 0 ? 'start' : 'end'}
                  className="text-xs font-black fill-purple-700 dark:fill-purple-300"
                >
                  P({selectedPoint.x}; {selectedPoint.y})
                </text>
              </svg>
            </div>

            {/* Részletes Pont Információs Panel */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kiválasztott pont</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${pointLoc.badge}`}>
                    {pointLoc.name}
                  </span>
                </div>

                <div className="text-2xl font-black text-purple-700 dark:text-purple-300">
                  P({selectedPoint.x}; {selectedPoint.y})
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Első koordináta (x):</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{selectedPoint.x} ({selectedPoint.x > 0 ? 'jobbra' : selectedPoint.x < 0 ? 'balra' : 'helyben'})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Második koordináta (y):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedPoint.y} ({selectedPoint.y > 0 ? 'felfelé' : selectedPoint.y < 0 ? 'lefelé' : 'helyben'})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Távolság az x-tengelytől:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">|{selectedPoint.y}| = {Math.abs(selectedPoint.y)} egység</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">Távolság az y-tengelytől:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">|{selectedPoint.x}| = {Math.abs(selectedPoint.x)} egység</span>
                  </div>
                </div>

                {reflected && (
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs">
                    <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">
                      {reflected.label}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {showReflection === 'x' && 'x-tengelyre tükrözve csak a második koordináta (y) előjele vált ellentétesre!'}
                      {showReflection === 'y' && 'y-tengelyre tükrözve csak az első koordináta (x) előjele vált ellentétesre!'}
                      {showReflection === 'orig' && 'Origóra tükrözve mindkét koordináta az ellentettjére változik!'}
                    </span>
                  </div>
                )}
              </div>

              {/* Gyors pont-választó gombok */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-500 py-1">Próbáld ki:</span>
                {[
                  { x: 4, y: 3, label: 'I. negyed' },
                  { x: -3, y: 4, label: 'II. negyed' },
                  { x: -4, y: -2, label: 'III. negyed' },
                  { x: 3, y: -4, label: 'IV. negyed' },
                  { x: 5, y: 0, label: 'x-tengely' },
                  { x: 0, y: -3, label: 'y-tengely' },
                  { x: 0, y: 0, label: 'Origó' }
                ].map((item) => (
                  <button
                    key={`${item.x}-${item.y}`}
                    onClick={() => setSelectedPoint({ x: item.x, y: item.y })}
                    className="px-2 py-1 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:text-purple-600 transition-colors"
                  >
                    ({item.x}; {item.y})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A NÉGY SÍKNEGYED (KVADRÁNSOK) */}
      <TheorySection
        id="a-negy-siknegyed"
        title="3. A négy síknegyed (kvadráns) és az előjelek"
        subtitle="Hogyan osztja fel a két tengely a síkot 4 részre, és hogyan ismerjük fel őket az előjelekből?"
        badge="SÍKNEGYEDEK"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">I. SÍKNEGYED</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200">
                (+ ; +)
              </span>
            </div>
            <div className="font-bold text-sm text-slate-800 dark:text-white">Jobbra fent</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mindkét koordináta pozitív: <strong>x &gt; 0</strong> és <strong>y &gt; 0</strong>.
            </p>
            <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              Példák: (2; 3), (5; 1), (1; 6)
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border-2 border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-600 dark:text-purple-400">II. SÍKNEGYED</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
                (- ; +)
              </span>
            </div>
            <div className="font-bold text-sm text-slate-800 dark:text-white">Balra fent</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az x negatív, az y pozitív: <strong>x &lt; 0</strong> és <strong>y &gt; 0</strong>.
            </p>
            <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">
              Példák: (-4; 2), (-1; 5), (-3; 3)
            </div>
          </div>

          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border-2 border-rose-200 dark:border-rose-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">III. SÍKNEGYED</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">
                (- ; -)
              </span>
            </div>
            <div className="font-bold text-sm text-slate-800 dark:text-white">Balra lent</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mindkét koordináta negatív: <strong>x &lt; 0</strong> és <strong>y &lt; 0</strong>.
            </p>
            <div className="text-xs font-semibold text-rose-700 dark:text-rose-300">
              Példák: (-2; -5), (-4; -1), (-3; -3)
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border-2 border-amber-200 dark:border-amber-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">IV. SÍKNEGYED</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                (+ ; -)
              </span>
            </div>
            <div className="font-bold text-sm text-slate-800 dark:text-white">Jobbra lent</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az x pozitív, az y negatív: <strong>x &gt; 0</strong> és <strong>y &lt; 0</strong>.
            </p>
            <div className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              Példák: (3; -2), (6; -4), (1; -5)
            </div>
          </div>
        </div>

        {/* Aranyszabályok a negyedekről */}
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            2 Megjegyzendő Aranyszabály a Síknegyedekről:
          </div>
          <p>
            1. <strong>Körüljárási irány:</strong> A síknegyedeket római számokkal jelöljük (I., II., III., IV.), és az <strong>óramutató járásával ellentétes irányban</strong> haladunk a jobb felső negyedtől!
          </p>
          <p>
            2. <strong>A tengelyek pontjai NEM tartoznak egyik síknegyedbe sem!</strong> A koordinátatengelyek maguk képezik a határokat a negyedek között.
          </p>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: SZIMMETRIÁK ÉS TÁVOLSÁGOK */}
      <TheorySection
        id="szimmetriak-tavolsagok"
        title="4. Szimmetriák és távolságok a koordináta-rendszerben"
        subtitle="Hogyan változnak a koordináták tükrözéskor, és hogyan határozzuk meg a távolságot a tengelyektől?"
        badge="ÖSSZEFÜGGÉSEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Tükrözés az x-tengelyre"
            badge="TENGELYES TÜKRÖZÉS"
            color="blue"
            icon={<Move className="w-5 h-5 text-blue-600" />}
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                A vízszintes tengelyre tükrözve a pont vízszintes helyzete változatlan marad, csak felülről alulra (vagy alulról felülre) vándorol:
              </p>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded font-mono font-bold text-center text-blue-700 dark:text-blue-300">
                P(x; y) &rarr; P'(x; -y)
              </div>
              <p className="text-[11px] text-slate-500">
                Példa: (3; 4) tükörképe (3; -4).
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tükrözés az y-tengelyre"
            badge="TENGELYES TÜKRÖZÉS"
            color="emerald"
            icon={<Move className="w-5 h-5 text-emerald-600" />}
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                A függőleges tengelyre tükrözve a pont magassága változatlan marad, csak jobbról balra (vagy balról jobbra) vált át:
              </p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded font-mono font-bold text-center text-emerald-700 dark:text-emerald-300">
                P(x; y) &rarr; P'(-x; y)
              </div>
              <p className="text-[11px] text-slate-500">
                Példa: (3; 4) tükörképe (-3; 4).
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tükrözés az origóra"
            badge="KÖZÉPPONTOS TÜKRÖZÉS"
            color="amber"
            icon={<RotateCcw className="w-5 h-5 text-amber-600" />}
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                Az origóra, mint középpontra tükrözve a pont átkerül a szemközti síknegyedbe, <strong>mindkét koordináta az ellentettjére vált</strong>:
              </p>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/50 rounded font-mono font-bold text-center text-amber-700 dark:text-amber-300">
                P(x; y) &rarr; P'(-x; -y)
              </div>
              <p className="text-[11px] text-slate-500">
                Példa: (3; 4) tükörképe (-3; -4).
              </p>
            </div>
          </TheoryCard>
        </div>

        {/* Távolságok tengelyektől */}
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm text-purple-900 dark:text-purple-200">
            <Maximize2 className="w-4 h-4 text-purple-600" />
            Távolságok a tengelyektől (a koordináták abszolútértéke)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-purple-100 dark:border-purple-900">
              <strong>Távolság az x-tengelytől:</strong> mindig a pont második koordinátájának abszolútértéke: <code>|y|</code>.
              <div className="text-[11px] text-slate-500 mt-1">
                Pl. a (-5; <strong>-4</strong>) pont <strong>4 egység</strong> távolságra van az x-tengelytől (mivel lefelé 4 egység).
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-purple-100 dark:border-purple-900">
              <strong>Távolság az y-tengelytől:</strong> mindig a pont első koordinátájának abszolútértéke: <code>|x|</code>.
              <div className="text-[11px] text-slate-500 mt-1">
                Pl. a (<strong>-5</strong>; -4) pont <strong>5 egység</strong> távolságra van az y-tengelytől (mivel balra 5 egység).
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
