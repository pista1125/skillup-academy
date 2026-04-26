export default {
  id: 'S-K-15',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Angolt vagy németet tanul — valószínűség',
  difficulty: 6,
  scenario: 'Egy 40 fős osztályban **25** tanul angolt, **18** németet, **10** mindkettőt. **Egyet véletlenszerűen** kiválasztunk.',
  question: 'Mennyi a valószínűsége, hogy **legalább az egyik** nyelvet tanulja?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Angol',
        color: '#2563eb'
      },
      {
        label: 'Német',
        color: '#ef4444'
      }
    ],
    regions: {
      onlyA: 15,
      onlyB: 8,
      both: 10,
      neither: 7
    },
    universe: 40
  },
  options: ['$\\tfrac{7}{40}$', '$\\tfrac{33}{40}$', '$\\tfrac{3}{4}$', '$\\tfrac{43}{40}$'],
  answer: '$\\tfrac{33}{40}$',
  keywords: ['valószínűség', 'Venn', 'unió'],
  solution: `**Unió:** $25 + 18 - 10 = 33$.

$$P = \\dfrac{33}{40}$$

**A helyes válasz: $\\tfrac{33}{40}$.**`
};
