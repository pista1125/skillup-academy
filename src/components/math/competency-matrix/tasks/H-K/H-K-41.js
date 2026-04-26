export default {
  id: 'H-K-41',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Magasság × Tüdőkapacitás',
  difficulty: 6,
  scenario: 'A pontdiagram felnőttek testmagasságát (cm) és tüdőkapacitását (L) mutatja.',
  question: 'Milyen **összefüggés** figyelhető meg?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Magasság (cm)',
    yLabel: 'Tüdő (L)',
    xMin: 155,
    xMax: 195,
    yMin: 3,
    yMax: 7,
    points: [
      { x: 158, y: 3.6 },
      { x: 162, y: 3.9 },
      { x: 168, y: 4.4 },
      { x: 172, y: 4.8 },
      { x: 178, y: 5.2 },
      { x: 184, y: 5.8 },
      { x: 190, y: 6.4 }
    ]
  },
  options: ['Magasabb → nagyobb tüdő', 'Magasság nő → Tüdő csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Magasabb → nagyobb tüdő',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Magasabb → nagyobb tüdő**.'
};
