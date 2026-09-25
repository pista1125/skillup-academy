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
import { Card } from '@/components/ui/card';
import {
  RotateCcw,
  Target,
  Sparkles,
  Compass,
  Move,
  Info,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Sliders,
  Shapes,
  Maximize2
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface PointReflectionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PointReflectionTheory: React.FC<PointReflectionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [selectedShape, setSelectedShape] = useState<'point' | 'segment' | 'triangle' | 'flag'>('triangle');
  const [centerX, setCenterX] = useState<number>(200);
  const [centerY, setCenterY] = useState<number>(130);
  const [angleDeg, setAngleDeg] = useState<number>(180);
  const [showRays, setShowRays] = useState<boolean>(true);

  // Original coordinates relative to base
  const shapesData = {
    point: [
      { id: 'P', x: 100, y: 70, label: 'P' }
    ],
    segment: [
      { id: 'A', x: 80, y: 60, label: 'A' },
      { id: 'B', x: 140, y: 90, label: 'B' }
    ],
    triangle: [
      { id: 'A', x: 70, y: 60, label: 'A' },
      { id: 'B', x: 140, y: 70, label: 'B' },
      { id: 'C', x: 100, y: 115, label: 'C' }
    ],
    flag: [
      { id: 'A', x: 80, y: 120, label: 'A' },
      { id: 'B', x: 80, y: 55, label: 'B' },
      { id: 'C', x: 130, y: 75, label: 'C' },
      { id: 'D', x: 80, y: 90, label: 'D' }
    ]
  };

  const points = shapesData[selectedShape];

  // Helper to calculate rotated point around (centerX, centerY) by angleDeg
  const getTransformedPoint = (p: { x: number; y: number }) => {
    const rad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = p.x - centerX;
    const dy = p.y - centerY;
    return {
      x: centerX + dx * cos - dy * sin,
      y: centerY + dx * sin + dy * cos
    };
  };

  const transformedPoints = points.map(p => ({
    ...p,
    ...getTransformedPoint(p),
    primeLabel: `${p.label}'`
  }));

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="5. Középpontos tükrözés"
      subtitle="Definíció, geometriai invariánsok, fix elemek, szerkesztések és interaktív laboratórium"
      themeColor="cyan"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_kozeppontos_tukrozes.pdf"
      quickRule={{
        label: 'A középpontos tükrözés alaptétele',
        formula: '|OP\'| = |OP|, O felezi PP\'-t, e\' ∥ e (ha O ∉ e)'
      }}
      topicId="g7-geom-point-reflection"
    >
      {/* 1. SZEKCIÓ: DEFINÍCIÓ ÉS ALAPFOGALMAK */}
      <TheorySection
        number={1}
        title="A középpontos tükrözés szabatos definíciója"
        badgeColor="cyan"
        icon={<Target className="w-5 h-5 text-cyan-600" />}
      >
        <TheoryCallout variant="cyan" title="A középpontos tükrözés matematikai definíciója">
          Legyen adott a síkban egy rögzített $O$ pont, amelyet <strong>tükörközéppontnak (centrumnak)</strong> nevezünk.
          A sík tetszőleges $P$ pontjához a következő szabály szerint rendeljük hozzá a $P'$ képpontot:
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Ha $P = O$, akkor a centrum képe önmaga: $O' = O$.</li>
            <li>
              Ha $P \neq O$, akkor $P'$ az $OP$ egyenes azon $O$-tól különböző pontja, amelyre:
              <div className="pt-1 font-semibold text-cyan-900 dark:text-cyan-200 font-mono">
                |OP'| = |OP|, és O a PP' szakasz felezőpontja.
              </div>
            </li>
          </ol>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <GeometryFigureCard
            title="Pont tükrözése"
            badge="Alaplépés"
            subtitle="P pont képe a centrum túloldalán"
            note="P, O és P' egy egyenesen vannak, O felezi a PP' szakaszt."
            figure={
              <svg viewBox="0 0 220 100" className="w-full h-24">
                <line x1="20" y1="50" x2="200" y2="50" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
                <line x1="40" y1="50" x2="110" y2="50" stroke="#06b6d4" strokeWidth="2.5" />
                <line x1="110" y1="50" x2="180" y2="50" stroke="#0891b2" strokeWidth="2.5" />
                {/* Distance markers */}
                <path d="M 73 45 L 77 55" stroke="#0891b2" strokeWidth="2" />
                <path d="M 143 45 L 147 55" stroke="#0891b2" strokeWidth="2" />
                {/* Points */}
                <circle cx="40" cy="50" r="4.5" className="fill-cyan-600" />
                <circle cx="110" cy="50" r="5" className="fill-amber-500 stroke-2 stroke-white" />
                <circle cx="180" cy="50" r="4.5" className="fill-teal-600" />
                {/* Labels */}
                <text x="35" y="38" className="text-xs font-bold fill-slate-800 dark:fill-slate-100">P</text>
                <text x="106" y="36" className="text-xs font-bold fill-amber-700 dark:fill-amber-300">O</text>
                <text x="175" y="38" className="text-xs font-bold fill-slate-800 dark:fill-slate-100">P'</text>
                <text x="68" y="70" className="text-[11px] font-semibold fill-cyan-700">d</text>
                <text x="138" y="70" className="text-[11px] font-semibold fill-cyan-700">d</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Szakasz tükrözése"
            badge="Párhuzamos"
            subtitle="A szakasz képe egyenlő és párhuzamos"
            note="A'B' || AB és |A'B'| = |AB| minden esetben teljesül."
            figure={
              <svg viewBox="0 0 220 100" className="w-full h-24">
                <line x1="40" y1="30" x2="80" y2="40" stroke="#2563eb" strokeWidth="2.5" />
                <line x1="140" y1="60" x2="180" y2="70" stroke="#0891b2" strokeWidth="2.5" />
                {/* Rays */}
                <line x1="40" y1="30" x2="180" y2="70" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" />
                <line x1="80" y1="40" x2="140" y2="60" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" />
                <circle cx="110" cy="50" r="4.5" className="fill-amber-500" />
                <circle cx="40" cy="30" r="3.5" className="fill-blue-600" />
                <circle cx="80" cy="40" r="3.5" className="fill-blue-600" />
                <circle cx="180" cy="70" r="3.5" className="fill-teal-600" />
                <circle cx="140" cy="60" r="3.5" className="fill-teal-600" />
                <text x="30" y="27" className="text-[10px] font-bold fill-blue-700">A</text>
                <text x="75" y="34" className="text-[10px] font-bold fill-blue-700">B</text>
                <text x="115" y="46" className="text-[11px] font-bold fill-amber-700">O</text>
                <text x="135" y="78" className="text-[10px] font-bold fill-teal-700">B'</text>
                <text x="183" y="85" className="text-[10px] font-bold fill-teal-700">A'</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Háromszög tükrözése"
            badge="Egybevágó"
            subtitle="A csúcsok egyenkénti tükrözése"
            note="ΔA'B'C' ≅ ΔABC, körüljárásuk azonos irányú marad."
            figure={
              <svg viewBox="0 0 220 100" className="w-full h-24">
                <polygon points="30,40 65,30 50,70" fill="rgba(6,182,212,0.15)" stroke="#0891b2" strokeWidth="2" />
                <polygon points="190,60 155,70 170,30" fill="rgba(20,184,166,0.15)" stroke="#0d9488" strokeWidth="2" />
                <line x1="30" y1="40" x2="190" y2="60" stroke="#cbd5e1" strokeDasharray="2,2" strokeWidth="1" />
                <line x1="65" y1="30" x2="155" y2="70" stroke="#cbd5e1" strokeDasharray="2,2" strokeWidth="1" />
                <line x1="50" y1="70" x2="170" y2="30" stroke="#cbd5e1" strokeDasharray="2,2" strokeWidth="1" />
                <circle cx="110" cy="50" r="4.5" className="fill-amber-500" />
                <text x="22" y="38" className="text-[9px] font-bold fill-cyan-800">A</text>
                <text x="65" y="24" className="text-[9px] font-bold fill-cyan-800">B</text>
                <text x="40" y="82" className="text-[9px] font-bold fill-cyan-800">C</text>
                <text x="106" y="42" className="text-[10px] font-bold fill-amber-700">O</text>
                <text x="193" y="66" className="text-[9px] font-bold fill-teal-800">A'</text>
                <text x="150" y="82" className="text-[9px] font-bold fill-teal-800">B'</text>
                <text x="173" y="27" className="text-[9px] font-bold fill-teal-800">C'</text>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: TULAJDONSÁGOK ÉS INVARIÁNSOK */}
      <TheorySection
        number={2}
        title="A középpontos tükrözés geometriai tulajdonságai"
        badgeColor="teal"
        icon={<Sparkles className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Egybevágósági transzformáció"
            variant="teal"
            badge="Távolságtartó"
            properties={[
              { label: 'Távolságtartás', value: '|A\'B\'| = |AB| (a szakaszok hossza nem változik)' },
              { label: 'Szögtartás', value: '∠A\'B\'C\' = ∠ABC (a szögek nagysága változatlan marad)' },
              { label: 'Egyenestartás', value: 'Egyenes képe egyenes, félegyenesé félegyenes' },
              { label: 'Területtartás', value: 'T(A\'B\'C\') = T(ABC) (alakzatok területe azonos)' }
            ]}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A középpontos tükrözésnél a kép alakja és mérete tökéletesen megegyezik az eredetivel.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Fixpont és Fixegyenesek"
            variant="cyan"
            badge="Lényeges!"
            properties={[
              { label: 'Egyetlen fixpont', value: 'Kizárólag az O centrum (mivel O\' = O)' },
              { label: 'Fixegyenesek', value: 'Minden olyan e egyenes, amely átmegy az O ponton' },
              { label: 'Nem pontonként fixek', value: 'A pontok helyet cserélnek O körül (P → P\')' },
              { label: 'Ha e nem megy át O-n', value: 'e\' ∥ e (képegyenes mindig párhuzamos az eredetivel!)' }
            ]}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Ez óriási különbség a tengelyes tükrözéshez képest, ahol a tükörtengely minden pontja fix!
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Körüljárási irány és Forgatás"
            variant="indigo"
            badge="Orientációtartó"
            properties={[
              { label: 'Körüljárási irány', value: 'MEGŐRZI a körüljárást (A-B-C ↺ ⇒ A\'-B\'-C\' ↺)' },
              { label: 'Típus', value: 'Direkt egybevágóság (ellentétben a tengelyes tükrözéssel)' },
              { label: '180°-os forgatás', value: 'Egyenértékű az O centrum körüli 180°-os elforgatással' },
              { label: 'Kétszeres tükrözés', value: 'T_O(T_O(P)) = P (kétszer alkalmazva identitás)' }
            ]}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mivel a körüljárási irány megmarad, a középpontos tükrözés a síkban végrehajtható folytonos $180^\circ$-os elforgatással.
            </p>
          </TheoryCard>

          <TheoryCard
            title="4. Párhuzamosság és Félsíkok"
            variant="purple"
            badge="e' || e"
            properties={[
              { label: 'Egyenes és képe', value: 'Ha O ∉ e, akkor e\' || e minden esetben!' },
              { label: 'Irányítás', value: 'A szakasz iránya megfordul: AB vektor képe B\'A\' vektorral egyezik' },
              { label: 'Kör képe', value: 'Ugyanakkora sugarú kör, középpontja a középpont tükörképe' },
              { label: 'Félsík képe', value: 'Átellenes félsíkba kerül' }
            ]}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Ha egyenesre tükrözünk középpontosan, az egyenes és a képe mindig párhuzamos egyenespárt alkot.
            </p>
          </TheoryCard>
        </div>

        {/* Összehasonlító táblázat */}
        <div className="pt-4">
          <TheoryTable
            title="Tengelyes tükrözés vs. Középpontos tükrözés összehasonlítása"
            headers={['Tulajdonság', 'Tengelyes tükrözés (t)', 'Középpontos tükrözés (O)']}
            rows={[
              ['Alapelem', 'Egyenes (tengely: t)', 'Pont (centrum: O)'],
              ['Fixpontok', 'A tengely minden pontja fix (végtelen sok)', 'Egyetlenegy fixpont: az O centrum'],
              ['Fixegyenesek', 'A t tengely, és a rá merőleges egyenesek', 'Minden egyenes, amely átmegy O-n'],
              ['Körüljárási irány', 'MEGFORDÍTJA (indirekt)', 'MEGTARTJA (direkt)'],
              ['Egyenes és képe', 'Metszik egymást a tengelyen (vagy párhuzamosak)', 'Mindig párhuzamosak: e\' ∥ e (ha O ∉ e)'],
              ['Forgatásos kapcsolat', 'Nem állítható elő forgatással síkban', 'Pontosan megegyezik a 180°-os forgatással']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: SZERKESZTÉSEK LÉPÉSRŐL LÉPÉSRE */}
      <TheorySection
        number={3}
        title="Szerkesztési lépések körzővel és vonalzóval"
        badgeColor="purple"
        icon={<Compass className="w-5 h-5 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Pont tükrözése"
            badge="Alaplépés"
            properties={[
              { label: '1. lépés', value: 'Vonalzóval húzzunk félegyenest P-ből az O ponton keresztül.' },
              { label: '2. lépés', value: 'Körzőnyílásba vesszük az OP távolságot (körzőhegy O-ban).' },
              { label: '3. lépés', value: 'A félegyenes túloldalára rámérjük: megkapjuk a P\' pontot.' }
            ]}
          />

          <TheoryCard
            title="2. Szakasz tükrözése"
            badge="AB szakasz"
            properties={[
              { label: '1. lépés', value: 'Tükrözzük az A végpontot O-ra: megkapjuk A\'-t.' },
              { label: '2. lépés', value: 'Tükrözzük a B végpontot O-ra: megkapjuk B\'-t.' },
              { label: '3. lépés', value: 'Összekötjük A\'-t és B\'-t. Ellenőrzés: A\'B\' ∥ AB és |A\'B\'| = |AB|.' }
            ]}
          />

          <TheoryCard
            title="3. Sokszög tükrözése"
            badge="ΔABC csúcsai"
            properties={[
              { label: '1. lépés', value: 'Minden egyes csúcsot (A, B, C) külön-külön átvetítünk O-n.' },
              { label: '2. lépés', value: 'Minden távolságot felmérünk a túloldalra: A\', B\', C\'.' },
              { label: '3. lépés', value: 'Összekötjük a képpontokat: ΔA\'B\'C\' ≅ ΔABC azonos körüljárással.' }
            ]}
          />
        </div>

        <TheoryTrapBox
          title="Gyakori tévedések és csapdák a középpontos tükrözésnél"
          traps={[
            'Tévedés: "A középpontos tükrözés megfordítja a körüljárást." → NEM! A középpontos tükrözés megtartja az orientációt (óramutatóval ellentétes marad)!',
            'Tévedés: "A fixegyenesek pontjai fixek." → NEM! A fixegyenes egésze képezi le önmagára a halmazt, de az egyes pontok átvándorolnak O túloldalára!',
            'Tévedés: "A tükörkép közelebb vagy távolabb van O-tól." → NEM! A definíció szerint pontosan |OP\'| = |OP|, O a felezőpont!',
            'Tévedés összekeverni a tengelyes tükrözéssel: tengelyesnél merőlegest állítunk a tengelyre; középpontosnál az O ponton vezetjük át az egyenest!'
          ]}
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV KÖZÉPPONTOS TÜKRÖZÉSI LABOR */}
      <TheorySection
        number={4}
        title="Interaktív Középpontos Tükrözési Laboratórium"
        badgeColor="indigo"
        icon={<Sliders className="w-5 h-5 text-indigo-600" />}
      >
        <TheoryCallout variant="indigo" title="Fedezd fel a tükrözést dinamikusan!">
          Válassz alakzatot, mozgasd a centrumot ($O$), és a csúszkával forgasd át az alakzatot $0^\circ$-tól $180^\circ$-ig!
          Figyeld meg, hogy a $180^\circ$-os állásnál pontosan megkapod a középpontos tükörképet, ahol a pontokat és képpontjaikat összekötő szakaszokat az $O$ centrum felezi!
        </TheoryCallout>

        <Card className="p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-5">
          {/* Vezérlősáv */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Alakzat:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'point', label: 'Pont (P)' },
                  { id: 'segment', label: 'Szakasz (AB)' },
                  { id: 'triangle', label: 'Háromszög (ΔABC)' },
                  { id: 'flag', label: 'Zászló (ABCD)' }
                ].map(item => (
                  <Button
                    key={item.id}
                    size="sm"
                    variant={selectedShape === item.id ? 'default' : 'outline'}
                    className={selectedShape === item.id ? 'bg-cyan-600 hover:bg-cyan-700 text-white h-7 text-xs px-2.5' : 'h-7 text-xs px-2.5'}
                    onClick={() => setSelectedShape(item.id as any)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={showRays ? 'secondary' : 'outline'}
                className="h-7 text-xs px-2.5"
                onClick={() => setShowRays(!showRays)}
              >
                {showRays ? 'Sugárvonalak elrejtése' : 'Sugárvonalak mutatása'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs px-2.5"
                onClick={() => {
                  setCenterX(200);
                  setCenterY(130);
                  setAngleDeg(180);
                }}
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Alaphelyzet
              </Button>
            </div>
          </div>

          {/* Dinamikus SVG vászon */}
          <div className="relative w-full h-[280px] sm:h-[320px] bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
            <svg viewBox="0 0 400 260" className="w-full h-full select-none">
              {/* Rácsvonalak */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-900" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="260" fill="url(#grid)" />

              {/* Sugárvonalak O-n keresztül */}
              {showRays && points.map((p, idx) => {
                const tp = transformedPoints[idx];
                return (
                  <g key={`ray-${p.id}`}>
                    <line
                      x1={p.x}
                      y1={p.y}
                      x2={tp.x}
                      y2={tp.y}
                      stroke="#94a3b8"
                      strokeDasharray="4,4"
                      strokeWidth="1.2"
                    />
                    {/* Távolság egyenlőség jelzése O körül ha 180 fok */}
                    {angleDeg === 180 && (
                      <>
                        <circle cx={(p.x + centerX) / 2} cy={(p.y + centerY) / 2} r="2" fill="#0891b2" />
                        <circle cx={(tp.x + centerX) / 2} cy={(tp.y + centerY) / 2} r="2" fill="#0891b2" />
                      </>
                    )}
                  </g>
                );
              })}

              {/* EREDETI ALAKZAT */}
              {selectedShape === 'point' && (
                <g>
                  <circle cx={points[0].x} cy={points[0].y} r="6" className="fill-cyan-600" />
                  <text x={points[0].x - 14} y={points[0].y - 8} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">
                    P
                  </text>
                </g>
              )}

              {selectedShape === 'segment' && (
                <g>
                  <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} stroke="#0891b2" strokeWidth="3" />
                  {points.map(p => (
                    <circle key={`orig-${p.id}`} cx={p.x} cy={p.y} r="5" className="fill-cyan-600" />
                  ))}
                  <text x={points[0].x - 14} y={points[0].y - 6} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">A</text>
                  <text x={points[1].x + 6} y={points[1].y - 6} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">B</text>
                </g>
              )}

              {selectedShape === 'triangle' && (
                <g>
                  <polygon
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(6, 182, 212, 0.2)"
                    stroke="#0891b2"
                    strokeWidth="2.5"
                  />
                  {points.map(p => (
                    <circle key={`orig-${p.id}`} cx={p.x} cy={p.y} r="4.5" className="fill-cyan-600" />
                  ))}
                  <text x={points[0].x - 14} y={points[0].y - 6} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">A</text>
                  <text x={points[1].x + 6} y={points[1].y - 6} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">B</text>
                  <text x={points[2].x - 14} y={points[2].y + 16} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">C</text>
                </g>
              )}

              {selectedShape === 'flag' && (
                <g>
                  {/* Rúd */}
                  <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} stroke="#0891b2" strokeWidth="3" />
                  {/* Zászlólap */}
                  <polygon
                    points={`${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
                    fill="rgba(6, 182, 212, 0.25)"
                    stroke="#0891b2"
                    strokeWidth="2"
                  />
                  {points.map(p => (
                    <circle key={`orig-${p.id}`} cx={p.x} cy={p.y} r="4" className="fill-cyan-600" />
                  ))}
                  <text x={points[0].x - 14} y={points[0].y + 12} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">A</text>
                  <text x={points[1].x - 14} y={points[1].y - 6} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">B</text>
                  <text x={points[2].x + 8} y={points[2].y + 4} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">C</text>
                  <text x={points[3].x - 14} y={points[3].y + 4} className="text-xs font-bold fill-cyan-800 dark:fill-cyan-300">D</text>
                </g>
              )}

              {/* TRANSZFORMÁLT ALAKZAT (KÉP) */}
              {selectedShape === 'point' && (
                <g>
                  <circle cx={transformedPoints[0].x} cy={transformedPoints[0].y} r="6" className="fill-teal-600" />
                  <text x={transformedPoints[0].x + 8} y={transformedPoints[0].y + 14} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">
                    P'
                  </text>
                </g>
              )}

              {selectedShape === 'segment' && (
                <g>
                  <line
                    x1={transformedPoints[0].x}
                    y1={transformedPoints[0].y}
                    x2={transformedPoints[1].x}
                    y2={transformedPoints[1].y}
                    stroke="#0d9488"
                    strokeWidth="3"
                  />
                  {transformedPoints.map(p => (
                    <circle key={`trans-${p.id}`} cx={p.x} cy={p.y} r="5" className="fill-teal-600" />
                  ))}
                  <text x={transformedPoints[0].x + 8} y={transformedPoints[0].y + 14} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">A'</text>
                  <text x={transformedPoints[1].x - 16} y={transformedPoints[1].y + 14} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">B'</text>
                </g>
              )}

              {selectedShape === 'triangle' && (
                <g>
                  <polygon
                    points={transformedPoints.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(20, 184, 166, 0.25)"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                  />
                  {transformedPoints.map(p => (
                    <circle key={`trans-${p.id}`} cx={p.x} cy={p.y} r="4.5" className="fill-teal-600" />
                  ))}
                  <text x={transformedPoints[0].x + 6} y={transformedPoints[0].y + 14} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">A'</text>
                  <text x={transformedPoints[1].x - 18} y={transformedPoints[1].y + 14} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">B'</text>
                  <text x={transformedPoints[2].x + 8} y={transformedPoints[2].y - 8} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">C'</text>
                </g>
              )}

              {selectedShape === 'flag' && (
                <g>
                  <line
                    x1={transformedPoints[0].x}
                    y1={transformedPoints[0].y}
                    x2={transformedPoints[1].x}
                    y2={transformedPoints[1].y}
                    stroke="#0d9488"
                    strokeWidth="3"
                  />
                  <polygon
                    points={`${transformedPoints[1].x},${transformedPoints[1].y} ${transformedPoints[2].x},${transformedPoints[2].y} ${transformedPoints[3].x},${transformedPoints[3].y}`}
                    fill="rgba(20, 184, 166, 0.25)"
                    stroke="#0d9488"
                    strokeWidth="2"
                  />
                  {transformedPoints.map(p => (
                    <circle key={`trans-${p.id}`} cx={p.x} cy={p.y} r="4" className="fill-teal-600" />
                  ))}
                  <text x={transformedPoints[0].x + 8} y={transformedPoints[0].y - 8} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">A'</text>
                  <text x={transformedPoints[1].x + 8} y={transformedPoints[1].y + 14} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">B'</text>
                  <text x={transformedPoints[2].x - 20} y={transformedPoints[2].y - 4} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">C'</text>
                  <text x={transformedPoints[3].x + 8} y={transformedPoints[3].y - 4} className="text-xs font-bold fill-teal-800 dark:fill-teal-300">D'</text>
                </g>
              )}

              {/* Tükörközéppont (Centrum: O) */}
              <g className="cursor-pointer">
                <circle cx={centerX} cy={centerY} r="8" className="fill-amber-500/30 stroke-2 stroke-amber-500" />
                <circle cx={centerX} cy={centerY} r="4.5" className="fill-amber-500" />
                <text x={centerX + 10} y={centerY - 10} className="text-sm font-black fill-amber-700 dark:fill-amber-300">
                  O (Centrum)
                </text>
              </g>
            </svg>
          </div>

          {/* Interaktív csúszkák és állapotvisszajelzők */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-cyan-600" />
                  Elfordulási szög (0° → 180°):
                </span>
                <span className="text-cyan-700 dark:text-cyan-400 font-mono text-sm">
                  {angleDeg}° {angleDeg === 180 ? '✓ (Középpontos tükörkép!)' : ''}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="5"
                value={angleDeg}
                onChange={e => setAngleDeg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0° (Eredeti)</span>
                <span>90° (Negyedfordulat)</span>
                <span className="font-bold text-cyan-700">180° (Középpontos tükrözés)</span>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-amber-600" />
                  Centrum X koordináta:
                </span>
                <span className="text-amber-700 dark:text-amber-400 font-mono text-sm">
                  O_x = {centerX} px
                </span>
              </div>
              <input
                type="range"
                min="140"
                max="260"
                step="5"
                value={centerX}
                onChange={e => setCenterX(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Balra tolás</span>
                <span>Közép</span>
                <span>Jobbra tolás</span>
              </div>
            </div>
          </div>

          {/* Dinamikus észrevétel doboz */}
          <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/30 rounded-xl border border-cyan-200/60 dark:border-cyan-900/40 text-xs text-cyan-900 dark:text-cyan-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
            <div>
              <strong>Laboratóriumi megfigyelés:</strong>{' '}
              {angleDeg === 180 ? (
                <span>
                  A $180^\circ$-os állásnál a pontok és képpontjaik összekötő szakaszának felezőpontja pontosan az $O$ centrum.
                  Figyeld meg: a szakaszok iránya átfordult ($A'B' \parallel AB$), de a háromszög körüljárási iránya változatlanul pozitív marad!
                </span>
              ) : (
                <span>
                  Jelenleg a forgatás köztes állapotban van (${angleDeg}^\circ$). Húzd a csúszkát $180^\circ$-ra, hogy megtekintsd a szabatos középpontos tükörképet!
                </span>
              )}
            </div>
          </div>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PointReflectionTheory;
