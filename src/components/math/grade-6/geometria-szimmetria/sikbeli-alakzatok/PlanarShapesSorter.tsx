import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlanarShapeMiniFigure } from './GeometryDiagrams';

export interface PlanarShapesSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function PlanarShapesSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: PlanarShapesSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number'
    ? propLevel
    : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number'
      ? propLevel
      : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: GEOMETRIAI ALAPELEMEK CSOPORTOSÍTÁSA
    1: {
      level: 1,
      title: 'Geometriai alapelemek',
      subtitle: 'Sorold be az ábrákat és kifejezéseket a megfelelő geometriai alapelemhez!',
      categories: [
        {
          id: 'point-segment',
          title: 'Pont és Szakasz (Véges)',
          description: 'Kiterjedés nélküli pont vagy 2 végponttal határolt szakasz',
          color: 'emerald'
        },
        {
          id: 'ray',
          title: 'Félegyenes (1 irányba végtelen)',
          description: 'Kezdőpontja van, de a másik irányban nincs vége',
          color: 'cyan'
        },
        {
          id: 'line',
          title: 'Egyenes (Mindkét irányba végtelen)',
          description: 'Nincsenek végpontjai, mindkét irányban végtelen',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', figure: <PlanarShapeMiniFigure type="point" />, text: 'P pont', categoryId: 'point-segment' },
        { id: 'i1-2', figure: <PlanarShapeMiniFigure type="segment" />, text: 'AB szakasz', categoryId: 'point-segment' },
        { id: 'i1-3', figure: <PlanarShapeMiniFigure type="ray" />, text: '[AB) félegyenes', categoryId: 'ray' },
        { id: 'i1-4', figure: <PlanarShapeMiniFigure type="line" />, text: 'e egyenes', categoryId: 'line' },
        { id: 'i1-5', figure: <PlanarShapeMiniFigure type="segment" />, text: '2 végpontos vonal', categoryId: 'point-segment' },
        { id: 'i1-6', figure: <PlanarShapeMiniFigure type="ray" />, text: 'Fénysugár (kezdőpont)', categoryId: 'ray' },
        { id: 'i1-7', figure: <PlanarShapeMiniFigure type="line" />, text: 'Végtelen vonal', categoryId: 'line' },
        { id: 'i1-8', figure: <PlanarShapeMiniFigure type="parallel_lines" />, text: 'Párhuzamosok (a ∥ b)', categoryId: 'line' },
        { id: 'i1-9', figure: <PlanarShapeMiniFigure type="perpendicular_lines" />, text: 'Merőlegesek (a ⊥ b)', categoryId: 'line' },
        { id: 'i1-10', figure: <PlanarShapeMiniFigure type="intersecting_lines" />, text: 'Metsző egyenesek', categoryId: 'line' },
        { id: 'i1-11', figure: <PlanarShapeMiniFigure type="ray" />, text: '[PA) félegyenes', categoryId: 'ray' },
        { id: 'i1-12', figure: <PlanarShapeMiniFigure type="point" />, text: 'M metszéspont', categoryId: 'point-segment' }
      ]
    },

    // 2. SZINT: SZÖGÖK BESOROLÁSA FOKSZÁMUK SZERINT
    2: {
      level: 2,
      title: 'Szögtípusok besorolása',
      subtitle: 'Csoportosítsd a szögábrákat és értékeket a megfelelő szögtípus kategóriába!',
      categories: [
        {
          id: 'acute',
          title: 'Hegyesszög (0° < α < 90°)',
          description: 'Derékszögnél kisebb hegyes szögek',
          color: 'blue'
        },
        {
          id: 'special',
          title: 'Nevezetes szögek (90° vagy 180°)',
          description: 'Pontosan 90°-os derékszög vagy 180°-os egyenesszög',
          color: 'emerald'
        },
        {
          id: 'obtuse-reflex',
          title: 'Tompaszög & Homorúszög (> 90°)',
          description: '90° és 180° közötti tompaszögek, vagy 180°-nál nagyobb homorúszögek',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i2-1', figure: <PlanarShapeMiniFigure type="acute_angle" />, text: '45°-os szög', categoryId: 'acute' },
        { id: 'i2-2', figure: <PlanarShapeMiniFigure type="right_angle" />, text: '90°-os derékszög', categoryId: 'special' },
        { id: 'i2-3', figure: <PlanarShapeMiniFigure type="obtuse_angle" />, text: '120°-os szög', categoryId: 'obtuse-reflex' },
        { id: 'i2-4', figure: <PlanarShapeMiniFigure type="straight_angle" />, text: '180°-os egyenesszög', categoryId: 'special' },
        { id: 'i2-5', figure: <PlanarShapeMiniFigure type="reflex_angle" />, text: '240°-os homorúszög', categoryId: 'obtuse-reflex' },
        { id: 'i2-6', figure: <PlanarShapeMiniFigure type="acute_angle" />, text: '75°-os szög', categoryId: 'acute' },
        { id: 'i2-7', figure: <PlanarShapeMiniFigure type="obtuse_angle" />, text: '135°-os tompaszög', categoryId: 'obtuse-reflex' },
        { id: 'i2-8', figure: <PlanarShapeMiniFigure type="acute_angle" />, text: 'Szabályos △ szöge (60°)', categoryId: 'acute' },
        { id: 'i2-9', figure: <PlanarShapeMiniFigure type="reflex_angle" />, text: '300°-os homorúszög', categoryId: 'obtuse-reflex' },
        { id: 'i2-10', figure: <PlanarShapeMiniFigure type="acute_angle" />, text: '89°-os hegyesszög', categoryId: 'acute' },
        { id: 'i2-11', figure: <PlanarShapeMiniFigure type="right_angle" />, text: 'Merőleges szárak (90°)', categoryId: 'special' },
        { id: 'i2-12', figure: <PlanarShapeMiniFigure type="obtuse_angle" />, text: '179°-os tompaszög', categoryId: 'obtuse-reflex' }
      ]
    },

    // 3. SZINT: SOKSZÖGEK TULAJDONSÁGAI
    3: {
      level: 3,
      title: 'Sokszögek geometriai kategóriái',
      subtitle: 'Sorold be a sokszögek ábráit és típusait a megfelelő csoportba!',
      categories: [
        {
          id: 'convex',
          title: 'Konvex sokszögek',
          description: 'Minden belső szög < 180°, minden átló a sokszög belsejében fut',
          color: 'emerald'
        },
        {
          id: 'concave',
          title: 'Konkáv sokszögek',
          description: 'Van 180°-nál nagyobb belső szög, van külső átló',
          color: 'rose'
        },
        {
          id: 'regular',
          title: 'Szabályos sokszögek',
          description: 'Minden oldala és minden belső szöge pontosan egyenlő',
          color: 'indigo'
        }
      ],
      items: [
        { id: 'i3-1', figure: <PlanarShapeMiniFigure type="square" />, text: 'Négyzet', categoryId: 'regular' },
        { id: 'i3-2', figure: <PlanarShapeMiniFigure type="concave_polygon" />, text: 'Nyílhegy alakú négyszög', categoryId: 'concave' },
        { id: 'i3-3', figure: <PlanarShapeMiniFigure type="rectangle" />, text: 'Téglalap', categoryId: 'convex' },
        { id: 'i3-4', figure: <PlanarShapeMiniFigure type="regular_polygon" />, text: 'Szabályos ötszög (108°)', categoryId: 'regular' },
        { id: 'i3-5', figure: <PlanarShapeMiniFigure type="concave_polygon" />, text: 'Ötágú csillag sokszög', categoryId: 'concave' },
        { id: 'i3-6', figure: <PlanarShapeMiniFigure type="quadrilateral" />, text: 'Paralelogramma', categoryId: 'convex' },
        { id: 'i3-7', figure: <PlanarShapeMiniFigure type="hexagon" />, text: 'Szabályos hatszög (120°)', categoryId: 'regular' },
        { id: 'i3-8', figure: <PlanarShapeMiniFigure type="concave_polygon" />, text: 'Külső átlójú alakzat', categoryId: 'concave' },
        { id: 'i3-9', figure: <PlanarShapeMiniFigure type="convex_polygon" />, text: 'Konvex ötszög', categoryId: 'convex' },
        { id: 'i3-10', figure: <PlanarShapeMiniFigure type="triangle" />, text: 'Egyenlő oldalú △ (60°)', categoryId: 'regular' },
        { id: 'i3-11', figure: <PlanarShapeMiniFigure type="polygon_diagonals" />, text: 'Belső átlójú hatszög', categoryId: 'convex' },
        { id: 'i3-12', figure: <PlanarShapeMiniFigure type="concave_polygon" />, text: 'Beharapással bíró alakzat', categoryId: 'concave' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="Síkbeli alakzatok Csoportosító"
      subtitle="Kattints a kártyára, majd válaszd ki a megfelelő geometriai kategóriát!"
      badge="📐 6. Osztály • III. Geometria • 1. Fejezet"
      topicId="g6-planar-shapes-sorter"
      themeColor="cyan"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}
