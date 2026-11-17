import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BoxesCard, ShareCard, JoinCard, BalloonCard, DotRowsCard, BarsCard, DoubleBarsCard, PurseCard, BusCard } from './WordProblems100G3CardFigures';

interface WordProblems100G3MatcherProps {
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

const WORD_PROBLEMS_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik számfeladat?',
    description: 'Párosítsd a rövid történetet a számfeladattal!',
    pairs: [
      { id: 'wp100m1', left: '24 madár ült a fán, 6 elrepült.', right: '24 − 6' },
      { id: 'wp100m2', left: '24 piros és 6 kék golyó.', right: '24 + 6' },
      { id: 'wp100m3', left: 'Hány cukor van?', promptFigure: <BoxesCard n={4} each={6} />, right: '4 · 6' },
      { id: 'wp100m4', left: 'Egyenlően elosztják.', promptFigure: <ShareCard total={24} people={4} />, right: '24 : 4' },
      { id: 'wp100m5', left: 'Hányan vannak együtt?', promptFigure: <JoinCard a={30} b={5} />, right: '30 + 5' },
      { id: 'wp100m6', left: 'Hány lufi maradt?', promptFigure: <BalloonCard total={30} gone={5} />, right: '30 − 5' },
      { id: 'wp100m7', left: 'Hány szék?', promptFigure: <DotRowsCard rows={3} cols={5} color="#60a5fa" />, right: '3 · 5' },
      { id: 'wp100m8', left: '30 tojás, egy dobozba 6 fér. Hány doboz?', right: '30 : 6' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Több vagy kevesebb?',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'wp100m9', left: '', promptFigure: <BarsCard top="40" diff={7} kind="more" />, right: '47' },
      { id: 'wp100m10', left: '', promptFigure: <BarsCard top="40" diff={7} kind="less" />, right: '33' },
      { id: 'wp100m11', left: '', promptFigure: <BarsCard top="60" diff={9} kind="more" />, right: '69' },
      { id: 'wp100m12', left: '', promptFigure: <BarsCard top="60" diff={9} kind="less" />, right: '51' },
      { id: 'wp100m13', left: 'A piros 85 cm, ez 6 cm-rel hosszabb a kéknél. A kék:', right: '79 cm' },
      { id: 'wp100m14', left: 'A kék 72 cm, ez 8 cm-rel rövidebb a pirosnál. A piros:', right: '80 cm' },
      { id: 'wp100m15', left: 'A 25 kétszerese', promptFigure: <DoubleBarsCard value={25} />, right: '50' },
      { id: 'wp100m16', left: 'Háromszor annyi, mint 9', right: '27' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Két lépésben',
    description: 'Számold ki a kétlépéses feladatot, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'wp100m17', left: 'Dobozban 6-6, külön 8 kréta', promptFigure: <BoxesCard n={5} each={6} extra={8} />, right: '38 kréta' },
      { id: 'wp100m18', left: '60 Ft-ból vettem ezt a kettőt. Maradt:', promptFigure: <PurseCard money={60} prices={[15, 20]} />, right: '25 Ft' },
      { id: 'wp100m19', left: '34 utas, 12 fel, 9 le', promptFigure: <BusCard onBoard="34" up={12} down={9} />, right: '37 utas' },
      { id: 'wp100m20', left: 'A szürke elhervadt. Hány maradt?', promptFigure: <DotRowsCard rows={2} cols={9} grey={4} color="#4ade80" />, right: '14 virág' },
      { id: 'wp100m21', left: '36 dió 4 tálba egyenlően, egy tálból elvettünk 2-t. Abban maradt:', right: '7 dió' },
      { id: 'wp100m22', left: 'Kék 18, piros 5-tel több. Összesen:', promptFigure: <BarsCard top="18" diff={5} kind="more" />, right: '41 golyó' },
      { id: 'wp100m23', left: '4 csomagban 10-10 lap, elhasználtam 12-t', right: '28 lap' },
      { id: 'wp100m24', left: '8 órakor indultunk, 3 órát gyalogoltunk, 2 órát pihentünk', right: '13 óra' }
    ]
  }
];

export const WORD_PROBLEMS_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WORD_PROBLEMS_100_G3_MATCHER_LEVELS_LIST[0],
  2: WORD_PROBLEMS_100_G3_MATCHER_LEVELS_LIST[1],
  3: WORD_PROBLEMS_100_G3_MATCHER_LEVELS_LIST[2]
};

export const WordProblems100G3Matcher: React.FC<WordProblems100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-szoveges-matcher',
  topicTitle = '5. Szöveges feladatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Párosítsd a történeteket a számfeladattal vagy az eredménnyel!"
      levels={WORD_PROBLEMS_100_G3_MATCHER_LEVELS}
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

export default WordProblems100G3Matcher;
