export default {
  id: 'M-T-34',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Időtartam — 08:30 → ?',
  difficulty: 2,
  scenario: 'Egy esemény **08:30-kor** kezdődik és **1 óra 45 perc** hosszú.',
  question: 'Hánykor ér véget?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Kezdés',
        h: 8,
        m: 30
      },
      {
        label: 'Befejezés',
        h: 10,
        m: 15
      }
    ]
  },
  options: ['09:15', '10:15', '11:15', '10:45'],
  answer: '10:15',
  keywords: ['idő', 'időtartam'],
  solution: '08:30 + 1 óra 45 perc = **10:15**.'
};
