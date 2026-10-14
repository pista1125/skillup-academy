import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Percent,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  PieChart,
  Calculator,
  Layers,
  ArrowLeftRight,
  Divide
} from 'lucide-react';

interface FractionPartTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const FractionPartTheory: React.FC<FractionPartTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: Törtrész és Egész
  const [calcMode, setCalcMode] = useState<'find_part' | 'find_whole'>('find_part');
  const [wholeValue, setWholeValue] = useState<number>(120);
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(4);
  const [givenPart, setGivenPart] = useState<number>(60);

  // Számítások
  // 1. Törtrész keresése az egészből
  const onePartOfWhole = wholeValue / denominator;
  const calculatedPart = Math.round(onePartOfWhole * numerator);

  // 2. Egész keresése a megadott törtrészből
  const onePartOfGiven = givenPart / numerator;
  const calculatedWhole = Math.round(onePartOfGiven * denominator);

  const sections: TheorySection[] = [
    {
      id: 'alapfogalmak',
      title: 'A törtrész 3 alapkérdése a matematikában',
      badge: 'Alapok',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A mindennapi életben (vásárláskor, recepteknél, időbeosztásnál) folyamatosan törtrészekkel dolgozunk. 
            Minden törtrészes feladat az alábbi 3 kérdés valamelyikére vezethető vissza:
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-teal-300 dark:border-teal-800 bg-gradient-to-r from-teal-50 via-emerald-50/50 to-teal-50 dark:from-teal-950/40 dark:via-slate-900 dark:to-teal-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
              <Sparkles className="w-3 h-3 text-teal-600" /> A törtrész 2 fő alapképlete
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-800">
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 block uppercase">1. Törtrész keresése:</span>
                <div className="text-base sm:text-xl font-mono font-black text-teal-950 dark:text-teal-100">
                  Törtrész = Egész · (a / b)
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-800">
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 block uppercase">2. Egész visszaszámolása:</span>
                <div className="text-base sm:text-xl font-mono font-black text-teal-950 dark:text-teal-100">
                  Egész = Törtrész : (a / b)
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400 block uppercase tracking-wider">
                1. Kérdés: Mennyi a törtrész?
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                Ismerjük az egészet és a törtet, keressük a részt. <strong>Művelet: szorzás</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider">
                2. Kérdés: Mennyi az egész?
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                Ismerjük a részt és a törtet, keressük az egészet. <strong>Művelet: osztás</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-sky-700 dark:text-sky-400 block uppercase tracking-wider">
                3. Kérdés: Hányadrésze?
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                Ismerjük mindkét mennyiséget, keressük a törtrészt. <strong>Művelet: hányados felírása (A / B)</strong>.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tortresz-kiszamitasa',
      title: 'Adott mennyiség törtrészének kiszámítása',
      badge: 'Szorzás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Egy szám törtrészét úgy számítjuk ki, hogy <strong>a számot megszorozzuk a törttel</strong>. 
            Gyakorlatban ezt két egyszerű lépésben végezzük el:
          </p>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/50 dark:bg-teal-950/20 text-xs space-y-3">
            <div className="font-bold text-teal-950 dark:text-teal-200 uppercase tracking-wide flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-teal-600" /> Mintapélda: Mennyi 120-nak a 3/4 része?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-teal-200 dark:border-teal-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">1. lépés: 1 egységnyi rész</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Elosztjuk az egészet a nevezővel ($4$):
                </p>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300">
                  120 : 4 = 30 &nbsp;(ez az 1/4 rész)
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-teal-200 dark:border-teal-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">2. lépés: Kívánt részek száma</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Megszorozzuk a számlálóval ($3$):
                </p>
                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  30 · 3 = 90 &nbsp;(ez a 3/4 rész)
                </div>
              </div>
            </div>

            <div className="font-mono text-center font-bold text-teal-900 dark:text-teal-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-teal-200 dark:border-teal-800">
              Egyetlen kifejezéssel: 120 · (3 / 4) = (120 · 3) / 4 = 360 / 4 = 90
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'egesz-visszaszamolasa',
      title: 'Az egész visszaszámolása a megadott törtrészből',
      badge: 'Osztás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha ismerjük egy mennyiség törtrészét, az egész számot úgy kapjuk meg, hogy <strong>a törtrészt elosztjuk a törttel</strong> (azaz megszorozzuk a tört reciprokával).
          </p>

          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs space-y-3">
            <div className="font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wide flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-600" /> Mintapélda: Melyik számnak a 2/5 része a 60?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">1. lépés: 1 egységnyi rész</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Elosztjuk a megadott értéket a számlálóval ($2$):
                </p>
                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  60 : 2 = 30 &nbsp;(ez az 1/5 rész)
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">2. lépés: Az egész (5/5 rész)</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Megszorozzuk a nevezővel ($5$):
                </p>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300">
                  30 · 5 = 150 &nbsp;(ez az egész, 5/5)
                </div>
              </div>
            </div>

            <div className="font-mono text-center font-bold text-emerald-900 dark:text-emerald-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              Egyetlen kifejezéssel: 60 : (2 / 5) = 60 · (5 / 2) = (60 · 5) / 2 = 300 / 2 = 150
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hanyadresze',
      title: 'Hányadrésze az egyik szám a másiknak?',
      badge: 'Arány / Hányados',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha azt kérdezik, hogy egy $A$ mennyiség <strong>hányadrésze</strong> a $B$ mennyiségnek, 
            akkor a két szám hányadosát kell felírnunk tört alakban, majd egyszerűsítenünk:
          </p>

          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-xs space-y-2">
            <span className="font-bold text-sky-900 dark:text-sky-200 block uppercase tracking-wide">
              Képlet: Hányadrész = Rész / Egész = A / B
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Példa:</strong> Egy 30 fős osztályban 18 tanuló lány. Hányadrésze az osztálynak a lányok száma?
            </p>
            <div className="font-mono font-bold text-sky-800 dark:text-sky-300 bg-white dark:bg-slate-900 p-2.5 rounded border border-sky-200 dark:border-sky-800 text-center">
              18 / 30 = (18 : 6) / (30 : 6) = 3 / 5 része
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              Mindig figyelj a mértékegységekre! Pl. 20 perc hányadrésze 2 órának? 
              Előbb átváltunk: 2 óra = 120 perc ⟹ 20 / 120 = 1 / 6 része!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'gyakori-hibak',
      title: 'Gyakori hibák és hogyan kerüljük el őket',
      badge: 'Csapdák',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A törtrészes feladatoknál a legtöbb tévesztés a műveletek felcseréléséből fakad:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                1. Szorzás helyett osztás (vagy fordítva)
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Mindig gondold végig józan ésszel: „Az egésznek a törtrészét keresem (kisebb lesz az eredmény), 
                vagy a részből keresem az egészet (nagyobb lesz az eredmény)?”
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                2. Mértékegységek elhanyagolása
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Törtet csak <strong>azonos mértékegységű</strong> adatokból szabad képezni! 
                Pl. 30 cm és 1 méter hányadosa nem 30/1, hanem 30 cm / 100 cm = 3/10!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Törtrész és egész"
      subtitle="Törtrész kiszámítása, visszaszámolás az egészre és hányadrész meghatározása"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="teal"
      pdfFilename="6_osztaly_IV_tortresz_tananyag.pdf"
      quickRule={{
        label: 'A törtrész aranyszabályai',
        formula: 'Törtrész = Egész · (a/b)  ⟺  Egész = Törtrész : (a/b)'
      }}
      practiceTitle="Készen állsz a törtrészes feladványokra?"
      practiceSubtitle="Gyakorold a törtrész kiszámítását, az egész visszaszámolását és a szöveges feladatokat 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Törtrész és Egész Laboratórium */}
      <Card className="p-4 sm:p-5 border-teal-200 dark:border-teal-900/50 bg-gradient-to-br from-teal-50/50 via-white to-emerald-50/30 dark:from-slate-900 dark:to-teal-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-200/60 dark:border-teal-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-teal-500 text-white shadow-xs">
                <PieChart className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Törtrész Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Vizsgáld a törtrész és az egész kapcsolatát oda-vissza a lépések vizualizációjával!
                </p>
              </div>
            </div>

            {/* Módválasztó kapcsoló */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setCalcMode('find_part')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  calcMode === 'find_part'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                1. Törtrész kiszámítása
              </button>
              <button
                onClick={() => setCalcMode('find_whole')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  calcMode === 'find_whole'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                2. Egész visszaszámolása
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Vizuális törtszalag ábra */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner">
              <div className="w-full flex justify-between items-center text-xs font-semibold px-1">
                <span className="text-slate-600 dark:text-slate-400">
                  {calcMode === 'find_part' ? 'Teljes egész mennyiség:' : 'Keresett egész mennyiség:'}
                </span>
                <span className="font-mono font-black text-teal-700 dark:text-teal-300 text-sm">
                  {calcMode === 'find_part' ? wholeValue : calculatedWhole}
                </span>
              </div>

              {/* Vizuális szalag cellákra osztva */}
              <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border-2 border-slate-300 dark:border-slate-700 p-0.5 gap-0.5">
                {Array.from({ length: denominator }).map((_, index) => {
                  const isSelected = index < numerator;
                  return (
                    <div
                      key={`part-${index}`}
                      className={`h-full flex-1 flex flex-col items-center justify-center rounded transition-all duration-300 ${
                        isSelected
                          ? 'bg-teal-500 text-white font-bold shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-mono">1/{denominator}</span>
                      <span className="text-[9px] opacity-80">
                        {calcMode === 'find_part' ? onePartOfWhole : onePartOfGiven}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Színes jelmagyarázat a szalag alatt */}
              <div className="w-full flex items-center justify-between text-xs px-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-teal-500"></div>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">
                    Kijelölt törtrész: {numerator}/{denominator} rész ={' '}
                    <span className="text-teal-600 dark:text-teal-400 font-mono font-black">
                      {calcMode === 'find_part' ? calculatedPart : givenPart}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <span>1 egységnyi rész = {calcMode === 'find_part' ? onePartOfWhole : onePartOfGiven}</span>
                </div>
              </div>

              {/* Lépések részletezése */}
              <div className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Számítási levezetés
                </span>
                {calcMode === 'find_part' ? (
                  <div className="text-slate-800 dark:text-slate-200 font-bold space-y-0.5">
                    <div>1. lépés: {wholeValue} : {denominator} = {onePartOfWhole} (1/{denominator} rész)</div>
                    <div className="text-teal-600 dark:text-teal-400">
                      2. lépés: {onePartOfWhole} · {numerator} = <strong>{calculatedPart}</strong> ({numerator}/{denominator} rész)
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-800 dark:text-slate-200 font-bold space-y-0.5">
                    <div>1. lépés: {givenPart} : {numerator} = {onePartOfGiven} (1/{denominator} rész)</div>
                    <div className="text-emerald-600 dark:text-emerald-400">
                      2. lépés: {onePartOfGiven} · {denominator} = <strong>{calculatedWhole}</strong> (a teljes egész)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vezérlők */}
            <div className="lg:col-span-5 space-y-3.5">
              {calcMode === 'find_part' ? (
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Egész mennyiség:</span>
                    <span className="font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold">
                      {wholeValue}
                    </span>
                  </div>
                  <Slider
                    value={[wholeValue]}
                    min={20}
                    max={300}
                    step={10}
                    onValueChange={(val) => setWholeValue(val[0])}
                    className="py-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>20</span>
                    <span>150</span>
                    <span>300</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Megadott törtrész értéke:</span>
                    <span className="font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold">
                      {givenPart}
                    </span>
                  </div>
                  <Slider
                    value={[givenPart]}
                    min={10}
                    max={200}
                    step={5}
                    onValueChange={(val) => setGivenPart(val[0])}
                    className="py-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>10</span>
                    <span>100</span>
                    <span>200</span>
                  </div>
                </div>
              )}

              {/* Tört választó gombok (numerator és denominator) */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Válassz törtet: ({numerator}/{denominator})
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { num: 1, den: 2, label: '1/2' },
                    { num: 1, den: 4, label: '1/4' },
                    { num: 3, den: 4, label: '3/4' },
                    { num: 2, den: 5, label: '2/5' },
                    { num: 3, den: 5, label: '3/5' },
                    { num: 4, den: 5, label: '4/5' },
                    { num: 2, den: 3, label: '2/3' },
                    { num: 5, den: 6, label: '5/6' }
                  ].map((frac) => (
                    <Button
                      key={frac.label}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setNumerator(frac.num);
                        setDenominator(frac.den);
                      }}
                      className={`h-7 text-xs font-mono font-bold ${
                        numerator === frac.num && denominator === frac.den
                          ? 'bg-teal-500 text-white border-teal-600'
                          : ''
                      }`}
                    >
                      {frac.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Végeredmény kártya */}
              <div className="p-3.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 text-xs space-y-1">
                <span className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Végeredmény
                </span>
                <div className="font-mono text-sm text-slate-800 dark:text-slate-200">
                  {calcMode === 'find_part' ? (
                    <div>
                      {wholeValue}-nak a(z) {numerator}/{denominator} része ={' '}
                      <strong className="text-teal-700 dark:text-teal-400 font-bold">{calculatedPart}</strong>
                    </div>
                  ) : (
                    <div>
                      A szám, aminek a(z) {numerator}/{denominator} része {givenPart} ={' '}
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{calculatedWhole}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default FractionPartTheory;
