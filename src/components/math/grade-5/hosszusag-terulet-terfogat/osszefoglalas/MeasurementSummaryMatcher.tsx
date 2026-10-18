import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

export interface MeasurementSummaryMatcherProps {
  level?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const SUMMARY_PAIRS_LEVEL_1: MatcherPair[] = [
  { id: 'sum-l1-1', left: 'Téglalap kerülete (K)', right: 'K = 2 · (a + b)' },
  { id: 'sum-l1-2', left: 'Négyzet területe (T)', right: 'T = a · a = a²' },
  { id: 'sum-l1-3', left: 'Kocka felszíne (A)', right: 'A = 6 · a²' },
  { id: 'sum-l1-4', left: 'Téglatest térfogata (V)', right: 'V = a · b · c' },
  { id: 'sum-l1-5', left: '1 dm³ víz űrmértéke', right: '1 liter' },
  { id: 'sum-l1-6', left: '1 m² négyzetdeciméterben', right: '100 dm²' },
  { id: 'sum-l1-7', left: '1 hektár (ha) négyzetméterben', right: '10 000 m² = 100 a' },
  { id: 'sum-l1-8', left: '1 m³ köbméter literben', right: '1000 liter = 10 hl' }
];

const SUMMARY_PAIRS_LEVEL_2: MatcherPair[] = [
  { id: 'sum-l2-1', left: 'Téglalap (a = 6 cm, b = 4 cm)', right: 'K = 20 cm és T = 24 cm²' },
  { id: 'sum-l2-2', left: 'Kocka (a = 3 cm) felszíne', right: 'A = 54 cm² (6 · 9)' },
  { id: 'sum-l2-3', left: 'Kocka (a = 4 dm) térfogata', right: 'V = 64 dm³ = 64 liter' },
  { id: 'sum-l2-4', left: 'Téglatest (2 × 3 × 5 cm)', right: 'V = 30 cm³' },
  { id: 'sum-l2-5', left: '3500 ml űrtartalom', right: '3,5 liter = 35 dl' },
  { id: 'sum-l2-6', left: '250 ár mezőgazdasági terület', right: '2,5 hektár (ha)' },
  { id: 'sum-l2-7', left: 'Kocka (a = 5 cm) 12 élének összege', right: '60 cm (12 · 5)' },
  { id: 'sum-l2-8', left: 'Téglalap (K = 26 cm, a = 8 cm)', right: 'Szélesség b = 5 cm (13 - 8)' }
];

const SUMMARY_PAIRS_LEVEL_3: MatcherPair[] = [
  { id: 'sum-l3-1', left: 'Téglalap: T = 36 cm², b = 4 cm', right: 'Oldalhossz a = 9 cm (36 : 4)' },
  { id: 'sum-l3-2', left: 'Kocka: V = 125 cm³', right: 'Felszíne A = 150 cm² (a = 5 cm)' },
  { id: 'sum-l3-3', left: 'Téglatest: V = 120 dm³, T_alap = 30 dm²', right: 'Magasság m = 4 dm (120 : 30)' },
  { id: 'sum-l3-4', left: 'Kocka élét megkétszerezzük', right: 'Térfogata 8-szorosára nő (2³)' },
  { id: 'sum-l3-5', left: 'Kocka élét megháromszorozzuk', right: 'Felszíne 9-szeresére nő (3²)' },
  { id: 'sum-l3-6', left: '0,8 m³ esővíz deciliterben', right: '8000 dl (800 liter)' },
  { id: 'sum-l3-7', left: 'Kert (25 × 20 m), 4 m-es kapuval', right: '86 m kerítésdrót kell (90 - 4)' },
  { id: 'sum-l3-8', left: 'Nyitott fa láda (40 × 30 × 20 cm)', right: 'Felszín: 1 alap + 4 fal = 4000 cm²' }
];

export const MeasurementSummaryMatcher: React.FC<MeasurementSummaryMatcherProps> = ({
  level = 1,
  onNextLevel = () => {},
  onOpenRules = () => {},
  onBack,
  onSwitchToTheory
}) => {
  const getPairs = (lvl: number): MatcherPair[] => {
    switch (lvl) {
      case 1:
        return SUMMARY_PAIRS_LEVEL_1;
      case 2:
        return SUMMARY_PAIRS_LEVEL_2;
      case 3:
        return SUMMARY_PAIRS_LEVEL_3;
      default:
        return SUMMARY_PAIRS_LEVEL_1;
    }
  };

  const getSubtitle = (lvl: number): string => {
    switch (lvl) {
      case 1:
        return '1. Szint: Alapfogalmak, fejezeti képletek és átváltási kapcsok';
      case 2:
        return '2. Szint: Konkrét számítások kerületre, területre, felszínre és térfogatra';
      case 3:
        return '3. Szint: Visszaszámolások, élhossz-változások és összetett gyakorlati feladatok';
      default:
        return '';
    }
  };

  return (
    <MatcherTemplate
      title="Összefoglaló mértékegység párosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 10. JÁTÉK"
      level={level}
      pairs={getPairs(level)}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
