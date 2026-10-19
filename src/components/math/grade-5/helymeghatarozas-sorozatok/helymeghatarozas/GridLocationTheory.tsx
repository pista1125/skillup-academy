import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Grid,
  Gamepad2,
  Table,
  ArrowRight,
  ArrowUp,
  ArrowLeft,
  ArrowDown,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Navigation,
  Crosshair,
  Footprints
} from 'lucide-react';

export interface GridLocationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const GridLocationTheory: React.FC<GridLocationTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Sakktábla Állapot ---
  const [selectedChessSquare, setSelectedChessSquare] = useState<string>('e4');

  const chessColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const chessRows = [8, 7, 6, 5, 4, 3, 2, 1];

  const getSquareColor = (colIdx: number, rowNum: number) => {
    // a1 fekete? sakkban: a1 sötét mező (colIdx 0 + rowNum 1 = 1 páratlan => sötét)
    return (colIdx + rowNum) % 2 === 0 ? 'dark' : 'light';
  };

  // --- 2. Interaktív Útvonal Szimulátor Állapot ---
  interface Step {
    dir: 'up' | 'down' | 'left' | 'right';
    count: number;
  }
  const [robotPos, setRobotPos] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [pathHistory, setPathHistory] = useState<{ x: number; y: number }[]>([{ x: 1, y: 1 }]);

  const moveRobot = (dx: number, dy: number) => {
    const newX = Math.max(1, Math.min(5, robotPos.x + dx));
    const newY = Math.max(1, Math.min(5, robotPos.y + dy));
    if (newX !== robotPos.x || newY !== robotPos.y) {
      const nextPos = { x: newX, y: newY };
      setRobotPos(nextPos);
      setPathHistory(prev => [...prev, nextPos]);
    }
  };

  const resetRobot = () => {
    setRobotPos({ x: 1, y: 1 });
    setPathHistory([{ x: 1, y: 1 }]);
  };

  return (
    <TheoryTemplate
      documentId="grade-5-grid-location-theory"
      pdfFilename="5_osztaly_V_2_helymeghatarozas_racshalon.pdf"
      title="Helymeghatározás a négyzethálón"
      subtitle="Tájékozódás a rácshálón, oszlopok és sorok sorrendje, a sakktábla és a torpedó játék koordinátái, táblázatkezelők (Excel) cellái és lépéssorozatok az útvonalakon"
      themeColor="indigo"
      emoji="🗺️"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 2. TANANYAG"
      quickRule={{
        label: 'A rácshálós koordináták alapszabálya',
        formula: '\\text{Mező azonosítója} = \\text{Oszlop (vízszintes betű)} + \\text{Sor (függőleges szám)} \\quad (\\text{pl. } e4, B3)'
      }}
      practiceTitle="Készen állsz a rácshálós feladványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses, 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A NÉGYZETHÁLÓ FELÉPÍTÉSE */}
      <TheorySection
        id="racshalo-alapok"
        title="1. A négyzetháló (rácsháló) és a koordináták elve"
        subtitle="Hogyan határozzuk meg egy síkbeli mező vagy pont helyét két egymásra merőleges iránnyal?"
        badge="ALAPOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Oszlopok és sorok megállapodása"
            badge="MEGÁLLAPODÁS"
            color="indigo"
            icon={<Grid className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>négyzetháló</strong> egymásra merőleges vízszintes és függőleges vonalakból áll.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1.5">
              <div>• <strong>Oszlopok (függőleges sávok):</strong> Általában balról jobbra betűzzük (A, B, C...) vagy számozzuk őket.</div>
              <div>• <strong>Sorok (vízszintes sávok):</strong> Általában alulról felfelé vagy fentről lefelé számozzuk őket (1, 2, 3...).</div>
              <div>• <strong>A cella (mező):</strong> Egy oszlop és egy sor közös része, kereszteződése.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A koordináta sorrendjének jelentősége"
            badge="FONTOS SZABÁLY"
            color="violet"
            icon={<Sparkles className="w-5 h-5 text-violet-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A matematikában és a játékokban <strong>szigorú megállapodás</strong> van a sorrendre:
            </p>
            <div className="mt-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-900 dark:text-violet-200 space-y-1.5">
              <div className="font-bold text-sm">Mindig az OSZLOP (vízszintes) adat áll elöl, és a SOR (függőleges) hátul!</div>
              <div>• <strong>B3</strong> $\neq$ <strong>C2</strong>! Ha felcseréled az adatokat, egy teljesen másik mezőre érsz!</div>
              <div>• <em>Gondolj a házszámozásra:</em> nem mindegy, hogy a 2. emelet 5. ajtó, vagy az 5. emelet 2. ajtó!</div>
            </div>
          </TheoryCard>
        </div>

        {/* Magyarázó Ábra: Oszlop vs Sor */}
        <div className="my-6">
          <GeometryFigureCard
            title="Szemléltető: Oszlopok és sorok metszéspontja"
            caption="A zölddel jelölt mező a C oszlop és a 3. sor metszéspontja: C3"
          >
            <svg className="w-full max-w-md h-48 mx-auto" viewBox="0 0 260 160">
              {/* Oszlop kiemelés (C) */}
              <rect x="110" y="20" width="35" height="115" fill="#e0e7ff" fillOpacity="0.7" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
              {/* Sor kiemelés (3) */}
              <rect x="30" y="55" width="165" height="28" fill="#fef3c7" fillOpacity="0.7" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
              
              {/* Rácsháló vonalak */}
              <rect x="30" y="20" width="165" height="115" fill="none" stroke="#94a3b8" strokeWidth="2" />
              {[65, 100, 135, 170].map(x => (
                <line key={x} x1={x} y1="20" x2={x} y2="135" stroke="#cbd5e1" strokeWidth="1.5" />
              ))}
              {[55, 83, 111].map(y => (
                <line key={y} x1="30" y1={y} x2="195" y2={y} stroke="#cbd5e1" strokeWidth="1.5" />
              ))}

              {/* Metszéspont (C3 mező) */}
              <rect x="110" y="55" width="35" height="28" fill="#10b981" stroke="#059669" strokeWidth="2" />
              <text x="127" y="73" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">C3</text>

              {/* Feliratok */}
              <text x="47" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">A</text>
              <text x="82" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">B</text>
              <text x="127" y="14" textAnchor="middle" fontSize="12" fontWeight="black" fill="#4f46e5">C oszlop ↓</text>
              <text x="162" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">D</text>

              <text x="215" y="40" fontSize="11" fontWeight="bold" fill="#475569">4</text>
              <text x="205" y="72" fontSize="11" fontWeight="black" fill="#d97706">← 3. sor</text>
              <text x="215" y="100" fontSize="11" fontWeight="bold" fill="#475569">2</text>
              <text x="215" y="128" fontSize="11" fontWeight="bold" fill="#475569">1</text>
            </svg>
          </GeometryFigureCard>
        </div>

        <TheoryTrapBox
          title="Típushiba: Mező (cella) vs. Rácsvonalak metszéspontja"
          description="A torpedóban és a sakkban a négyzetek BELESEJÉBE helyezzük a figurákat vagy lövéseket (cellás rendszer). A derékszögű koordináta-rendszerben (amit a következő tananyagban tanulunk) viszont a rácsvonalak METSZÉSPONTJÁT jelöljük ki! Fontos, hogy mindig tudd, mezőre vagy pontra hivatkozunk!"
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: A SAKKTÁBLA KOORDINÁTA-RENDSZERE */}
      <TheorySection
        id="sakktabla"
        title="2. A királyok játéka: A sakktábla felosztása"
        subtitle="8 oszlop (a-h) és 8 sor (1-8): a 64 mező világa"
        badge="SAKK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="A sakktábla szabályos elrendezése"
            badge="64 MEZŐ"
            color="amber"
            icon={<Gamepad2 className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A sakktábla egy $8 \times 8$-as négyzetháló, amelyen 64 mező található, felváltva világos és sötét színekben:
            </p>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>• <strong>Oszlopok (függőleges):</strong> Kisbetűkkel jelöljük balról jobbra: <strong>a, b, c, d, e, f, g, h</strong>.</li>
              <li>• <strong>Sorok (vízszintes):</strong> Alulról felfelé számozzuk a világos játékos szemszögéből: <strong>1, 2, 3, 4, 5, 6, 7, 8</strong>.</li>
              <li>• <strong>Kezdőállás:</strong> A világos tisztek az 1. sorban, a sötét tisztek a 8. sorban állnak. A gyalogok a 2. és 7. sorban sorakoznak.</li>
            </ul>
            <p className="mt-2 text-[11px] text-amber-800 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg">
              Alapszabály a tábla lerakásakor: a játékos jobb alsó sarkában mindig <em>világos</em> mezőnek (h1 vagy a8) kell lennie!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Híres mezők és a centrum"
            badge="STRATÉGIA"
            color="rose"
            icon={<Crosshair className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A sakktábla egyes részeinek külön elnevezése van a matematikában és a sakkban:
            </p>
            <div className="mt-2.5 space-y-2 text-xs">
              <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200">
                ⭐ <strong>A centrum (középmezők):</strong> A 4 legfontosabb központi mező: <strong>d4, e4, d5, e5</strong>. Innen a figurák a tábla legnagyobb részét tudják ellenőrizni.
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                🏰 <strong>Sarkok:</strong> Az a1, h1, a8, h8 mezők, ahol kezdetben a bástyák állnak.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Sakktábla */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-amber-600" />
                Interaktív Sakktábla: Kattints a mezőkre!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nézd meg, hogyan épül fel a mező neve az oszlopból és a sorból!
              </p>
            </div>
            <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
              Kiválasztott mező: {selectedChessSquare}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Sakktábla rács */}
            <div className="md:col-span-7 flex justify-center">
              <div className="inline-block p-2 rounded-2xl bg-amber-950 shadow-xl border-4 border-amber-900">
                {/* Oszlopok felül */}
                <div className="flex pl-6 pb-1">
                  {chessColumns.map(c => (
                    <div key={c} className="w-7 sm:w-9 text-center font-bold text-xs text-amber-200">{c}</div>
                  ))}
                </div>

                {chessRows.map(r => (
                  <div key={r} className="flex items-center">
                    <span className="w-6 text-center font-bold text-xs text-amber-200">{r}</span>
                    <div className="flex">
                      {chessColumns.map((c, cIdx) => {
                        const sqName = `${c}${r}`;
                        const isDark = getSquareColor(cIdx, r) === 'dark';
                        const isSelected = selectedChessSquare === sqName;
                        const isCenter = ['d4', 'e4', 'd5', 'e5'].includes(sqName);

                        return (
                          <button
                            key={sqName}
                            onClick={() => setSelectedChessSquare(sqName)}
                            className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-[10px] font-bold transition-all relative ${
                              isSelected
                                ? 'bg-amber-400 text-amber-950 ring-2 ring-white scale-110 z-10 shadow-lg'
                                : isDark
                                ? 'bg-amber-800 text-amber-100/60 hover:bg-amber-700'
                                : 'bg-amber-100 text-amber-900/60 hover:bg-amber-200'
                            }`}
                          >
                            {isSelected ? '♟️' : isCenter ? '•' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Információs kártya */}
            <div className="md:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Azonosított mező</div>
                <div className="text-3xl font-black text-amber-900 dark:text-amber-200 mt-1 font-mono">
                  {selectedChessSquare}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 space-y-1">
                  <div>• <strong>Oszlop:</strong> „{selectedChessSquare[0]}” oszlop</div>
                  <div>• <strong>Sor:</strong> {selectedChessSquare[1]}. vízszintes sor</div>
                  <div>
                    • <strong>Szín:</strong> {
                      getSquareColor(chessColumns.indexOf(selectedChessSquare[0]), parseInt(selectedChessSquare[1])) === 'dark'
                        ? 'Sötét (fekete) mező'
                        : 'Világos (fehér) mező'
                    }
                  </div>
                  {['d4', 'e4', 'd5', 'e5'].includes(selectedChessSquare) && (
                    <div className="mt-2 text-rose-600 dark:text-rose-400 font-bold">
                      ⭐ Ez a mező a 4 központi centrummező egyike!
                    </div>
                  )}
                </div>
              </div>

              {/* Gyorsválasztó gombok */}
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Híres sakkpozíciók:</div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedChessSquare('e4')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-300"
                  >
                    e4 (Királygyalog kezdőlépés)
                  </button>
                  <button
                    onClick={() => setSelectedChessSquare('d4')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-300"
                  >
                    d4 (Vezérgyalog kezdőlépés)
                  </button>
                  <button
                    onClick={() => setSelectedChessSquare('a1')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-300"
                  >
                    a1 (Világos bástya sarok)
                  </button>
                  <button
                    onClick={() => setSelectedChessSquare('e8')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-300"
                  >
                    e8 (Sötét király alaphelyzete)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÁBLÁZATKEZELŐK ÉS A TORPEDÓ JÁTÉK */}
      <TheorySection
        id="torpedo-excel"
        title="3. Torpedó játék és az Excel táblázatok cellái"
        subtitle="A csatahajók elhelyezése a rácshálón és a modern számítástechnika cellacímei"
        badge="ALKALMAZÁS"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Torpedó (Csatahajó) játék szabályai"
            badge="TORPEDÓ"
            color="cyan"
            icon={<Crosshair className="w-5 h-5 text-cyan-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A torpedó játékban két $10 \times 10$-es rácshálót használnak a játékosok (oszlopok: A-J, sorok: 1-10).
            </p>
            <div className="mt-2.5 p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-950 dark:text-cyan-200 space-y-1">
              <div>• <strong>Hajók hossza:</strong> 1-es (tengeralattjáró), 2-es (romboló), 3-as (cirkáló), 4-es (csatahajó).</div>
              <div>• <strong>Hajó helyzete:</strong> Csak vízszintesen vagy függőlegesen állhat (átlósan nem!).</div>
              <div>• <em>Példa:</em> Ha egy 3-as hajó a <strong>B2, B3, B4</strong> mezőkön van, a B2-t és B3-at eltalálva: <em>„Talált!”</em>, a B4-et eltalálva: <em>„Talált és süllyedt!”</em>.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Táblázatkezelők: Excel és Google Sheets"
            badge="SZÁMÍTÁSTECHNIKA"
            color="emerald"
            icon={<Table className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Minden modern táblázatkezelő program ugyanezt az oszlop-sor koordináta-rendszert használja:
            </p>
            <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
              <div>• <strong>Cellacím:</strong> pl. <code>A1</code>, <code>B5</code>, <code>D12</code>.</div>
              <div>• <strong>Tartomány (több cella):</strong> pl. <code>A1:A5</code> (az A oszlop 1-től 5-ig tartó mezői).</div>
              <div>• <strong>Képletek:</strong> <code>=SUM(B2:B10)</code> (összeadja a kijelölt cellákban lévő számokat).</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Ez a matematikai rácsháló a világ összes gazdasági és pénzügyi számításának az alapja!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: LÉPÉSSOROZATOK ÉS ÚTVONALAK A RÁCSHÁLÓN */}
      <TheorySection
        id="utvonalak"
        title="4. Útvonalak és lépéssorozatok: Programozzunk robotot!"
        subtitle="Mozgás a rácson nyíljelölésekkel, relatív elmozdulás és a legrövidebb rácstávolság"
        badge="ÚTVONALTERVEZÉS"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="Lépések megadása nyilakkal és számokkal"
            badge="ALGORITMUSOK"
            color="blue"
            icon={<Footprints className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A rácshálón való haladást egyszerű lépésutasításokkal (algoritmussal) adhatjuk meg:
            </p>
            <div className="mt-2.5 space-y-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <div>• $\rightarrow 3$ : 3 lépés jobbra (kelet felé)</div>
              <div>• $\uparrow 2$ : 2 lépés fel (észak felé)</div>
              <div>• $\leftarrow 1$ : 1 lépés balra (nyugat felé)</div>
              <div>• $\downarrow 4$ : 4 lépés le (dél felé)</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Ezekkel az egyszerű parancsokkal programozzák a raktári robotokat és az önvezető autókat is!
            </p>
          </TheoryCard>

          <TheoryCard
            title="A rácstávolság (Manhattan-távolság)"
            badge="TÁVOLSÁG A SÍKON"
            color="teal"
            icon={<Navigation className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A rácshálón nem vághatunk át átlósan a házakon keresztül! Csak az utcák (rácsvonalak) mentén haladhatunk:
            </p>
            <div className="mt-2.5 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200">
              <strong>Rácstávolság két pont között:</strong><br />
              Vízszintes lépések száma + Függőleges lépések száma.<br />
              <em>Példa:</em> A1-ből C4-be: 2 lépés jobbra + 3 lépés fel = <strong>5 lépés</strong> a legrövidebb út.
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Robotléptető és Útvonaltervező */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Footprints className="w-5 h-5 text-blue-600" />
                Interaktív Robotléptető Szimulátor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Irányítsd a robotot a nyílgombokkal, figyeld meg a koordináták változását és a megtett utat!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Pozíció: ({robotPos.x}; {robotPos.y}) | Megtett lépések: {pathHistory.length - 1}
              </span>
              <Button size="sm" variant="outline" onClick={resetRobot} className="h-7 text-xs">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Visszaállítás
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* 5x5 Rácsháló */}
            <div className="md:col-span-7 flex justify-center">
              <div className="inline-block p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                {[5, 4, 3, 2, 1].map(y => (
                  <div key={y} className="flex items-center">
                    <span className="w-5 text-right pr-1 font-bold text-xs text-slate-500">{y}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(x => {
                        const isRobot = robotPos.x === x && robotPos.y === y;
                        const isStart = x === 1 && y === 1;
                        const isVisited = pathHistory.some(p => p.x === x && p.y === y);

                        return (
                          <div
                            key={`${x}-${y}`}
                            className={`w-10 h-10 sm:w-12 sm:h-12 m-0.5 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                              isRobot
                                ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-300 scale-105 z-10'
                                : isStart
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-400'
                                : isVisited
                                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-500 border border-blue-200 dark:border-blue-800'
                                : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {isRobot ? '🤖' : isStart ? '🚩' : isVisited ? '•' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {/* X tengely fejlécek alul */}
                <div className="flex pl-5 pt-1">
                  {[1, 2, 3, 4, 5].map(x => (
                    <div key={x} className="w-10 sm:w-12 text-center font-bold text-xs text-slate-500">{x}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Irányító Gombok Panel */}
            <div className="md:col-span-5 space-y-4">
              <div className="text-center">
                <div className="text-xs font-bold text-slate-500 mb-2">Léptesd a robotot:</div>
                <div className="inline-grid grid-cols-3 gap-2">
                  <div></div>
                  <Button
                    size="sm"
                    onClick={() => moveRobot(0, 1)}
                    disabled={robotPos.y >= 5}
                    className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                  <div></div>

                  <Button
                    size="sm"
                    onClick={() => moveRobot(-1, 0)}
                    disabled={robotPos.x <= 1}
                    className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-lg font-bold">
                    🤖
                  </div>
                  <Button
                    size="sm"
                    onClick={() => moveRobot(1, 0)}
                    disabled={robotPos.x >= 5}
                    className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <div></div>
                  <Button
                    size="sm"
                    onClick={() => moveRobot(0, -1)}
                    disabled={robotPos.y <= 1}
                    className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <ArrowDown className="w-5 h-5" />
                  </Button>
                  <div></div>
                </div>
              </div>

              {/* Útvonal történet */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">Bejárt koordináták sora:</div>
                <div className="font-mono text-slate-600 dark:text-slate-400 overflow-x-auto whitespace-nowrap py-1">
                  {pathHistory.map((p, i) => `(${p.x}; ${p.y})`).join(' → ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
