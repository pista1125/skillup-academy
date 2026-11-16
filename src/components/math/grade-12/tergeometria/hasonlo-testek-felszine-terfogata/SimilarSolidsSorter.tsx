import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimilarSolidsSorterProps {
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

const SIMILAR_SOLIDS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: k, k² vagy k³?',
    description: 'Egy testet k-szorosára nagyítunk. Hányszorosára változik a mennyiség?',
    categories: [
      { id: 'k1', name: 'k-szorosára', color: 'sky' },
      { id: 'k2', name: 'k²-szeresére', color: 'emerald' },
      { id: 'k3', name: 'k³-szorosára', color: 'amber' }
    ],
    items: [
      { id: 'sims1', text: 'A kocka testátlója', categoryId: 'k1' },
      { id: 'sims2', text: 'A henger magassága', categoryId: 'k1' },
      { id: 'sims3', text: 'A gömb főkörének kerülete', categoryId: 'k1' },
      { id: 'sims4', text: 'A test felszíne', categoryId: 'k2' },
      { id: 'sims5', text: 'A henger alaplapjának területe', categoryId: 'k2' },
      { id: 'sims6', text: 'A bevonáshoz szükséges festék', categoryId: 'k2' },
      { id: 'sims7', text: 'A test térfogata', categoryId: 'k3' },
      { id: 'sims8', text: 'A tömör test tömege (azonos anyag)', categoryId: 'k3' },
      { id: 'sims9', text: 'A belé tölthető víz mennyisége', categoryId: 'k3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hasonlók-e?',
    description: 'Döntsd el, hogy a két test biztosan hasonló, biztosan nem hasonló, vagy nem dönthető el!',
    categories: [
      { id: 'yes', name: 'Biztosan hasonló', color: 'emerald' },
      { id: 'no', name: 'Biztosan nem hasonló', color: 'rose' },
      { id: 'maybe', name: 'Az adatokból nem dönthető el', color: 'amber' }
    ],
    items: [
      { id: 'sims10', text: 'Két kocka', categoryId: 'yes' },
      { id: 'sims11', text: 'Két gömb', categoryId: 'yes' },
      { id: 'sims12', text: 'Henger (r = 2, M = 3) és henger (r = 4, M = 6)', categoryId: 'yes' },
      { id: 'sims13', text: 'Henger (r = 2, M = 3) és henger (r = 4, M = 4)', categoryId: 'no' },
      { id: 'sims14', text: 'Téglatest (1 × 2 × 3) és téglatest (2 × 4 × 5)', categoryId: 'no' },
      { id: 'sims15', text: 'Egy kocka és egy nem kocka téglatest', categoryId: 'no' },
      { id: 'sims16', text: 'Két téglatest', categoryId: 'maybe' },
      { id: 'sims17', text: 'Két henger, amelyeknek egyenlő a magassága', categoryId: 'maybe' },
      { id: 'sims18', text: 'Két egyenlő felszínű téglatest', categoryId: 'maybe' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'sims19', text: 'Ha a térfogat 8-szoros, a felszín 4-szeres (hasonló testeknél)', categoryId: 'true' },
      { id: 'sims20', text: 'A felszínek aránya a térfogatarány 2/3-adik hatványa', categoryId: 'true' },
      { id: 'sims21', text: 'k < 1 esetén a térfogat jobban csökken, mint a felszín', categoryId: 'true' },
      { id: 'sims22', text: 'Kétszer akkora élű kockának kétszer akkora a térfogata', categoryId: 'false' },
      { id: 'sims23', text: 'A felszínarány mindig nagyobb a térfogataránynál', categoryId: 'false' },
      { id: 'sims24', text: 'Ha egy henger sugarát kétszerezzük, térfogata 8-szoros lesz', categoryId: 'false' },
      { id: 'sims25', text: 'A nagyított test felszíne nagyobb, mint a térfogata (mérőszámban)', categoryId: 'depends' },
      { id: 'sims26', text: 'Két test térfogatának aránya 8', categoryId: 'depends' },
      { id: 'sims27', text: 'A két hasonló test közül a nagyobbik felszíne több mint 10-szeres', categoryId: 'depends' }
    ]
  }
];

const SIMILAR_SOLIDS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SIMILAR_SOLIDS_SORTER_LEVELS_LIST[0],
  2: SIMILAR_SOLIDS_SORTER_LEVELS_LIST[1],
  3: SIMILAR_SOLIDS_SORTER_LEVELS_LIST[2]
};

export const SimilarSolidsSorter: React.FC<SimilarSolidsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-hasonlo-testek-sorter',
  topicTitle = '8. Hasonló testek felszíne, térfogata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="hasonlo-testek-felszine-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd az arányokat, a hasonló testpárokat és az állításokat!"
      levels={SIMILAR_SOLIDS_SORTER_LEVELS}
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

export default SimilarSolidsSorter;
