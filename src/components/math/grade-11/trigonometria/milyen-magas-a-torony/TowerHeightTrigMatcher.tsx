import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TowerHeightTrigMatcherProps {
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

const TOWER_HEIGHT_TRIG_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A mérés fogalmai',
    description: 'Párosítsd a fogalmakat és szakaszokat a jelentésükkel vagy a kiszámítás módjával!',
    pairs: [
      { id: 'thtm1', left: 'Az AKB háromszög derékszöge', right: 'az A talppontnál' },
      { id: 'thtm2', left: 'Az AKL háromszög derékszöge', right: 'a K pontnál' },
      { id: 'thtm3', left: 'A torony magassága (AB)', right: 'AK · tg AKB∢' },
      { id: 'thtm4', left: 'A talppont távolsága K-tól (AK)', right: 'KL · tg ALK∢' },
      { id: 'thtm5', left: 'A talppont távolsága L-től (AL)', right: 'KL : cos ALK∢' },
      { id: 'thtm6', left: 'Depressziószög', right: 'a lejjebb lévő pontra irányuló látósugár és a vízszintes sík szöge' },
      { id: 'thtm7', left: 'Emelkedési szög', right: 'a feljebb lévő pontra irányuló látósugár és a vízszintes sík szöge' },
      { id: 'thtm8', left: 'Egyenes és sík hajlásszöge', right: 'az egyenes és a síkra eső merőleges vetületének szöge' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A toronymérés számadatai',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'thtm9', left: 'AK = 250 · tg 36°', right: '≈ 182 m' },
      { id: 'thtm10', left: 'AB = AK · tg 32°', right: '≈ 114 m' },
      { id: 'thtm11', left: 'AL = 250 : cos 36°', right: '≈ 309 m' },
      { id: 'thtm12', left: 'A torony látószöge L-ből', right: '≈ 20°' },
      { id: 'thtm13', left: 'A torony látószöge a KL felezőpontjából', right: '≈ 27,2°' },
      { id: 'thtm14', left: 'Ennyit menjünk K-tól, hogy 15°-ban lássuk', right: '≈ 383 m' },
      { id: 'thtm15', left: 'Torony: K-ból 28°, a 250 m-re lévő L-ből 18°', right: '≈ 102,6 m' },
      { id: 'thtm16', left: 'Fa: szemmagasság 6 m, alja 10°, teteje 22°', right: '≈ 19,7 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Lámpák és testek',
    description: 'Párosítsd a térbeli feladatot az eredményével!',
    pairs: [
      { id: 'thtm17', left: '40°-os LED 40 cm magasan ⇒ megvilágított kör átmérője', right: '≈ 29,1 cm' },
      { id: 'thtm18', left: '110°-os LED 40 cm magasan ⇒ megvilágított kör átmérője', right: '≈ 114,3 cm' },
      { id: 'thtm19', left: '80 cm-es asztal, lámpa 0,6 m-en ⇒ legkisebb világítási szög', right: '≈ 67,4°' },
      { id: 'thtm20', left: 'Gúla alakú tető (10 m, 40°) magassága', right: '≈ 4,2 m' },
      { id: 'thtm21', left: 'Gúla alakú tető (10 m, 40°) befedendő felülete', right: '≈ 130,5 m²' },
      { id: 'thtm22', left: 'Kocka testátlója és a fedőlap szöge', right: '≈ 35,3°' },
      { id: 'thtm23', left: 'Szabályos tetraéder oldaléle és az alaplap szöge', right: '≈ 54,7°' },
      { id: 'thtm24', left: 'A Szabadság-szobor legnagyobb látószöge', right: 'kb. 66 m-ről ≈ 19,2°' }
    ]
  }
];

const TOWER_HEIGHT_TRIG_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TOWER_HEIGHT_TRIG_MATCHER_LEVELS_LIST[0],
  2: TOWER_HEIGHT_TRIG_MATCHER_LEVELS_LIST[1],
  3: TOWER_HEIGHT_TRIG_MATCHER_LEVELS_LIST[2]
};

export const TowerHeightTrigMatcher: React.FC<TowerHeightTrigMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-torony-matcher',
  topicTitle = 'Ráadás: Milyen magas a torony? – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="milyen-magas-a-torony"
      title={topicTitle}
      subtitle="Gyakorold a toronymérés lépéseit, a térbeli derékszögű háromszögeket és a tankönyvi eredményeket!"
      levels={TOWER_HEIGHT_TRIG_MATCHER_LEVELS}
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

export default TowerHeightTrigMatcher;
