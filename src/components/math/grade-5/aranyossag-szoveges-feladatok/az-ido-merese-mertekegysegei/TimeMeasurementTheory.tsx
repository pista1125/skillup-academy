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
  Clock,
  Timer,
  Calendar,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Sun,
  Moon,
  Compass,
  Hourglass
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface TimeMeasurementTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const TimeMeasurementTheory: React.FC<TimeMeasurementTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Analóg és Digitális Óra Állapot ---
  const [hours, setHours] = useState<number>(14); // 14 óra = 2 óra délután
  const [minutes, setMinutes] = useState<number>(35); // 35 perc

  // Mutatók szögeinek kiszámítása
  // Percmutató: 360 fok / 60 perc = 6 fok percenként
  const minuteAngle = minutes * 6;
  // Óramutató: 360 fok / 12 óra = 30 fok óránként + 0.5 fok percenként
  const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

  const addTime = (mins: number) => {
    let totalMinutes = hours * 60 + minutes + mins;
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);

    const newH = Math.floor(totalMinutes / 60);
    const newM = totalMinutes % 60;

    setHours(newH);
    setMinutes(newM);

    if (newM === 0) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  const getHungarianTimeText = (h: number, m: number): string => {
    const nextH = (h + 1) % 24;
    const nextH12 = nextH % 12 === 0 ? 12 : nextH % 12;
    const currentH12 = h % 12 === 0 ? 12 : h % 12;

    if (m === 0) return `${h} óra egész`;
    if (m === 15) return `negyed ${nextH12}`;
    if (m === 30) return `fél ${nextH12}`;
    if (m === 45) return `háromnegyed ${nextH12}`;
    if (m < 30) return `${m} perccel múlt ${currentH12} óra`;
    return `${60 - m} perc múlva ${nextH12} óra`;
  };

  // --- 2. Interaktív Időtartam Kalkulátor Állapot ---
  const [startHour, setStartHour] = useState<number>(16);
  const [startMin, setStartMin] = useState<number>(45);
  const [endHour, setEndHour] = useState<number>(18);
  const [endMin, setEndMin] = useState<number>(20);

  const startTotalMinutes = startHour * 60 + startMin;
  const endTotalMinutes = endHour * 60 + endMin;
  let durationMinutes = endTotalMinutes - startTotalMinutes;
  if (durationMinutes < 0) durationMinutes += 24 * 60; // másnapba nyúló

  const durationH = Math.floor(durationMinutes / 60);
  const durationM = durationMinutes % 60;

  // --- 3. Interaktív Gyorspróba Állapot ---
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
      target: 'Hány másodpercből áll egy tanítási óra (45 perc)?',
      options: ['2700 másodperc', '450 másodperc', '270 másodperc', '3600 másodperc'],
      correctIndex: 0,
      explanation: '45 perc · 60 másodperc = 2700 másodperc.'
    },
    {
      id: 2,
      target: 'Melyik hónapban van szökőévben 29 nap?',
      options: ['Január', 'Február', 'Április', 'Július'],
      correctIndex: 1,
      explanation: 'A február alapévekben 28 napos, szökőévben (minden 4. évben) pedig 29 napos.'
    },
    {
      id: 3,
      target: 'Hány perc van egy negyed napban (6 óra)?',
      options: ['360 perc', '60 perc', '120 perc', '600 perc'],
      correctIndex: 0,
      explanation: '6 óra · 60 perc = 360 perc (24 óra : 4 = 6 óra).'
    },
    {
      id: 4,
      target: 'Mit jelent a digitális órán a 19:45?',
      options: ['Este háromnegyed 8', 'Este negyed 8', 'Este fél 8', 'Reggel 7:45'],
      correctIndex: 0,
      explanation: '19:45 = 15 perccel a 20:00 (este 8 óra) előtt, azaz este háromnegyed 8.'
    }
  ];

  const [estimateAnswers, setEstimateAnswers] = useState<Record<number, number>>({});

  const handleEstimateSelect = (qId: number, optIdx: number) => {
    setEstimateAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <TheoryTemplate
      title="Az idő mérése és mértékegységei"
      subtitle="Órák, percek, másodpercek, naptári egységek, időtartam-számítás és óraleolvasás"
      themeColor="teal"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR"
      topicNumber="VI.3"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      practiceTitle="Készen állsz az időpróbára?"
      practiceSubtitle="Gyakorold az időpontok és időtartamok számolását 30 izgalmas kvízfeladattal!"
      practiceButtonText="Időmérés kvíz indítása"
      quickRule={{
        label: 'Az Időmértékek Aranyszabálya',
        formula: '1 nap = 24 óra | 1 h = 60 min = 3600 s'
      }}
    >
      {/* 1. SZEKCIÓ: MI AZ IDŐ ÉS MIÉRT KÜLÖNLEGESEK A VÁLTÓSZÁMAI? */}
      <TheorySection
        id="ido-fogalma"
        number={1}
        title="Mi az idő és hogyan mérjük?"
        icon={<Clock className="w-5 h-5" />}
        badge="CSILLAGÁSZATI ALAPOK"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Csillagászati ritmusok"
            badge="TERMÉSZETI ÓRA"
            color="teal"
            icon={<Sun className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Míg a hosszúságot, tömeget és űrtartalmat tízes alapú mértékrendszerben mérjük, az <strong>idő mérése a Nap és a Föld mozgásán alapul</strong>, ezért a váltószámai nem tízesek:
            </p>
            <div className="mt-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-1">
              <div>• <strong>1 nap (24 óra):</strong> A Föld 1 teljes fordulata a saját tengelye körül.</div>
              <div>• <strong>1 év (365 nap):</strong> A Föld 1 teljes keringése a Nap körül.</div>
              <div>• <strong>1 hónap:</strong> A Hold megközelítőleg egy keringési ciklusa a Föld körül.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A 60-as és 24-es váltószámok eredete"
            badge="TÖRTÉNELEM"
            color="cyan"
            icon={<Compass className="w-5 h-5 text-cyan-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az ókori babiloniak a <strong>60-as számrendszert</strong> használták, mert a 60 rendkívül sok számmal osztható (2, 3, 4, 5, 6, 10, 12, 15, 20, 30).
            </p>
            <div className="mt-2.5 space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 óra = 60 perc</strong> (fél óra: 30 perc, negyed óra: 15 perc).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 perc = 60 másodperc</strong> (1 óra = 60 · 60 = 3600 másodperc).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 nap = 24 óra</strong> (12 óra nappal és 12 óra éjszaka).
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV ANALÓG ÉS DIGITÁLIS ÓRA SZIMULÁTOR */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-teal-50/70 to-cyan-50/50 dark:from-slate-800/80 dark:to-teal-950/40 border-2 border-teal-200/80 dark:border-teal-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-500 text-white font-bold text-xs">INTERAKTÍV</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  Analóg és digitális óralabor
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Állítsd az időt a gombokkal, figyeld meg az analóg mutatók mozgását és a magyar köznapi leolvasást!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setHours(12);
                setMinutes(0);
              }}
              className="text-xs text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Délre állítás (12:00)
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Analóg Számlap */}
            <div className="md:col-span-5 flex justify-center py-2">
              <svg viewBox="0 0 200 200" className="w-44 sm:w-52 h-auto drop-shadow-md select-none">
                {/* Külső perem */}
                <circle cx="100" cy="100" r="94" fill="#ffffff" stroke="#0d9488" strokeWidth="6" />
                <circle cx="100" cy="100" r="88" fill="#f8fafc" stroke="#ccfbf1" strokeWidth="2" />

                {/* 12 óra jelölései és számai */}
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
                  const angle = (num * 30 - 90) * (Math.PI / 180);
                  const x = 100 + 70 * Math.cos(angle);
                  const y = 100 + 70 * Math.sin(angle) + 4;
                  return (
                    <text
                      key={num}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      fontSize={num % 3 === 0 ? "13" : "10"}
                      fontWeight={num % 3 === 0 ? "900" : "bold"}
                      fill={num % 3 === 0 ? "#0f766e" : "#475569"}
                    >
                      {num}
                    </text>
                  );
                })}

                {/* Percosztások (60 pötty) */}
                {Array.from({ length: 60 }).map((_, i) => {
                  if (i % 5 === 0) return null;
                  const angle = (i * 6 - 90) * (Math.PI / 180);
                  const x = 100 + 82 * Math.cos(angle);
                  const y = 100 + 82 * Math.sin(angle);
                  return <circle key={i} cx={x} cy={y} r="1" fill="#94a3b8" />;
                })}

                {/* Óramutató (rövidebb, vastagabb, teal) */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + 48 * Math.cos((hourAngle - 90) * (Math.PI / 180))}
                  y2={100 + 48 * Math.sin((hourAngle - 90) * (Math.PI / 180))}
                  stroke="#0f766e"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Percmutató (hosszabb, vékonyabb, cyan) */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + 68 * Math.cos((minuteAngle - 90) * (Math.PI / 180))}
                  y2={100 + 68 * Math.sin((minuteAngle - 90) * (Math.PI / 180))}
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Középkör */}
                <circle cx="100" cy="100" r="5" fill="#0f766e" />
                <circle cx="100" cy="100" r="2" fill="#ffffff" />
              </svg>
            </div>

            {/* Digitális és szöveges kijelző */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 shadow-sm text-center">
                <div className="text-xs font-bold text-teal-800 dark:text-teal-300">DIGITÁLIS KIJELZŐ (24 ÓRÁS ÉS 12 ÓRÁS)</div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                  {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                </div>
                <div className="text-xs font-bold text-teal-700 dark:text-teal-400 mt-1 uppercase">
                  {getHungarianTimeText(hours, minutes)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  ({hours >= 12 ? 'Délután / Este' : 'Délelőtt / Éjszaka'})
                </div>
              </div>

              {/* Időállító gyorsgombok */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Idő előre / hátra léptetése:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => addTime(5)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-teal-50 dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-200 hover:bg-teal-100"
                  >
                    +5 perc
                  </button>
                  <button
                    onClick={() => addTime(15)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-teal-50 dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-200 hover:bg-teal-100"
                  >
                    +15 perc (negyed óra)
                  </button>
                  <button
                    onClick={() => addTime(30)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-teal-50 dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-200 hover:bg-teal-100"
                  >
                    +30 perc (fél óra)
                  </button>
                  <button
                    onClick={() => addTime(60)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-cyan-50 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border-cyan-200 hover:bg-cyan-100"
                  >
                    +1 óra
                  </button>
                  <button
                    onClick={() => addTime(-15)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-300 border-rose-200 hover:bg-rose-100"
                  >
                    −15 perc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK */}
      <TheorySection
        id="ido-valtoszamok"
        number={2}
        title="Mértékegységek és váltószámok"
        icon={<Timer className="w-5 h-5" />}
        badge="ÁTVÁLTÁSOK"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Az idő mértékegységeinek átváltásakor nagyon ügyelj a váltószámokra: a másodperc, perc és óra között <strong>60</strong>, a nap és az óra között <strong>24</strong>, a hét és a nap között <strong>7</strong> a váltószám!
        </p>

        {/* Váltási Kártya */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-center">
            <div className="text-xs text-slate-500 font-bold">1 perc</div>
            <div className="text-lg font-black text-teal-800 dark:text-teal-300 mt-1">60 másodperc</div>
            <div className="text-[10px] text-slate-400 mt-0.5">1 min = 60 s</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-center">
            <div className="text-xs text-slate-500 font-bold">1 óra</div>
            <div className="text-lg font-black text-teal-800 dark:text-teal-300 mt-1">60 perc</div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5 font-bold">3600 másodperc</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-center">
            <div className="text-xs text-slate-500 font-bold">1 nap</div>
            <div className="text-lg font-black text-teal-800 dark:text-teal-300 mt-1">24 óra</div>
            <div className="text-[10px] text-slate-400 mt-0.5">1 d = 24 h = 1440 perc</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-center">
            <div className="text-xs text-slate-500 font-bold">1 hét</div>
            <div className="text-lg font-black text-teal-800 dark:text-teal-300 mt-1">7 nap</div>
            <div className="text-[10px] text-slate-400 mt-0.5">168 óra</div>
          </div>
        </div>

        {/* Tört órák */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox
            title="Gyakori tört órák a mindennapokban"
            formula="\text{Fél óra} = 30\text{ perc}"
            description="A 60-as váltószám miatt az óra törtrészei nem tizedek, hanem így alakulnak:"
          >
            <div className="mt-2 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div>• <strong>Negyed óra:</strong> 60 : 4 = 15 perc</div>
              <div>• <strong>Fél óra:</strong> 60 : 2 = 30 perc</div>
              <div>• <strong>Háromnegyed óra:</strong> 3 · 15 = 45 perc (egy tanítási óra!)</div>
              <div>• <strong>Másfél óra:</strong> 1 óra 30 perc = 90 perc (egy mozifilm vagy focimeccs)</div>
              <div>• <strong>Két és fél óra:</strong> 2 óra 30 perc = 150 perc</div>
            </div>
          </FormulaBox>

          <ExampleBox
            title="Példa: Többlépéses időátszámítás"
            problem="Hány perc és másodperc összesen 215 másodperc?"
            solution="1. Keressük meg, hányszor van meg a 60 a 215-ben:
215 : 60 = 3 (mert 3 · 60 = 180 másodperc = 3 perc).
2. Számítsuk ki a maradék másodperceket:
215 − 180 = 35 másodperc.
Eredmény: 215 másodperc = 3 perc 35 másodperc."
          />
        </div>

        {/* Csapda box */}
        <div className="mt-4">
          <TheoryTrapBox
            title="Vigyázat! 1,5 óra NEM 1 óra 50 perc!"
            trap="Gyakori hiba, hogy az 1,5 órát 1 óra 50 percnek gondolják a tizedes tört miatt."
            correct="1,5 óra = 1 egész óra + fél óra = 1 óra 30 perc = 90 perc! (Ugyanígy a 0,5 óra = 30 perc, nem pedig 50 perc)."
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: IDŐPONT ÉS IDŐTARTAM SZÁMÍTÁSA */}
      <TheorySection
        id="idotartam-szamitas"
        number={3}
        title="Időpont és időtartam: Menetrendek és Utazások"
        icon={<Hourglass className="w-5 h-5" />}
        badge="SZÁMÍTÁSI STRATÉGIA"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Fontos megkülönböztetni az <strong>időpontot</strong> (mikor történik: pl. 14:30) és az <strong>időtartamot</strong> (mennyi ideig tart: pl. 45 perc).
        </p>

        {/* Képletek */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-700 text-center">
            <div className="text-xs font-bold text-teal-800 dark:text-teal-300">IDŐTARTAM</div>
            <div className="text-sm font-black text-teal-900 dark:text-white mt-1">Időtartam = Érkezés − Indulás</div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">ÉRKEZÉSI IDŐPONT</div>
            <div className="text-sm font-black text-emerald-900 dark:text-white mt-1">Érkezés = Indulás + Időtartam</div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-center">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300">INDULÁSI IDŐPONT</div>
            <div className="text-sm font-black text-amber-900 dark:text-white mt-1">Indulás = Érkezés − Időtartam</div>
          </div>
        </div>

        {/* INTERAKTÍV IDŐTARTAM KALKULÁTOR */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-700 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 rounded-lg bg-teal-500 text-white font-bold text-xs">KALKULÁTOR</span>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Menetrendi Időtartam Kalkulátor
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Beállítások */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  🚆 Indulási időpont:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={startHour}
                    onChange={(e) => setStartHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                    className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-center font-bold text-sm"
                  />
                  <span className="self-center font-bold">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={startMin}
                    onChange={(e) => setStartMin(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-center font-bold text-sm"
                  />
                  <span className="self-center text-xs text-slate-500 font-semibold">(óra : perc)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  🏁 Érkezési időpont:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={endHour}
                    onChange={(e) => setEndHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                    className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-center font-bold text-sm"
                  />
                  <span className="self-center font-bold">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={endMin}
                    onChange={(e) => setEndMin(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-center font-bold text-sm"
                  />
                  <span className="self-center text-xs text-slate-500 font-semibold">(óra : perc)</span>
                </div>
              </div>
            </div>

            {/* Eredmény kártya */}
            <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center">
              <div className="text-xs font-bold text-teal-800 dark:text-teal-300">ELTELT IDŐTARTAM</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {durationH} óra {durationM} perc
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                (Összesen {durationMinutes} perc)
              </div>

              {/* Lépésről lépésre segédlet */}
              <div className="mt-3 pt-3 border-t border-teal-200 dark:border-teal-800 text-left text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>• Indulás: <strong>{String(startHour).padStart(2, '0')}:{String(startMin).padStart(2, '0')}</strong></div>
                <div>• Érkezés: <strong>{String(endHour).padStart(2, '0')}:{String(endMin).padStart(2, '0')}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <ExampleBox
          title="Szöveges feladat: A vonatút hossza"
          problem="A sebesvonat 16:45-kor indul Budapestről és 18:20-kor érkezik meg Debrecenbe. Hány percig tartott a vonatút?"
          solution="Alkalmazzuk a kerek órára bontás módszerét:
1. lépés: 16:45-től a következő egész óráig (17:00-ig): 15 perc.
2. lépés: 17:00-tól az érkezési 18:20-ig: 1 óra 20 perc = 80 perc.
3. lépés: Adjuk össze a két szakaszt:
15 perc + 80 perc = 95 perc (azaz 1 óra 35 perc).
Válasz: A vonatút pontosan 95 percig (1 óra 35 percig) tartott."
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: NAPTÁRI EGYSÉGEK ÉS BÜTYÖKSZABÁLY */}
      <TheorySection
        id="naptar-egysegek"
        number={4}
        title="Naptár, hónapok és a bütyökszabály"
        icon={<Calendar className="w-5 h-5" />}
        badge="NAPTÁR"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A hosszabb időszakokat naptári egységekben tartjuk számon. Egy évben 12 hónap van, amelyek nem egyforma hosszúak:
        </p>

        {/* Hónapok és bütyökszabály */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="A híres kézfej- / bütyökszabály"
            badge="MEMÓRIATIPP"
            color="teal"
            icon={<Sparkles className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Szorítsd ökölbe a kezed! A bütykök a <strong>31 napos</strong> hosszú hónapokat, a völgyek a <strong>rövidebb (30 vagy 28/29 napos)</strong> hónapokat jelentik:
            </p>
            <div className="mt-2.5 p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-xs space-y-1">
              <div>• <strong>Bütykök (31 nap):</strong> Január, Március, Május, Július, Augusztus, Október, December.</div>
              <div>• <strong>Völgyek (30 nap):</strong> Április, Június, Szeptember, November.</div>
              <div>• <strong>Február:</strong> 28 nap (szökőévben 29 nap).</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Nagyobb naptári egységek"
            badge="TÖRTÉNELEM"
            color="cyan"
            icon={<Hourglass className="w-5 h-5 text-cyan-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 év:</strong> 12 hónap = 365 nap (szökőévben 366 nap) = 52 hét + 1 nap.
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 évtized:</strong> 10 év.
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 évszázad (század):</strong> 100 év. (Pl. a 21. század 2001-től 2100-ig tart).
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1 évezred:</strong> 1000 év.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Gyorspróba */}
        <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Gyorspróba: Időméréstani villámkérdések
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
        id="ido-tablazat"
        number={5}
        title="Összefoglaló mértékegység-táblázat"
        icon={<TableIcon />}
        badge="ÁTTEKINTÉS"
        badgeColor="teal"
      >
        <TheoryTable
          title="Az idő mértékegységeinek rendszere és váltószámai"
          headers={['Mértékegység', 'Jele', 'Váltószáma', 'Megjegyzés / Példa']}
          rows={[
            ['másodperc (alapegység)', 's', 'Alapvető SI egység', 'Egy szívverés ideje kb. 1 s'],
            ['perc', 'min vagy p', '1 perc = 60 másodperc', '1 perces homokóra, forró tea áztatása (3–5 perc)'],
            ['óra', 'h vagy ó', '1 óra = 60 perc = 3600 s', 'Tanítási óra szünettel (1 óra)'],
            ['nap', 'd vagy nap', '1 nap = 24 óra = 1440 perc', 'A Föld 1 tengelyforgása'],
            ['hét', 'hét', '1 hét = 7 nap = 168 óra', '5 munkanap + 2 hétvégi nap'],
            ['hónap', 'hónap', '28, 29, 30 vagy 31 nap', '1 évben 12 hónap'],
            ['év', 'év', '365 nap (szökőévben 366 nap)', 'A Föld 1 napkeringése = 12 hónap'],
            ['évszázad', 'század', '100 év', '20. század (1901–2000), 21. század (2001–2100)']
          ]}
        />

        <TheoryCallout
          type="tip"
          title="Aranyszabály időtartam-számításhoz"
          text="Amikor órákat és perceket vonsz ki egymásból, és a percek kisebbek a kivonandónál (pl. 18:20 − 16:45), 'kölcsönvehetsz' 1 órát, ami pontosan 60 perccel növeli meg a perceket: 18 óra 20 perc = 17 óra 80 perc! Így a kivonás: 17 óra 80 perc − 16 óra 45 perc = 1 óra 35 perc."
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
