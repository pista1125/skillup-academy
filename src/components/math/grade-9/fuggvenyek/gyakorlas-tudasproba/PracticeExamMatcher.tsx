import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChapterMapSvg, ComprehensiveAnalysisSvg, DualMethodComparisonSvg } from './PracticeExamFigures';

export interface PracticeExamMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Függvények és Geometriai Alakzatok',
    subtitle: 'Párosítsd az algebrai formulákat a hozzájuk tartozó grafikonnal és geometriai tulajdonsággal!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'f(x) = 2x - 4',
        value: 'Egyenes: meredeksége m = 2, az y tengelyt (0; -4)-ben metszi',
        figure: <ChapterMapSvg size={70} />
      },
      {
        id: 'pm1-2',
        prompt: 'f(x) = (x - 3)² + 1',
        value: 'Felfelé nyíló parabola: csúcspontja C(3; 1)',
        figure: <ChapterMapSvg size={70} />
      },
      {
        id: 'pm1-3',
        prompt: 'f(x) = -|x + 2| + 5',
        value: 'Lefelé nyíló V-alak: csúcspontja C(-2; 5)',
        figure: <ChapterMapSvg size={70} />
      },
      {
        id: 'pm1-4',
        prompt: 'f(x) = √(x - 1)',
        value: 'Fekvő félparabola: kezdőpontja (1; 0), Df = [1; ∞['
      },
      {
        id: 'pm1-5',
        prompt: 'f(x) = 6 / x',
        value: 'Hiperbola: fordított arányosság görbéje, nem metszi a tengelyeket'
      },
      {
        id: 'pm1-6',
        prompt: 'f(x) = -x² + 4',
        value: 'Lefelé nyíló parabola: csúcsa a (0; 4) pont, zérushelyei ±2'
      }
    ]
  },
  2: {
    title: '2. Szint: Függvényjellemzési Tulajdonságok',
    subtitle: 'Keresd meg a függvényekhez tartozó helyes jellemzési adatpárt!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'f(x) = (x - 1)² - 9',
        value: 'Zérushelyek: x₁ = -2, x₂ = 4; Minimum: (1; -9)',
        figure: <ComprehensiveAnalysisSvg size={70} />
      },
      {
        id: 'pm2-2',
        prompt: 'f(x) = -|x - 4| + 2',
        value: 'Globális maximum az x = 4 helyen (Max = 2), Rf = ]-∞; 2]',
        figure: <ComprehensiveAnalysisSvg size={70} />
      },
      {
        id: 'pm2-3',
        prompt: 'f(x) = 3x + 6',
        value: 'Zérushely: x = -2; szigorúan monoton növekvő ℝ-en, nincs szélsőérték'
      },
      {
        id: 'pm2-4',
        prompt: 'f(x) = x² + 5',
        value: 'Páros függvény: f(-x) = f(x), szimmetrikus az y tengelyre'
      },
      {
        id: 'pm2-5',
        prompt: 'f(x) = √x - 3',
        value: 'Rf = [-3; ∞[, zérushely: x = 9 (mert √9 - 3 = 0)'
      },
      {
        id: 'pm2-6',
        prompt: 'f(x) = -2x + 10',
        value: 'Szigorúan monoton csökkenő ℝ-en, zérushely: x = 5'
      }
    ]
  },
  3: {
    title: '3. Szint: Grafikus Egyenletek és Egyenlőtlenségek',
    subtitle: 'Párosítsd a kifejezéseket a megoldáshalmazukkal!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'x² - 4 ≤ 0',
        value: 'x ∈ [-2; 2] (a parabola az x-tengely alatt halad vagy metszi azt)',
        figure: <DualMethodComparisonSvg size={70} />
      },
      {
        id: 'pm3-2',
        prompt: '|x - 3| = 5',
        value: 'x ∈ {-2; 8} (a 3 ponttól pontosan 5 távolságra lévő értékek)',
        figure: <DualMethodComparisonSvg size={70} />
      },
      {
        id: 'pm3-3',
        prompt: '|x - 2| = |x - 8|',
        value: 'x = 5 (a 2 és 8 szakaszának felezőpontja: (2 + 8) / 2)'
      },
      {
        id: 'pm3-4',
        prompt: 'x² > 9',
        value: 'x ∈ ]-∞; -3[ ∪ ]3; ∞[ (két külső nyílt félegyenes)'
      },
      {
        id: 'pm3-5',
        prompt: '|x + 1| ≤ 3',
        value: 'x ∈ [-4; 2] (a -1 pont 3 sugarú zárt környezete)'
      },
      {
        id: 'pm3-6',
        prompt: '|x - 5| = -2',
        value: 'x ∈ ∅ (üres halmaz, a távolság nem lehet negatív)'
      }
    ]
  }
};

export const PracticeExamMatcher: React.FC<PracticeExamMatcherProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-func-tudasproba-matcher',
  topicTitle = 'Függvénytan Témazáró Párosító'
}) => {
  const activeLevel = level ?? currentLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={currentLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

