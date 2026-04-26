export default {
  id: 'H-T-43',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kördiagram — kedvenc gyümölcs',
  difficulty: 2,
  scenario: 'Az osztály kedvenc gyümölcsét kördiagramon mutatjuk be.',
  question: 'Melyik gyümölcsöt **legtöbben** választották?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Alma', value: 35, color: '#ef4444' },
      { label: 'Banán', value: 25, color: '#f59e0b' },
      { label: 'Szőlő', value: 20, color: '#a855f7' },
      { label: 'Körte', value: 20, color: '#22c55e' }
    ]
  },
  options: ['Alma', 'Banán', 'Szőlő', 'Körte'],
  answer: 'Alma',
  keywords: ['kördiagram', 'leolvasás'],
  solution: 'A legnagyobb cikk: **Alma — 35%**.'
};
