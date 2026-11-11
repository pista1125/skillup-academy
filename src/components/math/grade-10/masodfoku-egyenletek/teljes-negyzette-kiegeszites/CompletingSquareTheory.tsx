import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  GeometricCompletingSquareSvg,
  IncompleteEquationTreeSvg,
  StepByStepSquareMethodSvg,
  RootsExistenceComparisonSvg
} from './CompletingSquareFigures';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Layers,
  Sparkles,
  Maximize2,
  Sliders,
  RotateCcw,
  Check,
  Compass
} from 'lucide-react';

interface CompletingSquareTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CompletingSquareTheory: React.FC<CompletingSquareTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab: Négyzetkiegészítő Szimulátor Állapot ---
  const [pVal, setPVal] = useState<number>(6);
  const [qVal, setQVal] = useState<number>(5);

  const dVal = pVal / 2;
  const dSquared = dVal * dVal;
  const rightSide = dSquared - qVal;

  const setPreset = (p: number, q: number) => {
    setPVal(p);
    setQVal(q);
  };

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TANANYAG"
      title="Teljes négyzetté kiegészítés"
      subtitle="A másodfokú egyenletek megoldásának alapköve: hiányos egyenletek, geometriai szemléltetés és az (x ± d)² alakra hozás lépései."
      themeColor="amber"
      pdfFilename="10_osztaly_masodfoku_egyenletek_teljes_negyzet_tananyag.pdf"
      quickRule={{
        label: 'A NÉGYZETKIEGÉSZÍTÉS ARANYSZABÁLYA',
        align: 'left',
        formula: (
          <div className="space-y-3 text-slate-800">
            <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-sm">
              <span className="font-bold text-amber-900 block mb-1">A négyzetté kiegészítés azonossága:</span>
              <p className="font-mono text-base font-bold text-amber-800">
                x² + px = (x + p/2)² - (p/2)²
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Mindig felezd meg az elsőfokú tag együtthatóját (p/2), írd fel a teljes négyzetet, és azonnal vond le a felezett érték négyzetét!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">1. Hiányos egyenlet (c = 0):</span>
                <p className="font-mono text-slate-700 mt-0.5">ax² + bx = 0 ⟹ x(ax + b) = 0</p>
                <p className="text-emerald-600 font-bold mt-0.5">Gyökök: x₁ = 0 vagy x₂ = -b/a</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-purple-700">2. Hiányos egyenlet (b = 0):</span>
                <p className="font-mono text-slate-700 mt-0.5">ax² + c = 0 ⟹ x² = -c/a</p>
                <p className="text-emerald-600 font-bold mt-0.5">Gyökök: x₁,₂ = ±√(-c/a) (ha ≥ 0)</p>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a teljes négyzetté kiegészítés feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 feladatos interaktív kvízben és a Wordwall párosító játékokban!"
      interactiveSection={
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border-2 border-amber-200/80 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Interaktív Négyzetkiegészítő Laboratórium
                </h3>
                <p className="text-xs text-slate-600">
                  Állítsd be az együtthatókat (p és q), és figyeld meg az algebrai átalakítás lépéseit élőben!
                </p>
              </div>
            </div>

            {/* Mintapélda gombok */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPreset(6, 5)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  pVal === 6 && qVal === 5
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                Két gyök (x² + 6x + 5)
              </button>
              <button
                onClick={() => setPreset(-8, 16)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  pVal === -8 && qVal === 16
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                Egy gyök (x² - 8x + 16)
              </button>
              <button
                onClick={() => setPreset(4, 13)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  pVal === 4 && qVal === 13
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                Nincs gyök (x² + 4x + 13)
              </button>
              <button
                onClick={() => setPreset(-2, -15)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  pVal === -2 && qVal === -15
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                Gyakorló (x² - 2x - 15)
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/80 p-5 rounded-2xl border border-amber-100">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  Elsőfokú tag együtthatója (p):
                </label>
                <span className="text-sm font-mono font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  p = {pVal > 0 ? `+${pVal}` : pVal}
                </span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                step="2"
                value={pVal}
                onChange={(e) => setPVal(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-12</span>
                <span>0</span>
                <span>+12</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  Konstans tag (q):
                </label>
                <span className="text-sm font-mono font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                  q = {qVal > 0 ? `+${qVal}` : qVal}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={qVal}
                onChange={(e) => setQVal(parseInt(e.target.value, 10))}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-25</span>
                <span>0</span>
                <span>+25</span>
              </div>
            </div>
          </div>

          {/* Lépésről lépésre dinamikus levezetés */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Eredeti egyenlet:
              </span>
              <span className="text-lg font-mono font-black text-slate-900">
                x² {pVal >= 0 ? `+ ${pVal}x` : `- ${Math.abs(pVal)}x`} {qVal >= 0 ? `+ ${qVal}` : `- ${Math.abs(qVal)}`} = 0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800 block">1. Lépés: Felezés (p/2)</span>
                <p className="font-mono text-sm font-bold text-amber-900 mt-1">
                  d = {pVal}/2 = {dVal > 0 ? `+${dVal}` : dVal}
                </p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  d² = ({dVal})² = {dSquared}
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-[11px] font-bold text-blue-800 block">2. Lépés: Négyzet és levonás</span>
                <p className="font-mono text-sm font-bold text-blue-900 mt-1">
                  (x {dVal >= 0 ? `+ ${dVal}` : `- ${Math.abs(dVal)}`})² - {dSquared} {qVal >= 0 ? `+ ${qVal}` : `- ${Math.abs(qVal)}`} = 0
                </p>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Összevonva a konstansokat: -{dSquared} + ({qVal}) = {-dSquared + qVal}
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-[11px] font-bold text-purple-800 block">3. Lépés: Átrendezés a jobb oldalra</span>
                <p className="font-mono text-sm font-bold text-purple-900 mt-1">
                  (x {dVal >= 0 ? `+ ${dVal}` : `- ${Math.abs(dVal)}`})² = {rightSide}
                </p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Jobb oldal előjele: {rightSide > 0 ? 'Pozitív (> 0)' : rightSide === 0 ? 'Nulla (= 0)' : 'Negatív (< 0)'}
                </p>
              </div>
            </div>

            {/* Eredmény panel */}
            <div
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                rightSide > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : rightSide === 0
                  ? 'bg-blue-50 border-blue-200 text-blue-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {rightSide > 0
                    ? 'Két valós megoldás létezik (x + d = ±√k):'
                    : rightSide === 0
                    ? 'Egybeeső (kettős) valós megoldás létezik:'
                    : 'Nincs valós megoldás az egyenletre:'}
                </span>
                <p className="text-base font-bold mt-1">
                  {rightSide > 0 && (
                    <>
                      x₁ = {-dVal} + √{rightSide} {Number.isInteger(Math.sqrt(rightSide)) ? `= ${-dVal + Math.sqrt(rightSide)}` : `≈ ${(-dVal + Math.sqrt(rightSide)).toFixed(2)}`}
                      <span className="mx-3 text-slate-400">|</span>
                      x₂ = {-dVal} - √{rightSide} {Number.isInteger(Math.sqrt(rightSide)) ? `= ${-dVal - Math.sqrt(rightSide)}` : `≈ ${(-dVal - Math.sqrt(rightSide)).toFixed(2)}`}
                    </>
                  )}
                  {rightSide === 0 && (
                    <>
                      x₁ = x₂ = {-dVal} (Mivel (x {dVal >= 0 ? `+ ${dVal}` : `- ${Math.abs(dVal)}`})² = 0 ⟹ x = {-dVal})
                    </>
                  )}
                  {rightSide < 0 && (
                    <>
                      A valós számok körében egyetlen valós szám négyzete sem lehet negatív ({rightSide} &lt; 0)!
                    </>
                  )}
                </p>
              </div>

              <div className="shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                    rightSide > 0
                      ? 'bg-emerald-600 text-white'
                      : rightSide === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {rightSide > 0 ? '2 valós gyök' : rightSide === 0 ? '1 valós gyök' : '0 valós gyök'}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
      sections={[
        {
          id: 'sec-anatomy',
          title: '1. A másodfokú egyenlet fogalma és felépítése',
          description:
            'Mi tesz egy egyenletet másodfokúvá, és mik a tagok elnevezései az általános alakban?',
          color: 'amber',
          badge: 'Alapfogalmak',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Az egyismeretlenes másodfokú egyenlet kanonikus (általános) alakja"
                color="amber"
                icon={<Layers className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
                  <p>
                    Egyismeretlenes <strong>másodfokú egyenletnek</strong> nevezünk minden olyan egyenletet, amely algebrai átalakítások után a következő alakra hozható:
                  </p>
                  <div className="bg-slate-900 text-amber-300 p-4 rounded-xl text-center font-mono text-lg font-black shadow-inner">
                    a · x² + b · x + c = 0 &nbsp;&nbsp;&nbsp; (ahol a, b, c ∈ ℝ és a ≠ 0)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="font-bold text-amber-900 block text-xs uppercase">a · x²: Másodfokú tag</span>
                      <p className="text-xs text-amber-800 mt-1">
                        <strong>a</strong> a másodfokú tag együtthatója (főegyüttható). Kötelezően <strong>a ≠ 0</strong>, különben az egyenlet lineáris (elsőfokú) lenne!
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <span className="font-bold text-blue-900 block text-xs uppercase">b · x: Elsőfokú tag</span>
                      <p className="text-xs text-blue-800 mt-1">
                        <strong>b</strong> az elsőfokú (lineáris) tag együtthatója. Ha b = 0, az egyenlet hiányos.
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="font-bold text-emerald-900 block text-xs uppercase">c: Konstans tag</span>
                      <p className="text-xs text-emerald-800 mt-1">
                        <strong>c</strong> a szabad (konstans, szám) tag. Ha c = 0, az egyenlet szintén hiányos.
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-incomplete',
          title: '2. Hiányos másodfokú egyenletek villámgyors megoldása',
          description:
            'Hogyan oldhatók meg a másodfokú egyenletek bonyolult formulák nélkül, ha a b vagy a c tag értéke 0?',
          color: 'blue',
          badge: 'Hiányos esetek',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A két hiányos alaptípus áttekintése"
                color="blue"
                icon={<Scale className="w-5 h-5 text-blue-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Ha az $ax^2 + bx + c = 0$ egyenletben valamelyik együttható nulla, az egyenletet <strong>hiányos másodfokú egyenletnek</strong> hívjuk. Ezek megoldásához nincs szükség hosszadalmas átalakításokra:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <IncompleteEquationTreeSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A hiányos másodfokú egyenletek két alapvető megoldási ága a hiányzó együttható szerint
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* c = 0 eset */}
                    <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-950 text-sm">1. Eset: c = 0 (ax² + bx = 0)</span>
                        <span className="px-2 py-0.5 bg-indigo-200 text-indigo-800 text-[10px] font-bold rounded-md">Kiemelés</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Mindkét tag tartalmazza az ismeretlent ($x$), így az $x$ azonnal kiemelhető szorzóként:
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-indigo-100 font-mono text-xs text-indigo-900 space-y-1">
                        <p>ax² + bx = 0</p>
                        <p className="font-bold text-indigo-700">x · (ax + b) = 0</p>
                        <p className="text-slate-500">Egy szorzat akkor 0, ha valamelyik tényezője 0:</p>
                        <p className="text-emerald-700 font-bold">1) x₁ = 0</p>
                        <p className="text-emerald-700 font-bold">2) ax + b = 0 ⟹ x₂ = -b/a</p>
                      </div>
                      <div className="text-[11px] bg-indigo-100/50 p-2 rounded-lg text-indigo-800 font-medium">
                        💡 <strong>Példa:</strong> 3x² - 12x = 0 ⟹ 3x(x - 4) = 0 ⟹ <strong>x₁ = 0</strong> és <strong>x₂ = 4</strong>.
                      </div>
                    </div>

                    {/* b = 0 eset */}
                    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-950 text-sm">2. Eset: b = 0 (ax² + c = 0)</span>
                        <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-[10px] font-bold rounded-md">Gyökvonás</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Az egyenletben nincs elsőfokú tag, ezért közvetlenül kifejezhető az $x^2$:
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-amber-100 font-mono text-xs text-amber-900 space-y-1">
                        <p>ax² + c = 0</p>
                        <p>ax² = -c</p>
                        <p className="font-bold text-amber-700">x² = -c/a</p>
                        <p className="text-slate-500">Kétoldali négyzetgyökvonással:</p>
                        <p className="text-emerald-700 font-bold">x₁,₂ = ±√(-c/a) &nbsp;(ha -c/a ≥ 0)</p>
                      </div>
                      <div className="text-[11px] bg-amber-100/50 p-2 rounded-lg text-amber-800 font-medium">
                        💡 <strong>Példa:</strong> 2x² - 32 = 0 ⟹ x² = 16 ⟹ <strong>x₁,₂ = ±4</strong>.<br />
                        Viszont: x² + 9 = 0 ⟹ x² = -9 ⟹ <strong>Nincs valós megoldás!</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </TheoryCard>

              <TheoryTrapBox
                title="HALÁLOS HIBA: Soha ne ossz ismeretlennel (x-szel)!"
                color="rose"
              >
                <div className="text-xs space-y-2 text-rose-900 leading-relaxed">
                  <p>
                    Gyakori hiba a $3x^2 - 12x = 0$ típusú egyenletnél az $x$-szel való leosztás:
                    <span className="font-mono block bg-white/80 p-2 my-1 rounded border border-rose-300 text-rose-700 line-through">
                      3x² = 12x  / : x  ⟹  3x = 12  ⟹  x = 4  (HIBÁS LÉPÉS!)
                    </span>
                  </p>
                  <p>
                    <strong>Miért súlyos hiba?</strong> Mivel az $x = 0$ is megoldása az egyenletnek, az $x$-szel való osztás valójában <strong>nullával való osztás</strong>, ami elveszíti az $x = 0$ gyököt! Mindig <strong>kiemeléssel szorzattá alakíts</strong>!
                  </p>
                </div>
              </TheoryTrapBox>
            </div>
          )
        },
        {
          id: 'sec-square-principle',
          title: '3. A teljes négyzetté kiegészítés elve és geometriája',
          description:
            'Hogyan vezeti vissza a geometriai négyzetkiegészítés az általános másodfokú egyenletet egy tiszta négyzetes egyenletre?',
          color: 'emerald',
          badge: 'Elmélet & Geometria',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A geometriai szemlélet: Miért 'kiegészítés' a neve?"
                color="emerald"
                icon={<Compass className="w-5 h-5 text-emerald-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A teljes négyzetté kiegészítés módszerét már az ókori babilóniaiak és az arab matematikus (al-Hvárizmi, a Kr. u. 9. században) is geometriailag alkalmazta:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/30 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <GeometricCompletingSquareSvg size={400} className="w-full max-w-md" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A sarkából hiányzó (p/2)² négyzet pótlásával válik az alakzat teljes (x + p/2)² területté
                    </p>
                  </div>

                  <ul className="list-disc pl-5 space-y-1.5 text-xs">
                    <li>
                      Adott egy $x$ oldalú négyzet, amelynek területe <strong>x²</strong>.
                    </li>
                    <li>
                      Hozzá kell adnunk a $px$ területet. Ezt elfelezzük két egyenlő téglalapra: mindkettő oldalai $x$ és <strong>p/2</strong>, területük <strong>(p/2) · x</strong>.
                    </li>
                    <li>
                      Az egyik téglalapot a négyzet jobb oldalára, a másikat az alsó oldalára illesztjük.
                    </li>
                    <li>
                      Ekkor egy olyan nagy alakzatot kapunk, amelynek oldala <strong>(x + p/2)</strong>, de a jobb alsó sarkából <strong>pontosan hiányzik egy (p/2) × (p/2) méretű kis saroknégyzet</strong>!
                    </li>
                    <li>
                      Ha hozzáadjuk ezt a hiányzó <strong>(p/2)²</strong> területű darabot, egy <strong>teljes nagy négyzetet</strong> kapunk, melynek területe <strong>(x + p/2)²</strong>!
                    </li>
                  </ul>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                    <span className="font-bold text-emerald-950 block text-xs uppercase mb-1">
                      Algebrai azonosságok felhasználása:
                    </span>
                    <p className="font-mono text-xs text-emerald-900">
                      (x + d)² = x² + 2dx + d² &nbsp; ⟹ &nbsp; x² + 2dx = (x + d)² - d²
                    </p>
                    <p className="font-mono text-xs text-emerald-900 mt-1">
                      (x - d)² = x² - 2dx + d² &nbsp; ⟹ &nbsp; x² - 2dx = (x - d)² - d²
                    </p>
                    <p className="text-[11px] text-emerald-800 mt-2 font-medium">
                      ⚠️ Figyeld meg: a levont tag <strong>mindkét esetben kivonás (- d²)</strong>, mert a zárójel kibontásakor (+d)² és (-d)² is mindig pozitív +d²-et ad!
                    </p>
                  </div>
                </div>
              </TheoryCard>

              <TheoryCard
                title="A megoldás 4 lépéses algoritmusa (x² + px + q = 0 esetén)"
                color="amber"
                icon={<Sparkles className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/30 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <StepByStepSquareMethodSvg size={520} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A négyzetkiegészítés 4 egymásra épülő lépése: Felezés ➔ Kiegészítés ➔ Átrendezés ➔ Gyökvonás
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs mb-1">
                        1. Lépés: Felezés (p / 2)
                      </span>
                      Vedd az elsőfokú tag együtthatóját ($p$), és felezd meg: $d = p/2$.
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs mb-1">
                        2. Lépés: Teljes négyzet & kompenzáció
                      </span>
                      Írd fel az $(x + d)^2$ alakot, és rögtön vond le a felezett érték négyzetét: $(x + d)^2 - d^2$.
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs mb-1">
                        3. Lépés: Összevonás és átrendezés
                      </span>
                      Hozd össze a levont $d^2$-et a konstans $q$ taggal, majd a számot vidd át a jobb oldalra: $(x + d)^2 = k$.
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs mb-1">
                        4. Lépés: Gyökvonás & diszkusszió
                      </span>
                      Ha k &gt; 0, vonj gyököt mindkét oldalból ± előjellel: x + d = ±√k ⟹ x = -d ± √k.
                    </div>
                  </div>
                </div>
              </TheoryCard>

              <TheoryCard
                title="A valós gyökök száma a jobb oldal (k) előjele alapján"
                color="purple"
                icon={<Layers className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Az $(x + d)^2 = k$ alakra hozott egyenlet megoldásainak száma kizárólag a jobb oldalon álló $k$ szám előjelétől függ:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/30 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <RootsExistenceComparisonSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Pozitív jobb oldal: 2 különböző gyök (±√k) | Nulla: 1 kettős gyök | Negatív: nincs valós gyök
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-worked-examples',
          title: '4. Részletesen kidolgozott mintapéldák',
          description:
            'Gyakorlati feladatok lépésről lépésre végigvezetve a három lehetséges kimenetelre (két gyök, egy gyök, nincs gyök).',
          color: 'indigo',
          badge: 'Mintapéldák',
          content: (
            <div className="space-y-6">
              {/* 1. Példa */}
              <TheoryCard
                title="1. Mintapélda: Két különböző valós gyök (x² + 6x - 7 = 0)"
                color="emerald"
              >
                <div className="space-y-3 text-slate-700 text-xs leading-relaxed font-mono">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="text-slate-500 font-sans">// Kiinduló egyenlet:</p>
                    <p className="font-bold text-slate-900">x² + 6x - 7 = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 1. Felezés: p = 6 ⟹ d = 6/2 = 3. d² = 9.</p>
                    <p className="text-slate-500 font-sans">// 2. Kiegészítés és kompenzálás:</p>
                    <p className="font-bold text-blue-700">(x + 3)² - 9 - 7 = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 3. Konstansok összevonása és átvitele a jobb oldalra:</p>
                    <p className="font-bold text-purple-700">(x + 3)² - 16 = 0  ⟹  (x + 3)² = 16</p>
                    <p className="text-slate-500 font-sans mt-2">// 4. Gyökvonás mindkét oldalból (16 &gt; 0, így két gyök van):</p>
                    <p className="font-bold text-amber-700">x + 3 = ±√16 = ±4</p>
                    <p className="text-slate-500 font-sans mt-2">// Megoldások felírása:</p>
                    <p className="text-emerald-700 font-bold font-sans">
                      • x₁ = -3 + 4 = <strong>1</strong><br />
                      • x₂ = -3 - 4 = <strong>-7</strong>
                    </p>
                    <p className="text-slate-600 font-sans mt-1 text-[11px]">
                      Ellenőrzés (x = 1): 1² + 6(1) - 7 = 1 + 6 - 7 = 0 ✓ | (x = -7): (-7)² + 6(-7) - 7 = 49 - 42 - 7 = 0 ✓
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* 2. Példa */}
              <TheoryCard
                title="2. Mintapélda: Egyetlen (kettős) valós gyök (x² - 10x + 25 = 0)"
                color="blue"
              >
                <div className="space-y-3 text-slate-700 text-xs leading-relaxed font-mono">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="text-slate-500 font-sans">// Kiinduló egyenlet:</p>
                    <p className="font-bold text-slate-900">x² - 10x + 25 = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 1. Felezés: p = -10 ⟹ d = -5. d² = 25.</p>
                    <p className="text-slate-500 font-sans">// 2. Kiegészítés és kompenzálás:</p>
                    <p className="font-bold text-blue-700">(x - 5)² - 25 + 25 = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 3. Átrendezés:</p>
                    <p className="font-bold text-purple-700">(x - 5)² = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 4. Egy szám négyzete csak akkor lehet 0, ha maga a szám 0:</p>
                    <p className="text-emerald-700 font-bold font-sans">
                      x - 5 = 0  ⟹  x = <strong>5</strong> (kettős gyök)
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* 3. Példa */}
              <TheoryCard
                title="3. Mintapélda: Nincs valós gyök (x² + 4x + 10 = 0)"
                color="rose"
              >
                <div className="space-y-3 text-slate-700 text-xs leading-relaxed font-mono">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="text-slate-500 font-sans">// Kiinduló egyenlet:</p>
                    <p className="font-bold text-slate-900">x² + 4x + 10 = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 1. Felezés: p = 4 ⟹ d = 2. d² = 4.</p>
                    <p className="text-slate-500 font-sans">// 2. Kiegészítés és kompenzálás:</p>
                    <p className="font-bold text-blue-700">(x + 2)² - 4 + 10 = 0</p>
                    <p className="text-slate-500 font-sans mt-2">// 3. Átrendezés:</p>
                    <p className="font-bold text-rose-700">(x + 2)² = -6</p>
                    <p className="text-slate-500 font-sans mt-2">// 4. Elemzés:</p>
                    <p className="text-rose-800 font-bold font-sans">
                      Mivel bármely valós szám négyzete nemnegatív ((x + 2)² ≥ 0), a jobb oldal pedig negatív (-6 &lt; 0), az egyenletnek <strong>nincs valós megoldása (x ∈ ∅)</strong>.
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-traps-summary',
          title: '5. Gyakori hibák és tévhitek elkerülése',
          description:
            'A legjellemzőbb dolgozathibák, amelyek a felezésnél, levonásnál és előjeleknél előfordulnak.',
          color: 'rose',
          badge: 'Csapdák & Tévhitek',
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TheoryTrapBox
                  title="1. Csapda: A levonandó d² előjelének elrontása"
                  color="rose"
                >
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Negatív együtthatónál (pl. $x^2 - 8x$) a diákok gyakran azt gondolják, hogy a levonandó négyzet is pozitívvá válik, vagy hozzá kell adni:
                    <span className="block font-mono bg-white/70 p-1.5 my-1 rounded border border-rose-300 line-through">
                      x² - 8x = (x - 4)² + 16  (TÉVES!)
                    </span>
                    <strong>Helyesen:</strong> A zárójel kibontásakor $(-4)^2 = +16$ keletkezik, ezért azt <strong>mindig KIVONNI kell: $(x - 4)^2 - 16$</strong>!
                  </p>
                </TheoryTrapBox>

                <TheoryTrapBox
                  title="2. Csapda: A ± jel elfelejtése gyökvonáskor"
                  color="rose"
                >
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Az $(x + 3)^2 = 25$ egyenletből gyököt vonva sokan csak $x + 3 = 5$-öt írnak, elhagyva a negatív ágat:
                    <span className="block font-mono bg-white/70 p-1.5 my-1 rounded border border-rose-300 line-through">
                      x + 3 = 5 ⟹ x = 2  (FÉL MEGOLDÁS!)
                    </span>
                    <strong>Helyesen:</strong> Mivel $(-5)^2$ is 25, két ág van: $x + 3 = \pm 5 \implies x_1 = 2$ és $x_2 = -8$!
                  </p>
                </TheoryTrapBox>
              </div>

              <TheoryCallout
                title="Összegzés és kulcstanulság"
                color="amber"
                icon={<Sparkles className="w-5 h-5 text-amber-600" />}
              >
                <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p>
                    A teljes négyzetté kiegészítés az <strong>egyetlen univerzális algebrai módszer</strong>, amellyel bármilyen másodfokú egyenlet megoldható. Valójában maga az ismert <strong>másodfokú egyenlet megoldóképlete</strong> is pontosan ezen a teljes négyzetté kiegészítési lépéssoron alapul, csak az általános $ax^2 + bx + c = 0$ betűkre elvégezve!
                  </p>
                </div>
              </TheoryCallout>
            </div>
          )
        }
      ]}
    />
  );
};

