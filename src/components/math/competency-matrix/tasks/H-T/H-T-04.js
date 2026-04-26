export default {
  id: 'H-T-04',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Csoportosított oszlopdiagram',
  difficulty: 3,
  scenario: 'Három tantárgyból írtak dolgozatot négy diákok. A diagram a pontszámokat mutatja.',
  question: 'Melyik diák érte el a **legmagasabb** matematika pontszámot?',
  visual: {
    type: 'groupedBar',
    categories: ['Anna', 'Béla', 'Cili', 'Dani'],
    yMax: 100,
    yLabel: 'Pont',
    series: [
      {
        name: 'Matek',
        color: '#2563eb',
        values: [82, 94, 70, 88]
      },
      {
        name: 'Magyar',
        color: '#16a34a',
        values: [78, 72, 90, 80]
      },
      {
        name: 'Angol',
        color: '#f59e0b',
        values: [85, 80, 75, 92]
      }
    ]
  },
  options: ['Anna', 'Béla', 'Cili', 'Dani'],
  answer: 'Béla',
  keywords: ['csoportosított oszlopdiagram', 'adatleolvasás'],
  solution: `**Leolvasás a kék (matek) oszlopokról:**

Anna 82, **Béla 94**, Cili 70, Dani 88.

**A helyes válasz: Béla (94 pont).**`
};
