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
import {
  Compass,
  RotateCw,
  FlipHorizontal,
  MoveHorizontal,
  RefreshCw,
  Target,
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shapes,
  Maximize2,
  Calculator
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface CongruenceTransformTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CongruenceTransformTheory: React.FC<CongruenceTransformTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive coordinate reflection simulator
  const [pointX, setPointX] = useState<number>(3);
  const [pointY, setPointY] = useState<number>(2);
  const [activeMode, setActiveMode] = useState<'xAxis' | 'yAxis' | 'origin' | 'diagonal'>('xAxis');

  // Compute reflected coordinates
  let reflectedX = pointX;
  let reflectedY = pointY;
  let formulaDesc = '';
  let ruleText = '';

  if (activeMode === 'xAxis') {
    reflectedX = pointX;
    reflectedY = -pointY;
    formulaDesc = `P(${pointX}; ${pointY}) \\to P'(${reflectedX}; ${reflectedY})`;
    ruleText = 'x tengelyre tükrözve: az x koordináta változatlan, az y koordináta ellentettjére vált: (x; y) ↦ (x; -y)';
  } else if (activeMode === 'yAxis') {
    reflectedX = -pointX;
    reflectedY = pointY;
    formulaDesc = `P(${pointX}; ${pointY}) \\to P'(${reflectedX}; ${reflectedY})`;
    ruleText = 'y tengelyre tükrözve: az y koordináta változatlan, az x koordináta ellentettjére vált: (x; y) ↦ (-x; y)';
  } else if (activeMode === 'origin') {
    reflectedX = -pointX;
    reflectedY = -pointY;
    formulaDesc = `P(${pointX}; ${pointY}) \\to P'(${reflectedX}; ${reflectedY})`;
    ruleText = 'Origóra tükrözve: mindkét koordináta az ellentettjére változik: (x; y) ↦ (-x; -y)';
  } else if (activeMode === 'diagonal') {
    reflectedX = pointY;
    reflectedY = pointX;
    formulaDesc = `P(${pointX}; ${pointY}) \\to P'(${reflectedX}; ${reflectedY})`;
    ruleText = 'I. és III. negyed szögfelezőjére (y = x) tükrözve: a két koordináta felcserélődik: (x; y) ↦ (y; x)';
  }

  // Interactive quick self-check question
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  // SVG coordinate system mapping: grid [-5, 5] -> [20, 220]
  const svgCenter = 120;
  const svgScale = 18;
  const toSvgX = (x: number) => svgCenter + x * svgScale;
  const toSvgY = (y: number) => svgCenter - y * svgScale;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-geometria-egybevagosagi-transzformaciok"
      pdfFilename="8_osztaly_geometria_egybevagosagi_transzformaciok_tananyag.pdf"
      title="1. Egybevágósági transzformációk (ismétlés)"
      subtitle="A sík geometriai transzformációi, távolságtartás, körüljárási irány, tükrözések a koordináta-rendszerben és a háromszögek egybevágósági alapesetei"
      quickRule={{
        label: "Egybevágósági transzformáció lényege",
        formula: "|A'B'| = |AB|  (távolságtartó: bármely két pont képtávolsága megegyezik az eredeti távolságukkal)"
      }}
      themeColor="emerald"
    >
      {/* 1. SZEKCIÓ: A GEOMETRIAI TRANSZFORMÁCIÓ ÉS AZ EGYBEVÁGÓSÁG */}
      <TheorySection
        id="geom-transzformacio-alapok"
        title="1. A geometriai transzformáció és az egybevágóság fogalma"
        icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Geometriai transzformáció"
            badge="Alapfogalom"
            color="emerald"
            icon={<Target className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              A sík pontjaihoz a sík pontjait rendeljük hozzá egyértelmű utasítás szerint.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">•</span>
                <span>
                  <strong>Őspont és képpont:</strong> A kiinduló pont a <MathText text="$P$" /> (ős), a hozzárendelt pont pedig a <MathText text="$P'$" /> (kép).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">•</span>
                <span>
                  <strong>Megfordíthatóság:</strong> Ha minden képponthoz pontosan egyetlen eredeti pont tartozik (kölcsönösen egyértelmű leképezés), akkor a hozzárendelést <strong>geometriai transzformációnak</strong> nevezzük.
                </span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Egybevágósági transzformáció (Izometria)"
            badge="Fő tulajdonság"
            color="teal"
            icon={<Shapes className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Olyan geometriai transzformáció, amely <strong>távolságtartó</strong>:
            </p>
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center font-mono font-bold text-sm text-teal-800 dark:text-teal-200 mb-2">
              |A'B'| = |AB|
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Két síkidom akkor <strong>egybevágó</strong> (<MathText text="$A \cong B$" />), ha létezik olyan egybevágósági transzformáció, amely az egyiket a másikba viszi (egymásra fektetve tökéletesen fedik egymást).
            </p>
          </TheoryCard>
        </div>

        {/* Invariáns tulajdonságok */}
        <TheoryCard
          title="Invariáns (változatlanul maradó) tulajdonságok"
          badge="Alaptulajdonságok"
          color="emerald"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">📏 Távolságtartó</span>
              <p className="text-slate-600 dark:text-slate-400">Minden szakasz hossza megegyezik a képe hosszával (<MathText text="$A'B' = AB$" />).</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">📐 Szögtartó</span>
              <p className="text-slate-600 dark:text-slate-400">Bármely szög nagysága egyenlő a képszög nagyságával (<MathText text="$\alpha' = \alpha$" />).</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">➖ Egyenestartó</span>
              <p className="text-slate-600 dark:text-slate-400">Egyenes képe mindig egyenes, szakasz képe szakasz.</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">═ Párhuzamosságtartó</span>
              <p className="text-slate-600 dark:text-slate-400">Párhuzamos egyenesek képei is párhuzamosak (<MathText text="$e \parallel f \implies e' \parallel f'$" />).</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">⬛ Területtartó</span>
              <p className="text-slate-600 dark:text-slate-400">Bármely sokszög vagy zárt síkidom területe változatlan (<MathText text="$T' = T$" />).</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">⭕ Alaktartó</span>
              <p className="text-slate-600 dark:text-slate-400">Kör képe azonos sugarú kör, négyszög képe vele egybevágó négyszög.</p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A 4 ALAPVETŐ TRANSZFORMÁCIÓ ÖSSZEHASONLÍTÁSA */}
      <TheorySection
        id="negy-alapveto-transzformacio"
        title="2. A négy alapvető egybevágósági transzformáció"
        icon={<RefreshCw className="w-5 h-5 text-teal-600" />}
      >
        <TheoryTable
          title="A négy síkbeli egybevágóság összehasonlító táblázata"
          subtitle="Megadási adatok, fixpontok és orientáció (körüljárási irány)"
          headers={['Transzformáció', 'Megadáshoz szükséges', 'Fixpontok száma (P = P\')', 'Körüljárási irány']}
          rows={[
            [
              'Tengelyes tükrözés',
              'Tükörtengely (t egyenes)',
              'Végtelen sok (a t tengely minden pontja)',
              'MEGFORDUL (indirekt: óramutatóval ellentétesre vált)'
            ],
            [
              'Középpontos tükrözés',
              'Tükörközéppont (K vagy O pont)',
              'Pontosan 1 (maga a K pont)',
              'MEGMARAD (direkt / irányítástartó)'
            ],
            [
              'Párhuzamos eltolás',
              'Eltolásvektor (v⃗)',
              '0 (ha v⃗ ≠ 0⃗)',
              'MEGMARAD (direkt / irányítástartó)'
            ],
            [
              'Elforgatás (forgatás)',
              'Forgáscentrum (O) és szög (α)',
              'Pontosan 1 (az O centrum, ha α ≠ k · 360°)',
              'MEGMARAD (direkt / irányítástartó)'
            ]
          ]}
        />

        <TheoryCallout
          type="important"
          title="Kiemelten fontos vizsga- és felvételi tény!"
        >
          <p className="text-sm">
            A sík alapvető egybevágóságai közül <strong>kizárólag a tengelyes tükrözés fordítja meg az alakzatok körüljárási irányát</strong> (orientációváltó). A középpontos tükrözés, a párhuzamos eltolás és az elforgatás mind <strong>irányítástartóak</strong>!
          </p>
        </TheoryCallout>

        <TheoryTrapBox
          title="Gyakori hiba: Fixpont vs. Fixegyenes"
          explanation="Gyakori tévedés, hogy a középpontos tükrözésnek nincs fixegyenese. Valójában minden egyenes, amely áthalad a tükrözés K középpontján, önmagába képeződik le (fixegyenes), bár a K pont kivételével a pontjai helyet cserélnek (nem pontonként fix)."
          correction="Fixpont: a pont képe önmaga (P' = P). Fixegyenes: az egyenes képe önmaga (e' = e), de a pontjai elmozdulhatnak az egyenesen belül."
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: TÜKRÖZÉSEK A KOORDINÁTA-RENDSZERBEN */}
      <TheorySection
        id="koordinata-transzformaciok"
        title="3. Tükrözések a koordináta-rendszerben (8. osztályos szabályok)"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/30">
            <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">
              x tengelyre tükrözés
            </div>
            <div className="font-mono text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">
              (x; y) ↦ (x; -y)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az <MathText text="$x$" /> koordináta változatlan, az <MathText text="$y$" /> az ellentettjére vált.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/30">
            <div className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wide mb-1">
              y tengelyre tükrözés
            </div>
            <div className="font-mono text-sm font-bold text-teal-900 dark:text-teal-100 mb-2">
              (x; y) ↦ (-x; y)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az <MathText text="$y$" /> koordináta változatlan, az <MathText text="$x$" /> az ellentettjére vált.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-1">
              Origóra tükrözés (O(0;0))
            </div>
            <div className="font-mono text-sm font-bold text-emerald-900 dark:text-emerald-100 mb-2">
              (x; y) ↦ (-x; -y)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mindkét koordináta az ellentettjére vált (egyenértékű egy 180°-os forgatással).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/70 dark:bg-purple-950/30">
            <div className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wide mb-1">
              y = x szögfelezőre
            </div>
            <div className="font-mono text-sm font-bold text-purple-900 dark:text-purple-100 mb-2">
              (x; y) ↦ (y; x)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az I. és III. negyed szögfelezőjére tükrözve a két koordináta helyet cserél.
            </p>
          </div>
        </div>

        {/* INTERAKTÍV LABOR */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Interaktív Koordináta-tükröző Labor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Változtasd meg a pont koordinátáit és a tükrözés típusát, majd figyeld a képpont mozgását!
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant={activeMode === 'xAxis' ? 'default' : 'outline'}
                className={activeMode === 'xAxis' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                onClick={() => setActiveMode('xAxis')}
              >
                x tengely
              </Button>
              <Button
                size="sm"
                variant={activeMode === 'yAxis' ? 'default' : 'outline'}
                className={activeMode === 'yAxis' ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
                onClick={() => setActiveMode('yAxis')}
              >
                y tengely
              </Button>
              <Button
                size="sm"
                variant={activeMode === 'origin' ? 'default' : 'outline'}
                className={activeMode === 'origin' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
                onClick={() => setActiveMode('origin')}
              >
                Origó (O)
              </Button>
              <Button
                size="sm"
                variant={activeMode === 'diagonal' ? 'default' : 'outline'}
                className={activeMode === 'diagonal' ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}
                onClick={() => setActiveMode('diagonal')}
              >
                y = x egyenes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-2 shadow-inner">
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  {/* Rácsvonalak */}
                  {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
                    <React.Fragment key={i}>
                      <line
                        x1={toSvgX(i)}
                        y1="20"
                        x2={toSvgX(i)}
                        y2="220"
                        stroke="currentColor"
                        strokeOpacity="0.08"
                        strokeWidth="1"
                      />
                      <line
                        x1="20"
                        y1={toSvgY(i)}
                        x2="220"
                        y2={toSvgY(i)}
                        stroke="currentColor"
                        strokeOpacity="0.08"
                        strokeWidth="1"
                      />
                    </React.Fragment>
                  ))}

                  {/* Tengelyek */}
                  <line x1="15" y1="120" x2="225" y2="120" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                  <line x1="120" y1="225" x2="120" y2="15" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                  <polygon points="225,120 218,117 218,123" className="fill-slate-500" />
                  <polygon points="120,15 117,22 123,22" className="fill-slate-500" />
                  <text x="225" y="134" className="text-[9px] fill-slate-500 font-bold">x</text>
                  <text x="108" y="20" className="text-[9px] fill-slate-500 font-bold">y</text>

                  {/* Kiemelt tükrözési objektum */}
                  {activeMode === 'xAxis' && (
                    <line x1="20" y1="120" x2="220" y2="120" className="stroke-blue-500 stroke-[2.5]" />
                  )}
                  {activeMode === 'yAxis' && (
                    <line x1="120" y1="20" x2="120" y2="220" className="stroke-teal-500 stroke-[2.5]" />
                  )}
                  {activeMode === 'origin' && (
                    <circle cx="120" cy="120" r="5" className="fill-emerald-600" />
                  )}
                  {activeMode === 'diagonal' && (
                    <line x1="25" y1="215" x2="215" y2="25" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
                  )}

                  {/* Összekötő szakasz a pont és kép között */}
                  <line
                    x1={toSvgX(pointX)}
                    y1={toSvgY(pointY)}
                    x2={toSvgX(reflectedX)}
                    y2={toSvgY(reflectedY)}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />

                  {/* Eredeti P pont */}
                  <circle cx={toSvgX(pointX)} cy={toSvgY(pointY)} r="5.5" className="fill-indigo-600 stroke-white stroke-2" />
                  <text
                    x={toSvgX(pointX) + 7}
                    y={toSvgY(pointY) - 6}
                    className="text-[10px] font-bold fill-indigo-700 dark:fill-indigo-300"
                  >
                    P({pointX}; {pointY})
                  </text>

                  {/* Képpont P' */}
                  <circle cx={toSvgX(reflectedX)} cy={toSvgY(reflectedY)} r="5.5" className="fill-rose-600 stroke-white stroke-2" />
                  <text
                    x={toSvgX(reflectedX) + 7}
                    y={toSvgY(reflectedY) - 6}
                    className="text-[10px] font-bold fill-rose-700 dark:fill-rose-300"
                  >
                    P'({reflectedX}; {reflectedY})
                  </text>
                </svg>
              </div>
            </div>

            {/* Kezelőszervek és leírás */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block mb-1">P pont koordinátáinak beállítása:</span>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      X érték: {pointX}
                    </label>
                    <input
                      type="range"
                      min="-4"
                      max="4"
                      value={pointX}
                      onChange={(e) => setPointX(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Y érték: {pointY}
                    </label>
                    <input
                      type="range"
                      min="-4"
                      max="4"
                      value={pointY}
                      onChange={(e) => setPointY(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-1">Eredmény és leképezés:</span>
                <div className="font-mono text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                  <MathText text={`$${formulaDesc}$`} />
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {ruleText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: ALAKZATOK ELŐÁLLÍTÁSA TÜKRÖZÉSSEL (TANKÖNYVI GYAKORLAT) */}
      <TheorySection
        id="alakzatok-eloallitasa"
        title="4. Konstrukciók: Alakzatok előállítása tükrözéssel (Munkafüzet feladatai)"
        icon={<Compass className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="Háromszögből deltoid készítése"
            badge="Tengelyes tükrözés"
            variant="emerald"
            figure={
              <svg viewBox="0 0 160 105" className="w-full max-w-[220px] h-28">
                {/* Tükörtengely (BC oldal) */}
                <line x1="15" y1="50" x2="145" y2="50" stroke="#10b981" strokeWidth="2" />
                <text x="146" y="53" className="text-[9px] font-bold fill-emerald-600 font-sans">t</text>
                
                {/* Eredeti háromszög ABC */}
                <polygon points="40,50 120,50 70,15" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="2" />
                {/* Tükrözött háromszög A'BC */}
                <polygon points="40,50 120,50 70,85" fill="#0d9488" fillOpacity="0.25" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
                
                {/* Csúcsok */}
                <circle cx="70" cy="15" r="3.5" className="fill-emerald-600" />
                <circle cx="70" cy="85" r="3.5" className="fill-teal-600" />
                <circle cx="40" cy="50" r="3" className="fill-slate-700" />
                <circle cx="120" cy="50" r="3" className="fill-slate-700" />
                <text x="68" y="10" className="text-[9px] font-bold fill-emerald-800 font-sans">A</text>
                <text x="68" y="98" className="text-[9px] font-bold fill-teal-800 font-sans">A'</text>
                <text x="25" y="53" className="text-[9px] font-bold fill-slate-800 font-sans">B</text>
                <text x="125" y="53" className="text-[9px] font-bold fill-slate-800 font-sans">C</text>
              </svg>
            }
            properties={[
              'Ha egy tetszőleges ABC háromszöget tükrözünk a BC oldalának egyenesére, akkor az ABA\'C négyszög deltoid lesz.',
              'Indoklás: AB = A\'B és AC = A\'C a tengelyes tükrözés távolságtartása miatt (két pár szomszédos egyenlő oldal).',
              'Speciális eset: Ha az eredeti háromszög derékszögű, a kapott négyszög téglalap vagy négyzet is lehet.'
            ]}
          />

          <GeometryFigureCard
            title="Háromszögből paralelogramma készítése"
            badge="Középpontos tükrözés"
            variant="teal"
            figure={
              <svg viewBox="0 0 160 145" className="w-full max-w-[220px] h-32">
                {/* Átlók (BC és AA') */}
                <line x1="30" y1="75" x2="110" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="80" y1="25" x2="60" y2="125" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

                {/* Eredeti háromszög ABC */}
                <polygon points="30,75 110,75 80,25" fill="#0d9488" fillOpacity="0.25" stroke="#0d9488" strokeWidth="2" />
                {/* Képpont A' és a tükrözött háromszög A'CB */}
                <polygon points="110,75 30,75 60,125" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
                
                {/* Felezőpont F */}
                <circle cx="70" cy="75" r="3.5" className="fill-rose-600" />
                <text x="67" y="69" className="text-[9px] font-bold fill-rose-600 font-sans">F</text>
                
                {/* Csúcsok */}
                <circle cx="80" cy="25" r="3.5" className="fill-teal-700" />
                <circle cx="60" cy="125" r="3.5" className="fill-sky-700" />
                <circle cx="30" cy="75" r="3" className="fill-slate-700" />
                <circle cx="110" cy="75" r="3" className="fill-slate-700" />
                <text x="82" y="20" className="text-[9px] font-bold fill-teal-800 font-sans">A</text>
                <text x="62" y="139" className="text-[9px] font-bold fill-sky-800 font-sans">A'</text>
                <text x="18" y="78" className="text-[9px] font-bold fill-slate-800 font-sans">B</text>
                <text x="114" y="78" className="text-[9px] font-bold fill-slate-800 font-sans">C</text>
              </svg>
            }
            properties={[
              'Ha egy ABC háromszöget tükrözünk a BC oldalának F felezőpontjára, az ABA\'C négyszög paralelogramma lesz.',
              'Indoklás: a középpontos tükrözés miatt az átlók felezik egymást (BC közös felezőpontja F, és AA\' szakaszt is felezi F).',
              'Szemközti oldalai páronként egyenlő hosszúak és párhuzamosak: AB ∥ A\'C és AC ∥ A\'B.'
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: HÁROMSZÖGEK EGYBEVÁGÓSÁGI ESETEI */}
      <TheorySection
        id="haromszogek-egybevagosaga"
        title="5. Háromszögek egybevágóságának alapesetei"
        icon={<Shapes className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
          Két háromszög egybevágó (<MathText text="$\triangle ABC \cong \triangle A'B'C'$" />), ha mind a három oldaluk és mind a három szögük páronként megegyezik. Az egybevágóság igazolásához elegendő a 4 alapeset valamelyikét ellenőrizni:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <TheoryCard title="1. o - o - o eset" badge="Oldal-Oldal-Oldal" color="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Két háromszög egybevágó, ha <strong>három-három oldaluk</strong> páronként egyenlő hosszú:
            </p>
            <div className="mt-2 text-center font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">
              a = a',  b = b',  c = c'
            </div>
          </TheoryCard>

          <TheoryCard title="2. o - sz - o eset" badge="Oldal-Szög-Oldal" color="teal">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Két-két oldaluk és a <strong>közbezárt szögük</strong> egyenlő:
            </p>
            <div className="mt-2 text-center font-mono font-bold text-xs text-teal-800 dark:text-teal-300">
              a = a',  b = b',  γ = γ'
            </div>
          </TheoryCard>

          <TheoryCard title="3. sz - o - sz eset" badge="Szög-Oldal-Szög" color="cyan">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy-egy oldaluk és a rajtuk fekvő <strong>két szögük</strong> egyenlő:
            </p>
            <div className="mt-2 text-center font-mono font-bold text-xs text-cyan-800 dark:text-cyan-300">
              c = c',  α = α',  β = β'
            </div>
          </TheoryCard>

          <TheoryCard title="4. d - o - o eset" badge="Nagyobbikkal szemközti" color="indigo">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Két-két oldaluk és a <strong>nagyobbik oldallal szemközti szögük</strong> egyenlő:
            </p>
            <div className="mt-2 text-center font-mono font-bold text-xs text-indigo-800 dark:text-indigo-300">
              a = a',  b = b' (a &gt; b),  α = α'
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Vigyázat: a sz-sz-sz nem egybevágóság!"
          explanation="Ha két háromszög mindhárom szöge megegyezik (sz-sz-sz), abból még NEM következik, hogy egybevágók! Lehet, hogy csak hasonlóak (például egy kis egyenlő oldalú háromszög és egy hatalmas egyenlő oldalú háromszög minden szöge 60°, de nem egybevágók)."
          correction="Egybevágósághoz legalább egy oldal hosszának egyenlőségére mindig szükség van!"
        />
      </TheorySection>

      {/* 6. SZEKCIÓ: KIDOLGOZOTT TANKÖNYVI PÉLDÁK */}
      <TheorySection
        id="kidolgozott-peldak"
        title="6. Lépésről lépésre kidolgozott tankönyvi példák"
        icon={<HelpCircle className="w-5 h-5 text-emerald-600" />}
      >
        {/* 1. Példa */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-700 dark:text-emerald-300">
              1. Mintapélda (Tankönyv 51. o.): Koordináta-tükrözés
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-600">
              OH-MAT08TA
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            <strong>Feladat:</strong> Adott a háromszög három csúcsa: <MathText text="$A(2; -3), B(4; 3), C(-5; 0)$" />. Határozzuk meg a csúcsok képét, ha tükrözzük őket az origóra (<MathText text="$O(0;0)$" />)!
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg text-xs space-y-1.5 font-mono text-slate-800 dark:text-slate-200">
            <div>• A(2; -3) tükörképe az origóra: Mindkét koordináta előjele ellentettjére vált ➔ <strong>A'(-2; 3)</strong></div>
            <div>• B(4; 3) tükörképe az origóra: <strong>B'(-4; -3)</strong></div>
            <div>• C(-5; 0) tükörképe az origóra: A -5 ellentettje +5, a 0 ellentettje 0 ➔ <strong>C'(5; 0)</strong></div>
          </div>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            Ellenőrzés: A képháromszög területe és oldalhosszai pontosan megegyeznek az eredeti háromszögével, mert a pontra tükrözés egybevágósági transzformáció.
          </p>
        </div>

        {/* 2. Példa */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-teal-700 dark:text-teal-300">
              2. Mintapélda (Munkafüzet 31. o. / 4. feladat): Tükrözés és sokszögforma
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-600">
              OH-MAT08MA
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            <strong>Feladat:</strong> Egy derékszögű háromszög befogói 6 cm és 8 cm hosszúak. Milyen négyszöget kapunk, ha a háromszöget tükrözzük az átfogójára?
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <p><strong>Megoldás lépései:</strong></p>
            <p>1. Az átfogóra vett tengelyes tükrözésnél az átfogó két végpontja a tükörtengelyen fekszik, ezért <strong>helyben maradnak (fixpontok)</strong>.</p>
            <p>2. A derékszögű csúcs átkerül a túloldalra. A két befogó képe szintén 6 cm és 8 cm hosszú lesz a távolságtartás miatt.</p>
            <p>3. A kapott négyszög szomszédos oldalai 6 cm és 6 cm, illetve 8 cm és 8 cm. Mivel két pár egyenlő szomszédos oldala van, az alakzat egy <strong>deltoid</strong>!</p>
          </div>
        </div>

        {/* Gyors önellenőrzés */}
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
          <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Gyors önellenőrző kérdés:
          </h4>
          <p className="text-xs text-slate-800 dark:text-slate-200">
            Adott a <MathText text="$P(-4; 7)$" /> pont. Mik lesznek a koordinátái az <MathText text="$x$" /> tengelyre vett tükrözés után?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 0, text: 'P\'(4; 7)', correct: false },
              { id: 1, text: 'P\'(-4; -7)', correct: true },
              { id: 2, text: 'P\'(4; -7)', correct: false },
              { id: 3, text: 'P\'(7; -4)', correct: false }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelfTestAnswer(option.id);
                  setSelfTestSubmitted(true);
                }}
                className={`p-2.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                  selfTestAnswer === option.id
                    ? option.correct
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                      : 'bg-rose-600 text-white border-rose-700 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {selfTestSubmitted && (
            <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
              selfTestAnswer === 1
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
            }`}>
              {selfTestAnswer === 1 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Helyes válasz! Az x tengelyre tükrözve az x változatlan marad (-4), az y pedig az ellentettjére vált (-7).</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Nem jó. Emlékezz: az x tengelyre tükrözésnél az x koordináta nem változik, csak az y koordináta vesz fel ellentett előjelet: P'(-4; -7).</span>
                </>
              )}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CongruenceTransformTheory;
