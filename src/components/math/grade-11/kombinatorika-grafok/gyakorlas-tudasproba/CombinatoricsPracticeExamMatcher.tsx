import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsPracticeExamMatcherProps {
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

const COMBINATORICS_PRACTICE_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek és fogalmak',
    description: 'Párosítsd a fogalmat a képletével vagy jelentésével!',
    pairs: [
      {
        id: 'cpem1',
        left: 'Permutáció (n elem sorba rendezése)',
        right: 'n!'
      },
      {
        id: 'cpem2',
        left: 'Variáció (k elem, számít a sorrend)',
        right: 'n · (n − 1) · … · (n − k + 1)'
      },
      {
        id: 'cpem3',
        left: 'Ismétléses variáció',
        right: 'nᵏ'
      },
      {
        id: 'cpem4',
        left: 'Kombináció (nem számít a sorrend)',
        right: 'n alatt a k = n! / (k! · (n − k)!)'
      },
      {
        id: 'cpem5',
        left: 'Csúcs fokszáma',
        right: 'A csúcsból kiinduló élek száma'
      },
      {
        id: 'cpem6',
        left: 'Fokszámok összege',
        right: '2 · élek száma'
      },
      {
        id: 'cpem7',
        left: 'n pontú teljes gráf élszáma',
        right: 'n(n − 1) / 2'
      },
      {
        id: 'cpem8',
        left: '0!',
        right: '1'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Rejtvény és gyakorló feladatok',
    description: 'Párosítsd a tankönyvi feladatot az eredményével!',
    pairs: [
      {
        id: 'cpem9',
        left: '8 gyerek egy padon, Zsófi a szélén',
        right: '10 080'
      },
      {
        id: 'cpem10',
        left: '{p; a; l; i; 1; 2; 3}: 3 betű + 4 számjegy',
        right: '5184'
      },
      {
        id: 'cpem11',
        left: 'Négyjegyű páros számok 7-es nélkül',
        right: '3240'
      },
      {
        id: 'cpem12',
        left: '3 gyümölcsnap novemberben',
        right: '4060'
      },
      {
        id: 'cpem13',
        left: '5 csúcs, 7 él – fokszámösszeg',
        right: '14'
      },
      {
        id: 'cpem14',
        left: '8 pontú teljes gráf élei',
        right: '28'
      },
      {
        id: 'cpem15',
        left: 'Buszjegy: 2–5 lyuk',
        right: '372'
      },
      {
        id: 'cpem16',
        left: 'Buszjegy: 5 lyuk középpontosan szimmetrikusan',
        right: '6'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tudáspróbák',
    description: 'Párosítsd a tudáspróba feladatát a megoldásával!',
    pairs: [
      {
        id: 'cpem17',
        left: '6 játékos körmérkőzése',
        right: '15 mérkőzés'
      },
      {
        id: 'cpem18',
        left: '17 főből 3 felelő, ugyanaz a feladat',
        right: '680'
      },
      {
        id: 'cpem19',
        left: '17 főből 3 felelő, más-más feladat',
        right: '4080'
      },
      {
        id: 'cpem20',
        left: 'Hajni és Bence ne üljön egymás mellé (4 fő)',
        right: '12'
      },
      {
        id: 'cpem21',
        left: 'Teljes gráf 171 éllel',
        right: '19 csúcs'
      },
      {
        id: 'cpem22',
        left: '10 kérdéses teszt, 4 válasz',
        right: '1 048 576'
      },
      {
        id: 'cpem23',
        left: 'Ötfős küldöttség 27-ből, legyen fiú',
        right: '77 727'
      },
      {
        id: 'cpem24',
        left: 'Zsuzsi telefonszáma két oszlopból',
        right: '504'
      }
    ]
  }
];

const COMBINATORICS_PRACTICE_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COMBINATORICS_PRACTICE_EXAM_MATCHER_LEVELS_LIST[0],
  2: COMBINATORICS_PRACTICE_EXAM_MATCHER_LEVELS_LIST[1],
  3: COMBINATORICS_PRACTICE_EXAM_MATCHER_LEVELS_LIST[2]
};

export const CombinatoricsPracticeExamMatcher: React.FC<CombinatoricsPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-tudasproba-matcher',
  topicTitle = '10. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a fejezet képleteit, a gyakorló feladatok és a tudáspróbák eredményeit!"
      levels={COMBINATORICS_PRACTICE_EXAM_MATCHER_LEVELS}
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

export default CombinatoricsPracticeExamMatcher;
