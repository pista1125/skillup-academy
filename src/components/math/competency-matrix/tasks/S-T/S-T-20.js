export default {
  id: 'S-T-20',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Felhőkarcolók magassága',
  difficulty: 2,
  scenario: 'Egy városban öt felhőkarcoló magasságát méterben mérték le.',
  question: 'Melyik a **legmagasabb** épület?',
  visual: {
    type: 'barChart',
    xLabel: 'Épület',
    yLabel: 'Magasság (m)',
    yMin: 0,
    yMax: 250,
    bars: [
      { label: 'Alfa', value: 120, color: '#2563eb' },
      { label: 'Béta', value: 180, color: '#22c55e' },
      { label: 'Gamma', value: 95, color: '#f59e0b' },
      { label: 'Delta', value: 210, color: '#ef4444' },
      { label: 'Epszilon', value: 155, color: '#a855f7' }
    ]
  },
  options: ['Alfa', 'Béta', 'Delta', 'Epszilon'],
  answer: 'Delta',
  keywords: ['oszlopdiagram', 'maximum', 'leolvasás'],
  solution: `**A legmagasabb oszlop a Delta (210 m).**

Összehasonlítás: $120 < 95$-nél nagyobb, de $180, 155, 210$ közül **210 a legnagyobb**.

**A helyes válasz: Delta.**`
};
