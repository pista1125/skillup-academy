export default {
  id: 'S-T-16',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Heti csapadék — vonaldiagram',
  difficulty: 2,
  scenario: 'Egy héten át minden nap mérték a lehullott csapadékot milliméterben.',
  question: 'Melyik nap volt a **legtöbb** csapadék?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'Csapadék (mm)',
    yMin: 0,
    yMax: 20,
    points: [
      { x: 'Hétfő', y: 5 },
      { x: 'Kedd', y: 12 },
      { x: 'Szerda', y: 8 },
      { x: 'Csütörtök', y: 15 },
      { x: 'Péntek', y: 3 },
      { x: 'Szombat', y: 0 },
      { x: 'Vasárnap', y: 7 }
    ]
  },
  options: ['Kedd', 'Szerda', 'Csütörtök', 'Vasárnap'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'maximum'],
  solution: `**Leolvasás:**

A legmagasabb pont **15 mm**, ez a **csütörtökhöz** tartozik.

**A helyes válasz: Csütörtök.**`
};
