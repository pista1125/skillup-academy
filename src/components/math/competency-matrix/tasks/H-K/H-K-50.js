export default {
  id: 'H-K-50',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Alkalmazottak × Termelés',
  difficulty: 7,
  scenario: 'A pontdiagram egy műhelyben az alkalmazottak száma és a napi termékmennyiség közötti kapcsolatot mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Alkalmazott',
    yLabel: 'Termék (db)',
    xMin: 0,
    xMax: 20,
    yMin: 0,
    yMax: 200,
    points: [
      { x: 2, y: 40 },
      { x: 4, y: 75 },
      { x: 6, y: 110 },
      { x: 8, y: 135 },
      { x: 10, y: 155 },
      { x: 14, y: 180 },
      { x: 18, y: 190 }
    ]
  },
  options: ['Több alkalmazott → több termék (csökkenő ütemben)', 'Egyenesen arányos', 'Fordított arány', 'Nincs kapcsolat'],
  answer: 'Több alkalmazott → több termék (csökkenő ütemben)',
  keywords: ['pontdiagram', 'telítés'],
  solution: 'A termelés nő, de egyre **kisebb mértékben** — telítéshez közeledve: **több alkalmazott → több termék (csökkenő ütemben)**.'
};
