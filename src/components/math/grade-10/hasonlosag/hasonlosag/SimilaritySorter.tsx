import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimilaritySorterProps {
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

const SIMILARITY_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Alakzatpárok geometriai hasonlósága',
    description: 'Csoportosítsd az alakzatpárokat aszerint, hogy minden körülmények között hasonlók-e egymáshoz!',
    categories: [
      { id: 'always', name: 'Mindig hasonló alakzatok', color: 'emerald' },
      { id: 'conditional', name: 'Csak megfelelő arányok esetén hasonlók', color: 'amber' },
      { id: 'never', name: 'Soha nem hasonlók', color: 'rose' }
    ],
    items: [
      { id: 'i1', text: 'Bármely két síkbeli négyzet', categoryId: 'always' },
      { id: 'i2', text: 'Bármely két síkbeli kör', categoryId: 'always' },
      { id: 'i3', text: 'Bármely két szabályos háromszög', categoryId: 'always' },
      { id: 'i4', text: 'Bármely két gömb a térben', categoryId: 'always' },
      { id: 'i5', text: 'Bármely két kocka a térben', categoryId: 'always' },
      { id: 'i6', text: 'Bármely két síkbeli téglalap', categoryId: 'conditional' },
      { id: 'i7', text: 'Bármely két egyenlő szárú háromszög', categoryId: 'conditional' },
      { id: 'i8', text: 'Bármely két síkbeli rombusz', categoryId: 'conditional' },
      { id: 'i9', text: 'Bármely két húrtrapéz', categoryId: 'conditional' },
      { id: 'i10', text: 'Egy kör és egy nem kör alakú ellipszis', categoryId: 'never' },
      { id: 'i11', text: 'Egy derékszögű háromszög és egy paralelogramma', categoryId: 'never' },
      { id: 'i12', text: 'Egy szabályos tetraéder és egy kocka', categoryId: 'never' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hasonlósági skálázódás hatványkitevője',
    description: 'Csoportosítsd a geometriai és fizikai mennyiségeket aszerint, hogy a hasonlóság arányának (λ) melyik hatványával skálázódnak!',
    categories: [
      { id: 'linear', name: 'Elsőfokú skálázódás (λ¹)', color: 'blue' },
      { id: 'quadratic', name: 'Másodfokú skálázódás (λ²)', color: 'purple' },
      { id: 'cubic', name: 'Harmadfokú skálázódás (λ³)', color: 'orange' }
    ],
    items: [
      { id: 'i13', text: 'Megfelelő oldalak és élek hossza', categoryId: 'linear' },
      { id: 'i14', text: 'Sokszög vagy síkidom kerülete (K)', categoryId: 'linear' },
      { id: 'i15', text: 'Háromszög magasságai és súlyvonalai', categoryId: 'linear' },
      { id: 'i16', text: 'Beírt és körülírt kör sugara (r, R)', categoryId: 'linear' },
      { id: 'i17', text: 'Síkidom vagy sokszög területe (T)', categoryId: 'quadratic' },
      { id: 'i18', text: 'Térbeli test alapterülete (T_alap)', categoryId: 'quadratic' },
      { id: 'i19', text: 'Gúla vagy henger palástjának területe', categoryId: 'quadratic' },
      { id: 'i20', text: 'Térbeli test teljes felszíne (A)', categoryId: 'quadratic' },
      { id: 'i21', text: 'Térbeli test térfogata (V)', categoryId: 'cubic' },
      { id: 'i22', text: 'Azonos anyagú test tömege (m = ρ · V)', categoryId: 'cubic' },
      { id: 'i23', text: 'Folyadéktároló tartály űrtartalma (liter)', categoryId: 'cubic' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások matematikai igazságtartalma',
    description: 'Döntsd el a hasonlósággal kapcsolatos állításokról, hogy melyik csoportba tartoznak!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz (csak ha kikötés teljesül)', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai képtelenség / hamis', color: 'rose' }
    ],
    items: [
      { id: 'i24', text: 'Ha két síkidom hasonló és λ = 2, akkor a területük aránya 4', categoryId: 'always_true' },
      { id: 'i25', text: 'Ha két alakzat egybevágó, akkor egymáshoz hasonlóak is (λ = 1)', categoryId: 'always_true' },
      { id: 'i26', text: 'Hasonló sokszögek megfelelő belső szögei egyenlők', categoryId: 'always_true' },
      { id: 'i27', text: 'Két test hasonlósága esetén a testátlók aránya egyenlő az élek arányával', categoryId: 'always_true' },
      { id: 'i28', text: 'Két háromszög hasonló, ha van egy-egy egyenlő nagyságú szögük', categoryId: 'cond_true' },
      { id: 'i29', text: 'Két tetszőleges téglalap hasonló egymáshoz', categoryId: 'cond_true' },
      { id: 'i30', text: 'Két tetszőleges rombusz hasonló egymáshoz', categoryId: 'cond_true' },
      { id: 'i31', text: 'Ha a hasonlóság aránya 3, akkor a területarány is 3', categoryId: 'false_stmt' },
      { id: 'i32', text: 'Ha egy kocka éle 2-szeresére nő, a térfogata 4-szeresére nő', categoryId: 'false_stmt' },
      { id: 'i33', text: 'Egy háromszög és egy ötszög lehet egymáshoz hasonló', categoryId: 'false_stmt' }
    ]
  }
];

export const SimilaritySorter: React.FC<SimilaritySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Hasonlóság – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="hasonlosag"
      title={topicTitle}
      subtitle="Rendszerezd az alakzatpárokat, a metrikus arányok kitevőit és a hasonlósági állításokat!"
      levels={SIMILARITY_SORTER_LEVELS}
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

export default SimilaritySorter;

