export default {
  id: 'H-A-02',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap',
  difficulty: 5,
  scenario: 'Egy osztályban a tanulók **60%-a** lány, és összesen **15 lány** jár az osztályba.',
  question: 'Hány tanuló jár ebbe az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Lányok (60%)',
        value: 60,
        color: '#ec4899'
      },
      {
        label: 'Fiúk (40%)',
        value: 40,
        color: '#2563eb'
      }
    ]
  },
  options: ['20', '24', '25', '30'],
  answer: '25',
  keywords: ['százalékalap', 'arányszámítás'],
  solution: `**Százalékalap keresése:**

Ha a 60% = 15 fő, akkor 1% = $15/60 = 0{,}25$ fő.

**100%:** $0{,}25 \\cdot 100 = \\mathbf{25}$ fő.

Ellenőrzés: $25 \\cdot 0{,}6 = 15$ lány. ✓`
};
