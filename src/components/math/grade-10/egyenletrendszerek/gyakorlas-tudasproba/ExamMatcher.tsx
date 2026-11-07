import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExamMatcherProps {
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
    title: 'Alapvető Rendszerek és Megoldáspárok',
    subtitle: 'Párosítsd a kétismeretlenes lineáris rendszereket a pontos (x; y) megoldáspárjukkal!',
    pairs: [
      {
        id: 'em1-1',
        prompt: 'x + y = 10  és  x − y = 4',
        value: 'x = 7; y = 3 ⟹ (7; 3)'
      },
      {
        id: 'em1-2',
        prompt: '2x + y = 11  és  3x − y = 4',
        value: 'x = 3; y = 5 ⟹ (3; 5)'
      },
      {
        id: 'em1-3',
        prompt: '3x + 2y = 12  és  x = 2',
        value: 'x = 2; y = 3 ⟹ (2; 3)'
      },
      {
        id: 'em1-4',
        prompt: 'x + 3y = 7  és  2x − y = 0',
        value: 'x = 1; y = 2 ⟹ (1; 2)'
      },
      {
        id: 'em1-5',
        prompt: '5x − 2y = 11  és  x + 2y = 7',
        value: 'x = 3; y = 2 ⟹ (3; 2)'
      },
      {
        id: 'em1-6',
        prompt: '2x + 3y = 8  és  4x + 6y = 16',
        value: 'Egybeeső egyenesek ⟹ Végtelen sok megoldás (0=0)'
      }
    ]
  },
  2: {
    title: 'Összetett és Másodfokú Rendszerek',
    subtitle: 'Párosítsd a magasabb szintű rendszereket az eredményükkel vagy metszéspontjaikkal!',
    pairs: [
      {
        id: 'em2-1',
        prompt: 'y = x²  és  y = 2x + 3',
        value: 'Metszéspontok: (3; 9) és (−1; 1)'
      },
      {
        id: 'em2-2',
        prompt: 'x² + y² = 25  és  y = x + 1',
        value: 'Két metszéspont: (3; 4) és (−4; −3)'
      },
      {
        id: 'em2-3',
        prompt: 'x + y + z = 6,  x − y = 0,  y + z = 5',
        value: 'Számhármas: (1; 1; 4)'
      },
      {
        id: 'em2-4',
        prompt: '1/x + 1/y = 5  és  2/x − 1/y = 1',
        value: 'Segédváltozóval ⟹ (1/2; 1/3)'
      },
      {
        id: 'em2-5',
        prompt: 'y = x² + 2  és  y = x',
        value: 'Kitérő egyenes (D < 0) ⟹ Nincs megoldás (∅)'
      },
      {
        id: 'em2-6',
        prompt: 'x² + y² = 16  és  y = 4',
        value: 'Érintő egyenes (D = 0) ⟹ (0; 4)'
      }
    ]
  },
  3: {
    title: 'Fejezeti Záró Szöveges Feladatok',
    subtitle: 'Párosítsd a tankönyvi és érettségi problémákat a pontos eredménnyel!',
    pairs: [
      {
        id: 'em3-1',
        prompt: 'Két bolha a rácson: y = 2x − 2 és x + y = 7 (Tankönyv 44. o.)',
        value: 'Közös érintett rácspont: M(3; 4)'
      },
      {
        id: 'em3-2',
        prompt: 'Járművek sebessége: Kisbusz, autó (+15 km/h) és teher (−15 km/h)',
        value: 'v_busz = 75 km/h, s = 450 km távolság'
      },
      {
        id: 'em3-3',
        prompt: 'Három zenekar plakátja (azonos terület: 240 dm²)',
        value: 'Alfa: 20×12 dm, Béta: 24×10 dm, Gamma: 16×15 dm'
      },
      {
        id: 'em3-4',
        prompt: 'Nagymama piaca: 1,5 kg paradicsom + 1 kg paprika = 850 Ft',
        value: 'Paradicsom = 300 Ft/kg, Paprika = 400 Ft/kg'
      },
      {
        id: 'em3-5',
        prompt: 'Két üzem alkatrészgyártása (480 db 20 nap alatt, −28% és +20%)',
        value: 'A üzem: 200 db (10/nap), B üzem: 280 db (14/nap)'
      },
      {
        id: 'em3-6',
        prompt: 'Kétféle alkohol (20% és 30% keveréke 22%-os; −1 liter 20%-os ⟹ 25%)',
        value: '4 liter (20%-osból) és 1 liter (30%-osból)'
      }
    ]
  }
};

export const ExamMatcher: React.FC<ExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '5. Gyakorlás, tudáspróba (Fejezeti záróteszt)'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="5. Tudáspróba – Párosító Játék"
      subtitle="Találd meg a logikai párokat a teljes fejezet átfogó anyaga alapján!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 11. LECKE"
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

