import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  NumberSetsVennSvg,
  ClosureMatrixSvg,
  AxiomsVisualSvg,
  InversesVisualSvg
} from './NumberSetsFigures';

interface NumberSetsMatcherProps {
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
    title: '1. Szint: Számhalmazok és Alapfogalmak (Könnyű)',
    subtitle: 'Párosítsd a számhalmazok szimbólumait a szabatos megnevezésükkel és elemeikkel!',
    pairs: [
      {
        id: 'nsm1-1',
        prompt: 'ℕ (Természetes számok)',
        value: '{0, 1, 2, 3, ...} — nemnegatív egész számok',
        figure: <NumberSetsVennSvg size={65} />
      },
      {
        id: 'nsm1-2',
        prompt: 'ℤ (Egész számok)',
        value: '{..., -2, -1, 0, 1, 2, ...} — negatív és természetes számok'
      },
      {
        id: 'nsm1-3',
        prompt: 'ℚ (Racionális számok)',
        value: 'a/b alakú törtek (b ≠ 0), tizedestört alakjuk véges vagy szakaszos'
      },
      {
        id: 'nsm1-4',
        prompt: 'ℚ* (Irracionális számok)',
        value: 'Nem írhatók fel két egész hányadosaként (pl. √2, π, e)'
      },
      {
        id: 'nsm1-5',
        prompt: 'ℝ (Valós számok)',
        value: 'A racionális és irracionális számok egyesítése (ℚ ∪ ℚ*)'
      },
      {
        id: 'nsm1-6',
        prompt: 'x ∈ H',
        value: '„x eleme a H halmaznak” (beletartozik)'
      },
      {
        id: 'nsm1-7',
        prompt: 'A ⊂ B',
        value: 'A valódi részhalmaza B-nek (A része B-nek, de A ≠ B)'
      },
      {
        id: 'nsm1-8',
        prompt: '0 (Nulla)',
        value: 'A legkisebb természetes szám, sem nem pozitív, sem nem negatív'
      }
    ]
  },
  2: {
    title: '2. Szint: Műveleti Axiómák és Elemek (Közepes)',
    subtitle: 'Párosítsd a műveleti tulajdonságokat a hozzájuk tartozó matematikai képlettel!',
    pairs: [
      {
        id: 'nsm2-1',
        prompt: 'Kommutativitás (Összeadás)',
        value: 'a + b = b + a (felcserélhetőség)',
        figure: <AxiomsVisualSvg size={65} />
      },
      {
        id: 'nsm2-2',
        prompt: 'Kommutativitás (Szorzás)',
        value: 'a · b = b · a (tényezők felcserélhetők)'
      },
      {
        id: 'nsm2-3',
        prompt: 'Asszociativitás (Összeadás)',
        value: '(a + b) + c = a + (b + c) (csoportosíthatóság)'
      },
      {
        id: 'nsm2-4',
        prompt: 'Disztributivitás',
        value: 'a · (b + c) = a·b + a·c (széttagolhatóság)'
      },
      {
        id: 'nsm2-5',
        prompt: 'Összeadás semleges eleme',
        value: '0, mert a + 0 = a',
        figure: <InversesVisualSvg size={65} />
      },
      {
        id: 'nsm2-6',
        prompt: 'Összeadási inverz (Ellentett)',
        value: '-a, mert a + (-a) = 0'
      },
      {
        id: 'nsm2-7',
        prompt: 'Szorzás semleges eleme',
        value: '1, mert a · 1 = a'
      },
      {
        id: 'nsm2-8',
        prompt: 'Szorzási inverz (Reciprok)',
        value: '1/a, mert a · (1/a) = 1 (ha a ≠ 0)'
      }
    ]
  },
  3: {
    title: '3. Szint: Műveleti Zártság és Ellenpéldák (Nehéz)',
    subtitle: 'Párosítsd a zártsági állításokat a megfelelő szabatos magyarázattal vagy ellenpéldával!',
    pairs: [
      {
        id: 'nsm3-1',
        prompt: 'ℕ nem zárt a kivonásra',
        value: '2 - 7 = -5 ∉ ℕ (negatív eredmény keletkezhet)',
        figure: <ClosureMatrixSvg size={65} />
      },
      {
        id: 'nsm3-2',
        prompt: 'ℤ nem zárt az osztásra',
        value: '1 : 2 = 0,5 ∉ ℤ (tört eredmény keletkezhet)'
      },
      {
        id: 'nsm3-3',
        prompt: 'ℚ* nem zárt a szorzásra',
        value: '√3 · √3 = 3 ∈ ℚ (két irracionális szorzata lehet racionális)'
      },
      {
        id: 'nsm3-4',
        prompt: 'ℚ* nem zárt az összeadásra',
        value: '√2 + (-√2) = 0 ∈ ℚ (két irracionális összege lehet 0)'
      },
      {
        id: 'nsm3-5',
        prompt: 'ℚ* nem zárt a kivonásra',
        value: 'π - π = 0 ∈ ℚ (önmagából kivonva 0-t kapunk)'
      },
      {
        id: 'nsm3-6',
        prompt: 'ℚ* nem zárt az osztásra',
        value: '√18 : √2 = √9 = 3 ∈ ℚ'
      },
      {
        id: 'nsm3-7',
        prompt: 'ℕ zárt az összeadásra és szorzásra',
        value: 'Bármely két természetes szám összege és szorzata is ℕ-beli'
      },
      {
        id: 'nsm3-8',
        prompt: 'Kivonás nem asszociatív',
        value: '(10 - 5) - 2 = 3 ≠ 10 - (5 - 2) = 7'
      }
    ]
  }
};

export const NumberSetsMatcher: React.FC<NumberSetsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-muveletek-matcher',
  topicTitle = '9. Osztály - Műveletek Számhalmazokban Párosító'
}) => {
  return (
    <MatcherTemplate
      levels={matcherLevels}
      currentLevel={currentLevel || level}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default NumberSetsMatcher;
