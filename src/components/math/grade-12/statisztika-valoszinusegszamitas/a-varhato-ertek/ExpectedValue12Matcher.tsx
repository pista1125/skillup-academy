import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExpectedValue12MatcherProps {
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

const EV_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'evm1', left: 'várható érték', right: 'a kimenetelek valószínűségekkel súlyozott átlaga' },
      { id: 'evm2', left: 'E', right: 'a várható érték jele' },
      { id: 'evm3', left: 'relatív gyakoriság', right: 'valószínűség (statisztikai párja)' },
      { id: 'evm4', left: 'átlag, súlyozott átlag', right: 'várható érték (statisztikai párja)' },
      { id: 'evm5', left: 'a valószínűségek összege', right: 'mindig 1' },
      { id: 'evm6', left: 'szórás egy befektetésnél', right: 'a kockázat mértéke' },
      { id: 'evm7', left: 'diverzifikációs hatás', right: 'többféle befektetéssel csökken a kockázat' },
      { id: 'evm8', left: 'szervező várható nyeresége', right: 'tét − várható nyeremény' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kísérlet és várható érték',
    description: 'Párosítsd a kísérletet a várható értékkel!',
    pairs: [
      { id: 'evm9', left: 'egy szabályos kockával dobott szám', right: '3,5' },
      { id: 'evm10', left: 'fejek száma 1 pénzérménél', right: '0,5' },
      { id: 'evm11', left: 'fejek száma 2 pénzérménél', right: '1' },
      { id: 'evm12', left: 'fejek száma 3 pénzérménél', right: '1,5' },
      { id: 'evm13', left: 'két kockával dobott számok összege', right: '7' },
      { id: 'evm14', left: 'kerék 4 egyenlő cikkel: 0, 100, 200, 500 Ft', right: '200 Ft' },
      { id: 'evm15', left: 'a vurstli kereke (0, 0, 100, 200, 900, 1200 Ft)', right: '400 Ft' },
      { id: 'evm16', left: 'a céltábla egy lövése (10, 20, 40, 50)', right: '22,5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Feladatok eredménye',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'evm17', left: 'A részvény várható hozama (22%, −12%, 8%)', right: '7%' },
      { id: 'evm18', left: 'B részvény várható hozama (−2%, 16%, 10%)', right: '6,4%' },
      { id: 'evm19', left: 'fele A, fele B várható hozama', right: '6,7%' },
      { id: 'evm20', left: 'árfolyam: 5640 (0,3), 5710 (0,6), 5120 (0,1) Ft', right: '5630 Ft' },
      { id: 'evm21', left: 'várható hozam 5330 Ft-os jelenlegi árnál', right: '≈ 5,63%' },
      { id: 'evm22', left: 'kupon: 90% 1000, 8% 2000, 2% 8000 Ft', right: '1220 Ft' },
      { id: 'evm23', left: 'sorsjegy: 10% 700, 9% 2000, 1% 10 000 Ft', right: '350 Ft' },
      { id: 'evm24', left: 'az A részvény hozamának szórása', right: '≈ 16,0%' }
    ]
  }
};

export const ExpectedValue12Matcher: React.FC<ExpectedValue12MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-varhato-ertek-matcher',
  topicTitle = '9. A várható érték – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="a-varhato-ertek"
      title={topicTitle}
      subtitle="Gyakorold a várható érték fogalmát, kiszámítását és alkalmazásait!"
      levels={EV_MATCHER_LEVELS}
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

export default ExpectedValue12Matcher;
