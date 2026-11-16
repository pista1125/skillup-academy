import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrustumMatcherProps {
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

const MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'frum1', left: 'csonkagúla', right: 'gúla alaplappal párhuzamos síkkal levágott, csúcsot nem tartalmazó része' },
      { id: 'frum2', left: 'kiegészítő gúla', right: 'a levágott, az eredetihez hasonló gúla' },
      { id: 'frum3', left: 'fedőlap', right: 'az alaplappal párhuzamos, hozzá hasonló határoló lap' },
      { id: 'frum4', left: 'a csonkagúla oldallapja', right: 'trapéz' },
      { id: 'frum5', left: 'a csonkakúp tengelymetszete', right: 'szimmetrikus trapéz' },
      { id: 'frum6', left: 'a csonka test magassága', right: 'az alap- és a fedőlap síkjának távolsága' },
      { id: 'frum7', left: 'a csonkakúp alkotója', right: 'a teljes kúp alkotójának palástra eső szakasza' },
      { id: 'frum8', left: 'szabályos n oldalú csonkagúla', right: 'szabályos n oldalú gúlából keletkezik' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számok és képletek',
    description: 'Párosítsd a kérdést a válasszal!',
    pairs: [
      { id: 'frum9', left: 'hatoldalú csonkagúla lapjai', right: '8' },
      { id: 'frum10', left: 'ötoldalú csonkagúla élei', right: '15' },
      { id: 'frum11', left: 'négyoldalú csonkagúla csúcsai', right: '8' },
      { id: 'frum12', left: 'a csonkakúp alkotója', right: '√(m² + (R − r)²)' },
      { id: 'frum13', left: 'a hasonlóság aránya', right: 'r / R' },
      { id: 'frum14', left: 'kiegészítő kúp magassága', right: 'r · m / (R − r)' },
      { id: 'frum15', left: 'fedőlap területe : alaplap területe', right: 'λ²' },
      { id: 'frum16', left: 'R = 6, r = 3, m = 4 ⇒ alkotó', right: '5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'frum17', left: 'M = 8 dm, a = 5 cm, vágás a csúcstól 2 dm-re ⇒ fedőél', right: '1,25 cm' },
      { id: 'frum18', left: 'M = 20, a = 6, vágás az alaptól 2 cm-re ⇒ fedőél', right: '5,4 cm' },
      { id: 'frum19', left: 'trapéz 16 és 10 cm, 30° ⇒ magasság', right: '√3 ≈ 1,73 cm' },
      { id: 'frum20', left: 'trapéz 16 és 10 cm, 30° ⇒ alkotó', right: '2√3 ≈ 3,46 cm' },
      { id: 'frum21', left: 'bonbon (3,3; 1,5; 1,5 cm) ⇒ magasság', right: '1,2 cm' },
      { id: 'frum22', left: 'derékszögű trapéz (16, 11, 12) ⇒ magasság', right: '√119 ≈ 10,91 cm' },
      { id: 'frum23', left: 'szoknya derékbősége (d = 23 cm)', right: '≈ 72,3 cm' },
      { id: 'frum24', left: 'szoknya aljának hossza', right: '≈ 147,2 cm' }
    ]
  }
];

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MATCHER_LEVELS_LIST[0],
  2: MATCHER_LEVELS_LIST[1],
  3: MATCHER_LEVELS_LIST[2]
};

export const FrustumMatcher: React.FC<FrustumMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-csonka-testek-matcher',
  topicTitle = '14. A csonkagúla és a csonkakúp – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-csonkagula-es-a-csonkakup"
      title={topicTitle}
      subtitle="Gyakorold a csonka testek részeit, a hasonlóságot és a tengelymetszet összefüggéseit!"
      levels={MATCHER_LEVELS}
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

export default FrustumMatcher;
