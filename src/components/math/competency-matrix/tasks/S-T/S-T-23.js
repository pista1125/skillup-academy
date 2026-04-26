export default {
  id: 'S-T-23',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Fagylalt ízek eladása',
  difficulty: 2,
  scenario: 'Egy cukrászda egy nap alatt ennyi gombóc fagylaltot adott el ízenként.',
  question: 'Mennyivel fogyott **több** vaníliából, mint csokiból?',
  visual: {
    type: 'barChart',
    xLabel: 'Íz',
    yLabel: 'Eladott gombóc',
    yMin: 0,
    yMax: 50,
    bars: [
      { label: 'Vanília', value: 40, color: '#fef3c7' },
      { label: 'Csoki', value: 28, color: '#78350f' },
      { label: 'Eper', value: 32, color: '#ec4899' },
      { label: 'Pisztácia', value: 15, color: '#65a30d' }
    ]
  },
  options: ['8', '12', '15', '20'],
  answer: '12',
  keywords: ['oszlopdiagram', 'különbség'],
  solution: `**Különbség:**

$40 - 28 = \\mathbf{12}$ gombóc.

**A helyes válasz: 12.**`
};
