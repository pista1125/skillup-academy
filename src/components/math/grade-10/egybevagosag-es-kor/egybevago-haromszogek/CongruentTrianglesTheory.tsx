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
  IsoscelesTriangleSymmetrySvg,
  PerpendicularBisectorProofSvg,
  ParallelogramDiagonalsSvg
} from './CongruentTrianglesFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  RotateCw,
  Move,
  FlipHorizontal,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CongruentTrianglesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CongruentTrianglesTheory: React.FC<CongruentTrianglesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State: Transzformációs & Egybevágósági Labor ---
  const [dx, setDx] = useState<number>(3);
  const [dy, setDy] = useState<number>(1);
  const [angleDeg, setAngleDeg] = useState<number>(45);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);

  // Eredeti háromszög csúcsai (cm-ben a koordinátarendszerben):
  const origA = { x: 0, y: 0 };
  const origB = { x: 4, y: 0 };
  const origC = { x: 1, y: 3 };

  // Oldalhosszak:
  const dist = (p1: { x: number; y: number }, p2: { x: number; y: number }) =>
    Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  const origC_len = dist(origA, origB); // 4
  const origA_len = dist(origB, origC); // sqrt((1-4)^2 + 3^2) = sqrt(9+9) = 4.24
  const origB_len = dist(origA, origC); // sqrt(1 + 9) = 3.16
  const origArea = 0.5 * 4 * 3; // 6

  // Transzformált koordináták kiszámítása:
  const rad = (angleDeg * Math.PI) / 180;
  const transformPoint = (p: { x: number; y: number }) => {
    // 1. Tükrözés (ha be van kapcsolva, y-tengelyre invertáljuk az x-et)
    let px = isMirrored ? -p.x : p.x;
    let py = p.y;
    // 2. Forgatás origó körül angleDeg szöggel
    let rx = px * Math.cos(rad) - py * Math.sin(rad);
    let ry = px * Math.sin(rad) + py * Math.cos(rad);
    // 3. Eltolás (dx, dy)
    return {
      x: rx + dx,
      y: ry + dy
    };
  };

  const transA = transformPoint(origA);
  const transB = transformPoint(origB);
  const transC = transformPoint(origC);

  const transC_len = dist(transA, transB);
  const transA_len = dist(transB, transC);
  const transB_len = dist(transA, transC);

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Egybevágó háromszögek tulajdonságai és alkalmazásai"
      subtitle="Hogyan használjuk az egybevágóságot szakaszok és szögek egyenlőségének bizonyítására? Alaptételek, szimmetriák és transzformációk."
      themeColor="indigo"
      pdfFilename="10_osztaly_egybevago_haromszogek_tulajdonsagai_tananyag.pdf"
      quickRule={{
        label: 'AZ EGYBEVÁGÓSÁG KÖVETKEZMÉNYEI ÉS BIZONYÍTÁSI ELVE',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-indigo-50/90 p-2.5 rounded-xl border border-indigo-200">
              <span className="font-black text-indigo-900 block mb-0.5">
                Ha △ABC ≅ △A'B'C', akkor minden megfelelő méretük megegyezik:
              </span>
              <ul className="space-y-1 font-medium text-indigo-950 mt-1">
                <li>• <strong>Oldalak és szögek:</strong> <MathText>{'a=a\', b=b\', c=c\''}</MathText> és <MathText>{'\\alpha=\\alpha\', \\beta=\\beta\', \\gamma=\\gamma\''}</MathText></li>
                <li>• <strong>Vonalak:</strong> Magasságok (<MathText>{'m_a = m_a\''}</MathText>), súlyvonalak (<MathText>{'s_a = s_a\''}</MathText>), szögfelezők egyenlők.</li>
                <li>• <strong>Körök és terület:</strong> <MathText>{'r = r\', R = R\', T = T\''}</MathText></li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-800 text-[11px] leading-tight">
              <strong>💡 A GEOMETRIAI BIZONYÍTÁSOK KULCSA:</strong> Két szakasz vagy két szög egyenlőségének bizonyításához keress két olyan háromszöget, amelyeknek ezek az elemei, és igazold e két háromszög egybevágóságát!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz az egybevágó háromszögek feladataira?"
      practiceSubtitle="Gyakorold a geometriai bizonyításokat, tételalkalmazásokat és tulajdonságokat a kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-lg">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-indigo-100">
                  Interaktív Egybevágósági Transzformációs Labor
                </h3>
                <p className="text-xs text-indigo-300/80">
                  Mozgasd, forgasd és tükrözd a háromszöget! Figyeld meg: az oldalak és a terület szigorúan változatlanok maradnak (izometria)!
                </p>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
                onClick={() => {
                  setDx(0);
                  setDy(0);
                  setAngleDeg(0);
                  setIsMirrored(false);
                }}
              >
                Alapállapot (Fedés)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
                onClick={() => {
                  setDx(4);
                  setDy(2);
                  setAngleDeg(90);
                  setIsMirrored(false);
                }}
              >
                Forgatás 90° + Eltolás
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
                onClick={() => {
                  setDx(5);
                  setDy(0);
                  setAngleDeg(0);
                  setIsMirrored(true);
                }}
              >
                Tengelyes Tükrözés
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vezérlők */}
            <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-indigo-800/40">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                Egybevágósági transzformáció vezérlői
              </span>

              {/* Forgatás */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-indigo-400" /> Elforgatás (szög):
                  </span>
                  <span className="font-mono text-indigo-300 font-bold">{angleDeg}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* X eltolás */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Move className="w-3.5 h-3.5 text-cyan-400" /> Vízszintes eltolás (Δx):
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{dx > 0 ? `+${dx}` : dx} cm</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="6"
                  step="0.5"
                  value={dx}
                  onChange={(e) => setDx(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Y eltolás */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Move className="w-3.5 h-3.5 text-cyan-400" /> Függőleges eltolás (Δy):
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{dy > 0 ? `+${dy}` : dy} cm</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="4"
                  step="0.5"
                  value={dy}
                  onChange={(e) => setDy(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Tükrözés gomb */}
              <Button
                size="sm"
                variant="outline"
                className={`w-full text-xs font-bold transition-all ${
                  isMirrored
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
                onClick={() => setIsMirrored(!isMirrored)}
              >
                <FlipHorizontal className="w-4 h-4 mr-2" />
                {isMirrored ? 'Tükrözés BEKAPCSOLVA (Irányításváltó)' : 'Tükrözés KIKAPCSOLVA (Irányítástartó)'}
              </Button>
            </div>

            {/* Szemléltetés & Statisztika */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-950/50 border border-indigo-800/40 text-xs sm:text-sm grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-900/60">
                  <span className="text-indigo-400 font-bold block mb-1">Eredeti △ABC:</span>
                  <p className="font-mono text-xs text-slate-300">c = {origC_len.toFixed(2)} cm</p>
                  <p className="font-mono text-xs text-slate-300">a = {origA_len.toFixed(2)} cm</p>
                  <p className="font-mono text-xs text-slate-300">b = {origB_len.toFixed(2)} cm</p>
                  <p className="font-mono text-xs font-bold text-emerald-400 mt-1">Terület = {origArea.toFixed(1)} cm²</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-purple-900/60">
                  <span className="text-purple-400 font-bold block mb-1">Transzformált △A'B'C':</span>
                  <p className="font-mono text-xs text-slate-300">c' = {transC_len.toFixed(2)} cm</p>
                  <p className="font-mono text-xs text-slate-300">a' = {transA_len.toFixed(2)} cm</p>
                  <p className="font-mono text-xs text-slate-300">b' = {transB_len.toFixed(2)} cm</p>
                  <p className="font-mono text-xs font-bold text-emerald-400 mt-1">Terület = {origArea.toFixed(1)} cm²</p>
                </div>
              </div>

              {/* SVG Két Háromszög Megjelenítő */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg viewBox="-80 -80 340 220" className="w-full max-w-[420px] h-auto select-none">
                  {/* Koordináta-rács halványan */}
                  <line x1="-70" y1="40" x2="250" y2="40" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="-70" x2="40" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Skálázó függvény: 1 egység = 18 px, origó eltolása (40, 40) */}
                  {(() => {
                    const sx = (x: number) => 40 + x * 18;
                    const sy = (y: number) => 40 - y * 18; // y felfelé növekszik a matekban

                    const oAx = sx(origA.x);
                    const oAy = sy(origA.y);
                    const oBx = sx(origB.x);
                    const oBy = sy(origB.y);
                    const oCx = sx(origC.x);
                    const oCy = sy(origC.y);

                    const tAx = sx(transA.x);
                    const tAy = sy(transA.y);
                    const tBx = sx(transB.x);
                    const tBy = sy(transB.y);
                    const tCx = sx(transC.x);
                    const tCy = sy(transC.y);

                    return (
                      <g>
                        {/* Eredeti háromszög (kék/indigo) */}
                        <polygon
                          points={`${oAx},${oAy} ${oBx},${oBy} ${oCx},${oCy}`}
                          fill="#4f46e5"
                          fillOpacity="0.25"
                          stroke="#6366f1"
                          strokeWidth="2"
                        />
                        <circle cx={oAx} cy={oAy} r="3" fill="#818cf8" />
                        <text x={oAx - 12} y={oAy + 12} fill="#a5b4fc" fontSize="10">A</text>
                        <circle cx={oBx} cy={oBy} r="3" fill="#818cf8" />
                        <text x={oBx + 5} y={oBy + 12} fill="#a5b4fc" fontSize="10">B</text>
                        <circle cx={oCx} cy={oCy} r="3" fill="#818cf8" />
                        <text x={oCx - 4} y={oCy - 6} fill="#a5b4fc" fontSize="10">C</text>

                        {/* Transzformált háromszög (lila/emerald) */}
                        <polygon
                          points={`${tAx},${tAy} ${tBx},${tBy} ${tCx},${tCy}`}
                          fill="#10b981"
                          fillOpacity="0.3"
                          stroke="#34d399"
                          strokeWidth="2.5"
                        />
                        <circle cx={tAx} cy={tAy} r="3.5" fill="#34d399" />
                        <text x={tAx - 12} y={tAy + 12} fill="#6ee7b7" fontSize="10" fontWeight="bold">A'</text>
                        <circle cx={tBx} cy={tBy} r="3.5" fill="#34d399" />
                        <text x={tBx + 5} y={tBy + 12} fill="#6ee7b7" fontSize="10" fontWeight="bold">B'</text>
                        <circle cx={tCx} cy={tCy} r="3.5" fill="#34d399" />
                        <text x={tCx - 4} y={tCy - 6} fill="#6ee7b7" fontSize="10" fontWeight="bold">C'</text>
                      </g>
                    );
                  })()}
                </svg>
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  <span className="text-indigo-400 font-bold">Kék = Eredeti △ABC</span> &bull;{' '}
                  <span className="text-emerald-400 font-bold">Zöld = Egybevágó △A'B'C'</span>.
                  A távolságok és a bezárt szögek minden mozgás során 100%-ban megmaradnak!
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* 1. Szakasz: Az egybevágóság mélyebb következményei */}
      <TheorySection
        id="egybevagosag-kovetkezmenyei"
        number={1}
        title="Az egybevágóság geometriai következményei"
        badge="ALAPELVEK"
        badgeColor="indigo"
      >
        <TheoryCard title="Minden megfelelő geometriai méret azonossága" color="indigo">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha két háromszög egybevágó (<MathText>{'\\Delta ABC \\cong \\Delta A\'B\'C\''}</MathText>), az nem csupán az oldalak és belső szögek 
            egyenlőségét jelenti. Az egybevágóság <strong>teljes izometria</strong>: a háromszöghöz rendelhető bármely szakasz, szög és metrika 
            szigorúan megegyezik a két alakzatban:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
              <span className="font-bold block mb-1">Oldalak &amp; Szögek:</span>
              a = a', b = b', c = c'<br />
              α = α', β = β', γ = γ'
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
              <span className="font-bold block mb-1">Magasságok:</span>
              m_a = m_a'<br />
              m_b = m_b'<br />
              m_c = m_c'
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
              <span className="font-bold block mb-1">Súly- &amp; Szögfelezők:</span>
              s_a = s_a', s_b = s_b'<br />
              f_α = f_α', f_β = f_β'
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
              <span className="font-bold block mb-1">Körök &amp; Terület:</span>
              r = r' (beírt kör)<br />
              R = R' (körülírt kör)<br />
              T = T' (terület)
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: Alaptételek bizonyítása egybevágósággal */}
      <TheorySection
        id="tetelek-bizonyitasa"
        number={2}
        title="Alapvető geometriai tételek bizonyítása egybevágósággal"
        badge="BIZONYÍTÁSOK"
        badgeColor="purple"
      >
        {/* 1. Tétel: Egyenlő szárú háromszög */}
        <TheoryCard title="1. Tétel: Egyenlő szárú háromszög alapon fekvő szögei és szimmetriája" color="purple">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Tétel:</strong> Ha egy háromszög két oldala egyenlő (egyenlő szárú háromszög: <MathText>{'AC = BC = b'}</MathText>), 
                akkor az alapon fekvő két szöge is egyenlő (<MathText>{'\\alpha = \\beta'}</MathText>). Továbbá az alaphoz tartozó 
                magasság felezi az alapot és a szárak bezárta szöget!
              </p>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1.5">
                <span className="font-bold text-purple-900 dark:text-purple-200 block">A bizonyítás lépései:</span>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Húzzuk meg a <MathText>{'C'}</MathText> csúcsból az <MathText>{'AB'}</MathText> alap <MathText>{'F'}</MathText> felezőpontjához a súlyvonalat (<MathText>{'CF'}</MathText>)!</li>
                  <li>Tekintsük a <MathText>{'\\Delta AFC'}</MathText> és <MathText>{'\\Delta BFC'}</MathText> háromszögeket!</li>
                  <li><MathText>{'AC = BC'}</MathText> (adott szárak), <MathText>{'AF = FB'}</MathText> (felezőpont), és <MathText>{'CF'}</MathText> közös oldal.</li>
                  <li>Az <strong>(o, o, o)</strong> alapeset miatt <MathText>{'\\Delta AFC \\cong \\Delta BFC'}</MathText>!</li>
                  <li>Mivel egybevágók, a megfelelő szögeik egyenlők: <MathText>{'\\sphericalangle A = \\sphericalangle B'}</MathText>, vagyis <MathText>{'\\alpha = \\beta'}</MathText>! Q.E.D.</li>
                </ol>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <IsoscelesTriangleSymmetrySvg size={300} />
            </div>
          </div>
        </TheoryCard>

        {/* 2. Tétel: Szakaszfelező merőleges */}
        <TheoryCard title="2. Tétel: A szakaszfelező merőleges pontjainak távolsága" color="indigo">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Tétel:</strong> Egy szakasz felezőmerőlegesének tetszőleges <MathText>{'P'}</MathText> pontja egyenlő távol van a szakasz két végpontjától (<MathText>{'PA = PB'}</MathText>).
              </p>
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 block">A bizonyítás lépései:</span>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Legyen <MathText>{'F'}</MathText> az <MathText>{'AB'}</MathText> szakasz felezőpontja, <MathText>{'e'}</MathText> a merőleges egyenes, és <MathText>{'P \\in e'}</MathText>.</li>
                  <li>Nézzük a <MathText>{'\\Delta AFP'}</MathText> és <MathText>{'\\Delta BFP'}</MathText> derékszögű háromszögeket!</li>
                  <li><MathText>{'AF = FB'}</MathText> (felezőpont), <MathText>{'\\sphericalangle AFP = \\sphericalangle BFP = 90^\\circ'}</MathText>, és <MathText>{'PF'}</MathText> közös befogó.</li>
                  <li>Az <strong>(o, sz, o)</strong> alapeset szerint a két háromszög egybevágó!</li>
                  <li>Következésképpen átfogóik is egyenlők: <MathText>{'PA = PB'}</MathText>.</li>
                </ol>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <PerpendicularBisectorProofSvg size={300} />
            </div>
          </div>
        </TheoryCard>

        {/* 3. Tétel: Paralelogramma átlói */}
        <TheoryCard title="3. Tétel: A paralelogramma átlói felezik egymást" color="violet">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Tétel:</strong> Bármely paralelogramma szemközti oldalai egyenlők, és átlói kölcsönösen felezik egymást.
              </p>
              <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 space-y-1.5">
                <span className="font-bold text-violet-900 dark:text-violet-200 block">A bizonyítás lépései:</span>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Mivel <MathText>{'AB \\parallel CD'}</MathText>, a váltószögek egyenlők: <MathText>{'\\sphericalangle OAB = \\sphericalangle OCD'}</MathText> és <MathText>{'\\sphericalangle OBA = \\sphericalangle ODC'}</MathText>.</li>
                  <li>Továbbá <MathText>{'AB = CD'}</MathText> (szemközti oldalak).</li>
                  <li>Az <strong>(sz, o, sz)</strong> alapeset miatt <MathText>{'\\Delta ABO \\cong \\Delta CDO'}</MathText>!</li>
                  <li>Ebből azonnal következik: <MathText>{'AO = OC'}</MathText> és <MathText>{'BO = OD'}</MathText>, tehát <MathText>{'O'}</MathText> mindkét átló felezőpontja!</li>
                </ol>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <ParallelogramDiagonalsSvg size={320} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Kidolgozott mintapéldák */}
      <TheorySection
        id="mintapeldak-bizonyitasok"
        number={3}
        title="Kidolgozott bizonyítási és számítási mintapéldák"
        badge="MINTAPÉLDÁK"
        badgeColor="indigo"
      >
        <TheoryCard title="Mintapélda: A rombusz átlóinak merőlegessége" color="indigo">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Bizonyítsuk be, hogy a rombusz átlói merőlegesek egymásra (<MathText>{'AC \\perp BD'}</MathText>)!
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Bizonyítás:</span>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>A rombusz olyan négyszög, amelynek minden oldala egyenlő: <MathText>{'AB = BC = CD = DA = a'}</MathText>.</li>
                <li>Jelölje az átlók metszéspontját <MathText>{'O'}</MathText>. Mivel a rombusz paralelogramma is, átlói felezik egymást: <MathText>{'AO = OC'}</MathText> és <MathText>{'BO = OD'}</MathText>.</li>
                <li>Tekintsük a szomszédos <MathText>{'\\Delta ABO'}</MathText> és <MathText>{'\\Delta CBO'}</MathText> háromszögeket!</li>
                <li>
                  Mindhárom oldaluk páronként egyenlő:
                  <ul className="list-disc list-inside ml-4 mt-1 font-mono text-xs">
                    <li><MathText>{'AB = BC = a'}</MathText></li>
                    <li><MathText>{'AO = OC'}</MathText> (átló feleződik)</li>
                    <li><MathText>{'BO'}</MathText> közös oldal</li>
                  </ul>
                </li>
                <li>Az <strong>(o, o, o)</strong> alapeset alapján <MathText>{'\\Delta ABO \\cong \\Delta CBO'}</MathText>!</li>
                <li>
                  Az egybevágóság miatt az <MathText>{'O'}</MathText>-nál lévő szögek egyenlők: <MathText>{'\\sphericalangle AOB = \\sphericalangle COB'}</MathText>.
                  Mivel ezek egymás melletti mellékszögek, összegük <MathText>{'180^\\circ'}</MathText>.
                </li>
                <li>
                  Két egyenlő szög, melyek összege <MathText>{'180^\\circ'}</MathText>, csak <MathText>{'90^\\circ'}</MathText> lehet:
                  <MathText>{'\\sphericalangle AOB = \\sphericalangle COB = 90^\\circ'}</MathText>!
                </li>
              </ol>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 font-bold text-xs">
                Következtetés: A rombusz átlói valóban merőlegesen metszik egymást!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Csapdák és tipikus hibák */}
      <TheorySection
        id="csapdak-egybevagosag"
        number={4}
        title="Tipikus buktatók az egybevágósági bizonyításoknál"
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="A csúcsok sorrendjének elrontása"
          trap="Ha △ABC és egy másik háromszög egybevágó, mindegy milyen sorrendben sorolom fel a csúcsokat."
          wrong="△ABC ≅ △B'A'C', ezért AC = A'C'."
          wrongExplanation="HIBA! A matematikai jelölésben a betűk sorrendje szigorúan a megfelelő csúcsokat jelöli! Ha △ABC ≅ △B'A'C', akkor az AC szakasz megfelelője a B'C', és NEM az A'C'!"
          correct="Mindig gondosan az egymásnak megfelelő csúcsokat írd egymás alá: ha A ↔ A', B ↔ B', C ↔ C', akkor △ABC ≅ △A'B'C'."
          correctExplanation="Ekkor az első két betű (AB) hossza egyenlő az első két betűvel (A'B'), az 1-3. betű (AC) az 1-3. betűvel (A'C')!"
          tip="Bizonyítások leírásakor mindig ellenőrizd le: a betűpárok valóban az egymásnak megfelelő egyenlő szakaszokat adják-e ki!"
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
