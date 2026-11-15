import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigPracticeExamMatcherProps {
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

const TRIG_PRACTICE_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nevezetes szögfüggvény-értékek',
    description: 'Párosítsd a szögfüggvényt a pontos értékével!',
    pairs: [
      {
        id: 'tpem1',
        left: 'sin 30°',
        right: '0,5'
      },
      {
        id: 'tpem2',
        left: 'cos 90°',
        right: '0'
      },
      {
        id: 'tpem3',
        left: 'sin 90°',
        right: '1'
      },
      {
        id: 'tpem4',
        left: 'cos 120°',
        right: '−0,5'
      },
      {
        id: 'tpem5',
        left: 'sin 45°',
        right: '√2/2 ≈ 0,7071'
      },
      {
        id: 'tpem6',
        left: 'sin 60°',
        right: '√3/2 ≈ 0,866'
      },
      {
        id: 'tpem7',
        left: 'tg 60°',
        right: '√3 ≈ 1,732'
      },
      {
        id: 'tpem8',
        left: 'cos 150°',
        right: '−√3/2 ≈ −0,866'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gyakorló feladatok',
    description: 'Párosítsd a tankönyvi feladatot az eredményével!',
    pairs: [
      {
        id: 'tpem9',
        left: 'sin α = 0,6 ⇒ cos α',
        right: '0,8'
      },
      {
        id: 'tpem10',
        left: 'sin α = 0,6 ⇒ tg α',
        right: '0,75'
      },
      {
        id: 'tpem11',
        left: 'A Kristályszálló magassága',
        right: '≈ 27,3 m'
      },
      {
        id: 'tpem12',
        left: 'Két érintő (56°, r = 3,4 cm): a metszéspont távolsága a középponttól',
        right: '≈ 7,24 cm'
      },
      {
        id: 'tpem13',
        left: 'Vödör: a fiú ereje',
        right: '≈ 63,4 N'
      },
      {
        id: 'tpem14',
        left: 'Az AC = 22 cm átlójú négyszög területe',
        right: '≈ 276,2 cm²'
      },
      {
        id: 'tpem15',
        left: 'Egyenlő szárú háromszög (70°, 15 cm-es szárak) magassága',
        right: '≈ 14,10 cm'
      },
      {
        id: 'tpem16',
        left: '12 cm sugarú kör 16 cm-es húrja: a kisebbik körszelet',
        right: '≈ 33,53 cm²'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tudáspróbák és érettségi',
    description: 'Párosítsd a tudáspróba- és érettségi feladatot az eredményével!',
    pairs: [
      {
        id: 'tpem17',
        left: 'Tetőtér: a tető alapjának szélessége',
        right: '≈ 8,01 m'
      },
      {
        id: 'tpem18',
        left: 'Érettségi 2013: a BC oldal',
        right: '≈ 60 mm'
      },
      {
        id: 'tpem19',
        left: 'Érettségi 2013: a B csúcsnál lévő szög',
        right: '≈ 30°'
      },
      {
        id: 'tpem20',
        left: 'A labdára ható két erő eredője',
        right: '≈ 1803 N'
      },
      {
        id: 'tpem21',
        left: 'A gúla alakú tető alapéle',
        right: '≈ 10,01 m'
      },
      {
        id: 'tpem22',
        left: 'Tompaszögű háromszög (T = 6,65 dm²): a közbezárt szög',
        right: '≈ 110,82°'
      },
      {
        id: 'tpem23',
        left: 'Érettségi 2020: az ötszög területe',
        right: '150'
      },
      {
        id: 'tpem24',
        left: 'A „800 éves” feladat: a második torony magassága',
        right: '≈ 34,69 könyök'
      }
    ]
  }
];

const TRIG_PRACTICE_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TRIG_PRACTICE_EXAM_MATCHER_LEVELS_LIST[0],
  2: TRIG_PRACTICE_EXAM_MATCHER_LEVELS_LIST[1],
  3: TRIG_PRACTICE_EXAM_MATCHER_LEVELS_LIST[2]
};

export const TrigPracticeExamMatcher: React.FC<TrigPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-tudasproba-matcher',
  topicTitle = '16. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Gyakorold a nevezetes értékeket és a fejezet tudáspróba-feladatainak eredményeit!"
      levels={TRIG_PRACTICE_EXAM_MATCHER_LEVELS}
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

export default TrigPracticeExamMatcher;
