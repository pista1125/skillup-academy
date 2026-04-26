export default {
  id: 'H-K-28',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Lépcsőfokok összesen',
  difficulty: 6,
  scenario: 'Egy nap **10 lépcsőfokot** mászunk, és minden nap **3-mal többet**, mint az előző napon. **7 napig** folytatjuk.',
  question: 'Összesen hány **lépcsőfokot** mászunk?',
  visual: {
    type: 'sequence',
    elements: ['10', '13', '16', '19', '22', '25', '28']
  },
  options: ['126', '133', '140', '196'],
  answer: '133',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_7 = 10 + 6 \\cdot 3 = 28$. $S = \\dfrac{(10+28) \\cdot 7}{2} = \\mathbf{133}$.'
};
