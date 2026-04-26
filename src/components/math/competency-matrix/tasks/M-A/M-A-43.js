export default {
  id: 'M-A-43',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legkisebb közös többszörös — játékóra',
  difficulty: 5,
  scenario: 'A játszóházban az egyik csengő **6 percenként**, a másik **10 percenként** szólal meg. **Most éppen együtt szóltak.**',
  question: 'Hány perc múlva szólnak **legközelebb egyszerre**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Csengő A', formula: '6 perc', result: '' },
      { label: 'Csengő B', formula: '10 perc', result: '' }
    ]
  },
  options: ['16', '20', '30', '60'],
  answer: '30',
  keywords: ['legkisebb közös többszörös', 'játék'],
  solution: 'lkkt(6, 10) = **30**. 30 perc múlva.'
};
