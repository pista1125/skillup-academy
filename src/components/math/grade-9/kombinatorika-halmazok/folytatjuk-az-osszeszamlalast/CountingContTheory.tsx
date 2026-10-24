import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Shuffle,
  Users,
  RotateCw,
  Award,
  Handshake,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Sliders,
  Layers,
  HelpCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface CountingContTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CountingContTheory: React.FC<CountingContTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab 1: Permutations & Factorial Visualizer
  const [lab1N, setLab1N] = useState<number>(4);
  const [lab1ActiveOrder, setLab1ActiveOrder] = useState<string[]>(['A', 'B', 'C', 'D']);

  // Factorial helper
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  // Lab 1: Update items when N changes
  const handleNChange = (n: number) => {
    setLab1N(n);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].slice(0, n);
    setLab1ActiveOrder(letters);
  };

  // Lab 1: Shuffle order randomly
  const handleShuffleLab1 = () => {
    const arr = [...lab1ActiveOrder];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setLab1ActiveOrder(arr);
  };

  // Interactive Lab 2: Round Table vs. Straight Bench
  const [lab2Seats, setLab2Seats] = useState<number>(5);
  const [lab2Rotation, setLab2Rotation] = useState<number>(0);

  // Interactive Lab 3: Handshakes & Complete Graph
  const [lab3People, setLab3People] = useState<number>(6);

  return (
    <TheoryTemplate
      title="Folytatjuk az Összeszámlálást: Permutációk és Sorbarendezések"
      subtitle="9. Osztály • I. Kombinatorika és halmazok • 4. Altéma"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🔀 TANANYAG"
      documentId="counting-cont-theory"
      pdfFilename="9_osztaly_folytatjuk_az_osszeszamlalast_tananyag.pdf"
      themeColor="purple"
      quickRule={{
        label: 'A Faktoriális Alapképlete (Permutáció)',
        formula: 'P_n = n! = n \\cdot (n-1) \\cdot \\dots \\cdot 2 \\cdot 1'
      }}
      onBack={onBack}
      practiceTitle="Készen állsz a sorbarendezési kihívásokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és a 3 játékos gyakorló módban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A SORBARENDEZÉS ÉS A FAKTORIÁLIS */}
      <TheorySection
        number={1}
        title="A Sorbarendezések Világa és a Faktoriális Fogalma"
        icon={<Shuffle className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Permutációk"
        badgeColor="purple"
      >
        <TheoryCallout
          title="Mit jelent a sorbarendezés (permutáció) a kombinatorikában?"
          type="info"
        >
          Ha van $n$ darab különböző tárgyunk (vagy emberünk), és ezeket **mind egy számozott sorba** akarjuk állítani, akkor **sorbarendezésről (idegen szóval permutációról)** beszélünk.
          Itt minden egyes elem részt vesz a rendezésben, és semelyik elem nem szerepelhet többször!
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="A szorzási szabály alkalmazása lépésről lépésre"
            color="purple"
            formula="P_n = n! = n \cdot (n-1) \cdot (n-2) \cdot \dots \cdot 2 \cdot 1"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Tegyük fel, hogy $n$ darab könyvet rakunk fel egy polcra balról jobbra:
            </p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-purple-600 dark:text-purple-400">1. helyre:</span>
                <span>$n$ könyv közül választhatunk bármelyiket.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-purple-600 dark:text-purple-400">2. helyre:</span>
                <span>A maradék $n-1$ könyvből választhatunk.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-purple-600 dark:text-purple-400">3. helyre:</span>
                <span>Már csak $n-2$ könyv áll rendelkezésre...</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-purple-600 dark:text-purple-400">Utolsó helyre:</span>
                <span>Pontosan 1 könyv marad.</span>
              </li>
            </ul>
          </TheoryCard>

          {/* SVG Diagram: Sorbarendezés könyvekkel */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-50/60 to-white dark:from-slate-900 dark:to-slate-850 border border-purple-200 dark:border-purple-900/50 flex flex-col items-center justify-center shadow-xs">
            <span className="text-[11px] font-black text-purple-800 dark:text-purple-300 uppercase tracking-wider mb-2">
              4 Elem Sorbarendezése (4! = 24 lehetőség)
            </span>
            <svg viewBox="0 0 280 120" className="w-full max-w-[270px] h-auto drop-shadow-md">
              {/* Shelf */}
              <rect x="15" y="98" width="250" height="10" rx="3" fill="#64748b" />
              {/* Book 1 */}
              <rect x="30" y="25" width="46" height="73" rx="4" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
              <text x="53" y="55" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">1.</text>
              <text x="53" y="78" fill="#f3e8ff" fontSize="11" fontWeight="bold" textAnchor="middle">4 vál.</text>
              {/* Book 2 */}
              <rect x="88" y="32" width="46" height="66" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
              <text x="111" y="60" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">2.</text>
              <text x="111" y="80" fill="#dbeafe" fontSize="11" fontWeight="bold" textAnchor="middle">3 vál.</text>
              {/* Book 3 */}
              <rect x="146" y="20" width="46" height="78" rx="4" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
              <text x="169" y="55" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">3.</text>
              <text x="169" y="78" fill="#d1fae5" fontSize="11" fontWeight="bold" textAnchor="middle">2 vál.</text>
              {/* Book 4 */}
              <rect x="204" y="38" width="46" height="60" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
              <text x="227" y="65" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">4.</text>
              <text x="227" y="83" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">1 vál.</text>
            </svg>
            <div className="mt-2 text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
              4 · 3 · 2 · 1 = 24 sorrend
            </div>
          </div>
        </div>

        {/* Faktoriális Táblázat */}
        <div className="my-5 space-y-2">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Faktoriális Értékek $0!$-tól $10!$-ig: Figyeld meg a növekedési sebességet!</span>
          </h4>
          <TheoryTable
            headers={['n', 'Jelölés', 'Számítás', 'Érték (n!)', 'Gyakorlati Példa']}
            rows={[
              ['0', '0!', 'Definíció szerint', '1', 'Az üres halmaz 1-féleképpen rendezhető sorba'],
              ['1', '1!', '1', '1', '1 könyv 1 helyen'],
              ['2', '2!', '2 · 1', '2', '2 barát leülése egymás mellé (AB, BA)'],
              ['3', '3!', '3 · 2 · 1', '6', '3 futó célbaérkezési sorrendjei'],
              ['4', '4!', '4 · 3 · 2 · 1', '24', '4 betűs szó anagrammái (pl. KÉPZ)'],
              ['5', '5!', '5 · 4 · 3 · 2 · 1', '120', '5 könyv a polcon'],
              ['6', '6!', '6 · 5!', '720', '6 diák leülése egy padsorban'],
              ['7', '7!', '7 · 6!', '5 040', 'A hét 7 napjának program-sorrendje'],
              ['8', '8!', '8 · 7!', '40 320', '8 sakkbábu elrendezése a hátsó sorban'],
              ['9', '9!', '9 · 8!', '362 880', '9 fős baseball-csapat ütősorrendje'],
              ['10', '10!', '10 · 9!', '3 628 800', 'Több mint 3,6 millió lehetőség!']
            ]}
          />
        </div>

        {/* INTERAKTÍV LABOR 1: Faktoriális & Permutáció Vizualizáló */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-purple-200 dark:border-purple-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 1: Permutáció & Faktoriális Kísérlet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Változtasd az elemek számát ($n$), és vizsgáld meg a lehetséges sorbarendezések számát!
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={handleShuffleLab1}
              className="text-xs font-bold border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5 text-purple-600" />
              Sorrend Keverése
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Elemek száma ($n$):</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-sm">
                  n = {lab1N}
                </span>
              </div>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6, 7].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant={lab1N === num ? 'default' : 'outline'}
                    onClick={() => handleNChange(num)}
                    className={
                      lab1N === num
                        ? 'bg-purple-600 hover:bg-purple-700 text-white font-bold h-8 flex-1'
                        : 'font-semibold h-8 flex-1'
                    }
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Visual card display of active elements */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                Egy lehetséges sorbarendezés az elemekből:
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2">
                {lab1ActiveOrder.map((letter, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center w-11 h-13 rounded-xl bg-white dark:bg-slate-900 border-2 border-purple-400 dark:border-purple-600 shadow-xs"
                  >
                    <span className="text-base font-black text-purple-700 dark:text-purple-300">
                      {letter}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">
                      {idx + 1}. hely
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula calculation box */}
            <div className="p-3 rounded-xl bg-purple-100/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center space-y-1">
              <div className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                Összes lehetséges sorbarendezés száma:
              </div>
              <div className="font-mono text-base sm:text-lg font-black text-purple-700 dark:text-purple-300">
                P_{lab1N} = {lab1N}! = {Array.from({ length: lab1N }, (_, i) => lab1N - i).join(' · ')} = {fact(lab1N).toLocaleString('hu-HU')}
              </div>
              <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80">
                {lab1N === 7
                  ? 'Már 7 elemnél több mint 5 ezer különböző sorrend létezik!'
                  : `Ennyi különböző módon állhatnak sorba egymás után az elemek.`}
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: ÜLTETÉSI RENDEK ÉS SPECIÁLIS FELTÉTELEK */}
      <TheorySection
        number={2}
        title="Ültetési Rendek és Speciális Megkötések (Blokk-trükk & Komplementer)"
        icon={<Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Megkötések"
        badgeColor="indigo"
      >
        <TheoryCallout
          title="A kombinatorikai feladatok 'sója': a megkötések!"
          type="tip"
        >
          A valóságban és a vizsgafeladatokban ritkán rendezünk sorba elemeket teljesen szabadon. Leggyakrabban feltételek vannak:
          két barát ragaszkodik hozzá, hogy egymás mellé üljön; két haragos semmiképpen sem ülhet egymás mellé; vagy fiúknak és lányoknak felváltva kell elhelyezkedniük.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Blokk-képzés trükkje (Egymás mellett ülnek)"
            color="indigo"
            formula="Keresett = (\text{blokkok száma})! \cdot (\text{blokkon belüli sorrend})!"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <strong>Példa:</strong> 5 barát (Anna, Béla, Cili, Dénes, Elemér) moziba megy. Hányféleképpen ülhetnek le egy 5 fős sorba, ha <strong>Anna és Béla egymás mellett akar ülni</strong>?
            </p>
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <div><strong>1. lépés:</strong> Képzeljük el, hogy Annát és Bélát "összekötjük" egyetlen blokká: [AB].</div>
              <div><strong>2. lépés:</strong> Így most 4 elemet rendezünk: [AB], C, D, E. Ennek száma: $4! = 24$.</div>
              <div><strong>3. lépés:</strong> A blokkon belül Anna és Béla 2-féleképpen ülhet ([AB] vagy [BA]), azaz $2! = 2$.</div>
              <div className="font-bold pt-1 text-center">Összes eset: $4! \cdot 2! = 24 \cdot 2 = 48$.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Komplementer elv (NEM ülhetnek egymás mellett)"
            color="rose"
            formula="\text{Nem egymás mellett} = \text{Összes lehetséges} - \text{Egymás mellett}"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <strong>Példa:</strong> Hányféleképpen ülhet le az 5 barát, ha <strong>Anna és Béla semmiképp sem ülhet egymás mellett</strong>?
            </p>
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <div><strong>1. lépés:</strong> Minden megkötés nélkül az 5 ember $5! = 120$-féleképpen ülhetne le.</div>
              <div><strong>2. lépés:</strong> Az előbb kiszámoltuk, hogy $48$ olyan elrendezés van, ahol egymás mellett ülnek.</div>
              <div><strong>3. lépés:</strong> A tiltott eseteket egyszerűen kivonjuk az összesből!</div>
              <div className="font-bold pt-1 text-center">Összes jó eset: $120 - 48 = 72$.</div>
            </div>
          </TheoryCard>
        </div>

        {/* Felváltva ülés kártya */}
        <TheoryCard
          title="3. Felváltva ülés szabálya (pl. 3 fiú és 3 lány)"
          color="purple"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">Kezdő pozíció</span>
              A sor kezdődhet Fiúval (F-L-F-L-F-L) vagy Lánnyal (L-F-L-F-L-F).
              <div className="font-bold mt-1 text-purple-600">2 lehetőség</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">Fiúk elhelyezése</span>
              A 3 fiú a saját 3 helyén egymás között tetszőleges sorrendben ülhet:
              <div className="font-bold mt-1 text-purple-600">3! = 6 lehetőség</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">Lányok elhelyezése</span>
              A 3 lány a saját 3 helyén szintén tetszőlegesen ülhet:
              <div className="font-bold mt-1 text-purple-600">3! = 6 lehetőség</div>
            </div>
          </div>
          <div className="mt-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-center font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Összesen: 2 · 3! · 3! = 2 · 6 · 6 = 72 féleképpen ülhetnek le
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: KÖRASZTAL KÖRÜLI ÜLTETÉS (CIKLIKUS PERMUTÁCIÓ) */}
      <TheorySection
        number={3}
        title="Körasztal Körüli Elhelyezések (Ciklikus Permutáció)"
        icon={<RotateCw className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badge="Ciklikus Sorrend"
        badgeColor="violet"
      >
        <TheoryCallout
          title="Miért más egy körasztal, mint egy egyenes pad?"
          type="info"
        >
          Egy egyenes padon van kitüntetett **első** és **utolsó** hely (bal szél, jobb szél).
          Egy körasztalnál viszont nincsen eleje és vége: ha minden vendég feláll, és eggyel arrébb ül az óramutató járásával megegyező irányban,
          **a szomszédsági viszonyok és a relatív sorrend változatlan marad!**
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="A Körasztal Képlete"
            color="violet"
            formula="P_{n, \text{kör}} = (n-1)! = \frac{n!}{n}"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Kétféle gondolatmenettel is megértheted ezt a gyönyörű képletet:
            </p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <strong>1. Elforgatások kizárása:</strong> Ha az asztalt elforgatjuk, minden elrendezésnek $n$ darab forgatási változata van. Ezért az $n!$-t osztani kell $n$-nel: $n! / n = (n-1)!$.
              </li>
              <li>
                <strong>2. Rögzítési trükk:</strong> Válasszunk ki 1 embert (pl. a születésnapost), és ültessük le bárhová. Ő rögzíti a vonatkoztatási rendszert. A maradék $n-1$ embert a hozzá képest lévő helyekre már $(n-1)!$-féleképpen ültethetjük le!
              </li>
            </ul>
          </TheoryCard>

          {/* SVG Diagram: Körasztal 4 emberrel */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-violet-50/60 to-white dark:from-slate-900 dark:to-slate-850 border border-violet-200 dark:border-violet-900/50 flex flex-col items-center justify-center shadow-xs">
            <span className="text-[11px] font-black text-violet-800 dark:text-violet-300 uppercase tracking-wider mb-2">
              4 Fő Körasztalnál: (4 - 1)! = 3! = 6 Sorrend
            </span>
            <svg viewBox="0 0 200 160" className="w-full max-w-[200px] h-auto">
              {/* Table */}
              <circle cx="100" cy="80" r="48" fill="#e2e8f0" stroke="#8b5cf6" strokeWidth="2.5" />
              <text x="100" y="84" fill="#6d28d9" fontSize="11" fontWeight="bold" textAnchor="middle">Körasztal</text>
              {/* Seats */}
              {/* North: A */}
              <circle cx="100" cy="18" r="14" fill="#a855f7" />
              <text x="100" y="23" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">A</text>
              {/* East: B */}
              <circle cx="162" cy="80" r="14" fill="#3b82f6" />
              <text x="162" y="85" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">B</text>
              {/* South: C */}
              <circle cx="100" cy="142" r="14" fill="#10b981" />
              <text x="100" y="147" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">C</text>
              {/* West: D */}
              <circle cx="38" cy="80" r="14" fill="#f59e0b" />
              <text x="38" y="85" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">D</text>
              {/* Rotation arrow */}
              <path d="M 125 45 A 35 35 0 0 1 145 68" fill="none" stroke="#6d28d9" strokeWidth="2" strokeDasharray="3 2" />
            </svg>
            <div className="mt-1 text-[11px] text-center text-slate-500">
              A forgatott elrendezések azonosak!
            </div>
          </div>
        </div>

        {/* INTERAKTÍV LABOR 2: Egyenes Pad vs Körasztal Szimulátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-violet-50/50 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-violet-200 dark:border-violet-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-violet-600 text-white shadow-xs">
                <RotateCw className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 2: Pad ($n!$) vs. Körasztal ($(n-1)!$)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hasonlítsd össze az egyenes sorban és a körasztal körül lehetséges ültetési rendeket!
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setLab2Rotation((prev) => (prev + 1) % lab2Seats)}
              className="text-xs font-bold border-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5 text-violet-600" />
              Asztal Forgatása ({lab2Rotation + 1}/{lab2Seats})
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Ülőhelyek száma ($n$):</span>
                <span className="px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-mono text-sm">
                  n = {lab2Seats}
                </span>
              </div>
              <div className="flex gap-2">
                {[3, 4, 5, 6, 7].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant={lab2Seats === num ? 'default' : 'outline'}
                    onClick={() => {
                      setLab2Seats(num);
                      setLab2Rotation(0);
                    }}
                    className={
                      lab2Seats === num
                        ? 'bg-violet-600 hover:bg-violet-700 text-white font-bold h-8 flex-1'
                        : 'font-semibold h-8 flex-1'
                    }
                  >
                    {num} fő
                  </Button>
                ))}
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Egyenes Padban</span>
                <div className="font-mono text-lg font-black text-slate-800 dark:text-slate-100">
                  {lab2Seats}! = {fact(lab2Seats).toLocaleString('hu-HU')}
                </div>
                <div className="text-[11px] text-slate-500">
                  Minden hely különböző sorszámú (1-től {lab2Seats}-ig)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-violet-100/70 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">Körasztal Körül</span>
                <div className="font-mono text-lg font-black text-violet-700 dark:text-violet-300">
                  ({lab2Seats} - 1)! = {fact(lab2Seats - 1).toLocaleString('hu-HU')}
                </div>
                <div className="text-[11px] text-violet-700/80 dark:text-violet-300/80">
                  Pontosan {lab2Seats}-szer kevesebb a forgatási szimmetria miatt!
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KIVÁLASZTÁS SORRENDDEL ÉS ANÉLKÜL */}
      <TheorySection
        number={4}
        title="Kiválasztás Sorrenddel (Dobogósok) és Sorrend Nélkül (Kézfogások)"
        icon={<Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Variáció & Részhalmaz"
        badgeColor="amber"
      >
        <TheoryCallout
          title="A kombinatorika kulcskérdése: Számít-e a sorrend?"
          type="warning"
        >
          Mindig kérdezd meg magadtól egy feladat olvasásakor: **számít-e a kiválasztott elemek belső sorrendje?**
          - Ha IGEN (pl. arany, ezüst, bronzérem): nem osztunk semmivel, a tényezők szorzatát vesszük.
          - Ha NEM (pl. 2 ember kezet fog, vagy 2 fős bizottság alakul): el kell osztanunk a belső átrendezések számával!
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="1. Sorrend számít: n elemből k kiválasztása"
            color="amber"
            formula="V_n^k = n \cdot (n-1) \cdot \dots \cdot (n-k+1)"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Példa (Dobogós helyezések):</strong> Egy 8 fős futóversenyen hányféleképpen alakulhat az arany-, ezüst- és bronzérmesek sorrendje?
            </p>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• 1. helyezett (Arany): 8 lehetőség</li>
              <li>• 2. helyezett (Ezüst): 7 lehetőség</li>
              <li>• 3. helyezett (Bronz): 6 lehetőség</li>
            </ul>
            <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center font-mono font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              8 · 7 · 6 = 336 különböző dobogó
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Sorrend NEM számít: Kézfogások & Részhalmazok"
            color="emerald"
            formula="\text{Kézfogások száma} = \frac{n \cdot (n-1)}{2}"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>Példa:</strong> Egy társaságban $n$ ember van, és mindenki mindenkivel pontosan egyszer kezet fog.
            </p>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Minden ember $n-1$ másikkal fog kezet $\rightarrow n \cdot (n-1)$</li>
              <li>• Mivel egy kézfogáshoz 2 ember kell, minden kézfogást pontosan <strong>kétszer</strong> számoltunk (A fogott B-vel és B fogott A-val)!</li>
            </ul>
            <div className="mt-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              Pl. 6 fő esetén: (6 · 5) / 2 = 30 / 2 = 15 kézfogás
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV LABOR 3: Kézfogás & Teljes Gráf Kalkulátor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 my-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                <Handshake className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Interaktív Labor 3: Kézfogások & Teljes Gráf Szimuláció
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nézd meg a csúcsok közötti összeköttetéseket és a képlet működését!
                </p>
              </div>
            </div>

            <div className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
              Kézfogások: {(lab3People * (lab3People - 1)) / 2}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Társaság létszáma ($n$ ember):</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                  n = {lab3People}
                </span>
              </div>
              <div className="flex gap-2">
                {[3, 4, 5, 6, 7, 8].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant={lab3People === num ? 'default' : 'outline'}
                    onClick={() => setLab3People(num)}
                    className={
                      lab3People === num
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-8 flex-1'
                        : 'font-semibold h-8 flex-1'
                    }
                  >
                    {num} fő
                  </Button>
                ))}
              </div>
            </div>

            {/* SVG Graph Visualization */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-52 h-52">
                {/* Draw edges (handshakes) */}
                {Array.from({ length: lab3People }).map((_, i) => {
                  const angleI = (i * 2 * Math.PI) / lab3People - Math.PI / 2;
                  const x1 = 120 + 80 * Math.cos(angleI);
                  const y1 = 120 + 80 * Math.sin(angleI);
                  return Array.from({ length: lab3People }).slice(i + 1).map((__, jOffset) => {
                    const j = i + 1 + jOffset;
                    const angleJ = (j * 2 * Math.PI) / lab3People - Math.PI / 2;
                    const x2 = 120 + 80 * Math.cos(angleJ);
                    const y2 = 120 + 80 * Math.sin(angleJ);
                    return (
                      <line
                        key={`edge-${i}-${j}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                      />
                    );
                  });
                })}

                {/* Draw nodes (people) */}
                {Array.from({ length: lab3People }).map((_, i) => {
                  const angle = (i * 2 * Math.PI) / lab3People - Math.PI / 2;
                  const cx = 120 + 80 * Math.cos(angle);
                  const cy = 120 + 80 * Math.sin(angle);
                  return (
                    <g key={`node-${i}`}>
                      <circle cx={cx} cy={cy} r="14" fill="#047857" stroke="#ffffff" strokeWidth="2" />
                      <text x={cx} y={cy + 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {String.fromCharCode(65 + i)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-3 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-200 text-center">
                ({lab3People} · ({lab3People} - 1)) / 2 = ({lab3People * (lab3People - 1)}) / 2 = {(lab3People * (lab3People - 1)) / 2} kézfogás / gráf-él
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS CSAPDÁK ÉS BUKTATÓK */}
      <TheorySection
        number={5}
        title="Tipikus Csapdák és Gyakori Hibák a Vizsgákon"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Figyelem"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: Körasztal elszámolása n! értékkel"
            trap="A feladat szerint 6 ember ül le egy kerek asztal köré. Sokan automatikusan 6! = 720-at írnak."
            wrong="6! = 720"
            wrongExplanation="Hiba! Egy körasztalnál nincsen külön bal szél és jobb szél, a forgatási változatok azonosak."
            correct="(6 - 1)! = 5! = 120"
            correctExplanation="Helyes! Körasztalnál egy embert leültetve rögzítjük a vonatkoztatási rendszert, a többiek (n-1)!-féleképpen ülhetnek le."
            tip="Mindig nézd meg, hogy pad (egyenes vonal) vagy körasztal szerepel-e a szövegben!"
          />

          <TheoryTrapBox
            title="2. Buktató: Kézfogásoknál az osztás elfelejtése"
            trap="Egy 10 fős megbeszélésen mindenki mindenkivel kezet fog. Hány kézfogás történt?"
            wrong="10 · 9 = 90"
            wrongExplanation="Hiba! Itt minden kézfogást kétszer számoltál: amikor A fogott B-vel, és amikor B fogott A-val."
            correct="(10 · 9) / 2 = 45"
            correctExplanation="Helyes! Mivel a kézfogás kölcsönös (oda-vissza ugyanaz az esemény), osztani kell 2-vel."
            tip="Ha a kapcsolat kétirányú és a sorrend nem számít (kézfogás, koccintás, mérkőzés két csapat között), mindig osztani kell 2-vel!"
          />

          <TheoryTrapBox
            title="3. Buktató: Blokk-trükknél a belső sorrend kihagyása"
            trap="5 könyvet teszünk a polcra, de két adott könyvnek (pl. Matek és Fizika) egymás mellett kell lennie."
            wrong="4! = 24"
            wrongExplanation="Hiba! Összevontad ugyan a két könyvet 1 blokká, de elfelejtetted, hogy a blokkon belül Matek-Fizika és Fizika-Matek is lehet!"
            correct="4! · 2! = 24 · 2 = 48"
            correctExplanation="Helyes! A 4 blokk sorrendje 4!, és a blokkon belül a 2 könyv 2!-féleképpen állhat."
            tip="Ha 3 elemnek kell egymás mellett lennie, a belső sorrendjük 3! = 6!"
          />

          <TheoryTrapBox
            title="4. Buktató: 0! = 0 téves feltételezése"
            trap="Mennyi 0! értéke? Sokan azt gondolják, hogy 0."
            wrong="0! = 0"
            wrongExplanation="Hiba! Ha 0! = 0 lenne, a kombinatorikai képletek többsége értelmetlenné válna (0-val való osztás lépne fel)."
            correct="0! = 1"
            correctExplanation="Helyes! 0 elemet pontosan egyféleképpen lehet sorba rendezni (az üres sorbarendezéssel). Továbbá n! = n · (n-1)! alapján 1! = 1 · 0!, ahonnan 0! = 1."
            tip="Jegyezd meg: 0! = 1, ahogyan x⁰ = 1 is!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CountingContTheory;
