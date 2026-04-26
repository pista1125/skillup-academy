export default {
  id: 'H-A-05',
  contentArea: 'H',
  contentSub: '2.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép méretaránya',
  difficulty: 4,
  scenario: 'Egy térkép méretaránya **1 : 50 000**. A térképen két falu távolsága **6 cm**.',
  question: 'Hány **kilométer** a két falu valódi távolsága?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Térképen',
        formula: 'd = 6 cm',
        result: ''
      },
      {
        label: 'Valóságban',
        formula: 'D = 6 · 50000 cm',
        result: '= ? km'
      }
    ]
  },
  options: ['0,3 km', '3 km', '30 km', '300 km'],
  answer: '3 km',
  keywords: ['méretarány', 'arányosság', 'mértékegység'],
  solution: `**Méretarány alkalmazása:**

$6 \\cdot 50\\,000 = 300\\,000$ cm.

Átváltás: $300\\,000$ cm $= 3\\,000$ m $= \\mathbf{3}$ km.`
};
