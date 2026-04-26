export default {
  id: 'A-A-50',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Biztonsági zóna játszótéren',
  difficulty: 5,
  scenario: 'Egy **10 m × 6 m**-es téglalap alakú játszótér köré **1 m széles** egyenletes biztonsági zónát alakítanak ki (szegélyezés).',
  question: 'Mekkora **csak a biztonsági zóna** (szegély) területe?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 8,
    label: 'zóna',
    fill: '#d0d0d0',
    unit: 'm'
  },
  options: ['28 m²', '32 m²', '36 m²', '60 m²'],
  answer: '36 m²',
  keywords: ['terület', 'kivonás', 'szegély'],
  solution: `**Külső téglalap** (játszótér + 1 m minden oldalon):

- szélesség: $10 + 2 = 12$ m
- magasság: $6 + 2 = 8$ m
- terület: $12 \\cdot 8 = 96$ m²

**Belső (maga a játszótér):** $10 \\cdot 6 = 60$ m².

**Szegély területe:** $96 - 60 = \\mathbf{36}$ m².`
};
