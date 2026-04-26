export default {
  id: 'H-K-31',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Képernyőidő × Alvásminőség',
  difficulty: 6,
  scenario: 'A pontdiagram diákok esti képernyőidejét (óra) és a bejelentett alvásminőséget (1–10) mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Képernyő (óra)',
    yLabel: 'Alvásminőség',
    xMin: 0,
    xMax: 6,
    yMin: 1,
    yMax: 10,
    points: [
      { x: 0.5, y: 9 },
      { x: 1, y: 8.5 },
      { x: 2, y: 7 },
      { x: 3, y: 5.5 },
      { x: 4, y: 4 },
      { x: 5, y: 3 },
      { x: 5.5, y: 2.5 }
    ]
  },
  options: ['Több képernyőidő → rosszabb alvás', 'Nő → nő', 'Nincs kapcsolat', 'Egyenes arány'],
  answer: 'Több képernyőidő → rosszabb alvás',
  keywords: ['pontdiagram', 'fordított'],
  solution: 'A pontok trendje: **Több képernyőidő → rosszabb alvás**.'
};
