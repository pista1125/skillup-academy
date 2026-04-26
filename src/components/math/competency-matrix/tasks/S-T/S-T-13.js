export default {
  id: 'S-T-13',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc italok — oszlopdiagram',
  difficulty: 2,
  scenario: 'A napközisek között felmérték, milyen italt kérnek leggyakrabban ebédhez.',
  question: 'Hányan kérnek **vizet**?',
  visual: {
    type: 'barChart',
    xLabel: 'Ital',
    yLabel: 'Tanulók száma',
    yMin: 0,
    yMax: 20,
    bars: [
      { label: 'Víz', value: 14, color: '#0ea5e9' },
      { label: 'Tea', value: 9, color: '#84cc16' },
      { label: 'Lé', value: 11, color: '#f59e0b' },
      { label: 'Tej', value: 6, color: '#e2e8f0' }
    ]
  },
  options: ['9', '11', '14', '20'],
  answer: '14',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: `**Leolvasás:**

A **Víz** oszlopa **14**-ig ér fel.

**A helyes válasz: 14.**`
};
