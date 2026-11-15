import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SamplingWithReplacementSorterProps {
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

const SAMPLING_WITH_REPLACEMENT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen mintavétel?',
    description: 'Sorold be a helyzetet!',
    categories: [
      { id: 'with', name: 'visszatevéses húzás', color: 'emerald' },
      { id: 'without', name: 'visszatevés nélküli húzás', color: 'rose' },
      { id: 'repeat', name: 'ugyanaz a kísérlet ismétlődik', color: 'blue' }
    ],
    items: [
      { id: 'swrs1', text: 'golyót húzunk, feljegyezzük a színét, majd visszatesszük', categoryId: 'with' },
      { id: 'swrs2', text: 'a minőségellenőr megvizsgálja a gyöngyöt, majd visszateszi', categoryId: 'with' },
      { id: 'swrs3', text: 'közvélemény-kutatás, ahol valakit kétszer is megkérdezhetnek', categoryId: 'with' },
      { id: 'swrs4', text: 'lottóhúzás: 5 szám a 90 közül', categoryId: 'without' },
      { id: 'swrs5', text: 'kártyalapokat húzunk, és félretesszük őket', categoryId: 'without' },
      { id: 'swrs6', text: 'a kihúzott tombolaszelvényt nem tesszük vissza', categoryId: 'without' },
      { id: 'swrs7', text: 'kockával 8-szor dobunk', categoryId: 'repeat' },
      { id: 'swrs8', text: 'Ferkó ötször lő a céllövöldében', categoryId: 'repeat' },
      { id: 'swrs9', text: 'egy gép állandó hibaszázalékkal 15 terméket gyárt', categoryId: 'repeat' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kell-e binomiális együttható?',
    description: 'Döntsd el, milyen szorzó kell a pᵏ · (1 − p)^{n−k} elé!',
    categories: [
      { id: 'coef', name: 'kell: (n alatt k)', color: 'violet' },
      { id: 'order', name: 'nem kell: rögzített sorrend', color: 'amber' },
      { id: 'one', name: 'az együttható 1: mind siker vagy mind kudarc', color: 'teal' }
    ],
    items: [
      { id: 'swrs10', text: '6 pörgetésből pontosan 4 piros', categoryId: 'coef' },
      { id: 'swrs11', text: '8 dobásból pontosan 2 hatos', categoryId: 'coef' },
      { id: 'swrs12', text: '15 termékből pontosan 2 selejtes', categoryId: 'coef' },
      { id: 'swrs13', text: 'az első 4 pörgetés piros, a következő 2 fekete', categoryId: 'order' },
      { id: 'swrs14', text: 'a 6 dobásból csak a harmadik hatos', categoryId: 'order' },
      { id: 'swrs15', text: 'Ferkó első lövése talál, a többi nem', categoryId: 'order' },
      { id: 'swrs16', text: 'mind a 6 pörgetés piros', categoryId: 'one' },
      { id: 'swrs17', text: 'Ferkó egyik lövése sem talál', categoryId: 'one' },
      { id: 'swrs18', text: 'egyik palacsinta sem szakad el', categoryId: 'one' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mekkora a valószínűség?',
    description: 'Számold ki a binomiális valószínűséget, és sorold be!',
    categories: [
      { id: 'small', name: 'kisebb, mint 0,1', color: 'rose' },
      { id: 'mid', name: '0,1 és 0,3 között', color: 'blue' },
      { id: 'big', name: 'nagyobb, mint 0,3', color: 'emerald' }
    ],
    items: [
      { id: 'swrs19', text: 'Tünde 3 palacsintájából pontosan 2 szakad el (p = 0,2)', categoryId: 'small' },
      { id: 'swrs20', text: '15 termékből pontosan 2 selejtes (p = 0,03)', categoryId: 'small' },
      { id: 'swrs21', text: '6 kockadobásból pontosan 3 kettes', categoryId: 'small' },
      { id: 'swrs22', text: '8 kockadobásból pontosan 2 hatos', categoryId: 'mid' },
      { id: 'swrs23', text: '5 kísérletből (p = 0,8) pontosan 3 sikeres', categoryId: 'mid' },
      { id: 'swrs24', text: '10 érmedobásból pontosan 5 fej', categoryId: 'mid' },
      { id: 'swrs25', text: 'Ferkó 5 lövéséből 0 találat (p = 0,15)', categoryId: 'big' },
      { id: 'swrs26', text: 'Tünde 3 palacsintájából pontosan 1 szakad el', categoryId: 'big' },
      { id: 'swrs27', text: '4 húzásból (p = 0,2) pontosan 1 piros', categoryId: 'big' }
    ]
  }
};

export const SamplingWithReplacementSorter: React.FC<SamplingWithReplacementSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-visszateveses-sorter',
  topicTitle = '13. Visszatevéses mintavétel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="visszateveses-mintavetel"
      title={topicTitle}
      subtitle="Ismerd fel a mintavétel fajtáját, és döntsd el, kell-e binomiális együttható!"
      levels={SAMPLING_WITH_REPLACEMENT_SORTER_LEVELS}
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

export default SamplingWithReplacementSorter;
