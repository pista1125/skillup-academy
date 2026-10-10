import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PercentSummaryMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető Százalékok, Törtek és Kiszámítások',
    subtitle: 'Párosítsd a százalékértékeket és tört alakokat a helyes megfelelőjükkel!',
    pairs: [
      { id: 'p1', prompt: '25% tört és tizedes alakban', value: '1/4 = 0,25' },
      { id: 'p2', prompt: '20% tört és tizedes alakban', value: '1/5 = 0,20' },
      { id: 'p3', prompt: '12,5% tört alakban', value: '1/8 = 0,125' },
      { id: 'p4', prompt: '75% tört és tizedes alakban', value: '3/4 = 0,75' },
      { id: 'p5', prompt: '400 Ft-nak a 15%-a', value: '60 Ft' },
      { id: 'p6', prompt: 'Ha a 20% az 50 Ft, mennyi a 100%?', value: '250 Ft (50 : 0,20)' },
      { id: 'p7', prompt: '80-ból a 20 hány százalék?', value: '25% (20/80 · 100%)' },
      { id: 'p8', prompt: '1 ezrelék (1‰) értéke', value: '0,001 (1/1000 = 0,1%)' }
    ]
  },
  2: {
    title: '2. Szint: Árváltozások és Szorzótényezők',
    subtitle: 'Keresd meg a százalékos árváltozásokhoz tartozó helyes szorzót vagy új árat!',
    pairs: [
      { id: 'p9', prompt: '+15%-os áremelés szorzója', value: '· 1,15' },
      { id: 'p10', prompt: '-20%-os leértékelés szorzója', value: '· 0,80' },
      { id: 'p11', prompt: '27% ÁFA felszámolása a nettó árra', value: '· 1,27 (Bruttó ár)' },
      { id: 'p12', prompt: '50 000 Ft +10%-os növekedés után', value: '55 000 Ft' },
      { id: 'p13', prompt: '40 000 Ft -25%-os akció után', value: '30 000 Ft' },
      { id: 'p14', prompt: '60 000 Ft elosztása 2 : 3 arányban', value: '24 000 Ft és 36 000 Ft' },
      { id: 'p15', prompt: 'Egyenes arányosság matematikai alakja', value: 'y/x = c (állandó hányados)' },
      { id: 'p16', prompt: 'Fordított arányosság matematikai alakja', value: 'x · y = c (állandó szorzat)' }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Keverési Eredmények',
    subtitle: 'Párosítsd az összetett százalékszámítási feladatokat a pontos eredménnyel!',
    pairs: [
      { id: 'p17', prompt: '+20% majd -20% árváltozás végeredménye', value: '4%-os csökkenés (0,96-szoros)' },
      { id: 'p18', prompt: '+25% majd -20% árváltozás végeredménye', value: '0% változás (eredeti ár)' },
      { id: 'p19', prompt: '200 g 10%-os sóoldat sótartalma', value: '20 g só' },
      { id: 'p20', prompt: '20 g só 180 g vízben oldva', value: '10%-os sóoldat (20 : 200 = 10%)' },
      { id: 'p21', prompt: 'Bruttó 12 700 Ft nettó ára 27% ÁFA mellett', value: '10 000 Ft (12 700 : 1,27)' },
      { id: 'p22', prompt: 'Akciós ár 6800 Ft (-15% után), mi volt az eredeti ár?', value: '8000 Ft (6800 : 0,85)' },
      { id: 'p23', prompt: '16 millió Ft-os lakás 15%-os előlege', value: '2,4 millió Ft' },
      { id: 'p24', prompt: '300 g 20%-os oldat + 100 g víz új töménysége', value: '15%-os oldat (60 : 400 = 15%)' }
    ]
  }
};

export const PercentSummaryMatcher: React.FC<PercentSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-percentages',
  topicTitle = '8. Összefoglalás'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      levels={matcherLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="rose"
    />
  );
};

export default PercentSummaryMatcher;
