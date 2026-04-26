export default {
  id: 'M-T-41',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Repülőút — időszámítás',
  difficulty: 2,
  scenario: 'A repülőgép **13:15-kor** szállt fel, a repülés **2 óra 50 perc** volt.',
  question: 'Hánykor **landolt** a gép?',
  visual: {
    type: 'timeline',
    label: 'Repülőút',
    events: [
      { t: '13:15', label: 'Felszállás' },
      { t: '?', label: 'Landolás' }
    ]
  },
  options: ['15:05', '15:55', '16:05', '16:55'],
  answer: '16:05',
  keywords: ['időtartam', 'repülőút'],
  solution: '13:15 + 2 óra 50 perc = **16:05**.'
};
