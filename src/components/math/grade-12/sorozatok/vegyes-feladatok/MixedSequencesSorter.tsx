import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MixedSequencesSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const MIXED_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Számtani, mértani vagy egyik sem?',
    description: 'Csoportosítsd a sorozatokat!',
    categories: [
      { id: 'ar', name: 'számtani sorozat', color: 'blue' },
      { id: 'ge', name: 'mértani sorozat', color: 'rose' },
      { id: 'no', name: 'egyik sem', color: 'slate' }
    ],
    items: [
      { id: 'mxs1', text: '5; 8; 11; 14; …', categoryId: 'ar' },
      { id: 'mxs2', text: '20; 17; 14; 11; …', categoryId: 'ar' },
      { id: 'mxs3', text: '0,5; 1; 1,5; 2; …', categoryId: 'ar' },
      { id: 'mxs4', text: '2; 6; 18; 54; …', categoryId: 'ge' },
      { id: 'mxs5', text: '16; −8; 4; −2; …', categoryId: 'ge' },
      { id: 'mxs6', text: '1; 0,1; 0,01; 0,001; …', categoryId: 'ge' },
      { id: 'mxs7', text: '1; 4; 9; 16; …', categoryId: 'no' },
      { id: 'mxs8', text: '1; 1; 2; 3; 5; …', categoryId: 'no' },
      { id: 'mxs9', text: '1; 2; 4; 7; 11; …', categoryId: 'no' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Milyen egyenletre vezet?',
    description: 'Döntsd el, milyen egyenletet (egyenlőtlenséget) kell megoldani!',
    categories: [
      { id: 'lin', name: 'elsőfokú', color: 'emerald' },
      { id: 'quad', name: 'másodfokú', color: 'purple' },
      { id: 'exp', name: 'exponenciális (logaritmus)', color: 'amber' }
    ],
    items: [
      { id: 'mxs10', text: 'a₁ = 5, d = 2: hányadik tag a 23?', categoryId: 'lin' },
      { id: 'mxs11', text: '4; x; 10 számtani sorozat: x = ?', categoryId: 'lin' },
      { id: 'mxs12', text: 'háromszög szögei számtani sorozatban: középső szög?', categoryId: 'lin' },
      { id: 'mxs13', text: 'a₁ = 5, d = 2, Sₙ = 357: n = ?', categoryId: 'quad' },
      { id: 'mxs14', text: 'Angéla: 8, 10, … lap, összesen 858: hány sor?', categoryId: 'quad' },
      { id: 'mxs15', text: 'faiskola: 40, 44, … csemete, összesen 1020: hány sor?', categoryId: 'quad' },
      { id: 'mxs16', text: 'a₁ = 16, q = 1,07: hány tag kisebb 1000-nél?', categoryId: 'exp' },
      { id: 'mxs17', text: 'sál: 8 cm, naponta +20%: hány nap alatt 2 m?', categoryId: 'exp' },
      { id: 'mxs18', text: 'a₁ = 10, q = 1,2: mikor lesz Sₙ > 1000?', categoryId: 'exp' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 't', name: 'mindig igaz', color: 'emerald' },
      { id: 'f', name: 'hamis', color: 'rose' },
      { id: 'd', name: 'a sorozattól függ', color: 'amber' }
    ],
    items: [
      { id: 'mxs19', text: 'Egy nem nulla állandó sorozat számtani és mértani is.', categoryId: 't' },
      { id: 'mxs20', text: 'Mértani sorozat egyik tagja sem lehet 0.', categoryId: 't' },
      { id: 'mxs21', text: 'Számtani sorozatban aₙ = (aₙ₋₁ + aₙ₊₁)/2.', categoryId: 't' },
      { id: 'mxs22', text: 'Az 1 + 1/2 + 1/4 + … összeg elérheti a 2-t.', categoryId: 'f' },
      { id: 'mxs23', text: 'A négyzetszámok sorozata számtani sorozat.', categoryId: 'f' },
      { id: 'mxs24', text: 'Ha a₅ = 4 és a₉ = 324 egy mértani sorozatban, a₇ lehet −36.', categoryId: 'f' },
      { id: 'mxs25', text: 'A mértani sorozat növekvő.', categoryId: 'd' },
      { id: 'mxs26', text: 'A számtani sorozat minden tagja pozitív.', categoryId: 'd' },
      { id: 'mxs27', text: 'A mértani sorozat első 6 tagjának összege negatív.', categoryId: 'd' }
    ]
  }
};

export const MixedSequencesSorter: React.FC<MixedSequencesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-vegyes-sorter',
  topicTitle = '7. Vegyes feladatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="vegyes-feladatok"
      title={topicTitle}
      subtitle="Rendszerezd a sorozatokat típus, a megoldáshoz szükséges egyenlet és az állítások igazsága szerint!"
      levels={MIXED_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default MixedSequencesSorter;
