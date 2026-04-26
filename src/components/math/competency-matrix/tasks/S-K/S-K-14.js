export default {
  id: 'S-K-14',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Útválasztás gráfon',
  difficulty: 6,
  scenario: 'Egy hálózatban **A**-ból indulva 2 él vezet **B** és **C** felé, majd **B**-ből 3, **C**-ből 2 él vezet **D**-be.',
  question: 'Hányféleképpen juthatunk **A**-ból **D**-be?',
  visual: {
    type: 'treeDiagram',
    root: 'A',
    levels: [
      {
        label: '1. lépés',
        branches: ['B', 'C']
      },
      {
        label: '2. lépés',
        branches: ['D', 'D', 'D']
      }
    ]
  },
  options: ['3', '5', '6', '7'],
  answer: '5',
  keywords: ['gráf', 'utak', 'összeadás'],
  solution: `**A→B→D:** $3$ út.

**A→C→D:** $2$ út.

Összesen: $3 + 2 = \\mathbf{5}$.

**A helyes válasz: 5.**`
};
