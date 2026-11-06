import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrueOrFalseMatcherProps {
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
    title: 'Mondatok Logikai Besorolása',
    subtitle: 'Párosítsd a tankönyvi mondatokat a pontos logikai típusukkal és igazságértékükkel!',
    pairs: [
      {
        id: 'tfm1-1',
        prompt: '„A sósav kémiai képlete HCl.”',
        value: 'Igaz állítás (objektív természettudományos tény)'
      },
      {
        id: 'tfm1-2',
        prompt: '„Svájc fővárosa Zürich.”',
        value: 'Hamis állítás (fővárosa Bern, egyértelműen cáfolható)'
      },
      {
        id: 'tfm1-3',
        prompt: '„Hány óra van most?”',
        value: 'Nem állítás (kérdő mondat)'
      },
      {
        id: 'tfm1-4',
        prompt: '„Budapest szebb város, mint Tokió.”',
        value: 'Nem állítás (szubjektív értékítélet, egyéni ízlés)'
      },
      {
        id: 'tfm1-5',
        prompt: '„Oldd meg a másodfokú egyenletet!”',
        value: 'Nem állítás (felszólító mondat / parancs)'
      },
      {
        id: 'tfm1-6',
        prompt: '„A 17 páratlan prímszám.”',
        value: 'Igaz állítás (matematikai tény)'
      }
    ]
  },
  2: {
    title: 'Állítások és Precíz Tagadásuk',
    subtitle: 'Párosítsd az állításokat a matematikailag pontos negációjukkal (¬A)!',
    pairs: [
      {
        id: 'tfm2-1',
        prompt: '„Legalább 100 barátom van.” (x ≥ 100)',
        value: '„Legfeljebb 99 barátom van.” (x < 100)'
      },
      {
        id: 'tfm2-2',
        prompt: '„Ez a könyv maximum 300 oldalas.” (x ≤ 300)',
        value: '„Ez a könyv több mint 300 oldalas.” (x ≥ 301)'
      },
      {
        id: 'tfm2-3',
        prompt: '„Többen vagyunk az osztályban, mint 32.” (x > 32)',
        value: '„Legfeljebb 32-en vagyunk az osztályban.” (x ≤ 32)'
      },
      {
        id: 'tfm2-4',
        prompt: '„Panniék kutyája fekete.”',
        value: '„Panniék kutyája nem fekete.”'
      },
      {
        id: 'tfm2-5',
        prompt: '„A csapat több mint 8 gólt rúgott.” (g > 8)',
        value: '„A csapat legfeljebb 8 gólt rúgott.” (g ≤ 8)'
      },
      {
        id: 'tfm2-6',
        prompt: '„A ládában minden kocka piros.”',
        value: '„Van a ládában olyan kocka, amely nem piros.”'
      }
    ]
  },
  3: {
    title: 'Logikai Törvények és Alapfogalmak',
    subtitle: 'Párosítsd a logikai tételeket és alapfogalmakat a definíciójukkal!',
    pairs: [
      {
        id: 'tfm3-1',
        prompt: 'A harmadik kizárásának elve',
        value: 'Egy állítás vagy igaz, vagy hamis, harmadik eset nincs'
      },
      {
        id: 'tfm3-2',
        prompt: 'Ellentmondásmentesség elve',
        value: 'Egy állítás nem lehet egyszerre igaz és hamis is'
      },
      {
        id: 'tfm3-3',
        prompt: 'A tagadás (negáció) lényege',
        value: 'Minden esetben ellentétes logikai értéket vesz fel (nem lehetnek egyszerre hamisak sem!)'
      },
      {
        id: 'tfm3-4',
        prompt: 'Ellenpélda szerepe',
        value: 'Egyetlen eset elegendő egy általános („minden”) kijelentés megdöntéséhez'
      },
      {
        id: 'tfm3-5',
        prompt: 'Rejtett általánosítás',
        value: 'Feltétel nélküli állítás esetén a „mindig” / „minden” szót kell odagondolni'
      },
      {
        id: 'tfm3-6',
        prompt: 'Festett kocka csúcskockái (8 db)',
        value: 'Pontosan 3 lapjuk piros'
      }
    ]
  }
};

export const TrueOrFalseMatcher: React.FC<TrueOrFalseMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-logic-igaz-hamis-matcher',
  topicTitle = '1. Igaz vagy hamis?'
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

(TrueOrFalseMatcher as any).matcherLevels = matcherLevels;

export default TrueOrFalseMatcher;
