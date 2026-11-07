import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Legcélravezetőbb Megoldási Stratégia',
    subtitle: 'Melyik megközelítéssel oldható meg leggyorsabban a rendszer?',
    categories: [
      {
        id: 'cat-sub-best',
        name: 'Behelyettesítés a leggyorsabb',
        description: 'Van 1 vagy −1 együttható, törtek nélkül kifejezhető',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-elim-best',
        name: 'Elimináció (Összeadás / Kivonás)',
        description: 'Már van ellentett/azonos együttható, vagy kis szorzókkal kiejthető',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-fraction-prep',
        name: 'Közös nevezővel kezdendő',
        description: 'Törtes kifejezéseket tartalmaz, először egész együtthatóssá kell tenni',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Behelyettesítés
      { id: 'ps1-1', label: 'x + 3y = 7  és  2x − 5y = 3 (I-ből x = 7 − 3y)', category: 'cat-sub-best' },
      { id: 'ps1-2', label: '4x − y = 9  és  3x + 2y = 12 (I-ből y = 4x − 9)', category: 'cat-sub-best' },
      { id: 'ps1-3', label: 'x = 2y − 1  és  5x + 3y = 21 (x már kifejezve készen)', category: 'cat-sub-best' },
      { id: 'ps1-4', label: '2x + y = 10  és  3x + 4y = 25 (I-ből y = 10 − 2x)', category: 'cat-sub-best' },

      // Elimináció
      { id: 'ps1-5', label: '3x + 5y = 17  és  2x − 5y = 3 (közvetlen összeadás: 5x = 20)', category: 'cat-elim-best' },
      { id: 'ps1-6', label: '7x + 4y = −10  és  −9x + 8y = 210 (I · 2 után kivonás)', category: 'cat-elim-best' },
      { id: 'ps1-7', label: '4x + 3y = 19  és  4x − 2y = 4 (közvetlen kivonás: 5y = 15)', category: 'cat-elim-best' },
      { id: 'ps1-8', label: '3x + 4y = 10  és  2x + 3y = 7 (I · 2, II · 3 elimináció)', category: 'cat-elim-best' },

      // Közös nevező
      { id: 'ps1-9', label: '(3x−7)/5 + (4y+5)/15 = 4  és  (3y−7)/5 + (4x+5)/15 = 6 (szorzás 15-tel)', category: 'cat-fraction-prep' },
      { id: 'ps1-10', label: 'x/2 + y/3 = 5  és  x/4 − y/6 = 0 (szorzás 6-tal és 12-vel)', category: 'cat-fraction-prep' },
      { id: 'ps1-11', label: '(x+1)/2 − (y−1)/3 = 1  és  x/4 + y/2 = 3 (törtmentesítés)', category: 'cat-fraction-prep' },
      { id: 'ps1-12', label: '2x/5 + 3y/10 = 1  és  x/3 − y/2 = −1 (szorzás 10-zel és 6-tal)', category: 'cat-fraction-prep' }
    ]
  },
  2: {
    title: 'Paraméteres Rendszerek Megoldásszáma',
    subtitle: 'Sorold be a paraméteres rendszereket és eredményeket a megoldásszámuk szerint!',
    categories: [
      {
        id: 'cat-p-one',
        name: 'Pontosan 1 Megoldáspár',
        description: 'A meredekségek eltérnek, a determináns nem nulla (a₁b₂ − a₂b₁ ≠ 0)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-p-none',
        name: 'Nincs Megoldás (∅)',
        description: 'Párhuzamosak, az együtthatók arányosak, de a konstansok nem (0 = k)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-p-infinite',
        name: 'Végtelen Sok Megoldás',
        description: 'Egybeesők, az egyenletek egymás számszorosai (0 = 0)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'ps2-1', label: '2x + py = 6  és  4x + 6y = 5, ha p ≠ 3', category: 'cat-p-one' },
      { id: 'ps2-2', label: 'px + 2y = 4  és  2x + py = 4, ha p ∉ {2; −2}', category: 'cat-p-one' },
      { id: 'ps2-3', label: '3x + y = 10  és  x − 2y = 1 (determináns = −7 ≠ 0)', category: 'cat-p-one' },
      { id: 'ps2-4', label: 'mx + y = 1  és  x + my = 1, ha m ≠ ±1', category: 'cat-p-one' },

      // Nincs megoldás
      { id: 'ps2-5', label: '2x + 3y = 6  és  4x + 6y = 5 (0 = 7 ellentmondás)', category: 'cat-p-none' },
      { id: 'ps2-6', label: 'x + py = 4  és  2x + 6y = 5, ha p = 3', category: 'cat-p-none' },
      { id: 'ps2-7', label: '2x + 2y = 12  és  x + y = 5 (kivonva: 0 = 2)', category: 'cat-p-none' },
      { id: 'ps2-8', label: '3x − y = 4  és  6x − 2y = 10 (párhuzamos egyenesek)', category: 'cat-p-none' },

      // Végtelen sok
      { id: 'ps2-9', label: '2x + 3y = 6  és  4x + 6y = 12 (II = 2 · I)', category: 'cat-p-infinite' },
      { id: 'ps2-10', label: 'x + py = 4  és  2x + 6y = 8, ha p = 3 (0 = 0)', category: 'cat-p-infinite' },
      { id: 'ps2-11', label: '3x − y = 4  és  6x − 2y = 8 (azonosság)', category: 'cat-p-infinite' },
      { id: 'ps2-12', label: 'x/2 + y/3 = 1  és  3x + 2y = 6 (azonos egyenesek)', category: 'cat-p-infinite' }
    ]
  },
  3: {
    title: 'Szöveges Feladatok Típusmodelljei',
    subtitle: 'Milyen típusú egyenletrendszerrel írható le a valós probléma?',
    categories: [
      {
        id: 'cat-receipt-model',
        name: 'Vásárlási és Ár-Mérlegmodell',
        description: 'Büfé, bútorvásárlás árengedménnyel, biobolt haszonkulccsal',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-grid-model',
        name: 'Rács / Parcella Modell (xy szorzat)',
        description: 'Erdőgazdaság fái, nézőtéri székek, téglalap alakú parcellák',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-balance-model',
        name: 'Megmaradási és Relatív Mozgásmodell',
        description: 'Két hordó bor öntögetése, pénzmegosztás, körpályás lovasok',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      // Vásárlási
      { id: 'ps3-1', label: 'Péter és Pál a büfében (szendvicsek és ásványvizek összege)', category: 'cat-receipt-model' },
      { id: 'ps3-2', label: 'Asztalok és székek vásárlása szezonvégi 20% és 1/3 kedvezménnyel', category: 'cat-receipt-model' },
      { id: 'ps3-3', label: 'Biobolt: 2200 és 1400 Ft-os kesudió-gyümölcs 25% haszonnal', category: 'cat-receipt-model' },
      { id: 'ps3-4', label: 'Mosogatógép 3 programjának víz- és áramköltsége', category: 'cat-receipt-model' },

      // Rács / parcella
      { id: 'ps3-5', label: 'Erdőgazdaság: Fenyő, tölgy (−4 sor, −5 fa) és platán (+3 sor, +2 fa)', category: 'cat-grid-model' },
      { id: 'ps3-6', label: 'Díszterem székei: +1 szék esetén −2 forduló, −1 szék esetén +4 forduló', category: 'cat-grid-model' },
      { id: 'ps3-7', label: 'Mozi nézőtér: sorok számának és a soronkénti székek számának szorzata', category: 'cat-grid-model' },
      { id: 'ps3-8', label: 'Téglalap területváltozása az oldalak növelése és csökkentése után', category: 'cat-grid-model' },

      // Megmaradási / mozgás
      { id: 'ps3-9', label: 'Két hordó bor: 480 liter oda-vissza öntögetése egyenlő szintre', category: 'cat-balance-model' },
      { id: 'ps3-10', label: 'Két ember 120 ezüstje: add nekem a pénzed 2/3-át, illetve 1/2-ét', category: 'cat-balance-model' },
      { id: 'ps3-11', label: '3000 m-es körpálya szemközti pontjaiból induló két lovas találkozása', category: 'cat-balance-model' },
      { id: 'ps3-12', label: 'Osztálykirándulás buszköltsége hiányzó tanulók esetén', category: 'cat-balance-model' }
    ]
  }
};

export const PracticeSorter: React.FC<PracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '4. Gyakorlás (Feladatmegoldási stratégiák)'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      title="4. Gyakorlás – Csoportosító Játék"
      subtitle="Csoportosítsd az egyenletrendszereket módszerük, megoldásszámuk és feladattípusuk szerint!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 10. LECKE"
      levels={sorterLevels}
      currentLevel={activeLvl}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

