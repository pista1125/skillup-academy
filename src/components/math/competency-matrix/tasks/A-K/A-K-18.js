export default {
  id: 'A-K-18',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Ismeretlen szabályos sokszög',
  difficulty: 6,
  scenario: 'Egy szabályos sokszög **egy belső szöge 140°**.',
  question: 'Hány oldala van?',
  visual: {
    type: 'formula',
    text: 'szabályos $n$-szög, egy szöge $= 140°$'
  },
  options: ['6', '8', '9', '10'],
  answer: '9',
  keywords: ['sokszög', 'szög'],
  solution: `$\\dfrac{(n-2)\\cdot 180°}{n} = 140°$

$(n-2)\\cdot 180 = 140n$

$180n - 360 = 140n$

$40n = 360 \\Rightarrow n = \\mathbf{9}$.`
};
