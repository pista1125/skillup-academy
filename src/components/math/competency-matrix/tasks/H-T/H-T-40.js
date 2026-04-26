export default {
  id: 'H-T-40',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Taxidíj — összehasonlítás',
  difficulty: 3,
  scenario: 'A diagram 5 km-es taxiút díjának alakulását mutatja különböző társaságoknál.',
  question: 'Melyik taxitársaság a **legolcsóbb**?',
  visual: {
    type: 'barChart',
    xLabel: 'Társaság',
    yLabel: 'Ft',
    bars: [
      { label: 'A', value: 2400 },
      { label: 'B', value: 2100 },
      { label: 'C', value: 2800 },
      { label: 'D', value: 1950 }
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'D',
  keywords: ['oszlopdiagram', 'minimum'],
  solution: 'A legalacsonyabb oszlop: **D — 1950 Ft**.'
};
