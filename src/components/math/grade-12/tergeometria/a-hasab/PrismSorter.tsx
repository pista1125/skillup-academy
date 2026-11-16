import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PrismSorterProps {
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

const PRISM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen hasáb?',
    description: 'Csoportosítsd a testeket a fajtájuk szerint!',
    categories: [
      { id: 'egy', name: 'egyenes hasáb (nem téglatest)', color: 'blue' },
      { id: 'fer', name: 'ferde hasáb', color: 'amber' },
      { id: 'tegla', name: 'téglatest vagy kocka', color: 'emerald' }
    ],
    items: [
      { id: 'prs1', text: 'szabályos hatszög alapú, oldallapjai téglalapok', categoryId: 'egy' },
      { id: 'prs2', text: 'háromszög alapú hirdetőoszlop, oldalélei merőlegesek az alapra', categoryId: 'egy' },
      { id: 'prs3', text: 'a bevezető nyolcszög alapú teste', categoryId: 'egy' },
      { id: 'prs4', text: 'oldaléle 10 cm, magassága 8 cm', categoryId: 'fer' },
      { id: 'prs5', text: 'oldallapjai nem téglalap paralelogrammák', categoryId: 'fer' },
      { id: 'prs6', text: 'oldalélei 60°-os szöget zárnak be az alaplappal', categoryId: 'fer' },
      { id: 'prs7', text: 'téglalap alapú egyenes hasáb', categoryId: 'tegla' },
      { id: 'prs8', text: 'egyenlő élű téglatest', categoryId: 'tegla' },
      { id: 'prs9', text: 'minden lapja négyzet', categoryId: 'tegla' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Melyik darabszám?',
    description: 'Egy hatszög alapú hasábról van szó: melyik csoportba tartozik a szám?',
    categories: [
      { id: 'c', name: 'a csúcsok száma (12)', color: 'purple' },
      { id: 'e', name: 'az élek száma (18)', color: 'rose' },
      { id: 'l', name: 'a lapok száma (8)', color: 'teal' }
    ],
    items: [
      { id: 'prs10', text: '2n, ha n = 6', categoryId: 'c' },
      { id: 'prs11', text: 'az alaplap és a fedőlap csúcsai együtt', categoryId: 'c' },
      { id: 'prs12', text: 'a hatszög csúcsszámának kétszerese', categoryId: 'c' },
      { id: 'prs13', text: '3n, ha n = 6', categoryId: 'e' },
      { id: 'prs14', text: 'alapélek + fedőélek + oldalélek', categoryId: 'e' },
      { id: 'prs15', text: 'ugyanannyi, mint a testátlók száma', categoryId: 'e' },
      { id: 'prs16', text: 'n + 2, ha n = 6', categoryId: 'l' },
      { id: 'prs17', text: '2 hatszöglap + 6 téglalap', categoryId: 'l' },
      { id: 'prs18', text: 'Eulerből: é − c + 2', categoryId: 'l' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 't', name: 'mindig igaz', color: 'emerald' },
      { id: 'f', name: 'hamis', color: 'rose' },
      { id: 'd', name: 'a hasábtól függ', color: 'amber' }
    ],
    items: [
      { id: 'prs19', text: 'Minden hasábnak páros számú lapátlója van.', categoryId: 't' },
      { id: 'prs20', text: 'A hasáb oldaléle legalább akkora, mint a magassága.', categoryId: 't' },
      { id: 'prs21', text: 'A hasáb bármely két oldaléle párhuzamos és egyenlő hosszú.', categoryId: 't' },
      { id: 'prs22', text: 'A szabályos hétszög alapú egyenes hasábnak 18 testátlója van.', categoryId: 'f' },
      { id: 'prs23', text: 'A ferde hasáb magassága egyenlő az oldalélével.', categoryId: 'f' },
      { id: 'prs24', text: 'A hasáb fedőlapja az alaplap tükörképe egy pontra.', categoryId: 'f' },
      { id: 'prs25', text: 'A hasáb oldallapjai téglalapok.', categoryId: 'd' },
      { id: 'prs26', text: 'A hasábnak van testátlója.', categoryId: 'd' },
      { id: 'prs27', text: 'A hasáb alaplapja négyzet.', categoryId: 'd' }
    ]
  }
};

export const PrismSorter: React.FC<PrismSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-hasab-sorter',
  topicTitle = '2. A hasáb – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-hasab"
      title={topicTitle}
      subtitle="Rendszerezd a hasábok fajtáit, a csúcs-, él- és lapszámokat és az állításokat!"
      levels={PRISM_SORTER_LEVELS}
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

export default PrismSorter;
