import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SineLawMatcherProps {
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

const SINE_LAW_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A tétel és a használata',
    description: 'Párosítsd a fogalmakat és helyzeteket a pontos jelentésükkel!',
    pairs: [
      { id: 'slm1', left: 'Szinusztétel', right: 'a / b = sin α / sin β' },
      { id: 'slm2', left: 'A tétel bizonyítása', right: 'A terület kétféle felírása' },
      { id: 'slm3', left: 'Ismert két szög és egy oldal', right: 'Egy másik oldal kiszámolható' },
      { id: 'slm4', left: 'Ismert két oldal és az egyikkel szemközti szög', right: 'A másikkal szemközti szög szinusza számolható' },
      { id: 'slm5', left: 'Az a oldalhoz tartozó szög', right: 'A vele szemközti α szög' },
      { id: 'slm6', left: 'α = β', right: 'a = b' },
      { id: 'slm7', left: 'Csak a három szög ismert', right: 'Csak az oldalak aránya határozható meg' },
      { id: 'slm8', left: 'Két szög 109° és 16°', right: 'A harmadik szög 55°' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Oldalak aránya',
    description: 'Párosítsd a szögeket az oldalak arányával!',
    pairs: [
      { id: 'slm9', left: 'α = 30°, β = 90°', right: 'a / b = 1 / 2' },
      { id: 'slm10', left: 'α = 30°, β = 60°', right: 'a / b = 1 / √3 ≈ 0,577' },
      { id: 'slm11', left: 'α = 45°, β = 90°', right: 'a / b = √2 / 2 ≈ 0,707' },
      { id: 'slm12', left: 'α = 120°, β = 30°', right: 'a / b = √3 ≈ 1,732' },
      { id: 'slm13', left: 'Szögek: 30°, 60°, 90°', right: 'a : b : c = 1 : √3 : 2' },
      { id: 'slm14', left: 'Szögek: 45°, 45°, 90°', right: 'a : b : c = 1 : 1 : √2' },
      { id: 'slm15', left: 'Szögek: 60°, 60°, 60°', right: 'a : b : c = 1 : 1 : 1' },
      { id: 'slm16', left: 'a = 2b', right: 'sin α = 2 · sin β' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számolás a szinusztétellel',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'slm17', left: 'Új Híd: 200 · sin 109° / sin 55°', right: '≈ 231 m (b kábel)' },
      { id: 'slm18', left: 'Új Híd: 200 · sin 16° / sin 55°', right: '≈ 67,3 m (c pillér)' },
      { id: 'slm19', left: 'Új Híd: c · sin 109° / sin 41°', right: '≈ 97 m (e kötél)' },
      { id: 'slm20', left: 'Új Híd: c · sin 109° / sin 24°', right: '≈ 156 m (d kötél)' },
      { id: 'slm21', left: 'Hajó: 100 m, α ≈ 74°, β ≈ 52°', right: '≈ 93,6 m a parttól' },
      { id: 'slm22', left: 'a + b = 20 cm, α = 67°, β = 48°', right: 'a ≈ 11,07 cm, b ≈ 8,93 cm' },
      { id: 'slm23', left: 'a = 10 cm, α = 30°, β = 45° ⇒ b', right: '≈ 14,14 cm' },
      { id: 'slm24', left: 'a = 8 cm, α = 40°, β = 60° ⇒ c', right: '≈ 12,26 cm' }
    ]
  }
];

const SINE_LAW_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SINE_LAW_MATCHER_LEVELS_LIST[0],
  2: SINE_LAW_MATCHER_LEVELS_LIST[1],
  3: SINE_LAW_MATCHER_LEVELS_LIST[2]
};

export const SineLawMatcher: React.FC<SineLawMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-szinusztetel-matcher',
  topicTitle = '9. A szinusztétel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-szinusztetel"
      title={topicTitle}
      subtitle="Gyakorold a szinusztételt: fogalmak, oldalarányok és tankönyvi számolások!"
      levels={SINE_LAW_MATCHER_LEVELS}
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

export default SineLawMatcher;
