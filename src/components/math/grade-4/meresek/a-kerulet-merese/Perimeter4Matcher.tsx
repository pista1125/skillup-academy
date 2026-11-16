import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Perimeter4MatcherProps {
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

const PERIMETER4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Síkidomok kerülete',
    description: 'Párosítsd a síkidomot a kerületével!',
    pairs: [
      { id: 'p4m1', left: 'kerület', right: 'az oldalak hosszának összege' },
      { id: 'p4m2', left: 'négyzet, oldala 3 cm', right: '12 cm' },
      { id: 'p4m3', left: 'egyenlő oldalú háromszög, oldala 5 cm', right: '15 cm' },
      { id: 'p4m4', left: 'téglalap, oldalai 5 cm és 2 cm', right: '14 cm' },
      { id: 'p4m5', left: 'négyzet, oldala 4 cm', right: '16 cm' },
      { id: 'p4m6', left: 'háromszög, oldalai 2 cm, 3 cm, 4 cm', right: '9 cm' },
      { id: 'p4m7', left: 'hatszög, minden oldala 3 cm', right: '18 cm' },
      { id: 'p4m8', left: 'téglalap, oldalai 10 cm és 1 cm', right: '22 cm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tavak, tablók, pálcikák',
    description: 'Párosítsd az adatokat a kerülettel! Figyelj a mértékegységekre!',
    pairs: [
      { id: 'p4m9', left: 'négyzet alakú tó, oldala 2 m', right: '8 m' },
      { id: 'p4m10', left: 'négyzet alakú tó, oldala 2500 mm', right: '10 000 mm' },
      { id: 'p4m11', left: 'négyzet alakú tó, oldala 200 cm', right: '800 cm' },
      { id: 'p4m12', left: 'tabló 500 mm × 350 mm', right: '1700 mm' },
      { id: 'p4m13', left: 'tabló 420 mm × 297 mm', right: '1434 mm' },
      { id: 'p4m14', left: 'tabló 700 mm × 500 mm', right: '2400 mm' },
      { id: 'p4m15', left: 'négyzet 4 db 8 cm-es pálcikából', right: '32 cm' },
      { id: 'p4m16', left: 'hatszög 6 db 8 cm-es pálcikából', right: '48 cm' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kerítések és hiányzó oldalak',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'p4m17', left: 'Medence 33 m × 21 m körbejárva', right: '108 m' },
      { id: 'p4m18', left: 'Telek 22 m × 12 m kerítése', right: '68 m' },
      { id: 'p4m19', left: '68 m-es kerítés, 4 méterenként oszlop körben', right: '17 oszlop' },
      { id: 'p4m20', left: 'Veteményes 5 m × 12 m kerítése', right: '34 m' },
      { id: 'p4m21', left: 'Füves rész 17 m × 12 m kerítése', right: '58 m' },
      { id: 'p4m22', left: 'Négyzet, K = 36 m – egy oldala', right: '9 m' },
      { id: 'p4m23', left: 'Téglalap, K = 20 cm, egyik oldala 6 cm – a másik', right: '4 cm' },
      { id: 'p4m24', left: 'Négyzet, K = 2 m 40 cm – egy oldala', right: '60 cm' }
    ]
  }
];

const PERIMETER4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: PERIMETER4_MATCHER_LEVELS_LIST[0],
  2: PERIMETER4_MATCHER_LEVELS_LIST[1],
  3: PERIMETER4_MATCHER_LEVELS_LIST[2]
};

export const Perimeter4Matcher: React.FC<Perimeter4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-kerulet-matcher',
  topicTitle = '2. A kerület mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-kerulet-merese"
      title={topicTitle}
      subtitle="Párosítsd a síkidomokat, a kerteket és a kerítéseket a kerületükkel!"
      levels={PERIMETER4_MATCHER_LEVELS}
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

export default Perimeter4Matcher;
