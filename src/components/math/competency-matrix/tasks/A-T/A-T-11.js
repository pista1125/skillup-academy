export default {
  id: 'A-T-11',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Parketta mintázat',
  difficulty: 3,
  scenario: 'Egy szoba padlóján **3 × 5**-ös rácsmintázatú parketta van. A **satírozott** csempék jelzik a sötétebb mintát.',
  question: 'Hány **sötét** csempe van a padlón a rajz szerint?',
  visual: {
    type: 'grid',
    w: 5,
    h: 3,
    shadedCells: [
      [0, 0],
      [2, 0],
      [4, 0],
      [1, 1],
      [3, 1],
      [0, 2],
      [2, 2],
      [4, 2]
    ]
  },
  options: ['6', '7', '8', '9'],
  answer: '8',
  keywords: ['rács', 'parketta', 'számlálás'],
  solution: `**Lépések:**

1. Alsó sor: 3 sötét csempe.
2. Középső sor: 2 sötét csempe.
3. Felső sor: 3 sötét csempe.
4. Összesen: $3 + 2 + 3 = \\mathbf{8}$ csempe.`
};
