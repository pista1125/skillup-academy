import React, { useState } from 'react';
import {
  CircleDot,
  Sliders,
  Layers,
  ArrowRightLeft,
  AlertTriangle,
  Sparkles,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Compass,
  Repeat,
  Globe,
  Atom
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  ScientificNotationStructureSvg,
  DecimalShiftSvg,
  UniverseScaleSvg,
  CalculatorDisplaySvg
} from './ScientificNotationFigures';

interface ScientificNotationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ScientificNotationTheory: React.FC<ScientificNotationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR ÁLLAPOTOK ---
  const [labTab, setLabTab] = useState<'converter' | 'universe'>('converter');

  // Konverter presetek
  const [converterPresetId, setConverterPresetId] = useState<number>(0);

  // Univerzum skála kiválasztott eleme
  const [scaleItemIndex, setScaleItemIndex] = useState<number>(2);

  const converterPresets = [
    {
      id: 0,
      name: 'Fénysebesség vákuumban',
      standardNum: '300 000 000 m/s',
      category: 'Nagy szám (k > 0)',
      direction: 'Balra',
      steps: 8,
      mantissa: '3',
      exponent: '8',
      result: '3 · 10⁸ m/s',
      explanation: 'A tizedesvessző a szám végén állt. 8 helyiértéket toltuk balra, így a mantissza 3 lett (1 ≤ 3 < 10), a kitevő pedig +8.'
    },
    {
      id: 1,
      name: 'Föld – Hold átlagos távolsága',
      standardNum: '384 400 km',
      category: 'Nagy szám (k > 0)',
      direction: 'Balra',
      steps: 5,
      mantissa: '3,844',
      exponent: '5',
      result: '3,844 · 10⁵ km',
      explanation: 'A vesszőt 5 hellyel toljuk balra, hogy az első nemnulla jegy (3) után álljon. A mantissza 3,844, a kitevő 5.'
    },
    {
      id: 2,
      name: 'Vörösvértest átmérője',
      standardNum: '0,000007 m',
      category: 'Kis szám (k < 0)',
      direction: 'Jobbra',
      steps: 6,
      mantissa: '7',
      exponent: '-6',
      result: '7 · 10⁻⁶ m',
      explanation: 'A vesszőt 6 helyiértékkel toljuk jobbra a 7-es számjegy mögé. Mivel 1-nél kisebb számról van szó, a kitevő negatív: -6.'
    },
    {
      id: 3,
      name: 'Vízmolekula tömege',
      standardNum: '0,0000000000000000000000299 g',
      category: 'Kis szám (k < 0)',
      direction: 'Jobbra',
      steps: 23,
      mantissa: '2,99',
      exponent: '-23',
      result: '2,99 · 10⁻²³ g',
      explanation: '23 helyiértéket léptetünk jobbra az első nemnulla jegy (2) utánig. A normálalak azonnal átláthatóvá teszi a 23 db nullát!'
    },
    {
      id: 4,
      name: 'Nem szabványos alak javítása',
      standardNum: '450 · 10³',
      category: 'Korrekció',
      direction: 'Balra (2 lépés)',
      steps: 2,
      mantissa: '4,5',
      exponent: '5 (3 + 2)',
      result: '4,5 · 10⁵',
      explanation: 'A 450 nem esik az [1; 10) sávba! 450 = 4,5 · 10². Így: 450 · 10³ = (4,5 · 10²) · 10³ = 4,5 · 10⁵.'
    }
  ];

  const universeScaleItems = [
    {
      name: 'Atommag átmérője',
      value: '10⁻¹⁵ m',
      category: 'Szubatomi méret',
      description: 'A protonok és neutronok alkotják. Szabad szemmel teljesen láthatatlan.',
      icon: <Atom className="w-5 h-5 text-rose-500" />
    },
    {
      name: 'DNS spirál szélessége',
      value: '2 · 10⁻⁹ m (2 nm)',
      category: 'Molekuláris szint',
      description: 'A genetikai kódunkat hordozó kettős hélix szélessége kb. 2 nanométer.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      name: 'Emberi testmagasság',
      value: '1,75 · 10⁰ m (1,75 m)',
      category: 'Hétköznapi világ',
      description: 'A mindennapi világunk mértéke: a 10⁰ kitevő éppen 1 méter nagyságrendű.',
      icon: <CircleDot className="w-5 h-5 text-emerald-500" />
    },
    {
      name: 'A Föld átmérője',
      value: '1,274 · 10⁷ m (12 740 km)',
      category: 'Bolygóméret',
      description: 'Több mint 12 millió méter. Normálalak nélkül nehéz lenne összevetni más bolygókkal.',
      icon: <Globe className="w-5 h-5 text-blue-500" />
    },
    {
      name: 'Megfigyelhető Univerzum átmérője',
      value: '8,8 · 10²⁶ m (93 milliárd fényév)',
      category: 'Kozmológiai méret',
      description: 'A belátható világegyetem mérete. Normálalak nélkül 27 darab számjegyet kellene kiírnunk!',
      icon: <Compass className="w-5 h-5 text-purple-500" />
    }
  ];

  const currentPreset = converterPresets[converterPresetId];

  return (
    <TheoryTemplate
      title="Számok Normálalakja (Tudományos Jelölésmód)"
      subtitle="Nagyon nagy és nagyon kicsi számok kompakt leírása, az a · 10^k alak, és az áttérés tizedestörtre."
      badge="10. TÉMAKÖR"
      badgeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quizButtonText="Gyakorló Kvíz Indítása"
    >
      {/* 1. SZEKCIÓ: MIÉRT VAN SZÜKSÉG NORMÁLALAKRA? */}
      <TheorySection
        number={1}
        title="Miért van Szükség Normálalakra? A Mikro- és Makrovilág Számai"
        icon={<Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Áttekintés"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A természettudományokban (fizika, kémia, csillagászat, biológia) rendszeresen találkozunk olyan mennyiségekkel,
            amelyeket a hagyományos tizedestört alakban <strong>szinte lehetetlen leírni vagy elolvasni</strong> a tengernyi nulla miatt:
          </p>

          <UniverseScaleSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <TheoryCard
              title="A Makrovilág Óriásai"
              badge="Pozitív kitevők"
              badgeColor="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A Nap tömege: <strong>$1\,989\,000\,000\,000\,000\,000\,000\,000\,000\,000\text{ kg}$</strong>.
                Könnyű eltéveszteni a 30 darab nullát!
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/40 p-2 rounded text-center font-mono text-xs my-2 font-bold text-blue-700 dark:text-blue-300">
                Normálalakban: $1,989 \cdot 10^{30}\text{ kg}$
              </div>
            </TheoryCard>

            <TheoryCard
              title="A Mikrovilág Parányai"
              badge="Negatív kitevők"
              badgeColor="purple"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egy elektron tömege: <strong>$0,000000000000000000000000000000911\text{ kg}$</strong>.
                Átláthatatlan tizedesjegyek sokasága!
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/40 p-2 rounded text-center font-mono text-xs my-2 font-bold text-purple-700 dark:text-purple-300">
                Normálalakban: $9,11 \cdot 10^{-31}\text{ kg}$
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A NORMÁLALAK PONTOS DEFINÍCIÓJA */}
      <TheorySection
        number={2}
        title="A Normálalak Szigorú Matematikai Definíciója"
        icon={<CircleDot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Definíció"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Nem minden $10$-es hatványos szorzat normálalak! A matematikában szigorú egyezmény rögzíti, hogy milyen számnak
            kell állnia a $10$-es hatvány előtt.
          </p>

          <ScientificNotationStructureSvg />

          <TheoryCallout
            type="info"
            title="A Normálalak Alaptétele"
          >
            <p className="text-sm leading-relaxed">
              Bármely nemnulla valós szám <strong>egyértelműen</strong> felírható a következő alakban:
              <span className="block my-2 font-mono text-center font-bold text-base">a · 10ᵏ</span>
              ahol:
              <br />
              • <strong>a a mantissza:</strong> olyan valós szám, amelyre 1 ≤ |a| &lt; 10 (tehát a tizedesvessző előtt pontosan 1 db nemnulla számjegy áll: 1, 2, 3, 4, 5, 6, 7, 8 vagy 9).
              <br />
              • <strong>k a kitevő (karakterisztika):</strong> tetszőleges egész szám (k ∈ ℤ).
            </p>
          </TheoryCallout>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-center font-mono text-xs">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-emerald-800 dark:text-emerald-300 font-bold block mb-1">✅ Helyes normálalak</span>
              <p className="text-slate-700 dark:text-slate-300 font-black text-sm">3,5 · 10⁶</p>
              <p className="text-slate-500 text-xs mt-1">1 ≤ 3,5 &lt; 10</p>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl">
              <span className="text-rose-800 dark:text-rose-300 font-bold block mb-1">❌ Nem normálalak!</span>
              <p className="text-slate-700 dark:text-slate-300 font-black text-sm">35 · 10⁵</p>
              <p className="text-slate-500 text-xs mt-1">35 nem kisebb 10-nél!</p>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl">
              <span className="text-rose-800 dark:text-rose-300 font-bold block mb-1">❌ Nem normálalak!</span>
              <p className="text-slate-700 dark:text-slate-300 font-black text-sm">0,35 · 10⁷</p>
              <p className="text-slate-500 text-xs mt-1">0,35 nem éri el az 1-et!</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: ÁTTÉRÉS NORMÁLALAKRA ÉS VISSZA */}
      <TheorySection
        number={3}
        title="Áttérés Normálalakra és Vissza: A Vesszőléptetés Szabálya"
        icon={<Repeat className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="Módszertan"
        badgeColor="teal"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Hogyan alakítunk át egy tetszőleges számot normálalakra?
            Az aranyszabály nagyon egyszerű: <strong>addig toljuk a tizedesvesszőt, amíg pontosan egy darab nemnulla számjegy marad előtte</strong>.
          </p>

          <DecimalShiftSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <TheoryCard
              title="1. Nagy Számok (≥ 10) ➔ Balra lépés"
              badge="Kitevő pozitív (+k)"
              badgeColor="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a tizedesvesszőt <strong>$k$ hellyel balra toljuk</strong>, akkor a számot $10^k$-nal osztottuk,
                ezért a $10$-es hatvány kitevője <strong>$+k$</strong> lesz:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-xs my-2 text-emerald-700 dark:text-emerald-300 font-bold">
                $5\,200\,000 = 5,2 \cdot 10^6$ (6 lépés balra)
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Kis Számok (< 1) ➔ Jobbra lépés"
              badge="Kitevő negatív (-k)"
              badgeColor="rose"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a tizedesvesszőt <strong>$k$ hellyel jobbra toljuk</strong>, akkor a számot $10^k$-nal szoroztuk,
                ezért a $10$-es hatvány kitevője <strong>$-k$</strong> lesz:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-xs my-2 text-rose-700 dark:text-rose-300 font-bold">
                $0,00078 = 7,8 \cdot 10^{-4}$ (4 lépés jobbra)
              </div>
            </TheoryCard>
          </div>

          <CalculatorDisplaySvg />
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV NORMÁLALAK LABOR ÉS SKÁLA EXPLORER */}
      <TheorySection
        number={4}
        title="Interaktív Normálalak Labor és Univerzum Explorer"
        icon={<Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badge="Interaktív Labor"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Teszteld a normálalak működését: alakíts át valós fizikai és csillagászati adatokat lépésről lépésre,
            vagy fedezd fel az univerzum lenyűgöző méretskáláját!
          </p>

          {/* Fülválasztó gombok */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setLabTab('converter')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                labTab === 'converter'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Dinamikus Normálalak Konverter
            </button>
            <button
              onClick={() => setLabTab('universe')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                labTab === 'universe'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              2. Univerzum Skála Explorer
            </button>
          </div>

          {/* 1. FÜL: DINAMIKUS KONVERTER */}
          {labTab === 'converter' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Válassz egy valós mintát:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {converterPresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setConverterPresetId(preset.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        converterPresetId === preset.id
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset.id + 1}. Minta
                    </button>
                  ))}
                </div>
              </div>

              {/* Minta kártya */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentPreset.name}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {currentPreset.category}
                  </span>
                </div>
                <div className="text-center font-mono text-xl font-black text-slate-800 dark:text-slate-200 my-2">
                  {currentPreset.standardNum}
                </div>
              </div>

              {/* Lépések */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Léptetés Iránya</span>
                  <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-1">
                    {currentPreset.direction}
                  </p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Mantissza (a)</span>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    a = {currentPreset.mantissa}
                  </p>
                  <span className="text-xs text-slate-400">1 ≤ |a| &lt; 10</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">10-es Kitevő (k)</span>
                  <p className="text-sm font-black text-purple-600 dark:text-purple-400 mt-1 font-mono">
                    k = {currentPreset.exponent}
                  </p>
                </div>
              </div>

              {/* Magyarázat */}
              <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                💡 <strong>Levezetés:</strong> {currentPreset.explanation}
              </p>

              {/* Végeredmény */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider block">
                  Szabványos Normálalak:
                </span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-200 font-mono">
                  {currentPreset.result}
                </span>
              </div>
            </div>
          )}

          {/* 2. FÜL: UNIVERZUM SKÁLA EXPLORER */}
          {labTab === 'universe' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Kattints a méretállomásra a skálán:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {universeScaleItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setScaleItemIndex(index)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      scaleItemIndex === index
                        ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.value}
                    </span>
                  </button>
                ))}
              </div>

              {/* Részletek kártya */}
              {universeScaleItems[scaleItemIndex] && (
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      {universeScaleItems[scaleItemIndex].icon}
                      {universeScaleItems[scaleItemIndex].name}
                    </h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {universeScaleItems[scaleItemIndex].category}
                    </span>
                  </div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    Nagyságrend: {universeScaleItems[scaleItemIndex].value}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {universeScaleItems[scaleItemIndex].description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSÉGI CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Normálalakos Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: A mantissza nem esik az [1; 10) sávba: 45 · 10⁴ NEM normálalak!"
            trap="Normálalakban van-e a 45 · 10⁴ kifejezés?"
            wrong="Igen, mert van benne 10-es hatvány."
            wrongExplanation="Súlyos definíciós hiba! A normálalak definíciója szerint a mantisszának 1 és 10 közé kell esnie: 1 ≤ |a| < 10. A 45 nem kisebb 10-nél, ezért ezt kötelező tovább alakítani: 45 = 4,5 · 10¹, így 45 · 10⁴ = 4,5 · 10⁵!"
            correct="Nem! A helyes alak: 4,5 · 10⁵"
            correctExplanation="Ha a mantissza túl nagy (≥10), a vesszőt balra toljuk, és a 10-es kitevőt növeljük!"
            tip="Aranyszabály: A vessző előtt PONTOSAN EGY DARAB nemnulla számjegynek kell állnia!"
          />

          <TheoryTrapBox
            title="2. Buktató: A negatív kitevő NEM teszi negatívvá a számot!"
            trap="Mennyi 3 · 10⁻⁴ előjele? Pozitív vagy negatív?"
            wrong="Negatív, mert a kitevőben mínusz van."
            wrongExplanation="Óriási tévhit! A negatív kitevő a hatványozásnál a reciprok képzését jelenti: 10⁻⁴ = 1/10000 = 0,0001. A 3 · 10⁻⁴ értéke 0,0003, ami egy POZITÍV szám!"
            correct="Pozitív! 3 · 10⁻⁴ = 0,0003 > 0"
            correctExplanation="A kitevő mínuszjele csak annyit jelez, hogy a szám 1-nél kisebb tizedestört, de ettől még szigorúan pozitív marad."
            tip="Jegyezd meg: A szám előjelét a mantissza előjele adja, a kitevő előjele csak a nagyságrendet!"
          />

          <TheoryTrapBox
            title="3. Buktató: Negatív szám normálalakja"
            trap="Hogyan írjuk fel normálalakban a -75 000 számot?"
            wrong="7,5 · 10⁻⁴ vagy -(7,5 · 10⁻⁴)"
            wrongExplanation="A negatív szám normálalakjánál a negatív előjel a mantissza elé kerül: -7,5 (mivel 1 ≤ |-7,5| = 7,5 < 10 teljesül). A szám értéke 75 000, ami nagyobb 1-nél, így a kitevő pozitív (+4)!"
            correct="-75 000 = -7,5 · 10⁴"
            correctExplanation="A mantissza -7,5, a kitevő +4. A kitevőbe SOHA nem tesszük át a szám előjelét!"
            tip="Tipp: Előbb írd fel a pozitív párját (75 000 = 7,5 · 10⁴), majd tedd elé a mínuszjelet: -7,5 · 10⁴!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ScientificNotationTheory;
