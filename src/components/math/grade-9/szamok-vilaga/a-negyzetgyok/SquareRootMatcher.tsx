import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SquareRootMatcherProps {
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
    title: '1. Szint: Alapvető Gyökök és Definíciók (Könnyű)',
    subtitle: 'Párosítsd a négyzetgyökös kifejezéseket a pontos értékükkel és jelentésükkel!',
    pairs: [
      {
        id: 'srm1-1',
        prompt: '√49 pontos értéke',
        value: '7 (mert 7 ≥ 0 és 7² = 49)'
      },
      {
        id: 'srm1-2',
        prompt: '√0 értéke',
        value: '0'
      },
      {
        id: 'srm1-3',
        prompt: '√((-8)²) értéke',
        value: '8 (az abszolút érték szabálya: |-8| = 8)'
      },
      {
        id: 'srm1-4',
        prompt: '(√17)² értéke',
        value: '17 (a gyök és négyzet egymás megfordításai)'
      },
      {
        id: 'srm1-5',
        prompt: '√(36 / 81) egyszerűsítve',
        value: '2/3 (6/9 egyszerűsített tört alakja)'
      },
      {
        id: 'srm1-6',
        prompt: '√(4 · 25) értéke',
        value: '10 (szorzat gyöke: 2 · 5 = 10)'
      },
      {
        id: 'srm1-7',
        prompt: '√(9 + 16) értéke',
        value: '5 (√25 = 5, összegből nem vonunk külön gyököt!)'
      },
      {
        id: 'srm1-8',
        prompt: '√(-25) a valós számok körében',
        value: 'Nem értelmezett (valós szám négyzete nem negatív)'
      }
    ]
  },
  2: {
    title: '2. Szint: Kiemelés és Gyöktelenítés (Közepes)',
    subtitle: 'Párosítsd a kifejezéseket a legegyszerűbb, pontos alakjukkal!',
    pairs: [
      {
        id: 'srm2-1',
        prompt: '√72 legegyszerűbb alakja',
        value: '6√2 (√(36 · 2) = 6√2)'
      },
      {
        id: 'srm2-2',
        prompt: '√50 legegyszerűbb alakja',
        value: '5√2 (√(25 · 2) = 5√2)'
      },
      {
        id: 'srm2-3',
        prompt: '√48 legegyszerűbb alakja',
        value: '4√3 (√(16 · 3) = 4√3)'
      },
      {
        id: 'srm2-4',
        prompt: '3√5 a gyökjel alá bevíve',
        value: '√45 (√(9 · 5) = √45)'
      },
      {
        id: 'srm2-5',
        prompt: '√8 · √2 összevonva',
        value: '4 (√16 = 4)'
      },
      {
        id: 'srm2-6',
        prompt: '√75 / √3 összevonva',
        value: '5 (√(75 / 3) = √25 = 5)'
      },
      {
        id: 'srm2-7',
        prompt: '6 / √3 gyöktelenítve',
        value: '2√3 (6√3 / 3 = 2√3)'
      },
      {
        id: 'srm2-8',
        prompt: '10 / √5 gyöktelenítve',
        value: '2√5 (10√5 / 5 = 2√5)'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi Kifejezések és Azonosságok (Haladó)',
    subtitle: 'Párosítsd az érettségi típusú algebrai feladatokat a pontos végeredménnyel!',
    pairs: [
      {
        id: 'srm3-1',
        prompt: '(√12 + √27) / √3 értéke',
        value: '5 ((2√3 + 3√3) / √3 = 5)'
      },
      {
        id: 'srm3-2',
        prompt: '(√5 + √2)² kifejtve',
        value: '7 + 2√10 (5 + 2√10 + 2)'
      },
      {
        id: 'srm3-3',
        prompt: '(√7 - √3) · (√7 + √3) értéke',
        value: '4 (különbség és összeg szorzata: 7 - 3 = 4)'
      },
      {
        id: 'srm3-4',
        prompt: '√2 · √3 · √6 értéke',
        value: '6 (√(2 · 3 · 6) = √36 = 6)'
      },
      {
        id: 'srm3-5',
        prompt: '4 / (√5 - 1) gyöktelenítve',
        value: '√5 + 1 (bővítés a konjugálttal: 4(√5+1)/4)'
      },
      {
        id: 'srm3-6',
        prompt: '3√2 és 2√5 viszonya',
        value: '2√5 a nagyobb (mert √20 > √18)'
      },
      {
        id: 'srm3-7',
        prompt: '√(x² - 6x + 9) alakja',
        value: '|x - 3| (teljes négyzet gyöke: √((x - 3)²))'
      },
      {
        id: 'srm3-8',
        prompt: '√(2x + 1) = 5 gyöke',
        value: 'x = 12 (négyzetre emelve: 2x + 1 = 25)'
      }
    ]
  }
};

export const SquareRootMatcher: React.FC<SquareRootMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-negyzetgyok-matcher',
  topicTitle = 'A Négyzetgyök'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`sqroot-matcher-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      pairs={config.pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
    />
  );
};

export default SquareRootMatcher;
