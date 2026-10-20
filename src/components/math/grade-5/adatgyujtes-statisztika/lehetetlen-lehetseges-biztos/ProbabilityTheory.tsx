import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Dice5,
  Coins,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Percent,
  TrendingUp,
  CircleDot,
  Dices,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ProbabilityTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const ProbabilityTheory: React.FC<ProbabilityTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // =========================================================================
  // Interaktív Kísérleti Laboratórium (Érmedobás & Golyóhúzás)
  // =========================================================================
  const [coinHeads, setCoinHeads] = useState<number>(0);
  const [coinTails, setCoinTails] = useState<number>(0);
  const [lastCoin, setLastCoin] = useState<'fej' | 'iras' | null>(null);

  const totalFlips = coinHeads + coinTails;
  const headsPercent = totalFlips > 0 ? ((coinHeads / totalFlips) * 100).toFixed(1) : '50.0';

  const flipCoin = () => {
    const isHead = Math.random() < 0.5;
    if (isHead) {
      setCoinHeads(prev => prev + 1);
      setLastCoin('fej');
    } else {
      setCoinTails(prev => prev + 1);
      setLastCoin('iras');
    }
  };

  const flipTenTimes = () => {
    let h = 0;
    let t = 0;
    for (let i = 0; i < 10; i++) {
      if (Math.random() < 0.5) h++;
      else t++;
    }
    setCoinHeads(prev => prev + h);
    setCoinTails(prev => prev + t);
    setLastCoin(Math.random() < 0.5 ? 'fej' : 'iras');
  };

  const resetCoin = () => {
    setCoinHeads(0);
    setCoinTails(0);
    setLastCoin(null);
  };

  // Golyóhúzás állapot
  const [redBalls, setRedBalls] = useState<number>(7);
  const [blueBalls, setBlueBalls] = useState<number>(3);
  const [lastDrawn, setLastDrawn] = useState<'piros' | 'kék' | null>(null);

  const totalBalls = redBalls + blueBalls;
  const redChance = ((redBalls / totalBalls) * 100).toFixed(0);

  const drawBall = () => {
    const rand = Math.random() * totalBalls;
    const drawn = rand < redBalls ? 'piros' : 'kék';
    setLastDrawn(drawn);
    if (drawn === 'piros') {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#ef4444', '#f87171']
      });
    }
  };

  return (
    <TheoryTemplate
      title="5. Lehetetlen, Lehetséges, Biztos"
      subtitle="A véletlen események minősítése, az esélyek összehasonlítása, kocka- és érmekísérletek, és a szerencsejátékos csapdájának elkerülése"
      themeColor="rose"
      color="rose"
      badgeText="5. OSZTÁLY • VII. TÉMAKÖR: ADATGYŰJTÉS, STATISZTIKA • 📖 TANANYAG"
      documentId="grade-5-valoszinuseg-theory"
      pdfFilename="5_osztaly_VII_5_valoszinuseg_tananyag.pdf"
      practiceTitle="Készen állsz az esélyek és valószínűség gyakorlására?"
      practiceSubtitle="Teszteld tudásodat a biztos, lehetetlen és lehetséges események minősítésében!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      summaryContent={
        <div className="space-y-4">
          <p className="text-sm">
            A mindennapi életben tele vagyunk bizonytalansággal: <em>Vajon esni fog holnap az eső? Kihúzzák a tombolaszámomat? Hatost dobok a társasjátékban?</em>
            A matematika és a valószínűségszámítás segít rendet tenni: megkülönböztetjük a <strong>biztos</strong>, a <strong>lehetetlen</strong> és a <strong>lehetséges (véletlen)</strong> eseményeket, és számszerűsítjük az esélyeket.
          </p>

          <FormulaBox
            title="Az események alaptípusai és esélyük"
            formula="Lehetetlen (0%)   <   Lehetséges (0% … 100%)   <   Biztos (100%)"
            description="A lehetetlen esemény sosem következik be (esélye 0%). A biztos esemény mindenképpen bekövetkezik (esélye 100%). A kettő között vannak a véletlen események."
            color="rose"
          />

          {/* Interaktív Kísérleti Laboratórium */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
                <Dices className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>Interaktív Véletlen Laboratórium: Érmedobás & Golyóhúzás</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={resetCoin}
                className="h-8 text-xs border-rose-300 dark:border-rose-700"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újrakezdés
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Kísérlet: Pénzfeldobás */}
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-500" /> Szabályos Érmedobás
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Összes dobás: <strong>{totalFlips}</strong>
                  </span>
                </div>

                {/* Vizuális érme */}
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all shadow-md ${
                    lastCoin === 'fej'
                      ? 'bg-amber-400 border-amber-600 text-amber-950 scale-105'
                      : lastCoin === 'iras'
                        ? 'bg-slate-300 border-slate-500 text-slate-800 scale-105'
                        : 'bg-slate-100 border-slate-300 text-slate-400'
                  }`}>
                    {lastCoin === 'fej' ? '👑 FEJ' : lastCoin === 'iras' ? '🔢 ÍRÁS' : '❓'}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div>👑 Fejek száma: <strong>{coinHeads}</strong></div>
                    <div>🔢 Írások száma: <strong>{coinTails}</strong></div>
                    <div className="text-rose-600 dark:text-rose-400 font-semibold">
                      Fej aránya: <strong>{headsPercent}%</strong> (elméletileg 50%)
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={flipCoin}
                    className="flex-1 h-8 text-xs bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    1× Dobás
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={flipTenTimes}
                    className="flex-1 h-8 text-xs border-rose-300"
                  >
                    10× Dobás
                  </Button>
                </div>
              </div>

              {/* 2. Kísérlet: Golyóhúzás urnából */}
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CircleDot className="w-4 h-4 text-rose-500" /> Golyóhúzás a Dobozból
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Összesen: <strong>{totalBalls} golyó</strong>
                  </span>
                </div>

                {/* Urna tartalma vizuálisan */}
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-center gap-1.5 min-h-[52px]">
                  {Array.from({ length: redBalls }).map((_, i) => (
                    <span key={`r-${i}`} className="w-5 h-5 rounded-full bg-red-500 border border-red-600 inline-block shadow-sm" title="Piros golyó" />
                  ))}
                  {Array.from({ length: blueBalls }).map((_, i) => (
                    <span key={`b-${i}`} className="w-5 h-5 rounded-full bg-blue-500 border border-blue-600 inline-block shadow-sm" title="Kék golyó" />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-600 font-semibold">🔴 Piros: {redBalls} db ({redChance}%)</span>
                  <span className="text-blue-600 font-semibold">🔵 Kék: {blueBalls} db ({100 - Number(redChance)}%)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={drawBall}
                    className="flex-1 h-8 text-xs bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    🎲 Húzás a dobozból!
                  </Button>
                  {lastDrawn && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                      lastDrawn === 'piros'
                        ? 'bg-red-100 text-red-800 border-red-300'
                        : 'bg-blue-100 text-blue-800 border-blue-300'
                    }`}>
                      Kihúzva: {lastDrawn.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* =================================================================== */}
      {/* 1. SZEKCIÓ: A HÁROM ALAPVETŐ ESEMÉNYTÍPUS                           */}
      {/* =================================================================== */}
      <TheorySection
        title="1. A három alapvető eseménytípus"
        color="rose"
      >
        <TheoryCard title="Hogyan minősítjük a jövőbeli eseményeket?" color="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Minden megfigyelés, mérés vagy játék előtt feltehetünk kérdéseket az eredményre vonatkozóan. Ezek a <strong>statisztikai események</strong> három nagy kategóriába sorolhatók:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {/* Biztos esemény */}
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>BIZTOS Esemény</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                Minden körülmények között, <strong>100%-os biztonsággal bekövetkezik</strong>. Semmilyen más kimenetel nem lehetséges.
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div>• Szabályos kockával 7-nél kisebb számot dobunk.</div>
                <div>• Egy csupa piros golyót tartalmazó dobozból pirosat húzunk.</div>
                <div>• Két páratlan szám összege páros lesz.</div>
              </div>
            </div>

            {/* Lehetséges (Véletlen) esemény */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1.5">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>LEHETSÉGES Esemény</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                <strong>Bekövetkezhet, de nem garantált</strong>. A véletlentől függ: lehet, hogy megtörténik, lehet, hogy nem.
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div>• Szabályos kockával 6-ost dobunk.</div>
                <div>• Pénzérmével fejet dobunk.</div>
                <div>• Holnap délután esni fog az eső.</div>
                <div>• 3 piros és 5 kék golyóból pirosat húzunk.</div>
              </div>
            </div>

            {/* Lehetetlen esemény */}
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300 text-sm mb-1.5">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>LEHETETLEN Esemény</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                A megadott feltételek mellett <strong>soha, semmilyen esetben nem következhet be</strong> (0% esély).
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div>• Szabályos hatoldalú kockával 8-at dobunk.</div>
                <div>• Csupa kék golyót tartalmazó zsákból sárgát húzunk.</div>
                <div>• Egy hétnek 8 napja van.</div>
              </div>
            </div>
          </div>

          <ExampleBox
            title="1. Mintapélda: Események helyes besorolása"
            color="rose"
            problem="Minősítsd a következő eseményeket (Biztos, Lehetséges vagy Lehetetlen)!"
            steps={[
              "A) „Egy dobókockával dobva a szám nem lesz negatív.” → BIZTOS, mert a kockán 1, 2, 3, 4, 5, 6 van, mind pozitív.",
              "B) „Egy dobókockával 5-öst dobunk.” → LEHETSÉGES (véletlen), mert van 5-ös a kockán, de más szám is jöhet.",
              "C) „Egy dobókockával 0-t dobunk.” → LEHETETLEN, mert a kockán nincsen nulla."
            ]}
            solution="Az eseményeket a lehetséges kimenetelek halmazának vizsgálatával minősítjük."
          />
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 2. SZEKCIÓ: ESÉLYEK ÉS VALÓSZÍNŰSÉGEK ÖSSZEHASONLÍTÁSA              */}
      {/* =================================================================== */}
      <TheorySection
        title="2. Esélyek összehasonlítása: Valószínűbb vagy egyenlő esélyű?"
        color="rose"
      >
        <TheoryCard title="Hogyan hasonlítjuk össze a lehetséges eseményeket?" color="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Nem minden lehetséges esemény egyforma valószínűségű! Egyes eseményeknek óriási esélyük van, másoknak elenyészően kicsi.
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-rose-800 dark:text-rose-300 text-xs mb-1">
                ⚖️ 1. Egyenlő esélyű (egyformán valószínű) események
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Akkor beszélünk egyenlő esélyről, ha az egyik esemény bekövetkezésére semmivel sincs nagyobb ok vagy lehetőség, mint a másikéra.
                <br />
                <em>Példák:</em>
                <br />
                • Szabályos érmével <strong>Fejet</strong> vagy <strong>Írást</strong> dobni (1 az 1-hez).
                <br />
                • Kockával <strong>Páros számot</strong> {2, 4, 6} vagy <strong>Páratlan számot</strong> {1, 3, 5} dobni (3 eset vs. 3 eset).
                <br />
                • Kockával <strong>1-est</strong> vagy <strong>6-ost</strong> dobni (mindkettőnek 1 kedvező esete van a 6-ból).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-rose-800 dark:text-rose-300 text-xs mb-1">
                📈 2. Valószínűbb (nagyobb esélyű) vs. Kevésbé valószínű események
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha egy eseményhez <strong>több kedvező kimenetel</strong> tartozik, akkor annak a bekövetkezése <em>valószínűbb</em>.
                <br />
                <em>Példa kockadobásnál:</em>
                <br />
                • „Nem 6-ost dobunk”: 5 kedvező eset {1, 2, 3, 4, 5}.
                <br />
                • „6-ost dobunk”: csupán 1 kedvező eset {6}.
                <br />
                → Ezért <strong>sokkal valószínűbb</strong>, hogy nem hatost dobunk, mint hogy hatost.
              </p>
            </div>
          </div>

          <ExampleBox
            title="Mintapélda: Golyóhúzási esélyek egy dobozból"
            color="rose"
            problem="Egy sötét zsákban 8 piros, 4 zöld és 1 sárga golyó van. Egy golyót húzunk anélkül, hogy belenéznénk. Hasonlítsd össze az esélyeket!"
            steps={[
              "1. lépés: Számoljuk össze az összes golyót: 8 + 4 + 1 = 13 golyó.",
              "2. lépés: Melyik színt a legvalószínűbb kihúzni? A pirosat, mert abból van a legtöbb (8 db a 13-ból).",
              "3. lépés: Melyik színt a legkevésbé valószínű kihúzni? A sárgát, mert abból csak 1 db van.",
              "4. lépés: Lehetetlen kihúzni fekete golyót? Igen, mert egyetlen fekete sincs a zsákban (0 db)."
            ]}
            solution="A kihúzás esélye egyenesen arányos a golyók darabszámával: Piros húzása valószínűbb a zöldnél, a zöld valószínűbb a sárgánál, a fekete pedig lehetetlen."
          />
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 3. SZEKCIÓ: KOCKA- ÉS ÉRMEKÍSÉRLETEK MATEMATIKÁJA                  */}
      {/* =================================================================== */}
      <TheorySection
        title="3. Kocka- és érmekísérletek matematikája"
        color="rose"
      >
        <TheoryCard title="Kedvező esetek és összes eset számlálása" color="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            5. osztályban az esélyek pontos kiszámításának legbiztosabb módja a <strong>kedvező esetek</strong> és az <strong>összes lehetséges eset</strong> arányának felírása.
          </p>

          <FormulaBox
            title="A klasszikus valószínűség alapképlete"
            formula="\text{Esély (Valószínűség)} = \frac{\text{Kedvező esetek száma}}{\text{Összes lehetséges eset száma}}"
            description="Megszámoljuk, hányféle kimenetel felel meg a kérdésnek (kedvező), és elosztjuk az összes elképzelhető kimenetel számával."
          />

          <TheoryTable
            headers={["Esemény (Szabályos kockával)", "Kedvező esetek", "Kedvező db", "Összes eset", "Esély törtként"]}
            rows={[
              ["Páros szám dobása", "{2, 4, 6}", "3 db", "6 db", "3/6 = 1/2 (50%)"],
              ["Prímszám dobása", "{2, 3, 5}", "3 db", "6 db", "3/6 = 1/2 (50%)"],
              ["4-nél nagyobb szám", "{5, 6}", "2 db", "6 db", "2/6 = 1/3 (33%)"],
              ["Legfeljebb 2 dobása", "{1, 2}", "2 db", "6 db", "2/6 = 1/3 (33%)"],
              ["7-nél kisebb szám", "{1, 2, 3, 4, 5, 6}", "6 db", "6 db", "6/6 = 1 (100% Biztos)"],
              ["Nulla dobása", "∅ (üres)", "0 db", "6 db", "0/6 = 0 (0% Lehetetlen)"]
            ]}
          />

          <TheoryCallout type="tip">
            <strong>Vigyázat az 1-es számmal!</strong> Az 1 <em>nem prím</em> és <em>nem összetett</em> szám. A kockán lévő prímszámok kizárólag a <strong>2, 3 és 5</strong> (összesen 3 darab)!
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 4. SZEKCIÓ: A GYAKORISÁG ÉS A SZERENCSEJÁTÉKOS CSAPDÁJA            */}
      {/* =================================================================== */}
      <TheorySection
        title="4. A kísérletek gyakorisága és a szerencsejátékos csapdája"
        color="rose"
      >
        <TheoryCard title="Van-e emlékezete a dobókockának és az érmének?" color="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            A valószínűségszámítás történetének leggyakoribb tévedése a <strong>független események</strong> félreértése.
          </p>

          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 mb-3">
            <h4 className="font-bold text-rose-800 dark:text-rose-200 text-sm mb-1">
              🎲 A kockának és az érmének NINCS emlékezete!
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Minden egyes érmedobás és kockadobás <strong>teljesen független</strong> az összes korábbi dobástól.
              <br />
              Ha egymás után ötször FEJET dobtál, a hatodik dobásnál a FEJ és az ÍRÁS esélye <strong>továbbra is pontosan 50% - 50%</strong> marad! Az érme nem tudja, mit dobtál korábban.
            </p>
          </div>

          <ExampleBox
            title="A nagy számok törvényének szemlélete"
            color="rose"
            problem="Miért mondjuk mégis, hogy fele-fele az esély, ha 10 dobásból gyakran 7 fej és 3 írás lesz?"
            steps={[
              "Kevés dobásnál (pl. 10 dobás) a véletlen nagy kilengéseket mutathat (akár 8 fej is lehet).",
              "Ahogy növeljük a dobások számát (100, 1000, 10 000 dobás), a relatív gyakoriság egyre közelebb simul az elméleti 50%-hoz.",
              "Ezt hívjuk a nagy számok tapasztalati törvényének: sok kísérlet átlaga kiegyenlíti a véletlen ingadozásokat."
            ]}
            solution="Rövid távon a véletlen uralkodik, hosszú távon a matematikai törvényszerűség érvényesül."
          />
        </TheoryCard>

        {/* Tipikus Csapdák Box */}
        <TheoryTrapBox
          traps={[
            {
              title: "Csapda 1: A „most már biztosan ennek kell jönnie” tévhit",
              description: "Ha a társasjátékban régóta nem dobtál 6-ost, a következő dobásnál a 6-os esélye NEM nőtt meg: pontosan ugyanúgy 1/6 (kb. 16,7%), mint bármelyik másik számnak!"
            },
            {
              title: "Csapda 2: A „lehetetlen” és a „nagyon ritka” összetévesztése",
              description: "Ötöslottón telitalálatot elérni rendkívül valószínűtlen (1 a 44 millióhoz), de NEM lehetetlen, hiszen valakinek előbb-utóbb kihúzzák a számait. A lehetetlen az, aminek 0 a matematikai esélye (pl. 91-es számot húzni az 5/90-es lottón)."
            },
            {
              title: "Csapda 3: Visszatevés nélküli húzás figyelmen kívül hagyása",
              description: "Ha kihúzol egy piros golyót a dobozból és NEM teszed vissza, a dobozban megváltoznak az arányok és csökken a teljes darabszám! A következő húzásnál a piros esélye már kisebb lesz."
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
