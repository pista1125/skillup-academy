export default {
  id: 'A-A-10',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Csempézés a konyhában',
  difficulty: 4,
  scenario: 'Egy **3 m × 2 m** méretű konyhafalat **20 cm × 20 cm**-es négyzet alakú csempékkel csempézünk.',
  question: 'Hány csempe kell a fal teljes lefedéséhez?',
  visual: {
    type: 'rectangle',
    widthM: 3,
    heightM: 2,
    label: 'fal',
    fill: '#b0d8ff',
    unit: 'm'
  },
  options: ['60', '120', '150', '300'],
  answer: '150',
  keywords: ['terület', 'átváltás', 'csempézés'],
  solution: `**Lépések:**

1. Fal területe: $3 \\cdot 2 = 6$ m² $= 60000$ cm².
2. Egy csempe: $20 \\cdot 20 = 400$ cm².
3. Szükséges csempe: $60000 \\div 400 = \\mathbf{150}$ darab.`
};
