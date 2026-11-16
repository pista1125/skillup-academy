import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Orientation4MatcherProps {
  level?: DifficultyLevel;
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
  [key: string]: any;
}

const ORIENTATION4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A sakktábla',
    description: 'Párosítsd a sakkbábut és a fogalmakat a nevükkel, jelentésükkel!',
    pairs: [
      { id: 'orm1', left: '♔', right: 'király' },
      { id: 'orm2', left: '♕', right: 'vezér' },
      { id: 'orm3', left: '♖', right: 'bástya' },
      { id: 'orm4', left: '♗', right: 'futó' },
      { id: 'orm5', left: '♘', right: 'huszár' },
      { id: 'orm6', left: '♙', right: 'gyalog' },
      { id: 'orm7', left: 'a, b, c, d, e, f, g, h', right: 'a sakktábla oszlopai' },
      { id: 'orm8', left: '1, 2, 3, 4, 5, 6, 7, 8', right: 'a sakktábla sorai' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A Kisváros térképe',
    description: 'Párosítsd a mezőkódot azzal, ami a Kisváros térképén ott található!',
    pairs: [
      { id: 'orm9', left: 'A1', right: 'kút' },
      { id: 'orm10', left: 'D1', right: 'templom' },
      { id: 'orm11', left: 'B2', right: 'iskola' },
      { id: 'orm12', left: 'F2', right: 'uszoda' },
      { id: 'orm13', left: 'C3', right: 'posta' },
      { id: 'orm14', left: 'E4', right: 'park' },
      { id: 'orm15', left: 'D5', right: 'focipálya' },
      { id: 'orm16', left: 'F5', right: 'könyvtár' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hová érsz?',
    description: 'Párosítsd a lépéseket az eredményükkel!',
    pairs: [
      { id: 'orm17', left: 'C3-ról 1 mezőt keletre (térkép)', right: 'D3' },
      { id: 'orm18', left: 'C3-ról 1 mezőt északra (térkép, 1. sor felül)', right: 'C2' },
      { id: 'orm19', left: 'e4-ről 1 mezőt felfelé (sakktábla)', right: 'e5' },
      { id: 'orm20', left: 'd4-ről 2-t jobbra, 3-at felfelé (sakktábla)', right: 'f7' },
      { id: 'orm21', left: '1É, 1K, 1D, 1NY', right: 'körbejár egy kis négyzetet' },
      { id: 'orm22', left: '1ÉK, majd 1DK', right: '2 lépéssel keletre kerül' },
      { id: 'orm23', left: '3K, 2É, 3NY', right: '2 lépéssel északra kerül' },
      { id: 'orm24', left: '1D, 2NY, 3É, 1NY', right: '3 nyugatra és 2 északra kerül' }
    ]
  }
];

const ORIENTATION4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ORIENTATION4_MATCHER_LEVELS_LIST[0],
  2: ORIENTATION4_MATCHER_LEVELS_LIST[1],
  3: ORIENTATION4_MATCHER_LEVELS_LIST[2]
};

export const Orientation4Matcher: React.FC<Orientation4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-tajekozodas-matcher',
  topicTitle = '8. Tájékozódás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="tajekozodas"
      title={topicTitle}
      subtitle="Gyakorold a sakkbábukat, a mezőkódokat és a lépéseket a rácson!"
      levels={ORIENTATION4_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default Orientation4Matcher;
