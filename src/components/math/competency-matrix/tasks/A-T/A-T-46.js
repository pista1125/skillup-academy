export default {
  id: 'A-T-46',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Csempefedés — darabszám',
  difficulty: 3,
  scenario: 'Egy **2 m × 1 m** felületet **1 dm × 1 dm**-es csempékkel burkolunk.',
  question: 'Hány csempe kell? (1 m = 10 dm)',
  visual: {
    type: 'rectangle',
    widthM: 20,
    heightM: 10,
    label: 'fal (dm)',
    fill: '#b0d8ff',
    unit: 'dm'
  },
  options: ['20', '100', '200', '400'],
  answer: '200',
  keywords: ['terület', 'burkolás'],
  solution: 'A fal **20 dm × 10 dm = 200 dm²**. Egy csempe **1 dm²**. Szükséges csempe: $\\mathbf{200}$ db.'
};
