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
  ArrowRightLeft,
  Ruler,
  Scale,
  FlaskConical,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Maximize2,
  Layers,
  Calculator
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface UnitConversionsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

type QuantityType = 'length' | 'mass' | 'capacity' | 'time';

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  ratioToBase: number; // Hány alapegység
}

const QUANTITIES: Record<QuantityType, { name: string; baseSymbol: string; units: UnitDef[] }> = {
  length: {
    name: 'Hosszúság',
    baseSymbol: 'm',
    units: [
      { id: 'mm', name: 'milliméter', symbol: 'mm', ratioToBase: 0.001 },
      { id: 'cm', name: 'centiméter', symbol: 'cm', ratioToBase: 0.01 },
      { id: 'dm', name: 'deciméter', symbol: 'dm', ratioToBase: 0.1 },
      { id: 'm', name: 'méter', symbol: 'm', ratioToBase: 1 },
      { id: 'km', name: 'kilométer', symbol: 'km', ratioToBase: 1000 }
    ]
  },
  mass: {
    name: 'Tömeg',
    baseSymbol: 'kg',
    units: [
      { id: 'mg', name: 'milligramm', symbol: 'mg', ratioToBase: 0.000001 },
      { id: 'g', name: 'gramm', symbol: 'g', ratioToBase: 0.001 },
      { id: 'dkg', name: 'dekagramm', symbol: 'dkg', ratioToBase: 0.01 },
      { id: 'kg', name: 'kilogramm', symbol: 'kg', ratioToBase: 1 },
      { id: 'q', name: 'mázsa', symbol: 'q', ratioToBase: 100 },
      { id: 't', name: 'tonna', symbol: 't', ratioToBase: 1000 }
    ]
  },
  capacity: {
    name: 'Űrtartalom',
    baseSymbol: 'l',
    units: [
      { id: 'ml', name: 'milliliter', symbol: 'ml', ratioToBase: 0.001 },
      { id: 'cl', name: 'centiliter', symbol: 'cl', ratioToBase: 0.01 },
      { id: 'dl', name: 'deciliter', symbol: 'dl', ratioToBase: 0.1 },
      { id: 'l', name: 'liter', symbol: 'l', ratioToBase: 1 },
      { id: 'hl', name: 'hektoliter', symbol: 'hl', ratioToBase: 100 }
    ]
  },
  time: {
    name: 'Idő',
    baseSymbol: 'perc',
    units: [
      { id: 's', name: 'másodperc', symbol: 's', ratioToBase: 1 / 60 },
      { id: 'min', name: 'perc', symbol: 'min', ratioToBase: 1 },
      { id: 'h', name: 'óra', symbol: 'h', ratioToBase: 60 },
      { id: 'day', name: 'nap', symbol: 'nap', ratioToBase: 1440 },
      { id: 'week', name: 'hét', symbol: 'hét', ratioToBase: 10080 }
    ]
  }
};

export const UnitConversionsTheory: React.FC<UnitConversionsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Átváltó Laboratórium Állapota ---
  const [selectedQuantity, setSelectedQuantity] = useState<QuantityType>('length');
  const [inputValue, setInputValue] = useState<number>(3.5);
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('cm');

  // Mennyiségváltáskor az egységek igazítása
  const handleQuantityChange = (q: QuantityType) => {
    setSelectedQuantity(q);
    const units = QUANTITIES[q].units;
    setFromUnitId(units[units.length - 2]?.id || units[0].id);
    setToUnitId(units[1]?.id || units[0].id);
  };

  const currentUnits = QUANTITIES[selectedQuantity].units;
  const fromUnit = currentUnits.find((u) => u.id === fromUnitId) || currentUnits[0];
  const toUnit = currentUnits.find((u) => u.id === toUnitId) || currentUnits[1];

  // Számítás: érték * fromRatio / toRatio
  const convertedValue = (inputValue * fromUnit.ratioToBase) / toUnit.ratioToBase;
  const ratioMultiplier = fromUnit.ratioToBase / toUnit.ratioToBase;

  // Szép formázás kerekítéssel az elkerülhetetlen lebegőpontos pontatlanságok ellen
  const formatNumber = (num: number): string => {
    if (isNaN(num)) return '0';
    const rounded = Math.round(num * 1000000) / 1000000;
    return rounded.toString().replace('.', ',');
  };

  // --- Interaktív Gyakorló Ellenőrző ---
  const [practiceAnswer, setPracticeAnswer] = useState<string>('');
  const [practiceFeedback, setPracticeFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const checkPractice = (expected: string) => {
    const cleanUser = practiceAnswer.trim().replace(',', '.');
    const cleanExpected = expected.replace(',', '.');
    if (parseFloat(cleanUser) === parseFloat(cleanExpected)) {
      setPracticeFeedback('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } else {
      setPracticeFeedback('wrong');
    }
  };

  return (
    <TheoryTemplate
      title="Mértékegység-átváltások elmélete"
      subtitle="5. osztályos tananyag: hosszúság, tömeg, űrtartalom és idő átváltása, összetett mennyiségek és az átváltások aranyszabálya"
      badge="VI. Mérés, arányosság, szöveges feladatok"
      quickRule={{
        label: 'Az Átváltások Aranyszabálya',
        formula: 'Kisebb egységre váltva SZORZUNK (·), nagyobbra váltva OSZTUNK (:)'
      }}
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* ========================================================
          1. SZEKCIÓ: AZ ÁTVÁLTÁSOK ARANYSZABÁLYA
      ======================================================== */}
      <TheorySection
        title="1. Az átváltások aranyszabálya"
        subtitle="Hogyan döntsük el gyorsan és biztosan, hogy szorozni vagy osztani kell?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="Nagyobb egységből kisebb egységbe: SZORZÁS"
            color="emerald"
            badge="Aranyszabály 1."
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Amikor egy <strong>nagyobb mértékegységről</strong> váltunk át egy <strong>kisebbre</strong>, a mérőszám <strong>növekedni fog</strong>, mert a kisebb darabkákból <strong>több</strong> fér el ugyanabban a mennyiségben.
            </p>
            <FormulaBox
              formula="Mérőszám_{\text{új}} = Mérőszám_{\text{régi}} \cdot Váltószám"
              description="Nagyobból kisebbe: mindig SZORZUNK a váltószámmal!"
            />
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div>• <strong>3 m = 300 cm</strong> (mert 1 m = 100 cm, 3 · 100 = 300)</div>
              <div>• <strong>2,5 kg = 250 dkg</strong> (mert 1 kg = 100 dkg, 2,5 · 100 = 250)</div>
              <div>• <strong>4 dl = 400 ml</strong> (mert 1 dl = 100 ml, 4 · 100 = 400)</div>
              <div>• <strong>3 óra = 180 perc</strong> (mert 1 h = 60 min, 3 · 60 = 180)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Kisebb egységből nagyobb egységbe: OSZTÁS"
            color="blue"
            badge="Aranyszabály 2."
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Amikor egy <strong>kisebb mértékegységről</strong> váltunk át egy <strong>nagyobbra</strong>, a mérőszám <strong>csökkenni fog</strong>, mert a nagyobb egységekből <strong>kevesebb</strong> darab szükséges ugyanakkora mennyiség kifejezésére.
            </p>
            <FormulaBox
              formula="Mérőszám_{\text{új}} = Mérőszám_{\text{régi}} : Váltószám"
              description="Kisebből nagyobba: mindig OSZTUNK a váltószámmal!"
            />
            <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 space-y-1">
              <div>• <strong>450 cm = 4,5 m</strong> (mert 450 : 100 = 4,5)</div>
              <div>• <strong>5000 g = 5 kg</strong> (mert 5000 : 1000 = 5)</div>
              <div>• <strong>250 ml = 2,5 dl</strong> (mert 250 : 100 = 2,5)</div>
              <div>• <strong>120 másodperc = 2 perc</strong> (mert 120 : 60 = 2)</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          type="tip"
          title="A libikóka-elv (Megjegyzési trükk)"
        >
          Képzeld el a mértékegység-átváltást úgy, mint egy libikókát! A kifejezett mennyiség valójában változatlan marad.
          Ha a <strong>mértékegység kicsinyül</strong> (pl. kg helyett gramm), akkor a <strong>számnak muszáj megnőnie</strong> (szorzás).
          Ha pedig a <strong>mértékegység megnő</strong> (pl. méter helyett kilométer), a <strong>számnak le kell csökkennie</strong> (osztás).
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================
          2. SZEKCIÓ: A 4 NAGY MENNYISÉGCSALÁD ÉS VÁLTÓSZÁM-LÉTRÁK
      ======================================================== */}
      <TheorySection
        title="2. A 4 nagy mennyiségcsalád összefoglaló létrája"
        subtitle="Minden mértékegység egyetlen helyen: hosszúság, tömeg, űrtartalom és idő"
      >
        <div className="space-y-6">
          {/* Hosszúság */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                <Ruler className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">1. Hosszúság (SI alapegység: méter, m)</h4>
                <p className="text-xs text-slate-500">Tízes szorzók a millimétertől a méterig, majd 1000-es ugrás a kilométerhez.</p>
              </div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center justify-between min-w-[550px] p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 text-center font-mono text-sm">
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-emerald-300">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">mm</div>
                  <div className="text-[10px] text-slate-500">milliméter</div>
                </div>
                <div className="text-xs text-emerald-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-emerald-300">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">cm</div>
                  <div className="text-[10px] text-slate-500">centiméter</div>
                </div>
                <div className="text-xs text-emerald-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-emerald-300">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">dm</div>
                  <div className="text-[10px] text-slate-500">deciméter</div>
                </div>
                <div className="text-xs text-emerald-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-emerald-600 text-white rounded-lg shadow-sm font-bold">
                  <div>m (alap)</div>
                  <div className="text-[10px] text-emerald-100">méter</div>
                </div>
                <div className="text-xs text-emerald-600 font-bold px-1">· 1000 →<br />← : 1000</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-emerald-300">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">km</div>
                  <div className="text-[10px] text-slate-500">kilométer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tömeg */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">2. Tömeg (SI alapegység: kilogramm, kg)</h4>
                <p className="text-xs text-slate-500">Különösen figyelj a dkg és kg közötti 100-as, valamint a g és kg közötti 1000-es váltószámra!</p>
              </div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center justify-between min-w-[620px] p-4 bg-teal-50/50 dark:bg-teal-950/20 rounded-xl border border-teal-200/60 dark:border-teal-800/60 text-center font-mono text-sm">
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-teal-300">
                  <div className="font-bold text-teal-800 dark:text-teal-300">mg</div>
                  <div className="text-[10px] text-slate-500">milligramm</div>
                </div>
                <div className="text-xs text-teal-600 font-bold px-1">· 1000 →<br />← : 1000</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-teal-300">
                  <div className="font-bold text-teal-800 dark:text-teal-300">g</div>
                  <div className="text-[10px] text-slate-500">gramm</div>
                </div>
                <div className="text-xs text-teal-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-teal-300">
                  <div className="font-bold text-teal-800 dark:text-teal-300">dkg</div>
                  <div className="text-[10px] text-slate-500">dekagramm</div>
                </div>
                <div className="text-xs text-teal-600 font-bold px-1">· 100 →<br />← : 100</div>
                <div className="px-3 py-2 bg-teal-600 text-white rounded-lg shadow-sm font-bold">
                  <div>kg (alap)</div>
                  <div className="text-[10px] text-teal-100">kilogramm</div>
                </div>
                <div className="text-xs text-teal-600 font-bold px-1">· 100 →<br />← : 100</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-teal-300">
                  <div className="font-bold text-teal-800 dark:text-teal-300">q</div>
                  <div className="text-[10px] text-slate-500">mázsa</div>
                </div>
                <div className="text-xs text-teal-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-teal-300">
                  <div className="font-bold text-teal-800 dark:text-teal-300">t</div>
                  <div className="text-[10px] text-slate-500">tonna</div>
                </div>
              </div>
            </div>
          </div>

          {/* Űrtartalom */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-300">
                <FlaskConical className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">3. Űrtartalom és Térfogat (alapegység: liter, l)</h4>
                <p className="text-xs text-slate-500">A folyadékok mértéke és a köbös térfogatok közötti aranyhíd: 1 l = 1 dm³, 1 ml = 1 cm³.</p>
              </div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center justify-between min-w-[550px] p-4 bg-cyan-50/50 dark:bg-cyan-950/20 rounded-xl border border-cyan-200/60 dark:border-cyan-800/60 text-center font-mono text-sm">
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-cyan-300">
                  <div className="font-bold text-cyan-800 dark:text-cyan-300">ml (= cm³)</div>
                  <div className="text-[10px] text-slate-500">milliliter</div>
                </div>
                <div className="text-xs text-cyan-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-cyan-300">
                  <div className="font-bold text-cyan-800 dark:text-cyan-300">cl</div>
                  <div className="text-[10px] text-slate-500">centiliter</div>
                </div>
                <div className="text-xs text-cyan-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-cyan-300">
                  <div className="font-bold text-cyan-800 dark:text-cyan-300">dl</div>
                  <div className="text-[10px] text-slate-500">deciliter</div>
                </div>
                <div className="text-xs text-cyan-600 font-bold px-1">· 10 →<br />← : 10</div>
                <div className="px-3 py-2 bg-cyan-600 text-white rounded-lg shadow-sm font-bold">
                  <div>l (= dm³)</div>
                  <div className="text-[10px] text-cyan-100">liter (alap)</div>
                </div>
                <div className="text-xs text-cyan-600 font-bold px-1">· 100 →<br />← : 100</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-cyan-300">
                  <div className="font-bold text-cyan-800 dark:text-cyan-300">hl</div>
                  <div className="text-[10px] text-slate-500">hektoliter</div>
                </div>
              </div>
            </div>
          </div>

          {/* Idő */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">
                <Clock className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">4. Idő (SI alapegység: másodperc, s)</h4>
                <p className="text-xs text-slate-500">Vigyázat: nem 10-es, hanem 60-as, 24-es és 7-es váltószámok!</p>
              </div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center justify-between min-w-[550px] p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-center font-mono text-sm">
                <div className="px-3 py-2 bg-amber-600 text-white rounded-lg shadow-sm font-bold">
                  <div>s (alap)</div>
                  <div className="text-[10px] text-amber-100">másodperc</div>
                </div>
                <div className="text-xs text-amber-600 font-bold px-1">· 60 →<br />← : 60</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-amber-300">
                  <div className="font-bold text-amber-800 dark:text-amber-300">min</div>
                  <div className="text-[10px] text-slate-500">perc</div>
                </div>
                <div className="text-xs text-amber-600 font-bold px-1">· 60 →<br />← : 60</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-amber-300">
                  <div className="font-bold text-amber-800 dark:text-amber-300">h</div>
                  <div className="text-[10px] text-slate-500">óra</div>
                </div>
                <div className="text-xs text-amber-600 font-bold px-1">· 24 →<br />← : 24</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-amber-300">
                  <div className="font-bold text-amber-800 dark:text-amber-300">nap (d)</div>
                  <div className="text-[10px] text-slate-500">24 óra</div>
                </div>
                <div className="text-xs text-amber-600 font-bold px-1">· 7 →<br />← : 7</div>
                <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-amber-300">
                  <div className="font-bold text-amber-800 dark:text-amber-300">hét</div>
                  <div className="text-[10px] text-slate-500">168 óra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          3. SZEKCIÓ: INTERAKTÍV ÁTVÁLTÓ LABORATÓRIUM
      ======================================================== */}
      <TheorySection
        title="3. Interaktív Átváltó Laboratórium"
        subtitle="Próbáld ki bármely mértékegység átváltását és lásd a pontos levezetést lépésről lépésre!"
      >
        <div className="bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 p-6 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/50 shadow-md">
          {/* Mennyiségfajta választó fülek */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['length', 'mass', 'capacity', 'time'] as QuantityType[]).map((q) => {
              const active = selectedQuantity === q;
              const icons = {
                length: <Ruler className="w-4 h-4 mr-1.5" />,
                mass: <Scale className="w-4 h-4 mr-1.5" />,
                capacity: <FlaskConical className="w-4 h-4 mr-1.5" />,
                time: <Clock className="w-4 h-4 mr-1.5" />
              };
              return (
                <button
                  key={q}
                  onClick={() => handleQuantityChange(q)}
                  className={`flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {icons[q]}
                  {QUANTITIES[q].name}
                </button>
              );
            })}
          </div>

          {/* Bemenet és Egységválasztók */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Forrás érték és egység */}
            <div className="md:col-span-5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Kezdeti érték és egység:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-base font-bold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={fromUnitId}
                  onChange={(e) => setFromUnitId(e.target.value)}
                  className="px-3 py-2 bg-indigo-50 dark:bg-indigo-950/60 font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg cursor-pointer"
                >
                  {currentUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.symbol} ({u.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Gyors érték gombok */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {[0.5, 1, 2.5, 5, 10, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setInputValue(val)}
                    className="px-2 py-0.5 text-[11px] rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-mono transition-colors"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Középső váltás nyíl */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                <ArrowRight className="w-5 h-5 hidden md:block" />
                <ArrowRightLeft className="w-5 h-5 md:hidden" />
              </div>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                {ratioMultiplier >= 1 ? `· ${formatNumber(ratioMultiplier)}` : `: ${formatNumber(1 / ratioMultiplier)}`}
              </span>
            </div>

            {/* Cél érték és egység */}
            <div className="md:col-span-5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Cél mértékegység és átszámított érték:
              </label>
              <div className="flex gap-2">
                <div className="w-full px-3 py-2 text-base font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-lg text-emerald-800 dark:text-emerald-200 overflow-x-auto whitespace-nowrap">
                  {formatNumber(convertedValue)}
                </div>
                <select
                  value={toUnitId}
                  onChange={(e) => setToUnitId(e.target.value)}
                  className="px-3 py-2 bg-emerald-50 dark:bg-emerald-950/60 font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg cursor-pointer"
                >
                  {currentUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.symbol} ({u.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Megfordítás gomb */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    const temp = fromUnitId;
                    setFromUnitId(toUnitId);
                    setToUnitId(temp);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Megfordítás
                </button>
              </div>
            </div>
          </div>

          {/* Lépésről lépésre levezető sáv */}
          <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-1.5 border border-slate-800">
            <div className="text-slate-400 text-xs">Matematikai levezetés:</div>
            <div className="text-emerald-300 font-bold text-sm sm:text-base">
              {formatNumber(inputValue)} {fromUnit.symbol} = {formatNumber(convertedValue)} {toUnit.symbol}
            </div>
            <div className="text-slate-300 text-xs">
              Mivel 1 {fromUnit.symbol} = {formatNumber(ratioMultiplier)} {toUnit.symbol}, ezért a művelet:{' '}
              {ratioMultiplier >= 1
                ? `${formatNumber(inputValue)} · ${formatNumber(ratioMultiplier)} = ${formatNumber(convertedValue)}`
                : `${formatNumber(inputValue)} : ${formatNumber(1 / ratioMultiplier)} = ${formatNumber(convertedValue)}`}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          4. SZEKCIÓ: ÖSSZETETT (VEGYES) MENNYISÉGEK KEZELÉSE
      ======================================================== */}
      <TheorySection
        title="4. Összetett mennyiségek felbontása és összevonása"
        subtitle="Hogyan számolunk olyan mennyiségekkel, mint a 3 kg 45 dkg vagy a 2 óra 15 perc?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExampleBox
            title="1. Példa: Felbontás kisebb egységre"
            problem="Írjuk fel a 4 méter 35 centimétert csak centiméterben!"
            solution="1) A 4 métert átváltjuk cm-re: 4 · 100 = 400 cm.
2) Hozzáadjuk a megmaradt 35 cm-t: 400 cm + 35 cm = 435 cm.
Tehát: 4 m 35 cm = 435 cm (vagy tizedestörtként: 4,35 m)."
          />

          <ExampleBox
            title="2. Példa: Összevonás nagyobb egységre"
            problem="Hány óra és hány perc 145 perc?"
            solution="1) Megnézzük, hányszor van meg benne a 60 perc (1 óra): 145 : 60 = 2.
2) Kiszámoljuk a felhasznált perceket: 2 · 60 = 120 perc.
3) A maradék perc: 145 - 120 = 25 perc.
Tehát: 145 perc = 2 óra 25 perc."
          />
        </div>

        <TheoryTrapBox
          title="Gyakori Csapda: A hiányzó nullák esete!"
          trap="4 kg 7 dkg = 47 dkg? NEM, ez súlyos hiba!"
          explanation="Mivel 1 kg = 100 dkg (és nem 10 dkg!), ezért a 4 kg = 400 dkg.
Ehhez adva a 7 dkg-ot: 400 + 7 = 407 dkg, tizedestörtben pedig 4,07 kg!
Ugyanez igaz a méter-centiméter párosra is: 3 m 5 cm = 305 cm = 3,05 m (nem 3,5 m, mert az 350 cm lenne)!"
        />
      </TheorySection>

      {/* ========================================================
          5. SZEKCIÓ: TÖRT RÉSZEK GYORS MEMÓRIA-TÁBLÁZATA
      ======================================================== */}
      <TheorySection
        title="5. Tört részek (fél, negyed, háromnegyed) az átváltásokban"
        subtitle="Ezeket az értékeket fejből kell tudnod a gyors feladatmegoldáshoz!"
      >
        <TheoryTable
          headers={['Tört kifejezés', 'Hosszúság (m → cm)', 'Tömeg (kg → dkg / g)', 'Űrtartalom (l → dl / ml)', 'Idő (h → min)'] }
          rows={[
            ['Fél (1/2)', '0,5 m = 50 cm', '0,5 kg = 50 dkg = 500 g', '0,5 l = 5 dl = 500 ml', '0,5 h = 30 perc'],
            ['Negyed (1/4)', '0,25 m = 25 cm', '0,25 kg = 25 dkg = 250 g', '0,25 l = 2,5 dl = 250 ml', '0,25 h = 15 perc'],
            ['Háromnegyed (3/4)', '0,75 m = 75 cm', '0,75 kg = 75 dkg = 750 g', '0,75 l = 7,5 dl = 750 ml', '0,75 h = 45 perc'],
            ['Másfél (1 1/2)', '1,5 m = 150 cm', '1,5 kg = 150 dkg = 1500 g', '1,5 l = 15 dl = 1500 ml', '1,5 h = 90 perc']
          ]}
        />

        <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-teal-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800">
          <h4 className="font-bold text-teal-900 dark:text-teal-200 text-sm mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            Gyakorló villámkérdés:
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3">
            Hány gramm a <strong>3/4 kilogramm</strong> és a <strong>15 dekagramm</strong> összege?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Pl: 900"
              value={practiceAnswer}
              onChange={(e) => {
                setPracticeAnswer(e.target.value);
                setPracticeFeedback('idle');
              }}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span className="text-xs text-slate-500">gramm (g)</span>
            <Button
              size="sm"
              onClick={() => checkPractice('900')}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs"
            >
              Ellenőrzés
            </Button>
            {practiceFeedback === 'correct' && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Helyes! 3/4 kg = 750 g, 15 dkg = 150 g → 750 + 150 = 900 g.
              </span>
            )}
            {practiceFeedback === 'wrong' && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Nem pontos! Válts mindent grammra: 3/4 kg = 750 g, 15 dkg = 150 g.
              </span>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
