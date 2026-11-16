import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Orientation4SorterProps {
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

const ORIENTATION4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Oszlop, sor vagy mező?',
    description: 'Oszlop jele, sor jele vagy egy mező teljes kódja?',
    categories: [
      { id: 'col', name: 'Oszlop jele (betű)', color: 'orange' },
      { id: 'row', name: 'Sor jele (szám)', color: 'purple' },
      { id: 'cell', name: 'Mező kódja', color: 'cyan' }
    ],
    items: [
      { id: 'ors1', text: 'C', categoryId: 'col' },
      { id: 'ors2', text: 'f', categoryId: 'col' },
      { id: 'ors3', text: 'A', categoryId: 'col' },
      { id: 'ors4', text: '4', categoryId: 'row' },
      { id: 'ors5', text: '8', categoryId: 'row' },
      { id: 'ors6', text: '2', categoryId: 'row' },
      { id: 'ors7', text: 'B3', categoryId: 'cell' },
      { id: 'ors8', text: 'e4', categoryId: 'cell' },
      { id: 'ors9', text: 'G1', categoryId: 'cell' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Világos, sötét vagy nem sakkbábu?',
    description: 'Válogasd szét a bábukat és a tárgyakat!',
    categories: [
      { id: 'white', name: 'Világos sakkbábu', color: 'amber' },
      { id: 'black', name: 'Sötét sakkbábu', color: 'slate' },
      { id: 'none', name: 'Nem sakkbábu', color: 'rose' }
    ],
    items: [
      { id: 'ors10', text: '♔', categoryId: 'white' },
      { id: 'ors11', text: '♖', categoryId: 'white' },
      { id: 'ors12', text: '♘', categoryId: 'white' },
      { id: 'ors13', text: '♚', categoryId: 'black' },
      { id: 'ors14', text: '♛', categoryId: 'black' },
      { id: 'ors15', text: '♝', categoryId: 'black' },
      { id: 'ors16', text: 'dobókocka', categoryId: 'none' },
      { id: 'ors17', text: 'dominó', categoryId: 'none' },
      { id: 'ors18', text: 'logikai lap', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hol van a postához (C3) képest?',
    description: 'A Kisváros térképén az 1. sor van felül. Északabbra, ugyanabban a sorban vagy délebbre van a hely, mint a posta?',
    categories: [
      { id: 'north', name: 'Északabbra (feljebb)', color: 'sky' },
      { id: 'same', name: 'Ugyanabban a sorban', color: 'emerald' },
      { id: 'south', name: 'Délebbre (lejjebb)', color: 'amber' }
    ],
    items: [
      { id: 'ors19', text: 'templom (D1)', categoryId: 'north' },
      { id: 'ors20', text: 'iskola (B2)', categoryId: 'north' },
      { id: 'ors21', text: 'uszoda (F2)', categoryId: 'north' },
      { id: 'ors22', text: 'mozi (A3)', categoryId: 'same' },
      { id: 'ors23', text: 'fagyizó (E3)', categoryId: 'same' },
      { id: 'ors24', text: 'az üres F3 mező', categoryId: 'same' },
      { id: 'ors25', text: 'park (E4)', categoryId: 'south' },
      { id: 'ors26', text: 'focipálya (D5)', categoryId: 'south' },
      { id: 'ors27', text: 'könyvtár (F5)', categoryId: 'south' }
    ]
  }
];

const ORIENTATION4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ORIENTATION4_SORTER_LEVELS_LIST[0],
  2: ORIENTATION4_SORTER_LEVELS_LIST[1],
  3: ORIENTATION4_SORTER_LEVELS_LIST[2]
};

export const Orientation4Sorter: React.FC<Orientation4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-tajekozodas-sorter',
  topicTitle = '8. Tájékozódás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="tajekozodas"
      title={topicTitle}
      subtitle="Rendszerezd a jelöléseket, a bábukat és a helyeket a térképen!"
      levels={ORIENTATION4_SORTER_LEVELS}
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

export default Orientation4Sorter;
