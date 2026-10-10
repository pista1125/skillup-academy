import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PercentReviewMatcherProps {
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
    title: '1. Szint: Törtek, Tizedesek és Százalékok',
    subtitle: 'Párosítsd a kifejezéseket a velük egyenlő százalékos vagy tizedes tört alakkal!',
    pairs: [
      {
        id: 'p1',
        prompt: '1/2 rész (fél)',
        value: '50% (0,5)'
      },
      {
        id: 'p2',
        prompt: '1/4 rész (negyed)',
        value: '25% (0,25)'
      },
      {
        id: 'p3',
        prompt: '3/4 rész (háromnegyed)',
        value: '75% (0,75)'
      },
      {
        id: 'p4',
        prompt: '1/5 rész (ötöd)',
        value: '20% (0,2)'
      },
      {
        id: 'p5',
        prompt: '1/10 rész (tized)',
        value: '10% (0,1)'
      },
      {
        id: 'p6',
        prompt: '3/5 rész (0,6)',
        value: '60% (60/100)'
      },
      {
        id: 'p7',
        prompt: '1/8 rész (nyolcad)',
        value: '12,5% (0,125)'
      },
      {
        id: 'p8',
        prompt: '1‰ (egy ezrelék)',
        value: '0,1% (1/1000 = 0,001)'
      }
    ]
  },
  2: {
    title: '2. Szint: Százalékértékek Kiszámítása',
    subtitle: 'Keresd meg az alap adott százalékához tartozó pontos értéket!',
    pairs: [
      {
        id: 'p9',
        prompt: '650 színházi hely 40%-a',
        value: '260 db jegy (650 · 0,4)'
      },
      {
        id: 'p10',
        prompt: '150 g epres joghurt 24%-a',
        value: '36 g eper (150 · 0,24)'
      },
      {
        id: 'p11',
        prompt: '25 kg liszt 40%-a',
        value: '10 kg (25 · 0,4)'
      },
      {
        id: 'p12',
        prompt: '560-nak az 1%-a',
        value: '5,6 (560 : 100)'
      },
      {
        id: 'p13',
        prompt: '3400 Ft könyv 50%-a',
        value: '1700 Ft (a fele)'
      },
      {
        id: 'p14',
        prompt: '750 diák 20%-a',
        value: '150 fő (750 : 5)'
      },
      {
        id: 'p15',
        prompt: '5,4 kg alma 70%-a',
        value: '3,78 kg (5,4 · 0,7)'
      },
      {
        id: 'p16',
        prompt: '120 kg kezdősúly 10%-a',
        value: '12 kg leadott súly'
      }
    ]
  },
  3: {
    title: '3. Szint: Kedvezmények, Keverékek és Összetett Feladatok',
    subtitle: 'Párosítsd a szöveges problémát a helyes végeredménnyel!',
    pairs: [
      {
        id: 'p17',
        prompt: '3400 Ft könyv 24%-os akcióban (új ár)',
        value: '2584 Ft (3400 · 0,76)'
      },
      {
        id: 'p18',
        prompt: 'Digi 120 kg-ról kétszer lead 10%-ot',
        value: '97,2 kg új testsúly (120 · 0,9 · 0,9)'
      },
      {
        id: 'p19',
        prompt: '2 l 25% és 3 l 40% narancslé keveréke',
        value: '34% töménység (1,7 l tömény / 5 l)'
      },
      {
        id: 'p20',
        prompt: '2 l 100% és 1 l 40% narancslé keveréke',
        value: '80% töménység (2,4 l tömény / 3 l)'
      },
      {
        id: 'p21',
        prompt: '25 m hosszú kert 170%-a (másik oldal)',
        value: '42,5 m (25 · 1,7)'
      },
      {
        id: 'p22',
        prompt: '125 db kis kocka 21,6%-a (fekete kockák)',
        value: '27 db kocka (a 3×3×3 mag)'
      },
      {
        id: 'p23',
        prompt: '140 m kerületű négyzet oldala +40%',
        value: '196 m új kerület (4 · 49 m)'
      },
      {
        id: 'p24',
        prompt: 'Sulibuli 60% tánc és 70% ének metszete',
        value: '30% (mindkettőt csinálta)'
      }
    ]
  }
};

export const PercentReviewMatcher: React.FC<PercentReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-review-matcher',
  topicTitle = 'Mit tanultunk a százalékszámításról?'
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
      themeColor="rose"
      title="Mit tanultunk a százalékszámításról? - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default PercentReviewMatcher;
