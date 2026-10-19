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
  TrendingUp,
  Calculator,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Scale,
  Sparkles,
  LineChart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface DirectProportionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DirectProportionTheory: React.FC<DirectProportionTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Hármasszabály Kalkulátor Állapota ---
  // Példa: givenQty (pl. 4 kg) -> givenPrice (pl. 1800 Ft), keresett: targetQty (pl. 7 kg)
  const [givenQty, setGivenQty] = useState<number>(4);
  const [givenPrice, setGivenPrice] = useState<number>(1800);
  const [targetQty, setTargetQty] = useState<number>(7);

  // Számítások
  const unitPrice = givenQty > 0 ? givenPrice / givenQty : 0;
  const targetPrice = unitPrice * targetQty;

  // Interaktív próba kérdés állapota
  const [quizInput, setQuizInput] = useState<string>('');
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const checkInteractiveProblem = () => {
    // 3 kg banán = 1260 Ft. Mennyi 5 kg? (1260 : 3 = 420; 5 · 420 = 2100)
    if (quizInput.trim() === '2100') {
      setQuizFeedback('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } else {
      setQuizFeedback('wrong');
    }
  };

  return (
    <TheoryTemplate
      title="Egyenes arányosság elmélete"
      subtitle="5. osztályos tananyag: a hányados állandósága, egységre következtetés (hármasszabály) és az origóból induló grafikon"
      badge="VI. Mérés, arányosság, szöveges feladatok"
      quickRule={{
        label: 'Az Egyenes Arányosság Szabálya',
        formula: 'Ahányszorosára nő az egyik mennyiség, annyiszorosára nő a másik is (y : x = állandó)'
      }}
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* ========================================================
          1. SZEKCIÓ: AZ EGYENES ARÁNYOSSÁG FOGALMA
      ======================================================== */}
      <TheorySection
        title="1. Mi az egyenes arányosság?"
        subtitle="Amikor két adat pontosan ugyanolyan arányban változik együtt"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="A pontos matematikai meghatározás"
            color="violet"
            badge="Definíció"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Két összetartozó mennyiség között <strong>egyenes arányosság</strong> van, ha az egyik mennyiség valahányszorosára (pl. 2-szeresére, 3-szorosára, felére) változik, akkor a hozzá tartozó másik mennyiség is <strong>pontosan ugyanannyiszorosára</strong> változik.
            </p>
            <FormulaBox
              formula="\frac{y}{x} = k \quad (\text{állandó}), \quad \text{azaz} \quad y = k \cdot x"
              description="Az összetartozó értékek HÁNYADOSA mindig állandó (k az arányossági tényező / egységár)!"
            />
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div>• <strong>Dupla mennyiség:</strong> Dupla fizetendő összeg.</div>
              <div>• <strong>Harmadannyi idő:</strong> Harmadakkora megtett út.</div>
              <div>• <strong>Ötször annyi benzin:</strong> Ötször akkora megtehető távolság.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A hányados állandóságának ellenőrzése"
            color="indigo"
            badge="Hányados-teszt"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Egyenes arányosság esetén bármelyik oszlopban osztjuk el az alsó számot a felsővel, <strong>mindig pontosan ugyanazt a számot kapjuk</strong>!
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-mono space-y-2 text-indigo-950 dark:text-indigo-200">
              <div className="font-bold text-sm text-indigo-700 dark:text-indigo-400">Példa: Ceruzák vásárlása</div>
              <div>1 db = 180 Ft → 180 : 1 = 180 Ft/db</div>
              <div>2 db = 360 Ft → 360 : 2 = 180 Ft/db</div>
              <div>5 db = 900 Ft → 900 : 5 = 180 Ft/db</div>
              <div>10 db = 1800 Ft → 1800 : 10 = 180 Ft/db</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold font-sans pt-1">
                A hányados állandó = 180 Ft/db (egységár).
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          type="tip"
          title="Mi a különbség az együtt növekvő és az egyenesen arányos között?"
        >
          Nem minden együtt növekvő kapcsolat egyenes arányosság!
          Egyenes arányosság csak akkor áll fenn, ha a <strong>duplázódásra duplázódással</strong>, a <strong>háromszorozódásra háromszorozódással</strong> válaszol a másik adat.
          Például az életkor és a magasság együtt nő gyerekkorban, de egy 10 éves gyerek nem kétszer olyan magas, mint 5 évesen!
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================
          2. SZEKCIÓ: EGYSÉGRE KÖVETKEZTETÉS (HÁRMASSZABÁLY)
      ======================================================== */}
      <TheorySection
        title="2. Az egységre következtetés (Hármasszabály)"
        subtitle="A legfontosabb és legmegbízhatóbb módszer az egyenes arányossági feladatok megoldására"
      >
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A <strong>hármasszabály</strong> neve onnan ered, hogy a feladatban <strong>három adatot ismerünk</strong>, és a <strong>negyediket keressük</strong>. A megoldás mindig 2 egyszerű lépésből áll:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
                1. Lépés: Osztás az egységre (1 db, 1 kg, 1 óra)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Kiszámoljuk, hogy mennyi tartozik <strong>pontosan 1 egységhez</strong> (pl. mennyi 1 kg ára):
              </p>
              <div className="font-mono text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-emerald-200">
                1 kg alma = 1800 Ft : 4 kg = 450 Ft
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-300 text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                2. Lépés: Szorzás a keresett mennyiségre
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Az 1 egységre kapott értéket <strong>megszorozzuk a keresett darabszámmal</strong>:
              </p>
              <div className="font-mono text-xs font-bold text-indigo-900 dark:text-indigo-200 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-indigo-200">
                7 kg alma = 7 · 450 Ft = 3150 Ft
              </div>
            </div>
          </div>
        </div>

        <ExampleBox
          title="Mintapélda: Gépkocsi üzemanyag-fogyasztása"
          problem="Egy autó 15 liter benzinnel 250 km utat tud megtenni. Hány kilométert tehet meg 21 liter benzinnel azonos vezetési stílus mellett?"
          solution="1. Lépés (Egységre következtetés):
Hány km-t tesz meg 1 liter benzinnel?
250 km : 15 liter = 16,66... km/liter (vagy törtként: 50/3 km).

2. Lépés (Keresett mennyiség):
21 literrel a megtehető út:
21 · (250 : 15) = (21 : 15) · 250 = 1,4 · 250 = 350 km.

Válasz: Az autó 21 liter benzinnel pontosan 350 km távolságot tud megtenni."
        />
      </TheorySection>

      {/* ========================================================
          3. SZEKCIÓ: INTERAKTÍV HÁRMASSZABÁLY KALKULÁTOR ÉS GRAFIKON
      ======================================================== */}
      <TheorySection
        title="3. Interaktív Hármasszabály és Grafikon Laboratórium"
        subtitle="Módosítsd a kiinduló és a keresett adatokat, és figyeld meg az azonnali számolást és az egyenes grafikont!"
      >
        <div className="bg-gradient-to-br from-violet-50/70 via-white to-indigo-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/40 p-6 rounded-2xl border border-violet-200 dark:border-violet-900 shadow-md space-y-6">
          {/* Bemeneti mezők */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                1. Ismert mennyiség (pl. kg):
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={givenQty}
                onChange={(e) => setGivenQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-1.5 font-bold text-base bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                2. Ismert összeg (Ft):
              </label>
              <input
                type="number"
                min={10}
                step={50}
                value={givenPrice}
                onChange={(e) => setGivenPrice(Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full px-3 py-1.5 font-bold text-base bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-violet-700 dark:text-violet-300 font-mono"
              />
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                3. Keresett új mennyiség (kg):
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={targetQty}
                onChange={(e) => setTargetQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-1.5 font-bold text-base bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-emerald-700 dark:text-emerald-300 font-bold"
              />
            </div>
          </div>

          {/* Eredmény és Lépésről lépésre levezetés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-2 border border-slate-800">
              <div className="text-slate-400 text-xs">Levezetés lépései:</div>
              <div className="text-violet-300">
                1) 1 egység ára: {givenPrice} : {givenQty} = <strong>{Math.round(unitPrice * 100) / 100} Ft/egység</strong>
              </div>
              <div className="text-emerald-300 font-bold text-sm sm:text-base">
                2) {targetQty} egység ára: {targetQty} · {Math.round(unitPrice * 100) / 100} = <strong>{Math.round(targetPrice)} Ft</strong>
              </div>
              <div className="text-slate-400 text-[11px] pt-1">
                Keresztbeszorzással: x = ({targetQty} · {givenPrice}) : {givenQty} = {Math.round(targetPrice)} Ft
              </div>
            </div>

            {/* Szemléltető Dinamikus SVG Grafikon */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <LineChart className="w-4 h-4 text-violet-600" />
                Az egyenes arányosság grafikonja (Origóból indul)
              </div>
              <svg className="w-full max-w-[280px] h-40" viewBox="0 0 280 160">
                {/* Tengelyek */}
                <line x1="30" y1="130" x2="260" y2="130" stroke="#94a3b8" strokeWidth="2" />
                <line x1="30" y1="130" x2="30" y2="20" stroke="#94a3b8" strokeWidth="2" />
                {/* Tengely feliratok */}
                <text x="250" y="145" fontSize="10" fill="#64748b" textAnchor="end">Mennyiség (kg)</text>
                <text x="35" y="25" fontSize="10" fill="#64748b">Ár (Ft)</text>
                <text x="20" y="135" fontSize="10" fill="#64748b" fontWeight="bold">0</text>

                {/* Egyenes vonal az origóból */}
                <line x1="30" y1="130" x2="250" y2="35" stroke="#8b5cf6" strokeWidth="3" />

                {/* 1. Pont: Ismert adat */}
                <circle cx="110" cy="90" r="5" fill="#8b5cf6" />
                <text x="110" y="80" fontSize="9" fill="#7c3aed" fontWeight="bold" textAnchor="middle">
                  ({givenQty} kg; {givenPrice} Ft)
                </text>

                {/* 2. Pont: Keresett adat */}
                <circle cx="210" cy="50" r="5" fill="#10b981" />
                <text x="210" y="40" fontSize="9" fill="#059669" fontWeight="bold" textAnchor="middle">
                  ({targetQty} kg; {Math.round(targetPrice)} Ft)
                </text>
              </svg>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          4. SZEKCIÓ: AZ EGYENES ARÁNYOSSÁG GRAFIKONJA
      ======================================================== */}
      <TheorySection
        title="4. Az egyenes arányosság grafikus képe: Az Origó szabály"
        subtitle="Miért halad át a grafikon mindig a (0; 0) kezdőponton?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Az Origó (0; 0) aranyszabálya"
            color="emerald"
            badge="Geometriai tulajdonság"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Derékszögű koordináta-rendszerben ábrázolva az egyenesen arányos mennyiségek összetartozó pontjai egy <strong>origóból (0; 0) kiinduló félegyenesre</strong> esnek.
            </p>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
              <div>• <strong>0 kg alma ára:</strong> Pontosan 0 Ft.</div>
              <div>• <strong>0 perc futás alatt megtett út:</strong> Pontosan 0 méter.</div>
              <div>• <strong>0 liter benzin ára:</strong> Pontosan 0 Ft.</div>
            </div>
          </TheoryCard>

          <TheoryTrapBox
            title="Mikor NEM egyenes arányos a kapcsolat?"
            trap="A taxi viteldíja vagy a telefonszámla alapdíjjal NEM egyenes arányosság!"
            explanation="Ha a taxiba beülve van egy 1000 Ft-os alapdíj, és kilométerenként 400 Ft-ot fizetünk:
0 km utazás = 1000 Ft.
10 km utazás = 1000 + 4000 = 5000 Ft.
20 km utazás = 1000 + 8000 = 9000 Ft (nem a duplája az 5000-nek!).
Mivel nem a (0; 0) pontból indul és a duplázódás nem teljesül, ez NEM egyenes arányosság!"
          />
        </div>
      </TheorySection>

      {/* ========================================================
          5. SZEKCIÓ: GYAKORLÓ VILLÁMPRÓBA
      ======================================================== */}
      <TheorySection
        title="5. Gyakorló feladat: Számold ki a hármasszabállyal!"
        subtitle="A zöldségesnél 3 kg banánért 1260 Ft-ot fizettünk. Mennyibe kerül 5 kg ugyanolyan banán?"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Számold ki előbb 1 kg árát (1260 : 3), majd szorozd meg 5-tel!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Pl: 2100"
              value={quizInput}
              onChange={(e) => {
                setQuizInput(e.target.value);
                setQuizFeedback('idle');
              }}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono w-32 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <span className="text-xs text-slate-500">Ft</span>
            <Button
              size="sm"
              onClick={checkInteractiveProblem}
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs"
            >
              Ellenőrzés
            </Button>

            {quizFeedback === 'correct' && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Hibátlan! 1 kg banán = 1260 : 3 = 420 Ft. 5 kg = 5 · 420 = 2100 Ft!
              </span>
            )}
            {quizFeedback === 'wrong' && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Próbáld újra! 1 kg = 1260 : 3 = 420 Ft. Ezt szorozd meg 5-tel!
              </span>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
