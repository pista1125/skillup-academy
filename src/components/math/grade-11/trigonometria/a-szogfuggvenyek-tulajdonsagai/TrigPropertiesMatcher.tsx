import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigPropertiesMatcherProps {
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

const TRIG_PROPERTIES_MATCHER_LEVELS: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nevezetes szögek pontos értékei',
    description: 'Párosítsd a nevezetes szögek szögfüggvényeit a pontos értékükkel!',
    pairs: [
      { id: 'tp1', left: 'sin 30°', right: '1/2' },
      { id: 'tp2', left: 'cos 30°', right: '√3/2' },
      { id: 'tp3', left: 'tg 30°', right: '√3/3' },
      { id: 'tp4', left: 'sin 45°', right: '√2/2' },
      { id: 'tp5', left: 'tg 45°', right: '1' },
      { id: 'tp6', left: 'tg 60°', right: '√3' },
      { id: 'tp7', left: 'Szabályos háromszög magassága (oldal a)', right: '(√3/2) · a' },
      { id: 'tp8', left: 'Egyenlő szárú derékszögű háromszög átfogója (befogó b)', right: 'b · √2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Azonosságok és pótszögek',
    description: 'Párosítsd a kifejezéseket a velük egyenlő értékkel!',
    pairs: [
      { id: 'tp9', left: 'sin²α + cos²α', right: '1' },
      { id: 'tp10', left: 'sin α / cos α', right: 'tg α' },
      { id: 'tp11', left: 'sin(90° − α)', right: 'cos α' },
      { id: 'tp12', left: 'cos(90° − α)', right: 'sin α' },
      { id: 'tp13', left: 'sin 25°', right: 'cos 65°' },
      { id: 'tp14', left: 'cos α (ha sin α ismert)', right: '√(1 − sin²α)' },
      { id: 'tp15', left: 'tg 30° · tg 60°', right: '1 (pótszögek tangenseinek szorzata)' },
      { id: 'tp16', left: 'sin²20° + sin²70°', right: '1 (mert sin 70° = cos 20°)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Feladatok eredményei',
    description: 'Párosítsd a tankönyvi feladatokat a helyes eredménnyel!',
    pairs: [
      { id: 'tp17', left: 'sin α = 0,8 ⇒ cos α', right: '0,6' },
      { id: 'tp18', left: 'sin α = 0,8 ⇒ tg α', right: '4/3' },
      { id: 'tp19', left: 'sin²37° + sin 37° − cos 53° + sin²53°', right: '1' },
      { id: 'tp20', left: '680 m-es pálya 82°-ban ⇒ szintkülönbség', right: '≈ 673 m (nem 535 m!)' },
      { id: 'tp21', left: '535 m emelkedés 680 m-es úton ⇒ szög', right: '≈ 51,9°' },
      { id: 'tp22', left: '80 m-es kötél, 35° ⇒ magasság', right: '≈ 45,9 m' },
      { id: 'tp23', left: 'Budavári Sikló: 50 m szintkülönbség, 95 m pálya', right: '≈ 31,8°' },
      { id: 'tp24', left: '8 m távolság, 70°, 1,6 m szemmagasság ⇒ épület', right: '≈ 23,6 m' }
    ]
  }
];

export const TrigPropertiesMatcher: React.FC<TrigPropertiesMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-tulajdonsagok-matcher',
  topicTitle = '4. A szögfüggvények tulajdonságai – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="a-szogfuggvenyek-tulajdonsagai"
      title={topicTitle}
      subtitle="Gyakorold a nevezetes szögek értékeit, a pótszögek összefüggését és a sin²α + cos²α = 1 azonosságot!"
      levels={{ 1: TRIG_PROPERTIES_MATCHER_LEVELS[0], 2: TRIG_PROPERTIES_MATCHER_LEVELS[1], 3: TRIG_PROPERTIES_MATCHER_LEVELS[2] }}
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

export default TrigPropertiesMatcher;
