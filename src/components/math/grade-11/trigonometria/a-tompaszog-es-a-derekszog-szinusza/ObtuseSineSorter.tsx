import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ObtuseSineSorterProps {
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

const OBTUSE_SINE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hegyesszög, derékszög vagy tompaszög?',
    description: 'Döntsd el, milyen szögről van szó!',
    categories: [
      { id: 'acute', name: 'Hegyesszög', color: 'blue' },
      { id: 'right', name: 'Derékszög', color: 'amber' },
      { id: 'obtuse', name: 'Tompaszög', color: 'purple' }
    ],
    items: [
      { id: 'oss1', text: 'A számológép sin⁻¹ funkciója által adott szög (pl. sin⁻¹ 0,5213)', categoryId: 'acute' },
      { id: 'oss2', text: 'A 128°-os szög mellékszöge', categoryId: 'acute' },
      { id: 'oss3', text: 'A szabályos háromszög egy szöge', categoryId: 'acute' },
      { id: 'oss4', text: 'Az a háromszögszög, amelynek szinusza pontosan 1', categoryId: 'right' },
      { id: 'oss5', text: 'Adott két oldal mellett a legnagyobb területet adó közbezárt szög', categoryId: 'right' },
      { id: 'oss6', text: 'A 49 mm és 54 mm oldalú, 1323 mm² területű háromszög közbezárt szöge', categoryId: 'right' },
      { id: 'oss7', text: 'Dóri hiányzó második megoldása (≈ 148,6°)', categoryId: 'obtuse' },
      { id: 'oss8', text: 'A 40°-os szög kiegészítő szöge', categoryId: 'obtuse' },
      { id: 'oss9', text: 'A szabályos hatszög egy belső szöge', categoryId: 'obtuse' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik érték?',
    description: 'Csoportosítsd a kifejezéseket az értékük szerint!',
    categories: [
      { id: 'half', name: '= 0,5', color: 'teal' },
      { id: 'root3', name: '= √3 / 2 ≈ 0,866', color: 'rose' },
      { id: 'one', name: '= 1', color: 'emerald' }
    ],
    items: [
      { id: 'oss10', text: 'sin 30°', categoryId: 'half' },
      { id: 'oss11', text: 'sin 150°', categoryId: 'half' },
      { id: 'oss12', text: 'sin γ, ha a szárak 12 cm-esek és T = 36 cm²', categoryId: 'half' },
      { id: 'oss13', text: 'sin 60°', categoryId: 'root3' },
      { id: 'oss14', text: 'sin 120°', categoryId: 'root3' },
      { id: 'oss15', text: 'A szabályos hatszög belső szögének szinusza', categoryId: 'root3' },
      { id: 'oss16', text: 'sin 90°', categoryId: 'one' },
      { id: 'oss17', text: 'sin γ, ha a = 49 mm, b = 54 mm, T = 1323 mm²', categoryId: 'one' },
      { id: 'oss18', text: '2T / (ab) egy derékszögű háromszög befogóira', categoryId: 'one' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány háromszög létezik?',
    description: 'Két oldal (a, b) és a terület (T) adott. Hány megfelelő közbezárt szög van? (sin γ = 2T / ab)',
    categories: [
      { id: 'two', name: 'Két megoldás (hegyes- és tompaszög)', color: 'purple' },
      { id: 'single', name: 'Egy megoldás (γ = 90°)', color: 'amber' },
      { id: 'none', name: 'Nincs megoldás (sin γ > 1)', color: 'rose' }
    ],
    items: [
      { id: 'oss19', text: 'a = 94 mm, b = 54 mm, T = 1323 mm²', categoryId: 'two' },
      { id: 'oss20', text: 'a = 10 cm, b = 12 cm, T = 36,1 cm²', categoryId: 'two' },
      { id: 'oss21', text: 'a = 12 cm, b = 12 cm, T = 36 cm²', categoryId: 'two' },
      { id: 'oss22', text: 'a = 49 mm, b = 54 mm, T = 1323 mm²', categoryId: 'single' },
      { id: 'oss23', text: 'a = 8 cm, b = 5 cm, T = 20 cm²', categoryId: 'single' },
      { id: 'oss24', text: 'a = 6 cm, b = 8 cm, T = 24 cm²', categoryId: 'single' },
      { id: 'oss25', text: 'a = 6 cm, b = 4 cm, T = 15 cm²', categoryId: 'none' },
      { id: 'oss26', text: 'a = 5 cm, b = 5 cm, T = 13 cm²', categoryId: 'none' },
      { id: 'oss27', text: 'a = 10 cm, b = 3 cm, T = 16 cm²', categoryId: 'none' }
    ]
  }
];

const OBTUSE_SINE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: OBTUSE_SINE_SORTER_LEVELS_LIST[0],
  2: OBTUSE_SINE_SORTER_LEVELS_LIST[1],
  3: OBTUSE_SINE_SORTER_LEVELS_LIST[2]
};

export const ObtuseSineSorter: React.FC<ObtuseSineSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-tompaszog-szinusz-sorter',
  topicTitle = '8. A tompaszög és a derékszög szinusza – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-tompaszog-es-a-derekszog-szinusza"
      title={topicTitle}
      subtitle="Rendszerezd a szögeket, a szinuszértékeket és a megoldások számát!"
      levels={OBTUSE_SINE_SORTER_LEVELS}
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

export default ObtuseSineSorter;
