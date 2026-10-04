import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  TrendingUp,
  LineChart,
  Calculator,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  DollarSign,
  Clock,
  Layers,
  HelpCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface DirectProportionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const DirectProportionTheory: React.FC<DirectProportionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Arányossági Tényező & Grafikon Labor állapot
  const [kFactor, setKFactor] = useState<number>(2);
  const [activePreset, setActivePreset] = useState<string>('2');

  const presets = [
    { label: 'k = 0,5 (Lapos, emelkedik)', value: 0.5 },
    { label: 'k = 1 (I-III. felező)', value: 1 },
    { label: 'k = 2 (Meredek, duplázó)', value: 2 },
    { label: 'k = 3 (Gyors növekedés)', value: 3 },
    { label: 'k = -1 (II-IV. felező)', value: -1 },
    { label: 'k = -2 (Csökkenő, lejt)', value: -2 }
  ];

  // Koordináta-rendszer SVG méretezése (középpont: 150, 150; 1 egység = 25px)
  const originX = 150;
  const originY = 150;
  const unitPx = 25;

  // x pontok: -4-től +4-ig
  const lineX1 = -4.5;
  const lineY1 = kFactor * lineX1;
  const lineX2 = 4.5;
  const lineY2 = kFactor * lineX2;

  // SVG koordináták (y tengely invertált a képernyőn!)
  const svgX1 = originX + lineX1 * unitPx;
  const svgY1 = originY - lineY1 * unitPx;
  const svgX2 = originX + lineX2 * unitPx;
  const svgY2 = originY - lineY2 * unitPx;

  // Meredekség háromszög pontjai x = 0 és x = 1 vagy x = 2 között
  const stepX = 1;
  const stepY = kFactor * stepX;
  const triStartX = originX;
  const triStartY = originY;
  const triCornerX = originX + stepX * unitPx;
  const triCornerY = originY;
  const triTargetX = originX + stepX * unitPx;
  const triTargetY = originY - stepY * unitPx;

  // Táblázat adatai a kiválasztott k-ra
  const tableXValues = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <TheoryTemplate
      title="Egyenes Arányosság"
      subtitle="Két változó közötti arányos kapcsolat, az arányossági tényező (k), az y = k · x képlet és az origón átmenő egyenes grafikonja"
      badgeText="8. OSZTÁLY • VI. HOZZÁRENDELÉSEK • 📈 TANANYAG"
      documentId="direct-proportion-theory-doc"
      pdfFilename="8_osztaly_egyenes_aranyossag_tananyag.pdf"
      quickRule={{
        label: 'Alapösszefüggés',
        formula: 'y = k · x ⟺ y / x = k (k ≠ 0)'
      }}
      themeColor="cyan"
      practiceTitle="Készen állsz az egyenes arányossági feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben részletes levezetésekkel és képlettárral!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* 1. RÉSZ: AZ EGYENES ARÁNYOSSÁG FOGALMA */}
      <TheorySection
        title="1. Az Egyenes Arányosság Fogalma és Képlete"
        subtitle="Mikor mondjuk két mennyiségről, hogy egyenesen arányosak, és mit jelent az arányossági tényező?"
        icon={<TrendingUp className="w-5 h-5 text-cyan-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A mindennapi életben és a természettudományokban lépten-nyomon olyan mennyiségekkel találkozunk, amelyek szorosan összefüggenek egymással.
          Ha a boltban több kilogramm almát vásárolunk, többet fizetünk; ha egy autó kétszer akkora sebességgel halad ugyanannyi ideig, kétszer akkora utat tesz meg.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Azonos Mértékű Változás"
            badge="Definíció"
            formula="x · n ⟹ y · n"
            description="Két összefüggő mennyiség egyenesen arányos, ha ahányszorosára (2-szeresére, 3-szorosára, felére stb.) változik az egyik mennyiség, pontosan ugyanannyiszorosára változik a másik mennyiség is."
            properties={[
              'Ha x megduplázódik, y is megduplázódik',
              'Ha x harmadára csökken, y is a harmadára csökken',
              'A változás iránya és aránya azonos'
            ]}
            themeColor="cyan"
          />

          <TheoryCard
            title="Állandó Hányados és Képlet"
            badge="Algebrai Alak"
            formula="k = y / x ⟺ y = k · x"
            description="Az összetartozó értékpárok hányadosa állandó. Ezt az állandó számot arányossági tényezőnek (k) nevezzük. A hozzárendelés szabálya: x-hez hozzárendeljük a k · x értéket."
            properties={[
              'k az arányossági tényező (k ≠ 0)',
              'Ha k > 0: a két mennyiség azonos előjelű',
              'Ha x = 0, akkor y = k · 0 = 0 (mindig tartalmazza a (0; 0) értéket)'
            ]}
            themeColor="cyan"
          />
        </div>

        <TheoryCallout type="info" title="Hogyan ismerjük fel a táblázatból az egyenes arányosságot?">
          Ha egy táblázatban megadják az összetartozó x és y értékeket, oszd el az alsó sort a felsővel:{' '}
          <MathText>{"k = y / x"}</MathText>.
          Ha <strong>minden oszlopban pontosan ugyanazt a számot</strong> kapod, akkor a két mennyiség között egyenes arányosság áll fenn, és a kapott szám maga a{' '}
          <MathText>k</MathText> arányossági tényező!
        </TheoryCallout>

        <div className="mt-4">
          <TheoryTable
            headers={['Mennyiség (x kg alma)', '1 kg', '2 kg', '3,5 kg', '5 kg', 'x kg']}
            rows={[
              ['Fizetendő összeg (y Ft)', '450 Ft', '900 Ft', '1575 Ft', '2250 Ft', '450 · x Ft'],
              ['Hányados (y / x)', '450 / 1 = 450', '900 / 2 = 450', '1575 / 3,5 = 450', '2250 / 5 = 450', 'k = 450 (állandó)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. RÉSZ: INTERAKTÍV GRAFIKON ÉS ARÁNYOSSÁGI TÉNYEZŐ LABOR */}
      <TheorySection
        title="2. Interaktív Labor: Az Arányossági Tényező és a Grafikon"
        subtitle="Vizsgáld meg valós időben, hogyan alakítja a k értéke az egyenes meredekségét és állását!"
        icon={<Activity className="w-5 h-5 text-cyan-600" />}
      >
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Interaktív Szimuláció
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                Az <span className="font-mono text-cyan-600 dark:text-cyan-400">y = {kFactor}x</span> egyenes képe
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Meredekség (k):</span>
              <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 font-mono font-black text-sm rounded-xl border border-cyan-300 dark:border-cyan-800">
                {kFactor}
              </span>
            </div>
          </div>

          {/* Preset gombok */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {presets.map((preset) => {
              const isSelected = kFactor === preset.value;
              return (
                <button
                  key={preset.label}
                  onClick={() => {
                    setKFactor(preset.value);
                    setActivePreset(String(preset.value));
                  }}
                  className={`px-2.5 py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                    isSelected
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/20 scale-102'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-300 hover:bg-cyan-50/50'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* SVG Koordináta-rendszer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative p-2 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner w-full max-w-[340px]">
                <svg viewBox="0 0 300 300" className="w-full h-auto select-none overflow-hidden">
                  {/* Négyzetháló */}
                  {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((tick) => (
                    <React.Fragment key={`grid-${tick}`}>
                      <line
                        x1={originX + tick * unitPx}
                        y1="10"
                        x2={originX + tick * unitPx}
                        y2="290"
                        stroke="#e2e8f0"
                        strokeWidth="0.8"
                        strokeDasharray={tick === 0 ? undefined : '2 2'}
                        className="dark:stroke-slate-800"
                      />
                      <line
                        x1="10"
                        y1={originY + tick * unitPx}
                        x2="290"
                        y2={originY + tick * unitPx}
                        stroke="#e2e8f0"
                        strokeWidth="0.8"
                        strokeDasharray={tick === 0 ? undefined : '2 2'}
                        className="dark:stroke-slate-800"
                      />
                    </React.Fragment>
                  ))}

                  {/* Tengelyek */}
                  {/* X tengely */}
                  <line x1="10" y1={originY} x2="290" y2={originY} stroke="#475569" strokeWidth="2" />
                  <polygon points="290,150 282,146 282,154" fill="#475569" />
                  <text x="285" y="166" className="text-[10px] font-black fill-slate-600 dark:fill-slate-400">x</text>

                  {/* Y tengely */}
                  <line x1={originX} y1="290" x2={originX} y2="10" stroke="#475569" strokeWidth="2" />
                  <polygon points="150,10 146,18 154,18" fill="#475569" />
                  <text x="135" y="18" className="text-[10px] font-black fill-slate-600 dark:fill-slate-400">y</text>

                  {/* Számozások */}
                  {[-4, -2, 2, 4].map((n) => (
                    <text
                      key={`xtick-${n}`}
                      x={originX + n * unitPx}
                      y={originY + 14}
                      textAnchor="middle"
                      className="text-[8px] font-bold fill-slate-400"
                    >
                      {n}
                    </text>
                  ))}
                  {[-4, -2, 2, 4].map((n) => (
                    <text
                      key={`ytick-${n}`}
                      x={originX - 12}
                      y={originY - n * unitPx + 3}
                      textAnchor="end"
                      className="text-[8px] font-bold fill-slate-400"
                    >
                      {n}
                    </text>
                  ))}

                  {/* Meredekség lépésháromszög: 0 -> 1 -> k */}
                  <path
                    d={`M ${triStartX} ${triStartY} L ${triCornerX} ${triCornerY} L ${triTargetX} ${triTargetY}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.8"
                    strokeDasharray="3 2"
                  />
                  <line x1={triStartX} y1={triStartY} x2={triCornerX} y2={triCornerY} stroke="#f59e0b" strokeWidth="2" />
                  <line x1={triCornerX} y1={triCornerY} x2={triTargetX} y2={triTargetY} stroke="#ea580c" strokeWidth="2" />
                  <text x={originX + 12} y={originY - 4} className="text-[7.5px] font-black fill-amber-600">+1</text>
                  <text
                    x={triCornerX + (kFactor >= 0 ? 6 : -14)}
                    y={(triCornerY + triTargetY) / 2 + 2}
                    className="text-[7.5px] font-black fill-orange-600"
                  >
                    {kFactor > 0 ? `+${kFactor}` : kFactor}
                  </text>

                  {/* Egyenes vonala */}
                  <line
                    x1={svgX1}
                    y1={svgY1}
                    x2={svgX2}
                    y2={svgY2}
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Kiemelt pontok: (0;0) origó és (1; k) */}
                  <circle cx={originX} cy={originY} r="4.5" fill="#0891b2" stroke="#ffffff" strokeWidth="1.5" />
                  <text x={originX - 14} y={originY - 6} className="text-[8px] font-black fill-cyan-700 dark:fill-cyan-300">
                    O(0;0)
                  </text>

                  {Math.abs(kFactor) <= 4.5 && (
                    <>
                      <circle cx={triTargetX} cy={triTargetY} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                      <text
                        x={triTargetX + 6}
                        y={triTargetY - 4}
                        className="text-[7.5px] font-black fill-blue-700 dark:fill-blue-300"
                      >
                        (1; {kFactor})
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Dinamikusan frissülő értéktáblázat és leírás */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500">Kapcsolat:</span>
                  <span className="text-sm font-mono font-black text-cyan-600 dark:text-cyan-400">
                    y = {kFactor} · x
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-900">
                    <span>Meredekség iránya:</span>
                    <strong className={kFactor > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {kFactor > 0 ? 'Emelkedő (növekvő)' : 'Lejtő (csökkenő)'}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-900">
                    <span>Áthaladási síknegyedek:</span>
                    <strong>{kFactor > 0 ? 'I. és III. negyed' : 'II. és IV. negyed'}</strong>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                    <span>Origón átmegy?</span>
                    <strong className="text-cyan-600">Igen, mindig (0; 0)</strong>
                  </div>
                </div>
              </div>

              {/* Értékpár táblázat */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse bg-white dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <thead>
                    <tr className="bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 border-b border-slate-200 dark:border-slate-800">
                      <th className="py-1.5 px-2 font-bold border-r border-slate-200 dark:border-slate-800">x</th>
                      {tableXValues.map((val) => (
                        <th key={`th-x-${val}`} className="py-1.5 px-2 font-semibold">
                          {val}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-slate-800 dark:text-slate-200">
                      <td className="py-1.5 px-2 font-bold bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-300">
                        y = {kFactor}x
                      </td>
                      {tableXValues.map((val) => (
                        <td
                          key={`td-y-${val}`}
                          className={`py-1.5 px-2 font-mono font-medium ${
                            val === 0 ? 'bg-cyan-100/60 dark:bg-cyan-900/30 font-bold text-cyan-700' : ''
                          }`}
                        >
                          {val * kFactor}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 italic">
                Figyeld meg a sárga-narancs lépésháromszöget: ha az x tengelyen <strong>1 egységet lépünk jobbra</strong>, az y tengelyen pontosan <strong>k egységet kell lépnünk</strong> (felfelé, ha k &gt; 0, illetve lefelé, ha k &lt; 0)!
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: A GRAFIKON TULAJDONSÁGAI */}
      <TheorySection
        title="3. A Grafikon Főbb Geometriai Tulajdonságai"
        subtitle="Az origón áthaladás, a meredekség értelmezése és a síknegyedek kapcsolata"
        icon={<LineChart className="w-5 h-5 text-cyan-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <TheoryCard
            title="Mindig átmegy az Origón"
            badge="Alaptulajdonság"
            formula="x = 0 ⟹ y = k · 0 = 0"
            description="Bármennyi is legyen a k arányossági tényező, a (0; 0) pont mindig kielégíti az egyenletet. Ez a legfontosabb ellenőrzési pont!"
            properties={[
              'Ha egy egyenes nem megy át a (0; 0) ponton, NEM egyenes arányosság grafikonja',
              'Az egyenes arányosság speciális lineáris függvény (ahol a tengelymetszet b = 0)'
            ]}
            themeColor="cyan"
          />

          <TheoryCard
            title="Pozitív k (k > 0)"
            badge="Növekvő Függvény"
            formula="k > 0 ⟹ balról jobbra emelkedik"
            description="Ha a két mennyiség szorzótényezője pozitív, a grafikon az I. és a III. síknegyeden halad át. Nagyobb x-hez nagyobb y tartozik."
            properties={[
              'Példa: y = 2x, y = 0,5x',
              'k = 1: Az I. és III. síknegyed belső szögfelezője (y = x)',
              'Minél nagyobb k, annál meredekebb az egyenes'
            ]}
            themeColor="emerald"
          />

          <TheoryCard
            title="Negatív k (k < 0)"
            badge="Csökkenő Függvény"
            formula="k < 0 ⟹ balról jobbra lejt"
            description="Ha az arányossági tényező negatív, a grafikon a II. és a IV. síknegyeden halad át. Nagyobb x-hez kisebb y tartozik."
            properties={[
              'Példa: y = -3x, y = -1x',
              'k = -1: A II. és IV. síknegyed belső szögfelezője (y = -x)',
              'Minél nagyobb |k|, annál közelebb áll az y tengelyhez'
            ]}
            themeColor="rose"
          />
        </div>
      </TheorySection>

      {/* 4. RÉSZ: GYAKORLATI ALKALMAZÁSOK ÉS HÉTKÖZNAPI PÉLDÁK */}
      <TheorySection
        title="4. Gyakorlati Alkalmazások és Életbeli Példák"
        subtitle="Hol találkozunk egyenes arányossággal a mindennapi életben, fizikában és geometriában?"
        icon={<Scale className="w-5 h-5 text-cyan-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
              <DollarSign className="w-4 h-4" />
              <span>1. Egységár és Fizetendő Összeg</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha 1 kg sajt ára 3200 Ft, akkor x kg sajtért fizetendő összeg:
            </p>
            <div className="py-1">
              <MathText>{"y = 3200 · x"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Itt az arányossági tényező maga az <strong>egységár</strong>: <MathText>{"k = 3200 Ft/kg"}</MathText>.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>2. Egyenletes Mozgás Út-Idő Kapcsolata</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Állandó v = 90 km/h sebességgel haladó vonat esetén az eltelt t óra alatt megtett út (s):
            </p>
            <div className="py-1">
              <MathText>{"s = 90 · t"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A sebesség az arányossági tényező: <MathText>{"k = v = 90 km/h"}</MathText>.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Compass className="w-4 h-4" />
              <span>3. Sokszögek Kerülete</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
              <span>A négyzet kerülete az oldalának függvényében: <MathText>{"K = 4 · a"}</MathText> (k = 4).</span><br />
              <span>A szabályos háromszög kerülete: <MathText>{"K = 3 · a"}</MathText> (k = 3).</span><br />
              <span>A kör kerülete az átmérő függvényében: <MathText>{"K = π · d"}</MathText> (k = π ≈ 3,14).</span>
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm">
              <Calculator className="w-4 h-4" />
              <span>4. Valutaváltás és Mértékegység-váltás</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
              <span>Ha 1 EUR = 395 HUF, akkor x EUR értéke forintban: <MathText>{"y = 395 · x"}</MathText>.</span><br />
              <span>Mértékegység váltásnál: centiméter átváltása méterbe: <MathText>{"y = 100 · x"}</MathText>.</span>
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: GYAKORI HIBÁK ÉS TIPUS BUKTATÓK */}
      <TheorySection
        title="5. Tipikus Hibák és Csapdák (Vigyázat!)"
        subtitle="Mikor NEM egyenes arányosság az összefüggés, még ha első ránézésre hasonlónak is tűnik?"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      >
        <div className="space-y-4">
          <TheoryTrapBox
            trap="Mindkettő nő = Egyenes arányosság?"
            wrong="Az ember életkora és a testmagassága: mindkettő nő, tehát egyenesen arányosak."
            wrongExplanation="HIBA: attól, hogy mindkét mennyiség növekszik, még NEM feltétlenül egyenesen arányosak! Ha 10 évesen 140 cm vagy, 20 évesen nem leszel 280 cm magas!"
            correct="Csak akkor egyenes arányosság, ha pontosan UGYANANNYISZOROSÁRA változnak és a hányadosuk állandó."
            correctExplanation="A hányadosnak (y / x) minden életkorban pontosan ugyanakkorának kellene lennie, ami biológiailag nem igaz."
            tip="Mindig ellenőrizd az állandó hányados feltételét: y / x = k!"
          />

          <TheoryTrapBox
            trap="A négyzet oldala és területe egyenesen arányos?"
            wrong="Ha a négyzet oldala 2 cm, területe 4 cm². Ha oldala 4 cm (kétszeres), területe 16 cm². Ez egyenes arányosság."
            wrongExplanation="HIBA: A hányados 4 / 2 = 2, míg a második esetben 16 / 4 = 4! A hányados nem állandó!"
            correct="A négyzet oldala és területe között négyzetes arányosság áll fenn: T = a²."
            correctExplanation="Ha az oldalt megduplázzuk (2-szeres), a terület a 2² = 4-szeresére nő! Ez parabola görbét ad, nem origón átmenő egyenest."
            tip="Csak a kerület egyenesen arányos az oldallal (K = 4a), a terület (T = a²) sosem!"
          />

          <TheoryTrapBox
            trap="Alapdíj + egységár (pl. Taxi díja vagy telefonszámla)"
            wrong="A taxi alapdíja 1000 Ft, kilométerenként 400 Ft. Képlet: y = 1000 + 400x. Ez egyenes arányosság, mert a grafikon egy egyenes."
            wrongExplanation="HIBA: Bár a grafikon valóban egy egyenes (lineáris függvény), de NEM megy át az origón! Ha x = 0 km, a díj akkor is 1000 Ft."
            correct="Csak az az egyenes jelent egyenes arányosságot, amely átmegy a (0; 0) ponton!"
            correctExplanation="Itt a hányados nem állandó: 1 km-nél 1400/1 = 1400, míg 2 km-nél 1800/2 = 900. Nem egyenes arányosság!"
            tip="Az y = ax + b alakú lineáris függvény csak akkor egyenes arányosság, ha b = 0!"
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: MINTAPÉLDÁK LÉPÉSRŐL LÉPÉSRE */}
      <TheorySection
        title="6. Kidolgozott Mintapéldák Lépésről Lépésre"
        subtitle="Hogyan oldjuk meg az arányossági feladatokat képlettel és arányossági tényezővel?"
        icon={<Calculator className="w-5 h-5 text-cyan-600" />}
      >
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-xs rounded-full">
                1. MINTAPÉLDA
              </span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Hiányzó Érték Kiszámítása Táblázatból
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Két mennyiség, x és y között egyenes arányosság áll fenn. Tudjuk, hogy x = 6 esetén y = 15.
              Mennyi lesz y értéke, ha x = 10?
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300">Megoldás 2 lépésben:</div>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div>
                  <strong>1. Lépés:</strong> Határozzuk meg az arányossági tényezőt (k):
                  <div className="my-1 font-mono font-bold text-cyan-700 dark:text-cyan-300">
                    <MathText>{"k = y / x = 15 / 6 = 2,5"}</MathText>
                  </div>
                </div>
                <div>
                  <strong>2. Lépés:</strong> Írjuk fel a hozzárendelést és számoljuk ki az új y-t:
                  <div className="my-1 font-mono font-bold text-cyan-700 dark:text-cyan-300">
                    <MathText>{"y = 2,5 · x ⟹ y = 2,5 · 10 = 25"}</MathText>
                  </div>
                </div>
                <p className="text-emerald-600 font-bold">
                  Válasz: Ha x = 10, akkor y = 25.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold text-xs rounded-full">
                2. MINTAPÉLDA
              </span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Hozzárendelési Szabály Megadott Pont Alapján
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy egyenes arányosság grafikonja átmegy a P(-4; 18) ponton.
              Add meg a hozzárendelési szabályt, és döntsd el, illeszkedik-e az egyenesre a Q(6; -27) pont!
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300">Megoldás:</div>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div>
                  <strong>1. Lépés:</strong> Mivel P(-4; 18), így x = -4 és y = 18:
                  <div className="my-1 font-mono font-bold text-blue-700 dark:text-blue-300">
                    <MathText>{"k = y / x = 18 / (-4) = -4,5"}</MathText>
                  </div>
                  A hozzárendelés szabálya tehát: <strong>y = -4,5x</strong>.
                </div>
                <div>
                  <strong>2. Lépés:</strong> Helyettesítsük be a Q(6; -27) pont koordinátáit (x = 6):
                  <div className="my-1 font-mono font-bold text-blue-700 dark:text-blue-300">
                    <MathText>{"y = -4,5 · 6 = -27"}</MathText>
                  </div>
                  Mivel a számított érték pontosan megegyezik a megadott y-koordinátával (-27), a Q pont rajta van az egyenesen!
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DirectProportionTheory;
