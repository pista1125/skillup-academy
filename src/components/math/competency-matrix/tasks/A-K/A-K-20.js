export default {
  id: 'A-K-20',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kert — téglalap + háromszög',
  difficulty: 6,
  scenario: 'Egy kert alakja egy **8 m × 5 m**-es téglalap és hozzá ragasztott **8 m** alapú, **3 m** magas háromszög.',
  question: 'Mekkora a kert **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 5,
    label: 'alap',
    fill: '#c9e8b0',
    unit: 'm'
  },
  answer: '52 m²',
  keywords: ['összetett terület', 'átdarabolás'],
  solution: `$T_{tégl} = 8 \\cdot 5 = 40$ m².

$T_{hsz} = \\dfrac{8 \\cdot 3}{2} = 12$ m².

$T = 40 + 12 = \\mathbf{52}$ m².`
};
