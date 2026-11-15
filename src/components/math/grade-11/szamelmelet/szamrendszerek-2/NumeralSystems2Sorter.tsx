import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumeralSystems2SorterProps {
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

const NUMERAL_SYSTEMS_2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik számmal egyenlő?',
    description: 'Számold át fejben tízes számrendszerbe, és sorold a megfelelő értékhez!',
    categories: [
      { id: 'v13', name: '= 13', color: 'emerald' },
      { id: 'v16', name: '= 16', color: 'sky' },
      { id: 'v255', name: '= 255', color: 'purple' }
    ],
    items: [
      { id: 'ns2s1', text: '1101₂', categoryId: 'v13' },
      { id: 'ns2s2', text: '111₃', categoryId: 'v13' },
      { id: 'ns2s3', text: '31₄', categoryId: 'v13' },
      { id: 'ns2s4', text: '10₁₆', categoryId: 'v16' },
      { id: 'ns2s5', text: '10000₂', categoryId: 'v16' },
      { id: 'ns2s6', text: '121₃', categoryId: 'v16' },
      { id: 'ns2s7', text: 'FF₁₆', categoryId: 'v255' },
      { id: 'ns2s8', text: '11111111₂', categoryId: 'v255' },
      { id: 'ns2s9', text: '3333₄', categoryId: 'v255' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Páros, páratlan vagy hibás?',
    description: 'Döntsd el a felírt számról, hogy páros vagy páratlan – vagy hogy egyáltalán létezhet-e ilyen alak!',
    categories: [
      { id: 'even', name: 'Páros szám', color: 'emerald' },
      { id: 'odd', name: 'Páratlan szám', color: 'amber' },
      { id: 'bad', name: 'Hibás: nem létező számjegy', color: 'rose' }
    ],
    items: [
      { id: 'ns2s10', text: '10110₂', categoryId: 'even' },
      { id: 'ns2s11', text: '20121₃', categoryId: 'even' },
      { id: 'ns2s12', text: '2134₅', categoryId: 'even' },
      { id: 'ns2s13', text: '4531₆', categoryId: 'odd' },
      { id: 'ns2s14', text: '4324₅', categoryId: 'odd' },
      { id: 'ns2s15', text: '1011₂', categoryId: 'odd' },
      { id: 'ns2s16', text: '1021₂', categoryId: 'bad' },
      { id: 'ns2s17', text: '157₅', categoryId: 'bad' },
      { id: 'ns2s18', text: '3A₉', categoryId: 'bad' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány bites csoportok kellenek?',
    description: 'Sorold be az átváltást aszerint, hogy hány bites csoportokkal végezhető el!',
    categories: [
      { id: 'g2', name: 'Kettes csoportok (2 ↔ 4)', color: 'teal' },
      { id: 'g3', name: 'Hármas csoportok (2 ↔ 8)', color: 'amber' },
      { id: 'g4', name: 'Négyes csoportok (2 ↔ 16)', color: 'purple' }
    ],
    items: [
      { id: 'ns2s19', text: '1011₂ → 23₄', categoryId: 'g2' },
      { id: 'ns2s20', text: '110000111₂ → 12013₄', categoryId: 'g2' },
      { id: 'ns2s21', text: '4 = 2², egy jegy 2 bit', categoryId: 'g2' },
      { id: 'ns2s22', text: '1110111100010101₂ → 167425₈', categoryId: 'g3' },
      { id: 'ns2s23', text: '101₂ → 5₈', categoryId: 'g3' },
      { id: 'ns2s24', text: '8 = 2³, egy jegy 3 bit', categoryId: 'g3' },
      { id: 'ns2s25', text: '7AD₁₆ → 11110101101₂', categoryId: 'g4' },
      { id: 'ns2s26', text: '1110111100010101₂ → EF15₁₆', categoryId: 'g4' },
      { id: 'ns2s27', text: '16 = 2⁴, egy jegy 4 bit', categoryId: 'g4' }
    ]
  }
];

const NUMERAL_SYSTEMS_2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMERAL_SYSTEMS_2_SORTER_LEVELS_LIST[0],
  2: NUMERAL_SYSTEMS_2_SORTER_LEVELS_LIST[1],
  3: NUMERAL_SYSTEMS_2_SORTER_LEVELS_LIST[2]
};

export const NumeralSystems2Sorter: React.FC<NumeralSystems2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-szamrendszer-masodik-sorter',
  topicTitle = '8. Számrendszerek II. – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="szamrendszerek-2"
      title={topicTitle}
      subtitle="Rendszerezd a számokat értékük és párosságuk szerint, és döntsd el, hány bites csoportokkal váltható át!"
      levels={NUMERAL_SYSTEMS_2_SORTER_LEVELS}
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

export default NumeralSystems2Sorter;
