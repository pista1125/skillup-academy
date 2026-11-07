import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompositeEquationsMatcherProps {
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
    title: 'Háromismeretlenes Lineáris Rendszerek',
    subtitle: 'Párosítsd a háromismeretlenes egyenletrendszereket a helyes (x; y; z) megoldáshármassal!',
    pairs: [
      {
        id: 'cem1-1',
        prompt: 'x + y + z = 6,  2x − y + z = 3,  x + 2y − z = 2',
        value: 'x = 1, y = 2, z = 3 ⟹ (1; 2; 3)'
      },
      {
        id: 'cem1-2',
        prompt: 'x + y = 5,  y + z = 7,  x + z = 6',
        value: 'x = 2, y = 3, z = 4 ⟹ (2; 3; 4)'
      },
      {
        id: 'cem1-3',
        prompt: 'x + y + z = 10,  x − y = 2,  z = 4',
        value: 'x = 4, y = 2, z = 4 ⟹ (4; 2; 4)'
      },
      {
        id: 'cem1-4',
        prompt: 'x + y + z = 0,  x − y = 0,  z = 4',
        value: 'x = −2, y = −2, z = 4 ⟹ (−2; −2; 4)'
      },
      {
        id: 'cem1-5',
        prompt: '2x + y − z = 1,  x + y = 3,  z = 2',
        value: 'x = 0, y = 3, z = 2 ⟹ (0; 3; 2)'
      },
      {
        id: 'cem1-6',
        prompt: 'x = 2,  y = 3x,  x + y + z = 11',
        value: 'x = 2, y = 6, z = 3 ⟹ (2; 6; 3)'
      }
    ]
  },
  2: {
    title: 'Másodfokú Egyenletrendszerek és Metszéspontok',
    subtitle: 'Párosítsd a görbe és egyenes rendszereket a metszéspontok koordinátáival vagy a megoldásszámmal!',
    pairs: [
      {
        id: 'cem2-1',
        prompt: 'y = x²  és  y = x + 2',
        value: 'Metszéspontok: (−1; 1) és (2; 4)'
      },
      {
        id: 'cem2-2',
        prompt: 'x² + y² = 25  és  y = 4',
        value: 'Két pont: (3; 4) és (−3; 4)'
      },
      {
        id: 'cem2-3',
        prompt: 'x² + y² = 10  és  y = 3x',
        value: 'Két pont: (1; 3) és (−1; −3)'
      },
      {
        id: 'cem2-4',
        prompt: 'y = x² + 1  és  y = 2x',
        value: 'Érintő (D = 0) ⟹ Egyetlen pont: (1; 2)'
      },
      {
        id: 'cem2-5',
        prompt: 'x² + y² = 4  és  y = 5',
        value: 'Kitérő egyenes (D < 0) ⟹ Nincs megoldás (∅)'
      },
      {
        id: 'cem2-6',
        prompt: 'x + y = 10  és  x · y = 21 (x ≥ y)',
        value: 'Viète-számpár ⟹ (7; 3)'
      }
    ]
  },
  3: {
    title: 'Szöveges Modellek és Rendszereik',
    subtitle: 'Párosítsd a valós problémákat a felállított matematikai modellel és a válasszal!',
    pairs: [
      {
        id: 'cem3-1',
        prompt: 'Székek és fordulók (Tankönyv 40. o.)',
        value: '−2x + y = 2 és 4x − y = 4 ⟹ 24 szék (x=3, y=8)'
      },
      {
        id: 'cem3-2',
        prompt: 'Kávékeverék (17,5 kg, 3600 Ft/kg ár)',
        value: 'x + y = 17,5 és 3000x + 4000y = 63 000 ⟹ 7 kg és 10,5 kg'
      },
      {
        id: 'cem3-3',
        prompt: 'Mosógép (1 órás program, 800 Wh energia)',
        value: 't₁ + t₂ = 1 és 2000t₁ + 400t₂ = 800 ⟹ t₁ = 0,25 h (15 perc)'
      },
      {
        id: 'cem3-4',
        prompt: 'Két négyzet (Területkülönbség 72 m², kerületeké 16 m)',
        value: 'a² − b² = 72 és 4a − 4b = 16 ⟹ a = 11 m, b = 7 m'
      },
      {
        id: 'cem3-5',
        prompt: 'Két szám (Összegük 60, különbségük 5)',
        value: 'x + y = 60 és x − y = 5 ⟹ (32,5; 27,5)'
      },
      {
        id: 'cem3-6',
        prompt: 'Bolti akció (Tej 20%, tejföl 75 Ft kedvezmény: 9750 Ft kiesés)',
        value: '50x + 75y = 9750 és 70x + 45y = 10 650 ⟹ 120 l tej, 50 l tejföl'
      }
    ]
  }
};

export const CompositeEquationsMatcher: React.FC<CompositeEquationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '3. Egyenletrendszerek (Összetett és szöveges feladatok)'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="3. Egyenletrendszerek – Párosító Játék"
      subtitle="Találd meg a párokat: 3-ismeretlenes, másodfokú rendszerek és valós szöveges modellek!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 9. LECKE"
      levels={matcherLevels}
      currentLevel={activeLvl}
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

