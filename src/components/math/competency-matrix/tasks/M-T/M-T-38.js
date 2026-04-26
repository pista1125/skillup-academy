export default {
  id: 'M-T-38',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Születésnap — torta szelet',
  difficulty: 2,
  scenario: 'Dóri születésnapján **24 szelet tortát** vágtak. A vendégek **18 szeletet** fogyasztottak el.',
  question: 'Hány szelet torta **maradt**?',
  visual: {
    type: 'pictogram',
    caption: 'Torta szeletek',
    icon: 'cake',
    total: 24,
    eaten: 18
  },
  options: ['4', '6', '8', '12'],
  answer: '6',
  keywords: ['kivonás', 'születésnap'],
  solution: '$24 - 18 = \\mathbf{6}$ szelet maradt.'
};
