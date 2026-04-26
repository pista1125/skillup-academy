export default {
  id: 'H-T-30',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 7',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['64', '32', '16', '8', '4', '?']
  },
  options: ['1', '2', '3', '5'],
  answer: '2',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **÷2**. Következő: **2**.'
};
