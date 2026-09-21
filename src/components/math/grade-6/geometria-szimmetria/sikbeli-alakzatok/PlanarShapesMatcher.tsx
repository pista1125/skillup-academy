import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlanarShapeMiniFigure } from './GeometryDiagrams';

export interface PlanarShapesMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function PlanarShapesMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: PlanarShapesMatcherProps) {
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

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPFOGALMAK ÉS JELÖLÉSEK
    1: {
      level: 1,
      title: 'Alapfogalmak és jelölések párosítása',
      description: 'Találd meg az összetartozó geometriai ábrákat, jelöléseket és tulajdonságokat!',
      pairs: [
        { id: 'p1-1', promptFigure: <PlanarShapeMiniFigure type="point" />, prompt: 'Pont', value: 'A, B, P (nyomtatott nagybetűk, kiterjedés nélküli)' },
        { id: 'p1-2', promptFigure: <PlanarShapeMiniFigure type="line" />, prompt: 'Egyenes (e)', value: 'e, f, a (latin kisbetűk, mindkét irányban végtelen)' },
        { id: 'p1-3', promptFigure: <PlanarShapeMiniFigure type="segment" />, prompt: 'Szakasz (AB)', value: 'Két végpont határolja, mérhető hosszúságú' },
        { id: 'p1-4', promptFigure: <PlanarShapeMiniFigure type="ray" />, prompt: 'Félegyenes [AB)', value: 'A-ból indul, B felé a végtelenbe nyúlik' },
        { id: 'p1-5', promptFigure: <PlanarShapeMiniFigure type="intersecting_lines" />, prompt: 'Metsző egyenesek', value: 'Pontosan 1 közös pontjuk van (M metszéspont)' },
        { id: 'p1-6', promptFigure: <PlanarShapeMiniFigure type="perpendicular_lines" />, prompt: 'Merőleges egyenesek (a ⊥ b)', value: '90°-os derékszögben metszik egymást' },
        { id: 'p1-7', promptFigure: <PlanarShapeMiniFigure type="parallel_lines" />, prompt: 'Párhuzamos egyenesek (a ∥ b)', value: 'Nincs közös pontjuk, távolságuk állandó' },
        { id: 'p1-8', promptFigure: <PlanarShapeMiniFigure type="triangle" />, prompt: 'Háromszög átlói', value: '0 átlója van (nincs nem szomszédos csúcsa)' }
      ]
    },

    // 2. SZINT: SZÖGTÍPUSOK ÉS FOKTARTOMÁNYOK
    2: {
      level: 2,
      title: 'Szögtípusok és foktartományok',
      description: 'Párosítsd a szögábrákat a megfelelő fokértékekkel és kiegészítő szögekkel!',
      pairs: [
        { id: 'p2-1', promptFigure: <PlanarShapeMiniFigure type="acute_angle" />, prompt: 'Hegyesszög', value: '0° < α < 90°' },
        { id: 'p2-2', promptFigure: <PlanarShapeMiniFigure type="right_angle" />, prompt: 'Derékszög', value: 'α = 90° (szárai merőlegesek)' },
        { id: 'p2-3', promptFigure: <PlanarShapeMiniFigure type="obtuse_angle" />, prompt: 'Tompaszög', value: '90° < α < 180°' },
        { id: 'p2-4', promptFigure: <PlanarShapeMiniFigure type="straight_angle" />, prompt: 'Egyenesszög', value: 'α = 180° (szárai egy egyenest alkotnak)' },
        { id: 'p2-5', promptFigure: <PlanarShapeMiniFigure type="reflex_angle" />, prompt: 'Homorúszög', value: '180° < α < 360°' },
        { id: 'p2-6', promptFigure: <PlanarShapeMiniFigure type="full_angle" />, prompt: 'Teljesszög', value: 'α = 360° (teljes körbefordulás)' },
        { id: 'p2-7', promptFigure: <PlanarShapeMiniFigure type="acute_angle" />, prompt: '35° pótszöge (összeg 90°)', value: '55° (mivel 90° - 35° = 55°)' },
        { id: 'p2-8', promptFigure: <PlanarShapeMiniFigure type="obtuse_angle" />, prompt: '110° kiegészítő szöge (összeg 180°)', value: '70° (mivel 180° - 110° = 70°)' }
      ]
    },

    // 3. SZINT: SOKSZÖGEK ÁTLÓI ÉS SZÖGÖSSZEGEI
    3: {
      level: 3,
      title: 'Sokszögek átlói és belső szögösszegei',
      description: 'Párosítsd a sokszögek ábráit az átlóik számával vagy a belső szögeik összegével!',
      pairs: [
        { id: 'p3-1', promptFigure: <PlanarShapeMiniFigure type="rectangle" />, prompt: 'Négyszög összes átlója', value: '2 átló (d = 4 · 1 / 2 = 2)' },
        { id: 'p3-2', promptFigure: <PlanarShapeMiniFigure type="regular_polygon" />, prompt: 'Ötszög összes átlója', value: '5 átló (d = 5 · 2 / 2 = 5)' },
        { id: 'p3-3', promptFigure: <PlanarShapeMiniFigure type="hexagon" />, prompt: 'Hatszög összes átlója', value: '9 átló (d = 6 · 3 / 2 = 9)' },
        { id: 'p3-4', promptFigure: <PlanarShapeMiniFigure type="polygon_diagonals" />, prompt: 'Nyolcszög összes átlója', value: '20 átló (d = 8 · 5 / 2 = 20)' },
        { id: 'p3-5', promptFigure: <PlanarShapeMiniFigure type="triangle" />, prompt: 'Háromszög belső szögösszege', value: '180° (α + β + γ = 180°)' },
        { id: 'p3-6', promptFigure: <PlanarShapeMiniFigure type="square" />, prompt: 'Négyszög belső szögösszege', value: '360° ((4 - 2) · 180° = 360°)' },
        { id: 'p3-7', promptFigure: <PlanarShapeMiniFigure type="regular_polygon" />, prompt: 'Ötszög belső szögösszege', value: '540° ((5 - 2) · 180° = 540°)' },
        { id: 'p3-8', promptFigure: <PlanarShapeMiniFigure type="hexagon" />, prompt: 'Szabályos hatszög 1 belső szöge', value: '120° (720° / 6 = 120°)' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="Síkbeli alakzatok Kártyás Párosító"
      subtitle="Keresd meg az összetartozó geometriai ábrákat, szögtípusokat és képleteket!"
      badge="📐 6. Osztály • III. Geometria • 1. Fejezet"
      topicId="g6-planar-shapes-matcher"
      themeColor="cyan"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}
