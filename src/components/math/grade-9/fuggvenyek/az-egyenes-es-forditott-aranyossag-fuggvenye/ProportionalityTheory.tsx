import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  DirectProportionalitySvg,
  InverseProportionalitySvg,
  ProportionalityComparisonSvg,
  HyperbolaBranchesSvg
} from './ProportionalityFigures';
import {
  TrendingUp,
  Shuffle,
  Sliders,
  Scale,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface ProportionalityTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ProportionalityTheory: React.FC<ProportionalityTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ARÁNYOSSÁGI LABOR ÁLLAPOTOK ---
  const [propType, setPropType] = useState<'direct' | 'inverse'>('inverse');
  const [factorK, setFactorK] = useState<number>(2); // k értéke (-4 .. 4, kivéve 0)

  // x mintaértékek az értéktáblázathoz
  const sampleX = [-4, -2, -1, 0.5, 1, 2, 4];

  const tableData = useMemo(() => {
    return sampleX.map((x) => {
      if (propType === 'direct') {
        const y = factorK * x;
        const ratio = (y / x).toFixed(1);
        return { x, y: Number(y.toFixed(2)), checkLabel: 'y / x', checkValue: ratio };
      } else {
        const y = factorK / x;
        const product = (x * y).toFixed(1);
        return { x, y: Number(y.toFixed(2)), checkLabel: 'x · y', checkValue: product };
      }
    });
  }, [propType, factorK]);

  // Koordináta transzformáció: SVG 320 x 240, origó (160, 120), 1 egység = 26px
  const toSvgX = (x: number) => 160 + x * 26;
  const toSvgY = (y: number) => 120 - y * 26;

  // Matematikailag pontos hiperbola pontok generálása az interaktív SVG-hez sima exponenciális skálázással
  const getHyperbolaPath = (k: number, isPositiveX: boolean) => {
    const points: [number, number][] = [];
    const c = Math.sqrt(Math.abs(k));
    const uMin = -2.1;
    const uMax = 2.1;
    const steps = 44;

    for (let i = 0; i <= steps; i++) {
      const u = uMin + (uMax - uMin) * (i / steps);
      const absX = c * Math.exp(u);
      const x = isPositiveX ? absX : -absX;
      const y = k / x;

      if (Math.abs(y) <= 4.4 && Math.abs(x) <= 5.2) {
        points.push([toSvgX(x), toSvgY(y)]);
      }
    }

    if (points.length < 2) return '';
    return points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  };

  return (
    <TheoryTemplate
      title="7. Az egyenes és fordított arányosság függvénye"
      subtitle="A két legfontosabb természettudományos alapmodell: állandó hányados, állandó szorzat, egyenes és kétágú hiperbola"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: "Az arányosságok alapszabálya",
        formula: "Egyenes: y / x = k (állandó hányados) | Fordított: x · y = k (állandó szorzat)",
        align: "right"
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS ÖSSZEHASONLÍTÁS
      ========================================================================= */}
      <TheorySection
        title="1. A két alapvető arányossági típus áttekintése"
        subtitle="Hogyan változik az egyik mennyiség, amikor a másikat növeljük?"
        icon={<Scale className="w-6 h-6 text-indigo-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            <p>
              A természettudományokban, a fizikai törvényekben és a mindennapi életben a mennyiségek közötti kapcsolatok túlnyomó többsége két nagy alaptípusba sorolható:
              vagy <strong>együtt mozognak arányosan</strong>, vagy <strong>egymással ellentétesen</strong> változnak.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Egyenes kártya */}
              <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl space-y-1.5">
                <span className="text-xs font-black text-sky-800 dark:text-sky-300 uppercase tracking-wider block">
                  Egyenes arányosság
                </span>
                <p className="text-xs text-sky-950 dark:text-sky-100 font-mono font-bold">f(x) = k · x &nbsp;(k ≠ 0)</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  Ha $x$ értéke $n$-szeresére nő, $y$ értéke is pontosan $n$-szeresére nő.
                  <br />
                  <strong className="text-sky-700 dark:text-sky-300">Állandó a hányadosuk:</strong> <code className="font-bold">y / x = k</code>.
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Grafikonja: origón átmenő egyenes vonal.
                </p>
              </div>

              {/* Fordított kártya */}
              <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-xl space-y-1.5">
                <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
                  Fordított arányosság
                </span>
                <p className="text-xs text-purple-950 dark:text-purple-100 font-mono font-bold">g(x) = k / x &nbsp;(k ≠ 0)</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  Ha $x$ értéke $n$-szeresére nő, $y$ értéke az $n$-ed részére csökken.
                  <br />
                  <strong className="text-purple-700 dark:text-purple-300">Állandó a szorzatuk:</strong> <code className="font-bold">x · y = k</code>.
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Grafikonja: kétágú hiperbola görbe.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 sm:p-4 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <ProportionalityComparisonSvg className="w-full max-w-[360px] h-auto" />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 text-center font-medium">
              Origón átmenő egyenes (y = k · x) vs. Kétágú hiperbola (y = k / x)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: A FORDÍTOTT ARÁNYOSSÁG ÉS A HIPERBOLA MÉLYREHATÓ ELEMZÉSE
      ========================================================================= */}
      <TheorySection
        title="2. A fordított arányosság és a hiperbola tulajdonságai"
        subtitle="Miért nem érheti el soha a tengelyeket a hiperbola, és hogyan viselkedik k > 0 és k < 0 esetén?"
        icon={<Shuffle className="w-6 h-6 text-purple-500" />}
      >
        <TheoryCard
          title="A g(x) = k / x függvény geometriája és aszimptotái"
          icon={<Shuffle className="w-5 h-5 text-purple-500" />}
        >
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
            <p>
              A fordított arányosság alapfüggvénye a <strong className="text-purple-600 dark:text-purple-400 font-mono text-sm">g(x) = k / x</strong> ($k \ne 0$). Ennek a függvénynek a grafikonja egy <strong>kétágú hiperbola</strong>, amely gyökeresen eltér az egyenesektől és a paraboláktól.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="shrink-0 flex justify-center w-full md:w-auto">
                <InverseProportionalitySvg className="w-full max-w-[320px] h-auto" />
              </div>
              <div className="space-y-3">
                <h5 className="font-bold text-sm text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  A 4 legfontosabb matematikai alapszabály:
                </h5>
                <ul className="space-y-2 list-disc pl-4 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong className="text-rose-600 dark:text-rose-400">1. Az x = 0 tiltott hely (Függőleges aszimptota):</strong> Nullával osztani tilos, így a 0-ban a függvény nincs értelmezve: <span className="font-mono font-bold text-slate-900 dark:text-white">D_g = ℝ \ &#123;0&#125;</span>. Ahogy $x$ közeledik a 0-hoz, az $y$ értékek robbanásszerűen nőnek vagy csökkennek ($\pm\infty$).
                  </li>
                  <li>
                    <strong className="text-rose-600 dark:text-rose-400">2. Az y = 0 értéket sosem veheti fel (Vízszintes aszimptota):</strong> Mivel a tört számlálója $k \ne 0$, egy tört csak akkor lenne 0, ha a számlálója 0 lenne. Így <span className="font-mono font-bold text-slate-900 dark:text-white">R_g = ℝ \ &#123;0&#125;</span>, a görbe sosem érheti el az $x$-tengelyt sem!
                  </li>
                  <li>
                    <strong className="text-emerald-600 dark:text-emerald-400">3. Középpontos szimmetria az origóra (Páratlan függvény):</strong>
                    <br />
                    Mivel {'$g(-x) = \\frac{k}{-x} = -\\frac{k}{x} = -g(x)$'}, a grafikon az origóra tükrözve önmagába megy át.
                  </li>
                  <li>
                    <strong className="text-amber-600 dark:text-amber-400">4. Szakaszos monotonitás (Klasszikus diákcsapda!):</strong>
                    <br />
                    Ha $k &gt; 0$, a függvény <em>nem</em> a teljes értelmezési tartományán csökken (hiszen $x = -1$-nél $y = -k$, míg $x = 1$-nél $y = +k$, ami ugrásszerű növekedés!). Helyesen: <strong>külön-külön</strong> a $]-\infty; 0[$ és a $]0; \infty[$ nyílt intervallumokon szigorúan monoton csökkenő!
                  </li>
                </ul>
              </div>
            </div>

            {/* k előjelének hatása + ábra */}
            <div className="pt-2">
              <div className="flex flex-col lg:flex-row items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="space-y-3 flex-1">
                  <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    A k arányossági tényező előjele határozza meg a síknegyedeket:
                  </h5>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900">
                      <strong className="text-purple-800 dark:text-purple-300 block mb-0.5">Ha k &gt; 0 (Pozitív, pl. g(x) = 4/x):</strong>
                      <span className="text-slate-700 dark:text-slate-300 text-xs">
                        Az I. és III. síknegyedben helyezkedik el. Mindkét ágán balról jobbra szigorúan monoton csökkenő.
                      </span>
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-900">
                      <strong className="text-rose-800 dark:text-rose-300 block mb-0.5">Ha k &lt; 0 (Negatív, pl. g(x) = -4/x):</strong>
                      <span className="text-slate-700 dark:text-slate-300 text-xs">
                        A II. és IV. síknegyedben helyezkedik el. Mindkét ágán balról jobbra szigorúan monoton növekvő.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 flex justify-center w-full lg:w-auto">
                  <HyperbolaBranchesSvg className="w-full max-w-[340px] h-auto" />
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: INTERAKTÍV ARÁNYOSSÁGI ÉS HIPERBOLA LABOR
      ========================================================================= */}
      <TheorySection
        title="3. Interaktív Arányossági és Hiperbola Labor"
        subtitle="Válts típust, állítsd a k arányossági tényezőt, és nézd meg a valódi, precíz hiperbola viselkedését!"
        icon={<Sliders className="w-6 h-6 text-indigo-500" />}
      >
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Típusválasztó */}
            <div className="space-y-3 bg-slate-800/90 p-4 rounded-xl border border-slate-700">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Függvény típusa:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPropType('direct')}
                  className={`p-3 text-xs font-bold rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    propType === 'direct'
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                      : 'bg-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Egyenes arányosság</span>
                  <span className="text-[10px] font-normal opacity-90">f(x) = {factorK} · x</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPropType('inverse')}
                  className={`p-3 text-xs font-bold rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    propType === 'inverse'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Fordított arányosság</span>
                  <span className="text-[10px] font-normal opacity-90">g(x) = {factorK} / x</span>
                </button>
              </div>
            </div>

            {/* k tényező csúszka */}
            <div className="space-y-3 bg-slate-800/90 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Arányossági tényező (k):
                </label>
                <span className={`font-mono font-black text-sm px-2.5 py-0.5 rounded ${
                  factorK > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  k = {factorK}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={factorK}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setFactorK(val === 0 ? (factorK < 0 ? 1 : -1) : val);
                }}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>k = -4 ({propType === 'inverse' ? 'II. és IV. negyed' : 'csökkenő'})</span>
                <span>k = +4 ({propType === 'inverse' ? 'I. és III. negyed' : 'növekvő'})</span>
              </div>
              <p className="text-xs text-slate-300">
                {propType === 'inverse'
                  ? factorK > 0
                    ? 'k > 0: A kétágú hiperbola az I. és III. síknegyedben halad át (szakaszonként csökken).'
                    : 'k < 0: A kétágú hiperbola a II. és IV. síknegyedben halad át (szakaszonként növekszik).'
                  : factorK > 0
                    ? 'k > 0: Növekvő egyenes, átmegy az origón (0; 0).'
                    : 'k < 0: Csökkenő egyenes, átmegy az origón (0; 0).'}
              </p>
            </div>
          </div>

          {/* Grafikon és Értéktáblázat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon (Precíz poliline generálással!) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
              <svg
                width={320}
                height={240}
                viewBox="0 0 320 240"
                className="select-none bg-slate-900/90 rounded-lg"
              >
                {/* Rácsvonalak */}
                {[-4, -3, -2, -1, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`rx-${i}`}
                    x1={toSvgX(i)}
                    y1={10}
                    x2={toSvgX(i)}
                    y2={230}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                ))}
                {[-4, -3, -2, -1, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`ry-${i}`}
                    x1={20}
                    y1={toSvgY(i)}
                    x2={300}
                    y2={toSvgY(i)}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                ))}

                {/* Főtengelyek */}
                <line x1={20} y1={120} x2={300} y2={120} stroke="#64748b" strokeWidth="2" />
                <line x1={160} y1={10} x2={160} y2={230} stroke="#64748b" strokeWidth="2" />
                <text x={295} y={115} fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
                <text x={166} y={22} fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>
                <text x={164} y={134} fill="#64748b" fontSize="10">0</text>

                {/* Egyenes arányosság */}
                {propType === 'direct' && (
                  <>
                    <line
                      x1={toSvgX(-4.2)}
                      y1={toSvgY(factorK * -4.2)}
                      x2={toSvgX(4.2)}
                      y2={toSvgY(factorK * 4.2)}
                      stroke="#38bdf8"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Origó kiemelve */}
                    <circle cx={160} cy={120} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                    {/* Mintapontok */}
                    {sampleX.map((xVal) => {
                      const yVal = factorK * xVal;
                      if (yVal < -4.2 || yVal > 4.2) return null;
                      return (
                        <circle
                          key={`pt-${xVal}`}
                          cx={toSvgX(xVal)}
                          cy={toSvgY(yVal)}
                          r={4}
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </>
                )}

                {/* Fordított arányosság: Precíz matematikai hiperbola ágak */}
                {propType === 'inverse' && (
                  <>
                    {/* Jobb oldali ág (x > 0) */}
                    <path
                      d={getHyperbolaPath(factorK, true)}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Bal oldali ág (x < 0) */}
                    <path
                      d={getHyperbolaPath(factorK, false)}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />

                    {/* Aszimptoták kiemelése a tengelyeken */}
                    <line x1={20} y1={120} x2={300} y2={120} stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6" />
                    <line x1={160} y1={10} x2={160} y2={230} stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6" />

                    {/* Mintapontok a hiperbolán */}
                    {sampleX.map((xVal) => {
                      const yVal = factorK / xVal;
                      if (Math.abs(yVal) > 4.2) return null;
                      return (
                        <circle
                          key={`pt-inv-${xVal}`}
                          cx={toSvgX(xVal)}
                          cy={toSvgY(yVal)}
                          r={4}
                          fill="#c084fc"
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </>
                )}
              </svg>

              <div className="flex items-center gap-4 text-xs mt-3 text-slate-300 font-medium">
                {propType === 'direct' ? (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" /> Egyenes vonal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Áthalad az O(0; 0) origón
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-purple-400 inline-block" /> Kétágú szabályos hiperbola
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                      x = 0 és y = 0 aszimptoták!
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Értéktáblázat és Állandóság ellenőrzése */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {propType === 'direct' ? 'Állandó hányados vizsgálata:' : 'Állandó szorzat vizsgálata:'}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    k = {factorK}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-center font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/50">
                        <th className="py-1 px-2 font-bold">x</th>
                        <th className="py-1 px-2 font-bold">y</th>
                        <th className="py-1 px-2 font-bold text-purple-400">
                          {propType === 'direct' ? 'y / x' : 'x · y'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300">
                      {tableData.map((row) => (
                        <tr key={`row-${row.x}`} className="hover:bg-slate-700/50">
                          <td className="py-1 px-2 font-semibold text-white">{row.x}</td>
                          <td className="py-1 px-2">{row.y}</td>
                          <td className="py-1 px-2 font-bold text-emerald-400 bg-emerald-500/10">
                            {row.checkValue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-400 italic text-center">
                  {propType === 'direct'
                    ? 'Minden pontnál y / x = k, a hányados konstans!'
                    : 'Minden pontnál x · y = k, a szorzat konstans!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: GYAKORLATI FELADATOK ÉS ÉLETSZERŰ ALKALMAZÁSOK
      ========================================================================= */}
      <TheorySection
        title="4. Életszerű alkalmazások és mintafeladatok"
        subtitle="Hogyan ismerjük fel és oldjuk meg a hétköznapi arányossági problémákat?"
        icon={<BookOpen className="w-6 h-6 text-emerald-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Munkás feladat */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <span className="font-bold text-purple-700 dark:text-purple-300 text-sm block">
              1. Feladat: Munkások és munkaidő (Fordított arányosság)
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              6 festő 4 nap alatt festi ki egy iskola tantermeit. Hány nap alatt végezne ugyanezzel a munkával 3 festő, illetve 8 festő (azonos munkatempó mellett)?
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900 space-y-1 font-mono text-slate-700 dark:text-slate-300">
              <p className="text-purple-800 dark:text-purple-400 font-bold">1. Lépés: Állandó szorzat meghatározása</p>
              <p>k = 6 festő · 4 nap = <strong>24 ember-nap</strong></p>
              <p className="text-purple-800 dark:text-purple-400 font-bold mt-2">2. Lépés: Kiszámítás a kérdezett létszámokra</p>
              <p>• 3 festő: t = 24 / 3 = <strong className="text-emerald-600 dark:text-emerald-400">8 nap</strong> (fele annyi ember ➔ kétszer annyi idő!)</p>
              <p>• 8 festő: t = 24 / 8 = <strong className="text-emerald-600 dark:text-emerald-400">3 nap</strong></p>
            </div>
          </div>

          {/* Sebesség feladat */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <span className="font-bold text-sky-700 dark:text-sky-300 text-sm block">
              2. Feladat: Sebesség és menetidő (Fordított arányosság)
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              Egy autóbusz Szegedről Budapestre utazik (a távolság $s = 160$ km). Mennyi a menetidő 80 km/h, illetve 100 km/h átlagsebesség mellett?
            </p>
            <div className="p-3 bg-sky-50 dark:bg-sky-950/30 rounded-lg border border-sky-200 dark:border-sky-900 space-y-1 font-mono text-slate-700 dark:text-slate-300">
              <p className="text-sky-800 dark:text-sky-400 font-bold">1. Lépés: Fizikai összefüggés</p>
              <p>s = v · t = állandó 160 km ⟹ t(v) = 160 / v</p>
              <p className="text-sky-800 dark:text-sky-400 font-bold mt-2">2. Lépés: Menetidők számítása</p>
              <p>• v = 80 km/h: t = 160 / 80 = <strong className="text-emerald-600 dark:text-emerald-400">2,0 óra (120 perc)</strong></p>
              <p>• v = 100 km/h: t = 160 / 100 = <strong className="text-emerald-600 dark:text-emerald-400">1,6 óra (96 perc)</strong></p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: GYAKORI TÉVEDÉSEK ÉS BUKTATÓK
      ========================================================================= */}
      <TheorySection
        title="5. Gyakori tévedések és érettségi csapdák"
        subtitle="Ezeket a hibákat kerüld el az arányossági feladatok megoldásakor!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Fordított arányosság grafikonja NEM egyenes"
            trap="Sokan úgy gondolják, mivel a fordított arányosságban ha x nő, y csökken, a grafikon egy lefelé tartó ferde egyenes."
            solution="A lefelé tartó egyenes lineáris függvény (f(x) = -mx + b). A fordított arányosság grafikonja GÖRBÜLT KÉTÁGÚ HIPERBOLA, mert a szorzat állandó!"
          />
          <TheoryTrapBox
            title="2. Nullával való osztás a fordított arányosságnál"
            trap="A g(x) = 6/x függvénynél x = 0 behelyettesítése és a (0; 0) pont bejelölése a grafikonon."
            solution="Nullával osztani szigorúan tilos! D_g = ℝ \ {0}. A grafikon soha nem éri el a koordinátatengelyeket, csak végtelenül hozzájuk simul (aszimptoták)."
          />
          <TheoryTrapBox
            title="3. Összeg-állandóság összekeverése a szorzattal"
            trap="Egy 10 méteres kötelet két részre vágunk (x + y = 10 ➔ y = 10 - x). Ez vajon fordított arányosság?"
            solution="NEM! Itt az összeg állandó (x + y = 10), nem a szorzat! Ha az egyik hosszúság 1-ről 2-re duplázódik, a másik 9-ről 8-ra csökken (nem a felére!). Ez lineáris kapcsolat."
          />
          <TheoryTrapBox
            title="4. Negatív arányossági tényező negyedei"
            trap="A g(x) = -4/x függvény grafikonját automatikusan az I. és III. síknegyedbe rajzoljuk."
            solution="Ha k < 0, pozitív x-hez negatív y tartozik (IV. negyed), negatív x-hez pozitív y tartozik (II. negyed). A hiperbola ágai a II. és IV. negyedben helyezkednek el!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          6. SZEKCIÓ: RÉSZLETES ÖSSZEHASONLÍTÓ TÁBLÁZAT
      ========================================================================= */}
      <TheorySection
        title="6. Részletes arányossági nagytáblázat"
        subtitle="Minden lényeges tulajdonság egy helyen a dolgozatokhoz és az érettségihez"
        icon={<Lightbulb className="w-6 h-6 text-indigo-500" />}
      >
        <TheoryTable
          headers={['Tulajdonság', 'Egyenes arányosság', 'Fordított arányosság']}
          rows={[
            ['Hozzárendelési szabály', 'f(x) = k · x (k ≠ 0)', 'g(x) = k / x (k ≠ 0)'],
            ['Állandó matematikai kapcsolat', 'Hányados állandó: y / x = k', 'Szorzat állandó: x · y = k'],
            ['Értelmezési tartomány (D)', 'D_f = ℝ (minden valós szám)', 'D_g = ℝ \\ {0} (0 kivételével minden valós)'],
            ['Értékkészlet (R)', 'R_f = ℝ (minden valós szám)', 'R_g = ℝ \\ {0} (0 kivételével minden valós)'],
            ['Grafikon alakja', 'Origón átmenő egyenes', 'Kétágú hiperbola'],
            ['Síknegyedek (k > 0 esetén)', 'I. és III. síknegyed (szigorúan növekvő)', 'I. és III. síknegyed (szakaszosan csökkenő)'],
            ['Síknegyedek (k < 0 esetén)', 'II. és IV. síknegyed (szigorúan csökkenő)', 'II. és IV. síknegyed (szakaszosan növekvő)'],
            ['Szimmetria', 'Origóra középpontosan szimmetrikus (páratlan)', 'Origóra középpontosan szimmetrikus (páratlan)'],
            ['Aszimptoták', 'Nincsenek aszimptotái', 'x = 0 (függőleges) és y = 0 (vízszintes)'],
            ['Hétköznapi példa', 'Vásárolt áru mennyisége és ára, út egyenletes sebességnél', 'Ugyanazon munka elvégzése több munkással, sebesség és menetidő']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
