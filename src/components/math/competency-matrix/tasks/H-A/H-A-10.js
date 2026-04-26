export default {
  id: 'H-A-10',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Baktériumszaporodás',
  difficulty: 5,
  scenario: 'Egy laborban a baktériumok **óránként megduplázódnak**. Kezdetben 3 baktérium van.',
  question: 'Hány baktérium lesz **5 óra** múlva?',
  visual: {
    type: 'sequence',
    elements: ['3', '6', '12', '24', '48', '?']
  },
  options: ['60', '72', '96', '120'],
  answer: '96',
  keywords: ['mértani sorozat', 'szabály'],
  solution: `**Megduplázódás (mértani sorozat):**

- 0 h: 3
- 1 h: 6
- 2 h: 12
- 3 h: 24
- 4 h: 48
- **5 h: $48 \\cdot 2 = \\mathbf{96}$**.`
};
