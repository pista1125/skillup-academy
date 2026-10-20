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
  BarChart3,
  LineChart,
  PieChart,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Eye,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface TablesGraphsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const TablesGraphsTheory: React.FC<TablesGraphsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // =========================================================================
  // 1. Interaktív Diagram-váltó Szimulátor Állapota
  // =========================================================================
  type ChartType = 'bar' | 'line' | 'pie' | 'table';
  const [selectedChart, setSelectedChart] = useState<ChartType>('bar');

  // Heti időjárás adatsor (napi maximum hőmérsékletek °C-ban)
  const weatherData = [
    { day: 'Hétfő', temp: 14, color: '#38bdf8' },
    { day: 'Kedd', temp: 16, color: '#60a5fa' },
    { day: 'Szerda', temp: 21, color: '#fbbf24' },
    { day: 'Csütörtök', temp: 25, color: '#f97316' },
    { day: 'Péntek', temp: 23, color: '#fb923c' },
    { day: 'Szombat', temp: 18, color: '#34d399' },
    { day: 'Vasárnap', temp: 15, color: '#38bdf8' }
  ];

  const maxTemp = Math.max(...weatherData.map(d => d.temp));
  const minTemp = Math.min(...weatherData.map(d => d.temp));

  // =========================================================================
  // 2. Interaktív Skála Szimulátor (Korrekt vs Félrevezető diagram)
  // =========================================================================
  const [startFromZero, setStartFromZero] = useState<boolean>(true);

  // Két csapat pontszáma: Csapat A = 95 pont, Csapat B = 100 pont
  const teamA = 95;
  const teamB = 100;

  return (
    <TheoryTemplate
      title="2. Táblázatok és Grafikonok"
      subtitle="Adatok rendezése táblázatba, oszlop-, vonal- és kördiagramok leolvasása, elemzése és a félrevezető grafikonok leleplezése"
      themeColor="blue"
      badgeText="5. OSZTÁLY • VII. TÉMAKÖR: ADATGYŰJTÉS, STATISZTIKA • 📖 TANANYAG"
      documentId="grade-5-tablazatok-theory"
      pdfFilename="5_osztaly_VII_2_tablazatok_grafikonok_tananyag.pdf"
      practiceTitle="Készen állsz a táblázatok és grafikonok gyakorlására?"
      practiceSubtitle="Teszteld tudásodat oszlop-, vonal- és kördiagramok leolvasásában és készítésében!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* 1. RÉSZ: ADATOK TÁBLÁZATBAN */}
      <TheorySection
        title="1. Adatok Rendszerezése és Táblázatok"
        icon={<TableIcon className="w-5 h-5" />}
        badge="Alapfogalmak"
      >
        <TheoryCallout
          variant="info"
          title="Miért van szükségünk táblázatokra és grafikonokra?"
        >
          A mindennapi életben – az időjárás-előrejelzéstől a sporteredményeken át a pénzügyekig – rengeteg adat vesz körül minket.
          A <strong>táblázat</strong> a pontos számértékek rögzítésére szolgál, míg a <strong>grafikon (diagram)</strong>
          segít abban, hogy egyetlen pillantással átlássuk az összefüggéseket, az arányokat és a változásokat.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard
            title="Fejléc és Sorok"
            icon={<Layers className="w-5 h-5 text-blue-600" />}
            badge="Felépítés"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A táblázat legfelső sora a <strong>fejléc</strong> (megnevezésekkel), bal oldali oszlopa a kategóriákat tartalmazza.
              A sorok és oszlopok metszéspontjában lévő mezők az <strong>adatcellák</strong>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Gyakoriság"
            icon={<Activity className="w-5 h-5 text-indigo-600" />}
            badge="Statisztikai fogalom"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A <strong>gyakoriság</strong> azt fejezi ki, hogy egy adott érték vagy kategória hány alkalommal fordul elő az adatgyűjtés során
              (pl. hány tanuló kapott 5-öst a dolgozatra).
            </p>
          </TheoryCard>

          <TheoryCard
            title="Összesen Sor"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            badge="Ellenőrzés"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A táblázat alján lévő <strong>Összesen sor</strong> az adatok összegét mutatja.
              Segítségével azonnal ellenőrizhető, hogy nem maradt-e ki adat, vagy nem számoltunk-e valakit kétszer.
            </p>
          </TheoryCard>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 my-2">
          Példa: Egy 5. osztályos matematika dolgozat jegyeinek eloszlása:
        </p>

        <TheoryTable
          headers={['Érdemjegy', 'Jeles (5)', 'Jó (4)', 'Közepes (3)', 'Elégséges (2)', 'Elégtelen (1)', 'Összesen']}
          rows={[
            ['Tanulók száma (Gyakoriság)', '6 fő', '9 fő', '7 fő', '2 fő', '1 fő', '25 fő'],
            ['Százalékos arány', '24%', '36%', '28%', '8%', '4%', '100%']
          ]}
        />
      </TheorySection>

      {/* 2. RÉSZ: INTERAKTÍV DIAGRAM-BEMUTATÓ */}
      <TheorySection
        title="2. Grafikonok és Diagramok Típusai (Interaktív Szemléltető)"
        icon={<BarChart3 className="w-5 h-5" />}
        badge="Szemléltetés"
      >
        <TheoryCallout
          variant="tip"
          title="A 3 legfontosabb diagramtípus 5. osztályban"
        >
          • <strong>Oszlopdiagram:</strong> Kategóriák, csoportok adatainak összehasonlítására (különböző oszlopok).<br />
          • <strong>Vonaldiagram:</strong> Időbeli folyamatok, folytonos változások (hőmérséklet, sebesség, vízállás) nyomon követésére.<br />
          • <strong>Kördiagram:</strong> Egy egész (100%) részeinek, megoszlásának ábrázolására.
        </TheoryCallout>

        {/* INTERAKTÍV VÁLTÓ */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-600 text-white">
                <BarChart3 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-blue-950 dark:text-blue-200">
                  Egy heti napi maximum hőmérséklet alakulása
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Ugyanazt az adatsort nézheted meg 4 különböző ábrázolási formában!
                </p>
              </div>
            </div>

            {/* Váltógombok */}
            <div className="flex flex-wrap gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800">
              <Button
                size="sm"
                variant={selectedChart === 'bar' ? 'default' : 'ghost'}
                className="text-xs h-8"
                onClick={() => setSelectedChart('bar')}
              >
                <BarChart3 className="w-3.5 h-3.5 mr-1" /> Oszlopdiagram
              </Button>
              <Button
                size="sm"
                variant={selectedChart === 'line' ? 'default' : 'ghost'}
                className="text-xs h-8"
                onClick={() => setSelectedChart('line')}
              >
                <LineChart className="w-3.5 h-3.5 mr-1" /> Vonaldiagram
              </Button>
              <Button
                size="sm"
                variant={selectedChart === 'pie' ? 'default' : 'ghost'}
                className="text-xs h-8"
                onClick={() => setSelectedChart('pie')}
              >
                <PieChart className="w-3.5 h-3.5 mr-1" /> Kördiagram
              </Button>
              <Button
                size="sm"
                variant={selectedChart === 'table' ? 'default' : 'ghost'}
                className="text-xs h-8"
                onClick={() => setSelectedChart('table')}
              >
                <TableIcon className="w-3.5 h-3.5 mr-1" /> Táblázat
              </Button>
            </div>
          </div>

          {/* Vizuális megjelenítés */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[300px]">
            {/* 1. OSZLOPDIAGRAM */}
            {selectedChart === 'bar' && (
              <div className="w-full max-w-xl">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 text-center">
                  Hőmérséklet (°C) a hét napjain
                </div>
                <div className="flex items-end justify-between h-52 pt-6 pb-2 px-4 border-b-2 border-l-2 border-slate-400 dark:border-slate-600 gap-2">
                  {weatherData.map((d, i) => {
                    const heightPercent = (d.temp / 30) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 group-hover:scale-110 transition-transform">
                          {d.temp}°C
                        </span>
                        <div
                          style={{ height: `${heightPercent}%`, backgroundColor: d.color }}
                          className="w-full rounded-t-lg shadow transition-all duration-500 hover:brightness-110 cursor-pointer"
                        />
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-2 truncate w-full text-center">
                          {d.day.substring(0, 3)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 px-2 mt-1">
                  <span>0°C (Kezdőpont)</span>
                  <span>Skála: 5°C-onként</span>
                  <span>Maximum: 30°C</span>
                </div>
              </div>
            )}

            {/* 2. VONALDIAGRAM */}
            {selectedChart === 'line' && (
              <div className="w-full max-w-xl">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 text-center">
                  Hőmérséklet alakulása (Vonaldiagram összekötő pontokkal)
                </div>
                <svg viewBox="0 0 500 220" className="w-full h-52">
                  {/* Hálózati vonalak */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeDasharray="3,3" />
                  <text x="30" y="24" fontSize="10" fill="#94a3b8" textAnchor="end">30°</text>
                  <line x1="40" y1="73" x2="480" y2="73" stroke="#e2e8f0" strokeDasharray="3,3" />
                  <text x="30" y="77" fontSize="10" fill="#94a3b8" textAnchor="end">20°</text>
                  <line x1="40" y1="126" x2="480" y2="126" stroke="#e2e8f0" strokeDasharray="3,3" />
                  <text x="30" y="130" fontSize="10" fill="#94a3b8" textAnchor="end">10°</text>
                  <line x1="40" y1="180" x2="480" y2="180" stroke="#64748b" strokeWidth="2" />
                  <text x="30" y="184" fontSize="10" fill="#64748b" textAnchor="end">0°</text>
                  <line x1="40" y1="10" x2="40" y2="180" stroke="#64748b" strokeWidth="2" />

                  {/* Vonaldiagram útvonala: x pontok 70, 130, 190, 250, 310, 370, 430. y pont: 180 - (temp * 5.3) */}
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="70,105.8 130,95.2 190,68.7 250,47.5 310,58.1 370,84.6 430,100.5"
                  />

                  {/* Pontok és feliratok */}
                  {weatherData.map((d, i) => {
                    const cx = 70 + i * 60;
                    const cy = 180 - d.temp * 5.3;
                    const isMax = d.temp === maxTemp;
                    const isMin = d.temp === minTemp;
                    return (
                      <g key={i} className="cursor-pointer">
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isMax || isMin ? "6" : "4.5"}
                          fill={isMax ? "#ef4444" : isMin ? "#0284c7" : "#2563eb"}
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={cx}
                          y={cy - 10}
                          fontSize="11"
                          fontWeight="bold"
                          fill={isMax ? "#dc2626" : isMin ? "#0369a1" : "#1e293b"}
                          textAnchor="middle"
                        >
                          {d.temp}°
                        </text>
                        <text
                          x={cx}
                          y="200"
                          fontSize="10"
                          fontWeight="600"
                          fill="#64748b"
                          textAnchor="middle"
                        >
                          {d.day.substring(0, 3)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div className="flex justify-center gap-4 text-xs mt-2">
                  <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Maximum: Csütörtök ({maxTemp}°C)
                  </span>
                  <span className="flex items-center gap-1 text-sky-600 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" /> Minimum: Hétfő ({minTemp}°C)
                  </span>
                </div>
              </div>
            )}

            {/* 3. KÖRDIAGRAM */}
            {selectedChart === 'pie' && (
              <div className="w-full max-w-md flex flex-col items-center">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 text-center">
                  Hőmérsékleti kategóriák aránya (Kördiagram = 360°)
                </div>
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Hűvös (<16°C): 2 nap -> 2/7 rész = 103° */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#38bdf8"
                      strokeWidth="20"
                      strokeDasharray="71.8 251.3"
                      strokeDashoffset="0"
                    />
                    {/* Kellemes (16-20°C): 2 nap -> 2/7 rész = 103° */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#34d399"
                      strokeWidth="20"
                      strokeDasharray="71.8 251.3"
                      strokeDashoffset="-71.8"
                    />
                    {/* Meleg (>20°C): 3 nap -> 3/7 rész = 154° */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#f97316"
                      strokeWidth="20"
                      strokeDasharray="107.7 251.3"
                      strokeDashoffset="-143.6"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">7 nap</span>
                    <span className="text-[10px] text-slate-400">100%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 text-xs w-full">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-3 h-3 rounded-full bg-sky-400" />
                    <span>Hűvös (2 nap)</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span>Kellemes (2 nap)</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-3 h-3 rounded-full bg-orange-500" />
                    <span>Meleg (3 nap)</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. TÁBLÁZAT */}
            {selectedChart === 'table' && (
              <div className="w-full max-w-lg">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 text-center">
                  Pontos numerikus adatok táblázatos formában
                </div>
                <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                  <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">
                    <tr>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">Nap</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">Max. Hőmérséklet</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">Eltérés az átlagtól (~19°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.map((d, i) => (
                      <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20">
                        <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">{d.day}</td>
                        <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">
                          {d.temp} °C
                        </td>
                        <td className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500">
                          {d.temp > 19 ? `+${d.temp - 19}°C` : `${d.temp - 19}°C`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 text-center">
            <strong>Mikor melyiket válaszd?</strong> Ha a <em>pontos számok</em> kellenek: Táblázat. Ha az <em>egyes napok nagyságát</em> hasonlítod össze: Oszlopdiagram. Ha a <em>hőmérséklet változását</em> (hűlést, melegedést): Vonaldiagram. Ha a <em>napok típus szerinti eloszlását</em>: Kördiagram!
          </div>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: A KÖRDIAGRAM ÉS A SZÖGEK */}
      <TheorySection
        title="3. A Kördiagram: Szögek és Százalékok Összefüggése"
        icon={<PieChart className="w-5 h-5" />}
        badge="Geometria és arányok"
      >
        <TheoryCallout
          variant="tip"
          title="A 360°-os aranyszabály"
        >
          A teljes kör középponti szöge pontosan <strong>360°</strong>, ami a teljes mennyiségnek (1 egésznek, azaz <strong>100%</strong>-nak) felel meg.
          Bármilyen arányt szeretnénk ábrázolni, a körcikk szöge egyenesen arányos lesz a rész nagyságával!
        </TheoryCallout>

        <FormulaBox
          title="Gyakori szögek és arányok a kördiagramban"
          formula="100% = 360°   ⟹   1% = 3,6°"
          description="Fél kör: 50% = 180° | Negyed kör: 25% = 90° | Egyharmad kör: ~33,3% = 120° | Tized rész: 10% = 36°"
          color="blue"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center shadow-2xs hover:shadow-xs transition-shadow">
            <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" className="dark:fill-blue-950/60" />
              <path d="M 16 2 A 14 14 0 0 1 16 30 Z" fill="#0284c7" />
            </svg>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">180°</span>
            <div className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-1">Fél kör (50%)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Egyenes vonal osztja ketté a kört</div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center shadow-2xs hover:shadow-xs transition-shadow">
            <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" className="dark:fill-indigo-950/60" />
              <path d="M 16 16 L 16 2 A 14 14 0 0 1 30 16 Z" fill="#6366f1" />
            </svg>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">90°</span>
            <div className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-1">Negyed kör (25%)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Derékszögű körcikk</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center shadow-2xs hover:shadow-xs transition-shadow">
            <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" className="dark:fill-purple-950/60" />
              <path d="M 16 16 L 16 2 A 14 14 0 0 1 28.12 23 Z" fill="#9333ea" />
            </svg>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400">120°</span>
            <div className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-1">Harmad kör (~33%)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">A 360° pontos harmada</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center shadow-2xs hover:shadow-xs transition-shadow">
            <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" className="dark:fill-emerald-950/60" />
              <path d="M 16 16 L 16 2 A 14 14 0 0 1 24.23 4.67 Z" fill="#10b981" />
            </svg>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">36°</span>
            <div className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-1">Tized rész (10%)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Könnyen számolható alapegység</div>
          </div>
        </div>

        <ExampleBox
          title="Példa: Körcikk szögének kiszámítása"
          problem="Egy 40 fős osztályban 10 tanuló jár zeneiskolába. Hány fokos körcikk jelöli őket a kördiagramon?"
          steps={[
            {
              label: '1. Lépés: Arány meghatározása',
              value: 'A zeneiskolások aránya: 10 / 40 = 1 / 4 rész (a tanulók negyede, 25%).'
            },
            {
              label: '2. Lépés: Szög kiszámítása a 360°-ból',
              value: 'A teljes kör 360°. Ennek a negyed része: 360° : 4 = 90°.'
            },
            {
              label: 'Válasz',
              value: 'A zeneiskolásokat egy pontosan 90°-os (derékszögű) körcikk ábrázolja!'
            }
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: FÉLREVEZETŐ GRAFIKONOK LELEPLEZÉSE */}
      <TheorySection
        title="4. Félrevezető Grafikonok Leleplezése: Amikor a szemünk becsap"
        icon={<AlertTriangle className="w-5 h-5" />}
        badge="Kritikus gondolkodás"
      >
        <TheoryCallout
          variant="warning"
          title="Hogyan lehet csalni a diagramokkal a hírekben és reklámokban?"
        >
          A grafikonokat gyakran használják meggyőzésre. Ha a készítő nem tartja be a matematikai szabályokat,
          egy <strong>apró különbséget óriásinak</strong>, vagy egy <strong>hatalmas növekedést elenyészőnek</strong> mutathat be!
        </TheoryCallout>

        {/* INTERAKTÍV SKÁLA LELEPLEZŐ */}
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-amber-950 dark:text-amber-200">
                A levágott tengely csapdája (Csapat A: 95 pont, Csapat B: 100 pont)
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Kattints és nézd meg, mi történik, ha a skála nem 0-ról indul!
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-amber-400 font-bold bg-white dark:bg-slate-900"
              onClick={() => setStartFromZero(!startFromZero)}
            >
              {startFromZero ? '👁️ Váltás: Levágott tengelyre (90-től)' : '✅ Váltás: Korrekt tengelyre (0-tól)'}
            </Button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-amber-200 dark:border-amber-800 flex flex-col items-center">
            <div className="text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">
              {startFromZero ? (
                <span className="text-emerald-600 font-bold">✅ KORREKT ÁBRÁZOLÁS: A skála 0-ról indul. A különbség reális (csak ~5%).</span>
              ) : (
                <span className="text-rose-600 font-bold">❌ MANIPULATÍV ÁBRÁZOLÁS: A tengely 90-ről indul! Úgy tűnik, mintha B kétszer akkora lenne, mint A!</span>
              )}
            </div>

            <div className="flex items-end justify-center gap-16 h-48 w-full max-w-xs border-b-2 border-l-2 border-slate-400 pb-2 px-6">
              {/* Csapat A */}
              <div className="flex flex-col items-center w-20">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">{teamA} pont</span>
                <div
                  style={{
                    height: startFromZero ? `${(teamA / 110) * 160}px` : `${((teamA - 90) / 15) * 160}px`
                  }}
                  className="w-full bg-blue-500 rounded-t-md transition-all duration-500 shadow"
                />
                <span className="text-xs font-bold mt-2 text-slate-600 dark:text-slate-400">„A” Csapat</span>
              </div>

              {/* Csapat B */}
              <div className="flex flex-col items-center w-20">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">{teamB} pont</span>
                <div
                  style={{
                    height: startFromZero ? `${(teamB / 110) * 160}px` : `${((teamB - 90) / 15) * 160}px`
                  }}
                  className="w-full bg-indigo-600 rounded-t-md transition-all duration-500 shadow"
                />
                <span className="text-xs font-bold mt-2 text-slate-600 dark:text-slate-400">„B” Csapat</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mt-2 text-center">
              Függőleges tengely kezdőértéke: <strong>{startFromZero ? '0 pont' : '90 pont (Levágott skála!)'}</strong>
            </div>
          </div>
        </div>

        <TheoryTrapBox
          title="A 3 Aranyszabály a Grafikonok Leolvasásához"
          trap="Ha csak az oszlopok tetejére nézel a számok és a tengely beosztása nélkül, könnyen félrevezethetnek!"
          correction="1. Mindig nézd meg, honnan indul a függőleges tengely (0-ról indul-e)! 2. Ellenőrizd a beosztás léptékét (egyenletes-e)! 3. Olvasd el a tengelyek feliratát és a mértékegységet!"
        />
      </TheorySection>

      {/* 5. RÉSZ: ÖSSZEFOGLALÓ ARANYSZABÁLYOK A DOLGOZATHOZ */}
      <TheorySection
        title="5. Összefoglaló Aranyszabályok a Dolgozathoz"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="Memoriter"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {/* 1. Kártya: Táblázat és Gyakoriság */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-2xs">
              <TableIcon className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-blue-950 dark:text-blue-100">
              Táblázat és Gyakoriság
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 font-bold text-xs border border-blue-200 dark:border-blue-700">
              Gyakoriság = Előfordulás
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              Az „Összesen” sor összeadásával mindig ellenőrizd az adatok teljességét!
            </div>
          </div>

          {/* 2. Kártya: Oszlop vs Vonaldiagram */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shadow-2xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-indigo-950 dark:text-indigo-100">
              Oszlop- és Vonaldiagram
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-bold text-xs border border-indigo-200 dark:border-indigo-700">
              Oszlop: csoportok | Vonal: idő
            </div>
            <div className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              Oszlopdiagram különálló dolgokhoz, vonaldiagram folytonos változáshoz való.
            </div>
          </div>

          {/* 3. Kártya: Kördiagram 360° */}
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-2xs">
              <PieChart className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-purple-950 dark:text-purple-100">
              Kördiagram Arányok
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-mono font-bold text-xs border border-purple-200 dark:border-purple-700">
              100% = 360° ⟹ 1% = 3,6°
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
              A körcikk szöge arányos a rész nagyságával (25% = 90°, 50% = 180°).
            </div>
          </div>

          {/* 4. Kártya: Levágott tengely leleplezése */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-300 shadow-2xs">
              <Eye className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-amber-950 dark:text-amber-100">
              Levágott Tengely Csapda
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold text-xs border border-amber-200 dark:border-amber-700">
              0-ról indul a tengely?
            </div>
            <div className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              Ha nem 0-ról indul a skála, a kis különbség óriásinak látszik: légy éber!
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
