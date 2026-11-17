import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ThermoCard, MiniHouseCard, DiverCard, IconCard } from './NegEverydayG3CardFigures';

interface NegEverydayG3MatcherProps {
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

const NEG_EVERYDAY_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Olvasd le!',
    description: 'Hány fokot mutat a hőmérő? Hogyan írjuk le?',
    pairs: [
      { id: 'nem1', left: '', promptFigure: <ThermoCard value={-5} min={-10} max={0} />, right: '–5 °C' },
      { id: 'nem2', left: '', promptFigure: <ThermoCard value={5} min={0} max={10} />, right: '5 °C' },
      { id: 'nem3', left: '', promptFigure: <ThermoCard value={0} min={-5} max={5} />, right: '0 °C' },
      { id: 'nem4', left: '', promptFigure: <ThermoCard value={-10} min={-15} max={-5} />, right: '–10 °C' },
      { id: 'nem5', left: '', promptFigure: <ThermoCard value={10} min={5} max={15} />, right: '10 °C' },
      { id: 'nem6', left: 'mínusz három fok', right: '–3 °C' },
      { id: 'nem7', left: 'három fok', right: '3 °C' },
      { id: 'nem8', left: 'mínusz egy fok', right: '–1 °C' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számold a vonalakat!',
    description: 'Egy vonal 1 fok. Hol van a 0? Fölötte vagy alatta?',
    pairs: [
      { id: 'nem9', left: '', promptFigure: <ThermoCard value={-2} min={-5} max={5} />, right: '–2 °C' },
      { id: 'nem10', left: '', promptFigure: <ThermoCard value={-7} min={-10} max={0} />, right: '–7 °C' },
      { id: 'nem11', left: '', promptFigure: <ThermoCard value={4} min={-5} max={5} />, right: '4 °C' },
      { id: 'nem12', left: '', promptFigure: <ThermoCard value={-4} min={-5} max={5} />, right: '–4 °C' },
      { id: 'nem13', left: '', promptFigure: <ThermoCard value={8} min={0} max={10} />, right: '8 °C' },
      { id: 'nem14', left: '', promptFigure: <ThermoCard value={12} min={5} max={15} />, right: '12 °C' },
      { id: 'nem15', left: 'Melyik szint?', promptFigure: <MiniHouseCard hl={-1} />, right: '–1' },
      { id: 'nem16', left: 'Melyik szint?', promptFigure: <MiniHouseCard hl={-2} />, right: '–2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mi illik hozzá?',
    description: 'Melyik szám illik a helyzethez?',
    pairs: [
      { id: 'nem17', left: 'Ekkor fagy meg a víz.', promptFigure: <IconCard kind="ice" small={false} />, right: '0 °C' },
      { id: 'nem18', left: '3 fokkal hidegebb, mint a fagypont', right: '–3 °C' },
      { id: 'nem19', left: 'Hány méter mélyen úszik?', promptFigure: <DiverCard depth={2} />, right: '–2 m' },
      { id: 'nem20', left: 'mélygarázs: 2 szinttel a földszint alatt', right: '–2' },
      { id: 'nem21', left: 'Lázas vagy.', promptFigure: <IconCard kind="sick" small={false} />, right: '39 °C' },
      { id: 'nem22', left: 'a fagyasztó belseje', promptFigure: <IconCard kind="freezer" small={false} />, right: '–18 °C' },
      { id: 'nem23', left: 'a hűtőszekrény belseje', promptFigure: <IconCard kind="fridge" small={false} />, right: '5 °C' },
      { id: 'nem24', left: 'strandidő', promptFigure: <IconCard kind="beach" small={false} />, right: '28 °C' }
    ]
  }
];

export const NEG_EVERYDAY_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_EVERYDAY_G3_MATCHER_LEVELS_LIST[0],
  2: NEG_EVERYDAY_G3_MATCHER_LEVELS_LIST[1],
  3: NEG_EVERYDAY_G3_MATCHER_LEVELS_LIST[2]
};

export const NegEverydayG3Matcher: React.FC<NegEverydayG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-neg-mindennapok-matcher',
  topicTitle = '1. Negatív számok a mindennapokban – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="negativ-szamok-a-mindennapokban"
      title={topicTitle}
      subtitle="Párosítsd a hőmérőket, a szinteket és a helyzeteket a számokkal!"
      levels={NEG_EVERYDAY_G3_MATCHER_LEVELS}
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

export default NegEverydayG3Matcher;
