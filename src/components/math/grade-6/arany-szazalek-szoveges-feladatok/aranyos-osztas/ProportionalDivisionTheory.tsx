import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Layers,
  Coins,
  Triangle,
  Scale
} from 'lucide-react';

interface ProportionalDivisionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ProportionalDivisionTheory: React.FC<ProportionalDivisionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [totalAmount, setTotalAmount] = useState<number>(6000);
  const [ratioPartA, setRatioPartA] = useState<number>(2);
  const [ratioPartB, setRatioPartB] = useState<number>(3);

  const totalParts = ratioPartA + ratioPartB;
  const unitValue = totalAmount / totalParts;
  const shareA = Math.round(ratioPartA * unitValue);
  const shareB = Math.round(ratioPartB * unitValue);
  const percentA = Math.round((ratioPartA / totalParts) * 100);
  const percentB = 100 - percentA;

  const sections: TheorySection[] = [
    {
      id: 'lepesek',
      title: 'Az arányos osztás 4 lépéses aranyszabálya',
      badge: 'Alapmódszer',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Arányos osztásról akkor beszélünk, amikor egy adott mennyiséget (pl. pénzt, távolságot, tömeget)
            nem egyenlően, hanem egy előre meghatározott arány szerint kell szétosztanunk két vagy több részre.
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 dark:from-amber-950/40 dark:via-slate-900 dark:to-amber-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
              <Sparkles className="w-3 h-3 text-amber-600" /> Kiemelt képlet
            </span>
            <div className="text-base sm:text-lg font-mono font-black text-amber-950 dark:text-amber-100 tracking-wide">
              1 rész = Teljes összeg / (a + b) &nbsp;⟹&nbsp; Rész₁ = a · (1 rész), &nbsp; Rész₂ = b · (1 rész)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A részek összege mindig kiadja a teljes kiindulási mennyiséget: <MathText>Rész₁ + Rész₂ = Egész</MathText>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 space-y-3">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 text-sm">
              <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              A 4 lépéses biztos módszer
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  1. lépés: Részek összeadása
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Összeadjuk az arány tagjait: <code className="font-bold">Összes rész = a + b</code>. Megtudjuk, hány egyenlő egységre osztjuk a mennyiséget.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  2. lépés: 1 rész értéke
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Az egész mennyiséget elosztjuk az összes résszel: <code className="font-bold">1 rész = Egész / (a + b)</code>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  3. lépés: Részek kiszámítása
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Az 1 rész értékét megszorozzuk a megfelelő tagokkal: <code className="font-bold">Rész 1 = a · (1 rész)</code>, <code className="font-bold">Rész 2 = b · (1 rész)</code>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  4. lépés: Ellenőrzés
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Összeadjuk a kapott részeket: meg kell egyezniük a kiindulási egésszel, arányuknak pedig <code className="font-bold">a : b</code>-nek kell lennie.
                </p>
              </div>
            </div>
          </div>

          {/* Részletes kidolgozott példa */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Kidolgozott Mintapélda
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Feladat:</strong> Anna és Bence 6000 Ft zsebpénzen osztoznak <strong>2 : 3</strong> arányban. Mennyi pénzt kapnak külön-külön?
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Összes rész: 2 + 3 = 5 rész</div>
              <div>2. Egy rész értéke: 6000 Ft : 5 = 1200 Ft</div>
              <div>3. Anna (2 rész): 2 · 1200 Ft = 2400 Ft</div>
              <div>4. Bence (3 rész): 3 · 1200 Ft = 3600 Ft</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                Ellenőrzés: 2400 + 3600 = 6000 Ft  és  2400 : 3600 = 2 : 3 ✓
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tobbtagu',
      title: 'Többtagú arányos osztás (Három vagy több rész)',
      badge: 'Bővítés',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha nem kettő, hanem három vagy több személy vagy összetevő között osztunk szét valamit (pl. <code className="font-bold">a : b : c</code>),
            a módszer pontosan ugyanúgy működik: összeadjuk mind a három tagot!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-2">
              <h5 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Triangle className="w-3.5 h-3.5 text-blue-600" /> Háromszög belső szögei
              </h5>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Egy háromszög belső szögeinek összege mindig <strong>180°</strong>. Ha a szögek aránya <strong>1 : 2 : 3</strong>:
              </p>
              <div className="bg-white dark:bg-slate-900 p-2 rounded border border-blue-200 dark:border-blue-800 font-mono space-y-0.5 text-blue-900 dark:text-blue-300">
                <div>Összes rész: 1 + 2 + 3 = 6 rész</div>
                <div>1 rész: 180° : 6 = 30°</div>
                <div>Szögek: 30°, 60°, 90° (derékszögű háromszög!)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs space-y-2">
              <h5 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-emerald-600" /> Keverékek és Ötvözetek
              </h5>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha 1400 kg betont készítünk cement, homok és kavics <strong>1 : 2 : 4</strong> arányú keverékéből:
              </p>
              <div className="bg-white dark:bg-slate-900 p-2 rounded border border-emerald-200 dark:border-emerald-800 font-mono space-y-0.5 text-emerald-900 dark:text-emerald-300">
                <div>Összes rész: 1 + 2 + 4 = 7 rész</div>
                <div>1 rész: 1400 kg : 7 = 200 kg</div>
                <div>Cement: 200 kg, Homok: 400 kg, Kavics: 800 kg</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'kulonbseg',
      title: 'Amikor a különbség vagy egyetlen rész adott',
      badge: 'Gondolkodtató',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/20 space-y-2">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Különbség típusú feladatok
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Nem minden feladatban a teljes összeg adott! Gyakran azt tudjuk, hogy az egyik mennyiség <strong>mennyivel több</strong> a másiknál,
              vagy pontosan ismerjük az egyik fél részét.
            </p>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5 font-mono">
              <div className="text-slate-600 dark:text-slate-400">
                Példa: Két szám aránya 5 : 2. A nagyobbik szám 24-gyel több a kisebbiknél. Mik a számok?
              </div>
              <div className="text-indigo-900 dark:text-indigo-300 pt-1">
                1. Részek különbsége: 5 rész - 2 rész = 3 rész
              </div>
              <div className="text-indigo-900 dark:text-indigo-300">
                2. Ez a 3 rész felel meg 24-nek, tehát 1 rész = 24 : 3 = 8
              </div>
              <div className="text-indigo-900 dark:text-indigo-300">
                3. Nagyobb szám: 5 · 8 = 40,  Kisebb szám: 2 · 8 = 16
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                Ellenőrzés: 40 - 16 = 24  és  40 : 16 = 5 : 2 ✓
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tippek',
      title: 'Gyakori hibák és jó tanácsok',
      badge: 'Tippek',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 text-xs space-y-1.5">
            <h5 className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Ne szorozd közvetlenül az egészet!
            </h5>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Gyakori hiba: 6000 Ft 2 : 3 arányánál valaki azonnal megszorozza a 6000-et 2-vel és 3-mal.
              <strong>Mindig először az 1 rész értékét kell kiszámolni</strong> az arányrészek összegével osztva!
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs space-y-1.5">
            <h5 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> A dupla ellenőrzés varázsa
            </h5>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Mindig ellenőrizz kétféleképpen:
              1. A kapott számok összege kiadja az eredeti egészet?
              2. A kapott számok aránya egyszerűsítve megegyezik a megadott aránnyal?
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Arányos osztás"
      subtitle="Mennyiségek szétosztása adott arányban: 4 lépéses módszer és gyakorlati szimuláció"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="amber"
      pdfFilename="6_osztaly_IV_aranyos_osztas_tananyag.pdf"
      quickRule={{
        label: 'Az arányos osztás alapszabálya',
        formula: '1 rész = Teljes összeg / (a + b).  Rész 1 = a · (1 rész),  Rész 2 = b · (1 rész).'
      }}
      practiceTitle="Készen állsz az arányos osztás feladataira?"
      practiceSubtitle="Oldj meg pénzelosztási, szöges, kerületes és keverékes feladványokat 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Arányos Osztó Laboratórium */}
      <Card className="border-2 border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 dark:from-slate-900 dark:to-slate-900 p-5 rounded-2xl shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-amber-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-1">
              <Coins className="w-3 h-3 text-amber-600" /> Interaktív Szimuláció
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Arányos Osztás Varázsló
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Válaszd ki a szétosztandó összeget és az arányt, nézd meg a lépéseket és a grafikus felosztást!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Példa összegek:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => { setTotalAmount(3000); setRatioPartA(1); setRatioPartB(2); }}
            >
              3000 Ft (1:2)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => { setTotalAmount(6000); setRatioPartA(2); setRatioPartB(3); }}
            >
              6000 Ft (2:3)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => { setTotalAmount(10000); setRatioPartA(3); setRatioPartB(7); }}
            >
              10 000 Ft (3:7)
            </Button>
          </div>
        </div>

        {/* Vezérlők: Összeg és Arány */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          <div className="space-y-4 md:col-span-1">
            {/* Teljes összeg slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Szétosztandó összeg:</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold">
                  {totalAmount.toLocaleString('hu-HU')} Ft
                </span>
              </div>
              <Slider
                value={[totalAmount]}
                min={1000}
                max={20000}
                step={500}
                onValueChange={(val) => setTotalAmount(val[0])}
                className="py-1"
              />
            </div>

            {/* Part A slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> „A” személy része:
                </span>
                <span className="font-mono font-bold text-amber-800 dark:text-amber-300">
                  {ratioPartA} rész
                </span>
              </div>
              <Slider
                value={[ratioPartA]}
                min={1}
                max={9}
                step={1}
                onValueChange={(val) => setRatioPartA(val[0])}
                className="py-1"
              />
            </div>

            {/* Part B slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> „B” személy része:
                </span>
                <span className="font-mono font-bold text-blue-800 dark:text-blue-300">
                  {ratioPartB} rész
                </span>
              </div>
              <Slider
                value={[ratioPartB]}
                min={1}
                max={9}
                step={1}
                onValueChange={(val) => setRatioPartB(val[0])}
                className="py-1"
              />
            </div>
          </div>

          {/* Lépések levezetése és Vizuális sáv */}
          <div className="md:col-span-2 space-y-4">
            {/* Lépések kártya */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Számolási lépések ({ratioPartA} : {ratioPartB} arányban):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                  <span className="text-[10px] text-slate-500 block">1. Összes rész</span>
                  <span className="font-mono font-bold text-amber-800 dark:text-amber-300 text-sm">
                    {ratioPartA} + {ratioPartB} = {totalParts} rész
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 block">2. Egy rész értéke</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {Math.round(unitValue).toLocaleString('hu-HU')} Ft
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-amber-100/60 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800">
                  <span className="text-[10px] text-amber-800 dark:text-amber-400 block font-bold">3. „A” rész ({ratioPartA}x)</span>
                  <span className="font-mono font-bold text-amber-900 dark:text-amber-200 text-sm">
                    {shareA.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-blue-800 dark:text-blue-400 block font-bold">4. „B” rész ({ratioPartB}x)</span>
                  <span className="font-mono font-bold text-blue-900 dark:text-blue-200 text-sm">
                    {shareB.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
              </div>
            </div>

            {/* Grafikus vizualizáció */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-bold">
                <span>Vizuális felosztási sáv ({totalParts} egyenlő rész)</span>
                <span>{percentA}% / {percentB}%</span>
              </div>

              {/* Stacked division bar */}
              <div className="h-8 w-full rounded-lg overflow-hidden flex border border-slate-300 dark:border-slate-700 shadow-inner">
                <div
                  className="bg-amber-500 transition-all duration-300 flex items-center justify-center text-white text-xs font-black px-1"
                  style={{ width: `${percentA}%` }}
                >
                  {percentA > 15 ? `A: ${shareA.toLocaleString('hu-HU')} Ft` : `${shareA}`}
                </div>
                <div
                  className="bg-blue-500 transition-all duration-300 flex items-center justify-center text-white text-xs font-black px-1"
                  style={{ width: `${percentB}%` }}
                >
                  {percentB > 15 ? `B: ${shareB.toLocaleString('hu-HU')} Ft` : `${shareB}`}
                </div>
              </div>

              {/* Ellenőrzés sor */}
              <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Összeg: {shareA.toLocaleString('hu-HU')} + {shareB.toLocaleString('hu-HU')} = {totalAmount.toLocaleString('hu-HU')} Ft
                </span>
                <span className="font-mono">
                  Arány: {shareA} : {shareB} = {ratioPartA} : {ratioPartB}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};
export default ProportionalDivisionTheory;
