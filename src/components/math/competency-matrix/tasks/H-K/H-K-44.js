export default {
  id: 'H-K-44',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mozijegy — diák és felnőtt',
  difficulty: 6,
  scenario: 'Egy moziban **3 felnőtt** és **5 diák** jegy **10 600 Ft**. Egy felnőtt jegy **600 Ft-tal** drágább, mint egy diák.',
  question: 'Mennyibe kerül egy **diákjegy**?',
  visual: {
    type: 'comparison',
    items: [
      { label: '3F + 5D', formula: '= 10 600', result: '' },
      { label: 'F', formula: '= D + 600', result: '' }
    ]
  },
  options: ['1000 Ft', '1050 Ft', '1100 Ft', '1200 Ft'],
  answer: '1100 Ft',
  keywords: ['egyenlet', 'rendszer'],
  solution: '$3(D+600) + 5D = 10\\,600$ → $8D = 8800$ → $D = \\mathbf{1100}$ Ft.'
};
