import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardRect } from './RectAreaG3CardFigures';

interface RectAreaG3MatcherProps {
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

export const RECT_AREA_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hány kis négyzet?',
    description: 'Számolj soronként! Párosítsd a téglalapot a területével!',
    pairs: [
      { id: 'ram1', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={2} cols={3} pal="blue" />, value: '6' },
      { id: 'ram2', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={2} cols={4} pal="orange" />, value: '8' },
      { id: 'ram3', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={3} cols={3} pal="purple" />, value: '9' },
      { id: 'ram4', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={2} cols={5} pal="green" />, value: '10' },
      { id: 'ram5', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={3} cols={4} pal="red" />, value: '12' },
      { id: 'ram6', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={2} cols={7} pal="teal" />, value: '14' },
      { id: 'ram7', prompt: 'Hány kis négyzet?', promptFigure: <CardRect rows={4} cols={4} pal="yellow" />, value: '16' },
      { id: 'ram8', prompt: '3 sor, soronként 6', value: '18' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Melyik szorzás?',
    description: 'Sorok száma · egy sorban. Párosítsd a képet a szorzással, a szöveget az eredménnyel!',
    pairs: [
      { id: 'ram9', prompt: 'Melyik szorzás?', promptFigure: <CardRect rows={3} cols={5} pal="blue" />, value: '3 · 5' },
      { id: 'ram10', prompt: 'Melyik szorzás?', promptFigure: <CardRect rows={4} cols={6} pal="orange" />, value: '4 · 6' },
      { id: 'ram11', prompt: 'Melyik szorzás?', promptFigure: <CardRect rows={2} cols={8} pal="purple" />, value: '2 · 8' },
      { id: 'ram12', prompt: 'Melyik szorzás?', promptFigure: <CardRect rows={5} cols={5} pal="green" />, value: '5 · 5' },
      { id: 'ram13', prompt: '6 sor, soronként 7', value: '42' },
      { id: 'ram14', prompt: '7 sor, soronként 8', value: '56' },
      { id: 'ram15', prompt: 'Négyzet: 9 sor, soronként 9', value: '81' },
      { id: 'ram16', prompt: 'Négyzet: 10 sor, soronként 10', value: '100' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Gondold hozzá!',
    description: 'Csak az első sor és az első oszlop látszik. Hány lap kell az egészhez?',
    pairs: [
      { id: 'ram17', prompt: 'Hány lap kell?', promptFigure: <CardRect rows={4} cols={7} pal="orange" partial />, value: '28' },
      { id: 'ram18', prompt: 'Hány lap kell?', promptFigure: <CardRect rows={5} cols={8} pal="blue" partial />, value: '40' },
      { id: 'ram19', prompt: 'Hány lap kell?', promptFigure: <CardRect rows={6} cols={6} pal="purple" partial />, value: '36' },
      { id: 'ram20', prompt: 'Hány lap kell?', promptFigure: <CardRect rows={3} cols={9} pal="green" partial />, value: '27' },
      { id: 'ram21', prompt: 'Négyzet, egy sorban 8', value: '64' },
      { id: 'ram22', prompt: '24 négyzet 3 sorban. Egy sorban?', value: '8' },
      { id: 'ram23', prompt: '35 négyzet 5 sorban. Egy sorban?', value: '7' },
      { id: 'ram24', prompt: 'Terasz: 4 sor, soronként 6. Hány 2 · 2-es nagy lap kell?', value: '6' }
    ]
  }
};

export const RectAreaG3Matcher: React.FC<RectAreaG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-teglalap-terulet-matcher',
  topicTitle = '8. A téglalap és a négyzet területe – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-teglalap-es-a-negyzet-terulete"
      title={topicTitle}
      subtitle="Párosítsd a téglalapokat a területükkel!"
      levels={RECT_AREA_G3_MATCHER_LEVELS}
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

export default RectAreaG3Matcher;
