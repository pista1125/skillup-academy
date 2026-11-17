import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniTags, MiniBar, MiniCompare } from './AddWordProblemsG3CardFigures';

interface AddWordProblemsG3MatcherProps {
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

const ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összesen',
    description: 'Mennyi összesen? Számolj írásban, és párosíts!',
    pairs: [
      { id: 'awpm1_0', left: '', promptFigure: <MiniTags a={236} b={158} />, right: '394' },
      { id: 'awpm1_1', left: '', promptFigure: <MiniTags a={345} b={128} />, right: '473' },
      { id: 'awpm1_2', left: '', promptFigure: <MiniBar parts={[163, 225]} />, right: '388' },
      { id: 'awpm1_3', left: '', promptFigure: <MiniBar parts={[267, 358]} />, right: '625' },
      { id: 'awpm1_4', left: '128 alma és 216 körte', right: '344' },
      { id: 'awpm1_5', left: 'Hétfőn 405, kedden 290 néző', right: '695' },
      { id: 'awpm1_6', left: 'Egy 512 Ft-os és egy 179 Ft-os könyv', right: '691 Ft' },
      { id: 'awpm1_7', left: 'Egy 350 cm-es és egy 265 cm-es szalag', right: '615 cm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Több vagy kevesebb, mint?',
    description: 'Az alsó csík a több. Mennyi a „?”? Párosíts!',
    pairs: [
      { id: 'awpm2_0', left: '', promptFigure: <MiniCompare a={156} d={120} />, right: '276' },
      { id: 'awpm2_1', left: '', promptFigure: <MiniCompare a={175} d={148} />, right: '323' },
      { id: 'awpm2_2', left: '', promptFigure: <MiniCompare a={389} d={427} />, right: '816' },
      { id: 'awpm2_3', left: '', promptFigure: <MiniCompare a={214} d={57} />, right: '271' },
      { id: 'awpm2_4', left: 'A labda 245 Ft. A kosár 128 Ft-tal drágább. A kosár?', right: '373 Ft' },
      { id: 'awpm2_5', left: 'A fiúk 186-an vannak, ez 75-tel kevesebb, mint a lányok. A lányok?', right: '261' },
      { id: 'awpm2_6', left: 'A kis doboz 340 g, ez 95 g-mal könnyebb, mint a nagy. A nagy?', right: '435 g' },
      { id: 'awpm2_7', left: 'Szombaton 409 néző volt, vasárnap 186-tal több. Vasárnap?', right: '595' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Három adat, két lépés',
    description: 'Add össze a részeket! Kétlépéses feladatnál előbb a hiányzó adatot számold ki!',
    pairs: [
      { id: 'awpm3_0', left: '', promptFigure: <MiniBar parts={[126, 164, 210]} />, right: '500' },
      { id: 'awpm3_1', left: '', promptFigure: <MiniBar parts={[145, 208, 96]} />, right: '449' },
      { id: 'awpm3_2', left: '', promptFigure: <MiniBar parts={[274, 198, 156]} />, right: '628' },
      { id: 'awpm3_3', left: '', promptFigure: <MiniBar parts={[48, 75, 75]} />, right: '198' },
      { id: 'awpm3_4', left: 'Délelőtt 128, délután 165-tel több. Egész nap?', right: '421' },
      { id: 'awpm3_5', left: '214 fiú, a lányok 57-tel többen. Összesen?', right: '485' },
      { id: 'awpm3_6', left: 'Hétfőn 348 kg, kedden 75 kg-mal több. A két napon?', right: '771 kg' },
      { id: 'awpm3_7', left: 'Tavasszal 236 fa, ősszel 47-tel több. Egész évben?', right: '519' }
    ]
  }
];

export const ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS_LIST[0],
  2: ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS_LIST[1],
  3: ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS_LIST[2]
};

export const AddWordProblemsG3Matcher: React.FC<AddWordProblemsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wadd-szoveges-matcher',
  topicTitle = '5. Szöveges feladatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Párosítsd a feladatokat az eredményükkel!"
      levels={ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS}
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

export default AddWordProblemsG3Matcher;
