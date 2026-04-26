export default {
  id: 'M-A-48',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 3 → 8 db',
  difficulty: 4,
  scenario: '**3** db ára 1500 Ft. Ugyanolyan egységár mellett...',
  question: 'Mennyibe kerül **8** db?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '3 db',
        formula: '1500 Ft',
        result: ''
      },
      {
        label: '8 db',
        formula: '?',
        result: ''
      }
    ]
  },
  options: ['3800 Ft', '4000 Ft', '4200 Ft', '5000 Ft'],
  answer: '4000 Ft',
  keywords: ['arányosság'],
  solution: 'Egységár: $500$ Ft. 8 db: $500 \\cdot 8 = 4000$ Ft.'
};
