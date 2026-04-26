export default {
  id: 'A-A-45',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szabályos nyolcszög szöge',
  difficulty: 5,
  scenario: 'Egy **szabályos nyolcszög** (STOP-tábla formája) belső szögeit vizsgáljuk.',
  question: 'Mekkora egy belső szöge?',
  visual: {
    type: 'formula',
    text: 'szabályos nyolcszög'
  },
  options: ['108°', '120°', '135°', '144°'],
  answer: '135°',
  keywords: ['szög', 'szabályos sokszög'],
  solution: '$(8-2) \\cdot 180° = 1080°$. Egy szög: $\\dfrac{1080°}{8} = \\mathbf{135°}$.'
};
