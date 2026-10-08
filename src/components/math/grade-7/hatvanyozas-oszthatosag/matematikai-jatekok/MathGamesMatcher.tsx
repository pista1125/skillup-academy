import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MathGamesMatcherProps {
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
    title: '1. Szint: Számversenyek és Nyerő Játékos',
    subtitle: 'Párosítsd a játékparamétereket a biztos győztes személyével és indoklással!',
    pairs: [
      {
        id: 'p1-1',
        prompt: 'Cél: 21, lépés: 1–3 (ciklus: 4)',
        value: 'Kezdő nyer 1-gyel (1, 5, 9, 13, 17, 21)'
      },
      {
        id: 'p1-2',
        prompt: 'Cél: 20, lépés: 1–3 (ciklus: 4)',
        value: 'Második játékos nyer (20 osztható 4-gyel)'
      },
      {
        id: 'p1-3',
        prompt: 'Cél: 100, lépés: 1–3 (ciklus: 4)',
        value: 'Második játékos nyer (100 osztható 4-gyel)'
      },
      {
        id: 'p1-4',
        prompt: 'Cél: 30, lépés: 1–4 (ciklus: 5)',
        value: 'Második játékos nyer (30 osztható 5-tel)'
      },
      {
        id: 'p1-5',
        prompt: 'Cél: 31, lépés: 1–4 (ciklus: 5)',
        value: 'Kezdő nyer 1-gyel (31 mod 5 = 1)'
      },
      {
        id: 'p1-6',
        prompt: 'Cél: 15, lépés: 1–2 (ciklus: 3)',
        value: 'Második játékos nyer (15 osztható 3-mal)'
      },
      {
        id: 'p1-7',
        prompt: 'Cél: 16, lépés: 1–2 (ciklus: 3)',
        value: 'Kezdő nyer 1-gyel (16 mod 3 = 1)'
      },
      {
        id: 'p1-8',
        prompt: 'Cél: 25, lépés: 1–3 (ciklus: 4)',
        value: 'Kezdő nyer 1-gyel (25 mod 4 = 1)'
      }
    ]
  },
  2: {
    title: '2. Szint: Pillanatnyi Állás és Nyerő Lépés',
    subtitle: 'Párosítsd az aktuális állást a győzelemhez vezető pontos lépéssel (cél: 21, lépés: 1–3)!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Állás: 18 (cél: 21)',
        value: 'Nyerő lépés: +3 (eléri a 21-et)'
      },
      {
        id: 'p2-2',
        prompt: 'Állás: 19 (cél: 21)',
        value: 'Nyerő lépés: +2 (eléri a 21-et)'
      },
      {
        id: 'p2-3',
        prompt: 'Állás: 20 (cél: 21)',
        value: 'Nyerő lépés: +1 (eléri a 21-et)'
      },
      {
        id: 'p2-4',
        prompt: 'Állás: 15 (cél: 21)',
        value: 'Nyerő lépés: +2 (eléri a 17-et)'
      },
      {
        id: 'p2-5',
        prompt: 'Állás: 16 (cél: 21)',
        value: 'Nyerő lépés: +1 (eléri a 17-et)'
      },
      {
        id: 'p2-6',
        prompt: 'Állás: 11 (cél: 21)',
        value: 'Nyerő lépés: +2 (eléri a 13-at)'
      },
      {
        id: 'p2-7',
        prompt: 'Állás: 12 (cél: 21)',
        value: 'Nyerő lépés: +1 (eléri a 13-at)'
      },
      {
        id: 'p2-8',
        prompt: 'Állás: 7 (cél: 21)',
        value: 'Nyerő lépés: +2 (eléri a 9-et)'
      }
    ]
  },
  3: {
    title: '3. Szint: Stratégiai Elvek és Játéktípusok',
    subtitle: 'Párosítsd a matematikai játéktípust a hozzá tartozó nyerő elvvel!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'Kerek asztalra érmék rakása',
        value: 'Szimmetria: kezdő a középpontba lép'
      },
      {
        id: 'p3-2',
        prompt: 'Visszafelé gondolkodás',
        value: 'Célból indulva visszakövetjük a kulcsmezőket'
      },
      {
        id: 'p3-3',
        prompt: 'Kiegészítő stratégia (1–k lépés)',
        value: 'A két lépés összege mindig (k + 1)'
      },
      {
        id: 'p3-4',
        prompt: 'Osztókivonós játék',
        value: 'Paritás: az ellenfélnek mindig páratlant adunk'
      },
      {
        id: 'p3-5',
        prompt: 'Számjegy-kitöltő (9-es szabály)',
        value: 'Számjegyösszeg kiegészítése 9 többszörösére'
      },
      {
        id: 'p3-6',
        prompt: 'Nim-játék (kavicselvételek)',
        value: 'Utolsó kavics elvevője nyer (invariáns keresés)'
      },
      {
        id: 'p3-7',
        prompt: 'Vesztő pozíció fogalma',
        value: 'Bármit lépünk, ellenfél nyerő helyzetbe kerül'
      },
      {
        id: 'p3-8',
        prompt: 'Nyerő pozíció fogalma',
        value: 'Létezik lépés, ami vesztő helyzetbe küldi ellenfelet'
      }
    ]
  }
};

export const MathGamesMatcher: React.FC<MathGamesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-games',
  topicTitle = '10. Matematikai játékok'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      levels={matcherLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="rose"
    />
  );
};

export default MathGamesMatcher;
