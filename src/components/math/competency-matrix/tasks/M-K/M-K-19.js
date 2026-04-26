export default {
  id: 'M-K-19',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Edzésterv — három sportág',
  difficulty: 6,
  scenario: 'Péter edzésterve: **futás 3 naponta, úszás 4 naponta, kerékpár 6 naponta**. Ma mindhárom sportágat edzette.',
  question: 'Hány **nap múlva** edzi legközelebb egyszerre mindhármat?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Futás', formula: '3 naponta', result: '' },
      { label: 'Úszás', formula: '4 naponta', result: '' },
      { label: 'Kerékpár', formula: '6 naponta', result: '' }
    ]
  },
  options: ['6', '12', '18', '24'],
  answer: '12',
  keywords: ['legkisebb közös többszörös', 'edzés'],
  solution: 'lkkt(3, 4, 6) = **12**. 12 nap múlva.'
};
