import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricProbabilityMatcherProps {
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

const GEOMETRIC_PROBABILITY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Képletek",
    description: "Párosítsd a helyzetet a képletével!",
    pairs: [
      { id: 'gpm1', left: "szakaszon választott pont", right: "kedvező hossz / teljes hossz" },
      { id: 'gpm2', left: "síkidomban választott pont", right: "kedvező terület / teljes terület" },
      { id: 'gpm3', left: "testben választott pont", right: "kedvező térfogat / teljes térfogat" },
      { id: 'gpm4', left: "szerencsekerék", right: "középponti szög / 360°" },
      { id: 'gpm5', left: "r sugarú belső kör az R sugarú táblán", right: "r² / R²" },
      { id: 'gpm6', left: "R₁ és R₂ sugarú körök közötti gyűrű", right: "(R₂² − R₁²) / R²" },
      { id: 'gpm7', left: "r sugarú belső gömb az R sugarú gömbben", right: "r³ / R³" },
      { id: 'gpm8', left: "a komplementer esemény", right: "1 − P(A)" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Szerencsekerék és méterrúd",
    description: "Párosítsd az eseményt a valószínűségével!",
    pairs: [
      { id: 'gpm9', left: "90°-os körcikk", right: "1/4" },
      { id: 'gpm10', left: "120°-os körcikk", right: "1/3" },
      { id: 'gpm11', left: "60°-os körcikk", right: "1/6" },
      { id: 'gpm12', left: "54°-os körcikk", right: "0,15" },
      { id: 'gpm13', left: "a rúd első 30 cm-e", right: "0,3" },
      { id: 'gpm14', left: "közelebb a 20 cm-es ponthoz, mint a 100 cm-es véghez", right: "0,6" },
      { id: 'gpm15', left: "közelebb a rúd középpontjához, mint valamelyik végéhez", right: "1/2" },
      { id: 'gpm16', left: "a rúd 25 és 35 cm közötti része", right: "0,1" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Tankönyvi feladatok",
    description: "Párosítsd a feladatot az eredménnyel!",
    pairs: [
      { id: 'gpm17', left: "céltábla: a belső kör (r = 5, R = 25)", right: "1/25" },
      { id: 'gpm18', left: "céltábla: a belső körgyűrű (5–15 cm)", right: "8/25" },
      { id: 'gpm19', left: "céltábla: a külső körgyűrű (15–25 cm)", right: "16/25" },
      { id: 'gpm20', left: "körlap: közelebb a középponthoz, mint a körvonalhoz", right: "1/4" },
      { id: 'gpm21', left: "gömb: közelebb a középponthoz, mint a felülethez", right: "1/8" },
      { id: 'gpm22', left: "50 forintos nem érint fugát", right: "≈ 0,704" },
      { id: 'gpm23', left: "papírlap: minden csúcstól 10 cm-nél távolabb", right: "≈ 0,476" },
      { id: 'gpm24', left: "bogár a cserépben a fedőlaptól legfeljebb 3 cm-re", right: "≈ 0,23" }
    ]
  }
};

export const GeometricProbabilityMatcher: React.FC<GeometricProbabilityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-geometriai-matcher',
  topicTitle = "8. Geometriai valószínűség – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="geometriai-valoszinuseg"
      title={topicTitle}
      subtitle="Gyakorold a geometriai valószínűség képleteit, a szerencsekerék és a méterrúd feladatait!"
      levels={GEOMETRIC_PROBABILITY_MATCHER_LEVELS}
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

export default GeometricProbabilityMatcher;
