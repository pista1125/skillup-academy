export default {
  id: 'H-K-46',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Építkezés — kőrakás',
  difficulty: 6,
  scenario: 'Egy falnak az alsó sorába **28 kő** fér, minden felsőbb sorba **2-vel kevesebb**. A fal **12 sor** magas.',
  question: 'Hány **kő** kell összesen?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 28, label: '1. sor' },
      { count: 26, label: '2. sor' },
      { count: 24, label: '3. sor' },
      { count: 22, label: '...' }
    ]
  },
  options: ['192', '198', '204', '210'],
  answer: '204',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{12} = 28 - 11 \\cdot 2 = 6$. $S = \\dfrac{(28+6) \\cdot 12}{2} = \\mathbf{204}$.'
};
