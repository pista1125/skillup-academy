export default {
  id: 'A-A-15',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Parketta burkolás',
  difficulty: 4,
  scenario: 'Egy **6 m × 4 m**-es szobát **50 cm × 50 cm**-es parkettalapokkal burkolunk.',
  question: 'Hány parkettalap kell?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 4,
    label: 'szoba',
    fill: '#fff0a0',
    unit: 'm'
  },
  options: ['48', '80', '96', '100'],
  answer: '96',
  keywords: ['burkolás', 'terület', 'átváltás'],
  solution: `**Lépések:**

1. Szoba területe: $6 \\cdot 4 = 24$ m².
2. Egy parketta: $0{,}5 \\cdot 0{,}5 = 0{,}25$ m².
3. Darabszám: $\\dfrac{24}{0{,}25} = \\mathbf{96}$ db.`
};
