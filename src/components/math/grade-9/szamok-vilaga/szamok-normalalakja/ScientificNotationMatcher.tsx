import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ScientificNotationMatcherProps {
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
    title: '1. Szint: Alapvető Átváltások és Értékek (Könnyű)',
    subtitle: 'Párosítsd a hagyományos tizedes alakokat és a normálalakos megfelelőiket!',
    pairs: [
      {
        id: 'sn-m1-1',
        prompt: '65 000 000 normálalakja',
        value: '6,5 · 10⁷'
      },
      {
        id: 'sn-m1-2',
        prompt: '0,00042 normálalakja',
        value: '4,2 · 10⁻⁴'
      },
      {
        id: 'sn-m1-3',
        prompt: '5,2 · 10⁴ helyiértékes alakja',
        value: '52 000'
      },
      {
        id: 'sn-m1-4',
        prompt: '7,8 · 10⁻³ helyiértékes alakja',
        value: '0,0078'
      },
      {
        id: 'sn-m1-5',
        prompt: 'A 8 normálalakban',
        value: '8 · 10⁰ (mert 10⁰ = 1)'
      },
      {
        id: 'sn-m1-6',
        prompt: 'Az 1000 normálalakban',
        value: '1 · 10³'
      },
      {
        id: 'sn-m1-7',
        prompt: '3 · 10⁻⁵ értéke és előjele',
        value: '0,00003 (pozitív, nullához közeli kis szám)'
      },
      {
        id: 'sn-m1-8',
        prompt: '4.5E+06 számológép kijelző',
        value: '4 500 000 (4,5 · 10⁶)'
      }
    ]
  },
  2: {
    title: '2. Szint: Nem Szabványos Alakok és Negatív Számok (Közepes)',
    subtitle: 'Alakítsd át a nem szabványos felírásokat szabályos normálalakra, vagy hasonlítsd össze őket!',
    pairs: [
      {
        id: 'sn-m2-1',
        prompt: '75 · 10⁴ helyes normálalakja',
        value: '7,5 · 10⁵ (vessző 1-gyel balra, kitevő nő)'
      },
      {
        id: 'sn-m2-2',
        prompt: '0,06 · 10⁵ helyes normálalakja',
        value: '6 · 10³ (vessző 2-vel jobbra, kitevő csökken)'
      },
      {
        id: 'sn-m2-3',
        prompt: '-82 000 normálalakja',
        value: '-8,2 · 10⁴ (a negatív előjel elöl marad)'
      },
      {
        id: 'sn-m2-4',
        prompt: '-0,0005 normálalakja',
        value: '-5 · 10⁻⁴ (mindkét előjel negatív)'
      },
      {
        id: 'sn-m2-5',
        prompt: '0,0048 · 10⁻² helyes normálalakja',
        value: '4,8 · 10⁻⁵ (vessző 3-mal jobbra, kitevő -2 - 3)'
      },
      {
        id: 'sn-m2-6',
        prompt: '250 · 10⁻⁷ helyes normálalakja',
        value: '2,5 · 10⁻⁵ (vessző 2-vel balra, kitevő -7 + 2)'
      },
      {
        id: 'sn-m2-7',
        prompt: 'Nagyobb szám: 2,5 · 10⁶ vagy 9,8 · 10⁵',
        value: '2,5 · 10⁶ (a magasabb kitevő azonnal dönt)'
      },
      {
        id: 'sn-m2-8',
        prompt: 'Nagyobb szám: 4,5 · 10⁻⁴ vagy 3,8 · 10⁻⁴',
        value: '4,5 · 10⁻⁴ (azonos kitevőnél a mantissza dönt)'
      }
    ]
  },
  3: {
    title: '3. Szint: Természettudományos Alkalmazások és Műveletek (Nehéz)',
    subtitle: 'Párosítsd a tudományos mértékegységeket, nagyságrendeket és műveleti eredményeket!',
    pairs: [
      {
        id: 'sn-m3-1',
        prompt: 'Fénysebesség vákuumban: 3 · 10⁸ m/s',
        value: '3 · 10⁵ km/s (10³-nal osztva km-be váltáskor)'
      },
      {
        id: 'sn-m3-2',
        prompt: 'Osztás: (6 · 10⁸) / (2 · 10⁵)',
        value: '3 · 10³ = 3000 (mantisszák osztása, kitevők kivonása)'
      },
      {
        id: 'sn-m3-3',
        prompt: 'Szorzás: (3 · 10⁴) · (2 · 10⁻⁷)',
        value: '6 · 10⁻³ = 0,006 (mantisszák szorzása, kitevők összeadása)'
      },
      {
        id: 'sn-m3-4',
        prompt: 'Baktérium mérete: 2 · 10⁻⁶ m',
        value: '2 µm (mikrométer) = 2000 nm (nanométer)'
      },
      {
        id: 'sn-m3-5',
        prompt: 'Föld tömegének (5,97 · 10²⁴ kg) nagyságrendje',
        value: '10²⁵ kg (mert 5,97 ≥ 5, így felfelé kerekítünk)'
      },
      {
        id: 'sn-m3-6',
        prompt: 'Számológép kijelzője: 1.23 -05',
        value: '1,23 · 10⁻⁵ = 0,0000123'
      },
      {
        id: 'sn-m3-7',
        prompt: '1 dl víz molekuláinak száma nagyságrendileg',
        value: '3,3 · 10²⁴ db (óriási makroszkopikus mennyiség)'
      },
      {
        id: 'sn-m3-8',
        prompt: 'Növekvő sorrend: A = 3·10⁻⁴, B = 5·10⁻⁵, C = 2·10⁻³',
        value: 'B < A < C (mert 10⁻⁵ < 10⁻⁴ < 10⁻³)'
      }
    ]
  }
};

export const ScientificNotationMatcher: React.FC<ScientificNotationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-normalalak-matcher',
  topicTitle = 'Számok normálalakja'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`sn-matcher-${activeLevel}`}
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
      themeColor="emerald"
    />
  );
};

export default ScientificNotationMatcher;
