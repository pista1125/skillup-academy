export default {
  id: 'M-T-37',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Tizedestört összehasonlítás',
  difficulty: 2,
  scenario: 'Három fiú magassága: Dávid **1,42 m**, Bence **1,4 m**, Ákos **1,47 m**.',
  question: 'Ki **a legmagasabb**?',
  visual: {
    type: 'table',
    caption: 'Magasságok',
    headers: ['Név', 'Magasság'],
    rows: [
      ['Dávid', '1,42 m'],
      ['Bence', '1,40 m'],
      ['Ákos', '1,47 m']
    ]
  },
  options: ['Dávid', 'Bence', 'Ákos'],
  answer: 'Ákos',
  keywords: ['tizedestört', 'összehasonlítás'],
  solution: '$1,47 > 1,42 > 1,40$. **A legmagasabb Ákos.**'
};
