import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard150, LabelCard150 } from './RomanIntroG2CardFigures';

interface RomanIntroG2MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Jel és érték',
    description: 'Mennyit ér a római szám? Párosítsd a pálcikákat és a jeleket a számokkal!',
    pairs: [
      { id: 'rim1', left: '', right: '1', promptFigure: <StickCard150 value="I" /> },
      { id: 'rim2', left: '', right: '5', promptFigure: <StickCard150 value="V" /> },
      { id: 'rim3', left: '', right: '10', promptFigure: <StickCard150 value="X" /> },
      { id: 'rim4', left: 'II', right: '2' },
      { id: 'rim5', left: '', right: '3', promptFigure: <StickCard150 value="III" /> },
      { id: 'rim6', left: 'XX', right: '20' },
      { id: 'rim7', left: 'XII', right: '12' },
      { id: 'rim8', left: 'XV', right: '15' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Jobbra hozzáad, balra elvesz',
    description: 'Figyeld, hol áll az I! Párosítsd a római számot az értékével!',
    pairs: [
      { id: 'rim9', left: '', right: '4', promptFigure: <StickCard150 value="IV" /> },
      { id: 'rim10', left: '', right: '6', promptFigure: <StickCard150 value="VI" /> },
      { id: 'rim11', left: '', right: '9', promptFigure: <StickCard150 value="IX" /> },
      { id: 'rim12', left: '', right: '11', promptFigure: <StickCard150 value="XI" /> },
      { id: 'rim13', left: 'VII', right: '7' },
      { id: 'rim14', left: 'VIII', right: '8' },
      { id: 'rim15', left: 'XIV', right: '14' },
      { id: 'rim16', left: 'XVI', right: '16' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hányadik?',
    description: 'Olvasd ki a táblát! Párosítsd azzal, hogy hányadik!',
    pairs: [
      { id: 'rim17', left: '', right: 'negyedik', promptFigure: <LabelCard150 roman="IV" word="Béla" /> },
      { id: 'rim18', left: '', right: 'második', promptFigure: <LabelCard150 roman="II" word="emelet" /> },
      { id: 'rim19', left: '', right: 'kilencedik', promptFigure: <LabelCard150 roman="IX" word="fejezet" /> },
      { id: 'rim20', left: '', right: 'tizenkettedik', promptFigure: <LabelCard150 roman="XII" word="hónap" /> },
      { id: 'rim21', left: 'VI. hónap', right: 'hatodik' },
      { id: 'rim22', left: 'XX. század', right: 'huszadik' },
      { id: 'rim23', left: 'XIX. kerület', right: 'tizenkilencedik' },
      { id: 'rim24', left: 'I. helyezett', right: 'első' }
    ]
  }
];

export const ROMAN_INTRO_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const RomanIntroG2Matcher: React.FC<RomanIntroG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-romai-ertelmezes-matcher',
  topicTitle = '1. Római számok értelmezése – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-ertelmezese"
      title={topicTitle}
      subtitle="Párosítsd a római számokat az értékükkel!"
      levels={ROMAN_INTRO_G2_MATCHER_LEVELS}
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

export default RomanIntroG2Matcher;
