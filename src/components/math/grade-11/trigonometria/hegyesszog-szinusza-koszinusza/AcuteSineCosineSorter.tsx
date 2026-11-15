import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AcuteSineCosineSorterProps {
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

const ACUTE_SINE_COSINE_SORTER_LEVELS: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik szögfüggvény?',
    description: 'Döntsd el, melyik szögfüggvényt kell használni az adott oldalpárhoz!',
    categories: [
      { id: 'sin', name: 'Szinusz (szemközti befogó + átfogó)', color: 'emerald' },
      { id: 'cos', name: 'Koszinusz (szög melletti befogó + átfogó)', color: 'blue' },
      { id: 'tg', name: 'Tangens (két befogó)', color: 'amber' }
    ],
    items: [
      { id: 's1', text: 'Ismert az átfogó és a szöggel szemközti befogó', categoryId: 'sin' },
      { id: 's2', text: 'Létra hossza és a fal mentén elért magasság', categoryId: 'sin' },
      { id: 's3', text: 'Út hossza és a leküzdött szintkülönbség', categoryId: 'sin' },
      { id: 's4', text: 'Ismert az átfogó és a szög melletti befogó', categoryId: 'cos' },
      { id: 's5', text: 'Téglalap átlója és az átlóval szöget bezáró oldal', categoryId: 'cos' },
      { id: 's6', text: 'Út hossza és a térképen mért vízszintes távolság', categoryId: 'cos' },
      { id: 's7', text: 'Ismert a két befogó, az átfogó nem', categoryId: 'tg' },
      { id: 's8', text: 'Torony árnyékának hossza és a torony magassága', categoryId: 'tg' },
      { id: 's9', text: 'Lejtő vízszintes hossza és emelkedése', categoryId: 'tg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Lehetséges vagy lehetetlen érték?',
    description: 'Csoportosítsd az értékeket: lehet-e egy hegyesszög szinusza/koszinusza?',
    categories: [
      { id: 'ok', name: 'Lehet hegyesszög szinusza vagy koszinusza', color: 'emerald' },
      { id: 'tg_only', name: 'Csak tangens lehet (1-nél nagyobb pozitív)', color: 'amber' },
      { id: 'never', name: 'Hegyesszög egyik szögfüggvénye sem lehet', color: 'rose' }
    ],
    items: [
      { id: 's10', text: '0,5', categoryId: 'ok' },
      { id: 's11', text: '0,9848', categoryId: 'ok' },
      { id: 's12', text: '0,0872', categoryId: 'ok' },
      { id: 's13', text: '1,2', categoryId: 'tg_only' },
      { id: 's14', text: '5,67', categoryId: 'tg_only' },
      { id: 's15', text: '√3 ≈ 1,732', categoryId: 'tg_only' },
      { id: 's16', text: '−0,5', categoryId: 'never' },
      { id: 's17', text: '0', categoryId: 'never' },
      { id: 's18', text: '−2', categoryId: 'never' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit számolunk ki?',
    description: 'Csoportosítsd a képleteket aszerint, hogy oldalt, szöget vagy magasságot adnak!',
    categories: [
      { id: 'side', name: 'Oldalhosszt ad', color: 'blue' },
      { id: 'angle', name: 'Szöget ad', color: 'violet' },
      { id: 'height', name: 'Magasságot / szintkülönbséget ad', color: 'teal' }
    ],
    items: [
      { id: 's19', text: '14 · cos 40°', categoryId: 'side' },
      { id: 's20', text: '2 · 14 · sin 22° (egyenlő szárú háromszög alapja)', categoryId: 'side' },
      { id: 's21', text: '25 · sin 35° (befogó)', categoryId: 'side' },
      { id: 's22', text: 'cos⁻¹(17,3 / 20)', categoryId: 'angle' },
      { id: 's23', text: 'sin⁻¹(0,5 / 2)', categoryId: 'angle' },
      { id: 's24', text: 'cos⁻¹(5 / 28)', categoryId: 'angle' },
      { id: 's25', text: '500 · sin 15° (út emelkedése)', categoryId: 'height' },
      { id: 's26', text: '14 · cos 22° (alaphoz tartozó magasság)', categoryId: 'height' },
      { id: 's27', text: 'a · b / c (átfogóhoz tartozó magasság)', categoryId: 'height' }
    ]
  }
];

export const AcuteSineCosineSorter: React.FC<AcuteSineCosineSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-szinusz-koszinusz-sorter',
  topicTitle = '3. Hegyesszög szinusza, koszinusza – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="hegyesszog-szinusza-koszinusza"
      title={topicTitle}
      subtitle="Válaszd ki a megfelelő szögfüggvényt, szűrd ki a lehetetlen értékeket és rendszerezd a képleteket!"
      levels={{ 1: ACUTE_SINE_COSINE_SORTER_LEVELS[0], 2: ACUTE_SINE_COSINE_SORTER_LEVELS[1], 3: ACUTE_SINE_COSINE_SORTER_LEVELS[2] }}
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

export default AcuteSineCosineSorter;
