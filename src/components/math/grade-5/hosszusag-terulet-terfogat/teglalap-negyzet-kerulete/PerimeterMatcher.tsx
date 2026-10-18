import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

export interface PerimeterMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_PAIRS: MatchPair[] = [
  // =========================================================================
  // 1. SZINT: ALAP KÉPLETEK ÉS KÖZVETLEN SZÁMÍTÁSOK (1-8)
  // =========================================================================
  {
    id: 'pm-1-1',
    level: 1,
    left: 'Négyzet kerülete (képlet)',
    right: 'K = 4 · a'
  },
  {
    id: 'pm-1-2',
    level: 1,
    left: 'Téglalap kerülete (képlet)',
    right: 'K = 2 · (a + b)'
  },
  {
    id: 'pm-1-3',
    level: 1,
    left: 'Négyzet: a = 5 cm',
    right: 'K = 20 cm'
  },
  {
    id: 'pm-1-4',
    level: 1,
    left: 'Téglalap: a = 4 cm, b = 6 cm',
    right: 'K = 20 cm'
  },
  {
    id: 'pm-1-5',
    level: 1,
    left: 'Négyzet: a = 8 m',
    right: 'K = 32 m'
  },
  {
    id: 'pm-1-6',
    level: 1,
    left: 'Téglalap: a = 3 dm, b = 7 dm',
    right: 'K = 20 dm'
  },
  {
    id: 'pm-1-7',
    level: 1,
    left: 'Négyzet: a = 10 mm',
    right: 'K = 40 mm'
  },
  {
    id: 'pm-1-8',
    level: 1,
    left: 'Téglalap félkerülete (a + b)',
    right: 'K : 2'
  },

  // =========================================================================
  // 2. SZINT: VISSZAFELÉ SZÁMOLÁS ÉS MÉRTÉKEGYSÉG-EGYEZTETÉS (9-16)
  // =========================================================================
  {
    id: 'pm-2-1',
    level: 2,
    left: 'Négyzet: K = 28 cm',
    right: 'Oldal: a = 7 cm'
  },
  {
    id: 'pm-2-2',
    level: 2,
    left: 'Négyzet: K = 1 m',
    right: 'Oldal: a = 25 cm'
  },
  {
    id: 'pm-2-3',
    level: 2,
    left: 'Téglalap: a = 2 dm, b = 15 cm',
    right: 'K = 70 cm'
  },
  {
    id: 'pm-2-4',
    level: 2,
    left: 'Téglalap: K = 30 cm, a = 10 cm',
    right: 'Másik oldal: b = 5 cm'
  },
  {
    id: 'pm-2-5',
    level: 2,
    left: 'Téglalap: a = 50 mm, b = 3 cm',
    right: 'K = 16 cm'
  },
  {
    id: 'pm-2-6',
    level: 2,
    left: 'Négyzet: K = 36 dm',
    right: 'Oldal: a = 9 dm'
  },
  {
    id: 'pm-2-7',
    level: 2,
    left: 'Téglalap: a = 12 m, b = 8 m',
    right: 'K = 40 m'
  },
  {
    id: 'pm-2-8',
    level: 2,
    left: 'Téglalap: K = 50 m, b = 15 m',
    right: 'Másik oldal: a = 10 m'
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT FELADATOK ÉS ÉLETSZERŰ HELYZETEK (17-24)
  // =========================================================================
  {
    id: 'pm-3-1',
    level: 3,
    left: '2 db 5 cm-es négyzet összetolva téglalappá',
    right: 'K = 30 cm (10 × 5 cm)'
  },
  {
    id: 'pm-3-2',
    level: 3,
    left: 'Téglalap: b = 4 cm, a = 3 · b (12 cm)',
    right: 'K = 32 cm'
  },
  {
    id: 'pm-3-3',
    level: 3,
    left: 'Kert: 20 m × 15 m, 3 m kapu kihagyva',
    right: 'Szükséges kerítés: 67 m'
  },
  {
    id: 'pm-3-4',
    level: 3,
    left: 'Szoba: 4 m × 5 m, 1 m ajtó kihagyva',
    right: 'Szegélyléc: 17 m'
  },
  {
    id: 'pm-3-5',
    level: 3,
    left: '4 db 3 cm-es négyzetből 6 cm-es nagy négyzet',
    right: 'K = 24 cm'
  },
  {
    id: 'pm-3-6',
    level: 3,
    left: 'Téglalap: K = 48 cm, a = 2 · b',
    right: 'Oldalak: a = 16 cm, b = 8 cm'
  },
  {
    id: 'pm-3-7',
    level: 3,
    left: 'Futópálya: 100 m × 50 m-es pálya 2 köre',
    right: 'Összes futás: 600 m'
  },
  {
    id: 'pm-3-8',
    level: 3,
    left: '36 cm-es drótból 10 cm hosszú téglalap',
    right: 'Téglalap szélessége: 8 cm'
  }
];

export const PerimeterMatcher: React.FC<PerimeterMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <MatcherTemplate
      pairs={MATCHER_PAIRS}
      title="Téglalap, négyzet kerülete – Párosító"
      subtitle="5. osztály • IV. Hosszúság, terület, térfogat"
      topicBadge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 2. TÉMA"
      topicId="g5-meas-perimeter-quiz"
      level={level}
      onNextLevel={onNextLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

export default PerimeterMatcher;
