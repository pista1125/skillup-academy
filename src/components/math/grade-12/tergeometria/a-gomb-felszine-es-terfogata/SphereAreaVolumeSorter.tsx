import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SphereAreaVolumeSorterProps {
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

const SPHERE_AREA_VOLUME_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Felszín, térfogat vagy hossz?',
    description: 'Döntsd el, milyen mennyiséget fejez ki a kifejezés vagy a kérdés!',
    categories: [
      { id: 'len', name: 'Hosszúság (cm, km)', color: 'blue' },
      { id: 'area', name: 'Terület / felszín (cm², km²)', color: 'emerald' },
      { id: 'vol', name: 'Térfogat (cm³, liter)', color: 'amber' }
    ],
    items: [
      { id: 'savs1', text: '2rπ (a főkör kerülete)', categoryId: 'len' },
      { id: 'savs2', text: '∛(3V / (4π))', categoryId: 'len' },
      { id: 'savs3', text: 'A Ráktérítő hossza', categoryId: 'len' },
      { id: 'savs4', text: '4r²π', categoryId: 'area' },
      { id: 'savs5', text: 'Mennyi festék kell egy gömb alakú kupola befestéséhez?', categoryId: 'area' },
      { id: 'savs6', text: 'A Föld vízzel borított része', categoryId: 'area' },
      { id: 'savs7', text: '4r³π / 3', categoryId: 'vol' },
      { id: 'savs8', text: 'Hány liter víz fér egy gömb alakú tartályba?', categoryId: 'vol' },
      { id: 'savs9', text: 'Mekkora egy dinnye tömege (sűrűség ≈ 1 kg/dm³)?', categoryId: 'vol' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hányszorosára változik?',
    description: 'A gömb sugarát kétszeresére növeljük. Mi hogyan változik?',
    categories: [
      { id: 'x2', name: '2-szeresére', color: 'sky' },
      { id: 'x4', name: '4-szeresére', color: 'purple' },
      { id: 'x8', name: '8-szorosára', color: 'rose' }
    ],
    items: [
      { id: 'savs10', text: 'Az átmérő', categoryId: 'x2' },
      { id: 'savs11', text: 'A főkör kerülete', categoryId: 'x2' },
      { id: 'savs12', text: 'A köré írt henger magassága', categoryId: 'x2' },
      { id: 'savs13', text: 'A gömb felszíne', categoryId: 'x4' },
      { id: 'savs14', text: 'Egy főkör területe', categoryId: 'x4' },
      { id: 'savs15', text: 'A bevonásához szükséges festék mennyisége', categoryId: 'x4' },
      { id: 'savs16', text: 'A gömb térfogata', categoryId: 'x8' },
      { id: 'savs17', text: 'A tömör ólomgolyó tömege', categoryId: 'x8' },
      { id: 'savs18', text: 'A belőle önthető azonos sörétek száma', categoryId: 'x8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'savs19', text: 'A gömb felszíne egyenlő a köré írt henger palástjával', categoryId: 'true' },
      { id: 'savs20', text: 'A gömb térfogata a köré írt henger térfogatának 2/3-a', categoryId: 'true' },
      { id: 'savs21', text: 'Ha egy golyót kisebb golyókra öntünk szét, az együttes felszín nő', categoryId: 'true' },
      { id: 'savs22', text: 'Két gömb összeöntésekor a sugarak összeadódnak', categoryId: 'false' },
      { id: 'savs23', text: 'A gömb térfogata a sugárral egyenesen arányos', categoryId: 'false' },
      { id: 'savs24', text: 'Két buborék egyesülésekor a felszínek összeadódnak', categoryId: 'false' },
      { id: 'savs25', text: 'A gömb felszínének mérőszáma nagyobb a térfogatáénál', categoryId: 'depends' },
      { id: 'savs26', text: 'Egy dinnye térfogatának több mint 70%-a ehető', categoryId: 'depends' },
      { id: 'savs27', text: 'Egy gömb alakú tárgy elfér egy 30 cm élű dobozban', categoryId: 'depends' }
    ]
  }
];

const SPHERE_AREA_VOLUME_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SPHERE_AREA_VOLUME_SORTER_LEVELS_LIST[0],
  2: SPHERE_AREA_VOLUME_SORTER_LEVELS_LIST[1],
  3: SPHERE_AREA_VOLUME_SORTER_LEVELS_LIST[2]
};

export const SphereAreaVolumeSorter: React.FC<SphereAreaVolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-gomb-felszin-terfogat-sorter',
  topicTitle = '7. A gömb felszíne és térfogata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gomb-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd a mennyiségeket, a változásokat és az állításokat!"
      levels={SPHERE_AREA_VOLUME_SORTER_LEVELS}
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

export default SphereAreaVolumeSorter;
