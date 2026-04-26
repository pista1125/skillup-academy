export default {
  id: 'S-K-22',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Ösztöndíj feltételek',
  difficulty: 6,
  scenario: `Az ösztöndíj feltételei (**MIND** teljesüljön):

1. Legalább 4,5-es átlag.
2. Nem hiányzott 10 napnál többet.
3. Részt vett legalább 1 versenyen.

**Dani adatai:** átlag 4,6; hiányzás 12 nap; 2 versenyen indult.`,
  question: 'Megkapja-e Dani az ösztöndíjat?',
  options: ['Igen, mert átlaga 4,5 fölött van.', 'Igen, mert versenyen is indult.', 'Nem, mert túl sokat hiányzott.', 'Nem, mert az átlaga túl alacsony.'],
  answer: 'Nem, mert túl sokat hiányzott.',
  keywords: ['logika', 'ÉS', 'feltétel'],
  solution: `Az **ÉS** kapcsolat miatt **mindhárom** feltételnek teljesülnie kell.

1. Átlag: 4,6 ≥ 4,5 ✓
2. Hiányzás: 12 > 10 ✗
3. Verseny: 2 ≥ 1 ✓

A 2. feltétel nem teljesül → **nem kapja meg** az ösztöndíjat.

**A helyes válasz: „Nem, mert túl sokat hiányzott."**`
};
