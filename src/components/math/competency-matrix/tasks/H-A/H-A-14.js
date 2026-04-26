export default {
  id: 'H-A-14',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap — 40% = 8',
  difficulty: 4,
  scenario: 'Egy osztály **40%-a** 8 tanuló.',
  question: 'Hány tanuló jár az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: '40%',
        value: 40,
        color: '#ec4899'
      },
      {
        label: '60%',
        value: 60,
        color: '#2563eb'
      }
    ]
  },
  options: ['15', '20', '25', '30'],
  answer: '20',
  keywords: ['százalékalap'],
  solution: '40% = 8 → 1% = $0.2$. 100% = **20**.'
};
