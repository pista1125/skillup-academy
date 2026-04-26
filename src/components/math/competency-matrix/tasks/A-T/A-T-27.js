export default {
  id: 'A-T-27',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Origó koordinátái',
  difficulty: 1,
  scenario: 'A koordináta-rendszerben az **origó** a tengelyek metszéspontja.',
  question: 'Mik az origó koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -3,
    xMax: 3,
    yMin: -3,
    yMax: 3,
    points: [
      {
        label: 'O',
        x: 0,
        y: 0
      }
    ]
  },
  options: ['(0; 0)', '(1; 1)', '(0; 1)', '(−1; 0)'],
  answer: '(0; 0)',
  keywords: ['koordináta', 'origó'],
  solution: 'Az **origó** a két tengely közös pontja: $(0; 0)$.'
};
