import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SineLawApplicationsMatcherProps {
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

const SINE_LAW_APPLICATIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és esetek',
    description: 'Párosítsd a helyzeteket a következményükkel!',
    pairs: [
      { id: 'slam1', left: 'sin β > 1', right: 'Nincs ilyen háromszög' },
      { id: 'slam2', left: 'sin β = 1', right: 'β = 90°' },
      { id: 'slam3', left: 'sin β ≈ 0,9428 (α = 45°)', right: 'β ≈ 70,53° vagy β ≈ 109,47°' },
      { id: 'slam4', left: 'sin β ≈ 0,811 (α = 68°)', right: 'Csak β ≈ 54,2° (a 125,8° túl nagy)' },
      { id: 'slam5', left: 'Depressziószög', right: 'A vízszintestől lefelé mért látószög' },
      { id: 'slam6', left: 'A számológép sin⁻¹ funkciója', right: 'Csak a hegyesszögű jelöltet adja' },
      { id: 'slam7', left: 'A C körüli kör érinti a szögszárat', right: 'Egyetlen közös pont: az érintési pont' },
      { id: 'slam8', left: 'Az adott szög a nagyobb oldallal szemközti', right: 'Legfeljebb egy megoldás' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Alkalmazási feladatok',
    description: 'Párosítsd a tankönyvi feladatot az eredményével!',
    pairs: [
      { id: 'slam9', left: 'Repülő: d = 3000 · sin 123° / sin 30°', right: '≈ 5030 m' },
      { id: 'slam10', left: 'Repülő: e = 3000 · sin 27° / sin 30°', right: '≈ 2720 m' },
      { id: 'slam11', left: 'Repülő: h = d · sin 27°', right: '≈ 2280 m' },
      { id: 'slam12', left: 'Hajó: 120 m, α ≈ 73°, β ≈ 52°', right: '≈ 110,4 m a parttól' },
      { id: 'slam13', left: 'Hegy: BH = 223 · sin 74° / sin 55°', right: '≈ 261,7 m' },
      { id: 'slam14', left: 'Hegy: m = BH · sin 11°', right: '≈ 50 m' },
      { id: 'slam15', left: 'Pisa: 9 · sin 77° / sin 9°', right: '≈ 56 m' },
      { id: 'slam16', left: 'Mars-szonda: 31 · sin 3° / sin 112°', right: '≈ 1,75 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány háromszög van?',
    description: 'Párosítsd az adatokat (a, b és az a-val szemközti α; illetve a, b, β) a megoldással!',
    pairs: [
      { id: 'slam17', left: 'a = 2 cm, b = 7 cm, α = 68°', right: 'Nincs megoldás (sin β ≈ 3,24)' },
      { id: 'slam18', left: 'a = 6,5 cm, b = 7 cm, α = 68°', right: '2 háromszög (γ ≈ 25,1° vagy 18,9°)' },
      { id: 'slam19', left: 'a = 8 cm, b = 7 cm, α = 68°', right: '1 háromszög (γ ≈ 57,8°)' },
      { id: 'slam20', left: 'a = 6 cm, b = 4,5 cm, α = 45°', right: '1 háromszög (γ ≈ 103,0°)' },
      { id: 'slam21', left: 'a = 5 cm, b = 10 cm, α = 30°', right: '1 derékszögű háromszög (γ = 60°)' },
      { id: 'slam22', left: 'a = 6 cm, b = 7,5 cm, α = 65°', right: 'Nincs megoldás (sin β ≈ 1,133)' },
      { id: 'slam23', left: 'a = 6 cm, b = 7,5 cm, α = 30°', right: '2 háromszög (γ ≈ 111,3° vagy 8,7°)' },
      { id: 'slam24', left: 'a = 10 cm, b = 6 cm, β = 30°', right: '2 háromszög (α ≈ 56,44° vagy 123,56°)' }
    ]
  }
];

const SINE_LAW_APPLICATIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SINE_LAW_APPLICATIONS_MATCHER_LEVELS_LIST[0],
  2: SINE_LAW_APPLICATIONS_MATCHER_LEVELS_LIST[1],
  3: SINE_LAW_APPLICATIONS_MATCHER_LEVELS_LIST[2]
};

export const SineLawApplicationsMatcher: React.FC<SineLawApplicationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-alkalmazasok-matcher',
  topicTitle = '10. Alkalmazások (szinusztétel) – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="alkalmazasok-szinusztetel"
      title={topicTitle}
      subtitle="Gyakorold a szinusztétel alkalmazásait és a megoldások számának eldöntését!"
      levels={SINE_LAW_APPLICATIONS_MATCHER_LEVELS}
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

export default SineLawApplicationsMatcher;
