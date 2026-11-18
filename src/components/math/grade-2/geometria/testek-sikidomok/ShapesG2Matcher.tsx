import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SolidCard150, FlatCard150, BuildCard150 } from './ShapesG2CardFigures';

interface ShapesG2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mi a neve?',
    description: 'Párosítsd a testet vagy síkidomot a nevével!',
    pairs: [
      { id: 'shm1', left: '', right: 'kocka', promptFigure: <SolidCard150 kind="kocka" /> },
      { id: 'shm2', left: '', right: 'téglatest', promptFigure: <SolidCard150 kind="teglatest" /> },
      { id: 'shm3', left: '', right: 'gömb', promptFigure: <SolidCard150 kind="gomb" /> },
      { id: 'shm4', left: '', right: 'henger', promptFigure: <SolidCard150 kind="henger" /> },
      { id: 'shm5', left: '', right: 'kúp', promptFigure: <SolidCard150 kind="kup" /> },
      { id: 'shm6', left: '', right: 'gúla', promptFigure: <SolidCard150 kind="gula" /> },
      { id: 'shm7', left: '', right: 'kör', promptFigure: <FlatCard150 kind="kor" /> },
      { id: 'shm8', left: '', right: 'háromszög', promptFigure: <FlatCard150 kind="haromszog" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány oldala van?',
    description: 'Számold meg a síkidom oldalait!',
    pairs: [
      { id: 'shm9', left: '', right: '3 oldal', promptFigure: <FlatCard150 kind="haromszog" /> },
      { id: 'shm10', left: '', right: '4 egyforma oldal', promptFigure: <FlatCard150 kind="negyzet" /> },
      { id: 'shm11', left: '', right: '2 hosszú és 2 rövid oldal', promptFigure: <FlatCard150 kind="teglalap" /> },
      { id: 'shm12', left: '', right: '5 oldal', promptFigure: <FlatCard150 kind="otszog" /> },
      { id: 'shm13', left: '', right: '6 oldal', promptFigure: <FlatCard150 kind="hatszog" /> },
      { id: 'shm14', left: '', right: '8 oldal', promptFigure: <FlatCard150 kind="nyolcszog" /> },
      { id: 'shm15', left: '', right: 'nincs oldala', promptFigure: <FlatCard150 kind="kor" /> },
      { id: 'shm16', left: '', right: 'egyenes és görbe vonal határolja', promptFigure: <FlatCard150 kind="felkor" /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tárgyak és építmények',
    description: 'Melyik testhez hasonlít a tárgy? Hány kockából épült?',
    pairs: [
      { id: 'shm17', left: '', right: '3 kocka', promptFigure: <BuildCard150 heights={[2, 1]} /> },
      { id: 'shm18', left: '', right: '4 kocka', promptFigure: <BuildCard150 heights={[1, 2, 1]} /> },
      { id: 'shm19', left: '', right: '5 kocka', promptFigure: <BuildCard150 heights={[3, 2]} /> },
      { id: 'shm20', left: '', right: '7 kocka', promptFigure: <BuildCard150 heights={[1, 3, 2, 1]} /> },
      { id: 'shm21', left: 'konzervdoboz', right: 'henger' },
      { id: 'shm22', left: 'tölcsér', right: 'kúp' },
      { id: 'shm23', left: 'narancs', right: 'gömb' },
      { id: 'shm24', left: 'gyufásdoboz', right: 'téglatest' }
    ]
  }
];

export const SHAPES_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const ShapesG2Matcher: React.FC<ShapesG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-geo-testek-matcher',
  topicTitle = '2. Testek, síkidomok – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="geometria"
      topicId={topicId}
      subtopicId="testek-sikidomok"
      title={topicTitle}
      subtitle="Párosítsd a testeket, a síkidomokat és a kockaépítményeket!"
      levels={SHAPES_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default ShapesG2Matcher;
