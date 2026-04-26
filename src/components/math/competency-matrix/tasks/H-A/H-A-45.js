export default {
  id: 'H-A-45',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Zsebpénz — sorozat',
  difficulty: 4,
  scenario: 'Zsófi az első héten **500 Ft** zsebpénzt kap, és minden héten **100 Ft-tal többet**, mint az előzőn.',
  question: 'Mennyit kap a **12. héten**?',
  visual: {
    type: 'sequence',
    elements: ['500', '600', '700', '800', '...', '?']
  },
  options: ['1500 Ft', '1600 Ft', '1700 Ft', '1800 Ft'],
  answer: '1600 Ft',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_{12} = 500 + 11 \\cdot 100 = \\mathbf{1600}$ Ft.'
};
