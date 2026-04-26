export default {
  id: 'S-K-45',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kétfázisú sorsolás — jegy',
  difficulty: 7,
  scenario: 'Két doboz van. **A**-ban 2 piros és 3 kék; **B**-ben 4 piros és 1 kék. Először véletlenszerűen választunk dobozt (1/2 - 1/2), majd egy golyót húzunk.',
  question: 'Mi a valószínűsége, hogy **piros golyót** húzunk?',
  options: ['$\\tfrac{3}{5}$', '$\\tfrac{13}{25}$', '$\\tfrac{3}{10}$', '$\\tfrac{4}{10}$'],
  answer: '$\\tfrac{3}{5}$',
  keywords: ['valószínűség', 'teljes valószínűség'],
  solution: `**Teljes valószínűség:**

$$P(\\text{piros}) = \\dfrac{1}{2} \\cdot \\dfrac{2}{5} + \\dfrac{1}{2} \\cdot \\dfrac{4}{5} = \\dfrac{1}{5} + \\dfrac{2}{5} = \\dfrac{3}{5}$$

**A helyes válasz: $\\tfrac{3}{5}$.**`
};
