export default {
  id: 'S-K-18',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Rendszám kombinációk',
  difficulty: 6,
  scenario: 'Egy rendszám **3 különböző betűből** (26 betűs ábécéből) és **3 különböző számjegyből** (0–9) áll.',
  question: 'Nagyságrendileg mennyi ilyen rendszám lehetséges?',
  options: ['$26 \\cdot 10$', '$26^3 \\cdot 10^3$', '$26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8$', '$26! \\cdot 10!$'],
  answer: '$26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8$',
  keywords: ['variáció', 'szorzási elv'],
  solution: `Betűk: 26 · 25 · 24 (különbözők). Számjegyek: 10 · 9 · 8.

$$N = 26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8 = 11\\,232\\,000$$

**A helyes válasz: $26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8$.**`
};
