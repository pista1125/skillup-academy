export default {
  id: 'M-A-37',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Heti zsebpénz — oszlopdiagram',
  difficulty: 4,
  scenario: 'Egy család 5 gyerekének heti zsebpénzét az oszlopdiagram mutatja.',
  question: 'Mennyi az **átlag** zsebpénz?',
  visual: {
    type: 'barChart',
    caption: 'Heti zsebpénz (Ft)',
    categories: ['Anna', 'Bence', 'Cili', 'Dávid', 'Emese'],
    values: [2500, 3000, 2000, 3500, 4000],
    yLabel: 'Ft'
  },
  options: ['2800 Ft', '3000 Ft', '3200 Ft', '3500 Ft'],
  answer: '3000 Ft',
  keywords: ['átlag', 'család'],
  solution: `Összeg: $2500 + 3000 + 2000 + 3500 + 4000 = 15000$ Ft.

Átlag: $15000 / 5 = \\mathbf{3000}$ Ft.`
};
