import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AcuteSineCosineMatcherProps {
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

const ACUTE_SINE_COSINE_MATCHER_LEVELS: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Definíciók és fogalmak',
    description: 'Párosítsd a fogalmakat a pontos jelentésükkel!',
    pairs: [
      { id: 'sc1', left: 'sin α', right: 'Az α-val szemközti befogó és az átfogó hányadosa' },
      { id: 'sc2', left: 'cos α', right: 'Az α melletti befogó és az átfogó hányadosa' },
      { id: 'sc3', left: 'tg α', right: 'A szemközti és a szög melletti befogó hányadosa' },
      { id: 'sc4', left: 'Átfogó', right: 'A derékszöggel szemközti, leghosszabb oldal' },
      { id: 'sc5', left: 'sin⁻¹ funkció', right: 'A szinusz értékéből visszaadja a hegyesszöget' },
      { id: 'sc6', left: 'DEG (D) mód', right: 'A számológép fokokban számol' },
      { id: 'sc7', left: 'Szögfüggvények', right: 'A szög szinusza, koszinusza és tangense együtt' },
      { id: 'sc8', left: 'Hegyesszög szinuszának értéke', right: 'Mindig 0 és 1 közé esik' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Értékek és képletek',
    description: 'Párosítsd a kifejezéseket a helyes értékükkel vagy képletükkel!',
    pairs: [
      { id: 'sc9', left: 'a = 3, b = 4, c = 5 ⇒ sin α', right: '0,6' },
      { id: 'sc10', left: 'a = 3, b = 4, c = 5 ⇒ cos α', right: '0,8' },
      { id: 'sc11', left: 'sin 30°', right: '0,5' },
      { id: 'sc12', left: 'cos 40°', right: '≈ 0,766' },
      { id: 'sc13', left: 'Szemközti befogó (átfogó c, szög α)', right: 'c · sin α' },
      { id: 'sc14', left: 'Szög melletti befogó (átfogó c, szög α)', right: 'c · cos α' },
      { id: 'sc15', left: 'Átfogó (szemközti befogó a, szög α)', right: 'a / sin α' },
      { id: 'sc16', left: 'cos α = 0,865', right: 'α ≈ 30,1°' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok eredményei',
    description: 'Párosítsd a feladatokat a végeredményükkel!',
    pairs: [
      { id: 'sc17', left: '500 m-es út, 15° ⇒ szintkülönbség', right: '≈ 129,4 m' },
      { id: 'sc18', left: '500 m-es út, 15° ⇒ távolság a 1 : 8000 térképen', right: '≈ 6,04 cm' },
      { id: 'sc19', left: 'Átfogó 14 cm, 40° ⇒ szemközti befogó', right: '≈ 9,0 cm' },
      { id: 'sc20', left: 'Szárak 14 cm, szárszög 44° ⇒ alap', right: '≈ 10,49 cm' },
      { id: 'sc21', left: 'Szárak 14 cm, szárszög 44° ⇒ alaphoz tartozó magasság', right: '≈ 12,98 cm' },
      { id: 'sc22', left: '0,5 m magas plató, 2 m-es palló ⇒ hajlásszög', right: '≈ 14,5°' },
      { id: 'sc23', left: 'Szárak 28 cm, alap 10 cm ⇒ alapon fekvő szög', right: '≈ 79,7°' },
      { id: 'sc24', left: 'Átfogó 25 cm, 35° ⇒ átfogóhoz tartozó magasság', right: '≈ 11,75 cm' }
    ]
  }
];

export const AcuteSineCosineMatcher: React.FC<AcuteSineCosineMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-szinusz-koszinusz-matcher',
  topicTitle = '3. Hegyesszög szinusza, koszinusza – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="hegyesszog-szinusza-koszinusza"
      title={topicTitle}
      subtitle="Gyakorold a szinusz és koszinusz definícióját, a nevezetes értékeket és a tankönyvi feladatok eredményeit!"
      levels={{ 1: ACUTE_SINE_COSINE_MATCHER_LEVELS[0], 2: ACUTE_SINE_COSINE_MATCHER_LEVELS[1], 3: ACUTE_SINE_COSINE_MATCHER_LEVELS[2] }}
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

export default AcuteSineCosineMatcher;
