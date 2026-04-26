export default {
  id: 'A-T-35',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Síknegyed meghatározása',
  difficulty: 2,
  scenario: 'Egy $P$ pont koordinátái $(3; -4)$.',
  question: 'Melyik **síknegyedben** van?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: 3,
        y: -4
      }
    ]
  },
  options: ['I.', 'II.', 'III.', 'IV.'],
  answer: 'IV.',
  keywords: ['koordináta', 'síknegyed'],
  solution: '$x > 0$ és $y < 0$ → **IV. síknegyed**.'
};
