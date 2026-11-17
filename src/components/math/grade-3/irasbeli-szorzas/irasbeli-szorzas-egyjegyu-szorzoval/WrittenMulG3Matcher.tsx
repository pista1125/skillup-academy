import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MulColCard, PriceCard } from './WrittenMulG3CardFigures';

interface WrittenMulG3MatcherProps {
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
    title: '1. szint: Szorozz írásban!',
    description: 'Kezdd az egyeseknél! Párosítsd a szorzást a szorzattal!',
    pairs: [
      { id: 'wmm1', left: '', promptFigure: <MulColCard a={213} m={3} />, right: '639' },
      { id: 'wmm2', left: '', promptFigure: <MulColCard a={142} m={2} />, right: '284' },
      { id: 'wmm3', left: '321 · 3', right: '963' },
      { id: 'wmm4', left: '', promptFigure: <MulColCard a={114} m={5} />, right: '570' },
      { id: 'wmm5', left: '', promptFigure: <MulColCard a={216} m={4} />, right: '864' },
      { id: 'wmm6', left: '402 · 2', right: '804' },
      { id: 'wmm7', left: '131 · 3', right: '393' },
      { id: 'wmm8', left: '', promptFigure: <MulColCard a={225} m={3} />, right: '675' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kétszer is marad valami',
    description: 'Ne felejtsd el hozzáadni, ami maradt!',
    pairs: [
      { id: 'wmm9', left: '', promptFigure: <MulColCard a={168} m={4} />, right: '672' },
      { id: 'wmm10', left: '', promptFigure: <MulColCard a={257} m={3} />, right: '771' },
      { id: 'wmm11', left: '', promptFigure: <MulColCard a={309} m={3} />, right: '927' },
      { id: 'wmm12', left: '', promptFigure: <MulColCard a={145} m={6} />, right: '870' },
      { id: 'wmm13', left: '89 · 7', right: '623' },
      { id: 'wmm14', left: '126 · 7', right: '882' },
      { id: 'wmm15', left: '194 · 5', right: '970' },
      { id: 'wmm16', left: '', promptFigure: <MulColCard a={238} m={4} />, right: '952' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok, vásárlás',
    description: 'Keresd meg a hiányzó számot, vagy számold ki az árat!',
    pairs: [
      { id: 'wmm17', left: 'Melyik szorzó?', promptFigure: <MulColCard a={143} m="?" result={715} />, right: '5' },
      { id: 'wmm18', left: 'Melyik jegy hiányzik?', promptFigure: <MulColCard a="2?4" m={3} result={822} />, right: '7' },
      { id: 'wmm19', left: 'Mi van a ? helyén?', promptFigure: <MulColCard a="1?2" m={4} result={728} />, right: '8' },
      { id: 'wmm20', left: '', promptFigure: <PriceCard n={3} price={186} />, right: '558 Ft' },
      { id: 'wmm21', left: '', promptFigure: <PriceCard n={4} price={235} />, right: '940 Ft' },
      { id: 'wmm22', left: 'A szorzandó 128, a szorzó 7. Mennyi a szorzat?', right: '896' },
      { id: 'wmm23', left: 'A szorzó 4, a szorzat 932. Mennyi a szorzandó?', right: '233' },
      { id: 'wmm24', left: '□ · 3 = 492', right: '164' }
    ]
  }
];

export const WRITTEN_MUL_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const WrittenMulG3Matcher: React.FC<WrittenMulG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wmul-irasbeli-matcher',
  topicTitle = '3. Írásbeli szorzás egyjegyű szorzóval – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="irasbeli-szorzas-egyjegyu-szorzoval"
      title={topicTitle}
      subtitle="Szorozz írásban, és párosítsd!"
      levels={WRITTEN_MUL_G3_MATCHER_LEVELS}
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

export default WrittenMulG3Matcher;
