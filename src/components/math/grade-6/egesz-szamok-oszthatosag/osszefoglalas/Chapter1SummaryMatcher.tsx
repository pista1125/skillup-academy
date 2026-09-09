import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface Chapter1SummaryMatcherProps {
  onBack: () => void;
}

const MATCHER_LEVELS: MatcherLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: Fejezeti alapfogalmak és műveletek',
    pairs: [
      { id: 'e1', prompt: '(-6) · (-8) művelet eredménye', value: '+48 (azonos előjel -> pozitív)' },
      { id: 'e2', prompt: '(-54) : (+9) művelet eredménye', value: '-6 (különböző előjel -> negatív)' },
      { id: 'e3', prompt: '(-15) + (+8) művelet összege', value: '-7' },
      { id: 'e4', prompt: 'Oszthatóság 4-gyel feltétele', value: 'Az utolsó két számjegy osztható 4-gyel' },
      { id: 'e5', prompt: 'Oszthatóság 9-cel feltétele', value: 'A számjegyek összege osztható 9-cel' },
      { id: 'e6', prompt: 'Oszthatóság 6-tal feltétele', value: 'Páros ÉS számjegyösszeg osztható 3-mal' },
      { id: 'e7', prompt: '[4, 6] Legkisebb Közös Többszörös', value: '12' },
      { id: 'e8', prompt: '(12, 18) Legnagyobb Közös Osztó', value: '6' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: Szabályok, kanonikus alak és osztók',
    pairs: [
      { id: 'm1', prompt: '72 prímfelbontása (kanonikus alak)', value: '2³ · 3² (8 · 9 = 72)' },
      { id: 'm2', prompt: '72 osztóinak száma: d(72)', value: '(3+1) · (2+1) = 12 db osztó' },
      { id: 'm3', prompt: 'Oszthatóság 12-vel relatív prím párja', value: '3 és 4 (LNKO(3,4)=1)' },
      { id: 'm4', prompt: 'Oszthatóság 45-tel feltétele', value: '0-ra vagy 5-re végződik ÉS számjegyösszeg osztható 9-cel' },
      { id: 'm5', prompt: '(24, 36) Legnagyobb Közös Osztó', value: '12' },
      { id: 'm6', prompt: '[24, 36] Legkisebb Közös Többszörös', value: '72' },
      { id: 'm7', prompt: '3 féle nadrág és 5 féle ing kombinációinak száma', value: '15 féle (3 · 5)' },
      { id: 'm8', prompt: 'Relatív prím számpár példa', value: '8 és 9 (LNKO = 1)' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Komplex összefüggések és záró modellek',
    pairs: [
      { id: 'h1', prompt: 'a · b = (a, b) · [a, b] tétel', value: 'Két szám szorzata = LNKO · LKKT' },
      { id: 'h2', prompt: 'Két futó köre: 6 és 8 perc. Újra egyszerre a rajtnál:', value: '24 perc múlva ([6, 8] = 24)' },
      { id: 'h3', prompt: '48 csoki és 72 cukorka: maximális egyforma csomagok száma', value: '24 csomag ((48, 72) = 24)' },
      { id: 'h4', prompt: '43x2 osztható 12-vel (x értékei)', value: 'x = 3 vagy x = 9' },
      { id: 'h5', prompt: '100 = 13 · 7 + 9 maradékos osztásban a maradék', value: 'r = 9' },
      { id: 'h6', prompt: '(2³ · 3² · 5, 2² · 3³ · 7) LNKO értéke', value: '2² · 3² = 36' },
      { id: 'h7', prompt: '[2³ · 3² · 5, 2² · 3³ · 7] LKKT értéke', value: '2³ · 3³ · 5 · 7 = 7560' },
      { id: 'h8', prompt: 'Két szomszédos pozitív egész szám: n és n+1 legnagyobb közös osztója', value: 'Mindig 1 (relatív prímek)' },
    ],
  },
];

export function Chapter1SummaryMatcher({ onBack }: Chapter1SummaryMatcherProps) {
  return (
    <MatcherTemplate
      title="I. Fejezet Záró Párosító"
      description="Párosítsd össze az Egész számok és oszthatóság fejezet legfontosabb fogalmait, szabályait és tételeit!"
      levels={MATCHER_LEVELS}
      themeColor="indigo"
      onBack={onBack}
    />
  );
}
