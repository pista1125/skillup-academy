import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityBonusPracticeSorterProps {
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

const PROBABILITY_BONUS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A vívók életkora',
    description: 'Sorold be a tokiói olimpia magyar vívóit életkoruk szerint!',
    categories: [
      { id: 'young', name: '25 évnél fiatalabb', color: 'emerald' },
      { id: 'mid', name: '25–30 éves', color: 'amber' },
      { id: 'old', name: '30 évnél idősebb', color: 'violet' }
    ],
    items: [
      { id: 'pbps1', text: 'Kondricz Kata (23 év)', categoryId: 'young' },
      { id: 'pbps2', text: 'Pusztai Liza (20 év)', categoryId: 'young' },
      { id: 'pbps3', text: 'Battai Sugár Katinka (18 év)', categoryId: 'young' },
      { id: 'pbps4', text: 'Márton Anna (26 év)', categoryId: 'mid' },
      { id: 'pbps5', text: 'Katona Renáta (26 év)', categoryId: 'mid' },
      { id: 'pbps6', text: 'Szatmári András (28 év)', categoryId: 'mid' },
      { id: 'pbps7', text: 'Kreiss Fanni (32 év)', categoryId: 'old' },
      { id: 'pbps8', text: 'Decsi Tamás (38 év)', categoryId: 'old' },
      { id: 'pbps9', text: 'Szilágyi Áron (31 év)', categoryId: 'old' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a védekező erő?',
    description: 'Két kockával dobtunk (piros; kék). A védekező erő a nagyobbik dobás – sorold be a dobáspárokat!',
    categories: [
      { id: 'f4', name: 'Védekező erő: 4', color: 'sky' },
      { id: 'f5', name: 'Védekező erő: 5', color: 'blue' },
      { id: 'f6', name: 'Védekező erő: 6', color: 'indigo' }
    ],
    items: [
      { id: 'pbps10', text: '(4; 2)', categoryId: 'f4' },
      { id: 'pbps11', text: '(1; 4)', categoryId: 'f4' },
      { id: 'pbps12', text: '(4; 4)', categoryId: 'f4' },
      { id: 'pbps13', text: '(5; 3)', categoryId: 'f5' },
      { id: 'pbps14', text: '(5; 5)', categoryId: 'f5' },
      { id: 'pbps15', text: '(2; 5)', categoryId: 'f5' },
      { id: 'pbps16', text: '(6; 1)', categoryId: 'f6' },
      { id: 'pbps17', text: '(6; 6)', categoryId: 'f6' },
      { id: 'pbps18', text: '(3; 6)', categoryId: 'f6' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Kicsi, közepes vagy nagy valószínűség?',
    description: 'Számítsd ki a valószínűséget, és sorold be!',
    categories: [
      { id: 'low', name: 'P < 1/3', color: 'rose' },
      { id: 'midp', name: '1/3 ≤ P ≤ 1/2', color: 'slate' },
      { id: 'high', name: 'P > 1/2', color: 'emerald' }
    ],
    items: [
      { id: 'pbps19', text: '6 gyerek sorban: Sári áll legelöl', categoryId: 'low' },
      { id: 'pbps20', text: 'Molnár úr másodszorra nyitja ki a kaput', categoryId: 'low' },
      { id: 'pbps21', text: 'log₀,₅ n természetes (n = 1, …, 9)', categoryId: 'low' },
      { id: 'pbps22', text: 'Sári és Dóri egymás mögött áll', categoryId: 'midp' },
      { id: 'pbps23', text: 'a dominó illeszthető az 1–5-ös kőhöz', categoryId: 'midp' },
      { id: 'pbps24', text: 'Sári valahol Dóri előtt áll', categoryId: 'midp' },
      { id: 'pbps25', text: 'a kiválasztott alma jonatán', categoryId: 'high' },
      { id: 'pbps26', text: 'a védekező erő legalább 5', categoryId: 'high' },
      { id: 'pbps27', text: 'nem Dóri áll leghátul', categoryId: 'high' }
    ]
  }
};

export const ProbabilityBonusPracticeSorter: React.FC<ProbabilityBonusPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-raadas-gyakorlas-sorter',
  topicTitle = '8. Ráadás – Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="raadas-gyakorlas"
      title={topicTitle}
      subtitle="Rendszerezd a vívókat életkoruk szerint, a dobáspárokat a védekező erő szerint és az eseményeket valószínűségük szerint!"
      levels={PROBABILITY_BONUS_SORTER_LEVELS}
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

export default ProbabilityBonusPracticeSorter;
