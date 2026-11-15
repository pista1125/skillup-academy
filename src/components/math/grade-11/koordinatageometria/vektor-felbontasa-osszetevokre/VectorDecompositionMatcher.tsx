import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorDecompositionMatcherProps {
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

const VECTOR_DECOMPOSITION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és szabályok',
    description: 'Párosítsd a fogalmakat, helyzeteket a jelentésükkel!',
    pairs: [
      { id: 'vdm1', left: 'A felbontás tétele', right: '→v = m · →a + n · →b, ha →a ∦ →b' },
      { id: 'vdm2', left: 'Az összetevők (m · →a és n · →b)', right: 'A paralelogramma oldalvektorai' },
      { id: 'vdm3', left: 'A felbontandó →v a szerkesztésben', right: 'A paralelogramma átlója' },
      { id: 'vdm4', left: '→v párhuzamos →a-val', right: 'n = 0' },
      { id: 'vdm5', left: 'A nullvektor felbontása', right: 'm = 0 és n = 0' },
      { id: 'vdm6', left: '−2 · →c', right: '→c-vel ellentétes irányú, kétszer olyan hosszú' },
      { id: 'vdm7', left: '1/3 · →u', right: '→u-val egyirányú, harmad olyan hosszú' },
      { id: 'vdm8', left: '→a ∥ →b, és →v nem párhuzamos velük', right: '→v nem bontható fel' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Katamarán, fonál, lejtő',
    description: 'Párosítsd a feladatot a kiszámított összetevővel vagy eredménnyel!',
    pairs: [
      { id: 'vdm9', left: '12 m, 30° a parttal – a partra merőleges összetevő', right: '6 m' },
      { id: 'vdm10', left: '12 m, 30° a parttal – a parttal párhuzamos összetevő', right: '6√3 ≈ 10,4 m' },
      { id: 'vdm11', left: '1200 m széles tó, másodpercenként 6 m közeledés', right: '200 s' },
      { id: 'vdm12', left: '10,4 m másodpercenként, km/h-ban', right: '≈ 37,4 km/h' },
      { id: 'vdm13', left: '20 N súly – a 60°-os fonállal párhuzamos összetevő', right: '≈ 17,3 N' },
      { id: 'vdm14', left: '20 N súly – a 30°-os fonállal párhuzamos összetevő', right: '10 N' },
      { id: 'vdm15', left: '50 N, 30°-os lejtő – lejtővel párhuzamos összetevő', right: '25 N' },
      { id: 'vdm16', left: '50 N, 30°-os lejtő – lejtőre merőleges összetevő', right: '≈ 43,3 N' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hatszög és négyzetrács',
    description: 'Szabályos hatszögben →a = →AB, →b = →AF. A rácsos feladatokban a lépések rácsegységben értendők. Párosítsd a felbontással!',
    pairs: [
      { id: 'vdm17', left: 'Hatszög: →AO (O a középpont)', right: '→a + →b' },
      { id: 'vdm18', left: 'Hatszög: →AC', right: '2→a + →b' },
      { id: 'vdm19', left: 'Hatszög: →AD', right: '2→a + 2→b' },
      { id: 'vdm20', left: '→a: 1 jobbra, 1 fel; →b: 1 jobbra, 1 le; →v: 4 jobbra, 2 fel', right: '→v = 3→a + →b' },
      { id: 'vdm21', left: '→a: 1 jobbra, 2 fel; →b: 2 jobbra, 1 le; →v: 5 jobbra', right: '→v = →a + 2→b' },
      { id: 'vdm22', left: '→a: 3 jobbra, 1 fel; →b: 1 balra, 2 fel; →v: 4 jobbra, 1 le', right: '→v = →a − →b' },
      { id: 'vdm23', left: '→a: 2 jobbra; →b: 1 jobbra, 2 fel; →v: 4 jobbra, 3 fel', right: '→v = 1,25→a + 1,5→b' },
      { id: 'vdm24', left: '8 egység hosszú vektor, 25° – a merőleges összetevő', right: '≈ 3,38' }
    ]
  }
];

const VECTOR_DECOMPOSITION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: VECTOR_DECOMPOSITION_MATCHER_LEVELS_LIST[0],
  2: VECTOR_DECOMPOSITION_MATCHER_LEVELS_LIST[1],
  3: VECTOR_DECOMPOSITION_MATCHER_LEVELS_LIST[2]
};

export const VectorDecompositionMatcher: React.FC<VectorDecompositionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-vektor-felbontas-matcher',
  topicTitle = '4. Ráadás – Vektor felbontása összetevőkre – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektor-felbontasa-osszetevokre"
      title={topicTitle}
      subtitle="Gyakorold a vektorok felbontását: fogalmak, merőleges összetevők a gyakorlatban, felbontás hatszögben és négyzetrácson!"
      levels={VECTOR_DECOMPOSITION_MATCHER_LEVELS}
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

export default VectorDecompositionMatcher;
