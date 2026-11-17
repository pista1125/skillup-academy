import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChangeCard, TableCard, PriceCard } from './MulRelationsG3CardFigures';

interface MulRelationsG3MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hogyan változik a szorzat?',
    description: 'Az ismert szorzatból következtess! Párosítsd az új szorzattal!',
    pairs: [
      { id: 'mrm1', left: '', promptFigure: <ChangeCard top="3 · 20 = 60" bottom="6 · 20 =" op="· 2" />, right: '120' },
      { id: 'mrm2', left: '', promptFigure: <ChangeCard top="4 · 30 = 120" bottom="8 · 30 =" op="· 2" />, right: '240' },
      { id: 'mrm3', left: '', promptFigure: <ChangeCard top="5 · 7 = 35" bottom="5 · 70 =" op="· 10" />, right: '350' },
      { id: 'mrm4', left: '4 · 90 (ha 2 · 90 = 180)', right: '360' },
      { id: 'mrm5', left: '', promptFigure: <ChangeCard top="6 · 8 = 48" bottom="6 · 80 =" op="· 10" />, right: '480' },
      { id: 'mrm6', left: '', promptFigure: <ChangeCard top="2 · 50 = 100" bottom="6 · 50 =" op="· 3" />, right: '300' },
      { id: 'mrm7', left: '7 · 40 (ha 7 · 4 = 28)', right: '280' },
      { id: 'mrm8', left: '9 · 20 (ha 9 · 2 = 18)', right: '180' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Táblázat és egyenlő szorzatok',
    description: 'Töltsd ki a táblázatot! Keresd meg az egyenlő szorzatokat!',
    pairs: [
      { id: 'mrm9', left: '', promptFigure: <TableCard row={40} c1={3} c2={6} v1={120} />, right: '240' },
      { id: 'mrm10', left: '120 · 4', right: '240 · 2' },
      { id: 'mrm11', left: '', promptFigure: <TableCard row={70} c1={2} c2={4} v1={140} />, right: '280' },
      { id: 'mrm12', left: '150 · 6', right: '300 · 3' },
      { id: 'mrm13', left: '', promptFigure: <TableCard row={25} c1={4} c2={8} v1={100} />, right: '200' },
      { id: 'mrm14', left: '105 · 8', right: '210 · 4' },
      { id: 'mrm15', left: '', promptFigure: <TableCard row={90} c1={3} c2={9} v1={270} />, right: '810' },
      { id: 'mrm16', left: '70 · 6', right: '140 · 3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Következtess!',
    description: 'Hányszor annyit veszel? Annyiszor annyit fizetsz.',
    pairs: [
      { id: 'mrm17', left: '', promptFigure: <PriceCard n1={2} p1={180} n2={6} />, right: '540 Ft' },
      { id: 'mrm18', left: '', promptFigure: <PriceCard n1={3} p1={210} n2={9} />, right: '630 Ft' },
      { id: 'mrm19', left: '', promptFigure: <PriceCard n1={4} p1={120} n2={8} />, right: '240 Ft' },
      { id: 'mrm20', left: '', promptFigure: <PriceCard n1={5} p1={150} n2={10} />, right: '300 Ft' },
      { id: 'mrm21', left: '', promptFigure: <PriceCard n1={2} p1={230} n2={4} />, right: '460 Ft' },
      { id: 'mrm22', left: 'Egy szám 2-szerese 140. Mennyi a 6-szorosa?', right: '420' },
      { id: 'mrm23', left: 'Egy szám 3-szorosa 300. Mennyi a 9-szerese?', right: '900' },
      { id: 'mrm24', left: '4 · □ = 200. Mennyi 8 · □?', right: '400' }
    ]
  }
];

export const MUL_RELATIONS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const MulRelationsG3Matcher: React.FC<MulRelationsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wmul-osszefuggesek-matcher',
  topicTitle = '4. Összefüggések, következtetések – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="osszefuggesek-kovetkeztetesek"
      title={topicTitle}
      subtitle="Következtess, és párosítsd!"
      levels={MUL_RELATIONS_G3_MATCHER_LEVELS}
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

export default MulRelationsG3Matcher;
