import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { LineCard150, ArrowCard150, PieceCard150, PathCard150 } from './GeoIntroG2CardFigures';
import { P } from './GeoIntroG2Parts';

interface GeoIntroG2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Vonalak és nyilak',
    description: 'Párosítsd a rajzot a nevével!',
    pairs: [
      { id: 'gim1', left: '', right: 'egyenes vonal', promptFigure: <LineCard150 kind="egyenes" /> },
      { id: 'gim2', left: '', right: 'nyitott görbe vonal', promptFigure: <LineCard150 kind="gorbe" /> },
      { id: 'gim3', left: '', right: 'zárt görbe vonal', promptFigure: <LineCard150 kind="zartgorbe" /> },
      { id: 'gim4', left: '', right: 'törött vonal', promptFigure: <LineCard150 kind="torott" /> },
      { id: 'gim5', left: '', right: 'föl', promptFigure: <ArrowCard150 dir="U" /> },
      { id: 'gim6', left: '', right: 'le', promptFigure: <ArrowCard150 dir="D" /> },
      { id: 'gim7', left: '', right: 'jobbra', promptFigure: <ArrowCard150 dir="R" /> },
      { id: 'gim8', left: '', right: 'balra', promptFigure: <ArrowCard150 dir="L" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Logikai lapok',
    description: 'Melyik lapot írja le a kártya? Figyelj mind a 4 tulajdonságra!',
    pairs: [
      { id: 'gim9', left: '', right: 'nagy, piros, sima kör', promptFigure: <PieceCard150 piece={P('kor', 'piros', true, false)} /> },
      { id: 'gim10', left: '', right: 'kicsi, piros, sima kör', promptFigure: <PieceCard150 piece={P('kor', 'piros', false, false)} /> },
      { id: 'gim11', left: '', right: 'nagy, piros, lyukas kör', promptFigure: <PieceCard150 piece={P('kor', 'piros', true, true)} /> },
      { id: 'gim12', left: '', right: 'nagy, kék, sima négyzet', promptFigure: <PieceCard150 piece={P('negyzet', 'kek', true, false)} /> },
      { id: 'gim13', left: '', right: 'kicsi, sárga, lyukas háromszög', promptFigure: <PieceCard150 piece={P('haromszog', 'sarga', false, true)} /> },
      { id: 'gim14', left: '', right: 'kicsi, sárga, sima háromszög', promptFigure: <PieceCard150 piece={P('haromszog', 'sarga', false, false)} /> },
      { id: 'gim15', left: '', right: 'nagy, zöld, sima téglalap', promptFigure: <PieceCard150 piece={P('teglalap', 'zold', true, false)} /> },
      { id: 'gim16', left: '', right: 'kicsi, zöld, lyukas téglalap', promptFigure: <PieceCard150 piece={P('teglalap', 'zold', false, true)} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Utak és kódok',
    description: 'Melyik nyílsor rajzolja ezt az utat? Hova érsz a táblázatban?',
    pairs: [
      { id: 'gim17', left: '', right: '→ → ↑', promptFigure: <PathCard150 start={[1, 2]} dirs={['R', 'R', 'U']} /> },
      { id: 'gim18', left: '', right: '↑ ↑ →', promptFigure: <PathCard150 start={[1, 2]} dirs={['U', 'U', 'R']} /> },
      { id: 'gim19', left: '', right: '← ↓ ↓', promptFigure: <PathCard150 start={[3, 0]} dirs={['L', 'D', 'D']} /> },
      { id: 'gim20', left: '', right: '→ ↓ →', promptFigure: <PathCard150 start={[1, 0]} dirs={['R', 'D', 'R']} /> },
      { id: 'gim21', left: 'B2-ből: → →', right: 'D2' },
      { id: 'gim22', left: 'A1-ből: ↓ ↓', right: 'A3' },
      { id: 'gim23', left: 'C3-ból: ← ↑', right: 'B2' },
      { id: 'gim24', left: 'D4-ből: ↑ ↑ ←', right: 'C2' }
    ]
  }
];

export const GEO_INTRO_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const GeoIntroG2Matcher: React.FC<GeoIntroG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-geo-bevezeto-matcher',
  topicTitle = '1. Tájékozódás, vonalak, logikai lapok – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="geometria"
      topicId={topicId}
      subtopicId="bevezeto"
      title={topicTitle}
      subtitle="Párosítsd a vonalakat, a nyilakat, a logikai lapokat és az utakat!"
      levels={GEO_INTRO_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default GeoIntroG2Matcher;
