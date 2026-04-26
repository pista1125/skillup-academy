export default {
  id: 'M-K-42',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Pitagorasz — létra a fal mellett',
  difficulty: 6,
  scenario: 'Egy **5 m hosszú létra** a faltól **3 m**-re áll a talajon.',
  question: 'Milyen **magasan** éri el a falat a létra teteje?',
  visual: {
    type: 'formula',
    formula: 'a² + b² = c²',
    variables: [
      { name: 'a', desc: 'fal felőli szár' },
      { name: 'b', desc: '3 m talaj' },
      { name: 'c', desc: '5 m létra' }
    ]
  },
  options: ['3 m', '4 m', '4,5 m', '5 m'],
  answer: '4 m',
  keywords: ['Pitagorasz', 'derékszögű háromszög'],
  solution: `$a^2 + 3^2 = 5^2$

$a^2 = 25 - 9 = 16 \\Rightarrow a = \\mathbf{4}$ m.`
};
