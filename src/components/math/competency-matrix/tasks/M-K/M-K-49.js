export default {
  id: 'M-K-49',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Fordított arány — munkások',
  difficulty: 6,
  scenario: '**6 munkás 10 nap** alatt végez el egy munkát. Azonos tempó mellett...',
  question: 'Hány **nap** alatt végezne **15 munkás**?',
  visual: {
    type: 'formula',
    formula: '6 · 10 = 15 · x',
    variables: [{ name: 'x', desc: 'napok száma' }]
  },
  options: ['2 nap', '4 nap', '5 nap', '6 nap'],
  answer: '4 nap',
  keywords: ['fordított arány'],
  solution: `Munkásnapok száma állandó: $6 \\cdot 10 = 60$.

$60 / 15 = \\mathbf{4}$ nap.`
};
