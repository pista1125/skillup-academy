import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsPractice1MatcherProps {
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

const COMBINATORICS_PRACTICE1_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Alapesetek és szabályok',
    description: 'Párosítsd az összeszámlálási helyzetet a megfelelő képlettel vagy módszerrel!',
    pairs: [
      { id: 'cp1m1', left: 'n különböző elem sorba rendezése (permutáció)', right: 'n!' },
      { id: 'cp1m2', left: 'k elem kiválasztása, számít a sorrend, nincs ismétlés', right: 'n · (n − 1) · … · (n − k + 1)' },
      { id: 'cp1m3', left: 'k elem kiválasztása, számít a sorrend, lehet ismétlés', right: 'nᵏ' },
      { id: 'cp1m4', left: 'k elem kiválasztása, nem számít a sorrend', right: '(n alatt k)' },
      { id: 'cp1m5', left: '0!', right: '1' },
      { id: 'cp1m6', left: '„és”: egyszerre meghozott döntések', right: 'A lehetőségek szorzata' },
      { id: 'cp1m7', left: '„vagy”: egymást kizáró esetek', right: 'A lehetőségek összege' },
      { id: 'cp1m8', left: 'Két elemnek egymás mellett kell állnia', right: 'Egy „objektumnak” tekintjük, majd · 2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Jutalmak, lámpák, sorok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'cp1m9', left: '10 fő, 2 különböző jutalom, mindenki legfeljebb egyet', right: '90' },
      { id: 'cp1m10', left: '10 fő, 2 különböző jutalom, valaki többet is kaphat', right: '100' },
      { id: 'cp1m11', left: '10 fő, 2 egyforma jutalom, mindenki legfeljebb egyet', right: '45' },
      { id: 'cp1m12', left: '10 fő, 2 egyforma jutalom, valaki többet is kaphat', right: '55' },
      { id: 'cp1m13', left: '7 lámpából legalább 5 világít', right: '29' },
      { id: 'cp1m14', left: 'A TÉGLALAP szó kiolvasása', right: '35' },
      { id: 'cp1m15', left: '5 vadállat, a tigris és az oroszlán egymás után', right: '48' },
      { id: 'cp1m16', left: '3 különböző karakteres jelszó 5 karakterből', right: '60' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Lottó, zsűri, autók',
    description: 'Párosítsd az összetett feladatot az eredményével!',
    pairs: [
      { id: 'cp1m17', left: 'Ötös lottó: 5 találatos szelvények', right: '1' },
      { id: 'cp1m18', left: 'Ötös lottó: 4 találatos szelvények', right: '425' },
      { id: 'cp1m19', left: 'Ötös lottó: 3 találatos szelvények', right: '35 700' },
      { id: 'cp1m20', left: 'Ötös lottó: 2 találatos szelvények', right: '987 700' },
      { id: 'cp1m21', left: 'Hatos lottó: összes tipp (45-ből 6)', right: '8 145 060' },
      { id: 'cp1m22', left: 'Zsűri: 13 főből 6, arány közömbös', right: '1716' },
      { id: 'cp1m23', left: 'Zsűri: 3 tanár az 5-ből és 3 diák a 8-ból', right: '560' },
      { id: 'cp1m24', left: '15 fő három egyforma 5 személyes autóban', right: '126 126' }
    ]
  }
];

const COMBINATORICS_PRACTICE1_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COMBINATORICS_PRACTICE1_MATCHER_LEVELS_LIST[0],
  2: COMBINATORICS_PRACTICE1_MATCHER_LEVELS_LIST[1],
  3: COMBINATORICS_PRACTICE1_MATCHER_LEVELS_LIST[2]
};

export const CombinatoricsPractice1Matcher: React.FC<CombinatoricsPractice1MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-gyakorlas-elso-matcher',
  topicTitle = '5. Gyakorlás – kombinatorika – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="gyakorlas-kombinatorika-1"
      title={topicTitle}
      subtitle="Párosítsd az alapeseteket a képletekkel és a tankönyvi gyakorló feladatokat az eredményeikkel!"
      levels={COMBINATORICS_PRACTICE1_MATCHER_LEVELS}
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

export default CombinatoricsPractice1Matcher;
