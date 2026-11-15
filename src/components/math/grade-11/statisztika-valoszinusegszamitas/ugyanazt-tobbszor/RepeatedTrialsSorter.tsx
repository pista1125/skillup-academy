import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RepeatedTrialsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const REPEATED_TRIALS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mindegyik, egyik sem vagy pontosan egy?',
    description: 'Melyik képlettel számolnál? Sorold be a helyzetet!',
    categories: [
      { id: 'all', name: 'mindegyik: pⁿ', color: 'emerald' },
      { id: 'none', name: 'egyik sem: (1 − p)ⁿ', color: 'rose' },
      { id: 'one', name: 'pontosan egy: n · p · (1 − p)^{n−1}', color: 'blue' }
    ],
    items: [
      { id: 'rts1', text: 'Kató mind az 5 dobása talál', categoryId: 'all' },
      { id: 'rts2', text: 'mindhárom kockadobás hatos', categoryId: 'all' },
      { id: 'rts3', text: 'a 8 érmedobás mindegyike fej', categoryId: 'all' },
      { id: 'rts4', text: '20 termékből egy sem selejtes', categoryId: 'none' },
      { id: 'rts5', text: 'a kígyó a 3 alkalomból egyszer sem mar', categoryId: 'none' },
      { id: 'rts6', text: '4 kockadobásból egyik sem hatos', categoryId: 'none' },
      { id: 'rts7', text: '8 érmedobásból pontosan 1 fej', categoryId: 'one' },
      { id: 'rts8', text: '3 kockadobásból pontosan egy hatos', categoryId: 'one' },
      { id: 'rts9', text: '20 termékből pontosan egy selejtes', categoryId: 'one' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a valószínűség?',
    description: 'Számold ki (vagy becsüld meg) a valószínűséget, és sorold be!',
    categories: [
      { id: 'small', name: 'kisebb, mint 0,1', color: 'violet' },
      { id: 'mid', name: '0,1 és 0,5 között', color: 'teal' },
      { id: 'big', name: 'nagyobb, mint 0,5', color: 'amber' }
    ],
    items: [
      { id: 'rts10', text: 'Kató (p = 0,6) mind az 5 dobása talál', categoryId: 'small' },
      { id: 'rts11', text: 'kockával csak az 5. dobásra jön az első hatos', categoryId: 'small' },
      { id: 'rts12', text: 'érme 8-szor: pontosan egy fej', categoryId: 'small' },
      { id: 'rts13', text: 'Özséb (p = 0,7) két rúgásából pontosan egy megy be', categoryId: 'mid' },
      { id: 'rts14', text: '4 kockadobásból egyik sem hatos', categoryId: 'mid' },
      { id: 'rts15', text: 'a kígyó (p = 0,8) 3-ból pontosan kétszer mar', categoryId: 'mid' },
      { id: 'rts16', text: 'Özséb két rúgásából legalább egy bemegy', categoryId: 'big' },
      { id: 'rts17', text: 'a kígyó 3-ból legalább egyszer mar', categoryId: 'big' },
      { id: 'rts18', text: 'p = 0,05 selejtnél 2 termékből mindkettő jó', categoryId: 'big' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik minta illik rá?',
    description: 'Sorold be a kérdést a megfelelő számolási mintához!',
    categories: [
      { id: 'first', name: 'k-adikra az első siker: (1 − p)^{k−1} · p', color: 'emerald' },
      { id: 'least', name: 'legalább egyszer: 1 − (1 − p)ⁿ', color: 'amber' },
      { id: 'fixed', name: 'adott helyen egy siker: p · (1 − p)^{n−1}', color: 'blue' }
    ],
    items: [
      { id: 'rts19', text: 'a 3. dobás lesz az első hatos', categoryId: 'first' },
      { id: 'rts20', text: 'a 4. dobás lesz először kisebb, mint 5', categoryId: 'first' },
      { id: 'rts21', text: 'Özséb első gólja a 2. rúgásából születik', categoryId: 'first' },
      { id: 'rts22', text: '10 kockadobásból legalább egy hatos', categoryId: 'least' },
      { id: 'rts23', text: 'a kígyó legalább egyszer megmar', categoryId: 'least' },
      { id: 'rts24', text: 'a 20 termék között van selejtes', categoryId: 'least' },
      { id: 'rts25', text: 'a 20 termékből csak a 2. selejtes', categoryId: 'fixed' },
      { id: 'rts26', text: 'az 5 kosárdobásból csak az első megy be', categoryId: 'fixed' },
      { id: 'rts27', text: 'a 4 kockadobásból csak a 3. hatos', categoryId: 'fixed' }
    ]
  }
};

export const RepeatedTrialsSorter: React.FC<RepeatedTrialsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-bernoulli-sorter',
  topicTitle = '12. Ugyanazt többször – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="ugyanazt-tobbszor"
      title={topicTitle}
      subtitle="Döntsd el, melyik képlet illik a helyzethez, és becsüld meg a valószínűséget!"
      levels={REPEATED_TRIALS_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default RepeatedTrialsSorter;
