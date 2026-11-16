import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ClassMidpointsMatcherProps {
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

const CLASS_MIDPOINTS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Osztály és osztályközép',
    description: 'Párosítsd az osztályt az osztályközepével!',
    pairs: [
      { id: 'cmpm1', left: '120–124', right: '122' },
      { id: 'cmpm2', left: '155–159', right: '157' },
      { id: 'cmpm3', left: '26–50 mm', right: '38 mm' },
      { id: 'cmpm4', left: '101–133 mm', right: '117 mm' },
      { id: 'cmpm5', left: '31–40 pont', right: '35,5 pont' },
      { id: 'cmpm6', left: '0–30 pont', right: '15 pont' },
      { id: 'cmpm7', left: '11,8–12,8 mm', right: '12,3 mm' },
      { id: 'cmpm8', left: '73–81 g', right: '77 g' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Fogalmak és szabályok',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'cmpm9', left: 'osztályközép', right: 'az osztályt határoló két érték számtani közepe' },
      { id: 'cmpm10', left: 'osztályba sorolás szabálya', right: 'nincs közös rész, és minden adat valamelyik osztályba esik' },
      { id: 'cmpm11', left: 'túl kevés osztály', right: 'torzíthat az adatsokaságon' },
      { id: 'cmpm12', left: 'túl sok osztály', right: 'nehezíti az elemzést' },
      { id: 'cmpm13', left: 'átlag osztályközepekkel', right: 'a gyakoriságokkal súlyozott átlag' },
      { id: 'cmpm14', left: 'legmagasabb lehetséges átlag', right: 'a felső határokkal számolt átlag' },
      { id: 'cmpm15', left: 'legalacsonyabb lehetséges átlag', right: 'az alsó határokkal számolt átlag' },
      { id: 'cmpm16', left: 'tűrés', right: 'az előírt értéktől megengedett legnagyobb eltérés' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tankönyvi eredmények',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'cmpm17', left: 'szögek átlaga', right: '140,4' },
      { id: 'cmpm18', left: 'szögek mediánja', right: '137' },
      { id: 'cmpm19', left: 'csapadék átlaga (osztályközepekkel)', right: '≈ 42,3 mm' },
      { id: 'cmpm20', left: 'csapadék szórása (osztályközepekkel)', right: '≈ 26,2 mm' },
      { id: 'cmpm21', left: 'dolgozatpontszámok átlaga', right: '59,1 pont' },
      { id: 'cmpm22', left: 'tűrésen belüli huzalok aránya', right: '88%' },
      { id: 'cmpm23', left: 'huzalhosszak szórása', right: '≈ 1,01 mm' },
      { id: 'cmpm24', left: 'érettségi 2018: osztályközepes átlag', right: '61,5 pont' }
    ]
  }
};

export const ClassMidpointsMatcher: React.FC<ClassMidpointsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-osztalykozepek-matcher',
  topicTitle = '4. Számítások osztályközepekkel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="szamitasok-osztalykozepekkel"
      title={topicTitle}
      subtitle="Gyakorold az osztályközepeket, az osztályba sorolás szabályait és az osztályközepes számításokat!"
      levels={CLASS_MIDPOINTS_MATCHER_LEVELS}
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

export default ClassMidpointsMatcher;
