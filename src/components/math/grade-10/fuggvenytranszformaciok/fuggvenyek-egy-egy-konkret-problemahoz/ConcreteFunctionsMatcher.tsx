import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConcreteFunctionsMatcherProps {
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
    title: 'Gyakorlati változók és jelentésük',
    subtitle: 'Párosítsd a matematikai jelöléseket a valós fizikai és gazdasági jelentésükkel!',
    pairs: [
      {
        id: 'cfm1-1',
        prompt: 'x a pólóvásárlásnál',
        value: 'Vásárolt pólók darabszáma (db)'
      },
      {
        id: 'cfm1-2',
        prompt: 'F(x) a pólóvásárlásnál',
        value: 'Fizetendő teljes végösszeg (Ft)'
      },
      {
        id: 'cfm1-3',
        prompt: 'x a kordonfeladatban',
        value: 'A bekerített téglalap szélessége (m)'
      },
      {
        id: 'cfm1-4',
        prompt: 'T(x) a kordonfeladatban',
        value: 'A bekerített rész területe (m²)'
      },
      {
        id: 'cfm1-5',
        prompt: 't a tartály töltésénél',
        value: 'Eltelt idő a csap nyitása óta (perc)'
      },
      {
        id: 'cfm1-6',
        prompt: 'V(t) a tartály töltésénél',
        value: 'Tartályban lévő vízmennyiség (liter)'
      },
      {
        id: 'cfm1-7',
        prompt: 'v a féktávolságnál',
        value: 'Gépjármű haladási sebessége (km/h)'
      },
      {
        id: 'cfm1-8',
        prompt: 's(v) a fékút képletében',
        value: 'Megállásig megtett fékút (méter)'
      }
    ]
  },
  2: {
    title: 'Szöveges helyzetek és hozzárendelési szabályok',
    subtitle: 'Párosítsd a szituációt a hozzá tartozó pontos matematikai képlettel!',
    pairs: [
      {
        id: 'cfm2-1',
        prompt: '4 oldalú kordon területe (K = 46 m)',
        value: 'T(x) = x · (23 - x)'
      },
      {
        id: 'cfm2-2',
        prompt: '1 fal menti kordon területe (K = 46 m)',
        value: 'T(x) = x · (46 - 2x)'
      },
      {
        id: 'cfm2-3',
        prompt: 'Sarokba zárt kordon területe (K = 46 m)',
        value: 'T(x) = x · (46 - x)'
      },
      {
        id: 'cfm2-4',
        prompt: 'Pólók fizetendő összege (4000 Ft, -200 Ft/db)',
        value: 'F(x) = x · (4000 - 200x)'
      },
      {
        id: 'cfm2-5',
        prompt: 'Póló darabára (egységár)',
        value: 'E(x) = 4000 - 200x'
      },
      {
        id: 'cfm2-6',
        prompt: 'DVD csomagár képlete',
        value: 'A(x) = 100 · (x - 3)² + 700'
      },
      {
        id: 'cfm2-7',
        prompt: 'Tartály: 50 l + 12 l/perc befolyás',
        value: 'V(t) = 50 + 12t'
      },
      {
        id: 'cfm2-8',
        prompt: 'Fix költség 10 000 Ft + 500 Ft/db',
        value: 'K(x) = 10 000 + 500x'
      }
    ]
  },
  3: {
    title: 'Szélsőértékek és reális határok',
    subtitle: 'Párosítsd az egyes modellek optimális értékeit és kritikus pontjait!',
    pairs: [
      {
        id: 'cfm3-1',
        prompt: '4 oldalú kordon max területe',
        value: '132,25 m² (x = 11,5 m)'
      },
      {
        id: 'cfm3-2',
        prompt: '1 fal menti kordon max területe',
        value: '264,5 m² (x = 11,5 m)'
      },
      {
        id: 'cfm3-3',
        prompt: 'Sarokkordon max területe',
        value: '529 m² (x = 23 m)'
      },
      {
        id: 'cfm3-4',
        prompt: 'Pólóakció maximális bevétele',
        value: '20 000 Ft (x = 10 db)'
      },
      {
        id: 'cfm3-5',
        prompt: 'Pólóakció 0 Ft bevétele (ingyen)',
        value: 'x = 20 db esetén'
      },
      {
        id: 'cfm3-6',
        prompt: 'DVD csomag minimális összára',
        value: '700 Ft (x = 3 db)'
      },
      {
        id: 'cfm3-7',
        prompt: 'DVD csomag legolcsóbb darabára',
        value: '200 Ft/db (x = 4 db)'
      },
      {
        id: 'cfm3-8',
        prompt: 'Kordon reális Df tartománya',
        value: '0 < x < 23 nyílt intervallum'
      }
    ]
  }
};

export const ConcreteFunctionsMatcher: React.FC<ConcreteFunctionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'fuggvenyek-egy-egy-konkret-problemahoz',
  topicTitle = 'Függvények egy-egy konkrét problémához'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

