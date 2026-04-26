export default {
  id: 'H-K-48',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Zsugorítás — csomagbontás',
  difficulty: 7,
  scenario: 'Egy lufihoz minden nap **az előző napi levegő 80%-a** marad. Az első nap **20 L** levegő van a lufiban.',
  question: 'Kb. hány liter levegő marad a **4. napon**? (kerekíts egy tizedesre)',
  visual: {
    type: 'sequence',
    elements: ['20', '16', '12,8', '?']
  },
  options: ['8,2 L', '10,2 L', '10,24 L', '12 L'],
  answer: '10,24 L',
  keywords: ['mértani sorozat', 'csökkenés'],
  solution: '$a_4 = 20 \\cdot 0{,}8^3 = 20 \\cdot 0{,}512 = \\mathbf{10{,}24}$ L.'
};
