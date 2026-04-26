export default {
  id: 'S-T-41',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Autók színe — táblázat',
  difficulty: 2,
  scenario: 'Egy parkolóban megszámolták a gépkocsik színét.',
  question: 'Hány **piros** autó parkol?',
  visual: {
    type: 'frequencyTable',
    caption: 'Autók színe',
    headers: ['Szín', 'Darab'],
    rows: [
      ['Fehér', 12],
      ['Fekete', 9],
      ['Piros', 7],
      ['Kék', 5],
      ['Egyéb', 3]
    ]
  },
  options: ['5', '7', '9', '12'],
  answer: '7',
  keywords: ['táblázat', 'leolvasás'],
  solution: `**A Piros sorában 7 áll.**

**A helyes válasz: 7.**`
};
