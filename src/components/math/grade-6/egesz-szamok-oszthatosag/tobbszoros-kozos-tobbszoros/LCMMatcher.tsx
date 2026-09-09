import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface LCMMatcherProps {
  onBack: () => void;
}

const MATCHER_LEVELS: MatcherLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: Alapvető LKKT számpárok',
    pairs: [
      { id: 'e1', prompt: '[4, 6] Legkisebb Közös Többszöröse', value: '12' },
      { id: 'e2', prompt: '[6, 8] Legkisebb Közös Többszöröse', value: '24' },
      { id: 'e3', prompt: '[5, 10] Legkisebb Közös Többszöröse', value: '10 (egyik osztója a másiknak)' },
      { id: 'e4', prompt: '[3, 7] Legkisebb Közös Többszöröse', value: '21 (relatív prímek szorzata)' },
      { id: 'e5', prompt: '[2, 9] Legkisebb Közös Többszöröse', value: '18' },
      { id: 'e6', prompt: '[10, 15] Legkisebb Közös Többszöröse', value: '30' },
      { id: 'e7', prompt: '[8, 12] Legkisebb Közös Többszöröse', value: '24' },
      { id: 'e8', prompt: '[7, 14] Legkisebb Közös Többszöröse', value: '14' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: Kétjegyű és 3 tagú LKKT feladatok',
    pairs: [
      { id: 'm1', prompt: '[12, 18] Legkisebb Közös Többszöröse', value: '36' },
      { id: 'm2', prompt: '[15, 20] Legkisebb Közös Többszöröse', value: '60' },
      { id: 'm3', prompt: '[16, 24] Legkisebb Közös Többszöröse', value: '48' },
      { id: 'm4', prompt: '[18, 27] Legkisebb Közös Többszöröse', value: '54' },
      { id: 'm5', prompt: '[20, 30] Legkisebb Közös Többszöröse', value: '60' },
      { id: 'm6', prompt: '[4, 6, 8] három szám LKKT-je', value: '24' },
      { id: 'm7', prompt: '[3, 4, 5] három relatív prím LKKT-je', value: '60 (3 · 4 · 5)' },
      { id: 'm8', prompt: '[24, 36] Legkisebb Közös Többszöröse', value: '72' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Prímfelbontások és szöveges modellek',
    pairs: [
      { id: 'h1', prompt: '[2³ · 3², 2² · 3³] LKKT kanonikus alakban', value: '2³ · 3³ = 8 · 27 = 216' },
      { id: 'h2', prompt: '[2 · 5 · 7, 2² · 3 · 5] LKKT értéke', value: '2² · 3 · 5 · 7 = 420' },
      { id: 'h3', prompt: 'Futók körideje: 6 perc és 8 perc. Mikor találkoznak a rajtnál?', value: '24 perc múlva ([6, 8] = 24)' },
      { id: 'h4', prompt: 'Buszok indulnak: 12 és 15 percenként. Újra egyszerre indulnak:', value: '60 perc (1 óra) múlva' },
      { id: 'h5', prompt: 'Ha LNKO(a, b) = 6 és a · b = 720, akkor [a, b] = ?', value: '120 (720 : 6 = 120)' },
      { id: 'h6', prompt: '1/12 és 5/18 legkisebb közös nevezője', value: '36' },
      { id: 'h7', prompt: 'Legkisebb háromjegyű szám, ami 6-nak és 8-nak is többszöröse', value: '120 (5 · 24 = 120)' },
      { id: 'h8', prompt: '[14, 21, 35] Legkisebb Közös Többszöröse', value: '210 (2 · 3 · 5 · 7)' },
    ],
  },
];

export function LCMMatcher({ onBack }: LCMMatcherProps) {
  return (
    <MatcherTemplate
      title="LKKT Kártyapárosító"
      description="Párosítsd össze a számokat, prímfelbontásokat és a legkisebb közös többszörösöket!"
      levels={MATCHER_LEVELS}
      themeColor="amber"
      onBack={onBack}
    />
  );
}
