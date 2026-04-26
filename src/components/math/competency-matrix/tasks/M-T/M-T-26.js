export default {
  id: 'M-T-26',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Pontdiagram — kedvenc sportág',
  difficulty: 2,
  scenario: 'Egy iskolai felmérésen a gyerekek a kedvenc sportágukat jelölték pontokkal.',
  question: 'Hány gyerek választotta a **kosárlabdát**?',
  visual: {
    type: 'dotPlot',
    caption: 'Kedvenc sportág szavazatai',
    categories: ['Foci', 'Kosárlabda', 'Úszás', 'Kézilabda'],
    counts: [8, 5, 6, 3]
  },
  options: ['3', '5', '6', '8'],
  answer: '5',
  keywords: ['pontdiagram', 'leolvasás', 'sport'],
  solution: 'A **Kosárlabda** oszlop fölött **5 pont** látható. **Válasz: 5 gyerek.**'
};
