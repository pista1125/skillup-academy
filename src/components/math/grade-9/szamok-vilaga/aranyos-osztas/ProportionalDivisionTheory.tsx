import React, { useState, useMemo } from 'react';
import {
  Split,
  Sliders,
  Scale,
  Compass,
  AlertTriangle,
  Coins,
  Sparkles,
  Calculator,
  CheckCircle2,
  PieChart,
  Boxes,
  Layers
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  ProportionalBarSvg,
  TriangleAnglesProportionSvg,
  MixtureRatioSvg,
  ProfitDistributionSvg
} from './ProportionalDivisionFigures';

interface ProportionalDivisionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ProportionalDivisionTheory: React.FC<ProportionalDivisionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ARÁNYOS OSZTÁSI LABOR ÁLLAPOTOK ---
  const [totalQuantity, setTotalQuantity] = useState<number>(120);
  const [ratioA, setRatioA] = useState<number>(2);
  const [ratioB, setRatioB] = useState<number>(3);
  const [ratioC, setRatioC] = useState<number>(5);
  const [useThreeParts, setUseThreeParts] = useState<boolean>(true);
  const [unit, setUnit] = useState<string>('cm');

  // Előre definiált életszerű minták
  const presets = [
    { label: 'Háromszög szögei (180°)', total: 180, a: 2, b: 3, c: 4, three: true, unit: '°' },
    { label: 'Nyereségelosztás (1 600 000 Ft)', total: 1600000, a: 3, b: 5, c: 0, three: false, unit: 'Ft' },
    { label: 'Limonádé keverék (1600 ml)', total: 1600, a: 1, b: 2, c: 5, three: true, unit: 'ml' },
    { label: 'Bronz ötvözet (50 kg)', total: 50, a: 9, b: 1, c: 0, three: false, unit: 'kg' },
    { label: 'Szakaszfelosztás (60 cm)', total: 60, a: 2, b: 3, c: 0, three: false, unit: 'cm' }
  ];

  const calculation = useMemo(() => {
    const safeA = Math.max(0.1, ratioA);
    const safeB = Math.max(0.1, ratioB);
    const safeC = useThreeParts ? Math.max(0, ratioC) : 0;

    const totalParts = safeA + safeB + safeC;
    const onePartValue = totalParts > 0 ? totalQuantity / totalParts : 0;

    const partAVal = safeA * onePartValue;
    const partBVal = safeB * onePartValue;
    const partCVal = safeC * onePartValue;

    const pctA = totalParts > 0 ? (safeA / totalParts) * 100 : 0;
    const pctB = totalParts > 0 ? (safeB / totalParts) * 100 : 0;
    const pctC = totalParts > 0 ? (safeC / totalParts) * 100 : 0;

    return {
      totalParts: Math.round(totalParts * 100) / 100,
      onePartValue: Math.round(onePartValue * 100) / 100,
      partAVal: Math.round(partAVal * 100) / 100,
      partBVal: Math.round(partBVal * 100) / 100,
      partCVal: Math.round(partCVal * 100) / 100,
      pctA: Math.round(pctA * 10) / 10,
      pctB: Math.round(pctB * 10) / 10,
      pctC: Math.round(pctC * 10) / 10
    };
  }, [totalQuantity, ratioA, ratioB, ratioC, useThreeParts]);

  return (
    <TheoryTemplate
      title="Arányos Osztás – Mennyiségek Felosztása Megadott Arányban"
      subtitle="Az arányos osztás 4 lépéses algoritmusa, geometriai, pénzügyi és keverési feladatok a 9. osztályos kerettanterv szerint"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • 🍰 TANANYAG"
      themeColor="teal"
      documentId="proportional-division-theory"
      pdfFilename="9_osztaly_aranyos_osztas_tananyag.pdf"
      quickRule={{
        label: 'Az Arányos Osztás 4 Lépése',
        formula: '1. S = a + b (+ c)  |  2. e = M / S  |  3. R_i = arány_i · e  |  4. Ellenőrzés: ∑ R_i = M'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: AZ ARÁNYOS OSZTÁS ALAPFOGALMA ÉS ALGORITMUSA */}
      <TheorySection
        number={1}
        title="Az Arányos Osztás Fogalma és a 4 Lépéses Algoritmus"
        icon={<Split className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Alapalgoritmus"
        badgeColor="teal"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A mindennapi életben, a pénzügyekben és a természettudományokban gyakran nem egyenlő részekre kell elosztanunk egy adott mennyiséget,
          hanem <strong>előre meghatározott arányban</strong> (például befektetett tőke, munkaidő vagy recept szerinti összetevők alapján).
          A 9. osztályos tananyag (17. lecke) szerint az arányos osztás univerzális algoritmusa:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2">
            <TheoryCard title="Az Arányos Osztás Univerzális Algoritmusa" variant="highlight" themeColor="teal">
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Adott egy $M$ összeg vagy mennyiség, amelyet $a : b$ (vagy $a : b : c$) arányban kell szétosztani:
                </p>

                <div className="space-y-2 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono text-xs sm:text-sm text-teal-950 dark:text-teal-200">
                  <p><strong>1. Lépés:</strong> Összes arányrész: $S = a + b (+ c)$</p>
                  <p><strong>2. Lépés:</strong> Egy arányrész értéke: $e = \frac{M}{S}$</p>
                  <p><strong>3. Lépés:</strong> Az egyes részek értékei: $R_1 = a \cdot e,\; R_2 = b \cdot e,\; R_3 = c \cdot e$</p>
                  <p><strong>4. Lépés:</strong> Ellenőrzés: $R_1 + R_2 (+ R_3) = M$, és $\frac{R_1}{R_2} = \frac{a}{b}$</p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                  💡 <strong>Algebrai felírás:</strong> Az arányrészeket egy ismeretlennel jelölve: $a \cdot x + b \cdot x = M \implies (a+b)x = M \implies x = \frac{M}{a+b}$.
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-teal-100/80 dark:border-slate-800 shadow-2xs">
            <ProportionalBarSvg className="w-full max-w-[500px]" />
          </div>
        </div>

        <TheoryCallout title="Mit jelent a 2 : 3 arány a gyakorlatban?" variant="tip">
          Ha két barát $2 : 3$ arányban osztozik egy összegen, az azt jelenti, hogy <strong>minden 2 Ft-ra, amit az első kap, a másodiknak 3 Ft jut</strong>.
          Az összeg tehát $2 + 3 = 5$ egyenlő „csomagra” oszlik, amiből az első 2 csomagot, a második 3 csomagot kap.
          Az első fél a teljes összeg $\frac{2}{5}$ részét ($40\%$-át), a második a $\frac{3}{5}$ részét ($60\%$-át$) kapja meg.
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: GEOMETRIAI ALKALMAZÁSOK */}
      <TheorySection
        number={2}
        title="Geometriai Alkalmazások: Szögek, Kerület és Oldalak"
        icon={<Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Geometria"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A geometriai feladatok döntő többségében az arányos osztás rejtett teljes mennyiségekkel dolgozik.
          Legfontosabb alaptételek, ahol a teljes összeg fix és ismert:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-indigo-100/80 dark:border-slate-800 shadow-2xs">
            <TriangleAnglesProportionSvg className="w-full max-w-[500px]" />
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <TheoryCard title="1. Mintapélda: Háromszög Belső Szögei" variant="example" themeColor="indigo">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Feladat:</strong> Egy háromszög belső szögeinek aránya $\alpha : \beta : \gamma = 2 : 3 : 4$. Mekkorák a szögek?</p>
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-xs">
                  <p>• Ismert összeg: $\alpha + \beta + \gamma = 180^\circ$</p>
                  <p>• Összes arányrész: $2 + 3 + 4 = 9$ rész</p>
                  <p>• Egy rész értéke: $x = \frac{180^\circ}{9} = 20^\circ$</p>
                  <p>• $\alpha = 2 \cdot 20^\circ = \mathbf{40^\circ}$</p>
                  <p>• $\beta = 3 \cdot 20^\circ = \mathbf{60^\circ}$</p>
                  <p>• $\gamma = 4 \cdot 20^\circ = \mathbf{80^\circ}$</p>
                  <p className="text-emerald-700 dark:text-emerald-300 font-bold">✓ Ellenőrzés: 40° + 60° + 80° = 180°</p>
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="2. Mintapélda: Háromszög Kerülete és Oldalai" variant="example" themeColor="indigo">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Feladat:</strong> Egy háromszög oldalai $a : b : c = 3 : 5 : 7$ arányúak, a kerülete $K = 45\text{ cm}$. Mekkorák az oldalak?</p>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs">
                  <p>• Kerület: $a + b + c = 45\text{ cm}$</p>
                  <p>• Összes rész: $3 + 5 + 7 = 15$ rész</p>
                  <p>• 1 rész értéke: $45 / 15 = 3\text{ cm}$</p>
                  <p>• Oldalak: $a = 3 \cdot 3 = \mathbf{9\text{ cm}}$, $b = 5 \cdot 3 = \mathbf{15\text{ cm}}$, $c = 7 \cdot 3 = \mathbf{21\text{ cm}}$</p>
                  <p className="text-emerald-700 dark:text-emerald-300 font-bold">✓ Háromszög-egyenlőtlenség: 9 + 15 = 24 &gt; 21 (megszerkeszthető!)</p>
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>

        <TheoryCallout title="Vigyázat téglalap kerületénél és területénél!" variant="warning">
          Ha egy téglalap oldalainak aránya $a : b = 3 : 4$, és a kerülete $K = 56\text{ cm}$, a képlet $K = 2(a + b)$!
          Tehát a két oldal összege csak a <strong>félkerület</strong>: $a + b = 56 / 2 = 28\text{ cm}$!
          $3x + 4x = 7x = 28 \implies x = 4\text{ cm}$, így $a = 12\text{ cm}, b = 16\text{ cm}$.
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: MINDENNAPI, PÉNZÜGYI ÉS KEVERÉSI ALKALMAZÁSOK */}
      <TheorySection
        number={3}
        title="Mindennapi Élet, Kémiai Keverékek és Pénzügyi Megoszlások"
        icon={<Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Gyakorlati Élet"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Az érettségi vizsgák leggyakoribb szöveges feladatai ötvözetek (bronz, sárgaréz, arany), hígítások és üzleti befektetések arányos elosztását vizsgálják:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-amber-100/80 dark:border-slate-800 shadow-2xs">
            <MixtureRatioSvg className="w-full max-w-[480px]" />
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-amber-100/80 dark:border-slate-800 shadow-2xs">
            <ProfitDistributionSvg className="w-full max-w-[480px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Ötvözetek és Vegyületek" variant="default" themeColor="amber">
            <div className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                <strong>Bronz:</strong> Réz és ón ötvözete, tipikusan $9 : 1$ arányban. $50\text{ kg}$ bronz készítéséhez:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Összes rész: $9 + 1 = 10$ rész</li>
                <li>1 rész: $50\text{ kg} / 10 = 5\text{ kg}$</li>
                <li>Réz: $9 \cdot 5 = 45\text{ kg}$, Ón: $1 \cdot 5 = 5\text{ kg}$</li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryCard title="Befektetési Nyereség Arányos Megosztása" variant="default" themeColor="teal">
            <div className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                Két vállalkozó $6\text{ millió}$ és $10\text{ millió}$ forintot fektetett be (arány: $6 : 10 = 3 : 5$).
                Az év végi $1\,600\,000\text{ Ft}$ nyereségből:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Összes rész: $3 + 5 = 8$ rész</li>
                <li>1 rész: $1\,600\,000 / 8 = 200\,000\text{ Ft}$</li>
                <li>Első partner: $3 \cdot 200\,000 = 600\,000\text{ Ft}$</li>
                <li>Második partner: $5 \cdot 200\,000 = 1\,000\,000\text{ Ft}$</li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV ARÁNYOS OSZTÁSI LABOR (A fejezet vége felé!) */}
      <TheorySection
        number={4}
        title="Interaktív Arányos Osztási Laboratórium"
        icon={<Sliders className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Interaktív Szimulátor"
        badgeColor="teal"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Próbáld ki a szimulátort! Állítsd be a szétosztandó teljes mennyiséget és az arányokat, vagy válassz egy életszerű mintát.
          Figyeld meg a színes sávdiagram dinamikus felosztását és a részletes algebrai levezetést!
        </p>

        <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-900/60 rounded-3xl border border-teal-200 dark:border-slate-800 space-y-6 my-4 shadow-xs">
          {/* Mintapéldák gyorsválasztó */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Minták:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTotalQuantity(p.total);
                  setRatioA(p.a);
                  setRatioB(p.b);
                  setRatioC(p.c);
                  setUseThreeParts(p.three);
                  setUnit(p.unit);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Beállító Mezők */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-teal-100 dark:border-slate-700 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Teljes Mennyiség (M):</span>
                <span className="text-teal-600 dark:text-teal-400 font-mono font-bold">[{unit}]</span>
              </label>
              <input
                type="number"
                value={totalQuantity}
                onChange={e => setTotalQuantity(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border text-center font-mono font-bold text-lg bg-teal-50/40 dark:bg-slate-900 border-teal-300 dark:border-slate-600 text-teal-900 dark:text-teal-200"
              />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400">Mértékegység:</span>
                <input
                  type="text"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-16 p-1 text-xs border rounded-md text-center font-semibold bg-white dark:bg-slate-850 border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-teal-100 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Aránytagok száma:
                </label>
                <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden text-xs">
                  <button
                    onClick={() => setUseThreeParts(false)}
                    className={`px-2 py-1 font-bold ${!useThreeParts ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    2 tag (a : b)
                  </button>
                  <button
                    onClick={() => setUseThreeParts(true)}
                    className={`px-2 py-1 font-bold ${useThreeParts ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    3 tag (a : b : c)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 text-center">
                  <span className="text-[11px] font-bold text-teal-600">A tag:</span>
                  <input
                    type="number"
                    min="1"
                    value={ratioA}
                    onChange={e => setRatioA(parseFloat(e.target.value) || 1)}
                    className="w-full p-2 border rounded-xl text-center font-mono font-bold bg-teal-50 dark:bg-slate-900 border-teal-300 dark:border-slate-600"
                  />
                </div>
                <span className="text-slate-400 font-black pt-4">:</span>
                <div className="flex-1 text-center">
                  <span className="text-[11px] font-bold text-indigo-600">B tag:</span>
                  <input
                    type="number"
                    min="1"
                    value={ratioB}
                    onChange={e => setRatioB(parseFloat(e.target.value) || 1)}
                    className="w-full p-2 border rounded-xl text-center font-mono font-bold bg-indigo-50 dark:bg-slate-900 border-indigo-300 dark:border-slate-600"
                  />
                </div>
                {useThreeParts && (
                  <>
                    <span className="text-slate-400 font-black pt-4">:</span>
                    <div className="flex-1 text-center">
                      <span className="text-[11px] font-bold text-fuchsia-600">C tag:</span>
                      <input
                        type="number"
                        min="1"
                        value={ratioC}
                        onChange={e => setRatioC(parseFloat(e.target.value) || 1)}
                        className="w-full p-2 border rounded-xl text-center font-mono font-bold bg-fuchsia-50 dark:bg-slate-900 border-fuchsia-300 dark:border-slate-600"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Számított Egy Arányrész Kártya */}
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-teal-200 dark:border-slate-700 flex flex-col justify-center space-y-2">
              <span className="text-[11px] font-extrabold uppercase text-slate-400">
                1 Arányrész Értéke (e = M / S):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-black text-teal-600 dark:text-teal-400">
                  {calculation.onePartValue}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {unit} / rész
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Összes arányrész: <strong>{calculation.totalParts}</strong> rész
              </p>
            </div>
          </div>

          {/* Dinamikus Vizuális Sávdiagram */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Arányos megoszlás a sávon:</span>
              <span>Teljes: {totalQuantity} {unit} (100%)</span>
            </div>

            {/* Sáv */}
            <div className="h-10 w-full rounded-xl overflow-hidden flex shadow-inner bg-slate-100">
              <div
                style={{ width: `${calculation.pctA}%` }}
                className="bg-teal-500 text-white font-bold text-xs flex items-center justify-center transition-all duration-300 truncate px-1"
                title={`A rész: ${calculation.partAVal} ${unit}`}
              >
                A: {calculation.partAVal} {unit} ({calculation.pctA}%)
              </div>
              <div
                style={{ width: `${calculation.pctB}%` }}
                className="bg-indigo-500 text-white font-bold text-xs flex items-center justify-center transition-all duration-300 truncate px-1"
                title={`B rész: ${calculation.partBVal} ${unit}`}
              >
                B: {calculation.partBVal} {unit} ({calculation.pctB}%)
              </div>
              {useThreeParts && (
                <div
                  style={{ width: `${calculation.pctC}%` }}
                  className="bg-fuchsia-500 text-white font-bold text-xs flex items-center justify-center transition-all duration-300 truncate px-1"
                  title={`C rész: ${calculation.partCVal} ${unit}`}
                >
                  C: {calculation.partCVal} {unit} ({calculation.pctC}%)
                </div>
              )}
            </div>

            {/* Lépésről-lépésre Levezetés */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">1. Rész (A tag):</span>
                <span className="font-mono">{ratioA} · {calculation.onePartValue} = </span>
                <strong className="text-teal-900 dark:text-teal-100 font-mono text-sm">{calculation.partAVal} {unit}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-800 dark:text-indigo-300 block">2. Rész (B tag):</span>
                <span className="font-mono">{ratioB} · {calculation.onePartValue} = </span>
                <strong className="text-indigo-900 dark:text-indigo-100 font-mono text-sm">{calculation.partBVal} {unit}</strong>
              </div>
              {useThreeParts ? (
                <div className="p-2.5 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-950/40 border border-fuchsia-200 dark:border-fuchsia-800">
                  <span className="font-bold text-fuchsia-800 dark:text-fuchsia-300 block">3. Rész (C tag):</span>
                  <span className="font-mono">{ratioC} · {calculation.onePartValue} = </span>
                  <strong className="text-fuchsia-900 dark:text-fuchsia-100 font-mono text-sm">{calculation.partCVal} {unit}</strong>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold">
                    ✓ Összeg: {calculation.partAVal + calculation.partBVal} {unit}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSEGI CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Arányos Osztási Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: A teljes mennyiség összetévesztése a félkerülettel téglalapnál"
            trap="Egy téglalap oldalainak aránya 2 : 5. A téglalap kerülete 42 cm. Mekkorák az oldalai?"
            wrong="Összes rész: 2 + 5 = 7 rész. 1 rész = 42 / 7 = 6 cm. Így a = 2 · 6 = 12 cm, b = 5 · 6 = 30 cm."
            wrongExplanation="Súlyos tévedés! A téglalap kerülete K = 2(a + b). Ha a = 12 és b = 30, akkor a kerület 2(12 + 30) = 84 cm lenne, ami a duplája a feladatban szereplő 42 cm-nek!"
            correct="A két oldal összege a FÉLKERÜLET: a + b = 42 / 2 = 21 cm! 1 rész = 21 / 7 = 3 cm. a = 6 cm, b = 15 cm!"
            correctExplanation="Ellenőrzés: K = 2 · (6 + 15) = 2 · 21 = 42 cm, és az arány 6 : 15 = 2 : 5."
            tip="Aranyszabály: Téglalap kerületénél MINDIG a félkerületet (K / 2) oszd el az arányrészek összegével!"
          />

          <TheoryTrapBox
            title="2. Buktató: Arányos osztás alkalmazása téglalap TERÜLETÉNÉL (x² hiba)"
            trap="Egy téglalap oldalainak aránya 3 : 4, a területe T = 48 cm². Mekkorák az oldalak?"
            wrong="Összes rész: 3 + 4 = 7 rész. 1 rész = 48 / 7..."
            wrongExplanation="Óriási hiba! A terület a két oldal SZORZATA (T = a · b), nem az összege! Ha a = 3x és b = 4x, akkor a terület 3x · 4x = 12x² = 48 cm², nem 7x!"
            correct="12x² = 48 ⟹ x² = 4 ⟹ x = 2 cm! Az oldalak: a = 3·2 = 6 cm, b = 4·2 = 8 cm!"
            correctExplanation="Ellenőrzés: T = 6 · 8 = 48 cm², és 6 : 8 = 3 : 4."
            tip="Jegyezd meg: Területnél szorzat van, így az arányrészek négyzete (x²) jelenik meg! Végül gyököt kell vonni!"
          />

          <TheoryTrapBox
            title="3. Buktató: Nem létező háromszög szerkesztése arányos oldalakból"
            trap="Létezik-e olyan háromszög, amelynek oldalainak aránya 1 : 2 : 4, és kerülete 28 cm?"
            wrong="Igen, 1 + 2 + 4 = 7 rész. 1 rész = 4 cm. Oldalak: 4 cm, 8 cm, 16 cm. Minden szám pozitív, tehát létezik."
            wrongExplanation="Matematikai lehetetlenség! A háromszög-egyenlőtlenség szerint bármely két oldal összege szigorúan nagyobb kell legyen a harmadiknál: a + b > c! Itt 4 + 8 = 12, ami KISEBB mint 16 (12 < 16)!"
            correct="NEM LÉTEZIK ilyen háromszög, mert 1 + 2 = 3 < 4, a háromszög-egyenlőtlenség sérül!"
            correctExplanation="Két rövidebb oldal (4 cm és 8 cm) kiterítve sem éri el a 16 cm-es leghosszabb oldalt, így a csúcsok nem záródhatnak háromszöggé."
            tip="Tipp: Háromszög oldalainak arányos osztásánál MINDIG ellenőrizd a háromszög-egyenlőtlenséget: a legkisebb két aránytag összege nagyobb kell legyen a legnagyobbnál (a + b > c)!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
