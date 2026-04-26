export default {
  id: 'S-K-29',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Fekete-fehér golyó — feltétel',
  difficulty: 7,
  scenario: 'Egy dobozban **3 fehér** és **5 fekete** golyó van. **Két golyót húzunk visszatevés nélkül.**',
  question: 'Mi a valószínűsége, hogy az **elsőre fehér, másodikra fekete**?',
  options: ['$\\tfrac{15}{56}$', '$\\tfrac{15}{64}$', '$\\tfrac{3}{8}$', '$\\tfrac{1}{7}$'],
  answer: '$\\tfrac{15}{56}$',
  keywords: ['feltételes valószínűség', 'visszatevés nélkül'],
  solution: `**1. húzás fehér:** $P_1 = \\dfrac{3}{8}$.

**2. húzás fekete (feltéve hogy fehér kijött):** maradt 2 fehér + 5 fekete = 7.

$$P_2 = \\dfrac{5}{7}$$

**ÉS (szorzás):**

$$P = \\dfrac{3}{8} \\cdot \\dfrac{5}{7} = \\dfrac{15}{56}$$

**A helyes válasz: $\\tfrac{15}{56}$.**`
};
