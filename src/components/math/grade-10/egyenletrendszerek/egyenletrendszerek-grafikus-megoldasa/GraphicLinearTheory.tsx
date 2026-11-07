import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard
} from '../TheoryTemplate';
import {
  IntersectingLinesSvg,
  ParallelLinesSvg,
  CoincidentLinesSvg,
  ChickensRabbitsSvg
} from './GraphicLinearFigures';
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Scale,
  Brain,
  Layers,
  ArrowRight,
  Calculator,
  Compass,
  RotateCcw,
  Sliders,
  Target,
  Zap,
  Move
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GraphicLinearTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface InteractivePreset {
  id: string;
  name: string;
  eq1: string;
  eq2: string;
  eq1Explicit: string;
  eq2Explicit: string;
  m1: number;
  m2: number;
  b1: number;
  b2: number;
  relation: 'Metsző egyenesek' | 'Párhuzamos egyenesek' | 'Egybeeső egyenesek';
  solutionType: string;
  solutionDetails: string;
  explanation: string;
}

const SAMPLE_SYSTEMS: InteractivePreset[] = [
  {
    id: 'sys-1',
    name: 'Tyúkok és nyulak (Tankönyv)',
    eq1: 'x + y = 7',
    eq2: '4x + 2y = 20',
    eq1Explicit: 'y = 7 − x',
    eq2Explicit: 'y = 10 − 2x',
    m1: -1,
    m2: -2,
    b1: 7,
    b2: 10,
    relation: 'Metsző egyenesek',
    solutionType: '1 megoldás: M(3; 4)',
    solutionDetails: 'M (3; 4) ⟹ x = 3 nyúl, y = 4 tyúk',
    explanation: 'A meredekségek különbözőek (m₁ = −1 ≠ m₂ = −2), ezért a két egyenes egyetlen pontban metszi egymást: (3; 4). Mindkét egyenlet teljesül: 3 + 4 = 7 és 4·3 + 2·4 = 20.'
  },
  {
    id: 'sys-2',
    name: 'Két metsző egyenes (39. o. minta)',
    eq1: 'y = 6 − x',
    eq2: 'y = 1,5x + 1',
    eq1Explicit: 'y = −x + 6',
    eq2Explicit: 'y = 1,5x + 1',
    m1: -1,
    m2: 1.5,
    b1: 6,
    b2: 1,
    relation: 'Metsző egyenesek',
    solutionType: '1 megoldás: M(2; 4)',
    solutionDetails: 'M (2; 4) ⟹ x = 2, y = 4',
    explanation: 'A két grafikon metszéspontja az M(2; 4) rácspont. Ellenőrzés: 4 = 6 − 2 (igaz) és 4 = 1,5·2 + 1 = 4 (igaz).'
  },
  {
    id: 'sys-3',
    name: 'Párhuzamos egyenesek (Ellentmondás)',
    eq1: '3x + y = 5',
    eq2: '6x + 2y = 1',
    eq1Explicit: 'y = −3x + 5',
    eq2Explicit: 'y = −3x + 0,5',
    m1: -3,
    m2: -3,
    b1: 5,
    b2: 0.5,
    relation: 'Párhuzamos egyenesek',
    solutionType: 'Nincs megoldás (∅)',
    solutionDetails: 'Nincs közös pont ⟹ ellentmondás',
    explanation: 'A meredekségek megegyeznek (m₁ = m₂ = −3), de a tengelymetszetek eltérnek (5 ≠ 0,5). A két egyenes párhuzamos, sehol sem metszik egymást, így az egyenletrendszernek nincs megoldása.'
  },
  {
    id: 'sys-4',
    name: 'Egybeeső egyenesek (Azonosság)',
    eq1: '2x − y = 1',
    eq2: '4x − 2y = 2',
    eq1Explicit: 'y = 2x − 1',
    eq2Explicit: 'y = 2x − 1',
    m1: 2,
    m2: 2,
    b1: -1,
    b2: -1,
    relation: 'Egybeeső egyenesek',
    solutionType: 'Végtelen sok megoldás',
    solutionDetails: 'Végtelen sok pont az y = 2x − 1 egyenesen',
    explanation: 'A második egyenlet pontosan az első egyenlet kétszerese. Átrendezve mindkettő ugyanazt a függvényt adja: y = 2x − 1. A két egyenes egybeesik, minden pontjuk közös.'
  },
  {
    id: 'sys-5',
    name: 'Merőleges egyenesek (90°)',
    eq1: 'y = 2x − 1',
    eq2: 'y = −0,5x + 4',
    eq1Explicit: 'y = 2x − 1',
    eq2Explicit: 'y = −0,5x + 4',
    m1: 2,
    m2: -0.5,
    b1: -1,
    b2: 4,
    relation: 'Metsző egyenesek',
    solutionType: '1 megoldás: M(2; 3) [90°]',
    solutionDetails: 'M (2; 3) ⟹ merőleges egyenesek',
    explanation: 'Mivel m₁ · m₂ = 2 · (−0,5) = −1, a két egyenes merőlegesen (90°-ban) metszi egymást az M(2; 3) pontban.'
  }
];

export const GraphicLinearTheory: React.FC<GraphicLinearTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív egyenesek állapota
  const [m1, setM1] = useState<number>(-1);
  const [b1, setB1] = useState<number>(7);
  const [m2, setM2] = useState<number>(-2);
  const [b2, setB2] = useState<number>(10);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('sys-1');

  // Metszéspont és geometriai viszony számítása
  const deltaM = m1 - m2;
  const isParallel = Math.abs(deltaM) < 0.001;
  const isCoincident = isParallel && Math.abs(b1 - b2) < 0.001;

  let intersectionX: number | null = null;
  let intersectionY: number | null = null;
  let solutionStatus: 'one' | 'parallel' | 'coincident' = 'one';
  let solutionSummary = '';

  if (isCoincident) {
    solutionStatus = 'coincident';
    solutionSummary = 'Egybeeső egyenesek ⟹ Végtelen sok megoldás';
  } else if (isParallel) {
    solutionStatus = 'parallel';
    solutionSummary = 'Párhuzamos egyenesek ⟹ Nincs megoldás (∅)';
  } else {
    solutionStatus = 'one';
    intersectionX = (b2 - b1) / deltaM;
    intersectionY = m1 * intersectionX + b1;
    solutionSummary = `Metsző egyenesek ⟹ 1 megoldás: M(${intersectionX.toFixed(2)}; ${intersectionY.toFixed(2)})`;
  }

  // Koordináta-transzformáció SVG koordinátákhoz (520x340 méret)
  const originX = 260;
  const originY = 175;
  const scale = 18; // 18 px / egység

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  // e1 és e2 végpontjai a rajzon
  const l1x1 = -13;
  const l1y1 = m1 * l1x1 + b1;
  const l1x2 = 13;
  const l1y2 = m1 * l1x2 + b1;

  const l2x1 = -13;
  const l2y1 = m2 * l2x1 + b2;
  const l2x2 = 13;
  const l2y2 = m2 * l2x2 + b2;

  const handleSelectPreset = (sys: InteractivePreset) => {
    setSelectedPresetId(sys.id);
    setM1(sys.m1);
    setB1(sys.b1);
    setM2(sys.m2);
    setB2(sys.b2);
  };

  return (
    <TheoryTemplate
      title="1. Egyenletrendszerek grafikus megoldása"
      subtitle="Kétismeretlenes lineáris egyenletek, egyenesek ábrázolása, metszéspontok és a megoldásszám geometriai jelentése"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 7. LECKE"
      pdfFilename="10_osztaly_egyenletrendszerek_1_grafikus_megoldas.pdf"
      themeColor="blue"
      ruleTitle="A grafikus megoldás geometriai alaptétele"
      ruleFormula="Az ax + by = c és dx + ey = f egyenletrendszer megoldása a két egyenes közös pontjainak (metszéspontjának) koordinátapárja (x; y)."
      practiceTitle="Készen állsz a grafikus feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben és fejtörőkben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* --- 1. RÉSZ: MI AZ EGYENLETRENDSZER ÉS HOGYAN SZEMLÉLTETHETŐ? --- */}
      <TheorySection
        number={1}
        title="Kétismeretlenes egyenletek és egyenletrendszerek"
        badge="Alapfogalmak"
        badgeColor="blue"
      >
        <TheoryCard
          title="A kétismeretlenes elsőfokú egyenlet geometriai képe"
          color="blue"
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          variant="highlight"
          description="A 9. osztályban megismert egyismeretlenes egyenletek után a 10. osztályban olyan problémákkal foglalkozunk, ahol kettő (vagy több) ismeretlen mennyiség együttes értékét keressük."
          properties={[
            'Kétismeretlenes lineáris egyenlet általános alakja: ax + by = c (ahol a és b egyszerre nem lehet nulla).',
            'Megoldása nem egyetlen szám, hanem számpár: egy olyan (x; y) rendezett valós számpár, amelyet behelyettesítve igaz állítást kapunk.',
            'Geometriai alakja: Ha az egyenletet y-ra rendezzük (y = mx + b), egy egyenes grafikonját kapjuk a derékszögű koordináta-rendszerben.',
            'Egyenletrendszer: Ha két vagy több egyenlet közös megoldásait (azaz olyan számpárokat, amelyek mindkét egyenletet egyidejűleg igazzá teszik) keressük.'
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="A híres tyúk-nyúl feladvány modellje"
            badge="Történeti példa"
            color="indigo"
            description="7 fej és 20 láb az udvaron: x + y = 7 (fejek száma) és 4x + 2y = 20 (lábak száma)."
            figure={<ChickensRabbitsSvg size={280} />}
          />

          <TheoryCard
            title="A feladat 3 lehetséges megoldási útja"
            color="indigo"
            icon={<Lightbulb className="w-5 h-5 text-indigo-500" />}
            properties={[
              '1. Okoskodással: Tegyünk mind a 7 fejhez 2 lábat (14 láb). A maradék 6 lábat kettesével szétosztva 3 nyúl és 4 tyúk adódik.',
              '2. Táblázattal (szisztematikus próbálgatás): Felsoroljuk az x = 1, 2, ..., 6 eseteket és kiszámoljuk a lábak számát.',
              '3. Grafikus módszerrel: Az y = 7 − x és y = 10 − 2x függvények metszéspontja az M(3; 4) pont, azaz x = 3 és y = 4.',
              'A grafikus módszer hatalmas előnye, hogy nemcsak egész számokra, hanem törtekre és tetszőleges valós számokra is működik!'
            ]}
          />
        </div>
      </TheorySection>

      {/* --- 2. RÉSZ: A GRAFIKUS MEGOLDÁS LÉPÉSEI --- */}
      <TheorySection
        number={2}
        title="A grafikus megoldás algoritmusa (4 lépés)"
        badge="Módszertan"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TheoryCard
            title="1. Lépés: Kifejezés"
            color="blue"
            icon={<Calculator className="w-5 h-5 text-blue-500" />}
            properties={[
              'Mindkét egyenletből kifejezzük az y ismeretlent.',
              'Cél: y = mx + b explicit (függvény) alak előállítása.',
              'Ügyelj az előjelekre és a nevezőkkel való osztásra!'
            ]}
          />
          <TheoryCard
            title="2. Lépés: Ábrázolás"
            color="indigo"
            icon={<Compass className="w-5 h-5 text-indigo-500" />}
            properties={[
              'Közös derékszögű koordináta-rendszerben felvesszük a tengelyeket és az egységeket.',
              'Megrajzoljuk a két lineáris függvény egyenesét (a b tengelymetszet és az m meredekség alapján).'
            ]}
          />
          <TheoryCard
            title="3. Lépés: Leolvasás"
            color="purple"
            icon={<Brain className="w-5 h-5 text-purple-500" />}
            properties={[
              'Megkeressük a két egyenes közös pontját (metszéspontját).',
              'Leolvassuk a pont első koordinátáját (x) és második koordinátáját (y).',
              'Megadjuk az (x; y) rendezett számpárt.'
            ]}
          />
          <TheoryCard
            title="4. Lépés: Ellenőrzés"
            color="emerald"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            properties={[
              'KÖTELEZŐ LÉPÉS!',
              'A leolvasott x és y értékeket behelyettesítjük mindkét eredeti egyenletbe.',
              'Megvizsgáljuk, hogy mindkét oldal egyenlő-e.'
            ]}
          />
        </div>

        <TheoryCallout
          title="Kidolgozott tankönyvi mintapélda (34. oldal)"
          type="example"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">
              Feladat: Melyek azok az x, y valós számok, amelyekre y = 6 − x és y = 1,5x + 1 is igaz?
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li><strong>1. lépés:</strong> Az egyenletek már explicit alakban vannak: f(x) = −x + 6 (m = −1, tengelymetszet = 6) és g(x) = 1,5x + 1 (m = 1,5, tengelymetszet = 1).</li>
              <li><strong>2. lépés:</strong> Ábrázoljuk a két egyenest közös síkban.</li>
              <li><strong>3. lépés:</strong> A grafikonok az M(2; 4) pontban metszik egymást. A megoldásjelölt: x = 2 és y = 4.</li>
              <li><strong>4. lépés (Ellenőrzés):</strong>
                <ul className="list-disc list-inside pl-4 text-emerald-700 font-medium">
                  <li>I. egyenlet: 4 = 6 − 2 = 4 (Igaz ✓)</li>
                  <li>II. egyenlet: 4 = 1,5 · 2 + 1 = 3 + 1 = 4 (Igaz ✓)</li>
                </ul>
              </li>
            </ol>
            <p className="font-semibold text-blue-700">
              Válasz: Az egyenletrendszer megoldása a (2; 4) rendezett számpár.
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* --- 3. RÉSZ: KÉT EGYENES KÖLCSÖNÖS HELYZETE ÉS A MEGOLDÁSOK SZÁMA --- */}
      <TheorySection
        number={3}
        title="Két egyenes kölcsönös helyzete és a megoldások száma"
        badge="Geometriai összefüggések"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GeometryFigureCard
            title="1. Metsző egyenesek"
            badge="Pontosan 1 megoldás"
            color="blue"
            description="Ha a két egyenes meredeksége különbözik (m₁ ≠ m₂), pontosan egy pontban metszik egymást."
            figure={<IntersectingLinesSvg size={260} />}
          />

          <GeometryFigureCard
            title="2. Párhuzamos egyenesek"
            badge="Nincs megoldás (∅)"
            color="rose"
            description="Ha a meredekségek egyenlők (m₁ = m₂), de a tengelymetszetek eltérnek (b₁ ≠ b₂), nincs közös pont: ellentmondás!"
            figure={<ParallelLinesSvg size={260} />}
          />

          <GeometryFigureCard
            title="3. Egybeeső egyenesek"
            badge="Végtelen sok megoldás"
            color="emerald"
            description="Ha a meredekségek és a tengelymetszetek is egyenlők (m₁ = m₂ és b₁ = b₂), a két egyenes egybeesik."
            figure={<CoincidentLinesSvg size={260} />}
          />
        </div>

        <TheoryTable
          title="Összefoglaló táblázat: Az egyenletrendszer algebrai és geometriai tulajdonságai"
          headers={['Geometriai helyzet', 'Meredekségek (m)', 'Tengelymetszetek (b)', 'Megoldások száma', 'Algebrai következmény']}
          rows={[
            [
              'Metsző egyenesek',
              'm₁ ≠ m₂',
              'Bármilyen lehet',
              'Pontosan 1 megoldáspár: (x₀; y₀)',
              'Egyértelmű megoldás'
            ],
            [
              'Párhuzamos egyenesek (nem egybeesők)',
              'm₁ = m₂',
              'b₁ ≠ b₂',
              '0 megoldás (üres halmaz ∅)',
              'Ellentmondás (pl. 0 = 7)'
            ],
            [
              'Egybeeső egyenesek',
              'm₁ = m₂',
              'b₁ = b₂',
              'Végtelen sok megoldás (az egyenes pontjai)',
              'Azonosság (pl. 0 = 0)'
            ]
          ]}
        />
      </TheorySection>

      {/* --- 4. RÉSZ: INTERAKTÍV EGYENLETRENDSZER-VIZSGÁLÓ ÉS KOORDINÁTA-RENDSZER --- */}
      <TheorySection
        number={4}
        title="Interaktív egyenletrendszer-elemző és koordináta-rendszer"
        badge="Gyakorlati szemléltető"
        badgeColor="emerald"
      >
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
          {/* Felső sáv: Cím és diszkrimináns / státusz jelző */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Calculator className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Dinamikus Koordinátarendszer Labor: Két Egyenes Kölcsönös Helyzete
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Állítsd a két egyenes meredekségét (m) és tengelymetszetét (b), és figyeld a metszéspont valós idejű mozgását a grafikonon!
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                solutionStatus === 'one'
                  ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                  : solutionStatus === 'parallel'
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              {solutionSummary}
            </div>
          </div>

          {/* Minták gyorsválasztó gombok */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Tankönyvi és vizsga minták:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {SAMPLE_SYSTEMS.map((sys) => {
                const isSelected = selectedPresetId === sys.id;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => handleSelectPreset(sys)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/30'
                        : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold truncate text-[11px] sm:text-xs">{sys.name}</div>
                    <div className="text-[10px] opacity-80 font-mono mt-0.5 truncate">{sys.solutionType}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fő elrendezés: 5 oszlop csúszkák, 7 oszlop koordinátarendszer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Bal oldali vezérlők */}
            <div className="lg:col-span-5 space-y-4">
              {/* 1. Egyenes (e1) - Kék */}
              <div className="p-4 bg-slate-800/80 rounded-xl border border-sky-500/40 space-y-3.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                    <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                      I. Egyenes (e₁): y = m₁x + b₁
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setM1(-m1);
                      setSelectedPresetId('custom');
                    }}
                    title="Meredekség előjelváltása"
                    className="text-[10px] px-2 py-0.5 rounded bg-sky-950/60 hover:bg-sky-900 text-sky-300 border border-sky-700 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> ± Irány
                  </button>
                </div>

                {/* m1 csúszka */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Meredekség (m₁):</span>
                    <span className="font-mono text-sky-300 font-bold">{m1}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={m1}
                    onChange={(e) => {
                      setM1(parseFloat(e.target.value));
                      setSelectedPresetId('custom');
                    }}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                {/* b1 csúszka */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tengelymetszet (b₁):</span>
                    <span className="font-mono text-sky-300 font-bold">{b1}</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.5"
                    value={b1}
                    onChange={(e) => {
                      setB1(parseFloat(e.target.value));
                      setSelectedPresetId('custom');
                    }}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* 2. Egyenes (e2) - Sárga/Borostyán */}
              <div className="p-4 bg-slate-800/80 rounded-xl border border-amber-500/40 space-y-3.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                      II. Egyenes (e₂): y = m₂x + b₂
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setM2(m1);
                      setSelectedPresetId('custom');
                    }}
                    title="Meredekségek egyenlővé tétele (párhuzamosság)"
                    className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-700 flex items-center gap-1 transition-colors"
                  >
                    <Sliders className="w-3 h-3" /> m₂ = m₁ (Párhuzamos)
                  </button>
                </div>

                {/* m2 csúszka */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Meredekség (m₂):</span>
                    <span className="font-mono text-amber-300 font-bold">{m2}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={m2}
                    onChange={(e) => {
                      setM2(parseFloat(e.target.value));
                      setSelectedPresetId('custom');
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* b2 csúszka */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tengelymetszet (b₂):</span>
                    <span className="font-mono text-amber-300 font-bold">{b2}</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.5"
                    value={b2}
                    onChange={(e) => {
                      setB2(parseFloat(e.target.value));
                      setSelectedPresetId('custom');
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Jobb oldali Koordinátarendszer SVG */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-700 p-3 flex flex-col items-center shadow-inner relative overflow-hidden">
              <svg
                viewBox="0 0 520 340"
                className="w-full h-auto max-h-[380px] select-none"
              >
                {/* Finom rácsvonalak */}
                <g stroke="#334155" strokeWidth="0.7" strokeDasharray="2,2" opacity="0.6">
                  {[-12, -10, -8, -6, -4, -2, 2, 4, 6, 8, 10, 12].map((x) => (
                    <line key={`gx-${x}`} x1={toSvgX(x)} y1="15" x2={toSvgX(x)} y2="325" />
                  ))}
                  {[-8, -6, -4, -2, 2, 4, 6, 8].map((y) => (
                    <line key={`gy-${y}`} x1="15" y1={toSvgY(y)} x2="505" y2={toSvgY(y)} />
                  ))}
                </g>

                {/* Főtengelyek */}
                <line x1="15" y1={originY} x2="505" y2={originY} stroke="#64748b" strokeWidth="1.8" />
                <line x1={originX} y1="325" x2={originX} y2="15" stroke="#64748b" strokeWidth="1.8" />
                <polygon points="508,175 500,171 500,179" fill="#64748b" />
                <polygon points="260,12 256,20 264,20" fill="#64748b" />
                <text x="502" y="167" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
                <text x="268" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>
                <text x="250" y="189" fill="#64748b" fontSize="9" fontFamily="monospace">0</text>

                {/* Tengelyosztások */}
                {[-10, -8, -6, -4, -2, 2, 4, 6, 8, 10].map((x) => (
                  <text key={`tx-${x}`} x={toSvgX(x)} y={originY + 14} fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    {x}
                  </text>
                ))}
                {[-8, -6, -4, -2, 2, 4, 6, 8].map((y) => (
                  <text key={`ty-${y}`} x={originX - 8} y={toSvgY(y) + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                    {y}
                  </text>
                ))}

                {/* 1. Egyenes (e1) - Kék */}
                <line
                  x1={toSvgX(l1x1)}
                  y1={toSvgY(l1y1)}
                  x2={toSvgX(l1x2)}
                  y2={toSvgY(l1y2)}
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* 2. Egyenes (e2) - Sárga (ha egybeesik, szaggatott borostyán) */}
                <line
                  x1={toSvgX(l2x1)}
                  y1={toSvgY(l2y1)}
                  x2={toSvgX(l2x2)}
                  y2={toSvgY(l2y2)}
                  stroke="#f59e0b"
                  strokeWidth={isCoincident ? 3 : 2.5}
                  strokeDasharray={isCoincident ? "8,5" : undefined}
                  strokeLinecap="round"
                />

                {/* Metszéspont (M) ha egyetlen metszéspont van */}
                {solutionStatus === 'one' && intersectionX !== null && intersectionY !== null && (
                  <g>
                    {/* Vetítővonalak ha látható tartományban van */}
                    {Math.abs(intersectionX) <= 12 && Math.abs(intersectionY) <= 8 && (
                      <>
                        <line x1={toSvgX(intersectionX)} y1={originY} x2={toSvgX(intersectionX)} y2={toSvgY(intersectionY)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1={originX} y1={toSvgY(intersectionY)} x2={toSvgX(intersectionX)} y2={toSvgY(intersectionY)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />

                        {/* Pulzáló metszéspont */}
                        <circle cx={toSvgX(intersectionX)} cy={toSvgY(intersectionY)} r="9" fill="#ef4444" opacity="0.3" className="animate-ping" />
                        <circle cx={toSvgX(intersectionX)} cy={toSvgY(intersectionY)} r="5.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />

                        {/* Lebegő címke */}
                        <rect
                          x={toSvgX(intersectionX) + (intersectionX >= 0 ? 8 : -72)}
                          y={toSvgY(intersectionY) - 10}
                          width="64"
                          height="18"
                          rx="4"
                          fill="rgba(15, 23, 42, 0.9)"
                          stroke="#ef4444"
                          strokeWidth="1.2"
                        />
                        <text
                          x={toSvgX(intersectionX) + (intersectionX >= 0 ? 40 : -40)}
                          y={toSvgY(intersectionY) + 3}
                          fill="#fca5a5"
                          fontSize="9.5"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          M({intersectionX.toFixed(1)}; {intersectionY.toFixed(1)})
                        </text>
                      </>
                    )}
                  </g>
                )}

                {/* Párhuzamosság / Egybeesés információs kártya a grafikonon */}
                {solutionStatus === 'parallel' && (
                  <g transform="translate(260, 50)">
                    <rect x="-135" y="-14" width="270" height="28" rx="6" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1.2" />
                    <text x="0" y="4" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">
                      m₁ = m₂ = {m1} ⟹ Párhuzamosak ⟹ Nincs megoldás (∅)
                    </text>
                  </g>
                )}

                {solutionStatus === 'coincident' && (
                  <g transform="translate(260, 50)">
                    <rect x="-140" y="-14" width="280" height="28" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.2" />
                    <text x="0" y="4" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                      m₁ = m₂ és b₁ = b₂ ⟹ Egybeesők ⟹ Végtelen sok mo.
                    </text>
                  </g>
                )}

                {/* Jelmagyarázat */}
                <g transform="translate(18, 22)">
                  <rect width="130" height="50" rx="5" fill="rgba(15, 23, 42, 0.85)" stroke="#334155" strokeWidth="0.8" />
                  <line x1="8" y1="15" x2="24" y2="15" stroke="#0ea5e9" strokeWidth="3" />
                  <text x="30" y="18" fill="#bae6fd" fontSize="9" fontWeight="bold">e₁: y = {m1}x {b1 >= 0 ? `+ ${b1}` : `− ${Math.abs(b1)}`}</text>
                  <line x1="8" y1="33" x2="24" y2="33" stroke="#f59e0b" strokeWidth="3" strokeDasharray={isCoincident ? "4,2" : undefined} />
                  <text x="30" y="36" fill="#fef08a" fontSize="9" fontWeight="bold">e₂: y = {m2}x {b2 >= 0 ? `+ ${b2}` : `− ${Math.abs(b2)}`}</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Részletes levezető és összehasonlító kártyák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-sky-400" /> Explicit alakok és paraméterek
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-sky-300">
                  e₁: y = {m1}x {b1 >= 0 ? `+ ${b1}` : `− ${Math.abs(b1)}`} (m₁ = {m1}, b₁ = {b1})
                </div>
                <div className="text-amber-300">
                  e₂: y = {m2}x {b2 >= 0 ? `+ ${b2}` : `− ${Math.abs(b2)}`} (m₂ = {m2}, b₂ = {b2})
                </div>
              </div>
              <div className="text-xs text-slate-300 pt-1 border-t border-slate-700/50 mt-1 space-y-0.5">
                <div>• Meredekségek összehasonlítása: <strong>{m1 === m2 ? 'm₁ = m₂ (Azonos meredekség)' : 'm₁ ≠ m₂ (Eltérő meredekség)'}</strong></div>
                <div>• Tengelymetszetek: <strong>{b1 === b2 ? 'b₁ = b₂ (Közös tengelymetszet)' : 'b₁ ≠ b₂ (Különböző tengelymetszet)'}</strong></div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-400" /> Kölcsönös helyzet és megoldás
              </div>
              {solutionStatus === 'one' && intersectionX !== null && intersectionY !== null ? (
                <div className="space-y-1 text-xs">
                  <div className="text-sky-400 font-bold font-mono text-sm">
                    Metszéspont: M = ({intersectionX.toFixed(2)}; {intersectionY.toFixed(2)})
                  </div>
                  <div className="text-slate-300">
                    A két egyenes metszéspontja adja az egyenletrendszer <strong>egyetlen számpár megoldását</strong>.
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 pt-1">
                    Levezetés: ({m1})x + ({b1}) = ({m2})x + ({b2}) ⟹ ({deltaM.toFixed(1)})x = {(b2 - b1).toFixed(1)} ⟹ x = {intersectionX.toFixed(2)}
                  </div>
                </div>
              ) : solutionStatus === 'parallel' ? (
                <div className="space-y-1 text-xs">
                  <div className="text-rose-400 font-bold font-mono text-sm">
                    Megoldás: Üres halmaz (∅)
                  </div>
                  <div className="text-slate-300">
                    A meredekségek megegyeznek ({m1} = {m2}), de a tengelymetszetek eltérnek ({b1} ≠ {b2}).
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1">
                    A két egyenes párhuzamos és elválik egymástól, nincs közös pont ⟹ ellentmondásos rendszer.
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-xs">
                  <div className="text-emerald-400 font-bold font-mono text-sm">
                    Megoldás: Végtelen sok számpár
                  </div>
                  <div className="text-slate-300">
                    A két egyenlet meredeksége és tengelymetszete is megegyezik ({m1} = {m2} és {b1} = {b2}).
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1">
                    A két egyenes egybeesik, a közös pontok halmaza az egyenes összes pontja ⟹ azonosság.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* --- 5. RÉSZ: TIPUSCSAPDÁK ÉS TIPPEK --- */}
      <TheorySection
        number={5}
        title="Tipikus buktatók és vizsgatippek"
        badge="Mire figyelj?"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: A koordináták felcserélése (x és y)"
            trap="A metszéspont leolvasásakor sokan véletlenül a függőleges tengelyről (y) kezdik a számpár leírását: (y; x)."
            solution="A rendezett számpárban MINDIG az x (vízszintes tengely) az első, és az y (függőleges tengely) a második elem: (x; y). Pl. az M(3; 4) esetén x = 3 és y = 4!"
          />

          <TheoryTrapBox
            title="2. Csapda: A negatív előjel elhagyása átrendezéskor"
            trap="Ha az egyenletben pl. 2x − y = 5 szerepel, gyakori hiba azt írni, hogy y = 5 − 2x (helyes: −y = 5 − 2x ⟹ y = 2x − 5)."
            solution="Ha az y előtt mínusz előjel van, az egyenletet szorozd meg vagy oszd el (−1)-gyel, vagy vidd át az y-t a másik oldalra!"
          />

          <TheoryTrapBox
            title="3. Csapda: A leolvasási pontatlanság elfedése"
            trap="Nem minden egyenletrendszer metszéspontja esik rácspontra! Ha a metszéspont pl. (1,33; 2,67), a grafikonról csak becsülni lehet."
            solution="A grafikus módszer után mindig végezz ellenőrzést! Ha nem egész értékek adódnak, algebrai módszert (helyettesítés, egyenlő együtthatók) kell választani."
          />

          <TheoryTrapBox
            title="4. Csapda: „Nincs megoldás” összetévesztése a (0; 0)-val"
            trap="A (0; 0) rendezett számpár egy konkrét, valós megoldás (az origó)! Nem egyenlő azzal, hogy nincs megoldás."
            solution="Ha az egyenletrendszernek nincs megoldása, azt üres halmazként (∅) jelöljük, ami geometriailag párhuzamos, nem metsző egyeneseket jelent."
          />
        </div>

        <TheoryCallout
          title="Aranyszabály az ellenőrzéshez"
          type="tip"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-sm text-slate-700">
            A grafikus megoldás <strong>kötelező része az ellenőrzés</strong>! Még ha a pont tökéletes rácspontnak tűnik is a füzetben, a behelyettesítéses számolás bizonyítja, hogy a leolvasott koordináták valóban kielégítik-e mindkét egyenletet.
          </p>
        </TheoryCallout>
      </TheorySection>
    </TheoryTemplate>
  );
};

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

