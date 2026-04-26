export default {
  id: 'H-T-38',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Zenei ritmus — ütemek',
  difficulty: 2,
  scenario: 'Egy dal négy szakaszának ütemszámát ábrázoltuk.',
  question: 'Melyik szakasz a **leghosszabb**?',
  visual: {
    type: 'barChart',
    xLabel: 'Szakasz',
    yLabel: 'Ütem',
    bars: [
      { label: 'Bevezető', value: 8 },
      { label: 'Versszak', value: 16 },
      { label: 'Refrén', value: 12 },
      { label: 'Híd', value: 6 }
    ]
  },
  options: ['Bevezető', 'Versszak', 'Refrén', 'Híd'],
  answer: 'Versszak',
  keywords: ['oszlopdiagram', 'maximum'],
  solution: 'A **versszak** 16 ütemes — a leghosszabb.'
};
