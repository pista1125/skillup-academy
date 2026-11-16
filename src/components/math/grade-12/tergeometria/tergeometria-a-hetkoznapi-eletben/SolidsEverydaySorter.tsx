import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsEverydaySorterProps {
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

const SOLIDS_EVERYDAY_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Térfogat vagy felszín?",
    description: "Döntsd el, hogy a kérdés megválaszolásához térfogatot vagy felszínt kell számolni!",
    categories: [
      { id: 'vol', name: "Térfogat kell", color: 'blue' },
      { id: 'area', name: "Felszín (felület) kell", color: 'amber' },
      { id: 'both', name: "Mindkettő kell", color: 'purple' }
    ],
    items: [
      { id: 'ses1', text: "Hány liter víz fér a tartályba?", categoryId: 'vol' },
      { id: 'ses2', text: "Mennyi a fa díszgömb tömege?", categoryId: 'vol' },
      { id: 'ses3', text: "Hány liter viasz kell a gyertyákhoz?", categoryId: 'vol' },
      { id: 'ses4', text: "Mennyi festék kell a tartály külsejére?", categoryId: 'area' },
      { id: 'ses5', text: "Hány cm² karton kell a kalaphoz?", categoryId: 'area' },
      { id: 'ses6', text: "Mennyi papír kell a díszdobozhoz?", categoryId: 'area' },
      { id: 'ses7', text: "Mennyi a sajtdarab tömege és csomagolóanyaga?", categoryId: 'both' },
      { id: 'ses8', text: "Mennyi a víztároló űrtartalma és a festendő felülete?", categoryId: 'both' },
      { id: 'ses9', text: "Mennyi a fa gömbök tömege és a festendő felületük?", categoryId: 'both' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Melyik test(ek)ből áll?",
    description: "Csoportosítsd a tárgyakat a modelljük szerint!",
    categories: [
      { id: 'round', name: "Forgástest (gömb, henger, kúp, csonkakúp)", color: 'emerald' },
      { id: 'poly', name: "Poliéder (hasáb, gúla, csonkagúla)", color: 'rose' },
      { id: 'mixed', name: "Összetett test", color: 'teal' }
    ],
    items: [
      { id: 'ses10', text: "Fazék", categoryId: 'round' },
      { id: 'ses11', text: "Farsangi kalap", categoryId: 'round' },
      { id: 'ses12', text: "Kúpos fogaskerék", categoryId: 'round' },
      { id: 'ses13', text: "Gúla alakú gyertya", categoryId: 'poly' },
      { id: 'ses14', text: "Valençay-sajt", categoryId: 'poly' },
      { id: 'ses15', text: "Hatszög alapú virágtartó", categoryId: 'poly' },
      { id: 'ses16', text: "Víztároló (félgömb + henger + kúp)", categoryId: 'mixed' },
      { id: 'ses17', text: "Torta (hasáb + félhenger)", categoryId: 'mixed' },
      { id: 'ses18', text: "Bob kalap (félgömb + körgyűrű)", categoryId: 'mixed' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hogyan kerekítsünk?",
    description: "Döntsd el, hogyan kell kerekíteni az eredményt a gyakorlatban!",
    categories: [
      { id: 'down', name: "Lefelé (csak a teljes darab számít)", color: 'blue' },
      { id: 'up', name: "Felfelé (ne fogyjon el)", color: 'rose' },
      { id: 'normal', name: "Szokásos kerekítés (mérőszám)", color: 'amber' }
    ],
    items: [
      { id: 'ses19', text: "Hány tortaszelet jön ki?", categoryId: 'down' },
      { id: 'ses20', text: "Hány adag leves meríthető ki?", categoryId: 'down' },
      { id: 'ses21', text: "Hány virágtartó készíthető 1 kg anyagból?", categoryId: 'down' },
      { id: 'ses22', text: "Hány vödör festéket vegyünk?", categoryId: 'up' },
      { id: 'ses23', text: "Hány fordulóval vihető el a homok?", categoryId: 'up' },
      { id: 'ses24', text: "Hány doboz csempe kell a burkoláshoz?", categoryId: 'up' },
      { id: 'ses25', text: "A gyertya térfogata egész cm³-re", categoryId: 'normal' },
      { id: 'ses26', text: "A homokkúp térfogata két tizedesjegyre (m³)", categoryId: 'normal' },
      { id: 'ses27', text: "A kalap kartonigénye egész cm²-re", categoryId: 'normal' }
    ]
  }
];

const SOLIDS_EVERYDAY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SOLIDS_EVERYDAY_SORTER_LEVELS_LIST[0],
  2: SOLIDS_EVERYDAY_SORTER_LEVELS_LIST[1],
  3: SOLIDS_EVERYDAY_SORTER_LEVELS_LIST[2]
};

export const SolidsEverydaySorter: React.FC<SolidsEverydaySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-hetkoznapi-sorter',
  topicTitle = "17. Térgeometria a hétköznapi életben – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="tergeometria-a-hetkoznapi-eletben"
      title={topicTitle}
      subtitle="Rendszerezd a gyakorlati kérdéseket: térfogat, felszín vagy százalékszámítás?"
      levels={SOLIDS_EVERYDAY_SORTER_LEVELS}
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

export default SolidsEverydaySorter;
