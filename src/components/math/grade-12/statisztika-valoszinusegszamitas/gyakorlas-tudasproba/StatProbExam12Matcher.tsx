import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatProbExam12MatcherProps {
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

const STAT_PROB_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Statisztikai fogalmak',
    description: 'Párosítsd a statisztikai fogalmat a meghatározásával!',
    pairs: [
      { id: 'spem1', left: 'reprezentatív minta', right: 'a minta adatai jól tükrözik a teljes sokaságot' },
      { id: 'spem2', left: 'medián', right: 'a rendezett adatsor középső eleme' },
      { id: 'spem3', left: 'módusz', right: 'a leggyakoribb adat' },
      { id: 'spem4', left: 'szórás', right: 'az átlagtól való eltérések négyzetei átlagának gyöke' },
      { id: 'spem5', left: 'félterjedelem', right: 'Q3 − Q1' },
      { id: 'spem6', left: 'kiugró adat', right: 'Q3 fölött vagy Q1 alatt több mint 1,5 · (Q3 − Q1)-gyel tér el' },
      { id: 'spem7', left: 'osztályközép', right: 'az osztályt határoló két érték számtani közepe' },
      { id: 'spem8', left: 'relatív szórás', right: 'a szórás és az átlag hányadosa' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Valószínűségszámítási fogalmak',
    description: 'Párosítsd a fogalmat vagy jelölést a jelentésével!',
    pairs: [
      { id: 'spem9', left: 'eseménytér (H)', right: 'az elemi események halmaza' },
      { id: 'spem10', left: 'A + B', right: 'legalább az egyik esemény bekövetkezik' },
      { id: 'spem11', left: 'A · B', right: 'mindkét esemény bekövetkezik' },
      { id: 'spem12', left: 'Ā', right: 'pontosan akkor következik be, ha A nem' },
      { id: 'spem13', left: 'független események', right: 'P(A · B) = P(A) · P(B)' },
      { id: 'spem14', left: 'geometriai valószínűség', right: 'kedvező terület (hossz, szög) / teljes' },
      { id: 'spem15', left: 'várható érték', right: 'a kimenetelek valószínűségekkel súlyozott átlaga' },
      { id: 'spem16', left: 'binomiális eloszlás', right: '(n alatt k) · p^k · (1 − p)^{n − k}' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tudáspróba-eredmények',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'spem17', left: 'János angoljegyei (medián 4, átlag 2,8)', right: '1; 1; 4; 4; 4' },
      { id: 'spem18', left: 'Eszter éves átlaga (9 jegy: 3, 6 jegy: 4,5)', right: '3,6' },
      { id: 'spem19', left: 'kupon várható értéke', right: '1220 Ft' },
      { id: 'spem20', left: 'hatoslottó: pontosan 2 szám osztható 6-tal', right: '≈ 0,190' },
      { id: 'spem21', left: 'két kocka: összeg 5 vagy szorzat 4', right: '5/36' },
      { id: 'spem22', left: 'mérges pók (p = 0,7): 5 alkalomból egyszer sem', right: '≈ 0,0024' },
      { id: 'spem23', left: 'tudáspróba szerencsekereke: E', right: '≈ 1166,67 Ft' },
      { id: 'spem24', left: 'kördiagram: közepes eredmények a 24 fős osztályban', right: '7 fő' }
    ]
  }
};

export const StatProbExam12Matcher: React.FC<StatProbExam12MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-tudasproba-matcher',
  topicTitle = '11. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a teljes statisztika és valószínűségszámítás fejezetet!"
      levels={STAT_PROB_EXAM_MATCHER_LEVELS}
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

export default StatProbExam12Matcher;
