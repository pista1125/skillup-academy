export default {
  id: 'S-A-43',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kétszeres érmefeldobás — két fej',
  difficulty: 4,
  scenario: 'Szabályos érmét **kétszer** feldobunk.',
  question: 'Mennyi a valószínűsége, hogy **mindkétszer fej** lesz?',
  visual: {
    type: 'treeDiagram',
    root: 'Érme',
    levels: [
      {
        label: '1. dobás',
        branches: ['F', 'Í']
      },
      {
        label: '2. dobás',
        branches: ['F', 'Í']
      }
    ]
  },
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{4}$',
  keywords: ['valószínűség', 'független események'],
  solution: `4 egyformán valószínű kimenet: FF, FÍ, ÍF, ÍÍ. **Kedvező: FF (1 darab).**

$$P = \\dfrac{1}{4}$$

**A helyes válasz: $\\tfrac{1}{4}$.**`
};
