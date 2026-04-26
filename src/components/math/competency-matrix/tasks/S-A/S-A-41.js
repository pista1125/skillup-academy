export default {
  id: 'S-A-41',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Olvasott könyvek — átlag',
  difficulty: 4,
  scenario: 'A piktogramon 4 tanuló nyár alatt olvasott könyveinek száma (1 jel = 1 könyv).',
  question: 'Mennyi az **átlag** könyvszám?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Bori',
        count: 5,
        unit: 'könyv',
        color: '#a855f7'
      },
      {
        label: 'Csaba',
        count: 3,
        unit: 'könyv',
        color: '#2563eb'
      },
      {
        label: 'Dóra',
        count: 7,
        unit: 'könyv',
        color: '#ec4899'
      },
      {
        label: 'Ervin',
        count: 5,
        unit: 'könyv',
        color: '#16a34a'
      }
    ]
  },
  options: ['4', '4,5', '5', '5,5'],
  answer: '5',
  keywords: ['átlag', 'piktogram'],
  solution: `$$\\bar{x} = \\dfrac{5+3+7+5}{4} = \\dfrac{20}{4} = \\mathbf{5}$$

**A helyes válasz: 5.**`
};
