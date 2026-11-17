import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChangeCard, ThermoCard, changeWindow } from './NegChangesG3CardFigures';

interface NegChangesG3MatcherProps {
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

/** változás a fekvő skálán (üres karika → teli karika) */
const ch = (from: number, to: number) => {
  const [lo, hi] = changeWindow(from, to);
  return <ChangeCard from={from} to={to} min={lo} max={hi} />;
};
/** hőmérő 10 fokos ablakkal */
const th = (v: number) => {
  const lo = Math.floor((v - 1) / 5) * 5;
  return <ThermoCard value={v} min={lo} max={lo + 10} />;
};

const NEG_CHANGES_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melegedett vagy hűlt?',
    description: 'Üres karika: előtte. Teli karika: utána. Hány fokkal változott?',
    pairs: [
      { id: 'chm1', left: '', promptFigure: ch(1, 6), right: 'melegedett 5 fokkal' },
      { id: 'chm2', left: '', promptFigure: ch(8, 5), right: 'hűlt 3 fokkal' },
      { id: 'chm3', left: '', promptFigure: ch(-2, -6), right: 'hűlt 4 fokkal' },
      { id: 'chm4', left: '', promptFigure: ch(-7, -5), right: 'melegedett 2 fokkal' },
      { id: 'chm5', left: '', promptFigure: ch(3, 9), right: 'melegedett 6 fokkal' },
      { id: 'chm6', left: '10 °C → 3 °C', right: 'hűlt 7 fokkal' },
      { id: 'chm7', left: '–9 °C → –1 °C', right: 'melegedett 8 fokkal' },
      { id: 'chm8', left: '–3 °C → –4 °C', right: 'hűlt 1 fokkal' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átlépés a 0-n',
    description: 'Számolj két részben: a 0-ig, aztán tovább!',
    pairs: [
      { id: 'chm9', left: '', promptFigure: ch(-3, 4), right: 'melegedett 7 fokkal' },
      { id: 'chm10', left: '', promptFigure: ch(2, -5), right: 'hűlt 7 fokkal' },
      { id: 'chm11', left: '', promptFigure: ch(-6, 3), right: 'melegedett 9 fokkal' },
      { id: 'chm12', left: '', promptFigure: ch(5, -1), right: 'hűlt 6 fokkal' },
      { id: 'chm13', left: '', promptFigure: ch(-8, 2), right: 'melegedett 10 fokkal' },
      { id: 'chm14', left: '4 °C → –4 °C', right: 'hűlt 8 fokkal' },
      { id: 'chm15', left: '–2 °C → 3 °C', right: 'melegedett 5 fokkal' },
      { id: 'chm16', left: '6 °C → –5 °C', right: 'hűlt 11 fokkal' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi lett?',
    description: 'Mit mutat a hőmérő a változás után?',
    pairs: [
      { id: 'chm17', left: '–2 °C volt, melegedett 6 fokkal', right: '', valueFigure: th(4) },
      { id: 'chm18', left: '3 °C volt, hűlt 5 fokkal', right: '', valueFigure: th(-2) },
      { id: 'chm19', left: '–6 °C volt, melegedett 3 fokkal', right: '', valueFigure: th(-3) },
      { id: 'chm20', left: '1 °C volt, hűlt 8 fokkal', right: '', valueFigure: th(-7) },
      { id: 'chm21', left: '–4 °C volt, hűlt 5 fokkal', right: '–9 °C' },
      { id: 'chm22', left: '–8 °C volt, melegedett 8 fokkal', right: '0 °C' },
      { id: 'chm23', left: '6 °C volt, hűlt 7 fokkal', right: '–1 °C' },
      { id: 'chm24', left: '–5 °C volt, melegedett 11 fokkal', right: '6 °C' }
    ]
  }
];

export const NEG_CHANGES_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_CHANGES_G3_MATCHER_LEVELS_LIST[0],
  2: NEG_CHANGES_G3_MATCHER_LEVELS_LIST[1],
  3: NEG_CHANGES_G3_MATCHER_LEVELS_LIST[2]
};

export const NegChangesG3Matcher: React.FC<NegChangesG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-neg-valtozasok-matcher',
  topicTitle = '3. Összehasonlítás és változások – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="osszehasonlitas-es-valtozasok"
      title={topicTitle}
      subtitle="Hogyan változott a hőmérséklet? Párosítsd!"
      levels={NEG_CHANGES_G3_MATCHER_LEVELS}
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

export default NegChangesG3Matcher;
