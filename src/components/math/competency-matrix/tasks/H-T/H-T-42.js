export default {
  id: 'H-T-42',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Internetcsomagok — díjak',
  difficulty: 3,
  scenario: 'Négy szolgáltató havi internet-előfizetési díját összehasonlítjuk.',
  question: 'Melyik csomag a **legolcsóbb**?',
  visual: {
    type: 'priceTag',
    items: [
      { name: 'Start', price: '4990 Ft' },
      { name: 'Family', price: '6490 Ft' },
      { name: 'Basic', price: '3990 Ft' },
      { name: 'Pro', price: '7990 Ft' }
    ]
  },
  options: ['Start', 'Family', 'Basic', 'Pro'],
  answer: 'Basic',
  keywords: ['összehasonlítás', 'ár'],
  solution: 'A legalacsonyabb díj: **Basic — 3990 Ft**.'
};
