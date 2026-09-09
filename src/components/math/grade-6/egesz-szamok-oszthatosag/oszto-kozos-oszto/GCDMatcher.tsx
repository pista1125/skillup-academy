import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface GCDMatcherProps {
  onBack: () => void;
}

const MATCHER_LEVELS: MatcherLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: Alapvető LNKO számpárok',
    pairs: [
      { id: 'e1', prompt: '(12, 18) Legnagyobb Közös Osztója', value: '6' },
      { id: 'e2', prompt: '(8, 12) Legnagyobb Közös Osztója', value: '4' },
      { id: 'e3', prompt: '(15, 25) Legnagyobb Közös Osztója', value: '5' },
      { id: 'e4', prompt: '(7, 14) Legnagyobb Közös Osztója', value: '7 (egyik osztója a másiknak)' },
      { id: 'e5', prompt: '(8, 9) Legnagyobb Közös Osztója', value: '1 (relatív prímek)' },
      { id: 'e6', prompt: '(10, 20) Legnagyobb Közös Osztója', value: '10' },
      { id: 'e7', prompt: '(14, 21) Legnagyobb Közös Osztója', value: '7' },
      { id: 'e8', prompt: '(16, 24) Legnagyobb Közös Osztója', value: '8' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: Kétjegyű és 3 tagú LNKO feladatok',
    pairs: [
      { id: 'm1', prompt: '(24, 36) Legnagyobb Közös Osztója', value: '12' },
      { id: 'm2', prompt: '(48, 72) Legnagyobb Közös Osztója', value: '24' },
      { id: 'm3', prompt: '(30, 45) Legnagyobb Közös Osztója', value: '15' },
      { id: 'm4', prompt: '(28, 70) Legnagyobb Közös Osztója', value: '14' },
      { id: 'm5', prompt: '(36, 60) Legnagyobb Közös Osztója', value: '12' },
      { id: 'm6', prompt: '(12, 18, 24) három szám LNKO-ja', value: '6' },
      { id: 'm7', prompt: '(16, 32, 48) három szám LNKO-ja', value: '16' },
      { id: 'm8', prompt: '(40, 56) Legnagyobb Közös Osztója', value: '8' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Prímfelbontások és szöveges modellek',
    pairs: [
      { id: 'h1', prompt: '(2³ · 3² · 5, 2² · 3³ · 7) LNKO kanonikus alakban', value: '2² · 3² = 4 · 9 = 36' },
      { id: 'h2', prompt: '48 csoki és 72 cukorka: maximális egyforma csomagok száma', value: '24 csomag ((48, 72) = 24)' },
      { id: 'h3', prompt: '24/36 tört egyszerűsítése a legegyszerűbb alakra', value: '2/3 (osztás 12-vel)' },
      { id: 'h4', prompt: 'Ha [a, b] = 120 és a · b = 720, akkor (a, b) = ?', value: '6 (720 : 120 = 6)' },
      { id: 'h5', prompt: 'Euklideszi algoritmus: 84 és 36 LNKO-ja', value: '12 (84 = 2·36 + 12, 36 = 3·12 + 0)' },
      { id: 'h6', prompt: '(15, 28) legnagyobb közös osztója', value: '1 (relatív prímek: 3·5 és 2²·7)' },
      { id: 'h7', prompt: 'Téglalap mérete 60 × 84 cm: legnagyobb lehetséges négyzetes csempe oldala', value: '12 cm ((60, 84) = 12)' },
      { id: 'h8', prompt: '(24, 35, 77) három szám LNKO-ja', value: '1 (nincs mindháromban közös prím)' },
    ],
  },
];

export function GCDMatcher({ onBack }: GCDMatcherProps) {
  return (
    <MatcherTemplate
      title="LNKO Kártyapárosító"
      description="Párosítsd össze a számpárokat, prímfelbontásokat és a legnagyobb közös osztókat!"
      levels={MATCHER_LEVELS}
      themeColor="indigo"
      onBack={onBack}
    />
  );
}
