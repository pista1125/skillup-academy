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
  TrendingDown,
  LineChart,
  Calculator,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Clock,
  Layers,
  Users,
  Maximize2
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface InverseProportionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const InverseProportionTheory: React.FC<InverseProportionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Hiperbola Labor állapot
  const [kFactor, setKFactor] = useState<number>(12);

  const presets = [
    { label: 'k = 6 (Kompakt hiperbola)', value: 6 },
    { label: 'k = 12 (Klasszikus alapmodell)', value: 12 },
    { label: 'k = 24 (Szélesebb ívű)', value: 24 },
    { label: 'k = -6 (II. és IV. negyed)', value: -6 },
    { label: 'k = -12 (Negatív konstans)', value: -12 }
  ];

  // Koordináta-rendszer SVG méretezése (középpont: 160, 160; 1 egység = 18px)
  const originX = 160;
  const originY = 160;
  const unitPx = 18;

  // Hiperbola görbe generálása SVG útvonalként (path d)
  // Pozitív ág: x = 0.5-től 8-ig
  const positivePoints: string[] = [];
  for (let x = 0.5; x <= 8; x += 0.2) {
    const y = kFactor / x;
    const sx = originX + x * unitPx;
    const sy = originY - y * unitPx;
    if (sy >= 10 && sy <= 310) {
      positivePoints.push(`${positivePoints.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }

  // Negatív ág: x = -8-tól -0.5-ig
  const negativePoints: string[] = [];
  for (let x = -8; x <= -0.5; x += 0.2) {
    const y = kFactor / x;
    const sx = originX + x * unitPx;
    const sy = originY - y * unitPx;
    if (sy >= 10 && sy <= 310) {
      negativePoints.push(`${negativePoints.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }

  const positivePathD = positivePoints.join(' ');
  const negativePathD = negativePoints.join(' ');

  // Egész koordinátájú nevezetes pontok
  const sampleXValues = kFactor > 0
    ? [-6, -4, -3, -2, -1, 1, 2, 3, 4, 6]
    : [-6, -4, -3, -2, -1, 1, 2, 3, 4, 6];

  const validKeyPoints = sampleXValues
    .map(x => ({ x, y: kFactor / x }))
    .filter(pt => Math.abs(pt.y) <= 8);

  return (
    <TheoryTemplate
      title="Fordított Arányosság"
      subtitle="Két változó szorzatának állandósága (x · y = k), az y = k / x hiperbola görbéje, aszimptotái és gyakorlati feladatai"
      badgeText="8. OSZTÁLY • VI. HOZZÁRENDELÉSEK • 🔄 TANANYAG"
      documentId="inverse-proportion-theory-doc"
      pdfFilename="8_osztaly_forditott_aranyossag_tananyag.pdf"
      quickRule={{
        label: 'Alapösszefüggés',
        formula: 'x · y = k ⟺ y = k / x (x ≠ 0, k ≠ 0)'
      }}
      themeColor="indigo"
      practiceTitle="Készen állsz a fordított arányossági feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben hiperbolákkal, munkamegosztással és menetidővel!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* INTERAKTÍV HIPERBOLA LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="Interaktív Hiperbola & Arányossági Labor"
        subtitle="Változtasd a k tényezőt, figyeld meg a szorzat állandóságát és a két ágú hiperbola viselkedését!"
        badge="Interaktív Felfedezés"
        icon={<TrendingDown className="w-5 h-5 text-indigo-600" />}
      >
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 p-5 rounded-3xl border-2 border-indigo-200/80 dark:border-indigo-900/60 shadow-lg space-y-6">
          {/* Vezérlő gombok */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Arányossági szorzatérték kiválasztása (k):
              </span>
              <span className="font-mono font-black text-indigo-700 dark:text-indigo-300 text-sm px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 rounded-full border border-indigo-300 dark:border-indigo-800">
                k = {kFactor}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.value}
                  size="sm"
                  variant={kFactor === preset.value ? "default" : "outline"}
                  onClick={() => setKFactor(preset.value)}
                  className={kFactor === preset.value
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-sm"
                    : "border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
                  }
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Grafikon és Értéktáblázat Rács */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG Hiperbola Koordináta-rendszer (7 col) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 rounded-2xl border-2 border-indigo-100 dark:border-slate-800 shadow-inner">
              <svg viewBox="0 0 320 320" className="w-full max-w-[340px] h-auto select-none">
                {/* Rácsvonalak */}
                {[-8, -6, -4, -2, 2, 4, 6, 8].map((n) => (
                  <React.Fragment key={`grid-${n}`}>
                    <line
                      x1={originX + n * unitPx}
                      y1={10}
                      x2={originX + n * unitPx}
                      y2={310}
                      stroke="#e2e8f0"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1={10}
                      y1={originY - n * unitPx}
                      x2={310}
                      y2={originY - n * unitPx}
                      stroke="#e2e8f0"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                  </React.Fragment>
                ))}

                {/* X és Y Tengelyek */}
                <line x1="10" y1={originY} x2="310" y2={originY} stroke="#475569" strokeWidth="1.8" />
                <line x1={originX} y1="310" x2={originX} y2="10" stroke="#475569" strokeWidth="1.8" />

                {/* Tengely nyilak */}
                <polygon points="310,160 302,156 302,164" fill="#475569" />
                <polygon points="160,10 156,18 164,18" fill="#475569" />

                {/* Tengelyfeliratok */}
                <text x="306" y="152" className="text-[11px] font-bold fill-slate-700" textAnchor="end">x</text>
                <text x="170" y="18" className="text-[11px] font-bold fill-slate-700">y</text>
                <text x="148" y="174" className="text-[10px] font-bold fill-slate-500">0</text>

                {/* Skála számok */}
                {[-6, -4, -2, 2, 4, 6].map((n) => (
                  <React.Fragment key={`label-${n}`}>
                    <text x={originX + n * unitPx} y={originY + 13} className="text-[9px] fill-slate-400 font-semibold" textAnchor="middle">{n}</text>
                    <text x={originX - 12} y={originY - n * unitPx + 3} className="text-[9px] fill-slate-400 font-semibold" textAnchor="end">{n}</text>
                  </React.Fragment>
                ))}

                {/* Hiperbola görbe ágai */}
                {positivePathD && (
                  <path
                    d={positivePathD}
                    fill="none"
                    stroke={kFactor > 0 ? "#4f46e5" : "#e11d48"}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                )}
                {negativePathD && (
                  <path
                    d={negativePathD}
                    fill="none"
                    stroke={kFactor > 0 ? "#4f46e5" : "#e11d48"}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                )}

                {/* Nevezetes pontok kiemelése */}
                {validKeyPoints.map((pt, idx) => (
                  <g key={`pt-${idx}`}>
                    <circle
                      cx={originX + pt.x * unitPx}
                      cy={originY - pt.y * unitPx}
                      r="4"
                      fill="#ffffff"
                      stroke={kFactor > 0 ? "#4f46e5" : "#e11d48"}
                      strokeWidth="2.2"
                    />
                  </g>
                ))}

                {/* Síknegyed jelzések */}
                <text x="270" y="45" className="text-[10px] font-bold fill-indigo-400/70">I. negyed</text>
                <text x="45" y="45" className="text-[10px] font-bold fill-indigo-400/70">II. negyed</text>
                <text x="45" y="295" className="text-[10px] font-bold fill-indigo-400/70">III. negyed</text>
                <text x="270" y="295" className="text-[10px] font-bold fill-indigo-400/70">IV. negyed</text>
              </svg>
              <span className="text-[11px] font-mono text-slate-500 mt-2">
                Grafikon: f(x) = {kFactor} / x (Hiperbola görbe)
              </span>
            </div>

            {/* Értéktáblázat & Magyarázó Panel (5 col) */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Szorzat állandósága: x · y = {kFactor}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bármelyik pontot választjuk ki a görbéről, az <MathText>x</MathText> és <MathText>y</MathText> koordináták szorzata mindig pontosan <MathText>{kFactor}</MathText>!
                </p>
                <div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200/60 font-mono text-xs text-indigo-900 dark:text-indigo-200">
                  {kFactor > 0 ? (
                    <span>Ha x duplájára nő (pl. 2 → 4), akkor y a felére csökken ({kFactor/2} → {kFactor/4})!</span>
                  ) : (
                    <span>Mivel k negatív, az x és y ellenkező előjelűek (II. és IV. síknegyed).</span>
                  )}
                </div>
              </div>

              {/* Táblázat a legfontosabb egész pontokról */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-center text-xs">
                  <thead className="bg-indigo-100/70 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 font-bold">
                    <tr>
                      <th className="py-1 px-2 border-b">x</th>
                      <th className="py-1 px-2 border-b">y = {kFactor} / x</th>
                      <th className="py-1 px-2 border-b">x · y</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {validKeyPoints.filter(p => p.x > 0).slice(0, 4).map((pt, idx) => (
                      <tr key={`tbl-${idx}`} className="hover:bg-indigo-50/40">
                        <td className="py-1 font-bold">{pt.x}</td>
                        <td className="py-1 font-bold text-indigo-600 dark:text-indigo-400">{pt.y}</td>
                        <td className="py-1 text-emerald-600 dark:text-emerald-400 font-bold">{pt.x * pt.y}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                Figyeld meg: a hiperbola sosem éri el a tengelyeket (x = 0-nál a függvény nincs értelmezve, y sosem lehet 0)!
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 1. SZEKCIÓ: DEFINÍCIÓ ÉS ALAPÖSSZEFÜGGÉS */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. A Fordított Arányosság Fogalma és Képlete"
        subtitle="Hogyan ismerjük fel a fordított arányosságot a hétköznapokban és az algebrában?"
        badge="Elméleti Alapok"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Fordított Arányosság Definíciója"
            icon={<Sparkles className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Két változó mennyiség, <MathText>x</MathText> és <MathText>y</MathText> között <strong>fordított arányosság</strong> áll fenn, ha:
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center font-bold text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm">
              Ahányszorosára növekszik az egyik mennyiség, ugyanannyiad részére csökken a másik.
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
              Például ha a munkások száma <strong>3-szorosára</strong> nő, az elvégzendő munka ideje <strong>harmadára</strong> csökken!
            </p>
          </TheoryCard>

          <TheoryCard
            title="A Szorzat Állandósága és a Képlet"
            icon={<Calculator className="w-4 h-4 text-blue-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Fordított arányosság esetén az összetartozó értékpárok <strong>szorzata állandó</strong>:
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-mono font-black text-blue-950 dark:text-blue-200 text-sm sm:text-base">
              <MathText>x · y = k ⟺ y = k / x</MathText>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
              ahol a <MathText>k ≠ 0</MathText> konstans szám az arányossági tényező (szorzatérték).
            </p>
          </TheoryCard>
        </div>

        {/* Egyenes vs Fordított Arányosság Összehasonlító Táblázat */}
        <div className="mt-4">
          <TheoryTable
            title="Összehasonlítás: Egyenes vs. Fordított Arányosság"
            headers={['Tulajdonság', 'Egyenes Arányosság (k · x)', 'Fordított Arányosság (k / x)']}
            rows={[
              ['Alapvető összefüggés', 'Hányados állandó: y / x = k', 'Szorzat állandó: x · y = k'],
              ['Hozzárendelési szabály', 'y = k · x', 'y = k / x'],
              ['Változás iránya', 'Ha x kétszeres, y is kétszeres', 'Ha x kétszeres, y feleakkora'],
              ['Grafikon alakja', 'Origón átmenő egyenes vonal', 'Két ágból álló hiperbola görbe'],
              ['Tengelymetszetek', 'Átmegy a (0; 0) origón', 'Soha nem metszi a tengelyeket!'],
              ['Értelmezési tartomány', 'Bármely valós szám (x ∈ R)', 'Nulla kivételével (x ≠ 0)']
            ]}
          />
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZEKCIÓ: A HIPERBOLA GRAFIKON TULAJDONSÁGAI */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. A Grafikon: A Hiperbola Tulajdonságai"
        subtitle="Miért görbe, miért van két ága, és mit jelent az aszimptota?"
        badge="Geometriai Kép"
        icon={<LineChart className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <TheoryCard
            title="1. Két Ág és Síknegyedek"
            icon={<Compass className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              • <strong>Ha k &gt; 0:</strong> a hiperbola ágai az <strong>I. és a III. síknegyedben</strong> találhatók. Mindkét ágon balról jobbra csökken.<br />
              • <strong>Ha k &lt; 0:</strong> az ágak a <strong>II. és a IV. síknegyedben</strong> futnak, és balról jobbra növekednek.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Aszimptoták (Tengelyek)"
            icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az <MathText>x</MathText> és <MathText>y</MathText> tengelyek a hiperbola <strong>aszimptotái</strong>: a görbe tetszőlegesen közel kerül hozzájuk a végtelenben, de <strong>sohasem érinti és sohasem metszi</strong> őket!
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Középpontos Szimmetria"
            icon={<Sparkles className="w-4 h-4 text-purple-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A hiperbola <strong>középpontosan szimmetrikus az origóra</strong> (0; 0). Ha egy <MathText>(x; y)</MathText> pont rajta van a görbén, akkor a <MathText>(-x; -y)</MathText> pont is garantáltan rajta van: <MathText>f(-x) = -f(x)</MathText>.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Kikötés és Zérushely"
          type="info"
        >
          <p className="text-xs sm:text-sm leading-relaxed">
            1. <strong>Miért nincs értelmezve x = 0-ban?</strong> Mert nullával nem lehet osztani! Ezért az értelmezési tartomány: <MathText>D = R (kivéve 0)</MathText>.<br />
            2. <strong>Van-e zérushelye a fordított arányosságnak?</strong> Nincs! Egy tört csak akkor lehet nulla, ha a számlálója nulla. Mivel <MathText>k ≠ 0</MathText>, a <MathText>k / x = 0</MathText> egyenletnek <strong>nincs valós megoldása</strong>!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZEKCIÓ: HÉTKÖZNAPI GYAKORLATI ALKALMAZÁSOK */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Hétköznapi Gyakorlati Alkalmazások"
        subtitle="Munkamegosztás, sebesség-menetidő, téglalapok oldalai és áttételek"
        badge="Életbeli Példák"
        icon={<Users className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A) Munkamegosztási Feladatok"
            icon={<Clock className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha több munkás dolgozik azonos tempóban egy adott munkán, az elvégzéshez szükséges idő arányosan csökken:
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1.5 text-xs sm:text-sm font-semibold">
              <div><strong>Példa:</strong> 4 festő 6 óra alatt fest le egy házat. Hány óra kell 3 festőnek?</div>
              <div className="text-indigo-700 dark:text-indigo-300 font-mono">1. Összmunkaóra (k): 4 · 6 = 24 munkaóra</div>
              <div className="text-indigo-700 dark:text-indigo-300 font-mono">2. Új idő (y): 24 / 3 = 8 óra</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="B) Sebesség és Menetidő (s = v · t)"
            icon={<TrendingDown className="w-4 h-4 text-teal-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Rögzített <MathText>s</MathText> távolság megtételéhez a nagyobb sebesség kevesebb menetidőt jelent:
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1.5 text-xs sm:text-sm font-semibold">
              <div><strong>Példa:</strong> Egy autó 90 km/h-val 2 óra alatt ér célba. Mennyi idő kell 60 km/h-val?</div>
              <div className="text-teal-700 dark:text-teal-300 font-mono">1. Teljes út: s = 90 · 2 = 180 km</div>
              <div className="text-teal-700 dark:text-teal-300 font-mono">2. Új menetidő: t = 180 / 60 = 3 óra</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="C) Rögzített Területű Téglalap Oldalai"
            icon={<Maximize2 className="w-4 h-4 text-purple-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha a téglalap területe rögzített (<MathText>T = a · b</MathText>), az oldalak fordítottan arányosak:
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-1.5 text-xs sm:text-sm font-semibold">
              <div>Ha a terület <MathText>T = 36 cm²</MathText>, akkor <MathText>b = 36 / a</MathText>.</div>
              <div className="text-purple-700 dark:text-purple-300 font-mono">Ha a = 4 cm → b = 9 cm (4 · 9 = 36)</div>
              <div className="text-purple-700 dark:text-purple-300 font-mono">Ha a = 6 cm → b = 6 cm (6 · 6 = 36, négyzet)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="D) Fogaskerekek és Áttételek"
            icon={<Layers className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egymásba kapcsolódó fogaskerekeknél a fogszám (<MathText>z</MathText>) és a fordulatszám (<MathText>n</MathText>) szorzata állandó:
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1.5 text-xs sm:text-sm font-semibold">
              <div className="text-amber-900 dark:text-amber-200 font-mono">z₁ · n₁ = z₂ · n₂</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">A feleakkora fogszámú kis kerék kétszer olyan gyorsan forog!</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZEKCIÓ: VIZSGACSAPDÁK ÉS TÉVHITEK */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Tipikus Vizsgacsapdák és Tévhitek"
        subtitle="Kerüld el a leggyakoribb felvételi és dolgozathibákat!"
        badge="Figyelem"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-3.5">
          <TheoryTrapBox
            title="1. Csapda: „Ha az egyik nő, a másik csökken” – Ez NEM mindig fordított arányosság!"
            description="Nagyon sok diák azt hiszi, hogy ha az egyik mennyiség növekedésekor a másik csökken, az máris fordított arányosság. Például egy 10 cm-es gyertya égésekor: h(t) = 10 - 2t. Itt az idő múlásával a hossz csökken, de a szorzat nem állandó! Ez lineáris függvény, NEM fordított arányosság. Csak akkor fordított arányos, ha az egyik kétszerezésekor a másik PONTOSAN a felére csökken (x · y = k)!"
          />

          <TheoryTrapBox
            title="2. Csapda: Egyenes arányosság képletével számolni a munkamegosztást"
            description="Gyakori hiba: „Ha 3 munkás 12 nap alatt végez, akkor 6 munkás 2 · 12 = 24 nap alatt végez”. Nyilvánvalóan képtelenség: ha többen dolgoznak, kevesebb idő kell! Mindig ellenőrizd józan ésszel: 3 · 12 = 36 összmunkanap, így 6 munkásnak 36 / 6 = 6 nap kell!"
          />

          <TheoryTrapBox
            title="3. Csapda: A zérushely keresése a hiperbolánál"
            description="A dolgozatban gyakran megkérdezik: „Hol metszi az y = 12 / x az x-tengelyt?” A válasz: SEHOL! A zérushely f(x) = 0 lenne, de 12 / x soha nem lehet 0. Ha a válaszodba beírod, hogy x = 0, az súlyos hiba, mert 0-val osztani sem szabad!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default InverseProportionTheory;
