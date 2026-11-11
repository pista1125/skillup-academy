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
  GeneralShiftVectorSvg,
  AbsFunctionShiftSvg,
  SqrtFunctionShiftSvg,
  InsideVsOutsideComparisonSvg
} from './ShiftTransformFigures';
import {
  Move,
  MoveVertical,
  MoveHorizontal,
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Scale
} from 'lucide-react';

interface ShiftTransformTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type FunctionType = 'parabola' | 'abs' | 'sqrt' | 'reciprocal';

export const ShiftTransformTheory: React.FC<ShiftTransformTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Univerzális Párhuzamos Eltolás Szimulátor ---
  const [fnType, setFnType] = useState<FunctionType>('parabola');
  const [shiftU, setShiftU] = useState<number>(2); // x-tengely mentén (vízszintesen)
  const [shiftC, setShiftC] = useState<number>(1); // y-tengely mentén (függőlegesen)

  // Segédfüggvény a képlet szövegéhez
  const getFormulaString = (type: FunctionType, u: number, c: number): string => {
    let baseInside = 'x';
    if (u > 0) baseInside = `x - ${u}`;
    else if (u < 0) baseInside = `x + ${Math.abs(u)}`;

    let cPart = '';
    if (c > 0) cPart = ` + ${c}`;
    else if (c < 0) cPart = ` - ${Math.abs(c)}`;

    switch (type) {
      case 'parabola':
        return u === 0 ? `f(x) = x²${cPart}` : `f(x) = (${baseInside})²${cPart}`;
      case 'abs':
        return `f(x) = |${baseInside}|${cPart}`;
      case 'sqrt':
        return `f(x) = √(${baseInside})${cPart}`;
      case 'reciprocal':
        return `f(x) = 1/(${baseInside})${cPart}`;
    }
  };

  // Kitüntetett pont és értelmezési tartomány/értékkészlet
  let pointName = 'Csúcspont';
  let pointLetter = 'T';
  let domainStr = 'ℝ';
  let rangeStr = `[${shiftC}; ∞[`;

  if (fnType === 'abs') {
    pointName = 'Töréspont';
    pointLetter = 'V';
    domainStr = 'ℝ';
    rangeStr = `[${shiftC}; ∞[`;
  } else if (fnType === 'sqrt') {
    pointName = 'Kezdőpont';
    pointLetter = 'K';
    domainStr = `[${shiftU}; ∞[`;
    rangeStr = `[${shiftC}; ∞[`;
  } else if (fnType === 'reciprocal') {
    pointName = 'Centrum (aszimptoták metszéspontja)';
    pointLetter = 'C';
    domainStr = `ℝ \\ {${shiftU}}`;
    rangeStr = `ℝ \\ {${shiftC}}`;
  }

  // --- Interactive Lab 2: "Kívül vagy Belül" kapcsoló ---
  const [comparisonExample, setComparisonExample] = useState<'parabola' | 'abs' | 'sqrt'>('parabola');

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="„Fel”-, „le”, „jobbra”-, „balra”"
      subtitle="A függvénygrafikonok párhuzamos eltolása az x és y tengelyek mentén: külső és belső transzformációk matematikai szabályai."
      themeColor="cyan"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-cyan-600 dark:text-cyan-400 font-black">Függőleges (külső) eltolás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x) + c</MathText> &nbsp;(<MathText>c &gt; 0</MathText>: fel, <MathText>c &lt; 0</MathText>: le) &nbsp;|&nbsp; <MathText>D_f</MathText> változatlan, <MathText>R_f</MathText> eltolódik!
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Vízszintes (belső) eltolás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x - u)</MathText> &nbsp;(<MathText>-u</MathText>: jobbra, <MathText>+u</MathText>: balra!) &nbsp;|&nbsp; <MathText>D_f</MathText> eltolódik, <MathText>R_f</MathText> változatlan!
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-purple-600 dark:text-purple-400 font-black">Vektoreltolás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>v(u; c)</MathText> vektorral: <MathText>g(x) = f(x - u) + c</MathText> &nbsp;|&nbsp; Pontok mozgása: <MathText>(x; y) \mapsto (x + u; y + c)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Kitüntetett pont:</span>
              <span className="text-slate-800 dark:text-slate-100">
                Origóból <MathText>(0; 0) \to (u; c)</MathText> pontba vándorol (parabola csúcsa, töréspont, kezdőpont)
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A PÁRHUZAMOS ELTOLÁSOK ALAPELVE */}
      <TheorySection
        number={1}
        title="A transzformációk alaptörvénye: Külső vs. Belső beavatkozás"
        icon={<Compass className="w-5 h-5 text-cyan-500" />}
        badge="ALAPELV"
        badgeColor="cyan"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A függvénytranszformációk lényege, hogy egy ismert <strong>alapfüggvény</strong> (pl. <code>x²</code>, <code>|x|</code>, <code>√x</code>, <code>1/x</code>)
          grafikonjából geometriai műveletekkel (eltolás, tükrözés, nyújtás) új, bonyolultabb függvények grafikonját hozzuk létre anélkül,
          hogy minden pontot újra ki kellene számolnunk.
        </p>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mt-2">
          A legfontosabb elméleti különbségtétel: <strong>hol</strong> avatkozunk be a képletbe?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <TheoryCard title="1. KÜLSŐ beavatkozás: f(x) ± c">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A műveletet a függvényérték kiszámítása <strong>után</strong> végezzük el (a függvényen kívül).
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>Hatásiránya:</strong> Függőleges, az <strong>y-tengely</strong> mentén.</li>
              <li><strong>Irányérzék:</strong> Természetes (+ fel, - le).</li>
              <li><strong>Értelmezési tartomány (Df):</strong> <em>Nem változik!</em></li>
              <li><strong>Értékkészlet (Rf):</strong> Minden érték c-vel eltolódik.</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="2. BELSŐ beavatkozás: f(x ∓ u)">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A műveletet a változón közvetlenül, a függvény kiszámítása <strong>előtt</strong> hajtjuk végre (zárójelen/gyökön/abszolútértéken belül).
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>Hatásiránya:</strong> Vízszintes, az <strong>x-tengely</strong> mentén.</li>
              <li><strong>Irányérzék:</strong> <em>Ellentétes előjelű!</em> (- jobbra, + balra).</li>
              <li><strong>Értelmezési tartomány (Df):</strong> Eltolódik u egységgel!</li>
              <li><strong>Értékkészlet (Rf):</strong> <em>Nem változik!</em></li>
            </ul>
          </TheoryCard>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-2">
          <InsideVsOutsideComparisonSvg size={280} />
        </div>

        <TheoryCallout title="A transzformációk aranyszabálya" variant="tip">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Jegyezd meg ezt az egyszerű szabályt: <strong>Ami kívül van, az az y-ra hat és pont úgy viselkedik, ahogy látod; ami belül van, az az x-re hat és pont fordítva!</strong>
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: FÜGGŐLEGES ELTOLÁS */}
      <TheorySection
        number={2}
        title="Függőleges eltolások az y-tengely mentén: g(x) = f(x) ± c"
        icon={<MoveVertical className="w-5 h-5 text-emerald-500" />}
        badge="FÜGGŐLEGES"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ha egy tetszőleges <code>f(x)</code> függvény hozzárendelési szabályához hozzáadunk egy <code>c</code> valós számot,
          akkor minden <code>x</code> helyen a függvény értéke <code>c</code>-vel növekszik (vagy csökken).
          Geometriailag ez a teljes grafikon függőleges párhuzamos eltolását jelenti.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase block">c &gt; 0 (Pozitív tag)</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1 block">Felfelé tolás</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">pl. <code>f(x) = |x| + 3</code> (3-mal fel)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block">c = 0 (Origó alap)</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1 block">Nincs elmozdulás</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">alapfüggvény: <code>f(x) = |x|</code></span>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase block">c &lt; 0 (Negatív tag)</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1 block">Lefelé tolás</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">pl. <code>f(x) = |x| - 4</code> (4-gyel le)</span>
          </div>
        </div>

        <TheoryCard title="Hogyan változnak a függvényjellemzők függőleges eltoláskor?">
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li><strong>Értelmezési tartomány (Df):</strong> Változatlan marad (ha <code>Df = ℝ</code> volt, marad <code>ℝ</code>).</li>
            <li><strong>Értékkészlet (Rf):</strong> Minden tartományhatár <code>c</code>-vel módosul: <code>[min; ∞[ ⟶ [min + c; ∞[</code>.</li>
            <li><strong>Szélsőérték:</strong> A szélsőérték <em>értéke</em> <code>c</code>-vel módosul, de a szélsőérték <em>helye</em> nem változik!</li>
            <li><strong>Zérushelyek:</strong> Megváltoznak! Ha a függvényt lehúzzuk, új metszéspontok jöhetnek létre az x-tengellyel.</li>
            <li><strong>Monotonitás:</strong> A monotonitási intervallumok és irányok teljesen változatlanok maradnak.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: VÍZSZINTES ELTOLÁS */}
      <TheorySection
        number={3}
        title="Vízszintes eltolások az x-tengely mentén: g(x) = f(x ∓ u)"
        icon={<MoveHorizontal className="w-5 h-5 text-amber-500" />}
        badge="VÍZSZINTES"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A vízszintes eltolás a diákok leggyakoribb hibaforrása. Ha a változóból kivonunk vagy hozzáadunk:
          <code>g(x) = f(x - u)</code>, a grafikon vízszintesen elcsúszik az x-tengely mentén.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <h4 className="text-sm font-black text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
              <span>Jobbra tolás: f(x - u), ahol u &gt; 0</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Példa: <code>g(x) = (x - 3)²</code> vagy <code>g(x) = |x - 3|</code>.
              A zárójelben <strong>mínuszjel</strong> áll, de a grafikon <strong>jobbra</strong> (+ irányba) tolódik 3 egységgel!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800">
            <h4 className="text-sm font-black text-sky-800 dark:text-sky-300 mb-1 flex items-center gap-1.5">
              <span>Balra tolás: f(x + u), ahol u &gt; 0</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Példa: <code>g(x) = (x + 5)²</code> vagy <code>g(x) = √(x + 5)</code>.
              A zárójelben <strong>pluszjel</strong> áll, de a grafikon <strong>balra</strong> (- irányba) tolódik 5 egységgel!
            </p>
          </div>
        </div>

        <TheoryTrapBox title="Miért tolódik balra, ha pluszjel van a zárójelben?">
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            Gondold végig a nullázódás logikáját! Az <code>f(x) = x²</code> függvény a <strong>0</strong> helyen veszi fel a legkisebb értékét: <code>0² = 0</code>.
          </p>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 mt-1.5">
            Hol veszi fel a nullát a <code>g(x) = (x + 4)²</code> függvény? Akkor lesz a zárójel belseje nulla, ha <code>x + 4 = 0 ⟹ x = -4</code>!
            Tehát az eredetileg <code>0</code>-nál lévő csúcspont most <strong>4-gyel balrább</strong>, a <code>-4</code> helyre került!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. SZEKCIÓ: EGYÜTTES ELTOLÁS VEKTORRAL */}
      <TheorySection
        number={4}
        title="Együttes eltolás v(u; c) vektorral: g(x) = f(x - u) + c"
        icon={<Move className="w-5 h-5 text-purple-500" />}
        badge="VEKTOROS ELTOLÁS"
        badgeColor="purple"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ha egyszerre alkalmazunk vízszintes és függőleges eltolást, a sík geometriájában ez egy 
          <strong>v(u; c) eltolásvektorral</strong> való elmozgatásnak felel meg!
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
          <GeneralShiftVectorSvg size={280} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <TheoryCard title="A pontok transzformációs képlete">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha az eredeti <code>f</code> függvény grafikonjának egy pontja <code>P(x; y)</code>,
              akkor a <code>g(x) = f(x - u) + c</code> függvény grafikonján a megfelelő pont:
            </p>
            <div className="my-2 p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center font-bold text-xs text-purple-900 dark:text-purple-200">
              <MathText>P(x; y) \longmapsto P'(x + u; y + c)</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Példa: Ha az <code>f(x) = x²</code> tartalmazza a <code>(2; 4)</code> pontot, akkor a <code>g(x) = (x - 3)² + 5</code> függvényben <code>u = 3, c = 5</code>, így a megfelelő eltolt pont: <code>(2 + 3; 4 + 5) = (5; 9)</code>!
            </p>
          </TheoryCard>

          <TheoryCard title="Kitüntetett pontok gyors leolvasása">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A függvény hozzárendelési szabályából az eltolásvektor és a jellegzetes pont közvetlenül leolvasható:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mt-2">
              <li><strong>Másodfokú:</strong> <code>(x - 2)² + 7 ⟹ T(2; 7)</code> csúcspont</li>
              <li><strong>Abszolútérték:</strong> <code>|x + 4| - 3 ⟹ V(-4; -3)</code> töréspont</li>
              <li><strong>Négyzetgyök:</strong> <code>√(x - 5) + 1 ⟹ K(5; 1)</code> kezdőpont</li>
              <li><strong>Hiperbola:</strong> <code>1/(x - 1) + 4 ⟹ C(1; 4)</code> aszimptota-metszéspont</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABOR 1: PÁRHUZAMOS ELTOLÁS SZIMULÁTOR */}
      <TheorySection
        number={5}
        title="Interaktív Labor 1: Univerzális Párhuzamos Eltolás Szimulátor"
        icon={<Sliders className="w-5 h-5 text-indigo-500" />}
        badge="INTERAKTÍV SZIMULÁCIÓ"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Válassz alapfüggvényt, majd mozgasd a vízszintes (u) és függőleges (c) csúszkákat!
          Figyeld meg, hogyan változik a hozzárendelési szabály, a kitüntetett pont, az értelmezési tartomány és az értékkészlet!
        </p>

        {/* Függvénytípus választó gombok */}
        <div className="flex flex-wrap gap-2 my-3">
          {[
            { id: 'parabola', label: 'Másodfokú: f(x) = x²', icon: '📈' },
            { id: 'abs', label: 'Abszolútérték: f(x) = |x|', icon: '✌️' },
            { id: 'sqrt', label: 'Négyzetgyök: f(x) = √x', icon: '🌱' },
            { id: 'reciprocal', label: 'Reciprok: f(x) = 1/x', icon: '⚡' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFnType(item.id as FunctionType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                fnType === item.id
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vezérlők */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-amber-600 dark:text-amber-400">Vízszintes eltolás (u - x-tengely):</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
                    u = {shiftU > 0 ? `+${shiftU}` : shiftU} {shiftU > 0 ? '(jobbra)' : shiftU < 0 ? '(balra)' : '(origó)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={shiftU}
                  onChange={(e) => setShiftU(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-emerald-600 dark:text-emerald-400">Függőleges eltolás (c - y-tengely):</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                    c = {shiftC > 0 ? `+${shiftC}` : shiftC} {shiftC > 0 ? '(fel)' : shiftC < 0 ? '(le)' : '(origó)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={shiftC}
                  onChange={(e) => setShiftC(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Számított adatok táblácska */}
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transzformált képlet:</span>
                  <span className="font-mono font-black text-cyan-600 dark:text-cyan-400 text-sm">
                    {getFormulaString(fnType, shiftU, shiftC)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Eltolásvektor:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                    v({shiftU}; {shiftC})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{pointName}:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {pointLetter}({shiftU}; {shiftC})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Értelmezési tartomány (Df):</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {domainStr}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Értékkészlet (Rf):</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {rangeStr}
                  </span>
                </div>
              </div>
            </div>

            {/* Dinamikus SVG előnézet */}
            <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="-90 -90 180 180" width={220} height={220} className="overflow-visible select-none drop-shadow-sm">
                <line x1="-80" y1="0" x2="80" y2="0" stroke="#94a3b8" strokeWidth="1" />
                <line x1="0" y1="80" x2="0" y2="-80" stroke="#94a3b8" strokeWidth="1" />
                <text x="74" y="12" fill="#64748b" fontSize="8">x</text>
                <text x="-10" y="-72" fill="#64748b" fontSize="8">y</text>

                {/* SVG koordinátatranszformáció: 1 egység = 15 px, y invertált */}
                {(() => {
                  const pxU = shiftU * 15;
                  const pxC = -shiftC * 15;

                  if (fnType === 'parabola') {
                    return (
                      <path
                        d={`M ${pxU - 45} ${pxC - 60} Q ${pxU} ${pxC + 60} ${pxU + 45} ${pxC - 60}`}
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                      />
                    );
                  } else if (fnType === 'abs') {
                    return (
                      <path
                        d={`M ${pxU - 50} ${pxC - 50} L ${pxU} ${pxC} L ${pxU + 50} ${pxC - 50}`}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2.5"
                      />
                    );
                  } else if (fnType === 'sqrt') {
                    return (
                      <path
                        d={`M ${pxU} ${pxC} Q ${pxU + 25} ${pxC - 20} ${pxU + 60} ${pxC - 35}`}
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                    );
                  } else {
                    // Reciprocal
                    return (
                      <>
                        <line x1={pxU} y1="-80" x2={pxU} y2="80" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
                        <line x1="-80" y1={pxC} x2="80" y2={pxC} stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
                        <path d={`M ${pxU + 4} ${pxC - 60} Q ${pxU + 10} ${pxC - 10} ${pxU + 60} ${pxC - 4}`} fill="none" stroke="#f59e0b" strokeWidth="2" />
                        <path d={`M ${pxU - 4} ${pxC + 60} Q ${pxU - 10} ${pxC + 10} ${pxU - 60} ${pxC + 4}`} fill="none" stroke="#f59e0b" strokeWidth="2" />
                      </>
                    );
                  }
                })()}

                {/* Kitüntetett pont */}
                <circle cx={shiftU * 15} cy={-shiftC * 15} r="3.5" fill="#0284c7" />
              </svg>
              <span className="text-[11px] text-slate-500 mt-2 font-mono">
                {pointLetter}({shiftU}; {shiftC})
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: TOVÁBBI FÜGGVÉNYCSALÁDOK */}
      <TheorySection
        number={6}
        title="Párhuzamos eltolások más függvénycsaládokon: Abszolútérték és Négyzetgyök"
        icon={<Layers className="w-5 h-5 text-teal-500" />}
        badge="FÜGGVÉNYCSALÁDOK"
        badgeColor="teal"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A transzformációk szépsége, hogy pontosan ugyanazok a szabályok érvényesek minden függvényre.
          Nézzük meg a két legfontosabb középiskolai alapfüggvény viselkedését!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2 uppercase text-center">
              Abszolútérték-függvény eltolása
            </h4>
            <AbsFunctionShiftSvg size={240} />
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p>• <strong>Alapfüggvény:</strong> <code>f(x) = |x|</code>, V-alakú grafikon, töréspont <code>V(0; 0)</code>.</p>
              <p>• <strong>Eltolt alak:</strong> <code>g(x) = |x - u| + c</code>.</p>
              <p>• <strong>Új töréspont:</strong> <code>V(u; c)</code>.</p>
              <p>• <strong>Értékkészlet:</strong> <code>Rf = [c; ∞[</code>.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2 uppercase text-center">
              Négyzetgyökfüggvény eltolása
            </h4>
            <SqrtFunctionShiftSvg size={240} />
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p>• <strong>Alapfüggvény:</strong> <code>f(x) = √x</code>, kezdőpont <code>K(0; 0)</code>, félig fekvő parabolaív.</p>
              <p>• <strong>Eltolt alak:</strong> <code>g(x) = √(x - u) + c</code>.</p>
              <p>• <strong>Új kezdőpont:</strong> <code>K(u; c)</code>.</p>
              <p>• <strong>Értelmezési tartomány:</strong> <code>x - u ≥ 0 ⟹ Dg = [u; ∞[</code>!</p>
              <p>• <strong>Értékkészlet:</strong> <code>Rg = [c; ∞[</code>.</p>
            </div>
          </div>
        </div>

        <TheoryCallout title="Különleges észrevétel: Mi történik a lineáris függvénynél?" variant="tip">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Mi történik, ha az <code>f(x) = x</code> egyenest toljuk el vízszintesen <code>u</code>-val, vagy függőlegesen <code>c</code>-vel?
            <code>g(x) = (x - u) = x - u</code>, míg <code>h(x) = x + c</code>!
            Mivel az egyenes meredeksége 1, a <strong>jobbra tolás 3 egységgel</strong> (<code>x - 3</code>) <em>ugyanazt a grafikont</em> eredményezi, mint a <strong>lefelé tolás 3 egységgel</strong>!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 7. SZEKCIÓ: TIPIKUS CSAPDÁK ÉS VIZSGATIPPJEK */}
      <TheorySection
        number={7}
        title="Tipikus buktatók és vizsgatrükkök"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="CSAPDÁK & TIPPJEK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Csapda: A gyökjel vagy abszolútérték „kilógása”">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Gyakori hiba a füzetben vagy dolgozatban, hogy a diák nem húzza el a gyökjelet a konstans fölé, vagy fordítva:
            </p>
            <div className="my-1.5 p-2 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono">
              <span className="text-rose-600 font-bold">√(x + 4)</span> &nbsp;≠&nbsp; <span className="text-blue-600 font-bold">√x + 4</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az első <strong>balra tol 4-gyel</strong> (belső!), a második <strong>felfelé tol 4-gyel</strong> (külső!). Hatalmas különbség az érettségin!
            </p>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Csapda: Negatív előjel a zárójel előtt: -(x - 2)² + 3">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Ha a zárójel előtt mínuszjel van, az a parabola lefelé nyílását (x-tengelyre tükrözését) jelenti.
              A csúcspont koordinátáit ez <strong>nem változtatja meg</strong>: <code>T(2; 3)</code> marad, de az értékkészlet megfordul:
              <code>Rf = ]-∞; 3]</code>, és minimum helyett <strong>maximuma</strong> lesz!
            </p>
          </TheoryTrapBox>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
          <h4 className="text-sm font-bold text-cyan-900 dark:text-cyan-200 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-600" />
            Összefoglaló lépések tetszőleges függvény ábrázolásához
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <li><strong>Azonosítsd az alapfüggvényt!</strong> (pl. <code>x²</code>, <code>|x|</code>, <code>√x</code>)</li>
            <li><strong>Keresd meg a belső tagot (u)!</strong> Ez a vízszintes eltolás ellentétes előjellel.</li>
            <li><strong>Keresd meg a külső tagot (c)!</strong> Ez a függőleges eltolás változatlan előjellel.</li>
            <li><strong>Jelöld be a kitüntetett pontot:</strong> <code>(u; c)</code>!</li>
            <li><strong>Rajzold meg a formát a kitüntetett pontból kiindulva!</strong> (pl. parabolánál páratlan lépésekkel: 1, 3, 5).</li>
          </ol>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

