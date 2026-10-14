import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  BookOpen,
  Calculator,
  PieChart,
  Percent,
  Layers,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Table,
  RotateCcw
} from 'lucide-react';

interface RatioSummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RatioSummaryTheory: React.FC<RatioSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Master labor állapota: Mód választás (arányos osztás, százalék, egyenes arányosság)
  const [labMode, setLabMode] = useState<'ratio' | 'percent' | 'proportion'>('ratio');

  // Arányos osztás bemenetek
  const [totalAmount, setTotalAmount] = useState<number>(10000);
  const [partA, setPartA] = useState<number>(2);
  const [partB, setPartB] = useState<number>(3);

  // Százalékszámítás bemenetek
  const [baseVal, setBaseVal] = useState<number>(5000);
  const [percentVal, setPercentVal] = useState<number>(20);

  // Egyenes arányosság bemenetek
  const [unitPrice, setUnitPrice] = useState<number>(450);
  const [quantity, setQuantity] = useState<number>(4);

  // Számítások
  const totalParts = Math.max(1, partA + partB);
  const onePart = totalAmount / totalParts;
  const shareA = onePart * partA;
  const shareB = onePart * partB;

  const percentAmount = (baseVal * percentVal) / 100;
  const increasedVal = baseVal + percentAmount;
  const discountedVal = baseVal - percentAmount;

  const totalCost = unitPrice * quantity;

  const sections: TheorySection[] = [
    {
      id: 'arany-es-aranyos-osztas',
      title: '1. Arány és arányos osztás',
      badge: 'Alapismeretek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az <strong>arány</strong> két azonos mértékegységű mennyiség hányadosa, amely megmutatja, 
            hányszorosa az egyik mennyiség a másiknak.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1.5">
              <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase text-[11px]">
                Arányok egyszerűsítése és bővítése
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Az arány tagjait ugyanazzal a nullától különböző számmal szorozhatjuk vagy oszthatjuk anélkül, 
                hogy az arány értéke megváltozna.
                <br /><strong className="text-amber-600 font-mono">Példa: $12 : 18 = 6 : 9 = 2 : 3$</strong> (legkisebb egész tagokkal).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 space-y-1.5">
              <span className="font-bold text-amber-800 dark:text-amber-200 block uppercase text-[11px]">
                Arányos osztás 3 alaplépése
              </span>
              <ul className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li>Összes rész meghatározása: $p_1 + p_2$.</li>
                <li>Egyetlen rész értéke: Összeg : Összes rész.</li>
                <li>Az egyes részesedések kiszámítása és ellenőrzése.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'egyenes-aranyossag',
      title: '2. Egyenes arányosság és grafikonja',
      badge: 'Függvények',
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Két összetartozó mennyiség <strong>egyenesen arányos</strong>, ha az egyik mennyiség valahányszorosára 
            változik, akkor a másik mennyiség is <strong>ugyanannyiszorosára</strong> változik.
          </p>

          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/30 dark:bg-sky-950/20 space-y-2">
            <h4 className="font-bold text-sky-900 dark:text-sky-200 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" /> A legfontosabb tulajdonságok:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
              <p>• <strong>Állandó hányados:</strong> $y : x = k$ (arányossági tényező, pl. egységár, sebesség).</p>
              <p>• <strong>Képlet:</strong> $y = k \cdot x$.</p>
              <p>• <strong>Grafikon:</strong> A derékszögű koordináta-rendszerben az origóból $(0; 0)$ kiinduló egyenes vagy félegyenes.</p>
              <p>• <strong>Nullapont:</strong> Ha $x = 0$, akkor $y = 0$ (0 kg áruért 0 Ft-ot fizetünk).</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'szazalekszamitas',
      title: '3. Százalékszámítás és törtrész',
      badge: 'Százalék',
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A <strong>százalék</strong> a századrész ($1\% = 1/100 = 0,01$). A százalékszámítás alapfogalmai:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl border bg-white dark:bg-slate-900 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Alap (A)</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">A 100% (az egész)</span>
              <p className="text-[11px] text-slate-500 font-mono">A = (É / p) · 100</p>
            </div>
            <div className="p-3 rounded-xl border bg-white dark:bg-slate-900 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Százalékláb (p%)</span>
              <span className="font-bold text-amber-600 text-sm block">A hányadrész %-ban</span>
              <p className="text-[11px] text-slate-500 font-mono">p% = (É / A) · 100%</p>
            </div>
            <div className="p-3 rounded-xl border bg-white dark:bg-slate-900 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Százalékérték (É)</span>
              <span className="font-bold text-emerald-600 text-sm block">A kiszámított rész</span>
              <p className="text-[11px] text-slate-500 font-mono">É = A · (p / 100)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'egyenletek-szoveges-esetvizsgalat',
      title: '4. Nyitott mondatok, szöveges feladatok és esetvizsgálat',
      badge: 'Alkalmazások',
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az algebrai egyenletek és a szöveges problémák megoldásának közös gerince a <strong>mérlegelv</strong> 
            és a gondos, tervszerű <strong>esetvizsgálat</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5 uppercase text-[11px]">
                <Scale className="w-4 h-4 text-emerald-600" /> A Mérlegelv szabályai
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Az egyenlet mindkét oldalához ugyanazt a számot adhatjuk hozzá, vonhatjuk ki, 
                vagy szorozhatjuk/oszthatjuk ugyanazzal a nullától különböző számmal.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/30 dark:bg-violet-950/20 space-y-1.5">
              <span className="font-bold text-violet-800 dark:text-violet-200 flex items-center gap-1.5 uppercase text-[11px]">
                <Layers className="w-4 h-4 text-violet-600" /> Esetvizsgálat és alaphalmaz
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Mindig ellenőrizd az alaphalmazt: a valóságban a létszám és darabszám csak nemnegatív egész lehet! 
                Egy feladatnak lehet 0, 1, több vagy akár végtelen sok megoldása is.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="IV. Témaköri Összefoglalás"
      subtitle="Arány, egyenes arányosság, százalékszámítás, egyenletek és szöveges feladatok átfogó rendszere"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 ÖSSZEFOGLALÓ TANANYAG"
      themeColor="slate"
      pdfFilename="6_osztaly_IV_osszefoglalas_tananyag.pdf"
      quickRule={{
        label: 'A fejezet vezérgondolata',
        formula: 'Arányos részek + Egyenes arányosság (y = k · x) + Százalék (É = A · p%) + Modellalkotás és mérlegelv!'
      }}
      practiceTitle="Készen állsz a témazáró kvízre?"
      practiceSubtitle="Mérd fel a tudásodat a teljes IV. fejezetből 30 átfogó feladaton keresztül!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Master Interaktív Labor */}
      <Card className="p-4 sm:p-5 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 dark:from-slate-900 dark:to-slate-800 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-slate-800 dark:bg-slate-700 text-white shadow-xs">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Mester Labor: A Fejezet Számológépei és Szemléltetői
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Próbáld ki a fejezet 3 legfontosabb matematikai modelljét interaktívan!
                </p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant={labMode === 'ratio' ? 'default' : 'outline'}
                onClick={() => setLabMode('ratio')}
                className={`text-xs ${labMode === 'ratio' ? 'bg-slate-800 hover:bg-slate-700 text-white font-bold' : ''}`}
              >
                1. Arányos Osztás
              </Button>
              <Button
                size="sm"
                variant={labMode === 'percent' ? 'default' : 'outline'}
                onClick={() => setLabMode('percent')}
                className={`text-xs ${labMode === 'percent' ? 'bg-slate-800 hover:bg-slate-700 text-white font-bold' : ''}`}
              >
                2. Százalékszámítás
              </Button>
              <Button
                size="sm"
                variant={labMode === 'proportion' ? 'default' : 'outline'}
                onClick={() => setLabMode('proportion')}
                className={`text-xs ${labMode === 'proportion' ? 'bg-slate-800 hover:bg-slate-700 text-white font-bold' : ''}`}
              >
                3. Egyenes Arányosság
              </Button>
            </div>
          </div>

          {/* 1. Mód: Arányos Osztás */}
          {labMode === 'ratio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Teljes összeg: {totalAmount.toLocaleString()} Ft
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Első aránytag: {partA} rész
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={partA}
                    onChange={(e) => setPartA(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Második aránytag: {partB} rész
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={partB}
                    onChange={(e) => setPartB(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>
              </div>

              {/* Vizuális aránysáv */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-600">A rész ({partA} rész): {Math.round(shareA).toLocaleString()} Ft</span>
                  <span className="text-sky-600">B rész ({partB} rész): {Math.round(shareB).toLocaleString()} Ft</span>
                </div>

                <div className="w-full h-7 rounded-xl overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${(partA / totalParts) * 100}%` }}
                    className="bg-amber-500 flex items-center justify-center text-white text-[11px] font-bold transition-all duration-300"
                  >
                    {partA}r ({Math.round((partA / totalParts) * 100)}%)
                  </div>
                  <div
                    style={{ width: `${(partB / totalParts) * 100}%` }}
                    className="bg-sky-500 flex items-center justify-center text-white text-[11px] font-bold transition-all duration-300"
                  >
                    {partB}r ({Math.round((partB / totalParts) * 100)}%)
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 font-mono pt-1 text-center">
                  1 rész = {totalAmount.toLocaleString()} ÷ {totalParts} = <strong>{Math.round(onePart).toLocaleString()} Ft</strong>
                </div>
              </div>
            </div>
          )}

          {/* 2. Mód: Százalékszámítás */}
          {labMode === 'percent' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Alap (100%): {baseVal.toLocaleString()} Ft
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={baseVal}
                    onChange={(e) => setBaseVal(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Százalékláb: {percentVal}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={percentVal}
                    onChange={(e) => setPercentVal(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Százalékérték ({percentVal}%)</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 text-base block">
                    {percentAmount.toLocaleString()} Ft
                  </span>
                  <p className="text-[11px] text-slate-500 font-mono">{baseVal} · {percentVal / 100}</p>
                </div>

                <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Árengedmény után (-{percentVal}%)</span>
                  <span className="font-mono font-bold text-rose-700 dark:text-rose-300 text-base block">
                    {discountedVal.toLocaleString()} Ft
                  </span>
                  <p className="text-[11px] text-slate-500 font-mono">{100 - percentVal}%-os új ár</p>
                </div>

                <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Áremelés után (+{percentVal}%)</span>
                  <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300 text-base block">
                    {increasedVal.toLocaleString()} Ft
                  </span>
                  <p className="text-[11px] text-slate-500 font-mono">{100 + percentVal}%-os új ár</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Mód: Egyenes Arányosság */}
          {labMode === 'proportion' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Egységár (k): {unitPrice} Ft/kg
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1500"
                    step="50"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 block uppercase">
                    Mennyiség (x): {quantity} kg
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sky-900 dark:text-sky-200">
                    Összes fizetendő (y = k · x):
                  </span>
                  <span className="font-mono font-bold text-sky-700 dark:text-sky-300 text-lg">
                    {totalCost.toLocaleString()} Ft
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-mono">
                  {quantity} kg · {unitPrice} Ft/kg = {totalCost.toLocaleString()} Ft. (Állandó hányados: y / x = {unitPrice} Ft/kg).
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default RatioSummaryTheory;
