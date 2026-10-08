import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LargeNumbersPowersMatcherProps {
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
    title: '1. Szint: A Hatványozás Alapjai és Értékei',
    subtitle: 'Párosítsd a hatványkifejezéseket a kiszámított értékükkel és szorzatalakjukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: '2⁴',
        value: '16 (2 · 2 · 2 · 2)'
      },
      {
        id: 'p2',
        prompt: '3³',
        value: '27 (3 · 3 · 3)'
      },
      {
        id: 'p3',
        prompt: '5³',
        value: '125 (5 · 5 · 5)'
      },
      {
        id: 'p4',
        prompt: '(-2)⁴',
        value: '+16 (páros kitevő pozitív)'
      },
      {
        id: 'p5',
        prompt: '(-2)³',
        value: '-8 (páratlan kitevő negatív)'
      },
      {
        id: 'p6',
        prompt: '-3²',
        value: '-9 (zárójel nélkül: -(3²))'
      },
      {
        id: 'p7',
        prompt: '15⁰',
        value: '1 (a⁰ = 1, ha a ≠ 0)'
      },
      {
        id: 'p8',
        prompt: '28¹',
        value: '28 (bármely szám 1. hatványa önmaga)'
      }
    ]
  },
  2: {
    title: '2. Szint: A 10 Hatványai és Nagy Számok',
    subtitle: 'Párosítsd a 10-hatványokat a magyar elnevezésükkel, helyiértékes összegekkel és törtekkel!',
    pairs: [
      {
        id: 'p9',
        prompt: '10³',
        value: '1 000 (Ezer, kilo-)'
      },
      {
        id: 'p10',
        prompt: '10⁶',
        value: '1 000 000 (Millió, mega-)'
      },
      {
        id: 'p11',
        prompt: '10⁹',
        value: '1 000 000 000 (Milliárd, giga-)'
      },
      {
        id: 'p12',
        prompt: '10¹²',
        value: '1 000 000 000 000 (Billió, tera-)'
      },
      {
        id: 'p13',
        prompt: '4 · 10³ + 5 · 10¹',
        value: '4 050 (a százas és egyes helyén 0)'
      },
      {
        id: 'p14',
        prompt: '(2/5)²',
        value: '4/25 (2²/5²)'
      },
      {
        id: 'p15',
        prompt: '0,2³',
        value: '0,008 (3 tizedesjegy)'
      },
      {
        id: 'p16',
        prompt: '(-1)¹⁰⁰',
        value: '+1 (100 páros szám)'
      }
    ]
  },
  3: {
    title: '3. Szint: Normálalak és Nagyságrendek',
    subtitle: 'Párosítsd a valós számokat és műveleteket a szabványos normálalakjukkal!',
    pairs: [
      {
        id: 'p17',
        prompt: '300 000 (Fénysebesség)',
        value: '3 · 10⁵ km/s'
      },
      {
        id: 'p18',
        prompt: '149 600 000 (Föld–Nap)',
        value: '1,496 · 10⁸ km'
      },
      {
        id: 'p19',
        prompt: '8 000 000 000 (Föld lakossága)',
        value: '8 · 10⁹ fő'
      },
      {
        id: 'p20',
        prompt: '45 000',
        value: '4,5 · 10⁴'
      },
      {
        id: 'p21',
        prompt: '0,05 · 10⁶ helyes alakja',
        value: '5 · 10⁴ (1 ≤ a < 10)'
      },
      {
        id: 'p22',
        prompt: '40 · 10³ helyes alakja',
        value: '4 · 10⁴ (40 = 4 · 10¹)'
      },
      {
        id: 'p23',
        prompt: '(2 · 10³) · (3 · 10⁴)',
        value: '6 · 10⁷ (2·3=6, 3+4=7)'
      },
      {
        id: 'p24',
        prompt: '(4 · 10⁴) · (5 · 10²)',
        value: '2 · 10⁷ (20 · 10⁶ = 2 · 10⁷)'
      }
    ]
  }
};

export const LargeNumbersPowersMatcher: React.FC<LargeNumbersPowersMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-large-numbers',
  topicTitle = '1. Nagy számok és a hatványalak'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Nagy számok és Hatványok Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a hatványokat, értékeket, 10-hatványokat és normálalakokat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default LargeNumbersPowersMatcher;
