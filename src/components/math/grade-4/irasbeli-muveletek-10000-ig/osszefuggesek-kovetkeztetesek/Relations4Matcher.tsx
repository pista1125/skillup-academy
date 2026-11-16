import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Relations4MatcherProps {
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

const RELATIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Vonat és lufi',
    description: 'A vonat 1 óra alatt 600 km-t tesz meg, 1 lufi 60 Ft. Párosítsd a kérdést a válasszal!',
    pairs: [
      { id: 'rel4m1', left: 'Vonat: 2 óra alatt', right: '1200 km' },
      { id: 'rel4m2', left: 'Vonat: 4 óra alatt', right: '2400 km' },
      { id: 'rel4m3', left: 'Vonat: 6 óra alatt', right: '3600 km' },
      { id: 'rel4m4', left: 'Vonat: 6600 km', right: '11 óra alatt' },
      { id: 'rel4m5', left: 'Vonat: 5400 km', right: '9 óra alatt' },
      { id: 'rel4m6', left: '3 lufi ára', right: '180 Ft' },
      { id: 'rel4m7', left: '6 lufi ára', right: '360 Ft' },
      { id: 'rel4m8', left: '540 Ft-ért', right: '9 lufi' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Ugyanannyi marad',
    description: 'Keresd meg az egyenlő értékű párt!',
    pairs: [
      { id: 'rel4m9', left: '600 · 8', right: '1200 · 4' },
      { id: 'rel4m10', left: '300 · 9', right: '900 · 3' },
      { id: 'rel4m11', left: '3600 · 2', right: '1800 · 4' },
      { id: 'rel4m12', left: '330 · 6', right: '660 · 3' },
      { id: 'rel4m13', left: '12 : 4', right: '1200 : 400' },
      { id: 'rel4m14', left: '12 : 3', right: '240 : 60' },
      { id: 'rel4m15', left: '120 : 4', right: '1200 : 40' },
      { id: 'rel4m16', left: '456 : 2 : 3', right: '456 : 6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Fejenként mennyi?',
    description: '4080 Ft-os társasjáték, 240 palánta, 768 Ft-os kanalak. Párosítsd!',
    pairs: [
      { id: 'rel4m17', left: '4080 Ft, 10 barát', right: '408 Ft fejenként' },
      { id: 'rel4m18', left: '4080 Ft, 2 barát', right: '2040 Ft fejenként' },
      { id: 'rel4m19', left: '4080 Ft, 4 barát', right: '1020 Ft fejenként' },
      { id: 'rel4m20', left: '240 palánta, 3 kertész', right: '80 palánta fejenként' },
      { id: 'rel4m21', left: '240 palánta, 5 kertész', right: '48 palánta fejenként' },
      { id: 'rel4m22', left: '240 palánta, 10 kertész', right: '24 palánta fejenként' },
      { id: 'rel4m23', left: '12 kanál 768 Ft → 6 kanál', right: '384 Ft' },
      { id: 'rel4m24', left: '12 kanál 768 Ft → 3 kanál', right: '192 Ft' }
    ]
  }
];

const RELATIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: RELATIONS_MATCHER_LEVELS_LIST[0],
  2: RELATIONS_MATCHER_LEVELS_LIST[1],
  3: RELATIONS_MATCHER_LEVELS_LIST[2]
};

export const Relations4Matcher: React.FC<Relations4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-osszefuggesek-matcher',
  topicTitle = '5. Összefüggések, következtetések – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="osszefuggesek-kovetkeztetesek"
      title={topicTitle}
      subtitle="Következtess egyről többre, és keresd meg az egyenlő szorzatokat, hányadosokat!"
      levels={RELATIONS_MATCHER_LEVELS}
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

export default Relations4Matcher;
