export default {
  id: 'M-T-35',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Időtartam — 14:10 → ?',
  difficulty: 2,
  scenario: 'Egy esemény **14:10-kor** kezdődik és **2 óra 30 perc** hosszú.',
  question: 'Hánykor ér véget?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Kezdés',
        h: 14,
        m: 10
      },
      {
        label: 'Befejezés',
        h: 16,
        m: 40
      }
    ]
  },
  options: ['15:40', '16:40', '17:40', '16:10'],
  answer: '16:40',
  keywords: ['idő', 'időtartam'],
  solution: '14:10 + 2 óra 30 perc = **16:40**.'
};
