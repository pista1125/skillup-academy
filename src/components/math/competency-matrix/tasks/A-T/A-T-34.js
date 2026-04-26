export default {
  id: 'A-T-34',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Szimmetriatengely — betű',
  difficulty: 2,
  scenario: 'A **H** betűnek szimmetriatengelyeit vizsgáljuk.',
  question: 'Hány **szimmetriatengelye** van a H betűnek (a nagybetűs tipográfia szerint)?',
  visual: {
    type: 'mirrorChoice',
    letter: 'H',
    axis: 'both',
    options: ['H', 'H', 'H', 'H']
  },
  options: ['0', '1', '2', '3'],
  answer: '2',
  keywords: ['szimmetria', 'tengely'],
  solution: 'A **H** betűnek függőleges és vízszintes szimmetriatengelye is van → **2 tengely**.'
};
