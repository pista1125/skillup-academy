import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PrismAreaVolumeSorterProps {
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

const PRISM_AREA_VOLUME_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Terület, térfogat vagy hossz?',
    description: 'Milyen mennyiség az adott érték?',
    categories: [
      { id: 'ter', name: 'terület (cm², m²)', color: 'blue' },
      { id: 'vol', name: 'térfogat (cm³, liter)', color: 'emerald' },
      { id: 'len', name: 'hosszúság (cm, m)', color: 'amber' }
    ],
    items: [
      { id: 'pavs1', text: 'a hasáb felszíne', categoryId: 'ter' },
      { id: 'pavs2', text: 'a palást területe', categoryId: 'ter' },
      { id: 'pavs3', text: 'T_alaplap', categoryId: 'ter' },
      { id: 'pavs4', text: 'a medencébe férő víz', categoryId: 'vol' },
      { id: 'pavs5', text: 'T_alaplap · M', categoryId: 'vol' },
      { id: 'pavs6', text: 'a³', categoryId: 'vol' },
      { id: 'pavs7', text: 'K_alaplap', categoryId: 'len' },
      { id: 'pavs8', text: 'a testmagasság (M)', categoryId: 'len' },
      { id: 'pavs9', text: 'a testátló', categoryId: 'len' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Melyik képlettel?',
    description: 'Melyik képletet kell használni a feladathoz?',
    categories: [
      { id: 'v', name: 'V = T · M', color: 'purple' },
      { id: 'a', name: 'A = 2T + K · M', color: 'rose' },
      { id: 'p', name: 'T_palást = K · M', color: 'teal' }
    ],
    items: [
      { id: 'pavs10', text: 'Hány liter víz fér az árokba?', categoryId: 'v' },
      { id: 'pavs11', text: 'Hány gramm a vas kalapácsfej?', categoryId: 'v' },
      { id: 'pavs12', text: 'Mennyi beton kell egy oszlophoz?', categoryId: 'v' },
      { id: 'pavs13', text: 'Mennyi festék kell a doboz teljes külsejéhez?', categoryId: 'a' },
      { id: 'pavs14', text: 'Mennyi karton kell egy zárt dobozhoz?', categoryId: 'a' },
      { id: 'pavs15', text: 'Mekkora a tömör gerenda teljes felülete?', categoryId: 'a' },
      { id: 'pavs16', text: 'Mennyi tapéta kell egy terem falaira (ajtók nélkül)?', categoryId: 'p' },
      { id: 'pavs17', text: 'Mekkora a hirdetőoszlop oldalainak területe?', categoryId: 'p' },
      { id: 'pavs18', text: 'Mennyi címke kell egy hasáb alakú doboz oldalára körbe?', categoryId: 'p' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Hogyan változik a térfogat?',
    description: 'Mi történik a hasáb térfogatával?',
    categories: [
      { id: 'no', name: 'nem változik', color: 'emerald' },
      { id: 'dbl', name: '2-szeresére nő', color: 'blue' },
      { id: 'oct', name: '8-szorosára nő', color: 'rose' }
    ],
    items: [
      { id: 'pavs19', text: 'a kártyapaklit elcsúsztatjuk (ferde hasáb lesz)', categoryId: 'no' },
      { id: 'pavs20', text: 'az alaplapot egy vele egyenlő területűre cseréljük', categoryId: 'no' },
      { id: 'pavs21', text: 'az alapterületet felezzük, a magasságot duplázzuk', categoryId: 'no' },
      { id: 'pavs22', text: 'a magasságot 2-szeresére növeljük', categoryId: 'dbl' },
      { id: 'pavs23', text: 'az alapterületet 2-szeresére növeljük', categoryId: 'dbl' },
      { id: 'pavs24', text: 'a téglatest egyik élét 2-szeresére növeljük', categoryId: 'dbl' },
      { id: 'pavs25', text: 'a kocka élét 2-szeresére növeljük', categoryId: 'oct' },
      { id: 'pavs26', text: 'a téglatest mindhárom élét 2-szeresére növeljük', categoryId: 'oct' },
      { id: 'pavs27', text: 'a testet 2-szeresére nagyítjuk', categoryId: 'oct' }
    ]
  }
};

export const PrismAreaVolumeSorter: React.FC<PrismAreaVolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-hasab-felszin-terfogat-sorter',
  topicTitle = '3. A hasáb felszíne és térfogata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-hasab-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd a mennyiségeket, a képleteket és a változásokat!"
      levels={PRISM_AREA_VOLUME_SORTER_LEVELS}
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

export default PrismAreaVolumeSorter;
