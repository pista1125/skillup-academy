import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Percent,
  Tag,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Calculator,
  RefreshCw,
  Coins
} from 'lucide-react';

interface PercentPracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PercentPracticeTheory: React.FC<PercentPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Szimulátor állapotok
  const [originalPrice, setOriginalPrice] = useState<number>(20000);
  const [changeType, setChangeType] = useState<'discount' | 'increase'>('discount');
  const [changePercent, setChangePercent] = useState<number>(20);

  // Számítások
  const factor = changeType === 'discount' ? 1 - changePercent / 100 : 1 + changePercent / 100;
  const difference = Math.round(originalPrice * (changePercent / 100));
  const finalPrice = changeType === 'discount' ? originalPrice - difference : originalPrice + difference;

  // Rebound (visszaváltoztatás) számítása
  const reboundDifference = Math.round(finalPrice * (changePercent / 100));
  const reboundPrice = changeType === 'discount' ? finalPrice + reboundDifference : finalPrice - reboundDifference;
  const netLossOrGain = reboundPrice - originalPrice;

  const sections: TheorySection[] = [
    {
      id: 'arvaltozasok',
      title: 'Árleszállítás és áremelés a gyakorlatban',
      badge: 'Alapszabályok',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A mindennapi életben a leggyakoribb százalékszámítási feladatok a bolti vásárlásokhoz, 
            akciókhoz és drágulásokhoz kapcsolódnak. Ilyenkor a kiinduló, eredeti ár a <strong>100%</strong>.
          </p>

          {/* Kiemelt képletkártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-pink-300 dark:border-pink-800 bg-gradient-to-r from-pink-50 via-rose-50/50 to-pink-50 dark:from-pink-950/40 dark:via-slate-900 dark:to-pink-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-300 border border-pink-200 dark:border-pink-700">
              <Sparkles className="w-3 h-3 text-pink-600" /> A gyors számítás kulcsa: a szorzótényező
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-pink-950 dark:text-pink-100 tracking-wide">
              Új ár = Eredeti ár · (1 ± p / 100)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Leárazásnál kivonunk (pl. -20% ⟹ 0,80-szoros ár), áremelésnél hozzáadunk (pl. +15% ⟹ 1,15-szörös ár).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <TrendingDown className="w-4 h-4 text-emerald-600" /> Árleszállítás (Kedvezmény)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A kedvezmény mértékét levonjuk a 100%-ból. Például egy 30%-os leértékelésnél a vevő az eredeti ár 
                <strong> 70%-át</strong> fizeti ki:
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 font-mono text-center font-bold text-emerald-700 dark:text-emerald-300">
                Fizetendő = Eredeti ár · 0,70
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
              <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <TrendingUp className="w-4 h-4 text-rose-600" /> Áremelés (Drágulás)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Az áremelés mértékét hozzáadjuk a 100%-hoz. Például egy 15%-os inflációs áremelésnél az új ár az eredeti ár 
                <strong> 115%-a</strong> lesz:
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 font-mono text-center font-bold text-rose-700 dark:text-rose-300">
                Új ár = Eredeti ár · 1,15
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'egymast-koveto-valtozasok',
      title: 'Egymást követő árváltozások – a legnagyobb buktató!',
      badge: 'Gyakori csapda',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Sokan azt hiszik, hogy ha egy árat 20%-kal felemelnek, majd utána 20%-kal leértékelnek, 
            akkor visszakapjuk a kezdeti árat. <strong>Ez a matematika egyik leggyakoribb tévedése!</strong>
          </p>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-3">
            <div className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Miért nem egyezik meg az ár?
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Mert a második százalékot már a <strong>megváltozott, új árból</strong> kell számolni, nem az eredetiből!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-center pt-1">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] text-slate-500 block">1. Eredeti ár</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">10 000 Ft</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] text-slate-500 block">2. +20% emelés után</span>
                <span className="font-bold text-rose-600 text-sm">12 000 Ft</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] text-slate-500 block">3. -20% leárazás után</span>
                <span className="font-bold text-pink-600 text-sm">9 600 Ft</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-[11px] italic">
              A 12 000 Ft 20%-a ugyanis 2400 Ft! Így 12 000 - 2400 = 9600 Ft. Az ár <strong>4%-kal csökkent</strong> az eredetihez képest!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'visszakovetkeztetes',
      title: 'Visszaszámolás: az eredeti ár meghatározása',
      badge: 'Fordított gondolkodás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakori feladat, amikor már az akciós vagy megnövelt árat ismerjük, és a leértékelés előtti 
            eredeti árat kell megtalálni.
          </p>

          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-xs space-y-3">
            <span className="font-bold text-sky-950 dark:text-sky-200 block uppercase tracking-wide">
              Mintapélda: Egy cipő 25%-os kedvezménnyel 15 000 Ft. Mennyi volt az eredeti ára?
            </span>
            <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <p>• <strong>1. lépés (A maradék százalék):</strong> 100% - 25% = 75%.</p>
              <p>• <strong>2. lépés (1% értéke):</strong> 15 000 : 75 = 200 Ft.</p>
              <p>• <strong>3. lépés (A 100% eredeti ár):</strong> 200 · 100 = 20 000 Ft.</p>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-sky-200 dark:border-sky-800 font-mono text-center font-bold text-sky-800 dark:text-sky-300">
              Képlettel: Eredeti ár = Akciós ár : 0,75 = 15 000 : 0,75 = 20 000 Ft
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'keverekek-oldatok',
      title: 'Keverékek, oldatok és ötvözetek százaléka',
      badge: 'Természettudományos alkalmazás',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Oldatoknál a százalék azt fejezi ki, hogy az oldott tiszta anyag a teljes oldat 
            tömegének hány százalékát adja (tömegszázalék):
          </p>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
            <div className="font-mono font-bold text-center text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/40 p-2.5 rounded-lg border border-pink-200 dark:border-pink-800">
              Tömegszázalék = (Oldott tiszta anyag tömege / Teljes oldat tömege) · 100%
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Fontos:</strong> A teljes oldat = oldószer (víz) + oldott anyag (só, cukor). 
              Ha 400 g vízben feloldunk 100 g cukrot, a teljes oldat 500 g, és a cukortartalom: 
              $100 / 500 = 20\%$.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="A százalékszámítás gyakorlása"
      subtitle="Árleszállítás, drágulás, kedvezmények, egymást követő árváltozások és keverékek a gyakorlatban"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="pink"
      pdfFilename="6_osztaly_IV_szazalekszamitas_gyakorlasa_tananyag.pdf"
      quickRule={{
        label: 'Árváltozások gyorsképlete',
        formula: 'Új ár = Eredeti ár · (1 + p / 100)  vagy  Új ár = Eredeti ár · (1 - p / 100)'
      }}
      practiceTitle="Készen állsz a bolti és szöveges feladványokra?"
      practiceSubtitle="Gyakorold az akciókat, drágulást és fordított szöveges feladatokat 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Árváltozás és Rebound Szimulátor */}
      <Card className="p-4 sm:p-5 border-pink-200 dark:border-pink-900/50 bg-gradient-to-br from-pink-50/50 via-white to-rose-50/30 dark:from-slate-900 dark:to-pink-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-200/60 dark:border-pink-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-pink-500 text-white shadow-xs">
                <Tag className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Árváltozás és Kedvezmény Szimulátor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Próbáld ki a kedvezményeket, az áremeléseket és az egymást követő változások hatását!
                </p>
              </div>
            </div>

            {/* Váltó gombok */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setChangeType('discount')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  changeType === 'discount'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Leárazás (-%)
              </button>
              <button
                onClick={() => setChangeType('increase')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  changeType === 'increase'
                    ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Áremelés (+%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Vizualizációs panel */}
            <div className="md:col-span-7 flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Eredeti kiinduló ár (100%):</span>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {originalPrice.toLocaleString('hu-HU')} Ft
                </span>
              </div>

              {/* Dinamikus vizuális sáv */}
              <div className="space-y-1.5">
                <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border border-slate-200 dark:border-slate-700 relative">
                  {changeType === 'discount' ? (
                    <>
                      <div
                        style={{ width: `${100 - changePercent}%` }}
                        className="h-full bg-emerald-500 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white tracking-wide"
                      >
                        Új ár: {100 - changePercent}%
                      </div>
                      <div
                        style={{ width: `${changePercent}%` }}
                        className="h-full bg-rose-400/80 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white tracking-wide"
                      >
                        -{changePercent}%
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{ width: `${Math.round(10000 / (100 + changePercent))}%` }}
                        className="h-full bg-slate-400 dark:bg-slate-600 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white tracking-wide"
                      >
                        Alap: 100%
                      </div>
                      <div
                        style={{ width: `${100 - Math.round(10000 / (100 + changePercent))}%` }}
                        className="h-full bg-rose-500 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white tracking-wide"
                      >
                        +{changePercent}%
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1">
                  <span>Szorzótényező: {factor.toFixed(2)}×</span>
                  <span className={changeType === 'discount' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    Változás összege: {changeType === 'discount' ? '-' : '+'}{difference.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
              </div>

              {/* Új ár nagy kártya */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Fizetendő új ár
                  </span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-pink-600 dark:text-pink-400">
                    {finalPrice.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Képlet:</span>
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                    {originalPrice.toLocaleString('hu-HU')} · {factor.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Rebound (egymást követő árváltozás teszt) */}
              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600" /> Mi történik, ha visszaváltoztatjuk {changePercent}%-kal?
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Ha az új árat ({finalPrice.toLocaleString('hu-HU')} Ft) most {changeType === 'discount' ? 'felemeljük' : 'leárazzuk'} {changePercent}%-kal:
                </p>
                <div className="font-mono font-bold text-amber-950 dark:text-amber-100 flex items-center justify-between pt-0.5">
                  <span>Eredmény: {reboundPrice.toLocaleString('hu-HU')} Ft</span>
                  <span className="text-rose-600 font-black">
                    Eltérés az eredetitől: {netLossOrGain > 0 ? `+${netLossOrGain}` : netLossOrGain} Ft!
                  </span>
                </div>
              </div>
            </div>

            {/* Vezérlők panel */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Eredeti kiinduló ár:</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 font-bold">
                    {originalPrice.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
                <Slider
                  value={[originalPrice]}
                  min={5000}
                  max={50000}
                  step={2500}
                  onValueChange={(val) => setOriginalPrice(val[0])}
                  className="py-1"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Árváltozás mértéke (%):</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 font-bold">
                    {changePercent}%
                  </span>
                </div>
                <Slider
                  value={[changePercent]}
                  min={5}
                  max={50}
                  step={5}
                  onValueChange={(val) => setChangePercent(val[0])}
                  className="py-1"
                />
              </div>

              <div className="p-3 rounded-xl bg-pink-50/80 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-bold text-pink-900 dark:text-pink-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <Lightbulb className="w-3.5 h-3.5 text-pink-600" /> Tipp a fejszámoláshoz
                </span>
                <p>
                  10%-ot mindig egy 0 levágásával kapsz meg. 20%-hoz duplázd a 10%-ot, 5%-hoz pedig felezd meg!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default PercentPracticeTheory;
