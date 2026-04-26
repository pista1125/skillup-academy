export default {
  id: 'A-A-22',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Fenyőfa tetőszerkezet',
  difficulty: 4,
  scenario: 'Egy faház tetejének homlokzati háromszöge **egyenlő szárú**. Alapja **8 m**, magassága **3 m**.',
  question: 'Mekkora a homlokzat területe?',
  visual: {
    type: 'triangle',
    base: 8,
    side: 5,
    height: 3,
    unit: 'm'
  },
  options: ['8 m²', '12 m²', '16 m²', '24 m²'],
  answer: '12 m²',
  keywords: ['terület', 'háromszög'],
  solution: `**Képlet:** $T = \\dfrac{a \\cdot m}{2}$, ahol $a$ az alap, $m$ a magasság.

$T = \\dfrac{8 \\cdot 3}{2} = \\dfrac{24}{2} = \\mathbf{12}$ m².`
};
