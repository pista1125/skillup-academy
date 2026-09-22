import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GameMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onNextLevel?: () => void;
  level?: DifficultyLevel;
  topicId?: string;
  topicTitle?: string;
}

// 3 levels × 8 pairs = 24 pairs
const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  // ==========================================
  // LEVEL 1: Alapfogalmak és Szabályok
  // ==========================================
  1: {
    level: 1,
    title: '1. Szint: Játékok Alapfogalmai és Szabályai',
    description: 'Párosítsd a játékelméleti alapfogalmakat a megfelelő leírásukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Nyerő pozíció',
        value: 'Olyan állás, amelyből létezik lépés a másik vesztő pozícióba hozására'
      },
      {
        id: 'p2',
        prompt: 'Vesztő pozíció',
        value: 'Bármit lép a játékos, az ellenfél nyerő pozícióba kerülhet'
      },
      {
        id: 'p3',
        prompt: '21-es kavicslevétel (max 3 elvehető)',
        value: 'A nyerő számok a 4 többszörösei (4, 8, 12, 16, 20)'
      },
      {
        id: 'p4',
        prompt: 'Kerek asztalon érmék lerakása',
        value: 'Kezdő elfoglalja a középpontot, majd tükrözi a lépéseket'
      },
      {
        id: 'p5',
        prompt: 'Két egyforma kupacos Nim játék',
        value: 'A 2. játékos szimmetrikusan ugyanannyit vesz el a másik kupacból'
      },
      {
        id: 'p6',
        prompt: 'Retrográd analízis',
        value: 'Visszafelé gondolkodás: a célállástól fejtjük vissza a nyerő lépéseket'
      },
      {
        id: 'p7',
        prompt: 'Teljes információjú játék',
        value: 'Nincsenek rejtett kártyák és nincs szerencseelem (pl. dobókocka)'
      },
      {
        id: 'p8',
        prompt: 'Igazmondók (Lovagok)',
        value: 'Minden kijelentésük kivétel nélkül mindig IGAZ'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Nyerő Lépések a Kavicslevételi Játékokban
  // ==========================================
  2: {
    level: 2,
    title: '2. Szint: Nyerő Kezdőlépések a Kavicsos Játékokban',
    description: 'Párosítsd a kezdő kavicsszámokat a helyes nyerő kezdőlépéssel (max 3 elvehető, utolsó nyer)!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Kezdőállás: 21 kavics (elvehető: 1..3)',
        value: 'Kezdő elvesz 1 kavicsot → 20 marad (4 többszöröse)'
      },
      {
        id: 'p2',
        prompt: 'Kezdőállás: 15 kavics (elvehető: 1..3)',
        value: 'Kezdő elvesz 3 kavicsot → 12 marad (4 többszöröse)'
      },
      {
        id: 'p3',
        prompt: 'Kezdőállás: 18 kavics (elvehető: 1..3)',
        value: 'Kezdő elvesz 2 kavicsot → 16 marad (4 többszöröse)'
      },
      {
        id: 'p4',
        prompt: 'Kezdőállás: 16 kavics (elvehető: 1..3)',
        value: 'Vesztő pozíció a kezdőnek (a 2. játékosnak van nyerő stratégiája)'
      },
      {
        id: 'p5',
        prompt: 'Kezdőállás: 23 kavics (elvehető: 1..3)',
        value: 'Kezdő elvesz 3 kavicsot → 20 marad (4 többszöröse)'
      },
      {
        id: 'p6',
        prompt: 'Kezdőállás: 10 kavics (elvehető: 1..3)',
        value: 'Kezdő elvesz 2 kavicsot → 8 marad (4 többszöröse)'
      },
      {
        id: 'p7',
        prompt: 'Kezdőállás: 13 kavics (elvehető: 1..3)',
        value: 'Kezdő elvesz 1 kavicsot → 12 marad (4 többszöröse)'
      },
      {
        id: 'p8',
        prompt: 'Kezdőállás: 20 kavics (elvehető: 1..3)',
        value: 'Vesztő pozíció a kezdőnek (a 2. játékos tud nyerni)'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Logikai Fejtörők és Haladó Stratégiák
  // ==========================================
  3: {
    level: 3,
    title: '3. Szint: Logikai Fejtörők és Haladó Szabályok',
    description: 'Párosítsd a feladványokat a logikai következtetésekkel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Kavicslevétel: max 5 vehető el egy lépésben',
        value: 'A nyerő kulcsszámok a 6 többszörösei (m + 1 = 6)'
      },
      {
        id: 'p2',
        prompt: 'Lakos mondja: „Mindketten hazugok vagyunk.”',
        value: 'A beszélő hazug, a társa igazmondó (lovag)'
      },
      {
        id: 'p3',
        prompt: 'Lakos mondja: „Legalább egyikünk hazug.”',
        value: 'A beszélő igazmondó, a társa hazug (lókötő)'
      },
      {
        id: 'p4',
        prompt: 'Misere játék (az utolsó elvevő VESZÍT)',
        value: 'A cél a végén 1 kavicsot hagyni az ellenfélnek'
      },
      {
        id: 'p5',
        prompt: '100-as játék: 1..9 adható hozzá felváltva',
        value: 'A kulcsszámok: 1, 11, 21, 31, 41... 89, 99 (10-zel osztva 1 maradék)'
      },
      {
        id: 'p6',
        prompt: 'Szimmetrikus tábla (középpont nélkül, pl. 2×n mező)',
        value: 'A 2. játékos tud nyerni tengelyes tükrözéssel'
      },
      {
        id: 'p7',
        prompt: 'Kérdés a válaszútnál: „Mit mondana a másik útbaigazító?”',
        value: 'Mindig a rossz utat fogja mondani, így a másik utat kell választani'
      },
      {
        id: 'p8',
        prompt: 'Lakos mondja: „Én egy hazug vagyok.”',
        value: 'Lehetetlen kijelentés a szigeten (senki sem mondhatja)'
      }
    ]
  }
};

export const GameMatcher: React.FC<GameMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  onNextLevel,
  level = 1,
  topicId = 'g7-logic-games',
  topicTitle = '6. Matematikai játékok'
}) => {
  return (
    <MatcherTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      level={level}
      topicId={topicId}
      topicTitle={topicTitle}
      badgeText="7. Osztály • Gondolkodjunk!"
      themeColor="amber"
      levels={matcherLevels}
    />
  );
};
