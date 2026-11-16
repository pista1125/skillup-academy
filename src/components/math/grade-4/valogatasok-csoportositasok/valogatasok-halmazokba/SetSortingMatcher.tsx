import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SetSortingMatcherProps {
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

const SET_SORTING_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Halmazos szavak",
    description: "Párosítsd a szót a jelentésével vagy a halmazt egy jó példával!",
    pairs: [
      { id: 'ssm1', left: "alaphalmaz", right: "a keret: az összes elem, amit válogatunk" },
      { id: 'ssm2', left: "címke", right: "megmondja, mi kerül a karikába" },
      { id: 'ssm3', left: "közös rész", right: "ide az kerül, amire mindkét címke igaz" },
      { id: 'ssm4', left: "a karikákon kívüli rész", right: "ide az kerül, amire egyik címke sem igaz" },
      { id: 'ssm5', left: "kakukktojás", right: "az az elem, amelyik nem illik a többi közé" },
      { id: 'ssm6', left: "Páros számok", right: "54, 600, 1246" },
      { id: 'ssm7', left: "5 többszörösei", right: "125, 850, 8005" },
      { id: 'ssm8', left: "Négyjegyű számok", right: "1001, 4560, 9999" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Ki hol van?",
    description: "TK 132. o. 2. (vidraetetés, csónakázás) és MF II. 48. o. 1–2. (madár, háziállat, gyümölcs) alapján.",
    pairs: [
      { id: 'ssm9', left: "Dóri", right: "csak vidraetetést nézett" },
      { id: 'ssm10', left: "Józsi", right: "csak csónakázott" },
      { id: 'ssm11', left: "Sanyi", right: "vidraetetést nézett és csónakázott is" },
      { id: 'ssm12', left: "kacsa", right: "madár és háziállat is" },
      { id: 'ssm13', left: "gólya", right: "madár, de nem háziállat" },
      { id: 'ssm14', left: "kecske", right: "háziállat, de nem madár" },
      { id: 'ssm15', left: "őz", right: "se nem madár, se nem háziállat" },
      { id: 'ssm16', left: "dió", right: "gyümölcs, de szörp nem készül belőle" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Logikai lapok három karikában",
    description: "A karikák: Kék, Lyukas, Háromszög (TK 134. o. 8.). Hová kerül a lap?",
    pairs: [
      { id: 'ssm17', left: "kék, nem lyukas kör", right: "csak a Kék karikába (1.)" },
      { id: 'ssm18', left: "kék, lyukas négyzet", right: "Kék és Lyukas, de nem Háromszög (2.)" },
      { id: 'ssm19', left: "zöld, lyukas négyzet", right: "csak a Lyukas karikába (3.)" },
      { id: 'ssm20', left: "kék, nem lyukas háromszög", right: "Kék és Háromszög, de nem Lyukas (4.)" },
      { id: 'ssm21', left: "kék, lyukas háromszög", right: "mindhárom karikába: a közepére (5.)" },
      { id: 'ssm22', left: "sárga, lyukas háromszög", right: "Lyukas és Háromszög, de nem Kék (6.)" },
      { id: 'ssm23', left: "zöld, nem lyukas háromszög", right: "csak a Háromszög karikába (7.)" },
      { id: 'ssm24', left: "piros, nem lyukas kör", right: "egyik karikába sem (8.)" }
    ]
  }
];

const SET_SORTING_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SET_SORTING_MATCHER_LEVELS_LIST[0],
  2: SET_SORTING_MATCHER_LEVELS_LIST[1],
  3: SET_SORTING_MATCHER_LEVELS_LIST[2]
};

export const SetSortingMatcher: React.FC<SetSortingMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-group-halmazok-matcher',
  topicTitle = "1. Válogatások halmazokba – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="valogatasok-halmazokba"
      title={topicTitle}
      subtitle="Párosítsd a halmazos szavakat, az állatokat, gyerekeket és logikai lapokat a helyükkel!"
      levels={SET_SORTING_MATCHER_LEVELS}
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

export default SetSortingMatcher;
