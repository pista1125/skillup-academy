import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  PythagorasTheoremSvg,
  PythagoreanTriplesSvg,
  ConversePythagorasSvg,
  GeometricApplicationSvg
} from './PythagorasFigures';

interface PythagorasMatcherProps {
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
    title: '1. Szint: Pitagoraszi Számhármasok és Alapképletek',
    subtitle: 'Párosítsd a derékszögű háromszög oldalait és alapvető összefüggéseit!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'a = 3 cm, b = 4 cm',
        value: 'c = 5 cm (alap számhármas)',
        figure: <PythagoreanTriplesSvg size={65} />
      },
      {
        id: 'pm1-2',
        prompt: 'a = 5 cm, b = 12 cm',
        value: 'c = 13 cm'
      },
      {
        id: 'pm1-3',
        prompt: 'a = 6 cm, b = 8 cm',
        value: 'c = 10 cm (a 3-4-5 kétszerese)'
      },
      {
        id: 'pm1-4',
        prompt: 'Átfogó kiszámítása',
        value: 'c = √(a² + b²)'
      },
      {
        id: 'pm1-5',
        prompt: 'Befogó kiszámítása',
        value: 'a = √(c² - b²)'
      },
      {
        id: 'pm1-6',
        prompt: 'a = 8 cm, b = 15 cm',
        value: 'c = 17 cm'
      }
    ]
  },
  2: {
    title: '2. Szint: Hiányzó Oldalak Kiszámítása',
    subtitle: 'Keresd meg az adott derékszögű háromszögek ismeretlen oldalát!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'c = 25 cm, a = 7 cm',
        value: 'b = 24 cm (b = √(625 - 49))'
      },
      {
        id: 'pm2-2',
        prompt: 'c = 20 cm, a = 12 cm',
        value: 'b = 16 cm (a 3-4-5 négyszerese)'
      },
      {
        id: 'pm2-3',
        prompt: 'a = 9 cm, b = 12 cm',
        value: 'c = 15 cm (a 3-4-5 háromszorosa)'
      },
      {
        id: 'pm2-4',
        prompt: 'a = 1 cm, b = 1 cm',
        value: 'c = √2 cm (egyenlő szárú derékszögű)'
      },
      {
        id: 'pm2-5',
        prompt: 'c = 10 cm, a = 5 cm',
        value: 'b = 5√3 cm (30°-60°-90°-os háromszög)'
      },
      {
        id: 'pm2-6',
        prompt: 'c = 26 cm, b = 10 cm',
        value: 'a = 24 cm (az 5-12-13 kétszerese)'
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Alkalmazások és Megfordítás',
    subtitle: 'Párosítsd a síkidomokhoz és a tétel megfordításához tartozó összefüggéseket!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'a oldalú négyzet átlója',
        value: 'd = a · √2',
        figure: <GeometricApplicationSvg size={65} />
      },
      {
        id: 'pm3-2',
        prompt: 'a oldalú szabályos háromszög magassága',
        value: 'm = (a · √3) / 2'
      },
      {
        id: 'pm3-3',
        prompt: 'a = 6 cm, b = 8 cm méretű téglalap átlója',
        value: 'd = 10 cm'
      },
      {
        id: 'pm3-4',
        prompt: 'Oldalak: 4 cm, 5 cm, 6 cm (16 + 25 = 41 > 36)',
        value: 'Hegyesszögű háromszög (a² + b² > c²)'
      },
      {
        id: 'pm3-5',
        prompt: 'Oldalak: 3 cm, 5 cm, 7 cm (9 + 25 = 34 < 49)',
        value: 'Tompaszögű háromszög (a² + b² < c²)'
      },
      {
        id: 'pm3-6',
        prompt: 'Oldalak: 9 cm, 12 cm, 15 cm (81 + 144 = 225)',
        value: 'Derékszögű háromszög (a² + b² = c²)'
      }
    ]
  }
};

export const PythagorasMatcher: React.FC<PythagorasMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Pitagorasz tétele'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-pythagoras-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};
