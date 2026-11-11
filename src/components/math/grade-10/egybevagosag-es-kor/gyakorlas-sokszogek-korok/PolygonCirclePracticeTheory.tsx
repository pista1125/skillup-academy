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
  RegularHexagonTessellationSvg,
  TangentialTrapezoidSvg,
  RightAngledTangentialTrapezoidSvg,
  RegularOctagonCircleSvg
} from './PolygonCirclePracticeFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Sparkles,
  Maximize2,
  Layers,
  Calculator,
  ArrowRight,
  HelpCircle,
  Shapes,
  Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PolygonCirclePracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PolygonCirclePracticeTheory: React.FC<PolygonCirclePracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State ---
  const [activeTab, setActiveTab] = useState<'symmetric' | 'right' | 'polygon'>('symmetric');

  // 1. Szimmetrikus érintőtrapéz állapot:
  const [symmA, setSymmA] = useState<number>(18);
  const [symmC, setSymmC] = useState<number>(8);
  const symmCSafe = Math.min(symmC, symmA - 1);
  const symmB = (symmA + symmCSafe) / 2; // b = (a+c)/2
  const symmM = Math.sqrt(symmA * symmCSafe); // m = sqrt(ac)
  const symmR = symmM / 2; // r = m/2
  const symmArea = symmB * symmM; // T = b * m
  const symmDiag = Math.sqrt(symmM * symmM + symmB * symmB);
  const symmAlphaRad = Math.asin(symmM / symmB);
  const symmAlphaDeg = (symmAlphaRad * 180) / Math.PI;

  // 2. Derékszögű érintőtrapéz állapot:
  const [rightA, setRightA] = useState<number>(12);
  const [rightC, setRightC] = useState<number>(4);
  const rightCSafe = Math.min(rightC, rightA - 1);
  const rightM = (2 * rightA * rightCSafe) / (rightA + rightCSafe); // m = 2ac/(a+c)
  const rightR = rightM / 2;
  const rightB = rightA + rightCSafe - rightM; // b = a+c-m
  const rightArea = rightA * rightCSafe; // T = a*c
  const rightBetaRad = Math.asin(rightM / rightB);
  const rightBetaDeg = (rightBetaRad * 180) / Math.PI;

  // 3. Szabályos sokszög kalkulátor:
  const [polyN, setPolyN] = useState<number>(6);
  const [polyA, setPolyA] = useState<number>(10);
  const halfAngleRad = Math.PI / polyN;
  const polyR = polyA / (2 * Math.sin(halfAngleRad)); // Körülírt kör sugara R
  const polySmallR = polyA / (2 * Math.tan(halfAngleRad)); // Beírt kör sugara r
  const polyArea = (polyN * polyA * polySmallR) / 2;
  const incircleArea = Math.PI * polySmallR * polySmallR;
  const circumcircleArea = Math.PI * polyR * polyR;
  const inFillRatio = (incircleArea / polyArea) * 100;
  const circumWasteRatio = ((circumcircleArea - polyArea) / circumcircleArea) * 100;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Érintőtrapézok és szabályos sokszögek"
      subtitle="A szimmetrikus érintőtrapéz közepei (számtani b és mértani m), a derékszögű érintőtrapéz harmonikus magassága, a szabályos n-szögek beírt és körülírt körei, valamint érettségi mintapéldák."
      themeColor="purple"
      pdfFilename="10_osztaly_erintotrapez_es_szabalyos_sokszogek_tananyag.pdf"
      quickRule={{
        label: 'A KÉT ÉRINTŐTRAPÉZ ÉS SZABÁLYOS SOKSZÖGEK FORMULÁI',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-purple-50/90 p-2.5 rounded-xl border border-purple-200">
              <span className="font-black text-purple-900 block mb-0.5">1. Szimmetrikus érintőtrapéz (a, c alapok):</span>
              <ul className="space-y-1 font-mono text-purple-950 mt-1">
                <li>• <strong>Szár (számtani közép):</strong> b = (a + c) / 2</li>
                <li>• <strong>Magasság (mértani közép):</strong> m = 2r = √(a · c)</li>
                <li>• <strong>Beírt kör sugara:</strong> r = m / 2 = √(a · c) / 2</li>
                <li>• <strong>Területe:</strong> T = b · m = [(a + c)/2] · √(ac)</li>
              </ul>
            </div>
            <div className="bg-indigo-50/90 p-2.5 rounded-xl border border-indigo-200">
              <span className="font-black text-indigo-900 block mb-0.5">2. Derékszögű érintőtrapéz (a, c alapok):</span>
              <ul className="space-y-1 font-mono text-indigo-950 mt-1">
                <li>• <strong>Magasság (harmonikus közép):</strong> m = 2r = (2ac) / (a + c)</li>
                <li>• <strong>Ferde szár:</strong> b = a + c - m</li>
                <li>• <strong>Területe:</strong> T = a · c &nbsp; (zseniális egyszerűsítés!)</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] leading-tight font-medium">
              <strong>💡 SZABÁLYOS n-SZÖG:</strong> <MathText>{'r = \\frac{a}{2\\tan(180^\\circ/n)}, \\; R = \\frac{a}{2\\sin(180^\\circ/n)}, \\; T = s \\cdot r'}</MathText>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz az érintőtrapéz és szabályos sokszögek feladataira?"
      practiceSubtitle="Gyakorold az érettségi típusú geometriai számításokat a 30 kérdéses kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border-2 border-purple-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 text-white rounded-2xl shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-purple-100">
                  Interaktív Érintőtrapéz &amp; Szabályos Sokszög Labor
                </h3>
                <p className="text-xs text-purple-300/80">
                  Válts a fülek között, állítsd az alapokat és oldalhosszakat, és figyeld a metrikák változását valós időben!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'symmetric' ? 'bg-purple-500 text-white font-bold border-purple-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('symmetric')}
              >
                Szimmetrikus Trapéz
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'right' ? 'bg-indigo-500 text-white font-bold border-indigo-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('right')}
              >
                Derékszögű Trapéz
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'polygon' ? 'bg-emerald-500 text-white font-bold border-emerald-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('polygon')}
              >
                Szabályos n-szög
              </Button>
            </div>
          </div>

          {activeTab === 'symmetric' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-purple-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                  Szimmetrikus érintőtrapéz alapjai
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Hosszabbik alap (a):</span>
                    <span className="font-mono text-cyan-300 font-bold">{symmA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="36"
                    step="1"
                    value={symmA}
                    onChange={(e) => setSymmA(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Rövidebbik alap (c):</span>
                    <span className="font-mono text-amber-300 font-bold">{symmCSafe} cm</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max={Math.max(2, symmA - 2)}
                    step="1"
                    value={symmCSafe}
                    onChange={(e) => setSymmC(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { setSymmA(18); setSymmC(8); }}>
                    Érettségi 1: a=18, c=8
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { setSymmA(25); setSymmC(9); }}>
                    Érettségi 2: a=25, c=9
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 space-y-1">
                    <span className="text-purple-400 font-bold block">1. Szár (b = (a+c)/2):</span>
                    <p className="text-slate-100 text-lg font-bold">b = {symmB.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">Számtani közép</p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 space-y-1">
                    <span className="text-cyan-400 font-bold block">2. Magasság (m = √(ac)):</span>
                    <p className="text-cyan-200 text-lg font-bold">m = {symmM.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">Mértani közép</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1">
                    <span className="text-emerald-400 font-bold block">3. Beírt sugár (r = m/2):</span>
                    <p className="text-emerald-300 text-lg font-bold">r = {symmR.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">Átmérő = 2r = {symmM.toFixed(2)} cm</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-1">
                    <span className="text-amber-400 font-bold block">4. Terület (T = b · m):</span>
                    <p className="text-amber-300 text-lg font-bold">T = {symmArea.toFixed(1)} cm²</p>
                    <p className="text-[11px] text-slate-400">Középvonal × magasság</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                    <span className="text-indigo-400 font-bold block">5. Átló hossza (e):</span>
                    <p className="text-indigo-200 text-base font-bold">e = {symmDiag.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">e = √(m² + b²)</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                    <span className="text-pink-400 font-bold block">6. Alapon fekvő szög (α):</span>
                    <p className="text-pink-200 text-base font-bold">α = {symmAlphaDeg.toFixed(1)}°</p>
                    <p className="text-[11px] text-slate-400">sin α = m / b</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'right' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-indigo-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  Derékszögű érintőtrapéz alapjai
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Hosszabbik alap (a):</span>
                    <span className="font-mono text-cyan-300 font-bold">{rightA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="28"
                    step="1"
                    value={rightA}
                    onChange={(e) => setRightA(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Rövidebbik alap (c):</span>
                    <span className="font-mono text-amber-300 font-bold">{rightCSafe} cm</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max={Math.max(2, rightA - 2)}
                    step="1"
                    value={rightCSafe}
                    onChange={(e) => setRightC(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { setRightA(12); setRightC(4); }}>
                    Érettségi: a=12, c=4
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { setRightA(18); setRightC(6); }}>
                    Példa: a=18, c=6
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
                  <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/60 space-y-1">
                    <span className="text-indigo-400 font-bold block">1. Magasság m = 2ac/(a+c):</span>
                    <p className="text-indigo-200 text-lg font-bold">m = {rightM.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">Harmonikus közép!</p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 space-y-1">
                    <span className="text-purple-400 font-bold block">2. Ferde szár b = a+c-m:</span>
                    <p className="text-slate-100 text-lg font-bold">b = {rightB.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">Érintőnégyszög tételből</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1">
                    <span className="text-emerald-400 font-bold block">3. Beírt sugár r = m/2:</span>
                    <p className="text-emerald-300 text-lg font-bold">r = {rightR.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">r = ac / (a + c)</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-1">
                    <span className="text-amber-400 font-bold block">4. Terület T = a · c:</span>
                    <p className="text-amber-300 text-lg font-black">T = {rightArea.toFixed(1)} cm²</p>
                    <p className="text-[11px] text-slate-400">Alapok szorzata!</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1 col-span-2">
                    <span className="text-pink-400 font-bold block">Ferde szár hajlásszöge (β):</span>
                    <p className="text-pink-200 text-base font-bold">β = {rightBetaDeg.toFixed(1)}°</p>
                    <p className="text-[11px] text-slate-400">sin β = m / b = {rightM.toFixed(2)} / {rightB.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'polygon' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-emerald-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Szabályos n-szög paraméterei
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Oldalszám (n):</span>
                    <span className="font-mono text-emerald-300 font-bold">{polyN} oldalú ({polyN === 3 ? 'háromszög' : polyN === 4 ? 'négyzet' : polyN === 6 ? 'hatszög' : polyN === 8 ? 'nyolcszög' : `${polyN}-szög`})</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    {[3, 4, 5, 6, 8, 10, 12].map((nVal) => (
                      <Button
                        key={nVal}
                        size="sm"
                        variant={polyN === nVal ? 'default' : 'outline'}
                        className={`text-xs h-7 px-2.5 ${polyN === nVal ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                        onClick={() => setPolyN(nVal)}
                      >
                        n={nVal}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Oldalhossz (a):</span>
                    <span className="font-mono text-cyan-300 font-bold">{polyA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="1"
                    value={polyA}
                    onChange={(e) => setPolyA(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 space-y-1">
                    <span className="text-purple-400 font-bold block">Körülírt sugár (R):</span>
                    <p className="text-slate-100 text-lg font-bold">R = {polyR.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">R = a / (2·sin(180°/{polyN}))</p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 space-y-1">
                    <span className="text-cyan-400 font-bold block">Beírt sugár (r):</span>
                    <p className="text-cyan-200 text-lg font-bold">r = {polySmallR.toFixed(2)} cm</p>
                    <p className="text-[11px] text-slate-400">r = a / (2·tan(180°/{polyN}))</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1 col-span-2">
                    <span className="text-emerald-400 font-bold block">Sokszög területe (T):</span>
                    <p className="text-emerald-300 text-xl font-black">T = {polyArea.toFixed(2)} cm²</p>
                    <p className="text-[11px] text-slate-400">T = n · (a · r) / 2 = {polyN} · ({polyA} · {polySmallR.toFixed(2)}) / 2</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-1">
                    <span className="text-amber-400 font-bold block">Beírt kör kitöltése:</span>
                    <p className="text-amber-200 text-base font-bold">{inFillRatio.toFixed(1)}%</p>
                    <p className="text-[11px] text-slate-400">T_kör / T_sokszög</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 space-y-1">
                    <span className="text-rose-400 font-bold block">Körülírt kör hulladéka:</span>
                    <p className="text-rose-200 text-base font-bold">{circumWasteRatio.toFixed(1)}%</p>
                    <p className="text-[11px] text-slate-400">(T_kör - T_sokszög) / T_kör</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      {/* 1. Szakasz: Szimmetrikus érintőtrapéz elmélete és levezetése */}
      <TheorySection
        id="szimmetrikus-erintotrapez"
        number={1}
        title="A szimmetrikus érintőtrapéz mély elmélete és levezetése"
        badge="ÉRINTŐTRAPÉZ"
        badgeColor="purple"
      >
        <TheoryCard title="A számtani és mértani közép geometriai harmóniája" color="purple">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A szimmetrikus (egyenlő szárú) érintőtrapéz az érettségi és felvételi geometriai feladatok egyik leggyakoribb, legszebb szereplője.
                Egyszerre teljesül benne a <strong>szimmetria</strong> (<MathText>{'b = d'}</MathText>) és az <strong>érintőnégyszög alaptétele</strong> 
                (szemközti oldalak összege egyenlő).
              </p>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1 font-mono text-purple-950 dark:text-purple-300 text-xs">
                <span className="font-bold block text-purple-900 dark:text-purple-200">1. A szár kiszámítása (Számtani közép):</span>
                <MathText>{'a + c = b + b = 2b \\implies b = \\frac{a + c}{2}'}</MathText>
                <p className="text-[11px] font-sans text-purple-700 dark:text-purple-400 mt-0.5">
                  A szimmetrikus érintőtrapéz szára mindig a két alap számtani közepe, amely egyben megegyezik a trapéz <strong>középvonalának</strong> hosszával!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1.5 font-mono text-cyan-950 dark:text-cyan-300 text-xs">
                <span className="font-bold block text-cyan-900 dark:text-cyan-200">2. A magasság részletes Pitagorasz-levezetése (Mértani közép):</span>
                <p className="text-[11px] font-sans text-cyan-800 dark:text-cyan-300">
                  Ha a felső alap két végpontjából magasságot bocsátunk le az alsó alapra, a levágott derékszögű háromszög alsó befogója: <MathText>{'x = \\frac{a - c}{2}'}</MathText>.
                </p>
                <div className="space-y-1 bg-white dark:bg-cyan-950/70 p-2 rounded-lg border border-cyan-100 dark:border-cyan-900">
                  <MathText>{'m^2 = b^2 - x^2 = \\left(\\frac{a+c}{2}\\right)^2 - \\left(\\frac{a-c}{2}\\right)^2'}</MathText>
                  <MathText>{'m^2 = \\frac{a^2 + 2ac + c^2}{4} - \\frac{a^2 - 2ac + c^2}{4} = \\frac{4ac}{4} = ac'}</MathText>
                  <div className="text-emerald-700 dark:text-emerald-300 font-bold text-sm pt-0.5">
                    <MathText>{'m = \\sqrt{a \\cdot c} \\quad \\implies \\quad r = \\frac{\\sqrt{a \\cdot c}}{2}'}</MathText>
                  </div>
                </div>
                <p className="text-[11px] font-sans text-cyan-700 dark:text-cyan-400">
                  A magasság pontosan a két alap <strong>mértani közepe</strong>, a beírt kör sugara pedig a magasság fele (<MathText>{'2r = m'}</MathText>)!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1 font-mono text-amber-950 dark:text-amber-300 text-xs">
                <span className="font-bold block text-amber-900 dark:text-amber-200">3. A terület és az átlók képlete:</span>
                <MathText>{'T = \\frac{a+c}{2} \\cdot m = b \\cdot m = \\frac{a+c}{2} \\cdot \\sqrt{ac}'}</MathText>
                <div className="mt-1 text-[11px] font-sans text-amber-800 dark:text-amber-400">
                  Átló: A Pitagorasz-tételből a levetített derékszögű háromszög alapja <MathText>{'a - \\frac{a-c}{2} = \\frac{a+c}{2} = b'}</MathText>, így:
                  <div className="font-mono font-bold mt-0.5 text-xs text-amber-900 dark:text-amber-200">
                    <MathText>{'e = \\sqrt{m^2 + b^2} = \\sqrt{ac + b^2}'}</MathText>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-2">
              <TangentialTrapezoidSvg />
              <p className="text-[11px] text-slate-500 italic text-center">
                A szimmetrikus érintőtrapéz: a szár az alapok számtani közepe, a magasság a mértani közepe.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: Derékszögű érintőtrapéz metrikája */}
      <TheorySection
        id="derekszogu-erintotrapez"
        number={2}
        title="A derékszögű érintőtrapéz és a harmonikus közép kapcsolata"
        badge="DERÉKSZÖGŰ TRAPÉZ"
        badgeColor="indigo"
      >
        <TheoryCard title="Mi történik, ha az érintőtrapéz egyik szára derékszögű?" color="indigo">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Derékszögű trapéz esetén az alapokra merőleges szár hossza pontosan megegyezik a trapéz magasságával: 
                <MathText>{'d = m = 2r'}</MathText>. Ha a derékszögű trapéz egyben <strong>érintőnégyszög</strong> is, 
                akkor a két alap és a magasság között egy rendkívül mély, elegáns összefüggés érvényesül.
              </p>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5 font-mono text-indigo-950 dark:text-indigo-300 text-xs">
                <span className="font-bold block text-indigo-900 dark:text-indigo-200">A levezetés lépésről lépésre:</span>
                <p className="text-[11px] font-sans text-indigo-800 dark:text-indigo-300">
                  1. Az érintőnégyszög tételéből a ferde szár kifejezhető:
                </p>
                <div className="bg-white dark:bg-indigo-950/70 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900">
                  <MathText>{'a + c = b + d = b + m \\implies b = (a + c) - m'}</MathText>
                </div>
                <p className="text-[11px] font-sans text-indigo-800 dark:text-indigo-300 mt-1">
                  2. A ferde szár által határolt derékszögű háromszögre felírva a Pitagorasz-tételt (ahol a befogók <MathText>{'m'}</MathText> és <MathText>{'a-c'}</MathText>):
                </p>
                <div className="bg-white dark:bg-indigo-950/70 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900 space-y-1">
                  <MathText>{'b^2 = m^2 + (a - c)^2'}</MathText>
                  <MathText>{'[(a + c) - m]^2 = m^2 + (a - c)^2'}</MathText>
                  <MathText>{'(a + c)^2 - 2(a + c)m + m^2 = m^2 + (a - c)^2'}</MathText>
                  <MathText>{'2(a + c)m = (a + c)^2 - (a - c)^2 = 4ac'}</MathText>
                </div>
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-bold text-xs space-y-0.5">
                  <div><MathText>{'m = \\frac{2ac}{a + c}'}</MathText> &nbsp; (az alapok <strong>harmonikus közepe</strong>!)</div>
                  <div><MathText>{'r = \\frac{ac}{a + c}'}</MathText> &nbsp; és &nbsp; <MathText>{'b = a + c - \\frac{2ac}{a+c} = \\frac{a^2 + c^2}{a + c}'}</MathText></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1 font-mono text-purple-950 dark:text-purple-300 text-xs">
                <span className="font-bold block text-purple-900 dark:text-purple-200">A derékszögű érintőtrapéz zseniális területképlete:</span>
                <MathText>{'T = \\frac{a + c}{2} \\cdot m = \\frac{a + c}{2} \\cdot \\frac{2ac}{a + c} = a \\cdot c'}</MathText>
                <p className="text-[11px] font-sans text-purple-800 dark:text-purple-300 mt-1 font-medium">
                  A derékszögű érintőtrapéz területe pusztán a két párhuzamos alap szorzata: <MathText>{'T = a \\cdot c'}</MathText>!
                </p>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-2">
              <RightAngledTangentialTrapezoidSvg />
              <p className="text-[11px] text-slate-500 italic text-center">
                Derékszögű érintőtrapéz: <MathText>{'m = \\frac{2ac}{a+c}'}</MathText>, területe <MathText>{'T = ac'}</MathText>.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Szabályos sokszögek körkapcsolatai */}
      <TheorySection
        id="szabalyos-sokszogek-metrikaja"
        number={3}
        title="Szabályos sokszögek körkapcsolatai: Háromszög, Négyzet, Hatszög és Nyolcszög"
        badge="SZABÁLYOS SOKSZÖGEK"
        badgeColor="teal"
      >
        <TheoryCard title="Alapháromszögek felbontása és sugárkapcsolatok" color="teal">
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              Minden szabályos sokszögnek van beírt és körülírt köre, melyek középpontja közös (a sokszög szimmetriaközéppontja <MathText>{'O'}</MathText>). 
              A csúcsokhoz húzott szakaszok a szabályos <MathText>{'n'}</MathText>-szöget <MathText>{'n'}</MathText> darab egybevágó 
              egyenlő szárú háromszögre bontják, melyek szárai a körülírt kör sugarai (<MathText>{'R'}</MathText>), magassága pedig a beírt kör sugara (<MathText>{'r'}</MathText>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-teal-800 dark:text-teal-300 text-sm block">1. Szabályos háromszög (n = 3)</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Belső szögei <MathText>{'60^\\circ'}</MathText>-osak. A súlypont a magasságot <MathText>{'2:1'}</MathText> arányban osztja.
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <li>Magasság: <MathText>{'m = \\frac{a\\sqrt{3}}{2}'}</MathText></li>
                  <li>Körülírt sugár: <MathText>{'R = \\frac{2}{3}m = \\frac{a\\sqrt{3}}{3}'}</MathText></li>
                  <li>Beírt sugár: <MathText>{'r = \\frac{1}{3}m = \\frac{a\\sqrt{3}}{6} = \\frac{R}{2}'}</MathText></li>
                  <li>Terület: <MathText>{'T = \\frac{a^2\\sqrt{3}}{4}'}</MathText></li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-teal-800 dark:text-teal-300 text-sm block">2. Négyzet (n = 4)</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Átlói derékszögben metszik egymást, hosszuk <MathText>{'d = a\\sqrt{2}'}</MathText>.
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <li>Körülírt sugár: <MathText>{'R = \\frac{d}{2} = \\frac{a\\sqrt{2}}{2}'}</MathText></li>
                  <li>Beírt sugár: <MathText>{'r = \\frac{a}{2}'}</MathText></li>
                  <li>Sugarak aránya: <MathText>{'R = r\\sqrt{2} \\iff \\frac{R}{r} = \\sqrt{2} \\approx 1{,}414'}</MathText></li>
                  <li>Terület: <MathText>{'T = a^2 = 2R^2 = 4r^2'}</MathText></li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-teal-800 dark:text-teal-300 text-sm block">3. Szabályos hatszög (n = 6)</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A középponti szög <MathText>{'360^\\circ / 6 = 60^\\circ'}</MathText>, így az alapháromszögek maguk is <strong>szabályos háromszögek</strong>!
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <li>Körülírt sugár: <MathText>{'R = a'}</MathText> &nbsp; (az oldal megegyezik a sugárral!)</li>
                  <li>Beírt sugár: <MathText>{'r = m_{\\triangle} = \\frac{a\\sqrt{3}}{2}'}</MathText></li>
                  <li>Terület: <MathText>{'T = 6 \\cdot \\frac{a^2\\sqrt{3}}{4} = \\frac{3a^2\\sqrt{3}}{2}'}</MathText></li>
                  <li>Hosszabbik átló: <MathText>{'d_1 = 2R = 2a'}</MathText>, rövidebb: <MathText>{'d_2 = 2r = a\\sqrt{3}'}</MathText></li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-teal-800 dark:text-teal-300 text-sm block">4. Szabályos nyolcszög (n = 8)</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Középponti szög <MathText>{'45^\\circ'}</MathText>, belső szögek <MathText>{'135^\\circ'}</MathText>-osak.
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <li>Beírt sugár: <MathText>{'r = \\frac{a}{2}(\\sqrt{2} + 1) \\approx 1{,}207a'}</MathText></li>
                  <li>Körülírt sugár: <MathText>{'R = \\frac{a}{\\sqrt{2 - \\sqrt{2}}} \\approx 1{,}307a'}</MathText></li>
                  <li>Terület: <MathText>{'T = 2a^2(\\sqrt{2} + 1) = 8 \\cdot r^2(\\sqrt{2}-1)'}</MathText></li>
                  <li>Beírt kör átmérője a szemközti oldalak távolsága!</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
              <div className="flex flex-col items-center">
                <RegularHexagonTessellationSvg />
                <span className="text-[11px] text-slate-500 italic mt-1">Szabályos hatszög: 6 egyenlő oldalú háromszög</span>
              </div>
              <div className="flex flex-col items-center">
                <RegularOctagonCircleSvg />
                <span className="text-[11px] text-slate-500 italic mt-1">Szabályos nyolcszög: 8 egyenlő szárú háromszög</span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Általános szabályos n-szögek trigonometriai képletei */}
      <TheorySection
        id="altalanos-szabalyos-nszogek"
        number={4}
        title="Általános szabályos n-szögek trigonometriai képletei és az arkhimédeszi közelítés"
        badge="ÁLTALÁNOS FORMULÁK"
        badgeColor="cyan"
      >
        <TheoryCard title="Tetszőleges n-oldalú szabályos sokszög metrikája" color="cyan">
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              Tetszőleges szabályos <MathText>{'n'}</MathText>-szögnél a szimmetriatengely a csúcsi szöget felezi, így 
              egy derékszögű háromszöget kapunk, amelynek befogói a féloldal (<MathText>{'a/2'}</MathText>) és a beírt kör sugara (<MathText>{'r'}</MathText>), 
              átfogója pedig a körülírt kör sugara (<MathText>{'R'}</MathText>). A hegyesszög a középponti szög fele: 
              <MathText>{'\\frac{\\varphi}{2} = \\frac{180^\\circ}{n}'}</MathText>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
                <span className="font-bold text-cyan-900 dark:text-cyan-200 block">Beírt kör sugara (r):</span>
                <MathText>{'r = \\frac{a}{2 \\cdot \\tan\\left(\\frac{180^\\circ}{n}\\right)}'}</MathText>
                <p className="text-[11px] font-sans text-cyan-700 dark:text-cyan-400 mt-1">
                  Apotéma (belső sugár): a középpont és az oldalak távolsága.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                <span className="font-bold text-purple-900 dark:text-purple-200 block">Körülírt kör sugara (R):</span>
                <MathText>{'R = \\frac{a}{2 \\cdot \\sin\\left(\\frac{180^\\circ}{n}\\right)}'}</MathText>
                <p className="text-[11px] font-sans text-purple-700 dark:text-purple-400 mt-1">
                  A csúcsok távolsága a középponttól.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block">Terület (T = s · r):</span>
                <MathText>{'T = \\frac{n \\cdot a \\cdot r}{2} = s \\cdot r'}</MathText>
                <p className="text-[11px] font-sans text-emerald-700 dark:text-emerald-400 mt-1">
                  Ahol <MathText>{'s = \\frac{n \\cdot a}{2}'}</MathText> a sokszög félkerülete.
                </p>
              </div>
            </div>

            <TheoryCallout title="Arkhimédész módszere és a π keletkezése" icon={<Sparkles className="w-5 h-5 text-amber-500" />}>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Arkhimédész a körbe és a kör köré írt szabályos <MathText>{'96'}</MathText>-szögek kerületét kiszámítva határozta meg 
                elsőként a <MathText>{'\\pi'}</MathText> értékét: <MathText>{'3\\frac{10}{71} < \\pi < 3\\frac{1}{7}'}</MathText> 
                (<MathText>{'3{,}1408 < \\pi < 3{,}1428'}</MathText>). Ha az oldalszám <MathText>{'n \\to \\infty'}</MathText>, 
                akkor <MathText>{'r \\to R'}</MathText>, a kerület <MathText>{'K = n \\cdot a \\to 2R\\pi'}</MathText>, 
                és a terület <MathText>{'T = s \\cdot r \\to (R\\pi) \\cdot R = R^2\\pi'}</MathText>!
              </p>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szakasz: Részletesen kidolgozott mintapéldák */}
      <TheorySection
        id="gyakorlas-mintapeldak"
        number={5}
        title="Részletesen kidolgozott érettségi és felvételi mintapéldák"
        badge="MINTAPÉLDÁK"
        badgeColor="purple"
      >
        {/* 1. Mintapélda */}
        <TheoryCard title="1. Mintapélda: Szimmetrikus érintőtrapéz teljes metrikája és szögei" color="purple">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy szimmetrikus érintőtrapéz párhuzamos alapjai <MathText>{'a = 25\\text{ cm}'}</MathText> és <MathText>{'c = 9\\text{ cm}'}</MathText>.
              Számítsuk ki:
              <br />a) a trapéz szárát (<MathText>{'b'}</MathText>),
              <br />b) a trapéz magasságát (<MathText>{'m'}</MathText>) és a beírt kör sugarát (<MathText>{'r'}</MathText>),
              <br />c) a trapéz területét (<MathText>{'T'}</MathText>),
              <br />d) a trapéz alapon fekvő belső szögeit (<MathText>{'\\alpha'}</MathText> és <MathText>{'\\beta'}</MathText>),
              <br />e) az átlóinak hosszát (<MathText>{'e'}</MathText>)!
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <span className="font-bold text-slate-900 dark:text-white block">Megoldás lépésről lépésre:</span>
              <ol className="list-decimal list-inside space-y-2 font-mono text-xs">
                <li>
                  <strong>A szár (számtani közép):</strong>
                  <br />
                  <span className="text-slate-600 dark:text-slate-400 font-sans">Mivel a négyszög érintőnégyszög és szimmetrikus, <MathText>{'2b = a + c'}</MathText>:</span>
                  <div className="mt-0.5 font-bold text-purple-900 dark:text-purple-300">
                    <MathText>{'b = \\frac{a + c}{2} = \\frac{25 + 9}{2} = \\frac{34}{2} = 17\\text{ cm}'}</MathText>
                  </div>
                </li>
                <li>
                  <strong>A magasság és a beírt kör sugara (mértani közép):</strong>
                  <br />
                  <span className="text-slate-600 dark:text-slate-400 font-sans">A levezetésünk szerint <MathText>{'m = \\sqrt{a \\cdot c}'}</MathText>:</span>
                  <div className="mt-0.5 font-bold text-cyan-900 dark:text-cyan-300">
                    <MathText>{'m = \\sqrt{25 \\cdot 9} = \\sqrt{225} = 15\\text{ cm}'}</MathText>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-sans">A beírt kör sugara a magasság fele:</span>
                  <div className="mt-0.5 font-bold text-emerald-900 dark:text-emerald-300">
                    <MathText>{'r = \\frac{m}{2} = \\frac{15}{2} = 7{,}5\\text{ cm}'}</MathText>
                  </div>
                </li>
                <li>
                  <strong>A trapéz területe:</strong>
                  <div className="mt-0.5 font-bold text-amber-900 dark:text-amber-300">
                    <MathText>{'T = b \\cdot m = 17 \\cdot 15 = 255\\text{ cm}^2'}</MathText>
                  </div>
                </li>
                <li>
                  <strong>A belső szögek kiszámítása:</strong>
                  <br />
                  <span className="text-slate-600 dark:text-slate-400 font-sans">Az oldalsó derékszögű háromszögben <MathText>{'\\sin\\alpha = \\frac{m}{b}'}</MathText>:</span>
                  <div className="mt-0.5 font-bold text-pink-900 dark:text-pink-300">
                    <MathText>{'\\sin\\alpha = \\frac{15}{17} \\approx 0{,}8824 \\implies \\alpha \\approx 61{,}93^\\circ'}</MathText>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-sans">A tompaszög a kiegészítő szög:</span>
                  <div className="mt-0.5 font-bold text-pink-900 dark:text-pink-300">
                    <MathText>{'\\beta = 180^\\circ - 61{,}93^\\circ = 118{,}07^\\circ'}</MathText>
                  </div>
                </li>
                <li>
                  <strong>Az átló hossza:</strong>
                  <br />
                  <span className="text-slate-600 dark:text-slate-400 font-sans">A magasság és a levetített hosszabbik alapdarab (<MathText>{'b = 17\\text{ cm}'}</MathText>) derékszögű háromszögéből:</span>
                  <div className="mt-0.5 font-bold text-indigo-900 dark:text-indigo-300">
                    <MathText>{'e = \\sqrt{m^2 + b^2} = \\sqrt{15^2 + 17^2} = \\sqrt{225 + 289} = \\sqrt{514} \\approx 22{,}67\\text{ cm}'}</MathText>
                  </div>
                </li>
              </ol>

              <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                Válasz: A trapéz szára 17 cm, magassága 15 cm, a beírt sugár 7,5 cm, a terület 255 cm², a szögek 61,93° és 118,07°, az átló pedig kb. 22,67 cm.
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 2. Mintapélda */}
        <TheoryCard title="2. Mintapélda: Derékszögű érintőtrapéz emelt szintű érettségi feladata" color="indigo">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy derékszögű érintőtrapéz párhuzamos alapjai <MathText>{'a = 12\\text{ cm}'}</MathText> és <MathText>{'c = 4\\text{ cm}'}</MathText>.
              Határozzuk meg a trapéz magasságát, a beírt kör sugarát, a ferde szárát, valamint a trapéz területét!
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-xs">
              <span className="font-bold text-slate-900 dark:text-white block font-sans">Megoldás:</span>
              <p className="font-sans text-slate-700 dark:text-slate-300">
                Alkalmazzuk a derékszögű érintőtrapéz levezetett harmonikus közép formuláját:
              </p>
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 space-y-1">
                <div><strong>1. Magasság (harmonikus közép):</strong></div>
                <MathText>{'m = \\frac{2 \\cdot a \\cdot c}{a + c} = \\frac{2 \\cdot 12 \\cdot 4}{12 + 4} = \\frac{96}{16} = 6\\text{ cm}'}</MathText>
              </div>
              <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 space-y-1">
                <div><strong>2. Beírt kör sugara:</strong></div>
                <MathText>{'r = \\frac{m}{2} = \\frac{6}{2} = 3\\text{ cm}'}</MathText>
              </div>
              <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 space-y-1">
                <div><strong>3. Ferde szár:</strong></div>
                <MathText>{'b = (a + c) - m = (12 + 4) - 6 = 16 - 6 = 10\\text{ cm}'}</MathText>
                <div className="text-[11px] font-sans text-purple-700 dark:text-purple-400">
                  Ellenőrzés Pitagorasszal: <MathText>{'b = \\sqrt{m^2 + (a-c)^2} = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\text{ cm}'}</MathText> (Pitagoraszi számhármas: 6, 8, 10!).
                </div>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 space-y-1">
                <div><strong>4. Terület (a szorzatszabály):</strong></div>
                <MathText>{'T = a \\cdot c = 12 \\cdot 4 = 48\\text{ cm}^2'}</MathText>
              </div>

              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs font-sans">
                Válasz: A magasság 6 cm, a beírt sugár 3 cm, a ferde szár 10 cm, a terület pedig 48 cm².
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 3. Mintapélda */}
        <TheoryCard title="3. Mintapélda: Szabályos hatszög és kör alakú alapanyag gazdaságossága" color="teal">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy gépgyárban <MathText>{'R = 10\\text{ cm}'}</MathText> sugarú kör keresztmetszetű acélrúdból 
              szabályos hatszög keresztmetszetű csavaranyákat marnak ki.
              <br />a) Mekkora a kimart szabályos hatszög oldala és területe?
              <br />b) Mekkora a hulladék acél térfogataránya (hány százalék vész kárba)?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-xs">
              <span className="font-bold text-slate-900 dark:text-white block font-sans">Megoldás:</span>
              <p className="font-sans text-slate-700 dark:text-slate-300">
                Mivel a szabályos hatszög a körbe van írva, a hatszög csúcsai a körvonalra esnek, tehát a hatszög körülírt körének sugara: <MathText>{'R = 10\\text{ cm}'}</MathText>.
              </p>
              <div className="space-y-1">
                <div><strong>1. Oldal és terület:</strong></div>
                <div>A szabályos hatszögnél <MathText>{'a = R = 10\\text{ cm}'}</MathText>.</div>
                <div>A hatszög területe:</div>
                <MathText>{'T_{\\text{hatszög}} = 6 \\cdot \\frac{a^2\\sqrt{3}}{4} = \\frac{3 \\cdot 10^2 \\cdot \\sqrt{3}}{2} = 150\\sqrt{3} \\approx 259{,}81\\text{ cm}^2'}</MathText>
              </div>

              <div className="space-y-1 pt-1">
                <div><strong>2. A kör területe és a hulladékarány:</strong></div>
                <MathText>{'T_{\\text{kör}} = R^2\\pi = 10^2 \\cdot \\pi = 100\\pi \\approx 314{,}16\\text{ cm}^2'}</MathText>
                <div>A hulladék területe: <MathText>{'T_{\\text{hulladék}} = 314{,}16 - 259{,}81 = 54{,}35\\text{ cm}^2'}</MathText>.</div>
                <div>A veszteség százalékos aránya:</div>
                <MathText>{'\\eta = \\frac{T_{\\text{hulladék}}}{T_{\\text{kör}}} = \\frac{100\\pi - 150\\sqrt{3}}{100\\pi} = 1 - \\frac{3\\sqrt{3}}{2\\pi} \\approx 1 - 0{,}8270 = 17{,}3\\%'}</MathText>
              </div>

              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs font-sans">
                Válasz: A hatszög oldala 10 cm, területe kb. 259,81 cm², és a kimunkálás során az acél 17,3%-a válik hulladékká.
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 4. Mintapélda */}
        <TheoryCard title="4. Mintapélda: Szabályos nyolcszög alakú kerti pavilon padlóburkolása" color="amber">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy parkban szabályos nyolcszög alaprajzú pavilont építenek, melynek oldalhossza <MathText>{'a = 3\\text{ m}'}</MathText>.
              <br />a) Mekkora a pavilon alapterülete?
              <br />b) A pavilon közepére egy kör alakú díszszőnyeget helyeznek el, amely éppen érinti az oldalfalakat. Mekkora a szőnyeg sugara és területe?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-xs">
              <span className="font-bold text-slate-900 dark:text-white block font-sans">Megoldás:</span>
              <p className="font-sans text-slate-700 dark:text-slate-300">
                Szabályos nyolcszögnél <MathText>{'n = 8'}</MathText>, így a középponti szög <MathText>{'\\varphi = 360^\\circ / 8 = 45^\\circ'}</MathText>, fele pedig <MathText>{'22{,}5^\\circ'}</MathText>.
              </p>

              <div className="space-y-1">
                <div><strong>1. A beírt kör sugara (szőnyeg sugara):</strong></div>
                <MathText>{'r = \\frac{a}{2 \\cdot \\tan(22{,}5^\\circ)} = \\frac{3}{2 \\cdot (\\sqrt{2} - 1)} = \\frac{3(\\sqrt{2}+1)}{2} \\approx \\frac{3 \\cdot 2{,}4142}{2} \\approx 3{,}62\\text{ m}'}</MathText>
              </div>

              <div className="space-y-1 pt-1">
                <div><strong>2. A pavilon alapterülete:</strong></div>
                <div>A kerület <MathText>{'K = 8 \\cdot 3 = 24\\text{ m}'}</MathText>, félkerület <MathText>{'s = 12\\text{ m}'}</MathText>.</div>
                <MathText>{'T_{\\text{pavilon}} = s \\cdot r \\approx 12 \\cdot 3{,}6213 = 43{,}46\\text{ m}^2'}</MathText>
              </div>

              <div className="space-y-1 pt-1">
                <div><strong>3. A szőnyeg területe:</strong></div>
                <MathText>{'T_{\\text{szőnyeg}} = r^2\\pi \\approx 3{,}6213^2 \\cdot \\pi \\approx 13{,}114 \\cdot 3{,}1416 \\approx 41{,}20\\text{ m}^2'}</MathText>
                <div className="text-[11px] font-sans text-amber-700 dark:text-amber-400">
                  A szőnyeg a padló <MathText>{'\\frac{41{,}20}{43{,}46} \\approx 94{,}8\\%'}</MathText>-át fedi le!
                </div>
              </div>

              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs font-sans">
                Válasz: A pavilon alapterülete kb. 43,46 m², a szőnyeg sugara kb. 3,62 m, területe pedig kb. 41,20 m².
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. Szakasz: Tipikus buktatók és Rendszerező összefoglaló táblázat */}
      <TheorySection
        id="buktatok-es-osszegzes"
        number={6}
        title="Tipikus buktatók és Rendszerező Tételtáblázat"
        badge="ÖSSZEFOGLALÓ"
        badgeColor="rose"
      >
        <TheoryTrapBox
          traps={[
            {
              title: 'Húrtrapéz és Érintőtrapéz összetévesztése',
              wrong: 'Minden szimmetrikus trapézba automatikusan beírható kör.',
              right: 'Egy szimmetrikus trapéz mindig HÚRNÉGYSZÖG (köré írható kör), de CSAK AKKOR ÉRINTŐTRAPÉZ (beírt kör), ha teljesül az oldaltétel: a + c = 2b!',
              explanation: 'Sok feladatban szimmetrikus trapéz szerepel, de ha a szárak nem az alapok számtani közepei, nincs beírt köre!'
            },
            {
              title: 'Beírt kör átmérője vs. sugara hiba',
              wrong: 'A szimmetrikus érintőtrapézban r = √(ac).',
              right: 'A magasság egyenlő az átmérővel: 2r = m = √(ac), emiatt a beírt kör sugara r = √(ac) / 2!',
              explanation: 'A vizsgázók 40%-a elfelejti elosztani 2-vel a magasságot a sugár kiszámításakor, így a területnél négyszeres hibát vét!'
            },
            {
              title: 'Körülírt kör (R) és Beírt kör (r) sugarának felcserélése',
              wrong: 'Szabályos hatszögben r = a és R = a√3/2.',
              right: 'A körülírt kör sugara a nagyobb: R = a, a beírt kör sugara a kisebb: r = a√3/2!',
              explanation: 'Mindig igaz, hogy R > r bármely n ≥ 3 szabályos sokszögre. Hatszögnél a csúcsok távolsága a középponttól pontosan a-val egyenlő.'
            }
          ]}
        />

        <TheoryTable
          title="Szabályos sokszögek és érintőtrapézok összefoglaló metrikája"
          headers={['Síkforma', 'Jellemző adat', 'Beírt sugár (r)', 'Körülírt sugár (R)', 'Terület (T)', 'Kulcsösszefüggés']}
          rows={[
            [
              'Szabályos háromszög (n=3)',
              'Oldal: a',
              'a√3 / 6',
              'a√3 / 3',
              'a²√3 / 4',
              'R = 2r (súlypont 2:1)'
            ],
            [
              'Négyzet (n=4)',
              'Oldal: a',
              'a / 2',
              'a√2 / 2',
              'a²',
              'R = r√2'
            ],
            [
              'Szabályos hatszög (n=6)',
              'Oldal: a',
              'a√3 / 2',
              'a',
              '3a²√3 / 2',
              'R = a (6 db szabályos △)'
            ],
            [
              'Szabályos nyolcszög (n=8)',
              'Oldal: a',
              'a(√2+1) / 2',
              'a / √(2-√2)',
              '2a²(√2+1)',
              'Középponti szög 45°'
            ],
            [
              'Szimmetrikus érintőtrapéz',
              'Alapok: a, c',
              '√(ac) / 2',
              'Nem mindig létezik',
              '[(a+c)/2] · √(ac)',
              'b = (a+c)/2 (számtani), m = √(ac) (mértani)'
            ],
            [
              'Derékszögű érintőtrapéz',
              'Alapok: a, c',
              'ac / (a+c)',
              'Nincs (nem húrnégyszög)',
              'a · c',
              'm = 2ac/(a+c) (harmonikus), T = ac'
            ]
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
