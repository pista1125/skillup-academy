export default {
  id: 'S-T-15',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc évszak — kördiagram',
  difficulty: 2,
  scenario: 'Az osztályban megkérdezték, melyik a kedvenc évszak. A kördiagram a válaszok arányát mutatja.',
  question: 'Melyik évszakot **szereti a legtöbb tanuló**?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Tavasz (25%)', value: 25, color: '#84cc16' },
      { label: 'Nyár (40%)', value: 40, color: '#f59e0b' },
      { label: 'Ősz (20%)', value: 20, color: '#ef4444' },
      { label: 'Tél (15%)', value: 15, color: '#0ea5e9' }
    ]
  },
  options: ['Tavasz', 'Nyár', 'Ősz', 'Tél'],
  answer: 'Nyár',
  keywords: ['kördiagram', 'legtöbb'],
  solution: `**A legnagyobb cikk a 40%-os nyári.**

**A helyes válasz: Nyár.**`
};
