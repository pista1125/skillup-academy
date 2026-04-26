export default {
  id: 'A-T-23',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Négyzet területe — fénykép',
  difficulty: 1,
  scenario: 'Egy négyzet alakú fénykép oldala **12 cm**.',
  question: 'Mekkora a fénykép **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 12,
    label: 'foto',
    fill: '#e0c8ff',
    unit: 'cm'
  },
  options: ['24 cm²', '48 cm²', '120 cm²', '144 cm²'],
  answer: '144 cm²',
  keywords: ['terület', 'négyzet'],
  solution: '$T = a^2 = 12^2 = \\mathbf{144}$ cm².'
};
