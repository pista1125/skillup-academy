import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrustumSorterProps {
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

const SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Csonkagúla, csonkakúp vagy egyik sem?',
    description: 'Csoportosítsd a jellemzőket!',
    categories: [
      { id: 'pyr', name: 'Csonkagúla', color: 'teal' },
      { id: 'cone', name: 'Csonkakúp', color: 'purple' },
      { id: 'none', name: 'Egyik sem', color: 'rose' }
    ],
    items: [
      { id: 'frus1', text: 'palástja trapézokból áll', categoryId: 'pyr' },
      { id: 'frus2', text: 'van oldaléle', categoryId: 'pyr' },
      { id: 'frus3', text: 'alaplapja és fedőlapja hasonló sokszög', categoryId: 'pyr' },
      { id: 'frus4', text: 'tengelymetszete szimmetrikus trapéz', categoryId: 'cone' },
      { id: 'frus5', text: 'derékszögű trapéz forgatásával is kapható', categoryId: 'cone' },
      { id: 'frus6', text: 'alaplapja és fedőlapja kör', categoryId: 'cone' },
      { id: 'frus7', text: 'egyetlen csúcsa van, amelyben minden oldalél találkozik', categoryId: 'none' },
      { id: 'frus8', text: 'alaplapja és fedőlapja egybevágó, oldallapjai téglalapok', categoryId: 'none' },
      { id: 'frus9', text: 'egyenlő szárú háromszög forgatásával kapjuk', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a hasonlóság aránya (λ)?',
    description: 'A teljes test és a kiegészítő test hasonlóságának arányát számold ki!',
    categories: [
      { id: 'q', name: 'λ = 1/4', color: 'blue' },
      { id: 'h', name: 'λ = 1/2', color: 'emerald' },
      { id: 't', name: 'λ = 2/3', color: 'amber' }
    ],
    items: [
      { id: 'frus10', text: 'M = 8, a csúcstól 2-re vágva', categoryId: 'q' },
      { id: 'frus11', text: 'alapél 8, fedőél 2', categoryId: 'q' },
      { id: 'frus12', text: 'alaplap 64 cm², fedőlap 4 cm²', categoryId: 'q' },
      { id: 'frus13', text: 'R = 6, r = 3', categoryId: 'h' },
      { id: 'frus14', text: 'a magasság felénél vágva', categoryId: 'h' },
      { id: 'frus15', text: 'alaplap 36 cm², fedőlap 9 cm²', categoryId: 'h' },
      { id: 'frus16', text: 'kúp M = 12, az alaptól 4-re vágva', categoryId: 't' },
      { id: 'frus17', text: 'R = 9, r = 6', categoryId: 't' },
      { id: 'frus18', text: 'a magasság harmadánál (az alaptól mérve) vágva', categoryId: 't' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'dep', name: 'Az adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'frus19', text: 'A csonkagúla oldaléleinek egyenesei egy pontban metszik egymást.', categoryId: 'true' },
      { id: 'frus20', text: 'A kiegészítő gúla hasonló az eredeti gúlához.', categoryId: 'true' },
      { id: 'frus21', text: 'A csonkakúp alkotója hosszabb a magasságánál.', categoryId: 'true' },
      { id: 'frus22', text: 'A csonkagúla alaplapja és fedőlapja egybevágó.', categoryId: 'false' },
      { id: 'frus23', text: 'A csonkagúla oldallapjai paralelogrammák.', categoryId: 'false' },
      { id: 'frus24', text: 'A csonkakúp tengelymetszete téglalap.', categoryId: 'false' },
      { id: 'frus25', text: 'A csonkagúla oldallapjai egybevágók.', categoryId: 'dep' },
      { id: 'frus26', text: 'A csonkakúp fedőköre kisebb, mint az alapköre fele.', categoryId: 'dep' },
      { id: 'frus27', text: 'A csonka test magasabb, mint a kiegészítő test.', categoryId: 'dep' }
    ]
  }
];

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SORTER_LEVELS_LIST[0],
  2: SORTER_LEVELS_LIST[1],
  3: SORTER_LEVELS_LIST[2]
};

export const FrustumSorter: React.FC<FrustumSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-csonka-testek-sorter',
  topicTitle = '14. A csonkagúla és a csonkakúp – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-csonkagula-es-a-csonkakup"
      title={topicTitle}
      subtitle="Rendszerezd a testeket, a hasonlósági számításokat és a csonka testekről szóló állításokat!"
      levels={SORTER_LEVELS}
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

export default FrustumSorter;
