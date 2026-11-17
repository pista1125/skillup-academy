import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { NLCard, ThermoCard } from './NegNumberLineG3CardFigures';

interface NegNumberLineG3MatcherProps {
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

/** Pont a –5…5 számegyenesen, csak a 0 van kiírva. */
const n1 = (v: number) => <NLCard v={v} from={-5} to={5} labels={[0]} />;
/** Pont a –10…5 számegyenesen, 5-önként kiírva. */
const n5 = (v: number) => <NLCard v={v} from={-10} to={5} labels={5} />;
/** Pont a –10…5 számegyenesen, csak a –5 és a 0 kiírva. */
const n3 = (v: number) => <NLCard v={v} from={-10} to={5} labels={[-5, 0]} />;
const th = (v: number) => {
  const lo = Math.floor((v - 3) / 5) * 5;
  return <ThermoCard value={v} min={lo} max={lo + 10} small />;
};

const NEG_NUMBERLINE_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Lépj a 0-tól!',
    description: 'Hány lépésre van a pont a 0-tól? Balra vagy jobbra?',
    pairs: [
      { id: 'nlm1', left: '', promptFigure: n1(-4), right: '–4' },
      { id: 'nlm2', left: '', promptFigure: n1(-2), right: '–2' },
      { id: 'nlm3', left: '', promptFigure: n1(-3), right: '–3' },
      { id: 'nlm4', left: '', promptFigure: n1(2), right: '2' },
      { id: 'nlm5', left: '', promptFigure: n1(3), right: '3' },
      { id: 'nlm6', left: '', promptFigure: n1(-5), right: '–5' },
      { id: 'nlm7', left: 'a 0 bal szomszédja', right: '–1' },
      { id: 'nlm8', left: 'a 0 jobb szomszédja', right: '1' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Nincs minden szám kiírva',
    description: 'Keresd meg a legközelebbi kiírt számot, és onnan számolj!',
    pairs: [
      { id: 'nlm9', left: '', promptFigure: n5(-7), right: '–7' },
      { id: 'nlm10', left: '', promptFigure: n5(-3), right: '–3' },
      { id: 'nlm11', left: '', promptFigure: n5(-8), right: '–8' },
      { id: 'nlm12', left: '', promptFigure: n5(-2), right: '–2' },
      { id: 'nlm13', left: '', promptFigure: n5(4), right: '4' },
      { id: 'nlm14', left: '', promptFigure: n5(-9), right: '–9' },
      { id: 'nlm15', left: 'a –5 és a –3 között', right: '–4' },
      { id: 'nlm16', left: '6 lépés balra a 0-tól', right: '–6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hőmérő és számegyenes',
    description: 'A hőmérő álló számegyenes. Melyik pont mutatja ugyanazt?',
    pairs: [
      { id: 'nlm17', left: '', promptFigure: th(-6), right: '', valueFigure: n3(-6) },
      { id: 'nlm18', left: '', promptFigure: th(-3), right: '', valueFigure: n3(-3) },
      { id: 'nlm19', left: '', promptFigure: th(2), right: '', valueFigure: n3(2) },
      { id: 'nlm20', left: '', promptFigure: th(-9), right: '', valueFigure: n3(-9) },
      { id: 'nlm21', left: 'a –6 és a –4 között', right: '–5' },
      { id: 'nlm22', left: '7 lépés balra a 0-tól', right: '–7' },
      { id: 'nlm23', left: 'a –1 bal szomszédja', right: '–2' },
      { id: 'nlm24', left: 'ugyanolyan messze a 0-tól, mint a 4, de a másik oldalon', right: '–4' }
    ]
  }
];

export const NEG_NUMBERLINE_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_NUMBERLINE_G3_MATCHER_LEVELS_LIST[0],
  2: NEG_NUMBERLINE_G3_MATCHER_LEVELS_LIST[1],
  3: NEG_NUMBERLINE_G3_MATCHER_LEVELS_LIST[2]
};

export const NegNumberLineG3Matcher: React.FC<NegNumberLineG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-neg-szamegyenes-matcher',
  topicTitle = '2. A számegyenes és a nulla – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="szamegyenes-es-a-nulla"
      title={topicTitle}
      subtitle="Melyik számot jelöli a pont? Párosítsd!"
      levels={NEG_NUMBERLINE_G3_MATCHER_LEVELS}
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

export default NegNumberLineG3Matcher;
