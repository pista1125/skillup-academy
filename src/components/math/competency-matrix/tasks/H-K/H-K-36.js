export default {
  id: 'H-K-36',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Edzésterv — futás',
  difficulty: 6,
  scenario: 'Az első napon **2 km-t** futottál, majd minden nap **0,5 km-rel** többet. A terv **14 napos**.',
  question: 'Hány **km-t** futsz összesen?',
  visual: {
    type: 'sequence',
    elements: ['2', '2,5', '3', '...', '8,5']
  },
  options: ['66 km', '70 km', '73,5 km', '80 km'],
  answer: '73,5 km',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{14} = 2 + 13 \\cdot 0{,}5 = 8{,}5$. $S = \\dfrac{(2+8{,}5) \\cdot 14}{2} = \\mathbf{73{,}5}$ km.'
};
