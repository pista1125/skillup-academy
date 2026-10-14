import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MappingRepresentationsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: A Megadási Módok Fogalmai',
    subtitle: 'Párosítsd a reprezentációs formákat és fogalmakat a pontos leírásukkal!',
    pairs: [
      {
        id: 'mr1_1',
        prompt: 'Szöveges utasítás',
        value: 'A hozzárendelés szabályának természetes nyelven történő megfogalmazása',
        promptFigure: (
          <span className="text-xs font-bold text-indigo-700">„Szöveg”</span>
        )
      },
      {
        id: 'mr1_2',
        prompt: 'Képlet (Algebrai formula)',
        value: 'Tömör matematikai egyenlőség: f(x) = ax + b vagy y = ax + b',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-blue-700">y = f(x)</span>
        )
      },
      {
        id: 'mr1_3',
        prompt: 'Értéktáblázat',
        value: 'Összetartozó x bemeneti és y kimeneti értékpárok táblázatba foglalása',
        promptFigure: (
          <span className="text-xs font-bold text-teal-700">Táblázat</span>
        )
      },
      {
        id: 'mr1_4',
        prompt: 'Rendezett számpár: (x; y)',
        value: 'A bemenet és kimenet felírása pontként: első az x, második az y érték',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-purple-700">(x; y)</span>
        )
      },
      {
        id: 'mr1_5',
        prompt: 'Független változó (x)',
        value: 'A kiindulási alaphalmaz tetszőlegesen választható eleme (vízszintes tengely)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-slate-700">x tengely</span>
        )
      },
      {
        id: 'mr1_6',
        prompt: 'Függő változó (y)',
        value: 'A szabály alapján kiszámított kimeneti érték (függőleges tengely)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-slate-700">y tengely</span>
        )
      },
      {
        id: 'mr1_7',
        prompt: 'Origó pontja',
        value: 'A koordináta-tengelyek metszéspontja: (0; 0)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-amber-700">O(0; 0)</span>
        )
      },
      {
        id: 'mr1_8',
        prompt: 'Grafikon',
        value: 'A hozzárendelés pontjainak szemléltetése derékszögű koordináta-rendszerben',
        promptFigure: (
          <span className="text-xs font-bold text-rose-700">Grafikon</span>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Szabály ➔ Képlet',
    subtitle: 'Párosítsd a szöveges megfogalmazást a neki megfelelő algebrai képlettel!',
    pairs: [
      {
        id: 'mr2_1',
        prompt: 'A szám kétszeresénél 3-mal több',
        value: 'f(x) = 2x + 3',
        promptFigure: (
          <span className="text-xs font-semibold text-indigo-700">2·x + 3</span>
        )
      },
      {
        id: 'mr2_2',
        prompt: 'A szám háromszorosából vonjunk ki 1-et',
        value: 'f(x) = 3x - 1',
        promptFigure: (
          <span className="text-xs font-semibold text-blue-700">3·x - 1</span>
        )
      },
      {
        id: 'mr2_3',
        prompt: 'A szám négyzeténél 2-vel nagyobb',
        value: 'f(x) = x² + 2',
        promptFigure: (
          <span className="text-xs font-semibold text-purple-700">x² + 2</span>
        )
      },
      {
        id: 'mr2_4',
        prompt: '10-ből vonjuk ki a számot',
        value: 'f(x) = 10 - x',
        promptFigure: (
          <span className="text-xs font-semibold text-teal-700">10 - x</span>
        )
      },
      {
        id: 'mr2_5',
        prompt: 'A szám fele, megnövelve 5-tel',
        value: 'f(x) = x/2 + 5',
        promptFigure: (
          <span className="text-xs font-semibold text-amber-700">x/2 + 5</span>
        )
      },
      {
        id: 'mr2_6',
        prompt: 'A szám ellentettjéhez adjunk 4-et',
        value: 'f(x) = -x + 4',
        promptFigure: (
          <span className="text-xs font-semibold text-rose-700">-x + 4</span>
        )
      },
      {
        id: 'mr2_7',
        prompt: 'Minden számhoz a négyszeresét rendeljük',
        value: 'f(x) = 4x',
        promptFigure: (
          <span className="text-xs font-semibold text-emerald-700">4·x</span>
        )
      },
      {
        id: 'mr2_8',
        prompt: 'Minden számhoz a konstans 7-et rendeljük',
        value: 'f(x) = 7',
        promptFigure: (
          <span className="text-xs font-semibold text-orange-700">y = 7</span>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Képlet ➔ Számpárok és Pontok',
    subtitle: 'Párosítsd a hozzárendelés képletét a helyes pontpárok halmazával!',
    pairs: [
      {
        id: 'mr3_1',
        prompt: 'f(x) = 2x - 1',
        value: '(0; -1), (1; 1), (3; 5)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-indigo-700">2x - 1</span>
        )
      },
      {
        id: 'mr3_2',
        prompt: 'f(x) = x²',
        value: '(-2; 4), (0; 0), (2; 4)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-blue-700">x²</span>
        )
      },
      {
        id: 'mr3_3',
        prompt: 'f(x) = 5 - x',
        value: '(-1; 6), (2; 3), (5; 0)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-teal-700">5 - x</span>
        )
      },
      {
        id: 'mr3_4',
        prompt: 'f(x) = x / 3',
        value: '(-6; -2), (3; 1), (9; 3)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-purple-700">x / 3</span>
        )
      },
      {
        id: 'mr3_5',
        prompt: 'f(x) = 3x + 2',
        value: '(-1; -1), (0; 2), (2; 8)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-amber-700">3x + 2</span>
        )
      },
      {
        id: 'mr3_6',
        prompt: 'f(x) = |x| - 1',
        value: '(-3; 2), (0; -1), (3; 2)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-rose-700">|x| - 1</span>
        )
      },
      {
        id: 'mr3_7',
        prompt: 'f(x) = -2x',
        value: '(-2; 4), (0; 0), (3; -6)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-emerald-700">-2x</span>
        )
      },
      {
        id: 'mr3_8',
        prompt: 'f(x) = x + 4',
        value: '(-4; 0), (0; 4), (3; 7)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-cyan-700">x + 4</span>
        )
      }
    ]
  }
};

export const MappingRepresentationsMatcher: React.FC<MappingRepresentationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g7-stats-rep',
  topicTitle = '2. A hozzárendelések megadási módjai'
}) => {
  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={currentLevel || level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
    />
  );
};

export default MappingRepresentationsMatcher;
