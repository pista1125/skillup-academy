import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpatialShapesMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Testelemek',
    subtitle: 'Párosítsd a térbeli testeket csúcsaik, éleik és lapjaik számával, illetve alapvető tulajdonságaikkal!',
    pairs: [
      { id: 'p1-1', prompt: 'Kocka csúcsainak száma (C)', value: '8 csúcs' },
      { id: 'p1-2', prompt: 'Kocka éleinek száma (É)', value: '12 él' },
      { id: 'p1-3', prompt: 'Kocka lapjainak száma (L)', value: '6 négyzetlap' },
      { id: 'p1-4', prompt: 'Poliéder meghatározása', value: 'Csak síklapok határolják' },
      { id: 'p1-5', prompt: 'Henger alaplapjainak alakja', value: 'Két párhuzamos kör' },
      { id: 'p1-6', prompt: 'Tetraéder (háromoldalú gúla)', value: '4 csúcs, 6 él, 4 lap' },
      { id: 'p1-7', prompt: 'Négyzet alapú gúla csúcsai', value: '5 csúcs (4 alap + 1 felső)' },
      { id: 'p1-8', prompt: 'Gömb felülete', value: 'Egyetlen zárt görbe felület' }
    ]
  },
  2: {
    title: '2. Szint: Euler-tétel és Kiterített Hálók',
    subtitle: 'Párosítsd az Euler-tétel adatait, a hasábok és gúlák tulajdonságait és a hálókat!',
    pairs: [
      { id: 'p2-1', prompt: 'Euler-féle poliédertétel', value: 'C + L = É + 2' },
      { id: 'p2-2', prompt: 'Háromoldalú hasáb élei (É)', value: '9 él (3 alap + 3 fedő + 3 oldal)' },
      { id: 'p2-3', prompt: 'Háromoldalú hasáb lapjai (L)', value: '5 lap (2 háromszög + 3 téglalap)' },
      { id: 'p2-4', prompt: 'Egyenes körhenger kiterített palástja', value: 'Téglalap' },
      { id: 'p2-5', prompt: 'Egyenes körkúp kiterített palástja', value: 'Körcikk' },
      { id: 'p2-6', prompt: 'L = 6, É = 12 poliéder csúcsai (C)', value: 'C = 8 csúcs' },
      { id: 'p2-7', prompt: 'Ötoldalú gúla lapjainak száma', value: '6 lap (1 ötszög + 5 háromszög)' },
      { id: 'p2-8', prompt: 'Téglatest testátlói', value: '4 darab egyenlő hosszúságú' }
    ]
  },
  3: {
    title: '3. Szint: Haladó Szabályok, Nézetek és Képletek',
    subtitle: 'Párosítsd a nézeteket, az n-oldalú testek képleteit és a különleges geometriai összefüggéseket!',
    pairs: [
      { id: 'p3-1', prompt: 'Kocka különböző hálóinak száma', value: '11 különböző kiterítés' },
      { id: 'p3-2', prompt: 'n-oldalú hasáb összes éle', value: 'É = 3n él' },
      { id: 'p3-3', prompt: 'n-oldalú gúla összes éle', value: 'É = 2n él' },
      { id: 'p3-4', prompt: 'Kocka elöl-, felül- és oldalnézete', value: 'Mindhárom azonos négyzet' },
      { id: 'p3-5', prompt: 'Henger elölnézete (szemből)', value: 'Téglalap' },
      { id: 'p3-6', prompt: 'Kúp elölnézete (szemből)', value: 'Egyenlő szárú háromszög' },
      { id: 'p3-7', prompt: 'C = 10, L = 7 test éleinek száma', value: 'É = 15 él (ötoldalú hasáb)' },
      { id: 'p3-8', prompt: 'n-oldalú hasáb csúcsai', value: 'C = 2n csúcs' }
    ]
  }
};

export const SpatialShapesMatcher: React.FC<SpatialShapesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-spatial-shapes-matcher',
  topicTitle = 'Alakzatok a térben - Párosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      config={matcherLevels[activeLevel]}
      levelConfig={matcherLevels[activeLevel]}
      themeColor="purple"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      title="Alakzatok a térben párosító"
      subtitle="Párosítsd a térbeli alakzatokat, felületeket és képleteket 3 szinten!"
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
    />
  );
};

(SpatialShapesMatcher as any).matcherLevels = matcherLevels;
(SpatialShapesMatcher as any).levels = matcherLevels;

export default SpatialShapesMatcher;
