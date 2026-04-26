export default {
  id: 'S-T-12',
  contentArea: 'S',
  contentSub: '4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Piktogram — kedvenc sportok',
  difficulty: 1,
  scenario: 'A piktogram a 6. évfolyam diákjainak kedvenc sportját mutatja (1 jel = 1 diák).',
  question: 'Hányan választották a **focit**?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Foci',
        count: 9,
        unit: 'fő',
        color: '#16a34a'
      },
      {
        label: 'Kosár',
        count: 5,
        unit: 'fő',
        color: '#ea580c'
      },
      {
        label: 'Úszás',
        count: 4,
        unit: 'fő',
        color: '#0ea5e9'
      },
      {
        label: 'Kerékpár',
        count: 3,
        unit: 'fő',
        color: '#a855f7'
      }
    ]
  },
  options: ['5', '7', '9', '12'],
  answer: '9',
  keywords: ['piktogram', 'adatleolvasás'],
  solution: `**Piktogram leolvasása:**

A **Foci** soránál **9 jel** van, minden jel 1 diákot jelent.

**A helyes válasz: 9 diák.**`
};
