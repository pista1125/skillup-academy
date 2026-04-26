export default {
  id: 'H-K-35',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kerítés — oszlopok',
  difficulty: 5,
  scenario: 'Egy **120 m** hosszú kerítéshez kell oszlopokat állítani **3 méterenként**, a két végpontot is beleértve.',
  question: 'Hány **oszlop** kell?',
  visual: {
    type: 'formula',
    formula: 'oszlop = hossz / távolság + 1',
    variables: [
      { name: 'hossz', desc: '120 m' },
      { name: 'távolság', desc: '3 m' }
    ],
    example: { eredmény: '?' }
  },
  options: ['39', '40', '41', '42'],
  answer: '41',
  keywords: ['egyenlet', 'számlálás'],
  solution: '$120 \\div 3 + 1 = 40 + 1 = \\mathbf{41}$ oszlop.'
};
