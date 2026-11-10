import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ApplyFormulaSorterProps {
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
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Gyökök számtani jellege',
    subtitle: 'Válogasd szét az egyenleteket a gyökeik típusa (egész, tört, irracionális vagy nincs megoldás) szerint!',
    categories: [
      {
        id: 'cat-integer',
        name: 'Egész gyökök',
        description: 'D > 0 négyzetszám, és az osztás után mindkét gyök egész szám.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-fraction',
        name: 'Tört (racionális) gyökök',
        description: 'D > 0 négyzetszám, de legalább az egyik gyök nem egész tört szám.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális gyökök',
        description: 'D > 0, de nem négyzetszám, a gyökökben megmarad a gyökjel (±√D).',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-none',
        name: 'Nincs valós gyök',
        description: 'D < 0, a valós számok körében nincs megoldása az egyenletnek.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', content: 'x² - 5x + 6 = 0  (x = 2; 3)', categoryId: 'cat-integer' },
      { id: 's1-2', content: '2x² - 7x + 3 = 0  (x = 3; 1/2)', categoryId: 'cat-fraction' },
      { id: 's1-3', content: 'x² - 6x + 7 = 0  (x = 3 ± √2)', categoryId: 'cat-irrational' },
      { id: 's1-4', content: 'x² + 2x + 5 = 0  (D = -16 < 0)', categoryId: 'cat-none' },
      { id: 's1-5', content: 'x² - 16 = 0  (x = ±4)', categoryId: 'cat-integer' },
      { id: 's1-6', content: '4x² - 12x + 9 = 0  (x = 3/2)', categoryId: 'cat-fraction' },
      { id: 's1-7', content: 'x² - 4x + 1 = 0  (x = 2 ± √3)', categoryId: 'cat-irrational' },
      { id: 's1-8', content: 'x² - 4x + 13 = 0  (D = -36 < 0)', categoryId: 'cat-none' },
      { id: 's1-9', content: '3x² - 10x + 3 = 0  (x = 3; 1/3)', categoryId: 'cat-fraction' },
      { id: 's1-10', content: 'x² - 2x - 1 = 0  (x = 1 ± √2)', categoryId: 'cat-irrational' }
    ]
  },
  2: {
    title: 'Törtes egyenletek: Érvényes gyök vs. Hamis gyök',
    subtitle: 'Válogasd szét a kapott gyököket: elfogadható megoldás vagy a nevező nullázódása miatt hamis gyök?',
    categories: [
      {
        id: 'cat-valid',
        name: 'Érvényes, valós gyök',
        description: 'Kielégíti az egyenletet, és egyik tört nevezőjét sem teszi nullává.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-extraneous',
        name: 'Hamis gyök (kikötés tiltja)',
        description: 'Nullává tenné valamelyik nevezőt, ezért a kikötés miatt ki kell zárni.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's2-1', content: '(x² - 4)/(x - 2) = 0  ⟶  x = -2', categoryId: 'cat-valid' },
      { id: 's2-2', content: '(x² - 4)/(x - 2) = 0  ⟶  x = 2', categoryId: 'cat-extraneous' },
      { id: 's2-3', content: '(x² - 9)/(x + 3) = 0  ⟶  x = 3', categoryId: 'cat-valid' },
      { id: 's2-4', content: '(x² - 9)/(x + 3) = 0  ⟶  x = -3', categoryId: 'cat-extraneous' },
      { id: 's2-5', content: 'x + 6/x = 5  ⟶  x = 2  (x ≠ 0)', categoryId: 'cat-valid' },
      { id: 's2-6', content: 'x + 6/x = 5  ⟶  x = 3  (x ≠ 0)', categoryId: 'cat-valid' },
      { id: 's2-7', content: '(x² - 1)/(x - 1) = 2  ⟶  x = 1', categoryId: 'cat-extraneous' },
      { id: 's2-8', content: '(2x - 4)/(x - 2) = x  ⟶  x = 2', categoryId: 'cat-extraneous' },
      { id: 's2-9', content: '(x² - 5x + 6)/(x - 3) = 0  ⟶  x = 2', categoryId: 'cat-valid' },
      { id: 's2-10', content: '(x² - 5x + 6)/(x - 3) = 0  ⟶  x = 3', categoryId: 'cat-extraneous' }
    ]
  },
  3: {
    title: 'Helyes gyökös egyszerűsítés vs. Tipikus hiba',
    subtitle: 'Döntsd el a felírt gyökös egyszerűsítésről, hogy szabályos vagy súlyos algebrai hibát tartalmaz!',
    categories: [
      {
        id: 'cat-correct',
        name: 'Helyes egyszerűsítés',
        description: 'A számláló MINDEN tagját osztja a nevező (kiemelés utáni egyszerűsítés).',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-flawed',
        name: 'Hibás egyszerűsítés (Tipikus hiba)',
        description: 'Részleges egyszerűsítés, vagy a gyökjel alatti szám hibás leosztása.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', content: '(4 ± 2√3) / 2 = 2 ± √3', categoryId: 'cat-correct' },
      { id: 's3-2', content: '(4 ± 2√3) / 2 = 2 ± 2√3', categoryId: 'cat-flawed' },
      { id: 's3-3', content: '(6 ± √72) / 4 = (3 ± 3√2) / 2', categoryId: 'cat-correct' },
      { id: 's3-4', content: '(6 ± √72) / 4 = (3 ± √72) / 2', categoryId: 'cat-flawed' },
      { id: 's3-5', content: '(9 ± 3√5) / 3 = 3 ± √5', categoryId: 'cat-correct' },
      { id: 's3-6', content: '(9 ± 3√5) / 3 = 3 ± 3√5', categoryId: 'cat-flawed' },
      { id: 's3-7', content: '(10 ± √20) / 2 = 5 ± √5', categoryId: 'cat-correct' },
      { id: 's3-8', content: '(10 ± √20) / 2 = 5 ± √10', categoryId: 'cat-flawed' },
      { id: 's3-9', content: '(8 ± √32) / 4 = 2 ± √2', categoryId: 'cat-correct' },
      { id: 's3-10', content: '(8 ± √32) / 4 = 2 ± √8', categoryId: 'cat-flawed' }
    ]
  }
};

export const ApplyFormulaSorter: React.FC<ApplyFormulaSorterProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'alkalmazzuk-a-megoldokepletet',
  topicTitle = 'Alkalmazzuk a megoldóképletet!'
}) => {
  const activeLevel = level || currentLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
    />
  );
};

export default ApplyFormulaSorter;

