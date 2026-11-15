import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TangentCalcSorterProps {
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

const TANGENT_CALC_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: tan vagy tan⁻¹?',
    description: 'Melyik számológép-funkcióra van szükség a feladat megoldásához?',
    categories: [
      { id: 'tan', name: 'tan (szög → tangens)', color: 'blue' },
      { id: 'inv', name: '2ndf tan (tangens → szög)', color: 'amber' },
      { id: 'mode', name: 'DRG / MODE (szögmód beállítása)', color: 'purple' }
    ],
    items: [
      { id: 'tcs1', text: 'Mennyi tg 64°?', categoryId: 'tan' },
      { id: 'tcs2', text: 'Milyen magas a torony 30 m-ről, 38°-os szögben?', categoryId: 'tan' },
      { id: 'tcs3', text: 'Hány százalékos a 15°-os lejtő?', categoryId: 'tan' },
      { id: 'tcs4', text: 'Melyik szög tangense 0,2308?', categoryId: 'inv' },
      { id: 'tcs5', text: 'Hány fokos a 9%-os lejtő?', categoryId: 'inv' },
      { id: 'tcs6', text: 'Mekkora szöget zárnak be a napsugarak, ha a 2 m-es bot árnyéka 3,5 m?', categoryId: 'inv' },
      { id: 'tcs7', text: 'A kijelzőn R látható, de fokban akarunk számolni', categoryId: 'mode' },
      { id: 'tcs8', text: 'tan 45 eredménye nem 1 lett', categoryId: 'mode' },
      { id: 'tcs9', text: 'A kijelzőn a G (GRAD) jelzés világít', categoryId: 'mode' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb vagy nagyobb 1-nél?',
    description: 'Csoportosítsd a szögeket és lejtőket tangensük nagysága szerint!',
    categories: [
      { id: 'small', name: 'tg α < 1 (α < 45°)', color: 'emerald' },
      { id: 'one', name: 'tg α = 1 (α = 45°)', color: 'teal' },
      { id: 'big', name: 'tg α > 1 (α > 45°)', color: 'rose' }
    ],
    items: [
      { id: 'tcs10', text: 'α = 14° 24′', categoryId: 'small' },
      { id: 'tcs11', text: '26,8%-os lejtő', categoryId: 'small' },
      { id: 'tcs12', text: 'α = 24,6°', categoryId: 'small' },
      { id: 'tcs13', text: '100%-os meredekség', categoryId: 'one' },
      { id: 'tcs14', text: 'A tan 45 = eredménye D módban', categoryId: 'one' },
      { id: 'tcs15', text: 'Az a szög, amely 45° és 0′', categoryId: 'one' },
      { id: 'tcs16', text: 'α = 64°', categoryId: 'big' },
      { id: 'tcs17', text: 'α = 89,9°', categoryId: 'big' },
      { id: 'tcs18', text: '150%-os meredekség', categoryId: 'big' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szorzás, osztás vagy Pitagorasz?',
    description: 'Milyen lépéssel kapjuk meg a keresett mennyiséget?',
    categories: [
      { id: 'mult', name: 'Szorzás: melletti · tg α', color: 'blue' },
      { id: 'div', name: 'Osztás: szemközti : tg α', color: 'amber' },
      { id: 'pyth', name: 'Pitagorasz-tétel is kell', color: 'purple' }
    ],
    items: [
      { id: 'tcs19', text: 'A torony magassága 30 m távolságból', categoryId: 'mult' },
      { id: 'tcs20', text: 'A hegycsúcs magassága 1 km vízszintes távolságból', categoryId: 'mult' },
      { id: 'tcs21', text: 'A kert másik oldala a 25 m-es oldalból és az átló szögéből', categoryId: 'mult' },
      { id: 'tcs22', text: 'Az 1,70 m magas ember árnyékának hossza', categoryId: 'div' },
      { id: 'tcs23', text: 'Vízszintes távolság 15°-os úton 30 m emelkedéshez', categoryId: 'div' },
      { id: 'tcs24', text: 'Milyen messze állunk a 23,4 m magas toronytól 38°-os szög esetén?', categoryId: 'div' },
      { id: 'tcs25', text: 'Az úton megtett táv a 15°-os lejtőn 30 m emelkedéshez', categoryId: 'pyth' },
      { id: 'tcs26', text: 'A lejtő százaléka, ha 250 m-t gurulva 23 m-t süllyedtünk', categoryId: 'pyth' },
      { id: 'tcs27', text: 'A kert átlójának hossza a két oldalából', categoryId: 'pyth' }
    ]
  }
];

const TANGENT_CALC_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TANGENT_CALC_SORTER_LEVELS_LIST[0],
  2: TANGENT_CALC_SORTER_LEVELS_LIST[1],
  3: TANGENT_CALC_SORTER_LEVELS_LIST[2]
};

export const TangentCalcSorter: React.FC<TangentCalcSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-tangens-szamolas-sorter',
  topicTitle = '2. Számolás szögek tangensével – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="szamolas-szogek-tangensevel"
      title={topicTitle}
      subtitle="Rendszerezd a számológép-funkciókat, a tangensértékeket és a megoldási lépéseket!"
      levels={TANGENT_CALC_SORTER_LEVELS}
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

export default TangentCalcSorter;
