import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BlueprintSorterProps {
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
  [key: string]: any;
}

const BLUEPRINT_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Méretarány típusok a műszaki gyakorlatban',
    description: 'Csoportosítsd a rajzokat és alkalmazásokat a méretarány típusa szerint!',
    categories: [
      { id: 'reduction', name: 'Kicsinyítő méretarány (1 : N)', color: 'blue' },
      { id: 'natural', name: 'Természetes nagyság (1 : 1)', color: 'emerald' },
      { id: 'enlargement', name: 'Nagyító méretarány (N : 1)', color: 'purple' }
    ],
    items: [
      { id: 'i1', text: 'Építészeti alaprajz (1 : 100)', categoryId: 'reduction' },
      { id: 'i2', text: 'Családi ház kivitelezési terve (1 : 50)', categoryId: 'reduction' },
      { id: 'i3', text: 'Turistatérkép erdővel és utakkal (1 : 25 000)', categoryId: 'reduction' },
      { id: 'i4', text: 'Országos autóstérkép (1 : 100 000)', categoryId: 'reduction' },
      { id: 'i5', text: 'Kéziszerszám gyártási rajza valódi méretben', categoryId: 'natural' },
      { id: 'i6', text: 'A4-es lapon elférő okostelefon vázlatrajza', categoryId: 'natural' },
      { id: 'i7', text: 'Karóra finommechanikai fogaskereke (5 : 1)', categoryId: 'enlargement' },
      { id: 'i8', text: 'Mikrochip integrált áramköri rajza (20 : 1)', categoryId: 'enlargement' },
      { id: 'i9', text: 'Rovar anatómiai részletrajza mikroszkóppal (10 : 1)', categoryId: 'enlargement' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A Gyulai Lovarda medence határoló felületei',
    description: 'Csoportosítsd a medencét határoló síkidomokat a geometriai formájuk alapján!',
    categories: [
      { id: 'trapezoid', name: 'Derékszögű trapéz felület', color: 'indigo' },
      { id: 'rectangle', name: 'Téglalap / ferde téglalap felület', color: 'teal' },
      { id: 'not_boundary', name: 'Nem része a medence testének', color: 'rose' }
    ],
    items: [
      { id: 'i10', text: 'Bal oldali hosszanti oldalfal (20 m hosszú, 1,2–1,6 m mély)', categoryId: 'trapezoid' },
      { id: 'i11', text: 'Jobb oldali hosszanti oldalfal (20 m hosszú, 1,2–1,6 m mély)', categoryId: 'trapezoid' },
      { id: 'i12', text: 'Sekély végfal (13 m széles, 1,2 m mély függőleges fal)', categoryId: 'rectangle' },
      { id: 'i13', text: 'Mély végfal (13 m széles, 1,6 m mély függőleges fal)', categoryId: 'rectangle' },
      { id: 'i14', text: 'Feszített víztükör vízszintes felülete (20 m × 13 m)', categoryId: 'rectangle' },
      { id: 'i15', text: 'Lejtős fenéklemez lapja (13 m × 20,004 m)', categoryId: 'rectangle' },
      { id: 'i16', text: 'Kör alakú pezsgőfürdő akrilfedél', categoryId: 'not_boundary' },
      { id: 'i17', text: 'Háromszög alakú víz alatti belső oszlop', categoryId: 'not_boundary' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások méretarányokról és tervrajzokról',
    description: 'Döntsd el a tervrajzokkal és mérnöki skálákkal kapcsolatos állítások igazságtartalmát!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz állítás', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai tévedés / hamis', color: 'rose' }
    ],
    items: [
      { id: 'i18', text: 'A tervrajzra írt kótaszám a készítendő valós tárgy méretét jelenti', categoryId: 'always_true' },
      { id: 'i19', text: 'Ha a hosszúság méretaránya 1 : N, akkor a területarány 1 : N²', categoryId: 'always_true' },
      { id: 'i20', text: 'Gépészeti rajzon a kótaszám mértékegysége alapesetben milliméter (mm)', categoryId: 'always_true' },
      { id: 'i21', text: 'Egy 1 : 200 méretarányú rajzon 1 cm a valóságban 2 méternek felel meg', categoryId: 'always_true' },
      { id: 'i22', text: 'Két tervrajzon ábrázolt épületrészlet hasonló, ha mindkettő téglalap', categoryId: 'cond_true' },
      { id: 'i23', text: 'A térképen mért távolság megegyezik a terepen gyalog megtett távolsággal', categoryId: 'cond_true' },
      { id: 'i24', text: 'Egy 1 : 100 méretarányú rajzon mért 10 cm² a valóságban 1000 cm²', categoryId: 'false_stmt' },
      { id: 'i25', text: 'Egy 1 : 50 méretarányú makett térfogata a valós térfogat 1/50 része', categoryId: 'false_stmt' },
      { id: 'i26', text: 'A mérnöki tervrajzokon a feltüntetett belső szögek összege mindig kerekítés nélkül pontosan 180°', categoryId: 'false_stmt' }
    ]
  }
];

export const BlueprintSorter: React.FC<BlueprintSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Mit mutat a tervrajz? – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="mit-mutat-a-tervrajz"
      title={topicTitle}
      subtitle="Rendszerezd a műszaki méretarányokat, a Lovarda medence felületeit és a mérnöki tényeket!"
      levels={BLUEPRINT_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      {...rest}
    />
  );
};

export default BlueprintSorter;

