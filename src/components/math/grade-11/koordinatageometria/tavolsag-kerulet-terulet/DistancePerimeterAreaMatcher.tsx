import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DistancePerimeterAreaMatcherProps {
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

const DISTANCE_PERIMETER_AREA_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek és módszerek',
    description: 'Párosítsd a fogalmat a képletével vagy módszerével!',
    pairs: [
      { id: 'dpam1', left: 'Az A(a₁; a₂) és B(b₁; b₂) pontok távolsága', right: '√((b₁ − a₁)² + (b₂ − a₂)²)' },
      { id: 'dpam2', left: 'Sokszög kerülete', right: 'A szomszédos csúcsok távolságainak összege' },
      { id: 'dpam3', left: 'Levágott derékszögű háromszög területe', right: 'A két befogó szorzatának fele' },
      { id: 'dpam4', left: 'Befoglaló téglalap', right: 'A tengelyekkel párhuzamos oldalú legkisebb téglalap' },
      { id: 'dpam5', left: 'Négyzet területe az átlóból', right: 'e² / 2 (e az átló hossza)' },
      { id: 'dpam6', left: 'Szabályos háromszög területe', right: 'a² · √3 / 4' },
      { id: 'dpam7', left: 'Valós távolság a térképről', right: 'térképi távolság · lépték' },
      { id: 'dpam8', left: 'Valós terület a térképről', right: 'térképi terület · lépték²' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Két pont távolsága',
    description: 'Párosítsd a pontpárt a távolságukkal!',
    pairs: [
      { id: 'dpam9', left: 'A(1; 2) és B(4; 6)', right: '5' },
      { id: 'dpam10', left: 'M(−4; 1) és S(4; −4)', right: '√89' },
      { id: 'dpam11', left: 'S(4; −4) és H(6; 5)', right: '√85' },
      { id: 'dpam12', left: 'H(6; 5) és M(−4; 1)', right: '√116 = 2√29' },
      { id: 'dpam13', left: 'O(0; 0) és P(−6; 8)', right: '10' },
      { id: 'dpam14', left: 'A(1; 2) és B(6; −10)', right: '13' },
      { id: 'dpam15', left: 'A(−12; 20) és B(15; −16)', right: '45' },
      { id: 'dpam16', left: 'C(5; −6) és D(0,2; 0,4)', right: '8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Területek',
    description: 'Párosítsd az alakzatot a területével!',
    pairs: [
      { id: 'dpam17', left: 'Bermuda-háromszög M(−4; 1), S(4; −4), H(6; 5) – térképen', right: '41 területegység' },
      { id: 'dpam18', left: 'Bermuda-háromszög a valóságban (1 egység = 160 km)', right: '1 049 600 km²' },
      { id: 'dpam19', left: 'A(−4; −7), B(8; −3), D(0; 3) háromszög', right: '52' },
      { id: 'dpam20', left: 'E(3; −7), F(8; 3), C(−4; 3) háromszög', right: '60' },
      { id: 'dpam21', left: 'A(−3; 1), B(6; 1), C(3; 5), D(−1; 4) négyszög', right: '23' },
      { id: 'dpam22', left: 'Négyzet, szomszédos csúcsai A(1; 2) és B(6; −10)', right: '169' },
      { id: 'dpam23', left: 'Négyzet, szemközti csúcsai A(7; −3) és C(1; 5)', right: '50' },
      { id: 'dpam24', left: 'P(1; −4), Q(7; 2), R(−5; −2) háromszög', right: '24' }
    ]
  }
];

const DISTANCE_PERIMETER_AREA_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DISTANCE_PERIMETER_AREA_MATCHER_LEVELS_LIST[0],
  2: DISTANCE_PERIMETER_AREA_MATCHER_LEVELS_LIST[1],
  3: DISTANCE_PERIMETER_AREA_MATCHER_LEVELS_LIST[2]
};

export const DistancePerimeterAreaMatcher: React.FC<DistancePerimeterAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-tavolsag-terulet-matcher',
  topicTitle = '6. Távolság, kerület, terület – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="tavolsag-kerulet-terulet"
      title={topicTitle}
      subtitle="Gyakorold a távolság-, kerület- és területszámítást koordinátákkal: képletek, pontpárok, sokszögek!"
      levels={DISTANCE_PERIMETER_AREA_MATCHER_LEVELS}
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

export default DistancePerimeterAreaMatcher;
