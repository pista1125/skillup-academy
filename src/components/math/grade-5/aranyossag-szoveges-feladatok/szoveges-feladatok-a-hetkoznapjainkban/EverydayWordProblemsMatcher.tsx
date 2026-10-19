import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface EverydayWordProblemsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const EverydayWordProblemsMatcher: React.FC<EverydayWordProblemsMatcherProps> = ({
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
    // 1. SZINT: KÉSZPÉNZES KEREKÍTÉS ÉS EGYSZERŰ VÁSÁRLÁS
    // ========================================================
    1: {
      title: '1. Szint: Készpénzes kerekítés és blokk tételek',
      subtitle: 'Párosítsd a pontos összeget a hivatalos kerekített értékével vagy a visszajáróval!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1432 Ft fizetendő készpénzben',
          value: '1430 Ft (lefelé kerekítve)'
        },
        {
          id: 'p1-2',
          prompt: '2784 Ft fizetendő készpénzben',
          value: '2785 Ft (felfelé kerekítve)'
        },
        {
          id: 'p1-3',
          prompt: '3917 Ft fizetendő készpénzben',
          value: '3915 Ft (lefelé kerekítve)'
        },
        {
          id: 'p1-4',
          prompt: '5289 Ft fizetendő készpénzben',
          value: '5290 Ft (felfelé kerekítve)'
        },
        {
          id: 'p1-5',
          prompt: '10 000 Ft-ból fizetünk 6400 Ft-ot',
          value: '3600 Ft visszajáró'
        },
        {
          id: 'p1-6',
          prompt: '2,5 kg narancs 600 Ft/kg áron',
          value: '1500 Ft (2,5 · 600)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: RECEPTEK ARÁNYOSÍTÁSA
    // ========================================================
    2: {
      title: '2. Szint: Konyhai receptek arányosítása',
      subtitle: 'Alaprecept: 4 főre szól (20 dkg liszt, 2 tojás, 4 dl tej, 2 evőkanál cukor). Párosítsd!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Liszt mennyisége 8 főre',
          value: '40 dkg liszt (kétszeres adag)'
        },
        {
          id: 'p2-2',
          prompt: 'Tojás mennyisége 6 főre',
          value: '3 db tojás (1,5-szeres adag)'
        },
        {
          id: 'p2-3',
          prompt: 'Tej mennyisége 2 főre',
          value: '2 dl tej (fél adag)'
        },
        {
          id: 'p2-4',
          prompt: 'Cukor mennyisége 10 főre',
          value: '5 evőkanál cukor (2,5-szeres adag)'
        },
        {
          id: 'p2-5',
          prompt: 'Liszt mennyisége 12 főre',
          value: '60 dkg liszt (háromszoros adag)'
        },
        {
          id: 'p2-6',
          prompt: 'Tej mennyisége 6 főre',
          value: '6 dl tej (600 ml)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MENETIDŐK ÉS SEBESSÉGEK (s = v · t)
    // ========================================================
    3: {
      title: '3. Szint: Utazási idők és sebességek',
      subtitle: 'Párosítsd a járművet és útját a pontos menetidővel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '120 km távolság 60 km/h sebességű autóval',
          value: '2 óra menetidő (120 : 60)'
        },
        {
          id: 'p3-2',
          prompt: '30 km kerékpározás 15 km/h sebességgel',
          value: '2 óra menetidő (30 : 15)'
        },
        {
          id: 'p3-3',
          prompt: '10 km gyaloglás 5 km/h tempóval',
          value: '2 óra menetidő (10 : 5)'
        },
        {
          id: 'p3-4',
          prompt: '45 km távolság 90 km/h sebességgel',
          value: '0,5 óra (30 perc menetidő)'
        },
        {
          id: 'p3-5',
          prompt: 'Indulás 08:45-kor, menetidő 50 perc',
          value: '09:35 érkezési időpont'
        },
        {
          id: 'p3-6',
          prompt: '15 perc alatt megtett 3 km távolság sebessége',
          value: '12 km/h átlagsebesség'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Hétköznapi szöveges feladatok Párosító"
      subtitle="Kösd össze a vásárlási, konyhai és utazási tételeket a pontos értékükkel!"
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
export default EverydayWordProblemsMatcher;
