import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Calculator,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Scale,
  Binary,
  Compass,
  ArrowRight,
  HelpCircle,
  Divide,
  BookOpen,
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const WordProblemsTheory: React.FC<WordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab State
  const [totalAmount, setTotalAmount] = useState<number>(600);
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(4);
  const [unit, setUnit] = useState<string>('Ft');

  const safeDen = den === 0 ? 1 : den;
  const fractionValue = num / safeDen;
  const partValue = totalAmount * fractionValue;
  const remainingValue = totalAmount - partValue;
  const percentValue = ((fractionValue) * 100).toFixed(1).replace('.', ',');

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-word-problems-theory-doc"
      pdfFilename="7_osztaly_szoveges_feladatok.pdf"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="4. Szöveges feladatok"
      subtitle="Törtrész számítása, az egész meghatározása a törtrészből, arányok, több lépéses és maradékos problémák megoldása"
      quickRule={{
        label: 'A törtrész-számítás 2 alapszabálya',
        formula: 'Törtrész = Egész · (a/b)   |   Egész = Törtrész : (a/b)'
      }}
      themeColor="purple"
      practiceTitle="Készen állsz a szöveges feladatok tesztelésére?"
      practiceSubtitle="30 válogatott életszerű feladat 3 nehézségi szinten részletes levezetésekkel, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: Törtrész Kiszámítása */}
      <TheorySection
        number={1}
        title="1. Alaptípus: Adott mennyiség törtrészének kiszámítása"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A törtrész-számítás szabálya"
            badge="Szorzás a törttel"
            variant="purple"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Ha egy ismert mennyiségnek (Egész) keressük az <strong>a/b részét</strong>, akkor a <strong>mennyiséget megszorozzuk a törttel</strong>:
            </p>
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center font-mono text-sm font-bold text-purple-900 dark:text-purple-200 mb-2">
              Törtrész = Egész · (a / b)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div><strong>Gyakorlati lépés:</strong> Az egészet elosztjuk a nevezővel (egy rész értéke), majd megszorozzuk a számlálóval: (Egész : b) · a.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Gyakorlati mintapélda"
            badge="Példa & Levezetés"
            variant="emerald"
          >
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5">
              <div className="font-bold text-emerald-700 dark:text-emerald-300">Feladat:</div>
              <p>Mennyi a 2400 Ft-nak a 3/4 része?</p>
              <div className="font-bold text-emerald-700 dark:text-emerald-300 mt-2">Megoldás:</div>
              <p className="font-mono">2400 · (3/4) = (2400 : 4) · 3 = 600 · 3 = 1800 Ft.</p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Válasz: A 2400 Ft 3/4 része pontosan 1800 Ft.</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Az egész meghatározása a törtrészből */}
      <TheorySection
        number={2}
        title="2. Alaptípus: Az egész kiszámítása adott törtrészből"
        icon={<Divide className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Az egész kiszámításának szabálya"
            badge="Osztás a törttel"
            variant="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Ha ismerjük egy mennyiség <strong>a/b részének értékét (Törtrész)</strong>, és az <strong>egész mennyiséget</strong> keressük, akkor a törtrészt <strong>elosztjuk a törttel</strong> (azaz szorozzuk a reciprokával):
            </p>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center font-mono text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-2">
              Egész = Törtrész : (a / b) = Törtrész · (b / a)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Gyakorlati lépés:</strong> A törtrészt elosztjuk a számlálóval (1 rész értéke), majd megszorozzuk a nevezővel: (Törtrész : a) · b.
            </div>
          </TheoryCard>

          <TheoryCard
            title="Gyakorlati mintapélda"
            badge="Példa & Levezetés"
            variant="blue"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5">
              <div className="font-bold text-blue-700 dark:text-blue-300">Feladat:</div>
              <p>Egy könyvnek elolvastuk a 2/5 részét, ami pontosan 80 oldal. Hány oldalas a teljes könyv?</p>
              <div className="font-bold text-blue-700 dark:text-blue-300 mt-2">Megoldás:</div>
              <p className="font-mono">Egész = 80 : (2/5) = 80 · (5/2) = (80 : 2) · 5 = 40 · 5 = 200 oldal.</p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Válasz: A teljes könyv 200 oldalas.</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Gyakori Hiba: Szorzás és osztás összekeverése"
          trap="Ha egy számnak a 2/3 része 60, sokan 60 · (2/3) = 40-et számolnak (az egész kisebb lett, mint a része!)."
          correction="Mindig gondold végig: az egésznek NAGYOBBNAK kell lennie a résznél! Ezért osztani kell a törttel: 60 : (2/3) = 60 · (3/2) = 90!"
        />
      </TheorySection>

      {/* SECTION 3: Részarány Kifejezése */}
      <TheorySection
        number={3}
        title="3. Alaptípus: Mekkora része az egyik mennyiség a másiknak?"
        icon={<Scale className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A hányados mint arány"
            badge="Hányados"
            variant="amber"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Ha azt vizsgáljuk, hogy az <strong>A mennyiség hányadrésze a B mennyiségnek</strong>, akkor a két mennyiség <strong>hányadosát (törtjét)</strong> képezzük:
            </p>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-mono text-sm font-bold text-amber-900 dark:text-amber-200 mb-2">
              Arány = A / B  (azonos mértékegységben!)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Fontos:</strong> A két adatot mindig azonos mértékegységre kell átváltani az osztás előtt!
            </div>
          </TheoryCard>

          <TheoryCard
            title="Gyakorlati mintapélda"
            badge="Mértékegység-egyeztetés"
            variant="cyan"
          >
            <div className="p-3 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5">
              <div className="font-bold text-cyan-700 dark:text-cyan-300">Feladat:</div>
              <p>Hányadrésze a 45 perc a 2 órának?</p>
              <div className="font-bold text-cyan-700 dark:text-cyan-300 mt-2">Megoldás:</div>
              <p>1. Mértékegység egyeztetés: 2 óra = 120 perc.</p>
              <p className="font-mono">2. Tört felírása: 45/120 = (45 : 15) / (120 : 15) = 3/8.</p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Válasz: A 45 perc a 2 órának pontosan a 3/8 része.</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 4: Összetett és Maradékos Szöveges Feladatok */}
      <TheorySection
        number={4}
        title="Többlépéses és maradékos szöveges feladatok megoldási stratégiája"
        icon={<Layers className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryCard
            title="A 4 lépéses sikeres megoldási modell"
            badge="Módszertan"
            variant="purple"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">1. Adatgyűjtés:</div>
                <div>Szöveg értelmezése, adatok kigyűjtése, mértékegységek egyeztetése.</div>
              </div>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">2. Szakaszos ábra:</div>
                <div>Szakasz rajzolása és részekre osztása a logikai összefüggésekhez.</div>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">3. Pontos számolás:</div>
                <div>Műveletsor felállítása és elvégzése, egyszerűsítés.</div>
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="font-bold text-amber-700 dark:text-amber-300 mb-1">4. Ellenőrzés:</div>
                <div>Szövegbe való behelyettesítés és szöveges válaszadás.</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryTable
            title="Gyakori szöveges fordulatok matematikai megfelelői"
            columns={['Szöveges megfogalmazás', 'Matematikai jelentés / Művelet', 'Példa']}
            rows={[
              ['...-nak a 3/5 része', 'Szorzás 3/5-del', 'x · (3/5)'],
              ['... 2/3 része egyenlő 40-nel', 'Osztás 2/3-dal (az egész keresése)', 'x = 40 : (2/3) = 60'],
              ['A maradék 1/4 része', 'Kivonás utáni maradék szorzása 1/4-gyel', '(Egész - 1. rész) · (1/4)'],
              ['A teljes út felét, majd még 10 km-t', 'Felezés és hozzáadás', 'x/2 + 10'],
              ['Hányadrésze maradt meg?', '1 egészből kivonjuk az elhasznált részek összegét', '1 - (1/3 + 2/5) = 4/15'],
            ]}
          />
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Törtrész és Szöveges Feladat Labor */}
      <TheorySection
        number={5}
        title="Interaktív Törtrész és Szöveges Feladat Laboratórium"
        icon={<PieChart className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <Card className="border-2 border-purple-200 dark:border-purple-850 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Dinamikus Törtrész és Maradék Vizualizáló
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Állítsd be a teljes mennyiséget és a törtrészt, és figyeld meg az arányos szakaszt, az elvett mennyiséget és a maradékot!
              </p>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              {/* Total Amount */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-200 dark:border-slate-700 shadow-xs">
                <label className="text-[11px] font-bold text-purple-700 dark:text-purple-300 block mb-1">
                  Teljes Mennyiség (Egész):
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(parseInt(e.target.value) || 0)}
                    className="w-full h-8 text-xs font-bold text-center border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="h-8 text-xs font-bold border rounded-lg px-1 dark:bg-slate-900 dark:border-slate-700"
                  >
                    <option value="Ft">Ft</option>
                    <option value="kg">kg</option>
                    <option value="m">m</option>
                    <option value="km">km</option>
                    <option value="liter">liter</option>
                    <option value="oldal">oldal</option>
                    <option value="perc">perc</option>
                  </select>
                </div>
              </div>

              {/* Fraction Numerator */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-xs">
                <label className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Számláló (a rész):
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value) || 1)}
                  className="w-full h-8 text-xs font-bold text-center border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                />
              </div>

              {/* Fraction Denominator */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-xs">
                <label className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Nevező (b rész):
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={den}
                  onChange={(e) => setDen(parseInt(e.target.value) || 1)}
                  className="w-full h-8 text-xs font-bold text-center border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">Minták:</span>
              {[
                { tot: 1200, n: 3, d: 4, u: 'Ft', label: '1200 Ft 3/4 része' },
                { tot: 450, n: 2, d: 5, u: 'oldal', label: '450 oldal 2/5 része' },
                { tot: 80, n: 5, d: 8, u: 'kg', label: '80 kg 5/8 része' },
                { tot: 60, n: 2, d: 3, u: 'perc', label: '60 perc 2/3 része' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTotalAmount(preset.tot);
                    setNum(preset.n);
                    setDen(preset.d);
                    setUnit(preset.u);
                  }}
                  className="px-2 py-1 rounded-lg text-xs font-bold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Visual Fraction Segment Bar */}
            <div className="space-y-2 max-w-xl mx-auto">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-purple-700 dark:text-purple-300">
                  Kiválasztott rész ({num}/{safeDen} = {percentValue}%): {partValue.toFixed(1).replace('.0', '')} {unit}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Maradék ({safeDen - num}/{safeDen}): {remainingValue.toFixed(1).replace('.0', '')} {unit}
                </span>
              </div>

              {/* Graphical Bar */}
              <div className="h-7 w-full bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden flex border-2 border-slate-300 dark:border-slate-600 shadow-inner">
                <div
                  style={{ width: `${Math.min(Math.max((num / safeDen) * 100, 0), 100)}%` }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center transition-all duration-300"
                >
                  {num}/{safeDen} ({partValue.toFixed(0)} {unit})
                </div>
                <div
                  style={{ width: `${Math.min(Math.max(((safeDen - num) / safeDen) * 100, 0), 100)}%` }}
                  className="bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center justify-center transition-all duration-300"
                >
                  Maradék ({remainingValue.toFixed(0)} {unit})
                </div>
              </div>
            </div>

            {/* Live Calculation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                <div className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">1 Egységérték (1/{safeDen})</div>
                <div className="text-lg font-black text-purple-800 dark:text-purple-200 font-mono mt-1">
                  {(totalAmount / safeDen).toFixed(2).replace('.00', '')} {unit}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {totalAmount} : {safeDen}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
                <div className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Kiszámított Törtrész ({num}/{safeDen})</div>
                <div className="text-lg font-black text-indigo-800 dark:text-indigo-200 font-mono mt-1">
                  {partValue.toFixed(2).replace('.00', '')} {unit}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {totalAmount} · ({num}/{safeDen})
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Megmaradt Rész</div>
                <div className="text-lg font-black text-emerald-800 dark:text-emerald-200 font-mono mt-1">
                  {remainingValue.toFixed(2).replace('.00', '')} {unit}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {totalAmount} - {partValue.toFixed(0)}
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-3.5 bg-purple-50/80 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-xs sm:text-sm text-purple-900 dark:text-purple-200">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Zap className="w-4 h-4 text-purple-600" />
                Matematikai levezetés:
              </div>
              <p>
                A(z) <strong>{totalAmount} {unit}</strong> egész mennyiség <strong>{num}/{safeDen}</strong> része:{' '}
                <strong>{totalAmount} · ({num}/{safeDen}) = ({totalAmount} : {safeDen}) · {num} = {partValue.toFixed(1).replace('.0', '')} {unit}</strong>.
                A fennmaradó rész a teljes egészből kivonva: <strong>{remainingValue.toFixed(1).replace('.0', '')} {unit}</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
