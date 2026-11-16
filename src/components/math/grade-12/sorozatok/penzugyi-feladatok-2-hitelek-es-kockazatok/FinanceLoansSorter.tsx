import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinanceLoansSorterProps {
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

const FINANCE_LOANS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen visszafizetés?',
    description: 'Csoportosítsd a hiteleket a visszafizetés módja szerint!',
    categories: [
      { id: 'one', name: 'egy összegben a végén', color: 'blue' },
      { id: 'int', name: 'előbb csak kamat, a végén a többi', color: 'amber' },
      { id: 'ann', name: 'egyenlő részletekben', color: 'emerald' }
    ],
    items: [
      { id: 'fls1', text: 'Tamás a) része: 3 év múlva 2 662 000 Ft', categoryId: 'one' },
      { id: 'fls2', text: '2 000 000 Ft, 1 év, 8%: 2 160 000 Ft', categoryId: 'one' },
      { id: 'fls3', text: 'a tartozás 3 évig kamatozik, közben nincs befizetés', categoryId: 'one' },
      { id: 'fls4', text: 'a cég az 1. év végén 160 000 Ft-ot, a 2. év végén 2 160 000 Ft-ot fizet', categoryId: 'int' },
      { id: 'fls5', text: 'Judit: az 1. év végén 38 500 Ft, a 2. év végén 388 500 Ft', categoryId: 'int' },
      { id: 'fls6', text: 'a tőketartozás az 1. év után változatlan marad', categoryId: 'int' },
      { id: 'fls7', text: 'Tamás b) része: 3 × 804 230 Ft', categoryId: 'ann' },
      { id: 'fls8', text: 'Kálmán: 4 × 269 027 Ft negyedévente', categoryId: 'ann' },
      { id: 'fls9', text: 'Antal: 4 × 63 095 Ft', categoryId: 'ann' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kamat, tőkerész vagy tartozás?',
    description: 'Antal hitele (200 000 Ft, 10%, 4 × 63 095 Ft): mi az adott szám?',
    categories: [
      { id: 'k', name: 'kamatrész', color: 'amber' },
      { id: 't', name: 'tőketörlesztés', color: 'blue' },
      { id: 'r', name: 'fennmaradó tőketartozás', color: 'purple' }
    ],
    items: [
      { id: 'fls10', text: '20 000 Ft (1. év)', categoryId: 'k' },
      { id: 'fls11', text: '≈ 15 691 Ft (2. év)', categoryId: 'k' },
      { id: 'fls12', text: '≈ 10 950 Ft (3. év)', categoryId: 'k' },
      { id: 'fls13', text: '43 095 Ft (1. év)', categoryId: 't' },
      { id: 'fls14', text: '≈ 47 405 Ft (2. év)', categoryId: 't' },
      { id: 'fls15', text: '≈ 52 145 Ft (3. év)', categoryId: 't' },
      { id: 'fls16', text: '156 905 Ft (1. év után)', categoryId: 'r' },
      { id: 'fls17', text: '≈ 109 501 Ft (2. év után)', categoryId: 'r' },
      { id: 'fls18', text: '≈ 57 356 Ft (3. év után)', categoryId: 'r' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 't', name: 'igaz', color: 'emerald' },
      { id: 'f', name: 'hamis', color: 'rose' },
      { id: 'd', name: 'a körülményektől függ', color: 'amber' }
    ],
    items: [
      { id: 'fls19', text: 'Egyenlő részleteknél a kamatrész évről évre csökken.', categoryId: 't' },
      { id: 'fls20', text: 'A tőketörlesztések összege a felvett hitel.', categoryId: 't' },
      { id: 'fls21', text: 'Részletekben kevesebb a teljes visszafizetés, mint egy összegben a végén.', categoryId: 't' },
      { id: 'fls22', text: 'Az egyenlő részlet az egyösszegű tartozás n-ed része.', categoryId: 'f' },
      { id: 'fls23', text: 'A bank a már kifizetett rész után is számol kamatot.', categoryId: 'f' },
      { id: 'fls24', text: 'Csak kamat fizetésével is elfogy a tartozás.', categoryId: 'f' },
      { id: 'fls25', text: 'Az euróhitel forintban mért részlete nő.', categoryId: 'd' },
      { id: 'fls26', text: 'A részvénybe fektetett pénz értéke egy év múlva nagyobb.', categoryId: 'd' },
      { id: 'fls27', text: 'A havi részletes hitel kamatterhe kisebb, mint az évesé.', categoryId: 'd' }
    ]
  }
};

export const FinanceLoansSorter: React.FC<FinanceLoansSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-hitelek-sorter',
  topicTitle = '9. Pénzügyi feladatok II. – hitelek és kockázatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="penzugyi-feladatok-2-hitelek-es-kockazatok"
      title={topicTitle}
      subtitle="Rendszerezd a visszafizetési módokat, a törlesztőtábla adatait és a hitelekről szóló állításokat!"
      levels={FINANCE_LOANS_SORTER_LEVELS}
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

export default FinanceLoansSorter;
