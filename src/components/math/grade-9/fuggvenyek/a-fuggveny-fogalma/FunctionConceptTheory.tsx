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
  MappingDiagramSvg,
  VerticalLineTestSvg,
  DomainRangeGraphSvg,
  FunctionMachineSvg,
  PointOnGraphSvg
} from './FunctionConceptFigures';
import {
  Split,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Hash,
  Compass,
  ArrowRight,
  Calculator,
  HelpCircle,
  Layers,
  Sparkles,
  BookOpen,
  Target
} from 'lucide-react';

interface FunctionConceptTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const FunctionConceptTheory: React.FC<FunctionConceptTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV FÜGGVÉNY- ÉS KIKÖTÉS LABOR ---
  const [funcType, setFuncType] = useState<'linear' | 'fraction' | 'sqrt'>('fraction');
  const [inputX, setInputX] = useState<number>(3);
  const [paramA, setParamA] = useState<number>(2);

  // Behelyettesítési tesztelő
  const [evalX, setEvalX] = useState<number>(4);

  const evaluation = useMemo(() => {
    if (funcType === 'linear') {
      const val = 2 * inputX - paramA;
      return {
        formula: `f(x) = 2x - ${paramA}`,
        domain: 'D_f = ℝ (minden valós szám)',
        range: 'R_f = ℝ (minden valós szám)',
        isDefined: true,
        output: val.toString(),
        note: 'Minden valós szám behelyettesíthető, nincs tiltott érték.'
      };
    } else if (funcType === 'fraction') {
      const isForbidden = inputX === paramA;
      return {
        formula: `f(x) = 1 / (x - ${paramA})`,
        domain: `D_f = ℝ \\ {${paramA}}`,
        range: 'R_f = ℝ \\ {0}',
        isDefined: !isForbidden,
        output: isForbidden ? 'NEM ÉRTELMEZETT (nullával való osztás!)' : (1 / (inputX - paramA)).toFixed(3),
        note: `A nevező nem lehet 0: x - ${paramA} ≠ 0 ➔ x ≠ ${paramA}.`
      };
    } else {
      const underRoot = inputX - paramA;
      const isForbidden = underRoot < 0;
      return {
        formula: `f(x) = √(x - ${paramA})`,
        domain: `D_f = [${paramA}; ∞[ (x ≥ ${paramA})`,
        range: 'R_f = [0; ∞[ (nemnegatív számok)',
        isDefined: !isForbidden,
        output: isForbidden ? 'NEM ÉRTELMEZETT (negatív gyök alatt!)' : Math.sqrt(underRoot).toFixed(3),
        note: `A gyök alatti kifejezés nem lehet negatív: x - ${paramA} ≥ 0 ➔ x ≥ ${paramA}.`
      };
    }
  }, [funcType, inputX, paramA]);

  return (
    <TheoryTemplate
      title="5. A függvény fogalma és vizsgálata"
      subtitle="Egyértelmű hozzárendelés, a függvénygép modellje, értelmezési tartomány (Df), értékkészlet (Rf), kikötések és pontilleszkedés"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 5. A FÜGGVÉNY FOGALMA"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a függvényfogalom feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "A függvény aranyszabálya",
        formula: "Minden bemeneti x-hez PONTOSAN EGY kimeneti y érték tartozhat!",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: A FÜGGVÉNY DEFINÍCIÓJA ÉS A FÜGGVÉNYGÉP MODELLJE
      ========================================================================= */}
      <TheorySection
        title="1. A függvény fogalma és a függvénygép modellje"
        icon={<Split className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Mi a függvény? A hozzárendelés egyértelműsége"
          icon={<Split className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A mindennapi életben folyamatosan összefüggéseket, kapcsolatokat figyelünk meg: például a benzinkúton tankolt üzemanyag mennyisége meghatározza a fizetendő összeget; a boltban a termék vonalkódja egyértelműen meghatározza az árat.
          </p>

          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 mb-4">
            <h5 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Matematikai definíció:
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              Legyen $A$ és $B$ két nemüres halmaz. <strong>Függvénynek</strong> nevezünk minden olyan hozzárendelést (relációt), amely az $A$ halmaz (értelmezési tartomány) <strong>minden eleméhez</strong> a $B$ halmaz (képhalmaz) <strong>pontosan egyetlen</strong> elemét rendeli hozzá.
            </p>
            <p className="text-blue-800 dark:text-blue-400 font-mono text-xs mt-2 font-bold">
              Jelölés: $f: A \to B, \quad x \mapsto f(x)$ &nbsp;vagy&nbsp; $y = f(x)$
            </p>
          </div>

          {/* Függvénygép modell SVG */}
          <div className="flex justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-700 my-4">
            <FunctionMachineSvg size={310} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs my-4">
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                ✓ SZABAD: Több bemenet ➔ Azonos kimenet
              </span>
              Különböző $x$ értékeknek lehet pontosan ugyanaz az $y$ értéke!
              Például az $f(x) = x^2$ szabálynál:
              <br />
              $f(-3) = 9$ és $f(3) = 9$. Ez teljesen szabályos függvény!
              (Példa a valóságból: több diáknak is lehet azonos a születési hónapja).
            </div>

            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
              <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">
                ✗ TILOS: Egyetlen bemenet ➔ Több különböző kimenet
              </span>
              Egy bemeneti $x$-nek SOHA nem lehet két vagy több válasza!
              Ha az $x = 4$-hez a $+2$ és a $-2$ is hozzá lenne rendelve, az <strong>NEM függvény</strong>!
              (Példa a valóságból: egy diáknak nem lehet egyszerre két különböző édesanyja).
            </div>
          </div>

          {/* Nyíldiagramos szemléltetés */}
          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <MappingDiagramSvg size={300} />
          </div>

          {/* Függőleges vonal teszt */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              A Függőleges Vonal Teszt (Vertical Line Test):
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Egy koordinátasíkon megrajzolt görbe pontosan akkor függvény grafikonja, ha a síkban felvett <strong>bármely függőleges egyenes legfeljebb 1 pontban</strong> metszi azt! Ha akár csak egyetlen olyan függőleges egyenes is létezik, amely 2 vagy több pontban metszi a görbét, akkor az alakzat <strong>nem függvény</strong>.
            </p>
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <VerticalLineTestSvg size={300} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: ÉRTELMEZÉSI TARTOMÁNY ÉS KIKÖTÉSEK
      ========================================================================= */}
      <TheorySection
        title="2. Értelmezési tartomány (Df) és a 2 fő kikötési szabály"
        icon={<Compass className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Mit szabad és mit tilos behelyettesíteni? (Kikötések mesterkurzusa)"
          icon={<Compass className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az <strong>értelmezési tartomány ($D_f$)</strong> a független változó ($x$) azon lehetséges értékeinek összessége, amelyekre a hozzárendelési szabály értelmes, kiszámítható eredményt ad a valós számok (ℝ) körében. Ha nincs külön megadva, akkor a lehető legbővebb valós részhalmazt keressük.
          </p>

          {/* A 2 fő tiltás */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
            {/* 1. Nevező != 0 */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border-2 border-amber-300 dark:border-amber-800 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                  1. SZABÁLY: Nullával nem osztunk!
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Ha egy kifejezés nevezőjében ismeretlen ($x$) szerepel, a nevező értéke <strong>nem lehet 0</strong>!
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-900 space-y-1 font-mono">
                <p className="text-amber-700 dark:text-amber-400 font-bold">f(x) = 5 / (2x - 6)</p>
                <p className="text-slate-600 dark:text-slate-400">Kikötés: 2x - 6 ≠ 0 ⟹ 2x ≠ 6 ⟹ x ≠ 3</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">D_f = ℝ \ &#123;3&#125;</p>
              </div>
            </div>

            {/* 2. Gyök alatti >= 0 */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border-2 border-purple-300 dark:border-purple-800 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900 dark:text-purple-200 text-sm">
                  2. SZABÁLY: Valósban nincs negatív gyök!
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Négyzetgyökjel alatt csak <strong>nem-negatív (≥ 0)</strong> kifejezés állhat!
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-purple-200 dark:border-purple-900 space-y-1 font-mono">
                <p className="text-purple-700 dark:text-purple-400 font-bold">g(x) = √(10 - 2x)</p>
                <p className="text-slate-600 dark:text-slate-400">Kikötés: 10 - 2x ≥ 0 ⟹ 10 ≥ 2x ⟹ x ≤ 5</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">D_g = ]-∞; 5]</p>
              </div>
            </div>
          </div>

          {/* Haladó kombinált példa */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 my-3">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Kombinált eset (Gyök a nevezőben):
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Tekintsük a <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">h(x) = 1 / √(x - 4)</span> függvényt!
              Itt a gyök miatt $x - 4 \ge 0$, de a nevező miatt nem lehet $0$, így szigorúan: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">x - 4 &gt; 0 ⟹ x &gt; 4</span>.
              Ezért az értelmezési tartomány: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">D_h = ]4; ∞[</span> (nyílt intervallum!).
            </p>
          </div>

          {/* =========================================================================
              INTERAKTÍV KIKÖTÉS ÉS Df / Rf LABOR
          ========================================================================= */}
          <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Interaktív Értelmezési Tartomány & Értékkészlet Labor
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-xs">
                {/* Típusválasztó */}
                <div>
                  <span className="font-bold block mb-1.5">Függvénytípus kiválasztása:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFuncType('linear')}
                      className={`px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${
                        funcType === 'linear'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      Lineáris
                    </button>
                    <button
                      type="button"
                      onClick={() => setFuncType('fraction')}
                      className={`px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${
                        funcType === 'fraction'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      Törtes 1/(x-a)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFuncType('sqrt')}
                      className={`px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${
                        funcType === 'sqrt'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      Négyzetgyök √(x-a)
                    </button>
                  </div>
                </div>

                {/* Paraméter 'a' csúszka */}
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Paraméter (a): {paramA}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={paramA}
                    onChange={(e) => setParamA(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* Bemenet 'x' csúszka */}
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Bemenet (x): {inputX}</span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="6"
                    value={inputX}
                    onChange={(e) => setInputX(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Kiértékelő kártya */}
              <div className="space-y-2.5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="pb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Aktuális képlet:</span>
                  <div className="text-sm font-black font-mono text-indigo-600 dark:text-indigo-400">
                    {evaluation.formula}
                  </div>
                </div>
                <div className="pb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Értelmezési tartomány:</span>
                  <div className="font-mono font-bold text-blue-700 dark:text-blue-300">
                    {evaluation.domain}
                  </div>
                </div>
                <div className="pb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Értékkészlet:</span>
                  <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    {evaluation.range}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">x = {inputX} helyettesítés:</span>
                    <span className={`font-mono font-bold ${evaluation.isDefined ? 'text-emerald-600' : 'text-rose-600'}`}>
                      f({inputX}) = {evaluation.output}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    {evaluation.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: ÉRTÉKKÉSZLET (Rf) ÉS ANNAK MEGHATÁROZÁSA
      ========================================================================= */}
      <TheorySection
        title="3. Értékkészlet (Rf): Milyen értékeket vesz fel a függvény?"
        icon={<Layers className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard
          title="Az Y-tengelyre vetítés és algebrai korlátok"
          icon={<Layers className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az <strong>értékkészlet ($R_f$)</strong> a függvény által ténylegesen felvett értékek halmaza, vagyis az összes olyan $y$ szám, amelyre létezik olyan $x \in D_f$, hogy $f(x) = y$.
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <DomainRangeGraphSvg size={300} />
          </div>

          <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-4 mb-2">
            Hogyan határozzuk meg az értékkészletet ($R_f$)?
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs my-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 space-y-1">
              <span className="font-bold text-blue-900 dark:text-blue-300 block">Lineáris Függvény</span>
              <p className="text-slate-600 dark:text-slate-400 font-mono">f(x) = 2x - 5</p>
              <p className="text-slate-700 dark:text-slate-300">
                Mivel az egyenes mindkét irányban a végtelenbe nyúlik, bármely valós értéket felvesz:
              </p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300">R_f = ℝ</p>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 space-y-1">
              <span className="font-bold text-purple-900 dark:text-purple-300 block">Négyzetes (Parabola)</span>
              <p className="text-slate-600 dark:text-slate-400 font-mono">f(x) = x² + 4</p>
              <p className="text-slate-700 dark:text-slate-300">
                Mivel $x^2 \ge 0$ minden valós $x$-re, ezért $x^2 + 4 \ge 4$. A minimum 4:
              </p>
              <p className="font-mono font-bold text-purple-700 dark:text-purple-300">R_f = [4; ∞[</p>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1">
              <span className="font-bold text-rose-900 dark:text-rose-300 block">Abszolútérték (Lefelé)</span>
              <p className="text-slate-600 dark:text-slate-400 font-mono">g(x) = -|x| + 3</p>
              <p className="text-slate-700 dark:text-slate-300">
                Mivel $-|x| \le 0$, a legnagyobb elérhető magasság a 3:
              </p>
              <p className="font-mono font-bold text-rose-700 dark:text-rose-300">R_g = ]-∞; 3]</p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs mt-3">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
              Fontos: Korlátozott értelmezési tartomány hatása!
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Ha $f(x) = 2x + 1$, de az értelmezési tartomány csak $D_f = [-1; 4]$, akkor a kimenet is egy korlátos szakasz lesz:
              <br />
              $f(-1) = 2(-1) + 1 = -1$ és $f(4) = 2(4) + 1 = 9 \implies R_f = [-1; 9]$.
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. RÉSZ: A FÜGGVÉNY MEGADÁSI MÓDJAI ÉS BEHELYETTESÍTÉS
      ========================================================================= */}
      <TheorySection
        title="4. Megadási módok és a behelyettesítési algebra"
        icon={<Calculator className="w-6 h-6 text-amber-600" />}
      >
        <TheoryCard
          title="Az 5 megadási forma és a kétirányú számítás"
          icon={<Calculator className="w-5 h-5 text-amber-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs my-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">1. Képlettel (hozzárendelési szabállyal)</span>
              $f(x) = 2x + 1$ vagy $x \mapsto 2x + 1$. A legpontosabb, algebrai forma.
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-1">2. Értéktáblázattal</span>
              Sorokba/oszlopokba rendezett számpárok: $(x; y)$. Diszkrét pontokat ad.
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">3. Grafikonnal</span>
              A koordinátasíkon pontok vagy folytonos görbe formájában. Vizuálisan átlátható.
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">4. Szöveges szabállyal</span>
              „Minden valós számhoz rendeljük hozzá a kétszeresénél eggyel nagyobb számot.”
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <span className="font-bold text-purple-900 dark:text-purple-300 block mb-1">5. Nyíldiagrammal</span>
              Két halmaz elemei között rajzolt nyilakkal szemléltetve (főleg véges halmazoknál).
            </div>
          </div>

          {/* Kétirányú számítás */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              A Kétirányú Számítás: x ➔ y vagy y ➔ x?
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-sky-700 dark:text-sky-300 block">
                  A) Ismert az x, keressük az y-t (Behelyettesítés)
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Legyen $f(x) = 3x - 5$. Számítsuk ki az $f(4)$ és $f(-2)$ értékeket!
                </p>
                <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 space-y-1">
                  <p>f(4) = 3·(4) - 5 = 12 - 5 = <strong className="text-emerald-500">7</strong></p>
                  <p>f(-2) = 3·(-2) - 5 = -6 - 5 = <strong className="text-emerald-500">-11</strong></p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-purple-700 dark:text-purple-300 block">
                  B) Ismert az y, keressük az x-et (Egyenletmegoldás)
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Melyik bemeneti $x$ helyen veszi fel az $f(x) = 3x - 5$ a $16$ értéket?
                </p>
                <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 space-y-1">
                  <p>f(x) = 16 ⟹ 3x - 5 = 16</p>
                  <p>3x = 21 ⟹ <strong className="text-purple-500">x = 7</strong></p>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          5. RÉSZ: PONT ÉS GRAFIKON ILLESZKEDÉSE
      ========================================================================= */}
      <TheorySection
        title="5. Pont és grafikon illeszkedése: P(x₀; y₀) ∈ graf(f)"
        icon={<Compass className="w-6 h-6 text-rose-600" />}
      >
        <TheoryCard
          title="Rajta van-e a pont a grafikonon?"
          icon={<Compass className="w-5 h-5 text-rose-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A függvény grafikonja a koordinátasíkon azon $P(x; y)$ pontok összessége, amelyek koordinátáira teljesül az $y = f(x)$ egyenlőség.
          </p>

          <div className="flex justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-700 my-4">
            <PointOnGraphSvg size={310} />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-3">
            <h5 className="font-bold text-slate-900 dark:text-white text-sm">
              Illeszkedési számítási minta:
            </h5>
            <p className="text-slate-600 dark:text-slate-300">
              Adott az <span className="font-mono font-bold text-sky-500">f(x) = 2x - 1</span> függvény. Döntsük el, hogy a $P(2; 3)$ és a $Q(2; 1)$ pontok rajta fekszenek-e a grafikonon!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">A P(2; 3) pont vizsgálata:</p>
                <p>1. Behelyettesítjük az $x = 2$-t: $f(2) = 2 \cdot 2 - 1 = 3$.</p>
                <p>2. Összevetjük az $y$ koordinátával: $3 = 3$ ✓ Egyenlő!</p>
                <p className="font-bold text-emerald-700 dark:text-emerald-400 mt-1">A P pont RAJTA VAN a grafikonon.</p>
              </div>

              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
                <p className="font-bold text-rose-800 dark:text-rose-300 mb-1">A Q(2; 1) pont vizsgálata:</p>
                <p>1. Behelyettesítjük az $x = 2$-t: $f(2) = 2 \cdot 2 - 1 = 3$.</p>
                <p>2. Összevetjük az $y$ koordinátával: $3 \ne 1$ ✗ Nem egyezik!</p>
                <p className="font-bold text-rose-700 dark:text-rose-400 mt-1">A Q pont NINCS RAJTA a grafikonon.</p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák és érettségi csapdák a függvényfogalomnál"
        traps={[
          {
            wrong: 'A kör egyenletét (x² + y² = r²) függvénynek tekintjük.',
            correct: 'A kör NEM függvény! Bármely, a kör belsején átmenő függőleges egyenes KÉT pontban metszi a kört (egy x-hez két különböző y tartozik).',
            explanation: 'Mindig ellenőrizd a függőleges vonal teszttel a zárt görbéket!'
          },
          {
            wrong: 'Az értelmezési tartomány (Df) és értékkészlet (Rf) felcserélése.',
            correct: 'Df MINDIG az x tengelyen (vízszintes bemenetek), Rf MINDIG az y tengelyen (függőleges kimenetek) található.',
            explanation: 'Mnemonic: Df = Domain (x alap), Rf = Range (y elért magasság).'
          },
          {
            wrong: 'Törtes kifejezésnél elfelejtjük a nevező kikötését (pl. f(x) = 1/(x-3) esetén x=3-at is behelyettesítünk).',
            correct: 'Nullával nem osztunk! Ha a nevezőben x szerepel, mindig fel kell írni: nevező ≠ 0, tehát x ≠ 3. Df = ℝ \\ {3}.',
            explanation: 'A kikötés hiánya az érettségin automatikus pontvesztést jelent.'
          },
          {
            wrong: 'Azt gondoljuk, hogy f(x) = x² esetén azért nem függvény, mert f(-2) = 4 és f(2) = 4.',
            correct: 'Ez teljesen szabályos függvény! Különböző x-eknek LEHET azonos kimenetük (több nyíl futhat be ugyanoda). Csak egy x-ből nem indulhat két nyíl!',
            explanation: 'Gondolj a liftre: két különböző ember is mehet ugyanarra a 4. emeletre.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="A Függvénytan Alapfogalmainak Részletes Összefoglalása"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Fogalom', 'Jelölése', 'Jelentése', 'Példa']}
          rows={[
            ['Független változó', 'x', 'Szabadon választott bemeneti érték', 'x = 3'],
            ['Függő változó', 'y vagy f(x)', 'A szabály által hozzárendelt kimeneti érték', 'y = 2·3 - 1 = 5'],
            ['Értelmezési tartomány', 'D_f', 'Megengedett bemeneti x értékek halmaza', 'f(x) = 1/x esetén ℝ \\ {0}'],
            ['Értékkészlet', 'R_f', 'Ténylegesen felvett kimeneti y értékek halmaza', 'f(x) = x² esetén [0; ∞['],
            ['Zérushely', 'x_0', 'Azon x helyek, ahol a függvényérték nulla: f(x) = 0', '2x - 6 = 0 ➔ x = 3'],
            ['Függőleges vonal teszt', '-', 'Bármely függőleges egyenes max. 1 pontban metszi', 'Parabola: igen, Kör: nem'],
            ['Pont illeszkedése', 'P(x₀; y₀) ∈ graf(f)', 'f(x₀) = y₀ teljesül-e behelyettesítéskor', '(2; 5) rajta van-e f(x)=2x+1-en? (Igen)']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};
