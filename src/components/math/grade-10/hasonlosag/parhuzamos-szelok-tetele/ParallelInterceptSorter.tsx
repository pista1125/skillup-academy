import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ParallelInterceptSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const PARALLEL_INTERCEPT_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Szakaszaránypárok a szögszárakon',
    description: 'Csoportosítsd az aránypárokat aszerint, hogy melyik tételnek felelnek meg!',
    categories: [
      { id: 'intercept_thm', name: 'Párhuzamos szelők tétele (Szárak)', color: 'emerald' },
      { id: 'chords_thm', name: 'Szelőszakaszok tétele (Párhuzamosok)', color: 'blue' },
      { id: 'invalid_ratio', name: 'Nem érvényes / hibás arány', color: 'rose' }
    ],
    items: [
      { id: 'i1', text: 'OA₁ / OA₂ = OB₁ / OB₂', categoryId: 'intercept_thm' },
      { id: 'i2', text: 'A₁A₂ / A₂A₃ = B₁B₂ / B₂B₃', categoryId: 'intercept_thm' },
      { id: 'i3', text: 'OA₁ / A₁A₂ = OB₁ / B₁B₂', categoryId: 'intercept_thm' },
      { id: 'i4', text: 'A₁B₁ / A₂B₂ = OA₁ / OA₂', categoryId: 'chords_thm' },
      { id: 'i5', text: 'A₁B₁ / A₂B₂ = OB₁ / OB₂', categoryId: 'chords_thm' },
      { id: 'i6', text: 'A₁B₁ / A₃B₃ = OA₁ / OA₃', categoryId: 'chords_thm' },
      { id: 'i7', text: 'A₁B₁ / A₂B₂ = A₁A₂ / B₁B₂', categoryId: 'invalid_ratio' },
      { id: 'i8', text: 'OA₁ / OB₂ = OB₁ / OA₂', categoryId: 'invalid_ratio' },
      { id: 'i9', text: 'A₁B₁ / A₂B₂ = OA₂ / OA₁', categoryId: 'invalid_ratio' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szakaszfelosztások egységei és szerkeszthetősége',
    description: 'Csoportosítsd a felosztásokat a segédfélegyenesre felmérendő egységek száma szerint!',
    categories: [
      { id: 'odd_units', name: 'Páratlan számú egység felmérése', color: 'amber' },
      { id: 'even_units', name: 'Páros számú egység felmérése', color: 'indigo' },
      { id: 'impossible', name: 'Nem értelmezhető geometriai felosztás', color: 'rose' }
    ],
    items: [
      { id: 'i10', text: 'Szakasz felosztása 3 : 4 : 2 arányban (9 egység)', categoryId: 'odd_units' },
      { id: 'i11', text: 'Szakasz felosztása 2 : 5 arányban (7 egység)', categoryId: 'odd_units' },
      { id: 'i12', text: 'Szabályos háromszög kerületének 1 : 1 : 1 felosztása (3 egység)', categoryId: 'odd_units' },
      { id: 'i13', text: 'Egyenlő szárú háromszög 3 : 2 : 2 arányú felosztása (7 egység)', categoryId: 'odd_units' },
      { id: 'i14', text: 'Téglalap félkerületének 2 : 3 arányú felosztása (5 egység)', categoryId: 'odd_units' },
      { id: 'i15', text: 'Szakasz felezése 1 : 1 arányban (2 egység)', categoryId: 'even_units' },
      { id: 'i16', text: 'Egyenlő szárú háromszög 2 : 3 : 3 arányú felosztása (8 egység)', categoryId: 'even_units' },
      { id: 'i17', text: 'Háromszög kerületének 3 : 3 : 4 arányú felosztása (10 egység)', categoryId: 'even_units' },
      { id: 'i18', text: 'Szakasz felosztása negatív (-2) : 3 arányban', categoryId: 'impossible' },
      { id: 'i19', text: 'Szakasz belső felosztása 0 : 5 arányban', categoryId: 'impossible' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások a párhuzamos szelőkről',
    description: 'Döntsd el a szelőkről és szerkesztésekről szóló geometriai állítások igazságtartalmát!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz állítás', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai tévedés / hamis', color: 'rose' }
    ],
    items: [
      { id: 'i20', text: 'Ha a szelők párhuzamosak, a szárakon keletkező megfelelő szakaszok aránya egyenlő', categoryId: 'always_true' },
      { id: 'i21', text: 'A párhuzamos szelők tételének megfordítása is igaz a szögszárakon', categoryId: 'always_true' },
      { id: 'i22', text: 'A párhuzamos szelőszakaszok aránya megegyezik a csúcstól mért távolságok arányával', categoryId: 'always_true' },
      { id: 'i23', text: 'Bármely szakasz felosztható m : n pozitív egész arányban segédfélegyenessel és párhuzamosokkal', categoryId: 'always_true' },
      { id: 'i24', text: 'Két egyenes párhuzamos egymással, ha metszik egy szög szárait', categoryId: 'cond_true' },
      { id: 'i25', text: 'Egy szakaszt felosztva a szomszédos téglalapok területe arányos a szakaszok hosszával', categoryId: 'cond_true' },
      { id: 'i26', text: 'A párhuzamos szelők tétele kizárólag hegyesszögekre érvényes', categoryId: 'false_stmt' },
      { id: 'i27', text: 'A szelőszakaszok aránya megegyezik a trapéz szárain kimetszett darabok arányával', categoryId: 'false_stmt' },
      { id: 'i28', text: 'Ha egy szakasz felosztási aránya 2 : 5, akkor a nagyobbik rész a teljes szakasz 5/2 része', categoryId: 'false_stmt' }
    ]
  }
];

export const ParallelInterceptSorter: React.FC<ParallelInterceptSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Párhuzamos szelők tétele – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="parhuzamos-szelok-tetele"
      title={topicTitle}
      subtitle="Rendszerezd az aránypárokat, a szakaszfelosztási egységeket és a tételek igazságtartalmát!"
      levels={PARALLEL_INTERCEPT_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      {...rest}
    />
  );
};

export default ParallelInterceptSorter;

