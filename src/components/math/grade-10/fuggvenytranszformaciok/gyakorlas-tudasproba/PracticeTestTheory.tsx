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
  TransformSynthesisSvg,
  FoldedAbsoluteSvg,
  BoundedDomainParabolaSvg
} from './PracticeTestFigures';
import {
  Award,
  Layers,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  TrendingDown,
  TrendingUp,
  Target,
  Split,
  Eye,
  CheckSquare
} from 'lucide-react';

interface PracticeTestTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeTestTheory: React.FC<PracticeTestTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab: Transzformációs Mester Szimulátor ---
  const [baseFunc, setBaseFunc] = useState<'x2' | 'abs' | 'sqrt'>('x2');
  const [coeffA, setCoeffA] = useState<number>(1);
  const [shiftU, setShiftU] = useState<number>(2);
  const [shiftV, setShiftV] = useState<number>(1);
  const [isFolded, setIsFolded] = useState<boolean>(false);

  // Képlet string generálása
  const baseName = baseFunc === 'x2' ? 'x²' : baseFunc === 'abs' ? '|x|' : '√x';
  const innerArg = shiftU === 0 ? 'x' : shiftU > 0 ? `(x - ${shiftU})` : `(x + ${Math.abs(shiftU)})`;

  let innerExpression = '';
  if (baseFunc === 'x2') {
    innerExpression = `${innerArg}²`;
  } else if (baseFunc === 'abs') {
    innerExpression = `|${shiftU === 0 ? 'x' : shiftU > 0 ? `x - ${shiftU}` : `x + ${Math.abs(shiftU)}`}|`;
  } else {
    innerExpression = `\\sqrt{${shiftU === 0 ? 'x' : shiftU > 0 ? `x - ${shiftU}` : `x + ${Math.abs(shiftU)}`}}`;
  }

  const aPrefix = coeffA === 1 ? '' : coeffA === -1 ? '-' : `${coeffA}`;
  const vSuffix = shiftV === 0 ? '' : shiftV > 0 ? ` + ${shiftV}` : ` - ${Math.abs(shiftV)}`;

  const canonicalFormula = `${aPrefix}${innerExpression}${vSuffix}`;
  const finalFormula = isFolded ? `|${canonicalFormula}|` : canonicalFormula;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Gyakorlás és fejezeti tudáspróba"
      subtitle="A függvénytranszformációk teljes szintézise: mesterképlet, lépéshierarchia, felhajtott abszolútértékek és fejezeti összefoglaló."
      themeColor="violet"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-violet-600 dark:text-violet-400 font-black">1. Transzformációs mesterképlet:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x) = a \cdot f_0(x - u) + v</MathText> &nbsp;|&nbsp; Csúcspont / bázispont: <MathText>V(u; v)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">2. Lépések hierarchiája:</span>
              <span className="text-slate-800 dark:text-slate-100">
                1. Zárójel belseje (<MathText>u</MathText>, vízszintes) &rarr; 2. Szorzás (<MathText>a</MathText>, nyújtás/tükrözés) &rarr; 3. Függőleges (<MathText>v</MathText>, eltolás)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">3. Külső felhajtás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>|f(x)|</MathText> esetén az <MathText>x</MathText>-tengely alatti ív felhajlik, az értékkészlet alsó határa <MathText>0</MathText> lesz!
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">4. Korlátos tartomány:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>D_f = [a; b]</MathText> esetén a csúcspont csak akkor szélsőérték, ha <MathText>u \in [a; b]</MathText>; egyébként a végpontok döntenek!
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Tudáspróba indítása (90 feladat)"
    >
      {/* 1. SZEKCIÓ: A TRANSZFORMÁCIÓK SZINTÉZISE */}
      <TheorySection
        number={1}
        title="A függvénytranszformációk teljes szintézise"
        icon={<Layers className="w-5 h-5 text-violet-500" />}
        badge="ÖSSZEFOGLALÁS"
        badgeColor="violet"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ebben a fejezetben megtanultuk, hogy az alapfüggvények (<MathText>x²</MathText>, <MathText>|x|</MathText>, <MathText>√x</MathText>, <MathText>1/x</MathText>)
          grafikonjaiból geometriai transzformációk egymásutánjával végtelen sok új függvény hozható létre.
          A transzformációk mindegyike közvetlenül kiolvasható az algebrai képletből:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 text-xs">
          <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">1. Vízszintes eltolás: f(x - u)</span>
            <p className="text-slate-600 dark:text-slate-300">
              A zárójelben lévő konstans ellentétes előjellel hat:<br />
              • <MathText>x - u</MathText>: jobbra tolódik <MathText>u</MathText>-val.<br />
              • <MathText>x + u</MathText>: balra tolódik <MathText>u</MathText>-val.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/50">
            <span className="font-bold text-pink-600 dark:text-pink-400 block mb-1">2. Függőleges skálázás: a · f(x)</span>
            <p className="text-slate-600 dark:text-slate-300">
              Minden <MathText>y</MathText>-értéket <MathText>a</MathText>-szorosára szorzunk:<br />
              • <MathText>|a| &gt; 1</MathText>: megnyúlik (soványabb).<br />
              • <MathText>0 &lt; |a| &lt; 1</MathText>: összenyomódik (kövérebb).<br />
              • <MathText>a &lt; 0</MathText>: tükröződik az <MathText>x</MathText>-tengelyre!
            </p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">3. Függőleges eltolás: f(x) + v</span>
            <p className="text-slate-600 dark:text-slate-300">
              A függvényértékhez hozzáadott konstans változatlan előjellel mozgat:<br />
              • <MathText>+v</MathText>: feljebb tolja <MathText>v</MathText>-vel.<br />
              • <MathText>-v</MathText>: lejjebb tolja <MathText>v</MathText>-vel.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
            <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">4. Felhajtás: |f(x)|</span>
            <p className="text-slate-600 dark:text-slate-300">
              A külső abszolútérték a negatív függvényértékeket pozitívvá teszi:<br />
              • Az <MathText>x</MathText>-tengely feletti rész változatlan.<br />
              • Az alatta lévő ív tükröződik a tengelyre!
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <TransformSynthesisSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            A szürke <MathText>x^2</MathText> alapfüggvényből a kanonikus paraméterekkel (<MathText>a, u, v</MathText>) tetszőleges parabola előállítható.
          </p>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV MESTER LABORATÓRIUM */}
      <TheorySection
        number={2}
        title="Interaktív Transzformációs Mester Laboratórium"
        icon={<Sliders className="w-5 h-5 text-violet-500" />}
        badge="MINDEN EGYBEN"
        badgeColor="violet"
      >
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-900 dark:to-violet-950/30 border border-violet-200 dark:border-violet-900/50">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Alapfüggvény:</span>
              <div className="flex gap-1.5">
                {(['x2', 'abs', 'sqrt'] as const).map((func) => (
                  <button
                    key={func}
                    onClick={() => setBaseFunc(func)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      baseFunc === func
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {func === 'x2' ? 'x²' : func === 'abs' ? '|x|' : '√x'}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={isFolded}
                onChange={(e) => setIsFolded(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
              />
              <span>Külső felhajtás (|...|)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Nyújtás / tükrözés (a):</span>
                <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">{coeffA}</span>
              </label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={coeffA}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCoeffA(val === 0 ? 1 : val);
                }}
                className="w-full mt-1.5 accent-violet-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Vízszintes eltolás (u):</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{shiftU}</span>
              </label>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={shiftU}
                onChange={(e) => setShiftU(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Függőleges eltolás (v):</span>
                <span className="font-mono text-pink-600 dark:text-pink-400 font-bold">{shiftV}</span>
              </label>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={shiftV}
                onChange={(e) => setShiftV(parseInt(e.target.value, 10))}
                className="w-full mt-1.5 accent-pink-500"
              />
            </div>
          </div>

          {/* Generated formula display */}
          <div className="p-3.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-1">
              Létrejött hozzárendelési szabály:
            </span>
            <div className="text-base sm:text-lg font-black text-violet-700 dark:text-violet-300 font-mono">
              <MathText>{`f(x) = ${finalFormula}`}</MathText>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs text-slate-600 dark:text-slate-400">
              <span>Csúcspont: <strong>V({shiftU}; {isFolded ? Math.abs(shiftV) : shiftV})</strong></span>
              <span>Irány: <strong>{coeffA > 0 ? 'Felfelé' : 'Lefelé'}</strong></span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A FELHAJTOTT ABSZOLÚTÉRTÉK */}
      <TheorySection
        number={3}
        title="A felhajtott abszolútérték geometriai logikája"
        icon={<Sparkles className="w-5 h-5 text-pink-500" />}
        badge="SPECIÁLIS TRANSZFORMÁCIÓ"
        badgeColor="pink"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A felhajtott függvényeknél, mint az <MathText>|x^2 - 4x + 3|</MathText>, a függvény kétféle képlet szerint viselkedik:
          ahol az eredeti kifejezés pozitív volt, ott változatlan marad,
          ahol pedig negatív volt (a zérushelyek között), ott ellentettjére vált: <MathText>-(x^2 - 4x + 3) = -x^2 + 4x - 3</MathText>.
        </p>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <FoldedAbsoluteSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            A szaggatott szürke völgy felhajlik: az eredeti <MathText>(2; -1)</MathText> csúcspontból egy helyi maximum lesz a <MathText>(2; 1)</MathText> pontban!
          </p>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KORLÁTOS ÉRTELMEZÉSI TARTOMÁNY */}
      <TheorySection
        number={4}
        title="Függvények korlátos intervallumon: Szélsőértékek és értékkészlet"
        icon={<Target className="w-5 h-5 text-emerald-500" />}
        badge="VIZSGAFÓKUSZ"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ha a függvény értelmezési tartománya egy <MathText>[a; b]</MathText> intervallum,
          az értékkészlet megállapításához mindig meg kell vizsgálnunk a csúcspont és az intervallum viszonyát:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">1. Eset: A csúcspont a tartományban van</span>
            <p className="text-slate-600 dark:text-slate-300">
              Ha <MathText>u \in [a; b]</MathText>, akkor a parabola csúcsa globális minimum vagy maximum!
              A másik szélsőértéket pedig a végpontok (<MathText>f(a)</MathText> vagy <MathText>f(b)</MathText>) közül a távolabbi adja meg.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">2. Eset: A csúcspont a tartományon kívül van</span>
            <p className="text-slate-600 dark:text-slate-300">
              Ha <MathText>u \notin [a; b]</MathText>, a függvény az egész intervallumon szigorúan monoton nő vagy csökken!
              Ilyenkor a szélsőértékek pontosan a két végpontban (<MathText>f(a)</MathText> és <MathText>f(b)</MathText>) vannak.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <BoundedDomainParabolaSvg size={340} />
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 max-w-lg">
            Példa: <MathText>f: [-1; 3] → ℝ, f(x) = x² - 2x</MathText>. A csúcs <MathText>x = 1</MathText> bent van, így a minimum <MathText>-1</MathText>,
            a két végpontban felvett érték <MathText>f(-1) = f(3) = 3</MathText>, ezért <MathText>R_f = [-1; 3]</MathText>.
          </p>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: VIZSGA ELLENŐRZŐ PROTOKOLL */}
      <TheorySection
        number={5}
        title="Fejezeti összefoglaló és tudáspróba ellenőrző lista"
        icon={<Award className="w-5 h-5 text-amber-500" />}
        badge="TUDÁSPRÓBA"
        badgeColor="amber"
      >
        <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Tudáspróba Magabiztossági Ellenőrző Lista
          </h4>
          <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Meg tudom határozni a függvény bázispontját vagy csúcspontját (<MathText>V(u; v)</MathText>) közvetlenül a képletből.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Biztos kézzel át tudom alakítani a polinom alakot (<MathText>ax^2 + bx + c</MathText>) kanonikus teljes négyzetes alakra.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Meg tudom keresni a segédfüggvény (<MathText>ax^2 + bx</MathText>) zérushelyeit és szimmetriatengelyét.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Hibátlanul fel tudom írni a függvény értékkészletét, monotonitását zárt zárójellel, és előjelét.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Képes vagyok geometriai kordonfeladatokat és fizikai hajításokat modellezni a csúcspont segítségével.</span>
            </li>
          </ul>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

