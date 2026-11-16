import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatProbSummaryMatcherProps {
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

const STAT_PROB_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Fogalmak",
    description: "Párosítsd a fogalmat a meghatározásával!",
    pairs: [
      { id: 'spm101', left: "átlag", right: "az adatok összege osztva az elemszámmal" },
      { id: 'spm102', left: "módusz", right: "a leggyakrabban előforduló adat" },
      { id: 'spm103', left: "medián", right: "a rendezett adatsor középső eleme" },
      { id: 'spm104', left: "terjedelem", right: "a legnagyobb és a legkisebb adat különbsége" },
      { id: 'spm105', left: "félterjedelem", right: "a felső és az alsó kvartilis különbsége" },
      { id: 'spm106', left: "szórás", right: "az átlagtól való eltérések négyzetátlagának gyöke" },
      { id: 'spm107', left: "relatív gyakoriság", right: "k/n" },
      { id: 'spm108', left: "várható érték", right: "a kimenetelek valószínűségekkel súlyozott átlaga" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Statisztikai jellemzők",
    description: "Párosítsd a kérdést a helyes értékkel!",
    pairs: [
      { id: 'spm201', left: "16; 20; …; 50 (20 dolgozat): medián", right: "40" },
      { id: 'spm202', left: "ugyanez: alsó kvartilis", right: "30" },
      { id: 'spm203', left: "ugyanez: terjedelem", right: "34" },
      { id: 'spm204', left: "osztályközepekkel számolt szórásnégyzet", right: "97,5" },
      { id: 'spm205', left: "14–20 táblázat (15 adat): átlag", right: "16,6" },
      { id: 'spm206', left: "12 + n úszó, 73,28 s összátlag: n", right: "8" },
      { id: 'spm207', left: "42; a; 30, átlag = medián + 2: a", right: "33" },
      { id: 'spm208', left: "12 fő 24 év, 8 férfi 25,5 év: a nők átlaga", right: "21 év" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Valószínűségek",
    description: "Párosítsd a kísérletet a valószínűséggel!",
    pairs: [
      { id: 'spm301', left: "két kockával az összeg 10", right: "1/12" },
      { id: 'spm302', left: "három érmével IFI", right: "1/8" },
      { id: 'spm303', left: "két kockával az összeg prím", right: "5/12" },
      { id: 'spm304', left: "3 piros + 5 sárga, 2 húzás: mindkettő piros", right: "3/28" },
      { id: 'spm305', left: "20 tétel, 5 húzás visszatevéssel: pontosan 3 magyar", right: "0,3087" },
      { id: 'spm306', left: "két kocka nagyobbik értékének várható értéke", right: "161/36" },
      { id: 'spm307', left: "kétjegyű szám osztható 8-cal", right: "11/90" },
      { id: 'spm308', left: "12 érme, pontosan 6 fej", right: "924/4096" }
    ]
  }
};

export const StatProbSummaryMatcher: React.FC<StatProbSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-statisztika-valoszinuseg-matcher',
  topicTitle = "10. Statisztika, valószínűségszámítás – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="statisztika-valoszinusegszamitas"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a meghatározásukkal, az adatsorokat a jellemzőikkel és a valószínűségi feladatokat az eredményükkel!"
      levels={STAT_PROB_SUMMARY_MATCHER_LEVELS}
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

export default StatProbSummaryMatcher;
