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
import { Slider } from '@/components/ui/slider';
import {
  Scale,
  Sparkles,
  Calculator,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  PieChart,
  Split,
  Percent,
  Check,
  TrendingUp,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface RatioReviewTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const RatioReviewTheory: React.FC<RatioReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Arány Szemléltető (Interactive Ratio Visualizer) ---
  const [partA, setPartA] = useState<number>(2);
  const [partB, setPartB] = useState<number>(3);

  // Legnagyobb közös osztó egyszerűsítéshez
  const getGcd = (x: number, y: number): number => {
    let a = Math.abs(x);
    let b = Math.abs(y);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  };

  const currentGcd = getGcd(partA, partB);
  const simA = partA / currentGcd;
  const simB = partB / currentGcd;
  const quotient = (partA / partB).toFixed(2).replace('.', ',');
  const totalParts = partA + partB;
  const pctA = Math.round((partA / totalParts) * 100);
  const pctB = 100 - pctA;

  // --- 2. Interaktív Arányos Osztás Kalkulátor ---
  const [totalAmount, setTotalAmount] = useState<number>(24000);
  const [ratioX, setRatioX] = useState<number>(3);
  const [ratioY, setRatioY] = useState<number>(2);
  const [ratioZ, setRatioZ] = useState<number>(1);

  const sumRatios = ratioX + ratioY + ratioZ;
  const oneUnit = totalAmount / sumRatios;
  const valX = ratioX * oneUnit;
  const valY = ratioY * oneUnit;
  const valZ = ratioZ * oneUnit;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-ratio-theory-doc"
      pdfFilename="7_osztaly_aranyossagrol_meg_egyszer.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 1. FEJEZET"
      title="Az arányosságról még egyszer"
      subtitle="Az arány fogalma, egyszerűsítése, aránypárok és az arányos osztás 3 aranylépése a mindennapokban és a geometriában"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'a : b = a / b  •  1 egység = Összeg / (a + b + c)  •  Rész = arányszám · 1 egység'
      }}
      themeColor="blue"
      practiceTitle="Készen állsz az arányossági feladatokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: Az arány fogalma és jelentése */}
      <TheorySection number={1} title="Az arány fogalma és matematikai jelentése">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Mi az arány?"
            icon={<Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Két szám vagy mennyiség <strong>aránya</strong> a két szám <strong>hányadosa</strong>:
            </p>
            <div className="p-3 my-3 bg-blue-100/70 dark:bg-blue-950/50 rounded-xl text-center border border-blue-200 dark:border-blue-900 font-mono text-base font-bold text-blue-900 dark:text-blue-200">
              <MathText text="a : b = \frac{a}{b} \quad (b \neq 0)" />
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Hányszorosa?</strong> Az arány azt fejezi ki, hogy az első mennyiség hányszorosa a másodiknak.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Példa:</strong> Ha az arány <MathText>1 : 2</MathText>, az azt jelenti, hogy az 1 a 2-nek{' '}
                  <MathText text="\frac{1}{2}" />-szerese (a fele).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Kötött sorrend:</strong> Az arányban szereplő számok <strong>nem cserélhetők fel</strong>:{' '}
                  <MathText>a : b \neq b : a</MathText> (kivéve ha <MathText>a = b</MathText>).
                </span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Tankönyvi szemléltetés: Csempék és területek"
            icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A tankönyvben különböző méretű mintákban vizsgáljuk a kék és fehér csempék darabszámát:
            </p>
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">1. mintázat:</span>
                <p className="text-slate-600 dark:text-slate-400 font-mono">16 kék : 24 fehér</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold">
                  <MathText text="\frac{16}{24} = \frac{2}{3} = 2 : 3" />
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">2. mintázat:</span>
                <p className="text-slate-600 dark:text-slate-400 font-mono">4 zöld : 6 fehér</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                  <MathText text="\frac{4}{6} = \frac{2}{3} = 2 : 3" />
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Mindkét esetben a színes és fehér csempék aránya <strong>2 : 3</strong>. Az egyenlő értékű arányokat{' '}
              <strong>aránypároknak</strong> nevezzük!
            </p>
          </TheoryCard>
        </div>

        {/* Interaktív Arányszemléltető Doboz */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-slate-900/80 dark:via-blue-950/20 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Interaktív Labor: Arányok Vizuális Szemléltetése és Egyszerűsítése
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium">
              Változtasd az értékeket!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Csúszkák */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Első mennyiség (A - kék): {partA}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{partA} egység</span>
                </div>
                <Slider
                  value={[partA]}
                  min={1}
                  max={24}
                  step={1}
                  onValueChange={(val) => setPartA(val[0])}
                  className="py-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Második mennyiség (B - borostyán): {partB}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{partB} egység</span>
                </div>
                <Slider
                  value={[partB]}
                  min={1}
                  max={24}
                  step={1}
                  onValueChange={(val) => setPartB(val[0])}
                  className="py-1"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setPartA(16); setPartB(24); }}
                  className="text-xs h-7 px-2"
                >
                  16 : 24 (Tk.)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setPartA(14); setPartB(18); }}
                  className="text-xs h-7 px-2"
                >
                  14 : 18 (Mf.)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setPartA(20); setPartB(25); }}
                  className="text-xs h-7 px-2"
                >
                  20 : 25 (Mf.)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setPartA(2); setPartB(3); }}
                  className="text-xs h-7 px-2 text-slate-500"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Alaphelyzet
                </Button>
              </div>
            </div>

            {/* Vizuális megjelenítés */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Felírt arány:</span>
                <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">
                  {partA} : {partB}
                </span>
              </div>

              {/* Vizuális sávdiagram */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>A: {pctA}%</span>
                  <span>Összesen: {totalParts} rész</span>
                  <span>B: {pctB}%</span>
                </div>
                <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner border border-slate-200 dark:border-slate-700">
                  <div
                    style={{ width: `${pctA}%` }}
                    className="bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300"
                  >
                    {partA}
                  </div>
                  <div
                    style={{ width: `${pctB}%` }}
                    className="bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300"
                  >
                    {partB}
                  </div>
                </div>
              </div>

              {/* Számított eredmények */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">Legegyszerűbb alak:</div>
                  <div className="text-base font-extrabold font-mono mt-0.5">
                    {simA} : {simB}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">LNKO = {currentGcd}</div>
                </div>
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase">Hányados érték:</div>
                  <div className="text-base font-extrabold font-mono mt-0.5">
                    {quotient}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {partA} a(z) {partB}-nek {quotient}-szerese
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: Arányok egyszerűsítése és felírása egész számokkal */}
      <TheorySection number={2} title="Arányok egyszerűsítése és törtek aránya">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Egész számok aránya"
            badge="Egyszerűsítés"
            variant="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Osszuk el mindkét tagot a legnagyobb közös osztójukkal (LNKO):
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg font-mono text-xs text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800 space-y-1">
              <div><MathText>14 : 18 = 7 : 9 \quad (:2)</MathText></div>
              <div><MathText>20 : 25 = 4 : 5 \quad (:5)</MathText></div>
              <div><MathText>26 : 39 = 2 : 3 \quad (:13)</MathText></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Tizedes törtek aránya"
            badge="Bővítés 10-hatvánnyal"
            variant="blue"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Bővítsük mindkét tagot 10-zel, 100-zal, hogy egész számokat kapjunk, majd egyszerűsítsünk:
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg font-mono text-xs text-blue-900 dark:text-blue-200 border border-blue-200/60 dark:border-blue-800 space-y-1">
              <div><MathText>1,5 : 6,75 = 150 : 675</MathText></div>
              <div className="text-[11px] text-blue-700 dark:text-blue-300">
                <MathText>150 : 675 = 2 : 9 \quad (:75)</MathText>
              </div>
              <div><MathText>4,2 : 5,4 = 42 : 54 = 7 : 9</MathText></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Törtek aránya"
            badge="Közös nevező / Reciprok"
            variant="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Hozzuk közös nevezőre a törteket, vagy szorozzunk a második reciprokával:
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg font-mono text-xs text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800 space-y-1">
              <div><MathText text="\frac{1}{2} : \frac{3}{4} = \frac{2}{4} : \frac{3}{4} = 2 : 3" /></div>
              <div><MathText text="\frac{3}{5} : \frac{8}{20} = \frac{3}{5} : \frac{2}{5} = 3 : 2" /></div>
              <div><MathText text="1\frac{1}{2} : \frac{7}{8} = \frac{3}{2} : \frac{7}{8} = \frac{12}{8} : \frac{7}{8} = 12 : 7" /></div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          title="Gyakori arányok egyszerűsített formái és összefüggései"
          headers={['Kiindulási arány', 'Művelet lépése', 'Egész számok legkisebb aránya', 'Hányados érték']}
          rows={[
            ['14 : 18', 'Mindkét tag osztása 2-vel', '7 : 9', '≈ 0,78'],
            ['26 : 39', 'Mindkét tag osztása 13-mal', '2 : 3', '≈ 0,67'],
            ['1,5 : 6,75', 'Szorzás 100-zal (150 : 675), majd :75', '2 : 9', '≈ 0,22'],
            ['1/2 : 3/4', 'Közös nevező 4 (2/4 : 3/4)', '2 : 3', '≈ 0,67'],
            ['3/5 : 8/20', 'Egyszerűsítés: 8/20 = 2/5 (3/5 : 2/5)', '3 : 2', '1,5'],
            ['3/7 : 7/3', 'Közös nevező 21 (9/21 : 49/21)', '9 : 49', '≈ 0,18'],
            ['2 : 5/2', 'Közös nevező 2 (4/2 : 5/2)', '4 : 5', '0,8']
          ]}
          className="mt-5"
        />
      </TheorySection>

      {/* 3. SZAKASZ: Az arányos osztás 3 lépéses módszere */}
      <TheorySection number={3} title="Az arányos osztás 3 aranylépése">
        <TheoryCallout
          title="Az arányos osztás alapszabálya"
          icon={<Split className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          variant="blue"
        >
          <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            Arányos osztásnál a felosztandó mennyiséget vagy számot <strong>elosztjuk az arányban szereplő számok összegével</strong> (egy egységnyi rész kiszámítása), majd a kapott értéket <strong>megszorozzuk az arányban szereplő számokkal</strong>.
          </p>
        </TheoryCallout>

        {/* 3 Lépéses folyamat-kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-extrabold flex items-center justify-center text-sm mb-2">
                1.
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Részek összege</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Add össze az arányszámokat! Ebből megtudod, hány egyenlő egységre kell osztani az egészet.
              </p>
            </div>
            <div className="mt-3 p-2 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg font-mono text-xs font-bold text-blue-900 dark:text-blue-300">
              <MathText text="\text{Összes rész} = a + b + c" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-extrabold flex items-center justify-center text-sm mb-2">
                2.
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">1 egységnyi rész értéke</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Oszd el a teljes mennyiséget a részek összegével! Ez lesz az 1 egységre jutó érték.
              </p>
            </div>
            <div className="mt-3 p-2 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-lg font-mono text-xs font-bold text-indigo-900 dark:text-indigo-300">
              <MathText text="1\text{ egység} = \frac{\text{Teljes mennyiség}}{\text{Összes rész}}" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-sm mb-2">
                3.
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Részek és ellenőrzés</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Szorozd meg az 1 egység értékét az egyes arányszámokkal! Végül ellenőrizd az összeget.
              </p>
            </div>
            <div className="mt-3 p-2 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg font-mono text-xs font-bold text-emerald-900 dark:text-emerald-300">
              <MathText text="\text{Rész}_1 = a \cdot 1\text{ egység}" />
            </div>
          </div>
        </div>

        {/* Interaktív Arányos Osztás Kalkulátor */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 dark:from-slate-900/80 dark:via-indigo-950/20 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/60 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Interaktív Arányos Osztás Számoló (3 Tagú Arány)
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 font-medium">
              Próbáld ki tetszőleges adatokkal!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Felosztandó teljes mennyiség: <strong className="text-indigo-600 dark:text-indigo-400">{totalAmount.toLocaleString('hu-HU')} Ft</strong>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[24000, 14400, 6300, 420, 56].map((amt) => (
                    <Button
                      key={amt}
                      size="sm"
                      variant={totalAmount === amt ? 'default' : 'outline'}
                      onClick={() => setTotalAmount(amt)}
                      className="text-xs h-7 px-2"
                    >
                      {amt.toLocaleString('hu-HU')}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Arányszámok ({ratioX} : {ratioY} : {ratioZ}):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500">1. tag</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={ratioX}
                      onChange={(e) => setRatioX(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">2. tag</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={ratioY}
                      onChange={(e) => setRatioY(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">3. tag</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={ratioZ}
                      onChange={(e) => setRatioZ(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Számítási levezetés doboz */}
            <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium">1. Részek összege:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {ratioX} + {ratioY} + {ratioZ} = <strong>{sumRatios} rész</strong>
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium">2. Egy rész értéke:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {totalAmount} : {sumRatios} = <strong>{oneUnit.toFixed(1).replace('.0', '')}</strong>
                </span>
              </div>
              <div className="pt-1 space-y-1">
                <span className="text-slate-500 font-medium block">3. Kiszámított részek:</span>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-mono">
                    <div className="text-[10px] text-slate-500">{ratioX} × {oneUnit.toFixed(1).replace('.0', '')}</div>
                    <div className="font-bold">{valX.toFixed(1).replace('.0', '')}</div>
                  </div>
                  <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-mono">
                    <div className="text-[10px] text-slate-500">{ratioY} × {oneUnit.toFixed(1).replace('.0', '')}</div>
                    <div className="font-bold">{valY.toFixed(1).replace('.0', '')}</div>
                  </div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-mono">
                    <div className="text-[10px] text-slate-500">{ratioZ} × {oneUnit.toFixed(1).replace('.0', '')}</div>
                    <div className="font-bold">{valZ.toFixed(1).replace('.0', '')}</div>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span>Ellenőrzés:</span>
                <span className="font-mono font-bold">
                  {valX.toFixed(0)} + {valY.toFixed(0)} + {valZ.toFixed(0)} = {totalAmount} ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: Gyakorlati és geometriai alkalmazások */}
      <TheorySection number={4} title="Gyakorlati és geometriai alkalmazások">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="1. Geometriai példa: Téglalap kerülete és területe"
            icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Egy téglalap kerülete <MathText text="K = 66\text{ cm}" />, oldalainak aránya <MathText text="a : b = 3 : 8" />. Mekkorák az oldalak és a terület?
            </p>
            <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/60 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <p>
                <strong>1. lépés:</strong> A kerület képlete: <MathText text="K = 2(a + b) = 66\text{ cm}" />, így a két szomszédos oldal összege a félkerület:{' '}
                <MathText text="a + b = 33\text{ cm}" />.
              </p>
              <p>
                <strong>2. lépés:</strong> Részek összege: <MathText text="3 + 8 = 11\text{ rész}" />.
              </p>
              <p>
                <strong>3. lépés:</strong> 1 rész értéke: <MathText text="33 : 11 = 3\text{ cm}" />.
              </p>
              <p>
                <strong>4. lépés:</strong> Oldalak: <MathText text="a = 3 \cdot 3 = 9\text{ cm}" />, <MathText text="b = 8 \cdot 3 = 24\text{ cm}" />.
              </p>
              <p className="font-bold text-indigo-900 dark:text-indigo-200 pt-1 border-t border-indigo-200 dark:border-indigo-800">
                Terület: <MathText text="T = a \cdot b = 9 \cdot 24 = 216\text{ cm}^2" />.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Háromszög szögeinek felosztása"
            icon={<Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Egy derékszögű háromszög két hegyesszögének aránya <MathText text="1 : 4" />. Hány fokosak a szögek?
            </p>
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/60 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <p>
                <strong>1. lépés:</strong> A derékszögű háromszög hegyesszögeinek összege mindig{' '}
                <MathText text="90^\circ" /> (mert <MathText text="180^\circ - 90^\circ = 90^\circ" />).
              </p>
              <p>
                <strong>2. lépés:</strong> Részek összege: <MathText text="1 + 4 = 5\text{ rész}" />.
              </p>
              <p>
                <strong>3. lépés:</strong> 1 rész értéke: <MathText text="90^\circ : 5 = 18^\circ" />.
              </p>
              <p className="font-bold text-blue-900 dark:text-blue-200 pt-1 border-t border-blue-200 dark:border-blue-800">
                Szögek: <MathText text="\alpha = 1 \cdot 18^\circ = 18^\circ" />, <MathText text="\beta = 4 \cdot 18^\circ = 72^\circ" />, és a derékszög <MathText text="\gamma = 90^\circ" />.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: Gyakori tévhitek és csapdák */}
      <TheorySection number={5} title="Tipikus hibák és csapdahelyzetek">
        <TheoryTrapBox
          title="Mire figyelj arányossági feladatoknál?"
          traps={[
            {
              mistake: 'A téglalap kerületének közvetlen osztása: 66 : 11 = 6 cm → oldalak: 18 cm és 48 cm.',
              correction: 'A kerület K = 2(a + b), ezért először el kell felezni (33 cm), és ezt kell 11 részre osztani!',
              explanation: 'Ha nem a félkerületet osztod, mindkét oldal kétszer akkora lesz, így a kerület 132 cm-re duplázódna.'
            },
            {
              mistake: 'Az arányban szereplő tagok sorrendjének felcserélése (pl. 2 : 5 helyett 5 : 2 írása).',
              correction: 'Az arány sorrendje kötött! Az első szám mindig az első megnevezett mennyiséghez tartozik.',
              explanation: '2 : 5 = 0,4, míg 5 : 2 = 2,5. Teljesen más arányt és arányos részeket eredményez.'
            },
            {
              mistake: 'Különbség megadásakor a részek összegével osztunk: "Két szám aránya 2 : 7, különbségük 45" → 45 : 9 = 5.',
              correction: 'Ha a KÜLÖNBSÉG van megadva, akkor az arányszámok KÜLÖNBSÉGÉVEL kell osztani: 7 - 2 = 5 rész = 45!',
              explanation: '5 rész felel meg 45-nek, tehát 1 rész = 9. A két szám: 2 · 9 = 18 és 7 · 9 = 63 (különbségük 63 - 18 = 45).'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
