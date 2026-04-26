export default {
  id: 'A-K-22',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromszög típusa szög alapján',
  difficulty: 6,
  scenario: 'Egy háromszög két szöge **30°** és **60°**.',
  question: 'Milyen típusú háromszög ez (szög szerint)?',
  visual: {
    type: 'triangle',
    type2: 'right',
    base: 6,
    side: 5,
    unit: 'cm'
  },
  options: ['Hegyesszögű', 'Derékszögű', 'Tompaszögű', 'Szabályos'],
  answer: 'Derékszögű',
  keywords: ['szög', 'háromszög'],
  solution: 'A harmadik szög: $180° - 30° - 60° = 90°$. A háromszög **derékszögű**.'
};
