import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SymmetricShapesMiniFigure } from './SymmetricShapesDiagrams';

export interface SymmetricShapesSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function SymmetricShapesSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: SymmetricShapesSorterProps) {
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
    // 1. SZINT: TENGELYEK SZÁMA SZERINTI CSOPORTOSÍTÁS (10 ELEM)
    1: {
      level: 1,
      title: '1. Szint: Szimmetriatengelyek száma alakzatoknál',
      description: 'Csoportosítsd a síkidomokat a szimmetriatengelyeik száma szerint!',
      categories: [
        {
          id: 'cat-0',
          title: '0 szimmetriatengely',
          description: 'Aszimmetrikus alakzatok (nincs tengely)'
        },
        {
          id: 'cat-1',
          title: 'Pontosan 1 tengely',
          description: 'Egyetlen szimmetriatengellyel rendelkező formák'
        },
        {
          id: 'cat-2',
          title: 'Pontosan 2 tengely',
          description: 'Két egymásra merőleges szimmetriatengely'
        },
        {
          id: 'cat-3-plus',
          title: '3 vagy több szimmetriatengely',
          description: 'Szabályos sokszögek és a kör'
        }
      ],
      items: [
        { id: 'it1-1', label: 'Általános háromszög', figure: <SymmetricShapesMiniFigure type="general_triangle" />, categoryId: 'cat-0' },
        { id: 'it1-2', label: 'Általános trapéz', figure: <SymmetricShapesMiniFigure type="general_trapezoid" />, categoryId: 'cat-0' },
        { id: 'it1-3', label: 'Egyenlő szárú háromszög', figure: <SymmetricShapesMiniFigure type="isosceles_triangle" />, categoryId: 'cat-1' },
        { id: 'it1-4', label: 'Deltoid', figure: <SymmetricShapesMiniFigure type="deltoid" />, categoryId: 'cat-1' },
        { id: 'it1-5', label: 'Szimmetrikus húrtrapéz', figure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />, categoryId: 'cat-1' },
        { id: 'it1-6', label: 'Téglalap', figure: <SymmetricShapesMiniFigure type="rectangle" />, categoryId: 'cat-2' },
        { id: 'it1-7', label: 'Rombusz', figure: <SymmetricShapesMiniFigure type="rhombus" />, categoryId: 'cat-2' },
        { id: 'it1-8', label: 'Szabályos háromszög', figure: <SymmetricShapesMiniFigure type="equilateral_triangle" />, categoryId: 'cat-3-plus' },
        { id: 'it1-9', label: 'Négyzet (4 tengely)', figure: <SymmetricShapesMiniFigure type="square" />, categoryId: 'cat-3-plus' },
        { id: 'it1-10', label: 'Szabályos hatszög (6 tengely)', figure: <SymmetricShapesMiniFigure type="regular_hexagon" />, categoryId: 'cat-3-plus' }
      ]
    },

    // 2. SZINT: NÉGYSZÖGEK TENGELYTÍPUSAI (10 ELEM)
    2: {
      level: 2,
      title: '2. Szint: Négyszögek szimmetriatengelyeinek fajtái',
      description: 'Válogasd szét a négyszögeket aszerint, hogy milyen típusú szimmetriatengellyel rendelkeznek!',
      categories: [
        {
          id: 'cat-diag',
          title: 'Csak átlós tengely(ek)',
          description: 'A szimmetriatengely(ek) csúcsokat összekötő átló(k)'
        },
        {
          id: 'cat-mid',
          title: 'Csak oldalfelező tengely(ek)',
          description: 'A szimmetriatengely(ek) szemközti oldalak felezőmerőlegese(i)'
        },
        {
          id: 'cat-both',
          title: 'Mindkettő (Átló és Oldalfelező)',
          description: 'Átlók és oldalfelezők is szimmetriatengelyek'
        },
        {
          id: 'cat-none',
          title: 'Egyik sem (Nincs szimmetriatengely)',
          description: 'Nem tengelyesen szimmetrikus négyszögek'
        }
      ],
      items: [
        { id: 'it2-1', label: 'Deltoid (1 szimmetriaátló)', figure: <SymmetricShapesMiniFigure type="deltoid" />, categoryId: 'cat-diag' },
        { id: 'it2-2', label: 'Rombusz (2 átló)', figure: <SymmetricShapesMiniFigure type="rhombus" />, categoryId: 'cat-diag' },
        { id: 'it2-3', label: 'Szimmetrikus trapéz (1 alapfelező)', figure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />, categoryId: 'cat-mid' },
        { id: 'it2-4', label: 'Téglalap (2 oldalfelező)', figure: <SymmetricShapesMiniFigure type="rectangle" />, categoryId: 'cat-mid' },
        { id: 'it2-5', label: 'Négyzet (2 oldalfelező + 2 átló)', figure: <SymmetricShapesMiniFigure type="square" />, categoryId: 'cat-both' },
        { id: 'it2-6', label: 'Általános paralelogramma', figure: <SymmetricShapesMiniFigure type="parallelogram" />, categoryId: 'cat-none' },
        { id: 'it2-7', label: 'Derékszögű trapéz', figure: <SymmetricShapesMiniFigure type="general_trapezoid" />, categoryId: 'cat-none' },
        { id: 'it2-8', label: 'Általános négyszög', figure: <SymmetricShapesMiniFigure type="general_trapezoid" />, categoryId: 'cat-none' },
        { id: 'it2-9', label: 'Általános trapéz', figure: <SymmetricShapesMiniFigure type="general_trapezoid" />, categoryId: 'cat-none' },
        { id: 'it2-10', label: 'Szabályos 4-szög (Négyzet)', figure: <SymmetricShapesMiniFigure type="square" />, categoryId: 'cat-both' }
      ]
    },

    // 3. SZINT: SZABÁLYOS SOKSZÖGEK ÉS SPECIÁLIS ALAKZATOK (10 ELEM)
    3: {
      level: 3,
      title: '3. Szint: Páros vs. Páratlan csúcsszámú sokszögek',
      description: 'Válogasd szét a szabályos sokszögeket a szimmetriatengelyeik elhelyezkedése szerint!',
      categories: [
        {
          id: 'cat-odd',
          title: 'Páratlan szabályos n-szög',
          description: 'Minden tengely csúcsból szemközti oldalfelezőbe halad'
        },
        {
          id: 'cat-even',
          title: 'Páros szabályos n-szög',
          description: 'Fele-fele arányban csúcsátlók és oldalfelezők alkotják a tengelyeket'
        },
        {
          id: 'cat-infinite',
          title: 'Végtelen sok tengelyű / Félkör',
          description: 'Körvonal, körlap, körgyűrű vagy félkör'
        }
      ],
      items: [
        { id: 'it3-1', label: 'Szabályos háromszög (3-szög)', figure: <SymmetricShapesMiniFigure type="equilateral_triangle" />, categoryId: 'cat-odd' },
        { id: 'it3-2', label: 'Szabályos ötszög (5-szög)', figure: <SymmetricShapesMiniFigure type="regular_pentagon" />, categoryId: 'cat-odd' },
        { id: 'it3-3', label: 'Szabályos hétszög (7-szög)', figure: <SymmetricShapesMiniFigure type="regular_pentagon" />, categoryId: 'cat-odd' },
        { id: 'it3-4', label: 'Szabályos kilencszög (9-szög)', figure: <SymmetricShapesMiniFigure type="regular_pentagon" />, categoryId: 'cat-odd' },
        { id: 'it3-5', label: 'Négyzet (szabályos 4-szög)', figure: <SymmetricShapesMiniFigure type="square" />, categoryId: 'cat-even' },
        { id: 'it3-6', label: 'Szabályos hatszög (6-szög)', figure: <SymmetricShapesMiniFigure type="regular_hexagon" />, categoryId: 'cat-even' },
        { id: 'it3-7', label: 'Szabályos nyolcszög (8-szög)', figure: <SymmetricShapesMiniFigure type="regular_octagon" />, categoryId: 'cat-even' },
        { id: 'it3-8', label: 'Szabályos tízszög (10-szög)', figure: <SymmetricShapesMiniFigure type="regular_octagon" />, categoryId: 'cat-even' },
        { id: 'it3-9', label: 'Körlap (végtelen sok tengely)', figure: <SymmetricShapesMiniFigure type="infinite_axes" />, categoryId: 'cat-infinite' },
        { id: 'it3-10', label: 'Félkör alakzat (1 tengely)', figure: <SymmetricShapesMiniFigure type="semicircle" />, categoryId: 'cat-infinite' }
      ]
    }
  };

  const currentConfig = levelsConfig[level];

  return (
    <SorterTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Szimmetrikus alakzatok csoportosító"
      badge="📐 6. Osztály • III. Geometria • 9. Fejezet"
      topicId="g6-symmetric-shapes-sorter"
      themeColor="rose"
      currentLevel={level}
      config={currentConfig}
      onLevelChange={(lvl) => setLevel(lvl)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
