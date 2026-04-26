export default {
  id: 'H-T-18',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vonat — GYSEV menetrend',
  difficulty: 2,
  scenario: 'A táblázat a GYSEV egy vonatjáratának megállóit és indulási idejét mutatja.',
  question: 'Mikor indul a vonat **Csornáról**?',
  visual: {
    type: 'table',
    caption: 'Menetrend',
    headers: ['Állomás', 'Indulás'],
    rows: [
      ['Sopron', '7:12'],
      ['Fertőszentmiklós', '7:38'],
      ['Csorna', '8:05'],
      ['Kapuvár', '8:24'],
      ['Győr', '8:52']
    ]
  },
  options: ['7:38', '8:05', '8:24', '8:52'],
  answer: '8:05',
  keywords: ['táblázat', 'menetrend'],
  solution: 'A táblázat szerint Csornáról **8:05**-kor indul.'
};
