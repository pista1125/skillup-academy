import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  OpenIntervalSvg,
  ClosedIntervalSvg,
  HalfOpenIntervalSvg,
  InfiniteIntervalSvg,
  IntervalIntersectionSvg,
  IntervalUnionSvg,
  IntervalDifferenceSvg
} from './IntervalsFigures';

interface IntervalsSorterProps {
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
    title: '1. Szint: Intervallumok Osztályozása Zártság Szerint',
    subtitle: 'Döntsd el, hogy a megadott intervallum zárt, nyílt vagy félig nyílt!',
    categories: [
      {
        id: 'cat-closed',
        name: 'Zárt Intervallum [a, b]',
        description: 'Mindkét végpont beletartozik (a ≤ x ≤ b, teli karikák)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-open',
        name: 'Nyílt Intervallum (a, b)',
        description: 'Egyik végpont sem tartozik bele (a < x < b, üres karikák)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-half',
        name: 'Félig Nyílt / Félig Zárt',
        description: 'Pontosan az egyik végpont tartozik bele ([a, b) vagy (a, b])',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ins1-1', label: '[-3, 4]', category: 'cat-closed', figure: <ClosedIntervalSvg a={-3} b={4} size={65} label="[-3, 4]" /> },
      { id: 'ins1-2', label: '0 ≤ x ≤ 10', category: 'cat-closed' },
      { id: 'ins1-3', label: '[2, 5]', category: 'cat-closed', figure: <ClosedIntervalSvg a={2} b={5} size={65} label="[2, 5]" /> },
      { id: 'ins1-4', label: '[-1, 1]', category: 'cat-closed' },
      { id: 'ins1-5', label: '(-2, 3)', category: 'cat-open', figure: <OpenIntervalSvg a={-2} b={3} size={65} label="(-2, 3)" /> },
      { id: 'ins1-6', label: ']-1, 5[', category: 'cat-open' },
      { id: 'ins1-7', label: '-4 < x < 0', category: 'cat-open' },
      { id: 'ins1-8', label: '(1, 6)', category: 'cat-open', figure: <OpenIntervalSvg a={1} b={6} size={65} label="(1, 6)" /> },
      { id: 'ins1-9', label: '[0, 4)', category: 'cat-half', figure: <HalfOpenIntervalSvg a={0} b={4} leftClosed={true} size={65} label="[0, 4)" /> },
      { id: 'ins1-10', label: '(-3, 2]', category: 'cat-half', figure: <HalfOpenIntervalSvg a={-3} b={2} leftClosed={false} size={65} label="(-3, 2]" /> },
      { id: 'ins1-11', label: '2 < x ≤ 8', category: 'cat-half' },
      { id: 'ins1-12', label: '[-5, -1[', category: 'cat-half' }
    ]
  },
  2: {
    title: '2. Szint: Korlátosság és Félegyenesek Típusa',
    subtitle: 'Különböztesd meg a korlátos szakaszokat és a végtelen félegyeneseket!',
    categories: [
      {
        id: 'cat-bounded',
        name: 'Korlátos Intervallum',
        description: 'Véges hosszúságú szakasz, két valós számmal határolva',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-lower',
        name: 'Alulról Korlátos Félegyenes',
        description: 'Van legkisebb értéke, jobbra a +∞ felé tart ([a, +∞) vagy (a, +∞))',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-upper',
        name: 'Felülről Korlátos Félegyenes',
        description: 'Van legnagyobb értéke, balra a -∞ felé tart ((-∞, b] vagy (-∞, b))',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ins2-1', label: '[-2, 6]', category: 'cat-bounded', figure: <ClosedIntervalSvg a={-2} b={6} size={65} label="[-2, 6]" /> },
      { id: 'ins2-2', label: '(-1, 4)', category: 'cat-bounded', figure: <OpenIntervalSvg a={-1} b={4} size={65} label="(-1, 4)" /> },
      { id: 'ins2-3', label: '[0, 5)', category: 'cat-bounded' },
      { id: 'ins2-4', label: '-3 ≤ x < 2', category: 'cat-bounded' },
      { id: 'ins2-5', label: '[3, +∞)', category: 'cat-lower', figure: <InfiniteIntervalSvg bound={3} direction="right" isClosed={true} size={65} label="[3, +∞)" /> },
      { id: 'ins2-6', label: '(0, +∞)', category: 'cat-lower' },
      { id: 'ins2-7', label: 'x ≥ -2', category: 'cat-lower', figure: <InfiniteIntervalSvg bound={-2} direction="right" isClosed={true} size={65} label="[-2, +∞)" /> },
      { id: 'ins2-8', label: 'x > 5', category: 'cat-lower' },
      { id: 'ins2-9', label: '(-∞, 4]', category: 'cat-upper', figure: <InfiniteIntervalSvg bound={4} direction="left" isClosed={true} size={65} label="(-∞, 4]" /> },
      { id: 'ins2-10', label: '(-∞, 0)', category: 'cat-upper' },
      { id: 'ins2-11', label: 'x ≤ 1', category: 'cat-upper', figure: <InfiniteIntervalSvg bound={1} direction="left" isClosed={true} size={65} label="(-∞, 1]" /> },
      { id: 'ins2-12', label: 'x < -3', category: 'cat-upper' }
    ]
  },
  3: {
    title: '3. Szint: Műveleti Eredmények Formája',
    subtitle: 'Határozd meg, hogy az intervallumművelet milyen halmazt eredményez!',
    categories: [
      {
        id: 'cat-single-bounded',
        name: 'Egyetlen Korlátos Szakasz',
        description: 'Eredménye egy véges intervallum (pl. [a, b], [a, b) stb.)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-single-infinite',
        name: 'Végtelen Halmaz / Félegyenes',
        description: 'Eredménye egy félegyenes vagy a teljes R',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-disjoint-empty',
        name: 'Diszjunkt Unió vagy Üres (∅)',
        description: 'Nem vonható össze egybe (unióként marad) vagy üres halmaz',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ins3-1', label: '[-2, 3] ∩ [0, 5]', category: 'cat-single-bounded', figure: <IntervalIntersectionSvg a1={-2} b1={3} a2={0} b2={5} size={65} /> },
      { id: 'ins3-2', label: '[-1, 2] ∪ [1, 4]', category: 'cat-single-bounded', figure: <IntervalUnionSvg a1={-1} b1={2} a2={1} b2={4} size={65} /> },
      { id: 'ins3-3', label: '[1, 5] \\ [3, 7]', category: 'cat-single-bounded', figure: <IntervalDifferenceSvg size={65} /> },
      { id: 'ins3-4', label: '(-∞, 4] ∩ [0, +∞)', category: 'cat-single-bounded' },
      { id: 'ins3-5', label: '[0, +∞) ∪ [3, +∞)', category: 'cat-single-infinite' },
      { id: 'ins3-6', label: '(-∞, 2] ∪ [1, +∞)', category: 'cat-single-infinite' },
      { id: 'ins3-7', label: 'R \\ (-∞, 0)', category: 'cat-single-infinite' },
      { id: 'ins3-8', label: '(-∞, 5] ∪ (-∞, 2]', category: 'cat-single-infinite' },
      { id: 'ins3-9', label: '[-4, -1] ∩ [2, 5]', category: 'cat-disjoint-empty' },
      { id: 'ins3-10', label: 'R \\ [1, 4]', category: 'cat-disjoint-empty' },
      { id: 'ins3-11', label: '[-3, 0] ∪ [2, 5]', category: 'cat-disjoint-empty' },
      { id: 'ins3-12', label: '[-2, 1) ∩ [1, 4]', category: 'cat-disjoint-empty' }
    ]
  }
};

export const IntervalsSorter: React.FC<IntervalsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-intervallumok-sorter'}
      topicTitle={topicTitle || '9. Osztály - Intervallumok Gyakorló Csoportosító'}
    />
  );
};

export default IntervalsSorter;
