import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TableStructureSvg,
  ContingencyTableSvg,
  FunctionTableSvg
} from './TablesFigures';

interface TablesMatcherProps {
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
    title: '1. Szint: Táblázat Alapfogalmak és Értékek',
    subtitle: 'Párosítsd a táblázat fogalmait és a leolvasott értékeket a jelentésükkel!',
    pairs: [
      {
        id: 'tm1-1',
        prompt: 'Vízszintes adatsor',
        value: 'Sor (rekord)',
        figure: <TableStructureSvg size={70} />
      },
      {
        id: 'tm1-2',
        prompt: 'Függőleges adatsor',
        value: 'Oszlop (változó)'
      },
      {
        id: 'tm1-3',
        prompt: 'Sor és oszlop metszete',
        value: 'Cella (konkrét adat)'
      },
      {
        id: 'tm1-4',
        prompt: 'Fejléc: „Bevétel (ezer Ft)”, cella: 420',
        value: '420 000 Ft'
      },
      {
        id: 'tm1-5',
        prompt: 'Adatok: 14, 18, 22, 26 átlaga',
        value: '20'
      },
      {
        id: 'tm1-6',
        prompt: 'Max: 45, Min: 12 terjedelme',
        value: '33 (terjedelem)'
      }
    ]
  },
  2: {
    title: '2. Szint: Kereszttáblázatok és Százalékos Arányok',
    subtitle: 'Párosítsd a kontingencia-tábla kérdéseit a helyes számértékekkel!',
    pairs: [
      {
        id: 'tm2-1',
        prompt: '30 fiúból 18 focizik',
        value: 'A fiúk 60%-a focizik',
        figure: <ContingencyTableSvg size={70} />
      },
      {
        id: 'tm2-2',
        prompt: '20 lányból 14 úszik',
        value: 'A lányok 70%-a úszik'
      },
      {
        id: 'tm2-3',
        prompt: '24 focistából 18 fiú',
        value: 'A focisták 75%-a fiú'
      },
      {
        id: 'tm2-4',
        prompt: '30 fiú + 20 lány',
        value: 'N = 50 teljes minta'
      },
      {
        id: 'tm2-5',
        prompt: '14 úszó lány 50 főből',
        value: '28% relatív gyakoriság'
      },
      {
        id: 'tm2-6',
        prompt: 'Sorösszeg: 40 és 60, Oszlop 1: 45',
        value: 'Oszlop 2 összege = 55'
      }
    ]
  },
  3: {
    title: '3. Szint: Függvények és Hozzárendelési Táblázatok',
    subtitle: 'Párosítsd az értéktáblázatok számpárjait és szabályait!',
    pairs: [
      {
        id: 'tm3-1',
        prompt: 'f(x) = 2x + 1, ha x = 3',
        value: 'y = 7',
        figure: <FunctionTableSvg size={70} />
      },
      {
        id: 'tm3-2',
        prompt: 'f(x) = 3x - 4, ha x = 5',
        value: 'y = 11'
      },
      {
        id: 'tm3-3',
        prompt: '(-2; 4), (0; 0), (2; 4), (3; 9)',
        value: 'f(x) = x² alapparabola'
      },
      {
        id: 'tm3-4',
        prompt: 'Egyenes arányosság: (3; 12) ➔ x = 7',
        value: 'y = 28 (k = 4)'
      },
      {
        id: 'tm3-5',
        prompt: 'Fordított arányosság: (4; 15) ➔ x = 6',
        value: 'y = 10 (k = 60)'
      },
      {
        id: 'tm3-6',
        prompt: 'Egy x-hez két különböző y tartozik',
        value: 'Nem függvénykapcsolat'
      }
    ]
  }
};

export const TablesMatcher: React.FC<TablesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-func-tablazatok-matcher',
  topicTitle = '1. Táblázatok'
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
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
    />
  );
};

