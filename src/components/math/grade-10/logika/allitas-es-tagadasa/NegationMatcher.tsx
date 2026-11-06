import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegationMatcherProps {
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
    title: 'Tankönyvi Állítások és Helyes Tagadásaik',
    subtitle: 'Párosítsd a hivatalos tankönyvi kijelentéseket a pontos, logikailag helyes tagadásukkal!',
    pairs: [
      {
        id: 'nm1-1',
        prompt: '„Minden diák szereti a matematikát.”',
        value: 'Van olyan diák, aki nem szereti a matematikát.'
      },
      {
        id: 'nm1-2',
        prompt: '„A ládában minden kocka barna.”',
        value: 'A ládában van olyan kocka, amely nem barna.'
      },
      {
        id: 'nm1-3',
        prompt: '„Minden zenész szereti a tiszta hangzást.”',
        value: 'Van olyan zenész, aki nem szereti a tiszta hangzást.'
      },
      {
        id: 'nm1-4',
        prompt: '„Minden bankbetét fix kamatozású.”',
        value: 'Van olyan bankbetét, mely nem fix kamatozású.'
      },
      {
        id: 'nm1-5',
        prompt: '„Az utcában minden autó Opel.”',
        value: 'Van olyan autó az utcában, amely nem Opel.'
      },
      {
        id: 'nm1-6',
        prompt: '„Minden prímszám páratlan.”',
        value: 'Van olyan prímszám, amely nem páratlan (a 2-es).'
      }
    ]
  },
  2: {
    title: 'Határértékek és Geometriai Állítások Tagadása',
    subtitle: 'Párosítsd a relációs határértékeket és a geometriai kijelentéseket a helyes tagadásukkal!',
    pairs: [
      {
        id: 'nm2-1',
        prompt: 'A teszten legalább 50 pontot értem el (x ≥ 50).',
        value: 'A teszten kevesebb mint 50 pontot értem el (x < 50).'
      },
      {
        id: 'nm2-2',
        prompt: 'A buszra legfeljebb 30 ember fért fel (x ≤ 30).',
        value: 'A buszra több mint 30 ember fért fel (x > 30).'
      },
      {
        id: 'nm2-3',
        prompt: 'A teremben többen vagyunk 25-nél (x > 25).',
        value: 'A teremben legfeljebb 25-en vagyunk (x ≤ 25).'
      },
      {
        id: 'nm2-4',
        prompt: 'A hőmérséklet fagypont alatti (T < 0 °C).',
        value: 'A hőmérséklet legalább 0 °C (T ≥ 0 °C).'
      },
      {
        id: 'nm2-5',
        prompt: '„Minden háromszögnek van beírható köre.”',
        value: 'Van olyan háromszög, amelynek nincs beírható köre.'
      },
      {
        id: 'nm2-6',
        prompt: '„Van olyan háromszög, ami középpontosan szimmetrikus.”',
        value: 'Nincs olyan háromszög, ami középpontosan szimmetrikus.'
      }
    ]
  },
  3: {
    title: 'Szimbolikus Logika és Összetett Tagadások',
    subtitle: 'Párosítsd a formális logikai kifejezéseket és az összetett relációkat!',
    pairs: [
      {
        id: 'nm3-1',
        prompt: '¬(∀x ∈ H : P(x))',
        value: '∃x ∈ H : ¬P(x) (van olyan elem, amire nem teljesül)'
      },
      {
        id: 'nm3-2',
        prompt: '¬(∃x ∈ H : P(x))',
        value: '∀x ∈ H : ¬P(x) (egyetlen elemre sem teljesül)'
      },
      {
        id: 'nm3-3',
        prompt: '„A természetes számok között van legkisebb elem.”',
        value: 'A természetes számok között nincs legkisebb elem.'
      },
      {
        id: 'nm3-4',
        prompt: '„Minden n szám nagyobb vagy egyenlő számjegyei összegénél.”',
        value: 'Van olyan n szám, amely kisebb számjegyeinek összegénél.'
      },
      {
        id: 'nm3-5',
        prompt: '„Van olyan természetes szám, amely egyenlő számjegyei összegével.”',
        value: 'Minden természetes szám különbözik számjegyei összegétől.'
      },
      {
        id: 'nm3-6',
        prompt: '¬(¬A) (kettős tagadás törvénye)',
        value: 'A (az eredeti állítás logikai értékével azonos)'
      }
    ]
  }
};

export const NegationMatcher: React.FC<NegationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-logic-allitas-tagadas-matcher',
  topicTitle = '2. Állítás és tagadása'
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

(NegationMatcher as any).matcherLevels = matcherLevels;
