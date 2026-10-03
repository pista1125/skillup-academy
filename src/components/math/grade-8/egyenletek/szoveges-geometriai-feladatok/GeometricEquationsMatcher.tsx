import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricEquationsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Geometriai Alapképletek és Szabályok',
    subtitle: 'Párosítsd a geometriai fogalmakat a helyes képlettel vagy összefüggéssel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Háromszög belső szögeinek összege',
        value: 'α + β + γ = 180°'
      },
      {
        id: 'p2',
        prompt: 'Téglalap kerülete',
        value: 'K = 2(a + b)'
      },
      {
        id: 'p3',
        prompt: 'Téglalap területe',
        value: 'T = a · b'
      },
      {
        id: 'p4',
        prompt: 'Konvex n-szög belső szögeinek összege',
        value: 'Sₙ = (n - 2) · 180°'
      },
      {
        id: 'p5',
        prompt: 'Trapéz területe',
        value: 'T = ((a + c) · m) / 2'
      },
      {
        id: 'p6',
        prompt: 'Derékszögű háromszög hegyesszögei',
        value: 'α + β = 90° (pótszögek)'
      },
      {
        id: 'p7',
        prompt: 'Pitagorasz-tétel derékszögű háromszögben',
        value: 'a² + b² = c²'
      },
      {
        id: 'p8',
        prompt: 'Konvex n-szög összes átlóinak száma',
        value: 'Á = (n · (n - 3)) / 2'
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Feladatok és Egyenleteik',
    subtitle: 'Keresd meg a geometriai szöveges feladathoz tartozó helyes egyenletet!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Háromszög szögeinek aránya 2 : 3 : 4',
        value: '2x + 3x + 4x = 180°'
      },
      {
        id: 'p10',
        prompt: 'Téglalap kerülete 48 cm, egyik oldala 6 cm-rel hosszabb',
        value: '2 · (x + x + 6) = 48'
      },
      {
        id: 'p11',
        prompt: 'Egyenlő szárú háromszög kerülete 34 cm, szára 5 cm-rel hosszabb az alapjánál',
        value: 'x + 2(x + 5) = 34'
      },
      {
        id: 'p12',
        prompt: 'Négyzet oldalát 3 cm-rel növelve a területe 39 cm²-rel nő',
        value: '(x + 3)² - x² = 39'
      },
      {
        id: 'p13',
        prompt: 'Trapéz területe 60 cm², magassága 6 cm, egyik alapja kétszer akkora, mint a másik',
        value: '((x + 2x) · 6) / 2 = 60'
      },
      {
        id: 'p14',
        prompt: 'Derékszögű háromszög egyik hegyesszöge 24°-kal nagyobb a másiknál',
        value: 'x + (x + 24°) = 90°'
      },
      {
        id: 'p15',
        prompt: 'Egy sokszög belső szögeinek összege 1440°',
        value: '(n - 2) · 180° = 1440°'
      },
      {
        id: 'p16',
        prompt: 'Téglalap oldalai x és x + 4, mindkettőt 2 cm-rel növelve a terület 36 cm²-rel nő',
        value: '(x + 2)(x + 6) - x(x + 4) = 36'
      }
    ]
  },
  3: {
    title: '3. Szint: Kiszámolt Eredmények és Válaszok',
    subtitle: 'Párosítsd a geometriai egyenletet a helyes végeredménnyel!',
    pairs: [
      {
        id: 'p17',
        prompt: '2x + 3x + 4x = 180° legnagyobb szöge (4x)',
        value: '80° (mivel x = 20°)'
      },
      {
        id: 'p18',
        prompt: '2(2x + 6) = 48 rövidebbik oldala (x)',
        value: '9 cm (oldalak: 9 és 15 cm)'
      },
      {
        id: 'p19',
        prompt: 'x + 2(x + 5) = 34 alapján a szárak hossza (x + 5)',
        value: '13 cm (alap x = 8 cm)'
      },
      {
        id: 'p20',
        prompt: '(x + 3)² - x² = 39 eredeti négyzet oldala',
        value: 'x = 5 cm (5² = 25, 8² = 64)'
      },
      {
        id: 'p21',
        prompt: '(n - 2) · 180° = 1440° oldalszáma (n)',
        value: 'n = 10 (tízszög)'
      },
      {
        id: 'p22',
        prompt: 'x + (x + 24°) = 90° kisebbik hegyesszöge',
        value: 'x = 33° (másik szög 57°)'
      },
      {
        id: 'p23',
        prompt: 'Derékszögű háromszög befogói 6 és x, átfogója x + 2',
        value: 'x = 8 cm (oldalak: 6, 8, 10 cm)'
      },
      {
        id: 'p24',
        prompt: 'Szabályos hatszög (n = 6) egy belső szöge',
        value: '120° (720° / 6)'
      }
    ]
  }
};

export const GeometricEquationsMatcher: React.FC<GeometricEquationsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-geometry',
  topicTitle = 'Szöveges geometriai feladatok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="Párosító Játék"
      badgeColor="emerald"
    />
  );
};
