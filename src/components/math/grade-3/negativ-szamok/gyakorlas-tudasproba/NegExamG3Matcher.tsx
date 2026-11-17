import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChangeCard, ThermoCard, NLCard, DiverCard, MiniHouseCard, changeWindow } from './NegExamG3CardFigures';

interface NegExamG3MatcherProps {
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

/** hőmérő 10 fokos ablakkal (fekvő) */
const th = (v: number) => {
  const lo = Math.floor((v - 1) / 5) * 5;
  return <ThermoCard value={v} min={lo} max={lo + 10} />;
};
/** változás a fekvő skálán (üres karika → teli karika) */
const ch = (from: number, to: number) => {
  const [lo, hi] = changeWindow(from, to);
  return <ChangeCard from={from} to={to} min={lo} max={hi} />;
};

const NEG_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hőmérő és fagypont',
    description: 'Mit mutat a hőmérő? Hogyan írjuk le számmal?',
    pairs: [
      { id: 'exm1', left: '', promptFigure: th(-3), right: '–3 °C' },
      { id: 'exm2', left: '', promptFigure: th(6), right: '6 °C' },
      { id: 'exm3', left: '', promptFigure: th(-8), right: '–8 °C' },
      { id: 'exm4', left: '', promptFigure: th(-1), right: '–1 °C' },
      { id: 'exm5', left: '', promptFigure: th(2), right: '2 °C' },
      { id: 'exm6', left: 'fagypont', right: '0 °C' },
      { id: 'exm7', left: 'mínusz öt celziusz-fok', right: '–5 °C' },
      { id: 'exm8', left: 'mínusz tizenkét celziusz-fok', right: '–12 °C' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számegyenes, lift, búvár',
    description: 'Melyik szám ez? Számold a lépéseket a 0-tól!',
    pairs: [
      { id: 'exm9', left: '', promptFigure: <NLCard v={-4} from={-5} to={5} labels={[0]} />, right: '–4' },
      { id: 'exm10', left: '', promptFigure: <NLCard v={3} from={-5} to={5} labels={[0]} />, right: '3' },
      { id: 'exm11', left: '', promptFigure: <NLCard v={-7} from={-10} to={5} labels={5} />, right: '–7' },
      { id: 'exm12', left: '', promptFigure: <DiverCard depth={2} />, right: '–2 m' },
      { id: 'exm13', left: '', promptFigure: <MiniHouseCard hl={-1} />, right: '–1' },
      { id: 'exm14', left: 'a –5 bal szomszédja', right: '–6' },
      { id: 'exm15', left: 'ugyanolyan messze a 0-tól, mint a 8, de balra', right: '–8' },
      { id: 'exm16', left: 'a 0-tól 9 lépés balra', right: '–9' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Változások',
    description: 'Melegedett vagy hűlt? Mennyi lett?',
    pairs: [
      { id: 'exm17', left: '', promptFigure: ch(-4, 2), right: 'melegedett 6 fokkal' },
      { id: 'exm18', left: '', promptFigure: ch(3, -5), right: 'hűlt 8 fokkal' },
      { id: 'exm19', left: '', promptFigure: ch(-9, -6), right: 'melegedett 3 fokkal' },
      { id: 'exm20', left: '', promptFigure: ch(1, -3), right: 'hűlt 4 fokkal' },
      { id: 'exm21', left: '–6 °C volt, melegedett 8 fokkal', right: '2 °C' },
      { id: 'exm22', left: '4 °C volt, hűlt 9 fokkal', right: '–5 °C' },
      { id: 'exm23', left: 'a –3 °C-nál 4 fokkal hidegebb', right: '–7 °C' },
      { id: 'exm24', left: 'reggel –1 °C, délben 6 °C', right: 'melegedett 7 fokkal' }
    ]
  }
];

export const NEG_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: NEG_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: NEG_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const NegExamG3Matcher: React.FC<NegExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-neg-tudasproba-matcher',
  topicTitle = '4. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Hőmérő, számegyenes, változás: párosítsd!"
      levels={NEG_EXAM_G3_MATCHER_LEVELS}
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

export default NegExamG3Matcher;
