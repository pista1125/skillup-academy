import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RatioReviewMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Arányok Egyszerűsítése és Alapjai',
    subtitle: 'Párosítsd az arányokat a legegyszerűbb, egész számokkal felírt alakjukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: '14 : 18',
        value: '7 : 9 (osztva 2-vel)'
      },
      {
        id: 'p2',
        prompt: '20 : 25',
        value: '4 : 5 (osztva 5-tel)'
      },
      {
        id: 'p3',
        prompt: '26 : 39',
        value: '2 : 3 (osztva 13-mal)'
      },
      {
        id: 'p4',
        prompt: '4,2 : 5,4',
        value: '7 : 9 (42 : 54, osztva 6-tal)'
      },
      {
        id: 'p5',
        prompt: '1,5 : 6,75',
        value: '2 : 9 (150 : 675, osztva 75-tel)'
      },
      {
        id: 'p6',
        prompt: '6 : 18',
        value: '1 : 3 (osztva 6-tal)'
      },
      {
        id: 'p7',
        prompt: '16 : 24',
        value: '2 : 3 (osztva 8-cal)'
      },
      {
        id: 'p8',
        prompt: '24 : 60',
        value: '2 : 5 (osztva 12-vel)'
      }
    ]
  },
  2: {
    title: '2. Szint: Törtek Aránya Egész Számokként',
    subtitle: 'Párosítsd a közönséges és vegyes törtek arányát a legegyszerűbb egész számú aránnyal!',
    pairs: [
      {
        id: 'p9',
        prompt: '1/2 : 3/4',
        value: '2 : 3 (2/4 : 3/4)'
      },
      {
        id: 'p10',
        prompt: '3/5 : 8/20',
        value: '3 : 2 (3/5 : 2/5)'
      },
      {
        id: 'p11',
        prompt: '3/9 : 7/9',
        value: '3 : 7 (azonos nevező)'
      },
      {
        id: 'p12',
        prompt: '5/6 : 5/6',
        value: '1 : 1 (egyenlő törtek)'
      },
      {
        id: 'p13',
        prompt: '1 1/2 : 7/8',
        value: '12 : 7 (3/2 : 7/8 = 12/8 : 7/8)'
      },
      {
        id: 'p14',
        prompt: '3/7 : 7/3',
        value: '9 : 49 (9/21 : 49/21)'
      },
      {
        id: 'p15',
        prompt: '2 : 5/2',
        value: '4 : 5 (4/2 : 5/2)'
      },
      {
        id: 'p16',
        prompt: '4/3 : 2',
        value: '2 : 3 (4/3 : 6/3)'
      }
    ]
  },
  3: {
    title: '3. Szint: Arányos Osztási Feladványok',
    subtitle: 'Párosítsd a felosztandó mennyiségeket és arányokat a helyes részekkel!',
    pairs: [
      {
        id: 'p17',
        prompt: '56 felosztva 3 : 5 arányban',
        value: '21 és 35 (56 : 8 = 7)'
      },
      {
        id: 'p18',
        prompt: '14 400 Ft felosztva 11 : 13 arányban',
        value: '6600 Ft és 7800 Ft (14 400 : 24 = 600)'
      },
      {
        id: 'p19',
        prompt: '42 év életkor 8 : 6 arányban',
        value: '24 év és 18 év (42 : 14 = 3)'
      },
      {
        id: 'p20',
        prompt: '90° felosztva 1 : 4 arányban',
        value: '18° és 72° (90 : 5 = 18)'
      },
      {
        id: 'p21',
        prompt: '6300 felosztva 2 : 3 : 4 arányban',
        value: '1400; 2100; 2800 (6300 : 9 = 700)'
      },
      {
        id: 'p22',
        prompt: 'Két szám összege 546, arányuk 4 : 9',
        value: '168 és 378 (546 : 13 = 42)'
      },
      {
        id: 'p23',
        prompt: 'Két szám különbsége 45, arányuk 2 : 7',
        value: '18 és 63 (45 : 5 = 9)'
      },
      {
        id: 'p24',
        prompt: '420 kártya 3 : 1 arányban',
        value: '315 és 105 (420 : 4 = 105)'
      }
    ]
  }
};

export const RatioReviewMatcher: React.FC<RatioReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-ratio-matcher',
  topicTitle = 'Az arányosságról még egyszer'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      title="Az arányosságról még egyszer - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default RatioReviewMatcher;
