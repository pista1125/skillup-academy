import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeExamMatcherProps {
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
    title: 'Állítások és Precíz Érettségi Tagadásaik',
    subtitle: 'Párosítsd a hivatalos érettségi és tankönyvi állításokat a logikailag pontos tagadásukkal!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: '„Minden atomóra pontos.” tagadása',
        value: '„Van olyan atomóra, amelyik pontatlan.”'
      },
      {
        id: 'pm1-2',
        prompt: '„Minden érettségi feladat egyszerű.” tagadása',
        value: '„Van olyan érettségi feladat, ami nem egyszerű.”'
      },
      {
        id: 'pm1-3',
        prompt: '„Minden háztartásban van televízió.” tagadása',
        value: '„Van olyan háztartás, ahol nincs televízió.”'
      },
      {
        id: 'pm1-4',
        prompt: '„A szalonban van olyan autó, amelyik kék.” tagadása',
        value: '„A szalonban egyik autó sem kék.”'
      },
      {
        id: 'pm1-5',
        prompt: '„Minden madár tud repülni.” tagadása',
        value: '„Van olyan madár, amelyik nem tud repülni.”'
      },
      {
        id: 'pm1-6',
        prompt: '„Van társasjáték, amihez nem kell dobókocka.” tagadása',
        value: '„Minden társasjátékhoz kell dobókocka.”'
      }
    ]
  },
  2: {
    title: 'Logikai Törvények és Azonosságok',
    subtitle: 'Párosítsd az elméleti szimbólumokat a pontos matematikai jelentésükkel!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: '¬(A ∧ B) De Morgan azonosság',
        value: '¬A ∨ ¬B (konjunkció tagadása)'
      },
      {
        id: 'pm2-2',
        prompt: '¬(A ∨ B) De Morgan azonosság',
        value: '¬A ∧ ¬B (diszjunkció tagadása)'
      },
      {
        id: 'pm2-3',
        prompt: 'A ∨ ¬A kifejezés értéke',
        value: 'Tautológia (minden sorban IGAZ)'
      },
      {
        id: 'pm2-4',
        prompt: 'A ∧ ¬A kifejezés értéke',
        value: 'Kontradikció (minden sorban HAMIS)'
      },
      {
        id: 'pm2-5',
        prompt: '¬(A ⇒ B) implikáció tagadása',
        value: 'A ∧ ¬B (a feltétel igaz, de a cél nem)'
      },
      {
        id: 'pm2-6',
        prompt: 'Kontrapozíció törvénye (A ⇒ B)',
        value: '¬B ⇒ ¬A (ekvivalens az eredetivel)'
      }
    ]
  },
  3: {
    title: 'Kompetenciamérési Esettanulmányok',
    subtitle: 'Párosítsd a feladványokat a pontos matematikai levezetésükkel!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'Zedország: 1300 + 3700 = 5000 > 4000 km',
        value: 'Ciraz biztosan nincs az egyenes úton'
      },
      {
        id: 'pm3-2',
        prompt: 'Püthagorasz és Thalész életévei',
        value: '12 év átfedés (Kr. e. 560 és 548 között)'
      },
      {
        id: 'pm3-3',
        prompt: 'Négyzet ABC háromszöge (átló felezte)',
        value: 'P ∧ Q (derékszögű ÉS egyenlő szárú)'
      },
      {
        id: 'pm3-4',
        prompt: 'Négyzet ABF háromszöge (1 : 2 arány)',
        value: 'P ∧ ¬Q (derékszögű, de nem egyenlő szárú)'
      },
      {
        id: 'pm3-5',
        prompt: 'Két különböző valós szám négyzetösszege',
        value: 'Mindig szigorúan pozitív (> 0)'
      },
      {
        id: 'pm3-6',
        prompt: '„Egy szorzat negatív, ha van negatív tényezője”',
        value: 'Hamis (páros sok negatív szorzata pozitív)'
      }
    ]
  }
};

export const PracticeExamMatcher: React.FC<PracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-logic-tudasproba-matcher',
  topicTitle = '6. Gyakorlás, tudáspróba'
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

(PracticeExamMatcher as any).matcherLevels = matcherLevels;

export default PracticeExamMatcher;

