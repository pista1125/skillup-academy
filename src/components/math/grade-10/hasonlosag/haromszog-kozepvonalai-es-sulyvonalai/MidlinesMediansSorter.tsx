import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MidlinesMediansSorterProps {
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

const MIDLINES_MEDIANS_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Nevezetes vonalak és geometriai szerepük',
    description: 'Csoportosítsd a tulajdonságokat és definíciókat a megfelelő szakaszok szerint!',
    categories: [
      { id: 'midline', name: 'Középvonal', color: 'emerald' },
      { id: 'median_centroid', name: 'Súlyvonal és Súlypont', color: 'blue' },
      { id: 'altitude', name: 'Magasságvonal', color: 'amber' }
    ],
    items: [
      { id: 'ms1', text: 'Két oldal felezőpontját összekötő szakasz', categoryId: 'midline' },
      { id: 'ms2', text: 'Párhuzamos a harmadik oldallal és hossza fele annak', categoryId: 'midline' },
      { id: 'ms3', text: 'Négy egybevágó háromszögre osztja a háromszöget', categoryId: 'midline' },
      { id: 'ms4', text: 'Egy csúcsot a szemközti oldal felezőpontjával összekötő szakasz', categoryId: 'median_centroid' },
      { id: 'ms5', text: 'A metszéspont 2 : 1 arányban osztja a szakaszokat', categoryId: 'median_centroid' },
      { id: 'ms6', text: 'Pontosan két egyenlő területű részre felezi a háromszöget', categoryId: 'median_centroid' },
      { id: 'ms7', text: 'Csúcsból a szemközti oldal egyenesére bocsátott merőleges szakasz', categoryId: 'altitude' },
      { id: 'ms8', text: 'Metszéspontja az ortocentrum (magasságpont)', categoryId: 'altitude' },
      { id: 'ms9', text: 'A terület alapegysége: (oldal · magasság) / 2', categoryId: 'altitude' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Geometriai méretek és osztásarányok',
    description: 'Csoportosítsd a viszonyszámokat aszerint, hogy milyen arányt képviselnek!',
    categories: [
      { id: 'half_ratio', name: 'Fele vagy 2 : 1 arány', color: 'emerald' },
      { id: 'quarter_ratio', name: 'Negyede vagy 4 : 1 arány', color: 'blue' },
      { id: 'third_sixth_ratio', name: 'Harmada (1/3) vagy Hatoda (1/6)', color: 'purple' }
    ],
    items: [
      { id: 'ms10', text: 'Középvonal hossza a harmadik oldalhoz viszonyítva (k = c / 2)', categoryId: 'half_ratio' },
      { id: 'ms11', text: 'Súlypont távolsága a csúcstól a felezőponti darabhoz (AS : SF = 2 : 1)', categoryId: 'half_ratio' },
      { id: 'ms12', text: 'Középvonal-háromszög kerülete az eredetihez képest (K / 2)', categoryId: 'half_ratio' },
      { id: 'ms13', text: 'Középvonal-háromszög területe az eredeti területéhez képest (T / 4)', categoryId: 'quarter_ratio' },
      { id: 'ms14', text: 'Hasonló háromszögek területaránya λ = 1/2 esetén ((1/2)² = 1/4)', categoryId: 'quarter_ratio' },
      { id: 'ms15', text: 'Eredeti terület a középvonal-háromszög területéhez viszonyítva (4-szeres)', categoryId: 'quarter_ratio' },
      { id: 'ms16', text: 'Súlypont távolsága az oldaltól a teljes súlyvonalhoz képest ((1/3) · s)', categoryId: 'third_sixth_ratio' },
      { id: 'ms17', text: 'A 3 súlyvonal által felosztott 6 kis háromszög egyike (T / 6)', categoryId: 'third_sixth_ratio' },
      { id: 'ms18', text: 'A súlypontot a 3 csúccsal összekötve kapott háromszögek területe (T / 3)', categoryId: 'third_sixth_ratio' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások a közép- és súlyvonalakról',
    description: 'Döntsd el a geometriai tételek és állítások matematikai érvényességét!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz állítás', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai tévedés / hamis', color: 'rose' }
    ],
    items: [
      { id: 'ms19', text: 'Minden síkbeli háromszögnek pontosan 3 középvonala és 3 súlyvonala van', categoryId: 'always_true' },
      { id: 'ms20', text: 'A három súlyvonal egyetlen közös pontban (a súlypontban) metszi egymást', categoryId: 'always_true' },
      { id: 'ms21', text: 'A súlypont minden háromszögben szigorúan a belső tartományba esik', categoryId: 'always_true' },
      { id: 'ms22', text: 'Derékszögű háromszögben az átfogóhoz tartozó súlyvonal megegyezik a köré írt kör sugarával (s_c = c/2 = R)', categoryId: 'always_true' },
      { id: 'ms23', text: 'A háromszög súlyvonala egyben a magasságvonala is (csak szabályos és egyenlő szárú háromszög alapjára igaz)', categoryId: 'cond_true' },
      { id: 'ms24', text: 'A háromszög középvonala merőleges az oldalra (csak derékszögű háromszögben)', categoryId: 'cond_true' },
      { id: 'ms25', text: 'A súlyvonal felezi a csúcsnál lévő belső szöget (csak szimmetriatengely esetén)', categoryId: 'cond_true' },
      { id: 'ms26', text: 'A súlypont pontosan felezi a súlyvonalakat (1 : 1 arány)', categoryId: 'false_stmt' },
      { id: 'ms27', text: 'A középvonal hossza a harmadik oldal kétszerese', categoryId: 'false_stmt' },
      { id: 'ms28', text: 'A középvonal-háromszög területe az eredeti háromszög területének a fele', categoryId: 'false_stmt' }
    ]
  }
];

export const MidlinesMediansSorter: React.FC<MidlinesMediansSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = '9. Háromszög középvonalai és súlyvonalai – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="haromszog-kozepvonalai-es-sulyvonalai"
      title={topicTitle}
      subtitle="Rendszerezd a nevezetes vonalakat, arányszámokat és matematikai állításokat!"
      levels={MIDLINES_MEDIANS_SORTER_LEVELS}
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

export default MidlinesMediansSorter;

