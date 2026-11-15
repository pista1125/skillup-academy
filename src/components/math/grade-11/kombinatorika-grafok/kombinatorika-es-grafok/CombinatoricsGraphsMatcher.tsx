import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsGraphsMatcherProps {
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

const COMBINATORICS_GRAPHS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Teljes gráfok élszáma',
    description: 'Párosítsd a teljes gráf csúcsainak számát az élei számával!',
    pairs: [
      { id: 'cgm1', left: '3 pontú teljes gráf', right: '3 él' },
      { id: 'cgm2', left: '4 pontú teljes gráf', right: '6 él' },
      { id: 'cgm3', left: '5 pontú teljes gráf', right: '10 él' },
      { id: 'cgm4', left: '6 pontú teljes gráf', right: '15 él' },
      { id: 'cgm5', left: '7 pontú teljes gráf', right: '21 él' },
      { id: 'cgm6', left: '8 pontú teljes gráf', right: '28 él' },
      { id: 'cgm7', left: '9 pontú teljes gráf', right: '36 él' },
      { id: 'cgm8', left: '16 pontú teljes gráf', right: '120 él' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a végeredménnyel!',
    pairs: [
      { id: 'cgm9', left: 'Asztalitenisz: lejátszott mérkőzések (7, 7, 6, 6, 5, 5, 5, 5)', right: '23' },
      { id: 'cgm10', left: 'Asztalitenisz: hátralévő mérkőzések', right: '5' },
      { id: 'cgm11', left: 'Teljes gráf, fokszámösszeg 156: csúcsok száma', right: '13' },
      { id: 'cgm12', left: 'Koccintások a Tóth (5) és a Lengyel (8) család tagjai között', right: '40' },
      { id: 'cgm13', left: 'Összes koccintás 13 ember között', right: '78' },
      { id: 'cgm14', left: '6 felhasználó, 6 ismeretség: nem ismerős párok', right: '9' },
      { id: 'cgm15', left: '7 csapat, 9 lejátszott meccs: hátralévő', right: '12' },
      { id: 'cgm16', left: '3 meccs kiválasztása a 9 lejátszottból', right: '84' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Fogalmak és tételek',
    description: 'Párosítsd a fogalmat vagy helyzetet a hozzá tartozó állítással!',
    pairs: [
      { id: 'cgm17', left: 'Teljes gráf', right: 'Bármely két csúcs között pontosan egy él fut' },
      { id: 'cgm18', left: 'Fokszámtétel', right: 'Fokszámok összege = 2 · élek száma' },
      { id: 'cgm19', left: 'A fokszámtétel következménye', right: 'A fokszámösszeg mindig páros' },
      { id: 'cgm20', left: 'Hurokélt tartalmazó gráf', right: 'A fokszámtétel erre is teljesül' },
      { id: 'cgm21', left: 'Az n pontú teljes gráf egy csúcsának fokszáma', right: 'n − 1' },
      { id: 'cgm22', left: '2 település kiválasztása a térképen', right: 'A csúcsok közül választunk' },
      { id: 'cgm23', left: '2 út kiválasztása a térképen', right: 'Az élek közül választunk' },
      { id: 'cgm24', left: 'Egy lejátszott meccs a válaszok összegében', right: 'Kétszer számít' }
    ]
  }
];

const COMBINATORICS_GRAPHS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COMBINATORICS_GRAPHS_MATCHER_LEVELS_LIST[0],
  2: COMBINATORICS_GRAPHS_MATCHER_LEVELS_LIST[1],
  3: COMBINATORICS_GRAPHS_MATCHER_LEVELS_LIST[2]
};

export const CombinatoricsGraphsMatcher: React.FC<CombinatoricsGraphsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-kombinatorika-grafok-matcher',
  topicTitle = '9. Kombinatorika és gráfok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="kombinatorika-es-grafok"
      title={topicTitle}
      subtitle="Párosítsd a teljes gráfokat az élszámukkal, a feladatokat az eredményükkel és a fogalmakat a tételekkel!"
      levels={COMBINATORICS_GRAPHS_MATCHER_LEVELS}
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

export default CombinatoricsGraphsMatcher;
