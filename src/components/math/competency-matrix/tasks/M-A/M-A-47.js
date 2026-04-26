export default {
  id: 'M-A-47',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 4 → 7 db',
  difficulty: 4,
  scenario: '**4** db ára 3200 Ft. Ugyanolyan egységár mellett...',
  question: 'Mennyibe kerül **7** db?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '4 db',
        formula: '3200 Ft',
        result: ''
      },
      {
        label: '7 db',
        formula: '?',
        result: ''
      }
    ]
  },
  options: ['5400 Ft', '5600 Ft', '5800 Ft', '6600 Ft'],
  answer: '5600 Ft',
  keywords: ['arányosság'],
  solution: 'Egységár: $800$ Ft. 7 db: $800 \\cdot 7 = 5600$ Ft.'
};
