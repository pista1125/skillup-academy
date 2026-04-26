export default {
  id: 'S-T-29',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Sportbajnokság — csapatok pontjai',
  difficulty: 2,
  scenario: 'Egy iskolai sportbajnokság végeredményét oszlopdiagram mutatja.',
  question: 'Hány pontot szerzett a **Tigrisek** csapata?',
  visual: {
    type: 'barChart',
    xLabel: 'Csapat',
    yLabel: 'Pont',
    yMin: 0,
    yMax: 30,
    bars: [
      { label: 'Sasok', value: 22, color: '#a16207' },
      { label: 'Tigrisek', value: 18, color: '#f97316' },
      { label: 'Farkasok', value: 25, color: '#64748b' },
      { label: 'Medvék', value: 15, color: '#92400e' }
    ]
  },
  options: ['15', '18', '22', '25'],
  answer: '18',
  keywords: ['oszlopdiagram', 'leolvasás'],
  solution: `**A Tigrisek oszlopa 18 pontig ér fel.**

**A helyes válasz: 18.**`
};
