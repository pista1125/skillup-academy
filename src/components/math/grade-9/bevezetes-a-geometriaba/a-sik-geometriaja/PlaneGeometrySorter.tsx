import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PlaneGeometrySorterProps {
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
    title: '1. Szint: Szögek Besorolása Nagyságuk Szerint',
    subtitle: 'Sorold be a megadott szögeket a megfelelő szögfajta kategóriájába!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszög (0° < α < 90°)',
        description: 'Kisebb a derékszögnél',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszög (90° < α < 180°)',
        description: '90° és 180° közötti szög',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-reflex',
        name: 'Homorúszög (180° < α < 360°)',
        description: 'Nagyobb az egyenesszögnél',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Hegyesszög
      { id: 'ps1-1', label: '18°', category: 'cat-acute' },
      { id: 'ps1-2', label: '45°', category: 'cat-acute' },
      { id: 'ps1-3', label: '72°', category: 'cat-acute' },
      { id: 'ps1-4', label: '89°', category: 'cat-acute' },
      // Tompaszög
      { id: 'ps1-5', label: '95°', category: 'cat-obtuse' },
      { id: 'ps1-6', label: '120°', category: 'cat-obtuse' },
      { id: 'ps1-7', label: '145°', category: 'cat-obtuse' },
      { id: 'ps1-8', label: '175°', category: 'cat-obtuse' },
      // Homorúszög
      { id: 'ps1-9', label: '190°', category: 'cat-reflex' },
      { id: 'ps1-10', label: '240°', category: 'cat-reflex' },
      { id: 'ps1-11', label: '300°', category: 'cat-reflex' },
      { id: 'ps1-12', label: '345°', category: 'cat-reflex' }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Fogalmak Osztályozása',
    subtitle: 'Rendszerezd az alapfogalmakat, vonalas alakzatokat és a szögpárokat!',
    categories: [
      {
        id: 'cat-primitives',
        name: 'Alapelemek & Egyenesek',
        description: '0D és 1D geometriai elemek és vonalak',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-angles',
        name: 'Szögek és Szögpárok',
        description: 'Két félegyenes által határolt szögek és kapcsolataik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-planar',
        name: 'Síkbeli Tartományok',
        description: '2D kiterjedésű felületek és térelválasztók',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Alapelemek & Egyenesek
      { id: 'ps2-1', label: 'Pont', category: 'cat-primitives' },
      { id: 'ps2-2', label: 'Egyenes', category: 'cat-primitives' },
      { id: 'ps2-3', label: 'Félegyenes', category: 'cat-primitives' },
      { id: 'ps2-4', label: 'Szakasz', category: 'cat-primitives' },
      // Szögek és Szögpárok
      { id: 'ps2-5', label: 'Csúcsszögek', category: 'cat-angles' },
      { id: 'ps2-6', label: 'Mellékszögek', category: 'cat-angles' },
      { id: 'ps2-7', label: 'Váltószögek', category: 'cat-angles' },
      { id: 'ps2-8', label: 'Pótszögek', category: 'cat-angles' },
      // Síkbeli Tartományok
      { id: 'ps2-9', label: 'Sík', category: 'cat-planar' },
      { id: 'ps2-10', label: 'Félsík', category: 'cat-planar' },
      { id: 'ps2-11', label: 'Konvex szögtartomány', category: 'cat-planar' }
    ]
  },
  3: {
    title: '3. Szint: Szögpárok és Kifejezések Relációja',
    subtitle: 'Milyen kapcsolat áll fenn az alábbi szögpárok vagy szituációk között?',
    categories: [
      {
        id: 'cat-sum90',
        name: 'Összegük 90° (Pótszögek)',
        description: 'Egymást derékszögre egészítik ki',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sum180',
        name: 'Összegük 180°',
        description: 'Mellékszögek, társszögek, egyenesszög',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-equal',
        name: 'Nagyságuk egyenlő',
        description: 'Csúcsszögek, váltószögek, egyállású szögek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Összegük 90°
      { id: 'ps3-1', label: '35° és 55°', category: 'cat-sum90' },
      { id: 'ps3-2', label: 'Derékszögű háromszög két hegyesszöge', category: 'cat-sum90' },
      { id: 'ps3-3', label: '10° és 80°', category: 'cat-sum90' },
      // Összegük 180°
      { id: 'ps3-4', label: 'Egy egyenesen fekvő szomszédos mellékszögek', category: 'cat-sum180' },
      { id: 'ps3-5', label: 'Párhuzamosok közötti társszögek', category: 'cat-sum180' },
      { id: 'ps3-6', label: '65° és 115°', category: 'cat-sum180' },
      { id: 'ps3-7', label: '140° és 40°', category: 'cat-sum180' },
      // Egyenlőek
      { id: 'ps3-8', label: 'Két metsző egyenes csúcsszögei', category: 'cat-equal' },
      { id: 'ps3-9', label: 'Párhuzamosok Z-alakú váltószögei', category: 'cat-equal' },
      { id: 'ps3-10', label: 'Párhuzamosok F-alakú egyállású szögei', category: 'cat-equal' }
    ]
  }
};

export const PlaneGeometrySorter: React.FC<PlaneGeometrySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A sík geometriája'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-plane-geometry-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};
