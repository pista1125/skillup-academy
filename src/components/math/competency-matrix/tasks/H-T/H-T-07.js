export default {
  id: 'H-T-07',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc sportágak',
  difficulty: 2,
  scenario: 'Az iskola 6. osztályosainak kedvenc sportágairól készült kördiagram.',
  question: 'A tanulók hány **százaléka** választotta a **futballt**?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Futball',
        value: 40,
        color: '#16a34a'
      },
      {
        label: 'Kosárlabda',
        value: 25,
        color: '#f59e0b'
      },
      {
        label: 'Úszás',
        value: 20,
        color: '#0ea5e9'
      },
      {
        label: 'Tánc',
        value: 15,
        color: '#ec4899'
      }
    ]
  },
  options: ['20%', '25%', '35%', '40%'],
  answer: '40%',
  keywords: ['kördiagram', 'adatleolvasás', 'százalék'],
  solution: `**Leolvasás a kördiagramról:**

A **futball** szelete 40%-ot foglal el.

**A helyes válasz: 40%.**`
};
