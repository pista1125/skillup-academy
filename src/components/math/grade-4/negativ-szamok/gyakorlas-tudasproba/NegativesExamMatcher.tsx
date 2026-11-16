import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegativesExamMatcherProps {
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

const NEG_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Helyzetek és ellentettek',
    description: 'Párosítsd a helyzetet vagy a feladványt a számmal!',
    pairs: [
      { id: 'nx4m1', left: '6 fokkal fagypont alatt', right: '−6 °C' },
      { id: 'nx4m2', left: 'a tengerszint', right: '0 m' },
      { id: 'nx4m3', left: '50 m-rel a tengerszint alatt', right: '−50 m' },
      { id: 'nx4m4', left: 'a mélygarázs első szintje', right: '−1. szint' },
      { id: 'nx4m5', left: '200 Ft tartozás', right: '−200 Ft' },
      { id: 'nx4m6', left: 'a víz forráspontja', right: '100 °C' },
      { id: 'nx4m7', left: 'a 7 ellentettje', right: '−7' },
      { id: 'nx4m8', left: 'a −3 ellentettje', right: '3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számegyenes, hőmérő, pénztárca',
    description: 'Lépj, számolj, törlessz – és keresd meg az eredményt!',
    pairs: [
      { id: 'nx4m9', left: '3-ról balra 7', right: '−4' },
      { id: 'nx4m10', left: 'a −10-nél eggyel nagyobb', right: '−9' },
      { id: 'nx4m11', left: 'a −15 kisebb tízes számszomszédja', right: '−20' },
      { id: 'nx4m12', left: '−17 °C, 10 fokot emelkedett', right: '−7 °C' },
      { id: 'nx4m13', left: '−1 °C, 4 fokot csökkent', right: '−5 °C' },
      { id: 'nx4m14', left: '9 fabatka és 13 adósságcédula', right: '−4 fabatka' },
      { id: 'nx4m15', left: '7 fabatka és 2 adósságcédula', right: '5 fabatka' },
      { id: 'nx4m16', left: '500 Ft és 200 Ft adósság', right: '300 Ft' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a különbség?',
    description: 'Figyelj, átléped-e a 0-t!',
    pairs: [
      { id: 'nx4m17', left: '−4 °C → −19 °C', right: '15 fok' },
      { id: 'nx4m18', left: '−5 °C → 2 °C', right: '7 fok' },
      { id: 'nx4m19', left: '−11 °C → 3 °C', right: '14 fok' },
      { id: 'nx4m20', left: '−1 °C → −21 °C', right: '20 fok' },
      { id: 'nx4m21', left: '500 Ft → −1000 Ft', right: '1500 Ft' },
      { id: 'nx4m22', left: '−1500 Ft → 2000 Ft', right: '3500 Ft' },
      { id: 'nx4m23', left: 'zászló (400 m) és hal (−50 m)', right: '450 m' },
      { id: 'nx4m24', left: 'a −3 < □ < 15 egész megoldásai', right: '17 szám' }
    ]
  }
];

const NEG_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_EXAM_MATCHER_LEVELS_LIST[0],
  2: NEG_EXAM_MATCHER_LEVELS_LIST[1],
  3: NEG_EXAM_MATCHER_LEVELS_LIST[2]
};

export const NegativesExamMatcher: React.FC<NegativesExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-neg-tudasproba-matcher',
  topicTitle = '4. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Vegyes párosítás az egész fejezetből: helyzetek, számegyenes, változások, fabatkák."
      levels={NEG_EXAM_MATCHER_LEVELS}
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

export default NegativesExamMatcher;
