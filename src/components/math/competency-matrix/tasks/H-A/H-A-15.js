export default {
  id: 'H-A-15',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap — 25% = 7',
  difficulty: 4,
  scenario: 'Egy osztály **25%-a** 7 tanuló.',
  question: 'Hány tanuló jár az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: '25%',
        value: 25,
        color: '#ec4899'
      },
      {
        label: '75%',
        value: 75,
        color: '#2563eb'
      }
    ]
  },
  options: ['23', '28', '33', '38'],
  answer: '28',
  keywords: ['százalékalap'],
  solution: '25% = 7 → 1% = $0.28$. 100% = **28**.'
};
