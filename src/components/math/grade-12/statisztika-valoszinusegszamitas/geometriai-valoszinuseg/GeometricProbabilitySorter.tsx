import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricProbabilitySorterProps {
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

const GEOMETRIC_PROBABILITY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Milyen mértéket osztunk?",
    description: "Csoportosítsd a feladatokat a mérték fajtája szerint!",
    categories: [
      { id: 'h', name: "hosszúság", color: 'blue' },
      { id: 't', name: "terület", color: 'emerald' },
      { id: 'v', name: "térfogat", color: 'purple' }
    ],
    items: [
      { id: 'gps1', text: "hangya az 1 m-es rúdon", categoryId: 'h' },
      { id: 'gps2', text: "a kettétört rúd egyik darabján jár a hangya", categoryId: 'h' },
      { id: 'gps3', text: "véletlen pont egy 10 cm-es szakaszon", categoryId: 'h' },
      { id: 'gps4', text: "lövés a céltáblára", categoryId: 't' },
      { id: 'gps5', text: "leejtett érme a csempés padlón", categoryId: 't' },
      { id: 'gps6', text: "véletlen pont a papírlapon", categoryId: 't' },
      { id: 'gps7', text: "homoktúró bogár a virágcserépben", categoryId: 'v' },
      { id: 'gps8', text: "véletlen pont a gömb belsejében", categoryId: 'v' },
      { id: 'gps9', text: "véletlen pont a kocka belsejében", categoryId: 'v' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: 1/4, 1/2 vagy 1/8?",
    description: "Mennyi az esemény valószínűsége?",
    categories: [
      { id: 'q', name: "1/4", color: 'amber' },
      { id: 'h', name: "1/2", color: 'teal' },
      { id: 'e', name: "1/8", color: 'rose' }
    ],
    items: [
      { id: 'gps10', text: "90°-os körcikk a szerencsekeréken", categoryId: 'q' },
      { id: 'gps11', text: "körlap pontja közelebb a középponthoz, mint a körvonalhoz", categoryId: 'q' },
      { id: 'gps12', text: "a négy részre osztott táblán legalább 40 pont", categoryId: 'q' },
      { id: 'gps13', text: "a hangya közelebb van a 0-s véghez, mint a 100-ashoz", categoryId: 'h' },
      { id: 'gps14', text: "a hangya közelebb van a középponthoz, mint egy véghez", categoryId: 'h' },
      { id: 'gps15', text: "180°-os körcikk a szerencsekeréken", categoryId: 'h' },
      { id: 'gps16', text: "gömb pontja közelebb a középponthoz, mint a felülethez", categoryId: 'e' },
      { id: 'gps17', text: "a négy részre osztott táblán pontosan 40 pont", categoryId: 'e' },
      { id: 'gps18', text: "45°-os körcikk a szerencsekeréken", categoryId: 'e' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Mekkora a valószínűség?",
    description: "Számolj, és csoportosítsd az eredményeket!",
    categories: [
      { id: 'a', name: "kisebb, mint 0,5", color: 'blue' },
      { id: 'b', name: "0,5 és 0,75 között", color: 'purple' },
      { id: 'c', name: "nagyobb, mint 0,75", color: 'emerald' }
    ],
    items: [
      { id: 'gps19', text: "bogár a cserépben a fedőlaptól legfeljebb 3 cm-re", categoryId: 'a' },
      { id: 'gps20', text: "pont a 20 × 30-as lapon, minden csúcstól 10 cm-nél távolabb", categoryId: 'a' },
      { id: 'gps21', text: "pont a 34,5 × 19,5-es monitoron a 8 cm sugarú körben", categoryId: 'a' },
      { id: 'gps22', text: "az 50 forintos nem érint fugát", categoryId: 'b' },
      { id: 'gps23', text: "lövés a külső körgyűrűbe (15–25 cm)", categoryId: 'b' },
      { id: 'gps24', text: "hangya a 42 cm-es darab piros részén", categoryId: 'b' },
      { id: 'gps25', text: "pont a négyzetbe írt körben", categoryId: 'c' },
      { id: 'gps26', text: "a mutató nem egy 60°-os körcikkben áll meg", categoryId: 'c' },
      { id: 'gps27', text: "a hangya nincs a rúd első 20 cm-én", categoryId: 'c' }
    ]
  }
};

export const GeometricProbabilitySorter: React.FC<GeometricProbabilitySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-geometriai-sorter',
  topicTitle = "8. Geometriai valószínűség – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="geometriai-valoszinuseg"
      title={topicTitle}
      subtitle="Csoportosítsd a feladatokat a mérték fajtája és a valószínűség nagysága szerint!"
      levels={GEOMETRIC_PROBABILITY_SORTER_LEVELS}
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

export default GeometricProbabilitySorter;
