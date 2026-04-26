export default {
  id: 'A-A-28',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Képkeret — területe',
  difficulty: 4,
  scenario: 'Egy fénykép **30 cm × 20 cm**, köré **5 cm széles** egyenletes képkeretet tesznek.',
  question: 'Mekkora **csak a keret** (a fa rész) területe?',
  visual: {
    type: 'rectangle',
    widthM: 40,
    heightM: 30,
    label: 'keret',
    fill: '#a07850',
    unit: 'cm'
  },
  options: ['500 cm²', '600 cm²', '900 cm²', '1200 cm²'],
  answer: '600 cm²',
  keywords: ['terület', 'kivonás', 'keret'],
  solution: `**Külső méret:** minden oldalhoz kétszer hozzáadódik 5 cm.

- Szélesség: $30 + 2 \\cdot 5 = 40$ cm
- Magasság: $20 + 2 \\cdot 5 = 30$ cm
- Külső terület: $40 \\cdot 30 = 1200$ cm²

**Belső (a kép):** $30 \\cdot 20 = 600$ cm².

**Keret területe:** $1200 - 600 = \\mathbf{600}$ cm².`
};
