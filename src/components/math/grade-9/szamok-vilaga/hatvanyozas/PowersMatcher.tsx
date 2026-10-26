import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Kitevők (Könnyű)',
    subtitle: 'Párosítsd a hatványkifejezéseket a pontos értékükkel és jelentésükkel!',
    pairs: [
      {
        id: 'pwm1-1',
        prompt: '2³ értéke',
        value: '8 (2 · 2 · 2 = 8)'
      },
      {
        id: 'pwm1-2',
        prompt: '5⁰ értéke',
        value: '1 (bármely nemnulla szám 0. hatványa 1)'
      },
      {
        id: 'pwm1-3',
        prompt: '2⁻¹ értéke',
        value: '1/2 = 0,5 (az alap reciproka)'
      },
      {
        id: 'pwm1-4',
        prompt: '2⁻³ értéke',
        value: '1/2³ = 1/8 = 0,125'
      },
      {
        id: 'pwm1-5',
        prompt: '(-3)² értéke',
        value: '+9 (zárójellel: (-3) · (-3) = 9)'
      },
      {
        id: 'pwm1-6',
        prompt: '-3² értéke',
        value: '-9 (zárójel nélkül a mínusz elöl marad)'
      },
      {
        id: 'pwm1-7',
        prompt: '(-2)³ értéke',
        value: '-8 (negatív alap páratlan kitevőn negatív)'
      },
      {
        id: 'pwm1-8',
        prompt: '10⁴ értéke',
        value: '10 000 (1 után 4 darab nulla)'
      }
    ]
  },
  2: {
    title: '2. Szint: Hatványozási Azonosságok (Közepes)',
    subtitle: 'Párosítsd a kifejezéseket a megfelelő azonossággal összevont alakkal!',
    pairs: [
      {
        id: 'pwm2-1',
        prompt: '2³ · 2⁴ összevonva',
        value: '2⁷ = 128 (azonos alapok szorzásánál kitevők összeadódnak)'
      },
      {
        id: 'pwm2-2',
        prompt: '5⁷ / 5⁴ összevonva',
        value: '5³ = 125 (azonos alapok osztásánál kitevők kivonódnak)'
      },
      {
        id: 'pwm2-3',
        prompt: '(3²)⁴ összevonva',
        value: '3⁸ = 6561 (hatvány hatványozásánál kitevők szorzódnak)'
      },
      {
        id: 'pwm2-4',
        prompt: '(2 · x)³ kifejtve',
        value: '8x³ (szorzat hatványozásakor mindkét tényező hatványozódik)'
      },
      {
        id: 'pwm2-5',
        prompt: '(2/3)⁻² kiszámolva',
        value: '(3/2)² = 9/4 = 2,25 (tört negatív kitevőn a reciprok négyzete)'
      },
      {
        id: 'pwm2-6',
        prompt: '2⁵ · 4² közös alapra hozva',
        value: '2⁵ · (2²)² = 2⁵ · 2⁴ = 2⁹ = 512'
      },
      {
        id: 'pwm2-7',
        prompt: '3⁴ / 3⁷ egyszerűsítve',
        value: '3⁻³ = 1/3³ = 1/27'
      },
      {
        id: 'pwm2-8',
        prompt: '(0,5)⁻³ kiszámolva',
        value: '(1/2)⁻³ = 2³ = 8'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi és Algebrai Kihívások (Haladó)',
    subtitle: 'Párosítsd az érettségi típusú algebrai feladatokat a helyes levezetéssel és végeredménnyel!',
    pairs: [
      {
        id: 'pwm3-1',
        prompt: '2³ + 2³ összevonva hatványalakra',
        value: '2 · 2³ = 2⁴ = 16 (azonos tagok összeadása szorzásba megy)'
      },
      {
        id: 'pwm3-2',
        prompt: '(2⁵ · 3⁴) / 6³ értéke',
        value: '(2⁵ · 3⁴) / (2³ · 3³) = 2² · 3¹ = 12'
      },
      {
        id: 'pwm3-3',
        prompt: '(3⁷ + 3⁵) / 3⁵ egyszerűsítve',
        value: '3⁵(3² + 1) / 3⁵ = 3² + 1 = 10 (kiemelés utáni egyszerűsítés)'
      },
      {
        id: 'pwm3-4',
        prompt: '3^(x+1) = 81 egyenlet gyöke',
        value: 'x = 3 (mert 3^(x+1) = 3⁴, így x + 1 = 4)'
      },
      {
        id: 'pwm3-5',
        prompt: '(0,25)⁻² értéke',
        value: '(1/4)⁻² = 4² = 16'
      },
      {
        id: 'pwm3-6',
        prompt: '2³⁰⁰ és 3²⁰⁰ nagyságrendi viszonya',
        value: '3²⁰⁰ a nagyobb (mert (2³)¹⁰⁰ = 8¹⁰⁰ < (3²)¹⁰⁰ = 9¹⁰⁰)'
      },
      {
        id: 'pwm3-7',
        prompt: '-(-2)⁴ + (-2)³ értéke',
        value: '-16 + (-8) = -24'
      },
      {
        id: 'pwm3-8',
        prompt: '2⁻¹ + 2⁻² törtté alakítva',
        value: '1/2 + 1/4 = 3/4 = 0,75'
      }
    ]
  }
};

export const PowersMatcher: React.FC<PowersMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-hatvany-matcher',
  topicTitle = 'Hatványozás'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`powers-matcher-${activeLevel}`}
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
      themeColor="purple"
    />
  );
};

export default PowersMatcher;
