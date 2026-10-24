import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  NumberSetsVennSvg,
  SubsetVennSvg,
  ElementBelongingSvg,
  EmptySetSvg,
  PowerSetTreeSvg,
  UniversalSetSvg,
  SetEqualitySvg
} from './SetsFigures';

interface SetsMatcherProps {
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
    title: '1. Szint: Alapvető Halmazjelölések és Fogalmak',
    subtitle: 'Párosítsd a matematikai szimbólumokat a szabatos megnevezésükkel és jelentésükkel!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: 'x ∈ A',
        value: '„x eleme az A halmaznak” (beletartozik)',
        figure: <ElementBelongingSvg size={65} />
      },
      {
        id: 'sm1-2',
        prompt: 'y ∉ A',
        value: '„y nem eleme az A halmaznak” (kívül esik)',
        figure: <ElementBelongingSvg size={65} />
      },
      {
        id: 'sm1-3',
        prompt: '∅ vagy { }',
        value: 'Üres halmaz (pontosan 0 eleme van)',
        figure: <EmptySetSvg size={65} />
      },
      {
        id: 'sm1-4',
        prompt: 'A ⊆ B',
        value: 'A részhalmaza B-nek (minden eleme B-ben is benne van)',
        figure: <SubsetVennSvg size={65} />
      },
      {
        id: 'sm1-5',
        prompt: '|A|',
        value: 'Az A halmaz elemszáma (számossága)'
      },
      {
        id: 'sm1-6',
        prompt: 'A = B',
        value: 'Két halmaz egyenlő: pontosan ugyanazok az elemeik',
        figure: <SetEqualitySvg size={65} />
      },
      {
        id: 'sm1-7',
        prompt: 'U (vagy E)',
        value: 'Alaphalmaz (univerzum), amelyben a vizsgált elemek találhatók',
        figure: <UniversalSetSvg size={65} />
      },
      {
        id: 'sm1-8',
        prompt: 'A ⊂ B (valódi részhalmaz)',
        value: 'A ⊆ B, de van olyan B-beli elem, ami nincs benne A-ban'
      }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes Számhalmazok és Besorolások',
    subtitle: 'Párosítsd a számhalmazok jeleit és a konkrét számokat a pontos kategóriájukkal!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: 'ℕ (Természetes számok)',
        value: 'Nemnegatív egész számok: {0, 1, 2, 3, ...}'
      },
      {
        id: 'sm2-2',
        prompt: 'ℤ (Egész számok)',
        value: 'Negatív és nemnegatív egészek: {..., -2, -1, 0, 1, 2, ...}'
      },
      {
        id: 'sm2-3',
        prompt: 'ℚ (Racionális számok)',
        value: 'Két egész hányadosaként (p/q) felírható számok'
      },
      {
        id: 'sm2-4',
        prompt: 'ℚ* (Irracionális számok)',
        value: 'Nem írhatók fel p/q alakban (végtelen nem szakaszos tizedestörtek)'
      },
      {
        id: 'sm2-5',
        prompt: 'ℝ (Valós számok)',
        value: 'A számegyenes összes pontja (ℚ és ℚ* egyesítése)',
        figure: <NumberSetsVennSvg size={75} />
      },
      {
        id: 'sm2-6',
        prompt: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ',
        value: 'A számhalmazok egymásba ágyazott láncolata'
      },
      {
        id: 'sm2-7',
        prompt: '√16',
        value: 'Pontosan 4, így eleme ℕ-nek, ℤ-nek és ℚ-nak is!'
      },
      {
        id: 'sm2-8',
        prompt: '-3,25',
        value: 'Véges tizedestört (-13/4), így ℚ eleme, de nem ℤ'
      }
    ]
  },
  3: {
    title: '3. Szint: Részhalmazok Száma és Hatványhalmaz',
    subtitle: 'Párosítsd a halmazméreteket a hozzájuk tartozó részhalmazok számával!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: 'n elemű halmaz összes részhalmaza',
        value: '2ⁿ darab részhalmaz',
        figure: <PowerSetTreeSvg size={75} />
      },
      {
        id: 'sm3-2',
        prompt: 'n elemű halmaz valódi részhalmazainak száma',
        value: '2ⁿ - 1 darab (maga a teljes halmaz kiesik)'
      },
      {
        id: 'sm3-3',
        prompt: 'Üres halmaz (0 elemű) részhalmazai',
        value: '2⁰ = 1 darab (egyetlen részhalmaza önmaga: ∅)'
      },
      {
        id: 'sm3-4',
        prompt: '1 elemű halmaz ({a}) összes részhalmaza',
        value: '2¹ = 2 darab: ∅ és {a}'
      },
      {
        id: 'sm3-5',
        prompt: '3 elemű halmaz ({1, 2, 3}) részhalmazai',
        value: '2³ = 8 darab részhalmaz'
      },
      {
        id: 'sm3-6',
        prompt: '4 elemű halmaz ({A, B, C, D}) részhalmazai',
        value: '2⁴ = 16 darab részhalmaz'
      },
      {
        id: 'sm3-7',
        prompt: '∅ ⊆ A tulajdonság minden A-ra',
        value: 'Mindig IGAZ (az üres halmaz minden halmaznak részhalmaza)',
        figure: <EmptySetSvg size={65} />
      },
      {
        id: 'sm3-8',
        prompt: 'A ⊆ A tulajdonság minden A-ra',
        value: 'Mindig IGAZ (minden halmaz önmagának részhalmaza)'
      }
    ]
  }
};

export const SetsMatcher: React.FC<SetsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="teal"
      topicId={topicId || 'g9-komb-halmazok-matcher'}
      topicTitle={topicTitle || '9. Osztály - Halmazok Alapjai Párosító'}
    />
  );
};

export default SetsMatcher;
