import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordPracticeMatcherProps {
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

const COORD_PRACTICE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nevezetes vonalak és pontok',
    description: 'Párosítsd a fogalmat a meghatározásával!',
    pairs: [
      { id: 'cpm1', left: 'AB oldalegyenes', right: 'az A és a B csúcson átmenő egyenes' },
      { id: 'cpm2', left: 'mc magasságvonal', right: 'C-n átmenő, AB-re merőleges egyenes' },
      { id: 'cpm3', left: 'fAB oldalfelező merőleges', right: 'AB felezőpontján átmenő, AB-re merőleges egyenes' },
      { id: 'cpm4', left: 'sc súlyvonal', right: 'C-n és az AB felezőpontján átmenő egyenes' },
      { id: 'cpm5', left: 'Körülírt kör középpontja', right: 'két oldalfelező merőleges metszéspontja' },
      { id: 'cpm6', left: 'Magasságpont', right: 'két magasságvonal metszéspontja' },
      { id: 'cpm7', left: 'Súlypont', right: 'S = (A + B + C)/3' },
      { id: 'cpm8', left: 'Derékszögű háromszög körülírt körének középpontja', right: 'az átfogó felezőpontja' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenesek meredeksége',
    description: 'Párosítsd az egyenest a meredekségével (iránytangensével)!',
    pairs: [
      { id: 'cpm9', left: '5x − 12y + 43 = 0', right: 'm = 5/12' },
      { id: 'cpm10', left: '−9x + 15y = 10', right: 'm = 3/5' },
      { id: 'cpm11', left: '10x + 6y = −14', right: 'm = −5/3' },
      { id: 'cpm12', left: '3x + 4y = 14', right: 'm = −3/4' },
      { id: 'cpm13', left: 'x + 3y = −7', right: 'm = −1/3' },
      { id: 'cpm14', left: '3x − 2y = 2', right: 'm = 3/2' },
      { id: 'cpm15', left: '4x + 3y = −11', right: 'm = −4/3' },
      { id: 'cpm16', left: '13x − 6y = −11', right: 'm = 13/6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Körök egyenlete',
    description: 'Párosítsd a kör adatait a kör egyenletével!',
    pairs: [
      { id: 'cpm17', left: 'Középpont O, a P(−5; 12) pont a körön', right: 'x² + y² = 169' },
      { id: 'cpm18', left: 'Középpont C(−2; 7), érinti az x tengelyt', right: '(x + 2)² + (y − 7)² = 49' },
      { id: 'cpm19', left: 'Átmérő: A(7; −4), B(−3; −6)', right: '(x − 2)² + (y + 5)² = 26' },
      { id: 'cpm20', left: 'Középpont C(4; −5), a P(7; −9) pont a körön', right: '(x − 4)² + (y + 5)² = 25' },
      { id: 'cpm21', left: 'Középpont C(−5; −6), érinti az y tengelyt', right: '(x + 5)² + (y + 6)² = 25' },
      { id: 'cpm22', left: 'r = 4, érinti mindkét tengely negatív félegyenesét', right: '(x + 4)² + (y + 4)² = 16' },
      { id: 'cpm23', left: 'Átmérő: A(1; −8), B(−8; 32)', right: '(x + 3,5)² + (y − 12)² = 420,25' },
      { id: 'cpm24', left: 'Az A(−2; −2), B(7; 1), C(5; 5) háromszög körülírt köre', right: '(x − 2)² + (y − 1)² = 25' }
    ]
  }
];

const COORD_PRACTICE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COORD_PRACTICE_MATCHER_LEVELS_LIST[0],
  2: COORD_PRACTICE_MATCHER_LEVELS_LIST[1],
  3: COORD_PRACTICE_MATCHER_LEVELS_LIST[2]
};

export const CoordPracticeMatcher: React.FC<CoordPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-gyakorlas-matcher',
  topicTitle = '16. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="gyakorlas-koordinatageometria"
      title={topicTitle}
      subtitle="Gyakorold a háromszög nevezetes vonalait, az egyenesek meredekségét és a körök egyenletét!"
      levels={COORD_PRACTICE_MATCHER_LEVELS}
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

export default CoordPracticeMatcher;
