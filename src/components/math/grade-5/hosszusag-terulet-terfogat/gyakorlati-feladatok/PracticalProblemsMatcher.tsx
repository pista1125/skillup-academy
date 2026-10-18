import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

export interface PracticalProblemsMatcherProps {
  level?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const PRACTICAL_PAIRS_LEVEL_1: MatcherPair[] = [
  { id: 'pp-l1-1', left: 'Kert bekerítése drótfonattal', right: 'Kerület (K) számítása' },
  { id: 'pp-l1-2', left: 'Nappali szoba leparkettázása', right: 'Terület (T) számítása' },
  { id: 'pp-l1-3', left: 'Ajándékdoboz csomagolópapírja', right: 'Felszín (A) számítása' },
  { id: 'pp-l1-4', left: 'Kerti medence vízzel való feltöltése', right: 'Térfogat (V) számítása' },
  { id: 'pp-l1-5', left: 'Fénykép köré fa keretléc készítése', right: 'Kerület (K) számítása' },
  { id: 'pp-l1-6', left: 'Fűmag elvetése a füvesítendő udvaron', right: 'Terület (T) számítása' },
  { id: 'pp-l1-7', left: 'Fa láda külső lefestése zománcfestékkel', right: 'Felszín (A) számítása' },
  { id: 'pp-l1-8', left: 'Tejeskanna befogadóképessége literben', right: 'Térfogat (V) számítása' }
];

const PRACTICAL_PAIRS_LEVEL_2: MatcherPair[] = [
  { id: 'pp-l2-1', left: 'Kert (20 × 15 m), 3 m-es kapuval', right: '67 m kerítésdrót kell (70 - 3)' },
  { id: 'pp-l2-2', left: 'Szoba (4 × 5 m) parkettázása', right: '20 m² laminált padló' },
  { id: 'pp-l2-3', left: 'Kocka doboz (a = 10 cm) csomagolása', right: '600 cm² papír (6 · 100)' },
  { id: 'pp-l2-4', left: 'Akvárium (50 × 30 × 40 cm)', right: '60 liter víz (5 × 3 × 4 dm)' },
  { id: 'pp-l2-5', left: '20 m² fal, festék 10 m²/doboz', right: '2 doboz festék szükséges' },
  { id: 'pp-l2-6', left: 'Szoba (4 × 3 m), 1 m-es ajtóval', right: '13 m szegőléc (14 - 1)' },
  { id: 'pp-l2-7', left: '6 m² fürdőszoba 20×20 cm csempével', right: '150 darab csempe' },
  { id: 'pp-l2-8', left: '10 m³-es medence feltöltése', right: '10 000 liter víz kell bele' }
];

const PRACTICAL_PAIRS_LEVEL_3: MatcherPair[] = [
  { id: 'pp-l3-1', left: 'Szoba (5 × 4 m, m = 3 m) falak + plafon', right: '74 m² festendő felület' },
  { id: 'pp-l3-2', left: 'Nyitott láda (60 × 20 × 20 cm) bélelése', right: '4400 cm² belső fólia (5 lap!)' },
  { id: 'pp-l3-3', left: 'Udvar (15 × 10 m) + 10% ráhagyás', right: '165 m² térkő rendelése' },
  { id: 'pp-l3-4', left: 'Csepegő csap (10 ml/perc) 24 óra alatt', right: '14,4 liter víz vész kárba' },
  { id: 'pp-l3-5', left: '2 literes kancsóba 3 pohár 2,5 dl szörp', right: '1,25 liter marad még üresen' },
  { id: 'pp-l3-6', left: 'Homokozó (3 m × 2 m × 0,5 m)', right: '3 m³ = 3000 liter homok' },
  { id: 'pp-l3-7', left: 'Négyzetes telek (a = 25 m) körbekerítése', right: '100 m drótháló' },
  { id: 'pp-l3-8', left: 'Kocka akvárium (a = 40 cm) félig töltve', right: '32 liter víz (64 : 2)' }
];

export const PracticalProblemsMatcher: React.FC<PracticalProblemsMatcherProps> = ({
  level = 1,
  onNextLevel = () => {},
  onOpenRules = () => {},
  onBack,
  onSwitchToTheory
}) => {
  const getPairs = (lvl: number): MatcherPair[] => {
    switch (lvl) {
      case 1:
        return PRACTICAL_PAIRS_LEVEL_1;
      case 2:
        return PRACTICAL_PAIRS_LEVEL_2;
      case 3:
        return PRACTICAL_PAIRS_LEVEL_3;
      default:
        return PRACTICAL_PAIRS_LEVEL_1;
    }
  };

  const getSubtitle = (lvl: number): string => {
    switch (lvl) {
      case 1:
        return '1. Szint: Milyen geometriai mennyiség kell az adott valós helyzethez?';
      case 2:
        return '2. Szint: Konkrét számítások kerítésre, parkettára, dobozra és akváriumra';
      case 3:
        return '3. Szint: Összetett és több lépéses életszerű számítások és ráhagyások';
      default:
        return '';
    }
  };

  return (
    <MatcherTemplate
      title="Gyakorlati feladatok párosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 9. JÁTÉK"
      level={level}
      pairs={getPairs(level)}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
