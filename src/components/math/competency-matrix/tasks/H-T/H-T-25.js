export default {
  id: 'H-T-25',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 2',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['1', '2', '4', '8', '16', '?']
  },
  options: ['31', '32', '33', '35'],
  answer: '32',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **×2**. Következő: **32**.'
};
