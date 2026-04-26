export default {
  id: 'M-A-44',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Prímtényezős felbontás',
  difficulty: 5,
  scenario: 'A **72** szám prímtényezős felbontására vagy kíváncsi.',
  question: 'Melyik a **helyes felbontás**?',
  visual: {
    type: 'formula',
    formula: '72 = ?',
    variables: []
  },
  options: ['2³ · 3²', '2² · 3³', '2³ · 3³', '2² · 3²'],
  answer: '2³ · 3²',
  keywords: ['prímtényező', 'oszthatóság'],
  solution: '$72 = 8 \\cdot 9 = 2^3 \\cdot 3^2$.'
};
