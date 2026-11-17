import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniJump, MiniBar1000, MiniTags } from './AddSub1000G3CardFigures';

interface AddSub1000G3MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Ugrások és kerek számok',
    description: 'Hová érkezel az ugrással? Mennyi az eredmény?',
    pairs: [
      { id: 'as1000m1_0', left: '', promptFigure: <MiniJump from={480} by={70} />, right: '550' },
      { id: 'as1000m1_1', left: '', promptFigure: <MiniJump from={630} by={-40} />, right: '590' },
      { id: 'as1000m1_2', left: '', promptFigure: <MiniJump from={950} by={50} />, right: '1000' },
      { id: 'as1000m1_3', left: '', promptFigure: <MiniJump from={310} by={-20} />, right: '290' },
      { id: 'as1000m1_4', left: '300 + 600', right: '900' },
      { id: 'as1000m1_5', left: '1000 − 400', right: '600' },
      { id: 'as1000m1_6', left: '520 + 160', right: '680' },
      { id: 'as1000m1_7', left: '900 − 250', right: '650' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Pótlás és hiányzó szám',
    description: 'Mennyi hiányzik az 1000-hez? Mi kerül a □ helyére?',
    pairs: [
      { id: 'as1000m2_0', left: '', promptFigure: <MiniBar1000 known={740} />, right: '260' },
      { id: 'as1000m2_1', left: '', promptFigure: <MiniBar1000 known={380} />, right: '620' },
      { id: 'as1000m2_2', left: '', promptFigure: <MiniBar1000 known={850} />, right: '150' },
      { id: 'as1000m2_3', left: '', promptFigure: <MiniBar1000 known={450} />, right: '550' },
      { id: 'as1000m2_4', left: '□ + 440 = 970', right: '530' },
      { id: 'as1000m2_5', left: '1000 − □ = 120', right: '880' },
      { id: 'as1000m2_6', left: '□ − 350 = 540', right: '890' },
      { id: 'as1000m2_7', left: '690 − □ = 460', right: '230' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vásárlás és két lépés',
    description: 'Két dolgot veszel 1000 Ft-ból. Mennyi marad?',
    pairs: [
      { id: 'as1000m3_0', left: 'Mennyi marad?', promptFigure: <MiniTags prices={[450, 230]} />, right: '320 Ft' },
      { id: 'as1000m3_1', left: 'Mennyi marad?', promptFigure: <MiniTags prices={[360, 150]} />, right: '490 Ft' },
      { id: 'as1000m3_2', left: 'Mennyi marad?', promptFigure: <MiniTags prices={[670, 230]} />, right: '100 Ft' },
      { id: 'as1000m3_3', left: 'Mennyi marad?', promptFigure: <MiniTags prices={[280, 280]} />, right: '440 Ft' },
      { id: 'as1000m3_4', left: '460 + 380', right: '840' },
      { id: 'as1000m3_5', left: '640 − 380', right: '260' },
      { id: 'as1000m3_6', left: '190 + 300 + 300', right: '790' },
      { id: 'as1000m3_7', left: '1000 − 350 − 280', right: '370' }
    ]
  }
];

export const ADD_SUB_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const AddSub1000G3Matcher: React.FC<AddSub1000G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c1000-osszeadas-matcher',
  topicTitle = '3. Összeadás és kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket, az ugrásokat és a csíkokat az eredménnyel!"
      levels={ADD_SUB_1000_G3_MATCHER_LEVELS}
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

export default AddSub1000G3Matcher;
