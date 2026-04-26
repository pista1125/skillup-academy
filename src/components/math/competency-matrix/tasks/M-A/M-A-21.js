export default {
  id: 'M-A-21',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Átlag — osztály dolgozatjegyei',
  difficulty: 4,
  scenario: 'Az osztályban a matekdolgozat jegyei így oszlanak meg.',
  question: 'Mennyi az **átlagos érdemjegy**?',
  visual: {
    type: 'barChart',
    caption: 'Jegyek eloszlása',
    categories: ['1', '2', '3', '4', '5'],
    values: [1, 3, 8, 6, 2],
    yLabel: 'db'
  },
  options: ['3.0', '3.3', '3.5', '4.0'],
  answer: '3.3',
  keywords: ['átlag', 'oszlopdiagram'],
  solution: `Összesen: $1\\cdot1 + 3\\cdot2 + 8\\cdot3 + 6\\cdot4 + 2\\cdot5 = 1+6+24+24+10 = 65$.

Darab: $1+3+8+6+2 = 20$.

Átlag: $65/20 = \\mathbf{3.25}$, ami $\\approx 3.3$.`
};
