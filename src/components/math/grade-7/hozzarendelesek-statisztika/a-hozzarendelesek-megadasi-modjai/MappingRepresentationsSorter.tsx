import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MappingRepresentationsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A Megadás Formája',
    subtitle: 'Válogasd szét a kifejezéseket a megadás formája szerint: szöveges, képlet, vagy táblázat/számpár!',
    categories: [
      {
        id: 'cat-text',
        name: 'Szöveges Utasítás',
        description: 'Természetes nyelven leírt szabály',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-formula',
        name: 'Képlet / Formula',
        description: 'Algebrai egyenlet formájában megadott szabály (y = f(x))',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-table-pair',
        name: 'Táblázat vagy Számpárok',
        description: 'Értéktáblázat oszlopai vagy (x; y) rendezett számpárok',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: '„Minden számhoz a háromszorosánál 2-vel nagyobb számot rendelünk”',
        category: 'cat-text',
        figure: (
          <span className="text-[10px] italic text-indigo-700">Szöveges szabály</span>
        )
      },
      {
        id: 's1-2',
        label: 'y = 5x - 2',
        category: 'cat-formula',
        figure: (
          <span className="text-[10px] font-mono font-bold text-blue-700">5x - 2</span>
        )
      },
      {
        id: 's1-3',
        label: 'f(x) = x² + 1',
        category: 'cat-formula',
        figure: (
          <span className="text-[10px] font-mono font-bold text-blue-700">x² + 1</span>
        )
      },
      {
        id: 's1-4',
        label: 'H = { (1; 3), (2; 5), (3; 7) }',
        category: 'cat-table-pair',
        figure: (
          <span className="text-[10px] font-mono font-bold text-teal-700">&#123;(x;y)&#125;</span>
        )
      },
      {
        id: 's1-5',
        label: '„A szám feléből vonjunk ki 4-et”',
        category: 'cat-text',
        figure: (
          <span className="text-[10px] italic text-indigo-700">Fele - 4</span>
        )
      },
      {
        id: 's1-6',
        label: 'x: [-1, 0, 1] | y: [2, 4, 6] értéktáblázat',
        category: 'cat-table-pair',
        figure: (
          <span className="text-[10px] font-mono font-bold text-teal-700">x | y táblázat</span>
        )
      },
      {
        id: 's1-7',
        label: 'x ↦ 10 - 2x',
        category: 'cat-formula',
        figure: (
          <span className="text-[10px] font-mono font-bold text-blue-700">x ↦ 10-2x</span>
        )
      },
      {
        id: 's1-8',
        label: '„Minden diákhoz hozzárendeljük a születési évét”',
        category: 'cat-text',
        figure: (
          <span className="text-[10px] italic text-indigo-700">Szöveges utasítás</span>
        )
      },
      {
        id: 's1-9',
        label: 'P(4; 9), Q(-2; -3) koordinátapontok',
        category: 'cat-table-pair',
        figure: (
          <span className="text-[10px] font-mono font-bold text-teal-700">Pontok</span>
        )
      },
      {
        id: 's1-10',
        label: 'y = x / 4 + 7',
        category: 'cat-formula',
        figure: (
          <span className="text-[10px] font-mono font-bold text-blue-700">x/4 + 7</span>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Folytonos Vonal vagy Különálló Pontok?',
    subtitle: 'Döntsd el a hozzárendelésről, hogy folytonos vonallal köthető-e össze, vagy különálló pontokból áll a grafikonja!',
    categories: [
      {
        id: 'cat-cont',
        name: 'Folytonos Vonal (R)',
        description: 'Az értelmezési tartomány a valós számok (R), minden köztes tört érték létezik',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-disc',
        name: 'Különálló Pontok (Z, N)',
        description: 'Diszkrét értelmezési tartomány (csak egész számok, darabszámok vagy nevek)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'f(x) = 2x + 1, ahol x tetszőleges valós szám (R)',
        category: 'cat-cont',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">x ∈ R</span>
        )
      },
      {
        id: 's2-2',
        label: 'Megvásárolt füzetek száma és a fizetendő összeg',
        category: 'cat-disc',
        figure: (
          <span className="text-[10px] font-bold text-amber-700">Darabszám (1,2,3..)</span>
        )
      },
      {
        id: 's2-3',
        label: 'Egy gépkocsi által megtett út az eltelt idő függvényében',
        category: 'cat-cont',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Idő (folytonos)</span>
        )
      },
      {
        id: 's2-4',
        label: 'Dobókocka dobásértékeihez (1-6) rendelt pontszámok',
        category: 'cat-disc',
        figure: (
          <span className="text-[10px] font-bold text-amber-700">Kockadobás</span>
        )
      },
      {
        id: 's2-5',
        label: 'f(x) = 3 - x, alaphalmaz az egész számok halmaza (Z)',
        category: 'cat-disc',
        figure: (
          <span className="text-[10px] font-bold text-amber-700">x ∈ Z</span>
        )
      },
      {
        id: 's2-6',
        label: 'A víz forrási hőmérsékletének változása melegítés közben',
        category: 'cat-cont',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Hőmérséklet</span>
        )
      },
      {
        id: 's2-7',
        label: 'Heti napok sorszáma és a napi eladott színházjegyek száma',
        category: 'cat-disc',
        figure: (
          <span className="text-[10px] font-bold text-amber-700">Jegyek száma</span>
        )
      },
      {
        id: 's2-8',
        label: 'y = 0,5x, ahol a bemenet tetszőleges mérhető hosszúság (cm)',
        category: 'cat-cont',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Hossz (folytonos)</span>
        )
      },
      {
        id: 's2-9',
        label: 'Az osztály tanulóinak magassága a névsor sorszáma szerint',
        category: 'cat-disc',
        figure: (
          <span className="text-[10px] font-bold text-amber-700">Névsor sorszám</span>
        )
      },
      {
        id: 's2-10',
        label: 'f(x) = x², valós számok intervallumán: [-3; 3]',
        category: 'cat-cont',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Intervallum (R)</span>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Illeszkedés az f(x) = 2x - 3 Grafikonjára',
    subtitle: 'Számold ki és döntsd el, hogy a megadott pontok rajta vannak-e az f(x) = 2x - 3 egyenesén!',
    categories: [
      {
        id: 'cat-on',
        name: 'Rajta van az egyenesen (y = 2x - 3)',
        description: 'A koordináták kielégítik a képletet: 2x - 3 = y',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-not-on',
        name: 'NINCS rajta az egyenesen',
        description: 'A számítás eredménye eltér az y értéktől: 2x - 3 ≠ y',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: 'P(0; -3)  [2 · 0 - 3 = -3]',
        category: 'cat-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">(0; -3)</span>
        )
      },
      {
        id: 's3-2',
        label: 'P(1; -1)  [2 · 1 - 3 = -1]',
        category: 'cat-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">(1; -1)</span>
        )
      },
      {
        id: 's3-3',
        label: 'P(2; 1)  [2 · 2 - 3 = 1]',
        category: 'cat-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">(2; 1)</span>
        )
      },
      {
        id: 's3-4',
        label: 'P(3; 3)  [2 · 3 - 3 = 3]',
        category: 'cat-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">(3; 3)</span>
        )
      },
      {
        id: 's3-5',
        label: 'P(-1; -5)  [2 · (-1) - 3 = -5]',
        category: 'cat-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">(-1; -5)</span>
        )
      },
      {
        id: 's3-6',
        label: 'P(4; 7)  [2 · 4 - 3 = 5 ≠ 7]',
        category: 'cat-not-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">(4; 7)</span>
        )
      },
      {
        id: 's3-7',
        label: 'P(1; 1)  [2 · 1 - 3 = -1 ≠ 1]',
        category: 'cat-not-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">(1; 1)</span>
        )
      },
      {
        id: 's3-8',
        label: 'P(0; 0)  [2 · 0 - 3 = -3 ≠ 0]',
        category: 'cat-not-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">(0; 0)</span>
        )
      },
      {
        id: 's3-9',
        label: 'P(-2; 1)  [2 · (-2) - 3 = -7 ≠ 1]',
        category: 'cat-not-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">(-2; 1)</span>
        )
      },
      {
        id: 's3-10',
        label: 'P(5; 7)  [2 · 5 - 3 = 7]',
        category: 'cat-on',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">(5; 7)</span>
        )
      }
    ]
  }
};

export const MappingRepresentationsSorter: React.FC<MappingRepresentationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g7-stats-rep',
  topicTitle = '2. A hozzárendelések megadási módjai'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={currentLevel || level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
    />
  );
};

export default MappingRepresentationsSorter;
