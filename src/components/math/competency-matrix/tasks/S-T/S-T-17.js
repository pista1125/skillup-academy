export default {
  id: 'S-T-17',
  contentArea: 'S',
  contentSub: '4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc állat — piktogram',
  difficulty: 1,
  scenario: 'Az alsósok körében felmérték, melyik háziállatot szeretik jobban. A piktogramon 1 jel = 1 tanuló.',
  question: 'Hányan választották a **macskát**?',
  visual: {
    type: 'pictogram',
    items: [
      { label: 'Kutya', count: 10, unit: 'fő', color: '#a16207' },
      { label: 'Macska', count: 7, unit: 'fő', color: '#6b7280' },
      { label: 'Nyúl', count: 4, unit: 'fő', color: '#f9a8d4' },
      { label: 'Papagáj', count: 3, unit: 'fő', color: '#10b981' }
    ]
  },
  options: ['3', '4', '7', '10'],
  answer: '7',
  keywords: ['piktogram', 'adatleolvasás'],
  solution: `**A Macska sorában 7 jel van** → **7 fő**.

**A helyes válasz: 7.**`
};
