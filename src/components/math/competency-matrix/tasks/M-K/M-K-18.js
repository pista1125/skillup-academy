export default {
  id: 'M-K-18',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'LKKT — 2, 5, 10 évente',
  difficulty: 6,
  scenario: 'Három ünnep találkozik 2024-ben. Utána A 2, B 5, C 10 évente ismétlődik.',
  question: 'Mikor esnek **legközelebb** egybe?',
  visual: {
    type: 'timelineYears',
    start: 2024,
    end: 2038,
    series: [
      {
        label: 'A',
        step: 2,
        color: '#2563eb'
      },
      {
        label: 'B',
        step: 5,
        color: '#16a34a'
      },
      {
        label: 'C',
        step: 10,
        color: '#ef4444'
      }
    ]
  },
  options: ['2029', '2034', '2039', '2044'],
  answer: '2034',
  keywords: ['legkisebb közös többszörös'],
  solution: 'lkkt(2, 5, 10) = **10**. 2024 + 10 = **2034**.'
};
