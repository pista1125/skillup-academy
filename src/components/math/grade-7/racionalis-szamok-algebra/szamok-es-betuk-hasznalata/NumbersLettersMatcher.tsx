import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface NumbersLettersMatcherProps {
  onNextLevel?: () => void;
}

export const NumbersLettersMatcher: React.FC<NumbersLettersMatcherProps> = ({ onNextLevel }) => {
  const level1Pairs: MatchPair[] = [
    { id: 'm1-1', left: 'Egy szám 5-tel nagyobb', right: 'x + 5' },
    { id: 'm1-2', left: 'Egy szám 3-szorosa', right: '3x' },
    { id: 'm1-3', left: 'Egy szám fele', right: 'x / 2' },
    { id: 'm1-4', left: 'Két szám összege', right: 'a + b' },
    { id: 'm1-5', left: 'Két szám különbsége', right: 'a - b' },
    { id: 'm1-6', left: 'Egy szám négyzete', right: 'x²' },
    { id: 'm1-7', left: 'Egy szám ellentettje', right: '-x' },
    { id: 'm1-8', left: 'Egy szám reciproka (x ≠ 0)', right: '1 / x' },
  ];

  const level2Pairs: MatchPair[] = [
    { id: 'm2-1', left: 'Egy szám 2-szeresénél 5-tel több', right: '2x + 5' },
    { id: 'm2-2', left: 'Egy szám 5-tel növelt értékének kétszerese', right: '2 · (x + 5)' },
    { id: 'm2-3', left: 'Egy szám 3-szorosa csökkentve 4-gyel', right: '3x - 4' },
    { id: 'm2-4', left: 'Egy szám 4-gyel csökkentett értékének 3-szorosa', right: '3 · (x - 4)' },
    { id: 'm2-5', left: 'Két szám összegének négyzete', right: '(a + b)²' },
    { id: 'm2-6', left: 'Két szám négyzetének összege', right: 'a² + b²' },
    { id: 'm2-7', left: 'Egy szám harmadánál 2-vel kevesebb', right: 'x/3 - 2' },
    { id: 'm2-8', left: 'Két szám szorzatának kétszerese', right: '2ab' },
  ];

  const level3Pairs: MatchPair[] = [
    { id: 'm3-1', left: 'a oldalú négyzet kerülete', right: 'K = 4a' },
    { id: 'm3-2', left: 'a, b oldalú téglalap kerülete', right: 'K = 2(a + b)' },
    { id: 'm3-3', left: 'a oldalú négyzet területe', right: 'T = a²' },
    { id: 'm3-4', left: 'a, b oldalú téglalap területe', right: 'T = ab' },
    { id: 'm3-5', left: 'A -5x tag együtthatója', right: '-5' },
    { id: 'm3-6', left: 'A -x tag együtthatója', right: '-1' },
    { id: 'm3-7', left: 'Az x tag együtthatója', right: '+1' },
    { id: 'm3-8', left: '4 füzet (db-ja x Ft) és egy 250 Ft-os toll ára', right: '4x + 250' },
  ];

  return (
    <MatcherTemplate
      title="Algebranyelv & Kifejezés Párosító"
      subtitle="Párosítsd össze a szöveges állításokat és fogalmakat a megfelelő algebrai betűs kifejezésekkel!"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
    />
  );
};
