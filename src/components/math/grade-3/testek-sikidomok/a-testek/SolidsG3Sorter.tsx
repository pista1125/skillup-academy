import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SolidKind } from './SolidsG3Parts';
import { SolidCard } from './SolidsG3CardFigures';

interface SolidsG3SorterProps {
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

let uid = 0;
const fig = (kind: SolidKind, cat: string, color?: string): SorterItem => ({ id: `sols${++uid}`, text: '', figure: <SolidCard kind={kind} small color={color} />, categoryId: cat });
const txt = (text: string, cat: string): SorterItem => ({ id: `sols${++uid}`, text, categoryId: cat });

const FLAT_FIGS = (cat: string) => [fig('kocka', cat), fig('teglatest', cat), fig('piramis4', cat), fig('piramis3', cat), fig('sator', cat)];
const BOX_TEXTS = (cat: string) => [txt('dobókocka', cat), txt('tégla', cat), txt('cipősdoboz', cat), txt('gyufásdoboz', cat)];
const ROUND_TEXTS = (cat: string) => [txt('konzervdoboz', cat), txt('gyertya', cat), txt('fagyitölcsér', cat), txt('kerek sajt', cat)];

const SOLIDS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Lapok vagy görbe rész?',
    description: 'Mi határolja a testet?',
    categories: [
      { id: 'lap', name: 'csak lapok határolják', color: 'sky' },
      { id: 'vegyes', name: 'lapja és görbe része is van', color: 'amber' },
      { id: 'gorbe', name: 'nincs lapja, csak görbe része', color: 'rose' }
    ],
    items: [
      ...FLAT_FIGS('lap'),
      ...BOX_TEXTS('lap'),
      fig('henger', 'vegyes'),
      fig('kup', 'vegyes'),
      fig('felgomb', 'vegyes'),
      fig('henger', 'vegyes', '#a855f7'),
      fig('kup', 'vegyes', '#22c55e'),
      ...ROUND_TEXTS('vegyes'),
      fig('gomb', 'gorbe'),
      fig('gomb', 'gorbe', '#3b82f6'),
      fig('gomb', 'gorbe', '#f59e0b'),
      fig('gomb', 'gorbe', '#22c55e'),
      txt('labda', 'gorbe'),
      txt('narancs', 'gorbe'),
      txt('üveggolyó', 'gorbe'),
      txt('földgömb', 'gorbe'),
      txt('hógolyó', 'gorbe')
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen lapja van?',
    description: 'Nézd meg a lapok alakját!',
    categories: [
      { id: 'har', name: 'van háromszög alakú lapja', color: 'emerald' },
      { id: 'kor', name: 'van kör alakú lapja', color: 'amber' },
      { id: 'teg', name: 'csak négyzet és téglalap lapja van', color: 'sky' }
    ],
    items: [
      fig('piramis4', 'har'),
      fig('piramis3', 'har'),
      fig('sator', 'har'),
      fig('piramis4', 'har', '#3b82f6'),
      fig('sator', 'har', '#f59e0b'),
      txt('egyiptomi piramis', 'har'),
      txt('kemping sátor', 'har'),
      txt('háromszög alakú csokidoboz', 'har'),
      txt('piramis alakú gyertya', 'har'),
      fig('henger', 'kor'),
      fig('kup', 'kor'),
      fig('felgomb', 'kor'),
      fig('henger', 'kor', '#ec4899'),
      fig('kup', 'kor', '#3b82f6'),
      ...ROUND_TEXTS('kor'),
      fig('kocka', 'teg'),
      fig('teglatest', 'teg'),
      fig('kocka', 'teg', '#ef4444'),
      fig('teglatest', 'teg', '#22c55e'),
      fig('kocka', 'teg', '#a855f7'),
      ...BOX_TEXTS('teg')
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány lapja van?',
    description: 'Számold meg a lapokat! A takartakat is!',
    categories: [
      { id: 'hat', name: '6 lapja van', color: 'sky' },
      { id: 'ot', name: '5 lapja van', color: 'emerald' },
      { id: 'egyketto', name: '1 vagy 2 lapja van', color: 'amber' }
    ],
    items: [
      fig('kocka', 'hat'),
      fig('teglatest', 'hat'),
      fig('kocka', 'hat', '#f59e0b'),
      fig('teglatest', 'hat', '#ec4899'),
      fig('teglatest', 'hat', '#06b6d4'),
      ...BOX_TEXTS('hat'),
      fig('piramis4', 'ot'),
      fig('sator', 'ot'),
      fig('piramis4', 'ot', '#22c55e'),
      fig('sator', 'ot', '#a855f7'),
      fig('piramis4', 'ot', '#06b6d4'),
      txt('egyiptomi piramis', 'ot'),
      txt('kemping sátor', 'ot'),
      txt('háromszög alakú csokidoboz', 'ot'),
      txt('piramis alakú gyertya', 'ot'),
      fig('henger', 'egyketto'),
      fig('kup', 'egyketto'),
      fig('felgomb', 'egyketto'),
      fig('henger', 'egyketto', '#f59e0b'),
      fig('felgomb', 'egyketto', '#ec4899'),
      txt('konzervdoboz', 'egyketto'),
      txt('fagyitölcsér', 'egyketto'),
      txt('kerek sajt', 'egyketto'),
      txt('fordított tál', 'egyketto')
    ]
  }
];

export const SOLIDS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SOLIDS_G3_SORTER_LEVELS_LIST[0],
  2: SOLIDS_G3_SORTER_LEVELS_LIST[1],
  3: SOLIDS_G3_SORTER_LEVELS_LIST[2]
};

export const SolidsG3Sorter: React.FC<SolidsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-geom-testek-sorter',
  topicTitle = '1. A testek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="a-testek"
      title={topicTitle}
      subtitle="Tedd a testeket és a tárgyakat a helyükre!"
      levels={SOLIDS_G3_SORTER_LEVELS}
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

export default SolidsG3Sorter;
