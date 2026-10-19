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
  FlaskConical,
  Droplets,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Scale,
  Box,
  Coffee,
  GlassWater,
  Waves
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CapacityMeasurementTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const CapacityMeasurementTheory: React.FC<CapacityMeasurementTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Mérőhenger / Kancsó Szimulátor Állapot ---
  interface VesselItem {
    id: string;
    name: string;
    volumeMl: number;
    icon: string;
    hint: string;
  }

  const sampleVessels: VesselItem[] = [
    { id: 'teaspoon', name: 'Teáskanál', volumeMl: 5, icon: '🥄', hint: '5 ml = 0,5 cl' },
    { id: 'espresso', name: 'Kávéscsésze', volumeMl: 100, icon: '☕', hint: '100 ml = 1 dl' },
    { id: 'glass', name: 'Vizespohár', volumeMl: 250, icon: '🥛', hint: '250 ml = 2,5 dl = negyed liter' },
    { id: 'bottle', name: 'Kulacs / palack', volumeMl: 500, icon: '🍶', hint: '500 ml = 5 dl = fél liter' },
    { id: 'carton', name: 'Tejesdoboz', volumeMl: 1000, icon: '🧃', hint: '1000 ml = 10 dl = 1 liter' },
    { id: 'pitcher', name: 'Üvegkancsó', volumeMl: 1500, icon: '🏺', hint: '1500 ml = 15 dl = 1,5 liter' }
  ];

  const [currentMl, setCurrentMl] = useState<number>(500); // 500 ml = 5 dl = 0.5 l

  const maxCylinderMl = 2000;
  const fillPercent = Math.min(100, Math.max(0, (currentMl / maxCylinderMl) * 100));

  const addFluid = (amount: number) => {
    setCurrentMl((prev) => {
      const next = Math.max(0, Math.min(maxCylinderMl, prev + amount));
      if (next === 1000 || next === 2000) {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const selectVessel = (v: VesselItem) => {
    setCurrentMl(v.volumeMl);
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.6 } });
  };

  // --- 2. Interaktív Űrmérték-váltó Állapot ---
  type CapacityUnit = 'ml' | 'cl' | 'dl' | 'l' | 'hl';

  const unitToMl: Record<CapacityUnit, number> = {
    ml: 1,
    cl: 10,
    dl: 100,
    l: 1000,
    hl: 100000
  };

  const unitNames: Record<CapacityUnit, string> = {
    ml: 'milliliter (ml)',
    cl: 'centiliter (cl)',
    dl: 'deciliter (dl)',
    l: 'liter (l)',
    hl: 'hektoliter (hl)'
  };

  const [convertValue, setConvertValue] = useState<number>(3.5);
  const [fromUnit, setFromUnit] = useState<CapacityUnit>('l');
  const [toUnit, setToUnit] = useState<CapacityUnit>('dl');

  const calculatedValue = (convertValue * unitToMl[fromUnit]) / unitToMl[toUnit];

  // --- 3. Interaktív Becslési Gyorspróba Állapot ---
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
      target: 'Egy átlagos leveses tányér vagy vizespohár űrtartalma:',
      options: ['2,5 dl (250 ml)', '2,5 l', '25 ml', '25 l'],
      correctIndex: 0,
      explanation: 'Egy pohár vagy egy tányér leves általában 2–3 dl (200–300 ml).'
    },
    {
      id: 2,
      target: 'Egy szokásos felmosóvödör űrtartalma:',
      options: ['1 dl', '1 liter', '10–12 liter', '1 hektoliter (100 l)'],
      correctIndex: 2,
      explanation: 'Egy háztartási vödörbe kb. 10–12 liter víz fér. 1 hektoliter túl nehéz lenne felemelni!'
    },
    {
      id: 3,
      target: 'Egy teli kerti úszómedence térfogata:',
      options: ['15 liter', '150 liter', '150 hektoliter (15 000 l)', '15 dl'],
      correctIndex: 2,
      explanation: 'Egy kerti medencébe több ezer vagy tízezer liter (több száz hektoliter vagy m³) víz szükséges.'
    },
    {
      id: 4,
      target: 'Egy szemcsepp vagy orrspray egyszeri adagja:',
      options: ['1–2 csepp (kb. 0,05 ml)', '5 dl', '2 liter', '1 hektoliter'],
      correctIndex: 0,
      explanation: 'Egyetlen csepp folyadék térfogata kb. 0,05 ml (huszadrésze egy milliliternek).'
    }
  ];

  const [estimateAnswers, setEstimateAnswers] = useState<Record<number, number>>({});

  const handleEstimateSelect = (qId: number, optIdx: number) => {
    setEstimateAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <TheoryTemplate
      title="Az űrtartalom mérése és mértékegységei"
      subtitle="A liter és társai, mérőedények, átváltások és az űrtartalom kapcsolata a térfogattal és tömeggel"
      themeColor="teal"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR"
      topicNumber="VI.2"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      practiceTitle="Készen állsz az űrmértékek próbájára?"
      practiceSubtitle="Töltsd fel a tudásodat és oldd meg a 30 izgalmas feladatot a liter, deciliter és hektoliter témakörében!"
      practiceButtonText="Űrtartalom kvíz indítása"
      quickRule={{
        label: 'Az Űrmértékek Aranyszabálya',
        formula: '1 hl = 100 l | 1 l = 10 dl = 1000 ml = 1 dm³'
      }}
    >
      {/* 1. SZEKCIÓ: MI AZ ŰRTARTALOM ÉS HOGYAN MÉRJÜK? */}
      <TheorySection
        id="urtartalom-fogalma"
        number={1}
        title="Mi az űrtartalom és hogyan mérjük?"
        icon={<FlaskConical className="w-5 h-5" />}
        badge="ALAPFOGALOM"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Az űrtartalom fogalma"
            badge="BELSŐ TÉRFOGAT"
            color="teal"
            icon={<Droplets className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az <strong>űrtartalom</strong> (más néven edénykapacitás) azt adja meg, hogy egy üreges test (üveg, fazék, hordó, medence) <strong>mennyi folyadékot vagy ömlesztett anyagot képes magába fogadni</strong>.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-1">
              <div>• <strong>Belső térfogat:</strong> Nem az edény külső mérete számít, hanem a benne lévő szabad űr.</div>
              <div>• <strong>Alapmértékegység:</strong> Az űrtartalom alapegysége a <strong>liter (l)</strong>.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mérőeszközök a konyhában és laborban"
            badge="ESZKÖZTÁR"
            color="cyan"
            icon={<FlaskConical className="w-5 h-5 text-cyan-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A folyadékok mérésére kalibrált, beosztással ellátott edényeket használunk:
            </p>
            <div className="mt-2.5 space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>🥛 Beosztásos mérőkancsó:</strong> A háztartásban deciliter és milliliter skálával a receptekhez.
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>🧪 Mérőhenger és pipetta:</strong> Laboratóriumokban ml és mikroliter pontosságú mérésre.
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>🛢️ Vízóra és átfolyásmérő:</strong> A lakásba belépő víz mérésére köbméterben ($m^3$) és literben.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV MÉRŐHENGER SZIMULÁTOR */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-teal-50/70 to-cyan-50/50 dark:from-slate-800/80 dark:to-teal-950/40 border-2 border-teal-200/80 dark:border-teal-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-500 text-white font-bold text-xs">INTERAKTÍV</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  Laboratóriumi mérőhenger és kancsó
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Tölts vizet a mérőedénybe gombokkal vagy válassz egy mindennapi edényt az azonnali átszámításhoz!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMl(0)}
              className="text-xs text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Kiürítés
            </Button>
          </div>

          {/* Gyorsválasztó edények */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sampleVessels.map((v) => (
              <button
                key={v.id}
                onClick={() => selectVessel(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentMl === v.volumeMl
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700'
                }`}
              >
                <span>{v.icon}</span>
                <span>{v.name} ({v.volumeMl >= 1000 ? `${v.volumeMl / 1000} l` : `${v.volumeMl / 100} dl`})</span>
              </button>
            ))}
          </div>

          {/* Mérőhenger és Kijelző Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Mérőhenger */}
            <div className="md:col-span-5 flex justify-center py-2">
              <svg viewBox="0 0 160 280" className="w-36 sm:w-44 h-auto drop-shadow-md select-none">
                {/* Henger alapzat */}
                <ellipse cx="80" cy="265" rx="45" ry="10" fill="#94a3b8" />
                <rect x="70" y="245" width="20" height="20" fill="#64748b" />

                {/* Henger üvegtest */}
                <rect x="45" y="30" width="70" height="220" rx="8" fill="#f8fafc" stroke="#0d9488" strokeWidth="2.5" fillOpacity="0.3" />

                {/* Folyadékszint a hengerben */}
                <clipPath id="cylinderClip">
                  <rect x="46" y="31" width="68" height="218" rx="7" />
                </clipPath>
                <g clipPath="url(#cylinderClip)">
                  {/* Folyadéktest */}
                  <rect
                    x="46"
                    y={250 - (fillPercent * 2.15)}
                    width="68"
                    height={fillPercent * 2.15}
                    fill="url(#waterGradient)"
                    className="transition-all duration-300"
                  />
                  {/* Folyadék felszíni meniszkusz */}
                  {currentMl > 0 && (
                    <ellipse
                      cx="80"
                      cy={250 - (fillPercent * 2.15)}
                      rx="34"
                      ry="5"
                      fill="#38bdf8"
                      fillOpacity="0.8"
                    />
                  )}
                </g>

                {/* Skálabeosztások (0, 500, 1000, 1500, 2000 ml) */}
                {[
                  { ml: 2000, y: 35, label: '2 l' },
                  { ml: 1500, y: 89, label: '1,5 l' },
                  { ml: 1000, y: 142, label: '1 l (10 dl)' },
                  { ml: 500, y: 196, label: '0,5 l (5 dl)' },
                  { ml: 0, y: 250, label: '0' }
                ].map((mark, idx) => (
                  <g key={idx}>
                    <line x1="105" y1={mark.y} x2="115" y2={mark.y} stroke="#0f766e" strokeWidth="2" />
                    <text x="120" y={mark.y + 4} fontSize="8" fontWeight="bold" fill="#0f766e">
                      {mark.label}
                    </text>
                  </g>
                ))}

                {/* Kisebb osztások */}
                {[62, 115, 169, 223].map((y, idx) => (
                  <line key={idx} x1="108" y1={y} x2="115" y2={y} stroke="#14b8a6" strokeWidth="1" strokeDasharray="1 1" />
                ))}

                <defs>
                  <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Értékjelző kártyák és egységek */}
            <div className="md:col-span-7 space-y-3">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 shadow-sm text-center">
                <div className="text-xs font-bold text-teal-800 dark:text-teal-300">AKTUÁLIS FOLYADÉKMENNYISÉG</div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mt-1">
                  {(currentMl / 1000).toLocaleString('hu-HU', { maximumFractionDigits: 3 })} liter
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  ({(currentMl / 100).toLocaleString('hu-HU')} dl • {currentMl} ml)
                </div>
              </div>

              {/* Egyenértékű mértékek rácsa */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500">Deciliter (dl)</div>
                  <div className="text-sm font-bold text-teal-800 dark:text-teal-200 mt-0.5">
                    {currentMl / 100} dl
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500">Centiliter (cl)</div>
                  <div className="text-sm font-bold text-teal-800 dark:text-teal-200 mt-0.5">
                    {currentMl / 10} cl
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500">Milliliter (ml)</div>
                  <div className="text-sm font-bold text-teal-800 dark:text-teal-200 mt-0.5">
                    {currentMl} ml
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500">Térfogat (dm³)</div>
                  <div className="text-sm font-bold text-teal-800 dark:text-teal-200 mt-0.5">
                    {currentMl / 1000} dm³
                  </div>
                </div>
              </div>

              {/* Folyadékadagoló gombok */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Adj hozzá vagy vegyél el vizet:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => addFluid(50)}
                    className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-cyan-50 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border-cyan-200 hover:bg-cyan-100"
                  >
                    +50 ml (0,5 dl)
                  </button>
                  <button
                    onClick={() => addFluid(100)}
                    className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-cyan-50 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border-cyan-200 hover:bg-cyan-100"
                  >
                    +1 dl (100 ml)
                  </button>
                  <button
                    onClick={() => addFluid(250)}
                    className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-teal-50 dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-200 hover:bg-teal-100"
                  >
                    +2,5 dl (negyed l)
                  </button>
                  <button
                    onClick={() => addFluid(500)}
                    className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-teal-50 dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-200 hover:bg-teal-100"
                  >
                    +5 dl (fél l)
                  </button>
                  <button
                    onClick={() => addFluid(-100)}
                    disabled={currentMl <= 0}
                    className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-300 border-rose-200 hover:bg-rose-100 disabled:opacity-40"
                  >
                    −1 dl
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK LÉTRÁJA */}
      <TheorySection
        id="urtartalom-valtoszamok"
        number={2}
        title="Mértékegységek és váltószámok létrája"
        icon={<Layers className="w-5 h-5" />}
        badge="VÁLTÓSZÁMOK"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Az űrmértékeknél a kisebb egységek (ml, cl, dl, l) között kényelmes, <strong>10-es váltószámok</strong> vannak, míg a liter és a hektoliter között <strong>100 a váltószám</strong>!
        </p>

        {/* Váltási Lánc Kártya */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-700 shadow-sm mb-6">
          <div className="text-center font-black text-sm text-teal-800 dark:text-teal-300 mb-4">
            AZ ŰRMÉRTÉKEK ÁTVÁLTÁSI LÁNCA
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {/* ml */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">milliliter</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">ml</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 cl = 10 ml</div>
            </div>

            {/* cl */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">centiliter</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">cl</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 dl = 10 cl</div>
            </div>

            {/* dl */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">deciliter</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">dl</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 l = 10 dl</div>
            </div>

            {/* l */}
            <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-950/80 border-2 border-teal-500 text-teal-950 dark:text-teal-100 shadow-sm">
              <div className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-300">ALAPEGYSÉG</div>
              <div className="text-xl font-black text-teal-900 dark:text-white">l</div>
              <div className="text-[10px] font-bold text-teal-700 dark:text-teal-300 mt-1">liter</div>
            </div>

            {/* hl */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 font-bold">hektoliter</div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">hl</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">1 hl = 100 l</div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex flex-col sm:flex-row items-center justify-around gap-2 text-center">
            <div>
              <strong>➡️ Nagyobbról kisebbre:</strong> <span className="text-teal-700 dark:text-teal-300 font-black">SZORZUNK</span> (pl. 3 l = 3 · 10 = 30 dl).
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div>
              <strong>⬅️ Kisebbről nagyobbra:</strong> <span className="text-teal-700 dark:text-teal-300 font-black">OSZTUNK</span> (pl. 500 cl = 500 : 100 = 5 l).
            </div>
          </div>
        </div>

        {/* INTERAKTÍV ŰRMÉRTÉK-VÁLTÓ KALKULÁTOR */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800/90 dark:to-teal-950/50 border border-teal-200 dark:border-teal-800 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 rounded-md bg-teal-500 text-white font-bold text-xs">SZÁMOLÓGÉP</span>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Interaktív Űrtartalom Váltó
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
                onChange={(e) => setFromUnit(e.target.value as CapacityUnit)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {(Object.keys(unitNames) as CapacityUnit[]).map((u) => (
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
                onChange={(e) => setToUnit(e.target.value as CapacityUnit)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {(Object.keys(unitNames) as CapacityUnit[]).map((u) => (
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

        {/* Gyakori törtrészek a konyhában */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox
            title="Gyakori tört űrtartalmak a konyhában"
            formula="\text{Fél liter} = 5\text{ dl} = 50\text{ cl} = 500\text{ ml}"
            description="Receptekben és üdítős palackokon a leggyakrabban ezekkel találkozunk:"
          >
            <div className="mt-2 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div>• <strong>Negyed liter:</strong> 1/4 l = 2,5 dl = 25 cl = 250 ml (egy bögre)</div>
              <div>• <strong>Háromnegyed liter:</strong> 3/4 l = 7,5 dl = 75 cl = 750 ml (egy borosüveg)</div>
              <div>• <strong>Másfél liter:</strong> 1,5 l = 15 dl = 1500 ml (ásványvizes palack)</div>
              <div>• <strong>Fél hektoliter:</strong> 50 liter (egy kerti vizeshordó)</div>
            </div>
          </FormulaBox>

          <ExampleBox
            title="Példa: Többlépéses űrmérték-váltás"
            problem="Egy teáskanna űrtartalma 1 liter 8 deciliter. Hány darab 2 deciliteres csésze teát tudunk teletölteni belőle?"
            solution="1. Váltsuk át a kancsó tartalmát deciliterbe:
1 l = 10 dl, hozzáadva a 8 dl-t: 10 + 8 = 18 dl.
2. Osszuk el a csésze űrtartalmával (2 dl):
18 dl : 2 dl = 9 darab csésze.
Válasz: Pontosan 9 tele csészét tudunk megtölteni a kancsóból."
          />
        </div>

        {/* Csapda box */}
        <div className="mt-4">
          <TheoryTrapBox
            title="Vigyázat! A hektoliter váltószáma 100!"
            trap="A deciliter, centiliter és milliliter között 10 a váltószám, ezért sokan tévesen azt hiszik, hogy a hektoliter és a liter között is csak 10 a szorzó."
            correct="1 hl = 100 liter (a „hekto-” előtag százat jelent!). Tehát fél hl = 50 liter, 10 hl = 1000 liter = 1 m³."
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A TÉRFOGAT, ŰRTARTALOM ÉS TÖMEG ARANYHÁROMSZÖGE */}
      <TheorySection
        id="aranyharomszog"
        number={3}
        title="A térfogat, űrtartalom és tömeg kapcsolata"
        icon={<Box className="w-5 h-5" />}
        badge="KULCSÖSSZEFÜGGÉS"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A metrikus mértékrendszer egyik legzseniálisabb alkotása, hogy a hosszúság, a térfogat, az űrtartalom és a tömeg szorosan össze van kapcsolva a tiszta víz révén:
        </p>

        {/* Aranyháromszög Kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-700 text-center">
            <span className="text-3xl">🧊</span>
            <div className="text-xs font-bold text-slate-500 mt-2">KOCKA TÉRFOGATA</div>
            <div className="text-xl font-black text-teal-800 dark:text-teal-300 mt-0.5">1 dm³</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Egy 10 cm (1 dm) élhosszúságú üres kocka.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-100 dark:bg-teal-950/70 border-2 border-teal-500 text-center shadow-sm">
            <span className="text-3xl">🥛</span>
            <div className="text-xs font-black text-teal-800 dark:text-teal-300 mt-2">BELEFÉRŐ VÍZ (ŰRTARTALOM)</div>
            <div className="text-2xl font-black text-teal-900 dark:text-white mt-0.5">1 liter</div>
            <p className="text-[11px] text-teal-900 dark:text-teal-200 mt-1 font-semibold">
              Pontosan 1 liter víz tölti meg a kockát színültig!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-700 text-center">
            <span className="text-3xl">⚖️</span>
            <div className="text-xs font-bold text-slate-500 mt-2">A VÍZ TÖMEGE</div>
            <div className="text-xl font-black text-teal-800 dark:text-teal-300 mt-0.5">1 kg</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              1 liter tiszta víz tömege pontosan 1 kilogramm (100 dkg).
            </p>
          </div>
        </div>

        {/* Kisebb és nagyobb egységek megfelelése */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="font-bold text-teal-800 dark:text-teal-300 text-sm">Kis mennyiségeknél:</div>
            <div>• <strong>1 cm³ = 1 ml</strong> (Egy 1 cm-es kockacukor méretű térbe 1 ml víz fér).</div>
            <div>• <strong>1 ml tiszta víz tömege = 1 gramm (1 g)</strong>.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="font-bold text-teal-800 dark:text-teal-300 text-sm">Nagy mennyiségeknél:</div>
            <div>• <strong>1 m³ = 1000 liter = 10 hl</strong> (Egy 1 méteres kockába 1000 liter víz fér).</div>
            <div>• <strong>1 m³ víz tömege = 1000 kg = 1 tonna (1 t)</strong>.</div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: BECSLÉSEK ÉS GYORSPRÓBA */}
      <TheorySection
        id="urtartalom-becslesek"
        number={4}
        title="Űrtartalom-becslések a hétköznapokban"
        icon={<GlassWater className="w-5 h-5" />}
        badge="GYAKORLATI ÉLET"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Jegyezd meg ezeket a tipikus hétköznapi méreteket, hogy a boltban, konyhában vagy feladatmegoldáskor azonnal el tudd dönteni a nagyságrendeket:
        </p>

        {/* Referencia kártyák */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🥄</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Teáskanál</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 5 ml</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">☕</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Kávéscsésze</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">kb. 1 dl (100 ml)</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🥤</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Dobozos üdítő</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">330 ml (33 cl)</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🥛</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Bögre / pohár</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">2,5 dl (250 ml)</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🍶</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Ásványvizes palack</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">1,5 l (15 dl)</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🪣</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Felmosóvödör</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">10–12 liter</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🛁</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Fürdőkád</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">150–200 l (1,5–2 hl)</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl">🛢️</span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Kerti esővízhordó</div>
            <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">200 l (2 hl)</div>
          </div>
        </div>

        {/* Gyorspróba Kvíz Blokk */}
        <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Gyorspróba: Találd el a reális űrtartalmat!
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

      {/* 5. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        id="urtartalom-tablazat"
        number={5}
        title="Összefoglaló mértékegység-táblázat"
        icon={<TableIcon />}
        badge="ÁTTEKINTÉS"
        badgeColor="teal"
      >
        <TheoryTable
          title="Az űrtartalom mértékegységeinek rendszere"
          headers={['Mértékegység', 'Jele', 'Váltószám a literhez', 'Térfogati megfelelője', 'Gyakorlati példa']}
          rows={[
            ['milliliter', 'ml', '1 ml = 0,001 l', '1 cm³', 'Injekciós fecskendő, kanál szirup (5 ml)'],
            ['centiliter', 'cl', '1 cl = 0,01 l = 10 ml', '10 cm³', 'Kávétejszín, étolaj a receptben (2 cl)'],
            ['deciliter', 'dl', '1 dl = 0,1 l = 100 ml', '100 cm³', 'Kávéscsésze (1 dl), bögre tea (2,5 dl)'],
            ['liter (alapegység)', 'l', '1 l = 10 dl = 1000 ml', '1 dm³', '1 doboz tej, 1 kg tiszta víz'],
            ['hektoliter', 'hl', '1 hl = 100 l', '100 dm³ = 0,1 m³', 'Boroshordó, kerti esővízgyűjtő (2 hl)']
          ]}
        />

        <TheoryCallout
          type="tip"
          title="Gyakorlati tanács szöveges feladatokhoz"
          text="Ha egy feladatban több különböző űrmérték szerepel (pl. 2 literes kancsóból 2,5 dl-es poharakat töltünk meg), mindig válts át mindent a legkisebb közös egységre (itt deciliterre: 2 l = 20 dl), és utána végezd el az osztást (20 : 2,5 = 8 db pohár)!"
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

const TableIcon = () => (
  <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);
