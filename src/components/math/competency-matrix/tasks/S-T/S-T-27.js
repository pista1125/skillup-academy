export default {
  id: 'S-T-27',
  contentArea: 'S',
  contentSub: '4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Szabadidős tevékenységek',
  difficulty: 2,
  scenario: 'A diákok szabadidős tevékenységeit piktogram mutatja (1 jel = 2 fő).',
  question: 'Hány tanuló **olvas** szabadidőben?',
  visual: {
    type: 'pictogram',
    items: [
      { label: 'Olvasás', count: 5, unit: 'jel', color: '#7c3aed' },
      { label: 'Sport', count: 8, unit: 'jel', color: '#16a34a' },
      { label: 'Játék', count: 7, unit: 'jel', color: '#f97316' },
      { label: 'Zene', count: 3, unit: 'jel', color: '#0ea5e9' }
    ]
  },
  options: ['5', '8', '10', '12'],
  answer: '10',
  keywords: ['piktogram', 'skálaolvasás'],
  solution: `**Az Olvasás soránál 5 jel** van, egy jel **2 főt** jelent.

$5 \\cdot 2 = \\mathbf{10}$ tanuló.

**A helyes válasz: 10.**`
};
