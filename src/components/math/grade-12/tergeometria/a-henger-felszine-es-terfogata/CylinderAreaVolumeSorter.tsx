import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CylinderAreaVolumeSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const CYLINDER_AREA_VOLUME_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Felszín vagy térfogat?',
    description: 'Melyik mennyiséget kell kiszámítani?',
    categories: [
      { id: 'a', name: 'teljes felszín', color: 'blue' },
      { id: 'p', name: 'csak a palást', color: 'amber' },
      { id: 'v', name: 'térfogat', color: 'emerald' }
    ],
    items: [
      { id: 'cavs1', text: 'alumínium egy zárt konzervdobozhoz', categoryId: 'a' },
      { id: 'cavs2', text: 'fém egy zárt hengeres tartályhoz', categoryId: 'a' },
      { id: 'cavs3', text: 'csomagolópapír egy henger alakú doboz teljes bevonásához', categoryId: 'a' },
      { id: 'cavs4', text: 'címke egy konzervdoboz oldalára', categoryId: 'p' },
      { id: 'cavs5', text: 'egy fordulattal befestett falrész a festőhengerrel', categoryId: 'p' },
      { id: 'cavs6', text: 'védőfólia egy cső palástjára', categoryId: 'p' },
      { id: 'cavs7', text: 'hány gramm májkrém fér a dobozba', categoryId: 'v' },
      { id: 'cavs8', text: 'hány liter víz fér a medencébe', categoryId: 'v' },
      { id: 'cavs9', text: 'milyen magasan áll a festék a vödörben', categoryId: 'v' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Hányszorosára nő a térfogat?',
    description: 'Hogyan változik a henger térfogata?',
    categories: [
      { id: 'x2', name: 'kétszeresére', color: 'purple' },
      { id: 'x4', name: 'négyszeresére', color: 'teal' },
      { id: 'x8', name: 'nyolcszorosára', color: 'rose' }
    ],
    items: [
      { id: 'cavs10', text: 'a magasságot megkétszerezzük', categoryId: 'x2' },
      { id: 'cavs11', text: 'a sugarat kétszeresére, a magasságot felére változtatjuk', categoryId: 'x2' },
      { id: 'cavs12', text: 'az alapterületet kétszeresére növeljük', categoryId: 'x2' },
      { id: 'cavs13', text: 'a sugarat megkétszerezzük', categoryId: 'x4' },
      { id: 'cavs14', text: 'az átmérőt megkétszerezzük', categoryId: 'x4' },
      { id: 'cavs15', text: 'a magasságot négyszeresére növeljük', categoryId: 'x4' },
      { id: 'cavs16', text: 'minden méretet megkétszerezünk', categoryId: 'x8' },
      { id: 'cavs17', text: 'a sugarat kétszeresére, a magasságot kétszeresére növeljük', categoryId: 'x8' },
      { id: 'cavs18', text: 'a kisebb konzervről a kétszeres méretűre térünk át', categoryId: 'x8' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 't', name: 'mindig igaz', color: 'emerald' },
      { id: 'f', name: 'hamis', color: 'rose' },
      { id: 'd', name: 'a hengertől függ', color: 'amber' }
    ],
    items: [
      { id: 'cavs19', text: 'A palást kiterítve 2rπ × M-es téglalap.', categoryId: 't' },
      { id: 'cavs20', text: 'Adott térfogatnál az egyenlő oldalú henger felszíne a legkisebb.', categoryId: 't' },
      { id: 'cavs21', text: 'Hasonló hengereknél a térfogatok aránya a hasonlósági arány köbe.', categoryId: 't' },
      { id: 'cavs22', text: 'A henger térfogata 2rπ · M.', categoryId: 'f' },
      { id: 'cavs23', text: 'Ha a sugarat megkétszerezzük, a térfogat is csak kétszeres lesz.', categoryId: 'f' },
      { id: 'cavs24', text: 'A 16 cm átmérőjű vödör alapterülete 256π cm².', categoryId: 'f' },
      { id: 'cavs25', text: 'A palást területe nagyobb, mint a két alapkör területe együtt.', categoryId: 'd' },
      { id: 'cavs26', text: 'A henger térfogatának mérőszáma nagyobb a felszínénél.', categoryId: 'd' },
      { id: 'cavs27', text: 'A magasabb hengerbe több víz fér.', categoryId: 'd' }
    ]
  }
};

export const CylinderAreaVolumeSorter: React.FC<CylinderAreaVolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-henger-felszin-terfogat-sorter',
  topicTitle = '5. A henger felszíne és térfogata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-henger-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd a mennyiségeket, a képleteket és a térfogatváltozásokat!"
      levels={CYLINDER_AREA_VOLUME_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default CylinderAreaVolumeSorter;
