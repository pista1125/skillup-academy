import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChainCard, MiniBar, MiniRoute, MiniCoins, MiniRows } from './MixedOps1000G3CardFigures';

interface Props {
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

export const MIXED_OPS_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hiányzó szám',
    description: 'Melyik szám illik a □ helyére?',
    pairs: [
      { id: 'mo1000m1', left: '□ + 386 = 912', promptFigure: <MiniBar whole="912" a="□" b="386" />, right: '526' },
      { id: 'mo1000m2', left: '450 + □ = 800', promptFigure: <MiniBar whole="800" a="450" b="□" />, right: '350' },
      { id: 'mo1000m3', left: '□ − 240 = 510', promptFigure: <MiniBar whole="□" a="240" b="510" wa={0.4} />, right: '750' },
      { id: 'mo1000m4', left: '700 − □ = 265', promptFigure: <MiniBar whole="700" a="□" b="265" wa={0.6} />, right: '435' },
      { id: 'mo1000m5', left: '□ + 175 = 600', promptFigure: <MiniBar whole="600" a="□" b="175" wa={0.65} />, right: '425' },
      { id: 'mo1000m6', left: '630 − □ = 380', right: '250' },
      { id: 'mo1000m7', left: '□ − 99 = 401', right: '500' },
      { id: 'mo1000m8', left: '1000 − □ = 1', right: '999' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Útvonal és távolság',
    description: 'Számold ki a távolságot méterben!',
    pairs: [
      { id: 'mo1000m9', left: 'Az egész út?', promptFigure: <MiniRoute d1="275" d2="348" />, right: '623 m' },
      { id: 'mo1000m10', left: 'Az egész út?', promptFigure: <MiniRoute d1="196" d2="405" />, right: '601 m' },
      { id: 'mo1000m11', left: 'Az egész út?', promptFigure: <MiniRoute d1="330" d2="270" />, right: '600 m' },
      { id: 'mo1000m12', left: 'Az egész út?', promptFigure: <MiniRoute d1="418" d2="237" />, right: '655 m' },
      { id: 'mo1000m13', left: 'Az egész út?', promptFigure: <MiniRoute d1="156" d2="389" />, right: '545 m' },
      { id: 'mo1000m14', left: 'Mennyivel hosszabb az 512 m, mint a 287 m?', right: '225 m' },
      { id: 'mo1000m15', left: '1000 m-ből megtettél 640 m-t. Mennyi van hátra?', right: '360 m' },
      { id: 'mo1000m16', left: 'A 450 m-es utat oda-vissza megteszed.', right: '900 m' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Két lépés',
    description: 'Gondold végig, aztán párosíts!',
    pairs: [
      { id: 'mo1000m17', left: 'Elköltesz 345 Ft-ot. Mennyi marad?', promptFigure: <MiniCoins coins={[200, 200, 200, 200]} />, right: '455 Ft' },
      { id: 'mo1000m18', left: 'Veszel egy 520 Ft-os labdát. Mennyi marad?', promptFigure: <MiniCoins coins={[200, 200, 200, 100, 100]} />, right: '280 Ft' },
      { id: 'mo1000m19', left: '1. nap 230 km, 2. nap 145 km-rel több. Összesen?', promptFigure: <MiniRows a="230" diff="+145" more />, right: '605 km' },
      { id: 'mo1000m20', left: 'Piros: 410 gyöngy, kék: 95-tel kevesebb. Együtt?', promptFigure: <MiniRows a="410" diff="−95" more={false} />, right: '725 gyöngy' },
      { id: 'mo1000m21', left: '', promptFigure: <ChainCard start="560" ops={['− 275', '+ 130']} />, right: '415' },
      { id: 'mo1000m22', left: 'Gondoltam egy számot. 250-et hozzáadtam, 900 lett.', right: '650' },
      { id: 'mo1000m23', left: '1000 − (385 + 215)', right: '400' },
      { id: 'mo1000m24', left: 'Két szám összege 800. Az egyik 365. A másik?', right: '435' }
    ]
  }
};

export const MixedOps1000G3Matcher: React.FC<Props> = ({
  level = 1,
  currentLevel,
  topicId = 'g3-wops-vegyes-matcher',
  topicTitle = '4. Vegyes műveletek és szöveges feladatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="vegyes-muveletek-szoveges"
      title={topicTitle}
      subtitle="Párosítsd a feladatot a megoldásával!"
      levels={MIXED_OPS_1000_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      {...rest}
    />
  );
};

export default MixedOps1000G3Matcher;
