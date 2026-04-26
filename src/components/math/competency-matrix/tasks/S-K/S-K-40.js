export default {
  id: 'S-K-40',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két kocka — legalább egy hatos',
  difficulty: 6,
  scenario: 'Két **szabályos dobókockát** dobunk egyszerre.',
  question: 'Mennyi a valószínűsége, hogy **legalább az egyik** 6-os?',
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{1}{3}$', '$\\tfrac{11}{36}$', '$\\tfrac{1}{2}$'],
  answer: '$\\tfrac{11}{36}$',
  keywords: ['valószínűség', 'komplementer', 'két kocka'],
  solution: `**Komplementer:** egyik sem 6-os.

Minden kockán 5 „nem 6-os" szám van, tehát:

$$P(\\text{egyik sem 6}) = \\dfrac{5}{6} \\cdot \\dfrac{5}{6} = \\dfrac{25}{36}$$

**Kedvező (legalább egy 6):**

$$P = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$$

**A helyes válasz: $\\tfrac{11}{36}$.**`
};
