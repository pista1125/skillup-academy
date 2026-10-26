import React, { useState, useMemo } from 'react';
import {
  Percent,
  Sliders,
  TrendingUp,
  TrendingDown,
  PieChart,
  AlertTriangle,
  ArrowRightLeft,
  Sparkles,
  Calculator,
  CheckCircle2,
  DollarSign,
  Receipt
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  PercentageTriangleSvg,
  PercentageMultiplierBarSvg,
  PieChartPercentageSvg,
  SuccessiveChangesSvg
} from './PercentageFigures';

interface PercentageTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PercentageTheory: React.FC<PercentageTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV SZÁZALÉKSZÁMÍTÁSI LABOR ÁLLAPOTOK ---
  const [labMode, setLabMode] = useState<'basic' | 'change' | 'successive'>('basic');

  // Alapképlet mód: A, p, E
  const [baseVal, setBaseVal] = useState<number>(80000); // Alap (A)
  const [pctVal, setPctVal] = useState<number>(25);       // Százalékláb (p)
  const [unit, setUnit] = useState<string>('Ft');

  // Változás mód: Eredeti ár és % növekedés/csökkenés
  const [changeType, setChangeType] = useState<'increase' | 'decrease'>('increase');
  const [changePct, setChangePct] = useState<number>(20);

  // Kettős változás mód
  const [firstChange, setFirstChange] = useState<number>(20);
  const [secondChange, setSecondChange] = useState<number>(-20);

  // Előre definiált életszerű minták
  const presets = [
    { label: '27% ÁFA (100 000 Ft nettó)', mode: 'change' as const, base: 100000, type: 'increase' as const, pct: 27, unit: 'Ft' },
    { label: '20% Téli Leárazás (15 000 Ft)', mode: 'change' as const, base: 15000, type: 'decrease' as const, pct: 20, unit: 'Ft' },
    { label: 'Felmérés (800 diák 35%-a)', mode: 'basic' as const, base: 800, p: 35, unit: 'fő' },
    { label: '+20% majd -20% Csapda (1000 Ft)', mode: 'successive' as const, base: 1000, first: 20, second: -20, unit: 'Ft' }
  ];

  // Számítások
  const basicCalc = useMemo(() => {
    const E = (baseVal * pctVal) / 100;
    return {
      E: Math.round(E * 100) / 100,
      multiplier: pctVal / 100
    };
  }, [baseVal, pctVal]);

  const changeCalc = useMemo(() => {
    const factor = changeType === 'increase' ? (1 + changePct / 100) : (1 - changePct / 100);
    const newPrice = baseVal * factor;
    const diff = Math.abs(newPrice - baseVal);
    return {
      factor: Math.round(factor * 1000) / 1000,
      newPrice: Math.round(newPrice * 100) / 100,
      diff: Math.round(diff * 100) / 100
    };
  }, [baseVal, changeType, changePct]);

  const successiveCalc = useMemo(() => {
    const step1Factor = 1 + firstChange / 100;
    const priceAfter1 = baseVal * step1Factor;

    const step2Factor = 1 + secondChange / 100;
    const finalPrice = priceAfter1 * step2Factor;

    const combinedFactor = step1Factor * step2Factor;
    const overallPctChange = (combinedFactor - 1) * 100;

    return {
      priceAfter1: Math.round(priceAfter1 * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      combinedFactor: Math.round(combinedFactor * 10000) / 10000,
      overallPctChange: Math.round(overallPctChange * 100) / 100
    };
  }, [baseVal, firstChange, secondChange]);

  return (
    <TheoryTemplate
      title="Százalékszámítás – Alap, Százalékláb, Százalékérték és Változások"
      subtitle="A 3 alapképlet, a gyors szorzótényezős módszer (ÁFA, akciók), kördiagramok és az egymás utáni változások csapdája a 9. osztályos tankönyv szerint"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • ％ TANANYAG"
      themeColor="amber"
      documentId="percentage-theory"
      pdfFilename="9_osztaly_szazalekszamitas_tananyag.pdf"
      quickRule={{
        label: 'A Százalékszámítás Alapképletei',
        formula: 'E = A · (p / 100)  |  Emelés: · (1 + p/100)  |  Csökkentés: · (1 - p/100)'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A SZÁZALÉKSZÁMÍTÁS ALAPFOGALMAI ÉS KÉPLETEI */}
      <TheorySection
        number={1}
        title="A Százalékszámítás 3 Alapfogalma és a Képletháromszög"
        icon={<Percent className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Alapfogalmak"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A százalék (jelölése: <strong>%</strong>) a latin <em>„per centum”</em> (százanként) kifejezésből származik,
          és matematikailag egyszerűen <strong>századrészt</strong> jelent: $1\% = \frac{1}{100} = 0,01$.
          Minden százalékszámítási feladat három alapvető mennyiség kapcsolatára épül:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2">
            <TheoryCard title="A Három Alapelem Meghatározása" variant="formula" themeColor="amber">
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1.5">
                  <p>
                    <strong>1. Alap ($A$):</strong> Az egész mennyiség, aminek a százalékát vesszük (ez felel meg a <strong>100%</strong>-nak).
                  </p>
                  <p>
                    <strong>2. Százalékláb ($p$ vagy $p\%$):</strong> Megadja, hogy az alap hány századrészét vizsgáljuk.
                  </p>
                  <p>
                    <strong>3. Százalékérték ($E$):</strong> Az alap megadott $p\%$-ához tartozó tényleges mennyiség.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-1">
                  <p><strong>• Százalékérték kiszámítása:</strong> $E = A \cdot \frac{p}{100}$</p>
                  <p><strong>• Alap kiszámítása:</strong> $A = \frac{E}{\frac{p}{100}} = \frac{E \cdot 100}{p}$</p>
                  <p><strong>• Százalékláb kiszámítása:</strong> $p\% = \frac{E}{A} \cdot 100\%$</p>
                </div>

                <p className="text-xs text-slate-500">
                  💡 <em>Megjegyzés:</em> A képletekben a $\frac{p}{100}$ tört alakban vagy tizedestört alakban szerepel (pl. $25\% \implies 0,25$).
                </p>
              </div>
            </TheoryCard>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-amber-100/80 dark:border-slate-800 shadow-2xs">
            <PercentageTriangleSvg className="w-full max-w-[480px]" />
          </div>
        </div>

        <TheoryCallout title="Hogyan használd a képletháromszöget?" variant="tip">
          Takarj le ujjaddal a háromszögben azt a betűt, amit keresel!
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li>Ha az <strong>E</strong>-t takarod le: alul marad $A \cdot p\%$.</li>
            <li>Ha az <strong>A</strong>-t takarod le: felül $E$, alul $p\% \implies A = E / p\%$.</li>
            <li>Ha a <strong>p%</strong>-ot takarod le: felül $E$, alul $A \implies p\% = E / A$.</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: SZÁZALÉKOS VÁLTOZÁSOK ÉS SZORZÓTÉNYEZŐS MÓDSZER */}
      <TheorySection
        number={2}
        title="Százalékos Változások: A Modern Szorzótényezős Módszer"
        icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Gyors Módszer"
        badgeColor="emerald"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A középiskolában és az érettségin már nem érdemes két lépésben számolni (először kiszámolni a növekményt, majd hozzáadni),
          hanem <strong>egyetlen szorzással</strong> határozzuk meg az új értéket <strong>szorzótényező</strong> segítségével:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-emerald-100/80 dark:border-slate-800 shadow-2xs">
            <PercentageMultiplierBarSvg className="w-full max-w-[500px]" />
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <TheoryCard title="Százalékos Növekedés (Áremelés, ÁFA, Infláció)" variant="example" themeColor="emerald">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Ha egy mennyiség $p\%$-kal nő, az új érték az eredeti $(100 + p)\%$-a lesz:</p>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-center font-bold text-emerald-900 dark:text-emerald-200">
                  Új érték = Eredeti · (1 + p / 100)
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs">
                  <li><strong>+20% emelés:</strong> $1 + 0,20 = \mathbf{1,20}$-zal szorzunk.</li>
                  <li><strong>+27% ÁFA:</strong> $1 + 0,27 = \mathbf{1,27}$-tel szorzunk ($10\,000\text{ Ft} \cdot 1,27 = 12\,700\text{ Ft}$).</li>
                  <li><strong>+5% kamat:</strong> $1 + 0,05 = \mathbf{1,05}$-tel szorzunk.</li>
                </ul>
              </div>
            </TheoryCard>

            <TheoryCard title="Százalékos Csökkenés (Akció, Leárazás, Veszteség)" variant="example" themeColor="rose">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Ha egy mennyiség $p\%$-kal csökken, az új érték az eredeti $(100 - p)\%$-a marad:</p>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 font-mono text-center font-bold text-rose-900 dark:text-rose-200">
                  Új érték = Eredeti · (1 - p / 100)
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs">
                  <li><strong>-15% leárazás:</strong> $1 - 0,15 = \mathbf{0,85}$-tel szorzunk ($20\,000\text{ Ft} \cdot 0,85 = 17\,000\text{ Ft}$).</li>
                  <li><strong>-30% kiárusítás:</strong> $1 - 0,30 = \mathbf{0,70}$-nel szorzunk.</li>
                  <li><strong>-5% selejt:</strong> $1 - 0,05 = \mathbf{0,95}$-tel szorzunk.</li>
                </ul>
              </div>
            </TheoryCard>
          </div>
        </div>

        <TheoryCallout title="Visszafelé számolás: Hogyan kapjuk vissza az eredeti árat?" variant="tip">
          Ha egy termék 27% ÁFA-val együtt bruttó $63\,500\text{ Ft}$, mennyi volt a nettó ára?
          Mivel $\text{Bruttó} = \text{Nettó} \cdot 1,27$, ezért <strong>osztani kell a szorzótényezővel</strong>:
          $$\text{Nettó} = \frac{63\,500}{1,27} = \mathbf{50\,000\text{ Ft}}!$$
          <em>(Vigyázat: Soha ne vond le a 27%-ot a bruttó árból, mert $63\,500 \cdot 0,27 = 17\,145\text{ Ft}$, és $63\,500 - 17\,145 = 46\,355\text{ Ft}$, ami hibás!)</em>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: KÖRDIAGRAMOK ÉS SZÁZALÉKOS MEGOSZLÁS */}
      <TheorySection
        number={3}
        title="Kördiagramok és Százalékos Megoszlások"
        icon={<PieChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Megoszlások"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Statisztikai adatok ábrázolásakor a teljes sokaságot ($100\%$) egy teljes kör ($360^\circ$) reprezentálja.
          A százalékok és a középponti szögek között egyenes arányosság áll fenn:
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-slate-850/60 rounded-3xl border border-indigo-100/80 dark:border-slate-800 shadow-2xs">
            <PieChartPercentageSvg className="w-full max-w-[500px]" />
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <TheoryCard title="Szögátszámítási Szabály" variant="default" themeColor="indigo">
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Mivel $100\% = 360^\circ$, ezért:</p>
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-center text-sm font-bold text-indigo-950 dark:text-indigo-200">
                  1% = 3,6° &nbsp;⟺&nbsp; Középponti szög (α) = 360° · (p / 100)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                    <strong>50%</strong> = $360^\circ \cdot 0,50 = \mathbf{180^\circ}$ (félkör)
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                    <strong>25%</strong> = $360^\circ \cdot 0,25 = \mathbf{90^\circ}$ (derékszög)
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                    <strong>10%</strong> = $360^\circ \cdot 0,10 = \mathbf{36^\circ}$
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                    <strong>75%</strong> = $360^\circ \cdot 0,75 = \mathbf{270^\circ}$
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Százalékpont vs. Százalékos Változás" variant="highlight" themeColor="amber">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Gyakori sajtó- és érettségi hiba a két fogalom keverése:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>
                    <strong>Százalékpont (különbség):</strong> Ha a kamatláb $10\%$-ról $12\%$-ra nő, a változás <strong>2 százalékpont</strong> ($12 - 10 = 2$).
                  </li>
                  <li>
                    <strong>Százalékos növekedés:</strong> A $10\%$-hoz képest a $2$ növekmény $\frac{2}{10} = \mathbf{20\%}$-os növekedést jelent!
                  </li>
                </ul>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV SZÁZALÉKSZÁMÍTÁSI LABOR (A fejezet vége felé!) */}
      <TheorySection
        number={4}
        title="Interaktív Százalékszámítási és Változás Laboratórium"
        icon={<Sliders className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Interaktív Szimulátor"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Próbáld ki a laboratóriumot! Válassz egy üzemmódot, állítsd be a paramétereket, vagy kattints az előre elkészített minták egyikére.
          Nézd meg a szorzótényezők és a végső összegek azonnali, lépésről lépésre történő levezetését!
        </p>

        <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-900/60 rounded-3xl border border-amber-200 dark:border-slate-800 space-y-6 my-4 shadow-xs">
          {/* Módválasztó és Minták */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden text-xs font-bold">
              <button
                onClick={() => setLabMode('basic')}
                className={`px-3 py-2 ${labMode === 'basic' ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                1. Alapérték (E = A · p%)
              </button>
              <button
                onClick={() => setLabMode('change')}
                className={`px-3 py-2 ${labMode === 'change' ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                2. Árváltozás (± p%)
              </button>
              <button
                onClick={() => setLabMode('successive')}
                className={`px-3 py-2 ${labMode === 'successive' ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                3. Kettős Változás Csapda
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">Minták:</span>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLabMode(p.mode);
                    setBaseVal(p.base);
                    setUnit(p.unit);
                    if (p.mode === 'change') {
                      setChangeType(p.type);
                      setChangePct(p.pct);
                    } else if (p.mode === 'basic' && p.p) {
                      setPctVal(p.p);
                    } else if (p.mode === 'successive') {
                      setFirstChange(p.first);
                      setSecondChange(p.second);
                    }
                  }}
                  className="px-2 py-1 rounded-md text-[11px] font-semibold border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. MÓD: ALAPÉRTÉK SZÁMÍTÓ */}
          {labMode === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-100 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Alap (A - 100%):
                  </label>
                  <input
                    type="number"
                    value={baseVal}
                    onChange={e => setBaseVal(parseFloat(e.target.value) || 0)}
                    className="w-32 p-2 rounded-xl border text-center font-mono font-bold text-base bg-amber-50/40 dark:bg-slate-900 border-amber-300 dark:border-slate-600 text-amber-900 dark:text-amber-200"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Százalékláb (p%):
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={pctVal}
                      step="5"
                      onChange={e => setPctVal(parseFloat(e.target.value) || 0)}
                      className="w-24 p-2 rounded-xl border text-center font-mono font-bold text-base bg-amber-50/40 dark:bg-slate-900 border-amber-300 dark:border-slate-600 text-amber-900 dark:text-amber-200"
                    />
                    <span className="font-bold text-slate-500">%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Mértékegység:</span>
                  <input
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    className="w-16 p-1 text-xs border rounded-md text-center font-bold bg-white dark:bg-slate-850"
                  />
                </div>
              </div>

              {/* Eredmény kártya */}
              <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-slate-700 space-y-3 shadow-2xs">
                <span className="text-xs font-extrabold uppercase text-slate-400 block">
                  Kiszámított Százalékérték (E):
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-black text-amber-600 dark:text-amber-400">
                    {basicCalc.E}
                  </span>
                  <span className="text-sm font-bold text-slate-500">{unit}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <p><strong>Képlet:</strong> E = A · (p / 100)</p>
                  <p className="text-amber-700 dark:text-amber-300 font-bold">
                    E = {baseVal} · {basicCalc.multiplier} = {basicCalc.E} {unit}
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  A(z) {baseVal} {unit}-nak a(z) {pctVal}%-a pontosan {basicCalc.E} {unit}.
                </p>
              </div>
            </div>
          )}

          {/* 2. MÓD: ÁRVÁLTOZÁS SZORZÓTÉNYEZŐVEL */}
          {labMode === 'change' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-100 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Eredeti ár / érték:
                  </label>
                  <input
                    type="number"
                    value={baseVal}
                    onChange={e => setBaseVal(parseFloat(e.target.value) || 0)}
                    className="w-32 p-2 rounded-xl border text-center font-mono font-bold text-base bg-amber-50/40 dark:bg-slate-900 border-amber-300 dark:border-slate-600"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Változás iránya:
                  </label>
                  <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden text-xs">
                    <button
                      onClick={() => setChangeType('increase')}
                      className={`px-3 py-1.5 font-bold ${changeType === 'increase' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                    >
                      + Emelés
                    </button>
                    <button
                      onClick={() => setChangeType('decrease')}
                      className={`px-3 py-1.5 font-bold ${changeType === 'decrease' ? 'bg-rose-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                    >
                      - Leárazás
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mértéke (%):
                  </label>
                  <input
                    type="number"
                    value={changePct}
                    step="5"
                    onChange={e => setChangePct(parseFloat(e.target.value) || 0)}
                    className="w-24 p-2 rounded-xl border text-center font-mono font-bold text-base bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                  />
                </div>
              </div>

              {/* Új ár kártya */}
              <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-slate-700 space-y-3 shadow-2xs">
                <span className="text-xs font-extrabold uppercase text-slate-400 block">
                  Új ár / érték ({changeType === 'increase' ? 'Emelés után' : 'Akció után'}):
                </span>
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-3xl font-black ${changeType === 'increase' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {changeCalc.newPrice}
                  </span>
                  <span className="text-sm font-bold text-slate-500">{unit}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 font-mono text-xs space-y-1">
                  <p><strong>Szorzótényező:</strong> · {changeCalc.factor}</p>
                  <p className="font-bold">
                    {baseVal} · {changeCalc.factor} = {changeCalc.newPrice} {unit}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Különbség: {changeType === 'increase' ? '+' : '-'}{changeCalc.diff} {unit}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. MÓD: KETTŐS VÁLTOZÁS CSAPDA */}
          {labMode === 'successive' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-xs font-bold block mb-1">Kezdő összeg:</label>
                  <input
                    type="number"
                    value={baseVal}
                    onChange={e => setBaseVal(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded-lg font-mono font-bold text-center"
                  />
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-xs font-bold block mb-1">1. Változás (%):</label>
                  <input
                    type="number"
                    value={firstChange}
                    onChange={e => setFirstChange(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded-lg font-mono font-bold text-center text-emerald-600"
                  />
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border">
                  <label className="text-xs font-bold block mb-1">2. Változás (%):</label>
                  <input
                    type="number"
                    value={secondChange}
                    onChange={e => setSecondChange(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded-lg font-mono font-bold text-center text-rose-600"
                  />
                </div>
              </div>

              {/* Eredmény levezetés */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-300 dark:border-slate-700 space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-mono gap-2">
                  <span>1. lépés után: <strong>{successiveCalc.priceAfter1} {unit}</strong></span>
                  <span>Végső ár: <strong className="text-lg text-amber-600">{successiveCalc.finalPrice} {unit}</strong></span>
                  <span className={`font-bold ${successiveCalc.overallPctChange < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    Összesített változás: {successiveCalc.overallPctChange}%
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Összevont szorzó: {1 + firstChange / 100} · {1 + secondChange / 100} = {successiveCalc.combinedFactor}.
                  Ezért nem 0%-os a változás!
                </p>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSEGI CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Százalékszámítási Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: +20% emelés után -20% leárazás az eredeti árat adja vissza?"
            trap="Egy kabát árát felemelik 20%-kal, majd a következő héten leárazzák 20%-kal. Visszakaptuk az eredeti árat?"
            wrong="Igen, mert +20% és -20% kiejtik egymást (+20 - 20 = 0%)."
            wrongExplanation="Óriási érettségi típuscsapda! A második 20%-os leárazást NEM az eredeti árból, hanem a MEGEMELT árból vonják le! Ha az ár 1000 Ft volt: 1000 · 1,20 = 1200 Ft. A 1200 Ft 20%-a 240 Ft! Így az új ár 1200 - 240 = 960 Ft lesz, ami 4%-os veszteség!"
            correct="Nem! A végső ár 4%-kal KEVESEBB lesz az eredetinél (1,20 · 0,80 = 0,96 = 96%)!"
            correctExplanation="A szorzótényezők összeszorzódnak: (1 + 0,20) · (1 - 0,20) = 1 - 0,04 = 0,96. Ez mindig veszteséget eredményez!"
            tip="Aranyszabály: Egymás utáni azonos százalékos emelés és csökkentés esetén a végeredmény MINDIG KISEBB lesz az eredetinél!"
          />

          <TheoryTrapBox
            title="2. Buktató: Bruttó árból az ÁFA közvetlen levonása"
            trap="Egy termék bruttó (27% ÁFA-s) ára 12 700 Ft. Mennyi az ÁFA összege?"
            wrong="12 700 · 0,27 = 3429 Ft, tehát a nettó ár 12 700 - 3429 = 9271 Ft."
            wrongExplanation="Súlyos pénzügyi hiba! A 27% ÁFA a NETTÓ árra rakódik rá, nem a bruttóra! Ha a nettó ár 9271 Ft lenne, annak 27%-a csak 2503 Ft lenne, így a bruttó ár nem 12 700 Ft lenne!"
            correct="A nettó ár: 12 700 / 1,27 = 10 000 Ft. Az ÁFA összege: 2700 Ft!"
            correctExplanation="Mivel Bruttó = Nettó · 1,27, ezért visszafelé számolva osztani kell: Nettó = Bruttó / 1,27."
            tip="Jegyezd meg: Bruttóból nettót MINDIG 1,27-tel való osztással számolunk!"
          />

          <TheoryTrapBox
            title="3. Buktató: Százalék és százalékpont összekeverése"
            trap="Egy párt támogatottsága 20%-ról 25%-ra nőtt. Hány százalékkal nőtt a támogatottsága?"
            wrong="5%-kal nőtt (25 - 20 = 5)."
            wrongExplanation="Gyakori fogalmi hiba! A 25 - 20 = 5 az SZÁZALÉKPONT! Százalékban kifejezve a növekedés a 20-hoz képest mérendő: 5 / 20 = 0,25 = 25%!"
            correct="5 százalékponttal nőtt, ami 25%-os relatív növekedést jelent!"
            correctExplanation="A különbség az abszolút változás (százalékpont), míg a relatív növekedés: (25 - 20) / 20 · 100% = 25%."
            tip="Tipp: Két százalékos adat különbsége SZÁZALÉKPONT. Ha a változás arányát kérdezik, osztani kell az eredeti értékkel!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
