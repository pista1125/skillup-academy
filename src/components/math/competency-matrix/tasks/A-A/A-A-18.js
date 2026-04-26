export default {
  id: 'A-A-18',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szabályos ötszög szöge',
  difficulty: 4,
  scenario: 'Egy szabályos ötszög belső szögeit vizsgáljuk.',
  question: 'Mekkora egy **belső szöge**?',
  visual: {
    type: 'formula',
    text: 'szabályos ötszög'
  },
  options: ['72°', '90°', '108°', '144°'],
  answer: '108°',
  keywords: ['szög', 'szabályos sokszög'],
  solution: `$(n-2)\\cdot 180° = 3 \\cdot 180° = 540°$.

Egy szög: $\\dfrac{540°}{5} = \\mathbf{108°}$.`
};
