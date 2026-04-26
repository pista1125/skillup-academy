export default {
  id: 'S-T-31',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Havi születésnapok',
  difficulty: 2,
  scenario: 'Egy osztályban feljegyezték, melyik hónapban hány tanuló ünnepli születésnapját.',
  question: 'Melyik hónapban született a **legtöbb** tanuló?',
  visual: {
    type: 'barChart',
    xLabel: 'Hónap',
    yLabel: 'Tanulók',
    yMin: 0,
    yMax: 6,
    bars: [
      { label: 'Jan', value: 2, color: '#2563eb' },
      { label: 'Feb', value: 1, color: '#0ea5e9' },
      { label: 'Már', value: 3, color: '#84cc16' },
      { label: 'Ápr', value: 5, color: '#22c55e' },
      { label: 'Máj', value: 4, color: '#f59e0b' },
      { label: 'Jún', value: 2, color: '#f97316' }
    ]
  },
  options: ['Január', 'Március', 'Április', 'Június'],
  answer: 'Április',
  keywords: ['oszlopdiagram', 'maximum'],
  solution: `**A legmagasabb oszlop (5) az áprilishoz tartozik.**

**A helyes válasz: Április.**`
};
