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
  Trophy,
  BarChart3,
  Scale,
  Dices,
  RotateCcw,
  Sparkles,
  Layers,
  BookOpen,
  PieChart,
  Calculator,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface StatsSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const StatsSummaryTheory: React.FC<StatsSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // =========================================================================
  // Nagy Statisztikai Mester-Irányítópult (Minden egy helyen)
  // =========================================================================
  const [dataPoints, setDataPoints] = useState<number[]>([3, 5, 4, 5, 3]);

  const randomizeData = () => {
    const randomSet = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5) + 1);
    setDataPoints(randomSet);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const sum = dataPoints.reduce((a, b) => a + b, 0);
  const count = dataPoints.length;
  const average = Number((sum / count).toFixed(2));
  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = max - min;

  // Módusz számítása
  const freqMap: Record<number, number> = {};
  dataPoints.forEach(val => {
    freqMap[val] = (freqMap[val] || 0) + 1;
  });
  let maxFreq = 0;
  let mode: number | string = 'Nincs egyértelmű';
  Object.entries(freqMap).forEach(([k, f]) => {
    if (f > maxFreq) {
      maxFreq = f;
      mode = Number(k);
    } else if (f === maxFreq) {
      mode = 'Több is van';
    }
  });

  return (
    <TheoryTemplate
      title="6. Adatgyűjtés és Statisztika Összefoglalás"
      subtitle="A teljes témakör nagyszintézise: logikai játékok, diagramok, adatgyűjtés, számtani közép és valószínűségi események"
      themeColor="slate"
      color="slate"
      badgeText="5. OSZTÁLY • VII. TÉMAKÖR: ADATGYŰJTÉS, STATISZTIKA • 📖 TANANYAG"
      documentId="grade-5-statisztika-osszefoglalas-theory"
      pdfFilename="5_osztaly_VII_6_statisztika_osszefoglalas_tananyag.pdf"
      practiceTitle="Készen állsz a teljes statisztika témakör összefoglaló kvízére?"
      practiceSubtitle="Teszteld a tudásodat a teljes VII. témakör átfogó, vegyes feladatsorával!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      summaryContent={
        <div className="space-y-4">
          <p className="text-sm">
            Ebben az összefoglalóban a <strong>VII. Adatgyűjtés, statisztika</strong> témakör mind az 5 kulcsterületét áttekintjük egyetlen átfogó, rendszerezett vizsgafelkészítőben.
            Megtanultuk, hogyan válogassunk halmazokba, hogyan ábrázoljunk diagramokon, hogyan készítsünk megbízható kutatást, hogyan számoljunk átlagot, és hogyan jósoljuk meg a véletlen események esélyét.
          </p>

          <FormulaBox
            title="A statisztika és valószínűség mester-képletei"
            formula="\text{Átlag} = \frac{\text{Összeg}}{\text{Darabszám}} \quad | \quad \text{Terjedelem} = \text{Max} - \text{Min} \quad | \quad \text{Valószínűség} = \frac{\text{Kedvező}}{\text{Összes}}"
            description="A számtani közép kiegyenlíti az adatokat, a terjedelem megadja a szóródást, a valószínűség pedig a kedvező és összes lehetőség arányát fejezi ki."
            color="slate"
          />

          {/* Nagy Statisztikai Dashboard Szimulátor */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Interaktív Statisztikai Irányítópult: Élő Minta Elemzése</span>
              </div>
              <Button
                size="sm"
                onClick={randomizeData}
                className="h-8 text-xs bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                <Shuffle className="w-3.5 h-3.5 mr-1" /> Új Véletlen Adatsor
              </Button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Jelenlegi tanulói jegyminta (5 dolgozat): <strong>{dataPoints.join(', ')}</strong>.
              Nézd meg, hogyan számolódik ki automatikusan az összes statisztikai mutató egyszerre!
            </p>

            {/* Mutató kártyák rácsa */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Összeg (Σ):</span>
                <span className="font-bold text-base text-slate-800 dark:text-slate-100">{sum}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-sm">
                <span className="text-amber-700 dark:text-amber-400 block text-[11px]">Átlag (Közép):</span>
                <span className="font-bold text-base text-amber-800 dark:text-amber-300">{average}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 shadow-sm">
                <span className="text-cyan-700 dark:text-cyan-400 block text-[11px]">Módusz (Gyakori):</span>
                <span className="font-bold text-base text-cyan-800 dark:text-cyan-300">{mode}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 shadow-sm">
                <span className="text-purple-700 dark:text-purple-400 block text-[11px]">Terjedelem:</span>
                <span className="font-bold text-base text-purple-800 dark:text-purple-300">{max} − {min} = {range}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-rose-700 dark:text-rose-400 block text-[11px]">5-ös húzás esélye:</span>
                <span className="font-bold text-base text-rose-800 dark:text-rose-300">
                  {freqMap[5] || 0} / 5 ({(((freqMap[5] || 0) / 5) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>

            {/* Vizuális oszlopdiagram */}
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="h-28 flex items-end justify-around border-b border-slate-300 dark:border-slate-600 pb-1">
                {dataPoints.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 w-12">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{val}</span>
                    <div
                      className="w-8 rounded-t transition-all duration-500 bg-indigo-500 dark:bg-indigo-600 shadow-sm"
                      style={{ height: `${(val / 5) * 80}px` }}
                    />
                    <span className="text-[10px] text-slate-400">{idx + 1}. jegy</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* =================================================================== */}
      {/* 1. SZEKCIÓ: LOGIKAI JÁTÉKOK ÉS HALMAZOK                           */}
      {/* =================================================================== */}
      <TheorySection
        title="1. Logikai készlet, halmazok és skatulya-elv"
        color="purple"
      >
        <TheoryCard title="A halmazokba sorolás és a logika alapjai" color="purple">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • <strong>A Logikai Készlet 4 alaptulajdonsága:</strong> Szín (piros, sárga, kék, zöld), Forma (kör, négyzet, háromszög, téglalap), Méret (kicsi, nagy) és Lyukasság (lyukas, sima). Összesen 4 × 4 × 2 × 2 = 64 egyedi lapból áll.
            </p>
            <p>
              • <strong>Venn-diagram:</strong> Zárt görbékkel határolt síkrészek. A két halmaz közös része a <strong>metszet</strong> (ahova a mindkét tulajdonsággal rendelkező elemek kerülnek).
            </p>
            <p>
              • <strong>Carroll-diagram:</strong> Táblázatos elrendezés (igen/nem tulajdonságpárok szerint sorokba és oszlopokba bontva).
            </p>
            <p>
              • <strong>Skatulya-elv (Dirichlet-elv):</strong> Ha n + 1 galambot helyezünk el n skatulyába, akkor legalább egy skatulyába több mint egy galamb kerül! A biztos sikerhez mindig a <em>legpechesebb, legrosszabb forgatókönyvet</em> kell vizsgálni.
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 2. SZEKCIÓ: TÁBLÁZATOK ÉS DIAGRAMOK                                */}
      {/* =================================================================== */}
      <TheorySection
        title="2. Táblázatok, oszlop-, vonal- és kördiagramok"
        color="blue"
      >
        <TheoryCard title="Mikor melyik diagramot válasszuk?" color="blue">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-800 dark:text-blue-300 text-xs block mb-1">📊 Oszlopdiagram</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Különálló kategóriák összehasonlítására (pl. kedvenc tantárgyak, állatok). Minden oszlop azonos szélességű, magasságuk a gyakoriságot mutatja.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-800 dark:text-blue-300 text-xs block mb-1">📈 Vonaldiagram</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Időbeli folyamatok és trendek ábrázolására (pl. napi hőmérséklet alakulása, palánta növekedése a napok során).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-800 dark:text-blue-300 text-xs block mb-1">🥧 Kördiagram</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                A részek és az egész arányának szemléltetésére (a teljes kör 100% és 360°, a félkör 50% és 180°).
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
            <strong>Félrevezető grafikonok leleplezése:</strong> Ha a függőleges tengely nem 0-ról indul (letört tengely), az apró különbségek óriásinak látszanak! Mindig nézd meg a skálabeosztást.
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 3. SZEKCIÓ: ADATGYŰJTÉS ÉS RENDSZEREZÉS                           */}
      {/* =================================================================== */}
      <TheorySection
        title="3. Adatgyűjtés és a statisztikai kutatás lépései"
        color="cyan"
      >
        <TheoryCard title="Strigulázás, gyakoriság és módusz" color="cyan">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • <strong>A kutatás 5 lépése:</strong> Célkitűzés → Adatgyűjtés → Rendszerezés (táblázat) → Ábrázolás (diagram) → Következtetés.
            </p>
            <p>
              • <strong>Strigulázás:</strong> 4 álló vonal + 1 ferde áthúzás = <strong>5-ös zárt köteg</strong>. Megkönnyíti a villámgyors összeszámlálást.
            </p>
            <p>
              • <strong>Gyakoriság vs. Relatív gyakoriság:</strong> A gyakoriság a darabszám (pl. 5 fő). A relatív gyakoriság a gyakoriság és az összes adat aránya törtként vagy százalékként (pl. 5/20 = 25%). A relatív gyakoriságok összege mindig 100%!
            </p>
            <p>
              • <strong>Módusz:</strong> A mintában a <em>legtöbbször előforduló, legnagyobb létszámú</em> érték.
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 4. SZEKCIÓ: ÁTLAG ÉS TULAJDONSÁGAI                                 */}
      {/* =================================================================== */}
      <TheorySection
        title="4. Átlag (számtani közép) és tulajdonságai"
        color="amber"
      >
        <TheoryCard title="A számtani közép aranyszabályai" color="amber">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • <strong>Kiszámítás:</strong> Adatok összege : Adatok darabszáma.
            </p>
            <p>
              • <strong>Visszafelé képlet:</strong> Összeg = Átlag × Darabszám. (Ezzel találjuk meg a hiányzó dolgozatjegyet!)
            </p>
            <p>
              • <strong>Közrefogási elv:</strong> Minimum ≤ Átlag ≤ Maximum. Az átlag sosem lehet kisebb a legkisebb adatnál, és nem haladhatja meg a legnagyobbat.
            </p>
            <p>
              • <strong>Új adat hatása:</strong> Ha az új adat &gt; átlag → nő; ha &lt; átlag → csökken; ha = átlag → változatlan.
            </p>
            <p>
              • <strong>Kiegyenlítés elve:</strong> Az átlagtól vett pozitív és negatív eltérések összege mindig 0!
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 5. SZEKCIÓ: LEHETETLEN, LEHETSÉGES, BIZTOS                         */}
      {/* =================================================================== */}
      <TheorySection
        title="5. Valószínűség, esélyek és kísérletek"
        color="rose"
      >
        <TheoryCard title="Véletlen kísérletek és a függetlenség elve" color="rose">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • <strong>Eseménykategóriák:</strong>
              <br />
              - <em>Biztos esemény:</em> 100%-ban bekövetkezik (pl. kockával 7-nél kisebbet dobni).
              <br />
              - <em>Lehetetlen esemény:</em> 0% esély, sosem fordulhat elő (pl. kockával 0-t vagy 8-at dobni).
              <br />
              - <em>Lehetséges esemény:</em> bekövetkezhet, de nem garantált (pl. érmével fejet dobni).
            </p>
            <p>
              • <strong>Klasszikus esély képlete:</strong> Kedvező kimenetelek száma / Összes lehetséges kimenetel száma.
            </p>
            <p>
              • <strong>A szerencsejátékos csapdájának elkerülése:</strong> Az érmének és a dobókockának <strong>nincs emlékezete</strong>! Minden dobás teljesen független az összes korábbi eredménytől.
            </p>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
