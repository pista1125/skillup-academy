import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Layers,
  Calculator,
  ShoppingCart,
  Car,
  Square,
  TrendingUp
} from 'lucide-react';

interface DirectProportionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const DirectProportionTheory: React.FC<DirectProportionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [unitRate, setUnitRate] = useState<number>(350); // pl. 350 Ft/kg vagy 60 km/h
  const [quantity, setQuantity] = useState<number>(3);   // pl. 3 kg vagy 3 óra
  const [scenario, setScenario] = useState<'shopping' | 'motion' | 'square'>('shopping');

  // Dinamikus számítások
  const total = unitRate * quantity;
  const ratio = (total / quantity).toFixed(0);

  const scenarioConfig = {
    shopping: {
      name: 'Vásárlás',
      xLabel: 'Mennyiség (kg)',
      yLabel: 'Fizetendő (Ft)',
      unitRateLabel: 'Egységár (Ft/kg)',
      icon: <ShoppingCart className="w-4 h-4 text-amber-600" />,
      minRate: 100,
      maxRate: 1000,
      stepRate: 50,
      unitStr: 'kg',
      valueStr: 'Ft',
      formula: 'Ár = Egységár · Mennyiség'
    },
    motion: {
      name: 'Egyenletes mozgás',
      xLabel: 'Idő (óra)',
      yLabel: 'Megtett út (km)',
      unitRateLabel: 'Sebesség (km/h)',
      icon: <Car className="w-4 h-4 text-blue-600" />,
      minRate: 20,
      maxRate: 120,
      stepRate: 10,
      unitStr: 'óra',
      valueStr: 'km',
      formula: 'Út = Sebesség · Idő (s = v · t)'
    },
    square: {
      name: 'Négyzet kerülete',
      xLabel: 'Oldalhossz (a cm)',
      yLabel: 'Kerület (K cm)',
      unitRateLabel: 'Szorzó (4 oldal)',
      icon: <Square className="w-4 h-4 text-emerald-600" />,
      minRate: 4,
      maxRate: 4,
      stepRate: 1,
      unitStr: 'cm',
      valueStr: 'cm',
      formula: 'Kerület = 4 · a'
    }
  };

  const currentScen = scenarioConfig[scenario];

  const sections: TheorySection[] = [
    {
      id: 'fogalom',
      title: 'Az egyenes arányosság fogalma és aranyszabálya',
      badge: 'Alapszabály',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Két összetartozó mennyiség <strong>egyenesen arányos</strong>, ha az egyik mennyiség valahányszorosára 
            (pl. 2-szeresére, 3-szorosára vagy épp felére) változik, akkor a hozzá tartozó másik mennyiség 
            is <strong>ugyanannyiszorosára</strong> (2-szeresére, 3-szorosára vagy felére) változik.
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 dark:from-amber-950/40 dark:via-slate-900 dark:to-amber-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
              <Sparkles className="w-3 h-3 text-amber-600" /> Kiemelt összefüggés és képlet
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-amber-950 dark:text-amber-100 tracking-wide">
              y / x = k (állandó) &nbsp;⟹&nbsp; y = k · x
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Az összetartozó értékek <strong>hányadosa mindig állandó</strong> (<MathText>k</MathText> az arányossági tényező / egységár / sebesség).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 space-y-3">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 text-sm">
              <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              A két aranyszabály
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  1. Együtt változnak azonos irányba
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Ha <code className="font-bold text-amber-600">többet</code> veszünk, <code className="font-bold text-amber-600">többet</code> fizetünk.
                  Ha a felét vesszük, pontosan a felét fizetjük.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  2. Állandó a hányadosuk!
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Az összetartozó értékek hányadosa (aránya) mindig állandó szám: 
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400 block pt-0.5">y / x = k (állandó)</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              Szemléltető táblázat (pl. 400 Ft/kg alma)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Mennyiség (x)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">1 kg</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">2 kg (2×)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">3 kg (3×)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">5 kg (5×)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-bold border border-slate-200 dark:border-slate-700 text-left bg-slate-50 dark:bg-slate-850">
                      Ár (y)
                    </td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 font-bold">400 Ft</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 font-bold">800 Ft (2×)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 font-bold">1200 Ft (3×)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 font-bold">2000 Ft (5×)</td>
                  </tr>
                  <tr className="bg-amber-50/50 dark:bg-amber-950/20 text-slate-600 dark:text-slate-400 text-[11px]">
                    <td className="p-1.5 font-bold border border-slate-200 dark:border-slate-700 text-left">
                      Hányados (y / x)
                    </td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 font-mono">400 / 1 = 400</td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 font-mono">800 / 2 = 400</td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 font-mono">1200 / 3 = 400</td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 font-mono">2000 / 5 = 400</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              A hányados mindig 400 Ft/kg: ez az egyenes arányossági tényező (k), az egységár.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'kovetkeztetes',
      title: 'Következtetés egységre (A 3 lépéses módszer)',
      badge: 'Feladatmegoldás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az arányossági feladatok legegyszerűbb, legbiztosabb megoldási módja a <strong>következtetés 1 egységre</strong> (egységre való visszavezetés).
          </p>

          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/70 dark:bg-sky-950/20 space-y-3">
            <h4 className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-2 text-sm">
              <Calculator className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              A 3 lépéses következtetés menete
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-xs">
                <span className="font-bold text-sky-800 dark:text-sky-300 block mb-1">
                  1. Kiinduló állapot
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Felírjuk az összetartozó mennyiségeket egy sorba.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-xs">
                <span className="font-bold text-sky-800 dark:text-sky-300 block mb-1">
                  2. Kiszámoljuk az 1 egységet
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Osztással</strong> meghatározzuk, hogy 1 kg, 1 óra, 1 db mennyibe kerül vagy mekkora.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-xs">
                <span className="font-bold text-sky-800 dark:text-sky-300 block mb-1">
                  3. Keresett mennyiség
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Szorzással</strong> kiszámoljuk a célmennyiséget az 1 egység értékéből.
                </p>
              </div>
            </div>
          </div>

          {/* Konkrét kidolgozott példa */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-3">
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Kidolgozott mintapélda: Narancsvásárlás
            </span>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Feladat: Ha 3 kg narancs 1800 Ft-ba kerül, mennyibe kerül 5 kg narancs?
              </p>

              <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono text-[11px] pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500 font-sans">1. Ismert:</span>
                  <span>3 kg narancs = 1800 Ft</span>
                </div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold">
                  <span className="w-24 text-slate-500 font-sans font-normal">2. Osztás (1 kg):</span>
                  <span>1 kg narancs = 1800 Ft : 3 = 600 Ft</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="w-24 text-slate-500 font-sans font-normal">3. Szorzás (5 kg):</span>
                  <span>5 kg narancs = 5 · 600 Ft = 3000 Ft</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-[11px]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span><strong>Válasz:</strong> 5 kg narancs 3000 Ft-ba kerül. (Ellenőrzés: 3000 / 5 = 600 Ft/kg).</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'peldatar',
      title: 'Gyakori példák a való életből és geometriából',
      badge: 'Alkalmazások',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az egyenes arányosság az egyik leggyakoribb matematikai összefüggés a természetben és a mindennapi életben:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" />
                Vásárlás és mérés
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                A vásárolt áru mennyisége és az ára (ha nincs mennyiségi kedvezmény). Pl. 2 füzet 600 Ft, 4 füzet 1200 Ft.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <div className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" />
                Egyenletes mozgás (s = v · t)
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Állandó sebességnél a megtett út és az idő: ha kétszer annyi ideig gyalogolsz vagy vezetsz, kétszer akkora utat teszel meg.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Square className="w-3.5 h-3.5" />
                Négyzet és szabályos sokszögek kerülete
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                A négyzet oldala (a) és kerülete (K = 4a): ha az oldalhosszt duplázzuk, a kerület is pontosan a duplájára nő.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <div className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Receptek és keverékek
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Ha 4 adag palacsintához 2 tojás kell, akkor 8 adaghoz 4 tojás, 12 adaghoz 6 tojás szükséges.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'csapdak',
      title: 'Veszélyzóna: Mikor NEM egyenes az arányosság? (Gyakori hibák)',
      badge: 'Csapdák',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakori tévedés azt hinni, hogy ha két mennyiség együtt növekszik, az már automatikusan egyenes arányosság. 
            <strong>Nem minden növekedés arányos!</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                1. Életkor és méretek
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Ha Peti 10 éves, a húga 5 éves (kétszer annyi idős). De 10 év múlva Peti 20, a húga 15 lesz (már nem kétszer annyi!).
                Az életkor és a cipőméret/testmagasság <strong>nem</strong> egyenesen arányos.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                2. Négyzet területe (T = a²)
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Ha egy négyzet oldala 2 cm (T = 4 cm²), és megduplázzuk 4 cm-re, a területe <strong>négyszeresére</strong> nő (T = 16 cm²), 
                nem pedig a duplájára! A terület <strong>négyzetesen</strong> arányos, nem egyenesen!
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                3. Jármű féktávolsága
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Kétszeres sebességnél a fékút nem kétszeres, hanem <strong>négyszeres</strong> (a sebesség négyzetével arányos).
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                4. Munkások és idő (Fordított arányosság!)
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Ha 2 munkás 6 óra alatt festi le a kerítést, akkor 4 munkás <strong>hamarabb</strong> (3 óra alatt) végez.
                Több munkás = kevesebb idő. Ez <strong>fordított arányosság</strong>!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Egyenes arányosság"
      subtitle="Két összetartozó mennyiség állandó hányadosa, következtetés és mindennapi összefüggések"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="amber"
      pdfFilename="6_osztaly_IV_egyenes_aranyossag_tananyag.pdf"
      quickRule={{
        label: 'Az egyenes arányosság alaptörvénye',
        formula: 'y / x = k (állandó hányados)  ⟹  y = k · x'
      }}
      practiceTitle="Készen állsz a kvízre és az aránypárokra?"
      practiceSubtitle="Gyakorold az egyenes arányosság kiszámítását és összefüggéseit 3 fokozatban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív szimulátor labor */}
      <Card className="p-4 sm:p-5 border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/60 to-white dark:from-slate-900 dark:to-amber-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 dark:border-amber-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500 text-white shadow-xs">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Arányossági Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Figyeld meg, hogyan változik az eredmény a szorzással és osztással!
                </p>
              </div>
            </div>

            {/* Szituáció választó gombok */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => {
                  setScenario('shopping');
                  setUnitRate(350);
                  setQuantity(3);
                }}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  scenario === 'shopping'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                🛒 Vásárlás
              </button>
              <button
                onClick={() => {
                  setScenario('motion');
                  setUnitRate(60);
                  setQuantity(2);
                }}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  scenario === 'motion'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                🚗 Mozgás
              </button>
              <button
                onClick={() => {
                  setScenario('square');
                  setUnitRate(4);
                  setQuantity(5);
                }}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  scenario === 'square'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                🟩 Négyzet
              </button>
            </div>
          </div>

          {/* Csúszkák és vezérlők */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Egységár / tényező csúszka */}
            {scenario !== 'square' ? (
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {currentScen.unitRateLabel} (k):
                  </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold text-sm">
                    {unitRate} {currentScen.valueStr}/{currentScen.unitStr}
                  </span>
                </div>
                <Slider
                  value={[unitRate]}
                  onValueChange={val => setUnitRate(val[0])}
                  min={currentScen.minRate}
                  max={currentScen.maxRate}
                  step={currentScen.stepRate}
                  className="w-full"
                />
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Négyzet oldalainak száma (állandó szorzó):
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                  k = 4 (minden négyzetnek 4 egyenlő oldala van)
                </span>
              </div>
            )}

            {/* Mennyiség csúszka */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">
                  {currentScen.xLabel} (x):
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold text-sm">
                  {quantity} {currentScen.unitStr}
                </span>
              </div>
              <Slider
                value={[quantity]}
                onValueChange={val => setQuantity(val[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Gyors gombok (duplázás, triplázás, felezés) */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-100/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-200">
              Próbáld ki a gyors arányos változást:
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-white dark:bg-slate-900"
                onClick={() => setQuantity(Math.max(1, Math.floor(quantity / 2)))}
                disabled={quantity <= 1}
              >
                ÷ 2 (Fele)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-white dark:bg-slate-900"
                onClick={() => setQuantity(Math.min(10, quantity * 2))}
                disabled={quantity * 2 > 10}
              >
                × 2 (Dupla)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-white dark:bg-slate-900"
                onClick={() => setQuantity(Math.min(10, quantity * 3))}
                disabled={quantity * 3 > 10}
              >
                × 3 (Tripla)
              </Button>
            </div>
          </div>

          {/* Számított eredmény nagy kártyája */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Képlet és eredmény:
                </span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
                  {currentScen.formula}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {currentScen.yLabel}:
                </span>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                  {total.toLocaleString('hu-HU')} {currentScen.valueStr}
                </span>
              </div>
            </div>

            {/* Szemléltető pont- vagy oszlopdiagram */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
                <span>Egységek kirakása ({quantity} {currentScen.unitStr}):</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                  Állandó hányados: {total} / {quantity} = {ratio} {currentScen.valueStr}/{currentScen.unitStr}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                {Array.from({ length: quantity }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-amber-500 text-white font-mono text-[11px] font-bold shadow-xs min-w-[70px]"
                  >
                    <span>1 {currentScen.unitStr}</span>
                    <span className="text-[10px] opacity-90">{unitRate} {currentScen.valueStr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default DirectProportionTheory;
