export default {
  id: 'H-T-06',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Páros számok sorozata',
  difficulty: 1,
  scenario: 'Az alábbi sorozatban minden szám 4-gyel nagyobb az előzőnél.',
  question: 'Mi a sorozat **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['2', '6', '10', '14', '18', '?']
  },
  options: ['20', '21', '22', '24'],
  answer: '22',
  keywords: ['sorozat', 'szabálykövetés'],
  solution: `**Szabály:** minden tag $+4$.

$18 + 4 = \\mathbf{22}$.`
};
