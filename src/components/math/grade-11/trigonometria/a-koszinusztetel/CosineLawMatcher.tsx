import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CosineLawMatcherProps {
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

const COSINE_LAW_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A tétel és használata',
    description: 'Párosítsd a fogalmakat, eseteket a megfelelő összefüggéssel vagy módszerrel!',
    pairs: [
      { id: 'clm1', left: 'Koszinusztétel', right: 'c² = a² + b² − 2ab · cos γ' },
      { id: 'clm2', left: 'A koszinusztétel γ = 90° esetén', right: 'Pitagorasz-tétel: c² = a² + b²' },
      { id: 'clm3', left: 'cos γ három oldalból', right: '(a² + b² − c²) / (2ab)' },
      { id: 'clm4', left: 'γ tompaszög', right: 'c² > a² + b²' },
      { id: 'clm5', left: 'γ hegyesszög', right: 'c² < a² + b²' },
      { id: 'clm6', left: 'Ismert: két oldal és a közbezárt szög', right: 'A harmadik oldal koszinusztétellel' },
      { id: 'clm7', left: 'Ismert: mindhárom oldal', right: 'Először a leghosszabb oldallal szemközti szög' },
      { id: 'clm8', left: 'Ismert: két szög és egy oldal', right: 'A többi oldal szinusztétellel' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A harmadik oldal',
    description: 'Két oldal és a közbezárt szög ismert. Párosítsd a harmadik oldal hosszával!',
    pairs: [
      { id: 'clm9', left: '5 cm, 8 cm, 60°', right: '7 cm' },
      { id: 'clm10', left: '6 cm, 8 cm, 90°', right: '10 cm' },
      { id: 'clm11', left: '5 cm, 5 cm, 60°', right: '5 cm' },
      { id: 'clm12', left: '53 mm, 71 mm, 60°', right: '≈ 63,9 mm' },
      { id: 'clm13', left: '53 mm, 71 mm, 147°', right: '≈ 119,0 mm' },
      { id: 'clm14', left: 'Budapest–Bécs 233 km, Budapest–Zágráb 309 km, 60,9°', right: '≈ 282 km' },
      { id: 'clm15', left: 'Vízmolekula: 98 pm, 98 pm, 104,5°', right: '≈ 155 pm' },
      { id: 'clm16', left: 'Vasúti megállók: 12 km, 17 km, 52°', right: '≈ 13,5 km' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szögek három oldalból',
    description: 'Párosítsd a háromszöget (vagy paralelogrammát) a kérdezett szöggel!',
    pairs: [
      { id: 'clm17', left: '5, 6, 7 cm – legnagyobb szög', right: '≈ 78,5°' },
      { id: 'clm18', left: '27,2; 51,0; 57,8 mm – legnagyobb szög', right: '90°' },
      { id: 'clm19', left: '13,2; 14,1; 24,5 m – legnagyobb szög', right: '≈ 127,6°' },
      { id: 'clm20', left: '3, 5, 7 cm – legnagyobb szög', right: '120°' },
      { id: 'clm21', left: '8, 5, 7 cm – a 7 cm-rel szemközti szög', right: '60°' },
      { id: 'clm22', left: '233, 282, 309 km – a 309 km-rel szemközti szög', right: '≈ 73°' },
      { id: 'clm23', left: 'Paralelogramma 24 és 32 cm, hosszabbik átló 42 cm – tompaszög', right: '≈ 96,1°' },
      { id: 'clm24', left: '4,1; 5,3; 9,9 cm – a szögek', right: 'Nincs ilyen háromszög' }
    ]
  }
];

const COSINE_LAW_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COSINE_LAW_MATCHER_LEVELS_LIST[0],
  2: COSINE_LAW_MATCHER_LEVELS_LIST[1],
  3: COSINE_LAW_MATCHER_LEVELS_LIST[2]
};

export const CosineLawMatcher: React.FC<CosineLawMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-koszinusztetel-matcher',
  topicTitle = '12. A koszinusztétel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-koszinusztetel"
      title={topicTitle}
      subtitle="Gyakorold a koszinusztételt: a harmadik oldal kiszámítását és a szögek meghatározását három oldalból!"
      levels={COSINE_LAW_MATCHER_LEVELS}
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

export default CosineLawMatcher;
