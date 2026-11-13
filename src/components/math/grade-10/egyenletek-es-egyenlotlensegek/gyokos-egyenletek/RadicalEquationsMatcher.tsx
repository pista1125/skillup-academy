import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  RadicalStepFlowSvg,
  RadicalParabolaIntersectionSvg,
  RadicalDomainSvg,
  TwoRadicalsSvg,
  ExtraneousRootDetectorSvg
} from './RadicalEquationsFigures';

interface RadicalEquationsMatcherProps {
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
    title: 'Alapvető gyökös egyenletek és kikötések',
    subtitle: 'Párosítsd a négyzetgyökös egyenleteket és kikötéseket a helyes megoldásukkal!',
    pairs: [
      { id: 'rem1-1', prompt: '√(x) = 5', value: 'x = 25' },
      { id: 'rem1-2', prompt: '√(2x + 1) = 3', value: 'x = 4 (mivel 2x + 1 = 9)' },
      { id: 'rem1-3', prompt: '√(x - 7) = 0', value: 'x = 7' },
      { id: 'rem1-4', prompt: '√(x + 4) = -2', promptFigure: <ExtraneousRootDetectorSvg size={42} />, value: 'Nincs valós megoldás (M = ∅, mert √... ≥ 0)' },
      { id: 'rem1-5', prompt: '√(3x - 6) értelmezési tartománya', promptFigure: <RadicalDomainSvg size={42} />, value: 'x ≥ 2 (mert 3x - 6 ≥ 0)' },
      { id: 'rem1-6', prompt: '√(10 - 2x) kikötése', value: 'x ≤ 5 (mert 10 - 2x ≥ 0)' },
      { id: 'rem1-7', prompt: '√(x + 2) = 4', value: 'x = 14 (mivel x + 2 = 16)' },
      { id: 'rem1-8', prompt: 'A négyzetgyök definíciója', promptFigure: <RadicalStepFlowSvg size={42} />, value: 'Nemnegatív valós szám, amelynek négyzete az alap' }
    ]
  },
  2: {
    title: 'Másodfokúvá alakuló egyenletek és hamis gyökök',
    subtitle: 'Párosítsd az egyenleteket a valódi megoldáshalmazukkal, kizárva a hamis gyököket!',
    pairs: [
      { id: 'rem2-1', prompt: '√(x + 3) = x - 3', promptFigure: <RadicalParabolaIntersectionSvg size={42} />, value: 'M = {6} (az x = 1 hamis gyök)' },
      { id: 'rem2-2', prompt: '√(2x + 9) = x - 3', value: 'M = {8} (az x = 0 hamis gyök)' },
      { id: 'rem2-3', prompt: '√(6 - x) = x', value: 'M = {2} (az x = -3 hamis gyök, mert x ≥ 0 kell)' },
      { id: 'rem2-4', prompt: '√(x + 11) = x - 1', value: 'M = {5} (az x = -2 hamis gyök)' },
      { id: 'rem2-5', prompt: '√(2x + 5) = x - 5', value: 'M = {10} (az x = 2 hamis gyök)' },
      { id: 'rem2-6', prompt: '√(x² - 5) = 2', value: 'M = {-3; 3} (mindkettő valódi gyök, mert (±3)² = 9)' },
      { id: 'rem2-7', prompt: '√(4x + 5) = x', value: 'M = {5} (az x = -1 hamis gyök)' },
      { id: 'rem2-8', prompt: '√(x + 20) = x', value: 'M = {5} (az x = -4 hamis gyök)' }
    ]
  },
  3: {
    title: 'Két gyökös kifejezések és összetett egyenletek',
    subtitle: 'Párosítsd a többlépéses és trükkös gyökös egyenleteket a megoldásukkal!',
    pairs: [
      { id: 'rem3-1', prompt: '√(x + 5) - √x = 1', promptFigure: <TwoRadicalsSvg size={42} />, value: 'x = 4 (izolálás után x+5 = 1 + 2√x + x)' },
      { id: 'rem3-2', prompt: '√(x - 1) = √(2x - 5)', value: 'x = 4 (két gyök azonnali egyenlősége)' },
      { id: 'rem3-3', prompt: '√(x + 7) + √(x + 2) = 5', value: 'x = 2 (ellenőrizve: √9 + √4 = 3 + 2 = 5)' },
      { id: 'rem3-4', prompt: '√(x + 1) = 1 - √x', value: 'x = 0 (egyetlen megoldás)' },
      { id: 'rem3-5', prompt: '√(x - 4) + √(4 - x) = 0', value: 'x = 4 (a közös tartomány egyetlen pontja)' },
      { id: 'rem3-6', prompt: 'x² - 3x + √(x² - 3x + 5) = 7', value: 'x ∈ {-1; 4} (új ismeretlennel: u = √(x²-3x+5) = 2)' },
      { id: 'rem3-7', prompt: '√(x + 6) = -x', value: 'M = {-2} (az x = 3 hamis, -(-2) = 2 > 0)' },
      { id: 'rem3-8', prompt: '√(x) + √(x + 9) = 3', value: 'x = 0 (mivel √0 + √9 = 0 + 3 = 3)' }
    ]
  }
};

export const RadicalEquationsMatcher: React.FC<RadicalEquationsMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-gyokos-egyenletek-matcher',
  topicTitle = 'Gyökös egyenletek – Párkereső játék'
}) => {
  const activeLevel = level || currentLevel || 1;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

