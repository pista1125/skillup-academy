export default {
  id: 'S-A-42',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kisorsolt szám',
  difficulty: 4,
  scenario: 'Egy sorsolásnál 1-től 20-ig sorszámozott cédulákból húznak egyet.',
  question: 'Mennyi a valószínűsége, hogy a szám **3-mal osztható**?',
  options: ['$\\tfrac{3}{20}$', '$\\tfrac{1}{5}$', '$\\tfrac{6}{20} = \\tfrac{3}{10}$', '$\\tfrac{7}{20}$'],
  answer: '$\\tfrac{6}{20} = \\tfrac{3}{10}$',
  keywords: ['valószínűség', 'oszthatóság'],
  solution: `A 3-mal osztható számok 1–20 között: $3, 6, 9, 12, 15, 18$ → **6 kedvező**.

$$P = \\dfrac{6}{20} = \\dfrac{3}{10}$$

**A helyes válasz: $\\tfrac{6}{20} = \\tfrac{3}{10}$.**`
};
