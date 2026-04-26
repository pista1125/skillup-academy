export default {
  id: 'H-T-39',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Időjárás — csapadék',
  difficulty: 2,
  scenario: 'Budapest öt napjának csapadékmennyisége (mm) piktogramon (1 csepp = 2 mm).',
  question: 'Hány mm csapadék hullott **csütörtökön**?',
  visual: {
    type: 'pictogram',
    unit: 2,
    unitLabel: 'mm',
    rows: [
      { label: 'Hétfő', count: 3 },
      { label: 'Kedd', count: 1 },
      { label: 'Szerda', count: 0 },
      { label: 'Csütörtök', count: 5 },
      { label: 'Péntek', count: 2 }
    ]
  },
  options: ['6 mm', '8 mm', '10 mm', '12 mm'],
  answer: '10 mm',
  keywords: ['piktogram', 'csapadék'],
  solution: '5 csepp × 2 mm = **10 mm**.'
};
