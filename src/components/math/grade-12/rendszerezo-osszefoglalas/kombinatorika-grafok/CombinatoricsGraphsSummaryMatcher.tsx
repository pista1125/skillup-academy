import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsGraphsSummaryMatcherProps {
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

const COMBINATORICS_GRAPHS_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Helyzet és képlet",
    description: "Párosítsd a helyzetet a hozzá tartozó képlettel!",
    pairs: [
      { id: "cgm101", left: "n különböző elem sorba rendezése", right: "n!" },
      { id: "cgm102", left: "k elem n-ből, sorrend számít, ismétlés nélkül", right: "n · (n − 1) · … · (n − k + 1)" },
      { id: "cgm103", left: "k elem n-ből, sorrend számít, ismétléssel", right: "nᵏ" },
      { id: "cgm104", left: "k elem n-ből, sorrend nem számít", right: "(n alatt k)" },
      { id: "cgm105", left: "n elemű halmaz összes részhalmaza", right: "2ⁿ" },
      { id: "cgm106", left: "n pontú teljes gráf éleinek száma", right: "(n alatt 2)" },
      { id: "cgm107", left: "a fokszámok összege", right: "2 · élek száma" },
      { id: "cgm108", left: "0!", right: "1" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Kifejezés és érték",
    description: "Párosítsd a kifejezést az értékével!",
    pairs: [
      { id: "cgm201", left: "5!", right: "120" },
      { id: "cgm202", left: "(8 alatt 3)", right: "56" },
      { id: "cgm203", left: "8 · 7 · 6", right: "336" },
      { id: "cgm204", left: "6³", right: "216" },
      { id: "cgm205", left: "(10 alatt 5)", right: "252" },
      { id: "cgm206", left: "2¹⁰", right: "1024" },
      { id: "cgm207", left: "(6 alatt 2)", right: "15" },
      { id: "cgm208", left: "(7 alatt 0)", right: "1" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladat és eredmény",
    description: "Párosítsd a tankönyvi feladatot az eredményével!",
    pairs: [
      { id: "cgm301", left: "7 ember belép, Péter nem második", right: "4320" },
      { id: "cgm302", left: "négyjegyű számok, amelyekben van 5-ös", right: "3168" },
      { id: "cgm303", left: "5 LED, legalább egy világít", right: "31" },
      { id: "cgm304", left: "8 fő egy sorban, Arnold a szélén", right: "10 080" },
      { id: "cgm305", left: "10 elemű halmaz legalább 7 elemű részhalmazai", right: "176" },
      { id: "cgm306", left: "a kocka lapjainak szomszédsági gráfja: élek", right: "12" },
      { id: "cgm307", left: "9 ember, mindenki ismer mindenkit: ismeretségek", right: "36" },
      { id: "cgm308", left: "hatjegyűek szigorúan növekvő jegyekkel", right: "84" }
    ]
  }
};

export const CombinatoricsGraphsSummaryMatcher: React.FC<CombinatoricsGraphsSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-kombinatorika-grafok-matcher',
  topicTitle = "2. Kombinatorika, gráfok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="kombinatorika-grafok"
      title={topicTitle}
      subtitle="Párosítsd a kombinatorikai helyzeteket a képletükkel, a kifejezéseket az értékükkel és a feladatokat az eredményükkel!"
      levels={COMBINATORICS_GRAPHS_SUMMARY_MATCHER_LEVELS}
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

export default CombinatoricsGraphsSummaryMatcher;
