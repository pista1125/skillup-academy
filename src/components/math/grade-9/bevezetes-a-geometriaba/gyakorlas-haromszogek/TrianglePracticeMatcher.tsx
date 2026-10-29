import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TriangleAnglesAndSidesSVG,
  PythagorasHeightSVG,
  MediansCalculationSVG,
  CircumIncircleSVG
} from './TrianglePracticeFigures';

interface TrianglePracticeMatcherProps {
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

export const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapképletek és Tételek',
    subtitle: 'Párosítsd a geometriai fogalmakat a megfelelő matematikai szabállyal!',
    pairs: [
      {
        id: 'tpm1-1',
        prompt: 'Belső szögek összege',
        value: 'α + β + γ = 180°',
        figure: <TriangleAnglesAndSidesSVG size={65} />
      },
      {
        id: 'tpm1-2',
        prompt: 'Külső szög tétele',
        value: 'Egyenlő a nem mellette fekvő két belső szög összegével (α\' = β + γ)',
        figure: <TriangleAnglesAndSidesSVG size={65} />
      },
      {
        id: 'tpm1-3',
        prompt: 'Háromszög-egyenlőtlenség',
        value: 'Bármely két oldal összege nagyobb a harmadiknál (a + b > c)'
      },
      {
        id: 'tpm1-4',
        prompt: 'Pitagorasz-tétel',
        value: 'a² + b² = c² (derékszögű háromszög befogói és átfogója)',
        figure: <PythagorasHeightSVG size={65} />
      },
      {
        id: 'tpm1-5',
        prompt: 'Súlypont aránya',
        value: '2 : 1 arányban osztja a súlyvonalat a csúcs felől',
        figure: <MediansCalculationSVG size={65} />
      },
      {
        id: 'tpm1-6',
        prompt: 'Derékszögű háromszög körülírt sugara',
        value: 'R = c / 2 (az átfogó fele, Thalész-tétel)',
        figure: <CircumIncircleSVG size={65} />
      }
    ]
  },
  2: {
    title: '2. Szint: Szabályos és Szimmetrikus Háromszögek',
    subtitle: 'Párosítsd a speciális háromszögek képleteit és összefüggéseit!',
    pairs: [
      {
        id: 'tpm2-1',
        prompt: 'Szabályos háromszög magassága',
        value: 'm = (a · √3) / 2'
      },
      {
        id: 'tpm2-2',
        prompt: 'Szabályos háromszög területe',
        value: 'T = (a² · √3) / 4'
      },
      {
        id: 'tpm2-3',
        prompt: 'Egyenlő szárú háromszög alapmagassága',
        value: 'm_a = √(b² - (a/2)²)'
      },
      {
        id: 'tpm2-4',
        prompt: 'Derékszögű háromszög beírt körének sugara',
        value: 'r = (a + b - c) / 2'
      },
      {
        id: 'tpm2-5',
        prompt: 'Középvonal hossza és iránya',
        value: 'k = a / 2 és párhuzamos a harmadik oldallal'
      },
      {
        id: 'tpm2-6',
        prompt: 'Euler-egyenes szakaszaránya',
        value: '|MS| = 2 · |SO| (a súlypont közelebb van a körülírt körhöz)'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos Típusfeladatok',
    subtitle: 'Keresd meg a konkrét geometriai feladatok pontos végeredményét!',
    pairs: [
      {
        id: 'tpm3-1',
        prompt: 'Ha α = 50° és β = 70°, mekkora a harmadik szög külső szöge (γ\')?',
        value: '120° (mert γ\' = α + β = 50° + 70°)'
      },
      {
        id: 'tpm3-2',
        prompt: 'Derékszögű háromszög befogói 6 cm és 8 cm. Mennyi a körülírt kör sugara (R)?',
        value: '5 cm (mert az átfogó c = 10 cm, R = c / 2 = 5 cm)'
      },
      {
        id: 'tpm3-3',
        prompt: 'Egyenlő szárú háromszög alapja 12 cm, szára 10 cm. Mennyi a területe?',
        value: '48 cm² (mert m = √(10² - 6²) = 8 cm, T = 12 · 8 / 2 = 48 cm²)'
      },
      {
        id: 'tpm3-4',
        prompt: 'A súlyvonal teljes hossza 24 cm. Milyen hosszú a csúcs felőli szakasz?',
        value: '16 cm (mert 2/3 · 24 cm = 16 cm)'
      },
      {
        id: 'tpm3-5',
        prompt: 'Egy háromszög kerülete 30 cm. Mekkora a középvonalak által határolt háromszög kerülete?',
        value: '15 cm (mert pontosan a fele az eredetinek)'
      },
      {
        id: 'tpm3-6',
        prompt: 'Szabályos háromszög oldala a = 6 cm. Mennyi a magassága?',
        value: '3√3 cm ≈ 5.20 cm (mert (6 · √3) / 2 = 3√3 cm)'
      }
    ]
  }
};

export const TrianglePracticeMatcher: React.FC<TrianglePracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Gyakorlás (Háromszögek)'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="amber"
      storageKey="grade9-triangle-practice-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

