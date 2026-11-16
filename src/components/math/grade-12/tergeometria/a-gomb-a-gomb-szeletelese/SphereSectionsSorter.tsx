import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SphereSectionsSorterProps {
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

const SPHERE_SECTIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hogyan viszonyul a sík a gömbhöz?',
    description: 'Csoportosítsd az eseteket aszerint, hogy mi a sík és a gömb közös része!',
    categories: [
      { id: 'fokor', name: 'Főkör (d = 0)', color: 'blue' },
      { id: 'kor', name: 'Kisebb kör (0 < d < R)', color: 'emerald' },
      { id: 'pont', name: 'Egy pont vagy semmi (d ≥ R)', color: 'amber' }
    ],
    items: [
      { id: 'sss1', text: 'R = 5 cm, d = 0 cm', categoryId: 'fokor' },
      { id: 'sss2', text: 'A sík átmegy a gömb középpontján', categoryId: 'fokor' },
      { id: 'sss3', text: 'A metszetkör sugara egyenlő a gömb sugarával', categoryId: 'fokor' },
      { id: 'sss4', text: 'R = 5 cm, d = 3 cm', categoryId: 'kor' },
      { id: 'sss5', text: 'Narancs: R = 4 cm, a vágás 2 cm-re a középponttól', categoryId: 'kor' },
      { id: 'sss6', text: 'R = 10 cm, d = 9,9 cm', categoryId: 'kor' },
      { id: 'sss7', text: 'R = 5 cm, d = 5 cm', categoryId: 'pont' },
      { id: 'sss8', text: 'R = 4 cm, d = 6 cm', categoryId: 'pont' },
      { id: 'sss9', text: 'A sík érinti a gömböt', categoryId: 'pont' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mit keresünk, mit adunk meg?',
    description: 'Döntsd el, melyik képlettel kapod meg a keresett mennyiséget!',
    categories: [
      { id: 'r', name: 'r = √(R² − d²)', color: 'emerald' },
      { id: 'd', name: 'd = √(R² − r²)', color: 'rose' },
      { id: 'R', name: 'R = √(r² + d²)', color: 'purple' }
    ],
    items: [
      { id: 'sss10', text: 'A narancs vágásának sugara (R = 4, d = 2)', categoryId: 'r' },
      { id: 'sss11', text: 'A dinnyeszeletek határoló köreinek sugara', categoryId: 'r' },
      { id: 'sss12', text: 'A metszet területe, ha ismert R és a sík távolsága', categoryId: 'r' },
      { id: 'sss13', text: 'R = 12,8 cm, a metszet átmérője 10,2 cm: a sík távolsága', categoryId: 'd' },
      { id: 'sss14', text: 'Milyen messze vágjunk, hogy 8 cm sugarú kört kapjunk egy 10 cm sugarú gömbből?', categoryId: 'd' },
      { id: 'sss15', text: 'Két párhuzamos metszet távolsága, ha sugaraik ismertek', categoryId: 'd' },
      { id: 'sss16', text: 'A metszetkör sugara 4 cm, a sík 3 cm-re van: a gömb sugara', categoryId: 'R' },
      { id: 'sss17', text: 'A kocka éleit érintő gömb sugara (félél és féllap-távolság)', categoryId: 'R' },
      { id: 'sss18', text: 'A vágási kör sugara 3 cm, a vágás 4 cm-re van a középponttól: a narancs sugara', categoryId: 'R' }
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
      { id: 'sss19', text: 'Bármely metsző sík a gömböt körben metszi', categoryId: 'true' },
      { id: 'sss20', text: 'A főkör sugara egyenlő a gömb sugarával', categoryId: 'true' },
      { id: 'sss21', text: 'A középponttól távolabbi sík kisebb kört metsz ki', categoryId: 'true' },
      { id: 'sss22', text: 'A metszetkör sugara R − d', categoryId: 'false' },
      { id: 'sss23', text: 'Egy gömbnek csak egy főköre van', categoryId: 'false' },
      { id: 'sss24', text: 'A gömbfelület síkba kiteríthető', categoryId: 'false' },
      { id: 'sss25', text: 'A síkmetszet sugara nagyobb, mint a gömbsugár fele', categoryId: 'depends' },
      { id: 'sss26', text: 'A két keletkező gömbsüveg egybevágó', categoryId: 'depends' },
      { id: 'sss27', text: 'Egy adott sík metszi a gömböt', categoryId: 'depends' }
    ]
  }
];

const SPHERE_SECTIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SPHERE_SECTIONS_SORTER_LEVELS_LIST[0],
  2: SPHERE_SECTIONS_SORTER_LEVELS_LIST[1],
  3: SPHERE_SECTIONS_SORTER_LEVELS_LIST[2]
};

export const SphereSectionsSorter: React.FC<SphereSectionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-gomb-szeletelese-sorter',
  topicTitle = '6. A gömb, a gömb szeletelése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gomb-a-gomb-szeletelese"
      title={topicTitle}
      subtitle="Rendszerezd a síkmetszeteket, a képleteket és az állításokat!"
      levels={SPHERE_SECTIONS_SORTER_LEVELS}
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

export default SphereSectionsSorter;
