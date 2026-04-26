export default {
  id: 'H-T-19',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kassza-blokk',
  difficulty: 2,
  scenario: 'A vásárlás kasszablokkja négy tételt tartalmaz.',
  question: 'Melyik tétel a **legdrágább**?',
  visual: {
    type: 'priceTag',
    items: [
      { name: 'Kenyér', price: '480 Ft' },
      { name: 'Tej (1 l)', price: '379 Ft' },
      { name: 'Sajt (20 dkg)', price: '1240 Ft' },
      { name: 'Joghurt', price: '249 Ft' }
    ]
  },
  options: ['Kenyér', 'Tej', 'Sajt', 'Joghurt'],
  answer: 'Sajt',
  keywords: ['ár', 'összehasonlítás'],
  solution: 'A legnagyobb ár: **1240 Ft** — a sajt.'
};
