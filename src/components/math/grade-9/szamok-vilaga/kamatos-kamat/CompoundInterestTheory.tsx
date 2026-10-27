import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  CompoundInterestFormulaSvg,
  SimpleVsCompoundComparisonSvg,
  GrowthAndDepreciationSvg,
  FinancialTermsSvg
} from './CompoundInterestFigures';
import { Sparkles, TrendingUp, PiggyBank, ShieldCheck, DollarSign } from 'lucide-react';

interface CompoundInterestTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CompoundInterestTheory: React.FC<CompoundInterestTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Laboratóriumi fülek
  const [labTab, setLabTab] = useState<'compound' | 'inflation'>('compound');

  // 1. Fül: Kamatos kamat kalkulátor
  const [principal, setPrincipal] = useState<number>(1000000); // 1 000 000 Ft
  const [interestRate, setInterestRate] = useState<number>(8); // 8%
  const [years, setYears] = useState<number>(5); // 5 év

  // 2. Fül: Infláció / értékvesztés kalkulátor
  const [initialValue, setInitialValue] = useState<number>(1000000);
  const [inflationRate, setInflationRate] = useState<number>(6); // 6%
  const [inflationYears, setInflationYears] = useState<number>(5);

  // Kamatos kamat számítás
  const growthFactor = 1 + interestRate / 100;
  const compoundTotal = Math.round(principal * Math.pow(growthFactor, years));
  const compoundInterestEarned = compoundTotal - principal;

  // Egyszerű kamat számítás összehasonlításként
  const simpleTotal = Math.round(principal + years * (principal * (interestRate / 100)));
  const compoundBonus = compoundTotal - simpleTotal;

  // Infláció számítás
  const depreciationFactor = 1 - inflationRate / 100;
  const realPurchasingPower = Math.round(initialValue * Math.pow(depreciationFactor, inflationYears));
  const lossAmount = initialValue - realPurchasingPower;

  // Előre összeállított szimulációk
  const applyPreset = (preset: 'baby' | 'housing' | 'pension' | 'carDepreciation' | 'inflation') => {
    if (preset === 'baby') {
      setPrincipal(500000);
      setInterestRate(9);
      setYears(18);
    } else if (preset === 'housing') {
      setPrincipal(2000000);
      setInterestRate(7);
      setYears(5);
    } else if (preset === 'pension') {
      setPrincipal(1000000);
      setInterestRate(8);
      setYears(25);
    } else if (preset === 'carDepreciation') {
      setInitialValue(6000000);
      setInflationRate(15);
      setInflationYears(5);
      setLabTab('inflation');
    } else if (preset === 'inflation') {
      setInitialValue(2000000);
      setInflationRate(5);
      setInflationYears(10);
      setLabTab('inflation');
    }
  };

  return (
    <TheoryTemplate
      title="Kamatos Kamat és Pénzügyi Matematika"
      subtitle="A pénzügyi matematika alapjai: kezdőtőke, kamatláb, kamattényező, egyszerű vs. kamatos kamat, valamint az amortizáció és infláció modellezése."
      badge="12. TÉMAKÖR"
      badgeColor="indigo"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quizButtonText="Gyakorló Kvíz Indítása"
      quickRule={{
        label: 'A Kamatos Kamat Alapképlete',
        formula: 'T_n = T_0 \\cdot (1 + \\frac{p}{100})^n = T_0 \\cdot q^n'
      }}
    >
      {/* 1. Alapfogalmak a pénzügyi matematikában */}
      <TheorySection
        number={1}
        title="A Pénzügyi Matematika Alapfogalmai"
        badge="ALAPOK"
      >
        <p className="text-slate-700 leading-relaxed text-base">
          A mindennapi életben, amikor pénzt helyezünk el a bankban (megtakarítás, lekötött betét) vagy kölcsönt veszünk fel (hitel), a pénzünk az idő múlásával megváltoztatja az értékét. Ennek leírására precíz fogalomrendszert használunk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              Kezdőtőke (T₀)
            </div>
            <p className="text-xs text-slate-700">
              Az az induló összeg, amit a periódus elején beteszünk a bankba vagy kölcsönként felveszünk.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Kamatláb (p)
            </div>
            <p className="text-xs text-slate-700">
              Százalékban kifejezett díj, amit a bank fizet a betétünkre (vagy amit mi fizetünk a hitelre). Pl. <span className="font-mono">p = 8%</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Kamattényező (q)
            </div>
            <p className="text-xs text-slate-700">
              Az az együttható, amivel a tőkét évről évre szorozzuk: <span className="font-mono font-bold text-amber-900">q = 1 + p/100</span>. Pl. 8%-nál <span className="font-mono">q = 1,08</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
              <PiggyBank className="w-4 h-4 text-purple-600" />
              Futamidő (n)
            </div>
            <p className="text-xs text-slate-700">
              A lekötési idő hossza, vagyis az eltelt kamatperiódusok (legtöbbször évek) száma.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. Egyszerű kamat vs. Kamatos kamat */}
      <TheorySection
        number={2}
        title="Egyszerű Kamat vs. Kamatos Kamat: A Lényegi Különbség"
        badge="ÖSSZEHASONLÍTÁS"
      >
        <p className="text-slate-700 leading-relaxed text-base">
          A pénzügyekben a legnagyobb vízválasztó, hogy a korábban jóváírt kamatokat <strong>kifizetik-e a kézbe</strong> (egyszerű kamatozás), vagy <strong>hozzácsapják a tőkéhez</strong> (tőkésítés), és a következő évben már a kamat után is jár kamat (kamatos kamatozás)!
        </p>

        {/* Grafikon ábra */}
        <SimpleVsCompoundComparisonSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Egyszerű kamat */}
          <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/40 space-y-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-200 text-blue-900 uppercase">
              1. Egyszerű kamatozás (Lineáris)
            </span>
            <div className="font-mono text-sm font-bold text-slate-900 bg-white p-3 rounded-lg border border-blue-200 text-center">
              Tₙ = T₀ + n · (T₀ · p/100)
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Minden évben kizárólag az <strong>eredeti kezdőtőke</strong> kamatozik fix összeggel. A kamatot év végén kivesszük, így a tőke nagysága állandó marad. A vagyon egyenes vonal (lineáris függvény) mentén nő.
            </p>
          </div>

          {/* Kamatos kamat */}
          <div className="border border-indigo-200 rounded-xl p-5 bg-indigo-50/40 space-y-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-200 text-indigo-900 uppercase">
              2. Kamatos kamatozás (Exponenciális)
            </span>
            <div className="font-mono text-sm font-bold text-slate-900 bg-white p-3 rounded-lg border border-indigo-200 text-center">
              Tₙ = T₀ · (1 + p/100)ⁿ = T₀ · qⁿ
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              A kamatot <strong>hozzáadják a tőkéhez</strong> (tőkésítés), így a következő évben már a megnövekedett összeg hoz kamatot. Hosszú távon (10–30 év) a kamatos kamat óriási, meredek vagyonnövekedést produkál!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. A Kamatos Kamat Képlete és Értékcsökkenés */}
      <TheorySection
        number={3}
        title="A Képlet Levezetése és az Amortizáció"
        badge="KÉPLET & LEVEZETÉS"
      >
        <p className="text-slate-700 leading-relaxed text-base">
          Tekintsük át a tőke alakulását évről évre:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-2">
          <div>• 0. év végén (kezdetben): <strong className="text-indigo-800 dark:text-indigo-400">T₀</strong></div>
          <div>• 1. év végén: T₁ = T₀ · (1 + p/100) = <strong className="text-indigo-800 dark:text-indigo-400">T₀ · q</strong></div>
          <div>• 2. év végén: T₂ = T₁ · q = (T₀ · q) · q = <strong className="text-indigo-800 dark:text-indigo-400">T₀ · q²</strong></div>
          <div>• n. év végén: Tₙ = <strong className="text-indigo-900 dark:text-indigo-300 text-sm font-black">T₀ · qⁿ</strong></div>
        </div>

        {/* Képlet ábra */}
        <CompoundInterestFormulaSvg />

        <div className="pt-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Értékcsökkenés (Amortizáció)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-4">
            Ha nem betétről, hanem egy használati tárgyról (pl. új gépkocsi, számítógép, gépsor) vagy az infláció miatti vásárlóerő-vesztésről van szó, az érték évről évre csökken. Ekkor a kamattényezőben <strong>mínusz előjel szerepel</strong>:
          </p>
          
          <GrowthAndDepreciationSvg />
        </div>
      </TheorySection>

      {/* 4. Pénzügyi Mutatók: EBKM és THM */}
      <TheorySection
        number={4}
        title="Gyakorlati Pénzügyi Mutatók: EBKM és THM"
        badge="PÉNZÜGYI GYAKORLAT"
      >
        <p className="text-slate-700 leading-relaxed text-base">
          A banki hirdetésekben és szerződésekben szereplő névleges kamatláb gyakran félrevezető lehet a rejtett költségek és kamatozási periódusok miatt. Ezért a jogszabályok kötelezővé teszik az egységesített mutatók közzétételét:
        </p>

        <FinancialTermsSvg />

        <TheoryCallout variant="warning" title="Évente többszöri tőkésítés (Féléves, havi kamatjóváírás)">
          <p className="leading-relaxed">
            Ha a bank évente <span className="font-mono font-bold">m</span> alkalommal tőkésít (pl. havonta: <span className="font-mono font-bold">m = 12</span>, félévente: <span className="font-mono font-bold">m = 2</span>), akkor egy periódusra a kamatláb <span className="font-mono font-bold">p/m</span>, az eltelt periódusok száma pedig <span className="font-mono font-bold">m · n</span>. A tőke értéke:
          </p>
          <div className="font-mono font-bold text-amber-950 dark:text-amber-200 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-amber-300 dark:border-amber-700 text-center text-sm my-2">
            Tₙ = T₀ · (1 + p / (100 · m))ᵐ·ⁿ
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-200">
            Mivel a kamat év közben is elkezd kamatozni, a gyakoribb tőkésítés mindig kissé <strong>magasabb tényleges hozamot</strong> biztosít!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 5. INTERAKTÍV PÉNZÜGYI LABORATÓRIUM */}
      <TheorySection
        number={5}
        title="Interaktív Pénzügyi Laboratórium"
        badge="SZIMULÁTOR"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-200 dark:border-indigo-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Pénzügyi szimulátor</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Kamatos Kamat & Infláció Labor</h3>
            </div>
          </div>
          {/* Fülváltó gombok */}
          <div className="flex p-1 bg-indigo-100 rounded-xl border border-indigo-300">
            <button
              onClick={() => setLabTab('compound')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'compound'
                  ? 'bg-white text-indigo-900 shadow-xs'
                  : 'text-indigo-800 hover:text-indigo-950'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Megtakarítás & Hitel
            </button>
            <button
              onClick={() => setLabTab('inflation')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'inflation'
                  ? 'bg-white text-indigo-900 shadow-xs'
                  : 'text-indigo-800 hover:text-indigo-950'
              }`}
            >
              <PiggyBank className="w-4 h-4" /> Infláció & Értékvesztés
            </button>
          </div>
        </div>

        {/* 1. FÜL: KAMATOS KAMAT ÉS MEGTAKARÍTÁS */}
        {labTab === 'compound' && (
          <div className="space-y-6">
            {/* Előre beállított élethelyzetek */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Gyakorlati élethelyzetek:</span>
              <button
                onClick={() => applyPreset('baby')}
                className="px-3 py-1 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-lg text-xs font-semibold text-indigo-900 transition-colors"
              >
                👶 Babakötvény (18 év, 9%)
              </button>
              <button
                onClick={() => applyPreset('housing')}
                className="px-3 py-1 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-lg text-xs font-semibold text-indigo-900 transition-colors"
              >
                🏠 Lakáscélú megtakarítás (5 év, 7%)
              </button>
              <button
                onClick={() => applyPreset('pension')}
                className="px-3 py-1 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-lg text-xs font-semibold text-indigo-900 transition-colors"
              >
                👴 Nyugdíj-előtakarékosság (25 év, 8%)
              </button>
            </div>

            {/* Csúszkák */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Kezdőtőke (T₀)</span>
                  <span className="font-mono text-indigo-700">{principal.toLocaleString('hu-HU')} Ft</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={principal}
                  onChange={(e) => setPrincipal(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>100 eFt</span>
                  <span>10 MFt</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Éves kamatláb (p)</span>
                  <span className="font-mono text-indigo-700">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Futamidő (n)</span>
                  <span className="font-mono text-indigo-700">{years} év</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 év</span>
                  <span>30 év</span>
                </div>
              </div>
            </div>

            {/* Számítási eredmények doboz */}
            <div className="bg-white p-6 rounded-2xl border-2 border-indigo-300 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Számítási levezetés és összehasonlítás
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold font-mono">
                  q = 1 + {interestRate}/100 = {growthFactor.toFixed(3)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">Kezdeti betett tőke:</div>
                  <div className="text-lg font-bold text-slate-800 font-mono mt-0.5">
                    {principal.toLocaleString('hu-HU')} Ft
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-xs text-blue-700">Egyszerű kamattal lenne:</div>
                  <div className="text-lg font-bold text-blue-900 font-mono mt-0.5">
                    {simpleTotal.toLocaleString('hu-HU')} Ft
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs text-emerald-700">Kamatos kamat plusz hozama:</div>
                  <div className="text-lg font-bold text-emerald-800 font-mono mt-0.5">
                    +{compoundBonus.toLocaleString('hu-HU')} Ft
                  </div>
                </div>
              </div>

              {/* Végtőke kiemelése */}
              <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 p-5 rounded-xl border border-indigo-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-indigo-800 font-bold uppercase tracking-wider">
                    Összes megtakarítás {years} év után (Végtőke):
                  </div>
                  <div className="text-xs text-indigo-600 font-mono">
                    Tₙ = {principal.toLocaleString('hu-HU')} · ({growthFactor.toFixed(3)})^{years}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-900 font-mono">
                  {compoundTotal.toLocaleString('hu-HU')} Ft
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FÜL: INFLÁCIÓ ÉS ÉRTÉKVESZTÉS */}
        {labTab === 'inflation' && (
          <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Szcenáriók:</span>
              <button
                onClick={() => applyPreset('carDepreciation')}
                className="px-3 py-1 bg-white hover:bg-rose-100 border border-rose-300 rounded-lg text-xs font-semibold text-rose-900 transition-colors"
              >
                🚗 Új autó amortizációja (15%/év)
              </button>
              <button
                onClick={() => applyPreset('inflation')}
                className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 transition-colors"
              >
                📉 5%-os éves infláció hatása (10 év)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kezdőérték: {initialValue.toLocaleString('hu-HU')} Ft
                </label>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="500000"
                  value={initialValue}
                  onChange={(e) => setInitialValue(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Éves csökkenés / Infláció: {inflationRate}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Időtartam: {inflationYears} év
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={inflationYears}
                  onChange={(e) => setInflationYears(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-600"
                />
              </div>
            </div>

            {/* Eredmény */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-100 border border-rose-300 space-y-2">
              <div className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                Reálérték alakulása:
              </div>
              <div className="text-xs font-mono text-slate-700">
                q = 1 - {inflationRate}/100 = {depreciationFactor.toFixed(2)} &nbsp;|&nbsp; Tₙ = {initialValue.toLocaleString('hu-HU')} · ({depreciationFactor.toFixed(2)})^{inflationYears}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-900 font-mono">
                {realPurchasingPower.toLocaleString('hu-HU')} Ft
              </div>
              <div className="text-xs text-rose-800 font-bold">
                A vagyon elveszítette kezdeti értékének {((lossAmount / initialValue) * 100).toFixed(1)}%-át ({lossAmount.toLocaleString('hu-HU')} Ft értékcsökkenés)!
              </div>
            </div>
          </div>
        )}
      </TheorySection>

      {/* 6. Gyakori csapdák és hibák */}
      <TheorySection
        number={6}
        title="Gyakori Pénzügyi Csapdák és Megoldásuk"
        badge="TIPPEK & CSAPDÁK"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryTrapBox
            title="1. Képletbeli csapda"
            mistake="Tₙ = T₀ · (1 + p · n / 100) számolása kamatos kamat helyett."
            correction="Az n év kamatos kamatnál a kitevőben áll: qⁿ, nem pedig a szorzóban!"
          />

          <TheoryTrapBox
            title="2. Kamattényező felírása"
            mistake="6%-os kamatnál q = 1,6-tal szorozni (ez 60%-ot jelentene!)."
            correction="6% = 0,06, így q = 1 + 0,06 = 1,06. Figyelj a helyiértékre!"
          />

          <TheoryTrapBox
            title="3. Névleges kamat vs. THM"
            mistake="Csak a hirdetett alacsony kamatot nézni hitelfelvételkor."
            correction="Mindig a THM-et nézd, mert az a kötelező díjakat és rejtett költségeket is tartalmazza!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CompoundInterestTheory;