import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeApplicationSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Szélsőérték jellege valós kontextusban',
    subtitle: 'Válogasd szét a jelenségeket aszerint, hogy maximumot, minimumot keresünk, vagy lineáris/monoton a folyamat!',
    categories: [
      {
        id: 'maximize',
        name: 'Maximumot keresünk (a < 0)',
        color: 'emerald',
        description: 'Terület, magasság, bevétel vagy profit tetőpontja'
      },
      {
        id: 'minimize',
        name: 'Minimumot keresünk (a > 0)',
        color: 'rose',
        description: 'Költség, anyagfelhasználás vagy tömeg mélypontja'
      },
      {
        id: 'linear-none',
        name: 'Nincs szélsőérték (monoton)',
        color: 'blue',
        description: 'Egyenletes növekedés vagy csökkenés, lineáris folyamat'
      }
    ],
    items: [
      { id: 'pas1-1', text: 'Bekerített telek területe: T(x) = x(10 - x)', categoryId: 'maximize' },
      { id: 'pas1-2', text: 'Felhajított labda magassága: h(t) = -5t² + 10t + 40', categoryId: 'maximize' },
      { id: 'pas1-3', text: 'Koncertjegy bevétel: B(x) = x(4000 - 100x)', categoryId: 'maximize' },
      { id: 'pas1-4', text: 'Híd ívének magassága a vízszint felett', categoryId: 'maximize' },

      { id: 'pas1-5', text: 'Hulladékégetés nettó költsége: K(x) = 2x² - 40x + 500', categoryId: 'minimize' },
      { id: 'pas1-6', text: 'Terepjárók átlagos tömege: m(t) = 1.5t² - 45t + 2100', categoryId: 'minimize' },
      { id: 'pas1-7', text: 'Fékező jármű fékútjának és reakciójának összege', categoryId: 'minimize' },
      { id: 'pas1-8', text: 'Csővezeték kiépítésének összköltsége', categoryId: 'minimize' },

      { id: 'pas1-9', text: 'Egyenletesen haladó vonat útja: s(t) = 80t', categoryId: 'linear-none' },
      { id: 'pas1-10', text: 'Fix díjas telefonköltség: K(x) = 20x + 1500', categoryId: 'linear-none' },
      { id: 'pas1-11', text: 'Vízforraló egyenletes melegedése: T(t) = 20 + 5t', categoryId: 'linear-none' },
      { id: 'pas1-12', text: 'Fix kamatozású betét értéke az évek múlásával', categoryId: 'linear-none' }
    ]
  },
  2: {
    title: 'Grafikus egyenletmegoldás közös pontjai',
    subtitle: 'Válogasd szét az egyenleteket a grafikonjaik metszéspontjainak száma szerint!',
    categories: [
      {
        id: 'two-points',
        name: '2 metszéspont (2 gyök)',
        color: 'blue',
        description: 'A két grafikon két különböző helyen metszi egymást'
      },
      {
        id: 'one-point',
        name: '1 érintési pont (1 gyök)',
        color: 'emerald',
        description: 'A két görbe pontosan egy közös pontban érinti egymást'
      },
      {
        id: 'zero-points',
        name: '0 metszéspont (Nincs gyök)',
        color: 'rose',
        description: 'A grafikonok elkerülik egymást, nincs közös pont'
      }
    ],
    items: [
      { id: 'pas2-1', text: 'x² = 4', categoryId: 'two-points' },
      { id: 'pas2-2', text: '(x - 2)² - 1 = x - 1', categoryId: 'two-points' },
      { id: 'pas2-3', text: '|x| = 3', categoryId: 'two-points' },
      { id: 'pas2-4', text: 'x² - 2x = 3', categoryId: 'two-points' },

      { id: 'pas2-5', text: 'x² = 0', categoryId: 'one-point' },
      { id: 'pas2-6', text: '(x - 3)² = 0', categoryId: 'one-point' },
      { id: 'pas2-7', text: '|x - 2| = 0', categoryId: 'one-point' },
      { id: 'pas2-8', text: 'x² - 4x + 4 = 0', categoryId: 'one-point' },

      { id: 'pas2-9', text: 'x² = -4', categoryId: 'zero-points' },
      { id: 'pas2-10', text: '(x - 1)² + 3 = 0', categoryId: 'zero-points' },
      { id: 'pas2-11', text: '|x + 2| = -1', categoryId: 'zero-points' },
      { id: 'pas2-12', text: 'x² + 1 = 0', categoryId: 'zero-points' }
    ]
  },
  3: {
    title: 'Korlátos tartományú függvények értékei',
    subtitle: 'Csoportosítsd az intervallumon értelmezett függvényeket a felvett értékeik előjele szerint!',
    categories: [
      {
        id: 'strictly-positive',
        name: 'Csak pozitív értékek (f(x) > 0)',
        color: 'emerald',
        description: 'Az adott intervallumon a grafikon teljes egészében a tengely felett fut'
      },
      {
        id: 'strictly-negative',
        name: 'Csak negatív értékek (f(x) < 0)',
        color: 'rose',
        description: 'Az adott intervallumon a grafikon teljes egészében a tengely alatt fut'
      },
      {
        id: 'mixed-sign',
        name: 'Pozitív és negatív is',
        color: 'amber',
        description: 'A grafikon átmetszi az x-tengelyt az intervallum belsejében'
      }
    ],
    items: [
      { id: 'pas3-1', text: 'f: [1; 4], f(x) = x²', categoryId: 'strictly-positive' },
      { id: 'pas3-2', text: 'f: [0; 3], f(x) = x + 2', categoryId: 'strictly-positive' },
      { id: 'pas3-3', text: 'f: [2; 5], f(x) = (x - 1)² + 1', categoryId: 'strictly-positive' },
      { id: 'pas3-4', text: 'f: [1; 3], f(x) = |x| + 3', categoryId: 'strictly-positive' },

      { id: 'pas3-5', text: 'f: [1; 3], f(x) = -x² - 2', categoryId: 'strictly-negative' },
      { id: 'pas3-6', text: 'f: [0; 4], f(x) = -|x| - 1', categoryId: 'strictly-negative' },
      { id: 'pas3-7', text: 'f: [2; 4], f(x) = -2x - 1', categoryId: 'strictly-negative' },
      { id: 'pas3-8', text: 'f: [1; 5], f(x) = -(x - 2)² - 3', categoryId: 'strictly-negative' },

      { id: 'pas3-9', text: 'f: [-2; 2], f(x) = x² - 1', categoryId: 'mixed-sign' },
      { id: 'pas3-10', text: 'f: [0; 4], f(x) = 2x - 3', categoryId: 'mixed-sign' },
      { id: 'pas3-11', text: 'f: [-1; 2], f(x) = -|x| + 1', categoryId: 'mixed-sign' },
      { id: 'pas3-12', text: 'f: [1; 5], f(x) = (x - 3)² - 4', categoryId: 'mixed-sign' }
    ]
  }
};

export const PracticeApplicationSorter: React.FC<PracticeApplicationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-transz-alkalmazas-sorter',
  topicTitle = 'Gyakorlás, alkalmazás - Csoportosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

