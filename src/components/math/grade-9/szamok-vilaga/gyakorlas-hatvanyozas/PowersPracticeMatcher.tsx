import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersPracticeMatcherProps {
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
    title: '1. Szint: Alapvető Átalakítások és Értékek (Könnyű)',
    subtitle: 'Párosítsd a kifejezéseket az átalakított vagy kiszámolt alakjukkal!',
    pairs: [
      {
        id: 'ppm1-1',
        prompt: '4³ · 8² mint 2 hatványa',
        value: '2¹² (mert 2⁶ · 2⁶ = 2¹²)'
      },
      {
        id: 'ppm1-2',
        prompt: '(3x²)³ kifejtve',
        value: '27x⁶ (mindkét tényező köbre emelve)'
      },
      {
        id: 'ppm1-3',
        prompt: '(3/4)⁻² értéke',
        value: '16/9 (megfordított tört négyzete)'
      },
      {
        id: 'ppm1-4',
        prompt: '5 / 5⁻³ kiszámolva',
        value: '5⁴ = 625 (kitevők: 1 - (-3) = 4)'
      },
      {
        id: 'ppm1-5',
        prompt: '(-2)⁶ - (-2)⁵ értéke',
        value: '96 (64 - (-32) = 96)'
      },
      {
        id: 'ppm1-6',
        prompt: 'a⁻² / b⁻³ pozitív kitevőkkel',
        value: 'b³ / a² (törtvonalon átmozgatás)'
      },
      {
        id: 'ppm1-7',
        prompt: '6³ / (2² · 3³) egyszerűsítve',
        value: '2¹ = 2 (prímbontás után)'
      },
      {
        id: 'ppm1-8',
        prompt: '2^(x+2) = 64 megoldása',
        value: 'x = 4 (mert 2⁶ = 64, x + 2 = 6)'
      }
    ]
  },
  2: {
    title: '2. Szint: Összetett Törtek és Kiemelések (Közepes)',
    subtitle: 'Párosítsd az algebrai törtkifejezéseket a legegyszerűbb alakkal!',
    pairs: [
      {
        id: 'ppm2-1',
        prompt: '(2¹⁰ + 2¹²) / 2¹⁰ értéke',
        value: '5 (kiemeléssel: 1 + 2² = 5)'
      },
      {
        id: 'ppm2-2',
        prompt: '(9³ · 2⁷) / 6⁵ értéke',
        value: '12 (3⁶ · 2⁷ / (2⁵ · 3⁵) = 3 · 4)'
      },
      {
        id: 'ppm2-3',
        prompt: '(3ⁿ⁺¹ + 3ⁿ) / 3ⁿ értéke',
        value: '4 (3ⁿ kiemelése után: 3 + 1 = 4)'
      },
      {
        id: 'ppm2-4',
        prompt: '(5¹⁰⁰ - 5⁹⁸) / (5⁹⁸ · 24)',
        value: '1 (kiemeléssel: 5² - 1 = 24)'
      },
      {
        id: 'ppm2-5',
        prompt: '(4x³ y⁻²)² / (2x⁴ y⁻⁵)',
        value: '8x² y (együtthatók és kitevők rendezése)'
      },
      {
        id: 'ppm2-6',
        prompt: '2³⁰⁰ és 3²⁰⁰ nagyságrendi viszonya',
        value: '3²⁰⁰ a nagyobb (mert 8¹⁰⁰ < 9¹⁰⁰)'
      },
      {
        id: 'ppm2-7',
        prompt: '(1/3)² és (1/3)⁴ viszonya',
        value: '(1/3)² > (1/3)⁴ (tört alapoknál a kisebb kitevő a nagyobb)'
      },
      {
        id: 'ppm2-8',
        prompt: '9^(x-1) = 27 gyöke',
        value: 'x = 2,5 (mert 3^(2x-2) = 3³, 2x - 2 = 3)'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi és Versenyszintű Algebra (Haladó)',
    subtitle: 'Párosítsd a kihívást jelentő feladatokat a pontos végeredménnyel!',
    pairs: [
      {
        id: 'ppm3-1',
        prompt: '(2²⁰²⁴ + 2²⁰²⁶) / 2²⁰²⁵ értéke',
        value: '2,5 (kiemelés után (1 + 4) / 2 = 5/2)'
      },
      {
        id: 'ppm3-2',
        prompt: '3ˣ + 3ˣ + 3ˣ egyetlen hatványként',
        value: '3^(x+1) (három darab tag: 3 · 3ˣ)'
      },
      {
        id: 'ppm3-3',
        prompt: '(2³)² - 2³² különbsége',
        value: '-448 (toronyhatvány: 64 - 512 = -448)'
      },
      {
        id: 'ppm3-4',
        prompt: '(0,125)⁻⁴ értéke',
        value: '4096 (mert (1/8)⁻⁴ = 8⁴ = 2¹²)'
      },
      {
        id: 'ppm3-5',
        prompt: 'Ha 2ᵃ = 3 és 2ᵇ = 5, akkor 2^(a+b+1)',
        value: '30 (2ᵃ · 2ᵇ · 2¹ = 3 · 5 · 2 = 30)'
      },
      {
        id: 'ppm3-6',
        prompt: '(6¹² - 6¹⁰) / (35 · 6¹⁰)',
        value: '1 (számláló: 6¹⁰ · 35, egyszerűsítve 1)'
      },
      {
        id: 'ppm3-7',
        prompt: '4⁻¹ + 2⁻³ összege',
        value: '3/8 = 0,375 (1/4 + 1/8 = 3/8)'
      },
      {
        id: 'ppm3-8',
        prompt: '25⁴⁰ és 2¹²⁰ viszonya',
        value: '25⁴⁰ > 2¹²⁰ (mert 25⁴⁰ > 8⁴⁰ = 2¹²⁰)'
      }
    ]
  }
};

export const PowersPracticeMatcher: React.FC<PowersPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-gyakorlas-hatvany-matcher',
  topicTitle = 'Hatványozás Gyakorlása'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`powprac-matcher-${activeLevel}`}
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
      themeColor="rose"
    />
  );
};

export default PowersPracticeMatcher;
