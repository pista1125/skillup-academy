export default {
  id: 'H-A-50',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Uszodabérlet — alkalmak',
  difficulty: 4,
  scenario: 'Havi uszodabérlet **7500 Ft** alapdíjból és **450 Ft/alkalom** extra belépőből áll, ha túl van lépve a keret.',
  question: 'Mennyit fizet **14 alkalom** esetén? (alapdíj 10 alkalmat fed)',
  visual: {
    type: 'formula',
    formula: 'díj = 7500 + 450 · (alkalom − 10)',
    variables: [
      { name: 'alkalom', desc: '14' }
    ],
    example: { eredmény: '?' }
  },
  options: ['8400 Ft', '9300 Ft', '9750 Ft', '13 800 Ft'],
  answer: '9300 Ft',
  keywords: ['hozzárendelés', 'feltétel'],
  solution: '$7500 + 450 \\cdot (14-10) = 7500 + 1800 = \\mathbf{9300}$ Ft.'
};
