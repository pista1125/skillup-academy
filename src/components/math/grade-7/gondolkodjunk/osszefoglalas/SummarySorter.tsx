import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface SummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onNextLevel?: () => void;
  level?: 1 | 2 | 3;
}

// 3 levels × 10 items = 30 items
const sorterLevelsData: Record<1 | 2 | 3, SorterLevelConfig> = {
  // ==========================================
  // LEVEL 1: Fejezeti Témakörök
  // ==========================================
  1: {
    categories: [
      { id: 'combinatorics', label: '1-3. Kombinatorika & Sorrendek', color: 'violet' },
      { id: 'graphs', label: '4. Gráfelmélet', color: 'teal' },
      { id: 'logic-games', label: '5-6. Logika & Játékok', color: 'amber' }
    ],
    items: [
      { id: 's1-1', text: '5 ember sorrendjeinek száma (5! = 120)', categoryId: 'combinatorics' },
      { id: 's1-2', text: 'Csúcsok fokszámainak összege (Σ d(v) = 2|E|)', categoryId: 'graphs' },
      { id: 's1-3', text: '21-es kavicslevételi játék nyerő stratégiája', categoryId: 'logic-games' },
      { id: 's1-4', text: 'PIN kódok száma visszatevéssel (10⁴ = 10 000)', categoryId: 'combinatorics' },
      { id: 's1-5', text: 'Teljes gráf (K₅) éleinek száma ((5 · 4)/2 = 10 él)', categoryId: 'graphs' },
      { id: 's1-6', text: 'Skatulya-elv (13 ember közt van 2 azonos hónapban született)', categoryId: 'logic-games' },
      { id: 's1-7', text: 'Fa gráf (T₆) éleinek száma (6 - 1 = 5 él)', categoryId: 'graphs' },
      { id: 's1-8', text: 'Lovagok és lókötők szigetének fejtörői', categoryId: 'logic-games' },
      { id: 's1-9', text: 'Fadiagram készítése pénzérmék feldobásához', categoryId: 'combinatorics' },
      { id: 's1-10', text: 'Szimmetria alapú stratégia érmék lerakásakor', categoryId: 'logic-games' }
    ]
  },

  // ==========================================
  // LEVEL 2: Logikai Bizonyosságok
  // ==========================================
  2: {
    categories: [
      { id: 'always-true', label: 'Mindig IGAZ (Matematikai Tétel)', color: 'emerald' },
      { id: 'impossible', label: 'LEHETETLEN (Ellentmondás)', color: 'rose' }
    ],
    items: [
      { id: 's2-1', text: 'Egy gráfban a csúcsok fokszámainak összege mindig páros szám.', categoryId: 'always-true' },
      { id: 's2-2', text: 'Egy gráfban pontosan 3 darab páratlan fokszámú csúcs van.', categoryId: 'impossible' },
      { id: 's2-3', text: 'Két páratlan szám összege mindig páros szám.', categoryId: 'always-true' },
      { id: 's2-4', text: 'Egy n csúcsú fa gráfnak n + 2 éle van.', categoryId: 'impossible' },
      { id: 's2-5', text: 'Három egymást követő egész szám összege mindig osztható 3-mal.', categoryId: 'always-true' },
      { id: 's2-6', text: '13 ember közül mind a 13 különböző hónapban született.', categoryId: 'impossible' },
      { id: 's2-7', text: 'Bármely n csúcsú teljes gráf éleinek száma n(n-1)/2.', categoryId: 'always-true' },
      { id: 's2-8', text: 'Egy lakos azt mondja: „Én egy hazug vagyok.”', categoryId: 'impossible' },
      { id: 's2-9', text: 'Két egymást követő egész szám szorzata mindig páros.', categoryId: 'always-true' },
      { id: 's2-10', text: '5 pontot helyezünk el 4 skatulyában, és mindegyikbe legfeljebb 1 jut.', categoryId: 'impossible' }
    ]
  },

  // ==========================================
  // LEVEL 3: Számítási Módszerek
  // ==========================================
  3: {
    categories: [
      { id: 'factorial-rule', label: 'Faktoriális / Szorzási Szabály', color: 'purple' },
      { id: 'graph-rule', label: 'Gráfelméleti Képlet', color: 'teal' },
      { id: 'game-pigeonhole', label: 'Skatulya-elv / Játék Moduló', color: 'amber' }
    ],
    items: [
      { id: 's3-1', text: 'Hányféleképpen ülhet le 6 diák egy padsorba? (6!)', categoryId: 'factorial-rule' },
      { id: 's3-2', text: 'Hány mérkőzést játszanak le 8 csapat körmérkőzésén? ((8·7)/2)', categoryId: 'graph-rule' },
      { id: 's3-3', text: 'Legalább hány zoknit kell húzni 3 színből egy biztos párhoz? (3+1)', categoryId: 'game-pigeonhole' },
      { id: 's3-4', text: 'Hány 4-jegyű szám készíthető az 1, 2, 3, 4 jegyekből? (4!)', categoryId: 'factorial-rule' },
      { id: 's3-5', text: 'Mennyi a fokszámok összege egy 10 élű gráfban? (2 · 10 = 20)', categoryId: 'graph-rule' },
      { id: 's3-6', text: 'Mit kell hagyni a 21-es játékban az ellenfélnek? (4 többszörösei)', categoryId: 'game-pigeonhole' },
      { id: 's3-7', text: 'Hány menü állítható össze 2 levesből és 5 főételből? (2 · 5)', categoryId: 'factorial-rule' },
      { id: 's3-8', text: 'Hány éle van egy 8 csúcsú fa gráfnak? (8 - 1 = 7 él)', categoryId: 'graph-rule' },
      { id: 's3-9', text: '37 diák közül legalább hányan születtek ugyanabban a hónapban? (⌈37/12⌉ = 4)', categoryId: 'game-pigeonhole' },
      { id: 's3-10', text: 'Hány 3-betűs szó készíthető az A, B, C betűkből ismétléssel? (3³ = 27)', categoryId: 'factorial-rule' }
    ]
  }
};

export const SummarySorter: React.FC<SummarySorterProps> = ({
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
      topicId="g7-logic-summary"
      topicTitle="7. Összefoglalás Csoportosító Játék"
      badgeText="7. Osztály • Gondolkodjunk!"
      themeColor="rose"
      levels={sorterLevelsData}
    />
  );
};
