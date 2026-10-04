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
  BarChart3,
  Activity,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  PieChart,
  Percent,
  Plus,
  Minus,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface FrequencyStatisticsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const FrequencyStatisticsTheory: React.FC<FrequencyStatisticsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Statisztika Labor adathalmaz (pl. tanulók érdemjegyei 1-től 5-ig)
  // Kezdő készlet: 2 db 1-es, 3 db 2-es, 6 db 3-as, 9 db 4-es, 5 db 5-ös (összesen 25 diák)
  const initialCounts = { 1: 2, 2: 3, 3: 6, 4: 9, 5: 5 };
  const [counts, setCounts] = useState<{ [grade: number]: number }>(initialCounts);

  // Műveletek az érdemjegyek számával
  const updateCount = (grade: number, delta: number) => {
    setCounts((prev) => {
      const next = Math.max(0, (prev[grade] || 0) + delta);
      return { ...prev, [grade]: next };
    });
  };

  const setPreset = (preset: 'balanced' | 'bimodal' | 'outlier') => {
    if (preset === 'balanced') {
      setCounts({ 1: 2, 2: 4, 3: 10, 4: 6, 5: 3 });
    } else if (preset === 'bimodal') {
      setCounts({ 1: 1, 2: 8, 3: 2, 4: 8, 5: 1 });
    } else {
      setCounts({ 1: 1, 2: 2, 3: 3, 4: 6, 5: 12 });
    }
  };

  // Statisztikai mutatók dinamikus kiszámítása
  const totalN = Object.values(counts).reduce((sum, c) => sum + c, 0);

  // Kiterített rendezett lista
  const expandedList: number[] = [];
  [1, 2, 3, 4, 5].forEach((g) => {
    for (let i = 0; i < counts[g]; i++) {
      expandedList.push(g);
    }
  });

  // Átlag
  const sumValues = expandedList.reduce((sum, v) => sum + v, 0);
  const average = totalN > 0 ? (sumValues / totalN).toFixed(2) : '0';

  // Módusz (legnagyobb gyakoriság)
  let maxCount = 0;
  [1, 2, 3, 4, 5].forEach((g) => {
    if (counts[g] > maxCount) maxCount = counts[g];
  });
  const modes = totalN > 0 && maxCount > 0 ? [1, 2, 3, 4, 5].filter((g) => counts[g] === maxCount) : [];

  // Medián
  let median = '0';
  if (totalN > 0) {
    if (totalN % 2 === 1) {
      const midIdx = Math.floor(totalN / 2);
      median = expandedList[midIdx].toString();
    } else {
      const mid1 = expandedList[totalN / 2 - 1];
      const mid2 = expandedList[totalN / 2];
      median = ((mid1 + mid2) / 2).toFixed(1);
    }
  }

  // Terjedelem
  const range = totalN > 0 ? expandedList[expandedList.length - 1] - expandedList[0] : 0;

  return (
    <TheoryTemplate
      title="Gyakoriság, relatív gyakoriság, átlag"
      subtitle="Leíró statisztikai alapfogalmak: mintanagyság, gyakoriságok, középértékek (átlag, módusz, medián), terjedelem és diagramok"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="frequency-statistics-theory-doc"
      pdfFilename="8_osztaly_statisztika_atlag_tananyag.pdf"
      estimatedReadTime="14 perc"
      quickRule={{
        label: 'Alapképletek',
        formula: 'Relatív gyakoriság = k / N • Átlag x̄ = (∑ x) / N'
      }}
      themeColor="emerald"
      practiceTitle="Készen állsz a statisztikai számításokra?"
      practiceSubtitle="Tedd próbára tudásodat a gyakoriság, relatív gyakoriság, átlag, módusz, medián és terjedelem feladataiban!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* INTERAKTÍV STATISZTIKA LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="Interaktív Statisztika Labor"
        subtitle="Módosítsd egy osztály érdemjegyeinek darabszámát, és figyeld meg az oszlopdiagramot, valamint az átlag, módusz és medián valós idejű változását!"
        badge="Interaktív Szimuláció"
        icon={<Activity className="w-5 h-5 text-emerald-600" />}
      >
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-5 rounded-3xl border-2 border-emerald-200/80 dark:border-emerald-900/60 shadow-lg space-y-6">
          {/* Gyors sablon gombok */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/90 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Mintaeloszlások betöltése:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreset('balanced')}
                className="text-xs h-7 rounded-lg"
              >
                Kiegyensúlyozott minta
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreset('bimodal')}
                className="text-xs h-7 rounded-lg"
              >
                Kétpúpú (két módusz)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreset('outlier')}
                className="text-xs h-7 rounded-lg"
              >
                Többségben kitűnő (5-ösök)
              </Button>
            </div>
          </div>

          {/* Oszlopdiagram és Értékkijelző rács */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG Oszlopdiagram és vezérlők (7 col) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border-2 border-emerald-100 dark:border-slate-800 shadow-inner">
              <span className="text-xs font-bold text-slate-500 mb-2">
                Érdemjegyek Gyakorisági Oszlopdiagramja (N = {totalN} fő)
              </span>

              <svg viewBox="0 0 320 180" className="w-full max-w-[360px] h-auto select-none">
                {/* Vízszintes segédrácsok */}
                {[0, 3, 6, 9, 12].map((val) => {
                  const y = 140 - (val / 13) * 110;
                  return (
                    <g key={`grid-y-${val}`}>
                      <line x1="30" y1={y} x2="305" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="24" y={y + 3} className="text-[8px] font-mono fill-slate-400" textAnchor="end">{val}</text>
                    </g>
                  );
                })}

                {/* Főtengelyek */}
                <line x1="30" y1="140" x2="310" y2="140" stroke="#334155" strokeWidth="1.6" />
                <line x1="30" y1="140" x2="30" y2="15" stroke="#334155" strokeWidth="1.6" />
                <polygon points="310,140 302,136 302,144" fill="#334155" />
                <polygon points="30,15 26,23 34,23" fill="#334155" />

                <text x="306" y="152" className="text-[9px] font-bold fill-slate-700" textAnchor="end">Érdemjegy</text>
                <text x="38" y="20" className="text-[9px] font-bold fill-slate-700">Fő (k)</text>

                {/* Oszlopok rajzolása 1-től 5-ig */}
                {[1, 2, 3, 4, 5].map((grade, idx) => {
                  const count = counts[grade];
                  const barWidth = 36;
                  const x = 52 + idx * 50;
                  const barHeight = Math.min(115, (count / 13) * 110);
                  const y = 140 - barHeight;
                  const isMode = modes.includes(grade);

                  return (
                    <g key={`bar-${grade}`}>
                      {/* Oszlop téglalap */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        fill={isMode ? '#10b981' : '#0ea5e9'}
                        fillOpacity={isMode ? 0.95 : 0.8}
                        stroke={isMode ? '#059669' : '#0284c7'}
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />

                      {/* Darabszám az oszlop tetején */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 5}
                        className="text-[9px] font-mono font-bold fill-slate-700 dark:fill-slate-200"
                        textAnchor="middle"
                      >
                        {count} db
                      </text>

                      {/* Érdemjegy felirat a tengely alatt */}
                      <text
                        x={x + barWidth / 2}
                        y="154"
                        className="text-[10px] font-bold fill-slate-800 dark:fill-slate-100"
                        textAnchor="middle"
                      >
                        {grade}
                      </text>

                      {/* Relatív gyakoriság százalékban */}
                      {totalN > 0 && (
                        <text
                          x={x + barWidth / 2}
                          y="166"
                          className="text-[8px] font-mono fill-slate-400"
                          textAnchor="middle"
                        >
                          {((count / totalN) * 100).toFixed(0)}%
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Darabszám-állító gombok oszloponként */}
              <div className="grid grid-cols-5 gap-2 w-full max-w-[340px] mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {[1, 2, 3, 4, 5].map((g) => (
                  <div key={`ctrl-${g}`} className="flex flex-col items-center gap-1">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {g}-es
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateCount(g, -1)}
                        className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCount(g, 1)}
                        className="w-5 h-5 rounded bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mutatók Kijelző Kártya (5 col) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2.5">
                <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  Kiszámított Statisztikai Mutatók:
                </span>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Mintanagyság (N):</span>
                    <span className="font-bold text-emerald-900 dark:text-emerald-100">{totalN} tanuló</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Számtani átlag (x̄):</span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">{average}</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Módusz (Mo - leggyakoribb):</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">
                      {modes.length > 0 ? modes.join(', ') : 'Nincs'} ({maxCount} db)
                    </span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Medián (Me - sorba rendezett közép):</span>
                    <span className="font-bold text-purple-700 dark:text-purple-300">{median}</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40">
                    <span className="text-slate-600 dark:text-slate-400">Terjedelem (R = max - min):</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">{range}</span>
                  </div>
                </div>
              </div>

              {/* Információs kártya */}
              <div className="p-3 bg-teal-50/70 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-900 text-xs text-teal-900 dark:text-teal-200 space-y-1">
                <span className="font-black flex items-center gap-1 text-[11px] uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  <Lightbulb className="w-3.5 h-3.5" /> Észrevetted?
                </span>
                <p className="leading-relaxed">
                  A <strong>számtani átlag</strong> érzékeny az egyes szélső jegyekre (ha beírsz egy 1-est, azonnal lehúzza). Ezzel szemben a <strong>mediánt</strong> egyetlen kiugró adat alig mozdítja el!
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 1. SZAKASZ: ADATOK ÉS GYAKORISÁGOK */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. Adatok, Mintanagyság és Gyakoriságok"
        subtitle="Hogyan rendszerezzük a nyers adatokat táblázatos formában?"
        badge="Alapfogalmak"
        icon={<Compass className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TheoryCard
            title="Mintanagyság (N)"
            subtitle="Az összes megfigyelés száma"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az adathalmazban található összes elem száma. Például ha egy osztályban 25 tanuló írt dolgozatot, akkor a mintanagyság N = 25.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Abszolút Gyakoriság (k)"
            subtitle="Hányszor fordul elő egy adat?"
            icon={<BarChart3 className="w-4 h-4 text-blue-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Megmutatja, hogy egy konkrét érték hányszor szerepel a mintában. Pl. ha 9 tanuló kapott 4-est, akkor a 4-es jegy abszolút gyakorisága k = 9.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Relatív Gyakoriság (k/N)"
            subtitle="Arány és százalékos részarány"
            icon={<Percent className="w-4 h-4 text-purple-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az abszolút gyakoriság és az összes adatszám hányadosa: k / N. Kifejezhető tört, tizedestört és százalékos alakban is.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout title="A Relatív Gyakoriságok Aranyszabálya" variant="success">
          <p className="text-xs leading-relaxed">
            Egy adathalmaz összes lehetséges kimenetelének relatív gyakoriságát összeadva <strong>pontosan 1-et</strong> (százalékban <strong>100%-ot</strong>) kapunk:
          </p>
          <div className="p-2.5 mt-2 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 text-center font-mono text-xs font-bold text-emerald-800 dark:text-emerald-200">
            Relatív gyakoriságok összege = k₁/N + k₂/N + ... + km/N = N/N = 1 (100%)
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: A KÖZÉPÉRTÉKEK VILÁGA */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. A 3 Középérték: Átlag, Módusz, Medián"
        subtitle="Hogyan jellemezzük egyetlen reprezentatív számmal az egész adathalmazt?"
        badge="Középértékek"
        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-200 dark:border-blue-900 space-y-2">
              <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-300">
                1. Számtani Átlag (x̄)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Az adatok összege elosztva az adatok számával:
                <br />
                <span className="font-mono font-bold text-blue-900 dark:text-blue-200 block my-1">
                  x̄ = (x₁ + x₂ + ... + xN) / N
                </span>
                Gyakorisági táblázatnál súlyozottan számoljuk: az értékeket megszorozzuk a darabszámukkal.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300">
                2. Módusz (Mo)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A mintában a <strong>leggyakrabban</strong> előforduló érték (a diagram legmagasabb oszlopa).
                <br />
                Lehet egyetlen módusz, lehet több is (ha holtverseny van), vagy egy sem (ha minden adat egyszer szerepel).
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-purple-200 dark:border-purple-900 space-y-2">
              <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300">
                3. Medián (Me)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A <strong>növekvő sorba rendezett</strong> adatok középső eleme:
                <br />• <strong>Páratlan N:</strong> a pontosan középen álló adat.
                <br />• <strong>Páros N:</strong> a két középső adat számtani átlaga.
              </p>
            </div>
          </div>

          <TheoryTable
            headers={['Középérték', 'Mikor érdemes használni?', 'Érzékenység kiugró értékekre']}
            rows={[
              ['Számtani átlag (x̄)', 'Egyenletes eloszlású, kiugró adatoktól mentes mintáknál (pl. jegyátlag)', 'Nagyon érzékeny (egy kirívó érték eltorzíthatja)'],
              ['Medián (Me)', 'Erősen ferde vagy kiugró értékeket tartalmazó adatoknál (pl. fizetések, vagyoni helyzet)', 'Robusztus, nem érzékeny a szélső értékekre'],
              ['Módusz (Mo)', 'Kategóriák és nem-számszerű adatok esetén is (pl. legnépszerűbb szín, cipőméret)', 'Csak a legnépszerűbb csoportot mutatja']
            ]}
          />

          <TheoryTrapBox title="Gyakori hiba a medián keresésekor:">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Soha ne keresd a mediánt a nyers, rendezetlen számsorban! Ha az adatok: 9, 2, 7, akkor a medián <strong>NEM a 2</strong>! Először <strong>kötelező növekvő sorrendbe állítani</strong>: 2, 7, 9 &rarr; a helyes medián a <strong>7</strong>!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: TERJEDELEM ÉS SZÓRÓDÁS */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Miért nem elég csak az átlag? A Terjedelem"
        subtitle="Hogyan mérjük meg az adatok szóródását, szétterülését?"
        badge="Szóródási Mutatók"
        icon={<Layers className="w-5 h-5 text-amber-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Két osztályban a dolgozatok átlaga egyaránt pontosan <strong>3,5</strong> lehet, a diákok tudása mégis teljesen más:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 dark:text-slate-100">"A" Osztály: Kiegyensúlyozott tudás</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Jegyek: 3, 3, 4, 4 &rarr; Átlag = 3,5<br />
                Minimum = 3, Maximum = 4 &rarr; <strong>Terjedelem R = 4 - 3 = 1</strong>
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 dark:text-slate-100">"B" Osztály: Erősen megosztott tudás</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Jegyek: 1, 1, 1, 5, 5, 5 &rarr; Átlag = 3,5<br />
                Minimum = 1, Maximum = 5 &rarr; <strong>Terjedelem R = 5 - 1 = 4</strong>
              </p>
            </div>
          </div>

          <TheoryCallout title="A Terjedelem (R) Képlete" variant="warning">
            <p className="text-xs leading-relaxed">
              A <strong>terjedelem</strong> a legnagyobb és a legkisebb adat közötti távolság:
              <br />
              <span className="font-mono font-bold text-sm text-amber-900 dark:text-amber-200 block my-1">
                R = x_max - x_min
              </span>
              Megmutatja, milyen széles sávban helyezkednek el a mért adatok.
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: DIAGRAMOK ÉS KÖRDIAGRAM KÖZÉPPONTI SZÖGE */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Diagramok Készítése és a Kördiagram Középponti Szöge"
        subtitle="Hogyan alakítjuk át a százalékos relatív gyakoriságot körcikk-szöggé?"
        badge="Grafikus Ábrázolás"
        icon={<PieChart className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 space-y-3">
            <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300">
              A Körcikk Középponti Szögének (α) Kiszámítása
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A teljes kör középponti szöge <strong>360°</strong>, ami a 100%-os egésznek felel meg. Egy kategória körcikkének szöge egyenesen arányos a relatív gyakoriságával:
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-200 font-mono text-center text-xs font-bold text-indigo-900 dark:text-indigo-200">
              α = (Relatív gyakoriság) · 360° = (k / N) · 360°
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-center">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">50% = 180°</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">25% = 90°</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">10% = 36°</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">5% = 18°</div>
            </div>
          </div>

          <TheoryTrapBox title="Átlagok átlaga csapda:">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha az 8.A osztály átlaga 4,0 (30 tanuló), a 8.B osztály átlaga pedig 3,0 (10 tanuló), akkor a két osztály közös átlaga <strong>NEM (4,0 + 3,0) / 2 = 3,5</strong>!
              <br />
              Mivel az 8.A-ban háromszor annyian vannak, az ő eredményük háromszor nagyobb súllyal számít:
              <br />
              Összes jegy: 30 · 4,0 + 10 · 3,0 = 120 + 30 = 150. Összes tanuló: 40 fő.
              <br />
              Valódi átlag: <strong>150 / 40 = 3,75</strong>!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FrequencyStatisticsTheory;
