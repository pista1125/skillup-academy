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
  Scale,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Truck,
  Apple,
  ShoppingBag,
  Weight,
  Feather
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface MassMeasurementTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const MassMeasurementTheory: React.FC<MassMeasurementTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Kétkarú Mérleg Szimulátor Állapot ---
  interface ScaleItem {
    id: string;
    name: string;
    massG: number;
    icon: string;
    hint: string;
  }

  const sampleItems: ScaleItem[] = [
    { id: 'feather', name: 'Madártoll', massG: 5, icon: '🪶', hint: 'Nagyon könnyű: 5 g' },
    { id: 'chocolate', name: 'Tábla csoki', massG: 100, icon: '🍫', hint: '100 g = 10 dkg' },
    { id: 'apple', name: 'Alma', massG: 150, icon: '🍎', hint: '150 g = 15 dkg' },
    { id: 'phone', name: 'Okostelefon', massG: 200, icon: '📱', hint: '200 g = 20 dkg' },
    { id: 'book', name: 'Matematika tankönyv', massG: 450, icon: '📚', hint: '450 g = 45 dkg' },
    { id: 'flour', name: '1 csomag liszt', massG: 1000, icon: '🌾', hint: '1000 g = 100 dkg = 1 kg' }
  ];

  const availableWeights = [
    { label: '+5 g', value: 5, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { label: '+10 g', value: 10, color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
    { label: '+50 g', value: 50, color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { label: '+100 g (10 dkg)', value: 100, color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { label: '+200 g (20 dkg)', value: 200, color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { label: '+500 g (50 dkg)', value: 500, color: 'bg-teal-100 text-teal-800 border-teal-300' }
  ];

  const [selectedItem, setSelectedItem] = useState<ScaleItem>(sampleItems[2]); // Alma (150 g)
  const [rightWeights, setRightWeights] = useState<number[]>([]);

  const totalRightMass = rightWeights.reduce((sum, w) => sum + w, 0);
  const diff = totalRightMass - selectedItem.massG;
  const isBalanced = diff === 0;

  const tiltAngle = Math.max(-14, Math.min(14, diff * 0.15));

  const addWeight = (value: number) => {
    const updated = [...rightWeights, value];
    setRightWeights(updated);
    if (updated.reduce((s, w) => s + w, 0) === selectedItem.massG) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
  };

  const resetWeights = () => {
    setRightWeights([]);
  };

  // --- 2. Interaktív Mértékegység-váltó Állapot ---
  type Unit = 'mg' | 'g' | 'dkg' | 'kg' | 'q' | 't';
  const unitToGrams: Record<Unit, number> = {
    mg: 0.001,
    g: 1,
    dkg: 10,
    kg: 1000,
    q: 100000,
    t: 1000000
  };

  const unitNames: Record<Unit, string> = {
    mg: 'milligramm (mg)',
    g: 'gramm (g)',
    dkg: 'dekagramm (dkg)',
    kg: 'kilogramm (kg)',
    q: 'mázsa (q)',
    t: 'tonna (t)'
  };

  const [convertValue, setConvertValue] = useState<number>(2.5);
  const [fromUnit, setFromUnit] = useState<Unit>('kg');
  const [toUnit, setToUnit] = useState<Unit>('dkg');

  const calculatedValue = (convertValue * unitToGrams[fromUnit]) / unitToGrams[toUnit];

  // --- 3. Interaktív Nettó - Tára - Bruttó Kalkulátor ---
  const [tareKg, setTareKg] = useState<number>(2); // 2 kg-os rekesz
  const [netKg, setNetKg] = useState<number>(18); // 18 kg alma
  const grossKg = tareKg + netKg;

  // --- 4. Interaktív Becslési Minijáték Állapot ---
  interface EstimateQuestion {
    id: number;
    target: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }

  const estimateQuestions: EstimateQuestion[] = [
    {
      id: 1,
      target: 'Egy gombostű vagy egy papírlap tömege:',
      options: ['10 mg', '5 dkg', '200 g', '1 kg'],
      correctIndex: 0,
      explanation: 'A nagyon apró, pehelykönnyű tárgyak tömege néhány milligramm (mg) vagy gramm törtrésze.'
    },
    {
      id: 2,
      target: 'Egy átlagos 5. osztályos tanuló testtömege:',
      options: ['4 kg', '38 kg', '150 kg', '0,5 t'],
      correctIndex: 1,
      explanation: 'Egy 10-11 éves diák átlagos testtömege kb. 35–45 kg.'
    },
    {
      id: 3,
      target: 'Egy átlagos családi személygépkocsi tömege:',
      options: ['130 kg', '13 mázsa (1,3 t)', '13 t', '13 000 kg'],
      correctIndex: 1,
      explanation: 'Egy személyautó körülbelül 1,2–1,5 tonna (12–15 mázsa, azaz 1200–1500 kg).'
    },
    {
      id: 4,
      target: 'Egy csésze forró tea (nettó folyadéktömeg):',
      options: ['2 mg', '25 g', '25 dkg (250 g)', '2,5 kg'],
      correctIndex: 2,
      explanation: '2,5 dl víz vagy tea tömege pontosan 25 dkg, azaz 250 gramm.'
    }
  ];

  const [estimateAnswers, setEstimateAnswers] = useState<Record<number, number>>({});

  const handleEstimateSelect = (qId: number, optIdx: number) => {
    setEstimateAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <TheoryTemplate
      title="A tömeg mérése és mértékegységei"
      subtitle="A testek tömege, a kilogramm és társai, mérőeszközök, átváltások és a nettó-bruttó-tára számítások"
      themeColor="teal"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR"
      topicNumber="VI.1"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      practiceTitle="Készen állsz a tömegmérés próbájára?"
      practiceSubtitle="Gyakorold az átváltásokat, mérlegelést és a nettó-bruttó feladatokat 30 izgalmas kérdéssel!"
      practiceButtonText="Tömegmérés kvíz indítása"
      quickRule={{
        label: 'A Tömegmértékek Aranyszabálya',
        formula: '1 t = 1000 kg | 1 q = 100 kg | 1 kg = 100 dkg = 1000 g'
      }}
    >
      {/* 1. SZEKCIÓ: MI A TÖMEG ÉS HOGYAN MÉRJÜK? */}
      <TheorySection
        id="tomeg-fogalma"
        number={1}
        title="Mi a tömeg és hogyan mérjük?"
        icon={<Scale className="w-5 h-5" />}
        badge="ALAPFOGALOM"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A testek tömege"
            badge="FIZIKAI MENNYISÉG"
            color="teal"
            icon={<Weight className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Minden anyagi testnek van <strong>tömege</strong>. A hétköznapokban gyakran „súlyként” emlegetjük, de a matematikában és a természettudományban pontosan megkülönböztetjük: a <em>tömeg</em> a testet alkotó anyag mennyiségét és tehetetlenségét jellemzi.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-1">
              <div>• <strong>Állandó:</strong> Egy 1 kg-os cukor a Holdon vagy az űrben is 1 kg tömegű marad!</div>
              <div>• <strong>Alapmértékegység:</strong> A metrikus mértékrendszerben a tömeg alapegysége a <strong>kilogramm (kg)</strong>.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mérőeszközök a gyakorlatban"
            badge="ESZKÖZTÁR"
            color="cyan"
            icon={<Scale className="w-5 h-5 text-cyan-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A tömeg mérésére különféle mérlegeket használunk a mérendő test nagyságrendjétől és a kívánt pontosságtól függően:
            </p>
            <div className="mt-2.5 space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>⚖️ Kétkarú mérleg:</strong> Ismert tömegű mérősúlyokkal hasonlítja össze a mérendő testet (az ókortól a mai napig használatos elv).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>⚡ Digitális konyhai/bolti mérleg:</strong> Érzékelők segítségével tized- vagy századgramm pontossággal jelzi ki a tömeget.
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>🚛 Hídmérleg:</strong> Teherautók, vagonok, gabonaszállítmányok tonnás mérésére szolgáló beépített mérőfelület.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV KÉTKARÚ MÉRLEG SZIMULÁTOR */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-teal-50/70 to-cyan-50/50 dark:from-slate-800/80 dark:to-teal-950/40 border-2 border-teal-200/80 dark:border-teal-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-500 text-white font-bold text-xs">INTERAKTÍV</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  Kétkarú mérleg laboratórium
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Válassz ki egy tárgyat a bal serpenyőbe, majd pakolj szabványos súlyokat a jobb serpenyőbe, amíg egyensúlyba nem kerül!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetWeights}
              className="text-xs text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Súlyok levétele
            </Button>
          </div>

          {/* Tárgyválasztó fülek */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sampleItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setRightWeights([]);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedItem.id === item.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mérleg SVG Megjelenítés */}
          <div className="relative w-full max-w-lg mx-auto py-4">
            <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-sm select-none">
              {/* Állvány és alapzat */}
              <path d="M 170 230 L 230 230 L 210 200 L 190 200 Z" fill="#64748b" />
              <rect x="195" y="60" width="10" height="145" rx="3" fill="#94a3b8" />
              <circle cx="200" cy="65" r="7" fill="#475569" />

              {/* Billenő kar a tiltAngle szögben elforgatva */}
              <g transform={`rotate(${tiltAngle}, 200, 65)`}>
                {/* Vízszintes gerenda */}
                <rect x="50" y="61" width="300" height="8" rx="4" fill="#0f766e" />
                <circle cx="200" cy="65" r="4" fill="#ffffff" />

                {/* Bal függesztő pont és lánc */}
                <circle cx="70" cy="65" r="4" fill="#0d9488" />
                <line x1="70" y1="65" x2="45" y2="130" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="70" y1="65" x2="95" y2="130" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
                {/* Bal serpenyő */}
                <path d="M 40 130 C 40 155, 100 155, 100 130 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
                {/* Bal tárgy */}
                <text x="70" y="125" textAnchor="middle" fontSize="30">{selectedItem.icon}</text>
                <text x="70" y="168" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">
                  {selectedItem.name}
                </text>

                {/* Jobb függesztő pont és lánc */}
                <circle cx="330" cy="65" r="4" fill="#0d9488" />
                <line x1="330" y1="65" x2="305" y2="130" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="330" y1="65" x2="355" y2="130" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
                {/* Jobb serpenyő */}
                <path d="M 300 130 C 300 155, 360 155, 360 130 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
                {/* Jobb súlyok felirat / ikon */}
                <text x="330" y="125" textAnchor="middle" fontSize="24">
                  {rightWeights.length > 0 ? '⚖️' : '⚪'}
                </text>
                <text x="330" y="168" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">
                  {totalRightMass} g
                </text>

                {/* Mutató a középpontban */}
                <line x1="200" y1="65" x2="200" y2="105" stroke="#ef4444" strokeWidth="2" />
              </g>

              {/* Közép skála ív */}
              <path d="M 180 110 A 20 20 0 0 1 220 110" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="200" y1="108" x2="200" y2="114" stroke="#0f766e" strokeWidth="2" />
            </svg>
          </div>

          {/* Státusz üzenet */}
          <div className="mt-2 text-center">
            {isBalanced ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm font-bold animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Tökéletes egyensúly! A(z) {selectedItem.name} tömege pontosan {selectedItem.massG} g (
                {selectedItem.massG >= 10 ? `${selectedItem.massG / 10} dkg` : `${selectedItem.massG} g`}).
              </div>
            ) : diff < 0 ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                A jobb serpenyő még túl könnyű! Hiányzik még {Math.abs(diff)} g.
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                A jobb serpenyő túl nehéz! Túltöltötted {diff} g-mal.
              </div>
            )}
          </div>

          {/* Súly-adagoló gombok */}
          <div className="mt-4 pt-4 border-t border-teal-200 dark:border-teal-800">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Tegyél súlyokat a jobb serpenyőbe:
            </div>
            <div className="flex flex-wrap gap-2">
              {availableWeights.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => addWeight(w.value)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-transform active:scale-95 shadow-sm hover:brightness-95 ${w.color}`}
                >
                  {w.label}
                </button>
              ))}
            </div>
            {rightWeights.length > 0 && (
              <div className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                Feltett súlyok: {rightWeights.join(' g + ')} g = <strong>{totalRightMass} g</strong>
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A METRIKUS MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK */}
      <TheorySection
        id="mertekegysegek-valtoszamok"
        number={2}
        title="Mértékegységek és váltószámok létrája"
        icon={<Layers className="w-5 h-5" />}
        badge="VÁLTÓSZÁMOK"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A tömeg mértékegységeit úgy alakították ki, hogy a nagyon apró porszemektől a hatalmas teherhajókig mindent kényelmesen le tudjunk írni. Jegyezd meg jól a mértékegységek láncolatát és a köztük lévő váltószámokat!
        </p>

        {/* Mértékegység-létra Vizuális Kártya */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-700 shadow-sm mb-6">
          <div className="text-center font-black text-sm text-teal-800 dark:text-teal-300 mb-4">
            A TÖMEG MÉRTÉKEGYSÉGEINEK ÁTVÁLTÁSI LÁNCA
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-center">
            {/* mg */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">milligramm</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">mg</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 g = 1000 mg</div>
            </div>

            {/* g */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">gramm</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">g</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 dkg = 10 g</div>
            </div>

            {/* dkg */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">dekagramm</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">dkg</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 kg = 100 dkg</div>
            </div>

            {/* kg */}
            <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-950/80 border-2 border-teal-500 text-teal-950 dark:text-teal-100 shadow-sm">
              <div className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-300">ALAPEGYSÉG</div>
              <div className="text-xl font-black text-teal-900 dark:text-white">kg</div>
              <div className="text-[10px] font-bold text-teal-700 dark:text-teal-300 mt-1">kilogramm</div>
            </div>

            {/* q */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">mázsa</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">q</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 q = 100 kg</div>
            </div>

            {/* t */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">tonna</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">t</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 t = 10 q = 1000 kg</div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex flex-col sm:flex-row items-center justify-around gap-2 text-center">
            <div>
              <strong>➡️ Nagyobbról kisebbre váltáskor:</strong> <span className="text-teal-700 dark:text-teal-300 font-black">SZORZUNK</span> a váltószámmal (pl. 3 kg = 3 · 100 = 300 dkg).
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div>
              <strong>⬅️ Kisebbről nagyobbra váltáskor:</strong> <span className="text-teal-700 dark:text-teal-300 font-black">OSZTUNK</span> a váltószámmal (pl. 400 dkg = 400 : 100 = 4 kg).
            </div>
          </div>
        </div>

        {/* INTERAKTÍV MÉRTÉKEGYSÉG-VÁLTÓ */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800/90 dark:to-teal-950/50 border border-teal-200 dark:border-teal-800 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 rounded-md bg-teal-500 text-white font-bold text-xs">SZÁMOLÓGÉP</span>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Interaktív Tömegváltó Varázsló
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Bemeneti érték és egység */}
            <div className="sm:col-span-5 flex gap-2">
              <input
                type="number"
                value={convertValue}
                onChange={(e) => setConvertValue(parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-center text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as Unit)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {(Object.keys(unitNames) as Unit[]).map((u) => (
                  <option key={u} value={u}>
                    {unitNames[u]}
                  </option>
                ))}
              </select>
            </div>

            {/* Nyíl */}
            <div className="sm:col-span-2 flex justify-center text-teal-600 dark:text-teal-400">
              <ArrowRight className="w-5 h-5 hidden sm:block" />
              <span className="sm:hidden font-bold text-xs">átváltva erre:</span>
            </div>

            {/* Cél egység */}
            <div className="sm:col-span-5 flex gap-2 items-center">
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as Unit)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {(Object.keys(unitNames) as Unit[]).map((u) => (
                  <option key={u} value={u}>
                    {unitNames[u]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Eredmény kártya */}
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Számítás: <strong>{convertValue} {fromUnit}</strong> =
            </div>
            <div className="text-xl sm:text-2xl font-black text-teal-700 dark:text-teal-300">
              {calculatedValue.toLocaleString('hu-HU', { maximumFractionDigits: 6 })} {toUnit}
            </div>
          </div>
        </div>

        {/* Gyakori törtrészek a konyhában és a boltban */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox
            title="Gyakori tört tömegek a mindennapokban"
            formula="\text{Fél kg} = 50\text{ dkg} = 500\text{ g}"
            description="A boltban és a konyhában nagyon gyakran találkozunk a kilogramm törtrészeivel:"
          >
            <div className="mt-2 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div>• <strong>Negyed kg:</strong> 1/4 kg = 25 dkg = 250 g</div>
              <div>• <strong>Háromnegyed kg:</strong> 3/4 kg = 75 dkg = 750 g</div>
              <div>• <strong>Másfél kg:</strong> 1,5 kg = 1 kg 50 dkg = 150 dkg = 1500 g</div>
              <div>• <strong>Fél tonna:</strong> 5 q = 500 kg</div>
            </div>
          </FormulaBox>

          <ExampleBox
            title="Példa: Többlépéses átváltás"
            problem="Váltsuk át a 3 kg 45 dkg tömeget grammba!"
            solution="1. Először a 3 kg-ot váltjuk dkg-ba: 3 · 100 = 300 dkg.
2. Hozzáadjuk a 45 dkg-ot: 300 + 45 = 345 dkg.
3. Végül a dkg-ot grammba váltjuk (szorzás 10-zel): 345 · 10 = 3450 g.
Eredmény: 3 kg 45 dkg = 3450 g."
          />
        </div>

        {/* Gyakori hibacsapdák box */}
        <div className="mt-4">
          <TheoryTrapBox
            title="Vigyázat! A dekagramm és a kilogramm váltószáma 100!"
            trap="A legtöbb mértékegységnél (hosszúság, űrtartalom) megszokhattuk a 10-es váltószámot (1 dm = 10 cm). A dekagramm (dkg) és kilogramm (kg) között azonban 100 a váltószám!"
            correct="1 kg = 100 dkg (és nem 10 dkg!). Csak a dekagramm és a gramm között 10 a váltószám: 1 dkg = 10 g."
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÖMEGBECSLÉSEK A HÉTKÖZNAPOKBAN */}
      <TheorySection
        id="tomegbecslesek"
        number={3}
        title="Tömegbecslések a hétköznapokban"
        icon={<ShoppingBag className="w-5 h-5" />}
        badge="GYAKORLATI ÉLET"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A való életben nem mindig van nálunk mérleg. Fontos, hogy legyen egy megbízható belső viszonyítási alapod (referenciád), amellyel azonnal meg tudod becsülni egy tárgy vagy állat valószínű tömegét!
        </p>

        {/* Referencia kártyák rácsa */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🪙</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">100 Ft-os érme</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 8 g</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🍫</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Tábla csokoládé</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">100 g = 10 dkg</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🥛</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">1 liter tej / víz</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">pontosan 1 kg</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🎒</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Teli iskolatáska</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 4–6 kg</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🌾</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Zsák gabona</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">50 kg = fél q</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🚲</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Kerékpár</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 12–15 kg</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🚗</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Személygépkocsi</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 1,2–1,5 t</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🐘</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Afrikai elefánt</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 5–6 t (50–60 q)</div>
          </div>
        </div>

        {/* INTERAKTÍV BECSLÉSI KVÍZ-BLOKK */}
        <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Gyorspróba: Találd el a reális tömeget!
            </h4>
          </div>

          <div className="space-y-4">
            {estimateQuestions.map((q) => {
              const selectedOpt = estimateAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {q.id}. {q.target}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-500 text-white font-bold border-emerald-600';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-rose-500 text-white font-bold border-rose-600';
                        } else {
                          btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleEstimateSelect(q.id, optIdx)}
                          className={`p-2 rounded-lg border text-xs font-semibold transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <div className={`mt-2 text-xs font-medium ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {isCorrect ? '✓ Helyes!' : '✗ Nem pontos.'} {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: NETTÓ, TÁRA, BRUTTÓ FOGALMA ÉS SZÁMÍTÁSA */}
      <TheorySection
        id="netto-brutto-tara"
        number={4}
        title="Nettó, Tára és Bruttó a kereskedelemben"
        icon={<Package className="w-5 h-5" />}
        badge="KERESKEDELEM ÉS CSOMAGOLÁS"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Amikor lekvárt, almásrekeszt vagy tartálykocsis tejet vásárolunk, az áru mindig valamilyen csomagolásban van. A kereskedelemben három kulcsfogalmat használunk a tömegek pontos elszámolására:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TheoryCard
            title="Tára (T)"
            badge="CSOMAGOLÁS"
            color="amber"
            icon={<Package className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az <strong>üres csomagolóeszköz</strong> tömege (üres láda, befőttesüveg, kartondoboz, raklap, üres tartály).
            </p>
            <div className="mt-2 text-xs font-bold text-amber-700 dark:text-amber-400">
              Példa: Az üres fa rekesz 2 kg.
            </div>
          </TheoryCard>

          <TheoryCard
            title="Nettó tömeg (N)"
            badge="TISZTA ÁRU"
            color="emerald"
            icon={<Apple className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>tiszta áru</strong> tömege csomagolás nélkül. Ez az, amiért valójában fizetünk a boltban!
            </p>
            <div className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              Példa: A rekeszben lévő 18 kg alma.
            </div>
          </TheoryCard>

          <TheoryCard
            title="Bruttó tömeg (B)"
            badge="ÖSSZES TÖMEG"
            color="teal"
            icon={<Truck className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az áru és a csomagolás <strong>együttes, teljes tömege</strong>. Ezt méri a mérleg, ha rátesszük a teli rekeszt.
            </p>
            <div className="mt-2 text-xs font-bold text-teal-700 dark:text-teal-400">
              Példa: A teli rekesz mérlegen: 20 kg.
            </div>
          </TheoryCard>
        </div>

        {/* Alapképletek */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-700 text-center">
            <div className="text-xs font-bold text-teal-800 dark:text-teal-300">BRUTTÓ SZÁMÍTÁSA</div>
            <div className="text-base font-black text-teal-900 dark:text-white mt-1">Bruttó = Nettó + Tára</div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">NETTÓ SZÁMÍTÁSA</div>
            <div className="text-base font-black text-emerald-900 dark:text-white mt-1">Nettó = Bruttó − Tára</div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-center">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300">TÁRA SZÁMÍTÁSA</div>
            <div className="text-base font-black text-amber-900 dark:text-white mt-1">Tára = Bruttó − Nettó</div>
          </div>
        </div>

        {/* INTERAKTÍV NETTÓ-TÁRA-BRUTTÓ SZIMULÁTOR */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-700 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 rounded-lg bg-teal-500 text-white font-bold text-xs">SZIMULÁTOR</span>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Interaktív Alma-rekesz kalkulátor
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Csúszkák */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>📦 Tára (üres láda tömege):</span>
                  <span className="text-amber-600 dark:text-amber-400">{tareKg} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={tareKg}
                  onChange={(e) => setTareKg(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>🍎 Nettó (tiszta alma tömege):</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{netKg} kg</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={netKg}
                  onChange={(e) => setNetKg(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>• Tára aránya: <strong>{((tareKg / grossKg) * 100).toFixed(1)}%</strong></div>
                <div>• Nettó áru aránya: <strong>{((netKg / grossKg) * 100).toFixed(1)}%</strong></div>
              </div>
            </div>

            {/* Vizuális diagram */}
            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-center">
              <div className="text-xs font-bold text-teal-800 dark:text-teal-300 mb-2">MÉRLEG KIJELZŐ</div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {grossKg.toFixed(1)} kg
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">BRUTTÓ TÖMEG</div>

              <div className="mt-4 pt-4 border-t border-teal-200 dark:border-teal-800 flex justify-around text-xs">
                <div>
                  <div className="text-amber-600 dark:text-amber-400 font-bold">{tareKg} kg</div>
                  <div className="text-[10px] text-slate-500">Tára</div>
                </div>
                <div className="text-slate-400 font-bold">+</div>
                <div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">{netKg} kg</div>
                  <div className="text-[10px] text-slate-500">Nettó</div>
                </div>
                <div className="text-slate-400 font-bold">=</div>
                <div>
                  <div className="text-teal-700 dark:text-teal-300 font-black">{grossKg} kg</div>
                  <div className="text-[10px] text-slate-500">Bruttó</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ExampleBox
          title="Szöveges feladat: Dinnyeszállítmány"
          problem="A zöldségeshez érkezett kisteherautó bruttó tömege a rakománnyal együtt 3,4 tonna. A teherautó saját (tára) tömege 1800 kg. Hány mázsa dinnye (nettó áru) van a járművön?"
          solution="1. Hozzuk közös mértékegységre a megadott adatokat:
- Bruttó tömeg: 3,4 t = 3400 kg.
- Tára tömeg: 1800 kg.
2. Számítsuk ki a nettó tömeget:
Nettó = Bruttó − Tára = 3400 kg − 1800 kg = 1600 kg.
3. Váltsuk át az eredményt a kérdezett mázsára (q):
1600 kg = 16 q (mivel 1 q = 100 kg).
Válasz: A teherautón pontosan 16 mázsa dinnye van."
        />
      </TheorySection>

      {/* 5. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        id="osszefoglalo-tablazat"
        number={5}
        title="Összefoglaló mértékegység-táblázat"
        icon={<TableIcon />}
        badge="ÁTTEKINTÉS"
        badgeColor="teal"
      >
        <TheoryTable
          title="A tömeg mértékegységeinek összefoglaló táblázata"
          headers={['Mértékegység', 'Jele', 'Váltószám az alapegységhez', 'Gyakorlati példa']}
          rows={[
            ['milligramm', 'mg', '1 mg = 0,001 g = 0,000001 kg', 'Gyógyszerek hatóanyaga, gombostű feje'],
            ['gramm', 'g', '1000 g = 1 kg', 'Pénzérme (8 g), fűszerek, postai levél (20 g)'],
            ['dekagramm', 'dkg', '100 dkg = 1 kg (1 dkg = 10 g)', 'Vágott felvágott (15 dkg), sajt, csoki (10 dkg)'],
            ['kilogramm (alapegység)', 'kg', '1 kg = 100 dkg = 1000 g', '1 liter víz vagy tej, csomag liszt vagy cukor'],
            ['mázsa', 'q', '1 q = 100 kg = 10 000 dkg', 'Zsák burgonya (fél q = 50 kg), felnőtt vaddisznó'],
            ['tonna', 't', '1 t = 10 q = 1000 kg', 'Személyautó (1,3 t), teherautó rakománya, elefánt (5 t)']
          ]}
        />

        <TheoryCallout
          type="tip"
          title="Aranyszabály a szöveges feladatokhoz"
          text="Mielőtt bármilyen műveletet (összeadást, kivonást, osztást) végeznél a feladatban szereplő tömegekkel, mindig váltsd át őket ugyanarra a közös mértékegységre (leggyakrabban kg-ra vagy g-ra)! Különböző mértékegységű számokat soha nem szabad közvetlenül összeadni."
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

// Segédikon az 5. szekcióhoz
const TableIcon = () => (
  <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);
