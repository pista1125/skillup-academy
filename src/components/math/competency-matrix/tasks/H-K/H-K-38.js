export default {
  id: 'H-K-38',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Gyakorlás — napi szavak',
  difficulty: 6,
  scenario: 'A nyelvtanuló első nap **5 új szót** tanul, minden következő nap **2-vel többet**. Összesen **21 napig** tanul.',
  question: 'Összesen hány **új szót** tanul meg?',
  visual: {
    type: 'sequence',
    elements: ['5', '7', '9', '...', '45']
  },
  options: ['500', '525', '550', '630'],
  answer: '525',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{21} = 5 + 20 \\cdot 2 = 45$. $S = \\dfrac{(5+45) \\cdot 21}{2} = \\mathbf{525}$.'
};
