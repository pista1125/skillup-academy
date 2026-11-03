import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  PlottingStepsSvg,
  DiscreteVsContinuousSvg,
  PointsOnGraphSvg
} from './PlottingFigures';

interface PlottingMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Grafikonkészítési Alapfogalmak',
    subtitle: 'Párosítsd a koordináta-rendszer elemeit és a lépéseket!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'Vízszintes tengely',
        value: 'x tengely (abszcissza)',
        figure: <PlottingStepsSvg size={70} />
      },
      {
        id: 'pm1-2',
        prompt: 'Függőleges tengely',
        value: 'y tengely (ordináta)'
      },
      {
        id: 'pm1-3',
        prompt: 'Tengelyek metszéspontja: (0; 0)',
        value: 'Origó'
      },
      {
        id: 'pm1-4',
        prompt: 'Értéktáblázat',
        value: 'Választott x-ek és kiszámított f(x)-ek'
      },
      {
        id: 'pm1-5',
        prompt: 'P(x; y) pont rajzolása',
        value: 'Először x-et vízszintesen, majd y-t függőlegesen lépjük'
      },
      {
        id: 'pm1-6',
        prompt: 'Egyenes egyértelmű meghatározása',
        value: 'Legalább 2 pont szükséges hozzá'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Hozzárendelt Pontok',
    subtitle: 'Melyik x-hez melyik függvényérték vagy pont tartozik?',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'f(x) = 2x - 3 esetén x = 4',
        value: 'f(4) = 5 ➔ P(4; 5)',
        figure: <PointsOnGraphSvg size={70} />
      },
      {
        id: 'pm2-2',
        prompt: 'f(x) = -x + 4 esetén x = 0',
        value: 'f(0) = 4 ➔ (0; 4) tengelymetszet'
      },
      {
        id: 'pm2-3',
        prompt: 'f(x) = x² esetén x = -3',
        value: 'f(-3) = 9 ➔ P(-3; 9)'
      },
      {
        id: 'pm2-4',
        prompt: 'f(x) = |x - 2| esetén x = 2',
        value: 'f(2) = 0 ➔ Tengelypont (zérushely)'
      },
      {
        id: 'pm2-5',
        prompt: 'f(x) = 3x esetén x = -2',
        value: 'f(-2) = -6 ➔ P(-2; -6)'
      },
      {
        id: 'pm2-6',
        prompt: 'f(x) = 5 (konstans)',
        value: 'Vízszintes egyenes y = 5 magasságban'
      }
    ]
  },
  3: {
    title: '3. Szint: Tartományok, Szimbólumok és Végpontok',
    subtitle: 'Párosítsd a tartományt a grafikon rajzolási módjával!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'D_f = ℤ (egész számok)',
        value: 'Izolált diszkrét pontok (tilos összekötni!)',
        figure: <DiscreteVsContinuousSvg size={70} />
      },
      {
        id: 'pm3-2',
        prompt: 'D_f = ℝ (valós számok)',
        value: 'Folytonos, szakadásmentes vonal/egyenes'
      },
      {
        id: 'pm3-3',
        prompt: 'Zárt végpont: x ∈ [a; b]',
        value: 'Teli karika (●) a szakasz végén'
      },
      {
        id: 'pm3-4',
        prompt: 'Nyílt végpont: x ∈ ]a; b[',
        value: 'Üres karika (○) a szakasz végén'
      },
      {
        id: 'pm3-5',
        prompt: 'f(x_0) = y_0 teljesül',
        value: 'A P(x_0; y_0) pont illeszkedik a grafikonra'
      },
      {
        id: 'pm3-6',
        prompt: 'D_f = [0; ∞[ (nemnegatív számok)',
        value: 'Félegyenes teli kezdőponttal'
      }
    ]
  }
};

export const PlottingMatcher: React.FC<PlottingMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'keszitsunk-grafikont',
  topicTitle = 'Készítsünk grafikont!'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-grafikon-matcher"
    />
  );
};

