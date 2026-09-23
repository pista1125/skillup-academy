import React, { useState, useEffect, useRef } from 'react';
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
  RefreshCw,
  MoveHorizontal,
  RotateCw,
  FlipHorizontal,
  Target,
  Sparkles,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Move,
  MousePointer2
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface GeometricTransformationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const GeometricTransformationsTheory: React.FC<GeometricTransformationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [activeTransform, setActiveTransform] = useState<'reflection' | 'pointReflection' | 'translation' | 'rotation'>('reflection');
  
  // Interactive controls
  const [shapeOffsetX, setShapeOffsetX] = useState<number>(0);
  const [shapeOffsetY, setShapeOffsetY] = useState<number>(0);
  
  // Transform-specific controls
  const [axisX, setAxisX] = useState<number>(160);
  const [centerX, setCenterX] = useState<number>(160);
  const [centerY, setCenterY] = useState<number>(80);
  const [transVectorX, setTransVectorX] = useState<number>(75);
  const [transVectorY, setTransVectorY] = useState<number>(0);
  const [rotAngle, setRotAngle] = useState<number>(60);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // SVG Direct Drag and Drop state
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragTarget, setDragTarget] = useState<'shape' | 'axis' | 'center' | 'trans' | null>(null);
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    initOffsetX: number;
    initOffsetY: number;
    initAxisX: number;
    initCenterX: number;
    initCenterY: number;
    initVecX: number;
    initVecY: number;
  }>({
    x: 0,
    y: 0,
    initOffsetX: 0,
    initOffsetY: 0,
    initAxisX: 160,
    initCenterX: 160,
    initCenterY: 80,
    initVecX: 75,
    initVecY: 0
  });

  const getSvgCoords = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 320 / rect.width;
    const scaleY = 160 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (
    target: 'shape' | 'axis' | 'center' | 'trans',
    e: React.PointerEvent
  ) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (!svgRef.current) return;
    const coords = getSvgCoords(e as any);
    setDragTarget(target);
    setDragStart({
      x: coords.x,
      y: coords.y,
      initOffsetX: shapeOffsetX,
      initOffsetY: shapeOffsetY,
      initAxisX: axisX,
      initCenterX: centerX,
      initCenterY: centerY,
      initVecX: transVectorX,
      initVecY: transVectorY
    });
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragTarget) return;
    const coords = getSvgCoords(e);
    const dx = coords.x - dragStart.x;
    const dy = coords.y - dragStart.y;

    if (dragTarget === 'shape') {
      const newX = Math.max(-45, Math.min(30, Math.round(dragStart.initOffsetX + dx)));
      const newY = Math.max(-25, Math.min(45, Math.round(dragStart.initOffsetY + dy)));
      setShapeOffsetX(newX);
      setShapeOffsetY(newY);
    } else if (dragTarget === 'axis') {
      const newAxis = Math.max(130, Math.min(190, Math.round(dragStart.initAxisX + dx)));
      setAxisX(newAxis);
    } else if (dragTarget === 'center') {
      const newCx = Math.max(130, Math.min(190, Math.round(dragStart.initCenterX + dx)));
      const newCy = Math.max(50, Math.min(110, Math.round(dragStart.initCenterY + dy)));
      setCenterX(newCx);
      setCenterY(newCy);
    } else if (dragTarget === 'trans') {
      const newVx = Math.max(-50, Math.min(120, Math.round(dragStart.initVecX + dx)));
      const newVy = Math.max(-35, Math.min(35, Math.round(dragStart.initVecY + dy)));
      setTransVectorX(newVx);
      setTransVectorY(newVy);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragTarget) {
      try {
        (e.target as Element).releasePointerCapture?.(e.pointerId);
      } catch {
        // safe fallback
      }
      setDragTarget(null);
    }
  };

  // Auto-rotation effect
  useEffect(() => {
    if (!isRotating || activeTransform !== 'rotation') return;
    const interval = setInterval(() => {
      setRotAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isRotating, activeTransform]);

  // Base triangle vertices
  const baseA = { x: 105 + shapeOffsetX, y: 40 + shapeOffsetY };
  const baseB = { x: 65 + shapeOffsetX, y: 80 + shapeOffsetY };
  const baseC = { x: 115 + shapeOffsetX, y: 95 + shapeOffsetY };

  // Calculate transformed points
  let targetA = { x: 0, y: 0 };
  let targetB = { x: 0, y: 0 };
  let targetC = { x: 0, y: 0 };

  if (activeTransform === 'reflection') {
    targetA = { x: 2 * axisX - baseA.x, y: baseA.y };
    targetB = { x: 2 * axisX - baseB.x, y: baseB.y };
    targetC = { x: 2 * axisX - baseC.x, y: baseC.y };
  } else if (activeTransform === 'pointReflection') {
    targetA = { x: 2 * centerX - baseA.x, y: 2 * centerY - baseA.y };
    targetB = { x: 2 * centerX - baseB.x, y: 2 * centerY - baseB.y };
    targetC = { x: 2 * centerX - baseC.x, y: 2 * centerY - baseC.y };
  } else if (activeTransform === 'translation') {
    targetA = { x: baseA.x + transVectorX, y: baseA.y + transVectorY };
    targetB = { x: baseB.x + transVectorX, y: baseB.y + transVectorY };
    targetC = { x: baseC.x + transVectorX, y: baseC.y + transVectorY };
  } else {
    // Rotation around (160, 80)
    const origin = { x: 160, y: 80 };
    const rad = (rotAngle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    targetA = {
      x: origin.x + (baseA.x - origin.x) * cos - (baseA.y - origin.y) * sin,
      y: origin.y + (baseA.x - origin.x) * sin + (baseA.y - origin.y) * cos
    };
    targetB = {
      x: origin.x + (baseB.x - origin.x) * cos - (baseB.y - origin.y) * sin,
      y: origin.y + (baseB.x - origin.x) * sin + (baseB.y - origin.y) * cos
    };
    targetC = {
      x: origin.x + (baseC.x - origin.x) * cos - (baseC.y - origin.y) * sin,
      y: origin.y + (baseC.x - origin.x) * sin + (baseC.y - origin.y) * cos
    };
  }

  const resetControls = () => {
    setShapeOffsetX(0);
    setShapeOffsetY(0);
    setAxisX(160);
    setCenterX(160);
    setCenterY(80);
    setTransVectorX(75);
    setTransVectorY(0);
    setRotAngle(60);
    setIsRotating(false);
    setDragTarget(null);
  };

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-7-geometriai-transzformaciok-theory"
      pdfFilename="7_osztaly_geometriai_transzformaciok.pdf"
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="Geometriai transzformációk"
      subtitle="A geometriai leképezések alapfogalmai, egybevágóság, invariáns tulajdonságok, a 4 alaptípus, fixpontok és fixegyenesek."
      themeColor="teal"
      quickRule={{
        label: 'Egybevágósági transzformáció alaptétele',
        formula: '|P\'Q\'| = |PQ| (távolságtartás)'
      }}
    >
      {/* 1. Szakasz: A Geometriai Transzformáció Fogalma */}
      <TheorySection
        number={1}
        title="A geometriai transzformáció (leképezés) fogalma"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Leképezés és pontpárok"
            variant="teal"
            badge="Alapfogalom"
            properties={[
              {
                label: 'Geometriai transzformáció:',
                value: 'Olyan szabály (függvény), amely a sík minden P pontjához egyértelműen hozzárendeli a sík egy P\' pontját.'
              },
              {
                label: 'Tárgypont (eredeti):',
                value: 'P — a kiindulási pont a síkban.'
              },
              {
                label: 'Képpont (transzformált):',
                value: 'P\' — a szabály szerint hozzárendelt új pont.'
              },
              {
                label: 'Alakzat képe (A\'):',
                value: 'Az A alakzat valamennyi pontjának képeiből álló új alakzat.'
              }
            ]}
          />

          <GeometryFigureCard
            title="Tárgypont és képpont kapcsolata"
            subtitle="A sík P pontjához a szabály a P' képpontot rendeli hozzá."
            variant="teal"
            figure={
              <svg viewBox="0 0 240 100" className="w-full max-w-[240px] h-28 mx-auto">
                {/* Eredeti alakzat */}
                <polygon points="40,25 20,75 70,75" className="fill-teal-100/70 stroke-teal-600 stroke-[2]" />
                <circle cx="40" cy="25" r="3" className="fill-teal-700" />
                <circle cx="20" cy="75" r="3" className="fill-teal-700" />
                <circle cx="70" cy="75" r="3" className="fill-teal-700" />
                <text x="36" y="19" className="text-[10px] font-bold fill-teal-800">A</text>
                <text x="10" y="80" className="text-[10px] font-bold fill-teal-800">B</text>
                <text x="74" y="80" className="text-[10px] font-bold fill-teal-800">C</text>
                <text x="38" y="58" className="text-[10px] font-bold fill-teal-900">A</text>

                {/* Leképezési nyíl */}
                <path d="M 85 50 Q 120 35 150 50" fill="none" className="stroke-slate-400 stroke-[2] stroke-dasharray-[3,3]" />
                <polygon points="155,52 146,46 148,54" className="fill-slate-600" />
                <text x="112" y="36" className="text-[10px] font-bold fill-slate-500 font-mono">T</text>

                {/* Kép alakzat */}
                <polygon points="200,25 180,75 230,75" className="fill-emerald-100/70 stroke-emerald-600 stroke-[2]" />
                <circle cx="200" cy="25" r="3" className="fill-emerald-700" />
                <circle cx="180" cy="75" r="3" className="fill-emerald-700" />
                <circle cx="230" cy="75" r="3" className="fill-emerald-700" />
                <text x="196" y="19" className="text-[10px] font-bold fill-emerald-800">A'</text>
                <text x="170" y="80" className="text-[10px] font-bold fill-emerald-800">B'</text>
                <text x="234" y="80" className="text-[10px] font-bold fill-emerald-800">C'</text>
                <text x="198" y="58" className="text-[10px] font-bold fill-emerald-900">A'</text>
              </svg>
            }
          />
        </div>

        <TheoryCallout
          type="info"
          title="Kölcsönösen egyértelmű leképezés (Bijekció)"
        >
          A geometriában általában olyan leképezésekkel foglalkozunk, ahol <strong>különböző pontoknak különböző a képe</strong>, és a sík <strong>minden pontja előáll</strong> pontosan egy pont képeként. Ez garantálja, hogy a transzformáció visszafelé is egyértelműen elvégezhető (létezik inverz transzformáció).
        </TheoryCallout>
      </TheorySection>

      {/* 2. Szakasz: Egybevágósági Transzformációk és Invariánsok */}
      <TheorySection
        number={2}
        title="Egybevágósági transzformációk és invariáns tulajdonságok"
        icon={<Sparkles className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCallout
          type="tip"
          title="A távolságtartás az egybevágóság alapköve"
        >
          Egy geometriai transzformációt <strong>egybevágósági transzformációnak</strong> nevezünk, ha <strong>távolságtartó</strong>, vagyis bármely két pont távolsága egyenlő képeik távolságával: <span className="font-mono font-bold">|P'Q'| = |PQ|</span>.
        </TheoryCallout>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          <TheoryCard
            title="1. Távolságtartás"
            variant="indigo"
            badge="|A'B'| = |AB|"
            properties={['Szakasz hossza megegyezik a kép szakaszának hosszával.']}
          />
          <TheoryCard
            title="2. Egyenestartás"
            variant="indigo"
            badge="e → e'"
            properties={['Egyenes képe mindig egyenes, szakasz képe mindig szakasz.']}
          />
          <TheoryCard
            title="3. Szögtartás"
            variant="indigo"
            badge="α' = α"
            properties={['Bármely szög képe pontosan megegyezik az eredeti szög nagyságával.']}
          />
          <TheoryCard
            title="4. Párhuzamosságtartás"
            variant="indigo"
            badge="e ∥ f ⟹ e' ∥ f'"
            properties={['Párhuzamos egyenespár képe is párhuzamos egyenespárt alkot.']}
          />
          <TheoryCard
            title="5. Területtartás"
            variant="indigo"
            badge="T' = T"
            properties={['Bármely síkidom területe megegyezik a kép síkidom területével.']}
          />
          <TheoryCard
            title="6. Illeszkedéstartás"
            variant="indigo"
            badge="P ∈ e ⟹ P' ∈ e'"
            properties={['Ha egy pont rajta fekszik az egyenesen, képe is rajta van az egyenes képén.']}
          />
        </div>
      </TheorySection>

      {/* 3. Szakasz: A 4 Alapvető Egybevágósági Transzformáció */}
      <TheorySection
        number={3}
        title="A 4 alapvető egybevágósági transzformáció"
        icon={<RotateCw className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Tengelyes tükrözés (t)"
            icon={<FlipHorizontal className="w-4 h-4 text-indigo-600" />}
            badge="Fordított körüljárás"
            variant="indigo"
            properties={[
              { label: 'Definíció:', value: 'A sík pontjaihoz a t tengelyre merőlegesen, azonos távolságra lévő túloldali pontot rendeli.' },
              { label: 'Körüljárási irány:', value: 'MEGFORDÍTJA az alakzat körüljárási irányát (indirekt/negatív egybevágóság).' },
              { label: 'Fix elemek:', value: 'A tengely minden pontja fixpont (pontonként fix), a tengelyre merőleges egyenesek fixegyenesek.' }
            ]}
          />

          <TheoryCard
            title="2. Középpontos tükrözés (O)"
            icon={<RefreshCw className="w-4 h-4 text-teal-600" />}
            badge="Egyenes körüljárás"
            variant="teal"
            properties={[
              { label: 'Definíció:', value: 'A sík P pontjához az O pontra illeszkedő, |OP\'| = |OP| tulajdonságú túloldali P\' pontot rendeli (180°-os forgatás).' },
              { label: 'Körüljárási irány:', value: 'MEGŐRZI a körüljárási irányt (direkt/pozitív egybevágóság).' },
              { label: 'Fix elemek:', value: 'Egyetlen fixpont az O centrum; a centrumon átmenő egyenesek mind fixegyenesek.' }
            ]}
          />

          <TheoryCard
            title="3. Párhuzamos eltolás (v)"
            icon={<MoveHorizontal className="w-4 h-4 text-blue-600" />}
            badge="Egyenes körüljárás"
            variant="blue"
            properties={[
              { label: 'Definíció:', value: 'A sík minden pontját adott v vektor irányában és v hosszával tolja el: PP\' = v.' },
              { label: 'Körüljárási irány:', value: 'MEGŐRZI a körüljárási irányt.' },
              { label: 'Fix elemek:', value: 'Nincs fixpontja (ha v ≠ 0); az eltolás vektorával párhuzamos egyenesek fixegyenesek.' }
            ]}
          />

          <TheoryCard
            title="4. Elforgatás / Forgatás (O, α)"
            icon={<RotateCw className="w-4 h-4 text-purple-600" />}
            badge="Egyenes körüljárás"
            variant="purple"
            properties={[
              { label: 'Definíció:', value: 'A sík pontjait az O forgási középpont körül adott α szöggel és adott forgási irányban forgatja el.' },
              { label: 'Körüljárási irány:', value: 'MEGŐRZI a körüljárási irányt.' },
              { label: 'Fix elemek:', value: 'Egyetlen fixpontja az O forgási középpont (ha α ≠ k·360°).' }
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Szakasz: Fixpontok és Fixegyenesek Rendszere */}
      <TheorySection
        number={4}
        title="Fixpontok és fixegyenesek rendszere"
        icon={<Target className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Fixpont (P' = P)"
            badge="Helyben maradó pont"
            variant="rose"
            properties={[
              {
                label: 'Fogalma:',
                value: 'Olyan pont, amelyet a transzformáció önmagába képez le (P\' = P).'
              },
              {
                label: 'Tengelyes tükrözés:',
                value: 'A tükörtengely minden pontja fixpont (végtelen sok fixpont).'
              },
              {
                label: 'Középpontos tükrözés:',
                value: 'Egyetlen fixpontja a tükrözés O középpontja.'
              },
              {
                label: 'Párhuzamos eltolás:',
                value: 'Nincs fixpontja (feltéve, hogy az eltolás nem nulla hosszúságú).'
              }
            ]}
          />

          <TheoryCard
            title="Fixegyenes (e' = e)"
            badge="Önmagába menő egyenes"
            variant="amber"
            properties={[
              {
                label: 'Pontonként fix egyenes:',
                value: 'Minden egyes pontja fixpont (pl. a tengelyes tükrözésnél a tükörtengely t).'
              },
              {
                label: 'Nem pontonként fix egyenes:',
                value: 'Az egyenes mint ponthalmaz önmagába képeződik le, de a pontjai elmozdulnak rajta.'
              },
              {
                label: 'Példa 1 (Tengelyes tükrözés):',
                value: 'A tengelyre merőleges egyenesek önmagukba mennek át (pontjaik tükröződnek a tengelyre).'
              },
              {
                label: 'Példa 2 (Középpontos tükrözés):',
                value: 'A centrumon átmenő egyenesek mind fixegyenesek, de nem pontonként fixek!'
              }
            ]}
          />
        </div>

        <div className="pt-2">
          <TheoryTable
            title="Transzformációk összehasonlító táblázata"
            headers={['Transzformáció', 'Körüljárási irány', 'Fixpontok', 'Fixegyenesek']}
            rows={[
              ['Tengelyes tükrözés (t)', 'MEGFORDÍTJA', 'A tengely minden pontja (végtelen sok)', 'A tengely (pontonként fix), és a rá merőlegesek'],
              ['Középpontos tükrözés (O)', 'MEGŐRZI', 'Pontosan egy (O centrum)', 'A centrumon átmenő összes egyenes'],
              ['Párhuzamos eltolás (v ≠ 0)', 'MEGŐRZI', 'NINCS fixpont', 'A vektorral párhuzamos egyenesek'],
              ['Forgatás (α ≠ k·360°)', 'MEGŐRZI', 'Pontosan egy (O centrum)', 'Nincs fixegyenes (kivéve α = 180°-nál)']
            ]}
          />
        </div>

        <TheoryTrapBox
          title="Tipikus Csapdák és Tévhitek"
          items={[
            'Csapda: "A fixegyenes minden pontja fixpont." NEM! Csak a pontonként fix egyenes pontjai maradnak helyben. A középpontos tükrözésnél az O-n átmenő egyenes pontjai átkerülnek a túloldalra, mégis maga az egyenes nem változik!',
            'Csapda: "Minden egybevágóság megőrzi a körüljárási irányt." NEM! A tengelyes tükrözés megfordítja az óramutató járása szerinti körüljárást!',
            'Csapda: "Ha egy szakasz hossza megegyezik a képpel, a leképezés biztosan egybevágóság." NEM! Nem elég egyetlen szakaszra megegyeznie: BÁRMELY két pont távolságának meg kell egyeznie!'
          ]}
        />
      </TheorySection>

      {/* 5. Szakasz: Interaktív Transzformáció-Labor */}
      <TheorySection
        number={5}
        title="Interaktív Transzformáció-Labor"
        icon={<Sliders className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-4 sm:p-6 space-y-4">
          {/* Fő transzformáció-választó */}
          <div className="flex flex-wrap gap-2 items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Válassz transzformációt:</span>
            <div className="flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant={activeTransform === 'reflection' ? 'default' : 'outline'}
                onClick={() => { setActiveTransform('reflection'); setIsRotating(false); }}
                className="text-xs h-8 rounded-xl"
              >
                <FlipHorizontal className="w-3.5 h-3.5 mr-1" />
                Tengelyes tükrözés
              </Button>
              <Button
                size="sm"
                variant={activeTransform === 'pointReflection' ? 'default' : 'outline'}
                onClick={() => { setActiveTransform('pointReflection'); setIsRotating(false); }}
                className="text-xs h-8 rounded-xl"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Középpontos tükrözés
              </Button>
              <Button
                size="sm"
                variant={activeTransform === 'translation' ? 'default' : 'outline'}
                onClick={() => { setActiveTransform('translation'); setIsRotating(false); }}
                className="text-xs h-8 rounded-xl"
              >
                <MoveHorizontal className="w-3.5 h-3.5 mr-1" />
                Párhuzamos eltolás
              </Button>
              <Button
                size="sm"
                variant={activeTransform === 'rotation' ? 'default' : 'outline'}
                onClick={() => setActiveTransform('rotation')}
                className="text-xs h-8 rounded-xl"
              >
                <RotateCw className="w-3.5 h-3.5 mr-1" />
                Elforgatás
              </Button>
            </div>
          </div>

          {/* Dinamikus vezérlők a kiválasztott transzformációhoz */}
          <div className="p-3.5 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Interaktív Vezérlők és Mozgatás:
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={resetControls}
                className="h-7 px-2 text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Alaphelyzet
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {/* Alakzat alap eltolása vízszintesen */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Move className="w-3 h-3 text-teal-600" />
                    Alakzat vízszintesen (X):
                  </span>
                  <span className="font-mono font-bold text-teal-600">{shapeOffsetX} px</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="30"
                  value={shapeOffsetX}
                  onChange={(e) => setShapeOffsetX(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              {/* Alakzat alap eltolása függőlegesen */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Move className="w-3 h-3 text-teal-600" />
                    Alakzat függőlegesen (Y):
                  </span>
                  <span className="font-mono font-bold text-teal-600">{shapeOffsetY} px</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="45"
                  value={shapeOffsetY}
                  onChange={(e) => setShapeOffsetY(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              {/* Tengelyes tükrözés vezérlő */}
              {activeTransform === 'reflection' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <span>Tükörtengely (t) x pozíciója:</span>
                    <span className="font-mono font-bold text-indigo-600">{axisX} px</span>
                  </div>
                  <input
                    type="range"
                    min="130"
                    max="190"
                    value={axisX}
                    onChange={(e) => setAxisX(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              )}

              {/* Középpontos tükrözés vezérlő */}
              {activeTransform === 'pointReflection' && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>Centrum (O) vízszintes helyzete:</span>
                      <span className="font-mono font-bold text-teal-600">{centerX} px</span>
                    </div>
                    <input
                      type="range"
                      min="130"
                      max="190"
                      value={centerX}
                      onChange={(e) => setCenterX(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>Centrum (O) függőleges helyzete:</span>
                      <span className="font-mono font-bold text-teal-600">{centerY} px</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="110"
                      value={centerY}
                      onChange={(e) => setCenterY(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>
                </>
              )}

              {/* Eltolás vezérlő */}
              {activeTransform === 'translation' && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>Vízszintes eltolás (v_x):</span>
                      <span className="font-mono font-bold text-blue-600">{transVectorX} px</span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="120"
                      value={transVectorX}
                      onChange={(e) => setTransVectorX(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>Függőleges eltolás (v_y):</span>
                      <span className="font-mono font-bold text-blue-600">{transVectorY} px</span>
                    </div>
                    <input
                      type="range"
                      min="-35"
                      max="35"
                      value={transVectorY}
                      onChange={(e) => setTransVectorY(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </>
              )}

              {/* Elforgatás vezérlő */}
              {activeTransform === 'rotation' && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>Forgatási szög (α):</span>
                      <span className="font-mono font-bold text-purple-600">{rotAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotAngle}
                      onChange={(e) => { setRotAngle(Number(e.target.value)); setIsRotating(false); }}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 pt-2">
                    <Button
                      size="sm"
                      variant={isRotating ? 'default' : 'outline'}
                      onClick={() => setIsRotating(!isRotating)}
                      className="text-xs h-7 rounded-lg"
                    >
                      {isRotating ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                      {isRotating ? 'Megállítás' : 'Auto-forgatás'}
                    </Button>
                    <div className="flex gap-1 text-[10px]">
                      {[0, 45, 90, 180, 270].map((deg) => (
                        <button
                          key={deg}
                          onClick={() => { setRotAngle(deg); setIsRotating(false); }}
                          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-slate-700 dark:text-slate-300 font-mono font-bold"
                        >
                          {deg}°
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Interaktív Canvas megjelenítő */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            {/* Közvetlen húzásos tipp sáv */}
            <div className="w-full flex items-center justify-between text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 rounded-lg px-3 py-1.5 mb-3">
              <span className="flex items-center gap-1.5">
                <MousePointer2 className="w-3.5 h-3.5 text-emerald-600" />
                <strong>Közvetlen mozgatás:</strong> Húzd az alakzatot, tengelyt vagy pontot közvetlenül az ábrán, vagy állítsd a csúszkákkal!
              </span>
              {dragTarget && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 animate-pulse">
                  Mozgatás folyamatban
                </span>
              )}
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 320 160"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="w-full max-w-md h-52 select-none touch-none bg-slate-50/40 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-850"
            >
              {/* Segéd koordináta rács */}
              <line x1="160" y1="10" x2="160" y2="150" className="stroke-slate-200 dark:stroke-slate-800 stroke-[1] stroke-dasharray-[2,2]" />
              <line x1="20" y1="80" x2="300" y2="80" className="stroke-slate-200 dark:stroke-slate-800 stroke-[1] stroke-dasharray-[2,2]" />

              {/* 1. Tengelyes tükrözés nézet */}
              {activeTransform === 'reflection' && (
                <>
                  {/* Összekötő merőleges szakaszok */}
                  <line x1={baseA.x} y1={baseA.y} x2={targetA.x} y2={targetA.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1={baseB.x} y1={baseB.y} x2={targetB.x} y2={targetB.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1={baseC.x} y1={baseC.y} x2={targetC.x} y2={targetC.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />

                  {/* Interaktív Tükörtengely (t) */}
                  <g
                    className="cursor-ew-resize"
                    onPointerDown={(e) => handlePointerDown('axis', e)}
                  >
                    <line x1={axisX} y1="0" x2={axisX} y2="160" stroke="transparent" strokeWidth="20" />
                    <line x1={axisX} y1="10" x2={axisX} y2="150" className="stroke-indigo-600 stroke-[2.5]" />
                    <text x={axisX + 5} y="22" className="text-[10px] font-bold fill-indigo-600">t tengely</text>
                  </g>
                </>
              )}

              {/* 2. Középpontos tükrözés nézet */}
              {activeTransform === 'pointReflection' && (
                <>
                  {/* Centrumon átmenő összekötők */}
                  <line x1={baseA.x} y1={baseA.y} x2={targetA.x} y2={targetA.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1={baseB.x} y1={baseB.y} x2={targetB.x} y2={targetB.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1={baseC.x} y1={baseC.y} x2={targetC.x} y2={targetC.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />

                  {/* Interaktív Centrum (O) */}
                  <g
                    className="cursor-move"
                    onPointerDown={(e) => handlePointerDown('center', e)}
                  >
                    <circle cx={centerX} cy={centerY} r="16" fill="transparent" />
                    <circle cx={centerX} cy={centerY} r="5" className="fill-teal-700 stroke-white stroke-2" />
                    <text x={centerX + 6} y={centerY - 5} className="text-[10px] font-bold fill-teal-800">O</text>
                  </g>
                </>
              )}

              {/* 3. Párhuzamos eltolás nézet */}
              {activeTransform === 'translation' && (
                <>
                  {/* Eltolási vektor a sarokban */}
                  <line x1="80" y1="20" x2={80 + transVectorX} y2={20 + transVectorY} className="stroke-blue-600 stroke-[2]" />
                  <polygon
                    points={`${80 + transVectorX},${20 + transVectorY} ${74 + transVectorX},${16 + transVectorY} ${74 + transVectorX},${24 + transVectorY}`}
                    className="fill-blue-600"
                  />
                  <text x="80" y="14" className="text-[8px] font-bold fill-blue-700">v vektor</text>

                  {/* Csúcsok elmozdulási nyilai */}
                  <line x1={baseA.x} y1={baseA.y} x2={targetA.x} y2={targetA.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1={baseB.x} y1={baseB.y} x2={targetB.x} y2={targetB.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1={baseC.x} y1={baseC.y} x2={targetC.x} y2={targetC.y} className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
                </>
              )}

              {/* 4. Elforgatás nézet */}
              {activeTransform === 'rotation' && (
                <>
                  <circle cx="160" cy="80" r="4" className="fill-purple-700" />
                  <text x="165" y="84" className="text-[9px] font-bold fill-purple-800">O</text>

                  {/* Sugarak és forgási ív */}
                  <line x1="160" y1="80" x2={baseA.x} y2={baseA.y} className="stroke-slate-300 stroke-[1] stroke-dasharray-[2,2]" />
                  <line x1="160" y1="80" x2={targetA.x} y2={targetA.y} className="stroke-purple-400 stroke-[1] stroke-dasharray-[2,2]" />
                </>
              )}

              {/* Eredeti Háromszög (ABC) - Közvetlenül húzható és mozgatható */}
              <g
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => handlePointerDown('shape', e)}
              >
                {/* Szélesebb átlátszó fogási zóna */}
                <polygon
                  points={`${baseA.x},${baseA.y} ${baseB.x},${baseB.y} ${baseC.x},${baseC.y}`}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="18"
                />
                <polygon
                  points={`${baseA.x},${baseA.y} ${baseB.x},${baseB.y} ${baseC.x},${baseC.y}`}
                  className="fill-teal-100/80 hover:fill-teal-200/80 stroke-teal-600 stroke-[2] transition-colors"
                />
                <circle cx={baseA.x} cy={baseA.y} r="3" className="fill-teal-700" />
                <circle cx={baseB.x} cy={baseB.y} r="3" className="fill-teal-700" />
                <circle cx={baseC.x} cy={baseC.y} r="3" className="fill-teal-700" />
                <text x={baseA.x - 5} y={baseA.y - 6} className="text-[9px] font-bold fill-teal-800 pointer-events-none">A</text>
                <text x={baseB.x - 12} y={baseB.y + 4} className="text-[9px] font-bold fill-teal-800 pointer-events-none">B</text>
                <text x={baseC.x + 4} y={baseC.y + 4} className="text-[9px] font-bold fill-teal-800 pointer-events-none">C</text>
              </g>

              {/* Kép Háromszög (A'B'C') */}
              {activeTransform === 'translation' ? (
                <g
                  className="cursor-move"
                  onPointerDown={(e) => handlePointerDown('trans', e)}
                >
                  <polygon
                    points={`${targetA.x},${targetA.y} ${targetB.x},${targetB.y} ${targetC.x},${targetC.y}`}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth="18"
                  />
                  <polygon
                    points={`${targetA.x},${targetA.y} ${targetB.x},${targetB.y} ${targetC.x},${targetC.y}`}
                    className="fill-blue-200/80 stroke-blue-800 stroke-[2]"
                  />
                  <circle cx={targetA.x} cy={targetA.y} r="3" className="fill-blue-700" />
                  <circle cx={targetB.x} cy={targetB.y} r="3" className="fill-blue-700" />
                  <circle cx={targetC.x} cy={targetC.y} r="3" className="fill-blue-700" />
                  <text x={targetA.x + 3} y={targetA.y - 6} className="text-[9px] font-bold fill-blue-800 pointer-events-none">A'</text>
                  <text x={targetB.x + 3} y={targetB.y + 5} className="text-[9px] font-bold fill-blue-800 pointer-events-none">B'</text>
                  <text x={targetC.x + 4} y={targetC.y + 4} className="text-[9px] font-bold fill-blue-800 pointer-events-none">C'</text>
                </g>
              ) : (
                <g>
                  <polygon
                    points={`${targetA.x},${targetA.y} ${targetB.x},${targetB.y} ${targetC.x},${targetC.y}`}
                    className={
                      activeTransform === 'reflection'
                        ? 'fill-indigo-100/80 stroke-indigo-600 stroke-[2]'
                        : activeTransform === 'pointReflection'
                        ? 'fill-teal-200/80 stroke-teal-800 stroke-[2]'
                        : 'fill-purple-200/80 stroke-purple-800 stroke-[2]'
                    }
                  />
                  <circle cx={targetA.x} cy={targetA.y} r="3" className="fill-indigo-700" />
                  <circle cx={targetB.x} cy={targetB.y} r="3" className="fill-indigo-700" />
                  <circle cx={targetC.x} cy={targetC.y} r="3" className="fill-indigo-700" />
                  <text x={targetA.x + 3} y={targetA.y - 6} className="text-[9px] font-bold fill-indigo-800">A'</text>
                  <text x={targetB.x + 3} y={targetB.y + 5} className="text-[9px] font-bold fill-indigo-800">B'</text>
                  <text x={targetC.x + 4} y={targetC.y + 4} className="text-[9px] font-bold fill-indigo-800">C'</text>
                </g>
              )}
            </svg>

            {/* Magyarázó és állapot sáv a laborhoz */}
            <div className="w-full text-xs text-slate-600 dark:text-slate-300 mt-3 p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-200/80 dark:border-slate-800">
              <div className="leading-relaxed">
                <strong>Megfigyelés:</strong>{' '}
                {activeTransform === 'reflection' && 'A tengely (t) mozgatásával a képpontok azonnal igazodnak. A körüljárás megfordult: A-B-C ↺, A\'-B\'-C\' ↻.'}
                {activeTransform === 'pointReflection' && 'A centrum (O) mozgatásával a pontok átellenes oldala frissül. A körüljárás megmaradt: A-B-C ↺, A\'-B\'-C\' ↺.'}
                {activeTransform === 'translation' && `Az eltolási vektor (vx: ${transVectorX}px, vy: ${transVectorY}px) mentén a háromszög párhuzamosan elmozdul.`}
                {activeTransform === 'rotation' && `Az O pont körül pontosan ${rotAngle}°-kal elfordult az alakzat. A távolságok és szögek teljesen épek maradnak.`}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                  |A'B'| = |AB|
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono">
                  T' = T
                </span>
              </div>
            </div>
          </div>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometricTransformationsTheory;
