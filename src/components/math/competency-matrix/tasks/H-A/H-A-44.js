export default {
  id: 'H-A-44',
  contentArea: 'H',
  contentSub: '2.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Modellautó — méretarány',
  difficulty: 4,
  scenario: 'Egy modellautó méretaránya **1 : 24**. A modell hossza **18 cm**.',
  question: 'Hány **cm** a valódi autó hossza?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Modell', formula: '18 cm', result: '' },
      { label: 'Valóság', formula: '18 · 24', result: '?' }
    ]
  },
  options: ['360 cm', '420 cm', '432 cm', '480 cm'],
  answer: '432 cm',
  keywords: ['méretarány'],
  solution: '$18 \\cdot 24 = \\mathbf{432}$ cm.'
};
