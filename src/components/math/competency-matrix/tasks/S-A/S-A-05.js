export default {
  id: 'S-A-05',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Havi zsebpénz — átlag',
  difficulty: 3,
  scenario: 'Öt barát havi zsebpénzét az oszlopdiagram mutatja.',
  question: 'Mennyi a zsebpénzek **átlaga** forintban?',
  visual: {
    type: 'barChart',
    xLabel: 'Név',
    yLabel: 'Ft',
    yMin: 0,
    yMax: 5000,
    bars: [
      {
        label: 'Anna',
        value: 3000,
        color: '#2563eb'
      },
      {
        label: 'Béla',
        value: 2000,
        color: '#22c55e'
      },
      {
        label: 'Cili',
        value: 4000,
        color: '#f59e0b'
      },
      {
        label: 'Dani',
        value: 2500,
        color: '#ef4444'
      },
      {
        label: 'Eszter',
        value: 3500,
        color: '#a855f7'
      }
    ]
  },
  options: ['2800 Ft', '3000 Ft', '3200 Ft', '3500 Ft'],
  answer: '3000 Ft',
  keywords: ['átlag', 'számtani közép'],
  solution: `**Számtani átlag:**

$$\\bar{x} = \\dfrac{3000+2000+4000+2500+3500}{5} = \\dfrac{15000}{5} = \\mathbf{3000}$$

**A helyes válasz: 3000 Ft.**`
};
