import React, { useState, useEffect, useRef } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Coins,
  Percent,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Receipt,
  Scale,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface FinancialProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const FinancialProblemsTheory: React.FC<FinancialProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Labor Állapotok ---
  const [activeLabTab, setActiveLabTab] = useState<'priceChange' | 'interest'>('priceChange');

  // 1. Fül: Árváltozás & Leárazás Szimulátor
  const [initialPrice, setInitialPrice] = useState<number>(20000);
  const [change1, setChange1] = useState<number>(20); // +20%
  const [change2, setChange2] = useState<number>(-20); // -20%
  const [isSimulatingPrices, setIsSimulatingPrices] = useState<boolean>(false);
  const [priceSimStep, setPriceSimStep] = useState<number>(2); // 0: kezdet, 1: 1. árvált, 2: 2. árvált

  // Árak számítása
  const priceAfter1 = initialPrice * (1 + change1 / 100);
  const finalPrice = priceAfter1 * (1 + change2 / 100);
  const netChangePercent = ((finalPrice - initialPrice) / initialPrice) * 100;

  // 2. Fül: Egyszerű Kamat & Megtakarítás Növekedés Szimulátor
  const [principal, setPrincipal] = useState<number>(200000); // Kezdő tőke (Ft)
  const [interestRate, setInterestRate] = useState<number>(8); // Éves kamat (%)
  const [durationMonths, setDurationMonths] = useState<number>(24); // Időtartam hónapokban
  const [isSimulatingSavings, setIsSimulatingSavings] = useState<boolean>(false);
  const [savingsSimMonth, setSavingsSimMonth] = useState<number>(24);

  // Kamat számítás
  const totalInterest = (principal * interestRate * (savingsSimMonth / 12)) / 100;
  const totalMaturityAmount = principal + totalInterest;

  // Szimulációs időzítők (Play / Pause)
  const priceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savingsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Árváltozás szimulációs ciklus
  useEffect(() => {
    if (isSimulatingPrices) {
      priceTimerRef.current = setInterval(() => {
        setPriceSimStep((prev) => {
          if (prev >= 2) return 0;
          return prev + 1;
        });
      }, 1400);
    } else if (priceTimerRef.current) {
      clearInterval(priceTimerRef.current);
    }
    return () => {
      if (priceTimerRef.current) clearInterval(priceTimerRef.current);
    };
  }, [isSimulatingPrices]);

  // Megtakarítás növekedés szimulációs ciklus
  useEffect(() => {
    if (isSimulatingSavings) {
      savingsTimerRef.current = setInterval(() => {
        setSavingsSimMonth((prev) => {
          if (prev >= durationMonths) return 0;
          return prev + 1;
        });
      }, 300);
    } else if (savingsTimerRef.current) {
      clearInterval(savingsTimerRef.current);
    }
    return () => {
      if (savingsTimerRef.current) clearInterval(savingsTimerRef.current);
    };
  }, [isSimulatingSavings, durationMonths]);

  return (
    <TheoryTemplate
      title="7. Pénzügyi feladatok"
      subtitle="Gyakorlati pénzügyi és gazdasági számítások: százalékos árváltozások, leárazások, egyszerű kamatszámítás, ÁFA és megtakarítások algebrai modellezése."
      badge="8. Osztály • III. Témakör"
      badgeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A Pénzügyi Feladatok Aranyszabályai",
        formula: (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-mono text-center">
            <span>Új ár = Eredeti · (1 ± p / 100)</span>
            <span className="hidden sm:inline text-amber-400">|</span>
            <span>Kamat K = (T · p · t) / 100</span>
            <span className="hidden sm:inline text-amber-400">|</span>
            <span>Bruttó = Nettó · 1,27</span>
          </div>
        ),
        description: "Mindig szorzótényezővel dolgozz: 20%-os emelés = · 1,20; 25%-os leárazás = · 0,75. Egymást követő árváltozásoknál a szorzótényezők ÖSSZESZORZÓDNAK!"
      }}
    >
      {/* 1. Szekció: Százalékos Árváltozások és Szorzótényezők */}
      <TheorySection
        number={1}
        title="Százalékos Árváltozások és Szorzótényezők"
        icon={<Percent className="w-5 h-5 text-amber-600" />}
        badge="Százalékszámítás algebrailag"
        badgeColor="amber"
      >
        <TheoryCard
          title="Miért Előnyös a Szorzótényezős Felírás?"
          badge="Alapmodell"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A 8. osztályos felvételi és tankönyvi feladatok megoldásának leggyorsabb és legbiztonságosabb módja, ha az árváltozásokat <strong>közvetlen szorzótényezővel</strong> írjuk fel. Így ahelyett, hogy külön számolnánk a növekményt és hozzáadnánk, egyetlen szorzással megkapjuk az új árat:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  1. Áremelés / Drágulás (+p%)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <div>Az eredeti ár 100%-ához hozzáadódik a drágulás mértéke:</div>
                  <div className="font-mono font-bold text-emerald-800 dark:text-emerald-300 p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 text-center">
                    Új ár = x · (1 + p / 100)
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    Példák: 10%-os emelés = <strong>· 1,10</strong> | 35%-os emelés = <strong>· 1,35</strong>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="font-bold text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-rose-600" />
                  2. Leárazás / Kedvezmény (-p%)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <div>Az eredeti ár 100%-ából levonódik a kedvezmény mértéke:</div>
                  <div className="font-mono font-bold text-rose-800 dark:text-rose-300 p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 text-center">
                    Új ár = x · (1 - p / 100)
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    Példák: 20%-os leárazás = <strong>· 0,80</strong> | 45%-os kedvezmény = <strong>· 0,55</strong>
                  </div>
                </div>
              </div>
            </div>

            <TheoryCallout
              title="Visszaszámolás az Eredeti Árra (Egyenlettel)"
              icon={<Calculator className="w-5 h-5 text-amber-600" />}
              color="amber"
            >
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                <div>Ha a kedvezményes ár ismert (pl. egy kabát 25%-os leárazás után 18 000 Ft), <strong>soha ne a leárazott árból számolj 25%-ot</strong>!</div>
                <div className="font-mono font-bold text-amber-900 dark:text-amber-200 pt-1">
                  0,75 · x = 18 000 ⇒ x = 18 000 / 0,75 = 24 000 Ft!
                </div>
              </div>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Egymást Követő Árváltozások Csapdája */}
      <TheorySection
        number={2}
        title="Egymást Követő Árváltozások Csapdája"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badge="Felvételi Kedvenc"
        badgeColor="amber"
      >
        <TheoryCard
          title="A 20% Emelés Majd 20% Leárazás Nem 0% Változás!"
          badge="Logikai Bizonyítás"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A diákok több mint fele elköveti azt a hibát a felvételin, hogy azt hiszi: ha valamit 20%-kal megemelnek, majd utána 20%-kal leáraznak, akkor visszakapjuk a kiindulási árat. <strong>Ez szigorúan hibás!</strong>
              <br />
              Az ok: a második árváltozás <strong>már a megváltozott (megnövekedett) alapra</strong> vonatkozik!
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-3">
              <div className="text-xs uppercase font-extrabold text-amber-900 dark:text-amber-200 tracking-wider">
                Az Algebrai Szorzótényezős Levezetés:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900">
                  <div className="text-slate-500 font-bold">1. Lépés: Kezdőár</div>
                  <div className="font-mono font-black text-amber-800 dark:text-amber-200 text-sm mt-1">x Ft</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900">
                  <div className="text-emerald-600 font-bold">2. Lépés: +20% emelés</div>
                  <div className="font-mono font-black text-emerald-700 dark:text-emerald-300 text-sm mt-1">x · 1,20</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900">
                  <div className="text-rose-600 font-bold">3. Lépés: -20% leárazás</div>
                  <div className="font-mono font-black text-rose-700 dark:text-rose-300 text-sm mt-1">1,20x · 0,80</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-center font-mono font-black text-sm text-amber-950 dark:text-amber-100">
                Végső ár = x · 1,20 · 0,80 = 0,96 · x ⇒ 96%-a lett az eredetinek ⇒ Pontosan 4%-kal CSÖKKENT!
              </div>
            </div>

            <TheoryTrapBox
              title="Tipikus Felvételi Csapda: Kétszeri 10%-os emelés"
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
            >
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>Ha egy termék árát kétszer egymás után megemelik 10%-kal, az összességében <strong>nem 20%-os</strong>, hanem <strong>21%-os</strong> áremelkedést jelent!</div>
                <div className="font-mono font-bold text-amber-800 dark:text-amber-300">
                  x · 1,10 · 1,10 = 1,21 · x ⇒ +21% áremelés!
                </div>
              </div>
            </TheoryTrapBox>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szekció: Egyszerű Kamatszámítás és Megtakarítások */}
      <TheorySection
        number={3}
        title="Egyszerű Kamatszámítás és Megtakarítások"
        icon={<PiggyBank className="w-5 h-5 text-amber-600" />}
        badge="Banki Matematika"
        badgeColor="amber"
      >
        <TheoryCard
          title="A Kamatszámítás Alapképlete és Időtartama"
          badge="Képlet & Időarányos Kamat"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ha bankba helyezünk egy tőkeösszeget (betét), a bank kamatot fizet érte. <strong>Egyszerű kamatozásnál</strong> a kamat mindig csak a kezdeti tőkeösszegre számolódik:
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-300 dark:border-amber-800 text-center space-y-2">
              <div className="text-xs uppercase font-extrabold text-amber-900 dark:text-amber-300">
                Az Egyszerű Kamat Képlete:
              </div>
              <div className="font-mono font-black text-2xl text-amber-900 dark:text-amber-100 flex items-center justify-center gap-3 py-1">
                <span>Kamat K = </span>
                <Fraction num="T · p · t" den="100" size="lg" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200">
                  <span className="font-bold text-amber-800 dark:text-amber-300">T:</span> Lekötött tőke (Ft)
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200">
                  <span className="font-bold text-amber-800 dark:text-amber-300">p:</span> Éves kamatláb (%)
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200">
                  <span className="font-bold text-amber-800 dark:text-amber-300">t:</span> Idő években
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200">
                  <span className="font-bold text-amber-800 dark:text-amber-300">K:</span> Kapott kamat (Ft)
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-600" />
                Tört év (hónapok szerinti lekötés):
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span>Ha a futamidő nem egész év, a hónapok számát osztjuk 12-vel:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-900 dark:text-amber-200">
                    t = <Fraction num="hónapok száma" den="12" size="sm" />
                  </span>
                </div>
                <div className="font-mono text-amber-800 dark:text-amber-300 font-bold p-1.5 bg-white dark:bg-slate-900 rounded border border-amber-200">
                  Fél év (6 hó): t = 0,5 év | 3 hónap: t = 0,25 év | 18 hónap: t = 1,5 év
                </div>
                <div>A teljes felvehető megtakarítási összeg: <strong>Tőke + Kamat (T + K)</strong>.</div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: Bruttó és Nettó Ár, ÁFA és Árrés */}
      <TheorySection
        number={4}
        title="Bruttó és Nettó Ár, ÁFA és Kereskedelmi Árrés"
        icon={<Receipt className="w-5 h-5 text-amber-600" />}
        badge="Való Élet Matematikája"
        badgeColor="amber"
      >
        <TheoryCard
          title="Hogyan Működik az Általános Forgalmi Adó (ÁFA)?"
          badge="Adózási Alapok"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A kereskedelemben a <strong>nettó ár</strong> a termék adó nélküli ára, amelyre rárakódik az <strong>ÁFA (Magyarországon alapesetben 27%)</strong>. A vásárló a <strong>bruttó árat</strong> fizeti ki:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-2">
                <div className="font-bold text-xs text-amber-800 dark:text-amber-300">
                  Nettóból Bruttó Kiszámítása (+27% ÁFA)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <div>A nettó árat megszorozzuk az 1,27-es szorzóval:</div>
                  <div className="font-mono font-bold text-amber-900 dark:text-amber-200 p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 text-center">
                    Bruttó ár = Nettó ár · 1,27
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Pl. Nettó 10 000 Ft · 1,27 = <strong>Bruttó 12 700 Ft</strong> (ÁFA = 2 700 Ft)
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 space-y-2">
                <div className="font-bold text-xs text-indigo-800 dark:text-indigo-300">
                  Bruttóból Nettó Visszaszámolása
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <div><strong>Vigyázat!</strong> Nem a bruttóból vonunk le 27%-ot, hanem osztunk 1,27-tel:</div>
                  <div className="font-mono font-bold text-indigo-900 dark:text-indigo-200 p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 text-center">
                    Nettó ár = Bruttó ár / 1,27
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Pl. Bruttó 25 400 Ft / 1,27 = <strong>Nettó 20 000 Ft</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szekció: Interaktív Pénzügyi Szimulátor Labor */}
      <TheorySection
        number={5}
        title="Interaktív Pénzügyi Szimulátor Labor"
        icon={<Sliders className="w-5 h-5 text-amber-600" />}
        badge="Szimulátor"
        badgeColor="amber"
      >
        <TheoryCard
          title="Kísérletezz az Árváltozásokkal és a Banki Kamatokkal!"
          badge="Interaktív Pénzügyi Műhely"
          badgeColor="amber"
        >
          {/* Fülváltó */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Válaszd ki a kísérleti témát:
            </span>
            <div className="flex gap-2">
              <Button
                variant={activeLabTab === 'priceChange' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLabTab('priceChange')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeLabTab === 'priceChange'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                    : 'border-amber-300 text-amber-800 dark:text-amber-300'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                Árváltozás & Leárazás Modell
              </Button>
              <Button
                variant={activeLabTab === 'interest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLabTab('interest')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeLabTab === 'interest'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                    : 'border-amber-300 text-amber-800 dark:text-amber-300'
                }`}
              >
                <PiggyBank className="w-3.5 h-3.5" />
                Megtakarítás & Egyszerű Kamat
              </Button>
            </div>
          </div>

          {/* TAB 1: Árváltozás & Leárazás Labor */}
          {activeLabTab === 'priceChange' && (
            <div className="space-y-4 pt-1">
              {/* Kétoszlopos elrendezés: Balra a vizuális árgrafikon, Jobbra az állítógombok és szimuláció vezérlő */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* BAL OLDAL: Vizuális Árdiagram & Eltérés (lg:col-span-7) */}
                <div className="lg:col-span-7 p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-amber-50/40 dark:from-slate-900 dark:to-slate-950 border border-amber-200 dark:border-amber-900/60 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>📊 Áralakulási Folyamatábra (3 fázis):</span>
                    <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                      netChangePercent > 0
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : netChangePercent < 0
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      Nettó változás: {netChangePercent > 0 ? '+' : ''}{netChangePercent.toFixed(2)}%
                    </span>
                  </div>

                  {/* SVG Árdiagram Oszlopok */}
                  <svg
                    viewBox="0 0 620 280"
                    className="w-full h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 drop-shadow-sm"
                  >
                    {/* Hátterezett rácsvonalak */}
                    <line x1="50" y1="220" x2="580" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="50" y1="140" x2="580" y2="140" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="50" y1="60" x2="580" y2="60" stroke="#e2e8f0" strokeDasharray="3 3" />

                    {/* Max ár a skálázáshoz */}
                    {(() => {
                      const maxPrice = Math.max(initialPrice, priceAfter1, finalPrice, 1000) * 1.25;
                      const hInit = Math.max(20, (initialPrice / maxPrice) * 180);
                      const h1 = Math.max(20, (priceAfter1 / maxPrice) * 180);
                      const hFinal = Math.max(20, (finalPrice / maxPrice) * 180);

                      const yInit = 220 - hInit;
                      const y1 = 220 - h1;
                      const yFinal = 220 - hFinal;

                      return (
                        <g>
                          {/* 1. Oszlop: Kezdeti Ár */}
                          <g opacity={priceSimStep >= 0 ? 1 : 0.4} className="transition-opacity duration-300">
                            <rect
                              x="90"
                              y={yInit}
                              width="100"
                              height={hInit}
                              rx="8"
                              fill="#f59e0b"
                              fillOpacity="0.85"
                              stroke="#d97706"
                              strokeWidth="2"
                            />
                            <text x="140" y={yInit - 10} textAnchor="middle" fontSize="12" fontWeight="black" fill="#b45309" fontFamily="monospace">
                              {Math.round(initialPrice).toLocaleString('hu-HU')} Ft
                            </text>
                            <text x="140" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
                              1. Kezdő ár
                            </text>
                            <text x="140" y="255" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace">
                              (100%)
                            </text>
                          </g>

                          {/* Nyíl 1 -> 2 */}
                          <g opacity={priceSimStep >= 1 ? 1 : 0.2}>
                            <path d="M 205 150 L 245 150 M 240 145 L 246 150 L 240 155" stroke="#94a3b8" strokeWidth="2" fill="none" />
                            <text x="225" y="140" textAnchor="middle" fontSize="10.5" fontWeight="black" fill={change1 >= 0 ? '#059669' : '#dc2626'}>
                              {change1 >= 0 ? `+${change1}%` : `${change1}%`}
                            </text>
                          </g>

                          {/* 2. Oszlop: 1. Árváltozás után */}
                          <g opacity={priceSimStep >= 1 ? 1 : 0.3} className="transition-opacity duration-300">
                            <rect
                              x="260"
                              y={y1}
                              width="100"
                              height={h1}
                              rx="8"
                              fill={change1 >= 0 ? '#10b981' : '#f43f5e'}
                              fillOpacity="0.85"
                              stroke={change1 >= 0 ? '#059669' : '#e11d48'}
                              strokeWidth="2"
                            />
                            <text x="310" y={y1 - 10} textAnchor="middle" fontSize="12" fontWeight="black" fill={change1 >= 0 ? '#047857' : '#be123c'} fontFamily="monospace">
                              {Math.round(priceAfter1).toLocaleString('hu-HU')} Ft
                            </text>
                            <text x="310" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
                              2. Állapot
                            </text>
                            <text x="310" y="255" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace">
                              (· {(1 + change1 / 100).toFixed(2)})
                            </text>
                          </g>

                          {/* Nyíl 2 -> 3 */}
                          <g opacity={priceSimStep >= 2 ? 1 : 0.2}>
                            <path d="M 375 150 L 415 150 M 410 145 L 416 150 L 410 155" stroke="#94a3b8" strokeWidth="2" fill="none" />
                            <text x="395" y="140" textAnchor="middle" fontSize="10.5" fontWeight="black" fill={change2 >= 0 ? '#059669' : '#dc2626'}>
                              {change2 >= 0 ? `+${change2}%` : `${change2}%`}
                            </text>
                          </g>

                          {/* 3. Oszlop: Végső Ár */}
                          <g opacity={priceSimStep >= 2 ? 1 : 0.3} className="transition-opacity duration-300">
                            <rect
                              x="430"
                              y={yFinal}
                              width="100"
                              height={hFinal}
                              rx="8"
                              fill="#6366f1"
                              fillOpacity="0.85"
                              stroke="#4f46e5"
                              strokeWidth="2"
                            />
                            <text x="480" y={yFinal - 10} textAnchor="middle" fontSize="12" fontWeight="black" fill="#4338ca" fontFamily="monospace">
                              {Math.round(finalPrice).toLocaleString('hu-HU')} Ft
                            </text>
                            <text x="480" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
                              3. Végső ár
                            </text>
                            <text x="480" y="255" textAnchor="middle" fontSize="10" fill="#4f46e5" fontWeight="bold" fontFamily="monospace">
                              {((finalPrice / initialPrice) * 100).toFixed(1)}%
                            </text>
                          </g>
                        </g>
                      );
                    })()}
                  </svg>

                  {/* Élő Algebrai Egyenlet Összegzés */}
                  <div className="p-3 bg-amber-100/70 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 font-mono text-xs text-amber-950 dark:text-amber-100 text-center space-y-1">
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Összevont szorzótényező:
                    </div>
                    <div className="text-sm font-black">
                      {Math.round(initialPrice).toLocaleString('hu-HU')} Ft · {(1 + change1 / 100).toFixed(2)} · {(1 + change2 / 100).toFixed(2)} = {Math.round(finalPrice).toLocaleString('hu-HU')} Ft
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      Összesített szorzó: {((1 + change1 / 100) * (1 + change2 / 100)).toFixed(4)} ⇒ Eltérés: {netChangePercent > 0 ? '+' : ''}{netChangePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* JOBB OLDAL: Állítógombok & Szimuláció Vezérlő (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {/* Szimuláció Indító & Megállító Gomb Sáv */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Animált bemutatás:
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant={isSimulatingPrices ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => setIsSimulatingPrices(!isSimulatingPrices)}
                        className={`h-7 px-3 rounded-lg text-xs font-bold gap-1 cursor-pointer ${
                          !isSimulatingPrices ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''
                        }`}
                      >
                        {isSimulatingPrices ? (
                          <>
                            <Pause className="w-3.5 h-3.5" /> Megállítás
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" /> Szimuláció indítása
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsSimulatingPrices(false);
                          setPriceSimStep(2);
                        }}
                        className="h-7 w-7 p-0 rounded-lg border-slate-300 cursor-pointer"
                        title="Visszaállítás"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                      </Button>
                    </div>
                  </div>

                  {/* 1. Kezdőár beállítása */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-amber-900 dark:text-amber-200">Kezdőár (x):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-amber-600 text-white font-black">
                        {initialPrice.toLocaleString('hu-HU')} Ft
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={initialPrice}
                      onChange={(e) => setInitialPrice(parseInt(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* 2. 1. Árváltozás (%) */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-900 dark:text-emerald-200">1. Árváltozás:</span>
                      <span className={`font-mono text-sm px-2 py-0.5 rounded-lg font-black text-white ${change1 >= 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                        {change1 >= 0 ? `+${change1}%` : `${change1}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="100"
                      step="5"
                      value={change1}
                      onChange={(e) => setChange1(parseInt(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[10px] text-slate-500 font-mono text-right">
                      Szorzó: {(1 + change1 / 100).toFixed(2)}
                    </div>
                  </div>

                  {/* 3. 2. Árváltozás (%) */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-indigo-900 dark:text-indigo-200">2. Árváltozás:</span>
                      <span className={`font-mono text-sm px-2 py-0.5 rounded-lg font-black text-white ${change2 >= 0 ? 'bg-indigo-600' : 'bg-rose-600'}`}>
                        {change2 >= 0 ? `+${change2}%` : `${change2}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="100"
                      step="5"
                      value={change2}
                      onChange={(e) => setChange2(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[10px] text-slate-500 font-mono text-right">
                      Szorzó: {(1 + change2 / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Megtakarítás & Egyszerű Kamat Labor */}
          {activeLabTab === 'interest' && (
            <div className="space-y-4 pt-1">
              {/* Kétoszlopos elrendezés: Balra a megtakarítási diagram, Jobbra az állítógombok */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* BAL OLDAL: Kamat és Tőke Összetétel Diagram (lg:col-span-7) */}
                <div className="lg:col-span-7 p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-amber-50/40 dark:from-slate-900 dark:to-slate-950 border border-amber-200 dark:border-amber-900/60 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>🏦 Megtakarítás Növekedése ({savingsSimMonth} hónap):</span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 border border-amber-300">
                      Összesen: {Math.round(totalMaturityAmount).toLocaleString('hu-HU')} Ft
                    </span>
                  </div>

                  {/* SVG Megtakarítás Diagram */}
                  <svg
                    viewBox="0 0 620 260"
                    className="w-full h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 drop-shadow-sm"
                  >
                    {/* Alap skála keret */}
                    <rect x="40" y="30" width="540" height="70" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" className="dark:fill-slate-950 dark:stroke-slate-800" />

                    {/* Tőke és Kamat Megoszlás sáv */}
                    {(() => {
                      const pctPrincipal = (principal / totalMaturityAmount) * 540;
                      const pctInterest = 540 - pctPrincipal;

                      return (
                        <g>
                          {/* Tőkesáv (Kék) */}
                          <rect x="40" y="30" width={pctPrincipal} height="70" rx="14" fill="#3b82f6" fillOpacity="0.85" />
                          {/* Kamatsáv (Borostyán / Arany) */}
                          <rect x={40 + pctPrincipal} y="30" width={pctInterest} height="70" rx="14" fill="#f59e0b" fillOpacity="0.9" />

                          {/* Feliratok a sávban */}
                          {pctPrincipal > 100 && (
                            <text x={40 + pctPrincipal / 2} y="72" textAnchor="middle" fontSize="12" fontWeight="black" fill="#ffffff" fontFamily="monospace">
                              Tőke: {principal.toLocaleString('hu-HU')} Ft
                            </text>
                          )}
                          {pctInterest > 80 && (
                            <text x={40 + pctPrincipal + pctInterest / 2} y="72" textAnchor="middle" fontSize="11" fontWeight="black" fill="#ffffff" fontFamily="monospace">
                              +{Math.round(totalInterest).toLocaleString('hu-HU')} Ft
                            </text>
                          )}
                        </g>
                      );
                    })()}

                    {/* Vizuális mérföldkövek az idővonalon */}
                    <g transform="translate(40, 130)">
                      <line x1="0" y1="20" x2="540" y2="20" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const m = (durationMonths / 4) * idx;
                        const posX = (idx / 4) * 540;
                        const isReached = savingsSimMonth >= m;
                        return (
                          <g key={`marker-${idx}`} transform={`translate(${posX}, 20)`}>
                            <circle cx="0" cy="0" r="7" fill={isReached ? '#f59e0b' : '#94a3b8'} stroke="#ffffff" strokeWidth="2" />
                            <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">
                              {Math.round(m)} hó
                            </text>
                          </g>
                        );
                      })}
                    </g>

                    {/* Lebegő értékmutatók alul */}
                    <g transform="translate(60, 205)">
                      <rect x="0" y="0" width="220" height="38" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" className="dark:fill-slate-900" />
                      <text x="110" y="16" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
                        Kezdeti Lekötött Tőke (T)
                      </text>
                      <text x="110" y="30" textAnchor="middle" fontSize="11" fontWeight="black" fill="#1e3a8a" fontFamily="monospace">
                        {principal.toLocaleString('hu-HU')} Ft
                      </text>
                    </g>

                    <g transform="translate(340, 205)">
                      <rect x="0" y="0" width="220" height="38" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" className="dark:fill-slate-900" />
                      <text x="110" y="16" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400e">
                        Kapott Kamatösszeg (K)
                      </text>
                      <text x="110" y="30" textAnchor="middle" fontSize="11" fontWeight="black" fill="#78350f" fontFamily="monospace">
                        +{Math.round(totalInterest).toLocaleString('hu-HU')} Ft
                      </text>
                    </g>
                  </svg>

                  {/* Képlet levezetése */}
                  <div className="p-3 bg-amber-100/70 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 font-mono text-xs text-amber-950 dark:text-amber-100 space-y-1">
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Kamat kiszámítása ({interestRate}% éves kamat, {savingsSimMonth} hónap):
                    </div>
                    <div>
                      K = ({principal} · {interestRate} · {savingsSimMonth}) / (100 · 12) = {Math.round(totalInterest).toLocaleString('hu-HU')} Ft
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      Teljes összeg lejáratkor = {principal.toLocaleString('hu-HU')} Ft + {Math.round(totalInterest).toLocaleString('hu-HU')} Ft = <strong>{Math.round(totalMaturityAmount).toLocaleString('hu-HU')} Ft</strong>
                    </div>
                  </div>
                </div>

                {/* JOBB OLDAL: Állítógombok & Szimuláció Vezérlő (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {/* Animáció indító / megállító */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Idő múlása animáció:
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant={isSimulatingSavings ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => setIsSimulatingSavings(!isSimulatingSavings)}
                        className={`h-7 px-3 rounded-lg text-xs font-bold gap-1 cursor-pointer ${
                          !isSimulatingSavings ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''
                        }`}
                      >
                        {isSimulatingSavings ? (
                          <>
                            <Pause className="w-3.5 h-3.5" /> Megállítás
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" /> Szimuláció indítása
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsSimulatingSavings(false);
                          setSavingsSimMonth(durationMonths);
                        }}
                        className="h-7 w-7 p-0 rounded-lg border-slate-300 cursor-pointer"
                        title="Visszaállítás"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                      </Button>
                    </div>
                  </div>

                  {/* Kezdőtőke (T) */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-blue-900 dark:text-blue-200">Kezdőtőke (T):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-blue-600 text-white font-black">
                        {principal.toLocaleString('hu-HU')} Ft
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="1000000"
                      step="50000"
                      value={principal}
                      onChange={(e) => setPrincipal(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* Éves kamatláb (p%) */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-amber-900 dark:text-amber-200">Éves kamatláb (p):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-amber-600 text-white font-black">
                        {interestRate}% / év
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* Futamidő (hónapok) */}
                  <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-purple-900 dark:text-purple-200">Futamidő:</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-purple-600 text-white font-black">
                        {durationMonths} hónap ({(durationMonths / 12).toFixed(1)} év)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="60"
                      step="3"
                      value={durationMonths}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setDurationMonths(val);
                        setSavingsSimMonth(val);
                      }}
                      className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </TheoryCard>
      </TheorySection>

      {/* 6. Szekció: Részletesen Kidolgozott Mintapéldák */}
      <TheorySection
        number={6}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Calculator className="w-5 h-5 text-amber-600" />}
        badge="Mintapéldák"
        badgeColor="amber"
      >
        {/* 1. MINTAPÉLDA */}
        <TheoryCard
          title="1. Mintapélda: Kétszeri Árváltozás Visszaszámolása"
          badge="Klasszikus Felvételi Feladat"
          badgeColor="amber"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy télikabát árát novemberben 20%-kal megemelték, majd a januári leárazáson az új árat 30%-kal csökkentették. Így a kabát akciós ára 29 400 Ft lett. Mennyi volt a kabát eredeti ára a novemberi áremelés előtt?
            </p>
            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200">Megoldás lépésről lépésre:</div>
              <div>1. Jelölje <MathText>x</MathText> a kabát eredeti árát (Ft).</div>
              <div>2. A 20%-os áremelés után az ár: <MathText>x · 1,20</MathText>.</div>
              <div>3. A 30%-os leárazás után az ár ennek a 70%-a lesz: <MathText>1,20x · 0,70 = 0,84 · x</MathText>.</div>
              <div>4. Az egyenlet: <MathText>0,84 · x = 29 400</MathText>.</div>
              <div className="font-mono font-bold text-amber-800 dark:text-amber-300 pt-1">
                x = 29 400 / 0,84 = 35 000 Ft!
              </div>
              <div className="pt-1 text-slate-600 dark:text-slate-400">
                <strong>Ellenőrzés:</strong> 35 000 Ft + 20% (7 000 Ft) = 42 000 Ft. 42 000 Ft - 30% (12 600 Ft) = 29 400 Ft. Pontosan helyes!
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 2. MINTAPÉLDA */}
        <TheoryCard
          title="2. Mintapélda: Banki Kamat és Megtakarítás Tervezése"
          badge="Egyszerű Kamat"
          badgeColor="amber"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Tamás 400 000 Ft-ot kötött le a bankban egyszerű kamatozással. 9 hónap elteltével a kamattal megnövelt teljes összeg 424 000 Ft volt. Mennyi volt az éves kamatláb?
            </p>
            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200">Megoldás lépésről lépésre:</div>
              <div>1. A kapott kamat: <MathText>K = 424 000 - 400 000 = 24 000</MathText> Ft.</div>
              <div>2. A futamidő években: <MathText>t = 9 / 12 = 0,75</MathText> év.</div>
              <div>3. A kamatképletbe behelyettesítve: <MathText>24 000 = (400 000 · p · 0,75) / 100</MathText>.</div>
              <div>4. <MathText>24 000 = 3 000 · p \implies p = 24 000 / 3 000 = 8\%</MathText>.</div>
              <div className="font-mono font-bold text-amber-800 dark:text-amber-300 pt-1">
                Válasz: Az éves kamatláb 8% volt.
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 3. MINTAPÉLDA */}
        <TheoryCard
          title="3. Mintapélda: Kétféle Befektetés Összehasonlítása"
          badge="Kétismeretlenes Megtakarítás"
          badgeColor="amber"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy család 1 000 000 Ft megtakarítását két különböző bankban kötötte le 1 évre. Az A bank 6%-os, a B bank 9%-os éves kamatot fizetett. Az egy év alatt kapott összes kamat 78 000 Ft volt. Mennyi pénzt fektettek be az egyes bankokban?
            </p>
            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200">Megoldás lépésről lépésre:</div>
              <div>1. Az A bankba tett tőke legyen <MathText>x</MathText> Ft, ekkor a B bankba <MathText>1 000 000 - x</MathText> Ft került.</div>
              <div>2. Az A bank kamata: <MathText>0,06 · x</MathText>, a B bank kamata: <MathText>0,09 · (1 000 000 - x)</MathText>.</div>
              <div>3. Egyenlet: <MathText>0,06x + 0,09(1 000 000 - x) = 78 000</MathText>.</div>
              <div>4. <MathText>0,06x + 90 000 - 0,09x = 78 000 \implies -0,03x = -12 000 \implies x = 400 000</MathText> Ft.</div>
              <div className="font-mono font-bold text-amber-800 dark:text-amber-300 pt-1">
                A bankban: 400 000 Ft | B bankban: 600 000 Ft!
              </div>
              <div className="pt-1 text-slate-600 dark:text-slate-400">
                <strong>Ellenőrzés:</strong> 400 000 · 0,06 = 24 000 Ft. 600 000 · 0,09 = 54 000 Ft. 24 000 + 54 000 = 78 000 Ft!
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 4. MINTAPÉLDA */}
        <TheoryCard
          title="4. Mintapélda: Árrés és Eladási Ár Számítása"
          badge="Kereskedelmi Számítás"
          badgeColor="amber"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy elektronikai bolt 25%-os haszonkulccsal szeretne értékesíteni egy laptopot, amelyet nettó 160 000 Ft-ért szerzett be a gyártótól. Mennyi lesz a laptop bruttó fogyasztói ára, ha az ÁFA 27%?
            </p>
            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200">Megoldás lépésről lépésre:</div>
              <div>1. A bolt 25%-os haszonnal növeli a nettó beszerzési árat: <MathText>160 000 · 1,25 = 200 000</MathText> Ft nettó eladási ár.</div>
              <div>2. Erre a nettó eladási árra jön a 27%-os ÁFA: <MathText>200 000 · 1,27 = 254 000</MathText> Ft.</div>
              <div className="font-mono font-bold text-amber-800 dark:text-amber-300 pt-1">
                Válasz: A laptop bruttó fogyasztói ára 254 000 Ft lesz.
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FinancialProblemsTheory;
