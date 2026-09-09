import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface DivisibilityCompositeMatcherProps {
  onBack: () => void;
}

const MATCHER_LEVELS: MatcherLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: Alapvető összetett osztók (6, 12, 15)',
    pairs: [
      { id: 'c1', prompt: 'Oszthatóság 6-tal feltétele', value: 'Páros ÉS a számjegyösszeg osztható 3-mal' },
      { id: 'c2', prompt: 'Oszthatóság 12-vel helyes felbontása', value: '3 és 4 (relatív prímek)' },
      { id: 'c3', prompt: 'Oszthatóság 15-tel feltétele', value: '0-ra vagy 5-re végződik ÉS számjegyösszeg osztható 3-mal' },
      { id: 'c4', prompt: '738 oszthatósága 6-tal', value: 'Osztható (páros és összeg=18)' },
      { id: 'c5', prompt: '415 oszthatósága 15-tel', value: 'Nem osztható (5-re végződik, de összeg=10)' },
      { id: 'c6', prompt: '1524 oszthatósága 12-vel', value: 'Osztható (utolsó 2 jegy: 24, összeg=12)' },
      { id: 'c7', prompt: 'Miért nem jó a 12 = 2 · 6 felbontás?', value: 'Mert 2 és 6 nem relatív prímek' },
      { id: 'c8', prompt: 'Legkisebb pozitív kétjegyű szám, ami osztható 15-tel', value: '15' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: 18, 20, 24, 36 és 45 szabályai',
    pairs: [
      { id: 'm1', prompt: 'Oszthatóság 18-cal helyes feltétele', value: 'Páros ÉS számjegyösszeg osztható 9-cel' },
      { id: 'm2', prompt: 'Oszthatóság 20-szal helyes felbontása', value: '4 és 5 (utolsó jegy 0, utolsó kettő 4-gyel osztható)' },
      { id: 'm3', prompt: 'Oszthatóság 36-tal helyes felbontása', value: '4 és 9 (relatív prímek)' },
      { id: 'm4', prompt: 'Oszthatóság 45-tel helyes feltétele', value: 'Utolsó jegy 0 vagy 5 ÉS számjegyösszeg osztható 9-cel' },
      { id: 'm5', prompt: '3456 oszthatósága 18-cal', value: 'Osztható (páros és összeg=18)' },
      { id: 'm6', prompt: '4356 oszthatósága 36-tal', value: 'Osztható (utolsó 2 jegy: 56, összeg=18)' },
      { id: 'm7', prompt: '5670 oszthatósága 45-tel', value: 'Osztható (0-ra végződik és összeg=18)' },
      { id: 'm8', prompt: 'Miért nem jó a 18 = 3 · 6 felbontás?', value: 'Mert LNKO(3, 6) = 3 ≠ 1' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Hiányzó számjegyek és összetett tulajdonságok',
    pairs: [
      { id: 'h1', prompt: '43x2 osztható 12-vel (x lehetséges értékei)', value: 'x = 3 vagy x = 9' },
      { id: 'h2', prompt: '25x0 osztható 18-cal (x értéke)', value: 'x = 2 (összeg 9 legyen)' },
      { id: 'h3', prompt: '3x4y osztható 45-tel, páros szám (x és y értéke)', value: 'y = 0 és x = 2' },
      { id: 'h4', prompt: 'Ha egy szám osztható 4-gyel és 6-tal, akkor biztosan osztható...', value: '12-vel (LKKT(4,6)=12), de 24-gyel nem biztos' },
      { id: 'h5', prompt: 'Ha egy szám osztható 6-tal és 10-zel, akkor biztosan osztható...', value: '30-cal (LKKT(6,10)=30)' },
      { id: 'h6', prompt: '72-vel való oszthatóság relatív prím felbontása', value: '8 és 9 (LNKO(8,9)=1)' },
      { id: 'h7', prompt: 'A legkisebb háromjegyű szám, ami osztható 12-vel és 15-tel is', value: '120 (LKKT(12,15)=60, 2·60=120)' },
      { id: 'h8', prompt: '1a2b osztható 15-tel, legkisebb lehetséges érték', value: '1020 (a=0, b=0)' },
    ],
  },
];

export function DivisibilityCompositeMatcher({ onBack }: DivisibilityCompositeMatcherProps) {
  return (
    <MatcherTemplate
      title="Összetett Oszthatóság Párosító"
      description="Párosítsd össze az összetett oszthatósági szabályokat, felbontásokat és példákat!"
      levels={MATCHER_LEVELS}
      themeColor="indigo"
      onBack={onBack}
    />
  );
}
