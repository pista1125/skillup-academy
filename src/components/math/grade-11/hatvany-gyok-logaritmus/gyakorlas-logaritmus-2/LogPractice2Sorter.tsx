import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogPractice2SorterProps {
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

const LOG_PRACTICE_2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen előjelű a logaritmus?',
    description: 'Számold ki fejben, és sorold be az értékük előjele szerint!',
    categories: [
      { id: 'pos', name: 'Pozitív', color: 'violet' },
      { id: 'zero', name: 'Nulla', color: 'slate' },
      { id: 'neg', name: 'Negatív', color: 'rose' }
    ],
    items: [
      { id: 'lp2s1', text: 'log₃ 9', categoryId: 'pos' },
      { id: 'lp2s2', text: 'lg 2000', categoryId: 'pos' },
      { id: 'lp2s3', text: 'log₀,₅ 0,25', categoryId: 'pos' },
      { id: 'lp2s4', text: 'log₇ 1', categoryId: 'zero' },
      { id: 'lp2s5', text: 'lg 1', categoryId: 'zero' },
      { id: 'lp2s6', text: 'log₁/₃ 1', categoryId: 'zero' },
      { id: 'lp2s7', text: 'lg 0,0001', categoryId: 'neg' },
      { id: 'lp2s8', text: 'log₃ 1/9', categoryId: 'neg' },
      { id: 'lp2s9', text: 'log₀,₅ 4', categoryId: 'neg' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Milyen a modell?',
    description: 'Sorold be a tankönyvi modelleket!',
    categories: [
      { id: 'grow', name: 'Exponenciális növekedés', color: 'emerald' },
      { id: 'decay', name: 'Exponenciális csökkenés', color: 'amber' },
      { id: 'log', name: 'Logaritmusos képlet', color: 'blue' }
    ],
    items: [
      { id: 'lp2s10', text: 'T(n) = 2000 · 1,06ⁿ (kamatos kamat)', categoryId: 'grow' },
      { id: 'lp2s11', text: 'B(t) = 3 000 000 · 2^(t/15) (baktériumok)', categoryId: 'grow' },
      { id: 'lp2s12', text: 'f(x) = 2000 · 1,002ˣ (részvény)', categoryId: 'grow' },
      { id: 'lp2s13', text: 'K(t) = 60 · 0,87ᵗ (kávé hűlése)', categoryId: 'decay' },
      { id: 'lp2s14', text: 'p(x) = 1,013 · 10⁵ · 1,133⁻ˣ (légnyomás)', categoryId: 'decay' },
      { id: 'lp2s15', text: 'N(t) = 4,2 · 10²⁴ · 0,97ᵗ (ólomizotóp)', categoryId: 'decay' },
      { id: 'lp2s16', text: 'I = −log₂ p (Shannon)', categoryId: 'log' },
      { id: 'lp2s17', text: 'H = n · log₂ N (Hartley)', categoryId: 'log' },
      { id: 'lp2s18', text: 'M = −4,42 + (2/3) · lg E (Richter)', categoryId: 'log' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik módszerrel?',
    description: 'Döntsd el, hogyan oldod meg a legegyszerűbben!',
    categories: [
      { id: 'same', name: 'Azonos alapra hozás', color: 'violet' },
      { id: 'lg', name: 'Logaritmussal: x = lg b / lg a', color: 'teal' },
      { id: 'flip', name: 'Egyenlőtlenség, megforduló reláció', color: 'rose' }
    ],
    items: [
      { id: 'lp2s19', text: '3ˣ⁺¹ = 81', categoryId: 'same' },
      { id: 'lp2s20', text: '4³ˣ⁻¹ = 0,5', categoryId: 'same' },
      { id: 'lp2s21', text: '2,4ˣ = 5,76', categoryId: 'same' },
      { id: 'lp2s22', text: '1,065ᵏ = 3,45', categoryId: 'lg' },
      { id: 'lp2s23', text: '0,87ᵗ = 0,5', categoryId: 'lg' },
      { id: 'lp2s24', text: '1,06ⁿ = 2,012', categoryId: 'lg' },
      { id: 'lp2s25', text: '0,87ᵗ < 1/60', categoryId: 'flip' },
      { id: 'lp2s26', text: '(7/8)⁵ˣ⁻⁴ < 8/7', categoryId: 'flip' },
      { id: 'lp2s27', text: '(1/2)ˣ < 8', categoryId: 'flip' }
    ]
  }
};

export const LogPractice2Sorter: React.FC<LogPractice2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-log-gyakorlas-masodik-sorter',
  topicTitle = '15. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-logaritmus-2"
      title={topicTitle}
      subtitle="Rendszerezd a logaritmusokat, a modelleket és a megoldási módszereket!"
      levels={LOG_PRACTICE_2_SORTER_LEVELS}
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

export default LogPractice2Sorter;
