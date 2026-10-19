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
  GitCompare,
  TrendingUp,
  TrendingDown,
  Table,
  ShoppingCart,
  Bike,
  Users,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Calculator,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface VariableQuantitiesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

type ScenarioType = 'shopping' | 'travel' | 'work';

export const VariableQuantitiesTheory: React.FC<VariableQuantitiesTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Változó Mennyiségek Laboratórium ---
  const [scenario, setScenario] = useState<ScenarioType>('shopping');
  const [unitRate, setUnitRate] = useState<number>(300); // 300 Ft/füzet vagy 15 km/h
  const [multiplier, setMultiplier] = useState<number>(4);

  // Interaktív táblázat kitöltő teszt állapota
  const [tableInput1, setTableInput1] = useState<string>('');
  const [tableInput2, setTableInput2] = useState<string>('');
  const [tableFeedback, setTableFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const checkTableExercise = () => {
    // Feladat: 1 füzet = 250 Ft. 4 füzet = ? (1000), ? füzet = 1500 Ft (6)
    if (tableInput1.trim() === '1000' && tableInput2.trim() === '6') {
      setTableFeedback('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } else {
      setTableFeedback('wrong');
    }
  };

  return (
    <TheoryTemplate
      title="Arányosságok, változó mennyiségek elmélete"
      subtitle="5. osztályos tananyag: együtt változó adatok, táblázatok, összefüggések felismerése és az állandó szabály megfogalmazása"
      badge="VI. Mérés, arányosság, szöveges feladatok"
      quickRule={{
        label: 'A Hozzárendelés Szabálya',
        formula: 'y = k · x (Összefüggés a bemenő és kimenő értékek között)'
      }}
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* ========================================================
          1. SZEKCIÓ: MIK AZOK AZ EGYÜTT VÁLTOZÓ MENNYISÉGEK?
      ======================================================== */}
      <TheorySection
        title="1. Mik azok az együtt változó mennyiségek?"
        subtitle="A mindennapi életben a dolgok ritkán állandóak – a változások szinte mindig összefüggnek!"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TheoryCard
            title="1. Együtt növekvő vagy csökkenő adatok"
            color="indigo"
            badge="Egyenes jelleg"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ha az egyik mennyiség nő, a hozzá kapcsolódó másik mennyiség is <strong>ugyanúgy növekszik</strong>. Ha az egyik csökken, a másik is csökken.
            </p>
            <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <TrendingUp className="w-4 h-4 text-indigo-600" /> Példák a valóságból:
              </div>
              <div>• <strong>Füzetek száma és ára:</strong> Több füzetért több pénzt fizetünk.</div>
              <div>• <strong>Menetidő és megtett út:</strong> Ha kétszer annyi ideig gyalogolunk, kétszer akkora utat teszünk meg.</div>
              <div>• <strong>Fagylalt gombócok és tömeg:</strong> 3 gombóc háromszor nehezebb, mint 1 gombóc.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Ellentétesen változó adatok"
            color="amber"
            badge="Fordított jelleg"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ha az egyik mennyiség megnő, a hozzá kapcsolódó másik mennyiség <strong>pontosan lecsökken</strong>.
            </p>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <TrendingDown className="w-4 h-4 text-amber-600" /> Példák a valóságból:
              </div>
              <div>• <strong>Munkások és munkaidő:</strong> Ha kétszer annyi festő dolgozik egy szobán, feleannyi idő alatt készülnek el.</div>
              <div>• <strong>Sebesség és menetidő:</strong> Ha kétszer gyorsabban tekerünk, feleannyi idő alatt érünk oda a célhoz.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Nem összefüggő (független) adatok"
            color="rose"
            badge="Nincs összefüggés"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Vigyázat! Nem minden változó adat függ össze egymással. Egyes mennyiségek teljesen függetlenek.
            </p>
            <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-800 text-xs text-rose-950 dark:text-rose-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-600" /> Nincs matematikai kapcsolat:
              </div>
              <div>• Egy felnőtt ember életkora és a cipőmérete (a láb nem nő örökké).</div>
              <div>• Egy tanuló magassága és a matematika dolgozatának pontszáma.</div>
              <div>• A kinti hőmérséklet és a telefonunk akkumulátorának töltöttsége.</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================
          2. SZEKCIÓ: TÁBLÁZATOK ÉS A SZABÁLY MEGFOGALMAZÁSA
      ======================================================== */}
      <TheorySection
        title="2. Kapcsolatok táblázatban: az állandó keresése"
        subtitle="Hogyan ismerhetjük fel az összefüggést egy számtáblázatból?"
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A változó mennyiségek vizsgálatának legfontosabb eszköze a <strong>táblázat</strong>. Egy táblázatban két irányban is vizsgálódhatunk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">1</span>
                Vízszintes összefüggés (Lépkedés balról jobbra)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Azt vizsgáljuk, hogy hányszorosára változik a felső sor értéke:
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300">
                Ha a füzetek száma <strong>duplájára nő (· 2)</strong>,<br />
                akkor a fizetendő összeg is a <strong>duplájára nő (· 2)</strong>.<br />
                Ha a darabszám <strong>ötödére csökken (: 5)</strong>,<br />
                az összeg is az <strong>ötödére csökken (: 5)</strong>.
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                Függőleges összefüggés (Egységár, állandó szorzó)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Azt vizsgáljuk, hogy a felső sort mivel kell megszorozni az alsó sorhoz:
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300">
                Felső sor: Füzetek száma (db)<br />
                Alsó sor: Összeg (Ft)<br />
                <strong>Alsó sor = Felső sor · 250 Ft/db</strong><br />
                A 250 az <strong>egységár</strong>, ami minden oszlopban azonos!
              </div>
            </div>
          </div>

          {/* Táblázatos minta */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
              Minta táblázat: Füzetvásárlás (Egységár = 250 Ft/db)
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs sm:text-sm font-mono border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="p-2.5 text-left border border-slate-200 dark:border-slate-700">Füzetek száma (db)</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">1</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">2</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">3</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">5</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 text-left font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      Fizetendő összeg (Ft)
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-indigo-600 font-bold">250</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-indigo-600 font-bold">500</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-indigo-600 font-bold">750</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-indigo-600 font-bold">1250</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-indigo-600 font-bold">2500</td>
                  </tr>
                  <tr className="text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-800/20">
                    <td className="p-2 text-left border border-slate-200 dark:border-slate-700 font-sans">
                      Hányados (Ár / db)
                    </td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">250 / 1 = 250</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">500 / 2 = 250</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">750 / 3 = 250</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">1250 / 5 = 250</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">2500 / 10 = 250</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Fontos észrevétel: Az összeg és a darabszám hányadosa minden oszlopban PONTOSAN ugyanannyi (250 Ft/db)!
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          3. SZEKCIÓ: INTERAKTÍV MENNYISÉG-KAPCSOLAT SZIMULÁTOR
      ======================================================== */}
      <TheorySection
        title="3. Interaktív Mennyiség-kapcsolat Szimulátor"
        subtitle="Állítsd be az adatokat, és figyeld meg az élő táblázat és szabály változását!"
      >
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900 shadow-md space-y-6">
          {/* Esettípus választó */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setScenario('shopping');
                setUnitRate(300);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                scenario === 'shopping'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              1. Bevásárlás (Darab és Ár)
            </button>
            <button
              onClick={() => {
                setScenario('travel');
                setUnitRate(15);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                scenario === 'travel'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Bike className="w-4 h-4" />
              2. Kerékpározás (Idő és Út)
            </button>
          </div>

          {/* Vezérlő sáv: Egységár / Sebesség beállítása */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {scenario === 'shopping' ? 'Egységár (Ft / füzet):' : 'Állandó sebesség (km / óra):'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={scenario === 'shopping' ? 50 : 5}
                  max={scenario === 'shopping' ? 1000 : 40}
                  step={scenario === 'shopping' ? 50 : 1}
                  value={unitRate}
                  onChange={(e) => setUnitRate(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-indigo-600 text-sm w-20 text-right">
                  {unitRate} {scenario === 'shopping' ? 'Ft' : 'km/h'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Kiemelt mennyiség vizsgálata:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={multiplier}
                  onChange={(e) => setMultiplier(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-purple-600 text-sm w-16 text-right">
                  {multiplier} {scenario === 'shopping' ? 'db' : 'óra'}
                </span>
              </div>
            </div>
          </div>

          {/* Élőben generált táblázat */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs sm:text-sm font-mono border-collapse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200">
                  <th className="p-2.5 text-left border border-indigo-100 dark:border-indigo-900">
                    {scenario === 'shopping' ? 'Darabszám (db)' : 'Idő (óra)'}
                  </th>
                  {[1, 2, 3, 4, 5, multiplier].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b).map((val) => (
                    <th
                      key={val}
                      className={`p-2.5 border border-indigo-100 dark:border-indigo-900 ${
                        val === multiplier ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold' : ''
                      }`}
                    >
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2.5 text-left font-bold border border-slate-200 dark:border-slate-700">
                    {scenario === 'shopping' ? 'Fizetendő (Ft)' : 'Megtett út (km)'}
                  </td>
                  {[1, 2, 3, 4, 5, multiplier].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b).map((val) => (
                    <td
                      key={val}
                      className={`p-2.5 border border-slate-200 dark:border-slate-700 font-bold ${
                        val === multiplier ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 text-base' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {val * unitRate}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Szabály felirat doboz */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-slate-400">Megfigyelt matematikai szabály:</span>
              <div className="text-emerald-300 font-bold text-sm sm:text-base">
                {scenario === 'shopping' ? `Fizetendő összeg = ${unitRate} · Darabszám` : `Megtett út = ${unitRate} · Idő`}
              </div>
            </div>
            <div className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              Állandó arányszám: <strong>{unitRate} {scenario === 'shopping' ? 'Ft/db' : 'km/h'}</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          4. SZEKCIÓ: INTERAKTÍV TÁBLÁZAT-KITÖLTŐ PRÓBA
      ======================================================== */}
      <TheorySection
        title="4. Gyakorló kihívás: Ismerd fel a szabályt és pótold a hiányzó adatokat!"
        subtitle="Egy csomagolóüzemben 1 óra alatt 250 doboz készül el."
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Töltsd ki az alábbi táblázat két üres celláját a felismert szabály alapján!
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs sm:text-sm font-mono border-collapse border border-slate-300 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-2.5 text-left border border-slate-300 dark:border-slate-700">Munkaidő (óra)</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700">1</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700">2</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700 bg-amber-50 dark:bg-amber-950/40">4</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700 bg-amber-50 dark:bg-amber-950/40">? (A)</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700">8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2.5 text-left font-bold border border-slate-300 dark:border-slate-700">Elkészült dobozok (db)</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">250</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">500</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 bg-amber-50 dark:bg-amber-950/40 font-bold">
                    <input
                      type="text"
                      placeholder="? (B)"
                      value={tableInput1}
                      onChange={(e) => {
                        setTableInput1(e.target.value);
                        setTableFeedback('idle');
                      }}
                      className="w-20 px-2 py-1 text-center font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 border border-indigo-300 rounded"
                    />
                  </td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 bg-amber-50 dark:bg-amber-950/40 font-bold">1500</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">2000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <span>Hány óra alatt készül el 1500 doboz (? A):</span>
              <input
                type="text"
                placeholder="Óra"
                value={tableInput2}
                onChange={(e) => {
                  setTableInput2(e.target.value);
                  setTableFeedback('idle');
                }}
                className="w-16 px-2 py-1 text-center font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 border border-indigo-300 rounded"
              />
            </div>

            <Button
              size="sm"
              onClick={checkTableExercise}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
            >
              Ellenőrzés
            </Button>

            {tableFeedback === 'correct' && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Pontos! 4 óra alatt 4 · 250 = 1000 db; 1500 dobozhoz pedig 1500 : 250 = 6 óra szükséges!
              </span>
            )}
            {tableFeedback === 'wrong' && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Nézd meg a szabályt: 1 óra alatt 250 doboz készül (Doboz = Óra · 250)!
              </span>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
