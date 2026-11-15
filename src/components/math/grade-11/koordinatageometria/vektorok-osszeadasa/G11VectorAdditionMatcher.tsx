import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11VectorAdditionMatcherProps {
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

const VECTOR_ADDITION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'vam1', left: 'Vektor', right: 'Párhuzamos, azonos irányú, egyenlő hosszú irányított szakaszok halmaza' },
      { id: 'vam2', left: '|→v|', right: 'A vektor hossza (abszolút értéke)' },
      { id: 'vam3', left: '−→v', right: 'Párhuzamos, egyenlő hosszú, ellentétes irányú vektor' },
      { id: 'vam4', left: '→0', right: 'Nulla hosszú vektor, iránya tetszőleges' },
      { id: 'vam5', left: 'Összefűzés (háromszögmódszer)', right: 'Az első kezdőpontjából az utolsó végpontjába mutat' },
      { id: 'vam6', left: 'Paralelogrammamódszer', right: 'A közös kezdőpontból induló átlóvektor' },
      { id: 'vam7', left: 'Eredő', right: 'A vektorok összegének fizikai elnevezése' },
      { id: 'vam8', left: 'Skalármennyiség', right: 'Egy számmal és mértékegységgel megadható (pl. tömeg)' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Összegek pontokkal',
    description: 'Párosítsd az összeget az eredményével! (ABCD paralelogramma.)',
    pairs: [
      { id: 'vam9', left: '→AB + →BC', right: '→AC' },
      { id: 'vam10', left: '→PQ + →QR + →RS', right: '→PS' },
      { id: 'vam11', left: '→AB + →BA', right: '→0' },
      { id: 'vam12', left: '→BA + →BC', right: '→BD' },
      { id: 'vam13', left: '→DA + →DC', right: '→DB' },
      { id: 'vam14', left: '→CB + →BA', right: '→CA' },
      { id: 'vam15', left: '→AD + →DC + →CB', right: '→AB' },
      { id: 'vam16', left: '(−→a) + →a + →b', right: '→b' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Az összegvektor hossza',
    description: 'Párosítsd az adatokat |→a + →b| értékével!',
    pairs: [
      { id: 'vam17', left: '6 cm és 2,5 cm, egyirányú', right: '8,5 cm' },
      { id: 'vam18', left: '6 cm és 2,5 cm, ellentétes irányú', right: '3,5 cm' },
      { id: 'vam19', left: '6 cm és 2,5 cm, merőleges', right: '6,5 cm' },
      { id: 'vam20', left: '3 és 4, merőleges', right: '5' },
      { id: 'vam21', left: '5 és 3, 60°-os szög', right: '7' },
      { id: 'vam22', left: '4 és 4, 120°-os szög', right: '4' },
      { id: 'vam23', left: '60 m és 11 m, merőleges', right: '61 m' },
      { id: 'vam24', left: '2 cm-es négyzet: →AB + →AD', right: '2√2 ≈ 2,83 cm' }
    ]
  }
];

const VECTOR_ADDITION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: VECTOR_ADDITION_MATCHER_LEVELS_LIST[0],
  2: VECTOR_ADDITION_MATCHER_LEVELS_LIST[1],
  3: VECTOR_ADDITION_MATCHER_LEVELS_LIST[2]
};

export const G11VectorAdditionMatcher: React.FC<G11VectorAdditionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-vektor-osszeadas-matcher',
  topicTitle = '1. Vektorok összeadása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektorok-osszeadasa"
      title={topicTitle}
      subtitle="Gyakorold a vektorfogalmat, az összefűzést, a paralelogrammamódszert és az összegvektor hosszát!"
      levels={VECTOR_ADDITION_MATCHER_LEVELS}
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

export default G11VectorAdditionMatcher;
