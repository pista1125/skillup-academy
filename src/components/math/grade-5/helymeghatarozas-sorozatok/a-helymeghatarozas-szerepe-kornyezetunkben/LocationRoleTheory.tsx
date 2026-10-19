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
  Compass,
  Navigation,
  MapPin,
  Map,
  Home,
  Ticket,
  Users,
  Grid,
  Satellite,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export interface LocationRoleTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const LocationRoleTheory: React.FC<LocationRoleTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Szélrózsa & Iránytű Állapot ---
  const [selectedDirection, setSelectedDirection] = useState<'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'>('N');

  const directionsData = {
    N: {
      name: 'Észak (É)',
      angle: 0,
      description: 'A térképeken hagyományosan mindig felfelé mutat. Éjszaka a Sarkcsillag jelöli ki az északi irányt. A fák törzsének északi oldala gyakran mohásabb, mert oda kevesebb közvetlen napfény érkezik.',
      sunInfo: 'Soha nem süt ide közvetlenül a Nap hazánkban (árnyékunk délben pontosan észak felé mutat).',
      badge: 'Fő égtáj (0°)'
    },
    NE: {
      name: 'Északkelet (ÉK)',
      angle: 45,
      description: 'Észak és Kelet közötti átlós mellék égtáj, 45 fokos szögben.',
      sunInfo: 'A kora reggeli órákban (nyáron a napkelte idején) errefelé látható a Nap.',
      badge: 'Mellék égtáj (45°)'
    },
    E: {
      name: 'Kelet (K)',
      angle: 90,
      description: 'A térképen jobbra helyezkedik el. A Föld forgása miatt itt látjuk felkelni a Napot a reggeli órákban (napéjegyenlőségkor pontosan keleten kél).',
      sunInfo: 'Reggel 6 óra körül a Nap pontosan kelet felől süt.',
      badge: 'Fő égtáj (90°)'
    },
    SE: {
      name: 'Délkelet (DK)',
      angle: 135,
      description: 'Kelet és Dél közötti átlós mellék égtáj, 135 fokos szögben.',
      sunInfo: 'Délelőtt 9 óra körül a Nap délkeleti irányban áll az égbolton.',
      badge: 'Mellék égtáj (135°)'
    },
    S: {
      name: 'Dél (D)',
      angle: 180,
      description: 'A térképen lefelé található. Hazánkban (az északi féltekén) a Nap a legmagasabb pontján, deleléskor (délben) pontosan déli irányban áll.',
      sunInfo: 'Déli 12 órakor a legmelegebb napsugarak délről érkeznek, az árnyék északra vetül.',
      badge: 'Fő égtáj (180°)'
    },
    SW: {
      name: 'Délnyugat (DNy)',
      angle: 225,
      description: 'Dél és Nyugat közötti átlós mellék égtáj, 225 fokos szögben.',
      sunInfo: 'Kora délután (15 óra körül) a Nap délnyugatról süt.',
      badge: 'Mellék égtáj (225°)'
    },
    W: {
      name: 'Nyugat (Ny)',
      angle: 270,
      description: 'A térképen balra található. Este errefelé látjuk lenyugodni a Napot.',
      sunInfo: 'Este 18 óra körül a Nap nyugati irányba száll alá.',
      badge: 'Fő égtáj (270°)'
    },
    NW: {
      name: 'Északnyugat (ÉNy)',
      angle: 315,
      description: 'Nyugat és Észak közötti átlós mellék égtáj, 315 fokos szögben.',
      sunInfo: 'Késő este, nyári naplementék idején északnyugat felé bukik le a Nap.',
      badge: 'Mellék égtáj (315°)'
    }
  };

  // --- 2. Interaktív Városi Térképháló Állapot ---
  interface CityLocation {
    id: string;
    col: string; // 'A'..'E'
    row: number; // 1..5
    name: string;
    icon: string;
    category: string;
    description: string;
  }

  const cityLocations: CityLocation[] = [
    { id: 'school', col: 'B', row: 2, name: 'Iskola', icon: '🏫', category: 'Középület', description: 'B2 négyzetben: 2 blokk keletre és 2 blokk északra a 0. saroktól.' },
    { id: 'park', col: 'D', row: 4, name: 'Városi Park', icon: '🌳', category: 'Szabadidő', description: 'D4 négyzetben: zöldövezet játszótérrel és szökőkúttal.' },
    { id: 'hospital', col: 'A', row: 5, name: 'Kórház és Mentőállomás', icon: '🏥', category: 'Egészségügy', description: 'A5 négyzetben: sürgősségi központ a város északnyugati sarkán.' },
    { id: 'library', col: 'C', row: 3, name: 'Városi Könyvtár (Origó)', icon: '🏛️', category: 'Kultúra', description: 'C3 négyzetben: a város pontos mértani közepén fekvő főtér!' },
    { id: 'cinema', col: 'E', row: 2, name: 'Mozi & Pláza', icon: '🎬', category: 'Szórakozás', description: 'E2 négyzetben: bevásárló- és szórakoztatóközpont.' },
    { id: 'stadium', col: 'E', row: 5, name: 'Sportstadion', icon: '⚽', category: 'Sport', description: 'E5 négyzetben: a város északkeleti sarkában lévő sportkomplexum.' },
    { id: 'station', col: 'B', row: 4, name: 'Vasútállomás', icon: '🚆', category: 'Közlekedés', description: 'B4 négyzetben: a helyközi vonatok érkezési pontja.' }
  ];

  const [selectedCell, setSelectedCell] = useState<{ col: string; row: number } | null>({ col: 'C', row: 3 });

  const activeLocation = cityLocations.find(loc => selectedCell && loc.col === selectedCell.col && loc.row === selectedCell.row);

  // --- 3. Mozi Ülésrend Interaktív Állapot ---
  const [selectedSeat, setSelectedSeat] = useState<{ row: number; seat: number } | null>({ row: 3, seat: 6 });

  return (
    <TheoryTemplate
      documentId="grade-5-location-role-theory"
      pdfFilename="5_osztaly_V_1_a_helymeghatarozas_szerepe_kornyezetunkben.pdf"
      title="A helymeghatározás szerepe környezetünkben"
      subtitle="Tájékozódás a mindennapokban, lakcímek rendszere, színházi és mozijegyek, tantermi ülésrend, térképi négyzetháló, fő és mellék égtájak, szélrózsa és a modern műholdas GPS technológia"
      themeColor="violet"
      emoji="📍"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 1. TANANYAG"
      quickRule={{
        label: 'A helymeghatározás alapszabálya',
        formula: '\\text{Egyértelmű helymeghatározáshoz} = \\text{Viszonyítási pont (Origó)} + \\text{Pontos adatok (2 koordináta)}'
      }}
      practiceTitle="Készen állsz a tájékozódási feladványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses, 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: MIÉRT VAN SZÜKSÉGÜNK HELYMEGHATÁROZÁSRA? */}
      <TheorySection
        id="miert-fontos"
        title="1. Miért van szükségünk helymeghatározásra?"
        subtitle="Az egyértelmű azonosítás elve és a viszonyítási pont (origó) szerepe"
        badge="ALAPFOGALOM"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Mi a helymeghatározás?"
            badge="FOGALOM"
            color="violet"
            icon={<MapPin className="w-5 h-5 text-violet-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>helymeghatározás</strong> (vagy tájékozódás) annak megállapítása és közlése, hogy egy adott személy, tárgy vagy épület <strong>hol található a környezetében</strong>.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-900 dark:text-violet-200 space-y-1.5">
              <div>• <strong>A cél:</strong> Bárki számára félreérthetetlenül, egyértelműen megtalálható legyen a helyszín.</div>
              <div>• <strong>Mindennapi élet:</strong> Postai levél kézbesítése, mentők és tűzoltók riasztása, baráti találkozó, utazás idegen városban.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A viszonyítási pont (Origó)"
            badge="KULCSFOGALOM"
            color="indigo"
            icon={<Compass className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy helyzetet <strong>önmagában nem tudunk leírni</strong>, csak valamihez képest! Azt a kiindulási tárgyat vagy pontot, amelyhez képest megadjuk a helyzetet, <strong>viszonyítási pontnak</strong> (a matematikában gyakran <em>origónak</em>) nevezzük.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <div>• <em>Példa 1:</em> „A postától 100 méterre északra.” (Viszonyítási pont: a posta)</div>
              <div>• <em>Példa 2:</em> „A tanári asztaltól számított 2. pad.” (Viszonyítási pont: tanári asztal)</div>
            </div>
          </TheoryCard>
        </div>

        {/* Ábra: Viszonyítási pont szemléltetés */}
        <div className="my-6">
          <GeometryFigureCard
            title="Szemléltető: Relatív helyzet vs. Rögzített viszonyítási pont"
            caption="Ha csak annyit mondunk: „jobbra”, az attól függ, merre nézünk. Egy rögzített viszonyítási ponttal (pl. épülettel vagy égtájjal) a megadás abszolút és egyértelmű!"
          >
            <svg className="w-full max-w-lg h-56 mx-auto" viewBox="0 0 460 200">
              <defs>
                <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ecfdf5" />
                  <stop offset="100%" stopColor="#d1fae5" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="440" height="180" rx="16" fill="url(#grassGrad)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
              
              {/* Viszonyítási pont: Szökőkút / Templom a közepén */}
              <circle cx="230" cy="100" r="32" fill="#8b5cf6" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="2.5" />
              <text x="230" y="95" textAnchor="middle" fontSize="24">⛲</text>
              <text x="230" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">Origó (Főtér)</text>

              {/* Balra: Iskola */}
              <rect x="40" y="70" width="60" height="55" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
              <text x="70" y="100" textAnchor="middle" fontSize="22">🏫</text>
              <text x="70" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">Iskola</text>
              <text x="70" y="154" textAnchor="middle" fontSize="10" fill="#475569">150 m-re nyugatra</text>

              {/* Felfelé: Könyvtár */}
              <rect x="200" y="20" width="60" height="40" rx="8" fill="#ec4899" fillOpacity="0.2" stroke="#db2777" strokeWidth="2" />
              <text x="230" y="45" textAnchor="middle" fontSize="18">📚 Könyvtár</text>
              <text x="310" y="42" fontSize="10" fill="#475569">← 80 m északra</text>

              {/* Jobbra: Játszótér */}
              <rect x="360" y="70" width="60" height="55" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#d97706" strokeWidth="2" />
              <text x="390" y="100" textAnchor="middle" fontSize="22">🎠</text>
              <text x="390" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Játszótér</text>
              <text x="390" y="154" textAnchor="middle" fontSize="10" fill="#475569">120 m-re keletre</text>

              {/* Nyilak az origótól */}
              <path d="M 198 100 L 105 100" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrowEnd)" />
              <path d="M 230 68 L 230 45" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 262 100 L 355 100" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </GeometryFigureCard>
        </div>

        <TheoryTrapBox
          title="Típushiba: A „jobbra” és „balra” megtévesztő lehet!"
          description="Ha valakinek azt mondod: „a jobb kezed felől van”, de ő veled szemben áll, akkor az ő jobb oldala a te bal oldalad lesz! Ezért a matematikában és a térképészetben személytől független viszonyítási pontokat (pl. égtájakat, rácshálót) használunk."
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: MINDENNAPI HELYMEGHATÁROZÁSI RENDSZEREK */}
      <TheorySection
        id="mindennapi-rendszerek"
        title="2. Helymeghatározás a mindennapi életben"
        subtitle="Lakcímek hierarchiája, színház- és mozijegyek kétirányú koordinátái, tantermi ülésrend"
        badge="GYAKORLAT"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. A pontos lakcím"
            badge="HIERARCHIA"
            color="blue"
            icon={<Home className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A lakcím lépésről lépésre szűkíti a kört a tágasabb területtől a legpontosabb helyig:
            </p>
            <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="text-blue-700 dark:text-blue-400 font-bold">1. Település (pl. Debrecen)</div>
              <div>2. Közterület (pl. Kossuth Lajos utca)</div>
              <div>3. Házszám (pl. 14. szám)</div>
              <div>4. Emelet, ajtó (pl. 2. emelet 5. ajtó)</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 italic">
              Érdekesség: a magyar utcákban a menetirány szerint jobb oldalon a páros, bal oldalon a páratlan számok találhatók!
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Mozi- és színházjegy"
            badge="2 ADAT (SOR + SZÉK)"
            color="rose"
            icon={<Ticket className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy nagy nézőtéren több száz szék van. Ha a jegyen csak annyi szerepelne: <em>„12. szék”</em>, nem tudnánk hova ülni, mert minden sorban van egy 12. szék!
            </p>
            <div className="mt-2.5 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200">
              <strong>Két koordináta szükséges:</strong><br />
              • <strong>1. adat:</strong> Hányadik sor? (pl. 6. sor)<br />
              • <strong>2. adat:</strong> Hányadik szék? (pl. 14. szék)
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              A síkban a pontos hely kijelöléséhez pontosan két adatra (egy koordinátapárra) van szükség.
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Tantermi ülésrend"
            badge="OSZTÁLYTEREM"
            color="amber"
            icon={<Users className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az osztályban is rácsrendszer szerint ülünk padsorokban:
            </p>
            <div className="mt-2.5 space-y-1 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
              <div>• <strong>Oszlop (padsor):</strong> ablak felőli sor, középső sor, folyosó felőli sor</div>
              <div>• <strong>Sor (távolság a táblától):</strong> 1. pad (első pad), 2. pad, 3. pad...</div>
              <div>• <strong>Pozíció a padban:</strong> jobb vagy bal oldal</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Így a tanár azonnal tudja: „ablak melletti 2. pad jobb oldala”.
            </p>
          </TheoryCard>
        </div>

        {/* Interaktív Mozi Ülésrend Szimulátor */}
        <div className="mt-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-violet-600" />
                Interaktív Mozi Ülésrend: Kattints a székekre!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Figyeld meg, hogyan határozza meg a helyet a sor és a szék száma!
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300">
                Kijelölt jegy: {selectedSeat ? `${selectedSeat.row}. sor ${selectedSeat.seat}. szék` : 'Válassz egy széket!'}
              </span>
            </div>
          </div>

          {/* Vetítővászon */}
          <div className="w-3/4 mx-auto mb-6">
            <div className="h-2 rounded-t-xl bg-gradient-to-r from-violet-300 via-indigo-500 to-violet-300 dark:from-violet-700 dark:via-indigo-400 dark:to-violet-700 shadow-md"></div>
            <p className="text-[10px] tracking-widest uppercase text-center font-bold text-slate-400 mt-1">VETÍTŐVÁSZON</p>
          </div>

          {/* Széksorok */}
          <div className="space-y-2 max-w-md mx-auto">
            {[1, 2, 3, 4, 5].map(rowNum => (
              <div key={rowNum} className="flex items-center gap-2 justify-center">
                <span className="w-14 text-right text-xs font-bold text-slate-500">{rowNum}. sor</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(seatNum => {
                    const isSelected = selectedSeat?.row === rowNum && selectedSeat?.seat === seatNum;
                    return (
                      <button
                        key={seatNum}
                        onClick={() => setSelectedSeat({ row: rowNum, seat: seatNum })}
                        className={`w-7 h-7 rounded-t-lg text-[10px] font-bold transition-all ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-lg scale-110 ring-2 ring-rose-400'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                        title={`${rowNum}. sor ${seatNum}. szék`}
                      >
                        {seatNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center text-xs text-slate-600 dark:text-slate-300">
            {selectedSeat ? (
              <span>
                🎯 <strong>Azonosítás:</strong> A jegyed a <strong>{selectedSeat.row}. sor {selectedSeat.seat}. székére</strong> szól. Csak az egyik adat önmagában (pl. „{selectedSeat.seat}. szék”) kevés lenne, mert 5 ilyen szék van a teremben!
              </span>
            ) : (
              <span>Kattints bármelyik székre a nézőtéren!</span>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÉRKÉPI NÉGYZETHÁLÓ ÉS ATLASZ KOORDINÁTÁK */}
      <TheorySection
        id="terkepi-racshalo"
        title="3. Térképi négyzetháló és koordináták az atlaszban"
        subtitle="Oszlopok (betűk) és sorok (számok) metszéspontja: a térképi cellák olvasása"
        badge="TÉRKÉPÉSZET"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="Hogyan működik a térképháló?"
            badge="CELLARENDSZER"
            color="emerald"
            icon={<Grid className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A várostérképek és atlaszok szélén betű- és számbeosztást találunk:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li><strong>Vízszintes tengely:</strong> betűkkel jelölt oszlopok (A, B, C, D, E...)</li>
              <li><strong>Függőleges tengely:</strong> számokkal jelölt sorok (1, 2, 3, 4, 5...)</li>
              <li><strong>Cella koordinátája:</strong> A betű és a szám kombinációja, pl. <strong>B3</strong> vagy <strong>D5</strong>.</li>
            </ul>
            <p className="mt-2.5 text-xs text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
              Az atlasz névmutatójában egy város mellett pl. ez áll: <em>„Eger - C2”</em>. Így a C oszlop és a 2. sor kereszteződésében lévő négyzetben azonnal megtaláljuk!
            </p>
          </TheoryCard>

          <TheoryCard
            title="A sakktábla és a torpedó játék analógiája"
            badge="JÁTÉKOK"
            color="teal"
            icon={<Sparkles className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ugyanezt a kétkoordinátás rendszert használjuk híres stratégiai játékokban is:
            </p>
            <div className="mt-2.5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200">
                ♟️ <strong>Sakktábla:</strong> 8 oszlop (a-h) és 8 sor (1-8). Például a király előtti gyalog kezdőlépése az <strong>e4</strong> mezőre történik!
              </div>
              <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200">
                🚢 <strong>Torpedó játék:</strong> „B-4!” - „Talált és süllyedt!” Itt is egy oszlop- és sorazonosítóval célzunk a négyzethálón.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Városi Térképháló Szimulátor */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald-600" />
                Interaktív Várostérkép: Fedezd fel a cellákat!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kattints a rácsháló bármely mezőjére a koordináta és a helyszín azonosításához!
              </p>
            </div>
            {selectedCell && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Kiválasztott mező: {selectedCell.col}{selectedCell.row}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Térképrács */}
            <div className="lg:col-span-7">
              <div className="inline-block p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                {/* Oszlopfejlécek (A, B, C, D, E) */}
                <div className="flex items-center mb-1">
                  <div className="w-8"></div>
                  {['A', 'B', 'C', 'D', 'E'].map(c => (
                    <div key={c} className="w-12 sm:w-14 text-center font-bold text-sm text-emerald-700 dark:text-emerald-400">
                      {c}
                    </div>
                  ))}
                </div>

                {/* Sorok (5-től 1-ig fentről lefelé, mint a koordináta-rendszernél) */}
                {[5, 4, 3, 2, 1].map(r => (
                  <div key={r} className="flex items-center my-1">
                    <div className="w-8 text-right pr-2 font-bold text-sm text-emerald-700 dark:text-emerald-400">
                      {r}
                    </div>
                    {['A', 'B', 'C', 'D', 'E'].map(c => {
                      const isSelected = selectedCell?.col === c && selectedCell?.row === r;
                      const loc = cityLocations.find(l => l.col === c && l.row === r);
                      return (
                        <button
                          key={c + r}
                          onClick={() => setSelectedCell({ col: c, row: r })}
                          className={`w-12 h-12 sm:w-14 sm:h-14 m-0.5 rounded-xl font-bold flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-300 dark:ring-emerald-700 scale-105 z-10'
                              : loc
                              ? 'bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border-2 border-emerald-300 dark:border-emerald-600'
                              : 'bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 border border-dashed border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {loc ? (
                            <span className="text-xl sm:text-2xl">{loc.icon}</span>
                          ) : (
                            <span className="text-[10px] text-slate-400">{c}{r}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Cella információ panel */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Azonosított koordináta</div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  {selectedCell ? `${selectedCell.col}${selectedCell.row}` : '-'}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  ({selectedCell ? `${selectedCell.col}. oszlop, ${selectedCell.row}. sor` : ''})
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  {activeLocation ? (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{activeLocation.icon}</span>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white">{activeLocation.name}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                            {activeLocation.category}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeLocation.description}
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic py-2">
                      Ez a mező jelenleg üres terület vagy lakóövezet. Nem található rajta kiemelt középület.
                    </div>
                  )}
                </div>
              </div>

              {/* Gyors feladat gombok */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Gyors keresés a térképen:</div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCell({ col: 'B', row: 2 })}
                    className="px-2.5 py-1 text-xs rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 transition-colors"
                  >
                    🏫 Iskola (B2)
                  </button>
                  <button
                    onClick={() => setSelectedCell({ col: 'C', row: 3 })}
                    className="px-2.5 py-1 text-xs rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 transition-colors"
                  >
                    🏛️ Főtér (C3)
                  </button>
                  <button
                    onClick={() => setSelectedCell({ col: 'A', row: 5 })}
                    className="px-2.5 py-1 text-xs rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 transition-colors"
                  >
                    🏥 Kórház (A5)
                  </button>
                  <button
                    onClick={() => setSelectedCell({ col: 'D', row: 4 })}
                    className="px-2.5 py-1 text-xs rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 transition-colors"
                  >
                    🌳 Park (D4)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÉGTÁJAK ÉS AZ IRÁNYTŰ (SZÉLRÓZSA) */}
      <TheorySection
        id="egtajak-szelrozsa"
        title="4. Égtájak, szélrózsa és természetes tájékozódás"
        subtitle="Fő- és mellék égtájak, a Nap járása, az iránytű működési elve és a Sarkcsillag"
        badge="IRÁNYOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="A 4 fő égtáj és a 4 mellék égtáj"
            badge="SZÉLRÓZSA"
            color="indigo"
            icon={<Compass className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A földfelszíni tájékozódás legősibb alapját a <strong>fő égtájak</strong> és a köztük lévő <strong>mellék égtájak</strong> adják:
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">Fő égtájak:</span>
                <ul className="mt-1 space-y-0.5 text-slate-600 dark:text-slate-400">
                  <li>• <strong>É</strong> – Észak (0° / 360°)</li>
                  <li>• <strong>K</strong> – Kelet (90°)</li>
                  <li>• <strong>D</strong> – Dél (180°)</li>
                  <li>• <strong>Ny</strong> – Nyugat (270°)</li>
                </ul>
              </div>
              <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800">
                <span className="font-bold text-violet-700 dark:text-violet-300">Mellék égtájak:</span>
                <ul className="mt-1 space-y-0.5 text-slate-600 dark:text-slate-400">
                  <li>• <strong>ÉK</strong> – Északkelet (45°)</li>
                  <li>• <strong>DK</strong> – Délkelet (135°)</li>
                  <li>• <strong>DNy</strong> – Délnyugat (225°)</li>
                  <li>• <strong>ÉNy</strong> – Északnyugat (315°)</li>
                </ul>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              A térképeken az északi irány hagyományosan <strong>felfelé</strong> mutat. Ha szemben állunk északkal, a hátunk mögött van Dél, jobb kezünk felé Kelet, bal kezünk felé Nyugat!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Természeti tájékozódási támpontok"
            badge="TERMÉSZET"
            color="amber"
            icon={<Sun className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha nincs nálunk iránytű vagy telefon, a természet jelei is segítenek a tájékozódásban:
            </p>
            <div className="mt-2.5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <span>☀️</span>
                <div><strong>A Nap járása:</strong> Keleten kél, délen delel a legmagasabban, nyugaton nyugszik. Délben az árnyékunk északra mutat!</div>
              </div>
              <div className="flex items-start gap-2">
                <span>⭐</span>
                <div><strong>A Sarkcsillag:</strong> A Göncölszekér két hátsó csillagának ötszörös meghosszabbításával található meg, és mindig pontosan észak felé mutat.</div>
              </div>
              <div className="flex items-start gap-2">
                <span>🌲</span>
                <div><strong>Mohásodás:</strong> Az erdőben álló fák kérge és a kövek gyakran az északi és északnyugati oldalon mohásabbak.</div>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Szélrózsa & Iránytű Szimulátor */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                Interaktív Iránytű & Szélrózsa: Kattints az égtájakra!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Forgasd el az iránytűt és fedezd fel az egyes irányok sajátosságait!
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
              {directionsData[selectedDirection].badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Iránytű */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 240 240">
                  {/* Külső kör */}
                  <circle cx="120" cy="120" r="110" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" className="dark:fill-slate-800 dark:stroke-slate-700" />
                  <circle cx="120" cy="120" r="100" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 4" />
                  <circle cx="120" cy="120" r="85" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" className="dark:fill-slate-900" />

                  {/* Fokbeosztások */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                    <line
                      key={deg}
                      x1="120"
                      y1="15"
                      x2="120"
                      y2="25"
                      stroke="#475569"
                      strokeWidth="2"
                      transform={`rotate(${deg} 120 120)`}
                    />
                  ))}

                  {/* Forgó iránytű mágnestű */}
                  <g transform={`rotate(${directionsData[selectedDirection].angle} 120 120)`} className="transition-transform duration-500 ease-out">
                    {/* Északi piros hegy */}
                    <polygon points="120,35 110,120 120,110" fill="#ef4444" />
                    <polygon points="120,35 130,120 120,110" fill="#dc2626" />
                    {/* Déli kék hegy */}
                    <polygon points="120,205 110,120 120,130" fill="#3b82f6" />
                    <polygon points="120,205 130,120 120,130" fill="#2563eb" />
                    {/* Középső csapágy */}
                    <circle cx="120" cy="120" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  </g>

                  {/* Kattintható égtáj gombok a körön */}
                  {/* Észak */}
                  <text x="120" y="32" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#dc2626" className="cursor-pointer select-none" onClick={() => setSelectedDirection('N')}>É</text>
                  {/* Északkelet */}
                  <text x="182" y="58" textAnchor="middle" fontWeight="bold" fontSize="10" fill="#64748b" className="cursor-pointer select-none" onClick={() => setSelectedDirection('NE')}>ÉK</text>
                  {/* Kelet */}
                  <text x="210" y="125" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#0f172a" className="dark:fill-white cursor-pointer select-none" onClick={() => setSelectedDirection('E')}>K</text>
                  {/* Délkelet */}
                  <text x="182" y="192" textAnchor="middle" fontWeight="bold" fontSize="10" fill="#64748b" className="cursor-pointer select-none" onClick={() => setSelectedDirection('SE')}>DK</text>
                  {/* Dél */}
                  <text x="120" y="218" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#2563eb" className="cursor-pointer select-none" onClick={() => setSelectedDirection('S')}>D</text>
                  {/* Délnyugat */}
                  <text x="58" y="192" textAnchor="middle" fontWeight="bold" fontSize="10" fill="#64748b" className="cursor-pointer select-none" onClick={() => setSelectedDirection('SW')}>DNy</text>
                  {/* Nyugat */}
                  <text x="30" y="125" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#0f172a" className="dark:fill-white cursor-pointer select-none" onClick={() => setSelectedDirection('W')}>Ny</text>
                  {/* Északnyugat */}
                  <text x="58" y="58" textAnchor="middle" fontWeight="bold" fontSize="10" fill="#64748b" className="cursor-pointer select-none" onClick={() => setSelectedDirection('NW')}>ÉNy</text>
                </svg>
              </div>
            </div>

            {/* Égtáj Adatlap */}
            <div className="md:col-span-7 space-y-3">
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between">
                  <h5 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
                    {directionsData[selectedDirection].name}
                  </h5>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    Szög: {directionsData[selectedDirection].angle}°
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {directionsData[selectedDirection].description}
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Napjárási tudnivaló:</strong> {directionsData[selectedDirection].sunInfo}
                  </div>
                </div>
              </div>

              {/* Égtáj választó gombok */}
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Válassz égtájat:</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const).map(dir => (
                    <button
                      key={dir}
                      onClick={() => setSelectedDirection(dir)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedDirection === dir
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {dir === 'N' ? 'É (0°)' : dir === 'E' ? 'K (90°)' : dir === 'S' ? 'D (180°)' : dir === 'W' ? 'Ny (270°)' : dir}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: A MODERN HELYMEGHATÁROZÁS - GPS ÉS DIGITÁLIS TÉRKÉPEK */}
      <TheorySection
        id="modern-gps"
        title="5. Modern helymeghatározás: GPS és digitális navigáció"
        subtitle="Műholdak a Föld körül, földrajzi szélesség és hosszúság, tengerszint feletti magasság"
        badge="CSÚCSTECHNOLÓGIA"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Mi az a GPS?"
            badge="MŰHOLDAS RENDSZER"
            color="sky"
            icon={<Satellite className="w-5 h-5 text-sky-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>GPS</strong> az angol <em>Global Positioning System</em> (Globális Helymeghatározó Rendszer) rövidítése.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 space-y-1.5">
              <div>• <strong>Hogyan működik?</strong> A Föld körül kb. 20 000 km magasságban több mint 30 navigációs műhold kering precíz atomórákkal.</div>
              <div>• <strong>Háromszögelés:</strong> A telefonunk vevőegysége méri, mennyi idő alatt érnek le a műholdak rádiójelei. Legalább <strong>4 műhold</strong> jeléből méterre pontosan kiszámítja a helyzetünket!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A 3 térbeli koordináta"
            badge="3D POZÍCIÓ"
            color="blue"
            icon={<Navigation className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A modern eszközök a térben <strong>3 adat</strong> segítségével határozzák meg helyzetünket a Földön:
            </p>
            <div className="mt-2.5 space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>1. Földrajzi szélesség:</strong> Az Egyenlítőtől északra vagy délre mért távolság fokokban (pl. Északi szélesség 47,5° - Budapest).
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>2. Földrajzi hosszúság:</strong> A greenwichi kezdőmeridiántól keletre vagy nyugatra mért távolság (pl. Keleti hosszúság 19,0°).
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>3. Tengerszint feletti magasság:</strong> Hány méterrel vagyunk a tenger szintje felett (pl. Kékes csúcsa: 1014 m).
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Összehasonlító táblázat */}
        <div className="mt-6">
          <TheoryTable
            title="Összefoglaló: A helymeghatározás fejlődése az ókortól napjainkig"
            headers={['Korszak / Módszer', 'Eszközök', 'Megadott adatok', 'Pontosság']}
            rows={[
              ['Természeti tájékozódás', 'Nap, Sarkcsillag, fák mohás oldala', 'Égtáj (fő irányok)', 'Hozzávetőleges (tájékozódó)'],
              ['Hagyományos tengerészet', 'Iránytű, szextáns, csillagászati térkép', 'Égtáj, irányszög (fok)', 'Néhány kilométeres'],
              ['Térképi négyzetháló', 'Papírtérkép, atlasz margója', 'Betű és szám cella (pl. C3)', 'Néhány száz méteres (négyzet)'],
              ['Városi címrendszer', 'Utcanévtábla, házszámozás', 'Település, utca, házszám, emelet', 'Ajtó pontosságú (épületen belül)'],
              ['Műholdas GPS navigáció', 'Műholdak, okostelefon, GPS vevő', 'Szélesség, hosszúság, magasság', 'Méteres, sőt centiméteres pontosság!']
            ]}
          />
        </div>

        <TheoryCallout
          type="tip"
          title="Tudtad? A Geocaching: a modern kincskeresés"
          text="A geocaching (ejtsd: geokesing) egy világszerte űzött szabadidős játék: a játékosok GPS koordináták alapján rejtenek el és keresnek meg vízhatlan dobozkákat (ládákat) a természetben és városokban. Te is kipróbálhatod a családdal vagy az osztállyal!"
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
