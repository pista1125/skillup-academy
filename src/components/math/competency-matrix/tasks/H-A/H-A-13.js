export default {
  id: 'H-A-13',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap — 60% = 15',
  difficulty: 4,
  scenario: 'Egy osztály **60%-a** 15 tanuló.',
  question: 'Hány tanuló jár az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: '60%',
        value: 60,
        color: '#ec4899'
      },
      {
        label: '40%',
        value: 40,
        color: '#2563eb'
      }
    ]
  },
  options: ['20', '25', '30', '35'],
  answer: '25',
  keywords: ['százalékalap'],
  solution: '60% = 15 → 1% = $0.25$. 100% = **25**.'
};
