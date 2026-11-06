import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogicOperationsMatcherProps {
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
    title: 'Kifejezések és Szimbolikus Formák',
    subtitle: 'Párosítsd a magyar mondatokat a pontos logikai műveleti jellel és jelentéssel!',
    pairs: [
      {
        id: 'lm1-1',
        prompt: '„Hajni jelest kapott matekból VAGY töriből.”',
        value: 'A ∨ B (diszjunkció: legalább az egyik)'
      },
      {
        id: 'lm1-2',
        prompt: '„Hajni jelest kapott matekból ÉS töriből is.”',
        value: 'A ∧ B (konjunkció: mindkettő egyszerre)'
      },
      {
        id: 'lm1-3',
        prompt: '„Ez az állat ragadozó, DE nem védett.”',
        value: 'B ∧ ¬C (a „de” logikailag ÉS művelet!)'
      },
      {
        id: 'lm1-4',
        prompt: '„Ez a szám se nem páros, se nem prím.”',
        value: '¬A ∧ ¬B (mindkét tulajdonság tagadása)'
      },
      {
        id: 'lm1-5',
        prompt: '„Kulcsár Győző 1972-ben VAGY 1976-ban nyert.”',
        value: 'I ∨ H = IGAZ (egyik arany elég volt)'
      },
      {
        id: 'lm1-6',
        prompt: '„Kulcsár Győző mindkét olimpián nyert.”',
        value: 'I ∧ H = HAMIS (nem nyert kétszer aranyat)'
      }
    ]
  },
  2: {
    title: 'Számelméleti Állítások és Logikai Értékeik',
    subtitle: 'Párosítsd az összetett oszthatósági kijelentéseket a pontos logikai értékükkel!',
    pairs: [
      {
        id: 'lm2-1',
        prompt: '„24 osztható 3-mal vagy 4-gyel.”',
        value: 'IGAZ (mindkettővel osztható, I ∨ I = I)'
      },
      {
        id: 'lm2-2',
        prompt: '„36 osztható 6-tal és 8-cal.”',
        value: 'HAMIS (8-cal nem osztható, I ∧ H = H)'
      },
      {
        id: 'lm2-3',
        prompt: '„50 osztható 5-tel és 10-zel.”',
        value: 'IGAZ (mindkettővel osztható, I ∧ I = I)'
      },
      {
        id: 'lm2-4',
        prompt: '„48 osztható 12-vel vagy 15-tel.”',
        value: 'IGAZ (12-vel osztható, I ∨ H = I)'
      },
      {
        id: 'lm2-5',
        prompt: '„35 osztható 2-vel vagy 3-mal.”',
        value: 'HAMIS (egyikkel sem osztható, H ∨ H = H)'
      },
      {
        id: 'lm2-6',
        prompt: '„A 2 páros szám ÉS prímszám.”',
        value: 'IGAZ (mindkét tulajdonság fennáll, I ∧ I = I)'
      }
    ]
  },
  3: {
    title: 'Halmazműveleti Párhuzamok és Igazságértékek',
    subtitle: 'Párosítsd a logikai azonosságokat és a halmazműveleti megfelelőiket!',
    pairs: [
      {
        id: 'lm3-1',
        prompt: 'A ∨ B halmazműveleti megfelelője',
        value: 'A ∪ B (Unió / halmazok egyesítése)'
      },
      {
        id: 'lm3-2',
        prompt: 'A ∧ B halmazműveleti megfelelője',
        value: 'A ∩ B (Metszet / halmazok közös része)'
      },
      {
        id: 'lm3-3',
        prompt: '(IGAZ ∨ HAMIS) ∧ IGAZ',
        value: 'IGAZ (1 ∧ 1 = 1)'
      },
      {
        id: 'lm3-4',
        prompt: '(IGAZ ∧ HAMIS) ∨ HAMIS',
        value: 'HAMIS (0 ∨ 0 = 0)'
      },
      {
        id: 'lm3-5',
        prompt: 'A ∧ ¬A (állítás és tagadásának konjunkciója)',
        value: 'Azonosan HAMIS (ellentmondásmentesség elve)'
      },
      {
        id: 'lm3-6',
        prompt: 'A ∨ ¬A (állítás és tagadásának diszjunkciója)',
        value: 'Azonosan IGAZ (kizárt harmadik elve)'
      }
    ]
  }
};

export const LogicOperationsMatcher: React.FC<LogicOperationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-logic-vagy-es-matcher',
  topicTitle = '3. VAGY művelet, ÉS művelet'
}) => {
  return (
    <MatcherTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={10}
      chapterId="logika"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
    />
  );
};

(LogicOperationsMatcher as any).matcherLevels = matcherLevels;

export default LogicOperationsMatcher;

