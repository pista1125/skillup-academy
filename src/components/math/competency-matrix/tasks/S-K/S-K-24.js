export default {
  id: 'S-K-24',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Három húzás visszatevéssel',
  difficulty: 6,
  scenario: 'Egy dobozban **4 piros** és **6 kék** golyó van. **Háromszor húzunk visszatevéssel.**',
  question: 'Mennyi a valószínűsége, hogy **mindháromszor piros** lesz?',
  visual: {
    type: 'treeDiagram',
    root: '3 húzás',
    levels: [
      {
        label: '1. húzás',
        branches: ['P', 'K']
      },
      {
        label: '2. húzás',
        branches: ['P', 'K']
      },
      {
        label: '3. húzás',
        branches: ['P', 'K']
      }
    ]
  },
  options: ['$\\tfrac{1}{125}$', '$\\tfrac{4}{125}$', '$\\tfrac{8}{125}$', '$\\tfrac{12}{125}$'],
  answer: '$\\tfrac{8}{125}$',
  keywords: ['valószínűség', 'függetlenség'],
  solution: `**Egy húzás piros:** $\\tfrac{4}{10} = \\tfrac{2}{5}$. Visszatevéssel a húzások függetlenek:

$$P = \\left(\\dfrac{2}{5}\\right)^3 = \\dfrac{8}{125}$$

**A helyes válasz: $\\tfrac{8}{125}$.**`
};
