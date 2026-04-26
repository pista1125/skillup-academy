export default {
  id: 'H-K-24',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Medence feltöltése',
  difficulty: 6,
  scenario: 'Két csap együtt tölt fel egy medencét. Az egyik egymaga **6 óra** alatt tölti meg, a másik **4 óra** alatt.',
  question: 'Hány **óra** alatt töltik meg együtt a medencét?',
  visual: {
    type: 'formula',
    formula: '1/t = 1/t_1 + 1/t_2',
    variables: [
      { name: 't_1', desc: '6 óra' },
      { name: 't_2', desc: '4 óra' }
    ],
    example: { eredmény: '?' }
  },
  options: ['2', '2,2', '2,4', '3'],
  answer: '2,4',
  keywords: ['egyenlet', 'munka'],
  solution: '$\\frac{1}{t} = \\frac{1}{6} + \\frac{1}{4} = \\frac{5}{12}$ → $t = \\mathbf{2{,}4}$ óra.'
};
