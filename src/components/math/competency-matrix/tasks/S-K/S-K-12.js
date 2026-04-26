export default {
  id: 'S-K-12',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromjegyű páros számok',
  difficulty: 6,
  scenario: 'A $\\{1, 2, 3, 4, 5\\}$ számjegyekből **háromjegyű páros** számokat képzünk. A számjegyek **ismétlődhetnek**.',
  question: 'Hány ilyen szám létezik?',
  options: ['25', '40', '50', '125'],
  answer: '50',
  keywords: ['kombinatorika', 'szorzási elv', 'páros'],
  solution: `**Utolsó jegy** (egység): páros → $\\{2, 4\\}$ → **2** lehetőség.

**Első** (százas): $5$, **második** (tízes): $5$.

$$5 \\cdot 5 \\cdot 2 = \\mathbf{50}$$

**A helyes válasz: 50.**`
};
