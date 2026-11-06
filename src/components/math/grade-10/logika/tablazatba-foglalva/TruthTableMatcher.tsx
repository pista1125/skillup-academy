import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TruthTableMatcherProps {
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
    title: 'De Morgan Azonosságok és Nyelvi Tagadásaik',
    subtitle: 'Párosítsd a logikai kifejezéseket a pontos De Morgan-átalakításukkal és nyelvi tagadásukkal!',
    pairs: [
      {
        id: 'tm1-1',
        prompt: '¬(A ∧ B)',
        value: '¬A ∨ ¬B (az ÉS tagadása VAGY)'
      },
      {
        id: 'tm1-2',
        prompt: '¬(A ∨ B)',
        value: '¬A ∧ ¬B (a VAGY tagadása ÉS)'
      },
      {
        id: 'tm1-3',
        prompt: '„Minden szekrény barna vagy kétajtós” tagadása',
        value: '„Van szekrény, ami nem barna ÉS nem kétajtós”'
      },
      {
        id: 'tm1-4',
        prompt: '„Van olyan bicikli, ami kényelmes és felszerelt” tagadása',
        value: '„Minden bicikli kényelmetlen VAGY nincs felszerelve”'
      },
      {
        id: 'tm1-5',
        prompt: '„A boltban van alma és körte is” tagadása',
        value: '„Nincs a boltban alma, VAGY nincs körte”'
      },
      {
        id: 'tm1-6',
        prompt: '„Ma esik az eső vagy fúj a szél” tagadása',
        value: '„Nem esik az eső ÉS nem fúj a szél sem”'
      }
    ]
  },
  2: {
    title: 'Igazságtáblázatok és Logikai Értékek',
    subtitle: 'Párosítsd a formulákat és táblázatos jellemzőiket a helyes értékekkel!',
    pairs: [
      {
        id: 'tm2-1',
        prompt: '¬(A ∧ B) értékei a 4 sorban',
        value: 'H, I, I, I (csak I ∧ I esetén hamis)'
      },
      {
        id: 'tm2-2',
        prompt: '¬(A ∨ B) értékei a 4 sorban',
        value: 'H, H, H, I (csak H ∨ H esetén igaz)'
      },
      {
        id: 'tm2-3',
        prompt: 'A ∨ ¬A (kizárt harmadik elve)',
        value: 'Tautológia: minden sorban IGAZ'
      },
      {
        id: 'tm2-4',
        prompt: 'A ∧ ¬A (ellentmondásmentesség)',
        value: 'Kontradikció: minden sorban HAMIS'
      },
      {
        id: 'tm2-5',
        prompt: '3 független állítás (A, B, C) táblázata',
        value: '2³ = 8 sorból áll'
      },
      {
        id: 'tm2-6',
        prompt: 'A ∨ (A ∧ B) elnyelési azonosság',
        value: 'Mindig A logikai értékével egyezik meg'
      }
    ]
  },
  3: {
    title: 'Híres Logikai Fejtörők Eredményei',
    subtitle: 'Párosítsd a tankönyvi logikai feladványokat a táblázatos levezetés végeredményével!',
    pairs: [
      {
        id: 'tm3-1',
        prompt: 'Kvarkus szobái (1 igaz, 1 hamis felirat)',
        value: 'A 2. szobában van a lány (az 1.-ben szörny)'
      },
      {
        id: 'tm3-2',
        prompt: 'Tündék 3 ládája (csak 1 felirat igaz)',
        value: 'A kulcs a 2. ládában rejtőzik'
      },
      {
        id: 'tm3-3',
        prompt: '3 indián és ruháik (senki sem a nevével egyező)',
        value: 'Szürke Egér sárga ruhát visel'
      },
      {
        id: 'tm3-4',
        prompt: '4 iskolás úszóverseny (szélső pálya nyert)',
        value: 'A győztes a Pál-völgyi iskola úszója'
      },
      {
        id: 'tm3-5',
        prompt: '„Nem mind arany, ami fénylik” közmondás',
        value: '„Van olyan fénylő dolog, ami nem arany”'
      },
      {
        id: 'tm3-6',
        prompt: '„Nincsen rózsa tövis nélkül” közmondás',
        value: '„Minden rózsa tövises”'
      }
    ]
  }
};

export const TruthTableMatcher: React.FC<TruthTableMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-logic-tablazat-matcher',
  topicTitle = '4. Igaz vagy hamis? Foglaljuk táblázatba!'
}) => {
  return (
    <MatcherTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={10}
      chapterId="logika"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
    />
  );
};

(TruthTableMatcher as any).matcherLevels = matcherLevels;

export default TruthTableMatcher;

