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
  BaseAbsValueSvg,
  TransformedAbsValueSvg,
  NegativeAbsValueSvg
} from './AbsValueFigures';
import {
  Split,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight,
  Calculator,
  Target,
  Sparkles
} from 'lucide-react';

interface AbsValueTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const AbsValueTheory: React.FC<AbsValueTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ABSZOLÚTÉRTÉK-TRANSZFORMÁLÓ LABOR ---
  const [paramA, setParamA] = useState<number>(1); // szár meredekség / nyílás iránya
  const [paramU, setParamU] = useState<number>(2); // vízszintes eltolás
  const [paramV, setParamV] = useState<number>(-1); // függőleges eltolás

  // Zérushelyek számítása: a|x - u| + v = 0 -> |x - u| = -v / a
  const zeroInfo = useMemo(() => {
    if (paramA === 0) return { count: 0, points: [] };
    const rhs = -paramV / paramA;
    if (rhs < 0) {
      return { count: 0, points: [] };
    } else if (rhs === 0) {
      return { count: 1, points: [paramU] };
    } else {
      const z1 = paramU - rhs;
      const z2 = paramU + rhs;
      return { count: 2, points: [Number(z1.toFixed(2)), Number(z2.toFixed(2))] };
    }
  }, [paramA, paramU, paramV]);

  // y-tengelymetszet: f(0) = a * |-u| + v
  const yIntercept = paramA * Math.abs(-paramU) + paramV;

  // Koordináta transzformáció: SVG 320 x 240, origó (160, 120), 1 egység = 20px
  const toSvgX = (x: number) => 160 + x * 20;
  const toSvgY = (y: number) => 120 - y * 20;

  // Függvény kiértékelése adott x-re
  const evalFunc = (x: number) => paramA * Math.abs(x - paramU) + paramV;

  return (
    <TheoryTemplate
      title="10. Abszolútérték-függvény"
      subtitle="Az f(x) = |x| alapfüggvény V-alakú grafikonja, a transzformációk (f(x) = a|x - u| + v), a csúcspont koordinátái és a szélsőértékek."
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: "A V-alakú csúcspont aranyszabálya",
        formula: "f(x) = a|x - u| + v  ➔  Csúcspont: C(u; v) (belül ellentétes, kívül azonos előjel!)",
        align: "right"
      }}
    >
      {/* 1. SZEKCIÓ: AZ ALAPFÜGGVÉNY */}
      <TheorySection
        title="Az abszolútérték-alapfüggvény: f(x) = |x|"
        subtitle="Hogyan néz ki az abszolútérték geometriai képe, és miért törik meg a vonal?"
        icon={<Split className="w-6 h-6 text-rose-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-xs">
            <p className="text-sm">
              Egy valós szám abszolút értéke a számnak a <strong>0-tól mért távolsága</strong> a számegyenesen. Mivel a távolság nem lehet negatív:
            </p>
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl font-mono text-center text-rose-950 font-bold space-y-1">
              <p>|x| = x &nbsp;(ha x ≥ 0)</p>
              <p>|x| = -x &nbsp;(ha x &lt; 0)</p>
            </div>
            <div className="space-y-1.5 text-slate-700">
              <p>• <strong>Grafikonja:</strong> Egy V-alakú törött vonal, amelynek két szára az origóban találkozik.</p>
              <p>• <strong>Csúcspontja:</strong> A töréspont pontosan az origó: <code className="font-bold text-rose-800">C(0; 0)</code>.</p>
              <p>• <strong>Értelmezési tartomány:</strong> <code className="font-bold font-mono">D_f = ℝ</code> (bármilyen szám behelyettesíthető).</p>
              <p>• <strong>Értékkészlet:</strong> <code className="font-bold font-mono">R_f = [0; +∞[</code> (csak nemnegatív kimeneteket ad!).</p>
              <p>• <strong>Szimmetria:</strong> Páros függvény, mert <code className="font-mono">|-x| = |x|</code>: szimmetrikus az y tengelyre.</p>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <BaseAbsValueSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Az f(x) = |x| alapfüggvény V-alakja és C(0; 0) csúcspontja
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV ABSZOLÚTÉRTÉK-TRANSZFORMÁLÓ LABOR */}
      <TheorySection
        title="Interaktív Abszolútérték-transzformáló Labor"
        subtitle="Módosítsd az u, v eltolásokat és az a nyújtást/tükrözést! Figyeld a csúcspont és a zérushelyek mozgását!"
        icon={<Sliders className="w-6 h-6 text-rose-500" />}
      >
        <div className="bg-gradient-to-br from-rose-50/40 via-white to-pink-50/40 p-6 rounded-2xl border border-rose-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* a meredekség / irány */}
            <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Szárak meredeksége (a):</span>
                <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${paramA > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  a = {paramA}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={paramA}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setParamA(val === 0 ? (paramA < 0 ? 0.5 : -0.5) : val);
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                {paramA > 0 ? 'a > 0: Felfelé nyíló V-alak (minimum)' : 'a < 0: Lefelé nyíló Λ-alak (maximum)'}
              </p>
            </div>

            {/* u vízszintes eltolás */}
            <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Vízszintes eltolás (u):</span>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  u = {paramU}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={paramU}
                onChange={(e) => setParamU(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                {paramU > 0 ? `|x - ${paramU}| ➔ ${paramU} egységgel JOBBRA tolva` : paramU < 0 ? `|x + ${Math.abs(paramU)}| ➔ ${Math.abs(paramU)} egységgel BALRA tolva` : 'u = 0: csúcs az y tengelyen'}
              </p>
            </div>

            {/* v függőleges eltolás */}
            <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Függőleges eltolás (v):</span>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  v = {paramV}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={paramV}
                onChange={(e) => setParamV(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                {paramV > 0 ? `${paramV} egységgel FELJELLEBB` : paramV < 0 ? `${Math.abs(paramV)} egységgel LEJEBB` : 'v = 0: csúcs az x tengelyen'}
              </p>
            </div>
          </div>

          {/* Vizualizáció + Elemzés */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-inner">
              <svg
                width={320}
                height={240}
                viewBox="0 0 320 240"
                className="select-none bg-slate-50 rounded-lg"
              >
                {/* Rács */}
                {[-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].map((i) => (
                  <line
                    key={`ax-${i}`}
                    x1={toSvgX(i)}
                    y1={10}
                    x2={toSvgX(i)}
                    y2={230}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`ay-${i}`}
                    x1={20}
                    y1={toSvgY(i)}
                    x2={300}
                    y2={toSvgY(i)}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}

                {/* Főtengelyek */}
                <line x1={20} y1={120} x2={300} y2={120} stroke="#475569" strokeWidth="2" />
                <line x1={160} y1={10} x2={160} y2={230} stroke="#475569" strokeWidth="2" />
                <text x={295} y={115} fill="#475569" fontSize="11" fontWeight="bold">x</text>
                <text x={166} y={20} fill="#475569" fontSize="11" fontWeight="bold">y</text>
                <text x={164} y={134} fill="#94a3b8" fontSize="10">0</text>

                {/* V alakú vonalak: bal szár (x < u) és jobb szár (x > u) */}
                <line
                  x1={toSvgX(-6)}
                  y1={toSvgY(evalFunc(-6))}
                  x2={toSvgX(paramU)}
                  y2={toSvgY(paramV)}
                  stroke="#e11d48"
                  strokeWidth="3"
                />
                <line
                  x1={toSvgX(paramU)}
                  y1={toSvgY(paramV)}
                  x2={toSvgX(6)}
                  y2={toSvgY(evalFunc(6))}
                  stroke="#e11d48"
                  strokeWidth="3"
                />

                {/* Csúcspont C(u; v) */}
                <circle
                  cx={toSvgX(paramU)}
                  cy={toSvgY(paramV)}
                  r={6}
                  fill="#e11d48"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={toSvgX(paramU) + 8}
                  y={toSvgY(paramV) - 8}
                  fill="#9f1239"
                  fontSize="10"
                  fontWeight="bold"
                >
                  C({paramU}; {paramV})
                </text>

                {/* Zérushelyek bejelölése */}
                {zeroInfo.points.map((zVal, idx) => {
                  if (zVal < -6 || zVal > 6) return null;
                  return (
                    <circle
                      key={`zp-${idx}`}
                      cx={toSvgX(zVal)}
                      cy={toSvgY(0)}
                      r={5}
                      fill="#d97706"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* y-tengelymetszet */}
                {yIntercept >= -5 && yIntercept <= 5 && (
                  <circle
                    cx={toSvgX(0)}
                    cy={toSvgY(yIntercept)}
                    r={4}
                    fill="#2563eb"
                  />
                )}
              </svg>
              <div className="flex items-center gap-4 text-xs mt-2 text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" /> Csúcspont C({paramU}; {paramV})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> {zeroInfo.count} zérushely
                </span>
              </div>
            </div>

            {/* Algebrai Kiértékelés */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 text-xs font-mono">
                <span className="font-sans font-bold text-slate-700 uppercase tracking-wider block text-[11px]">
                  Függvény Hozzárendelése:
                </span>
                <p className="text-base font-bold text-rose-700 font-mono">
                  f(x) = {paramA !== 1 ? (paramA === -1 ? '-' : `${paramA}·`) : ''}|x {paramU >= 0 ? `- ${paramU}` : `+ ${Math.abs(paramU)}|`} {paramV >= 0 ? `+ ${paramV}` : `- ${Math.abs(paramV)}`}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 text-slate-600 font-sans text-xs">
                  <p>• <strong>Csúcspont koordinátái:</strong> <code className="font-mono font-bold text-rose-800">C({paramU}; {paramV})</code></p>
                  <p>• <strong>Szélsőérték:</strong> {paramA > 0 ? (
                    <span>Minimum van az <code className="font-bold">x = {paramU}</code> helyen, értéke <code className="font-bold">y = {paramV}</code>.</span>
                  ) : (
                    <span>Maximum van az <code className="font-bold">x = {paramU}</code> helyen, értéke <code className="font-bold">y = {paramV}</code>.</span>
                  )}</p>
                  <p>• <strong>Értékkészlet (R_f):</strong> {paramA > 0 ? (
                    <code className="font-mono font-bold text-emerald-700">[{paramV}; +∞[</code>
                  ) : (
                    <code className="font-mono font-bold text-purple-700">]-∞; {paramV}]</code>
                  )}</p>
                  <p>• <strong>Zérushelyek száma:</strong> {zeroInfo.count === 2 ? (
                    <span className="text-amber-700 font-bold">2 zérushely: x₁ = {zeroInfo.points[0]}, x₂ = {zeroInfo.points[1]}</span>
                  ) : zeroInfo.count === 1 ? (
                    <span className="text-amber-700 font-bold">1 zérushely (érinti a tengelyt): x₀ = {zeroInfo.points[0]}</span>
                  ) : (
                    <span className="text-slate-500 font-bold">Nincs zérushely (nem metszi az x tengelyt)</span>
                  )}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A VÍZSZINTES ELTOLÁS ELŐJELSZABÁLYA */}
      <TheorySection
        title="A vízszintes eltolás előjelszabálya"
        subtitle="Miért tol jobbra a negatív előjel (|x - 3|) és balra a pozitív (|x + 2|)?"
        icon={<Compass className="w-6 h-6 text-rose-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A csúcspont logikája: Hol lesz 0 az abszolútérték belseje?"
            subtitle="|x - u| = 0 vizsgálata"
            icon={<Target className="w-5 h-5 text-rose-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>A függvény a csúcspontjában törik meg, ott, ahol az abszolútérték belseje nulla:</p>
              <div className="p-2 bg-rose-50 border border-rose-200 rounded font-mono text-center font-bold text-rose-950">
                x - u = 0 &nbsp;➔&nbsp; x = +u
              </div>
              <p>
                Tehát az <code className="font-mono font-bold">f(x) = |x - 3|</code> esetén <code className="font-mono font-bold">x = +3</code>-at kell behelyettesítenünk, hogy a belseje 0 legyen: ezért a csúcs <strong>jobbra tolódott 3 egységgel</strong>!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Gyors szabály összefoglaló"
            subtitle="Zárójelen belüli vs. zárójelen kívüli szám"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>• <strong>|x - 4|:</strong> ellentétes előjel ➔ <strong>4 egység jobbra</strong>.</p>
              <p>• <strong>|x + 5|:</strong> ellentétes előjel ➔ <strong>5 egység balra</strong>.</p>
              <p>• <strong>|x| + 3:</strong> külső szám (v) ➔ <strong>3 egység fel</strong>.</p>
              <p>• <strong>|x| - 2:</strong> külső szám (v) ➔ <strong>2 egység le</strong>.</p>
              <p className="font-bold text-rose-800 pt-1">
                A csúcspont koordinátája mindig pontosan: C(u; v)!
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: GYAKORI TÉVEDÉSEK */}
      <TheorySection
        title="Gyakori tévedések és buktatók"
        subtitle="Ezeket a hibákat kerüld el a dolgozatban!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Vízszintes eltolás rossz irányba"
            trap="Az f(x) = |x - 2| függvényt 2 egységgel balra toljuk a negatív irányba."
            solution="Az |x - 2| csúcspontja x = +2-nél van! A zárójelen belüli mínusz előjel MINDIG jobbra tolja a grafikont."
          />
          <TheoryTrapBox
            title="2. Lefelé nyíló V-alak értékkészlete"
            trap="Az f(x) = -|x| + 3 függvény értékkészletét [3; +∞[-nek írjuk."
            solution="Mivel a - előjel miatt a szárak lefelé tartanak, a csúcspont MAXIMUM: a függvényértékek 3-nál kisebbek, így R_f = ]-∞; 3]!"
          />
          <TheoryTrapBox
            title="3. Zérushelyek számának elhibázása"
            trap="Azt gondoljuk, hogy minden abszolútérték-függvénynek 2 zérushelye van."
            solution="Ha a csúcs az x tengely felett van és felfelé nyílik (pl. f(x) = |x| + 2), soha nem metszi az x tengelyt: 0 zérushelye van!"
          />
          <TheoryTrapBox
            title="4. Tükrözés vs. Eltolás sorrendje"
            trap="Az f(x) = -|x - 1| függvénynél először eltoljuk a csúcsot lefelé."
            solution="A negatív előjel tükrözést jelent a csúcspont körül (a szárak lefelé nyílnak), míg a csúcspont C(1; 0) a tengelyen marad."
          />
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        title="Abszolútérték-függvények áttekintő táblázata"
        subtitle="Képletek, csúcspontok és tulajdonságok"
        icon={<Lightbulb className="w-6 h-6 text-rose-500" />}
      >
        <TheoryTable
          headers={['Képlet', 'Csúcspont C(u; v)', 'Nyílás iránya', 'Értékkészlet (Rf)', 'Zérushelyek száma']}
          rows={[
            ['f(x) = |x|', 'C(0; 0)', 'Felfelé (V)', '[0; +∞[', '1 zérushely (x₀ = 0)'],
            ['f(x) = |x - 3| - 2', 'C(3; -2)', 'Felfelé (V)', '[-2; +∞[', '2 zérushely (x = 1, x = 5)'],
            ['f(x) = |x + 1| + 4', 'C(-1; 4)', 'Felfelé (V)', '[4; +∞[', '0 zérushely (tengely felett van)'],
            ['f(x) = -|x - 2| + 3', 'C(2; 3)', 'Lefelé (Λ)', ']-∞; 3]', '2 zérushely (x = -1, x = 5)'],
            ['f(x) = -|x| - 1', 'C(0; -1)', 'Lefelé (Λ)', ']-∞; -1]', '0 zérushely (tengely alatt van)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

