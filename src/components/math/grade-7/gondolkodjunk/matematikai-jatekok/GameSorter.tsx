import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface GameSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onNextLevel?: () => void;
  level?: 1 | 2 | 3;
}

// 3 levels × 10 items = 30 items
const sorterLevelsData: Record<1 | 2 | 3, SorterLevelConfig> = {
  // ==========================================
  // LEVEL 1: Nyerő vs Vesztő Pozíciók (Kavicslevétel, max 3 elvehető)
  // ==========================================
  1: {
    categories: [
      { id: 'winning-start', label: 'Kezdőnek Nyerő Pozíció (Nem osztható 4-gyel)', color: 'emerald' },
      { id: 'losing-start', label: 'Kezdőnek Vesztő Pozíció (Osztható 4-gyel)', color: 'rose' }
    ],
    items: [
      { id: 's1-1', text: '21 kavics (1 elvételével 20 marad)', categoryId: 'winning-start' },
      { id: 's1-2', text: '20 kavics (bármit lép a kezdő, az ellenfél kiegészítheti 4-re)', categoryId: 'losing-start' },
      { id: 's1-3', text: '19 kavics (3 elvételével 16 marad)', categoryId: 'winning-start' },
      { id: 's1-4', text: '16 kavics (a kezdő nem tudja 4 többszörösét hagyni)', categoryId: 'losing-start' },
      { id: 's1-5', text: '15 kavics (3 elvételével 12 marad)', categoryId: 'winning-start' },
      { id: 's1-6', text: '12 kavics (4 többszöröse)', categoryId: 'losing-start' },
      { id: 's1-7', text: '10 kavics (2 elvételével 8 marad)', categoryId: 'winning-start' },
      { id: 's1-8', text: '8 kavics (4 többszöröse)', categoryId: 'losing-start' },
      { id: 's1-9', text: '5 kavics (1 elvételével 4 marad)', categoryId: 'winning-start' },
      { id: 's1-10', text: '4 kavics (a kezdő 1, 2 vagy 3-at vesz el, az ellenfél elviszi a maradékot)', categoryId: 'losing-start' }
    ]
  },

  // ==========================================
  // LEVEL 2: Stratégia Fajtája
  // ==========================================
  2: {
    categories: [
      { id: 'symmetry', label: 'Szimmetria alapú stratégia', color: 'indigo' },
      { id: 'retrograde', label: 'Visszafelé gondolkodás (Maradékos osztás)', color: 'emerald' },
      { id: 'chance', label: 'Szerencsejáték (Nincs biztos stratégia)', color: 'amber' }
    ],
    items: [
      { id: 's2-1', text: 'Érmék lerakása kerek asztalon', categoryId: 'symmetry' },
      { id: 's2-2', text: '21-es kavicslevétel (max 3 elvehető)', categoryId: 'retrograde' },
      { id: 's2-3', text: 'Két egyforma kupacos Nim játék', categoryId: 'symmetry' },
      { id: 's2-4', text: 'Ki nevet a végén (dobókockával)', categoryId: 'chance' },
      { id: 's2-5', text: '100-ig számolós játék (max 9 adható hozzá)', categoryId: 'retrograde' },
      { id: 's2-6', text: 'Szimmetrikus táblán dominók lehelyezése', categoryId: 'symmetry' },
      { id: 's2-7', text: 'Rulett és lottóhúzás', categoryId: 'chance' },
      { id: 's2-8', text: 'Kavicslevétel: 30 kavicsból 1..5 vehető el (6-os maradék)', categoryId: 'retrograde' },
      { id: 's2-9', text: 'Kétkupacos gyufajáték egyforma kezdő kupacokkal', categoryId: 'symmetry' },
      { id: 's2-10', text: 'Kő-papír-olló', categoryId: 'chance' }
    ]
  },

  // ==========================================
  // LEVEL 3: Igazmondók és Hazugok Kijelentései
  // ==========================================
  3: {
    categories: [
      { id: 'knight-only', label: 'Csak Igazmondó (Lovag) mondhatja', color: 'emerald' },
      { id: 'knave-only', label: 'Csak Hazug (Lókötő) mondhatja', color: 'rose' },
      { id: 'impossible', label: 'Senki sem mondhatja (Lehetetlen)', color: 'purple' }
    ],
    items: [
      { id: 's3-1', text: '„Én igazmondó vagyok.” (Igazmondó igazat mond, hazug hazudik)', categoryId: 'impossible' }, // wait, both can say it!
      { id: 's3-2', text: '„Én hazug vagyok.”', categoryId: 'impossible' },
      { id: 's3-3', text: '„Ketten vagyunk: a társam hazug, én igazmondó vagyok.” (ha a társ valóban hazug)', categoryId: 'knight-only' },
      { id: 's3-4', text: '„Mindketten hazugok vagyunk.” (csak hazug mondhatja, mert igazmondó nem mondhat hamisat)', categoryId: 'knave-only' },
      { id: 's3-5', text: '„2 + 2 = 5”', categoryId: 'knave-only' },
      { id: 's3-6', text: '„A 17 prímszám.”', categoryId: 'knight-only' },
      { id: 's3-7', text: '„Ma kedd van és ma nem kedd van.” (Logikai ellentmondás)', categoryId: 'knave-only' },
      { id: 's3-8', text: '„Én most hazudni fogok.”', categoryId: 'impossible' },
      { id: 's3-9', text: '„A háromszög belső szögeinek összege 180°.”', categoryId: 'knight-only' },
      { id: 's3-10', text: '„Egyikünk sem mond igazat soha.” (Összetett hamis állítás)', categoryId: 'knave-only' }
    ]
  }
};

export const GameSorter: React.FC<GameSorterProps> = ({
  onBack,
  onSwitchToTheory,
  onNextLevel,
  level = 1
}) => {
  return (
    <SorterTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      level={level}
      topicId="g7-logic-games"
      topicTitle="6. Matematikai játékok Csoportosító Játék"
      badgeText="7. Osztály • Gondolkodjunk!"
      themeColor="amber"
      levels={sorterLevelsData}
    />
  );
};
