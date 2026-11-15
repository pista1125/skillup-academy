import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ObtuseCosineMatcherProps {
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

const OBTUSE_COSINE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Definíciók és nevezetes értékek',
    description: 'Párosítsd a kifejezéseket a pontos értékükkel, illetve jelentésükkel!',
    pairs: [
      { id: 'ocm1', left: 'cos 90°', right: '0' },
      { id: 'ocm2', left: 'sin 90°', right: '1' },
      { id: 'ocm3', left: 'cos 60°', right: '1/2' },
      { id: 'ocm4', left: 'cos 120°', right: '−1/2' },
      { id: 'ocm5', left: 'cos 135°', right: '−√2/2' },
      { id: 'ocm6', left: 'cos 150°', right: '−√3/2' },
      { id: 'ocm7', left: 'Az egységkör α szöghöz tartozó P pontja', right: 'P(cos α; sin α)' },
      { id: 'ocm8', left: 'cos α, ha α tompaszög', right: '−cos(180° − α)' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számológépes értékek',
    description: 'Párosítsd a szögeket a koszinuszuk négy tizedesjegyre kerekített értékével, illetve a koszinuszt a szöggel!',
    pairs: [
      { id: 'ocm9', left: 'cos 92°', right: '−0,0349' },
      { id: 'ocm10', left: 'cos 112°', right: '−0,3746' },
      { id: 'ocm11', left: 'cos 122°', right: '−0,5299' },
      { id: 'ocm12', left: 'cos 132°', right: '−0,6691' },
      { id: 'ocm13', left: 'cos 142°', right: '−0,7880' },
      { id: 'ocm14', left: 'cos 162°', right: '−0,9511' },
      { id: 'ocm15', left: 'cos 172°', right: '−0,9903' },
      { id: 'ocm16', left: 'cos⁻¹(−0,591)', right: '≈ 126,2°' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel (0° < α < 180°)!',
    pairs: [
      { id: 'ocm17', left: 'sin α = √2/2 ⇒ cos α', right: '±√2/2' },
      { id: 'ocm18', left: 'sin α = 0,7355 ⇒ cos α', right: '≈ ±0,6775' },
      { id: 'ocm19', left: 'sin α = 0,5 ⇒ cos α', right: '±√3/2' },
      { id: 'ocm20', left: 'sin α = √3/2 ⇒ cos α', right: '±1/2' },
      { id: 'ocm21', left: 'sin α = 0,472 ⇒ cos α', right: '≈ ±0,8816' },
      { id: 'ocm22', left: 'Háromszög két szögének koszinusza 0,5 és 0 ⇒ harmadik szög', right: '30°' },
      { id: 'ocm23', left: 'Egyenlő szárú háromszög, egyik szög koszinusza −0,777 ⇒ alapon fekvő szögek', right: '≈ 19,5°' },
      { id: 'ocm24', left: 'Paralelogramma egyik szögének koszinusza −0,591 ⇒ szomszédos szög koszinusza', right: '0,591' }
    ]
  }
];

const OBTUSE_COSINE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: OBTUSE_COSINE_MATCHER_LEVELS_LIST[0],
  2: OBTUSE_COSINE_MATCHER_LEVELS_LIST[1],
  3: OBTUSE_COSINE_MATCHER_LEVELS_LIST[2]
};

export const ObtuseCosineMatcher: React.FC<ObtuseCosineMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-tompaszog-koszinusz-matcher',
  topicTitle = '11. A tompaszög és a derékszög koszinusza – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-tompaszog-es-a-derekszog-koszinusza"
      title={topicTitle}
      subtitle="Gyakorold a tompaszögek és a derékszög koszinuszát, a számológépes értékeket és a szinuszból adódó két lehetőséget!"
      levels={OBTUSE_COSINE_MATCHER_LEVELS}
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

export default ObtuseCosineMatcher;
