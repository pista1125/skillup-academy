export default {
  id: 'M-A-04',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szoba festése',
  difficulty: 4,
  scenario: 'Egy téglalap alakú szoba alapterülete **3 m × 4 m**. A mennyezetet ki kell festeni. Egy doboz festékkel **6 m²** felület festhető le.',
  question: 'Legkevesebb hány doboz festékre van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 3,
    heightM: 4,
    label: 'Mennyezet alaprajza',
    fill: '#fef3c7'
  },
  options: ['1 doboz', '2 doboz', '3 doboz', '4 doboz'],
  answer: '2 doboz',
  keywords: ['terület', 'osztás', 'kerekítés értelmezés szerint'],
  solution: `**Terület, majd doboz-szám:**

1. Terület: $3 \\cdot 4 = 12$ m².
2. Osztás: $\\dfrac{12}{6} = 2$ doboz.

**A helyes válasz: 2 doboz.** (Pontosan kijön.)`
};
