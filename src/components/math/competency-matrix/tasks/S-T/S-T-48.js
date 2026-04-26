export default {
  id: 'S-T-48',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Fesztivál — étkezési fogyasztás',
  difficulty: 2,
  scenario: 'Egy fesztiválon feljegyezték, mennyi fogyott egyes ételekből.',
  question: 'Hány adag **lángos** fogyott?',
  visual: {
    type: 'frequencyTable',
    caption: 'Fesztiváli fogyasztás',
    headers: ['Étel', 'Adag'],
    rows: [
      ['Lángos', 145],
      ['Hamburger', 98],
      ['Gyros', 112],
      ['Palacsinta', 76]
    ]
  },
  options: ['76', '98', '112', '145'],
  answer: '145',
  keywords: ['táblázat', 'leolvasás'],
  solution: `**A Lángos sorában 145 áll.**

**A helyes válasz: 145.**`
};
