import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  CentralSymmetrySvg,
  RotationAngleSvg,
  RotationalSymmetryShapesSvg,
  CoordinateRotationSvg
} from './RotationFigures';
import {
  Repeat,
  Compass,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCw,
  Maximize2,
  Sliders,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RotationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RotationTheory: React.FC<RotationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV FORGATÁSI LABOR ÁLLAPOTOK ---
  const [angle, setAngle] = useState<number>(90);
  const [selectedShape, setSelectedShape] = useState<'triangle' | 'square' | 'parallelogram' | 'hexagon'>('square');

  // Ellenőrizzük, hogy a kiválasztott alakzat és forgásszög szimmetria-szög-e
  const isSymmetry = useMemo(() => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    if (normalizedAngle === 0) return true;

    switch (selectedShape) {
      case 'triangle': // szabályos háromszög: 120°, 240°
        return normalizedAngle === 120 || normalizedAngle === 240;
      case 'square': // négyzet: 90°, 180°, 270°
        return normalizedAngle % 90 === 0;
      case 'parallelogram': // paralelogramma: 180°
        return normalizedAngle === 180;
      case 'hexagon': // szabályos hatszög: 60°, 120°, 180°, 240°, 300°
        return normalizedAngle % 60 === 0;
      default:
        return false;
    }
  }, [angle, selectedShape]);

  // Számított koordináta példa egy P(3, 2) pont elforgatásához
  const coordSample = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const x0 = 3;
    const y0 = 2;
    const xRot = Math.round(x0 * Math.cos(rad) - y0 * Math.sin(rad));
    const yRot = Math.round(x0 * Math.sin(rad) + y0 * Math.cos(rad));
    return { x0, y0, xRot, yRot };
  }, [angle]);

  return (
    <TheoryTemplate
      title="1. Forgatás és középpontos tükrözés"
      subtitle="Középpontos tükrözés mint 180°-os forgatás, tetszőleges szögű elforgatás és alakzatok forgásszimmetriája 9. osztályban"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 1. FORGATÁS ÉS KÖZÉPPONTOS TÜKRÖZÉS"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a forgatások feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Középpontos tükrözés = 180°-os elforgatás",
        formula: "Egyenes képe párhuzamos egyenes • |OP| = |OP'| • Megőrzi a körüljárási irányt",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: KÖZÉPPONTOS TÜKRÖZÉS
      ========================================================================= */}
      <TheorySection
        title="1. A középpontos tükrözés (pontra vonatkozó tükrözés)"
        icon={<Repeat className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Definíció és szerkesztési lépések"
          icon={<Compass className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Legyen a síkon rögzítve egy $O$ pont, amelyet a <strong>tükrözés középpontjának</strong> nevezünk. A sík bármely $P$ pontjához hozzárendelünk egy $P'$ pontot az alábbi szabály szerint:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <CentralSymmetrySvg size={300} />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900">
                <span className="font-bold text-red-800 dark:text-red-300">Ha P = O:</span> A középpont képe önmaga ($O' = O$). Ez a transzformáció <strong>egyetlen fixpontja</strong>!
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-800 dark:text-blue-300">Ha P ≠ O:</span> A képpont ($P'$) az $OP$ egyenes azon pontja a túloldalon, amelyre:
                <div className="font-mono font-bold text-center text-blue-900 dark:text-blue-200 mt-1">|OP| = |OP'|</div>
                Vagyis az $O$ pont felezi a $PP'$ szakaszt!
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Körüljárási irány:</span> A középpontos tükrözés <strong>megőrzi</strong> a körüljárási irányt (nem fordítja meg, ellentétben a tengelyes tükrözéssel)!
              </div>
            </div>
          </div>

          <TheoryCallout
            title="Középpontos tükrözés tulajdonságai"
            variant="info"
            icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
          >
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mt-1">
              <li><strong>Távolságtartó:</strong> Bármely két pont távolsága megegyezik képeik távolságával (|A'B'| = |AB|). Ezért egybevágósági transzformáció.</li>
              <li><strong>Szögtartó:</strong> Bármely szög nagysága megegyezik képének nagyságával (∠A'B'C' = ∠ABC).</li>
              <li><strong>Egyenestartó:</strong> Egyenes képe mindig egyenes.</li>
              <li><strong>Párhuzamosságtartó kulcstulajdonság:</strong> Egyenes képe mindig <em>vele párhuzamos</em> egyenes (e' || e). Ha az egyenes átmegy az <em>O</em> középponton, akkor a képe önmaga (fixegyenes, de nem pontonként fix!).</li>
            </ul>
          </TheoryCallout>
        </TheoryCard>

        <TheoryCard
          title="Középpontos tükrözés a koordináta-rendszerben"
          icon={<Maximize2 className="w-5 h-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-2">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <CoordinateRotationSvg size={280} />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white">Origóra vonatkozó tükrözés:</span>
                <p className="mt-1">
                  Ha a középpont az $O(0, 0)$ origó, akkor mindkét koordináta az ellentettjére változik:
                </p>
                <div className="font-mono font-bold text-blue-600 text-center text-base my-1">
                  (x; y) ↦ (−x; −y)
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200">Tetszőleges C(x₀; y₀) középpontra:</span>
                <p className="mt-1 text-xs">
                  Mivel $C$ a $PP'$ szakasz felezőpontja, ezért:
                </p>
                <div className="font-mono font-bold text-amber-800 dark:text-amber-300 text-center text-xs mt-1">
                  x' = 2x₀ − x, &nbsp;&nbsp; y' = 2y₀ − y
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: FORGATÁS (PONT KÖRÜLI ELFORGATÁS)
      ========================================================================= */}
      <TheorySection
        title="2. Pont körüli elforgatás (Forgatás)"
        icon={<Compass className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="A forgatás meghatározó adatai és tulajdonságai"
          icon={<RotateCw className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A sík egy forgatását egyértelműen meghatározza <strong>három adat</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <RotationAngleSvg size={290} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-900">
                <strong>1. O forgási középpont:</strong> A pont, amely körül a síkot elfordítjuk. Ez az egyetlen pont, amely a helyén marad (egyetlen fixpont, ha α ≠ k · 360°).
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900">
                <strong>2. α forgásszög:</strong> A szög nagysága, amellyel minden <em>OP</em> szakaszt elfordítunk: |OP| = |OP'| és ∠POP' = α.
              </div>
              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-900">
                <strong>3. Körüljárási irány (forgásirány):</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Pozitív forgásirány (+):</strong> Óramutató járásával <em>ellentétes</em>.</li>
                  <li><strong>Negatív forgásirány (−):</strong> Óramutató járásával <em>megegyező</em>.</li>
                </ul>
              </div>
            </div>
          </div>

          <TheoryTable
            headers={['Forgatás szöge (Origó körül)', 'Képpont szabály', 'Példa: P(4; 1) képe']}
            rows={[
              ['+90° (óramutatóval ellentétes)', '(x; y) ↦ (−y; x)', 'P\'(−1; 4)'],
              ['180° (középpontos tükrözés)', '(x; y) ↦ (−x; −y)', 'P\'(−4; −1)'],
              ['+270° vagy −90° (óramutatóval megegyező)', '(x; y) ↦ (y; −x)', 'P\'(1; −4)'],
              ['360° (vagy 0° - identitás)', '(x; y) ↦ (x; y)', 'P\'(4; 1)']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: FORGÁSSZIMMETRIA ÉS KÖZÉPPONTOSAN SZIMMETRIKUS ALAKZATOK
      ========================================================================= */}
      <TheorySection
        title="3. Forgásszimmetria és Középpontos Szimmetria"
        icon={<Sparkles className="w-6 h-6 text-amber-600" />}
      >
        <TheoryCard
          title="Mikor forgásszimmetrikus vagy középpontosan szimmetrikus egy alakzat?"
          icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy síkidom <strong>forgásszimmetrikus</strong>, ha létezik olyan 0° &lt; α &lt; 360° szög, amellyel egy adott <em>O</em> pont körül elforgatva az alakzat <em>önmagába megy át</em>.
          </p>

          <div className="flex justify-center my-4">
            <RotationalSymmetryShapesSvg size={440} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs md:text-sm">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Középpontosan szimmetrikus alakzatok (α = 180°)
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Azok az alakzatok, amelyek <strong>180°-os elforgatással</strong> önmagukba mennek át:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200">
                <li>Szakasz (a felezőpontjára nézve)</li>
                <li>Minden paralelogramma (és így a téglalap, rombusz, négyzet is!)</li>
                <li>Minden páros oldalszámú szabályos sokszög (hatszög, nyolcszög)</li>
                <li>Kör (a középpontjára nézve)</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 space-y-2">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                NEM középpontosan szimmetrikus alakzatok
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Ezek az alakzatok 180°-os elforgatással <strong>nem</strong> mennek át önmagukba:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200">
                <li>Háromszögek: Általános, derékszögű, egyenlő szárú és még a <strong>szabályos háromszög sem</strong>!</li>
                <li>Trapézok: Általános és még az egyenlő szárú (húr-) trapéz sem!</li>
                <li>Deltoid (ha nem rombusz)</li>
                <li>Páratlan oldalszámú szabályos sokszögek (szabályos 5-szög, 7-szög)</li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        {/* CSAPDÁK ÉS TÉVHITEK */}
        <TheoryTrapBox
          title="Típushibák és érettségi buktatók a forgatásoknál"
          traps={[
            {
              trap: "A szabályos háromszög középpontosan szimmetrikus, mert olyan szabályos.",
              correction: "NEM! A szabályos háromszögnek 120°-os és 240°-os forgásszimmetriája van (3-adrendű), de 180°-os forgatással csúcsa lefelé állna, így NINCS középponti szimmetriája!"
            },
            {
              trap: "A középpontos tükrözés megfordítja a körüljárási irányt, mint a tükör.",
              correction: "NEM! A síkbeli tükör (tengelyes tükrözés) megfordítja, de a középpontos tükrözés MEGGŐRZI a körüljárási irányt, hiszen egy 180°-os forgatásnak felel meg a síkban!"
            },
            {
              trap: "Egyenes középpontos tükörképe merőleges az eredeti egyenesre.",
              correction: "NEM! Egyenes középpontos tükörképe MINDIG PÁRHUZAMOS az eredeti egyenessel (vagy önmaga, ha átmegy a tükrözés középpontján)!"
            },
            {
              trap: "A pozitív forgásirány az óramutató járásával egyező irány.",
              correction: "A matematikában a pozitív körüljárási és forgási irány a trigonometriai irány: az ÓRAMUTATÓ JÁRÁSÁVAL ELLENTÉTES!"
            }
          ]}
        />
      </TheorySection>

      {/* =========================================================================
          4. RÉSZ: INTERAKTÍV LABOR: FORGATÁS ÉS SZIMMETRIA SZIMULÁTOR
      ========================================================================= */}
      <TheorySection
        title="4. Interaktív Labor: Forgatás és Forgásszimmetria Vizsgáló"
        icon={<Sliders className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Kísérletezz a forgásszöggel és figyeld a fedéseket!"
          icon={<Compass className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Most, hogy megismerted az elméletet, próbáld ki a gyakorlatban is a forgatásokat! Állítsd be a forgásszöget, vagy válassz az előre megadott nevezetes szögek közül! Figyeld meg, mely szögeknél fedi le az elforgatott alakzat pontosan az eredetit (forgásszimmetria)!
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            {/* Alakzat választó */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Alakzat:</span>
              <Button
                variant={selectedShape === 'triangle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedShape('triangle')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Szabályos 3-szög (120°)
              </Button>
              <Button
                variant={selectedShape === 'square' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedShape('square')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Négyzet (90°)
              </Button>
              <Button
                variant={selectedShape === 'parallelogram' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedShape('parallelogram')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Paralelogramma (180°)
              </Button>
              <Button
                variant={selectedShape === 'hexagon' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedShape('hexagon')}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Szabályos 6-szög (60°)
              </Button>
            </div>

            {/* Szög csúszka és gyorsgombok */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-blue-600" />
                  Forgásszög (α): <span className="font-mono text-blue-600 text-base">{angle}°</span>
                </span>
                {isSymmetry ? (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Önmagába megy át! (Szimmetria)
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    Nem szimmetria-állás
                  </span>
                )}
              </div>

              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-slate-500 self-center mr-1">Gyors szögek:</span>
                {[0, 60, 90, 120, 180, 240, 270, 360].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setAngle(deg)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-all ${
                      angle === deg
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            {/* Vizuális SVG szemléltetés */}
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 pt-2">
              <div className="relative w-64 h-64 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
                {/* Forgási középpont */}
                <div className="absolute w-3 h-3 bg-red-500 rounded-full z-20 shadow-md"></div>
                <span className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-400">O (0, 0)</span>

                {/* Eredeti alakzat (halvány szürke referenciaként) */}
                <div className="opacity-30 absolute pointer-events-none">
                  {selectedShape === 'triangle' && (
                    <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[78px] border-b-blue-600" />
                  )}
                  {selectedShape === 'square' && (
                    <div className="w-24 h-24 border-2 border-slate-800 bg-slate-200" />
                  )}
                  {selectedShape === 'parallelogram' && (
                    <div className="w-28 h-16 border-2 border-slate-800 bg-slate-200 skew-x-[25deg]" />
                  )}
                  {selectedShape === 'hexagon' && (
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-400" />
                  )}
                </div>

                {/* Elforgatott alakzat */}
                <div
                  className="transition-transform duration-300 flex items-center justify-center"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  {selectedShape === 'triangle' && (
                    <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[78px] border-b-blue-600 shadow-md" />
                  )}
                  {selectedShape === 'square' && (
                    <div className="w-24 h-24 bg-emerald-500/80 border-2 border-emerald-600 rounded-sm shadow-md" />
                  )}
                  {selectedShape === 'parallelogram' && (
                    <div className="w-28 h-16 bg-purple-500/80 border-2 border-purple-600 skew-x-[25deg] shadow-md" />
                  )}
                  {selectedShape === 'hexagon' && (
                    <div className="w-24 h-24 bg-amber-500/80 border-2 border-amber-600 rounded-lg shadow-md" />
                  )}
                </div>
              </div>

              {/* Koordináta levezetés doboz */}
              <div className="flex-1 space-y-3 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div className="font-bold text-slate-900 dark:text-white border-b pb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Példa egy pont elforgatására az origó körül:
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Kezdőpont: <code className="font-mono font-bold text-blue-600">P(3; 2)</code>
                </p>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 space-y-1">
                  <div>Forgásszög: <span className="font-bold">{angle}°</span></div>
                  <div>
                    Elforgatott képpont: <code className="font-mono font-bold text-emerald-600 text-sm">P'({coordSample.xRot}; {coordSample.yRot})</code>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 italic">
                  Megjegyzés: 180°-os forgatásnál a koordináták ellentettjükre váltanak: (3; 2) → (−3; −2). +90°-nál: (3; 2) → (−2; 3).
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

