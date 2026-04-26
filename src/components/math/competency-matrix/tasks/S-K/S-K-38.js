export default {
  id: 'S-K-38',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Legalább egy fej — 3 feldobás',
  difficulty: 6,
  scenario: 'Egy szabályos érmét **háromszor** feldobunk.',
  question: 'Mennyi a valószínűsége, hogy **legalább egyszer fejet** dobunk?',
  options: ['$\\tfrac{1}{8}$', '$\\tfrac{3}{8}$', '$\\tfrac{1}{2}$', '$\\tfrac{7}{8}$'],
  answer: '$\\tfrac{7}{8}$',
  keywords: ['komplementer', 'független'],
  solution: `**Komplementer:** nem lesz fej → 3-szor írás → $\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8}$.

$$P(\\text{legalább 1 fej}) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}$$

**A helyes válasz: $\\tfrac{7}{8}$.**`
};
