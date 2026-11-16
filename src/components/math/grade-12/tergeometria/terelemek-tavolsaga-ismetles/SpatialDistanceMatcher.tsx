import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpatialDistanceMatcherProps {
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

const SPATIAL_DISTANCE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a pontos jelentésével!',
    pairs: [
      { id: 'sdm1', left: 'metsző egyenesek', right: 'pontosan egy közös pontjuk van' },
      { id: 'sdm2', left: 'kitérő egyenesek', right: 'nincs olyan sík, amelyre mindkettő illeszkedik' },
      { id: 'sdm3', left: 'párhuzamos egyenesek', right: 'egy síkban vannak, és nincs közös pontjuk' },
      { id: 'sdm4', left: 'két sík metszésvonala', right: 'a két sík közös pontjai által alkotott egyenes' },
      { id: 'sdm5', left: 'pont és sík távolsága', right: 'a pontból a síkra állított merőleges szakasz hossza' },
      { id: 'sdm6', left: 'két ponthalmaz távolsága', right: 'a pontjaik között mért távolságok minimuma' },
      { id: 'sdm7', left: 'lapátló', right: 'a test egyik lapjára illeszkedő átló' },
      { id: 'sdm8', left: 'testátló', right: 'nem egy lapon lévő csúcsokat összekötő átló' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Átlók kiszámítása',
    description: 'Párosítsd a testet az átlója hosszával!',
    pairs: [
      { id: 'sdm9', left: 'a élű kocka lapátlója', right: 'f = a√2' },
      { id: 'sdm10', left: 'a élű kocka testátlója', right: 'e = a√3' },
      { id: 'sdm11', left: 'a, b, c élű téglatest testátlója', right: 'e = √(a² + b² + c²)' },
      { id: 'sdm12', left: '3, 4, 12 cm élű téglatest testátlója', right: '13 cm' },
      { id: 'sdm13', left: '2, 3, 6 cm élű téglatest testátlója', right: '7 cm' },
      { id: 'sdm14', left: '5 cm élű kocka testátlója', right: '≈ 8,66 cm' },
      { id: 'sdm15', left: 'kocka, amelynek lapátlója 10', right: 'testátló ≈ 12,25' },
      { id: 'sdm16', left: 'kocka, amelynek testátlója 30', right: 'lapátló ≈ 24,49' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Távolságok feladatokban',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'sdm17', left: 'pók fonálon, 2 × 4 × 2,5 m-es szoba', right: '≈ 5,12 m' },
      { id: 'sdm18', left: 'pók a falakon, 2 × 4 × 2,5 m-es szoba', right: '≈ 6,02 m' },
      { id: 'sdm19', left: '8 cm élű kocka testátlója és a többi csúcs', right: '≈ 6,53 cm' },
      { id: 'sdm20', left: '10 cm élű kocka középpontja és egy éle', right: '≈ 7,07 cm' },
      { id: 'sdm21', left: 'antenna magassága (14,5 m-es kötelek, 10 m-es négyzet)', right: '≈ 19 m' },
      { id: 'sdm22', left: 'lámpa és a legkisebb fal (2,8 × 4,2 × 6,3 m-es terem)', right: '3,15 m' },
      { id: 'sdm23', left: '5 × 8 m-es alaprajz, átlósík és a többi függőleges él', right: '≈ 4,24 m' },
      { id: 'sdm24', left: 'kocka éle, ha két szomszédos lapközéppont 21,92 cm-re van', right: '≈ 31 cm' }
    ]
  }
};

export const SpatialDistanceMatcher: React.FC<SpatialDistanceMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-terelemek-tavolsaga-matcher',
  topicTitle = '1. Térelemek távolsága (ismétlés) – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="terelemek-tavolsaga-ismetles"
      title={topicTitle}
      subtitle="Gyakorold a térelemek helyzetét, a lapátló és a testátló kiszámítását és a térbeli távolságokat!"
      levels={SPATIAL_DISTANCE_MATCHER_LEVELS}
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

export default SpatialDistanceMatcher;
