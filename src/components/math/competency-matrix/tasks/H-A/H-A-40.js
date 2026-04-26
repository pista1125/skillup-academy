export default {
  id: 'H-A-40',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Vitaminterv — napi adag',
  difficulty: 4,
  scenario: 'A napi ajánlott C-vitamin **80 mg**. A reggeli **50 mg**-ot tartalmaz.',
  question: 'Hány **százaléka** teljesült a napi adagnak?',
  visual: {
    type: 'formula',
    formula: 'arány = 50 / 80',
    variables: [
      { name: 'fogyasztott', desc: '50 mg' },
      { name: 'cél', desc: '80 mg' }
    ],
    example: { eredmény: '?' }
  },
  options: ['50%', '60%', '62,5%', '75%'],
  answer: '62,5%',
  keywords: ['százalék', 'arány'],
  solution: '$50 \\div 80 = 0{,}625 = \\mathbf{62{,}5\\%}$.'
};
