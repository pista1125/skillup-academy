export default {
  id: 'S-T-28',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Osztálykirándulás — helyszín szavazás',
  difficulty: 2,
  scenario: 'Az osztály kirándulási helyszínre szavazott. Az eredmények a táblázatban szerepelnek.',
  question: 'Hányan szavaztak a **Balatonra**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Szavazás eredménye',
    headers: ['Helyszín', 'Szavazat'],
    rows: [
      ['Balaton', 11],
      ['Mátra', 7],
      ['Bükk', 4],
      ['Velencei-tó', 3]
    ]
  },
  options: ['3', '7', '11', '25'],
  answer: '11',
  keywords: ['táblázat', 'szavazás'],
  solution: `**A Balaton sorában 11 áll.**

**A helyes válasz: 11.**`
};
