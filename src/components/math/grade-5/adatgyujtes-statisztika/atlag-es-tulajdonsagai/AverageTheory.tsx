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
  Calculator,
  Scale,
  TrendingUp,
  TrendingDown,
  Equal,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  Info,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface AverageTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const AverageTheory: React.FC<AverageTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // =========================================================================
  // Interaktív Kiegyenlítő Szimulátor (Oszlopok kiegyenlítése)
  // =========================================================================
  const [values, setValues] = useState<number[]>([2, 8, 3, 7]);
  const [showBalanced, setShowBalanced] = useState<boolean>(false);

  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const count = values.length;
  const average = Number((sum / count).toFixed(2));

  const handleModify = (index: number, delta: number) => {
    setShowBalanced(false);
    setValues(prev => {
      const next = [...prev];
      const newVal = Math.max(1, Math.min(10, next[index] + delta));
      next[index] = newVal;
      return next;
    });
  };

  const handleReset = () => {
    setValues([2, 8, 3, 7]);
    setShowBalanced(false);
  };

  const handleBalance = () => {
    setShowBalanced(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  // =========================================================================
  // Interaktív Új Adat Hatása Szimulátor
  // =========================================================================
  const [baseGrades, setBaseGrades] = useState<number[]>([4, 4, 4, 4]); // Átlag: 4.0
  const [newGrade, setNewGrade] = useState<number>(5);

  const baseSum = baseGrades.reduce((a, b) => a + b, 0);
  const baseAvg = Number((baseSum / baseGrades.length).toFixed(2));

  const newSum = baseSum + newGrade;
  const newAvg = Number((newSum / (baseGrades.length + 1)).toFixed(2));

  return (
    <TheoryTemplate
      title="4. Átlag és Tulajdonságai"
      subtitle="A számtani közép fogalma, a kiegyenlítés elve, az átlag 4 aranytulajdonsága és a hiányzó adatok kiszámítása"
      themeColor="amber"
      color="amber"
      badgeText="5. OSZTÁLY • VII. TÉMAKÖR: ADATGYŰJTÉS, STATISZTIKA • 📖 TANANYAG"
      documentId="grade-5-atlag-theory"
      pdfFilename="5_osztaly_VII_4_atlag_tananyag.pdf"
      practiceTitle="Készen állsz az átlagszámítás gyakorlására?"
      practiceSubtitle="Teszteld tudásodat a számtani közép, a kiegyenlítés és a hiányzó dolgozatjegyek kiszámításában!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      summaryContent={
        <div className="space-y-4">
          <p className="text-sm">
            Az <strong>átlag (számtani közép)</strong> a matematika és a mindennapi élet egyik leggyakrabban használt statisztikai mutatója.
            Azt fejezi ki, hogy mekkora lenne az egyes adatok értéke, ha az összeset egy közös halomba gyűjtenénk, majd <strong>egyformán, igazságosan szétosztanánk</strong> az összes résztvevő között.
          </p>

          <FormulaBox
            title="A számtani közép (átlag) alapkészlete"
            formula="\text{Átlag} = \frac{\text{Adatok összege}}{\text{Adatok darabszáma}} \quad \Longleftrightarrow \quad \text{Összeg} = \text{Átlag} \times \text{Darabszám}"
            description="Összeadjuk a vizsgált értékeket, majd az összeget elosztjuk a tagok darabszámával. Visszafelé: az összeg az átlag és a darabszám szorzata."
          />

          {/* Interaktív Kiegyenlítő Szimulátor */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Interaktív Kiegyenlítő Szimulátor: A Kockatornyok Átlaga</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="h-8 text-xs border-amber-300 dark:border-amber-700"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Alaphelyzet
                </Button>
                <Button
                  size="sm"
                  onClick={handleBalance}
                  className="h-8 text-xs bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Kiegyenlítés!
                </Button>
              </div>
            </div>

            <p className="text-xs text-amber-800 dark:text-amber-300">
              Képzeld el, hogy 4 barátnak kockatornyai vannak ({values.join(', ')} kocka).
              Módosítsd a tornyok magasságát a gombokkal, majd kattints a <strong>Kiegyenlítés</strong> gombra, hogy lásd, hogyan egyenlítődnek ki a tornyok az átlagos szintre!
            </p>

            {/* Vizualizációs oszlopok */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-amber-100 dark:border-slate-800">
              <div className="relative h-44 flex items-end justify-around border-b-2 border-slate-300 dark:border-slate-700 pb-2">
                {/* Vízszintes Átlagvonal */}
                <div
                  className="absolute left-0 right-0 border-t-2 border-dashed border-amber-500 z-10 transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ bottom: `${(average / 10) * 100}%` }}
                >
                  <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded shadow">
                    Átlag: {average}
                  </span>
                </div>

                {values.map((val, idx) => {
                  const displayHeight = showBalanced ? average : val;
                  const diffFromAvg = Number((val - average).toFixed(2));
                  const isPositive = diffFromAvg > 0;
                  const isZero = diffFromAvg === 0;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 w-16 z-0">
                      {/* Eltérés címke */}
                      <span className={`text-[11px] font-bold ${
                        isZero
                          ? 'text-slate-400'
                          : isPositive
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {isZero ? '0' : (isPositive ? `+${diffFromAvg}` : `${diffFromAvg}`)}
                      </span>

                      {/* Maga az oszlop */}
                      <div
                        className="w-12 rounded-t-md transition-all duration-700 flex flex-col justify-end items-center text-white font-bold text-xs shadow-md"
                        style={{
                          height: `${(displayHeight / 10) * 140}px`,
                          backgroundColor: showBalanced ? '#f59e0b' : '#3b82f6'
                        }}
                      >
                        <span className="mb-1">{showBalanced ? average : val}</span>
                      </div>

                      {/* Név / Sorszám */}
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {idx + 1}. torony
                      </span>

                      {/* +/- gombok */}
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => handleModify(idx, -1)}
                          disabled={val <= 1}
                          className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs flex items-center justify-center disabled:opacity-30"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleModify(idx, 1)}
                          disabled={val >= 10}
                          className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs flex items-center justify-center disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Számítási összefoglaló sáv */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                  <span className="text-slate-500 dark:text-slate-400 block">Összeg:</span>
                  <span className="font-bold text-sm text-amber-700 dark:text-amber-300">{sum} kocka</span>
                </div>
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                  <span className="text-slate-500 dark:text-slate-400 block">Darabszám:</span>
                  <span className="font-bold text-sm text-amber-700 dark:text-amber-300">{count} torony</span>
                </div>
                <div className="p-2 rounded bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700">
                  <span className="text-slate-600 dark:text-slate-300 block">Számított Átlag:</span>
                  <span className="font-bold text-sm text-amber-900 dark:text-amber-100">{sum} : {count} = {average}</span>
                </div>
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-slate-500 dark:text-slate-400 block">Eltérések összege:</span>
                  <span className="font-bold text-sm text-emerald-700 dark:text-emerald-300">Mindig 0!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* =================================================================== */}
      {/* 1. SZEKCIÓ: A SZÁMTANI KÖZÉP KISZÁMÍTÁSA                            */}
      {/* =================================================================== */}
      <TheorySection
        title="1. A számtani közép (átlag) kiszámítása"
        color="amber"
      >
        <TheoryCard title="Mit jelent és hogyan számoljuk ki az átlagot?" color="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            A hétköznapi életben állandóan találkozunk az átlaggal: <em>tanulmányi átlag, havi átlaghőmérséklet, átlagos magasság, átlagsebesség</em>.
            A számtani közép kiszámításának aranyszabálya két egyszerű lépésből áll:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">1</span>
                <span>Összeadás (Összegzés)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Add össze az összes megfigyelt adatot. Ez a közös „kalap”, a teljes mennyiség.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">2</span>
                <span>Osztás a darabszámmal</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Az összeget oszd el az adatok darabszámával (ahány számot összeadtál).
              </p>
            </div>
          </div>

          {/* Vizuális Szétosztási Diagram: 4 különböző toronyból 4 egyforma torony */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 shadow-2xs">
            <div className="text-xs font-bold text-amber-950 dark:text-amber-200 mb-3 flex items-center gap-1.5">
              <span>📊</span>
              <span>Szemléltető Ábra: Különböző mennyiségek igazságos szétosztása</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-2">
              {/* Bal oldal: Eredeti tornyok */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2">1. Eredeti tornyok (2, 6, 3, 5 kocka)</span>
                <div className="flex items-end gap-2.5 h-28 pb-1 border-b-2 border-slate-300 dark:border-slate-700">
                  <div className="w-8 bg-blue-400 dark:bg-blue-600 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '32px' }}>2</div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '96px' }}>6</div>
                  <div className="w-8 bg-blue-400 dark:bg-blue-600 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '48px' }}>3</div>
                  <div className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '80px' }}>5</div>
                </div>
                <span className="text-[11px] text-slate-700 dark:text-slate-300 mt-2 font-semibold">Összeg: 2 + 6 + 3 + 5 = 16 kocka</span>
              </div>

              {/* Középső nyíl: Összeadás és szétosztás */}
              <div className="flex flex-col items-center text-amber-600 dark:text-amber-400 py-2">
                <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700 shadow-2xs">
                  16 : 4 = 4
                </span>
                <span className="text-xl my-1">➔</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Szétosztás 4 felé</span>
              </div>

              {/* Jobb oldal: Kiegyenlített tornyok */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-2">2. Kiegyenlített átlag (mindenhol 4 kocka)</span>
                <div className="flex items-end gap-2.5 h-28 pb-1 border-b-2 border-amber-500">
                  <div className="w-8 bg-amber-500 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '64px' }}>4</div>
                  <div className="w-8 bg-amber-500 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '64px' }}>4</div>
                  <div className="w-8 bg-amber-500 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '64px' }}>4</div>
                  <div className="w-8 bg-amber-500 rounded-t flex items-center justify-center text-white text-[11px] font-bold shadow-2xs" style={{ height: '64px' }}>4</div>
                </div>
                <span className="text-[11px] text-amber-800 dark:text-amber-300 mt-2 font-bold">Átlagos magasság = 4 kocka</span>
              </div>
            </div>
          </div>

          <ExampleBox
            title="1. Mintapélda: Osztályzatok átlaga"
            color="amber"
            problem="Anna matematikából a következő érdemjegyeket kapta ebben a hónapban: 5, 4, 3, 5, 3. Mennyi az átlaga?"
            steps={[
              "1. lépés: Számoljuk ki az érdemjegyek összegét: 5 + 4 + 3 + 5 + 3 = 20",
              "2. lépés: Számoljuk meg, hány darab jegye van: összesen 5 darab jegy.",
              "3. lépés: Osszuk el az összeget a darabszámmal: 20 : 5 = 4,0"
            ]}
            solution="Anna matematika átlaga pontosan 4,0 (jó rendű)."
          />

          <ExampleBox
            title="2. Mintapélda: Tizedestört eredmény az átlagnál"
            color="amber"
            problem="Bence 4 dolgozatára a következő pontszámokat kapta: 4, 5, 4, 5. Mennyi az átlagpontszáma?"
            steps={[
              "1. lépés: Összeg kiszámítása: 4 + 5 + 4 + 5 = 18 pont.",
              "2. lépés: Dolgozatok száma: 4 darab.",
              "3. lépés: Osztás elvégzése: 18 : 4 = 4,5 pont."
            ]}
            solution="Bence átlaga 4,5. Nagyon fontos megjegyezni: az átlag nagyon gyakran tizedestört, még akkor is, ha minden kiinduló adat egész szám volt!"
          />

          <TheoryCallout type="tip">
            <strong>Nem létező értékek az átlagban:</strong> Ha egy családban 2 gyerek van, egy másikban 1, a harmadikban pedig 2, akkor az átlagos gyerekszám: (2 + 1 + 2) : 3 = 5 : 3 ≈ 1,67. Természetesen senkinek sincs 0,67 gyereke; az átlag egy <em>statisztikai mutató</em>, amely a sokaság jellemzésére szolgál.
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 2. SZEKCIÓ: A KIEGYENLÍTÉS ELVE ÉS A MÉRLEG                        */}
      {/* =================================================================== */}
      <TheorySection
        title="2. A kiegyenlítés elve és a mérleg-szemlélet"
        color="amber"
      >
        <TheoryCard title="Miért viselkedik az átlag úgy, mint egy kétkarú mérleg?" color="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Képzelj el egy fizikai mérleget vagy egy folyadékkal teli közlekedőedényt: ha a magasabb szintekről átfolyik a víz az alacsonyabb szintekre, mindenütt beáll egyetlen közös magasság.
          </p>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 mb-3">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-2">
              ⚖️ A zéró összegű eltérések törvénye
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha kiszámoljuk minden egyes adat eltérését az átlagtól:
              <br />
              • Az átlagnál <strong>nagyobb</strong> értékek pozitív eltérést adnak (többlet, +).
              <br />
              • Az átlagnál <strong>kisebb</strong> értékek negatív eltérést adnak (hiány, −).
              <br />
              • <strong>A többletek és a hiányok összege mindig pontosan 0!</strong>
            </p>
          </div>

          {/* Kétkarú Mérleg Vizuális Ábra: Az átlag mint alátámasztási pont */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800 shadow-2xs">
            <div className="text-xs font-bold text-amber-950 dark:text-amber-200 mb-2 flex items-center gap-1.5">
              <span>⚖️</span>
              <span>Szemléltető Ábra: Az átlag a számsor tökéletes egyensúlyi súlypontja</span>
            </div>

            <div className="flex flex-col items-center py-2">
              <svg className="w-full max-w-md h-36 overflow-visible" viewBox="0 0 400 135">
                {/* Alátámasztási háromszög (Fulcrum) az átlagnál: x = 200 */}
                <polygon points="200,85 185,115 215,115" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                <rect x="160" y="115" width="80" height="6" rx="2" fill="#d97706" />
                <text x="200" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Átlag = 5 (Súlypont)</text>

                {/* Vízszintes mérlegrúd */}
                <line x1="40" y1="85" x2="360" y2="85" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
                <circle cx="200" cy="85" r="4" fill="#f59e0b" />

                {/* Bal kar: Hiány (negatív eltérések) */}
                {/* 2-es szám (távolság -3) */}
                <g>
                  <line x1="80" y1="85" x2="80" y2="55" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
                  <rect x="66" y="27" width="28" height="28" rx="5" fill="#fee2e2" stroke="#f43f5e" strokeWidth="2" />
                  <text x="80" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e11d48">2</text>
                  <text x="80" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e11d48">-3 hiány</text>
                </g>

                {/* 3-as szám (távolság -2) */}
                <g>
                  <line x1="120" y1="85" x2="120" y2="55" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
                  <rect x="106" y="27" width="28" height="28" rx="5" fill="#fee2e2" stroke="#f43f5e" strokeWidth="2" />
                  <text x="120" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e11d48">3</text>
                  <text x="120" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e11d48">-2 hiány</text>
                </g>

                {/* Jobb kar: Többlet (pozitív eltérések) */}
                {/* 7-es szám (távolság +2) */}
                <g>
                  <line x1="280" y1="85" x2="280" y2="55" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
                  <rect x="266" y="27" width="28" height="28" rx="5" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
                  <text x="280" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">7</text>
                  <text x="280" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">+2 többlet</text>
                </g>

                {/* 8-as szám (távolság +3) */}
                <g>
                  <line x1="320" y1="85" x2="320" y2="55" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
                  <rect x="306" y="27" width="28" height="28" rx="5" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
                  <text x="320" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">8</text>
                  <text x="320" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">+3 többlet</text>
                </g>
              </svg>

              <div className="text-center mt-3 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-900 dark:text-amber-200">
                Hiány (−3) + (−2) = −5 &nbsp;|&nbsp; Többlet (+2) + (+3) = +5 &nbsp;➔&nbsp; Összeg = 0 (Egyensúly!)
              </div>
            </div>
          </div>

          <ExampleBox
            title="Mintapélda az eltérések kiegyenlítődésére"
            color="amber"
            problem="Vizsgáljuk meg a 2, 8, 3, 7 számsort! Átlaguk: (2 + 8 + 3 + 7) : 4 = 20 : 4 = 5."
            steps={[
              "1. szám (2): 2 − 5 = −3 (3 hiányzik az átlaghoz)",
              "2. szám (8): 8 − 5 = +3 (3-mal több az átlagnál)",
              "3. szám (3): 3 − 5 = −2 (2 hiányzik az átlaghoz)",
              "4. szám (7): 7 − 5 = +2 (2-vel több az átlagnál)",
              "Eltérések összege: (−3) + (+3) + (−2) + (+2) = 0! A mérleg tökéletes egyensúlyban van."
            ]}
            solution="Az átlag a számsor súlypontja: pontosan ott támasztja alá az adatokat, ahol a pozitív és negatív nyomatékok kiegyenlítik egymást."
          />
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 3. SZEKCIÓ: AZ ÁTLAG 4 ARANYTULAJDONSÁGA                            */}
      {/* =================================================================== */}
      <TheorySection
        title="3. Az átlag 4 aranytulajdonsága"
        color="amber"
      >
        <TheoryCard title="Alapszabályok, amelyeket minden 5. osztályosnak ismernie kell" color="amber">
          <div className="space-y-4">
            {/* 1. Tulajdonság */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">1</span>
                <span>Közrefogási tulajdonság (A határok szabálya)</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
                Az átlag <strong>mindig a legkisebb és a legnagyobb adat közé esik</strong>:
              </p>
              <div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded text-center font-bold text-slate-800 dark:text-slate-200">
                Minimum ≤ Átlag ≤ Maximum
              </div>

              {/* Számegyenes szemléltetés */}
              <div className="p-3 my-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center shadow-2xs">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Vizuális helyzet a számegyenesen:</span>
                <svg className="w-full max-w-xs h-12" viewBox="0 0 280 44">
                  <line x1="20" y1="20" x2="260" y2="20" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                  {/* Min marker: x = 50 */}
                  <circle cx="50" cy="20" r="5" fill="#f43f5e" />
                  <text x="50" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f43f5e">Min (3)</text>
                  {/* Max marker: x = 230 */}
                  <circle cx="230" cy="20" r="5" fill="#3b82f6" />
                  <text x="230" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3b82f6">Max (5)</text>
                  {/* Highlighted range */}
                  <line x1="50" y1="20" x2="230" y2="20" stroke="#f59e0b" strokeWidth="4" />
                  {/* Átlag marker: x = 140 */}
                  <polygon points="140,11 133,2 147,2" fill="#f59e0b" />
                  <circle cx="140" cy="20" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  <text x="140" y="38" textAnchor="middle" fontSize="11" fontWeight="extrabold" fill="#d97706">Átlag (4)</text>
                </svg>
                <span className="text-[10px] text-slate-500 italic mt-0.5">Az átlag soha nem eshet a színes sávon kívülre!</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Ha a dolgozataid jegyei 3, 4 és 5, akkor az átlagod kizárt, hogy 2 legyen (mert a legkisebb a 3), és kizárt, hogy 6 legyen (mert a legnagyobb az 5).
                Ha az összes adat megegyezik (pl. minden dolgozatod 4-es), akkor az átlag is pontosan 4.
              </p>
            </div>

            {/* 2. Tulajdonság */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">2</span>
                <span>Új adat belépésének hatása</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
                Hogyan változik a meglévő átlag, ha egy új értéket veszünk hozzá?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Új adat &gt; Átlag
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Az átlag <strong>NÖVEKSZIK</strong></span>
                </div>
                <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
                  <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center justify-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Új adat &lt; Átlag
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Az átlag <strong>CSÖKKEN</strong></span>
                </div>
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
                  <div className="font-bold text-blue-800 dark:text-blue-300 flex items-center justify-center gap-1">
                    <Equal className="w-3.5 h-3.5" /> Új adat = Átlag
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Az átlag <strong>VÁLTOZATLAN</strong></span>
                </div>
              </div>

              {/* Interaktív kis mini-szimulátor */}
              <div className="mt-3 p-2.5 rounded bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Alap 4 jegyed átlaga: </span>
                  <span className="font-bold text-amber-700 dark:text-amber-300">4,0</span>
                  <span className="text-slate-600 dark:text-slate-400 ml-2">Új jegyed: </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(grade => (
                    <button
                      key={grade}
                      onClick={() => setNewGrade(grade)}
                      className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                        newGrade === grade
                          ? 'bg-amber-600 text-white shadow'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold w-full sm:w-auto text-right">
                  Új átlag: <span className={newAvg > 4 ? 'text-emerald-600' : newAvg < 4 ? 'text-rose-600' : 'text-blue-600'}>{newAvg}</span>
                  <span className="text-[11px] font-normal text-slate-500 ml-1">
                    ({newAvg > 4 ? '↑ felment' : newAvg < 4 ? '↓ leromlott' : '= maradt'})
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Tulajdonság */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">3</span>
                <span>Eltolási és nyújtási szabály (Minden adat változtatása)</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                • <strong>Hozzáadás:</strong> Ha az összes adathoz hozzáadunk ugyanannyit (+k), az átlag is pontosan k-val növekszik.
                <br />
                <em>Például:</em> Ha egy osztályban 1 év alatt minden diák 4 cm-t nő, az osztály átlagmagassága is pontosan 4 cm-rel nő.
              </p>

              {/* Eltolás vizuális ábra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <div className="font-bold text-amber-900 dark:text-amber-200 mb-1">Eredeti magasságok</div>
                  <div className="text-slate-600 dark:text-slate-400">135 cm, 140 cm, 145 cm</div>
                  <div className="font-bold text-amber-600 dark:text-amber-400 mt-1">Eredeti átlag: 140 cm</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 mb-1">+4 cm növekedés után</div>
                  <div className="text-slate-600 dark:text-slate-400">139 cm, 144 cm, 149 cm</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-1">Új átlag: 144 cm (+4 cm!)</div>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                • <strong>Szorzás:</strong> Ha minden adatot megszorzunk k-val, az átlag is a k-szorosára változik.
              </p>
            </div>

            {/* 4. Tulajdonság */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">4</span>
                <span>Visszafelé számolás: Az Összeg Képlete</span>
              </div>
              <div className="font-mono text-xs bg-amber-50 dark:bg-amber-950/60 p-2 rounded text-center font-bold text-amber-900 dark:text-amber-200 mb-2">
                Összeg = Átlag × Darabszám
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Ha ismerjük az átlagot és a darabszámot, azonnal tudjuk az összes adat összegét! Ez a legfontosabb eszköz a hiányzó dolgozatjegyek és felmérési adatok kinyomozásához.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 4. SZEKCIÓ: HIÁNYZÓ ADAT KISZÁMÍTÁSA ÉS SZÉLSŐSÉGES ÉRTÉKEK        */}
      {/* =================================================================== */}
      <TheorySection
        title="4. Hiányzó adatok kinyomozása és kiugró értékek"
        color="amber"
      >
        <TheoryCard title="Hogyan számoljuk ki a hiányzó dolgozatjegyet?" color="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Tipikus dolgozatfeladat: <em>„Kati eddig három 4-est és egy 5-öst kapott. Mennyit kell kapnia az 5. dolgozatra, hogy 4,4 legyen az átlaga?”</em>
          </p>

          <ExampleBox
            title="Mintapélda: Hiányzó érdemjegy kiszámítása"
            color="amber"
            problem="Peti 3 dolgozatot írt: 5, 4, 3. Szeretné, ha a 4. dolgozat megírása után az átlaga pontosan 4,0 lenne. Hányas jegyet kell szereznie a 4. dolgozatra?"
            steps={[
              "1. lépés: Mennyi lesz az új darabszám? 4 dolgozat.",
              "2. lépés: Mennyi legyen a 4 dolgozat ÖSSZEGE az áhított 4,0 átlaghoz? Összeg = Átlag × Darabszám = 4,0 × 4 = 16.",
              "3. lépés: Mennyi Peti meglévő 3 jegyének összege? 5 + 4 + 3 = 12.",
              "4. lépés: Mennyi hiányzik a 16-hoz? 16 − 12 = 4."
            ]}
            solution="Peti a 4. dolgozatra 4-es érdemjegyet (jó) kell kapjon, hogy az átlaga 4,0 maradjon."
          />

          <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-1">
              ⚠️ A szélsőséges értékek (kiugró adatok - Outlierek) hatása
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az átlag legnagyobb gyengesége, hogy <strong>nagyon érzékeny az extrém kiugró értékekre</strong>.
              <br />
              <em>Példa:</em> Egy kis falusi utcában 4 család havi bevétele 300 000 Ft. Beköltözik egy milliárdos, akinek a havi bevétele 10 300 000 Ft.
              <br />
              Az 5 család átlagos bevétele: (4 × 300 000 + 10 300 000) : 5 = 11 500 000 : 5 = 2 300 000 Ft.
              <br />
              Bár az átlag 2,3 millió Ft, valójában 4 család továbbra is csak 300 000 Ft-ból él! Ezért az átlag mellé mindig érdemes megnézni a <strong>móduszt</strong> és a <strong>terjedelmet</strong> is.
            </p>

            {/* Outlier vizuális diagram */}
            <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/80">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 text-center">
                Vizuális szemléltetés: Hogyan torzít egyetlen kiugró adat?
              </div>
              <div className="w-full flex justify-center overflow-x-auto py-1">
                <svg viewBox="0 0 460 170" className="w-full max-w-md h-auto select-none font-sans">
                  {/* Háttér segédvonalak */}
                  <line x1="30" y1="135" x2="430" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
                  
                  {/* 4 normál család oszlopai */}
                  <rect x="45" y="120" width="35" height="15" rx="3" fill="#3b82f6" />
                  <text x="62" y="113" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">300 eFt</text>
                  <text x="62" y="148" textAnchor="middle" fontSize="9" fill="#64748b">1. cs.</text>

                  <rect x="105" y="120" width="35" height="15" rx="3" fill="#3b82f6" />
                  <text x="122" y="113" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">300 eFt</text>
                  <text x="122" y="148" textAnchor="middle" fontSize="9" fill="#64748b">2. cs.</text>

                  <rect x="165" y="120" width="35" height="15" rx="3" fill="#3b82f6" />
                  <text x="182" y="113" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">300 eFt</text>
                  <text x="182" y="148" textAnchor="middle" fontSize="9" fill="#64748b">3. cs.</text>

                  <rect x="225" y="120" width="35" height="15" rx="3" fill="#3b82f6" />
                  <text x="242" y="113" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">300 eFt</text>
                  <text x="242" y="148" textAnchor="middle" fontSize="9" fill="#64748b">4. cs.</text>

                  {/* 1 kiugró adat (Milliárdos) */}
                  <rect x="300" y="20" width="45" height="115" rx="3" fill="#e11d48" />
                  <text x="322" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#be123c">10 300 eFt!</text>
                  <text x="322" y="148" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#be123c">5. Kiugró</text>

                  {/* Számított átlag szaggatott vonal */}
                  <line x1="30" y1="80" x2="430" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,4" />
                  <rect x="350" y="70" width="80" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                  <text x="390" y="82" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#b45309">Átlag: 2,3 M Ft</text>

                  {/* Jelölő nyilak és magyarázat */}
                  <path d="M 62 100 L 62 85" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="152" y="65" textAnchor="middle" fontSize="8.5" fill="#ef4444" fontWeight="600">
                    ← A 4 család (80%) messze a számított átlag alatt él!
                  </text>
                </svg>
              </div>
              <div className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-1 italic">
                A 300 000 Ft-os jövedelem a valóságos típusos érték (módusz), a 2,3 millió Ft-os átlag viszont egyetlen kiugró adat miatt félrevezető!
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* Tipikus Csapdák Box */}
        <TheoryTrapBox
          traps={[
            {
              title: "Csapda 1: Két átlag átlaga NEM a számtani közepük, ha nem egyforma a létszám!",
              description: "Ha az 5.A (10 fő) átlaga 4,0 és az 5.B (20 fő) átlaga 5,0, akkor a két osztály közös átlaga NEM (4 + 5) : 2 = 4,5! Mivel az 5.B-ben kétszer annyian vannak, az ő eredményük kétszer akkora súllyal számít. Helyesen: (10 × 4 + 20 × 5) : 30 = 140 : 30 = 4,67."
            },
            {
              title: "Csapda 2: Zárójelek lehagyása a számológépben",
              description: "Ha beírod a számológépbe, hogy 3 + 4 + 5 : 3, a gép műveleti sorrend szerint először elvégzi az 5 : 3-at, és ahhoz adja hozzá a 3-at meg a 4-et! Mindig használd a zárójelet: (3 + 4 + 5) : 3 = 12 : 3 = 4."
            },
            {
              title: "Csapda 3: Összetéveszteni a leggyakoribb értékkel (módusszal)",
              description: "Az átlag nem feltétlenül a leggyakoribb érték, sőt, nagyon sokszor olyan szám, ami egyetlen egyszer sem fordult elő az adatok között (pl. 4 és 5 átlaga 4,5)."
            }
          ]}
        />
      </TheorySection>

      {/* =================================================================== */}
      {/* 5. SZEKCIÓ: DOLGOZAT-ARANYSZABÁLYOK ÉS MEMORITER                   */}
      {/* =================================================================== */}
      <TheorySection
        title="5. Összefoglaló Aranyszabályok a Dolgozathoz (Memoriter)"
        color="amber"
      >
        <TheoryCard title="4 aranyszabály, amit soha ne felejts el!" color="amber">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Képlet */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    1
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Számtani közép képlete</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-amber-900 dark:text-amber-200 text-xs border border-amber-100 dark:border-amber-900 mb-2">
                  Átlag = Összeg : Darabszám
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Add össze az összes adatot, és oszd el annyival, ahány adatot összeadtál.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200/60 dark:border-amber-800/60 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                💡 Tipp: A gépbe zárójellel írd: (a + b + c) : 3!
              </div>
            </div>

            {/* 2. Kiegyenlítés */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    2
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Kiegyenlítés & Mérleg-elv</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-blue-900 dark:text-blue-200 text-xs border border-blue-100 dark:border-blue-900 mb-2">
                  Eltérések összege = 0
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Az átlagtól való negatív (hiány) és pozitív (többlet) eltérések pontosan kiegyenlítik egymást, mint a kétkarú mérlegen.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-blue-200/60 dark:border-blue-800/60 text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                💡 Forgáspont: az átlag a súlypont!
              </div>
            </div>

            {/* 3. Határok */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    3
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Határok aranyszabálya</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-emerald-900 dark:text-emerald-200 text-xs border border-emerald-100 dark:border-emerald-900 mb-2">
                  Legkisebb ≤ Átlag ≤ Legnagyobb
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Az átlag soha nem lehet kisebb a legkisebb adatnál, és soha nem lehet nagyobb a legnagyobbnál!
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                💡 Gyors ellenőrzés: ha kilóg a határokból, rossz a számolás!
              </div>
            </div>

            {/* 4. Visszafelé nyomozás */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border border-purple-200 dark:border-purple-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    4
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Visszafelé számolás képlete</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-purple-900 dark:text-purple-200 text-xs border border-purple-100 dark:border-purple-900 mb-2">
                  Összeg = Átlag × Darabszám
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A hiányzó dolgozatjegy vagy adat kinyomozásának kulcsa: számold ki a kívánt teljes összeget, majd vond ki belőle a meglévőket!
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-purple-200/60 dark:border-purple-800/60 text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                💡 Példa: 4 dolgozat 4,0 átlaghoz 16 pont kell összesen.
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
