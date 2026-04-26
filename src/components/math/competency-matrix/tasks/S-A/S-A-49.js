export default {
  id: 'S-A-49',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Sorsolásos tombola',
  difficulty: 4,
  scenario: 'Egy tombolasorsoláson a nyeremények a diagramon láthatók. Összesen 50 szelvényt adtak el.',
  question: 'Mennyi a valószínűsége, hogy **főnyereményt** húzunk?',
  visual: {
    type: 'barChart',
    xLabel: 'Nyeremény',
    yLabel: 'Darab',
    yMin: 0,
    yMax: 50,
    bars: [
      {
        label: 'Főnyer.',
        value: 1,
        color: '#facc15'
      },
      {
        label: 'Nagy',
        value: 3,
        color: '#22c55e'
      },
      {
        label: 'Kis',
        value: 10,
        color: '#0ea5e9'
      },
      {
        label: 'Vigasz',
        value: 20,
        color: '#a855f7'
      },
      {
        label: 'Nincs',
        value: 16,
        color: '#94a3b8'
      }
    ]
  },
  options: ['$\\tfrac{1}{50}$', '$\\tfrac{1}{25}$', '$\\tfrac{1}{10}$', '$\\tfrac{1}{5}$'],
  answer: '$\\tfrac{1}{50}$',
  keywords: ['valószínűség', 'klasszikus'],
  solution: `**1 főnyeremény** az **50 szelvényből**:

$$P = \\dfrac{1}{50}$$

**A helyes válasz: $\\tfrac{1}{50}$.**`
};
