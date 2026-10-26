import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Sparkles, TrendingUp, PiggyBank, ShieldCheck, DollarSign } from 'lucide-react';
import {
  CompoundInterestFormulaSvg,
  SimpleVsCompoundComparisonSvg,
  GrowthAndDepreciationSvg,
  FinancialTermsSvg
} from './CompoundInterestFigures';

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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Fejléc */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
              ⚡ TANANYAG
            </span>
            <span className="text-xs text-slate-500 font-medium">9. Osztály • II. A számok világa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kamatos kamat
          </h1>
          <p className="text-base text-slate-600 mt-1 max-w-2xl">
            A pénzügyi matematika alapjai: kezdőtőke, kamatláb, kamattényező, egyszerű vs. kamatos kamat, valamint az amortizáció és infláció modellezése.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors font-semibold text-sm flex items-center gap-2 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Vissza
            </button>
          )}
          {onStartQuiz && (
            <button
              onClick={onStartQuiz}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-sm hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Kvíz indítása
            </button>
          )}
        </div>
      </div>

      {/* 1. Alapfogalmak a pénzügyi matematikában */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
            1
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            A pénzügyi matematika alapfogalmai
          </h2>
        </div>

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
      </section>

      {/* 2. Egyszerű kamat vs. Kamatos kamat */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
            2
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Egyszerű kamat vs. Kamatos kamat: A lényegi különbség
          </h2>
        </div>

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
      </section>

      {/* 3. A Kamatos Kamat Képlete és Értékcsökkenés */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
            3
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            A képlet levezetése és az amortizáció
          </h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          Tekintsük át a tőke alakulását évről évre:
        </p>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-2">
          <div>• 0. év végén (kezdetben): <strong className="text-indigo-800">T₀</strong></div>
          <div>• 1. év végén: T₁ = T₀ · (1 + p/100) = <strong className="text-indigo-800">T₀ · q</strong></div>
          <div>• 2. év végén: T₂ = T₁ · q = (T₀ · q) · q = <strong className="text-indigo-800">T₀ · q²</strong></div>
          <div>• n. év végén: Tₙ = <strong className="text-indigo-900 text-sm font-black">T₀ · qⁿ</strong></div>
        </div>

        {/* Képlet ábra */}
        <CompoundInterestFormulaSvg />

        <div className="pt-2">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Értékcsökkenés (Amortizáció)
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm mb-4">
            Ha nem betétről, hanem egy használati tárgyról (pl. új gépkocsi, számítógép, gépsor) vagy az infláció miatti vásárlóerő-vesztésről van szó, az érték évről évre csökken. Ekkor a kamattényezőben <strong>mínusz előjel szerepel</strong>:
          </p>
          
          <GrowthAndDepreciationSvg />
        </div>
      </section>

      {/* 4. Pénzügyi Mutatók: EBKM és THM */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
            4
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Gyakorlati pénzügyi mutatók: EBKM és THM
          </h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          A banki hirdetésekben és szerződésekben szereplő névleges kamatláb gyakran félrevezető lehet a rejtett költségek és kamatozási periódusok miatt. Ezért a jogszabályok kötelezővé teszik az egységesített mutatók közzétételét:
        </p>

        <FinancialTermsSvg />

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            Évente többszöri tőkésítés (Féléves, havi kamatjóváírás)
          </h4>
          <p className="leading-relaxed">
            Ha a bank évente $m$ alkalommal tőkésít (pl. havonta: $m = 12$, félévente: $m = 2$), akkor egy periódusra a kamatláb $p/m$, az eltelt periódusok száma pedig $m \cdot n$. A tőke értéke:
          </p>
          <div className="font-mono font-bold text-amber-950 bg-white p-2 rounded-md border border-amber-200 text-center text-xs">
            Tₙ = T₀ · (1 + p / (100 · m))ᵐ·ⁿ
          </div>
          <p className="text-amber-800">
            Mivel a kamat év közben is elkezd kamatozni, a gyakoribb tőkésítés mindig kissé <strong>magasabb tényleges hozamot</strong> biztosít!
          </p>
        </div>
      </section>

      {/* 5. INTERAKTÍV PÉNZÜGYI LABORATÓRIUM */}
      <section className="bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent rounded-3xl p-6 sm:p-8 border-2 border-indigo-400/40 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Pénzügyi szimulátor</span>
              <h2 className="text-2xl font-black text-slate-900">Interaktív Kamatos Kamat Labor</h2>
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
      </section>

      {/* 6. Gyakori csapdák és hibák */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-lg">
            6
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Gyakori Pénzügyi Csapdák és Megoldásuk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              1. Képletbeli csapda
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              <strong>Hiba:</strong> Tₙ = T₀ · (1 + p · n / 100) számolása kamatos kamat helyett.<br />
              <strong>Megoldás:</strong> Az $n$ év kamatos kamatnál a <strong>kitevőben</strong> áll: $q^n$, nem pedig a szorzóban!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              2. Kamattényező felírása
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              <strong>Hiba:</strong> 6%-os kamatnál $q = 1,6$-tal szorozni (ez 60%-ot jelentene!).<br />
              <strong>Megoldás:</strong> $6\% = 0,06$, így $q = 1 + 0,06 = 1,06$. Figyelj a helyiértékre!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              3. Névleges kamat vs. THM
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              <strong>Hiba:</strong> Csak a "hirdetett" alacsony kamatot nézni hitelfelvételkor.<br />
              <strong>Megoldás:</strong> Mindig a <strong>THM</strong>-et (Teljes Hiteldíj Mutató) nézd, mert az a kötelező díjakat és rejtett költségeket is tartalmazza!
            </p>
          </div>
        </div>
      </section>

      {/* Záró kártya */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black">Próbáld ki a tudásod a pénzügyi kvízben!</h3>
          <p className="text-indigo-100 text-sm">
            30 válogatott feladat 3 szinten: egyszerű vs. kamatos kamat, tőkésítés, futamidő és érettségi típuspéldák.
          </p>
        </div>
        {onStartQuiz && (
          <button
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-xl bg-white text-indigo-800 hover:bg-indigo-50 font-black text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" /> Kvíz indítása
          </button>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestTheory;
