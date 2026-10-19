import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PointPlottingMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PointPlottingMatcher: React.FC<PointPlottingMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: PONTOK FELVÉTELE ÉS ELMOZDULÁSOK AZ ORIGÓBÓL
    // ========================================================
    1: {
      title: '1. Szint: Pontok Felvétele és Elmozdulások',
      subtitle: 'Párosítsd a rendezett számpárokat az origóból induló lépésekkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'P(3; 4) pont',
          value: 'Origóból 3 egység jobbra, majd 4 egység felfelé'
        },
        {
          id: 'p1-2',
          prompt: 'Q(-2; 5) pont',
          value: 'Origóból 2 egység balra, majd 5 egység felfelé'
        },
        {
          id: 'p1-3',
          prompt: 'R(-4; -3) pont',
          value: 'Origóból 4 egység balra, majd 3 egység lefelé'
        },
        {
          id: 'p1-4',
          prompt: 'S(5; -1) pont',
          value: 'Origóból 5 egység jobbra, majd 1 egység lefelé'
        },
        {
          id: 'p1-5',
          prompt: 'A(0; 6) pont',
          value: 'Origóból helyben marad vízszintesen, 6 egység fel az y-tengelyen'
        },
        {
          id: 'p1-6',
          prompt: 'B(-5; 0) pont',
          value: 'Origóból 5 egység balra az x-tengelyen, semerre nem lép fel/le'
        },
        {
          id: 'p1-7',
          prompt: 'O(0; 0) origó',
          value: 'A koordináta-rendszer kezdőpontja, elmozdulás nélkül'
        },
        {
          id: 'p1-8',
          prompt: 'K(2; 2) pont',
          value: 'Origóból 2 egység jobbra, 2 fel az I. negyed szögfelezőjén'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TENGELYEKKEL PÁRHUZAMOS EGYENESEK ÉS SZAKASZOK
    // ========================================================
    2: {
      title: '2. Szint: Párhuzamos Egyenesek és Távolságok',
      subtitle: 'Párosítsd a pontcsoportokat és vonalakat a jellemzőikkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'y = 4 vízszintes egyenes pontjai',
          value: 'Minden pont második koordinátája 4, pl. (1; 4) és (-3; 4)'
        },
        {
          id: 'p2-2',
          prompt: 'x = -3 függőleges egyenes pontjai',
          value: 'Minden pont első koordinátája -3, pl. (-3; 2) és (-3; -1)'
        },
        {
          id: 'p2-3',
          prompt: 'A(-2; 3) és B(5; 3) vízszintes távolsága',
          value: '5 - (-2) = 7 egység hosszú szakasz'
        },
        {
          id: 'p2-4',
          prompt: 'C(2; -1) és D(2; 5) függőleges távolsága',
          value: '5 - (-1) = 6 egység hosszú szakasz'
        },
        {
          id: 'p2-5',
          prompt: 'y = x egyenes pontjai',
          value: 'Egyenlő koordináták, pl. (3; 3) és (-4; -4)'
        },
        {
          id: 'p2-6',
          prompt: 'y = -x egyenes pontjai',
          value: 'Egymás ellentettjei, pl. (5; -5) és (-2; 2)'
        },
        {
          id: 'p2-7',
          prompt: 'Minden x-tengelyen fekvő pont',
          value: 'Második koordinátája nulla: (x; 0)'
        },
        {
          id: 'p2-8',
          prompt: 'Minden y-tengelyen fekvő pont',
          value: 'Első koordinátája nulla: (0; y)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: SOKSZÖGEK CSÚCSAI ÉS GEOMETRIAI SZÁMÍTÁSOK
    // ========================================================
    3: {
      title: '3. Szint: Sokszögek és Alakzatok Koordinátái',
      subtitle: 'Párosítsd a geometriai alakzatok csúcsait a hiányzó adatokkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Téglalap: A(0;0), B(5;0), C(5;3) csúcsok',
          value: 'A negyedik csúcs D(0; 3) koordinátájú'
        },
        {
          id: 'p3-2',
          prompt: 'Négyzet: A(1;1), B(5;1), D(1;5) csúcsok',
          value: 'A negyedik csúcs C(5; 5) koordinátájú'
        },
        {
          id: 'p3-3',
          prompt: 'Szakasz felezőpontja: (2; 0) és (8; 0) közt',
          value: 'F(5; 0) – a két szám átlaga: (2+8)/2 = 5'
        },
        {
          id: 'p3-4',
          prompt: 'Szakasz felezőpontja: (0; 2) és (0; 6) közt',
          value: 'F(0; 4) – az y tengely menti felezőpont'
        },
        {
          id: 'p3-5',
          prompt: 'Téglalap oldalai: A(1;1), B(6;1), C(6;4), D(1;4)',
          value: 'Oldalhosszak: a = 5 egység, b = 3 egység'
        },
        {
          id: 'p3-6',
          prompt: 'Téglalap kerülete: a = 5, b = 3 egység',
          value: 'K = 2 · (5 + 3) = 16 egység'
        },
        {
          id: 'p3-7',
          prompt: 'Téglalap területe: a = 5, b = 3 egység',
          value: 'T = 5 · 3 = 15 területegység'
        },
        {
          id: 'p3-8',
          prompt: 'P(3; -2) pont tükörképe az origóra',
          value: 'P\'(-3; 2) mindkét előjel ellentettjére vált'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-points-quiz"
      title="Pontok ábrázolása párosító"
      subtitle="Párosítsd a koordinátákat, egyeneseket és síkidomok csúcsait!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-point-plotting-matcher"
      storageKey="g5-loc-points-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
