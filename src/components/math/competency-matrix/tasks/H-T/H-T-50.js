export default {
  id: 'H-T-50',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Családfa — nagymama kora',
  difficulty: 3,
  scenario: 'Pali 11 éves, édesanyja 27 évvel idősebb nála, a nagymama pedig 29 évvel idősebb édesanyjánál.',
  question: 'Hány éves a **nagymama**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Pali', formula: '11', result: '' },
      { label: 'Anya', formula: '11 + 27', result: '38' },
      { label: 'Nagymama', formula: '38 + 29', result: '?' }
    ]
  },
  options: ['65', '66', '67', '70'],
  answer: '67',
  keywords: ['összeadás', 'életkor'],
  solution: '$11 + 27 + 29 = \\mathbf{67}$ év.'
};
