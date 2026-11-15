import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PolygonTrigMatcherProps {
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

const POLYGON_TRIG_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A tangens 0° és 180° között',
    description: 'Párosítsd a kifejezéseket a pontos értékükkel, illetve jelentésükkel!',
    pairs: [
      { id: 'ptm1', left: 'tg α (α ≠ 90°)', right: 'sin α / cos α' },
      { id: 'ptm2', left: 'tg 90°', right: 'Nincs értelmezve' },
      { id: 'ptm3', left: 'tg 30°', right: '√3/3' },
      { id: 'ptm4', left: 'tg 45°', right: '1' },
      { id: 'ptm5', left: 'tg 60°', right: '√3' },
      { id: 'ptm6', left: 'tg 120°', right: '−√3' },
      { id: 'ptm7', left: 'tg 135°', right: '−1' },
      { id: 'ptm8', left: 'tg 150°', right: '−√3/3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Felbontott sokszögek',
    description: 'Párosítsd a csoportmunka-feladatok kérdéseit az eredménnyel!',
    pairs: [
      { id: 'ptm9', left: 'tg 100° (számológéppel)', right: '≈ −5,671' },
      { id: 'ptm10', left: 'tg 170° (számológéppel)', right: '≈ −0,176' },
      { id: 'ptm11', left: '42°-os szárszögű egyenlő szárú háromszög alapon fekvő szöge', right: '69°' },
      { id: 'ptm12', left: 'A 42°-os szárszögű, 120 m alapú háromszög szára', right: '≈ 167,4 m' },
      { id: 'ptm13', left: 'Ugyanennek az alaphoz tartozó magassága', right: '≈ 156,3 m' },
      { id: 'ptm14', left: 'A 40 m-es középső alaprészhez tartozó β szög', right: '≈ 14,6°' },
      { id: 'ptm15', left: 'A szélső α = γ szög', right: '≈ 13,7°' },
      { id: 'ptm16', left: 'A vasúti töltés magassága (korona 4,5 m, alap 10 m, rézsűk 3,8 és 4,2 m)', right: '≈ 2,9 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Térkép, terep, terület',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'ptm17', left: 'Pécs–Budapest–Győr: a Pécsnél lévő szög', right: '≈ 35,1°' },
      { id: 'ptm18', left: 'Pécs–Budapest–Győr: a Budapestnél lévő szög', right: '≈ 80,1°' },
      { id: 'ptm19', left: 'Pécs–Budapest–Győr: a Győrnél lévő szög', right: '≈ 64,8°' },
      { id: 'ptm20', left: 'Pécs–Budapest–Győr „háromszög” területe', right: '≈ 9042 km²' },
      { id: 'ptm21', left: 'Ez Magyarország területének (93 030 km²) hány százaléka?', right: '≈ 9,7%' },
      { id: 'ptm22', left: 'Előremetszés: d₁ = 300 · sin 60° / sin 80°', right: '≈ 264 m' },
      { id: 'ptm23', left: 'Előremetszés: d₂ = 300 · sin 40° / sin 80°', right: '≈ 196 m' },
      { id: 'ptm24', left: '48 cm-es oldal, 39 cm-es súlyvonal, 48° ⇒ a háromszög területe', right: '≈ 695,6 cm²' }
    ]
  }
];

const POLYGON_TRIG_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POLYGON_TRIG_MATCHER_LEVELS_LIST[0],
  2: POLYGON_TRIG_MATCHER_LEVELS_LIST[1],
  3: POLYGON_TRIG_MATCHER_LEVELS_LIST[2]
};

export const PolygonTrigMatcher: React.FC<PolygonTrigMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-sokszogek-matcher',
  topicTitle = '13. Sokszögek és szögfüggvények – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="sokszogek-es-szogfuggvenyek"
      title={topicTitle}
      subtitle="Gyakorold a tompaszög tangensét, a sokszögek felbontását és a térképes számításokat!"
      levels={POLYGON_TRIG_MATCHER_LEVELS}
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

export default PolygonTrigMatcher;
