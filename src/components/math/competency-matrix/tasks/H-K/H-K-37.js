export default {
  id: 'H-K-37',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Új osztály — barátkozás',
  difficulty: 7,
  scenario: 'Egy **25 fős** osztályban minden tanuló kezet ráz **mindenkivel** egyszer.',
  question: 'Összesen hány **kézfogás** történik?',
  visual: {
    type: 'formula',
    formula: 'K = n · (n−1) / 2',
    variables: [
      { name: 'n', desc: '25' }
    ],
    example: { eredmény: '?' }
  },
  options: ['250', '275', '300', '325'],
  answer: '300',
  keywords: ['kombinatorika', 'összeg'],
  solution: '$\\dfrac{25 \\cdot 24}{2} = \\mathbf{300}$ kézfogás.'
};
