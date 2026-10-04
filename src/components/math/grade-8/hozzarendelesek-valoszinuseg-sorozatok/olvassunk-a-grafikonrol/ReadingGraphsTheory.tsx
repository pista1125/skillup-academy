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
  Eye,
  LineChart,
  Activity,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock,
  TrendingUp,
  TrendingDown,
  Navigation,
  Thermometer,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface ReadingGraphsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ReadingGraphsTheory: React.FC<ReadingGraphsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Menetdiagram Labor állapot
  const [selectedTime, setSelectedTime] = useState<number>(3.5);
  const [activeScenario, setActiveScenario] = useState<'hike' | 'temperature'>('hike');

  // Túrázó menetdiagram pontjai: [t (óra), s (km)]
  // (0; 0) -> (2; 8) -> (3; 8) -> (5; 18) -> (6; 18) -> (8; 0)
  const hikePoints = [
    { t: 0, s: 0 },
    { t: 2, s: 8 },
    { t: 3, s: 8 },
    { t: 5, s: 18 },
    { t: 6, s: 18 },
    { t: 8, s: 0 }
  ];

  // Aktuális s(t) kiszámítása a túrához lineáris interpolációval
  const getHikePosition = (t: number) => {
    if (t <= 2) {
      const v = 8 / 2; // 4 km/h
      return { s: v * t, v: 4, status: 'Egyenletes gyaloglás felfelé (4 km/h)' };
    } else if (t <= 3) {
      return { s: 8, v: 0, status: 'Pihenő a kilátónál (állóhelyzet, v = 0)' };
    } else if (t <= 5) {
      const v = (18 - 8) / (5 - 3); // 5 km/h
      return { s: 8 + v * (t - 3), v: 5, status: 'Tempós túra a csúcsra (5 km/h)' };
    } else if (t <= 6) {
      return { s: 18, v: 0, status: 'Ebéd a menedékházban (állóhelyzet, v = 0)' };
    } else {
      const v = (0 - 18) / (8 - 6); // -9 km/h
      return { s: 18 + v * (t - 6), v: -9, status: 'Gyors visszagurulás a kiindulópontra (9 km/h)' };
    }
  };

  const currentHike = getHikePosition(selectedTime);

  // SVG koordináta transzformáció a menetdiagramhoz (Szélesség: 320, Magasság: 220)
  // t: 0-tól 8-ig (X tengely: 40-től 300-ig, 260px / 8 = 32.5 px/óra)
  // s: 0-tól 20-ig (Y tengely: 180-tól 20-ig, 160px / 20 = 8 px/km)
  const mapHikeX = (t: number) => 40 + t * 32.5;
  const mapHikeY = (s: number) => 180 - s * 8;

  const currentSvgX = mapHikeX(selectedTime);
  const currentSvgY = mapHikeY(currentHike.s);

  return (
    <TheoryTemplate
      title="Olvassunk a Grafikonról!"
      subtitle="Út-idő menetdiagramok, sebesség, monotonitási szakaszok, szélsőértékek és pontleolvasás a gyakorlatban"
      badgeText="8. OSZTÁLY • VI. HOZZÁRENDELÉSEK • 👁️ TANANYAG"
      documentId="reading-graphs-theory-doc"
      pdfFilename="8_osztaly_grafikon_leolvasas_tananyag.pdf"
      quickRule={{
        label: 'Menetdiagram Aranyszabály',
        formula: 'v = Δs / Δt (Meredekség = Sebesség, Vízszintes = Állóhelyzet)'
      }}
      themeColor="teal"
      practiceTitle="Készen állsz a grafikon leolvasási feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben menetdiagramokkal, sebességgel és szélsőértékekkel!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* INTERAKTÍV MENETDIAGRAM LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="Interaktív Menetdiagram Labor"
        subtitle="Mozgasd az időcsúszkát, figyeld a túrázó helyzetét a grafikonon, a meredekséget és a sebességet!"
        badge="Interaktív Szimuláció"
        icon={<Activity className="w-5 h-5 text-teal-600" />}
      >
        <div className="bg-gradient-to-br from-teal-50/70 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/30 p-5 rounded-3xl border-2 border-teal-200/80 dark:border-teal-900/60 shadow-lg space-y-6">
          {/* Időcsúszka vezérlő */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                Eltelt idő kiválasztása (t):
              </span>
              <span className="font-mono font-black text-teal-800 dark:text-teal-200 text-sm px-3 py-0.5 bg-teal-100 dark:bg-teal-950 rounded-full border border-teal-300 dark:border-teal-800">
                t = {selectedTime.toFixed(1)} óra
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={selectedTime}
              onChange={(e) => setSelectedTime(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 óra (Start)</span>
              <span>2 óra (Kilátó)</span>
              <span>3 óra</span>
              <span>5 óra (Csúcs: 18 km)</span>
              <span>6 óra</span>
              <span>8 óra (Cél)</span>
            </div>
          </div>

          {/* Menetdiagram és Értékkijelző rács */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG Menetdiagram (7 col) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 rounded-2xl border-2 border-teal-100 dark:border-slate-800 shadow-inner">
              <svg viewBox="0 0 320 210" className="w-full max-w-[380px] h-auto select-none">
                {/* Vízszintes segédrácsok */}
                {[0, 5, 10, 15, 20].map((s) => (
                  <g key={`grid-s-${s}`}>
                    <line x1="40" y1={mapHikeY(s)} x2="305" y2={mapHikeY(s)} stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="2 2" />
                    <text x="32" y={mapHikeY(s) + 3} className="text-[9px] font-mono fill-slate-400" textAnchor="end">{s}</text>
                  </g>
                ))}

                {/* Függőleges segédrácsok */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((t) => (
                  <g key={`grid-t-${t}`}>
                    <line x1={mapHikeX(t)} y1="20" x2={mapHikeX(t)} y2="180" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="2 2" />
                    <text x={mapHikeX(t)} y="194" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">{t}</text>
                  </g>
                ))}

                {/* Tengelyek */}
                <line x1="38" y1="180" x2="308" y2="180" stroke="#334155" strokeWidth="1.8" />
                <line x1="40" y1="182" x2="40" y2="15" stroke="#334155" strokeWidth="1.8" />
                <polygon points="308,180 300,176 300,184" fill="#334155" />
                <polygon points="40,15 36,23 44,23" fill="#334155" />

                <text x="306" y="172" className="text-[10px] font-bold fill-slate-700" textAnchor="end">t (óra)</text>
                <text x="48" y="22" className="text-[10px] font-bold fill-slate-700">s (km)</text>

                {/* Szakaszok színezett vonalai */}
                {/* 1. szakasz: (0,0) -> (2,8) */}
                <line x1={mapHikeX(0)} y1={mapHikeY(0)} x2={mapHikeX(2)} y2={mapHikeY(8)} stroke="#0d9488" strokeWidth="2.5" />
                {/* 2. szakasz: (2,8) -> (3,8) PIHENŐ */}
                <line x1={mapHikeX(2)} y1={mapHikeY(8)} x2={mapHikeX(3)} y2={mapHikeY(8)} stroke="#f59e0b" strokeWidth="3" />
                {/* 3. szakasz: (3,8) -> (5,18) */}
                <line x1={mapHikeX(3)} y1={mapHikeY(8)} x2={mapHikeX(5)} y2={mapHikeY(18)} stroke="#0d9488" strokeWidth="2.5" />
                {/* 4. szakasz: (5,18) -> (6,18) PIHENŐ CSÚCS */}
                <line x1={mapHikeX(5)} y1={mapHikeY(18)} x2={mapHikeX(6)} y2={mapHikeY(18)} stroke="#f59e0b" strokeWidth="3" />
                {/* 5. szakasz: (6,18) -> (8,0) VISSZAÚT */}
                <line x1={mapHikeX(6)} y1={mapHikeY(18)} x2={mapHikeX(8)} y2={mapHikeY(0)} stroke="#ef4444" strokeWidth="2.5" />

                {/* Töréspontok */}
                {hikePoints.map((pt, idx) => (
                  <circle
                    key={`hk-pt-${idx}`}
                    cx={mapHikeX(pt.t)}
                    cy={mapHikeY(pt.s)}
                    r="3.5"
                    fill="#ffffff"
                    stroke="#0f766e"
                    strokeWidth="2"
                  />
                ))}

                {/* Aktuális időpont segédvonalak és jelölő pont */}
                <line x1={currentSvgX} y1="180" x2={currentSvgX} y2={currentSvgY} stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="40" y1={currentSvgY} x2={currentSvgX} y2={currentSvgY} stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="3 3" />

                <circle
                  cx={currentSvgX}
                  cy={currentSvgY}
                  r="6.5"
                  fill="#0ea5e9"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="animate-pulse shadow-md"
                />

                {/* Érték buborék */}
                <g transform={`translate(${currentSvgX > 240 ? currentSvgX - 70 : currentSvgX + 8}, ${currentSvgY < 45 ? currentSvgY + 25 : currentSvgY - 12})`}>
                  <rect width="65" height="20" rx="5" fill="#0f172a" fillOpacity="0.85" />
                  <text x="32" y="13" className="text-[9px] font-mono font-bold fill-white" textAnchor="middle">
                    ({selectedTime}; {currentHike.s.toFixed(1)} km)
                  </text>
                </g>
              </svg>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 mt-2">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" /> Előrehaladás</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Pihenő (v = 0)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Visszaút</span>
              </div>
            </div>

            {/* Leolvasási Eredmények Kártya (5 col) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-teal-100 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-black uppercase text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  Leolvasott Adatok a Grafikonról:
                </span>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-teal-50/60 dark:bg-teal-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Időpont (t):</span>
                    <span className="font-bold text-teal-800 dark:text-teal-200">{selectedTime} óra</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-teal-50/60 dark:bg-teal-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Távolság a starttól (s):</span>
                    <span className="font-bold text-teal-800 dark:text-teal-200">{currentHike.s.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-teal-50/60 dark:bg-teal-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Pillanatnyi sebesség (v):</span>
                    <span className="font-bold text-indigo-700 dark:text-indigo-300">{Math.abs(currentHike.v)} km/h</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-teal-200/70 dark:border-teal-900/60 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-slate-850 dark:to-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {currentHike.status}
                </div>
              </div>

              {/* Főbb szélsőértékek és tulajdonságok */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Maximum (legtávolabbi pont):</span>
                  <span className="text-teal-600 dark:text-teal-400 font-mono font-bold">18 km (t = 5–6 óra)</span>
                </div>
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Minimum (kiindulási pont):</span>
                  <span className="text-slate-600 dark:text-slate-400 font-mono font-bold">0 km (t = 0 és 8 óra)</span>
                </div>
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Összes pihenőidő:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">2 óra (1h + 1h)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 1. SZEKCIÓ: A GRAFIKONRÓL LEOLVASHATÓ FŐBB JELLEMZŐK */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. A Grafikonról Leolvasható Főbb Jellemzők"
        subtitle="Hogyan elemezzük a tengelyeket, intervallumokat és pontokat?"
        badge="Alapfogalmak"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A) Tengelyek és Pontok Koordinátái"
            icon={<Sparkles className="w-4 h-4 text-teal-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Minden grafikon két összetartozó mennyiség kapcsolatát ábrázolja:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-teal-700 dark:text-teal-300">• Vízszintes tengely (x vagy t):</span>
                <span>Független változó (legtöbbször az eltelt idő, pl. óra, perc, másodperc).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-teal-700 dark:text-teal-300">• Függőleges tengely (y, s, T):</span>
                <span>Függő változó (megtett út, hőmérséklet, vízmagasság, ár).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-teal-700 dark:text-teal-300">• Pont leolvasása (x; y):</span>
                <span>Az x értéknél merőlegesen felmegyünk a görbére, majd vízszintesen leolvassuk az y tengelyről az értéket!</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="B) Értelmezési Tartomány és Értékkészlet"
            icon={<Layers className="w-4 h-4 text-blue-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A folyamat érvényességi határai a két tengely mentén:
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-blue-900 dark:text-blue-200">Értelmezési tartomány (D):</div>
                <div className="text-slate-600 dark:text-slate-400 font-normal">A vízszintes tengely azon szakasza, ameddig a megfigyelés tart (pl. 0 ≤ t ≤ 8 óra).</div>
              </div>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="text-indigo-900 dark:text-indigo-200">Értékkészlet (R):</div>
                <div className="text-slate-600 dark:text-slate-400 font-normal">A legalacsonyabb és legmagasabb felvett érték közötti intervallum (pl. 0 ≤ s ≤ 18 km).</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZEKCIÓ: MENETDIAGRAMOK (s - t GRAFIKONOK) ELEMZÉSE */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. Menetdiagramok (s - t Grafikonok) Titkai"
        subtitle="Meredekség, sebesség, állóhelyzet és találkozási pontok"
        badge="Fizikai Kapcsolat"
        icon={<TrendingUp className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <TheoryCard
            title="1. Meredekség = Sebesség"
            icon={<Activity className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az út-idő grafikon meredeksége pontosan a <strong>sebesség</strong>:
              <br />
              <span className="font-mono font-bold text-teal-700 dark:text-teal-300 block my-1.5">v = Δs / Δt</span>
              Minél <strong>meredekebb</strong> a szakasz, annál <strong>gyorsabban</strong> halad a test!
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Vízszintes Szakasz = Pihenő"
            icon={<Clock className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha a vonal <strong>vízszintes</strong>, az út nem változik az idő múlásával:
              <br />
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block my-1.5">v = 0 km/h (Nyugalom)</span>
              A jármű vagy túrázó áll, pihenőt tart! A szakasz hossza adja a pihenőidőt.
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Lefelé Lejtés = Visszaút"
            icon={<TrendingDown className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha a grafikon lefelé lejt a vízszintes tengely felé, a test <strong>visszafordul a kiindulópont irányába</strong>.
              <br />
              Amikor a görbe eléri az <MathText>s = 0</MathText> tengelyt, hazaért!
            </p>
          </TheoryCard>
        </div>

        {/* Két menetdiagram metszéspontja callout */}
        <TheoryCallout
          title="Mit jelent két menetdiagram metszéspontja?"
          type="info"
        >
          <p className="text-xs sm:text-sm leading-relaxed">
            Ha két különböző mozgó test (pl. Péter és Anna, vagy egy vonat és egy autó) grafikonja <strong>metszi egymást</strong> egy <MathText>(t_0; s_0)</MathText> pontban, az azt jelenti, hogy:
            <br />
            <strong>Ugyanabban a t₀ időpontban pontosan ugyanabban az s₀ távolságban tartózkodnak, vagyis TALÁLKOZNAK (vagy az egyik megelőzi a másikat)!</strong>
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZEKCIÓ: SZÉLSŐÉRTÉKEK ÉS MONOTONITÁS */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Monotonitás, Zérushely és Szélsőértékek"
        subtitle="Hogyan határozzuk meg a maximumot, minimumot és a szakaszokat?"
        badge="Függvényjellemzés"
        icon={<LineChart className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A) Maximum és Minimum (Szélsőértékek)"
            icon={<Sparkles className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Nagyon fontos különbséget tenni a szélsőérték <strong>helye</strong> és <strong>értéke</strong> között:
            </p>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="text-emerald-900 dark:text-emerald-200">Maximum:</span>
                <span className="text-slate-600 dark:text-slate-300 block font-normal">
                  • <strong>Maximumhely:</strong> az az x vagy t időpont, amikor a legnagyobb értéket felveszi.<br />
                  • <strong>Maximumérték:</strong> maga a legnagyobb felvett y érték (pl. legmagasabb hőmérséklet: 28 °C).
                </span>
              </div>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
                <span className="text-rose-900 dark:text-rose-200">Minimum:</span>
                <span className="text-slate-600 dark:text-slate-300 block font-normal">
                  • <strong>Minimumhely:</strong> az a pont a vízszintes tengelyen, ahol a legmélyebb pont van.<br />
                  • <strong>Minimumérték:</strong> a legalacsonyabb felvett érték (pl. hajnali fagy: -4 °C).
                </span>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="B) Monotonitási Szakaszok és Zérushely"
            icon={<TrendingUp className="w-4 h-4 text-teal-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A grafikon változási szakaszai:
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                <strong>Szigorúan növekvő szakasz:</strong> balról jobbra felfelé emelkedik (értékek nőnek).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                <strong>Szigorúan csökkenő szakasz:</strong> balról jobbra lejt (értékek csökkennek).
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border">
                <strong>Zérushely:</strong> ahol a görbe metszi a vízszintes tengelyt (<MathText>y = 0</MathText>, pl. a fagyáspont 0 °C átlépése).
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Gyakorlati grafikonok táblázata */}
        <div className="mt-4">
          <TheoryTable
            title="Gyakori Grafikon Típusok és Jelentésük"
            headers={['Grafikon típusa', 'Vízszintes tengely (x)', 'Függőleges tengely (y)', 'Mit jelent a meredekség?']}
            rows={[
              ['Menetdiagram (s - t)', 'Eltelt idő (t, óra/perc)', 'Távolság (s, km/m)', 'Sebesség (v = s/t)'],
              ['Hőmérséklet (T - t)', 'Napszak / Idő (óra)', 'Hőmérséklet (°C)', 'Melegedés / lehűlés gyorsasága'],
              ['Tartály vízszintje (V - t)', 'Idő (perc)', 'Vízmennyiség (liter)', 'Töltési / ürítési sebesség (l/perc)'],
              ['Árfolyam grafikon', 'Dátum / Napok', 'Árfolyam / Érték (Ft)', 'Drágulás / olcsóbbá válás üteme']
            ]}
          />
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZEKCIÓ: VIZSGACSAPDÁK ÉS TÉVHITEK */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Tipikus Vizsgacsapdák Grafikonok Leolvasásakor"
        subtitle="Kerüld el a leggyakoribb felvételi és dolgozathibákat!"
        badge="Figyelem"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-3.5">
          <TheoryTrapBox
            title="1. Csapda: A szélsőérték HELYÉNEK és ÉRTÉKÉNEK összekeverése"
            description="Ha a feladat azt kérdezi: „Mikor volt a legmagasabb a hőmérséklet?”, akkor IDŐPONTOT (x-tengely, pl. 14:00-kor) kell megadni! Ha azt kérdezi: „Mennyi volt a maximális hőmérséklet?”, akkor ÉRTÉKET (y-tengely, pl. 26 °C) kell válaszolni. Dolgozatban erre mindig figyelj!"
          />

          <TheoryTrapBox
            title="2. Csapda: Átlagsebesség kiszámítása menetdiagramról"
            description="Gyakori hiba a részsebességek egyszerű számtani átlagát venni. Az átlagsebesség Helyes képlete mindig: Teljes megtett út osztva a Teljes eltelt idővel (v_átlag = Összes út / Összes idő). A pihenőidőt (ahol v = 0) is bele kell számolni az összes időbe!"
          />

          <TheoryTrapBox
            title="3. Csapda: A vízszintes szakasz azt hiszik, „nem történt semmi”"
            description="A vízszintes szakasz azt jelenti, hogy az idő telik (halad jobbra), de a test helyzete nem változik. Ez nem a grafikon hibája, hanem a test nyugalmi állapota (pihenő, dugóban állás, lámpánál várakozás)!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ReadingGraphsTheory;
