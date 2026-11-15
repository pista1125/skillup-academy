import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PasswordsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const PASSWORDS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik szorzat?',
    description: 'Párosítsd a feladatot a „rekeszes” számolással!',
    pairs: [
      { id: 'pwm1', left: '5 karakter, 3 hely, nincs ismétlődés', right: '5 · 4 · 3' },
      { id: 'pwm2', left: '5 karakter, 3 hely, ismétlődhet', right: '5³' },
      { id: 'pwm3', left: '4 jegyű PIN-kód (bármely jeggyel kezdődhet)', right: '10⁴' },
      { id: 'pwm4', left: 'Csilla: {C; a}, 10 karakteres jelszó', right: '2¹⁰' },
      { id: 'pwm5', left: 'Hajni: 7 karakter, 4 hely, mind különböző', right: '7 · 6 · 5 · 4' },
      { id: 'pwm6', left: 'Hajni: 7 karakter, 4 hely, ismétlődhet', right: '7⁴' },
      { id: 'pwm7', left: '6 kérdéses teszt, A–D, mindegyikre válaszolunk', right: '4⁶' },
      { id: 'pwm8', left: '6 kérdéses teszt, A–D, üresen is hagyhatunk', right: '5⁶' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány lehetőség?',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'pwm9', left: 'Négyjegyű számok', right: '9000' },
      { id: 'pwm10', left: 'Négyjegyű számok különböző jegyekkel', right: '4536' },
      { id: 'pwm11', left: 'Négyjegyű számok, a 3. jegy a 8-as (ismétlődhet)', right: '900' },
      { id: 'pwm12', left: 'Hétjegyű, 0-val nem kezdődő telefonszámok', right: '9 000 000' },
      { id: 'pwm13', left: 'Logó: 3 tartomány, 6 szín, mind különböző', right: '120' },
      { id: 'pwm14', left: 'Háromjegyű számok különböző jegyekkel', right: '648' },
      { id: 'pwm15', left: '5 leves, 4 főétel, 3 desszert – háromfogásos ebéd', right: '60' },
      { id: 'pwm16', left: '26 betű, 6 karakteres jelszó, ismétlődhet', right: '308 915 776' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Megkötésekkel',
    description: 'A megkötött rekeszt töltsd ki először! Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'pwm17', left: 'Négyjegyű, különböző jegyek, a 3. jegy a 4-es', right: '448' },
      { id: 'pwm18', left: 'Négyjegyű, minden jegy páros (ismétlődhet)', right: '500' },
      { id: 'pwm19', left: 'Négyjegyű, minden jegy különböző és páros', right: '96' },
      { id: 'pwm20', left: 'Négyjegyű, különböző jegyek, nincs benne 7-es', right: '2688' },
      { id: 'pwm21', left: '5 sportszer, 20 tanuló, mindenki legfeljebb egyet kap', right: '1 860 480' },
      { id: 'pwm22', left: '5 sportszer, 20 tanuló, bárki több sportszert is kaphat', right: '3 200 000' },
      { id: 'pwm23', left: '5 sportszer, 20 tanuló, Konrád pontosan egyet, a többiek legfeljebb egyet', right: '465 120' },
      { id: 'pwm24', left: 'Páros négyjegyű számok különböző jegyekkel', right: '2296' }
    ]
  }
];

const PASSWORDS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: PASSWORDS_MATCHER_LEVELS_LIST[0],
  2: PASSWORDS_MATCHER_LEVELS_LIST[1],
  3: PASSWORDS_MATCHER_LEVELS_LIST[2]
};

export const PasswordsMatcher: React.FC<PasswordsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-jelszavak-matcher',
  topicTitle = '1. Jelszavak – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="jelszavak"
      title={topicTitle}
      subtitle="Gyakorold a rekeszes összeszámlálást: jelszavak, PIN-kódok, négyjegyű számok, sorsolások!"
      levels={PASSWORDS_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default PasswordsMatcher;
