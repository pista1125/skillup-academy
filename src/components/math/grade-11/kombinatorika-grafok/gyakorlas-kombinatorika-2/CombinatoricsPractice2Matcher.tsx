import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsPractice2MatcherProps {
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

const COMBINATORICS_PRACTICE2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Ötletek az összeszámláláshoz',
    description: 'Párosítsd a helyzetet a hozzá illő összeszámlálási ötlettel!',
    pairs: [
      { id: 'cp2m1', left: 'Különálló, átfedés nélküli csoportok', right: 'A lehetőségek számát összeadjuk' },
      { id: 'cp2m2', left: 'Egymás utáni, mindig ugyanannyiféleképpen folytatható döntések', right: 'A lehetőségek számát összeszorozzuk' },
      { id: 'cp2m3', left: 'A kimaradó eseteket könnyebb megszámolni', right: '„Jó” = összes − „rossz”' },
      { id: 'cp2m4', left: 'Tárgyakhoz embereket vagy emberekhez tárgyakat?', right: 'Nézőpontváltás' },
      { id: 'cp2m5', left: 'Csak kevés eset fordul elő', right: 'Rendszerezett felsorolás' },
      { id: 'cp2m6', left: 'Nagyon sok elem szerepel', right: 'Oldd meg először kevesebb elemmel' },
      { id: 'cp2m7', left: 'Azonos elemek sorba rendezése', right: 'Osztás az azonos elemek sorrendjeinek számával' },
      { id: 'cp2m8', left: 'Csapatok párokba osztása (8 csapat)', right: '7 · 5 · 3 · 1' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Feladat és képlet',
    description: 'Párosítsd a feladatot a megoldó kifejezéssel!',
    pairs: [
      { id: 'cp2m9', left: '5 gyerek sorba áll', right: '5!' },
      { id: 'cp2m10', left: '3 fehér és 4 piros bábu sorba', right: '7! / (3! · 4!)' },
      { id: 'cp2m11', left: '7 karakteres kód a 0; 1 jegyekből', right: '2⁷' },
      { id: 'cp2m12', left: '8 fős döntő első 3 helyezettje', right: '8 · 7 · 6' },
      { id: 'cp2m13', left: '10 elemű halmaz 4 elemű részhalmazai', right: 'C(10; 4)' },
      { id: 'cp2m14', left: '7 csapat körmérkőzése', right: 'C(7; 2)' },
      { id: 'cp2m15', left: 'Kockával 3 dobás sorozata', right: '6³' },
      { id: 'cp2m16', left: '10 gyerekből titkár és jegyző', right: '10 · 9' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Érettségi és tankönyvi eredmények',
    description: 'Párosítsd a feladatot a helyes végeredménnyel!',
    pairs: [
      { id: 'cp2m17', left: 'Négysávos zászló, 6 szín, két-két sáv azonos színű', right: '90' },
      { id: 'cp2m18', left: 'Háromszínű kitűző 5 színből', right: '60' },
      { id: 'cp2m19', left: 'Egyszínű kitűző 5 színből', right: '5' },
      { id: 'cp2m20', left: 'Julcsi és Tercsi egymás melletti padban (12 pad)', right: '18 · 10!' },
      { id: 'cp2m21', left: '3 házaspár sorban, mindenki a párja mellett', right: '48' },
      { id: 'cp2m22', left: 'Juci és Piri egymás mellett vagy szemben (8 ülés)', right: '14 400' },
      { id: 'cp2m23', left: '8 csapat első fordulójának beosztása', right: '105' },
      { id: 'cp2m24', left: 'Háromjegyű számok, amelyekben van 9-es', right: '252' }
    ]
  }
];

const COMBINATORICS_PRACTICE2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COMBINATORICS_PRACTICE2_MATCHER_LEVELS_LIST[0],
  2: COMBINATORICS_PRACTICE2_MATCHER_LEVELS_LIST[1],
  3: COMBINATORICS_PRACTICE2_MATCHER_LEVELS_LIST[2]
};

export const CombinatoricsPractice2Matcher: React.FC<CombinatoricsPractice2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-gyakorlas-masodik-matcher',
  topicTitle = '7. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="gyakorlas-kombinatorika-2"
      title={topicTitle}
      subtitle="Párosítsd az összeszámlálási ötleteket, a modelleket és a tankönyvi feladatok eredményeit!"
      levels={COMBINATORICS_PRACTICE2_MATCHER_LEVELS}
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

export default CombinatoricsPractice2Matcher;
