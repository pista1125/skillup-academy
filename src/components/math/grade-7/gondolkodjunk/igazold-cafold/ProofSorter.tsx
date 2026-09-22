import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface ProofSorterProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
  onNextLevel?: () => void;
  level?: 1 | 2 | 3;
}

// 3 levels × 10 items = 30 items
const sorterLevelsData: Record<1 | 2 | 3, SorterLevelConfig> = {
  // ==========================================
  // LEVEL 1: Mondatok és Állítások Típusai
  // ==========================================
  1: {
    categories: [
      { id: 'true-stmt', label: 'Igaz Kijelentés (I)', color: 'emerald' },
      { id: 'false-stmt', label: 'Hamis Kijelentés (H)', color: 'rose' },
      { id: 'not-stmt', label: 'Nem Kijelentés / Nyitott mondat', color: 'amber' }
    ],
    items: [
      { id: 's1-1', text: '„A 24 osztható 3-mal és 8-cal.”', categoryId: 'true-stmt' },
      { id: 's1-2', text: '„Minden prímszám páratlan.”', categoryId: 'false-stmt' },
      { id: 's1-3', text: '„Mennyi a 48 fele?”', categoryId: 'not-stmt' },
      { id: 's1-4', text: '„A háromszög belső szögeinek összege 180°.”', categoryId: 'true-stmt' },
      { id: 's1-5', text: '„7 · 8 = 54”', categoryId: 'false-stmt' },
      { id: 's1-6', text: '„2x + 5 = 17”', categoryId: 'not-stmt' },
      { id: 's1-7', text: '„A négyzet minden szöge derékszög.”', categoryId: 'true-stmt' },
      { id: 's1-8', text: '„Minden téglalap négyzet.”', categoryId: 'false-stmt' },
      { id: 's1-9', text: '„Légy szíves, rajzolj egy kört!”', categoryId: 'not-stmt' },
      { id: 's1-10', text: '„A 0 páros szám.”', categoryId: 'true-stmt' }
    ]
  },

  // ==========================================
  // LEVEL 2: Igazolás (Bizonyítás) vs Cáfolat (Ellenpélda)
  // ==========================================
  2: {
    categories: [
      { id: 'proof-needed', label: 'Általános Bizonyítás Szükséges (Igaz tétel)', color: 'emerald' },
      { id: 'counterexample', label: 'Egyetlen Ellenpéldával Megdönthető (Hamis állítás)', color: 'rose' }
    ],
    items: [
      { id: 's2-1', text: '„Két páratlan szám összege mindig páros.”', categoryId: 'proof-needed' },
      { id: 's2-2', text: '„Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel is.” (Ellenpélda: 12)', categoryId: 'counterexample' },
      { id: 's2-3', text: '„Három egymást követő egész szám összege mindig osztható 3-mal.”', categoryId: 'proof-needed' },
      { id: 's2-4', text: '„Minden szám négyzete nagyobb magánál a számnál.” (Ellenpélda: 0 vagy 1)', categoryId: 'counterexample' },
      { id: 's2-5', text: '„Egy páros és egy páratlan szám szorzata mindig páros.”', categoryId: 'proof-needed' },
      { id: 's2-6', text: '„Ha egy négyszög átlói merőlegesek, akkor az rombusz.” (Ellenpélda: deltoid)', categoryId: 'counterexample' },
      { id: 's2-7', text: '„Két egymást követő egész szám szorzata mindig páros.”', categoryId: 'proof-needed' },
      { id: 's2-8', text: '„Két prímszám összege mindig páros.” (Ellenpélda: 2 + 3 = 5)', categoryId: 'counterexample' },
      { id: 's2-9', text: '„Egy háromszög bármely két oldalának összege nagyobb a harmadik oldalnál.”', categoryId: 'proof-needed' },
      { id: 's2-10', text: '„Minden szám, amelynek utolsó számjegye 5, osztható 10-zel.” (Ellenpélda: 15)', categoryId: 'counterexample' }
    ]
  },

  // ==========================================
  // LEVEL 3: Skatulya-elv és Logikai Biztosságok
  // ==========================================
  3: {
    categories: [
      { id: 'guaranteed', label: 'Biztosan Bekövetkezik (Garantált)', color: 'emerald' },
      { id: 'possible', label: 'Lehetséges, de NEM Biztos', color: 'amber' },
      { id: 'impossible', label: 'Lehetetlen (Ellentmondás)', color: 'rose' }
    ],
    items: [
      { id: 's3-1', text: '13 ember közül legalább kettő azonos hónapban született.', categoryId: 'guaranteed' },
      { id: 's3-2', text: '10 fekete és 10 fehér zokniból 2-t kihúzva azonos színűek lesznek.', categoryId: 'possible' },
      { id: 's3-3', text: 'Egy háromszögnek 2 tompaszöge van.', categoryId: 'impossible' },
      { id: 's3-4', text: '10 fekete és 10 fehér zokniból 3-at kihúzva biztosan van egy pár.', categoryId: 'guaranteed' },
      { id: 's3-5', text: 'Egy dobókockát 6-szor feldobva minden szám egyszer jön ki.', categoryId: 'possible' },
      { id: 's3-6', text: '3 páratlan szám összege páros számot ad.', categoryId: 'impossible' },
      { id: 's3-7', text: 'Egy 5 fős csoportban a fokszámok (kézfogások) összege páros.', categoryId: 'guaranteed' },
      { id: 's3-8', text: 'Egy gráfban pontosan 3 db páratlan fokszámú csúcs van.', categoryId: 'impossible' },
      { id: 's3-9', text: '37 ember közül legalább 4 azonos hónapban született (37/12 = 3.08 → 4).', categoryId: 'guaranteed' },
      { id: 's3-10', text: 'Egy 30 fős osztályban mindenki különböző napon ünnepli a névnapját.', categoryId: 'possible' }
    ]
  }
};

export const ProofSorter: React.FC<ProofSorterProps> = ({
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
      topicId="g7-logic-proofs"
      topicTitle="5. Igazold! Cáfold! Csoportosító Játék"
      badgeText="7. Osztály • Gondolkodjunk!"
      themeColor="cyan"
      levels={sorterLevelsData}
    />
  );
};
