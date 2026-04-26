export default {
  id: 'M-K-13',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családi költségvetés — havi mérleg',
  difficulty: 6,
  scenario: 'Egy család havi **bevétele 580 000 Ft**. Kiadások: lakbér 180 000, rezsi 45 000, élelmiszer 120 000, egyéb 90 000 Ft.',
  question: 'Mennyi a havi **megtakarítás**?',
  visual: {
    type: 'pieChart',
    caption: 'Havi kiadások arányai',
    slices: [
      { label: 'Lakbér', value: 180000 },
      { label: 'Rezsi', value: 45000 },
      { label: 'Élelmiszer', value: 120000 },
      { label: 'Egyéb', value: 90000 },
      { label: 'Megtakarítás', value: 145000 }
    ]
  },
  options: ['125 000 Ft', '145 000 Ft', '155 000 Ft', '175 000 Ft'],
  answer: '145 000 Ft',
  keywords: ['összeadás', 'kivonás', 'család'],
  solution: `Kiadás: $180000 + 45000 + 120000 + 90000 = 435\\,000$ Ft.

Megtakarítás: $580000 - 435000 = \\mathbf{145\\,000}$ Ft.`
};
