import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ScientificCalculationMatcherProps {
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
    title: '1. Szint: Alapműveletek Eredményei (Könnyű)',
    subtitle: 'Párosítsd a kifejezéseket a kiszámított normálalakjukkal!',
    pairs: [
      {
        id: 'scm-1-1',
        prompt: '(2 · 10³) · (4 · 10⁵)',
        value: '8 · 10⁸'
      },
      {
        id: 'scm-1-2',
        prompt: '(9 · 10⁷) / (3 · 10²)',
        value: '3 · 10⁵'
      },
      {
        id: 'scm-1-3',
        prompt: '(4 · 10⁴) + (2 · 10⁴)',
        value: '6 · 10⁴ (mantisszák összeadása)'
      },
      {
        id: 'scm-1-4',
        prompt: '(8 · 10⁶) - (5 · 10⁶)',
        value: '3 · 10⁶ (mantisszák kivonása)'
      },
      {
        id: 'scm-1-5',
        prompt: '(3 · 10⁴)²',
        value: '9 · 10⁸ (mindkét tényező négyzeten)'
      },
      {
        id: 'scm-1-6',
        prompt: '(5 · 10⁻³) · (1 · 10⁻⁴)',
        value: '5 · 10⁻⁷'
      },
      {
        id: 'scm-1-7',
        prompt: '(6 · 10⁻²) / (2 · 10⁻⁶)',
        value: '3 · 10⁴ = 30 000'
      },
      {
        id: 'scm-1-8',
        prompt: '1 GHz (gigahertz) alapegységben',
        value: '10⁹ Hz (egymilliárd)'
      }
    ]
  },
  2: {
    title: '2. Szint: Utólagos Korrekció és Eltérő Kitevők (Közepes)',
    subtitle: 'Alakítsd át a műveleti eredményt szabályos alakra, vagy számíts közös kitevővel!',
    pairs: [
      {
        id: 'scm-2-1',
        prompt: '(4 · 10⁶) · (5 · 10³)',
        value: '2 · 10¹⁰ (mert 20 · 10⁹ = 2 · 10¹⁰)'
      },
      {
        id: 'scm-2-2',
        prompt: '(2 · 10⁸) / (8 · 10³)',
        value: '2,5 · 10⁴ (mert 0,25 · 10⁵ = 2,5 · 10⁴)'
      },
      {
        id: 'scm-2-3',
        prompt: '5 · 10⁵ + 4 · 10⁴',
        value: '5,4 · 10⁵ (0,4 · 10⁵ hozzáadva)'
      },
      {
        id: 'scm-2-4',
        prompt: '7 · 10⁶ - 2 · 10⁵',
        value: '6,8 · 10⁶ (0,2 · 10⁶ kivonva)'
      },
      {
        id: 'scm-2-5',
        prompt: '(8 · 10⁻⁵) · (3 · 10⁻³)',
        value: '2,4 · 10⁻⁷ (mert 24 · 10⁻⁸ = 2,4 · 10⁻⁷)'
      },
      {
        id: 'scm-2-6',
        prompt: '(1,2 · 10⁻⁴) / (4 · 10⁻⁸)',
        value: '3 · 10³ = 3000'
      },
      {
        id: 'scm-2-7',
        prompt: '2,5 km² átszámítva m²-be',
        value: '2,5 · 10⁶ m² (egymillióval szorozva)'
      },
      {
        id: 'scm-2-8',
        prompt: '150 nm (nanométer) méterben',
        value: '1,5 · 10⁻⁷ m (150 · 10⁻⁹ m)'
      }
    ]
  },
  3: {
    title: '3. Szint: Természettudományos és Összetett Számítások (Nehéz)',
    subtitle: 'Párosítsd a fizikai és érettségi típusfeladatokat a megoldásukkal!',
    pairs: [
      {
        id: 'scm-3-1',
        prompt: 'Fény útja 500 s alatt (Nap-Föld távolság)',
        value: '1,5 · 10¹¹ m (150 millió km)'
      },
      {
        id: 'scm-3-2',
        prompt: '√(1,6 · 10⁷) értéke normálalakban',
        value: '4 · 10³ = 4000 (mert √(16 · 10⁶))'
      },
      {
        id: 'scm-3-3',
        prompt: '120 g szén (10 mól) atomjainak száma',
        value: '6 · 10²⁴ db (10 · 6 · 10²³)'
      },
      {
        id: 'scm-3-4',
        prompt: '[(6 · 10⁷) · (4 · 10⁻³)] / (8 · 10⁶)',
        value: '3 · 10⁻² = 0,03'
      },
      {
        id: 'scm-3-5',
        prompt: 'Föld és Hold tömegaránya (6·10²⁴ / 7,5·10²²)',
        value: '80 (a Föld kb. 80-szor nehezebb)'
      },
      {
        id: 'scm-3-6',
        prompt: '1 mm³ térfogat köbméterben (m³)',
        value: '10⁻⁹ m³ (mert (10⁻³ m)³ = 10⁻⁹ m³)'
      },
      {
        id: 'scm-3-7',
        prompt: '(4 · 10⁵ + 6 · 10⁴) / (2 · 10⁴)',
        value: '23 (mert 46 · 10⁴ / 2 · 10⁴ = 23)'
      },
      {
        id: 'scm-3-8',
        prompt: 'Számológépes (6*10⁸) / (2*10³) értéke',
        value: '3 · 10⁵ = 300 000 (zárójellel helyes)'
      }
    ]
  }
};

export const ScientificCalculationMatcher: React.FC<ScientificCalculationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-szamolas-normalalak-matcher',
  topicTitle = 'Számolás normálalakkal'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`sc-matcher-${activeLevel}`}
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
      themeColor="amber"
    />
  );
};

export default ScientificCalculationMatcher;
