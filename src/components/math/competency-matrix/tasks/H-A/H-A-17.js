export default {
  id: 'H-A-17',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kamatszámítás — éves',
  difficulty: 4,
  scenario: 'Egy bank évi **5%** kamatot ír jóvá a betétre. Egy év alatt **2500 Ft** kamat keletkezett.',
  question: 'Mekkora volt a **betét**?',
  visual: {
    type: 'formula',
    formula: 'kamat = 5% · betét',
    variables: [
      { name: 'kamat', desc: '2500 Ft' }
    ],
    example: { betét: '?' }
  },
  options: ['40 000 Ft', '45 000 Ft', '50 000 Ft', '55 000 Ft'],
  answer: '50 000 Ft',
  keywords: ['százalékalap', 'kamat'],
  solution: '$5\\% = 2500$ → $1\\% = 500$. $100\\% = \\mathbf{50\\,000}$ Ft.'
};
