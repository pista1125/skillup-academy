import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ObtuseSineMatcherProps {
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

const OBTUSE_SINE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Definíciók és nevezetes értékek',
    description: 'Párosítsd a szinuszokat az értékükkel, a fogalmakat a jelentésükkel!',
    pairs: [
      { id: 'osm1', left: 'sin 150°', right: '0,5' },
      { id: 'osm2', left: 'sin 90°', right: '1' },
      { id: 'osm3', left: 'sin 120°', right: '√3 / 2 ≈ 0,866' },
      { id: 'osm4', left: 'sin 135°', right: '√2 / 2 ≈ 0,707' },
      { id: 'osm5', left: 'sin 128°', right: 'sin 52° ≈ 0,788' },
      { id: 'osm6', left: 'sin 142°', right: 'sin 38° ≈ 0,616' },
      { id: 'osm7', left: 'Tompaszög szinusza', right: 'A kiegészítő szögének szinusza' },
      { id: 'osm8', left: 'A számológép sin⁻¹ funkciója', right: 'Mindig hegyesszöget ad' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Területszámítás T = ab · sin γ / 2 alapján',
    description: 'Párosítsd a két oldalt és a közbezárt szöget a terület értékével!',
    pairs: [
      { id: 'osm9', left: '26 cm, 45 cm, γ = 128°', right: '≈ 461 cm²' },
      { id: 'osm10', left: '38 cm, 29 cm, γ = 142°', right: '≈ 339 cm²' },
      { id: 'osm11', left: '6 cm, 8 cm, γ = 90°', right: '24 cm²' },
      { id: 'osm12', left: '10 cm, 10 cm, γ = 120°', right: '≈ 43,3 cm²' },
      { id: 'osm13', left: '10 cm, 12 cm, γ = 37°', right: '≈ 36,1 cm²' },
      { id: 'osm14', left: '7 cm, 10 cm, γ = 150°', right: '17,5 cm²' },
      { id: 'osm15', left: 'Vitorla: 9 m, 4,4 m, γ = 93°', right: '≈ 19,8 m²' },
      { id: 'osm16', left: 'Paralelogramma: 36 mm, 54 mm, 145°', right: '≈ 1115 mm²' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Visszakeresés – egy vagy két megoldás?',
    description: 'Párosítsd az adatokat a keresett mennyiséggel!',
    pairs: [
      { id: 'osm17', left: 'sin⁻¹ eredménye 40°, tompaszöget keresünk', right: '140°' },
      { id: 'osm18', left: 'sin γ ≈ 0,5213 (Dóri)', right: 'γ ≈ 31,4° vagy γ ≈ 148,6°' },
      { id: 'osm19', left: 'a = 49 mm, b = 54 mm, T = 1323 mm²', right: 'γ = 90°' },
      { id: 'osm20', left: 'a = 6 cm, b = 4 cm, T = 15 cm²', right: 'Nincs ilyen háromszög' },
      { id: 'osm21', left: 'Szárak 12 cm, T = 36 cm²', right: 'Szárszög: 30° vagy 150°' },
      { id: 'osm22', left: 'a = 10 cm, b = 12 cm, T = 36,1 cm²', right: 'γ ≈ 37° vagy γ ≈ 143°' },
      { id: 'osm23', left: 'a = 19 cm, γ = 150°, T = 80,75 cm²', right: 'b = 17 cm' },
      { id: 'osm24', left: 'b = 8 m, γ = 90°, T = 48 m²', right: 'a = 12 m' }
    ]
  }
];

const OBTUSE_SINE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: OBTUSE_SINE_MATCHER_LEVELS_LIST[0],
  2: OBTUSE_SINE_MATCHER_LEVELS_LIST[1],
  3: OBTUSE_SINE_MATCHER_LEVELS_LIST[2]
};

export const ObtuseSineMatcher: React.FC<ObtuseSineMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-tompaszog-szinusz-matcher',
  topicTitle = '8. A tompaszög és a derékszög szinusza – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-tompaszog-es-a-derekszog-szinusza"
      title={topicTitle}
      subtitle="Gyakorold a tompaszög és a derékszög szinuszát, a területképletet és a szögek visszakeresését!"
      levels={OBTUSE_SINE_MATCHER_LEVELS}
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

export default ObtuseSineMatcher;
