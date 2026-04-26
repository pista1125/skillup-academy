export default {
  id: 'H-T-47',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Lépcsőfokok',
  difficulty: 2,
  scenario: 'Egy lépcsőház szintenként 18 lépcsőfokot tartalmaz.',
  question: 'Hány lépcsőfokot kell megmászni a **4. emeletig**?',
  visual: {
    type: 'sequence',
    elements: ['1. em. → 18', '2. em. → 36', '3. em. → 54', '4. em. → ?']
  },
  options: ['68', '70', '72', '76'],
  answer: '72',
  keywords: ['szorzás', 'sorozat'],
  solution: '$18 \\cdot 4 = \\mathbf{72}$ fok.'
};
