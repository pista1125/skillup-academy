import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PasswordsSorterProps {
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

const PASSWORDS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Ismétlődhetnek az elemek?',
    description: 'Döntsd el, milyen szorzattal számolhatsz – vagy egyáltalán nem számít-e a sorrend!',
    categories: [
      { id: 'norep', name: 'Számít a sorrend, nincs ismétlés: n · (n − 1) · …', color: 'blue' },
      { id: 'rep', name: 'Számít a sorrend, van ismétlés: n · n · …', color: 'emerald' },
      { id: 'noorder', name: 'Nem számít a sorrend', color: 'amber' }
    ],
    items: [
      { id: 'pws1', text: 'Jelszó 5 karakterből, három különböző karakterrel', categoryId: 'norep' },
      { id: 'pws2', text: 'Elnök, titkár és pénztáros választása 20 tanulóból', categoryId: 'norep' },
      { id: 'pws3', text: '5 sportszer 20 tanulónak, mindenki legfeljebb egyet kap', categoryId: 'norep' },
      { id: 'pws4', text: '4 jegyű PIN-kód', categoryId: 'rep' },
      { id: 'pws5', text: '6 kérdéses teszt kitöltése A–D válaszokkal', categoryId: 'rep' },
      { id: 'pws6', text: 'Csilla 10 karakteres jelszava a {C; a} halmazból', categoryId: 'rep' },
      { id: 'pws7', text: '3 fős küldöttség választása egy osztályból', categoryId: 'noorder' },
      { id: 'pws8', text: '5 lottószám kihúzása a 90-ből', categoryId: 'noorder' },
      { id: 'pws9', text: '2 könyv kiválasztása a polcról, amelyeket elviszünk', categoryId: 'noorder' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a lehetőségek száma?',
    description: 'Számold ki, és sorold be az eredményt!',
    categories: [
      { id: 'small', name: 'Kevesebb mint 1000', color: 'emerald' },
      { id: 'mid', name: '1000 és 10 000 között', color: 'blue' },
      { id: 'big', name: 'Több mint 10 000', color: 'rose' }
    ],
    items: [
      { id: 'pws10', text: 'Négyjegyű számok, a 3. jegy a 8-as (ismétlődhet)', categoryId: 'small' },
      { id: 'pws11', text: 'Négyjegyű számok, minden jegy különböző és páros', categoryId: 'small' },
      { id: 'pws12', text: 'Logó 3 tartománya, 6 szín, mind különböző', categoryId: 'small' },
      { id: 'pws13', text: 'Hajni 4 karakteres jelszavai 7 karakterből, ismétléssel', categoryId: 'mid' },
      { id: 'pws14', text: 'Csilla 10 karakteres jelszavai a {C; a} halmazból', categoryId: 'mid' },
      { id: 'pws15', text: 'Különböző jegyű négyjegyű számok', categoryId: 'mid' },
      { id: 'pws16', text: '6 kérdéses teszt, A–D vagy üresen hagyott válasz', categoryId: 'big' },
      { id: 'pws17', text: 'Hétjegyű, 0-val nem kezdődő telefonszámok', categoryId: 'big' },
      { id: 'pws18', text: '5 sportszer 20 tanuló között, bárki többet is kaphat', categoryId: 'big' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A feladattól függ', color: 'amber' }
    ],
    items: [
      { id: 'pws19', text: 'Ismétléssel legalább annyi lehetőség van, mint ismétlés nélkül', categoryId: 'true' },
      { id: 'pws20', text: 'Ismétlésnél egy karakterrel hosszabb jelszóból n-szer annyi van', categoryId: 'true' },
      { id: 'pws21', text: 'A négyjegyű számok száma 9 · 10³', categoryId: 'true' },
      { id: 'pws22', text: 'A különböző jegyű négyjegyű számok száma 10 · 9 · 8 · 7', categoryId: 'false' },
      { id: 'pws23', text: '5 sportszer 20 tanuló között ismétléssel 5²⁰-féleképpen sorsolható ki', categoryId: 'false' },
      { id: 'pws24', text: 'A rekeszeket mindig balról jobbra kell kitölteni', categoryId: 'false' },
      { id: 'pws25', text: 'Az első rekeszbe ugyanannyi elem kerülhet, mint a másodikba', categoryId: 'depends' },
      { id: 'pws26', text: 'A lehetőségek száma több mint 1000', categoryId: 'depends' },
      { id: 'pws27', text: 'A szorzat tényezői rekeszről rekeszre eggyel csökkennek', categoryId: 'depends' }
    ]
  }
];

const PASSWORDS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: PASSWORDS_SORTER_LEVELS_LIST[0],
  2: PASSWORDS_SORTER_LEVELS_LIST[1],
  3: PASSWORDS_SORTER_LEVELS_LIST[2]
};

export const PasswordsSorter: React.FC<PasswordsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-jelszavak-sorter',
  topicTitle = '1. Jelszavak – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="jelszavak"
      title={topicTitle}
      subtitle="Rendszerezd, mikor van ismétlés, mekkora a lehetőségek száma, és mely állítások igazak!"
      levels={PASSWORDS_SORTER_LEVELS}
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

export default PasswordsSorter;
