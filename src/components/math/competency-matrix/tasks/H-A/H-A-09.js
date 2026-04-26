export default {
  id: 'H-A-09',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Autó üzemanyag',
  difficulty: 4,
  scenario: 'Egy autó tankja **50 liter** benzinnel van feltöltve. 100 km-enként **7 litert** fogyaszt.',
  question: 'Hány liter marad a tankban **300 km** megtétele után?',
  visual: {
    type: 'table',
    caption: 'Fogyasztás kilométerenként',
    headers: ['Megtett út (km)', 'Elhasznált (l)', 'Maradék (l)'],
    rows: [
      ['0', '0', '50'],
      ['100', '7', '43'],
      ['200', '14', '36'],
      ['300', '?', '?']
    ]
  },
  options: ['21 l', '28 l', '29 l', '36 l'],
  answer: '29 l',
  keywords: ['változók közötti kapcsolat', 'fogyasztás'],
  solution: `**Számítás:**

300 km-re: $\\dfrac{300}{100} \\cdot 7 = 21$ liter fogyasztás.

Maradék: $50 - 21 = \\mathbf{29}$ liter.`
};
