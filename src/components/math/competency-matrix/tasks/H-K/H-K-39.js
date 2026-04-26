export default {
  id: 'H-K-39',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mértani sorozat — duplázódás',
  difficulty: 7,
  scenario: 'Egy e-mailt az első nap **1 ember** kap, és minden nap **duplázódik** a címzettek száma.',
  question: 'Hány ember kapja meg **összesen 7 nap alatt**?',
  visual: {
    type: 'sequence',
    elements: ['1', '2', '4', '8', '16', '32', '64']
  },
  options: ['63', '126', '127', '128'],
  answer: '127',
  keywords: ['mértani sorozat', 'összeg'],
  solution: '$S = 2^7 - 1 = \\mathbf{127}$ ember.'
};
