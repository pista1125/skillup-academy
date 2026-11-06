import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ImplicationMatcherProps {
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
    title: 'Állítások és Pontos Megfordításaik',
    subtitle: 'Párosítsd a hivatalos tankönyvi kijelentéseket a helyes logikai megfordításukkal!',
    pairs: [
      {
        id: 'im1-1',
        prompt: '„Ha egy szám osztható 6-tal, akkor 3-mal is.”',
        value: '„Ha egy szám osztható 3-mal, akkor 6-tal is.”'
      },
      {
        id: 'im1-2',
        prompt: '„Ha egy négyszög paralelogramma, akkor trapéz.”',
        value: '„Ha egy négyszög trapéz, akkor paralelogramma.”'
      },
      {
        id: 'im1-3',
        prompt: '„Ha holnap kedd van, akkor tegnap vasárnap volt.”',
        value: '„Ha tegnap vasárnap volt, akkor holnap kedd van.”'
      },
      {
        id: 'im1-4',
        prompt: '„Ha egy állat bogár, akkor rovar is.”',
        value: '„Ha egy állat rovar, akkor bogár is.”'
      },
      {
        id: 'im1-5',
        prompt: '„Ha egy háromszög szabályos, akkor egyenlő szárú.”',
        value: '„Ha egy háromszög egyenlő szárú, akkor szabályos.”'
      },
      {
        id: 'im1-6',
        prompt: '„Ha Pisti áthajtott a piroson, szabálysértést követett el.”',
        value: '„Ha Pisti szabálysértést követett el, áthajtott a piroson.”'
      }
    ]
  },
  2: {
    title: 'Szükséges és Elégséges Feltételek',
    subtitle: 'Párosítsd a logikai összefüggéseket a feltételek pontos matematikai szerepével!',
    pairs: [
      {
        id: 'im2-1',
        prompt: '„Egy négyszög négyzet” feltétele a téglalapnak',
        value: 'Bőven elégséges feltétel (minden négyzet téglalap)'
      },
      {
        id: 'im2-2',
        prompt: '„Egy négyszög téglalap” feltétele a négyzetnek',
        value: 'Elengedhetetlenül szükséges feltétel (nem elégséges)'
      },
      {
        id: 'im2-3',
        prompt: 'Szorzat 0: (x + 3)(5 - x) = 0',
        value: 'Szükséges és elégséges, hogy x+3=0 VAGY 5-x=0'
      },
      {
        id: 'im2-4',
        prompt: 'Négyzetösszeg 0: (x + 3)² + (5 - y)² = 0',
        value: 'Szükséges és elégséges, hogy mindkét tag 0 legyen (ÉS)'
      },
      {
        id: 'im2-5',
        prompt: '„Osztható 8-cal” feltétele a 24-gyel való oszthatóságnak',
        value: 'Csak szükséges feltétel (nem elégséges, pl. 16)'
      },
      {
        id: 'im2-6',
        prompt: '„Osztható 24-gyel” feltétele a 8-cal való oszthatóságnak',
        value: 'Bőven elégséges feltétel (24 = 3 · 8)'
      }
    ]
  },
  3: {
    title: 'Hamis Következtetések és Ellenpéldáik',
    subtitle: 'Párosítsd a hamis feltételes állításokat a pontos matematikai ellenpéldájukkal!',
    pairs: [
      {
        id: 'im3-1',
        prompt: '„Ha egy szám osztható 3-mal, akkor 6-tal is.”',
        value: 'Ellenpélda: a 9 (páratlan többszörös)'
      },
      {
        id: 'im3-2',
        prompt: '„Ha egy szám prímszám, akkor páratlan.”',
        value: 'Ellenpélda: a 2 (az egyetlen páros prím)'
      },
      {
        id: 'im3-3',
        prompt: '„Ha egy szám négyzete kisebb nála, a szám negatív.”',
        value: 'Ellenpélda: a 0,5 (0,25 < 0,5, de pozitív)'
      },
      {
        id: 'im3-4',
        prompt: '„Ha egy négyszög trapéz, akkor paralelogramma.”',
        value: 'Ellenpélda: a húrtrapéz (csak 1 párhuzamos pár)'
      },
      {
        id: 'im3-5',
        prompt: '„Ha egy tört pozitív, számlálója és nevezője is pozitív.”',
        value: 'Ellenpélda: (-2)/(-3) (mindkettő negatív)'
      },
      {
        id: 'im3-6',
        prompt: '„Ha |x| > 1, akkor x > 1.”',
        value: 'Ellenpélda: a -5 (|-5| = 5 > 1, de -5 < 1)'
      }
    ]
  }
};

export const ImplicationMatcher: React.FC<ImplicationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-logic-allitas-megforditas-matcher',
  topicTitle = '5. Állítás és megfordítása'
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

(ImplicationMatcher as any).matcherLevels = matcherLevels;

export default ImplicationMatcher;

