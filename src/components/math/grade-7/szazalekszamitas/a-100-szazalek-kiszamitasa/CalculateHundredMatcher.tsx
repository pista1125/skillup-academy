import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CalculateHundredMatcherProps {
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
    title: '1. Szint: Alapvető 100% Visszaszámolások',
    subtitle: 'Párosítsd a megadott százalékrészeket a teljes egész (100%) értékével!',
    pairs: [
      {
        id: 'p1',
        prompt: '1%-a 29',
        value: '2900 (29 · 100)'
      },
      {
        id: 'p2',
        prompt: '2%-a 22',
        value: '1100 (1% = 11)'
      },
      {
        id: 'p3',
        prompt: '20%-a 40',
        value: '200 (ötödrésze, 40 · 5)'
      },
      {
        id: 'p4',
        prompt: '10%-a 750',
        value: '7500 (tizedrésze, 750 · 10)'
      },
      {
        id: 'p5',
        prompt: '50%-a 45',
        value: '90 (a fele, 45 · 2)'
      },
      {
        id: 'p6',
        prompt: '25%-a 18',
        value: '72 (negyedrésze, 18 · 4)'
      },
      {
        id: 'p7',
        prompt: '75%-a 60',
        value: '80 (háromnegyede, 60 : 3 · 4)'
      },
      {
        id: 'p8',
        prompt: '160%-a 40',
        value: '25 (40 : 1,6)'
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Iskolai és Mindennapi Feladatok',
    subtitle: 'Keresd meg a szöveges részértékhez tartozó teljes kiindulási alapot!',
    pairs: [
      {
        id: 'p9',
        prompt: '84 zenét tanuló diák (12%)',
        value: '700 tanuló az iskolában'
      },
      {
        id: 'p10',
        prompt: '40 sportoló diák (32%)',
        value: '125 tanuló az évfolyamon'
      },
      {
        id: 'p11',
        prompt: '72 megjegyzett angol szó (60%)',
        value: '120 szót kellett tudnia'
      },
      {
        id: 'p12',
        prompt: '96 hatodikos diák (15%)',
        value: '640 tanuló jár az iskolába'
      },
      {
        id: 'p13',
        prompt: 'Hátralévő 72 perc a filmből (40%)',
        value: '180 perces a teljes film'
      },
      {
        id: 'p14',
        prompt: '24 m² napelem a tetőn (30%)',
        value: '80 m² a teljes tetőfelület'
      },
      {
        id: 'p15',
        prompt: '150 Ft drágulás (30%)',
        value: '500 Ft volt az eredeti ár'
      },
      {
        id: 'p16',
        prompt: 'Alvin 9 cm növekedése (6%)',
        value: '150 cm volt egy éve'
      }
    ]
  },
  3: {
    title: '3. Szint: Áremelés, Akció és Összetett Visszaszámítás',
    subtitle: 'Párosítsd a megváltozott értékeket az eredeti alap vagy új állapot helyes értékével!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Autó új ára +20% után 4 560 000 Ft',
        value: '3 800 000 Ft volt az eredeti ára'
      },
      {
        id: 'p18',
        prompt: 'Számítógép akciós ára -20% után 196 000 Ft',
        value: '245 000 Ft volt az akció előtt'
      },
      {
        id: 'p19',
        prompt: 'Osztálylétszám +25% növekedés után 30 fő',
        value: '24 diák volt korábban'
      },
      {
        id: 'p20',
        prompt: '7500 € foglaló a ház árának 10%-a',
        value: '75 000 € a ház vételára'
      },
      {
        id: 'p21',
        prompt: 'Délután megmaradt 120 kg barack (40%)',
        value: '300 kg barack volt a nap elején'
      },
      {
        id: 'p22',
        prompt: 'Peti apukájának 684 000 Ft adója (15%)',
        value: '4 560 000 Ft az adóköteles jövedelem'
      },
      {
        id: 'p23',
        prompt: '297 Ft spórolás 1,5%-kal 45 literen',
        value: '440 Ft/liter volt az eredeti benzinár'
      },
      {
        id: 'p24',
        prompt: 'Maxi Mix 30%-os drágulása (150 Ft)',
        value: '650 Ft az új bolti ára (500 + 150)'
      }
    ]
  }
};

export const CalculateHundredMatcher: React.FC<CalculateHundredMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-100-matcher',
  topicTitle = 'A 100% kiszámítása'
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
      themeColor="emerald"
      title="A 100% kiszámítása - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default CalculateHundredMatcher;
