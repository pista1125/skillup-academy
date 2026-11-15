import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigAreaFormulaMatcherProps {
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

const TRIG_AREA_FORMULA_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek és fogalmak',
    description: 'Párosítsd a fogalmakat a megfelelő képlettel vagy jelentéssel!',
    pairs: [
      { id: 'tafm1', left: 'Háromszög területe (a, b, γ)', right: 'T = a · b · sin γ / 2' },
      { id: 'tafm2', left: 'Paralelogramma területe (a, b, γ)', right: 'T = a · b · sin γ' },
      { id: 'tafm3', left: 'Az a oldalhoz tartozó magasság', right: 'mₐ = b · sin γ' },
      { id: 'tafm4', left: 'Háromszög területe alappal és magassággal', right: 'T = a · mₐ / 2' },
      { id: 'tafm5', left: '1 km²', right: '10⁶ m²' },
      { id: 'tafm6', left: '1 m³', right: '10 hl' },
      { id: 'tafm7', left: 'Hasáb térfogata', right: 'alapterület · magasság' },
      { id: 'tafm8', left: 'A γ szög a képletben', right: 'a két oldal által közrefogott szög' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számold ki a területet!',
    description: 'Párosítsd az adatokat a területtel!',
    pairs: [
      { id: 'tafm9', left: 'Háromszög: 4,5 cm, 2,8 cm, közbezárt szög 73°', right: '≈ 6,0 cm²' },
      { id: 'tafm10', left: 'Háromszög: 10 cm, 6 cm, közbezárt szög 30°', right: '15 cm²' },
      { id: 'tafm11', left: 'Paralelogramma: 5 cm, 8 cm, hegyesszög 30°', right: '20 cm²' },
      { id: 'tafm12', left: 'Paralelogramma: 1,3 km, 1,2 km, hegyesszög 41°', right: '≈ 1,02 km²' },
      { id: 'tafm13', left: 'Szabályos háromszög, oldala 2 cm', right: '≈ 1,73 cm²' },
      { id: 'tafm14', left: 'Deltoid: 7 cm és 14 cm, köztük 82,2°', right: '≈ 97,1 cm²' },
      { id: 'tafm15', left: 'Háromszög: 12 cm, 10 cm, közbezárt szög 45°', right: '≈ 42,4 cm²' },
      { id: 'tafm16', left: 'Háromszög: 7 cm, 8 cm, közbezárt szög 60°', right: '≈ 24,2 cm²' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Visszafelé és összetett feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'tafm17', left: 'Paralelogramma: T = 45 cm², oldalak 8 és 7,5 cm ⇒ hegyesszög', right: '≈ 48,6°' },
      { id: 'tafm18', left: 'Paralelogramma: 40°, T = 0,3214 m², K = 3 m ⇒ oldalak', right: '1 m és 0,5 m' },
      { id: 'tafm19', left: 'r = 18 cm, húr 30 cm ⇒ AKB∢', right: '≈ 112,9°' },
      { id: 'tafm20', left: 'r = 18 cm, húr 30 cm ⇒ az AKB háromszög területe', right: '≈ 149,2 cm²' },
      { id: 'tafm21', left: '132,6°-os középponti szöghöz 12 cm-es húr ⇒ sugár', right: '≈ 6,55 cm' },
      { id: 'tafm22', left: 'Deltoid: 7 cm, 14 cm, egyik átló 7 cm ⇒ terület', right: '≈ 68,7 cm²' },
      { id: 'tafm23', left: 'Víztározó (≈ 1 km²) 2,5 m mélységgel ⇒ víz', right: '≈ 2,5 · 10⁶ m³' },
      { id: 'tafm24', left: '±1%-os hosszmérési hiba ⇒ területhiba', right: '≈ ±2%' }
    ]
  }
];

const TRIG_AREA_FORMULA_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TRIG_AREA_FORMULA_MATCHER_LEVELS_LIST[0],
  2: TRIG_AREA_FORMULA_MATCHER_LEVELS_LIST[1],
  3: TRIG_AREA_FORMULA_MATCHER_LEVELS_LIST[2]
};

export const TrigAreaFormulaMatcher: React.FC<TrigAreaFormulaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-teruletkeplet-matcher',
  topicTitle = '6. Új területképlet – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="uj-teruletkeplet"
      title={topicTitle}
      subtitle="Gyakorold a trigonometrikus területképletet, a mértékegységeket és a visszafelé számolást!"
      levels={TRIG_AREA_FORMULA_MATCHER_LEVELS}
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

export default TrigAreaFormulaMatcher;
