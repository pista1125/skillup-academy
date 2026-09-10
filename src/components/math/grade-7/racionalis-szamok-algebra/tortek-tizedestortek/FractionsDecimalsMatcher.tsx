import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionsDecimalsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '1/2 tizedestörtként', value: '0,5' },
      { id: 'p2', prompt: '1/4 tizedestörtként', value: '0,25' },
      { id: 'p3', prompt: '3/4 tizedestörtként', value: '0,75' },
      { id: 'p4', prompt: '1/5 tizedestörtként', value: '0,2' },
      { id: 'p5', prompt: '2/5 tizedestörtként', value: '0,4' },
      { id: 'p6', prompt: '1/10 tizedestörtként', value: '0,1' },
      { id: 'p7', prompt: '1/8 tizedestörtként', value: '0,125' },
      { id: 'p8', prompt: '0,75 legegyszerűbb törtje', value: '3/4' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '12/18 legegyszerűbb alakja', value: '2/3' },
      { id: 'p10', prompt: '24/36 legegyszerűbb alakja', value: '2/3' },
      { id: 'p11', prompt: '2 és 1/2 áltörtként', value: '5/2' },
      { id: 'p12', prompt: '1 és 3/4 tizedestörtként', value: '1,75' },
      { id: 'p13', prompt: '3/8 tizedestörtként', value: '0,375' },
      { id: 'p14', prompt: '7/20 tizedestörtként', value: '0,35' },
      { id: 'p15', prompt: '4/5 százalékban', value: '80%' },
      { id: 'p16', prompt: '1/3 tizedestörtként', value: '0,3̇ (szakaszos)' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: '2/3 tizedestörtként', value: '0,6̇' },
      { id: 'p18', prompt: '1/6 tizedestörtként', value: '0,16̇ (vegyes szak.)' },
      { id: 'p19', prompt: '4/11 tizedestörtként', value: '0,3̇6̇' },
      { id: 'p20', prompt: '-3/4 tizedestörtként', value: '-0,75' },
      { id: 'p21', prompt: '5/8 százalékos értéke', value: '62,5%' },
      { id: 'p22', prompt: '9/40 tizedestörtként', value: '0,225' },
      { id: 'p23', prompt: '-1 és 2/5 tizedes alakja', value: '-1,4' },
      { id: 'p24', prompt: '0,35 legegyszerűbb törtje', value: '7/20' },
    ]
  }
};

export const FractionsDecimalsMatcher: React.FC<FractionsDecimalsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Törtek és Tizedestörtek Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a törteket, tizedestört alakokat és fogalmakat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
