import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogicMatcherProps {
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
    title: '1. Szint: Állítások és Tagadások Párosítása',
    subtitle: 'Párosítsd a matematikai állításokat a pontos logikai tagadásukkal!',
    pairs: [
      {
        id: 'p1-1',
        prompt: 'Minden páros szám osztható 4-gyel',
        value: 'Van olyan páros szám, amely nem osztható 4-gyel'
      },
      {
        id: 'p1-2',
        prompt: 'Minden prímszám páratlan',
        value: 'Van olyan prímszám, amelyik páros'
      },
      {
        id: 'p1-3',
        prompt: 'A 24 osztható 3-mal',
        value: 'A 24 nem osztható 3-mal'
      },
      {
        id: 'p1-4',
        prompt: 'Van olyan 3-mal osztható szám, ami páros',
        value: 'Egyetlen 3-mal osztható szám sem páros'
      },
      {
        id: 'p1-5',
        prompt: 'Minden 5-re végződő szám osztható 5-tel',
        value: 'Van olyan 5-re végződő szám, ami nem osztható 5-tel'
      },
      {
        id: 'p1-6',
        prompt: 'Egy állítás pontosan akkor igaz',
        value: 'Ha a tagadása hamis'
      },
      {
        id: 'p1-7',
        prompt: 'Egy állítás cáfolásához elegendő',
        value: 'Pontosan egyetlen ellenpélda felmutatása'
      },
      {
        id: 'p1-8',
        prompt: 'Kijelentő mondat, amiről eldönthető, hogy igaz vagy hamis',
        value: 'Matematikai állítás'
      }
    ]
  },
  2: {
    title: '2. Szint: Feltételes Állítások és Megfordításaik',
    subtitle: 'Keresd meg az állítások helyes megfordítását vagy logikai tulajdonságát!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Ha a szám osztható 10-zel, akkor osztható 5-tel',
        value: 'Ha a szám osztható 5-tel, akkor osztható 10-zel'
      },
      {
        id: 'p2-2',
        prompt: 'Ha a szám osztható 9-cel, akkor osztható 3-mal',
        value: 'Ha a szám osztható 3-mal, akkor osztható 9-cel'
      },
      {
        id: 'p2-3',
        prompt: 'Ha a szám osztható 6-tal, akkor páros',
        value: 'Ha a szám páros, akkor osztható 6-tal'
      },
      {
        id: 'p2-4',
        prompt: 'Ha egy szám osztható 100-zal, akkor osztható 25-tel',
        value: 'Ha egy szám osztható 25-tel, akkor osztható 100-zal'
      },
      {
        id: 'p2-5',
        prompt: 'Egy igaz állítás megfordítása',
        value: 'Nem feltétlenül igaz állítás'
      },
      {
        id: 'p2-6',
        prompt: 'A 15 és a 25 ellenpélda arra az állításra, hogy',
        value: 'Minden 5-tel osztható szám osztható 10-zel is'
      },
      {
        id: 'p2-7',
        prompt: 'A 12 és a 15 ellenpélda arra az állításra, hogy',
        value: 'Minden 3-mal osztható szám osztható 9-cel is'
      },
      {
        id: 'p2-8',
        prompt: 'A 4 és a 8 ellenpélda arra az állításra, hogy',
        value: 'Minden páros szám osztható 6-tal is'
      }
    ]
  },
  3: {
    title: '3. Szint: Szükséges és Elégséges Feltételek',
    subtitle: 'Párosítsd a matematikai feltételeket a logikai szerepükkel!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'A 10-zel való oszthatóság az 5-tel való oszthatósághoz',
        value: 'Elégséges, de nem szükséges feltétel'
      },
      {
        id: 'p3-2',
        prompt: 'A párosság a 6-tal való oszthatósághoz',
        value: 'Szükséges, de nem elégséges feltétel'
      },
      {
        id: 'p3-3',
        prompt: 'A számjegyösszeg 3-as oszthatósága a 3-mal való oszthatósághoz',
        value: 'Szükséges és elégséges feltétel (ekvivalencia)'
      },
      {
        id: 'p3-4',
        prompt: 'A 100-zal való oszthatóság a 25-tel való oszthatósághoz',
        value: 'Elégséges, de nem szükséges feltétel'
      },
      {
        id: 'p3-5',
        prompt: 'A párosság a 4-gyel való oszthatósághoz',
        value: 'Szükséges, de nem elégséges feltétel'
      },
      {
        id: 'p3-6',
        prompt: 'Két egymást követő egész szám szorzata n · (n + 1)',
        value: 'Mindig osztható 2-vel (az egyik tényező páros)'
      },
      {
        id: 'p3-7',
        prompt: 'Három egymást követő egész szám szorzata n · (n + 1) · (n + 2)',
        value: 'Mindig osztható 6-tal (osztható 2-vel és 3-mal)'
      },
      {
        id: 'p3-8',
        prompt: 'Két egymást követő páratlan szám összege',
        value: 'Mindig osztható 4-gyel (4k + 4 = 4 · (k + 1))'
      }
    ]
  }
};

export const LogicMatcher: React.FC<LogicMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-logic',
  topicTitle = '4. Egy kis logika'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      levels={matcherLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
    />
  );
};

export default LogicMatcher;
