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
  Award,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  BarChart3,
  Dices,
  Binary,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Gamepad2,
  Calculator,
  Search,
  Scale
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface Chapter6SummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const Chapter6SummaryTheory: React.FC<Chapter6SummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ÖSSZEFOGLALÓ LABOR ÁLLAPOTOK ---
  const [labTab, setLabTab] = useState<'functions' | 'stats' | 'sequences'>('functions');

  // 1. Függvény & Arányosság labor
  const [funcSlope, setFuncSlope] = useState<number>(2);
  const [funcIntercept, setFuncIntercept] = useState<number>(-4);

  const funcZeroRoot = funcSlope !== 0 ? -funcIntercept / funcSlope : null;

  // 2. Statisztika labor
  const [statNumbers, setStatNumbers] = useState<number[]>([3, 5, 5, 7, 10]);

  const statSum = statNumbers.reduce((a, b) => a + b, 0);
  const statMean = (statSum / statNumbers.length).toFixed(2);
  const sortedStats = [...statNumbers].sort((a, b) => a - b);
  const statMedian =
    sortedStats.length % 2 === 1
      ? sortedStats[Math.floor(sortedStats.length / 2)]
      : ((sortedStats[sortedStats.length / 2 - 1] + sortedStats[sortedStats.length / 2]) / 2).toFixed(1);
  const statRange = sortedStats[sortedStats.length - 1] - sortedStats[0];

  // 3. Sorozat labor
  const [seqType, setSeqType] = useState<'arithmetic' | 'geometric' | 'fibonacci'>('arithmetic');
  const [seqA1, setSeqA1] = useState<number>(3);
  const [seqParam, setSeqParam] = useState<number>(4); // d vagy q

  const generateSequence = (): number[] => {
    const res: number[] = [];
    if (seqType === 'arithmetic') {
      for (let n = 1; n <= 6; n++) {
        res.push(seqA1 + (n - 1) * seqParam);
      }
    } else if (seqType === 'geometric') {
      for (let n = 1; n <= 6; n++) {
        res.push(seqA1 * Math.pow(seqParam, n - 1));
      }
    } else {
      res.push(1, 1);
      for (let i = 2; i < 7; i++) {
        res.push(res[i - 1] + res[i - 2]);
      }
    }
    return res;
  };

  const sequencePreview = generateSequence();

  return (
    <TheoryTemplate
      title="VI. Fejezet Összefoglalás: Hozzárendelések, Valószínűség, Sorozatok"
      subtitle="A teljes fejezet átfogó szintézise: arányosságok, lineáris függvények, menetdiagramok, statisztika, valószínűségszámítás, játékelmélet, mintázatok és számsorozatok"
      badgeText="8. OSZTÁLY • VI. FEJEZET ÖSSZEFOGLALÁS • 🏆 TANANYAG"
      documentId="chapter6-summary-theory-doc"
      pdfFilename="8_osztaly_hozzarendelesek_valoszinuseg_sorozatok_osszefoglalas.pdf"
      quickRule={{
        label: 'A FEJEZET NÉGY ALAPPILLÉRE',
        formula: '1. y = kx & xy = k  •  2. f(x) = ax + b  •  3. P = k / n  •  4. a_n = a_1 + (n-1)d'
      }}
      themeColor="emerald"
      practiceTitle="Készen állsz a 90 feladatos fejezeti témazáró kvízre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott (szintenként 30 kérdéses) tesztben párosító és csoportosító játékkal!"
      practiceButtonText="Témazáró Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* INTERAKTÍV ÖSSZEFOGLALÓ MULTI-LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="Interaktív Fejezeti Összefoglaló Labor"
        subtitle="Válts a labor fülei között a függvények, a leíró statisztika és a sorozatok dinamikus vizsgálatához!"
        badge="Interaktív Labor"
        icon={<Activity className="w-5 h-5 text-emerald-600" />}
      >
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-5 rounded-3xl border-2 border-emerald-200/80 dark:border-emerald-900/60 shadow-lg space-y-6">
          {/* Fülek */}
          <div className="flex flex-wrap gap-2 border-b border-emerald-100 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setLabTab('functions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'functions'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              1. Függvény & Zérushely Vizsgáló
            </button>
            <button
              type="button"
              onClick={() => setLabTab('stats')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'stats'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              2. Statisztikai Mutatók Számoló
            </button>
            <button
              type="button"
              onClick={() => setLabTab('sequences')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                labTab === 'sequences'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              3. Sorozat Generátor & Képlet
            </button>
          </div>

          {/* 1. FÜL: FÜGGVÉNYEK */}
          {labTab === 'functions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-400">Meredekség (a): {funcSlope}</span>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={funcSlope}
                    onChange={(e) => setFuncSlope(parseFloat(e.target.value))}
                    className="w-32 h-2 accent-emerald-600"
                  />
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-400">Y-metszet (b): {funcIntercept}</span>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="1"
                    value={funcIntercept}
                    onChange={(e) => setFuncIntercept(parseInt(e.target.value, 10))}
                    className="w-32 h-2 accent-emerald-600"
                  />
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center">
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold block">Függvény egyenlete:</span>
                  <span className="text-base font-mono font-black text-emerald-900 dark:text-emerald-100">
                    f(x) = {funcSlope}x {funcIntercept >= 0 ? `+ ${funcIntercept}` : `- ${Math.abs(funcIntercept)}`}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-emerald-100 dark:border-slate-800 flex flex-col justify-center space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Meredekség előjele:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {funcSlope > 0 ? '📈 Pozitív (Monoton nő)' : funcSlope < 0 ? '📉 Negatív (Monoton csökken)' : '➖ Nulla (Állandó)'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Y-tengelymetszet:</span>
                  <span className="font-bold font-mono text-emerald-700 dark:text-emerald-300">
                    (0; {funcIntercept})
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Zérushely (f(x) = 0):</span>
                  <span className="font-bold font-mono text-emerald-700 dark:text-emerald-300">
                    {funcZeroRoot !== null ? `x = ${funcZeroRoot.toFixed(2)} -> (${funcZeroRoot.toFixed(2)}; 0)` : 'Nincs zérushely'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. FÜL: STATISZTIKA */}
          {labTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                  Aktuális minta ({statNumbers.length} elem):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {statNumbers.map((num, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-bold rounded-lg text-xs"
                    >
                      {num}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatNumbers([2, 4, 4, 6, 9])}
                    className="text-[11px] h-7"
                  >
                    Minta A (2,4,4,6,9)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatNumbers([1, 2, 3, 4, 5, 6])}
                    className="text-[11px] h-7"
                  >
                    Minta B (1..6)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatNumbers([5, 5, 5, 5, 5])}
                    className="text-[11px] h-7"
                  >
                    Azonosak
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-emerald-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block">Számtani átlag (x̄):</span>
                  <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">{statMean}</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block">Medián (középső):</span>
                  <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">{statMedian}</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block">Terjedelem (max - min):</span>
                  <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">{statRange}</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block">Elemek összege:</span>
                  <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">{statSum}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. FÜL: SOROZATOK */}
          {labTab === 'sequences' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={seqType === 'arithmetic' ? 'default' : 'outline'}
                  onClick={() => setSeqType('arithmetic')}
                  className="text-xs h-8"
                >
                  Számtani Sorozat (+d)
                </Button>
                <Button
                  size="sm"
                  variant={seqType === 'geometric' ? 'default' : 'outline'}
                  onClick={() => setSeqType('geometric')}
                  className="text-xs h-8"
                >
                  Mértani Sorozat (·q)
                </Button>
                <Button
                  size="sm"
                  variant={seqType === 'fibonacci' ? 'default' : 'outline'}
                  onClick={() => setSeqType('fibonacci')}
                  className="text-xs h-8"
                >
                  Fibonacci-sorozat
                </Button>
              </div>

              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                  A sorozat első 6 tagja:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sequencePreview.map((tag, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 rounded-xl text-center"
                    >
                      <span className="text-[10px] text-slate-500 block">a_{idx + 1}</span>
                      <span className="font-mono font-black text-sm">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 1. RÉSZ: ARÁNYOSSÁGOK ÉS LINEÁRIS FÜGGVÉNYEK */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. Arányosságok és Lineáris Függvények Rendszerezése"
        subtitle="Hogyan különböztetjük meg az egyenes és fordított arányosságot, és hogyan épül fel a lineáris függvény?"
        badge="Függvénytan"
        icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Egyenes Arányosság"
            badge="y = k · x"
            formula="y / x = k = \\text{állandó}"
            description="Ha x n-szeresére nő, y is n-szeresére nő. Grafikonja a (0; 0) origón átmenő egyenes."
            properties={[
              'Hányados állandósága: y / x = k',
              'Mindig tartalmazza az origót: P(0; 0)',
              'Példa: ár és tömeg, út és idő állandó sebességnél'
            ]}
            themeColor="emerald"
          />

          <TheoryCard
            title="Fordított Arányosság"
            badge="y = k / x"
            formula="x \\cdot y = k = \\text{állandó}"
            description="Ha x n-szeresére nő, y az n-ed részére csökken. Grafikonja kétágú hiperbola."
            properties={[
              'Szorzat állandósága: x · y = k',
              'Soha nem éri el a tengelyeket (aszimptoták)',
              'Példa: munkások száma és idő, sebesség és menetidő'
            ]}
            themeColor="emerald"
          />

          <TheoryCard
            title="Lineáris Függvény"
            badge="f(x) = ax + b"
            formula="a = \\frac{\\Delta y}{\\Delta x}, \\quad x_0 = -\\frac{b}{a}"
            description="Általános elsőfokú hozzárendelés. Az 'a' a meredekség (iránytangens), a 'b' az y-metszet."
            properties={[
              'a > 0: szigorúan monoton nő',
              'a < 0: szigorúan monoton csökken',
              'b: az (0; b) pontban metszi az y-tengelyt'
            ]}
            themeColor="emerald"
          />
        </div>

        <TheoryCallout
          title="Menetdiagramok Aranyszabályai"
          icon={<Compass className="w-5 h-5 text-emerald-600" />}
        >
          <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <p>
              • <strong>Meredekség = Sebesség:</strong> minél meredekebb a vonal az s-t grafikonon, annál nagyobb a sebesség (<MathText text="v = \Delta s / \Delta t" />).
            </p>
            <p>
              • <strong>Vízszintes szakasz:</strong> a jármű áll, sebessége 0 km/h (pihenőidő).
            </p>
            <p>
              • <strong>Metszéspont:</strong> két jármű menetvonala pontosan a találkozásuk idejét és helyét jelöli ki.
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. RÉSZ: LEÍRÓ STATISZTIKA */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. Leíró Statisztikai Mutatók és Diagramok"
        subtitle="Hogyan sűrítjük össze egy adathalmaz információit átlaggal, mediánnal és terjedelemmel?"
        badge="Statisztika"
        icon={<BarChart3 className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Középértékek (Helyzetmutatók)"
            badge="Átlag, Medián, Módusz"
            formula="\\bar{x} = \\frac{\\sum x_i}{N}"
            description="Az adathalmaz centrumát jellemző mutatók."
            properties={[
              'Számtani átlag: az adatok összege osztva a darabszámmal',
              'Medián: nagyság szerint rendezve a középső érték (párosnál a két középső közepe)',
              'Módusz: a leggyakrabban előforduló érték (lehet több is)'
            ]}
            themeColor="teal"
          />

          <TheoryCard
            title="Ingadozás és Gyakoriságok"
            badge="Terjedelem & Relatív Gyakoriság"
            formula="\\text{Terjedelem} = x_{\\max} - x_{\\min}, \\quad g_{\\text{rel}} = \\frac{k}{N}"
            description="Megmutatja az adatok szóródását és relatív megoszlását."
            properties={[
              'Abszolút gyakoriság (k): az adat darabszáma',
              'Relatív gyakoriság: k / N (százalékban is kifejezhető)',
              'Terjedelem: a legnagyobb és legkisebb érték különbsége'
            ]}
            themeColor="teal"
          />
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. RÉSZ: VALÓSZÍNŰSÉGSZÁMÍTÁS ÉS JÁTÉKOK */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Valószínűségszámítás és Játékelmélet"
        subtitle="Hogyan számolunk esélyeket klasszikus képlettel, fa-diagrammal és komplementer módszerrel?"
        badge="Valószínűség"
        icon={<Dices className="w-5 h-5 text-emerald-600" />}
      >
        <TheoryCallout
          title="A Klasszikus Laplace-képlet és Események"
          icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
        >
          <div className="space-y-2 text-xs">
            <p>
              Ha minden kimenetel egyenlően valószínű, akkor az A esemény valószínűsége:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-900 dark:text-emerald-100 text-sm">
              P(A) = kedvező esetek / összes eset = k / n
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <span className="font-bold block">Biztos esemény:</span> P = 1 (100%)
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <span className="font-bold block">Lehetetlen esemény:</span> P = 0 (0%)
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <span className="font-bold block">Komplementer:</span> P(nem A) = 1 - P(A)
              </div>
            </div>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Két Kocka Dobása (36 Eset)"
            badge="Kombinatorikai Mátrix"
            formula="n = 6 \\times 6 = 36 \\text{ kimenetel}"
            description="A két dobott szám összege 2-től 12-ig terjed. A leggyakoribb összeg a 7 (6 kedvező eset: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1)."
            properties={[
              'P(összeg = 7) = 6 / 36 = 1 / 6 ≈ 16,7%',
              'P(összeg = 2) = P(összeg = 12) = 1 / 36',
              'P(mindkettő páros) = 9 / 36 = 1 / 4 = 25%'
            ]}
            themeColor="emerald"
          />

          <TheoryCard
            title="Játékelmélet & Nim-játék"
            badge="Stratégiák & Fair Play"
            formula="\\text{Fair Play: } P(\\text{nyer}) = 50\\%, \\quad \\text{Nim: } 4k + 1"
            description="A 21 gyufás Nim-játékban (1, 2 vagy 3 gyufa vehető el, az utolsót vevő veszít) a nyerő célállások 4k + 1 alakúak."
            properties={[
              'Nyerő gyufaszámok: 1, 5, 9, 13, 17, 21',
              'Ha ellenfelünk x-et vesz el, mi (4 - x)-et veszünk el',
              'Fair Play: egyenlő esély és szimmetrikus játékszabályok'
            ]}
            themeColor="emerald"
          />
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. RÉSZ: MINTÁZATOK ÉS SOROZATOK */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Mintázatok, Képletalkotás és Számsorozatok"
        subtitle="Szabályfelismerés különbségvizsgálattal, gyufaláncok, számtani és mértani sorozatok, valamint a Fibonacci-számok"
        badge="Sorozatok & Mintázatok"
        icon={<Binary className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Számtani Sorozat"
            badge="Aritmetikai"
            formula="a_n = a_1 + (n - 1) \\cdot d"
            description="A szomszédos tagok különbsége (d = differencia) állandó. Bármely belső tag a szomszédai számtani közepe."
            properties={[
              'd = a_(n+1) - a_n',
              'd > 0: szigorúan monoton nő',
              'd < 0: szigorúan monoton csökken'
            ]}
            themeColor="teal"
          />

          <TheoryCard
            title="Mértani Sorozat"
            badge="Geometriai"
            formula="a_n = a_1 \\cdot q^{n - 1}"
            description="A szomszédos tagok hányadosa (q = kvóciens) állandó. Exponenciális növekedést vagy feleződést modellez."
            properties={[
              'q = a_(n+1) / a_n',
              'q > 1: gyorsulva növekszik',
              'q < 0: váltakozó előjelű (oszcillál)'
            ]}
            themeColor="teal"
          />

          <TheoryCard
            title="Fibonacci & Mintázatok"
            badge="Geometria & Láncok"
            formula="F_n = F_{n-1} + F_{n-2}, \\quad K = \\frac{n(n-1)}{2}"
            description="Nevezetes diszkrét modellek a természetben és geometriában."
            properties={[
              'Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21...',
              'Négyzetlánc gyufái: f(n) = 3n + 1',
              'Konvex n-szög átlói: n(n - 3) / 2'
            ]}
            themeColor="teal"
          />
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 5. RÉSZ: TIPIKUS DIÁKCSAPDÁK */}
      {/* ========================================================================= */}
      <TheorySection
        title="5. Tipikus Diákcsapdák és Tévhitek a Fejezetben"
        subtitle="A leggyakoribb felvételi és dolgozatbeli hibák, amelyekre kiemelten figyelned kell!"
        badge="Csapdák & Tippek"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: 'Ha mindkettő nő, az mindig egyenes arányosság'"
            trap="Sokan azt hiszik, ha egy mennyiség növekedése a másik növekedését vonja maga után, az egyenes arányosság (pl. ha valaki 10 évesen 140 cm, 20 évesen 280 cm lesz)."
            correction="Egyenes arányosságnál nem csupán a növekedés iránya azonos, hanem az ARÁNYA is szigorúan állandó: a hányadosuk (y / x = k) minden pontban ugyanaz a konstans!"
          />

          <TheoryTrapBox
            title="2. Csapda: Két kocka összegeinél minden összeg egyforma esélyű"
            trap="Azt hinni, hogy a 2-es és a 7-es összeg ugyanolyan gyakran jön ki két kockával, mert mindkettő 'csak egy szám'."
            correction="A 2-es összeg CSAK 1-féleképpen jöhet ki (1+1 -> 1/36), míg a 7-es összeg 6-féleképpen (1+6, 2+5, 3+4, 4+3, 5+2, 6+1 -> 6/36 = 1/6)! A 7-es esélye hatszor akkora!"
          />

          <TheoryTrapBox
            title="3. Csapda: A 'játékos tévedése' (Gambler's fallacy)"
            trap="Ha egy pénzérmével egymás után 5 fejet dobtunk, a 6. dobásnál 'már biztosan' írás jön, mert a gépnek vagy a sorsnak ki kell egyenlítenie az állást."
            correction="Az érmének nincs emlékezete! Minden egyes dobás teljesen független az előzőektől, a következő dobásnál a fej és az írás esélye pontosan ugyanúgy 50-50%!"
          />

          <TheoryTrapBox
            title="4. Csapda: Sorozat kitevője a mértani képletben"
            trap="Az a_n képletben sokan a_1 · q^n-t írnak a_1 · q^(n-1) helyett."
            correction="Figyelj a hatványkitevőre: a 2. taghoz csak egyszer szorzunk q-val, a 3. taghoz kétszer (q²), az n. taghoz pontosan (n - 1)-szer szorzunk: a_n = a_1 · q^(n - 1)!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Chapter6SummaryTheory;
