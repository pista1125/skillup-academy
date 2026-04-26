export default {
  id: 'M-K-29',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Strand — bérlet vagy napijegy',
  difficulty: 7,
  scenario: 'A strand **napijegy 2800 Ft**, **havibérlet 28 000 Ft**.',
  question: 'Legalább hányszor kell menni egy hónapban, hogy a **bérlet megérje**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Napijegy', formula: '2800 · x', result: '' },
      { label: 'Bérlet', formula: '28 000', result: '' }
    ]
  },
  options: ['9 alkalom', '10 alkalom', '11 alkalom', '14 alkalom'],
  answer: '11 alkalom',
  keywords: ['érvelés', 'összehasonlítás', 'strand'],
  solution: `$2800x > 28000 \\Rightarrow x > 10$.

Legkisebb **egész** $x = \\mathbf{11}$ alkalom.`
};
