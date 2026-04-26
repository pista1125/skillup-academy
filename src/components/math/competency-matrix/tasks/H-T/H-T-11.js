export default {
  id: 'H-T-11',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Négyzetszámok',
  difficulty: 3,
  scenario: 'A sorozat első tagjai: 1, 4, 9, 16, 25, ... A szabály: $a_n = n^2$.',
  question: 'Mi a sorozat **8. tagja**?',
  visual: {
    type: 'sequence',
    elements: ['1', '4', '9', '16', '25', '36', '49', '?']
  },
  options: ['56', '60', '64', '72'],
  answer: '64',
  keywords: ['négyzetszám', 'sorozat', 'szabály'],
  solution: `**Szabály alkalmazása:**

$a_n = n^2$, tehát $a_8 = 8^2 = \\mathbf{64}$.`
};
