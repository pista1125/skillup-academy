import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LengthMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LengthMatcher: React.FC<LengthMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: ALAPVETŐ MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető mértékegységek és váltószámok',
      subtitle: 'Párosítsd a mértékegységeket és az alapvető egyenlőségeket!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1 cm',
          value: '10 mm'
        },
        {
          id: 'p1-2',
          prompt: '1 dm',
          value: '10 cm'
        },
        {
          id: 'p1-3',
          prompt: '1 m deciméterben',
          value: '10 dm'
        },
        {
          id: 'p1-4',
          prompt: '1 km méterben',
          value: '1000 m'
        },
        {
          id: 'p1-5',
          prompt: '1 m centiméterben',
          value: '100 cm'
        },
        {
          id: 'p1-6',
          prompt: '1 m milliméterben',
          value: '1000 mm'
        },
        {
          id: 'p1-7',
          prompt: 'Milliméter (mm)',
          value: 'A méter ezredrésze (1/1000 m)'
        },
        {
          id: 'p1-8',
          prompt: 'Centiméter (cm)',
          value: 'A méter századrésze (1/100 m)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: GYORS ÁTVÁLTÁSOK ÉS EGYENLŐSÉGEK
    // ========================================================
    2: {
      title: '2. Szint: Gyors átváltások és egyenlőségek',
      subtitle: 'Keresd meg az egymással egyenértékű hosszúságokat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '350 cm',
          value: '3,5 m (3 m 50 cm)'
        },
        {
          id: 'p2-2',
          prompt: '4200 m',
          value: '4,2 km (4 km 200 m)'
        },
        {
          id: 'p2-3',
          prompt: '80 mm',
          value: '8 cm'
        },
        {
          id: 'p2-4',
          prompt: '7 dm',
          value: '70 cm (700 mm)'
        },
        {
          id: 'p2-5',
          prompt: '5000 mm',
          value: '5 m (50 dm)'
        },
        {
          id: 'p2-6',
          prompt: '2 km 50 m',
          value: '2050 m'
        },
        {
          id: 'p2-7',
          prompt: '6 m 8 cm',
          value: '608 cm'
        },
        {
          id: 'p2-8',
          prompt: '90 dm',
          value: '9 m (900 cm)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: BECSLÉS ÉS VALÓS ÉLETBELI MÉRETEK
    // ========================================================
    3: {
      title: '3. Szint: Becslés és valós életbeli méretek',
      subtitle: 'Párosítsd a tárgyakat és távolságokat a reális méretükkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Bankkártya vastagsága',
          value: 'kb. 1 mm'
        },
        {
          id: 'p3-2',
          prompt: 'Kockás füzet két négyzete',
          value: 'pontosan 1 cm (10 mm)'
        },
        {
          id: 'p3-3',
          prompt: 'Kinyújtott felnőtt tenyér szélessége',
          value: 'kb. 1 dm (10 cm)'
        },
        {
          id: 'p3-4',
          prompt: 'Tantermi ajtó magassága',
          value: 'kb. 2 m (200 cm)'
        },
        {
          id: 'p3-5',
          prompt: 'Iskolai futópálya egy köre',
          value: '400 m'
        },
        {
          id: 'p3-6',
          prompt: 'Focipálya hosszúsága',
          value: 'kb. 100 m'
        },
        {
          id: 'p3-7',
          prompt: 'Kényelmes 15 perces séta',
          value: 'kb. 1 km (1000 m)'
        },
        {
          id: 'p3-8',
          prompt: 'Budapest – Balaton (Siófok) távolság',
          value: 'kb. 105 km'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-meres-length-quiz"
      title="A hosszúság mérése párosító"
      subtitle="Keresd meg a mértékegységek, átváltások és becslések összetartozó párjait!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

export default LengthMatcher;
