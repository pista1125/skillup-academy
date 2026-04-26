export default {
  id: 'M-T-39',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Vasúti menetrend — időtartam',
  difficulty: 2,
  scenario: 'A budapesti vonat **indulás 08:40**, **érkezés 11:05** Szegedre.',
  question: 'Mennyi az út **teljes ideje**?',
  visual: {
    type: 'clockPair',
    times: [
      { label: 'Indulás', h: 8, m: 40 },
      { label: 'Érkezés', h: 11, m: 5 }
    ]
  },
  options: ['2 óra 15 perc', '2 óra 25 perc', '2 óra 35 perc', '3 óra 25 perc'],
  answer: '2 óra 25 perc',
  keywords: ['idő', 'vasút'],
  solution: '08:40 → 11:05 = **2 óra 25 perc**.'
};
