export default {
  id: 'M-K-17',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'LKKT — 3, 4, 6 évente',
  difficulty: 6,
  scenario: 'Három ünnep találkozik 2024-ben. Utána A 3, B 4, C 6 évente ismétlődik.',
  question: 'Mikor esnek **legközelebb** egybe?',
  visual: {
    type: 'timelineYears',
    start: 2024,
    end: 2040,
    series: [
      {
        label: 'A',
        step: 3,
        color: '#2563eb'
      },
      {
        label: 'B',
        step: 4,
        color: '#16a34a'
      },
      {
        label: 'C',
        step: 6,
        color: '#ef4444'
      }
    ]
  },
  options: ['2031', '2036', '2041', '2048'],
  answer: '2036',
  keywords: ['legkisebb közös többszörös'],
  solution: 'lkkt(3, 4, 6) = **12**. 2024 + 12 = **2036**.'
};
